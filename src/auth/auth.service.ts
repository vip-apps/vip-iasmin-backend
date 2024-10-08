import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import {
  CognitoIdentityProviderClient, ConfirmSignUpCommand, InitiateAuthCommand,
  SignUpCommand,
} from '@aws-sdk/client-cognito-identity-provider';
import { ConfigService } from '@nestjs/config';
import { ConfirmSignInDto } from './dto/ConfirmSignIn.dto';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private readonly cognitoClient = new CognitoIdentityProviderClient({
    region: 'us-east-1',
  });
  private readonly COGNITO_CLIENT_ID = this.configService.get('AWS_COGNITO_USER_POOL_CLIENT_ID')
  private readonly COGNITO_CLIENT_SECRET = this.configService.get('AWS_COGNITO_USER_POOL_CLIENT_SECRET')

  async login(loginDto: LoginDto) {
    const command = new InitiateAuthCommand({
      ClientId: this.COGNITO_CLIENT_ID,
      AuthFlow: 'USER_PASSWORD_AUTH',
      AuthParameters: {
        USERNAME: loginDto.email,
        PASSWORD: loginDto.password,
        SECRET_HASH: this.getSecretHash(loginDto.email),
      },
    });

    try {
      const cognitoData = await this.cognitoClient.send(command);
      const payload = this.jwtService.decode(cognitoData.AuthenticationResult!.IdToken!);
      const token = this.jwtService.sign({
        email: loginDto.email,
        token: cognitoData.AuthenticationResult?.AccessToken,
        controlNumber: payload['custom:controlNumber']
      });
      return { token };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createUserAwsCognito(loginDto: LoginDto) {
    const command = new SignUpCommand({
      ClientId: this.COGNITO_CLIENT_ID,
      SecretHash: this.getSecretHash(loginDto.email),
      Username: loginDto.email,
      Password: loginDto.password,
      UserAttributes: [
        {
          Name: 'name',
          Value: loginDto.name,
        },
        {
          Name: 'email',
          Value: loginDto.email,
        },
        {
          Name: 'custom:controlNumber',
          Value: loginDto.controlNumber.toString(),
        },
      ],
    });
    try {
      await this.cognitoClient.send(command);
      return this.userService.create(loginDto);
    }
    catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async confirmSignUpUserAwsCognito(confirmSignInDto: ConfirmSignInDto) {
    const command = new ConfirmSignUpCommand({
      ClientId: this.COGNITO_CLIENT_ID,
      SecretHash: this.getSecretHash(confirmSignInDto.email),
      Username: confirmSignInDto.email,
      ConfirmationCode: confirmSignInDto.confirmationCode,
    });

    return await this.cognitoClient.send(command);
  }

  private getSecretHash(username: string) {
    return crypto.createHmac("sha256", this.COGNITO_CLIENT_SECRET)
      .update(`${username}${this.COGNITO_CLIENT_ID}`)
      .digest("base64");
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ConfirmSignInDto } from './dto/ConfirmSignIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('create')
  createUserAwsCognito(@Body() loginDto: LoginDto) {
    return this.authService.createUserAwsCognito(loginDto);
  }

  @Post('confirm')
  confirmSignIn(@Body() confirmSignInDto: ConfirmSignInDto) {
    return this.authService.confirmSignUpUserAwsCognito(confirmSignInDto);
  }

}

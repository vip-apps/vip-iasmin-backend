import { Controller, Post, Body, Get, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ConfirmSignInDto } from './dto/confirm-signIn.dto';
import { AuthGuard } from './auth.guard';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('create')
  createUserAwsCognito(@Body() loginDto: CreateUserDto) {
    return this.authService.createUserAwsCognito(loginDto);
  }

  @Post('confirm')
  confirmSignIn(@Body() confirmSignInDto: ConfirmSignInDto) {
    return this.authService.confirmSignUpUserAwsCognito(confirmSignInDto);
  }

  @UseGuards(AuthGuard)
  @Get('validate-token')
  @HttpCode(HttpStatus.NO_CONTENT)
  validateToken(){
    return;
  }

}

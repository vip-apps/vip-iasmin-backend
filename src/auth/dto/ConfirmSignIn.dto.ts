/**
 * @author Jefferson Alves Reis (jefaokpta) < jefaokpta@hotmail.com >
 * Date: 10/3/24
 */
import { IsEmail, IsNotEmpty } from 'class-validator';


export class ConfirmSignInDto {
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  readonly confirmationCode: string;
}
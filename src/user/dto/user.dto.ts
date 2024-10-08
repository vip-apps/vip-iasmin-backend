import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {
   @IsNotEmpty({ message: 'nome obrigatorio' })
   readonly name: string;

   @IsEmail({}, { message: 'email invalido' })
   readonly email: string;

   @IsNotEmpty()
   @MinLength(6, { message: 'senha deve ter no minimo 6 caracteres' })
   readonly password: string;
}

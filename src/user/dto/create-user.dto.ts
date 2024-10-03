import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  readonly id: number;

  @IsNotEmpty({ message: 'nome obrigatório' })
  readonly name: string;

  @IsNotEmpty({ message: 'email obrigatório' })
  @IsEmail({}, { message: 'email invalido' })
  readonly email: string;

  @IsNotEmpty({ message: 'senha obrigatória' })
  @MinLength(8, { message: 'senha deve ter no minimo 8 caracteres' })
  readonly password: string;
}

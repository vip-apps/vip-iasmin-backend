/**
 * @author Jefferson Alves Reis (jefaokpta) < jefaokpta@hotmail.com >
 * Date: 9/27/24
 */

import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class LoginDto {
    @IsNotEmpty({ message: 'Nome deve ser informado' })
    name: string;

    @IsNumber({ allowNaN: false, allowInfinity: false }, { message: 'Identificacao de controle deve ser um numero' })
    readonly controlNumber: number;

    @IsEmail({}, { message: 'Email invalido' })
    readonly email: string;

    @IsNotEmpty({message: 'Senha deve ser informada'})
    readonly password: string;
}
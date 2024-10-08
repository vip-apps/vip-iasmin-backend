/**
 * @author Jefferson Alves Reis (jefaokpta) < jefaokpta@hotmail.com >
 * Date: 9/27/24
 */

import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

export class LoginDto {
    @IsNotEmpty({ message: 'Nome deve ser informado' })
    name: string;

    @IsNumberString({ no_symbols: true }, { message: 'Identificacao de controle deve ser um numero' })
    readonly controlNumber: number;

    @IsEmail({}, { message: 'Email invalido' })
    readonly email: string;

    @IsNotEmpty({message: 'Senha deve ser informada'})
    readonly password: string;
}
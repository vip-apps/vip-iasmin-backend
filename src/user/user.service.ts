import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from '../auth/dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  async create(loginDto: LoginDto) {
    const userExists = await this.findByEmail(loginDto.email);
    if (userExists) {
      throw new HttpException('Email ja cadastrado', HttpStatus.BAD_REQUEST);
    }
    return this.usersRepository.save(loginDto);
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('User nao encontrado', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.findOne(id);
    await this.usersRepository.update(id, updateUserDto);
    return this.usersRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.usersRepository.delete(id);
  }

  async query(query: string) {
    const users = await this.usersRepository
      .createQueryBuilder('user')
      .where('user.name like :name', { name: `%${query}%` })
      .orWhere('user.email like :email', { email: `%${query}%` })
      .getMany();

    if (users.length === 0) {
      throw new HttpException('Nenhum usuario encontrado', HttpStatus.NOT_FOUND);
    }

    return users;
  }
}

import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from "@nestjs/config";
import { MysqlConfigService } from './config/mysql.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: MysqlConfigService,
      inject: [MysqlConfigService],
    }),
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private readonly dataSource: DataSource) {
    console.log('🚀 conectado ao banco', dataSource.options.database);
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { DataSourceOptions, DatabaseType } from 'typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: this.config.getOrThrow<DatabaseType>('DATABASE_TYPE'),
      host: this.config.getOrThrow('DATABASE_HOST'),
      port: +this.config.getOrThrow<number>('DATABASE_PORT'),
      username: this.config.getOrThrow('POSTGRES_USER'),
      password: this.config.getOrThrow('POSTGRES_PASSWORD'),
      database: this.config.getOrThrow('POSTGRES_DB'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
      dropSchema: false,
      logging: this.config.get('DEBUG', false),
      retryAttempts: 3,
      options: { encrypt: false, trustServerCertificate: true },
    } as DataSourceOptions;
  }
}

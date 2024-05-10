import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigOptions {
  constructor() {
    return {
      isGlobal: true,
      cache: true,
      envFilePath: `.env.${process.env.NODE_ENV || 'local'}`,
      ignoreEnvFile: false,
    };
  }
}

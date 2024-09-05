import { Logger } from '@nestjs/common';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';

class Configuration {
  private readonly logger = new Logger(Configuration.name);

  readonly CLIENT_ORIGIN_URLS = process.env.CLIENT_ORIGIN_URLS as string;

  readonly DATABASE_LOGGING = process.env.DATABASE_LOGGING === 'true';

  readonly DATABASE_HOST = process.env.DATABASE_HOST as string;

  readonly DATABASE_PORT = Number(process.env.DATABASE_PORT);

  readonly DATABASE_NAME = process.env.DATABASE_NAME as string;

  readonly DATABASE_USER = process.env.DATABASE_USER as string;

  readonly DATABASE_PASSWORD = process.env.DATABASE_PASSWORD as string;

  readonly DATABASE_SYNC = process.env.DATABASE_SYNC === 'true';

  readonly PORT = Number(process.env.PORT);

  constructor() {
    const error = validateSync(this);
    if (!error.length) return;
    this.logger.error(`Config validation error: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}

export const Config = new Configuration();

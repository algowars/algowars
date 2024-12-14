import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';
import config from 'knexfile';
export enum DatabaseInjectionToken {
  WRITE_CONNECTION = 'writeConnection',
  READ_CONNECTION = 'readConnection',
}

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    KnexModule.forRootAsync(
      {
        useFactory: (configService: ConfigService) => ({
          config: config[configService.get('NODE_ENV')],
        }),
        inject: [ConfigService],
      },
      DatabaseInjectionToken.READ_CONNECTION,
    ),
    KnexModule.forRootAsync(
      {
        useFactory: (configService: ConfigService) => ({
          config: config[configService.get('NODE_ENV')],
        }),
        inject: [ConfigService],
      },
      DatabaseInjectionToken.WRITE_CONNECTION,
    ),
  ],
})
export class DatabaseModule {}

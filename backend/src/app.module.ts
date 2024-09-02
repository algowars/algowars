import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DocsModule } from './docs/docs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DocsModule,
  ],
})
export class AppModule {}

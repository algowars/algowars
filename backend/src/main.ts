import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception.filter';
import * as nocache from 'nocache';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { Config } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log'],
  });

  app.setGlobalPrefix('api');

  console.log(Config);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  app.use(nocache());

  app.enableCors({
    origin: Config.CLIENT_ORIGIN_URLS,
    methods: ['GET', 'POST', 'PUT'],
    allowedHeaders: ['Authorization', 'Content-Type', 'content-type'],
    maxAge: 86400,
  });

  app.use(
    helmet({
      hsts: { maxAge: 31536000 },
      frameguard: { action: 'deny' },
      contentSecurityPolicy: {
        directives: {
          'default-src': ["'self'"],
          'frame-ancestors': ["'none'"],
        },
      },
    }),
  );

  await app.listen(Config.PORT, () => {
    console.log(`Listening on port 🚀 ${Config.PORT} 🚀`);
  });
}

bootstrap();

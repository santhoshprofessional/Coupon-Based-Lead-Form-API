import { NestFactory } from '@nestjs/core';
import * as dns from 'node:dns';
import { AppModule } from './app.module';

import { ZodValidationPipe } from 'nestjs-zod';

import { DEFAULT_CORS_ORIGIN, DEFAULT_PORT } from './shared/constants/constants';

async function bootstrap() {
  dns.setServers(['8.8.8.8', '8.8.4.4']);

  const app =
    await NestFactory.create(AppModule);

  app.enableCors({
    origin: DEFAULT_CORS_ORIGIN,
    credentials: true,
  });

  app.useGlobalPipes(
    new ZodValidationPipe(),
  );

 const port = Number(process.env.PORT) || DEFAULT_PORT;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}/`);
}

bootstrap();
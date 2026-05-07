import { NestFactory } from '@nestjs/core';
import * as dns from 'node:dns';
import { AppModule } from './app.module';
import { ZodValidationPipe } from 'nestjs-zod';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import {
  DEFAULT_CORS_ORIGIN,
  DEFAULT_PORT,
} from './shared/constants/constants';

async function bootstrap() {
  dns.setServers(['8.8.8.8', '8.8.4.4']);

  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: DEFAULT_CORS_ORIGIN,
    credentials: true,
  });

  app.useGlobalPipes(new ZodValidationPipe());

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Coupon-Based Lead Form API')
    .setDescription(
      'API documentation for managing coupons and lead submissions',
    )
    .setVersion('1.0')
    .addTag('coupons')
    .addTag('leads')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = Number(process.env.PORT) || DEFAULT_PORT;
  await app.listen(port);
  console.log(`API running on http://localhost:${port}/`);
  console.log(`Swagger Docs available on http://localhost:${port}/api/docs`);
}

bootstrap();

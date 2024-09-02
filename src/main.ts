import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // Strips out any properties that are not part of the DTO
      whitelist: true,

      // Throws an error if any properties that are not part of the DTO are present in the request
      forbidNonWhitelisted: true,

      // Automatically transforms input data types to match the types defined in the DTO
      transform: true,

      transformOptions: {
        // Enables implicit type conversion, so strings can be automatically converted to numbers, booleans, etc.
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('My Blog App API')
    .setDescription('Use the base API URL as http://localhost:3000')
    .setTermsOfService('http://localhost:3000/term-of-service')
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();

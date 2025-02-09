import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes();
  const config = new DocumentBuilder()
    .setTitle('Api baemin')
    .setDescription('Api for baemin app')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();

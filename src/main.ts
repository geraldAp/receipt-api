import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  const config = new DocumentBuilder()
    .setTitle('Quick Receipts Api')
    .setDescription(
      'The api End points and schema structure needed for using this E-receipt  service. Enjoy',
    )
    .setVersion('1.0')
    .addTag('Quick E-receipt ')
    .addServer('v1')
    .addServer('v2')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/e-receipt', app, documentFactory);

  await app.listen(8000);
}
bootstrap();

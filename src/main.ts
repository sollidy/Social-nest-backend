import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ROLE_ADMIN } from './auth/auth.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Social-net by m7mark')
    .setDescription('Social API description')
    .setVersion('1.0')
    .addTag('Social')
    .addBearerAuth({ type: 'http' }, ROLE_ADMIN)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: { defaultModelsExpandDepth: -1 },
  });

  await app.listen(5000);
}
bootstrap();

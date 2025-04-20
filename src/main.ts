import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const API_PORT = configService.get<number>('port');
  const API_VERSION = configService.get<string>('versionApi');

  app.setGlobalPrefix(`api/${API_VERSION}`);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(API_PORT);
  console.log(`Server is running on port ${API_PORT}`);
}
bootstrap();

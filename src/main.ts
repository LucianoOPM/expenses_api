import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api/v1');
  app.enableVersioning({
    type: VersioningType.URI,
  });
  await app.listen(configService.get<number>('port'));
  console.log(`Server is running on port ${configService.get<number>('port')}`);
}
bootstrap();

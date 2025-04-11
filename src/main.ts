import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionsFilter } from './filters/all-exceptions';
import { UnauthorizedExceptionFilter } from './filters/UnauthorizedExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionsFilter())
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnauthorizedExceptionFilter } from './filters/UnauthorizedExceptionFilter';
import { AllExceptionsFilter } from './exceptions/all-exceptions.filter';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe with detailed error messages
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (validationErrors = []) => {
        const formatErrors = (errors) => {
          return errors.map((error) => {
            const constraints = Object.values(error.constraints || {});
            const nestedErrors =
              error.children && error.children.length > 0
                ? formatErrors(error.children)
                : [];

            return {
              field: error.property,
              errors: constraints.concat(...nestedErrors),
            };
          });
        };

        const errors = formatErrors(validationErrors);

        return new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          errors: errors,
        });
      },
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  // app.useGlobalInterceptors(new ResponseInterceptor());
  app.setGlobalPrefix('api')
  await app.listen(3000);
}
bootstrap();

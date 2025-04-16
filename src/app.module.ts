import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { ErrorHandlingMiddleware } from './middleware/error-handling-middleware';
import { ConfigModule } from '@nestjs/config';
import { ContactController } from './contact-management/contact/contact.controller';
import { ContactModule } from './contact-management/contact/contact.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true, // Make ConfigModule global
    // }),
    ConfigModule.forRoot(),    
    TypeOrmModule.forRoot(AppDataSource),
    AuthModule,
    ContactModule,
  ],
  controllers: [ContactController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ErrorHandlingMiddleware).forRoutes('*');
  }
}

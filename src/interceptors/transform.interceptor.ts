import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { format } from 'date-fns';

export type Response<T> = {
  status: boolean;
  statusCode: number;
  path: string;
  message: string;
  data?: T;
  errors?: any; // Capture errors if present
  timestamp: string;
};

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((res) => this.responseHandler(res, context)),
      catchError((err) => {
        // If response is already sent, do not try to send it again
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();

        if (response.headersSent) {
          // If headers are already sent, prevent sending again and propagate the error
          return throwError(() => err);
        }

        // Handle the error properly
        if (err instanceof BadRequestException) {
          return throwError(() => this.handleValidationError(err, context));
        }

        return throwError(() => this.errorHandler(err, context));
      }),
    );
  }

  // Ensure response is sent only once
  private isResponseAlreadySent(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    return response.headersSent;
  }

  handleValidationError(
    exception: BadRequestException,
    context: ExecutionContext,
  ) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status = HttpStatus.BAD_REQUEST;
    const responseBody: any = exception.getResponse();

    // Prevent sending the response if it's already been sent
    if (response.headersSent) return;

    return response.status(status).json({
      status: false,
      statusCode: status,
      path: request.url,
      // message: 'Validation failed',
      errors: responseBody.errors, // Include validation errors
      // timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    });
  }

  errorHandler(exception: any, context: ExecutionContext) {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let code = 'INTERNAL_SERVER_ERROR';

    // If it's a HttpException, extract details
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
      code = exception.name;
    } else if (exception instanceof Error) {
      message = exception.message;
      code = exception.name;
    }

    // Prevent sending the response if it's already been sent
    if (response.headersSent) return;

    return response.status(status).json({
      status: false,
      statusCode: status,
      path: request.url,
      message,
      code,
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    });
  }

  responseHandler(res: any, context: ExecutionContext): Response<T> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest();
    const statusCode = ctx.getResponse().statusCode;

    return {
      status: true,
      statusCode,
      path: request.url,
      message: 'Request successful',
      data: res,
      timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    };
  }
}

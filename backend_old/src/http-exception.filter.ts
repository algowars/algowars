import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

const errorMessages = {
  404: 'Not Found',
  500: 'Internal server error',
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    let message = exception.message || errorMessages[status];

    // Handle validation errors separately
    if (status === 400 && this.isValidationError(exception)) {
      message = this.formatValidationErrorResponse(exception);
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }

  private isValidationError(exception: HttpException): boolean {
    return (
      'response' in exception &&
      exception['response'] &&
      'message' in exception['response'] &&
      Array.isArray(exception['response'].message)
    );
  }

  private formatValidationErrorResponse(exception: HttpException): string {
    const exceptionResponse = exception['response'];
    return exceptionResponse.message.join(', ');
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { HttpExceptionFilter } from './http-exception.filter';
import { HttpException, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { Logger } from '@nestjs/common';

describe('HttpExceptionFilter', () => {
  let filter: HttpExceptionFilter;

  beforeEach(async () => {
    jest.spyOn(Logger.prototype, 'error').mockImplementation(jest.fn()); // Mock logger

    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpExceptionFilter],
    }).compile();

    filter = module.get<HttpExceptionFilter>(HttpExceptionFilter);
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  describe('catch', () => {
    let mockResponse: Partial<Response>;
    let mockHost: Partial<ArgumentsHost>;

    beforeEach(() => {
      mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      mockHost = {
        switchToHttp: jest.fn().mockReturnValue({
          getResponse: jest.fn().mockReturnValue(mockResponse),
        }),
      };
    });

    it('should handle general HTTP exceptions', async () => {
      const exception = new HttpException('Forbidden', 403);

      await filter.catch(exception, mockHost as ArgumentsHost);

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        statusCode: 403,
        message: 'Forbidden',
      });
    });

    it('should handle not found exceptions', async () => {
      const exception = new HttpException('Not Found', 404);

      await filter.catch(exception, mockHost as ArgumentsHost);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        statusCode: 404,
        message: 'Not Found',
      });
    });

    it('should handle internal server error exceptions', async () => {
      const exception = new HttpException('Internal server error', 500);

      await filter.catch(exception, mockHost as ArgumentsHost);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        statusCode: 500,
        message: 'Internal server error',
      });
    });

    it('should handle validation errors', async () => {
      const exceptionResponse = {
        message: ['name must be a string', 'age must be a number'],
      };
      const exception = new HttpException(exceptionResponse, 400);

      jest.spyOn(filter as any, 'isValidationError').mockReturnValue(true);
      jest
        .spyOn(filter as any, 'formatValidationErrorResponse')
        .mockReturnValue('name must be a string, age must be a number');

      await filter.catch(exception, mockHost as ArgumentsHost);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        statusCode: 400,
        message: 'name must be a string, age must be a number',
      });
    });
  });
});

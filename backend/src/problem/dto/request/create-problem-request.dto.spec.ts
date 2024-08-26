import { plainToInstance } from 'class-transformer';
import { CreateProblemRequest } from './create-problem-request.dto';
import { validate } from 'class-validator';

const initialRequest = {
  title: 'Test title',
  question: 'This is a question?',
  slug: 'this-is-a-slug',
  rating: 100,
  initialCode: 'initial code',
  solution: 'this is a solution',
  languageId: 93,
};

describe('CreateProblemRequestDto', () => {
  let request = { ...initialRequest };

  beforeEach(() => {
    request = { ...initialRequest };
  });

  it('should throw an error if there is not a title', async () => {
    delete request.title;

    const dto = plainToInstance(CreateProblemRequest, request);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('title');
  });

  it('should throw an error if title is an empty string', async () => {
    request.title = '';

    const dto = plainToInstance(CreateProblemRequest, request);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('title');
  });

  it('should throw an error if title is longer than the allowed amount', async () => {
    request.title = 'a'.repeat(400);

    const dto = plainToInstance(CreateProblemRequest, request);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('title');
  });

  it('should throw an error if title is not of type string', async () => {
    const invalidRequest = {
      title: 123,
    };

    const dto = plainToInstance(CreateProblemRequest, invalidRequest);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('title');
  });

  it('should throw an error if there is not a question', async () => {
    delete request.question;

    const dto = plainToInstance(CreateProblemRequest, request);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('question');
  });

  it('should throw an error if question is an empty string', async () => {
    request.question = '';

    const dto = plainToInstance(CreateProblemRequest, request);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('question');
  });

  it('should throw an error if question is longer than the allowed amount', async () => {
    request.question = 'a'.repeat(301);

    const dto = plainToInstance(CreateProblemRequest, request);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('question');
  });

  it('should throw an error if question is not of type string', async () => {
    const invalidRequest = {
      question: 123,
    };

    const dto = plainToInstance(CreateProblemRequest, invalidRequest);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('question');
  });

  it('should throw an error if there is not a slug', async () => {
    delete request.slug;

    const dto = plainToInstance(CreateProblemRequest, request);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('slug');
  });

  it('should throw an error if slug is an empty string', async () => {
    request.slug = '';

    const dto = plainToInstance(CreateProblemRequest, request);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('slug');
  });

  it('should throw an error if slug is longer than the allowed amount of 200 characters', async () => {
    request.slug = 'a'.repeat(201);

    const dto = plainToInstance(CreateProblemRequest, request);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('slug');
  });

  it('should throw an error if slug is not of type string', async () => {
    const invalidRequest = {
      slug: 123,
    };

    const dto = plainToInstance(CreateProblemRequest, invalidRequest);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('slug');
  });

  it('should throw an error if there is not a rating', async () => {
    delete request.rating;

    const dto = plainToInstance(CreateProblemRequest, request);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('rating');
  });

  it('should throw an error if rating is negative', async () => {
    request.rating = -1;

    const dto = plainToInstance(CreateProblemRequest, request);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('rating');
  });

  it('should throw an error if rating is not of type number', async () => {
    const invalidRequest = {
      rating: 'not a number',
    };

    const dto = plainToInstance(CreateProblemRequest, invalidRequest);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('rating');
  });

  it('should throw an error if there is not a initialCode', async () => {
    delete request.initialCode;

    const dto = plainToInstance(CreateProblemRequest, request);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('initialCode');
  });

  it('should throw an error if initialCode is an empty string', async () => {
    request.initialCode = '';

    const dto = plainToInstance(CreateProblemRequest, request);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('initialCode');
  });

  it('should throw an error if initialCode is longer than the allowed amount of characters', async () => {
    request.initialCode = 'a'.repeat(1001);

    const dto = plainToInstance(CreateProblemRequest, request);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('initialCode');
  });

  it('should throw an error if initialCode is not of type string', async () => {
    const invalidRequest = {
      initialCode: 123,
    };

    const dto = plainToInstance(CreateProblemRequest, invalidRequest);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('initialCode');
  });

  it('should throw an error if there is not a solution', async () => {
    delete request.solution;

    const dto = plainToInstance(CreateProblemRequest, request);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('solution');
  });

  it('should throw an error if solution is an empty string', async () => {
    request.solution = '';

    const dto = plainToInstance(CreateProblemRequest, request);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('solution');
  });

  it('should throw an error if solution is longer than the allowed amount of characters', async () => {
    request.solution = 'a'.repeat(1001);

    const dto = plainToInstance(CreateProblemRequest, request);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('solution');
  });

  it('should throw an error if solution is not of type string', async () => {
    const invalidRequest = {
      solution: 123,
    };

    const dto = plainToInstance(CreateProblemRequest, invalidRequest);
    const errors = await validate(dto);

    const errorProperties = errors.map((error) => error.property);
    expect(errorProperties).toContain('solution');
  });
});

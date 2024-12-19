import { plainToInstance } from 'class-transformer';
import { CreateProblemRequest } from './create-problem.dto';
import { validate } from 'class-validator';

describe('CreateProblemRequest', () => {
  const defaultRequest = {
    title: 'Test Problem',
    slug: 'test-problem',
    question: 'This is a test question to the problem.',
  };
  it('Should allow valid dto', async () => {
    const dto = {
      ...defaultRequest,
    };
    const request = plainToInstance(CreateProblemRequest, dto);

    const errors = await validate(request);
    expect(errors.length).toBe(0);
  });

  it('Should error if there is no title', () => {});

  it('Should error if title is empty', () => {});

  it('Should error if title is too long', () => {});

  it('Should error if there is no slug', () => {});

  it('Should error if slug is empty', () => {});

  it('Should error if slug is too long', () => {});

  it('Should error if there is no question', () => {});

  it('Should error if question is empty', () => {});

  it('Should error if question is too long', () => {});
});

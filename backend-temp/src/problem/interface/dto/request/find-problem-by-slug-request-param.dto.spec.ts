import { plainToInstance } from 'class-transformer';
import { FindProblemBySlugRequestParam } from './find-problem-by-slug-request-param.dto';
import { validate } from 'class-validator';

describe('FindProblemBySlugRequestParam', () => {
  const defaultParam = {
    slug: 'test',
  };
  it('Should allow valid dto', async () => {
    const dto = { ...defaultParam };
    const param = plainToInstance(FindProblemBySlugRequestParam, dto);

    const errors = await validate(param);
    expect(errors.length).toBe(0);
  });

  it('Should error if no slug is provided', async () => {
    const dto = {};
    const param = plainToInstance(FindProblemBySlugRequestParam, dto);

    const errors = await validate(param);
    expect(errors.length).not.toBe(0);

    const slugError = errors.find((error) => error.property === 'slug');

    expect(slugError).toBeDefined();
    expect(slugError?.constraints).toBeDefined();
    expect(slugError?.constraints?.isNotEmpty).toContain(
      'slug should not be empty',
    );
  });

  it('Should error if slug is an empty string', async () => {
    const dto = {
      slug: '',
    };
    const param = plainToInstance(FindProblemBySlugRequestParam, dto);

    const errors = await validate(param);
    expect(errors.length).not.toBe(0);

    const slugError = errors.find((error) => error.property === 'slug');

    expect(slugError).toBeDefined();
    expect(slugError?.constraints).toBeDefined();
    expect(slugError?.constraints?.isNotEmpty).toContain(
      'slug should not be empty',
    );
  });
});

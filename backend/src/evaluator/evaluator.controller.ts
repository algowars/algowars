import { Body, Controller, Post } from '@nestjs/common';
import { EvaluatorService } from './evaluator.service';
import { CreateEvaluationDto } from 'src/evaluator/dto/create-evaluation.entity';
import { EvaluatorSubmissionResponse } from 'src/data-model/model/evaluator-submission-response';

@Controller('/v1/evaluator')
export class EvaluatorController {
  constructor(private readonly evaluatorService: EvaluatorService) {}

  @Post('evaluate/anonymous')
  evaluateAnonymous(
    @Body() createEvaluationDto: CreateEvaluationDto,
  ): Promise<EvaluatorSubmissionResponse> {
    const solution = `
  /**
 * @param {number} n
 * @return {string[]}
 */
var fizzBuzz = function(n) {
    var ans = [];

    for (var i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            ans.push("FizzBuzz");
        } else if (i % 3 === 0) {
            ans.push("Fizz");
        } else if (i % 5 === 0) {
            ans.push("Buzz");
        } else {
            ans.push(i.toString());
        }
    }

    return ans;
};`;
    return this.evaluatorService.evaluateAnonymous(
      createEvaluationDto.code + `\n ${test}`,
    );
  }

  @Post('evaluate/submit')
  submit(
    createEvaluation: CreateEvaluationDto,
  ): Promise<EvaluatorSubmissionResponse> {
    const tests = `
    // Test cases
    test('returns "Fizz" for multiples of 3', () => {
        expect(fizzBuzz(3)).toEqual(['1', '2', 'Fizz']);
    });
    
    test('returns "Buzz" for multiples of 5', () => {
        expect(fizzBuzz(5)).toEqual(['1', '2', 'Fizz', '4', 'Buzz']);
    });
    
    test('returns "FizzBuzz" for multiples of 3 and 5', () => {
        expect(fizzBuzz(15)).toEqual(['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']);
    });
    
    test('handles 0 correctly', () => {
        expect(fizzBuzz(0)).toEqual([]);
    });
    `;

    return this.evaluatorService.evaluateAnonymous(`
        ${createEvaluation.code}

        ${tests}
        `);
  }

  private;
}


function test(description, fn) {
    try {
        fn();
        console.log('✅', description);
    } catch (error) {
        console.log('❌', description);
        console.error(error);
    }
}

function expect(received) {
    return {
        toEqual(expected) {
            if (JSON.stringify(received) !== JSON.stringify(expected)) {
                throw new Error(\`Expected \${JSON.stringify(expected)}, but received \${JSON.stringify(received)}\`);
            }
        }
    }
}

test('returns "Fizz" for multiples of 3', () => {
    expect(fizzBuzz(3)).toEqual(['1', '2', 'Fizz']);
});

test('returns "Buzz" for multiples of 5', () => {
    expect(fizzBuzz(5)).toEqual(['1', '2', 'Fizz', '4', 'Buzz']);
});

test('returns "FizzBuzz" for multiples of 3 and 5', () => {
    expect(fizzBuzz(15)).toEqual(['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz', 'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz']);
});

test('handles 0 correctly', () => {
    expect(fizzBuzz(0)).toEqual([]);
});
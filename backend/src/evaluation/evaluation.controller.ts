import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { CreateEvaluationAnonymousCommand } from './commands/create-evaluation-anonymous/create-evaluation-anonymous.command';
import { CreateEvaluationAnonymous } from './dto/request/create-evaluation-anonymous.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { AuthorizationGuard } from 'src/auth/authorization.guard';
import { Request } from 'express';
import { CreateEvaluation } from './dto/request/create-evaluation.dto';
import { CreateEvaluationCommand } from './commands/create-evaluation/create-evaluation.command';

@Controller('v1/evaluation')
export class EvaluationController {
  constructor(
    private readonly commandBus: CommandBus, // Handles command dispatching
    private readonly queryBus: QueryBus,     // Handles query dispatching (not used in this example)
  ) { }

  // Endpoint for anonymous evaluation
  @UseGuards(AuthorizationGuard) // Applies the AuthorizationGuard to secure the route
  @Post('anonymous')
  async evaluateAnonymous(
    @Body() createEvaluationAnonymous: CreateEvaluationAnonymous, // The request body containing evaluation details
    @Req() request: Request,                                       // The request object, used here to access auth information
  ): Promise<string> {
    const sub = request.auth.payload.sub; // Extracts the subject (user identifier) from the JWT payload
    return this.commandBus.execute<CreateEvaluationAnonymousCommand, string>(
      new CreateEvaluationAnonymousCommand(createEvaluationAnonymous, sub), // Dispatches the CreateEvaluationAnonymousCommand
    );
  }

  // Endpoint for authenticated user evaluation
  @UseGuards(AuthorizationGuard) // Applies the AuthorizationGuard to secure the route
  @Post()
  async evaluate(
    @Body() createEvaluation: CreateEvaluation, // The request body containing evaluation details
    @Req() request: Request,                    // The request object, used here to access auth information
  ): Promise<string> {
    const sub = request.auth.payload.sub; // Extracts the subject (user identifier) from the JWT payload
    return this.commandBus.execute<CreateEvaluationCommand, string>(
      new CreateEvaluationCommand(createEvaluation, sub), // Dispatches the CreateEvaluationCommand
    );
  }
}

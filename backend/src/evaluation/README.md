# Evaluation Domain

The evaluation domain handles evaluating all users code. It currently built upon using [Judge0](https://judge0.com/) and will soon have its in-house code evaluation service.

## Requirements

Evaluation domain relies upong the CQRS Module, and HttpModule. The HttpModule will be used to make api requests to [judge0](https://judge0.com/)

## Services

### Evaluation Service

Service used to interact with external code execution service. EvaluationService has the accessible methods:

- `createSubmission(createJudgeSubmission[])`
- `getSubmissionsByTokens(tokens: string[])`

`createSubmission(createJudgeSubmission[])`:
Creates a batch submission to evaluation microservice and returns a promise of:
`{token: string}`

`getSubmissionsByTokens(tokens: string[])`:
Gets batch submission by it's tokens. The return value of this method is `JudgeSubmission[]`

// FindAccountBySubQuery is a query class that is used to find an account by its 'sub' field.
// It contains the 'sub' field as its data payload.
export class FindAccountBySubQuery {
  constructor(
    public readonly sub: string, // The subject or subscription identifier of the account to be found.
  ) { }
}

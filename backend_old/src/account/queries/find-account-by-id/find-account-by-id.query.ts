// FindAccountByIdQuery is a query class that is used to find an account by its ID.
// It contains the account ID as its data payload.
export class FindAccountByIdQuery {
  constructor(
    public readonly id: string, // The unique identifier of the account to be found.
  ) { }
}

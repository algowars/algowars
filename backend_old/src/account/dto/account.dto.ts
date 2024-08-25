// AccountDto is a Data Transfer Object (DTO) representing an account.
// It is used to transfer account data between different parts of the application.
export class AccountDto {
  constructor(
    readonly id: string, // The unique identifier for the account.
    readonly username: string, // The username of the account.
    readonly createdAt: Date, // The timestamp when the account was created.
    readonly updatedAt: Date, // The timestamp when the account was last updated.
  ) { }
}

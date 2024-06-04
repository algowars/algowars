export class AccountDto {
  constructor(
    readonly id: string,
    readonly username: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {}
}

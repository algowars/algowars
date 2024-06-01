export class UpdateTitleCommand {
  constructor(
    public readonly problemId: string,
    public readonly title: string,
  ) {}
}

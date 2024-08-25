/**
 * This class defines a command for updating the title of a problem.
 * It encapsulates the problem ID and the new title that will be assigned to the problem.
 */
export class UpdateTitleCommand {
  /**
   * Constructor that initializes the UpdateTitleCommand with the provided problem ID and title.
   * @param problemId - The ID of the problem to be updated.
   * @param title - The new title to be assigned to the problem.
   */
  constructor(
    public readonly problemId: string,
    public readonly title: string,
  ) { }
}

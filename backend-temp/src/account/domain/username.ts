export interface Username {
  toString(): string;
  validateUsername(username: string): string[];
}

export class UsernameImplementation implements Username {
  private readonly value: string;

  constructor(username: string) {
    const errors = this.validateUsername(username);

    if (errors.length) {
      throw new Error(errors.join(', '));
    }

    this.value = username;
  }

  toString(): string {
    return this.value;
  }

  validateUsername(username: string): string[] {
    const errors = [];
    if (username.length < 3 || username.length > 16) {
      errors.push('username must been withing 3 to 16 characters');
    }

    return errors;
  }
}

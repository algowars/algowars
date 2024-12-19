export interface UserSub {
  toString(): string;
  validateSub(sub: string): string[];
}

export class UserSubImplementation implements UserSub {
  private readonly sub: string;

  constructor(sub: string) {
    const errors = this.validateSub(sub);

    if (errors.length) {
      throw new Error(errors.join(', '));
    }

    this.sub = sub;
  }

  toString(): string {
    return this.sub;
  }

  validateSub(sub: string): string[] {
    const errors = [];

    // Check if the sub contains a pipe separator
    if (!sub.includes('|')) {
      errors.push('Invalid sub format: must contain a pipe (|) separator');
    }

    // Check if both parts (provider and user ID) are present
    const parts = sub.split('|');
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      errors.push('Invalid sub format: must contain both provider and user ID');
    }

    return errors;
  }
}

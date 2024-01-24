/* eslint-disable @typescript-eslint/ban-types */
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';

@ValidatorConstraint()
export class IsBeforeNowConstraint implements ValidatorConstraintInterface {
  validate(date: Date) {
    return Date.now() > date.getTime();
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `Date ${validationArguments.property} can not be after the current time.`;
  }
}

export function IsBeforeNow(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: IsBeforeNowConstraint,
    });
  };
}

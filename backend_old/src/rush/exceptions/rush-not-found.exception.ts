import { HttpException, HttpStatus } from '@nestjs/common';
import { RushLabel } from '../labels/rush.label';

export class RushNotFoundException extends HttpException {
  constructor() {
    super(RushLabel.RUSH_NOT_FOUND, HttpStatus.NOT_FOUND);
  }
}

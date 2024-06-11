import { Injectable } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { EntityFactory } from 'src/db/entity.factory';

@Injectable()
export class TestFactory implements EntityFactory<Test> {
  constructor() {}
}

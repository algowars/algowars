import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';

@Module({
  controllers: [ProfileController],
  providers: [],
})
export class ProfileModule {}

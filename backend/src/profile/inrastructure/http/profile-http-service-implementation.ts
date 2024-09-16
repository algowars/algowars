import { Injectable } from '@nestjs/common';
import { ProfileHttpService } from 'src/profile/application/http/profile-http-service';

@Injectable()
export class ProfileHttpServiceImplementation implements ProfileHttpService {}

import { Profile } from 'src/profile/interface/dto/response/profile.dto';

export interface ProfileHttpService {
  getProfileBySub(sub: string): Promise<Profile>;
}

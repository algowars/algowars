import { Player } from 'src/data-model/entities';
import { UpdatePlayerDto } from '../dto/update-player.dto';

export class PlayerMock {
  static mockPlayerService(players: Player[] = []) {
    return {
      findById: jest.fn((id: string): Promise<Player> => {
        return Promise.resolve(players.find((ply) => ply.id === id) ?? null);
      }),
      findByUsername: jest.fn((username: string): Promise<Player> => {
        return Promise.resolve(
          players.find((ply) => ply.username === username) ?? null,
        );
      }),
      updatePlayer: jest.fn(
        (
          { username, bio, websiteUrl, location }: UpdatePlayerDto,
          player: Player,
        ): Promise<Player> => {
          player.username = username;
          player.bio = bio;
          player.websiteUrl = websiteUrl;
          player.location = location;
          return Promise.resolve(player);
        },
      ),
      updateUsername: jest.fn(
        (username: string, player: Player): Promise<Player> => {
          player.username = username;

          return Promise.resolve(player);
        },
      ),
    };
  }
}

import { Controller, Get, Query } from '@nestjs/common';
import { PlayerService } from './player.service';
import { GetPlayerDto } from './dto/get-player.dto';
import { PlayerResponseDto } from './dto/player-response.dto';
import { PlayerNotFoundException } from './exceptions/player-not-found.exception';

@Controller('v1/player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Get('find/username')
  async getPlayerByUsername(
    @Query()
    getPlayerDto: GetPlayerDto,
  ): Promise<PlayerResponseDto> {
    const foundPlayer = await this.playerService.findByUsername(
      getPlayerDto.username,
    );

    if (!foundPlayer) {
      throw new PlayerNotFoundException();
    }

    return {
      id: foundPlayer.id,
      username: foundPlayer.username,
      bio: foundPlayer.username,
      websiteUrl: foundPlayer.websiteUrl,
      location: foundPlayer.location,
      createdAt: foundPlayer.createdAt,
    };
  }
}

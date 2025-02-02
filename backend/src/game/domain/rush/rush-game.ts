import { Game, GameProperties } from '../game';
import { RushRound } from './rush-round';

export interface RushGameProperties extends GameProperties {}

export interface RushGame {}

export class RushGameImplementation extends Game implements RushGame {
  private rounds: RushRound[];

  constructor(properties: RushGameProperties) {
    super(properties);
  }

  protected onStart(): void {
    // TODO: Initialize the first round and any game-specific state
    console.log('Rush game started.');
    // For example:
    // const firstRound = new RushRoundImplementation(/* any necessary properties */);
    // this.rounds.push(firstRound);
  }

  protected onFinish(): void {
    // TODO: Compute final scores, clean up resources, etc.
    console.log('Rush game finished.');
  }
}

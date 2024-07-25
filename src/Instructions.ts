import { Turn } from "./directions";

interface RoverLike {
  move(): void;
  turn(side: Turn.Left | Turn.Right): void;
}

export class Instructions<Rover extends RoverLike> {
  private instructions: Turn[];
  constructor(instructions: Turn[]) {
    this.instructions = instructions;
  }

  public execute(rover: Rover) {
    for (const instruction of this.instructions) {
      if (instruction === Turn.Left || instruction === Turn.Right) {
        rover.turn(instruction);
        continue;
      }

      rover.move();
    }
  }
}

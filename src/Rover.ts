import { Direction, Turn, possibleTurns } from "./directions";

interface PletauLike {
  addRover(rover: Rover): void;
  isWithinBoundaries(x: number, y: number): boolean;
}

export class Rover {
  private x: number;
  private y: number;
  private direction: Direction;
  private pletau: PletauLike | null;

  constructor(x: number, y: number, direction: Direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.pletau = null;
  }

  public placeOnPletau(pletau: PletauLike) {
    pletau.addRover(this);
    this.pletau = pletau;
  }

  public move() {
    if (!this.pletau) {
      throw new Error("Rover is not placed on a pletau");
    }

    switch (this.direction) {
      case Direction.North:
        if (this.pletau.isWithinBoundaries(this.x, this.y + 1)) {
          this.y++;
        }
        break;
      case Direction.East:
        if (this.pletau.isWithinBoundaries(this.x + 1, this.y)) {
          this.x++;
        }
        break;
      case Direction.South:
        if (this.pletau.isWithinBoundaries(this.x, this.y - 1)) {
          this.y--;
        }
        break;
      case Direction.West:
        if (this.pletau.isWithinBoundaries(this.x - 1, this.y)) {
          this.x--;
        }
        break;
      default:
        throw new Error("Invalid direction");
    }
  }

  public turn(side: Turn.Left | Turn.Right) {
    this.direction = possibleTurns[this.direction][side];
  }

  public getPosition(): { x: number; y: number } {
    return {
      x: this.x,
      y: this.y,
    };
  }

  public toString(): string {
    return `${this.x} ${this.y} ${this.direction}`;
  }
}

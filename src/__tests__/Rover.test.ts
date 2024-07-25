import { Direction, Turn } from "../directions";
import { Rover } from "../Rover";
import { describe, it, expect, vi } from "vitest";

describe("Rover", () => {
  it("Should initialize with a position and direction", () => {
    const rover = new Rover(10, 20, Direction.North);
    expect(rover.getPosition()).toBe("10 20 N");
  });

  it("Should place rover to a pletau", () => {
    const rover = new Rover(10, 20, Direction.North);
    const pletau = {
      addRover: vi.fn(),
      isWithinBoundaries: vi.fn().mockReturnValue(true),
    };
    rover.placeOnPletau(pletau);
    expect(pletau.addRover).toHaveBeenCalledWith(rover);
  });

  it("Should throw error if rover is not within platou boundaries", () => {
    const rover = new Rover(10, 20, Direction.North);
    const pletau = {
      addRover: vi.fn(),
      isWithinBoundaries: vi.fn().mockReturnValue(false),
    };
    expect(() => rover.placeOnPletau(pletau)).toThrowError(
      "Rover is placed outside of the pletau"
    );
  });

  it('Should have postion "10 21 N" after moving north', () => {
    const rover = new Rover(10, 20, Direction.North);
    const pletau = {
      addRover: vi.fn(),
      isWithinBoundaries: vi.fn().mockReturnValue(true),
    };
    rover.placeOnPletau(pletau);
    rover.move();
    expect(rover.getPosition()).toBe("10 21 N");
  });

  it('Should have postion "11 20 E" after moving east', () => {
    const rover = new Rover(10, 20, Direction.East);
    const pletau = {
      addRover: vi.fn(),
      isWithinBoundaries: vi.fn().mockReturnValue(true),
    };
    rover.placeOnPletau(pletau);
    rover.move();
    expect(rover.getPosition()).toBe("11 20 E");
  });

  it('Should have postion "10 19 S" after moving south', () => {
    const rover = new Rover(10, 20, Direction.South);
    const pletau = {
      addRover: vi.fn(),
      isWithinBoundaries: vi.fn().mockReturnValue(true),
    };
    rover.placeOnPletau(pletau);
    rover.move();
    expect(rover.getPosition()).toBe("10 19 S");
  });

  it('Should have postion "9 20 W" after moving west', () => {
    const rover = new Rover(10, 20, Direction.West);
    const pletau = {
      addRover: vi.fn(),
      isWithinBoundaries: vi.fn().mockReturnValue(true),
    };
    rover.placeOnPletau(pletau);
    rover.move();
    expect(rover.getPosition()).toBe("9 20 W");
  });

  it("Should throw error if rover is not placed on a pletau", () => {
    const rover = new Rover(10, 20, Direction.North);
    expect(() => rover.move()).toThrowError("Rover is not placed on a pletau");
  });

  it("Should face N after turning left from E", () => {
    const rover = new Rover(10, 20, Direction.East);
    rover.turn(Turn.Left);
    expect(rover.getPosition()).toBe("10 20 N");
  });

  it("Should face E after turning right from N", () => {
    const rover = new Rover(10, 20, Direction.North);
    rover.turn(Turn.Right);
    expect(rover.getPosition()).toBe("10 20 E");
  });

  it("Should face N after turning right from W", () => {
    const rover = new Rover(10, 20, Direction.West);
    rover.turn(Turn.Right);
    expect(rover.getPosition()).toBe("10 20 N");
  });
});

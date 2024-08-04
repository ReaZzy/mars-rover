import { Turn } from "../directions";
import { Instructions } from "../Instructions";
import { describe, it, expect, vi } from "vitest";

describe("Instructions", () => {
  it('Should execute "L" instruction', () => {
    const rover = {
      move: vi.fn(),
      turn: vi.fn(),
    };
    const instructions = new Instructions([Turn.Left]);
    instructions.execute(rover);
    expect(rover.turn).toHaveBeenCalledWith(Turn.Left);
  });

  it('Should execute "R" instruction', () => {
    const rover = {
      move: vi.fn(),
      turn: vi.fn(),
    };
    const instructions = new Instructions([Turn.Right]);
    instructions.execute(rover);
    expect(rover.turn).toHaveBeenCalledWith(Turn.Right);
  });

  it('Should execute "M" instruction', () => {
    const rover = {
      move: vi.fn(),
      turn: vi.fn(),
    };
    const instructions = new Instructions([Turn.Forward]);
    instructions.execute(rover);
    expect(rover.move).toHaveBeenCalled();
  });

  it('Should execute "LMLMLMLMM" instructions', () => {
    const rover = {
      move: vi.fn(),
      turn: vi.fn(),
    };
    const instructions = new Instructions([
      Turn.Left,
      Turn.Forward,
      Turn.Left,
      Turn.Forward,
      Turn.Left,
      Turn.Forward,
      Turn.Left,
      Turn.Forward,
      Turn.Forward,
    ]);
    instructions.execute(rover);
    expect(rover.turn).toHaveBeenCalledWith(Turn.Left);
    expect(rover.move).toHaveBeenCalledTimes(5);
  });
});

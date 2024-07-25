import { Direction, Turn } from "../directions";
import { Pletau } from "../Pletau";
import { Rover } from "../Rover";
import { describe, it, expect, vi } from "vitest";

describe("Pletau", () => {
  it("Should initialize with boundaries", () => {
    const pletau = new Pletau(10, 20);
    expect(pletau.isWithinBoundaries(5, 5)).toBe(true);
  });

  it("Should throw error outside boundaries", () => {
    const pletau = new Pletau(10, 20);
    expect(pletau.isWithinBoundaries(15, 15)).toBe(false);
  });

  it("Should add rover to pletau", () => {
    const pletau = new Pletau(10, 20);
    const rover = {
      getPosition: () => "10 20 N",
    };

    pletau.addRover(rover);
    expect(pletau.getRovers()).toContain(rover);
  });

  it("Should print rovers positions", () => {
    const pletau = new Pletau(10, 20);
    const rover1 = {
      getPosition: () => "10 20 N",
    };

    pletau.addRover(rover1);

    const rover2 = {
      getPosition: () => "15 20 S",
    };
    pletau.addRover(rover2);
    expect(pletau.toString()).toBe("10 20 N\n15 20 S\n");
  });
});

import { Pletau } from "../Pletau";
import { describe, it, expect } from "vitest";

describe("Pletau", () => {
  it("Should initialize with boundaries", () => {
    const pletau = new Pletau(10, 20);
    expect(pletau.isWithinBoundaries(5, 5)).toBe(true);
  });

  it("Should return false with invalid boundaries", () => {
    const pletau = new Pletau(10, 20);
    expect(pletau.isWithinBoundaries(15, 15)).toBe(false);
  });

  it("Should add rover to pletau", () => {
    const pletau = new Pletau(10, 20);
    const rover = {
      toString: () => "10 20 N",
      getPosition: () => ({ x: 10, y: 20 }),
    };

    pletau.addRover(rover);
    expect(pletau.getRovers()).toContain(rover);
  });

  it("Should print rovers positions", () => {
    const pletau = new Pletau(10, 20);
    const rover1 = {
      toString: () => "10 20 N",
      getPosition: () => ({ x: 10, y: 20 }),
    };

    pletau.addRover(rover1);

    const rover2 = {
      toString: () => "8 20 S",
      getPosition: () => ({ x: 8, y: 20 }),
    };

    pletau.addRover(rover2);
    expect(pletau.toString()).toBe("10 20 N\n8 20 S\n");
  });

  it("Should throw error when trying to place rover outside boundaries", () => {
    const pletau = new Pletau(10, 20);
    const invalidRover = {
      toString: () => "30 30 N",
      getPosition: () => ({ x: 30, y: 30 }),
    };

    expect(() => pletau.addRover(invalidRover)).toThrowError(
      "Rover cannot be placed outside of pletau",
    );
  });
});

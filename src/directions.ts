export enum Turn {
  Left = "L",
  Right = "R",
  Forward = "M",
}

export enum Direction {
  North = "N",
  East = "E",
  South = "S",
  West = "W",
}

export const possibleTurns = {
  [Direction.North]: {
    [Turn.Left]: Direction.West,
    [Turn.Right]: Direction.East,
  },
  [Direction.East]: {
    [Turn.Left]: Direction.North,
    [Turn.Right]: Direction.South,
  },
  [Direction.South]: {
    [Turn.Left]: Direction.East,
    [Turn.Right]: Direction.West,
  },
  [Direction.West]: {
    [Turn.Left]: Direction.South,
    [Turn.Right]: Direction.North,
  },
} as const;

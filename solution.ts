import { readFile, writeFile } from "fs";
import { join } from "path";
import { Pletau } from "./src/Pletau";
import { Rover } from "./src/Rover";
import { Instructions } from "./src/Instructions";
import { Direction, Turn } from "./src/directions";

function getInput(): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const inputFileName = join(__dirname, "input.txt");
    readFile(inputFileName, "utf-8", (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data.split("\n"));
    });
  });
}

const getRoversCoordinates = (input: string[]) => {
  const maxCoordinates = input[0].split(" ").map(Number);
  const pletau = new Pletau<Rover>(maxCoordinates[0], maxCoordinates[1]);
  for (let i = 1; i < input.length; i += 2) {
    const roverInfo = input[i].split(" ");
    const rover = new Rover(
      Number(roverInfo[0]),
      Number(roverInfo[1]),
      roverInfo[2] as Direction
    );
    const instructions = new Instructions<Rover>(
      input[i + 1].split("") as Turn[]
    );
    rover.placeOnPletau(pletau);
    instructions.execute(rover);
  }

  return pletau.toString();
};

getInput()
  .then((input) => {
    const result = getRoversCoordinates(input);

    writeFile(join(__dirname, "output.txt"), result, (err) => {
      if (err) {
        return console.error(err);
      }

      console.log("Result:", result);
      console.log("Output saved to output.txt");
    });
  })
  .catch(console.error);

import { readFile, writeFile } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

function getInput() {
  return new Promise((resolve, reject) => {
    const inputFileName = join(
      dirname(fileURLToPath(import.meta.url)),
      "input.txt",
    );
    readFile(inputFileName, "utf-8", (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data.split("\n"));
    });
  });
}

const turnings = {
  N: { L: "W", R: "E" },
  E: { L: "N", R: "S" },
  S: { L: "E", R: "W" },
  W: { L: "S", R: "N" },
};

const getRoversCoordinates = (input) => {
  const maxCoordinates = input[0].split(" ").map(Number);
  const minCoordinates = [0, 0];

  const rovers = [];
  for (let i = 1; i < input.length; i += 2) {
    const roverInfo = input[i].split(" ");
    const rover = {
      position: [Number(roverInfo[0]), Number(roverInfo[1])],
      facing: roverInfo[2],
      instructions: input[i + 1].split(""),
    };
    rovers.push(rover);
  }

  for (const rover of rovers) {
    for (const instruction of rover.instructions) {
      if (instruction === "M") {
        switch (rover.facing) {
          case "N":
            if (rover.position[1] < maxCoordinates[1]) {
              rover.position[1]++;
            }
            break;
          case "E":
            if (rover.position[0] < maxCoordinates[0]) {
              rover.position[0]++;
            }
            break;
          case "S":
            if (rover.position[1] > minCoordinates[1]) {
              rover.position[1]--;
            }
            break;
          case "W":
            if (rover.position[0] > minCoordinates[0]) {
              rover.position[0]--;
            }
            break;

          default:
            break;
        }
      }

      rover.facing = turnings[rover.facing][instruction] ?? rover.facing;
    }
  }

  return rovers.map((rover) => `${rover.position.join(" ")} ${rover.facing}`);
};

try {
  const input = await getInput();
  const result = getRoversCoordinates(input);

  writeFile(
    join(dirname(fileURLToPath(import.meta.url)), "output.txt"),
    result.join("\n"),
    (err) => {
      if (err) {
        return console.error(err);
      }

      console.log("Result:", result);
      console.log("Output saved to output.txt");
    },
  );
} catch (err) {
  console.error(err);
}

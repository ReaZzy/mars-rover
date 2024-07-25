interface RoverLike {
    getPosition(): string;
}

export class Pletau<Rover extends RoverLike> {
    private maxX: number;
    private maxY: number;
    private minX: number = 0;
    private minY: number = 0;
    private rovers: Rover[] = [];

    constructor(maxX: number, maxY: number, minX: number = 0, minY: number = 0) {
        this.maxX = maxX;
        this.maxY = maxY;
        this.minX = minX;
        this.minY = minY;
    }

    public isWithinBoundaries(x: number, y: number): boolean {
        return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
    }

    public addRover(rover: Rover): boolean {
        this.rovers.push(rover);
        return true
    }

    public getRovers(): Rover[] {
        return this.rovers;
    }

    public toString(): string {
        let result = '';
        for(const rover of this.rovers) {
            result += `${rover.getPosition()}\n`;
        }

        return result;
    }
}
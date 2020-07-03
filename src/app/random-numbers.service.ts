import {Injectable} from '@angular/core';
import {DotLocation} from "./dot-location";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RandomNumbersService {

  private locations: DotLocation[];

  private invalidLocations: boolean[][];

  constructor() {
  }

  getLocations(amount: number, margin: number, width: number, height: number): Observable<DotLocation[]> {
    this.locations = [];
    this.invalidLocations = [];

    let res: DotLocation[] = [];
    for (let i = 0; i < amount; i++) {
      res.push(this.generateLocation((+margin), width, height));
    }
    return of(res);
  }

  private generateLocation(margin: number, width: number, height: number): DotLocation {
    const maxWidth = width - ((+margin) * 2);
    const maxHeight = height - ((+margin) * 2);
    let x: number = (+margin) + Math.floor(Math.random() * maxWidth);
    let y: number = (+margin) + Math.floor(Math.random() * maxHeight);

    const maxIterations = (maxWidth * maxHeight) * 10;
    let count = 1;
    while (!this.isLocationValid(x, y, margin) && count < maxIterations) {
      x = (+margin) + Math.floor(Math.random() * maxWidth);
      y = (+margin) + Math.floor(Math.random() * maxHeight);
      count ++;
    }

    const res = {x, y};
    this.locations.push(res);
    return res;
  }

  private isLocationValid(x: number, y: number, padding: number): boolean {
    // Review index first.
    if (this.invalidLocations[x] && this.invalidLocations[x][y]) {
      return false;
    }

    // Is the distance between this dot and the rest lower than the padding.
    for (let i in this.locations) {
      const loc = this.locations[i];
      const d = Math.sqrt(Math.pow(x - loc.x, 2) + Math.pow(y - loc.y, 2));
      if (d < padding) {
        // Add to index.
        if (!this.invalidLocations[x]) {
          this.invalidLocations[x] = [];
        } else if (!this.invalidLocations[x][y]) {
          this.invalidLocations[x][y] = true;
        }
        return false;
      }
    }

    return true;
  }
}

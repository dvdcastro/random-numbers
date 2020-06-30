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

  getLocations(amount: number, border: number, width: number, height: number): Observable<DotLocation[]> {
    this.locations = [];
    this.invalidLocations = [];

    let res: DotLocation[] = [];
    for (let i = 0; i < amount; i++) {
      res.push(this.generateLocation((+border), width, height));
    }
    return of(res);
  }

  private generateLocation(border: number, width: number, height: number): DotLocation {
    const maxWidth = width - ((+border) * 2);
    const maxHeight = height - ((+border) * 2);
    let x: number = (+border) + Math.floor(Math.random() * maxWidth);
    let y: number = (+border) + Math.floor(Math.random() * maxHeight);

    while (!this.isLocationValid(x, y, border)) {
      x = (+border) + Math.floor(Math.random() * maxWidth);
      y = (+border) + Math.floor(Math.random() * maxHeight);
    }

    const res = {x, y};
    this.locations.push(res);
    return res;
  }

  private isLocationValid(x: number, y: number, border: number): boolean {
    // Review index first.
    if (this.invalidLocations[x] && this.invalidLocations[x][y]) {
      return false;
    }

    // Is the distance between this dot and the rest lower than the border.
    for (let i in this.locations) {
      const loc = this.locations[i];
      const d = Math.sqrt(Math.pow(x - loc.x, 2) + Math.pow(y - loc.y, 2));
      if (d < border) {
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

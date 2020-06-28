import { Injectable } from '@angular/core';
import {DotLocation} from "./dot-location";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RandomNumbersService {

  private locationIndex: boolean[][];

  constructor() { }

  getLocations(amount: number, border: number, width: number, height: number) : Observable<DotLocation[]> {
    this.locationIndex = [];

    let res: DotLocation[] = [];
    const maxWidth = width - (border * 2);
    const maxHeight = height - (border * 2);
    for (let i = 0; i < amount; i++) {


      const dotLocation: DotLocation = {
        x: Math.floor(border + (Math.random() * maxWidth)),
        y: Math.floor(border + (Math.random() * maxHeight)),
      };
      res.push(dotLocation);
    }
    return of(res);
  }

  private generateLocation(border: number, width: number, height: number) : DotLocation {
    const maxWidth = width - (border * 2);
    const maxHeight = height - (border * 2);
    const x = Math.floor(border + (Math.random() * maxWidth));
    const y = Math.floor(border + (Math.random() * maxHeight));

    if (!this.locationIndex[x]) {
      this.locationIndex[x] = [];
    }

    if (!this.locationIndex[x][y]) {
      this.locationIndex[x][y] = true;
      return {
        x,
        y
      };
    } else {
      return this.generateLocation(border, width, height);
    }

  }
}

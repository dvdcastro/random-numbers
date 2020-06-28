import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RandomNumbersService} from "../random-numbers.service";
import {DotLocation} from "../dot-location";
import {Dot} from "../dot";

@Component({
  selector: 'app-random-numbers-view',
  templateUrl: './random-numbers-view.component.html',
  styleUrls: ['./random-numbers-view.component.css']
})
export class RandomNumbersViewComponent implements OnInit {
  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  amount: number;

  private ctx: CanvasRenderingContext2D;
  canvasWidth: number = 800;
  canvasHeight: number = 800;
  circleSize: number = 20;
  border: number = 40;

  constructor(
    private randomNumbersService: RandomNumbersService
  ) { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  generate() {
    this.cleanCanvas();
    this.randomNumbersService.getLocations(this.amount, 40, this.canvasWidth, this.canvasHeight)
      .subscribe((dotLocations : DotLocation[]) => {
      this.cleanCanvas();
      dotLocations.forEach((dotLocation: DotLocation) => {
        this.drawDot(dotLocation);
      });
    });
  }

  cleanCanvas() {
    const canvas = this.ctx.canvas;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  drawDot(dotLocation: DotLocation) {
    this.ctx.fillStyle = 'red';
    const dot = new Dot(this.ctx);
    dot.draw(dotLocation.x, dotLocation.y, 20);
    console.log('Drawing dot in:', dotLocation.x, dotLocation.y)
  }


}

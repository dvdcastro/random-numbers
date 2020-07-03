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

  amount: number = 100;

  private ctx: CanvasRenderingContext2D;
  canvasWidth: number = 950;
  canvasHeight: number = 950;
  circleSize: number = 64.5;
  margin: number = 70;
  images: string[] = [];

  constructor(
    private randomNumbersService: RandomNumbersService
  ) { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  generate() {
    this.randomNumbersService.getLocations(this.amount, this.margin, this.canvasWidth, this.canvasHeight)
      .subscribe((dotLocations : DotLocation[]) => {
      this.cleanCanvas(this.ctx);
      dotLocations.forEach((dotLocation: DotLocation) => {
        this.drawDot(this.ctx, dotLocation);
      });
    });
  }

  async generateDescendingImages() {
    for (let i = this.amount; i >= 1; i--) {
      const canvas = document.createElement('canvas');
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;
      const ctx = canvas.getContext('2d');
      this.randomNumbersService.getLocations(i, this.margin, this.canvasWidth, this.canvasHeight)
        .subscribe((dotLocations : DotLocation[]) => {
          this.cleanCanvas(ctx);
          for (let dl in dotLocations) {
            this.drawDot(ctx, dotLocations[dl]);
          }
          const link = document.createElement('a');
          const id = `${i}`.padStart(4, '0');
          link.download = `rn_${id}.png`;
          link.href = canvas.toDataURL();
          link.click();
        });
      await this.sleep(1000);
    }
  }

  private sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  cleanCanvas(ctx: CanvasRenderingContext2D) {
    const canvas = ctx.canvas;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawDot(ctx: CanvasRenderingContext2D, dotLocation: DotLocation) {
    ctx.fillStyle = 'red';
    const dot = new Dot(ctx);
    dot.draw(dotLocation.x, dotLocation.y, this.circleSize);
  }


}

export class Dot {
  constructor(private ctx: CanvasRenderingContext2D) {}

  draw(x: number, y: number, size: number) {
    this.ctx.beginPath();
    let radius = Math.floor(size / 2);
    let correctCenter = Math.floor(radius / 2)
    this.ctx.arc(x - correctCenter, y - correctCenter, radius, 0, 2 * Math.PI);
    this.ctx.fill();
  }
}

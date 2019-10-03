import * as Phaser from "phaser"

export class GemColor {
  readonly RED = 0;
  readonly BLUE = 1;
  readonly YELLOW = 2;
  readonly GREEN = 3;
  readonly CYAN = 4;
}

export class Gem extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, color: number) {
    super(scene, 0, 0, "gems", color);
    this.setScale(2);
  }
}
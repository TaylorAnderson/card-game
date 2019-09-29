import * as Phaser from "phaser"
export class Card extends Phaser.GameObjects.Sprite {
  /**
   *
   */
  public hovered: boolean = false;
  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, "card");
    //scene.sys.displayList.add(this);
    scene.sys.updateList.add(this);
    this.setInteractive();
    this.setOrigin(0.5, 3);
    this.on("pointerover", () => {
      this.hovered = true;
      console.log("hello?");
      this.setOrigin(0.5, 2);
      this.scale = 2;
    })
    this.on("pointerout", () => {
      this.hovered = false;
      this.setOrigin(0.5, 3);
      this.scale = 1;
    })
  }
}
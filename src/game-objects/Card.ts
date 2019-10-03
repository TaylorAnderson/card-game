import * as Phaser from "phaser"
import { Sprite } from "pixi.js";


export interface CardConfig {
  name: string,
  description: string,
  image: string
}
export class Card extends Phaser.GameObjects.Container {
  /**
   *
   */
  public hovered: boolean = false;
  public innerContainer: Phaser.GameObjects.Container;
  private sprite: Phaser.GameObjects.Sprite;
  private offsetY = 550;

  private titleText: Phaser.GameObjects.Text;
  private descriptionText: Phaser.GameObjects.Text;
  constructor(scene: Phaser.Scene, private config: CardConfig) {
    super(scene, 0, 0);

    this.innerContainer = new Phaser.GameObjects.Container(scene, 0, -this.offsetY);
    this.innerContainer.add(this.sprite = new Phaser.GameObjects.Sprite(scene, 0, 0, "card"))
    this.add(this.innerContainer);

    this.sprite.setInteractive();
    this.sprite.setScale(2);

    this.titleText = new Phaser.GameObjects.Text(scene, 0, 0, this.config.name, { color: "#ffffff", fontFamily: "Casual Encounter" })
    this.descriptionText = new Phaser.GameObjects.Text(scene, 0, 0, this.config.description, { color: "#aaaaaa", fontFamily: "Casual Encounter", wordWrap: { width: this.sprite.getBounds().width - 10 } })

    this.innerContainer.add(this.titleText);
    this.innerContainer.add(this.descriptionText);


    this.titleText.y = this.sprite.y - this.sprite.getBounds().height / 2 + 8;

    this.titleText.setFontSize(12);
    if (this.titleText.getBounds().width > this.sprite.getBounds().width - 8) {
      this.titleText.setFontSize(8);
      this.titleText.y += 3;
    }

    this.titleText.x = -this.titleText.getBounds().width / 2;

    this.descriptionText.x = -this.sprite.getBounds().width / 2 + 10;
    this.descriptionText.y = 35;

    this.descriptionText.setFontSize(8);






    this.sprite.on("pointerover", () => {
      this.hovered = true;
      this.scale = 1.5;
      this.innerContainer.y = -this.offsetY + 140; // moving it down because when we scale up the parent, because the positioning of the innerContainer it moves waayyyy up.

    })
    this.sprite.on("pointerout", () => {
      this.hovered = false;
      this.innerContainer.y = -this.offsetY;
      this.scale = 1;
    })
    this.scene.sys.updateList.add(this);
  }
  preUpdate = () => {
    if (this.hovered) {
      this.innerContainer.rotation = -this.getWorldTransformMatrix().rotation;
    }
    else {
      this.innerContainer.rotation = 0;
    }
  }
}
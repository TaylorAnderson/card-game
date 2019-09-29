import { MathUtil } from './../util/MathUtil';
import { Card } from './../game-objects/Card';
import * as Phaser from "phaser"
export class GameScene extends Phaser.Scene {
  /**
   *
   */
  private cards: Array<Card> = [];
  private cardContainer: Phaser.GameObjects.Container;
  private numCards: number = 5;

  private gemData: Array<Array<number>> = [];
  constructor() {
    super({})

  }
  preload = () => {
    this.load.image("card", "assets/img/cards.png");
  }

  create = () => {


    this.cardContainer = this.add.container(0, 0);



    for (let i = 0; i < this.numCards; i++) {
      let card = new Card(this);
      this.cards.push(card);
      this.cardContainer.add(card);
      card.y = card.height * card.originY / 2;
    }

    this.cardContainer.y = this.game.renderer.height - 10;
  }

  update() {
    let angleIncrement = 15;
    let totalRotation = (this.numCards - 1) * angleIncrement;
    for (let i = 0; i < this.cards.length; i++) {
      const card = this.cards[i];
      let angle = -(totalRotation / 2) + i * angleIncrement;
      card.angle = MathUtil.Lerp(card.angle, angle, 0.1);
    }
    this.cardContainer.x = this.game.renderer.width / 2;
  }



}
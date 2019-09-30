import { MathUtil } from './../util/MathUtil';
import { Card } from './../game-objects/Card';
import * as Phaser from "phaser"
import {Gem} from "./../game-objects/Gem"
export class GameScene extends Phaser.Scene {
  /**
   *
   */
  private cards: Array<Card> = [];
  private cardContainer: Phaser.GameObjects.Container;
  private numCards: number = 5;
  private tableWidth:number = 7;
  private tableHeight:number = 6;

  private gemTable: Array<Array<Gem>> = [];
  constructor() {
    super({})

  }
  preload = () => {
    this.load.image("card", "assets/img/cards.png");
    this.load.spritesheet("gems", "assets/img/gems.png", {frameWidth: 32, frameHeight: 32})
  }

  create = () => {


    this.cardContainer = this.add.container(0, 0);



    for (let i = 0; i < this.numCards; i++) {
      let card = new Card(this);
      this.cards.push(card);
      this.cardContainer.add(card);
      card.y = card.height * card.originY / 2;
    }

    let gemPadding = 3;
    let table = this.add.container(0,0);
    for (let y = 0; y < this.tableHeight; y++) {
      let gemRow = [];
      for (let x = 0; x < this.tableWidth; x++) {
        console.log();
        let gem = new Gem(this, Math.round(MathUtil.RandomRange(0, 3)));
        table.add(gem);
        gem.x = x * (gem.width + gemPadding);
        gem.y = y * (gem.height + gemPadding);
        gemRow.push(gem);
      }
      this.gemTable.push(gemRow);
    }

    table.x = this.game.renderer.width/2 - table.getBounds().width/2;
    table.y = 20;

    this.cardContainer.y = this.game.renderer.height - 10;
  }

  update() {
    let angleIncrement = 15;
    let totalRotation = (this.numCards - 1) * angleIncrement;
    let hoveredPos = -1;
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].hovered) hoveredPos = i;
    }
    for (let j = 0; j < this.cards.length; j++) {
      const card = this.cards[j];
      let angle = -(totalRotation / 2) + j * angleIncrement;
      if (hoveredPos >= 0 && hoveredPos != j) {
        let dist = hoveredPos - j
        let offset = MathUtil.Map(Math.abs(dist), 0, this.numCards-1, 15, 0)
        angle += offset * (dist > 0 ? -1 : 1)
      }
      
      card.angle = MathUtil.Lerp(card.angle, angle, 0.1);
    }
    this.cardContainer.x = this.game.renderer.width / 2;
  }



}
import { MathUtil } from './../util/MathUtil';
import { Card } from './../game-objects/Card';
import * as Phaser from "phaser"
import { Gem } from "./../game-objects/Gem"
import {Board} from "./../game-objects/Board"
export class GameScene extends Phaser.Scene {
  /**
   *
   */
  private cards: Array<Card> = [];
  private cardContainer: Phaser.GameObjects.Container;
  private numCards: number = 5;
  private board:Board;
  constructor() {
    super({})

  }
  preload = () => {
    this.load.image("card", "assets/img/cards.png");
    this.load.spritesheet("gems", "assets/img/gems.png", { frameWidth: 32, frameHeight: 32 })
    this.load.spritesheet("bg", "assets/img/bg-square.png", { frameWidth: 40, frameHeight: 40 });
  }

  create = () => {

    this.board = new Board(this);
    this.cardContainer = this.add.container(0, 0);


    for (let i = 0; i < this.numCards; i++) {
      let card = new Card(this, { name: "Longer Test", description: "Testing a card description, making it longer", image: "" });
      this.cards.push(card);
      this.cardContainer.add(card);
      card.y = card.height * card.originY / 2;
    }
    this.cardContainer.y = this.game.renderer.height + 450;




    this.board.x = this.game.renderer.width / 2 - this.board.getBounds().width / 2;
    this.board.y = 20;
    this.add.existing(this.board);

  }

  update() {
    let angleIncrement = 10;
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
        let offset = MathUtil.Map(Math.abs(dist), 0, this.numCards - 1, 10, 0)
        angle += offset * (dist > 0 ? -1 : 1)
      }
      card.angle = MathUtil.Lerp(card.angle, angle, 0.1);
    }
    this.cardContainer.x = this.game.renderer.width / 2;
  }

  clearMatches = () => {

  }



}
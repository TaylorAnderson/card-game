import * as Phaser from "phaser";
import { Gem } from "./Gem";
import { MathUtil } from "util/MathUtil";
export class Board extends Phaser.GameObjects.Container {
  private tableWidth: number = 7;
  private tableHeight: number = 5;
  private isShifting:boolean = false;
  private gemTable: Array<Array<Gem>> = [];
  constructor(scene:Phaser.Scene) {
    super(scene);
    let cellSize = 80;
    let alternator = true;


    for (let y = 0; y < this.tableHeight; y++) {
      let row = [];
      for (let x = 0; x < this.tableWidth; x++) {
        let gem = new Gem(this.scene, 0);
        row.push(gem);
        
        gem.x = x * cellSize + cellSize/2;
        gem.y = y * cellSize + cellSize/2;
        alternator = !alternator;
        let bg = new Phaser.GameObjects.Sprite(this.scene, x * cellSize + cellSize / 2, y * cellSize + cellSize / 2, "bg", alternator ? 0 : 1);
        bg.setScale(2);
        this.add(bg);
        this.add(gem);
      }
      this.gemTable.push(row);
    }

    for (let y = 0; y < this.tableHeight; y++) {
      for (let x = 0; x < this.tableWidth; x++) {
        
      }
    }

      
    let outline = new Phaser.GameObjects.Graphics(this.scene, { lineStyle: { color: 0x7be2f9, width: 10 } });
    this.add(outline);
    outline.strokeRoundedRect(- 5, - 5, this.getBounds().width + 10, this.getBounds().height + 10, 10);
    
  }

  findBiggestMatch = (x:number, y:number) => {
    let gem = this.gemTable[y][x];
    //go up 
    let highestMatchAbove = y;
    while (highestMatchAbove >= 0 && this.gemTable[highestMatchAbove][x].color == gem.color) {
      highestMatchAbove--;
    }
    let verticalMatchHeight = 0;
    while(this.gemTable[highestMatchAbove+verticalMatchHeight][x].color == gem.color) {
      verticalMatchHeight++;
    }
  }
}
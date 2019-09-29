
import { GameScene } from './scenes/GameScene';

let game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 640,
  height: 320,
  zoom: 2,
  physics: {
    default: "arcade",

    arcade: {
      debug: true
    }
  },
  scene: [
    GameScene,
  ],
  render: {
    pixelArt: true,
  }
});

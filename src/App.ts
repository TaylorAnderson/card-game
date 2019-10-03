
import { GameScene } from './scenes/GameScene';

let game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  backgroundColor: 0,
  zoom: 1,
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
    pixelArt: true
  }
});

import { Boot } from './scenes/Boot';
import { Game } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { Credits } from './scenes/Credits';
import { Controls } from './scenes/Controls';
import { YouWin } from './scenes/YouWin';
//import { Map } from './classes/Map';
//import { Player } from './classes/Player';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    scale: {
      mode: Phaser.Scale.RESIZE
    },
    parent: 'game-container',
    backgroundColor: '#028af8',
    
    physics: {
        default: "arcade",
        arcade: {
          gravity: { y: 0 }, // Game objects will be pulled down along the y-axis
          // The number 1500 is arbitrary. The higher, the stronger the pull.
          // A negative value will pull game objects up along the y-axis
          debug: false, // Whether physics engine should run in debug mode
        },
      },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        GameOver,
        Controls,
        Credits,
        YouWin
        
    ]
};

export default new Phaser.Game(config);

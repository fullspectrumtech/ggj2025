import { Scene } from 'phaser';

export class Preloader extends Scene
{
    constructor ()
    {
        super('Preloader');
    }

    init ()
    {
        //  We loaded this image in our Boot Scene, so we can display it here
        //this.add.image(512, 384, 'background');
        //this.add.image(512, 384, 'background');

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on('progress', (progress) => {

            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + (460 * progress);

        });
    }

    preload ()
    {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath('assets');

        this.load.image('logo', 'logo.png');
        /*this.load.spritesheet('swimmer','player-idle.png', {
            frameWidth: 80,
            frameHeight: 80,
          });
        this.load.spritesheet('swimmer2','player-idle2.png', {
            frameWidth: 80,
            frameHeight: 80,
          });*/
        this.load.spritesheet('swimmer','image0.png', {
            frameWidth: 100,
            frameHeight: 100,
          });
        this.load.spritesheet('swimmer2','image1.png', {
            frameWidth: 100,
            frameHeight: 100,
          });
        /*this.load.spritesheet('trash','littered_dungeon.png', {
            frameWidth: 32,
            frameHeight: 32,
        });*/
        this.load.image('can','can.png');

        this.load.image('pixel','pixel.png');
        this.load.image('bubble','bubble.png');
        this.load.image('machine','machine2.png');
        this.load.image('redfish','Fish2.png');

        this.load.image('coral','Gemini_Generated_Image_e2dknae2dknae2dk.jpg');

        this.load.image('bottle','bottle.png');
        this.load.image('jars','jars.png');
        this.load.image('lamp','lamp.png');
        this.load.image('piano','piano.png');
        this.load.image('metal2','metal2.png');
        this.load.image('plastic2','plastic2.png');
        this.load.image('treasures','treasures.png');
        this.load.image('tv','tv.png');

        this.load.image('metal','metal.png');
        this.load.image('glass','glass.png');
        this.load.image('plastic','plastic.png');

        this.load.image('gauge','gauge.png');

        this.load.image('tank1','tank1.png');
        this.load.image('tank2','tank2.png');
        this.load.image('fins1','fins1.png');
        this.load.image('fins2','fins2.png');
        this.load.image('light1','light1.png');
        this.load.image('light2','light2.png');

        this.load.image('YellowFish','YellowFish.png');

        //this.load.image('tileset12345','maps/tileset12345.png');
        this.load.image('pixil-frame-0(2)','maps/pixil-frame-0(2).png');
        
        //this.load.tilemapTiledJSON('lake','maps/lake.json');
        //this.load.tilemapTiledJSON('lake','maps/boooooooooooooooooring.json');
        this.load.tilemapTiledJSON('lake','maps/MAP.json');

        this.load.audio('mainmenu','audio/diver.ogg');
        this.load.audio('bubbles','audio/bubbles-single2.ogg');
        this.load.audio('pop','audio/pop.ogg');
        this.load.audio('recycle','audio/Machine002.ogg');
        this.load.audio('paper','audio/paper.ogg');
        this.load.audio('alarm','audio/alarm.ogg');



    }

    universal_animation (key, frame, starting, ending, frameRate) {
        this.anims.create({
            key,//: 'right',
            frames: this.anims.generateFrameNumbers(frame, { start: starting, end: ending }),
            frameRate, //: this.frames1/2,
            repeat: -1,
            yoyo: false
        });
      }

    create ()
    {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        this.universal_animation('left','swimmer2',0,7,10);
        this.universal_animation('up','swimmer2',0,7,10);
        this.universal_animation('right','swimmer',0,7,10);
        this.universal_animation('down','swimmer',0,7,10);



        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start('MainMenu');
    }
}

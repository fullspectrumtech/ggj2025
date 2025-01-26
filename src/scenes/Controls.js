import { Scene } from 'phaser';

export class Controls extends Scene
{
    constructor ()
    {
        super('Controls');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0xff0000);

        this.add.text(512, 384, 'Controls\n (press Space to go back)', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.spaceBar.on('down', this.go, this);
        
    }

    go() {
        this.scene.start('MainMenu');
    }
}

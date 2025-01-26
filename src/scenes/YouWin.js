import { Scene } from 'phaser';

export class YouWin extends Scene
{
    constructor ()
    {
        super('YouWin');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x00ff00);

        this.add.text(512, 384, 'You Win!!\n (press Space to go again)', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.spaceBar.on('down', this.go, this);
        
    }

    go() {
        location.reload(); 
    }
}

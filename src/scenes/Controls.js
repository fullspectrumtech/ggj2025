import { Scene } from 'phaser';

export class Controls extends Scene
{
    constructor ()
    {
        super('Controls');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x999999);

        this.add.text(100, 100, 'Controls (&Backstory)\n (press Space to go back)', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0);

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.spaceBar.on('down', this.go, this);

        this.add.text(100, 300, 'The good hearted diver begins to dedicate his time to cleaning up the local lake.', {
            fontFamily: 'Arial Black', fontSize: 20, color: '#ffffff',
        }).setOrigin(0);

        this.add.text(100, 350, 'Using his powerful bubble captivator, he ensnares the nefarious garbage and feeds it to his powerful recycling machine.', {
            fontFamily: 'Arial Black', fontSize: 20, color: '#ffffff',
        }).setOrigin(0);

        this.add.text(100, 400, 'As he cleans the lake, the recycled trash allows him to upgrade his safety equipment, allowing him to go deeper and deeper.', {
            fontFamily: 'Arial Black', fontSize: 20, color: '#ffffff',
        }).setOrigin(0);

        this.add.text(100, 450, 'With trash being taken out of the water, the water becomes clearer and he notices a glimmer of gold\n shining from the bottom of the lake...', {
            fontFamily: 'Arial Black', fontSize: 20, color: '#ffffff',
        }).setOrigin(0);

        this.add.text(100, 600, 'Navigate by using the arrow keys (up/down/left/right). The SPACE key does everything else (shoots bubbles, selects options)', {
            fontFamily: 'Arial Black', fontSize: 20, color: '#5522aa',
        }).setOrigin(0);

        //"The good hearted diver begins to dedicate his time to cleaning up the local lake."
        //"Using his powerful bubble captivator, he ensnares the nefarious garbage and feeds it to his powerful recycling machine"
        //"As he cleans the lake, the recycled trash allows him to upgrade his safety equipment, allowing him to go deeper and deeper"
        //"As the trash is taken out of the water, the water becomes clearer and he notices a glimmer of gold shining from the bottom of the lake..."

        
    }

    go() {
        this.scene.start('MainMenu');
    }
}

import { Scene } from 'phaser';

export class Credits extends Scene
{
    constructor ()
    {
        super('Credits');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0xffff00);

        this.add.text(100,100, 'Credits\n (press Space to go back)', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0);

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.spaceBar.on('down', this.go, this);

        this.add.text(100, 300, 'Special Thanks to our 2025 Global Game Jam Team:', {
            fontFamily: 'Arial Black', fontSize: 20, color: '#000000',
        }).setOrigin(0);

        this.add.text(100, 350, 'Kaszr: Design, Assets, Music', {
            fontFamily: 'Arial Black', fontSize: 20, color: '#000000',
        }).setOrigin(0);

        this.add.text(100, 400, 'CatCoder: Design, Assets, Music', {
            fontFamily: 'Arial Black', fontSize: 20, color: '#000000',
        }).setOrigin(0);

        this.add.text(100, 450, 'SpaceKitteth: Design, LevelDesign, Music', {
            fontFamily: 'Arial Black', fontSize: 20, color: '#000000',
        }).setOrigin(0);

        this.add.text(100, 500, 'KityPrincess999: Design, Music, Sounds', {
            fontFamily: 'Arial Black', fontSize: 20, color: '#000000',
        }).setOrigin(0);

        this.add.text(100, 550, 'ProteusDad: Design, LevelDesign, Assets, Coding, Oversight', {
            fontFamily: 'Arial Black', fontSize: 20, color: '#000000',
        }).setOrigin(0);

        this.add.text(100, 600, 'Dunamiss: Design, Narrative', {
            fontFamily: 'Arial Black', fontSize: 20, color: '#000000',
        }).setOrigin(0);

        this.add.text(100, 650, 'Shinyeyes: QA, testing', {
            fontFamily: 'Arial Black', fontSize: 20, color: '#000000',
        }).setOrigin(0);

        this.add.text(650, 350, 'OpenGameArt.org Assets: \nhttps://opengameart.org/content/golden-treasures\nhttps://opengameart.org/content/transparent-bubble-soap-bubble\nhttps://opengameart.org/content/bubble-sound-effects\nhttps://opengameart.org/content/collaboration-sound-effects-machine-001\nhttps://opengameart.org/content/bubbles-pop\nhttps://opengameart.org/content/various-paper-sound-effects\nhttps://opengameart.org/content/alarm-1\nhttps://opengameart.org/content/2d-retro-fish',

 {
            fontFamily: 'Arial Black', fontSize: 20, color: '#000000',
        }).setOrigin(0);

        /*Kaszr
        CatCoder
        SpaceKitteth
        KityPrincess999
        ProteusDad
        Dunamiss
        Shinyeyes*/

        
    }

    go() {
        this.scene.start('MainMenu');
    }
}

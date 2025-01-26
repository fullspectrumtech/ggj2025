import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        //this.add.image(512, 384, 'background');

        //this.add.image(512, 300, 'logo');

        this.selected = 0;

        this.add.text(612, 160, 'Bubble Diver', {
            fontFamily: 'Arial Black', fontSize: 148, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.text1 = this.add.text(600, 350, 'Play!', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0);

        this.text2 = this.add.text(600, 450, 'Controls', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0);

        this.text3 = this.add.text(600, 550, 'Credits', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0);

        this.add.text(600, 600, '(Move with Down key, press Space to select)', {
            fontFamily: 'Arial Black', fontSize: 18, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0);

        this.tween1 = this.tweens.add({
            targets: this.text1,
            paused: false,
            scale: this.text1.scale*1.2,
            ease: 'Linear',
            duration: 500,
            repeat:-1,
            loop: true,
            yoyo: true,  
        });

        

        

       //this.tween1.play();

        /*this.input.once('pointerdown', () => {

            this.scene.start('Game');

        });*/

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.spaceBar.on('down', this.go, this);

        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.spaceBar.on('down', this.down, this);

        this.add.text(100, 550, 'Made with:', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0);

        this.add.image(200,650,'logo').setScale(0.5);
    }

    down() {
        this.selected++;
        if(this.selected ==3) {
            this.selected = 0;
        }

        if(this.selected == 1) {
            this.tween1.stop();
            this.tween2 = this.tweens.add({
                targets: this.text2,
                paused: false,
                scale: this.text2.scale*1.2,
                ease: 'Linear',
                duration: 500,
                repeat: -1,
                loop: true,
                yoyo: true,  
            });
        }
        else if(this.selected == 2) {
            this.tween2.stop();
            this.tween3 = this.tweens.add({
                targets: this.text3,
                paused: false,
                scale: this.text3.scale*1.2,
                ease: 'Linear',
                duration: 500,
                repeat: -1,
                loop: true,
                yoyo: true,  
            });
        } else if(this.selected == 0){
            this.tween3.stop();
            this.tween1 = this.tweens.add({
                targets: this.text1,
                paused: false,
                scale: this.text1.scale*1.2,
                ease: 'Linear',
                duration: 500,
                repeat:-1,
                loop: true,
                yoyo: true,  
            });
        }
    }

    go() {
        if(this.selected ==0) 
            this.scene.start('Game');
        else if(this.selected == 1)
            this.scene.start('Controls');
        else
            this.scene.start('Credits');
    }

    update() {
        
    }
}

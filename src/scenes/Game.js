import { Scene } from 'phaser';

import Player from "../classes/Player";
import Map from "../classes/Map";

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x80e5ff);



        this.ocean = this.add.image(0,100,'pixel').setOrigin(0).setScale(3200,3200).setTint(0x70d5ff);

        this.map = new Map(this, 'lake', 'pixil-frame-0(2)', 'ground', 'collision','detail',32);  

        this.machine = this.add.image(800,55,'machine');

        //this.land = this.physics.add.sprite(0,100,'pixel').setOrigin(0).setScale(1000,20).setTint(0x964B00);
        //this.land.setRotation(1);//=45;
        //this.land.body.setImmovable(true);
        //this.add.image(512, 384, 'background').setAlpha(0.5);

        this.player = new Player(this,950,60,'swimmer',0); //this.physics.add.sprite(200,200,'swimmer',0);
        this.player.body.setSize(30,40);
        this.player.anims.play('left');
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0,0,this.map.width, this.map.height);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.spaceBar.on('down', this.bubble, this);
    
        this.bubbles = this.add.group({
            classType: Phaser.GameObjects.Sprite,
            active: true,            
        });

        this.setCollisions();

        this.makeTrash();

        this.ui = this.add.container(700,0);
        this.ui1 = this.add.text(0,0,"Metal:",{fontSize: '20px', color: '#777', fontFace:"Comic Sans", fontStyle:"bold" });
        this.ui2 = this.add.text(100,0,"10",{fontSize: '20px', color: '#777', fontFace:"Comic Sans", fontStyle:"bold" });

        this.ui3 = this.add.text(200,0,"Plastic:",{fontSize: '20px', color: '#777', fontFace:"Comic Sans", fontStyle:"bold" });
        this.ui4 = this.add.text(300,0,"10",{fontSize: '20px', color: '#777', fontFace:"Comic Sans", fontStyle:"bold" });

        this.ui5 = this.add.text(400,0,"Glass:",{fontSize: '20px', color: '#777', fontFace:"Comic Sans", fontStyle:"bold" });
        this.ui6 = this.add.text(500,0,"10",{fontSize: '20px', color: '#777', fontFace:"Comic Sans", fontStyle:"bold" });

        this.ui.add(this.ui1);
        this.ui.add(this.ui2);
        this.ui.add(this.ui3);
        this.ui.add(this.ui4);
        this.ui.add(this.ui5);
        this.ui.add(this.ui6);

        this.ui.setScrollFactor(0, 0);

    }

    makeTrash() {
        this.trash1 = this.physics.add.sprite(1200,300,'trash',10).setScale(2);
    }

    setCollisions() {
        this.physics.add.collider(this.player, this.map.collisionLayer, this.freeze, null, this);
    }

    bubble() {

        //console.log(this.bubbles.getLength());
        
        this.player.body.setVelocity(0);

        if(this.player.frame.texture.key == 'swimmer') {
            this.bubble = this.physics.add.sprite(this.player.x+50,this.player.y+40,'bubble').setScale(.2);
            this.universal_tween(this.bubble,this.bubble.x+200,this.bubble.y,500,null,null,null);            
        } else {
            //console.log('swimmer2');
            this.bubble = this.physics.add.sprite(this.player.x+20,this.player.y+40,'bubble').setScale(.2);
            this.universal_tween(this.bubble,this.bubble.x-200,this.bubble.y,500,null,null,null);
        }
        this.bubble.setVelocity(0,-50);
        this.bubbles.add(this.bubble);
        //this.bubble.setTint(0xffffff);
    }

    freeze() {
        this.player.body.setVelocity(0);
    }

    universal_tween(targets, x, y, duration, repeat, yoyo, onComplete) {
        this.tween_move = this.tweens.add({
            targets,
            paused: false,
            x,
            y,
            ease: 'Linear',
            duration,
            repeat,
            yoyo,            
            onComplete: onComplete?.bind(this) // bind to this for convenience
        });
    }

    update() {

        this.player.update(this.cursors);
        let scene = this;

        this.bubbles.getChildren().forEach(function (bubble) {
            if(bubble.y<-50) {
                scene.bubbles.remove(bubble);
            }       
        });

        /*
        const speed = 225;
        //const prevVelocity = this.player.body.velocity.clone();
        // Stop any previous movement from the last frame
        this.player.body.setVelocity(0);
        // Horizontal movement
        if (this.cursors.left.isDown) {
          this.player.body.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
          this.player.body.setVelocityX(speed);
        }
        // Vertical movement
        if (this.cursors.up.isDown) {
          this.player.body.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
          this.player.body.setVelocityY(speed);
        }
        // Normalize and scale the velocity so that astronaut can't move faster along a diagonal
        this.player.body.velocity.normalize().scale(speed);
    */
   }
}

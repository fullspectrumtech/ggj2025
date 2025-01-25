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
        this.selected = {};
        this.cleaning = false;

        this.bbc = this.add.container(this.player.x, this.player.y+40);
            
        this.bb = this.physics.add.sprite(0,0,'bubble').setVisible(false);
        this.bb.body.setImmovable(true);
        
        this.bbc.add(this.bb);

        this.makeTrash();

    }

    makeTrash() {
        this.trash = this.add.group({
            classType: Phaser.GameObjects.Sprite,
            active: true,            
        });

        this.trash1 = this.physics.add.sprite(1200,300,'trash',10).setScale(2);
        this.trash1.moving = false;
        this.trash1.setDepth(3);
        this.trash1.body.setImmovable(true);
        

        //this.physics.add.collider(this.machine, this.trash1, this.cashin(1), null, this);

        this.trash.add(this.trash1);
        //console.log('trash building??');
    }

    setCollisions() {
        this.physics.add.collider(this.player, this.map.collisionLayer, this.freeze, null, this);
    }

    cashin(total) {
        console.log('cashin');
        console.log(total);
        this.trash1.setVelocity(0);
        this.trash1.setVisible(false);
        this.bb.setVisible(false);
    }

    bubble() {

        //console.log(this.bubbles.getLength());

        this.player.body.setVelocity(0);

        console.log(this.selected);
        if(this.selected.x > 0 && this.cleaning == false) {
            console.log('building big bubble');
            
            this.cleaning = true;
            this.bbc.x = this.player.x;
            this.bbc.y = this.player.y+40;
            this.bb.setVisible(true);
            this.universal_tween(this.bbc,this.selected.x,this.selected.y, 1000,0,false,this.float);
            
        }
        else {
            //console.log('empty');
        
            //console.log(this.selected);
        
            

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

        }
        
            
        
        //this.bubble.setTint(0xffffff);
    }

    float() {
        //console.log('float');
        //console.log(this.selected);
        this.bbc.add(this.selected);
        this.selected.x=0;
        this.selected.y=0;
        this.universal_tween(this.bbc,this.bbc.x,80,this.bbc.y*10,0,false,this.done);
        this.cleaning = false;
    }

    done() {
        console.log('done');
       // this.universal_tween(this.bbc,this.bbc.x,this.bbc.y+20,250,0,false,null);
        this.physics.add.collider(this.player, this.bb, this.doit(1), null, this);

    }

    doit(which) {
        console.log('doit');
        //this.bbc.setVelocityX(-50);
        this.universal_tween(this.bbc,900,this.bbc.y,4000,false,false,this.cashin(which));
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

    breathe(targets) {

        if(targets.moving == false) {

            targets.moving = true;
            this.selected = targets;

            this.tween_move = this.tweens.add({
                targets,
                paused: false,
                scale: 2.5,
                ease: 'Linear',
                duration: 250,
                repeat: 0,
                loop: true,
                yoyo: true,    
                
                /*
                scaleY: 1.85, //2.1,
                ease: 'Linear',
                duration: 50,
                repeat:15,
                loop: true,*/
                // bind to this for convenience
            });

            this.time.addEvent({
                delay: 500,
                callback: ()=>{                        
                    targets.moving = false;
                    this.selected = {};
                },
                loop: false
    
            });
        }
        
    }

    update() {

        this.player.update(this.cursors);
        let scene = this;

        this.bubbles.getChildren().forEach(function (bubble) {
            if(bubble.y<-50) {
                scene.bubbles.remove(bubble);
            }
            
            //
        });

        this.trash.getChildren().forEach(function (trash) {
            if(Phaser.Math.Distance.Between(trash.x, trash.y,scene.player.x,scene.player.y)<95) {
                //console.log('close');
                if(trash.y> 150) 
                    scene.breathe(trash);
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

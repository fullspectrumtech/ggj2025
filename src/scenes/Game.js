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



        this.ocean = this.add.image(0,100,'pixel').setOrigin(0).setScale(10656,10656).setTint(0x70d5ff);

        this.map = new Map(this, 'lake', 'pixil-frame-0(2)', 'ground', 'collision','detail',32);  

        this.machine = this.physics.add.image(890,55,'machine');
        this.machine.body.setImmovable(true);

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

        

        this.makeUI();

        
        this.selected = {};
        this.cleaning = false;

        this.bbc = this.add.container(this.player.x, this.player.y+40);
        this.bbc.moving = false;
            
        this.bb = this.physics.add.sprite(0,0,'bubble').setVisible(false);
        this.bb.setScale(0.5);
        this.bb.body.setImmovable(true);
        this.bbseek = false;

        this.lid = this.physics.add.image(1000,70,'pixel').setScale(9000,1).setVisible(false);
        this.lid.body.setImmovable(true);

        this.setCollisions();
        
        //this.bbc.add(this.bb);

        this.store = false;

        this.makeTrash();

        this.makeAir();
        //this.air = 100;

        this.trashWiggle=false;

        this.makeStore();

        this.storeMove = true;

        this.darkness = this.add.image(0,1000,'pixel').setTint(0x000000).setScale(11000,2000).setOrigin(0);
        this.darkness.alpha = 0.2;

        this.darkness2 = this.add.image(0,3000,'pixel').setTint(0x000000).setScale(11000,2000).setOrigin(0);
        this.darkness2.alpha = 0.4;
    }

    makeUI() {

        this.metal = 2;
        this.glass = 10;
        this.plastic = 10;

        this.ui = this.add.container(700,0);
        this.ui1 = this.add.text(0,0,"Metal:",{fontSize: '20px', color: '#777', fontFace:"Comic Sans", fontStyle:"bold" });
        this.ui2 = this.add.text(100,0,this.metal,{fontSize: '20px', color: '#777', fontFace:"Comic Sans", fontStyle:"bold" });

        this.ui3 = this.add.text(200,0,"Plastic:",{fontSize: '20px', color: '#777', fontFace:"Comic Sans", fontStyle:"bold" });
        this.ui4 = this.add.text(300,0,this.plastic,{fontSize: '20px', color: '#777', fontFace:"Comic Sans", fontStyle:"bold" });

        this.ui5 = this.add.text(400,0,"Glass:",{fontSize: '20px', color: '#777', fontFace:"Comic Sans", fontStyle:"bold" });
        this.ui6 = this.add.text(500,0,this.glass,{fontSize: '20px', color: '#777', fontFace:"Comic Sans", fontStyle:"bold" });

        this.ui.add(this.ui1);
        this.ui.add(this.ui2);
        this.ui.add(this.ui3);
        this.ui.add(this.ui4);
        this.ui.add(this.ui5);
        this.ui.add(this.ui6);

        this.ui.setScrollFactor(0, 0);
    }

    makeStore() {
        this.storeC = this.add.container(1000,100).setDepth(4);

        this.storeback = this.add.image(0,0,'pixel').setScale(600,400).setOrigin(0);
        this.storeC.add(this.storeback);
        this.storeC.setVisible(false);

        this.storeIndex = 0;
        this.storeOptions = [
            {name: "Increased air tank capacity", metal: 4, glass:0, plastic:1, image:'tank', purchased: 0},
            {name: "Fins (+speed)", metal: 0, glass:0, plastic:3, image:'fins', purchased: 0},
        ];

        this.storeSelector = this.add.image(45,45,'pixel').setScale(560,60).setTint(0xff0000).setOrigin(0).setDepth(1);
        this.storeC.add(this.storeSelector);

        for (let i=0; i<this.storeOptions.length;i++){
            this.back = this.add.image(50,50+i*100,'pixel').setScale(550,50).setTint(0x0000ff).setOrigin(0).setDepth(2);
            this.words = this.add.text(50,50+i*100,this.storeOptions[i].name,{fontSize: '20px', color: '#777', fontFace:"Comic Sans", fontStyle:"bold" }).setOrigin(0).setDepth(2);

            this.storeC.add(this.back);
            this.storeC.add(this.words);
        }

        this.back = this.add.image(50,50+this.storeOptions.length*100,'pixel').setScale(550,50).setTint(0x0000ff).setOrigin(0).setDepth(2);
        this.words = this.add.text(50,50+this.storeOptions.length*100,'EXIT',{fontSize: '20px', color: '#777', fontFace:"Comic Sans", fontStyle:"bold" }).setOrigin(0).setDepth(2);

        this.storeC.add(this.back);
        this.storeC.add(this.words);

        
    }

    showStore() {
        this.storeIndex = 0;

        this.storeC.setVisible(true);
        this.store = true;
    }

    hideStore() {
        this.storeC.setVisible(false);
        this.store = false;
    }

    makeAir() {
        this.air = 100;
        this.airMax = 100;

        this.showAir = this.add.image(1400,300,'pixel');
        this.showAir.setScale(100,400);
        this.showAir.setScrollFactor(0, 0);

        //this.airWord = this.add.text(1360,275,"AIR",{fontSize: '40px', color: '#777', fontFace:"Comic Sans", fontStyle:"bold" });
        //this.airWord.setScrollFactor(0, 0);

        this.guage = this.add.image(1385,350,'gauge').setScale(0.55);
        this.guage.setScrollFactor(0,0);

        this.useAir();

    }

    useAir() {

        if(this.player.y > 100) {
            this.air--;
        }

        this.time.addEvent({
            delay: 250,
            callback: ()=>{                        
                this.useAir();
            },
            loop: false

        });
    }

    makeTrash() {
        this.trash = this.add.group({
            classType: Phaser.GameObjects.Sprite,
            active: true,            
        });

        this.trash1 = this.physics.add.sprite(1200,300,'can').setScale(2);
        this.trash1.moving = false;

        this.trash1.setDepth(3);
        this.trash1.metal=2;
        this.trash1.glass=0;
        this.trash1.plastic=0;
        this.trash1.body.setImmovable(true);
        this.trash.add(this.trash1);

        this.trash1 = this.physics.add.sprite(1500,400,'bottle').setScale(.5);
        this.trash1.moving = false;

        this.trash1.setDepth(3);
        this.trash1.metal=0;
        this.trash1.glass=0;
        this.trash1.plastic=1;
        this.trash1.body.setImmovable(true);
        this.trash.add(this.trash1);


        this.trash1 = this.physics.add.sprite(1800,700,'lamp').setScale(.25);
        this.trash1.moving = false;

        this.trash1.setDepth(3);
        this.trash1.metal=2;
        this.trash1.glass=1;
        this.trash1.plastic=0;
        this.trash1.body.setImmovable(true);
        this.trash.add(this.trash1);


        this.trash1 = this.physics.add.sprite(2100,900,'jars').setScale(.25);
        this.trash1.moving = false;

        this.trash1.setDepth(3);
        this.trash1.metal=0;
        this.trash1.glass=2;
        this.trash1.plastic=0;
        this.trash1.body.setImmovable(true);
        this.trash.add(this.trash1);
        

        
        //console.log('trash building??');
    }

    setCollisions() {
        this.physics.add.collider(this.player, this.map.collisionLayer, this.freeze, null, this);
        this.physics.add.collider(this.player, this.lid, this.freeze, null, this);
        this.physics.add.collider(this.player, this.machine, this.showStore, null, this);
    }

    cashin() {
        console.log('cashin');
        //console.log(total);
        //this.trash1.setVelocity(0);
        //this.trash1.setVisible(false);
        this.bb.setVisible(false);

        this.metal += this.selected.metal;
        this.glass += this.selected.glass;
        this.plastic += this.selected.plastic;

        //console.log(this.bbc.last);
        //this.bbc.last.destroy();
        //this.bbc.removeAt(1, true);
        //this.bbc.moving = false;

        this.bbseek = false;
        this.cleaning = false;
        this.selected.destroy();
        this.selected = {};

    }

    setSeek() {
        this.bbseek = true;
    }

    bubble() {

        //console.log(this.bubbles.getLength());
        console.log(this.airMax);

        // If the store is open do this

        if(this.store) {
            if(this.storeIndex == this.storeOptions.length) {
                this.hideStore();
            }
            else {
                // Purchase?
                let item = this.storeOptions[this.storeIndex];
                if(item.purchased == 0 && item.metal<=this.metal && item.glass <= this.glass && item.plastic <= this.plastic) {
                    console.log('ok!');
                    item.purchased = 1;
                    this.metal -= item.metal;
                    this.glass -= item.glass;
                    this.plastic -= item.plastic;

                    if(this.storeIndex == 0) {
                        this.airMax = 200;
                    }
                    else if(this.storeIndex == 1) {
                        this.player.velocity = 500;
                    }
                }
                else {
                    console.log('no sale');
                }
            }
        }
        else {


            this.player.body.setVelocity(0);

            //console.log(this.selected);
            if(this.selected.x > 0 && this.cleaning == false && this.trashWiggle) {
                console.log('building big bubble');
                
                this.cleaning = true;
                this.bb.x = this.player.x;
                this.bb.y = this.player.y+40;
                this.bb.setVisible(true);
                
                this.universal_tween(this.bb,this.selected.x,this.selected.y, 1000,0,false,this.setSeek);
                this.air -=10;
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
                this.air--;
                this.bubble.setVelocity(0,-50);
                this.bubbles.add(this.bubble);

            }
        }
            
        
        //this.bubble.setTint(0xffffff);
    }
/*
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
        //this.physics.add.collider(this.player, this.bb, this.doit(1), null, this);

    }

    doit(which) {
        console.log('doit');
        //this.bbc.setVelocityX(-50);
        if(this.bbc.moving == false) {
            this.bbc.moving = true;
            this.universal_tween(this.bbc,900,this.bbc.y,1000+((this.bbc.x-900)/1000),false,false,this.cashin);
        }
    }
*/
    freeze() {
        this.player.body.setVelocity(0);
    }
    freeze2() {
        this.bb.body.setVelocity(0);
        this.player.body.setVelocity(0);
        console.log('freeze2');
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

        console.log(targets.moving);

        if(this.trashWiggle == false) {

            //targets.moving = true;
            this.trashWiggle = true;
            this.selected = targets;

            this.tween_move = this.tweens.add({
                targets,
                paused: false,
                scale: targets.scale*1.2,
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
                    this.trashWiggle = false;
                    if(this.cleaning == false) {
                        this.selected = {};
                    }
                },
                loop: false
    
            });
        }
        
    }

    update() {

        if(this.store) {

            if(this.storeMove) {
                this.storeMove = false;

                this.time.addEvent({
                    delay: 150,
                    callback: ()=>{                        
                        this.storeMove = true;
                    },
                    loop: false
        
                });

                if (this.cursors.down.isDown) {
                    this.storeIndex++;
                    if(this.storeIndex == this.storeOptions.length+1) this.storeIndex = 0;
                } else if (this.cursors.up.isDown) {
                    //this.player.body.setVelocityY(speed);
                    this.storeIndex--;
                    if(this.storeIndex == -1) this.storeIndex = this.storeOptions.length;
                }
                this.storeSelector.y = 45 + (100*this.storeIndex);
            }
        }
        else {
            this.player.update(this.cursors);
        }
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
                if(trash.y> 150) {
                    if(scene.bbseek == false) {
                       scene.breathe(trash);
                    }
                }
            }
        });

        this.showAir.setScale(100,(this.air/this.airMax)*400);
        if(this.player.y < 70 && this.air < this.airMax) {
            this.air++;
        }
        if(this.air < 1) {
            //this.events.off();
            this.scene.start('GameOver');
        }

        /*if(this.bbc.length == 2 && this.bbc.y < 100) {
            if(Phaser.Math.Distance.Between(this.bbc.x, this.bbc.y,this.player.x,this.player.y)<95 ) {
                this.doit();
            }
        }*/

        this.ui2.text = this.metal;
        this.ui4.text = this.plastic;
        this.ui6.text = this.glass;

        

        if(this.bbseek) {

            this.selected.body.setVelocity(0);
            this.bb.body.setVelocity(0);

            if(Phaser.Math.Distance.Between(this.bb.x+20, this.bb.y+20,this.player.x+15,this.player.y+20)>30) {
                if(this.bbseek) {
                    this.physics.moveTo(this.bb, this.player.x+15, this.player.y+20,300);
                    this.physics.moveTo(this.selected, this.bb.x+10, this.bb.y+10,300);
                }
            }

            if(Phaser.Math.Distance.Between(this.machine.x, this.machine.y,this.bb.x,this.bb.y)<150) {
                this.cashin();
            }
        }

        //console.log(this.bbc.length);
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

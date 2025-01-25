import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0x80e5ff);
        this.ocean = this.add.image(0,100,'pixel').setOrigin(0).setScale(1024,668).setTint(0x70d5ff);
        this.land = this.add.image(0,100,'pixel').setOrigin(0).setScale(1000,20).setTint(0x964B00);
        this.land.angle=45;
        //this.add.image(512, 384, 'background').setAlpha(0.5);

        this.player = this.physics.add.sprite(200,200,'swimmer',0);
        this.player.setSize(30,40);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
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
    }
}

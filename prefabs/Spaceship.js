class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.spaceshipSpeed;
        this.direction = Phaser.Math.Between(0,1);
        this.spawnPoint = game.config.width;
        if (this.direction == 0){
            this.direction = -1;
            this.spawnPoint = 0;
            this.flipX =true;
        }
        console.log(this.direction);
        this.x = this.spawnPoint + this.x;
    }

    update() {
        this.x -= this.moveSpeed * this.direction;
        if (this.x <= 0 - this.width || this.x > game.config.width + this.width) {
            this.x = this.spawnPoint;
        }
    }
    reset() {
        this.x = this.spawnPoint;
    }
}
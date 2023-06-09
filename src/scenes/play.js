class Play extends Phaser.Scene {
  constructor() {
    super("playScene");
  }
  preload() {
    // load images/tile sprites
    this.load.image('rocket', './assets/rocket.png');
    this.load.image('spaceship', './assets/spaceship.png');
    this.load.image('starfield', './assets/background.png');
    this.load.image('starfield2', './assets/background2.png');
    this.load.image('particle', './assets/particle.png');
    // load spritesheet
    this.load.spritesheet('explosion', './assets/explosion.png', { frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9 });
    this.load.spritesheet('animSpaceship', './assets/Sprite-0002.png', {frameWidth : 64, frameHeight : 32, startFrame: 0, endFrame: 3});


  }
  create() {

    this.explosionSounds = ['sfx_explosion', 'sfx_explosion2', 'sfx_explosion3', 'sfx_explosion4',
      'sfx_explosion5'];
    this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
    this.starfield2 = this.add.tileSprite(0,0,640,480, 'starfield2').setOrigin(0,0);
    // green UI background
    this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
    // white borders
    this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    // add rocket (p1)
    this.p1Rocket = new Rocket(this, game.config.width / 2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
    // add spaceships (x3)
    this.ship01 = new Spaceship(this, game.config.width + borderUISize * 6, borderUISize * 4, 'animSpaceship', 0, 30).setOrigin(0, 0);
    this.ship02 = new Spaceship(this, game.config.width + borderUISize * 3, borderUISize * 5 + borderPadding * 2, 'animSpaceship', 0, 20).setOrigin(0, 0);
    this.ship03 = new Spaceship(this, game.config.width, borderUISize * 6 + borderPadding * 4, 'animSpaceship', 0, 10).setOrigin(0, 0);
    
    // define keys
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    // animation config
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0 }),
      frameRate: 30
    });
    
    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('animSpaceship', { start: 0, end: 3, first: 0 }),
      frameRate: 15
    });
    // initialize score
    this.p1Score = 0;
    // display score
    let scoreConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: '#F3B141',
      color: '#843605',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 100
    }
    this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding * 2,
      this.p1Score, scoreConfig);

    let highScoreConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: 'F3B141',
      color: '#843605',
      alin: 'left',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 100
    }

    this.scoreRight = this.add.text(borderUISize + borderPadding * 43, borderUISize + borderPadding * 2,
      highScore, highScoreConfig);


    let fireConfig = {
      fontFamily: 'Courier',
      fonstSize: '28px',
      backgroundColor: 'F3B141',
      color: '#843605',
      align: 'left',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 50
    }

    this.fireLabel = this.add.text(borderUISize + borderPadding * 20, borderUISize + borderPadding * 2,
      'FIRE', fireConfig);

    let timeLabel = this.add.text(borderUISize + borderPadding * 30, borderUISize + borderPadding * 2,
      'TIME', fireConfig);
    // GAME OVER flag
    this.gameOver = false;

    this.speedIncreaseClock = this.time.delayedCall(game.settings.gameTimer / 2, () => {
      this.ship01.moveSpeed *= 2;
      this.ship02.moveSpeed *= 2;
      this.ship03.moveSpeed *= 2;
    }, null, this);

    // 60-second play clock
    scoreConfig.fixedWidth = 0;
    let timeleft = game.settings.gameTimer / 1000;
    timeLabel.text = timeleft;
    let gameTimer = setInterval(function () {
      if (timeleft <= 0) {
        clearInterval(gameTimer);
      }
      timeleft -= 1;
      timeLabel.text = timeleft;
    }, 1000);

    this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
      this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
      this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
      this.gameOver = true;
    }, null, this);

    this.ship01.anims.play('fly');
    this.ship01.on('animationcomplete', () => {    // callback after anim completes
      this.ship01.anims.play('fly');  
                        
    }); 
    this.ship02.anims.play('fly');
    this.ship02.on('animationcomplete', () => {    // callback after anim completes
      this.ship02.anims.play('fly');  
                     
    }); 
    this.ship03.anims.play('fly');
    this.ship03.on('animationcomplete', () => {    // callback after anim completes
      this.ship03.anims.play('fly');  
                   
    }); 

    // Create the particle emitter
    this.particles = this.add.particles(400, 250, 'particle', {
      lifespan: 4000,
      speed: { min: 150, max: 250 },
      scale: { start: 0.8, end: 0 },
      blendMode: 'ADD',
      emitting: false
  });
    
    
  }
  update() {
    // check key input for restart
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
      this.scene.restart();
    }
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      this.scene.start("menuScene");
    }
    this.starfield.tilePositionX -= 1;
    this.starfield2.tilePositionX -= 5;
    if (!this.gameOver) {
      this.p1Rocket.update();
      this.ship01.update();               // update spaceships (x3)
      this.ship02.update();
      this.ship03.update();
    }
    if (!this.p1Rocket.isFiring) {
      this.fireLabel.y = -100;
    }
    else {
      this.fireLabel.y = borderUISize + borderPadding * 2;
    }
    // check collisions
    if (this.checkCollision(this.p1Rocket, this.ship03)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship03);
    }
    if (this.checkCollision(this.p1Rocket, this.ship02)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship02);
    }
    if (this.checkCollision(this.p1Rocket, this.ship01)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship01);
    }
  }
  checkCollision(rocket, ship) {
    // simple AABB checking
    if (rocket.x < ship.x + ship.width &&
      rocket.x + rocket.width > ship.x &&
      rocket.y < ship.y + ship.height &&
      rocket.height + rocket.y > ship.y) {
      return true;
    } else {
      return false;
    }
  }
  shipExplode(ship) {
    // temporarily hide ship
    ship.alpha = 0;
    // create explosion sprite at ship's position
    let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    boom.anims.play('explode');             // play explode 
  
    this.particles.explode(16, ship.x, ship.y);
    boom.on('animationcomplete', () => {    // callback after anim completes
      ship.reset();                         // reset ship position
      ship.alpha = 1;                       // make ship visible again
      boom.destroy();                       // remove explosion sprite
    });
    // score add and repaint
    this.p1Score += ship.points;
    if (this.p1Score > highScore) {
      highScore = this.p1Score;
      this.scoreRight.text = highScore;
    }
    this.scoreLeft.text = this.p1Score;
    this.sound.play(this.explosionSounds[Phaser.Math.Between(0, 4)]);

  }

}
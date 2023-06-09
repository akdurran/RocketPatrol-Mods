//menu class
class Menu extends Phaser.Scene {
  constructor() {
    super("menuScene");
  }
  preload() {
    // load audio
    this.load.audio('sfx_select', './assets/blip_select12.wav');
    this.load.audio('sfx_explosion', './assets/explosion38.wav');
    this.load.audio('sfx_explosion2', './assets/explosion.wav');
    this.load.audio('sfx_explosion3', './assets/explosion(1).wav');
    this.load.audio('sfx_explosion4', './assets/explosion(2).wav');
    this.load.audio('sfx_explosion5', './assets/explosion(3).wav');
    this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
    this.load.audio('main_theme', './assets/rocketpatrol.wav')
    this.load.image('starfield', './assets/background.png');
  }
  create() {
    let menuConfig = {
      fontFamily: 'Oh so it has a default',
      fontSize: '28px',
      backgroundColor: '#F3B141',
      color: '#843605',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 0
    }
    this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
    this.add.text(game.config.width / 4, game.config.height / 2 - borderUISize -
      borderPadding, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
    this.add.text(game.config.width / 3.5, game.config.height / 2, 'Use arrows to move & F to fire', menuConfig).setOrigin(0.5)
    menuConfig.backgroundColor = '#00FF00';
    menuConfig.color = '#000';
    this.add.text(game.config.width / 3, game.config.height / 2 + borderUISize +
      borderPadding, 'Press <- for Novice or -> for Expert', menuConfig).setOrigin(0.5);
    // define keys
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    let mainThemeConfig = {
      loop : true
    };
    this.sound.stopAll();
    this.sound.play('main_theme', mainThemeConfig);
    
  }
  update() {
    if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      // easy mode
      game.settings = {
        spaceshipSpeed: 3,
        gameTimer: 60000
      }
      this.sound.play('sfx_select');
      this.scene.start('playScene');
    }
    if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
      // hard mode
      game.settings = {
        spaceshipSpeed: 4,
        gameTimer: 45000
      }
      this.sound.play('sfx_select');
      this.scene.start('playScene');
    }
  }
}
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 200}
    }
  },
  scene: {
    preload: preload,
    create: create
  }
};

var game = new Phaser.Game(config);

function preload() {
  // this.load.setBaseURL('http://labs.phaser.io');
  this.load.image('sky', 'img/space3.png');
  this.load.image('logo', 'img/phaser3-logo.png');
  this.load.image('red', 'img/red.png');
}

function create() {
  // background
  this.add.image(400, 300, 'sky');

  // particles
  var particles = this.add.particles('red');
  var emitter = particles.createEmitter({
    speed: 100,
    scale: {start: 1, end: 0},
    blendMode: 'ADD'
  });

  // logo
  var logo = this.physics.add.image(400, 100, 'logo');
  logo.setVelocity(100, 200);
  logo.setBounce(1, 1);
  logo.setCollideWorldBounds(true);

  emitter.startFollow(logo);
}

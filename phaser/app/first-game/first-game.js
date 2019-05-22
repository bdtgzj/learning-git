var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {y: 300},
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var score = 0;
var scoreText;
var player;
var platforms;
var cursors;
var stars;
var bombs;
var gameOver = false;

var game = new Phaser.Game(config);

function preload() {
  // this.load.setBaseURL('http://labs.phaser.io');
  this.load.image('sky', 'img/sky.png');
  this.load.image('ground', 'img/platform.png');
  this.load.image('star', 'img/star.png');
  this.load.image('bomb', 'img/bomb.png');
  this.load.spritesheet('dude', 'img/dude.png', {frameWidth: 32, frameHeight: 48});
}

function create() { // note the sequence of add.
  // background
  this.add.image(400, 300, 'sky');

  // score
  scoreText = this.add.text(16, 16, 'score: 0', {fontSize: '32px', fill: '#000'});

  // static platforms
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody(); // ground
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  // sprite
  player = this.physics.add.sprite(100, 450, 'dude');
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [ { key: 'dude', frame: 4 } ],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  // Stars
  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: {x: 12, y: 0, stepX: 70}
  });
  stars.children.iterate(child => {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  // Bombs
  bombs = this.physics.add.group();

  // Keyboard Control
  cursors = this.input.keyboard.createCursorKeys();

  // Collider
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(player, bombs, hitBomb, null, this);

  // Overlap check
  this.physics.add.overlap(player, stars, collectStar, null, this);
}

function collectStar(player, star) {
  // eat a star
  star.disableBody(true, true);
  // update score
  score += 10;
  scoreText.setText('score: ' + score);
  // release stars & bombs
  if (stars.countActive(true) === 0) {
    stars.children.iterate(child => {
      child.enableBody(true, child.x, 0, true, true);
    });
    releaseBombs();
  }
}

function hitBomb() {
  this.physics.pause();
  player.setTint(0xff0000);
  player.anims.play('turn');
  gameOver = true;
}

function releaseBombs() {
  var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
  var bomb = bombs.create(x, 16, 'bomb');
  bomb.setBounce(1);
  bomb.setCollideWorldBounds(true);
  bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
  bomb.allowGravity = false;
}

function update() {
  //
  if (gameOver) return;
  // Keyboard Control: left, right, stop
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }
  // Keyboard Control: up (Jump)
  if (cursors.up.isDown && player.body.touching.down) { // if the player is touching the floor (static object)
    player.setVelocityY(-330);
  }
}

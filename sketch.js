const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;

var GAMESTATE = 0;

var Play;

var Upgrade;

var Charimg;

var character;

var character1, character2;

var character1img, character2img;

var backgroundimg1 = "red";

var zombie, zombiegroup;

var bullet, bulletgroup;

var score = 0;

var zombiearray = [];

function preload() {
play = loadImage("play.png");
upgrade = loadImage("upgrade.png");
character1img = loadImage("man.png");
character2img = loadImage("woman.png");
Bg1 = loadImage("bg1.jpg");
Bg2 = loadImage("bg2.jpeg");
bulletimg = loadImage("bullet.png");
zombieimg = loadImage("zombie.png")
}

function setup() {
createCanvas(displayWidth, displayHeight);
engine = Engine.create();
world = engine.world;

Play = createSprite(displayWidth/2-150, displayHeight/2-50, 100, 50);
Play.addImage(play);
Play.scale = 0.09;

Upgrade = createSprite(displayWidth/2+170, displayHeight/2-50, 100, 50);
        Upgrade.addImage(upgrade);
        Upgrade.scale = 0.25;


character1 = createSprite(displayWidth/2-250, displayHeight/2+100, 50, 100);
character1.addImage(character1img);
character1.scale = 0.15;
character1.visible = false;

character2 = createSprite(displayWidth/2+250, displayHeight/2+100, 50, 100);
character2.addImage(character2img);
character2.scale = 0.5;
character2.visible = false;

character = createSprite(displayWidth-100, displayHeight/2, 50, 100);
character.visible = false;

bulletgroup = new Group();

zombiegroup = new Group();

}

function draw() {
    background(backgroundimg1);
    Engine.update(engine);


fill("white");
textSize(40)
text("Score: " + score, displayWidth-200, 50);

    if(GAMESTATE === 0) {

        backgroundimg1 = Bg1;
 
        fill("yellow");
        textSize(30);
        text("Welcome to Zombie Killers", displayWidth / 2-150, displayHeight / 2-200);
        if(mousePressedOver(Play)) {
            GAMESTATE = 1; 
        }

        if(mousePressedOver(Upgrade)) {
            GAMESTATE = 2;
        }
    }

    if (GAMESTATE === 1) {

        backgroundimg1 = Bg2;

        Play.destroy();
        Upgrade.destroy();

        character1.visible = true;
        character2.visible = true;

        if(mousePressedOver(character1)) {
            GAMESTATE = 3;
            Charimg = "c1";
        }

        if(mousePressedOver(character2)) {
            GAMESTATE = 3;
            Charimg = "c2";
        }

        fill("blue");
        textSize(50);
        text("Choose A Character", displayWidth/2-200, displayHeight/2-100);
    }

    if(GAMESTATE === 3){

        backgroundimg1 = "black"

        character.visible = true;

        camera.position.x = displayWidth/2;
        camera.position.y = character.y;

        character1.destroy();
        character2.destroy();

        if(Charimg === "c1") {
            character.addImage(character1img);
            character.scale = 0.15;
            
        }

        if(Charimg === "c2"){
            character.addImage(character2img);
            character.scale = 0.5;
        }

        if(keyDown(UP_ARROW) && character.y>0){
            character.y = character.y-10;
            console.log(character.y);
        }

        if(keyDown(DOWN_ARROW) && character.y<displayHeight) {
            character.y = character.y+10;
        }

        if(frameCount % 100 === 0) {
            var rand = Math.round(random(50, displayHeight));
            zombie = createSprite(displayWidth/2-600, rand, 20, 20);
            zombie.velocityX = 3;
            zombie.addImage(zombieimg);
            zombie.scale = 0.5;

            zombiearray.push(zombie);

            zombiegroup.add(zombie);
        }

        if(keyDown("space")) {
            bullet = createSprite(character.x-90, character.y+30, 50, 20);
            bullet.velocityX = -7;
            bullet.addImage(bulletimg);
            bullet.scale = 0.05;

            bulletgroup.add(bullet);

        }

        for(var i=0; i<zombiearray.length; i++) {
        if(bulletgroup.isTouching(zombiearray[i])){
            zombiearray[i].destroy();

            score = score+5
        }
    }
        
    }

    drawSprites();
}
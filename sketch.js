
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var ground;
var survivalTime=0;

var PLAY=1;
var END=0;
var gameState=PLAY;

var invisibleground;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,200);
  
  monkey =  createSprite(50,180,20,50);
  monkey.addAnimation("running", monkey_running);

  monkey.scale=0.09;
  
  

  ground = createSprite(0,180,6000,10);
  ground.velocityX=-4;
  
  invisibleground=createSprite(0,180,6000,5);
  invisibleground.visible=false;
  
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
}


function draw() {
  background(220);
  
  fill("black");
  textSize(15);
 text("Survival Time:"+survivalTime,100,50) ;
    
  if(gameState===PLAY){
  
  if(ground.x<0){
     ground.x=ground.width/2;
     }
  
  survivalTime=survivalTime+Math.round(getFrameRate()/60);
   
    
    
  if(keyDown("space")&& monkey.y>=140){
    monkey.velocityY=-13;
  }
  monkey.velocityY=monkey.velocityY+0.8;
    
  food();
  obstacles1();
  
  
  if(obstacleGroup.isTouching(monkey)){
    gameState=END;
    
  }
  }
  if(gameState===END){
    monkey.velocityY=0;
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setLifetimeEach(-1);
    ground.velocityX=0;
  }
  
   monkey.collide(invisibleground);
  
  
  
  
  

  drawSprites();
}
function food(){
  if(frameCount%80===0){
banana = createSprite(600,100,20,20);  
    banana.y=Math.round(random(100,120));
     
    banana.addImage("bImage",bananaImage)
    banana.velocityX=-3;
    banana.scale=0.09;
    
    banana.depth=monkey.depth;
    monkey.depth=banana.depth+1;
    
    
    banana.lifetime=200;
 foodGroup.add(banana);
  }
  
}
function obstacles1(){
if(frameCount%300===0){
obstacle= createSprite(400,160,10,40);
  
  obstacle.velocityX=-6;
   obstacle.addImage(obstacleImage);
  obstacle.scale=0.09;
  obstacle.lifetime=300;
  obstacleGroup.add(obstacle);
}
  
 
  
}








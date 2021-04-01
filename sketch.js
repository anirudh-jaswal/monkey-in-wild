var PLAY=1
var END=0
var gameState= PLAY
var monkey , monkey_running
var banana,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400)
  monkey=createSprite(35,357,20,20)
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.08
  
  ground=createSprite(50,390,1200,20)
  ground.x=ground.width/2
  
  
  FoodGroup=createGroup()
  obstacleGroup=createGroup()
 score=0
  monkey.debug=true
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height)
}



function draw() {
  background("cyan")
  textSize(30)
  text("survivaltime:"+score,230,30) 
  if(gameState===PLAY){
    ground.velocityX=-(10)
    score=score+Math.round(getFrameRate()/60)
    if(ground.x<0){
      ground.x=ground.width/2
    }
    if(keyDown("space")&&monkey.y>=310){
    monkey.velocityY=-12    
    }
    monkey.velocityY=monkey.velocityY + 0.5
    out()
    mark()
    if(obstacleGroup.isTouching(monkey)){
      gameState=END
      
    }
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach()
    }
  }
  if(gameState===END){
    textSize(20)
    text("press r to restart",200,200)
    FoodGroup.destroyEach()
    obstacleGroup.destroyEach()
    ground.velocityX=0
    monkey.visible=false
    if(keyDown("r")){
      gameState=PLAY
      monkey.visible=true
    }
  }
  monkey.collide(ground)
  drawSprites()
  
}

function mark(){
  if(frameCount%60===0){
     banana=createSprite(600,165,10,40)
    banana.y=Math.round(random(200,320))
    banana.velocityX=-10
    banana.addImage(bananaImage)
    banana.scale=0.05
    banana.lifetime=60
    FoodGroup.add(banana)
  }
}
 function out(){
  if(frameCount%80===0){
     obstacle=createSprite(600,365,10,40)
     obstacle.velocityX=-10
     obstacle.addImage(obstacleImage)
     obstacle.lifetime=60
     obstacle.scale=0.1
     obstacleGroup.add(obstacle)
  }
 }




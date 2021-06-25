var dog, sadDog, happyDog, garden, washroom, livingImg, database ;
var foodS,foodStock;
var fedTime,lastFed,currentTime;
var feed,addFood;
var foodObj;
var gameState, readState;

function preload(){

sadDog=loadImage("images/Dog.png") ;
happyDog=loadImage("images/happy dog.png") ;
garden=loadImage("images/Garden.png") ;
washroom=loadImage("images/Wash Room.png") ;
bedroom=loadImage("images/Bed Room.png") ;
livingImg = loadImage("images/Living Room.png") ;

}

function setup() {
  database=firebase.database();
  createCanvas(1000,500);
  
  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  //read game state from database
  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState=data.val();
  });
   
  dog=createSprite(550,250,10,10);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  feed=createButton("FEED FOOD");
  feed.position(500,15);
  feed.mousePressed(feedDog);

  addFood=createButton("ADD FOOD");
  addFood.position(400,15);
  addFood.mousePressed(addFoods);
  dog.addImage(sadDog)

}

function draw() {
   background(225,225)
  

   if(gameState === 1) {
     dog.addImage(happyDog) ;
     dogscale = 0.175 ;
     dog.y = 250 ;
   }

   if(gameState === 2) {
     dog.addImage(sadDog) ;
     dog.scale = 0.175 ;
     //milkBottle2.visible = false ;
     dog.y = 250 ;
   }

   var bath = createButton("I want to take a bath") ;
   bath.position(580,125) ;
   if(bath.mousePressed(function(){
    gameState = 3
    database.ref('/').update({'gameState':gameState})
   })) ;

   if(gameState === 3) {
    dog.addImage(washroom)
    dog.scale = 1
    milkBottle2.visible = false
   }

   var sleep = createButton("I am very sleepy")
   sleep.position(720,125) ;
   if(bath.mousePressed(function(){
    gameState = 4
    database.ref('/').update({'gameState':gameState})
   })) ;
   
   if(gameState === 4) {
    dog.addImage(bedroom)
    dog.scale = 1
    //milkBottlevisible = false
   }

   var Play = createButton("Lets Play !")
   Play.position(835,125) ;
   if(Play.mousePressed(function(){
    gameState = 5
    database.ref('/').update({'gameState':gameState})
   })) ;
   
   if(gameState === 5) {
    dog.addImage(livingImg)
    dog.scale = 1
    //milkBottle2.visible = false
   }

   var PlayinGarden = createButton("Lets Play in the park")
   PlayinGarden.position(915,125) ;
   if(PlayinGarden.mousePressed(function(){
    gameState = 6
    database.ref('/').update({'gameState':gameState})
   })) ;
   
   if(gameState === 6) {
    dog.y = 175
    dog.addImage(garden)
    dog.scale = 1
   //milkBottle2.visible = false
   }
  
    drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
  Food:foodS
  })
}

//update gameState
function update(state){
  database.ref('/').update({
  gameState:state
  })
}
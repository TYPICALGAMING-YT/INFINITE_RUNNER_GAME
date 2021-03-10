var bg,bgimg
var boy,boyimg;
var st;
var fimg,b1img,ob2img,ob3img;

var startb,startimg;

var healthbar,healthbarimg,health2im,health3im,health4im;
var gameState="serve";
var health=3;
var score=0
var coinbar,coinbarimg,coinimg,coin2im,coin3img,coin4img
var coinsound,tsound;
var coinscore=0

function preload() {
    bgimg=loadImage("bg.jpg")
    boyimg=loadAnimation("g-0.png" ,  "g-1.png" ,  "g-2.png"  ,  "g-3.png"   ,  "g-4.png",  "g-5.png",  "g-6.png",  "g-7.png")
    st=loadSound("6.mp3");
    fimg=loadAnimation("b-0.png","b-1.png","b-2.png","b-3.png","b-4.png")
    b1img=loadImage("ob1.png")
    ob2img=loadImage("ob2.png")
    ob3img=loadImage("m.png")
    startimg=loadImage("start2.png")
    healthbarimg=loadImage("gage2 (1).png")
    heimg=loadImage("h2.png")
    coinbarimg=loadImage("c2.png");
    coinimg=loadImage("coin.png")
    coinsound=loadSound("csound.wav")
    tsound=loadSound("pr0c37t.wav")
    coin2im=loadImage("c3.png")
    coin3img=loadImage("c4.png")
    coin4img=loadImage("c1.png")
    health2im=loadImage("0.png")
    health3im=loadImage("1.png")
    health4im=loadImage("3.png")
}
function setup() {
    createCanvas(displayWidth,displayHeight-145)

    bg=createSprite(600,200,100,100)
    bg.addImage(bgimg)

    boy=createSprite(550,500,1,1)
    boy.addAnimation("boyimg",boyimg)

    boy.setCollider("rectangle",0,0,100,160)

    healthbar=createSprite(430,30,100,10)
    healthbar.addImage(healthbarimg)
    healthbar.scale=1.4;

    coinbar=createSprite(780,30,10,10)
    coinbar.addImage(coinbarimg)
    coinbar.scale=1.3
    firglobal=new Group()
    ob1global=new Group()
    ob2global=new Group()
    ob3global=new Group()
    coingroup=new Group()
    ob4group=new Group()

}

function draw(){
background(0)
//bg.velocityY=4.5

if(bg.y>400){
    bg.y=bg.height/3
}

if(keyDown("right")){
    boy.velocityX=3.5
}
if(keyWentUp("right")){
    boy.velocityX=0
}

if(keyDown("left")){
    boy.velocityX=-3.5
}
if(keyWentUp("left")){
    boy.velocityX=0
}

if(boy.x<370){
    boy.velocityX=3
}
if(boy.x>840){
    boy.velocityX=-3
}

fire();
ob1();
ob2();
ob3();
ob4()
coin()
if(firglobal.isTouching(boy)){
    health=health-1
    tsound.play()
    firglobal.destroyEach()
}
if(ob1global.isTouching(boy)){
    health=health-1
    tsound.play()
    ob1global.destroyEach()
}
if(ob2global.isTouching(boy)){
    health=health-1
    tsound.play()
    ob2global.destroyEach()
}
if(ob3global.isTouching(boy)){
    health=health-1
    tsound.play()
    ob3global.destroyEach()
}
if(ob4group.isTouching(boy)){
    health=health+1
    tsound.play()
    ob4group.destroyEach()
}
if(coingroup.isTouching(boy)){
   coinscore=coinscore+1
   coinsound.play()
    coingroup.destroyEach()
}

if(coinscore===1){
    coinbar.addImage(coin2im)
}
if(coinscore===2){
    coinbar.addImage(coin3img)
}
if(coinscore===3){
    coinbar.addImage(coin4img)
}
if(health<=0){
healthbar.addImage(health2im)
}
if(health===1){
    healthbar.addImage(health3im)
 }
 if(health===2){
 healthbar.addImage(health4im)
 }
        
    
if(keyWentDown("space")){
    st.play()
    gameState="play"
}



drawSprites()
////text("health"+health,200,200)
//text("score"+score,400,400)
if(gameState==="serve"){
    firglobal.setVelocityYEach(0)
    ob1global.setVelocityYEach(0)
    ob2global.setVelocityYEach(0)
    ob3global.setVelocityYEach(0)
    coingroup.setVelocityYEach(0)
    ob4group.setVelocityYEach(0)
    bg.velocityY=0
    boy.visible=false
    textSize(20)
    fill("black")
    text("How To Play Infinite Runner Game:-",450,200)
    text("1: Use Your Right And Left Key To Move.",440,235)
    text("2: Try To Save YourSelf From Obstacle.",440,260)
    text("3: Try To Get Health Drink.",440,285)
    text("4: Use Enter Key To Start The Game.",440,310)
    text("5: Hope You Enjoy The Game :)",440,335)
}

if(gameState==="play"){
    firglobal.setVelocityYEach(4)
    ob1global.setVelocityYEach(4)
    ob2global.setVelocityYEach(4)
    coingroup.setVelocityYEach(4)
    bg.velocityY=4.5
    boy.visible=true
   score= score+Math.round(getFrameRate()/60)
}

if(health===0){
    gameState="end"
}
if(gameState==="end"){
    firglobal.setVelocityYEach(0)
    ob1global.setVelocityYEach(0)
    ob2global.setVelocityYEach(0)
    ob3global.setVelocityYEach(0)
    coingroup.setVelocityYEach(0)
    ob4group.setVelocityYEach(0)
    bg.velocityY=0
    boy.visible=false;
    textSize(20)
    fill(0)
    text(" Oops GameOver Use CTRL+R Restart The Game",400,300)
    text(" Your Total Score:"+score,400,330)
    
}
}

function fire(){
    if(frameCount%200===0){
        var rx=random(370,850)
        var f=createSprite(rx,-50,10,10)
        f.addAnimation("f",fimg)
        f.scale=0.2
        f.velocityY=4
        f.depth=boy.depth;
        boy.depth=boy.depth+1
        f.lifetime=150
        f.setCollider("rectangle",0,0,350,250)
firglobal.add(f)
    }
}

function ob1(){
    if(frameCount%240===0){
        var rx=random(350,850)
       var b=createSprite(rx,-50,0,0)
       b.addImage(b1img)
       b.scale=0.3
       b.velocityY=4
       b.setCollider("circle",0,0,65)
       b.lifetime=150
       b.depth=boy.depth
       boy.depth=boy.depth+1
       ob1global.add(b)
    }
}

function ob2(){
    if(frameCount%300===0){
        var rx=random(350,850);
        var s=createSprite(rx,-50,0,0)
        s.addImage(ob2img)
        s.scale=0.5
        s.velocityY=4
        s.setCollider("circle",0,0,60)
        s.lifetime=150
        s.depth=boy.depth
        boy.depth=boy.depth+1
       ob2global.add(s)
    }
}

function ob3(){
    if(frameCount%350===0){
        var rx=random(320,850)
        var m=createSprite(rx,-50,0,0)
        m.addImage(ob3img)
        m.scale=0.5;
        m.velocityY=4
        m.lifetime=150
        m.depth=boy.depth
        boy.depth=boy.depth+1
        ob3global.add(m)
    }
}

function ob4(){
    if(frameCount%590===0){
        var rx=random(340,810)
        var he=createSprite(rx,-50,10,0)
        he.addImage(heimg)
        he.velocityY=4
        he.scale=0.5
        ob4group.add(he)
        he.lifetime=150
    }
}

function coin(){
    if(frameCount%480===0){
        var rx=random(400,720)
        var co=createSprite(rx,-50,0,0)
        co.addImage(coinimg)
        co.scale=0.1
        co.velocityY=4
        coingroup.add(co)
        co.lifetime=150
    }
}
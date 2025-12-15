/***


    Rotation Code Citation:  
    
    Wheeler, P. (2021). How would I rotate a vector in 3D space? P5.js. [online] Stack Overflow. Available at: 
        https://stackoverflow.com/a/67468546 [Accessed 1 May 2023].

***/

// Rotate one vector (vect) around another (axis) by the specified angle.
function rotateAround(vect, axis, angle) {
  // Make sure our axis is a unit vector
  axis = p5.Vector.normalize(axis);

  return p5.Vector.add(
    p5.Vector.mult(vect, cos(angle)),
    p5.Vector.add(
      p5.Vector.mult(
        p5.Vector.cross(axis, vect),
        sin(angle)
      ),
      p5.Vector.mult(
        p5.Vector.mult(
          axis,
          p5.Vector.dot(axis, vect)
        ),
        (1 - cos(angle))
      )
    )
  );
}



// 3D Models
    
    // Ship Model
    let syringe
    
    // Syringe Ship Object
    let syringeShip
    
    // Particle Model
    let sun
    
    // Bullet Model
    let bullet
    




let worldTexture

// Sound and Video Elements

let capture;
let speech;

// Intialize selectors


let tattooArray = [];
let tattooDesc = ["Doom333","MetalLazerShot","Clown2","TwinSnakes","ClownCity","Chaos+Balance","Chompi","The Seamstress","Vore-CoreV2","HolyGun","Vore-CoreV1","Death13","SQEZ","Big Pharma","Furry Love"]
let tattooDisplay;
let tattooDisplayDesc;

class Tattoo {
    
    constructor({img,name,position,desc, isFound}){
        this.img = img;
        this.name = name;
        this.position = position;
        this.desc = desc;
        this.isFound = false;
    }
    
}

function drawTattoos(tattooArray){
    let i = 0;    
    for(let tattoo of tattooArray){
     
        push()
            randomSeed(i+=60)
            translate(tattoo.position)
            
            rotateY(random(0,2*PI))
            texture(tattoo.img)

        
            //console.log(tattoo.position)
            plane(350,350)
            push()
                scale(225);
                rotateY(PI/2);
                model(frame);
            pop()
            textSize(30)
           if(tattoo.isFound == true){

            textAlign(CENTER) 
            text(tattoo.desc,0,-400)
    }
        
        pop()
        
    }
    
}

function checkCollisionTattoos(tattooArray, bulletArray, ship){
    
    for(let tattoo of tattooArray){

        if(p5.Vector.dist(tattoo.position,ship.position) < 200){
            
            tattoo.isFound = true;
            tattooDisplay = tattoo.img;
            tattooDisplayDesc = tattoo.desc; 
        }
        for(let bullet of bulletArray){
            
            if(p5.Vector.dist(tattoo.position,bullet.position) < 300){
            
            tattoo.isFound = true;
            tattooDisplay = tattoo.img; 
            tattooDisplayDesc = tattoo.desc;

            bulletArray.splice(1,bulletArray.indexOf(bullet))
            
        }
            
  
            
        }
        
    }
    
    
}

let foundCount = 0;

function checkFound(tattooArray){
    
    let foundCountTemp = 0;
    
    for(let tattoo of tattooArray){
        
        if(tattoo.isFound == true){
            
           foundCountTemp++;
        } 
       
    }
    
    foundCount = foundCountTemp;
    
    if(foundCount == tattooArray.length){
        
        return true;
        
    } else {

        return false
        
    }
    

   
    
}

var syringeText;
var sunText;
var frame;
var arcode;
var bulltext;
var overlay;

function preload(){
    
    for(let i = 0; i < 15; i++){
        if(tattooArray.length > 1){
            for(let tt of tattooArray){
                console.log(tt)
                for(let t of tattooArray){

                    if(p5.Vector.dist(t.position,tt.position) < 600 && (t.desc != tt.desc)){

                        t.position = p5.Vector.random3D().mult(random(1000,3000));

                    }

                }
            }
            
        }
    
        

        let tempTattoo = new Tattoo({
   
            img: loadImage("assets/Tattoos/"+(i+1).toString()+".jpg"),
            position: p5.Vector.random3D().mult(random(1000,3000)),
            desc: tattooDesc[i]
            
        })
        tattooArray.push(tempTattoo)
        
        console.log(tattooArray)
        
    }

    // load overlay texture

    overlay = loadImage("assets/art/overlay.png")

    // loadAr Code

    arcode = loadImage("assets/AR/webar.png")


    // loadframe

    frame = loadModel("assets/3DModels/frame.obj")

    // load Ship Texture

    syringeText = loadImage("assets/3DModels/textures/SyringeColor.png")
    
    // Load Ship Model
    syringe = loadModel("assets/3DModels/syringecross1.obj")
    
    // Load Particle Texture

    sunText = loadImage("assets/3DModels/Textures/Fire.png")

    // Load Particle Model
    sun = loadModel("assets/3DModels/sun.obj")
    
    // load bullet Texture

    bulltext = loadImage("assets/3DModels/textures/Bullet.png")

    // Load Bullet Model
    bullet = loadModel("assets/3DModels/bullet.obj")

    worldTexture = loadImage("assets/Art/background.png")
}

/***

    P5.js Keypressed Function to Handel rocket being fired 

***/

var isFired = false;
var isCollided = false;

var bulletArray = [];
var bulletCount = 0;

function updateBullets(bArray){
    for(let b of bArray){
        
        b.update()
        
    }
    
    
}

function drawBullets(bArray){
    
    for(let b of bArray){
        push()
            
            b.draw()
        pop()
        
    }
    
}




function controls(){
        
        // WASD MOVEMENT
            if(keyIsDown(87)){
                let shipX = rotateAround(createVector(10,0,0), createVector(0,0,10),map(newMouseY,0,windowHeight,-PI/2,PI/2,true))
                let shipV = rotateAround(shipX,createVector(0,-1,0),map(newMouseX,0,windowWidth,-4*PI,4*PI,true))
                syringeShip.setPosition(p5.Vector.add(syringeShip.getPosition(),shipV))
            }
            if(keyIsDown(65)){
                let shipV = rotateAround(createVector(0,0,-10),createVector(0,-1,0),map(newMouseX,0,windowWidth,-4*PI,4*PI,true))
                syringeShip.setPosition(p5.Vector.add(syringeShip.getPosition(),shipV))
            }
            if(keyIsDown(83)){
                let shipX = rotateAround(createVector(-10,0,0), createVector(0,0,10),map(newMouseY,0,windowHeight,-PI/2,PI/2,true))
                let shipV = rotateAround(shipX,createVector(0,-1,0),map(newMouseX,0,windowWidth,-4*PI,4*PI,true))
                syringeShip.setPosition(p5.Vector.add(syringeShip.getPosition(),shipV))
            }
            if(keyIsDown(68)){
                let shipV = rotateAround(createVector(0,0,10),createVector(0,-1,0),map(newMouseX,0,windowWidth,-4*PI,4*PI,true))
                syringeShip.setPosition(p5.Vector.add(syringeShip.getPosition(),shipV))
            }
            if(keyIsDown(16)){
                syringeShip.setPosition(p5.Vector.add(syringeShip.getPosition(),createVector(0,-10,0)))
            }
        if(keyIsDown(220)){
                syringeShip.setPosition(p5.Vector.add(syringeShip.getPosition(),createVector(0,10,0)))
            }

        
       
 
    
}

let isReload = false;

function keyPressed(){
    if(!checkFound(tattooArray)){
        if(keyCode == 82){
            reload(bulletArray);
        }
    }

    if(keyCode == 67){
        if(isStarting){
            isStarting = false;
        }  
    }
}

function mouseClicked(){
    if(!isStarting && !checkFound(tattooArray)){
        if(bulletCount > 18){
        
            isReload = true;
            
        }
        
        if(!isReload){

         var bulletPos = syringeShip.getPosition()
          
          
          let bulletX = rotateAround(createVector(1,0,0), createVector(0,0,10),map(newMouseY,0,windowHeight,-PI/2,PI/2,true))
          let bulletV = rotateAround(bulletX,createVector(0,-1,0),map(newMouseX,0,windowWidth,-4*PI,4*PI,true))
                
                
          
          bulletV.mult(50)
          
          let bulletObj = new Bullet(bulletPos,bulletV)
          
          bulletArray.push(bulletObj)
          bulletCount++;
    
          console.log(bulletArray)
        }
    }
    
    
}

function reload(bArray){

    
    bulletCount = 0;
    isReload = false;
}

var gl;
var font;



function setup() {
      
     
      // set the canvas to be in the #screen div
          var myCanvas = createCanvas(800, 600, WEBGL);
          myCanvas.parent("screen")

    // Create ship
    
    syringeShip = new Ship(createVector(0,0,0)) 
    
     // Create particle array
    createParticleArray(10, syringeShip)
    
    font = loadFont("assets/Fonts/Connection.otf");
    textFont(font)
    
    gl = this._renderer.GL

}

// Initialize camera Object
let cam = {
    x: 0,
    y: 0,
    z: 0,
    CenterX: 0,
    CenterY: 0,
    CenterZ: 0,
    upX:0,
    upY:1,
    upZ:0,
    
    
}

// Intialize Particle Class
class Particle{
    
    constructor(position,size,life, velocity){
        this.position = position;
        this.size = size;
        this.life = life;
        this.velocity = velocity;
    }
    
    setPosition(position){
        
        this.postion = position;
        
    }
    
    getPosition(){
        
        return this.position;
        
    }
    
}

// Initialize Ship Class
class Ship{
    constructor(position,rotation){
        this.position = position
        this.rotation = rotation
    }
    
    setPosition(position){
        
        this.position = position;
        
    }
    
    getPosition(){
        
        return this.position;
        
    }
    
    setRotation(rotation){
        
        this.rotation = rotation;
        
    }
    
    getRotation(){
        
        return this.rotation;
        
    }
    
}

// Initialize Bullet Class
class Bullet{
    constructor(position,velocity){
        this.position = position;
        this.velocity = velocity;
        this.isFired = false;
        this.rotY;
        this.rotZ;
    }
    
 
    
    setPosition(position){
        
        this.position = position;
        
    }
    
    getPosition(){
        
        return this.position;
        
    }
    
    setVelocity(velocity){
        
        this.velocity = velocity;
        
    }
    
    getVelocity(){
        
        return this.velocity;
        
    }
    
    draw(){
        
        push()
            translate(0,150,0)
            translate(this.position)
              // rotate to the correct orrientation
            rotateZ(PI)
            rotateY(PI)
    
            // rotate 
            
    
            if(this.isFired == false){
               
                this.rotY = map(newMouseX,0,windowWidth,-4*PI,4*PI,true)
                this.rotZ = map(newMouseY,0,windowHeight,-PI/2,PI/2,true)
                
                this.isFired = true;
            }
         
            rotateY(this.rotY);
            rotateZ(-this.rotZ);
    
        
            
            scale(30)

            texture(bulltext) 
            model(bullet);
        pop()
    }
    
    update(){
        
        this.setPosition(p5.Vector.add(this.position,this.velocity));
        
    }
    
}

// update Ship position
function updateShip(ship){
    
   
}

// Initialize Array of Paticles
var particles = []


function createParticleArray(maxSize,ship){
    for(let i = 0; i < maxSize; i++){
        
        let shipX = rotateAround(createVector(-10,0,0), createVector(0,0,10),map(newMouseY,0,windowHeight,-PI/2,PI/2,true))
        let shipV = rotateAround(shipX,createVector(0,-1,0),map(newMouseX,0,windowWidth,-4*PI,4*PI,true))
        syringeShip.setPosition(p5.Vector.add(syringeShip.getPosition(),shipV))
        
        
        let particle = new Particle(p5.Vector.add(ship.getPosition(),shipV), random(10,20), random(0,50))
        particles.push(particle)
        
    }
}

function updateParticles(particleArray,ship){
    
    for(let particle of particleArray){
     
        particle.size -= 0.3

        particle.setPosition(particle.getPosition().add(particle.getVelocity))
        
        if(particle.size < 0){
        
            particleArray.splice(particleArray.indexOf(particle),1)
            
          

            
            let shipX = rotateAround(createVector(-200,0,0), createVector(0,0,10),map(newMouseY,0,windowHeight,-PI/2,PI/2,true))
            let shipV = rotateAround(shipX,createVector(0,-1,0),map(newMouseX,0,windowWidth,-4*PI,4*PI,true))
            
            
            
            
            let newParticle = new Particle(p5.Vector.add(ship.getPosition(),shipV), random(1,5), random(0,50))
            particleArray.push(newParticle)
            
        }
        
    }
    
    
}

function drawParticles(particleArray){
    
    for(let particle of particleArray){
        push()
           
            push()
                 translate(0,150,0)
                translate(particle.getPosition()); 
                rotateX(PI)
                scale(particle.size)
                texture(sunText)
                model(sun);
            pop()
        pop()
    }

    
}

// Checks if bullet is within visible distance otherwise deletes it

function checkOutofBounds(bulletArray,syringeShip){
    for(let b of bulletArray){

        if(p5.Vector.dist(b.position, syringeShip.position) > 7000){

            bulletArray.splice(bulletArray.indexOf(b),1)

        }

    }
}


var tilt = 0;

isStarting = true;
isPaused = false;

var ShiptempZ;
var ShiptempX;

function restart(){
    syringeShip = new Ship(createVector(0,0,0)) 

    for(let t of tattooArray){

        t.isFound = false;

    }

    bulletArray = []
    bulletCount = 0

    gameTime = round(gameTime - millis()/1000)
    tattooDisplay = null;
    isStarting = true;
}



var startTime = 0;
var gameTime;
var tempcam;

var overlayTempX;
var overlayTempY;

var lostTime = 0;
var prevMouseX;
var prevMouseY;

var mOffsetX = 0;
var mOffsetY = 0;

var newMouseY;
var newMouseX;

function draw(){

    // setup the light

    directionalLight(180,180,180, 0,0,-windowWidth/2);
    directionalLight(255,255,255, 0,0,windowWidth/2);

    ambientLight(60);
    pointLight(200,200,200, 0,0,0, 40);
    noStroke();
    background(80); // clear screen
    ambientMaterial(100, 0, 0); // magenta material


    let shipX = rotateAround(createVector(10,0,0), createVector(0,0,10),map(newMouseY,0,windowHeight,-PI/2,PI/2,true))
    let shipV = rotateAround(shipX,createVector(0,-1,0),map(newMouseX,0,windowWidth,-4*PI,4*PI,true))

    shipV.mult(200);

    pointLight(150,150,150,p5.Vector.add(syringeShip.getPosition(),shipV))

   

    if(isStarting){

        // UI for the start 
        background(200)
        camera()
        // scale and rotate model

        push()
            scale(20)
            rotateX(PI/2)
            rotateZ(millis()/500)
            texture(syringeText)
            textureMode(NORMAL);
            model(syringe)
        pop()
        
        // add instructions

        push()

            textAlign(CENTER)
            textSize(20)
            fill(255*sin(millis()/500)) 
            stroke(0)
            text("PRESS C TO START",0,70)
            push()
                textAlign(CORNER)
                fill(0)
                translate(-width/2,0)
                text("WASD: MOVEMENT",20,0)
                text("MOUSE: CAMERA",20,20)
                text("X: RESTART",20,40)
                text("MOUSEBUTTON: SHOOT",20,60)
                push()
                    textAlign(RIGHT)
                    text("COLLECT ALL TATTOOS",width-20, 20)
                    text("TO WIN",width-20, 40)
                pop()
            pop()

        pop()
        
        // add the world texture

        push()
    
            texture(worldTexture)
            sphere(250)
        
    
        pop()

        startTime = millis()/1000

    } else {

            
              /***
      
                Camera Settings 
                
            ***/
        
          // set the camera to follow the syring and be able to follow it
          let camDist = 300
          cam.x = syringeShip.getPosition().x-500*cos(map(newMouseX,0,windowWidth,-4*PI,4*PI,true))*cos(map(newMouseY,0,windowHeight,-PI/2,PI/2,true))
          cam.z = syringeShip.getPosition().z-500*sin(map(newMouseX,0,windowWidth,-4*PI,4*PI,true))*cos(map(newMouseY,0,windowHeight,-PI/2,PI/2,true))
          cam.y = (syringeShip.getPosition().y)-500*sin(map(newMouseY,0,windowHeight,-PI/2,PI/2,true))
          cam.CenterX = syringeShip.getPosition().x
          cam.CenterY = syringeShip.getPosition().y
          cam.CenterZ = syringeShip.getPosition().z
          cam.upX = 0
          cam.upY = 1
          cam.upZ = 0
    
    //update the camera  
    camera(cam.x, cam.y,cam.z,cam.CenterX,cam.CenterY,cam.CenterZ,cam.upX,cam.upY,cam.upZ);
    
    // set time

    
  

   gl.enable(gl.DEPTH_TEST);
   perspective()
    
  // run checks
  checkCollisionTattoos(tattooArray,bulletArray,syringeShip)
  checkFound(tattooArray)  
  checkOutofBounds(bulletArray,syringeShip)
  /***
    
    Setup the Controls

  ***/

    


    drawTattoos(tattooArray)

     /***
    
       Add the syring object
    
    ***/
    
    
        push()
            // update ships position
            //updateShip(syringeShip);
            
            // translate so it is lower on the screen
            translate(0,150,0)
            // translate so the ship is in the center
            translate(syringeShip.getPosition())

            // rotate to the correct orrientation
            rotateZ(PI/2)
            rotateY(-PI/2)
    
            // rotate 
            
     
            if(!isPaused){
                rotateZ(map(newMouseX,0,windowWidth,-4*PI,4*PI,true))
                ShiptempZ = structuredClone(map(newMouseX,0,windowWidth,-4*PI,4*PI,true))
                rotateX(map(newMouseY,0,windowHeight,-PI/2,PI/2,true))
                ShiptempX = structuredClone(map(newMouseY,0,windowHeight,-PI/2,PI/2,true))
            }  else{

                rotateZ(ShiptempZ);
                rotateX(ShiptempX);

            }      
            if(!checkFound(tattooArray)){

                if(keyIsDown(65)){
                    tilt -= 0.05
                    tilt = constrain(tilt,-PI/4,0)
                    rotateY(tilt)
                } else if(keyIsDown(68)){
                    tilt += 0.05
                    tilt = constrain(tilt,0,PI/4)
                    rotateY(tilt)
                }



            }
           
    

            // scale to the correct size
            scale(30)
            texture(syringeText)
            model(syringe)


        pop()
    
    /***
    
        Add particle system
    
    ***/
    
    if(!checkFound(tattooArray)){
        updateParticles(particles,syringeShip)
    }
   
    
    
    drawParticles(particles)
   
   /***
   
        Adding bullet firing Mechanic, bound the amount of bullets by the array length
   
   ***/
   

  updateBullets(bulletArray)  
  drawBullets(bulletArray)
 
    
   /***
   
        Drawing The World
   
   ***/
    push()
    
        
    texture(worldTexture)
        
    
 
    // set the world size to 3000
    sphere(3000)
     pop()
    // create overlay
    
     // disable depth and set view to orthographic  
      gl.disable(gl.DEPTH_TEST);
      ortho()
      
        push()
          textSize(30);
          translate(syringeShip.position)
          

    
          rotateY(-PI/2)
          
      
            rotateY(map(newMouseX,0,windowWidth,4*PI,-4*PI,true)) // rotate the text so that it stays 
           
            rotateX(map(newMouseY,0,windowHeight,-PI/2,PI/2,true))  
            

            push()
    
            translate(width/2-100,height/2-85,0)
         
            rotateX(PI)
            rotateZ(PI)
            scale(20)
            if(!(tattooDisplay == undefined)){
               texture(tattooDisplay)
            } 
            plane(4,4)
          pop()

         push()
         translate(-width/2,-height/2)
          image(overlay,0,0)
        pop()
        if(checkFound(tattooArray)){
        push()
        translate(0,20)
            textAlign(CENTER);
            texture(arcode);
            stroke(0)
            strokeWeight(3)

            let shipX = rotateAround(createVector(10,0,0), createVector(0,0,10),map(newMouseY,0,windowHeight,-PI/2,PI/2,true))
    let shipV = rotateAround(shipX,createVector(0,-1,0),map(newMouseX,0,windowWidth,-4*PI,4*PI,true))

    shipV.mult(-10);

    pointLight(255,255,255,p5.Vector.add(syringeShip.getPosition(),shipV))

            textSize(15)
            text("All Tattoos Discovered",0,-165);
            text("Scan QR Code for Reward",0,-150);
            pointLight(0,20,20)
            plane(150,150);
            push()
            rotateY(PI/2)
            scale(100)
            model(frame)
            pop()
            text("Or press X to restart",0,200)
          pop()
        } 
        
        if(!checkFound(tattooArray)){ 
            newMouseX = winMouseX;
            newMouseY = winMouseY;
            controls()
            gameTime = round(millis()/1000 - startTime);

        }

        // set the clock 
         push()
             textAlign(CENTER);
             textSize(15);
             text("Time... "+gameTime.toString(),15,-height/2+30)
         pop()
    
         // set the ui for checking found tattoos
        push()
            text("Found..." + foundCount + "/"+tattooArray.length,width/2-200, height/2-10)
        pop()
    
         if(!isReload){
            // Figure out how to track bullets fired
            textSize(15)
            text("Bullets Left:",-width/2+80, height/2-10)
            text((20-bulletCount)+"/20",-width/2+180, height/2-10)
              
          } else {
              
            text("Press R to Reload",-width/2+20, height/2-10)
             
          }
          
          // Draw spinning bullet for the HUD
          
         push()
             
            gl.enable(gl.DEPTH_TEST);
            translate(-width/2+170,height/2-75,0)
            rotateY(millis()/500)
            rotateX(PI)
            scale(15)
            colorMode(HSB)
            let tempCol = color(map(bulletCount,20,0,0,120),100,30)
            emissiveMaterial(tempCol,1)
            texture(bulltext)
            model(bullet)
            
          pop()
         
          //Add last collected Tattoo
          push()
            gl.enable(gl.DEPTH_TEST);
            translate(width/2-100,height/2-85,0)
         
            rotateX(PI)
            rotateZ(PI)
            scale(20)
            if(!(tattooDisplay == undefined)){
               push()
                textSize(0.6)
                rotateY(PI)
                textAlign(CENTER)
                text(tattooDisplayDesc, 0,-2.8);
               pop()
            } 
          pop()
        

      pop()



    if(keyIsDown(88)){

        restart()

    }
    
    prevMouseX = structuredClone(newMouseX);
    prevMouseY = structuredClone(newMouseY);

    tempcam = structuredClone(cam)

    }

}

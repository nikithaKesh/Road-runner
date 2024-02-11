var runStart = 0;
function keyCheck(event){

    if(event.which==13){
        if(runWorkerId==0){
            if(jumpWorkerId==0){
            createBlockId = setInterval(createCone,100);
            moveConeId = setInterval(moveCone,100);
            createEagleId = setInterval(createEagle,100);
            moveEagleId = setInterval(moveEagle,100);
            runWorkerId = setInterval(run,100);
            runStart = 1;
            runSound.play();
            backgroundSound.play();
            backgroundWorkerId = setInterval(moveBackground,100);
            scoreWorkerId = setInterval(updateScore,500);
            }
        }
    }

    if(event.which == 32){
        if(runStart==1){
            if(jumpWorkerId==0){
                clearInterval(runWorkerId);
                runSound.pause();
                jumpWorkerId=setInterval(jump,100);
                jumpSound.play();
            }
        }
    }
}

//Run Function
var runSound = new Audio("run.mp3");
var backgroundSound = new Audio("desert.mp3");
backgroundSound.loop = true;
runSound.loop = true;
var runImageNumber = 1;
var runWorkerId = 0;
var boy = document.getElementById("boy");
function run(){

    runImageNumber++;

    if(runImageNumber==9){
        runImageNumber=1;
    }
    boy.src="Desert Biome/Alex/Run ("+runImageNumber+").png";
}


//jump function
var jumpImageNumber = 1;
var jumpWorkerId=0;
var boyMarginTop = 505;
var jumpSound = new Audio("jump.mp3")
function jump(){
    
    jumpImageNumber++;

    if(jumpImageNumber<=6){
        boyMarginTop = boyMarginTop - 50;
        boy.style.marginTop = boyMarginTop+"px";
    }

    if(jumpImageNumber>=7){
        boyMarginTop = boyMarginTop + 50;
        boy.style.marginTop = boyMarginTop+"px";
    }

    if(jumpImageNumber==11){
        jumpImageNumber=1;
        clearInterval(jumpWorkerId);
        jumpWorkerId = 0;
        runWorkerId = setInterval(run,100);
        runSound.play();
    }
    boy.src="Desert Biome/Alex/Jump ("+jumpImageNumber+").png";
}

var deadSound = new Audio("dead.mp3")
//Dead function
var deadWorkerId = 0;
var deadImageNumber = 1;
function dead(){

    deadImageNumber++;

        if(deadImageNumber==11){
            deadImageNumber=10;
            clearInterval(deadWorkerId);
            deadWorkerId=0;

            boy.style.marginTop= "505px";
            document.getElementById("gameOver").style.visibility="visible";
            document.getElementById("endScore").innerHTML = newScore;
        }
        boy.src="Desert Biome/Alex/Dead ("+deadImageNumber+").png";
}


//Background Move Function
var background = document.getElementById("bg");
var backgroundX = 0;
var backgroundWorkerId = 0;
function moveBackground(){

    backgroundX = backgroundX -20;
    background.style.backgroundPositionX = backgroundX + "px";
}

//Create Cactus Function
var coneMarginLeft = 600;
var coneId = 1;
var createConeId = 0;
function createCone(){

    var cone = document.createElement("div");
    cone.className = "cactus";

    cone.id = "cone" + coneId;
    coneId++;

    var gap = Math.random() * (1000-400) + 400;
    coneMarginLeft = coneMarginLeft + gap;

    cone.style.marginLeft = coneMarginLeft + "px";
    document.getElementById("bg").appendChild(cone);
}

//Move Cone Funciton
var moveConeId = 0;
function moveCone(){

    for(var i = 1; i <= coneId; i++){
        var currentCone = document.getElementById("cone" + i);
        var currentMarginLeft = currentCone.style.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 20;
        currentCone.style.marginLeft = newMarginLeft + "px";
        if(newMarginLeft<=130){     // 128 - 48
            if(newMarginLeft>=40){
                if(boyMarginTop<=550){
                    if(boyMarginTop>=450){
                        clearInterval(runWorkerId);
                        runSound.pause();
                        backgroundSound.pause();
                        clearInterval(jumpWorkerId);
                        jumpWorkerId = -1;
                        clearInterval(moveConeId);
                        clearInterval(createConeId);
                        clearInterval(createEagleId);
                        clearInterval(moveEagleId);
                        clearInterval(backgroundWorkerId);
                        clearInterval(scoreWorkerId);

                        deadWorkerId = setInterval(dead,100);
                        deadSound.play();
                        }
                    }
                }
            }
        }
    }




//Create Eagle Function
var eagleMarginLeft = 600;
var eagleId = 1;
var createEagleId = 0;
function createEagle(){

    var eagle = document.createElement("div");
    eagle.className = "eagle";

    eagle.id = "eagle" + eagleId;
    eagleId++;

    var gapFly = Math.random() * (1000-800) + 800;
    eagleMarginLeft = eagleMarginLeft + gapFly;

    eagle.style.marginLeft = eagleMarginLeft + "px";
    document.getElementById("bg").appendChild(eagle);
}

//Move Eagle Funciton
var moveEagleId = 0;
function moveEagle(){

    for(var i = 1; i <= eagleId; i++){
        var currentEagle = document.getElementById("eagle" + i);
        var currentMarginLefts = currentEagle.style.marginLeft;
        var newMarginLefts = parseInt(currentMarginLefts) - 20;
        currentEagle.style.marginLeft = newMarginLefts + "px";
    }
}

    //Function Restart
function re(){
    location.reload();
}

//Score Update

var winSound = new Audio("winSound.mp3")
var score = document.getElementById("score");
var newScore = 0;
var scoreWorkerId = 0;
function updateScore(){

    newScore = newScore + 1;
    score.innerHTML = newScore;  

    if(newScore==100){
        clearInterval(runWorkerId);
        runSound.pause();
        backgroundSound.pause();
        clearInterval(jumpWorkerId);
        jumpWorkerId = -1;
        clearInterval(moveConeId);
        clearInterval(createConeId);
        clearInterval(backgroundWorkerId);
        clearInterval(scoreWorkerId);
        clearInterval(createEagleId);
        clearInterval(moveEagleId);
        winSound.play();

        document.getElementById("gameWon").style.visibility="visible";
        document.getElementById("winScore").innerHTML = newScore;

    }

}
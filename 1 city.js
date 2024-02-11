var runStart = 0;
function keyCheck(event){

    if(event.which==13){
        if(runWorkerId==0){
            if(jumpWorkerId==0){
            createBlockId = setInterval(createCone,100);
            moveConeId = setInterval(moveCone,100);
            runWorkerId = setInterval(run,100);
            runStart = 1;
            runSound.play();
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
runSound.loop = true;
var runImageNumber = 1;
var runWorkerId = 0;
var boy = document.getElementById("boy");
function run(){

    runImageNumber++;

    if(runImageNumber==16){
        runImageNumber=1;
    }
    boy.src="City Biome/LEO/Run ("+runImageNumber+").png";
}

//jump function
var jumpImageNumber = 1;
var jumpWorkerId=0;
var boyMarginTop = 560;
var jumpSound = new Audio("jump.mp3")
function jump(){
    
    jumpImageNumber++;

    if(jumpImageNumber<=9){
        boyMarginTop = boyMarginTop - 20;
        boy.style.marginTop = boyMarginTop+"px";
    }

    if(jumpImageNumber>=9){
        boyMarginTop = boyMarginTop + 20;
        boy.style.marginTop = boyMarginTop+"px";
    }

    if(jumpImageNumber==16){
        jumpImageNumber=1;
        clearInterval(jumpWorkerId);
        jumpWorkerId = 0;
        runWorkerId = setInterval(run,100);
        runSound.play();
    }
    boy.src="City Biome/LEO/Jump ("+jumpImageNumber+").png";
}

var deadSound = new Audio("dead.mp3")
//Dead function
var deadWorkerId = 0;
var deadImageNumber = 1;
function dead(){

    deadImageNumber++;

        if(deadImageNumber==16){
            deadImageNumber=15;
            clearInterval(deadWorkerId);
            deadWorkerId=0;

            boy.style.marginTop= "560px";
            document.getElementById("gameOver").style.visibility="visible";
            document.getElementById("endScore").innerHTML = newScore;
        }
        boy.src="City Biome/LEO/Dead ("+deadImageNumber+").png";
}


//Background Move Function
var background = document.getElementById("bg");
var backgroundX = 0;
var backgroundWorkerId = 0;
function moveBackground(){

    backgroundX = backgroundX -20;
    background.style.backgroundPositionX = backgroundX + "px";
}

//Create Cone Function
var coneMarginLeft = 600;
var coneId = 1;
var createConeId = 0;
function createCone(){

    var cone = document.createElement("div");
    cone.className = "cone";

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
        if(newMarginLeft<=128){     // 128 - 48
            if(newMarginLeft>=48){
                if(boyMarginTop<=560){
                    if(boyMarginTop>=510){
                        clearInterval(runWorkerId);
                        runSound.pause();
                        clearInterval(jumpWorkerId);
                        jumpWorkerId = -1;
                        clearInterval(moveConeId);
                        clearInterval(createConeId);
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
        clearInterval(jumpWorkerId);
        jumpWorkerId = -1;
        clearInterval(moveConeId);
        clearInterval(createConeId);
        clearInterval(backgroundWorkerId);
        clearInterval(scoreWorkerId);
        winSound.play();

        document.getElementById("gameWon").style.visibility="visible";
        document.getElementById("winScore").innerHTML = newScore;

    }

}
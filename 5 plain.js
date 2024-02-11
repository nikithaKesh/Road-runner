var runStart = 0;
function keyCheck(event) {

    if(event.which==13) {
        if(runWorkerId==0){
            if(jumpWorkerId==0){
            createBlockId = setInterval(createBlock,100);
            moveBlockId = setInterval(moveBlocks,100);
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


//Create Blocks
var blockMarginLeft = 600;
var blockId = 1;
var createBlockId = 0;
function createBlock(){
    
    var block = document.createElement("div"); //<div></>
    block.className = "block";   //<div class="block"></>

    block.id = "block" + blockId;
    blockId++; //blockId = blockId + 1;

    var gap = Math.random() * (1000-400) + 400;
    blockMarginLeft= blockMarginLeft + gap;

    block.style.marginLeft = blockMarginLeft + "px";
    document.getElementById("bg").appendChild(block);
}

//Move Blocks

var moveBlockId = 0;
function moveBlocks(){
    for (var i = 1; i <= blockId; i++) {
        var currentBlock = document.getElementById("block"+i);
        var currentMarginLeft = currentBlock.style.marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft)-20;
        currentBlock.style.marginLeft = newMarginLeft+"px";
        if(newMarginLeft<=128){     // 128 - 48
            if(newMarginLeft>=48){
                if(boyMarginTop<=370){
                    if(boyMarginTop>=320){
                        clearInterval(runWorkerId);
                        runSound.pause();
                        backgroundSound.pause();
                        clearInterval(jumpWorkerId);
                        jumpWorkerId = -1;
                        clearInterval(backgroundWorkerId);
                        clearInterval(scoreWorkerId);
                        clearInterval(moveBlockId);
                        clearInterval(createBlockId);

                        deadWokerId = setInterval(dead,100);
                        deadSound.play();
                        }
                    }
                }
            }
        }
    }

var runSound = new Audio("grass1.mp3");
var backgroundSound = new Audio("wind.mp3")
backgroundSound.loop = true;
runSound.loop = true;
//Run function
var boy = document.getElementById("boy");
var runImageNumber = 1;
var runWorkerId=0;
function run(){

    runImageNumber++;

    if(runImageNumber==9){
        runImageNumber=1;
    }
        boy.src="Planies Biome/Red Hat Boy/Run ("+runImageNumber+").png";
}

var jumpSound = new Audio("jump.mp3")
//jump function

var jumpImageNumber = 1;
var jumpWorkerId=0;
var boyMarginTop = 370;
function jump(){
    
    jumpImageNumber++;

    if(jumpImageNumber<=7){
        boyMarginTop = boyMarginTop - 20;
        boy.style.marginTop = boyMarginTop+"px";
    }

    if(jumpImageNumber>=8){
        boyMarginTop = boyMarginTop + 20;
        boy.style.marginTop = boyMarginTop+"px";
    }

    if(jumpImageNumber==13){
        jumpImageNumber=1;
        clearInterval(jumpWorkerId);
        jumpWorkerId=0;
        runWorkerId = setInterval(run,100);
        runSound.play();
    }
    boy.src="Planies Biome/Red Hat Boy/Jump ("+jumpImageNumber+").png";


}

//background Move

var background = document.getElementById("bg");
var backgroundX = 0;
var backgroundWorkerId = 0;
function moveBackground(){

    backgroundX = backgroundX-20;
    background.style.backgroundPositionX = backgroundX+"px";
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
        clearInterval(backgroundWorkerId);
        clearInterval(scoreWorkerId);
        clearInterval(moveBlockId);
        clearInterval(createBlockId);
        winSound.play();

        document.getElementById("gameWon").style.visibility="visible";
        document.getElementById("winScore").innerHTML = newScore;

    }
}

var deadSound = new Audio("dead.mp3")
//Dead function
var deadWokerId = 0;
var deadImageNumber = 1;
function dead(){

    deadImageNumber++;

        if(deadImageNumber==11){
            deadImageNumber=10;
            clearInterval(deadWokerId);
            deadWokerId=0;

            boy.style.marginTop= "370px";
            document.getElementById("gameOver").style.visibility="visible";
            document.getElementById("endScore").innerHTML = newScore;
        }
        boy.src="Planies Biome/Red Hat Boy/Dead ("+deadImageNumber+").png";
}

//Function Restart
function re(){
    location.reload();
}


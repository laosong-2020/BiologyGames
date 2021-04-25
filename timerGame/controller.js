var usedQuestions = []; //use to store the questions that is already used

function startGame() {
    myGamePiece = new component(30, 30, "red", 80, 75);
    myGameArea.start();
    setUpBtnListeners();
    getRandomQuestion();   
}
function getRandomQuestion() {
    var size = data.length;
    var randomIndex = Math.floor(Math.random() * size );
    jsonItem = jsonImport[randomIndex];
    usedQuestions.push(randomIndex);
    while(usedQuestions.includes(randomIndex)){ //find another random index
        randomIndex = Math.floor(Math.random() * size );
    }
    document.getElementById('question').innerHTML = getJsonQuestion(jsonItem);
    document.getElementById('A').innerHTML = getJsonChoice(jsonItem, 0);
    document.getElementById('B').innerHTML = getJsonChoice(jsonItem, 1);
    document.getElementById('C').innerHTML = getJsonChoice(jsonItem, 2);
    document.getElementById('D').innerHTML = getJsonChoice(jsonItem, 3);
}
function setUpBtnListeners(){
    var anschoices =  $(".options");
    btnlistener(anschoices);
}
function btnlistener(choices){
    for (i = 0;i<choices.length;i++){
        choices[i].addEventListener("click",function() {
            console.log("you selected " + this.id);
            var answer = getJsonAnswer(jsonItem);
            if(this.innerText == answer) { //显示下一个游戏
                alert("Correct!");
                resetGameArea();
                getRandomQuestion();
            } else { //结束游戏?
                alert("Wrong!");
            }
        })
    }
}


var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);        
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y; 
    this.yOrigin=y;
    this.xOrigin=x;   
    this.speedX = 0;
    this.speedY = 0;    
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    this.timeup = false;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }


    //计时器 到底会提醒
    this.timer = function(){
        if(this.y >= 240&&this.timeup===false){
            alert("timeup")
            this.timeup=true;
        }
    }

    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
        this.timer();
    }
    this.resetPos=function(){
        this.y=this.yOrigin;
        this.gravitySpeed=0;
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
        }
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}
function resetGameArea(){
    myGameArea.clear();
    myGamePiece.resetPos();
    myGamePiece.update();
}
function getJsonQuestion(jsonObj) {
    var question = jsonObj.question;
    return "Q: " + question;
}

function getJsonAnswer(jsonObj) {
    var answer = jsonObj.answer;
    return answer;
}
function getJsonChoice(jsonObj, index) {
    var choice = jsonObj.choices[index];
    return choice;
}



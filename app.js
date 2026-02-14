let highScore = localStorage.getItem("highScore") || 0;
let userSq = [];
let gameSq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector(".h2txt");
let scoreDisplay = document.querySelector(".score");

scoreDisplay.innerText = `High Score: ${highScore}`;
let boxes = document.querySelectorAll(".box");

// Start Game
document.addEventListener("keypress", function(){
    if(!started){
        started = true;
        levelUp();
    }
});

// Flash Animation
function btnFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 400);
}

// Level Up Logic
function levelUp(){
    userSq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    gameSq.push(randomColor);

    let randomBtn = document.querySelector(`#${randomColor}`);
    btnFlash(randomBtn);
}

// Button Click
boxes.forEach(function(box){
    box.addEventListener("click", function(){
        let userColor = box.getAttribute("id");
        userSq.push(userColor);

        btnFlash(box);
        checkAnswer(userSq.length - 1);
    });
});

// Check Answer
function checkAnswer(idx){
    if(userSq[idx] === gameSq[idx]){
        if(userSq.length === gameSq.length){
            setTimeout(levelUp, 1000);
        }
    } else {
         if(level - 1 > highScore){
        highScore = level - 1;
        localStorage.setItem("highScore", highScore);
        scoreDisplay.innerText = `High Score: ${highScore}`;
    }

    h2.innerText = `Game Over! Your score is ${level - 1}. Press any key to restart.`;
    resetGame();
    }
}

// Reset Game
function resetGame(){
    started = false;
    level = 0;
    gameSq = [];
    userSq = [];
}

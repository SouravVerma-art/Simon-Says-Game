// let userSq = [];
// let gameSq = [];
// let btns = ["yellow", "red", "purple", "green"];

// let started = false;
// let level = 0;
// let highScore = parseInt(localStorage.getItem("simonHighScore"), 10) || 0;

// let h2 = document.querySelector(".h2txt");
// let boxes = document.querySelectorAll(".box");
// let highScoreEl = document.getElementById("highScoreValue");

// function updateHighScoreDisplay() {
//     highScoreEl.textContent = highScore;
// }
// updateHighScoreDisplay();

// // Start Game
// document.addEventListener("keypress", function(){
//     if(!started){
//         started = true;
//         levelUp();
//     }
// });

// // Flash Animation
// function btnFlash(btn){
//     btn.classList.add("flash");
//     setTimeout(function(){
//         btn.classList.remove("flash");
//     }, 400);
// }

// // Level Up Logic
// function levelUp(){
//     userSq = [];
//     level++;
//     h2.innerText = `Level ${level}`;

//     if (level > highScore) {
//         highScore = level;
//         localStorage.setItem("simonHighScore", highScore);
//         updateHighScoreDisplay();
//     }

//     let randomIdx = Math.floor(Math.random() * 4);
//     let randomColor = btns[randomIdx];
//     gameSq.push(randomColor);

//     let randomBtn = document.querySelector(`#${randomColor}`);
//     btnFlash(randomBtn);
// }

// // Button Click
// boxes.forEach(function(box){
//     box.addEventListener("click", function(){
//         let userColor = box.getAttribute("id");
//         userSq.push(userColor);

//         btnFlash(box);
//         checkAnswer(userSq.length - 1);
//     });
// });

// // Check Answer
// function checkAnswer(idx){
//     if(userSq[idx] === gameSq[idx]){
//         if(userSq.length === gameSq.length){
//             setTimeout(levelUp, 1000);
//         }
//     } else {
//         h2.innerText = `Game Over! Your score is ${level - 1 }. Press any key to restart.`;
//         resetGame();
//     }
// }

// // Reset Game
// function resetGame(){
//     started = false;
//     level = 0;
//     gameSq = [];
//     userSq = [];
// }





let userSq = [];
let gameSq = [];
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector(".h2txt");
let boxes = document.querySelectorAll(".box");

// ===== HIGH SCORE =====
let highScore = localStorage.getItem("highScore") || 0;
let highScoreValue = document.querySelector("#highScoreValue");
highScoreValue.innerText = highScore;

// ===== START GAME =====
document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        levelUp();
    }
});

// ===== FLASH ANIMATION =====
function btnFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 400);
}

// ===== PLAY FULL SEQUENCE =====
function playSequence() {
    gameSq.forEach((color, index) => {
        setTimeout(() => {
            let btn = document.querySelector(`#${color}`);
            btnFlash(btn);
        }, 600 * index);
    });
}

// ===== LEVEL UP =====
function levelUp() {
    userSq = []; // reset user input for new level
    level++;
    h2.innerText = `Level ${level}`;

    // Add random color
    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    gameSq.push(randomColor);

    // Disable clicks during playback
    disableButtons();

    // Play full sequence
    setTimeout(() => {
        playSequence();

        // Enable buttons after playback finishes
        setTimeout(() => {
            enableButtons();
        }, 600 * gameSq.length);
    }, 500);
}

// ===== BUTTON CLICK =====
boxes.forEach(function (box) {
    box.addEventListener("click", function () {
        if (!started) return;

        let userColor = box.getAttribute("id");
        userSq.push(userColor);

        btnFlash(box);
        checkAnswer(userSq.length - 1);
    });
});

// ===== CHECK ANSWER =====
function checkAnswer(idx) {
    if (userSq[idx] === gameSq[idx]) {
        if (userSq.length === gameSq.length) {
            disableButtons();
            setTimeout(levelUp, 1000);
        }
    } else {
        gameOver();
    }
}

// ===== GAME OVER =====
function gameOver() {
    let finalScore = level - 1;

    // Update high score
    if (finalScore > highScore) {
        highScore = finalScore;
        localStorage.setItem("highScore", highScore);
        highScoreValue.innerText = highScore;
    }

    h2.innerText = `Game Over! Your score is ${finalScore}. Press any key to restart.`;
    resetGame();
}

// ===== RESET GAME =====
function resetGame() {
    started = false;
    level = 0;
    gameSq = [];
    userSq = [];
    enableButtons();
}

// ===== HELPER FUNCTIONS =====
function disableButtons() {
    boxes.forEach(box => box.style.pointerEvents = "none");
}

function enableButtons() {
    boxes.forEach(box => box.style.pointerEvents = "auto");
}
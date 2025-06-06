let userSeq = [];
let gameSeq = [];

let started = false;
let level = 0;
let HighScore = 0;
let btns = ["green", "red", "yellow", "purple"];

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game Started");
        started = true;
        levelup(); // Only called when the game starts
    }
});
document.addEventListener("touchstart", startGame); 

function startGame() {
    if (!started) {
        console.log("Game Started");
        started = true;
        levelup();
    }
}

function gameflash(button) {
    button.classList.remove("flash");
    void button.offsetWidth;
    button.classList.add("flash");
    setTimeout(function () {
        button.classList.remove("flash");
    }, 400);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 300);
}

function levelup() {
    userSeq = [];
    level++;
    h2.innerHTML = `Level ${level} <br> Highest Score ${HighScore}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameflash(randBtn);
}
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelup, 600);
        }
    }
    else {
        if (level > HighScore) {
            HighScore = level;
        }
        h2.innerHTML = `Game Over! Your Score was <b>${level}</b> <br> Highest Score ${HighScore} <br> Press any key to restart`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150)

        reset();
    }
}


function btnpress() {
    let btn = this;
    userflash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
allBtns.forEach(function (button) {
    button.addEventListener("click", btnpress);
});

function reset() {
    gameSeq = [];
    userSeq = [];
    level = 0;
    started = false;
}
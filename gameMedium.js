const cardsColor = [
    "red",
    "red",
    "green",
    "green",
    "blue",
    "blue",
    "brown",
    "brown",
    "yellow",
    "yellow",
    "gray",
    "gray",
    "cadetblue",
    "cadetblue",
    "violet",
    "violet",
    "lightgreen",
    "lightgreen",
];

const boardGame = document.getElementById("game");
const startGame = document.getElementById("startGame");
const score = document.getElementById("score");
const reset = document.getElementById("reset");
let cards = document.querySelectorAll(".square");
let ayr = document.querySelector(".ayr");
cards = [...cards];
let activeCard = "";
let startTime;
const activeCards = [];
const gamePairs = cards.length / 2;
let gameResult = 0;
let timer;
let timerGame = document.getElementById("timerGame");

reset.addEventListener("click", () => {
    location.reload();
});

startGame.addEventListener("click", () => {
    textWhenStartBtn();
    setTimeout(function () {
        ayr.innerHTML = `Are`;
    }, 600);
    setTimeout(function () {
        ayr.innerHTML = `You`;
    }, 1200);
    setTimeout(function () {
        ayr.innerHTML = `Ready?`;
    }, 1800);
    setTimeout(function () {
        ayr.innerHTML = ``;
    }, 2400);
    setTimeout(function () {
        cards.forEach((card) => {
            card.classList.remove("off");
            card.classList.remove("hidden");
        });
        startBtn();
    }, 2500);
});
function timerG() {
    let minute = 0;
    let sec = 0;
    timer = setInterval(() => {
        sec++;
        timerGame.innerHTML = "0" + minute + ":" + "0" + sec;
        if (sec > 9) {
            timerGame.innerHTML = "0" + minute + ":" + sec;
        } else if (minute > 9 && sec < 9) {
            timerGame.innerHTML = minute + ":" + "0" + sec;
        } else if (minute && sec > 9) {
            timerGame.innerHTML = minute + ":" + sec;
        }
        if (sec === 59) {
            sec = 0;
            minute++;
        }
        if(sec === 26){
            timerGame.classList.add('timeTop')
        }
        if (sec === 30) {
            ayr.innerHTML = `Times Up!`;
            setTimeout(function () {
                alert(`You Lose!`);
                location.reload();
            }, 500);
        }
    }, 1000);
}

function textWhenStartBtn() {
    cards.forEach((card) => {
        card.classList.add("hidden");
    });
}

function clickCard() {
    activeCard = this;
    activeCard.classList.add("flipCard");
    activeCard.classList.remove("hidden");
    if (activeCard === activeCards[0]) return;
    if (activeCards.length === 0) {
        activeCards[0] = activeCard;
        return;
    } else {
        cards.forEach((card) => card.removeEventListener("click", clickCard));
        activeCards[1] = activeCard;
        setTimeout(function () {
            if (activeCards[0].className === activeCards[1].className) {
                activeCards.forEach((card) => {
                    card.classList.add("off");
                });
                gameResult++;
                score.innerHTML = gameResult;
                cards = cards.filter((card) => !card.classList.contains("off"));
                if (gameResult === gamePairs) {
                    const endTime = new Date().getTime();
                    let gameTime = (endTime - startTime) / 1000;
                    setTimeout(function () {
                        alert(`Win! your time is ${gameTime} second`);
                        location.reload();
                    }, 200);
                }
            } else {
                activeCards.forEach((card) => {
                    card.classList.add("hidden");
                    card.classList.remove("flipCard");
                });
            }
            activeCard = "";
            activeCards.length = 0;
            cards.forEach((card) => card.addEventListener("click", clickCard));
        }, 300);
    }
}

function startBtn() {
    setTimeout(function () {
        startTime = new Date().getTime();
        timerG();
        cards.forEach((card) => {
            card.classList.add("hidden");
            card.addEventListener("click", clickCard);
        });
    }, 3000);
}

const init = function () {
    cards.forEach((card) => {
        const position = Math.floor(Math.random() * cardsColor.length);
        card.classList.add(cardsColor[position]);
        cardsColor.splice(position, 1);
    });

    setTimeout(function () {
        cards.forEach((card) => {
            card.classList.add("off");
        });
    }, 1);
};

init();

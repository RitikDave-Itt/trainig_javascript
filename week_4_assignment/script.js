"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// ##########################################################################
// dynamic html Generate
// ##########################################################################
const levels = document.querySelector(".levels");
const level = document.querySelector(".level");
levels.removeChild(level);
function createLevels() {
    let baseMoney = 40000;
    for (let i = 1; i < 11; i++) {
        let newLevel = level.cloneNode(true);
        const amountElement = newLevel.querySelector(".amount");
        amountElement.textContent = (baseMoney).toString();
        amountElement.id = `l${i}`;
        baseMoney = baseMoney * 2;
        if (i == 5) {
            baseMoney -= 30000;
        }
        if (i == 9) {
            baseMoney = 70000000;
        }
        levels.insertBefore(newLevel, levels.firstChild);
    }
}
// #######################################################################
// logic
// #######################################################################
document.addEventListener('contextmenu', event => event.preventDefault());
const turnUpVolume = document.querySelector(".turn-up-volume");
let questions = null;
let currentAudio = null;
const soundEffects = [
    "suspence.mp3",
    "30secTimer.mp3",
    "intro1.mp3",
    "intro2.mp3",
    "optionSelected.mp3",
    "questionLoad.mp3",
    "wrongAnswer.mp3",
    "correctAnswer.mp3",
    "win.mp3",
];
const audioDirectory = "soundEffects/";
let audioFiles = {};
let turnUpVolumeAnimation;
document.addEventListener("DOMContentLoaded", () => __awaiter(void 0, void 0, void 0, function* () {
    turnUpVolumeAnimation = setInterval(() => {
        turnUpVolume.classList.toggle("hide");
    }, 500);
    try {
        yield loadAudioFiles();
    }
    catch (error) {
        console.error("Error loading audio files:", error);
    }
    playAudioWithPause("intro2.mp3");
    createLevels();
    const storedQuestions = window.localStorage.getItem("questions");
    if (!storedQuestions) {
        try {
            const response = yield fetch("questions.json");
            if (!response.ok) {
                throw new Error("unable to fetch questions.json");
            }
            questions = (yield response.json());
            window.localStorage.setItem("questions", JSON.stringify(questions));
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        questions = JSON.parse(storedQuestions);
    }
}));
const divFlipQuestion = document.getElementById("flip");
const questionBox = document.querySelector(".question-box");
const divFiftyFifty = document.getElementById("50-50");
let categoryButtons = document.querySelectorAll(".category");
const categoryContainer = document.querySelector(".category-container");
const start = document.querySelector(".start-game");
const displayBox = document.querySelector(".display-box");
const okButton = document.querySelector(".ok-button");
const blockMouseEvents = document.querySelector(".block-mouse-actions");
const questionText = document.querySelector(".question-text");
const timerDisplay = document.querySelector(".timer");
let selectedCategory;
categoryButtons.forEach((category) => {
    category.addEventListener("click", () => {
        var _a;
        categoryButtons.forEach((cat) => {
            cat.classList.remove("active-category");
        });
        selectedCategory = (_a = category.textContent) === null || _a === void 0 ? void 0 : _a.trim();
        category.classList.add("active-category");
    });
});
const options = document.querySelectorAll(".option");
let optionsArray = Array.from(options);
let categoryQuestions = [];
let levelQuestionsList = [];
let currentLevel = 1;
let selectedQuestion;
let amount = "40000";
let timerInterval;
let gameOver = false;
let gameon = false;
let usedFiftyFifty = false;
let usedFlip = false;
let rightOption;
let currentLevelDiv = null;
function filterLevelQuestions() {
    levelQuestionsList = categoryQuestions.filter((question) => question.level === currentLevel);
}
start.addEventListener("click", () => {
    clearInterval(turnUpVolumeAnimation);
    turnUpVolume.classList.add("hide");
    if (!selectedCategory) {
        return;
    }
    categoryQuestions = (questions || []).filter((question) => question.category === selectedCategory);
    categoryContainer.classList.add("hide");
    displayBox.classList.remove("hide");
    playAudioWithPause("intro2.mp3");
});
okButton.addEventListener("click", () => {
    currentLevelDiv = document.getElementById(`l${currentLevel}`);
    if (gameOver) {
        window.location.reload();
    }
    blockMouseEvents.classList.remove("hide");
    startFlickerAll();
    setTimeout(() => {
        stopFlickerAll();
        if (!usedFiftyFifty) {
            lifelineFiftyFifty();
            usedFiftyFifty = true;
        }
        if (!usedFlip) {
            lifelineFlipQuestion();
            usedFlip = true;
        }
        getCurrentLevelQuestion();
        insertQuestion();
        timerInterval = startTimer(30);
        blockMouseEvents.classList.add("hide");
        getRightOption();
        console.log(rightOption);
    }, 4 * 1000);
    currentLevelDiv === null || currentLevelDiv === void 0 ? void 0 : currentLevelDiv.classList.add("selected-option");
    displayBox.classList.add("hide");
    playAudioWithPause("questionLoad.mp3");
});
function getCurrentLevelQuestion() {
    gameon = true;
    filterLevelQuestions();
    const randomIndex = Math.floor(Math.random() * levelQuestionsList.length);
    selectedQuestion = levelQuestionsList[randomIndex];
}
function getRightOption() {
    optionsArray.forEach((option) => {
        var _a;
        const optionValue = (_a = option.querySelector(".option-value")) === null || _a === void 0 ? void 0 : _a.textContent;
        if (optionValue === (selectedQuestion === null || selectedQuestion === void 0 ? void 0 : selectedQuestion.answer)) {
            rightOption = option;
        }
    });
}
options.forEach((option) => {
    option.addEventListener("click", () => {
        playAudioWithPause("optionSelected.mp3");
        option.classList.add("flicker-option");
        blockMouseEvents.classList.remove("hide");
        stopTimer();
        setTimeout(() => {
            var _a;
            option.classList.remove("flicker-option");
            rightOption === null || rightOption === void 0 ? void 0 : rightOption.classList.add("correct-answer");
            const optionValue = (_a = option.querySelector(".option-value")) === null || _a === void 0 ? void 0 : _a.textContent;
            if (optionValue === (selectedQuestion === null || selectedQuestion === void 0 ? void 0 : selectedQuestion.answer)) {
                currentLevelDiv === null || currentLevelDiv === void 0 ? void 0 : currentLevelDiv.classList.remove("selected-option");
                currentLevelDiv === null || currentLevelDiv === void 0 ? void 0 : currentLevelDiv.classList.add("correct-answer");
                option.classList.add("correct-answer");
                setTimeout(() => {
                    correctAnswer();
                }, 1000);
            }
            else {
                currentLevelDiv === null || currentLevelDiv === void 0 ? void 0 : currentLevelDiv.classList.remove("selected-option");
                currentLevelDiv === null || currentLevelDiv === void 0 ? void 0 : currentLevelDiv.classList.add("wrong-answer");
                option.classList.add("wrong-answer");
                setTimeout(() => {
                    wrongAnswer();
                }, 1000);
            }
            if (currentLevel === 11) {
                gameOver = true;
            }
        }, 4000);
    });
});
function resetQuestionAndOptions() {
    optionsArray.forEach((option) => {
        option.classList.remove("correct-answer");
        option.classList.remove("wrong-answer");
        option.classList.remove("selected-option");
        blockMouseEvents.classList.add("hide");
        const optionValue = option.querySelector(".option-value");
        optionValue.textContent = "";
        option.classList.remove("hide");
    });
    questionText.textContent = "";
    timerDisplay.textContent = "00";
    gameon = false;
}
function insertQuestion() {
    questionText.textContent = (selectedQuestion === null || selectedQuestion === void 0 ? void 0 : selectedQuestion.question) || "";
    const a = document.getElementById("a");
    const b = document.getElementById("b");
    const c = document.getElementById("c");
    const d = document.getElementById("d");
    let elements = [a, b, c, d];
    const shuffledOptions = shuffleArray((selectedQuestion === null || selectedQuestion === void 0 ? void 0 : selectedQuestion.options.slice()) || []);
    const shuffledElements = shuffleArray(elements.slice());
    shuffledElements.forEach((element, index) => {
        if (element) {
            element.textContent = shuffledOptions[index];
        }
    });
}
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
function startTimer(duration) {
    playAudioWithPause("30secTimer.mp3");
    let timer = duration;
    timerInterval = setInterval(() => {
        const seconds = parseInt(timer.toString(), 10);
        timerDisplay.textContent = seconds.toString();
        if (timer < 10) {
            timerDisplay.classList.add("low-time");
        }
        if (--timer < 0) {
            clearInterval(timerInterval);
            timeOut();
        }
    }, 1000);
    return timerInterval;
}
function stopTimer() {
    clearInterval(timerInterval);
}
function correctAnswer() {
    var _a;
    playAudioWithPause("correctAnswer.mp3");
    displayBox.classList.remove("hide");
    displayBox.querySelector(".title").textContent = "CORRECT ANSWER !";
    displayBox.querySelector(".messege").textContent = `SCORE ${amount}`;
    displayBox.querySelector(".ok-button").textContent = "NEXT";
    //   console.log(document.getElementById(`l${currentLevel}`)?.textContent);
    currentLevel++;
    amount = (_a = document.getElementById(`l${currentLevel}`)) === null || _a === void 0 ? void 0 : _a.textContent;
    resetQuestionAndOptions();
    if (currentLevel == 11) {
        displayBox.querySelector(".title").textContent = "YOU WON !";
        displayBox.querySelector(".ok-button").textContent = "RESTART";
        playAudioWithoutPause("win.mp3");
        gameOver = true;
    }
}
function wrongAnswer() {
    playAudioWithPause("wrongAnswer.mp3");
    displayBox.classList.remove("hide");
    displayBox.querySelector(".title").textContent = "WRONG ANSWER !";
    displayBox.querySelector(".messege").textContent = `SCORE: ${amount}`;
    displayBox.querySelector(".ok-button").textContent = "RESTART";
    gameOver = true;
    resetQuestionAndOptions();
}
function timeOut() {
    playAudioWithPause("wrongAnswer.mp3");
    displayBox.classList.remove("hide");
    displayBox.querySelector(".title").textContent = "TIME OUT";
    displayBox.querySelector(".messege").textContent = `SCORE: ${amount}`;
    displayBox.querySelector(".ok-button").textContent = "Restart";
    gameOver = true;
}
// ########################################################################
// audio code
// ########################################################################
function loadAudioFiles() {
    return __awaiter(this, void 0, void 0, function* () {
        yield Promise.all(soundEffects.map((filename) => __awaiter(this, void 0, void 0, function* () {
            const audioPath = audioDirectory + filename;
            const storedAudio = localStorage.getItem(filename);
            if (storedAudio) {
                audioFiles[filename] = new Audio(storedAudio);
            }
            else {
                const response = yield fetch(audioPath);
                const blob = yield response.blob();
                const base64String = yield convertBlobToBase64(blob);
                const base64URL = `data:audio/mp3;base64,${base64String}`;
                audioFiles[filename] = new Audio(base64URL);
                localStorage.setItem(filename, base64URL);
            }
        })));
    });
}
function convertBlobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
function playAudioWithPause(filename) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    currentAudio = audioFiles[filename];
    currentAudio.play();
}
function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
}
function playAudioWithoutPause(filename) {
    const newAudio = audioFiles[filename];
    newAudio.play();
}
function lifelineFiftyFifty() {
    divFiftyFifty.addEventListener("click", () => {
        divFiftyFifty.classList.add("used-lifeline");
        playAudioWithoutPause("suspence.mp3");
        const wrongOptions = optionsArray.filter((option) => {
            var _a;
            const optionValue = (_a = option.querySelector(".option-value")) === null || _a === void 0 ? void 0 : _a.textContent;
            return optionValue !== (selectedQuestion === null || selectedQuestion === void 0 ? void 0 : selectedQuestion.answer);
        });
        let randomIndex = Math.floor(Math.random() * 3);
        wrongOptions[randomIndex].classList.add("hide");
        wrongOptions.splice(randomIndex, 1);
        randomIndex = Math.floor(Math.random() * 2);
        wrongOptions[randomIndex].classList.add("hide");
        wrongOptions.pop();
    });
}
function lifelineFlipQuestion() {
    divFlipQuestion.addEventListener("click", () => {
        divFlipQuestion.classList.add("used-lifeline");
        playAudioWithoutPause("suspence.mp3");
        resetQuestionAndOptions();
        let newQuestion;
        do {
            const randomIndex = Math.floor(Math.random() * levelQuestionsList.length);
            newQuestion = levelQuestionsList[randomIndex];
        } while (newQuestion === selectedQuestion && levelQuestionsList.length > 1);
        selectedQuestion = newQuestion;
        insertQuestion();
        getRightOption();
    });
}
function startFlickerAll() {
    optionsArray.forEach((option) => {
        option.classList.add("flicker-all");
    });
    questionText.classList.add("flicker-all");
    timerDisplay.classList.add("flicker-all");
}
function stopFlickerAll() {
    optionsArray.forEach((option) => {
        option.classList.remove("flicker-all");
    });
    questionText.classList.remove("flicker-all");
    timerDisplay.classList.remove("flicker-all");
}

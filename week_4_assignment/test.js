var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
// ##########################################################################
// dynamic html Generate
// ##########################################################################
var levels = document.querySelector(".levels");
var level = document.querySelector(".level");
levels.removeChild(level);
function createLevels() {
    var baseMoney = 10000;
    for (var i = 1; i < 11; i++) {
        var newLevel = level.cloneNode(true);
        var amountElement = newLevel.querySelector(".amount");
        amountElement.textContent = (baseMoney * i).toString();
        amountElement.id = "l".concat(i);
        levels.insertBefore(newLevel, levels.firstChild);
    }
}
// #######################################################################
// logic
// #######################################################################
document.addEventListener('contextmenu', function (event) { return event.preventDefault(); });
var turnUpVolume = document.querySelector(".turn-up-volume");
var questions = null;
var currentAudio = null;
var soundEffects = [
    "suspence.mp3",
    "30secTimer.mp3",
    "intro1.mp3",
    "intro2.mp3",
    "optionSelected.mp3",
    "questionLoad.mp3",
    "wrongAnswer.mp3",
    "correctAnswer.mp3",
];
var audioDirectory = "soundEffects/";
var audioFiles = {};
document.addEventListener("DOMContentLoaded", function () { return __awaiter(_this, void 0, void 0, function () {
    var error_1, storedQuestions, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                setTimeout(function () {
                    turnUpVolume.classList.add("hide");
                }, 2000);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, loadAudioFiles()];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error("Error loading audio files:", error_1);
                return [3 /*break*/, 4];
            case 4:
                playAudioWithPause("intro2.mp3");
                createLevels();
                storedQuestions = window.localStorage.getItem("questions");
                if (!!storedQuestions) return [3 /*break*/, 10];
                _a.label = 5;
            case 5:
                _a.trys.push([5, 8, , 9]);
                return [4 /*yield*/, fetch("questions.json")];
            case 6:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("unable to fetch questions.json");
                }
                return [4 /*yield*/, response.json()];
            case 7:
                questions = (_a.sent());
                window.localStorage.setItem("questions", JSON.stringify(questions));
                return [3 /*break*/, 9];
            case 8:
                error_2 = _a.sent();
                console.log(error_2);
                return [3 /*break*/, 9];
            case 9: return [3 /*break*/, 11];
            case 10:
                questions = JSON.parse(storedQuestions);
                _a.label = 11;
            case 11: return [2 /*return*/];
        }
    });
}); });
var divFlipQuestion = document.getElementById("flip");
var questionBox = document.querySelector(".question-box");
var divFiftyFifty = document.getElementById("50-50");
var categoryButtons = document.querySelectorAll(".category");
var categoryContainer = document.querySelector(".category-container");
var start = document.querySelector(".start-game");
var displayBox = document.querySelector(".display-box");
var okButton = document.querySelector(".ok-button");
var blockMouseEvents = document.querySelector(".block-mouse-actions");
var questionText = document.querySelector(".question-text");
var timerDisplay = document.querySelector(".timer");
var selectedCategory;
categoryButtons.forEach(function (category) {
    category.addEventListener("click", function () {
        var _a;
        categoryButtons.forEach(function (cat) {
            cat.classList.remove("active-category");
        });
        selectedCategory = (_a = category.textContent) === null || _a === void 0 ? void 0 : _a.trim();
        category.classList.add("active-category");
    });
});
var options = document.querySelectorAll(".option");
var optionsArray = Array.from(options);
var categoryQuestions = [];
var levelQuestionsList = [];
var currentLevel = 1;
var selectedQuestion;
var amount = 10000;
var timerInterval;
var gameOver = false;
var gameon = false;
var usedFiftyFifty = false;
var usedFlip = false;
var rightOption;
var currentLevelDiv = null;
function filterLevelQuestions() {
    levelQuestionsList = categoryQuestions.filter(function (question) { return question.level === currentLevel; });
}
start.addEventListener("click", function () {
    if (!selectedCategory) {
        return;
    }
    categoryQuestions = (questions || []).filter(function (question) { return question.category === selectedCategory; });
    categoryContainer.classList.add("hide");
    displayBox.classList.remove("hide");
    playAudioWithPause("intro2.mp3");
});
okButton.addEventListener("click", function () {
    currentLevelDiv = document.getElementById("l".concat(currentLevel));
    if (gameOver) {
        window.location.reload();
    }
    blockMouseEvents.classList.remove("hide");
    startFlickerAll();
    setTimeout(function () {
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
    var randomIndex = Math.floor(Math.random() * levelQuestionsList.length);
    selectedQuestion = levelQuestionsList[randomIndex];
}
function getRightOption() {
    optionsArray.forEach(function (option) {
        var _a;
        var optionValue = (_a = option.querySelector(".option-value")) === null || _a === void 0 ? void 0 : _a.textContent;
        if (optionValue === (selectedQuestion === null || selectedQuestion === void 0 ? void 0 : selectedQuestion.answer)) {
            rightOption = option;
        }
    });
}
options.forEach(function (option) {
    option.addEventListener("click", function () {
        playAudioWithPause("optionSelected.mp3");
        option.classList.add("flicker-option");
        blockMouseEvents.classList.remove("hide");
        stopTimer();
        setTimeout(function () {
            var _a;
            option.classList.remove("flicker-option");
            rightOption === null || rightOption === void 0 ? void 0 : rightOption.classList.add("correct-answer");
            var optionValue = (_a = option.querySelector(".option-value")) === null || _a === void 0 ? void 0 : _a.textContent;
            if (optionValue === (selectedQuestion === null || selectedQuestion === void 0 ? void 0 : selectedQuestion.answer)) {
                currentLevelDiv === null || currentLevelDiv === void 0 ? void 0 : currentLevelDiv.classList.remove("selected-option");
                currentLevelDiv === null || currentLevelDiv === void 0 ? void 0 : currentLevelDiv.classList.add("correct-answer");
                option.classList.add("correct-answer");
                setTimeout(function () {
                    correctAnswer();
                }, 1000);
            }
            else {
                currentLevelDiv === null || currentLevelDiv === void 0 ? void 0 : currentLevelDiv.classList.remove("selected-option");
                currentLevelDiv === null || currentLevelDiv === void 0 ? void 0 : currentLevelDiv.classList.add("wrong-answer");
                option.classList.add("wrong-answer");
                setTimeout(function () {
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
    optionsArray.forEach(function (option) {
        option.classList.remove("correct-answer");
        option.classList.remove("wrong-answer");
        option.classList.remove("selected-option");
        blockMouseEvents.classList.add("hide");
        var optionValue = option.querySelector(".option-value");
        optionValue.textContent = "";
        option.classList.remove("hide");
    });
    questionText.textContent = "";
    timerDisplay.textContent = "00";
    gameon = false;
}
function insertQuestion() {
    questionText.textContent = (selectedQuestion === null || selectedQuestion === void 0 ? void 0 : selectedQuestion.question) || "";
    var a = document.getElementById("a");
    var b = document.getElementById("b");
    var c = document.getElementById("c");
    var d = document.getElementById("d");
    var elements = [a, b, c, d];
    var shuffledOptions = shuffleArray((selectedQuestion === null || selectedQuestion === void 0 ? void 0 : selectedQuestion.options.slice()) || []);
    var shuffledElements = shuffleArray(elements.slice());
    shuffledElements.forEach(function (element, index) {
        if (element) {
            element.textContent = shuffledOptions[index];
        }
    });
}
function shuffleArray(arr) {
    var _a;
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        _a = [arr[j], arr[i]], arr[i] = _a[0], arr[j] = _a[1];
    }
    return arr;
}
function startTimer(duration) {
    playAudioWithPause("30secTimer.mp3");
    var timer = duration;
    timerInterval = setInterval(function () {
        var seconds = parseInt(timer.toString(), 10);
        timerDisplay.textContent = seconds.toString();
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
    playAudioWithPause("correctAnswer.mp3");
    displayBox.classList.remove("hide");
    displayBox.classList.add("correct-answer-div-shadow");
    displayBox.querySelector(".title").textContent = "CORRECT ANSWER !";
    displayBox.querySelector(".messege").textContent = "Score ".concat(amount);
    displayBox.querySelector(".ok-button").textContent = "Next Question";
    currentLevel++;
    amount += 10000;
    resetQuestionAndOptions();
}
function wrongAnswer() {
    playAudioWithPause("wrongAnswer.mp3");
    displayBox.classList.remove("hide");
    displayBox.classList.add("wrong-answer-div-shadow");
    displayBox.querySelector(".title").textContent = "WRONG ANSWER !";
    displayBox.querySelector(".messege").textContent = "Score ".concat(amount - 10000);
    displayBox.querySelector(".ok-button").textContent = "Restart Game";
    gameOver = true;
    resetQuestionAndOptions();
}
function timeOut() {
    playAudioWithPause("wrongAnswer.mp3");
    displayBox.classList.remove("hide");
    displayBox.classList.add("wrong-answer-div-shadow");
    displayBox.querySelector(".title").textContent = "TIME OUT";
    displayBox.querySelector(".messege").textContent = "Score ".concat(amount - 10000);
    displayBox.querySelector(".ok-button").textContent = "Restart Game";
    gameOver = true;
}
// ########################################################################
// audio code
// ########################################################################
function loadAudioFiles() {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, Promise.all(soundEffects.map(function (filename) { return __awaiter(_this, void 0, void 0, function () {
                        var audioPath, storedAudio, response, blob, base64String, base64URL;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    audioPath = audioDirectory + filename;
                                    storedAudio = localStorage.getItem(filename);
                                    if (!storedAudio) return [3 /*break*/, 1];
                                    audioFiles[filename] = new Audio(storedAudio);
                                    return [3 /*break*/, 5];
                                case 1: return [4 /*yield*/, fetch(audioPath)];
                                case 2:
                                    response = _a.sent();
                                    return [4 /*yield*/, response.blob()];
                                case 3:
                                    blob = _a.sent();
                                    return [4 /*yield*/, convertBlobToBase64(blob)];
                                case 4:
                                    base64String = _a.sent();
                                    base64URL = "data:audio/mp3;base64,".concat(base64String);
                                    audioFiles[filename] = new Audio(base64URL);
                                    localStorage.setItem(filename, base64URL);
                                    _a.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function convertBlobToBase64(blob) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onloadend = function () { return resolve(reader.result.split(",")[1]); };
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
    var newAudio = audioFiles[filename];
    newAudio.play();
}
function lifelineFiftyFifty() {
    divFiftyFifty.addEventListener("click", function () {
        divFiftyFifty.classList.add("used-lifeline");
        playAudioWithoutPause("suspence.mp3");
        var wrongOptions = optionsArray.filter(function (option) {
            var _a;
            var optionValue = (_a = option.querySelector(".option-value")) === null || _a === void 0 ? void 0 : _a.textContent;
            return optionValue !== (selectedQuestion === null || selectedQuestion === void 0 ? void 0 : selectedQuestion.answer);
        });
        var randomIndex = Math.floor(Math.random() * 3);
        wrongOptions[randomIndex].classList.add("hide");
        wrongOptions.splice(randomIndex, 1);
        randomIndex = Math.floor(Math.random() * 2);
        wrongOptions[randomIndex].classList.add("hide");
        wrongOptions.pop();
    });
}
function lifelineFlipQuestion() {
    divFlipQuestion.addEventListener("click", function () {
        divFlipQuestion.classList.add("used-lifeline");
        playAudioWithoutPause("suspence.mp3");
        resetQuestionAndOptions();
        var newQuestion;
        do {
            var randomIndex = Math.floor(Math.random() * levelQuestionsList.length);
            newQuestion = levelQuestionsList[randomIndex];
        } while (newQuestion === selectedQuestion && levelQuestionsList.length > 1);
        selectedQuestion = newQuestion;
        insertQuestion();
    });
}
function startFlickerAll() {
    optionsArray.forEach(function (option) {
        option.classList.add("flicker-all");
    });
    questionText.classList.add("flicker-all");
    timerDisplay.classList.add("flicker-all");
}
function stopFlickerAll() {
    optionsArray.forEach(function (option) {
        option.classList.remove("flicker-all");
    });
    questionText.classList.remove("flicker-all");
    timerDisplay.classList.remove("flicker-all");
}







// ##########################################################################
// dynamic html Generate
// ##########################################################################
const levels = document.querySelector(".levels")
const level = document.querySelector(".level");
levels.removeChild(level);

function createLevels() {
    let baseMoney = 10000

    for (let i = 1; i < 11; i++) {
        let newLevel = level.cloneNode(true);
        newLevel.querySelector(".amount").textContent = baseMoney*i;
        newLevel.querySelector(".amount").id = `l${i}`;

        
        levels.insertBefore(newLevel, levels.firstChild);
    }
    
}





// #######################################################################
// logic
// #######################################################################

let questions;
let currentAudio = null;
const soundEffects = [
    '30secTimer.mp3',
    'intro1.mp3',
    'intro2.mp3',
    'optionSelected.mp3',
    'questionLoad.mp3',
    'wrongAnswer.mp3',
    'correctAnswer.mp3'
];
const audioDirectory = 'soundEffects/';
let audioFiles = {};
document.addEventListener("DOMContentLoaded", async () => {
    try {
        await loadAudioFiles();
        console.log('All audio files loaded');
    }
    
 catch (error) {
    console.error('Error loading audio files:', error);
}

playAudio("intro2.mp3");


    
    createLevels();
    questions = window.localStorage.getItem("questions");
    if (!questions) {
        try {
            const Response = await fetch("questions.json");
            if (!Response.ok) {
                throw new Error("unable to fetch Questions.json");
            }

            questions = await Response.json();
            window.localStorage.setItem("questions", JSON.stringify(questions));

        }
        catch (error) {
            console.log(error)
        }

    }
    else {
        questions = JSON.parse(questions);
    }

})



let categoryButtons = document.querySelectorAll(".category");
const categoryContainer = document.querySelector(".category-container");
const start = document.querySelector(".start-game");
const displayBox = document.querySelector(".display-box");
const okButton = document.querySelector(".ok-button");
const blockMouseEvents = document.querySelector(".block-mouse-actions");
const questionText = document.querySelector(".question-text");
const timerDisplay = document.querySelector('.timer');

let selectedcategory;


categoryButtons.forEach((category) => {
    category.addEventListener('click', () => {
        categoryButtons.forEach(cat=>{
                cat.classList.remove("active-category");
            })
        
        selectedcategory = category.textContent.trim();
        category.classList.add("active-category");
       

    })
})

const options = document.querySelectorAll(".option");
let optionsArray = Array.from(options);


let categoryQuestions = [];

let currentLevel = 1;
let selectedQuestion = "";
let amount = 10000;
let timerInterval;
let gameOver = false;



start.addEventListener("click", () => {
    if (!selectedcategory) {
        return;
    }
    categoryQuestions = questions.filter(question => question.category === selectedcategory);
    categoryContainer.classList.add("hide");
    displayBox.classList.remove("hide");
    playAudio("intro2.mp3");

})

okButton.addEventListener("click", () => {
    if(gameOver){
        window.location.reload();

    }
    blockMouseEvents.classList.remove("hide");

    setTimeout(()=>{

        askQuestion();
        blockMouseEvents.classList.add("hide");



    },4*1000);

    document.getElementById(`l${currentLevel}`).classList.add("selected-option");
    displayBox.classList.add("hide");
    console.log(selectedQuestion.level);
    playAudio("questionLoad.mp3")


})



function askQuestion() {

    const levelQuestionsList = categoryQuestions.filter(question => question.level === currentLevel);

    const randomIndex = Math.floor(Math.random() * levelQuestionsList.length);
    selectedQuestion = levelQuestionsList[randomIndex];
    console.log(selectedQuestion);
    
    

    insertQuestion(selectedQuestion);
    timer = startTimer(30);
}

options.forEach((option) => {

    let rightOption = optionsArray.filter(option=>option.textContent!==selectedQuestion.answer)[0];
    option.addEventListener("click", () => {
        playAudio("optionSelected.mp3");

        option.classList.add("selected-option");
        blockMouseEvents.classList.remove("hide");
        stopTimer()

        setTimeout(() => {
            option.classList.remove("selected-option");
            rightOption.classList.add("correct-answer");
            



            const optionValue = option.querySelector(".option-value").textContent;
            if (optionValue == selectedQuestion.answer) {
                document.getElementById(`l${currentLevel}`).classList.remove("selected-option");
                document.getElementById(`l${currentLevel}`).classList.add("correct-answer");

                
                // playAudio("")

                correctAnswer();           
               
                               
            }
            else{
                option.classList.add('wrong-answer');

                wrongAnswer();
            }
            if (currentLevel==11){
                gameOver=true;
            }
            resetOptions();

        }, 5000)

    })
})


function resetOptions(){
    optionsArray.forEach(option=>{
        option.classList.remove("correct-answer");
        option.classList.remove("wrong-answer");
        option.classList.remove("selected-option");
        blockMouseEvents.classList.add("hide");
        option.querySelector(".option-value").textContent = "";
        

        
        




    })
    questionText.textContent = "";
        timerDisplay.textContent = "00"
    

}

function insertQuestion() {
    document.querySelector(".question-text").textContent = selectedQuestion.question
    let a = document.getElementById("a");
    let b = document.getElementById("b");

    let c = document.getElementById("c");
    let d = document.getElementById("d");


    let elements = [a, b, c, d];

    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    let shuffledOptions = shuffleArray(selectedQuestion.options.slice());

    let shuffledElements = shuffleArray(elements.slice());

    shuffledElements.forEach((element, index) => {
        if (element) {
            element.textContent = shuffledOptions[index];
        }
    })





}


function startTimer(duration) {
    playAudio("30secTimer.mp3");

    

    let timer = duration, seconds;
    timerInterval = setInterval(() => {
        seconds = parseInt(timer, 10);
        timerDisplay.textContent = seconds;

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

function correctAnswer(){
    playAudio('correctAnswer.mp3')
    displayBox.classList.remove("hide");
    displayBox.classList.add("correct-answer-div-shadow");

    displayBox.querySelector(".title").textContent = "CORRECT ANSWER !";
    displayBox.querySelector(".messege").textContent = `Score ${amount}` ;
    displayBox.querySelector(".ok-button").textContent = "Next Question";

    currentLevel++;
    amount+=10000;
}
function wrongAnswer(){
    playAudio("wrongAnswer.mp3");
    displayBox.classList.remove("hide");
    displayBox.classList.add("wrong-answer-div-shadow");


    displayBox.querySelector(".title").textContent = "WRONG ANSWER !";
    displayBox.querySelector(".messege").textContent = `Score ${amount-10000}` ;
    displayBox.querySelector(".ok-button").textContent = "Restart Game";

    gameOver = true;
    
}
function timeOut(){
    playAudio("wrongAnswer.mp3");

    displayBox.classList.remove("hide");
    displayBox.classList.add("wrong-answer-div-shadow");

    displayBox.querySelector(".title").textContent = "TIME OUT";
    displayBox.querySelector(".messege").textContent = `Score ${amount-10000}` ;
    displayBox.querySelector(".ok-button").textContent = "Restart Game";
    gameOver = true;

}


// ########################################################################
// audio code
// ########################################################################




async function loadAudioFiles() {
    return Promise.all(soundEffects.map(async filename => {
        const audioPath = audioDirectory + filename;
        const storedAudio = localStorage.getItem(filename);
        if (storedAudio) {
            audioFiles[filename] = new Audio(storedAudio);
        } else {
            const response = await fetch(audioPath);
            const blob = await response.blob();
            const base64String = await convertBlobToBase64(blob);
            const base64URL = `data:audio/mp3;base64,${base64String}`;
            audioFiles[filename] = new Audio(base64URL);
            localStorage.setItem(filename, base64URL);
        }
    }));
}

function convertBlobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

function playAudio(filename) {
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

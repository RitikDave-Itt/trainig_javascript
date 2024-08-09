// ##########################################################################
// dynamic html Generate
// ##########################################################################
const levels = document.querySelector(".levels") as HTMLElement;
const level = document.querySelector(".level") as HTMLElement;
levels.removeChild(level);

function createLevels(): void {
  let baseMoney = 10000;

  for (let i = 1; i < 11; i++) {
    let newLevel = level.cloneNode(true) as HTMLElement;
    const amountElement = newLevel.querySelector(".amount") as HTMLElement;
    amountElement.textContent = (baseMoney * i).toString();
    amountElement.id = `l${i}`;

    levels.insertBefore(newLevel, levels.firstChild);
  }
}

// #######################################################################
// logic
// #######################################################################
document.addEventListener('contextmenu', event => event.preventDefault());
const turnUpVolume = document.querySelector(".turn-up-volume")as HTMLElement;

interface Question {
  category: string;
  level: number;
  question: string;
  options: string[];
  answer: string;
}

let questions: Question[] | null = null;
let currentAudio: HTMLAudioElement | null = null;

const soundEffects: string[] = [
  "suspence.mp3",
  "30secTimer.mp3",
  "intro1.mp3",
  "intro2.mp3",
  "optionSelected.mp3",
  "questionLoad.mp3",
  "wrongAnswer.mp3",
  "correctAnswer.mp3",
];
const audioDirectory = "soundEffects/";
let audioFiles: Record<string, HTMLAudioElement> = {};

let turnUpVolumeAnimation :any;

document.addEventListener("DOMContentLoaded", async () => {
    turnUpVolumeAnimation=setInterval(()=>{
        turnUpVolume.classList.toggle("hide");
    },500);

  try {
    await loadAudioFiles();
  } catch (error) {
    console.error("Error loading audio files:", error);
  }

  playAudioWithPause("intro2.mp3");
  createLevels();

  const storedQuestions = window.localStorage.getItem("questions");
  if (!storedQuestions) {
    try {
      const response = await fetch("questions.json");
      if (!response.ok) {
        throw new Error("unable to fetch questions.json");
      }

      questions = await response.json() as Question[];
      window.localStorage.setItem("questions", JSON.stringify(questions));
    } catch (error) {
      console.log(error);
    }
  } else {
    questions = JSON.parse(storedQuestions) as Question[];
  }
});

const divFlipQuestion = document.getElementById("flip") as HTMLElement;
const questionBox = document.querySelector(".question-box") as HTMLElement;

const divFiftyFifty = document.getElementById("50-50") as HTMLElement;
let categoryButtons = document.querySelectorAll(".category");
const categoryContainer = document.querySelector(".category-container") as HTMLElement;
const start = document.querySelector(".start-game") as HTMLElement;
const displayBox = document.querySelector(".display-box") as HTMLElement;
const okButton = document.querySelector(".ok-button") as HTMLElement;
const blockMouseEvents = document.querySelector(".block-mouse-actions") as HTMLElement;
const questionText = document.querySelector(".question-text") as HTMLElement;
const timerDisplay = document.querySelector(".timer") as HTMLElement;

let selectedCategory: string | undefined;

categoryButtons.forEach((category) => {
  category.addEventListener("click", () => {
    categoryButtons.forEach((cat) => {
      cat.classList.remove("active-category");
    });

    selectedCategory = category.textContent?.trim();
    category.classList.add("active-category");
  });
});

const options = document.querySelectorAll(".option");
let optionsArray = Array.from(options) as HTMLElement[];

let categoryQuestions: Question[] = [];
let levelQuestionsList: Question[] = [];

let currentLevel = 1;
let selectedQuestion: Question | undefined;
let amount = 10000;
let timerInterval: number | undefined;
let gameOver = false;
let gameon = false;
let usedFiftyFifty = false;
let usedFlip = false;
let rightOption: HTMLElement | undefined;
let currentLevelDiv: HTMLElement | null = null;

function filterLevelQuestions(): void {
  levelQuestionsList = categoryQuestions.filter(
    (question) => question.level === currentLevel
  );
}

start.addEventListener("click", () => {
    clearInterval(turnUpVolumeAnimation);
    turnUpVolume.classList.add("hide");
    if (!selectedCategory) {
    return;
  }
  categoryQuestions = (questions || []).filter(
    (question) => question.category === selectedCategory
  );
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

  currentLevelDiv?.classList.add("selected-option");
  displayBox.classList.add("hide");
  playAudioWithPause("questionLoad.mp3");
});

function getCurrentLevelQuestion(): void {
  gameon = true;

  filterLevelQuestions();

  const randomIndex = Math.floor(Math.random() * levelQuestionsList.length);
  selectedQuestion = levelQuestionsList[randomIndex];
}

function getRightOption(): void {
  optionsArray.forEach((option) => {
    const optionValue = option.querySelector(".option-value")?.textContent;
    if (optionValue === selectedQuestion?.answer) {
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
      option.classList.remove("flicker-option");
      rightOption?.classList.add("correct-answer");

      const optionValue = option.querySelector(".option-value")?.textContent;
      if (optionValue === selectedQuestion?.answer) {
        currentLevelDiv?.classList.remove("selected-option");
        currentLevelDiv?.classList.add("correct-answer");
        option.classList.add("correct-answer");

        setTimeout(() => {
          correctAnswer();
        }, 1000);
      } else {
        currentLevelDiv?.classList.remove("selected-option");
        currentLevelDiv?.classList.add("wrong-answer");
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

function resetQuestionAndOptions(): void {
  optionsArray.forEach((option) => {
    option.classList.remove("correct-answer");
    option.classList.remove("wrong-answer");
    option.classList.remove("selected-option");
    blockMouseEvents.classList.add("hide");
    const optionValue = option.querySelector(".option-value") as HTMLElement;
    optionValue.textContent = "";
    option.classList.remove("hide");
  });
  questionText.textContent = "";
  timerDisplay.textContent = "00";
  gameon = false;
}

function insertQuestion(): void {
  questionText.textContent = selectedQuestion?.question || "";
  const a = document.getElementById("a") as HTMLElement;
  const b = document.getElementById("b") as HTMLElement;
  const c = document.getElementById("c") as HTMLElement;
  const d = document.getElementById("d") as HTMLElement;

  let elements = [a, b, c, d];

  const shuffledOptions = shuffleArray(selectedQuestion?.options.slice() || []);

  const shuffledElements = shuffleArray(elements.slice());

  shuffledElements.forEach((element, index) => {
    if (element) {
      element.textContent = shuffledOptions[index];
    }
  });
}

function shuffleArray<T>(arr: T[]): T[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function startTimer(duration: number): number {
  playAudioWithPause("30secTimer.mp3");

  let timer = duration;
  timerInterval = setInterval(() => {
    const seconds = parseInt(timer.toString(), 10);
    timerDisplay.textContent = seconds.toString();
    if(timer<10){
        timerDisplay.classList.add("low-time");
    }
    if (--timer < 0) {
      clearInterval(timerInterval);
      timeOut();
    }
    
  }, 1000);

  return timerInterval;
}

function stopTimer(): void {
  clearInterval(timerInterval);
}

function correctAnswer(): void {
  playAudioWithPause("correctAnswer.mp3");
  displayBox.classList.remove("hide");
  displayBox.classList.add("correct-answer-div-shadow");

  displayBox.querySelector(".title")!.textContent = "CORRECT ANSWER !";
  displayBox.querySelector(".messege")!.textContent = `Score ${amount}`;
  displayBox.querySelector(".ok-button")!.textContent = "Next Question";

  currentLevel++;
  amount += 10000;
  resetQuestionAndOptions();
}

function wrongAnswer(): void {
  playAudioWithPause("wrongAnswer.mp3");
  displayBox.classList.remove("hide");
  displayBox.classList.add("wrong-answer-div-shadow");

  displayBox.querySelector(".title")!.textContent = "WRONG ANSWER !";
  displayBox.querySelector(".messege")!.textContent = `Score ${amount - 10000}`;
  displayBox.querySelector(".ok-button")!.textContent = "Restart Game";

  gameOver = true;
  resetQuestionAndOptions();
}

function timeOut(): void {
  playAudioWithPause("wrongAnswer.mp3");

  displayBox.classList.remove("hide");
  displayBox.classList.add("wrong-answer-div-shadow");

  displayBox.querySelector(".title")!.textContent = "TIME OUT";
  displayBox.querySelector(".messege")!.textContent = `Score ${amount - 10000}`;
  displayBox.querySelector(".ok-button")!.textContent = "Restart Game";
  gameOver = true;
}

// ########################################################################
// audio code
// ########################################################################

async function loadAudioFiles(): Promise<void> {
  await Promise.all(
    soundEffects.map(async (filename) => {
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
    })
  );
}

function convertBlobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function playAudioWithPause(filename: string): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
  currentAudio = audioFiles[filename];
  currentAudio.play();
}

function stopAudio(): void {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
}

function playAudioWithoutPause(filename: string): void {
  const newAudio = audioFiles[filename];
  newAudio.play();
}

function lifelineFiftyFifty(): void {
  divFiftyFifty.addEventListener("click", () => {
    divFiftyFifty.classList.add("used-lifeline");
    playAudioWithoutPause("suspence.mp3");

    const wrongOptions = optionsArray.filter((option) => {
      const optionValue = option.querySelector(".option-value")?.textContent;
      return optionValue !== selectedQuestion?.answer;
    });

    let randomIndex = Math.floor(Math.random() * 3);

    wrongOptions[randomIndex].classList.add("hide");
    wrongOptions.splice(randomIndex, 1);
    randomIndex = Math.floor(Math.random() * 2);

    wrongOptions[randomIndex].classList.add("hide");

    wrongOptions.pop();
  });
}

function lifelineFlipQuestion(): void {
  divFlipQuestion.addEventListener("click", () => {
    divFlipQuestion.classList.add("used-lifeline");
    playAudioWithoutPause("suspence.mp3");
    resetQuestionAndOptions();

    let newQuestion: Question;
    do {
      const randomIndex = Math.floor(Math.random() * levelQuestionsList.length);
      newQuestion = levelQuestionsList[randomIndex];
    } while (newQuestion === selectedQuestion && levelQuestionsList.length > 1);

    selectedQuestion = newQuestion;

    insertQuestion();
  });
}

function startFlickerAll(): void {
  optionsArray.forEach((option) => {
    option.classList.add("flicker-all");
  });

  questionText.classList.add("flicker-all");
  timerDisplay.classList.add("flicker-all");
}

function stopFlickerAll(): void {
  optionsArray.forEach((option) => {
    option.classList.remove("flicker-all");
  });

  questionText.classList.remove("flicker-all");
  timerDisplay.classList.remove("flicker-all");
}
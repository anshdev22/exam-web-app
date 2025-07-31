// Assumes questionsData is loaded from questions.js
let currentSection = null;
let currentQuestionIndex = 0;
let answers = {};
let totalTime = 10 * 60;
let timerInterval;

const sectionSelect = document.getElementById("sectionSelect");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const questionPalette = document.getElementById("questionPalette");
const essaySection = document.getElementById("essaySection");

function initializeExam() {
  document.getElementById("instructionsScreen").style.display = "none";
  document.getElementById("examContainer").style.display = "block";

  sectionSelect.innerHTML = "";
  for (let sec in questionsData) {
    sectionSelect.innerHTML += `<option value="${sec}">${sec}</option>`;
    answers[sec] = Array(questionsData[sec].length).fill().map(() => ({ selected: null, status: 'not-visited' }));
  }

  currentSection = sectionSelect.value;
  currentQuestionIndex = 0;
  loadQuestion();
  renderPalette();
  startTimer();
}

function startTimer() {
  function updateTimerDisplay() {
    const minutes = Math.floor(totalTime / 60);
    const seconds = totalTime % 60;
    document.getElementById("timer").textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    totalTime--;
    updateTimerDisplay();
    if (totalTime <= 0) {
      clearInterval(timerInterval);
      alert("Time's up! Submitting your exam.");
      submitExam();
    }
  }, 1000);
}

function loadQuestion() {
  const isEssay = currentSection === "Essay";
  optionsContainer.style.display = isEssay ? "none" : "block";
  essaySection.style.display = isEssay ? "block" : "none";

  if (isEssay) {
    questionText.textContent = questionsData.Essay[0].question;
  } else {
    const questionObj = questionsData[currentSection][currentQuestionIndex];
    questionText.textContent = `Q${currentQuestionIndex + 1}. ${questionObj.question}`;
    optionsContainer.innerHTML = "";
    questionObj.options.forEach((opt, idx) => {
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "option";
      radio.id = `opt${idx}`;
      radio.value = opt;
      const label = document.createElement("label");
      label.htmlFor = `opt${idx}`;
      label.textContent = opt;
      optionsContainer.appendChild(radio);
      optionsContainer.appendChild(label);
      optionsContainer.appendChild(document.createElement("br"));
      if (answers[currentSection][currentQuestionIndex].selected === opt) radio.checked = true;
    });
    updateActivePalette();
  }
}

function saveAnswer(status = 'answered') {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  const selected = selectedOption ? selectedOption.value : null;
  answers[currentSection][currentQuestionIndex] = { selected, status: selected ? status : 'not-answered' };
  nextQuestion();
}

function markForReview() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  const selected = selectedOption ? selectedOption.value : null;
  answers[currentSection][currentQuestionIndex] = { selected, status: 'review' };
  nextQuestion();
}

function clearResponse() {
  answers[currentSection][currentQuestionIndex] = { selected: null, status: 'not-answered' };
  loadQuestion();
  renderPalette();
}

function nextQuestion() {
  if (currentQuestionIndex < questionsData[currentSection].length - 1) {
    currentQuestionIndex++;
    loadQuestion();
    renderPalette();
  } else {
    moveToNextSection();
  }
}

function moveToNextSection() {
  const sectionKeys = Object.keys(questionsData);
  const currentSectionIndex = sectionKeys.indexOf(currentSection);
  currentSection = sectionKeys[(currentSectionIndex + 1) % sectionKeys.length];
  currentQuestionIndex = 0;
  sectionSelect.value = currentSection;
  loadQuestion();
  renderPalette();
}

function renderPalette() {
  questionPalette.innerHTML = "";
  if (currentSection === "Essay") return;
  answers[currentSection].forEach((entry, i) => {
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    btn.className = entry.status.replace(/ /g, "-");
    btn.id = `btn-${i}`;
    btn.onclick = () => {
      currentQuestionIndex = i;
      loadQuestion();
    };
    questionPalette.appendChild(btn);
  });
}

function updateActivePalette() {
  document.querySelectorAll(".question-palette button").forEach(btn => btn.classList.remove("active"));
  if (questionPalette.children[currentQuestionIndex]) {
    questionPalette.children[currentQuestionIndex].classList.add("active");
  }
}

function calculateScore() {
  let score = 0;
  for (let section in questionsData) {
    if (section === "Essay") continue;
    questionsData[section].forEach((q, i) => {
      if (answers[section][i].selected === q.correct) score++;
    });
  }
  return score;
}

function calculateScoreDetails() {
  let correct = 0, incorrect = 0;
  for (let section in questionsData) {
    if (section === "Essay") continue;
    questionsData[section].forEach((q, i) => {
      const userAnswer = answers[section][i].selected;
      if (userAnswer !== null) {
        if (userAnswer === q.correct) correct++;
        else incorrect++;
      }
    });
  }
  const attempted = correct + incorrect;
  const accuracy = attempted > 0 ? ((correct / attempted) * 100).toFixed(2) + "%" : "0%";
  return { correct, incorrect, attempted, accuracy };
}

function submitExam() {
  if (!confirm("Are you sure you want to submit the exam?")) return;
  clearInterval(timerInterval);

  const name = document.getElementById("studentName").value.trim();
  const email = document.getElementById("studentEmail").value.trim();
  const essayText = document.getElementById("essayAnswer").value.trim();

  let totalQs = 0, review = 0;
  for (let section in answers) {
    if (section === "Essay") continue;
    totalQs += answers[section].length;
    answers[section].forEach(entry => {
      if (entry.status === "review") review++;
    });
  }

  const score = calculateScore();
  const { correct, incorrect, attempted, accuracy } = calculateScoreDetails();

  document.getElementById("examContainer").style.display = "none";
  document.getElementById("resultModal").style.display = "block";
  document.getElementById("totalQs").textContent = totalQs;
  document.getElementById("attemptedQs").textContent = attempted;
  document.getElementById("reviewQs").textContent = review;

  fetch('https://script.google.com/macros/s/AKfycbxXlbfIZi9nyJVL4s9slOehcHgKQBjKQoMJYPMbl8lC-qYNeG1HWOqIQokx8YVNTW_5/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, score, correct, incorrect, attempted, review, accuracy, essay: essayText })
  });
}

// Query feature
const queryBtn = document.getElementById("queryBtn");
const queryPopup = document.getElementById("queryPopup");
const sendQueryBtn = document.getElementById("sendQuery");
const queryTextArea = document.getElementById("queryText");

queryBtn.addEventListener("click", () => {
  queryPopup.style.display = queryPopup.style.display === 'block' ? 'none' : 'block';
});

sendQueryBtn.addEventListener("click", () => {
  const query = queryTextArea.value.trim();
  const name = document.getElementById("studentName").value.trim();
  const email = document.getElementById("studentEmail").value.trim();
  if (!query) return alert("Please enter your query");

  fetch('https://script.google.com/macros/s/AKfycbxXlbfIZi9nyJVL4s9slOehcHgKQBjKQoMJYPMbl8lC-qYNeG1HWOqIQokx8YVNTW_5/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, name, email })
  });
  alert("Query sent successfully");
  queryTextArea.value = "";
  queryPopup.style.display = 'none';
});

// Event Listeners
sectionSelect.addEventListener("change", () => {
  currentSection = sectionSelect.value;
  currentQuestionIndex = 0;
  loadQuestion();
  renderPalette();
});

document.getElementById("startExamBtn").addEventListener("click", initializeExam);
document.getElementById("saveNext").addEventListener("click", () => saveAnswer('answered'));
document.getElementById("markReview").addEventListener("click", markForReview);
document.getElementById("clearResponse").addEventListener("click", clearResponse);
document.getElementById("submitExam").addEventListener("click", submitExam);


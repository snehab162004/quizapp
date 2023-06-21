const questions = [
    {
        question : "Which tag is used for paragraph?",
        answers : [
            {text: "&lt;p&gt;----&lt;&#92p&gt;",correct: true},
            {text: "&lt;p&gt;----&lt;p&gt;",correct: false},
            {text: "&lt;para&gt;----&lt;&#92para&gt;",correct: false},
            {text: "&lt;pa&gt;----&lt;&#92pa&gt;",correct: false},

        ]
    }, {
        question : "Which tag is used for heading-1?",
        answers : [
            {text: "&lt;h1&gt;----&lt;h1&gt;",correct: false},
            {text: "&lt;he&gt;----&lt;he&gt",correct: false},
            {text: "&lt;h1&gt;----&lt;/h1&gt>",correct: true},
            {text: "&lt;h1&gt;----&lt;h2&gt",correct: false},
]
},
{ 
    question : "What is HTML stands for?",
    answers : [
    {text: "Hyper Text Markup Language",correct: true},
    {text: "HyperLink Protocol Trasnfer",correct: false},
    {text: "HyperLink Text Protocol Trasnfer",correct: false},
    {text: "HyperLink Trasnfer Protocol",correct: false},
]},
  {
    question : "What is HTTP stands for?",
    answers : [
    {text: "Hyper Text Transfer Protocol",correct: true},
    {text: "HyperLink Protocol Trasnfer",correct: false},
    {text: "HyperLink Text Protocol Trasnfer",correct: false},
    {text: "HyperLink Trasnfer Protocol",correct: false},
]}
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answers-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
   currentQuestionIndex = 0;
   score = 0;
   nextButton.innerHTML = "Next";
   showQuestion();
}

function showQuestion() {
    answerButton.innerHTML = "";

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const seletedBtn = e.target;
    const isCorrect = seletedBtn.dataset.correct === "true";
    if(isCorrect) {
        seletedBtn.classList.add("correct");
        score++;
    } else {
        seletedBtn.classList.add("incorrect");

    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again!";
    nextButton.style.display = "block";
}


function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length ) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

   


startQuiz();
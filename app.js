

const questionNumber=document.querySelector(".question-number");
const questionText=document.querySelector(".question-text");
const optionContainer=document.querySelector(".option-container");
const answersIndicatorContainer=document.querySelector(".answers-indicator");
const homeBox= document.querySelector(".home-box");
const quizBox= document.querySelector(".quiz-box");
const resultBox= document.querySelector(".result-box");


let questionCounter=0;
let currentQuestion;
let availableQuestions= [];
let availableOptions= [];
let correctAnswers=0;
let wrongAnswers=0;
let attempt=0;

function setAvailableQuestion() {
	// body...
	const totalQuestion=quiz.length;
	for(let i=0;i<totalQuestion;i++)
	{
		availableQuestions.push(quiz[i]);
	}
	//console.log(availableQuestions)
}
/*document.addEventListener('click',function(event){
	if(!event.target.classList.contains('next-question-btn'))
		return;
	next();
},false);*/

function getNewQuestion(){
	questionNumber.innerHTML="Question "+(questionCounter+1)+" of "+quiz.length;
     
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestion=questionIndex;
    questionText.innerHTML=currentQuestion.q;
    const index1=availableQuestions.indexOf(questionIndex);
    availableQuestions.splice(index1,1);
    //optionContainer.innerHTML=currentQuestion.options;
    const optionlen=currentQuestion.options.length;
    for(let i=0;i<optionlen;i++)
    {
    	availableOptions.push(i);
    }
    optionContainer.innerHTML='';
    let animationDelay =0.2;
    for(let i=0;i<optionlen;i++)
    {
    	const optionIndex=availableOptions[Math.floor(Math.random()*availableOptions.length)];
    	const index2=availableOptions.indexOf(optionIndex);
    	availableOptions.splice(index2,1);
    	const option=document.createElement("div");
    	option.innerHTML=currentQuestion.options[optionIndex];
    	option.id=optionIndex;
    	option.style.animationDelay=animationDelay+'s';
    	animationDelay=animationDelay+0.2;
    	option.className="option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick","getResult(this)");
    
    }
    //MY TRY const index2=availableOptions.indexOf(questionIndex);
    //availableOptions.splice(currentQuestion.options,1);
    //currentQuestion.splice(currentQuestion.options,1);
    //console.log(questionIndex);
    questionCounter++;
    
    
}
function getResult(element){
	const id=parseInt(element.id);
	attempt++;
	if(id===currentQuestion.answer)
	{
       element.classList.add("correct");
       correctAnswers++;
       updateanswerIndicator("correct");

       //console.log(id);
	}
	else
	{
       element.classList.add("wrong");
       wrongAnswers++;
       updateanswerIndicator("wrong");
       const optionlen=optionContainer.children.length;
       for(let i=0;i<optionlen;i++)
       {
       	if(currentQuestion.answer==parseInt(optionContainer.children[i].id))
       		optionContainer.children[i].classList.add("correct");
       }
	}
	unclickableOptions();
}
function unclickableOptions(){
	const optionlen=optionContainer.children.length;
	for(let i=0;i<optionlen;i++){
		optionContainer.children[i].classList.add("already-answered");
	}
}

function answersIndicator(){
	const totalQuestion=quiz.length;
	for(let i=0;i<totalQuestion;i++)
	{
		const indicator =document.createElement("div");
		answersIndicatorContainer.appendChild(indicator);
	}
}

function updateanswerIndicator(markType){
	answersIndicatorContainer.children[questionCounter-1].classList.add(markType);
}

function next(){
	if(questionCounter===quiz.length)
	{
		console.log("quiz over");
		quizOver();
	}
	else
	{
		getNewQuestion();
	}
}

function quizOver(){
   quizBox.classList.add("hide");
   resultBox.classList.remove("hide");
   quizResult();
}

function resetQuiz(){
 correctAnswers=0;
 wrongAnswers=0;
 attempt=0;
 questionCounter=0;
 currentQuestion;
 availableQuestions= [];
 availableOptions= [];
 setAvailableQuestion();
 getNewQuestion();
}

function tryAgain(){
  
  resultBox.classList.add("hide");
  quizBox.classList.remove("hide");
  resetQuiz();

}
function starting(){
	homeBox.classList.add("hide");
	resetQuiz();
	quizBox.classList.remove("hide");
}
function gotoHome(){
   resultBox.classList.add("hide");
   homeBox.classList.remove("hide");
}

function quizResult(){
	resultBox.querySelector(".total-question").innerHTML=quiz.length;
	resultBox.querySelector(".total-attempt").innerHTML=attempt;
	resultBox.querySelector(".total-correct").innerHTML=correctAnswers;
	resultBox.querySelector(".total-wrong").innerHTML=wrongAnswers;
	resultBox.querySelector(".percentage").innerHTML=(correctAnswers*100)/5+" %";
	resultBox.querySelector(".total-score").innerHTML=correctAnswers+" / "+quiz.length;
}

window.onload =function(){
	setAvailableQuestion();
	getNewQuestion();
	answersIndicator();

}
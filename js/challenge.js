const commentsList = document.getElementById('list');
const commentForm = document.getElementById('comment-form');
const commentInput = document.getElementById('comment-input');
const counterElement = document.getElementById('counter');
const minusButton = document.getElementById('minus');
const plusButton = document.getElementById('plus');
const pauseButton = document.getElementById('pause');
const heartButton = document.getElementById('heart');
const likeslist = document.querySelector('.likes');

let likes = {};
let timerCount = 0;
let isPaused = false;
let timerInterval;

function updateLikesDisplay() {
    likeslist.innerHTML = "";
    for(const [num,count] of Object.entries(likes)){
        const likeElement = document.createElement('li');
        likeElement.textContent = `${num} has ${count} like(s)`;
        likeslist.appendChild(likeElement);
        
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        if(!isPaused) {
            timerCount++;
            counterElement.textContent = timerCount;
        }
    }, 1000);
}

plusButton.addEventListener('click',()=>{
    timerCount++;
    counterElement.textContent = timerCount;
});
minusButton.addEventListener('click',()=>{
    timerCount--;
    counterElement.textContent = timerCount;
});

heartButton.addEventListener('click', ()=>{
    likes[timerCount] = (likes[timerCount] || 0) + 1;
    updateLikesDisplay();
});

pauseButton.addEventListener('click', ()=>{
    isPaused = !isPaused;
    if(isPaused) {
        clearInterval(timerInterval);
        pauseButton.textContent = 'Resume'
        } else {
        startTimer();
        pauseButton.textContent = 'Pause'
    }
});

commentForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const comment = commentInput.value.trim();
  if(comment){
    const commentDiv = document.createElement('div')
    commentDiv.textContent = comment;
    commentsList.appendChild(commentDiv);
    commentInput.value = '';
  }
})

startTimer();


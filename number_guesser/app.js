

let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;
console.log(winningNum);
const game = document.getElementById('game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

minNum.textContent = min;
maxNum.textContent = max;

game.addEventListener('mousedown', function(e){
  if(e.target.className === 'play-again'){
    window.location.reload();
  }
});

guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  if(guess === winningNum){
    gameOver(true, `You won! The correct number was ${winningNum} :)`);
  }else{
    guessesLeft -=1;
    if(guessesLeft === 0){
      gameOver(false, `No guesses left. You lost. The correct number was ${winningNum}`);
        }else{
      guessInput.value = '';
      setMessage(`${guess} is not correct. You have ${guessesLeft} guesses left`, 'black');
    }
  }
  if (guess>max){
    guessesLeft +=1;
    setMessage(`Number ${guess} is too large. You have ${guessesLeft} guesses left`, 'blue');
  }
  if (guess<min){
    guessesLeft +=1;
    setMessage(`Number ${guess} is too small. You have ${guessesLeft} guesses left`, 'blue');
  }
  if (isNaN(guess)){
    guessesLeft +=1;
    setMessage(`This is not a number. You have ${guessesLeft} guesses left`, 'blue');
  }
});

function gameOver(won,msg){
  let color;
  won === true ? color = 'green' : color = 'red';
  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color;
  setMessage(msg);

  guessBtn.value = 'Play Again';
  guessBtn.className += 'play-again';
}
function getRandomNum(min, max){
  return Math.floor(Math.random()*(max-min-1)+min);

}
function setMessage(msg, color){
  message.style.color = color;
  message.textContent=msg;
}

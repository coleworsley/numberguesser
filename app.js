textAbove// Variable Declarations
var minNum = 1;
var maxNum = 100;
var guess;
var randomNum;
var tries = 0;

var buttons = document.querySelectorAll("button");
var guessButton = document.querySelector("#guess");
var clearButton = document.querySelector("#clear");
var resetButton = document.querySelector("#reset");
var input = document.querySelector("#input");
var minInput = document.querySelector("#min-input");
var maxInput = document.querySelector("#max-input");

var lastGuess = document.querySelector("#last-guess");
var textAbove = document.querySelector("#text-above");
var textBelow = document.querySelector("#text-below");

// On page load
generateRandomNum(minNum, maxNum);
minInput.value = minNum
maxInput.value = maxNum
textAbove.innerText = "Enter a number between " + minNum + " and " + maxNum + "."


// Event Listeners
minInput.addEventListener("input", function() {
  minNum = parseNum(minInput.value)
  checkStatus()
  generateRandomNum(minNum, maxNum)
  textAbove.innerText = "Enter a number between " + minNum + " and " + maxNum + "."
  enableButton(resetButton)
})

maxInput.addEventListener("input", function() {
  maxNum = parseNum(maxInput.value)
  checkStatus()
  generateRandomNum(minNum, maxNum)
  textAbove.innerText = "Enter a number between " + minNum + " and " + maxNum + "."
  enableButton(resetButton)
})


input.addEventListener("input", function() {
  if (input.value != "") {
    enableButton(clearButton)
  } else {
    disableButton(clearButton)
  }

  guess = parseNum(input.value)
  checkStatus()
  enableButton(resetButton)
})

clearButton.addEventListener("click", function() {
  clearInput()
  enableButton(resetButton)
})

guessButton.addEventListener("click", function() {
  tries++
  checkGuess(guess, randomNum)
  enableButton(resetButton)
})

resetButton.addEventListener("click", function() {
  if (resetButton.innerText === "Play Again") {
    playAgain()
  } else {
    resetAll()
  }
})



// Global Functions
function checkGuess(guess, randomNum) {
  lastGuess.textContent = guess
  console.log("guess is " + guess)
  console.log("random number is " + randomNum)
  if (guess === randomNum) {
    correct()
  } else {
    wrong()
  }
}

function resetAll() {
  playAgain()
  minNum = 1
  minInput.value = minNum
  maxNum = 100
  maxInput.value = maxNum
  generateRandomNum(minNum, maxNum)
  textAbove.innerText = "Enter a number between " + minNum + " and " + maxNum + "."
  disableButton(resetButton)
}

function clearInput() {
  input.value = ""
  guess = 0
  disableButton(clearButton)
  disableButton(guessButton)
}

function playAgain() {
  minNum -= 10
  minInput.value = parseInt(minNum)
  maxNum += 10
  maxInput.value = parseInt(maxNum)
  textAbove.innerText = "Enter a number between " + minNum + " and " + maxNum + "."
  textBelow.innerText = " "
  resetButton.innerText = "Reset"
  lastGuess.innerText = "_"
  tries = 0
  clearInput()
  generateRandomNum(minNum, maxNum)
}

function correct() {
  textAbove.innerText = "Boom! You Win!!!"
  resetButton.innerText = "Play Again"
  textBelow.innerText = "You got it in " + tries + " tries!"
  disableButton(guessButton)
  disableButton(clearButton)
}

function wrong() {
  textAbove.innerText = "Your last guess was"

  if (guess < randomNum) {
    textBelow.innerText = "Your last guess was too low"
  } else {
    textBelow.innerText = "Your last guess was too high"
  }
}

function enableButton(button) {
  button.classList.remove("disabled")
  button.classList.add("enabled")
}

function disableButton(button) {
  button.classList.remove("enabled")
  button.classList.add("disabled")
}

function generateRandomNum(min, max) {
  randomNum = Math.floor(Math.random() * (max - min)) + min + 1
}

function parseNum(num) {
  if (isNumber(num) == true) {
    return parseInt(num)
  } else {
    return NaN
  }
}

function isNumber(num) {
  var parsedNum = parseInt(num);
  var parsedNumLength = parsedNum.toString().length;
  var isNumber = !isNaN(parsedNum);
  var numLength;

  if (num == undefined) {
    numLength = NaN
  } else {
    numLength = num.toString().length;
  }

  if (isNumber == false) {
    return false;
  } else if (numLength > parsedNumLength) {
    return false;
  } else {
    return true;
  }
}

function checkStatus() {
  var guessInput = isNumber(guess);
  var minNumInput = isNumber(minNum);
  var maxNumInput = isNumber(maxNum);

  if (guessInput == false || minNumInput == false || maxNumInput == false) {
    disableButton(guessButton);
    alertTextOn()
    textBelow.innerText = "Alert: one or more inputs are not number(s)";

  } else if (minNum > maxNum) {
    textBelow.innerText = "Alert: please specify a correct min and max range";
    alertTextOn()
    disableButton(guessButton);

  } else if (guess > maxNum || guess < minNum) {
    textBelow.innerText = "Alert: please make sure your guess is within the specified range";
    alertTextOn()
    disableButton(guessButton);

  } else {
    console.log("lastGuess is " + lastGuess.innerText)
    if (tries == 0) {
      textBelow.innerText = " "
    } else if (parseNum(lastGuess.innerText) < randomNum) {
      textBelow.innerText = "Your last guess was too low"
    } else {
      textBelow.innerText = "Your last guess was too high"
    }
    enableButton(guessButton);
    alertTextOff()
  }
}


function alertTextOn() {
  textBelow.classList.add("alert")
}

function alertTextOff() {
  textBelow.classList.remove("alert")
}

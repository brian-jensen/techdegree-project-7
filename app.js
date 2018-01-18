/* jshint esversion: 6 */

// Get the element with the ID of qwerty and save it to a variable.
const keyboard = document.querySelector('#qwerty');

// Get the element with the ID of phrase and save it to a variable. 
const phrase = document.querySelector('#phrase');

// Create a missed variable, initialized to 0
let missed = 0;

// Create category variable, initialized to empty string
let category = '';

// “Start Game” button to hide the start screen overlay, and begin the game.
const startButton = document.querySelector('.btn__reset');

// start screen overlay
const overlay = startButton.parentNode;

// start screen overlay title
const title = document.querySelector('.title');

const list = phrase.querySelector('ul');
const letter = document.getElementsByClassName('letter');
const show = document.getElementsByClassName('show');

const keys = keyboard.querySelectorAll('button');
const heartsContainer = document.querySelector('#scoreboard');
const lives = heartsContainer.querySelectorAll('.tries');
const hearts = Array.from(lives);

// Create a phrases array that contains at least 5 different phrases as strings.
let phrases = [
    ['Ace in the hole', 'Cut above the rest', 'Famous last words', 'Better late than never', 'Brave new world', 'Live long and prosper', 'Ignorance is bliss'],
    ['Vanna White', 'Pat Sajak', 'Leonard Nimoy', 'William Shatner', 'Patrick Stewart', 'Randy Layne', 'Alex Trebek'],
    ['New York City', 'London England', 'Paris France', 'Tokyo Japan', 'Miami Florida', 'Hollywood California', 'Portland Oregon']
];

// Create a getRandomPhraseAsArray function.
function getRandomPhraseAsArray(array) {
    const randomCategory = Math.floor(Math.random() * array.length);
    if (randomCategory === 0) {
        chosenCategory('phrase');
    } else if (randomCategory === 1) {
        chosenCategory('person');
    } else if (randomCategory === 2) {
        chosenCategory('place');
    } else {
        chosenCategory('random');
    }
    const randomPhrase = array[randomCategory][Math.floor(Math.random() * array[randomCategory].length)];
    return randomPhrase.toUpperCase().split('');
}

function chosenCategory(name) {
    phrase.removeChild(phrase.childNodes[0]);
    const h3 = document.createElement('h3');
    category = document.createTextNode(name);
    h3.appendChild(category);
    phrase.insertBefore(h3, phrase.childNodes[0]);
}

function addPhraseToDisplay(array) {
    array.forEach((array) => {
        const listItem = document.createElement('li');
        list.appendChild(listItem);
        listItem.textContent = array;
        listItem.className = array !== ' ' ? 'letter' : 'space';
    });
}

startButton.addEventListener('click', (event) => {
    missed = 0;
    overlay.className = 'start';
    list.innerHTML = '';
    keys.forEach((keys) => {
        keys.removeAttribute("class");
        keys.removeAttribute("disabled");
    });
    hearts.forEach((hearts) => {
        hearts.firstElementChild.src = 'images/liveHeart.png';
    });
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
    overlay.style.display = "none";
});

function overlayStatus(status) {
    overlay.classList.add(status);
    overlay.style.display = '';
    title.textContent = 'You ' + status + '!';
    startButton.textContent = 'Reset';
}

function checkLetter(click) {
    let match = null;
    const letterClicked = click.textContent.toUpperCase();
    const letterShown = Array.from(letter);
    letterShown.forEach((letterShown) => {
        if (letterClicked === letterShown.textContent) {
            letterShown.classList.add('show');
            match = true;
        }
    });
    return match ? letterClicked : null;
}

keyboard.addEventListener('click', (event) => {
    const key = event.target;
    if (key.tagName === 'BUTTON') {
        key.className = 'chosen';
        key.setAttribute('disabled', '');
        const match = checkLetter(key);
        if (!match) {
            missed++;
            key.classList.add("wrong");
            lives[lives.length - missed].firstElementChild.src = 'images/lostHeart.png';
        } else {
            key.classList.add("right");
        }
    }
    checkWin();
});

function checkWin() {
    if (letter.length === show.length) {
        overlayStatus('win');
    }
    if (missed >= 5) {
        overlayStatus('lose');
    }
}

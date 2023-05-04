const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const displayQuote = document.querySelector('.quote');
const userInput = document.getElementById('user-input');
const timer = document.querySelector('.timer');
const topScoresDisplay = document.querySelector('.top-10-scores')
const scores = [];
const randomQuotes = [
    'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    'The way to get started is to quit talking and begin doing.',
    "Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma - which is living with the results of other people's thinking.",
    "If life were predictable it would cease to be life, and be without flavor.",
    "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
    "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.",
    "Life is what happens when you're busy making other plans.",
    "Spread love everywhere you go. Let no one ever come to you without leaving happier.",
    "When you reach the end of your rope, tie a knot in it and hang on.",
    "Always remember that you are absolutely unique. Just like everyone else.",
    "Don't judge each day by the harvest you reap but by the seeds that you plant.",
    "The future belongs to those who believe in the beauty of their dreams.",
    "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.",
    "It is during our darkest moments that we must focus to see the light.",
    "Whoever is happy will make others happy too.",
    "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
    "The best and most beautiful things in the world cannot be seen or even touched - they must be felt with the heart.", "It is during our darkest moments that we must focus to see the light.", "Whoever is happy will make others happy too.", "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    "Life is 10% what happens to us and 90% how we react to it. - Charles R. Swindoll", 
    "You can't go back and change the beginning, but you can start where you are and change the ending. - C.S. Lewis", 
    "The only way to do great work is to love what you do. - Steve Jobs", "Believe you can and you're halfway there. - Theodore Roosevelt", 
    "Happiness is not something ready made. It comes from your own actions. - Dalai Lama", 
    "In three words I can sum up everything I've learned about life: it goes on. - Robert Frost", 
    "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill", 
    "We may encounter many defeats but we must not be defeated. - Maya Angelou", "Don't let yesterday take up too much of today. - Will Rogers", 
    "If you want to live a happy life, tie it to a goal, not to people or things. - Albert Einstein", 
    "Your time is limited, don't waste it living someone else's life. - Steve Jobs", 
    "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt", 
    "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle. - Christian D. Larson", 
    "The only true wisdom is in knowing you know nothing. - Socrates", "Life is not a problem to be solved, but a reality to be experienced. - Søren Kierkegaard", 
    "The best way to predict the future is to create it. - Peter Drucker", "Don't wait for opportunities, create them. - Roy T. Bennett", 
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt", "Your life is your message to the world. Make sure it's inspiring. - Unknown", 
    "You don't have to be great to start, but you have to start to be great. - Zig Ziglar",
     "The man who moves a mountain begins by carrying away small stones. - Confucius", 
     "Believe in yourself, take on your challenges, dig deep within yourself to conquer fears. Never let anyone bring you down. - Chantal Sutherland", 
     "Be the change that you wish to see in the world. - Mahatma Gandhi", "Success is stumbling from failure to failure with no loss of enthusiasm. - Winston Churchill", 
     "The secret of change is to focus all of your energy, not on fighting the old, but on building the new. - Socrates", 
     "If you want to achieve greatness, stop asking for permission. - Unknown", "Be fearless in the pursuit of what sets your soul on fire. - Unknown",
      "The only way to do great work is to first love what you do. - Unknown"]


userInput.addEventListener('input', () => {
    let complete = true;
    let arrayValue = userInput.value.split('');
    let arrayQuote = displayQuote.querySelectorAll('span');
    arrayQuote.forEach((el, index) => {
        let letter = el.textContent;
        if (arrayValue[index] == null) {
            arrayQuote[index].classList.remove('correct');
            arrayQuote[index].classList.remove('incorrect');
            complete = false;
        }
        else if (letter === arrayValue[index]) {
            arrayQuote[index].classList.add('correct');
            arrayQuote[index].classList.remove('incorrect');
        } else {
            arrayQuote[index].classList.remove('correct');
            arrayQuote[index].classList.add('incorrect');
            complete = false;
        }
    })

    if (complete) {
        if (scores.length >= 10 && timer.textContent > scores.sort()[9]) {
            startGame();
            return;
        }
        scores.push(timer.textContent);
        let bestTimes = scores.sort((a, b) => a - b);
        let topTenScores = topScoresDisplay.querySelectorAll('li');
        topTenScores.forEach((score, index) => {
            if (bestTimes[index]) {
                score.textContent = `${bestTimes[index]} seconds`;
            } else {
                score.textContent = `---`;
            }
        })
        startGame();
    }
})

function startGame() {

    if (renderRandomQuote().length == undefined) {
        let randomIndex = Math.floor(Math.random() * randomQuotes.length);
        let newQuote = randomQuotes[randomIndex];
        displayQuote.innerHTML = '';
        newQuote.split('').forEach(letter => {
            let newSpan = document.createElement('span');
            newSpan.innerText = letter;
            displayQuote.appendChild(newSpan);
        })
        userInput.value = null;
    } else {
        renderRandomQuote();
    }

    timer.textContent = '0';
    clearInterval(startInterval);
    userInput.removeEventListener('input', startTimer);
    userInput.addEventListener('input', startTimer, { once: true })
}

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content);
}

async function renderRandomQuote() {
    const newQuote = await getRandomQuote()
    displayQuote.innerHTML = '';
    newQuote.split('').forEach(letter => {
        let newSpan = document.createElement('span');
        newSpan.innerText = letter;
        displayQuote.appendChild(newSpan);
    })
    userInput.value = null;
}

let startTime;
let startInterval;
function startTimer() {
    timer.textContent = '0';
    startTime = new Date();
    startInterval = setInterval(() => {
        let newTime = new Date();
        let seconds = Math.floor((newTime - startTime) / 1000);
        timer.textContent = seconds;
    }, 1000)
}

startGame();
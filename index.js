
const emojis = ['🍎', '🍌', '🍇', '🍓', '🍎', '🍌', '🍇', '🍓', '🍉', '🍊', '🍋', '🍉', '🍊', '🍋', '🍒', '🍒'];
emojis.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById('gameBoard');
let flippedCards = [];
let matchedPairs = 0;

emojis.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('card', 'hidden');
    card.dataset.emoji = emoji;
    card.dataset.index = index;
    card.innerText = emoji;
    gameBoard.appendChild(card);

    card.addEventListener('click', () => {
        if (flippedCards.length < 2 && !card.classList.contains('matched')) {
            card.classList.remove('hidden');
            flippedCards.push(card);
        }

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 500);
        }
    });
});

function checkMatch() {
    if (flippedCards[0].dataset.emoji === flippedCards[1].dataset.emoji) {
        flippedCards.forEach(card => card.classList.add('matched'));
        matchedPairs++;
        if (matchedPairs === emojis.length / 2) {
            setTimeout(() => alert('You won! 🎉'), 300);
        }
    } else {
        flippedCards.forEach(card => card.classList.add('hidden'));
    }
    flippedCards = [];
}
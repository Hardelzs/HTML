
let currentLevel = 1;
let matchTime = 1000;


// Generate the Emoji for each levels
function generateEmojis(level) {
    const baseEmojis = ['🍎', '🍌', '🍇', '🍓', '🍉', '🍊', '🍋', '🍒', '🥝', '🍍', '🥭', '🍐', '🍑', '🍈', '🍏', '🥥'];
    const pairsForLevel = Math.min(2 + level, baseEmojis.length); // Start with 2 pairs, add 1 pair per level
    const levelEmojis = baseEmojis.slice(0, pairsForLevel);
    const pairs = [...levelEmojis, ...levelEmojis]; // Create pairs
    return pairs.sort(() => 0.5 - Math.random());
}


// Starting the level 
function startLevel(level) {
    matchedPairs = 0;
    flippedCards = [];
    gameBoard.innerHTML = '';

    // Remove existing level display if it exist
    const existingLevelDisplay = document.querySelector('level');
    if(existingLevelDisplay){
        existingLevelDisplay.remove()
    }
    matchTime = Math.max(1000 - (level - 1) * 100, 400); // Reduce time with each level
    
    const levelEmojis = generateEmojis(level);
    
    // Add level display e.g level 1, level 2, level 3 e.t.c
    const levelDisplay = document.createElement('level');   
    levelDisplay.innerHTML = `Level ${level}`;
    levelDisplay.style.textAlign = 'center';
    levelDisplay.style.color = "red"
    levelDisplay.style.fontSize = '29px';
    document.body.insertBefore(levelDisplay, gameBoard);
    


    // shuffle emojis foe each level
    levelEmojis.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card', 'hidden');
        card.dataset.emoji = emoji;
        card.dataset.index = index;
        card.innerText = emoji;
        gameBoard.appendChild(card);

        // Flipping the card, checking if the card id match
        card.addEventListener('click', () => {
            if (flippedCards.length < 2 && !card.classList.contains('matched') && !card.classList.contains('revealed')) {
                card.classList.remove('hidden');
                flippedCards.push(card);

                if (flippedCards.length === 2) {
                    setTimeout(checkMatch, matchTime);
                }
            }
        });
    });
}

// This is checking the class and storing it 
function checkMatch() {
    if (flippedCards[0].dataset.emoji === flippedCards[1].dataset.emoji) {
        flippedCards.forEach(card => card.classList.add('matched'));
        matchedPairs++;
        const currentLevelPairs = Math.min(2 + currentLevel, 16);
        
        if (matchedPairs === currentLevelPairs) {
            setTimeout(() => {
                document.getElementById("popup-message").innerHTML = `Level ${currentLevel} completed! 🎉 `;
                document.getElementById("popup").style.display = "flex";
            }, 300);
        }
    } else {
        flippedCards.forEach(card => card.classList.add('hidden'));
    }
    flippedCards = [];
}

    

// Close popup when clicking "OK" or outside the popup
document.getElementById("popup-btn").addEventListener("click", () => {
    document.getElementById("popup").style.display = "none";
    currentLevel++;
    startLevel(currentLevel);
});

document.getElementById("popup").addEventListener("click", (e) => {
    if (e.target === document.getElementById("popup")) {
        document.getElementById("popup").style.display = "none";
        currentLevel++;  
    }
});

startLevel(currentLevel);

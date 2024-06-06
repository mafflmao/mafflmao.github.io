document.addEventListener('DOMContentLoaded', () => {
    const playerHand = document.querySelector('.player-hand');
    const botHand = document.querySelector('.bot-hand');
    const board = document.querySelector('.board');

    let selectedCard = null;

    playerHand.addEventListener('click', event => {
        if (event.target.classList.contains('card')) {
            selectedCard = event.target;
        }
    });

    board.addEventListener('click', event => {
        if (selectedCard && event.target.classList.contains('player-space') && !event.target.hasChildNodes()) {
            placeCard(selectedCard, event.target);
            selectedCard = null;
            botTurn();
        }
    });

    function placeCard(card, space) {
        space.appendChild(card.cloneNode(true));
        card.remove();
    }

    function botTurn() {
        const botCards = [...botHand.children];
        const availableSpaces = [...document.querySelectorAll('.bot-space')].filter(space => !space.hasChildNodes());

        if (botCards.length > 0 && availableSpaces.length > 0) {
            const botCard = botCards[Math.floor(Math.random() * botCards.length)];
            const space = availableSpaces[Math.floor(Math.random() * availableSpaces.length)];

            placeCard(botCard, space);
            checkBattle();
        }
    }

    function checkBattle() {
        const playerSpaces = document.querySelectorAll('.player-space');
        const botSpaces = document.querySelectorAll('.bot-space');

        playerSpaces.forEach((playerSpace, index) => {
            const botSpace = botSpaces[index];
            if (playerSpace.hasChildNodes() && botSpace.hasChildNodes()) {
                const playerCard = playerSpace.firstChild;
                const botCard = botSpace.firstChild;

                const playerAttack = parseInt(playerCard.dataset.attack);
                const botHealth = parseInt(botCard.dataset.health);

                if (playerAttack >= botHealth) {
                    botSpace.removeChild(botCard);
                }
            }
        });
    }
});

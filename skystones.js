document.addEventListener('DOMContentLoaded', () => {
    const playerHand = document.querySelector('.player-hand');
    const botHand = document.querySelector('.bot-hand');
    const board = document.querySelector('.board');

    playerHand.addEventListener('click', event => {
        if (event.target.classList.contains('card')) {
            const card = event.target;
            placeCard(card, 'player');
        }
    });

    function placeCard(card, type) {
        const availableSpaces = [...document.querySelectorAll(`.${type}-space`)].filter(space => !space.hasChildNodes());
        if (availableSpaces.length > 0) {
            const space = availableSpaces[0];
            space.appendChild(card.cloneNode(true));
            card.remove();
            if (type === 'player') {
                botTurn();
            }
        }
    }

    function botTurn() {
        const botCards = [...botHand.children];
        if (botCards.length > 0) {
            const botCard = botCards[0];
            placeCard(botCard, 'bot');
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

/**
 * ELEMENTS SELECTORS
*/
const selectClass = (className) => document.querySelector(className);
const selectId = (idName) => document.getElementById(idName);
/**
 * DATA
*/
// Players data
const playerData = (number) => {
    return  { DOMElements: {
                                playerContainer: selectClass(`.contentPlayer-${number}`),
                                playerName: selectClass(`.contentPlayerName-${number}`),
                                playerMoney: selectClass(`.contentPlayerMoney-${number}`),
                                winnerDisplay: selectClass(`.winnerPlayer-${number}`),
                                betsMainContainer: selectClass(`.contentPlayerBets-${number}`),
                                betsContainer: selectClass(`.bets-${number}`),
                                rollDiceBtn: selectClass(`.contentPlayer-${number} .btn button`)
                            },
                varElements: {
                                selectedBet: 0,
                                isPlaying: false,
                                isBetting: false,
                                isRolling: false,
                                sumDicesVal: 0,
                                totalMoney: parseInt(localStorage.getItem('maxBet'))
                             }
            };
};

// Game data
const gameData = {
                DOMElements: {
                                statContainer: selectClass('.contentGameStat'),
                                drawGame: selectClass('.drawGame p'),
                                currentBet: selectClass('.betValue p'),
                                dice1: selectId('dice-1'),
                                dice2: selectId('dice-2'),
                                newGame: selectClass('.newGameBtn'),
                                quit: selectClass('.quitBtn')
                            },
                varElements: {
                                currentBet: 0,
                                countRollDices: 0,
                                totalMaxBets: 20 
                            }
            };

/**
 * PLAYER CLASS
*/
class Player {
    constructor(number, playerVar) {
        this.number = number;
        this.playerVar = playerVar;
    }

    displayOnLoad() {
        // Displaying Player Name
        this.playerVar.DOMElements.playerName.textContent = localStorage.getItem(`player-${this.number}`) || `Player ${this.number}`;
        
        // Displaying player money
        this.playerVar.DOMElements.playerMoney.textContent = '$' + localStorage.getItem('maxBet');
    }

    displayingPlayerMoney() {
        this.playerVar.DOMElements.playerMoney.textContent = '$' + this.playerVar.varElements.totalMoney;
    }


    betSelector(e) {
        console.log(this.amountOfBets());
        for(let n = 1; n <= this.amountOfBets(); n++) {
            if(e.target.matches(`.bet-${n}, .bet-${n} *`)) {
                return selectClass(`.bet-${n} span`).textContent;
            }
        } 
    }

    clickOnBet(e) {
        if(!isNaN(this.betSelector(e))) {
            this.playerVar.varElements.selectedBet = parseInt(this.betSelector(e));
            gameData.varElements.currentBet = parseInt(this.betSelector(e));
            gameData.DOMElements.currentBet.textContent = '$' + this.playerVar.varElements.selectedBet;

            this.afterBetting();
         }
    }

    amountOfBets() {
        let result = Math.ceil(this.playerVar.varElements.totalMoney / 5);
        return result >= 6 ? 6 : result;
    }

    rollingDices() {
        let diceVal1 = Math.floor(Math.random()*6) + 1;
        let diceVal2 = Math.floor(Math.random()*6) + 1;

        this.playerVar.varElements.sumDicesVal = diceVal1 + diceVal2;

        // Displaying the dices
        gameData.DOMElements.dice1.src = `./img/${diceVal1}.jpg`;
        gameData.DOMElements.dice2.src = `./img/${diceVal2}.jpg`;

        gameData.varElements.countRollDices++;

        this.afterRollingDices();
    }

    highlightPlayerContainer() {
        if(this.playerVar.varElements.isPlaying) {
            this.playerVar.DOMElements.playerContainer.style.boxShadow = '2px 5px 60px white';
        } else {
            this.playerVar.DOMElements.playerContainer.style.boxShadow = 'none';
        }
    }

    highlightBetsContainer() {
        if(this.playerVar.varElements.isBetting) {
            this.playerVar.DOMElements.betsMainContainer.style.boxShadow = '2px 5px 40px white';
        } else {
            this.playerVar.DOMElements.betsMainContainer.style.boxShadow = 'none';
        }
    }

    highlightRollDicesBtn() {
        if(this.playerVar.varElements.isRolling) {
            this.playerVar.DOMElements.rollDiceBtn.style.boxShadow = '2px 5px 40px white';
        } else {
            this.playerVar.DOMElements.rollDiceBtn.style.boxShadow = 'none';
        }
    }

    beforeBetting() {
        this.playerVar.varElements.isRolling = false;
        this.playerVar.varElements.isPlaying = true;
        this.playerVar.varElements.isBetting = true;
        this.highlightPlayerContainer();
        this.highlightBetsContainer();
    }

    afterBetting() {
        this.playerVar.varElements.isBetting = false;
        this.highlightBetsContainer();

        this.playerVar.varElements.isRolling = true;
        this.highlightRollDicesBtn();
    }

    afterRollingDices() {
        this.playerVar.varElements.isRolling = false;
        this.playerVar.varElements.isPlaying = false;
        this.highlightPlayerContainer();
        this.highlightRollDicesBtn();
    }

    beforeRollingDices() {
        this.playerVar.varElements.isRolling = true;
        this.playerVar.varElements.isPlaying = true;
        this.highlightPlayerContainer();
        this.highlightRollDicesBtn();

        // console.log('--- Before Rolling dices  ---' + `${this.playerVar.DOMElements.playerName.textContent}`);
        // console.log(`IsBetting: ${this.playerVar.varElements.isBetting}`);
        // console.log(`IsPlaying: ${this.playerVar.varElements.isPlaying}`);
        // console.log(`IsRolling: ${this.playerVar.varElements.isRolling}`);
    }

    stopPlaying() {
        this.playerVar.varElements.isBetting = false;
        this.playerVar.varElements.isPlaying = false;
        this.playerVar.varElements.isRolling = false;
        this.highlightPlayerContainer();
        this.highlightBetsContainer();
        this.highlightRollDicesBtn();
    }
}

 /*
*WINDOWS ANIMATIONS
*/ 
const displayingWindow = (theWindow) => {
    theWindow.classList.toggle('zoomIn');
    theWindow.classList.toggle('zoomOut');
    theWindow.style.display = 'block';
};

const hiddingWindow = (theWindow) => {
    theWindow.classList.toggle('zoomIn');
    theWindow.classList.toggle('zoomOut');
    setTimeout(() => theWindow.style.display = 'none', 1000);
};

 // Main controller
 const gameController = (() => {
     // Players Data
     const player1Data = playerData(1);
     const player2Data = playerData(2);

    // Players  
    const player1 = new Player(1, player1Data);
    const player2 = new Player(2, player2Data);

    // Game variables controller
    const playController = () => {
        if(player1Data.varElements.sumDicesVal > player2Data.varElements.sumDicesVal) {
            player1Data.varElements.totalMoney += gameData.varElements.currentBet;
            player2Data.varElements.totalMoney -= gameData.varElements.currentBet;    
        } else if(player1Data.varElements.sumDicesVal < player2Data.varElements.sumDicesVal) {
            player1Data.varElements.totalMoney -= gameData.varElements.currentBet;
            player2Data.varElements.totalMoney += gameData.varElements.currentBet;
        } else {
            // Draw round do nothing
        }
        gameData.DOMElements.currentBet.textContent = '$' + 0;
        player1.displayingPlayerMoney();
        player2.displayingPlayerMoney();
    };

    const displayingBets = () => {
        if(player1.amountOfBets() < 6) {
            for(let n = player1.amountOfBets() + 1; n <= 6; n++) {
                selectClass(`.bets-1 .bet-${n}`).style.display = 'none';
                selectClass(`.bets-2 .bet-${n}`).style.display = 'none';
            }

            for(let n = 1; n <= player1.amountOfBets(); n++) {
                selectClass(`.bets-1 .bet-${n}`).style.display = 'inline-block';
                selectClass(`.bets-2 .bet-${n}`).style.display = 'inline-block';
            }
        } else if(player2.amountOfBets() < 6) {
            for(let n = 1; n <= player2.amountOfBets(); n++) {
                selectClass(`.bets-1 .bet-${n}`).style.display = 'inline-block';
                selectClass(`.bets-2 .bet-${n}`).style.display = 'inline-block';
            }

            for(let n = player2.amountOfBets() + 1; n <= 6; n++) {
                selectClass(`.bets-1 .bet-${n}`).style.display = 'none';
                selectClass(`.bets-2 .bet-${n}`).style.display = 'none';
            }
        } else if(player1.amountOfBets() === 6 && player2.amountOfBets() === 6) {
            for(let n = 1; n <= 6; n++) {
                selectClass(`.bets-1 .bet-${n}`).style.display = 'inline-block';
                selectClass(`.bets-2 .bet-${n}`).style.display = 'inline-block';
            }
        }
    };

    const checkingGameOver = () => {
        if(player1Data.varElements.totalMoney <= 0 || player2Data.varElements.totalMoney <= 0 || 
            gameData.varElements.countRollDices === gameData.varElements.totalMaxBets) {
            player1.stopPlaying();
            player2.stopPlaying();
            if(player1Data.varElements.totalMoney > player2Data.varElements.totalMoney) {
                player1Data.DOMElements.playerName.style.opacity = '.2';
                player1Data.DOMElements.winnerDisplay.style.display = 'block';
            } else if(player1Data.varElements.totalMoney < player2Data.varElements.totalMoney) {
                player2Data.DOMElements.playerName.style.opacity = '.2';
                player2Data.DOMElements.winnerDisplay.style.display = 'block';
            } else if(player1Data.varElements.totalMoney === player2Data.varElements.totalMoney) {
                gameData.DOMElements.statContainer.style.opacity = '.2';
                gameData.DOMElements.drawGame.style.display = 'block';
            }
        }
    };

     // Adding players name and money
     window.addEventListener('load', () => {
        player1.displayOnLoad();
        player2.displayOnLoad();
        player1.beforeBetting();
     });

     // Handling the selected bet by player 1
     player1Data.DOMElements.betsContainer.addEventListener('click', (e) => {
        if(player1Data.varElements.isBetting) {
            player1.clickOnBet(e);
        }
     });

     // Handling the selected bet by payer 2
     player2Data.DOMElements.betsContainer.addEventListener('click', (e) => {
        if(player2Data.varElements.isBetting) {
            player2.clickOnBet(e);
        }
    });

    player1Data.DOMElements.rollDiceBtn.addEventListener('click', () => {
        if(player1Data.varElements.isRolling) {
            player1.rollingDices();
            
            // Switching player
            if(gameData.varElements.countRollDices % 2 === 0) {
                playController();
                player1.beforeBetting();
            } else {
                player2.beforeRollingDices();
            }
        }
        displayingBets();
        checkingGameOver();
    });

    player2Data.DOMElements.rollDiceBtn.addEventListener('click', () => {
        if(player2Data.varElements.isRolling) {
            player2.rollingDices();
            
            // Switching Player
            if(gameData.varElements.countRollDices % 2 === 0) {
                playController();
                player2.beforeBetting();
            } else {
                player1.beforeRollingDices();
            }
        }
        displayingBets();
        checkingGameOver();
    });

    // Displaying new game window
    selectClass('.newGameBtn').addEventListener('click', () => 
    displayingWindow(selectClass('.newGame')));

    // Hidding the new game window
    selectClass('.noNewGame').addEventListener('click', () => 
    hiddingWindow(selectClass('.newGame')));

    // Displaying the quit window
    selectClass('.quitBtn').addEventListener('click', () => {
        displayingWindow(selectClass('.quit'));
    });

    // Hidding the quit window
    selectClass('.noQuit').addEventListener('click', () => 
        hiddingWindow(selectClass('.quit')));
 })();


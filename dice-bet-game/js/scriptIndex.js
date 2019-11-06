/**
 * ELEMENTS SELECTORS
*/
const selectClass = (className) => document.querySelector(className);
const selectId = (idName) => document.getElementById(idName);
/**

/*
*WINDOWS ANIMATIONS
*/ 
const displayingWindow = (theWindow) => {
    theWindow.classList.toggle('zoomIn');
    theWindow.classList.toggle('zoomOut')
    theWindow.style.display = 'block';
};

const hiddingWindow = (theWindow) => {
    theWindow.classList.toggle('zoomIn');
    theWindow.classList.toggle('zoomOut');
    setTimeout(() => theWindow.style.display = 'none', 1000);
};

/*
*SAVING SETTING
*/ 
const savingSettings = () => {
    localStorage.setItem('maxBet',selectId('rangeValue').value);
    localStorage.setItem('player-1',selectId('player-1-name').value);
    localStorage.setItem('player-2',selectId('player-2-name').value);
};

/*
*UPDATING SETTING
*/
const updatingSetting = () => {
        selectId('rangeValue').value = localStorage.getItem('maxBet');
        selectId('rangeValueDispl').textContent = localStorage.getItem('maxBet');
        selectId('player-1-name').value = localStorage.getItem('player-1');
        selectId('player-2-name').value = localStorage.getItem('player-2');
};

/*
 *  SETTING CONTROLLER
 */
const settingController = (() => {
    selectId('settings-btn').addEventListener('click', () => {
        updatingSetting();
        displayingWindow(selectClass('.settings'))
    });

    selectId('cancel').addEventListener('click', () => 
    hiddingWindow(selectClass('.settings')));

    selectId('done').addEventListener('click', () => {
        savingSettings();
        hiddingWindow(selectClass('.settings'));
    });
})();

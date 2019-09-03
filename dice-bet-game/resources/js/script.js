$(document).ready(function() {
    
    /*### Players ###*/

    var player1 = { 
        isChoosingBet: true,
        isPlaying: false,
        name: $.cookie("player1Name"),
        currentBet: 0,
        maxBet: parseFloat($.cookie("maxBet") || 100),
        dicesSumValue: 0,
        contentBox: ".js-contentPlayer-player1",
        betsBox: ".js-contentPlayerBets-player1",
        rollDicesBtn: ".js-rollDicesPlayer1",
        winnerText: ".js-winnerPlayer1",
        playerNameContainer: ".js-contentPlayerName1",
        betArrow: ".player1-arrow"
    };
    
    var player2 = {
        isChoosingBet: false,
        isPlaying: false,
        name: $.cookie("player2Name"),
        currentBet: 0,
        maxBet: parseFloat($.cookie("maxBet") || 100),
        dicesSumValue: 0,
        contentBox: ".js-contentPlayer-player2",
        betsBox: ".js-contentPlayerBets-player2",
        rollDicesBtn: ".js-rollDicesPlayer2",
        winnerText: ".js-winnerPlayer2",
        playerNameContainer: ".js-contentPlayerName2",
        betArrow: ".player2-arrow"
    };
    
    /*### Displaying players values from objects or cookies ###*/
    $(".js-rangeValue").text($(".js-rangeElm").val());
    
    $(".js-maxBetUpdate1").text("$" + player1.maxBet);
    $(".js-maxBetUpdate2").text("$" + player2.maxBet);
    
    $(".js-contentPlayerName1").text(player1.name);
    $(".js-contentPlayerName2").text(player2.name);
    
    /*### Animations ####*/
    $(".js-settingBtn").click(function(){ 
        $(".js-settings").css("display", "block");
        myAnimation(".js-settings", "zoomIn", "zoomOut");
    });
    
    $(".js-newGame").click(function(){ 
        $(".js-newGameAlert").css("display", "block");
        $(".js-dices").css("opacity", "0.4");
        myAnimation(".js-newGameAlert", "zoomIn", "zoomOut");
    });
    
    $(".js-quitA").click(function(){ 
        $(".js-quitDiv").css("display", "block");
        $(".js-dices").css("opacity", "0.4");
        myAnimation(".js-quitDiv", "zoomIn", "zoomOut");
    });
    
    $(".js-no").click(function(){ 
        setTimeout(function(){
            $(".js-newGameAlert").css("display", "none");
        }, 1000);
        $(".js-dices").css("opacity", "1");
        myAnimation(".js-newGameAlert", "zoomOut", "zoomIn");
    });
    
    $(".js-noQuit").click(function(){ 
        setTimeout(function(){
            $(".js-quitDiv").css("display", "none");
        }, 1000);
        $(".js-dices").css("opacity", "1");
        myAnimation(".js-quitDiv", "zoomOut", "zoomIn");
    });
    
    $(".js-done").click(function() {   
        setTimeout(function(){
            $(".js-settings").css("display", "none");
        }, 1000);
        myAnimation(".js-settings", "zoomOut", "zoomIn");
        
        $.cookie("maxBet", $("#rangeValue").val());
        $.cookie("player1Name", $(".js-player1-name").val() || "Player 1");
        $.cookie("player2Name", $(".js-player2-name").val() || "Player 2");
    });
    
    $(".js-cancel").click(function() {   
        setTimeout(function(){
            $(".js-settings").css("display", "none");
        }, 1000);
        myAnimation(".js-settings", "zoomOut", "zoomIn");
    });
    
    function myAnimation(element, newAnimation, oldAnimation) {
       if(oldAnimation) { 
            $(element).removeClass("animated " + oldAnimation);   
            $(element).addClass("animated " + newAnimation); 
        } 
    }
    
    /*### Hightlights to help the current player ###*/
    
        $(".js-contentPlayerBets-player1").css("box-shadow", "0 5px 60px white");
        $(".js-contentPlayer-player1").css("box-shadow", "0 5px 60px white");
    
    /*### Applying functions on elements ###*/
    
    $(".js-rollDicesPlayer1").click(function(){
        rollDices(player1, player2);
        hightlightBoxes();
        $(".js-maxBetUpdate1").text("$" + player1.maxBet);
        $(".js-maxBetUpdate2").text("$" + player2.maxBet);
        checkWinner(player1, player2);
        hiddenBets(".js-10dollars-player1",
                   ".js-15dollars-player1",
                   ".js-20dollars-player1",
                   ".js-25dollars-player1",
                   ".js-30dollars-player1",
                   ".js-10dollars-player2",
                   ".js-15dollars-player2",
                   ".js-20dollars-player2",
                   ".js-25dollars-player2",
                   ".js-30dollars-player2");
    });
    $(".js-rollDicesPlayer2").click(function(){
        rollDices(player2, player1);
        hightlightBoxes();
        $(".js-maxBetUpdate1").text("$" + player1.maxBet);
        $(".js-maxBetUpdate2").text("$" + player2.maxBet);
        checkWinner(player1, player2);
        hiddenBets(".js-10dollars-player1",
                   ".js-15dollars-player1",
                   ".js-20dollars-player1",
                   ".js-25dollars-player1",
                   ".js-30dollars-player1",
                   ".js-10dollars-player2",
                   ".js-15dollars-player2",
                   ".js-20dollars-player2",
                   ".js-25dollars-player2",
                   ".js-30dollars-player2");
    });
    
    $(".js-5dollars-player1").click(function(){
        betAmount(".js-5dollars-player1", player1);
        hightlightLiToButton(player1);});
    $(".js-10dollars-player1").click(function(){
        betAmount(".js-10dollars-player1", player1);
        hightlightLiToButton(player1);});
    $(".js-15dollars-player1").click(function(){
        betAmount(".js-15dollars-player1", player1);
        hightlightLiToButton(player1);});
    $(".js-20dollars-player1").click(function(){
        betAmount(".js-20dollars-player1", player1);
        hightlightLiToButton(player1);});
    $(".js-25dollars-player1").click(function(){
        betAmount(".js-25dollars-player1", player1);
        hightlightLiToButton(player1);});
    $(".js-30dollars-player1").click(function(){
        betAmount(".js-30dollars-player1", player1);
        hightlightLiToButton(player1);});

    $(".js-5dollars-player2").click(function(){
        betAmount(".js-5dollars-player2", player2);
        hightlightLiToButton(player2);});
    $(".js-10dollars-player2").click(function(){
        betAmount(".js-10dollars-player2", player2);
        hightlightLiToButton(player2);});
    $(".js-15dollars-player2").click(function(){
        betAmount(".js-15dollars-player2", player2);
        hightlightLiToButton(player2);});
    $(".js-20dollars-player2").click(function(){
        betAmount(".js-20dollars-player2", player2);
        hightlightLiToButton(player2);});
    $(".js-25dollars-player2").click(function(){
        betAmount(".js-25dollars-player2", player2);
        hightlightLiToButton(player2);});
    $(".js-30dollars-player2").click(function(){
        betAmount(".js-30dollars-player2", player2);
        hightlightLiToButton(player2);});

    
    /*### Game button functions ###*/
    
    var diceValue1;        
    var diceValue2;
    var playerBet = 0;
    var countBeforeScoreUpdate = 0;
    var maxDicesRolling = 49;
    
    function rollDices(playerRolling, otherPlayer) {
        if(playerRolling.isPlaying){
            diceValue1 = Math.floor(Math.random() * 6) + 1;        
            diceValue2 = Math.floor(Math.random() * 6) + 1;

            $(".js-dice-1").attr("src", "../resources/img/" + diceValue1 + ".jpg");
            $(".js-dice-2").attr("src", "../resources/img/" + diceValue2 + ".jpg");

            playerRolling.dicesSumValue = diceValue1 + diceValue2;  
            updateScores();
            
            if(playerRolling.isChoosingBet) {
                playerRolling.isPlaying = false;
                playerRolling.isChoosingBet = false;
                otherPlayer.isPlaying = true;
                otherPlayer.isChoosingBet = false;
            } else {
                playerRolling.isPlaying = false;
                playerRolling.isChoosingBet = true;
                otherPlayer.isPlaying = false;
                otherPlayer.isChoosingBet = false;
            }
                        
        } else {
            return;
        }
        
        console.log(playerBet);
        console.log(countBeforeScoreUpdate);
        console.log("In RollDices: ", player1);
        console.log("In RollDIces: ", player2);
    }
    
    function betAmount(element, player) {
        
        if(player.isChoosingBet) {
            playerBet = $(element).val();
            $(".js-betValue p").text("$" + playerBet);
            player.isPlaying = true;
            player1.currentBet = playerBet;
            player2.currentBet = playerBet;   
        } else {
            return;  
        }
        
        console.log(playerBet);
        console.log(countBeforeScoreUpdate);
        console.log("Inside betAmount: ", player1);
        console.log("Inside betAmount: ", player2);
    }
    
    function updateScores() {
        
        if(countBeforeScoreUpdate % 2 === 1) {
            if(player1.dicesSumValue > player2.dicesSumValue) {
                player1.maxBet += playerBet;
                player2.maxBet -= playerBet;
                $(".js-betValue p").text("$0");
            } else if(player1.dicesSumValue < player2.dicesSumValue) {
                player1.maxBet -= playerBet;
                player2.maxBet += playerBet;
                $(".js-betValue p").text("$0");
            }
            countBeforeScoreUpdate++;
        } else {
            countBeforeScoreUpdate++;
        }
    }
    
    function hightlightBoxes() {
        if(countBeforeScoreUpdate === 0 ||
           countBeforeScoreUpdate % 4 === 0 ||
           (countBeforeScoreUpdate + 1) % 4 === 0) {
            $(player2.contentBox).css("box-shadow", "none");
            $(player1.contentBox).css("box-shadow", "0 5px 60px white");
            
            if(player1.isPlaying) {
                $(player2.rollDicesBtn).css("box-shadow", "none");
                $(player1.rollDicesBtn).css("box-shadow", "0 5px 40px white");
            } else {
                $(player1.betsBox).css("box-shadow", "0 5px 40px white");
            }
            
        } else {
            $(player1.contentBox).css("box-shadow", "none");
            $(player2.contentBox).css("box-shadow", "0 5px 60px white"); 
            
            if(player2.isPlaying) {
                $(player1.rollDicesBtn).css("box-shadow", "none");
                $(player2.rollDicesBtn).css("box-shadow", "0 5px 40px white");
            } else {
                $(player2.betsBox).css("box-shadow", "0 5px 40px white");
                $(player2.rollDicesBtn).css("box-shadow", "none");
            }   
        }
    }
    
    function hightlightLiToButton(player) {
        if(player.isPlaying) {
           $(player.rollDicesBtn).css("box-shadow", "0 5px 40px white");
        }
    
        $(player.betsBox).css("box-shadow", "none");   
    }
    
    function displayWinnerText(player) {
        $(player.winnerText).css("display", "block");
        $(player.winnerText).addClass("animated fadeInDown");
        $(player.playerNameContainer).css("opacity", "0.1");
    }
    
     function displayDrawGameText() {
        $(".js-drawGame p").css("display", "block");
        $(".js-drawGame p").addClass("animated fadeInDown");
        $(".js-dices").css("opacity", "0.1");
    }
    
    function checkWinner(player1, player2) {
        if(player1.maxBet <= 0){ 
            stopGame();
            displayWinnerText(player2);
            
            return;
        } else if(player2.maxBet <= 0) {
            stopGame();
            displayWinnerText(player1);
            
            return;
        } else if(countBeforeScoreUpdate === maxDicesRolling && player1.maxBet > player2.maxBet) {
            stopGame(); 
            displayWinnerText(player1);
            return;
        } else if(countBeforeScoreUpdate === maxDicesRolling && player1.maxBet < player2.maxBet) {
            stopGame();   
            displayWinnerText(player2);
            return;
        } else if(countBeforeScoreUpdate === maxDicesRolling && player1.maxBet === player2.maxBet) {
            stopGame();   
            displayDrawGameText();
            return;
        }
    }
    
    function stopGame() {
        player1.isPlaying = false;
        player1.isChoosingBet = false;
        player2.isPlaying = false;
        player2.isChoosingBet = false;
    }
    
    function hiddenBets(b10, b15, b20, b25, b30, bt10, bt15, bt20, bt25, bt30) {
        
        if(player1.maxBet < 30 || player2.maxBet < 30) {
            $(b30).css("display", "none");   
            $(bt30).css("display", "none");   
        } else {
            $(b30).css("display", "inline-block");
            $(bt30).css("display", "inline-block");
        }
        
        if(player1.maxBet < 25 || player2.maxBet < 25) {
            $(b25).css("display", "none");   
            $(bt25).css("display", "none");   
        } else {
            $(b25).css("display", "inline-block");
            $(bt25).css("display", "inline-block");
        }
        
        if(player1.maxBet < 20 || player2.maxBet < 20) {
            $(b20).css("display", "none");   
            $(bt20).css("display", "none");   
        } else {
            $(b20).css("display", "inline-block");
            $(bt20).css("display", "inline-block");
        }
        
        if(player1.maxBet < 15 || player2.maxBet < 15) {
            $(b15).css("display", "none");   
            $(bt15).css("display", "none");   
        } else {
            $(b15).css("display", "inline-block");
            $(bt15).css("display", "inline-block");
        }
        
        if(player1.maxBet < 10 || player2.maxBet < 10) { 
            $(b10).css("display", "none");  
            $(bt10).css("display", "none");  
        } else {
            $(b10).css("display", "inline-block");
            $(bt10).css("display", "inline-block");
        }
        
    } 
});
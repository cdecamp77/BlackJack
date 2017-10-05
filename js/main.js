var playerTotal = 0;
var dealerTotal = 0;
var playerHand = [];
var dealerHand = [];
var bank = "$" + 1000;
var wager = "$" + 100;


$(function(){
  /*----- constants -----*/
var cards = [
    {'ace11': 11,
    'ace1': 1,
     'king' : 10,
     'queen': 10,
     'jack': 10,
     'ten': 10,
     'nine': 9,
     'eight': 8,
     'seven': 7,
     'six': 6,
     'five': 5,
     'four': 4,
     'three': 5,
     'two': 2,
    }];





/*----- app's state (variables) -----*/






/*----- cached element references -----*/

var playerTotal = 7;
var dealerTotal = 7;
function aceP (playerTotal) {
  if (playerTotal + 11 === 21) {
    //WIN if playerTotal > dealerTotal
    //PUSH if playerTotal === dealerTotal
    console.log(playerTotal);
  } else if (playerTotal + 11 <= 20) {
  playerTotal = playerTotal + 11;
  // option to hit or stay 
      console.log(playerTotal);
} else {
  playerTotal = playerTotal + 1;
  // option to hit or stay
      console.log(playerTotal);
}
}


function aceD (dealerTotal) {
  if (dealerTotal + 11 === 21 && dealerTotal + 11 >= 18) {
    //Dealer stays
    console.log(dealerTotal);
  } else if (dealerTotal + 11 === 17) {
    dealerTotal = dealerTotal + 11;
    // dealer hits
        console.log(dealerTotal);
  } else if (dealerTotal + 11 <= 16) {
    dealerTotal = dealerTotal + 11;
    //dealer hits
        console.log(dealerTotal);
  } else { 
    dealerTotal = dealerTotal + 1;
        console.log(dealerTotal);
  }
}






/*----- event listeners -----*/
$('.deal').on('click', function(deal) {
    console.log('deal')
    // Store Bet amount in a VAR
    //dealer receives 1 card face up and 
    // one card face down.
    // player receives 2 cards face up
});

$('.hit').on('click', function(){
    console.log('hit')
    // adds one card to the players hand and
    // add the value to the 1st 2 cards
    // if total is <= 21 keep playing...
    // Else you lose, subtract Bet from 
    // players Bank
});

$('.stay').on('click', function(stay) {
    console.log('stay')
    // player has opted to stay with 
    // cards value.
    // turn goes to the Dealer.
    // Dealer hits until their total is
    // >= 17.
    // If dealerHand > playerHand...
    // player loses. Subt Bet from Bank
    //If dealerHand = playerHand...
    // PUSH
    // If dealerHand < playerHand ....
    // Player wins, add Bet to Bank
});






/*----- functions -----*/



});
/*----- constants -----*/
var playerHand = [];
var dealerHand = [];
var bank = "$" + 1000;
var wager = "$" + 100;
var winner = null;
var deck = new Deck();
var dealerTotal = computeHand(dealerHand);
var playerTotal = computeHand(playerHand);


/*----- app's state (variables) -----*/
function Card(value, name, suit) {
  this.value = value;
  this.name = name;
  this.suit = suit;
}

function Deck() {
  this.cards = [];
}

Deck.prototype.createAllCards = function () {
  for (var s = 0; s < Deck.suits.length; s++) {
    for (var n = 0; n < Deck.names.length; n++) {
      this.cards.push(new Card(Deck.values[n], Deck.names[n], Deck.suits[s]));
    }
  }
}

Deck.names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
Deck.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
Deck.suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];

/*----- cached element references -----*/
// if player gets an ace
// function aceP(playerTotal) {
//   if (playerTotal + 11 === 21) {
//     //WIN if playerTotal > dealerTotal
//     //PUSH if playerTotal === dealerTotal
//     console.log("21");
//   } else if (playerTotal + 11 <= 20) {
//     playerTotal = playerTotal + 11;
//     // option to hit or stay 
//     console.log('ace becomes 11', playerTotal);
//   } else {
//     playerTotal = playerTotal + 1;
//     // option to hit or stay
//     console.log('ace is 1', playerTotal);
//   }
// }

// if dealer gets an ace
// function aceD(dealerTotal) {
//   if (dealerTotal + 11 === 21 && dealerTotal + 11 >= 18) {
//     console.log("Dealer stays", dealerTotal);
//   } else if (dealerTotal + 11 === 17) {
//     dealerTotal = dealerTotal + 11;
//     dealerHand(dealRandomCard());
//     console.log("dealer hits, soft 17", dealerTotal);
//   } else if (dealerTotal + 11 <= 16) {
//     dealerTotal = dealerTotal + 11;
//     dealerHand(dealRandomCard());
//     console.log("dealer hits <=16", dealerTotal);
//   } else {
//     dealerTotal = dealerTotal + 1;
//     dealerHand(dealRandomCard());
//     console.log("dealer ace 1", dealerTotal);
//   }
// }

/*----- event listeners -----*/
$(function () {

  // var deal = function (deck) {
  // // var card = deck.splice(Math.floor(Math.random() * deck.length), 1);
  // playerHand =  deck.splice(Math.floor(Math.random() * deck.length), 1);
  // dealerHand = deck.splice(Math.floor(Math.random() * deck.length), 1);
  // }

  $('.deal').on('click', function () {

    deal();
    
    console.log(computeHand(playerHand))
    console.log(computeHand(dealerHand))
    // Store Bet amount in a VAR
    //dealer receives 1 card face up and 
    // one card face down.
    // player receives 2 cards face up
  });

  $('.hit').on('click', function () {
    playerHand.push(dealRandomCard());
    var playerTotal = computeHand(playerHand);
    var dealerTotal = computeHand(dealerHand);
    if (playerTotal > 21 && dealerTotal <= 21) {
      console.log('Bust, player loses');
    }
    console.log(computeHand(playerHand))
    console.log(computeHand(dealerHand))
    // adds one card to the players hand and
    // add the value to the 1st 2 cards
    // if total is <= 21 keep playing...
    // Else you lose, subtract Bet from 
    // players Bank
  });

  $('.stay').on('click', function () {
      computeHand(dealerHand);
      if (dealerTotal === 21) {
          console.log('dealer wins');
      } else
    if (dealerTotal < 17) {
      dealerHand.push(dealRandomCard());
      computeHand(dealerHand);
      console.log('dealer hit', dealerTotal);
   } else if (dealerTotal === playerTotal && dealerTotal >= 17) {
      console.log('push')
    } 
     else if (dealerTotal > playerTotal) {
      console.log('Dealer wins', dealerHand)
    } else {
      console.log('player wins');
    }

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
});

/*----- functions -----*/

//deals random card from Deck
function dealRandomCard() {
  return deck.cards.splice(Math.floor(Math.random() * deck.cards.length), 1)[0];
}

function deal() {
    if (playerHand.length == 0) {
      playerHand.push(dealRandomCard());
      playerHand.push(dealRandomCard());
      dealerHand.push(dealRandomCard());
      dealerHand.push(dealRandomCard());
    } else
    if (dealerTotal == 21 && dealerTotal != 21) {
        console.log('Dealer Wins');
        deal();
   }  else {
        playerHand = [];
        dealerHand = [];
        deal();
    }
}


function computeHand(hand) {
  //return the best hand
  var aceCount = 0;
  var total = hand.reduce(function(acc, card) {
    if (card.value === 11) aceCount++;
    return acc + card.value;
  }, 0);
  while(total > 21 && aceCount) {
      total -= 10;
      aceCount--;
  }
  return total;
}



deck.createAllCards();

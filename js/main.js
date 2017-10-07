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

;


/*----- event listeners -----*/
$(function () {
  $('.deal').on('click', function () {

    deal();
    var playerTotal = computeHand(playerHand);
    var dealerTotal = computeHand(dealerHand);
    messTotal();
    if (dealerTotal === 21 && playerTotal != 21) {
      setMessage('21, dealer wins')
    }
    // setMessage(computeHand(playerHand))
    // setMessage(computeHand(dealerHand))
    // Store Bet amount in a VAR
});

  $('.hit').on('click', function () {
    playerHand.push(dealRandomCard());
    var playerTotal = computeHand(playerHand);
    var dealerTotal = computeHand(dealerHand);
    messTotal();
    if (playerTotal > 21 && dealerTotal < 22) {
      setMessage('Bust, player loses');
    } else if (playerTotal > 21) {
      setMessage('bust, player loses');
    }
    // setMessage(computeHand(playerHand))
    // setMessage(computeHand(dealerHand))
    // Else you lose, subtract Bet from players Bank
  });

  $('.stay').on('click', function () {
    playerTotal = computeHand(playerHand);
    dealerTotal = computeHand(dealerHand);
    messTotal();
    while (dealerTotal <= 16) {
      dealerHand.push(dealRandomCard());
      dealerTotal = computeHand(dealerHand);
      messTotal();
      if (dealerTotal > 21) {
        setMessage('dealer busts');
      }
    }
    if (dealerTotal === playerTotal) {
      setMessage('push')
    } else if (dealerTotal > playerTotal && dealerTotal < 22) {
      setMessage('Dealer wins');
    } else {
      setMessage('player wins');
    }
    // player loses. Subt Bet from Bank
    // Player wins, add Bet to Bank
  });
});

/*----- functions -----*/

//deals random card from Deck
function dealRandomCard() {
  return deck.cards.splice(Math.floor(Math.random() * deck.cards.length), 1)[0];
}
// deals the initial cards to the player and dealer
function deal() {
  if (playerHand.length == 0) {
    playerHand.push(dealRandomCard());
    dealerHand.push(dealRandomCard());
    playerHand.push(dealRandomCard());
    dealerHand.push(dealRandomCard());
  } else {
    playerHand = [];
    dealerHand = [];
    deal();
  }
messTotal();
}

//computes hands for both players, taking acct for aces
function computeHand(hand) {
  var aceCount = 0;
  var total = hand.reduce(function (acc, card) {
    if (card.value === 11) aceCount++;
    return acc + card.value;
  }, 0);
  while (total > 21 && aceCount) {
    total -= 10;
    aceCount--;
  }
  return total;
}

// reshuffle deck at certain point, playing out current hand
function reshuffle() {
    if (Deck.length <= 15) {
        // play current hands and reshuffle
        deal();
    }
}

// displays the totals for user
function messTotal() {
    var playerTotal = computeHand(playerHand);
    var dealerTotal = computeHand(dealerHand);
    document.querySelector('.pTotal').innerHTML = "Player total is " + playerTotal;
    document.querySelector('.dTotal').innerHTML = "Dealer total is " + dealerTotal;
}

//changes the main message
function setMessage(message) {
    document.querySelector('.message').innerHTML = message;
}


deck.createAllCards();

/*----- constants -----*/
var playerHand = [];
var dealerHand = [];
var bank = 1000;
var wager = 0;
var counter = 0;
var winner = false;
var deck = new Deck();
var dealerTotal = computeHand(dealerHand);
var playerTotal = computeHand(playerHand);


/*----- app's state (variables) -----*/
function Card(value, name, suit, img) {
  this.value = value;
  this.name = name;
  this.suit = suit;
  this.img = this.suit + this.name;
}

function Deck() {
  this.cards = [];
}

Deck.prototype.createAllCards = function () {
  for (var s = 0; s < Deck.suits.length; s++) {
    for (var n = 0; n < Deck.names.length; n++) {
      this.cards.push(new Card(Deck.values[n], Deck.names[n], Deck.suits[s], Deck.img));
    }
  }
}

Deck.names = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
Deck.values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11];
Deck.suits = ['h', 'd', 's', 'c'];
;


/*----- event listeners -----*/
$(function () {
  $('.deal').on('click', function () {
    deal();
    counter = counter + 1;
      if (counter ===  5) {
        deck.cards = [];
        deck.createAllCards();
        console.log('reshuffled');
        counter = 0;
    }
    var playerTotal = computeHand(playerHand);
    var dealerTotal = computeHand(dealerHand);
    messTotal();
    document.querySelector('.dTotal').innerHTML = "Dealer showing " + (dealerTotal - dealerHand[0].value);

    document.querySelector('.hit').removeAttribute('disabled');
    document.querySelector('.stay ').removeAttribute('disabled');
    

});

  $('.hit').on('click', function () {
    playerHand.push(dealRandomCard());
    var dealerTotal = computeHand(dealerHand);
    messTotal();
    var playerTotal = computeHand(playerHand);
    if (playerTotal >= 22 ) {
    document.querySelector('.hit').setAttribute('disabled', '');      
    document.querySelector('.stay').setAttribute('disabled', '');      
      bank = bank - wager;
      setMessage('You should have stayed...');
    } 
    computeHand(playerHand);
    document.querySelector('.dTotal').innerHTML = "Dealer showing " + (dealerTotal - dealerHand[0].value);  
  });

  $('.stay').on('click', function () {
    document.querySelector('.hit').setAttribute('disabled', '');
    document.querySelector('.stay').setAttribute('disabled', '');
    document.querySelector('.upBet').removeAttribute('disabled');
    document.querySelector('.downBet').removeAttribute('disabled');
    playerTotal = computeHand(playerHand);
    dealerTotal = computeHand(dealerHand);
    messTotal();
    checkWinner();
    while (dealerTotal <= 16) {
      dealerHand.push(dealRandomCard());
      dealerTotal = computeHand(dealerHand);
      messTotal();
      checkWinner();
  }
  });

  $('.upBet').on('click', function (){
    upBet();
  });
  $('.downBet').on('click', function (){
    downBet();
  });
});

/*----- functions -----*/

//deals random card from Deck
function dealRandomCard() {
  return deck.cards.splice(Math.floor(Math.random() * deck.cards.length), 1)[0];
}
// deals the initial cards to the player and dealer
function deal() {
  setMessage('Player, what would you like to do?');
  if (playerHand.length == 0) {
    playerHand.push(dealRandomCard());
    dealerHand.push(dealRandomCard());
    playerHand.push(dealRandomCard());
    dealerHand.push(dealRandomCard());
    document.querySelector('.upBet').setAttribute('disabled', '');
    document.querySelector('.downBet').setAttribute('disabled', '');
    
  } else {
    playerHand = [];
    dealerHand = [];
    deal();
  }

messTotal();
checkBJ();
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
    if (deck.length <= 15) {
        // play current hands and reshuffle
        deck.createAllCards();
    }
}

// displays the totals for user
function messTotal() {
    var playerTotal = computeHand(playerHand);
    var dealerTotal = computeHand(dealerHand);
    document.querySelector('.pTotal').innerHTML = "Player total is " + playerTotal;
    document.querySelector('.dTotal').innerHTML = "Dealer has " + dealerTotal;
}

//changes the main message
function setMessage(message) {
    document.querySelector('.message').innerHTML = message;
}
 // checks for winner
function checkWinner(playerTotal, dealerTotal) {
  var playerTotal = computeHand(playerHand);
  var dealerTotal = computeHand(dealerHand);
  if (dealerTotal < 22 && dealerTotal > playerTotal) {
    bank = bank - wager;
    document.querySelector('.bankTotal').innerHTML = "Bank Total: $" + bank;
    setMessage('Dealer got you that time...');
    disable();
  } else if (dealerTotal < playerTotal && playerTotal < 22) {
    messTotal();
    bank = bank + wager;
    setMessage("Winner!! Winner!!");
    document.querySelector('.bankTotal').innerHTML = "Bank Total: $" + bank;
    disable();
  } else if (dealerTotal == playerTotal) {
    setMessage('Let this one slide...');
    messTotal();
    disable();
  } 
}

function checkBJ () {
  var playerTotal = computeHand(playerHand);
  var dealerTotal = computeHand(dealerHand);
  if (dealerTotal == 21 && playerTotal != 21) {
    bank = bank - wager;  
    setMessage('Dealer got 21, not your day');
    disable();      

  } else if (playerTotal == 21) {
    bank = bank + (wager * 1.5); 
    disable();
    setMessage('You got 21!!')     
  }
  }

// increases wager amount
function upBet() {
  wager = wager + 50;
  document.querySelector('.wage').innerHTML = "Wage Total: $" + wager;
  document.querySelector('.downBet').removeAttribute('disabled');
  if (wager >= bank) {
    setMessage('Cannot bet more than bank amount');
    document.querySelector('.upBet').setAttribute('disabled', '')
  } 
}

// decreases wager amount
function downBet() {
  wager = wager - 50;
  document.querySelector('.wage').innerHTML = "Wage Total: $" + wager;
  if (wager <= 0 ) {
    document.querySelector('.downBet').setAttribute('disabled', '')
  } if (wager <= bank) {
    document.querySelector('.upBet').removeAttribute('disabled', '');
  }
}

function disable() {
  document.querySelector('.hit').setAttribute('disabled', '');      
  document.querySelector('.stay').setAttribute('disabled', '');      
  document.querySelector('.double').setAttribute('disabled', '');      
  document.querySelector('.split').setAttribute('disabled', '');      

  
}

deck.createAllCards();
document.querySelector('.downBet').setAttribute('disabled', '');


var playerTotal = Card.value;
var dealerTotal = Card.value;
var playerHand = [];
var dealerHand = [];
var bank = "$" + 1000;
var wager = "$" + 100;




/*----- constants -----*/
var deckNames = [
  "sA", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10", "sJ", "sQ", "sK",
  "hA", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9", "h10", "hJ", "hQ", "hK",
  "cA", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "c10", "cJ", "cQ", "cK",
  "dA", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "d10", "dJ", "dQ", "dK",
];


function Card(value, name, suit){
    this.value = value;
    this.name = name; 
    this.suit = suit;
}
// Allows to print nice card name
Card.prototype.toString = function() {
    if(this.value==11 && this.suit == "Spades")
        return "Ace of spades";
    else
        return this.suit+" "+this.name;
}


function Deck() {
     this.cards = [];
}

Deck.prototype.createAllCards = function() {
     for (var s = 0; s < Deck.suits.length; s++) {
         for (var n = 0; n < Deck.names.length; n++) {
            this.cards.push(new Card(Deck.values[n], Deck.names[n], Deck.suits[s]));
         }
     }
}
// These are so called static properties on OOP
// We can just assign those values to Deck() function
// Because they never ever change
Deck.names = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
Deck.values = [2,   3,   4,   5,   6,   7,   8,   9,   10,   10,  10,  10,  11];
Deck.suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs']; 


// Initialise

var deck = new Deck();
deck.createAllCards();
console.log(deck.cards);




/*----- app's state (variables) -----*/






/*----- cached element references -----*/
// if player gets an ace
function aceP(playerTotal) {
  if (playerTotal + 11 === 21) {
    //WIN if playerTotal > dealerTotal
    //PUSH if playerTotal === dealerTotal
    console.log("21");
  } else if (playerTotal + 11 <= 20) {
    playerTotal = playerTotal + 11;
    // option to hit or stay 
    console.log('ace becomes 11', playerTotal);
  } else {
    playerTotal = playerTotal + 1;
    // option to hit or stay
    console.log('ace is 1', playerTotal);
  }
}

// if dealer gets an ace
function aceD(dealerTotal) {
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
$(function () {

  // var deal = function (deck) {
  // // var card = deck.splice(Math.floor(Math.random() * deck.length), 1);
  // playerHand =  deck.splice(Math.floor(Math.random() * deck.length), 1);
  // dealerHand = deck.splice(Math.floor(Math.random() * deck.length), 1);
  // }

  $('.deal').on('click', function (deal) {
    if (playerHand.length == 0) {

      playerHand.push(dealRandomCard());
      playerHand.push(dealRandomCard());

      dealerHand.push(dealRandomCard());
      dealerHand.push(dealRandomCard());
    };


    console.log(playerHand);
    console.log(dealerHand);



    // Store Bet amount in a VAR
    //dealer receives 1 card face up and 
    // one card face down.
    // player receives 2 cards face up
  });

  $('.hit').on('click', function () {
    playerHand.push(dealRandomCard());
    console.log('hit', playerHand)
    // adds one card to the players hand and
    // add the value to the 1st 2 cards
    // if total is <= 21 keep playing...
    // Else you lose, subtract Bet from 
    // players Bank
  });

  $('.stay').on('click', function (stay) {

    if (dealerTotal === playerTotal) {
      console.log('push')
    } else if (dealerTotal < 17) {
      dealerHand.push(dealRandomCard());
      console.log('dealer hit', dealerHand);
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

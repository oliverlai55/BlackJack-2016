var deck = [];
var placeInDeck = 0;
var playerTotalCards = 2;
var dealerTotalCards = 2;
var playerHand;
var dealerHand;

function shuffleDeck(){
	var deck =[];
	//fill our deck, in order (for now)
	//suit 
	var suit = "";
	for(s = 1; s <= 4; s++){
		if(s === 1){
			suit = "h";
		}else if(s === 2){
			suit = "s";
		}else if(s === 3){
			suit = "d";
		}else if(s === 4){
			suit = "c";
		}
		//card number
		for(i = 1; i <= 13; i++){
			deck.push(i+suit);
		}
	}
	console.log(deck);

	// var numberOfTimesToShuffle = Math.floor( Math.random() * 500 + 500);
	var numberOfTimesToShuffle = 2000;

// Math.random() // Create a random 16 digit number between 0 and 1
// //eg .89745839857324985
// .89745839857324985 * 500 = 450.745839857324985
// 450.745839857324985 + 500 = 950.745839857324985
// 950

	//Shuffle the deck
	for(i = 0; i < numberOfTimesToShuffle; i++){
		//pick 2 random cards from the deck. And switch them.
		var card1 = Math.floor(Math.random() * 52);
		var card2 = Math.floor(Math.random() * 52);
		var temp = deck[card2];
		deck[card2] = deck[card1];
		deck[card1] = temp;
	}
	//Shuffled Deck
	console.log(deck);
	return deck;
}


function placeCard(card, who, slot){
	// var currId = who + '-card-' + slot;
	var currId = '#' + who + '-card-' + slot;
	
	// var theDivWithTheCardWeWantToReplace =document.getElementById(currId);
	$(currId).removeClass('empty');
	// theDivWithTheCardWeWantToReplace.className = "card";
	// var dealerCardOne = $('$dealer-card-one');



	if (card.indexOf("h") !== -1 ){
		var suit = "h";
	}

	//check what is card = (without suit)
	//if 11...10/J
	//if 12...10/Q
	//if 13.. 10/K
	//if A oo 1/11
	//index if it shows up as -1  it means it doesn't find it
	// card[2] is adding 3rd position of 11"d"  of the array
		var isJack = card.indexOf("11")
		if (isJack !== -1) {
			card = "J" + card[2];
		}
		else if (card.indexOf("12") === 0) {
			card = "Q" + card[2];
		}
		else if (card.indexOf("13") === 0) {
			card = "K" + card[2];
		}
		else {
			card = card
		}
		// theDivWithTheCardWeWantToReplace.innerHTML = card;
		$(currId).html(card);
		//document.getElementById(currId).innerHTML = card;
	
}


function bust(who){
	if(who === "player"){
		//player lost!! Dealer Won!!
		// document.getElementById('message').innerHTML = "You have busted"
		$(message).html("you have busted")

	}else {
		// document.getElementById('message').innerHTML = "The dealer has busted"
		$(message).html("The dealer has busted")

	}
}

function calculateTotal(hand, who){
	var total = 0;

	for (i-0; i < hand.length; i++) {
		if (hand[i] === 1) {
			hand.push(hand[i])
			hand.splice(i, 1)
			if( i !== hand.length) {
				i--
			}
		}
	}

	for(i=0; i< hand.length; i++){
		var cardValue = Number(hand[i].slice(0, -1)); //-1 is the number from the end, instead of form the beginning
			if(cardValue > 10) {
				cardValue = 10
			if(cardValue = 1) {
				if(total + 11 < 22) {
					cardValue = 11
				}
				else if(total + 11 > 21) {
					cardValue = 1
				}
			}
			}

			total = total + cardValue;
		}

		
	
			
		//total += cardValue
	var idWhoToGet = who + '-total';
	document.getElementById(idWhoToGet).innerHTML = total;

	//check for bust
	if(total > 21) {
		bust(who);
		console.log(total);

	}
	return total;
}


function deal(){
	//Shuffled deck from function shuffleDeck
	deck = shuffleDeck();
	playerHand = [ deck[0], deck[2] ];
	dealerHand = [ deck[1], deck[3] ];
	placeInDeck = 4; //make a note that we are on the 4th card in the deck

	placeCard(playerHand[0], 'player', 'one');
	placeCard(dealerHand[0], 'dealer', 'one');
	placeCard(playerHand[1], 'player', 'two');
	placeCard(dealerHand[1], 'dealer', 'two');

	calculateTotal(playerHand, 'player');
	calculateTotal(dealerHand, 'dealer');
}

function hit(){
	var slot;
	if(playerTotalCards === 2) { slot = "three";} //setting up where to put the card
	else if(playerTotalCards === 3) { slot = "four";}
	else if(playerTotalCards === 4) { slot = "five";}
	else if(playerTotalCards === 5) { slot = "six";}

	placeCard(deck[placeInDeck],'player',slot);
	playerHand.push(deck[placeInDeck]); 
	playerTotalCards++;
	placeInDeck++;
	calculateTotal(playerHand, 'player');


}

function checkWin(){
	//get player total
	//get dealer total
	//who is higher but less than 21
	//set up a message
	var playerTotal = calculateTotal(playerHand, 'player')
	var dealerTotal = calculateTotal(dealerHand, 'dealer')
	if ((playerTotal > dealerTotal) && (playerTotal < 22)) {
		document.getElementById('message').innerHTML = "You have Won"
		// var previousWins = document.getElementById('0').innerHTML
		// var presentWins = parseInt(previousWins) + 1;
		// document.getElementById('0').innerHTML = presentWins;
	}
	else if((dealerTotal > playerTotal) && (playerTotal < 22) && (dealerTotal < 22)) {
		document.getElementById('message').innerHTML = "Dealer wins"
	}
	

}



function reset() {
	//empty the deck
	// reset the place in the deck
	//reset the players total cards
	//reset the dealers total cards
	//reset the players hand array
	//reset the dealers hand array
	//reset the message
	//reset all the cards (divs and the empty class)
	document.location.href = " "
	
}


function stand (){
	// var dealHas = calculateTotal(dealerHand, 'dealer');
	// var dealerHas = Number(document.getElementById('dealer-total').innerHTML);
	var dealerHas = Number($('dealer-total').html);
	var slot
	while(dealerHas < 17){
		//keep hitting..keep drawing..get more cards
		if(dealerTotalCards === 2) { slot = "three";}
		else if(dealerTotalCards === 3) { slot = "four";}
		else if(dealerTotalCards === 4) { slot = "five";}
		else if(dealerTotalCards === 5) { slot = "six";}
		placeCard(deck[placeInDeck], 'dealer', slot) //telling where to put the card, which card, who, and where
		dealerHand.push(deck[placeInDeck]);
		dealerHas = calculateTotal(dealerHand, 'dealer');
		placeInDeck++;
		dealerTotalCards++;
	}
	// we know the dealer has more than 17 or we woudl've still be in the loop
	checkWin();

}


function setName(){
	var name = "Rob";
	return name
}

var name = setName(); //it is a function












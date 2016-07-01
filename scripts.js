var deck = [];
var placeInDeck = 0;
var playerTotalCards = 2;
var dealerTotalCards = 2;
var playerHand;
var dealerHand;
var gameIsOver = false;
var winCount = 0



function shuffleDeck(){
	var deck =[];
	//fill our deck, in order (for now)
	//suit
	var suit;
	for(s = 1; s <= 4; s++){
		if(s === 1){
			suit = '<img style="heigth:30px; width:30px;" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRnoX6Anc9Yz80CPF8mbBun9QgYiCzJ52yckKTPZLriDxiO7CUz">';
		}else if(s === 2){
			suit = '<img style="heigth:30px; width:30px;" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQb67elR6XlBtqYoxI55eFZu9t78COJeEPX71Wm2Y_Pb8w4x19">';
		}else if(s === 3){
			suit = '<img style="heigth:30px; width:30px;" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTgqOmctz_qmRiH4VB_19djpmvaUeEtyGWBei_aZM1TlgQeju0K">';
		}else if(s === 4){
			suit = '<img style="heigth:30px; width:30px;" src="https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRP6Mgkux8OzT1mfIt-hV0jvhYX9xpA9I1V-rJzXonNnjxquIEfJQ">';
		}
		//card number
		for(i = 1;i <= 13; i++){
			switch (true) {
				case (i === 1):
					deck.push("A"+suit)
				break;
				case ((i > 1) && (i < 11)):
					deck.push(i+suit);
				break;
				case ((i >= 11) && (i <=13)):
					switch(i) {
						case 11:
							deck.push("J"+suit);
							break;
						case 12:
							deck.push("Q"+suit);
							break;
						case 13:
							deck.push("K"+suit);
							break;
					}
				break;
				default:
					alert("Error out of deck array index!");
					break;
			}
		}
	}
	console.log(deck);

	// var numberOfTimesToShuffle = Math.floor( Math.random() * 500 + 500);
	var numberOfTimesToShuffle = 2000;



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

	var currId = '#' + who + '-card-' + slot;

	// Can also use JS: var theDivWithTheCardWeWantToReplace =document.getElementById(currId);
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
	var AcesCount = 0;
	// get the valuel of each element in the user's hand array
	for(i=0;i < hand.length;i++) {
		// slice the letter of the array element
		var cardValue = hand[i].slice(0, hand[i].indexOf("<"));

		// check if card value is a face card or ace and set value
		if(isNaN(cardValue)){
			if(cardValue == 'A') {
				cardValue = 11;
				AcesCount++;
			} else {
				cardValue = 10;
			}
		}

		// make sure card value is number and add it to total
		cardValue = Number(cardValue);
		total += cardValue;

		// handle aces being 1 or 11
		while((AcesCount > 0) && (total > 21)){
			AcesCount--;
			total -= 10;
		}

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
		// var previousWins = document.getElementById('dealer-total').innerHTML
		// var presentWins = parseInt(previousWins) + 1;
		// alert("win plus one");
		// document.getElementById('dealer-total').innerHTML = presentWins;
		winCount = winCount + 1
		$('#win-count').html(winCount);
	}else if((dealerTotal == playerTotal) && (playerTotal < 22) && (dealerTotal < 22)){
		document.getElementById('message').innerHTML = "Tied!"
	}
	else if((dealerTotal > playerTotal) && (playerTotal < 22) && (dealerTotal < 22)) {
		document.getElementById('message').innerHTML = "Dealer wins"
	}


}



function reset() {
	deck = 0;
	//empty the deck

	placeInDeck = 0;
	// reset the place in the deck

	playerHand = [];
	//reset the players hand array

	dealerHand = [];
	//reset the dealers hand array

	playerTotalCards = 2;
	//reset the players total cards

	dealerTotalCards = 2;
	//reset the dealers total cards

	$('#message').html("")
	//reset the message

	$('#player-total').html(0);
	$('#dealer-total').html(0);

	//reset all the cards (divs and the empty class)
	$('.card').addClass('empty');
	$('.card').html('-');

	};




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

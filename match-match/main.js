//Declare functions
function getRandomInt(max) {
    let randomInt = Math.floor(Math.random() * Math.floor(max)); //return a number between 0 and max -1
    return randomInt;
};

function getMultipleOfFour(nb) {
    while (nb%4 != 0) {
        nb++;
    }
    return nb;
}

function shuffle(array) {
    let i, randomSlot, arrayContent;
    for (i = 0; i < array.length; i++) {
        randomSlot = getRandomInt(array.length); //Set random array slot
        arrayContent = array[i]; //Keep the array value in variable
        array[i] = array[randomSlot]; //Put the value of the random slot into the actual slot of array
        array[randomSlot] = arrayContent; //Put the value of the actual slot into the random slot
    }
}

function createCard(cardValue, cardIdNumber) {
    let newCardDiv = document.createElement("button"); //Create button
    let cardValueP = document.createElement("p"); //Create paragraph
    let cardValueText = document.createTextNode(cardValue); //Create text
    cardValueP.appendChild(cardValueText); //Put Text in paragraph
    newCardDiv.appendChild(cardValueP); //Put paragraph in button
    newCardDiv.id = "card" + cardIdNumber; //Set id of button
    card = document.getElementById("game").appendChild(newCardDiv); //Create button in html page
    card.onclick = function showCard() {
        let currentCardId = newCardDiv.id;
        let elem = document.getElementById(currentCardId).getElementsByTagName('p')[0]; //Get the paragraph of the card to check its visibility
        let cardToCheck = getComputedStyle(elem); //Get the visibility of the para to check
        if (cardToCheck.visibility == "hidden" && checking == false)  {
            document.getElementById(currentCardId).getElementsByTagName('p')[0].style.visibility = "visible";
            if (cardClicked != cardValue) { //If the card clicked is different of the last card clicked before
                if (lastCardId == -1) {
                    lastCardId = currentCardId;
                    cardClicked = cardValue;
                } else {
                    checking = true;
                    setTimeout(function makeCardInvisible() {
                        document.getElementById(currentCardId).getElementsByTagName('p')[0].style.visibility = "hidden";
                    }, 1000);
                    setTimeout(function makeCardInvisible() {
                        document.getElementById(lastCardId).getElementsByTagName('p')[0].style.visibility = "hidden";
                        cardClicked = 0;
                        lastCardId = -1;
                        checking = false;
                    }, 1000);
                    turns++;
                    turnsElement.innerText = "turns: "+turns;
                }
            } else {
                lastCardId = -1;
                cardClicked = 0;
                score++;
                scoreElement.innerText = "score : "+score;
                turns++;
                turnsElement.innerText = "turns: "+turns;
                //Reset game when all cards returned
                if (score >= cardNumber/2) {
                    alert("You made it in " + turns + " turns");
                    location.reload();
                }
            }
        }
    };
    return card.id;
}



//Declare variables
let cardsValues = []; //Array of the cards values
let cards = []; //Array of the cards
let cardNumber = getMultipleOfFour((getRandomInt(9)+8)); //Number of cards between 8 and max
let cardValue = 0; //Value of each card
let cardClicked = 0;
let lastCardId = -1;
let score = 0;
let turns = 0;
let scoreElement = document.getElementById("score");
let turnsElement = document.getElementById("turns");
let checking = false;

//Set score and turns to 0
scoreElement.innerText = "score: 0";
turnsElement.innerText = "turns: 0";

//Set values of cards
for (let i=0; i<cardNumber; i++) {
    if (i%2 == 0) {
        cardValue++;
    }
    cardsValues.push(cardValue);
};

//Shuffle cards values
shuffle(cardsValues);

//Create cards
for (let i=0; i<cardNumber; i++) {
    cards.push(createCard(cardsValues[i], i));
}
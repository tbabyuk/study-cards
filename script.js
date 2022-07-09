//DOM ELEMENTS

//Buttons
const btnClear = document.getElementById("btn-clear");
const btnAddCard = document.getElementById("btn-add-card");
const btnNextCard = document.getElementById("btn-next-card");
const btnPrevCard = document.getElementById("btn-prev-card");
const btnSubmitForm = document.getElementById("btn-submit-form");
const btnCloseForm = document.getElementById("btn-close-form");

//Other
const cardsWrapper = document.getElementById("cards-wrapper");
const cards = document.querySelectorAll(".card");
const addCardModal = document.querySelector(".add-card-modal");
const noCardsMsg = document.getElementById("no-cards-message");
const formQuestion = document.getElementById("question");
const formAnswer = document.getElementById("answer");
const currentCard = document.getElementById("current-card");



//Current active card
let currentActiveCard = 0;

//Store DOM cards
const cardsEl = [];

//Pull cards data from local storage, if any exists
const cardsData = getCardsData();

// ============================================ //

//FUNCTIONS

(function checkCards() {
    if(!JSON.parse(localStorage.getItem("cards"))) {
        currentCard.innerText = "0";
    }
})()

//Create cards based on cards data
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
};

createCards();

//Create a single card
function createCard(data, index) {

    const card = document.createElement("div");
    card.className = "card";

    if(index === 0) {
        card.classList.add("active")
    }

    card.innerHTML = `
    <div class="card-inner">
    <div class="card-front">${data.question}</div>
    <div class="card-back">${data.answer}</div>
    </div>
    <span class="btn-flip">&orarr; FLIP</span>
    `;

    card.addEventListener("click", () => {
        card.classList.toggle("flip")
    })

    //Add to DOM cards
    cardsEl.push(card);
    cardsWrapper.appendChild(card);
}

//Get cards from local storage
function getCardsData() {
    const cardsStored = JSON.parse(localStorage.getItem('cards'));
    return cardsStored === null ? [] : cardsStored;
}

//Add card to local storage
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

//Show correct card count and total cards
function updateCurrentCards() {
    if(!JSON.parse(localStorage.getItem("cards"))) {
        currentCard.innerText = `0/0`;
    } else {
        currentCard.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}}

//Don't show "No Cards" message if cards exist in local storage
(function noCardsMessage() {
    if(JSON.parse(localStorage.getItem("cards"))) {
        noCardsMsg.style.opacity = 0;
        cardsWrapper.style.boxShadow = "none";
    }
})()

// ============================================ //

//EVENT LISTENERS

//Next Button
btnNextCard.addEventListener("click", () => {

    cardsEl[currentActiveCard].className = 'card';
    currentActiveCard = currentActiveCard + 1;

    if(currentActiveCard > cardsEl.length -1) {
        currentActiveCard = cardsEl.length - 1;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentCards();
});

//Previous Button
btnPrevCard.addEventListener("click", () => {
    cardsEl[currentActiveCard].className = 'card';

    currentActiveCard = currentActiveCard - 1;

    if(currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentCards();
});

//Open new card modal
btnAddCard.addEventListener("click", () => {
    addCardModal.classList.remove("hidden");
    cardsWrapper.style.display = "none";
    formQuestion.focus();
})

addCardModal.addEventListener("click", (e) => {
    if(e.target.className === "add-card-modal") {
        addCardModal.classList.add("hidden");
        cardsWrapper.style.display = "block"
    }
})

btnCloseForm.addEventListener("click", () => {
    addCardModal.classList.add("hidden");
    cardsWrapper.style.display = "block"
})

btnSubmitForm.addEventListener("click", (e) => {
    e.preventDefault();
    const question = formQuestion.value;
    const answer = formAnswer.value;

    if(question.trim() && answer.trim()) {
        const newCard = {question, answer};

        createCard(newCard);

        formQuestion.value = '';
        formAnswer.value = '';
    
        addCardModal.classList.add("hidden");
    
        cardsData.push(newCard);
        setCardsData(cardsData);
    }
})

updateCurrentCards();


btnClear.addEventListener("click", () => {
    localStorage.clear();
    cardsWrapper.innerHTMl = '';
    window.location.reload();
});
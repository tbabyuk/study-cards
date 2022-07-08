
const addCardModal = document.querySelector(".add-card-modal");
const cardsWrapper = document.getElementById("cards-wrapper");
const cards = document.querySelectorAll(".card");
const btnAddCard = document.getElementById("btn-add-card");
const btnCloseForm = document.getElementById("btn-close-form");
const btnFormSubmit = document.getElementById("btn-form-submit");
const formQuestion = document.getElementById("question");
const formAnswer = document.getElementById("answer");
const currentCard = document.getElementById("current-card");
const btnNextCard = document.getElementById("btn-next-card");
const btnPrevCard = document.getElementById("btn-prev-card");
const btnClear = document.getElementById("btn-clear");


//Current active card
let currentActiveCard = 0;


//Store DOM cards
const cardsEl = [];


//Card data
const cardsData = getCardsData();

// const cardsData = [
//     {
//         question: "Card 1 question?",
//         answer: "Card 1 answer"
//     },
//     {
//         question: "Card 2 question?",
//         answer: "Card 2 answer"
//     },
//     {
//         question: "Card 3 question?",
//         answer: "Card 3 answer"
//     }
// ];


//Create cards based on card data
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
};

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
    <span class="btn-flip">FLIP</span>
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
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

//Add card to local stroage
function setCardsData(cards) {
    localStorage.setItem('cards', JSON.stringify(cards));
    window.location.reload();
}

createCards();


//EVENT LISTENERS

//Next Button
btnNextCard.addEventListener("click", () => {
    // cardsEl[currentActiveCard].className = 
    console.log(currentActiveCard)
    console.log(cardsEl)

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
    // cardsEl[currentActiveCard].className = 
    console.log(currentActiveCard)
    cardsEl[currentActiveCard].className = 'card';

    currentActiveCard = currentActiveCard - 1;

    if(currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cardsEl[currentActiveCard].className = 'card active';

    updateCurrentCards();
});

//Show add container
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

btnFormSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const question = formQuestion.value;
    const answer = formAnswer.value;
    console.log(question, answer)

    if(question.trim() && answer.trim()) {
        const newCard = {question, answer};

        createCard(newCard);

        formQuestion.value = '';
        formAnswer.value = '';
    
        addCardModal.classList.add("hidden");
    
        cardsData.push(newCard);
        setCardsData(cardsData);
    }



    // cardsData.push(newCard);
    // console.log(cardsData);
    // addCardModal.classList.add("hidden");
    // updateCurrentCards();
})


updateCurrentCards();

function updateCurrentCards() {
    currentCard.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}


btnClear.addEventListener("click", () => {
    localStorage.clear();
    cardsWrapper.innerHTMl = '';
    window.location.reload();
})




// const btnFlip = document.querySelectorAll(".btn-flip");
// btnFlip.forEach(btn => {
//     btn.addEventListener("click", (e) => {
//         const currCard = e.target.parentElement;
//         currCard.classList.toggle("rotate")
//     })
// });
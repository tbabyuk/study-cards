
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


//Current active card
let currentActiveCard = 0;


//Store DOM cards
const cardsEl = [];


//Card data
const cardsData = [
    {
        question: "Card 1 question?",
        answer: "Card 1 answer"
    },
    {
        question: "Card 2 question?",
        answer: "Card 2 answer"
    },
    {
        question: "Card 3 question?",
        answer: "Card 3 answer"
    }
];


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

createCards();


//EVENT LISTENERS

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



btnAddCard.addEventListener("click", () => {
    addCardModal.classList.remove("hidden");
    cardsWrapper.style.display = "none"
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


updateCurrentCards();

function updateCurrentCards() {
    currentCard.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}


btnFormSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    const newCard = {
        question: `${formQuestion.value}`,
        answer: `${formAnswer.value}`
    }

    cardsData.push(newCard);
    console.log(cardsData);
    addCardModal.classList.add("hidden");
    updateCurrentCards();
})



// const btnFlip = document.querySelectorAll(".btn-flip");
// btnFlip.forEach(btn => {
//     btn.addEventListener("click", (e) => {
//         const currCard = e.target.parentElement;
//         currCard.classList.toggle("rotate")
//     })
// });
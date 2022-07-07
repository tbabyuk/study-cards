
const cardsWrapper = document.getElementById("cards-wrapper");
const prevBtn = document.getElementById("btn-prev");
const nextBtn = document.getElementById("btn-next");
const currentCard = document.getElementById("current-card");
const openFormBtn = document.getElementById("btn-open-form");
const closeFormBtn = document.getElementById("btn-close-form");
const question = document.getElementById("question");
const answer = document.getElementById("answer");
const createCardBtn = document.getElementById("btn-create-card");
const newCardModal = document.getElementById("create-card-overlay");


createCardBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const q = question.value;
    const a = answer.value;
    console.log(q, a)
})


openFormBtn.addEventListener("click", () => {
    newCardModal.className= " ";
})

closeFormBtn.addEventListener("click", () => {
    newCardModal.className= "hidden";
})



const actionBtn = document.querySelector('.action');
const card3 = document.querySelector(".card3");
const flipper = document.querySelector(".flipper");
const innerCard = document.querySelector(".card-inner");



flipper.addEventListener('click', () => {
    innerCard.classList.toggle("rotate");
})
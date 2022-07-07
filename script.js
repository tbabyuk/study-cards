
const actionBtn = document.querySelector('.action');
const card3 = document.querySelector(".card3");
const flipper = document.querySelector(".flipper");
const innerCard = document.querySelector(".card-inner");



flipper.addEventListener('click', () => {
    innerCard.classList.toggle("rotate");
})
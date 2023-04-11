const itemConteiner = document.querySelector('.carousel-items-conteiner');
const gridConteiner = document.querySelector('.grid-conteiner');
const popupContainer = document.querySelector('.popup__content');


function openPopup() {
    let cardItem = event.target.closest('.card-mini');
    let cardNumber = cardItem.dataset.number;

    popupContainer.innerHTML = createPopup(cardNumber);
    popupContainer.closest('.popup').style.display = 'block';

    body.classList.add('_lock');
    let btnClose = document.querySelector('.popup__close');
    btnClose.addEventListener('click', closePopup);

    popupContainer.closest('.popup').addEventListener('click', function (e) {
        if (!e.target.closest('.popup__content')) {
            closePopup();
        }
    })
}

function closePopup() {
    popupContainer.innerHTML = "";
    popupContainer.closest('.popup').style.display = '';
    body.classList.remove('_lock');
}

function createPopup(i) {
    let template = `
    <div class="popup__close button-round">
        <img src="src/img/icon/icon-close.svg" alt="preview">
    </div>
    <img class="popup__photo" src="src/img/modal/${pets[i].name.toLowerCase()}.png" alt="Jennifer"></img>
    <div class="popup__text">
        <div class="popup__pet-name">
            ${pets[i].name}
        </div>
        <div class="popup__pet-type-breed">
            ${pets[i].type} - ${pets[i].breed}
        </div>
        <div class="popup__pet-description">
            ${pets[i].description}
        </div>

        <ul class="popup__pet-other-props">
            <li class="popup__pet-prop">
                <span class="popup__prop-name">Age:</span>
                <span class="popup__prop-value">${pets[i].age}</span>
            </li>
            <li class="popup__pet-prop">
                <span class="popup__prop-name">Inoculations:</span>
                <span class="popup__prop-value">${pets[i].inoculations}</span>
            </li>
            <li class="popup__pet-prop">
                <span class="popup__prop-name">Diseases:</span>
                <span class="popup__prop-value">${pets[i].diseases}</span>
            </li>
            <li class="popup__pet-prop">
                <span class="popup__prop-name">Parasites:</span>
                <span class="popup__prop-value">${pets[i].parasites}</span>
            </li>
        </ul>
    </div>
    `
    return template;
}

if (itemConteiner) {
    itemConteiner.addEventListener('click', openPopup);
}
if (gridConteiner) {
    gridConteiner.addEventListener('click', openPopup);
}



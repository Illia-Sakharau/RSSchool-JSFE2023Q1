import './styles.scss';

export default function createPopup(title, text, buttonText, func) {
  const popupElem = document.createElement('div');
  const innerElem = document.createElement('div');
  const titleElem = document.createElement('div');
  const textElem = document.createElement('div');
  const buttonElem = document.createElement('button');

  if (localStorage.getItem('ily-theme') === 'light'){
    popupElem.classList.add('popup', 'popup_light');
  } else {
    popupElem.classList.add('popup');    
  }

  buttonElem.classList.add('popup__button');
  buttonElem.textContent = buttonText;

  if (title.length < 20) {
    titleElem.classList.add('popup__title');
  } else {
    titleElem.classList.add('popup__title', 'popup__title_mini');
  }
  
  titleElem.innerHTML = title;



  innerElem.classList.add('popup__inner')
  innerElem.appendChild(titleElem);
  if (text) {
    textElem.classList.add('popup__text');
    textElem.innerHTML = text;
    innerElem.appendChild(textElem);
  }
  innerElem.appendChild(buttonElem);




  popupElem.appendChild(innerElem);


  buttonElem.addEventListener('click', () => {
    document.body.removeChild(popupElem);
    if (func) {
      func();
    }
    
  })

  return popupElem;
}

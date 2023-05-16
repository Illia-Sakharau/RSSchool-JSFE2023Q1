import './styles.scss';



export default function createTextBtn(text) {
  const textBtn = document.createElement('button');
  textBtn.classList.add('text-btn');
  textBtn.textContent = text;

  textBtn.setAttribute('id', text.toLowerCase());

  return textBtn;
}



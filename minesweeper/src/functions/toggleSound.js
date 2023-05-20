export default function toggleSound () {
  const soundBtn = document.querySelector('.top-bar__sound-btn');

  if (!localStorage.getItem('ily-sound')) {
    localStorage.setItem('ily-sound', 'on');
  }

  if (localStorage.getItem('ily-sound') === 'on'){    
    soundBtn.classList.remove('top-bar__sound-btn_off');
  } else {    
    soundBtn.classList.add('top-bar__sound-btn_off');
  }

  soundBtn.addEventListener('click', () => {
    if (localStorage.getItem('ily-sound') === 'on'){
      localStorage.setItem('ily-sound', 'off');
      soundBtn.classList.add('top-bar__sound-btn_off');
    } else {
      localStorage.setItem('ily-sound', 'on');
      soundBtn.classList.remove('top-bar__sound-btn_off');
    }
  })




}
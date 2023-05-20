import './styles.scss';
import HtmlToElement from '../../utils/htmlToElement';

const iconTheme = HtmlToElement(require('../../assets/icons/theme.svg'));
const iconSoundOn = HtmlToElement(require('../../assets/icons/sound-on.svg'));
const iconSoundOff = HtmlToElement(require('../../assets/icons/sound-off.svg'));
const iconClose = HtmlToElement(require('../../assets/icons/close.svg'));

const topBar = document.createElement('div');
const wrapper = document.createElement('div');
const themeBtn = document.createElement('button');
const soundBtn = document.createElement('button');
const closeBtn = document.createElement('button');

topBar.classList.add('top-bar');
wrapper.classList.add('top-bar__wrapper');
themeBtn.classList.add('top-bar__theme-btn');
closeBtn.classList.add('top-bar__close-btn');
soundBtn.classList.add('top-bar__sound-btn')
iconTheme.classList.add('top-bar__icon');
iconClose.classList.add('top-bar__icon');
iconSoundOn.classList.add('top-bar__icon');
iconSoundOff.classList.add('top-bar__icon');

themeBtn.appendChild(iconTheme);
soundBtn.appendChild(iconSoundOn)
soundBtn.appendChild(iconSoundOff)
closeBtn.appendChild(iconClose);

wrapper.appendChild(themeBtn);
wrapper.appendChild(soundBtn);

topBar.appendChild(wrapper);
topBar.appendChild(closeBtn);


export default topBar;
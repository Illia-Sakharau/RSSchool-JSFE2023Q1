import './styles.scss';
import HtmlToElement from '../../utils/htmlToElement';

const iconTheme = HtmlToElement(require('../../assets/icons/theme.svg'));
const iconClose = HtmlToElement(require('../../assets/icons/close.svg'));

const topBar = document.createElement('div');
const themeBtn = document.createElement('button');
const closeBtn = document.createElement('button');

topBar.classList.add('top-bar');
themeBtn.classList.add('top-bar__theme-btn');
closeBtn.classList.add('top-bar__close-btn');
iconTheme.classList.add('top-bar__icon');
iconClose.classList.add('top-bar__icon');

themeBtn.appendChild(iconTheme);
closeBtn.appendChild(iconClose);

topBar.appendChild(themeBtn);
topBar.appendChild(closeBtn);


export default topBar;
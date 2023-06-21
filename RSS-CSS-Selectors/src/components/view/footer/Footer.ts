import './footer.scss';
import htmlToElement from '../../../utils/htmlToElement';
import gitImg from '../../../assets/github.svg';
import schoolLogoImg from '../../../assets/rsslogo.svg';

export default class Footer {
  public draw(): HTMLElement {
    const template: string = `<footer>
        <a href="https://github.com/Illia-Sakharau" target="_blank" class="author">
          ${gitImg}
          <span>Illia Sakharau</span>
        </a>
        <a href="https://rs.school/js/" target="_blank" class="school">
          ${schoolLogoImg}
        </a>
        <div class="copyright">
          © 2023
        </div>
      </footer>
    `;

    return htmlToElement(template);
  }
}

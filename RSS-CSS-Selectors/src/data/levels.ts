import { ILevels } from '../types/types';

const levels: ILevels[] = [
  {
    title: 'Choose all objects',
    answer: '*',
    selector: 'Universal selectors',
    linkToInfo: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors',
    htmlMap: `
      <shelf>
        <rack data-target="true">
          <pot data-target="true">
            <chamomile data-target="true"></chamomile>
            <tulip data-target="true"></tulip>
          </pot>
        </rack>
        <rack data-target="true"></rack>
        <pot class="withPrint" data-target="true">
          <tulip data-target="true"></tulip>
          <tulip data-target="true"></tulip>
        </pot>
        <rack data-target="true">
          <chamomile data-target="true"></chamomile>
          <tulip data-target="true"></tulip>
          <chamomile data-target="true"></chamomile>
        </rack>
      </shelf>
    `,
  },
  {
    title: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    answer: 'chamomile',
    selector: '123',
    linkToInfo: '123',
    htmlMap: `
    <shelf>
      <rack>
        <pot>
          <chamomile data-target="true">
          </chamomile>
        </pot>
      </rack>
    </shelf>
    `,
  },
  {
    title: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    answer: 'rack',
    selector: '123',
    linkToInfo: '123',
    htmlMap: `
    <shelf>
      <rack data-target="true">
        <pot>
          <chamomile>
          </chamomile>
        </pot>
      </rack>
      <rack data-target="true">
        <pot>
          <chamomile>
          </chamomile>
        </pot>
      </rack>
    </shelf>
    `,
  },
];

export default levels;

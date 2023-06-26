import { ILevels } from '../types/types';

const levels: ILevels[] = [
  {
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    htmlMap: `
      <shelf>
        <rack>
          <pot data-target="true">
            <chamomile>
            </chamomile>
            <tulip>
            </tulip>
          </pot>
        </rack>
        <rack>
        </rack>
        <pot class="withPrint" data-target="true">
          <tulip>
          </tulip>
        </pot>
        <chamomile data-target="true">
        </chamomile>
        <tulip>
        </tulip>
      </shelf>
    `,
  },
  {
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    htmlMap: `
    <shelf>
      <rack>
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

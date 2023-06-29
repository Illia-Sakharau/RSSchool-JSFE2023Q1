import { ILevels } from '../types/types';

const levels: ILevels[] = [
  {
    description: 'Lorem ipsum dolor sit ametsed do eiusmod tempor incididunt',
    answer: '.withPrint',
    htmlMap: `
      <shelf>
        <rack>
          <pot>
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
          <tulip>
          </tulip>
        </pot>
        <rack>
          <pot>
            <chamomile>
            </chamomile>
            <tulip>
            </tulip>
          </pot>
        </rack>
        <tulip>
        </tulip>
      </shelf>
    `,
  },
  {
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    answer: 'chamomile',
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
    description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
    answer: 'rack',
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

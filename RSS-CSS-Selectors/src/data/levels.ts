import { ILevels } from '../types/types';

const levels: ILevels[] = [
  {
    title: 'Select all objects',
    answer: '*',
    selector: 'Universal selector',
    linkToInfo: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Universal_selectors',
    htmlMap: `
      <shelf data-target="true">
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
    title: 'Select all chamomile',
    answer: 'chamomile',
    selector: 'Type selector',
    linkToInfo: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Type_selectors',
    htmlMap: `
    <shelf>
      <rack>
        <chamomile data-target="true"></chamomile>
        <chamomile data-target="true"></chamomile>
        <chamomile data-target="true"></chamomile>
      </rack>
      <rack>
        <pot>
          <chamomile data-target="true"></chamomile>
        </pot>
      </rack>
      <chamomile data-target="true"></chamomile>
      <chamomile data-target="true"></chamomile>
      <chamomile data-target="true"></chamomile>
    </shelf>
    `,
  },
  {
    title: 'Select pot with print',
    answer: '.withPrint',
    selector: 'Class selector',
    linkToInfo: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Class_selectors',
    htmlMap: `
    <shelf>
      <rack>
        <pot class="withPrint" data-target="true">
          <tulip></tulip>
          <tulip></tulip>
        </pot>
      </rack>
      <rack>
        <pot>
          <tulip></tulip>
          <tulip></tulip>
        </pot>
      </rack>
      <rack>
        <pot class="withPrint" data-target="true">
          <tulip></tulip>
          <tulip></tulip>
        </pot>
      </rack>
    </shelf>
    `,
  },
  {
    title: 'Select common rack',
    answer: '#common',
    selector: 'ID selector',
    linkToInfo: 'https://developer.mozilla.org/en-US/docs/Web/CSS/ID_selectors',
    htmlMap: `
    <shelf>
      <rack id="common" data-target="true">
        <rack>
        <chamomile></chamomile>
        </rack>
        <rack>
        <chamomile></chamomile>
        </rack>
        <rack>
        <chamomile></chamomile>
        </rack>
      </rack>
    </shelf>
    `,
  },
  {
    title: 'Select all flowers',
    answer: 'chamomile, tulip',
    selector: 'Selector list',
    linkToInfo: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Selector_list',
    htmlMap: `
      <shelf>
        <pot class="withPrint">
          <tulip data-target="true"></tulip>
          <tulip data-target="true"></tulip>
        </pot>
        <chamomile data-target="true"></chamomile>
        <tulip data-target="true"></tulip>
        <rack>
          <pot>
            <chamomile data-target="true"></chamomile>
            <tulip data-target="true"></tulip>
          </pot>
        </rack>
        <rack>
          <chamomile data-target="true"></chamomile>
          <tulip data-target="true"></tulip>
          <chamomile data-target="true"></chamomile>
        </rack>
      </shelf>
    `,
  },
  {
    title: 'Select all tulips if they have an ancestor racks',
    answer: 'rack tulip',
    selector: 'Descendant combinator',
    linkToInfo: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Descendant_combinator',
    htmlMap: `
      <shelf>
        <rack>
          <chamomile></chamomile>
          <tulip data-target="true"></tulip>
        </rack>
        <pot>
          <chamomile></chamomile>
          <tulip></tulip>
        </pot>
        <tulip></tulip>
        <rack>
          <pot class="withPrint">
            <tulip data-target="true"></tulip>
            <chamomile></chamomile>            
          </pot>
        </rack>
      </shelf>
    `,
  },
  {
    title: 'Select all chamomiles in racks',
    answer: 'rack > chamomile',
    selector: 'Child combinator',
    linkToInfo: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Child_combinator',
    htmlMap: `
      <shelf>
        <pot>
          <chamomile></chamomile>
          <tulip></tulip>
        </pot>
        <rack>
          <chamomile data-target="true"></chamomile>
          <tulip></tulip>
        </rack>
        <rack>
          <pot class="withPrint">
            <tulip></tulip>
            <chamomile></chamomile>            
          </pot>
          <chamomile data-target="true"></chamomile>
        </rack>
      </shelf>
    `,
  },
  {
    title: 'Select all chamomiles after tulips',
    answer: 'tulip ~ chamomile',
    selector: 'General sibling combinator',
    linkToInfo: 'https://developer.mozilla.org/en-US/docs/Web/CSS/General_sibling_combinator',
    htmlMap: `
      <shelf>
        <pot>
          <chamomile></chamomile>
          <tulip></tulip>
        </pot>
        <chamomile></chamomile>
        <tulip></tulip>
        <chamomile data-target="true"></chamomile>
        <chamomile data-target="true"></chamomile>
        <rack>
          <chamomile></chamomile>
          <tulip></tulip>
          <chamomile data-target="true"></chamomile>
        </rack>
      </shelf>
    `,
  },
  {
    title: 'Select first tulip after chamomiles',
    answer: 'chamomile + tulip',
    selector: 'Adjacent sibling combinator',
    linkToInfo: 'https://developer.mozilla.org/en-US/docs/Web/CSS/Adjacent_sibling_combinator',
    htmlMap: `
      <shelf>
        <rack>
          <chamomile></chamomile>
          <tulip data-target="true"></tulip>
          <tulip></tulip>
          <tulip></tulip>
        </rack>
        <pot>
          <chamomile></chamomile>
          <tulip data-target="true"></tulip>
        </pot>
        <chamomile></chamomile>
        <tulip data-target="true"></tulip>
        <chamomile></chamomile>
        <tulip data-target="true"></tulip>

      </shelf>
    `,
  },
  {
    title: 'Select first tulip in any container',
    answer: 'tulip:first-child',
    selector: ':first-child',
    linkToInfo: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:first-child',
    htmlMap: `
    <shelf>
      <rack>
        <chamomile></chamomile>
        <tulip></tulip>
      </rack>
      <pot class="withPrint">
        <tulip data-target="true"></tulip>
        <chamomile></chamomile>            
      </pot>
      <rack>
        <pot>
          <chamomile></chamomile>
          <tulip></tulip>
        </pot>
      </rack>
      <rack>
        <tulip data-target="true"></tulip>
        <chamomile></chamomile>
      </rack>
    </shelf>
    `,
  },
  {
    title: `Select odd flower if it's chamomile`,
    answer: 'chamomile:nth-child(odd)',
    selector: ':nth-child()',
    linkToInfo: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:nth-child',
    htmlMap: `
    <shelf>
      <chamomile data-target="true"></chamomile>
      <tulip></tulip>
      <chamomile data-target="true"></chamomile>
      <chamomile></chamomile>
      <chamomile data-target="true"></chamomile>
      <tulip></tulip>
      <tulip></tulip>
      <chamomile></chamomile>
      <chamomile data-target="true"></chamomile>
      <chamomile></chamomile>
      <chamomile data-target="true"></chamomile>    
    </shelf>
    `,
  },
  {
    title: 'Select all empty pots',
    answer: 'pot:empty',
    selector: ':empty',
    linkToInfo: 'https://developer.mozilla.org/en-US/docs/Web/CSS/:empty',
    htmlMap: `
    <shelf>
      <rack>
        <pot>
          <chamomile></chamomile>
          <tulip></tulip>
        </pot>
      </rack>
      <pot class="withPrint" data-target="true"></pot>
      <rack>
        <pot class="withPrint">
          <chamomile></chamomile>
          <tulip></tulip>
        </pot>
      </rack>
      <rack>
      </rack>
      <rack>
        <pot data-target="true"></pot>
      </rack>
    </shelf>
    `,
  },
];

export default levels;

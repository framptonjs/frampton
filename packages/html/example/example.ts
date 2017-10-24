import {
  Elements, Html, Attributes, scene, Events, RootNode
} from './index';
import { eventValue } from '@frampton/events';


const { div, input, button, text } = Elements;

const root: Element =
  document.getElementById('root');


const clickHandler =
  (evt: Event) => evt;


const click2Handler =
  (evt: Event): string => 'click 2';


const mapping =
  (evt: Event): string => 'click 1';


const initialView =
  div(
    [],
    [ input(
        [ Events.onInput(eventValue)
        ]
      ),
      button(
        [ Events.map(mapping, Events.onClick(clickHandler)),
          Events.onClick(click2Handler)
        ],
        [ text('Click me')
        ]
      )
    ]);


const scheduler =
  scene(root, initialView, function(evt: string) {
    console.log('evt: ', evt);
  });


function showOne() {
  const nextView =
    div(
    [],
    [ input(
        [ Events.onInput((evt: Event): string => 'word')
        , Events.debounce(1000, Events.onInput((evt: any): string => `Hello: ${evt.target.value}`))
        ]
      )
    , button(
        [ Events.map(mapping, Events.onClick(clickHandler)),
          Events.onClick(click2Handler)
        ],
        [ text('Click me')
        ]
      )
    , div(
        [],
        [ text('Some text')
        ]
      )
    ]);

  scheduler(nextView);

  setTimeout(showTwo, 4000);
}

function showTwo() {
  const nextView =
    div(
    [],
    [ input(
        [ Events.debounce(1000, Events.onInput((evt: any): string => `Hello: ${evt.target.value}`))
        ]
      ),
      button(
        [ Events.map(mapping, Events.onClick(clickHandler)),
          Events.onClick(click2Handler)
        ],
        [ text('Click me')
        ]
      )
    ]);

  scheduler(nextView);

  setTimeout(showOne, 4000);
}


setTimeout(showOne, 2000);

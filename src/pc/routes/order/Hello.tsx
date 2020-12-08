import * as React from 'react';

import GridLayout from 'react-grid-layout';

interface Iprops {

}

interface Istate {
  isShowModal: boolean;
  items: any[];
}


export default class Hello extends React.PureComponent<Iprops, Istate> {
  constructor(props: any) {
    super(props);
    console.log(props, 111999)
    this.state = {
      isShowModal: false,
      items: [
        {
          id: '212112',
          content: '1342342432438'
        },
        {
          id: '212112',
          content: '1342342432438'
        },
      ]
    }
  }

  render() {
    // layout is an array of objects, see the demo for more complete usage
    var layout = [
      {i: 'a', x: 0, y: 0, w: 3, h: 2},
      {i: 'b', x: 0, y: 0, w: 3, h: 2,  minW: 2, maxW: 4},
      {i: 'c', x: 0, y: 0, w: 3, h: 2,}
    ];
    return (
      <GridLayout className="layout" layout={layout} cols={12} rowHeight={10} width={layout.length * 60} compactType='horizontal' verticalCompact={true}>
        <div key="a" style={{ background: 'red' }}>a</div>
        <div key="b" style={{ background: 'red' }}>b</div>
        <div key="c" style={{ background: 'red' }}>c</div>
      </GridLayout>
    )
  }
}

// import { Responsive as ResponsiveGridLayout } from 'react-grid-layout';

// export default class MyResponsiveGrid extends React.Component {
//   render() {
//     // {lg: layout1, md: layout2, ...}
//     var layouts = [
//             {i: 'a', x: 0, y: 0, w: 3, h: 2, static: true},
//             {i: 'b', x: 0, y: 0, w: 3, h: 2, static: true, minW: 2, maxW: 4},
//             {i: 'c', x: 0, y: 0, w: 3, h: 2, static: true}
//           ];

//     // var layouts = getLayoutsFromSomewhere();
//     return (
//       <ResponsiveGridLayout className="layout" layouts={layouts}
//         breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
//         cols={{lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}}>
//         <div key="1">1</div>
//         <div key="2">2</div>
//         <div key="3">3</div>
//       </ResponsiveGridLayout>
//     )
//   }
// }
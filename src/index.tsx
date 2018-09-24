import * as React from "react";
import * as ReactDOM from "react-dom";
import App from './routes';
import './index.css'
export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
// export default class Hello extends React.PureComponent<HelloProps, {}> {
//     render() {
//         return <h1> <span className={'red'}>46556</span>        Hello from wocaishi {this.props.compiler} and liaocaing  {this.props.framework}!</h1>;
//     }
// }

// class App extends React.PureComponent<any, any> {
//     render () {
//         return <span>9999</span>
//     }
// }
ReactDOM.render(
    <App />,
    document.getElementById("example")
);
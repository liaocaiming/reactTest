import * as React from "react";

interface Iprops {}

interface Istate {
  isShowModal: boolean;
  list: any[];
  overKey?: number;
  fromKey?: number;
}

import './dragable.css';

export default class Hello extends React.PureComponent<Iprops, Istate> {
  constructor(props: any) {
    super(props);
    console.log(props, 111999);
    this.state = {
      isShowModal: false,
      list: [
        "2",
        "3",
        "4",
        '5'
      ]
    };
  }

  public fromKey: any;
  public toKey: any;

  public onMouseDown = (key: number, str: string) => {
    return () => {
      if (str === 'onMouseDown') {
        this.fromKey = key
        this.setState({
          fromKey: key
        })
      }

      if (str === 'onMouseUp' && this.fromKey !== key) {
        const list = this.state.list.slice();
        if (this.fromKey < this.toKey) {
          list.splice(this.toKey - 1, 0, list.splice(this.fromKey, 1))
        } else {
          list.splice(this.toKey, 0, list.splice(this.fromKey, 1))
        }

        this.setState({
          list,
          fromKey: undefined,
          overKey: undefined
        })
        this.fromKey = undefined;
        this.toKey = undefined;
      }

      if (str === 'onMouseOver' && this.state.overKey !== key &&  this.fromKey &&  this.fromKey !== key) {
        this.setState({
          overKey: key
        })
      }
      return
    }
  }

  render() {
    return (
      <div>
        {this.state.list.map((str: string, key: number) => {
          return (
            <div onMouseDown={this.onMouseDown(key, 'onMouseDown')} onMouseUp={this.onMouseDown(key, 'onMouseUp')} onMouseOver={this.onMouseDown(key, 'onMouseOver')} onMouseOut={this.onMouseDown(key, 'onMouseOut')} data-key={key} className={`drag ${this.state.fromKey === key && 'fromKey' || ''} ${this.state.overKey === key && 'overKey' || ''} `} key={str} style={{ width: 100, height: 100}} >
              {/* <img src={str} width='100%'/> */}
              {str}
            </div>
          );
        })}
      </div>
    );
  }
}

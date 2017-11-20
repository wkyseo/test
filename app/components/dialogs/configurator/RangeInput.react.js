import React, { Component } from 'react';
import UIActions from '../../../actions/UIActions';
import tapOrClick from '../../../utils/tapOrClick';
import nodeStore from '../../../stores/nodeStore';
require('./configurator.less');

class RangeInput extends Component {
  constructor() {
    super(...arguments);
    this.config = [];
    this.state = {
      value: []
    };
    this.openNumberInput = this.openNumberInput.bind(this);
  }

  openNumberInput(e) {
    console.log('open number');
    let target = e.target;
    UIActions.openNumberInputDialog((num) => {
      target.textContent = Number(num);
      this.props.onChange && this.props.onChange(target.classList[0], Number(num));
    },target.textContent);
  }

  setting() {
    let array = nodeStore.getNodeConfigs(this.props.id);
    let keys = Object.keys(array);
    let collection = [];
    for(let i of keys) {
      if(i != 'trigger') {  // 因为随机数的一个参数是 trigger，不应该设置值
        let result = nodeStore.getCurrentConfig(this.props.id, i);
        collection.push(result);
        this.props.onChange && this.props.onChange(i, result);
      }
    }
    this.setState({
      value: collection
    });
  }


  renderInput() {
    let ele = [];
    let keys = Object.keys(this.props.config);

    let array = keys;
    if(this.props.type === 'RANDOM') {
      keys = keys.length-1;
    } else {
      keys = keys.length;
    }
    for(let i=0; i<keys; i++) {
      if(i==2) {
        ele.push(<img className='scale-arrow' src='./img/icon-arrow-scale.png'  key={'arrow'}/>);
      }
      ele.push(<div className={array[i]+' input-'+this.props.type} {...tapOrClick(this.openNumberInput)} key={keys[i]}>{this.state.value[i]}</div>);
      ele.push(<span className='separate' key={keys[i]}>~</span>);
    }
    return ele;
  }

  render() {
    return (<div className={'input-div-'+this.props.type}>
      {this.renderInput()}
    </div>);
  }

  componentDidMount() {
    this.setting();
  }
}

export { RangeInput };
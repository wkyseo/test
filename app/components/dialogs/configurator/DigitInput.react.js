import React, { Component } from 'react';
//import NumberInput from 'react-number-input';
import languages from '../../../languages';
import AppDispatcher from '../../../dispatcher/AppDispatcher';
import AppConstants from '../../../constants/AppConstants';
import nodeStore from '../../../stores/nodeStore';
import UIActions from '../../../actions/UIActions';
import tapOrClick from '../../../utils/tapOrClick';
require('./configurator.less');

class DigitInput extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      operation: ''
    };
    this.getOperation = this.getOperation.bind(this);
    this.setIconValue = this.setIconValue.bind(this);
    this.openNumberInput = this.openNumberInput.bind(this);
  }

  change() {
    let val = this.refs.number.state.value;
    this.props.onChange && this.props.onChange(this.props.name, Number(val));
  }

  getTranslationKey() {
    switch (this.props.type) {
    case 'COUNTER':
    case 'DELAY':
    case 'AVERAGE':
    case 'PULSE':
      return languages.getTranslation(this.props.name);
    case 'SEQUENCE':
      return languages.getTranslation('sequence') + '. ' + this.props.id;
    default:
      return languages.getTranslation('number');
    }
  }

  getOperation(){
    let key;
    if(this.props.type === 'COMPARE') {
      switch (this.state.operation) {
      case '>':
        key = './img/compare/icon-larger-active.png';
        break;
      case '>=':
        key = './img/compare/icon-larger-eq-active.png';
        break;
      case '<':
        key = './img/compare/icon-smaller-active.png';
        break;
      case '<=':
        key = './img/compare/icon-smaller-eq-active.png';
        break;
      case '=':
        key = './img/compare/icon-equal-active.png';
        break;
      case '!=':
        key = './img/compare/icon-not-eq-active.png';
        break;

      }
    }else if(this.props.type === 'COMPUTE') {
      switch (this.state.operation) {
      case '+':
        key = './img/compute/icon-addition-active.png';
        break;
      case '-':
        key = './img/compute/icon-subtract-active.png';
        break;
      case '*':
        key = './img/compute/icon-multiply-active.png';
        break;
      case '/':
        key = './img/compute/icon-divide-active.png';
        break;
      case '%':
        key = './img/compute/icon-mod-active.png';
        break;
      }
    }

    return (<img className="operation-icon" src={key} />);
  }

  setIconValue(value) {
    this.setState({
      operation: value
    });
  }

  openNumberInput() {
    console.log('open number');
    UIActions.openNumberInputDialog((num) => {
      this.refs.num.textContent = Number(num);
      this.props.onChange && this.props.onChange(this.props.name, Number(num));
    },this.refs.num.textContent);
  }

  render() {
    let type = this.props.type;
    return (<div className={'calculator-content number-' + this.props.type}>
      <div className='calculator-title'>{this.getTranslationKey()}</div>
      <div className="number-wrap">
        {(type === 'COMPARE' || type === 'COMPUTE') ? this.getOperation() : ''}
        <div ref='num' className={'calculator-input number-' + this.props.type} {...tapOrClick(this.openNumberInput)}>{this.props.val}</div>
      </div>

    </div>);
  }

  componentDidMount() {
    let self = this;
    this.props.onChange && this.props.onChange(this.props.name, Number(this.props.val));

    if(this.props.type === 'COMPARE' || this.props.type === 'COMPUTE') {
      let optionDefaultVal = nodeStore.getCurrentConfig(self.props.id, 'operation');
      self.setState({
        operation: optionDefaultVal
      });
      this._register = AppDispatcher.register((action) => {
        if (action.actionType === AppConstants.SET_ICON_WITH_OPTIONS) {
          if(action.nodeId === self.props.id) {
            self.setIconValue(action.value);
          }
        }
      });
    }

  }

  componentWillUnmount() {
    if(this.props.type === 'COMPARE' || this.props.type === 'COMPUTE') {
      AppDispatcher.unregister(this._register);
    }
  }
}

export { DigitInput };
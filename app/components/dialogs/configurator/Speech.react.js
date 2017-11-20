import React, { Component } from 'react';
//import NumberInput from 'react-number-input';
import tapOrClick from 'react-tap-or-click';
import languages from '../../../languages';
import UIActions from '../../../actions/UIActions';
import engine from '../../../core/FlowEngine';
require('./configurator.less');

class Speech extends Component {
  constructor() {
    super(...arguments);
  }

  playEffect(){
    //this.refs.text.blur();
    engine.configNode(this.props.id, {text: this.refs.text.value});
    UIActions.configNode(this.props.id, {test: true});
  }

  focus(e) {
    let target = e.target;
    console.log('open textInput');
    UIActions.openTextInputDialog((text) => {
      target.textContent = text;
      this.props.onChange && this.props.onChange(this.props.name, text);
    }, target.textContent, target);
  }

  render() {
    return (<div className={'text-content number-' + this.props.type}>
      <div className='text-title'>{languages.getTranslation('please input content')}</div>
      <div className='text-input' {...tapOrClick(this.focus.bind(this))} ref='text'>{this.props.val}</div>
      <div className="play-wrap">
        <img className="play" {...tapOrClick(this.playEffect.bind(this))} src='./img/speech-play.png' />
      </div>
    </div>);
  }

  componentDidMount() {
    this.props.onChange && this.props.onChange(this.props.name, this.props.val);
  }
}

export { Speech };
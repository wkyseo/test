import React, { Component } from 'react';
import languages from '../../../languages';
import UIActions from '../../../actions/UIActions';
import tapOrClick from '../../../utils/tapOrClick';
import './configurator.less';

class TextInput extends Component {
  constructor() {
    super(...arguments);
    this.getTranslationKey = this.getTranslationKey.bind(this);
    this.openTextInput = this.openTextInput.bind(this);
    this.focus = this.focus.bind(this);
  }

  change() {
    let val = this.refs.text.value;
    this.props.onChange && this.props.onChange(this.props.name, val);
  }

  getTranslationKey() {
    switch (this.props.type) {
    case 'MATCHTEXT':
      return 'find-text';
    case 'SAVERECORD':
      return 'fileName';
    default:
      return 'edit-text';
    }
  }

  openTextInput() {
    console.log('open textInput');
    if(window._runtime == 'cordova' && /iPhone|iPad/.test(navigator.appVersion)) {
      window.cordova.plugins.Keyboard.disableScroll(true);
      window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    UIActions.openTextInputDialog((text) => {
      this.refs.divText.textContent = text;
      this.props.onChange && this.props.onChange(this.props.name, text);
    }, this.refs.text.value);
  }

  focus(e) {
    let target = e.target;
    console.log('open textInput');
    UIActions.openTextInputDialog((text) => {
      target.textContent = text;
      this.props.onChange && this.props.onChange(this.props.name, text);
    }, target.textContent, target);
  }

  renderInput() {
    return (
      <div
        className='text-input'
        {...tapOrClick(this.focus.bind(this))}
        ref='text'
      >{this.props.val}</div>
    );
    /*if(window._runtime === 'cordova') {
      return (
        <input
          className='text-input'
          type="text"
          onFocus={this.focus.bind(this)}
          ref='text'
        />
      );
    }else {
      return (
        <input
          className='text-input'
          type="text"                      // optional, input[type]. Defaults to "tel" to allow non numeric characters
          onChange={this.change.bind(this)}
          ref='text'
        />
      );
    }*/
  }

  render() {
    return (<div className={'text-content number-' + this.props.type}>
      <div className='text-title'>{languages.getTranslation(this.getTranslationKey())}</div>
     {/* <div ref='divText' className="text-input" {...tapOrClick(this.openTextInput)}>{this.props.val}</div>*/}
      {this.renderInput()}
    </div>);
  }

  componentDidMount() {
    //this.refs.text.textContent = this.props.val;
    this.props.onChange && this.props.onChange(this.props.name, this.props.val);
  }
}

export { TextInput };
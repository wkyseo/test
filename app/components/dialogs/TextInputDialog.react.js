import React, { Component } from 'react';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import AppConstants from '../../constants/AppConstants';
import Modal from 'react-modal';
import languages from '../../languages';
import tapOrClick from '../../utils/tapOrClick';
import './TextInputDialog.less';

const TEXT_INPUT_LENGTH = 36;

class TextInputDialog extends Component{
  constructor() {
    super(...arguments);
    this.state = {
      modalIsOpen: false,
      text: '',
      callback: null,
      title: null
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.doneCallback = this.doneCallback.bind(this);
    this.textChange = this.textChange.bind(this);
    this.setFocus = this.setFocus.bind(this);
    this.renderTitleIfExist = this.renderTitleIfExist.bind(this);
    this.renderDoneBtn = this.renderDoneBtn.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  doneCallback() {
    console.log('text', this.textValue);
    if(this.state.modalIsOpen) {
      this.textElement.blur();
      this.closeModal();
      this.state.callback(this.textValue);
    }
  }

  textChange() {
    let val = this.textElement.value;
    if(val.length > TEXT_INPUT_LENGTH) {
      this.textElement.value = val.slice(0, TEXT_INPUT_LENGTH);
    }
    this.textValue = this.textElement.value;
  }

  setFocus() {
    this.textElement.focus();
  }

  renderTitleIfExist(){
    if (this.state.title) {
      return (
      <div className="dialog-title">
        <span>{this.state.title}</span>
        <div className="done" {...tapOrClick(this.doneCallback)}>{languages.getTranslation('text-input-dialog-done')}</div>
      </div>);
    }
    return null;
  }

  renderDoneBtn(){
    if (!this.state.title) {
      return <div className="done" {...tapOrClick(this.doneCallback)}>{languages.getTranslation('text-input-dialog-done')}</div>;
    }
    return null;
  }

  render() {
    return(
      <Modal
        contentLabel="text-input-dialog"
        isOpen={this.state.modalIsOpen}
        className="text-input-dialog"
        overlayClassName="dialog-overlay">
        <div className={'dialog-container'+(this.state.title?' titled':'')} ref={(node) => {this.container = node;}}>
          {this.renderTitleIfExist()}
          <textarea onChange={this.textChange} className="text" autoFocus={true} type="text" ref={(text) => {this.textElement = text;}} defaultValue={this.state.text} />
          <div className="mask" ref={(div) => {this.maskElement = div;}} onClick={this.setFocus}></div>
          {this.renderDoneBtn()}
        </div>
      </Modal>
    );
  }

  componentDidMount() {
    let self = this;
    this.AppDispatcherHandle = AppDispatcher.register((action) => {
      if (action.actionType === AppConstants.OPEN_TEXT_INPUT_DIALOG) {
        console.log('openning text input dialog',action);
        self.setState({
          modalIsOpen: true,
          text: action.text,
          callback: action.callback,
          title: action.title
        });
        self.textValue = action.text;
        if(action.input.tagName.toUpperCase() === 'INPUT') {
          action.input && action.input.blur();
        }
      }
    });

    //iPhone or iPad have hideFeature of softKeyboard
    if(window._runtime === 'cordova' && /iPhone|iPad/.test(navigator.appVersion)) {
      window.addEventListener('native.keyboardhide', () => {
        self.doneCallback();
      });
      window.addEventListener('native.keyboardshow', () => {
        console.log('keyboardshow');
        window.cordova.plugins.Keyboard.disableScroll(true);
      });

    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.modalIsOpen === false && this.state.modalIsOpen === true && window._runtime === 'cordova' && /iPhone|iPad/.test(navigator.appVersion)) {
      //let ele = this.container;
      setTimeout(() => {
        let ele = this.container;
        console.log(ele);
        let parentEle = ele.parentElement;
        let top = parentEle.getBoundingClientRect().top;
        parentEle.style.top = Math.abs(Number(top)) + 'px';
      }, 0);

    }
  }

  componentWillUnmount() {
    AppDispatcher.unregister( this.AppDispatcherHandle );
    if(window._runtime === 'cordova' && /iPhone|iPad/.test(navigator.appVersion)) {
      window.removeEventListener('native.keyboardhide');
    }
  }
}

export { TextInputDialog };
import React, { Component } from 'react';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import AppConstants from '../../constants/AppConstants';
import tapOrClick from '../../utils/tapOrClick';
import engine from '../../core/FlowEngine';
import languages from '../../languages';
import UIActions from '../../actions/UIActions';

class EditTextBox extends Component {
  constructor(){
    super(...arguments);
    this.state={
      isActive: false,
      id: null,
      originText: '',
      title: '',
      type: '',
      saveAble: false,
      onConfirm: null
    };
    this.emitter = this.props.emitter;
    this.closePanel = this.closePanel.bind(this);
    this.focus = this.focus.bind(this);
  }

  closePanel(){
    this.setState({
      isActive: false,
      originText: ''
    });
    this.refs.inputBox.textContent = '';
  }

  saveChange(){
    let text = this.refs.inputBox.textContent;
    console.log('text:', text);
    if(this.state.type == 'setName') {
      engine.configNode(this.state.id, {name: text});
      this.state.onConfirm && this.state.onConfirm(text);
      this.refs.inputBox.textContent = '';
      UIActions.updateCloudProject();
    } else if(this.state.type == 'setText') {
      engine.configNode(this.state.id, {text: text});
      this.state.onConfirm && this.state.onConfirm(text);
      UIActions.getTextInput(this.state.id, text);
    }
    this.setState({
      isActive: false,
      originText: ''
    });
  }

  clearText(){
    this.setState({
      originText: '',
      saveAble: false
    });
  }

  focus(e) {
    let target = e.target;
    console.log('open textInput');
    UIActions.openTextInputDialog((text) => {
      target.textContent = text;
      if(text === '') {
        this.setState({
          saveAble: false
        });
      }
      this.props.onChange && this.props.onChange(this.props.name, text);
    }, target.textContent, target);
  }

  render(){
    return (<div className={'edit-panel '+(this.state.isActive==true?'':'hide')}>
      <div className='panel-cover' {...tapOrClick(this.closePanel)}></div>
      <div className='edit-text' ref='editText'>
        <span className='edit-title'>{this.state.title}</span>
        <div className='input-div'>
          <div className='edit-input' ref='inputBox' {...tapOrClick(this.focus.bind(this))}>{this.state.originText}</div>
          <a {...tapOrClick(this.clearText.bind(this))} className='clear-input' style={{background:'url("img/icon-close.png") center / 28px no-repeat'}}></a>
        </div>
        <div className='btn-area'><span className='edit-btn' {...tapOrClick(this.saveChange.bind(this))}>{languages.getTranslation('save')}</span></div>
      </div>
    </div>);
  }

  componentDidMount(){
    let self = this;
    this._register = AppDispatcher.register((action)=>{
      if(action.actionType === AppConstants.EDIT_CLOUD_NODE_NAME) {
        self.setState({
          isActive: true,
          id: action.id,
          originText: action.name || '',
          title: languages.getTranslation('setName'),
          type: 'setName',
          saveAble: action.name === '' ? false : true,
          onConfirm: action.onConfirm
        });
      } else if(action.actionType === AppConstants.EDIT_TEXT_INPUT) {
        self.setState({
          isActive: true,
          id: action.id,
          title: languages.getTranslation('setText'),
          type: 'setText',
          originText: action.text || '',
          saveAble: action.text === '' ? false : true,
          onConfirm: action.onConfirm
        });
      }
    });
    /*setTimeout(()=>{
      this.props.onChange && this.props.onChange(this.props.name, this.state.originText);
      }, 0);*/
  }
  componentWillUnmount() {
    AppDispatcher.unregister(this._register);
  }
}

export { EditTextBox };
import React, { Component } from 'react';
import Modal from 'react-modal';
import tapOrClick from '../../../utils/tapOrClick';
import UIActions from '../../../actions/UIActions';
import languages from '../../../languages';
import {Selector} from './Selector.react';
import {DigitInput} from './DigitInput.react';
import {RangeInput} from './RangeInput.react';
import {TextInput} from './TextInput.react';
import {Toggle} from './Toggle.react';
import {Speech} from './Speech.react';
import {SoundSelect} from './SoundSelect.react';
import {ColorCheck} from './ColorCheck.react';
import {Image} from './Image.react';
import {Pattern} from './Pattern.react';
import editerStore from '../../../stores/editerStore';
import nodeStore from '../../../stores/nodeStore';
import './configurator.less';
import BuildCaseStore from '../../../stores/buildCaseStore';
import {guideStore} from '../../../stores/guideStore/guideStore';

class ConfiguratorDialog extends Component {
  constructor() {
    super(...arguments);
    this.conf = {};
    this.configPlay = true;
    this.state = {
      modalIsOpen: false,
      type: '',
      id: ''
    };
    this.element = '';
    this.renderControl = this.renderControl.bind(this);
    this.renderRange = this.renderRange.bind(this);
    this.renderFace = this.renderFace.bind(this);
    this.openTipsDialog = this.openTipsDialog.bind(this);
  }

  open(type, nodeId, ele) {
    this.setState({
      modalIsOpen: true,
      type: type,
      id: nodeId
    });
    this.element = ele;
    this.conf = {};
  }

  close() {
    this.setState({
      modalIsOpen: false,
      type: '',
      id: ''
    });
    this.element = '';
    editerStore.clearConfig();
  }

  confirm() {
    if(this.state.id === 'normalTipsDialog') {
      this.normalDialogCallback();
    }else{
      console.log('confirmConf', this.conf);
      UIActions.configNode(this.state.id, this.conf, this.configPlay);
    }

    this.close();
  }

  onConfig(key, value) {
    let conf = this.conf || {};
    conf[key] = value;
  }

  renderDialogHeader() {
    return (<div className='dialog-header'>
      <span>{this.state.id === 'normalTipsDialog' ? this.normalDialogTitle : languages.getTranslation(this.state.type.toLocaleLowerCase())}</span>
    </div>);
  }

  renderControl(key, config){
    let control = null;
    let val = nodeStore.getCurrentConfig(this.state.id, key) || config.defaultValue;
    switch(config.type) {
    case 'options':
    case 'color':
      control = (<Selector key={key} name={key} val={val} id={this.state.id} type={this.state.type} config={config} onChange={this.onConfig.bind(this)}/>);
      break;
    case 'number':
      control = (<DigitInput key={key} name={key} val={val} id={this.state.id} type={this.state.type} config={config} onChange={this.onConfig.bind(this)}/>);
      break;
    case 'text':
      control = (<TextInput key={'text'} name={'text'} val={val} id={this.state.id} type={this.state.type} config={config} onChange={this.onConfig.bind(this)}/>);
      break;
    case 'hidden':
      break;
    default:
      console.log('config type not support: ', config.type);
    }
    return control;
  }

  //渲染数字范围相关弹出框
  renderRange(config) {
    let title = this.state.type.toLowerCase()+'-range';
    return (<div className={this.state.type+'-content'}>
      <span className='title'>{languages.getTranslation(title)}</span>
      <RangeInput type={this.state.type} id={this.state.id} config={config} onChange={this.onConfig.bind(this)}/>
    </div>);
  }

  //渲染序列相关弹出框
  renderSequence(config) {
    let port = this.element.parentNode.id;
    let value = nodeStore.getCurrentConfig(this.state.id, port);
    let repeatValue = nodeStore.getCurrentConfig(this.state.id, 'repeat');
    let keyArray = Object.keys(nodeStore.getNodeConfigs(this.state.id));
    return (<div className={this.state.type+'-content'}>
      <DigitInput name={port} id={keyArray.indexOf(port)} val={value} type={this.state.type} config={config} onChange={this.onConfig.bind(this)}/>
      <Toggle flag={repeatValue} name={'repeat'} val={value} config={config} onChange={this.onConfig.bind(this)} type={this.state.type}/>
    </div>);
  }

  renderFace(config) {
    let blinkValue = nodeStore.getCurrentConfig(this.state.id, 'blink');
    let faceValue = nodeStore.getCurrentConfig(this.state.id, 'faceId') || config.faceId.defaultValue;
    let bln = (blinkValue === 'blink') ? true : false;
    return (
      <div className={this.state.type+'-content'}>
        <Selector key={'faceId'} name={'faceId'} val={faceValue} id={this.state.id} type={this.state.type} config={config} onChange={this.onConfig.bind(this)}/>
        <Toggle flag={bln} name={'blink'}  config={config} onChange={this.onConfig.bind(this)} type ={this.state.type}/>
      </div>);
  }

  //渲染颜色选择相关弹出框
  renderColorCheck(config) {
    let colorValue = nodeStore.getCurrentConfig(this.state.id, 'sampleColor');
    let toleranceValue = nodeStore.getCurrentConfig(this.state.id, 'tolerance');
    return (<ColorCheck id={this.state.id}
                        type={this.state.type}
                        sampleColor={colorValue}
                        tolerance={toleranceValue}
                        configs={config}
                        onChange={this.onConfig.bind(this)}/>);
  }

  renderDialogFooter() {
    if(this.state.id === 'normalTipsDialog') {
      if(this.state.type === 'confirm') {
        return (<div className='dialog-footer' >
          <span className='footer-cancel' {...tapOrClick(this.close.bind(this))}>{languages.getTranslation('dialog-action-cancel')}</span>
          <span className='footer-confirm' {...tapOrClick(this.confirm.bind(this))}>{languages.getTranslation('dialog-action-confirm')}</span>
        </div>);
      }else if(this.state.type === 'alert') {
        return (<div className='dialog-footer' {...tapOrClick(this.close.bind(this))}>
          {languages.getTranslation('dialog-action-confirm')}
        </div>);
      }
    }else {
      return (<div className='dialog-footer' {...tapOrClick(this.confirm.bind(this))}>
        {languages.getTranslation('dialog-action-confirm')}
      </div>);
    }

  }

  render() {
    let self = this;
    let controls = [];
    //openDialogRender
    if(this.state.id === 'normalTipsDialog' && (this.state.type === 'confirm' || this.state.type === 'alert')) {
      controls = [<div className="normal-dialog-body" key={this.state.id}>{this.normalDialogText}</div>];
    }else if(this.state.type && this.state.id) {
      let configs = nodeStore.getNodeConfigs(this.state.id);
      let val = '',name = '';
      console.log('renderConfigs', configs);
      switch (this.state.type) {
      case 'RANDOM': //随机数
      case 'FILTER': //过滤
      case 'SCALE': //映射
        controls = self.renderRange(configs);
        break;
      case 'TEXT_INPUT':
      case 'MATCHTEXT':
      case 'SAVERECORD':
        if(this.state.type === 'SAVERECORD') {
          name = 'name';
        }else {
          name = 'text';
        }
        val = nodeStore.getCurrentConfig(this.state.id, name);
        controls = (<TextInput key={'text'} name={name} val={val} type={this.state.type}  onChange={this.onConfig.bind(this)}/>);
        break;
      case 'NUMBER_INPUT':
        controls = (<DigitInput key={'number'} name={'number'} val={nodeStore.getCurrentConfig(this.state.id, 'number')} id={this.state.id} type={this.state.type} config={configs} onChange={this.onConfig.bind(this)}/>);
        break;
      case 'PLAYSOUND': //播放声音
        controls = (<SoundSelect key={'text'} name={'text'} type={this.state.type} id={this.state.id} config={configs} onChange={this.onConfig.bind(this)}/>);
        break;
      case 'TEXTTOSPEECH': //声音模块语音转文字
        val = nodeStore.getCurrentConfig(this.state.id, 'text');
        controls = (<Speech key={'text'} name={'text'} id={this.state.id} val={val} type={this.state.type} config={configs} onChange={this.onConfig.bind(this)}/>);
        break;
      case 'SEQUENCE': //序列
        controls = self.renderSequence(configs);
        break;
      case 'FACE': //语音识别辅助节点 FACE
        controls = self.renderFace(configs);
        break;
      case 'COLORCHECK': //颜色传感器辅助节点
        controls = self.renderColorCheck(configs);
        break;
      case 'IMAGE': {
        let editImage = nodeStore.getCurrentConfig(this.state.id, 'editImage');
        let selected = nodeStore.getCurrentConfig(this.state.id, 'selected');
        controls = (<Image key={'image'} name={'image'} id={this.state.id} selected={selected} editImage={editImage} onChange={this.onConfig.bind(this)} />);
        break;
      }
      case 'PATTERN': {
        controls = (<Pattern key={'pattern'} name={'pattern'} id={this.state.id} selected={nodeStore.getCurrentConfig(this.state.id, 'selected') || configs.selected.defaultValue} editPattern={nodeStore.getCurrentConfig(this.state.id, 'editPattern')} onChange={this.onConfig.bind(this)}/>);
        break;
      }
      default:
        for(let key in configs) {
          if(configs.hasOwnProperty(key)) {
            controls.push(self.renderControl(key, configs[key]));
          }
        }
      }
    }

    return (
      <Modal
        contentLabel='configuratorDialog'
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        className={this.state.id === 'normalTipsDialog' ? 'configurator-dialog normal-dialog' : 'configurator-dialog'}
        overlayClassName="dialog-overlay">
        <div className="dialog-container" ref={(node)=>{this.dialogNode=node;}}>
          {self.renderDialogHeader()}
          <div className="dialog-body">{controls}</div>
          {self.renderDialogFooter()}
        </div>
      </Modal>
    );
  }

  toggleConfig(nodeId, ele) {
    let self = this;
    self.nodeId = nodeId;
    let config = editerStore.getConfigureNode();
    if (config && config.id === nodeId) {
      if (!self.state.modalIsOpen) {
        self.open(config.type, config.id, ele);
        if (window._runtime === 'cordova') {
          window.ga.trackEvent('expandConfig', config.type);
        }
      }
    }
    else {
      if (self.state.modalIsOpen) {
        self.close();
      }
    }
  }

  //for sequence node, keep config panel display
  keepConfigDisplay(ele, nodeId) {
    if (ele && ele.closest('.hide-config')) {
      this.close();
    } else {
      this.toggleConfig(nodeId, ele);  // if tapped node is not sequence, do normal logic
    }
  }

  openTipsDialog(ele, nodeId, obj) {
    let self = this;
    console.log(ele, nodeId);
    console.log('normalDialogArgs', obj);
    if(typeof obj === 'object') {
      this.normalDialogTitle = obj.title;
      this.normalDialogText = obj.text;
      this.normalDialogCallback = obj.callback;
      this.setState({
        modalIsOpen: true,
        type: obj.type,
        id: nodeId
      });
      setTimeout(()=>{
        self.dialogNode.closest('.ReactModal__Overlay.dialog-overlay').style.zIndex = '60';
      },0);
    }

  }

  componentDidMount() {
    let self = this;
    self.toggleConfigFunc = self.toggleConfig.bind(self);
    self.keepConfigDisplayFunc = self.keepConfigDisplay.bind(self);
    //editerStore.on('configureNode', self.toggleConfigFunc);
    //editerStore.on('activateNode', self.keepConfigDisplayFunc);
    editerStore.on('openConfiguratorDialog', self.keepConfigDisplayFunc);

    //apply for tipsDialog, like downVideos tips for checkNetConnection
    BuildCaseStore.on('openNormalTipsDialog', self.openTipsDialog);
    guideStore.on('openNormalTipsDialog', self.openTipsDialog);

  }

  componentWillUnmount() {
    this.conf = {};
    //editerStore.off('configureNode', this.toggleConfigFunc);
    //editerStore.off('activateNode', this.keepConfigDisplayFunc);
    editerStore.off('openConfiguratorDialog', this.keepConfigDisplayFunc);
    BuildCaseStore.off('openNormalTipsDialog', this.openTipsDialog);
    guideStore.off('openNormalTipsDialog', this.openTipsDialog);
  }
}

export { ConfiguratorDialog };
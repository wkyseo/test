import React, { Component } from 'react';
// import languages from '../../../languages/index';
import {guideStore} from '../../../stores/guideStore/guideStore';
// import {Text_Position, Drag_type} from '../../../constants/BeginGuideSteps';
import {Drag_type} from '../../../constants/BeginGuideSteps';
import {Prompt} from './Prompt.react';
require('../hit/hit.less');
require('./drag.less');

class Drag extends Component {
  constructor() {
    super(...arguments);
    this.stepData = this.props.stepData;
    this.guideType = this.props.guideType;
    this.stepIndex = this.props.stepIndex;
    this.state = {
      render: false,
      dragType: this.stepData.subType,
      stepIndex: this.stepIndex,
    };
    this.showGuide = this.showGuide.bind(this);
  }

  renderCloneEle() {
    if(this.state.dragType === Drag_type.block) {
      //let trueDOM = document.querySelector(this.stepData.param.startBlock);
    }
  }

  renderWireFrame() {
    let stepData = this.stepData;
    if(stepData.targetRect && stepData.targetRect.type) {
      return (<div className={`wire-frame ${stepData.targetRect.type}`} ref={(node) => {this.wireFrame = node;}}></div>);
    }
  }

  renderPrompts(){
    let prompts = [];
    this.stepData.prompts.forEach((info, index) => {
      prompts.push(<Prompt precondition={info.precondition} target={info.target} hint={info.hint} animation={info.animation} key={`prompt-${index}`}></Prompt>);
    });
    return prompts;
  }

  /*拖拽需要的信息
  * 1.行为是拖拽模块or线
  * 2.载体的信息（目标和tipsText）
  * 3.目标的位置或者目标本身
  * 4.未成功后的行为
  * */
  render() {
    // return (
    //   <div className="guide-drag untouchable" style={{display: this.state.render === true ? 'block' : 'none'}} ref={(el) => {this.mask = el;}}>
    //     {this.renderCloneEle()}
    //     <img className={'gesture'} src="./img/icon-guide-gesture.png" alt="" ref={(node) => {this.gestureNode = node;}}/>
    //     <div className="text-wrap" ref={(node) => {this.textNode = node;}}>
    //       <img className={'text-icon'} src="./img/icon-guide-textPerson.png" alt=""/>
    //       <span className={'text'}>{languages.getTranslation(this.stepData.param.text)}</span>
    //     </div>
    //     {this.state.dragType === Drag_type.block ? this.renderWireFrame() : ''}
    //   </div>
    // );
    return (
      <div className="guide-drag untouchable" style={{display: this.state.render === true ? 'block' : 'none'}} ref={(el) => {this.mask = el;}}>
        {this.renderCloneEle()}
        {this.renderPrompts()}
        {this.state.dragType === Drag_type.block ? this.renderWireFrame() : ''}
      </div>
    );
  }

  setStyle(bounding) {
    console.log('[bounding]', bounding);
    if(bounding) {

      //设置手指位置
      // let left = bounding.left + bounding.width - 30;
      // let top = bounding.top + bounding.height - 30;
      // this.gestureNode.style.left = left + 'px';
      // this.gestureNode.style.top = top + 'px';
      // this.gestureNode.classList.add('gesture-animation');

      //设置文本位置
      // let gestureNodeBounding = this.gestureNode.getBoundingClientRect();
      // console.log('gestureNodeBounding', gestureNodeBounding);
      // switch (this.stepData.param.textPosition) {
      // case Text_Position.rightBottom:
      //   this.textNode.style.left = Number(gestureNodeBounding.left) + Number(gestureNodeBounding.width) + 12 +'px';
      //   this.textNode.style.top = Number(gestureNodeBounding.top) + Number(gestureNodeBounding.height) + 2 +'px';
      //   break;
      // case Text_Position.topCenter:
      //   break;
      // case Text_Position.bottomLeft:
      //   break;
      // case Text_Position.right:
      //   break;
      // case Text_Position.topRight:
      //   break;
      // default:
      //   break;
      // }

      this.setWireFrame(bounding);
    }

  }

  setWireFrame(bounding) {
    switch(this.stepData.targetRect.type) {
    case 'square-big':
      this.wireFrame.style.width = `${bounding.width * 1.82}px`;
      this.wireFrame.style.height = `${bounding.height * 1.82}px`;
      break;
    default:
      this.wireFrame.style.width = `${bounding.width}px`;
      this.wireFrame.style.height = `${bounding.height}px`;
      break;
    }
    
    this.wireFrame.style.left = `${this.stepData.targetRect.left * 100}%`;
    this.wireFrame.style.top = `${this.stepData.targetRect.top * 100}%`;
  }

  showGuide(bounding) {
    this.setState({
      render: true
    });
    setTimeout(()=>{
      this.setStyle(bounding);
    },0);
  }

  checkDragResult(node) {
    console.log('checkDragResult',node);
  }

  componentDidMount() {
    guideStore.on('showDragGuide', this.showGuide);
    guideStore.on('addNode', this.checkDragResult);
  }

  componentWillUnmount() {
    guideStore.off('showDragGuide', this.showGuide);
    guideStore.off('addNode', this.checkDragResult);
  }
}

export { Drag };
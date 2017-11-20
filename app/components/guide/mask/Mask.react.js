import React, { Component } from 'react';
import AppDispatcher from '../../../dispatcher/AppDispatcher';
import AppConstants from '../../../constants/AppConstants';
import languages from '../../../languages/index';
require('./mask.less');
require('./scene.less');

class Mask extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      showNextStepHint: false
    };
  }

  renderNextStepHint() {
    return (<div className={'next-step-hint' + (this.state.showNextStepHint? ' show' : ' hidden') }>{languages.getTranslation('guide-hit-continue')}</div>);
  }

  renderScene() {
    let objs = [];
    let stepData = this.props.stepData;
    if (stepData.param.objs) {
      stepData.param.objs.forEach((obj, index) => {
        if (obj.image) {
          objs.push (
            <div title={obj.title} style={{backgroundImage: `url("${obj.image}")` }} className={`scene-obj ${obj.className}`} key={`scene-obj-${index}.${obj.title}`}></div>
          );
        }
        else if (obj.text) {
          objs.push (
            <div title={obj.title} className={`scene-obj text-obj ${obj.className}`} key={`scene-obj-${index}.${obj.title}`}>{languages.getTranslation(obj.text)}</div>
          );
        }
      });
    }

    return (<div className="guide-scene">{objs}</div>);
  }

  renderContent() {
    return (
      <div className={'guide-content ' + this.props.stepData.param.tipsPosition}>
        {this.renderScene()}
        <div className="guide-subtitle">
          <div className="guide-text">
            {languages.getTranslation(this.props.stepData.param.text)}
          </div>
          {this.renderNextStepHint()}
        </div>
        <div className="guide-sprite" style={{backgroundImage: 'url("./img/sprite-normal.png")'}}></div>
      </div>
    );
  }

  // addRevealedPartMask() {
  //   let revealMasks = [];
  //   this.props.stepData.param.reveals.forEach((reveal, index) => {
  //     console.log(reveal);
  //     let rect = document.querySelector(reveal.className).getBoundingClientRect();
  //     revealMasks.push(
  //       <div style={{top:`${rect.top}px`,left:`${rect.left}px`,width:`${rect.width}px`,height:`${rect.height}px`}} 
  //         key={`scene-reveal-mask-${index}`}>
  //       </div>
  //       );
  //   });
  //   return (
  //     <div>
  //       <div className="guide-revealed-mask">{revealMasks}</div>
  //       <div className="guide-mask">
  //         {this.renderContent()}
  //       </div>
  //     </div>
  //   );
  // }

  renderMask() {
    // return (
    //   <div className="guide-mask">
    //     {this.renderContent()}
    //   </div>
    // );
    if (this.props.stepData.gesture) {
      return (
        <div>
          <div className="guide-mask">
            {this.renderContent()}
          </div>
          <div className="scene-gesture" key="scene-obj-gesture"></div>
        </div>
      );
    }
    else {
      return (
        <div className="guide-mask">
          {this.renderContent()}
        </div>
      );
    }
  }

  /*参数信息需要
  *遮罩+小人与文字+需要显示的模块[中间位置]+
  *
  */
  render() {
    return this.renderMask();
  }

  componentDidMount() {
    this._register = AppDispatcher.register((action) => {
      if (action.actionType == AppConstants.ENABLE_JUMP_TO_NEXT_GUIDE_STEP) {
        this.setState({showNextStepHint: true});
      }
      if (action.actionType == AppConstants.JUMP_TO_NEXT_GUIDE_STEP) {
        this.setState({showNextStepHint: false});
      }
    });
  }

  componentWillUnmount() {
    AppDispatcher.unregister(this._register);
  }
}

export { Mask };
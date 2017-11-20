import React, { Component } from 'react';
import {Mask} from './mask/Mask.react';
import {Hit} from './hit/Hit.react';
import {Drag} from './drag/Drag.react';
import languages from '../../languages';
import tapOrClick from '../../utils/tapOrClick';
import {guideStore} from '../../stores/guideStore/guideStore';
import UIActions from '../../actions/UIActions';

require('./guide.less');

/*
* localStorage--isFirstOpenAPP
* */
class Guide extends Component {
  constructor() {
    super();
    //let showGuide = localStorage.getItem('isFirstOpenAPP') === 'true' ? true : false;
    this.state = {
      showGuide: false,
      showMask: false,
      showHit: false,
      showDrag: false,
      stepData: '',
      guideType: '',
      stepIndex: 0,
    };
    this.closeGuide = this.closeGuide.bind(this);
    this.guideStepStart = this.guideStepStart.bind(this);
  }

  closeGuide() {
    let self = this;
    UIActions.toggleGuide({
      type: 'confirm',
      title: languages.getTranslation('guide-tips'),
      text: languages.getTranslation('guide-tips-text'),
      callback: function () {
        guideStore.closeGuide();
        self.setState({
          showGuide: false
        });
      },
    });

  }

  renderStep() {
    let showMask = this.state.showMask;
    let showHit = this.state.showHit;
    let showDrag = this.state.showDrag;
    let controls = [];
    if(showMask) {
      controls.push(<Mask stepData = {this.state.stepData} guideType={this.state.guideType} stepIndex={this.state.stepIndex} key={this.state.stepIndex}/>);
    }
    if(showHit) {
      controls.push(<Hit stepData = {this.state.stepData} guideType={this.state.guideType} stepIndex={this.state.stepIndex} key={this.state.stepIndex}/>);
    }
    if(showDrag) {
      controls.push(<Drag stepData = {this.state.stepData} guideType={this.state.guideType} stepIndex={this.state.stepIndex} key={this.state.stepIndex}/>);
    }

    return controls;
  }

  guideStepStart(obj) {
    console.log('[stepAllData]', obj);
    if(obj instanceof Object) {
      this.setState(obj);
    }
  }

  /*存在的组件
  * 1.不透明遮罩
  * 2.小人+文字+动画
  * 3.手指指向按钮，（指明某个模块）
  * 上面为一个组件GuideMask
  * -----动静分割线-----
  * 4.拖拽（模块或者线）
  * 5.点击手势
  * 6.正常逻辑（连接蓝牙）
  * */
  render() {
    if(!this.state.showGuide) {
      return null;
    }
    return (
      <div className="guide-container">
        {this.renderStep()}
        <div className="guide-skip" {...tapOrClick(this.closeGuide)}>{languages.getTranslation('guide-skip')}</div>
      </div>
    );
  }

  componentDidMount() {
    guideStore.on('GuideStepStart', this.guideStepStart);
  }

  componentWillUnmount() {
    guideStore.off('GuideStepStart', this.guideStepStart);
  }
}

export { Guide };
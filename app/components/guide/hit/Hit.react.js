import React, { Component } from 'react';
import languages from '../../../languages/index';
import {guideStore} from '../../../stores/guideStore/guideStore';
import {Text_Position} from '../../../constants/BeginGuideSteps';
require('./hit.less');

class Hit extends Component {
  constructor() {
    super(...arguments);
    this.stepData = this.props.stepData;
    this.guideType = this.props.guideType;
    this.state = {
      render: false,
    };
    this.showGuide = this.showGuide.bind(this);
  }
  /*点击需要的信息
  * 1.目标的信息(id+类型+面板or配置项)
  * 2.tipsText
  * 3.
  * */
  render() {
    return (
      <div className="guide-hit" style={{display: this.state.render === true ? 'block' : 'none'}}>
        <img className={'gesture'} src="./img/icon-guide-gesture.png" alt="" ref={(node) => {this.gestureNode = node;}}/>
        <div className="text-wrap" ref={(node) => {this.textNode = node;}}>
          <img className={'text-icon'} src="./img/icon-guide-textPerson.png" alt=""/>
          <span className={'text'}>{languages.getTranslation(this.stepData.param.text)}</span>
        </div>
      </div>
    );
  }

  setStyle(bounding) {
    if(bounding) {
      let left = bounding.left + bounding.width - 30;
      let top = bounding.top + bounding.height - 30;
      this.gestureNode.style.left = left + 'px';
      this.gestureNode.style.top = top + 'px';
      this.gestureNode.classList.add('guide-hand');
      let gestureNodeBounding = this.gestureNode.getBoundingClientRect();
      console.log('gestureNodeBounding', gestureNodeBounding);
      switch (this.stepData.param.textPosition) {
      case Text_Position.rightBottom:
        this.textNode.style.left = Number(gestureNodeBounding.left) + Number(gestureNodeBounding.width) + 12 +'px';
        this.textNode.style.top = Number(gestureNodeBounding.top) + Number(gestureNodeBounding.height) + 2 +'px';
        break;
      case Text_Position.topCenter:
        this.textNode.style.left = Number(gestureNodeBounding.left) + Number(gestureNodeBounding.width) + 'px';
        this.textNode.style.top = Number(gestureNodeBounding.top) - Number(gestureNodeBounding.height) - 20 +'px';
        this.textNode.style.transform = 'translateX(-53%)';
        break;
      case Text_Position.bottomLeft:
        this.textNode.style.left = Number(gestureNodeBounding.left) + Number(gestureNodeBounding.width) + 'px';
        this.textNode.style.top = Number(gestureNodeBounding.top) + Number(gestureNodeBounding.height) + 10 +'px';
        this.textNode.style.transform = 'translateX(-100%)';
        break;
      case Text_Position.right:
        this.textNode.style.left = Number(gestureNodeBounding.left) + Number(gestureNodeBounding.width) + 30 +'px';
        this.textNode.style.top = Number(gestureNodeBounding.top) + 5 +'px';
        break;
      case Text_Position.topRight:
        this.textNode.style.left = Number(gestureNodeBounding.left) + Number(gestureNodeBounding.width) + 20 +'px';
        this.textNode.style.top = Number(gestureNodeBounding.top) - Number(gestureNodeBounding.height) - 10 +'px';
        break;
      default:
        break;
      }
    }

  }

  showGuide(bounding) {
    this.setState({
      render: true
    });
    setTimeout(()=>{
      this.setStyle(bounding);
    },0);
  }

  componentDidMount() {
    guideStore.on('showHitGuide', this.showGuide);
  }

  componentWillUnmount() {
    guideStore.off('showHitGuide', this.showGuide);
  }
}

export { Hit };
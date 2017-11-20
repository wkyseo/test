import UIActions from '../../actions/UIActions';
import {Init_Action} from '../../constants/BeginGuideSteps';
import GuideStepTypeBase from './GuideStepTypeBase';
import GuideElementBounding from './guideElementBounding';
import { hashHistory } from 'react-router';
import {guideStore} from './guideStore';
import linkStore from '../LinkStore';

export default class GuideStepTypeMask extends GuideStepTypeBase {

  constructor(step, show, hide) {
    super(step, show, hide);
    this.selector = '.guide-container .guide-mask';
    this.toggleTime = 1000;
  }

  async init() {
    if(this.step.initAction) {
      if(this.step.initAction === Init_Action.historyPushApp) {
        hashHistory.push('app/create');
        guideStore.trigger('GuideStepStart', [guideStore.getShowState()]);
      }
    }

    // this.cleanMasks();
    // this.buildRevealMasks();
    this.setGesturePosition();

    let ele = await GuideElementBounding.getElement(this.selector);
    let listener = () => {
      this.isOver = true;
      UIActions.jumpToNextGuideStep();
    };
    if (ele instanceof Node) {
      this.listeners.touchend = {
        element: ele,
        listener: listener
      };
      this.listeners.mouseup = {
        element: ele,
        listener: listener
      };
    }
    
    if(this.step.param.index === 2.1) {
      console.log('[currentStep need open system BLE]');
      let inter = setInterval(()=>{
        if(linkStore.getStatus() !== 'closed') {
          clearInterval(inter);
          this.addListener();
          UIActions.enableJumpToNextGuideStep();
        }
      },100);
    }else {
      setTimeout(()=>{
        this.addListener();
        UIActions.enableJumpToNextGuideStep();
      }, this.toggleTime);
    }
    

  }

  cleanMasks() {
    let maskedEls = document.querySelectorAll('.guide-masked');
    for (let maskedEl of maskedEls) {
      maskedEl.classList.remove('guide-masked');
    }
  }

  setGesturePosition(){
    if (this.step.gesture) {
      let targetEl = document.querySelector(this.step.gesture.selector);
      let gestureEl = document.querySelector('.scene-gesture');
      if (targetEl){
        let rect = targetEl.getBoundingClientRect();
        let gestureRect = gestureEl.getBoundingClientRect();
        if (this.step.gesture.position === 'bottom') {
          gestureEl.style = `top:${rect.bottom}px;left:${rect.right}px;background-image:url('./img/guide/guide-gesture-bottom.png')`;
          if (!gestureEl.classList.contains('bottom')) {
            gestureEl.className += ' bottom';
          }
        }
        if (this.step.gesture.position === 'top') {
          gestureEl.style = `top:${rect.top - gestureRect.height}px;left:${rect.right}px;background-image:url('./img/guide/guide-gesture-top.png')`;
          if (!gestureEl.classList.contains('top')) {
            gestureEl.className += ' top';
          }
        }
      }
    }
  }

  buildRevealMasks() {
    if (this.step.param.reveals) {
      for (let reveal of this.step.param.reveals) {
        let revealEle = document.querySelector(reveal.selector);
        if (!revealEle.classList.contains('guide-masked')){
          revealEle.className += ' guide-masked';
        }
      }
    }
  }

}
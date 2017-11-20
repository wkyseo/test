import GuideStepTypeBase from './GuideStepTypeBase';
import {Init_Action} from '../../constants/BeginGuideSteps';
import GuideElementBounding from './guideElementBounding';
import { hashHistory } from 'react-router';
import UIActions from '../../actions/UIActions';
import {guideStore} from './guideStore';

export default class GuideStepTypeHit extends GuideStepTypeBase {

  constructor(step, show, hide) {
    super(step, show, hide);
  }

  async init() {
    //有些步骤需要先初始化，根据参数来判断
    if(this.step.initAction) {
      if(this.step.initAction === Init_Action.historyPushApp) {
        hashHistory.push('app/create');
        guideStore.trigger('GuideStepStart', [guideStore.getShowState()]);
      }
    }
    let from = this.step.from;
    if (!(typeof from === 'number')) {
      from = parseInt(from);
    }
    this.bounding = await this.setBounding();
   /* switch (from) {
    case Hit_From.paletteNode:
      this.setPaletteCallback();
      break;
    case Hit_From.canvasNode:
      this.setCanvasNodeCallback();
      break;
    case Hit_From.canvasLine:
      this.setCanvasLineCallback();
      break;
    case Hit_From.canvasLineBtn:
      this.setCanvasLineBtnCallback();
      break;
    case Hit_From.nodeConfig:
      this.setNodeConfigCallback();
      break;
    case Hit_From.communicationType:
      this.setCommunicateCallback();
      break;
    default:
      break;
    }*/
  }

  async setBounding() {
    let selector = this.step.param.selector;
    let ele = await GuideElementBounding.getElement(selector);
    let listener = () => {
      this.isOver = true;
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
    this.addListener();

    //保证Guide组件已被渲染
    setTimeout(() =>{
      UIActions.showHitGuide();
    },10);
    return GuideElementBounding.getElementBounding(ele);
  }

/*  setPaletteCallback() {

  }

  setCanvasNodeCallback() {

  }

  setCanvasLineCallback() {

  }

  setCanvasLineBtnCallback() {

  }

  setNodeConfigCallback() {

  }

  async setCommunicateCallback(){

  }*/

}
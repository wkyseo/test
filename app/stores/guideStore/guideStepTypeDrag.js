import GuideStepTypeBase from './GuideStepTypeBase';
import GuideElementBounding from './guideElementBounding';
import UIActions from '../../actions/UIActions';

/**
 * 拖拽引导
 *
 * @class GuideStepTypeDrag
 */
export default class GuideStepTypeDrag extends GuideStepTypeBase {
  /**
   * Creates an instance of GuideStepTypeDrag.
   *
   *
   * @memberOf GuideStepTypeDrag
   */
  constructor(step, show, hide) {
    super(step, show, hide);

  }

  async init() {
    let ele = await GuideElementBounding.getElement(this.step.param.startBlock);
    // let listener = () => {
    //   this.isOver = true;
    // };
    console.log('ele',ele);
    if (ele instanceof Node) {
      // this.listeners.touchend = {
      //   element: ele,
      //   listener: listener
      // };
      // this.listeners.mouseup = {
      //   element: ele,
      //   listener: listener
      // };
      ele.classList.add('touchable');
    }
    this.addListener();

    //保证Guide组件已被渲染
    setTimeout(() =>{
      if (ele) {
        let bounding = ele.getBoundingClientRect();
        UIActions.showDragGuide(bounding);
      }
    },10);
    // this.bounding = GuideElementBounding.getElementBounding(ele);
  }

  setListeners() {

  }

  resetBounding() {

  }
}
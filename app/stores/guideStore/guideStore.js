import EventEmitter from 'wolfy87-eventemitter';
import {BeginGuideSteps, Guide_Step_Types,Init_Action} from '../../constants/BeginGuideSteps';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import AppConstants from '../../constants/AppConstants';
import GuideHit from './guideStepTypeHit';
import GuideDrag from './guideStepTypeDrag';
import GuideMask from './guideStepTypeMask';
import GuideInteraction from './guideStepTypeInteraction';
import LinkStore from '../LinkStore';
import {hashHistory } from 'react-router';
import projectStore from '../projectStore';
import linkStore from '../LinkStore';

const Guide_Type = {
  begin: 'beginGuide',
  case: 'caseGuide'
};

class GuideStore extends EventEmitter {
  constructor() {
    super(...arguments);
    this.guideList = BeginGuideSteps;

    this.showGuide = false;
    this.showMask = false;
    this.showHit = false;
    this.showDrag = false;
    //引导类型
    this.guideStepType = Guide_Step_Types.mask;
    // 引导元素的位置信息
    this.bounding =  {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      path: null
    };

    // 是否已经初始化
    this.hasInit= false;
      // 事件监听列表
    this.listeners={};

    this.guideType = Guide_Type.begin;
    this.currentStepIndex = 0;
    this.isSkippedGuide = false;

    let self = this;
    AppDispatcher.register((action) => {
      if(action.actionType === AppConstants.START_GUIDE){
        if(action.guideType === Guide_Type.begin) {
          if(localStorage.getItem('isFirstOpenAPP') === 'true') {
            //新手引导
            if(window.ble) {
              linkStore.firstCheckBleEnabled(()=>{
                this.startBeginGuide();
              });
            }else {
              this.startBeginGuide();
            }
          }
        }else if(action.guideType === Guide_Type.case) {
          //案例引导
          this.setGuideList();
        }
        this.guideType = action.guideType;
      }else if(action.actionType === AppConstants.TOGGLE_GUIDE){
        let obj = {
          type: action.type,
          title: action.title,
          text: action.text,
          callback: action.callback
        };
        self.trigger('openNormalTipsDialog', ['testDOM', 'normalTipsDialog', obj]);
      }else if(action.actionType === AppConstants.SHOW_HIT_GUIDE) {
        self.trigger('showHitGuide', [self.bounding]);
      }else if(action.actionType === AppConstants.SHOW_DRAG_GUIDE) {
        self.trigger('showDragGuide', [action.bounding]);
      }else if(action.actionType === AppConstants.EDITER_NODE_ADD) {
        self.trigger('addNode', [action.nodeInfo]);
      }else if(action.actionType === AppConstants.EDITER_NODE_MOVE) {
        self.trigger('moveNode', [action.nodeInfo]);
      }else if(action.actionType === AppConstants.EDITER_NODE_REMOVE) {
        self.trigger('removeNode', [action.nodeInfo]);
      }
    });

  }

  startBeginGuide() {
    //蓝牙已连接，跳过连接蓝牙的步骤
    console.log('[blueTooth Status]', linkStore.getStatus());
    if(linkStore.getStatus() === 'connected') {
      let _copy = Object.assign({}, BeginGuideSteps);
      _copy.steps.splice(1,4);
      _copy.steps[1].initAction = Init_Action.historyPushApp;
      this.setGuideList(_copy);
    }else if(linkStore.getStatus() === 'closed') {
      this.setGuideList(BeginGuideSteps);
    } else {
      let _copy = Object.assign({}, BeginGuideSteps);
      _copy.steps.splice(3,1);
      this.setGuideList(_copy);
    }
    this.setStepFlow();
  }

  //可以指定引导数据，比如案例引导。默认是BeginGuideSteps
  setGuideList(guideList=BeginGuideSteps) {
    this.guideList = guideList;
  }

  getGuideList() {
    return this.guideList;
  }

  _initShowState() {
    this.showGuide = true;
    this.showMask = false;
    this.showHit = false;
    this.showDrag = false;
  }

  getShowState() {
    return {
      showGuide: this.showGuide,
      showMask: this.showMask,
      showHit: this.showHit,
      showDrag: this.showDrag,
      stepData: this.stepData,
      guideType: this.guideType,
      stepIndex: this.currentStepIndex,
      bounding: this.bounding
    };
  }

  getShowGuide() {
    return this.showGuide;
  }

  closeGuide() {
    console.log('closeGuide');
    if(this.guideType === Guide_Type.begin) {
      this.showGuide = false;
      this.isSkippedGuide = true;
      localStorage.setItem('isFirstOpenAPP', 'false');
      if(location.hash !== '#/app') {
        localStorage.removeItem(projectStore.tmpCurrentProjectId);
        hashHistory.push('app');
      }
      this.guide.cancel();
    }
  }

  showBeginGuide() {
    //第一次打开APP，是否显示新手引导
    if(localStorage.getItem('isFirstOpenAPP') === null) {
      console.log('set localStorage for firstOpenAPP');
      localStorage.setItem('isFirstOpenAPP', 'true');
    }
  }

  setStepFlow() {
    console.log('[guideList]', this.guideList);
    if(this.guideList && this.guideList.steps && this.guideList.steps.length > 0) {
      (async () => {
        for(let i=0,len=this.guideList.steps.length; i<len; i++) {
          let step = this.guideList.steps[i];
          this.guide = null;
          this.currentStepIndex = i;
          this._initShowState();
          this.stepData = step;
          console.log('[stepType]',step.type);
          switch (step.type) {
          case Guide_Step_Types.mask:
            this.showMask = true;
            this.guide = new GuideMask(step);
            break;
          case Guide_Step_Types.interaction:
            this.guide = new GuideInteraction(step);
            LinkStore.setGuideConnectResult(false);
            break;
          case Guide_Step_Types.hit:
            this.showHit = true;
            this.guide = new GuideHit(step);
            break;
          case Guide_Step_Types.drag:
            this.showDrag = true;
            this.guide = new GuideDrag(step);
            break;
          default:
            console.log('[Don\'t support current stepType]: ', step.type);
            break;
          }

          let stepAllData = this.getShowState();

          //触发guide组件
          this.trigger('GuideStepStart', [stepAllData]);

          await this.guide.init();

          //正常流的组件监听触发开始
          this.trigger('guideStartCallback', [stepAllData]);

          this.bounding = this.guide.bounding;
          console.log('[bounding]', this.bounding);

          //等待引导完成
          await this.guide.wait();

          //正常流的组件监听触发结束
          this.trigger('guideEndCallback', [stepAllData]);

          if (this.guide.isCanceled()) {
            console.log('cancelGuide');
            this.isSkippedGuide = false;
            break;
          }


          if(i === len - 1) {
            this._initShowState();
            this.showGuide = false;
            this.trigger('GuideStepStart', [this.getShowState()]);
          }
        }
      })();

    }
  }

}

let guideStore  = new GuideStore();
export {guideStore, Guide_Type};
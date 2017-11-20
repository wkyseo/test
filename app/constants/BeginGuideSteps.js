const Hit_From = {
  paletteNode: 1,
  canvasNode: 2,
  canvasLine: 4,
  canvasLineBtn:5,
  nodeConfig: 6,
  communicationType: 10
};

const Drag_From = {
  paletteNode: 1,
  canvasNode: 2,
  shelfNode: 3
};

const Drag_type = {
  block: 'block',
  line: 'line'
};

const Text_Position = {
  rightBottom: 1,
  topCenter: 2,
  bottomLeft: 3,
  right: 4,
  topRight: 5,
};

const Init_Action = {
  historyPushApp: '/app/create'// hashHistory.push('app/create');
};

/*
* 步骤的类型可以为mask，hit，drag，interaction，所有类型中都可能有如果有initAction，有先执行
* 1.MASK中的动画模块特殊对待，其他通过参数来区分
* 2.interaction中的行为值可以为：selectConnectType
* 3.hit的from有1（节点分类栏），2（面板节点），3（辅助节点），4（线），5（线上的叉叉），6（配置项），10（连接方式[蓝牙orWifi]）
* 4.drag的from有1（节点分类栏），2（面板节点），3（硬件栏）,subType的类型有block(节点), line(线)
* */
const Guide_Step_Types = {
  mask: 'mask',
  hit: 'hit',
  drag: 'drag',
  interaction: 'interaction'
};

const BeginGuideSteps = {
  type: 'beginGuide',
  steps:[
    //步骤1
    {
      type: 'mask',
      param: {
        index: 0,
        objs: [
          {
            title: 'bg',
            className: 'scene-1-obj1-bg',
            image: './img/guide/guide-scene-1-obj1.png',
          }
        ],
        text: 'guide-step1-text',
        tipsPosition: 'bottom', //默认是bottom
      },
    },
    //步骤2
    {
      type: 'mask',
      param: {
        index: 1,
        objs: [
          {
            title: 'ble',
            className: 'scene-2-obj1-ble',
            image: './img/guide/guide-electron-ble.png',
          },
          {
            title: 'power',
            className: 'scene-2-obj2-power',
            image: './img/guide/guide-scene-2-obj2.png',
          }
        ],
        text: 'guide-step2-text',
        tipsPosition: 'bottom',
      },
    },
    //步骤3
    {
      type: 'mask',
      param: {
        index: 2,
        objs: [
          {
            title: 'ble',
            className: 'scene-3-obj1-ble',
            image: './img/guide/guide-electron-ble.png',
          },
          {
            title: 'power',
            className: 'scene-3-obj2-power',
            image: './img/guide/guide-electron-power.png',
          },
          {
            title: 'shadow-power',
            className: 'scene-3-obj2-shadow-power',
            image: './img/guide/guide-scene-2-obj2.png',
          },
          {
            title: 'hand',
            className: 'scene-3-obj3-hand',
            image: './img/icon-guide-gesture.png',
          }
        ],
        text: 'guide-step3-text',
        tipsPosition: 'bottom',
      },
    },
    //步骤3.1特别的，当蓝牙未打开时候才显示
    {
      type: 'mask',
      param: {
        index: 2.1,
        objs: [
          {
            title: 'bg',
            className: 'scene-3-1-obj1-bg',
            image: './img/guide/guide-open-ble.png',
          }
        ],
        text: 'guide-step3-1-text',
        tipsPosition: 'bottom', //默认是bottom
      },
    },
    //步骤4
    {
      type: 'hit',
      initAction: Init_Action.historyPushApp,
      from: 10,
      param: {
        index: 3,
        selector: '.ConnectionTypeDialog .choose-connection .ble-button',
        text: 'guide-step4-text',
        textPosition: 1, //此为默认值
      },
    },
    //步骤5
    {
      type: 'interaction',
      param: {
        index: 4,
        selector: '.icon-ble',
        success: '.link-dialog .ble-connect-finished-confirm',
      },
    },
    //步骤6
    {
      type: 'mask',
      param: {
        index: 5,
        objs: [
          {
            title: 'scene-title',
            className: 'scene-center-title',
            text: 'guide-step6-scene-text'
          }
        ],
        text: 'guide-step6-text',
        tipsPosition: 'bottom',
      },
    },
    //步骤7
    {
      type: 'mask',
      param: {
        index: 6,
        objs: [
          {
            title: 'ble',
            className: 'scene-7-obj1-ble',
            image: './img/guide/guide-electron-ble.png',
          },
          {
            title: 'led',
            className: 'scene-7-obj2-led',
            image: './img/guide/guide-electron-led.png',
          },
          {
            title: 'power',
            className: 'scene-7-obj3-power',
            image: './img/guide/guide-electron-power.png',
          }
        ],
        text: 'guide-step7-text',
        tipsPosition: 'bottom',
      },
    },
    //步骤8
    {
      type: 'mask',
      // initAction: Init_Action.historyPushApp,
      param: {
        index: 7,
        reveals: [
          {
            selector: '.editer-shelf'
          }
        ],
        text: 'guide-step8-text',
        tipsPosition: 'bottom', //默认是bottom
      },
      gesture: {
        position: 'bottom', //方向可能上或者下
        selector: '.editer-shelf .node-type-LEDPANEL'
      }
    },
    //步骤9
    {
      type: 'drag',
      from: 3,
      subType: 'block',
      param: {
        index: 8,
        text: 'guide-step9-text',
        textPosition: 1,
        startBlock: '.editer-shelf .node-type-LEDPANEL',
        endBlock: '',
      },
      prompts: [
        {
          precondition: {
            selectors: ['.node-preview.node-type-LEDPANEL'],
            type: 'exist'
          },
          target: {
            selectors: ['.node-actual.node-type-LEDPANEL'],
            type: 'exist'
          },
          hint: {
            position: {
              selector: '.node-preview.node-type-LEDPANEL',
              type: 'left-bottom'
            },
            text: 'guide-step9-text-1'
          },
          animation: {
            type: 'move',
            source: {selector:'.node-actual.node-type-LEDPANEL'},
            target: {selector:'.wire-frame'},
            className: 'scene-9-anim-1'
          }
        },
        {
          precondition: {
            selectors: ['.node-actual.node-type-LEDPANEL'],
            type: 'exist'
          },
          target: {
            selectors: ['.wire-frame','.node-actual.node-type-LEDPANEL'],
            type: 'overlap'
          },
          hint: {
            position: {
              selector: '.wire-frame',
              type: 'left-top'
            },
            text: 'guide-step9-text-2'
          }
        }
      ],
      targetRect: {
        left: 0.75,
        top: 0.5,
        width: 100,
        height: 100,
        type: 'square-big' //按照交互可能的值有rect／circle
      }
    },
    //步骤10
    {
      type: 'mask',
      param: {
        index: 9,
        objs: [
          {
            title: 'scene-title',
            className: 'scene-center-title',
            text: 'guide-step10-scene-text'
          }
        ],
        text: 'guide-step10-text',
        tipsPosition: 'bottom', //默认是bottom
      },
    },
    //步骤11
    {
      type: 'mask',
      param: {
        index: 10,
        text: 'guide-step11-text',
        tipsPosition: 'middle', //默认是bottom
      },
    },
    //步骤12
    {
      type: 'mask',
      param: {
        index: 11,
        text: 'guide-step12-text',
        tipsPosition: 'middle', //默认是bottom
      },
      gesture: {
        position: 'top', //方向可能上或者下
        selector: '.editer-palette .node-type-TIMER img'
      }
    },
    //步骤13
    {
      type: 'drag',
      from: 1,
      subType: 'block',
      param: {
        index: 12,
        text: 'guide-step13-text',
        textPosition: 4,
        startBlock: '.editer-palette .node-type-TIMER',
        endBlock: '',
      },
      targetRect: {
        left: 0.75,
        top: 0.5,
        width: 100,
        height: 100,
        type: 'circle' //按照交互可能的值有rect／circle
      }
    },
    //步骤14
    {
      type: 'drag',
      from: 2,
      subType: 'line',
      param: {
        index: 13,
        text: 'guide-step14-text',
        textPosition: 5,
        startBlock: '.editer-surface-canvas .node-type-TIMER .node-port-output',
        endBlock: '.node-type-LEDPANEL .node-port-input',
      },
      targetRect: {
        left: 0.75,
        top: 0.5,
        width: 100,
        height: 100,
        type: 'circle' //按照交互可能的值有rect／circle
      }
    },
    //步骤15
    {
      type: 'mask',
      param: {
        index: 14,
        text: 'guide-step15-text',
        tipsPosition: 'bottom', //默认是bottom
      },
    },
    //步骤16
    {
      type: 'hit',
      from: 4,
      param: {
        index: 15,
        selector: /^(timer@\d+)&\1-output&(ledpanel@\d+)&\2/gi, //正则获取线的ID
        text: 'guide-step16-text',
        textPosition: 2,
      },
    },
    //步骤17
    {
      type: 'hit',
      from: 5,
      param: {
        index: 16,
        selector: '.deleteBtn',
        text: 'guide-step17-text',
        textPosition: 2,
      },
    },
    //步骤18
    {
      type: 'mask',
      param: {
        index: 17,
        text: 'guide-step18-text',
        tipsPosition: 'bottom',
      },
    },
    //步骤19
    {
      type: 'mask',
      param: {
        index: 18,
        text: 'guide-step19-text',
        tipsPosition: 'bottom',
      },
    },
    //步骤20
    {
      type: 'hit',
      from: 2,
      param: {
        index: 19,
        selector: '.node-type-LEDPANEL',
        text: 'guide-step20-text',
        textPosition: 3,
      },
    },
    //步骤21
    {
      type: 'drag',
      from: 3,
      subType: 'block',
      param: {
        index: 20,
        text: 'guide-step21-text',
        textPosition: 3,
        startBlock: '.node-preview-palette.node-type-IMAGE',
        endBlock: '',
      },
      targetRect: {
        left: 0.75,
        top: 0.5,
        width: 100,
        height: 100,
        type: 'circle' //按照交互可能的值有rect／circle
      }
    },
    //步骤22
    {
      type: 'hit',
      from: 3,
      param: {
        index: 21,
        selector: '.node-actual.node-type-IMAGE',
        text: 'guide-step22-text',
        textPosition: 1,
      },
    },
    //步骤23
    {
      type: 'hit',
      from: 6,
      param: {
        index: 22,
        selector: '.configurator-dialog [data-id="3"]',
        text: 'guide-step23-text',
        textPosition: 1,
      },
    },
    //步骤24
    {
      type: 'hit',
      from: 6,
      param: {
        index: 23,
        selector: '.configurator-dialog .dialog-footer',
        text: 'guide-step24-text',
        textPosition: 2,
      },
    },
    //步骤25
    {
      type: 'mask',
      param: {
        index: 24,
        text: 'guide-step25-text',
        tipsPosition: 'bottom',
      },
    },
    //步骤26
    {
      type: 'drag',
      from: 2,
      subType: 'line',
      param: {
        index: 25,
        text: 'guide-step26-text',
        textPosition: 1,
        startBlock: '.editer-surface-canvas .node-type-TIMER .node-port-output',
        endBlock: '.node-type-IMAGE .node-port-input',
      },
    },
    //步骤27
    {
      type: 'mask',
      param: {
        index: 26,
        text: 'guide-step27-text',
        tipsPosition: 'bottom',
      },
    },
    //步骤28
    {
      type: 'hit',
      from: 2,
      param: {
        index: 27,
        selector: '.editer-main .back-to-entrance',
        text: 'guide-step28-text',
        tipsPosition: 'bottom',
      },
    },
    //步骤29
    {
      type: 'mask',
      param: {
        index: 28,
        text: 'guide-step29-text',
        tipsPosition: 'bottom',
      },
    },
  ]
};

export {BeginGuideSteps, Hit_From, Drag_From, Drag_type, Init_Action,Guide_Step_Types, Text_Position};
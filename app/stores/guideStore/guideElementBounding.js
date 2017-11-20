/**
 * 引导的元素的位置及大小的获取
 *
 * @class GuideElementBounding
 */
export default class GuideElementBounding {

  /**
   * Creates an instance of GuideElementBounding.
   *
   *
   * @memberOf GuideElementBounding
   */
  constructor() {
  }

  static getElement(selector) {
    return new Promise((resolve, reject) => {
      let timeout = setTimeout(reject, 3000);
      let inter = setInterval(() => {
        let ele;
        //针对正则的选择器
        if(typeof selector === 'object') {
          let svgs = document.querySelectorAll('svg');
          if(svgs.length>0) {
            for(let svg of svgs) {
              if(selector.test(svg.getAttribute('id'))) {
                ele = svg;
                return false;
              }
            }
          }
        }else {
          ele = document.querySelector(selector);
        }
        if (ele) {
          clearInterval(inter);
          clearTimeout(timeout);
          resolve(ele);
        }
      }, 100);
    });
  }

  /**
   * 获取页面元素的坐标位置 以及 大小
   *
   * @param {any} selector
   * @returns
   *
   * @memberOf GuideElementBounding
   */
  static getElementBounding(selector) {
    let element = null;
    let bounding = null;
    // 如果选择器是DOM节点
    if (selector instanceof Node) {
      element = selector;
    } else if (typeof selector === 'string') {
      element = document.querySelector(selector);
    } else {
      throw `getElementBounding: { selector: ${selector} } is not define`;
    }
    if (element) {
      bounding = element.getBoundingClientRect();
    }
    if (bounding) {
      return {
        top: bounding.top,
        left: bounding.left,
        width: bounding.width,
        height: bounding.height
      };
    }
    return null;
  }

  /**
   * 获取分类菜单的位置及大小信息
   *
   * @param {any} categoryName
   * @returns
   *
   * @memberOf GuideNew
   */
  static getCategoryBounding(categoryName) {
    let selector = `.${categoryName}[role="treeitem"]`;
    return this.getElementBounding(selector);
  }

  /**
   * 获取 block 块的位置及大小信息
   *
   * @param {any} blockId
   * @returns
   *
   * @memberOf GuideNew
   */
  /*static getBlockBounding(blockId) {
    let block = null;
    let bounding = null;
    if (typeof blockId === 'object') {
      block = blockId;
    } else {
      block = workspace.getBlockById(blockId);
    }
    if (block) {
      bounding = this.getElementBounding(block.svgGroup_);
      let path = block.svgPath_.cloneNode();
      if (workspace.scale !== 1) {
        path.setAttribute('transform', `scale(${workspace.scale})`);
        path.setAttribute('opacity', .6);
      }
      path.setAttribute('d', path.getAttribute('d').split('\n')[0]);
      if (bounding) {
        bounding.path = path;
      }
    }
    return bounding;
  }

  /!**
   * 获取不同分类下面的 block 的位置及大小信息
   *
   * @param {any} blockType
   * @returns
   *
   * @memberOf GuideNew
   *!/
  static getFlyoutBlockBounding(blockType) {
    let blocks = Blockly.flyout.workspace_.topBlocks_;
    blockType = blockType.split(':').pop();
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i].type === blockType) {
        this.getBlockBounding(blocks[i]);
        break;
      }
    }
  }

  /!**
   * 获取指定块的参数的大小及位置信息
   *
   * @param {any} blockId
   * @param {any} no
   * @returns
   *
   * @memberOf GuideNew
   *!/
  static getBlockArgmentBounding(blockId, idx) {
    let argsDom = this.getBlockArgumentsDom(blockId);
    if (argsDom && argsDom.length) {
      let dom = argsDom[idx];
      if (dom) {
        return this.getElementBounding(dom);
      }
    }
    return null;
  }

  /!**
   * 根据 blockId 获取当前块下面的所有可输入的参数的 DOM 的集合
   *
   * @param {any} blockId
   * @returns
   *
   * @memberOf GuideElementBounding
   *!/
  static getBlockArgumentsDom(blockId) {
    // 获取 dropdown 和 inputValue 的值
    let block = workspace.getBlockById(blockId);
    let argsDom = [];
    if (block) {
      block.inputList && block.inputList.map((input) => {
        input.connection && argsDom.push(input.connection.targetConnection.sourceBlock_.svgGroup_);
        input.fieldRow && input.fieldRow.map((field) => {
          // 只把下拉框加入到参数集合里面
          if (field instanceof Blockly.FieldDropdown || field instanceof MBlockly.FieldCustomize) {
            argsDom.push(field.fieldGroup_);
          }
        });
      });
    }
    return argsDom;
  }*/


}

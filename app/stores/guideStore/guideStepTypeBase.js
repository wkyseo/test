/**
 * 引导步骤类型 基类
 *
 * @class GuideStepTypeBase
 */
export default class GuideStepTypeBase {
  constructor(step, show=true, hide=false) {
    this.step = step;
    this.show = show;
    this.hide = hide;
    this.isOver = false;
    this.bounding = null;
    this.listeners = {};
    this.bValid = true;
  }

  async wait() {
    await new Promise((resolve) => {
      this.inter = setInterval(() => {
        if (this.isOver || this.isCanceled()) {
          clearInterval(this.inter);
          resolve();
        }
      }, 50);
    });
  }

  cancel() {
    this.bValid = false;
    this.removeListener();
  }

  isCanceled() {
    return !this.bValid;
  }

  setIsOver(boolean=true) {
    this.isOver = boolean;
  }

  addListener() {
    for (let key in this.listeners) {
      let listener = this.listeners[key];
      if (typeof listener === 'function') {
        console.log('not DOM Event');
      } else {
        // 添加 DOM 事件
        listener.element.addEventListener(key, listener.listener, { once: true }, false);
      }
    }
  }

  removeListener() {
    console.log('[listeners]',this.listeners);
    for (let key in this.listeners) {
      let listener = this.listeners[key];
      if (typeof listener === 'function') {
        console.log('not DOM Event');
      } else {
        // 添加 DOM 事件
        listener.element.removeEventListener(key, listener.listener);
      }
    }
    this.listeners = null;
  }
}
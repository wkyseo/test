import GuideStepTypeBase from './GuideStepTypeBase';
import LinkStore from '../LinkStore';

export default class GuideStepTypeInteraction extends GuideStepTypeBase {

  constructor(step, show, hide) {
    super(step, show, hide);

  }

  async init() {
    await new Promise((resolve) => {
      resolve();
    });
  }

  async wait() {
    await new Promise((resolve) => {
      this.inter = setInterval(() => {
        let result = LinkStore.getGuideConnectResult();
        if (result || this.isCanceled()) {
          clearInterval(this.inter);
          resolve();
        }
      }, 50);
    });
  }
}
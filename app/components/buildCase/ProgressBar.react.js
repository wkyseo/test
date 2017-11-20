import React, { Component } from 'react';
import languages from '../../languages';
import tapOrClick from '../../utils/tapOrClick';
import UIActions from '../../actions/UIActions';
import BuildCaseStore from '../../stores/buildCaseStore';
import Events from '../../constants/Events';

class ProgressBar extends Component{
  constructor() {
    super(...arguments);
    this.caseData = this.props.caseData;
    if(this.caseData && this.caseData.stepLists.length > 0) {
      this.stepLength = Number(this.caseData.stepLists.length);
    }

    this.state = {
      currentStep: 0,
      subTitle: 'case-instruction' //案例介绍-翻译的字段
    };

    this.toggleStep = this.toggleStep.bind(this);
    this.stepRepeat = this.stepRepeat.bind(this);
    this.renderBar = this.renderBar.bind(this);
    this.renderStepAction = this.renderStepAction.bind(this);
  }

  toggleStep(boolean) {
    let count = boolean === true ? 1 : -1;
    let _step = Number(this.state.currentStep);
    let currentStep = _step + count;
    let currentStepData = this.caseData.stepLists[currentStep];
    let subTitle = '';
    if(currentStepData) {
      subTitle = currentStepData.category;
    }else {
      subTitle = 'case-instruction';
    }
    this.setState({
      currentStep: currentStep,
      subTitle: subTitle
    });
    UIActions.toggleBuildCaseStep(currentStep);
  }

  stepRepeat(initialStep){
    let step = Number(initialStep);
    this.setState({
      currentStep: step
    });
  }

  renderBar() {
    let totalWidth = 18;
    let hasWidth = Number((this.state.currentStep + 1)/ this.stepLength * totalWidth).toFixed(2);
    return(
      <div className="total-bar" style={{width: totalWidth + 'vw'}}>
        <div className="has-bar" style={{width: hasWidth + 'vw'}}></div>
      </div>
    );

  }

  renderStepAction() {
    let currentStep = this.state.currentStep;
    if(currentStep === 0) {
      return (
      <div className="steps">
        <div className="next step" {...tapOrClick(this.toggleStep.bind(this, true))}>{languages.getTranslation('step-start')}</div>
      </div>
      );
    }else{
      return (
        <div className="steps">
          <div className="back step" {...tapOrClick(this.toggleStep.bind(this, false))}>{languages.getTranslation('step-back')}</div>
          <div className="next step" {...tapOrClick(this.toggleStep.bind(this, true))}>
            {currentStep === (this.stepLength - 1)? languages.getTranslation('step-done') : languages.getTranslation('step-next')}
            </div>
        </div>
      );
    }
  }

  render() {
    return(
      <div className="case-progress" style={{display: this.state.currentStep === this.stepLength ? 'none' : ''}}>
        <div className="title">{languages.getTranslation(this.state.subTitle)}</div>
        <div className="progress-bar">
          <div className="percent">{this.state.currentStep + 1}{' / '}{this.stepLength}</div>
          {this.renderBar()}
        </div>
        {this.renderStepAction()}
      </div>
    );
  }

  componentDidMount() {
    BuildCaseStore.on(Events.CASE_STEP_REPEAT, this.stepRepeat);
  }

  componentWillUnmount() {
    BuildCaseStore.off(Events.CASE_STEP_REPEAT, this.stepRepeat);
  }
}

export {ProgressBar};
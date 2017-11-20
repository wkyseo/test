import React, { Component } from 'react';
import {ProgressBar} from './ProgressBar.react';
import {CaseBody} from './CaseBody.react';
import BuildCaseStore from '../../stores/buildCaseStore';
import './BuildCase.less';


class BuildCase extends Component{
  constructor() {
    super(...arguments);
    this.currentCase = BuildCaseStore.getCurrentCase(this.props.caseId);

    //BuildCaseStore.readSystemFile();
  }

  render() {
    return(
      <div className="build-case-wrap">
        <CaseBody caseData={this.currentCase}/>
        <ProgressBar caseData={this.currentCase}/>
      </div>
    );
  }
}

export {BuildCase};
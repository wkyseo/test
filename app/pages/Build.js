import React, { Component } from 'react';
import {BuildCase} from '../components/buildCase/BuildCase.react';

class Build extends Component{
  constructor() {
    super(...arguments);
  }


  render() {
    return(
      <BuildCase caseId={this.props.params.id}/>
    );
  }
}

export {Build};
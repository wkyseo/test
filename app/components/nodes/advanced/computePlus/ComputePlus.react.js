import React, { PureComponent } from 'react';
import {Inputs, Outputs, Tools} from '../../Node.react';
import languages from '../../../../languages';
import nodeStore from '../../../../stores/nodeStore';
import UIActions from '../../../../actions/UIActions';
import AppDispatcher from '../../../../dispatcher/AppDispatcher';
import AppConstants from '../../../../constants/AppConstants';
require('./ComputePlus.less');

class ComputePlusNode extends PureComponent {
  constructor() {
    super(...arguments);
    this.state = {
      operation: this.props.info.props.configs.operation.defaultValue
    };   
  }

  renderPreview() {
    return (
      <div className={'node-preview node-preview-palette node-type-' + this.props.info.name} data-type={this.props.info.name} data-category={this.props.info.props.category}>
        <img className="node-preview-icon" src='./img/icon-compute-plus.png' />
        <span className="node-preview-name">{languages.getTranslation('computeplus')}</span>
      </div>
    );
  }

  onConfigChange(action) {
    if(action.nodeId != this.props.id) return;
    let newState = {};
    if(action.conf.hasOwnProperty('operation')) {
      newState.operation = action.conf.operation;
    }
    this.setState(newState);
  }

  getOperation(){
    let key;
    switch (this.state.operation) {
    case '+':
      key = './img/compute/icon-addition-onNode.png';
      break;
    case '-':
      key = './img/compute/icon-subtract-onNode.png';
      break;
    case '*':
      key = './img/compute/icon-multiply-onNode.png';
      break;
    case '/':
      key = './img/compute/icon-divide-onNode.png';
      break;
    case '%':
      key = './img/compute/icon-mod-onNode.png';
      break;
    }
    return (<img className="node-actual-icon" src={key} />);
  }

  renderActual() {
    return (
      <div className={'node-actual node-type-' + this.props.info.name} id={this.props.id} style={{
        left: this.props.left + 'px',
        top: this.props.top + 'px'
      }} data-type={this.props.info.name} data-category={this.props.info.props.category}>
        <div className='node-body node-draggable'>
          <div className='node-actual-body'>
            <div className="text-section">
              <div className="text">A</div>
              <div className="text">B</div>
            </div>
            {this.getOperation()}
          </div>
        </div>
        <Inputs ports={this.props.info.props.in} nodeId={this.props.id} />
        <Outputs ports={this.props.info.props.out} nodeId={this.props.id} showValue={true}/>
        <Tools nodeId={this.props.id} />
      </div>
    );
  }

  render() {
    return this.props.isPreview ? this.renderPreview() : this.renderActual();
  }

  componentDidMount() {
    let self = this;
    if(this.props.id) {
      self.setState({
        operation: nodeStore.getNodeConfigs(this.props.id).operation.defaultValue
      });
      UIActions.initConfig(this.props.id);
      self._register = AppDispatcher.register((action) => {
        if (action.actionType === AppConstants.EDITER_NODE_CONFIG) {
          self.onConfigChange(action);
        }
      });
    }
  }

  componentWillUnmount() {
    if(this.props.id) {
      AppDispatcher.unregister(this._register);
    }
  } 
  
}

export { ComputePlusNode };

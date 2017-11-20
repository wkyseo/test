import React, { PureComponent } from 'react';
import {Inputs, Outputs, Tools} from '../../../Node.react';
import languages from '../../../../../languages';
import './Steeringwheel.less';

class SteeringwheelNode extends PureComponent {
  constructor() {
    super(...arguments);
  }

  renderPreview() {
    return (
      <div className={'node-preview node-preview-palette node-type-' + this.props.info.name} data-type={this.props.info.name} data-category={this.props.info.props.category}>
        <img className="node-preview-icon" src='./img/icon-steeringwheel.png' />
        <span className="node-preview-name">{languages.getTranslation('assistance-node-steeringwheel')}</span>
      </div>
    );
  }

  renderActual() {
    return (
      <div className={'node-actual node-type-' + this.props.info.name} id={this.props.id} style={{
        left: this.props.left + 'px',
        top: this.props.top + 'px'
      }} data-type={this.props.info.name} data-category={this.props.info.props.category}>
        <div className='node-body node-draggable hide-config'>
           <div className='node-actual-body'>
            <span className="direction-setting node-label">{languages.getTranslation('direction-setting')}</span>
            <div className='port-value node-texts'>
              <span className="speed text1">{languages.getTranslation('speed')}</span>
              <span className="line"></span>
              <span className="direction text2">{languages.getTranslation('direction')}</span>
             </div>
          </div>       
        </div>
        <Inputs ports={this.props.info.props.in} nodeId={this.props.id} showValue={true}/>
        <Outputs ports={this.props.info.props.out} nodeId={this.props.id} />
        <Tools nodeId={this.props.id} />
      </div>
    );
  }

  render() {
    return this.props.isPreview ? this.renderPreview() : this.renderActual();
  }

  
}

export { SteeringwheelNode };

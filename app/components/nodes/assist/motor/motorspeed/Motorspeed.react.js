import React, { PureComponent } from 'react';
import {Inputs, Outputs, Tools} from '../../../Node.react';
import languages from '../../../../../languages';
import './Motorspeed.less';

class MotorspeedNode extends PureComponent {
  constructor() {
    super(...arguments);
  }

  renderPreview() {
    return (
      <div className={'node-preview node-preview-palette node-type-' + this.props.info.name} data-type={this.props.info.name} data-category={this.props.info.props.category}>
        <img className="node-preview-icon" src='./img/icon-motorspeed.png' />
        <span className="node-preview-name">{languages.getTranslation('motor-speed')}</span>
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
            <span className="motor-speed node-label">{languages.getTranslation('motor-speed')}</span>
            <div className='port-value node-texts'>
              <span className="port1 text1">{languages.getTranslation('port-1')}</span>
              <span className="line"></span>
              <span className="port2 text2">{languages.getTranslation('port-2')}</span>
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

export { MotorspeedNode };

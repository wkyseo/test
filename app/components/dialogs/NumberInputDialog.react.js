import React, { Component } from 'react';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import AppConstants from '../../constants/AppConstants';
import Modal from 'react-modal';
//import tapOrClick from '../../utils/tapOrClick';
import languages from '../../languages';
import './NumberInputDialog.less';

const MAX_NUMBER_LENGTH = 7;

class NumberInputDialog extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      modalIsOpen: false,
      number: '0',
      callback: null
    };
    this.touchStart = this.touchStart.bind(this);
    this.touchEnd = this.touchEnd.bind(this);
    this.isLongPress = false;
    this.longPress = 800;
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  touchStart(e) {
    if(e.touches.length === 1) {
      let key = e.target.dataset.key;
      let self = this;
      if(key) {
        let num = self.state.number;
        let numStr = num + '';
        switch (key) {
        case 'clear':
          num = '0';
          break;
        case 'backspace':
          if(numStr.length > 1){
            this.isLongPress = true;
            numStr = numStr.substr(0, numStr.length - 1);
            if(numStr != '-') {
              num = Number(numStr);
            } else {
              num = '-';
            }
            clearTimeout(this.Backtimeout);
            this.Backtimeout=setTimeout(() => {
              if(this.isLongPress) {
                self.setState({
                  number: 0
                });
              }
            }, this.longPress);
          } else {
            numStr = '0';
            num = Number(numStr);
          }
          break;
        case '.':
          if(numStr.indexOf('.') == -1 && numStr.length < MAX_NUMBER_LENGTH) {
            num = numStr + key;
          }
          break;
        case '0':
          if(numStr != '0' && numStr.length < MAX_NUMBER_LENGTH) {
            num = numStr + key;
          }
          break;
        case '-':
          num = - Number(numStr);
          if (isNaN(num)) {
            num = '0';
          } else if (num == 0) {
            num = '-';
          }

          break;
        case 'cancel':
          self.closeModal();
          break;
        case 'confirm':
          if(self.state.callback){
            let tmp = parseFloat(numStr);
            if (isNaN(tmp)) {
              self.state.callback(1);
            } else {
              self.state.callback(tmp);
            }
          }
          self.closeModal();
          break;
        default:
          if(numStr.length < MAX_NUMBER_LENGTH) {
            numStr += key;
            num = Number(numStr);
          }
          break;
        }
        self.setState({
          number: num
        });
      }
    }
  }

  touchEnd() {
    this.isLongPress = false;
  }

  render() {
    let self = this;
    return (
      <Modal
        contentLabel="number-input-dialog"
        isOpen={self.state.modalIsOpen}
        className="number-input-dialog"
        overlayClassName="dialog-overlay">
        <div className="dialog-container" ref="container" onTouchStart={this.touchStart} onTouchEnd={this.touchEnd}>
          <div className="done" data-key='confirm' >{languages.getTranslation('text-input-dialog-done')}</div>
          <div className="number-input-wrap">
            <span className="number-input-display">{self.state.number}</span>
          </div>
          <div className='key-board'>
            <ul className="number-input-keyboard">
              <li className="number-input-key" data-key="1" >1</li>
              <li className="number-input-key" data-key="2" >2</li>
              <li className="number-input-key" data-key="3" >3</li>
              <li className="number-input-key" data-key="4" >4</li>
              <li className="number-input-key" data-key="5" >5</li>
              <li className="number-input-key" data-key="6" >6</li>
              <li className="number-input-key" data-key="7" >7</li>
              <li className="number-input-key" data-key="8" >8</li>
              <li className="number-input-key" data-key="9" >9</li>
              <li className="number-input-key" data-key="." >·</li>
              <li className="number-input-key" data-key="0" >0</li>
              <li className="number-input-key" data-key="-" >-</li>
            </ul>
          </div>
          <div className='option'>
            <div className="number-input-key number-space" data-key="backspace" >
             <img src="./img/icon-number-delete.png" alt="" data-key="backspace"/>
            </div>
            <div className="number-input-key number-clear" data-key="clear" >C</div>
            <div className="number-confirm" data-key='confirm' >{languages.getTranslation('text-input-dialog-done')}</div>
          </div>
        </div>
      </Modal>
    );
  }

  componentDidMount() {
    let self = this;
    this.AppDispatcherHandle = AppDispatcher.register((action) => {
      if (action.actionType == AppConstants.NUMBER_INPUT_DIALOG_OPEN) {
        console.log('openning number input dialog');
        self.setState({
          modalIsOpen: true,
          number: action.number,
          callback: action.callback
        });
      }
    });
  }

  componentWillUnmount() {
    AppDispatcher.unregister( this.AppDispatcherHandle );
  }

}

export { NumberInputDialog };
import React, { Component } from 'react';
import UIActions from '../../actions/UIActions';
import linkStore from '../../stores/LinkStore';
import wifiStore from '../../stores/wifiStore';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import AppConstants from '../../constants/AppConstants';
import Modal from 'react-modal';
import tapOrClick from '../../utils/tapOrClick';
import languages from '../../languages';
import {guideStore} from '../../stores/guideStore/guideStore';

require('./ConnectionTypeDialog.less');

class ConnectionTypeDialog extends Component {
  constructor(){
    super(...arguments);
    
    this._callbackDispatcher = null;
    this.state = {
      modalIsOpen: false,
      rerender: false,
    };
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    let self = this;
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        className="ConnectionTypeDialog dialog "
        contentLabel="ConnectionTypeDialogModal"
        overlayClassName="dialog-overlay">
        <div className="dialog-container" ref="wifiDialog">
          <div className="dialog-header">
            {self.renderDialogHeader()}
          </div>
          <div className="dialog-body">
            {self.renderDialogBody()}
          </div>
          <div className="dialog-footer" ref="footer">
            {self.renderDialogFooter()}
          </div>
          <div className="dialog-tools" ref="tools">
            <div className="dialog-close" ref={(node)=>{this.closeNode = node;}} {...tapOrClick(this.closeModal.bind(this)) } style={{backgroundImage:'url("./img/icon-close-circle.png")'}}></div>
          </div>
        </div>
      </Modal>
    );
  }

  renderDialogHeader() {
    return (<h1>{languages.getTranslation('connect-type-choose')}</h1>);
  }

  renderDialogBody() {
    return (
      <div className="choose-connection">
        <div className="connection-button ble-button" {...tapOrClick(this.chooseBLE.bind(this)) }>
          <img src="./img/icon-ble-big.png" />
          <label>{languages.getTranslation('connect-ble')}</label>
        </div>
        <div className="connection-button wifi-button" ref={(node)=>{this.wifiBtnNode = node;}} {...tapOrClick(this.chooseWiFi.bind(this)) }>
          <img src="./img/icon-wifi-big.png" />
          <label>{languages.getTranslation('connect-wifi')}</label>
        </div>
      </div>
    );
  }

  renderDialogFooter() {

  }

  chooseWiFi(e){
    if(e.target.closest('.connection-button').classList.contains('wifi-button')) {
      this.setState({
        modalIsOpen: false
      });
      UIActions.openWifiDialog('STA');
    }else {
      return false;
    }

  }

  chooseBLE(){
    this.setState({
      modalIsOpen: false
    });
    UIActions.openLinkAutoConnectDialog();
  }

  onBLEStatusChange() {
    if('connected' == linkStore.getStatus()) {
      this.setState({
        modalIsOpen: false
      });
    }
  }

  onWiFiStatusChange() {
    if(true == wifiStore.getConnectChosenWifiStatus()) {
      this.setState({
        modalIsOpen: false
      });
    }
  }

  guideStartCallback(stepAllData) {
    if(stepAllData && stepAllData.stepData && stepAllData.stepData.param) {
      let index = parseInt(stepAllData.stepData.param.index);
      if(index === 3) {
        //关闭X按钮
        this.closeNode.style.display = 'none';

        //wifi加遮罩,wifi-button-mask
        this.wifiBtnNode.classList.add('wifi-button-mask');
        this.wifiBtnNode.classList.remove('wifi-button');
      }
    }

  }

  guideEndCallback(stepAllData) {
    if(stepAllData && stepAllData.stepData && stepAllData.stepData.param) {
      let index = parseInt(stepAllData.stepData.param.index);
      if (index === 3) {
        if(this.closeNode) {this.closeNode.style.display = 'block';}

        if(this.wifiBtnNode) {
          this.wifiBtnNode.classList.remove('wifi-button-mask');
          this.wifiBtnNode.classList.add('wifi-button');
        }
      }
    }
  }

  componentDidMount() {
    this._onBLEStatusChange = this.onBLEStatusChange.bind(this);
    this._onWiFiStatusChange = this.onWiFiStatusChange.bind(this);

    this._callbackDispatcher = AppDispatcher.register((action) => {
      if (action.actionType == AppConstants.CONNECTION_TYPE_DIALOG_OPEN) {
        this.setState({
          modalIsOpen: true
        });
      }
    });

    linkStore.on('statusChange', this._onBLEStatusChange);
    wifiStore.on('wifiConnected', this._onWiFiStatusChange);

    this.guideStartCallback = this.guideStartCallback.bind(this);
    this.guideEndCallback = this.guideEndCallback.bind(this);
    guideStore.on('guideStartCallback', this.guideStartCallback);
    guideStore.on('guideEndCallback', this.guideEndCallback);
  }

  componentWillUnmount() {
    AppDispatcher.unregister(this._callbackDispatcher);
    linkStore.off('statusChange', this._onBLEStatusChange);
    wifiStore.off('wifiConnected', this._onWiFiStatusChange);

    guideStore.off('guideStartCallback', this.guideStartCallback);
    guideStore.off('guideEndCallback', this.guideEndCallback);
  }
}

export {ConnectionTypeDialog};
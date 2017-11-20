import React, { Component } from 'react';
import AppDispatcher from '../../dispatcher/AppDispatcher';
import AppConstants from '../../constants/AppConstants';
import linkStore from '../../stores/LinkStore';
import UIActions from '../../actions/UIActions';
import Modal from 'react-modal';
import languages from '../../languages';
import tapOrClick from '../../utils/tapOrClick';
import {setElementStyleShrink} from  '../../utils/dom';
import './LinkDialog.less';
import {guideStore} from '../../stores/guideStore/guideStore';

const MAX_LIST_ITEMS = 20;

class LinkDialog extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      modalIsOpen: false,
      scanList: [],
      linkStatus: linkStore.getStatus(),
      linkAutoConnect: ''
    };

    this.renderCloseBtn = this.renderCloseBtn.bind(this);
  }

  closeModal() {
    this.setState({modalIsOpen: false});
    UIActions.closeLinkDialog();
  }

  selectDevice(event) {
    UIActions.selectLinkDialogDevice(event.currentTarget.dataset.deviceid);
  }

  disconnect() {
    UIActions.disconnectLinkDevice();
  }

  refreshBluetooth() {
    UIActions.refreshBluetooth();
  }

  openScanList() {
    this.setState({linkStatus: 'disconnected',linkAutoConnect: 'auto-connect-closed'});
    UIActions.openLinkDialog();
  }

  renderScanList() {
    let self = this;
    self.state.scanList.sort((a, b) => {
      return a.distance - b.distance;
    });
    let deviceCnt = 0;
    let list = self.state.scanList.map((device) => {
      if((++deviceCnt) > MAX_LIST_ITEMS){
        return;
      }
      return (
        <tr key={deviceCnt} data-deviceid={device.id} {...tapOrClick(self.selectDevice.bind(self))}>
          <td>{device.name}</td><td>{device.distance.toFixed(1)}m</td>
        </tr>
      );
    });

    return (
      <div className='dialog-link-scan-list' >
        <table cellSpacing={0} className='connect-tab' >
          <thead>
            <tr>
              <th className='device'>{languages.getTranslation('dialog-bluetooth-devices')}</th>
              <th className='distance'>{languages.getTranslation('dialog-bluetooth-distance')}</th>
            </tr>
          </thead>
        <tbody>
          {list}
        </tbody>
        </table>
      </div>
    );
  }

  renderAutoConnect() {
    return (
      <div className='bluetooth-connect'>
        <span className={'auto-connect-less-one-meter circle-animation1'} ref='circle1'></span>
        <span className={'auto-connect-less-one-meter circle-animation2'} ref='circle2'></span>
        <span className={'auto-connect-less-one-meter circle-animation3'} ref='circle3'></span>
        <div className='dialog-link-autoconnect'>
          <img className='icon-ble' src='img/icon-connection-ble.png' />
        </div>
      </div>
    );
  }

  renderDialogFooter() {
    let self = this;
    return (<div className='dialog-footer'>
      <span className='dialog-connect-txt'>{languages.getTranslation('dialog-bluetooth-connect-list')}</span>
          <span className='dialog-connect-button' {...tapOrClick(self.openScanList.bind(self))}>{languages.getTranslation('dialog-bluetooth-list')}</span>
    </div>);
  }
  closeBleTips() {
    this.setState({
      modalIsOpen: false,
      linkAutoConnect: ''
    });
  }

  InitDialog() {
    let self = this;
    return (<div className='ble-init'><span className='dialog-title'>{languages.getTranslation('dialog-bluetooth-connect-tips')}</span>
      {self.renderCloseBtn()}
      <div className='dialog-body'>
        {self.renderAutoConnect()}
      </div>
      {self.renderDialogFooter()}
    </div>);
  }

  BleListDiv() {
    return (<div className='ble-list-div'>
      <div className='ble-list-header'>
        <img className='ble-list-img' src='img/icon-ble-img.png' />
        <span className='ble-list-title'>{languages.getTranslation('dialog-bluetooth-link-list')}</span>
        {this.renderCloseBtn()}
      </div>
      {this.renderScanList()}
      <div className='ble-list-footer'>
        <span className='ble-list-refresh' {...tapOrClick(this.refreshBluetooth.bind(this))}>{languages.getTranslation('dialog-bluetooth-refresh')}</span>
      </div>
    </div>);
  }

  ConnectFinished() {
    return (<div className='ble-connect-finished'>
      <div className='ble-connect-finished-header'>
        <span className='ble-connect-header-txt'>{languages.getTranslation('dialog-bluetooth-connected')}</span>
        <img src='img/ble-connected.png' alt='' className='ble-connect-header-icon'/>
        {this.renderCloseBtn()}
      </div>
      <div className='ble-connect-finished-body'>
        <img className='icon-ble' src='img/icon-connection-ble.png'/>
      </div>
      <div className='ble-connect-finished-footer'>
        <span className='ble-connect-finished-cancel' {...tapOrClick(this.disconnect.bind(this))}>{languages.getTranslation('dialog-bluetooth-link-disconnected')}</span>
        <span className='ble-connect-finished-confirm' {...tapOrClick(this.closeModal.bind(this))}>{languages.getTranslation('icon-confirm-ok')}</span>
      </div>
    </div>);
  }

  openBleTips() {
    return (<div className='ble-connect-tips'>
      <span className='ble-connect-tips-header'>{languages.getTranslation('shelf-container-hint-closed')}</span>
      {this.renderCloseBtn()}
      <div className='ble-connect-tips-body'>
        <img src='img/ble-BleClosedTips.png' className='ble-connect-tips-img'/>
      </div>
      <div className='ble-connect-tips-footer'>
        <span className='ble-connect-tips-confirm' {...tapOrClick(this.closeBleTips.bind(this))}>{languages.getTranslation('icon-confirm-ok')}</span>
      </div>
    </div>);
  }

  renderCloseBtn() {
    return(
      <img className='ble-dialog-close' style={{display: this.state.noShowClose === true ? 'none' : 'block'}} ref={(node)=>{this.closeNode=node;}} src='img/icon-close-white.png' {...tapOrClick(this.closeModal.bind(this))}/>
    );
  }

  //render bluetooth link dialog according to initial status
  renderLinkDialog() {
    let self = this;
    if(self.state.linkStatus == 'closed') {
      return this.openBleTips();
    } else if(self.state.linkAutoConnect == 'auto-connect-closed' && self.state.linkStatus == 'disconnected') {
      return this.BleListDiv();
    } else if (self.state.linkStatus == 'connected' && self.state.linkAutoConnect == 'auto-connect-closed') {
      return this.ConnectFinished();
    } else if(self.state.linkAutoConnect == '' || self.state.linkAutoConnect == 'auto-connect-opened' ) {
      return this.InitDialog();
    }
  }

  render() {
    return (
      <Modal
        contentLabel='LinkDialogModal'
        isOpen={this.state.modalIsOpen}
        className='link-dialog dialog'
        shouldCloseOnOverlayClick={true}
        overlayClassName='dialog-overlay'>
        <div className='dialog-container' ref="linkDialog">
          {this.renderLinkDialog()}
        </div>
      </Modal>
    );
  }

  listChange() {
    let self = this;
    self.setState({
      scanList: linkStore.getDeviceList()
    });
  }
  statusChange() {
    let self = this;
    let status = linkStore.getStatus();
    if(status == 'connected' || status == 'closed') {
      self.setState({
        linkStatus: status,
        linkAutoConnect: 'auto-connect-closed'
      });
    } else if(status == 'disconnected') {
      self.setState({
        linkStatus: '',
        linkAutoConnect: 'auto-connect-opened'
      });
    } else if(status == 'failed') {

      //新手引导过程中不显示关闭按钮
      let boolean = guideStore.getShowGuide() === true ? true : false;
      self.setState({
        modalIsOpen: true,
        linkAutoConnect: 'auto-connect-opened',
        scanList: [],
        noShowClose: boolean
      });
      setTimeout(() =>{
        setElementStyleShrink(self.refs.linkDialog);
      }, 0);
      linkStore.startAutoConnect();
    }
  }

  guideStartCallback(stepAllData) {
    if(stepAllData && stepAllData.stepData && stepAllData.stepData.param) {
      let index = parseInt(stepAllData.stepData.param.index);
      if(index === 4) {
        setTimeout(()=>{
          //this.closeNode.style.display = 'none';
          this.setState({
            noShowClose: true,
          });
        },0);
      }
    }
  }

  guideEndCallback(stepAllData) {
    if(stepAllData && stepAllData.stepData && stepAllData.stepData.param) {
      let index = parseInt(stepAllData.stepData.param.index);
      if (index === 4 && this.closeNode) {
        //this.closeNode.style.display = 'block';
        this.setState({
          noShowClose: false
        });
      }
    }
  }

  componentDidMount() {
    let self = this;
    this.callbackDispatcher = AppDispatcher.register((action) => {
      if (action.actionType == AppConstants.LINK_AUTO_CONNECT_DIALOG_OPEN) {
        self.setState({
          modalIsOpen: true,
          linkAutoConnect: 'auto-connect-opened',
          scanList: []
        });
        //shrink Dialog when screenHeight < 600
        setTimeout(() =>{
          setElementStyleShrink(self.refs.linkDialog);
        }, 0);
      } else if (action.actionType == AppConstants.LINK_DIALOG_OPEN) {
        self.setState({
          modalIsOpen: true,
          scanList: []
        });
      } else if(action.actionType == AppConstants.LINK_DIALOG_CLOSE) {
        self.setState({
          modalIsOpen: false
        });
      }
    });

    this.listChangeFunc = this.listChange.bind(this);
    this.statusChangeFunc = this.statusChange.bind(this);

    linkStore.on('listChange', this.listChangeFunc);
    linkStore.on('statusChange', this.statusChangeFunc);

    this.guideStartCallback = this.guideStartCallback.bind(this);
    this.guideEndCallback = this.guideEndCallback.bind(this);
    guideStore.on('guideStartCallback', this.guideStartCallback);
    guideStore.on('guideEndCallback', this.guideEndCallback);
  }

  componentWillUnmount() {
    linkStore.off('listChange', this.listChangeFunc);
    linkStore.off('statusChange', this.statusChangeFunc);
    AppDispatcher.unregister(this.callbackDispatcher);

    guideStore.off('guideStartCallback', this.guideStartCallback);
    guideStore.off('guideEndCallback', this.guideEndCallback);
  }
}

export { LinkDialog};

import React, { PureComponent } from 'react';
import './BuildManagement.less';
import BuildCaseStore from '../../stores/buildCaseStore';
import tapOrClick from '../../utils/tapOrClick';
import Events from '../../constants/Events';
import CircularProgressbar from 'react-circular-progressbar';

class DownloadCover extends PureComponent{
  constructor() {
    super(...arguments);

    this.downloadState = BuildCaseStore.getDownStateList();

    this.state = {
      id: 'casevideos@@' + this.props.id,
      downloadState: this.props.downloadState || this.downloadState.START_DOWN,
      percent: 0
    };

    this.downCaseVideos = this.downCaseVideos.bind(this);
    this.toggleDownIcon = this.toggleDownIcon.bind(this);
    this.completeCaseDown = this.completeCaseDown.bind(this);
  }

  downCaseVideos(e) {
    let caseKey = e.target.closest('.need-download').dataset.downkey;
    BuildCaseStore.downCaseVideos(caseKey);
  }

  toggleDownIcon(downloadState, caseKey, percent) {
    if(caseKey === this.state.id) {
      this.setState({
        downloadState,
        percent
      });
    }
  }

  completeCaseDown(caseKey) {
    if(caseKey === this.state.id) {
      this.setState({
        id: ''
      });
    }
  }

  renderDownIcon() {
    let downloadState = this.state.downloadState;
    console.log('[downloadState] ', downloadState);
    switch (downloadState) {
    case this.downloadState.START_DOWN:
      return(
        <img className={'start-down'} src={'./img/icon-case-download.png'} alt="" {...tapOrClick(this.downCaseVideos)}/>
      );
    case this.downloadState.WAIT_DOWN:
      return(
        <img className={'wait-down'} src={'./img/icon-case-waitDown.png'} alt="" />
      );
    case this.downloadState.DOWNLOADING:
      return(
        <CircularProgressbar percentage={this.state.percent} />
      );
    default:
      break;
    }
  }

  renderDown() {
    let storageKey = this.state.id;
    if(storageKey && localStorage.getItem(storageKey)) {
      let caseObj = JSON.parse(localStorage.getItem(storageKey));
      if(caseObj.isDownload === false) {
        return(
          <div className="need-download" ref={(node)=>{this.downloadCoverEle = node;}} data-downkey={storageKey}>
            <div className="image-cover" ref={(node)=>{this.imageCoverEle=node;}}>
              {this.renderDownIcon()}
            </div>
          </div>
        );
      }
    }else{
      return (<div></div>);
    }
  }

  render() {
    return(
     <div>
       {this.renderDown()}
     </div>
    );

  }

  componentDidMount() {
    BuildCaseStore.on(Events.TOGGLE_DOWN_ICON, this.toggleDownIcon);
    BuildCaseStore.on(Events.CASE_DOWN_COMPLETE, this.completeCaseDown);
  }

  componentWillUnmount() {
    BuildCaseStore.off(Events.TOGGLE_DOWN_ICON, this.toggleDownIcon);
    BuildCaseStore.off(Events.CASE_DOWN_COMPLETE, this.completeCaseDown);
  }
}

export {DownloadCover};
import React, { Component } from 'react';
import { Link } from 'react-router';
import languages from '../../languages';
import './BuildManagement.less';
import BuildCaseData from '../../constants/BuildCaseData';
import BuildCaseStore from '../../stores/buildCaseStore';
import {DownloadCover} from './DownloadCover.react';

const data = BuildCaseData;

class BuildManagement extends Component{
  constructor() {
    super(...arguments);

    //set caseVideos init
    BuildCaseStore.setCaseVideosMap();
  }

  renderStar(count) {
    if(typeof count === 'number') {
      let list = [];
      for(let i=0; i<count; i++) {
        list.push(
          <img src="./img/icon-case-star.png" alt="star" key={i}/>
        );
      }
      return list;
    }

  }

  renderList() {
    let list = [];
    if(data && data.length>0) {
      for(let i=0; i<data.length; i++) {
        list.push(
          <li className="case-overview" key={data[i].id}>
            <Link to={'/build/' + data[i].id} >
              <img className="case-img" src={data[i].coverImg} alt=""/>
              <span className="case-name">{languages.getTranslation(data[i].name)}</span>
              <div className="star-list">
                {this.renderStar(Number(data[i].difficultyIndex))}
              </div>
            </Link>
            {this.setDownloadCover(data[i].id)}
          </li>
        );
      }
    }
    return list;
  }

  setDownloadCover(id) {
    let downloadQueue = BuildCaseStore.getDownloadQueue();
    let len = downloadQueue.length;
    let tmpId = 'casevideos@@' + id;
    //console.log('tmpID', tmpId);
    let returnComp = '';
    if(len > 0) {
      for(let i=0; i<len; i++) {
        if(tmpId === downloadQueue[i].id) {
          if( i === 0) {
            returnComp = (<DownloadCover id={id} downloadState= {'downloading'}/>);
          }else {
            returnComp = (<DownloadCover id={id} downloadState= {'waitDownload'}/>);
          }
          break;
        }else {
          returnComp =  (<DownloadCover id={id} downloadState= {'startDownload'}/>);
        }
      }
    }else {
      returnComp = <DownloadCover id={id} downloadState= {'startDownload'}/>;
    }
    return returnComp;
  }

  render() {
    return(
      <div className="build-wrap">
        <div className="build-head">
          <div className="back">
            <Link to={'/'}><img src="./img/icon-white-back.png" alt="Back"/></Link>
          </div>
          <span className="title">{languages.getTranslation('index-build')}</span>
        </div>
        <div className="build-body">
          <ul>{this.renderList()}</ul>
        </div>
      </div>
    );
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }
}

export {BuildManagement};
import React, { Component } from 'react';
import { Link } from 'react-router';
import BuildCaseStore from '../../stores/buildCaseStore';
import Events from '../../constants/Events';
import tapOrClick from '../../utils/tapOrClick';
import languages from '../../languages';
import UIActions from '../../actions/UIActions';
import {Video} from './Video.react';
//import {setWindowHeight} from '../../utils/dom';

class CaseBody extends Component{
  constructor() {
    super(...arguments);
    this.caseData = this.props.caseData;
    if(this.caseData && this.caseData.stepLists.length > 0) {
      console.log(this.caseData);
      this.stepLength = Number(this.caseData.stepLists.length);
      this.caseId = this.caseData.id;
    }

    this.initialState = {
      currentStep: 0,
      id: this.caseId
    };
    this.state = this.initialState;

    this.renderPartList = this.renderPartList.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.getDoneResource = this.getDoneResource.bind(this);
    this.caseRepeat = this.caseRepeat.bind(this);
    this.toggleStep = this.toggleStep.bind(this);
  }

  renderPartList(partList) {
    let list = [];
    if(partList instanceof Array && partList.length > 0) {
      partList.forEach(function (value,index) {
        let number = Number(index + 1);
        list.push(<div className="single-part" key={number}>{number + '. ' + languages.getTranslation(value)}</div>);
      });
    }
    return list;
  }

  renderContent() {
    let currentStep = Number(this.state.currentStep);
    if(currentStep < this.stepLength) {
      let stepData = this.caseData.stepLists[this.state.currentStep];
      let type = stepData.type;
      switch (type) {
      case 'preVideo':
        return(
          <div className="step step-preVideo" key={currentStep}>
            <div className="case-introduction text-section">
              <div className="title">{languages.getTranslation(stepData.title)}</div>
              <div className="text" dangerouslySetInnerHTML={{__html: languages.getTranslation(stepData.data.text)}}></div>
              <img className="radar" alt={'五形图'}src={stepData.data.radarSrc} />
            </div>
            <Video src={stepData.data.src} poster={stepData.data.poster}></Video>
          </div>
        );
      case 'radarMap':
        return(
          <div className="step step-radarMap" key={currentStep}>
            <div className="title">{languages.getTranslation(stepData.title)}</div>
            <div className="radar">
              <img src={stepData.data.src} alt=""/>
              <div className="text" dangerouslySetInnerHTML={{__html: languages.getTranslation(stepData.data.text)}}></div>
            </div>
          </div>
        );
      case 'subTitle':
        return(
          <div className={'step step-subTitle ' + stepData.category} key={currentStep}>
            <img src={stepData.data.src} alt=""/>
            <div className="text-section">
              <div className="sequence">{stepData.sequenceNumber}</div>
              <div className="title">{languages.getTranslation(stepData.title)}</div>
            </div>
          </div>
        );
      case 'partList':
        return(
          <div className="step step-partList" key={currentStep}>
            <img src={stepData.data.src} alt=""/>
            <div className="text-section">
              <div className="title">{languages.getTranslation(stepData.title)}</div>
              <div className="part-lists">{this.renderPartList(stepData.data.partList)}</div>
            </div>
          </div>
        );
      case 'animation':
        return(
          <div className="step step-animation" key={currentStep}>
            <div className="text-section">
              <div className="title">{stepData.title}</div>
              <div className="text" dangerouslySetInnerHTML={{__html: languages.getTranslation(stepData.data.text)}}></div>
            </div>
            <div className="animation-wrap">

            </div>
          </div>
        );
      case 'video':
        return(
          <div className="step step-video " key={currentStep}>
            <div className={'text-section' + (this.state.id === '4' && this.state.currentStep === 2 ? ' overflow-height' : '')} ref={node=>{this.videoText = node;}}>
              <div className="title">{languages.getTranslation(stepData.title)}</div>
              <div className="text" dangerouslySetInnerHTML={{__html: languages.getTranslation(stepData.data.text)}}></div>
            </div>
            <Video src={stepData.data.src} poster={stepData.data.poster}></Video>
          </div>
        );
      case 'image':
        return(
          <div className="step step-image" key={currentStep}>
            <div className="text-section">
              <div className="title">{languages.getTranslation(stepData.title)}</div>
              <div className="text" dangerouslySetInnerHTML={{__html: languages.getTranslation(stepData.data.text)}}></div>
            </div>
            <img className="image-guide" src={stepData.data.src} alt=""/>
          </div>
        );
      case 'subsection-video':
        return(
          <div className="step step-subsection-video" key={currentStep}>
            <div className="text-section">
              <div className="title">{languages.getTranslation(stepData.title)}</div>
              <div className="text">{languages.getTranslation(stepData.data.text)}</div>
            </div>
            <Video src={stepData.data.src} poster={stepData.data.poster}></Video>
          </div>
        );
      default:
        console.log('Don`t support current caseType');
        break;
      }
    }else {
      return(
        <div className="step step-done">
          {/*<Video src={'./video/touch-head/pre-video.mp4'} poster={'./img/buildCase/touch-head/icon-build-done.jpg'}></Video>*/}
          <img className={'done-image'} src={this.getDoneResource()} alt=""/>
          <div className="steps">
            <div className="back step" {...tapOrClick(this.caseRepeat)}>{languages.getTranslation('step-repeat')}</div>
            <Link className="next step" to={'/build'}>
              <div >{languages.getTranslation('step-finish')}</div>
            </Link>
          </div>
        </div>
      );
    }
  }

  getDoneResource() {
    let src = '';
    let id = this.state.id;
    switch (id) {
    case '1':
      src = './img/buildCase/touch-head/finish.png';
      break;
    case '2':
      src = './img/buildCase/happy-rabbit/case-pre-cover.png';
      break;
    case '3':
      src = './img/buildCase/night-light/finish.jpg';
      break;
    case '4':
      src = './img/buildCase/music-grass/case-pre-cover.png';
      break;
    case '5':
      src = './img/buildCase/robot-loud/case-pre-cover.png';
      break;
    case '6':
      src = './img/buildCase/telegraph/case-pre-cover.png';
      break;
    case '7':
      src = './img/buildCase/guitar/case-pre-cover.png';
      break;
    case '8':
      src = './img/buildCase/disc/case-pre-cover.png';
      break;
    case '9':
      src = './img/buildCase/dinosaur/case-pre-cover.png';
      break;
    case '10':
      src = './img/buildCase/palette/case-pre-cover.png';
      break;
    case '11':
      src = './img/buildCase/bomb/case-pre-cover.png';
      break;
    }

    return src;
  }

  caseRepeat() {
    this.setState(this.initialState);
    UIActions.buildCaseStepRepeat(this.initialState.currentStep);
  }

  toggleStep(currentStep) {
    let step = Number(currentStep);
    let length = this.props.caseData.stepLists.length;
    if(step >= 0 && step <= length) {
      this.setState({
        currentStep: step
      });
    }
    else {
      console.log('Don`t support current Step, index is wrong');
    }

  }

  render() {
    return(
      <div className={'case-body ' + (this.state.currentStep === this.stepLength ? 'case-done' : '')}>
        <div className="back" style={{display: this.state.currentStep === this.stepLength ? 'none' : ''}}>
          <Link to={'/build'}><img src="./img/icon-purple-back.png" alt="Back"/></Link>
        </div>
        <div className={'case-content'}>
          {this.renderContent()}
        </div>
      </div>
    );
  }

  componentDidMount() {
    BuildCaseStore.on(Events.SYNC_CASE_STEP, this.toggleStep);
  }

  componentDidUpdate() {
    //setScroll when content is overflow
   /* if(this.state.id === '4' && this.state.currentStep === 2) {
      setTimeout(()=>{
        this.videoText.classList.add('overflow-height');
      },0);
    }*/
  }

  componentWillUnmount() {
    BuildCaseStore.off(Events.SYNC_CASE_STEP, this.toggleStep);
  }
}

export {CaseBody};

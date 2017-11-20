import React, { Component } from 'react';
import tapOrClick from '../../utils/tapOrClick';
//import BuildCaseStore from '../../stores/buildCaseStore';


class Video extends Component {
  constructor() {
    super(...arguments);
    this.canPlay = this.canPlay.bind(this);
    this.playVideo = this.playVideo.bind(this);
    this.videoEnded = this.videoEnded.bind(this);
    this.videoIsPlay = false;
  }

  canPlay() {
    this.videoIsPlay = true;
  }

  playVideo() {
    console.log('start play video');
    this.img.style.display = 'none';
    this.mask.style.display = 'none';
    /*console.log('videoIsCanPlay', this.videoIsPlay);
    if(!this.videoIsPlay) {
      this.videoElement.load();
    }*/
    let promise = this.videoElement.play();
    console.log('videoReadyState',this.videoElement.readyState);
    if(promise !== undefined) {
      promise.then(()=>{
        console.log('video can play');
      }).catch((err)=>{
        console.log('video cann\'t play', err);
      });
    }

  }

  videoEnded() {
    this.img.style.display = 'block';
    this.mask.style.display = 'block';
  }

  videoError(err) {
    console.log('videoErr', err);
  }

  render() {
    //let blob = new Blob([BuildCaseStore.getVideoBlob()], {type: 'video/mpeg4'});
    return(
      <div className="video-wrap">
        <div className="mask" ref={(node) =>{this.mask = node;}}></div>
        <img className="play" src="./img/icon-video-play.png" alt="" ref={(node) =>{this.img=node;}} {...tapOrClick(this.playVideo)}/>
        <video preload="auto"  poster={this.props.poster} ref={(node) =>{this.videoElement = node;}} onEnded={this.videoEnded} onCanPlay={this.canPlay} onError={this.videoError.bind(this)} src={this.props.src}>
          {/*<source src={window.URL.createObjectURL(blob)}></source>*/}
          {/*<source src={this.props.src}></source>*/}
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  componentDidMount() {
    this.videoElement.setAttribute('webkit-playsinline', 'webkit-playsinline');// Fix fullscreen problem on IOS 8 and 9
    this.videoElement.setAttribute('playsinline', 'playsinline'); // Fix fullscreen problem on IOS 10
  }
  componentWillUnmount() {
    this.videoElement.pause();
    this.videoElement.src = '';
    this.videoElement.load();
    console.log('[src]',this.videoElement.getAttribute('src'));
  }
}

export {Video};
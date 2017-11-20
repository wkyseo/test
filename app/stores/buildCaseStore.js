import EventEmitter from 'wolfy87-eventemitter';
import BuildCaseData from '../constants/BuildCaseData';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import Events from '../constants/Events';
import languages from '../languages';



const Connection = {
  UNKNOWN: 'unknown',
  ETHERNET: 'ethernet',
  WIFI: 'wifi',
  CELL_2G: '2g',
  CELL_3G: '3g',
  CELL_4G: '4g',
  CELL: 'cellular',
  NONE: 'none'
};

class BuildCaseStore extends EventEmitter {
  constructor() {
    super(...arguments);
    this.downloadQueue = [];
    this.timeout = 500000;
    this.downloadState = {
      START_DOWN: 'startDownload',
      DOWNLOADING: 'downloading',
      WAIT_DOWN: 'waitDownload'
    };
    this._currentCaseKey = '';
    this._currentVideoName = '';
    this._currentCaseName = '';
    this._storeVideoName = '';
    AppDispatcher.register((action) => {
      switch (action.actionType) {
      case AppConstants.TOGGLE_CASE_STEP:
        this.trigger(Events.SYNC_CASE_STEP, [action.currentStep]);
        break;
      case AppConstants.CASE_STEP_REPEAT:
        this.trigger(Events.CASE_STEP_REPEAT, [action.initialStep]);
        break;
      case AppConstants.GET_CASE_VIDEOS:
        this.trigger(Events.DOWN_CASE_VIDEOS, [action.currentStep]);
        break;
      default:
        break;
      }
    });
  }

  getDownStateList() {
    return this.downloadState;
  }

  getCurrentCase(id) {
    for(let value of BuildCaseData) {
      if(value.id === id) {
        return value;
      }
    }
  }

  setCaseVideosMap() {
    //localStorage set key: casevideos@@1
    for (let caseData of BuildCaseData) {
      let id = caseData.id;
      if(Number(id) > 1) {
        let caseId = 'casevideos@@' + id;
        if(!localStorage.getItem(caseId)) {
          let caseObj = {
            isDownload: false,
            category: caseData.directoryName,
            id: caseId
          };
          let arr = [];
          for(let stepData of caseData.stepLists) {
            if(stepData.type === 'preVideo' || stepData.type === 'video') {
              let _srcArr = stepData.data.src.split('_');
              let _obj = {
                name: _srcArr[_srcArr.length - 1],
                isDownload: false
              };
              arr.push(_obj);
            }
          }
          caseObj.videoList = arr;
          let str = JSON.stringify(caseObj);
          console.log(`caseID${caseId}, ${str}`);
          localStorage.setItem(caseId, str);
        }
      }
    }
  }

  getDownloadQueue() {
    return this.downloadQueue;
  }

  downCaseVideos(caseKey) {
    let self = this;
    if(window._runtime === 'cordova') {
      let networkStatus = this.getConnectionStatus();
      if(networkStatus === 'wifi') {
        self.startDownCases(caseKey);
      }else if(networkStatus === '2g' || networkStatus === '3g' || networkStatus === '4g' || networkStatus === 'cellular') {
        console.log('moblie connection');
        let obj = {
          type: 'confirm',
          title: languages.getTranslation('mobile-title'),
          text: languages.getTranslation('mobile-text'),
          callback: function () {
            self.startDownCases(caseKey);
          }
        };
        self.trigger(Events.OPEN_NORMAL_DIALOG, [networkStatus, 'normalTipsDialog', obj]);
      }else {
        console.log('unNet connection');
        let obj = {
          type: 'alert',
          title: languages.getTranslation('unnet-title'),
          text: languages.getTranslation('unnet-text')
        };
        self.trigger(Events.OPEN_NORMAL_DIALOG, [networkStatus, 'normalTipsDialog', obj]);
      }
    }

  }

  async startDownCases(caseKey) {
    let caseObj = JSON.parse(localStorage.getItem(caseKey));
    console.log(`key:${caseKey}`);
    console.log('caseObj', caseObj);
    this.downloadQueue.push(caseObj);
    console.log('downloadQueue', this.downloadQueue);
    if(this.downloadQueue.length === 1) {
      this.trigger(Events.TOGGLE_DOWN_ICON, [this.downloadState.DOWNLOADING, caseKey, 0]);
      try{
        console.log('[startTraverseCasesKey]', this.downloadQueue[0].id);
        console.log('[startTraverseCasesName]', this.downloadQueue[0].category);
        await this.startDownPerCase(this.downloadQueue[0]);
      } catch(e) {
        console.log(`[traverseCasesError], ${e}`);
      }
    }else {
      this.trigger(Events.TOGGLE_DOWN_ICON, [this.downloadState.WAIT_DOWN, caseKey, 0]);
    }
  }

  async startDownPerCase(caseObj) {
    let self = this;
    this._currentCaseName = caseObj.category;
    this._currentCaseKey = caseObj.id;
    let tmpCaseObj = JSON.parse(JSON.stringify(caseObj));
    //tmpCaseObj.videoList = [];
    let isDownloadError = false;
    if(caseObj.isDownload === false) {
      tmpCaseObj.isDownload = true;
      let videoList = caseObj.videoList;
      let len = videoList.length;
      if(len > 0) {
        try{
          for(let i=0; i<len; i++) {
            console.log('startDownPerCase_videoName', videoList[i].name);
            let url = this.formatUrl(caseObj.category, videoList[i].name);
            await self.doBlobGet(videoList[i], url, i, len).then(function () {
              //show UI_progress and modify data
              tmpCaseObj.videoList[i].isDownload = true;
              let percent = parseInt((i+1)/len*100);
              console.log('[caseDownPercent] ', percent);
              self.trigger(Events.TOGGLE_DOWN_ICON, [self.downloadState.DOWNLOADING, self._currentCaseKey, percent]);
            }).catch(function (err) {
              console.log('downCaseError', err);
              tmpCaseObj.videoList[i].isDownload = false;
              tmpCaseObj.isDownload = false;
              isDownloadError = true;
            });
          }
        } catch(e) {
          console.log(`[downPerCaseError], ${e}`);
        }
      }

      //reset CaseData
      localStorage.setItem(this._currentCaseKey, JSON.stringify(tmpCaseObj));

      if(isDownloadError) {
        self.trigger(Events.TOGGLE_DOWN_ICON, [self.downloadState.START_DOWN, self._currentCaseKey, 0]);
      }else {
        self.trigger(Events.CASE_DOWN_COMPLETE, [self._currentCaseKey]);
      }

      this.downloadQueue.shift();
      console.log('afterDownloadQueue', this.downloadQueue);
      if(this.downloadQueue.length > 0) {
        self.trigger(Events.TOGGLE_DOWN_ICON, [self.downloadState.DOWNLOADING, self.downloadQueue[0].id, 0]);
        self.startDownPerCase(this.downloadQueue[0]);
      }
    }
  }

  doBlobGet(videoData, url, i, len) {
    let self = this;
    let promise;
    this._currentVideoName = videoData.name;
    if(videoData.isDownload === false) {
      promise = new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.timeout = self.timeout;
        xhr.open('GET', url, true);
        xhr.responseType = 'blob';
        /*xhr.ontimeout = function(){
          console.log(`doGetTimeoutStatus: ${xhr.status}`);
          reject(new Error(xhr.status));
        };*/
        xhr.onreadystatechange = function() {
          if(xhr.readyState === 4) {
            //console.log('[xhr]', xhr);
            if(xhr.status === 200 || xhr.status === 304) {
              let contentType = xhr.getResponseHeader('Content-Type');
              console.log('content-type', contentType);
              //set for captive portal especially
              if(contentType === 'video/mp4') {
                self.doGetSuccess(xhr.response);
                resolve();
              }else {
                console.log(`doGetFailedStatus: ${xhr.status}`);
                reject(new Error(xhr.status));
              }
            } else {
              console.log(`doGetFailedStatus: ${xhr.status}`);
              reject(new Error(xhr.status));
            }
          }
        };
        xhr.onabort = function () {
          console.log(`abortStatus: ${xhr.status}`);
          reject(new Error(xhr.status));
        };
        xhr.onprogress = function (event) {
          if (event.lengthComputable) {
            let completedPercent = event.loaded / event.total;
            let percent = parseInt((i/len + 1/len * completedPercent)*100);
            self.trigger(Events.TOGGLE_DOWN_ICON, [self.downloadState.DOWNLOADING, self._currentCaseKey, percent]);
          }
        };
        try{
          xhr.send();
        }catch(e){
          console.log('[xhrSendNetError]', e);
          reject(new Error(e));
        }
      });
    }else {
      promise = new Promise(function (resolve) {
        console.log('currentVideo has download: ', videoData.name);
        resolve();
      });
    }

    return promise;
  }

  doGetSuccess(response) {
    let blob = new Blob([response], {type: 'video/mpeg4'});
    this._storeVideoName = this._currentCaseName + '_' + this._currentVideoName;
    console.log('blob', blob);
    console.log('this._storeVideoName:', this._storeVideoName);
    this.writeSystemFile(blob, false);
  }

  writeSystemFile(videoBlob, isAppend) {
    let self = this;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
      //console.log('openFsObj', fs);
      //console.log('open file name: ', fs.name);
      fs.root.getFile(self._storeVideoName, { create: true, exclusive: false },function (fileEntry) {
        // var dataObj = new Blob([videoData], { type: 'text/plain' });
        self.writeFile(fileEntry, videoBlob, isAppend);
      }, function(e) {
        console.log('onErrorCreateFile, error:', e);
      });
    }, function(e) {
      console.log('onErrorLoadFs, error:', e);
    });
  }

  writeFile(fileEntry, dataObj, isAppend) {
    // let self = this;
    fileEntry.createWriter(function (fileWriter) {
      fileWriter.onwriteend = function() {
        console.log('Successful file write...');
        dataObj = null;
        //console.log('fileWriterEnd.length:', fileWriter.length);
      };
      fileWriter.onerror = function (e) {
        console.log('Failed file write: ' + e.toString());
      };
      if(isAppend) {
        try {
          console.log('fileWriter.length:', fileWriter.length);
          fileWriter.seek(fileWriter.length);
        } catch(e) {
          console.log('file doesn`t exist:', e.toString());
        }
      }
      //console.log('fileWriterStart.length:', fileWriter.length);
      fileWriter.write(dataObj);

    });
  }

  /*getVideoBlob() {
    console.log('this._videoBlob', this._videoBuffer);
    return this._videoBuffer;
  }

  getLocalVideo() {
    let self = this;
    let url = this.formatUrl('happy-rabbit', 'meetyou.mp4');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';
    xhr.onload = function () {
      let response = xhr.response;
      //let buffer = new Buffer(response);
      self._videoBuffer = response;
      console.log('length',self._videoBuffer.length);
      //self._videoBlob = new Blob([new Uint8Array(response)], { type: 'video/mpeg4' });
      //self._videoBlob = new Blob([response], { type: 'video/mpeg4' });
      //self._videoBlob = new Blob([response], { type: 'application/octet-stream' });
      self.trigger(Events.CASE_DOWN_COMPLETE, ['casevideos@@2']);
    };
    xhr.send(null);
  }

  readSystemFile() {
    let self = this;
    console.log('readSystemFile self._storeVideoName:', self._storeVideoName);
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
      fs.root.getFile(self._storeVideoName, { create: true, exclusive: false },function (fileEntry) {
        self.readFile(fileEntry);
      }, self.onErrorCreateFile);
    }, function (error) {
      console.log('onErrorLoadFs, error:', error);
    });
  }

  readFile(fileEntry) {
    let self = this;
    fileEntry.file(function (file) {
      var reader = new FileReader();
      reader.onloadend = function() {
        if(this.result === null) {
          console.log('readFile unexpected this.result == null');
          return;
        }
        console.log(typeof this.result);
        console.log('Successful file read length: ', this.result.length);
        // var blob = new Blob([new Uint8Array(this.result)], { type: "video/mpeg4" });
        console.log('Successful file read: ', this.result);
      };
      // reader.readAsText(file);
      reader.readAsArrayBuffer(file);
      // reader.readAsBinaryString(file);
    }, self.onErrorReadFile);
  }

  onErrorReadFile() {
    console.log('Failed file read: ');
  }*/

  formatUrl(caseName, videoName) {
    //let url = `http://iot.makeblock.com/video/api/getCaseVideo?caseName=${caseName}&videoName=${videoName}`;
    let url = `http://neuronvideo.makeblock.com/${caseName}/${videoName}?timestamp=${new Date().getTime()}`;
    //let url = `http://192.168.3.115:3000/api/getCaseVideo?caseName=${caseName}&videoName=${videoName}`;
    return url;
  }
  
  getConnectionStatus() {
    let networkState = navigator.connection.type;
    let states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    console.log('Connection type: ' + states[networkState]);
    return networkState;
  }

}

let _instance = new BuildCaseStore();
export default  _instance;


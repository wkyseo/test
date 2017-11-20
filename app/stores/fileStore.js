import EventEmitter from 'wolfy87-eventemitter';
import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import RestfulApiImpl from '../utils/RestfulApiImpl';

class FileStore extends EventEmitter {
  constructor() {
    super(...arguments);
    this._lastIndex = 0;
    this._packetLength = 2048;
    this._downloadFinished = false;
    this._videoName = '';
    this._buf = new Buffer(20000000);
    this._videoBuf = null;
    this._videoLength = 0;
    this._copyIndex = 0;
    this._tempBuf = null;
    this._videoArrBuf = null;
  }

  getVideoBuf() {
    // if(this._videoBuf != null) {
    //   console.log('this._videoBuf.length:', this._videoBuf.length);
    // }
      
      // var dataObj = new Blob([this._videoBuf], { type: 'video/mpeg4' });
      // console.log('this.dataObj.length:', dataObj.length);
    return this._videoBuf;
  }

  // writeSystemFile(videoData) {
  //   let self = this;
  //   self.writeFile.bind(self);
  //   console.log('writeSystemFile self._videoName:', self._videoName);
  //   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
  //     console.log('open file name: ', fs.name);
  //     fs.root.getFile(self._videoName, { create: true, exclusive: false },function (fileEntry) {
  //       console.log('is a file？', fileEntry.isFile.toString());
  //       var dataObj = new Blob([videoData], { type: 'video/mpeg4' });
  //       self.writeFile(fileEntry, dataObj, true);
  //     }, self.onErrorCreateFile);
  //   }, self.onErrorLoadFs);
  // }

  // writeFile(fileEntry, dataObj, isAppend) {
  //   let self = this;
  //   fileEntry.createWriter(function (fileWriter) {
  //     fileWriter.onwriteend = function() {
  //       console.log('Successful file write...');
  //       self._lastIndex += 1;
  //       let getUrl = self.formatURL(self._videoName, self._lastIndex);
  //       RestfulApiImpl.doGet(getUrl, self.getCallback.bind(self), 2500);
  //     };
  //     fileWriter.onerror = function (e) {
  //       console.log('Failed file write: ' + e.toString());
  //     };
  //     if(isAppend) {
  //       try {
  //         fileWriter.seek(fileWriter.length);
  //       } catch(e) {
  //         console.log('file doesn`t exist:', e.toString());
  //       }
  //     }
  //     fileWriter.write(dataObj);
  //   });
  // }

  writeSystemFile(videoData, isAppend) {
    let self = this;
    return new Promise((resolve, reject) => {
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
        fs.root.getFile(self._videoName, { create: true, exclusive: false },function (fileEntry) {
          var dataObj = new Blob([videoData], { type: 'video/mpeg4' });
          // var dataObj = new Blob([videoData], { type: 'text/plain' });
          self.writeFile(fileEntry, dataObj, isAppend, resolve, reject);
        }, function(e) {
          console.log('onErrorCreateFile, error:', e);
          reject(e);
        });
      }, function(e) {
        console.log('onErrorLoadFs, error:', e);
        reject(e);
      });
    });
  }

  writeFile(fileEntry, dataObj, isAppend, resolve, reject) {
    // let self = this;
    fileEntry.createWriter(function (fileWriter) {
      fileWriter.onwriteend = function() {
        console.log('Successful file write...');
        resolve();
      };
      fileWriter.onerror = function (e) {
        console.log('Failed file write: ' + e.toString());
        reject(e);
      };
      if(isAppend) {
        try {
          console.log('fileWriter.length:', fileWriter.length);
          fileWriter.seek(fileWriter.length);
        } catch(e) {
          console.log('file doesn`t exist:', e.toString());
          reject(e);
        }
      }
      console.log('fileWriter.length:', fileWriter.length);
      fileWriter.write(dataObj);
    });
  }

  onErrorCreateFile(error) {
    console.log('onErrorCreateFile, error:', error);
  }

  onErrorLoadFs(error){
    console.log('onErrorLoadFs, error:', error);
  }

  readSystemFile() {
    let self = this;
    console.log('readSystemFile self._videoName:', self._videoName);
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {
      fs.root.getFile(self._videoName, { create: true, exclusive: false },function (fileEntry) {
        self.readFile(fileEntry);
      }, self.onErrorCreateFile);
    }, self.onErrorLoadFs);
  }

  readFile(fileEntry) {
    let self = this;
    fileEntry.file(function (file) {
      var reader = new FileReader();
      reader.onloadend = function() {
        if(this.result == null) {
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
  }


  formatURL(videoName, index) {
    let url = 'http://10.0.1.123:3000/video/' + videoName + '?index=' + index;
    return url;
  }

  doGetTimeout() {
    let self = this;
    console.log('doGetTimeout');
    if(self._downloadFinished) {
      console.log('doGetTimeout download is finished');
      return;
    }

    let getUrl = self.formatURL(self._videoName, self._lastIndex);
    RestfulApiImpl.doGet(getUrl, self.getCallback.bind(self), 2500);
  }

  doGetFailed() {
    let self = this;
    console.log('doGetFailed');
    if(self._downloadFinished) {
      console.log('doGetFailed download is finished');
      return;
    }

    let getUrl = self.formatURL(self._videoName, self._lastIndex);
    RestfulApiImpl.doGet(getUrl, self.getCallback.bind(self), 2500);
  }

  doGetStatus(responseText) {
    let self = this;
    let responseObj = JSON.parse(responseText);
    console.log('doGetStatus:', responseObj.index, responseObj.errCode);
    if(responseObj.index != self._lastIndex) {
      console.log('doGetStatus unexpected index:', responseObj.index, self._lastIndex);
      return;
      
    }
    if(responseObj.data.data.length < self._packetLength) {
      self._downloadFinished = true;
      console.log('doGetStatus download finished responseObj.data.data.length: ', responseObj.data.data.length);
      self._tempBuf = new Buffer(responseObj.data.data);
      self._tempBuf.copy(self._buf, self._copyIndex, 0, self._tempBuf.length);
      self._copyIndex += self._tempBuf.length;
      self._videoBuf = self._buf.slice(0, self._copyIndex);
      console.log('doGetStatus download finished self._videoBuf.length: ', self._videoBuf.length);
      console.log(Buffer.isBuffer(self._videoBuf), self._videoBuf.length);
      self.writeSystemFile(self._videoBuf, false).then(function() {
        console.log('doGetStatus writeSystemFile self._videoBuf.length:', self._videoBuf.length);
      }).catch(function(e) {
        console.log('doGetStatus catch e:', e.toString());
      });
      return;
    }
    if(responseObj.data.data.length > self._packetLength) {
      console.log('doGetStatus unexpected responseObj.data.data.length: ', responseObj.data.data.length);
      return;
    }

    self._tempBuf = new Buffer(responseObj.data.data);
    console.log(Buffer.isBuffer(self._tempBuf), self._tempBuf.length);
    self._tempBuf.copy(self._buf, self._copyIndex, 0, self._tempBuf.length);
    self._copyIndex += self._tempBuf.length;

    self._lastIndex += 1;
    let getUrl = self.formatURL(self._videoName, self._lastIndex);
    RestfulApiImpl.doGet(getUrl, self.getCallback.bind(self), 2500);

    // self.writeSystemFile(responseObj.data.data, false).then(function() {
    //   self._lastIndex += 1;
    //   let getUrl = self.formatURL(self._videoName, self._lastIndex);
    //   RestfulApiImpl.doGet(getUrl, self.getCallback.bind(self), 2500);
    //   console.log('doGetStatus writeSystemFile success');
    // }).catch(function(e) {
    //   console.log('doGetStatus writeSystemFile catch e:', e.toString());
    // });
  }

  getCallback(status, responseText) {
    let self = this;
    if(responseText == 'timeout') {
      self.doGetTimeout();
    } else if(status == 200) {
      self.doGetStatus(responseText);
    } else {
      self.doGetFailed();
    }
  }

  getVideoData(videoName) {
    let self = this;
    self._downloadFinished = false;
    self._videoName = videoName;
    console.log(self._videoName);
    let getUrl = self.formatURL(self._videoName, self._lastIndex);
    RestfulApiImpl.doGet(getUrl, self.getCallback.bind(self), 2500);
  }

  getTestMP4() {
    let self = this;
    self._videoName = 'meetyou.mp4';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', './video/meetyou.mp4', true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
      console.log(xhr.response);
      var arrayBuffer = xhr.response;    // 注意:不是oReq.responseText
      console.log(Buffer.isBuffer(arrayBuffer));
      if (arrayBuffer) {
        // console.log('arrayBuffer.length:', arrayBuffer.length);
        self._videoBuf = new Buffer(arrayBuffer);
        console.log('getTestMP4 self._videoBuf.length:', self._videoBuf.length);
        // self._videoArrBuf = arrayBuffer;
        self.writeSystemFile(self._videoBuf, false).then(function() {
          console.log('getTestMP4 writeSystemFile self._videoBuf.length:', self._videoBuf.length);
        }).catch(function(e) {
          console.log('getTestMP4 catch e:', e.toString());
        });
      }
    };
    xhr.send(null);
  }

}


let _instance = new FileStore();

AppDispatcher.register((action) => {
  if (action.actionType == AppConstants.GET_VIDEO_DATA) {
    // ble
    // _instance.writeSystemFile('helloworld');
    _instance.getVideoData('meetyou.mp4');
    console.log('application:', cordova.file.applicationDirectory);
    console.log('document:', cordova.file.documentsDirectory);
    // _instance.getTestMP4();
    // _instance._videoName = 'darling.txt';
    // _instance.writeSystemFile('helloworld', false).then(function() {
    //   console.log('_instance.writeSystemFile success');
    // }).catch(function(e) {
    //   console.log('_instance.writeSystemFile catch e:', e.toString());
    // });
  } else if(action.actionType == AppConstants.READ_SYSTEM_FILE) {
    // wifi
    // console.log('application:', cordova.file.applicationDirectory);
    // console.log('document:', cordova.file.documentsDirectory);
    _instance.readSystemFile();
    // _instance.getVideoData('meetyou.mp4');
  }
});

export default _instance;
import EventEmitter from 'wolfy87-eventemitter';

class RestfulApiImpl extends EventEmitter {
  constructor() {
    super(...arguments);
    this._host = 'http://iot.makeblock.com/http';
    this._dataHost = 'http://iot.makeblock.com:8000';
    // this._host = 'http://localhost:3000';
  }
  
  getIoTServerHost() {
    return this._host;
  }

  getIoTDataHost() {
    return this._dataHost;
  }
  doGet(getUrl, callback, timeout) {
    let request = new XMLHttpRequest();
    request.timeout = timeout;
    request.open( 'GET', getUrl, true);
    request.ontimeout = function(){
      callback(request.status, 'timeout');
    };
    request.onreadystatechange = function() {
      if(request.readyState == 4) {
        if(request.status == 200) {
          callback(request.status, request.responseText);
        } else {
          callback(request.status, '');
        }
      }
    };
    request.send(null);
  }
  doBlobGet(getUrl, callback, timeout, requestHeadObj, responseType) {
    let xhr = new XMLHttpRequest();
    xhr.timeout = timeout;
    xhr.open('GET', getUrl, true);
    if(requestHeadObj && requestHeadObj instanceof Object) {
      for(let key in requestHeadObj) {
        if(requestHeadObj.hasOwnProperty(key)) {
          xhr.setRequestHeader(key, requestHeadObj[key]);
        }
      }
    }
    if(responseType) {xhr.responseType = responseType;}
    xhr.ontimeout = function(){
      callback(xhr.status, 'timeout');
    };
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) {
        if(xhr.status === 200) {
          callback(xhr.status, xhr.responseText || xhr.response);
        } else {
          callback(xhr.status, '');
        }
      }
    };
    xhr.onabort = function () {
      callback(xhr.status, 'abort');
    };
    xhr.onprogress = function (event) {
      callback(xhr.status, 'progress', event);
      /*if (event.lengthComputable) {
        var completedPercent = event.loaded / event.total;
      }*/
    };
    try{
      xhr.send();
    }catch(e){
      console.log('[xhrSendNetError]', e);
    }


  }
  doPost(postUrl, postData, callback, timeout, header) {
    let request = new XMLHttpRequest();
    request.timeout = timeout;
    request.open( 'POST', postUrl, true);
    if(header) {
      request.setRequestHeader('content', header);
    }
    // request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    
    request.ontimeout = function(){
      callback(request.status, 'timeout');
    };
    request.onreadystatechange = function() {
      console.log('request.readyState:' + request.readyState);
      if(request.readyState == 4) {
        if(request.status == 200) {
          callback(request.status, request.responseText);
        } else {
          callback(request.status, '');
        }
      }
    };
    request.send(postData);
    console.log('postData:' + postData);
  }
  doDelete(deleteUrl, callback) {
    let request = new XMLHttpRequest();
    request.open( 'DELETE', deleteUrl, true);
    request.onreadystatechange = function() {
      if(request.readyState == 4) {
        if(request.status == 200) {
          callback(request.status, request.responseText);
        } else {
          callback(request.status, '');
        }
      }
    };
    request.send(null);
  }

  doPatch(patchUrl, callback) {
    let request = new XMLHttpRequest();
    request.open( 'PATCH', patchUrl, true);
    request.onreadystatechange = function() {
      if(request.readyState == 4) {
        if(request.status == 200) {
          callback(request.status, request.responseText);
        } else {
          callback(request.status, '');
        }
      }
    };
    request.send(null);
  }
}

let _instance = new RestfulApiImpl();

export default _instance;

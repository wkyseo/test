import React, { Component } from 'react';
import { Link } from 'react-router';
import languages from '../languages';
import {guideStore} from '../stores/guideStore/guideStore';
class Index extends Component {
  constructor() {
    super(...arguments);
  }

  showAppVersion() {
    let version = languages.getTranslation('version-number');
    if(window._runtime == 'cordova') {
      version = version + AppVersion.version;
    } else if(window._runtime == 'electron') {
      version = version + electron.remote.app.getVersion();
    }
    return version;
  }

  render() {
    return (
      <div className="index-wrap" style={{backgroundImage: 'url("img/icon-index-background.png")'}} data-version={this.showAppVersion()}>
        <div className="index-build">
          <Link to={'/build'}>
            <img className="cover-img" src="img/icon-index-build.png" alt="build"/>
            <span className="title">{languages.getTranslation('index-build')}</span>
          </Link>
        </div>
        <div className="index-app">
          <Link to={'/app'}>
            <img className="cover-img" src="img/icon-index-create.png" alt="create"/>
            <span className="title">{languages.getTranslation('index-create')}</span>
          </Link>
        </div>
      </div>
    );
  }

  componentDidMount() {
    guideStore.showBeginGuide();
  }
}

export { Index };


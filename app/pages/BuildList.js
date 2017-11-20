import React, { Component } from 'react';
import {BuildManagement} from '../components/buildManagement/BuildManagement.react';
import { ConfiguratorDialog } from '../components/dialogs/configurator/ConfiguratorDialog.react';

class BuildList extends Component{
  constructor() {
    super(...arguments);
  }


  render() {
    return(
      <div>
        <BuildManagement/>
        <ConfiguratorDialog />
      </div>
    );
  }
}

export {BuildList};
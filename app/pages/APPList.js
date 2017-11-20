import React, { Component } from 'react';
import { ProjectManagement } from '../components/projectManagement/ProjectManagement.react.js';
import projectStore from '../stores/projectStore';
import { TextInputDialog } from '../components/dialogs/TextInputDialog.react';
import { Guide } from '../components/guide/Guide.react';
import UIActions from '../actions/UIActions';
import {Guide_Type} from '../stores/guideStore/guideStore';
import { ConfiguratorDialog } from '../components/dialogs/configurator/ConfiguratorDialog.react';

class APPList extends Component {
  constructor() {
    super(...arguments);
  }

  render() {
    return (
      <div>
        <ProjectManagement/>
        <Guide/>
        <ConfiguratorDialog />
        <TextInputDialog/>
      </div>
    );
  }

  componentDidMount(){
    this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);

    //BeginGuide
    UIActions.startGuide(Guide_Type.begin);
  }

  routerWillLeave() {
    // return false to prevent a transition w/o prompting the user,
    // or return a string to allow the user to decide:
    // return `null` or nothing to let other hooks to be executed
    //
    // NOTE: if you return true, other hooks will not be executed!
    if (!projectStore.getSaveProject())
      return 'Your project is not saved! Are you sure you want to leave?';
  }
}

export { APPList };



import React, { Component }  from 'react';
import { CloudAppManagement } from '../components/projectManagement/CloudAppManagement.react';

class CloudApp extends Component {

  render() {
    return (
      <CloudAppManagement id={this.props.params.id}/>
    );
  }
}

export { CloudApp };



import React, { Component }  from 'react';
import { Editer } from '../components/editer/Editer.react';
import { Guide } from '../components/guide/Guide.react';
import { LinkDialog } from '../components/dialogs/LinkDialog.react';
import { WifiDialog } from '../components/dialogs/WifiDialog.react';
import { WifiServerUpdateDialog } from '../components/dialogs/WifiServerUpdateDialog.react';
import { DisconnDialog } from '../components/dialogs/DisconnDialog.react';
import { ImageDialog } from '../components/dialogs/ImageDialog.react';
import { PatternDialog } from '../components/dialogs/pattern/PatternDialog.react';
import { NumberInputDialog } from '../components/dialogs/NumberInputDialog.react';
import { TextInputDialog } from '../components/dialogs/TextInputDialog.react';
import { PhotoDialog } from '../components/dialogs/PhotoDialog.react';
import { ConnectionTypeDialog } from '../components/dialogs/ConnectionTypeDialog.react';
import { MicrosoftCognitive } from '../components/dialogs/MicrosoftCognitive.react';
import { MicrosoftCognitiveGuidance } from '../components/dialogs/MicrosoftCognitiveGuidance.react';
import { SmartServoDialog } from '../components/dialogs/SmartServoDialog.react';
import { ConfiguratorDialog } from '../components/dialogs/configurator/ConfiguratorDialog.react';

import '../main.less';
import '../components/dialogs/dialog.less';

class App extends Component {

  render() {
    return (
      <div>
        <Editer projectId={this.props.params.id}/>
        <Guide />
        <DisconnDialog />
        <PhotoDialog />
        <MicrosoftCognitive />
        <MicrosoftCognitiveGuidance />
        <SmartServoDialog />
        <ConfiguratorDialog />
        <ImageDialog />
        <PatternDialog />
        <LinkDialog />
        <WifiDialog />
        <NumberInputDialog />
        <TextInputDialog />
        <WifiServerUpdateDialog />
        <ConnectionTypeDialog />
      </div>);}
}

export { App };



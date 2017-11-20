import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { App } from 'pages/App';
import { CloudApp } from 'pages/CloudApp';
import { Index } from 'pages/Index';
import {APPList} from 'pages/APPList';
import {BuildList} from 'pages/BuildList';
import {Build} from 'pages/Build';

//require('babel-core/register');
//require('babel-polyfill');

render((
  <Router history={hashHistory}>
    <Route path="/" component={Index}/>
    <Route path="/build" component={BuildList}/>
    <Route path="/build/:id" component={Build}/>
    <Route path="/app" component={APPList}/>
    <Route path="/app/:id" component={App}/>
    <Route path="/app/cloud/:id" component={CloudApp}/>
  </Router>
), document.getElementById('app-container'));
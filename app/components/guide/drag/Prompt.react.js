import React, { Component } from 'react';
import { guideStore } from '../../../stores/guideStore/guideStore';
import languages from '../../../languages/index';

export class Prompt extends Component {
  constructor() {
    super(...arguments);
    this.preconditions = this.props.preconditions;
    this.target = this.props.target;

    this.focusOn = {};
    if (this.props.hint){
      this.focusOn[this.props.hint.position.selector] = {};
    }
    if (this.props.animation) {
      this.focusOn[this.props.animation.source.selector] = {};
      this.focusOn[this.props.animation.target.selector] = {};
    }
    let state = {show: false};
    // Object.assign(state, this.focusOn);
    this.state = state;
    // console.log('this.state',this.state);
  }

  getHintPosition(hint) {
    let rect = this.state[hint.position.selector];
    let result = {};
    if (rect) {
      switch(hint.position.type){
      case 'left-bottom': 
        result = {top:`${rect.top+rect.height}px`,right:`${rect.right}px`};
        break;
      case 'left-top': 
        result = {top:`${rect.top-rect.height}px`,left:`${rect.left}px`};
        break;
      default:
        result = {top:`${rect.top}px`,left:`${rect.left}px`};
        break;
      }
    }
    return result;
  }

  renderHint() {
    let hint = this.props.hint;
    if (hint) {
      return (
        <div className={`hint ${hint.position.type}`} style={this.getHintPosition(hint)}>
          <div className='gesture' />
          <div className='text-wrap'>
            <div className='text-icon' />
            <span className='text'>{languages.getTranslation(hint.text)}</span>
          </div>
        </div>
      );
    }
  }

  render() {
    return (
      <div className={`guide-prompt ${this.state.show? 'show' : 'hidden'}`}>
        {this.renderHint()}
      </div>
    );
  }

  isOverlap(left, right) {
    if ((!left) || (!right)) {
      return true;
    }
    let leftRect = left.getBoundingClientRect();
    let rightRect = right.getBoundingClientRect();
    if ((leftRect.top === rightRect.top) && (leftRect.left === rightRect.left)){
      return true;
    }
    return false
  }

  checkOverlap(selectors){
    let left,right;
    for(let selector of selectors) {
      right = document.querySelector(selector);
      if (!left) {
        left = right;
      }
      if (this.isOverlap(left,right)) {
        left = right;
      }
      else {
        return false;
      }
    }
    return true;
  }

  checkExist(selectors) {
    for(let selector of selectors) {
      if(!document.querySelector(selector)){
        return false;
      }
    }
    return true;
  }
  
  checkCondition(condition) {
    switch(condition.type){
    case 'exist':
      return this.checkExist(condition.selectors);
    case 'overlap':
      return this.checkOverlap(condition.selectors);
    default:
      return false;
    }
  }

  checkState() {
    if (this.checkCondition(this.props.precondition) && (!this.checkCondition(this.props.target))) {
      this.setState({show: true});
    }
    else {
      this.setState({show: false});
    }
    console.log('checkState',this.state,this.props.hint.text);
  }

  checkFocused() {
    Object.keys(this.focusOn).forEach((key) => {
      let el = document.querySelector(key);
      console.log('checkFocused', key,el);
      let alt = {};
      if (el) {
        alt[key] = el.getBoundingClientRect();
      }
      else {
        alt[key] = undefined;
      }
      this.setState(alt);
    });
  }

  onNodeUpdated(){
    this.checkFocused();
    this.checkState();
  }

  componentDidMount() {
    this.onNodeUpdatedFunc = this.onNodeUpdated.bind(this);
    guideStore.on('addNode', this.onNodeUpdatedFunc);
    guideStore.on('moveNode', this.onNodeUpdatedFunc);
    guideStore.on('removeNode', this.onNodeUpdatedFunc);
    this.onNodeUpdated();
  }

  componentDidUpdate() {
    // this.checkState();
  }

  componentWillUnmount() {
    guideStore.off('addNode', this.onNodeUpdatedFunc);
    guideStore.off('moveNode', this.onNodeUpdatedFunc);
    guideStore.off('removeNode', this.onNodeUpdatedFunc);
  }
}
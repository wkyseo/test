import React, { Component } from 'react';
import tapOrClick from '../../utils/tapOrClick';
import { Link } from 'react-router';
import projectStore from '../../stores/projectStore';
import cloudAppStore from '../../stores/cloudAppStore';
import LinkStore from '../../stores/LinkStore';
import languages from '../../languages';
import UIActions from '../../actions/UIActions';
import {Guide_Type} from '../../stores/guideStore/guideStore';

require('./ProjectManagement.less');

class ProjectManagement extends Component {

  constructor() {
    super(...arguments);
    this.borderStyle=['#48dfa0', '#fdd242', '#ffa86b', '#bb99fb', '#50cef4'];
    this.showSelection = 'url("img/icon-canSelect.png") ';
    this.setSelection = 'url("img/icon-isSelect.png")';
    this.whiteTrashcan = 'url("img/icon-delete-white.png")';
    this.redTrashcan = 'url("img/icon-delete-red.png")';
    this.canSaveStyle = {background: '#4985ce', color: '#ebf4ff'};
    this.cannotSaveStyle = {background: '#bababa', color: '#ffffff'};
    this.cloudProjectArray = [];
    this.state = {
      isActive: 'normal',
      projects: projectStore.getAllProjectsDesc(),
      canSelect: 'close',
      action: 'edit',
      openDeletePanel: 'close',
      openResetNamePanel: 'close',
      openExternalPanel: 'close',
      deleteIcon: this.whiteTrashcan,
      resetNameProject: {
        img: '',
        name: '',
        id: '',
        borderColor: ''
      },
      projectArray: [],
      saveAble: false
    };
  }

  // show each project
  projectOverview() {
    let projSet = this.distinguish(this.state.projects);
    let overview, link;

    if(this.state.isActive == 'cloud') {
      overview = [];
      link = '/app/cloud/';
    } else {
      overview = [<li key={'insertNew'} className='project-overview add-new-project'>
        <Link to='/app/create'>
          <span className='create'>{languages.getTranslation('new-project')}</span>
          <img className='project-thumbnail' src={'img/icon-add.png'}/>
        </Link>
      </li>];
      link = '/app/';
    }

    projSet = this.sortProject(projSet);
    for (let project=projSet.length-1; project>=0; project--) {
      overview.push(<li className='project-overview' key={projSet[project].projectId} data-id={projSet[project].projectId} >
        <span className={'select-project '+(this.state.canSelect=='close'?'hide':'')}
              style={{backgroundImage: this.isSelect(projSet[project].projectId)}} {...tapOrClick(this.selected.bind(this))}></span>
        <Link to={link + projSet[project].projectId}>
          <img className='project-thumbnail' src={projSet[project].desc['thumbnail']} />
        </Link>
        <span className='project-name' data-name={projSet[project].desc['name']==''?'untitled':'named'} {...tapOrClick(this.openResetNamePanel.bind(this))} >{projSet[project].desc['name']==''?languages.getTranslation('untitled'): projSet[project].desc['name']}</span>
      </li>);
    }

    return (
      <div className='projects-table' ref='tab'>
        <ul className={'projects-list '} ref='list'>
          {overview}
        </ul>
      </div>);
  }

  // if in cloud app mode, get all cloud app
  distinguish(projects) {
    let list = projects;
    if(this.state.isActive == 'cloud') {
      list = [];
      projects.forEach((project)=>{
        if(project.desc.cloudempty == 1) {
          list.push(project);
        }
      });
    }
    return list;
  }

  // sort project list by index in decrease
  sortProject(projSet){
    projSet.sort((a,b)=>{
      return a.desc.index-b.desc.index;
    });
    return projSet;
  }

  isSelect(id){
    if(this.state.projectArray.indexOf(id)!=-1){
      return this.setSelection;
    }
    return this.showSelection;
  }

  // return border color for each project
  getBorder(index){
    let v = index%5;
    return this.borderStyle[v];
  }

  // reset project name
  openResetNamePanel(e){
    let curProject = e.target.closest('.project-overview');
    let target = e.target;
    let name = target.dataset.name == 'untitled'?'':target.textContent;
    this.setState({
      resetNameProject: {
        id: curProject.dataset.id,
        name: target.textContent,
        img: curProject.querySelector('.project-thumbnail').src,
        borderColor: curProject.style.borderColor
      }
    });
    UIActions.openTextInputDialog((text) => {
      this.saveName(text);
    }, name, target, languages.getTranslation('rename-project'));
  }

  //save new Name
  saveName(newName){
    projectStore.saveProjectName(this.state.resetNameProject.id, newName);
    this.setState({
      resetNameProject: {
        id: '',
        name: '',
        img: '',
        borderColor: ''
      },
      projects: projectStore.getAllProjectsDesc()
    });
  }

  // choose project to delete
  selected(e){
    e.preventDefault();
    let tmpArray, targetId = e.target.closest('.project-overview').dataset.id;
    tmpArray = this.state.projectArray;


    projectStore.getAllProjectsDesc().forEach((project)=>{
      if(project.projectId == targetId && project.desc.cloudID != undefined){
        this.cloudProjectArray.push(project.desc.cloudID[0]);
      }
    });
    if(tmpArray.indexOf(targetId)==-1){
      tmpArray.push(targetId);
    } else {
      tmpArray.splice(tmpArray.indexOf(targetId), 1);
    }
    this.setState({
      projectArray: tmpArray,
      deleteIcon: this.state.projectArray.length>0? this.redTrashcan: this.whiteTrashcan
    });
  }

  // switch tab between cloud and my project
  switchTab(e){
    if(e.target.dataset.type != this.state.isActive){
      this.setState({
        isActive: e.target.dataset.type,
      });
    }

    this.setState({
      projects: projectStore.getAllProjectsDesc(),
      openDeletePanel: 'close',
      action: 'edit',
      canSelect: 'close',
      openExternalPanel: 'close',
      deleteIcon: this.whiteTrashcan,
      projectArray: []
    });
    let selectOption = document.querySelectorAll('.select-project');
    for(let i=0; i<selectOption.length; i++){
      selectOption[i].style.backgroundImage = 'url("img/icon-canSelect.png")';
    }
    this.refs.trashCan.classList.remove('appear-from-bottom');
  }

  // choose edit or cancel
  editProject(){
    if(this.state.action == 'edit'){
      this.setState({
        action: 'cancel',
        canSelect: 'open',
      });
      this.refs.trashCan.classList.add('appear-from-bottom');
    } else {
      this.setState({
        action: 'edit',
        canSelect: 'close',
        deleteIcon: this.whiteTrashcan,
        projectArray: []
      });
      this.refs.trashCan.classList.remove('appear-from-bottom');
    }
  }

  //open delete panel
  deleteProject(){
    if(this.state.projectArray.length != 0)
    {
      this.setState({
        openDeletePanel: 'open',
        openExternalPanel: 'open'
      });
    }
  }

  cancel(){
    this.setState({
      openDeletePanel: 'close',
      action: 'edit',
      canSelect: 'close',
      openExternalPanel: 'close',
      deleteIcon: this.whiteTrashcan,
      projectArray: []
    });
    let selectOption = document.querySelectorAll('.select-project');
    for(let i=0; i<selectOption.length; i++){
      selectOption[i].style.backgroundImage = 'url("img/icon-canSelect.png")';
    }
    this.refs.trashCan.classList.remove('appear-from-bottom');
  }

  confirm(){
    projectStore.deleteProjectArr(this.state.projectArray);
    this.setState({
      openDeletePanel: 'close',
      action: 'edit',
      canSelect: 'close',
      openExternalPanel: 'close',
      deleteIcon: this.whiteTrashcan,
      projects: projectStore.getAllProjectsDesc(),
      projectArray: []
    });
    this.refs.trashCan.classList.remove('appear-from-bottom');
    if(this.cloudProjectArray.length!=0) {
      cloudAppStore.deleteProjects(this.cloudProjectArray);
    }
  }

  //confirm window to delete projects
  confirmDeletion(){
    let self = this;
    return (
      <div className={'delete-panel '+(this.state.openDeletePanel=='open'?'':'hide')}>
        <img className='delete-icon' src='img/icon-red-trash.png' />
        <span className='title'>{languages.getTranslation('delete-project')}</span>
        <span className='text'>{languages.getTranslation('delete-reconfirm')}</span>
        <div className={'delete-button-set '+this.state.openDeletePanel}>
          <div className="cancel" {...tapOrClick(self.cancel.bind(self))} >{languages.getTranslation('cancel')}</div>
          <div className="confirm" {...tapOrClick(self.confirm.bind(self))} >{languages.getTranslation('icon-confirm-ok')}</div>
        </div>
      </div>
    );
  }


  closeExternalPanel(){
    this.setState({
      openDeletePanel: 'close',
      action: 'edit',
      canSelect: 'close',
      openExternalPanel: 'close',
      openResetNamePanel: 'close',
      resetNameProject: {
        id: '',
        name: '',
        img: '',
        borderColor: ''
      },
      projects: projectStore.getAllProjectsDesc(),
      saveAble: false,
      projectArray: [],
      deleteIcon: this.whiteTrashcan,
    });
    this.refs.inputBox.value = null;
    this.refs.inputBox.blur();
    this.refs.trashCan.classList.remove('appear-from-bottom');
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

  restartGuide() {
    UIActions.toggleGuide({
      type: 'confirm',
      title: languages.getTranslation('guide-tips'),
      text: languages.getTranslation('guide-tips-restart'),
      callback: function () {
        localStorage.setItem('isFirstOpenAPP', 'true');
        //BeginGuide
        setTimeout(()=>{
          UIActions.startGuide(Guide_Type.begin);
        },0);

      }
    });

  }

  render() {
    let self = this;
    return (
      <div className='project-tab' >
        <div className='project-item' ref='title'>
          <div className="back">
            <Link to={'/'}><img src="./img/icon-white-back.png" alt="Back"/></Link>
            <img className={'start-guide'} src="./img/icon-start-guide.png" alt="startGuide" {...tapOrClick(self.restartGuide.bind(self))}/>
          </div>
          <div className={'project-category title'} {...tapOrClick(self.switchTab.bind(self))} data-type='normal'>{languages.getTranslation('my-project-list')}</div>
          <div className={'action-wrap'}>
            <div className={'project-category edit'} data-type={this.state.action} {...tapOrClick(self.editProject.bind(self))}>{this.state.action=='edit'?languages.getTranslation('edit-link'):languages.getTranslation('cancel')}</div>
          </div>

        </div>
        {this.projectOverview()}
        <div className='delete-project' ref='trashCan'><div className='delete-project-icon' {...tapOrClick(self.deleteProject.bind(self))} style={{backgroundImage: this.state.deleteIcon}}></div></div>
        <div className={'panel-cover '+(this.state.openExternalPanel=='open'?'':'hide')} {...tapOrClick(self.closeExternalPanel.bind(self))}></div>
        {this.confirmDeletion()}
      </div>
    );
  }

  quit() {
    if (LinkStore.getStatus() == 'connected') {
      UIActions.disconnectLinkDevice(false);
    }
    navigator.app.exitApp();
  }

  componentDidMount(){
    // let self = this;
    this.loadProjectFunc = this.loadProject.bind(this);
    this.quitFunc = this.quit.bind(this);
    projectStore.on('saveFinished', this.loadProjectFunc);
    document.addEventListener('backbutton', this.quitFunc, false);
  }

  componentWillMount(){
    if(localStorage.getItem('state')!=null)
    {
      this.setState({
        isActive: localStorage.getItem('state')
      });
      localStorage.setItem('state', 'normal');
    }
  }
  
  loadProject(){
    this.setState({
      projects: projectStore.getAllProjectsDesc()
    });
  }

  shouldComponentUpdate(nProps, nState) {
    if(nState !== this.state) {
      return true;
    }
    return false;
  }

  componentWillUnmount(){
    localStorage.setItem('state', this.state.isActive);
    projectStore.off('saveFinished', this.loadProjectFunc);
  }

}

export { ProjectManagement };
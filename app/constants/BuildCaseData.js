//import BuildCaseStore from '../stores/buildCaseStore';

function getDirectory() {
  if(window._runtime === 'cordova') {
    console.log('runtime: ',window._runtime);
    let isIOS = /(iPad|iPhone|iPod)/g.test(navigator.userAgent);
    if(isIOS) {
      return cordova.file.documentsDirectory;
    }else {
      return cordova.file.dataDirectory + 'files/';
    }
  }else {
    return 'files/';
  }

}

let directory = getDirectory();

/*
* 每个对象为一个案例数据
* 步骤类型的可能值为：prevideo, video, image, subtitle, partList。data存储步骤的资源, 包括视频或者图片等路径和文本
* */
const BuildCaseData = [
  {
    name: 'touch-head',
    id: '1',
    coverImg: './img/buildCase/touch-head/cover-thumbnail.png',
    difficultyIndex: 2,
    directoryName: 'touch-head',
    stepLists:[
      //引导视频
      {
        type: 'preVideo',
        title: 'case-instruction',
        category: 'case-instruction',
        data:{
          src: './video/touch-head/pre-video.mp4',
          radarSrc: './img/buildCase/touch-head/icon-radar.png',
          poster: './img/buildCase/touch-head/case-pre-cover.png',
          text: 'case-not-touch-head'
        }
      },
      //原理展示小标题
      {
        type: 'subTitle',
        category: 'case-principle',
        title: 'case-principle',
        sequenceNumber: '01',
        data:{
          src: './img/buildCase/icon-case-subtitle-part.png',
        }
      },
      //原理展示1安装模块视频
      {
        type: 'video',
        category: 'case-principle',
        title: '',
        data: {
          src:'./video/touch-head/neuron-connect1.mp4',
          poster: './img/buildCase/touch-head/principle-cover-1.png',
          text: 'connect-block-step1'
        }
      },
      //原理展示2安装模块视频
      {
        type: 'video',
        category: 'case-principle',
        title: '',
        data: {
          src:'./video/touch-head/neuron-connect2.mp4',
          poster: './img/buildCase/touch-head/principle-cover-2.png',
          text: 'connect-block-step2'
        }
      },
      //结构搭建小标题
      {
        type: 'subTitle',
        category: 'case-construction',
        title: 'case-construction',
        sequenceNumber: '02',
        data:{
          src: './img/buildCase/icon-case-subtitle-structure.png',
        }
      },
      //物料清单列表1
      {
        type: 'partList',
        category: 'case-construction',
        title: 'case-part-list',
        data:{
          src: './img/buildCase/touch-head/icon-touch-head-partList-1.png',
          partList:['part-power','part-gyroSensor', 'part-dualServo', 'part-servo', 'part-pan', 'part-neuronBoards', 'part-legoBlocks',]
        }
      },
      //物料清单列表1
      {
        type: 'partList',
        category: 'case-construction',
        title: 'case-part-list',
        data:{
          src: './img/buildCase/touch-head/icon-touch-head-partList-2.png',
          partList:['part-8', 'part-9', 'part-10',]
        }
      },
      //结构搭建-1
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: './video/touch-head/case-construction-1.mp4',
          poster: './img/buildCase/touch-head/construction-cover-1.png',
          text: 'case-construction-1'
        }
      },
      //结构搭建-2
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: './video/touch-head/case-construction-2.mp4',
          poster: './img/buildCase/touch-head/construction-cover-2.png',
          text: 'case-construction-2'
        }
      },
      //结构搭建-3
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: './video/touch-head/case-construction-3.mp4',
          poster: './img/buildCase/touch-head/construction-cover-3.png',
          text: 'case-construction-3'
        }
      },
      //结构搭建-4
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: './video/touch-head/case-construction-4.mp4',
          poster: './img/buildCase/touch-head/construction-cover-4.png',
          text: 'case-construction-4'
        }
      },
      //结构搭建-5
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: './video/touch-head/case-construction-5.mp4',
          poster: './img/buildCase/touch-head/construction-cover-5.png',
          text: 'case-construction-5'
        }
      },
      //结构搭建-6-1
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: './video/touch-head/case-construction-6-1.mp4',
          poster: './img/buildCase/touch-head/construction-cover-6-1.png',
          text: 'case-construction-6-1'
        }
      },
      //结构搭建-6-2
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: './video/touch-head/case-construction-6-2.mp4',
          poster: './img/buildCase/touch-head/construction-cover-6-2.png',
          text: 'case-construction-6-2'
        }
      },
      //结构搭建-7
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: './video/touch-head/case-construction-7.mp4',
          poster: './img/buildCase/touch-head/construction-cover-7.png',
          text: 'case-construction-7'
        }
      },
      //结构搭建-8
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: './video/touch-head/case-construction-8.mp4',
          poster: './img/buildCase/touch-head/construction-cover-8.png',
          text: 'case-construction-8'
        }
      },
      //结构搭建-9
      {
        type: 'image',
        category: 'case-construction',
        title: '',
        data: {
          src: './img/buildCase/touch-head/case-construction-9.png',
          text: 'case-construction-9'
        }
      },
      //结构搭建-10
      {
        type: 'image',
        category: 'case-construction',
        title: '',
        data: {
          src: './img/buildCase/touch-head/case-construction-10.png',
          text: 'case-construction-10'
        }
      },
    ],
  },
/*  {
    name: 'happy-rabbit',
    id: '2',
    coverImg: './img/buildCase/happy-rabbit/cover-thumbnail.png',
    difficultyIndex: 3,
    directoryName: 'happy-rabbit',
    stepLists:[
      //引导视频
      {
        type: 'preVideo',
        title: 'case-instruction',
        category: 'case-instruction',
        data:{
          src: directory + 'happy-rabbit_pre-video.mp4',
          //src: './video/touch-head/pre-video.mp4',
          radarSrc: './img/buildCase/happy-rabbit/icon-radar.png',
          poster: './img/buildCase/happy-rabbit/case-pre-cover.png',
          text: 'rabbit-introduction'
        }
      },
      //结构搭建小标题
      {
        type: 'subTitle',
        category: 'case-construction',
        title: 'case-construction',
        sequenceNumber: '01',
        data:{
          src: './img/buildCase/icon-case-subtitle-structure.png',
        }
      },
      //物料清单列表1
      {
        type: 'partList',
        category: 'case-construction',
        title: 'case-part-list',
        data:{
          src: './img/buildCase/happy-rabbit/icon-partList-1.png',
          partList:['rabbit-part-1','rabbit-part-2', 'rabbit-part-3', 'rabbit-part-4', 'rabbit-part-5']
        }
      },
      //物料清单列表2
      {
        type: 'partList',
        category: 'case-construction',
        title: 'case-part-list',
        data:{
          src: './img/buildCase/happy-rabbit/icon-partList-2.png',
          partList:['rabbit-part-6', 'rabbit-part-7']
        }
      },
      //结构搭建-1
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'happy-rabbit_case-construction-1.mp4',
          poster: './img/buildCase/happy-rabbit/construction-cover-1.png',
          text: 'rabbit-stepText-1'
        }
      },
      //结构搭建-2
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'happy-rabbit_case-construction-2.mp4',
          poster: './img/buildCase/happy-rabbit/construction-cover-2.png',
          text: 'rabbit-stepText-2'
        }
      },
      //结构搭建-3
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'happy-rabbit_case-construction-3.mp4',
          poster: './img/buildCase/happy-rabbit/construction-cover-3.png',
          text: 'rabbit-stepText-3'
        }
      },
      //结构搭建-4
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'happy-rabbit_case-construction-4.mp4',
          poster: './img/buildCase/happy-rabbit/construction-cover-4.png',
          text: 'rabbit-stepText-4'
        }
      },
      //结构搭建-5
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'happy-rabbit_case-construction-5.mp4',
          poster: './img/buildCase/happy-rabbit/construction-cover-5.png',
          text: 'rabbit-stepText-5'
        }
      },
      //结构搭建-6
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'happy-rabbit_case-construction-6.mp4',
          poster: './img/buildCase/happy-rabbit/construction-cover-6.png',
          text: 'rabbit-stepText-6'
        }
      },
    ],
  },
  {
    name: 'night-light',
    id: '3',
    coverImg: './img/buildCase/night-light/cover-thumbnail.png',
    difficultyIndex: 3,
    directoryName: 'night-light',
    stepLists:[
      //引导视频
      {
        type: 'preVideo',
        title: 'case-instruction',
        category: 'case-instruction',
        data:{
          src: directory + 'night-light_pre-video.mp4',
          radarSrc: './img/buildCase/night-light/icon-radar.png',
          poster: './img/buildCase/night-light/case-pre-cover.png',
          text: 'light-introduction'
        }
      },
      //结构搭建小标题
      {
        type: 'subTitle',
        category: 'case-construction',
        title: 'case-construction',
        sequenceNumber: '01',
        data:{
          src: './img/buildCase/icon-case-subtitle-structure.png',
        }
      },
      //物料清单列表1
      {
        type: 'partList',
        category: 'case-construction',
        title: 'case-part-list',
        data:{
          src: './img/buildCase/night-light/icon-partList-1.png',
          partList:['light-part-1','light-part-2', 'light-part-3', 'light-part-4', ]
        }
      },
      //物料清单列表2
      {
        type: 'partList',
        category: 'case-construction',
        title: 'case-part-list',
        data:{
          src: './img/buildCase/night-light/icon-partList-2.png',
          partList:['light-part-5', 'light-part-6']
        }
      },
      //结构搭建-1
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'night-light_case-construction-1.mp4',
          poster: './img/buildCase/night-light/construction-cover-1.png',
          text: 'light-stepText-1'
        }
      },
      //结构搭建-2
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'night-light_case-construction-2.mp4',
          poster: './img/buildCase/night-light/construction-cover-2.png',
          text: 'light-stepText-2'
        }
      },
      //结构搭建-3
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'night-light_case-construction-3.mp4',
          poster: './img/buildCase/night-light/construction-cover-3.png',
          text: 'light-stepText-3'
        }
      },
      //结构搭建-4
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'night-light_case-construction-4.mp4',
          poster: './img/buildCase/night-light/construction-cover-4.png',
          text: 'light-stepText-4'
        }
      },
      //结构搭建-5
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'night-light_case-construction-5.mp4',
          poster: './img/buildCase/night-light/construction-cover-5.png',
          text: 'light-stepText-5'
        }
      },
      //结构搭建-6
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'night-light_case-construction-6.mp4',
          poster: './img/buildCase/night-light/construction-cover-6.png',
          text: 'light-stepText-6'
        }
      },
    ],
  },*/
  {
    name: 'music-grass',
    id: '4',
    coverImg: './img/buildCase/music-grass/cover-thumbnail.png',
    difficultyIndex: 3,
    directoryName: 'music-grass',
    stepLists:[
      //引导视频
      {
        type: 'preVideo',
        title: 'case-instruction',
        category: 'case-instruction',
        data:{
          src: directory + 'music-grass_pre-video.mp4',
          radarSrc: './img/buildCase/music-grass/icon-radar.png',
          poster: './img/buildCase/music-grass/case-pre-cover.png',
          text: 'grass-introduction'
        }
      },
      //原理展示小标题
      {
        type: 'subTitle',
        category: 'case-principle',
        title: 'case-principle',
        sequenceNumber: '01',
        data:{
          src: './img/buildCase/icon-case-subtitle-part.png',
        }
      },
      //原理展示1安装模块视频
      {
        type: 'video',
        category: 'case-principle',
        title: '',
        data: {
          src: directory + 'music-grass_principle-1.mp4',
          poster: './img/buildCase/music-grass/principle-cover-1.png',
          text: 'grass-principleText-1'
        }
      },
      //原理展示2安装模块视频
      {
        type: 'video',
        category: 'case-principle',
        title: '',
        data: {
          src: directory + 'music-grass_principle-2.mp4',
          poster: './img/buildCase/music-grass/principle-cover-2.png',
          text: 'grass-principleText-2'
        }
      },
      //原理展示3安装模块视频
      {
        type: 'video',
        category: 'case-principle',
        title: '',
        data: {
          src: directory + 'music-grass_principle-3.mp4',
          poster: './img/buildCase/music-grass/principle-cover-3.png',
          text: 'grass-principleText-3'
        }
      },
      //结构搭建小标题
      {
        type: 'subTitle',
        category: 'case-construction',
        title: 'case-construction',
        sequenceNumber: '02',
        data:{
          src: './img/buildCase/icon-case-subtitle-structure.png',
        }
      },
      //物料清单列表1
      {
        type: 'partList',
        category: 'case-construction',
        title: 'case-part-list',
        data:{
          src: './img/buildCase/music-grass/icon-partList-1.png',
          partList:['grass-part-1','grass-part-2', 'grass-part-3', 'grass-part-4', 'grass-part-5']
        }
      },
      //物料清单列表2
      {
        type: 'partList',
        category: 'case-construction',
        title: 'case-part-list',
        data:{
          src: './img/buildCase/music-grass/icon-partList-2.png',
          partList:['grass-part-6', 'grass-part-7']
        }
      },
      //结构搭建-1
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'music-grass_case-construction-1.mp4',
          poster: './img/buildCase/music-grass/construction-cover-1.png',
          text: 'grass-stepText-1'
        }
      },
      //结构搭建-2
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'music-grass_case-construction-2.mp4',
          poster: './img/buildCase/music-grass/construction-cover-2.png',
          text: 'grass-stepText-2'
        }
      },
      //结构搭建-3
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'music-grass_case-construction-3.mp4',
          poster: './img/buildCase/music-grass/construction-cover-3.png',
          text: 'grass-stepText-3'
        }
      },
      //结构搭建-4
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'music-grass_case-construction-4.mp4',
          poster: './img/buildCase/music-grass/construction-cover-4.png',
          text: 'grass-stepText-4'
        }
      },
      //结构搭建-5
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'music-grass_case-construction-5.mp4',
          poster: './img/buildCase/music-grass/construction-cover-5.png',
          text: 'grass-stepText-5'
        }
      },
    ],
  },
  {
    name: 'robot-loud',
    id: '5',
    coverImg: './img/buildCase/robot-loud/cover-thumbnail.png',
    difficultyIndex: 3,
    directoryName: 'robot-loud',
    stepLists:[
      //引导视频
      {
        type: 'preVideo',
        title: 'case-instruction',
        category: 'case-instruction',
        data:{
          src: directory + 'robot-loud_pre-video.mp4',
          radarSrc: './img/buildCase/robot-loud/icon-radar.png',
          poster: './img/buildCase/robot-loud/case-pre-cover.png',
          text: 'robot-introduction'
        }
      },
      //原理展示小标题
      {
        type: 'subTitle',
        category: 'case-principle',
        title: 'case-principle',
        sequenceNumber: '01',
        data:{
          src: './img/buildCase/icon-case-subtitle-part.png',
        }
      },
      //原理展示1安装模块视频
      {
        type: 'video',
        category: 'case-principle',
        title: '',
        data: {
          src: directory + 'robot-loud_principle-1.mp4',
          poster: './img/buildCase/robot-loud/principle-cover-1.png',
          text: 'robot-principleText-1'
        }
      },
      //结构搭建小标题
      {
        type: 'subTitle',
        category: 'case-construction',
        title: 'case-construction',
        sequenceNumber: '02',
        data:{
          src: './img/buildCase/icon-case-subtitle-structure.png',
        }
      },
      //物料清单列表1
      {
        type: 'partList',
        category: 'case-construction',
        title: 'case-part-list',
        data:{
          src: './img/buildCase/robot-loud/icon-partList-1.png',
          partList:['robot-part-1','robot-part-2', 'robot-part-3','robot-part-4','robot-part-5','robot-part-6','robot-part-7','robot-part-8',]
        }
      },
      //物料清单列表2
      {
        type: 'partList',
        category: 'case-construction',
        title: 'case-part-list',
        data:{
          src: './img/buildCase/robot-loud/icon-partList-2.png',
          partList:['robot-part-9', 'robot-part-10']
        }
      },
      //结构搭建-1
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'robot-loud_case-construction-1.mp4',
          poster: './img/buildCase/robot-loud/construction-cover-1.png',
          text: 'robot-stepText-1'
        }
      },
      //结构搭建-2
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'robot-loud_case-construction-2.mp4',
          poster: './img/buildCase/robot-loud/construction-cover-2.png',
          text: 'robot-stepText-2'
        }
      },
      //结构搭建-3
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'robot-loud_case-construction-3.mp4',
          poster: './img/buildCase/robot-loud/construction-cover-3.png',
          text: 'robot-stepText-3'
        }
      },
      //结构搭建-4
      {
        type: 'image',
        category: 'case-construction',
        title: '',
        data: {
          src: './img/buildCase/robot-loud/step-4.png',
          text: 'robot-stepText-4'
        }
      },
      //结构搭建-5
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'robot-loud_case-construction-4.mp4',
          poster: './img/buildCase/robot-loud/construction-cover-4.png',
          text: 'robot-stepText-5'
        }
      },
      //结构搭建-6
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'robot-loud_case-construction-5.mp4',
          poster: './img/buildCase/robot-loud/construction-cover-5.png',
          text: 'robot-stepText-6'
        }
      },
      //结构搭建-7
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'robot-loud_case-construction-6.mp4',
          poster: './img/buildCase/robot-loud/construction-cover-6.png',
          text: 'robot-stepText-7'
        }
      },
      //结构搭建-8
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'robot-loud_case-construction-7.mp4',
          poster: './img/buildCase/robot-loud/construction-cover-7.png',
          text: 'robot-stepText-8'
        }
      },
      //结构搭建-9
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'robot-loud_case-construction-8.mp4',
          poster: './img/buildCase/robot-loud/construction-cover-8.png',
          text: 'robot-stepText-9'
        }
      },
      //结构搭建-10
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'robot-loud_case-construction-9.mp4',
          poster: './img/buildCase/robot-loud/construction-cover-9.png',
          text: 'robot-stepText-10'
        }
      },
      //结构搭建-11
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'robot-loud_case-construction-10.mp4',
          poster: './img/buildCase/robot-loud/construction-cover-10.png',
          text: 'robot-stepText-11'
        }
      },
      //结构搭建-12
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'robot-loud_case-construction-11.mp4',
          poster: './img/buildCase/robot-loud/construction-cover-11.png',
          text: 'robot-stepText-12'
        }
      },
      //结构搭建-13
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'robot-loud_case-construction-12.mp4',
          poster: './img/buildCase/robot-loud/construction-cover-12.png',
          text: 'robot-stepText-13'
        }
      },
      //结构搭建-14
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'robot-loud_case-construction-13.mp4',
          poster: './img/buildCase/robot-loud/construction-cover-13.png',
          text: 'robot-stepText-14'
        }
      },
      //结构搭建-15
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'robot-loud_case-construction-14.mp4',
          poster: './img/buildCase/robot-loud/construction-cover-14.png',
          text: 'robot-stepText-15'
        }
      },
    ],
  },
  {
    name: 'telegraph',
    id: '6',
    coverImg: './img/buildCase/telegraph/cover-thumbnail.png',
    difficultyIndex: 2,
    directoryName: 'telegraph',
    stepLists:[
      //引导视频
      {
        type: 'preVideo',
        title: 'case-instruction',
        category: 'case-instruction',
        data:{
          src: directory + 'telegraph_pre-video.mp4',
          radarSrc: './img/buildCase/telegraph/icon-radar.png',
          poster: './img/buildCase/telegraph/case-pre-cover.png',
          text: 'telegraph-introduction'
        }
      },
      //原理展示小标题
      {
        type: 'subTitle',
        category: 'case-principle',
        title: 'case-principle',
        sequenceNumber: '01',
        data:{
          src: './img/buildCase/icon-case-subtitle-part.png',
        }
      },
      //原理展示1安装模块视频
      {
        type: 'video',
        category: 'case-principle',
        title: '',
        data: {
          src: directory + 'telegraph_principle-1.mp4',
          poster: './img/buildCase/telegraph/principle-cover-1.png',
          text: 'telegraph-principleText-1'
        }
      },
      //结构搭建小标题
      {
        type: 'subTitle',
        category: 'case-construction',
        title: 'case-construction',
        sequenceNumber: '02',
        data:{
          src: './img/buildCase/icon-case-subtitle-structure.png',
        }
      },
      //物料清单列表1
      {
        type: 'partList',
        category: 'case-construction',
        title: 'case-part-list',
        data:{
          src: './img/buildCase/telegraph/icon-partList-1.png',
          partList:['telegraph-part-1','telegraph-part-2', 'telegraph-part-3',]
        }
      },
      //物料清单列表2
      {
        type: 'partList',
        category: 'case-construction',
        title: 'case-part-list',
        data:{
          src: './img/buildCase/telegraph/icon-partList-2.png',
          partList:['telegraph-part-4','telegraph-part-5','telegraph-part-6','telegraph-part-7','telegraph-part-8',]
        }
      },
      //结构搭建-1
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'telegraph_case-construction-1.mp4',
          poster: './img/buildCase/telegraph/construction-cover-1.png',
          text: 'telegraph-stepText-1'
        }
      },
      //结构搭建-2
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'telegraph_case-construction-2.mp4',
          poster: './img/buildCase/telegraph/construction-cover-2.png',
          text: 'telegraph-stepText-2'
        }
      },
      //结构搭建-3
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'telegraph_case-construction-3.mp4',
          poster: './img/buildCase/telegraph/construction-cover-3.png',
          text: 'telegraph-stepText-3'
        }
      },
      //结构搭建-4
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'telegraph_case-construction-4.mp4',
          poster: './img/buildCase/telegraph/construction-cover-4.png',
          text: 'telegraph-stepText-4'
        }
      },
    ],
  },
  {
    name: 'ele-guitar',
    id: '7',
    coverImg: './img/buildCase/guitar/cover-thumbnail.png',
    difficultyIndex: 2,
    directoryName: 'guitar',
    stepLists:[
      //引导视频
      {
        type: 'preVideo',
        title: 'case-instruction',
        category: 'case-instruction',
        data:{
          src: directory + 'guitar_pre-video.mp4',
          radarSrc: './img/buildCase/guitar/icon-radar.png',
          poster: './img/buildCase/guitar/case-pre-cover.png',
          text: 'guitar-introduction'
        }
      },
      //原理展示小标题
      {
        type: 'subTitle',
        category: 'case-principle',
        title: 'case-principle',
        sequenceNumber: '01',
        data:{
          src: './img/buildCase/icon-case-subtitle-part.png',
        }
      },
      //原理展示1安装模块视频
      {
        type: 'video',
        category: 'case-principle',
        title: '',
        data: {
          src: directory + 'guitar_principle-1.mp4',
          poster: './img/buildCase/guitar/principle-cover-1.png',
          text: 'telegraph-principleText-1'
        }
      },
      //结构搭建小标题
      {
        type: 'subTitle',
        category: 'case-construction',
        title: 'case-construction',
        sequenceNumber: '02',
        data:{
          src: './img/buildCase/icon-case-subtitle-structure.png',
        }
      },
      //物料清单列表1
      {
        type: 'partList',
        category: 'case-construction',
        title: 'case-part-list',
        data:{
          src: './img/buildCase/guitar/icon-partList-1.png',
          partList:['guitar-part-1','guitar-part-2', ]
        }
      },
      //物料清单列表2
      {
        type: 'partList',
        category: 'case-construction',
        title: 'case-part-list',
        data:{
          src: './img/buildCase/guitar/icon-partList-2.png',
          partList:['guitar-part-3','guitar-part-4', 'guitar-part-5', 'guitar-part-6','guitar-part-7','guitar-part-8', 'guitar-part-9',]
        }
      },
      //结构搭建-1
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'guitar_case-construction-1.mp4',
          poster: './img/buildCase/guitar/construction-cover-1.png',
          text: 'guitar-stepText-1'
        }
      },
      //结构搭建-2
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'guitar_case-construction-2.mp4',
          poster: './img/buildCase/guitar/construction-cover-2.png',
          text: 'guitar-stepText-2'
        }
      },
      //结构搭建-3
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'guitar_case-construction-3.mp4',
          poster: './img/buildCase/guitar/construction-cover-3.png',
          text: 'guitar-stepText-3'
        }
      },
      //结构搭建-4
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'guitar_case-construction-4.mp4',
          poster: './img/buildCase/guitar/construction-cover-4.png',
          text: 'guitar-stepText-4'
        }
      },
    ],
  },
  {
    name: 'dj-disc',
    id: '8',
    coverImg: './img/buildCase/disc/cover-thumbnail.png',
    difficultyIndex: 2,
    directoryName: 'disc',
    stepLists:[
      //引导视频
      {
        type: 'preVideo',
        title: 'case-instruction',
        category: 'case-instruction',
        data:{
          src: directory + 'disc_pre-video.mp4',
          radarSrc: './img/buildCase/disc/icon-radar.png',
          poster: './img/buildCase/disc/case-pre-cover.png',
          text: 'disc-introduction'
        }
      },
      //原理展示小标题
      {
        type: 'subTitle',
        category: 'case-principle',
        title: 'case-principle',
        sequenceNumber: '01',
        data:{
          src: './img/buildCase/icon-case-subtitle-part.png',
        }
      },
      //原理展示1安装模块视频
      {
        type: 'video',
        category: 'case-principle',
        title: '',
        data: {
          src: directory + 'disc_principle-1.mp4',
          poster: './img/buildCase/disc/principle-cover-1.png',
          text: 'disc-principleText-1'
        }
      },
      //结构搭建小标题
      {
        type: 'subTitle',
        category: 'case-construction',
        title: 'case-construction',
        sequenceNumber: '02',
        data:{
          src: './img/buildCase/icon-case-subtitle-structure.png',
        }
      },
      //物料清单列表1
      {
        type: 'partList',
        category: 'case-construction',
        title: 'case-part-list',
        data:{
          src: './img/buildCase/disc/icon-partList-1.png',
          partList:['disc-part-1','disc-part-2', 'disc-part-3', 'disc-part-4', 'disc-part-5', 'disc-part-6',]
        }
      },
      //结构搭建-1
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'disc_case-construction-1.mp4',
          poster: './img/buildCase/disc/construction-cover-1.png',
          text: 'disc-stepText-1'
        }
      },
      //结构搭建-2
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'disc_case-construction-2.mp4',
          poster: './img/buildCase/disc/construction-cover-2.png',
          text: 'disc-stepText-2'
        }
      },
      //结构搭建-3
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'disc_case-construction-3.mp4',
          poster: './img/buildCase/disc/construction-cover-3.png',
          text: 'disc-stepText-3'
        }
      },
    ],
  },
  {
    name: 'dinosaur-bite',
    id: '9',
    coverImg: './img/buildCase/dinosaur/cover-thumbnail.png',
    difficultyIndex: 3,
    directoryName: 'dinosaur',
    stepLists:[
      //引导视频
      {
        type: 'preVideo',
        title: 'case-instruction',
        category: 'case-instruction',
        data:{
          src: directory + 'dinosaur_pre-video.mp4',
          radarSrc: './img/buildCase/dinosaur/icon-radar.png',
          poster: './img/buildCase/dinosaur/case-pre-cover.png',
          text: 'dinosaur-introduction'
        }
      },
      //原理展示小标题
      {
        type: 'subTitle',
        category: 'case-principle',
        title: 'case-principle',
        sequenceNumber: '01',
        data:{
          src: './img/buildCase/icon-case-subtitle-part.png',
        }
      },
      //原理展示1安装模块视频
      {
        type: 'video',
        category: 'case-principle',
        title: '',
        data: {
          src: directory + 'dinosaur_principle-1.mp4',
          poster: './img/buildCase/dinosaur/principle-cover-1.png',
          text: 'dinosaur-principleText-1'
        }
      },
      //结构搭建小标题
      {
        type: 'subTitle',
        category: 'case-construction',
        title: 'case-construction',
        sequenceNumber: '02',
        data:{
          src: './img/buildCase/icon-case-subtitle-structure.png',
        }
      },
      //物料清单列表1
      {
        type: 'partList',
        category: 'case-construction',
        title: 'case-part-list',
        data:{
          src: './img/buildCase/dinosaur/icon-partList-1.png',
          partList:['dinosaur-part-1','dinosaur-part-2', 'dinosaur-part-3', 'dinosaur-part-4', 'dinosaur-part-5', 'dinosaur-part-6','dinosaur-part-7','dinosaur-part-8','dinosaur-part-9',]
        }
      },
      //结构搭建-1
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'dinosaur_case-construction-1.mp4',
          poster: './img/buildCase/dinosaur/construction-cover-1.png',
          text: 'dinosaur-stepText-1'
        }
      },
      //结构搭建-2
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'dinosaur_case-construction-2.mp4',
          poster: './img/buildCase/dinosaur/construction-cover-2.png',
          text: 'dinosaur-stepText-2'
        }
      },
      //结构搭建-3
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'dinosaur_case-construction-3.mp4',
          poster: './img/buildCase/dinosaur/construction-cover-3.png',
          text: 'dinosaur-stepText-3'
        }
      },
      //结构搭建-4
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'dinosaur_case-construction-4.mp4',
          poster: './img/buildCase/dinosaur/construction-cover-4.png',
          text: 'dinosaur-stepText-4'
        }
      },
      //结构搭建-5
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'dinosaur_case-construction-5.mp4',
          poster: './img/buildCase/dinosaur/construction-cover-5.png',
          text: 'dinosaur-stepText-5'
        }
      },
    ],
  },
  {
    name: 'shadow-palette',
    id: '10',
    coverImg: './img/buildCase/palette/cover-thumbnail.png',
    difficultyIndex: 2,
    directoryName: 'palette',
    stepLists:[
      //引导视频
      {
        type: 'preVideo',
        title: 'case-instruction',
        category: 'case-instruction',
        data:{
          src: directory + 'palette_pre-video.mp4',
          radarSrc: './img/buildCase/palette/icon-radar.png',
          poster: './img/buildCase/palette/case-pre-cover.png',
          text: 'palette-introduction'
        }
      },
      //原理展示小标题
      {
        type: 'subTitle',
        category: 'case-principle',
        title: 'case-principle',
        sequenceNumber: '01',
        data:{
          src: './img/buildCase/icon-case-subtitle-part.png',
        }
      },
      //原理展示1安装模块视频
      {
        type: 'video',
        category: 'case-principle',
        title: '',
        data: {
          src: directory + 'palette_principle-1.mp4',
          poster: './img/buildCase/palette/principle-cover-1.png',
          text: 'palette-principleText-1'
        }
      },
      //结构搭建小标题
      {
        type: 'subTitle',
        category: 'case-construction',
        title: 'case-construction',
        sequenceNumber: '02',
        data:{
          src: './img/buildCase/icon-case-subtitle-structure.png',
        }
      },
      //物料清单列表1
      {
        type: 'partList',
        category: 'case-construction',
        title: 'case-part-list',
        data:{
          src: './img/buildCase/palette/icon-partList-1.png',
          partList:['palette-part-1','palette-part-2', 'palette-part-3', 'palette-part-4', 'palette-part-5', 'palette-part-6','palette-part-7','palette-part-8',]
        }
      },
      //结构搭建-1
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'palette_case-construction-1.mp4',
          poster: './img/buildCase/palette/construction-cover-1.png',
          text: 'palette-stepText-1'
        }
      },
      //结构搭建-2
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'palette_case-construction-2.mp4',
          poster: './img/buildCase/palette/construction-cover-2.png',
          text: 'palette-stepText-2'
        }
      },
      //结构搭建-3
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'palette_case-construction-3.mp4',
          poster: './img/buildCase/palette/construction-cover-3.png',
          text: 'palette-stepText-3'
        }
      },
      //结构搭建-4
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'palette_case-construction-4.mp4',
          poster: './img/buildCase/palette/construction-cover-4.png',
          text: 'palette-stepText-4'
        }
      },
    ],
  },
  {
    name: 'defuse-bomb',
    id: '11',
    coverImg: './img/buildCase/bomb/cover-thumbnail.png',
    difficultyIndex: 3,
    directoryName: 'bomb',
    stepLists:[
      //引导视频
      {
        type: 'preVideo',
        title: 'case-instruction',
        category: 'case-instruction',
        data:{
          src: directory + 'bomb_pre-video.mp4',
          radarSrc: './img/buildCase/bomb/icon-radar.png',
          poster: './img/buildCase/bomb/case-pre-cover.png',
          text: 'bomb-introduction'
        }
      },
      //原理展示小标题
      {
        type: 'subTitle',
        category: 'case-principle',
        title: 'case-principle',
        sequenceNumber: '01',
        data:{
          src: './img/buildCase/icon-case-subtitle-part.png',
        }
      },
      //原理展示1安装模块视频
      {
        type: 'video',
        category: 'case-principle',
        title: '',
        data: {
          src: directory + 'bomb_principle-1.mp4',
          poster: './img/buildCase/bomb/principle-cover-1.png',
          text: 'bomb-principleText-1'
        }
      },
      //原理展示2安装模块视频
      {
        type: 'video',
        category: 'case-principle',
        title: '',
        data: {
          src: directory + 'bomb_principle-2.mp4',
          poster: './img/buildCase/bomb/principle-cover-2.png',
          text: 'bomb-principleText-2'
        }
      },
      //结构搭建小标题
      {
        type: 'subTitle',
        category: 'case-construction',
        title: 'case-construction',
        sequenceNumber: '02',
        data:{
          src: './img/buildCase/icon-case-subtitle-structure.png',
        }
      },
      //物料清单列表1
      {
        type: 'partList',
        category: 'case-construction',
        title: 'case-part-list',
        data:{
          src: './img/buildCase/bomb/icon-partList-1.png',
          partList:['bomb-part-1','bomb-part-2', 'bomb-part-3', 'bomb-part-4', 'bomb-part-5', 'bomb-part-6','bomb-part-7','bomb-part-8','bomb-part-9',]
        }
      },
      //结构搭建-1
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'bomb_case-construction-1.mp4',
          poster: './img/buildCase/bomb/construction-cover-1.png',
          text: 'bomb-stepText-1'
        }
      },
      //结构搭建-2
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'bomb_case-construction-2.mp4',
          poster: './img/buildCase/bomb/construction-cover-2.png',
          text: 'bomb-stepText-2'
        }
      },
      //结构搭建-3
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'bomb_case-construction-3.mp4',
          poster: './img/buildCase/bomb/construction-cover-3.png',
          text: 'bomb-stepText-3'
        }
      },
      //结构搭建-4
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'bomb_case-construction-4.mp4',
          poster: './img/buildCase/bomb/construction-cover-4.png',
          text: 'bomb-stepText-4'
        }
      },
      //结构搭建-5
      {
        type: 'video',
        category: 'case-construction',
        title: '',
        data: {
          src: directory + 'bomb_case-construction-5.mp4',
          poster: './img/buildCase/bomb/construction-cover-5.png',
          text: 'bomb-stepText-5'
        }
      },
    ],
  },
];

export default BuildCaseData;

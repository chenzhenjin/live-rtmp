import React from 'react'
import Hls from 'hls.js'
import './live.scss'
export default class Live extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hls: ''
    }
    this.videoRef = React.createRef()
  }
  componentDidMount() {
    this.getStream()
    console.log('componentDidMount', this.videoRef)
  }

  getStream() {
    if (Hls.isSupported()) {
      this.hls = new Hls();
      this.hls.loadSource('https://bitdash-a.akamaihd.net/content/sintel/hls/video/250kbit.m3u8');
      this.hls.attachMedia(this.videoRef.current);
      this.videoRef.current.addEventListener('canplay', ()=>{
        console.log('能开始播放')
        this.videoRef.current.play();
      })
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('加载成功');
      });
      this.hls.on(Hls.Events.ERROR, (event, data) => {
        // console.log(event, data);
        // 监听出错事件
        console.log('加载失败');
      });
    }
  }

  render() {
    return <div>
      <div>现场直播中</div>
      <div className="live">
        <video className="live-video" ref={this.videoRef} controls></video>
      </div>
    </div>
  }
}
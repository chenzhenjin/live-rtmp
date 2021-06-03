import React from 'react'
import { When, Case } from './jugement.jsx'
import './home.scss'
import testModule from './test.module.scss'
import { Carousel, Spin } from 'antd';
let Hls = require('hls.js')

export default class Live extends React.Component {
  constructor(props) {
    super(props)
    console.log('testModule', testModule)
    this.state = {
      testUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      liveUrl: 'http://47.100.199.95:8080/hls/app.m3u8',
      hls: '',
      fullScreen: false,
      showPlayIcon: false,
      imgList: [
        require('@/assets/img/1.jpg'),
        require('@/assets/img/2.jpg'),
        require('@/assets/img/3.jpg'),
        require('@/assets/img/4.jpg'),
        require('@/assets/img/5.jpg'),
        require('@/assets/img/6.jpg'),
      ],
      loading: true,
      testBol: true
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
      this.hls.loadSource(this.state.liveUrl);
      this.hls.attachMedia(this.videoRef.current);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log('加载成功');
        this.videoRef.current.addEventListener('canplaythrough', () => {
          console.log('加载完成')
          this.setState({
            loading: false
          })
          try {
            this.videoRef.current.play();
            this.videoRef.current.muted = false
          } catch (err) {
            console.log('捕捉错误重新加载')
            window.location.reload()
          }
        })
        this.videoRef.current.addEventListener('play', () => {
          this.setState({
            showPlayIcon: false
          })
        })
        this.videoRef.current.addEventListener('pause', () => {

          this.setState({
            showPlayIcon: true
          })
        })
      });
      this.hls.on(Hls.Events.ERROR, (event, data) => {
        // console.log(event, data);
        // 监听出错事件
        console.log('加载失败');
      });
    }
  }
  changeFullScreen() {
    this.setState({
      fullScreen: !this.state.fullScreen
    })
  }
  caseClick(val) {
    console.log('receive', val)
  }
  render() {
    return <div className="live-main">
      {/* <div className="live-top">
        <marquee>欢迎各位来到陈振龙--许思敏喜事现场，正在为您实时直播中</marquee>
        <Spin spinning={this.state.loading} >
          <p className="live-top-p">{this.state.loading ? '直播连接中' : '观看中'}</p>
        </Spin>
      </div> */}
      <div>
        {
          this.state.testBol ? <span>测试区域</span> : <span>不要测试区域</span>
        }
        <When>
          <Case if={this.state.testBol} click={(val) => this.caseClick(val)}>插槽1</Case>
          <Case elseif={!this.state.testBol} click={(val) => this.caseClick(val)}>插槽2</Case>
          <Case else click={(val) => this.caseClick(val)}>插槽3</Case>
        </When>
      </div>
      <div className={this.state.fullScreen ? 'live live-full' : 'live'}>
        <div className={this.state.fullScreen ? 'live-rorate' : ''}>
          <div className="video-contorl">
            {
              this.state.showPlayIcon &&
              <div className="video-play" onClick={() => { this.videoRef.current.play() }}>
                <i className="iconfont iconpause"></i>
              </div>
            }
            <div className="video-flexible--div" onClick={() => { this.changeFullScreen() }}>
              {
                this.state.fullScreen ? <i className="iconfont iconsuoxiao"></i>
                  : <i className="iconfont iconfangda1"></i>
              }
            </div>
          </div>
          <video
            // src="//mv.eastday.com/vvideo/20200226/20200226195747659866955_1.mp4"
            className="live-video"
            // ref={this.videoRef} controls muted>
            ref={this.videoRef} muted>
          </video>
        </div>
      </div>
      <div className="photos-tips">
        <p>我来爆照，前方高能，请上拉</p>
        <p>哈哈哈</p>
      </div>
      <div className={'live-photos ' + testModule.red}>
        <span>点击白色的按钮，可切换图片</span>
        <Carousel autoplay>
          {
            this.state.imgList.map((item, i) => {
              return <div key={i}>
                <img src={item} alt="甜蜜照" />
              </div>
            })
          }
        </Carousel>
      </div>
      <div className="waiting-tips">
        <p>各位亲朋好友们好，由于此次服务器宽带低、和本人开发时间和能力有限，
          延时比较严重，建议观看能耐心等待，可能有时需要一分钟</p>
        <p>如果懂得直播技术，可以跟我讨论下，怎么优化下直播延迟，
          对于其他功能不开发，最近熬夜有点严重</p>
      </div>
    </div>
  }
}
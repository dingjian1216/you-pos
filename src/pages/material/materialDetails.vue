<template>
  <div class="materialDetails" style="background-color: white;">
    <div class="name">{{data.title}}</div>
    <div class="demo1-video" v-if="data.video_src != 0" style="width: 100%">
      <video id="myVideo" class="video-js vjs-default-skin vjs-big-play-centered vjs-fluid">
      </video>
    </div>
    <div class="content" v-html="data.content"></div>
    <p class="time">{{data.create_time | formatDate}}</p>
  </div>
</template>
<script>
  import * as apiHttp from '../../api/index'
  import { formatDate } from '../../plugin/data'
  export default {
    data () {
      return {
        data: '',
        video_stuff: {
          video_src: '',
          video_cover: ''

        }
      }
    },
    methods: {
      initVideo () {
        // 初始化视频方法
        this.$nextTick(() => {
          let myPlayer = this.$video(myVideo, {
            // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
            controls: true,
            sources:[
              {
                src: video_stuff.video_src,
                type: 'video/mp4'
              }
            ],
            // 自动播放属性,muted:静音播放
            autoplay: false,
            // 建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
            preload: 'auto'
            // 设置视频播放器的显示宽度（以像素为单位）
          })
        })
      },
      loadVideo(){
        apiHttp.getKyDetail(this.$route.query.ky_id).then(res => {
          if (res.code == 1) {
            let that = this
            that.data = res.data
            if (res.data.video_src != 0){
              let myPlayer = this.$video(myVideo, {
                // 确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                controls: true,
                poster: that.data.video_cover,
                sources: [
                  {
                    src: that.data.video_src,
                    type: 'video/mp4'
                  }
                ],
                // 自动播放属性,muted:静音播放
                autoplay: 'muted',
                // 建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                preload: 'auto'
                // 设置视频播放器的显示宽度（以像素为单位）
              })
            }
          }
        })
      }
    },
    filters: {
      formatDate (time) {
        time = time * 1000
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    mounted () {
      /*    apiHttp.getKyDetail(this.$route.query.ky_id).then(res => {
            if (res.code == 1) {
              this.data = res.data
              // this.$set(this.data, 'video_stuff', res.data.video_src)
              // this.$set(this.data, 'video_cover', res.data.video_cover)
              this.$refs.video.src = res.data.video_src
              this.$set(this.video_stuff, 'video_src', res.data.video_src)
              this.$set(this.video_stuff, 'video_cover', res.data.video_cover)
              this.initVideo()
            }
          })*/
      this.loadVideo()
    }
  }
</script>
<style lang="less" scoped>
  .materialDetails{
    height: auto;
    padding: 0.3rem;
    .name{
      text-align: center;
      font-size: 0.36rem;
    }
    .time{
      color: #757575
    }
    .content{
      margin-top: 0.2rem;
    }
  }
</style>

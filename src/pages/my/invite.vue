<template>
    <div class="invite">
      <div class="box">
        <div class="swiperBox">
          <swiper :options="swiperOption" class="swiper">
            <swiper-slide v-for="(item, index) in imgs" :key="index" :class="{active:index === 0, shadow:true}">
              <img :src="link + item" alt="" @click="showBig(index)">
            </swiper-slide>
          </swiper>
        </div>
     
      </div>
      <div class="footer" :style="{bottom: h}">
        <p @click="keepImgs()">保存当前海报</p>
        <p @click="copy()">复制邀请链接</p>
        <!-- <p @click="showShare(1)">分享邀请链接</p>
        <p @click="showShare(2)">分享邀请海报</p> -->
      </div>
      <!-- <div class="share_to" v-transfer-dom>
        <div class="weui-mask" @click="showToast = false" v-if="showToast"  ></div>
        <div class="classBox"  v-if="showToast"  >
          <div><img src="../../assets/img/home/goods/wechat.png" alt="" @click="shareFri(1)"><p>微信好友</p></div>
          <div><img src="../../assets/img/home/goods/friend_circle.png" alt="" @click="shareFri(2)"><p>朋友圈</p></div>
          <div><img src="../../assets/img/home/goods/qq.png" alt="" @click="shareQq()"><p>QQ</p></div>
        </div>
      </div> -->

    </div>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import {XDialog, TransferDomDirective as TransferDom} from 'vux'
import * as apiHttp from "../../api/index";
import store from "../../store";
let imgIndex = 0
export default {
  name: 'invite',
  components: {
    swiper,
    swiperSlide,
    XDialog
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      imgs: [],
      link: this.link,
      index: 0,
      showToast: false,
      h: 0 + 'px',
      swiperOption: {
        effect: 'coverflow',
        width: 220,
        coverflowEffect: {
          rotate: 2,
          stretch: -15,
          depth: 80,
          modifier: 2,
          slideShadows: false
        },
        on: {
          transitionEnd: function () {
            imgIndex = this.activeIndex
          },
          sliderMove: function (event) {
            window.canRightSlipBack = false
          },
          touchEnd: function (event) {
            setTimeout(() => {
              window.canRightSlipBack = true
            }, 600)
          }
        }
      },
      downImgIndex: 0,
      type: '',
      data: ''
    }
  },
  beforeRouteLeave (to, from, next) {
    this.showToast = false
    next()
  },
  methods: {
    hideBig () {
    },
    showBig (index) {
      this.swiperOption1.initialSlide = index
      this.downImgIndex = index
    },

    shareFri (type) {
      let that = this
      this.showToast = false
      let way = type === 1 ? 'session' : 'timeline'
      if (that.type === 1) {
        let format = 'share' + new Date().getTime() + '.png'
        api.download({
          url: that.data.appDownLogo,
          savePath: 'fs://' + format,
          encode: false,
          report: false,
          cache: false,
          allowResume: true
        }, function (ret, err) {
          var wx = api.require('wx')
          wx.shareWebpage({
            scene: way,
            title: that.data.appDownTitle,
            description: that.data.appDownDesc,
            thumb: 'fs://' + format,
            contentUrl: that.data.downloadUrl
          }, function (ret, err) {
            if (ret.status) {
              alert('分享成功')
            } else {
              alert(err.code)
            }
          })
        })
      } else {
        that.$vux.loading.show({
          text: '加载中'
        })
        let format = 'share' + new Date().getTime() + '.jpg'
        api.download({
          url: that.imgs[imgIndex],
          savePath: 'fs://' + format,
          encode: false,
          report: false,
          cache: false,
          allowResume: true
        }, function (ret, err) {
          that.$vux.loading.hide()
          let wx = api.require('wx')
          wx.shareImage({
            scene: way,
            contentUrl: 'fs://' + format
          }, function (ret, err) {
          })
        })
      }
    },
    shareQq () {
      let that = this
      this.showToast = false
      if (that.type === 1) {
        let sharedModule = api.require('shareAction')
        sharedModule.share({
          text: that.data.downloadUrl,
          type: 'text'
        })
      } else {
        let format = 'share' + new Date().getTime() + '.jpg'
        api.download({
          url: that.imgs[imgIndex],
          savePath: 'fs://' + format,
          encode: false,
          report: false,
          cache: false,
          allowResume: true
        }, function (ret, err) {
          that.$vux.loading.hide()
          if (ret.state === 1) {
            let sharedModule = api.require('shareAction')
            sharedModule.share({
              images: ['fs://' + format],
              type: 'image'
            })
          }
        })
      }
    },
    showShare (type) {
      this.type = type
      this.showToast = true
    },
    getSwiper () {
      let userInfo = store.state.user.userInfo
      console.log(userInfo)
      let link = this.link + "/home/index/register/user_code/"+ userInfo.username
      apiHttp.getMask(link).then(res => {
        if (res.code === 1) {
          this.imgs = res.data
        }
      })
    },
    keepImgs () {
      const that = this
      let format = 'share' + new Date().getTime() + '.jpg'
      that.$vux.loading.show({
        text: '保存中...'
      })
      api.download({
        url: that.link +  that.imgs[imgIndex],
        savePath: 'fs://' + format,
        report: true,
        cache: true,
        allowResume: true
      }, function (ret, err) {
        if (ret.state === 1) {
          api.saveMediaToAlbum({
            path: 'fs://' + format
          }, function (ret, err) {
            if (ret && ret.status) {
              that.$vux.loading.hide()
              console.log('相册成功：' + JSON.stringify(ret))
              that.$vux.toast.text('保存成功')
            } else {
              console.log('相册失败：' + JSON.stringify(err))
            }
          })
          console.log('成功：' + JSON.stringify(ret))
        } else {
          that.$vux.loading.hide()
          that.$vux.toast.text('保存失败')
          console.log('失败：' + JSON.stringify(err))
        }
      })
    },
    copy(){
     let that = this;
     let userInfo = store.state.user.userInfo
     let text = this.link + "/home/index/register/user_code/"+ userInfo.username
      let clipBoard = api.require("clipBoard");
      clipBoard.set(
        {
          value: text
        },
        function(ret, err) {
          if (ret) {
            that.$vux.toast.text("复制成功");
          } else {
            that.$vux.toast.text("请重试");
          }
        }
      );
    },
    share () {
      let that = this
      that.$vux.loading.show({
        text: '加载中'
      })
      let format = 'share' + new Date().getTime() + '.jpg'

      api.download({
        url: that.imgs[imgIndex],
        savePath: 'fs://' + format,
        encode: false,
        report: false,
        cache: false,
        allowResume: true
      }, function (ret, err) {
        that.$vux.loading.hide()
        if (ret.state === 1) {
          let sharedModule = api.require('shareAction')
          sharedModule.share({
            images: ['fs://' + format],
            type: 'image'
          })
        } else {
          that.$vux.loading.hide()
          that.$vux.toast.text('保存失败')
          console.log('失败：' + JSON.stringify(err))
        }
      })
    }
  },
  mounted () {
    this.getSwiper()
  },
  activated () {
    this.getSwiper()
  }
}
</script>
<style lang="less">
  .my-bullet{
    border-radius: 5px;
    width: 10px;
    height: 10px;
    margin: 0 .1rem;
    display: inline-block;
    background-color: #fff;
    border: 1px solid #ff7512;
  }
  .my-bullet-active{
    background: #ff7512;
  }
  .invite .swiper-pagination{
    bottom: -1.1rem;
  }
.invite{
  .vux-indicator-right{
    left: 0;
    right: 0;
    text-align: center;
    font-size: .3rem;
    a{
      float: none !important;
      font-size: .3rem;
    }
  }
  .swiper-pagination{
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    li{
      margin: 0 6px;
    }
    .swiper-pagination-bullet{
      border: 1px solid red;
      opacity: 1;
      background-color: #fff;
    }
    .swiper-pagination-bullet-active{
      background-color: red;
    }
  }
}
  .share_to{
    background: #fff;
    position: relative;
    width: 100%;
    .classBox{
      border-top: 1px solid #f9f6f6;
      z-index: 100000;
      position: fixed;
      bottom: 0;
      height: 2rem;
      width: 7.5rem;
      display: flex;
      background: #fff;
      border-radius: 0;
      div{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img{
          width: .9rem;
          height: .9rem;
        }
        p{
          margin-top: .2rem;
          color: #666;
          font-size: .26rem;
        }
      }
    }
  }
  .bigSwiper{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1000;
    .weui-mask{
      background: #000;
    }
    .swiperList{
      z-index: 1001;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      .swiper-slide{
        text-align: center;
        display: flex;
        align-items: center;
        img{
          width: 100%;
        }
      }
    }
    .swiper-pagination{
      z-index: 10000;
      bottom: 30px;
      width: 100%;
      .swiper-pagination-bullet{
        background: #999999;
        margin: 0 5px;
      }
      .swiper-pagination-bullet-active{
        background: #FF5847;
      }
    }
    .downLoad{
      position: absolute;
      right: 0;
      bottom: 0;
      width: 0.5rem !important;
      z-index: 10001;
      padding: 0.4rem;
    }
  }
</style>
<style scoped lang="less">
  .active{
    margin-left: 1.4rem;
  }
  .shadow{
    box-shadow:0 21px 36px -3px #EAEAEA;;
  }
  .swiperBox{
    position: relative;
    margin-bottom: 0.5rem;
    margin-top: 1rem;
    .swiper{
      margin-top: 0.2rem;
      margin-bottom: 0.4rem;
    }
    .swiper-pagination{
      width: 200px;
    }
    .swiper-slide{
      img{
        float: left;
      }
    }
  }
.invite{
  background: #fff;
  height: 100%;
  position: relative;
  .rules{
    padding: 0 .2rem;
    img{
      max-width: 100% !important;
    }
  }
  .box{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    bottom: 1.3rem;
    overflow-y: auto;
  }
  img{
    width: 100%;
  }
  .footer{
    border-top: 1px solid #f9f6f6;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-sizing: border-box;
    padding: 0 .2rem;
    span{
      display: inline-block;
      color: #666;
      img{
        width: .28rem;
        height: .28rem;
        margin-right: .1rem;
      }
    }
    p{
      /*color: #fff;*/
      display: flex;
      align-items: center;
      font-size: .28rem;
      height: .8rem;
      line-height: .8rem;
      color: #fff;
      padding: 0 .3rem;
      border-radius: .4rem;
      img{
        width: .34rem;
        margin-right: .1rem;
      }
    }
    p:first-of-type{
      background: url("../../assets/img/my/save.png");
    }
    p:last-of-type{
      background: url("../../assets/img/my/sharebg.png");
    }
  }
  .rule{
    font-size: .24rem;
    color: #666;
    line-height: .36rem;
    padding: 0 .3rem;
  }
  .t{
    margin: .2rem 0;
    font-size: .3rem;
    text-align: center;
    position: relative;
    img{
      width: .32rem;
      height: .27rem;
      margin-right: .2rem;
    }
    span{
      font-size: .3rem;
      color: #666;
    }
  }
  .t:before{
    content: '';
    position: absolute;
    left: 1.49rem;
    top: .2rem;
    width: .84rem;
    border-top: 1px solid #666666;
    transform-origin: 0 0;
    transform: scaleY(.5);
  }
  .t:after{
    content: '';
    position: absolute;
    right: 1.49rem;
    top: .2rem;
    width: .84rem;
    border-top: 1px solid #666666;
    transform-origin: 0 0;
    transform: scaleY(.5);
  }
}
</style>

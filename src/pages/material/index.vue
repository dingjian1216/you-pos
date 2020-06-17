<template>
  <div class='material'>
    <div class="head" :style="{paddingTop: statusH + 'rem'}">

    </div>
    <div class='materialBox' :style="{marginTop:statusH + 'rem'}">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <swiper class="banner_list" :options="swiperOption" v-if="banner.length > 0">
          <swiper-slide class="allBox" v-for="(item,index) in banner" :key="index">
            <img :src="item.cover" alt class="bg" />
          </swiper-slide>
        </swiper>
        <div class="items" >
          <div class="item" v-for="(item,index) in cate" :key="index" :style="{backgroundImage: 'url(' + item.cover + ')'}">
            <div @click="jumpTo({name: 'plist',query:{pid: item.id}})">{{item.title}}</div>
          </div>
        </div>
        <template v-for = "(item,index) in list">
          <div v-if="item.video_src == 0" class = 'materialList' :key='index' @click="jumpTo({name: 'materialDetails',query:{ky_id: item.id}})">
            <img v-lazy='item.cover' class='cover'>
            <div class='materialMsg' >
              <div class='name'>{{item.title}}</div>
              <div>{{item.abstract}}</div>
              <div class='time_read'>
                <div>
                  <svg t="1591964972928" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2802" width="10" height="10"><path d="M13.141333 511.973744a498.871795 498.871795 0 1 1 498.871795 498.871794 499.34441 499.34441 0 0 1-498.871795-498.871794z m52.512821 0a446.358974 446.358974 0 1 0 446.358974-446.358975 446.884103 446.884103 0 0 0-446.358974 446.358975z m408.260923 105.918359a28.882051 28.882051 0 0 1-28.882051-28.882052V197.920821c0.997744 0 46.73641-0.341333 57.764102 0v362.338461h270.441026v57.764103z" p-id="2803" fill="#dbdbdb"></path></svg>
                  {{item.create_time | formatDate}}
                </div>
                <div>
                  <svg t="1591965144162" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5425" width="10" height="10"><path d="M515.2 224c-307.2 0-492.8 313.6-492.8 313.6s214.4 304 492.8 304 492.8-304 492.8-304S822.4 224 515.2 224zM832 652.8c-102.4 86.4-211.2 140.8-320 140.8s-217.6-51.2-320-140.8c-35.2-32-70.4-64-99.2-99.2-6.4-6.4-9.6-12.8-16-19.2 3.2-6.4 9.6-12.8 12.8-19.2 25.6-35.2 57.6-70.4 92.8-102.4 99.2-89.6 208-144 329.6-144s230.4 54.4 329.6 144c35.2 32 64 67.2 92.8 102.4 3.2 6.4 9.6 12.8 12.8 19.2-3.2 6.4-9.6 12.8-16 19.2C902.4 585.6 870.4 620.8 832 652.8z" p-id="5426" fill="#cdcdcd"></path><path d="M512 345.6c-96 0-169.6 76.8-169.6 169.6 0 96 76.8 169.6 169.6 169.6 96 0 169.6-76.8 169.6-169.6C681.6 422.4 604.8 345.6 512 345.6zM512 640c-67.2 0-121.6-54.4-121.6-121.6 0-67.2 54.4-121.6 121.6-121.6 67.2 0 121.6 54.4 121.6 121.6C633.6 582.4 579.2 640 512 640z" p-id="5427" fill="#cdcdcd"></path></svg>
                  {{item.view}}
                </div>
              </div>
            </div>
          </div>
          <div v-else class = 'materiaVideolList' :key='index' @click="jumpTo({name: 'materialDetails',query:{ky_id: item.id}})">
            <div class='materialVieoMsg' >
              <div class='videoName'>{{item.title}}</div>
              <div class='videoCover'>
                <img v-lazy='item.video_cover' >
              </div>
              <div class='time_read'>
                <div>
                  <svg t="1591964972928" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2802" width="10" height="10"><path d="M13.141333 511.973744a498.871795 498.871795 0 1 1 498.871795 498.871794 499.34441 499.34441 0 0 1-498.871795-498.871794z m52.512821 0a446.358974 446.358974 0 1 0 446.358974-446.358975 446.884103 446.884103 0 0 0-446.358974 446.358975z m408.260923 105.918359a28.882051 28.882051 0 0 1-28.882051-28.882052V197.920821c0.997744 0 46.73641-0.341333 57.764102 0v362.338461h270.441026v57.764103z" p-id="2803" fill="#dbdbdb"></path></svg>
                  {{item.create_time | formatDate}}
                </div>
                <div>
                  <svg t="1591965144162" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5425" width="10" height="10"><path d="M515.2 224c-307.2 0-492.8 313.6-492.8 313.6s214.4 304 492.8 304 492.8-304 492.8-304S822.4 224 515.2 224zM832 652.8c-102.4 86.4-211.2 140.8-320 140.8s-217.6-51.2-320-140.8c-35.2-32-70.4-64-99.2-99.2-6.4-6.4-9.6-12.8-16-19.2 3.2-6.4 9.6-12.8 12.8-19.2 25.6-35.2 57.6-70.4 92.8-102.4 99.2-89.6 208-144 329.6-144s230.4 54.4 329.6 144c35.2 32 64 67.2 92.8 102.4 3.2 6.4 9.6 12.8 12.8 19.2-3.2 6.4-9.6 12.8-16 19.2C902.4 585.6 870.4 620.8 832 652.8z" p-id="5426" fill="#cdcdcd"></path><path d="M512 345.6c-96 0-169.6 76.8-169.6 169.6 0 96 76.8 169.6 169.6 169.6 96 0 169.6-76.8 169.6-169.6C681.6 422.4 604.8 345.6 512 345.6zM512 640c-67.2 0-121.6-54.4-121.6-121.6 0-67.2 54.4-121.6 121.6-121.6 67.2 0 121.6 54.4 121.6 121.6C633.6 582.4 579.2 640 512 640z" p-id="5427" fill="#cdcdcd"></path></svg>
                  {{item.view}}
                </div>
              </div>
            </div>
          </div>
        </template>
      </mescroll-vue>
    </div>
    <div id='d0'></div>
  </div>
</template>
<script>
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import { Popup, Popover, TransferDom } from 'vux'
  import * as apiHttp from '../../api/index'
  import { formatDate } from '../../plugin/data'
  import MescrollVue from 'mescroll.js/mescroll.vue'
  export default {
    directives: {
      TransferDom
    },
    components: {
      swiper,
      swiperSlide,
      Popup,
      Popover,
      MescrollVue
    },
    data () {
      return {
        keyword: '',
        statusH: '',
        typeName: '全部',
        type: this.$route.query.pid,
        list: [],
        banner: [],
        cate: [],
        mescroll: null,
        swiperOption: {
          loop: true,
          spaceBetween: 5,
          centeredSlides: true,
          initialSlide: 1,
          pagination: {
            el: '.swiper-pagination'
          }
        },
        mescrollDown: {
          auto: false,
          callback: this.refresh
        },
        mescrollUp: {
          callback: this.upCallback,
          page: {
            num: 0
          },
          htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
          noMoreSize: 2,
          empty: {
            warpId: 'd0',
            icon: './static/img/kong.png',
            tip: '暂无相关数据~'
          }
        },
        dataList: [],
        lastScrollTop: 0, // 路由切换时滚动条的位置
        lastBounce: null, // 路由切换时是否禁止ios回弹
        jiaocheng: {
          backgroundImage: 'url(' + require('../../assets/img/items/home_icon_jiaocheng.png') + ')'
        },
        shiyong: {
          backgroundImage: 'url(' + require('../../assets/img/items/home_icon_shiyong.png') + ')'
        },
        quanyi: {
          backgroundImage: 'url(' + require('../../assets/img/items/home_icon_quanyi.png') + ')'
        },
        jingyan: {
          backgroundImage: 'url(' + require('../../assets/img/items/home_icon_jingyan.png') + ')'
        },
        zixun: {
          backgroundImage: 'url(' + require('../../assets/img/items/home_icon_zixun.png') + ')'
        },
        question: {
          backgroundImage: 'url(' + require('../../assets/img/items/home_icon_question.png') + ')'
        }
      }
    },
    //  inject: ['reload'],
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (vm.mescroll) {
          // 滚动到之前列表的位置
          if (vm.lastScrollTop) {
            vm.mescroll.setScrollTop(vm.lastScrollTop)
            setTimeout(() => {
              // 需延时,因为setScrollTop内部会触发onScroll,可能会渐显回到顶部按钮
              vm.mescroll.setTopBtnFadeDuration(0) // 设置回到顶部按钮显示时无渐显动画
            }, 16)
          }
          // 恢复到之前设置的isBounce状态
          if (vm.lastBounce != null) vm.mescroll.setBounce(vm.lastBounce)
        }
      })
    },
    beforeRouteLeave (to, from, next) {
      if (this.mescroll) {
        this.lastScrollTop = this.mescroll.getScrollTop() // 记录当前滚动条的位置
        this.mescroll.hideTopBtn(0) // 隐藏回到顶部按钮,无渐隐动画
        this.lastBounce = this.mescroll.optUp.isBounce // 记录当前是否禁止ios回弹
        this.mescroll.setBounce(true) // 允许bounce
      }
      next()
    },
    filters: {
      formatDate (time) {
        time = time * 1000
        var date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd')
      }
    },
    created () {
      let size = document.documentElement.clientWidth / 7.5
      this.statusH = api.safeArea.top / size
    },
    mounted () {
      this.getBanner()
      this.getCate()
    },
    methods: {
      search () {
        this.list = []
        this.mescrollUp.page.num = 1
        this.upCallback(this.mescrollUp.page, this.mescroll)
      },
      reflesh () {
        this.reload()
      },
      changeType (type, name) {
        this.typeName = name
        this.type = type
        this.list = []
        this.mescrollUp.page.num = 1
        this.upCallback(this.mescrollUp.page, this.mescroll)
      },
      mescrollInit (mescroll) {
        this.mescroll = mescroll
      },
      getBanner () {
        apiHttp.getKyBanner().then(res => {
          if (res.code == 1) {
            this.banner = res.data
          }
        })
      },
      getCate () {
        apiHttp.getCate().then(res => {
          if (res.code == 1) {
            this.cate = res.data
          }
        })
      },
      upCallback (page, mescroll) {
        let that = this
        apiHttp
          .getWYDataList(page.num, 10, this.$route.query.pid)
          .then(res => {
            if (res.code === 1) {
              let arr = res.data.data === '' ? [] : res.data.data
              if (page.num === 1) this.list = []
              this.list = this.list.concat(arr)
              this.$nextTick(() => {
                mescroll.endSuccess(res.data.data.length, true)
              })
              //            this.reload()
            }
          })
          .catch(e => {
            mescroll.endErr()
          })
      }
    }
  }
</script>
<style lang="less" scoped>
  .material {
    height: 100%;
    position: relative;
    background: #f5f5f5;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 0rem;
    .title {
      text-align: center;
      font-size: 0.4rem;
      color: #fff;
    }
    .items {
      width: 92%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto;
      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 0.3rem;
        width: 29%;
        min-width: 29%;
        max-width: 29%;
        height: 0.8rem;
        background-color: #525252;
        border-radius: 0.1rem;
        margin: auto;
        margin-bottom: 0.1rem;
      }
    }
    .time_read {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      color: #8e8e93;
      position: absolute;
      bottom: 0;
      width: 100%;

    }
    .icon-back {
      font-size: 0.4rem;
      color: #000;
      margin-top: 0.02rem;
    }
    .banner_list {
      position: relative;
      margin-top: 0;
      margin-left: 0.1rem;
      margin-right: 0.1rem;
      .swiper-slide {
        img {
          width: 100%;
          border-radius: 0.1rem;
        }
      }
    }
    .searchBox {
      width: 6.1rem;
      height: 0.6rem;
      border-radius: 0.3rem;
      background: #efefef;
      display: flex;
      align-items: center;
      padding-left: 0.3rem;
      .select {
        width: 1.1rem;
        display: flex;
        align-items: center;
        img {
          margin: 0 0.1rem;
          width: 0.3rem;
        }
      }
      .icon-search {
        font-size: 0.27rem;
        color: #999;
      }
      input {
        background: #efefef;
        margin-left: 0.2rem;
        width: 4.3rem;
        font-size: 0.26rem;
        color: #999;
        outline: none;
        border: none;
      }
    }
    span {
      font-size: 0.28rem;
      /*margin-right: .2rem;*/
      color: #ffffff;
    }
    .materialBox {
      position: absolute;
      top: 0rem;
      left: 0;
      right: 0;
      bottom: 0px;
      height: auto !important;
      background: #f5f5f5;
      .materialList {
        height: 1.8rem;
        margin-bottom: 0.2rem;
        padding: 0.2rem 0.3rem;
        background: #ffffff;
        overflow: hidden;
        .cover {
          width: 2.5rem;
          height: 1.8rem;
          float: left;
          margin-right: 0.2rem;
        }
        .oneList {
          margin-right: 0.2rem;
        }
        .materialMsg {
          float: left;
          display: flex;
          width: 4rem;
          flex-direction: column;
          justify-content: space-around;
          position: relative;
          height: 100%;
          .name {
            font-size: 0.32rem;
            color: #000000;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            position: absolute;
            top: 0;
          }
          .abstract {
            height: 0.88rem;
            color: #333333;
            font-size: 0.28rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .time {
            color: #757575;
            font-size: 0.26rem;
          }
        }
      }
      .materiaVideolList {
        height: 4.2rem;
        margin-bottom: 0.2rem;
        padding: 0.2rem 0.3rem;
        background: #ffffff;
        overflow: hidden;
        .videoCover {
          width: 100%;
          height: 3rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .oneList {
          margin-right: 0.2rem;
        }
        .materialVieoMsg {
          float: left;
          display: flex;
          width: 100%;
          flex-direction: column;
          justify-content: space-around;
          position: relative;
          height: 100%;
          .videoName {
            font-size: 0.32rem;
            color: #000000;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            position: absolute;
            top: 0;
          }
          .abstract {
            height: 0.88rem;
            color: #333333;
            font-size: 0.28rem;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .time {
            color: #757575;
            font-size: 0.26rem;
          }
        }
      }
    }
  }
</style>

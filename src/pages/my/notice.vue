<template>
    <div class="help notice" id="notice">
      <div class="lists">
        <mescroll-vue ref="mescroll"  :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
            <div class="box" v-for="item of list" :key="item.id" @click="jumpTo('/noticeDetail?id=' + item.id)">
              <p class="title">{{item.title}}</p>
              <p class="time">{{item.create_time}}</p>
            </div>
          <div id="empty"></div>
        </mescroll-vue>
      </div>
    </div>
</template>

<script>
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as apiHttp from "../../api/index";
export default {
  name: 'help',
  components: {
    MescrollVue
  },
  data () {
    return {
      show: false,
      list: [],
      mescroll: null,
      mescrollDown: {
        auto: false,
        use: false
      },
      mescrollUp: {
        callback: this.upCallback,
        page: {
          num: 0,
          size: 10
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        htmlLoading: '',
        noMoreSize: 5,
        empty: {
          warpId: 'empty',
          icon: './static/img/auth/kong.png',
          tip: '暂无相关数据~'
        }
      },
      dataList: [],
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null // 路由切换时是否禁止ios回弹
    }
  },
  watch: {
    type () {
      this.mescrollUp.htmlLoading = ''
      this.list = []
      this.mescrollUp.page.num = 1
      this.mescroll.resetUpScroll()
    }
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      this.mescrollUp.htmlLoading = '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>'
      apiHttp.newsList(page.num,15,1).then((res) => {
        if (res.code === 1) {
          let arr = res.data
          if (page.num === 1) this.list = []
          this.list = this.list.concat(arr)
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
          })
        } else {
          mescroll.endErr()
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="less">
@import "../../assets/less/common";
.help{
  background: #f7f7f7;
  height: 100%;
  position: relative;
  .lists{
    position: absolute;
    top: 0rem;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    background: #f7f7f7;
    .mescroll{
      padding: .2rem;
      box-sizing: border-box;
    }
    .box{
      background: #fff;
      padding: .1rem .2rem;
      border-radius: .1rem;
      margin-bottom: .2rem;
      .title{
        font-size: .3rem;
        color: #333;
        margin-bottom: .1rem;
      }
      .info{
        color: #999;
        font-size: .26rem;
        margin-bottom: .2rem;
        display: -webkit-box;
        /*! autoprefixer: off */
        -webkit-box-orient: vertical;
        /* autoprefixer: on */
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-align: center;
      }
      .time{
        font-size: .22rem;
        color: #afafaf;
      }
    }
  }
}
</style>

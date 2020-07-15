<template>
  <div id="home" ref="home">
    <div class="header" :style="{paddingTop: statusH + 'rem'}">
      <div class="searchBox">
        <i class="iconfont icon-search"></i>
        <input placeholder="输入您当前要搜索的商品" type="search" @keyup.enter="search" v-model="keyword" />
      </div>
      <!-- <span @click="search" v-if="keyword === ''">取消</span> -->
      <span @click="search">搜索</span>
    </div>
    <div class="homeBox" :style="{marginTop:statusH + 'rem'}">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <swiper class="banner_list" :options="swiperOption" v-if="banner.length > 0">
          <swiper-slide class="allBox" v-for="(item,index) in banner" :key="index">
            <img :src="item.cover" alt class="bg" />
          </swiper-slide>
        </swiper>
        <div class="goodsBox">
          <div
            class="goodList"
            v-for="(item,index) in shopList"
            :key="index"
            @click="handDetail(item.id)"
          >
            <img :src="item.goods_img" alt />
            <div class="shop_name">
              <p>{{item.goods_name}}</p>
              <div class="price">
                <div class="price_main">
                  ¥
                  <span>{{item.price}}</span>
                </div>
                <span>库存：{{item.stock}}</span>
              </div>
            </div>
          </div>
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as apiHttp from '../../api/index'
export default {
  components: {
    swiper,
    swiperSlide,
    MescrollVue
  },
  data () {
    return {
      statusH: '',
      keyword: '',
      banner: [],
      shopList: [],
      swiperOption: {
        loop: true,
        spaceBetween: 5,
        centeredSlides: true,
        initialSlide: 1,
        pagination: {
          el: '.swiper-pagination'
        }
      },
      mescroll: null,
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
          warpId: '',
          icon: '',
          tip: '暂无相关数据~'
        }
      },
      dataList: [],
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null // 路由切换时是否禁止ios回弹
    }
  },
  created () {
    let size = document.documentElement.clientWidth / 7.5
    this.statusH = api.safeArea.top / size
  },
  mounted () {
    this.getBanner()
  },
  methods: {
    search () {
      this.list = []
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    },
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      apiHttp
        .getGoodsList(10, page.num, this.keyword)
        .then(res => {
          if (res.code === 1) {
            let arr = res.data.data === '' ? [] : res.data.data
            if (page.num === 1) this.shopList = []
            this.shopList = this.shopList.concat(arr)
            this.$nextTick(() => {
              mescroll.endSuccess(res.data.data.length, true)
            })
          }
        })
        .catch(e => {
          mescroll.endErr()
        })
    },
    refresh: function () {
      this.list = []
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    },
    getBanner () {
      apiHttp.getBanner().then(res => {
        if (res.code == 1) {
          this.banner = res.data
        }
      })
    },
    handDetail (id) {
      this.$router.push({
        name: 'goodDetails',
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
#home {
  background: #fff;
  height: 100%;
  position: relative;
  .header {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 0.88rem;
    // background-image: url("../../assets/img/my/my_head.png");
    background: #ff7512;
    .icon-back {
      font-size: 0.4rem;
      color: #000;
      margin-top: 0.02rem;
    }
    .searchBox {
      width: 6.1rem;
      height: 0.6rem;
      border-radius: 0.3rem;
      background: #efefef;
      display: flex;
      align-items: center;
      padding-left: 0.3rem;
      .icon-search {
        font-size: 0.27rem;
        color: #999;
      }
      input {
        background: #efefef;
        margin-left: 0.2rem;
        width: 5.3rem;
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
  }
  .homeBox {
    position: absolute;
    top: 0.88rem;
    left: 0;
    right: 0;
    bottom: 0px;
    height: auto !important;
    // background: rgba(255, 255, 255, 0);
    background: #f5f5f5;
    .banner_list {
      position: relative;
      margin-top: 0.2rem;
      .swiper-slide {
        img {
          width: 6.9rem;
          margin: 0 0.3rem;
          border-radius: 0.1rem;
        }
      }
    }
    .goodsBox {
      margin-top: 0.2rem;
      padding: 0 0.3rem;
      .goodList {
        width: 3.35rem;
        display: inline-block;
        background: #ffffff;
        margin-bottom: 0.2rem;
        border-radius: 0.1rem;
        img {
          width: 3.35rem;
          height: 3.35rem;
          border-top-right-radius: 0.1rem;
          border-top-left-radius: 0.1rem;
        }
        p {
          margin-top: 0.2rem;
          text-align: left;
          color: #333333;
          font-size: 0.28rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 0.6rem;
        }
        .shop_name {
          padding: 0 0.2rem;
        }
        .price {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .price_main {
            color: #ff7512;
            font-size: 0.25rem;
            span {
              color: #ff7512;
              font-size: 0.36rem;
              font-weight: 580;
            }
          }
          span {
            font-size: 0.25rem;
            color: #a1a1a1;
          }
        }
      }
      .goodList:nth-child(2n + 1) {
        margin-right: 0.2rem;
      }
    }
  }
}
</style>

<template>
<div id="location">
  <x-header
    slot="header"
    :left-options="{showBack: false}" class="site-head">
    <a @click="goBack()" slot="left" class="backBox"><i class="iconfont icon-back"></i></a>
    收货地址
    <img src="../../assets/img/my/tianjia.png" alt="" @click="jumpTo('/addAddress')">
  </x-header>
  <div class="mescrollBox">
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="site-body" id="d7">
        <div class="site-item" v-for="(item,index) in list" :key="index">
          <div class="site-info">
            <div>
              <p>收货人：{{item.name}}</p>
              <span>{{item.mobile}}</span>
            </div>
            <p>{{item.province+item.city+item.county+item.detail_address}}</p>
          </div>
          <div class="site-change">
            <p>
              <i class="iconfont icon-roundcheckfill" @click="checkdefault(index,item.id)" :style="{'color' : item.is_default == '1' ? '#ff7512' : '#a1a1a1'}"></i>
              设为默认
            </p>
            <div class="item1" style="position: absolute;right: 1.5rem;" @click="updateAddress(item)">
              <img src="../../assets/img/my/bianji.png" alt="">
              <span>编写</span>
            </div>
            <div class="item1" @click="deleteAddress(item.id,index)">
              <img src="../../assets/img/my/shanchu.png" alt="">
              <span>删除</span>
            </div>
          </div>
        </div>
      </div>
    </mescroll-vue>
  </div>
  <confirm
    v-model="show"
    :close-on-confirm="false"
    @on-confirm="confirm">
    <p style="text-align:center;">确定删除该地址</p>
  </confirm>
</div>
</template>

<script>
import { XHeader, Confirm, TransferDomDirective as TransferDom } from 'vux'
import * as apiHttp from '../../api/index'
import MescrollVue from 'mescroll.js/mescroll.vue'
export default {
  name: 'address1',
  directives: {
    TransferDom
  },
  components: {
    XHeader,
    Confirm,
    MescrollVue
  },
  data () {
    return {
      finish: false,
      status: 1,
      list: [],
      id: null,
      index: null,
      show: false,
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
        htmlNodata: '<p class="upwarp-nodata">—— 我也是有底线的 ——</p>',
        noMoreSize: 5,
        empty: {
          warpId: 'd7',
          icon: './static/img/auth/kong.png',
          tip: '暂无相关数据~'
        }
      }
    }
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    upCallback (page, mescroll) {
      apiHttp.getAddressList(page.num).then(res => {
        if (res.code === 1) {
          this.payTypeInfo = res.data.payTypeInfo
          let arr = res.data.data === '' ? [] : res.data.data
          if (page.num === 1) this.list = []
          this.list = this.list.concat(arr)
          this.$nextTick(() => {
            mescroll.endSuccess(res.data.data.length, true)
          })
         
        }
      }).catch((e) => {
        mescroll.endErr()
      })
    },
    refresh: function () {
      this.finish = false
      let This = this
      this.mescrollUp.page.num = 1
      this.upCallback(this.mescrollUp.page, this.mescroll)
    },
    confirm () {
      apiHttp.getAddressDel(this.id).then(response => {
        if (response.code === 1) {
          this.$vux.toast.text('删除成功')
          this.show = false
          this.list.splice(this.index, 1)
          setTimeout(() => {
            this.upCallback(this.mescrollUp.page, this.mescroll)
          },1000)
        } else {
          this.$vux.toast.text(response.msg)
        }
      })
    },
    deleteAddress (id, index) {
      this.show = true
      this.id = id
      this.index = index
    },
    updateAddress (item) {
      this.$router.push({
        name: 'addressUpdate',
        query: item
      })
    },
    checkdefault (index, id) {
      apiHttp.setIsDefault(id).then(response => {
        if (response.code === 1) {
          this.$vux.toast.text('设置成功')
          for (let i = 0; i < this.list.length; i++) {
            this.list[i].is_default = '0'
            if (i === index) {
              this.list[i].is_default = '1'
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="less">
  @import '../../assets/less/common';
  #location{
    .mescrollBox{
      width: 100%;
      position: absolute;
      top: @margin-top;
      bottom: 0;
      height: auto !important;
    }
  }
  #location{
  .site-head {
    position: relative;
    img{
      width: 0.45rem;
      position: absolute;
      right: 0.3rem;
      top: 0.2rem;
    }
  }
  .site-body{
    .site-item{
      padding: 0 .3rem;
      margin-bottom: .1rem;
      height: 2.8rem;
      background: #ffffff;
      .site-info{
        height: 64%;
        border-bottom: 1px solid @border-color;
        div{
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: @font-main-color;
          font-size: @font-big;
          height: 45%;
        }
        p{
          text-align: left;
          font-size: @font-nomal;
        }
      }
      .site-change{
        height: 36%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: @font-middle-color;
        font-size: @font-big;
        position: relative;
        p{
          display: flex;
          align-items: center;
          i{
            color: @font-light-color;
            font-size: 0.4rem;
            margin-right: .1rem;
          }
        }
        .item1{
          display: flex;
          width: 20%;
          align-items: center;
          img{
            width: 0.35rem;
            margin-right: .1rem;
          }
        }
      }
    }
  }
  
}
</style>

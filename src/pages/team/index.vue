<template>
  <div class="team">
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
      <div class="head">
        <div class="searchBox">
          <div class="search">
            <img src="../../assets/img/my/search.png" alt />
            <input
              type="number"
              placeholder="请输入手机号"
              @keyup.enter="reset(type)"
              v-model="keyword"
            />
          </div>
        </div>
        <!-- <span class="searchBtn"  v-if="keyword === ''" @click="reset">取消</span> -->
        <span class="searchBtn" @click="reset" >搜索</span>
      </div>
      <div class="t">您的推荐人</div>
      <div class="headbox shadow">
        <div class="info">
          <img :src="data.picture" v-if="data.picture" alt class="avater" />
          <img src="../../assets/img/logo.png" class="avater" alt v-else />
          <div class="nickname" v-if="data.nickname">
            <p class="name">
              <span v-if="data.nickname">{{data.nickname}}</span>
              <span v-if="data.username">{{data.username}}</span>
              <span v-if="data.mobile">{{data.level_name}}</span>
            </p>
          </div>
          <div v-else>{{data}}</div>
        </div>
      </div>
      <div class="numBox">
        <div class="top">
          <div class="num" :class="{active: type === 1}" @click="reset(1)">
            <span>直推代理</span>
            <p>{{zt_size}}</p>
          </div>
          <div class="num" :class="{active: type === 2}" @click="reset(2)">
            <span>间推代理</span>
            <p>{{jt_size}}</p>
          </div>
        </div>
      </div>
      <div class="lists">
        <div
          class="list"
          v-for="(item, index) in list"
          :key="index"
          @click="$router.push({name: 'teamDetails', query: {id: item.id}})"
        >
          <div class="slef">
            <img :src="item.picture" v-if="item.picture" alt class="avater" />
            <img src="../../assets/img/logo.png" class="avater" alt v-else />
            <div class="slefinfo">
              <p class="name">
                {{item.nickname}} 
                <span class="jizhu" v-if="item.is_buy_stock == 1">机主</span>
                <span class="nojizhu" v-else>非机主</span>
                <span v-if="item.level_name" class="leval">{{item.level_name}}</span>
              </p>
              <div class="account">
                <span>累计销量: {{item.leijixl_size}}</span>  
                <span class="num">零售销量: {{item.lingshou_size}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="d2"></div>
    </mescroll-vue>
  </div>
</template>

<script>
import MescrollVue from "mescroll.js/mescroll.vue";
import * as utils from "../../utils";
import * as apiHttp from "../../api/index";
export default {
  name: "team",
  components: {
    MescrollVue
  },
  data() {
    return {
      data: {},
      zt_size: "",
      jt_size: "",
      list: [],
      page: 1,
      finish: false,
      keyword: "",
      loading: false,
      type: 1,
      mescroll: null,
      mescrollDown: {
        auto: false,
        use: false
      },
      mescrollUp: {
        auto: false,
        callback: this.upCallback,
        page: {
          num: 0,
          size: 5
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        htmlLoading: "",
        noMoreSize: 5,
        empty: {
          warpId: "d2",
          icon: "./static/img/auth/kong.png",
          tip: "暂无相关数据~"
        }
      },
      dataList: [],
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null // 路由切换时是否禁止ios回弹
    };
  },
  methods: {
    copyText(text, tips) {
      if (!text) {
        this.$vux.toast.text(`${tips}不存在`);
        return;
      }
      utils.copyText(text).then(res => {
        this.$vux.toast.text(`已复制${tips}`);
      });
    },
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    upCallback(page, mescroll) {
      this.mescrollUp.htmlLoading =
        '<p class="upwarp-progress mescroll-rotate"></p><p class="upwarp-tip">加载中..</p>';
      if (this.type == 1) {
        apiHttp
          .getZTAgentList(page.num, 10,this.keyword)
          .then(res => {
            if (res.code === 1) {
              let arr = res.data.data;
              if (page.num === 1) this.list = [];
              this.list = this.list.concat(arr);
              this.$nextTick(() => {
                mescroll.endSuccess(arr.length, true);
              });
            } else {
              mescroll.endErr();
            }
          })
          .catch(e => {
            mescroll.endErr();
          });
      } else {
        apiHttp
          .getJTAgentList(page.num, 10,this.keyword)
          .then(res => {
            if (res.code === 1) {
              let arr = res.data.data;
              if (page.num === 1) this.list = [];
              this.list = this.list.concat(arr);
              console.log(this.list);
              this.$nextTick(() => {
                mescroll.endSuccess(arr.length, true);
              });
            } else {
              mescroll.endErr();
            }
          })
          .catch(e => {
            mescroll.endErr();
          });
      }
    },
    reset(type) {
      this.mescrollUp.htmlLoading = "";
      this.mescrollUp.page.num = 1;
      if(type){
         this.type = type;
      }
      this.list = [];
      this.finish = false;
      this.upCallback(this.mescrollUp.page, this.mescroll);
    },
    getTeam() {
      apiHttp.getMyTeamData().then(res => {
        if (res.code == 1) {
          this.data = res.data.parentAgent;
          this.zt_size = res.data.zt_size;
          this.jt_size = res.data.jt_size;
        }
      });
    }
  },
  mounted() {
    // 删除
    this.upCallback(this.mescrollUp.page, this.mescroll);
    this.getTeam();
  }
};
</script>

<style scoped lang="less">
@import "../../assets/less/common";
.team {
  height: 100%;
  background: #f7f7f7;
  .head {
    width: 100%;
    position: relative;
    background: white;
    padding-top: 0.5rem;
    .icon-back {
      position: absolute;
      left: 0.3rem;
      font-size: 0.4rem;
      line-height: 1.1rem;
    }
    .searchBtn {
      position: absolute;
      bottom: 0;
      right: 0.3rem;
      font-size: 0.26rem;
      color: #333;
      line-height: 1.1rem;
    }
  }
  .headbox {
    width: 6.5rem;
    background: #fff;
    margin: 0 auto;
    border-radius: 0.1rem;
    padding: 0 0.2rem;
    box-sizing: border-box;
  }
  .info {
    text-align: center;
    position: relative;
    top: -0.38rem;
    .avater {
      width: 1.38rem;
      height: 1.38rem;
      border-radius: 50%;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      margin: 0.2rem auto 0;
      background: url("../../assets/img/logo.png");
    }
    .nickname {
      padding: 0.1rem 0;
      .name {
        font-size: 0.3rem;
        span:nth-of-type(2) {
           margin-left: 0.2rem;
        }
        span:nth-of-type(3) {
          font-size: 0.24rem;
          margin-left: 0.2rem;
          display: inline-block;
          border: 1px solid #ff5847;
          color: #ff5847;
          border-radius: 0.3rem;
          padding: 0 0.2rem;
        }
      }
      .account {
        font-size: 0.24rem;
        color: #666;
      }
    }
    .copy-area {
      display: flex;
      padding-top: 0.3rem;
      .copy-item {
        width: 50%;
        box-sizing: border-box;
        font-size: 0.3rem;
        div {
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 0.4rem;
            margin-right: 0.2rem;
          }
        }
        p {
          color: #999;
          img {
            height: 0.3rem;
          }
        }
      }
      .copy-item:first-child {
        border-right: 1px solid #f7f7f7;
      }
    }
  }
  .numBox {
    margin: 0.2rem auto;
    background: #fff;
    width: 6.9rem;
    border-radius: 0.1rem;
    .top {
      height: 2.2rem;
      align-items: center;
      display: flex;
      justify-content: space-around;
      position: relative;
      .num {
        position: relative;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        background: #f7f7f7;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        p {
          color: @theme-col;
          font-size: 0.36rem;
          position: relative;
        }
        span {
          font-size: 0.26rem;
          position: relative;
        }
      }
      .num::before {
        position: absolute;
        content: "";
        background: #fff;
        bottom: 2px;
        right: 2px;
        left: 2px;
        top: 2px;
        border-radius: 50%;
      }
      .active {
        background: linear-gradient(#fede99, #f6665d, #ffc393);
      }
    }
    .top:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0.2rem;
      right: 0.2rem;
      border-bottom: 1px solid #f7f7f7;
      transform-origin: 0 0;
      transform: scaleY(0.5);
    }
    .bot {
      height: 1.7rem;
      display: flex;
      .nums {
        position: relative;
        flex: 2;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        p {
          font-size: 0.3rem;
          color: #333;
        }
        span {
          font-size: 0.24rem;
          color: #666;
        }
      }
      .active {
        p {
          color: @theme-col;
        }
        span {
          color: @theme-col;
        }
      }
      .nums:nth-of-type(3) {
        flex: 3;
      }
      .nums:nth-of-type(4) {
        flex: 4;
      }
      .nums:after {
        content: "";
        height: 50%;
        position: absolute;
        bottom: 25%;
        top: 25%;
        right: 0;
        border-right: 1px solid #dadada;
        transform-origin: 0 0;
        transform: scaleX(0.5);
      }
      .nums:last-of-type:after {
        display: none;
      }
    }
  }
  .searchBox {
    height: 1.1rem;
    display: flex;
    align-items: center;
    padding-left: 0.5rem;
    .search {
      height: 0.7rem;
      width: 5.9rem;
      background: #eee;
      display: flex;
      padding: 0 0.35rem;
      box-sizing: border-box;
      border-radius: 0.35rem;
      align-items: center;
      img {
        width: 0.32rem;
        height: 0.32rem;
        margin-right: 0.2rem;
      }
      input {
        flex: 1;
        outline: none;
        border: none;
        background: inherit;
      }
    }
  }
  .lists {
    margin: 0.2rem auto;
    width: 6.9rem;
    .list {
      margin-bottom: 0.1rem;
      background: #fff;
      border-radius: 0.1rem;
      .slef {
        padding: 0.2rem 0.3rem;
        position: relative;
        display: flex;
        .avater {
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center;
          width: 1rem;
          height: 1rem;
          margin-right: 0.2rem;
          border-radius: 50%;
        }
        .slefinfo {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          .name {
            font-size: 0.28rem;
            color: #333;
            .leval{
              height: 0.4rem;
              margin-left: 0.2rem;
              line-height: 0.4rem;
              padding: 0 0.2rem;
              border-radius: 0.2rem;
              display: inline-block;
              background: linear-gradient(
                94deg,
                rgba(254, 222, 153, 1),
                rgba(255, 88, 71, 1),
                rgba(255, 145, 120, 1)
              );
              color: #fff;
              font-size: 0.24rem;
            }
            .jizhu{
              height: 0.4rem;
              line-height: 0.4rem;
               margin-left: 0.2rem;
              background: #fe8548;
              padding: 0 0.2rem;
              border-radius: 0.2rem;
              color: #fff;
            }
            .nojizhu{
              height: 0.4rem;
              line-height: 0.4rem;
               margin-left: 0.2rem;
              background: #03a9f4;
              padding: 0 0.2rem;
              border-radius: 0.2rem;
              color: #fff;
            }
          }
          .account {
            color: #fe8548;
            font-size: 0.24rem;
            .num{
              margin-left: 0.1rem;
              color: #03a9f4;
            }
          }
        }
        .recommend {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding-left: 0.3rem;
          position: relative;
          p {
            font-size: 0.24rem;
            color: #666;
          }
        }
        .recommend:before {
          content: "";
          height: 100%;
          position: absolute;
          bottom: 0;
          top: 0;
          left: 0;
          border-left: 1px solid #dadada;
          transform-origin: 0 0;
          transform: scaleX(0.5);
        }
      }
      .profit {
        padding: 0.3rem;
        display: flex;
        div {
          flex: 1;
          p:first-of-type {
            font-size: 0.24rem;
            margin-bottom: 0.2rem;
          }
          p:last-of-type {
            font-size: 0.3rem;
            color: @theme-col;
          }
        }
        div:nth-of-type(2) {
          text-align: center;
        }
        div:nth-of-type(3) {
          text-align: right;
        }
      }
    }
  }
}
.t {
  width: 6.5rem;
  font-size: 0.3rem;
  margin: 0.2rem auto 0.15rem;
}
.shadow {
  box-shadow: 0 2px 5px 2px rgba(0, 0, 0, 0.05);
}
</style>

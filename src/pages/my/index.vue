<template>
  <div id="my" class="tbkMy" v-if="data">
    <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit">
      <div class="head">
        <img src="../../assets/img/my/my_head.png" alt class="bg" />
        <img
          src="../../assets/img/my/setting.png"
          :style="{top: settingH + 'rem'}"
          alt
          class="setting"
          @click="jumpTo('/info')"
        />
        <div class="box">
          <div
            class="avater"
            :style="{backgroundImage: 'url(' + data.picture + ')'}"
            v-if="data.picture"
            @click="jumpTo('/info')"
          ></div>
          <div class="avater" v-else @click="jumpTo('/info')"></div>
          <div class="info" v-if="$store.state.user.token">
            <div class="tou">
              <p class="name">{{data.nickname}}</p>
              <span v-if="data.level >=0">
                <img src="../../assets/img/my/lvIcon.png" alt />
                v{{data.level + 1}}
              </span>
            </div>
            <!--<p class="uid">ID：{{data.uid}}</p>-->
            <p class="invite" @click="onCopy(data.username)" v-if="data.username">
              <span>邀请码：</span>
              <span>{{data.username}}</span>
              <span class="copyObj">复制</span>
            </p>
          </div>
          <div v-else class="info">
            <p class="login" @click="jumpTo('login')">登录/注册</p>
          </div>
        </div>
      </div>
      <div class="moneysBox">
        <div class="buttom">
          <div class="bos">
            <div class="profitBox">
              <div class="profit" @click="jumpTo('/withdrawlist')">
                <p v-if="profit">￥{{profit.ktx}}</p>
                <p v-else>0.00</p>
                <p>可提现金额</p>
              </div>
              <div class="profit" @click="jumpTo('/withdrawlist')">
                <p v-if="profit">￥{{profit.bktx}}</p>
                <p v-else>0.00</p>
                <p>不可提现金额</p>
              </div>
            </div>
          </div>
        </div>
        <div class="option orderBox">
          <div @click="jumpTo('/realName')">
            <div class="imgBox">
              <img src="../../assets/img/my/realname.png" alt />
            </div>
            <div>认证</div>
          </div>
          <div @click="jumpTo('/withdraw')">
            <div class="imgBox">
              <img src="../../assets/img/my/mt.png" alt />
            </div>
            <div>提现</div>
          </div>
          <div @click="jumpTo('/invite')">
            <div class="imgBox">
              <img src="../../assets/img/my/ms.png" alt />
            </div>
            <div>邀请好友</div>
          </div>
          <div @click="jumpTo('/order')">
            <div class="imgBox">
              <img src="../../assets/img/my/mts.png" alt />
            </div>
            <div>订单</div>
          </div>
        </div>
        <div class="tool">
          <div class="headers">我的工具</div>
          <div class="option">
            <div @click="jumpTo('/notice')">
              <div class="imgBox">
                <img src="../../assets/img/my/messages.png" alt />
              </div>
              <span class="newsNum" v-if="newsNum.gg_num > 0">{{newsNum.gg_num}}</span>
              <div>系统消息</div>
            </div>
            <div @click="jumpTo('/address')">
              <div class="imgBox">
                <img src="../../assets/img/my/address.png" alt />
              </div>
              <div>收货地址</div>
            </div>
          </div>
        </div>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import { Group, Cell } from "vux";
import * as apiHttp from "../../api/index";
import MescrollVue from "mescroll.js/mescroll.vue";
import * as utils from "../../utils";
export default {
  name: "my2",
  components: {
    Group,
    Cell,
    MescrollVue
  },
  data() {
    return {
      settingH: "",
      data: "",
      profit: "",
      mescroll: null,
      mescrollDown: {
        use: !!this.$store.state.user.token,
        auto: false,
        callback: this.getInfo,
        htmlContent: '<p class="downwarp-progress downwarp-loading"></p>'
      },
      dataList: [],
      lastScrollTop: 0, // 路由切换时滚动条的位置
      lastBounce: null, // 路由切换时是否禁止ios回弹,
      model: null,
      signInfo: "",
      newsNum: ""
    };
  },
  methods: {
    mescrollInit(mescroll) {
      this.mescroll = mescroll;
    },
    carryCash() {
      this.$router.push("/withdraw");
    },
    onCopy(code) {
      let that = this;
      let clipBoard = api.require("clipBoard");
      clipBoard.set(
        {
          value: code
        },
        function(ret, err) {
          if (ret) {
            utils.storage.set("copyWord", code);
            that.$vux.toast.text("复制成功");
          } else {
            that.$vux.toast.text("请重试");
          }
        }
      );
    },
    getInfo() {
      if (this.$store.state.user.token) {
        apiHttp
          .getAgentDetall()
          .then(res => {
            if (res.code === 1) {
              this.data = res.data;
              this.$store.commit("setUserInfo", res.data);
              this.mescroll.endSuccess(res.data.length);
            }
          })
          .catch(e => {
            this.mescroll.endErr();
          });
      }
    },
    getProfit() {
      apiHttp.getMyReward().then(res => {
        if (res.code == 1) {
          this.profit = res.data;
        }
      });
      apiHttp.getNewsNum().then(res => {
        if (res.code == 1) {
          this.newsNum = res.data;
        }
      });
    }
  },
  activated() {
    this.data = this.$store.state.user.userInfo;
    this.getInfo();
    this.getProfit();
  },
  mounted() {
    let size = document.documentElement.clientWidth / 7.5;
    this.settingH = api.safeArea.top / size + 0.6;
  }
};
</script>
<style lang="less">
.tbkMy {
  .mescroll {
    bottom: 0 !important;
  }
}
#my {
  position: relative;
  /*._v-content{*/
  /*padding-bottom: 30px;*/
  /*}*/
  .vux-cell-primary {
    line-height: 0.4rem;
    margin-left: 0.2rem;
    .vux-label {
      font-size: 0.28rem;
    }
  }
  .weui-cells {
    margin-top: 0;
    .weui-cell:before {
      right: 15px;
    }
  }
  .weui-cells:after,
  .weui-cells:before {
    display: none;
  }
}
</style>

<style scoped lang="less">
@import "../../assets/less/common";
.tops{
  padding-top: 2px;
}
#my{
  position: relative;
  height: 100%;
  background: #f7f7f7;
  .head{
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 3.59rem;
    .bg{
      position: absolute;
      width: 100%;
      height: 3.59rem;
      left: 0;
      top: 0;
    }
    .t{
      width: 100%;
      position: absolute;
      left: 0;
      top: .65rem;
      height: .55rem;
      line-height: .55rem;
      text-align: center;
      font-size: .36rem;
      color: #fff;
    }
    .setting{
      position: absolute;
      right: .25rem;
      top: .85rem;
      width: .45rem;
      height: .45rem;
      z-index: 100;
    }
    .share{
      position: absolute;
      top: 1.5rem;
      right: -.4rem;
      width: 1.81rem;
      height: .55rem;
      display: flex;
      align-items: center;
      background: -webkit-linear-gradient(left,#ff9914,#ffcb6e);
      border-radius: .27rem;
      font-size: 0.28rem;
      img{
        position: absolute;
        left: 0;
        top: 0;
        width: 1.91rem;
        height: 100%;
      }
      span{
        /*position: absolute;*/
        /*left: .3rem;*/
        /*top: .07rem;*/
        /*display: inline-block;*/
        /*height: .55rem;*/
        /*line-height: .55rem;*/
        text-indent: .5rem;
        font-size: 12px;
        color: #fff;
        z-index: 100;
      }
      .isVip{
        text-indent: .5rem;
      }
    }
    .box{
      position: absolute;
      top: 1.5rem;
      left: 0;
      width: 100%;
      height: 1.5rem;
      padding-left: .26rem;
      display: flex;
      box-sizing: border-box;
      overflow: hidden;
      .avater{
        flex-shrink: 0;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url('../../assets/img/my/avater.png');
      }
      .info{
        flex: 1;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        /*padding: .2rem 0;*/
        margin-left: .2rem;
        .login{
          font-size: .3rem;
          color: #fff;
        }
        .uid{
          font-size: .28rem;
          color: #fff;
        }
        .tou{
          display: flex;
          align-items: center;
          overflow: hidden;
          .name{
            text-align: left;
            font-size: .32rem;
            color: #fff;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            line-height: .4rem;
            max-width: 3.6rem;
            /*display: flex;*/
            /*align-items: center;*/
          }
          span {
            position: relative;
            background: #3a3b40;
            flex-shrink: 0;
            margin-left: .1rem;
            margin-right: .4rem;
            color: #f7bd01;
            font-size: .22rem;
            height: .4rem;
            text-align: left;
            padding-right: .2rem;
            padding-left: .4rem;
            line-height: .4rem;
            border-radius: .2rem;
            img{
              position: absolute;
              left: 0.05rem;
              top: 0.05rem;
              width: .3rem;
              height: .3rem;
            }
          }
        }
        .invite{
          text-align: left;
          font-size: .26rem;
          color: #fff;
          span:first-of-type{
            color: #ffd57c;
            margin-right: .1rem;
          }
          span:last-of-type{
            font-size: .20rem;
            display: inline-block;
            width: .68rem;
            height: .3rem;
            text-align: center;
            line-height: .34rem;
            border-radius: .2rem;
            margin-left: .2rem;
            background-color: rgba(255, 255, 255, 0.4);
          }
        }
      }
    }
  }

  .moneysBox{
    font-size: 0.3rem;
    position: relative;
    margin: .2rem .2rem .2rem;
    z-index: 100;
    /*background-color: #fff;*/
    .buttom{
      width: 100%;
      background-color: #fff;
      border-radius: 10px;
      margin-top: 0.2rem;
      overflow: hidden;
      .tos{
        padding: 0 0.2rem;
        width: 100%;
        line-height: 1rem;
        height: 1rem;
        font-size: 0.3rem;
        box-sizing: border-box;
        position: relative;
        div:nth-child(1){
          float: left;
          span:nth-child(2){
            color: #fc3357;
            margin-left: 0.2rem;
          }
        }
        div:nth-child(2){
          float: right;
          font-size: 0.24rem;
          color: #999;
        }
        .look{
          display: inline-block;
          margin-right: 0.1rem;
        }
      }
      .bos{
        height: 1.6rem;
      }
      .tos:before{
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        display: block;
        width: 100%;
        height: 1px;
        background-color: #eeeeee;
      }
    }
    .profitBox{
       overflow: hidden;
       padding: 0.4rem 0;
       height: 1rem;
       width: 100%;
       .profit{
         width: 50%;
         float: left;
         justify-content: center;
         text-align: center;
         flex-direction: column;
         position: relative;
         p:first-of-type{
           font-size: .32rem;
           color: #fc3357;
           overflow: hidden;
           text-overflow: ellipsis;
           white-space: nowrap;
           text-align: center;
           margin-bottom: 0.1rem;
         }
         p:last-of-type{
           text-align: center;
           font-size: .24rem;
           color: #666;
         }
       }
       .profit:after{
         content: '';
         height: 80%;
         position: absolute;
         top: 10%;
         right: 0;
         border-right: 1px solid #dadada;
         transform-origin: 0 0;
         transform: scaleX(.5);
       }
       .profit:last-of-type:after{
         display: none;
       }
     }
    .option{
      width: 100%;
      padding: 0.26rem 0 0;
      box-sizing: border-box;
      /*border-radius: 10px;*/
      flex-wrap: wrap;
      overflow: hidden;
      >div{
        margin-bottom: .4rem;
        float: left;
        width: 25%;
        text-align: center;
        font-size: 0.24rem;
        color: #666;
        div:nth-child(1){
          width: 0.36rem;
          height: 0.36rem;
          margin: 0 auto;
          margin-bottom: 0.14rem;
          img{
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .orderBox{
      background: #fff;
      border-radius: 10px;
      margin-top: 0.2rem;
      padding-bottom: .26rem;
      div{
        margin-bottom: 0;
      }
    }
    .imgsBox{
      margin-top: 0.2rem;
      width: 100%;
      /*height: 1.15rem;*/
      img{
        width: 100%;
        height: 100%;
      }
    }
    .upgrade{
      border-radius: 10px;
      overflow: hidden;
      width: 100%;
      height: 1.6rem;
      background-color: #fff;
      margin-top: 0.2rem;
      padding: 0.2rem 0.3rem;
      box-sizing: border-box;
      div{
        float: left;
      }
      div:nth-child(1){
        width: 1.2rem;
        height: 1.2rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      div:nth-child(2){
        margin-left: 0.3rem;
        font-size: 0.28rem;
        padding-top: 0.1rem;
        color: black;
        p:nth-child(2){
          font-size: 0.24rem;
          color: #999999;
          margin-top: 0.14rem;
        }
      }
      div:nth-child(3){
        float: right;
        height: 100%;
        line-height: 1.2rem;
      }
    }
    .tool{
      margin-top: 0.2rem;
      border-radius: 10px;
      background: #fff;
      .option{
        margin-top: 0;
      }
      .headers{
        float: left;
        line-height: 1rem;
        font-size: 0.3rem;
        width: 100%;
        padding-left: 0.2rem;
        position: relative;
        box-sizing: border-box;
        text-align: left !important;
      }
      .headers:before{
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: #eeeeee;
        bottom: 0;
        left: 0;
      }
    }
    .grow{
      height: 3.6rem;
      width: 100%;
      margin-top: 0.2rem;
      background-color: #fff;
      border-radius: 10px;
      .title{
        width: 100%;
        height: 1rem;
        padding: 0 .2rem;
        box-sizing: border-box;
        line-height: 1rem;
        div:nth-child(1){
          float: left;
          font-size: 0.3rem;
        }
        div:nth-child(2){
          float: right;
          color: #999;
          font-size: 0.24rem;
          span:nth-child(1){
            margin-right: 0.1rem;
          }
        }
      }
      .imgsbox{
        width: 100%;
        height: 2.6rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>

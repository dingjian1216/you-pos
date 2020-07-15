<template>
  <div id="my" v-if="data">
    <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit">
      <div class="head">
        <!-- <img src="../../assets/img/my/my_head.png" alt class="bg" /> -->
        <img
          src="../../assets/img/my/setting.png"
          :style="{top: settingH + 'rem'}"
          alt
          class="setting"
          @click="jumpTo('/info')"
        />
        <div class="box" :style="{top: settingH1 + 'rem'}">
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
              <span v-if="data.level_name">
                <img src="../../assets/img/my/lvIcon.png" alt />
                {{data.level_name}}
              </span>
            </div>
            <p class="invite" @click="onCopy(data.username)" v-if="data.username">
              <span>邀请码：</span>
              <span>{{data.username}}</span>
              <span class="copyObj">复制</span>
            </p>
            <div class="jian">
              <div v-if="parentAgent.nickname" class="parent">推荐人: {{parentAgent.nickname}}</div>
              <div v-if="parentAgent.username">手机号: {{parentAgent.username}}</div>
            </div>
            <!-- <div v-else>{{parentAgent}}</div> -->
          </div>
          <div v-else class="info">
            <p class="login" @click="jumpTo('login')">登录/注册</p>
          </div>
        </div>
      </div>
      <div class="moneysBox">
        <div class="buttom">
          <div class="tos">
            <div>
              <span>今日积分分润</span>
              <span v-if="data && data.today_sum_jf_money">￥{{data.today_sum_jf_money}}</span>
              <span v-else>0.00</span>
            </div>
          </div>
          <div class="bos">
            <div class="profitBox">
              <div class="profit">
                <p v-if="data && data.sum_integral">{{data.sum_integral}}万</p>
                <p v-else>0.00</p>
                <p>累积兑换积分</p>
              </div>
              <div class="profit">
                <p v-if="data && data.sum_jf_money">￥{{data.sum_jf_money}}</p>
                <p v-else>0.00</p>
                <p>累积积分分润</p>
              </div>
              <div class="profit">
                <p v-if="data && data.today_sum_integral">{{data.today_sum_integral}}万</p>
                <p v-else>0.00</p>
                <p>今日累积积分</p>
              </div>
            </div>
          </div>
        </div>
        <div class="buttom">
          <div class="tos">
            <div>
              <span>今日团队销售</span>
              <span v-if="data && data.today_sum_stock_size">{{data.today_sum_stock_size}}(台)</span>
              <span v-else>0</span>
            </div>
          </div>
          <div class="bos">
            <div class="profitBox">
              <div class="profit">
                <p v-if="data && data.sum_td_stock_size">{{data.sum_td_stock_size}}(台)</p>
                <p v-else>0</p>
                <p>累积设备销售</p>
              </div>
              <div class="profit">
                <p v-if="data && data.sum_stock_jl">￥{{data.sum_stock_jl}}</p>
                <p v-else>0.00</p>
                <p>累积设备奖励</p>
              </div>
              <div class="profit">
                <p v-if="data && data.today_sum_stock_jl">￥{{data.today_sum_stock_jl}}</p>
                <p v-else>0.00</p>
                <p>今日设备奖励</p>
              </div>
            </div>
          </div>
        </div>
        <div class="buttom">
          <div class="bos">
            <div class="profitBox">
              <div class="profit" @click="jumpTo('/withdrawlist')">
                <p v-if="data.sum_money">￥{{data.sum_money}}</p>
                <p v-else>0.00</p>
                <p>累计佣金</p>
              </div>
              <div class="profit" @click="jumpTo('/withdrawlist')">
                <p v-if="data.kytx_money">￥{{data.kytx_money}}</p>
                <p v-else>0.00</p>
                <p>可提现佣金</p>
              </div>
              <div class="profit" @click="jumpTo('/withdrawlist')">
                <p v-if="data.butx_money">￥{{data.butx_money}}</p>
                <p v-else>0.00</p>
                <p>不可提现佣金</p>
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
          <div @click="getInvite">
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
            <div @click="jumpTo('/price')">
              <div class="imgBox">
                <img src="../../assets/img/my/price.png" alt />
              </div>
              <div>机主价格表</div>
            </div>
            <div @click="jumpTo('/shopMoney')">
              <div class="imgBox">
                <img src="../../assets/img/home/kuan.png" alt />
              </div>
              <div>购物款</div>
            </div>
          </div>
        </div>
      </div>
      <div v-transfer-dom>
        <confirm
          v-model="showTip"
          title="提示"
          ref="confirm"
          content="你还未成为机主，请先购买设备成为机主"
          @on-confirm="onConfirm"
        ></confirm>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import { Group, Cell, Confirm, TransferDomDirective as TransferDom} from 'vux'
import * as apiHttp from '../../api/index'
import MescrollVue from 'mescroll.js/mescroll.vue'
import * as utils from '../../utils'
export default {
  name: 'my2',
  components: {
    Group,
    Cell,
    Confirm,
    MescrollVue
  },
  directives: {
    TransferDom
  },
  data () {
    return {
      settingH: '',
      settingH1: '',
      showTip: false,
      data: '',
      profit: '',
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
      signInfo: '',
      newsNum: '',
      parentAgent: '' // 上级推荐人
    }
  },
  methods: {
    mescrollInit (mescroll) {
      this.mescroll = mescroll
    },
    carryCash () {
      this.$router.push('/withdraw')
    },
    onCopy (code) {
      let that = this
      let clipBoard = api.require('clipBoard')
      clipBoard.set(
        {
          value: code
        },
        function (ret, err) {
          if (ret) {
            utils.storage.set('copyWord', code)
            that.$vux.toast.text('复制成功')
          } else {
            that.$vux.toast.text('请重试')
          }
        }
      )
    },
    getInfo () {
      if (this.$store.state.user.token) {
        apiHttp
          .getAgentDetall()
          .then(res => {
            if (res.code === 1) {
              this.data = res.data
              this.$store.commit('setUserInfo', res.data)
              this.mescroll.endSuccess(res.data.length)
            }
          })
          .catch(e => {
            this.mescroll.endErr()
          })
      }
    },
    getProfit () {
      apiHttp.getMyReward().then(res => {
        if (res.code == 1) {
          this.profit = res.data
        }
      })
      apiHttp.getNewsNum().then(res => {
        if (res.code == 1) {
          this.newsNum = res.data
        }
      })
      apiHttp.getMyTeamData().then(res => {
        if (res.code == 1) {
          this.parentAgent = res.data.parentAgent
        }
      })
    },
    onConfirm () {
      this.$router.push('home')
    },
    getInvite () {
      if (this.data.is_buy_stock == 0) {
        this.showTip = true
      } else {
        this.$router.push('invite')
      }
    }
  },
  activated () {
    this.data = this.$store.state.user.userInfo
    this.getInfo()
    this.getProfit()
  },
  mounted () {
    let size = document.documentElement.clientWidth / 7.5
    this.settingH = api.safeArea.top / size + 0.3
    this.settingH1 = api.safeArea.top / size + 0.5
  }
}
</script>
<style lang="less">
.tbkMy {
  .mescroll {
    bottom: 0 !important;
  }
}
</style>

<style scoped lang="less">
@import "../../assets/less/common";
.tops {
  padding-top: 2px;
}
#my {
  position: relative;
  height: 100%;
  background: #f7f7f7;
  .head {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 3.5rem;
    background: #ff7512;
    .bg {
      position: absolute;
      width: 100%;
      height: 3.59rem;
      left: 0;
      top: 0;
    }
    .setting {
      position: absolute;
      right: 0.25rem;
      top: 0.6rem;
      width: 0.45rem;
      height: 0.45rem;
      z-index: 100;
    }
    .box {
      position: absolute;
      top: 0.8rem;
      left: 0;
      width: 100%;
      height: 2rem;
      padding-left: 0.26rem;
      display: flex;
      box-sizing: border-box;
      overflow: hidden;
      .avater {
        flex-shrink: 0;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        background-image: url("../../assets/img/my/avater.png");
      }
      .info {
        flex: 1;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        margin-left: 0.2rem;
        .login {
          font-size: 0.3rem;
          color: #fff;
        }
        .uid {
          font-size: 0.28rem;
          color: #fff;
        }
        .tou {
          display: flex;
          align-items: center;
          overflow: hidden;
          .name {
            text-align: left;
            font-size: 0.32rem;
            color: #fff;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            line-height: 0.4rem;
            max-width: 3.1rem;
            /*display: flex;*/
            /*align-items: center;*/
          }
          span {
            position: relative;
            background: #3a3b40;
            flex-shrink: 0;
            margin-left: 0.1rem;
            margin-right: 0.4rem;
            color: #f7bd01;
            font-size: 0.22rem;
            height: 0.4rem;
            text-align: left;
            padding-right: 0.2rem;
            padding-left: 0.4rem;
            line-height: 0.4rem;
            border-radius: 0.2rem;
            img {
              position: absolute;
              left: 0.05rem;
              top: 0.05rem;
              width: 0.3rem;
              height: 0.3rem;
            }
          }
        }
        .invite {
          text-align: left;
          font-size: 0.26rem;
          color: #fff;
          span:first-of-type {
            color: #ffd57c;
            margin-right: 0.1rem;
          }
          span:last-of-type {
            font-size: 0.2rem;
            display: inline-block;
            width: 0.68rem;
            height: 0.3rem;
            text-align: center;
            line-height: 0.3rem;
            border-radius: 0.2rem;
            margin-left: 0.2rem;
            background-color: rgba(255, 255, 255, 0.4);
          }
        }
        .jian {
          color: #fff;
          font-size: 0.28rem;
          .parent {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            max-width: 4.5rem;
          }
        }
      }
    }
  }

  .moneysBox {
    font-size: 0.3rem;
    position: relative;
    margin: 0.2rem 0.2rem 0.2rem;
    z-index: 100;
    .buttom {
      width: 100%;
      background-color: #fff;
      border-radius: 10px;
      margin-top: 0.2rem;
      overflow: hidden;
      .tos {
        padding: 0 0.2rem;
        width: 100%;
        line-height: 1rem;
        height: 1rem;
        font-size: 0.3rem;
        box-sizing: border-box;
        position: relative;
        div:nth-child(1) {
          float: left;
          span:nth-child(2) {
            color: #ff7512;
            margin-left: 0.2rem;
          }
        }
        div:nth-child(2) {
          float: right;
          font-size: 0.24rem;
          color: #999;
        }
        .look {
          display: inline-block;
          margin-right: 0.1rem;
        }
      }
      .bos {
        height: 1.6rem;
      }
      .tos:before {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        display: block;
        width: 100%;
        height: 1px;
        background-color: #eeeeee;
      }
    }
    .profitBox {
      overflow: hidden;
      padding: 0.4rem 0;
      height: 1rem;
      width: 100%;
      .profit {
        width: 33.33%;
        float: left;
        justify-content: center;
        text-align: center;
        flex-direction: column;
        position: relative;
        p:first-of-type {
          font-size: 0.32rem;
          color: #ff7512;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
          margin-bottom: 0.1rem;
        }
        p:last-of-type {
          text-align: center;
          font-size: 0.24rem;
          color: #666;
        }
      }
      .profit:after {
        content: "";
        height: 80%;
        position: absolute;
        top: 10%;
        right: 0;
        border-right: 1px solid #dadada;
        transform-origin: 0 0;
        transform: scaleX(0.5);
      }
      .profit:last-of-type:after {
        display: none;
      }
    }
    .option {
      width: 100%;
      padding: 0.26rem 0 0;
      box-sizing: border-box;
      /*border-radius: 10px;*/
      flex-wrap: wrap;
      overflow: hidden;
      > div {
        margin-bottom: 0.4rem;
        float: left;
        width: 25%;
        text-align: center;
        font-size: 0.24rem;
        color: #666;
        position: relative;
        .newsNum {
          position: absolute;
          top: -0.1rem;
          right: 0.4rem;
          border-radius: 50%;
          background: #fb3775;
          color: #fff;
          font-size: 0.2rem;
          width: 0.4rem;
          height: 0.4rem;
          line-height: 0.4rem;
          display: inline-block;
        }
        div:nth-child(1) {
          width: 0.5rem;
          height: 0.5rem;
          margin: 0 auto;
          margin-bottom: 0.14rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .orderBox {
      background: #fff;
      border-radius: 10px;
      margin-top: 0.2rem;
      padding-bottom: 0.26rem;
      div {
        margin-bottom: 0;
      }
    }
    .imgsBox {
      margin-top: 0.2rem;
      width: 100%;
      /*height: 1.15rem;*/
      img {
        width: 100%;
        height: 100%;
      }
    }
    .upgrade {
      border-radius: 10px;
      overflow: hidden;
      width: 100%;
      height: 1.6rem;
      background-color: #fff;
      margin-top: 0.2rem;
      padding: 0.2rem 0.3rem;
      box-sizing: border-box;
      div {
        float: left;
      }
      div:nth-child(1) {
        width: 1.2rem;
        height: 1.2rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      div:nth-child(2) {
        margin-left: 0.3rem;
        font-size: 0.28rem;
        padding-top: 0.1rem;
        color: black;
        p:nth-child(2) {
          font-size: 0.24rem;
          color: #999999;
          margin-top: 0.14rem;
        }
      }
      div:nth-child(3) {
        float: right;
        height: 100%;
        line-height: 1.2rem;
      }
    }
    .tool {
      margin-top: 0.2rem;
      border-radius: 10px;
      background: #fff;
      .option {
        margin-top: 0;
      }
      .headers {
        float: left;
        line-height: 1rem;
        font-size: 0.3rem;
        width: 100%;
        padding-left: 0.2rem;
        position: relative;
        box-sizing: border-box;
        text-align: left !important;
      }
      .headers:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 1px;
        background-color: #eeeeee;
        bottom: 0;
        left: 0;
      }
    }
    .grow {
      height: 3.6rem;
      width: 100%;
      margin-top: 0.2rem;
      background-color: #fff;
      border-radius: 10px;
      .title {
        width: 100%;
        height: 1rem;
        padding: 0 0.2rem;
        box-sizing: border-box;
        line-height: 1rem;
        div:nth-child(1) {
          float: left;
          font-size: 0.3rem;
        }
        div:nth-child(2) {
          float: right;
          color: #999;
          font-size: 0.24rem;
          span:nth-child(1) {
            margin-right: 0.1rem;
          }
        }
      }
      .imgsbox {
        width: 100%;
        height: 2.6rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>

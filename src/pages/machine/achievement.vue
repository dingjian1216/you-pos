<template>
  <div id="achievement">
    <div class="head">
      <div class="title">兑换积分汇总</div>
      <div class="integral">
        <div class="list">
          <div class="my-num">
            {{user.sum_integral}}
            <span>积分</span>
          </div>
          <div class="name">累计兑换</div>
        </div>
        <div class="list">
          <div class="my-num">
            {{user.sum_money}}
            <span>元</span>
          </div>
          <div class="name">总价值</div>
        </div>
      </div>
    </div>
    <div class="applyBox" v-if="nowTime < user.DABIAO_GUOQI_TIME * 1000">
      <div class="title">达标返现</div>
      <div class="manjian">累计兑换积分满{{user.DABIAO_JF}},返现{{user.DABIAO_MONEY}}元 当前进度{{showBai}}%</div>
      <box gap="20px">
        <x-progress :percent="user.sum_integral * 100 / user.DABIAO_JF " :show-cancel="false"></x-progress>
      </box>
    </div>
    <div class="explain" >
      说明: 达标返现只有在设备有效期内有效,从设备划拨时间开始算起,当前设备的划拨时间为{{user.huabo_time | formatDate}},当前设备的有效期为{{user.DABIAO_GUOQI_TIME | formatDate}},
      超过有效期时间达标不返现
    </div>
  </div>
</template>
<script>
import * as apiHttp from "../../api/index";
import { XProgress, Box } from "vux";
import { formatDate } from "../../plugin/data";
export default {
  components: {
    XProgress,
    Box
  },
  data() {
    return {
      user: "",
      nowTime: ''
    };
  },
 filters: {
    formatDate(time) {
      time = time * 1000;
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  created(){
    this.nowTime =  (new Date()).getTime();
  },
  computed:{
    showBai(){
      return (this.user.sum_integral * 100 / this.user.DABIAO_JF).toFixed(0)
    }
  },
  mounted() {
    apiHttp.exchange_detail(this.$route.query.id).then(res => {
      if (res.code == 1) {
        this.user = res.data;
      }
    });
  }
};
</script>
<style lang="less" >
.weui-progress__bar {
  .weui-progress__inner-bar {
    background-color: #ff7512;
  }
}
</style>
<style lang="less" scoped>
#achievement {
  height: 100%;
  position: relative;
  overflow-y: scroll;
  background: #f2f2f2;
  .head {
    color: #fff;
    background:#ff7512;
    background-size: 100% 100%;
    padding: 0.4rem 0.3rem;
    .title {
      font-size: 0.32rem;
    }
    .integral {
      margin-top: 0.3rem;
      display: flex;
      align-items: center;
      .list {
        flex: 1;
        .my-num {
          font-size: 0.52rem;
          font-weight: 100;
          span {
            font-size: 0.28rem;
          }
        }
        .name {
          font-size: 0.28rem;
          opacity: 0.6;
        }
      }
    }
  }
  .applyBox {
    margin: 0.3rem 0.3rem 0;
    position: relative;
    word-break: break-all;
    background: #ffffff;
    padding-bottom: 0.3rem;
    .title {
      display: flex;
      justify-content: space-between;
      padding: 0.2rem 0.3rem;
      font-size: 0.32rem;
      color: #000;
      font-weight: 600;
      border-radius: 0.2rem;
    }
    .manjian{
      font-size: 0.24rem;
      color: #666666;
      text-align: center;
    }
  }
  .explain {
    margin: 0.3rem;
    padding: 0.3rem;
    background: #ffffff;
    border-radius: 0.2rem;
    font-size: 0.3rem;
  }
}
</style>
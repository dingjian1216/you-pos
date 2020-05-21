<template>
  <div class="teamDetails">
    <div class="top">
      <div class="head">
        <i class="iconfont icon-back" @click="$router.go(-1)"></i>
        <div>代理详情</div>
      </div>
      <div class="info">
        <img :src="data.picture" v-if="data.picture" alt class="avater" />
        <img src="../../assets/img/logo.png" class="avater" alt v-else />
        <div class="nickname">
          <p class="name">
            <span>{{data.nickname}}</span>
            <span>V{{data.level}}</span>
          </p>
          <p class="mobile">{{data.username}}</p>
        </div>
      </div>
      <div class="data-line flex">
        <div class="data-item right-border">
          <p>{{data.myTeam_sum_money}}</p>
          <span>累计兑换</span>
        </div>
        <div class="data-item right-border">
          <p>{{data.myTeam_sum_integral}}万</p>
          <span>累计积分</span>
        </div>
        <div class="data-item right-border">
          <p>{{data.leijixl_size}}</p>
          <span>累计销量</span>
        </div>
        <div class="data-item">
          <p>{{data.lingshou_size}}</p>
          <span>零售销量</span>
        </div>
      </div>
    </div>
    <div class="detail">
      <div class="detail-line flex">
        <div class="right-border">
          <p>
            <span>{{data.myTeam_size}}</span>
          </p>
          <p>总人数</p>
        </div>
        <div class="right-border">
          <p>
            <span>{{data.zt_size}}</span>
          </p>
          <p>直推人数</p>
        </div>
        <div class="right-border">
          <p>
            <span>{{data.jt_size}}</span>
          </p>
          <p>间推人数</p>
        </div>
        <div>
          <p>
            <span>{{data.jj_size}}</span>
          </p>
          <p>总机具</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as utils from "../../utils";
import * as apiHttp from "../../api/index";
export default {
  name: "teamDetails",
  data() {
    return {
      data: ""
    };
  },
  mounted() {
    this.getDetail(this.$route.query.id);
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
    getDetail(id) {
      apiHttp.getTeamDetall(id).then(res => {
        if (res.code === 1) {
          this.data = res.data;
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.teamDetails {
  text-align: center;
}
.head {
  position: absolute;
  width: 100%;
  top: 0.5rem;
  color: white;
  font-size: 0.4rem;
  line-height: 1.1rem;
  z-index: 1;
  i {
    position: absolute;
    left: 0.3rem;
  }
  div {
    text-align: center;
  }
}
.info {
  text-align: center;
  position: relative;
  background: url("../../assets/img/my/fansBg.png") no-repeat center;
  background-size: cover;
  color: white;
  padding-top: 1.8rem;
  .avater {
    width: 1.38rem;
    height: 1.38rem;
    border-radius: 50%;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    margin: 0rem auto;
  }
  .nickname {
    padding: 0.1rem 0;
    border-bottom: 1px solid #f7f7f7;
    .name {
      font-size: 0.3rem;
      span:nth-of-type(2) {
        height: 0.4rem;
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
    }
    .mobile {
      font-size: 0.3rem;
      margin-top: 0.1rem;
    }
  }
}
.data-line {
  background: white;
}
.detail {
  margin-top: 0.4rem;
  background: white;
  padding: 0.3rem;
  .number-line {
    display: flex;
    border-bottom: 1px solid #f7f7f7;
    padding-bottom: 0.3rem;
    > div {
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
  }
  .detail-line {
    padding-top: 0.3rem;
    > div {
      width: 25%;
      p {
        span {
          font-size: 0.4rem;
        }
      }
    }
  }
}
.right-border {
  box-sizing: border-box;
  border-right: 1px solid #eee;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.data-line {
  display: flex;
  padding: 0.3rem 0;
  > div {
    width: 25%;
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
      color: #ff5847;
      font-size: 0.3rem;
    }
  }
}
.tips {
  margin-top: 2rem;
  color: #999999;
}
</style>

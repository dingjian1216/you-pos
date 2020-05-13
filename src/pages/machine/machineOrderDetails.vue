<template>
  <div class="orderDetails">
    <div class="detailsBox">
      <div class="title">
        <span>订单金额</span>
        <span class="money">¥{{info.price}}</span>
      </div>
      <div class="list">
        <div class="item">
          <span>订单号</span>
          <span class="right">{{info.order_number}}</span>
        </div>
        <div class="item">
          <span>状态</span>
          <span class="warning" v-if="info['status'] == 1">待审核</span>
          <span class="danger" v-if="info['status'] == 2">已驳回</span>
          <span class="success" v-if="info['status'] == 3">已完成</span>
          <span class="danger" v-if="info['status'] == 4">初审通过待复审</span>
        </div>
        <div class="item">
          <span>商品</span>
          <span class="right">{{info.good_name}}</span>
        </div>
        <div class="item" v-if="info.voucher_money > 0">
          <span>奖金劵</span>
          <span class="right">{{info.voucher_money}}</span>
        </div>
        <div class="item">
          <span>消耗积分</span>
          <span v-if="info['show'] == 1" class="right">{{info.integral}}</span>
          <span v-else class="right">审核中</span>
        </div>
        <div class="item">
          <span>报单时间</span>
          <span class="right">{{info.create_time | formatDate}}</span>
        </div>
      </div>
      <div class="detailsPic" v-if="pic.length > 0 ">
        <div class="title">图片资料</div>
        <ul class="picBox">
          <li v-for="(vo, index) in pic" :key="index">
            <img :src="vo" alt />
          </li>
        </ul>
      </div>
      <div class="editor" v-show="info.editor">
        <div class="title">券码信息</div>
        <div class="text">{{info.good_name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import * as apiHttp from "../../api/index";
import store from "../../store";
import { CellFormPreview, Group, Cell } from "vux";
import { formatDate } from "../../plugin/data";
export default {
  components: {
    CellFormPreview,
    Group,
    Cell
  },
  data() {
    return {
      order_id: this.$route.query.id,
      info: "",
      sn: "",
      userName: "",
      daYinTime: '',
      pic: ''
    };
  },
   filters: {
    formatDate(time) {
      time = time * 1000;
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  mounted() {
    let that = this;
    apiHttp.machineDetail(this.order_id)
      .then(res => {
        if (res.code == 1) {
          this.info = res.data;
          this.pic = res.data.picture
        }
      });
  },
  methods: {

  }
};
</script>
<style lang="less">
.orderDetails {
  height: 100%;
  position: relative;
  box-sizing: border-box;
  .detailsBox {
    padding-top: 0.2rem;
    .title {
      padding: 0 0.3rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #757575;
      height: 0.88rem;
      border-bottom: 1px solid #eeeeee;
      .money {
        font-style: normal;
        font-size: 0.5rem;
        color: #000;
      }
    }
    .list {
      padding: 0.2rem 0;
      border-bottom: 1px solid #eeeeee;
      .item {
        padding: 0 0.3rem;
        height: 0.6rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.26rem;
        .success {
          color: #ffc107 !important;
        }
        .danger {
          color: #e51c23 !important;
        }
        .success {
          color: #009688 !important;
        }
        .right {
          color: #757575;
        }
      }
    }
    .detailsPic {
      .picBox {
        padding: 0.2rem 0.3rem;
        border-bottom: 1px solid #dddddd;
        overflow: hidden;
        li {
          width: 2.1rem;
          height: 2.1rem;
          margin-right: 0.2rem;
          margin-bottom: 0.2rem;
          float: left;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .editor {
      .text {
        color: #757575;
        padding: 0.2rem 0.3rem;
      }
    }
  }
}
</style>
<template >
  <div id="price">
    <div class="aui-card-list aui-text-center">
      <h3 class="title">积分兑换价格（单位：元/万）</h3>
      <table class="table" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th style="width: 20%;">银行名称</th>
            <th style="width: 15%;">用户价</th>
            <th style="width: 15%; color:#e65013">机主价</th>
            <th style="width: 15%;">审核周期</th>
            <th style="width: 15%;">起兑分</th>
          </tr>
        </thead>
        <tbody v-for="(vo, index) in list" :key="index">
          <tr v-for="(vo, index2) in vo['goods_list']" :key="index2" >
            <td>{{vo.name}}</td>
            <td>{{vo.hy_money}}</td>
            <td style="color:#e65013">{{vo.hj_money}}</td>
            <td>{{vo.settlement}}</td>
            <td>{{vo.rise}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import * as apiHttp from "../../api/index";
import { Group, Cell } from "vux";
import store from "../../store";
import { formatDate } from "../../plugin/data";
export default {
  components: {
    Group,
    Cell
  },
  data() {
    return {
      list: ""
    };
  },
  mounted() {
    apiHttp.gradeIndex().then(res => {
      if (res.code == 1) {
        this.list = res.data.list;
      }
    });
  }
};
</script>
<style lang="less">
#price .title {
  padding: 0.2rem;
  color: #e65013 !important;
  text-align: center;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table thead tr th,
.table tbody tr td {
  padding: 8px 0;
  text-align: center;
  color: #333;
  border: 1px solid #ddd;
  border-collapse: collapse;
  background-color: #fff;
  font-size: 0.2rem;
}
</style>
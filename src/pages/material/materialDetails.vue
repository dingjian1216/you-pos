<template>
  <div class="materialDetails">
    <div class="name">{{data.title}}</div>
    <p class="time">{{data.create_time | formatDate}}</p>
    <div class="content" v-html="data.content"></div>
  </div>
</template>
<script>
import * as apiHttp from "../../api/index";
import { formatDate } from "../../plugin/data";
export default {
  data(){
    return{
      data: ''
    }
  },
   filters: {
    formatDate(time) {
      time = time * 1000;
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm");
    }
  },
  mounted(){
    apiHttp.getKyDetail(this.$route.query.ky_id).then(res=>{
      if(res.code == 1){
        this.data = res.data
      }
    })
  }
}
</script>
<style lang="less" scoped>
.materialDetails{
  height: auto;
  padding: 0.3rem;
  .name{
    text-align: center;
    font-size: 0.36rem;
  }
  .time{
    color: #757575
  }
  .content{
    margin-top: 0.2rem;
  }
}
</style>
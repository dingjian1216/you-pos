<template>
  <div class="setting">
    <x-header :left-options="{showBack: false}">
      <a slot="left" @click="goBack()" class="backBox">
        <i class="iconfont icon-back"></i>
      </a>
      设置
      <span
        class="save"
        :style="{color: $store.state.global.theme.mainColor}"
        slot="right"
        @click="save()"
      >保存</span>
    </x-header>
    <div class="photo">
      <div :style="{backgroundImage: 'url(' + data.picture + ')'}" v-if="data.picture"></div>
      <div v-else></div>
      <p>ID：{{data.id + 1000}}</p>
      <span @click="handlePhoto(1)" :style="{background: $store.state.global.theme.mainColor}">更换头像</span>
    </div>
    <group>
      <!--  -->
      <x-input title="昵称：" placeholder="请输入昵称" v-model="data.nickname"  :show-clear='false' ></x-input>
      <cell title="绑定微信"  is-link  @click.native="bind" :value="data.openid ? '已绑定' : '未绑定'"></cell>
      <cell title="清除缓存" :value="size" is-link @click.native="show1 = size !== ''"></cell>
      <cell title="修改密码" value is-link link="/revise"></cell>
      <cell title="检查更新" :value="wgtVer" is-link @click.native="getVersion"></cell>
    </group>

    <div
      class="primary_btn"
      :style="{background: $store.state.global.theme.mainColor}"
      @click="layout"
    >退出登录</div>
    <!-- <div style="text-align:center;font-size:0.3rem;color:#757575">
      <p>Copyright @2017-2020</p>
      <p>三脉科技版权所有</p>
    </div> -->
    <p class="power" v-for="(item, index) of company" :key="index">{{item}}</p>
    <actionsheet v-model="show" :menus="menus" show-cancel @on-click-menu="click"></actionsheet>
    <confirm v-model="show1" @on-confirm="onConfirm" title="清除缓存">
      <p style="text-align:center;">清除媒体缓存？</p>
    </confirm>

        <!-- 后台添加更新 -->
    <div v-transfer-dom>
      <x-dialog v-model="showToast1" class="updateBox">
        <!--<div class="weui-mask"></div>-->
        <div class="update">
          <img src="../../assets/img/my/update.png" alt class="bg" />
          <div class="contentBox">
            <div class="add" v-if="version.remark">
              <p class="t">新版本特性</p>
              <p class="info">{{version.remark}}</p>
            </div>
            <div class="update_btn">
              <span @click="downWgt">立即升级</span>
            </div>
          </div>
        </div>
      </x-dialog>
    </div>


    <!-- 云修复 -->
    <div v-transfer-dom>
      <x-dialog v-model="showToast2" class="updateBox">
        <!--<div class="weui-mask"></div>-->
        <div class="update">
          <img src="../../assets/img/my/update.png" alt class="bg" />
          <div class="contentBox">
            <div class="add">
              <p class="t" v-if="smart && smart.extra">新版本特性</p>
              <p class="info" v-if="smart && smart.extra">{{smart.extra}}</p>
            </div>
            <div class="update_btn">
              <span @click="showToast2 = false">稍后提醒</span>
              <span @click="startSmart">立即升级</span>
            </div>
          </div>
        </div>
      </x-dialog>
    </div>
    <!-- 云修复成功 重启 -->
    <div v-transfer-dom>
      <x-dialog v-model="showToast3" class="updateBox">
        <!--<div class="weui-mask"></div>-->
        <div class="update">
          <img src="../../assets/img/my/update.png" alt class="bg" />
          <div class="contentBox">
            <div class="add">
              <p class="t" v-if="smart && smart.extra">新版本特性</p>
              <p class="info" v-if="smart && smart.extra">{{smart.extra}}</p>
            </div>
            <div class="update_btn">
              <span @click="reboot">立即重启</span>
            </div>
          </div>
        </div>
      </x-dialog>
    </div>

    <!-- 下载进度 -->
    <div v-transfer-dom>
      <x-dialog
        v-model="showToast4"
        :dialog-style="{'max-width': '100%', 'background-color': 'transparent'}"
        class="progressBox"
      >
        <div class="progressBg">
          <img src="../../assets/img/updateBox.png" alt />
          <span  class="prState">{{progressState}}</span>
          <x-progress :percent="percent" :show-cancel="false"></x-progress>
          <span class="title">新版本正在努力的更新中，请稍等</span>
        </div>
      </x-dialog>
    </div>
  </div>
</template>

<script>
import {
  Group,
  XInput,
  XHeader,
  Actionsheet,
  Cell,
  Confirm,
  XDialog,
  XProgress,
  TransferDomDirective as TransferDom
} from "vux";
import * as apiHttp from "../../api/index";
export default {
  name: "setting",
  components: {
    Group,
    XInput,
    XHeader,
    Actionsheet,
    Cell,
    Confirm,
    XDialog,
    XProgress
  },
  directives: {
    TransferDom
  },
  data() {
    return {
      name: "hello",
      info: "我很青春",
      menus: {
        menu1: "从相册选择一张",
        menu2: "拍照"
      },
      show: false,
      showCode: false,
      QRCode: "",
      show1: false,
      show2: false,
      avatar: "",
      data: this.$store.state.user.userInfo,
      showToast1: false,
      result: "",
      wgtVer: (window.api && api.appVersion) || "",
      size: "",
      wgtUrl: "",
      update: "",
      company:
        this.$store.state.user.userInfo &&
        this.$store.state.user.userInfo.web_icp
          ? this.$store.state.user.userInfo.web_icp.split(",")
          : [],
      showToast1: false, //后台提示更新
      showToast2: false,  //云修复
      showToast3: false,  // 修复成功描述 重启
      showToast4: false,  //下载进度
      percent: 0,
      version: '',
      smart: '',
      progressState: "准备中"
    };
  },
  inject: ["reload"],
  methods: {
    handlePhoto(val) {
      this.show = true;
      if (val === 1) {
        this.showCode = false;
      } else {
        this.showCode = true;
      }
    },
    click(key) {
      console.log(key);
      if (key === "menu1") {
        this.galleryImg();
      } else if (key === "menu2") {
        this.captureImage();
      }
    },
    save() {
      apiHttp.editAgent(this.data.nickname).then(response => {
        this.$store.commit("setUserInfo", this.data);
        this.$vux.toast.text("保存成功");
        this.$router.go(-1);
      });
    },
    // 从相册中选取图片
    galleryImg() {
      let This = this;
      api.getPicture(
        {
          sourceType: "album",
          mediaValue: "pic",
          destinationType: "base64",
          allowEdit: true,
          preview: true
        },
        function(ret, err) {
          if (ret && ret.data) {
            This.changePic(ret);
          } else {
            console.log(JSON.stringify(err));
          }
        }
      );
    },
    // 拍照
    captureImage() {
      let This = this;
      api.getPicture(
        {
          sourceType: "camera",
          mediaValue: "pic",
          destinationType: "base64",
          allowEdit: true,
          preview: true
        },
        function(ret, err) {
          console.log("拍照" + JSON.stringify(ret));
          if (ret && ret.data) {
            This.changePic(ret);
          } else {
            console.log(JSON.stringify(err));
          }
        }
      );
    },
    changePic(ret) {
      // apiHttp.editHeadPicture(files).then(response => {
      //   this.$store.commit("setUserInfo", this.data);
      //   this.$vux.toast.text("保存成功");
      //   this.$router.go(-1);
      // });
      let token = this.$store.state.user.token;
      let that = this;
      api.ajax(
        {
          url: 'https://kd.youxiangdui.net/agent/My/editHeadPicture?token=' + token,
          method: 'post',
          timeout: 30,
          data: {
            files: {
              file: ret.data
            }
          }
        },
        function(res, err) {
          if (res.code == 1) {
            that.$router.go(-1);
          } else {
            alert(err.msg);
          }
        }
      );
    },
    // 清除缓存
    onConfirm() {
      let that = this;
      console.log(that.size === "");
      if (that.size === "") {
        return;
      }
      api.clearCache(function() {
        that.size = "";
        api.toast({
          msg: "清除完成"
        });
      });
    },
    getSize() {
      let size = api.getCacheSize({
        sync: true
      });
      let kbCache = Math.round(Number(size) / 1024);
      if (kbCache < 1) {
        if (size) {
          this.size = size + "B";
        } else {
          this.size = "";
        }
      } else if (kbCache < 1024) {
        this.size = kbCache + "KB";
      } else {
        this.size = Math.round(Number(kbCache) / 1024) + "MB";
      }
    },

    getVersion () {
      let that = this
      this.$http.post('/login/checkVersion', {
        type: (api.systemType === 'android') ? 0 : 1,
        version: api.appVersion,
      }, false, true).then(res => {
        console.log(JSON.stringify(res))
        if (res.code === 1) {
          if(res.data == 0){
            let mam = api.require('mam')
            mam.checkSmartUpdate(function (ret, err) {
              if (ret && ret.packages.length > 0) {
                // 返回的结果有可能会空数组
                if (ret.packages[0].silent) {
                  that.smart = ret.packages[0]
                  mam.startSmartUpdate(function (ret, err) {
                    if (ret.state === 3) {
                      if (that.smart && that.smart.extra) {
                        api.addEventListener({
                          name: 'smartupdatefinish'
                        }, function (ret, err) {
                          that.showToast3 = true
                        })
                      }
                    } else {
                      console.log(JSON.stringify(err))
                    }
                  })
                } else {
                  that.showToast2 = true
                  that.smart = ret.packages[0]
                }
              }else{
                that.$vux.toast.text('当前已是最新版本')
              }
            })
          }else{
            this.version = res.data
            this.showToast1 = true
          }
        }
      })
    },
    downWgt() {
      let that = this;
      if (api.systemType === "android") {
        this.showToast1 = false;
        that.showToast4 = true;
        api.download(
          {
            url: that.version.src,
            report: true
          },
          function(ret, err) {
            if (ret && ret.state === 0) {
              that.percent = parseInt(ret.percent);
              // that.perCon = parseInt(ret.percent) + '%'
              that.progressState = "下载中" + that.percent + "%";
            }
            if (ret && ret.state === 1) {
              that.progressState = "安装中";
              let savePath = ret.savePath;
              api.installApp({
                appUri: savePath
              });
            }
          }
        );
      }
      if (api.systemType === "ios") {
        api.installApp({
          appUri: that.version.src
        });
      }
    },
    startSmart() {
      let that = this;
      let mam = api.require("mam");
      mam.startSmartUpdate(function(ret, err) {
        if (ret) {
          that.showToast2 = false;
          that.showToast4 = true;
          that.percent = parseInt(ret.progress);
          console.log(that.percent);
          if (ret.state === 0) {
            that.progressState = "准备中" + that.percent + "%";
          } else if (ret.state === 1) {
            that.progressState = "下载中" + that.percent + "%";
          } else if (ret.state === 2) {
            that.progressState = "解压中" + that.percent + "%";
          } else if (ret.state === 3) {
            api.rebootApp();
          } else if (ret.state === 4) {
            that.showToast4 = false;
          }
        } else {
          console.log(JSON.stringify(err));
        }
      });
    },
    reboot() {
      api.rebootApp();
    },
    bind () {
      if (this.data.openid) {
        this.$vux.toast.text("已绑定过微信");
      } else {
        this.$router.push('/binding')
      }
    },
    layout() {
      this.$store.commit("logout");
      this.reload();
      this.$router.replace("/wechatLogin");
    }
  },
  created() {
    this.getSize();
  }
};
</script>

<style lang="less">
@import "../../assets/less/common";
.progressBox {
  .weui-dialog {
    border-radius: 0;
  }
  .weui-progress__bar {
    height: 4px;
    border-radius: 2px;
  }
  .weui-progress__inner-bar {
    background: @theme-col;
    border-radius: 2px;
  }
  .title {
    display: block;
  }
}
.setting {
  .weui-cells {
    margin-top: 0;
    font-size: 12px;
    .weui-cell {
      padding: 10px 15px !important;
    }
    .weui-cell:before {
      right: 15px;
    }
    .weui-input {
      font-size: 14px;
      color: #999;
    }
    .weui-label {
      font-size: 14px;
    }
    /*.weui-cell__bd{*/
    /*display: flex;*/
    /*}*/
  }
  .weui-cells:after,
  .weui-cells:before {
    left: 15px;
    right: 15px;
  }
  .weui-mask {
    background: rgba(0, 0, 0, 0.4);
  }
  .weui-actionsheet_toggle {
    bottom: 30px;
    width: 90%;
    left: 5%;
    background: none;
    .weui-actionsheet__menu {
      border-radius: 5px;
    }
    .weui-actionsheet__action {
      border-radius: 5px;
    }
    .vux-actionsheet-menu-default {
      color: #666;
      font-size: 0.28rem;
    }
    .weui-actionsheet__cell {
      font-size: 0.3rem;
    }
  }
}
</style>
<style scoped lang="less">
@import "../../assets/less/common";
// @import "../../assets/mall/style/_Variables";
.setting {
  height: 100%;
  background: #fff;
  .power {
    text-align: center;
    font-size: 0.3rem;
    color: #999;
  }
  .vux-header {
    position: relative !important;
  }
  .photo {
    display: flex;
    height: 1.54rem;
    align-items: center;
    padding: 0 0.3rem;
    div {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      background-image: url("../../assets/img/my/avater.png");
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
    p {
      margin-left: 0.5rem;
      font-size: 0.28rem;
      flex: 1;
    }
    span {
      color: #fff;
      width: 1.87rem;
      height: 0.67rem;
      text-align: center;
      line-height: 0.67rem;
      font-size: 0.3rem;
      border-radius: 0.05rem;
    }
  }
  .uploadingLogo {
    height: 2.4rem;
    background: #ffffff;
    padding: 0 0.3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 1.87rem;
      height: 1.87rem;
    }
    p {
      // color: @font-main-color;
      // font-size: @font-big;
      text-align: left;
    }
  }
}
</style>

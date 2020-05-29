<template name="popup">
  <view @touchmove.stop.prevent="clear" v-if="showPopup">
    <view class="popup_mask" @touchmove.stop.prevent="clear"></view>
    <view class="popup_content">
      <view class="title">{{ title }}</view>
      <view class="explain_text">
        请你务必认真阅读、充分理解“服务协议”和“隐私政策”各条款，包括但不限于：为了向你提供数据、分享等服务所要获取的权限信息。
        <view class="line">
          你可以阅读<span
            class="path"
            hover-class="navigator-hover"
            @tap="showProtocol(0)"
            >《服务协议》</span
          >
          和<span
            class="path"
            hover-class="navigator-hover"
            @tap="showProtocol(1)"
            >《隐私政策》</span
          >了解详细信息。如您同意，请点击"同意"开始接受我们的服务。
        </view>
      </view>

      <view class="button">
        <view class="back" @tap="back">暂不使用</view>
        <view class="consent" @tap="consent">同意</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "popup",
  props: {
    title: {
      type: String,
      default: "服务协议和隐私政策",
    },
    // 协议路径
    protocolPath: {
      type: String,
    },
    // 政策路径
    policyPath: {
      type: String,
    },
    // 协议内容
    protocolText: {
      type: String,
    },
    // 政策内容
    policyText: {
      type: String,
    },
  },
  data() {
    return {
      showPopup: true,
    };
  },
  methods: {
    // 禁止滚动
    clear() {
      return;
    },
    back() {
      this.$emit("popupState", false);
      // // #ifdef APP-PLUS
      // plus.runtime.quit();
      // // #endif
    },
    // 关闭弹框
    consent() {
      this.showPopup = false;
      this.$emit("popupState", true);
    },

    //展示协议内容
    showProtocol(type) {
      var text = this.protocolText;
      var title = "服务协议";
      if (type == 1) {
        text = this.policyText;
        title = "隐私政策";
      }
      uni.showModal({
        title: title,
        content: text,
        showCancel: false,
        confirmText: "我知道了",
        success: function (res) {
          // if (res.confirm) {
          // 	console.log('用户点击确定');
          // } else if (res.cancel) {
          // 	console.log('用户点击取消');
          // }
        },
      });
    },
  },
};
</script>

<style lang="less">
.popup_mask {
  position: fixed;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  transition-property: opacity;
  transition-duration: 0.3s;
  opacity: 0;
  z-index: 98;
}

.popup_mask {
  opacity: 1;
}

.popup_content {
  overflow: hidden;
  box-sizing: border-box;
  padding: 40upx 20upx 0 20upx;
  position: fixed;
  bottom: 30%;
  border-radius: 8px;
  left: 50%;
  margin-left: -40%;
  right: 0;
  min-height: 400upx;
  background: #ffffff;
  width: 80%;
  z-index: 99;

  .title {
    text-align: center;
    font-size: 34upx;
    padding: 10upx 0 0 0;
  }

  .explain_text {
    font-size: 30upx;
    padding: 30upx 30upx 40upx 30upx;
    line-height: 38upx;
    // text-indent: 50upx;
    .line {
      display: block;

      .path {
        color: #007aff;
        display: inline-block;
        text-align: center;
      }
    }
  }

  .button {
    display: flex;
    padding: 20upx;
    align-items: center;
    font-size: 34upx;
    justify-content: space-around;
    border-top: 1upx solid #f2f2f2;

    view {
      text-align: center;
    }
  }
}
</style>

<template>
  <view class="RW-order">
    <view
      :scroll-y="modalName == null"
      class="page"
      :class="modalName != null ? 'show' : ''"
    >
      <view v-for="item in list" :key="item.orderId">
        <view class="cu-bar bg-white solid-bottom margin-top">
          <view class="action">
            <text
              :class="'cuIcon-title text-' + mapOrderColor(item.status)[0]"
            ></text>
            {{ mapOrderColor(item.status)[1] }}
          </view>
        </view>
        <view class="cu-list menu-avatar RW-order-list">
          <view class="cu-item cur">
            <view class="content RW-content">
              <view>
                <view class="text-cut">{{ item.location }}</view>
              </view>
              <view class="text-gray text-sm flex">
                <view class="text-cut">
                  {{ item.receiverName }} 辅导 {{ item.initiatorName
                  }}<text
                    class="cuIcon-locationfill text-orange margin-right-xs"
                  ></text>
                </view>
                {{ formatSubject(item.subject) }} {{ item.duration }}小时
              </view>
            </view>
            <view class="action actionbox">
              <view class="text-grey text-xs RW-nowrap">{{ item.createTime }}</view>
              <view class="cuIcon-coin text-orange">{{ item.cost }}</view>
            </view>
          </view>
          <view class="RW-button-group">
            <button
              class="RW-button-item bg-grey"
              v-if="item.status == 0 && role == 1"
              @click="changeOrderState(4, item.orderId)"
            >
              取消
            </button>
            <button
              class="RW-button-item RW-bg-blue"
              v-if="item.status == 0 && role == 1"
              @click="changeOrderState(1, item.orderId)"
            >
              接受
            </button>
            <button
              class="RW-button-item RW-bg-blue"
              v-if="item.status == 1 && role == 0"
              @click="changeOrderState(2, item.orderId, item.cost)"
            >
              去支付
            </button>
            <button
              class="RW-button-item RW-bg-blue"
              v-if="item.status == 2 && role == 0"
              @click="changeOrderState(3, item.orderId)"
            >
              完成
            </button>
						<button
              class="RW-button-item RW-bg-orange"
              @click="toDetail(0, item.orderId)"
            >
              评价
            </button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      modalName: null,
      skin: false,
      list: [],
      orderState: [
        "老师未同意",
        "老师已同意",
        "订单已完成",
        "老师已拒绝",
        "订单已撤销"
      ],
      subject: [
        "语文",
        "数学",
        "英语",
        "物理",
        "化学",
        "生物",
        "政治",
        "历史",
        "地理"
      ],
      role: uni.getStorageSync("userInfo").role
    };
  },
  onLoad() {
  },
  onShow() {
    this.getList();
  },
  onPullDownRefresh() {
    this.list = [];
    this.getList();
  },
  methods: {
    getList() {
      var _this = this;
      this.list = [];
      this.RWajax.get("/mine/query", {
        account: uni.getStorageSync("account"),
        type: 2
      })
        .then(res => {
          console.log(res);
          res.data.result.sort((a, b) => {
            if (a.state > b.state) {
              return 1;
            } else {
              return -1;
            }
          });
          _this.list = res.data.result;
        })
        .catch(res => {})
        .finally(res => {
          uni.stopPullDownRefresh();
        });
    },
    formatSubject(index) {
      return this.subject[index];
    },
	toDetail(type,exdata){
		console.log(exdata);
		if(type==0){
			uni.navigateTo({
			  url: "./valuation?orderId="+exdata
			});
		}
	},
    changeOrderState(state, orderId, cost) {
      var _this = this;
      var tag = 0; //标志位
      if (state == 2) {
        var balance = uni.getStorageSync("balance");
        var cost = cost;
        if (cost > balance) {
          tag = 1;
          uni.showModal({
            title: "余额不足！",
            content: "点击确认前往充值",
            success: function(res) {
              if (res.confirm) {
                uni.navigateTo({
                  url: "../../recharge/RWrechart/RWrechart"
                });
              } else if (res.cancel) {
              }
            }
          });
        }
      }
      if (tag == 0) {
        this.RWajax.post("/order/status/update", {
          status: state,
          orderId: orderId
        })
          .then(res => {
            uni.showToast({
              title: "操作成功"
            });
            _this.getList();
          })
          .catch(res => {});
      }
    },
    mapOrderColor(status) {
      if (status == 0 || status == 1 || status == 2) {
        return ["orange", "进行中"];
      } else if (status == 3) {
        return ["gray", "进行中"];
      } else {
        return ["green", "已完成"];
      }
    },
    mapOrderColor2(status) {
      if (status == 0 || status == 1 || status == 2) {
        return "orange";
      } else if (status == 3) {
        return "green";
      } else {
        return "gray";
      }
    }
  }
};
</script>

<style>
.page {
  height: 100vh;
  width: 100vw;
}

.page.show {
  overflow: hidden;
}

.switch-sex::after {
  content: "\e716";
}

.switch-sex::before {
  content: "\e7a9";
}

.switch-music::after {
  content: "\e66a";
}

.switch-music::before {
  content: "\e6db";
}

.RW-order .RW-content {
  position: absolute;
  left: 20px !important;
  width: calc(100% - 48px - 30px - 60px - 10px);
  line-height: 1.6em;
}

.RW-button-group {
  /* display: flex; */
  padding: 10upx 0;
  overflow: hidden;
  background-color: #ffffff;
/*  align-items: center;
	flex-direction:column-reverse;
  justify-content: flex-end; */
}

.RW-button-item {
  padding:5upx 20upx;
  margin-right: 30upx;
  font-size: 14px;
  line-height: 20px;
  border-radius: 10px;
  float: right;
}

.RW-order-list {
  /* margin-top: 2px; */
}

.RW-bg-blue {
  background-color: rgb(65, 145, 234);
  color: white;
}
.RW-bg-orange{
  background-color: #fff;
	border: 1px solid orange;
	color: orange;
	
}

.RW-nowrap{
	white-space:nowrap;
}

.actionbox{
	width: unset !important;
	text-align: right !important;
}
</style>

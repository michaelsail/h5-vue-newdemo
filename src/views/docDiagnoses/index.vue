<template>
  <div class="docDiagnoses" v-title data-title="转诊/会诊">
    <!-- 顶部 -->
    <div class="nav textc typo_white">
      <span class="absolute left10" @click="closePage">
        <i class="iconfont fs18 lh45px">&#xe688;</i>
      </span>
      <span class="fs18 typo_bold lh45px">转诊/会诊</span>
      <span class="absolute right15 h45 pt10" @click="instructions">
        <!-- <i class="iconfont fs22 lh45px">&#xe661;</i> -->
        <img src="./image/request.png" alt="" class="w24" />
      </span>
    </div>
    <div class="h43px"></div>
    <div class="top_icon ">
      <div class="top_icon_inner">
        <div class="textc flex1" @click="goConsultant">
          <img src="./image/top_icon_6.png" alt="" class="mb20" />
          <div class="fs14 typo_white lh16">发起会诊</div>
        </div>
        <div class="textc flex1" @click="goMyCollect">
          <img src="./image/top_icon_7.png" alt="" class="mb20" />
          <div class="fs14 typo_white lh16">我的收藏</div>
        </div>
        <div class="textc flex1" @click="goDiagData">
          <img src="./image/top_icon_8.png" alt="" class="mb20" />
          <div class="fs14 typo_white lh16">会诊数据</div>
        </div>
        <div class="textc flex1" @click="goConfig">
          <img src="./image/top_icon_9.png" alt="" class="mb20" />
          <div class="fs14 typo_white lh16">服务配置</div>
        </div>
        <!-- <div class="textc flex1" @click="instructions">
          <img src="./image/top_icon_4.png" alt="" class="mb20" />
          <div class="fs14 typo_white lh16">操作指南</div>
        </div> -->
      </div>
      <div class="round_bot"></div>
    </div>
    <van-sticky z-index="100" :offset-top="45">
      <Tab ref="tab" :tabs="tabs" @tabChange="tabChange" />
    </van-sticky>
    <template v-if="curtab == 'hall'">
      <ServiceHall ref="ServiceHall"/>
    </template>
    <template v-if="curtab == 'apply'">
      <ApplyOrder ref="ApplyOrder" />
    </template>
    <template v-if="curtab == 'received'">
      <ReceivedOrder ref="ReceivedOrder" />
    </template>
    <template v-if="curtab == 'checkout'">
      <CheckoutOrder ref="CheckoutOrder" />
    </template>
  </div>
</template>
<script>

import {
  pullServiceConf,
  closeWebView,
  titleLucency,
  pullOtherUrl,
  setStatusBarColor,
  pullConsultant
} from '@/mixins/pullNativeFunc'
// const Tab = () => import('./components/tab')
import Tab from './components/tab'
// 功能组件
const ServiceHall = () => import('./components/serviceHall')
const ApplyOrder = () => import('./components/apply_order')
const ReceivedOrder = () => import('./components/received_order')
const CheckoutOrder = () => import('./components/checkout_order')
export default {
  mixins: [pullServiceConf, closeWebView, titleLucency, pullOtherUrl, setStatusBarColor, pullConsultant],
  components: { Tab, ServiceHall, ApplyOrder, ReceivedOrder, CheckoutOrder },
  data() {
    return {
      curtab: 'hall',
      tabs: [
        {
          id: 'hall',
          name: '服务大厅'
        },
        {
          id: 'apply',
          name: '我发起的'
        },
        {
          id: 'received',
          name: '我接收的'
        },
        {
          id: 'checkout',
          name: '检验检查'
        }
      ]
    }
  },
  async created() {
    this.$nextTick(()=>{
      this.setStatusBarColor('#009ee6')
    })
  },
  mounted() {
    this.titleLucency() // 隐藏导航栏
    this.$nextTick(() => {
      if (this.$route.query.curtab == 'apply') {
        this.curtab = 'apply'
        this.$refs.tab.changeTab(1)
      }
      if (this.$route.query.curtab == 'received') {
        this.curtab = 'received'
        this.$refs.tab.changeTab(2)
      }
    })
    // 赋值刷新
    var that = this
    if(this.curtab == 'hall'){
      window.webViewWillAppear = () => {
        if(that.$refs.ServiceHall.checkTab=="doc"){
            that.$refs.ServiceHall.diagPage = 1
            that.$refs.ServiceHall.docList = []
            that.$refs.ServiceHall.finished = false
            that.$refs.ServiceHall._getHalldoctor()
        }else {
          that.$refs.ServiceHall.checkPage = 1
          that.$refs.ServiceHall.checkList = []
          that.$refs.ServiceHall.finished = false
          that.$refs.ServiceHall._getHallCheck()
        }
      }
    }
  },
  methods: {
    closePage() {
      this.closeWebView()
    },
    goConsultant() {
      this.pullConsultant()
    },
    instructions() {
      this.pullOtherUrl('https://wap.91160.com/diycms/index.html?page_id=10697')
      // this.$toast('此功能暂未开放')
    },
    goConfig() {
      this.pullServiceConf()
    },
    goMyCollect() {
      this.$router.push('./collectIndex')
    },
    goDiagData() {
      this.$router.push('./diagnosesData')
    },
    tabChange(index) {
      this.curtab = this.tabs[index].id
      // 赋值刷新
      var that = this
    if(this.curtab == 'hall'){
      window.webViewWillAppear = () => {
        if(that.$refs.ServiceHall.checkTab=="doc"){
            that.$refs.ServiceHall.diagPage = 1
            that.$refs.ServiceHall.docList = []
            that.$refs.ServiceHall.finished = false
            that.$refs.ServiceHall._getHalldoctor()
        }else {
          that.$refs.ServiceHall.checkPage = 1
          that.$refs.ServiceHall.checkList = []
          that.$refs.ServiceHall.finished = false
          that.$refs.ServiceHall._getHallCheck()
        }
      }
    }
    if(this.curtab == 'apply'){
      window.webViewWillAppear = () => {
        that.$refs.ApplyOrder.page = 1
        that.$refs.ApplyOrder.orderList = []
        that.$refs.ApplyOrder.finished = false
        that.$refs.ApplyOrder._get_apply_order()
      }
    }
    if(this.curtab == 'received'){
      window.webViewWillAppear = () => {
        that.$refs.ReceivedOrder.page = 1
        that.$refs.ReceivedOrder.orderList = []
        that.$refs.ReceivedOrder.finished = false
        that.$refs.ReceivedOrder._get_received_order()
      }
    }
    if(this.curtab == 'checkout'){
      window.webViewWillAppear = () => {
        that.$refs.CheckoutOrder.page = 1
        that.$refs.CheckoutOrder.orderList = []
        that.$refs.CheckoutOrder.finished = false
        that.$refs.CheckoutOrder._get_reference_order()
      }
    }
    }
  },
  beforeDestroy(){
    this.setStatusBarColor('#ffffff')
    window.webViewWillAppear = () => {}
  }
}
</script>
<style scoped lang="scss">
.docDiagnoses {
  position: relative;
  background-color: #fff;
  min-height: 100vh;
  width: 100%;
  .nav {
    position: fixed;
    top: 0;
    z-index: 9999;
    height: 45px;
    width: 100%;
    background-color: #009ee6;
  }
  .h45px {
    height: 45px;
  }
  .h43px {
    height: 43px;
    background-color: #009ee6;
  }
  .lh45px {
    line-height: 45px;
  }
  .top_icon {
    position: relative;
    // background-color: #009ee6;
    background: url('//wximg.91160.com/wechat/img/common/huiyi_bg.png') no-repeat scroll bottom left/cover;
    .top_icon_inner {
      display: flex;
      padding: 0.8rem 0;

      img {
        width: .96rem;
        height: .96rem;
      }
    }

    .round_bot {
      position: absolute;
      width: 100%;
      height: 0.266667rem;
      background-color: #fff;
      border-top-left-radius: 0.266667rem;
      border-top-right-radius: 0.266667rem;
      bottom: 0;
    }
  }
}
</style>

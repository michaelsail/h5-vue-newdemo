<template>
  <div class="bg_white">
    <van-sticky>
    <CheckFilterBar @update="changeFilterCheck"  />
    </van-sticky>
    <div>
      <div>
        <van-list
        v-if="checkList.length > 0"
        v-model="loading"
        :finished="finished"
        finished-text="亲，已显示全部了哦~"
        loading-text="努力加载中..."
        offset="50"
        @load="onCheckLoad"
        :immediate-check="false"
      >
        <div v-for="(item, index) in checkList" :key="index">
          <CheckoutItem :checkItem="item" :isHall="false" :isFilterIndex='true'/>
        </div>
      </van-list>
      <NoData v-if="finished && checkList.length == 0" :height="height" top="20%" img_width="3.6rem" img_height="3.6rem" />
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import service from '_services/'
const CheckFilterBar = () => import('./components/checkFilterBar')
const CheckoutItem = () => import('./components/checkoutItem')
const NoData = () => import('@/components/noData')
export default {
  data(){
    return {
      checkList: [],
      loading: false,
      finished: false,
      checkPage: 1,
      // 筛选器参数
     checkExtraParams: {
        city_id: '',
        sort_type: 0
      },
      height: '100vh'
    }
  },
  components: {CheckFilterBar, CheckoutItem, NoData},
  mounted(){
     this._getHallCheck()
     this.$nextTick(() => {
        this.height = $('body').height() - 48 + 'px'
      })
  },
  methods: {
     onCheckLoad() {
      this.checkPage++
      this._getHallCheck()
    },
    // 检验检查
    changeFilterCheck(params){
      this.checkExtraParams = params
      this.checkPage = 1
      this.checkList = []
      this.finished = false
      this._getHallCheck()
    },
    _getHallCheck() {
      service.docDiagnoses
        .getInspectionList({
          page: this.checkPage,
          size: 10,
          account_user_id: this.account_user_id,
          ...this.checkExtraParams
        })
        .then((res) => {
          console.log(res)
          this.loading = false
          if (!res.data) {
            this.finished = true
            return
          }
          this.checkList = this.checkList.concat(res.data.list)
          if (res.data.length == 0) {
            this.finished = true
          }
        })
    },
  }
}
</script>
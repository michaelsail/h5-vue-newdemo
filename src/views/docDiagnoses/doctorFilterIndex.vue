<template>
  <div class="bg_white">
    <van-sticky>
    <DiagFilterBar @update="changeFilterDiag"  />
    </van-sticky>
    <div>
      <div>
        <van-list
        v-if="docList.length > 0"
        v-model="loading"
        :finished="finished"
        finished-text="亲，已显示全部了哦~"
        loading-text="努力加载中..."
        offset="50"
        @load="onDocLoad"
        :immediate-check="false"
      >
        <div v-for="(item, index) in docList" :key="index">
          <HallDocItem :docItem="item" :isFilterIndex='true' :isHall='false'/>
        </div>
      </van-list>
      <NoData v-if="finished && docList.length == 0" :height="height" top="20%" img_width="3.6rem" img_height="3.6rem" />
      </div>
    </div>
  </div>
</template>
<script>
import $ from 'jquery'
import service from '_services/'
const DiagFilterBar = () => import('./components/diagFilterBar')
const HallDocItem = () => import('./components/hallDocItem')
const NoData = () => import('@/components/noData')
export default {
  data(){
    return {
      docList: [],
      loading: false,
      finished: false,
      diagPage: 1,
      // 筛选器参数
      diagExtraParams: {
        city_id: '',
        cat_no1: '',
        cat_no2: '',
        sort_type: 0
      },
      height: '100vh'
    }
  },
  components: {DiagFilterBar, HallDocItem, NoData},
  mounted(){
     this._getHalldoctor()
     this.$nextTick(() => {
        this.height = $('body').height() - 48 + 'px'
      })
  },
  methods: {
    onDocLoad() {
      this.diagPage++
      this._getHalldoctor()
    },
    // 医生会诊
    changeFilterDiag(params) {
      this.diagExtraParams = params
      this.diagPage = 1
      this.docList = []
      this.finished = false
      this._getHalldoctor()
    },
    _getHalldoctor() {
      service.docDiagnoses
        .getHalldoctor({
          page: this.diagPage,
          size: 10,
          account_user_id: this.account_user_id,
          ...this.diagExtraParams
        })
        .then((res) => {
          console.log(res)
          this.loading = false
          if (!res.data) {
            this.finished = true
            return
          }
          if(this.diagPage==1){
            this.docList = res.data
          }else {
             this.docList = this.docList.concat(res.data)
          }
          if (res.data.length == 0) {
            this.finished = true
          }
        })
    },
  }
}
</script>
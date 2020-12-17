<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      :immediate-check="false"
      finished-text=""
      offset="50"
      @load="onLoad"
    >
      <div v-for="(item, index) in cateList" :key="index">
        <CheckoutItem :isHall="false" :checkItem="item" />
      </div>
    </van-list>
    <NoData v-if="finished && cateList.length == 0" text="无搜索结果" :height="noDataHeight"/>
  </div>
</template>
<script>
import $ from 'jquery'
import service from '_services/'
const CheckoutItem = () => import('./checkoutItem')
const NoData = () => import('@/components/noData')
export default {
  data () {
    return {
      cateList: [],
      page: 1,
      loading: false,
      finished: false,
      noDataHeight: '100vh',
    }
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  mounted(){
    this._get_search_inspection()
    this.$nextTick(()=>{
      this.noDataHeight = (document.body.clientHeight - $('.van-sticky').height()) + 'px'
    })
  },
  components: { CheckoutItem, NoData },
  methods: {
    onLoad() {
      if (this.value) {
        this.page++
        this._get_search_inspection()
      } else {
        this.loading = false
      }
    },
    _get_search_inspection() {
      service.docDiagnoses
        .get_search_inspection({
          keywords: this.value,
          page: this.page,
          size: 10,
          account_user_id: this.account_user_id
        })
        .then((res) => {
          this.cateList = this.cateList.concat(res.data)
          console.log(4444);
          
          console.log(this.cateList);
          
          this.loading = false
          if (res.data.length == 0 || res.data.length < 10) {
            this.finished = true
          }
        })
    }
  },
}
</script>
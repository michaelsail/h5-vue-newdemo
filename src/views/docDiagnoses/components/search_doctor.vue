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
      <div v-for="(item, index) in docList" :key="index">
        <HallDocItem :isHall="false" :docItem="item" />
      </div>
    </van-list>
    <NoData v-if="finished && docList.length == 0" text="无搜索结果" :height="noDataHeight"/>
  </div>
</template>
<script>
import $ from 'jquery'
import service from '_services/'
const HallDocItem = () => import('./hallDocItem')
const NoData = () => import('@/components/noData')
export default {
  data () {
    return {
      docList: [],
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
    this.get_result()
    this.$nextTick(()=>{
      this.noDataHeight = (document.body.clientHeight - $('.van-sticky').height()) + 'px'
    })
  },
  components: { HallDocItem, NoData },
  methods: {
    onLoad() {
      if (this.value) {
        this.page++
        this.get_result()
      } else {
        this.loading = false
      }
    },
    get_result() {
      service.docDiagnoses
        .get_search({
          keywords: this.value,
          page: this.page,
          size: 10,
          account_user_id: this.account_user_id
        })
        .then((res) => {
          this.docList = this.docList.concat(res.data)
          this.loading = false
          if (res.data.length == 0 || res.data.length < 10) {
            this.finished = true
          }
        })
    }
  },
}
</script>
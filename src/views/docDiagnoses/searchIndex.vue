<template>
  <div class="searchIndex bg_white" v-title data-title="搜索">
    <van-sticky>
      <form action="/">
        <van-search v-model="value" shape="round" show-action placeholder="搜索医生以及诊疗服务" @search="onSearch" @cancel="onCancel" @clear="onClear" />
      </form>
      <van-tabs @click="clickTab" v-model="active" v-if="active != -1">
        <van-tab v-for="item in tabs" :key="item.id" :title="item.name">
        </van-tab>
      </van-tabs>
    </van-sticky>
    <!-- 综合 -->
    <div v-if="active==0">
      <template v-if="doctorsList.length>0">
        <div class="h45 pt18 pl15 pr15 fs14 bg_f7">
          <span>医生</span>
          <span class="typo_blue fr" @click="more(1)">查看更多 <i class="iconfont">&#xe6ae;</i></span>
        </div>
        <div v-for="(item, index) in doctorsList" :key="index">
          <HallDocItem :isHall="false" :docItem="item" />
        </div>
      </template>
      <template v-if="marketsList.length>0">
        <div class="h45 pt18 pl15 pr15 fs14 bg_f7">
          <span>项目</span>
          <span class="typo_blue fr" @click="more(2)">查看更多 <i class="iconfont">&#xe6ae;</i></span>
        </div>
        <div v-for="(item) in marketsList" :key="item.id">
          <CheckoutItem :isHall="false" :checkItem="item" />
        </div>
      </template>
      <NoData v-if="doctorsList.length == 0 && marketsList.length == 0" text="无搜索结果" :height="noDataHeight"/>
    </div>
    <!-- 医生 -->
    <searchDoctor v-if="active==1" :value="value" />
    <!-- 会诊 -->
    <searchCate v-if="active==2" :value="value" />
  </div>
</template>
<script>
  import $ from 'jquery'
  import { titleLucency } from '@/mixins/pullNativeFunc'
  import service from '_services/'
  import { log } from 'util'
  const tab = () => import('./components/tab')
  const searchDoctor = () => import('./components/search_doctor')
  const searchCate = () => import('./components/search_cate')
  const HallDocItem = () => import('./components/hallDocItem')
  const CheckoutItem = () => import('./components/checkoutItem')
  const NoData = () => import('@/components/noData')
  export default {
    mixins: [titleLucency],
    components: { tab, searchDoctor, HallDocItem, CheckoutItem, searchCate, NoData },
    data() {
      return {
        value: '',
        active: -1,
        tabs: [{
            id: '1',
            name: '综合'
          },
          {
            id: '2',
            name: '医生'
          },
          {
            id: '3',
            name: '项目'
          }
        ],
        doctorsList: [],
        marketsList: [],
        noDataHeight: '100vh',
      }
    },
    mounted() {
      this.titleLucency()
      this.$nextTick(() => {
        $('.van-field__control').focus()
        this.noDataHeight = (document.body.clientHeight - $('.van-sticky').height()) - 44 + 'px'
      })

    },
    methods: {
      more(index) {
        this.active = index
      },
      clickTab(index) {
        this.active = index
      },
      onSearch(val) {
        this.get_search_all(val)
      },
      onCancel() {
        this.$router.push('./index')
      },
      onClear() {
        this.doctorsList = []
        this.marketsList = []
        this.active = -1
      },
      get_search_all(val) {
        service.docDiagnoses
          .get_search_all({
            keywords: val,
            page: this.page,
            size: 10,
            account_user_id: this.account_user_id
          })
          .then((res) => {
            this.active = 0
            this.doctorsList = res.data.doctors.list.slice(0, 4)
            this.marketsList = res.data.markets.list.slice(0, 4)
          })
      }
    }
  }
</script>
<style lang="scss">
  .searchIndex {
    .van-tabs {
      .van-tabs__line {
        width: 1.333333rem !important;
        background: linear-gradient(90deg, rgba(0, 158, 230, 1) 0%, rgba(33, 131, 255, 1) 100%);
      }

      .van-tab--active {
        .van-tab__text {
          color: #009EE6;
        }
      }
    }

    .van-search__action {
      color: #009EE6;
    }

    .van-search__content {
      background-color: #eee;
      height: .906667rem;
      border-radius: .453333rem;
    }

    .van-icon-search::before {
      content: '\e725';
      font-family: "iconfont";
      color: #999;
      margin-left: .213333rem;
    }

    .van-field__left-icon {
      margin-right: .213333rem;
    }

    .van-field__control {
      margin-top: .053333rem;
    }

    .van-cell {
      padding-top: .08rem;
    }
  }
</style>
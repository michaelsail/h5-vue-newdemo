<template>
  <div>
    <div class="diagnoses_doc" :style="'min-height:' + height">
      <van-list v-model="loading" :finished="finished" :finished-text="getNoDataTip" offset="50" @load="onLoad" :immediate-check="false">
        <!-- 会诊中 -->
        <div v-for="(item, index) in orderList" :key="index" class="bg_white mb16 boradius4 box_show hidden" @click="goOrder(item.order_id)">
          <div class="top">
            <img v-if="item.state==0" src="../image/order_status_6.png" alt="" class="w16 h16 mr5 fl mt12">
            <img v-if="item.state==1" src="../image/order_status_1.png" alt="" class="w16 h16 mr5 fl mt12">
            <img v-if="item.state==2" src="../image/order_status_3.png" alt="" class="w16 h16 mr5 fl mt12">
            <img v-if="item.state==3" src="../image/order_status_4.png" alt="" class="w16 h16 mr5 fl mt12">
            <img v-if="item.state==4" src="../image/order_status_5.png" alt="" class="w16 h16 mr5 fl mt12">
            <span class="status" :style="'color:' +colorList[item.state]">
              {{ item.state_description }}</span>
            <span v-if="item.state == 1" class="cFE4E4E fs14 fr lh40">还剩{{item.org_create_time | filterTimeCheck}}关闭服务</span>
            <span v-else class="c999 fs14 fr lh40">{{ item.create_time | formatTime}}发起</span>
          </div>
          <div class="content">
            <div class="left">
              <div class="info">
                <div class="backgroundimg info_img mr15" :style="
                    generateImageUrl(
                      item.image,
                      '/wechat/img/common/default.png'
                    )
                  "></div>
                <div>
                  <div class="fs18 c333 typo_bold names elli ">{{ item.goods_name }}</div>
                  <div>
                    <span class=" c999 fs14 elli w150 mr5">{{ item.patient_name || '五与' }}</span>|
                    <span class="fs14 c333 mb1 c999">
                      {{ item.patient_sex == 0 ? "男" : "女" }} {{ item.patient_age }}岁</span>
                  </div>
                  
                </div>
              </div>
              <div class="c999 fs14">
                {{ item.unit_name }}
              </div>
            </div>
            <div class="right">
              <div class="price">￥{{ item.commission }}</div>
              <div class="c999 fs14 typo_bold">预计收益</div>
            </div>
          </div>
        </div>
      </van-list>
      <NoData v-if="finished && orderList.length == 0" :height="height" bgColor="#F7F7F7" top="38%"/>
    </div>
    
  </div>
</template>
<script>
  import $ from 'jquery'
  import dayjs from 'dayjs'
  import { pullCheckOrder } from '@/mixins/pullNativeFunc'
  import { filterTimeCheck } from '../mixins/index'
  import service from '_services/'
  const NoData = () => import('@/components/noData')
  export default {
    mixins: [pullCheckOrder, filterTimeCheck],
    components: { NoData },
    data() {
      return {
        page: 1,
        orderList: [],
        loading: false,
        finished: false,
        height: '',
        colorList: [
          '#999999',
          '#FF9F4F',
          '#009EE6',
          '#00D3C2',
          '#999999',
        ]
      }
    },
    computed: {
      getNoDataTip() {
        return this.orderList.length > 0 ? '亲，已显示全部了哦~' : ''
      }
    },
    filters: {
      formatTime(time) {
        return dayjs(time).format('YYYY-MM-DD')
      }
    },
    mounted() {
      this._get_reference_order();
      this.$nextTick(() => {
        this.height = $('body').height() - 80 + 'px'
      })
    },
    methods: {
      goOrder(order_id) {
        this.pullCheckOrder(order_id)
      },
      _get_reference_order() {
        service.docDiagnoses
          .get_reference_order({
            reference: this.account_user_id,
            page: this.page,
            size: 10
          })
          .then((res) => {
            if (!res.data.list) {
              this.loading = false
              this.finished = true
              return
            }
            this.loading = false
            if (res.data.list && res.data.list.length > 0) {
              if(this.page==1){
                this.orderList = res.data.list
              }else {
                this.orderList = this.orderList.concat(res.data.list)
              }
            }
            if (res.data.list && res.data.list.length == 0) {
              this.finished = true
            }
          })
      },
      onLoad() {
        this.page++
        this._get_reference_order()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .diagnoses_doc {
    padding: 0.453333rem 0.32rem;
    background-color: #f7f7f7;
    .box_show {
      box-shadow:3px 18px 20px 0px rgba(178,178,178,0.06);
    }
    .top {
      overflow: hidden;
      background-color: #fcfcfc;
      border-bottom: 0.5px solid #eee;
      padding: 0 0.4rem;

      .status {
        color: #009ee6;
        font-size: 0.426667rem;
        font-weight: bold;
        float: left;
        line-height: 1.066667rem;
      }

      height: 1.066667rem;
    }

    .content {
      display: flex;
      padding: 0.4rem 0 0.4rem 0.4rem;

      .left {
        width: 5.84rem;
        border-right: 0.5px solid #eeeeee;

        .info {
          display: flex;
          margin-bottom: 0.4rem;
          .names {
            display: inline-block;
            max-width: 2.666667rem;
            vertical-align: sub;
            margin-right: .16rem;
          }
          .info_img {
            width: 1.066667rem;
            height: 1.066667rem;
            border-radius: .053333rem;
          }
        }
      }

      .right {
        flex: 1;
        text-align: center;
        padding-top: .346667rem;

        .price {
          color: #ff8100;
          font-size: 0.48rem;
          font-weight: bold;
          margin-bottom: 0.32rem;
        }
      }
    }
  }
</style>
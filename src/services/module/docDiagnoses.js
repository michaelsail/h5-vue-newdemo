
import { get, post } from '@/config/request'
import { doctorBus, commerce } from '@/config/apiHost'


// 获取会诊过滤器数据
const getFilterData = (params) => {
  return get(`${doctorBus}/v1/consultation/options`,params)
}

// 获取服务大厅医生列表
const getHalldoctor = (params) => {
  return get(`${doctorBus}/v1/consultation/doctors`,params)
}

// 获取我接收的列表
const get_received_order = (params) => {
  return get(`${doctorBus}/v1/consultation/get_received_service_order_list`,params)
}

// 获取我发起的列表
const get_apply_order = (params) => {
  return get(`${doctorBus}/v1/consultation/get_apply_service_order_list`,params)
}

// 搜索会诊医生接口
const get_search = (params) => {
  return get(`${doctorBus}/v1/consultation/search`,params)
}

// 会诊数据
const get_order_data = (params) => {
  return get(`${doctorBus}/v1/consultation/order_data`,params)
}

// 收藏列表
const get_collect_list = (params) => {
  return get(`${doctorBus}/v1/consultation/collect_list`,params)
}
// 取消收藏
const cancel_collect_doctor = (params) => {
  return post(`${doctorBus}/v1/consultation/multi_cancel_collect_doctor`,params)
}
// 收藏医生
const collect_doctor = (params) => {
  return post(`${doctorBus}/v1/consultation/collect_doctor`,params)
}
// 获取检验检查过滤器数据
const getInspectionOptions = (params) => {
  return get(`${doctorBus}/v1/consultation/inspection_options`,params)
}
// 获取服务大厅检验检查项目列表
const getInspectionList = (params) => {
  return get(`${doctorBus}/v1/consultation/inspection`,params)
}
// 收藏检验检查商品
const collect_inspection = (params) => {
  return post(`${doctorBus}/v1/consultation/collect_inspection`,params)
}
// 我的收藏检验检查列表
const get_collect_inspection_list = (params) => {
  return get(`${doctorBus}/v1/consultation/collect_inspection_list`,params)
}
// 批量取消收藏
const multi_cancel_inspection = (params) => {
  return post(`${doctorBus}/v1/consultation/multi_cancel_inspection`,params)
}

// 首页获取检验检查订单
const get_reference_order = (params) => {
  return get(`${commerce}/v1/order/reference_order`,params)
}

// 搜索会诊服务和医生
const get_search_all = (params) => {
  return get(`${doctorBus}/v1/consultation/search_all`,params)
}
// 搜索会诊套餐
const get_search_inspection = (params) => {
  return get(`${doctorBus}/v1/consultation/search_inspection`,params)
}

export default {
  getFilterData,
  getHalldoctor,
  get_received_order,
  get_apply_order,
  get_search,
  get_order_data,
  get_collect_list,
  cancel_collect_doctor,
  collect_doctor,
  getInspectionOptions,
  getInspectionList,
  collect_inspection,
  get_collect_inspection_list,
  multi_cancel_inspection,
  get_reference_order,
  get_search_all,
  get_search_inspection
}

// h5设置导航栏透明化
export const titleLucency = {
  methods: {
    titleLucency() {
      if (process.env.NODE_ENV == 'development') {
        return
      }
      if (isIos) {
        window.NativeActionProxy.doJSAction({ "action": "setNavigationBarHidden", "params": {} })
      } else {
        const jsons = JSON.stringify({ "action": "setNavigationBarHidden", "params": {} })
        window.NativeActionProxy.doJSAction(jsons)
      }
    }
  }
}

// 关闭webview
export const closeWebView = {
  methods: {
    closeWebView() {
      if (process.env.NODE_ENV == 'development') {
        return
      }
      if (isIos) {
        window.NativeActionProxy.doJSAction({ "action": "close", "params": {} });
      } else {
        const jsons = JSON.stringify({ "action": "close", "params": {} })
        window.NativeActionProxy.doJSAction(jsons)
      }
    }
  }
}

// 设置导航栏
export const setStatusBarColor = {
  methods: {
    setStatusBarColor(color) {
      if (process.env.NODE_ENV == 'development') {
        return
      }
      if (isIos) {
        window.NativeActionProxy.doJSAction({ "action": "setStatusBarColor", "params": {
          "color": color
        } });
      } else {
        const jsons = JSON.stringify({ "action": "setStatusBarColor", "params": {
          "color": color
        } })
        window.NativeActionProxy.doJSAction(jsons)
      }
    }
  }
}

// 检验检查选择
export const chooseInspection = {
  methods: {
    chooseInspection(id) {
      if (process.env.NODE_ENV == 'development') {
        return
      }
      console.log('检验检查选择');
      if (isIos) {
        window.NativeActionProxy.doJSAction({ "action": "chooseInspection", "params": {
          "goods_id": id.toString()
        } });
      } else {
        const jsons = JSON.stringify({ "action": "chooseInspection", "params": {
          "goods_id": id.toString()
        } })
        window.NativeActionProxy.doJSAction(jsons)
      }
    }
  }
}
// 会诊医生选择
export const chooseDoctor = {
  methods: {
    chooseDoctor(id) {
      if (process.env.NODE_ENV == 'development') {
        return
      }
      console.log('会诊医生选择');
      if (isIos) {
        window.NativeActionProxy.doJSAction({ "action": "chooseDoctor", "params": {
          "select_account_user_id": id.toString()
        } });
      } else {
        const jsons = JSON.stringify({ "action": "chooseDoctor", "params": {
          "select_account_user_id": id.toString()
        } })
        window.NativeActionProxy.doJSAction(jsons)
      }
    }
  }
}

// 打开服务配置页
export const pullServiceConf = {
  methods: {
    pullServiceConf() {
      if (process.env.NODE_ENV == 'development') {
        return
      }
      if (isIos) {
        window.NativeActionProxy.callbackNative({
          "ios": {
            "page_clase_name": "NYConsultationServeListViewController",
            "parameters": [],
            "show_type": "push"
          }
        })
      } else {
        const obj = {
          "android": {
            "page_clase_name": "com.ny.jiuyi160_doctor.module.consultation.ConsultationServiceSettingListActivity",
            "parameters": []
          }
        }
        const jsons = JSON.stringify(obj)
        window.NativeActionProxy.callbackNativeFunc(jsons)
      }
    }
  }
}

// 打开医生主页
export const pullDocIndex = {
  methods: {
    pullDocIndex(docId) {
      if (process.env.NODE_ENV == 'development') {
        return
      }
      if (isIos) {
        window.NativeActionProxy.callbackNative({
          "ios": {
            "storyboard_name": "ReferralConsultation_cqw",
            "page_clase_name": "NYRefreralConsultationDoctorDetailVC",
            "parameters": [{
                "name": "select_account_user_id",
                "value": docId.toString(),
                "type": "string"
              }],
            "show_type": "push"
          }
        })
      } else {
        const obj = {
          "android": {
            "page_clase_name": "com.ny.jiuyi160_doctor.module.consultation.ConsultationServiceExplainActivity",
            "parameters": [{
                "name": "select_account_user_id",
                "value": docId.toString(),
                "type": "String"
              }, {
                "name": "req_js_to_native",
                "value": "1",
                "type": "String"
                }
            ]
          }
        }
        const jsons = JSON.stringify(obj)
        window.NativeActionProxy.callbackNativeFunc(jsons)
      }
    }
  }
}

// 会诊订单
export const pullDiagOrder = {
  methods: {
    pullDiagOrder(orderId) {
      if (process.env.NODE_ENV == 'development') {
        return
      }
      if (isIos) {
        window.NativeActionProxy.callbackNative({
          "ios": {
            "storyboard_name": "ReferralConsultation_cqw",
            "page_clase_name": "NYRefreralConsultationOrderDetailVC",
            "parameters": [{
              "name": "order_id",
              "value": orderId.toString(),
              "type": "string"
            }],
            "show_type": "push"
          }
        })
      } else {
        const obj = {
          "android": {
            "page_clase_name": "com.ny.jiuyi160_doctor.module.consultation.ConsultationOrderActivity",
            "parameters": [{
              "name": "order_id",
              "value": orderId.toString(),
              "type": "String"
            }, {
              "name": "req_js_to_native",
              "value": "1",
              "type": "String"
              }]
          }
        }
        const jsons = JSON.stringify(obj)
        window.NativeActionProxy.callbackNativeFunc(jsons)
      }
    }
  }
}
// 打开医生小助
export const pullDocAssis = {
  methods: {
    pullDocAssis() {
      if (process.env.NODE_ENV == 'development') {
        return
      }
      if (isIos) {
        window.NativeActionProxy.callbackNative({
          "ios": {
            "storyboard_name": "HomePage",
            "page_clase_name": "LittleHelperTableViewController",
            "show_type": "push"
          }
        })
      } else {
        const obj = {
          "android": {
            "page_clase_name": "com.ny.jiuyi160_doctor.activity.tab.message.AssistantActivity",
            "parameters": []
          }
        }
        const jsons = JSON.stringify(obj)
        window.NativeActionProxy.callbackNativeFunc(jsons)
      }
    }
  }
}

// 使用webview打开对应地址
export const pullOtherUrl = {
  methods: {
    pullOtherUrl(url) {
      if (process.env.NODE_ENV == 'development') {
        return
      }
      if (isIos) {
        window.NativeActionProxy.callbackNative({
          "ios": {
            "page_clase_name": "NYWebViewController",
            "parameters": [
            {
            "name": "url",
            "value": url + '&cid=' +cid,
            "type": "url"
            }
            ],
            "show_type": "push"
          }
        })
      } else {
        const obj = {
          "android": {
            "page_clase_name": "com.ny.jiuyi160_doctor.activity.base.WebSameImageActivity",
            "parameters": [
              {"name": "url",
              "value": url + '&cid=' +cid,
              "type": "String"},
              {"name":"updateTitle",
              "value":"true",
              "type":"java.lang.Boolean"}
            ]
          }
        }
        const jsons = JSON.stringify(obj)
        window.NativeActionProxy.callbackNativeFunc(jsons)
      }
    }
  }
}

// 打开检验检查说明页
export const pullCheckDetail = {
  methods: {
    pullCheckDetail(goods_id) {
      if (process.env.NODE_ENV == 'development') {
        return
      }
      if (isIos) {
        window.NativeActionProxy.callbackNative({
          "ios": {
            "page_clase_name": "NYRefreralConsulationInspectionDetailVC",
            "parameters": [{
              "name": "goods_id",
              "value": goods_id.toString(),
              "type": "string"
            }],
            "show_type": "push",
            "storyboard_name": "ReferralConsultation_cqw"
          }
        })
      } else {
        const obj = {
          "android": {
            "page_clase_name": "com.ny.jiuyi160_doctor.module.consultation.ConsultationCheckServiceExplainActivity",
            "parameters": [{
              "name":"select_account_goods_id",
              "value":goods_id.toString(),
              "type":"java.lang.String"
            }]
          }
        }
        const jsons = JSON.stringify(obj)
        window.NativeActionProxy.callbackNativeFunc(jsons)
      }
    }
  }
}
// 打开检验检查订单详情页
export const pullCheckOrder = {
  methods: {
    pullCheckOrder(order_id) {
      if (process.env.NODE_ENV == 'development') {
        return
      }
      if (isIos) {
        window.NativeActionProxy.callbackNative({
          "ios": {
            "page_clase_name": "NYRefreralConsultationOrderDetailVC",
            "parameters": [{
              "name": "order_id",
              "value": order_id.toString(),
              "type": "string"
            },{
              "name": "inspectionOrder",
              "type": "string",
              "value": 1
            }],
            "show_type": "push",
            "storyboard_name": "ReferralConsultation_cqw"
          }
        })
      } else {
        const obj = {
          "android": {
            "page_clase_name": "com.ny.jiuyi160_doctor.module.consultation.ConsultationOrderActivity",
            "parameters": [{
              "name": "order_id",
              "value": order_id.toString(),
              "type": "String"
            }, {
              "name": "req_js_to_native",
              "value": "1",
              "type": "String"
            },{
              "name":"extra_type",
              "value":"3",
              "type":"java.lang.Integer"
            }]
          }
        }
        const jsons = JSON.stringify(obj)
        window.NativeActionProxy.callbackNativeFunc(jsons)
      }
    }
  }
}
// 打开发起会诊
export const pullConsultant = {
  methods: {
    pullConsultant() {
      if (process.env.NODE_ENV == 'development') {
        return
      }
      if (isIos) {
        window.NativeActionProxy.callbackNative({
          "ios": {
            "storyboard_name": "PatientManager",
            "page_clase_name": "NYAllPatientListViewController",
            "parameters": [{
              "name": "isFromConsultation",
              "value":"1",
              "type":"number"
              }],
            "show_type": "push"
          }
        })
      } else {
        const jsons = JSON.stringify({ "action": "startGroupMeetingConsultation", "params": {} })
        window.NativeActionProxy.doJSAction(jsons)
      }
    }
  }
}
import request from '../utils/request'

export default {
  createOrder(courseId) {
    return request({
      url: `/order/order/create/${courseId}`,
      method: 'get'
    })
  },
  getOrderInfo(orderNo) {
    return request({
      url: `/order/order/${orderNo}`,
      method: 'get'
    })
  },
  getPayState(orderNo) {
    return request({
      url: `/order/payLog/state/${orderNo}`,
      method: 'get'
    })
  },
  createNatvie(orderNo) {
    return request({
      url: `/order/payLog/createNative/${orderNo}`,
      method: 'get'
    })
  }
}

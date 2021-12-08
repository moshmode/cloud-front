import request from "../utils/request"

export default {
  getBanners() {
    return request({
      url: '/cms/banner/front',
      method: 'get'
    })
  }
}

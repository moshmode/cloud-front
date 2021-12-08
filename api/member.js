import request from '../utils/request'

export default {
  getMemberById(id) {
    return request({
      url: `/ucenter/member/front/${id}`,
      method: 'get'
    })
  }
}

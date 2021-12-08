import request from '../utils/request'

export default {
  //登录的方法
  updateMemberInfo(member) {
    return request({
      url: `/ucenter/center/front/update`,
      method: 'put',
      data: member
    })
  }
}

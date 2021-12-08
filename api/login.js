import request from '../utils/request'

export default {
  //登录的方法
  submitLoginUser(userInfo) {
    return request({
      url: `/ucenter/center/front/login`,
      method: 'post',
      params: userInfo
    })
  },

  //根据token获取用户信息
  getLoginUserInfo() {
    return request({
      url: `/ucenter/center/front/getMemberInfo`,
      method: 'get'
    })
  }

}

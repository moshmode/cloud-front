import request from '../utils/request'

export default {
  getPlayAuth(id) {
    return request({
      url: `vod/client/${id}`,
      method: 'get',
    })
  }
}

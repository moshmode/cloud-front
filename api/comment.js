import request from "../utils/request"

export default {
  getComment(type, queryId, current, limit) {
    return request({
      url: `/comment/${type}/front/${queryId}/${current}/${limit}`,
      method: 'get'
    })
  },
  addComment(type, comment) {
    return request({
      url: `/comment/${type}/front`,
      method: 'post',
      data: comment
    })
  },
  addReply(type, reply) {
    return request({
      url: `/comment/reply/front/${type}`,
      method: 'post',
      data: reply
    })
  },

}

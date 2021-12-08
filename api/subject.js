import request from "../utils/request"

export default {
  getNestedTreeList() {
    return request({
      url: `/edu/subject/front`,
      method: 'get'
    })
  }
}

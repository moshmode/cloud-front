import request from '../utils/request'

export default {
  getCourseList(current, limit, courseQuery) {
    return request({
      url: `edu/course/front/page/${current}/${limit}`,
      method: 'post',
      params: courseQuery
    })
  },
  getCourseInfo(courseId) {
    return request({
      url: `edu/course/front/${courseId}`,
      method: 'get',
    })
  },
  getHotData() {
    return request({
      url: '/edu/course/front/hot',
      method: 'get'
    })
  }
}

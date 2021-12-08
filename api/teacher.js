import request from '../utils/request'

export default {
  getTeacherList(current, limit, teacherQuery) {
    return request({
      url: `edu/teacher/front/page/${current}/${limit}`,
      method: 'post',
      params: teacherQuery
    })
  },
  getTeacherInfo(id) {
    return request({
      url: `edu/teacher/front/${id}`,
      method: 'get',
    })
  },
  getHotData() {
    return request({
      url: '/edu/teacher/front/hot',
      method: 'get'
    })
  }
}

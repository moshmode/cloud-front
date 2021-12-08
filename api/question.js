import request from '../utils/request'

export default {
  getQuestionByPage(current, limit, query) {
    return request({
      url: `/forum/question/front/page/${current}/${limit}`,
      method: 'post',
      data: query
    })
  },
  getById(id) {
    return request({
      url: `/forum/question/front/${id}`,
      method: 'get',
    })
  },
  addQuestion(question) {
    return request({
      url: `/forum/question/front`,
      method: 'post',
      data: question
    })
  },
  deleteQuestionById(id) {
    return request({
      url: `/forum/question/front/${id}`,
      method: 'delete',
    })
  },
  getQuestionCollectedByPage(current, limit, memberId) {
    return request({
      url: `/forum/question/front/collected/${current}/${limit}/${memberId}`,
      method: 'get',
    })
  }
}

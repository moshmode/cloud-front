import request from "../utils/request"

export default {
  getBlogInteraction(blogId, memberId) {
    return request({
      url: `/interaction/blog/front/${blogId}/${memberId}`,
      method: 'get'
    })
  },
  addBlogInteraction(blogInteraction) {
    return request({
      url: `/interaction/blog/front`,
      method: 'post',
      data: blogInteraction
    })
  },
  addQuestionInteraction(interaction) {
    return request({
      url: `/interaction/question/front`,
      method: 'post',
      data: interaction
    })
  },
  getQuestionInteraction(questionId, memberId) {
    return request({
      url: `/interaction/question/front/${questionId}/${memberId}`,
      method: 'get'
    })
  },
  getViewInteraction(current, limit, fromMemberId) {
    return request({
      url: `/interaction/view/front/view/${current}/${limit}/${fromMemberId}`,
      method: 'get'
    })
  },
  cancelView(memberId, fromMemberId) {
    return request({
      url: `/interaction/view/front/${memberId}/${fromMemberId}`,
      method: 'delete'
    })
  },
  addView(viewData) {
    return request({
      url: `/interaction/view/front`,
      method: 'post',
      data: viewData
    })
  },
  getView(memberId, fromMemberId) {
    return request({
      url: `/interaction/view/front/${memberId}/${fromMemberId}`,
      method: 'get'
    })
  },
  getFans(current, limit, memberId) {
    return request({
      url: `/interaction/view/front/fans/${current}/${limit}/${memberId}`,
      method: 'get'
    })
  }

}

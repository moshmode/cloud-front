import request from "../utils/request"

export default {
  getBlogListByPage(current, limit, query) {
    return request({
      url: `/blog/blog/front/page/${current}/${limit}`,
      method: 'post',
      data: query
    })
  },
  addBlog(blog) {
    return request({
      url: `/blog/blog/front`,
      method: 'post',
      params: blog
    })
  },
  deleteBlog(id) {
    return request({
      url: `/blog/blog/front/${id}`,
      method: 'delete',
    })
  },
  getDetailVoByBlogId(blogId) {
    return request({
      url: `/blog/detail/front/vo/${blogId}`,
      method: 'get',
    })
  },
  addDetail(detail) {
    return request({
      url: `/blog/detail/front`,
      method: 'post',
      data: detail
    })
  },
  deleteBlogCover(url) {
    return request({
      url: `/obs/blog/cover`,
      method: 'delete',
      data: url
    })
  },
  updateBlog(blog) {
    return request({
      url: `/blog/blog/front`,
      method: 'put',
      data: blog
    })
  },
  getDetail(id) {
    return request({
      url: `/blog/detail/front/${id}`,
      method: 'get',
    })
  },
  getDraftListByPage(current, limit, detail) {
    return request({
      url: `/blog/detail/front/draft/page/${current}/${limit}`,
      method: 'post',
      data: detail
    })
  },
  deleteDetailById(id) {
    return request({
      url: `/blog/detail/front/${id}`,
      method: 'delete',
    })
  },
  getBlogCollectedByPage(current, limit, memberId) {
    return request({
      url: `/blog/blog/front/collected/${current}/${limit}/${memberId}`,
      method: 'get',
    })
  }
}

<template>
  <div id="aCoursesList" class="bg-fa of">
    <section class="container">

      <el-card>
        <header class="detail_header">
          <h1 style="font-size:1.6rem">
            {{ detail.title }}

          </h1>
          <h3 style="padding-top:1rem;">
            <i>作者：{{ detail.name }}</i>
            <i>于{{ detail.releaseTime }}发布</i>
            <i>于{{ detail.updateTime }}更新</i>
          </h3>
        </header>
        <div class="content">
          <markdown ref="md" :toolbarsFlag="false" :subfield="false" :defaultOpen="'preview'"/>
        </div>

        <div style="float: right;font-size:32px">

          <el-tooltip effect="dark" content="点赞" placement="bottom">
            <i class="el-icon-s-check" :style="blogInteraction.liked ? 'color: #409EFF':''" @click="likeBlog"></i>
          </el-tooltip>
          <el-tooltip effect="dark" content="收藏" placement="bottom">
            <i class="el-icon-star-on" :style="blogInteraction.collected?'color: #409EFF':''" @click="collectBlog"></i>
          </el-tooltip>
          <el-tooltip effect="dark" content="分享" placement="bottom">
            <i class="el-icon-share" @click="shareBlog"></i>
          </el-tooltip>
          <el-tooltip effect="dark" content="关注" placement="bottom">
            <i class="el-icon-view" :style="view?'color: #409EFF':''" @click="addView"></i>
          </el-tooltip>
        </div>

      </el-card>

    </section>
  </div>
</template>

<script>
import blog from "../../api/blog";
import markdown from '../../components/markdownEdit'
import cookie from "js-cookie";
import interaction from "../../api/interaction";
import view from "@/pages/center/view";

export default {
  components: {
    markdown
  },
  data() {
    return {
      blogId: '',
      // 文章对象
      detail: {
        title: '',
        memberId: '',
        name: '',
        avatar: '',
        releaseTime: '',
        updateTime: '',
        content: ''
      },
      memberInfo: {},
      blogInteraction: {
        id: '',
        blogId: '',
        memberId: '',
        liked: 0,
        collected: 0
      },
      view: false
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.blogId = this.$route.params.id
      this.blogInteraction.blogId = this.$route.params.id

      var userStr = cookie.get('memberInfo')
      if (userStr) {
        this.memberInfo = JSON.parse(userStr)
        this.blogInteraction.memberId = this.memberInfo.id
        interaction.getBlogInteraction(this.blogId, this.memberInfo.id).then(response => {
          if (response.data.blogInteraction != null)
            this.blogInteraction = response.data.blogInteraction
        })
      }

      this.getDetail()
    }
  },
  methods: {
    getDetail() {
      blog.getDetailVoByBlogId(this.blogId).then(response => {
        this.detail = response.data.detail
        this.$refs.md.content = this.detail.content
        if (this.memberInfo.id != null && this.memberInfo.id !== '') {
          interaction.getView(this.detail.memberId, this.memberInfo.id).then(response => {
            this.view = response.data.view
          })
        }
      })
    },
    shareBlog() {

    },
    collectBlog() {
      if (this.blogInteraction.memberId != null && this.blogInteraction.memberId !== '') {
        this.blogInteraction.collected = (this.blogInteraction.collected + 1) % 2
        interaction.addBlogInteraction(this.blogInteraction).then(response => {
          this.blogInteraction.id = response.data.blogInteractionId
        })
      } else {
        this.$router.push({path: '/login'})
      }
    },
    likeBlog() {
      if (this.blogInteraction.memberId != null && this.blogInteraction.memberId !== '') {
        this.blogInteraction.liked = (this.blogInteraction.liked + 1) % 2
        interaction.addBlogInteraction(this.blogInteraction).then(response => {
          this.blogInteraction.id = response.data.blogInteractionId
        })
      } else {
        this.$router.push({path: '/login'})
      }
    },
    addView() {
      if (this.memberInfo.id == null || this.memberInfo.id === '') {
        this.$router.push({path: '/login'})
        return
      }
      if (!this.view) {
        var viewData = {}
        viewData.memberId = this.detail.memberId
        viewData.nickname = this.detail.name
        viewData.avatar = this.detail.avatar
        viewData.fromMemberId = this.memberInfo.id
        interaction.addView(viewData).then(response => {
          this.view = !this.view
        })
      } else {
        interaction.cancelView(this.detail.memberId, this.memberInfo.id).then(response => {
          this.view = !this.view
        })
      }
    }
  }
}
</script>

<style scoped>
.detail_header {
  padding-left: 25px;
  padding-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 23px;
}

h1 {
  width: 100%;
  text-align: left;
  display: block;
}

h3 {
  width: 100%;
  text-align: left;
  display: block;
  margin-bottom: 1rem;
}


</style>

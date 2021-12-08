<template>
    <div id="aCoursesList" class="bg-fa of">
      <!-- /课程详情 开始 -->
      <section class="container">
        <el-card>
          <div>
            <el-tag style="margin-right: 15px" v-for="item in this.question.labels" :key="item.id">
              {{ item.title }}
            </el-tag>
          </div>
          <div style="font-size: 32px">
            {{ question.title }}
          </div>

          <el-row :gutter="10" style="margin-bottom: 20px;font-size: 18px">
            <el-col :span="1">
              <el-avatar :src="question.avatar"></el-avatar>
            </el-col>
            <el-col :span="3">
              作者: {{ question.name }}
            </el-col>
            <el-col :span="3">
              发布: {{ question.gmtCreate }}
            </el-col>
            <el-col :span="3">
              更新: {{ question.gmtModified }}
            </el-col>
          </el-row>
          <div style="font-size: 16px" v-html="question.content"></div>

          <div style="float: right;font-size:32px">

            <el-tooltip effect="dark" content="点赞" placement="bottom">
              <i class="el-icon-s-check" :style="questionInteraction.liked ? 'color: #409EFF':''"
                 @click="likeQuestion"></i>
            </el-tooltip>
            <el-tooltip effect="dark" content="收藏" placement="bottom">
              <i class="el-icon-star-on" :style="questionInteraction.collected?'color: #409EFF':''"
                 @click="collectQuestion"></i>
            </el-tooltip>
            <el-tooltip effect="dark" content="分享" placement="bottom">
              <i class="el-icon-share" @click="shareQuestion"></i>
            </el-tooltip>
            <el-tooltip effect="dark" content="关注" placement="bottom">
              <i class="el-icon-view" :style="view?'color: #409EFF':''" @click="addView"></i>
            </el-tooltip>

          </div>

        </el-card>

        <el-card style="margin-top: 15px">
          <Comment style="margin-top: 15px" :comments="comments" @commitComment="commitComment"
                   @commitReply="commitReply"></Comment>
        </el-card>
      </section>
    </div>
</template>

<script>
import commentAPI from "../../api/comment";
import Comment from "../../components/Comment";
import cookie from "js-cookie";
import question from "../../api/question";
import interaction from "@/api/interaction";

export default {
  components: {
    Comment
  },
  data() {
    return {
      question: {},
      reply: {},
      comments: [],
      comment: {},
      questionInteraction: {
        id: '',
        questionId: '',
        memberId: '',
        liked: 0,
        collected: 0
      },
      memberInfo: {},
      view: false
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      question.getById(this.$route.params.id).then(response => {
        this.question = response.data.question
        this.getComments()
        this.questionInteraction.questionId = this.$route.params.id
        var userStr = cookie.get('memberInfo')
        if (userStr) {
          this.memberInfo = JSON.parse(userStr)
          this.initComment()
          this.questionInteraction.memberId = this.memberInfo.id
          interaction.getQuestionInteraction(this.$route.params.id, this.memberInfo.id).then(response => {
            if (response.data.questionInteraction != null)
              this.questionInteraction = response.data.questionInteraction
          })
        }
        interaction.getView(this.question.memberId, this.memberInfo.id).then(response => {
          this.view = response.data.view
        })
      })
    }
  },
  methods: {
    getComments() {
      commentAPI.getComment('forum', this.question.id, 0, 8).then(response => {
        this.comments = response.data.rows
      })
    },
    initComment() {
      this.comment.memberId = this.memberInfo.id
      this.reply.memberId = this.memberInfo.id
      this.comment.nickname = this.memberInfo.nickname
      this.reply.nickname = this.memberInfo.nickname
      this.comment.avatar = this.memberInfo.avatar
      this.reply.avatar = this.memberInfo.avatar
    },
    commitComment(comment) {
      if (comment === '')
        return false
      this.comment.questionId = this.question.id
      this.comment.content = comment
      commentAPI.addComment('forum', this.comment).then(response => {
        this.getComments()
        this.comment.content = ''
      })
    },
    commitReply(replyInfo, reply) {
      if (reply === '')
        return false
      this.reply.content = reply
      this.reply.parentId = replyInfo.parentId
      this.reply.toMemberId = replyInfo.toMemberId
      this.reply.toNickname = replyInfo.toNickname
      commentAPI.addReply('forum', this.reply).then(response => {
        this.getComments()
        this.reply.content = ''
        this.reply.parentId = ''
        this.reply.toMemberId = ''
        this.reply.toNickname = ''
      })
    },
    likeQuestion() {
      if (this.questionInteraction.memberId != null && this.questionInteraction.memberId !== '') {
        this.questionInteraction.liked = (this.questionInteraction.liked + 1) % 2
        interaction.addQuestionInteraction(this.questionInteraction).then(response => {
          this.questionInteraction.id = response.data.questionInteractionId
        })
      } else {
        this.$router.push({path: '/login'})
      }
    },
    collectQuestion() {
      if (this.questionInteraction.memberId != null && this.questionInteraction.memberId !== '') {
        this.questionInteraction.collected = (this.questionInteraction.collected + 1) % 2
        interaction.addQuestionInteraction(this.questionInteraction).then(response => {
          this.questionInteraction.id = response.data.questionInteractionId
        })
      } else {
        this.$router.push({path: '/login'})
      }
    },
    shareQuestion() {

    },
    addView() {
      if (this.memberInfo.id == null || this.memberInfo.id === '') {
        this.$router.push({path: '/login'})
        return
      }
      if (!this.view) {
        var viewData = {}
        viewData.memberId = this.question.memberId
        viewData.nickname = this.question.name
        viewData.avatar = this.question.avatar
        viewData.fromMemberId = this.memberInfo.id
        interaction.addView(viewData).then(response => {
          this.view = !this.view
        })
      } else {
        interaction.cancelView(this.question.memberId, this.memberInfo.id).then(response => {
          this.view = !this.view
        })
      }
    }
  }
}
</script>

<style scoped>

</style>

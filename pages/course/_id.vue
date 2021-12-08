<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
        <a href="#" title class="c-999 fsize14">首页</a>
        \
        <a href="#" title class="c-999 fsize14">课程列表</a>
        \
        <span class="c-333 fsize14">{{ courseInfo.title }}</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px;">
          <section class="p-h-video-box" id="videoPlay">
            <img :src="courseInfo.cover" :alt="courseInfo.title" class="dis c-v-pic">
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{ courseInfo.title }}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b class="c-yellow" style="font-size:24px;">￥{{ courseInfo.price }}</b>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">主讲：{{ teacher.name }} &nbsp;&nbsp;&nbsp;</span>
            </section>
            <section class="c-attr-mt of">
              <span class="ml10 vam">
                <em class="icon18 scIcon"></em>
                <a class="c-fff vam" title="收藏" href="#">收藏</a>
              </span>
            </section>

            <section class="c-attr-mt" v-if="courseInfo.price===0||courseInfo.pay===false">
              <a @click="createOrders()" title="立即购买" class="comm-btn c-btn-3">立即购买</a>
            </section>
            <section class="c-attr-mt" v-else>
              <a href="#" title="立即观看" class="comm-btn c-btn-3">立即观看</a>
            </section>

          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol clearfix">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{ courseInfo.buyCount }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{ courseInfo.lessonNum }}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{ courseInfo.viewCount }}</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"></div>
      </div>
      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <p v-html="courseInfo.description"></p>
                    </section>
                  </div>
                </div>
                <!-- /课程介绍 -->
                <div class="mt50">
                  <h6 class="c-g-content c-infor-title">
                    <span>课程大纲</span>
                  </h6>
                  <section class="mt20">
                    <div class="lh-menu-wrap">
                      <menu id="lh-menu" class="lh-menu mt10 mr10">
                        <ul>
                          <!-- 文件目录 -->
                          <li class="lh-menu-stair" v-for="chapter in courseInfo.chapterList" :key="chapter.id">
                            <a href="javascript: void(0)" :title="chapter.title" class="current-1">
                              <em class="lh-menu-i-1 icon18 mr10"></em>{{ chapter.title }}
                            </a>
                            <ol class="lh-menu-ol" style="display: block;">
                              <li class="lh-menu-second ml30" v-for="video in chapter.children" :key="video.id">
                                <a :href="'/player/'+video.videoSourceId"
                                   :title="video.title"
                                   target="_blank">
                                  <span class="fr">
                                    <i class="free-icon vam mr10">免费试听</i>
                                  </span>
                                  <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{ video.title }}
                                </a>
                              </li>
                            </ol>
                          </li>
                        </ul>
                      </menu>
                    </div>
                  </section>
                </div>
                <!-- /课程大纲 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:void(0)">主讲讲师</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto;">
                  <li>
                    <div class="u-face">
                      <a href="#">
                        <img :src="teacher.avatar" width="50" height="50" alt>
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a class="c-333 fsize16 fl" :href="'../teacher/'+teacher.id">{{ teacher.name }}</a>
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{ teacher.career }}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </aside>
        <div class="clear"></div>
      </div>
    </section>
    <!-- /课程详情 结束 -->
    <el-card style="margin-top: 15px;width: 80%;margin-left:auto;margin-right: auto">
      <Comment style="margin-top: 15px" :comments="comments" @commitComment="commitComment"
               @commitReply="commitReply"></Comment>
    </el-card>
    <div class="paging">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="current"
        :page-size="limit"
        layout="prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import course from "../../api/course";
import order from "../../api/order";
import Comment from "../../components/Comment";
import commentAPI from "../../api/comment";
import cookie from "js-cookie";

export default {
  components: {Comment},
  data() {
    return {
      courseId: '',
      courseInfo: {},
      teacher: {},
      comments: [],
      comment: {
        courseId: '',
        teacherId: '',
        memberId: '',
        nickname: '',
        avatar: '',
        content: ''
      },
      reply: {
        parentId: '',
        memberId: '',
        nickname: '',
        avatar: '',
        content: '',
        toMemberId: '',
        toNickname: ''
      },
      total: 0,
      current: 0,
      limit: 4
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id
      this.getCourseInfo()
      this.initComment()
      this.getComments()
    }
  },
  methods: {
    getCourseInfo() {
      course.getCourseInfo(this.courseId).then(response => {
        this.courseInfo = response.data.courseInfo
        this.teacher = response.data.courseInfo.teacher
      })
    },
    initComment() {
      var userStr = cookie.get('memberInfo')
      // 把字符串转换json对象(js对象)
      if (userStr) {
        var loginInfo = JSON.parse(userStr)
        this.comment.memberId = loginInfo.id
        this.reply.memberId = loginInfo.id
        this.comment.nickname = loginInfo.nickname
        this.reply.nickname = loginInfo.nickname
        this.comment.avatar = loginInfo.avatar
        this.reply.avatar = loginInfo.avatar
      }
    },
    commitComment(comment) {
      if (comment === '')
        return false
      this.comment.courseId = this.courseInfo.id
      this.comment.teacherId = this.teacher.id
      this.comment.content = comment
      commentAPI.addComment('course', this.comment).then(response => {
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
      console.log(this.reply)
      commentAPI.addReply('course', this.reply).then(response => {
        this.getComments()
        this.reply.content = ''
        this.reply.parentId = ''
        this.reply.toMemberId = ''
        this.reply.toNickname = ''
      })
    },
    getComments() {
      commentAPI.getComment('course', this.courseId, this.current, this.limit).then(response => {
        this.comments = response.data.rows
        this.total = response.data.total
      })
    },
    handleCurrentChange(val) {
      this.current = val
      this.getComments()
    },
    createOrders() {
      order.createOrder(this.courseId).then(response => {
        this.$router.push({path: '/order/' + response.data.orderNo})
      })
    }
  }
};
</script>

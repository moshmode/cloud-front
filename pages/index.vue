<template>

  <div>
    <div id="aCoursesList">
      <!-- 网校课程 开始 -->
      <section class="container">
          <!-- 幻灯片 开始 -->
          <el-carousel>
            <el-carousel-item v-for="banner in bannerList" :key="banner.id">
              <a target="_blank" :href="banner.linkUrl">
                <el-image
                  style="width: 100%; height: 100%"
                  :src="banner.imageUrl"
                  fit="fill"></el-image>
              </a>
            </el-carousel-item>
          </el-carousel>
          <!-- 幻灯片 结束 -->

        <header class="comm-title">
          <h2 class="tac">
            <span class="c-333">热门课程</span>
          </h2>
        </header>
          <el-card style="margin-bottom: 15px">
            <article class="comm-course-list">
              <ul class="of" id="bna">
                <li v-for="course in courseList" :key="course.id">
                  <div class="cc-l-wrap">
                    <section class="course-img">
                      <img
                        :src="course.cover"
                        class="img-responsive"
                        :alt="course.title"
                      >
                      <div class="cc-mask">
                        <a href="#" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a href="#" :title="course.title" class="course-title fsize18 c-333">{{ course.title }}</a>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green">
                        <i class="c-fff fsize12 f-fA">免费</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">{{ course.viewCount }}</i>
                        |
                        <i class="c-999 f-fA">9634评论</i>
                      </span>
                    </section>
                  </div>
                </li>

              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="#" title="全部课程" class="comm-btn c-btn-2">全部课程</a>
            </section>
          </el-card>
        <!-- /网校课程 结束 -->

        <!-- 网校名师 开始 -->
          <el-card>
            <section class="container">
              <header class="comm-title">
                <h2 class="tac">
                  <span class="c-333">风云人物</span>
                </h2>
              </header>
              <div>
                <article class="i-teacher-list">
                  <ul class="of">
                    <li v-for="teacher in teacherList" :key="teacher.id">
                      <section class="i-teach-wrap">
                        <div class="i-teach-pic">
                          <a :href="'/teacher/'+teacher.id" :title="teacher.name">
                            <img :alt="teacher.name" :src="teacher.avatar">
                          </a>
                        </div>
                        <div class="mt10 hLh30 txtOf tac">
                          <a :href="'/teacher/'+teacher.id" :title="teacher.name"
                             class="fsize18 c-666">{{ teacher.name }}</a>
                        </div>
                        <div class="hLh30 txtOf tac">
                          <span class="fsize14 c-999">{{ teacher.career }}</span>
                        </div>
                        <div class="mt15 i-q-txt">
                          <p
                            class="c-999 f-fA"
                          >
                            {{ teacher.intro }}</p>
                        </div>
                      </section>
                    </li>
                  </ul>
                  <div class="clear"></div>
                </article>
                <section class="tac pt20">
                  <a href="#" title="全部讲师" class="comm-btn c-btn-2">全部讲师</a>
                </section>
              </div>
            </section>
          </el-card>
        <!-- /网校名师 结束 -->
      </section>


    </div>
  </div>
</template>

<script>
import course from "@/api/course"
import teacher from "@/api/teacher"
import banner from "@/api/banner";
import cookie from "js-cookie";

export default {
  data() {
    return {
      bannerList: [],
      teacherList: [],
      courseList: [],
    }
  },
  created() {
    this.getBanners()
    this.getHotData()
  },
  methods: {
    getBanners() {
      banner.getBanners().then(response => {
        this.bannerList = response.data.bannerList
      })
    },
    getHotData() {
      teacher.getHotData().then(response => {
        this.teacherList = response.data.teacherList
      })
      course.getHotData().then(response => {
        this.courseList = response.data.courseList
      })
    }
  }
}
</script>

<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
        <el-button style="float:right" type="primary" @click="visible = true">查询</el-button>
      </header>

      <el-card>
        <!-- /无数据提示 开始-->
        <section class="no-data-wrap" v-if="total===0">
          <em class="icon30 no-data-ico">&nbsp;</em>
          <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
        </section>
        <!-- /无数据提示 结束-->
        <article class="comm-course-list">
          <ul class="of" id="bna">
            <li v-for="course in courseList" :key="course.id">
              <div class="cc-l-wrap">
                <section class="course-img">
                  <img :src="course.cover" class="img-responsive" :alt="course.title">
                  <div class="cc-mask">
                    <a :href="'/course/'+course.id" title="开始学习" class="comm-btn c-btn-1">开始学习</a>
                  </div>
                </section>
                <h3 class="hLh30 txtOf mt10">
                  <a :href="'/course/'+course.id" :title="course.title"
                     class="course-title fsize18 c-333">{{ course.title }}</a>
                </h3>
                <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green">
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                  <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{ course.viewCount }}人学习</i>
                      |
                      <i class="c-999 f-fA">9634评论</i>
                    </span>
                </section>
              </div>
            </li>

          </ul>
          <div class="clear"></div>
        </article>

        <!-- 公共分页 开始 -->
        <div class="paging">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="current"
            :page-size="limit"
            layout="prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </div>
      </el-card>
      <!-- 公共分页 结束 -->
      <el-drawer
        title="查询条件"
        :visible.sync="visible"
        :before-close="handleClose"
        direction="rtl">
        <el-form ref="form" :model="query" label-width="80px">

          <el-form-item label="视频标题">
            <el-input v-model="query.title"></el-input>
          </el-form-item>

          <el-form-item label="视频作者">
            <el-input v-model="query.name"></el-input>
          </el-form-item>

          <el-form-item label="一级标签">
            <el-select v-model="query.subjectParentId" placeholder="请选择" @change="getSecondarySubjects">
              <el-option
                v-for="item in primarySubjects"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="二级标签">
            <el-select v-model="query.subjectId" placeholder="请选择" @change="$forceUpdate()">
              <el-option
                v-for="item in secondarySubjects"
                :key="item.id"
                :label="item.title"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="最早时间">
            <el-date-picker
              v-model="query.begin"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="最晚时间">
            <el-date-picker
              v-model="query.end"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="排列顺序">
            <el-radio-group v-model="query.order">
              <el-radio :label="'gmt_create'">发布日期</el-radio>
              <el-radio :label="'gmt_modified'">更新日期</el-radio>
              <el-radio :label="'view_count'">浏览数量</el-radio>
            </el-radio-group>
          </el-form-item>

        </el-form>
      </el-drawer>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>
<script>
import course from "../../api/course";
import subject from "../../api/subject";

export default {
  data() {
    return {
      courseList: [],
      total: 0,
      current: 0,
      limit: 8,
      query: {},
      visible: false,
      primarySubjects: [],
      secondarySubjects: []
    }
  },
  created() {
    this.getCourseList()
    this.getAllSubjects()
  },
  methods: {
    getCourseList() {
      course.getCourseList(this.current, this.limit, this.query).then(response => {
        this.courseList = response.data.rows
        this.total = response.data.total
      })
    },
    handleCurrentChange(val) {
      this.current = val
      this.getCourseList()
    },
    handleClose() {
      this.getCourseList()
      this.visible = false
    },
    getSecondarySubjects(primarySubjectId) {
      this.query.subjectId = ''
      this.primarySubjects.forEach(item => {
        if (item.id === primarySubjectId) {
          this.secondarySubjects = item.children
        }
      })
    },
    getAllSubjects() {
      subject.getNestedTreeList().then(response => {
        this.primarySubjects = response.data.items
      })
    }
  }
};
</script>

<template>

  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部博客</span>
        </h2>
        <el-button style="float:right;margin-left: 15px" type="primary" @click="pushWrite">写博客</el-button>
        <el-button style="float:right" type="primary" @click="visible = true">查询</el-button>
      </header>
      <el-card>
        <div slot="header" class="clearfix">
          <i>博客列表</i>
          <i style="float:right">共{{ total }}篇</i>
        </div>

        <el-card v-for="(item) in List" :key="item.id" style="margin-bottom: 15px">
          <el-row style="font-size: 24px;margin-bottom: 15px;">
            <a :href="'/blog/'+item.id">
              {{ item.title }}
            </a>
          </el-row>
          <el-row :gutter="10" style="margin-bottom: 15px;font-size: 20px">
            <el-col :span="2">
              <el-avatar :src="item.avatar"></el-avatar>
            </el-col>
            <el-col :span="4">
              作者: {{ item.name }}
            </el-col>
            <el-col :span="6">
              发布: {{ item.gmtCreate }}
            </el-col>
            <el-col :span="3">
              <i class="el-icon-s-check"/>{{ item.replyCount }}
            </el-col>
            <el-col :span="3">
              <i class="el-icon-star-on"/>{{ item.viewCount }}
            </el-col>
          </el-row>

          <el-row style="margin-bottom: 15px;">
            <span style="font-size:16px;font-weight:bold">文章简介：</span>
            {{ item.brief }}
          </el-row>

          <el-row style="margin-bottom: 15px">
            <el-tag>
              {{ item.subjectTitle }}
            </el-tag>
          </el-row>
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
      </el-card>

      <el-drawer
        title="查询条件"
        :visible.sync="visible"
        :before-close="handleClose"
        direction="rtl">
        <el-form ref="form" :model="query" label-width="80px">

          <el-form-item label="博客标题">
            <el-input v-model="query.title"></el-input>
          </el-form-item>

          <el-form-item label="博客作者">
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
  </div>
</template>

<script>
import blog from "../../api/blog";
import subject from "../../api/subject";

export default {
  data() {
    return {
      List: [],
      limit: 10,
      total: 0,
      current: 0,
      query: {},
      visible: false,
      primarySubjects: [],
      secondarySubjects: []
    }
  },
  created() {
    this.getBlogListByPage()
    this.getAllSubjects()
  },
  methods: {
    getBlogListByPage() {
      blog.getBlogListByPage(this.current, this.limit, this.query).then(response => {
        this.List = response.data.rows
        this.total = response.data.total
        this.query = {}
      })
    },
    handleCurrentChange(val) {
      this.current = val
      this.getCourseList()
    },
    pushWrite() {
      this.$router.push({path: '/write'})
    },
    handleClose() {
      this.getBlogListByPage()
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
}
</script>

<style scoped>

</style>

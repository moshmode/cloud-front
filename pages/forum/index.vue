<template>
    <div id="aCoursesList" class="bg-fa of">
      <!-- /课程列表 开始 -->
      <section class="container">
        <header class="comm-title">
          <h2 class="fl tac">
            <span class="c-333">全部问题</span>
          </h2>
          <el-button style="float:right;margin-left: 15px" type="primary" @click="pushQuestion">提问</el-button>

          <el-button style="float:right" type="primary" @click="visible = true">查询</el-button>
        </header>
        <el-card>
          <div slot="header" class="clearfix" style="font-size: 18px">
            <i>问题列表</i>
            <i style="float: right">共{{ total }}篇</i>
          </div>
          <el-card v-for="(item) in List" :key="item.id" style="margin-bottom: 15px">
            <el-row style="font-size: 20px">
              <a :href="'/forum/'+item.id">
                {{ item.title }}
              </a>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="2"><span class="name"><i class="el-icon-user"></i>{{ item.name }}</span></el-col>
              <el-col :span="4"><span class="time"><i class="el-icon-time"></i>{{ item.gmtCreate }}</span></el-col>
              <el-col :span="2">1000 条评论</el-col>
              <el-col :span="2">{{ item.viewCount }} 人浏览</el-col>
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

            <el-form-item label="问题标题">
              <el-input v-model="query.title"></el-input>
            </el-form-item>

            <el-form-item label="问题作者">
              <el-input v-model="query.name"></el-input>
            </el-form-item>

            <el-form-item label="问题标签">
              <el-checkbox-group v-model="labels">
                <el-checkbox :label="item.id" v-for="item in labelList" :key="item.id">{{ item.title }}</el-checkbox>
              </el-checkbox-group>
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
                <el-radio :label="0">发布日期</el-radio>
                <el-radio :label="1">更新日期</el-radio>
                <el-radio :label="2">浏览数量</el-radio>
              </el-radio-group>
            </el-form-item>

          </el-form>
        </el-drawer>
      </section>
    </div>
</template>

<script>
import question from "../../api/question";

export default {
  data() {
    return {
      count: 0,
      List: [],
      limit: 8,
      total: 0,
      current: 0,
      query: {
        title: '',
        begin: '',
        end: '',
        order: 0,
      },
      labels: [],//查询标签
      labelList: [
        {title: 'Java', id: '1'}, {title: 'C++', id: '2'}, {title: 'C', id: '3'}
      ],
      visible: false
    }
  },
  created() {
    this.getQuestionByPage()
  },
  methods: {
    getQuestionByPage() {
      this.query.labels = this.labels
      question.getQuestionByPage(this.current, this.limit, this.query).then(response => {
        this.List = response.data.rows
        this.total = response.data.total
        this.query = {}
      })
    },
    handleCurrentChange(val) {
      this.current = val
      this.getQuestionByPage()
    },
    getLabel() {

    },
    pushQuestion() {
      this.$router.push({path: '/question'})
    },
    handleClose() {
      this.getQuestionByPage()
      this.visible = false
    }
  }
}
</script>

<style scoped>

</style>

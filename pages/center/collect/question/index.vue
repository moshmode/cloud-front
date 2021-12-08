<template>
  <div id="aCoursesList" class="bg-fa of">
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">用户中心</span>
        </h2>
      </header>
      <el-card>
        <NavBar>
          <el-card>
            <div slot="header" class="clearfix">
              <h3 style="float: left">我的问题</h3>
              <h3 style="float:right">共{{ total }}篇</h3>
            </div>
            <el-card v-for="(item) in List" :key="item.id" style="margin-bottom: 15px">
              <el-row style="font-size: 20px">
                <a :href="'/forum/'+item.id">
                  {{ item.title }}
                </a>
              </el-row>
              <el-row :gutter="10">
                <el-col :span="2"><i class="el-icon-user"></i>{{ item.name }}</el-col>
                <el-col :span="4"><i class="el-icon-time"></i>{{ item.gmtCreate }}</el-col>
                <el-col :span="2">1000 条评论</el-col>
              </el-row>
              <el-row>
                <el-button style="float: right" @click="cancelCollection(item.id)">取消收藏</el-button>
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
        </NavBar>
      </el-card>
    </section>
  </div>
</template>

<script>
import NavBar from "../../../../components/NavBar";
import cookie from "js-cookie";
import question from "@/api/question";
import interaction from "@/api/interaction";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      count: 0,
      List: [],
      limit: 8,
      total: 0,
      current: 0,
      question: {},
      memberInfo: {}
    }
  },
  created() {
    var userStr = cookie.get('memberInfo')
    if (userStr) {
      this.memberInfo = JSON.parse(userStr)
      this.getQuestionCollectedByPage()
    } else {
      this.$router.push({path: '/login'})
    }
  },
  methods: {
    getQuestionCollectedByPage() {
      this.question.memberId = this.memberInfo.id
      question.getQuestionCollectedByPage(this.current, this.limit, this.memberInfo.id).then(response => {
        this.List = response.data.rows
        this.total = response.data.total
      })
    },
    handleCurrentChange(val) {
      this.current = val
      this.getQuestionCollectedByPage()
    },
    cancelCollection(questionId) {
      var data = {}
      data.collected = 0
      data.memberId = this.memberInfo.id
      data.questionId = questionId
      interaction.addQuestionInteraction(data).then(response => {
        this.getQuestionCollectedByPage()
      })
    }
  }
}
</script>

<style scoped>

</style>

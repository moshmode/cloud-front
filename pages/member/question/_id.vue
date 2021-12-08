<template>
  <div id="aCoursesList" class="bg-fa of">
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">用户中心</span>
        </h2>
      </header>
      <el-card>
        <MemberNav :memberId="member.id">
          <el-card>
            <div slot="header" class="clearfix">
              <h3 style="float: left">问题列表</h3>
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
                <el-col :span="2">{{ item.viewCount }} 人浏览</el-col>
              </el-row>

              <el-row>
                <el-button style="float: right;margin-left: 15px" @click="deleteByQuestionId(item.id)">删除</el-button>
                <el-button style="float: right;margin-left: 15px" @click="updateQuestion(item.id)">更新</el-button>
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
        </MemberNav>
      </el-card>
    </section>
  </div>
</template>

<script>
import MemberNav from "@/components/MemberNav";
import member from "@/api/member";
import question from "@/api/question";


export default {
  components: {
    MemberNav
  },
  data() {
    return {
      member: {},
      List: [],
      limit: 8,
      total: 0,
      current: 0,
      question: {}
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      member.getMemberById(this.$route.params.id).then(response => {
        this.member = response.data.member
        this.getQuestionByPage()
      })
    }
  },
  methods: {
    getQuestionByPage() {
      this.question.memberId = this.member.id
      question.getQuestionByPage(this.current, this.limit, this.question).then(response => {
        this.List = response.data.rows
        this.total = response.data.total
      })
    },
    handleCurrentChange(val) {
      this.current = val
      this.getQuestionByPage()
    },
  }

}
</script>

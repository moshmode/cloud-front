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
              <h3 style="float: left">我的草稿</h3>
              <h3 style="float:right">共{{ total }}篇</h3>
            </div>

            <el-card v-for="(item) in List" :key="item.id" style="margin-bottom: 15px">
              <el-row style="font-size: 24px;margin-bottom: 15px;">
                <a :href="'/blog/'+item.id">
                  {{ item.title }}
                </a>
              </el-row>

              <el-row>
                <el-button style="float: right;margin-left: 15px" @click="deleteByDraftId(item.id)">删除</el-button>
                <el-button style="float: right;margin-left: 15px" @click="edit(item.id)">编辑</el-button>
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
import NavBar from "../../../components/NavBar";
import blog from "../../../api/blog";
import cookie from "js-cookie";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      List: [],
      limit: 8,
      total: 0,
      current: 0,
      detail: {},
      memberInfo: {}
    }
  },
  created() {
    var userStr = cookie.get('memberInfo')
    if (userStr) {
      this.memberInfo = JSON.parse(userStr)
      this.getDraftListByPage()
    } else {
      this.$router.push({path: '/login'})
    }
  },
  methods: {
    getDraftListByPage() {
      this.detail.memberId = this.memberInfo.id
      blog.getDraftListByPage(this.current, this.limit, this.detail).then(response => {
        this.List = response.data.rows
        this.total = response.data.total
      })
    },
    handleCurrentChange(val) {
      this.current = val
      this.getDraftListByPage()
    },
    edit(id) {
      this.$router.push({path: '/write/' + id})
    },
    deleteByDraftId(id) {
      blog.deleteDetailById(id).then(response => {
        this.getDraftListByPage()
      })
    }
  }
}
</script>

<style scoped>

</style>

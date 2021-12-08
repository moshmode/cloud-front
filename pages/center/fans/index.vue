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
              <h3 style="float: left">我的粉丝</h3>
              <h3 style="float:right">共{{ total }}人</h3>
            </div>
            <el-card v-for="(item) in List" :key="item.id" style="margin-bottom: 15px">

              <el-row :gutter="10">
                <div @click="goMemberCenter(item.memberId)">
                  <el-col :span="2">
                    <el-avatar size="large" :src="item.avatar"></el-avatar>
                  </el-col>
                </div>
                <el-col :span="6" style="font-size: 24px"><i class="el-icon-user"></i>{{ item.nickname }}</el-col>
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
import NavBar from "@/components/NavBar";
import interaction from "@/api/interaction";
import cookie from "js-cookie";

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
      memberInfo: {}
    }
  },
  created() {
    var userStr = cookie.get('memberInfo')
    if (userStr) {
      this.memberInfo = JSON.parse(userStr)
      this.getFansByPage()
    } else {
      this.$router.push({path: '/login'})
    }
  },
  methods: {
    getFansByPage() {
      interaction.getFans(this.current, this.limit, this.memberInfo.id).then(response => {
        this.List = response.data.rows
        this.total = response.data.total
      })
    },
    handleCurrentChange(val) {
      this.current = val
      this.getFansByPage()
    },
    goMemberCenter(id) {
      this.$router.push({path: '/member/' + id})
    }
  }
}
</script>

<style scoped>

</style>

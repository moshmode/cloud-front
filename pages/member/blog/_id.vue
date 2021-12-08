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
              <h3 style="float: left">博客列表</h3>
              <h3 style="float:right">共{{ total }}篇</h3>
            </div>

            <el-card v-for="(item) in List" :key="item.id" style="margin-bottom: 15px">
              <el-row style="font-size: 24px;margin-bottom: 15px;">
                <a :href="'/blog/'+item.id">
                  {{ item.title }}
                </a>
              </el-row>

              <el-row style="margin-bottom: 15px;">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="item.cover"
                  fit="fill"></el-image>
              </el-row>

              <el-row :gutter="10" style="margin-bottom: 15px;">
                <el-col :span="2">
                  <el-avatar :src="item.avatar"></el-avatar>
                </el-col>
                <el-col :span="3">
                  作者: {{ item.name }}
                </el-col>
                <el-col :span="5">
                  发布: {{ item.gmtCreate }}
                </el-col>
                <el-col :span="5">
                  更新: {{ item.gmtModified }}
                </el-col>
                <el-col :span="3">
                  {{ item.replyCount }}1000 条评论
                </el-col>
                <el-col :span="3">
                  {{ item.viewCount }} 人浏览
                </el-col>
              </el-row>

              <el-row style="margin-bottom: 15px;">
                <span style="font-size:16px;font-weight:bold">文章简介：</span>
                {{ item.brief }}
              </el-row>

              <el-row style="margin-bottom: 15px;font-size: 15px">
                标签:
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
        </MemberNav>
      </el-card>
    </section>
  </div>
</template>

<script>
import MemberNav from "@/components/MemberNav";
import member from "@/api/member";
import blog from "@/api/blog";


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
      blog: {}
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      member.getMemberById(this.$route.params.id).then(response => {
        this.member = response.data.member
        this.getBlogListByPage()
      })
    }
  },
  methods: {
    getBlogListByPage() {
      this.blog.memberId = this.member.id
      blog.getBlogListByPage(this.current, this.limit, this.blog).then(response => {
        this.List = response.data.rows
        this.total = response.data.total
      })
    },
    handleCurrentChange(val) {
      this.current = val
      this.getBlogListByPage()
    },
  }

}
</script>

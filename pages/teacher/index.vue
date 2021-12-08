<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部讲师</span>
        </h2>
      </header>


      <el-card>
        <!-- /无数据提示 开始-->
        <section class="no-data-wrap" v-if="total===0">
          <em class="icon30 no-data-ico">&nbsp;</em>
          <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
        </section>
        <!-- /无数据提示 结束-->
        <article class="i-teacher-list">
          <ul class="of">
            <li v-for="teacher in teacherList" :key="teacher.id">
              <section class="i-teach-wrap">
                <div class="i-teach-pic">
                  <a :href="'/teacher/'+teacher.id" :title="teacher.name" target="_blank">
                    <img :src="teacher.avatar" alt>
                  </a>
                </div>
                <div class="mt10 hLh30 txtOf tac">
                  <a :href="'/teacher/'+teacher.id" :title="teacher.name" target="_blank"
                     class="fsize18 c-666">{{ teacher.name }}</a>
                </div>
                <div class="hLh30 txtOf tac">
                  <span class="fsize14 c-999">{{ teacher.intro }}</span>
                </div>
                <div class="mt15 i-q-txt">
                  <p class="c-999 f-fA">{{ teacher.career }}</p>
                </div>
              </section>
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
        <!-- 公共分页 结束 -->
      </el-card>
    </section>
    <!-- /讲师列表 结束 -->
  </div>
</template>
<script>
import teacher from "../../api/teacher";

export default {
  //异步调用，调用一次
  //params: 相当于之前 this.$route.params.id  等价  params.id
  // asyncData({ params, error }) {
  //   return teacher.getTeacherList(1,8).then(response => {
  //     return { data: response.data }
  //   })
  // },
  data() {
    return {
      teacherList: [],
      total: 0,
      teacherQuery: {},
      current: 0,
      limit: 8
    }
  },
  created() {
    this.getTeacherList()
  },
  methods: {
    //分页切换的方法
    //参数是页码数
    getTeacherList() {
      teacher.getTeacherList(this.current, this.limit, this.teacherQuery)
        .then((response) => {
          this.teacherList = response.data.rows
          this.total = response.data.total
        })
    },
    handleCurrentChange(val) {
      this.current = val
      this.getTeacherList()
    }

  }
};
</script>

<template>
  <div id="aCoursesList" class="bg-fa of">
    <section class="container">
      <el-card>
        <el-row>
          <el-button @click="saveDetail" style="margin-bottom: 15px;float: right">更新</el-button>
        </el-row>
        <markdownEdit ref="md"/>
      </el-card>
    </section>
  </div>
</template>

<script>
import markdownEdit from "../../../../components/markdownEdit";
import blog from "../../../../api/blog";

export default {
  components: {
    markdownEdit
  },
  data() {
    return {
      detail: {
        id: '',
        blogId: '',
        memberId: '',
        content: '',
      }
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      blog.getDetailVoByBlogId(this.$route.params.id).then(response => {
        this.detail = response.data.detail
        this.$refs.md.content = this.detail.content
      })
    }

  },
  methods: {
    saveDetail() {
      this.detail.content = this.$refs.md.content
      blog.addDetail(this.detail).then(response => {
        this.$router.push({path: '/center/blog'})
      })

    }
  }
}
</script>

<style scoped>

</style>

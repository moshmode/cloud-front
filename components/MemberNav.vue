<template>
  <el-row>
    <el-col :span="4" class="tac">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @select="goto">
        <el-menu-item :index="'/member/'+memberId">
          <i class="el-icon-setting"></i>
          <span slot="title">常规</span>
        </el-menu-item>
        <el-menu-item :index="'/member/blog/'+memberId">
          <i class="el-icon-document-checked"></i>
          <span slot="title">博客</span>
        </el-menu-item>
        <el-menu-item :index="'/member/question/'+memberId">
          <i class="el-icon-question"></i>
          <span slot="title">问题</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20">
      <slot></slot>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "MemberNav",
  props: {
    memberId: {
      type: String,
      default: '0'
    }
  },
  methods: {
    goto(index) {
      this.$router.push({path: index})
    }
  }
}
</script>

<style scoped>

</style>

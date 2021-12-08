<template>
  <el-row>
    <el-col :span="4" class="tac">
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @select="goto">
        <el-menu-item index="/center/">
          <i class="el-icon-setting"></i>
          <span slot="title">常规</span>
        </el-menu-item>
        <el-menu-item index="/center/blog">
          <i class="el-icon-document-checked"></i>
          <span slot="title">博客</span>
        </el-menu-item>
        <el-menu-item index="/center/draft">
          <i class="el-icon-document"></i>
          <span slot="title">草稿</span>
        </el-menu-item>
        <el-menu-item index="/center/question">
          <i class="el-icon-question"></i>
          <span slot="title">问题</span>
        </el-menu-item>

        <el-submenu index="/center/collect">
          <template slot="title">
            <i class="el-icon-star-off"></i>
            <span>收藏</span>
          </template>
          <el-menu-item index="/center/collect/blog">
            <template slot="title">
              <i class="el-icon-collection"></i>
              <span>博客</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/center/collect/question">
            <template slot="title">
              <i class="el-icon-collection-tag"></i>
              <span>问题</span>
            </template>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="/center/view">
          <i class="el-icon-view"></i>
          <span slot="title">关注</span>
        </el-menu-item>
        <el-menu-item index="/center/fans">
          <i class="el-icon-user"></i>
          <span slot="title">粉丝</span>
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
  name: "NavBar",
  methods: {
    goto(index) {
      this.$router.push({path: index})
    }
  }
}
</script>

<style scoped>

</style>

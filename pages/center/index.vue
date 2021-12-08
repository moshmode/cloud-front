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

            <el-form style="margin-top: 15px" :model="memberInfo" label-width="80px">
              <el-form-item label="头像">
                <el-avatar style="margin-left: 15px" :size="100" :src="memberInfo.avatar"></el-avatar>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input
                  v-model="memberInfo.nickname"
                  :disabled="disabled"
                  maxlength="15"
                  show-word-limit>
                </el-input>
              </el-form-item>

              <el-form-item label="性别">
                <el-radio-group v-model="memberInfo.sex" :disabled="disabled">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="0">女</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="年龄">
                <el-input-number v-model="memberInfo.age" :disabled="disabled"></el-input-number>
              </el-form-item>

              <el-form-item label="个性签名">
                <el-input
                  v-model="memberInfo.sign"
                  :disabled="disabled"
                  maxlength="50"
                  show-word-limit>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button v-if="disabled" style="float: right" @click="disabled = false">编辑</el-button>
                <div v-else>
                  <el-button style="float: right;margin-left: 15px" @click="save">保存</el-button>
                  <el-button style="float: right" @click="cancel">取消</el-button>
                </div>

              </el-form-item>
            </el-form>


          </el-card>
        </NavBar>
      </el-card>
    </section>
  </div>
</template>

<script>
import NavBar from "../../components/NavBar";
import center from "@/api/center";
import cookie from "js-cookie";

export default {
  components: {
    NavBar
  },
  data() {
    return {
      memberInfo: {},
      disabled: true
    }
  },
  created() {
    var userStr = cookie.get('memberInfo');
    if (userStr) {
      this.memberInfo = JSON.parse(userStr)
    } else {
      this.$router.push({path: '/login'})
    }
  },
  methods: {
    cancel() {
      var userStr = cookie.get('memberInfo');
      if (userStr) {
        this.memberInfo = JSON.parse(userStr)
      } else {
        this.$router.push({path: '/login'})
      }
      this.disabled = true
    },
    save() {
      center.updateMemberInfo(this.memberInfo).then(response => {
        cookie.set('memberInfo', JSON.stringify(this.memberInfo), {domain: 'localhost'})
      })
      this.disabled = true
    }
  }
}
</script>

<style scoped>

</style>

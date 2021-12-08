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
            <el-form style="margin-top: 15px" :model="member" label-width="80px">
              <el-form-item label="头像">
                <el-avatar style="margin-left: 15px" :size="100" :src="member.avatar"></el-avatar>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input
                  v-model="member.nickname"
                  :disabled="true"
                  maxlength="15"
                  show-word-limit>
                </el-input>
              </el-form-item>

              <el-form-item label="性别">
                <el-radio-group v-model="member.sex" :disabled="true">
                  <el-radio :label="1">男</el-radio>
                  <el-radio :label="0">女</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="年龄">
                <el-input-number v-model="member.age" :disabled="true"></el-input-number>
              </el-form-item>

              <el-form-item label="签名">
                <el-input v-model="member.sign" :disabled="true"></el-input>
              </el-form-item>
            </el-form>


          </el-card>
        </MemberNav>
      </el-card>
    </section>
  </div>
</template>

<script>
import MemberNav from "@/components/MemberNav";
import member from "@/api/member";


export default {
  components: {
    MemberNav
  },
  data() {
    return {
      member: {}
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      member.getMemberById(this.$route.params.id).then(response => {
        this.member = response.data.member
      })
    }
  }
}
</script>


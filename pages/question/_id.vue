<template>
  <div id="aCoursesList" class="bg-fa of">
    <section class="container">
      <el-card>
        <el-row :gutter="20" style="margin-bottom: 20px">
          <el-col :span="16">
            <el-input
              type="text"
              placeholder="请输入标题"
              v-model="question.title"
              maxlength="30"
              show-word-limit
            />
          </el-col>
          <el-col :span="4">
            <el-button style="float: right" @click="dialogFormVisible=true">发布</el-button>
          </el-col>
        </el-row>
        <no-ssr>
          <tinymce v-model="question.content"/>
        </no-ssr>
      </el-card>
      <el-dialog title="问题信息" :visible.sync="dialogFormVisible">
        <el-form :model="question" label-width="100px" :rules="rules" ref="form">
          <el-form-item label="问题标题" prop="title">
            <el-input v-model="question.title" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="问题标签" prop="labels">
            <el-tag
              :key="tag.id"
              v-for="tag in labels"
              closable
              @close="handleClose(tag)"
              :disable-transitions="false">
              {{ tag.title }}
            </el-tag>
            <el-select v-model="label" value-key="id" placeholder="请选择" @change="change">
              <el-option
                v-for="item in labelList"
                :key="item.id"
                :label="item.title"
                :value="item">
              </el-option>
            </el-select>

          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="publish">确 定</el-button>
        </div>
      </el-dialog>
    </section>
  </div>
</template>

<script>

import Tinymce from "../../components/Tinymce";
import cookie from "js-cookie";
import question from "../../api/question";

export default {
  components: {Tinymce},
  data() {
    var checkLabel = (rule, value, callback) => {
      if (this.labels.length === 0) {
        callback(new Error('请加入标签'));
      } else if (this.labels.length >= 5) {
        callback(new Error('标签过多'));
      } else {
        callback();
      }
    };
    return {
      question: {
        memberId: '',
        name: '',
        avatar: '',
        title: '',
        content: ''
      },
      memberInfo: {},
      labelList: [
        {title: 'Java', id: '1'}, {title: 'C++', id: '2'}, {title: 'C', id: '3'}
      ],
      labels: [],
      label: {
        id: '',
        title: ''
      },
      dialogFormVisible: false,
      rules: {
        title: [
          {required: true, message: '请输入问题标题', trigger: 'blur'},
          {min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur'}
        ],
        labels: [
          {validator: checkLabel, trigger: 'change'}
        ]
      }
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      question.getById(this.$route.params.id).then(response => {
        this.question = response.data.question
      })
    }

    var userStr = cookie.get('memberInfo')
    if (userStr) {
      this.memberInfo = JSON.parse(userStr)
    } else {
      this.$router.push({path: '/login'})
    }
  },
  methods: {
    publish() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.question.memberId = this.memberInfo.id
          this.question.name = this.memberInfo.nickname
          this.question.avatar = this.memberInfo.avatar
          this.question.labels = this.labels
          question.addQuestion(this.question).then(response => {
            this.$router.push({path: '/forum'})
          })
        } else {
          return false;
        }
      })
    },
    change(item) {
      this.labels.push(item)
      this.labelList.splice(this.labelList.indexOf(item), 1);
      this.label = {}
    },
    handleClose(tag) {
      this.labels.splice(this.labels.indexOf(tag), 1);
      this.labelList.push(tag)
    },

  }
}
</script>

<style scoped>

</style>

<template>
    <div id="aCoursesList" class="bg-fa of">
      <section class="container">
        <el-card>
          <el-row :gutter="20" style="margin-bottom: 20px">
            <el-col :span="16">
              <el-input
                type="text"
                placeholder="请输入标题"
                v-model="detail.title"
                maxlength="10"
                show-word-limit
              />
            </el-col>
            <el-col :span="4">
              <el-button @click="saveDetail" style="float: right">保存</el-button>
            </el-col>
            <el-col :span="4">
              <el-button @click="dialogFormVisible = true">发布</el-button>
            </el-col>
          </el-row>

          <markdownEdit ref="md"/>
        </el-card>

        <el-dialog title="博客信息" :visible.sync="dialogFormVisible">
          <el-form :model="blog" :rules="rules" ref="form">
            <el-form-item label="博客标题" prop="title">
              <el-input v-model="blog.title" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="博客分类" prop="subject">
              <el-select v-model="blog.subjectParentId" placeholder="请选择" @change="getSecondarySubjects">
                <el-option
                  v-for="item in primarySubjects"
                  :key="item.id"
                  :label="item.title"
                  :value="item.id">
                </el-option>
              </el-select>

              <el-select v-model="secondarySubject" value-key="id" placeholder="请选择" @change="getSubject">
                <el-option
                  v-for="item in secondarySubjects"
                  :key="item.id"
                  :label="item.title"
                  :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="博客封面">
              <el-upload
                :action="baseURL+'/obs/blog/cover'"
                list-type="picture-card"
                :before-upload="beforeUpload"
                :on-success="handleCoverSuccess"
                :limit="1">
                <i slot="default" class="el-icon-plus"></i>
                <div slot="file">
                  <img class="el-upload-list__item-thumbnail"
                       :src="this.blog.cover"
                       alt=""/>
                  <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview">
                      <i class="el-icon-zoom-in"></i>
                    </span>
                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove">
                      <i class="el-icon-delete"></i>
                    </span>
                </span>
                </div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </el-form-item>
            <el-form-item label="博客简介" prop="brief">
              <el-input v-model="blog.brief" type="textarea" autocomplete="off" maxlength="500" show-word-limit
                        :autosize="{ minRows: 2, maxRows: 4}"></el-input>
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
import markdownEdit from "../../components/markdownEdit";
import subject from "../../api/subject";
import blog from "../../api/blog";
import cookie from "js-cookie";
import ip from "@/utils/ip";

export default {
  components: {
    markdownEdit
  },
  data() {
    var checkSubject = (rule, value, callback) => {
      if (this.blog.subjectId === '') {
        callback(new Error('请添加分类'));
      } else {
        callback();
      }
    };
    var checkBrief = (rule, value, callback) => {
      if (this.blog.brief === '') {
        callback(new Error('请添加简介'));
      } else {
        callback();
      }
    };

    return {
      primarySubjects: [],
      secondarySubjects: [],
      detail: {
        id: '',
        blogId: '',
        memberId: '',
        content: '',
        title: ''
      },
      blog: {
        title: '',
        subjectId: '',
        memberId: '',
        subjectParentId: '',
        subjectTitle: '',
        name: '',
        avatar: '',
        cover: '',
        brief: ''
      },
      secondarySubject: {},
      memberInfo: {
        memberId: '',
        name: '',
        avatar: ''
      },
      dialogFormVisible: false,
      dialogImageUrl: '',
      dialogVisible: false,
      baseURL: ip,
      rules: {
        title: [
          {required: true, message: '请输入问题标题', trigger: 'blur'},
          {min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur'}
        ],
        subject: [
          {validator: checkSubject, trigger: 'change'}
        ],
        brief: [
          {validator: checkBrief, trigger: 'blur'}
        ]
      }
    }
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      blog.getDetail(this.$route.params.id).then(response => {
        this.detail = response.data.detail
        this.$refs.md.content = this.detail.content
      })
    }
    this.getAllSubjects()
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
          this.detail.content = this.$refs.md.content
          this.blog.memberId = this.memberInfo.id
          this.blog.name = this.memberInfo.nickname
          this.blog.avatar = this.memberInfo.avatar
          blog.addBlog(this.blog).then(response => {
            this.detail.blogId = response.data.blogId
            this.saveDetail()
          })
          this.dialogFormVisible = false
        } else {
          return false
        }
      })
    },
    saveDetail() {
      this.detail.content = this.$refs.md.content
      this.detail.memberId = this.memberInfo.id
      blog.addDetail(this.detail).then(response => {
        this.detail.id = response.data.detailId
      })
    },
    handleRemove() {
      blog.deleteBlogCover(this.blog.cover).then(response => {
        this.blog.cover = ''
      })
    },
    handlePictureCardPreview() {
      this.dialogImageUrl = this.blog.cover;
      this.dialogVisible = true;
    },
    beforeUpload(file) {
      if (this.blog.cover !== '') {
        this.handleRemove()
      }
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleCoverSuccess(res, file) {
      this.blog.cover = res.data.url
    },
    getSecondarySubjects(primarySubjectId) {
      this.blog.subjectId = ''
      this.secondarySubject = {}
      this.primarySubjects.forEach(item => {
        if (item.id === primarySubjectId) {
          this.secondarySubjects = item.children
        }
      })
    },
    getAllSubjects() {
      subject.getNestedTreeList().then(response => {
        this.primarySubjects = response.data.items
      })
    },
    getSubject(secondarySubject) {
      this.blog.subjectId = secondarySubject.id
      this.blog.subjectTitle = secondarySubject.subjectTitle
    }
  },
  watch: {
    "detail.title": {
      handler(newVal) {
        this.blog.title = newVal
      }
    },
    "blog.title": {
      handler(newVal) {
        this.detail.title = newVal
      }
    }
  }
}
</script>

<style scoped>

</style>

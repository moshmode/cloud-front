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
              <h3 style="float: left">我的博客</h3>
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
              <el-row>
                <el-button style="float: right;margin-left: 15px" @click="deleteByBlogId(item.id)">删除</el-button>
                <el-button style="float: right;margin-left: 15px" @click="updateBlog(item.id)">更新</el-button>
                <el-button style="float: right" @click="settingBlog(item)">设置</el-button>
              </el-row>

            </el-card>

            <el-dialog title="博客信息" :visible.sync="dialogFormVisible">
              <el-form :model="blog" :rules="rules" ref="form">
                <el-form-item label="博客标题" prop="title">
                  <el-input v-model="blog.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="博客分类" prop="subject">
                  <el-select v-model="blog.subjectParentId" placeholder="请选择" @change="changePrimarySubject">
                    <el-option
                      v-for="item in primarySubjects"
                      :key="item.id"
                      :label="item.title"
                      :value="item.id">
                    </el-option>
                  </el-select>

                  <el-select v-model="blog.subjectId" placeholder="请选择" @change="changeSubject">
                    <el-option
                      v-for="item in secondarySubjects"
                      :key="item.id"
                      :label="item.title"
                      :value="item.id">
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
                <el-button type="primary" @click="updateSettings">确 定</el-button>
              </div>
            </el-dialog>

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
import NavBar from "../../../components/NavBar";
import blog from "../../../api/blog";
import cookie from "js-cookie";
import subject from "../../../api/subject";
import ip from "@/utils/ip";

export default {
  components: {
    NavBar
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
      secondarySubject: {},
      List: [],
      limit: 8,
      total: 0,
      current: 0,
      blog: {
        title: '',
        subjectId: '',
        memberId: '',
        subjectParentId: '',
        subjectTitle: '',
        cover: '',
        brief: ''
      },
      memberInfo: {},
      dialogFormVisible: false,
      dialogImageUrl: '',
      disabled: false,
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
    var userStr = cookie.get('memberInfo')
    if (userStr) {
      this.memberInfo = JSON.parse(userStr)
      this.getAllSubjects()
      this.getBlogListByPage()
    } else {
      this.$router.push({path: '/login'})
    }
  },
  methods: {
    getBlogListByPage() {
      this.blog.memberId = this.memberInfo.id
      blog.getBlogListByPage(this.current, this.limit, this.blog).then(response => {
        this.List = response.data.rows
        this.total = response.data.total
      })
    },
    handleCurrentChange(val) {
      this.current = val
      this.getBlogListByPage()
    },
    deleteByBlogId(id) {
      this.$confirm('此操作将删除该博客, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        blog.deleteBlog(id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    updateBlog(id) {
      this.$router.push({path: '/center/blog/update/' + id})
    },
    settingBlog(item) {
      this.dialogFormVisible = true
      this.blog.id = item.id
      this.blog.title = item.title
      this.blog.memberId = item.memberId
      this.blog.cover = item.cover
      this.blog.subjectParentId = item.subjectParentId
      this.blog.subjectId = item.subjectId
      this.blog.subjectTitle = item.subjectTitle
      this.blog.brief = item.brief
      this.getSecondarySubjects(item.subjectParentId)
    },
    updateSettings() {
      blog.updateBlog(this.blog).then(response => {
        this.getBlogListByPage()
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
    changePrimarySubject(primarySubjectId) {
      this.blog.subjectId = ''
      this.getSecondarySubjects(primarySubjectId)
    },
    getSecondarySubjects(primarySubjectId) {
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
    changeSubject(secondarySubjectId) {
      this.blog.subjectId = secondarySubjectId
      this.secondarySubjects.forEach(item => {
        if (item.id === secondarySubjectId) {
          this.blog.subjectTitle = item.title
        }
      })
      this.$forceUpdate()
    }
  }
}
</script>

<style scoped>

</style>

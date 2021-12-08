<!--评论模块-->
<template>
  <div>
    <el-input class="gray-bg-input"
              v-model="inputComment"
              type="textarea"
              :rows="3"
              autofocus
              placeholder="写下你的评论">
    </el-input>
    <div style="margin-top: 10px;">
      <el-button type="info" @click="cancel">取消</el-button>
      <el-button type="primary" @click="commitComment">确定</el-button>
    </div>

    <el-card style="margin-top: 15px" class="comment" v-for="item in comments" :key="item.id">
      <el-row :gutter="10" style="margin-bottom: 20px;font-size: 14px">
        <el-col :span="1">
          <el-avatar :src="item.avatar"></el-avatar>
        </el-col>
        <el-col :span="1">
          作者: {{ item.nickname }}
        </el-col>
        <el-col :span="3">
          发布: {{ item.gmtCreate }}
        </el-col>
      </el-row>
      <div class="content">{{ item.content }}</div>
      <div class="control">
        <span class="comment-reply" @click="showInput(item)">
          <i class="iconfont icon-comment"></i>
          <span>回复</span>
        </span>
      </div>
      <div class="reply">
        <div class="item" v-for="reply in item.replyList" :key="reply.id">
          <div class="reply-content">
            <span class="from-name">{{ reply.nickname }}</span><span>: </span>
            <span class="to-name">@{{ reply.toNickname }}</span>
            <span>{{ reply.content }}</span>
          </div>
          <div class="reply-bottom">
            <span>{{ reply.gmtCreate }}</span>
            <span class="reply-text" @click="showInput(item, reply)">
              <i class="iconfont icon-comment"></i>
              <span>回复</span>
            </span>
          </div>
        </div>
        <div class="write-reply" @click="showInput(item)">
          <i class="el-icon-edit"></i>
          <span class="add-comment">添加新回复</span>
        </div>
        <transition name="fade">
          <div class="input-wrapper" v-if="showItemId === item.id">
            <el-input class="gray-bg-input"
                      v-model="inputReply"
                      type="textarea"
                      :rows="3"
                      autofocus
                      placeholder="写下你的回复">
            </el-input>
            <div class="btn-control">
              <span class="cancel" @click="cancel">取消</span>
              <el-button class="btn" type="primary" round @click="commitReply(item)">确定</el-button>
            </div>
          </div>
        </transition>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    comments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      inputComment: '',
      inputReply: '',
      showItemId: '',
      replyInfo: {
        toMemberId: '',
        toNickname: ''
      }
    }
  },
  computed: {},
  methods: {

    /**
     * 点击取消按钮
     */
    cancel() {
      this.showItemId = ''
    },

    /**
     * 提交评论
     */
    commitComment() {
      this.$emit('commitComment', this.inputComment);
      this.inputComment = ''
      this.replyInfo = {}
    },
    commitReply(item) {
      this.$emit('commitReply', this.replyInfo, this.inputReply);
      this.inputReply = ''
      this.showItemId = ''
      this.replyInfo = {}
    },

    /**
     * 点击评论按钮显示输入框
     * item: 当前大评论
     * reply: 当前回复的评论
     */
    showInput(item, reply) {
      if (reply) {
        this.replyInfo.toMemberId = reply.memberId
        this.replyInfo.toNickname = reply.nickname
      } else {
        this.replyInfo.toMemberId = item.memberId
        this.replyInfo.toNickname = item.nickname
      }
      this.replyInfo.parentId = item.id
      this.showItemId = item.id
    }
  },
  created() {

  }
}
</script>

<style scoped lang="scss">
.content {
  font-size: 16px;
  color: #303133;
  line-height: 20px;
  padding: 10px 0;
}

.write-reply {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #909399;
  padding: 10px;
  cursor: pointer;

  &:hover {
    color: #303133;
  }

  .el-icon-edit {
    margin-right: 5px;
  }
}


.comment {
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-bottom: 1px solid #F2F6FC;

  .info {
    display: flex;
    align-items: center;

    .avatar {
      border-radius: 50%;
    }

    .right {
      display: flex;
      flex-direction: column;
      margin-left: 10px;

      .name {
        font-size: 16px;
        color: #303133;
        margin-bottom: 5px;
        font-weight: 500;
      }

      .date {
        font-size: 12px;
        color: #909399;
      }
    }
  }


  .control {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #909399;

    .like {
      display: flex;
      align-items: center;
      margin-right: 20px;
      cursor: pointer;

      &.active, &:hover {
        color: #409EFF;
      }

      .iconfont {
        font-size: 14px;
        margin-right: 5px;
      }
    }

    .comment-reply {
      display: flex;
      align-items: center;
      cursor: pointer;

      &:hover {
        color: #333;
      }

      .iconfont {
        font-size: 16px;
        margin-right: 5px;
      }
    }

  }

  .reply {
    margin: 10px 0;
    border-left: 2px solid #DCDFE6;

    .item {
      margin: 0 10px;
      padding: 10px 0;
      border-bottom: 1px dashed #EBEEF5;

      .reply-content {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #303133;

        .from-name {
          color: #409EFF;
        }

        .to-name {
          color: #409EFF;
          margin-left: 5px;
          margin-right: 5px;
        }
      }

      .reply-bottom {
        display: flex;
        align-items: center;
        margin-top: 6px;
        font-size: 12px;
        color: #909399;

        .reply-text {
          display: flex;
          align-items: center;
          margin-left: 10px;
          cursor: pointer;

          &:hover {
            color: #333;
          }

          .icon-comment {
            margin-right: 5px;
          }
        }
      }
    }


    .fade-enter-active, fade-leave-active {
      transition: opacity 0.5s;
    }

    .fade-enter, .fade-leave-to {
      opacity: 0;
    }

    .input-wrapper {
      padding: 10px;

      .gray-bg-input, .el-input__inner {
        /*background-color: #67C23A;*/
      }

      .btn-control {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-top: 10px;

        .cancel {
          font-size: 16px;
          color: #606266;
          margin-right: 20px;
          cursor: pointer;

          &:hover {
            color: #333;
          }
        }

        .confirm {
          font-size: 15px;
        }
      }
    }
  }
}

</style>

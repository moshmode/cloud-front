<template>
  <div>
    <no-ssr>
      <mavon-editor
        v-model="content"
        ref="md"
        @change="change"
        @imgAdd="$imgAdd"
        :toolbarsFlag="toolbarsFlag"
        :subfield="subfield"
        :defaultOpen="defaultOpen"
        :ishljs="true"
        :tab-size="4"
        codeStyle="rainbow"
        previewBackground="background-color: rgba($color: #fff, $alpha: 0.6);"
        style="min-height: 600px;"
      />
    </no-ssr>
    <!-- <button @click="submit">提交</button> -->
  </div>
</template>

<script>
import axios from 'axios'
// 导入组件 及 组件样式
export default {
  props: {
    subfield: {
      type: Boolean,
      default: false
    },
    defaultOpen: {
      type: String,
      default: 'edit'
    },
    toolbarsFlag: {
      type: Boolean,
      default: true
    },
    previewBackground: {
      type: String,
      default: '#fbfbfb'
    }
  },
  data() {
    return {
      content: '', // 输入的markdown
      html: '',    // 及时转的html
    }
  },
  computed: {
    articleImageUpload() {
      return ``
    }
  },
  methods: {
    // 上传文件回调
    $imgAdd(pos, $file) {
      // 第一步，将图片上传到服务器
      let formdata = new FormData();
      formdata.append('image', $file);
      // console.log($file, formdata)
      axios({
        url: `obs/avatar`,
        method: 'post',
        data: formdata,
        headers: {'Content-Type': 'multipart/form-data'},
      }).then((data) => {
        // 第二部，将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        console.log(pos)
        this.$refs.md.$img2Url(pos, data.data.file.url)
      })
    },
    // 所有操作都会被解析重新渲染
    change(value, render) {
      // render 为 markdown 解析后的结果[html]
      // console.log(value, render)
      this.html = render;
    },
    // 提交
    submit() {
      // console.log(this.content);
      // console.log(this.html);
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>

</style>

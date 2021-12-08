<template>

  <div class="in-wrap">

    <!-- 公共头引入 -->
    <no-ssr>
      <header id="header">
        <section class="container">
          <h1 id="logo">
            <a href="#" title="云学院">
              <img src="~/assets/img/logo.png" width="100%" alt="云学院">
            </a>
          </h1>
          <div class="h-r-nsl">
            <ul class="nav">
              <router-link to="/" tag="li" active-class="current" exact>
                <a>首页</a>
              </router-link>
              <router-link to="/blog" tag="li" active-class="current">
                <a>博客</a>
              </router-link>
              <router-link to="/forum" tag="li" active-class="current">
                <a>论坛</a>
              </router-link>
              <router-link to="/course" tag="li" active-class="current">
                <a>官方视频</a>
              </router-link>
              <router-link to="/teacher" tag="li" active-class="current">
                <a>官方UP</a>
              </router-link>
              <router-link to="/about" tag="li" active-class="current">
                <a>关于我们</a>
              </router-link>
            </ul>
            <!-- / nav -->
            <ul class="h-r-login">
              <li v-if="!loginInfo.id" id="no-login">
                <a href="/login" title="登录">
                  <em class="icon18 login-icon">&nbsp;</em>
                  <span class="vam ml5">登录</span>
                </a>
                |
                <a href="/register" title="注册">
                  <span class="vam ml5">注册</span>
                </a>
              </li>
              <li v-if="loginInfo.id" id="is-login-one" class="mr10">
                <a id="headerMsgCountId" href="#" title="消息">
                  <i style="font-size: 24px;" class="el-icon-chat-dot-square">&nbsp;</i>
                </a>

              </li>
              <li v-if="loginInfo.id" id="is-login-two" class="h-r-user">
                <a href="/center" title>
                  <img
                    :src="loginInfo.avatar"
                    width="30"
                    height="30"
                    class="vam picImg"
                    alt
                  >
                </a>
                <a href="javascript:void(0);" title="退出" @click="logout()" class="ml5">退出</a>
              </li>
              <!-- /未登录显示第1 li；登录后显示第2，3 li -->
            </ul>
          </div>
          <aside class="mw-nav-btn">
            <div class="mw-nav-icon"></div>
          </aside>
          <div class="clear"></div>
        </section>
      </header>
    </no-ssr>
    <!-- /公共头引入 -->
    <nuxt/>


    <!-- 公共底引入 -->
    <footer id="footer">
      <section class="container">
        <div title="智能基座">智能基座</div>
        <div class="clear"></div>
        <div class="b-foot">
          <section class="fl col-7">
            <section class="mr20">
              <section class="b-f-link">
                <a href="#" title="关于我们" target="_blank">关于我们</a>|
                <a href="#" title="联系我们" target="_blank">联系我们</a>|
                <a href="#" title="帮助中心" target="_blank">帮助中心</a>|
                <span>服务热线：13021885052</span>
                <span>Email：mosh@mode.com</span>
                <span>后端源码：https://github.com/moshmode/cloud</span>
                <span>前台源码：https://github.com/moshmode/cloud-front</span>
                <span>后台源码：https://github.com/moshmode/cloud-back</span>
              </section>
              <section class="b-f-link mt10">
                <span>©课程版权均归云学院所有 深ICP备666号</span>
              </section>
            </section>
          </section>
          <aside class="fl col-3 tac mt15">
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wx-icon.png" alt>
              </span>
            </section>
            <section class="gf-tx">
              <span>
                <img src="~/assets/img/wb-icon.png" alt>
              </span>
            </section>
          </aside>
          <div class="clear"></div>
        </div>
      </section>
    </footer>
    <!-- /公共底引入 -->

  </div>

</template>

<script>
import '~/assets/css/reset.css'
import '~/assets/css/theme.css'
import '~/assets/css/global.css'
import '~/assets/css/web.css'
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import "~/assets/css/pages-weixinpay.css"

import cookie from 'js-cookie'
import loginApi from '@/api/login'

export default {
  data() {
    return {
      token: '',
      loginInfo: {
        id: '',
        age: '',
        avatar: '',
        mobile: '',
        nickname: '',
        sex: ''
      }
    }
  },
  created() {
    //获取路径里面token值
    this.token = this.$route.query.token
    if (this.token) {//判断路径是否有token值
      this.wxLogin()
    }
    this.showInfo()
  },
  methods: {
    //微信登录显示的方法
    wxLogin() {
      //console.log('************'+this.token)
      //把token值放到cookie里面
      cookie.set('token', this.token, {domain: 'localhost'})
      cookie.set('memberInfo', '', {domain: 'localhost'})
      //console.log('====='+cookie.get('guli_token'))
      //调用接口，根据token值获取用户信息
      loginApi.getLoginUserInfo()
        .then(response => {
          // console.log('################'+response.data.data.userInfo)
          this.loginInfo = response.data.memberInfo
          cookie.set('memberInfo', this.loginInfo, {domain: 'localhost'})
        })
    },
    //创建方法，从cookie获取用户信息
    showInfo() {
      //从cookie获取用户信息
      var userStr = cookie.get('memberInfo')
      // 把字符串转换json对象(js对象)

      if (userStr) {
        this.loginInfo = JSON.parse(userStr)
      }
    },

    //退出
    logout() {
      //清空cookie值
      cookie.set('token', '', {domain: 'localhost'})
      cookie.set('memberInfo', '', {domain: 'localhost'})
      //回到首页面
      window.location.href = "/";
    }

  }
};
</script>

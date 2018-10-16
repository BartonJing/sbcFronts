<template>
  <div>
    <el-container class="home-container">
      <el-aside :class="isCollapse?'menu-collapsed':'menu-expanded'">
        <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          @select="handleSelect">
          <NavMenu :navMenus="routes[2].children" v-if="initSuccess"></NavMenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <el-row>
            <el-col :span="6">
              <i class="el-icon-menu" @click="isCollapseHander"></i>
            </el-col>
            <el-col :span="6">
              <el-badge :value="12">
                <el-button size="small">评论</el-button>
              </el-badge>
            </el-col>
            <el-col :span="6">
              <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>设置</el-dropdown-item>
                  <el-dropdown-item>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span>{{user.name}}</span>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
          </el-breadcrumb>
          <!--<keep-alive>
            <router-view v-if="aa"></router-view>
          </keep-alive>-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavMenu from './common/NavMenu'
export default {
  name: 'HOME',
  components: {NavMenu},
  data () {
    return {
      isCollapse: false,
      initSuccess: false,
      aa: true
    }
  },
  mounted () {
    this.initMenu()
  },
  created () {
    this.initSlot()
  },
  methods: {
    clickListener (item) {
      this.$router.replace({path: item.path})
    },
    isCollapseHander () {
      this.isCollapse = !this.isCollapse
    },
    initMenu: function () {
      const _this = this
      if (_this.$store.state.user === null || _this.$store.state.user.token === null || _this.$store.state.user.token === '') {
        _this.$router.replace({path: '/login'})
      }
      if (_this.$store.state.routes.length > 0) {
        return
      }
      _this.getRequest('/auth/permission/selectUserPermissionsTree?userId=' + _this.user.id).then(resp => {
        if (resp !== null) {
          var fmtRoutes = _this.formatRoutes(resp)
          _this.$router.options.routes[2].children = fmtRoutes
          _this.$router.addRoutes(fmtRoutes)
          _this.$store.commit('initMenu', fmtRoutes)
        }
      })
      // initMenu
    },
    formatRoutes (routes) {
      const _this = this
      let fmRoutes = []
      routes.forEach(router => {
        if (router.children && router.children instanceof Array) {
          router.children = _this.formatRoutes(router.children)
        }
        let fmRouter = {
          id: router.id,
          path: router.path,
          component (resolve) {
            require(['../components' + router.component + '.vue'], resolve)
          },
          name: router.name,
          iconCls: router.icon,
          meta: null,
          children: router.children
        }
        fmRoutes.push(fmRouter)
      })
      return fmRoutes
    },
    handleSelect (value, keyPath) {
      this.$router.push({path: value})
    },
    initSlot () {
      let vm = this
      setTimeout(function () {
        vm.initSuccess = true
      }, 500)
    }
  },
  computed: {
    routes () {
      return this.$router.options.routes
    },
    user () {
      return this.$store.state.user
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .home-container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }
  .menu-collapsed{
    flex:0 0 65px;
    width: 60px;
  }
  .menu-expanded{
    flex:0 0 230px;
    width: 230px;
  }
  .el-header {
    padding-top: 20px;
    background-color: rgb(84, 92, 100);
    color: #ffffff;
  }

  .el-aside {
    background-color: rgb(84, 92, 100)
  }
</style>

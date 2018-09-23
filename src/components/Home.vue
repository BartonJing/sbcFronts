<template>
  <div>
    <el-container class="home-container">
      <el-aside :class="isCollapse?'menu-collapsed':'menu-expanded'">
        <!--<div v-for="(item,index) in this.routes" :key="index">
          <a v-bind:href="'/#'+item.path">{{item.name}}</a>
          <el-button @click="clickListener(item)">{{item.name}}</el-button>
        </div>-->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
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
              <span>王小虎</span>
            </el-col>
          </el-row>
        </el-header>

        <!--<el-main>
          <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120">
            </el-table-column>
            <el-table-column prop="address" label="地址">
            </el-table-column>
          </el-table>
        </el-main>-->
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
          </el-breadcrumb>
          <keep-alive>
            <router-view v-if="this.$route.meta.keepAlive"></router-view>
          </keep-alive>
          <router-view v-if="!this.$route.meta.keepAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'HOME',
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      isCollapse: false,
      list: ['1', '2', '3'],
      tableData: Array(20).fill(item)
    }
  },
  methods: {
    clickListener (item) {
      this.$router.replace({path: item.path})
    },
    isCollapseHander () {
      this.isCollapse = !this.isCollapse
    }
  },
  computed: {
    routes () {
      return this.$router.options.routes
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

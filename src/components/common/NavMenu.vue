<template>
  <div>
    <template v-for="navMenu in navMenus">
      <el-menu-item v-if="navMenu.children==null" :key="navMenu.path" :index="navMenu.path">
        <i class="el-icon-star-on"></i>
        <span slot="title">{{navMenu.name}}</span>
      </el-menu-item>
      <el-submenu v-if="navMenu.children"
                  :key="navMenu.path" :index="navMenu.path">
        <template slot="title">
          <i class="el-icon-star-on"></i>
          <span> {{navMenu.name}}</span>
        </template>
        <NavMenu :navMenus="navMenu.children"></NavMenu>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  props: ['navMenus'],
  data () {
    return {}
  },
  mounted () {
  }
}
</script>
<style scoped>
</style>

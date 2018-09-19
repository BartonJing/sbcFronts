<template>
  <div>
    <div v-for="(item,index) in this.routes" :key="index">
      <a v-bind:href="'/#'+item.path">{{item.name}}</a>
      <el-button @click="clickListener(item)">{{item.name}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HOME',
  data () {
    return {
      list: ['1', '2', '3']
    }
  },
  methods: {
    clickListener (item) {
      this.$router.replace({path: item.path})
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

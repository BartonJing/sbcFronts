<template>
  <div class="hello">
    <h1>hello world</h1>
    <el-button type="primary" @click="switchChinese()">切换中文</el-button>
    <el-button type="primary" @click="switchEnlish()">切换英文</el-button>
    <p>{{$t('message.hello')}}</p>
    <p>{{$t('message.msg')}}</p>
  </div>
</template>

<script>
export default {
  name: 'test',
  computed: {
    local () {
      return this.$store.local
    }
  },
  methods: {
    switchChinese () {
      this.$i18n.locale = 'cn'
      this.$store.commit('changeLang', 'cn')
    },
    switchEnlish () {
      this.$i18n.locale = 'en'
      this.$store.commit('changeLang', 'en')
    }

  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>

<template>
  <div class="hello">
    {{msg.value}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import api, { Test } from '../api'
import Component from 'vue-class-component'

@Component({
  props: {
    propMessage: String
  }
})
export default class HelloWorld extends Vue {
  msg = new Test('Loading...')

  created() {
    this.load()
  }

  async load() {
    this.msg = await api.GetTest('123')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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

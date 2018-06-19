<template>
  <div class="hello">
    {{test}}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import api, { Test } from '../api'
import Component from 'vue-class-component'
import { StoreHelper } from '../store/StoreHelper'

@Component({
  props: {
    propMessage: String
  }
})
export default class HelloWorld extends Vue {
  msg = new Test('Loading...')
  helper = new StoreHelper(this.$store)

  created() {
    this.load()
  }

  get test() {
    return this.helper.getters.text()
  }

  async load() {
    this.msg = await this.helper.actions.loadText('123')
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

import Vue from 'vue'
import Vuex, { Store } from 'vuex'
import getters from './getters'
import mutations from './mutations'
import actions from './actions';
Vue.use(Vuex)

export class State {
  public text: string = 'loading....'
}

const state = new State()

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})

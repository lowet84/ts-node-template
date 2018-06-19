import { Store } from "vuex"
import { State } from "."

export class StoreHelper {
  constructor(private store: Store<State>) {}

  public getters = {
text: (): string => this.store.state.text
  }

  public mutations = {
setText: (value: string) => this.store.commit('setText', value)
  }

  public actions = {
loadText: (value: string) => this.store.dispatch('loadText', value)
  }
}

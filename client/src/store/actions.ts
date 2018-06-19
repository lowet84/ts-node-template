import { State } from './index'
import { ActionContext } from 'vuex'
import Api from '../Api'
export default {
  async loadText(context: ActionContext<State, State>, value: string) {
    context.state.text = (await Api.GetTest(value)).value
  }
}

import * as fs from 'fs'
import * as os from 'os'

export default function(): string {
  // Getters
  var getterCode = fs.readFileSync('../client/src/store/getters.ts', 'utf8')
  var getterLines = getterCode
    .split(os.EOL)
    .map(d => d.match(' +(.*?): \\((.*?): (.*?)\\): (.*?) =>'))
    .filter(d => d)
    .map(d => {
      return {
        name: d[1],
        returnType: d[4]
      }
    })
    .map(d => `${d.name}: (): ${d.returnType} => this.store.state.${d.name}`)

  // Mutations
  var mutationCode = fs.readFileSync('../client/src/store/mutations.ts', 'utf8')
  var mutationLines = mutationCode
    .split(os.EOL)
    .map(d => d.match(' +(.*?) \\(state: State, (.*?): (.*?)\\) {'))
    .filter(d => d)
    .map(d => {
      return {
        name: d[1],
        parameterType: d[3]
      }
    })
    .map(
      d =>
        `${d.name}: (value: ${d.parameterType}) => this.store.commit('${
          d.name
        }', value)`
    )

  // Actions
  var actionCode = fs.readFileSync('../client/src/store/actions.ts', 'utf8')
  var actionLines = actionCode
    .split(os.EOL)
    //.map(d => d.match('    (.*?): async \\(store: Store<State>, .*?: (.*?)\\) => {'))
    .map(d =>
      d.match(
        ' +async (.*?)\\(context: ActionContext<State, State>, value: (.*?)\\) {'
      )
    )
    .filter(d => d)
    .map(d => {
      return {
        name: d[1],
        parameterType: d[2]
      }
    })
    .map(
      d =>
        `${d.name}: (value: ${d.parameterType}) => this.store.dispatch('${
          d.name
        }', value)`
    )

  let code = ''
  code += 'import { Store } from "vuex"\r\n'
  code += 'import { State } from "."\r\n'
  code += '\r\n'
  code += 'export class StoreHelper {\r\n'
  code += '  constructor(private store: Store<State>) {}\r\n'
  code += '\r\n'
  code += '  public getters = {\r\n'
  code += getterLines.join('\r\n') + '\r\n'
  code += '  }\r\n'
  code += '\r\n'
  code += '  public mutations = {\r\n'
  code += mutationLines.join('\r\n') + '\r\n'
  code += '  }\r\n'
  code += '\r\n'
  code += '  public actions = {\r\n'
  code += actionLines.join('\r\n') + '\r\n'
  code += '  }\r\n'
  code += '}\r\n'

  return code
}

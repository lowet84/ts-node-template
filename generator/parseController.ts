import * as fs from 'fs'
import { connect } from 'http2'

var getParameters = function(content: string): string[] {
  var parameters = content
    .substring(content.indexOf('(') + 1, content.lastIndexOf(')'))
    .split(',')
    .filter(d => d.length > 0)
    .map(d => d.split(':')[0])
  return parameters
}

function decapitalizeFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

export default function(path) {
  var code = fs.readFileSync(path, 'utf8')

  var start = code.indexOf('export class')
  code = code.substring(start)

  var brackets = 0
  var current = ''
  var methods = []
  var classLine = ''

  for (var x = 0; x < code.length; x++) {
    var c = code.charAt(x)
    if (c === '{') {
      if (brackets === 0) {
        classLine = current.trim()
        current = ''
      } else if (brackets === 1) {
        methods.push(current.replace(/(\r\n\t|\n|\r\t|\r)/gm, '').trim())
        current = ''
      }
      brackets++
    } else if (c === '}') {
      brackets--
    } else {
      if (brackets < 2) current += c
    }
  }

  var controllerName = classLine.replace('export class ', '')
  var methodItems = methods.map(d => {
    return {
      name: `${d.substring(0, d.indexOf('('))}`,
      content: <string>d.substring(0, d.lastIndexOf(':')),
      returnType: <string>d.substring(d.lastIndexOf(':') + 1).trim(),
      parameters: getParameters(d)
    }
  })

  var clientCommands = methodItems.map(
    d =>
      `static async ${d.content}: Promise<${
        d.returnType
      }> { return (await axios.post('/api',{name:'${controllerName}.${d.name}', 
      body:{${d.parameters.map(e => `${e}:${e}`).join(',')}}})).data }`
  )

  var serverCommands = methodItems.map(
    d => `case '${controllerName}.${d.name}':
      return this.${decapitalizeFirstLetter(controllerName)}.${
      d.name
    }(${d.parameters.map(e => `body.${e.trim()}`).join(',')})`
  )

  return {
    clientCommands: clientCommands.join('\r\n'),
    serverCommands: serverCommands.join('\r\n'),
    controller: {name: controllerName, path: path}
  }
}

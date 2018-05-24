import * as fs from 'fs'
import { connect } from 'http2'

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

  var methodItems = methods.map(d=>{
    return {
        name: `${classLine.replace('export class ','')}.${d.substring(0,d.indexOf('('))}`,
        content: d
    }
  })

  console.log(classLine)
  console.log(methodItems)
  return code
}

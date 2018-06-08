export default function(clientCommands: string[], modelsCode: string[]): string {
  var client = ''
  client += "import axios from 'axios' \r\n"
  client += 'export default class Api{'
  client += clientCommands.join('\r\n')
  client += '}'
  let code = modelsCode.join('\r\n\r\n')
  code = code.replace('import { BaseItem } from \'./BaseItem\'','')
  return code + '\r\n' + client
}

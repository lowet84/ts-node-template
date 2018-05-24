export default function(clientCommands: string[], modelsCode: string): string {
  var client = ''
  client += "import axios from 'axios' \r\n"
  client += 'export default class Api{'
  client += clientCommands.join('\r\n')
  client += '}'
  return modelsCode + '\r\n' + client
}

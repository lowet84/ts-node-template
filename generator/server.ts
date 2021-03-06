function decapitalizeFirstLetter(str) {
    return str.charAt(0).toLowerCase() + str.slice(1)
  }

export default function(
  serverCommands: string[], 
  controllers: any[],
  tablesCode: string): string {
  var server = ''
  server += controllers.map(
    d => `import { ${d.name} } from "./${d.path.replace('.ts','')
    .substring(d.path.indexOf('controllers')).replace('\\','/')}"`
  ).join('\r\n') + '\r\n'
  server += 'export class Handler {'
  server += '  constructor('
  server +=  controllers.map(d=>`private ${decapitalizeFirstLetter(d.name)}: ${d.name}`).join(',\r\n') //'    private testController: TestController,'
  server += '  ) {}\r\n'
  server += 'async handle(name: string, body: any): Promise<any> {'
  server += '  switch (name) {'
  server += serverCommands.join('\r\n')
  server += '  }'
  server += ' }'
  server += '}\r\n\r\n'
  server += tablesCode
  return server
}

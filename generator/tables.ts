export default function(models: string[]): string {
  const databaseName = 'ts-node-template'
  let code = ''
  code += 'var tables : string[] = \r\n'

  let names = models
    .map(d => d.match('export class (.*?) extends BaseItem'))
    .filter(d => d[1])
    .map(d => `'${d[1]}'`)
    .join(',')
  code += `[${names}]\r\n`
  code += 'export { tables }'

  return code
}

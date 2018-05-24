import * as fs from 'fs'
import * as path from 'path'

function rreaddirSync (dir, allFiles = []) {
  const files = fs.readdirSync(dir).map(f => path.join(dir, f))
  allFiles.push(...files)
  files.forEach(f => {
    fs.statSync(f).isDirectory() && rreaddirSync(f, allFiles)
  })
  return allFiles
}

export default function(path) {
  let names = rreaddirSync(path)
  return names
}

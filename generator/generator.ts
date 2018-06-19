import findFiles from './findFiles'
import parseModel from './parseModel'
import parseController from './parseController'
import client from './client'
import server from './server'
import * as fs from 'fs'
import * as chokidar from 'chokidar'
import tables from './tables'
import vuex from './vuex'

function generate() {
  var models = findFiles('../server/model/')
  var modelsCode = [].concat.apply([], models.map(d => parseModel(d)))

  var controllers = findFiles('../server/controllers/')
  var controllersCode = controllers.map(d => parseController(d))

  var clientCode = controllersCode.map(d => d.clientCommands)
  var serverCode = controllersCode.map(d => d.serverCommands)
  var controllerItems = controllersCode.map(d => d.controller)

  var tablesCode = tables(
    modelsCode.filter(d => d.includes('extends BaseItem'))
  )

  var clientOutput = client(clientCode, modelsCode)
  var serverOutput = server(serverCode, controllerItems, tablesCode)
  var vuexResult = vuex()

  fs.writeFileSync('../client/src/store/StoreHelper.ts', vuexResult)
  fs.writeFileSync('../server/Handler.ts', serverOutput)
  fs.writeFileSync('../client/src/Api.ts', clientOutput)
}

var timeout = null

let watch = process.argv.filter(d => d === '--watch').length > 0

if (watch) {
  console.log('Watching for code changes...')
  var watcher = chokidar
    .watch(
      ['../server/controllers/', '../server/model/', '../client/src/store'],
      {
        persistent: true
      }
    )
    .on('all', (event, path) => {
      if (timeout) clearTimeout(timeout)
      setTimeout(generate, 1000, 'generate')
    })
} else {
  console.log('Generating code once...')
  generate()
}

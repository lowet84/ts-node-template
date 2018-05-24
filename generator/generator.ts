import findFiles from './findFiles'
import parseModel from './parseModel';
import parseController from './parseController'

var models = findFiles('../server/model/')
var modelsCode = [].concat.apply([], models.map(d=>parseModel(d)));

var controllers = findFiles('../server/controllers/')
var controllersCode = controllers.map(d=>parseController(d))

var code = modelsCode.join('\r\n') + controllersCode.join('\r\n')
console.log(code)
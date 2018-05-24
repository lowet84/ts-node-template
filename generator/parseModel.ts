import * as fs from 'fs'

export default function(path){
    return fs.readFileSync(path, "utf8").split(/\r?\n/)
}
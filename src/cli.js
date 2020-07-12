/*
	  * This file will run our methods from the methods.js file
      it will also pass as targetDir parameters (directory where
      the project is created) and the name given by the user to
      the project (args)
*/
import path from 'path'
import { welcomeMessage, finalMessage, taskList } from './methods.js'
const actualPath = import.meta.url
const templatesDir = path
  .resolve(new URL(actualPath).pathname, '../../templates/default')
  // TODO: check if the changes do not affect windows  <12-07-20, sam-pc>
export function cli(args) {
  welcomeMessage(args, `${process.cwd()}/${args}`)
  taskList(templatesDir, `${process.cwd()}/${args}`)
    .then( finalMessage(args, `${process.cwd()}`))
    .catch(error => console.log(error))
}

import path from 'path'
import chalk from 'chalk'
import ncp from 'ncp'
import List from 'listr'
import fs from 'fs'
import shell from 'shelljs'
import inquirer from 'inquirer'
import { spawn } from 'child_process'
import { promisify } from 'util'
import { Observable } from 'rxjs'
import { Package } from '../templates/packpageTemplate/packpage'
/*
    Getting paths
*/
const actualPath = __dirname
const templatesDir = path
  .resolve(new URL(actualPath).pathname, '../../templates')
  .slice(3)
/*
    Copy and paste function
*/
const copy = promisify(ncp.ncp)
const copyTemplateFiles= (templateDir : string, targetDir : string) : any => {
  return copy(templateDir, targetDir)
}
/*
    Questions
*/
let questions: { type: string, name: string, message: string, choices? : [string, string] }[] = [
    {
        type:'input',
        name:'projectName',
        message:'Project name: '
    },
    {
        type: 'list',
        name: 'typeScriptOption',
        message: 'Project type: ',
        choices: ['React + Parcel', 'React + Parcel + TypeScript']
    },
    {
        type: 'input',
        name: 'sassOption',
        message: 'Do you want to use Sass?',
    }
];
const activateQuestions= (taskListFunction? : Function) : void => {
    inquirer
    .prompt(questions)
    .then(function (answers) {
         taskList(templatesDir,`${process.cwd()}`,`${answers.projectName}`,`${answers.typeScriptOption}`)
    })
};
/*
    Task list
*/
const gettingDependencies= () : Observable<any> =>{
    return new Observable(observer => {
        new Promise(resolve => {
          observer.next(
            `@Babel dependencies`
          );
          const babelDevs = spawn(
            'npm i --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/plugin-proposal-class-properties babel-jest',
            { shell: true }
          );
          return babelDevs.on('exit', () => {
            observer.next(
              '@Testing dependencies'
            );
            const testingDevs = spawn(
              'npm i --save-dev jest enzyme enzyme-adapter-react-16 enzyme-to-json',
              { shell: true }
            );
            return testingDevs.on('exit', () => {
              observer.next(`@Style dependencies`);
              const styleDevs = spawn(
                'prettier sass',
                { shell: true }
              );
              return styleDevs.on('exit', () => {
                observer.next('@Base dependencies');
                const baseDevs = spawn(
                    'npm i react react-dom parcel-bundler prettier',
                    { shell: true }
                  );
                return baseDevs.on('exit', () => {
                    observer.complete()
                    resolve()
                })  
              })
            })
          })
        })
      })
}
const taskList= async (templateDir : string, targetDir : string, projectName : string, templateProject : string) => {
    const task = new List([
        {
            title: 'Creating folder...',
            task: () : any => {
                const pathTemplate : string= templateProject !== 'React + Parcel + TypeScript' ? 'react_template' : 'react_typescript'
                shell.cd(targetDir)
                shell.exec(`mkdir ${projectName}`);
                return copyTemplateFiles(`C:/${templateDir}/${pathTemplate}`,`${targetDir}/${projectName}`)
            }
        },
        {
            title: 'Creating the packpage.json',
            task: () : void => {
                shell.cd(`${targetDir}/${projectName}`);
                fs.writeFile('package.json', JSON.stringify(Package, null, 4), function(err) {
                    if (err) throw err
                });
            }
        },
        {
            title: 'Getting Dependencies...',
            task: () : Observable<any> => {
                shell.cd(targetDir);
                return gettingDependencies();
            }
        }
    ])
    await task.run()
}
/* 
    Welcome Message
*/
const welcomeMessage= () : void => {
    const currentVersion : string= `Parcel-app version ${chalk.yellow('2.2.2')}`;
    const firstCommandTask : string= `Creating Packpage...`;
    const secondCommandTaks : string= `Getting neccesary dependencies. ${chalk.yellow('This can take a few minutes')}`;
    console.log
    (`
    ${currentVersion}

    ${firstCommandTask}
    ${secondCommandTaks}
    `);
};
/*
    Final Message
*/
const finallMessage = (pathProject : string, projectName : string) : void => {
    const congratulationMessage : string= `Complete!, created project in ${pathProject}\n${'    inside of the project you can run these commands:'}`;
    const startCommand : string= `${chalk.red.bold('npm start')}\n${'    Run the development server.'}`;
    const buildCommand : string= `${chalk.red.bold('npm build')}\n${'    Bundles the app into static files for production.'}`;
    const testCommand : string= `${chalk.red.bold('npm test')}\n${'    Start the test runner.'}`;
    const suggestMessage : string=`If you want to run the project, you can do:`;
    const cdCommand : string=`${chalk.red.bold('cd')} ${projectName}`;
    const onlyStartCommand : string= `${chalk.red.bold('npm start')}`;
    console.log
    (`
    ${congratulationMessage}\n 

    ${startCommand}\n

    ${buildCommand}\n

    ${testCommand}\n

    ${suggestMessage}\n

    ${cdCommand}
    ${onlyStartCommand}

    Take easy, parcel is too fast!
    `)
};

export {
    welcomeMessage,
    finallMessage,
    activateQuestions
}
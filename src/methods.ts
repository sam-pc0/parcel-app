import chalk from 'chalk'
import ncp from 'ncp'
import List from 'listr'
import fs from 'fs'
import shell from 'shelljs'
import { spawn } from 'child_process'
import { promisify } from 'util'
import { Observable } from 'rxjs'
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
    finallMessage
}
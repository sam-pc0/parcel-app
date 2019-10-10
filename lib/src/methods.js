"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
const ncp_1 = __importDefault(require("ncp"));
const listr_1 = __importDefault(require("listr"));
const fs_1 = __importDefault(require("fs"));
const shelljs_1 = __importDefault(require("shelljs"));
const inquirer_1 = __importDefault(require("inquirer"));
const child_process_1 = require("child_process");
const util_1 = require("util");
const rxjs_1 = require("rxjs");
const packpage_1 = require("../templates/packpageTemplate/packpage");
/*
    Getting paths
*/
const actualPath = __dirname;
const templatesDir = path_1.default
    .resolve(new URL(actualPath).pathname, '../../templates')
    .slice(3);
/*
    Copy and paste function
*/
const copy = util_1.promisify(ncp_1.default.ncp);
const copyTemplateFiles = (templateDir, targetDir) => {
    return copy(templateDir, targetDir);
};
/*
    Questions
*/
let questions = [
    {
        type: 'input',
        name: 'projectName',
        message: 'Project name: '
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
const activateQuestions = (taskListFunction) => {
    inquirer_1.default
        .prompt(questions)
        .then(function (answers) {
        taskList(templatesDir, `${process.cwd()}`, `${answers.projectName}`, `${answers.typeScriptOption}`);
    });
};
exports.activateQuestions = activateQuestions;
/*
    Task list
*/
const gettingDependencies = () => {
    return new rxjs_1.Observable(observer => {
        new Promise(resolve => {
            observer.next(`@Babel dependencies`);
            const babelDevs = child_process_1.spawn('npm i --save-dev @babel/core @babel/preset-env @babel/preset-react @babel/plugin-proposal-class-properties babel-jest', { shell: true });
            return babelDevs.on('exit', () => {
                observer.next('@Testing dependencies');
                const testingDevs = child_process_1.spawn('npm i --save-dev jest enzyme enzyme-adapter-react-16 enzyme-to-json', { shell: true });
                return testingDevs.on('exit', () => {
                    observer.next(`@Style dependencies`);
                    const styleDevs = child_process_1.spawn('prettier sass', { shell: true });
                    return styleDevs.on('exit', () => {
                        observer.next('@Base dependencies');
                        const baseDevs = child_process_1.spawn('npm i react react-dom parcel-bundler prettier', { shell: true });
                        return baseDevs.on('exit', () => {
                            observer.complete();
                            resolve();
                        });
                    });
                });
            });
        });
    });
};
const taskList = (templateDir, targetDir, projectName, templateProject) => __awaiter(void 0, void 0, void 0, function* () {
    const task = new listr_1.default([
        {
            title: 'Creating folder..',
            task: () => {
                const pathTemplate = templateProject !== 'React + Parcel + TypeScript' ? 'react_template' : 'react_typescript';
                shelljs_1.default.cd(targetDir);
                shelljs_1.default.exec(`mkdir ${projectName}`);
                return copyTemplateFiles(`C:/${templateDir}/${pathTemplate}`, `${targetDir}/${projectName}`);
            }
        },
        {
            title: 'Creating the packpage.json',
            task: () => {
                shelljs_1.default.cd(`${targetDir}/${projectName}`);
                fs_1.default.writeFile('package.json', JSON.stringify(packpage_1.Package, null, 4), function (err) {
                    if (err)
                        throw err;
                });
            }
        },
        {
            title: 'Getting Dependencies...',
            task: () => {
                shelljs_1.default.cd(targetDir);
                return gettingDependencies();
            }
        }
    ]);
    yield task.run();
});
/*
    Welcome Message
*/
const welcomeMessage = () => {
    const currentVersion = `Parcel-app version ${chalk_1.default.yellow('2.2.2')}`;
    const firstCommandTask = `Creating Packpage...`;
    const secondCommandTaks = `Getting neccesary dependencies. ${chalk_1.default.yellow('This can take a few minutes')}`;
    console.log(`
    ${currentVersion}

    ${firstCommandTask}
    ${secondCommandTaks}
    `);
};
exports.welcomeMessage = welcomeMessage;
/*
    Final Message
*/
const finallMessage = (pathProject, projectName) => {
    const congratulationMessage = `Complete!, created project in ${pathProject}\n${'    inside of the project you can run these commands:'}`;
    const startCommand = `${chalk_1.default.red.bold('npm start')}\n${'    Run the development server.'}`;
    const buildCommand = `${chalk_1.default.red.bold('npm build')}\n${'    Bundles the app into static files for production.'}`;
    const testCommand = `${chalk_1.default.red.bold('npm test')}\n${'    Start the test runner.'}`;
    const suggestMessage = `If you want to run the project, you can do:`;
    const cdCommand = `${chalk_1.default.red.bold('cd')} ${projectName}`;
    const onlyStartCommand = `${chalk_1.default.red.bold('npm start')}`;
    console.log(`
    ${congratulationMessage}\n 

    ${startCommand}\n

    ${buildCommand}\n

    ${testCommand}\n

    ${suggestMessage}\n

    ${cdCommand}
    ${onlyStartCommand}

    Take easy, parcel is too fast!
    `);
};
exports.finallMessage = finallMessage;

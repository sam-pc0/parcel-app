"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var inquirer_1 = tslib_1.__importDefault(require("inquirer"));
/*
    Questions
*/
var questions = [
    {
        type: 'input',
        name: 'projectName',
        message: 'Project name: '
    },
    {
        type: 'list',
        name: 'projectType',
        message: 'Project type: ',
        choices: ['React + Parcel', 'React + Parcel + TypeScript']
    }
];
var activateQuestions = function () {
    inquirer_1.default
        .prompt(questions)
        .then(function (answers) {
        console.log(answers);
    });
};
exports.activateQuestions = activateQuestions;
/*
    Welcome Message
*/
var welcomeMessage = function () {
    var currentVersion = "Parcel-app version " + chalk_1.default.yellow('2.2.2');
    var firstCommandTask = "Creating Packpage...";
    var secondCommandTaks = "Getting neccesary dependencies. " + chalk_1.default.yellow('This can take a few minutes');
    console.log("\n    " + currentVersion + "\n\n    " + firstCommandTask + "\n    " + secondCommandTaks + "\n    ");
};
exports.welcomeMessage = welcomeMessage;
/*
    Final Message
*/
var finallMessage = function (pathProject, projectName) {
    var congratulationMessage = "Complete!, created project in " + pathProject + "\n" + '    inside of the project you can run these commands:';
    var startCommand = chalk_1.default.red.bold('npm start') + "\n" + '    Run the development server.';
    var buildCommand = chalk_1.default.red.bold('npm build') + "\n" + '    Bundles the app into static files for production.';
    var testCommand = chalk_1.default.red.bold('npm test') + "\n" + '    Start the test runner.';
    var suggestMessage = "If you want to run the project, you can do:";
    var cdCommand = chalk_1.default.red.bold('cd') + " " + projectName;
    var onlyStartCommand = "" + chalk_1.default.red.bold('npm start');
    console.log("\n    " + congratulationMessage + "\n \n\n    " + startCommand + "\n\n\n    " + buildCommand + "\n\n\n    " + testCommand + "\n\n\n    " + suggestMessage + "\n\n\n    " + cdCommand + "\n    " + onlyStartCommand + "\n\n    Take easy, parcel is too fast!\n    ");
};
exports.finallMessage = finallMessage;

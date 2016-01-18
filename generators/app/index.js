'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var asciiArt = require('le-ascii-art');
var path = require('path');
var q = require('q');
var formatter = require('change-case');
var wiring = require('html-wiring');

var answers;

var CastlePageGenerator = yeoman.generators.Base.extend({
  prompting: function() {
    var done = this.async();
    var dir = process.cwd().split(path.sep).pop();
    this.prompt([{
      type: 'input',
      name: 'paramCaseJobName',
      message: 'What is the name of your job?',
      default: 'foo-bar'
    }], function(responses) {
      answers = responses;
      done();
    }.bind(this));
  },
  writing: function() {
    var writer = this;

    function copyTemplate(from, to) {
      writer.fs.copyTpl(
        writer.templatePath(from),
        writer.destinationPath(to),
        answers
      );
    };

    answers.paramCaseJobClassName = answers.paramCaseJobName + '-job';
    answers.camelCaseJobClassName = formatter.camel(answers.paramCaseJobClassName);
    answers.pascalCaseJobClassName = formatter.pascal(answers.paramCaseJobClassName);

    copyTemplate('_job.js', 'app/jobs/' + answers.paramCaseJobClassName + '.js');
    copyTemplate('_unit-test.js', 'test/unit/jobs/' + answers.paramCaseJobClassName + '.spec.js');
    addToWorker();
    addToREADME();

    function addToWorker() {
      requireInWorker();
      declareVarInWorker();
      setVarInWorker();
      addToPerformJobSwitchInWorker();
    }

    function requireInWorker() {
      var hook = '/*--YEOMAN-REQUIRE-HOOK--*/';
      var path = 'app/worker.js';
      var insert = 'var ' + answers.pascalCaseJobClassName + " = require('./jobs/" + answers.paramCaseJobClassName + ".js');";
      addToFile(hook, path, insert);
    }

    function declareVarInWorker() {
      var hook = '/*--YEOMAN-DECLARE-VAR-HOOK--*/';
      var path = 'app/worker.js';
      var insert = 'var ' + answers.camelCaseJobClassName + ';';
      addToFile(hook, path, insert);
    }

    function setVarInWorker() {
      var hook = '/*--YEOMAN-SET-VAR-HOOK--*/';
      var path = 'app/worker.js';
      var insert = '\t' + answers.camelCaseJobClassName + ' = new ' + answers.pascalCaseJobClassName + '(storageService, emailService);';
      addToFile(hook, path, insert);
    }

    function addToPerformJobSwitchInWorker() {
      var hook = '/*--YEOMAN-PERFORM-JOB-SWITCH-HOOK--*/';
      var path = 'app/worker.js';
      var insert = "    case '" + answers.paramCaseJobName + "':\n";
      insert += '      ' + answers.camelCaseJobClassName + '.run(job, complete);\n';
      insert += '      break;';
      addToFile(hook, path, insert);
    }

    function addToREADME() {
      var hook = '// YEOMAN HOOK //';
      var path = 'README.md';
      var insert = " * `" + answers.paramCaseJobName + "` {}";
      addToFile(hook, path, insert);
    }

    function addToFile(hook, path, insert) {
      var file = wiring.readFileAsString(path);
      if (!file || file.indexOf(hook) === -1) {
        console.log('Unable to find hook "' + hook + '"in ' + path);
        return;
      }
      if (file.indexOf(insert) === -1) {
        wiring.writeFileFromString(file.replace(hook, hook + '\n' + insert), path);
      }
    }
  },
});

asciiArt.printLogo();

module.exports = CastlePageGenerator;

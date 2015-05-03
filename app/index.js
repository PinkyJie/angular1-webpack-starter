'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = generators.Base.extend({
  constructor: function () {
    generators.Base.apply(this, arguments);
    this.argument('appName', { type: String, required: false });
  },

  prompting: function () {
    this.log(this.appName);

    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the excellent ' + chalk.red('AioAngular') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'What would you like to name your app?',
      default: this.name || path.basename(process.cwd())
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      done();
    }.bind(this));
  },

  configuring: {
    enforceFolderName: function () {
      // If the appName dose not equal to the current folder name,
      // then change the destinationRoot to the `appName` folder.
      var currentFolderTree = this.destinationRoot().split(path.sep);
      if (this.appName !== currentFolderTree[currentFolderTree.length - 1]) {
        this.destinationRoot(this.appName);
      }
      this.config.save();
    }
  },

  writing: {
    app: function () {
      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});

'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');

module.exports = generators.Base.extend({
    constructor: function() {
        generators.Base.apply(this, arguments);
        this.argument('appName', {
            type: String,
            required: false
        });
    },

    prompting: function() {
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

        this.prompt(prompts, function(props) {
            this.appName = props.appName;
            done();
        }.bind(this));
    },

    configuring: {
        enforceFolderName: function() {
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
        templateFiles: function() {
            var context = {
                'appName': this.appName
            };
            var fileList = [
                '_bower.json',
                '_package.json',
                '_README.md',
                'client/source/app/core/_config.js',
                'client/source/app/layout/_header.jade',
                'gulp/tasks/_serve.task.js'
            ];
            var targetName;
            for (var i = 0; i < fileList.length; i++) {
                targetName = fileList[i].replace('_', '');
                this.fs.copyTpl(
                    this.templatePath(fileList[i]),
                    this.destinationPath(targetName),
                    context
                );
            }
        },

        projectFiles: function() {
            this.fs.copy(
                this.templatePath('**/*'),
                this.destinationPath(''),
                {
                    globOptions: {
                        // dot: true,
                        ignore: [
                            this.templatePath('client/build/**/*'),
                            this.templatePath('node_modules/**/*'),
                            this.templatePath('client/source/vendor/**/*'),
                            this.templatePath('**/_*'),
                        ]
                    }
                }
            );
            this.fs.copy(
                this.templatePath('.*'),
                this.destinationRoot()
            );
            this.fs.copy(
                this.templatePath('server/.*'),
                this.destinationPath('server')
            );
        }
    },

    install: function() {
        // this will run `bower install` automatically as configured in package.json
        this.log('Install npm and bower package...');
        this.npmInstall();
    }
});

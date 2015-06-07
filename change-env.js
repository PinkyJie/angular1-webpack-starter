#!/usr/bin/env node

// this file can help you do development in app/templates folder

// parameter
// - dev: change all _ files to normal file and replace the palceholder
// - prod: reverse of dev


var fs = require('fs');

var args = process.argv;
var fileList = [
    '_bower.json',
    '_package.json',
    '_README.md',
    'client/source/app/core/_config.js',
    'client/source/app/layout/_header.jade',
    'client/source/app/home/_home.jade',
    'gulp/tasks/_serve.task.js',
];

var BASE = 'app/templates/';
var mapping = {
    name: {
        src: '<%= appName %>',
        dest: 'aio-angular-app'
    },
    desc: {
        src: '<%= appDesc %>',
        dest: 'Aio Angular App'
    }
};

if (args.length < 3) {
    console.error('Please provide an "env" parameter, possible value: dev, prod');
} else {
    if (args[2] === 'dev') {
        dev();
    } else if (args[2] === 'prod') {
        prod();
    } else {
        console.error('Invalid parameter, possible value: dev, prod');
    }
}

// process.exit();


////////////////

function dev () {
    fileList.forEach(function (name) {
        var newName = name.replace('_', '');
        fs.renameSync(BASE + name, BASE + newName);
        fs.readFile(BASE + newName, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            var result = data.replace(new RegExp(mapping.name.src, 'g'), mapping.name.dest);
            result = result.replace(new RegExp(mapping.desc.src, 'g'), mapping.desc.dest);
            fs.writeFile(BASE + newName, result, 'utf8', function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        });
    });
}

function prod () {
    fileList.forEach(function (name) {
        var oldName = name.replace('_', '');
        fs.renameSync(BASE + oldName, BASE + name);
        fs.readFile(BASE + name, 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            var result = data.replace(new RegExp(mapping.name.dest, 'g'), mapping.name.src);
            result = result.replace(new RegExp(mapping.desc.dest, 'g'), mapping.desc.src);
            fs.writeFile(BASE + name, result, 'utf8', function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        });
    });
}

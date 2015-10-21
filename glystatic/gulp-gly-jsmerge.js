'use strict'
var through = require('through2')
var fs = require('fs')
var path = require('path')
module.exports = function () {
    return through.obj(function (file, enc, cb) {
        var filePath = file.path
        if (filePath.match(/\.merge\.js/)) {
            console.log('Merging and uglifying javascript file: ' + filePath)
            var fileContent = file.contents.toString()
            var re = /static.glodon.com\/static\/(.*?\.js)/g
            var result
            var empty = true
            while (result = re.exec(fileContent)) {
                if (empty) {
                    file.contents = new Buffer('')
                    empty = false
                }
                try {
                    file.contents = Buffer.concat([file.contents, fs.readFileSync('static/src/main/webapp/' + result[1]), new Buffer(';\n')])
                } catch (e) {
                    console.log(e)
                }
            }
        }
        cb(null, file)
    })
}
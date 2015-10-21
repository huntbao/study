'use strict'
var through = require('through2')
var fs = require('fs')
var path = require('path')

module.exports = function () {
    return through.obj(function (file, enc, cb) {
        var filePath = file.path
        if (filePath.match(/\.merge\.css/)) {
            console.log('Merging and minifying css file: ' + filePath)
            var fileContent = file.contents.toString()
            var re = /@import url\(["|'](.*?\.css)/g
            var result
            var empty = true
            while (result = re.exec(fileContent)) {
                if (empty) {
                    file.contents = new Buffer('')
                    empty = false
                }
                var r = path.resolve(path.dirname(filePath), result[1])
                try {
                    var cssFileStr = fs.readFileSync(r).toString()
                    var newCssStr = cssFileStr.replace(/url\(["|']*(.*?)["|']*\)/g, function (p1, p2) {
                        //if (p2.indexOf('data:image') !== -1) return p2
                        var rr = path.relative(path.dirname(filePath), path.resolve(path.dirname(r), p2.trim()), filePath)
                        return 'url(' + rr + ')'
                    })
                    file.contents = Buffer.concat([file.contents, new Buffer(newCssStr)])
                } catch (e) {
                    console.log(e)
                }
            }
        }
        cb(null, file)
    })
}
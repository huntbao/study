var gulp = require('gulp');
var del = require('del');

gulp.task('clean:mobile', function (cb) {
    console.log(cb)
    del([
        'dist/1.jpg',
        // here we use a globbing pattern to match everything inside the `mobile` folder
        // we don't want to clean this file though so we negate the pattern
        '!dist/mobile/spa.pdf',
        'dist/mobile/**'
    ], cb);
});

gulp.task('default', ['clean:mobile']);

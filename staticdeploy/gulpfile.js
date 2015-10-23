/* 
 * @Author: zhuxy
 * @Date:   2015-03-17 09:16:38
 * @Last Modified by:   zhuxy
 * @Last Modified time: 2015-03-24 15:46:10
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');

var spritesmith = require('gulp.spritesmith');
var imageop = require('gulp-image-optimization');

gulp.task('images', function (cb) {
    gulp.src(['src/**/*.png', 'src/**/*.jpg', 'src/**/*.gif', 'src/**/*.jpeg']).pipe(imageop({
        optimizationLevel: 7,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('./images')).on('end', cb).on('error', cb);
});

gulp.task('scripts', function () {
    return gulp.src('src/js/*.js')
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
})

gulp.task('css', function () {
    return gulp.src('src/css/*.css')
        .pipe(concat('release.css'))
        .pipe(gulp.dest('./dist'))
})


gulp.task('sprite', function () {
    var spriteData = gulp.src('src/*.*')
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        }));

    spriteData.img.pipe(gulp.dest('./dist/sprite/images'));
    spriteData.css.pipe(gulp.dest('./dist/sprite/css'));
});


// Lint JS
gulp.task('lint', function () {
    return gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
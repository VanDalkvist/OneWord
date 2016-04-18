// dependencies

var gulp = require('gulp');

var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');

var path = require('path');
var bower = require('bower');
var sh = require('shelljs');
var cordova = require('cordova-lib').cordova.raw;

var paths = {
    sass: ['./scss/**/*.scss'],
    www: path.join(__dirname, 'www')
};

var server = require('gulp-server-livereload');
var pkg = require('./package.json');

// gulp tasks

gulp.task('default', ['watch', 'dev']);

gulp.task('dev', function () {
    var config = {
        livereload: true,
        directoryListing: false,
        open: false,
        host: '127.0.0.1',
        port: 3111
    };
    gulp.src(paths.www).pipe(server(config));
});

gulp.task('watch', function () {
    gulp.watch(paths.sass, ['sass']);
});

gulp.task('sass', function (done) {
    gulp.src('./scss/ionic.app.scss')
        .pipe(sass())
        .pipe(gulp.dest('./www/css/'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({extname: '.min.css'}))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('install', ['git-check', 'plugins'], function () {
    return bower.commands.install()
        .on('log', function (data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function (done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});

gulp.task('plugins', function () {
    return cordova.plugins('add', pkg.cordovaPlugins);
});

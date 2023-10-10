const gulp = require('gulp')
const fileInclude = require('gulp-file-include')
const sass = require('gulp-sass')(require('sass'))
const sourcemaps = require('gulp-sourcemaps')
const server = require('gulp-server-livereload')
const clean = require('gulp-clean')
const fs = require('fs')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')
const webpackStream = require('webpack-stream')
const changed = require('gulp-changed')
const sassGlob = require('gulp-sass-glob');
// const babel = require('gulp-babel')
const imagemin = require('gulp-imagemin')

// FONTS
const ttf2woff2 = require('gulp-ttf2woff2');

// --- VAR
const outDir = './build/'
const webpack_config = require('./../webpack.config')
const suff = ":dev"

// FUNCTIONS
const plumberNotifyConfig = (title) => {
    return {
        errorHandler: notify.onError({
            title: title,
            message: 'Error: <%= error.message %>',
            sound: false
        })
    }
}

/* --- TASKs --- */

// --- Clean Task
gulp.task('clean' + suff, function (done) {
    if (fs.existsSync(outDir)) {
        return gulp.src(outDir, { read: false })
            .pipe(clean({ force: true }))
    }
    done()
})

// --- Copy Task (Favicon only !)
gulp.task('copy' + suff, function (done) {
    return gulp.src('./src/favicon/*')
        .pipe(gulp.dest(outDir + 'favicon'))
})

// --- HTML Components Task
const htmlSettings = {
    prefix: '@@',
    basepath: '@file'
}

gulp.task('html' + suff, function () {
    return gulp.src(['./src/html/**/*.html', '!./src/html/components/*.html'])
        .pipe(changed(outDir, { hasChanged: changed.compareContents }))
        .pipe(plumber(plumberNotifyConfig('HTML')))
        .pipe(fileInclude(htmlSettings))
        .pipe(gulp.dest(outDir))
})

// --- SASS Task
gulp.task('sass' + suff, function () {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(changed(outDir + 'css/'))
        .pipe(plumber(plumberNotifyConfig('SASS')))
        .pipe(sourcemaps.init())
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest(outDir + 'css/'))
})

// --- IMG Copy Task
gulp.task('images' + suff, function () {
    return gulp.src('./src/img/**/*')
        .pipe(changed(outDir + 'img/'))
        .pipe(imagemin({ verbose: true }))
        .pipe(gulp.dest(outDir + 'img/'))
})

// --- Fonts Copy Task
gulp.task('fonts' + suff, function () {
    return gulp.src(['./src/fonts/**/*.*'])
        .pipe(changed(outDir + 'fonts/'))
        .pipe(ttf2woff2())
        .pipe(gulp.dest(outDir + 'fonts/'))
})

// --- Files Copy Task
gulp.task('files' + suff, function () {
    return gulp.src('./src/files/**/*')
        .pipe(changed(outDir + 'files/'))
        .pipe(gulp.dest(outDir + 'files/'))
})

// --- JavaScript Task
gulp.task('js' + suff, (done) => {
    gulp.src('./src/js/*.js')
        .pipe(changed(outDir + 'js'))
        .pipe(plumber(plumberNotifyConfig('JS')))
        // .pipe(babel())
        .pipe(webpackStream(webpack_config))
        .pipe(gulp.dest(outDir + 'js'))
    done()
});

// --- Server Task
const serverSettings = {
    livereload: true,
    open: true
}

gulp.task('server' + suff, function () {
    return gulp.src(outDir)
        .pipe(server(serverSettings))
})

// --- Watch Task
gulp.task('watch' + suff, function (done) {
    gulp.watch(['./src/scss/**/*.scss', './src/html/**/*.scss'], gulp.parallel('sass' + suff))
    gulp.watch('./src/**/*.html', gulp.parallel('html' + suff))
    gulp.watch('./src/img/**/*', gulp.parallel('images' + suff))
    gulp.watch('./src/fonts/**/*', gulp.parallel('fonts' + suff))
    gulp.watch('./src/files/**/*', gulp.parallel('files' + suff))
    gulp.watch(['./src/js/modules/*.js', './src/js/**/*.js'], gulp.parallel('js' + suff))
    done()
})

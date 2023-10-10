const gulp = require('gulp')

const fs = require('fs')
const clean = require('gulp-clean')
const changed = require('gulp-changed')
const plumber = require('gulp-plumber')
const notify = require('gulp-notify')

// HTML
const fileInclude = require('gulp-file-include')
const htmlclean = require('gulp-htmlclean')
const webpHTML = require("gulp-webp-html-nosvg");

// STYLES
const sass = require('gulp-sass')(require('sass'))
const sassGlob = require('gulp-sass-glob')
const groupMedia = require('gulp-group-css-media-queries')
const autoprefixer = require('gulp-autoprefixer')
const csso = require('gulp-csso')
const webpCss = require('gulp-webp-css')

// JS
const webpackStream = require('webpack-stream')
const babel = require('gulp-babel')

// FONTS
const ttf2woff2 = require('gulp-ttf2woff2');

// IMAGES
const imagemin = require('gulp-imagemin')
const webp = require('gulp-webp')

// SERVER
const server = require('gulp-server-livereload')

// --- VAR
const outDir = './docs/'
const webpack_config = require('./../webpack.config')
const suff = ":docs"

const plumberNotifyConfig = (title) => {
    return {
        errorHandler: notify.onError({
            title: title,
            message: 'Error: <%= error.message %>',
            sound: false
        })
    }
}

gulp.task('clean' + suff, function(done) {
    if(fs.existsSync(outDir)) {
        return gulp.src(outDir, { read: false })
            .pipe(clean({ force: true }))
    }
    done()
})

gulp.task('copy' + suff, function () {
    return gulp.src('./src/favicon/*')
        .pipe(gulp.dest(outDir + 'favicon'))
})

const htmlSettings = {
    prefix: '@@',
    basepath: '@file',
}

gulp.task('html'+ suff, function() {
    return gulp.src(['./src/html/**/*.html', '!./src/html/components/*.html'])
        .pipe(changed('./docs/'))
        .pipe(plumber(plumberNotifyConfig('HTML')))
        .pipe(fileInclude(htmlSettings))
        .pipe(htmlclean())
        .pipe(gulp.dest('./docs/'))
})

gulp.task('sass'+ suff, function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(changed(outDir + 'css/'))
        .pipe(plumber(plumberNotifyConfig('SCSS')))
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(groupMedia())
        // .pipe(webpCss())
        .pipe(csso())
        .pipe(gulp.dest(outDir + 'css/'))
})

gulp.task('images'+ suff, function() {
    return gulp.src('./src/img/**/*')
        .pipe(changed(outDir + 'img/'))
        .pipe(webp())
        .pipe(gulp.dest(outDir + 'img/'))
        .pipe(gulp.src('./src/img/**/*'))
        .pipe(changed(outDir + 'img/'))
        .pipe(imagemin({ verbose: true }))
        .pipe(gulp.dest(outDir + 'img/'))
})

gulp.task('fonts' + suff, function () {
    return gulp.src(['./src/fonts/**/*.*'])
        .pipe(changed(outDir + 'fonts/'))
        .pipe(ttf2woff2())
        .pipe(gulp.dest(outDir + 'fonts/'))
})

gulp.task('files'+ suff, function() {
    return gulp.src('./src/files/**/*')
        .pipe(changed(outDir + 'files/'))
        .pipe(gulp.dest(outDir + 'files/'))
})

gulp.task('js'+ suff, (done) => {
    gulp.src('./src/js/*.js')
        .pipe(changed(outDir + 'js'))
        .pipe(plumber(plumberNotifyConfig('JS')))
        .pipe(babel())
        .pipe(webpackStream(webpack_config))
        .pipe(gulp.dest(outDir + 'js'))
    done()
});

const serverSettings = {
    livereload: true,
    open: true
}

gulp.task('server'+ suff, function() {
    return gulp.src(outDir)
        .pipe(server(serverSettings))
})
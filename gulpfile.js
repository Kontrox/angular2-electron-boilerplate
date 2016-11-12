"use strict";

var gulp = require('gulp'),
    del = require('del'),
    electron = require('gulp-atom-electron'),
    symdest = require('gulp-symdest'),
    sass = require('gulp-sass'),
    merge = require('merge-stream'),
    shell = require('gulp-shell'),
    config = require("./project-config"),
    runSeq = require('run-sequence'),
    flatten = require('flatten2'),
    through = require('through2'),
    path = require('path'),
    Vinyl = require('vinyl')

gulp.task('config:systemjs', () => {
    let sjs = config.SYSTEMJS
    let stream = merge()

    let out = gulp.dest('dist')
    stream.add(out)

    let base = path.join('dist', sjs.paths['npm:'])
    stream.add(gulp.src(path.join(base, '**', 'package.json'), { base: base })
        .pipe(through.obj((file, enc, cb) => {
            let package_cfg = JSON.parse(file.contents.toString(enc))
            let name = package_cfg.name
            if (name != null && !(name in sjs.map)) {
                let dir = path.join(path.dirname(file.relative), package_cfg.main)
                            .split(path.sep)
                            .reduce((res, elem) => res + '/' + elem)

                sjs.map[name] = 'npm:' + dir
            }
            cb(null, file)
    })).on('end', () => {
        let enc = 'utf8'
        var file = new Vinyl({
            path: './systemjs.config.js',
            relative: 'systemjs.config.js',
            contents: Buffer.from(`
            (function(global) {
                System.defaultJSExtensions = true;
                System.config(${JSON.stringify(sjs, null, 4)});
            })(this);`, enc)
        });
        out.end(file, enc)
    }));

    return stream
});

/**
 * Cleans our distribution folder
 */
gulp.task('electron:clean', function() {
    return del('dist/**/*', { force: true });
});

/**
 * Copies the following into the distribution folder:
 *  1. Node modules that are needed for distribution
 *  2. Bower packages needed for distribution
 *  3. Any other remaining files in our `src`
 *     directory
 */

gulp.task('electron:move', ['electron:copy'], () => {
    flatten('./dist/assets/vendor', { root: true, ignore: '@angular\\/[^\\/]+\\/testing' }, (err, res) => {
        if (err) console.error(err)
        if (res) console.log(res)
    })
});

gulp.task('electron:copy', () => {
    var fs_setup = [{ // copy assets from our source to distribution
        from: ['./src/**/*', '!./src/**/*.scss', '!./src/**/*.ts'],
        to: './dist'
    }];

    config.VENDOR_FILES.forEach((item) => {
        let SOURCE = item.source;
        let FILES = SOURCE.concat("/").concat(item.files);

        fs_setup.push({
            from: `node_modules/${FILES}`,
            to: `./dist/assets/vendor/${SOURCE}`
        })
    });

    if (config.BOWER_PACKAGES) {
        config.BOWER_PACKAGES.forEach((item) => {
            let SOURCE = item.source;
            let FILES = SOURCE.concat("/").concat(item.files);

            fs_setup.push({
                from: `./bower_components/${FILES}`,
                to: `./dist/assets/bower/${SOURCE}`
            })
        });
    }
    let stream = merge()

    fs_setup.forEach((setup) => {
        stream.add(gulp.src(setup.from).pipe(gulp.dest(setup.to)));
    });

    return stream;
});

/**
 * Transpiles our Sass classes into CSS and
 * places it in the matching folder hierarchy in
 * the distribution folder.
 */
gulp.task('electron:transpile:sass', function() {
    gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
});

/**
 * Watches our Sass files for changes
 * and transpiles edited files and places
 * them in the distribution folder.
 */
gulp.task("sass:watch", function() {
    gulp.watch('./src/**/*.scss', ['electron:transpile:sass']);
});

/**
 * Transpiles TypeScript to JavaScript
 */
gulp.task('electron:transpile:ts', shell.task(['tsc']));

/**
 * Watches our TypeScript files, invoking the `tsc` compiler
 * if changes are detected.
 */
gulp.task("typescript:watch", function() {
    gulp.watch('./src/**/*.ts', ['electron:transpile:ts']);
});

/**
 * Builds the OSX application and places it in our
 * 'packages' folder
 */
gulp.task('electron:build:osx', function() {
    gulp.src(['dist/**/*'])
        .pipe(electron({
            version: '1.3.3',
            platform: 'darwin'
        }))
        .pipe(symdest('packages/osx'));
});

/**
 * Builds the Linux application and places it in our
 * 'packages' folder
 */
gulp.task('electron:build:linux', function() {
    gulp.src(['dist/**/*'])
        .pipe(electron({
            version: '1.3.3',
            platform: 'linux'
        }))
        .pipe(symdest('packages/linux'));
});

/**
 * Builds the Windows executable file and places it in our
 * 'packages' folder
 */
gulp.task('electron:build:win', function() {
    gulp.src(['dist/**/*'])
        .pipe(electron({
            version: '1.3.3',
            platform: 'win32'
        }))
        .pipe(symdest('packages/win'));
});

/**
 * Umbrella task for executing our build
 */
gulp.task('electron:build', function(done) {
    return runSeq('electron:clean', 'electron:move', 'config:systemjs', 'electron:transpile:sass', 'electron:transpile:ts', done);
});

/**
 * Task for packing our application for OS distribution
 */
gulp.task('electron:package', (done) => {
    return runSeq('build', ['electron:build:win', 'electron:build:osx', 'electron:build:linux'], done);
});

gulp.task('build', ['electron:build']);

gulp.task('default', ['build']);
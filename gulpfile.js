var gulp = require('gulp'),
    del = require('del'),
    util = require('gulp-util'),
    typescript = require('gulp-typescript'),
    tscConfig = require('./tsconfig.json'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass');

var base = {
    src: "src",
    dest: "Nancy"
};


// Clean - Delete the contents of the distribution directory
gulp.task('clean', function () {
    var stream = del(base.dest + '/app/**/*');

    return stream;
});


// TypeScript - compile and save .js files to destination
gulp.task('typescript', ['clean'], function () {
    var stream = gulp
        .src(base.src + '/**/*.ts')
        .pipe(sourcemaps.init()) // <--- sourcemaps //.on('error', util.log)
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.')) // <--- sourcemaps //.on('error', util.log)
        .pipe(gulp.dest(base.dest + '/app'));

    return stream;
});


// SCSS - compile and save .css files to destination
gulp.task('scss', ['clean'], function () {
    var stream = gulp
        .src(base.src + '/**/*.scss')
        .pipe(sass().on('error', sass.logError)) //util.log
        .pipe(gulp.dest(base.dest + '/app'));

    return stream;
});


// copy:libs - copy dependencies
gulp.task('copy:libs', ['clean'], function() {
    var stream = gulp
        .src([
            'node_modules/es6-shim/es6-shim.min.js',
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
            'node_modules/angular2/bundles/angular2-polyfills.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/rxjs/bundles/Rx.js',
            'node_modules/angular2/bundles/angular2.dev.js',
            'node_modules/angular2/bundles/router.dev.js',
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/ms-signalr-client/jquery.signalr-2.2.0.min.js',
            'node_modules/angular2-materialize/dist/index.js',
            'node_modules/angular2-materialize/dist/materialize-directive.js',
            'node_modules/materialize-css/dist/css/materialize.min.css'
        ])
        .pipe(gulp.dest(base.dest + '/app/lib'));

    return stream;
});


// copy:fonts
gulp.task('copy:fonts', ['clean'], function () {
    var stream = gulp
        .src([
            'node_modules/materialize-css/dist/font/roboto/**/*'
        ])
        .pipe(gulp.dest(base.dest + '/app/fonts/roboto'));

    return stream;
});


// copy:assets - copy static assets - i.e. non TypeScript compiled source
gulp.task('copy:assets', ['clean'], function () {
    var stream = gulp
        .src([base.src + '/**/*', '!' + base.src + '/**/*.ts', '!' + base.src + '/**/*.scss'])
        .pipe(gulp.dest(base.dest + '/app'));

    return stream;
});


// Build
gulp.task('build', ['typescript', 'scss', 'copy:libs', 'copy:fonts', 'copy:assets']);


// Watch all source files for changes
gulp.task('watch', ['build'], function () {
    var watcher = gulp.watch([base.src + '/*.*', base.src + '/**/*'], ['build']);
    var timeout = setTimeout(watcher.end, 60 * 60 * 1000); //Stop watching if inactive for 1hr

    watcher.on('change', function(e) {
        clearTimeout(timeout);
        timeout = setTimeout(watcher.end, 60 * 60 * 1000);
        util.log(util.colors.inverse('FILE ' + e.type.toUpperCase()), util.colors.gray(e.path));
    });
});


gulp.task('default', ['build']);
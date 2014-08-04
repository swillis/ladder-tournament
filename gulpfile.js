// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    connect = require('gulp-connect'),
    browserify = require('gulp-browserify'),
    gutil = require('gulp-util');


// Connect with Live Reload:
gulp.task('connect', function() {
  connect.server({
    root: 'build',
    port: 5000,
    livereload: true
  });
});

gulp.task('html', function () {
  return gulp.src(['./app/pages/*.html', './app/pages/*/*.html'], { base: './app/pages'})
    .pipe(gulp.dest('./build'))
    .pipe(connect.reload());
});

// Lint Task
gulp.task('lint', function() {
    return gulp.src('./app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(connect.reload());
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('./app/css/main.scss')
        .pipe(sass())
        .pipe(gulp.dest('./build/assets/css'))
        .pipe(connect.reload());
});

// Browserify task
gulp.task('browserify', function() {
  // Single point of entry (make sure not to src ALL your files, browserify will figure it out for you)
  gulp.src(['./app/js/app.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  // Bundle to a single file
  .pipe(concat('app.js'))
  // Output it to our dist folder
  .pipe(gulp.dest('./build/assets/js/'));
});

// Watch Files For Changes
gulp.task('watch', function(event) {
    gulp.watch(['./app/js/*.js', './app/js/*/*.js'], ['lint', 'browserify']);
    gulp.watch(['./app/css/*.scss', './app/css/*/*.scss'], ['sass']);
    gulp.watch(['./app/pages/*.html', './app/pages/*/*.html'], ['html']);
});

// Default Task
gulp.task('default', ['connect', 'lint', 'sass', 'browserify', 'html', 'watch']);
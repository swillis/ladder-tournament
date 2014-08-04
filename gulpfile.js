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
    gutil = require('gulp-util'),
    open = require('gulp-open'),
    autoprefixer = require('gulp-autoprefixer');


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
        .pipe(sass({sourceComments: 'map', sourceMap: 'sass'}))
        .pipe(autoprefixer("last 2 versions", "> 1%", "ie 8", {
          map: true,
          from: 'something', // string needs to exist to not break build, but aren't used!
          to: 'something' // string needs to exist to not break build, but aren't used!
        }))
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
  .pipe(gulp.dest('./build/assets/js/'))
  .pipe(connect.reload());
});

gulp.task("open", function(){
  var options = {
    url: "http://localhost:5000"
  };
  gulp.src("./build/index.html")
      .pipe(open("", options));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch(['./app/js/*.js', './app/js/*/*.js'], ['lint', 'browserify']);
    gulp.watch(['./app/css/*.scss', './app/css/*/*.scss'], ['sass']);
    gulp.watch(['./app/pages/*.html', './app/pages/*/*.html'], ['html']);
});

// Default Task
gulp.task('start', ['connect', 'lint', 'sass', 'browserify', 'html', 'watch', 'open']);
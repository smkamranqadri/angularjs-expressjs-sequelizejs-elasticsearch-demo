'use strict';

const gulp = require('gulp');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const ngAnnotate = require('gulp-ng-annotate');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const watch = require('gulp-watch');

const base = 'client';
const path = {
  // template markups
  HTML: [base + '/*.html', 'client/views/**/*.html', 'client/views/*.html'],
  // vendor css
  CSS: [base + '/css/*.css'],
  // my js source code
  JS: [base + '/js/**/*.js', 'client/js/*.js'],
  VENDOR: [
    'bower_components/angular/angular.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js'
  ],
  // images
  IMG: [base + '/img/**'],
  // vendor js
  DIST: ['./public']
};

gulp.task('clean', function() {
  return gulp.src(path.DIST + '/*', { force: true }).pipe(clean());
});

gulp.task('html', function() {
  return gulp.src(path.HTML, { base: base }).pipe(gulp.dest(path.DIST));
});

gulp.task('css', function() {
  return gulp.src(path.CSS).pipe(gulp.dest(path.DIST + '/css'));
});

gulp.task('js', function() {
  return gulp
    .src(path.JS)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.DIST + '/js'));
});

gulp.task('vendor', function() {
  return (
    gulp
      .src(path.VENDOR)
      .pipe(concat('vendor.js'))
      // .pipe(ngAnnotate())
      // .pipe(uglify())
      .pipe(gulp.dest(path.DIST + '/js'))
  );
});

gulp.task('img', function() {
  return gulp
    .src(path.IMG)
    .pipe(imagemin())
    .pipe(gulp.dest(path.DIST + '/img'));
});

gulp.task(
  'build',
  gulp.series(['clean', 'img', 'vendor', 'js', 'css', 'html'])
);

gulp.task('watchAll', function() {
  gulp.watch(path.VENDOR, gulp.parallel(['vendor']));
  gulp.watch(path.JS, gulp.parallel(['js']));
  gulp.watch(path.CSS, gulp.parallel(['css']));
  gulp.watch(path.HTML, gulp.parallel(['html']));
  gulp.watch(path.IMG, gulp.parallel(['img']));
});

gulp.task('watch', gulp.series('build', 'watchAll'));

gulp.task('default', gulp.series('build'));

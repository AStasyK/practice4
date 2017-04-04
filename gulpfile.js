'use strict';

const 
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  mainfiles = require('main-bower-files'),
  clean = require('gulp-clean'),
  sourcemaps = require('gulp-clean'),
  autoprefixer = require('gulp-clean');

gulp.task('clean', function(done){
  gulp.src('./build/*', {read: false})
    .pipe(clean());
  done();
});

gulp.task('fonts', function(done){
  gulp.src(mainfiles())
    .pipe(gulp.dest('./build'));
  done();
});

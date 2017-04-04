'use strict';

const 
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  mainfiles = require('main-bower-files'),
  clean = require('gulp-clean'),
  sourcemaps = require('gulp-sourcemaps'),
  autoprefixer = require('gulp-autoprefixer'),
  sftp = require('gulp-sftp'),
  gmcfp = require('gulp-mysql-command-file-processor'),
  fs = require('fs');

//var jsonObj = JSON.parse(fs.readFileSync('./sites_all.json')); парсинг json
//var sites = jsonObj.sites;

var obj = {
  "site": "user1",
  "ftp": {
    "port": "3000",
    "user": "user1",
    "pass": "user1",
    "folder": "user1"
  }
}

gulp.task('clean', function(done){
  gulp.src('./build/*', {read: false})
    .pipe(clean());
  done();
});

//fonts build
gulp.task('fonts', function(done){
  gulp.src(mainfiles(["**/*.{ttf,woff,eot,woff2,svg,otf}"],{
      "overrides":{
          "font-awesome":{
              "main": ["fonts/*.*"] //обязательно двойные кавычки
          },
          "bootstrap-sass":{
              "main": ["assets/fonts/bootstrap/*.*"] //обязательно двойные кавычки
          }
      }
    }))
    .pipe(gulp.dest('./build/fonts'));
  done();
});
//js build
gulp.task('js', function(done){
  gulp.src(mainfiles(["**/*.js"],{
      "overrides":{
          "jquery":{
              "main": ["dist/jquery.min.js"] //обязательно двойные кавычки
          },
          "jquery-migrate":{
              "main": [".dist/jquery-migrate.min.js"] //??
          },
          "bootstrap-sass":{
              "main": ["assets/javascripts/bootstrap.min.js"] //обязательно двойные кавычки
          }
      }
    }))
    .pipe(gulp.dest('./build/js'));
  done();
});

gulp.task('scss', function (done) {
  return gulp.src('./scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'expanded'
  }).on('error', sass.logError))
    .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./dist/css'));
  done();
});

gulp.task('sftp', function (done) {
  return gulp.src(['/build/' + obj.site + '/**/**.*', '/build/' + obj.site + '/.htaccess'])
      .pipe(sftp({
          host: 'website.com',
          user: 'johndoe',
          pass: '1234',
          remotePath: "/home/" + obj.ftp.folder + "/public_html/"
      }));
  done();
});

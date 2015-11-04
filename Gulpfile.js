var gulp         = require('gulp'),
    postcss      = require('gulp-postcss'),
    scss         = require('postcss-scss'),
    minifyCss    = require('gulp-minify-css'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    sass         = require('gulp-sass'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    order        = require('gulp-order'),
    mqpacker     = require('css-mqpacker'),
    csswring     = require('csswring');


gulp.task('styles', function(){

  var processors = [
    autoprefixer({browsers: ['last 4 versions']}),
    mqpacker,
    csswring
  ];

  return gulp.src('./sass/app.scss')
      .pipe(postcss(processors, {syntax:scss}))
      .pipe(sass().on('error', sass.logError))
      .pipe(sourcemaps.init())
      .pipe(concat('app.min.css'))
      .pipe(minifyCss({compatibility: 'ie8'}))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest('./css'));
});

gulp.task('watch',['styles'],function(){
  gulp.watch('sass/*.scss', ['styles']);
});

gulp.task('default', ['watch']);

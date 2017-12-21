let gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let watch = require('gulp-watch');
let uglify = require('gulp-uglify');

gulp.task('minify-css', () => {
  gulp.src('app/src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/dist/css'));
});

gulp.task('minify-sass', () => {
  gulp.src('app/src/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/src/css'));
});

gulp.task('watch', function () {
  gulp.watch('app/src/sass/*.scss', ['minify-sass']);
  gulp.watch('app/src/css/*.css', ['minify-css']);
  gulp.watch('app/src/js/*.js', ['minify-js']);
});

gulp.task('minify-js', function () {
  gulp.src('app/src/js/*.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('app/dist/js'))
});

gulp.task('default', ["watch"]);

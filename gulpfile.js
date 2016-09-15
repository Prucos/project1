var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var cache = require('gulp-cache');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglifyjs');


gulp.task('sass', function() {
  return gulp
    .src('app/sass/**/*.sass')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('jade', function(){
  return gulp
    .src('app/jade/**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('app/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir:'app'
    },
  })
});

gulp.task('conscripts', function() {
  return gulp
    .src([
    'app/libs/jquery/dist/jquery.min.js',
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
});

gulp.task('watch', ['browserSync', 'sass', 'jade', 'conscripts'], function () {
  gulp.watch('app/sass/**/*.sass', ['sass']);
  gulp.watch('app/jade/**/*.jade', ['jade']);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

// BUILDING DIST STUFF BELOW

gulp.task('img', function() {
	return gulp
	.src('app/img/**/*')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		svgoPlugins: [{removeViewBox: false}],
		use:[pngquant()]
	})))
  .pipe(gulp.dest('dist/img'));
});

gulp.task('clear', function(){
	return cache.clearAll();
});

gulp.task('fonts', function() {
  return gulp
  .src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('clean', function(){
	return del.sync(['!dist/img', 'dist/**']);
});

gulp.task('build', ['clean', 'fonts', 'sass', 'jade', 'conscripts', 'img'], function() {
  var buildCss = gulp.src([
    'app/css/main.css'
  ])
  .pipe(gulp.dest('dist/css'));

  var buildJs = gulp.src('app/js/**/*.js')
  .pipe(gulp.src('dist/js'));

  var buildHtml = gulp.src('app/*.html')
  .pipe(gulp.dest('dist'));
});

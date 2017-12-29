var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var concat = require('gulp-concat');
var rev = require('gulp-rev');
var del = require('del');

var srcDir = './src';
var buildDir = './dist';

gulp.task('connect', function() {
	connect.server({
		port: 8001
	});
});

gulp.task('sass', function () {
	return gulp.src(srcDir + '/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(srcDir + '/'));
});

gulp.task('sass:watch', function () {
	gulp.watch(srcDir + '/*.scss', ['sass']);
});

gulp.task('build', ['cleanup'], function() {
	var css = gulp.src(srcDir + '/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(buildDir + '/src'));

	var img = gulp.src(srcDir + '/img/**')
		.pipe(gulp.dest(buildDir + '/src/img'));

	var mainJs = gulp.src('./index.html')
		.pipe(usemin({
			simpleGanttJs: [ uglify(), rev() ]
		}))
		.pipe(gulp.dest(buildDir));
});

gulp.task('cleanup', function () {
	return del([buildDir + '/*'])
});

gulp.task('default', ['connect', 'sass:watch']);

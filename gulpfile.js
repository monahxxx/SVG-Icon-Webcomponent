const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const svgSprite	= require('gulp-svg-sprite');

gulp.task('svg', function () {
	gulp.src('src/SVG/*.svg')
		.pipe(svgSprite({mode: {symbol: true}}))
		.pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
	return gulp.src('src/scss/*.scss')
				.pipe(sass())
				.pipe(autoprefixer())
				.pipe(gulp.dest('dist/styles'))
 				.pipe(browserSync.stream());
});

gulp.task('js', function () {
	return gulp.src('src/js/*.js')
				.pipe(concat('scripts.js'))
				.pipe(gulp.dest('dist/js'));
});

gulp.task('js-watch', ['js'], function (done) {
	browserSync.reload();
	done();
});

gulp.task('html', function () {
	return gulp.src('src/*.html')
				.pipe(gulp.dest('dist'));
});

gulp.task('html-watch', ['html'], function (done) {
	browserSync.reload();
	done();
});

gulp.task('webserver', function() {
	browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    gulp.watch('src/*.html',['html-watch']);
    gulp.watch('src/js/*.js',['js-watch']);
    gulp.watch('src/scss/*.scss',['sass']);
});

gulp.task('serve', ['sass', 'js', 'html', 'webserver']);
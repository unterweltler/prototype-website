var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync').create();
var config = {
	'src': '',
	'dest': 'build/'
};


// HTML
function html() {
	return gulp.src(config.src + '*.html')
		.pipe($.mjml())
		.pipe($.htmlBeautify({
			indentSize: 4
		}))
		.pipe(gulp.dest(config.dest))
		.pipe(browserSync.stream());
}

// Serve compiled files
function serve(done) {
	browserSync.init({
		server: config.dest,
		notify: false,
		snippetOptions: {
			rule: {
				match: /<\/body>/i
			}
		}
	});
	done();
}

// Watch files for changes
function watch(done) {
	gulp.watch(config.src + '*.html', html);
	done();
}


gulp.task('build', html);
gulp.task('default', gulp.series(html, gulp.parallel(serve, watch)));

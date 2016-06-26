var gulp = require('gulp');
var minify = require('gulp-minify');

gulp.task('default', function () {
    gulp.src('js/jquery.bsAsk.js')
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.min.js'
            },
            compress: {}
        }))
        .pipe(gulp.dest('dist/js'));
});
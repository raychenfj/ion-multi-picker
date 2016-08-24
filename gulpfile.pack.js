var gulp = require('gulp'),
    gulpWatch = require('gulp-watch'),
    del = require('del'),
    runSequence = require('run-sequence'),
    argv = process.argv;

gulp.task('del', function() {
    return del(['dist', '*.scss', '*.tgz']);
});

gulp.task('copyscss', function() {
    gulp.src('src/components/multi-picker/*.scss').pipe(gulp.dest('./'));
});

var shell = require('gulp-shell');
gulp.task('tsc', shell.task(['tsc']));
gulp.task('pack', shell.task(['npm pack']));


gulp.task('default', function() {
    runSequence('del', 'copyscss', 'tsc', 'pack')
});

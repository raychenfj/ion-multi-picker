/**
* Pack Ion-multi-picker
*/
var gulp = require('gulp'),
    gulpWatch = require('gulp-watch'),
    del = require('del'),
    runSequence = require('run-sequence'),
    argv = process.argv;

gulp.task('del', function() {
    return del(['dist', '*.scss', '*.tgz']);
});

gulp.task('copyscss', function() {
    gulp.src('src/components/multi-picker/*.scss').pipe(gulp.dest('dist/components/multi-picker'));
});

var shell = require('gulp-shell');
gulp.task('ngc', shell.task(['ngc -p ./config/tsconfig.build.json']));
gulp.task('pack', shell.task(['npm pack']));

gulp.task('post', function(){
    return del(['./config/node_modules', './config/src']);
});


gulp.task('default', function() {
    runSequence('del', 'copyscss', 'ngc', 'pack','post')
});



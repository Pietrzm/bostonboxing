// Load Gulp Modules
var gulp = require('gulp');
var  gutil = require('gulp-util');
var  ts = require('gulp-typescript');
var  clean = require('gulp-clean');
var  browserSync = require('browser-sync');

// Define bases
var bases = {
  app: 'app/',
  dist: 'dist/',
};

// Define paths
var paths = {
  scripts: 'scripts/**/*.ts',
  html: ['index.html', '404.html']
};

// Define configs
var config = {
  tsconfig: 'tsconfig.json'
}


// Run server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: bases.dist + 'app/'
    }
  });
});


// TypeScript task
var tsProject = ts.createProject(config.tsconfig);
gulp.task('ts-compile', function() {
  var tsResult = tsProject.src()
    .pipe(ts(tsProject));

  return tsResult.js.pipe(gulp.dest(bases.dist));
});


// Copy HTML files
gulp.task('html', ['clean'], function() {
  return gulp.src('**/*.html', {
    cwd: bases.app,
    base: 'src'
  }).pipe(gulp.dest(bases.dist + '*.html'));
});


// Delete the dist directory
gulp.task('clean', function() {
  return gulp.src(bases.dist)
    .pipe(clean());
});



// Watch task
gulp.task('watch', function() {
  gulp.watch('app/**/*', ['ts-compile', 'html', browserSync.reload]);
});



// Start workflow
gulp.task('default', ['clean', 'html', 'ts-compile', 'browser-sync', 'watch']);

//gulp.task('', []);

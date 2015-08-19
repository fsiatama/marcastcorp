var gulp = require('gulp');
var stylus = require('gulp-stylus');
var bootstrap = require('bootstrap-styl');

/*var browserify = require('browserify')
var babelify = require('babelify')
var buffer = require('vinyl-buffer')
var source = require('vinyl-source-stream')*/
var uglify = require('gulp-uglify')

var jade = require('gulp-jade');
var rename = require('gulp-rename');
var concat = require('gulp-concat-css')
var nib = require('nib')
var minify = require('gulp-minify-css')

var watchify = require('watchify')
var assign = require('lodash.assign')
var livereload = require('gulp-livereload')


/********************************** bundle js ***************************************/

gulp.task('js', function() {
  return js()
})

gulp.task('js:watch', function() {
  
  return gulp.watch( [ 'frontEndLib/js/**/*.js' ], ['js'] )
})

/********************************** bundle stylus ***************************************/
gulp.task('styl', function() {
  return styl();
})
gulp.task('styl:livereload', function() {
  return styl().pipe( livereload( { start: true } ) )
})
gulp.task('styl:watch', function() {
  return gulp.watch( [ 'frontEndLib/css/app.styl', 'frontEndLib/css/*.styl' ], ['styl'] )
})

/********************************** bundle jade ***************************************/
gulp.task('htmlTpl', function() {
  return htmlTpl();
})
gulp.task('htmlTpl:watch', function() {
  return gulp.watch( [ 'frontEndLib/templates/*.jade' ], ['htmlTpl'] )
})

gulp.task( 'watch', ['styl:watch', 'htmlTpl:watch', 'js:watch'])


function js () {
  return gulp.src('frontEndLib/js/**/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('./public_html/js/'))
}

function htmlTpl () {
  return gulp.src('frontEndLib/templates/*.jade')
  .pipe(jade())
  .pipe(rename({
    extname: ".tpl.php"
  }))
  .pipe(gulp.dest('app/views/'))
}

function styl () {
  return gulp.src('frontEndLib/css/main.styl')
  .pipe(stylus({ use: [ nib(), bootstrap()] }))
  .pipe(concat('main.css'))
  .pipe(minify())
  .pipe(gulp.dest('public_html/css/'))
}
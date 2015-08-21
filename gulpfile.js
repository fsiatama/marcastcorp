var gulp       = require('gulp')
var browserify = require('browserify')
var jade       = require('gulp-jade')
var babelify   = require('babelify')
var buffer     = require('vinyl-buffer')
var source     = require('vinyl-source-stream')
var stylus     = require('gulp-stylus')
var concat     = require('gulp-concat')
var nib        = require('nib')
var minify     = require('gulp-minify-css')
var uglify     = require('gulp-uglify')
var watchify   = require('watchify')
var assign     = require('lodash.assign')
var livereload = require('gulp-livereload')
var bootstrap  = require('bootstrap-styl')
var rename     = require('gulp-rename')
var imagemin   = require('gulp-imagemin')
/********************************** bundle images ***************************************/
// Gulp task - images
gulp.task('images', function() {
  gulp.src('./frontEndLib/img/**')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true, use: [] }))
    .pipe(gulp.dest('./public_html/img/'));
});
/********************************** bundle js ***************************************/

var opts = {
  entries: './frontEndLib/js/main.js',
  transform: [ babelify ]
}
opts = assign({}, watchify.args, opts)

gulp.task('js:watch', function() {
  var w = watchify( browserify(opts) )
    console.log(opts)
  
  w.on('update', function(file) {
    //logica de rebuild
    console.log(file)
    var bdle = generateBundle(w).pipe( livereload() )
    console.log('finish')
    return bdle
  })
  
  return generateBundle(w).pipe( livereload({ start: true}) )
})

gulp.task('js', function() {
  return generateBundle(browserify(opts))
})

function generateBundle (b) {
  return b
  .bundle()
  .pipe(source('main.js'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(gulp.dest('./public_html/js/'))
}

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

gulp.task( 'watch', ['styl:watch', 'htmlTpl:watch', 'js:watch', 'images'])


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
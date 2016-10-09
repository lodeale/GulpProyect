var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    $ = require('gulp-load-plugins')();

/*
 * Configuration
 */
var config = {
  bootstrapDir : './bower_components/bootstrap-sass'
};

/*
 * Environment's configuration Developer
 */ 
gulp.task('sass', function(){
  return gulp.src('src/css/*.s*ss')
      .pipe($.sourcemaps.init())
      .pipe($.sass({
                    includePaths: [config.bootstrapDir + '/assets/stylesheets'],
        }).on('error',$.sass.logError))
      .pipe($.autoprefixer({ browser: ['last 2 versions'], cascade: false }))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest('.tmp'))
      .pipe(reload({ stream: true }));
});

gulp.task('pug', function(){
  return gulp.src('src/*.pug')
          .pipe($.pug())
          .pipe(gulp.dest('.tmp'))
});


gulp.task('watch', function() {
  gulp.watch('src/css/*.sass', ['sass']);
  gulp.watch('src/*.pug', ['pug']);
  gulp.watch('.tmp/*.html').on('change', reload);
});

gulp.task('serve', ['sass','pug'], function() {
  browserSync({
    server: {
      baseDir: ['.tmp','src']
    }
  });

  gulp.start('watch');
});

gulp.task('default', ['sass']);




/*
 * Environment's configuration Production
 */ 

gulp.task('sass:prod', function(){
  return gulp.src('src/css/*.s*ss')
      .pipe($.sass({
        outputStyle:'compressed',
        includePaths: [config.bootstrapDir + '/assets/stylesheets'],
        }).on('error',$.sass.logError))
      .pipe($.autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
      .pipe(gulp.dest('dist'))
});

gulp.task('pug:prod', function(){
  return gulp.src('src/*.pug')
          .pipe($.pug())
          .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
  gulp.src('src/js/*.js')
    .pipe($.uglify({compress:true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('build', ['sass:prod', 'pug:prod', 'js']);

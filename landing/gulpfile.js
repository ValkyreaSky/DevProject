const gulp = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const browsersync = require('browser-sync');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

gulp.task('browsersync', () => {
  browsersync.init({
    server: {
      baseDir: `./src`,
    },
    notify: false,
  });
});

gulp.task('scss', () => {
  return gulp.src('./src/scss/main.scss')
    .pipe(sass({
      outputStyle: 'nested',
    }).on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(`./src/css`))
    .pipe(browsersync.stream());
});

gulp.task('watch:scss', () => {
  gulp.watch('./src/**/*.scss', gulp.series('scss'));
});

gulp.task('watch:html', () => {
  gulp.watch(`./src/*.html`).on('change', browsersync.reload);
});

gulp.task('dev', gulp.parallel('watch:html', 'watch:scss', 'browsersync'));

gulp.task('scss:min', gulp.series('scss', () => {
  const plugins = [
    autoprefixer({
      browsers: ['last 2 version'],
    }),
    cssnano(),
  ];

  return gulp.src('./src/css/style.css')
    .pipe(postcss(plugins))
    .pipe(gulp.dest('./dist/css'));
}));

gulp.task('html:min', function() {
  return gulp.src('./src/*.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('js:min', function() {
  return gulp.src('./src/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('img:min', () =>
    gulp.src('src/images/**/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/images'))
);

gulp.task('build', gulp.series('scss:min', 'html:min', 'js:min', 'img:min'));

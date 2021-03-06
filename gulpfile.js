const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const sync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var del = require("del");
var htmlmin = require("gulp-htmlmin");

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
    ]))
    .pipe(csso())
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
};

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build"
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html").on("change", sync.reload);
};

exports.default = gulp.series(
  styles, server, watcher
);

//Scripts
const scripts = () => {
  return gulp.src("js/script.js")
    .pipe(tester())
    .pipe(rename({
      suffix: "min"
    }))
    .pipe(gulp.dest("js"))
    .pipe(sync.stream())
}

exports.scripts = scripts;

// Images
const images = () => {
  return gulp.src("sourse/img/**/*.{jpg, png, svg}")
    .pipe(imagemin([
      imagemin.optipng({
        optimizationLevel: 3
      }),
      imagemin.mozjpeg({
        progressive: true
      }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"))
};

exports.images = images;

//Webp
const createWebp = () => {
  return gulp.src("sourse/img/**/*.{png, jpg}")
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest("build/img"))
};

exports.webp = createWebp;

//Svg-sprite

const sprite = () => {
  return gulp.src("sourse/img/**/icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
};

exports.sprite = sprite;

// Clean
const clean = () => {
  return del("build")
};

exports.clean = clean;

// copy

const copy = () => {
  return gulp.src([
      "source/fonts/**/*.{woff, woff2}",
      "source/img/**",
      "source/js/**",
      "source/*.ico"
    ], {
      base: "source"
    })
    .pipe(gulp.dest("build"));
};

exports.copy = copy;

const html = () => {
  return gulp.src("source/*.html", {
      base: "source"
    })
    .pipe(gulp.dest("build"));
};
exports.html = html;

const htmlMinify = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest("build"))
};
exports.htmlMinify = htmlMinify;

const build = gulp.series(
  clean,
  copy,
  styles,
  images,
  createWebp,
  sprite,
  html,
  htmlMinify,
);
exports.build = build;

const start = gulp.series(
  build,
  server,
  watcher
);
exports.start = start;

var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify'),
    include = require('gulp-include'),
    htmlReplace = require("gulp-html-replace"),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    projectPath = './project/';

/*
 * Compilar SASS / SCSS a CSS
 */
gulp.task('sass:compile', function () {
    var srcPath = projectPath + '_src/scss/*.scss',
        destPath = projectPath + 'styles/';
    
    //-> gulp sass:
    gulp.src(srcPath)
    .pipe(sass({
        outputStyle: 'expanded'
    }))
    .pipe(autoprefixer({
        versions: ['last 2 browsers']
    }))
    .pipe(include()).on('error', console.log)
    .pipe(gulp.dest(destPath))
    .pipe(browserSync.stream());
    
    //->
    
});

/* 
 * Funcion para compilar PUG a HTML
 */
gulp.task('pug:compile', function () {
    var srcPath = projectPath + '_src/pug/*.pug',
        destPath = projectPath,
        lenguagePack = require("./project/_src/i18n.json");
    
    gulp.src(srcPath)
    .pipe(pug({
        pretty: true,
        data: {
            i18n: lenguagePack
        }
    }))
    .pipe(gulp.dest(destPath));
});

/*
 * Funcion para compilar el "main.js"
 */
gulp.task('js:compile', function () {
    var srcPath = projectPath + '_src/scripts/*.js',
        destPath = projectPath + 'scripts/';
    
    gulp.src(srcPath).pipe(include()).on('error', console.log)
    .pipe(gulp.dest(destPath));
});

/*
 * Funcion para sincronizar navegadores & livereload
 */
gulp.task('browserSync', function () {
    browserSync.init({
        injectChanges: true,
        notify: false,
        server: projectPath
    });
    
    //gulp.watch(['./dev/**/*.html', ('./dev/**/*.js'), ('./dev/**/*.jpg'), ('./dev/**/*.png'), ('./dev/**/*.svg'), ('./dev/**/*.gif')]).on('change', browserSync.reload);
    
    gulp.watch([
        (projectPath + "**/*.html"),
        (projectPath + "**/*.js"),
        (projectPath + "media/**/*.*")
    ]).on('change', browserSync.reload);
});

/*
 * Funcion de los observadores
 */
gulp.task('watchers', function () {
    gulp.watch(projectPath + '**/*.pug', ['pug:compile']);
    gulp.watch(projectPath + '**/*.js', ['js:compile']);
    gulp.watch(projectPath + '**/*.scss', ['sass:compile']);
});

/*
 * Funcion para minificar y construir projecto
 */
gulp.task("build:dist", function () {
    //buid SASS
    gulp.src("./project/_src/scss/*.scss")
    .pipe(sass({
        outputStyle: "compressed"
    }))
    .pipe(autoprefixer({
        versions: ["last 2 browsers"]
    }))
    .pipe(include())
    .pipe(gulp.dest("./dist/styles/"));
    
    //Build JS
    gulp.src("./project/_src/scripts/*.js")
    .pipe(include())
    .pipe(minify())
    .pipe(gulp.dest("./dist/scripts/"));
    
    //Build HTML
    gulp.src("./project/_src/pug/*.pug")
    .pipe(pug({
        pretty: false
    }))
    .pipe(htmlReplace({
        "JS": "scripts/main-min.js"
    }))
    .pipe(gulp.dest("./dist/"));
    
    //Move media resourses
    gulp.src("./project/media/**/*.*")
    .pipe(gulp.dest("./dist/media/"));
    
    //Move libs
    gulp.src("./project/libs/**/*.*")
    .pipe(gulp.dest("./dist/libs/"))
});

/*
 * Tareas que se ejecutan por "default"
 */
gulp.task('default', ['watchers', 'browserSync']);
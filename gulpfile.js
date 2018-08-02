var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    include = require('gulp-include'),
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
        destPath = projectPath;
    
    gulp.src(srcPath)
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest(destPath));
});

/*
 * Funcion para compilar el "main.js"
 */
gulp.task('js:compile', function () {
    var srcPath = projectPath + '_src/scripts/main.js',
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
        (projectPath + "**/*.css"),
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
 * Tareas que se ejecutan por "default"
 */
gulp.task('default', ['watchers', 'browserSync']);
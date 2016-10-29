var gulp = require('gulp');
var sass=require("gulp-sass");
var cleanCSS = require('gulp-clean-css');
var pug=require("gulp-pug");
var coffee=require("gulp-coffee");
var uglify = require('gulp-uglify');

var concat= require('gulp-concat');


output_root='./asherwang.github.com';

var pages=['common','index','pages','imitations','translations','comments'];
pages.forEach(function(page){
    var output_dir=output_root+'/'+(page == 'index' ? '' : page);
    var src_page ='./app/'+page;
    gulp.task(page+'-pug',function(){
        gulp.src(src_page+'/*.pug')
            .pipe(pug())
            .pipe(gulp.dest(output_dir));
        gulp.src(src_page+'/*.md')
            .pipe(gulp.dest(output_dir));
        
    }); //某page的模板页面
    gulp.task(page+'-sass',function(){
        gulp.src(src_page+'/*.scss')
            .pipe(sass())
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest(output_dir))
    }); //某page的sass
    gulp.task(page+'-coffee',function(){
        gulp.src(src_page+'/*.coffee')
            .pipe(coffee({bare: true}))
            .pipe(uglify())
            .pipe(gulp.dest(output_dir));
        gulp.src(src_page+'/*.js')
            .pipe(uglify())
            .pipe(gulp.dest(output_dir));
    }); //某page的coffee
    gulp.task(page,[page+'-pug',page+'-sass', page+'-coffee']); //某page的所有
    
    // Rerun the task when a file changes
    gulp.task(page+'-watch', function() {
        gulp.watch(src_page+"/*", [page]);
    });

});


//pages.push('libs');
gulp.task('run',pages);
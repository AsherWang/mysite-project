var gulp = require('gulp');
var sass=require("gulp-sass");
var minifyCss = require('gulp-minify-css');
var pug=require("gulp-pug");
var coffee=require("gulp-coffee");
var uglify = require('gulp-uglify');
//var shell = require('gulp-shell');
var concat= require('gulp-concat');


output_root='./asherwang.github.com';


//gulp.task('shorthand', shell.task('cd asherwang.github.com & git add . & git commit -m "gogogo" & git push origin master'));


var pages=['common','index','pages','imitations'];
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
            .pipe(minifyCss({compatibility: 'ie8'}))
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

});
gulp.task('libs',function(){
    gulp.src(['./bower_components/jquery/dist/jquery.js'])
        .pipe(uglify())
        .pipe(gulp.dest(output_root+'/libs'));
});

//pages.push('libs');
//gulp.task('run',pages);
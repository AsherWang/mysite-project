var gulp = require('gulp');
var sass=require("gulp-sass");
var minifyCss = require('gulp-minify-css');
var pug=require("gulp-pug");
var coffee=require("gulp-coffee");
var uglify = require('gulp-uglify');
var shell = require('gulp-shell');
var concat= require('gulp-concat');
var mainBowerFiles = require('main-bower-files');


input={
    vendor:{
        style:['./bower_components/font-awesome/scss/font-awesome.scss'],
        js:['./bower_components/jquery/dist/jquery.js','./bower_components/jrumble/jquery.jrumble.js']
    },
    sass:['./app/stylesheets/hello-world.scss'],
    coffee: ['./app/coffee/hello-world.coffee'],
    pug_index:['./app/view/*.pug'],
    pug_pages:['./app/view/pages/*.pug']
};

tmp={

};
output_root='./asherwang.github.com';
output={
    style:output_root+'/css',
    js: output_root+'/js',
    view:output_root,
    pug_pages:output_root+'/pages'
};


//gulp.task('js',function(){
//    console.log(output);
//    //gulp.src(['./bower_compenents/jquery/dist/jquery.min.js'])
//    //    .pipe(concat('vendor.js'))
//    //    .pipe(gulp.dest(paths.output.js));
//    gulp.src(input.coffee)
//        .pipe(coffee())
//        .pipe(uglify())
//        .pipe(gulp.dest(output.js));
//});
//
//
//gulp.task('pug-index', function() {
//    gulp.src(input.pug_index)
//        .pipe(pug())
//        .pipe(gulp.dest(output.view))
//});
//gulp.task('pug-pages', function() {
//    gulp.src(input.pug_pages)
//        .pipe(pug())
//        .pipe(gulp.dest(output.pug_pages))
//});
//
//
//gulp.task('pug', ['pug-index','pug-pagepug_pagess']);
//
//
//gulp.task('sass', function() {
//    gulp.src(input.sass)
//        .pipe(sass())
//        .pipe(minifyCss({compatibility: 'ie8'}))
//        .pipe(gulp.dest(output.style))
//});
//
//gulp.task('run', ['vendor','js', 'pug','sass']);
// Rerun the task when a file changes
//gulp.task('watch', function() {
//    gulp.watch(input.js, ['js']);
//    gulp.watch(input.pug, ['pug']);
//    gulp.watch(input.sass, ['sass']);
//
//
//});
//
//gulp.task('vendor',function(){
//    gulp.src(input.vendor.js)
//        .pipe(concat('vendor.js'))
//        //.pipe(uglify())
//        .pipe(gulp.dest(output.js));
//
//    gulp.src(input.vendor.style)
//        .pipe(concat('vendor.css'))
//        .pipe(sass())
//        //.pipe(minifyCss({compatibility: 'ie8'}))
//        .pipe(gulp.dest(output.style));
//});


//gulp.task('shorthand', shell.task('cd asherwang.github.com & git add . & git commit -m "gogogo" & git push origin master'));


var pages=['common','index','pages'];
pages.forEach(function(page){
    var output_dir=output_root+'/'+(page == 'index' ? '' : page);
    var src_page ='./app/'+page;
    gulp.task(page+'-pug',function(){
        gulp.src(src_page+'/*.pug')
            .pipe(pug())
            .pipe(gulp.dest(output_dir))
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

pages.push('libs');
gulp.task('run',pages);
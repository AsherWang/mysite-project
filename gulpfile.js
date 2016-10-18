var gulp = require('gulp');
var sass=require("gulp-sass");
var minifyCss = require('gulp-minify-css');
var jade=require("gulp-jade");
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
    jade:['./app/view/*.jade']
};

tmp={

};
output_root='./asherwang.github.com';
output={
    style:output_root+'/css',
    js: output_root+'/js',
    view:output_root
};


gulp.task('js',function(){
    console.log(output);
    //gulp.src(['./bower_compenents/jquery/dist/jquery.min.js'])
    //    .pipe(concat('vendor.js'))
    //    .pipe(gulp.dest(paths.output.js));
    gulp.src(input.coffee)
        .pipe(coffee())
        .pipe(uglify())
        .pipe(gulp.dest(output.js));
});


gulp.task('jade', function() {
    gulp.src(input.jade)
        .pipe(jade())
        .pipe(gulp.dest(output.view))
});


gulp.task('sass', function() {
    gulp.src(input.sass)
        .pipe(sass())
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(output.style))
});

gulp.task('run', ['vendor','js', 'jade','sass']);
// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(input.js, ['js']);
    gulp.watch(input.jade, ['jade']);
    gulp.watch(input.sass, ['sass']);


});

gulp.task('vendor',function(){
    gulp.src(input.vendor.js)
        .pipe(concat('vendor.js'))
        //.pipe(uglify())
        .pipe(gulp.dest(output.js));

    gulp.src(input.vendor.style)
        .pipe(concat('vendor.css'))
        .pipe(sass())
        //.pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(output.style));
});


gulp.task('shorthand', shell.task('cd asherwang.github.com & git add . & git commit -m "gogogo" & git push origin master'));

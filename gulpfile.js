var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('serve', function(){
	var options = {
		script: './bin/www',
		delayTime: 1,
		watch: ['*.js', './routes/**/*.js']
	};
	
	return nodemon(options).on('restart', function(){
		console.log('Server restarting...');
	});
});
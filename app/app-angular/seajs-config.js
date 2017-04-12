seajs.config({
	paths:{
		app:'./app/js',
		comp:'../../components/node_modules'
	},
	//别名，简化模块标识
	alias:{
		'jquery':'comp/jquery/dist/jquery.min.js',
		'bootstrap':'comp/bootstrap/dist/js/bootstrap.min.js',
		'index':'app/index.js'
	},
	debug:true
});
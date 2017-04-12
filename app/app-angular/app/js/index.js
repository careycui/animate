define(function(require,exports,module){
	// require('jquery');
	require('bootstrap');

	$(function(){
		$('#login-nav a').click(function(e){
			e.preventDefault();
			$(this).tab('show');
		});
	});


	function isType(type) {
	  return function(obj) {
	    return {}.toString.call(obj) == "[object " + type + "]"
	  }
	}
	console.log(isType('object')('111111'));
	console.log({}.toString.call('111111') == "[object object]");
});
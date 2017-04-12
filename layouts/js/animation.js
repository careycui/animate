define(function(require,exports,module){
	require('../../components/jquery/dist/jquery.min.js');
	require('../js/layouts.js');

	$(function(){
		$('.ani-btn').on('click',function(){
			var $ele = $(this),
				ani = $ele.data('animation');

			$('#ani-element').removeClass();
			setTimeout(function(){
				$('#ani-element').addClass(ani);
			},0);
		});
	});
});
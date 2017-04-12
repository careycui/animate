define(function(require,exports,module){
	require('../../components/jquery/dist/jquery.min.js');
	require('../js/layouts.js');
	require('../../custome-animate/aniview/aniview.js');

	$(function(){
		$('.aniview').aniView({
			marginHeight:-200,
			delayTime:0
		});
		$('.box').aniView({
			marginHeight:-200,
			delayTime:0
		});
		$('.aniview-ex').aniView({
			marginHeight:-200,
			animation:'extend',
			callback:function(){
				var that = this,
				ops = that.ops,
				$elem = that.elem,
				$parent = that.parentEle;

				$elem.css('opacity', 1);
	            $parent.addClass('av-visible');
	            $elem.addClass('animated ' + $elem.attr('av-animation'));
			}			
		});
	});
});
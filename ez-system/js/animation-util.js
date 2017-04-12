(function(global) {
	var div = document.createElement('div'),
		style = div.style,
		animationNames = ['animation', 'WebkitAnimation', 'OAnimation', 'msAnimation', 'MozAnimation'],
		/**
		 * 通过style对象获取正确的 animation 名称
		 * @return { String || Boolean }  animation 名称
		 */
		animationName = (function() {
			var i = 0,
				len = animationNames.length,
				name,
				u = void 0;
			for (; i < len; i++) {
				name = animationNames[i];
				if (style[name] !== u) return name;
			}
			return false;
		})(),
		//真实的animationend
		aniEndName = {
			animation: 'animationEnd',
			WebkitAnimation: 'webkitAnimationEnd',
			OAnimation: 'oAnimationEnd',
			msAnimation: 'MSAnimationEnd',
			MozAnimation: 'mozAnimationEnd'
		}[animationName],
		//真实的animationStart
		aniStartName = {
			animation: 'animationStart',
			WebkitAnimation: 'webkitAnimationStart',
			OAnimation: 'oAnimationStart',
			msAnimation: 'MSAnimationStart',
			MozAnimation: 'mozAnimationStart'
		}[animationName],
		//真实的transition
		transitionName = {
			animation: 'transition',
			WebkitAnimation: 'webkitTransition',
			OAnimation: 'oATransition',
			msAnimation: 'MSTransition',
			MozAnimation: 'mozTransition'
		}[animationName],
		//真实的transform
		transformName = {
			animation: 'transform',
			WebkitAnimation: 'webkitTransform',
			OAnimation: 'oATransform',
			msAnimation: 'MSTransform',
			MozAnimation: 'mozTransform'
		}[animationName];

		var lastTime = 0;
	    var vendors = ['webkit', 'moz'];
	    for(var x = 0; x < vendors.length && !global.requestAnimationFrame; ++x) {
	        global.requestAnimationFrame = global[vendors[x] + 'RequestAnimationFrame'];
	        global.cancelAnimationFrame = global[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit中此取消方法的名字变了
	                                      global[vendors[x] + 'CancelRequestAnimationFrame'];
	    }

	    if (!global.requestAnimationFrame) {
	        global.requestAnimationFrame = function(callback, element) {
	            var currTime = new Date().getTime();
	            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
	            var id = global.setTimeout(function() {
	                callback(currTime + timeToCall);
	            }, timeToCall);
	            lastTime = currTime + timeToCall;
	            return id;
	        };
	    }
	    if (!global.cancelAnimationFrame) {
	        global.cancelAnimationFrame = function(id) {
	            clearTimeout(id);
	        };
	    }
	    
		global.animationName = aniStartName;
		global.aniStartName = aniStartName;
		global.aniEndName = aniEndName;
		global.transitionName = transitionName;
		global.transformName = transformName;
})(window);
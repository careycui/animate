$(function(){
	var page_run={
		pageDom         : $('#page'),
		headerTopDom    : $('#header-top'),
		init:function(){
			var that = this,
				screenHeight = $(window).height(),
				headerContH = screenHeight-110,
				totalH = headerContH;

			$('.page-body').niceScroll({cursorcolor:'rgba(0,0,0,.5)',cursorwidth:'4px',cursorborderradius:'0',autohidemode:true });
		},
		bind_event:function(){
			var that = this,timeoutId=void 0;

			$('#menu').on('click',function(){
				$(this).toggleClass('active');
				$('#side-bar').toggleClass('open');
			});
			$('.nav-item:not(.sub)').on('click',function(){
				var subMenu = $(this).data('sub-menu');
				$.each($('.nav-item'),function(i,ele){
					var $ele = $(ele),
						sub = $ele.data('sub-menu');
					if($ele.hasClass('active')){
						!!sub ? ($ele.removeClass('active'),$('#'+sub).removeClass('active')) :($ele.removeClass('active'));
					}
				});

				!!subMenu ? ($(this).addClass('active'),$('#'+subMenu).addClass('active')) :($(this).addClass('active'));
			});
			$('.nav-item.sub').on('click',function(){
				$(this).parent('.sub-nav').find('.sub').each(function(i,ele){
					var $ele = $(ele);
					($ele.hasClass('active'))&&($ele.removeClass('active'));
				});

				$(this).addClass('active');
			});
			$('#profile-tab').on('click',function(e){
				var $content = $('#'+$(this).data('tab-content')),
				 	$target = $(e.target),
				 	lastIndex = 0,
					index = $target.index();
				if($target.hasClass('active'))return;
				$.each($('#profile-tab').find('.tab-nav-item'),function(i,ele){
					var $ele = $(ele);
					if(index != i && $ele.hasClass('active')){
						lastIndex = i;
						$ele.removeClass('active');
					}
				});
				$target.addClass('active');
				$content.find('.tab-panel:eq('+lastIndex+')').removeClass('active in');
				$content.find('.tab-panel:eq('+index+')').addClass('active').promise().done(function(){
					var that = $(this);
					setTimeout(function(){
						that.addClass('in');
					},0);
				});
			});
		},
		run:function(){
			this.init();
			this.bind_event();
		}
	};
	page_run.run();
});
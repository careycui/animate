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
			
			$('.form-control').on('focus',function(){
				$(this).parent('.form-group').addClass('active');
			}).on('blur',function(){
				$(this).parent('.form-group').removeClass('active');
			});

			$('.checkbox input[type="checkbox"]').on('click',function(e){
				$(this).parents('.checkbox').toggleClass('active');
			});

			$('.checkbox input[type="checkbox"]').on('change',function(){
				var $ele = $(this),
					check = $ele.is(':checked');
				$ele.parents('.checkbox').find('.checkbox-value').text(check);
			});

			$('.radiobox input[type="radio"]').on('click',function(e){
				var $ele = $(this),
					parent = $(this).parents('.radiobox'),
					name = parent.attr('name');
				$('.radiobox[name="'+name+'"]').each(function(i,ele){
					$(ele).removeClass('active');
				});
				parent.addClass('active');
			});

			$('.radiobox input[type="radio"]').on('change',function(){
				var $ele = $(this),
					check = $ele.is(':checked');
				$ele.parents('.radiobox').find('.radiobox-value').text(check);
			});
		},
		run:function(){
			this.init();
			this.bind_event();
		}
	};
	page_run.run();
});
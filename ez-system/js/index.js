$(function(){
	var page_run={
		pageDom         : $('#page'),
		headerTopDom    : $('#header-top'),
		headerContDom   : $('.header-content'),
		headerBottomDom : $('#header-bottom'),
		startDom        : $('#start'),
		closeDom		: $('#close'),
		headerFirstDom  : $('.first'),
		headerSecondDom : $('.second'),
		userDom			: $('#user-panel'),
		init:function(){
			var that = this,
				screenHeight = $(window).height(),
				headerContH = screenHeight-110,
				totalH = headerContH;

			that.headerContDom.css({
				height:headerContH+'px',
				top:'60px',
				bottom:'50px'
			}).find('.first,.second').css({
				height:headerContH/2+'px'
			});
			$('.page-body').niceScroll({cursorcolor:'rgba(0,0,0,.5)',cursorwidth:'4px',cursorborderradius:'0',autohidemode:true });
			if($('#tab-content')[0]){
				$('#tab-content').niceScroll({cursorcolor:'rgba(0,0,0,.2)',cursorwidth:'2px',cursorborderradius:'2px',autohidemode:false });
			}
			$('#test').niceScroll({cursorcolor:'rgba(0,0,0,.2)',cursorwidth:'2px',cursorborderradius:'2px',autohidemode:false,horizrailenabled:false });
			that.header_ani_close = function(duration,ani){
				var currDeg = 0,
					currH = 0,
					start = void 0;
				duration || (duration=2000);

				$('#menu').removeClass('active');
				$('#side-bar').removeClass('open');

				that.headerBottomDom.css({
					boxShadow:'none'
				});

				var _ani_rotate = function(currTime){
					start || (start = currTime);
					var diff = currTime - start;
					if(diff>duration) diff = duration;
					var progress = diff/duration;
					currDeg = 90*progress;

					that.headerFirstDom[0].style[transformName] = 'rotateX(-'+currDeg+'deg)';
					that.headerSecondDom[0].style[transformName] = 'rotateX('+currDeg+'deg)';

					var h = Math.cos(currDeg*Math.PI/180)*that.headerFirstDom.height()*2;
					that.headerContDom[0].style.height = h+'px';
					that.headerContDom.parent('.page-header')[0].style.height = (h+60)+'px';
					
					if(currDeg >= 90){
						that.headerBottomDom[0].style.display = 'none';

						that.headerTopDom.css({
							position:'fixed',
							top:'0px'
						}).addClass('active');

						return;
					}
					window.requestAnimationFrame(_ani_rotate);
				};

				var _ani_flip = function(currTime){
					if(!start){
						start = currTime;
						if(ani = '_ani_flip'){
							$('.view-section').addClass('close');
						}
					}
					var diff = currTime - start;

					if(diff>=250){
						if(diff>duration) diff = duration;

						var progress = (diff-250)/(duration-250);
						currH = totalH*(1-progress);
						that.headerContDom[0].style.height = currH+'px';
						that.headerContDom.parent('.page-header')[0].style.height = (currH+60)+'px';
						if(currH == 0){
							that.headerBottomDom[0].style.display = 'none';

							that.headerTopDom.css({
								position:'fixed',
								top:'0px'
							}).addClass('active');

							return;
						}
					}
					window.requestAnimationFrame(_ani_flip);
				};

				window.requestAnimationFrame(_ani_flip);
			};

			that.header_ani_open=function(duration,ani){
				var currDeg = 90,
					start = void 0;

				duration || (duration=2000);
				$('#menu').removeClass('active');
				$('#side-bar').removeClass('open');
				that.headerBottomDom.css({
					display:'block',
					boxShadow:'0px -1px 10px 1px #ccc'
				});

				var _ani_rotate = function(currTime){
					start || (start = currTime);
					var diff = currTime - start;
					if(diff>duration) diff = duration;
					var progress = diff/duration;
					currDeg = 90-90*progress;

					that.headerFirstDom[0].style[transformName]= 'rotateX(-'+currDeg+'deg)';
					that.headerSecondDom[0].style[transformName] = 'rotateX('+currDeg+'deg)';

					var h = Math.cos(currDeg*Math.PI/180)*that.headerFirstDom.height()*2;
					that.headerContDom[0].style.height = h+'px';
					that.headerContDom.parent('.page-header')[0].style.height = (h+110)+'px';
					
					if(currDeg <= 0){
						that.headerContDom.find('.first')[0].style.height = h/2+'px';
						that.headerContDom.find('.second')[0].style.height = h/2+'px';
						that.headerTopDom.css({
							position:'absolute',
							top:'0px'
						}).removeClass('active');
						return;
					}
					window.requestAnimationFrame(_ani_rotate);
				};
				var _ani_flip = function(currTime){
					start || (start = currTime);
					var diff = currTime - start;
					if(diff>duration) return;

					if(diff<=(duration-250)){
						var progress = diff/(duration-250);
						currH = totalH*progress;

						that.headerContDom[0].style.height = currH+'px';
						that.headerContDom.parent('.page-header')[0].style.height = (currH+110)+'px';
					}else if(diff>(duration-250)&&diff<=duration){
						that.headerContDom[0].style.height = totalH+'px';
						that.headerContDom.parent('.page-header')[0].style.height = (totalH+110)+'px';

						$('.view-section').removeClass('close');

						that.headerTopDom.css({
							position:'absolute',
							top:'0px'
						}).removeClass('active');
					}
					window.requestAnimationFrame(_ani_flip);
				};
				window.requestAnimationFrame(_ani_flip);
			};
		},
		bind_event:function(){
			var that = this,timeoutId=void 0;

			that.startDom.on('click',function(){
				that.header_ani_open(500);
			});
			that.closeDom.on('click',function(){
				that.header_ani_close(500);
			});
			that.userDom.on('click',function(){
				var ani = '_ani_flip';
				$(this).toggleClass('panel-open');
				if($(this).hasClass('panel-open')){
					that.header_ani_open(700,ani);
				}else{
					that.header_ani_close(700,ani);
				}
			});
			$('#bottom-menu,#top-menu').on('click',function(){
				$(this).toggleClass('active');
				$('#side-bar').toggleClass('open');
			});
			$('.settings-box').on('click',function(){
				$(this).toggleClass('active');
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
			$('.checkbox').on('click',function(){
				$(this).toggleClass('active');
			});

		},
		run:function(){
			this.init();
			this.bind_event();
		}
	};
	page_run.run();
});
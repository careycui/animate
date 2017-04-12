define(function(require,exports,module){
    require('../../components/jquery/dist/jquery.min.js');
	require('../../custome-animate/imgslide/imgslider.js');

	$(function(){
		var page_run={
			sideBarDom   : $('#side-inner-menu'),
			imgStageDom  : $('#slide-img'),
			imgStage3DDom: $('#slide3d-img'),
			fadeBtnDom   : $('#fade'),
			slideLDom    : $('#slide-left'),
			slideRDom	 : $('#slide-right'),
			aExpandDom	 : $('.a-expand'),
			get_init_data:function(){
				this.menuLi = this.sideBarDom.find('li.first-menu')||[];
			},
			init_page:function(){
				var that = this;
				that.$imgSlider = that.imgStageDom.imgSlider({
					idPrefix:'slide-',
					timeCyc:2000,
					animation:'fade'
				});
				that.$imgSlider3D = that.imgStage3DDom.imgSlider({
					idPrefix:'slide3d-',
					ifInterval:true,
					timeCyc:2000,
					animation:'3d-roll'
				});
				     
			},
			bind_event:function(){
				var that = this;
				//侧边栏绑定相关事件:click
				that.menuLi.click(function(){
					var hasSubMenu = $(this).data('sub-menu');
					var _this = this;
					$.each(that.menuLi,function(i,ele){
						if($(_this).index() != i){
							var $ele = $(ele),
							    eleClass = $ele.attr('class'),
							    subMenu = $ele.data('sub-menu');
							if(eleClass&&eleClass.indexOf('active')>-1){
								$ele.removeClass('active');
								if(subMenu){
									$('#'+subMenu).removeClass('slide');
									setTimeout(function(){
										$('#'+subMenu).removeClass('active');
									},0);
								}
							}
						}
					});
					$(this).addClass('active');
					if(hasSubMenu){
						$('#'+hasSubMenu).addClass('active');
						setTimeout(function(){
							$('#'+hasSubMenu).addClass('slide');
						},0);
					}
				});
				//图片轮播按钮绑定事件
				that.fadeBtnDom.on('click',function(){
					that.$imgSlider.imgSlider('changeAnimate',['fade']);
				});
				that.slideLDom.on('click',function(){
					that.$imgSlider.imgSlider('changeAnimate',['slide']);
				});
				
				//图片翻页效果
				var num = 1;
				var imgs = [
				   {
				   	url:'layouts/images/slide/1.jpg'
				   },{
				   	url:'layouts/images/slide/2.jpg'
				   },{
				   	url:'layouts/images/slide/3.jpg'
				   }
				];
				var flip = {
					imgs : imgs,
					size : imgs.length,
					index : 0
				};
				$('#flip-btn').click(function(){
					$('#slideFlip-img #first').css({
						borderRight:'1px solid rgba(225,225,225,0.4)'
					});
					$('#flip-3d').css({
						webkitTransition:'transform .5s linear',
						webkitTransform:'rotateY(-90deg) perspective(1500px)'
					});
				});
				setInterval(function(){
					$('#slideFlip-img #first').css({
						borderRight:'1px solid rgba(225,225,225,0.4)'
					});
					$('#flip-3d').css({
						webkitTransition:'transform .5s linear',
						webkitTransform:'rotateY(-90deg) perspective(1500px)'
					});
				},3000);
				$('#flip-3d').on('webkitTransitionEnd',function(e){
					if(num%2 != 0 ){
						$('#first-img').hide();
						$('#second-img').show();
						$('#slideFlip-img #first').css({
							borderRight:'none'
						});
						$('#slideFlip-img #second').css({
							zIndex:2,
							borderLeft:'1px solid rgba(225,225,225,0.4)'
						});
						$('#slideFlip-img #first').css({
							zIndex:1
						});
						$('#flip-3d').css({
							webkitTransform:'rotateY(-180deg) perspective(1500px)'
						});
					}else{
						if(num>1){
							flip.index = flip.index+1;
							if(flip.index>flip.size-1){
								flip.index = 0;
							}
							var nextIndex = (flip.index+1)>(flip.size-1)?0:(flip.index+1)
							$('#slideFlip-img #first').css({
								zIndex:2,
								backgroundImage: 'url("'+(flip.imgs)[flip.index].url+'")'
							});
							$('#slideFlip-img #second').css({
								zIndex:0,
								borderLeft:'none',
								backgroundImage: 'url("'+(flip.imgs)[nextIndex].url+'")'
							});
							$('#flip-3d').css({
								webkitTransition:'none',
								webkitTransform:'none'
							});
							$('#first-img').attr('src',(flip.imgs)[flip.index].url).show();
							$('#second-img').attr('src',(flip.imgs)[nextIndex].url).hide();
						}
					}
					num++;
				});
				//面板展开事件
				that.aExpandDom.on('click',function(){
					var $ele = $(this);
					if($ele.hasClass('active')){
						$(this).parents('.item-info').find('.item-info-right').removeClass('active');
						$(this).removeClass('active').parents('.item-info').css({
							width:200,
							height:200
						});
					}else{
						$(this).addClass('active').parents('.item-info').css({
							width:600,
							height:400
						});
						$(this).parents('.item-info').find('.item-info-right').addClass('active');
					}
				});	
			},
			init_run:function(){
				this.get_init_data();
				this.init_page();
				this.bind_event();
			}
		};
		page_run.init_run();

	});
});
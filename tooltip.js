/**
  * @author	Colin
 */
(function($$){
	if (!$$) {return;}
	$$.fn.tooltip = function()
	{
		var xOffset = 10;
		var yOffset = 20;		
		var arr_nodes = $$(this);
		var box = $$('<div class="tooltip" style="position:absolute;"></div>');
		$$('body').append(box);
		box.fadeOut(1);
		$$(arr_nodes).each(function(){
			var me = $$(this);
			me.hover(
				function(e)
				{
					box
					.html(me.attr('tooltip'))
					.fadeIn(50)
					.css({
						'top' : (e.pageY - xOffset) + 'px',
						'left' : (e.pageX + yOffset) + 'px'
					});
				},
				function()
				{
					box.fadeOut(1);
				}
			);
			me.mousemove(function(e){
				box
				.css({
					'top' : (e.pageY - xOffset) + 'px',
					'left' : (e.pageX + yOffset) + 'px'
				});
			})
		});
	}
})(self.$);
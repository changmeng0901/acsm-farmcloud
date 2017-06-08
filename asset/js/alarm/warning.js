jQuery(document).ready(function(){
	resize();
	// 分页
	var oLiW = 0;
	for(var i = 0;i<jQuery('.pages ul li').length;i++){
		oLiW += jQuery('.pages ul li').eq(i).outerWidth();
	}
	jQuery('.pages').css('width',oLiW + 80);
	
	jQuery('.set-list ul li').on('mouseenter',function(){
		jQuery(this).children('.edit').fadeIn();
		jQuery(this).css({"border":"1px solid #7c94b1","box-sizing":"border-box"});
	});
	jQuery('.set-list ul li').on('mouseleave',function(){
		jQuery(this).children('.edit').fadeOut();
		jQuery(this).css({"border":"none"});
	});
	
	jQuery('.turn').on('click',function(){
		jQuery(this).toggleClass('turn-off');
	});
	jQuery('.add,.edit img:first').on('click',function(){
		jQuery('.edit-box').fadeIn();
	});
	// 编辑框
	jQuery('.close-btn').on('click',function(){
		jQuery('.edit-box').fadeOut();
	});
	jQuery('.on-off').on('click',function(){
		jQuery(this).toggleClass('off');
	});
	jQuery('.selectpicker').selectpicker();	
	
	jQuery(".form_datetime").datetimepicker({
		format: "hh:ii", 
		autoclose: true,
		weekStart: 1,
		startView:1,
		language:  'zh-CN',
		pickerPosition: "bottom-left",
		forceParse:false
	});  
});

function resize(){
	var h = jQuery(window).height();
	var w = jQuery(window).width();
	jQuery('#alarmContent').css({"height":900});
	jQuery('.edit-box').css({"height":h});
}
jQuery(window).resize(resize);

function fanhui(){
	jQuery('.edit-box').fadeOut();
}
































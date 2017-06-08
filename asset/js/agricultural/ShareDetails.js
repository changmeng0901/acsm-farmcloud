	//图片懒加载
	$("img").lazyload({
		effect: "fadeIn"
	});
	ResizeSize ();
	
	//计算字号
	function ResizeSize (){
		var w = window.screen.width;
		var target_w = 640;
		var _scale = w/target_w;
		$('#MetaID').attr('content','width=640px,user-scalable=no,initial-scale='+_scale+', minimum-scale='+_scale+', maximum-scale='+_scale);
	}
// JavaScript Document
//<![CDATA[
jQuery(function(){
	
	// (1)获取焦点和失去焦点状态
    jQuery('input[type=text],textarea').focus(function(){
        var txt_value = jQuery(this).val();
        if(txt_value==this.defaultValue){
            jQuery(this).val("");    
        };  
    });
    jQuery('input[type=text],textarea').blur(function(){
        var txt_value = jQuery(this).val();
        if(txt_value==""){
            jQuery(this).val(this.defaultValue); 
        };  
    }); 

	
	//(5)重命名下的键盘回车提交事件
	jQuery(".material_list .text_ipt").keyup(function(event){
        if(event.keyCode == 13){
			jQuery(this).parents(".m_item").find(".text_name").show();
			jQuery(this).parents(".m_item").find(".text_name").html( jQuery(this).val() );
			jQuery(this).hide();
        }
    });
	
	
	//(4)计算主体高度及折叠按钮居中
	var oWindowH = jQuery(window).height();
	var IESpace = 0;//为了解决ie8大屏出滚动条问题，html和body差4PX
	if( jQuery(document).height() > jQuery(window).height() ){
		IESpace	= 4;
	}else{
		IESpace	=0;
	}
	jQuery('.material_main').css({ 
		'min-height' : oWindowH - 60 -IESpace,
		    'height' : jQuery(document).height() - 60 -IESpace
	});
	jQuery(".material_nodata").css({
		"height" : jQuery(".material_main").outerHeight()-45-40-53
	});
	
	
	jQuery(window).resize(function(e) {		
		
		//(4)计算主体高度及折叠按钮居中
		var oWindowH = jQuery(window).height();
		var IESpace = 0; //为了解决ie8大屏出滚动条问题，html和body差4PX
		if( jQuery(document).height() > jQuery(window).height() ){
			IESpace	= 4;
		}else{
			IESpace	=0;
		}
		jQuery('.material_main').css({ 
			'min-height' : oWindowH - 60 -IESpace,
				'height' : jQuery(document).height() - 60 -IESpace
		});
		jQuery(".material_nodata").css({
			"height" : jQuery(".material_main").outerHeight()-45-40-53
		});
		
    });

});

	
	//]]>	
	
	

	

// JavaScript Document

jQuery(function(){	
	//(3)库存模板下的左侧二级菜单
	var menuOnOff = true;
	var oWindowW = jQuery(window).width();
	var oWindowH = jQuery(window).height();
	if( oWindowW < 1280 ){
		jQuery('.inbentory_level').hide();
		menuOnOff = false;
		
	}else{
		jQuery('.inbentory_level').show();
		menuOnOff = true;	
	}
	jQuery('.collapse_btn').click(function(){
		if( menuOnOff == true ){
			jQuery('.inbentory_level').hide();
			menuOnOff = false;	
		}else{
			jQuery('.inbentory_level').show();
			menuOnOff = true;		
		}	
	});
	
	
	
	
	//(4)计算主体高度及折叠按钮居中
	var IESpace = 0;//为了解决ie8大屏出滚动条问题，html和body差4PX
	if( jQuery("html").height() > jQuery(window).height() ){
		IESpace	= 4;
	}else{
		IESpace	=0
	}
	jQuery('.inbentory_level').css({ 
		'min-height' : oWindowH - 60 -IESpace,
		    'height' : jQuery(document).height() - 60  -IESpace
	});
	jQuery('.inbentory_file_main').css({ 
		'min-height' : oWindowH - 60 -IESpace,
		    'height' : jQuery(document).height() - 60 -IESpace
	});
	if( oWindowH < 400 ){
		jQuery('.collapse_btn').css( 'top' , 220 );
	}else{
		jQuery('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + jQuery(window).scrollTop() );	
	}
	
	
	//(5)左侧二级导航的选择状态控制
	//导航不带二级的
	jQuery('.inben_first1').click(function(){
		jQuery(this).addClass('in_cur').siblings('.inben_first').removeClass('in_cur');	
		jQuery('.inben_second .sed_item').removeClass('sed_cur');
	});
	//导航带二级的
	jQuery('.inben_first2').click(function(){
		if( jQuery(this).hasClass('in_cur') ){
			//如果箭头是向上的，即下面是收缩的
			jQuery(this).removeClass('in_cur');	
			jQuery(this).next('.inben_second').slideDown(300);	
		}else{
			//如果箭头是向下的，即下面是展开的的
			jQuery(this).addClass('in_cur');	
			jQuery(this).next('.inben_second').slideUp(300);
		}
	});
	jQuery('.inben_second .sed_item').click(function(){
		jQuery('.inben_first1').removeClass('in_cur');
		jQuery(this).addClass('sed_cur').siblings().removeClass('sed_cur');
		jQuery(this).parents('.inben_second').siblings().find('.sed_item').removeClass('sed_cur');
	});
	

	jQuery(window).resize(function(e) {
		//(3)库存模板下的左侧二级菜单
        var menuOnOff = true;
		var oWindowW = jQuery(window).width();
		var oWindowH = jQuery(window).height();
		if( oWindowW < 1280 ){
			menuOnOff = false;
			jQuery('.inbentory_level').hide();
			jQuery('.inbentory_content').addClass('hide_inben');
			
		}else{
			menuOnOff = true;
			jQuery('.inbentory_level').show();
			jQuery('.inbentory_content').removeClass('hide_inben');	
		}		
		jQuery('.collapse_btn').click(function(){
			if( menuOnOff == true ){
				jQuery('.inbentory_level').hide();
				jQuery('.inbentory_content').addClass('hide_inben');
				menuOnOff = false;	
			}else{
				jQuery('.inbentory_level').show();
				jQuery('.inbentory_content').removeClass('hide_inben');
				menuOnOff = true;		
			}	
		});
		
		
		//(4)计算主体高度及折叠按钮居中
		var IESpace = 0; //为了解决ie8大屏出滚动条问题，html和body差4PX
		if( jQuery("html").height() > jQuery(window).height() ){
			IESpace	= 4;
		}else{
			IESpace	=0
		}
		jQuery('.inbentory_level').css({ 
			'min-height' : oWindowH - 60 -IESpace,
				'height' : jQuery(document).height() - 60 -IESpace
		});
		jQuery('.inbentory_file_main').css({ 
			'min-height' : oWindowH - 60 -IESpace,
				'height' : jQuery(document).height() - 60 -IESpace
		});
		jQuery('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + jQuery(window).scrollTop() );
		if( oWindowH < 400 ){
			jQuery('.collapse_btn').css( 'top' , 220 );
		}else{
			jQuery('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + jQuery(window).scrollTop() );	
		}
		
    });
	
	jQuery(window).scroll(function(){
		var oWindowH = jQuery(window).height();
		if( oWindowH < 400 ){
			jQuery('.collapse_btn').css( 'top' , 220 );
		}else{
			jQuery('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + jQuery(window).scrollTop() );	
		}
	});
});
// JavaScript Document
var $ = jQuery.noConflict();
jquery(function(){
	//(3)库存模板下的左侧二级菜单
	var menuOnOff = true;
	var oWindowW = jquery(window).width();
	var oWindowH = jquery(window).height();
	if( oWindowW < 1280 ){
		jquery('.inbentory_level').hide();
		jquery('.inbentory_content').addClass('hide_inben');
		menuOnOff = false;
		
	}else{
		jquery('.inbentory_level').show();
		jquery('.inbentory_content').removeClass('hide_inben');
		menuOnOff = true;	
	}
	jquery('.collapse_btn').click(function(){
		if( menuOnOff == true ){
			jquery('.inbentory_level').hide();
			jquery('.inbentory_content').addClass('hide_inben');	
			jquery('.inbentory_content').outerWidth( jquery('body').width()-77-0 );
			menuOnOff = false;
		}else{
			jquery('.inbentory_level').show();
			jquery('.inbentory_content').removeClass('hide_inben');	
			jquery('.inbentory_content').outerWidth( jquery('body').width()-77-jquery('.inbentory_level_wap').width() );
			menuOnOff = true;		
		}	
	});

	//(4)计算主体高度及折叠按钮居中
	var IESpace = 0;//为了解决ie8大屏出滚动条问题，html和body差4PX
	if( jquery("html").height() > jquery(window).height() ){
		IESpace	= 4;
	}else{
		IESpace	=0
	}
	jquery('.inbentory_level').css({ 
		'min-height' : oWindowH - 60 -IESpace,
		    //'height' : jquery(document).height() - 60  -IESpace
			 'height' : jquery('.inbentory_content').outerHeight()  -IESpace
	});
	//jquery('.inbentory_level').niceScroll({cursorcolor:"#919191",cursorwidth:10,cursoropacitymax:0.7,touchbehavior:false,autohidemode:false}); 
	jquery('.inbentory_file_main').css({ 
		'min-height' : oWindowH - 60 -IESpace,
		    //'height' : jquery(document).height() - 60 -IESpace
			 'height' : jquery('.inbentory_content').outerHeight() -IESpace
	});
	if( oWindowH < 400 ){
		jquery('.collapse_btn').css( 'top' , 220 );
	}else{
		jquery('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + jquery(window).scrollTop() );	
	}
	//oWindowH < 500 ? jquery(".pano_dialog").addClass("pano_top") : 	jquery(".pano_dialog").removeClass("pano_top")
	
	
	//(5)左侧二级导航的选择状态控制
	//导航不带二级的
	jquery('.inben_first1').click(function(){
		jquery(this).addClass('in_cur').siblings('.inben_first').removeClass('in_cur');	
		jquery('.inben_second .sed_item').removeClass('sed_cur');
	});
	//导航带二级的
	jquery('.inben_first2').click(function(){
		if( jquery(this).hasClass('in_cur') ){
			//如果箭头是向上的，即下面是收缩的
			jquery(this).removeClass('in_cur');	
			jquery(this).next('.inben_second').slideDown(300);	
		}else{
			//如果箭头是向下的，即下面是展开的的
			jquery(this).addClass('in_cur');	
			jquery(this).next('.inben_second').slideUp(300);
		}
	});
	jquery('.inben_second .sed_item').click(function(){
		jquery('.inben_first1').removeClass('in_cur');
		jquery(this).addClass('sed_cur').siblings().removeClass('sed_cur');
		jquery(this).parents('.inben_second').siblings().find('.sed_item').removeClass('sed_cur');
	});
	
	jquery('body').click(function(){
		jquery('.mater_name_bd').hide();	
		jquery('.mater_name_bd2').hide();	
		jquery('.mater_name_list2').each(function(){
			jquery(this).empty();
		});
	});
	
	jquery(window).resize(function(e) {
		//(3)库存模板下的左侧二级菜单
        var menuOnOff = true;
		var oWindowW = jquery(window).width();
		var oWindowH = jquery(window).height();
		if( oWindowW < 1280 ){
			jquery('.inbentory_level').hide();
			jquery('.inbentory_content').addClass('hide_inben');
			jquery('.inbentory_content').outerWidth( jquery('body').width()-77-0 );
			menuOnOff = false;
			
		}else{
			jquery('.inbentory_level').show();
			jquery('.inbentory_content').removeClass('hide_inben');
			jquery('.inbentory_content').outerWidth( jquery('body').width()-77-jquery('.inbentory_level_wap').width() );
			menuOnOff = true;	
		}
		jquery('.collapse_btn').click(function(){
			if( menuOnOff == true ){
				jquery('.inbentory_level').hide();
				jquery('.inbentory_content').addClass('hide_inben');	
				jquery('.inbentory_content').outerWidth( jquery('body').width()-77-0 );
				menuOnOff = false;
			}else{
				jquery('.inbentory_level').show();
				jquery('.inbentory_content').removeClass('hide_inben');	
				jquery('.inbentory_content').outerWidth( jquery('body').width()-77-jquery('.inbentory_level_wap').width() );
				menuOnOff = true;		
			}	
		});
		
		
		//(4)计算主体高度及折叠按钮居中
		var IESpace = 0;//为了解决ie8大屏出滚动条问题，html和body差4PX
		if( jquery("html").height() > jquery(window).height() ){
			IESpace	= 4;
		}else{
			IESpace	=0
		}
		jquery('.inbentory_level').css({ 
			'min-height' : oWindowH - 60 -IESpace,
				//'height' : jquery(document).height() - 60  -IESpace
				 'height' : jquery('.inbentory_content').outerHeight()  -IESpace
		});
		//jquery('.inbentory_level').niceScroll({cursorcolor:"#919191",cursorwidth:10,cursoropacitymax:0.7,touchbehavior:false,autohidemode:false}); 
		jquery('.inbentory_file_main').css({ 
			'min-height' : oWindowH - 60 -IESpace,
				//'height' : jquery(document).height() - 60 -IESpace
				 'height' : jquery('.inbentory_content').outerHeight() -IESpace
		});
		if( oWindowH < 400 ){
			jquery('.collapse_btn').css( 'top' , 220 );
		}else{
			jquery('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + jquery(window).scrollTop() );	
		}
		//oWindowH < 500 ? jquery(".pano_dialog").addClass("pano_top") : 	jquery(".pano_dialog").removeClass("pano_top")
		
    });
	
	jquery(window).scroll(function(){
		var oWindowH = jquery(window).height();
		if( oWindowH < 400 ){
			jquery('.collapse_btn').css( 'top' , 220 );
		}else{
			jquery('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + jquery(window).scrollTop() );	
		}
	});
	
});


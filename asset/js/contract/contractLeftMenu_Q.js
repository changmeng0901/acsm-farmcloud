// JavaScript Document
_Q(function(){
	//(3)库存模板下的左侧二级菜单
	var menuOnOff = true;
	var oWindowW = _Q(window).width();
	var oWindowH = _Q(window).height();
	if( oWindowW < 1280 ){
		_Q('.inbentory_level').hide();
		_Q('.inbentory_content').addClass('hide_inben');
		menuOnOff = false;
		
	}else{
		_Q('.inbentory_level').show();
		_Q('.inbentory_content').removeClass('hide_inben');
		menuOnOff = true;	
	}
	_Q('.collapse_btn').click(function(){
		if( menuOnOff == true ){
			_Q('.inbentory_level').hide();
			_Q('.inbentory_content').addClass('hide_inben');	
			//_Q('.inbentory_content').outerWidth( _Q('body').width()-90-0 );
			menuOnOff = false;
		}else{
			_Q('.inbentory_level').show();
			_Q('.inbentory_content').removeClass('hide_inben');	
			//_Q('.inbentory_content').outerWidth( _Q('body').width()-90-_Q('.inbentory_level_wap').width() );
			menuOnOff = true;		
		}	
	});

	//(4)计算主体高度及折叠按钮居中
	var IESpace = 0;//为了解决ie8大屏出滚动条问题，html和body差4PX
	if( _Q("html").height() > _Q(window).height() ){
		IESpace	= 4;
	}else{
		IESpace	=0
	}
	_Q('.inbentory_level').css({ 
		'min-height' : oWindowH - 60 -IESpace,
		    //'height' : _Q(document).height() - 60  -IESpace
			 'height' : _Q('.inbentory_content').outerHeight()  -IESpace
	});
	//_Q('.inbentory_level').niceScroll({cursorcolor:"#919191",cursorwidth:10,cursoropacitymax:0.7,touchbehavior:false,autohidemode:false}); 
	_Q('.inbentory_file_main').css({ 
		'min-height' : oWindowH - 60 -IESpace,
		    //'height' : _Q(document).height() - 60 -IESpace
			 'height' : _Q('.inbentory_content').outerHeight() -IESpace
	});
	if( oWindowH < 400 ){
		_Q('.collapse_btn').css( 'top' , 220 );
	}else{
		_Q('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + _Q(window).scrollTop() );	
	}
	//oWindowH < 500 ? _Q(".pano_dialog").addClass("pano_top") : 	_Q(".pano_dialog").removeClass("pano_top")
	
	
	//(5)左侧二级导航的选择状态控制
	//导航不带二级的
	_Q('.inben_first1').click(function(){
		_Q(this).addClass('in_cur').siblings('.inben_first').removeClass('in_cur');	
		_Q('.inben_second .sed_item').removeClass('sed_cur');
	});
	//导航带二级的
	_Q('.inben_first2').click(function(){
		if( _Q(this).hasClass('in_cur') ){
			//如果箭头是向上的，即下面是收缩的
			_Q(this).removeClass('in_cur');	
			_Q(this).next('.inben_second').slideDown(300);	
		}else{
			//如果箭头是向下的，即下面是展开的的
			_Q(this).addClass('in_cur');	
			_Q(this).next('.inben_second').slideUp(300);
		}
	});
	_Q('.inben_second .sed_item').click(function(){
		_Q('.inben_first1').removeClass('in_cur');
		_Q(this).addClass('sed_cur').siblings().removeClass('sed_cur');
		_Q(this).parents('.inben_second').siblings().find('.sed_item').removeClass('sed_cur');
	});
	
	_Q('body').click(function(){
		_Q('.mater_name_bd').hide();	
		_Q('.mater_name_bd2').hide();	
		_Q('.mater_name_list2').each(function(){
			_Q(this).empty();
		});
	});
	
	_Q(window).resize(function(e) {
		//(3)库存模板下的左侧二级菜单
        var menuOnOff = true;
		var oWindowW = _Q(window).width();
		var oWindowH = _Q(window).height();
		if( oWindowW < 1280 ){
			_Q('.inbentory_level').hide();
			//_Q('.inbentory_content').addClass('hide_inben');
			//_Q('.inbentory_content').outerWidth( _Q('body').width()-90-0 );
			menuOnOff = false;
			
		}else{
			_Q('.inbentory_level').show();
			//_Q('.inbentory_content').removeClass('hide_inben');
			//_Q('.inbentory_content').outerWidth( _Q('body').width()-90-_Q('.inbentory_level_wap').width() );
			menuOnOff = true;	
		}
		_Q('.collapse_btn').click(function(){
			if( menuOnOff == true ){
				_Q('.inbentory_level').hide();
				//_Q('.inbentory_content').addClass('hide_inben');	
				//_Q('.inbentory_content').outerWidth( _Q('body').width()-90-0 );
				menuOnOff = false;
			}else{
				_Q('.inbentory_level').show();
				//_Q('.inbentory_content').removeClass('hide_inben');	
				//_Q('.inbentory_content').outerWidth( _Q('body').width()-90-_Q('.inbentory_level_wap').width() );
				menuOnOff = true;		
			}	
		});
		
		
		//(4)计算主体高度及折叠按钮居中
		var IESpace = 0;//为了解决ie8大屏出滚动条问题，html和body差4PX
		if( _Q("html").height() > _Q(window).height() ){
			IESpace	= 4;
		}else{
			IESpace	=0
		}
		_Q('.inbentory_level').css({ 
			'min-height' : oWindowH - 60 -IESpace,
				//'height' : _Q(document).height() - 60  -IESpace
				 'height' : _Q('.inbentory_content').outerHeight()  -IESpace
		});
		//_Q('.inbentory_level').niceScroll({cursorcolor:"#919191",cursorwidth:10,cursoropacitymax:0.7,touchbehavior:false,autohidemode:false}); 
		_Q('.inbentory_file_main').css({ 
			'min-height' : oWindowH - 60 -IESpace,
				//'height' : _Q(document).height() - 60 -IESpace
				 'height' : _Q('.inbentory_content').outerHeight() -IESpace
		});
		if( oWindowH < 400 ){
			_Q('.collapse_btn').css( 'top' , 220 );
		}else{
			_Q('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + _Q(window).scrollTop() );	
		}
		//oWindowH < 500 ? _Q(".pano_dialog").addClass("pano_top") : 	_Q(".pano_dialog").removeClass("pano_top")
		
    });
	
	_Q(window).scroll(function(){
		var oWindowH = _Q(window).height();
		if( oWindowH < 400 ){
			_Q('.collapse_btn').css( 'top' , 220 );
		}else{
			_Q('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + _Q(window).scrollTop() );	
		}
	});
	
});


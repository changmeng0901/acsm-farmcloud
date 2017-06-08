// JavaScript Document
//<![CDATA[	
//jQuery(function(){
	// (1)获取焦点和失去焦点状态
    $('input[type=text],textarea').focus(function(){
        var txt_value = $(this).val();
        if(txt_value==this.defaultValue){
            $(this).val("");    
        };  
    });
    $('input[type=text],textarea').blur(function(){
        var txt_value = $(this).val();
        if(txt_value==""){
            $(this).val(this.defaultValue); 
        };  
    }); 

    //(2)下拉菜单
    $('.selectpicker').selectpicker({
    	multiple: false,
		//header: "选择一项",
		noneSelectedText: "请选择",
		selectedList: 1
    });
	
	/*//(6)时间插件
	$(".form_datetime").datetimepicker({
		format: "yyyy-mm-dd",   控制显示格式，默认为空，显示小时分钟 
	    autoclose: true,
	    weekStart: 1,
	   //startDate: "2014-08-14",
	    language:  'zh-CN',
	    startView: 3,
	    minView: 2,
	    maxView: 4,     
	    pickerPosition: "top-left"
	});*/

	
	//(3)库存模板下的左侧二级菜单
	var menuOnOff = true;
	var oWindowW = $(window).width();
	var oWindowH = $(window).height();
	if( oWindowW < 1280 ){
		$('.inbentory_level').hide();
		$('.inbentory_content').addClass('hide_inben');
		menuOnOff = false;
		
	}else{
		$('.inbentory_level').show();
		$('.inbentory_content').removeClass('hide_inben');
		menuOnOff = true;	
	}
	$('.collapse_btn').click(function(){
		if( menuOnOff == true ){
			$('.inbentory_level').hide();
			$('.inbentory_content').addClass('hide_inben');
			menuOnOff = false;	
		}else{
			$('.inbentory_level').show();
			$('.inbentory_content').removeClass('hide_inben');
			menuOnOff = true;		
		}	
	});
	
	
	//(4)计算主体高度及折叠按钮居中
	var IESpace = 0;//为了解决ie8大屏出滚动条问题，html和body差4PX
	if( $("html").height() > $(window).height() ){
		IESpace	= 4;
	}else{
		IESpace	=0
	}
	$('.inbentory_level').css({ 
		'min-height' : oWindowH - 60 -IESpace,
		    'height' : $(document).height() - 60  -IESpace
	});
	$('.inbentory_file_main').css({ 
		'min-height' : oWindowH - 60 -IESpace,
		    'height' : $(document).height() - 60 -IESpace
	});
	if( oWindowH < 400 ){
		$('.collapse_btn').css( 'top' , 220 );
	}else{
		$('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + $(window).scrollTop() );	
	}
	
	
	//(5)左侧二级导航的选择状态控制
	//导航不带二级的
	$('.inben_first1').click(function(){
		$(this).addClass('in_cur').siblings('.inben_first').removeClass('in_cur');	
		$('.inben_second .sed_item').removeClass('sed_cur');
	});
	//导航带二级的
	$('.inben_first2').click(function(){
		if( $(this).hasClass('in_cur') ){
			//如果箭头是向上的，即下面是收缩的
			$(this).removeClass('in_cur');	
			$(this).next('.inben_second').slideDown(300);	
		}else{
			//如果箭头是向下的，即下面是展开的的
			$(this).addClass('in_cur');	
			$(this).next('.inben_second').slideUp(300);
		}
	});
	$('.inben_second .sed_item').click(function(){
		$('.inben_first1').removeClass('in_cur');
		$(this).addClass('sed_cur').siblings().removeClass('sed_cur');
		$(this).parents('.inben_second').siblings().find('.sed_item').removeClass('sed_cur');
	});
	
	//(7)出库流水入库页面的--原料出库展开和收缩状态
	$('#ylck_btn').click(function(){
		if(	$(this).hasClass('ylck_hide') ){ 
			$(this).removeClass('ylck_hide') ;
			$('#ylck_content').slideDown();
		}else{ 
			$(this).addClass('ylck_hide');
			$('#ylck_content').slideUp();
		}
	});
	

	// (8)复选框功能
	$('input[class="iCheck"]').iCheck({
		checkboxClass: 'icheckbox_minimal-blue'
	});
	// (9)单选按钮功能
	$('input[class="iRadio"]').iCheck({
		radioClass: 'iradio_minimal-blue'
	});
	
	$('#buy_iradio input').on('ifClicked', function(){ //全选
		$(this).attr("checked", true);
		$('#mall_iradio .iradio_minimal-blue').removeClass("checked");
		$('#buy_iradio_con').attr('onoff','true');
		$('#mall_iradio_con').attr('onoff','false');
		$('#buy_iradio_con').show();
		$('#mall_iradio_con').hide();
		
	});
	$('#mall_iradio input').on('ifClicked', function(){ //全选
		$(this).attr("checked", true);
		$('#buy_iradio .iradio_minimal-blue').removeClass("checked");
		$('#buy_iradio_con').attr('onoff','false');
		$('#mall_iradio_con').attr('onoff','true');
		$('#buy_iradio_con').hide();
		$('#mall_iradio_con').show();
	});
	
	// (11)实时预览和案例参考切换事件
	$('.LivePreview_head .l_item').each(function(index,elem){
		$(elem).click(function(){
			$(this).addClass('l_cur').siblings().removeClass('l_cur');
			$('.LivePreview_box').eq(index).show().siblings('.LivePreview_box').hide();
		});
	});

	
	// (14)大小屏幕样式的切换方法
	function changeStyleFn(){
		var window_width = $(window).width();
		if( window_width<1200 ){
			$('.inbentory_content').addClass('small_css');
		}else{
			$('.inbentory_content').removeClass('small_css');
		}
	}
	changeStyleFn();
	
	// (15)产品介绍内容下，作物列表鼠标滑过状态及删除
	$('.product_left .p_item').mouseover(function(){
		$(this).addClass('dq_item');
	});
	$('.product_left .p_item').mouseout(function(){
		$(this).removeClass('dq_item');
	});
	/*function DeleteProduct(obj){
		$(obj).parents('.p_item').remove();
	}*/
	
	// (18)点击修改地图，变成完成修改，鼠标离开变回修改地图
	$('#btn_edit').click(function(){
		$('#btn_edit .txt_change').html('完成修改');
		$('#btn_edit img').attr('src','../asset/images/digitalCard/icon_modifymap00.png');
	});
	$('.card_code_body dt').mouseout(function(){
		$('#btn_edit .txt_change').html('修改地图');
		$('#btn_edit img').attr('src','../asset/images/digitalCard/icon_modifymap0.png');
	});
	
	// (19)添加农场照片、添加照片功能
	function AddFarmPhotos(obj,oBox){ //添加农场照片，弹出添加农场照片盒子
		var _windowh = $(window).height();
		var _scrollh = $(window).scrollTop();
		$('html').css('overflow-y','hidden');
		$('#farm_model').css('margin-top',(_windowh-566)/2+_scrollh);
		$('.mark_b50').show();
		$(oBox).show();
	}
	function DeleteFarmPhotos(obj,oBox){//删除农场照片盒子
		$('html').css('overflow-y','auto');
		$('.mark_b50').hide();
		$('#farm_model').hide();
		$(oBox).hide();
	}
	function AddPhotos(obj,oBox){ //添加照片，弹出添加照片盒子
		$('.mark_w50').show();
		$(oBox).show();
		$('#farm_model .model_body').css('overflow','hidden');
		var aTop = $(obj).parents('.model_body').scrollTop();
		$(oBox).css('margin-top',-(185-aTop));
		$('.mark_w50').css('top',aTop);
		
	}
	function DeletePhotos(obj,oBox){ //删除照片盒子
		$('.mark_w50').hide();
		$(oBox).hide();
		$('#farm_model .model_body').css('overflow','auto');
		$(oBox).css('margin-top',0);
		$('.mark_w50').css('top',0);
	}
	
	

	$(window).resize(function(e) {
		//(3)库存模板下的左侧二级菜单
        var menuOnOff = true;
		var oWindowW = $(window).width();
		var oWindowH = $(window).height();
		if( oWindowW < 1280 ){
			menuOnOff = false;
			$('.inbentory_level').hide();
			$('.inbentory_content').addClass('hide_inben');
			
		}else{
			menuOnOff = true;
			$('.inbentory_level').show();
			$('.inbentory_content').removeClass('hide_inben');	
		}		
		$('.collapse_btn').click(function(){
			if( menuOnOff == true ){
				$('.inbentory_level').hide();
				$('.inbentory_content').addClass('hide_inben');
				menuOnOff = false;	
			}else{
				$('.inbentory_level').show();
				$('.inbentory_content').removeClass('hide_inben');
				menuOnOff = true;		
			}	
		});
		
		var _windowh = $(window).height();
		var _scrollh = $(window).scrollTop();
		$('#farm_model').css('margin-top',(_windowh-566)/2+_scrollh);
		
		
		//(4)计算主体高度及折叠按钮居中
		var IESpace = 0; //为了解决ie8大屏出滚动条问题，html和body差4PX
		if( $("html").height() > $(window).height() ){
			IESpace	= 4;
		}else{
			IESpace	= 0;
		}
		$('.inbentory_level').css({ 
			'min-height' : oWindowH - 60 -IESpace,
				'height' : $(document).height() - 60 -IESpace
		});
		$('.inbentory_file_main').css({ 
			'min-height' : oWindowH - 60 -IESpace,
				'height' : $(document).height() - 60 -IESpace
		});
		$('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + $(window).scrollTop() );
		if( oWindowH < 400 ){
			$('.collapse_btn').css( 'top' , 220 );
		}else{
			$('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + $(window).scrollTop() );	
		}
		
		
		
		
		//当窗口改变时，执行大小屏幕样式的切换
		changeStyleFn();
		
    });
	
	$(window).scroll(function(){
		var oWindowH = $(window).height();
		if( oWindowH < 400 ){
			$('.collapse_btn').css( 'top' , 220 );
		}else{
			$('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + $(window).scrollTop() );	
		}
	});
//});

//(13)地图等更多设置及收起功能
function SlideDownUpFn(obj,_list){
	if($(obj).attr('onoff')=='down'){
		$(obj).addClass('moreup');
		$(obj).attr('onoff','up');
		$(obj).find('span').html('收起');
		//$(_list).removeClass('h_hidden');
		$(_list).show();
	}else{
		$(obj).removeClass('moreup');
		$(obj).attr('onoff','down');
		$(obj).find('span').html('更多设置');
		//$(_list).addClass('h_hidden');
		$(_list).hide();
	}
	jQuery('.selectpicker').selectpicker();
}

//]]>
	

	

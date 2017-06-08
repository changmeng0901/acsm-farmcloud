// JavaScript Document

$(function(){
	
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
    $('.selectpicker').selectpicker(); 
	
	//(6)时间插件
	$(".form_datetime").datetimepicker({
		format: "yyyy mm dd",  
		autoclose: true,
		weekStart: 1,
		language:  'zh-CN',
		startView: 3,
		minView: 2,
		maxView: 2,		
		pickerPosition: "bottom-left"
	});

	
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
	

	// (8)模态框--物料列表全选功能
	$('input[class="iCheck"]').iCheck({
		checkboxClass: 'icheckbox_minimal-blue'
	});
	$('.material_list input[aa]').on('ifClicked', function(){ //全选
		if (this.checked) {
			$(this).attr("aa","unchecked");
			$(this).parents('tr').siblings().find('input[bb]').iCheck('uncheck');
			$(this).parents('tr').siblings().find('input[bb]').attr("bb","unchecked");
		} else {
			$(this).attr("aa","checked");
			$(this).parents('tr').siblings().find('input[bb]').iCheck('check');
			$(this).parents('tr').siblings().find('input[bb]').attr("bb","checked");
		}
	});
	$('.material_list input[bb]').on('ifClicked', function(){ //取消全选
		if (this.checked) {
			$(this).attr("bb","unchecked");
			$(this).parents('tr').siblings().find('input[aa]').iCheck('uncheck');
		} else {
			$(this).attr("bb","checked");
			var len = $(this).parents('tr').siblings().find('input[bb=checked]').length;
			if(len == $('.material_list input[bb]').length-1){
				$(this).parents('tr').siblings().find('input[aa]').iCheck('check');	
			}
		}
	});
	
	
	//(10)物料名称点击时，出现下拉内容，并联动搜索
	$('.mater_name_hd').click(function(ev){
		var e = ev || event;
		if (e && e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		$(this).parents().find('.mater_name_bd').show();	
	});
	$('.mater_name_hd .add_mater').click(function(ev){
		var e = ev || event;
		if (e && e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
		$('#AddMaterial').modal('show')
	});
	$('.mater_name_bd li').click(function(ev){
		var e = ev || event;
		if (e && e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}	
		$(this).parents().find('.mater_name_bd').show();
	});
	$('body').click(function(){
		$('.mater_name_bd').hide();	
	});
	
	
	
	
	
	
	
	
	
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
		
		
		//(4)计算主体高度及折叠按钮居中
		var IESpace = 0; //为了解决ie8大屏出滚动条问题，html和body差4PX
		if( $("html").height() > $(window).height() ){
			IESpace	= 4;
		}else{
			IESpace	=0
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
		
    });
	
	$(window).scroll(function(){
		var oWindowH = $(window).height();
		if( oWindowH < 400 ){
			$('.collapse_btn').css( 'top' , 220 );
		}else{
			$('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + $(window).scrollTop() );	
		}
	});
	
	
	
});


	//(6)扫描条码按钮状态
	function scancode( obj , scanNo ){
		if( $(obj).hasClass(scanNo) ){
			$( obj ).removeClass( scanNo );		
		}else{	
			$( obj ).addClass( scanNo );
		}
	}
	
	//(9)入库单添加物料模态框
	function MaterialModalShow( obj , oParent ){
		//点击添加新物料按钮，物料框显示
		$( oParent ).show()
	}
	function MaterialModalHide( obj , oParent ){
		//点击添加新物料按钮，物料框隐藏
		$( oParent ).hide();
	}
	function delectMaterItem( obj , oParent){
		//新增物料弹框中删除
		$( obj ).parents( oParent ).remove();	
	}
	

	

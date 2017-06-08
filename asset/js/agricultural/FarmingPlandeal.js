jQuery(document).ready(function(){
	//搜索输入框获取焦点及失去焦点状态
	jQuery('input.form-control').focus(function(){
		var _val = this.defaultValue;
		if( jQuery(this).val() == _val ){
			jQuery(this).val('');
			jQuery(this).css('color','#323232');
		}else{
			jQuery(this).css('color','#999');
		}
	});
	jQuery('input.form-control').blur(function(){
		var _val = this.defaultValue;
		if( jQuery(this).val() == '' ){
			jQuery(this).val( _val );
			jQuery(this).css('color','#999');
		}else{
			jQuery(this).css('color','#323232');
		}
	});
	//文本区域获取焦点及失去焦点
	jQuery('textarea').focus(function(){
		var _val = this.defaultValue;
		if( jQuery(this).val() == _val ){
			jQuery(this).val('');
			jQuery(this).css('color','#323232');
		}else{
			jQuery(this).css('color','#999');
		}
	});
	jQuery('textarea').blur(function(){
		var _val = this.defaultValue;
		if( jQuery(this).val() == '' ){
			jQuery(this).val( _val );
			jQuery(this).css('color','#999');
		}else{
			jQuery(this).css('color','#323232');
		}
	});
	
	jQuery(".form_datetime").datetimepicker({
	    format: "yyyy-mm-dd",  
	    autoclose: true,
	    weekStart: 1,
	   //startDate: "2014-08-14",
	    language:  'zh-CN',
	    startView: 3,
	    minView: 2,
	    maxView: 4,     
	    pickerPosition: "bottom-left"
	});
	
	//工具提示
	jQuery("[data-toggle='tooltip']").tooltip();  
	
	//（种植标准、种植环境）下拉菜单
    jQuery('.selectpicker').selectpicker({
		dropupAuto:false,
	});
	
	//选择农事操作
	jQuery('#farmOperation').selectpicker({
		noneSelectedText : "请选择农事操作",
		selectedList: 0,
	});
	jquery("#farmOperationdiv .filter-option").each(
		function(){
			if(jquery(this).text() == "无可选择项目"){
				
				jquery(this).text('请选择农事操作');
			}
		}
	);
	
	//投入品添加表格中，点击删除事件
	jQuery(document).on('click','#inputsaddTable .delete-btn',function(){
		jQuery(this).parent().parent('tr').remove();
	})
	
	//是否重复
	jQuery('#repeatRedio').click(function(){
		if(jQuery(this).attr('onoff')=='true'){
			jQuery(this).removeClass('icheck');
			jQuery(this).attr('onoff','false');
			jQuery('#norepeatRedio').addClass('icheck');
			jQuery('#norepeatRedio').attr('onoff','true');
		}else{
			//如果是false，则说明当前是未选中的
			jQuery(this).addClass('icheck');
			jQuery(this).attr('onoff','true');
			jQuery('#norepeatRedio').removeClass('icheck');
			jQuery('#norepeatRedio').attr('onoff','false');
		}
	});
	jQuery('#norepeatRedio').click(function(){
		if(jQuery(this).attr('onoff')=='true'){
			jQuery(this).removeClass('icheck');
			jQuery(this).attr('onoff','false');
			jQuery('#repeatRedio').addClass('icheck');
			jQuery('#repeatRedio').attr('onoff','true');
		}else{
			//如果是false，则说明当前是未选中的
			jQuery(this).addClass('icheck');
			jQuery(this).attr('onoff','true');
			jQuery('#repeatRedio').removeClass('icheck');
			jQuery('#repeatRedio').attr('onoff','false');
		}
	});
	
});
	//iframe通用上传图片方法
	function updateFatherPic(_obj,_url){
		//jQuery('#'+_obj).html("<image src='"+_url+"' width='100px'/><input type='hidden' value='"+_url+"'/>");
		//jQuery('#'+_obj).attr('src',_url+"@32h_1e_1c.src");
		//jQuery('#'+_obj).attr('val',_url);
		//alert(_url)
		jQuery('#'+_obj+' .icon14').after('<p class="pic100"><img src="'+_url+'@100w_100h_1e_1c.src" /></p>')
	}

	//无可选择项目==》请选择
	function noSelectedTOall(){
		jquery(".filter-option").each(
				function(){
					if(jquery(this).text() == "无可选择项目"){
						
						jquery(this).text('请选择');
					}
				}
			);
	}


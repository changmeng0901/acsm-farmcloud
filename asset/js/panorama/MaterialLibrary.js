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
	
	//(3)时间插件
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
	
	//(5)重命名下的键盘回车提交事件
	$(".material_list .text_ipt").keyup(function(event){
        if(event.keyCode == 13){
			$(this).parents(".m_item").find(".text_name").show();
			$(this).parents(".m_item").find(".text_name").html( $(this).val() );
			$(this).hide();
        }
    });
	
	
	//(4)计算主体高度及折叠按钮居中
	var oWindowH = $(window).height();
	var IESpace = 0;//为了解决ie8大屏出滚动条问题，html和body差4PX
	if( $(document).height() > $(window).height() ){
		IESpace	= 4;
	}else{
		IESpace	=0
	}
	$('.panorama_level').css({ 
		'min-height' : oWindowH - 60 -IESpace,
		    'height' : $(document).height() - 60  -IESpace
	});
	$('.material_main').css({ 
		'min-height' : oWindowH - 60 -IESpace,
		    'height' : $(document).height() - 60 -IESpace
	});
	$(".material_nodata").css({
		"height" : $(".material_main").outerHeight()-45-40-53
	})
	
	
	//(5)左侧二级导航的选择状态控制
	$(".pano_second .sed_item").each(function(index, elem) {
        $(elem).click(function(){
			$(this).addClass("sed_cur").siblings().removeClass("sed_cur");	
		});
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
	
	
	
	
	
	
	
	
	
	
	
	$(window).resize(function(e) {		
		
		//(4)计算主体高度及折叠按钮居中
		var oWindowH = $(window).height();
		var IESpace = 0; //为了解决ie8大屏出滚动条问题，html和body差4PX
		if( $(document).height() > $(window).height() ){
			IESpace	= 4;
		}else{
			IESpace	=0
		}
		$('.panorama_level').css({ 
			'min-height' : oWindowH - 60 -IESpace,
				'height' : $(document).height() - 60 -IESpace
		});
		$('.material_main').css({ 
			'min-height' : oWindowH - 60 -IESpace,
				'height' : $(document).height() - 60 -IESpace
		});
		$(".material_nodata").css({
			"height" : $(".material_main").outerHeight()-45-40-53
		})
		
    });

	
	
	
});


	//(6)点击重命名按钮点击事件
	function oRename(obj,oTxt,oInput){
		$(obj).parents(".m_item").find(	oTxt ).hide();
		$(obj).parents(".m_item").find( oInput ).val("");
		$(obj).parents(".m_item").find( oInput ).show();
		$(obj).parents(".m_item").find( oInput ).focus();
	}
	//(7)删除事件
	function deleteItem(obj,oParent){
		var r=confirm("该全景图展示中，删除后将从分组中去掉，并且清空全部浏览量、点赞数、评论，并不能还原，确定删除？");   
		if(r==true){
			$( obj ).parents( oParent ).remove();
			return true;
		}else{
			return false;   
		}	
	}
	
	
	

	

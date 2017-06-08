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

    //(2)下拉菜单
    jQuery('.selectpicker').selectpicker(); 
	
	//(6)时间插件
	jQuery(".form_datetime").datetimepicker({
		format: "yyyy mm dd",  
		autoclose: true,
		weekStart: 1,
		language:  'zh-CN',
		startView: 3,
		minView: 2,
		maxView: 2,		
		pickerPosition: "bottom-left"
	});
	
	// (9)tooltip工具提示
	jQuery("[data-toggle='tooltip']").tooltip(); 

	
	//(3)四季田景下的左侧二级菜单
	var menuOnOff = true;
	var oWindowW = jQuery(window).width();
	var oWindowH = jQuery(window).height();
	if( oWindowW < 1280 ){
		jQuery('.panorama_level').hide();
		jQuery('.panorama_content').addClass('hide_pano');
		menuOnOff = false;
		
	}else{
		jQuery('.panorama_level').show();
		jQuery('.panorama_content').removeClass('hide_pano');
		menuOnOff = true;	
	}
	jQuery('.collapse_btn').click(function(){
		if( menuOnOff == true ){
			jQuery('.panorama_level').hide();
			jQuery('.panorama_content').addClass('hide_pano');
			menuOnOff = false;	
		}else{
			jQuery('.panorama_level').show();
			jQuery('.panorama_content').removeClass('hide_pano');
			menuOnOff = true;		
		}	
	});
	
	
	
	
	//(4)计算主体高度及折叠按钮居中
	var IESpace = 0;//为了解决ie8大屏出滚动条问题，html和body差4PX
	if( jQuery("html").height() > jQuery("body").height() ){
		IESpace	= 4;
	}else{
		IESpace	=0
	}
	jQuery('.panorama_level').css({ 
		'min-height' : oWindowH - 60 -IESpace,
		    'height' : jQuery(document).height() - 60  -IESpace
	});
	jQuery('.panorama_level').niceScroll({cursorcolor:"#919191",cursorwidth:10,cursoropacitymax:0.7,touchbehavior:false,autohidemode:false}); 
	jQuery('.panorama_main').css({ 
		'min-height' : oWindowH - 60 -IESpace,
		    'height' : jQuery(document).height() - 60 -IESpace
	});
	jQuery(".panorama_nodata").css({
		"height" : jQuery(".panorama_main").outerHeight()-45-64-20
	})
	if( oWindowH < 400 ){
		jQuery('.collapse_btn').css( 'top' , 220 );
	}else{
		jQuery('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + jQuery(window).scrollTop() );	
	}
	oWindowH < 500 ? jQuery(".pano_dialog").addClass("pano_top") : 	jQuery(".pano_dialog").removeClass("pano_top")

	
	
	//(5)左侧二级导航的选择状态控制
	jQuery(".pano_second .sed_item").each(function(index, elem) {
        jQuery(elem).click(function(){
			jQuery(this).addClass("sed_cur").siblings().removeClass("sed_cur");	
		});
    });
	

	// (8)模态框--物料列表全选功能
	jQuery('input[class="iCheck"]').iCheck({
		checkboxClass: 'icheckbox_minimal-blue'
	});
	jQuery('input[class="iRadio"]').iCheck({
		radioClass: 'iradio_minimal-blue'
	});
	// (8-1)素材库模态框
	jQuery('.material_dialog input[allname]').on('ifClicked', function(){ //从素材库添加全选
		if (this.checked) {
			jQuery(this).attr("allname","unchecked");
			jQuery(this).parents('.modal_body').find('input[itemname]').iCheck('uncheck');
			jQuery(this).parents('.modal_body').find('input[itemname]').attr("itemname","unchecked");
			jQuery(this).parents('.modal_body').find(".m_panopic").removeClass("m_bor");
		} else {
			jQuery(this).attr("allname","checked");
			jQuery(this).parents('.modal_body').find('input[itemname]').iCheck('check');
			jQuery(this).parents('.modal_body').find('input[itemname]').attr("itemname","checked");
			jQuery(this).parents('.modal_body').find(".m_panopic").addClass("m_bor");
		}
	});
	jQuery('.material_dialog input[itemname]').on('ifClicked', function(){ //从素材库添加取消全选
		if (this.checked) {
			jQuery(this).attr("itemname","unchecked");
			jQuery(this).parents('.modal_body').find('input[allname]').iCheck('uncheck');
			jQuery(this).parents(".dl_dt").find(".m_panopic").removeClass("m_bor");
		} else {
			jQuery(this).attr("itemname","checked");
			jQuery(this).parents(".dl_dt").find(".m_panopic").addClass("m_bor");
			var len = jQuery(this).parents('.modal_body').find('input[itemname=checked]').length;
			if(len == jQuery('.material_dialog input[itemname]').length){
				jQuery(this).parents('.modal_body').find('input[allname]').iCheck('check');	
			}
		}
	});
	// (8-2)评论管理模态框
	jQuery('.comment_dialog input[allaa]').on('ifClicked', function(){ //评论管理全选
		if (this.checked) {
			jQuery(this).attr("allaa","unchecked");
			jQuery(this).parents('.modal_body').find('input[itembb]').iCheck('uncheck');
			jQuery(this).parents('.modal_body').find('input[itembb]').attr("itembb","unchecked");
		} else {
			jQuery(this).attr("allaa","checked");
			jQuery(this).parents('.modal_body').find('input[itembb]').iCheck('check');
			jQuery(this).parents('.modal_body').find('input[itembb]').attr("itembb","checked");
		}
	});
	jQuery('.comment_dialog input[itembb]').on('ifClicked', function(){ //评论管理取消全选
		if (this.checked) {
			jQuery(this).attr("itembb","unchecked");
			jQuery(this).parents('.modal_body').find('input[allaa]').iCheck('uncheck');
		} else {
			jQuery(this).attr("itembb","checked");
			var len = jQuery(this).parents('.modal_body').find('input[itembb=checked]').length;
			if(len == jQuery('.comment_dialog input[itembb]').length){
				jQuery(this).parents('.modal_body').find('input[allaa]').iCheck('check');	
			}
		}
	});
	
	
	//(11)dragSelect,js需要在其他控件之上
	jQuery('#list_dragselect').orderingList({
		dragSelect: true
	});
	jQuery(".btn-first").text("置顶");
	jQuery(".btn-up").text("向上");
	jQuery(".btn-down").text("向下");
	jQuery(".btn-last").text("置底");    
	
	
	//(12)富文本编辑器
	KindEditor.ready(function(K){
 		editor1 = K.create('textarea[name="sceneArea"]', {
 			resizeType : 0,
			allowPreviewEmoticons : false,
			uploadJson : '../js/kindeditor/upload_json.jsp?directoryType=0&businessType=3&enterpriseId=',
			allowImageUpload : true,
			items : [ 
			 		'source', '|', 'undo', 'redo', '|', 'code', 'cut', 'copy', 'paste',
			 		'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
			 		'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
			 		'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
			 		'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
			 		'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
			 		'anchor', 'link', 'unlink',
			 	],
				width : "70%", //编辑器的宽度为70%，最后在样式表里重置的
 	 	});
		editor2 = K.create('textarea[name="companyArea"]', {
 			resizeType : 0,
			allowPreviewEmoticons : false,
			uploadJson : '../js/kindeditor/upload_json.jsp?directoryType=0&businessType=3&enterpriseId=',
			allowImageUpload : true,
			items : [ 
			 		'source', '|', 'undo', 'redo', '|', 'code', 'cut', 'copy', 'paste',
			 		'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
			 		'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
			 		'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
			 		'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
			 		'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
			 		'anchor', 'link', 'unlink',
			 	],
				width : "70%", //编辑器的宽度为70%，最后在样式表里重置的
 	 	});
		
	});
	
	
	
	
	
	
	
	
	jQuery(window).resize(function(e) {
		jQuery(document).scrollTop(0);
		//(3)四季田景下的左侧二级菜单
        var menuOnOff = true;
		var oWindowW = jQuery(window).width();
		var oWindowH = jQuery(window).height();
		if( oWindowW < 1280 ){
			menuOnOff = false;
			jQuery('.panorama_level').hide();
			jQuery('.panorama_content').addClass('hide_pano');
			
		}else{
			menuOnOff = true;
			jQuery('.panorama_level').show();
			jQuery('.panorama_content').removeClass('hide_pano');	
		}		
		jQuery('.collapse_btn').click(function(){
			if( menuOnOff == true ){
				jQuery('.panorama_level').hide();
				jQuery('.panorama_content').addClass('hide_pano');
				menuOnOff = false;	
			}else{
				jQuery('.panorama_level').show();
				jQuery('.panorama_content').removeClass('hide_pano');
				menuOnOff = true;		
			}	
		});
		
		
		//(4)计算主体高度及折叠按钮居中
		var IESpace = 0; //为了解决ie8大屏出滚动条问题，html和body差4PX
		if( jQuery("html").height() > jQuery("body").height() ){
			IESpace	= 4;
		}else{
			IESpace	=0
		}
		jQuery('.panorama_level').css({ 
			'min-height' : oWindowH - 60 -IESpace,
				'height' : jQuery(document).height() - 60 -IESpace
		});
		jQuery('.panorama_main').css({ 
			'min-height' : oWindowH - 60 -IESpace,
				'height' : jQuery(document).height() - 60 -IESpace
		});
		jQuery(".panorama_nodata").css({
			"height" : jQuery(".panorama_main").outerHeight()-45-64-20
		})
		jQuery('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + jQuery(window).scrollTop() );
		if( oWindowH < 400 ){
			jQuery('.collapse_btn').css( 'top' , 220 );
		}else{
			jQuery('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + jQuery(window).scrollTop() );	
		}
		oWindowH < 500 ? jQuery(".pano_dialog").addClass("pano_top") : 	jQuery(".pano_dialog").removeClass("pano_top")
		
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


	//(6-1)删除该分组
	function DeleteGroup (){
		var r=confirm("删除该分组将清空该分组下全景图的全部评论，浏览量、点赞数，确定删除？");   
		if(r==true){
			return true;
		}else{
			return false;   
		}	
	}
	//(6-2)通用的删除对应的每一项
	function DeleteCommon ( obj , oItems ){
		jQuery( obj ).parents( "." + oItems ).remove();
	}
	
	//(9)评论管理删除及批量删除
	function DeleteComment( obj , oParent ){
		jQuery( obj ).parents( oParent ).remove();	
	}
	function DeleteCommentAll( obj , oItems , oParent ){
		jQuery( obj ).parents(oParent).find("input[itembb=checked]").parents( oItems ).remove();	
	}
	
	
	//(10-1)音乐库和我的音乐下的"奇偶变化"
	jQuery("#music_library .library_list li").each(function(index, elem) {
		jQuery("#music_library .library_list li").eq(0).addClass("m_cur");
        if( jQuery(elem).index()%2 == 0 ){
			jQuery(elem).addClass("m_even");
		}
    });
	jQuery("#my_music .library_list li").each(function(index, elem) {
        if( jQuery(elem).index()%2 == 0 ){
			jQuery(elem).addClass("m_even");
		}
    });
	//(10-2)音乐库--控制选中音乐的状态
	function MusicStatue( obj , oClassName ){
		jQuery( obj ).addClass( oClassName ).siblings().removeClass( oClassName );
	}
	//(10-3)音乐库--控制音乐播放
	jQuery(".media_audio").each(function(index,elem) {
		jQuery( this )[0].pause();
	});
	function AutoPlay( obj , iClassName ){
		
		if( jQuery( obj ).hasClass('i_off') ){
			jQuery( obj ).removeClass('i_off');	
			jQuery( obj ).find('.media_audio')[0].pause();
		}else{
			jQuery( obj ).addClass('i_off');		
			jQuery(".media_audio").each(function(index,elem) {
				jQuery( this )[0].pause();
			});
			jQuery( obj ).find('.media_audio')[0].play();
			jQuery( obj ).parents('.m_item').siblings().find( iClassName ).removeClass('i_off');
		}
		
	}
	//(10-4)删除我的音乐中的每一项
	function DeleteMusic ( obj , oItems ){
		jQuery( obj ).parents( "." + oItems ).remove();
		jQuery("#my_music .library_list li").each(function(index, elem) {
			if( jQuery(elem).index()%2 == 0 ){
				jQuery(elem).addClass("m_even");
			}else{
				jQuery(elem).removeClass("m_even");	
			}
		});
	}
	//]]>	
	
	
	

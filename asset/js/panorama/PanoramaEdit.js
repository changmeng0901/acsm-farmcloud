// JavaScript Document
var entEditor;
var infoEditor;
function setCommentAllBut(){
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
}
jQuery(function(){
	if(coupon_id == null || coupon_id == "")
		jQuery("#krg_coupon_id").val(-1);
	else
		jQuery("#krg_coupon_id").val(coupon_id);
	jQuery('select').selectpicker({size:8,dropupAuto:false});
	jQuery('select').on('changed.bs.select', function (e) {
		  console.log(e);
		});
	jQuery('#krg_share_describe').val(jQuery('#krg_share_describe').val().replace(/<\/br\>/g,"\n"));
	
	// (1)获取焦点和失去焦点状态
    jQuery('input[type=text],textarea').not(".nojs").focus(function(){
        var txt_value = jQuery(this).val();
        if(txt_value==this.defaultValue){
            jQuery(this).val("");    
        };  
    });
    jQuery('input[type=text],textarea').not(".nojs").blur(function(){
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
	
	jQuery('#MusicModal').on('hidden.bs.modal', function () {
		stopAll();
	 	//show.bs.modal  在调用 show 方法后触发。
	 	//shown.bs.modal  	当模态框对用户可见时触发（将等待 CSS 过渡效果完成）。
	 	//hide.bs.modal  当调用 hide 实例方法时触发。
	 	//hidden.bs.modal   当模态框完全对用户隐藏时触发。
	})
	
	jQuery("#IntroductionModal").on('hidden.bs.modal',function(){
		KindEditor.remove('textarea[name="introduction"]');
	});
	
	jQuery("#CommentModal").on('hidden.bs.modal', function () {
		commentSearchStr = "";
		})
	//(3)四季田景下的左侧二级菜单
	var menuOnOff = true;
	var oWindowW = jQuery(window).width();
	var oWindowH = jQuery(window).height();
	if( oWindowW < 1280 ){
		jQuery('.panorama_level').hide();
		jQuery('.panorama_content').addClass('hide_pano');	
		jQuery('.panorama_content').outerWidth( jQuery('body').width()-77-0 );
		menuOnOff = false;
		
	}else{
		jQuery('.panorama_level').show();
		jQuery('.panorama_content').removeClass('hide_pano');	
			jQuery('.panorama_content').outerWidth( jQuery('body').width()-77-jQuery('.panorama_level_wap').width()-30 );
		menuOnOff = true;	
	}
	jQuery('.collapse_btn').click(function(){
		if( menuOnOff == true ){
			jQuery('.panorama_level').hide();
			jQuery('.panorama_content').addClass('hide_pano');	
			jQuery('.panorama_content').outerWidth( jQuery('body').width()-77-0 );
			menuOnOff = false;	
		}else{
			jQuery('.panorama_level').show();
			jQuery('.panorama_content').removeClass('hide_pano');	
			jQuery('.panorama_content').outerWidth( jQuery('body').width()-77-jQuery('.panorama_level_wap').width() );
			menuOnOff = true;		
		}	
	});
	
	setCommentAllBut();	
	
	
	//(4)计算主体高度及折叠按钮居中
	var IESpace = 0;//为了解决ie8大屏出滚动条问题，html和body差4PX
	if( jQuery("html").height() > jQuery("body").height() ){
		IESpace	= 4;
	}else{
		IESpace	=0
	}
	jQuery('.panorama_level').css({ 
		'min-height' : oWindowH - 60 -IESpace,
		    'height' : jQuery('.panorama_content').outerHeight()  -IESpace
	});
	jQuery('.panorama_level').niceScroll({cursorcolor:"#919191",cursorwidth:10,cursoropacitymax:0.7,touchbehavior:false,autohidemode:false}); 
	jQuery('.panorama_main').css({ 
		'min-height' : oWindowH - 60 -IESpace,
		    'height' : jQuery('.panorama_content').outerHeight() -IESpace
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
	
	jQuery('#update\\:krg_business_card_show').on('ifClicked', function(){ //企业名片
		if (this.checked) {
			jQuery("#setCardBtn").attr("class","setting_btn hide");
		} else {
			jQuery("#setCardBtn").attr("class","setting_btn ");
		}
	});	
	
	jQuery('#update\\:krg_place_show').on('ifClicked', function(){ //企业名片
		if (this.checked) {
			jQuery("#update\\:krg_asset_show").closest("li").attr("class","pano_item hide");
		} else {
			jQuery("#update\\:krg_asset_show").closest("li").attr("class","pano_item ");
		}
	});	

	// (8)模态框--物料列表全选功能
	jQuery('input[class="iCheck"]').iCheck({
		checkboxClass: 'icheckbox_minimal-blue'
	});
	jQuery('input[class="iRadio"]').iCheck({
		radioClass: 'iradio_minimal-blue'
	});
	// (8-1)素材库模态框
	jQuery('.material_dialog input[name="allname"]').on('ifClicked', function(){ //从素材库添加全选
		if (this.checked) {
			jQuery(this).parents('.modal_body').find('input[name="itemname"]').not(":disabled").iCheck('uncheck');
			jQuery(this).parents('.modal_body').find(".m_panopic").not("[disable=1]").removeClass("m_bor");
		} else {
			jQuery(this).parents('.modal_body').find('input[name="itemname"]').iCheck('check');
			jQuery(this).parents('.modal_body').find(".m_panopic").addClass("m_bor");
		}
	});
	jQuery('.material_dialog input[name="itemname"]').on('ifClicked', function(){ //从素材库添加取消全选
		var len = jQuery('.modal_body input[name="itemname"]:checked').length;
		if (this.checked) {
			len -= 1;
			jQuery(this).parents('.modal_body').find('input[name="allname"]').iCheck('uncheck');
			jQuery(this).parents(".dl_dt").find(".m_panopic").removeClass("m_bor");
		} else {
			len += 1;
			jQuery(this).parents(".dl_dt").find(".m_panopic").addClass("m_bor");
			if(len == jQuery('.material_dialog input[name="itemname"]').length){
				jQuery(this).parents('.modal_body').find('input[name="allname"]').iCheck('check');	
			}
		}
		jQuery("#total_krpano").html(len);
	});
	// (8-2)评论管理模态框
	
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

	
	
	jQuery(window).resize(function(e) {
		jQuery(document).scrollTop(0);
		//(3)四季田景下的左侧二级菜单
        var menuOnOff = true;
		var oWindowW = jQuery(window).width();
		var oWindowH = jQuery(window).height();
		if( oWindowW < 1280 ){
			jQuery('.panorama_level').hide();
			jQuery('.panorama_content').addClass('hide_pano');	
			jQuery('.panorama_content').outerWidth( jQuery('body').width()-77-0 );
			menuOnOff = false;
			
		}else{
			jQuery('.panorama_level').show();
			jQuery('.panorama_content').removeClass('hide_pano');		
			jQuery('.panorama_content').outerWidth( jQuery('body').width()-77-jQuery('.panorama_level_wap').width() );
			menuOnOff = true;
		}		
		jQuery('.collapse_btn').click(function(){
			if( menuOnOff == true ){
				jQuery('.panorama_level').hide();
				jQuery('.panorama_content').addClass('hide_pano');	
				jQuery('.panorama_content').outerWidth( jQuery('body').width()-77-0 );
				menuOnOff = false;	
			}else{
				jQuery('.panorama_level').show();
				jQuery('.panorama_content').removeClass('hide_pano');	
				jQuery('.panorama_content').outerWidth( jQuery('body').width()-77-jQuery('.panorama_level_wap').width() );
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
				'height' : jQuery('.panorama_content').outerHeight() -IESpace
		});
		jQuery('.panorama_main').css({ 
			'min-height' : oWindowH - 60 -IESpace,
				'height' : jQuery('.panorama_content').outerHeight() -IESpace
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
		oWindowH < 500 ? jQuery(".pano_dialog").addClass("pano_top") : 	jQuery(".pano_dialog").removeClass("pano_top");
		
	    jQuery("#krpano_iframe").css({"position":"fixed","z-index":1000});
	    jQuery("#krpano_iframe").css({"width":oWindowW,"height":oWindowH,"left":0,"top":0});
    });
	
	jQuery(window).scroll(function(){
		var oWindowH = jQuery(window).height();
		if( oWindowH < 400 ){
			jQuery('.collapse_btn').css( 'top' , 220 );
		}else{
			jQuery('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + jQuery(window).scrollTop() );	
		}
	});
	
	
	jQuery('#update\\:krg_cover_show').on('ifClicked', function(){ 
		if (this.checked) {
			jQuery(".cover_").hide();
			jQuery(".cover_ .iCheck").iCheck("uncheck");
			jQuery(this).closest("dd").css("width","110px");
		} else {
			jQuery(".cover_").show();
			jQuery(".cover_ .iCheck").iCheck("uncheck");
			jQuery(this).closest("dd").css("width","170px");
		}
	});
	jQuery('#update\\:krg_bgm_show').on('ifClicked', function(){ 
		if (this.checked) {
			jQuery('#selMusicUrl').val("");
			jQuery('.choose_music').html("");
			jQuery(this).closest("dd").find(".setting_btn").attr("class","setting_btn hide");
		} else {
			jQuery(this).closest("dd").find(".setting_btn").attr("class","setting_btn");
		}
	});
	
	jQuery('#update\\:krg_mark_show').on('ifClicked', function(){ 
		if (this.checked) {
			jQuery(this).closest("dd").find(".setting_btn").attr("class","setting_btn hide");
		} else {
			jQuery(this).closest("dd").find(".setting_btn").attr("class","setting_btn");
		}
	});
	
	jQuery('#update\\:krg_join_show').on('ifClicked', function(){ 
		if (this.checked) {
			jQuery(this).closest("dd").find(".setting_btn").attr("class","setting_btn hide");
		} else {
			jQuery(this).closest("dd").find(".setting_btn").attr("class","setting_btn");
		}
	});
	
	jQuery('#update\\:krg_micro_shop_show').on('ifClicked', function(){ 
		if (this.checked) {
			jQuery(this).closest("dd").find(".setting_btn").attr("class","setting_btn hide");
		} else {
			jQuery(this).closest("dd").find(".setting_btn").attr("class","setting_btn");
		}
	});
	//krg_mark_show
	//krg_micro_shop_show
	
	jquery('#CardModal').off('shown.bs.modal').on('shown.bs.modal', function (e) {
		//加上下面这句！解决了~
	    jquery(document).off('focusin.modal');
	    // 打开Dialog后创建编辑器
	    entEditor = KindEditor.create('textarea[name="krg_business_card_introduce"]', {
				resizeType : 1,
			allowPreviewEmoticons : false,
			uploadJson : domainUrl+'/asset/js/kindeditor/upload_json.jsp?directoryType=15&businessType=3&enterpriseId=' + ent_id,
			allowImageUpload : true,
			items : [ 
				'justifyleft', 'justifycenter', 'justifyright',
					'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
					'superscript', 
					'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
					'italic', 'underline', 'strikethrough', 'lineheight', 'clearhtml','image'
			 	],
				height : "250px" //编辑器的宽度为70%，最后在样式表里重置的
		 	});
    });

	jquery('#CardModal').on('hidden.bs.modal', function () {
	    // 关闭Dialog前移除编辑器
	    KindEditor.remove('textarea[name="krg_business_card_introduce"]');
	});
	
	jquery('#IntroductionModal').off('shown.bs.modal').on('shown.bs.modal', function (e) {
		//加上下面这句！解决了~
	    jquery(document).off('focusin.modal');
	    // 打开Dialog后创建编辑器
	    infoEditor = KindEditor.create('textarea[name="introduction"]', {
				resizeType : 1,
			allowPreviewEmoticons : false,
			uploadJson : domainUrl+'/asset/js/kindeditor/upload_json.jsp?directoryType=15&businessType=3&enterpriseId=' + ent_id,
			allowImageUpload : true,
			items : [ 
			 		 'justifyleft', 'justifycenter', 'justifyright',
			 		'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
			 		'superscript', 
			 		'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
			 		'italic', 'underline', 'strikethrough', 'lineheight'
			 	],
				height : "250px", //编辑器的宽度为70%，最后在样式表里重置的
				width : "100%"
		 	});
    });

});


	//(6-1)删除该分组
	function DeleteGroup (){
		jQuery("#deletdGroupModal").modal("show");
		//deleteGroup
	}
	
	function DeleteGroup_next(){
		jQuery(".deleteGroup").trigger("click");
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
		//jQuery("#music_library .library_list li").eq(0).addClass("m_cur");
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
		jQuery(".library_list li").removeClass(oClassName);
		jQuery( obj ).parents("li").addClass( oClassName );
		jQuery(".text_rt").html("已选择："+arguments[3]);
		jQuery("#music_id").val(arguments[2]);
		jQuery("#music_name").val(arguments[3]);
	}
	//(10-3)音乐库--控制音乐播放
	jQuery(".media_audio").each(function(index,elem) {
		jQuery( this )[0].pause();
		jQuery( this ).parent().attr("class","i_on");
	});
	function AutoPlay( obj , iClassName ){
		if( jQuery( obj ).hasClass('i_off') ){
			jQuery( obj ).removeClass('i_off');	
			jQuery( obj ).find('.media_audio')[0].pause();
		}else{
			jQuery(".library_list").find( iClassName ).removeClass('i_off');
			jQuery( obj ).addClass('i_off');		
			jQuery(".media_audio").each(function(index,elem) {
				jQuery( this )[0].pause();
			});
			jQuery( obj ).find('.media_audio')[0].play();
			//jQuery( obj ).parents('.m_item').siblings().find( iClassName ).removeClass('i_off');
		}
		
	}
	function stopAll(){
		//$('#identifier').on('show.bs.modal', function () {
		  // 执行一些动作...
	//})
	}
	//(10-4)删除我的音乐中的每一项
	function DeleteMusic ( obj , oItems ){
		var selUrl=jQuery("#music_id").val();		
		var delUrl=jQuery( obj ).parents( "." + oItems ).attr("objid");
		if(selUrl==delUrl){
			jQuery(".text_rt").html("");
			jQuery("#music_id").val("");
			jQuery("#music_name").val("");
			jQuery(".choose_music").html("");
		}
		jQuery( obj ).parents( "." + oItems ).remove();
		jQuery("#my_music .library_list li").each(function(index, elem) {
			if( jQuery(elem).index()%2 == 0 ){
				jQuery(elem).addClass("m_even");
			}else{
				jQuery(elem).removeClass("m_even");	
			}
		});
	}
	
	//添加分组check
	function checkSaveWithName(){
		if(jQuery("#add\\:groupName").val()==""){
			alert("请填写分组名称！");
			return false;
		}
		if(jQuery("#add\\:groupName").val().length>20){
			alert("分组名称不能超过20个字！");
			return false;
		}
		return  true;
	}
	
	//排序四季田景
	function sortTr(){
		var trs = jQuery("#sortTable tr:visible");
		jQuery("#sortTable").empty();
		jQuery("input[name='krpanos_index']").each(function(){
			var val = this.value;
			for(var i = 0;i<trs.length;i++){
				if(trs[i].getAttribute("objid") == val){
					jQuery("#sortTable").append(trs[i]);
					break;
				}
			}
		});
	}
	
	//删除分组中的四季田景
	function delTr(obj){
		
		var delete_obj_id = jQuery(obj).closest("tr").attr("objid");
		jQuery("#delete_obj_id").val(delete_obj_id);
		jQuery("#deletdModal").modal("show");
		//.hide();
	}
	
	
	function del_tip_yes(){
		jQuery("#sortTable tr:visible[objid="+jQuery("#delete_obj_id").val()+"]").hide();
		jQuery("#delete_obj_id").val("");
		jQuery("#deletdModal").modal("hide");
	}
	function del_tip_no(){
		jQuery("#delete_obj_id").val("");
		jQuery("#deletdModal").modal("hide");
	}
	
	//打开四季田景的选择框
	function openList(){
		var trs = jQuery("#sortTable tr:visible");
		jQuery("#total_krpano").html(trs.length);
		var klc = jQuery("input[name='itemname']");
		for(var i = 0;i<klc.length;i++){
			var value = klc[i].value;
			if(trs.length==0){
				klc[i].removeAttribute("disabled");
				jQuery(klc[i]).iCheck('uncheck');
				jQuery(klc[i]).parent().next().removeClass("m_bor").removeAttr("disable");
				jQuery(klc[i]).closest(".li_item").attr("tr_selected","");
			}else{
				for(var j = 0;j<trs.length;j++){
					var objid = trs[j].getAttribute("objid");
					if(value == objid){
						klc[i].setAttribute("disabled","disabled");
						jQuery(klc[i]).iCheck('check');
						jQuery(klc[i]).parent().next().addClass("m_bor").attr("disable","1");
						jQuery(klc[i]).closest(".li_item").attr("tr_selected","tr_selected");
						jQuery(klc[i]).closest(".li_item").hide();
						break;
					}else if(j == trs.length-1){
						jQuery(klc[i]).closest(".li_item").show();
						klc[i].removeAttribute("disabled");
						jQuery(klc[i]).iCheck('uncheck');
						jQuery(klc[i]).parent().next().removeClass("m_bor").removeAttr("disable");
						jQuery(klc[i]).closest(".li_item").attr("tr_selected","");
					}
				}
			}
		}
		var len = jQuery('.material_dialog input[name="itemname"]:visible').length;
		if(len > trs.length){
			jQuery('.material_dialog').find('input[name="allname"]').iCheck('uncheck');
		}else if(len == trs.length && trs.length != 0){
			jQuery('.material_dialog').find('input[name="allname"]').iCheck('check');
		}
		jQuery("#searchName").val("请输入全景图名称");
		jQuery("#MaterialModal").modal("show");
	}
	
	//监测回车事件
	document.onkeydown=function(event){ 
       	e = event ? event :(window.event ? window.event : null); 
       	if(e.keyCode==13){ 
      	 	if(document.activeElement.id=="searchName"){
      	 		searchKrpanos();
      	 	}else if(document.activeElement.id=="krg_share_describe"){
      	 		return;
      	 	}else if(document.activeElement.id=="commentSearch"){
      	 		searchComment();
      	 	}
      	 	e.keyCode=0;
      	 	if (window.navigator.userAgent.indexOf("MSIE")==-1){
      	 		e.preventDefault();
      	 		return false;
      	 	}
      	 	e.returnValue=false;				
       	} 
	} 
	
	//搜索评论内容
	function searchKrpanos(){
		var val = jQuery("#searchName").val();
		if(val=="请输入全景图名称"){
			val="";
		}
		jQuery(".searchText").not(":contains(" + val + ")").closest(".li_item[tr_selected='']").hide();
		jQuery(".searchText:contains(" + val + ")").closest(".li_item[tr_selected='']").show();
	}
	
	//打开音乐选择框
	function openMusicModal(id){
		if(id != ''){
			jQuery(".m_item[objid='"+id+"']").find(".text_name").trigger("click");
		}else{
			jQuery(".m_item").removeClass("m_cur");
			jQuery(".text_rt").html("");
		}
		jQuery("#MusicModal").modal("show");
	}

	function music_ok(){
		jQuery("#selMusicUrl").val(jQuery("#music_id").val());
		jQuery(".choose_music").html(jQuery("#music_name").val());
		jQuery("#MusicModal").modal("hide");
	}
	
	function music_no(){
		jQuery("#music_id").val("");
		jQuery("#music_name").html("");
		jQuery("#MusicModal").modal("hide");
	}
	
	//打开排序框
	function openSortModal(){
		jQuery("#list_dragselect").empty();
		var trs = jQuery("#sortTable tr:visible");
		trs.each(function(index){
			var str = '<li class="ui-selectee" data-key="'+index+'" style="display: block;"><div class="handle"><i class="fa fa-arrows"></i></div>'+
				'<img class="pano_pic" src="#imgurl#">#name#<input type="hidden" value="#id#" name="krpanos_index"></li>';
			var id = this.getAttribute("objid");
			var imgurl = jQuery(this).find(".pano_img").attr("src");
			var name = jQuery(this).find(".pano_des").html();
			str = str.replace("#id#",id);
			str = str.replace("#imgurl",imgurl);
			str = str.replace("#name#",name);
			jQuery("#list_dragselect").append(str);
		})
		jQuery("#SortModal").modal("show");
	}
	
	//添加一个素材到分组中
	function addOne(){
		var item = jQuery("input[name='itemname']");
		for(var i = 0;i<item.length;i++){
			var value = item[i].value;
			if(!jQuery(item[i]).is(':checked'))
				continue;
			var trs = jQuery("#sortTable tr");
			if(trs.length==0){
				var str = '<tr class="pano_tr" objid="#id#"><td width="100"><img class="pano_img" src="#imgurl#"></td>'+
				'<td width="30%"><p class="pano_des" title="#name#">#name#</p><input type="hidden" value="" id="scene_introduction#id#" name="scene_introduction#id#"/></td><td><span class="praise_num" title="点赞量">'+
				'<img src="/asset/images/panorama/panorama_praise.png"/>0</span><span class="browse_num" title="浏览量"><img src="/asset/images/panorama/panorama_browse.png"/>0</span></td>'+
				'<td width="240"><span class="pano_btn" onclick="openIntroduction(this,#id#)" >场景介绍</span><span class="pano_btn hide"  onclick="commentSearchStr=\'\';jQuery(\'#commentPageNum\').val(\'\');jQuery(\'#comment_k4g_id\').val(jQuery(this).closest(\'tr\').attr(\'k4gid\'));jQuery(\'#commentSearch\').val(\'请输入评论内容搜索\');openComment_before(this)">管理评论</span><span class="pano_btn" onclick="delTr(this)">删除</span></td></tr>';
				str = str.replace(new RegExp(/(#id#)/g),value);
				var imgurl = jQuery(item[i]).closest("dt").find("img").attr("src");
				str = str.replace("#imgurl#",imgurl);
				var name = jQuery(item[i]).parents("dl").find(".searchText").html();
				str = str.replace("#name#",name);
				str = str.replace("#name#",name);
				jQuery("#sortTable").append(str);
			}else{
				for(var j = 0;j<trs.length;j++){
					var objid = trs[j].getAttribute("objid");
					if(objid == value){
						trs[j].style.display="";
						break;
					}else if(j == trs.length-1){
						var str = '<tr class="pano_tr" objid="#id#"><td width="100"><img class="pano_img" src="#imgurl#"></td>'+
									'<td width="30%"><p class="pano_des" title="#name#">#name#</p><input type="hidden" value="" id="scene_introduction#id#" name="scene_introduction#id#"/></td><td><span class="praise_num" title="点赞量">'+
									'<img src="/asset/images/panorama/panorama_praise.png"/>0</span><span class="browse_num" title="浏览量"><img src="/asset/images/panorama/panorama_browse.png"/>0</span></td>'+
									'<td width="240"><span class="pano_btn" onclick="openIntroduction(this,#id#)" >场景介绍</span><span class="pano_btn hide" onclick="commentSearchStr=\'\';jQuery(\'#commentPageNum\').val(\'\');jQuery(\'#comment_k4g_id\').val(jQuery(this).closest(\'tr\').attr(\'k4gid\'));jQuery(\'#commentSearch\').val(\'请输入评论内容搜索\');openComment_before(this)">管理评论</span><span class="pano_btn" onclick="delTr(this)">删除</span></td></tr>';
						str = str.replace(new RegExp(/(#id#)/g),value);
						var imgurl = jQuery(item[i]).closest("dt").find("img").attr("src");
						str = str.replace("#imgurl#",imgurl);
						var name = jQuery(item[i]).parents("dl").find(".searchText").html();
						str = str.replace("#name#",name);
						str = str.replace("#name#",name);
						jQuery("#sortTable").append(str);
					}
				}
			}
		}
		jQuery("#MaterialModal").modal("hide");
	}
	
	//分组提交check
	function checksubmit(){
		if(jQuery("#krg_group_id").val()==""){
			alert("请填写分组名称！");
			return false;
		}
		var newstr = "";
		jQuery("#sortTable tr:visible").each(function(){
			newstr += this.getAttribute("objid")+",";
		});
		var delstr = "";
		jQuery("#sortTable tr:hidden").each(function(){
			delstr += this.getAttribute("objid")+",";
		});
		if(newstr.length>0){
			newstr = newstr.substring(0, newstr.length-1);
		}
		if(delstr.length>0){
			delstr = delstr.substring(0, delstr.length-1);
		}
		
		if(jQuery("#krg_share_describe").val().length>40){
			alert("分享描述不能超过40个字！");
			return false;
		}
		jQuery("#krg_new_list").val(newstr);
		jQuery("#krg_deleted_list").val(delstr);
		jQuery('#krg_share_describe').val(jQuery('#krg_share_describe').val().replace(/[\n]/g,"</br>"));
		jquery("#krg_coupon_url").val(jquery("#loginSuccessByte_p").attr("src"));
		jquery("#krg_share_img_url").val(jquery("#shareImg").attr("src"));
		
		//音乐
		var mus="";
		jQuery('#my_music').find('.library_list li').each(function(){
				mus+=jQuery(this).find('.media_audio').attr('src')+"_=";
				mus+=jQuery(this).find('.text_name').text()+",";
		});
		if(mus!=""){
			mus=mus.substring(0,mus.length-1);
		}
		jQuery('#krg_music_str').val(mus);
		
		return true;
	}
	
	//复制分享链接
	function copy_(){
		jQuery("#copy_target")[0].select();
		document.execCommand("Copy");
		alert('已复制该内容');
	}
	
	//正则检测url
	function checkMicroUrl(){
		var str_url = jQuery("#krg_micro_shop_url").val();
		 if(str_url == ""){
			 jQuery("#micro_shop").modal("hide");
			 return;
		 }
         var strRegex = "^((https|http|ftp|rtsp|mms)?://)"  
         + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@  
         + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184  
         + "|" // 允许IP和DOMAIN（域名） 
         + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.  
         + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名  
        + "[a-z]{2,6})" // first level domain- .com or .museum  
        + "(:[0-9]{1,4})?" // 端口- :80  
        + "((/?)|" // a slash isn't required if there is no file name  
        + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";  
        var re=new RegExp(strRegex);  
        
        if (re.test(str_url)){ 

        	jQuery("#micro_shop").modal("hide");
        }else{  
        	alert("微商城地址输入有误！");
        } 
	}
	
	//刷新
	function refresh_url(){
		//domainUrl = "http://192.168.21.14:8080";
		domainUrl = "";
		var url =  domainUrl + "/panorama/PanoramaEdit.seam" + location.search;
		if(location.search == ""){
			url +="?random="+Math.random().toFixed(2);
		}else{
			url +="&random="+Math.random().toFixed(2);
		}
		window.location.href = url;
	}
	
	
	//打开评论列表之前
	function openComment_before(){
		var searchStr = jQuery("#commentSearch").val();
		if(searchStr == "请输入评论内容搜索"){
			searchStr = "";
		}
		var param1 = jQuery("#comment_k4g_id").val();
		var param2 = jQuery("#krg_group_id").val();
		var pageNum = jQuery("#commentPageNum").val();
		openComment(param1,param2,searchStr,pageNum);
	}
	
	//采集评论列表数据
	var commentSearchStr = "";
	function searchComment(){
		commentSearchStr = jQuery("#commentSearch").val();
		openComment_before();
	}
	
	//打开评论列表
	function openComment_next(){
		if(commentSearchStr == "")
			commentSearchStr = "请输入评论内容搜索";
		
		setCommentAllBut();
		
		jQuery("#commentSearch").val(commentSearchStr);
		jQuery("#CommentModal input[type='checkbox']").iCheck({
			checkboxClass: 'icheckbox_minimal-blue'
		});
		 jQuery('#commentSearch').focus(function(){
	        var txt_value = jQuery(this).val();
	        if(txt_value==this.defaultValue){
	            jQuery(this).val("");    
	        };  
		});
		jQuery('#commentSearch').blur(function(){
	        var txt_value = jQuery(this).val();
	        if(txt_value==""){
	            jQuery(this).val(this.defaultValue); 
	        };  
	        if(jQuery(this).val() != this.defaultValue){
	        	searchComment();
	        }
		}); 
		jQuery("#CommentModal").modal("show");
	}
	
	function deleteOne_before(obj){
		jQuery("#DeleteCommentCheck .text_tip1").html("确定删除这条评价么？");
		jQuery("#DeleteCommentCheck_OK").unbind("click");
		jQuery("#DeleteCommentCheck_OK").bind("click",function(){deleteOne(obj);jQuery("#DeleteCommentCheck").modal("hide");});
		jQuery("#DeleteCommentCheck").modal("show");
	}
	
	//删除一条评论
	function deleteOne(obj){
		var searchStr = jQuery("#commentSearch").val();
		if(searchStr == "请输入评论内容搜索"){
			searchStr = "";
		}
		commentSearchStr = searchStr;
		var param1 = jQuery("#comment_k4g_id").val();
		var param2 = jQuery("#krg_group_id").val();
		var pageNum = jQuery("#commentPageNum").val();
		deleteOneComment(param1,param2,searchStr,obj,pageNum);
	}
	
	function deleteMany_before(obj){
		var checkeds = jQuery(".commentCheckbox input[type='checkbox']:checked");
		if(checkeds.length == 0){
			return ;
		}
		jQuery("#DeleteCommentCheck .text_tip1").html("确定删除这些评价么？");
		jQuery("#DeleteCommentCheck_OK").unbind("click");
		jQuery("#DeleteCommentCheck_OK").bind("click",function(){deleteMany();jQuery("#DeleteCommentCheck").modal("hide");});
		jQuery("#DeleteCommentCheck").modal("show");
	}
	
	//删除选择的评论
	function deleteMany(){
		var checkeds = jQuery(".commentCheckbox input[type='checkbox']:checked");
		if(checkeds.length == 0){
			return ;
		}
		var obj = "";
		jQuery(checkeds).each(function(){
			
			obj += this.value+",";
		});
		if(obj.length>1){
			obj = obj.substring(0, obj.length-1);
		}
		var searchStr = jQuery("#commentSearch").val();
		if(searchStr == "请输入评论内容搜索"){
			searchStr = "";
		}
		commentSearchStr = searchStr;
		var param1 = jQuery("#comment_k4g_id").val();
		var param2 = jQuery("#krg_group_id").val();
		var pageNum = jQuery("#commentPageNum").val();
		//commentCheckbox
		deleteManyComment(param1,param2,searchStr,obj,pageNum);
	}
	
	//评论分页跳转
	function jump(obj){
		jQuery("#commentPageNum").val(obj);
		openComment_before();
	}
	
	
	//检测企业名片表单
	var mobileData = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
	var re= /^(13[0-9]|15[012356789]|17[01236789]|18[0-9]|14[57])[0-9]{8}$/;
	var emailReg = /^([a-z0-9A-Z]+[_-|\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-zA-Z]{2,}$/;
	function checkBusinessCard(){
		var businessName=jQuery("#krg_business_name").val();
		var businessTel=jQuery("#krg_business_tel").val();
		var businessEmail=jQuery("#krg_business_email").val();
		var businessWeibo=jQuery("#krg_business_weibo").val();
		var businessAddress=jQuery("#krg_business_address").val();
		var businessIntroduce=jQuery(window.frames[0].document.body).html();
		jQuery("#krg_business_introduce").val(businessIntroduce);
		if(businessName.length>50){
			alert("企业名称不能超过50字！");
			return false;
		}
		if(businessTel != "" && !mobileData.test(businessTel) && !re.test(businessTel)){
			alert("请输入正确的联系方式");
			return false;
		}
		//邮箱
		if(businessEmail != "" && !emailReg.test(businessEmail)){
			alert("请输入正确的电子邮件地址");
			return false;
		}
		if(businessWeibo.length>50){
			alert("企业微博不能超过50字！");
			return false;
		}
		if(businessAddress.length>50){
			alert("企业地址不能超过50字！");
			return false;
		}
		jquery("#CardModal").modal('hide');
	}
	
	//打开场景介绍
	function openIntroduction(obj,id){
		jQuery("#introduction_target").val(id);
		var hideVal = jQuery("#scene_introduction"+id).val();
		jQuery("#introduction").val(hideVal);
		jquery("#IntroductionModal").modal('show');
	}
	
	//保存场景介绍
	function saveIntroduction(){
		var id = jQuery("#introduction_target").val();
		jQuery("#scene_introduction"+id).val(infoEditor.html());
	    KindEditor.remove('textarea[name="introduction"]');
		jquery("#IntroductionModal").modal('hide');
	}
	
	function openHotspot(obj){
		jQuery("body").css("overflow","hidden");
		var gid = jQuery("#krg_group_id").val();
		var kid =  jQuery(obj).closest("tr").attr("objid");
		var k4id = jQuery(obj).closest("tr").attr("k4gid");
		var url = workpath+ "/panorama/PanoramaSetting.seam?kid=#kid#&gid=#gid#&k4id=#k4id#";
		url = url.replace(new RegExp(/(#kid#)/g),kid);
		url = url.replace(new RegExp(/(#gid#)/g),gid);
		url = url.replace(new RegExp(/(#k4id#)/g),k4id);
		jQuery("#krpano_iframe").attr("src",url);
	    var height = document.body.clientHeight;
	    var width = document.body.clientWidth;
	    jQuery("#krpano_iframe").css({"position":"fixed","z-index":1000});
	    jQuery("#krpano_iframe").css({"width":width,"height":height,"left":0,"top":0});
	    jQuery("#krpano_iframe").show();
	}
	
	function closeIframe(){
		jQuery("#krpano_iframe").attr("src","");
		jQuery("#krpano_iframe").hide();
		jQuery("body").css("overflow","");
	}
	

    //全景
    var filters1 = {
            mime_types : [ //允许上传图片和zip,rar文件以及视频文件
                           { title : "Image files", extensions : "jpg,gif,png,jpeg,3gp" }, 
                           ],
                           max_file_size : "1mb", //最大只能上传1mb的文件
                           prevent_duplicates : false //不允许选取重复文件
                       };
    function apply(obj){
		document.getElementById('ajaxStatus.start').onstart();
		document.getElementById('fileTips').style.display='block';
		set_upload_param(uploader1, '', false,obj,entId);
	};

	var uploaded_file_url = "";
	var file_name = "";
	function callback() {
		if(uploaded_file_url!=""){
			jquery("#loginSuccessByte_p").attr("src",uploaded_file_url);
			jquery(".fPicture").show();
			document.getElementById('ajaxStatus.stop').onstop();
		}
	};
	
	function delLogoImg(){
		jquery("#couponDiv").css("display","none");
		jquery("#loginSuccessByte_p").attr("src","");
	}
	
	function shareApply(obj){
		document.getElementById('ajaxStatus.start').onstart();
		document.getElementById('fileTips').style.display='block';
		set_upload_param(uploader2, '', false,obj,entId);
	};

	var uploaded_share_url = "";
	var shre_file_name="";
	function shareCallback(obj) {
		if(uploaded_share_url!=""){
			jquery("#shareImg").attr("src",uploaded_share_url);
			jquery("#shareImgDiv").show();
			
		}
		document.getElementById('ajaxStatus.stop').onstop();
	};
	
	function delShareImg(){
		jquery("#shareImgDiv").css("display","none");
		jquery("#shareImg").attr("src","");
	}       

	function dosome(text){
		var musicUrl=decodeURI(text);
		var musicName=jquery("#myframPic3").contents().find('#urlId').attr('name');
		jquery('#my_music').find('.library_list').append("<li class=\"m_item\" objid=\""+musicUrl+"\">"+
				"<i class=\"icon_yy\" onclick=\"MusicStatue(this,'m_cur','"+musicUrl+"','"+musicName+"')\"></i>"
				 	+"<p class=\"text_name\" onclick=\"MusicStatue(this,'m_cur','"+musicUrl+"','"+musicName+"')\">"+musicName+"</p>"
					+"<p class=\"icon_btn\">"
						+"<i class=\"i_on\" onclick=\"AutoPlay(this,'.i_on')\">"
							+"<audio  src=\""+musicUrl+"\" controls=\"controls\" hidden=\"false\" class=\"media_audio\" loop=\"loop\" autoplay=\"false\"/>"
							+"</i>"
							+"<i class=\"i_delete\" onclick=\"DeleteMusic(this,'m_item')\"></i>"
					+"</p>"
				+"</li>");
		//上传后默认不播放
		var audioSize=jQuery(".media_audio").length-1;
		jQuery(".media_audio")[audioSize].pause();
		
		jQuery("#my_music .library_list li").each(function(index, elem) {
	        if( jQuery(elem).index()%2 == 0 ){
				jQuery(elem).addClass("m_even");
			}
	    });
	}
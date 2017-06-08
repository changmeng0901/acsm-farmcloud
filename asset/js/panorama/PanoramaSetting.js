Array.prototype.del = function(n) {
	if (n < 0)
		return this;
	else
		return this.slice(0, n).concat(this.slice(n + 1, this.length));
};
$(function(){
	    ResizeModal();

		//tooltip提示插件
		$(".type_link").tooltip();
	 
	    //图片展示弹框--中的焦点图
	    $('#random_slider_wrap').niceScroll({ cursorcolor: "#999999"});
	    $('#random_slider_wrap').getNiceScroll().resize();
	    $('.random_slider').css('width',(104+40)*$('.random_slider .sitem').length);

	    $('.hotspot_cont').niceScroll({ cursorcolor: "#999999"});
	    $('.hoticon_list').niceScroll({ cursorcolor: "#999999"});
	    $('.scenepic_list').niceScroll({ cursorcolor: "#999999"});
	    
	   // $(".random_slider").bigSlider({},".sitem");

	    // 请选择您要添加的类型
	    $('.hottype_list li').each(function(index,elem){
	        $(elem).click(function(){
	            if($(this).attr('onoff') == 'true'){
	            	hotspot_type=index;
	                $(this).addClass('aCur').siblings().removeClass('aCur');
	                $(this).attr('onoff','false').siblings().attr('onoff','true');
	                $('#SelectType').removeAttr('disabled');
	                $('#SelectType').attr('onclick',"changeTypeDone()");
	            }else{
	            	hotspot_type=-1;
	                $(this).removeClass('aCur');
	                $(this).attr('onoff','true') ;
	                $('#SelectType').attr('disabled','true');
	                $('#SelectType').attr('onclick','');
	            }  
	        });
	    })

	    $("#switch_modal span").bind("click",function(){
	    	pic_type = jQuery(this).attr("data-id");
	    	jQuery(this).addClass('spIcur');
	    	jQuery(this).siblings().removeClass('spIcur');
	    });
	    
	    var iframe = $(window.parent.document);
		var trs = iframe.find("#sortTable tr");
		for(var i = 0;i<trs.length;i++){
			var obj = trs[i];
			var $kid = obj.getAttribute("objid");
			var $k4id = obj.getAttribute("k4gid");
			var $img = $(obj).find(".pano_img").attr("src");
			var $name = $(obj).find(".pano_des").html();
			var html = '<li onclick="selectScene(this)" kid="#kid#" k4id="#k4id#"><div class="sitem"><img src="#img#" /><p class="p_text">#name#</p></div></li>';
			html = html.replace(new RegExp(/(#kid#)/g),$kid);
			html = html.replace(new RegExp(/(#k4id#)/g),$k4id);
			html = html.replace(new RegExp(/(#img#)/g),$img);
			html = html.replace(new RegExp(/(#name#)/g),$name);
			$(".scenepic_list").append(html);
		}
		
	});
	$(window).resize(function(){
	    ResizeModal();
	    $(document).scrollTop(0);
	});
	
	var hotspot_type=-1;//选择的热点类型;
	function openSelectModel(){
		$(".hottype_list li").removeClass("aCur");
		hotspot_type=-1;
		$('#SelectType').attr('disabled','true');
        $('#SelectType').attr('onclick','');
		ShowModal('#hottype_modal','');
		closeTip();
		$(".needhide").show();
	}
	
	
	var pic_type = -1;//选择的热点图标;
	function changeTypeDone(){
		$("#hottype_modal").hide();
		ShowModal("switch_modal", "");
		$("#switch_modal span").removeClass("spIcur");
		pic_type = -1;
		target_id = -1;
		target_name = "";
		target_img = "";
		$(".changetxt").attr("value","下一步");
		$("#url_name").val("");
		$("#url_url").val("http://");
		$("#txt_title").val("");
		$("#txt_content").val("");
		$("#img_name").val("");
		imgs = "";
		target_hotspot = null;
		isEdit = false;
		closeTip();
		$("#asset_list .sCur").removeClass("sCur");
		$(".scenepic_list li").addClass("iIcur");
		$(".scenepic_list li").siblings().removeClass("iIcur");
		$("#switch_modal .btn_success").unbind("click");
		ShowModal("#switch_modal", "#hottype_modal");
		if(hotspot_type == 0){
			//switch_modal
			$("#switch_modal .btn_success").bind("click",function(){
				ShowModal("#scene_modal", "#switch_modal");
			});
		}else if(hotspot_type == 1){
			//hyperlink_modal
			$("#switch_modal .btn_success").bind("click",function(){
				ShowModal("#hyperlink_modal", "#switch_modal");
			});
		}else if(hotspot_type == 2){
			//pictureshow_modal
			$("#switch_modal .btn_success").bind("click",function(){
				ShowModal("#pictureshow_modal", "#switch_modal");
			});
		}else if(hotspot_type == 3){
			//textinstro_modal
			$("#switch_modal .btn_success").bind("click",function(){
				ShowModal("#textinstro_modal", "#switch_modal");
			});
		}
	}
	
	// 封装屏幕缩放
	function ResizeModal(){
	    if($(window).height()<600){
	        $('.hotspot_wrap').addClass('relat_modal');
	        $('.hotspot_modal').addClass('relat_modal');
	    }else{
	        $('.hotspot_wrap').removeClass('relat_modal');
	        $('.hotspot_modal').removeClass('relat_modal');
	    }
	}
	// 封装弹出框显示
	function ShowModal(oParent,preParent){
	    $(oParent).show();
	    $('.hotspot_mark').show();
	    $(preParent).hide();
	}
	// 封装弹出框隐藏
	function HideModal(oParent){
	    $(oParent).hide();
	    $('.hotspot_mark').hide();
	    $('#hottype_modal').hide();
	}
	//封装删除事件
	function DeleteItem(e,obj,oParent,id){
		if ( e && e.stopPropagation ) 
		    //因此它支持W3C的stopPropagation()方法 
		    e.stopPropagation(); 
		else
		    //否则，我们需要使用IE的方式来取消事件冒泡 
		    window.event.cancelBubble = true; 
		if(confirm("删除将无法回复，确定次操作？"))
		 {
			deletedAsset(id);
		 }
	}
	function ActiveCur(obj,iCur){
		var newImg = $(obj).find("img").attr("src").replace("@100w_100h_1e_1c.src","");
	    if($(obj).attr('onoff') == 'false'){
	        $(obj).addClass(iCur);
	        $(obj).attr('onoff','true');
	        var img_list = imgs.split(",");
	        for(var i = 0;i<img_list.length ;i++){
	        	var obj = img_list[i];
	        	if(obj == newImg){
	        		break;
	        	}else if(i == img_list.length-1){
	        		imgs += newImg + ",";
	        	}
	        }
	    }else{
	        $(obj).removeClass(iCur);
	        $(obj).attr('onoff','false') ;
	        var img_list = imgs.split(",");
	        imgs = "";
	        for(var i = 0;i<img_list.length ;i++){
	        	var obj = img_list[i];
	        	if(obj == newImg){
	        		img_list = img_list.del(i);
	        		i--;
	        		continue;
	        	}
	        	if(obj != "")
	        		imgs += obj + ",";
	        }
	    }
	}
	

	var target_id = -1;//热点跳转的场景;
	var target_img = "";//热点图片
	var target_name = "";
	var hotspotsJson ;
	function selectScene(obj){
		$(obj).addClass("iIcur");
		$(obj).siblings().removeClass("iIcur");
		target_id = jQuery(obj).attr("kid");
		target_img = jQuery(obj).find("img").attr("src");
		target_name = jQuery(obj).find(".p_text").html();
	}
	
	function openTip(obj,type,index_){
		var b = false;
		$(".hotspot_modal").each(function(){
			if($(this).is(":visible")){
				b = true;
				return false;
			}
		});
		if(b)
			return;
		var tip = $("#popDiv");
		tip.show();
		$(".item").removeClass("iCur");
		$(obj).addClass("iCur");
		$(obj).after(tip);
		for(var i = 0;i<hotspotsJson.length;i++){
			var hotspot = hotspotsJson[i];
			if(hotspot.index_ == index_){
				target_hotspot = hotspot;
			}
		}
		if($(".hotspot_body .item").index($(obj)) == $(".hotspot_body .item").length -1)
			$('.hotspot_cont').getNiceScroll(0).doScrollTop(100000);
	}
	
	function closeTip(){
		$(".item").removeClass("iCur");
		$("#popDiv").hide();
		target_hotspot = null;
	}
	
	var hotspot_index = 0;
	var target_hotspot;
	
	var krObj ;
	function objcall(str){
		if(typeof(krObj) == "undefined"){
			krObj = document.getElementById("krpanoSWFObject");
		}
		krObj.call(str);
	}
	
	function objget(str){
		if(typeof(krObj) == "undefined"){
			krObj = document.getElementById("krpanoSWFObject");
		}
		return krObj.get(str);
	}
	
	function objset(key,value){
		if(typeof(krObj) == "undefined"){
			krObj = document.getElementById("krpanoSWFObject");
		}
		krObj.set(key,value);
	}
	
	function initScene(hotspot){
		var obj = jQuery("#switch");
		var count = obj.find("#switch_total").html();
		count = parseInt(count,10);
		count += 1;
		obj.find("#switch_total").html(count);
		var $li = $("#repeat #switch_ li").prop("outerHTML");
		$li = $li.replace(new RegExp(/(#type#)/g),1);
		$li = $li.replace(new RegExp(/(#index_#)/g),hotspot.index_);
		$li = $li.replace(new RegExp(/(#scene_img_src#)/g),hotspot.linkedscene_img+"/mobile_f.jpg@40w_40h_1e_1c.jpg");
		$li = $li.replace(new RegExp(/(#scene_name#)/g),hotspot.linkedscene_name);
		$li = $li.replace(new RegExp(/(#hotspot_style#)/g),workpath + "/asset/panorama/skin/"+hotspot.hotspot_style+".png");
		$li = $li.replace(new RegExp(/(#li#)/g),"li"+hotspot.index_);
		obj.find("ul").append($li);
		obj.show();
		var style = 56;
		var style_type = 1;
		if(hotspot.hotspot_style>50){
			style = hotspot.hotspot_style+"_";
			style_type = 2;
		}else{
			style = hotspot.hotspot_style;
		}
		objcall("addpots("+hotspot.index_+","+hotspot.name+","+style_type+","+style+","+hotspot.ath+","+hotspot.atv+")");
	}
	
	function initUrl(hotspot){
		var obj = jQuery("#hyperlinks");
		var count = obj.find("#hyperlinks_total").html();
		count = parseInt(count,10);
		count += 1;
		obj.find("#hyperlinks_total").html(count);
		var $li = $("#repeat #hyperlinks_ li").prop("outerHTML");
		$li = $li.replace(new RegExp(/(#type#)/g),2);
		$li = $li.replace(new RegExp(/(#index_#)/g),hotspot.index_);
		$li = $li.replace(new RegExp(/(#name#)/g),hotspot.name);
		$li = $li.replace(new RegExp(/(#hotspot_style#)/g),workpath + "/asset/panorama/skin/"+hotspot.hotspot_style+".png");
		$li = $li.replace(new RegExp(/(#li#)/g),"li"+hotspot.index_);
		obj.find("ul").append($li);
		obj.show();
		var style = 56;
		var style_type = 1;
		if(hotspot.hotspot_style>50){
			style = hotspot.hotspot_style+"_";
			style_type = 2;
		}else{
			style = hotspot.hotspot_style;
		}
		objcall("addpots("+hotspot.index_+","+hotspot.name+","+style_type+","+style+","+hotspot.ath+","+hotspot.atv+")");
	}
	
	function initPicture(hotspot){
		var obj = jQuery("#picture");
		var count = obj.find("#picture_total").html();
		count = parseInt(count,10);
		count += 1;
		obj.find("#picture_total").html(count);
		var $li = $("#repeat #picture_ li").prop("outerHTML");
		$li = $li.replace(new RegExp(/(#type#)/g),2);
		$li = $li.replace(new RegExp(/(#index_#)/g),hotspot.index_);
		$li = $li.replace(new RegExp(/(#pic_url#)/g),hotspot.hotspot_imgs.split(",")[0]);
		$li = $li.replace(new RegExp(/(#name#)/g),hotspot.name);
		$li = $li.replace(new RegExp(/(#hotspot_style#)/g),workpath + "/asset/panorama/skin/"+hotspot.hotspot_style+".png");
		$li = $li.replace(new RegExp(/(#li#)/g),"li"+hotspot.index_);
		obj.find("ul").append($li);
		obj.show();
		var style = 56;
		var style_type = 1;
		if(hotspot.hotspot_style>50){
			style = hotspot.hotspot_style+"_";
			style_type = 2;
		}else{
			style = hotspot.hotspot_style;
		}
		objcall("addpots("+hotspot.index_+","+hotspot.name+","+style_type+","+style+","+hotspot.ath+","+hotspot.atv+")");
	}
	
	function initText(hotspot){
		var obj = jQuery("#textinstor");
		var count = obj.find("#textinstor_total").html();
		count = parseInt(count,10);
		count += 1;
		obj.find("#textinstor_total").html(count);
		var $li = $("#repeat #textinstor_ li").prop("outerHTML");
		$li = $li.replace(new RegExp(/(#type#)/g),2);
		$li = $li.replace(new RegExp(/(#index_#)/g),hotspot.index_);
		$li = $li.replace(new RegExp(/(#name#)/g),hotspot.hotspot_txt_title);
		$li = $li.replace(new RegExp(/(#hotspot_style#)/g),workpath + "/asset/panorama/skin/"+hotspot.hotspot_style+".png");
		$li = $li.replace(new RegExp(/(#li#)/g),"li"+hotspot.index_);
		obj.find("ul").append($li);
		obj.show();
		var style = 56;
		var style_type = 1;
		if(hotspot.hotspot_style>50){
			style = hotspot.hotspot_style+"_";
			style_type = 2;
		}else{
			style = hotspot.hotspot_style;
		}
		objcall("addpots("+hotspot.index_+","+hotspot.name+","+style_type+","+style+","+hotspot.ath+","+hotspot.atv+")");
	}
	
	function init(){
		var iframe = $(window.parent.document);
		var hotspotsStr = iframe.find("#hotspot"+kid).val();
		hotspotsJson = JSON.parse(hotspotsStr);
		//var scene_html = '<div id="switch"><h4 class="hot_title">全景切换（<span id="switch_total">0</span>）</h4><ul class="hot_list"></ul></div>';
		//var url_html = '<div id="hyperlinks"><h4 class="hot_title">超链接（<span id="hyperlinks_total">0</span>）</h4><ul class="hot_list"></ul></div>';
		//var img_html = '<div id="picture"><h4 class="hot_title">图片展示（<span id="picture_total">0</span>）</h4><ul class="hot_list"></ul></div>';
		//var txt_html = '<div id="textinstor"><h4 class="hot_title">文字介绍（<span id="textinstor_total">0</span>）</h4><ul class="hot_list"></ul></div>';
		for(var i = 0;i<hotspotsJson.length;i++){
			var hotspot = hotspotsJson[i];
			if(hotspot.deleted == true)
				continue;
			//1,跳转,2链接,3图片,4文字
			if(hotspot.hotspot_type == 1){
				initScene(hotspot);
			}else if(hotspot.hotspot_type == 2){
				initUrl(hotspot);
			}else if(hotspot.hotspot_type == 3){
				initPicture(hotspot);
			}else if(hotspot.hotspot_type == 4){
				initText(hotspot);
			}
			hotspot_index = hotspot.index_+1;
		}
	}
	
	function seek(){
		var name = "hotspot"+target_hotspot.index_;
		objcall("seekhotspot("+name+")");
	}
	
	var isEdit = false;
	function edit(){
		$(".needhide").hide();
		$("#switch_modal span").removeClass("spIcur");
		$("#switch_modal span[data-id='"+target_hotspot.hotspot_style+"']").addClass("spIcur");
		pic_type = target_hotspot.hotspot_style;
		isEdit = true;
		$(".changetxt").attr("value","完成");
		
		$("#switch_modal .btn_success").unbind("click");
		ShowModal("#switch_modal", "#hottype_modal");
		if(target_hotspot.hotspot_type == 1){
			//switch_modal
			target_id = target_hotspot.linkedscene;
			target_name = target_hotspot.linkedscene_name;
			target_img = target_hotspot.linkedscene_img;
			$(".scenepic_list li[kid='"+target_id+"']").addClass("iIcur");
			$("#switch_modal .btn_success").bind("click",function(){
				ShowModal("#scene_modal", "#switch_modal");
			});
		}else if(target_hotspot.hotspot_type == 2){
			//hyperlink_modal
			$("#url_name").val(target_hotspot.name);
			$("#url_url").val(target_hotspot.hotspot_url);
			$("#switch_modal .btn_success").bind("click",function(){
				ShowModal("#hyperlink_modal", "#switch_modal");
			});
		}else if(target_hotspot.hotspot_type == 3){
			//pictureshow_modal
			imgs = target_hotspot.hotspot_imgs;
			var imgs_ = imgs.split(",");
			$("#asset_list .sitem").removeClass("sCur");
			for(var i = 0;i<imgs_.length;i++){
				if(imgs_[i]=="")
					continue;
				var sitem = $("#asset_list img[src^='"+imgs_[i]+"']");
				if(sitem.length==0){
					imgs = target_hotspot.hotspot_imgs.replace(imgs_[i]+",","");
					target_hotspot.hotspot_imgs = imgs;
					editHotspotsJson(target_hotspot);
				}else{
					sitem.closest(".sitem").attr("onoff",true).addClass("sCur");
				}
				
			}
			$("#img_name").val(target_hotspot.name);
			$("#switch_modal .btn_success").bind("click",function(){
				ShowModal("#pictureshow_modal", "#switch_modal");
			});
		}else if(target_hotspot.hotspot_type == 4){
			//textinstro_modal
			$("#txt_title").val(target_hotspot.hotspot_txt_title); 
			$("#txt_content").val(target_hotspot.hotspot_txt_content);
			$("#switch_modal .btn_success").bind("click",function(){
				ShowModal("#textinstro_modal", "#switch_modal");
			});
		}
	}
	
	function delete_(){
		var b = false;
		$(".hotspot_modal").each(function(){
			if($(this).is(":visible")){
				b = true;
				return false;
			}
		});
		if(b){
			alert("请先关闭弹出框!");
			return;
		}
		for(var i = 0;i<hotspotsJson.length;i++){
			if(hotspotsJson[i].index_ == target_hotspot.index_){
				hotspotsJson[i].deleted = true;
				var target_ = $("#li"+target_hotspot.index_);
				var length = target_.siblings().length;
				if(length >=2){
					target_.closest("div").find(".count_total").html(length-1);
					target_.remove();
				}else{
					target_.closest("div").hide();
					target_.remove();
				}
				objcall("removehotspot(hotspot"+target_hotspot.index_+",true)");
			}
		}
		closeTip();
	}
	
	function editHotspotsJson(obj){
		for(var i = 0;i<hotspotsJson.length;i++){
			if(hotspotsJson[i].index_ == obj.index_){
				hotspotsJson[i] = obj;
			}
		}
	}
	
	//添加一个场景切换热点
	function addType1(){
		if(pic_type==-1 ){
			alert("请选择热点图片！");
			return;
		}else if( target_id == -1){
			alert("请选择目标场景！");
			return ;
		}
		var newJson = {};
		if(isEdit){
			newJson = target_hotspot
		}
		newJson['hotspot_imgs'] = null;
		newJson['hotspot_style'] = pic_type;
		newJson['hotspot_txt_content'] = null;
		newJson['hotspot_txt_title'] = null;
		newJson['hotspot_type'] = 1;
		newJson['hotspot_url'] = null;
		newJson['k4gid'] = k4id;
		newJson['linkedscene'] = target_id;
		newJson['linkedscene_img'] = target_img.replace("/mobile_f.jpg@50w_50h_1e_1c.jpg","");
		newJson['linkedscene_name'] = target_name;
		newJson['name'] = "";
		newJson['scene_id'] = kid;
		newJson['scene_name'] = null;
		if(isEdit){
			editHotspotsJson(newJson);
			var editTarget = $("#li"+newJson['index_']);
			editTarget.find(".text_in").html(target_name);
			editTarget.find(".pano_pic").attr("src",newJson['linkedscene_img']+"/mobile_f.jpg@40w_40h_1e_1c.jpg");
			editTarget.find(".icon_hot").find("img").attr("src",workpath + "/asset/panorama/skin/"+newJson['hotspot_style']+".png");
			resetHotspot(newJson);
		}else{
			newJson['id'] = null;
			newJson['index_'] = hotspot_index++;
			newJson['deleted'] = false;
			newJson['ath'] = objget("view.hlookat");
			newJson['atv'] = objget("view.vlookat");
			hotspotsJson.push(newJson);
			initScene(newJson);
			objcall("show_add_tip(true);");
		}
		jQuery("#li"+newJson['index_']).trigger("click");
		HideModal("#scene_modal");
	}
	
	var strRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;   
	
	//添加一个链接热点
	function addType2(){
        var re=new RegExp(strRegex);  
        if (re.test($("#url_url").val())){ 
        	
        }else{  
        	alert("链接地址输入有误！");
        	return ;
        } 
		
		if(pic_type==-1 ){
			alert("请选择热点图片！");
			return;
		}else if( $("#url_name").val() == ""){
			alert("请选择热点名称！");
			return ;
		}else if( $("#url_url").val() == ""){
			alert("请选择热点链接！");
			return ;
		}
		var newJson = {};
		if(isEdit){
			newJson = target_hotspot
		}
		newJson['hotspot_imgs'] = null;
		newJson['hotspot_style'] = pic_type;
		newJson['hotspot_txt_content'] = null;
		newJson['hotspot_txt_title'] = null;
		newJson['hotspot_type'] = 2;
		newJson['hotspot_url'] = $("#url_url").val();
		newJson['k4gid'] = k4id;
		newJson['linkedscene'] = null;
		newJson['linkedscene_img'] = null;
		newJson['linkedscene_name'] = null;
		newJson['name'] = $("#url_name").val();
		newJson['scene_id'] = kid;
		newJson['scene_name'] = null;
		if(isEdit){
			editHotspotsJson(newJson);
			var editTarget = $("#li"+newJson['index_']);
			editTarget.find(".text_in2").html(newJson['name']);
			editTarget.find("img").attr("src",workpath + "/asset/panorama/skin/"+newJson['hotspot_style']+".png");
			resetHotspot(newJson);
		}else{
			newJson['id'] = null;
			newJson['index_'] = hotspot_index++;
			newJson['deleted'] = false;
			newJson['ath'] = objget("view.hlookat");
			newJson['atv'] = objget("view.vlookat");
			hotspotsJson.push(newJson);
			initUrl(newJson);
			objcall("show_add_tip(true);");
		}
		jQuery("#li"+newJson['index_']).trigger("click");
		HideModal("#hyperlink_modal");
	}
	
	var imgs = "";
	//添加一个图片热点
	function addType3(){
		if(pic_type==-1 ){
			alert("请选择热点图片！");
			return;
		}else if( $("#img_name").val() == ""){
			alert("请填写热点名称！");
			return ;
		}else if(imgs.length == 0){
			alert("请选择弹出图片！");
			return ;
		}
		var newJson = {};
		if(isEdit){
			newJson = target_hotspot
		}
		newJson['hotspot_imgs'] = imgs;
		newJson['hotspot_style'] = pic_type;
		newJson['hotspot_txt_content'] = null;
		newJson['hotspot_txt_title'] = null;
		newJson['hotspot_type'] = 3;
		newJson['hotspot_url'] = null;
		newJson['k4gid'] = k4id;
		newJson['linkedscene'] = null;
		newJson['linkedscene_img'] = null;
		newJson['linkedscene_name'] = null;
		newJson['name'] = $("#img_name").val();
		newJson['scene_id'] = kid;
		newJson['scene_name'] = null;
		if(isEdit){
			editHotspotsJson(newJson);
			var editTarget = $("#li"+newJson['index_']);
			editTarget.find(".text_in").html(newJson['name']);
			var imgs_ = imgs.split(",");
			for(var i = 0;i<imgs_.length;i++){
				if(imgs_[i]!=""){
					editTarget.find(".pano_pic").attr("src",imgs_[i]);
					break;
				}
			}
			editTarget.find(".icon_hot").find("img").attr("src",workpath + "/asset/panorama/skin/"+newJson['hotspot_style']+".png");
			resetHotspot(newJson);
		}else{
			newJson['id'] = null;
			newJson['index_'] = hotspot_index++;
			newJson['deleted'] = false;
			newJson['ath'] = objget("view.hlookat");
			newJson['atv'] = objget("view.vlookat");
			hotspotsJson.push(newJson);
			initPicture(newJson);
			objcall("show_add_tip(true);");
		}
		jQuery("#li"+newJson['index_']).trigger("click");
		HideModal("#pictureshow_modal");
	}
	
	//添加一个文字热点
	function addType4(){
		if(pic_type==-1 ){
			alert("请选择热点图片！");
			return;
		}else if( $("#txt_title").val() == ""){
			alert("请填写标题！");
			return ;
		}else if( $("#txt_content").val() == ""){
			alert("请填写文字内容！");
			return ;
		}else if( $("#txt_title").val().length>20){
			alert("标题不能超过20个字！");
			return ;
		}
		var newJson = {};
		if(isEdit){
			newJson = target_hotspot
		}
		newJson['hotspot_imgs'] = null;
		newJson['hotspot_style'] = pic_type;
		newJson['hotspot_txt_content'] = $("#txt_content").val();
		newJson['hotspot_txt_title'] = $("#txt_title").val();
		newJson['hotspot_type'] = 4;
		newJson['hotspot_url'] = null;
		newJson['k4gid'] = k4id;
		newJson['linkedscene'] = null;
		newJson['linkedscene_img'] = null;
		newJson['linkedscene_name'] = null;
		newJson['name'] = "";
		newJson['scene_id'] = kid;
		newJson['scene_name'] = null;
		if(isEdit){
			editHotspotsJson(newJson);
			var editTarget = $("#li"+newJson['index_']);
			editTarget.find(".text_in2").html(newJson['hotspot_txt_title']);
			editTarget.find("img").attr("src",workpath + "/asset/panorama/skin/"+newJson['hotspot_style']+".png");
			resetHotspot(newJson);
		}else{
			newJson['id'] = null;
			newJson['index_'] = hotspot_index++;
			newJson['deleted'] = false;
			newJson['ath'] = objget("view.hlookat");
			newJson['atv'] = objget("view.vlookat");
			hotspotsJson.push(newJson);
			initText(newJson);
			objcall("show_add_tip(true);");
		}
		jQuery("#li"+newJson['index_']).trigger("click");
		HideModal("#textinstro_modal");
	}
	
	function resetHotspot(newJson){
		if(newJson['hotspot_style']>50){
			objset("hotspot[hotspot"+newJson['index_']+"].scale",0.5);
			objset("hotspot[hotspot"+newJson['index_']+"].isgif",true);
			objset("hotspot[hotspot"+newJson['index_']+"].url",'%SWFPATH%/skin/'+newJson['hotspot_style']+'_.png');
		}else{
			objset("hotspot[hotspot"+newJson['index_']+"].scale",0.8);
			objset("hotspot[hotspot"+newJson['index_']+"].isgif",false);
			objset("hotspot[hotspot"+newJson['index_']+"].url",'%SWFPATH%/skin/'+newJson['hotspot_style']+'.png');
		}
	}
	
	function addAsset_next(){
		parent.document.getElementById('ajaxStatus.stop').onstop();
		 $('.random_slider').css('width',(104+40)*$('.random_slider .sitem').length);
		$('#random_slider_wrap').niceScroll({ cursorcolor: "#999999"});
	    $('#random_slider_wrap').getNiceScroll().resize();
	    //imgs = target_hotspot.hotspot_imgs;
		var imgs_ = imgs.split(",");
		$("#asset_list .sitem").removeClass("sCur");
		for(var i = 0;i<imgs_.length;i++){
			if(imgs_[i]=="")
				continue;
			var sitem = $("#asset_list img[src^='"+imgs_[i]+"']");
			if(sitem.length==0){
				imgs = target_hotspot.hotspot_imgs.replace(imgs_[i]+",","");
				target_hotspot.hotspot_imgs = imgs;
				editHotspotsJson(target_hotspot);
			}else{
				sitem.closest(".sitem").attr("onoff",true).addClass("sCur");
			}
			
		}
	}
	
	function saveAll(){
		var b = false;
		$(".hotspot_modal").each(function(){
			if($(this).is(":visible")){
				b = true;
				return false;
			}
		});
		if(b){
			alert("请先关闭弹出框!");
			return;
		}
		closeTip();
		for(var i = 0;i<hotspotsJson.length;i++){
			var temp = hotspotsJson[i];
			if(temp.id == null && temp.deleted == true){
				hotspotsJson.del(i);
				i--;
				continue;
			}
				
			if(temp.deleted == false){
				var $ath = objget("hotspot[hotspot"+temp.index_+"].ath");
				var $atv = objget("hotspot[hotspot"+temp.index_+"].atv");
				temp.ath = $ath;
				temp.atv = $atv;
			}
			hotspotsJson[i] = temp;
		}
		var data = JSON.stringify(hotspotsJson);
		saveSetting(data);
	}
	
	function saveAll_next(data){
		if(data == ""){
			alert('保存成功！');
			return;
		}
		var datas = data.split(",");
		for(var j = 0 ;j<datas.length ;j++){
			var temp_ = datas[j];
			if(temp_ == "")
				continue;
			var keys = temp_.split("_");
			for(var i = 0;i<hotspotsJson.length;i++){
				var temp = hotspotsJson[i];
				if(temp.index_ == parseInt(keys[0],10)){
					temp.id = keys[1];
					hotspotsJson[i] = temp;
					break;
				}
			}
		};
		var data = JSON.stringify(hotspotsJson);
		var iframe = $(window.parent.document);
		iframe.find("#hotspot"+kid).val(data);
		alert('保存成功！');
	}
	
	function chooseT(type){
		if(type == 1){
			jQuery("#chooseT2").attr("class","btn btn_default mt20");
			jQuery("#chooseT1").attr("class","btn btn_success")
			objcall("setCutVisible(true);setHotspotVisible(false);");
			jQuery(".hotspot_wrap").hide(); 
			jQuery(".hotspot_modal").hide();
		}else{
			jQuery("#chooseT1").attr("class","btn btn_default");
			jQuery("#chooseT2").attr("class","btn btn_success mt20");
			objcall("setCutVisible(false);setHotspotVisible(true);");
			jQuery(".hotspot_wrap").show(); 
		}
	}
	
	function updateView_before(v,h){
//		alert(v+"++"+h);
//		return;
		updateView(k4id,v,h);
	}
	//looktohotspot();
	//showlog();
	//trace(pot_type);
	//if(	pot_type == 1 ,
	//	trace(a);
	//);
	//if(pot_type == 2 ,
	//	trace(b);
	//);
	//if(pot_type == 3 ,
	//	trace(c);
	//);
	//if(pot_type == 4 ,
	//	trace(d);
	//);
	//if(linkedscene, skin_hidetooltips(); tween(scale,0.25,0.5); tween(oy,-20,0.5); tween(alpha,0,0.5); looktohotspot(); loadscene(get(linkedscene),null,get(skin_settings.loadscene_flags),get(skin_settings.loadscene_blend)); skin_updatescroll(); );

	//distore = true
	
	//szq
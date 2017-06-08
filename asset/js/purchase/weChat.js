function showSettingModal(type){
	if(type == 1){//头部图片
		if($("#topPicCheck").is(':checked')){
			$("#headerModal").modal("show");
		}
	}else if(type == 2){//logo图片
		if($("#logoCheck").is(':checked')){
			$("#logoModal").modal("show");
		}
	}else if(type == 3){//商品名称
		if($("#nameCheck").is(':checked')){
			$("#mallNameChang").val($("#mallNameSpan").html().trim());
			$("#mallNameModal").modal("show");
		}
	}else if(type == 4){//焦点图片
		if($("#bannerCheck").is(':checked')){
			$("#bannerModal").modal("show");
		}
	}else if(type == 5){//焦点图片
		if($("#bgPicCheck").is(':checked')){
			$("#backGroundModal").modal("show");
		}
	}
}

//选中input
function inputCheck(id){
	if(jQuery("#" + id).is(':checked')){
		jQuery("#" + id).iCheck('uncheck');
		if(id == "logoCheck"){
			$('#previewIframe').contents().find("#qyLogo").hide();
			$('#previewIframe').contents().find("#logoimgtop").hide();
		}else if(id == "bannerCheck"){
			$('#previewIframe').contents().find("#buyBanner").hide();
		}else if(id == "nameCheck"){
			$('#previewIframe').contents().find("#purchaseName").hide();
		}
	}else{
		jQuery("#" + id).iCheck('check');
		if(id == "logoCheck"){
			if($("#logoSetHide").val() != ""){
				$('#previewIframe').contents().find("#qyLogo").show();
				$('#previewIframe').contents().find("#logoimgtop").show();
			}
		}else if(id == "bannerCheck"){
			$('#previewIframe').contents().find("#buyBanner").show();
		}else if(id == "nameCheck"){
			$('#previewIframe').contents().find("#purchaseName").show();
		}
	}
}

//删除头部图片
function delHeadImg(obj){
	jQuery(obj).parent().remove();
	if(jQuery("#header-file-block").find("img.scimg").length == 5){
		jQuery("#header-iframe").hide();
	}
	var imgs = "";
	jQuery("#header-file-block").find("img.scimg").each(function(){
		var imgUrl = jQuery(this).attr("src");
		imgs += imgUrl;
	});
	jQuery("#header-iframe").show();
	jQuery("#headImgsHide").val(imgs);
}

//删除logo图片
function delLogoImg(obj){
	jQuery(obj).parent().remove();
	jQuery("#upPicLi").show();
}
//删除北京图片
function delBGImg(obj){
	jQuery(obj).parent().remove();
	jQuery("#upPicLi2").show();
}
//图片上传
function apply(num,obj){
	if(num==1){
		set_upload_param(uploader1, '', false,obj,entId);
	}else if(num==2){
		set_upload_param(uploader2, '', false,obj,entId);
	}
	
}

//展示图片上传
function callback(type){
	if(type == 1){
		var url=$("b1").text();
		$("b1").parent().remove();
		jQuery("#upPicLi").before('<div class="imgdiv"><img class="scimg" src="'+url+'" /><span class="closed" onclick="delLogoImg(this)"></span></div>');
		jQuery("#upPicLi").hide();
	}else{
		var url=$("b2").text();
		$("b2").parent().remove();
		jQuery("#upPicLi2").before('<div class="imgdiv"><img class="scimg" src="'+url+'" /><span class="closed" onclick="delBGImg(this)"></span></div>');
		jQuery("#upPicLi2").hide();
	}
	
}


//头部图片设置保存
function saveTop(){
	var urls = "";
	$("#header-file-block").find("div.imgdiv").each(function(){
		urls += $(this).find("img.scimg").attr("src") + ",";
	});
	urls = urls.substring(0, urls.length-1);
	if(urls == ""){
		alert("请上传头部图片");
	}else{
		$("#topSetHide").val(urls);
		preViewTopSave(urls);
		$("#headerModal").modal('hide');
	}
}
//头部图片取消
function cancleTop(){
	$("#headerModal").modal('hide');
	var urls = $("#topSetHide").val();
	$("#header-file-block").find("div.imgdiv").remove();
	if(urls != ""){
		var urlArr = urls.split(",");
		for(var i=0;i<urlArr.length;i++){
			var url = urlArr[i];
			jQuery('#header-file-block iframe').before('<div class="imgdiv"><img class="scimg" src="'+url+'" /><span class="closed" onclick="delHeadImg(this)"></span></div>');
		}
		preViewTopSave(urls);
	}
}

//logo保存
function saveLogo(){
	var num = $("#logo-file-block").find("div.imgdiv").length;
	if(num == 0){
		alert("请上传LOGO图片");
	}else{
		var url = $("#logo-file-block").find("div.imgdiv").find("img.scimg").attr("src");
		$("#logoSetHide").val(url);
		$("#logoModal").modal('hide');
		preViewLogoSave(url);
	}
}

//logo取消
function cancleLogo(){
	$("#logoModal").modal('hide');
	var url = $("#logoSetHide").val();
	$("#logo-file-block").find("div.imgdiv").remove();
	jQuery("#upPicLi").show();
	if(url != ""){
		jQuery("#upPicLi").before('<div class="imgdiv"><img class="scimg" src="'+url+'" /><span class="closed" onclick="delLogoImg(this)"></span></div>');
		jQuery("#upPicLi").hide();
		preViewLogoSave(url);
	}
}

//banner保存
function saveBanner(){
		var json = '{"banner":[';
		var flag = true;
		$("ul.banner-set-list").find("li").each(function(){
			var img = $(this).find("img.bannerPic").attr("src");
			var url = $(this).find("input.bannerInput").val().trim();
			if(url != "" && img == undefined){
				flag = false;
				return;
			}
			if(img != "" && img != undefined){
				json += '{';
				json += '"banner_img":"' + img + '",';
				json += '"banner_url":"' + url + '"},'
			}
		});
		if(flag == false){
			alert("请为链接添加展示图片");
			return;
		}
		if(json == '{"banner":['){
			json = "";
			$("#bannerSetHide").val(json);
			$("#bannerModal").modal('hide');
			preViewBannerSave(json);
		}else{
			json = json.substring(0, json.length - 1);
			json += ']}';
			$("#bannerSetHide").val(json);
			$("#bannerModal").modal('hide');
			preViewBannerSave(json);
		}
	}
//banner取消
function cancleBanner(){
	$("#bannerModal").modal('hide');
	var url = $("#bannerSetHide").val();
	$("ul.banner-set-list").find("li.bannerLi").each(function(i){
		if(i == 0){
			$(this).find("div.banner-file").removeClass("opc0");
			$(this).find("img.bannerPic").remove();
		}else{
			$(this).remove();
		}
	});
	var bannerJson = $("#bannerSetHide").val();
	if(bannerJson != ""){
		var json = eval("(" + bannerJson + ")");
		var arr = json.banner;
		for(var i=0;i<arr.length;i++){
			var banner = arr[i];
			var img = banner.banner_img;
			var url = banner.banner_url;
			if(i == 0){
				$('#banner-file-block0').addClass('opc0');
				$('#banner-file-block0 iframe').before('<img class="scimg bannerPic" src="'+img+'" />');
				$('#banner-file-block0').next().find("input").val(url);
			}else{
				var _index = $('.banner-set-list li').length;
				//alert(_index+'_index')
				var bannerStr = 
					'<li class="bannerLi">'+
		    			'<p class="banner-name">焦点图'+_index+'</p>'+
		    			'<div class="banner-file opc0" id="banner-file-block'+_index+'" aa="iframe">'+
				    		'<img class="scimg" src="" />'+
				    		'<img class="scimg bannerPic" src="'+img+'" />' +
				    		'<iframe class="icon100" id="banner-iframe'+_index+'" src="/asset/js/ossfileimg/iframefiles.html" name="banner-file-block'+_index+'" frameborder="0"></iframe>'+
				    	'</div>'+
				    	'<div class="item-rt">'+
				    		'<p>跳转链接</p><input type="text" class="form-control bannerInput" value="' +url + '"/><i class="add-banner">添加</i><i class="delete-banner">删除</i>'+
				    	'</div>'+
		    		'</li>';
				//在被选元素之后插入内容
				$('#banner-file-block' + (_index -1)).parent().after(bannerStr);
				$('.banner-set-list li').each(function(index,elem){
					//删除后banner序号重新排序
					$(elem).find('.banner-name').html('焦点图'+index);
				});
			}
		}
		preViewBannerSave(bannerJson);
	}
	$("#bannerModal").modal('hide');
}

//背景保存
function saveBG(){
	var num = $("#bg-file-block").find("div.imgdiv").length;
	if(num == 0){
		alert("请上传背景图片");
	}else{
		var url = $("#bg-file-block").find("div.imgdiv").find("img.scimg").attr("src");
		$("#bgSetHide").val(url);
		$("#backGroundModal").modal('hide');
	}
}

//背景图取消
function cancleBG(){
	$("#backGroundModal").modal('hide');
	var url = $("#bgSetHide").val();
	$("#bg-file-block").find("div.imgdiv").remove();
	jQuery("#upPicLi2").show();
	if(url != ""){
		jQuery("#upPicLi2").before('<div class="imgdiv"><img class="scimg" src="'+url+'" /><span class="closed" onclick="delBGImg(this)"></span></div>');
		jQuery("#upPicLi2").hide();
	}
}

//商城名称保存
function saveMallName(){
	$("#mallNameSpan").html($("#mallNameChang").val().trim());
	if($("#mallNameChang").val().trim() == ""){
		alert("请设置商品名称");
	}
	$('#previewIframe').contents().find("#purchaseName").html($("#mallNameChang").val().trim());
	$("#mallNameModal").modal('hide');
}

function cancleMallName(){
	$("#mallNameChang").val($("#mallNameSpan").html().trim());
	$("#mallNameModal").modal('hide');
}
function homeSaveCheck(){
	//头部设置
	if($("#topPicCheck").is(':checked')){
		$("#homeForm\\:topFlg").val(1);
	}else{
		$("#homeForm\\:topFlg").val(0);
		document.getElementById("productMsg").innerHTML = "请启用头部图片";
		jquery("#myModal").modal('show');
		return;
	}
	if($("#topSetHide").val() == ""){
		 document.getElementById("productMsg").innerHTML = "请设置头部图片";
		jquery("#myModal").modal('show');
		return;
	}
	$("#homeForm\\:topImg").val($("#topSetHide").val());
	//logo设置
	if($("#logoCheck").is(':checked')){
		$("#homeForm\\:logoFlg").val(1);
	}else{
		$("#homeForm\\:logoFlg").val(0);
		document.getElementById("productMsg").innerHTML = "请启用LOGO";
		jquery("#myModal").modal('show');
		return;
	}
	if($("#logoSetHide").val() == ""){
		 document.getElementById("productMsg").innerHTML = "请设置LOGO";
		jquery("#myModal").modal('show');
		return;
	}
	$("#homeForm\\:logoImg").val($("#logoSetHide").val());
	//商城名称
	if($("#nameCheck").is(':checked')){
		$("#homeForm\\:mallNameFlag").val(1);
	}else{
		$("#homeForm\\:mallNameFlag").val(0);
		document.getElementById("productMsg").innerHTML = "请启用商品名称";
		jquery("#myModal").modal('show');
		return;
	}
	$("#homeForm\\:mallName").val($("#mallNameSpan").text());
	
	//banner设置
	if($("#bannerCheck").is(':checked')){
		$("#homeForm\\:bannerFlag").val(1);
	}else{
		$("#homeForm\\:bannerFlag").val(0);
	}
	$("#homeForm\\:bannerImg").val($("#bannerSetHide").val());
	//背景设置
	if($("#bgPicCheck").is(':checked')){
		$("#homeForm\\:backgroundFlag").val(1);
	}else{
		$("#homeForm\\:backgroundFlag").val(0);
	}
	$("#homeForm\\:backgroundImg").val($("#bgSetHide").val());
	
	//分享标题
	var shareTitle = $("#homeShareTile").val().trim();
	//分享描述
	var shareDesc = $("#homeShareDesc").val().trim();
	if(shareTitle == ""){
		 document.getElementById("productMsg").innerHTML = "请设置分享标题";
		jquery("#myModal").modal('show');
		return;
	}
	if(shareDesc.length > 200){
		document.getElementById("productMsg").innerHTML = "分享描述不能大于200字";
		jquery("#myModal").modal('show');
		return;
	}
	$("#homeForm\\:shareTitle").val(shareTitle);
	$("#homeForm\\:shareDescrip").val(shareDesc);
	$("#homeForm\\:tabType").val(0);
	$("#homeForm\\:commit").click();
}
//预览页改变
//头部图片
function preViewTopSave(imgs){
	if(imgs != ""){
		var imgArr = imgs.split(",");
		var childHtml = "";
		for(var i=0; i<imgArr.length; i++){
			var imgUrl = imgArr[i];
			childHtml += '<div class="swiper-slide">'
	            			+ '<a class="imgs-bg" href="javascript:;">'
	    						+ '<img src="' + imgUrl + '" />'
	    					+ '</a>'
	    				+ '</div>';
		}
		//document.getElementById('previewIframe').contentWindow.document.getElementById('detailTop').innerHTML = childHtml;
		jQuery('#previewIframe').contents().find("#detailTop").html(childHtml);
		$('#previewIframe').contents().find("#topImgInit").click();
	}
}

//logo
function preViewLogoSave(img){
	if(img != ""){
		$('#previewIframe').contents().find("#qyLogo").attr("src",img);
		$('#previewIframe').contents().find("#logoimgtop").attr("src",img);
		$('#previewIframe').contents().find("#qyLogo").show();
		$('#previewIframe').contents().find("#logoimgtop").show();
	}else{
		$('#previewIframe').contents().find("#qyLogo").hide();
		$('#previewIframe').contents().find("#logoimgtop").hide();
	}
}

//banner
function preViewBannerSave(bannerJson){
	if(bannerJson != ""){
		var str = '';
		var json = eval("(" + bannerJson + ")");
		var arr = json.banner;
		for(var i=0;i<arr.length;i++){
			var banner = arr[i];
			var img = banner.banner_img;
			str += '<img src="' + img + '" />';
		}
		$('#previewIframe').contents().find("#buyBanner").html(str);
	}else{
		$('#previewIframe').contents().find("#buyBanner").html("");
	}
}

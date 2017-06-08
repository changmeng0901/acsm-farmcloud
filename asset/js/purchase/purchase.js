// JavaScript Document
var $ = jquery.noConflict();
$(function(){
	
	// (1)获取焦点和失去焦点状态
    $("#shareDescription").focus(function(){
        var txt_value = $(this).val();
        if(txt_value=='请输入描述内容'){
            $(this).val("");    
        };  
    });
    $("#shareDescription").blur(function(){
        var txt_value = $(this).val();
        if(txt_value==""){
            $(this).val("请输入描述内容"); 
        };  
    }); 
 // 商品搜索
    $("#searchName").focus(function(){
        var txt_value = $(this).val();
        if(txt_value=='请输入商品名称搜索'){
            $(this).val("");    
        };  
    });
    $("#searchName").blur(function(){
        var txt_value = $(this).val();
        if(txt_value==""){
            $(this).val("请输入商品名称搜索"); 
        };  
    }); 
	// tooltip工具提示
	$("[data-toggle='tooltip']").tooltip(); 
	// 下拉框
	$('.selectpicker').selectpicker();
	//(3)一键购买下的左侧二级菜单
	var menuOnOff = true;
	var oWindowW = $(window).width();
	var oWindowH = $(window).height();

	if( oWindowW < 1280 ){
		$('.panorama_level').hide();
		$('.panorama_content').outerWidth( $('body').width()-77-0 );

		menuOnOff = false;
		
	}else{
		$('.panorama_level').show();
		$('.panorama_content').outerWidth( $('body').width()-77-$('.panorama_level_wap').width()-17);
		menuOnOff = true;	
	}
	$('.collapse_btn').click(function(){
		if( menuOnOff == true ){
			$('.panorama_level').hide();
			$('.panorama_content').addClass('hide_pano');	
			$('.panorama_content').outerWidth( $('body').width()-77-0 );
			menuOnOff = false;	
		}else{
			$('.panorama_level').show();
			$('.panorama_content').outerWidth( $('body').width()-77-$('.panorama_level_wap').width()-17);
			menuOnOff = true;		
		}	
	});
	
	

	
	//(4)计算主体高度及折叠按钮居中
	 var IESpace = 0;//为了解决ie8大屏出滚动条问题，html和body差4PX
	 if( $("html").height() > $("body").height() ){
	 	IESpace	= 4;
	 }else{
	 	IESpace	=0;
	 }
	 $('.panorama_level').css({ 
	 	'min-height' : oWindowH - 60 -IESpace,
	 	     'height' : $('.panorama_content').outerHeight()  -IESpace
	 });
	 // $('.panorama_level').niceScroll({cursorcolor:"#919191",cursorwidth:10,cursoropacitymax:0.7,touchbehavior:false,autohidemode:false}); 
	 $('.panorama_main').css({ 
	 	'min-height' : oWindowH - 60 -IESpace,
	 	    'height' : $('.panorama_content').outerHeight() -IESpace
	 });
	 $(".panorama_nodata").css({
	 	"height" : $(".panorama_main").outerHeight()-45-64-20
	 });
	 if( oWindowH < 400 ){
	 	$('.collapse_btn').css( 'top' , 220 );
	 }else{
	 	$('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + $(window).scrollTop() );	
	 }
	 oWindowH < 500 ? $(".pano_dialog").addClass("pano_top") : 	$(".pano_dialog").removeClass("pano_top");
	
	 if(window.navigator.userAgent.indexOf('MSIE 10.0')!=-1||window.navigator.userAgent.indexOf('rv:11.0')!=-1){
	 	$('.panorama_content').css('margin-bottom', 20);
	 }else{
	 	$('.panorama_content').css('margin-bottom', 0);
	 }
		// alert(window.navigator.userAgent.indexOf('MSIE 10.0'));
	
	//(5)左侧二级导航的选择状态控制
	$(".pano_second .sed_item").each(function(index, elem) {
        $(elem).click(function(){
			$(this).addClass("sed_cur").siblings().removeClass("sed_cur");	
		});
    });
	
	//(11)dragSelect,js需要在其他控件之上
	jQuery('#list_dragselect').orderingList({
		dragSelect: true
	});
	jQuery(".btn-first").text("置顶");
	jQuery(".btn-up").text("向上");
	jQuery(".btn-down").text("向下");
	jQuery(".btn-last").text("置底");    
	
	
	
	
	$(window).resize(function(e) {
		$(document).scrollTop(0);
		//(3)四季田景下的左侧二级菜单
        var menuOnOff = true;
		var oWindowW = $(window).width();
		var oWindowH = $(window).height();
		if( oWindowW < 1280 ){
			$('.panorama_level').hide();
			$('.panorama_content').addClass('hide_pano');	
			$('.panorama_content').outerWidth( $('body').width()-77-0 );
			menuOnOff = false;
			
		}else{
			$('.panorama_level').show();
			$('.panorama_content').removeClass('hide_pano');		
			$('.panorama_content').outerWidth( $('body').width()-77-$('.panorama_level_wap').width() );
			menuOnOff = true;
		}		
		$('.collapse_btn').click(function(){
			if( menuOnOff == true ){
				$('.panorama_level').hide();
				$('.panorama_content').addClass('hide_pano');	
				$('.panorama_content').outerWidth( $('body').width()-77-0 );
				menuOnOff = false;	
			}else{
				$('.panorama_level').show();
				$('.panorama_content').removeClass('hide_pano');	
				$('.panorama_content').outerWidth( $('body').width()-77-$('.panorama_level_wap').width() );
				menuOnOff = true;		
			}	
		});
		
		
		//(4)计算主体高度及折叠按钮居中
		var IESpace = 0; //为了解决ie8大屏出滚动条问题，html和body差4PX
		if( $("html").height() > $("body").height() ){
			IESpace	= 4;
		}else{
			IESpace	=0;
		}
		$('.panorama_level').css({ 
			'min-height' : oWindowH - 60 -IESpace,
				'height' : $('.panorama_content').outerHeight() -IESpace
		});
		$('.panorama_main').css({ 
			'min-height' : oWindowH - 60 -IESpace,
				'height' : $('.panorama_content').outerHeight() -IESpace
		});
		$(".panorama_nodata").css({
			"height" : $(".panorama_main").outerHeight()-45-64-20
		});
		$('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + $(window).scrollTop() );
		if( oWindowH < 400 ){
			$('.collapse_btn').css( 'top' , 220 );
		}else{
			$('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + $(window).scrollTop() );	
		}
		oWindowH < 500 ? $(".pano_dialog").addClass("pano_top") : 	$(".pano_dialog").removeClass("pano_top");
		
    });
	
	
	
	
	$(window).scroll(function(){
		var oWindowH = $(window).height();
		if( oWindowH < 400 ){
			$('.collapse_btn').css( 'top' , 220 );
		}else{
			$('.collapse_btn').css( 'top' , parseInt(oWindowH/2) + $(window).scrollTop() );	
		}
	});
	
	//点击启用按钮给相应赋值
	jQuery('input[class="iCheck"]').on("ifClicked", function(event){
		var id = $(this).attr("id");
		var flag = $(id).attr("checked");
		if(flag){
			$("purchaseProduct\\:"+id+"Hidden").val(1);
		}else{
			$("purchaseProduct\\:"+id+"Hidden").val(0);
		}
	});
	
	//商品回车搜索事件
	$("#searchName").keydown(function(e){
		if(e.keyCode==13){
			var name = $("#searchName").val();
			if(name == "请输入商品名称搜索"){
				name = "";
			}
			searchProductList(name);
		}
	}); 
	//end
	
});

//(8)模态框 列表全选功能
jQuery('input[class="iCheck"]').iCheck({
	checkboxClass: 'icheckbox_minimal-blue'
});
jQuery('input[class="iRadio"]').iCheck({
	radioClass: 'iradio_minimal-blue'
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
		$( obj ).parents( "." + oItems ).remove();
	}
	
	
	
	
    //添加商品model弹出框
	function toAddProduct(){
		/*var productInfoName = $("#productInfoName").val();
		if(productInfoName == "请输入商品名称"){
			productInfoName = "";
		}*/
		findProductInfo("");
	}
	//添加商品modal回调方法
	function toAddProductAfter(){
		$("#addModal").modal("show");

	    $("#productInfoName").focus(function(){
	        var txt_value = $(this).val();
	        if(txt_value=='请输入商品名称'){
	            $(this).val("");    
	        };  
	    });
	    $("#productInfoName").blur(function(){
	        var txt_value = $(this).val();
	        if(txt_value==""){
	            $(this).val("请输入商品名称"); 
	        };  
	    });
	  //回车搜索事件
		jQuery("#productInfoName").keydown(function(e){
			if(e.keyCode==13){
				var productInfoName = $("#productInfoName").val();
				if(productInfoName == "请输入商品名称"){
					productInfoName = "";
				}
				findProductByName(productInfoName);
			}
		}); 
	}

	//图片排序
	function picSort(){
		var url="";
		$("#list_dragselect").find(".pano_pic").each(function(){
			url += $(this).attr("src")+",";
		});
		if(url != ""){
			url = url.substring(0,url.length-1);
		}
		productPicSort(url);
	}
	//图片排序回调
	function picSortComplete(){
		$("#SortModal").modal("hide");
	}
	//商品弹出框选择商品
	function selectProduct(obj){
		$(".goodsDetail").find("li").each(function(){
			if($(this).hasClass("cur")){
				$(this).removeClass("cur");
			}
		});
		$(obj).addClass("cur");
	}
	//选择商品确认框
	function addPurchaseProduct(){
		var productInfoId = "0";
		$(".goodsDetail").find("li").each(function(){
			if($(this).hasClass("cur")){
				productInfoId = $(this).find("#productId").val();
			}
		});
		if(productInfoId == "0"){
			alert("请选择商品！");
			return false;
		}
		$("#addProduct\\:productInfoId").val(productInfoId);
		$("#addProduct\\:addButton").click();
	}
	
	//检测增值服务是否已经购买
	function valueCheck(type){
		var valueServiceType = type;
		var id = "";
		if(valueServiceType == "1"){
			id = "streetFlag";
		}else if(valueServiceType == "2"){
			id = "aerialVideoFlag";
		}else if(valueServiceType == "3"){
			id = "resumeFlag";
		}else if(valueServiceType == "4"){
			id = "farmShowFlag";
		}else if(valueServiceType == "5"){
			id = "freeFreightPriceFlag";
		}
		if($("#"+id).is(':checked')){
			jQuery("#"+id).iCheck('uncheck');
			if(valueServiceType == "1"){
				$("#purchaseProduct\\:krpanosFlagHidden").val(0);
				document.getElementById('myIframe').contentWindow.document.getElementById('k4div').style.display="none";
			}else if(valueServiceType == "2"){
				$("#purchaseProduct\\:aerialVideoFlagHidden").val(0);
				document.getElementById('myIframe').contentWindow.document.getElementById('aeriadiv').style.display="none";
			}else if(valueServiceType == "3"){
				$("#purchaseProduct\\:productRecordFlagHidden").val(0);
				document.getElementById('myIframe').contentWindow.document.getElementById('resume_blockinfo').style.display="none";
			}else if(valueServiceType == "4"){
				$("#purchaseProduct\\:farmShowFlagHidden").val(0);
				document.getElementById('myIframe').contentWindow.document.getElementById('showdiv').style.display="none";
			}else if(valueServiceType == "5"){
				document.getElementById('myIframe').contentWindow.document.getElementById('freeFeright').style.display="none";
				document.getElementById('myIframe').contentWindow.document.getElementById('freight').innerHTML="￥--";
				$("#freight1").html("");
				$("#freight2").html("");
				$("#freight3").hide();
			}
			hideOrShowFarm();
		}else{
			if(valueServiceType == "5"){
				jQuery("#freeFreightPriceFlag").iCheck('check');
				settingFreight();
			}else{
				valueBuyFlag(valueServiceType);
			}
		}
		
	}
	
	//企业logo启用和不启用
	function changeLogo(){
		if($("#logoFlag").is(':checked')){
			jQuery("#logoFlag").iCheck('uncheck');
			$('#myIframe').contents().find("#logodiv").hide();
		}else{
			jQuery("#logoFlag").iCheck('check');
			var img = $('#myIframe').contents().find("#logoimg").attr("src");
			if(img != ""){
				$('#myIframe').contents().find("#logodiv").show();
			}
		}
	}
	//检测增值服务是否购买回调
	function valueCheakComplete(data){
		var strArr = data.split(",");
		var valueServiceType = strArr[0];
		var valueServiceFlag = strArr[1];
		
		if(valueServiceType == "1"){
			if(valueServiceFlag == "0"){
				document.getElementById("productMsg").innerHTML = "请购买增值服务后启用！";
				$("#myModal").modal('show');
				return false;
			}else{
				jQuery("#streetFlag").iCheck('check');
				$("#purchaseProduct\\:krpanosFlagHidden").val(1);
				var krpsrc = $('#myIframe').contents().find("#k4img").attr("src");
				if(krpsrc != ""){
					document.getElementById('myIframe').contentWindow.document.getElementById('k4div').style.display="block";
				}
			}
		}else if(valueServiceType == "2"){
			if(valueServiceFlag == "0"){
				document.getElementById("productMsg").innerHTML = "请购买增值服务后启用！";
				$("#myModal").modal('show');
				return false;
			}else{
				jQuery("#aerialVideoFlag").iCheck('check');
				$("#purchaseProduct\\:aerialVideoFlagHidden").val(1);
				var videosrc = $('#myIframe').contents().find("#aeriaimg").attr("src");
				if(videosrc != ""){
					document.getElementById('myIframe').contentWindow.document.getElementById('aeriadiv').style.display="block";
				}
			}
		}else if(valueServiceType == "3"){
			if(valueServiceFlag == "0"){
				document.getElementById("productMsg").innerHTML = "请购买增值服务后启用！";
				$("#myModal").modal('show');
				return false;
			}else{
				jQuery("#resumeFlag").iCheck('check');
				$("#purchaseProduct\\:productRecordFlagHidden").val(1);
				var recordsrc = $('#resumeImg').attr("src");
				if(recordsrc != ""){
					document.getElementById('myIframe').contentWindow.document.getElementById('resume_blockinfo').style.display="block";
				}
			}
		}else if(valueServiceType == "4"){
			if(valueServiceFlag == "0"){
				document.getElementById("productMsg").innerHTML = "请购买增值服务后启用！";
				$("#myModal").modal('show');
				return false;
			}else{
				jQuery("#farmShowFlag").iCheck('check');
				$("#purchaseProduct\\:farmShowFlagHidden").val(1);
				var showsrc = $('#myIframe').contents().find("#showimg").attr("src");
				if(showsrc != ""){
					document.getElementById('myIframe').contentWindow.document.getElementById('showdiv').style.display="block";
				}
			}
		}
		hideOrShowFarm();
	}
	
	//点击设置校验
	function checkEnabled(type){
		if(type == 1){
			if($("#streetFlag").is(':checked')){
				findKrpanosGroup();
			}
		}else if(type == 2){
			if($("#aerialVideoFlag").is(':checked')){
				searchAerialVideoGroupList();
			}
		}else if(type == 3){
			if($("#resumeFlag").is(':checked')){
				searchPhoneModelInfoList();
			}
		}else if(type == 4){
			if($("#farmShowFlag").is(':checked')){
				searchPropagandasList();
			}
		}else if(type == 5){
			if($("#farmMapFlag").is(':checked')){
				$("#GroupModal").modal("show");
			}
		}else if(type == 6){
			if($("#freeFreightPriceFlag").is(':checked')){
				$("#FreightModal").modal("show");
			}
		}
	}

	//农场地图启用或者不启用
	function changeMapFlag(){
		if($("#farmMapFlag").is(':checked')){
			var x = document.getElementById('myIframe').contentWindow.document.getElementById('coordinateX').value;
			var y = document.getElementById('myIframe').contentWindow.document.getElementById('coordinateY').value;
			if(x != "" && y != ""){
				document.getElementById('myIframe').contentWindow.document.getElementById('mapdiv').style.display="block";
				//document.getElementById('myIframe').contentWindow.document.getElementById('mapdiv').setAttribute=("class","show");
			}
		}else{
			document.getElementById('myIframe').contentWindow.document.getElementById('mapdiv').style.display="none";
		}
	}
	//点击设置回调方法
	function modelShow(type){
		if(type == 1){
			$("#LandscapeModal").modal("show");
		}else if(type == 2){
			$("#AerialModal").modal("show");
		}else if(type == 3){
			$("#resumeModal").modal("show");
		}else if(type == 4){
			$("#farmShowModal").modal("show");
		}else if(type == 5){
			$("#GroupModal").modal("show");
		}
		$('.selectpicker').selectpicker();
	}
	
	//校验是否输入的数字
	function numberCheck(obj){
		var a = $(obj).val();
		if(isNaN(a)){
			alert("只能输入数字！");
			$(obj).val("");
			return false;
		}
	}
	
	//设置运费确定按钮
	function settingFreight(){
		var freight = $("#setFreight").val();
		var freeFreight = $("#setFreeFreight").val();
		var freeFreightFlag = $("#setFreeFreightFlag").is(':checked');
		$("#purchaseProduct\\:ferightHidden").val(freight);
		$("#purchaseProduct\\:freeFerightHidden").val(freeFreight);
		if(freeFreightFlag){
			$("#purchaseProduct\\:freeFerightFlagHidden").val("1");
			$("#freight1").html("--");
			$("#freight2").hide();
			$("#freight3").html("包邮");
			$("#freight3").show();
		}else{
			if(freight == "" || freight == "0" || freight == "0.0" || freeFreight == "0" || freeFreight == "0.0"){
				$("#freight1").html("--");
				$("#freight2").hide();
				$("#freight3").html("包邮");
				$("#freight3").show();
			}else{
				$("#purchaseProduct\\:freeFerightFlagHidden").val("0");
				$("#freight1").show();
				$("#freight2").show();
				$("#freight3").hide();
				if(freight != "" ){
					$("#freight1").html(freight);
				}else{
					$("#freight1").html(freight);
				}
				if(freeFreight != "" && freeFreight != "0" && freeFreight != "0.0"){
					$("#freight2").html("需满￥" + freeFreight + "包邮");
				}else if(freeFreight == "0"){
					$("#freight1").html("--");
					$("#freight2").hide();
					$("#freight3").html("包邮");
					$("#freight3").show();
				}else{
					$("#freight2").html("");
				}
			}
		}
		
		
		//实时预览
		if(freeFreightFlag || freight == "0" || freight == "0.0" || freight == "" || freeFreight == "0" || freeFreight == "0.0"){
			 document.getElementById('myIframe').contentWindow.document.getElementById('freeFerightFlag').style.display="block";
		}else{
			document.getElementById('myIframe').contentWindow.document.getElementById('freeFerightFlag').style.display="none";
			if(freeFreight != ""){
				document.getElementById('myIframe').contentWindow.document.getElementById('freeFeright').style.display="block";
				document.getElementById('myIframe').contentWindow.document.getElementById('freeFeright').innerHTML="需满"+freeFreight+"元包邮";
			}else{
				document.getElementById('myIframe').contentWindow.document.getElementById('freeFeright').style.display="none";
			}
		}
		
		if(!freeFreightFlag && freight != "" && freight != "0" && freight != "0.0" && freeFreight != "0" && freeFreight != "0.0"){
			document.getElementById('myIframe').contentWindow.document.getElementById('freight').innerHTML="￥"+freight;
		}else{
			document.getElementById('myIframe').contentWindow.document.getElementById('freight').innerHTML="￥--";
			document.getElementById('myIframe').contentWindow.document.getElementById('freeFeright').style.display="none";
		}
		$("#FreightModal").modal("hide");
	}
	
	
	//展示图片上传
	function callback(){
		var url=$("b1").text();
		//var honorFile=$("#productPicName").text();
		$("b1").parent().remove();
		var productUrls = "";
		$("img[class='productImg']").each(function(){
			productUrls += $(this).attr("src")+",";
		});
		productUrls += url;
		productImgUp(productUrls);
	}
	
	//删除图片
	function delProductImg(aindex){
		var productUrls = "";
		$("img[class='productImg']").each(function(){
			productUrls += $(this).attr("src")+",";
		});
		if(productUrls!=""){
			productUrls=productUrls.substring(0, productUrls.length);
		}
		productImgDel(aindex,productUrls);
	}
	
	//上传图片回调
	function productPicComplete(data){
		var urlArr = data.split(",");
		var a = urlArr.length;
		if(urlArr.length >=5){
			$("#upPicLi").hide();
		}else{
			$("#upPicLi").show();
		}
		var imgList = "";
		if(data == ""){
			imgList = "<div class='swiper-slide'><a href='javascript:void(0)'><img src='/asset/images/purchase/productNoImg.png' /></a></div>";
		}else{
			for(var i=0;i<urlArr.length;i++){
				imgList += "<div class='swiper-slide'><img src='"+urlArr[i]+"' /></div>";
			}
		}
		document.getElementById('myIframe').contentWindow.document.getElementById('imgdiv').innerHTML=imgList;
		$('#myIframe').contents().find("#imgButton").click();
	}
	
	function callback2(){
		var url=$("b2").text();
		$("b2").parent().remove();
		krpanosPicUp(url);
	}
	function callback3(){
		var url=$("b3").text();
		$("b3").parent().remove();
		aerialVideoPicUp(url);
	}
	function callback4(){
		var url=$("b4").text();
		$("b4").parent().remove();
		phoneModelInfoPicUp(url);
	}
	function callback5(){
		var url=$("b5").text();
		$("b5").parent().remove();
		farmShowPicUp(url);
	}
	
	//删除图片
	function delPic(type){
		if(type == 2){
			krpanosPicDel();
		}else if(type == 3){
			aerialVideoPicDel();
		}else if(type == 4){
			phoneModelInfoPicDel();
		}else if(type == 5){
			farmShowPicDel();
		}
	}
	
	//四季田景确认
	function krpanosConfirm(){
		var krpanosGroupId = $("#krpanosGroupSelect").val();
		var krpanosImg = $("#krpanosImg");
		if( krpanosGroupId == "-1"){
			alert("请选择四季田景分组！");
			return false;
		}
		if( krpanosImg.attr("src") == ""){
			alert("图片不能为空！");
			return false;
		}
		$("#purchaseProduct\\:krpanosGroupIdHidden").val(krpanosGroupId);
		$("#purchaseProduct\\:krpanosImageUrlHidden").val(krpanosImg.attr("src"));
		//实时预览
		document.getElementById('myIframe').contentWindow.document.getElementById('k4div').style.display="block";
		document.getElementById('myIframe').contentWindow.document.getElementById('k4img').src=krpanosImg.attr("src");
		$("#LandscapeModal").modal("hide");
	}
	
	//航拍视频确认
	function aerialConfirm(){
		var aerialVideoId = $("#aerialVideoSelect").val();
		var aerialVideoImg = $("#aerialVideoImg");
		if( aerialVideoId == "-1"){
			alert("请选择航拍视频分组！");
			return false;
		}
		if( aerialVideoImg.attr("src") == ""){
			alert("图片不能为空！");
			return false;
		}
		$("#purchaseProduct\\:aerialVideoIdHidden").val(aerialVideoId);
		$("#purchaseProduct\\:aerialVideoImageUrlHidden").val(aerialVideoImg.attr("src"));
		//实时预览
		document.getElementById('myIframe').contentWindow.document.getElementById('aeriadiv').style.display="block";
		document.getElementById('myIframe').contentWindow.document.getElementById('aeriaimg').src=aerialVideoImg.attr("src");
		$("#AerialModal").modal("hide");
	}
	
	//履历确认
	function resumeConfirm(){
		var resumeId = $("#resumeSelect").val();
		var resumeImg = $("#resumeImg");
		if( resumeId == "-1"){
			alert("请选择履历！");
			return false;
		}
		if( resumeImg.attr("src") == ""){
			alert("图片不能为空！");
			return false;
		}
		$("#purchaseProduct\\:productRecordIdHidden").val(resumeId);
		$("#purchaseProduct\\:phoneModelInfoImageUrlHidden").val(resumeImg.attr("src"));
		//实时预览
		document.getElementById('myIframe').contentWindow.document.getElementById('resume_blockinfo').style.display="block";
		$("#resumeModal").modal("hide");
	}
	
	
	//农场秀确认
	function farmShowConfirm(){
		var farmShowId = $("#farmShowSelect").val();
		var farmShowImg = $("#farmShowImg");
		if( farmShowId == "-1"){
			alert("请选择农场名片！");
			return false;
		}
		if( farmShowImg.attr("src") == ""){
			alert("图片不能为空！");
			return false;
		}
		$("#purchaseProduct\\:farmShowIdHidden").val(farmShowId);
		$("#purchaseProduct\\:farmShowImgUrlHidden").val(farmShowImg.attr("src"));
		//实时预览
		document.getElementById('myIframe').contentWindow.document.getElementById('showdiv').style.display="block";
		document.getElementById('myIframe').contentWindow.document.getElementById('showimg').src=farmShowImg.attr("src");
		$("#farmShowModal").modal("hide");
	}
	//农场地图确认
	function farmMapConfirm(){
		var farmMapId = $("#farmMapSelect").val();
		if( farmMapId == "-1"){
			alert("请选择农场地图！");
			return false;
		}
		$("#purchaseProduct\\:farMapIdHidden").val(farmMapId);
		searchFarmMap(farmMapId);
	}
	//选择地图回调
	function farmMapConfirmComplete(data){
		$("#GroupModal").modal("hide");
		document.getElementById('myIframe').contentWindow.document.getElementById('coordinateX').value=data[0];
		document.getElementById('myIframe').contentWindow.document.getElementById('coordinateY').value=data[1];
		$('#myIframe').contents().find("#mapButton").click();
		document.getElementById('myIframe').contentWindow.document.getElementById('mapdiv').style.display="block";
		$('#myIframe').contents().find("#mapButton").click();
	}
	//选择航拍视频
	function selectChange(obj,type){
		var id = $(obj).val();
		if(id == "-1"){
			$("#pic"+type).hide();
			$("#filing"+type).show();
		}else{
			if(type == 2){
				selectKrpanosGroup(id);
				
			}else if(type == 3){
				selectAeriaVideo(id);
			}else if(type == 4){
				selectResume(id);
			}else if(type == 5){
				selectPropaganda(id);
			}
		}
	}
	
	//上传四季田景图片后调
	function upPicComplete(type){
		if(type == 2){
			$("#filing2").hide();
		}else if(type == 3){
			$("#filing3").hide();
		}else if(type == 4){
			$("#filing4").hide();
		}else if(type == 5){
			$("#filing5").hide();
		}
		
	}
	//上传四季田景图片后调
	function delPicComplete(type){
		if(type == 2){
			$("#filing2").show();
		}else if(type == 3){
			$("#filing3").show();
		}else if(type == 4){
			$("#filing4").show();
		}else if(type == 5){
			$("#filing5").show();
		}
	}
	
	//选择分组回调
	function selectChangeComplete(type){
		if(type == 2){
			$("#filing2").hide();
		}else if(type == 3){
			$("#filing3").hide();
		}else if(type == 4){
			$("#filing4").hide();
		}else if(type == 5){
			$("#filing5").hide();
		}
	}
	
	
	//编辑保存
	function checkSave(){
		var displayName = $("#displayName").val();
		var purchasePrice = $("#purchasePrice").val();
		var province = $("#provienceSelect").val();
		var productUrls = "";
		var introduction = $("#profile").find(".ke-edit-iframe ").contents().find(".ke-content").html();
		var farmIntroduction = $("#farmfile").find(".ke-edit-iframe ").contents().find(".ke-content").html();
		//var introduction = document.getElementsByClassName('ke-edit-iframe').contentWindow.document.getElementsByTagName("body").innerHTML;
		var id = $("#purchaseProductId").val();
		var idhide = $("#purchaseProduct\\:purchaseProductIdHidden").val();
		$("img[class='productImg']").each(function(){
			productUrls += $(this).attr("src")+",";
		});
		if(productUrls!=""){
			productUrls=productUrls.substring(0, productUrls.length);
		}
		var optionSelect = $("#optionSelect").val();
		var productIds = "";
		if(optionSelect == null){
			productIds = "";
		}else{
			for(var i=0;i<optionSelect.length;i++){
				productIds += optionSelect[i] + ",";
			}
		}
		if(productIds != ""){
			productIds = productIds.substring(0, productIds.length-1);
		}
		
		var farmMapFlag;
		if($("#farmMapFlag").is(':checked')){
			farmMapFlag = 1;
		}else{
			farmMapFlag = 0;
		}
		var logoFlag;
		if($("#logoFlag").is(':checked')){
			logoFlag = 1;
		}else{
			logoFlag = 0;
		}
		var frieghtFlag;
		if($("#freeFreightPriceFlag").is(':checked')){
			frieghtFlag = 1;
		}else{
			frieghtFlag = 0;
		}
		var notifyRecipientsFlag;
		if($("#notifyRecipientsFlag").is(':checked')){
			notifyRecipientsFlag = 1;
		}else{
			notifyRecipientsFlag = 0;
		}
		var shareTitle = $("#shareTitle").val();
		var shareDescription = $("#shareDescription").val();
		//展示名称
		if(displayName == ""){
			document.getElementById("productMsg").innerHTML = "请填写展示名称！";
			$("#myModal").modal('show');
			return false;
		}else{
			$("#purchaseProduct\\:displayNameHidden").val(displayName);
		}
		//价格
		if(purchasePrice == "" ){
			document.getElementById("productMsg").innerHTML = "请输入价格";
			$("#myModal").modal('show');
			return false;
		}else{
			$("#purchaseProduct\\:purchasePriceHidden").val(purchasePrice);
		}
		
		//分享标题
		if(shareTitle == "" ){
			document.getElementById("productMsg").innerHTML = "请输入分享标题";
			$("#myModal").modal('show');
			return false;
		}else{
			if(shareTitle.length > 15){
				document.getElementById("productMsg").innerHTML = "分享标题不能大于15字";
				$("#myModal").modal('show');
				return false;
			}else{
				$("#purchaseProduct\\:shareTitleHidden").val(shareTitle);
			}
		}
		if(shareDescription == "请输入描述内容"){
			shareDescription = "";
		}
		if(shareDescription.length > 30){
			document.getElementById("productMsg").innerHTML = "分享描述不能大于30字";
			$("#myModal").modal('show');
			return false;
		}
		var k4Flag = 0;
		if($("#streetFlag").is(':checked')){
			k4Flag = 1;
		}
		var aerialVideoFlag = 0;
		if($("#aerialVideoFlag").is(':checked')){
			aerialVideoFlag = 1;
		}
		var resumeFlag = 0;
		if($("#resumeFlag").is(':checked')){
			resumeFlag = 1;
		}
		var farmShowFlag = 0;
		if($("#farmShowFlag").is(':checked')){
			farmShowFlag = 1;
		}
		var farmMapFlag = 0;
		if($("#farmMapFlag").is(':checked')){
			farmMapFlag = 1;
		}
		var logoFlag = 0;
		if($("#logoFlag").is(':checked')){
			logoFlag = 1;
		}
		var freeFreightPriceFlag = 0;
		if($("#freeFreightPriceFlag").is(':checked')){
			freeFreightPriceFlag = 1;
		}
		var setFreeFreightFlag = 0;
		if($("#setFreeFreightFlag").is(':checked')){
			setFreeFreightFlag = 1;
		}
		var notifyRecipientsFlag = 0;
		if($("#notifyRecipientsFlag").is(':checked')){
			notifyRecipientsFlag = 1;
		}
		//商品图片
		$("#purchaseProduct\\:purchaseImgUrlsHidden").val(productUrls);
		$("#purchaseProduct\\:optionProductsHidden").val(productIds);
		$("#purchaseProduct\\:farmMapFlagHidden").val(farmMapFlag);
		$("#purchaseProduct\\:logoFlagHidden").val(logoFlag);
		$("#purchaseProduct\\:ferightFlagHidden").val(frieghtFlag);
		$("#purchaseProduct\\:notifyRecipientsFlagHidden").val(notifyRecipientsFlag);
		$("#purchaseProduct\\:shareDecsriptHidden").val(shareDescription.replace(/[\n]/g,"</br>"));
		$("#purchaseProduct\\:purchaseIntroductionHidden").val(introduction);
		$("#purchaseProduct\\:farmIntroductionHidden").val(farmIntroduction);
		$("#purchaseProduct\\:krpanosFlagHidden").val(k4Flag);
		$("#purchaseProduct\\:aerialVideoFlagHidden").val(aerialVideoFlag);
		$("#purchaseProduct\\:productRecordFlagHidden").val(resumeFlag);
		$("#purchaseProduct\\:farmShowFlagHidden").val(farmShowFlag);
		$("#purchaseProduct\\:farmMapFlagHidden").val(farmMapFlag);
		$("#purchaseProduct\\:logoFlagHidden").val(logoFlag);
		$("#purchaseProduct\\:freeFreightPriceFlag").val(freeFreightPriceFlag);
		$("#purchaseProduct\\:freeFerightFlagHidden").val(setFreeFreightFlag);
		$("#purchaseProduct\\:notifyRecipientsFlagHidden").val(notifyRecipientsFlag);
		$("#purchaseProduct\\:provinceHidden").val(province);
		//是否上下架标识
		var upFlag = $("#upFlag").val();
		if(upFlag == "true"){
			if(introduction == ""){
				document.getElementById("productMsg").innerHTML = "已上架商品简介不能为空";
				$("#myModal").modal('show');
				return false;
			}
			if(productUrls == ""){
				document.getElementById("productMsg").innerHTML = "已上架商品展示图片不能为空";
				$("#myModal").modal('show');
				return false;
			}
			if(frieghtFlag == 0){
				document.getElementById("productMsg").innerHTML = "已上架商品运费必须设置";
				$("#myModal").modal('show');
				return false;
			}
			//产地
			if(province == "0" ){
				document.getElementById("productMsg").innerHTML = "已上架商品产地必须设置";
				$("#myModal").modal('show');
				return false;
			}else{
				$("#purchaseProduct\\:provinceHidden").val(province);
			}
		}
		var bol = confirm("确定保存？");
		if(bol){
			$("#purchaseProduct\\:saveButton").click();
		}
		
	}
	
	//商品上架
	function checkProductUp(){
		var productId = $("#purchaseProduct\\:purchaseProductIdHidden").val();
		checkProduct(productId);
	}
	//商品上架回调
	function checkProductUpComplete(mesg){
		if(mesg != "ok"){
			document.getElementById("productMsg").innerHTML = mesg;
			$("#myModal").modal('show');
			return false;
		}else{
			checkOrderSetting();
		}
	}
	
	//商品上架确认
	function upFlame(){
		var bol = confirm("确定上架？");
		if(bol){
			$("#upFrame\\:upFrameFlagHidden").val(1);
			$("#upFrame\\:upOrDownButton").click();
		}
	}
	//商品上架订单状态校验
	function checkOrderStatus(data){
		if(data != "ok"){
			$("#orderMesg").html = data;
			$("#shelfModal").modal('show');
		}else{
			upFlame();
		}
	}
	function upProduct(){
		$("#upFrame\\:upFrameFlagHidden").val(1);
		$("#upFrame\\:upOrDownButton").click();
		$("#shelf").modal(hide);
	}
	//商品下架
	function productDown(){
		$("#upFrame\\:upFrameFlagHidden").val(0);
		var bol = confirm("确定下架？");
		if(bol){
			$("#upFrame\\:upOrDownButton").click();
		}
	}
	//可选商品选择
	function optionProductChange(){
		var productIds = "";
		var optionProductIds = $("#optionSelect").val();
		if(optionProductIds == null){
			productIds = "";
		}else{
			for(var i=0;i<optionProductIds.length;i++){
				productIds += optionProductIds[i] + ",";
			}
		}
		if(productIds != ""){
			productIds = productIds.substring(0, productIds.length-1);
		}
		selectOptionProduct(productIds);
	}
	
	//赋值按钮
	function jsCopy(){
		var url = document.getElementById("shareUrl");
		url.select();
		document.execCommand("Copy");
		alert("已复制链接！");
	}
	
	//评论弹出页
	function commentButton(){
		searchComment("请输入评论内容",-1);
	}
	//评论弹出框回调
	function commentButtonComplete(){
		$("#CommentModal").modal('show');
		$("#productCommentId").focus(function(){
	        var txt_value = $(this).val();
	        if(txt_value=='请输入评论内容'){
	            $(this).val("");    
	        };  
	    });
	    $("#productCommentId").blur(function(){
	        var txt_value = $(this).val();
	        if(txt_value==""){
	            $(this).val("请输入评论内容"); 
	        };  
	    });
	  //回车搜索事件
		$("#productCommentId").keydown(function(e){
			if(e.keyCode==13){
				searchByCondition();
			}
		}); 
		// (8)模态框 列表全选功能
		jQuery('input[class="iCheck"]').iCheck({
			checkboxClass: 'icheckbox_minimal-blue'
		});
		jQuery('input[class="iRadio"]').iCheck({
			radioClass: 'iradio_minimal-blue'
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
		$('.selectpicker').selectpicker();
	}
	
	//评论搜索
	function searchByCondition(){
		var comments = $("#productCommentId").val();
		var commentLevel = $("#commentLevel").val();
		searchCommentByName(comments,commentLevel,"1");
	}
	//评论分页查询
	function queryPage(page){
		var comments = $("#productCommentId").val();
		var commentLevel = $("#commentLevel").val();
		searchCommentByName(comments,commentLevel,page);
	}
	//实时预览
	function change(pid,cid){
		var val = $("#"+pid).val();
	 document.getElementById('myIframe').contentWindow.document.getElementById(cid).innerHTML = val;
	}
	
	//(9)评论管理删除及批量删除
	function delComment( obj , oParent ){
		var id = $( obj ).parents( oParent ).find("input[class='commentId']").val();	
		deleteComment(id);
	}
	function deleteCommentAll( ){
		//$( obj ).parents(oParent).find("input[itembb=checked]").parents( oItems ).remove();	
		var commentId = "";
		$("#commentTable").find("tr[name='commenttb']").each(function(){
			var a = $(this).find('input[itembb]').is(':checked');
			if(a){
				var id = $(this).find("input[class='commentId']").val();
				commentId += id;
				commentId += ",";
			}
		});
		if(commentId == ""){
			alert("请选择要删除的评论");
			return false;
		}else{
			commentId = commentId.substring(0, commentId.length-1);
			deleteComment(commentId);
		}
	}
	
	
	//删除一键购买商品
	function delPurchase(){
		var id = $("#purchaseProduct\\:purchaseProductIdHidden").val();
		var bol = confirm("确定删除？");
		if(bol){
			purchaseDelete(id);
		}
		
	}
	
	//商品搜索
	function productSearch(){
		var name = $("#searchName").val();
		if(name == "请输入商品名称搜索"){
			name = "";
		}
		searchProductList(name);
	}
	
	//添加商品时搜索
	function toAddProductSearch(){
		var productInfoName = $("#productInfoName").val();
		if(productInfoName == "请输入商品名称"){
			productInfoName = "";
		}
		findProductByName(productInfoName);
	}
	
	//商品列表点击事件
	function toRedirect(obj){
		var src = $(obj).parent().attr("href");
		window.location.href = src;
	}
//搜索商品回调
	function searchProductListComplete(data){
		var a = data.length;
		if(a == 0){
			$("#noPurchaseListDiv").show();
			$("#purchaseListDiv").hide();
		}else{
			$("#noPurchaseListDiv").hide();
			$("#purchaseListDiv").show();
		}
	}
	
	//控制农场风光是否显示
	function hideOrShowFarm(){
		var k4Flag = 0;
		if($("#streetFlag").is(':checked')){
			k4Flag = 1;
		}
		var aerialVideoFlag = 0;
		if($("#aerialVideoFlag").is(':checked')){
			aerialVideoFlag = 1;
		}
		var farmShowFlag = 0;
		if($("#farmShowFlag").is(':checked')){
			farmShowFlag = 1;
		}
		if(k4Flag == 1 || aerialVideoFlag == 1 || farmShowFlag == 1){
			document.getElementById('myIframe').contentWindow.document.getElementById('farmTitle').style.display="block";
		}else{
			document.getElementById('myIframe').contentWindow.document.getElementById('farmTitle').style.display="none";
		}
	}
	
	function provinceChange(obj){
		var province = $(obj).next().find(".filter-option").text();
		if(province == "请选择"){
			province = "--";
		}
		 document.getElementById('myIframe').contentWindow.document.getElementById("province").innerHTML = province;
	}
	var iframeSearch = location.search.split('&'),
		weixin_info = '',
		cookieinfo = '',
		getEnterpriseId = '',
		getMemberInfo = '';
	ResizeSize();
	
	//初始化判断是否登录过，登录过的话，就可以获取到企业ID等信息
	cookieinfo = getCookie("weixin_info_pay");
	if( cookieinfo != ''  && cookieinfo != null ){
		cookieinfo = base64decode(cookieinfo);
		cookieinfo = utf8to16(cookieinfo);
		weixin_info = JSON.parse( cookieinfo );//解析出json 对象
		getEnterpriseId = weixin_info.enterprise_info_id;
	    getMemberInfo = weixin_info.member_info_id;
	}else{
		getEnterpriseId = iframeSearch[0].split('=')[1];
		window.location.href= '/purchase/weChatBuy.html?enterprise_info_id='+getEnterpriseId;
	}
	
	//从cookie=中获取到背景图
	var bgcookie = getCookie('background_img');
	var bgimg = JSON.parse(bgcookie).bgimg;
	var logo = JSON.parse(bgcookie).logo;
	//如果没有logo，则显示默认图
	if( logo == '' || logo == undefined ){
		$('#returnHome img').attr('src','');
		$('#returnHome img').hide();
	}else{
		$('#returnHome img').attr('src',logo);
		$('#returnHome img').show();
	}
	
	//如果没有背景图，则显示默认图
	if( bgimg == '' || bgimg == undefined ){
		bgimg = '../../../asset/images/purchase/weChatBuy_defaultpic.jpg';
	}else{
		bgimg = bgimg+'@640w_350h_1e_1c.src';
	}
	$('#buyBanner img').attr('src',bgimg);
	
	//首页
	$('#returnHome').click(function(){
		window.location.href = '/purchase/weChatBuy.html?enterprise_info_id='+getEnterpriseId;
	});
	
	//我的记录
	$('#enterRecord').click(function(){
		window.location.reload();
	});
	
	//我的订单
	$('#myOrder').click(function(){
		window.location.href = 'MyOrder.html?enterprise_info_id='+getEnterpriseId+'&member_info='+getMemberInfo+'&order_status=1';
	});
	
	//我的红包
	$('#myRedpacket ').click(function(){
		window.location.href = 'MyPacket.html?enterprise_info_id='+getEnterpriseId+'&member_info='+getMemberInfo+'&order_status=1';
	});
	
	//修改手机号码
	$('#modifyhmEntry').click(function(){
		window.location.href = 'weChatModifyPhone.html?enterprise_info_id='+getEnterpriseId;
	});
	
	//退出登录,点击返回首页，并清除cookie
	$('#logOut').click(function(){
		setCookie("weixin_info_pay","");
		setCookie("background_img","");
		cookieinfo = '';
		window.location.href = '/purchase/weChatBuy.html?enterprise_info_id='+getEnterpriseId;
	});
	
	$(window).resize(function(){
		ResizeSize();
	});
	
//判断用户是否是用微信浏览器
function isWeiXin(){
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		return true;
	}else{
		return false;
	}
}
	//计算字号
	function ResizeSize (){
		var w = window.screen.width;
		var target_w = 640;
		var _scale = w/target_w;
		$('#MetaID').attr('content','width=640px,user-scalable=no,initial-scale='+_scale+', minimum-scale='+_scale+', maximum-scale='+_scale)
	}


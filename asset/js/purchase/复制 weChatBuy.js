	var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";  
	var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);  
	/** 
	 * base64编码 
	 * @param {Object} str 
	 */  
	function base64encode(str){  
		var out, i, len;  
		var c1, c2, c3;  
		len = str.length;  
		i = 0;  
		out = "";  
		while (i < len) {  
			c1 = str.charCodeAt(i++) & 0xff;  
			if (i == len) {  
				out += base64EncodeChars.charAt(c1 >> 2);  
				out += base64EncodeChars.charAt((c1 & 0x3) << 4);  
				out += "==";  
				break;  
			}  
			c2 = str.charCodeAt(i++);  
			if (i == len) {  
				out += base64EncodeChars.charAt(c1 >> 2);  
				out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));  
				out += base64EncodeChars.charAt((c2 & 0xF) << 2);  
				out += "=";  
				break;  
			}  
			c3 = str.charCodeAt(i++);  
			out += base64EncodeChars.charAt(c1 >> 2);  
			out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));  
			out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));  
			out += base64EncodeChars.charAt(c3 & 0x3F);  
		}  
		return out;  
	}
	/** 
	 * base64解码 
	 * @param {Object} str 
	 */  
	function base64decode(str){  
		var c1, c2, c3, c4;  
		var i, len, out;  
		len = str.length;  
		i = 0;  
		out = "";  
		while (i < len) {  
			/* c1 */  
			do {  
				c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];  
			}  
			while (i < len && c1 == -1);  
			if (c1 == -1)   
				break;  
			/* c2 */  
			do {  
				c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];  
			}  
			while (i < len && c2 == -1);  
			if (c2 == -1)   
				break;  
			out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));  
			/* c3 */  
			do {  
				c3 = str.charCodeAt(i++) & 0xff;  
				if (c3 == 61)   
					return out;  
				c3 = base64DecodeChars[c3];  
			}  
			while (i < len && c3 == -1);  
			if (c3 == -1)   
				break;  
			out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));  
			/* c4 */  
			do {  
				c4 = str.charCodeAt(i++) & 0xff;  
				if (c4 == 61)   
					return out;  
				c4 = base64DecodeChars[c4];  
			}  
			while (i < len && c4 == -1);  
			if (c4 == -1)   
				break;  
			out += String.fromCharCode(((c3 & 0x03) << 6) | c4);  
		}  
		return out;  
	}  
	/** 
	 * utf16转utf8 
	 * @param {Object} str 
	 */  
	function utf16to8(str){  
		var out, i, len, c;  
		out = "";  
		len = str.length;  
		for (i = 0; i < len; i++) {  
			c = str.charCodeAt(i);  
			if ((c >= 0x0001) && (c <= 0x007F)) {  
				out += str.charAt(i);  
			}  
			else   
				if (c > 0x07FF) {  
					out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));  
					out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));  
					out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));  
				}  
				else {  
					out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));  
					out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));  
				}  
		}  
		return out;  
	}  
	/** 
	 * utf8转utf16 
	 * @param {Object} str 
	 */  
	function utf8to16(str){  
		var out, i, len, c;  
		var char2, char3;  
		out = "";  
		len = str.length;  
		i = 0;  
		while (i < len) {  
			c = str.charCodeAt(i++);  
			switch (c >> 4) {  
				case 0:  
				case 1:  
				case 2:  
				case 3:  
				case 4:  
				case 5:  
				case 6:  
				case 7:  
					// 0xxxxxxx  
					out += str.charAt(i - 1);  
					break;  
				case 12:  
				case 13:  
					// 110x xxxx 10xx xxxx  
					char2 = str.charCodeAt(i++);  
					out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));  
					break;  
				case 14:  
					// 1110 xxxx10xx xxxx10xx xxxx  
					char2 = str.charCodeAt(i++);  
					char3 = str.charCodeAt(i++);  
					out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));  
					break;  
			}  
		}  
		return out;  
	} 

	//------------------------cookie相关
	function getCookie(c_name){
		if (document.cookie.length>0){
			c_start=document.cookie.indexOf(c_name + "=")
			if (c_start!=-1){ 
				c_start=c_start + c_name.length+1 
				c_end=document.cookie.indexOf(";",c_start)
				if (c_end==-1) c_end=document.cookie.length
				return unescape(document.cookie.substring(c_start,c_end))
			} 
		}
		return ""
	}
	
	function setCookie(c_name,value,expiredays){
		var exdate=new Date()
		exdate.setDate(exdate.getDate()+expiredays)
		document.cookie=c_name+ "=" +escape(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
	}
	
	function delCookie(name){
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval=getCookie(name);
		if(cval!=""&&cval!=null)
		document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	}
	
	//SEARCH
	var http = '';
	var getTestUrl = '';
	var iframeSearch = location.search.split("&");
	var getEnterpriseId = iframeSearch[0].split("=")[1];
	var getProductId = iframeSearch[1].split("=")[1];
	
	//图片懒加载
	$("img").lazyload({
		effect: "fadeIn"
	});
	
	ResizeSize();
    swiperFn();
    
    //搜索商品名称
    $('#searchProductName').focus(function(){
    	var _serVal = $(this).val();
    	if(_serVal==this.defaultValue){
    		 $(this).val('')
    	}
    });
    $('#searchProductName').blur(function(){
    	var _serVal = $(this).val();
    	if(_serVal==''){
    		 $(this).val(this.defaultValue)
    	}
    });
    $('body').on('click','#closeEmpty',function(){
    	$('#searchProductName').val('请输入商品名称');
    });
    
    //手机号及验证码获取焦点及失去焦点
    $('#phoneVal,#securitycodeVal').focus(function(){
    	var _serVal = $(this).val();
    	if(_serVal==this.defaultValue){
    		 $(this).val('')
    	}
    });
    $('#phoneVal,#securitycodeVal').blur(function(){
    	var _serVal = $(this).val();
    	if(_serVal==''){
    		 $(this).val(this.defaultValue)
    	}
    });
    //验证码按钮----点击之后倒计时60s，且当弹框关闭后时间还继续走，目的防止二次点击
    $('body').on('click','#securityBtn',RegisterCodeFn);
    //注册并绑定按钮
 	var phoneVal = $('#phoneVal').val(),
 		securitycodeVal = $('#securitycodeVal').val();
 	$('body').on('click','#bindingBtn',RegisterBinding );
    
    //商品列表项--加入购物车
    $('body').on('click','.addbtn',function(event){
    	//获取购物车原有数量
    	var cartTimer = null;
    	clearTimeout( cartTimer );
    	$('#addCartSuccess').fadeIn();
    	setTimeout(function(){
    		$('#addCartSuccess').fadeOut();
    	},500);
    	var cardnum = Number($('#addCard p').html());
    	$('#addCard p').html(cardnum+1);
    	//购物车接口
    });
    //点击购物车====判断如果用户没有登录过，则拉取登录
    $('body').on('click','#addCard',function(event){
		$('#registerMark').show();
    	$('#registerPop').show();
    });
    //点击遮罩层，关闭注册弹框及遮罩
    $('body').on('click','#registerMark',function(event){
 		$('#wrap-productdetail').removeClass('overflowH');
 		$('#registerMark').hide();
 		$('#registerPop').hide();
 	});	
    
    
    /* 本地微信公众号下的产品详情页的测试地址
	 * http://szq.s1.natapp.cc/weixinservice/Buy/ProductDetail.html?enterprise_info_id=2&product_id=1&domain=http://192.168.21.207:8080
	 * */
	
	//微信
	var weixin_info = null,
		cookieinfo = '',
		openid = '',
		cookieinfo = getCookie("weixin_info_pay"),
		loginUrl,
		LocationUrl;
		
		
	
	var sumCount=''; //商品总分页
	var page = 1;
    var http = '';
	var getTestUrl = '';
	
	$.ajax({
		type:"get",
		url :getTestUrl+"/rest/1.0/purchase",
		dateType:"jsonp",
		data:{
			"method" : "purchase.home",
			"field"  : JSON.stringify({
				"enterprise_info_id":"2"
			})
		},
		jsonp: 'callback',
		success : function(response){
			
			//if(response.invoke_result == 'INVOKE_SUCCESS'){
				InitInforData(response);//初始化数据
			//}
		}
	});
    
    //精选商品列表函数
	var $product_list = $('#product-list');
	
    // 上拉加载
	var _userAgent = navigator.userAgent, app = navigator.appVersion;
	var isAndroid = _userAgent.indexOf('Android') > -1 || _userAgent.indexOf('Linux') > -1; 
	var isiOS = !!_userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
	if(isiOS){
		//ios终端
		var myScroll;
		function loaded() {
			
			[].slice.call(document.querySelectorAll('input, select, button')).forEach(function(el){
				el.addEventListener(('ontouchstart' in window)?'touchstart':'mousedown', function(e){
					e.stopPropagation();
				})
			})
			myScroll = new iScroll('wrapProductdetail', { 
				scrollbarClass: 'myScrollbar' ,
				hScrollbar:true,//水平滚动条，true=显示
				hScroll  : true,
				vScroll : true,//竖向滚动条，默认true=显示
				useTransform : false,//禁止使用这个属性，这样就用top值来规范滚动条滚动高度
				checkDOMC : true, //是否自动检测内容变化  默认为false=否
				hideScrollbar:true,//是否隐藏滚动条 true=是（默认在android=false ios=true）
				fadeScrollbar : true,//滚动条是否渐隐渐现   true=是（默认在android=false ios=true）
				onScrollEnd : function(){//参数方法，触发加载新数据，再通过refresh方法重新渲染界面
						
				},
				onBeforeScrollStart: function (e) {
					var target = e.target;
					while (target.nodeType != 1) target = target.parentNode;
					if (target.tagName != 'select' && target.tagName != 'input' && target.tagName != 'textarea')
					e.preventDefault();
					}
			});
			//myScroll.options.useTransform
		}
		
		document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 300) }, false);
		document.addEventListener('touchend', function (e) { 
			var num_top = -($('#scroller').css('top').replace("px",""));
			var scrollH = Number(num_top);//获取top值
			var ssTimer = null;
			if( Number($('#wrapProductdetail').height() + scrollH) >= $('#scroller').outerHeight()+10 ){
				//alert('page:'+page+'sumCount:'+sumCount)
				if( page < sumCount ){
					page++;	
					$('.loading_more p').html('加载中...'+page);
					$('.loading_more').show();
					clearTimeout(ssTimer);
					ssTimer = setTimeout(function(){
						//console.log('page:'+page+'sumCount:'+sumCount)
						$('.loading_more').hide();
						LoadingMore( page );
					},500);		
				}else{
					$('.loading_more p').html('已经没有更多数据了');
					$('.loading_more').show();
					clearTimeout(ssTimer);
					ssTimer = setTimeout(function(){
						$('.loading_more').hide();
					},500);		
				}
			}
			//console.log('h:'+Number($('#wrapProductdetail').height() + scrollH)+',oH:'+$('#scroller').outerHeight())
		}, false);
	}else{ 
		//android终端或者uc浏览器
		var startY=0 ;
		var _onogg = 'start';
		window.addEventListener('touchstart',function(event){
			_onogg = 'start';
		});
		window.addEventListener('touchmove',function(event){
			_onogg = 'move';
		});
		window.addEventListener('touchend',function(event){
				var scrollH = Number($('#wrapProductdetail').scrollTop());
				var ssTimer = null;
				if(_onogg=='move'){
					if( Number($('body').height() + scrollH) >= $('.more_wrapper').outerHeight() ){
						if( page < sumCount ){
							page++;	
							$('.loading_more p').html('加载中...');
							$('.loading_more').show();
							clearTimeout(ssTimer);
							ssTimer = setTimeout(function(){
								//console.log('page:'+page+'sumCount:'+sumCount)
								$('.loading_more').hide();
								LoadingMore( page );
							},500);		
						}else{
							$('.loading_more p').html('已经没有更多数据了');
							$('.loading_more').show();
							clearTimeout(ssTimer);
							ssTimer = setTimeout(function(){
								$('.loading_more').hide();
							},500);		
						}
					}	
				}
		},false);
		
	}
	//上拉结束
	
	//判断类型：1=微信浏览器，2=非微信，并且之后判断登没登录
	var type_wx = '';
	if( isWeiXin() ){
		
		//微信浏览器
		type_wx = 1;
		$('#addCard').click(function(){
			if( cookieinfo == ''||cookieinfo == null ||cookieinfo == undefined ){
				
				//如果未登录过，跳指定页面拉取登录
				LocationUrl = window.location.href;
				LocationUrl = encodeURIComponent(LocationUrl);//转义一下
				LocationUrl = window.location.href;
				LocationUrl = encodeURIComponent(LocationUrl);//转义一下

				$.ajax({
			        url : getTestUrl + "/rest/1.0/purchase?method=wechat.login.info",
			        type : "get",
			        dataType : "jsonp",
			        data:{'specialOne':getEnterpriseId,'specialTwo':window.parent.location.href},
			        contentType:"application/json",
			        success : function(data){
			            if(data.invoke_result == 'INVOKE_SUCCESS'){
			            	window.parent.location.href = data.LoginUrl;
			            }
			        }
			    }); 
			    
			}else{
				
				//如果已登录，则跳到购物车页面
				cookieinfo = getCookie("weixin_info_pay");
				cookieinfo = base64decode(cookieinfo);
				cookieinfo = utf8to16(cookieinfo);
				weixin_info = JSON.parse( cookieinfo );
				getMemberInfo = weixin_info.member_info_id;//weixin_info.openid   8867
				
				$.ajax({
					type: "GET",
					url: getTestUrl+'/rest/1.0/purchase',
					dataType: "jsonp",
					data:{
						'method':'add.cart.data',
						'field':JSON.stringify({
							'enterprise_info_id' : getEnterpriseId,
							'member_info'        : getMemberInfo,
							'product_id'         : getProductId ,
							'product_num'        : $('#Total').val()
						})
					},
					jsonp: 'callback',
					success: function( response ) {
						
						CartAjax();
						$(".success_addtip").fadeIn();
						setTimeout(function(){
							$(".success_addtip").fadeOut();
						},500);
						
			            
					},
					error: function(e) {
						try {
							console.log('点击加入购物车请求失败了！')
						} catch (e) {}
					}
				});	//ajax---end
				
			}
		});
		
	}else{
		
		//非微信浏览器
		type_wx = 2;   
		$('#addCard').click(function(){
			if( cookieinfo == ''||cookieinfo == null ||cookieinfo == undefined ){
				//非微信，点击购物车按钮--如果未登录
				$('.mark_bind').show();
				$('#registerPop').show();
				$('.wrap_productdetail').addClass('overflowH');
			}else{
				//非微信，点击购物车按钮--如果已登录
				$('.mark_bind').hide();
				$('#registerPop').hide();
				$('.wrap_productdetail').removeClass('overflowH');
				
				$.ajax({
					type: "GET",
					url: getTestUrl+'/rest/1.0/purchase',
					dataType: "jsonp",
					data:{
						'method':'add.cart.data',
						'field':JSON.stringify({
							'enterprise_info_id' : getEnterpriseId,
							'member_info'        : getMemberInfo,
							'product_id'         : getProductId ,
							'product_num'        : $('#Total').val(),
						})
					},
					jsonp: 'callback',
					success: function( response ) {
						
						CartAjax();
			            
					},
					error: function(e) {
						try {
							console.log('点击加入购物车请求失败了！')
						} catch (e) {}
					}
				});	//ajax---end
			}
		});
		
	}
	//判断是微信浏览器登录还是非微信浏览器  end
    
    $(window).resize(function(event) {
        ResizeSize();
        swiperFn()
    });
	
	//swiper轮播图
	function swiperFn(){
	    //$('#buyswiper-container').css('height',$('#buyswiper-container').width()*0.4);
	    var swiper = new Swiper('.swiper-container', {
	        pagination: '.swiper-pagination',
	        paginationClickable: true,
	        spaceBetween: 30,
	        centeredSlides: true,
	        //autoplay: 2500,
	        autoplayDisableOnInteraction: false,
	        loop: true,
	        effect : 'fade',
			fade: {
			  crossFade: false,
			}
	    });
	}
	
	//初始化参数
	function InitInforData(_data){
		//=========================================length>0
		var _logo = _data.logo;
		//logo图片
		$('.header-lt img').attr('src',_logo);
		$('#qyLogo').attr('src',_logo);
		
		//商城名称
		var _purname = _data.purchase_name;
		$('#purchaseName').html( _purname );
		
		//头部图片--焦点图
		var topfigureArr = _data.top,
			figureStr = '';
		for ( var i=0; i<topfigureArr.length; i++ ) {
			figureStr += '<div class="swiper-slide">'+
			                '<a class="imgs-bg" href="javascript:;">'+
			                	'<img src="'+topfigureArr[i].picture_url+'" />'+
			                '</a>'+
			            '</div>';
		}
		$('#buyswiperContainer .swiper-wrapper').html( figureStr );
		//数据添加完之后，在去执行轮播图事件
		swiperFn()
		
		//banner
		var bannerArr = _data.banner,
			bannerStr = '';
		for( var i=0; i<bannerArr.length; i++ ){
			bannerStr += '<a href="'+bannerArr[i].link_url+'"><img src="'+bannerArr[i].picture_url+'@640w_288h_1e_1c.src" /></a>'
		}
		$('#buyBanner').html( bannerStr );
		
		//总页数
		var total = _data.product_total_pages;
		total != '' && total != undefined ? sumCount = total : sumCount = 0;
		sumCount = _data.product_total_pages;
		
		//执行商品集合
		var plist = _data.product;
		if( plist != [] && plist != '' && plist != null ){
			ProductListData( plist ); 
		}
		
	}
	//初始化商品集合
	function ProductListData(_data){
		var _listStr='';
		$('#productList').html('');
		for( var i=0; i<_data.length; i++ ){
			//如果没有图或者图片失败，则为默认图片
			var defaultpic = '';
			if( _data[i].picture != '' && _data[i].picture != null ){
				defaultpic = _data[i].picture;
			}else{
				defaultpic = '../../..//asset/images/851.jpg'
			}
			//字符串
			_listStr += '<li>'+
							'<div class="pitem" id="'+ _data[i].price +'">'+
								'<i class="addbtn"></i>'+
								'<img class="product-pic" src="'+ defaultpic +'@308w_208h_1e_1c.src" />'+
								'<div class="product-foot clearfixx">'+
									'<p class="txt-intro">'+ _data[i].name +'</p>'+
									'<p class="txt-recommend">【纯天然绿色】</p>'+
									'<p class="txt-price"><span>¥'+ _data[i].price +'</span>元</p>'+
								'</div>'+
							'</div>'+
						'</li>';
		}
		$('#productList').append( _listStr );
	}
	
	//加载更多商品数据
	function LoadingMore( pageIndex ){
		//alert('精选商品当前页数'+pageIndex)
		//下滑到底部时，加载更多商品====================
		/*$.ajax({
			type: "GET",
			url: getTestUrl+'/rest/1.0/purchase',
			dataType: "jsonp",
			data:{
				'method':'product.info.list.data',
				'field':JSON.stringify({
					'enterprise_info_id' : getEnterpriseId,
					'product_id'         : getProductId ,
					'page'               : pageIndex
				})
			},
			jsonp: 'callback',
			success: function( response ) {
				
				var _data = response.purchase_product_info.purchase_product_list;;
				var _list='',
					_classname = '';
				if( _data.length>0 ){
						for( var i=0;i<_data.length;i++ ){
							//取膜，基数class=right_b,偶数class=left_b
							i%2==0 ? _classname='right_b' : _classname='left_b'
							//拼接精选商品列表
							_list += 
							'<li class="'+ _classname +'">'+
								'<a href="">'+
									'<img src="'+ _data[i].image_url +'" />'+
									'<h6>'+ _data[i].product_name +'</h6>'+
									'<p class="prize">￥'+ _data[i].product_price +'</p>'+
								'</a>'+
							'</li>';
						}
						$product_list.append( _list );
						myScroll.refresh();
				}			
				
			},
			error: function(e) {
				try {
					console.log('加载更多精选商品请求失败了！')
				} catch (e) {}
			}
		});*/	//ajax----end
		var _list = '';
		_list += '<li>'+
						'<div class="pitem">'+
							'<i class="addbtn"></i>'+
							'<img class="product-pic" src="../asset/images/purchase/weChatBuy_banner1.jpg" />'+
							'<div class="product-foot clearfixx">'+
								'<p class="txt-intro">四川青李  脆甜，可口</p>'+
								'<p class="txt-recommend">【纯天然绿色】</p>'+
								'<p class="txt-price"><span>¥18.00</span>元</p>'+
							'</div>'+
						'</div>'+
					'</li>';
		$product_list.append( _list );
		if(isiOS){
			myScroll.refresh();
		}		
		
	}
	
	//验证码
	function RegisterCodeFn(){
		phoneVal = $('#phoneVal').val();
 		if( phoneVal != '手机号' && phoneVal != '' && IsPhone(phoneVal) && phoneVal.length==11 ){
 			
 			$('.tip_phonenumber').hide();//提示
	 		$('.tip_securitycode').hide();//提示
 			
 			/*$.ajax({
				type: "GET",
				url: getTestUrl+'/rest/1.0/purchase',
				dataType: "jsonp",
				data:{
					'method':'get.verification.data',
					'field':JSON.stringify({
						'phone' : $('#phoneVal').val()	
					})
				},
				jsonp: 'callback'
			});	*/
			
			var Stimer = null,
 				Mtime = 60;
	 		//定时器
	 		clearInterval( Stimer );
	 		Stimer = setInterval(function(){
	 			
	 			if(Mtime==0){
	 				clearInterval( Stimer );
	 				Mtime = 60;
	 				$('#securityBtn').show();
	 				$('#time_s60').hide();
	 				$('#time_s60').html('60s');
	 			}
	 			Mtime--;
	 			$('#time_s60').html(Mtime+'s')
	 			
	 		},1000)
	 		$('#securityBtn').hide();
	 		$('#time_s60').show();
			
 		}else{
 			
 			$('.tip_phonenumber').show();//提示
	 		$('.tip_securitycode').hide();//提示
 			
 		}
	}
	
	//注册并绑定
	function RegisterBinding(){
 		phoneVal = $('#phoneVal').val(),
 		securitycodeVal = $('#securitycodeVal').val();
 		$('.tip_phonenumber').hide();//提示
 		$('.tip_securitycode').hide();//提示
 		
 		if( phoneVal == '手机号' || phoneVal == '' || !IsPhone(phoneVal) || phoneVal.length!=11 ){
 			
 			//如果手机号码不正确
 			$('#phoneVal').val( phoneVal );
 			$('#securitycodeVal').val( securitycodeVal );
 			$('.tip_phonenumber').show();//提示
 			$('.tip_securitycode').hide();//提示
 			
 		}else if( securitycodeVal=='验证码' ||securitycodeVal=='' || securitycodeVal.length!=6 ){
 			
 			//如果验证码不正确
 			$('#phoneVal').val( phoneVal );
 			$('#securitycodeVal').val( securitycodeVal );
 			$('.tip_phonenumber').hide();//提示
 			$('.tip_securitycode').show();//提示
 			
 		}else{
 			alert(注册并绑定成功,则重新刷新页面);
 			//如果注册并绑定成功，则重新刷新页面
 			/*$.ajax({
		        type: "GET",
				url: getTestUrl+'/rest/1.0/purchase',
				dataType: "jsonp",
				data:{
					'method':'login.method.data',
					'field':JSON.stringify({
						'enterprise_info_id' : getEnterpriseId	,
						//'memeber_info'       : getMemberInfo,
						'phone'              : phoneVal,
						'code'               : securitycodeVal
					})
				},
				jsonp: 'callback',
				success: function( response ) {
					
					if( response.result == 'failed' ){
						alert(response.message)
					}else{
						//alert(getCookie("weixin_info_pay"));
						window.location.reload(); 
						//cookieinfo = settCookie("weixin_info_pay")
						
					}
					
				},
				error: function(e) {
					console.log('！')
				}
		    });*/
 			
 		};
 	}
	
	//封装判断手机号函数
	function IsPhone(inpurStr){
		var partten = /^(13[0-9]|15[012356789]|17[01236789]|18[0-9]|14[57])[0-9]{8}$/;
		if(partten.test(inpurStr))
		{
		   //alert('是电话号码');
		   return true;
		}
		else
		{
		   //alert('不是电话号码');
		   return false;
		}
	} 
	
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
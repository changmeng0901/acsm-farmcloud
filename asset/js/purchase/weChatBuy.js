	
	var shareUrl = window.location.href;
	var shareTitle='';
	var shareIcon='';
	var shareDescription='';
	var url = "/weixinservice/farmeasy/adopter?callback=?&method=js_ticket";
	
	//微信
	var weixin_info = '',
		cookieinfo = '',
		openid = '',
		getMemberInfo = '',
		getEnterpriseId='',
		weixin_phone,
		loginUrl,
		LocationUrl;
		
	var sumCount='', //商品总分页
		page = 1,
		getTestUrl = '',
		search_name = ''; //搜索的名称
	
	//SEARCH
	var iframeSearch = location.search.split("&"),
		getEnterpriseId = iframeSearch[0].split("=")[1];
		console.log('qiyeid:'+getEnterpriseId);
		console.log('memgerinfo:'+getMemberInfo);
	
	//购物车数量---默认为0
    $('#enterCard p').html('0');
    
	//初始化判断是否登录过，登录过的话，就可以获取到企业ID等信息
	cookieinfo = getCookie("weixin_info_pay");
	if( cookieinfo != ''  && cookieinfo != null ){
		cookieinfo = base64decode(cookieinfo);
		cookieinfo = utf8to16(cookieinfo);
		weixin_info = JSON.parse( cookieinfo );//解析出json 对象
	    getMemberInfo = weixin_info.member_info_id;
		
		//判断从地址上获取到的企业ID和获取到的cookie里的企业ID是不是一个
	    var getEnterpriseId22 = weixin_info.enterprise_info_id;
	    if( getEnterpriseId!=getEnterpriseId22 ){
	    	delCookie("weixin_info_pay");
	    	cookieinfo='';
	    	weixin_info = '';
	    	getMemberInfo ='';
	    }
	    //如果已经登录过，则我的订单按钮显示，点击跳转到我的记录页面，否则按钮隐藏
	    if( getMemberInfo==''||getMemberInfo==null||getMemberInfo==undefined ){
			$('#enterRecord').hide();
		}else{
			$('#enterRecord').show();
		}
	    //如果已经登录过，则调用购物车接口，之后把返回的数量添加进去
	    CartAjax();
	}
	
	//图片懒加载
	$("img").lazyload({
		effect: "fadeIn"
	});
	
	ResizeSize();
    swiperFn();
    
    
    //返回首页
    $('#returnHome').click(function(){
    	window.location.reload();
    });
    
    //我的记录--跳转到个人中心页面
    $('#enterRecord').click(function(){
    	//alert(getCookie('weixin_info_pay'));
    	//alert(cookieinfo)
    	window.location.href = '/purchase/weChatPersonalCenter.html?enterprise_info_id='+getEnterpriseId;
    });
    
    //商品--点击进入商品页
    $(document).on('click','.pitem',function(event){
    	event.stopPropagation();
    	var product_id = $(this).attr('id'); 
    	window.location.href =  '/purchase/purchaseIndex.seam?enterprise_info_id='+getEnterpriseId+'&product_id='+product_id;
    });
    
    //搜索商品名称
    var oldserachVal = '';
    $('#searchProductName').focus(function(){
    	var _serVal = $(this).val();
    	if(_serVal==this.defaultValue){
    		 $(this).val('');
    	}
    });
    $('#searchProductName').blur(function(){
    	var _serVal = $(this).val();
    	if(_serVal==''){
    		 $(this).val(this.defaultValue);
    	}
    });
    $('body').on('click','#closeEmpty',function(){
    	$('#searchProductName').val('请输入商品名称');
    });
    //点击搜索按钮===搜索该商品，接口和下拉一样，就是name参数传空即可
    $('body').on('click','#searchName',function(){
    	var _searchVal = $('#searchProductName').val();
    		page = 1;
    	//把搜索的内容隐藏，如果下次搜索值改变但还没有点击搜索时，下拉的内容还是原来的内容
    	$('#searchHidden').val( _searchVal );
    	/*if( _searchVal=='' || _searchVal=='请输入商品名称' ){
    		//清空搜索条件后点击搜索需展示全部商品和焦点图
    		InitAjax();
    	}else{
    		//如果有搜索的值，则调用搜索接口
    		search_name = _searchVal;
    		console.log('page:'+page+'name:'+search_name)
    		SearchMore(page,search_name);
    	}*/
    	search_name = _searchVal;
		console.log('page:'+page+'name:'+search_name);
		SearchMore(page,search_name);
    });
    
    //手机号及验证码获取焦点及失去焦点
    $('#phoneVal,#securitycodeVal').focus(function(){
    	var _serVal = $(this).val();
    	if(_serVal==this.defaultValue){
    		 $(this).val('');
    	}
    });
    $('#phoneVal,#securitycodeVal').blur(function(){
    	var _serVal = $(this).val();
    	if(_serVal==''){
    		 $(this).val(this.defaultValue);
    	}
    });
    //验证码按钮----点击之后倒计时60s，且当弹框关闭后时间还继续走，目的防止二次点击
    $('body').on('click','#securityBtn',function(){
    	RegisterCodeFn();
    });
    //注册并绑定按钮
 	var phoneVal = $('#phoneVal').val(),
 		securitycodeVal = $('#securitycodeVal').val();
 	$('body').on('click','#bindingBtn',function(){
 		RegisterBinding();
 	});
    
    //点击遮罩层，关闭注册弹框及遮罩
    $('body').on('click','#registerMark',function(event){
 		$('#wrapProductdetail').removeClass('overflowH');
 		$('#registerMark').hide();
 		$('#registerPop').hide();
 	});	
    
	//初始化接口
	function InitAjax(){
		$.ajax({
			type:"get",
			url :getTestUrl+"/rest/1.0/purchase",
			dateType:"jsonp",
			data:{
				"method" : "purchase.home",
				"field"  : JSON.stringify({
					"enterprise_info_id":getEnterpriseId
				})
			},
			jsonp: 'callback',
			success : function(response){
				
				InitInforData(response);//初始化数据
				fenxiang(shareTitle,shareDescription,shareIcon,shareUrl);
			},
			error: function(e) {
				try {
					console.log('初始化接口请求失败！');
				} catch (e) {}
			}
		});
	}
	InitAjax();
	
	//【点击“购物车”】===判断类型：1=微信浏览器，2=非微信，并且之后判断登没登录
	var type_wx = '';
	$('body').on('click','#enterCard',function(event){
		if( isWeiXin() ){
			//微信浏览器
			type_wx = 1;
			if( cookieinfo == ''||cookieinfo == null ||cookieinfo == undefined ){
				//如果未登录过，跳指定页面拉取登录
				LocationUrl = window.location.href;
				LocationUrl = encodeURIComponent(LocationUrl);//转义一下

				$.ajax({
			        url : getTestUrl + "/rest/1.0/purchase?method=wechat.login.info",
			        type : "get",
			        dataType : "jsonp",
			        data:{'specialOne':getEnterpriseId,'specialTwo':window.location.href},
			        contentType:"application/json",
			        success : function(data){
			            if(data.invoke_result == 'INVOKE_SUCCESS'){
			            	window.location.href = data.LoginUrl;
			            }
			        }
			    }); 
			}else{
				//如果已登录，则跳到购物车列表页面
				cookieinfo = getCookie("weixin_info_pay");
				cookieinfo = base64decode(cookieinfo);
				cookieinfo = utf8to16(cookieinfo);
				weixin_info = JSON.parse( cookieinfo );
				getEnterpriseId = weixin_info.enterprise_info_id;
				getMemberInfo = weixin_info.member_info_id;//weixin_info.openid   8867
				//openid = weixin_info.openid;  //weixin_info.openid  8867*/
				window.location.href = '/purchase/cart.html?enterprise_info_id='+getEnterpriseId;
			}
		}else{
			//非微信浏览器
			type_wx = 2; 
			if( cookieinfo == ''||cookieinfo == null ||cookieinfo == undefined ){
				//如果未登录，注册并绑定
				$('.mark-bind').show();
				$('#registerPop').show();
				$('#wrapProductdetail').addClass('overflowH');
				
			}else{
				//如果已登录,跳到购物车列表页
				$('.mark-bind').hide();
				$('#registerPop').hide();
				$('#wrapProductdetail').removeClass('overflowH');
				window.location.href = '/purchase/cart.html?enterprise_info_id='+getEnterpriseId;
			}
		}
		
	});
	//【点击“加入购物车”】===判断类型：1=微信浏览器，2=非微信，并且之后判断登没登录
	$(document).on('click','.addbtn',function(event){
		event.stopPropagation();
		var getProductId = $(this).parents('.pitem').attr('id');
		if( isWeiXin() ){
			//微信浏览器
			type_wx = 1;
			if( cookieinfo == ''||cookieinfo == null ||cookieinfo == undefined ){
				//如果未登录过，跳指定页面拉取登录
				LocationUrl = window.location.href;
				LocationUrl = encodeURIComponent(LocationUrl);//转义一下
				//======拉取地址，目前为测试============
				$.ajax({
			        url : getTestUrl + "/rest/1.0/purchase?method=wechat.login.info",
			        type : "get",
			        dataType : "jsonp",
			        data:{'specialOne':getEnterpriseId,'specialTwo':window.location.href},
			        contentType:"application/json",
			        success : function(data){
			            if(data.invoke_result == 'INVOKE_SUCCESS'){
			            	console.log('微信浏览器未登录，加入购物车拉取成功');
			            	window.location.href = data.LoginUrl;
			            }else{
			            	console.log('微信浏览器未登录，加入购物车”未“拉取成功');
			            }
			        }
			    }); 
			}else{
				
				//如果已登录
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
							'product_num'        : 1
						})
					},
					jsonp: 'callback',
					success: function( response ) {
						console.log('点击加入购物车成功');
						CartAjax();
						$("#addCartSuccess").fadeIn();
						setTimeout(function(){
							$("#addCartSuccess").fadeOut();
						},500);
						
			            
					},
					error: function(e) {
						try {
							console.log('点击加入购物车请求失败了！');
						} catch (e) {}
					}
				});	//ajax---end
				
			}
		}else{
			//非微信浏览器
			type_wx = 2;
			if( cookieinfo == ''||cookieinfo == null ||cookieinfo == undefined ){
				$('.mark-bind').show();
				$('#registerPop').show();
				$('#wrapProductdetail').addClass('overflowH');
			}else{
				$('.mark-bind').hide();
				$('#registerPop').hide();
				$('#wrapProductdetail').removeClass('overflowH');
				
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
							'product_num'        : 1
						})
					},
					jsonp: 'callback',
					success: function( response ) {
						
						CartAjax();//购物车接口
						$("#addCartSuccess").fadeIn();
						setTimeout(function(){
							$("#addCartSuccess").fadeOut();
						},500);
			            
					},
					error: function(e) {
						try {
							console.log('点击加入购物车请求失败了！');
						} catch (e) {}
					}
				});	
			}
		}
    	
    });
    //购物车接口
    function CartAjax(){
	    $.ajax({
			type: "GET",
			url: getTestUrl+'/rest/1.0/purchase',
			dataType: "jsonp",
			data:{
				'method':'cart.data',
				'field':JSON.stringify({
					'enterprise_info_id' : getEnterpriseId,
					'member_info'        : getMemberInfo
					//'enterprise_info_id' : 2,
					//'member_info'        : 11319
				})
			},		
			jsonp: 'callback',
			success: function(response) {
				
				if(response.invoke_result == 'INVOKE_SUCCESS'){
					$('#enterCard p').html( response.cart_num );
				}
				
			},
			error: function(e) {
				console.log('购物车接口请求失败！');
			}
		}); 
	}
	//=================================
    
    // 上拉加载
	var _userAgent = navigator.userAgent, app = navigator.appVersion;
	var isAndroid = _userAgent.indexOf('Android') > -1 || _userAgent.indexOf('Linux') > -1; 
	var isiOS = !!_userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); 
	var myScroll;
	if(isiOS){
		//ios终端
		var startY=0 ;
		var _onogg = 'start';
		document.addEventListener('touchstart', function (event) {
			_onogg = 'start';
		});
		document.addEventListener('touchmove',function(event){
			_onogg = 'move';
		});
		function loaded() {
			
			[].slice.call(document.querySelectorAll('input, select, button')).forEach(function(el){
				el.addEventListener(('ontouchstart' in window)?'touchstart':'mousedown', function(e){
					e.stopPropagation();
				});
			});
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
		};
		
		document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 300);}, false);
		document.addEventListener('touchend', function (e) { 
			var num_top = -($('#scroller').css('top').replace("px",""));
			var scrollH = Number(num_top);//获取top值
			var ssTimer = null;
			if(_onogg=='move'){
				if( Number($('#wrapProductdetail').height() + scrollH) >= $('#scroller').outerHeight()+10 ){
					//alert('page:'+page+'sumCount:'+sumCount)
					console.log('IOSsumCount'+sumCount);
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
						console.log('androsumCount'+sumCount);
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
	
    $(window).resize(function(event) {
        ResizeSize();
        swiperFn();
    });
	
	//swiper轮播图
	function swiperFn(){
	    //$('#buyswiper-container').css('height',$('#buyswiper-container').width()*0.4);
	    var swiper = new Swiper('.swiper-container', {
	        pagination: '.swiper-pagination',
	        paginationClickable: true,
	        spaceBetween: 30,
	        centeredSlides: true,
	        autoplay: 2500,
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
		if( _logo!= undefined || _logo != null ){
			_logo = _data.logo;
			$('#returnHome img').attr('src',_logo);
			$('#qyLogo').attr('src',_logo);
			$('#returnHome img').show();
			$('#qyLogo').show();
		}else{
			_logo = '';
			$('#returnHome img').attr('src',_logo);
			$('#qyLogo').attr('src',_logo);
			$('#returnHome img').hide();
			$('#qyLogo').hide();
		}
		
		//背景图
		var bgimg = _data.background_img;
		if( bgimg == null || bgimg == undefined || bgimg == ''){
			$('#backgroundImg').val('');
		}else{
			$('#backgroundImg').val( bgimg );
		}
		var bgJson = JSON.stringify({'bgimg':bgimg,'logo':_logo});
		setCookie('background_img',bgJson,7);
		
		//商城名称
		var _purname = _data.purchase_name;
		$('#purchaseName').html( _purname );
		
		//分享标题、图片、描述
		if( _data.share_title != undefined || _data.share_title != null ){ shareTitle=_data.share_title; }
		if( _data.logo != undefined || _data.logo != null ){ shareIcon=_data.logo; }
		if( _data.share_desc != undefined || _data.share_desc != null ){ 
			shareDescription=_data.share_desc; 
			shareDescription = shareDescription.replace(/[\n]/g,"</br>");
			}
		url = _data.fx_domain_url+url;
		
		//头部图片--焦点图
		var topfigureArr = _data.top,
			figureStr = '';
		for ( var i=0; i<topfigureArr.length; i++ ) {
			figureStr += '<div class="swiper-slide">'+
			                '<a class="imgs-bg" href="javascript:;">'+
			                	'<img src="'+topfigureArr[i].img_url+'" />'+
			                '</a>'+
			            '</div>';
		}
		$('#buyswiperContainer .swiper-wrapper').html( figureStr );
		//数据添加完之后，在去执行轮播图事件
		swiperFn();
		
		//banner
		var bannerArr = _data.banner,
			bannerStr = '';
		for( var i=0; i<bannerArr.length; i++ ){
			bannerStr += '<a href="'+bannerArr[i].link_url+'"><img src="'+bannerArr[i].picture_url+'@640w_288h_1e_1c.src" /></a>';
		};
		$('#buyBanner').html( bannerStr ).show();
		
		//总页数
		var total = _data.product_total_pages;
		total != '' && total != undefined ? sumCount = total : sumCount = 1;
		
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
				defaultpic = '../../../asset/images/851.jpg';
			}
			//字符串
			_listStr += '<li>'+
							'<div class="pitem" id="'+ _data[i].id +'">'+
								'<i class="addbtn"></i>'+
								'<img class="product-pic" src="'+ defaultpic +'@308w_208h_1e_1c.src" />'+
								'<div class="product-foot clearfixx">'+
									'<p class="txt-intro">'+ _data[i].name +'</p>'+
									'<p class="txt-price"><span>¥'+ _data[i].price +'</span>元</p>'+
								'</div>'+
							'</div>'+
						'</li>';
		}
		$('#productList').append( _listStr );
		/*if(isiOS){
			myScroll.refresh();
		}*/
	}
	
	//加载更多商品数据
	function LoadingMore( sppage ){
		//alert('精选商品当前页数'+pageIndex)
		console.log('加载更多page:'+sppage);
		//下滑到底部时，加载更多商品====================
		//如果下拉时，隐藏域里有上次搜索的内容，则把搜索的名字传给后台，如果没有值，则传空字符串
		var hiddenVal = $('#searchHidden').val(),
			searchName = '';
		if( hiddenVal != '' && hiddenVal!='请输入商品名称' ){
			searchName = hiddenVal;
		}else{
			searchName = '';
		}
		$.ajax({
			type:"get",
			url :getTestUrl+"/rest/1.0/purchase",
			dateType:"jsonp",
			data:{
				"method" : "purchase.home.product",
				"field"  : JSON.stringify({
					"enterprise_info_id":getEnterpriseId,
					"page":sppage,
					"search_name":searchName
				})
			},
			jsonp: 'callback',
			success : function(response){
				console.log('加载更多page:'+sppage);
				var _splist = '',
					_spArr = response.product;
				if( _spArr != '' && _spArr!=undefined && _spArr!=[] ){
					console.log('加载更多成功');
					for( var i=0; i<_spArr.length; i++ ){
						//如果没有图或者图片失败，则为默认图片
						var defaultpic = '';
						if( _spArr[i].picture != '' && _spArr[i].picture != null ){
							defaultpic = _spArr[i].picture;
						}else{
							defaultpic = '../../../asset/images/851.jpg';
						}
						_splist += '<li>'+
										'<div class="pitem" id="'+ _spArr[i].id +'">'+
											'<i class="addbtn"></i>'+
											'<img class="product-pic" src="'+ defaultpic +'@308w_208h_1e_1c.src" />'+
											'<div class="product-foot clearfixx">'+
												'<p class="txt-intro">'+ _spArr[i].name +'</p>'+
												'<p class="txt-price"><span>¥'+ _spArr[i].price +'</span>元</p>'+
											'</div>'+
										'</div>'+
									'</li>';
					}
				}
				$('#productList').append( _splist );
				if(isiOS){
					myScroll.refresh();
				}		
				
			},
			error: function(e) {
				try {
					console.log('加载更多失败！');
				} catch (e) {}
			}
		});
		
		
	}
	
	//搜索更多商品接口==和下拉加载更多商品（LoadingMore）一样，就是name参数传空即可
	function SearchMore(sspage,ssname){
		if( ssname=='' || ssname=='请输入商品名称' ){
			//清空搜索条件后点击搜索需展示全部商品和焦点图
			page = 1;
    		InitAjax();
    		if(isiOS){
				myScroll.refresh();
			}	
		}else{
			$.ajax({
				type:"get",
				url :getTestUrl+"/rest/1.0/purchase",
				dateType:"jsonp",
				data:{
					"method" : "purchase.home.product",
					"field"  : JSON.stringify({
						"enterprise_info_id":getEnterpriseId,
						"page":sspage,
						"search_name":ssname
					})
				},
				jsonp: 'callback',
				success : function(response){
					console.log('搜索成功');
					$('#buyBanner').hide();
					$('#productList').html('');
					var _list = '',
						productArr = response.product;
					if( productArr != '' && productArr!=undefined && productArr!=[] ){
						for( var i=0; i<productArr.length; i++ ){
							//如果没有图或者图片失败，则为默认图片
							var defaultpic = '';
							if( productArr[i].picture != '' && productArr[i].picture != null ){
								defaultpic = productArr[i].picture;
							}else{
								defaultpic = '../../../asset/images/851.jpg';
							}
							_list += '<li>'+
										'<div class="pitem" id="'+ productArr[i].id +'">'+
											'<i class="addbtn"></i>'+
											'<img class="product-pic" src="'+ defaultpic +'@308w_208h_1e_1c.src" />'+
											'<div class="product-foot clearfixx">'+
												'<p class="txt-intro">'+ productArr[i].name +'</p>'+
												'<p class="txt-price"><span>¥'+ productArr[i].price +'</span>元</p>'+
											'</div>'+
										'</div>'+
									'</li>';
						}
					}
					$('#productList').append( _list );
					if(isiOS){
						myScroll.refresh();
					}		
					
				},
				error: function(e) {
					try {
						console.log('搜索接口请求失败！');
					} catch (e) {}
				}
			});
		}
	}
	
	//验证码
	function RegisterCodeFn(){
		var Stimer = null,
			Mtime = 60;
		phoneVal = $('#phoneVal').val();
 		if( phoneVal != '手机号' && phoneVal != '' && IsPhone(phoneVal) && phoneVal.length==11 ){
 			
 			$('#errorTip p').html('');//提示
 			$('#errorTip').hide();
 			
 			$.ajax({
				type: "GET",
				url: getTestUrl+'/rest/1.0/purchase',
				dataType: "jsonp",
				data:{
					'method':'get.verification.data',
					'field':JSON.stringify({
						'phone' : $('#phoneVal').val()	
					})
				},
				jsonp: 'callback',
				success: function( response ) {
					
					if( response.result == 'failed' ){
						alert(response.message);
					}else{
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
				 			$('#time_s60').html(Mtime+'s');
				 			
				 		},1000);
				 		$('#securityBtn').hide();
				 		$('#time_s60').show();
					}
				},
				error: function(e) {
					console.log('！');
				}
			});	
			
 		}else{
 			$('#errorTip p').html('请输入正确的手机号');//提示
	 		$('#errorTip').show();
 			clearInterval( Stimer );
 			Stimer = setInterval(function(){
 				$('#errorTip p').html('');//提示
 	 			$('#errorTip').hide();
	 		},500);
 			
 			
 		}
	}
	
	//注册并绑定
	function RegisterBinding(){
 		phoneVal = $('#phoneVal').val(),
 		securitycodeVal = $('#securitycodeVal').val();
 		var sTimer = null;
 		
 		if( phoneVal == '手机号' || phoneVal == '' || !IsPhone(phoneVal) || phoneVal.length!=11 ){
 			
 			//如果手机号码不正确
 			$('#phoneVal').val( phoneVal );
 			$('#securitycodeVal').val( securitycodeVal );
 			
 			$('#errorTip p').html('手机号不正确');
 			$('#errorTip').show();
 			clearTimeout( sTimer );
 			sTimer = setTimeout(function(){
 				$('#errorTip p').html('');
 				$('#errorTip').hide();
 			},500);
 			
 		}else{
 			
 			//如果手机号格式正确，验证码格式不正确
 			if( securitycodeVal=='验证码' ||securitycodeVal=='' || securitycodeVal.length!=6 ){
	 			$('#errorTip p').html('验证码不正确');
	 			$('#errorTip').show();
	 			clearTimeout( sTimer );
	 			sTimer = setTimeout(function(){
	 				$('#errorTip p').html('');
	 				$('#errorTip').hide();
	 			},500);
 			}else{
 				//alert(注册并绑定成功,则重新刷新页面);
	 			//如果注册并绑定成功，则重新刷新页面
	 			$.ajax({
			        type: "GET",
					url: getTestUrl+'/rest/1.0/purchase',
					dataType: "jsonp",
					data:{
						'method':'login.method.data',
						'field':JSON.stringify({
							'enterprise_info_id' : getEnterpriseId	,
							'phone'              : phoneVal,
							'code'               : securitycodeVal
						})
					},
					jsonp: 'callback',
					success: function( response ) {
						
						if( response.result == 'failed' ){
							alert(response.message);
						}else{
							//alert(getCookie("weixin_info_pay"));
							window.location.reload(); 
							//cookieinfo = settCookie("weixin_info_pay")
							
						}
						
					},
					error: function(e) {
						console.log('！');
					}
			    });
 			}
 			
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
		$('#MetaID').attr('content','width=640px,user-scalable=no,initial-scale='+_scale+', minimum-scale='+_scale+', maximum-scale='+_scale);
	}
	
	//分享
	function fenxiang(myname1,enName1,imgUrl1,myurl1){
		jQuery.ajax({
			url : url,
			data : {url:myurl1},
			dataType: 'jsonp',  
			crossDomain: true,  
			success: function (data) { 
				var wNoncestr=data.noncestr;
				var wTimestamp=data.timestamp;
				var wsignature=data.signature;
				var appId = data.appid;
				wx.config({
					appId:appId,
					timestamp:wTimestamp,
					nonceStr:wNoncestr,
					signature:wsignature,
					jsApiList: ['checkJsApi',
							'onMenuShareTimeline',
							'onMenuShareAppMessage',
							'onMenuShareQQ',
							'onMenuShareWeibo','startRecord'
							]
				});
				//步骤四：通过ready接口处理成功验证    
				wx.ready(function(){            
					wx.checkJsApi({                
						jsApiList: ['onMenuShareTimeline']
					});
					wx.onMenuShareTimeline({
						title: myname1,
						desc: enName1,
						link: myurl1,
						imgUrl: imgUrl1,
						trigger: function(res) {// 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
						},
						success: function(res) {
							//saveforward(prduId,1,enId);
						},
						cancel: function(res) {
						}
					});
					wx.onMenuShareAppMessage({
						title: myname1,
						desc: enName1,
						link: myurl1,
						imgUrl: imgUrl1,
						trigger: function (res) {// 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回
						},
						success: function (res) {
							//saveforward(prduId,1,enId);
						},
						cancel: function (res) {
						},
						fail: function (res) {
						}
					});
					wx.onMenuShareQQ({
						title: myname1,
						desc: enName1,
						link: myurl1,
						imgUrl: imgUrl1,
						trigger: function (res) {
						},
						complete: function (res) {
						},
						success: function (res) {
							//saveforward(prduId,1,enId);
						},
						cancel: function (res) {
						},
						fail: function (res) {
						}
					});
				});
			},
		    error: function(XMLHttpRequest, textStatus, errorThrown){
			}
		});
	}
	
	
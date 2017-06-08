	
	//微信
	var weixin_info = null,
		cookieinfo = '',
		openid = '',
		getMemberInfo = '',
		getEnterpriseId='',
		weixin_phone;
	
	var getTestUrl = '';
	
	ResizeSize();
	
	//获取焦点及失去焦点
	$('.text-input').focus(function(){
		var _val = this.defaultValue;
		if($(this).val()==_val){
			$(this).val("");
		}
	});
	$('.text-input').blur(function(){
		var _val = this.defaultValue;
		if($(this).val()==""){
			$(this).val(_val);
		}
	});
	
	//初始化判断是否登录过，登录过的话，就可以获取到企业ID等信息
	cookieinfo = getCookie("weixin_info_pay");
	if( cookieinfo != ''  && cookieinfo != null ){
		cookieinfo = base64decode(cookieinfo);
		cookieinfo = utf8to16(cookieinfo);
		weixin_info = JSON.parse( cookieinfo );//解析出json 对象
		getEnterpriseId = weixin_info.enterprise_info_id;
	    getMemberInfo = weixin_info.member_info_id;
	    weixin_phone = weixin_info.phone;
	}
	
	//换一张事件
	$('#changeValidBtn').click(function(){
		$('#validcodePic').attr('src','/ImageCode?p=' + new Date().getTime());
	});
	
	var phoneVal = '',  //输入手机号值
		validVal ='',  //输入图片验证码值
		validName = '', //图片验证码返回值
		securityCodeVal ='', //输入验证码值
		oldphone = weixin_phone;  //原来手机号的值
	
	
	
	//验证码按钮----点击之后倒计时60s，且当弹框关闭后时间还继续走，目的防止二次点击
 	$('body').on('click','#securityBtn',function(){
 		
 		phoneVal =  $('#phoneNumber').val();
 		validVal =$('#validNumber').val();
 		var sTimer = null;
 		if( phoneVal != '' && phoneVal!='请输入您的手机号' && IsPhone(phoneVal) && phoneVal.length == 11  ){
 			//手机号码格式正确
 			if( phoneVal != oldphone && (oldphone!=''||oldphone!=undefined||oldphone!=null)  ){
				//如果手机号正确，并且不是原来手机号,则把图片验证码的值发返给后台，后台去比较
 				if( validVal.length != 4 ){
 					//图片验证码格式不正确
					clearTimeout( sTimer );
					$('#errorTip p').html('图片验证码不匹配');
					$('#errorTip').show();
					sTimer = setTimeout(function(){
						$('#errorTip p').html('');
						$('#errorTip').hide();
					},500);
 				}else{
 					//验证码接口======================
 		 			$.ajax({
 						type: "GET",
 						url: getTestUrl+'/rest/1.0/purchase',
 						dataType: "jsonp",
 						data:{
 							'method':'purchase.home.verificode',
 							'field':JSON.stringify({
 								'phone' : phoneVal,
 								'pic_code' :validVal	
 							})
 						},
 						jsonp: 'callback',
						success: function( response ) {
							//如果验证码在后台返回错误，则加个返回值提示
							if( response.result == 'failed' ){
								alert(response.message);
							}else{
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
 					//验证码接口======================
 				}
				
			}else{
				//如果手机号正确，但是原来手机号，则提示
				clearTimeout( sTimer );
				$('#errorTip p').html('请输入新的手机号换绑');
				$('#errorTip').show();
				sTimer = setTimeout(function(){
					$('#errorTip p').html('');
					$('#errorTip').hide();
				},500);
			}
 		}else{
 			//手机号码不正确
 			clearTimeout( sTimer );
			$('#errorTip p').html('请输入正确的手机号');
			$('#errorTip').show();
			sTimer = setTimeout(function(){
				$('#errorTip p').html('');
				$('#errorTip').hide();
			},500);
 		}
 		
 	});
 	
 	//确认提交按钮
	$('body').on('click','#submitBtn',function(){
		phoneVal =  $('#phoneNumber').val();
		validVal = $('#validNumber').val();
		securityCodeVal =  $('#securityCode').val();
		var sTimer = null;
		if( phoneVal != '' && phoneVal!='请输入您的手机号' && IsPhone(phoneVal) && phoneVal.length == 11  ){
			//手机号码格式正确
			if( phoneVal != oldphone && (oldphone!=''||oldphone!=undefined||oldphone!=null)  ){
				//如果手机号正确，并且不是原来手机号,则验证图片验证码
				if( validVal.length != 4 ){
					//图片验证码格式不正确
					clearTimeout( sTimer );
					$('#errorTip p').html('图片验证码不匹配');
					$('#errorTip').show();
					sTimer = setTimeout(function(){
						$('#errorTip p').html('');
						$('#errorTip').hide();
					},500);
				}else{
					//如果手机号正确，图片验证码正确，则验证验证码
					if( securityCodeVal =='' || securityCodeVal == '请输入短信验证码' || securityCodeVal.length != 6 ){
						//验证码格式不正确
						clearTimeout( sTimer );
						$('#errorTip p').html('验证码不匹配');
						$('#errorTip').show();
						sTimer = setTimeout(function(){
							$('#errorTip p').html('');
							$('#errorTip').hide();
						},500);
					}else{
						//如果提交成功，则返回个人中心页面
						$.ajax({
					        type: "GET",
							url: getTestUrl+'/rest/1.0/purchase',
							dataType: "jsonp",
							data:{
								'method':'login.method.data',
								'field':JSON.stringify({
									'enterprise_info_id' : getEnterpriseId	,
									//'memeber_info'       : getMemberInfo,
									'phone'              : phoneVal,
									'code'               : securityCodeVal
								})
							},
							jsonp: 'callback',
							success: function( response ) {
								
								if( response.result == 'failed' ){
									alert(response.message);
								}else{
									//window.location.reload(); 
									window.location.href = 'weChatPersonalCenter.html?enterprise_info_id='+getEnterpriseId;
									
								}
								
							},
							error: function(e) {
								console.log('！');
							}
					    });
					}
				}
			}else{
				//如果手机号正确，但是原来手机号，则提示
				clearTimeout( sTimer );
				$('#errorTip p').html('请输入新的手机号换绑');
				$('#errorTip').show();
				sTimer = setTimeout(function(){
					$('#errorTip p').html('');
					$('#errorTip').hide();
				},500);
			}
			
		}else{
			clearTimeout( sTimer );
			$('#errorTip p').html('请输入正确的手机号');
			$('#errorTip').show();
			sTimer = setTimeout(function(){
				$('#errorTip p').html('');
				$('#errorTip').hide();
			},500);
		}
		
	});
	
	//返回按钮
	$('body').on('click','#returnBtn',function(){
		window.history.go(-1); 
	});
	
	$(window).resize(function(){
		ResizeSize();
	});

//封装判断手机号函数
var IsPhone = function(inpurStr)
{
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
} ;
//校验是否输入的数字
function numberCheck(obj){
	var a = $(obj).val();
	var y = String(a).indexOf(".") + 1;//获取小数点的位置
    var count = String(a).length - y;//获取小数点后的个数
    if(y > 0) {
    	$(obj).val("1");
    }
	if(isNaN(a)){
		alert("只能输入数字！");
		$(obj).val("");
		return false;
	}
	if(a<1){
		$(obj).val("");
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

// JavaScript Document
var myname;//分享标题
var imgUrl;//分享图片地址
var enName;//分享描述
var url = "http://wx.farmeasy.cn/weixinservice/farmeasy/adopter?callback=?&method=js_ticket";//请求微信接口 获取微信验证所要的数据 token,时间戳
var myurl = window.location.href.split("#")[0];//当前URL(分享的链接)
$(function() {
	
	$.ajax({
		type: "POST",
		url: pathurl+'?method=resume.whole.data',
		data: {field: JSON.stringify(getName)},
		dataType: "jsonp",
		success: function(data) {
			if(data.invoke_result == "INVOKE_SUCCESS") {
				//背景地图
				var baseCoordinate=data.data.growthEnvironment.baseCoordinate;
				$(".page1").css("background","url(http://ditu.google.cn/maps/api/staticmap?maptype=satellite&key=AIzaSyB2mG9FLX3dYDFycXGkmidn-OZU-FL1rLM&sensor=false&size=640x1136&center="+baseCoordinate+"&zoom=10) no-repeat center");
				
				localStorage.source = JSON.stringify(data);
//				console.log(localStorage.source.data.welcome.logoImg);
				
				//微信分享
				if(data.data.welcome.logoImg!=null){
					imgUrl=data.data.welcome.plantImg;
				}
				
				if(data.data.welcome.resumeName!=null){
					myname=data.data.welcome.resumeName;
					$("title").text(myname);
				}
				else{
					myname="Hi 朋友，送您一个红包，农产品就要买好的";
				}
				if(data.data.welcome.resumeContent!=null){
					enName=data.data.welcome.resumeContent;
				}
				else{
					enName="我只购买有绿色履历的农产品，生长环境、生产过程，想看啥就看啥，同为吃货的你懂的~";
				}
				fenxiang(myname,enName,imgUrl,myurl);
				//底部
				//评论
				if(data.data.bottom.commentShow == "1") {
					$(".pl-icon3").addClass("on");
					$(".pl-icon3,.pl-input").attr("onclick", "plShow()");
					if(parseInt(data.data.bottom.commentNumber) <= 99) {
						$(".pl-icon3 .pl-num").text(data.data.bottom.commentNumber);
					} else {
						$(".pl-icon3 .pl-num").text("99+");
					}
				} else {
					$(".pl-icon3 .pl-num").remove();
				}
				//点赞
				if(data.data.bottom.thumbsUpShow == "1") {
					$(".pl-icon2").addClass("on");
					$(".pl-icon2").attr("onclick", "dzShow()");
					if(data.data.bottom.thumbsUpNumber <= 99) {
						$(".pl-icon2 .pl-num").text(data.data.bottom.thumbsUpNumber);
					} else {
						$(".pl-icon2 .pl-num").text("99+");
					}
				} else {
					$(".pl-icon2 .pl-num").remove();
				}
				//我要购买
				if(data.data.bottom.purchaseShow == "1") {
					//一键购买
					if(data.data.bottom.purchaseSelected==1){
						purchase=purchase+"enterprise_info_id=316&product_id="+data.data.bottom.purchaseContent;
					}
					//网址
					if(data.data.bottom.purchaseSelected==2){
						purchase=data.data.bottom.purchaseContent;
						if(purchase.indexOf("http")>=0){
						}
						else{
							purchase="http://"+data.data.bottom.purchaseContent;
						}
					}
					$(".pl-icon1").addClass("on");
					$(".pl-icon1").click(function() {
						//window.location.href = purchase;
						removeflash();
						clearInterval(flashrepeat);
						$(".show-iframe iframe").attr("src",purchase);						
						$(".show-iframe").show();
						$(".show-iframe .back").delay(1000).fadeIn(500);
						$("#dowebok,.pinglun").delay(1000).fadeOut(0);
					});

				} else {

				}
				//加载页
				//logo
				$(".logo img").attr("src", data.data.welcome.logoImg);
				//作物图
				$(".plantImg").attr("src", data.data.welcome.plantImg);
				
				//第一页
				//作物图
				$(".page1-img7 img").attr("src", data.data.welcome.plantImg);
				//基地位置
				if(data.data.welcome.basePositionShow == "1") {
					$("#basePosition,#basePosition1").text(data.data.welcome.basePosition);
				} else {
					$(".page1-position").hide();
				}
				//种植标准
				if(data.data.welcome.plantStandardShow == "1") {
					$(".line2-txt").text(data.data.welcome.plantStandard);
				} else {
					$(".page1-img8,.line2,.line2-txt").remove();
				}
				//种植时间
				if(data.data.welcome.plantTimeShow == "1" && data.data.welcome.floristicsType!=2) {
					$("#zznian").text(data.data.welcome.plantTimeYear);
					$("#zzyue").text(data.data.welcome.plantTimeMonth);
					$("#zzri").text(data.data.welcome.plantTimeDay);
				} else {
					$(".line3-txt-wrap p:eq(0)").remove();
				}
				//采收时间
				if(data.data.welcome.recoveryTimeShow == "1") {
					$("#csnian").text(data.data.welcome.recoveryTimeYear);
					$("#csyue").text(data.data.welcome.recoveryTimeMonth);
					$("#csri").text(data.data.welcome.recoveryTimeDay);
				} else {
					$(".line3-txt-wrap p:eq(1)").remove();
				}
				if($(".line3-txt-wrap p").length==1){
					$(".line3-txt-wrap").css("padding","13px 21px");
					$(".line3-txt").css({
						"bottom":"11%",
						"height":"70px"
					});
				}
				//成熟度
				if(data.data.welcome.maturityShow == "1") {
					$(".page1-img10 span").text(data.data.welcome.maturity);
				} else {
					$(".page1-img10").remove();
				}
				//产品名称
				$(".cropName").text(data.data.welcome.cropName);
				//所在基地
				$("#baseName,.page1-img2").text(data.data.welcome.baseName);
				$("#tunnelName").text(data.data.welcome.tunnelName);
				if($(".w-szjd").text().length<=17){
					$(".line1-txt-wrap").css("padding","25px");
				}
				
				//产品介绍
				if(data.data.welcome.productIntroductionShow == "1" && data.data.welcome.productIntroduction != null) {
					//$(".page1-three-title .cropName").text(data.data.welcome.cropName);
					$("#prodes").contents().find('.page1-three-wrap-des').empty();
					//$(".page1-three-wrap").text(data.data.welcome.productIntroduction);
					$("#prodes").contents().find('.page1-three-wrap-des').append(data.data.welcome.productIntroduction);
					
				} else {
					$(".page1-img9,.page1-three").remove();
				}

				//第二页
				//实时视频
				if(data.data.growthProcess.realTimeVideoShow == "1" || data.data.growthProcess.realityShow == "1" || data.data.growthProcess.videoTracingShow == "1") {
					$(".page3-first-img1").show();
				} else {
					$(".page3-first-img1").remove();
				}
				//资源规划
				if(data.data.growthEnvironment.resourcePlanningShow == "1") {
					var enterpriseInfoId=data.data.welcome.enterpriseInfoId;
					var baseId=data.data.welcome.baseId;
					//var enterpriseInfoId=3;
					//var baseId=2;
					resourcePlanning=resourcePlanning+"enterprise_Id="+enterpriseInfoId+"&base_Id="+baseId;
					
					//$(".page2-tab").append('<div class="slide"><img src="' + data.data.growthEnvironment.resourcePlanningImg + '" /></div>');
					//$(".page2-tab").append('<div class="slide c-zygh"><iframe src="'+resourcePlanning+'" width="100%" height="100%" frameborder="no"></iframe></div>');
					if(data.data.growthEnvironment.resourcePlanningImg!="" && data.data.growthEnvironment.resourcePlanningImg!=null){
						$("#szhj .carousel-inner").append('<div class="item c-zygh"><img src="' + data.data.growthEnvironment.resourcePlanningImg + '" /></div>');
					}
					else{
						$("#szhj .carousel-inner").append('<div class="item c-zygh"><iframe src="'+resourcePlanning+'" width="100%" height="100%" frameborder="no" id="zyghiframe"></iframe></div>');
					}
					
					//查看资源规划
					$(".zz1").click(function() {
						removeflash();
						clearInterval(flashrepeat);
						if($(".c-zygh").hasClass("active")) {
							//window.location.href = resourcePlanning;
							removeflash();
							clearInterval(flashrepeat);
							$(".show-iframe iframe").attr("src",resourcePlanning);
							$(".show-iframe").show();
							$(".show-iframe .back").delay(1000).fadeIn(500);
							$("#dowebok,.pinglun").delay(1000).fadeOut(0);
						}
					});
				}
				//四季田景
				if(data.data.growthEnvironment.krpanosShow == "1" /*&& data.data.growthEnvironment.krpanosImg != null*/ ) {

					//$(".page2-tab").append('<div class="slide c-sjtj"><img src="' + data.data.growthEnvironment.krpanosImg + '" /><div class="season"><img src="/images/resume2/page3-icon9.png" /></div></div>');
					$("#szhj .carousel-inner").append('<div class="item c-sjtj"><img src="' + data.data.growthEnvironment.krpanosImg + '@640w_400h_1e_1c.src'+'" /><div class="season"><img src="/asset/images/resume2/page3-icon9.png" /></div></div>');
					//查看四季田景
					$(".zz1").click(function() {
						if($(".c-sjtj").hasClass("active")) {
							/*window.location.href = "http://qj.farmeasy.cn/Panorama.seam?gid=" + data.data.growthEnvironment.krpanosId;*/
							//window.location.href = krpanos;
							removeflash();
							clearInterval(flashrepeat);
							$(".show-iframe iframe").attr("src",krpanos+data.data.growthEnvironment.krpanosId);
							$(".show-iframe").show();
							$(".show-iframe .back").delay(1000).fadeIn(500);
							$("#dowebok,.pinglun").delay(1000).fadeOut(0);
						}
					});
				}
				//农场实景 
				if(data.data.growthEnvironment.farmRealShow == "1" && data.data.growthEnvironment.farmRealImg != null) {
					if(data.data.growthEnvironment.farmRealImg.length != 0){ 
						var arr = data.data.growthEnvironment.farmRealImg;
						$("#myCarousel2 .carousel-inner").append('<div class="item active"><img src="' + arr[0] + '@640w_400h_1e_1c.src'+'" /></div>');
						for(var i = 0; i < arr.length - 1; i++) {
							$("#myCarousel2 .carousel-inner").append('<div class="item"><img src="' + arr[i + 1] +'@640w_400h_1e_1c.src'+ '" /></div>');
						}
						//$(".page2-tab").append('<div class="slide c-ncsj"><img src="' + arr[0] + '" /></div>');
						$("#szhj .carousel-inner").append('<div class="item c-ncsj"><img src="' + arr[0] + '@640w_400h_1e_1c.src'+'" /></div>');
						$("#page2-all-num").text($("#myCarousel2 .carousel-inner .item").length);
						if($("#myCarousel2 .carousel-inner .item").length==1){
							$("#myCarousel2 .page2-left-btn,#myCarousel2 .page2-right-btn").hide();
						}
					}
					
				} else {
					$(".page2-three").remove();
				}
				if($(".page2-tab .slide").length = 1) {
					$(".page2-tab .fp-controlArrow").hide();
				}
				$("#szhj .carousel-inner .item:eq(0)").addClass("active");
				if(data.data.growthEnvironment.resourcePlanningShow == "0"&&data.data.growthEnvironment.krpanosShow == "0"&&data.data.growthEnvironment.farmRealShow == "0"){
					$("#szhj .page2-left-btn,#szhj .page2-right-btn").hide();
				}
				else{
					$('#szhj').carousel({
						interval: 3000
					});
					funleft =function(){
						$("#szhj").carousel('next');
					}
					funright =function(){
						$("#szhj").carousel('prev');
					}
				}
				
				
				//专家解读
				$(".page2-more").click(function() {
					removeflash();
					clearInterval(flashrepeat);
					$(".pinglun").removeClass("slideInUp").hide();
					$(".page2-second-bg iframe").attr("src", "environment.html?"+urladdress);
					$(".page2-second").removeClass("slideOutRight").delay(500).show("scale");
					if(data.data.fingerprint.voiceUrl!=null && data.data.fingerprint.voiceUrl!=""){
						$("#page_music")[0].play();
					}
					
					$(".icon1").addClass("cur").show();
					$(".icon2").hide();
					$("#dowebok").delay(1000).fadeOut(0);	
				});
				$(".page2-second .back").click(function() {
					$("#dowebok").fadeIn(0);
					secondflash();
					if(data.data.fingerprint.voiceUrl!=null && data.data.fingerprint.voiceUrl!=""){
						$("#page_music")[0].pause();
					}
					$(".icon1").removeClass("cur").hide();
					$(".icon2").show();
					$(".page2-second").addClass("slideOutRight");
					$(".page2-second").delay(1000).fadeOut(0);
					$(".page2-shujupic .pflash").removeClass("current").hide();
					$(".page2-shujupic .pflash:first-child").addClass("current").show();
					$(".dian img,.page2-flash1-img1,.page2-flash1-img2,.page2-flash1-img3,.page2-flash1-img4,.page2-flash1-img5,.page2-flash1-img6,.page2-flash1-img7,.page2-flash1-img8").hide();
					$(".pinglun").delay(1000).fadeIn(0).addClass("slideInUp");
					$(".page2-second-bg iframe").attr("src", "");
				});
				if(data.data.fingerprint.interpretationShow == "1") {
					$("#page_music").attr("src", data.data.fingerprint.voiceUrl);
					
				} else {
					$(".page2-talk,#page_music").remove();
				}
				//气象数据
				if(data.data.growthEnvironment.meteorologicalShow == "1") {
					$(".page2-txt li:eq(0) span").text(data.data.growthEnvironment.Illumination);
					$(".page2-txt li:eq(1) span").text(data.data.growthEnvironment.precipitation);
					$(".page2-txt li:eq(2) span").text(data.data.growthEnvironment.temperatureDifference);
					$(".page2-txt li:eq(3) span").text(data.data.growthEnvironment.accumulatedTemperature);
				} else {
					$(".yellow-map,.page2-img1,.page2-img4,.page2-img5,.page2-img6,.raincanvas,.page2-txt").remove();
				}
				//环境特色
				$(".page2-en-wrap").text(data.data.growthEnvironment.environmentalFeature);

				//第三页生长过程
				//生长树
				if(data.data.growthProcess.growthPeriod=="1"){
					$("#growth2,#growth3").remove();
				}
				if(data.data.growthProcess.growthPeriod=="2"){
					$("#growth1,#growth3").remove();
				}
				if(data.data.growthProcess.growthPeriod=="3"){
					$("#growth1,#growth2").remove();
				}
				//农事展示
				/*if(data.data.growthProcess.farmingShow == "1" && data.data.growthProcess.farmingInformation.length != 0) {*/
				if(data.data.growthProcess.farmingShow == "1" && data.data.growthProcess.farmingInformation != null && data.data.growthProcess.farmingInformation.length!=0) {
					var dd = data.data.growthProcess.farmingInformation;
					//console.log("农事个数："+dd.length);
					//农事内容
					$(".slide-tilte-wrap ul").empty();
					//农事图片
					$("#myCarousel .carousel-inner").empty();
					//周期名
					$(".slide-tilte-list ul").empty();
					//树
					if(data.data.growthProcess.farmingInformation.length>0){
						$(".slide-tree li").removeClass('cur');
						$(".slide-tree li:eq(" + (data.data.growthProcess.farmingInformation[0].cycleTree-1) + ")").addClass('cur');
					}
					//操作时间
					if(data.data.growthProcess.farmingInformation[0].outerOperationTime!=undefined){
						$(".page3-time").text(data.data.growthProcess.farmingInformation[0].outerOperationTime);
						$("#before-time").text("");
						if(data.data.growthProcess.farmingInformation.length > 1) {
							$("#after-time").text(data.data.growthProcess.farmingInformation[1].outerOperationTime.substring(5, 15));
						} else {
							$("#after-time").text("");
							$("#myCarousel .page3-left-btn,#myCarousel .page3-right-btn").hide();
						}
					}
					

					var html1 = '';
					var html2 = '';
					var html3 = '';
					
					var pagecur1 = 1;
					var pageSize1 = 10;
					var totalnum1 = dd.length;
					var pagetotal1 = Math.ceil(totalnum1 / pageSize1);
					var start1 = 0;
					var startnum1 = 10;
					var startshotTime1 = 0;
					
					
					if(dd.length < 10) {
						for(start1 = 0; start1 < dd.length; start1++) {
							if(data.data.growthProcess.farmingInformation[start1].farmingImgs.length==0){
								html1 += '<div class="item"><img src="/asset/images/resume2/nopic.png" /></div>';
							}
							else{
								html1 += '<div class="item"><img src="' + data.data.growthProcess.farmingInformation[start1].farmingImgs[0] + '@640w_400h_1e_1c.src" /></div>';
							}
							html2 += '<li>' + data.data.growthProcess.farmingInformation[start1].farmingContent + '</li>';
							if(data.data.growthProcess.farmingInformation[start1].cycleName!=undefined){
								html3 += '<li>' + data.data.growthProcess.farmingInformation[start1].cycleName + '</li>';
							}
							else{
								html3 += '<li></li>';
							}
						}
					} else {
						for(start1 = 0; start1 < startnum1; start1++) {
							if(data.data.growthProcess.farmingInformation[start1].farmingImgs.length==0){
								html1 += '<div class="item"><img src="/asset/images/resume2/nopic.png" /></div>';
							}
							else{
								html1 += '<div class="item"><img src="' + data.data.growthProcess.farmingInformation[start1].farmingImgs[0] + '@640w_400h_1e_1c.src" /></div>';
							}
							html2 += '<li>' + data.data.growthProcess.farmingInformation[start1].farmingContent + '</li>';
							if(data.data.growthProcess.farmingInformation[start1].cycleName!=undefined){
								html3 += '<li>' + data.data.growthProcess.farmingInformation[start1].cycleName + '</li>';
							}
							else{
								html3 += '<li></li>';
							}
						}
					}
					startnum1 += 10;
					startshotTime1 += 10 - 1;
					
					/*for(var i = 0; i < d.length; i++) {
						if(data.data.growthProcess.farmingInformation[i].farmingImgs.length==0){
							html1 += '<div class="item"><img src="/asset/images/resume2/nopic.png" /></div>';
						}
						else{
							html1 += '<div class="item"><img src="' + data.data.growthProcess.farmingInformation[i].farmingImgs[0] + '@640w_400h_1e_1c.src" /></div>';
						}
						html2 += '<li>' + data.data.growthProcess.farmingInformation[i].farmingContent + '</li>';
						if(data.data.growthProcess.farmingInformation[i].cycleName!=undefined){
							html3 += '<li>' + data.data.growthProcess.farmingInformation[i].cycleName + '</li>';
						}
						else{
							html3 += '<li></li>';
						}
					}*/
					//农事图片
					$("#myCarousel .carousel-inner").append(html1);
					$("#myCarousel .carousel-inner .item:eq(0)").addClass("active");
					//农事内容
					$(".slide-tilte-wrap ul").append(html2);
					$(".slide-tilte-wrap ul li:eq(0)").addClass("cur");
					//周期名
					$(".slide-tilte-list ul").append(html3);
					$(".slide-tilte-list ul li:eq(0)").addClass("cur");
					var cnum = 0;
					$("#myCarousel .page3-right-btn").click(function() {
						
						var nowTime = new Date().getTime();
						var clickTime = $(this).attr("ctime");
						if(clickTime != 'undefined' && (nowTime - clickTime < 1000)) {
							return false;
						} else {
							$(this).attr("ctime", nowTime);
							$("#myCarousel .page3-left-btn").show();
							var inde = $("#myCarousel .item.active").index();
							$("#myCarousel .page3-left-btn").attr("data-slide1", "prev");
							if($("#myCarousel .carousel-inner div.active").next("div").length != 0) {
								$(this).attr("data-slide1", "next");
								cnum++;
	
								$(".page3-zhou").animate({ left: '-=90px', });
								$(".slide-tree li").fadeOut(700);
								//$(".slide-tree li:eq(" + cnum + ")").fadeIn(700);
								$(".slide-tree li:eq(" + (data.data.growthProcess.farmingInformation[inde+1].cycleTree-1) + ")").fadeIn(700);
	
								$(".slide-tilte-wrap li").fadeOut(700);
								$(".slide-tilte-wrap li:eq(" + cnum + ")").fadeIn(700);
	
								$(".slide-tilte-list li").fadeOut(700);
								$(".slide-tilte-list li:eq(" + cnum + ")").fadeIn(700);
								//时间
								$(".page3-time").text(data.data.growthProcess.farmingInformation[inde + 1].outerOperationTime);
								if(inde == dd.length - 2) {
									$("#before-time").text(data.data.growthProcess.farmingInformation[inde].outerOperationTime.substring(5, 15));
									$("#after-time").text("");
								} else {
									$("#before-time").text(data.data.growthProcess.farmingInformation[inde].outerOperationTime.substring(5, 15));
									$("#after-time").text(data.data.growthProcess.farmingInformation[inde + 2].outerOperationTime.substring(5, 15));
								}
	
							} else {
								$(this).removeAttr("data-slide1");
								$("#after-time").text("");
							}
							if($("#myCarousel .carousel-inner div.active").nextAll("div").length == 1) {
								$(this).hide();
							}
							
							if($("#myCarousel .carousel-inner div.active").nextAll("div").length ==3){
								pagecur1++;
								html1="";
								html2="";
								html3="";
								if(pagecur1 < pagetotal1) {
									if(totalnum1-startnum1<10){
										//console.log("pagetotal:"+pagetotal1+"----"+"pagecur:"+pagecur1+"-----"+"start:"+start1+"------"+"startnum:"+startnum1);
										for(var i = start1; i < totalnum1; i++) {
											if(data.data.growthProcess.farmingInformation[i].farmingImgs.length==0){
												html1 += '<div class="item"><img src="/asset/images/resume2/nopic.png" /></div>';
											}
											else{
												html1 += '<div class="item"><img src="' + data.data.growthProcess.farmingInformation[i].farmingImgs[0] + '@640w_400h_1e_1c.src" /></div>';
											}
											html2 += '<li>' + data.data.growthProcess.farmingInformation[i].farmingContent + '</li>';
											if(data.data.growthProcess.farmingInformation[i].cycleName!=undefined){
												html3 += '<li>' + data.data.growthProcess.farmingInformation[i].cycleName + '</li>';
											}
											else{
												html3 += '<li></li>';
											}
										}
										//农事图片
										$("#myCarousel .carousel-inner").append(html1);
										//农事内容
										$(".slide-tilte-wrap ul").append(html2);
										//周期名
										$(".slide-tilte-list ul").append(html3);
									}
									else{
										for(var i = start1; i < startnum1; i++) {
											if(data.data.growthProcess.farmingInformation[i].farmingImgs.length==0){
												html1 += '<div class="item"><img src="/asset/images/resume2/nopic.png" /></div>';
											}
											else{
												html1 += '<div class="item"><img src="' + data.data.growthProcess.farmingInformation[i].farmingImgs[0] + '@640w_400h_1e_1c.src" /></div>';
											}
											html2 += '<li>' + data.data.growthProcess.farmingInformation[i].farmingContent + '</li>';
											if(data.data.growthProcess.farmingInformation[i].cycleName!=undefined){
												html3 += '<li>' + data.data.growthProcess.farmingInformation[i].cycleName + '</li>';
											}
											else{
												html3 += '<li></li>';
											}
										}
										//农事图片
										$("#myCarousel .carousel-inner").append(html1);
										//农事内容
										$(".slide-tilte-wrap ul").append(html2);
										//周期名
										$(".slide-tilte-list ul").append(html3);
									}
									start1 += 10;
									startnum1 += 10;
									startshotTime1 += 10;
									
									
								}
							}
							
						}
					});
					$("#myCarousel .page3-left-btn").click(function() {
						var nowTime = new Date().getTime();
						var clickTime = $(this).attr("ctime");
						if(clickTime != 'undefined' && (nowTime - clickTime < 1000)) {
							return false;
						} else {
							$(this).attr("ctime", nowTime);
							$("#myCarousel .page3-right-btn").show();
							var inde = $("#myCarousel .item.active").index();
							$("#myCarousel .page3-right-btn").attr("data-slide1", "next");
							if($("#myCarousel .carousel-inner div.active").prev("div").length != 0) {
								$(this).attr("data-slide1", "prev");
								cnum--;
	
								$(".page3-zhou").animate({ left: '+=90px', });
								$(".slide-tree li").fadeOut(700);
								//$(".slide-tree li:eq(" + cnum + ")").fadeIn(700);
								$(".slide-tree li:eq(" + (data.data.growthProcess.farmingInformation[inde-1].cycleTree-1) + ")").fadeIn(700);
	
								$(".slide-tilte-wrap li").fadeOut(700);
								$(".slide-tilte-wrap li:eq(" + cnum + ")").fadeIn(700);
	
								$(".slide-tilte-list li").fadeOut(700);
								$(".slide-tilte-list li:eq(" + cnum + ")").fadeIn(700);
	
								//时间
								$(".page3-time").text(data.data.growthProcess.farmingInformation[inde - 1].outerOperationTime);
								if(inde == 1) {
									$("#before-time").text("");
									$("#after-time").text(data.data.growthProcess.farmingInformation[inde].outerOperationTime.substring(5, 15));
								} else {
									$("#before-time").text(data.data.growthProcess.farmingInformation[inde - 2].outerOperationTime.substring(5, 15));
									$("#after-time").text(data.data.growthProcess.farmingInformation[inde].outerOperationTime.substring(5, 15));
								}
	
							} else {
								$(this).hide();
								$(this).removeAttr("data-slide1");
								$("#before-time").text("");
							}
							if($("#myCarousel .carousel-inner div.active").prevAll("div").length == 1) {
								$(this).hide();
							}
						}
					});

					//查看图片
					$("#myCarousel").on("click",".carousel-inner .item",function() {
						$(".page3-three-slide-des p").show();
						var ind = $(this).index();
						
						for(var i = 0; i < dd.length; i++) {
							if(ind == i) {
								$(".pinglun").removeClass("slideInUp").hide();
								$(".page3-three").removeClass("slideOutRight").show("scale");
								$(".pinglun").removeClass("slideInUp").hide();
								//$(".page3-center").center2();
								$("#dowebok").delay(1000).fadeOut(0);
								$("#myCarousel1 .carousel-inner").empty();
								for(var j = 0; j < data.data.growthProcess.farmingInformation[i].farmingImgs.length; j++) {
									$("#myCarousel1 .carousel-inner").append('<div class="item"><img src="' + data.data.growthProcess.farmingInformation[i].farmingImgs[j] + '@640w_400h_1e_1c.src" onclick="scanimg(this)"/></div>');
								}
								if($("#myCarousel1 .carousel-inner .item").length==1){
									$("#myCarousel1 .page3-left-btn,#myCarousel1 .page3-right-btn").hide();
								}
								else{
									$("#myCarousel1 .page3-left-btn,#myCarousel1 .page3-right-btn").show();
								}
								if($("#myCarousel1 .carousel-inner .item").length==0){
									$("#myCarousel1 .carousel-inner").append('<div class="item"><img src="/asset/images/resume2/nopic.png"/></div>');
									$("#myCarousel1 .page3-left-btn,#myCarousel1 .page3-right-btn").hide();
								}
								//$(".page3-time").text(data.data.growthProcess.farmingInformation[i].outerOperationTime);
								//投入品
								$("#inputsType,#inputsName,#inputsUsage").empty();
								//alert(data.data.growthProcess.farmingInformation[i].inputsInfo);
								/*if(data.data.growthProcess.farmingInformation[i].inputsInfo.length > 0 && data.data.growthProcess.farmingInformation[i].inputsInfo!=null) {*/
								if(data.data.growthProcess.farmingInformation[i].inputsInfo!= undefined && data.data.growthProcess.farmingInformation[i].inputsInfo.length > 0 && data.data.growthProcess.farmingInformation[i].inputsInfo!=null) {
									for(var z = 0; z < data.data.growthProcess.farmingInformation[i].inputsInfo.length; z++) {
										$("#inputsType").append(data.data.growthProcess.farmingInformation[i].inputsInfo[z].inputsType + "，");
										$("#inputsName").append(data.data.growthProcess.farmingInformation[i].inputsInfo[z].inputsName + "，");
										$("#inputsUsage").append(data.data.growthProcess.farmingInformation[i].inputsInfo[z].inputsUsage + "kg，");
									}
								}
								else{
									$("#inputsType,#inputsName,#inputsUsage").parents("p").hide();
								}
								//操作时间
								if(data.data.growthProcess.farmingInformation[i].operatingTime!=null && data.data.growthProcess.farmingInformation[i].operatingTime!=""){
									$("#operatingtime").text(data.data.growthProcess.farmingInformation[i].operatingTime);
								}
								else{
									$("#operatingtime").parents("p").hide();
								}
								//操作内容
								if(data.data.growthProcess.farmingInformation[i].farmingContent!=null && data.data.growthProcess.farmingInformation[i].farmingContent!=""){
									$("#farmingContent").text(data.data.growthProcess.farmingInformation[i].farmingContent);
								}
								else{
									$("#farmingContent").parents("p").hide();
								}
								//操作人
								if(data.data.growthProcess.farmingInformation[i].farmingOperator!=null && data.data.growthProcess.farmingInformation[i].farmingOperator!=""){
									for(var z = 0; z < data.data.growthProcess.farmingInformation[i].farmingOperator.length; z++) {
										$("#farmingOperator").text(data.data.growthProcess.farmingInformation[i].farmingOperator[z]+" ");
									}
								}
								else{
									$("#farmingOperator").parents("p").hide();
								}
								//工时
								if(data.data.growthProcess.farmingInformation[i].farmingWorkingHours!=null && data.data.growthProcess.farmingInformation[i].farmingWorkingHours!=""){
									$("#farmingWorkingHours").text(data.data.growthProcess.farmingInformation[i].farmingWorkingHours);
								}
								else{
									$("#farmingWorkingHours").parents("p").hide();
								}
								//成本
								if(data.data.growthProcess.farmingInformation[i].farmingCost!=null && data.data.growthProcess.farmingInformation[i].farmingCost!=""){
									$("#farmingCost").text(data.data.growthProcess.farmingInformation[i].farmingCost);	
								}
								else{
									$("#farmingCost").parents("p").hide();
								}
								//环境温度
								if(data.data.growthProcess.farmingInformation[i].farmingTemperature!=null && data.data.growthProcess.farmingInformation[i].farmingTemperature!=""){
									$("#farmingTemperature").text(data.data.growthProcess.farmingInformation[i].farmingTemperature);	
								}
								else{
									$("#farmingTemperature").parents("p").hide();
								}
								//环境湿度
								if(data.data.growthProcess.farmingInformation[i].farmingHumidity!=null && data.data.growthProcess.farmingInformation[i].farmingHumidity!=""){
									$("#farmingHumidity").text(data.data.growthProcess.farmingInformation[i].farmingHumidity);
								}
								else{
									$("#farmingHumidity").parents("p").hide();
								}
								//备注
								if(data.data.growthProcess.farmingInformation[i].farmingRemarks!=null && data.data.growthProcess.farmingInformation[i].farmingRemarks!=""){
									$("#farmingRemarks").text(data.data.growthProcess.farmingInformation[i].farmingRemarks);
								}
								else{
									$("#farmingRemarks").parents("p").hide();
								}
							}
						}
						$("#myCarousel1 .carousel-inner .item:eq(0)").addClass("active");
						$("#all-num").text($("#myCarousel1 .carousel-inner .item").length);

					});

				} else {
					$(".page3-three,.slide-tilte-wrap,.slide-wrap,.page3-time,.page3-timelist,.page3-timezhou,.page3-timezhou-zz1,.page3-timezhou-zz2").remove();
				}
				//生育期
				if(data.data.growthProcess.growthPeriodShow == "1") {

				} else {
					$(".page3-tudui").remove();
					$(".slide-tree").remove();
					$(".slide-tilte-list").remove();
				}

				//第四页农场介绍
				
				/*if(data.data.introduction.farmingMasterShow == "0" && data.data.introduction.farmingMaster == null && data.data.introduction.farmingGrowerShow == "0" && data.data.introduction.farmingGrower == null && data.data.introduction.certificateShow == "0" && data.data.introduction.certificate == null){
					alert(1111);
				}*/
				
				//农场介绍
				if(data.data.introduction.farmIntroductionShow == "1") {
					if(data.data.introduction.farmIntroduction.length>=75){
						$(".page4-farminfo-des").text(data.data.introduction.farmIntroduction);
						var str=data.data.introduction.farmIntroduction.substring(0, 75);
						$(".des-wrap").text(str+"...");
						$(".page4-first-des").click(function(e){
							e.stopPropagation();
							$(".overlay").fadeIn(500);
							$(".page4-farminfo").fadeIn(500);
						});
						$(".closeinfo").click(function(e){
							e.stopPropagation();
							$(".overlay").fadeOut(500);
							$(".page4-farminfo").fadeOut(500);
						});
					}
					else{
						$(".des-wrap").text(data.data.introduction.farmIntroduction);
						$(".page4-farminfo,.overlay").remove();
					}
				} else {
					$(".des-wrap").empty();
				}
				//农场视频
				if(data.data.introduction.farmVideosShow == "1") {

				} else {
					$(".page4-first-sp").remove();
				}
				//数字名片
				if(data.data.introduction.digitalCardShow == "1" && data.data.introduction.digitalCardId != "null") {
					$(".page4-first-btn").click(function() {
						//window.location.href = digitalCard;
						removeflash();
						clearInterval(flashrepeat);
						$(".show-iframe iframe").attr("src",digitalCard+data.data.introduction.digitalCardId);
						$(".show-iframe").show();
						$(".show-iframe .back").delay(1000).fadeIn(500);
						$("#dowebok,.pinglun").delay(1000).fadeOut(0);
					});
				} else {
					$(".page4-first-btn").remove();
				}

				//农场主
				if(data.data.introduction.farmingMasterShow == "1" && data.data.introduction.farmingMaster != null) {
					$(".page4-first-piclist .ncz .pic-img img").attr("src", data.data.introduction.farmingMaster.imgUrl);
					$(".page4-first-piclist .ncz .name").text(data.data.introduction.farmingMaster.name);
				} else {
					$(".page4-first-piclist .ncz").remove();
				}
				//种植者
				if(data.data.introduction.farmingGrowerShow == "1" && data.data.introduction.farmingGrower != null) {
					$(".page4-first-piclist .zzz .pic-img img").attr("src", data.data.introduction.farmingGrower.imgUrl);
					$(".page4-first-piclist .zzz .name").text(data.data.introduction.farmingGrower.name);
				} else {
					$(".page4-first-piclist .zzz").remove();
				}
				//判断农场主
				if($(".page4-first-piclist .page4-first-pic").length==1){
					$(".page4-first-pic").css({
						"float":"none",
						"width":"188px",
						"margin":"auto"
					});
				}
				if($(".page4-first-piclist .page4-first-pic").length==0){
					$(".page4-first-piclist").remove();
				}
				//红包
				if(data.data.introduction.redPackShow == "1") {
					//redPack=redPack+data.data.introduction.redPackId;
					redPack=redPack+data.data.introduction.redPackId+"&typeAorP=1&prId="+data.data.welcome.productInfoId;
					function randNum() {
						var r = Math.ceil(Math.random() * 3);
						return r;
					}
					var r1 = randNum();
					if(r1 == 1) {
						$(".hongbao1").addClass("cur").show();
					}
					if(r1 == 2) {
						$(".hongbao2").addClass("cur").show();
					}
					if(r1 == 3) {
						$(".hongbao3").addClass("cur").show();
					}
					$(".hb").click(function() {
						//window.location.href = redPack;
						removeflash();
						clearInterval(flashrepeat);
						$(".show-iframe iframe").attr("src",redPack);
						$(".show-iframe").show();
						$(".show-iframe .back").delay(1000).fadeIn(500);
						$("#dowebok,.pinglun").delay(1000).fadeOut(0);
					});

				} else {
					$(".hb").remove();
				}

				//资质证书
				if(data.data.introduction.certificateShow == "1" && data.data.introduction.certificate != null) {
					var f = data.data.introduction.certificate;
					var pagecur = 1;
					var pageSize = 10;
					var totalnum = f.length;
					var pagetotal = Math.ceil(totalnum / pageSize);
					var start = 0;
					var startnum = 10;
					var startshotTime = 0;
					if(f.length < 10) {
						for(start = 0; start < f.length; start++) {
							$(".poster-listpic").append('<li><img src="' + f[start] + '@210w_300h_1e_1c.src'+'"/></li>');
							//$(".poster-listpic").append('<li><img src="' + f[start] +'"/></li>');
							
							//$(".lunbo ul").append('<li><img src="'+f[start] + '@210w_300h_1e_1c.src'+'" ></li>');
							$("#showpic .carousel-inner").append('<div class="item"><table><tr><td><img src="' + f[start] +'"/></td></tr></table></div>');
						}
					} else {
						for(start = 0; start < startnum; start++) {
							$(".poster-listpic").append('<li><img src="' + f[start] + '@210w_300h_1e_1c.src'+'"/></li>');
							//$(".poster-listpic").append('<li><img src="' + f[start] +'"/></li>');
							//$(".lunbo ul").append('<li><img src="'+f[start] + '@210w_300h_1e_1c.src'+'" ></li>');
							$("#showpic .carousel-inner").append('<div class="item"><table><tr><td><img src="' + f[start] +'"/></td></tr></table></div>');
						}
					}
					startnum += 10;
					startshotTime += 10 - 1;
					
					$("#showpic .item:eq(0)").addClass("active");
					//$(".lunbo ul li:eq(0)").addClass("active-pic");
					//$(".lunbo ul li:eq(1)").addClass("right-pic");
					$(".poster-listpic li:eq(0)").addClass("left-pic");
					$(".poster-listpic li:eq(1)").addClass("active-pic");
					$(".poster-listpic li:eq(2)").addClass("right-pic");
					$(".pic0 img").attr("src",$(".poster-listpic li:eq(0) img").attr("src"));
					$(".pic1 img").attr("src",$(".poster-listpic li:eq(1) img").attr("src"));
					$(".pic2 img").attr("src",$(".poster-listpic li:eq(2) img").attr("src"));
					//右按钮事件
					$("#showpic .page2-right-btn,.lunboright,.poster-next-btn").click(function(){
						var nowTime = new Date().getTime();
						var clickTime = $(this).attr("ctime");
						if(clickTime != 'undefined' && (nowTime - clickTime < 1000)) {
							return false;
						} else {
							$(this).attr("ctime", nowTime);
							$("#showpic .page2-left-btn").show();
							//$(".lunboleft").show();
							$("#showpic").carousel('next');
							if($("#showpic .item.active").nextAll(".item").length==0){
								//$("#showpic .page2-right-btn").hide();
								//$(".lunboright").hide();
								//$(".lunbo ul li:eq(0)").addClass("right-pic");
								$(".poster-listpic li:eq(0)").addClass("right-pic");
							}
							/*if($(".poster-listpic li.active-pic").nextAll("li").length==1){
								$(".poster-listpic li:eq(0)").addClass("right-pic");
							}*/
							if($("#showpic .item.active").nextAll(".item").length==3){
								pagecur++;
								if(pagecur <= pagetotal) {
									console.log("pagecur:"+pagecur+"---"+"pagetotal:"+pagetotal+"----"+"startnum:"+startnum+"---"+"start:"+start+"---"+"startnum:"+startnum);
									if(totalnum-startnum<10){
										for(var i = start; i < totalnum; i++) {
											$(".poster-listpic").append('<li><img src="' + f[i] + '@210w_300h_1e_1c.src'+'"/></li>');
											//$(".poster-listpic").append('<li><img src="' + f[i] +'"/></li>');
											//$(".lunbo ul").append('<li><img src="'+f[i] + '@210w_300h_1e_1c.src'+'" ></li>');
											$("#showpic .carousel-inner").append('<div class="item"><table><tr><td><img src="' + f[i] +'"/></td></tr></table></div>');
										}
									}
									else{
										for(var i = start; i < startnum; i++) {
											$(".poster-listpic").append('<li><img src="' + f[i] + '@210w_300h_1e_1c.src'+'"/></li>');
											//$(".poster-listpic").append('<li><img src="' + f[i] +'"/></li>');
											//$(".lunbo ul").append('<li><img src="'+f[i] + '@210w_300h_1e_1c.src'+'" ></li>');
											$("#showpic .carousel-inner").append('<div class="item"><table><tr><td><img src="' + f[i] +'"/></td></tr></table></div>');
										}
									}
									start += 10;
									startnum += 10;
									startshotTime += 10;
								}
							}
							//$(".lunbo li.active-pic").addClass("left-pic").removeClass("active-pic").siblings("li").removeClass("left-pic");
							//$(".lunbo li.right-pic").addClass("active-pic").removeClass("right-pic");
							//$(".lunbo li.active-pic").next("li").addClass("right-pic");
							
							$(".poster-listpic li.active-pic").addClass("left-pic").removeClass("active-pic").siblings("li").removeClass("left-pic");
							$(".poster-listpic li.right-pic").addClass("active-pic").removeClass("right-pic");
							$(".poster-listpic li.active-pic").next("li").addClass("right-pic");
							$(".pic0 img").attr("src",$(".poster-listpic li.left-pic img").attr("src"));
							$(".pic1 img").attr("src",$(".poster-listpic li.active-pic img").attr("src"));
							$(".pic2 img").attr("src",$(".poster-listpic li.right-pic img").attr("src"));
							$(".pic0 img,.pic1 img,.pic2 img").imgsize();
						}
					});
					//左按钮事件
					$("#showpic .page2-left-btn,.lunboleft,.poster-prev-btn").click(function(){
						
						$("#showpic .page2-right-btn").show();
						//$(".lunboright").show();
						$("#showpic").carousel('prev');
						if($("#showpic .item.active").prevAll(".item").length==1){
							$("#showpic .page2-left-btn").hide();
							$(".lunboleft").hide();
						}
						//$(".lunbo li.active-pic").addClass("right-pic").removeClass("active-pic").siblings("li").removeClass("right-pic");
						//$(".lunbo li.left-pic").addClass("active-pic").removeClass("left-pic");
						//$(".lunbo li.active-pic").prev("li").addClass("left-pic");
						s
						$(".poster-listpic li.active-pic").addClass("right-pic").removeClass("active-pic").siblings("li").removeClass("right-pic");
						$(".poster-listpic li.left-pic").addClass("active-pic").removeClass("left-pic");
						$(".poster-listpic li.active-pic").prev("li").addClass("left-pic");
						$(".pic0 img").attr("src",$(".poster-listpic li.left-pic img").attr("src"));
						$(".pic1 img").attr("src",$(".poster-listpic li.active-pic img").attr("src"));
						$(".pic2 img").attr("src",$(".poster-listpic li.right-pic img").attr("src"));
					});
					
					setInterval(function() {
						//$(".lunboright").click();
						$(".poster-next-btn").click();
					}, 5000);
					
					/*for(var i = 0; i < f.length; i++) {
						$(".poster-list").append('<li class="poster-item"><a href="#"><img src="' + f[i] + '@210w_300h_1e_1c.src'+'"/></a></li>');
						$(".lunbo ul").append('<li><img src="'+f[i] + '@210w_300h_1e_1c.src'+'" ></li>');
						$("#showpic .carousel-inner").append('<div class="item"><table><tr><td><img src="' +f[i] +'"/></td></tr></table></div>');
					}
					$(".lunbo ul li:eq(0)").addClass("left-pic");
					$(".lunbo ul li:eq(1)").addClass("active-pic");
					$(".lunbo ul li:eq(2)").addClass("right-pic");
					
					$("#showpic .carousel-inner .item:eq(0)").addClass("active");
					if($("#showpic .carousel-inner .item").length==1){
						$("#showpic .page2-left-btn,#showpic .page2-right-btn").hide();
					}
					$("#showpic .page2-left-btn,#showpic .page2-right-btn").click(function(){
						
					});*/
					
					
					Carousel.init($(".pictureSlider"));
				} else {
					$(".page4-first-zs").remove();
				}
				//资质证书判断哪个存在
				if($(".page4-first .page4-first-zs").length==0 && $(".page4-first .page4-first-piclist").length==0){
					$(".page4-first-title").css({
						"padding-top":"30%"
					});
					$(".mt1").css({
						"margin-top":"10%"
					});
				}
				if($(".page4-first .page4-first-zs").length==0){
					$(".page4-first-title").css({
						"padding-top":"15%"
					});
					$(".mt1").css({
						"margin-top":"9%"
					});
				}
				if($(".page4-first .page4-first-piclist").length==0){
					$(".page4-first-title").css({
						"padding-top":"13%"
					});
					$(".mt1").css({
						"margin-top":"9%"
					});
				}
				/*$(".pictureSlider  li").click(function() {
					$(".pinglun").removeClass("slideInUp").hide();
					var src = $(this).find("img").attr("src");
					$(".showpic #cur-zs").attr("src", src);
					$(".page4-showpic").removeClass("slideOutRight").delay(500).show("scale");
				});*/
				$(".lunbo").on("click","li.active-pic",function() {
					$(".pinglun").removeClass("slideInUp").hide();
					$(".page4-showpic").removeClass("slideOutRight").delay(500).show("scale");
				});
				$(".pictureSlider").on("click",".poster-item",function() {
					$(".pinglun").removeClass("slideInUp").hide();
					$(".page4-showpic").removeClass("slideOutRight").delay(500).show("scale");
				});
				
				//链接关闭按钮
				$(".show-iframe .back").click(function() {
					$("#dowebok,.pinglun").show();
					$(".show-iframe").hide();
					$(".show-iframe .back").hide();
					$(".show-iframe iframe").attr("src","");
				});
				setTimeout('welcomeflash()',1000);
				setTimeout('loading()',1200);
				//返回按钮
				window.addEventListener("popstate", function(e) {  
					$(".window-iframe").hide();
					$("#dowebok,.pinglun").show();
				}, false); 
			}

		},
		error: function(err) {
			console.log("请求失败");
		}
	});
	//点赞
	//点赞事件
	dzShow = function() {
		$.ajax({
			type: "POST",
			url: pathurl+'?method=resume.thumbsUp.data',
			data: {field: JSON.stringify(getName)},
			dataType: "jsonp",
			success: function(data) {
				if(data.invoke_result == "INVOKE_SUCCESS") {
					var c = parseInt($("#dz-num").text());
					var num = c + 1;
					if(num > 99) {
						$(".pl-icon2 #dz-num").text("99+");
					} else {
						$(".pl-icon2 #dz-num").text(num);
					}
					$(".pl-icon2").removeAttr("onclick");
				}
			},
			error: function(err) {
				console.log("请求失败");
			}
		});
	}
});
//微信分享接口
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
				debug:false,
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
						//分享
						$.ajax({
							type: "POST",
							url: pathurl+'?method=resume.forward.data',
							data: {field: JSON.stringify(getName)},
							dataType: "jsonp",
							success: function(data) {
								if(data.invoke_result == "INVOKE_SUCCESS") {
									
								}
							}
						});
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
						//分享
						$.ajax({
							type: "POST",
							url: pathurl+'?method=resume.forward.data',
							data: {field: JSON.stringify(getName)},
							dataType: "jsonp",
							success: function(data) {
								if(data.invoke_result == "INVOKE_SUCCESS") {
									
								}
							}
						});
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
						//分享
						$.ajax({
							type: "POST",
							url: pathurl+'?method=resume.forward.data',
							data: {field: JSON.stringify(getName)},
							dataType: "jsonp",
							success: function(data) {
								if(data.invoke_result == "INVOKE_SUCCESS") {
									
								}
							}
						});
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
//判断图片横向还是竖向
$.fn.imgsize = function() {
	if(this.width()>this.height()){
		//this.css("width","100%");
		//this.css("height","140px");
	}
	else{
		//this.css("width","210px");
		//this.css("height","300px");
	}
	return this;
}

//改变窗口大小
$(window).resize(function() {
	$("body,.page,.section").height($(window).height());
	//屏幕高度
	if($(window).height() < 950) {
		$(".page3-first-img1").css("bottom","175px");
		$(".page2-map").css("top","315px");
		$(".page2-en").css("top","580px");
		$(".pic-img").css({"width":"110px","height":"110px"});
	}
	if($(window).height() >= 950 && $(window).height() < 1020) {
		$(".page3-first-img1").css("bottom", "205px");
		$(".page2-map").css("top","360px");
		$(".page2-en").css("top","635px");
		$(".page4-first-btn,.page4-first-zs,.page4-first-piclist,.page4-first-des").addClass("mt1");
	}
	if($(window).height() >= 1020 && $(window).height() < 1100) {
		$(".page3-first-img1").css("bottom", "235px"); 
		$(".page2-map").css("top","390px");
		$(".page2-en").css("top","690px");
		$(".page4-first-btn,.page4-first-zs,.page4-first-piclist,.page4-first-des").addClass("mt2");
	}
	if($(window).height() >= 1100) {
		$(".page3-first-img1").css("bottom", "285px"); 
		$(".page2-map").css("top","400px");
		$(".page2-en").css("top", "initial"); 
		$(".page2-en").css("bottom", "245px"); 
		$(".page4-first-btn,.page4-first-zs,.page4-first-piclist,.page4-first-des").addClass("mt3");
	}
	loading();
});

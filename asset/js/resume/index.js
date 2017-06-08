
function zzpicCarousel(){
	/*$(".lunbo").PicCarousel({
		"width": 137, //幻灯片的宽度
		"height": 100, //幻灯片的高度
		"posterWidth": 59, //幻灯片第一帧的宽度
		"posterHeight": 87, //幻灯片第一张的高度
		"scale": 0.8, //记录显示比例关系
		"speed": 500, //记录幻灯片滚动速度
		"autoPlay": true, //是否开启自动播放
		"delay": 2000, //自动播放间隔
		"verticalAlign": "center" //图片对齐位置
	});*/
	Carousel.init($(".pictureSlider"));
}
// JavaScript Document
var loading; //整体动画
var dzShow; //点赞
var resetpl; //评论
var backimg; //还原图片
var flashrepeat;//第二页动画循环播放
var removeflash;//移除第二页动画
var removeflashrepeat;//移除第二页动画
var secondflash;//第二页动画

var funleft;
var funright;

$.fn.center = function() {
	this.css("position", "absolute");
	this.css("top", "40%");
	this.css("margin-top", "-" + this.height() / 2 + "px");
	this.css("left", "50%");
	this.css("margin-left", "-" + this.width() / 2 + "px");
	return this;
}
$.fn.center2 = function() {
	this.css("position", "absolute");
	this.css("top", "50%");
	this.css("margin-top", "-" + this.height() / 2 + "px");
	this.css("left", "50%");
	this.css("margin-left", "-" + this.width() / 2 + "px");
	return this;
}
//图片居中
$.fn.centerimg = function() {
	this.css("position", "absolute");
	this.css("top", "50%");
	this.css("margin-top", "-" + this.height() / 2 + "px");
	this.css("left", "0");
	return this;
}
var flash1, flash2, flash3, page1flash1, page1flash2, page1flash3, page1flash4, page1flash5, page1flash6, page1flash7, page1flash8, page1flash9, page1pl;
$(function() {
	/*if($(window).height() < 960) {
		$(".over").height(960);
	}*/
	
	
	$("body,.welcome,.page").height($(window).height());
	//轮播图不自动播放/滑动轮播
	$('#myCarousel,#myCarousel1,#myCarousel2,#showpic').carousel({
		interval: false
	});
	/*$('#szhj').carousel({
		interval: 3000
	});*/

	//播放录音
	$(".page2-talk").click(function() {
		var icon1 = $(".icon1");
		var icon2 = $(".icon2");
		if(icon1.hasClass("cur")) {
			$("#page_music")[0].pause();
			icon1.removeClass("cur").hide();
			icon2.show()
		} else {
			$("#page_music")[0].play();
			icon1.addClass("cur").show();
			icon2.hide()
		}
	});
	
	//箭头跳页
	$(".page1 .array").click(function() {
		window.location.href="#page2";
	});
	$(".page2 .array").click(function() {
		window.location.href="#page3";
	});
	$(".page3 .array").click(function() {
		window.location.href="#page4";
	});
	
	loading = function() {
		/*var beforeDate = new Date();
		//页面加载
		var $window = $(window),
			$doc = $(document),
			$percent = $(".percent"),
			winWidth = $window.width(),
			docWidth = $doc.width(),
			docHeight = $doc.height(),
			winHeight = $window.height(),
			speed = 1;
		//$percent.append("<div id=\"pageLoad\"><samp><em></em></samp><span>0</span></div>");

		var afterDate = new Date(),
			pagePreLoad = (afterDate - beforeDate),
			time = 1 / pagePreLoad,
			preImgLen = 1 / pagePreLoad,
			n = 0,
			m = 0,
			play = setInterval(function() {
				if(Number(n) >= 100 && Number(m) >= 100) {
					clearInterval(play);
					n = 100;
					m = 100;
					//页面加载完毕后执行(主线)
					setTimeout(function() {
						$("#dowebok").fadeIn(0);*/
						//$(".welcome").delay(1000).remove();

						//满屏滚动

						$("#dowebok").fullpage({
							navigation: false,
							slidesNavigation: false,
							verticalCentered: false,
							anchors: ['page1', 'page2', 'page3', 'page4', 'page5', 'page6'],
							menu: '#menu',
							/*loopHorizontal:false,*/
							afterLoad: function(anchorLink, index) {
								//第一页动画
								if(index == 1) {
									$(".page2,.page3,.page4").show();
									
									$(".page1-img1").fadeIn(0).addClass("bounceInDown");
									$(".page1-img2").fadeIn(0).addClass("bounceInLeft");

									page1flash1 = setTimeout(function() {
										$(".page1-first").fadeOut(1000);
									}, 2000);

									page1flash2 = setTimeout(function() {
										$(".page1-second").fadeIn(1000, function() {
											$(".page1-flash2").center2();
											$(".page1-flash2-center").center2();
											$(".page1-flash2-center").show("scale");
											if($('#cpjs', window.parent.document).is(":checked")){
												$(".page1-img9").fadeIn(1000);
											}else{
												$(".cpjs").css('display','none');
											}

											var page1flash3 = setTimeout(function() {
												$(".line1").fadeIn(0, function() {
													//画线特效1
													var svg1 = new Walkway({
														selector: '#line1',
														duration: 500,
														easing: 'linear'
													}).draw(function() {});

												});
											}, 1000);

											page1flash4 = setTimeout(function() {
												$(".line1-txt").fadeIn(0).addClass("flash");
											}, 1500);
											page1flash5 = setTimeout(function() {
												$(".page1-img8").fadeIn(500);
											}, 3000);

											page1flash6 = setTimeout(function() {
												$(".line2").fadeIn(0, function() {
													//画线特效2
													var svg2 = new Walkway({
														selector: '#line2',
														duration: 500,
														easing: 'linear'
													}).draw(function() {});

												});
											}, 3000);

											page1flash7 = setTimeout(function() {
												if($('#zzbz', window.parent.document).is(":checked")){
													$(".line2-txt").fadeIn(500);
												}else{
													$(".zzbz").css('display','none');
												}
												if($('#csd', window.parent.document).is(":checked")){
													$(".page1-img10").fadeIn(1000);
												}else{
													$(".csd").css('display','none');
												}
											}, 3500);

											page1flash8 = setTimeout(function() {
												$(".line3").fadeIn(0, function() {
													//画线特效2
													var svg3 = new Walkway({
														selector: '#line3',
														duration: 500,
														easing: 'linear'
													}).draw(function() {});

												});
											}, 2000);

											if(!$('#zzsj', window.parent.document).is(":checked")){
												$(".zzsj").css('display','none');
											}
											if(!$('#cssj', window.parent.document).is(":checked")){
												$(".cssj").css('display','none');
											}
											
											page1flash9 = setTimeout(function() {
												$(".line3-txt").fadeIn(0).addClass("flash");
											}, 2500);

											page1pl = setTimeout(function() {
												$(".page1-second .array").fadeIn(0);
											}, 4500);
										});
									}, 3000);

									$(".pinglun").removeClass("slideInUp").addClass("slideOutDown").delay(1000).fadeOut(0);
								}
								//第二页动画
								if(index == 2) {
									function initmap(){
										setTimeout(function(){
											try{
												$(".zzgh iframe")[0].contentWindow.initialize();
											}catch(e){
												initmap();
											}
										},2000);
									}
									initmap();
									
									
									secondflash=function(){
										$(".pinglun").fadeIn(0).addClass("slideInUp");
										
										if($('#qxsj', window.parent.document).is(":checked")){
											$(".page2-txt").css('display','block');
											$(".page2-img1").addClass("sunMove", function() {
													$(".page2-txt").fadeIn(1000);
													$(".page2-txt li:eq(0)").fadeIn(1000);
												
											});
		
											flash1 = setTimeout(function() {
												$(".raincanvas img").addClass("yu");
												$(".page2-img5,.raincanvas").addClass("cloudMove");
												$(".page2-txt li:eq(0)").fadeOut(500);
												$(".page2-txt li:eq(1)").fadeIn(500);
											}, 3000);
		
											flash2 = setTimeout(function() {
												$(".page2-img6").addClass("ryMove");
												$(".page2-img4").addClass("overshow");
												$(".page2-txt li:eq(1)").fadeOut(500);
												$(".page2-txt li:eq(2)").fadeIn(500);
											}, 7000);
		
											flash3 = setTimeout(function() {
												$(".yellow-map").addClass("mapMove");
												$(".page2-txt li:eq(2)").fadeOut(500);
												$(".page2-txt li:eq(3)").fadeIn(500);
												$(".page2-txt,.page2-txt li").delay(3000).fadeOut(500);
											}, 10000);
										}else{
											$(".page2-txt").css('display','none');
										}
									}
									secondflash();
									flashrepeat=setInterval(function() {
										removeflash();
										secondflash();
									}, 14000);
								}
								if(index == 3) {
									$(".pinglun").fadeIn(0).addClass("slideInUp");

								}
								if(index == 4) {
									$(".pinglun").fadeIn(0).addClass("slideInUp");
									$(".hongbao1,.hongbao3").addClass("hbslide1");
									$(".hongbao2").addClass("hbslide2");
								}
							},
							onLeave: function(index, direction) {
								if(index == 1) {
									clearTimeout(page1flash1);
									clearTimeout(page1flash2);
									clearTimeout(page1flash3);
									clearTimeout(page1flash4);
									clearTimeout(page1flash5);
									clearTimeout(page1flash6);
									clearTimeout(page1flash7);
									clearTimeout(page1flash8);
									clearTimeout(page1flash9);
									clearTimeout(page1pl);

									$(".page1-img1").removeClass("bounceInDown");
									$(".page1-img2").removeClass("bounceInLeft");
									$(".page1-first").show();
									$(".page1-img1,.page1-img2,.page1-second,.line1,.line2,.line3,.line4,.line1-txt,.line2-txt,.line3-txt,.line4-txt,.page1 .array,.page1 .pinglun,.page1-flash2-center,.page1-img8,.page1-img9,.page1-img10").hide();

									$(".pinglun").removeClass("slideOutDown").hide();
								}
								if(index == 2) {
									removeflash();
									clearInterval(flashrepeat);
								}
								if(index == 3) {
								}
								if(index == 4) {
									$(".hongbao1,.hongbao3").removeClass("hbslide1");
									$(".hongbao2").removeClass("hbslide2");
								}
							}

						});
						setInterval(function() {
							$.fn.fullpage.moveSlideRight();
						}, 3000);
	}
	loading();

	$(".sc-height").height(1136);
	//商品详情动效
	$(".page1-img9").click(function() {
		$(".page1-three").removeClass("slideOutRight").show("scale");
		$(".pinglun").removeClass("slideInUp").hide();
		$("#dowebok").delay(1000).fadeOut(0);
	});
	$(".page1-three").on('click','.back',function(){
		$("#dowebok").fadeIn(0);
		$(".page1-three").addClass("slideOutRight");
		$(".page1-three").delay(700).fadeOut(0);
		window.location.href = "#page1";
	});
	//查看四季田景
	$(".zz1").click(function() {
		if($(".c-sjtj").hasClass("active")) {
			removeflash();
			$(".show-iframe iframe").attr("src", krpanos);
			$(".show-iframe").show();
			$(".show-iframe .back").delay(1000).fadeIn(500);
			$("#dowebok,.pinglun").delay(1000).fadeOut(0);
		}
	});
	$(".zz1").click(function() {
		if($(".c-zygh").hasClass("active")) {
			removeflash();
			$(".show-iframe iframe").attr("src", resourcePlanning);
			$(".show-iframe").show();
			$(".show-iframe .back").delay(1000).fadeIn(500);
			$("#dowebok,.pinglun").delay(1000).fadeOut(0);
		}
	});
	//链接关闭按钮
	$(".show-iframe .back").click(function() {
		$("#dowebok,.pinglun").show();
		$(".show-iframe").hide();
		$(".show-iframe .back").hide();
	});

	$(".zz1").click(function() {
		if($(".c-ncsj").hasClass("active")) {
			$(".pinglun").removeClass("slideInUp").hide();
			$(".page2-three").removeClass("slideOutRight").show("scale");
			//$(".page2-center").center2();
			$("#dowebok").delay(1000).fadeOut(0);
			removeflash();
		}
	});
	jQuery("#myCarousel2").on('click','.page2-right-btn',function(){
		if($("#myCarousel2 .carousel-inner div.active").next("div").length != 0) {
			$(this).attr("data-slide", "next");
			$("#page2-cur-num").text($("#myCarousel2 .carousel-inner div.active").prevAll("div.item").length + 2);
		} else {
			$(this).removeAttr("data-slide");
		}
	});
	jQuery("#myCarousel2").on('click','.page2-left-btn',function(){	
		if($("#myCarousel2 .carousel-inner div.active").prev("div").length != 0) {
			$(this).attr("data-slide", "prev");
			$("#page2-cur-num").text($("#myCarousel2 .carousel-inner div.active").prevAll("div.item").length);
		} else {
			$(this).removeAttr("data-slide");
		}
	});
	$(".page2-three .back").click(function() {
		$("#dowebok").fadeIn(0);
		$(".page2-three").addClass("slideOutRight");
		$(".page2-three").delay(1000).fadeOut(0);
		$(".pinglun").delay(1000).fadeIn(0).addClass("slideInUp");
	});

	//查看图片
	$("#myCarousel .carousel-inner .item").click(function() {
		$(".pinglun").removeClass("slideInUp").hide();
		$(".page3-three").removeClass("slideOutRight").show("scale");
		$(".pinglun").removeClass("slideInUp").hide();

		var src = $(this).find("img").attr("src");
		$("#myCarousel1 .carousel-inner").empty();

		for(var i = 0; i < $("#myCarousel .carousel-inner .item").length; i++) {
			$("#myCarousel1 .carousel-inner").append('<div class="item"><img src="' + src + '" /></div>');
		}
		$("#myCarousel1 .carousel-inner .item:eq(0)").addClass("active");

		$("#all-num").text($("#myCarousel1 .carousel-inner .item").length);

	});
	$("#myCarousel1 .page3-right-btn").click(function() {
		if($("#myCarousel1 .carousel-inner div.active").next("div").length != 0) {
			$("#myCarousel1 .carousel-inner .item img").removeClass("imageFullScreen");
			$(this).attr("data-slide", "next");
			$("#cur-num").text($("#myCarousel1 .carousel-inner div.active").prevAll("div.item").length + 2);
		} else {
			$(this).removeAttr("data-slide");
		}
	});
	$("#myCarousel1 .page3-left-btn").click(function() {
		if($("#myCarousel1 .carousel-inner div.active").prev("div").length != 0) {
			$(this).attr("data-slide", "prev");
			$("#cur-num").text($("#myCarousel1 .carousel-inner div.active").prevAll("div.item").length);
		} else {
			$(this).removeAttr("data-slide");
		}
	});

	$(".page3-three .back").click(function() {
		$("#dowebok").fadeIn(0);
		$(".page3-three").addClass("slideOutRight");
		$(".page3-three").delay(1000).fadeOut(0);
		$("#cur-num").text("1");
		$(".pinglun").delay(1000).fadeIn(0).addClass("slideInUp");
		window.location.href = "#page3";
		backimg();
	});

	//查看生长视频
	/*$(".page3-first-img1").click(function() {
		$(".pinglun").removeClass("slideInUp").hide();
		$(".page3-second").removeClass("slideOutRight").show("scale");
		$(".page3-second iframe").attr("src","video.html");
		//$("#dowebok").hide();
	});
	$(".page3-second .back").click(function() {
		//$("#dowebok").show();
		$(".page3-second").addClass("slideOutRight");
		$(".page3-second").delay(1000).fadeOut(0);
		$(".pinglun").delay(1000).fadeIn(0).addClass("slideInUp");
		$(".page3-second iframe").attr("src","");
	});*/
	

	//环境指纹  
	$(".page2-more").click(function() {
		removeflash();
		clearInterval(flashrepeat);
		$(".pinglun").removeClass("slideInUp").hide();
//  		$(".page2-second-bg iframe").attr("src", "environment.html");
		$(".page2-second").removeClass("slideOutRight").delay(500).show("scale");
		$("#page_music")[0].play();
		$(".icon1").addClass("cur").show();
		$(".icon2").hide();
		$("#dowebok").delay(1000).fadeOut(0);

	});
	$(".page2-second .back").click(function() {
		$("#dowebok").fadeIn(0);
		$("#page_music")[0].pause();
		$(".icon1").removeClass("cur").hide();
		$(".icon2").show();

		$(".page2-second").addClass("slideOutRight");
		$(".page2-second").delay(1000).fadeOut(0);
		$(".page2-shujupic .pflash").removeClass("current").hide();
		$(".page2-shujupic .pflash:first-child").addClass("current").show();
		$(".dian img,.page2-flash1-img1,.page2-flash1-img2,.page2-flash1-img3,.page2-flash1-img4,.page2-flash1-img5,.page2-flash1-img6,.page2-flash1-img7,.page2-flash1-img8").hide();
		$(".pinglun").delay(1000).fadeIn(0).addClass("slideInUp");
		window.location.href = "#page2";
	});
	//环境指纹箭头事件
	$(".rightArray").click(function() {
		if($(".page2-shujupic .pflash.current").next(".pflash").length != 0) {
			$(".page2-shujupic .pflash.current").removeClass("slideInRight").addClass("slideOutLeft").fadeOut(0);
			$(".page2-shujupic .pflash.current").next(".pflash").fadeIn(0).addClass("slideInRight").addClass("current").siblings(".pflash").removeClass("current").removeClass("slideOutLeft");
			if($(".page2-flash2").hasClass("current")) {
				Tongji1();
			}
			if($(".page2-flash3").hasClass("current")) {
				Tongji2();
			}
			if($(".page2-flash4").hasClass("current")) {
				Tongji3();
			}
			if($(".page2-flash5").hasClass("current")) {
				Tongji4();
			}
		} else {
			$(".page2-shujupic .pflash").removeClass("slideInLeft").removeClass("slideOutRight").removeClass("slideInRight").removeClass("slideOutLeft");
		}
	});
	$(".leftArray").click(function() {
		if($(".page2-shujupic .pflash.current").prev(".pflash").length != 0) {
			$(".page2-shujupic .pflash.current").removeClass("slideInLeft").addClass("slideOutRight").fadeOut(0);
			$(".page2-shujupic .pflash.current").prev(".pflash").fadeIn(0).addClass("slideInLeft").addClass("current").siblings(".pflash").removeClass("current").removeClass("slideOutRight");
			if($(".page2-flash2").hasClass("current")) {
				Tongji1();
			}
			if($(".page2-flash3").hasClass("current")) {
				Tongji2();
			}
			if($(".page2-flash4").hasClass("current")) {
				Tongji3();
			}
			if($(".page2-flash5").hasClass("current")) {
				Tongji4();
			}
		} else {
			$(".page2-shujupic .pflash").removeClass("slideInLeft").removeClass("slideOutRight").removeClass("slideInRight").removeClass("slideOutLeft");
		}

	});

	//评论返回
	$(".pl-iframe .back").click(function() {
		$("#dowebok").fadeIn(0);
		$(this).fadeOut(0);
		$(".pl-iframe").hide("scale", 500);
		$(".pinglun").delay(600).fadeIn(0).addClass("slideInUp");
		$(".pl-iframe iframe").attr("src", "");
	});

	//查看资质证书
//	$(".lunbo li").click(function() {
	$(".page4-first-zs").on('click','li',function(){
		$(".pinglun").removeClass("slideInUp").hide();
		var src = $(this).find("img").attr("src");
		/*$(".showpic #cur-zs").attr("src", src);*/
		$(".page4-showpic").removeClass("slideOutRight").delay(500).show("scale");
	});
	$(".page4-first-zs").on('click','li',function(){
		$(".pinglun").removeClass("slideInUp").hide();
		var src = $(this).find("img").attr("src");
		$(".showpic #cur-zs").attr("src", src);
		$(".page4-showpic").removeClass("slideOutRight").delay(500).show("scale");
	});
	$(".page4-showpic .back").click(function() {
		$(".page4-showpic").addClass("slideOutRight")
		$(".page4-showpic").delay(1000).fadeOut(0);
		$(".pinglun").delay(1000).fadeIn(0).addClass("slideInUp");
	});
	//红包
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
		$(".show-iframe iframe").attr("src", redPack);
		$(".show-iframe").show();
		$(".show-iframe .back").delay(1000).fadeIn(500);
		$("#dowebok,.pinglun").delay(1000).fadeOut(0);
	});
	
	if($('#sssp', window.parent.document).is(":checked") || $('#spzs', window.parent.document).is(":checked") || $('#hjsk', window.parent.document).is(":checked")){
		setTimeout(function () {
			$('.szsp').css('display','block');
		},1000);
	}
	
	$('.szsp').click(function(){
		videoParam="";
		if($('#sssp', window.parent.document).is(":checked")){
			videoParam+="1,";
		}
		if($('#spzs', window.parent.document).is(":checked")){
			videoParam+="2,";
		}
		if($('#hjsk', window.parent.document).is(":checked")){
			videoParam+="3,";
		}
		
		$('.szsp a').attr('href',$('.szsp a').attr('href')+'&videoParam='+videoParam.substr(0,videoParam.length-1))
	})
});

//生长过程切换
var farmingInformation="";
function phoneFarming(obj){
	farmingInformation=eval(obj);
		//农事内容
		$(".slide-tilte-wrap ul").empty();
		//农事图片
		$("#myCarousel .carousel-inner").empty();
		//周期名
		$(".slide-tilte-list ul").empty();
		$("#before-time,#after-time").empty();
		$(".slide-tree li").removeClass('cur');
		//操作时间
		if(farmingInformation.length>0){
			$(".slide-tree li:eq(" + (farmingInformation[0].cycleTree-1) + ")").addClass('cur');
		}else{
			$(".slide-tree li:eq(0)").addClass('cur');
		}
		
		
		$(".page3-time").text(farmingInformation[0].outerOperationTime);
		$("#before-time").text("");
		if(farmingInformation.length > 1) {
			$("#after-time").text(farmingInformation[1].outerOperationTime.substring(5, 15));
		} else {
			$("#after-time").text("");
			$("#myCarousel .page3-left-btn,#myCarousel .page3-right-btn").hide();
		}
		
		var dd = farmingInformation;
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
		
		//console.log(dd.length);
		if(dd.length < 10) {
			for(start1 = 0; start1 < dd.length; start1++) {
				if(farmingInformation[start1].farmingImgs!=null && farmingInformation[start1].farmingImgs!="" && farmingInformation[start1].farmingImgs[0]!=null && farmingInformation[start1].farmingImgs[0]!=""){
					html1 += '<div class="item"><img src="' + farmingInformation[start1].farmingImgs[0] + '" /></div>';
				}else{
					html1 += '<div class="item"><img src="../asset/images/resume2/nopic.png" /></div>';
				}
				html2 += '<li>' + farmingInformation[start1].farmingContent + '</li>';
				if(farmingInformation[start1].cycleName!=undefined){
					html3 += '<li>' + farmingInformation[start1].cycleName + '</li>';
				}
				else{
					html3 += '<li></li>';
				}
			}
		} else {
			for(start1 = 0; start1 < startnum1; start1++) {
				if(farmingInformation[start1].farmingImgs!=null && farmingInformation[start1].farmingImgs!="" && farmingInformation[start1].farmingImgs[0]!=null && farmingInformation[start1].farmingImgs[0]!=""){
					html1 += '<div class="item"><img src="' + farmingInformation[start1].farmingImgs[0] + '" /></div>';
				}else{
					html1 += '<div class="item"><img src="../asset/images/resume2/nopic.png" /></div>';
				}
				html2 += '<li>' + farmingInformation[start1].farmingContent + '</li>';
				if(farmingInformation[start1].cycleName!=undefined){
					html3 += '<li>' + farmingInformation[start1].cycleName + '</li>';
				}
				else{
					html3 += '<li></li>';
				}
			}
		}
		startnum1 += 10;
		startshotTime1 += 10 - 1;
		
		
		/*for(var i = 0; i < farmingInformation.length; i++) {
			if(farmingInformation[i].farmingImgs!=null && farmingInformation[i].farmingImgs!="" && farmingInformation[i].farmingImgs[0]!=null && farmingInformation[i].farmingImgs[0]!=""){
				html1 += '<div class="item"><img src="' + farmingInformation[i].farmingImgs[0] + '" /></div>';
			}else{
				html1 += '<div class="item"><img src="../asset/images/resume2/nopic.png" /></div>';
			}
			html2 += '<li>' + farmingInformation[i].farmingContent + '</li>';
			if(farmingInformation[i].cycleName!=undefined){
				html3 += '<li>' + farmingInformation[i].cycleName + '</li>';
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
		//var cnum=farmingInformation.cycleTree;
		$("#myCarousel .page3-right-btn").click(function() {
			
			var nowTime = new Date().getTime();
			var clickTime = $(this).attr("ctime");
			if(clickTime != 'undefined' && (nowTime - clickTime < 1000)) {
				return false;
			} else {
				$(this).attr("ctime", nowTime);
				$("#myCarousel .page3-left-btn").show();
				var inde = $("#myCarousel .item.active").index();
				$("#myCarousel .page3-left-btn").attr("data-slide", "prev");
				if($("#myCarousel .carousel-inner div.active").next("div").length != 0) {
					$("#myCarousel").carousel('next');
					$(this).attr("data-slide", "next");
					cnum++;

					$(".page3-zhou").animate({ left: '-=45px', });
					$(".slide-tree li").fadeOut(700);
					$(".slide-tree li:eq(" + (farmingInformation[inde+1].cycleTree-1) + ")").fadeIn(700);

					$(".slide-tilte-wrap li").fadeOut(700);
					$(".slide-tilte-wrap li:eq(" + cnum + ")").fadeIn(700);

					$(".slide-tilte-list li").fadeOut(700);
					$(".slide-tilte-list li:eq(" + cnum + ")").fadeIn(700);
					//时间
					$(".page3-time").text(farmingInformation[inde + 1].outerOperationTime);
					if(inde == farmingInformation.length - 2) {
						$("#before-time").text(farmingInformation[inde].outerOperationTime.substring(5, 15));
						$("#after-time").text("");
					} else {
						$("#before-time").text(farmingInformation[inde].outerOperationTime.substring(5, 15));
						$("#after-time").text(farmingInformation[inde + 2].outerOperationTime.substring(5, 15));
					}

				} else {
					$(this).removeAttr("data-slide");
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
								if(farmingInformation[i].farmingImgs.length==0){
									html1 += '<div class="item"><img src="/asset/images/resume2/nopic.png" /></div>';
								}
								else{
									html1 += '<div class="item"><img src="' + farmingInformation[i].farmingImgs[0] + '@640w_400h_1e_1c.src" /></div>';
								}
								html2 += '<li>' + farmingInformation[i].farmingContent + '</li>';
								if(farmingInformation[i].cycleName!=undefined){
									html3 += '<li>' + farmingInformation[i].cycleName + '</li>';
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
								if(farmingInformation[i].farmingImgs.length==0){
									html1 += '<div class="item"><img src="/asset/images/resume2/nopic.png" /></div>';
								}
								else{
									html1 += '<div class="item"><img src="' + farmingInformation[i].farmingImgs[0] + '@640w_400h_1e_1c.src" /></div>';
								}
								html2 += '<li>' + farmingInformation[i].farmingContent + '</li>';
								if(farmingInformation[i].cycleName!=undefined){
									html3 += '<li>' + farmingInformation[i].cycleName + '</li>';
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
				$("#myCarousel .page3-right-btn").attr("data-slide", "next");
				if($("#myCarousel .carousel-inner div.active").prev("div").length != 0) {
					$("#myCarousel").carousel('next');
					$(this).attr("data-slide", "prev");
					cnum--;

					$(".page3-zhou").animate({ left: '+=45px', });
					$(".slide-tree li").fadeOut(700);
					$(".slide-tree li:eq(" + (farmingInformation[inde-1].cycleTree-1) + ")").fadeIn(700);

					$(".slide-tilte-wrap li").fadeOut(700);
					$(".slide-tilte-wrap li:eq(" + cnum + ")").fadeIn(700);

					$(".slide-tilte-list li").fadeOut(700);
					$(".slide-tilte-list li:eq(" + cnum + ")").fadeIn(700);

					//时间
					$(".page3-time").text(farmingInformation[inde - 1].outerOperationTime);
					if(inde == 1) {
						$("#before-time").text("");
						$("#after-time").text(farmingInformation[inde].outerOperationTime.substring(5, 15));
					} else {
						$("#before-time").text(farmingInformation[inde - 2].outerOperationTime.substring(5, 15));
						$("#after-time").text(farmingInformation[inde].outerOperationTime.substring(5, 15));
					}

				} else {
					$(this).hide();
					$(this).removeAttr("data-slide");
					$("#before-time").text("");
				}
				if($("#myCarousel .carousel-inner div.active").prevAll("div").length == 1) {
					$(this).hide();
				}
			}
		});

		//查看图片
		$("#myCarousel .carousel-inner .item").click(function() {
			var ind = $(this).index();
			
			for(var i = 0; i < farmingInformation.length; i++) {
				if(ind == i) {
					$(".pinglun").removeClass("slideInUp").hide();
					$(".page3-three").removeClass("slideOutRight").show("scale");
					$(".pinglun").removeClass("slideInUp").hide();
					//$(".page3-center").center2();
					$("#dowebok").delay(1000).fadeOut(0);
					$("#myCarousel1 .carousel-inner").empty();
					for(var j = 0; j < farmingInformation[i].farmingImgs.length; j++) {
						$("#myCarousel1 .carousel-inner").append('<div class="item"><img src="' + farmingInformation[i].farmingImgs[j] + '" onclick="scanimg(this)"/></div>');
					}
					if(farmingInformation[i].farmingImgs.length==0){
						$("#myCarousel1 .carousel-inner").append('<div class="item"><img src="../asset/images/resume2/nopic.png" onclick="scanimg(this)"/></div>');
					}
					if($("#myCarousel1 .carousel-inner .item").length==1){
						$("#myCarousel1 .page3-left-btn,#myCarousel1 .page3-right-btn").hide();
					}
					else{
						$("#myCarousel1 .page3-left-btn,#myCarousel1 .page3-right-btn").show();
					}
					//投入品
					$("#inputsType,#inputsName,#inputsUsage").empty();
					$("#inputsType").parent().css("display",'');
					$("#inputsName").parent().css("display",'');
					$("#inputsUsage").parent().css("display",'');
					if(farmingInformation[i].inputsInfo!= undefined) {
						if(farmingInformation[i].inputsInfo.length==0){
							$("#inputsType").parent().css("display",'none');
							$("#inputsName").parent().css("display",'none');
							$("#inputsUsage").parent().css("display",'none');
						}else{
							for(var z = 0; z < farmingInformation[i].inputsInfo.length; z++) {
								if(z== farmingInformation[i].inputsInfo.length-1){
									$("#inputsType").append(farmingInformation[i].inputsInfo[z].inputsType);
									$("#inputsName").append(farmingInformation[i].inputsInfo[z].inputsName );
									$("#inputsUsage").append(farmingInformation[i].inputsInfo[z].inputsUsage + "kg");
								}else{
									$("#inputsType").append(farmingInformation[i].inputsInfo[z].inputsType + ",");
									$("#inputsName").append(farmingInformation[i].inputsInfo[z].inputsName + ",");
									$("#inputsUsage").append(farmingInformation[i].inputsInfo[z].inputsUsage + "kg,");
								}
							}
							
						}
					}

					//操作时间
					$("#operatingtime").text(farmingInformation[i].operatingTime);
					//操作内容
					if(farmingInformation[i].farmingContent==null || farmingInformation[i].farmingContent==""){
						$("#farmingContent").parent().css("display",'none');
					}else{
						$("#farmingContent").parent().css("display",'');
						$("#farmingContent").text(farmingInformation[i].farmingContent);
					}
					//操作人
					if(farmingInformation[i].farmingOperator==null || farmingInformation[i].farmingOperator==""){
						$("#farmingOperator").parent().css("display",'none');
					}else{
						$("#farmingOperator").parent().css("display",'');
						$("#farmingOperator").text(farmingInformation[i].farmingOperator);
					}
					//工时
					if(farmingInformation[i].farmingWorkingHours==null || farmingInformation[i].farmingWorkingHours==""){
						$("#farmingWorkingHours").parent().css("display",'none');
					}else{
						$("#farmingWorkingHours").parent().css("display",'');
						$("#farmingWorkingHours").text(farmingInformation[i].farmingWorkingHours);
					}
					//成本
					if(farmingInformation[i].farmingCost==null || farmingInformation[i].farmingCost==""){
						$("#farmingCost").parent().css("display",'none');
					}else{
						$("#farmingCost").parent().css("display",'');
						$("#farmingCost").text(farmingInformation[i].farmingCost);
					}
					//环境温度
					if(farmingInformation[i].farmingTemperature==null || farmingInformation[i].farmingTemperature==""){
						$("#farmingTemperature").parent().css("display",'none');
					}else{
						$("#farmingTemperature").parent().css("display",'');
						$("#farmingTemperature").text(farmingInformation[i].farmingTemperature);
					}
					//环境湿度
					if(farmingInformation[i].farmingHumidity==null || farmingInformation[i].farmingHumidity==""){
						$("#farmingHumidity").parent().css("display",'none');
					}else{
						$("#farmingHumidity").parent().css("display",'');
						$("#farmingHumidity").text(farmingInformation[i].farmingHumidity);
					}
					//备注
					if(farmingInformation[i].farmingRemarks==null || farmingInformation[i].farmingRemarks==""){
						$("#farmingRemarks").parent().css("display",'none');
					}else{
						$("#farmingRemarks").parent().css("display",'');
						$("#farmingRemarks").text(farmingInformation[i].farmingRemarks);
					}
				}
			}
			$("#myCarousel1 .carousel-inner .item:eq(0)").addClass("active");
			$("#all-num").text($("#myCarousel1 .carousel-inner .item").length);
			
		});
		
}

//评论事件
function plShow() {
	$(".pl-iframe iframe").attr("src", "comment.html");
	$(".pinglun").removeClass("slideInUp").hide();
	$(".pl-iframe").removeClass("slideOutRight").delay(500).show("scale");
	$(".pl-iframe .back").delay(1000).fadeIn(0);;
	$("#dowebok").delay(1000).fadeOut(0);
	removeflash();
}

//移除第二页动画
removeflash=function() {
	clearTimeout(flash1);
	clearTimeout(flash2);
	clearTimeout(flash3);
	$(".page2-img1").removeClass("sunMove");
	$(".page2-img5").removeClass("cloudMove");
	$(".raincanvas").removeClass("cloudMove");
	$(".raincanvas img").removeClass("yu");
	$(".page2-img6").removeClass("ryMove");
	$(".page2-img4").removeClass("overshow");
	$(".yellow-map").removeClass("mapMove");
	$(".page2-txt,.page2-txt li").hide();
}
removeflashrepeat=function() {
	clearInterval(flashrepeat);
}
//查看图片拖动
/*function scanimg(obj){
	$(".page3-three-slide-des").hide();
	$("#myCarousel1 .page3-left-btn,#myCarousel1 .page3-right-btn,.page3-three-slide-num,.page3-three .back").hide();
	$(".closeimg").show();
	$(".page3-three-slide").height($(window).height());
	$(obj).addClass("imageFullScreen");
	setTimeout(function(){
		$(".imageFullScreen").smartZoom({ 'containerClass': 'zoomableContainer' });
	},100);
}*/
function scanimg(obj) {
	var imgsrc = $(obj).attr("src");
	$(".showscanimg").append('<img src="' + imgsrc + '" class="imageFullScreen" />');
	setTimeout(function() {
		$(".showscanimg").show();
		$(".imageFullScreen").smartZoom({ 'containerClass': 'zoomableContainer' });
	}, 100);
}
//还原图片
/*backimg=function backimg(){	
	$("#myCarousel1 .item img").removeAttr("style");
	$("#myCarousel1 .item img").removeClass("imageFullScreen");
	$(".page3-three-slide-des").show();
	$("#myCarousel1 .page3-left-btn,#myCarousel1 .page3-right-btn,.page3-three-slide-num,.page3-three .back").show();
	$(".closeimg").hide();
	$(".page3-three-slide").height(400);
}*/
backimg = function() {
	$(".showscanimg").hide();
	$(".zoomableContainer").remove();
}
funleft = function() {
	$("#szhj").carousel('next');
}
funright = function() {
	$("#szhj").carousel('prev');
}

function TouchLeft() {
	var startX, startY, moveEndX, moveEndY, X, Y;
	$("#szhj").on("touchstart", function(e) {
		// e.preventDefault();
		startX = e.originalEvent.changedTouches[0].pageX,
			startY = e.originalEvent.changedTouches[0].pageY;
	});
	$("#szhj").on("touchmove", function(e) {
		// e.preventDefault();
		moveEndX = e.originalEvent.changedTouches[0].pageX,
			moveEndY = e.originalEvent.changedTouches[0].pageY,
			X = moveEndX - startX,
			Y = moveEndY - startY;

		if(Math.abs(X) > Math.abs(Y) && X > 0) { //从左侧向右滑动
			//$(".playback,.qingback").trigger("click");
			alert("从左侧向右滑动");
		}
	});
}
TouchLeft();
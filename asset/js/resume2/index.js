// JavaScript Document
var welcomeflash; //欢迎页动画
var loading; //整体动画
var dzShow; //点赞
var resetpl; //评论
var flashrepeat;//第二页动画循环播放
var removeflash;//移除第二页动画

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
var flash1, flash2, flash3, page1flash1, page1flash2, page1flash3, page1flash4, page1flash5, page1flash6, page1flash7, page1flash8, page1flash9, page1pl;
$(function() {
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
		$(".page2-en").css("top","640px");
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

	$("body,.page").height($(window).height());
	/*欢迎页动画*/  
	welcomeflash = function() {
		$(".welcome .logo").show();
		$(".wel-flash").center();
		$(".wel-img2,.wel-img4").show("scale", 1000);
		$(".wel-img1,.wel-img6").fadeIn(1000).delay(1000);
		$(".wel-img3").delay(1000).fadeIn(0).addClass("scan");
		$(".wel-img5").delay(1000).fadeIn(300);
	}
	//轮播图不自动播放/滑动轮播
	$('#myCarousel,#myCarousel1,#myCarousel2,#showpic').carousel({
		interval: false
	});
	/*$('#szhj').carousel({
		interval: 3000
	})*/
	$(".overlay").click(function(){
		$(".overlay").fadeOut(500);
		$(".page4-farminfo").fadeOut(500);
	});
	//播放录音
	$(".page2-talk").click(function() {
		var icon1 = $(".icon1");
		var icon2 = $(".icon2");
		if(icon1.hasClass("cur")) {
			$("#page_music")[0].pause();
			icon1.removeClass("cur").hide();
			icon2.show();
		} else {
			$("#page_music")[0].play();
			icon1.addClass("cur").show();
			icon2.hide();
		}
	});

	loading = function() {
		clearInterval(play);
		var beforeDate = new Date();
		//页面加载
		var $window = $(window),
			$doc = $(document),
			$percent = $(".percent"),
			winWidth = $window.width(),
			docWidth = $doc.width(),
			docHeight = $doc.height(),
			winHeight = $window.height(),
			speed = 250;
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
						$(".welcome").fadeOut(1000);
						$("#dowebok").fadeIn(1000);
						//满屏滚动

						$("#dowebok").fullpage({
							navigation: false,
							slidesNavigation: false,
							verticalCentered: false,
							anchors: ['page1', 'page2', 'page3', 'page4'],
							menu: '#menu',
							/*loopHorizontal:false,*/
							afterLoad: function(anchorLink, index) {
								//第一页动画
								if(index == 1) {

									$(".page1-img1").fadeIn(0).delay(100).addClass("bounceInDown");
									$(".page1-img2").fadeIn(0).delay(100).addClass("bounceInLeft");

									page1flash1 = setTimeout(function() {
										$(".page1-first").fadeOut(1000);
									}, 2000);

									page1flash2 = setTimeout(function() {
										$(".page1-second").fadeIn(1000, function() {
											$(".page1-flash2").center2();
											$(".page1-flash2-center").center2();
											//$(".page1-flash2-center").show().addClass("bounceIn");
											/*$(".page1-flash2-center").show().addClass("bounceIn-m");*/
											$(".page1-flash2-center").show("scale");
											$(".page1-img9").fadeIn(1000);

											var page1flash3 = setTimeout(function() {
												$(".line1").fadeIn(0, function() {
													//画线特效1
													var svg1 = new Walkway({
														selector: '#line1',
														duration: 500,
														easing: 'linear'
													}).draw(function() {});

												});
												/*$(".line1").fadeIn(0);
												$(".line1").append('<img src="/images/resume2/line1.gif" />');*/
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
												//$(".line2").fadeIn(0);
											}, 3000);

											page1flash7 = setTimeout(function() {
												$(".line2-txt").fadeIn(500);
												$(".page1-img10").fadeIn(1000);
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
												/*$(".line3").fadeIn(0);
												$(".line3").append('<img src="/images/resume2/line2.gif" />');*/
											}, 2000);

											page1flash9 = setTimeout(function() {
												$(".line3-txt").fadeIn(0).addClass("flash");
											}, 2500);

											page1pl = setTimeout(function() {
												$(".page1-second .array").fadeIn(0);
											}, 4500);
										});
									}, 3000);

									$(".pinglun").removeClass("slideInUp").addClass("slideOutDown").delay(1000).fadeOut(0);
									/*$(".page1-first").delay(2000).fadeOut(1000);
									$(".page1-second").delay(3000).fadeIn(1000, function() {
										$(".page1-flash2").center2();
										$(".page1-flash2-center").center2();
										$(".page1-flash2-center").show().addClass("bounceIn");
										$(".page1-img9").fadeIn(2300);

										$(".line1").delay(2500).fadeIn(0, function() {
											//画线特效1
											var svg1 = new Walkway({
												selector: '#line1',
												duration: 1000,
												easing: 'linear'
											}).draw(function() {});

										});
										$(".line1-txt").delay(3500).fadeIn(0).addClass("flash");

										$(".page1-img8").delay(5000).fadeIn(500);
										$(".line2").delay(5500).fadeIn(0, function() {
											//画线特效2
											var svg2 = new Walkway({
												selector: '#line2',
												duration: 1000,
												easing: 'linear'
											}).draw(function() {});

										});
										$(".line2-txt").delay(6500).fadeIn(1500);
										$(".page1-img10").delay(6500).fadeIn(1000);

										$(".line3").delay(4500).fadeIn(0, function() {
											//画线特效2
											var svg3 = new Walkway({
												selector: '#line3',
												duration: 1000,
												easing: 'linear'
											}).draw(function() {});

										});
										$(".line3-txt").delay(5500).fadeIn(0).addClass("flash");
										
										page1pl=setTimeout(function(){
											$(".pinglun").fadeIn(0).addClass("slideInUp");
										},7000);

									});*/
								}
								//第二页动画
								if(index == 2) {
									function initmap(){
										setTimeout(function(){
											try{
												$("#zyghiframe")[0].contentWindow.initialize();
											}catch(e){
												initmap();
											}
										},2000);
									}
									initmap();
									secondflash();
									flashrepeat=setInterval(function() {
										removeflash();
										secondflash();
									}, 14000);
									
									/*$(".page2-tab .fp-slides").css("opacity","1").fadeIn(100);
									$(".pinglun").fadeIn(0).addClass("slideInUp");

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
									}, 10000);*/
									
								}
								if(index == 3) {
									$(".pinglun").fadeIn(0).addClass("slideInUp");
									console.log($(".pic0 img").width()+"---"+$(".pic1 img").width()+"---"+$(".pic2 img").width());
									$(".pic0 img,.pic1 img,.pic2 img").imgsize();
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

									$(".page1-img1").fadeOut(0).removeClass("bounceInDown");
									$(".page1-img2").fadeOut(0).removeClass("bounceInLeft");
									$(".page1-first").show();
									$(".page1-img1,.page1-img2,.page1-second,.line1,.line2,.line3,.line4,.line1-txt,.line2-txt,.line3-txt,.line4-txt,.page1 .array,.page1 .pinglun,.page1-flash2-center,.page1-img8,.page1-img9,.page1-img10").hide();
									
									$(".line1 img,.line3 img").remove();
									//$(".pinglun").removeClass("slideInUp").hide();
									$(".pinglun").removeClass("slideOutDown").hide();
								}
								if(index == 2) {
									removeflash();
									clearInterval(flashrepeat);
									$(".page2-tab .fp-slides").css("opacity","0").fadeOut(0);
									//$(".pinglun").removeClass("slideInUp").hide();
								}
								if(index == 3) {
									//$(".pinglun").removeClass("slideInUp").hide();
								}
								if(index == 4) {
									//$(".pinglun").removeClass("slideInUp").hide();
									$(".hongbao1,.hongbao3").removeClass("hbslide1");
									$(".hongbao2").removeClass("hbslide2");
								}
							}

						});
						setInterval(function() {
							$.fn.fullpage.moveSlideRight();
						}, 3000);

					}, 0);  

				};
				$("#pageLoad").find("span").text(Math.floor(n) + "%");
				n += time;
				m += preImgLen;
			}, 25); 
	}
	//welcomeflash();
	//loading(); 
	//商品详情动效
	$(".page1-img9").click(function() {
		$(".page1-three").removeClass("slideOutRight").show("scale");
		$(".pinglun").removeClass("slideInUp").hide();
		$("#dowebok").delay(1000).fadeOut(0);
	});
	$(".page1-three .back").click(function() {
		$("#dowebok").fadeIn(0);
		$(".page1-three").addClass("slideOutRight");
		$(".page1-three").delay(700).fadeOut(0);
	});
	//查看四季田景
	$(".zz1").click(function() {
		if($(".c-ncsj").hasClass("active")) {
			$(".pinglun").removeClass("slideInUp").hide();
			$(".page2-three").removeClass("slideOutRight").show("scale");
			//$(".page2-center").center2();
			$("#dowebok").delay(1000).fadeOut(0);
			removeflash();
		}
	});
	$("#myCarousel2 .page2-right-btn").click(function() {
		if($("#myCarousel2 .carousel-inner div.active").next("div").length != 0) {
			$(this).attr("data-slide1", "next");
			$("#page2-cur-num").text($("#myCarousel2 .carousel-inner div.active").prevAll("div.item").length + 2);
		} else {
			$(this).removeAttr("data-slide1");
		}
	});
	$("#myCarousel2 .page2-left-btn").click(function() {
		if($("#myCarousel2 .carousel-inner div.active").prev("div").length != 0) {
			$(this).attr("data-slide1", "prev");
			$("#page2-cur-num").text($("#myCarousel2 .carousel-inner div.active").prevAll("div.item").length);
		} else {
			$(this).removeAttr("data-slide1");
		}
	});
	$(".page2-three .back").click(function() {
		$("#dowebok").fadeIn(0);
		$(".page2-three").addClass("slideOutRight");
		$(".page2-three").delay(1000).fadeOut(0);
		$(".pinglun").delay(1000).fadeIn(0).addClass("slideInUp");
	});

	//查看图片
	/*$("#myCarousel .carousel-inner .item").click(function() {
		$(".pinglun").removeClass("slideInUp").hide();
		$(".page3-three").removeClass("slideOutRight").show("scale");
		$(".pinglun").removeClass("slideInUp").hide();
		$(".page3-center").center2();

		var src = $(this).find("img").attr("src");
		$("#myCarousel1 .carousel-inner").empty();

		for(var i = 0; i < $("#myCarousel .carousel-inner .item").length; i++) {
			$("#myCarousel1 .carousel-inner").append('<div class="item"><img src="' + src + '" /></div>');
		}
		$("#myCarousel1 .carousel-inner .item:eq(0)").addClass("active");

		$("#all-num").text($("#myCarousel1 .carousel-inner .item").length);

	});*/
	$("#myCarousel1 .page3-right-btn").click(function() {
		if($("#myCarousel1 .carousel-inner div.active").next("div").length != 0) {
			$(this).attr("data-slide1", "next");
			$("#cur-num").text($("#myCarousel1 .carousel-inner div.active").prevAll("div.item").length + 2);
		} else {
			$(this).removeAttr("data-slide1");
		}
	});
	$("#myCarousel1 .page3-left-btn").click(function() {
		if($("#myCarousel1 .carousel-inner div.active").prev("div").length != 0) {
			$(this).attr("data-slide1", "prev");
			$("#cur-num").text($("#myCarousel1 .carousel-inner div.active").prevAll("div.item").length);
		} else {
			$(this).removeAttr("data-slide1");
		}
	});

	$(".page3-three .back").click(function() {
		$("#dowebok").fadeIn(0);
		$(".page3-three").addClass("slideOutRight");
		$(".page3-three").delay(1000).fadeOut(0);
		$("#cur-num").text("1");
		$(".pinglun").delay(1000).fadeIn(0).addClass("slideInUp");
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
	//生长过程切换
	var cnum = 0;
	var month = $("#cur-time").text();
	/*$("#myCarousel .page3-right-btn").click(function() {
		$("#myCarousel .page3-left-btn").attr("data-slide1", "prev");
		if($("#myCarousel .carousel-inner div.active").next("div").length != 0) {
			$(this).attr("data-slide1", "next");
			cnum++;
			month++;
			$("#cur-time").text(month);
			var date1 = new Date(0, month, 0);
			$("#before-time").text(date1.getMonth());
			$("#after-time").text(date1.getMonth() + 2);

			$(".page3-zhou").animate({ left: '-=90px', });
			$(".slide-tree li").fadeOut(700);
			$(".slide-tree li:eq(" + cnum + ")").fadeIn(700);

			$(".slide-tilte-wrap li").fadeOut(700);
			$(".slide-tilte-wrap li:eq(" + cnum + ")").fadeIn(700);

			$(".slide-tilte-list li").fadeOut(700);
			$(".slide-tilte-list li:eq(" + cnum + ")").fadeIn(700);

		} else {
			$(this).removeAttr("data-slide1");
		}
	});
	$("#myCarousel .page3-left-btn").click(function() {
		$("#myCarousel .page3-right-btn").attr("data-slide1", "next");
		if($("#myCarousel .carousel-inner div.active").prev("div").length != 0) {
			$(this).attr("data-slide1", "prev");
			cnum--;
			month--;
			$("#cur-time").text(month);
			var date1 = new Date(0, month, 0);
			$("#before-time").text(date1.getMonth());
			$("#after-time").text(date1.getMonth() + 2);

			$(".page3-zhou").animate({ left: '+=90px', });
			$(".slide-tree li").fadeOut(700);
			$(".slide-tree li:eq(" + cnum + ")").fadeIn(700);

			$(".slide-tilte-wrap li").fadeOut(700);
			$(".slide-tilte-wrap li:eq(" + cnum + ")").fadeIn(700);

			$(".slide-tilte-list li").fadeOut(700);
			$(".slide-tilte-list li:eq(" + cnum + ")").fadeIn(700);

		} else {
			$(this).removeAttr("data-slide1");
		}
	});*/

	//环境指纹
	$(".page2-more").click(function() {
		removeflash();
		$(".pinglun").removeClass("slideInUp").hide();
		console.log(urladdress+"---");
		$(".page2-second-bg iframe").attr("src", "environment.html?"+urladdress);
		$(".page2-second").removeClass("slideOutRight").delay(500).show("scale");
		//$("#page_music")[0].play();
		$(".icon1").addClass("cur").show();
		$(".icon2").hide();
		$("#dowebok").delay(1000).fadeOut(0);
		
	});
	$(".page2-second .back").click(function() {
		$("#dowebok").fadeIn(0);
		//$("#page_music")[0].pause();
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
		window.location.reload();
		$(this).fadeOut(0);
		$(".pl-iframe").hide("scale", 500);
		$(".pinglun").delay(600).fadeIn(0).addClass("slideInUp");
		$(".pl-iframe iframe").attr("src", "");
	});

	//查看农场视频
	/*$(".page4-first-sp").click(function() {
		$(".pinglun").removeClass("slideInUp").hide();
		$(".page4-showvideo").removeClass("slideOutRight").delay(500).show("scale");
		$(".page4-showvideo iframe").attr("src","ncvideo.html");
	});
	$(".page4-showvideo .back").click(function() {
		$(".page4-showvideo").addClass("slideOutRight")
		$(".page4-showvideo").delay(1000).fadeOut(0);
		$(".pinglun").delay(1000).fadeIn(0).addClass("slideInUp");
		$(".page4-showvideo iframe").attr("src","");
	});*/
	//查看资质证书
	$(".lunbo li").click(function() {
		$(".pinglun").removeClass("slideInUp").hide();
		var src = $(this).find("img").attr("src");
		/*$(".showpic #cur-zs").attr("src", src);*/
		$(".page4-showpic").removeClass("slideOutRight").delay(500).show("scale");
	});
	$(".page4-showpic .back").click(function() {
		$(".page4-showpic").addClass("slideOutRight");
		$(".page4-showpic").delay(1000).fadeOut(0);
		$(".pinglun").delay(1000).fadeIn(0).addClass("slideInUp");
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
});
//评论事件
function plShow() {
	$(".pl-iframe iframe").attr("src", "comment.html?"+urladdress);
	$(".pinglun").removeClass("slideInUp").hide();
	$(".pl-iframe").removeClass("slideOutRight").delay(500).show("scale");
	$(".pl-iframe .back").delay(1000).fadeIn(0);;
	$("#dowebok").delay(1000).fadeOut(0);
	removeflash();
}

//移除第二页动画
var removeflash=function() {
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
//查看图片拖动
function scanimg(obj){
	$(obj).addClass("imageFullScreen");
	setTimeout(function(){
		$(".imageFullScreen").smartZoom({ 'containerClass': 'zoomableContainer' });
	},100);
}
//查看图片拖动
function scanimg(obj){
	var imgsrc=$(obj).attr("src").split("@")[0];
	$(".showscanimg").append('<img src="'+imgsrc+'" class="imageFullScreen" />');
	setTimeout(function(){
		$(".showscanimg").show();
		$(".imageFullScreen").smartZoom({ 'containerClass': 'zoomableContainer' });
	},100);
}
//还原图片
function backimg(){	
	$(".showscanimg").hide();
	$(".zoomableContainer").remove();
}
/*funleft =function(){
	$("#szhj").carousel('next');
}
funright =function(){
	$("#szhj").carousel('prev');
}*/

//农场视频链接
function jumppagenc(){
	window.location.href="ncvideo.html?"+urladdress;
}
//生长过程链接
function jumppagesz(){
	window.location.href="video.html?"+urladdress;
}

//第二页动画
function secondflash(){
	$(".page2-tab .fp-slides").css("opacity","1").fadeIn(100);
	$(".pinglun").fadeIn(0).addClass("slideInUp");

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
}
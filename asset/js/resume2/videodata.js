var player;
$(function() {

	$(".videobody").height($(window).height());
	$.ajax({
		type: "POST",
		url: pathurl+'?method=resume.whole.data',
		data: {field: JSON.stringify(getName) },
		dataType: "jsonp",
		success: function(data) {
			if(data.invoke_result == "INVOKE_SUCCESS") {
				//查看生长视频
				//生长视频
				$(".video-btn li").click(function() {
					$(this).addClass("cur");
					$(this).siblings("li").removeClass("cur");
					curnum = $(this).index();
					$(".video-wrap .video-list").each(function(i) {
						if(curnum == i) {
							$(this).siblings(".video-list").removeClass("cur").hide();
							$(this).addClass("cur").show();
						}
					});
					$(".video-des .video-des-wrap").each(function(i) {
						if(curnum == i) {
							$(this).siblings(".video-des-wrap").removeClass("cur").hide();
							$(this).addClass("cur").show();
						}
					});
				});

				// 创建视频
				function CreatVideo(videoURL, imgURL) {
					imgURL = "/asset/images/resume2/1.jpg";
					videoURL = data.data.growthProcess.realTimeVideo.videoUrl;
					scriptAdd = '<video id="live-video1" class="video-js vjs-default-skin vjs-big-play-centered" style="width:100%;height:100%;" preload="auto" poster="' + imgURL + '" controls><source src="' + videoURL + '" type="application/x-mpegURL"/></video>';
					$("#skzb").html(scriptAdd);
					player = videojs("live-video1");
					player.paused();
				}

				function CreatVideo2(videoURL, imgURL) {
					//player.dispose(); //清理
					imgURL = "/asset/images/resume2/3.jpg";
					videoURL = data.data.growthProcess.videoTracing.videoUrl;
					scriptAdd = '<video id="live-video2" class="video-js vjs-default-skin vjs-big-play-centered" style="width:100%;height:100%;" preload="auto" poster="' + imgURL + '" controls><source src="' + videoURL + '" type="application/x-mpegURL"/></video>';
					$("#spzs").html(scriptAdd);
					player = videojs("live-video2");
					player.paused();
				}

				//实况直播
				if(data.data.growthProcess.realTimeVideoShow == "1") {
					$(".skzb").addClass("cur").show();
					$(".skzb .video-des-title").text(data.data.growthProcess.realTimeVideo.tunnelInfoName);
					$(".skzb #plantName1").text(data.data.growthProcess.realTimeVideo.plantName);
					if(data.data.growthProcess.realTimeVideo.videoUrl != undefined && data.data.growthProcess.realTimeVideo.videoUrl != null) {
						CreatVideo();
						$("li.skzb").click(function() {
							player.dispose(); //清理
							CreatVideo();
						});
					} else {
						$("#skzb").empty();
						$("#skzb").append('<img src="/asset/images/resume2/none.png" />'); 
					}

				} else {
					$(".skzb").removeClass("cur").addClass("nouse").unbind("click");
				}
				//环境实况
				if(data.data.growthProcess.realityShow == "1") {
					$("li.hjsk").show();
					if(data.data.growthProcess.realTimeVideoShow == "0") {
						$(".hjsk").addClass("cur").show();
					}
					
					if(data.data.growthProcess.realityVideo != null && data.data.growthProcess.realityVideo.videoUrl!=undefined){
						var f = data.data.growthProcess.realityVideo.videoUrl;
						var pagecur = 1;
						var pageSize = 10;
						var totalnum = f.length;
						var pagetotal = Math.ceil(totalnum / pageSize);
						var start = 0;
						var startnum = 10;
						var startshotTime = 0;
						if(f.length < 10) {
							for(start = 0; start < f.length; start++) {
								$("#video-pic .carousel-inner").append('<div class="item"><img src="' + f[start].url + '" width="640" height="550"/></div>');
								$("#video-pic1 .carousel-inner").append('<div class="item"><img src="' + f[start].url + '" width="640" height="550"/></div>');
								/*$("#shotTime").text(f[0].shotTime);*/
								$("#shotTime").text(f[startshotTime].shotTime);
							}
						} else {
							for(start = 0; start < startnum; start++) {
								$("#video-pic .carousel-inner").append('<div class="item"><img src="' + f[start].url + '" width="640" height="550"/></div>');
								$("#video-pic1 .carousel-inner").append('<div class="item"><img src="' + f[start].url + '" width="640" height="550"/></div>');
								/*$("#shotTime").text(f[0].shotTime);*/
								$("#shotTime").text(f[startshotTime].shotTime);
							}
						}
						startnum += 10;
						startshotTime += 10 - 1;
						/*for(var i = 0; i < f.length; i++) {
							$("#video-pic .carousel-inner").append('<div class="item"><img src="' + f[i].url + '" width="640" height="550" class="lazy" data-original="' + f[i].url + '"/></div>');
							$("#shotTime").text(f[0].shotTime);
						}*/
						$("#video-pic .carousel-inner .item:eq(0)").addClass("active");
						$("#video-pic1 .carousel-inner .item:eq(0)").addClass("active");
						$("#allpic-num,#imgNumbers").text(totalnum);
						$(".hjsk .video-des-title").text(data.data.growthProcess.realityVideo.tunnelInfoName);
						$(".hjsk #plantName2").text(data.data.growthProcess.realityVideo.plantName);
						$("#video-pic,#video-pic1").swipeleft(function() {
							if(pagecur > pagetotal || $("#curpic-num").text() == $("#allpic-num").text()) {
								
							} else {
								if($("#video-pic .carousel-inner .item.active").nextAll(".item").length == 1 || $("#video-pic1 .carousel-inner .item.active").nextAll(".item").length == 1) {
									pagecur++;
									for(var i = start; i < startnum; i++) {
										$("#video-pic .carousel-inner").append('<div class="item"><img src="' + f[i].url + '" width="640" height="550"/></div>');
										$("#video-pic1 .carousel-inner").append('<div class="item"><img src="' + f[i].url + '" width="640" height="550"/></div>');
										$("#shotTime").text(f[startshotTime].shotTime);
									}
									start += 10;
									startnum += 10;
									startshotTime += 10;
								}
							}
						});
					}	
					else{
						$("#video-pic,#video-pic1").empty();
						$(".video-des-num").remove();
						$("#video-pic").append('<img src="/asset/images/resume2/nonepic.png" />');
					}
				} else {
					$(".hjsk").removeClass("cur").addClass("nouse").unbind("click");
				}
				//视频追溯
				if(data.data.growthProcess.videoTracingShow == "1") {
					$("li.spzs").show();
					if(data.data.growthProcess.realTimeVideoShow == "0" && data.data.growthProcess.realityShow == "0") {
						$(".spzs").addClass("cur").show();
					}
					$(".spzs .video-des-title").text(data.data.growthProcess.videoTracing.tunnelInfoName);
					$(".spzs #playNumbers").text(data.data.growthProcess.videoTracing.playNumbers);
					$(".spzs #shootLength").text(data.data.growthProcess.videoTracing.shootLength);
					$(".spzs #plantName3").text(data.data.growthProcess.videoTracing.plantName);

					if(data.data.growthProcess.videoTracing.videoUrl != undefined && data.data.growthProcess.videoTracing.videoUrl != null) {
						$(".video-list.spzs").click(function(){
							playnum();
						});
						CreatVideo2();
						$("li.spzs").click(function() {
							player.dispose(); //清理
							CreatVideo2();
						});
					} else {
						$("#spzs").empty();
						$("#spzs").append('<img src="/asset/images/resume2/none.png" />');
					}

				} else {
					$(".spzs").removeClass("cur").addClass("nouse").unbind("click");
				}

				$("#video-pic,#video-pic1").carousel({
					interval: false
				});

				$("#video-pic,#video-pic1").swipeleft(function() {
					/*$("#video-pic .right").click(function() {*/
					var index1 = $("#video-pic .carousel-inner div.active").index();
					if($("#video-pic .carousel-inner div.active").next("div").length != 0 || $("#video-pic1 .carousel-inner div.active").next("div").length != 0) {
						
						$("#video-pic,#video-pic1").carousel('next');
						$("#curpic-num").text($(".carousel-inner .item.active").prevAll(".item").length + 2);
						$("#shotTime").text(data.data.growthProcess.realityVideo.videoUrl[index1 + 1].shotTime);
					}
				});
				$("#video-pic,#video-pic1").swiperight(function() {
					/*$("#video-pic .left").click(function() {*/
					var index2 = $("#video-pic .carousel-inner div.active").index();
					if($("#video-pic .carousel-inner div.active").prev("div").length != 0 || $("#video-pic1 .carousel-inner div.active").prev("div").length != 0) {
						$("#video-pic,#video-pic1").carousel('prev');
						$("#curpic-num").text($(".carousel-inner .item.active").prevAll(".item").length);
						$("#shotTime").text(data.data.growthProcess.realityVideo.videoUrl[index2 - 1].shotTime);
					}

				});
				$("#video-pic").on("click",".item",function(){
					$(".videopic-list").fadeIn(500);
				});

			}
		},
		error: function(err) {
			console.log("请求失败");
		}
	});
});
//视频返回
function backpage() {
	window.history.back(-1);
	//var preurl=document.referrer;
	//window.location.href=document.referrer+"#page3";
}
//环境实况返回
function backvideo() {
	$(".videopic-list").fadeOut(500);
}
//视频点击次数
function playnum(){
	$.ajax({
		type: "POST",
		url: pathurl+'?method=resume.videoup.data',
		data: {field: JSON.stringify(getName) },
		dataType: "jsonp",
		success: function(data) {
			if(data.invoke_result == "INVOKE_SUCCESS") {
				var c = parseInt($(".spzs #playNumbers").text());
				var num = c + 1;
				$(".spzs #playNumbers").text(num);
			}
		}
	});
}
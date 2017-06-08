var player;
var vID= ""; 
var vWidth= "";                //播放器宽度设置
var vHeight= "";
var vPlayer= ""; //播放器文件
var vHLSset = "";             //HLS配置
var vPic= "";    //视频缩略图
var vCssurl = "";     //移动端CSS应用文件
var  vHLSurl = "";
$(function() {
	var growthProcess=eval(allJson);
	var videoParams=videoParam.split(',');
	var one=false;
	var two=false;
	var three=false;
	for(var i=0;i<videoParams.length;i++){
		if(videoParams[i]==1){
			one=true;
		}
		if(videoParams[i]==2){
			two=true;
		}
		if(videoParams[i]==3){
			three=true;
		}
	}
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
		imgURL = "/images/resume2/1.jpg";
		videoURL = growthProcess.realTimeVideo.videoUrl;
		scriptAdd = '<video id="live-video1" class="video-js vjs-default-skin vjs-big-play-centered" style="width:100%;height:100%;" preload="auto" poster="' + imgURL + '" controls><source src="' + videoURL + '" type="application/x-mpegURL"/></video>';
		$("#skzb").html(scriptAdd);
		player = videojs("live-video1");
		player.paused();
	}

	function CreatVideo2(videoURL, imgURL) {
		//player.dispose(); //清理
		imgURL = "/images/resume2/3.jpg";
		videoURL = growthProcess.videoTracing.videoUrl;
		scriptAdd = '<video id="live-video2" class="video-js vjs-default-skin vjs-big-play-centered" style="width:100%;height:100%;" preload="auto" poster="' + imgURL + '" controls><source src="' + videoURL + '" type="application/x-mpegURL"/></video>';
		$("#spzs").html(scriptAdd);
		player = videojs("live-video2");
		player.paused();
	}

	//实况直播
	if(one){
		$(".skzb").addClass("cur").show();
		$(".skzb .video-des-title").text(growthProcess.realTimeVideo.tunnelInfoName);
		$(".skzb #plantName1").text(growthProcess.realTimeVideo.plantName);
		if(growthProcess.realTimeVideo.videoUrl != undefined && growthProcess.realTimeVideo.videoUrl != null && growthProcess.realTimeVideo.videoUrl != "") {
			/*CreatVideo();
			$("li.skzb").click(function() {
				player.dispose(); //清理
				CreatVideo();
			});*/
			 vID= "playOne"; 
			 vWidth= 340;                //播放器宽度设置
             vHeight= 265;
             vPlayer= "/document/player.swf"; //播放器文件
             vHLSset = "/document/HLS.swf";             //HLS配置
             vPic= "/asset/images/iphone/videosImg.jpg";    //视频缩略图
             vCssurl = "/asset/css/mini.css";     //移动端CSS应用文件
            vHLSurl = growthProcess.realTimeVideo.videoUrl;
             
             var head= document.getElementsByTagName('head')[0]; 
             var script= document.createElement('script'); 
             script.type= 'text/javascript'; 
             script.src= '../asset/js/hls.min.js'; 
             head.appendChild(script); 
		} else {
			$("#skzb").empty();
			$("#skzb").append('<img src="../asset/images/resume2/none.png" />');
		}
	}else{
		$(".skzb").removeClass("cur").addClass("nouse").unbind("click");
	}

	
	//环境实况
	if(two && growthProcess.realityVideo != null) {
		$("li.hjsk").show();
		if(!one) {
			$(".hjsk").addClass("cur").show();
		}
		var f = growthProcess.realityVideo.videoUrl;

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
		
		$("#video-pic .carousel-inner .item:eq(0)").addClass("active");
		$("#video-pic1 .carousel-inner .item:eq(0)").addClass("active");
		$("#allpic-num,#imgNumbers").text(totalnum);
		$(".hjsk .video-des-title").text(growthProcess.realityVideo.tunnelInfoName);
		$(".hjsk #plantName2").text(growthProcess.realityVideo.plantName);
		$("#video-pic,#video-pic1").swipeleft(function() {
			if(pagecur > pagetotal || $("#curpic-num").text() == $("#allpic-num").text()) {
			} else {
				if($("#video-pic .carousel-inner .item.active").nextAll(".item").length == 1) {
					pagecur++;
					for(var i = start; i < startnum; i++) {
						$("#video-pic .carousel-inner").append('<div class="item"><img src="' + f[i].url + '" width="640" height="550"/></div>');
						$("#video-pic1 .carousel-inner").append('<div class="item"><img src="' + f[i].url + '" width="640" height="550"/></div>');
						$("#shotTime").text(f[startshotTime].shotTime);
					}
					start += 10;
					startnum += 10;
					startshotTime += 10;
					//alert(startshotTime);
				}
			}
		});
	} else {
		$(".hjsk").removeClass("cur").addClass("nouse").unbind("click");
	}
	//视频追溯
	if(three){
		$("li.spzs").show();
		if(!one && !two) {
			$(".spzs").addClass("cur").show();
		}
		$(".spzs .video-des-title").text(growthProcess.videoTracing.tunnelInfoName);
		$(".spzs #playNumbers").text(growthProcess.videoTracing.playNumbers);
		$(".spzs #shootLength").text(growthProcess.videoTracing.shootLength);
		$(".spzs #plantName3").text(growthProcess.videoTracing.plantName);
		
		if(growthProcess.videoTracing.videoUrl != undefined && growthProcess.videoTracing.videoUrl != null && growthProcess.videoTracing.videoUrl != "") {
			/*CreatVideo2();
			$("li.spzs").click(function() {
				player.dispose(); //清理
				CreatVideo2();
			});*/
			setTimeout(function(){
				 vID= "playThree"; 
	             vWidth= 340;                //播放器宽度设置
	             vHeight= 265;
	             vPlayer= "/document/player.swf"; //播放器文件
	             vHLSset = "/document/HLS.swf";             //HLS配置
	             vPic= "/asset/images/iphone/videosImg.jpg";    //视频缩略图
	             vCssurl = "/asset/css/mini.css";     //移动端CSS应用文件
	            vHLSurl = growthProcess.videoTracing.videoUrl;
	             
	             var head= document.getElementsByTagName('head')[0]; 
	             var script= document.createElement('script'); 
	             script.type= 'text/javascript'; 
	             script.src= '../asset/js/hls.min.js'; 
	             head.appendChild(script); 
			},100);
		} else {
			$("#spzs").empty();
			$("#spzs").append('<img src="../asset/images/resume2/none.png" />');
		}
	}else{
		$(".spzs").removeClass("cur").addClass("nouse").unbind("click");

	}

	

	$("#video-pic,#video-pic1").carousel({
		interval: false
	});

	$("#video-pic,#video-pic1").swipeleft(function() {
		/*$("#video-pic .right").click(function() {*/
		var index1 = $("#video-pic .carousel-inner div.active").index();
		if($("#video-pic .carousel-inner div.active").next("div").length != 0) {
			$("#video-pic,#video-pic1").carousel('next');
			$("#curpic-num").text($(".carousel-inner .item.active").prevAll(".item").length + 2);
			$("#shotTime").text(growthProcess.realityVideo.videoUrl[index1 + 1].shotTime);
		}
	});
	$("#video-pic,#video-pic1").swiperight(function() {
		/*$("#video-pic .left").click(function() {*/
		var index2 = $("#video-pic .carousel-inner div.active").index();
		if($("#video-pic .carousel-inner div.active").prev("div").length != 0) {
			$("#video-pic,#video-pic1").carousel('prev');
			$("#curpic-num").text($(".carousel-inner .item.active").prevAll(".item").length);
			$("#shotTime").text(growthProcess.realityVideo.videoUrl[index2 - 1].shotTime);
		}

	});
	
	$("#video-pic").on("click",".item",function(){
		$(".videopic-list").fadeIn(500);
	});

});
// 创建视频
function CreatVideo(videoURL, imgURL) {
	player = videojs("live-video1");
	player.paused();
}

function CreatVideo2(videoURL, imgURL) {
	player.dispose(); //清理
	player = videojs("live-video2");
	player.paused();
}
//视频返回
function backpage() {
	window.history.back(-1);
}
//环境实况返回
function backvideo() {
	$(".videopic-list").fadeOut(500);
} 
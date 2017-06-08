// JavaScript Document
$(function() {
	$.ajax({
		type: "POST",
		url: pathurl+'?method=resume.whole.data',
		data: {field: JSON.stringify(getName) },
		dataType: "jsonp",
		success: function(data) {
			if(data.invoke_result == "INVOKE_SUCCESS") {
				//农场视频
				if(data.data.introduction.farmVideo!=null) {
					CreatVideo3();

					function CreatVideo3(videoURL, imgURL) {
						imgURL = "";
						videoURL = data.data.introduction.farmVideo;
						scriptAdd = '<video id="live-video3" class="video-js vjs-default-skin vjs-big-play-centered" style="width:100%;height:100%;" preload="auto" poster="' + imgURL + '" controls><source src="' + videoURL + '" type="application/x-mpegURL"/></video>';
						$(".ncvideo").html(scriptAdd);
						player = videojs("live-video3");
						player.paused();
					}
				} else {
					$(".ncvideo").append('<img src="/asset/images/resume2/none.png" />');
				}

			}
		},
		error: function(err) {
			console.log("请求失败");
		}
	});
});

function backpage() {
	window.history.back(-1);
}
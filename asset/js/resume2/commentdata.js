// JavaScript Document
var RegeMatch;//校验字符
$(function() {
	
	$.ajax({
		type: "POST",
		url: pathurl+'?method=resume.whole.data',
		data: {field: JSON.stringify(getName) },
		dataType: "jsonp",
		success: function(data) {
			if(data.invoke_result == "INVOKE_SUCCESS") {
				var s = data.data.allComment.allList;
				if(s!=null && s.length!=0){
					for(var i = 0; i < s.length; i++) {
						var html = '';
						html += '<li>';
						html += '<p class="comment-time">' + s[i].commentTime + '</p>';
						var pattern = new RegExp("[~'!@#$%^&*()-+_=:<>]");
						if(pattern.test(s[i].commentContent)) {
							s[i].commentContent = s[i].commentContent.replace(/[<>&"]/g, function(c) { return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]; });
						}
						html += '<p class="comment-des">' + s[i].commentContent + '</p>';
						html += '<div class="xing">';
						html += '<ul>';
						for(var j = 0; j < s[i].levelStar; j++) {
							html += '<li class="cur"></li>';
						}
						for(var j = 0; j < (5 - s[i].levelStar); j++) {
							html += '<li></li>';
						}
						html += '<div class="clearfix"></div>';
						html += '</ul>';
						html += '</div>';
						html += '</li>';
						$(".comment-wrap #pl-list .loadingpl").before(html);
					}
				}	
				else{
					$(".comment-wrap").css("background","url(/asset/images/resume2/nocomment.jpg) no-repeat top");  
					$(".comment-wrap").css("background-size","auto 100%");  
				}
			}
		},
		error: function(err) {
			console.log("请求失败");
		}
	});

	//下拉加载
	var page = 2;
	//var commentlist = true ? { 'useBatch': getId, 'page': page } : { 'productId': getId, 'page': page };
	var scrollloading;
	$(".comment-wrap").bind("scroll", function() {
		var commentlist = commentlist == 'useBatch' ? { 'useBatch': getId, 'page': page } : { 'productId': getId, 'page': page };
		//var commentlist = true ? { 'useBatch': getId, 'page': page } : { 'productId': getId, 'page': page };
		console.log(commentlist);
		var scrollTop = $(this).scrollTop();
		var scrollHeight = $(".comment-list").height();
		var windowHeight = $(this).height();
		if(scrollTop + windowHeight == scrollHeight) {
			console.log();
			$.ajax({
				type: "POST",
				url: pathurl+'?method=resume.commentList.data',
				data: {field: JSON.stringify(commentlist) },
				dataType: "jsonp",
				success: function(data) {
					//alert(data.invoke_result);
					if(data.invoke_result == "INVOKE_SUCCESS") {
						var s = data.data;
						//$("#pl-list").append('<div class="loadingpl">加载中。。。</div>');
						//alert(s.length);
						if(s.length > 0) {
							$("#pl-list .loadingpl").text("加载中。。。");
							clearTimeout(scrollloading);
							scrollloading = setTimeout(function() {
								for(var i = 0; i < s.length; i++) {
									var html = '';
									html += '<li>';
									html += '<p class="comment-time">' + s[i].commentTime + '</p>';
									var pattern = new RegExp("[~'!@#$%^&*()-+_=:<>]");
									if(pattern.test(s[i].commentContent)) {
										s[i].commentContent = s[i].commentContent.replace(/[<>&"]/g, function(c) { return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]; });
									}
									html += '<p class="comment-des">' + s[i].commentContent + '</p>';
									html += '<div class="xing">';
									html += '<ul>';
									for(var j = 0; j < s[i].levelStar; j++) {
										html += '<li class="cur"></li>';
									}
									for(var j = 0; j < (5 - s[i].levelStar); j++) {
										html += '<li></li>';
									}
									html += '<div class="clearfix"></div>';
									html += '</ul>';
									html += '</div>';
									html += '</li>';
									$(".comment-wrap #pl-list .loadingpl").before(html);
								}
								page++;
							}, 1000);
						} else {
							$("#pl-list .loadingpl").text("没有了。。。");
						}

					}
				},
				error: function(err) {}
			});
		}
	});
	//评论星
	$(".pl-xing li").click(function() {
		if($(this).hasClass("cur")) {
			$(".pl-xing li").removeClass("cur");
			$(this).addClass("cur");
			$(this).prevAll("li").addClass("cur");
		} else {
			$(this).addClass("cur");
			$(this).prevAll("li").addClass("cur");
		}

	});

	//评论按钮
	$(".comment-btn").click(function() {
		$(".comment-ta textarea").val("");
		$(".pl-btn").removeClass("on");
		$(".comment-write").show();
		$(".overlay").height($(window).height());
		$(".overlay").fadeIn(1000);
	});
	//判断为空
	$(".comment-ta textarea").on("input", function() {
		if($(this).val() != "") {
			$(".pl-btn").attr("onclick", "resetpl()");
			$(".pl-btn").addClass("on");
		} else {
			$(".pl-btn").removeAttr("onclick");
		}
	});
});
//评论保存
var plnum = $(".pl-icon3 .pl-num", parent.document).text();
resetpl = function() {
	var commentContent = $(".comment-ta textarea").val();
	var levelStar = $(".pl-xing li.cur").length;

	/*var http = document.location.href;
	var address = http.split("?");
	var savecomment = address[1].split("=")[0];
	var getId = address[1].split("=")[1];*/
	
	//var savecomment = true ? { 'useBatch': getId, 'commentContent': commentContent, 'levelStar': levelStar } : { 'productId': getId, 'commentContent': commentContent, 'levelStar': levelStar };
	var savecomment = savecomment == 'useBatch' ? { 'useBatch': getId, 'commentContent': commentContent, 'levelStar': levelStar } : { 'productId': getId, 'commentContent': commentContent, 'levelStar': levelStar };
	
	//当前时间
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var commentTime = month + seperator1 + strDate +
		" " + date.getHours() + seperator2 + date.getMinutes();

	if($(".comment-ta textarea").val().length > 50) {
		$(".toast").fadeIn(500);
		$(".toast").delay(2000).fadeOut(1000);
	} else {
		console.log(savecomment);
		$.ajax({
			type: "POST",
			url: pathurl+'?method=resume.saveComment.data',
			data: {field: JSON.stringify(savecomment) },
			dataType: "jsonp",
			success: function(data) {
				if(data.invoke_result == "INVOKE_SUCCESS") {
					var pattern = new RegExp("[~'!@#$%^&*()-+_=:<>]");
					if(pattern.test($(".comment-ta textarea").val())) {
						commentContent = commentContent.replace(/[<>&"]/g, function(c) { return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]; });
					} 
					
					$(".comment-write").hide();
					$(".comment-ta textarea").val("");
					$(".pl-btn").removeClass("on");
					$(".pl-btn").removeAttr("onclick");

					var html = '';
					html += '<li>';
					html += '<p class="comment-time">' + commentTime + '</p>';
					html += '<p class="comment-des">' + commentContent + '</p>';
					html += '<div class="xing">';
					html += '<ul>';
					for(var j = 0; j < levelStar; j++) {
						html += '<li class="cur"></li>';
					}
					for(var j = 0; j < (5 - levelStar); j++) {
						html += '<li></li>';
					}
					html += '<div class="clearfix"></div>';
					html += '</ul>';
					html += '</div>';
					html += '</li>';
					$(".comment-wrap #pl-list").prepend(html);
					$(".comment-wrap").css("background","");  
					$(".comment-wrap").scrollTop(0);
					plnum++;
					$(".pl-icon3 .pl-num", parent.document).text(plnum);
					$(".overlay").fadeOut(1000);

				} else {
					//$(".toast").text("请求失败，请重试！");
				}
			},
			error: function(err) {
				console.log("请求失败");
			}
		});  
	}
}

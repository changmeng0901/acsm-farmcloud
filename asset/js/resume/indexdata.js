// JavaScript Document
var certificate;//资质证书
var stopturn;
certificate = function(piclist){
	clearInterval(stopturn);
	$(".poster-listpic,#showpic .carousel-inner").empty();
	
	var f = piclist;
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
			$("#showpic .carousel-inner").append('<div class="item"><table><tr><td><img src="' + f[start] +'"/></td></tr></table></div>');
		}
	} else {
		for(start = 0; start < startnum; start++) {
			$(".poster-listpic").append('<li><img src="' + f[start] + '@210w_300h_1e_1c.src'+'"/></li>');
			$("#showpic .carousel-inner").append('<div class="item"><table><tr><td><img src="' + f[start] +'"/></td></tr></table></div>');
		}
	}
	startnum += 10;
	startshotTime += 10 - 1;
	
	$("#showpic .item:eq(0)").addClass("active");
	$(".poster-listpic li:eq(0)").addClass("left-pic");
	$(".poster-listpic li:eq(1)").addClass("active-pic");
	$(".poster-listpic li:eq(2)").addClass("right-pic");
	$(".pic0 img").attr("src",$(".poster-listpic li:eq(0) img").attr("src"));
	$(".pic1 img").attr("src",$(".poster-listpic li:eq(1) img").attr("src"));
	$(".pic2 img").attr("src",$(".poster-listpic li:eq(2) img").attr("src"));
	
	$('#showpic').carousel({
		interval: false
	});
	//右按钮事件
	$("#showpic .page2-right-btn,.lunboright,.poster-next-btn").click(function(){
		var nowTime = new Date().getTime();
		var clickTime = $(this).attr("ctime");
		if(clickTime != 'undefined' && (nowTime - clickTime < 1000)) {
			return false;
		} else {
			$(this).attr("ctime", nowTime);
			$("#showpic .page2-left-btn").show();
			$("#showpic").carousel('next');
			if($("#showpic .item.active").nextAll(".item").length==0){
				$(".poster-listpic li:eq(0)").addClass("right-pic");
			}
			if($("#showpic .item.active").nextAll(".item").length==3){
				pagecur++;
				if(pagecur <= pagetotal) {
					console.log("pagecur:"+pagecur+"---"+"pagetotal:"+pagetotal+"----"+"startnum:"+startnum+"---"+"start:"+start+"---"+"startnum:"+startnum);
					if(totalnum-startnum<10){
						for(var i = start; i < totalnum; i++) {
							$(".poster-listpic").append('<li><img src="' + f[i] + '@210w_300h_1e_1c.src'+'"/></li>');
							$("#showpic .carousel-inner").append('<div class="item"><table><tr><td><img src="' + f[i] +'"/></td></tr></table></div>');
						}
					}
					else{
						for(var i = start; i < startnum; i++) {
							$(".poster-listpic").append('<li><img src="' + f[i] + '@210w_300h_1e_1c.src'+'"/></li>');
							$("#showpic .carousel-inner").append('<div class="item"><table><tr><td><img src="' + f[i] +'"/></td></tr></table></div>');
						}
					}
					start += 10;
					startnum += 10;
					startshotTime += 10;
				}
			}
			
			$(".poster-listpic li.active-pic").addClass("left-pic").removeClass("active-pic").siblings("li").removeClass("left-pic");
			$(".poster-listpic li.right-pic").addClass("active-pic").removeClass("right-pic");
			$(".poster-listpic li.active-pic").next("li").addClass("right-pic");
			$(".pic0 img").attr("src",$(".poster-listpic li.left-pic img").attr("src"));
			$(".pic1 img").attr("src",$(".poster-listpic li.active-pic img").attr("src"));
			$(".pic2 img").attr("src",$(".poster-listpic li.right-pic img").attr("src"));
		}
	});
	//左按钮事件
	$("#showpic .page2-left-btn,.lunboleft,.poster-prev-btn").click(function(){
		
		$("#showpic .page2-right-btn").show();
		$("#showpic").carousel('prev');
		if($("#showpic .item.active").prevAll(".item").length==1){
			$("#showpic .page2-left-btn").hide();
			$(".lunboleft").hide();
		}
		$(".poster-listpic li.active-pic").addClass("right-pic").removeClass("active-pic").siblings("li").removeClass("right-pic");
		$(".poster-listpic li.left-pic").addClass("active-pic").removeClass("left-pic");
		$(".poster-listpic li.active-pic").prev("li").addClass("left-pic");
		$(".pic0 img").attr("src",$(".poster-listpic li.left-pic img").attr("src"));
		$(".pic1 img").attr("src",$(".poster-listpic li.active-pic img").attr("src"));
		$(".pic2 img").attr("src",$(".poster-listpic li.right-pic img").attr("src"));
	});
	
	stopturn=setInterval(function() {
		$(".poster-next-btn").click();
	}, 5000);
	Carousel.init($(".pictureSlider"));
};

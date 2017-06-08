var startfun;
$(function() {
	startfun();
	//$("#iframe").height($("#iframe").contents().find("#container").height());
});
startfun = function() {
	$(".table-move li").each(function(i) {
		var classname = $(this).attr("class");
		var c = classname.substr(2, 2);
		$(".table-sql .td" + c).show();
	});
	registerDrag($('#container'));
	setTimeout(function() {
		$(".width").width($(".table-sql").width()+2);
	}, 100);
}

function delTitle(obj) {
	if($(".table-move li").length > 1) {
		var classname = $(obj).parents("li").attr("class");
		var c = classname.substr(2, 2);
		$(".table-move .td" + c).remove();
		$(".width").width($(".width").width()-140);
		$(obj).parents("li").removeClass("m");
		$(".operation").css("overflow-x","hidden");
		/*$(".table-move ul,.table-sql").css("border-right","1px solid #cadbeb");
		$(".table-move,.table-sql").css("border-left","1px solid #cadbeb");
		$(".operation").css("border-right","none");
		$(".operation").css("border-left","none");*/
		$(".table-sql .td" + c).hide();
		if($(".table-titlelist li.td" + c).length == 0) {
			$(".table-titlelist ul .clearfix").before('<li class="td' + c + ' dragger" onmouseover="showImg(this)" onmouseleave="hideImg(this)"><a>' + $(obj).parents("a").text() + '<img src="/images/productionset/close.png" class="close-img" onclick="delTitle(this)"/></a></li>');
		}
		registerDrag($('#container'));
		if($(".table-title").height()>60 && $(".table-title").height()<110){
			$("#iframe",parent.document).height(682);
		}
		if($(".table-title").height()>110){
			$("#iframe",parent.document).height(734);
		}
	} else {
		alert("不能再删了");
	}
}

function showImg(obj) {
	if($(obj).parents("div").hasClass("table-move")) {
		$(obj).find(".close-img").show();
	}
}

function hideImg(obj) {
	$(obj).find(".close-img").hide();
}

function ref() {
	$('#iframe').attr('src', $('#iframe').attr('src'));
	startfun();
}
$(window).resize(function() {
	if($(".width").width() > $(".operation").width()) {
		$(".operation").css("overflow-x", "scroll");
	}
	else{
		$(".operation").css("overflow-x", "hidden");
	}
});
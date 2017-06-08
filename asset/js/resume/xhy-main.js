$.fn.center = function() {
	this.css("position", "absolute");
	this.css("top", "50%");
	this.css("margin-top", "-" + this.height() / 2 + "px");
	this.css("left", "50%");
	this.css("margin-left", "-" + this.width() / 2 + "px");
	return this;
}
$(function() {

	$('input[class="iCheck"]').iCheck({
		checkboxClass: 'icheckbox_minimal-blue',
		radioClass: 'iradio_minimal-blue'
	});
	$("input[itembb]").on('ifClicked', function() {
		if(this.checked) {
			$(this).attr("itembb", "unchecked");
		} else {
			$(this).attr("itembb", "checked");
		}
	});


	//宽度计算

	$(".rightdiv").width($(window).width() - 77);
	$(".right_content").width($(".rightdiv").width());
	$(".right-con-left").width($(".right-con").width() - 380);
	$(".right-con1-right").width($(".right-con-left").width() - 200);
	$(window).resize(function(e) {
		if($(".panorama_level").is(":visible")) {
			$(".rightdiv").width($(window).width() - 77);
			$(".right_content").width($(".rightdiv").width() - 197);
			$(".right-con-left").width($(".right-con").width() - 380);
			$(".right-con1-right").width($(".right-con-left").width() - 200);
		} else {
			$(".rightdiv").width($(window).width() - 77);
			$(".right_content").width($(".rightdiv").width());
			$(".right-con-left").width($(".right-con").width() - 380);
			$(".right-con1-right").width($(".right-con-left").width() - 200);
		}

	});




});

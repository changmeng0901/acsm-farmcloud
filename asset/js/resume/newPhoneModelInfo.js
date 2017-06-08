jquery.fn.center = function() {
	this.css("position", "absolute");
	this.css("top", "50%");
	this.css("margin-top", "-" + this.height() / 2 + "px");
	this.css("left", "50%");
	this.css("margin-left", "-" + this.width() / 2 + "px");
	return this;
}
jquery(function() {
	jquery('.selectpicker').selectpicker(); //下拉菜单
	jquery("[data-toggle='tooltip']").tooltip(); //工具提示
	jquery("[data-toggle='popover']").popover(); //弹出框（Popover）
	jquery('#myTab a:last').tab('show');
	jquery(".form_datetime").datetimepicker({ //日历控件
		format: "yyyy-mm-dd",
		minView: "month",
		autoclose: true,
		weekStart: 1,
		//startDate: "2014-08-14 10:00",
		language: 'zh-CN',

		pickerPosition: "bottom-left"
	});
	jquery(".form_date").datetimepicker({ //日历控件
		format: "yyyy-mm-dd hh:ii",
		autoclose: true,
		weekStart: 1,
		//startDate: "2014-08-14 10:00",
		language: 'zh-CN',

		pickerPosition: "bottom-left"
	});

	jquery('input[class="iCheck"]').iCheck({
		checkboxClass: 'icheckbox_minimal-blue',
		radioClass: 'iradio_minimal-blue'
	});
	
	jquery("input[itembb]").on('ifClicked', function() {
		if(this.checked) {
			jquery(this).attr("itembb", "unchecked");
		} else {
			jquery(this).attr("itembb", "checked");
		}
	});

	//内容设置品质全部启用
	jquery('#neirong input[allaa]').on('ifClicked', function() { //评论管理全选
		if(this.checked) {
			jquery(this).attr("allaa", "unchecked");
			jquery(this).parents('ul').find('input[itembb]').iCheck('uncheck');
			jquery(this).parents('ul').find('input[itembb]').attr("itembb", "unchecked");
		} else {
			jquery(this).attr("allaa", "checked");
			jquery(this).parents('ul').find('input[itembb]').iCheck('check');
			jquery(this).parents('ul').find('input[itembb]').attr("itembb", "checked");
		}
	});


	//宽度计算

	jquery(".rightdiv").width(jquery(window).width() - 77);
	jquery(".right_content").width(jquery(".rightdiv").width());
	jquery(".right-con-left").width(jquery(".right-con").width() - 380);
	jquery(".right-con1-right").width(jquery(".right-con-left").width() - 200);
	jquery(window).resize(function(e) {
		if(jquery(".panorama_level").is(":visible")) {
			jquery(".rightdiv").width(jquery(window).width() - 77);
			jquery(".right_content").width(jquery(".rightdiv").width() - 197);
			jquery(".right-con-left").width(jquery(".right-con").width() - 380);
			jquery(".right-con1-right").width(jquery(".right-con-left").width() - 200);
		} else {
			jquery(".rightdiv").width(jquery(window).width() - 77);
			jquery(".right_content").width(jquery(".rightdiv").width());
			jquery(".right-con-left").width(jquery(".right-con").width() - 380);
			jquery(".right-con1-right").width(jquery(".right-con-left").width() - 200);
		}

	});

	//子菜单点击事件
	jquery(".collapse_btn").click(function() {
		if(jquery(".panorama_level").is(":visible")) {
			jquery(".panorama_level").hide();
			jquery(".rightdiv").width(jquery(window).width() - 77);
			jquery(".right_content").width(jquery(".rightdiv").width());
			jquery(".right-con-left").width(jquery(".right-con").width() - 380);
			jquery(".right-con1-right").width(jquery(".right-con-left").width() - 200);
		} else {
			jquery(".panorama_level").show();
			jquery(".rightdiv").width(jquery(window).width() - 77);
			jquery(".right_content").width(jquery(".rightdiv").width() - 197);
			jquery(".right-con-left").width(jquery(".right-con").width() - 380);
			jquery(".right-con1-right").width(jquery(".right-con-left").width() - 200);
		}
	});
	// 商品搜索
	jquery("#searchName").focus(function() {
		var txt_value = jquery(this).val();
		if(txt_value == '请输入作物名称搜索') {
			jquery(this).val("");
		};
	});
	jquery("#searchName").blur(function() {
		var txt_value = jquery(this).val();
		if(txt_value == "") {
			jquery(this).val("请输入作物名称搜索");
		};
	});

	//提示
	jquery(".selled").hover(function() {
		jquery(this).next(".copymsg").show();
	}, function() {
		jquery(this).next(".copymsg").hide();
	});
	
	
	//tab
	jquery('#myTab a:first').tab('show');
	jquery('#myTab a:first').css("border-left", "none").css("border-radius", "5px 0 0 0");
	jquery('#myTab a:last').css("border-right", "none").css("border-radius", "0 5px 0 0");
	jquery('#myTab a').click(function(e) {
		e.preventDefault();
		jquery(this).tab('show');
		jquery('#myTab a:first').css("border-left", "none").css("border-radius", "5px 0 0 0");
		jquery('#myTab a:last').css("border-right", "none").css("border-radius", "0 5px 0 0");
	})


	//开启启用设置事件
	jquery(".setting_btn").click(function() {
		if(jquery(this).parent("li").find("input[itembb]").attr("itembb") == "checked") {
			jquery(this).attr("data-toggle", "modal");
		} else {
			jquery(this).attr("data-toggle", "");
		}

		if(jquery(this).parent("li").find("input[itembb]").length == 0) {
			jquery(this).attr("data-toggle", "modal");
		}
	});
	//专家解读、生育期点击事件
	jquery(".zj-list li,.syq-wrap li").click(function() {
		jquery(this).addClass("cur");
		jquery(this).siblings("li").removeClass("cur");

	});

	//选择红包
	jquery("input[name='type-buy']").on('ifChecked', function(event) {
		if(this.checked) {
			if(jquery(this).attr("value") == "1") {
				jquery("#choose-redbag").hide();
				jquery("#address").show();
				jQuery('#wygmModal .overin div .mr10').text("输入网址");
			}
			if(jquery(this).attr("value") == "0") {
				jquery("#choose-redbag").show();
				jquery("#address").hide();
				jQuery('#wygmModal .overin div .mr10').text("选择商品");
			}
		}

	});
});
//图片预览
function preview(file) {
	var prevDiv = jquery(".zs-list");
	if(file.files && file.files[0]) {
		var reader = new FileReader();
		reader.onload = function(evt) {
			jquery("#img").remove();
			//prevDiv.append('<img id="img" src="' + evt.target.result + '" />''');
			prevDiv.prepend('<li><img src="' + evt.target.result + '" /></li>');
		}
		reader.readAsDataURL(file.files[0]);
	} else {
		prevDiv.prepend('<li style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></li>');
	}

}
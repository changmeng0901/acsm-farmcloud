/*! ACSM v1.0.0 */

(function($){
	/**
	 *  限制键盘输入方法
	 *  {OPTIONS}   | [type]     | (default),values                             | Explanation
	 *  ---------   | ---------  | -------------------------------------------- | -----------
	 *  @filterType | [string]   | (digital),currency,alphabet,digital/alphabet | 
	 */
	$.fn.onKBDEvent = function(options){
		var defaults = {
			filterType : "digital" // digital : 数字, alphabet : 字母, digital/alphabet : 数字/字母, currency : 货币
		};

		var options = $.extend(defaults, options);
		
		$(this).css("ime-mode", "disabled"); // 禁止输入法输入

		return $(this).keypress(function(event){
			event = event || window.event;
			var key = event.keyCode ? event.keyCode : event.which;

			if (options.filterType == "digital") {
				if ((key >= 48 && key <= 57) || key == 8){
					return true;
				}else{
					return false;
				}
			} else if (options.filterType == "currency") {
				if ((key >= 48 && key <= 57) || key == 46 || key == 8){
					return true;
				}else{
					return false;
				}
			} else if (options.filterType == "alphabet") {
				if ((key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key == 8){
					return true;
				}else{
					return false;
				}
			} else if (options.filterType == "digital/alphabet") {
				if ((key >= 48 && key <= 57) || (key >= 65 && key <= 90) || (key >= 97 && key <= 122) || key == 8){
					return true;
				}else{
					return false;
				}
			} else {
				return false;
			}
			
		});
	};
	
	$.REGEX_TYPES = {
		//手机号码验证
		phone    : /^(13[0-9]|15[0-9]|18[0-9])[0-9]{8}$/, 
		//多个手机号码验证
		phones    : /^((13[0-9]|15[0-9]|18[0-9])[0-9]{8},?)+$/, 
		//固定电话验证
		tel      : /^((\d{3}-\d{8})|(\d{4}-\d{7,8}))$/, 
		//手机或电话
		phone_tel: /(^(13[0-9]|15[0-9]|18[0-9])[0-9]{8}$)|(^((\d{3}-\d{8})|(\d{4}-\d{7,8}))$)/, 
		//E-MAIL验证
		//email    : /^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$/,
		email    : /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/,
		//多个邮箱验证
		emails   : /^(([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4},?)+$/,
		//货币格式验证
//		currency : /^([1-9][\\d]{0,7}|0)(\\.[\\d]{1,2})?$/,
		currency : /^(([1-9]\d*)(\.\d{1,2})?)$|(0\.0?([1-9]\d?))$/,
		//数字验证
		digital  : /^[0-9]+$/,
		//字母验证
		alphabet : /^[a-zA-Z]+$/,
		//数字字母验证
		numalph  : /^[a-zA-Z0-9]+$/
	};

	/**
	 *  验证数据
	 *  {OPTIONS}   | [type]     | (default),values   | Explanation
	 *  ---------   | ---------  | ------------------ | -----------
	 *  @regexType  | [object]   | (null),phone,email | 
	 *  @trigger    | [string]   | (""),blur          |
	 *  @message    | [string]   | ("")               |
	 */
	$.fn.checkVal = function(options) {
		
		var defaults = {
			regexType : null,
			trigger   : "",
			message   : ""
		};
		
		var options = $.extend(defaults, options);

		if (options.trigger != '' && options.trigger != null) {
			$(this).bind(options.trigger, function(){
				var val = $(this).val();
				
				val = $.trim(val);
				
				$(this).val(val);
				
				var required = $(this).prop("required");

				if (val == undefined) {
					alert(options.message == '' ? '对象未定义!' : options.message);
					return false;
				}
				
				if (required) {
					if (!options.regexType.test(val)) {
						alert(options.message == '' ? '数据验证失败!' : options.message);
						return false;
					}
				} else {
					if (val != null && val != '') {
						if (!options.regexType.test(val)) {
							alert(options.message == '' ? '数据验证失败!' : options.message);
							return false;
						}
					}
				}
			});
		} else {
			var val = $(this).val();
			
			val = $.trim(val);

			$(this).val(val);
			
			var required = $(this).prop("required");

			if (val == undefined) {
				alert(options.message == '' ? '对象未定义!' : options.message);
				return false;
			}
			
			if (required) {
				if (!options.regexType.test(val)) {
					alert(options.message == '' ? '数据验证失败!' : options.message);
					return false;
				}
			} else {
				if (val != null && val != '') {
					if (!options.regexType.test(val)) {
						alert(options.message == '' ? '数据验证失败!' : options.message);
						return false;
					}
				}
			}
			
			return true;
		}
	};
	
	/**
	 *  限制键盘输入方法
	 *  {OPTIONS}   | [type]     | (default),values   | Explanation
	 *  ---------   | ---------  | ------------------ | -----------
	 *  @modeType   | [string]   | (years),months     | 
	 *  @beginYear  | [number]   | (2013)             |
	 *  @compareEle | [string]   | (null)             |
	 *  @compareType| [string]   | (begin),end        |
	 *  @trigger    | [string]   | (""),blur          |
	 *  @message    | [string]   | ("")               |
	 */
	$.fn.onDTUtil = function(options) {
		var modeTypes    = {years : "years", months : "months", future : "future", compare : "compare"};
		var compareTypes = {begin : "begin", end : "end"};
		var defaults = {
			modeType    : modeTypes.years, 
			beginYear   : 2013,
			compareEle  : null,
			compareType : compareTypes.begin,
			trigger     : "",
			message     : ""
		};
		var options = $.extend(defaults, options);
		var currentDate = new Date();
		
		if (options.modeType == modeTypes.years || options.modeType == modeTypes.months) {
			
			if (!$(this).is("select")) {
				return false;
			}
			
			var html = "";
			
			if (options.modeType == modeTypes.years) {
				var currentYear = currentDate.getFullYear();
				for (var i = options.beginYear; i <= currentYear; i++) {
					if(i == currentYear){  
						html += "<option value='" + i + "' selected='selected'>" + i + "</option>";  
					}else{  
						html += "<option value='" + i + "'>" + i + "</option>";  
					}
				}
			} else if (options.modeType == modeTypes.months){
				var currentMonth = currentDate.getMonth();
				for(var i = 1; i <= 12; i++){
					if(i == Number(currentMonth + 1)){  
						if (i < 10){
							html += "<option value='" + i + "' selected='selected'>0" + i + "</option>";  
						} else {
							html += "<option value='" + i + "' selected='selected'>" + i + "</option>";  
						}
					}else{  
						if (i < 10){
							html += "<option value='" + i + "'>0" + i + "</option>";  
						} else {
							html += "<option value='" + i + "'>" + i + "</option>";  
						} 
					} 
				}
			}

			$(this).html(html);
		}
		
		if (options.modeType == modeTypes.future || options.modeType == modeTypes.compare) {
			
			if (options.trigger != '' && options.trigger != null) {
				$(this).bind(options.trigger, function(){ 
					var val = $(this).val();
					if (options.modeType == modeTypes.future) {
						//文本输入时间的验证
						if(val.indexOf("-")<0){
							if(!$.REGEX_TYPES.digital.test(val)){
								alert("时间格式不正确");
								return false;
							}else{
								if(new Date().getFullYear()>val){
									alert(options.message == '' ? "输入时间不能小于当前时间!" : options.message);
									return false;
								}
							}
						}else{
							var currentVal = currentDate.getFullYear() + "/" + ((currentDate.getMonth() + 1) < 10 ? "0" + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1)) + "/" + (currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate());
							if (new Date(Date.parse(currentVal)) > new Date(Date.parse(val.replace(/-/g, "/")))) {
								alert(options.message == '' ? "输入时间不能小于当前时间!" : options.message);
								return false;
							}
						}
					} else if (options.modeType == modeTypes.compare) {
						var compareVal = options.compareEle.val();
						if (val != '' && val != undefined && compareVal != '' && compareVal != undefined) {
							if (options.compareType == compareTypes.begin) {
								if (new Date(Date.parse(val.replace(/-/g, "/"))) > new Date(Date.parse(compareVal.replace(/-/g, "/")))) {
									alert(options.message == '' ? "开始时间不能大于结束时间!" : options.message);
									return false;
								}
							} else if (options.compareType == compareTypes.end) {
								if (new Date(Date.parse(compareVal.replace(/-/g, "/"))) > new Date(Date.parse(val.replace(/-/g, "/")))) {
									alert(options.message == '' ? "开始时间不能大于结束时间!" : options.message);
									return false;
								}
							}
						}
					}
				});
			} else {
				var val = $(this).val();
				if (options.modeType == modeTypes.future) {
					//文本输入时间的验证
					if(val.indexOf("-")<0){
						if(!$.REGEX_TYPES.digital.test(val)){
							alert("时间格式不正确");
							return false;
						}else{
							if(new Date().getFullYear()>val){
								alert(options.message == '' ? "输入时间不能小于当前时间!" : options.message);
								return false;
							}
						}
					}else{
						var currentVal = currentDate.getFullYear() + "/" + ((currentDate.getMonth() + 1) < 10 ? "0" + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1)) + "/" + (currentDate.getDate() < 10 ? "0" + currentDate.getDate() : currentDate.getDate());
						if (new Date(Date.parse(currentVal)) > new Date(Date.parse(val.replace(/-/g, "/")))) {
							alert(options.message == '' ? "输入时间不能小于当前时间!" : options.message);
							return false;
						}
					}
				} else if (options.modeType == modeTypes.compare) {
					var compareVal = options.compareEle.val();
					if (val != '' && val != undefined && compareVal != '' && compareVal != undefined) {
						if (options.compareType == compareTypes.begin) {
							if (new Date(Date.parse(val.replace(/-/g, "/"))) > new Date(Date.parse(compareVal.replace(/-/g, "/")))) {
								alert(options.message == '' ? "开始时间不能大于结束时间!" : options.message);
								return false;
							}
						} else if (options.compareType == compareTypes.end) {
							if (new Date(Date.parse(compareVal.replace(/-/g, "/"))) > new Date(Date.parse(val.replace(/-/g, "/")))) {
								alert(options.message == '' ? "开始时间不能大于结束时间!" : options.message);
								return false;
							}
						}
					}
				}
			}
			
			return true;
		}
	};
	
	/**
	 * TAB切换
	 * {OPTIONS}   | [type]     | (default),values   | Explanation
	 *  ---------  | ---------  | ------------------ | -----------
	 *  @menutag   | [string]   | ("")               | 选项卡按钮标签
	 *  @boxtag    | [string]   | ("")               | 选项卡内容标签
	 *  @cur       | [number]   | (0)                | 默认显示索引
	 *  @act       | [string]   | (click),mousemove  | 切换动作click,mousemove
	 *  @fade      | [number]   | (0)                | 淡入时间（毫秒）
	 *  @auto      | [boolean]  | (false)            | 自动播放
	 *  @auottime  | [number]   | (2000)             | 自动播放间隔时间（毫秒）
	 */
	$.fn.tabCtrl = function (options) {
		
		var options = $.extend({
			menutag  :	"",         //选项卡按钮标签
			boxtag   :	"",         //选项卡内容标签
			cur      :	0,          //默认显示索引
			act      :	"click",    //切换动作click,mousemove
			fade     :	0,          //淡入时间（毫秒）
			auto     :	false,      //自动播放
			autotime :	2000        //自动播放间隔时间（毫秒）
		}, options);
		
		$(options.menutag).eq(options.cur).addClass("current");
		$(options.boxtag).eq(options.cur).siblings().hide();
		
		var index = options.cur;
		
		var $this = this;
		
		$(options.menutag).bind(options.act, function(){
			$(this).addClass("current").siblings().removeClass("current");
			index = $(options.menutag).index(this);
			$(options.boxtag).eq(index).fadeIn(options.fade).siblings().hide();
		});
		
		if(options.auto){
			var len = $(options.menutag).length;
			var drive = function(){
				$(options.menutag).eq(index).addClass("current").siblings().removeClass("current");
				$(options.boxtag).eq(index).fadeIn(options.fade).siblings().hide();
				index++;
				if(index == len) index = 0;
			};
			$this[0].intervalID = null;
			$this.hover(function(){
				clearInterval($this[0].intervalID);
			}, function(){
				$this[0].intervalID = setInterval(drive, options.autotime);
			}).trigger("mouseleave");
		}
	};
	
	onSubmitValid = function (elements) {
		
		var result = true;

		$.each(elements, function(i, element){
			if (element.eleType == "value") {
				result = $("#" + element.eleId).checkVal({regexType : element.regexType, message : element.message});
			} else if (element.eleType == "datetime") {
				if (element.modeType == "future") {
					result = $("#" + element.eleId).onDTUtil({modeType : "future", message : element.message});
				} else if (element.modeType == "compare") {
					result = $("#" + element.eleId).onDTUtil({modeType : "compare", compareType : element.compareType, compareEle : element.compareEle});
				}
			}
			if (!result) {
				return false;
			}
		});
		
		return result;
	}; 
	
	//开始时间，结束时间比较
	checkTime = function(selectTime){
		 var selectTime = $.extend({message:"开始时间不能大于结束时间"}, selectTime);
		 if (new Date(Date.parse($(selectTime.beginTime).val().replace(/-/g,"/"))) > new Date(Date.parse($(selectTime.endTime).val().replace(/-/g,"/")))) {
			  alert(selectTime.message);
			  return false;
		 }else { 
			  return true;
		 }
	};
	
})(jQuery);
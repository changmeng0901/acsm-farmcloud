// JavaScript Document


/* 单选按钮 */
	 jquery = jQuery.noConflict();
		//<![CDATA[
		Date.prototype.format =function(format){
			var o = {
					"M+" : this.getMonth()+1, //month
					"d+" : this.getDate(), //day
					"h+" : this.getHours(), //hour
					"m+" : this.getMinutes(), //minute
					"s+" : this.getSeconds(), //second
					"q+" : Math.floor((this.getMonth()+3)/3), //quarter
					"S" : this.getMilliseconds() //millisecond
			}
			if(/(y+)/.test(format)) format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4- RegExp.$1.length));
			for(var k in o)if(new RegExp("("+ k +")").test(format))
				format = format.replace(RegExp.$1, RegExp.$1.length==1? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
			return format;
		}
		
		/* 控制日历的日月年 开始 */
		jquery(function(){

			/* (2014.10.08) 控制年月日 */
		  	var nowStr =new Date().format('yyyy-mm-dd');
		  	jquery("#startTime").val(nowStr);
			jquery("#endTime").val(nowStr);
			jquery(".form_datetime").datetimepicker({
				format: "yyyy-mm-dd",  // 控制显示格式，默认为空，显示小时分钟 
				autoclose: true,
				 weekStart: 1,
				  //startDate: "2014-08-14 10:00",
				 language:  'zh-CN',
				 startView: 3,
				minView: 2,
				maxView: 2,		
				pickerPosition: "bottom-left"
			});
			
			/* 2014.10.08 控制年月 */
			var nowStr02 =new Date().format('yyyy-mm');
		  	jquery("#startTime02").val(nowStr02);
			jquery("#endTime02").val(nowStr02);
			jquery(".form_datetime02").datetimepicker({
				format: "yyyy-mm",  // 控制显示格式，默认为空，显示小时分钟 
				autoclose: true,
				 weekStart: 1,
				  //startDate: "2014-08-14 10:00",
				 language:  'zh-CN',
				 startView: 3,
				minView: 3,
				maxView: 3,		
				pickerPosition: "bottom-left"
			});
			
			
			/* 2014.10.08 控制年 */
			var nowStr03 =new Date().format('yyyy');
		  	jquery("#startTime03").val(nowStr03);
			jquery("#endTime03").val(nowStr03);
			jquery(".form_datetime03").datetimepicker({
				format: "yyyy",  //控制显示格式，默认为空，显示小时分钟 
				autoclose: true,
				 weekStart: 1,
				  //startDate: "2014-08-14 10:00",
				 language:  'zh-CN',
				  startView: 4,
				minView: 4,
				maxView: 4,	
				pickerPosition: "bottom-left"
			});
			
			/* 2014.11.20 添加采收记录弹窗 收货时间年月日 */
			var nowStr_shsj =new Date().format('yyyy-mm-dd');
		  	jquery("#startTime").val(nowStr_shsj);
			jquery("#endTime").val(nowStr_shsj);
			jquery(".form_datetime_shsj").datetimepicker({
				format: "yyyy-mm-dd",  // 控制显示格式，默认为空，显示小时分钟 
				autoclose: true,
				 weekStart: 1,
				  //startDate: "2014-08-14 10:00",
				 language:  'zh-CN',
				 startView: 3,
				minView: 2,
				maxView: 2,		
				pickerPosition: "bottom-left"
			});
		});
		/* 控制日历的日月年 结束 */
		
		/* 日期选择的单选按钮 开始 */
		jquery(document).ready(function(){
			jquery('input[name=iCheck]').iCheck({
			  checkboxClass: 'icheckbox_minimal-blue',
			  radioClass: 'iradio_minimal-blue',
			  increaseArea: '20%' // optional
			});
			jQuery('#dateType1[type=radio]').on('ifClicked', function(){
			  if(jQuery('li#dayLi').is(':hidden')){
				  jQuery('li#dayLi').show();
				  jQuery('li#monthLi').hide();
				  jQuery('li#yearLi').hide();
			  }else{
				  jQuery('li#dayLi').hide();
				  jQuery('li#monthLi').hide();
				  jQuery('li#yearLi').hide();
			  }
			});
			jQuery('#dateType2[type=radio]').on('ifClicked', function(){
			  if(jQuery('li#monthLi').is(':hidden')){
				  jQuery('li#monthLi').show();
				  jQuery('li#dayLi').hide();
				  jQuery('li#yearLi').hide();
			  }else{
				  jQuery('li#monthLi').hide();
				  jQuery('li#dayLi').hide();
				  jQuery('li#yearLi').hide();
			  }
			});
			jQuery('#dateType3[type=radio]').on('ifClicked', function(){
			  if(jQuery('li#yearLi').is(':hidden')){
				  jQuery('li#yearLi').show();
				  jQuery('li#dayLi').hide();
				  jQuery('li#monthLi').hide();
			  }else{
				  jQuery('li#yearLi').hide();
				  jQuery('li#dayLi').hide();
				  jQuery('li#monthLi').hide();
			  }
			});
		});
	/* 日期选择的单选按钮 结束 */
		
	//]]>

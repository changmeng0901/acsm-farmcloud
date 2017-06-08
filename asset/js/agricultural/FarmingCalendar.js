jQuery(document).ready(function(){
	//搜索输入框获取焦点及失去焦点状态
	jQuery('input.form-control').focus(function(){
		var _val = this.defaultValue;
		if( jQuery(this).val() == _val ){
			jQuery(this).val('');
			jQuery(this).css('color','#333');
		}
	});
	jQuery('input.form-control').blur(function(){
		var _val = this.defaultValue;
		if( jQuery(this).val() == '' ){
			jQuery(this).val( _val );
			jQuery(this).css('color','#b1b1b1');
		}
	});
	//文本区域获取焦点及失去焦点状态
	jQuery('textarea').focus(function(){
		var _val = this.defaultValue;
		if( jQuery(this).val() == _val ){
			jQuery(this).val('');
			jQuery(this).css('color','#333');
		}
	});
	jQuery('textarea').blur(function(){
		var _val = this.defaultValue;
		if( jQuery(this).val() == '' ){
			jQuery(this).val( _val );
			jQuery(this).css('color','#b1b1b1');
		}
	});
	
	jQuery(".form_datetime").datetimepicker({
	    format: "yyyy-mm-dd",  
	    autoclose: true,
	    weekStart: 1,
	   //startDate: "2014-08-14",
	    language:  'zh-CN',
	    startView: 3,
	    minView: 2,
	    maxView: 4,     
	    pickerPosition: "bottom-left"
	});
	
	//工具提示
	jQuery("[data-toggle='tooltip']").tooltip();  
	
	//（种植标准、种植环境）下拉菜单
    jQuery('.selectpicker').selectpicker({
		dropupAuto:false,
	});
	
	//免考核人员
	/*jQuery('#selectFreekh').selectpicker({
		noneSelectedText : "请选择",
		selectedList: 0,
	});*/
	noSelectedTOall();
	
	//未发布、待完成、待考核、已完成状态切换
	jQuery('.st-btns span').click(function(){
		if( jQuery(this).hasClass('icur') ){
			jQuery(this).removeClass('icur');
		}else{
			jQuery(this).addClass('icur');
		}
	});
	
	//是否重复
	jQuery('.readio-blue').click(function(){
		jQuery(this).addClass('icheck').parent('li').siblings().find('.readio-blue').removeClass('icheck');
	});
	
	//点击折叠与展开左侧搜索菜单栏
	jQuery('#foldBtn').click(function(){
		if(jQuery(this).hasClass('fcur')){
			//折叠
			jQuery(this).removeClass('fcur');
			jQuery('#calendarLeft').css('display','none');
		}else{
			//展开
			jQuery(this).addClass('fcur');
			jQuery('#calendarLeft').css('display','table-cell');
		}
	});
	//左侧菜单高度计算，最小为屏幕大小出滚动条
	function filtrateContHeight(){
		var _winhei = jQuery(window).height();
		var _lasthei = _winhei -60- 22-45-68;
		jQuery('#filtrateCont').css('min-height',_lasthei);
	};
	filtrateContHeight();
	//右侧固定折叠菜单随滚动条滚动
	jQuery(window).scroll(function(){
		var _scroll = Number(jQuery(window).scrollTop());
		jQuery('.rfold-menu').css('top',60-_scroll);
	});
	//右侧固定折叠菜单--标题默认折叠效果及点击折叠效果
	jQuery('.rfold-title p').click(function(){
		if(jQuery(this).hasClass('pcur')){
			//展开
			jQuery(this).removeClass('pcur');
			jQuery(this).parent().next('.rfold-content').slideDown(300);
		}else{
			//折叠
			jQuery(this).addClass('pcur');
			jQuery(this).parent().next('.rfold-content').slideUp(300);
		}
	});
	
	//计划参考  列表项折叠效果
	jQuery(document).on('click','.planrefer-content .uptitle',function(){
	//jQuery('.planrefer-content .uptitle').click(function(){
		if(jQuery(this).hasClass('icur')){
			//如果有icur，则说明当前是展开的
			jQuery(this).removeClass('icur');
			jQuery(this).parents('.plan-info-item').find('dd').hide();
		}else{
			//如果没有icur,则说明当前是收起的
			jQuery(this).addClass('icur');
			jQuery(this).parents('.plan-info-item').find('dd').show();
		}
	});
	
	//添加农事计划和添加农事记录tab切换效果
	jQuery('.tab-header li').click(function(){
		jQuery(this).addClass('icur').siblings().removeClass('icur');
		jQuery('.tab-body').eq(jQuery(this).index()).addClass('dis-block').siblings('.tab-body').removeClass('dis-block');
	});
	
	//投入品添加中--点击删除按钮，删除该行添加的投入品信息
	jQuery('.addinputs-table .delete-btn').click(function(){
		jQuery(this).parent().parent('tr').remove();
	});
	
	//考核农事记录--评分效果
	jQuery('.evaluate-stars span').click(function(){
		jQuery('.evaluate-stars span').removeClass('scur');
		jQuery(this).addClass('scur');
		jQuery(this).prevAll().addClass('scur')
	});
	jQuery('.rfold-header i').click(function(){
		jQuery(this).parents('.rfold-menu').animate({'right':'-500px'},500);
	});
	
	//=========================================
	CalendarDate();
	
	
	//审核农事计划
	jQuery(document).on('click','.defined-danger',function(){
		jQuery('#auditPlan').stop().animate({'right':'0'},500).siblings('.rfold-menu').stop().animate({'right':'-500px'},500);
	})
	//考核农事记录
	jQuery(document).on('click','.defined-danger',function(){
		jQuery('#assessRecord').stop().animate({'right':'0'},500).siblings('.rfold-menu').stop().animate({'right':'-500px'},500);
	})
	//完成农事计划
	jQuery(document).on('click','.defined-success',function(){
		jQuery('#completePlan').stop().animate({'right':'0'},500).siblings('.rfold-menu').stop().animate({'right':'-500px'},500);
	})
	
	
	//农事列表按钮
	jQuery('#farmingListBtn').click(function(){
		jQuery('#farmingList').stop().animate({'right':'0'},500).siblings('.rfold-menu').stop().animate({'right':'-500px'},500);
	});
	//点击添加农事按钮
	jQuery('#addFarmBtn').click(function(){
		jQuery('#addFarm').stop().animate({'right':'0'},500).siblings('.rfold-menu').stop().animate({'right':'-500px'},500);
	});
	//查看农事记录
	jQuery('#viewRecordBtn').click(function(){
		jQuery('#viewRecord').stop().animate({'right':'0'},500).siblings('.rfold-menu').stop().animate({'right':'-500px'},500);
	});
	//编辑农事计划
	jQuery('#editPlanBtn').click(function(){
		jQuery('#editPlan').stop().animate({'right':'0'},500).siblings('.rfold-menu').stop().animate({'right':'-500px'},500);
	});
	//周按钮
	jQuery(document).on('click','.fc-agendaWeek-button',function(){
		jQuery('.fc-header-toolbar .fc-center').removeClass('lang-txt');
		jQuery('.fc-header-toolbar .fc-right').removeClass('lang-txt');
	})
	//月按钮
	jQuery(document).on('click','.fc-month-button',function(){
		jQuery('.fc-header-toolbar .fc-center').addClass('lang-txt');
		jQuery('.fc-header-toolbar .fc-right').addClass('lang-txt');
	})
	//==========================================================
	
});

	//
	function noSelectedTOall(){
		jQuery(".filter-option").each(
			function(){
				if(jQuery(this).text() == "无可选择项目"){
					jQuery(this).text('请选择');
				}
			}
		);
	}
	function CalendarDate(){
		var iDate = new Date();
		var iYear = iDate.getFullYear();
		var iMonth = iDate.getMonth()+1;
		var iDay = iDate.getDate();
		if(iMonth<10){
			iMonth = '0'+iMonth
		}
		if(iDay<10){
			iDay = '0'+iDay
		}
		var iTimeAll = iYear+'-'+iMonth+'-'+iDay;
		if(jQuery('.fc-day-top').attr('data-date')==iTimeAll){
			//$(this).find('.fc-day-number').addClass('cur');	
			alert(iTimeAll)
		}
		jQuery('#calendar').empty();
		jQuery('#calendar').fullCalendar({
			//theme: true,
			header: {
				right: 'prev,next',
				center: 'title',
				left: 'agendaWeek,month'
			},
			defaultDate: iTimeAll,
			defaultView: 'agendaWeek',
			locale : 'zh-cn',
			navLinks: true, // can click day/week names to navigate views
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			selectable : false, //是否允许用户通过单击或拖动选择日历中的对象，包括天和时间。
			editable: false,
			events: [
			 		{
						className: 'defined-success',//增加classname
						color: '#90d651',
						allDay  : false,
						title: '点我弹出1的弹出框',
						allDay: true,
						start: '2017-06-01',
						overlap: false,
						//rendering: 'background',
						//url : 'http://www.baidu.com'
					},
					{
						className: 'defined-waring',
						color: '#fdc268',
						title: '使用className:done',
						start: '2017-06-02',
						end: '2017-06-10',
					},
			        {
						className: 'defined-danger',
						color: '#ff7374',
			            id: 5,
			            title: '使用className:defined-danger,点我弹出红色提示',
			            start: '2017-06-03 9:00',
			            end: '2017-06-04 18:00',
			        },
					{
						className: 'defined-default',
						color: '#ccc',
						id: 999,
						title: 'Repeating Event',
						start: '2017-06-05T16:00:00'
					},
					{
						className: 'defined-default',
						color: '#ccc',
						id: 999,
						title: 'Repeating Event',
						start: '2017-06-6T16:00:00'
					},
					{
						className: 'defined-default',
						color: '#ccc',
						title: 'Meeting',
						start: '2017-06-12T10:30:00',
						end: '2017-05-12T12:30:00'
					},
					{
						className: 'defined-default',
						color: '#ccc',
						title: 'Click for Google',
						url: 'http://google.com/',
						start: '2017-06-28'
					}
				],
			monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
			total:{"2017-06-01":"共4项-1项待完成","2017-06-15":"共6项-0项待完成","2017-05-03":"efg"}  //total需要是本月之前的数据，本月数据无效
		});
	}


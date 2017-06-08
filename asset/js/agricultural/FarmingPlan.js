jQuery(document).ready(function(){
	//搜索输入框获取焦点及失去焦点状态
	jQuery('input.form-control').focus(function(){
		var _val = this.defaultValue;
		if( jQuery(this).val() == _val ){
			jQuery(this).val('');
		}
	});
	jQuery('input.form-control').blur(function(){
		var _val = this.defaultValue;
		if( jQuery(this).val() == '' ){
			jQuery(this).val( _val );
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
	jQuery('#selectFreekh').selectpicker({
		noneSelectedText : "请选择",
		selectedList: 0,
	});
	noSelectedTOall();
	
	//农事推送审核功能
	jQuery('#switchOn').bind('click',function(event){
		event.stopPropagation();
		if(jQuery(this).attr('data-on')=='true'){
			//如果开启
			jQuery(this).addClass('icur');
			jQuery(this).attr('data-on','false');
		}else{
			//如果关闭
			jQuery(this).removeClass('icur');
			jQuery(this).attr('data-on','true');
		}
	});
	//当点击设置按钮，则打开设置模态框
	jQuery('#setBtn').bind('click',function(event){
		jQuery('#setModal').show();
		jQuery('#markPushsz').show();
	});
	//当点击设置模态框关闭按钮，则关闭
	jQuery('#setModal .iclose').bind('click',function(event){
		jQuery('#setModal').hide();
		jQuery('#markPushsz').hide();
	});
	//当点击空白处，则关闭设置模态框
	jQuery('#markPushsz').bind('click',function(event){
		jQuery('#setModal').hide();
		jQuery('#markPushsz').hide();
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
	//生产计划  列表项折叠效果
	jQuery(document).on('click','.productplan-content .uptitle',function(){
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
	
	//点击【制定所选】则将左侧勾选的农事计划移至右边
	jQuery('#singleChoice').click(function(){
		alert('制定所选');
	});
	
	//点击【制定全部】则将全部左边农事计划移至右边
	jQuery('#doubleChoice').click(function(){
		var _clone = jQuery('.planrefer-content .base-body').html();
		jQuery('.productplan-content .base-body').html(_clone);
	});
	
	//点击生产计划中的删除按钮，则删除所选项
	jQuery(document).on('click','.plan-info-item .delete-btn',function(){
		jQuery(this).parents('.dd-con').remove();
	});
	
	//一键复制模态框里的，折叠与展开效果
	jQuery('.all-farminfo .ptitle').click(function(){
		if(jQuery(this).parents('dl').hasClass('icur')){
			//如果有icur，则说明当前是展开的
			jQuery(this).parents('dl').removeClass('icur');
		}else{
			//如果没有icur,则说明当前是收起的
			jQuery(this).parents('dl').addClass('icur');
		}
	});
	
	//一键复制模态框中，日期选择则不让出现滚动条滚动，改变后则出现滚动条效果
	jQuery('.all-farminfo .form_datetime input,.all-farminfo .form_datetime .icon-th').click(function(){
		jQuery('#copyModal .mark0').show();
	});
	jQuery(document).on('click','.form_datetime',function(){
		jQuery('#copyModal .mark0').show();
	})
	jQuery('.all-farminfo .form_datetime').datetimepicker().on('changeDate', function(ev) {
		jQuery('#copyModal .mark0').hide();      
    });
    jQuery('#copyModal .mark0').click(function(){
    	jQuery(this).hide();
    });
    jQuery('#copyModal').click(function(){
    	jQuery('#copyModal .mark0').hide();
    });
	
	
	//批量定制模态框中，复选框状态
	jQuery('#customModal .type-check').click(function(){
		if(jQuery(this).attr('data-on')=='true'){
			//如果是true,则为已经选中状态
			jQuery(this).attr('data-on','false');
			jQuery(this).removeClass('icheck');
		}else{
			//如果是false,则为未选中状态
			jQuery(this).attr('data-on','true');
			jQuery(this).addClass('icheck');
		}
	});
	
	//计划参考中--复选框及全选功能
	jQuery('.planrefer-content dt .type-check').click(function(){
		if(jQuery(this).attr('onoff')=='true'){
			//如果是true,则为已经选中状态
			jQuery(this).attr('onoff','false');
			jQuery(this).removeClass('icheck');
			jQuery(this).parent('dt').siblings('dd').find('.type-check').removeClass('icheck');
			jQuery(this).parent('dt').siblings('dd').find('.type-check').attr('onoff','false');
		}else{
			//如果是false,则为未选中状态
			jQuery(this).attr('onoff','true');
			jQuery(this).addClass('icheck');
			jQuery(this).parent('dt').siblings('dd').find('.type-check').addClass('icheck');
			jQuery(this).parent('dt').siblings('dd').find('.type-check').attr('onoff','true');
		}
	});
	jQuery('.planrefer-content dd .type-check').click(function(){
		if(jQuery(this).attr('onoff')=='true'){
			//如果是true,则为已经选中状态
			jQuery(this).attr('onoff','false');
			jQuery(this).removeClass('icheck');
			var totallen = jQuery(this).parents('.plan-info-item').find('dd .type-check').length;
			var ichecklen = jQuery(this).parents('.plan-info-item').find('dd .icheck').length;
			if(ichecklen != totallen){
				jQuery(this).parents('.plan-info-item').find('dt .type-check').removeClass('icheck');
				jQuery(this).parents('.plan-info-item').find('dt .type-check').attr('onoff','false');
			}
		}else{
			//如果是false,则为未选中状态
			jQuery(this).attr('onoff','true');
			jQuery(this).addClass('icheck');
			var totallen = jQuery(this).parents('.plan-info-item').find('dd .type-check').length;
			var ichecklen = jQuery(this).parents('.plan-info-item').find('dd .icheck').length;
			if(ichecklen == totallen){
				jQuery(this).parents('.plan-info-item').find('dt .type-check').addClass('icheck');
				jQuery(this).parents('.plan-info-item').find('dt .type-check').attr('onoff','true');
			}
		}
	});
	
	//投入品modal，全选及取消全选功能
	jQuery('#check-all').click(function(){
		if(jQuery(this).attr('onoff')=='false'){
			//如果是未选中状态
			jQuery(this).attr('onoff','true');
			jQuery(this).addClass('icheck');
			jQuery('#inputs-table .check-item').attr('onoff','true');
			jQuery('#inputs-table .check-item').addClass('icheck');
		}else{
			//如果是选中状态
			jQuery(this).attr('onoff','false');
			jQuery(this).removeClass('icheck');
			jQuery('#inputs-table .check-item').attr('onoff','false');
			jQuery('#inputs-table .check-item').removeClass('icheck');
		}
	});
	jQuery('#inputs-table .check-item').click(function(){
		if(jQuery(this).attr('onoff')=='false'){
			//如果是未选中状态
			jQuery(this).attr('onoff','true');
			jQuery(this).addClass('icheck');
			var totallen = jQuery('#inputs-table .check-item').length;
			var ichecklen = jQuery('#inputs-table .check-item.icheck').length;
			if(ichecklen==totallen){
				jQuery('#check-all').attr('onoff','true');
				jQuery('#check-all').addClass('icheck');
			}
		}else{
			//如果是选中状态
			jQuery(this).attr('onoff','false');
			jQuery(this).removeClass('icheck');
			var totallen = jQuery('#inputs-table .check-item').length;
			var ichecklen = jQuery('#inputs-table .check-item.icheck').length;
			if(ichecklen!=totallen){
				jQuery('#check-all').attr('onoff','false');
				jQuery('#check-all').removeClass('icheck');
			}
		}
	});
	
});

	//
	function noSelectedTOall(){
		jquery(".filter-option").each(
				function(){
					if(jquery(this).text() == "无可选择项目"){
						
						jquery(this).text('请选择');
					}
				}
			);
	}


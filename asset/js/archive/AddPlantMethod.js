function pageInit(){
	//（种植标准、种植环境）下拉菜单
    jQuery('.selectpicker-zzbz,.selectpicker-zzhj').selectpicker({
		dropupAuto:false,
	});
	//（农事分类）下拉菜单
	jQuery('.selectpicker-nsfl').selectpicker({
		dropupAuto:false,
		noneSelectedText : "",
		selectedList: 1
	});
	//（农事操作）下拉菜单
	jQuery('.selectpicker-nscz').selectpicker({
		dropupAuto:false,
		noneSelectedText : "",
	});
	//（农机）下拉菜单
	jQuery('.selectpicker-nj').selectpicker({
		dropupAuto:false,
		noneSelectedText : "",
	});
	//操作工时保留两位小数
	jQuery('.control-czgs').blur(function(){
		var _val = Number(jQuery(this).val());
		_val = _val.toString().match(/^\d+(?:\.\d{0,2})?/); // 输出结果为 2.45
		jQuery(this).val(_val);
	});
	
	//阶段为时间段，格式为(第_天—第_天)，限定两个输入框均只能输入大于0的整数，限定第二个输入的数字不可小于第一个输入的数字
	jQuery('.day-end').blur(function(){
		var sVal=jQuery(this).prev('.day-start').val();
		var eVal=jQuery(this).val();
		if(sVal!="" || eVal!=""){
			var _startval = Number(sVal);
			var _endval = Number(eVal);
			if(sVal==""){
				alert('请填写开始时间！');
			}else if(_endval<=_startval){
				alert('结束时间不能小于开始时间');
				jQuery(this).val(_startval+1);
			}
		}
	});
	jQuery('.farming_img').click(function(){
		showBigImg(this);
		jQuery('body').css('overflow-y','hidden');
		jQuery('.mark_b80').show();
		jQuery('.farmingMage_Magnifier').fadeIn(300);
	});
	jQuery('.MagnifierClose').click(function(){
		jQuery('body').css('overflow-y','auto');
		jQuery('.mark_b80').hide();
		jQuery('.farmingMage_Magnifier').hide();	
	});
}

jQuery(document).ready(function(){
	//搜索输入框获取焦点及失去焦点状态
	/*jQuery('input.form-control').focus(function(){
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
	});*/
	pageInit();
	//表格隔行换色
	jQuery('.tableModel tbody tr').mouseover(function(){
		jQuery(this).addClass('hover');
	});
	jQuery('.tableModel tbody tr').mouseout(function(){
		jQuery(this).removeClass('hover');
	});
	
	//（投入品类型）下拉菜单
	jQuery('.selectpicker-trplx').selectpicker({
		dropupAuto:false,
		noneSelectedText : "",
	});
	//操作工时保留两位小数
	jQuery('.control-czgs').blur(function(){
		var _val = Number(jQuery(this).val());
		_val = _val.toString().match(/^\d+(?:\.\d{0,2})?/); // 输出结果为 2.45
		jQuery(this).val(_val);
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

//种植方法列表中，点击删除图标，则删除此种植方法
function DeletePlantff(obj){
	jQuery(obj).parents('.plantff-tr').remove();
}

//农事要求为输入框，限定maxLength字
function checkInputMaxValue(obj,maxLength){
	var val=jQuery(obj).val().length;
	if(val>maxLength){
		alert("最多输入"+maxLength+"个字符！");
		jQuery(obj).val(jQuery(obj).val().substring(0,maxLength))
	}
}

//校验是否输入的数字,及是正整数
function NumberCheck(obj,num){
	var a = jQuery(obj).val();
	var y = String(a).indexOf(".") + 1;//获取小数点的位置
    var count = String(a).length - y;//获取小数点后的个数
    if(a<0){
		jQuery(obj).val(num);
	}
	if(isNaN(a)){
		alert("只能输入正整数！");
		jQuery(obj).val(num);
		return false;
	}
}

//操作工时为输入框，只能输入数字，保留num位小数，限定不可超过99.9
function MaxnumberCheck(obj,num){
	var a = jQuery(obj).val();
	var y = String(a).indexOf(".") + 1;//获取小数点的位置
    var count =0;//获取小数点后的个数
    if(String(a).indexOf(".")>0){
    	count = String(a).length - y;//获取小数点后的个数
    }
	if(isNaN(a)){
		alert("只能输入数字！");
		jQuery(obj).val("0");
		return false;
	}
	if(a<0){
		alert("最小值为0！");
		jQuery(obj).val("0");
	}else if(a>99.99){
		alert("最大值为99.9！");
		jQuery(obj).val(99.9);
	}else if(count>num){
		alert("只可保留"+num+"位小数！");
		jQuery(obj).val(a.substring(0,y+num));
	}
}
//周期天数
function WeekdaysCheck(obj){
	var a = jQuery(obj).val();
	var y = String(a).indexOf(".") + 1;//获取小数点的位置
    var count = String(a).length - y;//获取小数点后的个数
    if(y > 0) {
    	jQuery(obj).val("0");
    }
	if(isNaN(a)){
		alert("只能输入数字！");
		jQuery(obj).val("0");
		return false;
	}
	if(a<0){
		alert("最小值为0！");
		jQuery(obj).val("0");
		return false;
	}
	if(a>365){
		alert("最大值为365！");
		jQuery(obj).val("365");
		return false;
	}
}

//表格最少要有一行，只有一行是隐藏删除按键
function ToFarminfoTrNum(obj){
	var _num = jQuery('.period-table').find('.item-tr').length;
	if(_num<=1){
		//jQuery('.period-table .item-tr').eq(0).find('.btn_delete').hide();
	}
}

//点击删除图标，删除农事信息下对应的行信息
function DeleteFarminfoTr(obj){
	var tableObj=jQuery(obj).parents('.period-table');
	//点击删除本行
	jQuery(obj).parents('.item-tr').remove();
	resetFarmingIndex(tableObj);//序号重新排序
}
var pushIndex=jQuery("#fallow-period tr").length;
var farmingPushInfo=jQuery("#hidTrInfo tbody").html();
//添加推送记录
function addFarmerInfoTr(obj){
	pushIndex+=1;
	var addTrInfo=farmingPushInfo.replace(/urlname/g,"urlname"+pushIndex);
	var tableObj=jQuery(obj).parents(".period-title").siblings('.period-table');
	jQuery(tableObj).append(addTrInfo);
	pageInit();//下拉框样式加载
	resetFarmingIndex(tableObj);//序号重新排序
}
//添加、删除操作序号变乱，重新排序
function resetFarmingIndex(obj){
	var trLength=jQuery(obj).find("tr").length;
	for(var i=1;i<trLength;i++){
		jQuery(obj).find("tr:eq("+i+") td:eq(0) span").html(i);
}
}

function updateFatherPic(_obj,_url){
	//jQuery('#'+_obj).html("<image src='"+_url+"' width='100px'/><input type='hidden' value='"+_url+"'/>");
	jQuery('#'+_obj).attr('src',_url+"@32h_1e_1c.src");
	jQuery('#'+_obj).attr('val',_url);
}


var classifyObj;//农事分类对象
//切换农事分类
function changeClassify(obj){
	classifyObj=obj;
	getAmRfidList(obj.value);
}
//切换农事分类-更改农事操作内容
function getAmRfidList_next(data){
	var amrfidInfo=eval("("+data+")");
	var farmTypeObj=jQuery(classifyObj).parents("tr").find("td:eq(2) div");
	var selectInfo="<select class='selectpicker selectpicker-nscz'>";
	jQuery(amrfidInfo).each(function(index,val){
		selectInfo+="<option value='"+val.id+"'>"+val.name+"</option>";
	})
	selectInfo+="</select>";
	jQuery(farmTypeObj).html(selectInfo);
	pageInit();
}

//*投入品modal控制
function ResizeModal(){
	var _windowW = jQuery(window).width();
	var _windowH = jQuery(window).height();
	if(_windowW<840){
		jQuery("#addinputsModal .modal-dialog").css({
			'width' : 500
		});
	}else{
		jQuery("#addinputsModal .modal-dialog").css({
			'width' : 830
		});
	}
	if(_windowH<525){
		jQuery("#addinputsModal .modal-dialog").css({
			'height' : 354
		});
		jQuery("#addinputsModal .modal-body").css({
			'height' : 254
		});
	}else{
		jQuery("#addinputsModal .modal-dialog").css({
			'height' : 515
		});
		jQuery("#addinputsModal .modal-body").css({
			'height' : 400
		});
	}
	var _modalW = jQuery("#addinputsModal .modal-dialog").width();
	var _modalH = jQuery("#addinputsModal .modal-dialog").height();
	var _modalL = (_windowW-_modalW)/2;
	var _modalT = (_windowH-_modalH)/2;
	jQuery("#addinputsModal .modal-dialog").css({
		'left' : _modalL,
		'top'  : _modalT,
		'margin-top':'0px',
		'margin-left':'0px'
	});
	//console.log('w:'+_bodyW+'h:'+_windowH+'modalw:'+_modalW+'modalH:'+_modalH)
}
//投入品-----------
//(1)删除投入品
function DeleteOutput(obj,inputsId){
	jQuery(obj).parents('.Output_tr').remove();
	jQuery("#check_"+inputsId).removeClass('icheck');
	//取消全选
	if(jQuery("#mn_checkall").hasClass('icheck')){   		
		jQuery("#mn_checkall").removeClass('icheck');
	}
	resetIndex();  	
}
//添加投入品，由于删除，添加操作序号变乱，重新排序
function resetIndex(){
	var trLength=jQuery("#addInputsTable tr").length;
	for(var i=1;i<trLength;i++){
		jQuery("#addInputsTable tr:eq("+i+") td:eq(0) span").html(i);
}
}
//(2-1)投入品表格复选框，全选功能
function OutputCheckAll(obj,oparents){
	if(jQuery(obj).hasClass('icheck')){
		//取消全选
		jQuery(obj).removeClass('icheck');
		jQuery(oparents).find('td .mn_check').removeClass('icheck');
		//只取消本页的
		var trLength=jQuery("#inputs_table tr").length;
		for(var i=0;i<trLength;i++){
			var inputIds=jQuery("#inputs_table tr:eq("+i+") td:eq(0) input:eq(0)").val();
			jQuery("#addtr_"+inputIds).remove();
		}
		resetIndex();  	
	}else{   		
		//全选时，判断没有选中的添加到投入品，已添加的不在查询
		var inputId="";   		
		var noCheckObj=jQuery("#inputs_table").find('td .mn_check ').not(".icheck");
		var trLength=noCheckObj.length;
		
		for(var i=0;i<trLength;i++){
			inputId=jQuery(noCheckObj).eq(i).siblings("input:eq(0)").val();
			addInput(inputId); 
		} 
		//如果是空，则是没有选中状态,点击后全选
		jQuery(obj).addClass('icheck');
		jQuery(oparents).find('td .mn_check').addClass('icheck');
		//添加多个投入品，获取库存信息
		//jQuery("#login").show();
	}
}
var tableStr="";
//(2-2)如果有一个复选框没有选中，则全选按钮为取消状态，否则相反
function OutputCheck(obj,oparents,oAll,inputsId){
	if(jQuery(obj).hasClass('icheck')){
		//取消全选
		jQuery(obj).removeClass('icheck');
		//如果一个取消，那么全选为取消状态
		jQuery(oAll).removeClass('icheck');
		jQuery('#addtr_'+inputsId).remove();
		resetIndex();  	
	}else{
		jQuery(obj).addClass('icheck');
		//如果是空，则是没有选中状态,点击后选择
		var allNum = jQuery(oparents).find('td .mn_check').length;
		var allLen = jQuery(oparents).find('td .mn_check.icheck').length;
		//alert('allNum:'+allNum+'allLen:'+allLen)
		//如果个数和选中的个数相等，则全选为选中状态
		if(allLen == allNum){
		jQuery(oAll).addClass('icheck');
		}else{
		jQuery(oAll).removeClass('icheck');
		}
		//添加一个投入品，获取库存信息
		jQuery("#login").show();
		addInput(inputsId);    		
	}
}
//添加投入品
function addInput(inputsId){
	var rowNum=jQuery("#addInputsTable tr").length;
	var inputName=jQuery("#trp_"+inputsId+" td:eq(2) p").html();
	var unitName=jQuery("#trp_"+inputsId+" td:eq(3) p").html();
	
	var tableStr="<tr class=\"Output_tr\" id='addtr_"+inputsId+"'>"+
	    	"<td class=\"br_bt br_rt\">"+
		"<input type='hidden' value='"+inputsId+"'/>"+
	    		"<input type='hidden' value='' id='unit_"+inputsId+"'/><span>"+rowNum+"</<span></td>"+
		"<td class=\"br_bt br_rt\"><p class=\"ellipsis\" title='"+inputName+"'>"+inputName+"</p></td>"+
		    "<td class=\"br_bt br_rt\"><p class=\"ellipsis\" title='"+unitName+"'>"+unitName+"</p></td>"+   	
	    	"<td class=\"br_bt br_rt\">"+
	    		"<input class=\"form-control borderno\" type=\"text\"></input>"+
	    	"</td>"+
	    	"<td class=\"br_bt\">"+
	    		"<a href=\"javascript:;\" onclick=\"DeleteOutput(this,"+inputsId+")\">删除</a>"+
	    	"</td>"+
	"</tr>";
	jQuery("#addInputsTable").append(tableStr);		
	jQuery("#login").hide()
}
//(3)获取焦点，失去焦点
function FocusFn(obj,oColor,txt_val){
	if(jQuery(obj).val()==txt_val){
		jQuery(obj).val('');
		jQuery(obj).css('color',oColor)
	}
}
function BlurFn(obj,oColor,txt_val){
	if(jQuery(obj).val()==''){
		jQuery(obj).val(txt_val);
		jQuery(obj).css('color',oColor)
	}
}
//投入品列表信息查询
function searchInputs(pageNum){
	var dataStandard=jQuery("#farmingPush\\:planStandardId").val();	
	var inputType=jQuery("#inputType").val();
	var searchText=jQuery("#searchInputText").val();
	if(searchText=="请输入查询内容"){
		searchText="";
	}
	searchInputsList(inputType,dataStandard,searchText,pageNum);
	jQuery("#login").show();
}
var inputsObj;//点击投入品的对象
function showInputsModal(obj){
	inputsObj=obj;
	jQuery('#inputType').selectpicker('val',2);
	jQuery("#searchInputText").val("");
	searchInputs(1);
	jQuery("#addInputsTable .Output_tr").remove();
	jQuery("#addinputsModal").modal("show");
	setSelectVal();
}
//设置投入品值
function setSelectVal(){
	var inputsInfo=jQuery(inputsObj).siblings(".inputs_info").val();
	if(inputsInfo==""){
		return;
	}
	var data=eval("("+inputsInfo+")");
	var inputsDatas=data.inputsDatas;
	jQuery(inputsDatas).each(function(index,val){
		var tableStr="<tr class=\"Output_tr\" id='addtr_"+val.inputsId+"'>"+
	    	"<td class=\"br_bt br_rt\">"+
			"<input type='hidden' value='"+val.inputsId+"'/>"+
	    		"<input type='hidden' value='' id='unit_"+val.inputsId+"'/><span>"+(index+1)+"</<span></td>"+
			"<td class=\"br_bt br_rt\"><p class=\"ellipsis\" title='"+val.inputName+"'>"+val.inputName+"</p></td>"+
		    "<td class=\"br_bt br_rt\"><p class=\"ellipsis\" title='"+val.unitName+"'>"+val.unitName+"</p></td>"+   	
	    	"<td class=\"br_bt br_rt\">"+
	    		"<input class=\"form-control borderno\" type=\"text\" value='"+val.useNum+"'></input>"+
	    	"</td>"+
	    	"<td class=\"br_bt\">"+
	    		"<a href=\"javascript:;\" onclick=\"DeleteOutput(this,"+val.inputsId+")\">删除</a>"+
	    	"</td>"+
		"</tr>";
		jQuery("#addInputsTable").append(tableStr);
	});
	
}
//翻页
function inputsJump(inputsPageNum){
	searchInputs(inputsPageNum);
}
function searchInputsList_next(){
	var trLength=jQuery("#inputs_table tr").length;
	for(var i=1;i<trLength;i++){
		var inputIds=jQuery("#inputs_table tr:eq("+i+") td:eq(0) input:eq(0)").val();
		if(jQuery("#addtr_"+inputIds).length>0){
			jQuery("#check_"+inputIds).addClass('icheck');
		}
	}
	var allNum = jQuery("#inputs_table").find('td .mn_check').length;
	var allLen = jQuery("#inputs_table").find('td .mn_check.icheck').length;
	//alert('allNum:'+allNum+'allLen:'+allLen)
	//如果个数和选中的个数相等，则全选为选中状态
	if(allLen == allNum && allNum>0){
		jQuery("#mn_checkall").addClass('icheck');
	}else{
		jQuery("#mn_checkall").removeClass('icheck');
	}
	jQuery("#login").hide();
}

//添加投入品提交
function saveInput(){
	var trLength=jQuery("#addInputsTable tr").length;
	if(trLength<=1){
		alert("请选择投入品！");
		return false;
	}
	var inputsName="";
	var inputsRecordStr='{"inputsDatas":[';
 	for(var i=1;i<trLength;i++){   	   	
 		var inputsId=jQuery("#addInputsTable tr:eq("+i+") td:eq(0) input:eq(0)").val();
 		var unitId=jQuery("#addInputsTable tr:eq("+i+") td:eq(0) input:eq(1)").val();
 		var inputName=jQuery("#addInputsTable tr:eq("+i+") td:eq(1) p").html();
 		var unitName=jQuery("#addInputsTable tr:eq("+i+") td:eq(2) p").html();
 		var useNum=jQuery("#addInputsTable tr:eq("+i+") td:eq(3) input:eq(0)").val();
			
 		if(null==useNum || ""==useNum){
 			alert(inputName+"的使用量不能为空！");
 			return false;
 		}else if(!isFloat(useNum)){
 			alert("请输入正确的"+inputName+"使用量！");
 			return false;
 		}else if(parseFloat(useNum)>9999999){
 			alert(inputName+"的使用量不能大于9999999！");
 			return false;
 	   	}
 		inputsRecordStr+= "{'inputsId':'" +inputsId + "','inputName':'"+ inputName +"','unitName':'"+ unitName +"','useNum':'"+ useNum +"'},";	
 		inputsName+=inputName+",";
 	}
 	inputsName=inputsName.substring(0, inputsName.length-1);
 	inputsRecordStr = inputsRecordStr.substring(0, inputsRecordStr.length-1) + ']}';
 	jQuery(inputsObj).siblings(".inputs_name").html(inputsName);
 	jQuery(inputsObj).siblings(".inputs_name").attr("title",inputsName);
 	jQuery(inputsObj).parent().find(".inputs_info").val(inputsRecordStr);
 	jQuery("#addinputsModal").modal("hide");
	return true;
	
}
/* 小数验证 */
function isFloat(value){
	var mny =RegExp(/^([0-9]+(\.?))?[0-9]+$/);
	return mny.test(value);
}
/* 整数验证 */
function checkInt(v){
	var reg = /^[1-9]+[0-9]*]*$/; 
	return reg.test(v);
}
/**
* 推送提交
*/
function checkSubmit(type){
	var pushDatas='{"pushDatas":[';
	var trLength=jQuery("#fallow-period .item-tr").length;
	if(trLength<=0){
		alert("请添加农事信息！");
		return false;
	}
	for(var i=0;i<trLength;i++){
		var trObj=jQuery(".period-table .item-tr:eq("+i+")");
		var saveSource=jQuery("#farmingPush\\:saveSource").val();	
		var dataStandard=jQuery("#farmingPush\\:planStandardId").val();	//种植标准
		var plantEnvId=jQuery("#farmingPush\\:plantEnvId").val();//种植环境
		if(saveSource==1){//专家为正在种植的ID
			dataStandard=jQuery("#farmingPush\\:realPlantStandardId").val();
			plantEnvId=jQuery("#farmingPush\\:realPlantEnvId").val();//种植环境
		}
		
		var periodName=jQuery(trObj).parents(".period-table-box").find(".periodName").val();
		var periodId=jQuery(trObj).parents(".period-table-box").find(".periodId").val();
		var farmingPushId=jQuery(trObj).find("td:eq(0) input").val();//
		var farmTypeId=jQuery(trObj).find("td:eq(2) select").val();
		var farmContent=jQuery(trObj).find("td:eq(3) input").val();
		var workTime=jQuery(trObj).find("td:eq(4) input").val();
		var inputsInfo=jQuery(trObj).find("td:eq(5) input").val();
		if(inputsInfo!=""){
			inputsInfo=inputsInfo.substring(1, inputsInfo.length-1)
		}
		//var imgUrl=jQuery(trObj).find("td:eq(6) input").val();
		var imgUrl=jQuery(trObj).find("td:eq(6) img").attr("val");
		if(typeof(imgUrl)=="undefined"){
			imgUrl="";
		}
		var instrumentName="";
		var instrumentId=jQuery(trObj).find("td:eq(7) select").find("option:selected").val();
		if(instrumentId=="0"){
			instrumentId="";
		}else if(instrumentId=="-1"){
			instrumentName=jQuery(trObj).find("td:eq(7) select").find("option:selected").html();
		}else if(typeof(instrumentId)=="undefined"){
			instrumentId="";
		}
		var periodDays=jQuery(trObj).find("td:eq(8) input").val();
		var beginDays=jQuery(trObj).find("td:eq(9) .day-start").val();
		var endDays=jQuery(trObj).find("td:eq(9) .day-end").val();
		if(farmTypeId==null || farmTypeId==""){
			alert("请选择"+periodName+"的农事操作");
			return false;
		}
		if(workTime==""){
			alert("请填写"+periodName+"的操作工时");
			return false;
		}else if(!isFloat(workTime)){
			alert(periodName+"的操作工时输入错误！");
			return false;
		}
		if(periodDays!="" && !checkInt(periodDays)){
			alert(periodName+"的周期请填写整数！");
			return false;
		}else if(Number(periodDays)>365){
			alert(periodName+"的周期不可大于365！");
			return false;
		}
		if(beginDays!="" && !checkInt(beginDays)){
			alert(periodName+"的阶段开始天请填写正整数！");
			return false;
		}
		if(endDays!=""){
			if(beginDays==""){
				alert("请填写"+periodName+"阶段的开始天！");
				return false;
			}else if(!checkInt(endDays)){
				alert(periodName+"的阶段结束天请填写正整数！");
				return false;
			}
		}
		if(beginDays!="" && endDays!=""){
			var _startval = Number(beginDays);
			var _endval = Number(endDays);
			if(_endval<=_startval){
				alert(periodName+'阶段结束时间不能小于开始时间');
				return false;
			}
		}
		pushDatas+= "{'farmingPushId':'" +farmingPushId + "','periodId':'" +periodId + "','farmTypeId':'"+ farmTypeId +"','farmContent':'"+ farmContent 
		+"','workTime':'"+ workTime +"','imgUrl':'"+ imgUrl +"','instrumentId':'"+ instrumentId+"','instrumentName':'"+ instrumentName
		+"','periodDays':'"+ periodDays +"','beginDays':'"+ beginDays +"','endDays':'"+ endDays +"'";	
		if(inputsInfo!=""){
			pushDatas+=","+inputsInfo;
		}
		pushDatas+="},";
	}
	pushDatas = pushDatas.substring(0, pushDatas.length-1) + ']}';
	jQuery("#farmingPush\\:pushDataInfo").val(pushDatas);
	if(type==1){
		checkPushInfoExist(dataStandard,plantEnvId);//检查是否存在同一种植标准、种植环境的信息
	}
	return true;
}
function checkPushInfoExist_next(msg){
	var addOrUpdate=jQuery("#farmingPush\\:addOrUpdate").val();	
	var pushSource=jQuery("#farmingPush\\:pushSource").val();	
	if(msg!=""){
		alert(msg);
	}else{
		if(addOrUpdate==1 || (addOrUpdate==2 && (pushSource==1 || pushSource==3))){
			jQuery("#farmingPush\\:persist").click();
		}else if(addOrUpdate==2 && pushSource==2){
			jQuery("#farmingPush\\:update").click();
		}
	}
}

/*放大图片*/
function showBigImg(img){
	var imgWidth;
	var imgHeight;
	var src = jQuery(img).attr("src");
	src = src.split("@")[0];
	jQuery("#zoomImage").attr("src", src+"?" + new Date().getTime()).load(function() {
		imgWidth=jQuery("#zoomImage").width();
		imgHeight=jQuery("#zoomImage").height();
		if(imgHeight>=450){
			imgHeight = 450;
		}
		if(imgWidth>=400){
			imgWidth = 400;
		}
		jQuery("#zoomImage").attr('src',src+'@'+imgHeight+'h_'+imgWidth+'w.src');
		jQuery(".farmingMage_Magnifier").css({"margin-top":-(imgHeight/2),"margin-left":-(imgWidth/2)});
	});
}

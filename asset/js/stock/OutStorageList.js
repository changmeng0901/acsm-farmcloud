// JavaScript Document
$(function(){
	var searchStr = $("#excelForm\\:hiddenSearchStr").val();//bug
	if(searchStr != "" ){
		$("#searchStr").val(searchStr);
	}
	//回车搜索事件
	$("#searchStr").keydown(function(e){
		if(e.keyCode==13){
			jquery('#searchButton').trigger("click");
		}
	}); 
	sessionStorage.clear();
});
//分页查询方法
function queryPage(page){
	var storageRoomId = $("#storageRoomId").val();
	var goodsType = $("#goodsType").val();
	var beginTime = $("#beginTime").val();
	var endTime = $("#endTime").val();
	var operaterId = $("#operaterId").val();
	var storageType = $("#storageType").val();
	var searchStr = $("#searchStr").val();
	var pageNum = page;
	var selectSearch = false;
	if(searchStr == "物料名称/批次编号/物料编号"){
		searchStr = "";
	}
	getListByPage(storageRoomId,goodsType,beginTime,endTime,operaterId,storageType,searchStr,pageNum,selectSearch);
}

//数据查询方法
function queryByCond(){
	var storageRoomId = $("#storageRoomId").val();
	var goodsType = $("#goodsType").val();
	var beginTime = $("#beginTime").val();
	var endTime = $("#endTime").val();
	var operaterId = $("#operaterId").val();
	var storageType = $("#storageType").val();
	var searchStr = $("#searchStr").val();
	var selectSearch = true;
	if(beginTime!=""){
		beginTime=beginTime.replace(/\s+/g,"-");
	}
	if(endTime!=""){
		endTime=endTime.replace(/\s+/g,"-");
	}
	if(searchStr == "物料名称/批次编号/物料编号"){
		searchStr = "";
	}
	init(storageRoomId,goodsType,beginTime,endTime,operaterId,storageType,searchStr,selectSearch);
}

//仓库改变联动物料类型并查询数据
function storageChange(){
	var storageRoomId = $("#storageRoomId").val();
	var goodsType = $("#goodsType").val();
	var beginTime = $("#beginTime").val();
	var endTime = $("#endTime").val();
	var operaterId = $("#operaterId").val();
	var storageType = $("#storageType").val();
	var searchStr = $("#searchStr").val();
	var selectSearch = true;
	if(beginTime!=""){
		beginTime=beginTime.replace(/\s+/g,"-");
	}
	if(endTime!=""){
		endTime=endTime.replace(/\s+/g,"-");
	}
	if(searchStr == "物料名称/批次编号/物料编号"){
		searchStr = "";
	}
	changeStorage(storageRoomId,goodsType,beginTime,endTime,operaterId,storageType,searchStr,selectSearch);
}

//改变仓库值得回调方法
function reGoodType(data){
	if(data == ""){
		return;
	}
	 if(data == "1"){
		$("#goodsType").selectpicker("val",1);
	}else if(data == "3"){
		$("#goodsType").selectpicker("val",3);
	}else if(data == "4"){
		$("#goodsType").selectpicker("val",4);
	}else{
		$("#goodsType").selectpicker("val",0);
	}
}

//出库开始时间修改
function beginTimeChange(val){
	var endTime = $("#endTime").val();
	var begin = Date.parse(val);
	var end = Date.parse(endTime);
	if(begin>end){
		alert("开始时间不能大于结束时间");
		$("#beginTime").val("");
	}else{
		queryByCond();
	}
}
//出库结束时间修改
function endTimeChange(val){
	var beginTime = $("#beginTime").val();
	var begin = Date.parse(beginTime);
	var end = Date.parse(val);
	if(begin>end){
		alert("结束时间不能小于开始时间");
		$("#endTime").val("");
	}else{
		queryByCond();
	}
}

function excelClick(){
	var storageRoomId = $("#storageRoomId").val();
	var goodsType = $("#goodsType").val();
	var beginTime = $("#beginTime").val();
	var endTime = $("#endTime").val();
	var operaterId = $("#operaterId").val();
	var storageType = $("#storageType").val();
	var searchStr = $("#searchStr").val();
	if(searchStr == "物料名称/批次编号/物料编号"){
		searchStr = "";
	}
	$("#excelForm\\:hiddenStorageRoomId").val(storageRoomId);
	$("#excelForm\\:hiddenGoodsType").val(goodsType);
	$("#excelForm\\:hiddenBeginTime").val(beginTime);
	$("#excelForm\\:hiddenEndTime").val(endTime);
	$("#excelForm\\:hiddenOperaterId").val(operaterId);
	$("#excelForm\\:hiddenStorageType").val(storageType);
	$("#excelForm\\:hiddenSearchStr").val(searchStr);
	$("#excelForm\\:expCxcel").click();
}
//打印方法跳转
function batchPrintMember(storageChangeFormId){
	if (confirm("确定打印出库明细单!")){
		window.open('/stock/PrintStockRecord.seam?storageChangeFormId='+storageChangeFormId,'newwindow','left=' + (jquery(document).width()-900)/2 + ',top=' + (jquery(document).height()-600)/2 + ',height=600,width=1000,scrollbars=yes,toolbar=no,menubar=no,status=no,location=no');
	} else {
		return false;
	}
}
function checkTime(){
	var start = jQuery("#beginTime").val();
	var end = jQuery("#endTime").val();
	var beginDate = new Date(start);
	var endDate = new Date(end);
	var year = parseInt(start.substring(0,4));
	var month = start.substring(start.indexOf("-")+1,start.indexOf("-")+3);
	month = parseInt(month.replace("0",""));
	var days = Math.floor((endDate.getTime() - beginDate.getTime())/(60*60*24*1000));
	if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12){
		if(days > 31){
			alert("最多可以导出一个月的数据，如想导出多个月的数据，请分步导出!");
		}
	}else if(month == 2){
		if(year%4 ==0){
			if(days > 29){
				alert("最多可以导出一个月的数据，如想导出多个月的数据，请分步导出!");
			}
		}else{
			if(days > 28){
				alert("最多可以导出一个月的数据，如想导出多个月的数据，请分步导出!");
			}
		}
	}else{
		if(days > 30){
			alert("最多可以导出一个月的数据，如想导出多个月的数据，请分步导出!");
		}
	}
}
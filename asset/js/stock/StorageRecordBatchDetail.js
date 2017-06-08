//查询贮藏记录,根据作物名称
function searchGoodsChange(){
	var goodsName = $("#goodsName").val();
	var stoRoomId = $("#stoRoomId").val();
	alert("stoRoomId"+stoRoomId);
	if(goodsName=="请输入物料名称"){
		goodsName = "";
	}
	searchByGoodsName(plantName,stoRoomId);
}
//查询贮藏记录,根据仓库
function changeStoRoomId(){
	var goodsName = "";
	var stoRoomId = $("#stoRoomId").val();
	alert("stoRoomId"+stoRoomId);
	searchByGoodsName(goodsName,stoRoomId);
}
//删除初加工记录,根据ID
/*function delPretreatRecord(obj){
	var pretreatRecordId = $(obj).parent().find("a[class='icon_link del']").attr("id");
	var plantName = $("#plantName").val();
	if(plantName=="请输入作物名称"){
		plantName="";
	}
	var selectPageNum = $("#thisPageId").val();	
	deletePretreatRecord(Number(pretreatRecordId),plantName,Number(selectPageNum));
}*/
/*//查看初加工记录,根据ID
function finPretreatRecord(obj){
	var pretreatRecordId = $(obj).parent().find("a[class='icon_link del']").attr("id");	
	findPretreatRecord(Number(pretreatRecordId));
}
//编辑初加工记录,根据ID
function updPretreatRecord(obj){
	var pretreatRecordId = $(obj).parent().find("a[class='icon_link del']").attr("id");
	updatePretreatRecord(Number(pretreatRecordId));
}*/
/*//改变仓库联动改变物料类型
function changeStorageRoom(){
	var storageRoomId = $("#storageRoom").val();
	var goodsType = $("#goodsType").val();
	var operator = $("#operator").val();
	var goodsSource = $("#goodsSource").val();
	var code = $("#code").val();
	var selectSearch = true;
	if(code == "物料名称/批次编号/物料编号"){
		code = "";
	}
	queryByStorageRoomId(storageRoomId,goodsType,operator,goodsSource,code,selectSearch);
}
//改变仓库值得回调方法
function refreshGoodType(data){
	if(data == ""){
		return;
	}
	if(data == "-1"){
		$("#goodsType").selectpicker("val",-1);
	}else if(data == "1"){
		$("#goodsType").selectpicker("val",1);
	}else if(data == "3"){
		$("#goodsType").selectpicker("val",3);
	}else if(data == "4"){
		$("#goodsType").selectpicker("val",4);
	}else{
		$("#goodsType").selectpicker("val",0);
	}
}

//改变其它列表值得回调方法
function selectCe(){
	var storageRoomId = $("#storageRoom").val();
	var goodsType = $("#goodsType").val();
	var operator = $("#operator").val();
	var goodsSource = $("#goodsSource").val();
	var code = $("#code").val();
	var selectSearch = true;
	if(code == "物料名称/批次编号/物料编号"){
		code = "";
	}
	queryResultFind(storageRoomId,goodsType,operator,goodsSource,code,selectSearch);
}

//导出表格
function exportE(){
	var storageRoomId = $("#storageRoom").val();
	var goodsType = $("#goodsType").val();
	var operator = $("#operator").val();
	var goodsSource = $("#goodsSource").val();
	var code = $("#code").val();
	var page = $("#thisPageId").val();
	var selectSearch = false;
	if(code == "物料名称/批次编号/物料编号"){
		code = "";
	}
	exportExcel(storageRoomId,goodsType,operator,goodsSource,code,page,selectSearch);
}

//分页查询方法
function queryPage(page){
	var storageRoomId = $("#storageRoom").val();
	var goodsType = $("#goodsType").val();
	var operator = $("#operator").val();
	var goodsSource = $("#goodsSource").val();
	var code = $("#code").val();
	var pageNum = page;
	var selectSearch = false;
	if(code == "物料名称/批次编号/物料编号"){
		code = "";
	}
	getInfoByPage(storageRoomId,goodsType,operator,goodsSource,code,pageNum,selectSearch);
}*/
$(function(){
	//回车搜索事件
	$("#searchStr").keydown(function(e){
		if(e.keyCode==13){
			jquery('#searchButton').trigger("click");
		}
	}); 
	// (1)获取焦点和失去焦点状态
    $('#searchStr').focus(function(){
        var txt_value = $(this).val();
        if(txt_value=="物料名称/批次编号/物料编号"){
            $(this).val("");    
        };  
    });
    $('#searchStr').blur(function(){
        var txt_value = $(this).val();
        if(txt_value==""){
            $(this).val('物料名称/批次编号/物料编号'); 
        };  
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

//打印
/*function batchPrintMember(inventoryId){
	if (confirm("确定打印入库明细单!")){
		window.open('/stock/InventoryRecordPrint.seam?inventoryId='+inventoryId,'newwindow','left=' + (jquery(document).width()-900)/2 + ',top=' + (jquery(document).height()-600)/2 + ',height=600,width=1000,scrollbars=yes,toolbar=no,menubar=no,status=no,location=no');
	} else {
		return false;
	}
}
*/
//打印
function batchPrintMember(inventoryId){
	if (confirm("确定打印入库明细单!")){
		window.open('/stock/InStorageRecordPrint.seam?storageChangeFormId='+inventoryId,'newwindow','left=' + (jquery(document).width()-900)/2 + ',top=' + (jquery(document).height()-600)/2 + ',height=600,width=1000,scrollbars=yes,toolbar=no,menubar=no,status=no,location=no');
	} else {
		return false;
	}
}
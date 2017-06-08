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
//搜索条件触发搜索
function searchByCondition(){
	var storageRoom = $("#storageRoom").val();
	var goodsType = $("#goodsType").val();
	var countStartTime = $("#countStartTime").val();
	var countEndTime = $("#countEndTime").val();
	var operator = $("#operator").val();
	var searchStr = $("#searchStr").val();
	if(searchStr=="物料名称/批次编号/物料编号"){
		searchStr="";
	}
	queryResultFind(goodsType,storageRoom,countStartTime,countEndTime,operator,searchStr);
}

//分页查询方法
function queryPage(page){
	var storageRoom = $("#storageRoom").val();
	var goodsType = $("#goodsType").val();
	var countStartTime = $("#countStartTime").val();
	var countEndTime = $("#countEndTime").val();
	var operator = $("#operator").val();
	var searchStr = $("#searchStr").val();
	if(searchStr=="物料名称/批次编号/物料编号"){
		searchStr="";
	}
	var pageNum = page;
	pageFind(goodsType,storageRoom,countStartTime,countEndTime,operator,searchStr,pageNum);
}

//打印
function batchPrintMember(inventoryId){
	if (confirm("确定打印盘点信息单!")){
		window.open('/stock/InventoryRecordPrint.seam?inventoryId='+inventoryId,'newwindow','left=' + (jquery(document).width()-900)/2 + ',top=' + (jquery(document).height()-600)/2 + ',height=600,width=1000,scrollbars=yes,toolbar=no,menubar=no,status=no,location=no');
	} else {
		return false;
	}
}

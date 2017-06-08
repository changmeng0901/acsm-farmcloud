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
function outStorageChange(){
	var outStorageRoom = $("#outStorageRoom").val();
	var inStorageRoom = $("#inStorageRoom").val();
	refreshOutStorage(outStorageRoom,inStorageRoom);
}

//调入仓库改变 
function inStorageChange(){
	var outStorageRoom = $("#outStorageRoom").val();
	var inStorageRoom = $("#inStorageRoom").val();
	refreshInStorage(outStorageRoom,inStorageRoom);
}

//回调方法
function complete(){
	$('.selectpicker').selectpicker();
	search();
}

//搜索方法
function search(){
	var  outStorageRoom = $("#outStorageRoom").val();
	var inStorageRoom = $("#inStorageRoom").val();
	var beginTime = $("#beginTime").val();
	var endTime = $("#endTime").val();
	var operator = $("#operaterId").val();
	var searchStr = $("#searchStr").val();
	if(searchStr == "物料名称/批次编号/物料编号"){
		searchStr = "";
	}
	queryResult(outStorageRoom,inStorageRoom,beginTime,endTime,operator,searchStr);
}

//分页查询
function queryPage(page){
	var  outStorageRoom = $("#outStorageRoom").val();
	var inStorageRoom = $("#inStorageRoom").val();
	var beginTime = $("#beginTime").val();
	var endTime = $("#endTime").val();
	var operator = $("#operaterId").val();
	var searchStr = $("#searchStr").val();
	if(searchStr == "物料名称/批次编号/物料编号"){
		searchStr = "";
	}
	var pageNum = page;
	pageFind(outStorageRoom,inStorageRoom,beginTime,endTime,operator,searchStr,pageNum);
}


//打印
function batchPrintMember(inventoryId){
	if (confirm("确定打印调拨记录单!")){
		window.open('/stock/AllocationRecordPrint.seam?transferId='+inventoryId,'newwindow','left=' + (jquery(document).width()-900)/2 + ',top=' + (jquery(document).height()-600)/2 + ',height=600,width=1000,scrollbars=yes,toolbar=no,menubar=no,status=no,location=no');
	} else {
		return false;
	}
}
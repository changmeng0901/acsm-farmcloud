// (1)获取焦点和失去焦点状态
    $('#searchCode').focus(function(){
        var txt_value = $(this).val();
        if(txt_value=="请输入批次编号"){
            $(this).val("");    
        };  
    });
    $('#searchCode').blur(function(){
        var txt_value = $(this).val();
        if(txt_value==""){
            $(this).val('请输入批次编号'); 
        };  
    });

//下拉列表改变
function changeStorage(){
	var storageRoomId = $("#storageRoom").val();
	var searchCode = $("#searchCode").val();
	if(searchCode=="请输入批次编号"){
		searchCode="";
	}
	var isSearch = true;
	queryDetailsFind(storageRoomId,searchCode,isSearch);
}

//分页时间
function changePage(page){
	var storageRoomId = $("#storageRoom").val();
	var searchCode = $("#searchCode").val();
	if(searchCode=="请输入批次编号"){
		searchCode="";
	}
	var isSearch = false;
	detailPageFind(storageRoomId,searchCode,isSearch,page);
}

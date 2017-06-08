$(function(){
	//回车搜索事件
	$("#searchStr").keydown(function(e){
		if(e.keyCode==13){
			jquery('#searchButton').trigger("click");
		}
	});
	sessionStorage.clear();
	$('input[class="iCheck"]').iCheck({
		  checkboxClass: 'icheckbox_minimal-blue'
		});
	jQuery('#allCheck').on("ifClicked", function(event){
		if($(this).is(':checked')){
			$("input[name='commentCheck']").iCheck("uncheck"); 
		}else{
			$("input[name='commentCheck']").iCheck("check"); 
		}
	});
});
function goodsTypeChange(){
	var goodsType=$("#goodsType").val();
	var storageRoom = $("#storageRoom").val();
	var expiration = $("#expiration").val();
	var searchStr = $("#searchStr").val();
	queryByGoodsType(goodsType,storageRoom,expiration,searchStr);
}

function conditionSearch(){
	var goodsType=$("#goodsType").val();
	var storageRoom = $("#storageRoom").val();
	var expiration = $("#expiration").val();
	var searchStr = $("#searchStr").val();
	queryResultFind(goodsType,storageRoom,expiration,searchStr);
}

function refresh(){
	windowHeight();
  $('.selectpicker').selectpicker(); 
  $('input[class="iCheck"]').iCheck({
	  checkboxClass: 'icheckbox_minimal-blue'
	});
}


//分页查询方法
function queryPage(page){
	var goodsType=$("#goodsType").val();
	var storageRoom = $("#storageRoom").val();
	var expiration = $("#expiration").val();
	var searchStr = $("#searchStr").val();
	var pageNum = page;
	pageFind(goodsType,storageRoom,expiration,searchStr,pageNum);
}


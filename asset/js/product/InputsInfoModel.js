function serach(){
	var barcodeSerachParam=$("#searchStr").val();
	if(barcodeSerachParam=='请输入物料编号/物料名称'){
		barcodeSerachParam="";
	}
	findMaterial(barcodeSerachParam);
}
//分页查询方法
function queryPage(page){
	var barcodeSerachParam = $("#searchStr").val();
	var barcodePageNum = page;
	if(barcodeSerachParam == "请输入物料编号/物料名称"){
		barcodeSerachParam = "";
	}
	getListByPage(barcodeSerachParam,barcodePageNum);
}
//选择物料弹出框搜索或分页回调
function findMaterialHd(obj){
	if(obj!=null && obj!=""){
		var val=$("#searchStr").val(obj);
	}
}
//物料选择页面列表中复选框变动
function checkBoxChange(obj){
	var temp = "";
	$("input[name='goodsCheck']:checkbox:checked").each(function(){
		temp += $(this).val() + ",";
	});
	var orderCheckNum = temp.split(",");
	var orderNum = $("input[name='goodsCheck']").length;
	if (orderNum == orderCheckNum.length - 1) {
		$("input[name='goodsCheckAll']").iCheck("check"); 
	}else {
		$("input[name='goodsCheckAll']").iCheck("uncheck"); 
	}
}	
//物料选择页面全选复选框变动
function checkAllChange(obj){
	if (obj.checked) {
		$("input[name='goodsCheck']").iCheck("check"); 
	} else {
		$("input[name='goodsCheck']").iCheck("uncheck"); 
	}
}
function nextPrint(){
	//复选框选中的数据
	var printGoodsIds = "";
	jquery("input[name='goodsCheck']:checkbox:checked").each(function(){
		printGoodsIds += (this.value + ",");
	});
	if(printGoodsIds!=""){
		printGoodsIds = printGoodsIds.substring(0, printGoodsIds.length - 1);
		print(printGoodsIds);
	}
	else{
		alert("请您勾选要打印的投入品！");
	}
}
function sorting(){
	jquery("#AddMaterial").modal('hide');
	jquery("#modal_level").modal('show');
}
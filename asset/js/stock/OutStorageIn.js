$(".form_datetime_second").datetimepicker({
	   		format: "yyyy-mm-dd hh:ii",  
	   		autoclose: true,
	   		weekStart: 1,
	   		language:  'zh-CN',	
	   		pickerPosition: "bottom-left"
});
//添加商品
function additional1(index){
	var leng = $("#tbr").find("tr").length-2;
	var priceArr = ""; 
	var countArr = ""; 
	var expireArr = "";
	for(var i=0; i<leng; i++){
		var price = $('#saveFrom\\:bb\\:' + i +'\\:goodsPrice').val();
		var count = $('#saveFrom\\:bb\\:' + i +'\\:numMaober').val();
		var expire = $('#saveFrom\\:bb\\:' + i +'\\:baozhiqi').val();
		priceArr += price + '|';
		countArr += count + '|';
		expireArr += expire + '|';
	}
	var goodsInfoId = $("#saveFrom\\:bb\\:" + index + "\\:goodsName").val();
	additional(priceArr,expireArr,countArr,index,goodsInfoId);
}
//删除商品信息
function delProduct(index){
	var leng = $("#tbr").find("tr").length-2;
	var yuanliaoid = $('#saveFrom\\:bb\\:' + index +'\\:yuanliaoid').val();
	var flag = 0;
	for(var k=0; k<leng; k++){
		var newYuanliaoid = $('#saveFrom\\:bb\\:' + k +'\\:yuanliaoid').val();
		if(yuanliaoid == newYuanliaoid){
			flag += 1;
		}
	}
	if(flag <= 1){
		alert("该商品不可以删除！");
		return;
	}
	if(confirm('确定删除吗？')){
		var priceArr = ""; 
		var countArr = ""; 
		var expireArr = "";
		for(var i=0; i<leng; i++){
			var price = $('#saveFrom\\:bb\\:' + i +'\\:goodsPrice').val();
			var count = $('#saveFrom\\:bb\\:' + i +'\\:numMaober').val();
			var expire = $('#saveFrom\\:bb\\:' + i +'\\:baozhiqi').val();
			priceArr += price + '|';
			countArr += count + '|';
			expireArr += expire + '|';
		}
		delOneProduct(priceArr,expireArr,countArr,index);
	}	
//变更商品信息
	function changeGoodsInfo1(index){
		var goodsInfoId = $("#saveFrom\\:bb\\:" + index + "\\:goodsName").val();
		changeGoodsInfo(index,goodsInfoId);
	}
}
//商品入库信息增删改后回调方法
function jisuan(data){
	jQuery('.selectpicker').selectpicker();
	var leng = jquery("#tbr").find("tr").length-2;
	for(var i=0; i<leng; i++){
		var price = jquery('#saveFrom\\:bb\\:' + i +'\\:goodsPrice').val();
		var count = jquery('#saveFrom\\:bb\\:' + i +'\\:numMaober').val();
		jquery("#totalGoodsPrice"+i).text(Number(price * count).toFixed(2));
	}
}
//商品入库 验证
function submitSave(){
	var storageDate = jquery("#inStorageTime").val();
	if(!storageDate){
		alert("请选择入库时间");
		return false;
	}
	var rukuliang = new Array();
	jquery("._number").each(function(i,e){
		rukuliang[i] = this.value;
		} 
	);
	for(var k=0; k<rukuliang.length; k++){
		if(rukuliang[k] == 0.0){
			alert("入库量不能为0");
			return false;
		}
	}
	var baozhiqi = new Array();
	jquery("._expire").each(function(i,e){
		baozhiqi[i] = this.value;
		} 
	);
	for(var k=0; k<baozhiqi.length; k++){
		if(baozhiqi[k] == 0.0){
			alert("保质期不能为0");
			return false;
		}
	}
	var leng1 = jquery("#tbr1").find("tr").length-1;
	var noProduct = "";
	for(var i=0; i<leng1; i++){//shangpindelete
		var shangpinid = jquery('#xx\\:' + i +'\\:shangpinid').val();
		var shangpindelete = jquery('#xx\\:' + i +'\\:shangpindelete').val();
		var wuliaoname = jquery('#wuliaoname' + i).text();
		if(shangpinid == null || shangpinid == "" || shangpindelete == 'true'){
			noProduct += wuliaoname + ',';
		}
	}
	noProduct = noProduct.substr(0,noProduct.length-1);
	if(noProduct != "" && noProduct.length > 0){
		alert("商品信息中没有查询到" + noProduct + "原料构成的商品，请在商品信息中添加后操作！");
		return false;
	}
	var commentArea = jquery("#commentArea").val();
	if(commentArea.length >500){
		alert("备注过长！不可以超过500个字符！");
		return false;
	}
	var storageRoomId = jquery('select[name="storageRoomId"]').val();
    if ("org.jboss.seam.ui.NoSelectionConverter.noSelectionValue" == storageRoomId){
    	alert("请选择库房....");
		return false;
	}
    var storageType = jquery('select[name="storageType"]').val();
    if ("org.jboss.seam.ui.NoSelectionConverter.noSelectionValue" == storageType){
    	alert("请选择入库类型....");
		return false;
	}
	var operaterValue = jquery("#operater").val();
	jquery("#saveFrom\\:storageRoomIdHidden").val(storageRoomId);
	jquery("#saveFrom\\:storageTypeHidden").val(storageType);
	jquery("#saveFrom\\:storageDateHidden").val(storageDate);
	jquery("#saveFrom\\:commentHidden").val(commentArea); 
	if(operaterValue == ''){
		alert("经办人不能为空!");
		return false;
	}else{
		jquery("#saveFrom\\:operaterHidden").val(operaterValue);
	}
	return true;
}
//商品入库小计计算
function getTotalPrice(index){
	var num = $("#saveFrom\\:bb\\:"+index+"\\:numMaober").val();
	var price = $("#saveFrom\\:bb\\:"+index+"\\:goodsPrice").val();
	var totalPrice = parseFloat(num) * parseFloat(price);
	$("#totalGoodsPrice"+index).html(totalPrice);
}
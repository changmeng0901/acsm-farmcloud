
$(function(){
	//默认给定盘点时间为当前日期
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth()+1;
	if(month >= 1 && month <=9){
		month = "0" + month;
	}
	var strDate = date.getDate();
	if(strDate >=0 && strDate <=9){
		strDate ="0"+strDate;
	}
	var minutes = date.getMinutes();
	if(minutes >=0 && minutes <=9){
		minutes ="0"+minutes;
	}
	var currentDate = date.getFullYear() + seperator1 + month + seperator1 + strDate +" " + date.getHours() + seperator2 + minutes;
	$("#inStorageTime").val(currentDate);
	var leng = $("#tbr").find("tr").length-1;
	for(var i=0; i<leng; i++){
		var price = $('#saveFrom\\:bb\\:' + i +'\\:goodsPrice').val();
		var count = $('#saveFrom\\:bb\\:' + i +'\\:numMaober').val();
		$("#totalGoodsPrice"+i).text(Number(price * count).toFixed(2));
	}
	
	
});
//商品入库添加商品
function additional1(index){
	var leng = $("#tbr").find("tr").length-1;
	var priceArr = ""; 
	var countArr = ""; 
	var expireArr = "";
	var totalWeightArr = "";
	var oweBatchValArr = "";
	var isUp = $('#isUpId').val();
	for(var i=0; i<leng; i++){
		var price = $('#saveFrom\\:bb\\:' + i +'\\:goodsPrice').val();
		var count = $('#saveFrom\\:bb\\:' + i +'\\:numMaober').val();
		var expire = $('#saveFrom\\:bb\\:' + i +'\\:baozhiqi').val();
		var totalWeight = $('#saveFrom\\:bb\\:' + i +'\\:totalWeighTd').val();
		if(isUp=="n"){
			var oweBatch = $('#batchSel_' + i).val();	
			oweBatchValArr += oweBatch + '|';
		}
		priceArr += price + '|';
		countArr += count + '|';
		expireArr += expire + '|';
		totalWeightArr += totalWeight + '|';
	}
	var goodsInfoId = $("#saveFrom\\:bb\\:" + index + "\\:goodsName").val();
	var goodsBatchId=$("#saveFrom\\:bb\\:" + index + "\\:goodsbatchid").val();
	if(isUp=="n"){
		additional(priceArr,expireArr,countArr,totalWeightArr,index,goodsInfoId,goodsBatchId,oweBatchValArr,isUp);
	}else{
		additional(priceArr,expireArr,countArr,totalWeightArr,index,goodsInfoId,goodsBatchId,isUp);
	}
	
}
//商品入库修改商品信息
function changeGoodsInfo1(index){
	var leng = $("#tbr").find("tr").length-1;
	var goodsInfoId = $("#saveFrom\\:bb\\:" + index + "\\:goodsName").val();
	var goodsBatchId=$("#saveFrom\\:bb\\:" + index + "\\:goodsbatchid").val();
	var isUp = $('#isUpId').val();
	if(isUp=="n"){
		var oweBatchValArr = "";
		for(var i=0; i<leng; i++){
			oweBatchValArr += oweBatch + '|';
		}
		changeGoodsInfo(index,goodsInfoId,goodsBatchId,oweBatchValArr);	
	}else{
		changeGoodsInfo(index,goodsInfoId,goodsBatchId);	
	}
}
//商品入库审核删除商品信息
function delProduct(index){
	var leng = $("#tbr").find("tr").length-1;
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
		var oweBatchArr = "";
		for(var i=0; i<leng; i++){
			var price = $('#saveFrom\\:bb\\:' + i +'\\:goodsPrice').val();
			var count = $('#saveFrom\\:bb\\:' + i +'\\:numMaober').val();
			var expire = $('#saveFrom\\:bb\\:' + i +'\\:baozhiqi').val();
			var oweBatch = $('#batchSel_' + i).val();
			priceArr += price + '|';
			countArr += count + '|';
			expireArr += expire + '|';
			oweBatchArr += oweBatch + '|';
		}
		delOneProduct(priceArr,expireArr,countArr,index,oweBatchArr);
	}	
}

//商品审核入库验证
//商品入库 验证
function submitSave(){
	var storageDate = $("#inStorageTime").val();
	var inStorageDate = new Date(Date.parse(storageDate.replace(/-/g, "/"))); 
	if(!storageDate){
		alert("请选择入库时间");
		return false;
	}
	if(inStorageDate>new Date()){
		alert("入库时间不能大于当前时间");
		return ;
	}
	var rukuliang = new Array();
	$("._number").each(function(i,e){
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
	$("._expire").each(function(i,e){
		baozhiqi[i] = this.value;
		} 
	);
	for(var k=0; k<baozhiqi.length; k++){
		if(baozhiqi[k] == 0.0){
			alert("保质期不能为0");
			return false;
		}
	}
	//var leng = $("#tbr").find("tr").length-2;
	var leng1 = $("#tbr1").find("tr").length-1;
	var noProduct = "";
	for(var i=0; i<leng1; i++){
		var shangpinid = $('#xx\\:' + i +'\\:shangpinid').val();
		var shangpin="";
		var deleted="";
		if(shangpinid!=""){
			var arr=shangpinid.split("@@");
			shangpin=arr[0];
			deleted=arr[1];
		}
		var wuliaoname = $('#wuliaoname' + i).text();
		if(shangpin == null || shangpin == "" || deleted == '1'){
			noProduct += wuliaoname + ',';
		}
	}
	noProduct = noProduct.substr(0,noProduct.length-1);
	if(noProduct != "" && noProduct.length > 0){
		alert("商品信息中没有查询到" + noProduct + "原料构成的商品，请在商品信息中添加后操作！");
		return false;
	}
	var commentArea = $("#notice").val();
	if(commentArea!="" && commentArea.length >500){
		alert("备注过长！不可以超过500个字符！");
		return false;
	}
	var roomId = $('select[name="roomId"]').val();
    if ("org.jboss.seam.ui.NoSelectionConverter.noSelectionValue" == roomId){
    	alert("请选择库房....");
		return false;
	}
    var psTypeId = $('select[name="psTypeId"]').val();
    if ("org.jboss.seam.ui.NoSelectionConverter.noSelectionValue" == psTypeId){
    	alert("请选择入库类型....");
		return false;
	}
	var farmInfoId = $("#farmInfoId").val();

	$("#saveFrom\\:storageRoomIdHidden").val(roomId);
	$("#saveFrom\\:storageTypeHidden").val(psTypeId);
	$("#saveFrom\\:storageDateHidden").val(storageDate);
	$("#saveFrom\\:noticHidden").val(commentArea); 
	if(farmInfoId == ''){
		alert("经办人不能为空!");
		return false;
	}else{
		$("#saveFrom\\:operaterHidden").val(farmInfoId);
	}
	return true;
}

//商品信息改变回调
function spHd(data){
	$('.selectpicker').selectpicker();
	var leng = jquery("#tbr").find("tr").length-1;
	for(var i=0; i<leng; i++){
		var price = $('#saveFrom\\:bb\\:' + i +'\\:goodsPrice').val();
		var count = $('#saveFrom\\:bb\\:' + i +'\\:numMaober').val();
		$("#totalGoodsPrice"+i).text(Number(price * count).toFixed(2));
	}
	//负库存
	if( null != data && null != data.oweBatchVal){
       	var oweBatchArr = data.oweBatchVal;
       	for(var i=0; i< oweBatchArr.length; i++){
           	var oweBatch = oweBatchArr[i];
			var index = oweBatch.index;
			var val = oweBatch.val + "";
			if(val.indexOf(",") > 0){
				var batchValArr = val.split(",");
				$("#batchSel_" + index).selectpicker("val",batchValArr);
			}else{
				$("#batchSel_" + index).selectpicker("val",Number(val));
			}
        }
   	}
}


function priceblur(index){
	var price = $('#saveFrom\\:bb\\:' + index +'\\:goodsPrice').val();
	var count = $('#saveFrom\\:bb\\:' + index +'\\:numMaober').val();
	var totalPrice = Number(price * count).toFixed(2);
	$('#saveFrom\\:bb\\:' + index +'\\:goodsPrice').parent().next().find("span").html(totalPrice);
}
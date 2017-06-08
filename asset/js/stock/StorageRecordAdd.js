//添加模式
function addModel(obj){
	var stoRoomId="-1";
	var goodsId = "-2";
	if(obj=="addModel0"){
		$("#saveFrom\\:addModelIdHid").val("0");
		//隐藏物料多选框		
		$("#goodsListPanelM").css("display","none");
		//显示物料单选框
		$("#goodsListPanel").css("display","");
		//显示批次多选框
		$("#batchSelectLiId").css("display","");
		searchGoodsListByStorageIdO(stoRoomId);/*物料数据清空*/
	}
	else{
		$("#saveFrom\\:addModelIdHid").val("1");
		//隐藏物料单选框
		$("#goodsListPanel").css("display","none");
		//显示物料多选框
		$("#goodsListPanelM").css("display","");
		//隐藏批次多选框
		$("#batchSelectLiId").css("display","none");
		searchGoodsListByStorageIdM(stoRoomId);/*物料数据清空*/
	}
	/*仓库设置为请选择	*/
	jquery("#stoRoomSelectId").selectpicker("val","请选择");
	/*批次数据清空*/
	searchBatchListByGoodsId(stoRoomId,goodsId);	
}
//选择仓库
function changeStoRoomId(id){
	var stoRoomId = $("#"+id).val();
	if(stoRoomId==null||stoRoomId ==""||stoRoomId=="请选择"){
		stoRoomId = "-1";
	}
	if($("#saveFrom\\:addModelIdHid").val()=="0"){
		searchGoodsListByStorageIdO(stoRoomId);
	}
	else{
		searchGoodsListByStorageIdM(stoRoomId);
		jquery("#goodsInfoSelectMId").selectpicker("val","请选择");
	}
	/*清空批次数据*/
	stoRoomId = "-1";
	var goodsId = "-2";
	searchBatchListByGoodsId(stoRoomId,goodsId);
}
//选择物料
function changeGoodsInfoId(id){
	var stoRoomId = $("#stoRoomSelectId").val();
	if(stoRoomId==null||stoRoomId ==""||stoRoomId=="请选择"){
		stoRoomId = "-1";
	}
	var goodsId = $("#"+id).val();
	if(goodsId==null||goodsId==""||goodsId=="请选择"){
		goodsId = "-2";
	}
	searchBatchListByGoodsId(stoRoomId,goodsId);
}
//养护方法
function maintainMethodChange(id){
	var maintainMethod = $("#"+id).val();
	if(maintainMethod==null||maintainMethod==""||maintainMethod=="请选择"||maintainMethod=="无可选择项目"){
		$("#Pest").css("display","none");
		$("#Moisture").css("display","none");
		$("#otherMethod").css("display","none");
	}
	else{
	    if(maintainMethod.indexOf("防虫") > -1 ){
	    	$("#Pest").css("display","");
	    }
	    else{
	    	$("#Pest").css("display","none");
	    }
	    if(maintainMethod.indexOf("吸潮") > -1 ){
	    	$("#Moisture").css("display","");
	    }
	    else{
	    	$("#Moisture").css("display","none");
	    }
	    if(maintainMethod.indexOf("其它") > -1 ){
	    	$("#otherMethod").css("display","");
	    } 
	    else{
	    	$("#otherMethod").css("display","none");
	    }
	}
}
function inputTextareaChange(id){
	var getValue = $("#saveFrom\\:"+id).val();
	if(getValue!=null&&trim(getValue)!=""){
		if(getValue.length>200){
			$("#saveFrom\\:"+id).val(getValue.substring(0,200));
		}
	}
}
//保存
function mySubSave(){
	var addOrUpdate = $("#addOrUpdate").val();//添加或编辑	
	if(addOrUpdate=="add"){
		var addModel = $("#saveFrom\\:addModelIdHid").val();//添加模式
		if(addModel==null||addModel==""){
			$("#saveFrom\\:addModelIdHid").val("0");
		}
		
		var stoRoomSelect= $("#stoRoomSelectId").val();//仓库
		if(stoRoomSelect==null||stoRoomSelect==""||stoRoomSelect=="请选择"){
			alert("请选择仓库！");
			return false;
		}
		$("#saveFrom\\:stoRoomSelectIdHid").val(stoRoomSelect);
		if($("#saveFrom\\:addModelIdHid").val()=="0"){
			var goodsInfoSelectOne = $("#goodsInfoSelectId").val();//单选物料
			if(goodsInfoSelectOne==null||goodsInfoSelectOne==""||goodsInfoSelectOne=="请选择"){
				alert("请选择物料！");
				return false;
			}
			$("#saveFrom\\:goodsInfoSelectIdHid").val(goodsInfoSelectOne);	
			var batchSelect = $("#batchSelectId").val();//批次
			if(batchSelect==null||batchSelect==""||batchSelect=="请选择"||batchSelect=="无可选择项目"){
				alert("请选择批次！");
				return false;
			}
			$("#saveFrom\\:batchSelectIdHid").val(batchSelect);
		}
		else{
			var goodsInfoSelectMany = $("#goodsInfoSelectMId").val();//多选物料
			if(goodsInfoSelectMany==null||goodsInfoSelectMany==""||goodsInfoSelectMany=="请选择"){
				alert("请选择物料！");
				return false;
			}
			$("#saveFrom\\:goodsInfoSelectIdHid").val(goodsInfoSelectMany);
		}	
	}
	var storageRoomTemperature = $("#storageRoomTemperatureId").val();//仓库温度
	if(storageRoomTemperature==null||trim(storageRoomTemperature)==""||storageRoomTemperature=="请输入"){
	}
    else{
      	var reg =/^(-?\d+)(\.\d+)?$/; 
      	if(!reg.test(storageRoomTemperature)){
      		alert("仓库温度只能为数字");
    	  	return false;
      	}
    }
	$("#saveFrom\\:storageRoomTemperatureIdHid").val(storageRoomTemperature);
	var storageRoomHumidity = $("#storageRoomHumidityId").val();//仓库湿度
	if(storageRoomHumidity==null||trim(storageRoomHumidity)==""||storageRoomHumidity=="请输入"){
	}
    else{
      	var reg =/^\d+(\.\d+)?$/; 
      	if(!reg.test(storageRoomHumidity)){
      		alert("仓库湿度只能为0-100数字");
    	  	return false;
      	}
      	else{
      		var storageRoomHumidityInt = parseInt(storageRoomHumidity);
      		if(storageRoomHumidityInt<parseInt("0")||storageRoomHumidityInt>parseInt("100")){
      			alert("仓库湿度只能为0-100数字");
        	  	return false;
      		}
      	}
    }
	$("#saveFrom\\:storageRoomHumidityIdHid").val(storageRoomHumidity);
	var maintainMethod = $("#maintainMethodId").val();//养护方法
	if(maintainMethod==null||maintainMethod==""||maintainMethod=="请选择"||maintainMethod=="无可选择项目"){
		alert("请选择养护方法");
		return false;
	}
	else{
		var pestControMethod = $("#pestControMethodId").val();//防虫方法
		var moistureAbsorptionMethod = $("#moistureAbsorptionMethodId").val();//吸潮方法
		var otherMethod = $("#otherMethodId").val();//其它方法
	    if(maintainMethod.indexOf("防虫") > -1 ){
	    	$("#saveFrom\\:pestControMethodIdHid").val(pestControMethod);
	    }
	    if(maintainMethod.indexOf("吸潮") > -1 ){
	    	$("#saveFrom\\:moistureAbsorptionMethodIdHid").val(moistureAbsorptionMethod);
	    }
	    if(maintainMethod.indexOf("其它") > -1 ){
	    	$("#saveFrom\\:otherMethodIdHid").val(otherMethod);	
	    } 
	}
	$("#saveFrom\\:maintainMethodIdHid").val(maintainMethod);
	var operateName = $("#operateNameId").val();//操作人
	$("#saveFrom\\:operateNameIdHid").val(operateName); 
	var operateTime = $("#operateTimeId").val();//操作时间
	var operateEndTime = $("#operateEndTimeId").val();
	
	if(operateTime==null||operateTime==""){
		if(!(operateEndTime==null||operateEndTime=="")){
			alert("请选择起始时间和结束时间");
			return false;
		}
	}
	else{
		if(operateEndTime==null||operateEndTime==""){
			alert("请选择起始时间和结束时间");
			return false;
		}
 	   else{
		   if(operateTime>operateEndTime){
			   alert("起始时间不能大于结束时间");
			   return false;
		   }
	   }
	}
	$("#saveFrom\\:operateTimeIdHid").val($("#operateTimeId").val());
	$("#saveFrom\\:operateEndTimeIdHid").val($("#operateEndTimeId").val());
    var childPagePicture = $('div table tr td iframe').contents().find('#childPagePicture').val();
    $("#saveFrom\\:productImage").val(childPagePicture);
	var getValue = $("#saveFrom\\:inputTA").val();
	if(getValue!=null&&trim(getValue)!=""){
		if(getValue.length>200){
			$("#saveFrom\\:inputTA").val(getValue.substring(0,200));
			alert("备注不能超过200字");
			return false;
		}
	}
	return true;	
}
function trim(str){
   	return str.replace(/(^\s+)|\s+$/g,"");
 }
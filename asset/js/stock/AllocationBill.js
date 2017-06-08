$(function(){
	$('.selectpicker').selectpicker(); 
	// 遮罩层
	var h = $(window).height();
	$('.maskbox').css("height",h);
	
	$(".mater_name_block").hide();
	//时间插件
	$(".form_datetime_second").datetimepicker({
		format: "yyyy-mm-dd hh:ii",  
		autoclose: true,
		weekStart: 1,
		language:  'zh-CN',
		/*startView: 3,
		minView: 2,
		maxView: 2,	*/	
		pickerPosition: "bottom-left"
	});
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
	var currentDate = date.getFullYear() + seperator1 + month + seperator1 + strDate +" " + date.getHours() + seperator2 + minutes
	$("#allocationDate").val(currentDate);
	if($("#transferIdEdit").val() != ""){
		$("#addButton").attr("disabled",false);
		$(".mater_name_block").show();
	}
	keyInit();
	
	//弹出框回车搜索事件
	$("#searchStr").keydown(function(e){
		if(e.keyCode==13){
			$('#searchButton').trigger("click");
		}
	}); 
	removeOtherStorage("allocation");
	if($("#transferIdEdit").val() != ""){
		refreshPage();
	}
});
//调出仓库改变 
function outStorageChange(){
	var goodsType = $("#goodsType").val();
	var outStorageRoom = $("#outStorageRoom").val();
	var inStorageRoom = $("#inStorageRoom").val();
	refreshOutStorage(outStorageRoom,inStorageRoom,goodsType);
	//本地存储用于页面刷新回显
	sessionStorage.setItem("allocation_outStorageRoom", outStorageRoom);
}

//调入仓库改变 
function inStorageChange(){
	var goodsType = $("#goodsType").val();
	var outStorageRoom = $("#outStorageRoom").val();
	var inStorageRoom = $("#inStorageRoom").val();
	refreshInStorage(outStorageRoom,inStorageRoom,goodsType);
	//本地存储用于页面刷新回显
	sessionStorage.setItem("allocation_inStorageRoom", inStorageRoom);
}
//物料类型改变
function initStorageByGoodsType(){
	var goodsType = $("#goodsType").val();
	initStorageRoom(goodsType);
	//本地存储用于页面刷新回显
	sessionStorage.setItem("allocation_goodsType", goodsType);
}


//物料类型和仓库选择改变
function goodsTypeChange(){
	$('.selectpicker').selectpicker(); 
	var goodsType = $("#goodsType").val();
	var outStorageRoom = $("#outStorageRoom").val();
	var inStorageRoom = $("#inStorageRoom").val();
	if(goodsType!="-1" && outStorageRoom !="-1" && inStorageRoom!="-1"){
		$("#addButton").attr("disabled",false);
		initGoodsNameList(goodsType,outStorageRoom);
	}else{
		$("#addButton").attr("disabled",true);
		$(".mater_name_block").hide();
	}
	
}
//调拨时间改变
function dateChange(){
	var allocationDate = $("#allocationDate").val();
	//本地存储用于页面刷新回显
	sessionStorage.setItem("allocation_allocationDate", allocationDate);
}
//经办人改变
function operatorChange(){
	var operator = $("#operator").val();
	//本地存储用于页面刷新回显
	sessionStorage.setItem("allocation_operator", operator);
}
//备注改变
function commentChange(){
	var comments = $("#comments").val();
	//本地存储用于页面刷新回显
	sessionStorage.setItem("allocation_comments", comments);
}

//初始化物料名称列表回调
function expList(){
	keyInit();
	$(".mater_name_block").show();
	$('.selectpicker').selectpicker(); 
}


//获取已存在于盘点列表中的数据
function getOldlist(){
	var goodsInfoOld = '{"goodsList":[';
	$("tr.batchTr").each(function(){
		var numTdId = $(this).find("td:first-child").attr("id");
		var i = numTdId.substring(6,numTdId.length);
		var number = $("#numtd_" + i).html();
		var goodCode = $("#goodsCodeTd_" + i).html();
		var goodsName = $("#goods_name_" + i).val();
		var batchId = '';//批次如果为--则为无
		var batchList = '';//批次列表
		if($("#batchCodeTd_" + i).html().trim() != "--" && $("#batchCodeTd_" + i).html().trim() != ""){
			batchId = $("#batchSel_" + i).val();
			batchList += '"batchList":[';
			$("#batchCodeTd_" + i).find("li.batchli").each(function(){
				var id = $(this).attr("batchid");
				var batchcode = $(this).attr("batchcode");
				var source = $(this).attr("source");
				var spec = $(this).attr("spec");
				var goodscount = $(this).attr("goodscount");
				var batchLevel = $(this).attr("batchlevel");
				var batchprice = $(this).attr("batchprice");
				var shelflife = $(this).attr("shelflife");
				batchList += '{"batchId":"' + id + '",';
				batchList += '"batchcode":"' + batchcode + '",';
				batchList += '"source":"' + source + '",';
				batchList += '"spec":"' + spec + '",';
				batchList += '"level":"' + batchLevel + '",';
				batchList += '"price":"' + batchprice + '",';
				batchList += '"shelfLife":"' + shelflife + '",';
				batchList += '"goodscount":"' + goodscount + '"},';
			});
			batchList = batchList.substring(0, batchList.length-1);
			batchList += ']';
		}else{
			batchList = '"batchList":null';//等级列表
		}
		var goodsLevel = $("#goodsLevelTd_" + i).html();//来源
		var source = $("#sourceTd_" + i).html();//来源
		var goodsSpec = $("#speciTd_" + i).html();
		var goodsCount = $("#goodsCount_" + i).html();
		var transferNum = $("#transferNumTd_" + i).find("input").val();
		var price = $("#priceTd_" + i).find("input").val();
		var shelfLife = $("#shelfLifeTd_" + i).html();
		var goodsId = $("#goodsId_" + i).html();
		var transferId = $("#transferRecordId_" + i).html();
		var batchId = "";
		if($("#batchCodeTd_" + i).html() != ""){
			batchId = $("#batchSel_" + i).val();
		}
		
		goodsInfoOld += '{"num":"' + number + '",';
		goodsInfoOld += '"goods_id":"' + goodsId + '",';
		goodsInfoOld += '"good_code":"' + goodCode + '",';
		goodsInfoOld += '"good_name":"' + goodsName + '",';
		goodsInfoOld += '"batch_id":"' + batchId + '",';
		goodsInfoOld += '"goods_level":"' + goodsLevel + '",';
		goodsInfoOld += '"source":"' + source + '",';
		goodsInfoOld += '"goods_spec":"' + goodsSpec + '",';
		goodsInfoOld += '"goods_count":"' + goodsCount + '",';
		goodsInfoOld += '"transfer_num":"' + transferNum + '",';
		goodsInfoOld += '"price":"' + price + '",';
		goodsInfoOld += '"shelf_life":"' + shelfLife + '",';
		goodsInfoOld += '"transfer_id":"' + transferId + '",';
		goodsInfoOld += batchList + "},";
	});
	goodsInfoOld = goodsInfoOld.substring(0, goodsInfoOld.length-1);
	goodsInfoOld+="]}";
	if(goodsInfoOld == '{"goodsList":[]}'){
		return "";
	}else{
		return goodsInfoOld;
	}
}


//保存调拨单
function saveCheck(){
	var goodsType = $("#goodsType").val();
	var outStorageRoom = $("#outStorageRoom").val();
	var inStorageRoom = $("#inStorageRoom").val();
	var goodsInfoOld = getOldlist();
	var allocationDate = $("#allocationDate").val()+'';
	if(allocationDate=="请选择"){
		allocationDate="";
	}
	var inventoryDate = new Date(Date.parse(allocationDate.replace(/-/g, "/"))); 
	var operator = $("#operator").val();
	var comments = $("#comments").val().trim();
	if(goodsInfoOld == '{"goodsList":[]}'){
		alert("请添加盘点批次");
		return;
	}
	if(goodsType == "-1"){
		alert("请选择物料类型");
		return;
	}
	if(allocationDate==""){
		alert("请选择调拨日期");
		return;
	}
	if(operator == "-1"){
		alert("请选择经办人");
		return ;
	}
	if(comments.length>200){
		alert("备注不能大于200个汉字");
		return;
	}
	if(comments == "暂无备注信息"){
		comments = "";
	}
	var flag = false;
	var numFlag = false;
	$("#goodsTable").find('tr[name="goodsTr"]').each(function(i){
		var batch = $(this).find("select[name='batchCodeSel']").val();
		if(batch!=""){
			var total=$(this).find("td[name='goodsCount']").html();
			var weight1=Number($(this).find("input[name='outNum']").val());
			$("#goodsTable").find('tr[name="goodsTr"]').each(function(j){
				var batch1 = $(this).find("select[name='batchCodeSel']").val();
				if(j!=i && batch1!="" && batch1 == batch){
					weight1 +=Number($(this).find("input[name='outNum']").val());
				}
			});
			if(parseFloat(weight1.toFixed(3)) > parseFloat(Number(total).toFixed(3))){
				numFlag = true;
				return false;
			}
		}
	});
	if(numFlag){
		 alert("调拨数量不能大于库存数量");
		   return false;
	}
	$("#add\\:goodsType").val(goodsType);
	$("#add\\:outStorageRoomId").val(outStorageRoom);
	$("#add\\:inStorageRoomId").val(inStorageRoom);
	$("#add\\:allocationDate").val(allocationDate);
	$("#add\\:operatorId").val(operator);
	$("#add\\:comments").val(comments);
	$("#add\\:jsonListOld").val(goodsInfoOld);
	$("#add\\:commit").click();
	$("#submitButton").attr("disabled",true);
}


//更新按钮
function updateCheck(){
	var transferId = $("#transferIdEdit").val();
	var goodsType = $("#goodsType").val();
	var outStorageRoom = $("#outStorageRoom").val();
	var inStorageRoom = $("#inStorageRoom").val();
	var goodsInfoOld = getOldlist();
	var allocationDate = $("#allocationDate").val()+'';
	if(allocationDate=="请选择"){
		allocationDate="";
	}
	var inventoryDate = new Date(Date.parse(allocationDate.replace(/-/g, "/"))); 
	var operator = $("#operator").val();
	var comments = $("#comments").val().trim();
	if(goodsInfoOld == '{"goodsList":[]}'){
		alert("请添加盘点批次");
		return;
	}
	if(goodsType == "-1"){
		alert("请选择物料类型");
		return;
	}
	if(allocationDate==""){
		alert("请选择调拨日期");
		return;
	}
	if(comments.length>200){
		alert("备注不能大于200个汉字");
		return;
	}
	if(comments == "暂无备注信息"){
		comments = "";
	}
	if(operator == "-1"){
		alert("请选择经办人");
		return ;
	}
	$("#update\\:goodsType").val(goodsType);
	$("#update\\:outStorageRoomId").val(outStorageRoom);
	$("#update\\:inStorageRoomId").val(inStorageRoom);
	$("#update\\:allocationDate").val(allocationDate);
	$("#update\\:operatorId").val(operator);
	$("#update\\:comments").val(comments);
	$("#update\\:jsonListOld").val(goodsInfoOld);
	$("#update\\:transferId").val(transferId);
	$("#update\\:commit").click();
	$("#updateButton").attr("disabled",true);
}


//物料名称输入框级联查询功能
function searchLi(obj,event,num){
	var code=event.keyCode;
	var inVal = jQuery.trim($(obj).val());
	if(code!=40 && code!=38 ){
		var val="";
		$(obj).parent().next().find(".mater_name_list").empty();
		$(obj).parent().next().children().eq(1).find("li").each(function(i){
			var liTextVal=$(this).text().replace($(this).find(":first").text(),"");
			if(inVal!=""){
				if(liTextVal.indexOf(inVal)>=0){
					val +="<li name='goodsNameLi' myAttr='"+$(this).attr("myAttr")+"' onclick='clickGoods(this)'>";
					val +=$(this).html();
					val +="</li>";
				}
			}else{
				val +="<li name='goodsNameLi' myAttr='"+$(this).attr("myAttr")+"' onclick='clickGoods(this)'>";
				val +=$(this).html();
				val +="</li>";
			}
		});
		if(val ==""){
			val +="<li disabled='disabled'>无</li>";
		}
		$(obj).parent().next().find(".mater_name_list").append(val);
		$(obj).parent().parent().find(".mater_name_bd").show();
	}else if((code==40 || code==38) && num==2){
		var val="";
		$(obj).parent().next().find(".mater_name_list").empty();
		$(obj).parent().next().find(".mater_name_list3 li").each(function(i){
			var liTextVal=$(this).text().replace($(this).find(":first").text(),"");
			if(inVal!=""){
				if(liTextVal.indexOf(inVal)>=0){
					val +="<li name='goodsNameLi' myAttr='"+$(this).attr("myAttr")+"' onclick='clickGoods(this)'>";
					val +=$(this).html();
					val +="</li>";
				}
			}else{
				val +="<li name='goodsNameLi' myAttr='"+$(this).attr("myAttr")+"' onclick='clickGoods(this)'>";
				val +=$(this).html();
				val +="</li>";
			}
			
		});
		$(obj).parent().next().find(".mater_name_list").append(val);
		$(obj).parent().parent().find(".mater_name_bd").show();
	}
}

//扫码回调方法
function scanCodeComple(data){
	if(data=="findnull"){
		alert("扫码查询结果为空");
	}else{
		initGoodsBatch(data);
	}
}




//页面初始化键盘上下键操作
function keyInit(){
	$(".scancode_btn").click(function(){
    	if($(this).hasClass("scan_no")){
    		
    	}else{
    		alert("扫描条形码时请将输入法切换为英文状态");
    		$("#goodsTable").find("td[name='goodsCodeTd']").each(function(){
    			if($(this).html()==""){
    				$(this).next().find("input[name='searchAndSao']").focus();
    				return false;
    			}
    		});
    	}
    });
	 $("input[name='searchAndSao']").keydown(function(e){
	        e = e || window.event;
	        var keycode = e.which ? e.which : e.keyCode;
	        if(keycode == 38){
	            movePrev(this);
	        }else if(keycode == 40){
	            if(!$(this).parent().parent().find(".mater_name_bd").is(":visible")){
	            	$(this).parent().parent().find(".mater_name_bd").show();
	            	searchLi(this,e,2);
	                return;
	            }
	            if($(this).parent().next().find("li[name='goodsNameLi']").hasClass("addbg")){
	                moveNext(this);
	            }else{
	            	$(this).parent().next().find("li[name='goodsNameLi']").removeClass('addbg').eq(0).addClass('addbg');
	            }
	        }else if(keycode == 108 || keycode == 13){
	            dojob(this,keycode);
	        }
	    });
}
//键盘方向键↓操作
var movePrev = function(obj){
    var index = $(obj).parent().next().find(".addbg").prevAll().length;
    if(index == 0){
    	$(obj).parent().next().find("li[name='goodsNameLi']").removeClass('addbg').eq($(".material_li").length-1).addClass('addbg');
    }else{
    	$(obj).parent().next().find("li[name='goodsNameLi']").removeClass('addbg').eq(index-1).addClass('addbg');
    }
    $(obj).parent().next().find("ul").scrollTop((index-1)*24);
};
//键盘方向键↑操作
var moveNext = function(obj){
    var index = $(obj).parent().next().find(".addbg").prevAll().length;
    if(index == $(obj).parent().next().find(".material_li").length-1){
    	$(obj).parent().next().find("li[name='goodsNameLi']").removeClass('addbg').eq(0).addClass('addbg');
    }else{
    	$(obj).parent().next().find("li[name='goodsNameLi']").removeClass('addbg').eq(index+1).addClass('addbg');
    }
    $(obj).parent().next().find("ul").scrollTop((index-1)*24);
};



//物料名称输入框键盘回车键操作
var dojob = function(obj,code){
  $(obj).blur();
  //当前物料名称输入框内容
  var inVal = jQuery.trim($(obj).val());
  //判断扫描功能是否开启，如果开启则没有scan_no class属性
  var flag=$("#replaceClick").find("a").hasClass("scan_no");
  //判断当前是否存在选中的下拉数据，如果有则执行选中数据的点击事件，没有则在根据扫码功能是否开启来判断是否走扫码功能
  var ul = $(obj).parent().next().find("div ul:first-child");
  var size = $(obj).parent().next().find(".addbg").size();
	if(size>0){
		 $(obj).parent().next().find(".addbg").click();
  }else{
	   	 if(!flag){
	   		goodsInfoCode = $(obj).val();
	  		var num = $(obj).parent().parent().parent().parent().find("td:first-child").html();
	  		var goodsType = $("#goodsType").val();
	  		var storageRoom = $("#storageRoom").val();
	  		saoToTable(goodsType,storageRoom,num,goodsInfoCode);
	   	 }else{
	   		$(obj).val("");
	   	 }
  }
 
};

//清除其他页面localStorage中的内容
function removeOtherStorage(str){
	for(var i = 0;i<sessionStorage.length;){
		var key = sessionStorage.key(i);
		if(key != null){
			if(key.indexOf(str)<0){
				sessionStorage.removeItem(key);
			}else{
				i++;
			}
		}
	}
}

//刷新页面回显（本地存储中读取数据）
function refreshPage(){
	var goodsType = sessionStorage.getItem("allocation_goodsType");
	var outStorageRoomId = sessionStorage.getItem("allocation_outStorageRoom");
	var inStorageRoomId = sessionStorage.getItem("allocation_inStorageRoom");
	var allocationDate = sessionStorage.getItem("allocation_allocationDate");
	var operatorId = sessionStorage.getItem("allocation_operator");
	var comments = sessionStorage.getItem("allocation_comments");
	var jsonListOld = sessionStorage.getItem("allocation_goodsJson");
	if(goodsType != null && goodsType != "-1" && outStorageRoomId != null && outStorageRoomId != "-1" && inStorageRoomId != null && inStorageRoomId != "-1"){
		$("#addButton").attr("disabled",false);
	}
	if(allocationDate != null){
		$("#allocationDate").val(allocationDate);
	}else{
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
		$("#allocationDate").val(currentDate);
	}
	if(operatorId != null){
		$("#operator").selectpicker("val",operatorId);
	}
	if(comments != null){
		$("#comments").val(comments);
	}else{
		$("#comments").val("暂无备注信息");
	}
	var goodsType = sessionStorage.getItem("allocation_goodsType");
	var outStorageRoomId = sessionStorage.getItem("allocation_outStorageRoom");
	var inStorageRoomId = sessionStorage.getItem("allocation_inStorageRoom");
	var allocationDate = sessionStorage.getItem("allocation_allocationDate");
	var operatorId = sessionStorage.getItem("allocation_operator");
	var comments = sessionStorage.getItem("allocation_comments");
	
	if(goodsType == null && outStorageRoomId == null && inStorageRoomId == null 
			&& allocationDate == null && operatorId == null && comments == null){
		if(stockEchoFlag == "true"){
			inventoryMemory();
		}
	}else{
		if((goodsType!=null && goodsType!="-1") || (outStorageRoomId!=null&& outStorageRoomId!="-1") || (inStorageRoomId!=null&& inStorageRoomId!="-1")){
			if(goodsType == null ){
				goodsType = "-1";
			}
			if(outStorageRoomId == null ){
				outStorageRoomId = "-1";
			}
			if(inStorageRoomId == null ){
				inStorageRoomId = "-1";
			}
			$("#login").modal("show");
			pageEcho(goodsType,outStorageRoomId,inStorageRoomId,jsonListOld);
		}
	}
	
}


//页面回显回调
function pageEchoComplete(){
	$('.selectpicker').selectpicker(); 
	var goodsType = $("#goodsType").val();
	var outStorageRoom = $("#outStorageRoom").val();
	var inStorageRoom = $("#inStorageRoom").val();
	if(goodsType!="-1" && outStorageRoom !="-1" && inStorageRoom!="-1"){
		$("#addButton").attr("disabled",false);
		$(".mater_name_block").show();
	}else{
		$("#addButton").attr("disabled",true);
		$(".mater_name_block").hide();
	}
	
	//单击全选，双击取消全选
	var timer = null;
	$('.num_input').click(function(){
		clearTimeout(timer);
		var timer = setTimeout(function(){
			
		},300);
    });
	$('.num_input').dblclick(function(){
		clearTimeout(timer);
		$(this).select();
    });
	
	//计算总库存
	calculateStockNum();
	keyInit();
	$('.selectpicker').selectpicker(); 
	$("#login").modal("hide");
	sessionStorage.setItem("allocation_goodsJson", getOldlist());
}
function selectInit(){
	$('.selectpicker').selectpicker(); 
}

//库存记忆功能回调
function stockEchoComplete(data){
	var id = data.transferId;
	var goodsType = data.goodsTypeInfo;
	var outStorageRoomId = data.outStorageRoomId;
	var inStorageRoomId = data.inStorageRoomId;
	var allocationDate = data.transferCode;
	var operatorId = data.operatorId;
	var comments = data.remark;
	if(id != -1){
		if(goodsType != null && goodsType != "-1" && outStorageRoomId != null && outStorageRoomId != "-1" && inStorageRoomId != null && inStorageRoomId != "-1"){
			$("#addButton").attr("disabled",false);
		}
		if(allocationDate != null){
			$("#allocationDate").val(allocationDate);
		}
		if(operatorId != null){
			$("#operator").selectpicker("val",operatorId);
		}
		if(comments != null){
			$("#comments").val(comments);
		}
		initGoodsNameList(goodsType,outStorageRoomId);
	}
}


//扫描条码按钮状态
function scancodeSwitch( obj , scanNo ){
	if( $(obj).hasClass(scanNo) ){
		alert("扫描条形码时请将输入法切换为英文状态");
		$("#goodsTable").find("tr.listtr").each(function(i){
			if($("#searchAndSao_" + i).val() ==""){
				$("#searchAndSao_" + i).focus();
				return false;
			}
		});
		$( obj ).removeClass( scanNo );	
		sessionStorage.setItem("inStorage_scanCodeFlag", 1);
	}else{	
		$( obj ).addClass( scanNo );
		sessionStorage.setItem("inStorage_scanCodeFlag", 0);
	}
}

//展开model
function showAddModel(){
	var goodsType = $("#goodsType").val();
	var storageRoom = $("#outStorageRoom").val();
	initGoodsList(goodsType,storageRoom,3,"",1);
}

//点击单个物料添加至表格
function clickGoods(obj){
	var goodsType = $("#goodsType").val();
	var storageRoom = $("#storageRoom").val();
	var goodsId = $(obj).attr("myAttr");
	var tdId = $(obj).parents("td").attr("id");
	var num = tdId.substring(tdId.lastIndexOf("_")+1,tdId.length);
	selectGoods(goodsType,storageRoom,goodsId,num);
}

//弹出框添加物料，获取页面json
function getModelJson(){
	//获取页面的数据json
	var goodsInfoOld = '{"goodsList":[';
	$("tr.model_tr").each(function(i){
		if($("#selectGoods_" + i).is(':checked')){
			var batchId = "";
			var goodCode = $("#model_goodsCode_" + i).html();
			var goodsName = $("#model_goodsName_" + i).html();
			var goodsId = $("#model_batchId_" + i).html();
			var source = "--";//来源
			var goodsSpec = "--";
			var totalNum = "0.0";
			var transferNum = "1.0";
			var level = "--";
			var batchList = '';
			var price = "0.0";
			var shelfLife = "0";
			if($("#model_batcList_" + i).html() != ""){
				batchList += '"batch_list":[';
				$("#model_batcList_" + i).find("li").each(function(j){
					var id = $(this).attr("batchid");
					var batchSource = $(this).attr("source");
					var batchSpec = $(this).attr("sepc");
					var batchNum = $(this).attr("count");
					var batchCode = $(this).html();
					var batchLevel = $(this).attr("level");
					var batchPrice = $(this).attr("batchprice");
					var batchLife = $(this).attr("shelflife");
					batchList += '{"batch_id":"' + id + '",';
					batchList += '"source":"' + batchSource + '",';
					batchList += '"spec":"' + batchSpec + '",';
					batchList += '"goods_count":"' + batchNum + '",';
					batchList += '"level":"' + batchLevel + '",';
					batchList += '"price":"' + batchPrice + '",';
					batchList += '"shelf_life":"' + batchLife + '",';
					batchList += '"batch_code":"' + batchCode + '"},';
					if(j == 0){
						batchId = id;
						totalNum = batchNum;
						level = batchLevel;
						price = batchPrice;
						shelfLife = batchLife;
						goodsSpec = batchSpec;
						source = batchSource;
					}
				});
				batchList = batchList.substring(0, batchList.length-1);
				batchList += ']';
			}else{
				batchList = '"batch_list":""';
			}
			goodsInfoOld += '{"num":"' + i + '",';
			goodsInfoOld += '"goods_id":"' + goodsId + '",';
			goodsInfoOld += '"goods_code":"' + goodCode + '",';
			goodsInfoOld += '"goods_name":"' + goodsName + '",';
			goodsInfoOld += '"goods_level":"' + level + '",';
			goodsInfoOld += '"source":"' + source + '",';
			goodsInfoOld += '"goods_spec":"' + goodsSpec + '",';
			goodsInfoOld += '"goods_count":"' + totalNum + '",';
			goodsInfoOld += '"transfer_num":"' + transferNum + '",';
			goodsInfoOld += '"goods_price":"' + price + '",';
			goodsInfoOld += '"shelf_life":"' + shelfLife + '",';
			goodsInfoOld += '"batch_id":"' + batchId + '",';
			goodsInfoOld += batchList + '},';
		}
	});
	goodsInfoOld = goodsInfoOld.substring(0, goodsInfoOld.length-1);
	goodsInfoOld+="]}";
	if(goodsInfoOld == '{"goodsList":[]}'){
		return "";
	}else{
		return goodsInfoOld;
	}
}


//弹出框添加物料按钮
function addGoods(){
	//获取添加的行号
	var trNum = "";
	$("tr.model_tr").each(function(i){
		if($("#selectGoods_" + i).is(':checked')){
			trNum += $("#model_num_" + i).html() + ",";
		}
	});
	if(trNum == ""){
		alert("请选择物料");
	}else{
		var jsonStr =  getModelJson();
		var goodsList = eval('(' + jsonStr + ')');
		var goodsArr = goodsList.goodsList;
		for(var i = 0; i < goodsArr.length; i++){
			var goods = goodsArr[i];
			var nullTrIndex = queryNextIndex();
			goods.num = nullTrIndex;
			jsonToAddGoods(goods);
		}
		$('.selectpicker').selectpicker(); 
		sessionStorage.setItem("allocation_goodsJson", getOldlist());
	}
} 

//循环查找为空的行，如果没有则新添加一个,返回空行行数或者新添加的行数index
function queryNextIndex(){
	var index = 0;
	var trNum = $("#goodsTable").find("tr.batchTr").length;//现有行数
	$("tr.batchTr").each(function(i){
		var goodsId = $("#goodsId_" + i).html();
		if(goodsId == ""){
			index = i;
			return false;
		}
	});
	if(index == trNum - 1){//如果空行正好是最后一行则添加一行新的
		newTableTr(index);
	}
	return index; 
}


//新生成一行数据
function newTableTr(oldIndex){
	var index = parseInt(oldIndex) + 1;
	var newTr = '<tr class="' + ((index + 1)%2 == 0 ? 'even' : 'odd') + ' batchTr" id="batchTr_' + index + '">';
	newTr += '<td class="td_line" id="numtd_' + index + '">' + (index + 1) + '</td>';
	newTr += '<td class="td_line" id="goodsCodeTd_' + index + '" name="goodsCodeTd"></td>';
	newTr += '<td class="td_line td_mater" id="goods_nametd_' + index + '">';
	newTr += '<div class="mater_name_block" id="mater_name_block_' + index + '" >';
	newTr += '<div class="mater_name_hd" id="mater_name_hd_' + index + '">';
	newTr += '<input type="text" id="goods_name_' + index + '" name ="searchAndSao" onkeyup="searchLi(this,event,1)"   value=""/>';
	newTr += '<i class="add_mater"  onclick="showAddModel()"></i>';
	newTr += '</div>';
	newTr += '<div class="mater_name_bd" id="mater_name_bd_' + index + '" style="min-width: 10%;z-index:9999">';
	newTr += '<ul class="mater_name_list" id="goodsNameUl_' + index + '" name="goodsNameUl">';
	newTr += $("#goodsNameUl_" + oldIndex).html();
	newTr += '</ul>';
	newTr += '<ul class="mater_name_list3" id="goodsNameUl2_' + index + '" style="display:none">';
	newTr += $("#goodsNameUl2_" + oldIndex).html();
	newTr += '</ul>';
	newTr += '</div>';
	newTr += '</div>';
	newTr += '</td>';
	newTr += ' <td class="td_line" id="batchCodeTd_' + index + '">';
	newTr += '</td>';
	newTr += ' <td class="td_line" id="goodsLevelTd_' + index + '">';
	newTr += '</td>';
	newTr += '<td class="td_line" id="sourceTd_' + index + '">';
	newTr += '</td>';
	newTr += '<td class="td_line" id="speciTd_' + index + '"></td>';
	newTr += '<td class="td_line" id="goodsCount_' + index + '">';
	newTr += '</td>';
	newTr += '<td class="td_line" id="transferNumTd_' + index + '">';
	newTr += '<input type="text" class="form-control" id="transferNum_' + index + '"  style="text-align:center;display:none" value="0.0"   maxlength="10" />';
	newTr += '</td>';
	newTr += '<td class="td_line" id="priceTd_' + index + '">';
	newTr += '<input type="text" class="form-control" id="priceInput_' + index + '"  style="text-align:center;display:none" value="0.0"   maxlength="10" />';
	newTr += '</td>';
	newTr += '<td class="td_line" id="shelfLifeTd_' + index + '">';
	newTr += '</td>';
	newTr += '<td class="td_line" id="goodsId_' + index + '" style="display:none">';
	newTr += '</td>';
	newTr += '<td class="td_line" id="transferRecordId_' + index + '" style="display:none">';
	newTr += '</td>';
	newTr += '<td>';
	newTr += '<a class="icon_link" href="javascript:;" id="copyTd_' + index + '" style="display:none" onclick="copyGoods('+index+')"><img src="/images/crop_tableadd.jpg" /></a>';
	newTr += '<a class="icon_link" href="javascript:;" id="delTd_' + index + '" style="display:none" onclick="delGoods('+index+')"><img src="/asset/images/stock/commons/tableIco_delect2.png" /></a>';
	newTr += '</td>';
	newTr += '</tr>';
	$("#goodsTable").append(newTr);
	$("#goods_name_" + index).keydown(function(e){
        e = e || window.event;
        var keycode = e.which ? e.which : e.keyCode;
        if(keycode == 38){
            movePrev(this);
        }else if(keycode == 40){
            if(!$(this).parent().parent().find(".mater_name_bd").is(":visible")){
            	$(this).parent().parent().find(".mater_name_bd").show();
            	searchLi(this,e,2);
                return;
            }
            if($(this).parent().next().find("li[name='goodsNameLi']").hasClass("addbg")){
                moveNext(this);
            }else{
            	$(this).parent().next().find("li[name='goodsNameLi']").removeClass('addbg').eq(0).addClass('addbg');
            }
        }else if(keycode == 108 || keycode == 13){
            dojob(this,keycode);
        }
    });
}
//填入物料名称初始化物料批次内容
function initGoodsBatch(data){
	//处理选择的物料json
	if(data.goods_id != null){
		var goods = eval(data);
		jsonToAddGoods(goods);
		//如果添加的是最后一行，则添加一个
		var index = goods.num;
		var trNum = $("#goodsTable").find("tr.billTr").length;//现有行数
		if(index == (trNum - 1)){//如果空行正好是最后一行则添加一行新的
			newTableTr(index);
		}
	}else{
		alert("没有查询到改物料信息");
		return false;
	}
	
	$('.selectpicker').selectpicker(); 
	//单击全选，双击取消全选
	var timer = null;
	$('.num_input').click(function(){
		clearTimeout(timer);
		var timer = setTimeout(function(){
			
		},300);
    });
	$('.num_input').dblclick(function(){
		clearTimeout(timer);
		$(this).select();
    });
	//计算总库存
	calculateStockNum();
	sessionStorage.setItem("allocation_goodsJson", getOldlist());
}
//将添加的物料拼入表格中
function jsonToAddGoods(json){
		var index = json.num;//下标
		var batchId = json.batch_id;//批次id
		var goodsId = json.goods_id;//物料id
		var goodsCode = json.goods_code;//物料编码
		var goodsName = json.goods_name;//物料名字
		var batchList = json.batch_list;//批次集合
		var level = json.goods_level;//等级
		var source = json.source;//来源
		var goodsSpec = json.goods_spec;//规格
		var goodsCount = json.goods_count;//库存数量
		var price = json.goods_price;//价格
		var shelfLife = json.shelf_life;//保质期
		var transferNum = json.transfer_num;//调拨数量
		
		$("#goodsCodeTd_" + index).html(goodsCode);
		$("#goods_name_" + index).val(goodsName);
		//等级下拉列表
		var batchTdHtml = "";
		if(batchList == ""){
			batchList = "--";
		}else{
			var batchSelect = "<select id='batchSel_" + index + "' class='selectpicker' onchange='changeBatch(this)' >";
			var batchLi = "<div style='display:none' class='batchnone'><ul>";
			for(var i = 0; i < batchList.length; i++){
				var batch = batchList[i];
				batchSelect += "<option value='" + batch.batch_id + "'>" + batch.batch_code + "</option>";
				batchLi += "<li class='batchli' batchid='" +  batch.batch_id + "' batchcode='" + batch.batch_code + "' source='" + batch.source + "' spec='" + batch.spec + "' goodscount='" + batch.goods_count + "' batchLevel='" + batch.level + "' batchPrice='" + batch.price + "' shelfLife='" + batch.shelf_life + "'>";
				batchLi += "</li>";
			}
			batchSelect += "</select>";
			batchLi += "</ul></div>";
			batchTdHtml = batchSelect + batchLi;
		}
		$("#batchCodeTd_" + index).html(batchTdHtml);
		//等级
		$("#goodsLevelTd_" + index).html(level);
		//来源下拉列表
		$("#sourceTd_" + index).html(source);
		//规格
		$("#speciTd_" + index).html(goodsSpec);
		//库存量
		$("#goodsCount_" + index).html(goodsCount);
		//调拨数量
		$("#transferNumTd_" + index).find("input").val(transferNum);
		$("#transferNumTd_" + index).find("input").show();
		//价格
		$("#priceTd_" + index).find("input").val(price);
		$("#priceTd_" + index).find("input").show();
		//保质期
		$("#shelfLifeTd_" + index).html(shelfLife);
		//物料id
		$("#goodsId_" + index).html(goodsId);
		//复制和删除显示
		$("#copyTd_" + index).show();
		$("#delTd_" + index).show();
		$(".selectpicker").selectpicker();
}

//复制物料
function copyGoods(index){
	var goodsInfoOld = getSigleGoods(index);
	var newId = $("#goodsTable").find("tr.batchTr").length;//现有行数(新的id)
	copyToCreateNewGoods(newId,index);
	var goods = eval('(' + goodsInfoOld + ')');
	goods.num = newId;
	jsonToAddGoods(goods);
	//重新组织序号
	$("tr.batchTr").each(function(i){
		$(this).find("td:first-child").html(i+1); 
	});
	sessionStorage.setItem("allocation_goodsJson", getOldlist());
	$('.selectpicker').selectpicker(); 
}

//复制添加一行
function copyToCreateNewGoods(index,oldIndex){
	var newTr = '<tr class="' + ((index + 1)%2 == 0 ? 'even' : 'odd') + ' batchTr" id="batchTr_' + index + '">';
	newTr += '<td class="td_line" id="numtd_' + index + '">' + (index + 1) + '</td>';
	newTr += '<td class="td_line" id="goodsCodeTd_' + index + '" name="goodsCodeTd"></td>';
	newTr += '<td class="td_line td_mater" id="goods_nametd_' + index + '">';
	newTr += '<div class="mater_name_block" id="mater_name_block_' + index + '" >';
	newTr += '<div class="mater_name_hd" id="mater_name_hd_' + index + '">';
	newTr += '<input type="text" id="goods_name_' + index + '" name ="searchAndSao" onkeyup="searchLi(this,event,1)"   value=""/>';
	newTr += '<i class="add_mater"  onclick="showAddModel()"></i>';
	newTr += '</div>';
	newTr += '<div class="mater_name_bd" id="mater_name_bd_' + index + '" style="min-width: 10%;z-index:9999">';
	newTr += '<ul class="mater_name_list" id="goodsNameUl_' + index + '" name="goodsNameUl">';
	newTr += $("#goodsNameUl_" + oldIndex).html();
	newTr += '</ul>';
	newTr += '<ul class="mater_name_list3" id="goodsNameUl2_' + index + '" style="display:none">';
	newTr += $("#goodsNameUl2_" + oldIndex).html();
	newTr += '</ul>';
	newTr += '</div>';
	newTr += '</div>';
	newTr += '</td>';
	newTr += ' <td class="td_line" id="batchCodeTd_' + index + '">';
	newTr += '</td>';
	newTr += ' <td class="td_line" id="goodsLevelTd_' + index + '">';
	newTr += '</td>';
	newTr += '<td class="td_line" id="sourceTd_' + index + '">';
	newTr += '</td>';
	newTr += '<td class="td_line" id="speciTd_' + index + '"></td>';
	newTr += '<td class="td_line" id="goodsCount_' + index + '">';
	newTr += '</td>';
	newTr += '<td class="td_line" id="transferNumTd_' + index + '">';
	newTr += '<input type="text" class="form-control" id="transferNum_' + index + '"  style="text-align:center;display:none" value="0.0"   maxlength="10" />';
	newTr += '</td>';
	newTr += '<td class="td_line" id="priceTd_' + index + '">';
	newTr += '<input type="text" class="form-control" id="priceInput_' + index + '"  style="text-align:center;display:none" value="0.0"   maxlength="10" />';
	newTr += '</td>';
	newTr += '<td class="td_line" id="shelfLifeTd_' + index + '">';
	newTr += '</td>';
	newTr += '<td class="td_line" id="goodsId_' + index + '" style="display:none">';
	newTr += '</td>';
	newTr += '<td class="td_line" id="transferRecordId_' + index + '" style="display:none">';
	newTr += '</td>';
	newTr += '<td>';
	newTr += '<a class="icon_link" href="javascript:;" id="copyTd_' + index + '" style="display:none" onclick="copyGoods(' + index+')"><img src="/images/crop_tableadd.jpg" /></a>';
	newTr += '<a class="icon_link" href="javascript:;" id="delTd_' + index + '" style="display:none" onclick="delGoods('+index+')"><img src="/asset/images/stock/commons/tableIco_delect2.png" /></a>';
	newTr += '</td>';
	newTr += '</tr>';
	$("#batchTr_" + oldIndex).after(newTr);
	$("#goods_name_" + index).keydown(function(e){
        e = e || window.event;
        var keycode = e.which ? e.which : e.keyCode;
        if(keycode == 38){
            movePrev(this);
        }else if(keycode == 40){
            if(!$(this).parent().parent().find(".mater_name_bd").is(":visible")){
            	$(this).parent().parent().find(".mater_name_bd").show();
            	searchLi(this,e,2);
                return;
            }
            if($(this).parent().next().find("li[name='goodsNameLi']").hasClass("addbg")){
                moveNext(this);
            }else{
            	$(this).parent().next().find("li[name='goodsNameLi']").removeClass('addbg').eq(0).addClass('addbg');
            }
        }else if(keycode == 108 || keycode == 13){
            dojob(this,keycode);
        }
    });
}
//获取单行的物料json
function getSigleGoods(i){
	var number = $("#numtd_" + i).html();
	var goodCode = $("#goodsCodeTd_" + i).html();
	var goodsName = $("#goods_name_" + i).val();
	var batchId = '';//等级 如果为--则为无
	var batchList = '';//批次列表
	if($("#batchCodeTd_" + i).html().trim() != "--" && $("#batchCodeTd_" + i).html().trim() != ""){
		batchId = $("#batchSel_" + i).val();
		batchList += '"batch_list":[';
		$("#batchCodeTd_" + i).find("li.batchli").each(function(){
			var id = $(this).attr("batchid");
			var batchcode = $(this).attr("batchcode");
			var source = $(this).attr("source");
			var spec = $(this).attr("spec");
			var goodscount = $(this).attr("goodscount");
			var batchLevel = $(this).attr("batchLevel");
			var batchPrice = $(this).attr("batchPrice");
			var shelfLife = $(this).attr("shelfLife");
			batchList += '{"batch_id":"' + id + '",';
			batchList += '"batch_code":"' + batchcode + '",';
			batchList += '"source":"' + source + '",';
			batchList += '"spec":"' + spec + '",';
			batchList += '"level":"' + batchLevel + '",';
			batchList += '"price":"' + batchPrice + '",';
			batchList += '"shelf_life":"' + shelfLife + '",';
			batchList += '"goods_count":"' + goodscount + '"},';
		});
		batchList = batchList.substring(0, batchList.length-1);
		batchList += ']';
	}else{
		batchList = '"batch_list":null';//等级列表
	}
	var level = $("#goodsLevelTd_" + i).html();//来源
	var source = $("#sourceTd_" + i).html();//来源
	var goodsSpec = $("#speciTd_" + i).html();
	var batchNum = $("#goodsCount_" + i).html();
	var transferNum = $("#transferNumTd_" + i).find("input").val();
	var price = $("#priceTd_" + i).find("input").val();
	var shelfLife = $("#shelfLifeTd_" + i).html();
	var goodsId = $("#goodsId_" + i).html();
	var goodsInfoOld = "";
	
	goodsInfoOld += '{"num":"' + i + '",';
	goodsInfoOld += '"goods_id":"' + goodsId + '",';
	goodsInfoOld += '"goods_code":"' + goodCode + '",';
	goodsInfoOld += '"goods_name":"' + goodsName + '",';
	goodsInfoOld += '"goods_level":"' + level + '",';
	goodsInfoOld += '"source":"' + source + '",';
	goodsInfoOld += '"goods_spec":"' + goodsSpec + '",';
	goodsInfoOld += '"goods_count":"' + batchNum + '",';
	goodsInfoOld += '"transfer_num":"' + transferNum + '",';
	goodsInfoOld += '"goods_price":"' + price + '",';
	goodsInfoOld += '"shelf_life":"' + shelfLife + '",';
	goodsInfoOld += '"batch_id":"' + batchId + '",';
	goodsInfoOld += batchList + '}';
	return goodsInfoOld;
}

//删除物料
function delGoods(index){
	if(confirm("确定删除该条物料？")){
		clearTr(index);
		//计算总重量
		calculateStockNum();
		delMoreTr();
	}
}

//清空单行内容
function clearTr(index){
	$("#goodsCodeTd_" + index).html("");
	$("#goods_name_" + index).val("");
	$("#batchCodeTd_" + index).html("");
	$("#goodsLevelTd_" + index).html("");
	$("#sourceTd_" + index).html("");
	$("#speciTd_" + index).html("");
	$("#goodsCount_" + index).html("");
	$("#transferNumTd_" + index).find("input").val("");
	$("#transferNumTd_" + index).find("input").hide();
	$("#priceTd_" + index).find("input").val("");
	$("#priceTd_" + index).find("input").hide();
	$("#shelfLifeTd_" + index).html("");
	$("#goodsId_" + index).html("");
	$("#transferRecordId_" + index).html("");
	//复制和删除显示
	$("#copyTd_" + index).hide();
	$("#delTd_" + index).hide();
	sessionStorage.setItem("allocation_goodsJson", getOldlist());
}

//删除多余的行
function delMoreTr(){
	var lastTrNum = 0;
	var allTrNum = $("#goodsTable").find("tr.billTr").length;
	$('.billTr').each(function(i){
		if($("#goods_codetd_" + i).html() != ""){
			lastTrNum = i;
		}
	});
	$('.billTr').each(function(j){
		if(lastTrNum >= 7){
			if(j > (lastTrNum + 1)){
				 $("#batchTr_" + j).remove();
			}
		}else{
			if( j > 7){
				 $("#batchTr_" + j).remove();
			}
		}
	});
}
//计算总重量
function calculateStockNum(){
	var totalNum = 0;
	$("tr.batchTr").each(function(i){
		if($("#goodsId_" + i).html() != ""){
			var num = $("#transferNum_" + i).val();
			totalNum += parseFloat(num);
		}
	});
	$("#totalNum").html(totalNum.toFixed(3));
}

//选择批次下拉列表
function changeBatch(obj){
	var selectedId = $(obj).attr("id");
	var index = selectedId.substring(selectedId.indexOf("_")+1,selectedId.length);
	var batchId = $(obj).val();
	var batchNum = "";
	var source = "--";
	var spec = "--";
	var goodsCount = "0";
	var goodsLevel = "--";
	var batchPrice = "0";
	var shelfLife = "0";
	$(obj).parent().find("li.batchli").each(function(){
		var liId = $(this).attr("batchid");
		if(batchId == liId){
			batchNum = $(this).attr("goodscount");
			source = $(this).attr("source");
			spec = $(this).attr("spec");
			goodsCount = $(this).attr("goodscount");
			goodsLevel = $(this).attr("batchlevel");
			batchPrice = $(this).attr("batchprice");
			shelflife = $(this).attr("shelflife");
			return;
		}
	});
	$("#goodsLevelTd_" + index).html(goodsLevel);
	$("#sourceTd_" + index).html(source);
	$("#speciTd_" + index).html(spec);
	$("#goodsCount_" + index).html(goodsCount);
	$("#transferNumTd_" + index).find("input").val("1.0");
	$("#priceTd_" + index).find("input").val(batchPrice);
	$("#shelfLifeTd_" + index).html(shelfLife);
	//计算总库存
	calculateStockNum();
	sessionStorage.setItem("allocation_goodsJson", getOldlist());
}


function clearPage(){
	$("#addButton").attr("disabled",true);
	$(".mater_name_block").hide();
	/*$("#goodsType").selectpicker("val","-1");
	$("#outStorageRoom").selectpicker("val","-1");
	$("#inStorageRoom").selectpicker("val","-1");*/
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
	var currentDate = date.getFullYear() + seperator1 + month + seperator1 + strDate +" " + date.getHours() + seperator2 + minutes
	$("#allocationDate").val(currentDate);
	$("#operator").selectpicker("val","-1");
	$("#comments").html("暂无备注信息");
	$("#totalNum").html("0");
	$("#login").modal("show");
	clear();
	//清除本地存储
	sessionStorage.clear();
	sessionStorage.setItem("allocation_allocationDate", currentDate);
}

function clearComplete(){
	$('.selectpicker').selectpicker(); 
	$("#login").modal("hide");
}

//校验调拨数量
function checkTransferNum(obj){
	if(isNaN($(obj).val()) || Number($(obj).val()) < 0){
		alert("请输入正确数字！"); 
		$(obj).val("0.0");
	 }else{
		 var goodsCountStr = $(obj).parent().parent().find("td.godos_count").html();
		 var goodsCount = parseFloat(goodsCountStr);
		 var transferNum = parseFloat($(obj).val());
		if(transferNum > goodsCount){
			alert("调拨数量不能大于库存数量"); 
			$(obj).val("1.0");
		}
	 }
	//计算总库存
	calculateStockNum();
	 sessionStorage.setItem("allocation_goodsJson", getOldlist());
}

function checkNum(obj){
	 if(isNaN($(obj).val()) || Number($(obj).val()) < 0){
			alert("请输入正确数字！"); 
			$(obj).val("0.0");
		}
	 sessionStorage.setItem("allocation_goodsJson", getOldlist());
}
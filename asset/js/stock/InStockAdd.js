$(function(){
	$("#outStockdiv").hide();
	$("#supplierdiv").hide();
	$("#storageRoom").attr("disabled","true");
	if(inStockType == 11){
		$("#supplierdiv").show();
	}
	if(inStockType == 13){
		$("#outStockdiv").show();
	}
	// (1)获取焦点和失去焦点状态
    $('#comments').focus(function(){
        var txt_value = $(this).val();
        if(txt_value=="暂无备注信息"){
            $(this).val("");    
        };  
    });
    $('#comments').blur(function(){
        var txt_value = $(this).val();
        if(txt_value==""){
            $(this).val("暂无备注信息"); 
        };  
    }); 
	// 遮罩层
	var h = $(window).height();
	$('.maskbox').css("height",h);
	
	$('li[name="goodsName"]').click(function(){
		var gname = $(this).html();
		alert(gname);
    });
	//(6)时间插件
	//时间插件
	$(".form_datetime_second").datetimepicker({
		format: "yyyy-mm-dd hh:ii",  
		autoclose: true,
		weekStart: 1,
		language:  'zh-CN',
		pickerPosition: "bottom-left"
	});
	// (1)获取焦点和失去焦点状态
    $('#goodsName').focus(function(){
        var txt_value = $(this).val();
        if(txt_value=="请输入查询内容"){
            $(this).val("");    
        };  
    });
    $('#goodsName').blur(function(){
        var txt_value = $(this).val();
        if(txt_value==""){
            $(this).val('请输入查询内容'); 
        };  
    }); 
  
    if($("#storageChangeFormIdEdit").val() != ""){
		var inStockType = $("#hiddenInStockTypeEdit").val();
		setInStockType(inStockType);
		if(inStockType == "11"){
			$("#supplierdiv").show();
			//$("#purchaseId").show();
		}
		$("#addButton").attr("disabled",false);
		$("#storageRoom").removeAttr('disabled');
		$("#storageRoom").find("button").removeClass('disabled');
		$("#storageRoom").find("li").removeClass('disabled');
		initGoodsNameComplete();
	}else{
		  keyInit();
	}
   
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
	if($("#storageChangeFormIdEdit").val() == ""){
		$("#inStorageTime").val(currentDate);
	}
	
	//回车搜索事件
	$("#goodsName").keydown(function(e){
		if(e.keyCode==13){
			$('#searchButton').trigger("click");
		}
	});
	removeOtherStorage("inStorage");
	refreshPage();
	//计算总重量
	calculateWeight();
	//计算总价
	calculatePrice();
});

//入库类型根据物料类型联动
function changeGoodsType(){
	var goodsType = $("#goodsType").val();
	var inStockType = $("#inStockType").attr("myInStockTypeId");
	selectItemInit(goodsType,inStockType);
}

//入库类型根据物料类型联动回调方法
function changeGoodsTypeOncomplete(data){
	$('.selectpicker').selectpicker(); 
	var goodsType = $("#goodsType").val();
	var inStockType = data;
	setInStockType(inStockType);
	if(goodsType != "-1"){
		$("#storageRoom").removeAttr('disabled');
		$("#storageRoom").find("button").removeClass('disabled');
		$("#storageRoom").find("li").removeClass('disabled');
	}else{
		$("#storageRoom").attr("disabled","true");
	}
	if( inStockType=='12'&&goodsType=='4' ){
		
	}else{
		$("#inStockType").attr("myInStockTypeId",inStockType);
		$("#inStockTypeUl").find("li").each(function(){
			$(this).removeClass("selected");
			if($(this).attr("myInStockTypeId") == inStockType){
				$(this).addClass("selected");
			}
		});
	}
	if(goodsType!="-1" && inStockType!="-1" ){
		if(inStockType!="13"){
			$("#addButton").attr("disabled",false);
		}
		var scandCodeFlag = 0;
		if($("#scandCodeSwitch").hasClass("scan_no")){
			scandCodeFlag = 0;
		}else{
			scandCodeFlag = 1;
		}
		initGoodsNameList(goodsType,inStockType,scandCodeFlag);
	}else{
		//选择物料类型和入库类型后才能点击物料名称
		$('div.mater_name_block').hide();
		$("#addButton").attr("disabled",'disabled');
		$('.listtr').each(function(i){
			if($("#goodsIdtd_" + i).html() != ""){
				clearTr(i);
			}
		});
	}
	//本地存储用于页面刷新回显
	sessionStorage.setItem("inStorage_goodsType", goodsType);
	sessionStorage.setItem("inStorage_instorageType", $("#inStockType").attr("myInStockTypeId"));
	sessionStorage.setItem("inStorage_storageRoomId", $("#storageRoom").val());
}

//初始化出库编码下拉列表回调方法
function outStockComplete(){
	$("#supplierdiv").hide();
	$("#outStockdiv").show();
	$('.selectpicker').selectpicker();
}
//根据物料类型以及基地给出所属仓库
function onChangeBefore(){
	var goodsType = $("#goodsType").val();
	if(goodsType!= '-1'){
		$("#storageRoom").removeAttr('disabled');
		$("#storageRoom").find("button").removeClass('disabled');
		$("#storageRoom").find("li").removeClass('disabled');
	}else{
		$("#storageRoom").attr("disabled","true");
	}
	//本地存储用于页面刷新回显
	//本地存储用于页面刷新回显
	sessionStorage.setItem("inStorage_goodsType", goodsType);
	sessionStorage.setItem("inStorage_instorageType", $("#inStockType").attr("myInStockTypeId"));
	sessionStorage.setItem("inStorage_storageRoomId", $("#storageRoom").val());
	
}

//经办人改变
function operatorChange(){
	var operatorId = $("#operator").val();
	//本地存储用于页面刷新回显
	sessionStorage.setItem("inStorage_operatorId", operatorId);
}

//入库日期改变
function inStorageDateChange(){
	var inStorageDate = $("#inStorageTime").val();
	//本地存储用于页面刷新回显
	sessionStorage.setItem("inStorage_inStorageDate", inStorageDate);
}

//备注信息改变
function commentsChange(){
	var comments = $("#comments").val();
	//本地存储用于页面刷新回显
	sessionStorage.setItem("inStorage_comments", comments);
}

//(6)扫描条码按钮状态
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

//点击添加物料按钮弹出框
function showAddModel(){
	$('.mater_name_bd').hide();	
	var goodsType = $("#goodsType").val();
	var inStockType = $("#inStockType").attr("myInStockTypeId");
	initGoodsList(goodsType,inStockType,1,"",1);
}


//选择物料
function selectGoods(obj){
	var goodsType = $("#goodsType").val();
	var inStockType = $("#inStockType").attr("myInStockTypeId");
	var goodsId = $(obj).attr("myattr");
	var gname = $(obj).html();
	$(obj).parents("div.mater_name_block").find("input").val(gname);
	var objId = $(obj).parents("td").attr("id");
	var num = objId.substring(objId.indexOf("_")+1,objId.length);
	changeGoodsNameInnerInfo(goodsType,inStockType,goodsId,num);
}

//删除物料
function delGoods(index){
	if(confirm("确定删除该条物料？")){
		clearTr(index);
		//计算总重量
		calculateWeight();
		//计算总价
		calculatePrice();
		delMoreTr();
	}
}

//清空单行内容
function clearTr(index){
	$("#goodsCodeTd_" + index).html("");
	$("#searchAndSao_" + index).val("");
	//等级下拉列表
	$("#levelNameTd_" + index).html("");
	//来源下拉列表
	$("#sourceTd_" + index).html("");
	$("#speciTd_" + index).html("");
	//入库量
	$("#inStockNumTd_" + index).find("input").val("");
	$("#inStockNumTd_" + index).find("input").hide();
	//总重量
	$("#weightTd_" + index).find("input").val("");
	$("#weightTd_" + index).find("input").hide();
	//保质期
	$("#shelfLifeTd_" + index).find("input").val("");
	$("#shelfLifeTd_" + index).find("input").hide();
	//单价
	$("#priceTd_" + index).find("input").val("");
	$("#priceTd_" + index).find("input").hide();
	//总价
	$("#totolPriceTd_" + index).find("input").val("");
	$("#totolPriceTd_" + index).find("input").hide();
	//id
	$("#goodsIdtd_" + index).html("");
	//单位
	$("#unitIdTd_" + index).html("");
	//批次id
	$("#batchIdTd_" + index).html("");
	$("#batchTd_" + index).html("");
	$("#stockNumTd_" + index).html("");
	//复制和删除显示
	$("#copyTd_" + index).find("a").hide();
	$("#delTd_" + index).find("a").hide();
	sessionStorage.setItem("inStorage_goodsJson", getGoodsJson());
}
//删除多余的行
function delMoreTr(){
	var lastTrNum = 0;
	var allTrNum = $("#goodsTable").find("tr.listtr").length;
	$('.listtr').each(function(i){
		if($("#goodsIdtd_" + i).html() != ""){
			lastTrNum = i;
		}
	});
	$('.listtr').each(function(j){
		if(lastTrNum >= 7){
			if(j > (lastTrNum + 1)){
				 $("#goodsTr_" + j).remove();
			}
		}else{
			if( j > 7){
				 $("#goodsTr_" + j).remove();
			}
		}
	});
}

//复制物料
function copyGoods(index){
	var goodsInfoOld = getSigleGoods(index);
	var newId = $("#goodsTable").find("tr.listtr").length;//现有行数(新的id)
	copyToCreateNewGoods(newId,index);
	var goods = eval('(' + goodsInfoOld + ')');
	goods.num = newId;
	jsonToAddGoods(goods);
	//重新组织序号
	$("tr.listtr").each(function(i){
		$(this).find("td:first-child").html(i+1); 
	});
	sessionStorage.setItem("inStorage_goodsJson", getGoodsJson());
	$('.selectpicker').selectpicker(); 
}

//获取单行的物料json
function getSigleGoods(i){
	var number = $("#numTd_" + i).html();
	var goodsId = $("#goodsIdtd_" + i).html();
	var goodCode = $("#goodsCodeTd_" + i).html();
	var goodsName = $("#searchAndSao_" + i).val();
	var unitId = $("#unitIdTd_" + i).html();
	var batchId = $("#batchIdTd_" + i).html();
	var level = '';//等级 如果为--则为无
	var levelList = '';//等级列表
	if($("#levelNameTd_" + i).html().trim() != "--" && $("#levelNameTd_" + i).html().trim() != ""){
		level = $("#goodslevels_" + i).val();
		levelList += '"level_list":[';
		$("#levelNameTd_" + i).find("li.levelli").each(function(){
			var id = $(this).attr("levelid");
			var price = $(this).attr("levelprice");
			var levelName = $(this).attr("levelname");
			var stockNum = $(this).attr("stocknum");
			var levelBatchList = '"batch_list":[';
			$(this).find("li").each(function(){
				var batchId = $(this).attr("batchid");
				var batchCode = $(this).html();
				levelBatchList += '{"batch_id":"' + batchId + '",';
				levelBatchList += '"batch_code":"' + batchCode + '"},';
			});
			if('"batch_list":[' != levelBatchList){
				levelBatchList = levelBatchList.substring(0, levelBatchList.length-1);
			}
			levelBatchList += ']';
			levelList += '{"level_id":"' + id + '",';
			levelList += '"level_price":"' + price + '",';
			levelList += '"level_name":"' + levelName + '",';
			levelList += '"stock_num":"' + stockNum + '",';
			levelList += levelBatchList +'},';
		});
		levelList = levelList.substring(0, levelList.length-1);
		levelList += ']';
	}else{
		levelList = '"level_list":""';//等级列表
	}
	var source = '';//来源
	var sourceList = '';
	if($("#sourceTd_" + i).html().trim() != "" && $("#sourceTd_" + i).html().trim() != "--"){
		source = $("#goodsSource_" + i).val();
		sourceList += '"source_list":[';
		$("#sourceTd_" + i).find("li.sourceli").each(function(){
			var id = $(this).attr("sourceid");
			var sourceName = $(this).html();
			sourceList += '{"source_id":"' + id + '",';
			sourceList += '"source_name":"' + sourceName + '"},';
		});
		sourceList = sourceList.substring(0, sourceList.length-1);
		sourceList += ']';
	}else{
		sourceList = '"source_list":""';
	}
	var goodsSpec = $("#speciTd_" + i).html();
	var inStockNum = "";
	if($("#inStockNumTd_" + i).html() == ""){
		inStockNum = "";
	}else{
		inStockNum = $("#inStockNumTd_" + i).find("input").val();
	}
	var totalWeight = "";
	if($("#weightTd_" + i).html() == ""){
		totalWeight = "";
	}else{
		totalWeight = $("#weightTd_" + i).find("input").val();
	}
	var shelfLife = "";
	if($("#shelfLifeTd_" + i).html() == ""){
		shelfLife = "";
	}else{
		shelfLife = $("#shelfLifeTd_" + i).find("input").val();
	}
	var unitPrice = "";
	if($("#priceTd_" + i).html() == ""){
		unitPrice = "";
	}else{
		unitPrice = $("#priceTd_" + i).find("input").val();
	}
	var totalPrice = "";
	if($("#totolPriceTd_" + i).html() == ""){
		totalPrice = "";
	}else{
		totalPrice = $("#totolPriceTd_" + i).find("input").val();
	}
	var batchList = '';
	if($("#batchTd_" + i).html() != ""){
		batchList += '"batch_list":[';
		$("#batchTd_" + i).find("li.batchli").each(function(){
			var id = $(this).attr("batchId");
			var batchCode = $(this).html();
			batchList += '{"batch_id":"' + id + '",';
			batchList += '"batch_code":"' + batchCode + '"},';
		});
		if(batchList != '"batch_list":['){
			batchList = batchList.substring(0, batchList.length-1);
		}
		batchList += ']';
	}else{
		batchList = '"batch_list":""';
	}
	var stockNum = $("#stockNumTd_" + i).html();
	var goodsInfoOld = "";
	goodsInfoOld += '{"num":"' + number + '",';
	goodsInfoOld += '"goods_id":"' + goodsId + '",';
	goodsInfoOld += '"goods_code":"' + goodCode + '",';
	goodsInfoOld += '"goods_name":"' + goodsName + '",';
	goodsInfoOld += '"level_id":"' + level + '",';
	goodsInfoOld += '"source_id":"' + source + '",';
	goodsInfoOld += '"unit_id":"' + unitId + '",';
	goodsInfoOld += '"batch_id":"' + batchId + '",';
	goodsInfoOld += '"goods_spec":"' + goodsSpec + '",';
	goodsInfoOld += '"in_num":"' + inStockNum + '",';
	goodsInfoOld += '"total_weight":"' + totalWeight + '",';
	goodsInfoOld += '"shelf_life":"' + shelfLife + '",';
	goodsInfoOld += '"unit_price":"' + unitPrice + '",';
	goodsInfoOld += '"total_price":"' + totalPrice + '",';
	goodsInfoOld += '"stock_num":"' + stockNum.trim() + '",';
	goodsInfoOld += levelList + ",";
	goodsInfoOld += batchList + ",";
	goodsInfoOld += sourceList + "}";
	return goodsInfoOld;
}

//复制添加一行
function copyToCreateNewGoods(index,oldIndex){
	var editId = $("#storageChangeFormIdEdit").val();
	var newTr = '<tr class="' + ((index + 1)%2 == 0 ? 'even' : 'odd') + ' listtr" id="goodsTr_' + index + '">';
	newTr += '<td class="td_line" height="46" id="numTd_' + index + '">' + (index + 1) + '</td>';
	newTr += '<td class="td_line" id="goodsCodeTd_' + index + '"></td>';
	newTr += '<td class="td_line td_mater" id="goodsNameTd_' + index + '">';
	newTr += '<div class="mater_name_block" id="mater_name_block_' + index + '" >';
	newTr += '<div class="mater_name_hd" id="mater_name_hd_' + index + '">';
	newTr += '<input type="text" id="searchAndSao_' + index + '" onkeyup="searchLi(this,event,1)" style="text-align:center;" name ="searchAndSao" value=""/>';
	newTr += '<i class="add_mater"  data-toggle="modal" data-target="#AddMaterial" onclick="showAddModel()"></i>';
	newTr += '</div>';
	newTr += '<div class="mater_name_bd" id="mater_name_bd_' + index + '" style="min-width: 10%;z-index:9999">';
	newTr += '<ul class="mater_name_list" id="goodsNameUl_' + index + '" >';
	newTr += $("#goodsNameUl_" + oldIndex).html();
	newTr += '</ul>';
	newTr += '<ul class="mater_name_list3" id="goodsNameUl2_' + index + '" style="display:none">';
	newTr += $("#goodsNameUl2_" + oldIndex).html();
	newTr += '</ul>';
	newTr += '<span class="new_mater"  onclick="showAddModel()">';
	newTr += '<img src="#{request.contextPath}/asset/images/stock/inventory/InventoryFile_add1.jpg" />新增物料';
	newTr += '</span>';
	newTr += '</div>';
	newTr += '</div>';
	newTr += '</td>';
	newTr += '<td class="td_line" id="levelNameTd_' + index + '">';
	newTr += '</td>';
	newTr += '<td class="td_line" id="sourceTd_' + index + '">';
	newTr += '</td>';
	newTr += '<td class="td_line" id="speciTd_' + index + '"></td>';
	newTr += '<td class="td_line" id="inStockNumTd_' + index + '" >';
	newTr += '<input type="text" class="form-control" style="text-align:center;display:none" value="" onfocus="oldValue(this);" onkeyup="clearNoNum(this,1);" onblur="calculateOnePrice(this)" maxlength="10"/>';
	newTr += '</td>';
	newTr += '<td class="td_line" id="weightTd_' + index + '">';
	newTr += '<input type="text" class="form-control"  name="total_weight"  style="text-align:center;display:none" value="" onfocus="oldValue(this);" onkeyup="clearNoNum(this,2);" onblur="calculateWeight()" maxlength="10"/>';
	newTr += '</td>';
	newTr += '<td class="td_line" id="shelfLifeTd_' + index + '">';
	newTr += '<input type="text" class="form-control" style="text-align:center;display:none" value="" onfocus="oldValue(this);" onkeyup="clearNoNum(this,3);" maxlength="9"/>';
	newTr += '</td>';
	newTr += '<td class="td_line" id="priceTd_' + index + '">';
	newTr += '<input type="text" class="form-control" style="text-align:center;display:none" value="" onfocus="oldValue(this);" onkeyup="clearNoNum(this,4);" onblur="calculateOnePrice(this)" maxlength="10"/>';
	newTr += '</td>';
	newTr += '<td class="td_line" id="totolPriceTd_' + index + '">';
	newTr += '<input type="text" class="form-control" name="total_price" style="text-align:center;display:none" value="" onfocus="oldValue(this);" onkeyup="clearNoNum(this,5);" onblur="calculatePrice()" maxlength="10"/>';
	newTr += '</td>';
	if(editId == ""){
		newTr += '<td class="td_line" id="batchTd_'+index+'" style="display:none"></td>';
		newTr += ' <td class="td_line" id="stockNumTd_'+index+'" style="display:none"></td>';
	}else{
		newTr += '<td class="td_line" id="batchTd_#{_index}" style="display:none"></td>';
		newTr += ' <td class="td_line" id="stockNumTd_'+index+'" style="display:none"></td>';
	}
	newTr += '<td class="td_line" id="goodsIdtd_' + index + '" style="display:none"></td>';
	newTr += '<td class="td_line" id="unitIdTd_' + index + '" style="display:none"></td>';
	newTr += '<td class="td_line" id="batchIdTd_' + index + '" style="display:none"></td>';
	newTr += '<td id="copyTd_' + index + '">';
	newTr += '<a class="icon_link" href="javascript:;" name="copGoods" style="display:none"  onclick="copyGoods(' + index + ')"><img src="/asset/images/stock/commons/tableIco_copy2.png" /></a>';
	newTr += '</td>';
	newTr += '<td id="delTd_' + index + '">';
	newTr += '<a class="icon_link" href="javascript:;" style="display:none" onclick="delGoods(' + index + ')"><img src="/asset/images/stock/commons/tableIco_delect2.png" /></a>';
	newTr += '</td>';
	newTr += '</tr>';
	$("#goodsTr_" + oldIndex).after(newTr);
	$("#searchAndSao_" + index).keydown(function(e){
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

function initGoodsNameComplete(){
	var inStockType = $("#inStockType").attr("myInStockTypeId");
	var goodsType = $("#goodsType").val();
	 $('.listtr').each(function(i){
		 //除了报损都显示物料名称列表
		 if( inStockType!="13"){
			 $("#mater_name_block_" + i).show();
		 }else{
			 if(goodsType == "1"){
				 $("#goodslevels_" + i).attr("disabled",true);
				 $("#shelfLifeTd_" + i).find("input").attr("readonly","readonly");
				 $("#priceTd_" + i).find("input").attr("readonly","readonly");
				 $("#totolPriceTd_" + i).find("input").attr("readonly","readonly");
			 }
		 }
		 //点击物料名称框显示列表
		 $("#searchAndSao_" + i).click(function(ev){
			var e = ev || event;
			if (e && e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
			$("#mater_name_bd_" + i).show();	
		});
	 });
	 keyInit();
	//计算总重量
	calculateWeight();
	//计算总价
	calculatePrice();
	 $('.selectpicker').selectpicker(); 
	
}

//初始化物料名称列表回调
function expList(data){
	//处理选择的物料json
	if(data.goods_id != null){
		var goods = eval(data);
		jsonToAddGoods(goods);
		//如果添加的是最后一行，则添加一个
		var index = goods.num;
		var trNum = $("#goodsTable").find("tr.listtr").length;//现有行数
		if(index == (trNum - 1)){//如果空行正好是最后一行则添加一行新的
			newTableTr(index);
		}
	}else{
		alert("没有查询到改物料信息");
		return false;
	}
	
	/*$("#mydialog").hide();*/
	var inStockType = $("#inStockType").attr("myInStockTypeId");
	var goodsType = $("#goodsType").val();
	 $('.listtr').each(function(i){
		 //除了报损都显示物料名称列表
		 if( inStockType!="13"){
			 $("#mater_name_block_" + i).show();
		 }else{
			 if(goodsType == "1"){
				 $("#goodslevels_" + i).attr("disabled",true);
				 $("#shelfLifeTd_" + i).find("input").attr("readonly","readonly");
				 $("#priceTd_" + i).find("input").attr("readonly","readonly");
				 $("#totolPriceTd_" + i).find("input").attr("readonly","readonly");
			 }
		 }
		 //点击物料名称框显示列表
		 $("#searchAndSao_" + i).click(function(ev){
			var e = ev || event;
			if (e && e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
			$("#mater_name_bd_" + i).show();	
		});
	 });
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
	//计算总重量
	calculateWeight();
	//计算总价
	calculatePrice();
	//keyInit();
	sessionStorage.setItem("inStorage_goodsJson", getGoodsJson());
	
}

//得到焦点时保存原始包装数量值
function oldValue(obj){
	oldVal=obj.value;
}
//验证填写数据是否为数字,非数字清除
function clearNoNum(obj,num){
	if(num==1){//判断入库量是否为数字
		if($(obj).val() == ""){
			alert("请输入数字！"); 
			$(obj).val("1");
		 }else{
			 if(isNaN($(obj).val())){
				 alert("请输入数字！"); 
				 $(obj).val("1");
			 }
		 }
	}else if(num==2){
		if($(obj).val() == ""){
			alert("请输入数字！"); 
			$(obj).val("0.0");
		 }else{
			 if(isNaN($(obj).val())){
				 alert("请输入数字！"); 
				 $(obj).val("0.0");
			 }
		 }
		
	}else if(num==3){
		if($(obj).val() == ""){
			alert("请输入数字！"); 
			$(obj).val("1");
		 }else{
			 if(isNaN($(obj).val())){
				 alert("请输入数字！"); 
				 $(obj).val("1");
			 }else{
				 if(Number($(obj).val()) % 1 != 0){
					 alert("请输入整数！"); 
					 $(obj).val("1");
				 }
			 }
		 }
	}else if(num==4){
		if($(obj).val() == ""){
			alert("请输入数字！"); 
			$(obj).val("0.0");
		 }else{
			 if(isNaN($(obj).val())){
				 alert("请输入数字！"); 
				 $(obj).val("0.0");
			 }
		 }
	}else if(num==5){
		if($(obj).val() == ""){
			alert("请输入数字！"); 
			$(obj).val("0.0");
		 }else{
			 if(isNaN($(obj).val())){
				 alert("请输入数字！"); 
				 $(obj).val("0.0");
			 }
		 }
		
	}
}

//计算总重量
function calculateWeight(){
	var totalWeight = 0;
	$("tr.listtr").each(function(i){
		if($("#goodsIdtd_" + i).html() != ""){
			var weight = $("#weightTd_" + i).find("input").val();
			totalWeight += parseFloat(weight);
		}
	});
	$("#allWeight").html(totalWeight.toFixed(3));
	sessionStorage.setItem("inStorage_goodsJson", getGoodsJson());
}

//计算总价
function calculatePrice(){
	var totalPrice = 0;
	$("tr.listtr").each(function(i){
		if($("#goodsIdtd_" + i).html() != ""){
			var price = $("#totolPriceTd_" + i).find("input").val();
			totalPrice += parseFloat(price);
		}
	});
	$("#allPrice").html(totalPrice.toFixed(2));
	sessionStorage.setItem("inStorage_goodsJson", getGoodsJson());
}

//计算单个批次总价
function calculateOnePrice(obj){
	var objId = $(obj).parent().attr("id");
	var index = objId.substring(objId.indexOf("_")+1,objId.length);
	var num = $("#inStockNumTd_" + index).find("input").val();
	var price = $("#priceTd_" + index).find("input").val();
	$("#totolPriceTd_" + index).find("input").val(parseFloat(num) * parseFloat(price));
	calculatePrice();
}

//保存保质期
function saveSelfList(){
	sessionStorage.setItem("inStorage_goodsJson", getGoodsJson());
}

function changeLevel(obj){
	var levelId = $(obj).val();
	var selectedId = $(obj).attr("id");
	var index = selectedId.substring(selectedId.indexOf("_")+1,selectedId.length);
	var price = 0.0;
	var stockNum = 0.0;
	var inNum = $("#inStockNumTd_" + index).find("input").val();
	var batchHtml = "";
	var batchSel = "<select id='batchSel_" + index + "' class='selectpicker' multiple='multiple'>";
	var batchLi = "<div style='display:none' class='batchone'>";
	var defaultBatch = 0;
	$(obj).parent().find("li.levelli").each(function(){
		if($(this).attr("levelid") == levelId){
			price = $(this).attr("levelprice");
			stockNum = $(this).attr("stocknum");
			$(this).find("li").each(function(i){
				var batchId= $(this).attr("batchid");
				var batchCode = $(this).html();
				batchSel += "<option value='" + batchId + "'>" + batchCode + "</option>";
				batchLi += "<li class='batchli' batchid='" + batchId + "'>" + batchCode + "</li>";
				if(i == 0){
					defaultBatch = batchId;
				}
			});
			return;
		}
	});
	batchSel += "</select>";
	batchLi += "</ul>";
	batchLi += "</div>";
	batchHtml = batchSel + batchLi;
	$("#batchTd_" + index).html(batchHtml);
	if(price == ""){
		price = 0.0;
	}
	var totalPrice = parseFloat(price) * parseFloat(inNum);
	$("#priceTd_" + index).find("input").val(parseFloat(price).toFixed(2));
	$("#totolPriceTd_" + index).find("input").val(totalPrice.toFixed(2));
	$("#stockNumTd_" + index).html(parseFloat(stockNum).toFixed(3));
	$('.selectpicker').selectpicker(); 
	$("#batchSel_" + index).selectpicker("val",Number(defaultBatch));
	sessionStorage.setItem("inStorage_goodsJson", getGoodsJson());
}

//改变来源
function changeTunnel(){
	sessionStorage.setItem("inStorage_goodsJson", getGoodsJson());
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
		//计算总重量
		calculateWeight();
		//计算总价
		calculatePrice();
		sessionStorage.setItem("inStorage_goodsJson", getGoodsJson());
	}
} 

//弹出框添加物料，获取页面json
function getModelJson(){
	//获取页面的数据json
	var goodsInfoOld = '{"goodsList":[';
	$("tr.model_tr").each(function(i){
		if($("#selectGoods_" + i).is(':checked')){
			var goodsId = $("#model_goodId_" + i).html();
			var goodCode = $("#model_goodsCode_" + i).html();
			var goodsName = $("#model_goodsName_" + i).html();
			var level = '';//等级 如果为--则为无
			var levelList = '';//等级列表
			if($("#model_goodLevel_" + i).html() != ""){
				levelList += '"level_list":[';
				$("#model_goodLevel_" + i).find("li").each(function(j){
					var id = $(this).attr("levelid");
					if(j == 0){
						level = id;
					}
					var levelBatchList = 'batch_list:[';
					$(this).find("span").each(function(){
						var batchId = $(this).attr("batchid");
						var batchCode = $(this).html();
						levelBatchList += '{"batch_id":"' + batchId + '",';
						levelBatchList += '"batch_code":"' + batchCode + '"},';
					});
					levelBatchList = levelBatchList.substring(0, levelBatchList.length-1);
					levelBatchList += ']';
					var price = $(this).attr("price");
					var levelName = $(this).attr("levelname");
					var stocknum = $(this).attr("stocknum").trim();
					levelList += '{"level_id":"' + id + '",';
					levelList += '"level_price":"' + price + '",';
					levelList += '"stock_num":"' + stocknum + '",';
					levelList += levelBatchList + ',';
					levelList += '"level_name":"' + levelName + '"},';
				});
				levelList = levelList.substring(0, levelList.length-1);
				levelList += ']';
			}else{
				levelList = '"level_list":""';//等级列表
			}
			var source = '';//来源
			var sourceList = '';
			if($("#model_source_" + i).html() != ""){
				sourceList += '"source_list":[';
				$("#model_source_" + i).find("li").each(function(s){
					var id = $(this).attr("sourceid");
					if(s == 0){
						source = id;
					}
					var sourceName = $(this).html();
					sourceList += '{"source_id":"' + id + '",';
					sourceList += '"source_name":"' + sourceName + '"},';
				});
				sourceList = sourceList.substring(0, sourceList.length-1);
				sourceList += ']';
			}else{
				sourceList = '"source_list":""';
			}
			var goodsSpec = $("#model_goodSpec_" + i).html();
			var inStockNum = $("#model_inNum_" + i).html();
			var totalWeight = $("#model_weight_" + i).html();
			var shelfLife = $("#model_shelfLife_" + i).html();
			var unitPrice = $("#model_unitPrice_" + i).html();
			var totalPrice = $("#model_totalPrice_" + i).html();
			var unitId = $("#model_unitId_" + i).html();
			var batchList = '';
			if($("#model_owebatcList_" + i).html() != ""){
				batchList += '"batch_list":[';
				$("#model_owebatcList_" + i).find("li").each(function(){
					var id = $(this).attr("batchId");
					var batchCode = $(this).html();
					batchList += '{"batch_id":"' + id + '",';
					batchList += '"batch_code":"' + batchCode + '"},';
				});
				batchList = batchList.substring(0, batchList.length-1);
				batchList += ']';
			}else{
				batchList = '"batch_list":""';
			}
			var stockNum = $("#model_stockNum_" + i).html().trim();
			goodsInfoOld += '{"num":"' + i + '",';
			goodsInfoOld += '"goods_id":"' + goodsId + '",';
			goodsInfoOld += '"goods_code":"' + goodCode + '",';
			goodsInfoOld += '"goods_name":"' + goodsName + '",';
			goodsInfoOld += '"unit_id":"' + unitId + '",';
			goodsInfoOld += '"level_id":"' + level + '",';
			goodsInfoOld += '"source_id":"' + source + '",';
			goodsInfoOld += '"goods_spec":"' + goodsSpec + '",';
			goodsInfoOld += '"in_num":"' + inStockNum + '",';
			goodsInfoOld += '"total_weight":"' + totalWeight + '",';
			goodsInfoOld += '"shelf_life":"' + shelfLife + '",';
			goodsInfoOld += '"unit_price":"' + unitPrice + '",';
			goodsInfoOld += '"total_price":"' + totalPrice + '",';
			goodsInfoOld += levelList + ',';
			goodsInfoOld += sourceList + ',';
			goodsInfoOld += batchList + ',';
			goodsInfoOld += '"stock_num":"' + stockNum + '"},';
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




//获取页面的数据json
function getGoodsJson(){
	var goodsInfoOld = '{"goodsList":[';
	$("tr.listtr").each(function(){
		var numTdId = $(this).find("td:first-child").attr("id");
		var i = numTdId.substring(6,numTdId.length);
		var number = $("#numTd_" + i).html();
		var goodsId = $("#goodsIdtd_" + i).html();
		var goodCode = $("#goodsCodeTd_" + i).html();
		var goodsName = $("#searchAndSao_" + i).val();
		var unitId = $("#unitIdTd_" + i).html();
		var batchId = $("#batchIdTd_" + i).html();
		var level = '';//等级 如果为--则为无
		var levelList = '';//等级列表
		if($("#levelNameTd_" + i).html().trim() != "--" && $("#levelNameTd_" + i).html().trim() != ""){
			level = $("#goodslevels_" + i).val();
			levelList += '"levelList":[';
			$("#levelNameTd_" + i).find("li.levelli").each(function(){
				var id = $(this).attr("levelid");
				var price = $(this).attr("levelprice");
				var levelName = $(this).attr("levelname");
				var stockNum = $(this).attr("stocknum");
				var levelBatchList = '"batch_list":[';
				$(this).find("li").each(function(){
					var batchId = $(this).attr("batchid");
					var batchCode = $(this).html();
					levelBatchList += '{"batch_id":"' + batchId + '",';
					levelBatchList += '"batch_code":"' + batchCode + '"},';
				});
				if(levelBatchList != '"batch_list":['){
					levelBatchList = levelBatchList.substring(0, levelBatchList.length-1);
				}
				levelBatchList += ']';
				levelList += '{"id":"' + id + '",';
				levelList += '"price":"' + price + '",';
				levelList += '"stockNum":"' + stockNum + '",';
				levelList += levelBatchList + ',';
				levelList += '"levelName":"' + levelName + '"},';
			});
			levelList = levelList.substring(0, levelList.length-1);
			levelList += ']';
		}else{
			levelList = '"levelList":null';//等级列表
		}
		var source = '';//来源
		var sourceList = '';
		if($("#sourceTd_" + i).html().trim() != "" && $("#sourceTd_" + i).html().trim() != "--"){
			source = $("#goodsSource_" + i).val();
			sourceList += '"sourceList":[';
			$("#sourceTd_" + i).find("li.sourceli").each(function(){
				var id = $(this).attr("sourceid");
				var sourceName = $(this).html();
				sourceList += '{"id":"' + id + '",';
				sourceList += '"sourceName":"' + sourceName + '"},';
			});
			sourceList = sourceList.substring(0, sourceList.length-1);
			sourceList += ']';
		}else{
			sourceList = '"sourceList":null';
		}
		var goodsSpec = $("#speciTd_" + i).html();
		var inStockNum = "";
		if($("#inStockNumTd_" + i).html() == ""){
			inStockNum = "";
		}else{
			inStockNum = $("#inStockNumTd_" + i).find("input").val();
		}
		var totalWeight = "";
		if($("#weightTd_" + i).html() == ""){
			totalWeight = "";
		}else{
			totalWeight = $("#weightTd_" + i).find("input").val();
		}
		var shelfLife = "";
		if($("#shelfLifeTd_" + i).html() == ""){
			shelfLife = "";
		}else{
			shelfLife = $("#shelfLifeTd_" + i).find("input").val();
		}
		var unitPrice = "";
		if($("#priceTd_" + i).html() == ""){
			unitPrice = "";
		}else{
			unitPrice = $("#priceTd_" + i).find("input").val();
		}
		var totalPrice = "";
		if($("#totolPriceTd_" + i).html() == ""){
			totalPrice = "";
		}else{
			totalPrice = $("#totolPriceTd_" + i).find("input").val();
		}
		var batchIds = "";
		var batchList = "";
		if($("#batchTd_" + i).html() != "" && $("#batchTd_" + i).html()!= "--"){
			batchIds = $("#batchSel_" + i).val();
			if(batchIds == null ){
				batchIds = "";
			}
			batchList += '"batchList":[';
			$("#batchTd_" + i).find("li.batchli").each(function(){
				var id = $(this).attr("batchid");
				var batchCode = $(this).html();
				batchList += '{"id":"' + id + '",';
				batchList += '"batch_code":"' + batchCode + '"},';
			});
			if(batchList != '"batchList":['){
				batchList = batchList.substring(0, batchList.length-1);
			}
			batchList += ']';
		}else{
			batchList = '"batchList":null';
		}
		var stockNum = $("#stockNumTd_" + i).html().trim();
		goodsInfoOld += '{"num":"' + number + '",';
		goodsInfoOld += '"goods_id":"' + goodsId + '",';
		goodsInfoOld += '"good_code":"' + goodCode + '",';
		goodsInfoOld += '"good_name":"' + goodsName + '",';
		goodsInfoOld += '"level_id":"' + level + '",';
		goodsInfoOld += '"source_id":"' + source + '",';
		goodsInfoOld += '"unit_id":"' + unitId + '",';
		goodsInfoOld += '"batch_id":"' + batchId + '",';
		goodsInfoOld += '"goods_spec":"' + goodsSpec + '",';
		goodsInfoOld += '"in_num":"' + inStockNum + '",';
		goodsInfoOld += '"total_weight":"' + totalWeight + '",';
		goodsInfoOld += '"shelf_life":"' + shelfLife + '",';
		goodsInfoOld += '"unit_price":"' + unitPrice + '",';
		goodsInfoOld += '"total_price":"' + totalPrice + '",';
		goodsInfoOld += '"stock_num":"' + stockNum + '",';
		goodsInfoOld += levelList + ",";
		goodsInfoOld += sourceList + ",";
		goodsInfoOld += '"batch_val":"' + batchIds + '",';
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


//获取物料下拉列表json
function getGoodsUlJson(){
	var json = '{"goods_ul":[';
	$("#goodsNameUl2_0").find("li").each(function(i){
		var goodsId = $(this).attr("myattr");
		var goodsName = $(this).html();
		json += '{"goods_id":"' + goodsId + '",';
		json += '"goods_name":"' + goodsName + '"},';
	});
	json = json.substring(0, json.length-1);
	json += "]}";
	return json;
}

//添加
function submitSave(){
	var goodsType = $("#goodsType").val();
	var inStockType = $("#inStockType").attr("myInStockTypeId");
	var purchaseId = $("#purchaseId").val();
	var outStockCode = $("#outStockCode").val();
	var storageRoom = $("#storageRoom").val();
	var operator = $("#operator").val();
	var inStorageTime = $("#inStorageTime").val();
	var inStorageDate = new Date(Date.parse(inStorageTime.replace(/-/g, "/"))); 
	var comments = $("#comments").val().trim();
	var goodsInfoOld = getGoodsJson();
	var flag = false;
	$("#goodsTable").find('tr.listtr').each(function(i){
		var goodsId = $("#goodsIdtd_" + i).html();
		if(goodsId!=""){
			flag=true;
			return;
		}
	});
	if(!flag){
		alert("至少选择一条物料");
		return;
	}
	if(inStockType == '11'){
		if(purchaseId==null || purchaseId == "-1"){
			alert("请选择供应商");
			return;
		}
	}else if(inStockType == '13'){
		if(outStockCode==null || outStockCode == "-1"){
			alert("请选择出库编码");
			return;
		}
	}

	if(goodsType == null || goodsType=="-1"){
		alert("请选择物料类型");
		return;
	}
	if(storageRoom == null || storageRoom=="-1"){
		alert("请选择仓库");
		return;
	}
	if(inStorageTime == null || inStorageTime==""){
		alert("请选择入库日期");
		return;
	}
	if(inStorageDate>new Date()){
		alert("入库时间不能大于当前时间");
		return ;
	}
	if(comments.length>200){
		alert("备注不能大于200个汉字");
		return;
	}
	var f = false;
	$("#goodsTable").find('tr.listtr').each(function(i){
		var goodsId = $("#goodsIdtd_" + i).html();
		if(goodsId!=""){
			var totalPrice = parseFloat($("#totolPriceTd_" + i).find("input").val());
			if(totalPrice >= 10000000000){
				alert("总价不得大于10位数");
				f = false;
				return;
			}
		}
	});
	if(f){
		return;
	}
	$("#add\\:goodsType").val(goodsType);
	$("#add\\:inStockType").val(inStockType);
	$("#add\\:purchase").val(purchaseId);
	$("#add\\:outStockCode").val(outStockCode);
	$("#add\\:storageRoomId").val(storageRoom);
	$("#add\\:operater").val(operator);
	$("#add\\:storageDate").val(inStorageTime);
	$("#add\\:comment").val(comments);
	$("#add\\:goodsJsonOld").val(goodsInfoOld);
	$("#add\\:commit").click();
	$("#submitButton").attr("disabled",true);
	
}
//编辑保存
function editSave(){
	var goodsType = $("#goodsType").val();
	var inStockType = $("#inStockType").attr("myInStockTypeId");
	var purchaseId = $("#purchaseId").val();
	var outStockCode = $("#outStockCode").val();
	var storageRoom = $("#storageRoom").val();
	var operator = $("#operator").val();
	var inStorageTime = $("#inStorageTime").val();
	var inStorageDate = new Date(Date.parse(inStorageTime.replace(/-/g, "/"))); 
	var comments = $("#comments").val().trim();
	var goodsInfoOld = getGoodsJson();
	var flag = false;
	$("#goodsTable").find('tr.listtr').each(function(i){
		var goodsId = $("#goodsIdtd_" + i).html();
		if(goodsId!=""){
			flag=true;
			return;
		}
	});
	if(!flag){
		alert("至少选择一条物料");
		return;
	}
	if(inStockType == '11'){
		if(purchaseId==null || purchaseId == "-1"){
			alert("请选择供应商");
			return;
		}
	}
	if(goodsType == null || goodsType=="-1"){
		alert("请选择物料类型");
		return;
	}
	if(storageRoom == null || storageRoom=="-1"){
		alert("请选择仓库");
		return;
	}
	if(inStorageTime == null || inStorageTime==""){
		alert("请选择入库日期");
		return;
	}
	if(inStorageDate>new Date()){
		alert("入库时间不能大于当前时间");
		return ;
	}
	if(comments.length>200){
		alert("备注不能大于200个汉字");
		return;
	}
	var f = false;
	$("#goodsTable").find('tr.listtr').each(function(i){
		var goodsId = $("#goodsIdtd_" + i).html();
		if(goodsId!=""){
			var totalPrice = parseFloat($("#totolPriceTd_" + i).find("input").val());
			if(totalPrice >= 10000000000){
				alert("总价不得大于10位数");
				f = false;
				return;
			}
		}
	});
	if(f){
		return;
	}
	$("#save\\:goodsTypeEdit").val(goodsType);
	$("#save\\:inStockTypeEdit").val(inStockType);
	$("#save\\:purchaseEdit").val(purchaseId);
	$("#save\\:outStockCodeEdit").val(outStockCode);
	$("#save\\:storageRoomIdEdit").val(storageRoom);
	$("#save\\:operaterEdit").val(operator);
	$("#save\\:storageDateEdit").val(inStorageTime);
	$("#save\\:commentEdit").val(comments);
	$("#save\\:goodsJsonOldEdit").val(goodsInfoOld);
	$("#save\\:update").click();
	$("#updateButton").attr("disabled",true);
}
function KeyDown(){    
if (event.keyCode == 13){     
    event.returnValue=false;        
 }
}

function clacImgZoomParam1( maxWidth, maxHeight, width, height ){
    var param = {top:0, left:0, width:maxWidth, height:maxHeight};
    return param;
}
  function removeMe1(data){
		$(data).removeAttr("onclick");
		$(data).val("");
	}
  
  //获取当前时间
  function getNowDate(){
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
		var seconds = date.getSeconds();
		if(seconds >=0 && seconds <=9){
			seconds ="0"+seconds;
		}
		var currentDate = date.getFullYear() + seperator1 + month + seperator1 + strDate +" " + date.getHours() + seperator2 + minutes + seperator2 + seconds;
		return currentDate;
  }

//新增辅料
//图片上传
//原料图片上传
function previewImage2(file){
    var MAXWIDTH  = 150; 
    var MAXHEIGHT = 140;
    var div = document.getElementById('preview2');
    if (file.files && file.files[0]){
        div.innerHTML ='<img id=imghead2>';
        var img = document.getElementById('imghead2');
        img.onload = function(){
          var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
          img.width  =  rect.width;
          img.height =  rect.height;
//           img.style.marginLeft = rect.left+'px';
          img.style.marginTop = rect.top+'px';
        }
        var reader = new FileReader();
        reader.onload = function(evt){img.src = evt.target.result;}
        reader.readAsDataURL(file.files[0]);
    }else{//兼容IE
      var sFilter='filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src="';
      file.select();
      file.blur();
      var src = document.selection.createRange().text;
      div.innerHTML = '<img id=imghead2>';
      var img = document.getElementById('imghead2');
      //img.filters.item('DXImageTransform.Microsoft.AlphaImageLoader').src = src;
      img.src = src;
      var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
      status =('rect:'+rect.top+','+rect.left+','+rect.width+','+rect.height);
      div.innerHTML = "<div id=divhead2 style='width:"+MAXWIDTH+"px;height:"+MAXHEIGHT+"px;"+sFilter+src+"\"'></div>";
      //alert(jquery("#preview").html());
    }
    $("#uploadMsg2").html(name);
    $("#inputsImages\\:insertImages").click();
  }


//物料名称输入框级联查询功能
function searchLi(obj,event,num){
	var code=event.keyCode;
	var inVal = jQuery.trim($(obj).val());
	if(code!=40 && code!=38 ){
		var val="";
		$(obj).parent().next().find(".mater_name_list").empty();
		$(obj).parent().next().find(".mater_name_list3 li").each(function(i){
			var liTextVal=$(this).text().replace($(this).find(":first").text(),"");
			if(inVal!=""){
				if(liTextVal.indexOf(inVal)>=0){
					val +="<li name='goodsNameLi' onclick='selectGoods(this)' calss='material_li material_li_"+(i+1)+"' myattr='"+$(this).attr("myattr")+"'>";
					val +=$(this).html();
					val +="</li>";
				}
			}else{
				val +="<li name='goodsNameLi' onclick='selectGoods(this)' calss='material_li material_li_"+(i+1)+"' myattr='"+$(this).attr("myattr")+"'>";
				val +=$(this).html();
				val +="</li>";
			}
			
		});
		if(val == ""){
			val+="<li disabled='disabled'>无</li>";
		}
		$(obj).parent().next().find(".mater_name_list").append(val);
		$(obj).parent().parent().find('div[name="mater_name_bd"]').show();
	}else if((code==40 || code==38) && num==2){
		var val="";
		$(obj).parent().next().find(".mater_name_list").empty();
		$(obj).parent().next().find(".mater_name_list3 li").each(function(i){
			var liTextVal=$(this).text().replace($(this).find(":first").text(),"");
			if(inVal!=""){
				if(liTextVal.indexOf(inVal)>=0){
					val +="<li name='goodsNameLi' onclick='selectGoods(this)' calss='material_li material_li_"+(i+1)+"' myattr='"+$(this).attr("myattr")+"'>";
					val +=$(this).html();
					val +="</li>";
				}
			}else{
				val +="<li name='goodsNameLi' onclick='selectGoods(this)' calss='material_li material_li_"+(i+1)+"' myattr='"+$(this).attr("myattr")+"'>";
				val +=$(this).html();
				val +="</li>";
			}
			
		});
		$(obj).parent().next().find(".mater_name_list").append(val);
		$(this).parent().parent().find('div[name="mater_name_bd"]').show();
	}
}


function clearpage(){
	$("#login").modal("show");
	setInStockType("-1");
	$("#operator").selectpicker("val","-1");
	$("#supplierdiv").hide();
	$("#outStockdiv").hide();
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
	$("#inStorageTime").val(currentDate);
	$("#comments").val("");
	$("#goodsType").selectpicker("val","-1");
	$("#storageRoom").selectpicker("val","-1");
	$("#allWeight").html("0");
	$("#allPrice").html("0");
	//清除本地存储
	sessionStorage.clear();
	sessionStorage.setItem("inStorage_inStorageDate", currentDate);
	initInstorageList();
}
function clearComplete(){
	$("#login").modal("hide");
}
function outStorageToInner(){
	var goodsType = $("#goodsType").val();
	var storeType = $("#inStockType").attr("myInStockTypeId");
	var storageChangeFormId = $("#outStockCode").val();
	if(storageChangeFormId != '-1'){
		outStorageInStock(goodsType,storeType,storageChangeFormId);
	}
	//本地存储用于页面刷新回显
	sessionStorage.setItem("inStorage_outStockCode", storageChangeFormId);
}


//页面初始化键盘上下键操作
function keyInit(){
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
	if($(obj).parent().next().find("li[name='goodsNameLi']").hasClass("addbg")){
		 $(obj).parent().next().find(".addbg").click();
    }else{
	   	 if(!flag){
	   		goodsInfoCode = $(obj).val();
    		var num = $(obj).parent().parent().parent().parent().find("td:first-child").html();
    		var goodsType = $("#goodsType").val();
    		var storageType = $("#inStockType").attr("myInStockTypeId");
    		findGoodsInfo(goodsType,storageType,num,goodsInfoCode);
	   	 }else{
	   		$(obj).val("");
	   	 }
    }
   
};


function inStockTypeLiClick(obj){
	var InStockTypeId = $(obj).attr("myId");
	var InStockTypeName = $(obj).html();
	$(obj).parent().find("li").each(function(){
		$(this).removeClass("selected");
	});
	$(obj).addClass("selected");
	$("#inStockType").html(InStockTypeName);
	$("#inStockType").attr("myInStockTypeId",InStockTypeId);
	
	var goodsType = $("#goodsType").val();
	var inStockType = InStockTypeId;
	$("#outStockdiv").hide();
	$("#supplierdiv").hide();
	if(inStockType=='11'){
		$("#supplierdiv").show();
		$("#outStockdiv").hide();
	}else if(inStockType=='13'){
		if(goodsType=='-1'){
			setInStockType(-1);
			alert("请先选择物料类型");
		}else{
			$("#goodsTable").find('input[name="searchAndSao"]').each(function(){
				$(this).attr("disabled","disabled");
			});
			$("#addButton").attr("disabled",true);
			initOutStockCode(goodsType);
		}
	}
	if(inStockType=='12' && goodsType=='4'){
		$('goodsType').selectpicker("val",-1);
	}
	if(goodsType!="-1" && inStockType!="-1" ){
		 if(inStockType!="13"){
			 $("#addButton").attr("disabled",false);
			 $('input[name="searchAndSao"]').removeAttr("disabled");
		 }
		 var scandCodeFlag = 0;
		if($("#scandCodeSwitch").hasClass("scan_no")){
			scandCodeFlag = 0;
		}else{
			scandCodeFlag = 1;
		}
		initGoodsNameList(goodsType,inStockType,scandCodeFlag);
	}else{
		//选择物料类型和入库类型后才能点击物料名称
		$('div.mater_name_block').hide();
		$("#addButton").attr("disabled",'disabled');
		$('.listtr').each(function(i){
			if($("#goodsIdtd_" + i).html() != ""){
				clearTr(i);
			}
		});
	}
	//本地存储用于页面刷新回显
	sessionStorage.setItem("inStorage_goodsType", goodsType);
	sessionStorage.setItem("inStorage_instorageType", $("#inStockType").attr("myInStockTypeId"));
	sessionStorage.setItem("inStorage_storageRoomId", $("#storageRoom").val());
}

//供应商改变
function purchaseChange(){
	var purchaseId = $("#purchaseId").val();
	//本地存储用于页面刷新回显
	sessionStorage.setItem("inStorage_purchaseId", purchaseId);
}
function setInStockType(val){
	$("#inStockTypeUl").find("li").each(function(){
		$(this).removeClass("selected");
		if($(this).attr("myId") == val){
			$(this).addClass("selected");
			$("#inStockType").attr("myInStockTypeId",val);
			$("#inStockType").html($(this).html());
		}
	});
}

function inStockTypeModel(){
	$("#inStockTypeAddName").val("");
	$("#inStockTypeDesc").val("");
	$("#addInStockTypeDiv").show();
}

function submitInStockType(){
	var inStockTypeName = $("#inStockTypeAddName").val();
	var inStockTypeDesc = $("#inStockTypeDesc").val().trim();
	var goodsType = $("#goodsType").val();
	var storeType = $("#inStockType").attr("myInStockTypeId");
	if(inStockTypeName == ""){
		alert("请输入入库类型名称");
		return;
	}
	if(inStockTypeDesc != "" && inStockTypeDesc.length>200){
		alert("入库类型描述不能超多200字");
		return;
	}
	addInStockType(inStockTypeName,inStockTypeDesc,goodsType,storeType);
}

function addInStockTypeComplete(){
	$("#buttonCancel").trigger("click");
	var inStorageType = $("#addBeforeId").val();
	setInStockType(inStorageType);
}

//刷新页面回显（本地存储中读取数据）
function refreshPage(){
	//需要走后台的
	var goodsType = sessionStorage.getItem("inStorage_goodsType");
	var outStockCode = sessionStorage.getItem("inStorage_outStockCode");
	var storageRoomId = sessionStorage.getItem("inStorage_storageRoomId");
	var goodsJsonOld = sessionStorage.getItem("inStorage_goodsJson");
	var scanCodeFlag = sessionStorage.getItem("inStorage_scanCodeFlag");
	//不用走后台
	var InStorageType = sessionStorage.getItem("inStorage_instorageType");
	var purchaseId = sessionStorage.getItem("inStorage_purchaseId");
	var operatorId = sessionStorage.getItem("inStorage_operatorId");
	var inStorageDate = sessionStorage.getItem("inStorage_inStorageDate");
	var comments = sessionStorage.getItem("inStorage_comments");
	if(goodsType != null && InStorageType != null && InStorageType != "-1" && goodsType != "-1"){
		$("#addButton").attr("disabled",false);
	}
	if(InStorageType != null){
		setInStockType(InStorageType);
	}
	if(purchaseId != null){
		$("#purchaseId").selectpicker("val",purchaseId);
		
	}
	if(InStorageType == "11"){
		$("#supplierdiv").show();
	}else if(InStorageType == "13"){
		$("#outStockdiv").show();
	}
	if(operatorId != null){
		$("#operator").selectpicker("val",operatorId);
	}
	if(inStorageDate != null){
		$("#inStorageTime").val(inStorageDate);
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
		$("#inStorageTime").val(currentDate);
	}
	if(operatorId != null){
		$("#operator").selectpicker("val",operatorId);
	}
	if(comments != null){
		$("#comments").val(comments);
	}else{
		$("#comments").val("暂无备注信息");
	}
	if(scanCodeFlag != null &&  scanCodeFlag == "1" ){
		$("#scandCodeSwitch").removeClass("scanNo");	
	}else if(scanCodeFlag != null &&  scanCodeFlag == "0" ){	
		$("#scandCodeSwitch").addClass("scanNo");
	}
	if($("#storageChangeFormIdEdit").val() == ""){
		if(goodsType == null && InStorageType == null && purchaseId == null && outStockCode == null && storageRoomId == null 
				&& operatorId == null && inStorageDate == null && comments == null){
			if(stockEchoFlag == "true"){
				inventoryMemory();
			}
		}else{
			if((goodsType!=null && goodsType!="-1") || (InStorageType!=null&& InStorageType!="-1") || (outStockCode!=null&& outStockCode!="-1") || (storageRoomId!=null&& storageRoomId!="-1")  ){
				if(goodsType == null ){
					goodsType = "-1";
				}
				if(InStorageType == null ){
					InStorageType = "-1";
				}
				if(storageRoomId == null ){
					storageRoomId = "-1";
				}
				if(outStockCode == null ){
					outStockCode = "-1";
				}
				if(goodsJsonOld == null){
					goodsJsonOld = "";
				}
				if(scanCodeFlag == null ){
					scanCodeFlag = 0;
				}
				$("#login").modal("show");
				pageEcho(goodsType,InStorageType,storageRoomId,outStockCode,goodsJsonOld,scanCodeFlag);
			}
		}
	}
}
//页面回显回调
function pageEchoComplete(data){
	var jsonStr = data;
	var inStockType = $("#inStockType").attr("myInStockTypeId");
	var goodsType = $("#goodsType").val();
	if(goodsType != "-1"){
		$("#storageRoom").removeAttr('disabled');
		$("#storageRoom").find("button").removeClass('disabled ');
		$("#storageRoom").find("li").removeClass('disabled');
	}
	 $('.listtr').each(function(i){
		 //除了报损都显示物料名称列表
		 if( inStockType!="13"){
			 $("#mater_name_block_" + i).show();
		 }else{
			 if(goodsType == "1"){
				 $("#goodslevels_" + i).attr("disabled",true);
				 $("#shelfLifeTd_" + i).find("input").attr("readonly","readonly");
				 $("#priceTd_" + i).find("input").attr("readonly","readonly");
				 $("#totolPriceTd_" + i).find("input").attr("readonly","readonly");
			 }
		 }
		 //点击物料名称框显示列表
		 $("#searchAndSao_" + i).click(function(ev){
			var e = ev || event;
			if (e && e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
			$("#mater_name_bd_" + i).show();	
		});
	 });
	
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
	
	//计算总重量
	calculateWeight();
	//计算总价
	calculatePrice();
	keyInit();
	$('.selectpicker').selectpicker(); 
	//勾选负库存批次
	var json = eval('(' + jsonStr + ')');
	var goodsList = json.goodsList;
	var size = goodsList.length;
	for(var i=0;i<size;i++){
		var goods = goodsList[i];
		var batchVal = goods.batch_val;
		var index = Number(goods.num) - 1;
		if(batchVal != ""){
			/*var batchValArr = batchVal.split(",");
			$("#batchSel_" + index).selectpicker("val",batchValArr);*/
			if(batchVal.indexOf(",") > 0){
				var batchValArr = batchVal.split(",");
				$("#batchSel_" + index).selectpicker("val",batchValArr);
			}else{
				$("#batchSel_" + index).selectpicker("val",Number(batchVal));
			}
		}
	}
	$('.selectpicker').selectpicker(); 
	$("#login").modal("hide");
	
}
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
function isInteger(obj){
	return obj%1 === 0;
}


//库存记忆功能回调
function stockEchoComplete(data){
	$('.selectpicker').selectpicker(); 
	var id = data.storageChangeFormId;
	var goodsType = data.productType;
	var InStorageType = data.storageChangeTypeId.storageChangeTypeId;
	var operatorId = data.operater.farmerInfoId;
	var storageRoomId = data.storageRoom.storageRoomId;
	var purchaseId = data.purchaseMemberInfoId;
	var inStorageDate = data.name;
	var comments = data.comment;
	if(id != -1){
		if(InStorageType != null){
			setInStockType(InStorageType);
		}
		if(purchaseId != null && purchaseId != -1 && InStorageType == 11){
			$("#purchaseId").selectpicker("val",purchaseId);
			$("#supplierdiv").show();
		}
		if(storageRoomId != null){
			$("#storageRoom").selectpicker("val",storageRoomId);
		}
		
		if(inStorageDate != null){
			$("#inStorageTime").val(inStorageDate);
			//本地存储用于页面刷新回显
			sessionStorage.setItem("inStorage_inStorageDate", inStorageDate);
		}
		if(comments != null){
			$("#comments").val(comments);
			//本地存储用于页面刷新回显
			sessionStorage.setItem("inStorage_comments", comments);
		}else{
			$("#comments").val("暂无备注信息");
		}
		if(goodsType != null && InStorageType != null && InStorageType != "-1" && goodsType != "-1"){
			$("#addButton").attr("disabled",false);
			//本地存储用于页面刷新回显
			sessionStorage.setItem("inStorage_goodsType", goodsType);
			//本地存储用于页面刷新回显
			sessionStorage.setItem("inStorage_instorageType", InStorageType);
		}
		if(operatorId != null){
			$("#operator").selectpicker("val",operatorId);
		}
		var scandCodeFlag = 0;
		if($("#scandCodeSwitch").hasClass("scan_no")){
			scandCodeFlag = 0;
		}else{
			scandCodeFlag = 1;
		}
		initGoodsNameList(goodsType,InStorageType,scandCodeFlag);
	}
}


//将添加的物料拼入表格中
function jsonToAddGoods(json){
		var index = json.num;//下标
		var goodsId = json.goods_id;//物料id
		var goodsCode = json.goods_code;//物料编码
		var goodsName = json.goods_name;//物料名字
		var levelList = json.level_list;//等级集合
		var sourceList = json.source_list;//来源集合
		var goodsSpec = json.goods_spec;//规格
		var inNum = json.in_num;//入库量
		var totalWeight = json.total_weight;//入库总重量
		var shelfLife = json.shelf_life;//保质期
		var unitPrice = json.unit_price;//单价
		var totalPrice = json.total_price;//总价
		var unitId = json.unit_id;//单位
		var batchList = json.batch_list;//批次集合
		var stockNum = json.stock_num;//库存量
		var levelId =json.level_id;
		
		$("#goodsCodeTd_" + index).html(goodsCode);
		$("#searchAndSao_" + index).val(goodsName);
		//等级下拉列表
		var levelTdHtml = "";
		if(levelList == ""){
			levelTdHtml = "--";
		}else{
			var levelSelect = "<select id='goodslevels_" + index + "' class='selectpicker' onchange='changeLevel(this)' >";
			var levelLi = "<div style='display:none' class='levelnone'><ul>";
			for(var i = 0; i < levelList.length; i++){
				var level = levelList[i];
				var bList = level.batch_list;
				if(level.level_id == levelId){
					levelSelect += "<option value='" + level.level_id + "' selected='selected'>" + level.level_name + "</option>";
				}else{
					levelSelect += "<option value='" + level.level_id + "'>" + level.level_name + "</option>";
				}
				levelLi += "<li class='levelli' levelid='" +  level.level_id + "' levelprice='" + level.level_price + "' levelname='" + level.level_name + "' stocknum='" + level.stock_num + "'>";
				levelLi += "<ul>";
				for(var j = 0; j < bList.length; j++){
					var batch = bList[j];
					levelLi += "<li batchid='" + batch.batch_id + "'>" + batch.batch_code + "</li>";
				}
				levelLi += "</ul>";
				levelLi += "</li>";
			}
			levelSelect += "</select>";
			levelLi += "</ul></div>";
			levelTdHtml = levelSelect + levelLi;
		}
		$("#levelNameTd_" + index).html(levelTdHtml);
		//来源下拉列表
		var sourceTdHtml = "";
		if(sourceList == ""){
			sourceTdHtml = "--";
		}else{
			var sourceSelect = "<select id='goodsSource_" + index + "' class='selectpicker' onchange='changeTunnel()'>";
			var sourceLi = "<div style='display:none' class='sourcenone'><ul>";
			for(var i = 0; i < sourceList.length; i++){
				var source = sourceList[i];
				sourceSelect += "<option value='" + source.source_id + "'>" + source.source_name + "</option>";
				sourceLi += "<li class='sourceli' sourceid='" +  source.source_id + "'>" + source.source_name + "</li>";
			}
			sourceSelect += "</select>";
			sourceLi += "</ul></div>";
			sourceTdHtml = sourceSelect + sourceLi;
		}
		$("#sourceTd_" + index).html(sourceTdHtml);
		$("#speciTd_" + index).html(goodsSpec);
		//入库量
		$("#inStockNumTd_" + index).find("input").val(Number(inNum).toFixed(3));
		$("#inStockNumTd_" + index).find("input").show();
		//总重量
		$("#weightTd_" + index).find("input").val(totalWeight);
		$("#weightTd_" + index).find("input").show();
		//保质期
		$("#shelfLifeTd_" + index).find("input").val(shelfLife);
		$("#shelfLifeTd_" + index).find("input").show();
		//单价
		$("#priceTd_" + index).find("input").val(unitPrice);
		$("#priceTd_" + index).find("input").show();
		//总价
		$("#totolPriceTd_" + index).find("input").val(totalPrice);
		$("#totolPriceTd_" + index).find("input").show();
		//负批次
		var defaultBatch = 0;
		var batchHtml = "";
		if(batchList == ""){
			batchHtml = "--";
		}else{
			var batchSel = "<select id='batchSel_" + index + "' class='selectpicker' multiple='multiple'>";
			var batchLi = "<div style='display:none' class='batchone'>";
			for(var i = 0; i < batchList.length; i++){
				var batch = batchList[i];
				batchSel += "<option value='" + batch.batch_id + "'>" + batch.batch_code + "</option>";
				batchLi += "<li class='batchli' batchid='" + batch.batch_id + "'>" + batch.batch_code + "</li>";
				if(i == 0){
					defaultBatch = batch.batch_id;
				}
			}
			batchSel += "</select>";
			batchLi += "</ul>";
			batchLi += "</div>";
			batchHtml = batchSel + batchLi;
		}
		$("#batchTd_" + index).html(batchHtml);
		//库存数量
		$("#stockNumTd_" + index).html(Number(stockNum).toFixed(3));
		//id
		$("#goodsIdtd_" + index).html(goodsId);
		//单位
		$("#unitIdTd_" + index).html(unitId);
		//复制和删除显示
		$("#copyTd_" + index).find("a").show();
		$("#delTd_" + index).find("a").show();
		$(".selectpicker").selectpicker();
		$("#batchSel_" + index).selectpicker("val",Number(defaultBatch));
}

//新生成一行数据
function newTableTr(oldIndex){
	var editId = $("#storageChangeFormIdEdit").val();
	var index = parseInt(oldIndex) + 1;
	var newTr = '<tr class="' + ((index + 1)%2 == 0 ? 'even' : 'odd') + ' listtr" id="goodsTr_' + index + '">';
	newTr += '<td class="td_line" height="46" id="numTd_' + index + '">' + (index + 1) + '</td>';
	newTr += '<td class="td_line" id="goodsCodeTd_' + index + '"></td>';
	newTr += '<td class="td_line td_mater" id="goodsNameTd_' + index + '">';
	newTr += '<div class="mater_name_block" id="mater_name_block_' + index + '" >';
	newTr += '<div class="mater_name_hd" id="mater_name_hd_' + index + '">';
	newTr += '<input type="text" id="searchAndSao_' + index + '" onkeyup="searchLi(this,event,1)" style="text-align:center;" name ="searchAndSao" value=""/>';
	newTr += '<i class="add_mater"  onclick="showAddModel()"></i>';
	newTr += '</div>';
	newTr += '<div class="mater_name_bd" id="mater_name_bd_' + index + '" style="min-width: 10%;z-index:9999">';
	newTr += '<ul class="mater_name_list" id="goodsNameUl_' + index + '" >';
	newTr += $("#goodsNameUl_" + oldIndex).html();
	newTr += '</ul>';
	newTr += '<ul class="mater_name_list3" id="goodsNameUl2_' + index + '" style="display:none">';
	newTr += $("#goodsNameUl2_" + oldIndex).html();
	newTr += '</ul>';
	newTr += '<span class="new_mater"  onclick="showAddModel()">';
	newTr += '<img src="#{request.contextPath}/asset/images/stock/inventory/InventoryFile_add1.jpg" />新增物料';
	newTr += '</span>';
	newTr += '</div>';
	newTr += '</div>';
	newTr += '</td>';
	newTr += '<td class="td_line" id="levelNameTd_' + index + '">';
	newTr += '</td>';
	newTr += '<td class="td_line" id="sourceTd_' + index + '">';
	newTr += '</td>';
	newTr += '<td class="td_line" id="speciTd_' + index + '"></td>';
	newTr += '<td class="td_line" id="inStockNumTd_' + index + '">';
	newTr += '<input type="text" class="form-control" style="text-align:center;display:none" value="" onfocus="oldValue(this);" onkeyup="clearNoNum(this,1);" onblur="calculateOnePrice(this)" maxlength="10"/>';
	newTr += '</td>';
	newTr += '<td class="td_line" id="weightTd_' + index + '">';
	newTr += '<input type="text" class="form-control"  name="total_weight"  style="text-align:center;display:none" value="" onfocus="oldValue(this);" onkeyup="clearNoNum(this,2);" onblur="calculateWeight()" maxlength="10"/>';
	newTr += '</td>';
	newTr += '<td class="td_line" id="shelfLifeTd_' + index + '">';
	newTr += '<input type="text" class="form-control" style="text-align:center;display:none" value="" onfocus="oldValue(this);" onkeyup="clearNoNum(this,3);" maxlength="9"/>';
	newTr += '</td>';
	newTr += '<td class="td_line" id="priceTd_' + index + '">';
	newTr += '<input type="text" class="form-control" style="text-align:center;display:none" value="" onfocus="oldValue(this);" onkeyup="clearNoNum(this,4);" onblur="calculateOnePrice(this)" maxlength="10"/>';
	newTr += '</td>';
	newTr += '<td class="td_line" id="totolPriceTd_' + index + '">';
	newTr += '<input type="text" class="form-control" name="total_price" style="text-align:center;display:none" value="" onfocus="oldValue(this);" onkeyup="clearNoNum(this,5);" onblur="calculatePrice()" maxlength="10"/>';
	newTr += '</td>';
	if(editId == ""){
		newTr += '<td class="td_line" id="batchTd_'+index+'" style="display:none"></td>';
		newTr += ' <td class="td_line" id="stockNumTd_'+index+'" style="display:none"></td>';
	}else{
		newTr += '<td class="td_line" id="batchTd_#{_index}" style="display:none"></td>';
		newTr += ' <td class="td_line" id="stockNumTd_'+index+'" style="display:none"></td>';
	}
	newTr += '<td class="td_line" id="goodsIdtd_' + index + '" style="display:none"></td>';
	newTr += '<td class="td_line" id="unitIdTd_' + index + '" style="display:none"></td>';
	newTr += '<td class="td_line" id="batchIdTd_' + index + '" style="display:none"></td>';
	newTr += '<td id="copyTd_' + index + '">';
	newTr += '<a class="icon_link" href="javascript:;" name="copGoods" style="display:none"  onclick="copyGoods(' + index + ')"><img src="/asset/images/stock/commons/tableIco_copy2.png" /></a>';
	newTr += '</td>';
	newTr += '<td id="delTd_' + index + '">';
	newTr += '<a class="icon_link" href="javascript:;" style="display:none" onclick="delGoods(' + index + ')"><img src="/asset/images/stock/commons/tableIco_delect2.png" /></a>';
	newTr += '</td>';
	newTr += '</tr>';
	$("#goodsTable").append(newTr);
	$("#searchAndSao_" + index).keydown(function(e){
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
//循环查找为空的行，如果没有则新添加一个,返回空行行数或者新添加的行数index
function queryNextIndex(){
	var index = 0;
	var trNum = $("#goodsTable").find("tr.listtr").length;//现有行数
	$("tr.listtr").each(function(i){
		var goodsId = $("#goodsIdtd_" + i).html();
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

function initSelectper(){
	$('.selectpicker').selectpicker(); 
}

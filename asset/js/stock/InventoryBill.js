$(function(){
	$(".selectpicker").selectpicker({noneSelectedText:'请选择'});
	$("#inStorageRoom").selectpicker({noneSelectedText:'请选择'});
	$(".mater_name_block").hide();
	$("#goodsTable").find('td[name="batchCodeTd"]').find("select").each(function(){
		$(this).hide();
	});
	$("#goodsTable").find('td[name="realNumTd"]').find("input").each(function(){
		$(this).hide();
	});
	$("#goodsTable").find('td[name="operator"]').find("a").each(function(){
		$(this).hide();
	});
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
	removeOtherStorage("inventory");
	refreshPage();
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
	$("#inventoryDate").val(currentDate);
	keyInit();
	// (1)获取焦点和失去焦点状态
    $('#comment').focus(function(){
        var txt_value = $(this).val();
        if(txt_value==this.defaultValue){
            $(this).val("");    
        };  
    });
    $('#comment').blur(function(){
        var txt_value = $(this).val();
        if(txt_value==""){
            $(this).val(this.defaultValue); 
        }; 
       
    }); 
    
	//弹出框回车搜索事件
	$("#searchStr").keydown(function(e){
		if(e.keyCode==13){
			$('#searchButton').trigger("click");
		}
	}); 
});

function commentChange(){
	 //本地存储（刷新页面用）
	var comment = $("#comment").val().trim();
	sessionStorage.setItem("inventory_comment",comment); 
}
//物料类型改变
function initStorage(){
	var goodsType = $("#goodsType").val();
	initStorageRoom(goodsType);
	//本地存储（刷新页面用）
	sessionStorage.setItem("inventory_goodsType",goodsType); 
}


//物料类型和仓库选择改变
function goodsInit(){
	$(".selectpicker").selectpicker();
	var goodsType = $("#goodsType").val();
	var storageRoom = $("#storageRoom").val();
	if(goodsType!="-1" && storageRoom !="-1"){
		$("#addButton").attr("disabled",false);
		initGoodsNameList(goodsType,storageRoom);
	}else{
		$("#addButton").attr("disabled",true);
		$(".mater_name_block").hide();
	}
	//本地存储（刷新页面用）
	sessionStorage.setItem("inventory_storageRoomId",storageRoom); 
}

//初始化物料名称列表回调
function expList(){
	keyInit();
	$(".mater_name_block").show();
	$('.selectpicker').selectpicker(); 
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

//获取已存在于盘点列表中的数据
function getOldlist(){
	var goodsInfoOld = '{"goodsList":[';
	$("tr.billTr").each(function(){
		var numTdId = $(this).find("td:first-child").attr("id");
		var i = numTdId.substring(6,numTdId.length);
		var number = $("#numtd_" + i).html();
		var goodCode = $("#goods_codetd_" + i).html();
		var goodsName = $("#goods_name_" + i).val();
		var batchId = '';//等级 如果为--则为无
		var batchList = '';//批次列表
		if($("#batch_codetd_" + i).html().trim() != "--" && $("#batch_codetd_" + i).html().trim() != ""){
			batchId = $("#batchSel_" + i).val();
			batchList += '"batchList":[';
			$("#batch_codetd_" + i).find("li.batchli").each(function(){
				var id = $(this).attr("batchid");
				var batchcode = $(this).attr("batchcode");
				var source = $(this).attr("source");
				var spec = $(this).attr("spec");
				var goodscount = $(this).attr("goodscount");
				batchList += '{"batchId":"' + id + '",';
				batchList += '"batchcode":"' + batchcode + '",';
				batchList += '"source":"' + source + '",';
				batchList += '"spec":"' + spec + '",';
				batchList += '"goodscount":"' + goodscount + '"},';
			});
			batchList = batchList.substring(0, batchList.length-1);
			batchList += ']';
		}else{
			batchList = '"batchList":null';//等级列表
		}
		var source = $("#sourcetd_" + i).html();//来源
		var goodsSpec = $("#goods_spectd_" + i).html();
		var batchNum = $("#batch_numtd_" + i).html();
		var billNum = "";
		if($("#bill_numtd_" + i).html() == ""){
			billNum = "";
		}else{
			billNum = $("#bill_numtd_" + i).find("input").val();
		}
		var profitLoss = $("#profitLoss_numtd_" + i).html();
		goodsInfoOld += '{"num":"' + number + '",';
		goodsInfoOld += '"batch_id":"' + batchId + '",';
		goodsInfoOld += '"good_code":"' + goodCode + '",';
		goodsInfoOld += '"good_name":"' + goodsName + '",';
		goodsInfoOld += '"source":"' + source + '",';
		goodsInfoOld += '"goods_spec":"' + goodsSpec + '",';
		goodsInfoOld += '"stock_num":"' + batchNum + '",';
		goodsInfoOld += '"bill_num":"' + billNum + '",';
		goodsInfoOld += '"profit_loss":"' + profitLoss + '",';
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


//填入物料名称初始化物料批次内容
function initGoodsBatch(data){
	/*$("#mydialog").hide();
	$("#searchStr").val("");
	if(data != ""){
		$("#goodsTable").html(data);
	}
	var stockNum = 0;
	$("td[name='stockNumTd']").each(function(i){
		var numStr = $(this).html();
		var num=0;
		if(numStr !=""){
			num = parseFloat(numStr);
		}
		stockNum+=num;
	});
	$("#stockNum").html(stockNum.toFixed(3));
	
	var realNum = 0;
	$("input[name='realNumInput']").each(function(i){
		var numStr = $(this).val();
		var num=0;
		if(numStr !=""){
			num = parseFloat(numStr);
		}
		realNum+=num;
	});
	$("#inventoryNum").html(realNum.toFixed(3));
	$(".mater_name_block").show();
	keyInit();
	 $('div[name="mater_name_hd"]').click(function(ev){
			var e = ev || event;
			if (e && e.stopPropagation) {
				e.stopPropagation();
			} else {
				e.cancelBubble = true;
			}
			$(this).parent().find('div[name="mater_name_bd"]').show();	
		});
	$('select[name="batchCodeSel"]').change(function(){
		var goodsType = $("#goodsType").val();
		var storageRoom = $("#storageRoom").val();
		var goodsId = $(this).parent().parent().find("td[name='goodsInfoIdTd']").html();
		var batchCode = $(this).val();
		var num = $(this).parent().parent().find("td:first-child").html();
		var trHeadHtml = $("#goodsTable").find("tr[name='trHead']").html();
		var goodsInfoOld;
		goodsInfoOld=getOldlist();
		changeGoodsBatch(goodsType,storageRoom,goodsId,batchCode,num,goodsInfoOld,trHeadHtml);
    });
	$('a[name="delGoods"]').click(function(){
		var goodsType = $("#goodsType").val();
		var storageRoom = $("#storageRoom").val();
		var num = $(this).parent().parent().find("td:first-child").html();
		var trHeadHtml = $("#goodsTable").find("tr[name='trHead']").html();
		var goodsInfoOld;
		goodsInfoOld=getOldlist();
		delGoodsTospliceTable(goodsType,storageRoom,num,goodsInfoOld,trHeadHtml);
    });
	$('a[name="copyBatch"]').click(function(){
		var goodsType = $("#goodsType").val();
		var storageRoom = $("#storageRoom").val();
		var num = $(this).parent().parent().find("td:first-child").html();
		var trHeadHtml = $("#goodsTable").find("tr[name='trHead']").html();
		var goodsInfoOld;
		goodsInfoOld=getOldlist();
		copyBatchTospliceTable(goodsType,storageRoom,num,goodsInfoOld,trHeadHtml);
    });
	$('input[name="realNumInput"]').blur(function(){
		 if(isNaN($(this).val())){
				alert("请输入数字！"); 
				$(this).val("0.0");
			 }else{
				 var numStr = $(this).parent().parent().find("td[name='stockNumTd']").html();
				 var num = parseFloat(numStr);
				 var realNum = parseFloat($(this).val());
				 $(this).parent().next().html((realNum - num).toFixed(2));
			 }
			var totalNum = 0;
			$("input[name='realNumInput']").each(function(i){
				var numStr = $(this).val();
				var num=0;
				if(numStr !=""){
					num = parseFloat(numStr);
				}
				totalNum+=num;
			});
			$("#inventoryNum").html(totalNum.toFixed(3));
			 var goodsInfoOld = getOldlist();
			 //本地存储（刷新页面用）
			 sessionStorage.setItem("inventory_goodsJson",goodsInfoOld); 
	});
	$("#goodsTable").find("td[name='goodsCodeTd']").each(function(){
		if($(this).html()==""){
			$(this).next().find("input[name='searchAndSao']").focus();
			return false;
		}
	});
 $("#goodsTable").find("td[name='goodsCodeTd']").each(function(){
		if($(this).html()==""){
			$(this).next().find("input[name='searchAndSao']").focus();
			return false;
		}
	});
 $('.selectpicker').selectpicker();
 var goodsInfoOld = getOldlist();
 //本地存储（刷新页面用）
 sessionStorage.setItem("inventory_goodsJson",goodsInfoOld); 
 var goodsTypeOld = sessionStorage.getItem("inventory_goodsType");
 var storageRoomId = sessionStorage.getItem("inventory_storageRoomId");
 if(goodsTypeOld!=null && goodsTypeOld != "-1" && storageRoomId!=null && storageRoomId != "-1"){
	 $("#addButton").attr("disabled",false);
 }
//单击全选，双击取消全选
	$('input[name="realNumInput"]').click(function(){
		$(this).select();
 });
	$('input[name="realNumInput"]').dblclick(function(){
		$(this).val($(this).val());;
 });*/
	
	//处理选择的物料json
	if(data.batch_id != null){
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
	
	/*$("#mydialog").hide();*/
	var inStockType = $("#inStockType").attr("myInStockTypeId");
	var goodsType = $("#goodsType").val();
	 $('.billTr').each(function(i){
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
		 $("#goods_name_" + i).click(function(ev){
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
	//计算总库存
	calculateStockNum();
	//计算实盘数量
	calculateBillNum();
	keyInit();
	sessionStorage.setItem("inventory_goodsJson", getOldlist());
}

//展开model
function showAddModel(){
	var goodsType = $("#goodsType").val();
	var storageRoom = $("#storageRoom").val();
	initGoodsList(goodsType,storageRoom,2,"",1);
}

//分页查询方法
function queryPage(page){
	var goodsType = $("#goodsType").val();
	var storageRoom = $("#storageRoom").val();
	var searchStr = $("#searchStr").val();
	var pageNum = page;
	pageFind(goodsType,storageRoom,searchStr,pageNum);
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

//添加物料
function selectToAddGoods(){
	$("#mydialog").show();
	var goodsType = $("#goodsType").val();
	var storageRoom = $("#storageRoom").val();
	var goodsInfoOld = getOldlist();
	var trHeadHtml = $("#goodsTable").find("tr[name='trHead']").html();
	var goodsIds = "";
	 $('input:checkbox[name=selectGoods]:checked').each(function(i){
		 goodsIds += $(this).parent().next().html()+",";
	 });
	 if(goodsIds != ""){
		 goodsIds = goodsIds.substring(0, goodsIds.length-1);
	 }
	 modelToAddGoods(goodsType,storageRoom,goodsInfoOld,goodsIds,trHeadHtml);
}


//保存盘点单
function saveCheck(){
	var goodsType = $("#goodsType").val();
	var storageRoom = $("#storageRoom").val();
	var operatorId = $("#operatorId").val();
	var comment = $("#comment").val();
	var goodsInfoOld = getOldlist();
	var inventoryDateStr = $("#inventoryDate").val();
	var inventoryDate = new Date(Date.parse(inventoryDateStr.replace(/-/g, "/")));  
	if(goodsType == "-1"){
		alert("请选择物料类型");
		return;
	}
	if(inventoryDateStr==""){
		alert("盘点时间不能为空");
		return ;
	}
	if(inventoryDate>new Date()){
		alert("盘点时间不能大于当前时间");
		return ;
	}
	if(goodsInfoOld == '{"goodsList":[]}'){
		alert("请添加盘点批次");
		return;
	}
	if(operatorId == '-1'){
		alert("请选择经办人");
		return;
	}
	if(comment.length>200){
		alert("备注不能大于200个汉字");
		return;
	}
	$("#add\\:goodsType").val(goodsType);
	$("#add\\:storageRoomId").val(storageRoom);
	$("#add\\:inventoryDate").val(inventoryDateStr);
	$("#add\\:operatorId").val(operatorId);
	$("#add\\:comments").val(comment);
	$("#add\\:jsonListOld").val(goodsInfoOld);
	$("#add\\:commit").click();
	$("#submitButton").attr("disabled",true);
}

//物料选择页面全选复选框变动
function checkAllChange(obj){
	if (obj.checked) {
		$("input[name='selectGoods']").iCheck("check"); 
	} else {
		$("input[name='selectGoods']").iCheck("uncheck"); 
	}
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

function clearSearch(){
	$("#searchStr").val("");
}


function clearPage(){
	$("#login").modal("show");
	$("#addButton").attr("disabled",true);
	$(".mater_name_block").hide();
	$("#storageRoom").selectpicker("val","-1");
	$("#goodsType").selectpicker("val","-1");
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
	$("#inventoryDate").val(currentDate);
	$("#operatorId").selectpicker("val","-1");
	$("#comment").val("");
	$("#stockNum").html("0");
	$("#inventoryNum").html("0");
	initBillList();
	sessionStorage.clear();
}

function clearComplete(){
	$("#login").modal("hide");
}
//页面初始化键盘上下键操作
function keyInit(){
	$(".scancode_btn").click(function(){
    	if($(this).hasClass("scan_no")){
    		
    	}else{
    		alert("扫描条形码时请将输入法切换为英文状态");
    		$("#goodsTable").find("td.batchidtd").each(function(){
    			if($(this).html()==""){
    				$(this).parent().find("input[name='searchAndSao']").focus();
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


function dateChange(){
	//本地存储（刷新页面用）
	var inventoryDate = $("#inventoryDate").val().trim();
	sessionStorage.setItem("inventory_inventoryDate",inventoryDate); 
}
function operatorIdChange(){
	//本地存储（刷新页面用）
	var operatorId = $("#operatorId").val();
	sessionStorage.setItem("inventory_operatorId",operatorId); 
}
//刷新页面回显（本地存储中读取数据）
function refreshPage(){
	var goodsTypeOld = sessionStorage.getItem("inventory_goodsType");
	var storageRoomId = sessionStorage.getItem("inventory_storageRoomId");
	var inventoryDate = sessionStorage.getItem("inventory_inventoryDate");
	var operatorId = sessionStorage.getItem("inventory_operatorId");
	var comment = sessionStorage.getItem("inventory_comment");
	var jsonListOld = sessionStorage.getItem("inventory_goodsJson");
	if(inventoryDate == null ){
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
		$("#inventoryDate").val(currentDate);
	}else{
		$("#inventoryDate").val(inventoryDate);
	}
	if(null != operatorId){
		$("#operatorId").val(operatorId);
	}
	if(null != comment){
		$("#comment").val(comment);
	}
	if(goodsTypeOld == null && storageRoomId == null && inventoryDate == null && operatorId == null 
			&& comment == null){
		if(stockEchoFlag == "true"){
			inventoryMemory();
		}
	}else{
		if((goodsTypeOld!=null && goodsTypeOld!="-1") || (storageRoomId!=null&& storageRoomId!="-1") ){
			if(goodsTypeOld == null ){
				goodsTypeOld = "-1";
			}
			if(storageRoomId == null ){
				storageRoomId = "-1";
			}
			if(inventoryDate == null ){
				inventoryDate = "";
			}
			$("#login").modal("show");
			pageEcho(goodsTypeOld,storageRoomId,jsonListOld);
		}
	}
}

//库存记忆功能回调
function stockEchoComplete(data){
	$(".selectpicker").selectpicker();
	var goodsType = $("#goodsType").val();
	var storageRoom = $("#storageRoom").val();
	/*var id = data.storageChangeFormId;
	var goodsType = data.goodsType;
	var InStorageType = data.storageRoomId.storageRoomId;
	var operatorId = data.operatorId;
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
	}*/
	if(goodsType!="-1" && storageRoom !="-1"){
		$("#addButton").attr("disabled",false);
		initGoodsNameList(goodsType,storageRoom);
	}else{
		$("#addButton").attr("disabled",true);
		$(".mater_name_block").hide();
	}
}
//页面回显回调
function pageEchoComplete(){
	$('.selectpicker').selectpicker(); 
	var goodsType = $("#goodsType").val();
	var storageRoom = $("#storageRoom").val();
	if(goodsType!="-1" && storageRoom !="-1"){
		$("#addButton").attr("disabled",false);
	}else{
		$("#addButton").attr("disabled",true);
		$(".mater_name_block").hide();
	}
	
	//计算总库存
	calculateStockNum();
	//计算总实盘数量
	calculateBillNum();
	
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
	//计算实盘数量
	calculateBillNum();
	keyInit();
	$('.selectpicker').selectpicker(); 
	$("#login").modal("hide");
	sessionStorage.setItem("inventory_goodsJson", getOldlist());
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


//将添加的物料拼入表格中
function jsonToAddGoods(json){
		var index = json.num;//下标
		var batchId = json.batch_id;//批次id
		var goodsCode = json.goods_code;//物料编码
		var goodsName = json.goods_name;//物料名字
		var batchList = json.batch_list;//批次集合
		var source = json.source;//来源
		var goodsSpec = json.goods_spec;//规格
		var goodsCount = json.goods_count;//库存数量
		var realNum = json.real_num;//实盘数量
		var profitLoss = json.profit_loss;//库存量
		
		$("#goods_codetd_" + index).html(goodsCode);
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
				batchLi += "<li class='batchli' batchid='" +  batch.batch_id + "' batchcode='" + batch.batch_code + "' source='" + batch.source + "' spec='" + batch.spec + "' goodscount='" + batch.goods_count + "'>";
				batchLi += "</li>";
			}
			batchSelect += "</select>";
			batchLi += "</ul></div>";
			batchTdHtml = batchSelect + batchLi;
		}
		$("#batch_codetd_" + index).html(batchTdHtml);
		//来源下拉列表
		$("#sourcetd_" + index).html(source);
		//规格
		$("#goods_spectd_" + index).html(goodsSpec);
		//库存量
		$("#batch_numtd_" + index).html(goodsCount);
		//实盘数量
		$("#bill_numtd_" + index).find("input").val(realNum);
		$("#bill_numtd_" + index).find("input").show();
		//损益数量
		$("#profitLoss_numtd_" + index).html(profitLoss);
		//批次id
		$("#batch_idtd_" + index).html(batchId);
		//复制和删除显示
		$("#copyTd_" + index).show();
		$("#delTd_" + index).show();
		$(".selectpicker").selectpicker();
		
}
//选择批次下拉列表
function changeBatch(obj){
	var selectedId = $(obj).attr("id");
	var index = selectedId.substring(selectedId.indexOf("_")+1,selectedId.length);
	var batchId = $(obj).val();
	var batchNum = "";
	var source = "--";
	$(obj).parent().find("li.batchli").each(function(){
		var liId = $(this).attr("batchid");
		if(batchId == liId){
			batchNum = $(this).attr("goodscount");
			source = $(this).attr("source");
			return;
		}
	});
	$("#sourcetd_" + index).html(source);
	$("#batch_numtd_" + index).html(batchNum);
	$("#bill_numtd_" + index).find("input").val("0.0");
	$("#batch_idtd_" + index).html(batchId);
	$("#profitLoss_numtd_" + index).html(0 - Number(batchNum));
	sessionStorage.setItem("inventory_goodsJson", getOldlist());
}
function cacluProfitLoss(obj){
	 if(isNaN($(obj).val()) || Number($(obj).val()) < 0){
			alert("请输入正确数字！"); 
			$(obj).val("0.0");
		 }else{
			 var numStr = $(obj).parent().parent().find("td.stockNum").html();
			 var num = parseFloat(numStr);
			 var realNum = parseFloat($(obj).val());
			 $(obj).parent().next().html((realNum - num).toFixed(2));
		 }
	 calculateBillNum();
	 sessionStorage.setItem("inventory_goodsJson", getOldlist());
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
		//计算总库存
		calculateStockNum();
		//计算总实盘数量
		calculateBillNum();
		sessionStorage.setItem("inventory_goodsJson", getOldlist());
	}
} 

//弹出框添加物料，获取页面json
function getModelJson(){
	//获取页面的数据json
	var goodsInfoOld = '{"goodsList":[';
	$("tr.model_tr").each(function(i){
		if($("#selectGoods_" + i).is(':checked')){
			var batchId = $("#model_batchId_" + i).html();
			var goodCode = $("#model_goodsCode_" + i).html();
			var goodsName = $("#model_goodsName_" + i).html();
			var source = $("#model_batchSource_" + i).html();;//来源
			var goodsSpec = $("#model_goodSpec_" + i).html();
			var batchNum = $("#model_inNum_" + i).html();
			var billNum = "0.0";
			var profitLossNum = "0";
			var batchList = '';
			if($("#model_batcList_" + i).html() != ""){
				batchList += '"batch_list":[';
				$("#model_batcList_" + i).find("li").each(function(j){
					var id = $(this).attr("batchid");
					var batchSource = $(this).attr("source");
					var batchSpec = $(this).attr("sepc");
					var batchNum = $(this).attr("count");
					var batchCode = $(this).html();
					batchList += '{"batch_id":"' + id + '",';
					batchList += '"source":"' + batchSource + '",';
					batchList += '"spec":"' + batchSpec + '",';
					batchList += '"goods_count":"' + batchNum + '",';
					batchList += '"batch_code":"' + batchCode + '"},';
					
					if(j == 0){
						profitLossNum =  0 - Number(batchNum);
					}
				});
				batchList = batchList.substring(0, batchList.length-1);
				batchList += ']';
			}else{
				batchList = '"batch_list":""';
			}
			goodsInfoOld += '{"num":"' + i + '",';
			goodsInfoOld += '"batch_id":"' + batchId + '",';
			goodsInfoOld += '"goods_code":"' + goodCode + '",';
			goodsInfoOld += '"goods_name":"' + goodsName + '",';
			goodsInfoOld += '"source":"' + source + '",';
			goodsInfoOld += '"goods_spec":"' + goodsSpec + '",';
			goodsInfoOld += '"goods_count":"' + batchNum + '",';
			goodsInfoOld += '"real_num":"' + billNum + '",';
			goodsInfoOld += '"profit_loss":"' + profitLossNum + '",';
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
//新生成一行数据
function newTableTr(oldIndex){
	var index = parseInt(oldIndex) + 1;
	var newTr = '<tr class="' + ((index + 1)%2 == 0 ? 'even' : 'odd') + ' billTr" id="batchTr_' + index + '">';
	newTr += '<td class="td_line" id="numtd_' + index + '">' + (index + 1) + '</td>';
	newTr += '<td class="td_line" id="goods_codetd_' + index + '"></td>';
	newTr += '<td class="td_line td_mater" id="goods_nametd_' + index + '">';
	newTr += '<div class="mater_name_block" id="mater_name_block_' + index + '" >';
	newTr += '<div class="mater_name_hd" id="mater_name_hd_' + index + '">';
	newTr += '<input type="text" id="goods_name_' + index + '" name ="searchAndSao" onkeyup="searchLi(this,event,1)"   value=""/>';
	newTr += '<i class="add_mater"  onclick="showAddModel()"></i>';
	newTr += '</div>';
	newTr += '<div class="mater_name_bd" id="mater_name_bd_' + index + '" style="min-width: 10%;z-index:9999">';
	newTr += '<ul class="mater_name_list" id="goodsNameUl_' + index + '" >';
	newTr += $("#goodsNameUl_" + oldIndex).html();
	newTr += '</ul>';
	newTr += '<ul class="mater_name_list3" id="goodsNameUl2_' + index + '" style="display:none">';
	newTr += $("#goodsNameUl2_" + oldIndex).html();
	newTr += '</ul>';
	newTr += '</div>';
	newTr += '</div>';
	newTr += '</td>';
	newTr += ' <td class="td_line" id="batch_codetd_' + index + '">';
	newTr += '</td>';
	newTr += '<td class="td_line" id="sourcetd_' + index + '">';
	newTr += '</td>';
	newTr += '<td class="td_line" id="goods_spectd_' + index + '"></td>';
	newTr += '<td class="td_line" id="batch_numtd_' + index + '">';
	newTr += '</td>';
	newTr += '<td class="td_line" id="bill_numtd_' + index + '">';
	newTr += '<input type="text" class="form-control"  name="billNum"  style="text-align:center;display:none" value="0.0"   maxlength="10" onblur="cacluProfitLoss(this)"/>';
	newTr += '</td>';
	newTr += '<td class="td_line" id="profitLoss_numtd_' + index + '">';
	newTr += '</td>';
	newTr += '<td class="td_line" id="batch_idtd_' + index + '" style="display:none">';
	newTr += '</td>';
	newTr += '<td>';
	newTr += '<a class="icon_link" href="javascript:;" id="copyTd_' + index + '" style="display:none"><img src="/images/crop_tableadd.jpg" /></a>';
	newTr += '<a class="icon_link" href="javascript:;" id="delTd_' + index + '" style="display:none"><img src="/asset/images/stock/commons/tableIco_delect2.png" /></a>';
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

//循环查找为空的行，如果没有则新添加一个,返回空行行数或者新添加的行数index
function queryNextIndex(){
	var index = 0;
	var trNum = $("#goodsTable").find("tr.billTr").length;//现有行数
	$("tr.billTr").each(function(i){
		var batchId = $("#batch_idtd_" + i).html();
		if(batchId == ""){
			index = i;
			return false;
		}
	});
	if(index == trNum - 1){//如果空行正好是最后一行则添加一行新的
		newTableTr(index);
	}
	return index; 
}

//计算总重量
function calculateStockNum(){
	var totalNum = 0;
	$("tr.billTr").each(function(i){
		if($("#batch_idtd_" + i).html() != ""){
			var num = $("#batch_numtd_" + i).html();
			totalNum += parseFloat(num);
		}
	});
	$("#stockNum").html(totalNum.toFixed(3));
}

//计算总重量
function calculateBillNum(){
	var totalNum = 0;
	$("tr.billTr").each(function(i){
		if($("#batch_idtd_" + i).html() != ""){
			var num = $("#bill_numtd_" + i).find("input").val();
			totalNum += parseFloat(num);
		}
	});
	$("#inventoryNum").html(totalNum.toFixed(3));
}

//复制物料
function copyGoods(index){
	var goodsInfoOld = getSigleGoods(index);
	var newId = $("#goodsTable").find("tr.billTr").length;//现有行数(新的id)
	copyToCreateNewGoods(newId,index);
	var goods = eval('(' + goodsInfoOld + ')');
	goods.num = newId;
	jsonToAddGoods(goods);
	//重新组织序号
	$("tr.billTr").each(function(i){
		$(this).find("td:first-child").html(i+1); 
	});
	sessionStorage.setItem("inventory_goodsJson", getOldlist());
	$('.selectpicker').selectpicker(); 
}

//复制添加一行
function copyToCreateNewGoods(index,oldIndex){
	var newTr = '<tr class="' + ((index + 1)%2 == 0 ? 'even' : 'odd') + ' billTr" id="batchTr_' + index + '">';
	newTr += '<td class="td_line" id="numtd_' + index + '">' + (index + 1) + '</td>';
	newTr += '<td class="td_line" id="goods_codetd_' + index + '"></td>';
	newTr += '<td class="td_line td_mater" id="goods_nametd_' + index + '">';
	newTr += '<div class="mater_name_block" id="mater_name_block_' + index + '" >';
	newTr += '<div class="mater_name_hd" id="mater_name_hd_' + index + '">';
	newTr += '<input type="text" id="goods_name_' + index + '" name ="searchAndSao" onkeyup="searchLi(this,event,1)"   value=""/>';
	newTr += '<i class="add_mater"  onclick="showAddModel()"></i>';
	newTr += '</div>';
	newTr += '<div class="mater_name_bd" id="mater_name_bd_' + index + '" style="min-width: 10%;z-index:9999">';
	newTr += '<ul class="mater_name_list" id="goodsNameUl_' + index + '" >';
	newTr += $("#goodsNameUl_" + oldIndex).html();
	newTr += '</ul>';
	newTr += '<ul class="mater_name_list3" id="goodsNameUl2_' + index + '" style="display:none">';
	newTr += $("#goodsNameUl2_" + oldIndex).html();
	newTr += '</ul>';
	newTr += '</div>';
	newTr += '</div>';
	newTr += '</td>';
	newTr += ' <td class="td_line" id="batch_codetd_' + index + '">';
	newTr += '</td>';
	newTr += '<td class="td_line" id="sourcetd_' + index + '">';
	newTr += '</td>';
	newTr += '<td class="td_line" id="goods_spectd_' + index + '"></td>';
	newTr += '<td class="td_line" id="batch_numtd_' + index + '">';
	newTr += '</td>';
	newTr += '<td class="td_line" id="bill_numtd_' + index + '">';
	newTr += '<input type="text" class="form-control"  name="billNum"  style="text-align:center;display:none" value="0.0"   maxlength="10" onblur="cacluProfitLoss(this)"/>';
	newTr += '</td>';
	newTr += '<td class="td_line" id="profitLoss_numtd_' + index + '">';
	newTr += '</td>';
	newTr += '<td class="td_line" id="batch_idtd_' + index + '" style="display:none">';
	newTr += '</td>';
	newTr += '<td>';
	newTr += '<a class="icon_link" href="javascript:;" id="copyTd_' + index + '" style="display:none" onclick="copyGoods(' + index + ')"><img src="/images/crop_tableadd.jpg" /></a>';
	newTr += '<a class="icon_link" href="javascript:;" id="delTd_' + index + '" style="display:none" onclick="delGoods(' + index + ')" ><img src="/asset/images/stock/commons/tableIco_delect2.png" /></a>';
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
	var number = $("#numTd_" + i).html();
	var goodCode = $("#goods_codetd_" + i).html();
	var goodsName = $("#goods_name_" + i).val();
	var batchId = '';//等级 如果为--则为无
	var batchList = '';//批次列表
	if($("#batch_codetd_" + i).html().trim() != "--" && $("#batch_codetd_" + i).html().trim() != ""){
		batchId = $("#batchSel_" + i).val();
		batchList += '"batch_list":[';
		$("#batch_codetd_" + i).find("li.batchli").each(function(){
			var id = $(this).attr("batchid");
			var batchcode = $(this).attr("batchcode");
			var source = $(this).attr("source");
			var spec = $(this).attr("spec");
			var goodscount = $(this).attr("goodscount");
			batchList += '{"batch_id":"' + id + '",';
			batchList += '"batch_code":"' + batchcode + '",';
			batchList += '"source":"' + source + '",';
			batchList += '"spec":"' + spec + '",';
			batchList += '"goodscount":"' + goodscount + '"},';
		});
		batchList = batchList.substring(0, batchList.length-1);
		batchList += ']';
	}else{
		batchList = '"batch_list":null';//等级列表
	}
	var source = $("#sourcetd_" + i).html();//来源
	var goodsSpec = $("#goods_spectd_" + i).html();
	var batchNum = $("#batch_numtd_" + i).html();
	var billNum = "";
	if($("#bill_numtd_" + i).html() == ""){
		billNum = "";
	}else{
		billNum = $("#bill_numtd_" + i).find("input").val();
	}
	var profitLoss = $("#profitLoss_numtd_" + i).html();
	
	var goodsInfoOld = "";
	goodsInfoOld += '{"num":"' + number + '",';
	goodsInfoOld += '"batch_id":"' + batchId + '",';
	goodsInfoOld += '"goods_code":"' + goodCode + '",';
	goodsInfoOld += '"goods_name":"' + goodsName + '",';
	goodsInfoOld += '"source":"' + source + '",';
	goodsInfoOld += '"goods_spec":"' + goodsSpec + '",';
	goodsInfoOld += '"goods_count":"' + batchNum + '",';
	goodsInfoOld += '"real_num":"' + billNum + '",';
	goodsInfoOld += '"profit_loss":"' + profitLoss + '",';
	goodsInfoOld += batchList + "}";
	return goodsInfoOld;
}

//删除物料
function delGoods(index){
	if(confirm("确定删除该条物料？")){
		clearTr(index);
		//计算总重量
		calculateStockNum();
		//计算总价
		calculateBillNum();
		delMoreTr();
	}
}

//清空单行内容
function clearTr(index){
	$("#goods_codetd_" + index).html("");
	$("#goods_name_" + index).val("");
	$("#batch_codetd_" + index).html("");
	$("#sourcetd_" + index).html("");
	$("#goods_spectd_" + index).html("");
	$("#batch_numtd_" + index).html("");
	$("#bill_numtd_" + index).find("input").val("");
	$("#bill_numtd_" + index).find("input").hide();
	$("#unitIdTd_" + index).html("");
	$("#profitLoss_numtd_" + index).html("");
	$("#batch_idtd_" + index).html("");
	//复制和删除显示
	$("#copyTd_" + index).hide();
	$("#delTd_" + index).hide();
	sessionStorage.setItem("inventory_goodsJson", getOldlist());
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


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
	/*refreshPage();*/
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
	jQuery('input[class="iCheck"]').iCheck({
		checkboxClass: 'icheckbox_minimal-blue'
	});
	$("#zeroGoods").iCheck('check');
	$("#zeroGoods").on("ifClicked", function (){
		var goodsType = $("#goodsType").val();
		var storageRoom = $("#storageRoom").val();
		if($("#zeroGoods").is(':checked')){
			initGoodsList(goodsType,storageRoom,"",1,1);
		}else{
			initGoodsList(goodsType,storageRoom,"",1,0);
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
		$("#addAllButton").attr("disabled",false);
		$("#printButton").attr("disabled",false);
		var queryType = 0;
		if($("#zeroGoods").is(':checked')){
			queryType = 1;
		}else{
			queryType = 0;
		}
		initGoodsNameList(goodsType,storageRoom,queryType);
	}else{
		$("#addButton").attr("disabled",true);
		$("#addAllButton").attr("disabled",true);
		$("#printButton").attr("disabled",true);
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



//填入物料名称初始化物料批次内容
function initGoodsBatch(data){
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
	calculateNum();
	$('.selectpicker').selectpicker(); 
}
	function cacluProfitLoss(obj){
		 if(isNaN($(obj).val()) || Number($(obj).val()) < 0){
				alert("请输入正确数字！"); 
				$(obj).val("0.0");
			 }else{
				 var numStr = $(obj).parent().parent().find("td.goodsNum").html();
				 var num = parseFloat(numStr);
				 var realNum = parseFloat($(obj).val());
				 $(obj).parent().next().html((realNum - num).toFixed(2));
			 }
		 calculateRealNum();
		}
//计算库存数量
function calculateNum(){
	var totalNum = 0;
	$("tr.billTr").each(function(i){
		if($("#goods_idtd_" + i).html() != ""){
			var num = $("#batch_numtd_" + i).html();
			totalNum += parseFloat(num);
		}
	});
	$("#stockNum").html(totalNum.toFixed(2));
}
//计算总实盘数量
function calculateRealNum(){
	var totalNum = 0;
	$("tr.billTr").each(function(i){
		if($("#goods_idtd_" + i).html() != ""){
			var num = $("#bill_numtd_" + i).find("input").val();
			totalNum += parseFloat(num);
		}
	});
	$("#inventoryNum").html(totalNum.toFixed(2));
}
//删除物料
function delGoods(index){
	if(confirm("确定删除该条物料？")){
		clearTr(index);
		//计算库存
		calculateNum();
		//计算盘点数量
		calculateRealNum();
		delMoreTr();
	}
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
	$(".selectpicker").selectpicker();
	//sessionStorage.setItem("inStorage_goodsJson", getGoodsJson());
}
//清空单行内容
function clearTr(index){
	$("#goods_codetd_" + index).html("");
	$("#goods_name_" + index).val("");
	$("#goods_spectd_" + index).html("");
	$("#leveltd_" + index).html("");
	//库存量
	$("#batch_numtd_" + index).html("");
	//实盘数量
	$("#bill_numtd_" + index).find("input").val("");
	$("#bill_numtd_" + index).find("input").hide();
	//损益数量
	$("#profitLoss_numtd_" + index).html("");
	//id
	$("#goods_idtd_" + index).html("");
	//复制和删除显示
	$("#copya_" + index).hide();
	$("#dela_" + index).hide();
	//sessionStorage.setItem("inventory_goodsJson", getGoodsJson());
}
//删除多余的行
function delMoreTr(){
	var lastTrNum = 0;
	var allTrNum = $("#goodsTable").find("tr.billTr").length;
	$('.billTr').each(function(i){
		if($("#goods_idtd_" + i).html() != ""){
			lastTrNum = i;
		}
	});
	$('.billTr').each(function(j){
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
//获取单行的物料json
function getSigleGoods(i){
	var number = $("#numtd_" + i).html();
	var goodsId = $("#goods_idtd_" + i).html();
	var goodCode = $("#goods_codetd_" + i).html();
	var goodsName = $("#goods_name_" + i).val();
	var goodsSpec = $("#goods_spectd_" + i).html();
	var goodsNum = $("#batch_numtd_" + i).html();
	var realNum = $("#bill_numtd_" + i).find("input").val();
	var profitLoss = $("#profitLoss_numtd_" + i).html();
	var level = "";
	var levelList = '';//等级列表
	if($("#leveltd_" + i).html() != "--"){
		level = $("#goodslevels_" + i).val();
	}
	if($("#leveltd_" + i).html() != "--"){
		levelList += '"level_list":[';
		$("#leveltd_" + i).find("li.levelli").each(function(j){
			var id = $(this).attr("levelid");
			var num = $(this).attr("levelnum");
			var levelName = $(this).html();
			levelList += '{"level_id":"' + id + '",';
			levelList += '"num":"' + num + '",';
			levelList += '"level_name":"' + levelName + '"},';
		});
		levelList = levelList.substring(0, levelList.length-1);
		levelList += ']';
	}else{
		levelList = '"level_list":""';//等级列表
	}
	var goodsInfoOld = "";
	goodsInfoOld += '{"num":"' + number + '",';
	goodsInfoOld += '"goods_id":"' + goodsId + '",';
	goodsInfoOld += '"goods_code":"' + goodCode + '",';
	goodsInfoOld += '"goods_name":"' + goodsName + '",';
	goodsInfoOld += '"goods_spec":"' + goodsSpec + '",';
	goodsInfoOld += '"goods_num":"' + goodsNum + '",';
	goodsInfoOld += '"inventory_num":"' + realNum + '",';
	goodsInfoOld += '"profit_loss":"' + profitLoss + '",';
	goodsInfoOld += '"goods_level":"' + level + '",';
	goodsInfoOld += levelList + '}';
	return goodsInfoOld;
}
//复制添加一行
function copyToCreateNewGoods(index,oldIndex){
	var newTr = '<tr class="' + ((index + 1)%2 == 0 ? 'even' : 'odd') + ' billTr" id="goodsTr_' + index + '">';
	newTr += '<td class="td_line" id="numtd_' + index + '">' + (index + 1) + '</td>';
	newTr += '<td class="td_line" id="goods_codetd_' + index + '"></td>';
	newTr += '<td class="td_line td_mater" id="goods_nametd_' + index + '">';
	newTr += '<div class="mater_name_block" id="mater_name_block_' + index + '" >';
	newTr += '<div class="mater_name_hd" id="mater_name_hd_' + index + '">';
	newTr += '<input type="text" id="goods_name_' + index + '" onkeyup="searchLi(this,event,1)" style="text-align:center;" name ="searchAndSao" value=""/>';
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
	newTr += '<td class="td_line" id="leveltd_' + index + '">';
	newTr += '<td class="td_line" id="goods_spectd_' + index + '"></td>';
	newTr += '<td class="td_line goodsNum" id="batch_numtd_' + index + '"></td>';
	newTr += '<td class="td_line" id="bill_numtd_' + index + '">';
	newTr += '<input type="text" value="0.0" class="form-control" style="text-align:center;display:none" onblur="cacluProfitLoss(this)"/>';
	newTr += '</td>';
	newTr += '<td class="td_line" id="profitLoss_numtd_' + index + '"></td>';
	newTr += '<td class="td_line" id="goods_idtd_' + index + '" style="display:none"></td>';
	newTr += '<td class="td_line" >';
	newTr += '<a class="icon_link" href="javascript:;" id="copya_' + index + '" onclick="copyGoods(' + index + ')"><img src="/images/crop_tableadd.jpg" /></a>';
	newTr += '<a class="icon_link" href="javascript:;" id="dela_' + index + '" onclick="delGoods(' + index + ')"><img src="/asset/images/stock/commons/tableIco_delect2.png" /></a>';
	newTr += '</td>';
	newTr += '</tr>';
	$("#goodsTr_" + oldIndex).after(newTr);
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
//将添加的物料拼入表格中
function jsonToAddGoods(json){
		var index = json.num;//下标
		var goodsId = json.goods_id;//物料id
		var goodsCode = json.goods_code;//物料编码
		var goodsName = json.goods_name;//物料名字
		var goodsSpec = json.goods_spec;//规格
		var goodsNum = json.goods_num;//库存量
		var inventoryNum = json.inventory_num;//盘点数量
		var profitLoss = json.profit_loss;//损益数量
		var levelId = json.goods_level;//等级
		var levelList = json.level_list;//等级集合
		
		$("#goods_codetd_" + index).html(goodsCode);
		$("#goods_name_" + index).val(goodsName);
		if(levelId == ''){
			$("#leveltd_" + index).html("--");
		}else{
			var levelSelect = "<select id='goodslevels_" + index + "' class='selectpicker' onchange='changeLevel(this)' >";
			var levelLi = "<div style='display:none' class='levelnone'><ul>";
			for(var i = 0; i < levelList.length; i++){
				var level = levelList[i];
				if(levelId == level.level_id){
					levelSelect += "<option value='" + level.level_id + "' selected='selected'>" + level.level_name + "</option>";
				}else{
					levelSelect += "<option value='" + level.level_id + "'>" + level.level_name + "</option>";
				}
				levelLi += "<li class='levelli' levelid='" +  level.level_id + "' levelnum='" + level.num + "'>" + level.level_name + "</li>";
			}
			levelSelect += "</select>";
			levelLi += "</ul></div>";
			levelTdHtml = levelSelect + levelLi;
			$("#leveltd_" + index).html(levelTdHtml);
		}
		$("#goods_spectd_" + index).html(goodsSpec);
		//库存数量
		$("#batch_numtd_" + index).html(parseFloat(goodsNum).toFixed(2));
		//盘点数量
		$("#bill_numtd_" + index).find("input").val(inventoryNum);
		$("#bill_numtd_" + index).find("input").show();
		//损益数量
		$("#profitLoss_numtd_" + index).html(profitLoss);
		//id
		$("#goods_idtd_" + index).html(goodsId);
		//复制和删除显示
		$("#copya_" + index).show();
		$("#dela_" + index).show();
}

//新生成一行数据
function newTableTr(oldIndex){
	var index = parseInt(oldIndex) + 1;
	var newTr = '<tr class="' + ((index + 1)%2 == 0 ? 'even' : 'odd') + ' billTr" id="goodsTr_' + index + '">';
	newTr += '<td class="td_line" id="numtd_' + index + '">' + (index + 1) + '</td>';
	newTr += '<td class="td_line" id="goods_codetd_' + index + '"></td>';
	newTr += '<td class="td_line td_mater" id="goods_nametd_' + index + '">';
	newTr += '<div class="mater_name_block" id="mater_name_block_' + index + '" >';
	newTr += '<div class="mater_name_hd" id="mater_name_hd_' + index + '">';
	newTr += '<input type="text" id="goods_name_' + index + '" onkeyup="searchLi(this,event,1)" style="text-align:center;" name ="searchAndSao" value=""/>';
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
	newTr += '<td class="td_line" id="leveltd_' + index + '"> </td>';
	newTr += '<td class="td_line" id="goods_spectd_' + index + '"></td>';
	newTr += '<td class="td_line" id="batch_numtd_' + index + '"></td>';
	newTr += '<td class="td_line" id="bill_numtd_' + index + '">';
	newTr += '<input type="text" class="form-control" value="0.0" style="text-align:center;display:none" onblur="cacluProfitLoss(this)"/>';
	newTr += '</td>';
	newTr += '<td class="td_line" id="profitLoss_numtd_' + index + '"></td>';
	newTr += '<td class="td_line" id="goods_idtd_' + index + '" style="display:none"></td>';
	newTr += '<td class="td_line" >';
	newTr += '<a class="icon_link" href="javascript:;" id="copya_' + index + '" style="display:none" onclick="copyGoods(' + index + ')"><img src="/images/crop_tableadd.jpg" /></a>';
	newTr += '<a class="icon_link" href="javascript:;" id="dela_' + index + '" style="display:none" onclick="delGoods(' + index + ')"><img src="/asset/images/stock/commons/tableIco_delect2.png" /></a>';
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
//展开model
function showAddModel(){
	var goodsType = $("#goodsType").val();
	var storageRoom = $("#storageRoom").val();
	var queryType = 1;
	if($("#zeroGoods").is(':checked')){
		queryType = 0;
	}
	initGoodsList(goodsType,storageRoom,"",1,queryType);
}

//添加物料回调
function showModelComplete(){
	$("#AddMaterial").modal("show");
}
//分页查询方法
function queryPage(page){
	var goodsType = $("#goodsType").val();
	var storageRoom = $("#storageRoom").val();
	var searchStr = $("#searchStr").val();
	var pageNum = page;
	var queryType = 0;
	if($("#zeroGoods").is(':checked')){
		queryType = 0;
	}else{
		queryType = 1;
	}
	pageFind(goodsType,storageRoom,searchStr,pageNum,queryType);
}

//物料搜索
function search(){
	var goodsType = $("#goodsType").val();
	var storageRoom = $("#storageRoom").val();
	var searchStr = $("#searchStr").val();
	var queryType = 1;
	if($("#zeroGoods").is(':checked')){
		queryType = 0;
	}
	initGoodsList(goodsType,storageRoom,searchStr,1,queryType);
}
function checkValue(obj){
    var txt_value = $(obj).val().trim();
    if(txt_value=="请输入查询内容"){
        $(obj).val("");    
    };  
}
//物料选择页面全选复选框变动
function checkAllChange(obj){
	if (obj.checked) {
		$("input[name='goodsCheck']").iCheck("check"); 
	} else {
		$("input[name='goodsCheck']").iCheck("uncheck"); 
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

//添加物料
function selectToAddGoods(){
	//获取添加的行号
	var trNum = "";
	$("tr.model_tr").each(function(i){
		if($("#selectGoods_" + i).is(':checked')){
			trNum += i+ ",";
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
		//计算库存
		calculateNum();
		//计算盘点数量
		calculateRealNum();
		//sessionStorage.setItem("inStorage_goodsJson", getGoodsJson());
	}
}

//弹出框添加物料，获取页面json
function getModelJson(){
	//获取页面的数据json
	var goodsInfoOld = '{"goodsList":[';
	$("tr.model_tr").each(function(i){
		if($("#selectGoods_" + i).is(':checked')){
			var goodsId = $("#model_goods_id_" + i).html();
			var goodCode = $("#model_goods_code_" + i).html();
			var goodsName = $("#model_goods_name_" + i).html();
			var goodsSpec = $("#model_goods_spec_" + i).html();
			var goodsNum = $("#model_goods_num_" + i).html();
			var realNum = $("#model_real_num_" + i).html();
			var profitLoss = $("#model_profit_loss_" + i).html();
			var level = $("#model_level_id_" + i).html();;//等级 如果为--则为无
			var levelList = '';//等级列表
			if($("#model_level_list_" + i).html() != ""){
				levelList += '"level_list":[';
				$("#model_level_list_" + i).find("li").each(function(j){
					var id = $(this).attr("levelid");
					var num = $(this).attr("levelnum");
					var levelName = $(this).html();
					levelList += '{"level_id":"' + id + '",';
					levelList += '"num":"' + num + '",';
					levelList += '"level_name":"' + levelName + '"},';
					if(j == 0){
						goodsNum = num;
					}
				});
				levelList = levelList.substring(0, levelList.length-1);
				levelList += ']';
			}else{
				levelList = '"level_list":""';//等级列表
			}
			goodsInfoOld += '{';
			goodsInfoOld += '"goods_id":"' + goodsId + '",';
			goodsInfoOld += '"goods_code":"' + goodCode + '",';
			goodsInfoOld += '"goods_name":"' + goodsName + '",';
			goodsInfoOld += '"goods_spec":"' + goodsSpec + '",';
			goodsInfoOld += '"goods_num":"' + goodsNum + '",';
			goodsInfoOld += '"inventory_num":"' + realNum + '",';
			goodsInfoOld += '"profit_loss":"' + (0-parseFloat(goodsNum)) + '",';
			goodsInfoOld += '"goods_level":"' + level + '",';
			goodsInfoOld += levelList;
			goodsInfoOld += '},';
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

//循环查找为空的行，如果没有则新添加一个,返回空行行数或者新添加的行数index
function queryNextIndex(){
	var index = 0;
	var trNum = $("#goodsTable").find("tr.billTr").length;//现有行数
	$("tr.billTr").each(function(i){
		var goodsId = $("#goods_idtd_" + i).html();
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
//保存盘点单
function saveCheck(){
	var goodsType = $("#goodsType").val();
	var storageRoom = $("#storageRoom").val();
	var operatorId = $("#operatorId").val();
	var comment = $("#comment").val();
	var goodsInfoOld = getGoodsDataJson();
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
	if(comment.length>200){
		alert("备注不能大于200个汉字");
		return;
	}
	if(operatorId == "-1"){
		alert("请选择经办人");
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
	$("#addAllButton").attr("disabled",true);
	$("#printButton").attr("disabled",true);
	$(".mater_name_block").hide();
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
	sessionStorage.clear();
	initBillList();
}

function clearComplete(){
	$('.selectpicker').selectpicker(); 
	$("#login").modal("hide");
}
//页面初始化键盘上下键操作
function keyInit(){
	$(".scancode_btn").click(function(){
    	if($(this).hasClass("scan_no")){
    		
    	}else{
    		alert("扫描条形码时请将输入法切换为英文状态");
    		$("#goodsTable").find("td[name='goods_codetd']").each(function(){
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
    		var trid = $(obj).parents("tr").attr("id");
    		var num = trid.substring(8,trid.length);
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
	var trHeadHtml = $("#goodsTable").find("tr[name='trHead']").html();
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
	if(goodsTypeOld == null && storageRoomId == null && inventoryDate == null && operatorId == null 
			&& comment == null){
		if(stockEchoFlag == "true"){
			inventoryMemory();
		}
	}else{
		if((goodsTypeOld!=null && goodsTypeOld!="-1") || (storageRoomId!=null&& storageRoomId!="-1") || inventoryDate!=null || (operatorId!=null&& operatorId!="-1") || comment!=null){
			if(goodsTypeOld == null ){
				goodsTypeOld = "-1";
			}
			if(storageRoomId == null ){
				storageRoomId = "-1";
			}
			if(inventoryDate == null ){
				inventoryDate = "";
			}
			if(operatorId == null ){
				operatorId = "-1";
			}
			if(comment == null ){
				comment = "";
			}
			pageEcho(goodsTypeOld,storageRoomId,inventoryDate,operatorId,comment,jsonListOld,trHeadHtml);
		}
	}
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
//库存记忆功能回调
function stockEchoComplete(data){
	var id = data.id;
	var goodsTypeOld = data.goodsType;
	var storageRoomId = data.storageRoomId.storageRoomId;
	var inventoryDate =  data.inventoryPeople;
	//var operatorId = data.operatorId;
	//var comment = data.comments;
	if(id != -1){
		if(inventoryDate != null){
			$("#inventoryDate").val(inventoryDate);
		}
		goodsInit();
	}
	
}

//添加所有物料
function addAllGoods(){
	$("#login").modal("show");
	var goodsType = $("#goodsType").val();
	var storageRoom = $("#storageRoom").val();
	var queryType = 0;
	if($("#zeroGoods").is(':checked')){
		queryType = 0;
	}else{
		queryType = 1;
	}
	selectAllGoods(goodsType,storageRoom,queryType);
}
//添加所有物料回调
function addAllComplete(data){
	var goodsList = eval(data);
	if(data.goodsList == null){
		alert("物料为空");
	}else{
		var goodsArr = goodsList.goodsList;
		for(var i = 0; i < goodsArr.length; i++){
			var goods = goodsArr[i];
			var nullTrIndex = queryNextIndex();
			goods.num = nullTrIndex;
			jsonToAddGoods(goods);
		}
		$('.selectpicker').selectpicker(); 
		//计算库存
		calculateNum();
		//计算盘点数量
		calculateRealNum();
		//sessionStorage.setItem("inStorage_goodsJson", getGoodsJson());
	}
	$("#login").modal("hide");
}

//获取页面的数据json
function getGoodsDataJson(){
	var goodsInfoOld = '{"goodsList":[';
	$("tr.billTr").each(function(i){
		if($("#goods_idtd_" + i).html() != ""){
			var goodsId = $("#goods_idtd_" + i).html();
			var goodCode = $("#goods_codetd_" + i).html();
			var goodsName = $("#goods_name_" + i).val();
			var goodsSpec = $("#goods_spectd_" + i).html();
			var goodsNum = $("#batch_numtd_" + i).html();
			var inventoryNum = $("#bill_numtd_" + i).find("input").val();
			var profitLoss = $("#profitLoss_numtd_" + i).html();
			var levelId = "";
			var levelName = "--";
			if($("#leveltd_" + i).html() != "--"){
				levelId = $("#goodslevels_" + i).val();
				$("#leveltd_" + i).find("li.levelli").each(function(){
					if($(this).attr("levelid") == levelId){
						levelName = $(this).html();
					}
				});
			}
			goodsInfoOld += '{';
			goodsInfoOld += '"goods_id":"' + goodsId + '",';
			goodsInfoOld += '"good_code":"' + goodCode + '",';
			goodsInfoOld += '"good_name":"' + goodsName + '",';
			goodsInfoOld += '"goods_spec":"' + goodsSpec + '",';
			goodsInfoOld += '"goods_num":"' + goodsNum + '",';
			goodsInfoOld += '"inventory_num":"' + inventoryNum + '",';
			goodsInfoOld += '"level_id":"' + levelId + '",';
			goodsInfoOld += '"level_name":"' + levelName + '",';
			goodsInfoOld += '"profit_loss":"' + profitLoss + '"},';
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

function prit(){
	var json = getGoodsDataJson();
	var goodsType = $("#goodsType").val();
	var storageRoom = $("#storageRoom").val();
	var date = $("#inventoryDate").val();
	var operator = $("#operatorId").val();
	sessionStorage.setItem("inventoryPrint_json", json);
	if (confirm("确定打印盘点单!")){
		window.open('/stock/InventoryBillPrint.seam?goodsType='+goodsType + '&storageRoom=' + storageRoom + '&date=' + date + '&operator=' + operator,'newwindow','left=' + (jquery(document).width()-900)/2 + ',top=' + (jquery(document).height()-600)/2 + ',height=600,width=1000,scrollbars=yes,toolbar=no,menubar=no,status=no,location=no');
	} else {
		return false;
	}
}

function changeLevel(obj){
	var levelId = $(obj).val();
	var selectedId = $(obj).attr("id");
	var index = selectedId.substring(selectedId.indexOf("_")+1,selectedId.length);
	var num = 0.0;
	$(obj).parent().find("li.levelli").each(function(){
		if($(this).attr("levelid") == levelId){
			num = $(this).attr("levelnum");
			return;
		}
	});
	$("#batch_numtd_" + index).html(parseFloat(num).toFixed(2));
	$("#bill_numtd_" + index).find("input").val("0.0");
	$("#profitLoss_numtd_" + index).html(0 - parseFloat(num).toFixed(2));
	sessionStorage.setItem("inStorage_goodsJson", getGoodsJson());
}
function serach(){
	var type=$("#goodsType").val();
	var val=$("#searchStr").val();
	if(val=='请输入物料编号/物料名称'){
		val="";
	}
	findMaterial(type,val);
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
//分页查询方法
function queryPage(page){
	var goodsType = $("#goodsType").val();
	var searchStr = $("#searchStr").val();
	var roomId=$("#storageRoomId").val();
	var pageNum = page;
	if(searchStr == "请输入物料编号/物料名称"){
		searchStr = "";
	}
	getListByPage(goodsType,searchStr,pageNum,roomId);
}
//添加选中物料信息
function  choiceMaterial(){
	var type=$("#goodsType").val();
	//var storageType=$("#storageType").attr("myInStockTypeId");
		var temp = "";
		ulStr="";
		//获取列表物料名称弹出层数据
		$(".mater_name_list").each(function(){
			ulStr=$(this).html();
			return false;
		});
		//复选框选中的数据
		$("input[name='goodsCheck']:checkbox:checked").each(function(){
			var trStr="";
			var i=0;//tr行数
			var sumNum=0;//tr总行数
			//遍历tr查找是否有空白行
			$(".material_code").each(function(n){
				var val=$(this).text();
				if(val=="" || val==null){
					i=(n+1);
					return false;
				}
				sumNum++;
			});
			//不存在空白行自己生成一个新的tr
			if(i==0){
				i=(sumNum+1);
				var icheckId=this.id;
				var arr=icheckId.split("_");
				temp += $(this).val() + ",";
				if(i%2==0){
					trStr+="<tr class='even material_list_tr'>";
				}else{
					trStr+="<tr class='odd material_list_tr'>";
				}
				trStr+="<td class='td_line' id='index_"+i+"'>"+i+"</td>";
				trStr+="<td class='td_line material_code' id='material_goods_code_"+i+"'>"+$("#goods_code_"+arr[1]).text()+"</td>";
				trStr+="<td class='td_line td_mater' id='material_goods_name_"+i+"'>";
				trStr+="<div class='mater_name_block'>";
				trStr+="<div class='mater_name_hd'>";
				trStr+="<input type='text' class='material_search' value='"+$("#goods_name_"+arr[1]).text()+"' onkeyup='searchLi(this,event,1)'/>";
				trStr+="<i class='add_mater' onclick='addMaterial();'></i>";
				trStr+="</div>";
				trStr+="<div class='mater_name_bd' style='min-width:10%;z-index:9999'>";
				trStr+="<ul class ='mater_name_list' style='height:120px;overflow:auto;'>";
				trStr+=ulStr;
				trStr+="</ul>";
				trStr+="</div>";
				trStr+="<div class='mater_name_bd2' style='min-width:10%;z-index:999'>";
				trStr+="<ul class ='mater_name_list2' style='height:120px;overflow:auto;'>";
				trStr+="</ul>";
				trStr+="</div>";
				trStr+="</div>";
				trStr+="</td>";
				trStr+="<td class='td_line'>";
				trStr+="<select class='selectpicker' id='material_goods_batch_"+i+"' onchange='goodsBatchChange(this)'>";
				var hiddenStr="";
				hiddenStr+="<div style='display:none'>";
				hiddenStr+="<table id='hidden_table_"+i+"'>";
				//把物料选择弹出框页面中的每个物料的隐藏批次信息拿出来拼接后带到列表批次下拉框中，等待使用
				$(".goodsHiddenTr_"+arr[1]).each(function(index){
					var sourceFrom = "-";
					if($("#hidden_storage_change_type_"+arr[1]+"_"+(index+1)).text() == "11"){
						if($("#hidden_purchase_name_"+arr[1]+"_"+(index+1)).text() == ""){
							sourceFrom += "无";
						}else{
							sourceFrom += $("#hidden_purchase_name_"+arr[1]+"_"+(index+1)).text();
						}
					}else{
						if($("#hidden_tunnel_name_"+arr[1]+"_"+(index+1)).text() == ""){
							sourceFrom += "无";
						}else{
							sourceFrom += $("#hidden_tunnel_name_"+arr[1]+"_"+(index+1)).text();
						}
					}
					trStr+="<option id='option_batch_code_"+i+"_"+(index+1)+"'>"+$("#hidden_batch_code_"+arr[1]+"_"+(index+1)).text() + sourceFrom;
					hiddenStr+="<tr id='hidden_tr_"+i+"_"+(index+1)+"'>";
					hiddenStr+="<td id='list_hidden_batch_id_"+i+"_"+(index+1)+"'>"+$("#hidden_batch_id_"+arr[1]+"_"+(index+1)).text()+"</td>";
					hiddenStr+="<td id='list_hidden_batch_code_"+i+"_"+(index+1)+"'>"+$("#hidden_batch_code_"+arr[1]+"_"+(index+1)).text() + sourceFrom+"</td>";
					hiddenStr+="<td id='list_hidden_batch_count_"+i+"_"+(index+1)+"'>"+$("#hidden_batch_count_"+arr[1]+"_"+(index+1)).text()+"</td>";
					hiddenStr+="<td id='list_hidden_level_name_"+i+"_"+(index+1)+"'>"+$("#hidden_level_name_"+arr[1]+"_"+(index+1)).text()+"</td>";
					hiddenStr+="<td id='list_hidden_batch_price_"+i+"_"+(index+1)+"'>"+$("#hidden_batch_price_"+arr[1]+"_"+(index+1)).text()+"</td>";
					hiddenStr+="<td id='list_hidden_tunnel_name_"+i+"_"+(index+1)+"'>"+$("#hidden_tunnel_name_"+arr[1]+"_"+(index+1)).text()+"</td>";
					hiddenStr+="<td id='list_hidden_purchase_name_"+i+"_"+(index+1)+"'>"+$("#hidden_purchase_name_"+arr[1]+"_"+(index+1)).text()+"</td>";
					hiddenStr+="<td id='list_hidden_expire_date_"+i+"_"+(index+1)+"'>"+$("#hidden_expire_date_"+arr[1]+"_"+(index+1)).text()+"</td>";
					hiddenStr+="<td id='list_hidden_storage_change_type_"+i+"_"+(index+1)+"'>"+$("#hidden_storage_change_type_"+arr[1]+"_"+(index+1)).text()+"</td>";
					hiddenStr+="</tr>";
				});
				hiddenStr+="</table>";
				hiddenStr+="</div>";
				trStr+="</select>";
				trStr+=hiddenStr;
				trStr+="</td>";
				if(type==1){
					trStr+="<td class='td_line columnShow' style='' id='material_level_name_"+i+"'>"+$("#hidden_level_name_"+arr[1]+"_1").text()+"</td>";
				}else{
					trStr+="<td class='td_line columnShow' style='display:none' id='material_level_name_"+i+"'>"+$("#hidden_level_name_"+arr[1]+"_1").text()+"</td>";
				}
				trStr+="<td class='td_line' id='material_tunnel_name_"+i+"'>";
				if($("#hidden_storage_change_type_"+arr[1]+"_1").text()=='11'){
					trStr+=$("#hidden_purchase_name_"+arr[1]+"_1").text();
				}else{
					trStr+=$("#hidden_tunnel_name_"+arr[1]+"_1").text();
				}
				trStr+="</td>";
				trStr+="<td class='td_line' id='material_unit_info_"+i+"'>"+$("#unit_info_"+arr[1]).text()+" <div style='display:none'><input type='text' value='"+$(this).parent().prev().text()+"' /> </div> </td>";
				trStr+="<td class='td_line' id='material_goods_count_"+i+"'>"+$("#hidden_batch_count_"+arr[1]+"_1").text()+"</td>";
				trStr+="<td class='td_line' id='material_out_weight_"+i+"'><input type='text' value='1.0' class='form-control' style='text-align: center;' onfocus='oldValue(this);' onkeyup='clearNoNum(this,1);' /> <div style='display:none'> <input type='text' value='"+$("#hidden_batch_count_"+arr[1]+"_1").text()+"' /> </div>  </td>";
				trStr+="<td class='td_line' id='material_total_weight_"+i+"'><input type='text' value='0.0' class='form-control' style='text-align: center;' onfocus='oldValue(this);' onkeyup='clearNoNum(this,4);'/> </td>";
				trStr+="<td class='td_line' style='display:none' id='material_expire_date_"+i+"'><input type='text' value='"+$("#hidden_expire_date_"+arr[1]+"_1").text()+"' onfocus='oldValue(this);' onkeyup='clearNoNum(this,2);' /></td>";
				trStr+="<td class='td_line' style='display:none' id='material_goods_price_"+i+"'><input type='text' class='form-control' style='text-align: center;' value='"+$("#hidden_batch_price_"+arr[1]+"_1").text()+"' onfocus='oldValue(this);' onkeyup='clearNoNum(this,3);' /></td>";
				trStr+="<td class='td_line' name='thPrice' id='material_total_price_"+i+"'><input type='text' class='form-control' style='text-align: center;' value='"+$("#hidden_batch_price_"+arr[1]+"_1").text()+"' onkeyup='clearNoNum(this,4);'/></td>";
				trStr+="<td class='td_line'><a class='icon_link' href='javascript:;' onclick='copMaterial(this)' id='"+i+"'><img src='/asset/images/stock/commons/tableIco_copy2.png' /></a></td>";
				trStr+="<td class='td_line'><a class='icon_link' href='javascript:;' onclick='delMaterial(this)'><img src='/asset/images/stock/commons/tableIco_delect2.png' /></a></td>";
				trStr+="</tr>";
				//因没有空白行则把新生成的tr数据拼接到最后一个tr后面
				$(".material_list_tr:last").after(trStr);
			}else{//存在空白生成新的tr中的td数据
				var icheckId=this.id;
				var arr=icheckId.split("_");
				temp += $(this).val() + ",";
				trStr+="<td class='td_line' id='index_"+i+"'>"+i+"</td>";
				trStr+="<td class='td_line material_code' id='material_goods_code_"+i+"'>"+$("#goods_code_"+arr[1]).text()+"</td>";
				trStr+="<td class='td_line td_mater' id='material_goods_name_"+i+"'>";
				trStr+="<div class='mater_name_block'>";
				trStr+="<div class='mater_name_hd'>";
				trStr+="<input type='text' class='material_search' value='"+$("#goods_name_"+arr[1]).text()+" 'onkeyup='searchLi(this,event,1)' />";
				trStr+="<i class='add_mater' onclick='addMaterial();'></i>";
				trStr+="</div>";
				trStr+="<div class='mater_name_bd' style='min-width:10%;z-index:9999'>";
				trStr+="<ul class ='mater_name_list' style='height:120px;overflow:auto;'>";
				trStr+=ulStr;
				trStr+="</ul>";
				trStr+="</div>";
				trStr+="<div class='mater_name_bd2' style='min-width:10%;z-index:999'>";
				trStr+="<ul class ='mater_name_list2' style='height:120px;overflow:auto;'>";
				trStr+="</ul>";
				trStr+="</div>";
				trStr+="</div>";
				trStr+="</td>";
				trStr+="<td class='td_line'>";
				trStr+="<select class='selectpicker' id='material_goods_batch_"+i+"' onchange='goodsBatchChange(this)'>";
				var hiddenStr="";
				hiddenStr+="<div style='display:none' >";
				hiddenStr+="<table id='hidden_table_"+i+"'>";
				//把物料选择弹出框页面中的每个物料的隐藏批次信息拿出来拼接后带到列表批次下拉框中，等待使用
				$(".goodsHiddenTr_"+arr[1]).each(function(index){
					var sourceFrom = "-";
					if($("#hidden_storage_change_type_"+arr[1]+"_"+(index+1)).text() == "11"){
						if($("#hidden_purchase_name_"+arr[1]+"_"+(index+1)).text() == ""){
							sourceFrom += "无";
						}else{
							sourceFrom += $("#hidden_purchase_name_"+arr[1]+"_"+(index+1)).text();
						}
					}else{
						if($("#hidden_tunnel_name_"+arr[1]+"_"+(index+1)).text() == ""){
							sourceFrom += "无";
						}else{
							sourceFrom += $("#hidden_tunnel_name_"+arr[1]+"_"+(index+1)).text();
						}
					}
					trStr+="<option id='option_batch_code_"+i+"_"+(index+1)+"'>"+$("#hidden_batch_code_"+arr[1]+"_"+(index+1)).text() + sourceFrom;
					hiddenStr+="<tr id='hidden_tr_"+i+"_"+(index+1)+"'>";
					hiddenStr+="<td id='list_hidden_batch_id_"+i+"_"+(index+1)+"'>"+$("#hidden_batch_id_"+arr[1]+"_"+(index+1)).text() +"</td>";
					hiddenStr+="<td id='list_hidden_batch_code_"+i+"_"+(index+1)+"'>"+$("#hidden_batch_code_"+arr[1]+"_"+(index+1)).text()+ sourceFrom+"</td>";
					hiddenStr+="<td id='list_hidden_batch_count_"+i+"_"+(index+1)+"'>"+$("#hidden_batch_count_"+arr[1]+"_"+(index+1)).text()+"</td>";
					hiddenStr+="<td id='list_hidden_level_name_"+i+"_"+(index+1)+"'>"+$("#hidden_level_name_"+arr[1]+"_"+(index+1)).text()+"</td>";
					hiddenStr+="<td id='list_hidden_batch_price_"+i+"_"+(index+1)+"'>"+$("#hidden_batch_price_"+arr[1]+"_"+(index+1)).text()+"</td>";
					hiddenStr+="<td id='list_hidden_tunnel_name_"+i+"_"+(index+1)+"'>"+$("#hidden_tunnel_name_"+arr[1]+"_"+(index+1)).text()+"</td>";
					hiddenStr+="<td id='list_hidden_purchase_name_"+i+"_"+(index+1)+"'>"+$("#hidden_purchase_name_"+arr[1]+"_"+(index+1)).text()+"</td>";
					hiddenStr+="<td id='list_hidden_expire_date_"+i+"_"+(index+1)+"'>"+$("#hidden_expire_date_"+arr[1]+"_"+(index+1)).text()+"</td>";
					hiddenStr+="<td id='list_hidden_storage_change_type_"+i+"_"+(index+1)+"'>"+$("#hidden_storage_change_type_"+arr[1]+"_"+(index+1)).text()+"</td>";
					hiddenStr+="</tr>";
				});
				hiddenStr+="</table>";
				hiddenStr+="</div>";
				trStr+="</select>";
				trStr+=hiddenStr;
				trStr+="</td>";
				if(type==1){
					trStr+="<td class='td_line columnShow' style='' id='material_level_name_"+i+"'>"+$("#hidden_level_name_"+arr[1]+"_1").text()+"</td>";
				}else{
					trStr+="<td class='td_line columnShow' style='display:none' id='material_level_name_"+i+"'>"+$("#hidden_level_name_"+arr[1]+"_1").text()+"</td>";
				}
				//trStr+="<td class='td_line' id='material_tunnel_name_"+i+"'>"+$("#hidden_tunnel_name_"+arr[1]+"_1").text()+"</td>";
				trStr+="<td class='td_line' id='material_tunnel_name_"+i+"'>";
				if($("#hidden_storage_change_type_"+arr[1]+"_1").text()=='11'){
					trStr+=$("#hidden_purchase_name_"+arr[1]+"_1").text();
				}else{
					trStr+=$("#hidden_tunnel_name_"+arr[1]+"_1").text();
				}
				trStr+="</td>";
				trStr+="<td class='td_line' id='material_unit_info_"+i+"'>"+$("#unit_info_"+arr[1]).text()+" <div style='display:none'><input type='text' value='"+$(this).parent().prev().text()+"' /> </div> </td>";
				trStr+="<td class='td_line' id='material_goods_count_"+i+"'>"+$("#hidden_batch_count_"+arr[1]+"_1").text()+"</td>";
				trStr+="<td class='td_line' id='material_out_weight_"+i+"'><input type='text' value='1.0' class='form-control' style='text-align: center;' onfocus='oldValue(this);' onkeyup='clearNoNum(this,1);'/> <div style='display:none'> <input type='text' value='"+$("#hidden_batch_count_"+arr[1]+"_1").text()+"' /> </div>  </td>";
				trStr+="<td class='td_line' id='material_total_weight_"+i+"'><input type='text' value='0.0' class='form-control' style='text-align: center;' onfocus='oldValue(this);' onkeyup='clearNoNum(this,4);'/> </td>";
				trStr+="<td class='td_line' style='display:none' id='material_expire_date_"+i+"'><input type='text' value='"+$("#hidden_expire_date_"+arr[1]+"_1").text()+"' onfocus='oldValue(this);' onkeyup='clearNoNum(this,2);'/></td>";
				trStr+="<td class='td_line' style='display:none' id='material_goods_price_"+i+"'><input type='text' class='form-control' style='text-align: center;' value='"+$("#hidden_batch_price_"+arr[1]+"_1").text()+"' onfocus='oldValue(this);' onkeyup='clearNoNum(this,3);'/></td>";
				trStr+="<td class='td_line' name='thPrice' id='material_total_price_"+i+"'><input type='text' class='form-control' style='text-align: center;' value='"+$("#hidden_batch_price_"+arr[1]+"_1").text()+"' onkeyup='clearNoNum(this,4);'/></td>";
	           	trStr+="<td class='td_line'><a class='icon_link' href='javascript:;' onclick='copMaterial(this)' id='"+i+"'><img src='/asset/images/stock/commons/tableIco_copy2.png' /></a></td>";
				trStr+="<td class='td_line'><a class='icon_link' href='javascript:;' onclick='delMaterial(this)'><img src='/asset/images/stock/commons/tableIco_delect2.png' /></a></td>";
				//把拼接 好的td放到对应空白行tr下
				$(".material_list_tr").each(function(m){
					if((m+1)==i){
						$(this).empty().append(trStr);
					}
				});
			}
			trKeyInit(i);
		});
		//物料选择弹出框没有勾选数据点击提交时提示信息
		if(temp==""){
			alert("请选择物料");
		}
		addNewTr(ulStr);
		addMaterailHd();
		//总计算
		commonCalculate();
		$('.selectpicker').selectpicker();
		var json = getBatchJson();
		//本地存储用于页面刷新回显
		sessionStorage.setItem("outStorage_batchJson", json);
		//单击全选，双击取消全选
		$('input[class="form-control"]').click(function(){
			$(this).select();
	    });
		$('input[class="form-control"]').dblclick(function(){
			$(this).val($(this).val());;
	    });
}
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
var liStr="";			//变量下拉li标签数据
var oldVal=0;			//原始数值
var goodsTypeVal=0;		//物料类型值
var roomVal=0;			//仓库类型值
var outStorageJson="";	//json字符串
$(function(){
	if(gType !=null && gType != "" && gType != "0"){
		$("#goodsType").attr("onchange","");
		$("#goodsType").selectpicker("val",gType);
		$("#goodsType").attr("onchange","goodsTypeChange(this.value);");
	 }
	//检查是否为报损入库，报损入库时物料类型、出库类型、仓库均不可以编辑，此处未设置仓库不可编辑是因为报损出库初始化后物料类型有值，
	//会触法onchange事件仓库模块会刷新,所以设置仓库不可编辑放在仓库刷新回调时
	if(expireBatchId!=null && expireBatchId!=""){
		$("#goodsType").attr("disabled","disabled");
		$("#storageType").attr("disabled","true");
	}
	addButtonSet();								//判断添加按钮是否启用
	$('input[class="iCheck"]').iCheck({
	  checkboxClass: 'icheckbox_minimal-blue'
	});
	var val='#{outStorageHome.serachStr}';
	if(val!=null || val!=""){
		$("#serachStr").val(val);
	}
	listUlInit();								//页面刷新初始化列表物料名称下拉框内容
	var goodsType = $("#goodsType").val();
	goodsTypeVal=goodsType;
	var inStorageType = $("#addBeforeId").val();//编辑页面出库类型赋值
	setInStockType(inStorageType);
	//roomChange(goodsType);						//控制仓库值
	if(isUpdate=="y"){
		addButtonSet();
	}
	ifShowColumn();								//控制等级列是否显示
	outStorageFlow();
	keyInit();									//下面隐藏为方向键控制下拉数据方法
	$("#searchStr").keydown(function(e){		//弹出框回车搜索事件
		if(e.keyCode==13){
			$('#searchButton').trigger("click");
		}
	});
	removeOtherStorage("outStorage");
	if(expireBatchId == "" &&  expireGoodsBatchIdStr == "" && isUpdate == "n"){
		refreshPage();
	}else{
		commonCalculate();						//求和
	}
	nextOrSave();								//控制是原料生产出库的下一步按钮
});
function keyInit(){								//页面初始化键盘上下键操作
	$(".scancode_btn").click(function(){
    	if($(this).hasClass("scan_no")){
    		
    	}else{
    		alert("扫描条形码时请将输入法切换为英文状态");
    		$(".inventory_modal_table").find(".material_list_tr").each(function(i){
    			if($(this).find(".material_code").html()==""){
    				$(this).find(".material_search").focus();
    				return false;
    			}
    		});
    	}
    });
	 $(".material_search").keydown(function(e){
	        e = e || window.event;
	        var keycode = e.which ? e.which : e.keyCode;
	        if(keycode == 38){
	            if($.trim($(this).parent().next().next().find(".mater_name_list2").html())==""){
	                return;
	            }
	            movePrev(this);
	        }else if(keycode == 40){
	            if($.trim($(this).parent().next().next().find(".mater_name_list2").html())==""){
	            	searchLi(this,e,2);
	                return;
	            }
	            if($.trim($(this).parent().next().next().find(".mater_name_list2").html())==""){
	                return;
	            }
	            if($(this).parent().next().next().find(".material_li").hasClass("addbg")){
	                moveNext(this);
	            }else{
	            	$(this).parent().next().next().find(".material_li").removeClass('addbg').eq(0).addClass('addbg');
	            }
	        }else if(keycode == 108 || keycode == 13){
	            dojob(this,keycode);
	        }
	    });
}

var movePrev = function(obj){				//键盘方向键↓操作
    var index = $(obj).parent().next().next().find(".addbg").prevAll().length;
    if(index == 0){
    	$(obj).parent().next().next().find(".material_li").removeClass('addbg').eq($(".material_li").length-1).addClass('addbg');
    }else{
    	$(obj).parent().next().next().find(".material_li").removeClass('addbg').eq(index-1).addClass('addbg');
    }
    $(obj).parent().next().next().find("ul").scrollTop((index-1)*24);
};

var moveNext = function(obj){				//键盘方向键↑操作
    var index = $(obj).parent().next().next().find(".addbg").prevAll().length;
    if(index == $(obj).parent().next().next().find(".material_li").length-1){
    	$(obj).parent().next().next().find(".material_li").removeClass('addbg').eq(0).addClass('addbg');
    }else{
    	$(obj).parent().next().next().find(".material_li").removeClass('addbg').eq(index+1).addClass('addbg');
    }
    $(obj).parent().next().next().find("ul").scrollTop((index-1)*24);
};

var dojob = function(obj,code){				//物料名称输入框键盘回车键操作
    $(obj).blur();
    //当前物料名称输入框内容
    var inVal = jQuery.trim($(obj).val());
    //判断扫描功能是否开启，如果开启则没有scan_no class属性
    var flag=$("#replaceClick").find("a").hasClass("scan_no");
    //判断当前是否存在选中的下拉数据，如果有则执行选中数据的点击事件，没有则在根据扫码功能是否开启来判断是否走扫码功能
	if($(obj).parent().next().next().find(".material_li").hasClass("addbg")){
		 $(obj).parent().next().next().find(".addbg").click();
    }else{
	   	 if(!flag){
	   		 var f=false;
	   		 $(obj).parent().next().find("li").each(function(){
         		var codeVal=$(this).find(".hidden_material_code").val();
         		if(inVal==codeVal){
         			f=true;
         			$(this).click();
         		}
	         });
	   		 if(!f){
	   			 document.getElementById("productMsg").innerHTML = "未查询到对应物料信息!";
		  		 jquery("#myModal").modal('show');
	   		 }
	   	 }else{
	   		$(obj).val("");
	   	 }
    }
   
};

function goodsTypeChange(obj){			//物料类型改变
	var b=ifClearTr(1);
	if(b){
		sRoomId=-1;
		roomChange(obj);				//控制仓库值	
		nextOrSave();					//控制是原料生产出库的下一步按钮
		ifShowColumn();					//控制等级列是否显示
		outStorageFlow();				//控制出库流向显示
		addButtonSet();					//控制添加按钮显示
		goodsTypeVal=obj;
	}else{
		$("#goodsType").val(goodsTypeVal);
		$("#goodsType").attr("onchange","");
		$("#goodsType").selectpicker("val",goodsTypeVal);
		$("#goodsType").attr("onchange","goodsTypeChange(this.value);");
	}
	var goodsType = $("#goodsType").val();
	sessionStorage.setItem("outStorage_goodsType", goodsType);//本地存储用于页面刷新回显
}

function ifShowColumn(){				//列表等级列显示控制
	var goodsType = $("#goodsType").val();
	if(goodsType==0 || goodsType==1){
		$(".columnShow").css("display","");
	}else{
		$(".columnShow").css("display","none");
	}
}

function storageTypeChange(obj){		//出库类型修改
	addButtonSet();						//控制添加按钮显示
	nextOrSave();						//控制是原料生产出库的下一步按钮
	outStorageFlow();					//控制出库流向显示
}
//判断列表区域是否存在已经编辑出库信息，存在则提示，提示后如果继续则清除内容，不继续则需要改变值回退至改变之前
function ifClearTr(num){
	var trflag=false;					//判断是否存在已经编辑出库单信息
	$(".material_code").each(function(n){//遍历tr查找是否在已经编辑tr行
		var val=$(this).text();
		if(val!="" && val!=null){
			trflag=true;
			return false;
		}
	});
	if(trflag){							//有出库信息
		if(num==1){
			var flag=window.confirm("修改物料类型将会重置出库单，确定修改？");
			if(flag){
				trInit();
				return true;
			}else{
				return false;
			}
		}else{
			var flag=window.confirm("修改仓库值将会重置出库单，确定修改？");
			if(flag){
				trInit();
				return true;
			}else{
				return false;
			}
		}
	}
	return true;
}

function outStorageFlow(){					//出库流向控制
	var type=$("#goodsType").val();
	var storageType=$("#storageType").attr("myInStockTypeId");
	if(type==3 && storageType==21){
		//$("#orderinfo").css("display","none");
		$("#memberinfo").css("display","");
	}
	//else if(type==3 && storageType==26){
	//$("#orderinfo").css("display","none");
	//$("#memberinfo").css("display","");
	//$("#orderinfo").css("display","");
	//$("#memberinfo").css("display","none");
	//}
	else{
		//$("#orderinfo").css("display","none");
		$("#memberinfo").css("display","none");
	}
}

function storageRoomChange(){				//仓库修改
	var b=ifClearTr(1);
	if(b){
		addButtonSet();						//控制添加按钮显示
		var goodsType = $("#goodsType").val();
		var roomId=$("#storageRoomId").val();
		if(roomId == null){
			roomId = "-1";
		}
		storageChange(goodsType,roomId);
		roomVal=roomId;
	}else{
		$("#storageRoomId").val(roomVal);
		$("#storageRoomId").attr("onchange","");
		$("#storageRoomId").selectpicker("val",roomVal);
		$("#storageRoomId").attr("onchange","storageRoomChange();");
	}
	var roomId=$("#storageRoomId").val();
	sessionStorage.setItem("outStorage_storageRoomId",roomId);	//本地存储用于页面刷新回显
}

function operatorChange(){										//经办人改变
	var operatorId = $("#operaterId").val();
	sessionStorage.setItem("outStorage_operatorId",operatorId);	//本地存储用于页面刷新回显
}

function outStorageDateChange(){								//出库时间改变
	var outTime = $("#outTime").val();
	sessionStorage.setItem("outStorage_outStorageDate",outTime);//本地存储用于页面刷新回显
}

function commentsChange(){										//备注
	var remark = $("#remark").val().trim();
	sessionStorage.setItem("outStorage_comments",remark);		//本地存储用于页面刷新回显
}

function addButtonSet(){										//添加物料按钮样式及仓库下拉框设置功能
	var type=$("#goodsType").val();
	if(type!=0){
		$("#storageRoomId").removeAttr('disabled');
	}else{
		$("#storageRoomId").attr("disabled","true");
	}
	var storageType=$("#storageType").attr("myInStockTypeId");
	var roomId=$("#storageRoomId").val();
	if(type!=0 && storageType!=0 && roomId!=-1){
		$("#addMaterial").removeAttr('disabled');
		$(".td_mater :input").each(function(){
			$(this).removeAttr('disabled');
			$(this).next().removeAttr('disabled');
		});
	}else{
		$("#addMaterial").attr("disabled","true");
		$(".td_mater :input").each(function(){
			$(this).attr("disabled","true");
			$(this).next().attr("disabled","true");
		});
	}
}

function srHd(){											//物料类型改变仓库联及改变
	$('.selectpicker').selectpicker();
	var type=$("#goodsType").val();
	if(type!=0){
		$("#storageRoomId").removeAttr('disabled');
		//判断初始化时是否存在库存信息(针对编辑及原料生产出库时下一步跳转后的返回功能)
		if(sRoomId !=null && sRoomId != "" && sRoomId != "-1"){
			roomVal=sRoomId;
			$("#storageRoomId").attr("onchange","");
		   	$("#storageRoomId").selectpicker("val",sRoomId);
		   	$("#storageRoomId").attr("onchange","storageRoomChange();");
		   	if(expireBatchId==null || expireBatchId==""){
		   		//此处设置仓库值时解绑了onchange事件导致按钮的事件没有调用，所以此处在非报损出库的情况下补充
				addButtonSet();								//判断添加按钮是否启用
		   	}
		}
		else{//bug
			var storageRoomId = sessionStorage.getItem("outStorage_storageRoomId");
			if(storageRoomId !=null && storageRoomId != "" && storageRoomId != "-1"){
				roomVal=storageRoomId;
				//$("#storageRoomId").attr("onchange","");
			   	$("#storageRoomId").selectpicker("val",storageRoomId);
			   	var bugValue = $("#storageRoomId").val();
			   	if(bugValue==null){
			   		$("#storageRoomId").selectpicker("val",-1);//请选择
			   	}
			   //	$("#storageRoomId").attr("onchange","storageRoomChange();");
			   	if(expireBatchId==null || expireBatchId==""){
			   		//此处设置仓库值时解绑了onchange事件导致按钮的事件没有调用，所以此处在非报损出库的情况下补充
					addButtonSet();								//判断添加按钮是否启用
			   	}
			}
		}
	}else{
		$("#storageRoomId").attr("disabled","true");
	}
	if(expireBatchId!=null && expireBatchId!=""){
		$("#storageRoomId").attr("disabled","disabled");
	}
}

function addMaterial(){										//添加物料初始化
	var type=$("#goodsType").val();
	var roomId=$("#storageRoomId").val();
	addMaterialList(type,roomId);
}

function addMaterailHd(){									//添加物料初始化回调
	$('.mater_name_bd').hide();	
	$("#AddMaterial").modal("show");
}

function updateUlHd(obj){									//仓库修改回调
	var ulStrArray = obj;
	var liStr = "";
	if(ulStrArray!=null&&ulStrArray.length>0){
		for(var i=0;i<ulStrArray.length;i++){
			liStr += "<li class='material_li_"+(i+1)+"' onclick='liClick(this)'> ";
			liStr += ulStrArray[i].material_name;
			liStr += "<div style='display:none'><input type='text' class='hidden_material_id' value='"+ulStrArray[i].material_id+"' />";
			liStr += ("</div></li>");
		}		
	}
	if(liStr!=""){
		$(".mater_name_list").each(function(){
			$(this).empty().append(liStr);
		});
	}
}

function copMaterial(obj){									//复制物料按钮
	var copId = $(obj).closest(".material_list_tr").index();
	var type=$("#goodsType").val();
		ulStr="";
		$(".mater_name_list").each(function(){				//获取列表物料名称弹出层数据
			ulStr=$(this).html();
			return false;
		});
			var trStr="";
			var i=0;										//tr行数
			var sumNum=0;									//tr总行数
			$(".material_code").each(function(n){			//遍历tr查找是否有空白行
				var val=$(this).text();
				if(val=="" || val==null){
					i=(n+1);
					return false;
				}
				sumNum++;
			});
			if(i==0){										//不存在空白行自己生成一个新的tr
				i=(sumNum+1);
				if(i%2==0){
					trStr+="<tr class='even material_list_tr'>";
				}else{
					trStr+="<tr class='odd material_list_tr'>";
				}
				trStr+="<td class='td_line' id='index_"+i+"'>"+i+"</td>";
				trStr+="<td class='td_line material_code' id='material_goods_code_"+i+"'>"+$("#material_goods_code_"+copId).text()+"</td>";
				trStr+="<td class='td_line td_mater' id='material_goods_name_"+i+"'>";
				trStr+="<div class='mater_name_block'>";
				trStr+="<div class='mater_name_hd'>";
				trStr+="<input type='text' class='material_search' value='"+$("#material_goods_name_"+copId).find("div[class='mater_name_block']").find("div[class='mater_name_hd']").find("input[class='material_search']").val()+" 'onkeyup='searchLi(this,event,1)' />";
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
				var j=1;
				while($("#hidden_tr_"+copId+"_"+j).html()!=undefined){
					trStr+="<option id='option_batch_code_"+i+"_"+j+"'>"+$("#option_batch_code_"+copId+"_"+j).text();
					hiddenStr+="<tr id='hidden_tr_"+i+"_"+j+"'>";
					hiddenStr+="<td id='list_hidden_batch_id_"+i+"_"+j+"'>"+$("#list_hidden_batch_id_"+copId+"_"+j).text()+"</td>";
					hiddenStr+="<td id='list_hidden_batch_code_"+i+"_"+j+"'>"+$("#list_hidden_batch_code_"+copId+"_"+j).text()+"</td>";
					hiddenStr+="<td id='list_hidden_batch_count_"+i+"_"+j+"'>"+$("#list_hidden_batch_count_"+copId+"_"+j).text()+"</td>";
					hiddenStr+="<td id='list_hidden_level_name_"+i+"_"+j+"'>"+$("#list_hidden_level_name_"+copId+"_"+j).text()+"</td>";
					hiddenStr+="<td id='list_hidden_batch_price_"+i+"_"+j+"'>"+$("#list_hidden_batch_price_"+copId+"_"+j).text()+"</td>";
					hiddenStr+="<td id='list_hidden_tunnel_name_"+i+"_"+j+"'>"+$("#list_hidden_tunnel_name_"+copId+"_"+j).text()+"</td>";
					hiddenStr+="<td id='list_hidden_purchase_name_"+i+"_"+j+"'>"+$("#list_hidden_purchase_name_"+copId+"_"+j).text()+"</td>";
					hiddenStr+="<td id='list_hidden_expire_date_"+i+"_"+j+"'>"+$("#list_hidden_expire_date_"+copId+"_"+j).text()+"</td>";
					hiddenStr+="<td id='list_hidden_storage_change_type_"+i+"_"+j+"'>"+$("#list_hidden_storage_change_type_"+copId+"_"+j).text()+"</td>";
					hiddenStr+="</tr>";
					j=(parseInt(j)+1).toString();
				}
				hiddenStr+="</table>";
				hiddenStr+="</div>";
				trStr+="</select>";
				trStr+=hiddenStr;
				trStr+="</td>";
				if(type==1){
					trStr+="<td class='td_line columnShow' style='' id='material_level_name_"+i+"'>"+$("#material_level_name_"+copId).text()+"</td>";
				}else{
					trStr+="<td class='td_line columnShow' style='display:none' id='material_level_name_"+i+"'>"+$("#material_level_name_"+copId).text()+"</td>";
				}
				trStr+="<td class='td_line' id='material_tunnel_name_"+i+"'>";
				/*if($("#hidden_storage_change_type_"+copId).text()=='11'){
					trStr+=$("#hidden_purchase_name_"+copId).text();
				}else{*/
					trStr+=$("#material_tunnel_name_"+copId).text();
				/*}*/
				trStr+="</td>";
				trStr+="<td class='td_line' id='material_unit_info_"+i+"'>"+$("#material_unit_info_"+copId).text()+" <div style='display:none'><input type='text' value='"+$("#material_unit_info_"+copId).find("div").find("input").val()+"' /> </div> </td>";
				trStr+="<td class='td_line' id='material_goods_count_"+i+"'>"+$("#material_goods_count_"+copId).text()+"</td>";
				trStr+="<td class='td_line' id='material_out_weight_"+i+"'><input type='text' value='1.0' class='form-control' style='text-align: center;' onfocus='oldValue(this);' onkeyup='clearNoNum(this,1);'/> <div style='display:none'> <input type='text' value='"+$("#material_goods_count_"+copId).text()+"' /> </div>  </td>";
				trStr+="<td class='td_line' id='material_total_weight_"+i+"'><input type='text' value='0.0' class='form-control' style='text-align: center;' onfocus='oldValue(this);' onkeyup='clearNoNum(this,4);'/> </td>";
				trStr+="<td class='td_line' style='display:none' id='material_expire_date_"+i+"'><input type='text' value='"+$("#material_expire_date_"+copId).find("input").val()+"' onfocus='oldValue(this);' onkeyup='clearNoNum(this,2);'/></td>";
				trStr+="<td class='td_line'  id='material_goods_price_"+i+"'><input type='text' class='form-control' style='text-align: center;' value='"+$("#material_goods_price_"+copId).find("input").val()+"' onfocus='oldValue(this);' onkeyup='clearNoNum(this,3);'/></td>";
				trStr+="<td class='td_line' style='display:none' id='material_total_price_"+i+"'>"+$("#material_total_price_"+copId).html()+"</td>";
				trStr+="<td class='td_line'><a class='icon_link' href='javascript:;' onclick='copMaterial(this)'><img src='/asset/images/stock/commons/tableIco_copy2.png' /></a></td>";
				trStr+="<td class='td_line'><a class='icon_link' href='javascript:;' onclick='delMaterial(this)'><img src='/asset/images/stock/commons/tableIco_delect2.png' /></a></td>";
				trStr+="</tr>";
					//因没有空白行则把新生成的tr数据拼接到最后一个tr后面
				$(".material_list_tr:last").after(trStr);
			}else{	//存在空白生成新的tr中的td数据
				trStr+="<td class='td_line' id='index_"+i+"'>"+i+"</td>";
				trStr+="<td class='td_line material_code' id='material_goods_code_"+i+"'>"+$("#material_goods_code_"+copId).text()+"</td>";
				trStr+="<td class='td_line td_mater' id='material_goods_name_"+i+"'>";
				trStr+="<div class='mater_name_block'>";
				trStr+="<div class='mater_name_hd'>";
				trStr+="<input type='text' class='material_search' value='"+$("#material_goods_name_"+copId).find("div[class='mater_name_block']").find("div[class='mater_name_hd']").find("input[class='material_search']").val()+" 'onkeyup='searchLi(this,event,1)' />";
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
				var j=1;
				while($("#hidden_tr_"+copId+"_"+j).html()!=undefined){
					trStr+="<option id='option_batch_code_"+i+"_"+j+"'>"+$("#option_batch_code_"+copId+"_"+j).text();
					hiddenStr+="<tr id='hidden_tr_"+i+"_"+j+"'>";
					hiddenStr+="<td id='list_hidden_batch_id_"+i+"_"+j+"'>"+$("#list_hidden_batch_id_"+copId+"_"+j).text()+"</td>";
					hiddenStr+="<td id='list_hidden_batch_code_"+i+"_"+j+"'>"+$("#list_hidden_batch_code_"+copId+"_"+j).text()+"</td>";
					hiddenStr+="<td id='list_hidden_batch_count_"+i+"_"+j+"'>"+$("#list_hidden_batch_count_"+copId+"_"+j).text()+"</td>";
					hiddenStr+="<td id='list_hidden_level_name_"+i+"_"+j+"'>"+$("#list_hidden_level_name_"+copId+"_"+j).text()+"</td>";
					hiddenStr+="<td id='list_hidden_batch_price_"+i+"_"+j+"'>"+$("#list_hidden_batch_price_"+copId+"_"+j).text()+"</td>";
					hiddenStr+="<td id='list_hidden_tunnel_name_"+i+"_"+j+"'>"+$("#list_hidden_tunnel_name_"+copId+"_"+j).text()+"</td>";
					hiddenStr+="<td id='list_hidden_purchase_name_"+i+"_"+j+"'>"+$("#list_hidden_purchase_name_"+copId+"_"+j).text()+"</td>";
					hiddenStr+="<td id='list_hidden_expire_date_"+i+"_"+j+"'>"+$("#list_hidden_expire_date_"+copId+"_"+j).text()+"</td>";
					hiddenStr+="<td id='list_hidden_storage_change_type_"+i+"_"+j+"'>"+$("#list_hidden_storage_change_type_"+copId+"_"+j).text()+"</td>";
					hiddenStr+="</tr>";
					j=(parseInt(j)+1).toString();
				}
				hiddenStr+="</table>";
				hiddenStr+="</div>";
				trStr+="</select>";
				trStr+=hiddenStr;
				trStr+="</td>";
				if(type==1){
					trStr+="<td class='td_line columnShow' style='' id='material_level_name_"+i+"'>"+$("#material_level_name_"+copId).text()+"</td>";
				}else{
					trStr+="<td class='td_line columnShow' style='display:none' id='material_level_name_"+i+"'>"+$("#material_level_name_"+copId).text()+"</td>";
				}
				trStr+="<td class='td_line' id='material_tunnel_name_"+i+"'>";
				/*if($("#hidden_storage_change_type_"+copId).text()=='11'){
					trStr+=$("#hidden_purchase_name_"+copId).text();
				}else{*/
					trStr+=$("#material_tunnel_name_"+copId).text();
				/*}*/
				trStr+="</td>";
				trStr+="<td class='td_line' id='material_unit_info_"+i+"'>"+$("#material_unit_info_"+copId).text()+" <div style='display:none'><input type='text' value='"+$("#material_unit_info_"+copId).find("div").find("input").val()+"' /> </div> </td>";
				trStr+="<td class='td_line' id='material_goods_count_"+i+"'>"+$("#material_goods_count_"+copId).text()+"</td>";
				trStr+="<td class='td_line' id='material_out_weight_"+i+"'><input type='text' value='1.0' class='form-control' style='text-align: center;' onfocus='oldValue(this);' onkeyup='clearNoNum(this,1);'/> <div style='display:none'> <input type='text' value='"+$("#material_goods_count_"+copId).text()+"' /> </div>  </td>";
				trStr+="<td class='td_line' id='material_total_weight_"+i+"'><input type='text' value='0.0' class='form-control' style='text-align: center;' onfocus='oldValue(this);' onkeyup='clearNoNum(this,4);'/> </td>";
				trStr+="<td class='td_line' style='display:none' id='material_expire_date_"+i+"'><input type='text' value='"+$("#material_expire_date_"+copId).find("input").val()+"' onfocus='oldValue(this);' onkeyup='clearNoNum(this,2);'/></td>";
				trStr+="<td class='td_line'  id='material_goods_price_"+i+"'><input type='text' class='form-control' style='text-align: center;' value='"+$("#material_goods_price_"+copId).find("input").val()+"' onfocus='oldValue(this);' onkeyup='clearNoNum(this,3);'/></td>";
				trStr+="<td class='td_line' style='display:none' id='material_total_price_"+i+"'>"+$("#material_total_price_"+copId).html()+"</td>";
				trStr+="<td class='td_line'><a class='icon_link' href='javascript:;' onclick='copMaterial(this)'><img src='/asset/images/stock/commons/tableIco_copy2.png' /></a></td>";
				trStr+="<td class='td_line'><a class='icon_link' href='javascript:;' onclick='delMaterial(this)'><img src='/asset/images/stock/commons/tableIco_delect2.png' /></a></td>";
				//把拼接 好的td放到对应空白行tr下
				$(".material_list_tr").each(function(m){
					if((m+1)==i){
						$(this).empty().append(trStr);
					}
				});
			}
		trKeyInit(i);
		
		addNewTr(ulStr);					//物料选择弹出框没有勾选数据点击提交时提示信息
		commonCalculate();					//总计算
		$('.selectpicker').selectpicker();
		var json = getBatchJson();
											//本地存储用于页面刷新回显
		sessionStorage.setItem("outStorage_batchJson", json);
}

function goodsBatchChange(obj){				//出库列表物料批次下拉框改变
	var id=$(obj).find("option:checked").attr("id");
	var idStr=id.replace("option_batch_code_","");
	var levelName=$("#list_hidden_level_name_"+idStr).text();
	var tunnelName=$("#list_hidden_tunnel_name_"+idStr).text();
	var expireDate=$("#list_hidden_expire_date_"+idStr).text();
	var batchPrice=$("#list_hidden_batch_price_"+idStr).text();
	var arr=idStr.split("_");
	$("#material_level_name_"+arr[0]).text(levelName);
	$("#material_tunnel_name_"+arr[0]).text(tunnelName);
	$("#material_expire_date_"+arr[0]).find("input").val(expireDate);
	$("#material_goods_price_"+arr[0]).find("input").val(batchPrice);
	$("#material_total_weight_"+arr[0]).find("input").val("0.0");
	$("#material_total_price_"+arr[0]).find("input").val(batchPrice);
	var tdStr="";
	tdStr+="<input type='text' value='1.0' onfocus='oldValue(this);' class='form-control' style='text-align: center;' onkeyup='clearNoNum(this,1);'/> <div style='display:none'> <input type='text' value='"+$("#list_hidden_batch_count_"+idStr).text()+"' /> </div>";
	$("#material_out_weight_"+arr[0]).empty().append(tdStr);
	$("#material_goods_count_"+arr[0]).text($("#list_hidden_batch_count_"+idStr).text());
	commonCalculate();										//总计算
	$('.selectpicker').selectpicker();
	var json = getBatchJson();
	sessionStorage.setItem("outStorage_batchJson", json);	//本地存储用于页面刷新回显
}

function listUlInit(){										//页面刷新初始化列表物料名称下拉框内容
	var goodsType = $("#goodsType").val();
	var roomId=$("#storageRoomId").val();
	if(roomId!=-1){
		storageChange(goodsType,roomId);
	}
}

function liClick(obj){										//点击列表物料名称下拉框
	var goodsType = $("#goodsType").val();
	var storageRoomId = $("#storageRoomId").val();
	var goodsInfoId = $(obj).find("input[class='hidden_material_id']").val();
	var indexID = $(obj).closest(".material_list_tr").index();
	queryMaterial(goodsType,storageRoomId,goodsInfoId,indexID);
}

function liClickCallback(data){								//点击列表物料名称下拉框回调函数
	var getData = data.split("+_+");
	var goodsInfo = JSON.parse(getData[0]);
	var batchList = JSON.parse(getData[1]);
	var i = getData[2];
	var ulStr="";
	var type=$("#goodsType").val();
	$(".mater_name_list").each(function(){					//获取列表物料名称弹出层数据
		ulStr=$(this).html();
		return false;
	});
	var trStr="";
	trStr+="<td class='td_line' id='index_"+i+"'>"+i+"</td>";
	trStr+="<td class='td_line material_code' id='material_goods_code_"+i+"'>"+goodsInfo.goods_code+"</td>";
	trStr+="<td class='td_line td_mater' id='material_goods_name_"+i+"'>";
	trStr+="<div class='mater_name_block'>";
	trStr+="<div class='mater_name_hd'>";
	trStr+="<input type='text' class='material_search' value='"+goodsInfo.goods_name+"' onkeyup='searchLi(this,event,1)'/>";
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
	//把物料名称下拉框页面中的每个物料的隐藏批次信息拿出来拼接后带到列表批次下拉框中，等待使用
	for(var j=0;j<batchList.length;j++){
	    trStr+="<option id='option_batch_code_"+i+"_"+(j+1)+"'>"+batchList[j].batch_code;
		hiddenStr+="<tr id='hidden_tr_"+i+"_"+(j+1)+"'>";
		hiddenStr+="<td id='list_hidden_batch_id_"+i+"_"+(j+1)+"'>"+batchList[j].batch_id+"</td>";
		hiddenStr+="<td id='list_hidden_batch_code_"+i+"_"+(j+1)+"'>"+batchList[j].batch_code+"</td>";
		hiddenStr+="<td id='list_hidden_batch_count_"+i+"_"+(j+1)+"'>"+batchList[j].batch_count+"</td>";
		hiddenStr+="<td id='list_hidden_level_name_"+i+"_"+(j+1)+"'>"+batchList[j].level_name+"</td>";
		hiddenStr+="<td id='list_hidden_batch_price_"+i+"_"+(j+1)+"'>"+batchList[j].batch_price+"</td>";
		hiddenStr+="<td id='list_hidden_tunnel_name_"+i+"_"+(j+1)+"'>"+batchList[j].tunnel_name+"</td>";
		hiddenStr+="<td id='list_hidden_purchase_name_"+i+"_"+(j+1)+"'>"+batchList[j].purchase_name+"</td>";
		hiddenStr+="<td id='list_hidden_expire_date_"+i+"_"+(j+1)+"'>"+batchList[j].expire_date+"</td>";
		hiddenStr+="<td id='list_hidden_storage_change_type_"+i+"_"+(j+1)+"'>"+batchList[j].storage_change_type+"</td>";
		hiddenStr+="</tr>";
	}
	hiddenStr+="</table>";
	hiddenStr+="</div>";
	trStr+="</select>";
	trStr+=hiddenStr;
	trStr+="</td>";
	if(type==1){
		trStr+="<td class='td_line  columnShow' style='' id='material_level_name_"+i+"'>"+goodsInfo.level_name+"</td>";
	}else{
		trStr+="<td class='td_line  columnShow' style='display:none' id='material_level_name_"+i+"'>"+goodsInfo.level_name+"</td>";
	}
	trStr+="<td class='td_line' id='material_tunnel_name_"+i+"'>";
	trStr+=goodsInfo.source;
	trStr+="</td>";
	trStr+="<td class='td_line' id='material_unit_info_"+i+"'>"+goodsInfo.unit_name+" <div style='display:none'><input type='text' value='"+goodsInfo.unit_id+"' /> </div> </td>";
	trStr+="<td class='td_line' id='material_goods_count_"+i+"'>"+goodsInfo.batch_count+"</td>";
	trStr+="<td class='td_line' id='material_out_weight_"+i+"'><input type='text' value='1.0' class='form-control' style='text-align: center;' onfocus='oldValue(this);' onkeyup='clearNoNum(this,1);'/><div style='display:none'> <input type='text' value='"+goodsInfo.batch_count+"' /> </div>  </td>";
	trStr+="<td class='td_line' id='material_total_weight_"+i+"'><input type='text' value='0.0' class='form-control' style='text-align: center;' onfocus='oldValue(this);' onkeyup='clearNoNum(this,4);'/></td>";
	trStr+="<td class='td_line' style='display:none' id='material_expire_date_"+i+"'><input type='text' value='"+goodsInfo.expire_date+"' onfocus='oldValue(this);' onkeyup='clearNoNum(this,2);' /></td>";
	trStr+="<td class='td_line' style='display:none' id='material_goods_price_"+i+"'><input type='text' class='form-control' style='text-align: center;' value='"+goodsInfo.batch_price+"' onfocus='oldValue(this);' onkeyup='clearNoNum(this,3);' /></td>";
	trStr+="<td class='td_line'  name='thPrice' id='material_total_price_"+i+"'><input type='text' class='form-control' style='text-align: center;' value='"+goodsInfo.batch_price+"' onkeyup='clearNoNum(this,4);'/></td>";
	trStr+="<td class='td_line'><a class='icon_link' href='javascript:;' onclick='copMaterial(this)'><img src='/asset/images/stock/commons/tableIco_copy2.png' /></a></td>";	
	trStr+="<td class='td_line'><a class='icon_link' href='javascript:;' onclick='delMaterial(this)' ><img src='/asset/images/stock/commons/tableIco_delect2.png' /></a></td>";
	$(".material_list_tr").each(function(m){			//把拼接 好的td放到对应空白行tr下
		if((m+1)==i){
			$(this).empty().append(trStr);
			return false;
		}
	});
	trKeyInit(i);
	addNewTr(ulStr);
	commonCalculate();										//总计算
	$('.selectpicker').selectpicker();
	$(".inventory_modal_table").find(".material_list_tr").each(function(i){
		if($(this).find(".material_code").html()==""){
			$(this).find(".material_search").focus();
			return false;
		}
	});
	var json = getBatchJson();
	sessionStorage.setItem("outStorage_batchJson", json);	//本地存储用于页面刷新回显
	$('input[class="form-control"]').click(function(){		//单击全选，双击取消全选
		$(this).select();
    });
	$('input[class="form-control"]').dblclick(function(){
		$(this).val($(this).val());;
    });
}

function addNewTr(ulStr){					//判断当前添加出库物料数量，当达到8条数据后会默认在最下方添加一条空数据
	var type=$("#goodsType").val();
	var i=0;								//tr行数
	var sumNum=0;							//tr总行数
	var trStr="";
	$(".material_code").each(function(n){	//遍历tr查找是否有空白行
		var val=$(this).text();
		if(val=="" || val==null){
			i=(n+1);
			return false;
		}
		sumNum++;
	});
	if(i==0){
		i=(sumNum+1);
		if(i%2==0){
			trStr+="<tr class='even material_list_tr'>";
		}else{
			trStr+="<tr class='odd material_list_tr'>";
		}
		trStr+="<td class='td_line' id='index_"+i+"'>"+i+"</td>";
		trStr+="<td class='td_line material_code' id='material_goods_code_"+i+"'></td>";
		trStr+="<td class='td_line td_mater' id='material_goods_name_"+i+"'>";
		trStr+="<div class='mater_name_block'>";
		trStr+="<div class='mater_name_hd'>";
		trStr+="<input type='text' class='material_search' value='' onkeyup='searchLi(this,event,1)'/>";
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
		trStr+="</td>";
		if(type==1){
			trStr+="<td class='td_line columnShow' style='' id='material_level_name_"+i+"'></td>";
		}else{
			trStr+="<td class='td_line columnShow' style='display:none' id='material_level_name_"+i+"'></td>";
		}
		trStr+="<td class='td_line' id='material_tunnel_name_"+i+"'></td>";
		trStr+="<td class='td_line' id='material_unit_info_"+i+"'></td>";
		trStr+="<td class='td_line' id='material_goods_count_"+i+"'></td>";
		trStr+="<td class='td_line' id='material_out_weight_"+i+"'></td>";
		trStr+="<td class='td_line' id='material_total_weight_"+i+"'></td>";
		trStr+="<td class='td_line' style='display:none' id='material_expire_date_"+i+"'></td>";
		trStr+="<td class='td_line' style='display:none' id='material_goods_price_"+i+"'></td>";
		trStr+="<td class='td_line' name='thPrice' id='material_total_price_"+i+"'></td>";
		trStr+="<td class='td_line'></td>";
		trStr+="<td class='td_line'></td>";
		trStr+="</tr>";
		//因没有空白行则把新生成的tr数据拼接到最后一个tr后面
		$(".material_list_tr:last").after(trStr);
		$('.selectpicker').selectpicker();
		trKeyInit(i);
	}
}

function delMaterial(obj){					//删除待出库物料信息
	var type=$("#goodsType").val();
	var i=$(obj).closest(".material_list_tr").index();
	var trStr="";
	var ulStr="";
	
	$(".mater_name_list").each(function(){	//获取列表物料名称弹出层数据
		ulStr=$(this).html();
		return false;
	});
	trStr+="<td class='td_line' id='index_"+i+"'>"+i+"</td>";
	trStr+="<td class='td_line material_code' id='material_goods_code_"+i+"'></td>";
	trStr+="<td class='td_line td_mater' id='material_goods_name_"+i+"'>";
	trStr+="<div class='mater_name_block'>";
	trStr+="<div class='mater_name_hd'>";
	trStr+="<input type='text' class='material_search' value='' onkeyup='searchLi(this,event,1)'/>";
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
	trStr+="</td>";
	if(type==1){
		trStr+="<td class='td_line columnShow' style='' id='material_level_name_"+i+"'></td>";
	}else{
		trStr+="<td class='td_line columnShow' style='display:none' id='material_level_name_"+i+"'></td>";
	}
	trStr+="<td class='td_line' id='material_tunnel_name_"+i+"'></td>";
	trStr+="<td class='td_line' id='material_unit_info_"+i+"'></td>";
	trStr+="<td class='td_line' id='material_goods_count_"+i+"'></td>";
	trStr+="<td class='td_line' id='material_out_weight_"+i+"'></td>";
	trStr+="<td class='td_line' id='material_total_weight_"+i+"'></td>";
	trStr+="<td class='td_line' style='display:none' id='material_expire_date_"+i+"'></td>";
	trStr+="<td class='td_line' style='display:none' id='material_goods_price_"+i+"'></td>";
	trStr+="<td class='td_line' name='thPrice' id='material_total_price_"+i+"'></td>";
	trStr+="<td class='td_line'></td>";
	trStr+="</tr>";
	$(".material_list_tr").each(function(m){
		if((m+1)==i){
			$(this).empty().append(trStr);
			return false;
		}
	});
	trKeyInit(i);
	clearTr();												//清理tr行数
	commonCalculate();										//总计算
	$('.selectpicker').selectpicker();
	var json = getBatchJson();
	sessionStorage.setItem("outStorage_batchJson", json);	//本地存储用于页面刷新回显
}
//当添加物料信息大于8行，并且当删除大于8行的数据时进行判断验证是否清理最大空白tr行
function clearTr(){
	var nullTr=0;
	var trLen=$(".material_list_tr").length;
	if(Number(trLen)>8){									//判断整体tr行数是否大于8
		$(".material_list_tr").each(function(index){		//判断除去最后一行是否还存在空白行
			if((index+1)<trLen){
				var codeVal=$(this).find(".material_code").text();
				if(codeVal=="" ||codeVal==null){
					nullTr=(index+1);
				}
			}
		});
		if(nullTr>0){										//判断最后一行数据是否空白
			var lastTrCodeName=$(".material_list_tr").last().find(".material_code").text();
			if(lastTrCodeName=="" ||lastTrCodeName==null){
				$(".material_list_tr").last().remove();
				clearTr();
			}
		}
	}
}

function searchLi(obj,event,num){							//物料名称输入框级联查询功能
	var code=event.keyCode;
	var inVal = jQuery.trim($(obj).val());
	if(code!=40 && code!=38 ){
		var val="";
		$(obj).parent().next().next().find(".mater_name_list2").empty();
		$(obj).parent().next().find(".mater_name_list li").each(function(i){
			var liTextVal=$(this).text().replace($(this).find(":first").text(),"");
			if(inVal!=""){
				if(liTextVal.indexOf(inVal)>0){
					val +="<li class='material_li material_li_"+(i+1)+"' onmouseenter='getFocus(this)' onclick='liClick(this)'>";
					val +=$(this).html();
					val +="</li>";
				}
			}else{
				val +="<li class='material_li material_li_"+(i+1)+"' onmouseenter='getFocus(this)' onclick='liClick(this)'>";
				val +=$(this).html();
				val +="</li>";
			}
		});
		if(val == ""){
			val+="<li disabled='disabled'>无</li>";
		}
		$(obj).parent().next().next().find(".mater_name_list2").append(val);
		$('.mater_name_bd').hide();	
		$(obj).parent().next().next().css('display','block');
	}else if((code==40 || code==38) && num==2){
		var val="";
		$(obj).parent().next().next().find(".mater_name_list2").empty();
		$(obj).parent().next().find(".mater_name_list li").each(function(i){
			var liTextVal=$(this).text().replace($(this).find(":first").text(),"");
			if(inVal!=""){
				if(liTextVal.indexOf(inVal)>0){
					val +="<li class='material_li material_li_"+(i+1)+"' onmouseenter='getFocus(this)' onclick='liClick(this)'>";
					val +=$(this).html();
					val +="</li>";
				}
			}else{
				val +="<li class='material_li material_li_"+(i+1)+"' onmouseenter='getFocus(this)' onclick='liClick(this)'>";
				val +=$(this).html();
				val +="</li>";
			}
			
		});
		$(obj).parent().next().next().find(".mater_name_list2").append(val);
		$('.mater_name_bd').hide();	
		$(obj).parent().next().next().css('display','block');
	}
}

function getFocus(obj){								//给下拉选项添加样式
    $(".material_li").removeClass("addbg");
    $(obj).addClass("addbg");						//验证填写数据是否为数字,非数字清除
}

function clearNoNum(obj,num){
	obj.value = obj.value.replace(/[^\d.]/g,"");  	//清除“数字”和“.”以外的字符  
	obj.value = obj.value.replace(/^\./g,"");  		//验证第一个字符是数字而不是. 
	obj.value = obj.value.replace(/\.{2,}/g,"."); 	//只保留第一个. 清除多余的.   
	obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
	if(num==1){
		var storageNum=$(obj).next().find("input").val();
		if(Number(obj.value)>Number(storageNum)){
			alert("出库数量不能大于库存数量...");
			$(obj).val(0.0);
		}else{
			outWeigth(obj);
		}
	}else if(num==2){
		updateExpirationDate(obj);
	}else if(num==3){
		price(obj);
	}else{
		commonCalculate();
	}
	var json = getBatchJson();
	sessionStorage.setItem("outStorage_batchJson", json);	//本地存储用于页面刷新回显
}

function updateExpirationDate(obj){							//保质期输入数值验证
	var expirationDate=obj.value;
	var reg = new RegExp("^[1-9]*[1-9][0-9]*$");  
	if(reg.test(expirationDate)){
    	if (expirationDate>10000) {
			alert("保质期不能大于10000...");
			$(obj).val(1);
		} 
	}else {
		alert("保质期只能为正整数...");
		$(obj).val(1);
	}
}

function outWeigth(obj){									//验证出库量数值
	if(obj.value>1000000){
		alert("出库量不能大于1000000...");
		$(obj).val(0.0);
		calculate(obj);
	}else{
		calculate(obj);
	}
}
//验证单价数值
function  price(obj){
	if(obj.value>100000){
		alert("单价值不能大于100000...");
		$(obj).val(1);
		calculate(obj);
	}else{
		calculate(obj);
	}
}
//得到焦点时保存原始包装数量值
function oldValue(obj){
	oldVal=obj.value;
}
//物料总价及重量统计
function calculate(obj){
	var tdID=$(obj).parent().attr("id");
	var trNum=tdID.replace("material_out_weight_","");
	trNum=trNum.replace("material_goods_price_","");
	var weight=$("#material_out_weight_"+trNum).find("input").val();
	var price=$("#material_goods_price_"+trNum).find("input").val();
	$("#material_total_price_"+trNum).find("input").val(Number(weight*price).toFixed(2));
	commonCalculate();						//总计算
}

function commonCalculate(){					//总重量和价格统计
	var totalPrice=0;
	var totalWeight=0;
	$(".material_list_tr").each(function(index){
		var code=$("#material_goods_code_"+(index+1)).text();
		if(code!=""){
			var trPrice=$("#material_total_price_"+(index+1)).text();
			totalPrice+=Number(trPrice);
			var trWeight=$("#material_total_weight_"+(index+1)).find("input").val();
			totalWeight+=Number(trWeight);
		}
	});
	$("#show_total_weight").empty().append("出库总重量：<em>"+totalWeight+"</em>kg");
	$("#show_total_price").empty().append("价格：<em>￥"+totalPrice+"</em>元");
}

function outValidateSave(){						//出库提交验证
	var goodsType=$("#goodsType").val();
	if(goodsType=="" || goodsType=="0"){
		 document.getElementById("productMsg").innerHTML = "请选择物料类型!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var storageType=$("#storageType").attr("myInStockTypeId");
	if(storageType=="" || storageType=="0"){
		 document.getElementById("productMsg").innerHTML = "请选择出库类型!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var storageRoom=$("#storageRoomId").val();
	if(storageRoom=="" || storageRoom=="-1"){
		 document.getElementById("productMsg").innerHTML = "请选择仓库!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var operater=$("#operaterId").val();
	if(operater=="" || operater=="-1"){
		 document.getElementById("productMsg").innerHTML = "请选择经办人!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var outTime=$("#outTime").val();
	if(outTime==""){
		 document.getElementById("productMsg").innerHTML = "请选择出库时间!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var remark=$("#remark").val().trim();
	if(remark!="" && remark.length>200){
		 document.getElementById("productMsg").innerHTML = "备注信息长度不能超过200!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	if(storageType==orderType){
		/*jquery("#outForm\\:orderInfoIdHidden").val(jquery("#orderInfoId").val());*/
	}else if(storageType==memberType){
		jquery("#outForm\\:memberInfoIdHidden").val(jquery("#memberInfoId").val());
	}
	//拼接出库json
	joinResultJson();
	if(outStorageJson=="[]"){
		 document.getElementById("productMsg").innerHTML = "出库信息不能为空";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var flag=false;
	$(".material_list_tr").each(function(i){
		
		var code=$("#material_goods_code_"+(i+1)).text();  
		if(code!=""){
			var weight=$("#material_out_weight_"+(i+1)).find(".form-control").val();
			if(Number(weight)<=0){
				flag=true;
			}
		}
		if(flag){
			   return false;
		}
	});
	if(flag){
		 document.getElementById("productMsg").innerHTML = "出库量必须大于0";
		   jquery("#myModal").modal('show');
		   return false;
	}
	flag = false;
	$(".material_list_tr").each(function(i){
		var code=$("#material_goods_code_"+(i+1)).text();  
		if(code!=""){
			var weight=$("#material_total_price_"+(i+1)).find(".form-control").val();
			if(weight == "" || Number(weight)<0){
				flag=true;
			}
		}
		if(flag){
			   return false;
		}
	});
	if(flag){
		 document.getElementById("productMsg").innerHTML = "请填写正确的物料总价";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var numFlag = false;
	$(".material_list_tr").each(function(i){
		var batch=$("#material_goods_batch_"+(i+1)).val();  
		if(batch!="" && batch != undefined){
			var total=$("#material_goods_count_"+(i+1)).html();
			var weight1=Number($("#material_out_weight_"+(i+1)).find(".form-control").val());
			$(".material_list_tr").each(function(j){
				var batch1=$("#material_goods_batch_"+(j+1)).val();  
				if(j!=i && batch1!="" && batch1 == batch){
					weight1 += Number($("#material_out_weight_"+(j+1)).find(".form-control").val());
				}
			});
			if(parseFloat(weight1.toFixed(3)) > parseFloat(Number(total).toFixed(3))){
				numFlag = true;
				return false;
			}
		}
	});
	if(numFlag){
		 document.getElementById("productMsg").innerHTML = "出库量不能大于库存量";
		   jquery("#myModal").modal('show');
		   return false;
	}
	$("#login").show();
	$("#outForm\\:hiddenGoodsType").val(goodsType);
	$("#outForm\\:hiddenStorageType").val(storageType);
	$("#outForm\\:hiddenStorageRoomId").val(storageRoom);
	$("#outForm\\:hiddenOperaterId").val(operater);
	$("#outForm\\:hiddenOutTime").val(outTime);
	$("#outForm\\:hiddenRemark").val(remark);
	$("#outForm\\:hiddenJsonStr").val(outStorageJson);
	/*var orderInfoId = 0;*/
	var memberInfoId = jquery("#memberInfoId").val();
	outStorage(goodsType,storageType,storageRoom,operater,outTime,remark,outStorageJson,memberInfoId);
}

function outValidateNext(){					//出库提交验证
	var goodsType=$("#goodsType").val();
	if(goodsType=="" || goodsType=="0"){
		 document.getElementById("productMsg").innerHTML = "请选择物料类型!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var storageType=$("#storageType").attr("myInStockTypeId");
	if(storageType=="" || storageType=="0"){
		 document.getElementById("productMsg").innerHTML = "请选择出库类型!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var storageRoom=$("#storageRoomId").val();
	if(storageRoom=="" || storageRoom=="-1"){
		 document.getElementById("productMsg").innerHTML = "请选择仓库!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var operater=$("#operaterId").val();
	if(null == operater || operater=="" || operater=="-1"){
		 document.getElementById("productMsg").innerHTML = "请选择经办人!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var outTime=$("#outTime").val();
	if(outTime==""){
		 document.getElementById("productMsg").innerHTML = "请选择出库时间!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var remark=$("#remark").val().trim();
	if(remark!="" && remark.length>200){
		 document.getElementById("productMsg").innerHTML = "备注信息长度不能超过200!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	if(storageType==orderType){
		/*jquery("#outForm\\:orderInfoIdHidden").val(jquery("#orderInfoId").val());*/
	}else if(storageType==memberType){
		jquery("#outForm\\:memberInfoIdHidden").val(jquery("#memberInfoId").val());
	}
	//拼接出库json
	joinResultJson();
	if(outStorageJson=="[]"){
		 document.getElementById("productMsg").innerHTML = "出库信息不能为空";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var flag=false;
	$(".material_list_tr").each(function(i){
		var code=$("#material_goods_code_"+(i+1)).text();  
		if(code!=""){
			var weight=$("#material_out_weight_"+(i+1)).find(".form-control").val();
			if(Number(weight)<=0){
				flag=true;
			}
		}
		if(flag){
			   return false;
		}
	});
	if(flag){
		 document.getElementById("productMsg").innerHTML = "出库量必须大于0";
		   jquery("#myModal").modal('show');
		   return false;
	}
	flag = false;
	$(".material_list_tr").each(function(i){
		var code=$("#material_goods_code_"+(i+1)).text();  
		if(code!=""){
			var weight=$("#material_total_price_"+(i+1)).find(".form-control").val();
			if(weight == "" || Number(weight)<0){
				flag=true;
			}
		}
		if(flag){
			   return false;
		}
	});
	if(flag){
		 document.getElementById("productMsg").innerHTML = "请填写正确的物料总价";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var numFlag = false;
	$(".material_list_tr").each(function(i){
		var batch=$("#material_goods_batch_"+(i+1)).val();  
		if(batch!="" && batch != undefined){
			var total=$("#material_goods_count_"+(i+1)).html();
			var weight1=Number($("#material_out_weight_"+(i+1)).find(".form-control").val());
			$(".material_list_tr").each(function(j){
				var batch1=$("#material_goods_batch_"+(j+1)).val();  
				if(j!=i && batch1!="" && batch1 == batch){
					weight1 += Number($("#material_out_weight_"+(j+1)).find(".form-control").val());
				}
			});
			if(parseFloat(weight1.toFixed(3)) > parseFloat(Number(total).toFixed(3))){
				numFlag = true;
				return false;
			}
		}
	});
	if(numFlag){
		 document.getElementById("productMsg").innerHTML = "出库量不能大于库存量";
		   jquery("#myModal").modal('show');
		   return false;
	}
	$("#login").show();
	$("#outForm\\:hiddenGoodsType").val(goodsType);
	$("#outForm\\:hiddenStorageType").val(storageType);
	$("#outForm\\:hiddenStorageRoomId").val(storageRoom);
	$("#outForm\\:hiddenOperaterId").val(operater);
	$("#outForm\\:hiddenOutTime").val(outTime);
	$("#outForm\\:hiddenRemark").val(remark);
	$("#outForm\\:hiddenJsonStr").val(outStorageJson);
	/*var orderInfoId = jquery("#outForm\\:memberInfoIdHidden").val();*/
	var memberInfoId = jquery("#outForm\\:memberInfoIdHidden").val();
	nextSave(goodsType,storageType,storageRoom,operater,outTime,remark,outStorageJson,memberInfoId);
}
//出库提交验证
function outValidateUpdate(){
	var goodsType=$("#goodsType").val();
	if(goodsType=="" || goodsType=="0"){
		 document.getElementById("productMsg").innerHTML = "请选择物料类型!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var storageType=$("#storageType").attr("myInStockTypeId");
	if(storageType=="" || storageType=="0"){
		 document.getElementById("productMsg").innerHTML = "请选择出库类型!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var storageRoom=$("#storageRoomId").val();
	if(storageRoom=="" || storageRoom=="-1"){
		 document.getElementById("productMsg").innerHTML = "请选择仓库!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var operater=$("#operaterId").val();
	if(operater=="" || operater=="-1"){
		 document.getElementById("productMsg").innerHTML = "请选择经办人!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var outTime=$("#outTime").val();
	if(outTime==""){
		 document.getElementById("productMsg").innerHTML = "请选择出库时间!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var remark=$("#remark").val().trim();
	if(remark!="" && remark.length>200){
		 document.getElementById("productMsg").innerHTML = "备注信息长度不能超过200!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	if(storageType==orderType){
		/*jquery("#outForm\\:orderInfoIdHidden").val(jquery("#orderInfoId").val());*/
	}else if(storageType==memberType){
		jquery("#outForm\\:memberInfoIdHidden").val(jquery("#memberInfoId").val());
	}
	joinResultJson();
	if(outStorageJson=="[]"){
		 document.getElementById("productMsg").innerHTML = "出库信息不能为空";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var flag=false;
	$(".material_list_tr").each(function(i){
		
		var code=$("#material_goods_code_"+(i+1)).text();  
		if(code!=""){
			var weight=$("#material_out_weight_"+(i+1)).find(".form-control").val();
			if(Number(weight)<=0){
				flag=true;
			}
		}
		if(flag){
			   return false;
		}
	});
	if(flag){
		 document.getElementById("productMsg").innerHTML = "出库量必须大于0";
		   jquery("#myModal").modal('show');
		   return false;
	}
	flag = false;
	$(".material_list_tr").each(function(i){
		var code=$("#material_goods_code_"+(i+1)).text();  
		var batch=$("#material_goods_batch_"+(i+1)).val(); 
		if(code!="" && batch != undefined){
			var weight=$("#material_total_price_"+(i+1)).find(".form-control").val();
			if(weight == "" || Number(weight)<0){
				flag=true;
			}
		}
		if(flag){
			   return false;
		}
	});
	if(flag){
		 document.getElementById("productMsg").innerHTML = "请填写正确的物料总价";
		   jquery("#myModal").modal('show');
		   return false;
	}
	$("#login").show();
	$("#outForm\\:hiddenGoodsType").val(goodsType);
	$("#outForm\\:hiddenStorageType").val(storageType);
	$("#outForm\\:hiddenStorageRoomId").val(storageRoom);
	$("#outForm\\:hiddenOperaterId").val(operater);
	$("#outForm\\:hiddenOutTime").val(outTime);
	$("#outForm\\:hiddenRemark").val(remark);
	$("#outForm\\:hiddenJsonStr").val(outStorageJson);
	/*var orderInfoId = jquery("#outForm\\:memberInfoIdHidden").val();*/
	var memberInfoId = jquery("#outForm\\:memberInfoIdHidden").val();
	/*updateStorage(goodsType,storageType,storageRoom,operater,outTime,remark,outStorageJson,orderInfoId,memberInfoId);*/
	var storageRoomIdBack =  $("#storageRoomIdBackId").val();
	var goodsTypeBack = $("#goodsTypeBackId").val();
	var beginTimeBack = $("#beginTimeBackId").val();
	var endTimeBack = $("#endTimeBackId").val();
	var operaterIdBack = $("#operaterIdBackId").val();
	var storageTypeBack = $("#storageTypeBackId").val();
	var searchStrBack = $("#searchStrBackId").val();
	var thisPageBack = $("#thisPageBackId").val();
	var idUp = "y";
	updateStorage(goodsType,storageType,storageRoom,operater,outTime,remark,outStorageJson,memberInfoId,
			storageRoomIdBack,goodsTypeBack,beginTimeBack,endTimeBack,operaterIdBack,storageTypeBack,searchStrBack,thisPageBack,idUp
	);	
}

function outValidateEditNext(){					//出库提交验证
	var goodsType=$("#goodsType").val();
	if(goodsType=="" || goodsType=="0"){
		 document.getElementById("productMsg").innerHTML = "请选择物料类型!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var storageType=$("#storageType").attr("myInStockTypeId");
	if(storageType=="" || storageType=="0"){
		 document.getElementById("productMsg").innerHTML = "请选择出库类型!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var storageRoom=$("#storageRoomId").val();
	if(storageRoom=="" || storageRoom=="-1"){
		 document.getElementById("productMsg").innerHTML = "请选择仓库!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var operater=$("#operaterId").val();
	if(operater=="" || operater=="-1"){
		 document.getElementById("productMsg").innerHTML = "请选择经办人!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var outTime=$("#outTime").val();
	if(outTime==""){
		 document.getElementById("productMsg").innerHTML = "请选择出库时间!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var remark=$("#remark").val().trim();
	if(remark!="" && remark.length>200){
		 document.getElementById("productMsg").innerHTML = "备注信息长度不能超过200!";
		   jquery("#myModal").modal('show');
		   return false;
	}
	if(storageType==orderType){
		/*jquery("#outForm\\:orderInfoIdHidden").val(jquery("#orderInfoId").val());*/
	}else if(storageType==memberType){
		jquery("#outForm\\:memberInfoIdHidden").val(jquery("#memberInfoId").val());
	}
	joinResultJson();
	if(outStorageJson=="[]"){
		 document.getElementById("productMsg").innerHTML = "出库信息不能为空";
		   jquery("#myModal").modal('show');
		   return false;
	}
	var flag=false;
	$(".material_list_tr").each(function(i){
		
		var code=$("#material_goods_code_"+(i+1)).text();  
		if(code!=""){
			var weight=$("#material_out_weight_"+(i+1)).find(".form-control").val();
			if(Number(weight)<=0){
				flag=true;
			}
		}
		if(flag){
			   return false;
		}
	});
	if(flag){
		 document.getElementById("productMsg").innerHTML = "出库量必须大于0";
		   jquery("#myModal").modal('show');
		   return false;
	}
	flag = false;
	$(".material_list_tr").each(function(i){
		var code=$("#material_goods_code_"+(i+1)).text();  
		if(code!=""){
			var weight=$("#material_total_price_"+(i+1)).find(".form-control").val();
			if(weight == "" || Number(weight)<0){
				flag=true;
			}
		}
		if(flag){
			   return false;
		}
	});
	if(flag){
		 document.getElementById("productMsg").innerHTML = "请填写正确的物料总价";
		   jquery("#myModal").modal('show');
		   return false;
	}
	$("#login").show();
	$("#outForm\\:hiddenGoodsType").val(goodsType);
	$("#outForm\\:hiddenStorageType").val(storageType);
	$("#outForm\\:hiddenStorageRoomId").val(storageRoom);
	$("#outForm\\:hiddenOperaterId").val(operater);
	$("#outForm\\:hiddenOutTime").val(outTime);
	$("#outForm\\:hiddenRemark").val(remark);
	$("#outForm\\:hiddenJsonStr").val(outStorageJson);
	/*var orderInfoId = jquery("#outForm\\:memberInfoIdHidden").val();*/
	var memberInfoId = jquery("#outForm\\:memberInfoIdHidden").val();
	/*editNextSave(goodsType,storageType,storageRoom,operater,outTime,remark,outStorageJson,orderInfoId,memberInfoId);*/
	var storageRoomIdBack =  $("#storageRoomIdBackId").val();
	var goodsTypeBack = $("#goodsTypeBackId").val();
	var beginTimeBack = $("#beginTimeBackId").val();
	var endTimeBack = $("#endTimeBackId").val();
	var operaterIdBack = $("#operaterIdBackId").val();
	var storageTypeBack = $("#storageTypeBackId").val();
	var searchStrBack = $("#searchStrBackId").val();
	var thisPageBack = $("#thisPageBackId").val();
	var idUp = "y";
	editNextSave(goodsType,storageType,storageRoom,operater,outTime,remark,outStorageJson,memberInfoId,
			storageRoomIdBack,goodsTypeBack,beginTimeBack,endTimeBack,operaterIdBack,storageTypeBack,searchStrBack,thisPageBack,idUp		
	);
}
//拼接 保存出库 json
function joinResultJson(){
	var jsonStr = "[";
	jQuery(".material_list_tr").each(function(index){
		var code=$("#material_goods_code_"+(index+1)).text();
		if (code != null && code != '') {
			var id= $("#material_goods_batch_"+(index+1)).find("option:checked").attr("id");
			var idStr= id.replace("option_batch_code_","");
			var batchId=$("#list_hidden_batch_id_"+idStr).text();
			var outWeight=$("#material_out_weight_"+(index+1)).find("input").val();
			var totalWeight=$("#material_total_weight_"+(index+1)).find("input").val();
			var unitprice=$("#material_goods_price_"+(index+1)).find("input").val();//单价
			var price=$("#material_total_price_"+(index+1)).find("input").val();//总价
			var expireDate=$("#material_expire_date_"+(index+1)).find("input").val();
			var unitId=$("#material_unit_info_"+(index+1)).find("input").val();
			if(outWeight==null || outWeight==""){
				outWeight=0;
			}
			if(totalWeight==null || totalWeight==""){
				totalWeight=0;
			}
			if(price==null || price==""){
				price=0;
			}
			if(expireDate==null || expireDate==""){
				expireDate=0;
			}
			jsonStr += "{";
			jsonStr += "goods_batch_id:" + batchId;
			jsonStr += ",out_weight:" + Number(outWeight);
			jsonStr += ",total_weight:" + totalWeight;
			jsonStr += ",unit_price:" + unitprice;
			jsonStr += ",price:" + price;
			jsonStr += ",expire_date:" + expireDate;
			jsonStr += ",unit_info_id:" + Number(unitId);
			jsonStr += "},";
		}
	});
	if (jsonStr != "[") {
		jsonStr = jsonStr.substring(0, jsonStr.length - 1);
	}
	jsonStr += "]";
	outStorageJson = jsonStr;
}
//商品入库审核判断
function  nextOrSave(){
	var goodsType=$("#goodsType").val();
	var storageType=$("#storageType").attr("myInStockTypeId");
	if(goodsType==1 && storageType!=23 && proAudit==1){
		if(scfId!=null && scfId!=""){
			$("#editSave").css('display','none');
			$("#editNextSave").css('display','');
		}else{
			$("#save").css('display','none');
			$("#nextSave").css('display','');
		}
		
	}else{
		if(scfId!=null  && scfId!=""){
			$("#editSave").css('display','');
			$("#editNextSave").css('display','none');
		}else{
			$("#save").css('display','');
			$("#nextSave").css('display','none');
		}
	}
}
//当必要物料筛选条件发生变化时清理出库数据
function trInit(){
	var type=$("#goodsType").val();
	$(".material_list_tr").each(function(index){
		i=index+1;
		var trStr="";
		trStr+="<td class='td_line' id='index_"+i+"'>"+i+"</td>";
		trStr+="<td class='td_line material_code' id='material_goods_code_"+i+"'></td>";
		trStr+="<td class='td_line td_mater' id='material_goods_name_"+i+"'>";
		trStr+="<div class='mater_name_block'>";
		trStr+="<div class='mater_name_hd'>";
		trStr+="<input type='text' class='material_search' value='' onkeyup='searchLi(this,event,1)'/>";
		trStr+="<i class='add_mater' onclick='addMaterial();'></i>";
		trStr+="</div>";
		trStr+="<div class='mater_name_bd' style='min-width:10%;z-index:9999'>";
		trStr+="<ul class ='mater_name_list' style='height:120px;overflow:auto;'>";
		trStr+="</ul>";
		trStr+="</div>";
		trStr+="<div class='mater_name_bd2' style='min-width:10%;z-index:999'>";
		trStr+="<ul class ='mater_name_list2' style='height:120px;overflow:auto;'>";
		trStr+="</ul>";
		trStr+="</div>";
		trStr+="</div>";
		trStr+="</td>";
		trStr+="<td class='td_line'>";
		trStr+="</td>";
		if(type==1){
			trStr+="<td class='td_line columnShow' style='' id='material_level_name_"+i+"'></td>";
		}else{
			trStr+="<td class='td_line columnShow' style='display:none' id='material_level_name_"+i+"'></td>";
		}
		trStr+="<td class='td_line' id='material_tunnel_name_"+i+"'></td>";
		trStr+="<td class='td_line' id='material_unit_info_"+i+"'></td>";
		trStr+="<td class='td_line' id='material_goods_count_"+i+"'></td>";
		trStr+="<td class='td_line' id='material_out_weight_"+i+"'></td>";
		trStr+="<td class='td_line' id='material_total_weight_"+i+"'></td>";
		trStr+="<td class='td_line' style='display:none' id='material_expire_date_"+i+"'></td>";
		trStr+="<td class='td_line' style='display:none' id='material_goods_price_"+i+"'></td>";
		trStr+="<td class='td_line' name='thPrice' id='material_total_price_"+i+"'></td>";
		trStr+="<td class='td_line'></td>";
		$(this).empty().append(trStr);
		trKeyInit(i);
	});
	//出库数据清理完成后，判断是否需要清理多余空白行
	clearTr();
}
//对某一个tr初始化键盘上下键操作
function trKeyInit(i){
	 $("#index_"+i).next().next().find(".material_search").keydown(function(e){
	        e = e || window.event;
	        var keycode = e.which ? e.which : e.keyCode;
	        if(keycode == 38){
	            if($.trim($(this).parent().next().next().find(".mater_name_list2").html())==""){
	                return;
	            }
	            movePrev(this);
	        }else if(keycode == 40){
	            if($.trim($(this).parent().next().next().find(".mater_name_list2").html())==""){
	            	searchLi(this,e,2);
	                return;
	            }
	            if($.trim($(this).parent().next().next().find(".mater_name_list2").html())==""){
	                return;
	            }
	            if($(this).parent().next().next().find(".material_li").hasClass("addbg")){
	                moveNext(this);
	            }else{
	            	$(this).parent().next().next().find(".material_li").removeClass('addbg').eq(0).addClass('addbg');
	            }
	        }else if(keycode == 13){
	            dojob(this);
	        }
	    });
}
function clearpage(){
	$(".inventory_modal_table").find('.material_list_tr').each(function(i){
		//var first = $(this).find("td:first-child").empty();
		$(this).find("td:first-child").next().empty();
		$(this).find("td:first-child").next().next().find("input").val('');
		$(this).find("td:first-child").next().next().next().empty();
		$(this).find("td:first-child").next().next().next().next().empty();
		$(this).find("td:first-child").next().next().next().next().next().empty();
		$(this).find("td:first-child").next().next().next().next().next().next().empty();
		$(this).find("td:first-child").next().next().next().next().next().next().next().empty();
		$(this).find("td:first-child").next().next().next().next().next().next().next().next().empty();
		$(this).find("td:first-child").next().next().next().next().next().next().next().next().next().empty();
		$(this).find("td:first-child").next().next().next().next().next().next().next().next().next().next().empty();
		$(this).find("td:first-child").next().next().next().next().next().next().next().next().next().next().next().empty();
		$(this).find("td:first-child").next().next().next().next().next().next().next().next().next().next().next().next().empty();
		$(this).find("td:first-child").next().next().next().next().next().next().next().next().next().next().next().next().next().empty();
		$(this).find("td:first-child").next().next().next().next().next().next().next().next().next().next().next().next().next().next().empty();
	});
	$('div[name="mater_name_block"]').hide();
	$("#addMaterial").attr("disabled",'disabled');
	$("#goodsType").selectpicker("val","0");
	setInStockType("0");
	$("#orderinfo").attr("disabled",'disabled');
	$("#memberinfo").attr("disabled",'disabled');
	$("#storageRoomId").selectpicker("val","-1");
	$("#operaterId").selectpicker("val","-1");
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
	$("#outTime").val(currentDate);
	$("#remark").find("input").val("");
	$("#show_total_weight").find("em").html("0.0");
}
function inStockTypeLiClick(obj){
	var storageType = $(obj).attr("myId");
	var storageTypeName = $(obj).html();
	$(obj).parent().find("li").each(function(){
		$(this).removeClass("selected");
	});
	$(obj).addClass("selected");
	$("#storageType").html(storageTypeName);
	$("#storageType").attr("myInStockTypeId",storageType);
	addButtonSet();				//控制添加按钮显示
	nextOrSave();				//控制是原料生产出库的下一步按钮
	outStorageFlow();			//控制出库流向显示
	sessionStorage.setItem("outStorage_storageType", storageType);//本地存储用于页面刷新回显
}
//出库流向改变
function memberInfoChange(){
	var memberInfoId = $("#memberInfoId").val();
	sessionStorage.setItem("outStorage_memberInfoId", memberInfoId);//本地存储用于页面刷新回显
}
function setInStockType(val){
	$("#inStockTypeUl").find("li").each(function(){
		$(this).removeClass("selected");
		if($(this).attr("myId") == val){
			$(this).addClass("selected");
			$("#storageType").attr("myInStockTypeId",val);
			$("#storageType").html($(this).html());
		}
	});
}
function inStockTypeModel(){
	$("#inStockTypeAddName").val("");
	$("#inStockTypeDesc").val("");
	$("#addInStockTypeDiv").show();
}
function submitOutStorageType(){
	var outStorageTypeName = $("#inStockTypeAddName").val();
	var outStorageTypeDesc = $("#inStockTypeDesc").val().trim();
	var storeType = $("#storageType").attr("myInStockTypeId");
	if(outStorageTypeName == ""){
		alert("请输入入库类型名称");
		return;
	}
	if(outStorageTypeDesc != "" && outStorageTypeDesc.length>200){
		alert("入库类型描述不能超多200字");
		return;
	}
	addOutStorageType(outStorageTypeName,outStorageTypeDesc,storeType);
}
function addInStockTypeComplete(){
	$("#buttonCancel").trigger("click");
	var inStorageType = $("#addBeforeId").val();
	setInStockType(inStorageType);
}
//刷新页面回显（本地存储中读取数据）
function refreshPage(){
	var goodsType = sessionStorage.getItem("outStorage_goodsType");
	var storageType = sessionStorage.getItem("outStorage_storageType");
	var storageRoomId = sessionStorage.getItem("outStorage_storageRoomId");
	var memberInfoId = sessionStorage.getItem("outStorage_memberInfoId");
	var outStorageDate = sessionStorage.getItem("outStorage_outStorageDate");
	var operatorId = sessionStorage.getItem("outStorage_operatorId");
	var comments = sessionStorage.getItem("outStorage_comments");
	var jsonStr = sessionStorage.getItem("outStorage_batchJson");
	var storageChangeFormIdEdit = $("#storageChangeFormIdEdit").val();
	if(memberInfoId!=null){
		$("#memberInfoId").selectpicker("val",memberInfoId);
	}
	if(goodsType != null){
		//$("#goodsType").attr("onchange","");
		$("#goodsType").selectpicker("val",goodsType);
		//$("#goodsType").attr("onchange","goodsTypeChange(this.value);");
		//addButtonSet();
	}
	if(storageRoomId!=null){
		$("#storageRoomId").selectpicker("val",storageRoomId);
	}
	if(storageType != null){
		setInStockType(storageType);
		//outStorageFlow();//控制出库流向显示
	}
	if(operatorId != null){
		$("#operaterId").selectpicker("val",operatorId);
	}
	if(outStorageDate != null){
		$("#outTime").val(outStorageDate);
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
		$("#outTime").val(currentDate);
	}
	if(comments != null){
		$("#comments").val(comments);
	}else{
		$("#comments").val("暂无备注信息");
	}
	if(storageChangeFormIdEdit != null && storageChangeFormIdEdit != "" && storageChangeFormIdEdit!="0"){
		goodsType = $("#goodsType").val();
		storageRoomId = $("#storageRoomId").val();
		storageType =$("#storageType").attr("myInStockTypeId");
		if(goodsType == null ){
			goodsType = "0";
		}
		if(storageType == null ){
			storageType = "0";
		}
		if(storageRoomId == null ){
			storageRoomId = "0";
		}
		if(jsonStr == null ){
			jsonStr = "";
		}
		pageEcho(goodsType,storageType,storageRoomId,jsonStr,storageChangeFormIdEdit);
	}else{
		if(goodsType == null && storageType == null && storageRoomId == null && memberInfoId == null && outStorageDate == null 
				&& operatorId == null && comments == null){
			if(stockEchoFlag == "true"){
				inventoryMemory();
			}
		}else{
			if((goodsType!=null && goodsType!="0") || (storageRoomId!=null&& storageRoomId!="0") || (memberInfoId!=null&& memberInfoId!="0") ){
				if(goodsType == null ){
					goodsType = "0";
				}
				if(storageType == null ){
					storageType = "0";
				}
				if(storageRoomId == null ){
					storageRoomId = "0";
				}
				if(jsonStr == null ){
					jsonStr = "";
				}
				pageEcho(goodsType,storageType,storageRoomId,jsonStr,0);
			}
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
	//获取页面json
	function getBatchJson(){
		//（生产入库以外的）获取物料列表现有物料列表（带等级和物料的）
		var batchStr = '[';
		$(".inventory_modal_table").find('.material_list_tr').each(function(i){
			if($("#material_goods_code_"+(i+1)).html()!=null && $("#material_goods_code_"+(i+1)).html()!=''){
				var a = $("#material_total_weight_"+(i+1)).find("input").val();
				if(a == ""){
					a = "null";
				}
				var b = $("#material_out_weight_"+(i+1)).find("input").val();
				if(b == ""){
					b = "null";
				}
				var c = $("#material_total_price_"+(i+1)).find("input").val();
				if(c == ""){
					c = "null";
				}
				batchStr += "{";
				batchStr += 'goods_batch_id:"'+$("#material_goods_batch_"+(i+1)).val()+'"';
				batchStr += ",out_weight:"+b;
				batchStr += ",total_weight:"+a;
				batchStr += ",price:"+c;
				batchStr += "},";
			}
		});
		if(batchStr != '['){
			return batchStr.substring(0, batchStr.length-1)+"]";
		}else{
			return "";
		}
	}
	function pageEchoOnComplete(data){
/*		var storageRoomId = sessionStorage.getItem("outStorage_storageRoomId");
		if(storageRoomId != null){
			$("#storageRoomId").selectpicker("val",storageRoomId);
		}*/
/*		var memberInfoId = sessionStorage.getItem("outStorage_memberInfoId");
		if(memberInfoId != null){
			$("#memberinfo").selectpicker("val",memberInfoId);
		}*/
		outStorageFlow();
		var getStr = "";
		var getData = data.split("+_+");
		var batchListToJSONArray = JSON.parse(getData[0]);
		var goodsBatchToJSONArray = JSON.parse(getData[1]);
		var goodsType = getData[2];
		if(getData[1]!="[]"){
			batchListToJSONArray = JSON.parse(getData[0]);
			goodsBatchToJSONArray = JSON.parse(getData[1]);
			getStr = getHtmlStr(goodsBatchToJSONArray,batchListToJSONArray,goodsType);
		}
		if(getStr != ""){
			var hstr=$("#replaceClick").html();
			$(".inventory_modal_table").empty().append(getStr);
			$("#replaceClick").empty().append(hstr);
			//求和
			commonCalculate();
			keyInit();
		}
		$('.selectpicker').selectpicker(); 
	}
	//库存记忆功能回调
	function stockEchoComplete(data){
		var id = data.storageChangeFormId;
		var goodsType = data.productType;
		var storageType = data.storageChangeTypeId.storageChangeTypeId;
		var operatorId = data.operater.farmerInfoId;
		var storageRoomId = data.storageRoom.storageRoomId;
		var memberInfoId = data.purchaseMemberInfoId;
		var outStorageDate = data.name;
		var comments = data.comment;
		if(id != -1){
			if(goodsType != null){
				$("#goodsType").selectpicker("val",goodsType);
			}
			if(storageType != null){
				setInStockType(storageType);
				sessionStorage.setItem("outStorage_storageType", storageType);
				//控制出库流向显示
				outStorageFlow();
			}
			if(operatorId != null){
				$("#operaterId").selectpicker("val",operatorId);
			}
			if(outStorageDate != null){
				$("#outTime").val(outStorageDate);
				//本地存储用于页面刷新回显
				sessionStorage.setItem("outStorage_outStorageDate",outStorageDate);
			}
			
			if(comments != null){
				$("#remark").val(comments);
			}else{
				$("#remark").val("暂无备注信息");
			}
			if(storageRoomId != null){
				$("#storageRoomId").selectpicker("val",storageRoomId);
			}
			if(memberInfoId != null){
				$("#memberinfo").selectpicker("val",memberInfoId);
			}
			addButtonSet();				//控制添加按钮显示
			nextOrSave();				//控制是原料生产出库的下一步按钮
			outStorageFlow();			//控制出库流向显示
		}
	}
	function getHtmlStr(goodsBatchArr,batchList,gType){
		var batchListStr = "";
		var trStr = "";
		//拼接物料名称及每一个物料对应的批次信息
		if(goodsBatchArr.length>0){
			for(var i=0;i<batchList.length;i++){
				batchListStr += "<li class='material_li_"+(i+1)+"' onclick='liClick(this)'> " ;
				batchListStr += batchList[i].material_name ;
				batchListStr += "<div style='display:none'>" ;
				batchListStr += "<input type='text' class='hidden_material_id' value='"+batchList[i].material_id+"' />" ;
				batchListStr += "</div></li>";
			}
			//拼接物料列表信息
			trStr += "<tr> <th width='5%'>序号</th> <th width='13%'>物料编号</th> <th id='replaceClick' width='12%'> 物料名称 <a class='scancode_btn scan_no' onClick='scancode(this,'scan_no')' href='javascript:;'>扫描条码</a></th> <th width='12%'>批次编号</th>" ; 
			if(gType=="1"){
				trStr += "<th width='9%' class='columnShow' style=''>物料等级</th>" ; 
			}else{
				trStr += "<th width='9%' class='columnShow' style='display: none'>物料等级</th>" ; 
			}
			trStr += "<th width='8%'>来源</th> <th width='8%'>单位规格</th> <th width='7%'>库存量</th> <th width='8%'>出库量</th> <th width='8%'>出库总重量（kg）</th> <th style='display: none'>保质期（天）</th> <th style='display: none'>价格</th> <th width='6%' name='thPrice'>价格（元）</th> <th width='2%'>操</th><th width='2%'>作</th> </tr>" ; 	
			//此for循环拼接的为之前添加好的物料出库信息
			for(var k=0;k<goodsBatchArr.length;k++){
				var i=k+1;
				if(i%2==0){
					trStr += "<tr class='even material_list_tr'>";
				}else{
					trStr += "<tr class='odd material_list_tr'>";
				}
				trStr += "<td class='td_line' id='index_"+i+"'>"+i;
				trStr += "</td><td class='td_line material_code' id='material_goods_code_"+i+"'>"+goodsBatchArr[k].code;
				trStr += "</td><td class='td_line td_mater' id='material_goods_name_"+i+"'>";
				trStr += "<div class='mater_name_block'><div class='mater_name_hd'>";
				trStr += "<input type='text' class='material_search' value='"+goodsBatchArr[k].search+"' onkeyup='searchLi(this,event,1)'/>";
				trStr += "<i class='add_mater' onclick='addMaterial();'></i></div><div class='mater_name_bd' style='min-width:10%;z-index:9999'><ul class ='mater_name_list style='height:120px;overflow:auto);'>";
				trStr += batchListStr;
				trStr += "</ul></div><div class='mater_name_bd2' style='min-width:10%;z-index:999'><ul class ='mater_name_list2 style='height:120px;overflow:auto;'></ul></div></div></td><td class='td_line'><select class='selectpicker' id='material_goods_batch_"+i+"' onchange='goodsBatchChange(this)'>";
				var hiddenStr = "";
				hiddenStr += "<div style='display:none'><table id='hidden_table_"+i+"'>";
				var batchToJSONArray = goodsBatchArr[k].batchToJSONArray;
				if(batchToJSONArray!=undefined){
					for(var j=0;j<batchToJSONArray.length;j++){
						if(batchToJSONArray[j].code_hasSelected!=undefined){
							trStr += "<option selected='selected' id='option_batch_code_"+i+"_"+(j+1)+"'>";
							trStr += batchToJSONArray[j].code_hasSelected;
							trStr += "</option>";
						}else if(batchToJSONArray[j].code_noSelected!=undefined){
							trStr += "<option id='option_batch_code_"+i+"_"+(j+1)+"'>";
							trStr += batchToJSONArray[j].code_noSelected;
							trStr += "</option>";
						}
						hiddenStr += "<tr id='hidden_tr_"+i+"_"+(j+1)+"'>";
						hiddenStr += "<td id='list_hidden_batch_id_"+i+"_"+(j+1)+"'>";
						hiddenStr += batchToJSONArray[j].batch_id;
						hiddenStr += "</td><td id='list_hidden_batch_code_"+i+"_"+(j+1)+"'>";
						hiddenStr += batchToJSONArray[j].batch_code;
						hiddenStr += "</td><td id='list_hidden_batch_count_"+i+"_"+(j+1)+"'>";
						hiddenStr += batchToJSONArray[j].batch_count;
						hiddenStr += "</td><td id='list_hidden_level_name_"+i+"_"+(j+1)+"'>";
						hiddenStr += batchToJSONArray[j].level_name;
						hiddenStr += "</td><td id='list_hidden_batch_price_"+i+"_"+(j+1)+"'>";
						hiddenStr += batchToJSONArray[j].batch_price;
						hiddenStr += "</td><td id='list_hidden_tunnel_name_"+i+"_"+(j+1)+"'>";
						hiddenStr += batchToJSONArray[j].tunnel_name;
						hiddenStr += "</td><td id='list_hidden_purchase_name_"+i+"_"+(j+1)+"'>";
						hiddenStr += batchToJSONArray[j].purchase_name;
						hiddenStr += "</td><td id='list_hidden_expire_date_"+i+"_"+(j+1)+"'>";
						hiddenStr += batchToJSONArray[j].expire_date;
						hiddenStr += "</td></tr>";	
					}
				}
				hiddenStr += "</table></div>";
				trStr += "</select>"+hiddenStr+"</td>";
				if(gType=="1"){
					trStr += "<td class='td_line columnShow' style='' id='material_level_name_"+i+"'>";
					trStr += goodsBatchArr[k].columnShow1;
					trStr += "</td>";

				}else{
					trStr += "<td class='td_line columnShow' style='display:none' id='material_level_name_"+i+"'></td>";
				}
				trStr += "<td class='td_line' id='material_tunnel_name_"+i+"'>";
				trStr += goodsBatchArr[k].tunnel_name;
				trStr += "</td><td class='td_line' id='material_unit_info_"+i+"'>";
				var unit_info = goodsBatchArr[k].unit_info;
				var unitInfo = unit_info.split("+");
				trStr += unitInfo[0];
				trStr += " <div style='display:none'><input type='text' value='"+unitInfo[1]+"' /> </div> </td>";
				trStr += "<td class='td_line' id='material_goods_count_"+i+"'>";
				trStr += goodsBatchArr[k].goods_count;
				trStr += "</td>";
				var out_weight = goodsBatchArr[k].out_weight;
				var outWeight = out_weight.split("+");
				trStr += "<td class='td_line' id='material_out_weight_"+i+"'><input type='text' value='"+outWeight[0]+"' class='form-control' style='text-align: center;' onfocus='oldValue(this);' onkeyup='clearNoNum(this,1);' /> <div style='display:none'> <input type='text' value='"+outWeight[1]+"' /> </div>  </td>";
				trStr += "<td class='td_line' id='material_total_weight_"+i+"'><input type='text' value='"+goodsBatchArr[k].total_weight+"' class='form-control' style='text-align: center;' onfocus='oldValue(this);' onkeyup='clearNoNum(this,4);'/> </td>";
				trStr += "<td class='td_line' style='display:none' id='material_expire_date_"+i+"'><input type='text' value='"+goodsBatchArr[k].expire_date+"' onfocus='oldValue(this);' onkeyup='clearNoNum(this,2);' /></td>";
				trStr += "<td class='td_line' style='display:none' id='material_goods_price_"+i+"'><input type='text' class='form-control' style='text-align: center;' value='"+goodsBatchArr[k].goods_price+"' onfocus='oldValue(this);' onkeyup='clearNoNum(this,3);' /></td>";
				trStr += "<td class='td_line' name='thPrice'  id='material_total_price_"+i+"'><input type='text' class='form-control' style='text-align: center;' value='"+goodsBatchArr[k].total_price+"' onkeyup='clearNoNum(this,4);'/></td>";
				trStr += "<td class='td_line'><a class='icon_link' href='javascript:;' onclick='copMaterial(this)'><img src='/asset/images/stock/commons/tableIco_copy2.png' /></a></td>";
				trStr += "<td class='td_line'><a class='icon_link' href='javascript:;' onclick='delMaterial(this)'><img src='/asset/images/stock/commons/tableIco_delect2.png' /></a></td></tr>";
			}
			//判断之前添加好物料信息条数如果大于7条则补充一条空白行，如果小于7则和8比对，使用空白行补齐8条数据
			if(goodsBatchArr.length>7){
				var i = (goodsBatchArr.length+1);
				if(i%2==0){
					trStr += "<tr class='even material_list_tr'>";
				}else{
					trStr += "<tr class='odd material_list_tr'>";
				}
				trStr += "<td class='td_line' id='index_"+i+"'>"+i;
				trStr += "</td><td class='td_line material_code' id='material_goods_code_"+i+"'></td>";
				trStr += "<td class='td_line td_mater' id='material_goods_name_"+i+"'>";
				trStr += "<div class='mater_name_block'><div class='mater_name_hd'><input type='text' class='material_search' value='' onkeyup='searchLi(this,event,1)'/><i class='add_mater' onclick='addMaterial();'></i></div><div class='mater_name_bd' style='min-width:10%;z-index:9999'><ul class ='mater_name_list style='height:120px;overflow:auto;'>";
				trStr += batchListStr;
				trStr += "</ul></div><div class='mater_name_bd2' style='min-width:10%;z-index:999'><ul class ='mater_name_list2 style='height:120px;overflow:auto;'></ul></div></div></td><td class='td_line'></td>";
				if(gType=="1"){
					trStr += "<td class='td_line columnShow' style='' id='material_level_name_"+i+"'></td>";
				}else{
					trStr += "<td class='td_line columnShow' style='display:none' id='material_level_name_"+i+"'></td>";
				}
				trStr += "<td class='td_line' id='material_tunnel_name_"+i+"'></td>";
				trStr += "<td class='td_line' id='material_unit_info_"+i+"'></td>";
				trStr += "<td class='td_line' id='material_goods_count_"+i+"'>";
				trStr += "</td><td class='td_line' id='material_out_weight_"+i+"'></td>";
				trStr += "<td class='td_line' id='material_total_weight_"+i+"'></td>";
				trStr += "<td class='td_line' style='display:none' id='material_expire_date_"+i+"'></td>";
				trStr += "<td class='td_line' style='display:none' id='material_goods_price_"+i+"'></td>";
				trStr += "<td class='td_line' name='thPrice' id='material_total_price_"+i+"'></td>";
				trStr += "<td class='td_line'></td></tr>";
			}else{
				for(var m=0;m<(8-goodsBatchArr.length);m++){
					var i=(goodsBatchArr.length+m+1);
					if(i%2==0){
						trStr += "<tr class='even material_list_tr'>";
					}else{
						trStr += "<tr class='odd material_list_tr'>";
					}
					trStr += "<td class='td_line' id='index_"+i+"'>"+i;
					trStr += "</td><td class='td_line material_code' id='material_goods_code_"+i+"'></td>";
					trStr += "<td class='td_line td_mater' id='material_goods_name_"+i+"'>";
					trStr += "<div class='mater_name_block'><div class='mater_name_hd'><input type='text' class='material_search' value='' onkeyup='searchLi(this,event,1)'/><i class='add_mater' onclick='addMaterial();'></i></div><div class='mater_name_bd' style='min-width:10%;z-index:9999'><ul class ='mater_name_list style='height:120px;overflow:auto;'>";
					trStr += batchListStr;
					trStr += "</ul></div><div class='mater_name_bd2' style='min-width:10%;z-index:999'><ul class ='mater_name_list2 style='height:120px;overflow:auto;'></ul></div></div></td><td class='td_line'></td>";
					if(gType=="1"){
						trStr += "<td class='td_line columnShow' style='' id='material_level_name_"+i+"'></td>";
					}else{
						trStr += "<td class='td_line columnShow' style='display:none' id='material_level_name_"+i+"'></td>";
					}
					trStr += "<td class='td_line' id='material_tunnel_name_"+i+"'></td>";
					trStr += "<td class='td_line' id='material_unit_info_"+i+"'></td>";
					trStr += "<td class='td_line' id='material_goods_count_"+i+"'>";
					trStr += "</td><td class='td_line' id='material_out_weight_"+i+"'></td>";
					trStr += "<td class='td_line' id='material_total_weight_"+i+"'></td>";
					trStr += "<td class='td_line' style='display:none' id='material_expire_date_"+i+"'></td>";
					trStr += "<td class='td_line' style='display:none'  id='material_goods_price_"+i+"'></td>";
					trStr += "<td class='td_line' name='thPrice' id='material_total_price_"+i+"'></td>";
					trStr += "<td class='td_line'></td></tr>";
				}
			}
		}
		return trStr;
	}
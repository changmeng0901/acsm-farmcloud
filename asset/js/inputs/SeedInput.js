function trplx(){
	var type=jquery('#record_type').val();
	jquery("#productInfo\\:inputstypeHidden").val(type);
	changePage(type);
}
     
//单位规格
function zhzUnit(){
	var unitVal = jquery("#productInfo\\:goodsUnitSelect").val();
	jquery("#productInfo\\:goodsUnitHidden").val(unitVal);
	var unit = jquery("#productInfo\\:goodsUnitSelect").find("option:selected").text();
	jquery("#unit").text(unit);
}
//适应标准
function zhzsybz(){
	var biaozhun = jquery("#trpbiaozhun3").val();
	jquery("#productInfo\\:inputsDataDicHidden").val(biaozhun);
}
//种子类别
function zhzfl(){
	var seedsType = jquery("#seedsType").val();
	jquery("#productInfo\\:seedsTypeHidden").val(seedsType);
}
//种植环境
function zzhj(){
	var planting = jquery("#planting").val();
	jquery("#productInfo\\:plantingHidden").val(planting);
}
//适合区域
function shqy(){
	var area = jquery("#area").val();
	jquery("#productInfo\\:areaHidden").val(area);
}
//熟性
function shuxing(){
	var mature = jquery("#mature").val();
	jquery("#productInfo\\:matureHidden").val(mature);
}
function checkInteger(obj){
	if(obj!=""){
		var v = obj;
		var reg = /^[1-9]+[0-9]*]*$/; 
		if (!reg.test(v)){
			return false;
		}
	}
	return true;
}

//验证 1数量 2金额
function clearNoNum(type, obj, event){
	var keyCode = event.keyCode;
	var val=obj.value;
	var temp;
	if (type == 1) {
		if (keyCode < 37 || keyCode > 40) {
			if(!(keyCode >=48 && keyCode <=57)){
				obj.value = obj.value.replace(/[^\d]/,"");  //清除“数字”和“.”以外的字符  
			}
			
		}
	} else {
		if (keyCode < 37 || keyCode > 40) {
			if(!(keyCode >=48 && keyCode <=57)){
				obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
				obj.value = obj.value.replace(/^\./g,"");  //验证第一个字符是数字而不是. 
				obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.   
				obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
			}
		}
	}
}
//保留两位小数
function changeVal(s,n){
	n = n > 0 && n <= 20 ? n : 2;   
	if(s!=''){
		s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
		var l = s.split(".")[0].split("").reverse(),   
		r = s.split(".")[1];   
		t = "";   
		for(i = 0; i < l.length; i ++ ){   
			t += l[i] ;   
		}   
		jQuery("#productInfo\\:seedsId").val(t.split("").reverse().join("") + "." + r);
	}
}





























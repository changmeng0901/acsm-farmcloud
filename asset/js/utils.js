/*浮点型验证*/
function checkFloat(v,str){
	var v = obj.value;
	var reg = /^\d+(\.\d+)?$/;
	if (!reg.test(v)){
		obj.focus();
		return false;
	}
	return true;
}

/* 整数验证 */
function checkInteger(obj,str){
	if(!obj){
		var v = obj.value;
		var reg = /^[1-9]+[0-9]*]*$/; 
		if (!reg.test(v)){
			obj.focus();
			return false;
		}
	}
}

/* 整数验证 */
function checkInt(v,str){
	var reg = /^[1-9]+[0-9]*]*$/; 
	if (!reg.test(v)){
		obj.focus();
		return false;
	}
}
/* 电话验证 */
function checkTel(id){
	var telnumber =document.getElementById(id).value;
	if(telnumber != ''){
		var mobileData = /^((0{0,1}(14[0-9]|13[0-9]|15[0-9]|18[6-9])[0-9]{8}\,)+)$/;
		telnumber=telnumber+",";
		if (!mobileData.test(telnumber)){
			alert("手机电话号码格式不正确！");
			return false;
	   	 }
		else{
			return true;
		}
	 }
	return true;
	
}
/* 座机电话验证 */
function checkPhoto(id){
	var telnumber =document.getElementById(id).value;
	if(telnumber != ''){
		var mobileData = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;
		if (!mobileData.test(telnumber)){
			alert("座机电话号码格式不正确！");
			return false;
	   	 }
		else{
			return true;
		}
	 }
	return true;
	
}
/* Email验证 */
function checkEmail(id){
	var str =document.getElementById(id).value; 
	if(str != ''){
		var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
		if(reg.test(str)){
			return true;
		}else{
			alert("Email邮箱格式错误!");
			return false;
		}
	}
	return true;

}

/* 时间验证 */
function checktijiao(startid,endid,house){
	var today = document.getElementById(startid).value; 
	var edate = document.getElementById(endid).value; 
	var houseInfos = document.getElementById(house).value;
	if(houseInfos==''){  
		alert("猪舍不能为空!!!");
		return false;
	}
	if(compareDate(today,edate) ){  
		alert("开始时间大于结束时间！！！");
		return false;
	}
	return true;
}
/* 时间验证 */
function tijiao(startid,endid,house,device){
	var today = document.getElementById(startid).value; 
	var edate = document.getElementById(endid).value; 	
	if (checkdevice(house,device)) {
		if(compareDate(today,edate) ){  
			alert("开始时间大于结束时间！！！");
			return false;
		}
	}else{
		return false;
	}
	return true;
}
function compareDate(DateOne,DateTwo){
	var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ("-"));
	var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ("-")+1);
	var OneYear = DateOne.substring(0,DateOne.indexOf ("-"));
	var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ("-"));
	var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ("-")+1);
	var TwoYear = DateTwo.substring(0,DateTwo.indexOf ("-"));
	if (Date.parse(OneMonth+"/"+OneDay+"/"+OneYear) > Date.parse(TwoMonth+"/"+TwoDay+"/"+TwoYear)) {
		return true;
	}else{
		return false;
	}
	return true;
}
/* 传感器验证 */
function checkdevice(houseInfo,device){
	var houseInfos = document.getElementById(houseInfo).value; 
	var devices = document.getElementById(device).value; 					
	if(houseInfos==''){  
		alert("猪舍不能为空!!!");
		return false;
	}
	if(devices==''){  
		alert("传感器不能为空!!!");
		return false;
	}
	return true;
}

//全选
function checkAll (name,obj){
	jquery("input[name='"+name+"']").attr("checked",jquery(obj).attr("checked"));
}

//批量包装
function packageAll(url,obj){
	var str = "";
	if(obj == "") {
		jquery("input[name='td']:checked").each(function(){
			str+=this.value+",";			
		});
	}else{
		str = obj;
	}
	if(str==""){
		alert("请选择需要的订单!");
		return;
	}
	window.location.href=url+str;
}

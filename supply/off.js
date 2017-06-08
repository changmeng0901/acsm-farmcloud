//点击弹出修改窗口
function bounced(id){
	detailMess(id);
	jquery("#myModal").modal('show');
	jquery('#myModal').on('shown.bs.modal', function () {
		jquery('html').css({'overflow':'hidden'});
	});
	jquery('#myModal').on('hide.bs.modal', function () {
		jquery('html').css({'overflow':'auto'});
	});
}

//提交报价信息
function submitSave(){
	var purchaseProId = jquery("#purProId").val();
	//联系人 contactPerson
	var contactPerson = jquery("#contactPerson").val();
	if(contactPerson.length > 30){
		alert("联系人长度不可超过30！");
		return false;
	}
	if(contactPerson == "" || contactPerson == null){
		alert("联系人不可为空！");
		return false;
	}
	//联系电话 contactPhone
	var contactPhone = jquery("#contactPhone").val();
	var reg = /^[\d-]{0,50}$/;
  	if(contactPhone == ""){
    	alert("联系电话不可为空!");
    	return false;
  	}
  	if(!reg.test(contactPhone)){
     	alert('联系电话只支持数字和"-"!');
     	return false;
  	}
	//价格 purPrice
  	var purPrice = jquery("#purPrice").val();
	if(isNaN(purPrice)){
	    alert("价格必须输入数字!");
	    return false;
	}
	if(purPrice == ""){
		alert("价格不许为空!");
    	return false;
	}
	//备注 purRemark
  	var purRemark = jquery("#purRemark").val();
  	if(purRemark.length >= 200){
		alert("备注长度不可超过200！");
		return false;
	}
  	submitPriceInfo(contactPerson,contactPhone,purPrice,purRemark,purchaseProId);
}
jquery('.selectpicker').selectpicker();
function checkSubmit(){
		   var phone = document.getElementById("memberInfo:phone").value;
		   var realname = document.getElementById("memberInfo:realname").value;
		   var farmerInfoId = document.getElementById("memberInfo:farmerInfoId").value;
		  // var income = document.getElementById("memberInfo:income").value;
		   //var gradeIntegral = document.getElementById("memberInfo:gradeIntegral").value;
		   var idCard = document.getElementById("memberInfo:idCard").value;
		   var workAddress = document.getElementById("memberInfo:workAddress").value;
		   var homeAddress = document.getElementById("memberInfo:homeAddress").value;
		   var remark = document.getElementById("memberInfo:remark").value;

		   var hobby = document.getElementById("memberInfo:hobby").value;
		   var taboo = document.getElementById("memberInfo:taboo").value;
		   var memberSource = document.getElementById("memberInfo:memberSourceId").value;
		   var managed = document.getElementById("managed").value;
		   var distributionTime = jquery("#distributionTime").val();
		   var idCard1518 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;//身份证位数及18位校验位
//		   var regPhone = /^(?:13\d|15\d|18\d|14\d|17\d)-?\d{5}(\d{3}|\*{3})$/;
		   //手机号和固话验证
		   var regPhone = /((?:13\d|15\d|18\d|14\d|17\d)-?\d{5}(\d{3}|\*{3})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
		   var regDNum = /^[+|-]?\d*\.?\d*$/;
		   if(realname == ""){
			   document.getElementById("productMsg").innerHTML = "客户名不能为空";
			   jquery("#myModal").modal('show');
			   return false;
			}else{
				if(realname.length>50){
					document.getElementById("productMsg").innerHTML = "客户名输入太长";
					jquery("#myModal").modal('show');
					return false;
				}
			}
		   if(farmerInfoId == ""){
			   document.getElementById("productMsg").innerHTML = "请到人员管理添加销售人";
			   jquery("#myModal").modal('show');
			   return false;
			}
		   if(managed == "true" && memberSource == "4"){
			   
		   }else{
			   if(phone == ""){
				   document.getElementById("productMsg").innerHTML = "请输入联系方式";
				   jquery("#myModal").modal('show');
				   return false;
				}
			   if(phone != "" && !regPhone.test(phone)){
				   document.getElementById("productMsg").innerHTML = "请输入正确的联系方式";
				   jquery("#myModal").modal('show');
				   return false;
				}
		   }
		   if(idCard != "" && !idCard1518.test(idCard)){
			   document.getElementById("productMsg").innerHTML = "请输入正确的身份证号";
			   jquery("#myModal").modal('show');
			   return false;
			}
		   if(hobby != "" && hobby.length > 200){
				  document.getElementById("productMsg").innerHTML = "忌口最多只能输入200个汉字";
				   jquery("#myModal").modal('show');
				   return false;
			  }
		   if(taboo != "" && taboo.length > 200){
				  document.getElementById("productMsg").innerHTML = "爱好最多只能输入200个汉字";
				   jquery("#myModal").modal('show');
				   return false;
			  }

		  /*  if(income == ""){
			   document.getElementById("productMsg").innerHTML = "月收入不能为空";
			   jquery("#myModal").modal('show');
			   return false;
			} */
		  /*  if(income != "" && !regDNum.test(income)){
			   document.getElementById("productMsg").innerHTML = "月收入只能是数字";
			   jquery("#myModal").modal('show');
			   return false;
			} */
		  /*  if(gradeIntegral == ""){
			   document.getElementById("productMsg").innerHTML = "等级积分不能为空";
			   jquery("#myModal").modal('show');
			   return false;
			}
		   if(gradeIntegral != "" && !regDNum.test(gradeIntegral)){
			   document.getElementById("productMsg").innerHTML = "等级积分只能是数字";
			   jquery("#myModal").modal('show');
			   return false;
			  } */
		  if(workAddress != "" && workAddress.length > 50){
			  document.getElementById("productMsg").innerHTML = "工作地址最多只能输入50个汉字";
			   jquery("#myModal").modal('show');
			   return false;
		  }
		  if(homeAddress != "" && homeAddress.length > 50){
			  document.getElementById("productMsg").innerHTML = "住宅地址最多只能输入50个汉字";
			   jquery("#myModal").modal('show');
			   return false;
		  }
		  if(remark != "" && remark.length > 200){
			  document.getElementById("productMsg").innerHTML = "备注最多只能输入200个汉字";
			   jquery("#myModal").modal('show');
			   return false;
		  }
		  
		  jQuery('#memberInfo\\:distributionTime').val(distributionTime);
	}
	function closeMethod(){
		var phone = document.getElementById("memberInfo:phone").value;
		   var realname = document.getElementById("memberInfo:realname").value;
		   //var income = document.getElementById("memberInfo:income").value;
		   //var gradeIntegral = document.getElementById("memberInfo:gradeIntegral").value;
		   var idCard = document.getElementById("memberInfo:idCard").value;
		   var idCard1518 = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;//身份证位数及18位校验位
//		   var regPhone = /^(?:13\d|15\d|18\d)-?\d{5}(\d{3}|\*{3})$/;
		   //手机号和固话验证
		   var regPhone = /((?:13\d|15\d|18\d|14\d|17\d)-?\d{5}(\d{3}|\*{3})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
		   var regDNum = /^[+|-]?\d*\.?\d*$/;
			
		   if(realname == ""){
			   document.getElementById("memberInfo:realname").focus();
			   return false;
			}
		   if(phone == ""){
			   document.getElementById("memberInfo:phone").focus();
			   return false;
			}
		   if(phone != "" && !regPhone.test(phone)){
			   document.getElementById("memberInfo:phone").focus();
			   return false;
			}
			
		   if(idCard != "" && !idCard1518.test(idCard)){
			   document.getElementById("memberInfo:idCard").focus();
			   return false;
			  }

		   /* if(income == ""){
			   document.getElementById("memberInfo:income").focus();
			   return false;
			}
		   if(income != "" && !regDNum.test(income)){
			   document.getElementById("memberInfo:income").focus();
			   return false;
			}
		   
		   if(gradeIntegral == ""){
			   document.getElementById("memberInfo:gradeIntegral").focus();
			   return false;
			}
			if(gradeIntegral != "" && !regDNum.test(gradeIntegral)){
				document.getElementById("memberInfo:gradeIntegral").focus();
				  return false;
			} */
	}
//客户名称校验
	function checkName(){
		var custName = jquery("#memberInfo\\:realname").val();
		if(custName == ""){
			   document.getElementById("productMsg").innerHTML = "客户名不能为空";
			   jquery("#myModal").modal('show');
			   return false;
			}
		checkCustName(custName);
	}
	//客户名称校验结果回调
	function showNameMsg(isExistName){
		if(isExistName == "1"){
			jquery("#custNameText").html("*客户名已存在");
		}else{
			jquery("#custNameText").html("*");
		}
	}
	//手机校验
	function checkCustPhone(type){
		var phone = jquery("#memberInfo\\:phone").val();
//		 var regPhone = /^(?:13\d|15\d|18\d|14\d|17\d)-?\d{5}(\d{3}|\*{3})$/;
		//手机号和固话验证
		var regPhone = /((?:13\d|15\d|18\d|14\d|17\d)-?\d{5}(\d{3}|\*{3})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
		 
		if(type == 1){
			if(phone == ""){
				   document.getElementById("productMsg").innerHTML = "请输入联系方式";
				   jquery("#myModal").modal('show');
				   return false;
				}
			   if(phone != "" && !regPhone.test(phone)){
				   document.getElementById("productMsg").innerHTML = "请输入正确的联系方式";
				   jquery("#myModal").modal('show');
				   return false;
				}
			checkPhone(phone);
		}else{
			var memberSource = jquery("#memberInfo\\:memberSourceId").val();
			if(memberSource != "4"){
				if(phone == ""){
					   document.getElementById("productMsg").innerHTML = "请输入联系方式";
					   jquery("#myModal").modal('show');
					   return false;
					}
				   if(phone != "" && !regPhone.test(phone)){
					   document.getElementById("productMsg").innerHTML = "请输入正确的联系方式";
					   jquery("#myModal").modal('show');
					   return false;
					}
			}
			var memberId = jquery('#memberInfo\\:memberInfoId').val();
			checkPhone2(phone,memberId);
		}
	}
	
	//手机校验结果回调
	function showPhoneMsg(isExistPhone){
		if(isExistPhone == "1"){
			jquery("#phoneText").html("*");
			//jquery("#memberInfo\\:persist").attr("disabled", true); 
			//jquery("#memberInfo\\:update").attr("disabled", true); 
			document.getElementById("productMsg").innerHTML = "联系方式已存在";
			jquery("#myModal").modal('show');
			return false;
		}else{
			jquery("#phoneText").html("*");
			jquery("#memberInfo\\:persist").click();
		}
	}
	
	//手机校验结果回调
	function showPhoneMsg2(isExistPhone){
		if(isExistPhone == "1"){
			jquery("#phoneText").html("*");
			document.getElementById("productMsg").innerHTML = "联系方式已存在";
			jquery("#myModal").modal('show');
			return false;
//			jquery("#memberInfo\\:persist").attr("disabled", true); 
//			jquery("#memberInfo\\:update").attr("disabled", true); 
		}else{
			jquery("#phoneText").html("*");
//			jquery("#memberInfo\\:persist").attr("disabled", false);
//			jquery("#memberInfo\\:update").attr("disabled", false); 
			jquery("#memberInfo\\:update").click();
		}
	}
	
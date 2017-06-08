function saveOrUpdate(){
	var preHarvestControlJsonArray = "";
	var trList = "";
		jQuery(".sData .preHarvest_Control").each(function(i){
			var controlList = "";
			jQuery(this).find("td[class='hiddenTdPackage']").each(function(){			
				var ppId  = jQuery(this).find("input[class='ppId']").val();
				var prePackageNum  = jQuery(this).find("input[class='prePackageNum']").val();
				var phpId  = jQuery(this).find("input[class='phpId']").val();
				var preTime  = jQuery(this).find("input[class='preTime']").val();
				if(prePackageNum!=null&&trim(prePackageNum)!=""){
					controlList += "{'ppId':'"+ppId+"','prePackageNum':'"+prePackageNum+"','phpId':'"+phpId+"','preTime':'"+preTime+"'},";
				}
			});
			if(controlList!=""){
				controlList = "'controlList':["+controlList.substring(0, controlList.length-1)+"]";
				var productInfoId = jQuery(this).find("td[class='hiddenTd']").find("input[class='productInfoId']").val();
				trList += "{'productInfoId':'"+productInfoId+"',"+controlList+"},";
			}	
		});
	if(trList!=""){
		trList = trList.substring(0, trList.length-1);
		preHarvestControlJsonArray = "["+trList+"]";
		jQuery("#saveControlFrom\\:controlHid").val(preHarvestControlJsonArray);
	}
}
function packageTotalChange(obj){
	var packageTotal = jQuery(obj).val();
	var packageTotalOld = jQuery(obj).parent().parent().prev().find("input[class='prePackageNum']").val();
  	if(packageTotal==null||trim(packageTotal)==""){
  		jQuery(obj).parent().parent().prev().find("input[class='prePackageNum']").val("");
  		return false;
  	}
  	else{
  	  	var reg =/^\d+(\.\d+)?$/; 
  	  	if(!reg.test(packageTotal)){
    	   	document.getElementById("productMsg").innerHTML = "请输入数字"; 
    		jQuery("#myModalYz").modal("show");
  	  		if(packageTotalOld==null||trim(packageTotalOld)==""){
  	  			jQuery(obj).val(""); 
  	  		}
  	  		else{
  	  			jQuery(obj).val(packageTotalOld);
  	  		}		
  		  	return false;
  	  	}
  	}
  	jQuery(obj).parent().parent().prev().find("input[class='prePackageNum']").val(packageTotal);
}
function trim(str){
   	return str.replace(/(^\s+)|\s+$/g,"");
 }
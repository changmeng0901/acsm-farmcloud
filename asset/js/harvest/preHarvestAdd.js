function entryTimeChange(timeType){
	if(timeType =="1"){
		var entryTime = jQuery("#entry_time input").val();
		var entryTimeDate = new Date(entryTime.replace("-","/"));
		var n = 1;
	    var entryTimeNext = new Date(entryTimeDate-0+n*86400000);
		var entryTimeNextYear = entryTimeNext.getFullYear();
		var entryTimeNextMonth = entryTimeNext.getMonth()+1;
		var entryTimeNextDate = entryTimeNext.getDate();
		var NextMonthStr=""; 
		var NextDateStr="";
		if(entryTimeNextMonth<10){
			NextMonthStr = "0"+entryTimeNextMonth.toString();
		}
		else{
			NextMonthStr = entryTimeNextMonth.toString();
		}
		if(entryTimeNextDate<10){
			NextDateStr = "0"+entryTimeNextDate.toString();
		}
		else{
			NextDateStr = entryTimeNextDate.toString();
		}
		var entryTimeNextStr = entryTimeNextYear+"-"+NextMonthStr+"-"+NextDateStr;
	    jQuery("#day_start input").val(entryTimeNextStr);
	    jQuery("#saveMyFrom\\:preHarvestStartTimeHid").val(entryTimeNextStr);
	    jQuery("#day_end input").val(entryTimeNextStr);
	    jQuery("#saveMyFrom\\:preHarvestEndTimeHid").val(entryTimeNextStr);
	    jQuery("#saveMyFrom\\:preHarvestEntryTimeHid").val(entryTime);
	    submitForm();
	}
	else if(timeType =="2"){
		var entryTime = jQuery("#entry_time input").val();
		jQuery("#saveMyFrom\\:preHarvestEntryTimeHid").val(entryTime);
		jQuery("#saveMyFrom\\:preHarvestYearOrWeekHid").val("-1");
		submitForm();
	}
	else if(timeType =="3"){
		var entryTime = jQuery("#entry_time input").val();
		var entryTimeArray = entryTime.split("-");
		var entryTimeYear = entryTimeArray[0];
		var entryTimeMonth = entryTimeArray[1];
		if(entryTimeMonth=="12"){
			entryTimeYear = Number(entryTimeYear)+1;
			entryTimeMonth = "01";
		}
		else{
			entryTimeMonth = Number(entryTimeMonth)+1;
			if(Number(entryTimeMonth)<10){
				entryTimeMonth = "0"+entryTimeMonth;
			}
		}
		var entryTimeStr = entryTimeYear+"-"+entryTimeMonth;
	    jQuery("#month_start input").val(entryTimeStr);
	    jQuery("#saveMyFrom\\:preHarvestStartTimeHid").val(entryTimeStr);
	    jQuery("#month_end input").val(entryTimeStr);
	    jQuery("#saveMyFrom\\:preHarvestEndTimeHid").val(entryTimeStr);
	    jQuery("#saveMyFrom\\:preHarvestEntryTimeHid").val(entryTime);
	    submitForm();
	}
	else if(timeType =="4"){
		var entryTime = jQuery("#entry_time input").val();
		jQuery("#saveMyFrom\\:preHarvestEntryTimeHid").val(entryTime);
		var entryTimeArray = entryTime.split("-");
		var entryTimeYear = Number(entryTimeArray[0])+1;
		jQuery("#saveMyFrom\\:preHarvestYearOrWeekHid").val(entryTimeYear.toString());
		submitForm();
	}	
}
function buttonChange(timeType){
	jQuery("#saveMyFrom\\:preHarvestTimeTypeHid").val(timeType);
	entryTimeChange(timeType);
}
function  DateDiff(sDate1,  sDate2){   
    var  aDate,  oDate1,  oDate2,  iDays ; 
    aDate  =  sDate1.split("-") ; 
    oDate1  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]);   
    aDate  =  sDate2.split("-") ; 
    oDate2  =  new  Date(aDate[1]  +  '-'  +  aDate[2]  +  '-'  +  aDate[0]) ; 
    iDays  =  parseInt((oDate1  -  oDate2)  /  1000  /  60  /  60  /24);   
    return  iDays ; 
}
function changeDateFn(){
	var entryTime = jQuery("#entry_time input").val();
	var entryTimeDate = new Date(entryTime.replace("-","/"));
	var n = 1;
    var entryTimeNext = new Date(entryTimeDate-0+n*86400000);
    var dayStart = jQuery("#day_start input").val();
    var dayStartTime =  new Date(dayStart.replace("-","/"));
	if(dayStartTime.getTime()<entryTimeNext.getTime()){
		var startTimeHid = jQuery("#saveMyFrom\\:preHarvestStartTimeHid").val();
		jQuery("#day_startText").val(startTimeHid);	
		document.getElementById("productMsg").innerHTML = "开始时间不能小于录入时间的下一天!"; 
		jQuery("#myModalYz").modal("show");
		return false;
	}
	else{
		jQuery("#saveMyFrom\\:preHarvestStartTimeHid").val(dayStart);
	}
	var dayEnd =  jQuery("#day_end input").val();
    var betweenTime = DateDiff(dayEnd,dayStart);
    if(betweenTime<0){
   	 jQuery("#day_end input").val(jQuery("#saveMyFrom\\:preHarvestEndTimeHid").val());
	 document.getElementById("productMsg").innerHTML = "结束时间不能小于开始时间!"; 
	 jQuery("#myModalYz").modal("show");
   	 return false;
    }
    else if(betweenTime>30){
      	 jQuery("#day_end input").val(jQuery("#saveMyFrom\\:preHarvestEndTimeHid").val());
    	 document.getElementById("productMsg").innerHTML = "结束时间大于开始时间超过30天!"; 
    	 jQuery("#myModalYz").modal("show");
       	 return false;
    }
    else{
   	 	jQuery("#saveMyFrom\\:preHarvestEndTimeHid").val(dayEnd);//修改回执时间 
    }
	var preHarvestType = jQuery("#saveMyFrom\\:preHarvestTypeHid").val();
	var preHarvestTimeType = 1;
    judgeIfAddDay(dayStart,dayEnd,Number(preHarvestType),preHarvestTimeType);
}
function changeWeekFn(){
	var weekStr = jQuery("#weekId").val();
	if(weekStr==""||weekStr=="无可选择项目"||weekStr=="null"||weekStr==null){
   	 document.getElementById("productMsg").innerHTML = "请选择周!"; 
	 jQuery("#myModalYz").modal("show");
		return false;
	}
	else{
		jQuery("#saveMyFrom\\:preHarvestYearOrWeekHid").val(weekStr);
		var preHarvestType = jQuery("#saveMyFrom\\:preHarvestTypeHid").val();
		var preHarvestTimeType = 2;
		var preHarvestYearOrWeek = jQuery("#saveMyFrom\\:preHarvestYearOrWeekHid").val();
		judgeIfAddWeekOrYear(preHarvestYearOrWeek,Number(preHarvestType),preHarvestTimeType);
	}
}
function changeMonthFn(){
	var entryTime = jQuery("#entry_time input").val();
	var entryTimeArray = entryTime.split("-");
	var entryTimeYear = entryTimeArray[0];
	var entryTimeMonth = entryTimeArray[1];
	if(entryTimeMonth=="12"){
		entryTimeYear = (Number(entryTimeYear)+1).toString();
		entryTimeMonth = "01";
	}
	else{
		entryTimeMonth = (Number(entryTimeMonth)+1).toString();
		if(Number(entryTimeMonth)<10){
			entryTimeMonth = "0"+entryTimeMonth;
		}
	}
	var monthStart = jQuery("#month_start input").val();
	var monthStartArray = monthStart.split("-");
	var monthStartYear = monthStartArray[0];
	var monthStartMonth = monthStartArray[1];
	if(monthStartYear<entryTimeYear){
		jQuery("#month_start input").val(jQuery("#saveMyFrom\\:preHarvestStartTimeHid").val());
	   	document.getElementById("productMsg").innerHTML = "开始时间不能小于录入时间的下一月!"; 
		jQuery("#myModalYz").modal("show");
		return false;
	}
	else{
		var yearMon = (Number(monthStartYear)-Number(entryTimeYear))*12+Number(monthStartMonth)-Number(entryTimeMonth);
		if(yearMon<0){
			jQuery("#month_start input").val(jQuery("#saveMyFrom\\:preHarvestStartTimeHid").val());
		   	document.getElementById("productMsg").innerHTML = "开始时间不能小于录入时间的下一月!"; 
			jQuery("#myModalYz").modal("show");
			return false;
		}
		else{
			jQuery("#saveMyFrom\\:preHarvestStartTimeHid").val(monthStart);//修改回执时间 
		}	
	}
	var monthEnd = jQuery("#month_end input").val();
	var monthEndArray = monthEnd.split("-");
	var monthEndYear =  monthEndArray[0];
	var monthEndMonth = monthEndArray[1];
	if(monthEndYear<monthStartYear){
		jQuery("#month_end input").val(jQuery("#saveMyFrom\\:preHarvestEndTimeHid").val());
	   	document.getElementById("productMsg").innerHTML = "开始时间不能小于结束时间!"; 
		jQuery("#myModalYz").modal("show");
		return false;
	}
	else{
		var yearMonth = (Number(monthEndYear)-Number(monthStartYear))*12+Number(monthEndMonth)-Number(monthStartMonth);
		if(yearMonth<0){
			jQuery("#month_end input").val(jQuery("#saveMyFrom\\:preHarvestEndTimeHid").val());
		   	document.getElementById("productMsg").innerHTML = "开始时间不能小于结束时间!"; 
			jQuery("#myModalYz").modal("show");
			return false;
		}
		else if(yearMonth>20){
			jQuery("#month_end input").val(jQuery("#saveMyFrom\\:preHarvestEndTimeHid").val());
		   	document.getElementById("productMsg").innerHTML = "结束时间不能超过开始时间20个月!"; 
			jQuery("#myModalYz").modal("show");
			return false;
		}
		else{
			jQuery("#saveMyFrom\\:preHarvestEndTimeHid").val(monthEnd);
			var preHarvestType = jQuery("#saveMyFrom\\:preHarvestTypeHid").val();
			var preHarvestTimeType = 3;
			judgeIfAddMonth(monthStart,monthEnd,Number(preHarvestType),preHarvestTimeType);
		}
	}	
}
function changeYearFn(){
	var  yearStr = jQuery("#yearId").val();
	if(yearStr==""||yearStr=="无可选择项目"||yearStr=="null"||yearStr==null){
	   	document.getElementById("productMsg").innerHTML = "请选择年!"; 
		jQuery("#myModalYz").modal("show");
		return false;
	}
	else{
		jQuery("#saveMyFrom\\:preHarvestYearOrWeekHid").val(yearStr);
		var preHarvestType = jQuery("#saveMyFrom\\:preHarvestTypeHid").val();
		var preHarvestTimeType = 4;
		var preHarvestYearOrWeek = jQuery("#saveMyFrom\\:preHarvestYearOrWeekHid").val();
		judgeIfAddWeekOrYear(preHarvestYearOrWeek,Number(preHarvestType),preHarvestTimeType);
	}
}
function saveOrUpdate(){
	var canSubmit = jQuery("#canSubmitHidId").val();
	if(canSubmit=="N"){
	   	document.getElementById("productMsg").innerHTML = "请选择正确的日期，并点击确定按钮!"; 
		jQuery("#myModalYz").modal("show");
		return false;
	}
	else{
		var preHarvestJsonArray = "";
		var preHarvestType = jQuery("#saveMyFrom\\:preHarvestTypeHid").val();//采收类型
		var trList = "";
		if(preHarvestType=="2"){
			jQuery(".sData .realPlant_Pro").each(function(i){
				var proList = "";
				jQuery(this).find("td[class='hiddenTrPro']").each(function(){			
					var preTime  = jQuery(this).find("input[class='preTime']").val();
					var preTotal  = jQuery(this).find("input[class='preTotal']").val();
					var judgePro  = jQuery(this).find("input[class='judgePro']").val();
					if(preTotal!=null&&trim(preTotal)!=""&&trim(preTotal)!="0"&&trim(preTotal)!="0.0"&&judgePro!="0"){
						proList += "{'preTime':'"+preTime+"','preTotal':'"+preTotal+"'},";
					}
				});
				if(proList!=""){
					proList = "'proList':["+proList.substring(0, proList.length-1)+"]";
					var tunnelInfoId = jQuery(this).find("td[class='td_caozuo hiddenTd']").find("div[class='hiddenDiv']").find("input[class='tunnelInfoId']").val();
					var breedId = jQuery(this).find("td[class='td_caozuo hiddenTd']").find("div[class='hiddenDiv']").find("input[class='breedId']").val();
					var realPlantId  = jQuery(this).find("td[class='td_caozuo hiddenTd']").find("div[class='hiddenDiv']").find("input[class='realPlantId']").val();
					var goodsLevelId  = jQuery(this).find("td[class='goodsLevel']").find("span[class='bootSelt110 bootSelt_dengji']").find("select[class='selectpicker']").val();
					trList += "{'tunnelInfoId':'"+tunnelInfoId+"',"+"'breedId':'"+breedId+"',"+"'realPlantId':'"+realPlantId+"',"+"'goodsLevelId':'"+goodsLevelId+"',"+proList+"},";
				}	
			});
		}
		else{
			jQuery(".sData .realPlant_Pro").each(function(i){
				var proList = "";
				jQuery(this).find("td[class='hiddenTrPro']").each(function(){			
					var preTime  = jQuery(this).find("input[class='preTime']").val();
					var preTotal  = jQuery(this).find("input[class='preTotal']").val();
					var judgePro  = jQuery(this).find("input[class='judgePro']").val();
					if(preTotal!=null&&trim(preTotal)!=""&&trim(preTotal)!="0"&&trim(preTotal)!="0.0"&&judgePro!="0"){
						proList += "{'preTime':'"+preTime+"','preTotal':'"+preTotal+"'},";
					}
				});
				if(proList!=""){
					proList = "'proList':["+proList.substring(0, proList.length-1)+"]";
					var plantId = jQuery(this).find("td[class='td_caozuo hiddenTd']").find("div[class='hiddenDiv']").find("input[class='plantId']").val();
					var goodsLevelId  = jQuery(this).find("td[class='goodsLevel']").find("span[class='bootSelt110 bootSelt_dengji']").find("select[class='selectpicker']").val();
					trList += "{'plantId':'"+plantId+"',"+"'goodsLevelId':'"+goodsLevelId+"',"+proList+"},";
				}	
			});
		}
		if(trList!=""){
			trList = trList.substring(0, trList.length-1);
			preHarvestJsonArray = "["+trList+"]";
		}
		jQuery("#saveMyFrom\\:preHarvestJsonArrayHid").val(preHarvestJsonArray);
	}	
}
function preTotalChange(obj){
	var preTotal = jQuery(obj).val();
	var preTotalOld = jQuery(obj).parent().find("input[class='preTotal']").val();
  	if(preTotal==null||trim(preTotal)==""){
  		jQuery(obj).parent().find("input[class='preTotal']").val("");
  		return false;
  	}
  	else{
  	  	var reg =/^\d+(\.\d+)?$/; 
  	  	if(!reg.test(preTotal)){
  		   	document.getElementById("productMsg").innerHTML = "请输入数字!"; 
  			jQuery("#myModalYz").modal("show");
  	  		if(preTotalOld==null||trim(preTotalOld)==""){
  	  			jQuery(obj).val(""); 
  	  		}
  	  		else{
  	  			jQuery(obj).val(preTotalOld);
  	  		}		
  		  	return false;
  	  	}
  	}
  	jQuery(obj).parent().find("input[class='preTotal']").val(preTotal);
}
function trim(str){
   	return str.replace(/(^\s+)|\s+$/g,"");
 }
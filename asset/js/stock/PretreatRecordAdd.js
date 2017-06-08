    function methodChange(id){/*加工方法改变 */
    	var preMethod = ""+$("#preMethod").val();
    	if(preMethod!=null&&preMethod!=""&&preMethod!="请选择"){
    		$("#saveFrom\\:preMethodHid").val(preMethod);
    	}   	
        if(preMethod.indexOf("干燥") > -1 ){
        	$("#td-dryMethod").css("display","");
        	$("#td-dryTime").css("display","");
        }
        else{
        	$("#td-dryMethod").css("display","none");
        	$("#td-dryTime").css("display","none");
        }
        if(preMethod.indexOf("其它") > -1 ){
        	$("#td-otherMethod").css("display","");
        } 
        else{
        	$("#td-otherMethod").css("display","none");
        }
      }
    function inputTextareaChange(id){
    	var getValue = $("#saveFrom\\:"+id).val();
    	if(getValue!=null&&trim(getValue)!=""){
    		if(getValue.length>200){
    			$("#saveFrom\\:"+id).val(getValue.substring(0,200));
    		}
    	}
    }
    /*保存*/
    function subSave(){
    	//作物
    	var plantId= document.getElementById("plantId").value;
        if(plantId==null||plantId==""||plantId=="请选择"){
      		alert("请选择作物");
    	  	return false;
        }
        $("#saveFrom\\:plantIdH").val(plantId);
    	//加工方法
    	var preMethod = $("#preMethod").val();
    	if(preMethod==null||preMethod==""||preMethod=="请选择"){
    		alert("请选择加工方法");
    		return false;
    	}   	
        if(preMethod.indexOf("干燥") > -1 ){
        	//干燥方法
        	var dryMethod= document.getElementById("dryMethod").value;
            if(dryMethod==null||dryMethod==""||dryMethod=="请选择"){
          		alert("请选择干燥方法");
        	  	return false;
            }
            $("#saveFrom\\:dryMethodH").val(dryMethod);
        	//干燥时间
        	var dryTime= document.getElementById("saveFrom:dryTime").value;
            if(dryTime==null||trim(dryTime)==""){
          		/*alert("干燥时间不能为空");
        	  	return false;*/
            }
            else{
              	var reg =/^\d+(\.\d+)?$/; 
              	if(!reg.test(dryTime)){
              		alert("干燥时间只能为数字");
            	  	return false;
              	}
            }
        }
        else{
        	var dryTime= document.getElementById("saveFrom:dryTime").value;
        	if(!(dryTime==null||trim(dryTime)=="")){
        		document.getElementById("saveFrom:dryTime").val("");
        	}
        }
    	//操作时间
        var operateTime= document.getElementById("saveFrom:operateTime").value;
        var operateEndTime= document.getElementById("saveFrom:operateEndTime").value;
       if(operateTime==null||trim(operateTime)==""){
    	   if(!(operateEndTime==null||trim(operateEndTime)=="")){
           		alert("请选择起始时间和结束时间");
           		return false;   
    	   }
        }
       else{
    	   if(operateEndTime==null||trim(operateEndTime)==""){
              	alert("请选择起始时间和结束时间");
              	return false;   
       	   }
    	   else{
    		   if(operateTime>operateEndTime){
    			   alert("起始时间不能大于结束时间");
    			   return false;
    		   }
    	   }
       }
    	//加工图片   
        var childPagePicture = $('div table tr td iframe').contents().find('#childPagePicture').val();
        $("#saveFrom\\:productImage").val(childPagePicture);   
    	var getValue = $("#saveFrom\\:annotation").val();
    	if(getValue!=null&&trim(getValue)!=""){
    		if(getValue.length>200){
    			$("#saveFrom\\:annotation").val(getValue.substring(0,200));
    			alert("备注不能超过200字");
    			return false;
    		}
    	}
        return true;
    }
    function trim(str){
       	return str.replace(/(^\s+)|\s+$/g,"");
     }
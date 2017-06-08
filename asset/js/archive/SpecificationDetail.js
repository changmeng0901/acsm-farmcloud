jQuery(document).ready(function(){
	jQuery("[data-toggle='tooltip']").tooltip();  //工具提示
	//搜索输入框获取焦点及失去焦点状态
	jQuery('input.form-control').focus(function(){
		var _val = this.defaultValue;
		if( jQuery(this).val() == _val ){
			jQuery(this).val('');
		}
	});
	jQuery('input.form-control').blur(function(){
		var _val = this.defaultValue;
		if( jQuery(this).val() == '' ){
			jQuery(this).val( _val );
		}
	});
	//下拉菜单
    jQuery('.selectpicker').selectpicker({
		dropupAuto:false,
		noneSelectedText : "全部"
	});
	//表格隔行换色
	jQuery('.tableModel tbody tr').mouseover(function(){
		jQuery(this).addClass('hover');
	});
	jQuery('.tableModel tbody tr').mouseout(function(){
		jQuery(this).removeClass('hover');
	});
	
});

//种植方法列表中，点击删除图标，则删除此种植方法
function DeletePlantff(obj){
	jQuery(obj).parents('.plantff-tr').remove();
}
//点击搜索、翻页
function queryPage(pageNum){
	var pushSources=jQuery("#pushSource").val();
	var planStandardIds=jQuery("#planStandard").val();
	var plantEnvIds=jQuery("#plantEnv").val();
	var searchContent=jQuery("#searchContent").val();
	pushSources=pushSources!=null?pushSources.toString():"";
	planStandardIds=planStandardIds!=null?planStandardIds.toString():"";
	plantEnvIds=plantEnvIds!=null?plantEnvIds.toString():"";
	if(searchContent=="输入种植方法名称搜索"){
		searchContent="";
	}
	searchPlantFarmingPushList(searchContent,planStandardIds,plantEnvIds,pushSources,pageNum);
}
var tempGroupId="";
//打开-设置种植方法弹框
function showRealPlantMethod(realId,groupId,planStandardId,plantEnvId){
	getPlantFarmingMethodList(planStandardId,plantEnvId);
	jQuery("#realPlantId").val(realId);
	tempGroupId=groupId;
	
}
function getRealplantMethodListNext(){
	jQuery('#methodSelectpicker').selectpicker();
	if(tempGroupId!=""){
		jQuery("#methodSelectpicker").selectpicker('val',tempGroupId);
	}else{
		jQuery("#methodSelectpicker").selectpicker('val',"0");
	}
	jQuery("#amendPlantModal").modal("show");
}

//提交-设置种植方法
function submitMethod(){
	var realPlantId=jQuery("#realPlantId").val();
	var groupId=jQuery("#methodSelectpicker").val();
	setRealPlantMethod(realPlantId,groupId);
}
function deleteMethodNext(msg){
	if(msg!=""){
		alert(msg);
	}
}
document.onkeydown=function(event){ 
   	e = event ? event :(window.event ? window.event : null); 
   	if(e.keyCode==13){ 
  	 	if(document.activeElement.id=="searchContent"){
  	 		queryPage(1);
  	 	}
		e.keyCode=0;
		if (window.navigator.userAgent.indexOf("MSIE")==-1){
			 e.preventDefault();
			 return false;
        }
       	e.returnValue=false;				
   	} 
} 
jQuery(document).ready(function(){
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
	jQuery('#plantInfo,#planStandard,#plantEnv').attr("multiple","multiple");
	jQuery('#plantInfo').attr("data-live-search","true");
    jQuery('#plantInfo').selectpicker({
		dropupAuto:false,
		noneSelectedText : "全部作物"
	});
    jQuery('#planStandard').selectpicker({
		dropupAuto:false,
		noneSelectedText : "全部种植标准"
	});
    jQuery('#plantEnv').selectpicker({
		dropupAuto:false,
		noneSelectedText : "全部种植环境"
	});
    jQuery('#plantInfo').selectpicker("val","");
	jQuery('#planStandard').selectpicker("val","");
	jQuery('#plantEnv').selectpicker("val","");
	
	//删除筛选条件
	jQuery('.filter-block .i-close').click(function(){
		jQuery(this).parent('.f-tiem').remove();
	});
	
	//清除所有筛选条件
	jQuery('.item-empty .iclose-all').click(function(){
		jQuery('.filter-block .f-tiem').remove();
	});
	
	//列表的作物信息整块可以点击，点击跳转作物标准规范详情页
/*	jQuery('.crop-list .col-crop2').bind("click",function(event){
        window.location.href = 'SpecificationDetail.seam';
        event.stopPropagation();    //  阻止事件冒泡
   });
	*/
})
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
//点击搜索、翻页
function queryPage(pageNum){
	var planIds=jQuery("#plantInfo").val();
	var planStandardIds=jQuery("#planStandard").val();
	var plantEnvIds=jQuery("#plantEnv").val();
	var searchContent=jQuery("#searchContent").val();
	planIds=planIds!=null?planIds.toString():"";
	planStandardIds=planStandardIds!=null?planStandardIds.toString():"";
	plantEnvIds=plantEnvIds!=null?plantEnvIds.toString():"";
	if(searchContent=="输入搜索内容"){
		searchContent="";
	}
	searchSpecification(planIds,planStandardIds,plantEnvIds,searchContent,pageNum);
}
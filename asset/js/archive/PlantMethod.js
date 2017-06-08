
jQuery(document).ready(function(){
	jQuery("[data-toggle='tooltip']").tooltip();  //工具提示
	jQuery('.farming_img').click(function(){
		showBigImg(this);
		jQuery('body').css('overflow-y','hidden');
		jQuery('.mark_b80').show();
		jQuery('.farmingMage_Magnifier').fadeIn(300);
	});
	jQuery('.MagnifierClose').click(function(){
		jQuery('body').css('overflow-y','auto');
		jQuery('.mark_b80').hide();
		jQuery('.farmingMage_Magnifier').hide();	
	});
});

/*放大图片*/
function showBigImg(img){
	var imgWidth;
	var imgHeight;
	var src = jQuery(img).attr("src");
	src = src.split("@")[0];
	jQuery("#zoomImage").attr("src", src+"?" + new Date().getTime()).load(function() {
		imgWidth=jQuery("#zoomImage").width();
		imgHeight=jQuery("#zoomImage").height();
		if(imgHeight>=450){
			imgHeight = 450;
		}
		if(imgWidth>=400){
			imgWidth = 400;
		}
		jQuery("#zoomImage").attr('src',src+'@'+imgHeight+'h_'+imgWidth+'w.src');
		jQuery(".farmingMage_Magnifier").css({"margin-top":-(imgHeight/2),"margin-left":-(imgWidth/2)});
	});
}
function showInputsModal(obj){
	jQuery("#showInputsTable .Output_tr").remove();
	jQuery("#showinputsModal").modal("show");
	setSelectVal(obj);
}
//设置投入品值
function setSelectVal(inputsObj){
	var inputsInfo=jQuery(inputsObj).siblings(".inputs_info").val();
	if(inputsInfo==""){
		return;
	}
	var data=eval("("+inputsInfo+")");
	var inputsDatas=data.inputsDatas;
	jQuery(inputsDatas).each(function(index,val){
		var tableStr="<tr class=\"Output_tr\" id='addtr_"+val.inputsId+"'>"+
	    	"<td class=\"br_bt br_rt\">"+
			"<input type='hidden' value='"+val.inputsId+"'/>"+
	    		"<input type='hidden' value='' id='unit_"+val.inputsId+"'/><span>"+(index+1)+"</<span></td>"+
			"<td class=\"br_bt br_rt\"><p class=\"ellipsis\" title='"+val.inputName+"'>"+val.inputName+"</p></td>"+
		    "<td class=\"br_bt br_rt\"><p class=\"ellipsis\" title='"+val.unitName+"'>"+val.unitName+"</p></td>"+   	
	    	"<td class=\"br_bt br_rt\"><p class=\"ellipsis\" title='"+val.unitName+"'>"+val.useNum+"</p></td>"+ 
		"</tr>";
		jQuery("#showInputsTable").append(tableStr);
	});
}
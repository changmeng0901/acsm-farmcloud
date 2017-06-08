// JavaScript Document

$(function(){
	
	// (1)下拉框
	$('.selectpicker').selectpicker();	
	
	// (2)上传图片，点击删除则删除此项
	$(".file_pic_wap .file_pic").each(function(index, elem) {
        $(elem+" .delete_btn")
    });
});

	function deleteFilePic(obj,oPicItem){
		$(obj).parents(oPicItem).remove();
	}
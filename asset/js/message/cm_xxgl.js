// JavaScript Document


/* cm 消息管理展开 */
	jquery = jQuery.noConflict();
    jquery(window).load(function(){
	var $readLen = jquery('.cm_read span:gt(5)');
	var $unreadLen = jquery('.cm_unRead span:gt(5)');
	$readLen.hide();
	$unreadLen.hide();
	
	var $toggleBtn = jquery('.cm_read .cm_show');
	var $toggleunBtn = jquery('.cm_unRead .cm_unshow');
	
	$toggleBtn.click(function(){
		if($readLen.is(':visible')){
			$readLen.hide();
			jquery('.cm_read dd').css('height','42px');
			jquery(this).css('background','url(../asset/images/message/cm_xxglBtn02.jpg) no-repeat');	
		}else{
			$readLen.show();	
			jquery('.cm_read dd').css('height','auto');
			jquery(this).css('background','url(../asset/images/message/cm_xxglBtn03.jpg) no-repeat');
		}
	});
	
	 $toggleunBtn.click(function(){
		if($unreadLen.is(':visible')){
			$unreadLen.hide();
			jquery('.cm_unRead dd').css('height','42px');
			jquery(this).css('background','url(../asset/images/message/cm_xxglBtn02.jpg) no-repeat');	
		}else{
			$unreadLen.show();	
			jquery('.cm_unRead dd').css('height','auto');
			jquery(this).css('background','url(../asset/images/message/cm_xxglBtn03.jpg) no-repeat');
		}
	});
});

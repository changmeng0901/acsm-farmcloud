var obj;
function printButtonClick(){
	obj = jQuery("#printButton").clone();
	jQuery("#rightPanel").printArea(); 
}
function closeAll(){
	if(confirm("是否关闭打印页面!")){
		window.close();
	}else{
		jQuery("#printButton").html(obj);
	}
}
//查询初加工记录,根据作物名称
function searchChange(){
	var plantName = $("#plantName").val();
	if(plantName=="请输入作物名称"||plantName==null||trim(plantName)==""){
		plantName = "";
	}
	searchByPlantName(plantName);
}
//删除初加工记录,根据ID
function delPretreatRecord(obj){
	var pretreatRecordId = $(obj).parent().find("a[class='icon_link del']").attr("id");
	var plantName = $("#plantName").val();
	if(plantName=="请输入作物名称"||plantName==null||trim(plantName)==""){
		plantName="";
	}
	var selectPageNum = $("#thisPageId").val();
	if(confirm('确定删除?')){
		deletePretreatRecord(Number(pretreatRecordId),plantName,Number(selectPageNum));
	}	
}
//分页查询方法
function queryByPage(page){
	var plantName = $("#plantNameHId").val();
	if(plantName==null||plantName=="请输入作物名称"||trim(plantName)==""){
		plantName = "";
	}
	var selectPageNum = page;	
	getPreRecordByPage(Number(selectPageNum),plantName);
}
function trim(str){
   	return str.replace(/(^\s+)|\s+$/g,"");
 }
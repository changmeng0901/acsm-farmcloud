//查询贮藏记录,根据作物名称
function searchGoodsChange(){
	var goodsName = $("#goodsNameId").val();
	var stoRoomId = $("#_stoRoomId").val();
	if(stoRoomId==null||trim(stoRoomId)==""||stoRoomId=="请选择"){
		stoRoomId = "";
	}
	if(goodsName==null||trim(goodsName)==""||goodsName=="请输入物料名称"){
		goodsName = "";
	}
	searchByGoodsName(stoRoomId,goodsName);
}
//查询贮藏记录,根据仓库
function changeStoRoomId(){
	var stoRoomId = $("#_stoRoomId").val();
	if(stoRoomId==null||trim(stoRoomId)==""||stoRoomId=="请选择"){
		stoRoomId = "";
	}
	searchByStorageId(stoRoomId);
}
//分页查询方法
function queryByPage(page){
	var goodsName = $("#goodsNameHId").val();
	var stoRoomId = $("#_stoRoomId").val();
	if(stoRoomId==null||trim(stoRoomId)==""||stoRoomId=="请选择"){
		stoRoomId = "";
	}
	if(goodsName==null||trim(goodsName)==""||goodsName=="请输入物料名称"){
		goodsName = "";
	}
	var selectPageNum = page;	
	getSearchRecordByPage(Number(selectPageNum),stoRoomId,goodsName);
}
function trim(str){
   	return str.replace(/(^\s+)|\s+$/g,"");
 }
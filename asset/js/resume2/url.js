// JavaScript Document
//请求id
var page, commentContent, levelStar,menunum;
/*var http = "http://app.farmeasy.cn/useBatch.seam?useBatch=0688000400000001";*/
var http = document.location.href;
var address = http.split("?");
var getName = address[1].split("=")[0];
var getId = address[1].split("=")[1];
if(getId.indexOf("#")>=0){
	menunum=getId.split("#");
	getId=menunum[0];
}
//var menu = address[1].split("#")[0];

//后缀
urladdress=getName+"="+getId;

/*var getId = "0688000400000001";*/
getName = getName == 'useBatch' ? { 'useBatch': getId } : { 'productId': getId };




//请求地址
//var pathurl = "http://app.farmeasy.cn/rest/1.0/resumedate";
var pathurl = "http://cs1.nongchangyun.cn/rest/1.0/resumedate";
//四季田景
//var krpanos = "http://app.farmeasy.cn/Panorama.seam?gid=";
var krpanos = "http://cs1.nongchangyun.cn/Panorama.seam?gid=";
//资源规划
//var resourcePlanning = "http://app.farmeasy.cn/DigitalCardMap.seam?";
var resourcePlanning = "http://cs1.nongchangyun.cn/DigitalCardMap.seam?";
//数字名片
//var digitalCard = "http://app.farmeasy.cn/digitalCard/baseCardShare.seam?baseCardId=";
var digitalCard = "http://cs1.nongchangyun.cn/digitalCard/baseCardShare.seam?baseCardId=";
//购买链接
//var purchase = "http://app.farmeasy.cn/purchase/ProductDetail.html?";
var purchase = "http://cs1.nongchangyun.cn/purchase/ProductDetail.html?";
//红包链接
//var redPack = "http://app.farmeasy.cn/RedPacket.seam?couId=";
var redPack = "http://cs1.nongchangyun.cn/RedPacket.seam?couId=";
/*var redPack="http://app.farmeasy.cn/RedPacket.seam?num=5&couId="+hb+"&prId="+pr+"&useBatch="+useBatch_+"&typeAorP=1";*/

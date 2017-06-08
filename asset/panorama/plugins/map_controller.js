var map; //地图

var assetRoot="";
var ajaxRoot="";

//var farme_baseID = 106; //农场ID
//var googleMap_center = ["31.5988745972896", "121.806326508522"]; //地图中心点
function getQueryString(name) { 
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return unescape(r[2]); return null; 
	} 
var googleMap_center = [];
var farme_baseID = getQueryString("baseId");
googleMap_center.push(getQueryString("coordinateX"));
googleMap_center.push(getQueryString("coordinateY"));
var assetShow = getQueryString("assetShow"); 

ajaxRoot=getQueryString("domainUrl")+'/rest/1.0/service?v=1.0&format=json&sign=5C21760DB93BB7B1A2CD0A9BE6B1E67E';

window.onload = function() {
	gMapInit(document.getElementById("map-canvas"), googleMap_center);
	google.maps.event.addListenerOnce(map, 'idle', function() {
		var overlay = new MyOverlay(map);
		if(typeof(idleFirst)!='undefined')
			idleFirst();
		ajaxConfig({ //106//162
				url: ajaxRoot + makeParameter_Method('base') + makeParameter_Field("base_id", farme_baseID),
				backfun: function(json) {
					loadC1(json.markstr);
					if(assetShow == 1){
						loadC2(json.secondstr);
						loadC3(json.thirdstr);
						loadC4Img(json.thirdstr);
						$("#map_loading").hide();
						$(".mengb").hide();
						loadDevice(); //传感器 气象站 视频 全景
					}
				}
			});
	});
	//

};
MyOverlay.prototype = new google.maps.OverlayView();
MyOverlay.prototype.onAdd = function() { }
MyOverlay.prototype.onRemove = function() { }
MyOverlay.prototype.draw = function() {
	projection = this.getProjection();
}
function MyOverlay(map) { this.setMap(map); }
var projection;

var centerMarker;
function loadC1(markstr) {
	//console.log(markstr)
	//console.log([markstr[0].coordinateX, markstr[0].coordinateY])
	//gMapInit(document.getElementById("map-canvas"), [markstr[0].coordinateX, markstr[0].coordinateY]);
	//一级域markstr
	var calcZoom = 16;
	for (var i = 0; i < markstr.length; i++) {
		var k1Arr = [];
		var coordinateGroup = markstr[i]["coordinateGroup"];
		var bounds = new google.maps.LatLngBounds();
		coordinateGroup = coordinateGroup.replace(/[()]/g, '');
		if (coordinateGroup.length == 0)
			continue;
		coordinateGroup = coordinateGroup.split("_");
		for (var j = 0; j < coordinateGroup.length; j++) {
			k1Arr.push(coordinateGroup[j].split(","));
			bounds.extend(makeLatLng(coordinateGroup[j].split(",")));
		};
		if(!bounds.isEmpty()){
			calcZoom = getBoundsZoomLevel(bounds);
			if(typeof(calcZoom) != "undefined" && calcZoom >0){
				map.setCenter(makeLatLng([markstr[i].coordinateX, markstr[i].coordinateY]));
				map.setZoom(calcZoom);
			}
        }
		if(assetShow == 1){
			drawingPolygon(k1Arr, markstr[i]['color'], 1);
		}
		var k1Marker = setMarker([markstr[i].coordinateX, markstr[i].coordinateY], markstr[i].name);
		k1Marker.parentData = markstr[i];
		
		var infowindow = new google.maps.InfoWindow({
			content: markstr[i].name,
			maxWidth: 400,
			disableAutoPan:true
			});
		infowindow.open(k1Marker.get('map'), k1Marker);
		centerMarker = k1Marker;
		new Wenzi(makeLatLng([markstr[i].coordinateX, markstr[i].coordinateY]), markstr[i].name, map, 1);
		if(markstr[i].bdx==""){
			$("#navigation_div").hide();
		}else{
			$("#navigation_div").show();
			$("#navigation_div").click(function(){
				var latlng = markstr[0].bdx+","+markstr[0].bdy;
				var title = markstr[0].name;
				var address = markstr[0].address;
				parent.navigation(latlng,title,address);
			});
		}
		
	}
	if(typeof(idleDoSomething)!='undefined'){
		centerMarker.setMap(null);
		setTimeout(function(){idleDoSomething();},1);
	}
}

function loadC2(secondstr) {
	//二级域secondstr
	for (var i = 0; i < secondstr.length; i++) {
		var k2Arr = [];
		var coordinateGroup = secondstr[i]["coordinateGroup"];
		var bounds = new google.maps.LatLngBounds();
		coordinateGroup = coordinateGroup.replace(/[()]/g, '');
		if (coordinateGroup.length == 0)
			continue;
		coordinateGroup = coordinateGroup.split("_");
		for (var j = 0; j < coordinateGroup.length; j++) {
			var arr = coordinateGroup[j].split(",");
			bounds.extend(makeLatLng(arr));
			k2Arr.push(arr);
		};
		new Wenzi(bounds.getCenter(), secondstr[i]["name"], map, 2);
		drawingPolygon(k2Arr, secondstr[i]['color'], 2);
	}
}

function loadC3(thirdstr) {
	//console.log(thirdstr)
	//三级域thirdstr
	for (var i = 0; i < thirdstr.length; i++) {
		var k3Arr = [];
		var coordinateGroup = thirdstr[i]["coordinateGroup"];
		var bounds = new google.maps.LatLngBounds();
		coordinateGroup = coordinateGroup.replace(/[()]/g, '');
		if (coordinateGroup.length == 0)
			continue;
		coordinateGroup = coordinateGroup.split("_");
		for (var j = 0; j < coordinateGroup.length; j++) {
			var arr = coordinateGroup[j].split(",");
			bounds.extend(makeLatLng(arr));
			k3Arr.push(arr);
		};
        var centerpoint = new google.maps.LatLng(parseFloat(thirdstr[i].latitude),parseFloat(thirdstr[i].longitude));
		new Wenzi(centerpoint, thirdstr[i]["tunnelName"], map, 3);
		drawingPolygon(k3Arr, thirdstr[i]['color'], 3);
	}
}
//
function loadC4Img(thirdstr) {

	var nowDate = new Date().getTime();
	for (var i = 0; i < thirdstr.length; i++) {
		var tempb = false;
		var left, right, imgUrl;
		if (thirdstr[i].realPlantLength == 0) {
			imgUrl = '/asset/images/wt.png';
		} else if (thirdstr[i].realPlantLength > 1) {
			imgUrl = '/asset/images/dt.png';
		} else {
			if(thirdstr[i].realPlantImage == ""){
				imgUrl = '/asset/images/wt.png';
			}else{
				imgUrl = thirdstr[i].realPlantImage+"@60h_60w|60-1ci.png";
			}
		}
		var coordinateGroup = thirdstr[i]["coordinateGroup"];
		coordinateGroup = coordinateGroup.replace(/[()]/g, '').split("_");
		var bounds = new google.maps.LatLngBounds();
		for (var j = 0; j < coordinateGroup.length; j++) {
			var arr = coordinateGroup[j].split(",");
			bounds.extend(makeLatLng(arr));
		};
		left = new google.maps.LatLng(parseFloat(thirdstr[i].latitude) + 0.0000424, parseFloat(thirdstr[i].longitude) + 0.000055);
		right = new google.maps.LatLng(parseFloat(thirdstr[i].latitude) - 0.000045, parseFloat(thirdstr[i].longitude) - 0.000060);
		var newBounds = new google.maps.LatLngBounds(right, left);
		new USGSOverlay(newBounds, imgUrl, map, thirdstr[i], tempb);
			//tempb目前缺少
	}
}
//传感器和气象站marker
function loadC5deviceStr(deviceStr) {
	//console.log(deviceStr)
	if (deviceStr.length == 0) {
		return
	}
	for (var i = 0; i < deviceStr.length; i++) {
		var device = deviceStr[i];
		var latlng = makeLatLng([device.coordinateX, device.coordinateY]);
		var arr = {};
		arr.device_ = device.deviceType;
		//		if(device.deviceType=='1'){
		//			console.log(device.sn;)
		//		}
		arr.device_base_id = device.baseId;
		arr.device_partition_id = device.partitionId;
		arr.device_id = device.id;
		arr.device_sn = device.sn;
		arr.device_name = device.name;
		arr.device_description = device.description;
		arr.device_factory = device.factoryTime;
		arr.device_deviceType = device.deviceType;
		arr.device_type_id = device.deviceTypeId;
		arr.device_coordinateX = device.coordinateX;
		arr.device_coordinateY = device.coordinateY;
		arr.device_status = device.status;
		arr._index = i;
		//console.log(arr)
		new CustomOverlay(map, '', latlng, arr);
	}
}
//监控marker
function loadMonitor(videoStr) {
	if (videoStr.length == 0) {
		return;
	}
	for (var i = 0; i < videoStr.length; i++) {
		var temp = videoStr[i];
		var arr = {};
		arr.device_ = 3;
		arr.video_id = temp.videoId;
		arr.video_sn = temp.sn;
		arr.video_name = temp.name;
		arr.video_description = temp.description;
		arr.video_coordinateX = temp.coordinateX;
		arr.video_coordinateY = temp.coordinateY;
		arr.video_status = temp.status;
		var selected = temp.selected ? 0 : 1;
		arr.video_selected = selected;
		arr.video_factoryTime = temp.factoryTime;
		arr.video_ip = temp.ip;
		arr.video_channel_no = temp.channelNo;
		arr.video_device_video_channel_no = temp.deviceVideoChannelNo;
		arr.video_username = temp.username;
		arr.video_password = temp.password;
		arr.video_app_ip = temp.appIp;
		arr.video_app_port = temp.appPort;
		arr.video_app_device_video_channel_no = temp.appDeviceVideoChannelNo;
		arr.video_app_username = temp.appUsername;
		arr.video_app_password = temp.appPassword;
		arr.video_type_id = temp.deviceTypeId;
		arr.video_access_way = temp.accessWay;
		arr.video_webcam_url = temp.webcamUrl;
		arr.video_app_web_port = temp.appWebPort;
		arr._index = i;
		var latlng = makeLatLng([temp.coordinateX, temp.coordinateY]);
		//console.log(latlng)
		var custom = new CustomOverlay(map, "", latlng, arr);
		//videoArray.push(custom);
	}
	//video_index = videoStr.length;
}
//360度全景marker
function loadsixth(krpanoStr) {
	for (var i = 0; i < krpanoStr.length; i++) {
		var temp = krpanoStr[i];
		var arr = {};
		arr.device_ = 4;
		arr.krpano_id = temp.id;
		arr.krpano_sn = temp.sn;
		arr.krpano_name = temp.name;
		arr.krpano_coordinateX = temp.coordinateX;
		arr.krpano_coordinateY = temp.coordinateY;
		arr.krpano_front_url = temp.frontUrl;
		arr.krpano_back_url = temp.backUrl;
		arr.krpano_left_url = temp.leftUrl;
		arr.krpano_right_url = temp.rightUrl;
		arr.krpano_up_url = temp.upUrl;
		arr.krpano_down_url = temp.downUrl;
		arr.krpano_base_id = temp.baseId;
		arr.krpano_partions_id = temp.partionsId;
		arr.krpano_tunnel_info_id = temp.tunnelInfoId;
		arr.krpano_file_fold = temp.filefold;
		arr.krpano_fold_name = temp.foldName;
		arr.enterid = temp.enterpriseInfoId;
		arr.fileType = temp.fileType;
		arr._index = i;
		var latlng = makeLatLng([temp.coordinateX, temp.coordinateY]);
		var custom = new CustomOverlay(map, '', latlng, arr);
		//krpanoArray.push(custom);
	}
	//krpano_index = krpanoStr.length;
}

function loadDevice() {
	ajaxConfig({
		url: ajaxRoot + makeParameter_Method('device') + makeParameter_Field("base_id",farme_baseID),
		backfun: function(json) {
			loadC5deviceStr(json.deviceStr); //传感器 气象站
			loadMonitor(json.videoStr) ;//视频
			loadsixth(json.krpanoStr); //全景
		}
	});
}

//<![CDATA[
var WGS84_to_GCJ02 = function() {}

WGS84_to_GCJ02.prototype.a = 6378245.0;
WGS84_to_GCJ02.prototype.ee = 0.00669342162296594323;
WGS84_to_GCJ02.prototype.transform = function(wgLat, wgLon) {

    if (this.outOfChina(wgLat, wgLon)) {
        return [wgLat, wgLon];
    }

    dLat = this.transformLat(wgLon - 105.0, wgLat - 35.0);
    dLon = this.transformLon(wgLon - 105.0, wgLat - 35.0);
    radLat = wgLat / 180.0 * Math.PI;
    magic = Math.sin(radLat);
    magic = 1 - this.ee * magic * magic;
    sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtMagic) * Math.PI);
    dLon = (dLon * 180.0) / (this.a / sqrtMagic * Math.cos(radLat) * Math.PI);
    mgLat = wgLat + dLat;
    mgLon = wgLon + dLon;

    return [mgLat, mgLon];

};

WGS84_to_GCJ02.prototype.outOfChina = function(lat, lon) {

    if (lon < 72.004 || lon > 137.8347)
        return true;
    if (lat < 0.8293 || lat > 55.8271)
        return true;

    return false;

};

WGS84_to_GCJ02.prototype.transformLat = function(x, y) {

    var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * Math.PI) + 40.0 * Math.sin(y / 3.0 * Math.PI)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * Math.PI) + 320 * Math.sin(y * Math.PI / 30.0)) * 2.0 / 3.0;

    return ret;

};

WGS84_to_GCJ02.prototype.transformLon = function(x, y) {

    var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * Math.PI) + 20.0 * Math.sin(2.0 * x * Math.PI)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * Math.PI) + 40.0 * Math.sin(x / 3.0 * Math.PI)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * Math.PI) + 300.0 * Math.sin(x / 30.0 * Math.PI)) * 2.0 / 3.0;

    return ret;

};

var nowD = new Date();
var nowD_ = new Date(nowD.getFullYear(), nowD.getMonth(), nowD.getDate());
var nowD_2 = new Date(nowD.getFullYear(), nowD.getMonth() + 1, nowD.getDate());

var re =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/  
var ipMap = new JsMap();
function formatFloat(src, pos) {
	return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
}
var map;
var drawingManager;
var array = new Array();
var array_mark = new Array();// 第一级描点集合.
var mark__index = 1;// 第一级下标,取数据库
var second__index = 1;
var third__index = 1;
var selectedShape;
var mark1Array = new Array();// 一级域
var mark2Array = new Array();
var mark3Array = new Array();
var deviceArray = new Array();
var videoArray = new Array();
var krpanoArray = new Array();//全景
var dbclick_ = 0;
var device_index = 1;
var video_index = 1;
var krpano_index = 1;
var days3 = [ "上旬", "中旬", "下旬" ];
// 无作物大棚图片
var noneImage = new google.maps.MarkerImage(workpath + "/asset/images/wt.png",
		new google.maps.Size(20, 20), new google.maps.Point(0, 0),
		new google.maps.Point(10, 10), new google.maps.Size(20, 20));
var moreImage = new google.maps.MarkerImage(workpath + "/asset/images/dt.png",
		new google.maps.Size(20, 20), new google.maps.Point(0, 0),
		new google.maps.Point(10, 10), new google.maps.Size(20, 20));
var nonesrc = workpath + "/asset/images/wt.png";
var moresrc = workpath + "/asset/images/dt.png";
var addsrc = workpath + "/asset/images/add_y.png";
var devicesrc = workpath + "/asset/images/vidicon2.png";
var weathersrc = workpath + "/asset/images/vidicon4.png";
var videosrc = workpath + "/asset/images/vidicon3.png";
var moreanimal = workpath + "/asset/images/more_animal.png";
var animalsrc = workpath + "/asset/images/animal_3.png";
var addanimalsrc = workpath + "/asset/images/animal_4.png";
var krpanosrc = workpath+"/asset/images/krpanoimg2.png";
var oneimg = workpath + "/asset/images/oneimg.png";
var twoimg = workpath + "/asset/images/twoimg.png";
var geo_blue = workpath + "/asset/images/geo_blue.png";
var geo_gray = workpath + "/asset/images/geo_gray.png";
var styles = [
              {
                featureType: 'all',
                stylers: [{invert_lightness: 'true'}]
              }        
            ]
var styledMap ;
function clearSelection() {
	if (selectedShape) {
		selectedShape.setEditable(false);
		selectedShape = null;
	}
}

function setSelection(shape) {
	clearSelection();
	selectedShape = shape;
	shape.setEditable(false);
}

function deleteSelectedShape() {
	if (selectedShape) {
		selectedShape.setMap(null);
	}
}
function initialize() {
	styledMap = new google.maps.StyledMapType(styles,{name: "Black Map"});
	var defaultZoom = 15;
	if(zoom_group != ""){
		try{
			zoom_group = zoom_group.replace(/[()]/g, '');
			var strr = zoom_group.split("_");
			var bounds = new google.maps.LatLngBounds();
			for(var y = 0;y<strr.length;y++){
				var yy = strr[y].split(",");
				var temp = new google.maps.LatLng(parseFloat(yy[0]),parseFloat(yy[1]));
				bounds.extend(temp);
			}
			var zoom_ = getBoundsZoomLevel(bounds);
			if(zoom_ !=0)
				defaultZoom = zoom_;
		}catch(e){}
	}
	
	// 初始化地图参数
	var lag;
	if (_center != "") {
		_center = _center.replace(/[()]/g, '');
		var yy = _center.split(",");
		lag = new google.maps.LatLng(parseFloat(yy[0]), parseFloat(yy[1]));
	} else {
		lag = new google.maps.LatLng(39.90627970711568, 116.3911771774292);
	}

	
	var mapOptions = {
		center : lag,
		zoom : defaultZoom,
		mapTypeId : google.maps.MapTypeId.SATELLITE,
		zoomControlOptions: {  
	        position: google.maps.ControlPosition.RIGHT_TOP  
	    },
		streetViewControl : false,// 取消街景
		// disableDoubleClickZoom:true,
		//scaleControl: true,
		mapTypeControl : false
		
		
	};
	// div显示地图
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	map.mapTypes.set( "Black Map", styledMap);
	//map.setMapTypeId("Black Map");
	
	
	// 绘画工具 设置
	g_infowindow.set("content", "");
	var center = new google.maps.LatLng(120, 120);
	g_infowindow.setPosition(center);
	g_infowindow.set("maxWidth", 242);
	g_infowindow.setMap(map);

	c_infowindow.set("content", "<table width='240'>x</table>");
	c_infowindow.setPosition(center);
	c_infowindow.set("maxWidth", 300);
	c_infowindow.setMap(map);

	weather_infowindow.set("content", "<table width='240'>x</table>");
	weather_infowindow.setPosition(center);
	weather_infowindow.set("maxWidth", 300);
	weather_infowindow.setMap(map);

	setTimeout(function() {
		xa();
		g_infowindow.setMap(null);
		c_infowindow.setMap(null);
		weather_infowindow.setMap(null);
	}, 10);
	setTimeout(function() {
		hove();
	}, 10);
	google.maps.event.addListenerOnce(map, 'idle', function() {
		//_Q("#map-canvas").find('img[src="http://maps.gstatic.cn/mapfiles/api-3/images/tmapctrl.png"]').closest(".gmnoprint").parent().css("margin-right",31)
		setControlRight();
		addGeo(map);
		//mapZero();
		mapFirst();
		loadfirst();
		setTimeout(function() {
			_Q(".gm-style").find("div:eq(0)").find("div:eq(0)").next().hide();
		}, 500);
	});
}

function setControlRight(){
	var obj = _Q("#map-canvas").find('img[src="http://maps.gstatic.cn/mapfiles/api-3/images/tmapctrl.png"]').closest(".gmnoprint").parent();
	if(obj.length == 0){
		obj = _Q("#map-canvas").find('div[title="放大"]').closest(".gmnoprint").parent();
	}
	if(obj.length == 0){
		obj = _Q("#map-canvas").find('img[src="http://maps.gstatic.cn/mapfiles/api-3/images/tmapctrl_hdpipng"]').closest(".gmnoprint").parent();
	}
	var right = obj.css("margin-right");
	if(typeof(right) == "undefined" || right == "10px"){
		obj.css("margin-right","31px");
		setTimeout(function(){setControlRight();}, 2000);
	}
}

function zero_next(data){
	//_Q("#map-canvas").find('img[src="http://maps.gstatic.cn/mapfiles/api-3/images/tmapctrl.png"]').closest(".gmnoprint").parent().css("margin-right",31)
	secondstr = JSON.parse(data)
	loadsecond();
	setTimeout(function(){initList();},2);
}

function first_next(data){
	//var temp = JSON.parse(data)
	animalStr = thirdthird.animal;
	thirdstr = thirdthird.tunnelinfo;
	loadthird();
	setTimeout(function(){mapSecond();},2);
	setTimeout(function(){initList();},2);
}

function first_next_next(){
	loadthird_next();
}

function second_next(data){
	var temp = JSON.parse(data);
	//eval("var temp = "+data);
	krpanoStr = temp.krpano;
	deviceStr = temp.device;
	videoStr = temp.videoStr;
	loadfourth();
	loadfifth();
	loadsixth();
	historyList();
}

// 根据以知 点绘制图形
var bermudaTriangle;

// 加载地图

// 检测点是否在polygon范围内;
google.maps.Polygon.prototype.Contains = function(point) {
	var crossings = 0, path = this.getPath();

	for (var i = 0; i < path.getLength(); i++) {
		var a = path.getAt(i), j = i + 1;
		if (j >= path.getLength()) {
			j = 0;
		}
		var b = path.getAt(j);
		if (rayCrossesSegment(point, a, b)) {
			crossings++;
		}
	}

	return (crossings % 2 == 1);

	function rayCrossesSegment(point, a, b) {
		var px = point.lng(), py = point.lat(), ax = a.lng(), ay = a.lat(), bx = b
				.lng(), by = b.lat();
		if (ay > by) {
			ax = b.lng();
			ay = b.lat();
			bx = a.lng();
			by = a.lat();
		}
		if (px < 0) {
			px += 360;
		}
		;
		if (ax < 0) {
			ax += 360;
		}
		;
		if (bx < 0) {
			bx += 360;
		}
		;

		if (py == ay || py == by)
			py += 0.00000001;
		if ((py > by || py < ay) || (px > Math.max(ax, bx)))
			return false;
		if (px < Math.min(ax, bx))
			return true;

		var red = (ax != bx) ? ((by - ay) / (bx - ax)) : Infinity;
		var blue = (ax != px) ? ((py - ay) / (px - ax)) : Infinity;
		return (blue >= red);

	}

};
// 描点完成
function mark_info_ok() {
	for (var i = 0; i < array_mark.length; i++) {
		var m = array_mark[i];
		var name = "";
		if (m._index == _Q("#mark_info_index").val()) {
			name = m._name;
			m._name = _Q("#mark_info_name").val();
			m._id = _Q("#mark_info_id").val();
			m.setTitle(_Q("#mark_info_name").val());
			var infowindow = m._infowindow;
			var content = infowindow.get("content");
			content = content.replace("<div style='width:200px'>" + name
					+ "<br/>联系人", "<div style='width:200px'>"
					+ _Q("#mark_info_name").val() + "<br/>联系人");
			infowindow.set("content", content);
			if (m._ploygon)
				m._ploygon._name = m._name;
		}
	}
	_Q("#divFloatToolsView_").animate({
		width : 1
	}, 800, function() {
		_Q("#divFloatToolsView_").css("width", "1");
	});
	_Q(".btnOpen").show();
}
// 取消描点
function mark_info_no() {
	for (var i = 0; i < array_mark.length; i++) {
		var m = array_mark[i];
		var name = "";
		if (m._index == _Q("#mark_info_index").val()) {
			if (m._id == "") {
				m.setMap(null);
			}
		}
	}
	_Q("#divFloatToolsView_").animate({
		width : 1
	}, 800, function() {
	});
	_Q(".btnOpen").show();
}
// 删除描点
function mark_info_delete() {
	for (var i = 0; i < array_mark.length; i++) {
		var m = array_mark[i];
		if (m._index == _Q("#mark_info_index").val() && !m._btype) {
			m.setMap(null);
			if (m._id)
				delete_mark_info(m._id);
		}
	}
	_Q("#divFloatToolsView_").animate({
		width : 1
	}, 800, function() {
		_Q("#divFloatToolsView_").css("width", "1");
	});
	_Q(".btnOpen").show();
}
// 加载描点及基地范围
function loadfirst() {
//	setTimeout(function(){
//		_Q("#map-canvas").find('img[src="http://maps.gstatic.cn/mapfiles/api-3/images/tmapctrl.png"]').closest(".gmnoprint").parent().css("margin-right",31)
//	},500);
	var a = 0;
	mark__index = markstr.length;
	for (var i = 0; i < markstr.length; i++) {
		if (a == 0)
			a = 1;
		var array = markstr[i];
		var point = new google.maps.LatLng(array.coordinateX, array.coordinateY);
		var marker = new google.maps.Marker({
			position : point,
			map : map,
			title : array.name,
			icon : '../asset/images/zb.png',
			_name : array.name,
			_id : array.id,
			_index : i,
			_coordinate_X : array.coordinateX,
			_coordinate_Y : array.coordinateY,
			_imgUrl : array.baseImageUrl
		});
		array_mark.push(marker);
		attachSecretMessage(marker, array);
		var pointStr = array.coordinateGroup;
		pointStr = pointStr.replace(/[()]/g, '');
		if (pointStr.length == 0) {
			movemarker(marker);
			continue;
		}
		if (a < 2)
			a = 2;
		var triangleCoords = [];
		var strr = pointStr.split("_");
		var bounds = new google.maps.LatLngBounds();
		for (var y = 0; y < strr.length; y++) {
			var yy = strr[y].split(",");
			var temp = new google.maps.LatLng(parseFloat(yy[0]),
					parseFloat(yy[1]));
			triangleCoords.push(temp);
			bounds.extend(temp);
		}
		bermudaTriangle = new google.maps.Polygon({
			paths : triangleCoords,
			strokeColor : array.color,
			strokeOpacity : 0.8,
			strokeWeight : 4,
			fillColor : array.color,
			fillOpacity : 0.1,
			editable : false
		});
		bermudaTriangle.isok = 1;
		bermudaTriangle._marker = marker;
		bermudaTriangle._name = array.name;
		bermudaTriangle.mianji = array.muNumber;
		bermudaTriangle._contact = array.contact;
		bermudaTriangle._phone = array.entPhone;
		bermudaTriangle._description = array.description;
		bermudaTriangle._coordinate_group = array.coordinateGroup;
		bermudaTriangle._address = array.address;
		marker._ploygon = bermudaTriangle;
		mark1Array.push(bermudaTriangle);
		if(!bounds.isEmpty()){
        	var zoom = getBoundsZoomLevel(bounds);
        	if(zoom>0){
        		bermudaTriangle._zoom = zoom;
        		if(i==0){
        			map.setZoom(zoom);
        		}
        	}
        }
		loadFirstPloygon(bermudaTriangle);
		new Wenzi(point, array.name, map, 1);
		bermudaTriangle.setMap(map);
	}
}

function getBoundsZoomLevel(bounds) {
	var mapDim = {
		    height: _Q(window).height(),
		    width: _Q(window).width()
		};
    var WORLD_DIM = { height: 256, width: 256 };
    var ZOOM_MAX = 19;

    function latRad(lat) {
        var sin = Math.sin(lat * Math.PI / 180);
        var radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
        return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }

    function zoom(mapPx, worldPx, fraction) {
        return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    }

    var ne = bounds.getNorthEast();
    var sw = bounds.getSouthWest();

    var latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI;

    var lngDiff = ne.lng() - sw.lng();
    var lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360;

    var latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction);
    var lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);

    return Math.min(latZoom, lngZoom, ZOOM_MAX);
}
// 描点移动
function movemarker(marker) {
	marker.setDraggable(true);
	google.maps.event.addListener(marker, 'dragend', function() {
		marker._coordinate_X = marker.getPosition().lat();
		marker._coordinate_Y = marker.getPosition().lng();
		_Q("#mark_info_name").val(marker._name);
		_Q("#mark_info_index").val(marker._index);
		_Q("#mark_info_x").val(marker._coordinate_X);
		_Q("#mark_info_y").val(marker._coordinate_Y);
		_Q("#mark_info_id").val(marker._id);
		_Q(".rightNo").hide();
		_Q(".rightNo1").show();
		_Q("#divtittle").text("编辑基地位置");
		_Q("#divFloatToolsView_").animate({
			width : window.screen.width / 4 + 17
		}, 800, function() {
		});
		_Q(".tc_top_03").show();
		_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
		_Q(".btnOpen").hide();
	});
}
var pidArray;
// 加载区域
function loadsecond() {
	second__index = secondstr.length;
	pidArray = new Array();
	pidArray.push({"id":0,"indexNum":null});
	for (var i = 0; i < secondstr.length; i++) {
		var array = secondstr[i];
		var pointStr = array.coordinateGroup;
		pointStr = pointStr.replace(/[()]/g, '');
		if (pointStr.length == 0)
			continue;
		var triangleCoords = [];
		var bounds = new google.maps.LatLngBounds();
		var strr = pointStr.split("_");
		for (var y = 0; y < strr.length; y++) {
			var yy = strr[y].split(",");
			var temp = new google.maps.LatLng(parseFloat(yy[0]),
					parseFloat(yy[1]));
			triangleCoords.push(temp);
			bounds.extend(temp);
		}
		bermudaTriangle = new google.maps.Polygon({
			paths : triangleCoords,
			strokeColor : array.color,
			strokeOpacity : 0.45,
			strokeWeight : 3,
			fillColor : array.color,
			fillOpacity : 0.45,
			editable : false
		});
		if(!map2.containsKey(array.id)){
        	map2.put(array.id,array.name);
        }
		pidArray.push({"id":array.id,"indexNum":array.indexNum});
		bermudaTriangle._index = i;
		bermudaTriangle._name = array.name;
		bermudaTriangle.mianji = array.muNumber;
		bermudaTriangle._id = array.id;
		bermudaTriangle._base_id = array.base;
		bermudaTriangle._description = array.description;
		bermudaTriangle._group = array.coordinateGroup;
		mark2Array.push(bermudaTriangle);
		loadSecondPloygon(bermudaTriangle, bounds);
		new Wenzi(bounds.getCenter(), array.name, map, 2);
		bermudaTriangle.setMap(map);
	}
}
// 加载大棚
function loadthird() {
	third__index = thirdstr.length;
	for (var i = 0; i < thirdstr.length; i++) {
		var array = thirdstr[i];
		var pointStr = array.coordinateGroup;
		pointStr = pointStr.replace(/[()]/g, '');
		if (pointStr.length == 0)
			continue;
		var triangleCoords = [];
		var bounds = new google.maps.LatLngBounds();
		var strr = pointStr.split("_");
		for (var y = 0; y < strr.length; y++) {
			var yy = strr[y].split(",");
			var temp = new google.maps.LatLng(parseFloat(yy[0]),
					parseFloat(yy[1]));
			triangleCoords.push(temp);
			bounds.extend(temp);
		}
		bermudaTriangle = new google.maps.Polygon({
			paths : triangleCoords,
			strokeColor : array.color,
			strokeOpacity : 0.8,
			strokeWeight : 2,
			fillColor : array.color,
			fillOpacity : 0.5,
			editable : false,
			zIndex : google.maps.Marker.MAX_ZINDEX + 1
		});

		if (array.latitude == 0 || typeof(array.latitude) == "undefined") {
			bermudaTriangle.group_x = bounds.getCenter().lat();
			bermudaTriangle.group_y = bounds.getCenter().lng();
		} else {
			bermudaTriangle.group_x = array.latitude;
			bermudaTriangle.group_y = array.longitude;
		}
        bermudaTriangle._index_num = array.indexNum;
		bermudaTriangle._name = array.tunnelName;
		bermudaTriangle._id = array.tunnelInfoId;
		bermudaTriangle._group_parent_id = array.partId;
		bermudaTriangle._index = i;
		bermudaTriangle._group = array.coordinateGroup;
		bermudaTriangle.mianji = array.muNumber;
		bermudaTriangle._group_type = array.plantEnvTypeId;
		bermudaTriangle._keeperId = array.keeperId;
		bermudaTriangle._masterId = array.masterId;
		bermudaTriangle._muarea = array.area;
		bermudaTriangle._device_id = array.diviceId;
		bermudaTriangle._base_id = array.baseId;
		bermudaTriangle._tunnel_group_id = array.tunnelGroupId;
		bermudaTriangle._bounds = bounds;
		bermudaTriangle._crop_area = array.crop_area;
		mark3Array.push(bermudaTriangle);
		bermudaTriangle.setMap(map);
		
	}
}

function loadthird_next(){
	for(var i = 0;i<mark3Array.length;i++){
		var bermudaTriangle = mark3Array[i];
		loadThirdPloygon(bermudaTriangle, bermudaTriangle._bounds);
        var tempcenter = new google.maps.LatLng(parseFloat(bermudaTriangle.group_x),parseFloat(bermudaTriangle.group_y));
		var wenzi = new Wenzi(tempcenter, bermudaTriangle._name, map, 3);
		bermudaTriangle._wenzi=wenzi;
	}
}

function clearMap() {
	clearSelection();
	setMapNotNull();
}
// 加载基地第二步
function loadFirstPloygon(bermudaTriangle) {
	var radius = bermudaTriangle.getPath();
	google.maps.event.addDomListener(bermudaTriangle, 'dblclick',
			function(event) {// alert(1)
				return;
				setSelection(bermudaTriangle);
				_Q(".rightNo").hide();
				_Q(".rightNo2").show();
				_Q("#divtittle").text("编辑基地范围");
				_Q("#divFloatToolsView_").animate({
					width : window.screen.width / 4 + 17
				}, 800, function() {
				});
				_Q(".tc_top_03").show();
				// _Q("#searchLi").animate({right:
				// window.screen.width/4+10},800,function(){});
				_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
				_Q(".btnOpen").hide();
				_Q("#mark_id").val(bermudaTriangle._marker._id);
				_Q("#mark_name").val(bermudaTriangle._name);
				_Q("#mark_area").val(bermudaTriangle.mianji);
				_Q("#mark_contact").val(bermudaTriangle._contact);
				_Q("#mark_phone").val(bermudaTriangle._phone);
				_Q("#mark_address").val(bermudaTriangle._address);
				_Q("#mark_description").val(bermudaTriangle._description);
				_Q("#mark_coordinate_group").val(
						bermudaTriangle._coordinate_group);
				_Q("input[name='baseFormColor']").val(
						bermudaTriangle.get("fillColor"));
				_Q("#baseForm\\:color-colorPicker-hex").val(
						bermudaTriangle.get("fillColor").replace("#", ""));
				_Q(".rich-color-picker-icon ").css("background-color",
						bermudaTriangle.get("fillColor"));
				setMapNull();
			});

}

// 加载区域第二步
function loadSecondPloygon(bermudaTriangle, bounds) {
	var radius = bermudaTriangle.getPath();
	google.maps.event.addDomListener(bermudaTriangle, 'dblclick', function(
			event) {// alert(1)
		return;
		setSelection(bermudaTriangle);
		_Q(".rightNo").hide();
		_Q(".rightNo3").show();
		_Q("#divtittle").text("编辑区域分区");
		_Q("#divFloatToolsView_").animate({
			width : window.screen.width / 4 + 17
		}, 800, function() {
		});
		_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
		_Q(".btnOpen").hide();
		_Q("#partition_name").val(bermudaTriangle._name);
		_Q("#partition_id").val(bermudaTriangle._id);
		_Q("#base_id").val(bermudaTriangle._base_id);
		_Q("#partition_index").val(bermudaTriangle._index);
		_Q("#partition_group").val(bermudaTriangle._group);
		_Q("#partition_area").val(bermudaTriangle.mianji);
		_Q("#partition_description").val(bermudaTriangle._description);
		_Q("input[name='partitionFormColor']").val(
				bermudaTriangle.get("fillColor"));
		_Q("#partitionForm\\:color-colorPicker-hex").val(
				bermudaTriangle.get("fillColor").replace("#", ""));
		_Q(".rich-color-picker-icon ").css("background-color",
				bermudaTriangle.get("fillColor"));
		setMapNull();
	});

}

// 加载大棚第三步 
function loadThirdPloygon(bermudaTriangle, bounds) {
	var radius = bermudaTriangle.getPath();
	google.maps.event.addDomListener(bermudaTriangle,'dblclick',function(event) {// 大棚双击时间
		_Q(".baseMap_ttl").css('background','url('+ workpath+ '/asset/images/baseIcojian1.png) no-repeat 10px 12px center')
				.next('.baseMap_con').show();
		if (event) {
			_Q("#groupbutton1").show();
			_Q("#groupbutton2").hide();
			ret = 1;
		} else {
			_Q("#groupbutton1").hide();
			_Q("#groupbutton2").show();
			ret = 2;
		}
		_Q("#rightPane .hsplitbar").hide();
		_Q("#rbPane").hide();
		_Q(".tc_rw_rw2").scrollTop(0);
		_Q("#group_type").val(bermudaTriangle._group_type);
		_Q("#group_type_default").val(
				bermudaTriangle._group_type);
		var e_ = parseInt(bermudaTriangle._group_type, 10);
		_Q(".plantEnvir a:eq(" + (e_ - 1) + ")").addClass(
				'active').siblings().removeClass('active');
		_Q("#group_type").selectpicker('refresh');
		
		_Q("#group_parent_id").empty();
		_Q("#group_parent_id").append(noneOption);
		for(var i = 0;i<mark2Array.length;i++){
			var polygon2 = mark2Array[i];
			if(polygon2.getMap()!=null&&polygon2._base_id==bermudaTriangle._base_id){
				_Q("#group_parent_id").append("<option value='"+polygon2._id+"'>"+polygon2._name+"</option>");
			}
		}
		if(bermudaTriangle._group_type==8){
            _Q(".animal_hide").find(".fenzu").show();
            _Q(".animal_hide").find(".fenzu").find("select").attr("name","group_groupId").attr("id","group_groupId");
            _Q(".plant_hide").find(".fenzu").hide();
            _Q(".plant_hide").find(".fenzu").find("select").attr("name","").attr("id","");
            _Q("#group_groupId").empty().append(_Q("#group_groupId_ [base_id='"+bermudaTriangle._base_id+"']").clone());
			_Q('#group_farmer2').empty().append(_Q("#group_farmer2_ [base_id='"+bermudaTriangle._base_id+"']").clone()).append(_Q("#group_farmer2_ [base_id='']").clone());
			_Q('#group_farmer3').empty().append(_Q("#group_farmer3_ [base_id='"+bermudaTriangle._base_id+"']").clone()).append(_Q("#group_farmer3_ [base_id='']").clone());
		}else{
            _Q(".plant_hide").find(".fenzu").show();
            _Q(".plant_hide").find(".fenzu").find("select").attr("name","group_groupId").attr("id","group_groupId");
            _Q(".animal_hide").find(".fenzu").hide();
            _Q(".animal_hide").find(".fenzu").find("select").attr("name","").attr("id","");
            _Q("#group_groupId").empty().append(_Q("#group_groupId_ [base_id='"+bermudaTriangle._base_id+"']").clone());
			_Q('#group_farmer').empty().append(_Q("#group_farmer_ [base_id='"+bermudaTriangle._base_id+"']").clone()).append(_Q("#group_farmer_ [base_id='']").clone());
			_Q('#group_farmer1').empty().append(_Q("#group_farmer1_ [base_id='"+bermudaTriangle._base_id+"']").clone()).append(_Q("#group_farmer1_ [base_id='']").clone());
		}
		nonecheck();
		if (bermudaTriangle._group_parent_id > 0) {
			_Q("#group_parent_id").val(
					bermudaTriangle._group_parent_id);
			_Q("#group_parent_id_default").val(
					bermudaTriangle._group_parent_id);
			_Q("#group_parent_id").selectpicker('refresh');
		} else {
			_Q("#group_parent_id")[0].selectedIndex = 0;
			_Q("#group_parent_id_default").val(0);
			_Q("#group_parent_id").selectpicker('refresh');
		}
		setSelection(bermudaTriangle);
		_Q(".list1").hide();
		_Q("#divtittle").html("<a class='jumpToInfo' href='"+ workpath+ "/map/PartitionInfo.seam?tnnelId="+ bermudaTriangle._id
								+ "&partId="+ bermudaTriangle._group_parent_id+ "&baseId="+ bermudaTriangle._base_id+ "'>" + bermudaTriangle._name+ "</a>");
		_Q("#tunnelInfo").show();
		if (!_Q("#rightPane").width()) {
			_Q(obj).removeClass().addClass(
					"splitbuttonV invert");
			_Q('#rightPane').css("width", "350px");
			_Q('#CenterAndRight').trigger('resize');
		}
		_Q("#group_base_id").val(bermudaTriangle._base_id);
		_Q("#group_x").val(bermudaTriangle.group_x);
		_Q("#group_y").val(bermudaTriangle.group_y);
		_Q("#group_name").val(bermudaTriangle._name);
		_Q(".group_name_2").html(bermudaTriangle._name);
		_Q("#group_id").val(bermudaTriangle._id);
		_Q("#group_parent_id").val(
				bermudaTriangle._group_parent_id);
		_Q(".group_parent_id_2").html(_Q("#group_parent_id option[value='"+bermudaTriangle._group_parent_id+"']").html());
		_Q("#group_index").val(bermudaTriangle._index);
		_Q("#group_group").val(bermudaTriangle._group);
		_Q("#group_area").val(bermudaTriangle.mianji);
		_Q(".muarea_2").html(bermudaTriangle._muarea+"");
		_Q("#group_area_hidden").text(
				"/" + bermudaTriangle.mianji + "亩");
		_Q("#group_type").val(bermudaTriangle._group_type);
		_Q("#muarea").val(bermudaTriangle._muarea);
		var centerpoint = new google.maps.LatLng(parseFloat(bermudaTriangle.group_x),parseFloat(bermudaTriangle.group_y));
		map.setCenter(centerpoint);
		map.setZoom(19);

		if (bermudaTriangle._group_type == 8) {
			_Q(".animal_hide").show();
			_Q(".plant_hide").hide();
            _Q('#group_groupId').val(bermudaTriangle._tunnel_group_id);
			_Q('#group_farmer2').val(bermudaTriangle._keeperId);
			_Q('#group_farmer3').val(bermudaTriangle._masterId);
			_Q("#group_farmer2").selectpicker('refresh');
			_Q("#group_farmer3").selectpicker('refresh');
            _Q("#group_groupId").selectpicker('refresh');

			var animal_html = '';
			for (var i = 0; i < animalStr.length; i++) {
				var obj_ = animalStr[i];
				if (obj_[3] == bermudaTriangle._id) {
					animal_html += '<li class="breedList_link"><div class="breedPic"><span class="zhezhaoImg"><img src="'
							+ obj_[2]
							+ '" /></span></div><p class="breedText">'
							+ obj_[1] + '</p></li>'
				}
			}
			if (animal_html != '') {
				_Q(".breedList").empty();
				_Q(".breedList").append(animal_html);
				_Q(".noneani").hide();
			} else {
				_Q(".breedList").empty();
				_Q(".noneani").show();
			}
		} else {
			_Q(".animal_hide").hide();
			_Q(".plant_hide").show();
			_Q('#group_groupId').val(bermudaTriangle._tunnel_group_id);
			_Q('#group_farmer').val(bermudaTriangle._keeperId);
			_Q('#group_farmer1').val(bermudaTriangle._masterId);
			_Q("#group_farmer").selectpicker('refresh');
			_Q("#group_farmer1").selectpicker('refresh');
			_Q("#group_groupId").selectpicker('refresh');

			var html0 = "";
			if (lastStr != null) {
				var arr_ = eval("lastStr." + "tunnel"
						+ bermudaTriangle._id);
				if (arr_ != null) {
					for (var i = 0; i < arr_.length; i++) {
						var obj = arr_[i];
						var tempsrc = obj.imground;
						if (tempsrc == "")
							tempsrc = nonesrc;
						else
							tempsrc += "@60h_60w|60-1ci.png";
						html0 += '<div class="rteic"  onclick="editHisPlant('+ obj.real_plant_id+ ')" style="height:80px"><img  style="cursor:pointer" width="53" height="53" src="'
								+ workpath+ '/asset/images/image_b3.png" class="rtpic" />'+ '<img width="53" height="53" src="'
								+ tempsrc+ '" class="rtimg" /><div class="ritex">'+ obj.breed_name+ '<input type="hidden" value="'
								+ obj.breed_id+ '" class="obj_breed_id"></input><input type="hidden" value="'+ obj.crop_area
								+ '" class="obj_crop_area"></input></div>'+ '<div class="rtehov" style="display: none;">'+ '<a href="#3" onclick="editHisPlant('
								+ obj.real_plant_id+ ')" style=" position: absolute; bottom:0; right:0; top:-2px; left:-2px; z-index:103; display:block;"><img width="56" height="58" src="'
								+ workpath+ '/asset/images/hover.png"></a>'
								+ '<a href="#2" onclick="deleteHisPlantSelf('+ obj.real_plant_id+ ',this,'+ bermudaTriangle._id
								+ ')" class="rholli"><img width="18" height="18" src="'+ workpath+ '/asset/images/clo_03.png"></a>'+ '</div></div>';
					}
				}
			}
			if (isEdit) {
				html0 += '<div class="rteic" ><div class="imgBox" style="cursor:pointer" onclick="addPlant(0)"><img src="'
						+ workpath
						+ '/asset/images/plus.png" style="padding-top:1px"/></div></div>';
				html0 += '<div class="clear"></div>';
			}
			_Q(".hislist").empty();
			_Q(".hislist").append(html0);
			var html = "";
			for (var i = 0; i < realPlantJson.length; i++) {
				var obj = realPlantJson[i];
				if (obj.tunnel_info_id == bermudaTriangle._id) {
					var t1 = new Date(obj.start_time.replace(
							"-", "/").replace("-", "/"));
					if (t1.getTime() > nowD_.getTime())
						continue;
					var t2 = new Date(obj.end_time.replace("-",
							"/").replace("-", "/"));
					if (t2.getTime() < nowD_.getTime())
						continue;
					var tempsrc = obj.imground;
					if (tempsrc == "")
						tempsrc = nonesrc;
					else 
						tempsrc += "@60h_60w|60-1ci.png";
					html += '<div class="rteic"  onclick="editPlant('+ obj.real_plant_id
							+ ')" style="height:80px"><img  style="cursor:pointer" width="53" height="53" src="'
							+ workpath+ '/asset/images/image_b3.png" class="rtpic" />'
							+ '<img width="53" height="53" src="'+ tempsrc+ '" class="rtimg" /><div class="ritex">'+ obj.breed_name
							+ '<input type="hidden" value="'+ obj.breed_id+ '" class="obj_breed_id"></input><input type="hidden" value="'+ obj.crop_area
							+ '" class="obj_crop_area"></input></div>'+ '<div class="rtehov" style="display: none;">'+ '<a href="#3" onclick="editPlant('+ obj.real_plant_id
							+ ')" style=" position: absolute; bottom:0; right:0; top:-2px; left:-2px; z-index:103; display:block;"><img width="56" height="58" src="'
							+ workpath+ '/asset/images/hover.png"></a>'+ '<a href="#2" onclick="deletePlantSelf('+ obj.real_plant_id+ ',this,'
							+ bermudaTriangle._id+ ')" class="rholli"><img width="18" height="18" src="'+ workpath+ '/asset/images/clo_03.png"></a>'+ '</div></div>';
				}
			}
			if (isEdit) {
				html += '<div class="rteic" ><div class="imgBox" style="cursor:pointer" onclick="addPlant(1)"><img src="'
						+ workpath
						+ '/asset/images/plus.png" style="padding-top:1px"/></div></div>';
				html += '<div class="clear"></div>';
			}
			_Q(".realplantlist").empty();
			_Q(".realplantlist").append(html);

			var html2 = "";
			for (var i = 0; i < realPlantJson.length; i++) {
				var obj = realPlantJson[i];
				if (obj.tunnel_info_id == bermudaTriangle._id) {
					var t1 = new Date(obj.start_time.replace(
							"-", "/").replace("-", "/"));
					if (t1.getTime() <= nowD_.getTime())
						continue;
					var tempsrc = obj.imgsquare;
					if (tempsrc == "")
						tempsrc = nonesrc;
					else
						tempsrc += "@60h_60w|60-1ci.png";
					html2 += '<div class="rteic"  onclick="editPlant('+ obj.real_plant_id+ ')" style="height:80px"><img  style="cursor:pointer" width="53" height="53" src="'
							+ workpath+ '/asset/images/image_b3.png" class="rtpic" />'+ '<img width="53" height="53" src="'
							+ tempsrc+ '" class="rtimg" /><div class="ritex">'+ obj.breed_name+ '</div>'+ '<div class="rtehov" style="display: none;">'
							+ '<a href="#3" onclick="editPlant('+ obj.real_plant_id
							+ ')" style=" position: absolute; bottom:0; right:0; top:-2px; left:-2px; z-index:103; display:block;"><img width="56" height="58" src="'
							+ workpath+ '/asset/images/hover.png"></a>'+ '<a href="#2" onclick="deletePlantSelf('
							+ obj.real_plant_id+ ',this,'+ bermudaTriangle._id+ ')" class="rholli"><img width="18" height="18" src="'
							+ workpath+ '/asset/images/clo_03.png"></a>'+ '</div></div>';

				}
			}
			if (isEdit) {
				html2 += '<div class="rteic" ><div class="imgBox" style="cursor:pointer" onclick="addPlant(2)"><img src="'
						+ workpath
						+ '/asset/images/plus.png" style="padding-top:1px"/></div></div>';
				html2 += '<div class="clear"></div>';
			}
			_Q(".apslist").empty();
			_Q(".apslist").append(html2);

			var temArray = new Array();
			var temStr = "";
			for (var i = 0; i < useStr.length; i++) {
				var obj = useStr[i];
				if (obj[0] == bermudaTriangle._id) {
					if (temArray.length == 3)
						break;
					temArray.push(obj);
					var ty1 = _Q("#type21 li[aa='" + obj[4] + "']").attr("bb");
					var ty2 = _Q("#type20 li[aa='" + obj[5] + "']").attr("bb");
					temStr += "<li class='"
						+ (i > 0 ? "0" + (i + 1) : "")+(temArray.length==2?" histroyJl_date02":"")+(temArray.length==3?" histroyJl_date03":"")
						+ "'><span>" + obj[2] + "-"
						+ obj[3] + "</span><div style='width:160px;height:28px;overflow:hidden' title='"+ty1+" "+ty2+"'><em>" + ty1 +" "
						+ ty2 + "</em></div></li>";
				}
			}
			if (temArray.length > 0) {
				if (temArray.length == 1) {
					_Q(".bg_landHistory02").attr("class","bg_landHistory02 landH1");
				} else if (temArray.length == 2) {
					_Q(".bg_landHistory02").attr("class","bg_landHistory02 landH2");
				} else if (temArray.length == 3) {
					_Q(".bg_landHistory02").attr("class","bg_landHistory02 landH3");
				}
				_Q(".landHistory_list").empty().append(temStr);
				_Q(".shiy").show();
			} else {
				_Q(".bg_landHistory02").attr("class",
						"bg_landHistory02 landH1");
				temStr = "<li class=''><span>"+ (new Date().getFullYear())+ "-"+ (new Date().getFullYear())
						+ "</span><div><em>暂无数据</em><em class='colorGrn02'></em></div></li>";
				_Q(".landHistory_list").empty().append(temStr);
				_Q(".shiy").show();
			}

			if (tesStr.length == 0) {
				_Q(".jiance_mechanism").html("检测机构：暂无数据");
				_Q(".jiance_date").html("检测日期：暂无数据");
				_Q(".ph").html("--");
				_Q(".ph1").show();
				_Q(".ec").html("--");
				_Q(".ec1").show();
				_Q(".pb").html("--");
				_Q(".pb").show();
				_Q(".jilu").show();
			} else
				for (var i = 0; i < tesStr.length; i++) {
					var obj = tesStr[i];
					if (obj[0] == bermudaTriangle._id) {
						_Q(".jiance_mechanism").html(
								"检测机构：" + obj[3]);
						_Q(".jiance_date").html(
								"检测日期：" + obj[2]);
						if (obj[4] != "") {
							_Q(".ph").html(obj[4]);
							_Q(".ph1").show();
						} else {
							_Q(".ph").html("--");
							_Q(".ph1").show();
						}
						if (obj[5] != "") {
							_Q(".ec").html(obj[5]);
							_Q(".ec1").show();
						} else {
							_Q(".ec").html("--");
							_Q(".ec1").show();
						}
						if (obj[6] != "") {
							_Q(".pb").html(obj[6]);
							_Q(".pb").show();
						} else {
							_Q(".pb").html("--");
							_Q(".pb").show();
						}
						_Q(".jilu").show();
						break;
					} else if (i == tesStr.length - 1) {
						_Q(".jiance_mechanism").html(
								"检测机构：暂无数据");
						_Q(".jiance_date").html("检测日期：暂无数据");
						_Q(".ph").html("--");
						_Q(".ph1").show();
						_Q(".ec").html("--");
						_Q(".ec1").show();
						_Q(".pb").html("--");
						_Q(".pb").show();
						_Q(".jilu").show();
					}
				}
		}

		if (bermudaTriangle._group_type < 5 && false)
			_Q(".firstblock").show();
		else
			_Q(".firstblock").hide();
		_Q("#groupFormColor").val(bermudaTriangle.get("fillColor"));
		_Q("#tunnel_color").css("background-color", bermudaTriangle.get("fillColor"));
		//setMapNull();
	});
	var uss;
	var isrc = "";
	var tempb = false;
	var lat = bermudaTriangle.group_x;
	var lng = bermudaTriangle.group_y;
	var left = new google.maps.LatLng(lat + 0.0000422, lng + 0.000055);
	var right = new google.maps.LatLng(lat - 0.000042, lng - 0.000055);
	var bounds2 = new google.maps.LatLngBounds(right, left);
	if (bermudaTriangle._group_type == 8) {
		isrc = animalsrc;
		var tt = 0;
		for (var i = 0; i < animalStr.length; i++) {
			var obj_ = animalStr[i];
			if (obj_[3] == bermudaTriangle._id) {
				tt += 1;
				isrc = obj_[2];
				if (isrc == null || isrc == '' || isrc == "null") {
					isrc = animalsrc;
				}else{
					isrc += "@60h_60w|60-1ci.png";
				}
			}
			if(tt>2)
				break;
		}
		if (tt > 1) {
			isrc = moreanimal;
		}
	} else {

		var nowPlant = [];
		var willPlant = [];
		var oneb = false;
		var twob = false;
		var willoneb = false;
		var willtwob = false;
		for (var i = 0; i < realPlantJson.length; i++) {
			var rp = realPlantJson[i];
			if (rp.tunnel_info_id ==  bermudaTriangle._id) {
				var t1 = new Date(rp.start_time.replace("-","/").replace("-","/"));
				var t2 = new Date(rp.end_time.replace("-","/").replace("-","/"));
				if (t1.getTime() <= nowD_.getTime() && t2.getTime() >= nowD_.getTime()){
					if(rp.floristics_type == null || rp.floristics_type == 1)
						oneb = true;
					else if(rp.floristics_type == 2)
						twob = true;
					nowPlant.push(rp);
				}else if(t1.getTime()>nowD_.getTime()){
					if(rp.floristics_type == null || rp.floristics_type == 1)
						willoneb = true;
					else if(rp.floristics_type == 2)
						willtwob = true;
					willPlant.push(rp);
				}
				
			}
		}

		if (nowPlant.length == 0) {
			isrc = nonesrc;
			if (willPlant.length == 1) {
				if (willPlant[0].imground == "")
					isrc = nonesrc;
				else
					isrc = willPlant[0].imground+"@60h_60w|60-1ci.png";
			} else if (willPlant.length > 1) {
				if(willtwob){
					if(willoneb)
						isrc = oneimg;
					else
						isrc = twoimg;
				}else 
					isrc = moresrc;
			}
			if (isrc != nonesrc)
				tempb = true;
		} else if (nowPlant.length == 1) {
			if(nowPlant[0].imground == ""){
				isrc = nonesrc;
			}else{
				isrc = nowPlant[0].imground+"@60h_60w|60-1ci.png";
			}
		} else {
			if(twob){
				if(oneb)
					isrc = oneimg;
				else
					isrc = twoimg;
			}else 
				isrc = moresrc;
		}
		willPlant = null;
		nowPlant = null;
	}

	usgs = new USGSOverlay(bounds2, isrc, map, bermudaTriangle, tempb);
	bermudaTriangle._usgs = usgs;

}

// 加载描点第二部
function attachSecretMessage(marker, array) {
	var contentString = "<div style='width:200px'>" + array.name + "<br/>联系人:"
			+ array.contact + "<br/>电话:" + array.entPhone + "<br/>地址:"
			+ array.address + "<br/>描述:" + array.description + "</div>";
	var infowindow = new google.maps.InfoWindow({
		content : contentString,
		maxWidth : 400,
		disableAutoPan : true
	});
	marker._infowindow = infowindow;
	google.maps.event.addListener(marker, 'click', function() {
		return;
		getWeatherReport(marker._id);
		_Q(".cm_name").html(array.name);
		_Q(".cm_name").attr("title",array.name);
		if (marker._ploygon) {
			_Q(".fl_concat").html("" + marker._ploygon._contact);
			_Q(".fl_concat").attr("title",marker._ploygon._contact);
			_Q(".phone").html("" + marker._ploygon._phone);
			_Q(".phone").attr("title",marker._ploygon._phone);
			_Q(".cm_address").html("" + marker._ploygon._address);
			_Q(".cm_address").attr("title",marker._ploygon._address);
			_Q(".cm_mark").html("描述：" + marker._ploygon._description);
			_Q(".cm_mark").attr("title",marker._ploygon._description);
			if (marker._imgUrl && marker._imgUrl != "")
				_Q("#baseurl").attr("src", marker._imgUrl);
			else
				_Q("#baseurl").attr("src", _Q("#baseurl").attr("aa"));
		} else {
			_Q(".fl_concat").html("");
			_Q(".fl_concat").removeAttr("title");
			_Q(".phone").html("");
			_Q(".phone").removeAttr("title");
			_Q(".cm_address").html("");
			_Q(".cm_address").removeAttr("title");
			_Q(".cm_mark").html("描述：");
			_Q(".cm_mark").removeAttr("title");
			_Q("#baseurl").attr("src", _Q("#baseurl").attr("aa"));
		}
		_Q("#dropdown-menu2 li:eq(0)").unbind("click");
		_Q("#dropdown-menu2 li:eq(0)").click(function() {
			if (marker._ploygon) {
				marker._ploygon.ondblclick();
			} else {
				editMark(index);
			}
			closeCm();
		});
		_Q("#dropdown-menu2 li:eq(1)").unbind("click");
		_Q("#dropdown-menu2 li:eq(1)").click(function() {
			movetype = 1;
			movemarker(marker);
			closeCm();
		});
		_Q("#dropdown-menu2 li:eq(2)").unbind("click");
		_Q("#dropdown-menu2 li:eq(2)").click(function() {
			movemarker(marker);
			movetype = 2;
			closeCm();
		});

		_Q('#login4').show();
		_Q(".farmIntroPop").show();
		_Q("#dropdown-menu2").hide();
		_Q(".farmIntroPop").css("left",
				_Q('#login4').width() / 2 - 320 / 2 );
		_Q(".farmIntroPop").css("top",
				_Q("#mPane").height() / 2 - _Q(".farmIntroPop").height() - 61);
		map.setCenter(marker.getPosition());
		if(typeof(marker._ploygon) != "undefined"){
	    	map.setZoom(marker._ploygon._zoom);
	    }else{
	    	map.setZoom(16);
	    }
	});
}

function che() {
	var val = _Q("#muarea").val();
	if(isNaN(val)){
		alert("请填写正确的亩数!");
		return false;
	}
	
    if(_Q("#group_name").val().length>45){
        alert("区域名称长度不能超过45个字符!");
		return false;
	}
	
	if (_Q("#group_name").val() == "") {
		alert("请填写区域名称!");
		return false;
	} else {
		return true;
	}
}
// 大棚编辑完成
function group_ok() {
	var polygon;
	var temp_group_id = _Q("#group_index").val();
	for (var i = 0; i < mark3Array.length; i++) {
		polygon = mark3Array[i];
		if (polygon._index == temp_group_id) {
			polygon._name = _Q("#group_name").val();
			polygon._id = _Q("#group_id").val();
			polygon._group_parent_id = _Q("#group_parent_id").val();
			polygon._index = _Q("#group_index").val();
			polygon._group = _Q("#group_group").val();
			polygon.mianji = _Q("#group_area").val();
			polygon._muarea = _Q("#muarea").val();
			polygon._group_type = _Q("#group_type").val();
            polygon._tunnel_group_id = _Q('#group_groupId').val();
			if(_Q("#group_type").val()==8){
				polygon._keeperId=_Q("#group_farmer2").val();
				polygon._masterId=_Q("#group_farmer3").val();
			}else{
				polygon._keeperId=_Q("#group_farmer").val();
				polygon._masterId=_Q("#group_farmer1").val();
			}
			polygon.set("fillColor", _Q("input[name='groupFormColor']").val());
			polygon
					.set("strokeColor", _Q("input[name='groupFormColor']")
							.val());
			break;
		}
	}
	_Q("#rightPane").css("z-index","1");
	_Q("#login4").trigger("click");
	var array = polygon.getPath().getArray();
	var bounds = new google.maps.LatLngBounds();
	for (i = 0; i < array.length; i++) {
		bounds.extend(array[i]);
	}

	var uss = polygon._usgs;
	var lat = polygon.group_x;
	var lng = polygon.group_y;
	var left = new google.maps.LatLng(lat + 0.0000422, lng + 0.000055);
	var right = new google.maps.LatLng(lat - 0.000042, lng - 0.000055);
	var bounds2 = new google.maps.LatLngBounds(right, left);
	var isrc = "";
	var tempb = false;
	
	
	if (polygon._group_type == 8) {
		isrc = animalsrc;
		var tt = 0;
		for (var i = 0; i < animalStr.length; i++) {
			var obj_ = animalStr[i];
			if (obj_[3] == polygon._id) {
				tt += 1;
				isrc = obj_[2];
				if (isrc == null || isrc == '' || isrc == "null") {
					isrc = animalsrc;
				}
			}
			if(tt>2)
				break;
		}
		if (tt > 1) {
			isrc = moreanimal;
		}
	} else {
		var nowPlant = [];
		var willPlant = [];
		var oneb = false;
		var twob = false;
		var willoneb = false;
		var willtwob = false;
		for (var i = 0; i < realPlantJson.length; i++) {
			var rp = realPlantJson[i];
			if (rp.tunnel_info_id ==  polygon._id) {
				var t1 = new Date(rp.start_time.replace("-","/").replace("-","/"));
				var t2 = new Date(rp.end_time.replace("-","/").replace("-","/"));
				if (t1.getTime() <= nowD_.getTime() && t2.getTime() >= nowD_.getTime()){
					if(rp.floristics_type == null || rp.floristics_type == 1)
						oneb = true;
					else if(rp.floristics_type == 2)
						twob = true;
					nowPlant.push(rp);
				}else if(t1.getTime()>nowD_.getTime()){
					if(rp.floristics_type == null || rp.floristics_type == 1)
						willoneb = true;
					else if(rp.floristics_type == 2)
						willtwob = true;
					willPlant.push(rp);
				}
			}
		}

		if (nowPlant.length == 0) {
			isrc = nonesrc;
			if (willPlant.length == 1) {
				if (willPlant[0].imground == "")
					isrc = nonesrc;
				else
					isrc = willPlant[0].imground+"@60h_60w|60-1ci.png";
			} else if (willPlant.length > 1) {
				if(willtwob){
					if(willoneb)
						isrc = oneimg;
					else
						isrc = twoimg;
				}else 
					isrc = moresrc;
			}
			if (isrc != nonesrc)
				tempb = true;
		} else if (nowPlant.length == 1) {
			if(nowPlant[0].imground == ""){
				isrc = nonesrc;
			}else{
				isrc = nowPlant[0].imground+"@60h_60w|60-1ci.png";
			}
		} else {
			if(twob){
				if(oneb)
					isrc = oneimg;
				else
					isrc = twoimg;
			}else 
				isrc = moresrc;
		}
		willPlant = null;
		nowPlant = null;
		
	}
	
	if (uss)
		uss.setMap(null);
	var usgss = new USGSOverlay(bounds2, isrc, map, polygon, tempb);
	polygon._usgs = usgss;

	clearSelection();
	setMapNotNull();
	g_infowindow.setMap(null);
	if (ret == 2) {
		group_back();
		return;
	}
	_Q(".splitbuttonV").attr("class", "splitbuttonV");
	var wait = setInterval(function() {
		if (_Q('#rightPane').width() - 50 <= 0) {
			_Q('#rightPane').css('width', 0);
			clearInterval(wait);
		} else {
			_Q('#rightPane').css('width',
					_Q('#rightPane').width() - 50);
		}
		_Q('#CenterAndRight').trigger('resize');
	}, 10);
}
// 取消大棚编辑
function group_no() {
	_Q("#rightPane").css("z-index","1");
	_Q("#login4").trigger("click");
	g_infowindow.setMap(null);
	_Q(".list1").hide();
	_Q(".tc_top_05").show();
	_Q(".erbox3").show();
	clearSelection();
	setMapNotNull();
}

// 四舍五入
function CurrencyFormatted(amount) {
	var i = parseFloat(amount);
	if (isNaN(i)) {
		i = 0.00;
	}
	var minus = '';
	if (i < 0) {
		minus = '-';
	}
	i = Math.abs(i);
	i = parseInt((i + .005) * 100);
	i = i / 100;
	s = new String(i);
	if (s.indexOf('.') < 0) {
		s += '.00';
	}
	if (s.indexOf('.') == (s.length - 2)) {
		s += '0';
	}
	s = minus + s;
	return s;
}
// 取消marker和infowindow的显示
function setMapNull() {
	for (var i = 0; i < mark1Array.length; i++) {
		var polygon = mark1Array[i];
		var marker = polygon._marker;
		marker.setMap(null);
	}
	for (var i = 0; i < mark2Array.length; i++) {
		var ploygon = mark2Array[i];
		var marker = ploygon._marker;
		if (marker)
			marker.setMap(null);
	}
}
// marker和infowindow的显示
function setMapNotNull() {
	for (var i = 0; i < mark1Array.length; i++) {
		var polygon = mark1Array[i];
		var marker = polygon._marker;
		marker.setMap(map);
	}
	for (var i = 0; i < mark2Array.length; i++) {
		var ploygon = mark2Array[i];
		var marker = ploygon._marker;
		if (marker)
			marker.setMap(map);
	}
}

function radio1(obj) {
	if (obj.value == 0) {
		_Q(".typ1").show();
		_Q(".typ2").hide();
		_Q("#prompt2").html("");
	} else if (obj.value == 1) {
		_Q(".typ1").show();
		_Q(".typ2").hide();
		_Q("#prompt2").html("");

	} else if (obj.value == 2) {
		_Q(".typ2").show();
		_Q(".typ1").hide();
		_Q("#prompt").html("");
	}
	_Q("#prompt").html("");
}
// String的endwith方法
String.prototype.endWith = function(str) {
	if (str == null || str == "" || this.length == 0
			|| str.length > this.length)
		return false;
	if (this.substring(this.length - str.length) == str)
		return true;
	else
		return false;
	return true;
};

// String的startwith方法
String.prototype.startWith = function(str) {
	if (str == null || str == "" || this.length == 0
			|| str.length > this.length)
		return false;
	if (this.substr(0, str.length) == str)
		return true;
	else
		return false;
	return true;
};
//大棚中间的图片
function USGSOverlay(bounds, image, map, obj, tempb) {
	this.parents = obj;
	this.bounds_ = bounds;
	this.image_ = image;
	this.map_ = map;
	this.div_ = null;
	this.tempb_ = tempb;
	this.setMap(map);
}
USGSOverlay.prototype = new google.maps.OverlayView();
USGSOverlay.prototype.onAdd = function() {
	var div = document.createElement('div');
	div.style.border = 'none';
	div.style.index = "888";
	div.style.zIndex = "888";
	div.style.borderWidth = '0px';
	div.style.position = 'absolute';
	var img = document.createElement('img');
	img.src = this.image_;
	img.style.width = '100%';
	img.style.height = '100%';
	img.style.position = "absolute";
	var img2 = document.createElement('img');
	img2.src = workpath + "/asset/images/touming.png";
	img2.style.position = "absolute";
	img2.style.width = '100%';
	img2.style.height = '100%';
	div.appendChild(img);
	if (this.tempb_)
		div.appendChild(img2);
	this.div_ = div;
	var panes = this.getPanes();
	panes.overlayImage.appendChild(this.div_);
	var _self = this;
	google.maps.event.addDomListener(this.div_, 'click', function(event) {//图片双击时间
		map.setZoom(19);
		var centerpoint = new google.maps.LatLng(parseFloat(_self.parents.group_x),parseFloat(_self.parents.group_y));
		map.setCenter(centerpoint);
		showInfos2(_self,event);
		setTimeout(function() {
			setSelection(_self.parents);
		}, 500);
	});
};
USGSOverlay.prototype.draw = function() {
	var overlayProjection = this.getProjection();
	var sw = overlayProjection
			.fromLatLngToDivPixel(this.bounds_.getSouthWest());
	var ne = overlayProjection
			.fromLatLngToDivPixel(this.bounds_.getNorthEast());
	var div = this.div_;
	div.style.left = sw.x + 'px';
	div.style.top = ne.y + 'px';
	div.style.width = (ne.x - sw.x) + 'px';
	div.style.height = (sw.y - ne.y) + 'px';
};
USGSOverlay.prototype.onRemove = function() {
	this.div_.parentNode.removeChild(this.div_);
};
USGSOverlay.prototype.hide = function() {
	if (this.div_) {
		this.div_.style.visibility = 'hidden';
	}
};
USGSOverlay.prototype.show = function() {
	if (this.div_) {
		this.div_.style.visibility = 'visible';
	}
};
USGSOverlay.prototype.toggle = function() {
	if (this.div_) {
		if (this.div_.style.visibility == 'hidden') {
			this.show();
		} else {
			this.hide();
		}
	}
};
USGSOverlay.prototype.toggleDOM = function() {
	if (this.getMap()) {
		this.setMap(null);
	} else {
		this.setMap(this.map_);
	}
};

function closeNotPlant(){
	_Q(".notPlant").hide();
	_Q('#login4').hide();
}

function closeOnePlant(){
	_Q(".onePlant").hide();
	_Q('#login4').hide();
}

//双击大棚图片中央的弹出框
function showInfos2 (obj,event){
	_Q(".onePlant").hide();
	_Q(".notPlant").hide();
	//gotoMap(obj.parents._id, event);
	var box_title = "";
	var box_plant = "";
	var muarea = "";
	var box_area = "";
	var box_image = "";
	var box_content = "";
	var b = true;
	var _obj_;
	var temp = [];
	var tlength = 0;
	if(obj.parents._group_type == 8){//畜牧
		var tt = 0;
		var isrc = addanimalsrc;
		for (var i = 0; i < animalStr.length; i++) {
			var obj_ = animalStr[i];
			if (obj_[3] == obj.parents._id) {
				tt += 1;
				isrc = obj_[2];
				if (isrc == null || isrc == '' || isrc == "null") {
					isrc = addanimalsrc;
				}
			}
			if(tt>2)
				break;
		}
		if (tt > 1) {
			isrc = moreanimal;
		}
		var master = "";
		var mast = _Q("#group_farmer3 option[value='" + obj.parents._masterId
				+ "']");
		if (mast.length > 0) {
			master = mast.html();
		}
		
		if (tt == 0) {
			box_title = obj.parents._name;
			box_plant = "";
			box_area = obj.parents.mianji;
			box_image = addanimalsrc;
			box_content = "暂无养殖";
			_Q(".zw_bgt2").css("cursor", "default");
			_Q(".zw_bgt2").attr("onclick", "");
			b = false;
			_Q(".win_date_1,.win_date_2").hide();
		} else if (tt == 1) {
			box_title = obj.parents._name;
			box_area = obj.parents.mianji;
			box_image = isrc;
			if (box_image == "")
				box_image = nonesrc;
			_Q(".win_date_1,.win_date_2").show();
			//_Q(".zw_bgt2").attr("onclick", "addPlant()");
			_Q(".zw_bgt2").css("cursor", "default");
		} else if (tt > 1) {
			box_title = obj.parents._name;
			box_area = obj.parents.mianji;
			box_plant = "多牲畜";
			box_image = isrc;
			//_Q(".zw_bgt2").attr("onclick", "addPlant()");
			_Q(".zw_bgt2").css("cursor", "default");
			_Q(".win_date_1,.win_date_2").hide();
		}
		box_area = parseFloat(box_area).toFixed(2);
		_Q(".win_masterId").html("负责人:" + master);
		_Q(".div_dt2").html(box_title);
		_Q(".div_dt4").html(box_plant);
		_Q(".div_dt3").html(box_area + "亩");
		_Q(".zw_libg_img2").attr("src", box_image);
		// _Q(".div_dt55").html(box_content);
		var content = _Q(".div_width").html();
		if (b) {
			content = content.replace("addPlant", "nothing");
		} else {
			content = content.replace("nothing", "addPlant");
		}
		g_infowindow.set("content", content);
		g_infowindow.setPosition(obj.bounds_.getCenter());
		g_infowindow.set("maxWidth", 242);
		g_infowindow.setMap(map);
		setTimeout(function() {
			xa();
		}, 10);
		setTimeout(function() {
			hove();
		}, 10);
		
	}else{
		var nowPlant = [];
		for (var i = 0; i < realPlantJson.length; i++) {
			var rp = realPlantJson[i];
			if (rp.tunnel_info_id ==  obj.parents._id) {
				var t1 = new Date(rp.start_time.replace("-","/").replace("-","/"));
				var t2 = new Date(rp.end_time.replace("-","/").replace("-","/"));
				if (t1.getTime() <= nowD_.getTime() && t2.getTime() >= nowD_.getTime()){
					nowPlant.push(rp);
				}
			}
		}
		
		var mast = _Q("#group_farmer1_ option[value='" + obj.parents._masterId
				+ "']");
		var master = "暂无数据";
		if (mast.length > 0) {
			master = mast.html();
		}
		
		var kee = _Q("#group_farmer_ option[value='" + obj.parents._keeperId
				+ "']");
		var keeper = "暂无数据";
		if (kee.length > 0) {
			keeper = kee.html();
		}
		if (nowPlant.length == 0) {//没有种植
			_Q(".notPlant .introPop-header-title h3").html(obj.parents._name);
			_Q(".notPlant .introPop-header-title em").html("种植管理员 "+master);
			_Q(".notPlant .introPop-header-rt .farmer").html(keeper);
			box_area = obj.parents.mianji;
			box_area = parseFloat(box_area).toFixed(2);
			muarea = obj.parents._muarea;
			muarea = parseFloat(muarea).toFixed(2);
			_Q(".notPlant .introPop-header-rt .farmland").html(muarea+"亩/"+box_area+"亩");
			
			if (tesStr.length == 0) {
				_Q(".jiance_mechanism").html("检测机构：暂无数据");
				_Q(".jiance_date").html("检测日期：暂无数据");
				_Q(".ph").html("--");
				_Q(".ph1").show();
				_Q(".ec").html("--");
				_Q(".ec1").show();
				_Q(".pb").html("--");
				_Q(".pb").show();
				_Q(".jilu").show();
			} else
				for (var i = 0; i < tesStr.length; i++) {
					var obj_ = tesStr[i];
					if (obj_[0] == obj.parents._id) {
						_Q(".jiance_mechanism").html(
								"检测机构：" + obj_[3]);
						_Q(".jiance_date").html(
								"检测日期：" + obj_[2]);
						if (obj_[4] != "") {
							_Q(".ph").html(obj_[4]);
						} else {
							_Q(".ph").html("--");
						}
						if (obj_[5] != "") {
							_Q(".ec").html(obj_[5]);
						} else {
							_Q(".ec").html("--");
						}
						if (obj_[6] != "") {
							_Q(".pb").html(obj_[6]);
						} else {
							_Q(".pb").html("--");
						}
						_Q(".jilu").show();
						break;
					} else if (i == tesStr.length - 1) {
						_Q(".jiance_mechanism").html(
								"检测机构：暂无数据");
						_Q(".jiance_date").html("检测日期：暂无数据");
						_Q(".ph").html("--");
						_Q(".ec").html("--");
						_Q(".pb").html("--");
						_Q(".jilu").show();
					}
				}
			var temArray = new Array();
			var temStr = "";
			for (var i = 0; i < useStr.length; i++) {
				var obj_ = useStr[i];
				if (obj_[0] == obj.parents._id) {
					if (temArray.length == 3)
						break;
					temArray.push(obj_);
					var ty1 = _Q(
							"#type21 li[aa='" + obj_[4] + "']")
							.attr("bb");
					var ty2 = _Q(
							"#type20 li[aa='" + obj_[5] + "']")
							.attr("bb");
					temStr += "<li class='"
							+ (i > 0 ? "0" + (i + 1) : "")+(temArray.length==2?" histroyJl_date02":"")+(temArray.length==3?" histroyJl_date03":"")
							+ "'><span>" + obj_[2] + "-"
							+ obj_[3] + "</span><div style='width:116px;height:28px;overflow:hidden' title='"+ty1+" "+ty2+"'><em>" + ty1 +" "
							+ ty2 + "</em></div></li>";
				}
			}
			if (temArray.length > 0) {
				if (temArray.length == 1) {
					_Q(".bg_landHistory02").attr("class",
							"bg_landHistory02 landH1");
				} else if (temArray.length == 2) {
					_Q(".bg_landHistory02").attr("class",
							"bg_landHistory02 landH2");
				} else if (temArray.length == 3) {
					_Q(".bg_landHistory02").attr("class",
							"bg_landHistory02 landH3");
				}
				_Q(".notPlant .landHistory_list").empty().append(temStr);
				_Q(".shiy").show();
			} else {
				_Q(".bg_landHistory02").attr("class",
						"bg_landHistory02 landH1");
				temStr = "<li class=''><span>"
						+ (new Date().getFullYear())
						+ "-"
						+ (new Date().getFullYear())
						+ "</span><div><em>暂无数据</em><em class='colorGrn02'></em></div></li>";
				_Q(".notPlant .landHistory_list").empty().append(temStr);
				_Q(".shiy").show();
			}
			_Q('#login4').show();
    		_Q(".notPlant").show();
    		_Q(".notPlant").css("left",_Q('#login4').width()/2-_Q(".notPlant").width()/2);
    		_Q(".notPlant").css("top",_Q("#mPane").height()/2-_Q(".notPlant").height()-16);
    		_Q("#rightPane").css("z-index","100").css("background","white");
		} else if (nowPlant.length == 1) {//一个种植
			_Q(".onePlant .introPop-header-lt img").attr("src",(nowPlant[0].imground == "" ? nonesrc : nowPlant[0].imground+"@100h_100w|100-1ci.png"));
			_Q(".onePlant .introPop-header-title h3").html(obj.parents._name);
			_Q(".onePlant .introPop-header-title strong").html(nowPlant[0].breed_name);
			_Q(".onePlant .introPop-header-title strong").show();
			_Q(".onePlant .introPop-header-title span").hide();
			var kee = _Q("#group_farmer_ option[value='" + obj.parents._keeperId
					+ "']");
			var keeper = "暂无数据";
			if (kee.length > 0) {
				keeper = kee.html();
			}
			_Q(".onePlant .introPop-header-rt .farmer").html(keeper);
			box_area = obj.parents.mianji;
			box_area = parseFloat(box_area).toFixed(2);
			var temp_area = nowPlant[0].crop_area ;
			temp_area = temp_area.toFixed(2);
			_Q(".onePlant .introPop-header-rt .farmland").html(temp_area+"亩/"+box_area+"亩");
			showinfos2_next(nowPlant[0]);
			if(nowPlant[0].listStr==""){
				_Q(".onePlant #container-oneChart").hide();
			}
			else{
				_Q(".onePlant #container-oneChart").show();
			}
			_Q('#login4').show();
    		_Q(".onePlant").show();
    		_Q(".onePlant").css("left",_Q('#login4').width()/2-_Q(".onePlant").width()/2);
    		_Q(".onePlant").css("top",_Q("#mPane").height()/2-_Q(".onePlant").height()-16);
    		_Q("#rightPane").css("z-index","100").css("background","white");
		} else if (nowPlant.length > 1) {//多个种植
			
			_Q(".onePlant .introPop-header-lt img").attr("src",(nowPlant[0].imground == "" ? nonesrc : nowPlant[0].imground+"@100h_100w|100-1ci.png"));
			_Q(".onePlant .introPop-header-title h3").attr("aa",obj.parents._id).html(obj.parents._name);
			_Q(".onePlant .introPop-header-title strong").hide();
			var kee = _Q("#group_farmer_ option[value='" + obj.parents._keeperId
					+ "']");
			var keeper = "暂无数据";
			if (kee.length > 0) {
				keeper = kee.html();
			}
			_Q(".onePlant .introPop-header-rt .farmer").html(keeper);
			box_area = obj.parents.mianji;
			box_area = parseFloat(box_area).toFixed(2);
			var temp_area = nowPlant[0].crop_area ;
			temp_area = temp_area.toFixed(2);
			var options = "";
			for (var i = 0; i < nowPlant.length; i++) {
				options += "<option value='"+nowPlant[i].real_plant_id+"'>"+nowPlant[i].breed_name + "</option>";
			}
			_Q(".onePlant .introPop-header-title select").empty().append(options);
			_Q(".onePlant .introPop-header-title select").selectpicker("refresh");
			_Q(".onePlant .introPop-header-title span").show();
			_Q(".onePlant .introPop-header-rt .farmland").attr("aa",box_area).html(temp_area+"亩/"+box_area+"亩");
			showinfos2_next(nowPlant[0]);
			if(nowPlant[0].listStr==""){
				_Q(".onePlant #container-oneChart").hide();
			}
			else{
				_Q(".onePlant #container-oneChart").show();
			}
			//console.log(_Q('#rightPane').width());
			_Q('#login4').show();
    		_Q(".onePlant").show();
    		_Q(".onePlant").css("left",_Q('#login4').width()/2-_Q(".onePlant").width()/2);
    		_Q(".onePlant").css("top",_Q("#mPane").height()/2-_Q(".onePlant").height()-16);
    		_Q("#rightPane").css("z-index","100").css("background","white");
		}
	}
}

function resetDate(obj){//弹出框多个种植之间切换
	var temp;
	
	for (var i = 0; i < realPlantJson.length; i++) {
		var rp = realPlantJson[i];
		if (rp.real_plant_id ==  obj.value) {
			temp = rp;
		}
	}
	_Q(".onePlant .introPop-header-lt img").attr("src",(temp.imground == "" ? nonesrc : temp.imground+"@100h_100w|100-1ci.png"));
	_Q(".onePlant .introPop-header-title strong").hide();
	var box_area = _Q(".onePlant .introPop-header-rt .farmland").attr("aa");
	var temp_area = temp.crop_area ;
	temp_area = temp_area.toFixed(2);
	_Q(".onePlant .introPop-header-title span").show();
	_Q(".onePlant .introPop-header-rt .farmland").html(temp_area+"亩/"+box_area+"亩");
	for(var x = 0;x<realPlantJson.length;x++){
		var real = realPlantJson[x];
		if(real.real_plant_id==temp.real_plant_id){
			showinfos2_next(real);
			if(real.listStr==""){
				_Q(".onePlant #container-oneChart").hide();
			}
			else{
				_Q(".onePlant #container-oneChart").show();
			}
			break;
		}
	}
	_Q(".onePlant").css("left",_Q('#login4').width()/2-_Q(".onePlant").width()/2);
	_Q(".onePlant").css("top",_Q("#mPane").height()/2-_Q(".onePlant").height()-16);
	_Q("#rightPane").css("z-index","100").css("background","white");
}

//弹出框中间文字显示
function showinfos2_next(real){
	
	var b,e;	
	var x = new Array();
	var y = new Array();
	if(real.floristics_type==2){
		var dz = (real.dingm<10?"0"+real.dingm:real.dingm)+"-"+(real.dingd<10?"0"+real.dingd:real.dingd);
		var cs = (real.kaim<10?"0"+real.kaim:real.kaim)+"-"+(real.kaid<10?"0"+real.kaid:real.kaid);
		var js = (real.jiem<10?"0"+real.jiem:real.jiem)+"-"+(real.jied<10?"0"+real.jied:real.jied);
		_Q(".onePlant .time1 li:eq(0) p").html("落叶休眠<br>"+dz);
		_Q(".onePlant .time1 li:eq(1) p").html("采收开始<br>"+cs);
		_Q(".onePlant .time1 li:eq(2) p").html("采收结束<br>"+js);
		_Q(".onePlant .time2").hide();
		_Q(".onePlant .time1").show();
		b = cs;
  		e = js;
  		b = b.split("-")[0];
  		e = e.split("-")[0];
	}else{
		if(real.plant_id==0){
			_Q(".onePlant .time2 li:eq(0) p").html("休耕开始<br>"+real.middle);
			_Q(".onePlant .time2 li:eq(1) p").html("休耕结束<br>"+real.end_time);
			_Q(".onePlant .time2").show();
			_Q(".onePlant .time1").hide();
		}else{
			_Q(".onePlant .time1 li:eq(0) p").html("定植时间<br>"+real.start_time);
			_Q(".onePlant .time1 li:eq(1) p").html("采收开始<br>"+real.middle);
			_Q(".onePlant .time1 li:eq(2) p").html("种植结束<br>"+real.end_time);
			_Q(".onePlant .time2").hide();
			_Q(".onePlant .time1").show();
		}
		
		b = real.middle;
  	  	e = real.end_time;
  	    b = b.split("-")[1];
  		e = e.split("-")[1];
	}
	
//	if(real.listStr!="" && !_Q.fn.highcharts){
//		setTimeout(function(){showinfos2_next(real)},3000);
//		return ;
//	}
	
	if(real.listStr!=""){
		var ts_s = real.listStr.split(" KG<br/>");
		var tob = {}; 
		for(var t = 0;t<ts_s.length;t++){
			var tp = ts_s[t].split(":");
			tob[tp[0]] = tp[1];
		}
		b = parseInt(b, 10);
		e = parseInt(e, 10);
		for (var i = b; i <= 12; i++) {
			if (tob[i + "月"]) {
				y.push(parseFloat(tob[i + "月"]));
				x.push(i + "月");
			}
		}
		if (e < b)
			for (var i = 1; i <= e; i++) {
				if (tob[i + "月"]) {
					y.push(parseFloat(tob[i + "月"]));
					x.push(i + "月");
				}
			}
		_Q('#container-oneChart').highcharts({
			title : {
				text : '',
				x : -20
			// center
			},
			subtitle : {
				text : '',
				x : -20
			},
			xAxis : {
				categories : x,
				min : 0
			},
			yAxis : {
				min : 0,
				title : {
					text : '数值(kg)'
				},
				plotLines : [ {
					value : 0,
					width : 1,
					color : '#808080'
				} ]
			},
			tooltip : {
				valueSuffix : 'Kg',
				pointFormat : '{point.key}<br/>产量:{point.y}'
			},
			legend : {
				layout : 'vertical',
				align : 'right',
				verticalAlign : 'middle',
				x : 100,
				y : 100,
				borderWidth : 0
			},
			series : [ {
				name : '产量',
				data : y
			} ]
		});
	}
	
}


function xa() {
	if (_Q.browser.msie) {
		_Q(".gm-style-iw").css("overflow", "visible");
		_Q(".gm-style-iw div").css("overflow", "visible");
	} else {
		_Q(".gm-style-iw").css("overflow", "inherit");
		_Q(".gm-style-iw div").css("overflow", "inherit");
	}
	_Q(".div_012").css({
		"width" : "241px",
		"margin-left" : "-10px"
	});
}

function hove() {
	_Q('.div_012').hover(function() {
		_Q(this).find('.gooleedit').show();
	}, function() {
		_Q(this).find('.gooleedit').hide();
	});
}

var g_infowindow = new google.maps.InfoWindow({
	maxWidth : 242
});

var weather_infowindow = new google.maps.InfoWindow({
	maxWidth : 242
});

var c_infowindow = new google.maps.InfoWindow({
	maxWidth : 242
});
function nothing() {
}

Array.prototype.insertSort = function(fn){
	var array = this;
	var fn = fn || function(a,b){
		return b>a;
	}
	for(var i = 1;i<array.length;i++){
		var key = array[i];
		var j = i - 1;
		while(j>=0 && fn(array[j],key)){
			array[j+1] = array[j];
			j--;
		}
		array[j+1] = key;
	}

	return array;


}

var map1 = new JsMap();// 区域
var map2 = new JsMap();//partId,partName
var map5 = new JsMap();// 区域
function initList() {
	map1.clear();//区域
	for(var i = 0;i<mark3Array.length;i++){
		var obj = mark3Array[i];
		if(obj.getMap()==null)
			continue;
		var partition_id = obj._group_parent_id;
		if(map2.containsKey(partition_id)){
			obj.partition_name = map2.get(partition_id);
		}else{
			obj.partition_name = "";
		}
		if(map1.containsKey(partition_id)){
			var tempArray = map1.get(partition_id);
			tempArray.push(obj);
			map1.put(partition_id,tempArray);
		}else{
			var tempArray = new Array();
			tempArray.push(obj);
			map1.put(partition_id,tempArray);
		}
	}
	if(null!=pidArray && pidArray.length>0)
		pidArray.sort(function(a,b){return a.indexNum>b.indexNum?1:-1});
	//区域
	var html = '';
	for(var i = 0;i<pidArray.length;i++){
		var list = map1.get(pidArray[i].id);
		if(list==null)
			continue;
//		list.insertSort(function(a,b){
//			if(a._index_num == 0 && b._index_num ==0)
//				return b._id > a._id;
//			return a._index_num>b._index_num ;});
		var p_name = list[0].partition_name;
		p_name = p_name==""?"无所属区域":p_name;
		html+='<div class="needdis" style="width:100%; display:block; margin-bottom:10px;"><div class="aqu2"><table width="100%" cellspacing="0" cellpadding="0">'+
    	'<tbody><tr><td align="left"><div class="quyu">'+p_name+'</div></td><td align="right" class="sjj_08">'+
        '<img width="14" height="19" src="'+workpath+'/asset/images/sjj_down.jpg" aa="true" onclick="togg1(this)" style="cursor:pointer"/></td></tr></tbody></table></div><ul class="aqu_ul" style="min-width:320px;">';
		for(var j = 0;j<list.length;j++){
			var total = 0;
			var obj = list[j];
				html+='';
				html+='<li class="aqu_li"><table cellpadding="0" cellspacing="0" width="100%"><tr><td align="left" class="_classname_"><a href="#" class="_tunnel_name"  onclick="gotoMap('+obj._id+')">'+obj._name+'</a></td>'
					+'<td rowspan="2" class="tc_str_hjtj">';
			if(obj._group_type==8){
				var timg = "aqu_bg";
				html+='</td></tr> <tr><td class="mus">可用'+obj._muarea+'亩   总'+obj.mianji+'亩</td></tr></table></li>';
				html=html.replace("_classname_",timg);
			}else{
				var temps = "aqu_bg";
				html+='</td></tr> <tr><td class="mus">可种植'+obj._muarea+'亩   <span style="margin: 0 30px 0 30px;">已种植'+obj._crop_area+'亩</span>   总'+obj.mianji+'亩</td></tr></table></li>';
				html=html.replace("_classname_",temps);
			}
		}
		html+='</ul><div class="clear"></div></div>';
	}
	_Q("._area0").empty();
	_Q("._area0").append(html);

	
}

function togg1(obj) {
	if (_Q(obj).attr("aa") == "true") {
		_Q(obj).closest('.needdis').find("ul").hide();
		_Q(obj).attr("aa", "false");
		_Q(obj).attr("src", workpath + "/asset/images/sjj_left.jpg");
	} else {
		_Q(obj).closest('.needdis').find("ul").show();
		_Q(obj).attr("aa", "true");
		_Q(obj).attr("src", workpath + "/asset/images/sjj_down.jpg");
	}
}

var searchName = [ "", "", "", "" ];
var tab_index = 0;
function searchTunnel(index) {
	tab_index = index;
	_Q("#second_word").val(searchName[tab_index]);
	searchs();
}

var gantVal = "";
function searchs() {
	var val = _Q("#second_word").val();
	searchName[tab_index] = val;
	gantVal = val;
	// innitGantt(val);
	// mygantt();
	if (val == "") {
		_Q("._area" + tab_index + " ._tunnel_name").closest(".aqu_li").show();
		_Q("._area" + tab_index + " .needdis").show();
		return;
	}
	_Q("._area" + tab_index + " ._tunnel_name").not(":contains(" + val + ")")
			.closest(".aqu_li").attr("a_", "b_").hide();
	_Q("._area" + tab_index + " ._tunnel_name:contains(" + val + ")").closest(
			".aqu_li").attr("a_", "a_").show();
	_Q("._area" + tab_index + " .needdis").each(function() {
		var x = _Q(this).find("li[a_='a_']").length;
		if (x == 0)
			_Q(this).hide();
		else if (x > 0)
			_Q(this).show();
	});
}

var apsName = [ "", "", "" ];
var aps_index = 0;
function searchAps(index) {
	aps_index = index;
	_Q("#tc_top_input").val(apsName[aps_index]);
	searchApsBy();
}

function searchApsBy() {
	var val = _Q("#tc_top_input").val();
	apsName[aps_index] = val;
	if (val == undefined || val == "") {
		_Q(".nowPlant .pcic").show();
		_Q(".nowPlant a[lj=bj]").attr("lj", "lj").trigger("click",
				_Q(".nowPlant a[lj=bj]"));
		if (_Q(".nowPlant a[lj=bj]").length == 0) {
			_Q("#rightPane .hsplitbar").show();
			_Q("#rbPane").show();
			_Q('#rbPane').css("height", "0px");
			_Q('#rightPane').trigger('resize');
		}
		return;
	}
	if (aps_index == 2) {
		_Q(".plantList_")
				.each(
						function() {
							if (_Q(this).find(".pca_hg:contains(" + val + ")").length > 0) {
								_Q(this).show();
								_Q(this).find("li").show();
							} else {
								_Q(this)
										.find(
												".pca_font:not(:contains("
														+ val + "))").closest(
												"li").hide();
								if (_Q(this).find(
										".pca_font:contains(" + val + ")").length == 0)
									_Q(this).hide();
								else {
									_Q(this).show();
									_Q(this).find(
											".pca_font:contains(" + val + ")")
											.show();
								}
							}
						});
	} else if (aps_index == 1) {
		_Q(".secondInner")
				.each(
						function() {
							if (_Q(this).find(".pca_hg:contains(" + val + ")").length > 0) {
								_Q(this).show();
								_Q(this).find(".pcic").show();
							} else {
								_Q(this).find(
										".pctext:not(:contains(" + val + "))")
										.closest(".pcic").hide();
								if (_Q(this).find(
										".pctext:contains(" + val + ")").length == 0) {
									_Q(this).hide();
								} else {
									_Q(this).show();
									_Q(this).find(
											".pctext:contains(" + val + ")")
											.show();
								}
							}
						});
		_Q(".secondInner a[lj=bj]").attr("lj", "lj").trigger("click",
				_Q(".secondInner a[lj=bj]"));
		if (_Q(".secondInner a[lj=bj]").length == 0) {
			_Q('#rbPane').css("height", "0px");
			_Q('#rightPane').trigger('resize');
		}
	} else {
		_Q(".nowPlant .pcic")
				.each(
						function() {
							if (_Q(this).find(".pctext:contains(" + val + ")").length > 0) {
								_Q(this).show();
							} else {
								_Q(this).find(
										".pctext:not(:contains(" + val + "))")
										.closest(".pcic").hide();
								_Q(this).find(".pctext:contains(" + val + ")")
										.closest(".pcic").show();
							}
						});
		_Q(".nowPlant a[lj=bj]").attr("lj", "lj").trigger("click",
				_Q(".nowPlant a[lj=bj]"));
		if (_Q(".nowPlant a[lj=bj]").length == 0) {
			_Q('#rbPane').css("height", "0px");
			_Q('#rightPane').trigger('resize');
		}
	}
}

function gotoMap(id, event) {
	for (var i = 0; i < mark3Array.length; i++) {
		var obj = mark3Array[i];
		if (obj._id == id) {
			setSelection(obj);
			obj.ondblclick(event);
			break;
		}
	}
}


Array.prototype.del = function(n) {
	if (n < 0)
		return this;
	else
		return this.slice(0, n).concat(this.slice(n + 1, this.length));
};

/**
 * a array 要操作的数组 index int 要插入的位置 num obj 要插入的值
 */
function insert(a, index, num) {
	var temp = a.splice(index);
	return a.concat(num, temp);
}

//回车事件检测
document.onkeydown = function(event) {
	e = event ? event : (window.event ? window.event : null);
	if (e.keyCode == 13) {
		if (document.activeElement.id == "second_word") {
			searchs();
		} else if (document.activeElement.id == "tc_top_input") {
			searchApsBy();
		}
		e.keyCode = 0;
		if (window.navigator.userAgent.indexOf("MSIE") == -1) {
			e.preventDefault();
			return false;
		}
		e.returnValue = false;
	}
};



//地图上设备层
var CustomOverlay = function(map, imgsrc, latlng, arr) {
	this.polygons = [];
	this.map = map;
	this.div = null;
	this.setMap(map);
	this.imgsrc_ = imgsrc;
	this.latlng_ = latlng;
	this.arr = arr;
};
CustomOverlay.prototype = new google.maps.OverlayView();

CustomOverlay.prototype.onAdd = function() {
	var div = document.createElement("DIV");
	div.id = "div_id";
	div.style.border = "none";
	div.style.borderWidth = "0px";
	div.style.position = "absolute";
	// div.style.height="0px";
	div.style.visibility = "visible";
	div.draggable = true;
	this.div = div;
	var tempThis = this;
	this.addPolygon(this.latlng_);
	this.getPanes().floatShadow.appendChild(div);
	google.maps.event.addDomListener(this.div, 'click', function(event) {
		clearMap();
		event.cancelBubble = true;
		if (event.stopPropagation) {
			event.stopPropagation();
		}
	});
	google.maps.event.addDomListener(this.div, 'mousedown', function(event) {
		clearMap();
		event.cancelBubble = true;
		if (event.stopPropagation) {
			event.stopPropagation();
		}
	});
	google.maps.event.addDomListener(this.div, 'dblclick', function(event) {
		clearMap();
		event.cancelBubble = true;
		if (event.stopPropagation) {
			event.stopPropagation();
		}
	});
};
CustomOverlay.prototype.draw = function() {
	var divPixel = this.getProjection().fromLatLngToDivPixel(
			this.quadrilateral.latLng);
	var latLng = this.quadrilateral.latLng;
	var lat = latLng.lat();
	var lng = latLng.lng();
	var db, xn;
	if (this.arr.device_ == 2) {
		db = new google.maps.LatLng(lat + (0.0000424 * 4), lng + (0.000055 * 4));
		xn = new google.maps.LatLng(lat - (0.000045 * 4), lng - (0.000060 * 4));
	}else if(this.arr.device_ == 4){
		db = new google.maps.LatLng(lat + (0.0000424 * 4), lng + (0.00012 * 1.5));
		xn = new google.maps.LatLng(lat , lng - (0.00012 * 1.5));
	} else {
		db = new google.maps.LatLng(lat + 0.0000424, lng + 0.000055);
		xn = new google.maps.LatLng(lat - 0.000045, lng - 0.000060);
	}
	var bounds2 = new google.maps.LatLngBounds(xn, db);

	var sw = this.getProjection().fromLatLngToDivPixel(bounds2.getSouthWest());
	var ne = this.getProjection().fromLatLngToDivPixel(bounds2.getNorthEast());
	this.quadrilateral.shape.style.left = sw.x + "px";
	this.quadrilateral.shape.style.top = ne.y + "px";
	this.quadrilateral.shape.style.width = (ne.x - sw.x) + 'px';
	this.quadrilateral.shape.style.height = (sw.y - ne.y) + 'px';
}
CustomOverlay.prototype.onRemove = function() {
	// Not Implemented Here
}

CustomOverlay.prototype.addPolygon = function(latLng) {
	var shape = document.createElement("div");
	shape.className = "customPolygon";
	shape.style.position = "relative";
	var img = document.createElement('img');
	if (this.arr.device_ == 1) {
		img.src = devicesrc;
	} else if (this.arr.device_ == 2) {
		img.src = weathersrc;
	} else if (this.arr.device_ == 3) {
		img.src = videosrc;
    }else if(this.arr.device_==4){
        img.src = krpanosrc;
    }
	img.style.width = '100%';
	img.style.height = '100%';
	shape.appendChild(img);
	var tempThis = this;
	this.div.setAttribute("aa", this.arr.device_name);
	this.div.appendChild(shape);
	// setTimeout(function(){move(tempThis,shape);},500);
	clic(tempThis, shape);
	this.quadrilateral = {
		shape : shape,
		latLng : latLng
	};
};
var tempDevice;
var tempCustom;
function clic(tempThis, shape) {
	_Q(shape)
			.click(
					function() {
						if (tempThis.arr.device_ == 1) {//传感器
							tempDevice = tempThis;
							// A010003A00015301006
							_Q.getJSON(workpath+"/environmentaldata?sn="+ tempDevice.arr.device_sn+ "&type=0")
									.done(function(data) {
												map.setCenter(tempDevice.quadrilateral.latLng);
												map.setZoom(19);
												_Q('#login4').show();
												_Q(".maptck").show();
												_Q(".maptck").css("left",_Q('#login4').width()/ 2- _Q(".maptck").width()/ 2);
												_Q(".maptck").css("top",_Q("#mPane").height()/ 2- _Q(".maptck").height());
												if(tempDevice.arr.device_type_id==101)
													_Q(".maptck .titlefont").html("奥科美二合一传感器");
												else if(tempDevice.arr.device_type_id==102)
													_Q(".maptck .titlefont").html("奥科美四合一传感器");
												else if(tempDevice.arr.device_type_id==103)
													_Q(".maptck .titlefont").html("奥科美六合一传感器");
												if (data.airTemp == undefined) {
													_Q(".maptck .t1_sn").html("编号："+ tempDevice.arr.device_sn);
													_Q(".maptck .t1_airTemp").html("暂无数据");
													_Q(".maptck .t1_airHumidity").html("");
													_Q(".maptck .t1_soilTemp").html("");
													_Q(".maptck .t1_soilHumidity").html("");
													_Q(".maptck .t1_ludian").html("");
													_Q(".maptck .t1_illumination").html("");
													_Q(".maptck .t1_co2").html("");
													_Q(".maptck .ludian").hide();
													_Q(".maptck .t1_gentime").html("");
													_Q(".maptck .ckxx").unbind("click");
												} else {
													_Q(".maptck .t1_sn").html("编号："+ tempDevice.arr.device_sn);
													_Q(".maptck .ludian").show();
													if (parseFloat(data.airTemp) > -99)
														_Q(".maptck .t1_airTemp").html(parseFloat(data.airTemp).toFixed(1)+ " ℃");
													else
						                            	_Q(".maptck .t1_airTemp").html("－－℃");


													if (parseFloat(data.airHumidity) > -99)
														_Q(".maptck .t1_airHumidity").html("湿度："+ parseFloat(data.airHumidity).toFixed(1)+ " %");
													else
														_Q(".maptck .t1_airHumidity").html("湿度：－－%");


													if (parseFloat(data.soilTemp) > -99)
														_Q(".maptck .t1_soilTemp").html("温度 "+ parseFloat(data.soilTemp).toFixed(1)+ " ℃");
													else
														_Q(".maptck .t1_soilTemp").html("");

													if (_Q(".maptck .t1_soilTemp").html() == "") {
							                            if(parseFloat(data.soilHumidity)>-99){
							                                _Q(".maptck .t1_soilTemp").html("湿度 "+parseFloat(data.soilHumidity).toFixed(1)+" %");
							                                _Q(".maptck .t1_soilHumidity").html("")
							                            }else
															_Q(".maptck .t1_soilTemp").html("");
													} else {
														if (parseFloat(data.soilHumidity) > -99)
															_Q(".maptck .t1_soilHumidity").html("湿度 "+ parseFloat(data.soilHumidity).toFixed(1)+ " %");
														else
															_Q(".maptck .t1_soilHumidity").html("");
													}
													
							                        if(parseFloat(data.airTemp)<-99||parseFloat(data.airHumidity)<-99){
							                            _Q(".maptck .t1_ludian").html("露点：－－ ℃");
							                        }else{
							                            if(parseFloat(data.ludian)>-99)
							                                _Q(".maptck .t1_ludian").html("露点："+parseFloat(data.ludian).toFixed(1)+" ℃");
							                            else
							                                _Q(".maptck .t1_ludian").html("");
							                        }


													if (parseFloat(data.illumination) > -99)
														_Q(".maptck .t1_illumination").html(parseFloat(data.illumination).toFixed(0)+ " LUX");
													else
														_Q(".maptck .t1_illumination").html("－－ LUX");


													if (parseFloat(data.co2) > -99)
														_Q(".maptck .t1_co2").html(parseFloat(data.co2).toFixed(0)+ " ppm");
													else
														_Q(".maptck .t1_co2").html("");

													_Q(".maptck .t1_gentime").html("采集时间："+ data.genTime);
													_Q(".maptck .ckxx").bind("click",
																	function() {
																		var str = workpath
																				+ "/growth/TunnelInfoView.seam?tunnelInfoId="
																				+ tempDevice.arr.device_tunnel_id
																				+ "&actionMethod=map%2FAPS.xhtml%3AsessionTake.setWorkParam%283%29";

																		window.location.href = str
																	});
												}
											});
						} else if (tempThis.arr.device_ == 2) {//气象站
							tempCustom = tempThis;
							// var a = tempThis.quadrilateral.latLng.lat();
							// var b = tempThis.quadrilateral.latLng.lng();
							// var newL = new google.maps.LatLng((a-0.004),b);
							// map.setCenter(newL);
							_Q('#login4').show();
							map.setCenter(tempThis.quadrilateral.latLng);
							map.setZoom(19);
							_Q(".qixz").show();
							_Q(".qixz").css(
									"left",
									_Q('#login4').width() / 2
											- _Q(".qixz").width() / 2);
							_Q(".qixz").css(
									"top",
									_Q("#mPane").height() / 2
											- _Q(".qixz").height());
							_Q(".qixz .t2_sn").html(
									"编号：" + tempThis.arr.device_sn);
							findWeatherData(tempThis.arr.device_sn);
						} else if (tempThis.arr.device_ == 3) {//视频
							var realPlantId = "";
							if(tempThis.arr.tunnelId != 0 ){
								for (var i = 0; i < realPlantJson.length; i++) {
									var rp = realPlantJson[i];
									if (rp.tunnel_info_id ==  tempThis.arr.tunnelId) {
										realPlantId = rp.real_plant_id;
										break;
									}
								}
							}
							_Q("#videoViewShow").attr("src",workpath+"/archive/videoViewShow.seam?initType=5&videoId="+tempThis.arr.video_id+"&realPlantId="+realPlantId);
							_Q('#login3').show();
							_Q("#video_iframe").show();
						}else if(tempThis.arr.device_ == 4){
							var bid ;
							if(base__id == "null")
								bid = "";
							else 
								bid = base__id;
							
							if(tempThis.arr.krpano_file_type == 1){
								 _Q("#krpano_iframe").attr("src",workpath+ "/map/Krpano.seam?type=3&krpano_id="+tempThis.arr.krpano_id+"&base_id="+bid+"&enterid="+enterid);
								    var height = document.body.clientHeight;
								    var width = document.body.clientWidth;
								    _Q("#krpano_iframe").css({"position":"fixed","z-index":1000});
							        var rightWidth =  _Q('#rightPane').width();
							        var self_width = width*0.75;
							        var self_height = height*0.75;
							        var of_top = (height-self_height)/2;
							        var of_left = (width-self_width)/2;
							        _Q("#krpano_iframe").css({"width":self_width,"height":self_height,"left":of_left,"top":of_top});
							        var div_left = width/2+self_width/2;
								    _Q("#krpano_iframe").show();
								    _Q("#krpano_iframe_img").show();
								    _Q("#krpano_iframe_img").css({"position":"fixed","z-index":1000,"left":div_left,"top":of_top});
							}else{
								previewImage(tempThis.arr.krpano_file_fold);
							}
						}
					});
}


function previewImage(url){
	_Q("#previewDiv").show();
	var height = document.body.clientHeight;
	var width = document.body.clientWidth;
	_Q("#previewDiv").css({"position":"absolute","z-index":1000,"left":(width-1024)/2,"top":(height-768)/2});
	_Q("#previewDiv img:first").attr("src",url);
}

function closeCgq() {
	_Q(".maptck").hide();
	_Q('#login4').hide();
}

function closeQxz() {
	_Q(".qixz").hide();
	_Q('#login4').hide();
}

function closeVideo() {
	try {
		StopPlay();
	} catch (e) {

	}
	_Q('#login3').hide();

	_Q("#video_iframe").hide();
}

function closeVideo2() {
	try {
		StopPlayView();
	} catch (e) {

	}
	_Q('#login3').hide();
	_Q("#video_iframe2").hide();
}

function closeVideo3(){
	//document.getElementById("hlsdiv").innerHTML="";
	_Q('#login3').hide();
	_Q("#video_iframe3").hide();
}

function closeVideo4(){
	try {
		clickStopRealPlay();
		clickLogout();
	} catch (e) {

	}
	_Q('#login3').hide();
	_Q("#video_iframe4").hide();
}

function findWeatherData_next(data) {//处理传感器数据
	if (data == "") {
		_Q(".qixz .t2_air_temp").html("无数据");
		_Q(".qixz .t2_air_humidity").html("湿度 ");
		_Q(".qixz .t2_soil_temp").html("");
		_Q(".qixz .t2_soil_humidity").html("");
		_Q(".qixz .t2_illumination").html("");
		_Q(".qixz .t2_wind_velocity").html("");
		_Q(".qixz .t2_atmospheric_pressure").html("");
		_Q(".qixz .t2_solar_radiation").html("");
		_Q(".qixz .t2_rainfallS").html("");
		_Q(".qixz .t2_soil_humidity2").html("");
		_Q(".qixz .t2_gen_time").html("");
		_Q(".qixz .qckxx2").unbind("click");
	} else {
		eval("var tempp = " + data);
		if (parseFloat(tempp.air_temp) > -99)
			_Q(".qixz .t2_air_temp").html(tempp.air_temp + " ℃");
		else
			_Q(".qixz .t2_air_temp").html("");

		if (parseFloat(tempp.air_humidity) > -99)
			_Q(".qixz .t2_air_humidity")
					.html("湿度 " + tempp.air_humidity + " %");
		else
			_Q(".qixz .t2_air_humidity").html("");

		if (parseFloat(tempp.soil_temp) > -99)
			_Q(".qixz .t2_soil_temp").html("温度 " + tempp.soil_temp + " ℃");
		else
			_Q(".qixz .t2_soil_temp").html("");

		if (parseFloat(tempp.soil_humidity) > -99) {
			if (_Q(".qixz .t2_soil_temp").html() == "") {
				_Q(".qixz .t2_soil_temp").html(
						"湿度 " + tempp.soil_humidity + " %");
				_Q(".qixz .t2_soil_humidity").html("");
			} else {
				_Q(".qixz .t2_soil_humidity").html(
						"湿度 " + tempp.soil_humidity + " %");
			}
		} else
			_Q(".qixz .t2_soil_humidity").html("");

		if (parseFloat(tempp.soil_humidity2) > -99) {
			if (_Q(".qixz .t2_soil_temp").html() == "") {
				_Q(".qixz .t2_soil_temp").html(
						"湿度2 " + tempp.soil_humidity2 + " %");
				_Q(".qixz .t2_soil_humidity2").html("");
			} else if (_Q(".qixz .t2_soil_humidity").html() == "") {
				_Q(".qixz .t2_soil_humidity").html(
						"湿度2 " + tempp.soil_humidity2 + " %");
				_Q(".qixz .t2_soil_humidity2").html("");
			} else {
				_Q(".qixz .t2_soil_humidity2").html(
						"湿度2 " + tempp.soil_humidity2 + " %");
			}
		} else
			_Q(".qixz .t2_soil_humidity2").html("");

		if (parseFloat(tempp.illumination) > -99)
			_Q(".qixz .t2_illumination").html(
					"光照 " + tempp.illumination + " LUX");
		else
			_Q(".qixz .t2_illumination").html("");

		if (parseFloat(tempp.solar_radiation) > -99) {
			if (_Q(".qixz .t2_illumination").html() == "") {
				_Q(".qixz .t2_illumination").html(
						"辐射 " + tempp.solar_radiation + " w/㎡");
				_Q(".qixz .t2_solar_radiation").html("");
			} else
				_Q(".qixz .t2_solar_radiation").html(
						"辐射 " + tempp.solar_radiation + " w/㎡");
		} else
			_Q(".qixz .t2_solar_radiation").html("");

		_Q(".qixz .t2_wind_velocity").html(
				tempp.wind_velocity + " " + tempp.wind_direction);
		if (parseFloat(tempp.atmospheric_pressure) > -99)
			_Q(".qixz .t2_atmospheric_pressure").html(
					tempp.atmospheric_pressure + " hPa");
		else
			_Q(".qixz .t2_atmospheric_pressure").html("");

		if (tempp.rainfallS == "null")
			_Q(".qixz .t2_rainfallS").html("");
		else
			_Q(".qixz .t2_rainfallS").html("降水量 " + tempp.rainfallS + " mm");

		if (parseFloat(tempp.pm25) > -99)
			_Q(".qixz .pm25").html(tempp.pm25);
		else
			_Q(".qixz .pm25").html("");

		_Q(".qixz .t2_gen_time").html("采集时间 :" + tempp.gen_time);

		var a1 = false;
		_Q(".qixz .shujutd1").each(function(index) {
			if (_Q(this).html() != "" && index != 0) {
				a1 = true;
				return false;
			}
		})
		if (!a1)
			_Q(".qixz .shujutd1").hide();
		else
			_Q(".qixz .shujutd1").show();

		var a2 = false;
		_Q(".qixz .shujutd2").each(function(index) {
			if (_Q(this).html() != "" && index != 0) {
				a2 = true;
				return false;
			}
		})
		if (!a2)
			_Q(".qixz .shujutd2").hide();
		else
			_Q(".qixz .shujutd2").show();

		var a3 = false;
		_Q(".qixz .shujutd3").each(function(index) {
			if (_Q(this).html() != "" && index != 0) {
				a3 = true;
				return false;
			}
		})
		if (!a3)
			_Q(".qixz .shujutd3").hide();
		else
			_Q(".qixz .shujutd3").show();

		var a4 = false;
		_Q(".qixz .shujutd4").each(function(index) {
			if (_Q(this).html() != "" && index != 0) {
				a4 = true;
				return false;
			}
		})
		if (!a4)
			_Q(".qixz .shujutd4").hide();
		else
			_Q(".qixz .shujutd4").show();

		if (_Q(".td1_:eq(1)").html() == "")
			_Q(".td1_").hide();
		else
			_Q(".td1_").show();

		if (_Q(".td2_:eq(1)").html() == "")
			_Q(".td2_").hide();
		else
			_Q(".td2_").show();

		if (_Q(".td3_:eq(1)").html() == " ")
			_Q(".td3_").hide();
		else
			_Q(".td3_").show();

		_Q(".qixz .qckxx2").bind(
				"click",
				function() {
					window.location.href = workpath
							+ "/growth/GrowthDevice.seam?deviceId="
							+ tempCustom.arr.device_id + "&dateType=6&baseId="
							+ tempCustom.arr.device_base_id;
				});
	}
}

//加载传感器和气象站
function loadfourth() {
	for (var i = 0; i < deviceStr.length; i++) {
		var device = deviceStr[i];
		var arr = {};
		arr.device_ = device.deviceType;
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
		var latlng = new google.maps.LatLng(device.coordinateX,
				device.coordinateY);
		arr._index = i;
		if (arr.device_ == 1) {
			var tunnel = checkPointTunnel(latlng);
			if (tunnel != null && tunnel._device_id == device.id) {
				arr.device_tunnel_id = tunnel._id;
				var custom = new CustomOverlay(map, "", latlng, arr);
				tunnel.device_ = custom;
				deviceArray.push(custom);
			} else {
				// custom.setMap(null);
				// custom.div.style.display="none";
			}
		} else {
			var custom = new CustomOverlay(map, "", latlng, arr);
			deviceArray.push(custom);
		}
	}
	device_index = deviceStr.length;
}

//加载视频
function loadfifth() {
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
		arr.tunnelId = temp.tunnelId;
		arr._index = i;
		var latlng = new google.maps.LatLng(temp.coordinateX, temp.coordinateY);
		var custom = new CustomOverlay(map, "", latlng, arr);
		videoArray.push(custom);
	}
	video_index = videoStr.length;
}

function loadsixth(){
    for(var i = 0;i<krpanoStr.length;i++){
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
        arr.krpano_file_type = temp.fileType;
        arr._index = i;
        var latlng = new google.maps.LatLng(temp.coordinateX,temp.coordinateY);
        var custom = new CustomOverlay(map,krpanosrc,latlng,arr);
        krpanoArray.push(custom);
        
        var point = new google.maps.LatLng(arr.krpano_coordinateX, arr.krpano_coordinateY);
        new Wenzi(point, temp.name, map, 4);
    }
  
    krpano_index = krpanoStr.length;
}


function checkPointTunnel(latlng) {
	for (var i = 0; i < mark3Array.length; i++) {
		m = mark3Array[i];
		if (m.Contains(latlng)) {
			return m;
			break;
		} else if (i == mark3Array.length - 1) {
			return null;
		}
	}
}

var baseFontSizes = [21,19,20,21,22,23,24];
var partitionsFontsSizes = [[11,16,23,45,50],[10,15,22,44,49],[11,16,23,45,50],[12,17,24,46,51],[13,18,25,47,52],[14,19,26,48,53],[15,20,27,49,54]];
var tunnelFontsSizes = [[10,12,18],[9,11,17],[10,12,18],[11,13,19],[12,14,20],[13,15,21],[14,16,22]];

//大棚,分区,基地,下面的文字
var Wenzi = function(bounds, wenzi, map, type) {
	this.bounds_ = bounds;
	this.wenzi_ = wenzi;
	this.map_ = map;
	this.div_ = null;
	this.setMap(map);
	this.type_ = type;
}
Wenzi.prototype = new google.maps.OverlayView();
Wenzi.prototype.onAdd = function() {
	var div = document.createElement('div');
	div.style.border = 'none';
	div.style.index = "777";
	div.style.zIndex = "777";
	// div.style.width="100%";
	div.style.color = "white";
	div.style.borderWidth = '0px';
	div.style.position = 'absolute';
	div.style.textAlign = 'center';
	div.innerHTML = this.wenzi_;
	this.div_ = div;
	var panes = this.getPanes();
	panes.overlayImage.appendChild(this.div_);
	var _self = this;
};
Wenzi.prototype.draw = function() {
	var overlayProjection = this.getProjection();
	var lat = this.bounds_.lat();
	var lng = this.bounds_.lng();
	var newpoint = new google.maps.LatLng(lat, lng);
	var div = this.div_;
	var zoom = map.getZoom();
	var yu = parseInt(this.wenzi_.length / 2)+1;
	if (this.type_ == 1) {
		var fs = baseFontSizes[baseFontSize];
		if (zoom < 15) {
			this.show();

			var aPoint = overlayProjection.fromLatLngToContainerPixel(newpoint);
			aPoint.x = aPoint.x - (11 * this.wenzi_.length);
			newpoint = overlayProjection.fromContainerPixelToLatLng(aPoint);
			div.style.fontSize = fs + "px";
			div.style.width = fs * this.wenzi_.length + "px";
		} else if (zoom == 15) {
			this.show();
			newpoint = new google.maps.LatLng(lat, lng - (0.001 * yu));
			div.style.fontSize = fs + "px";
			div.style.width = fs * this.wenzi_.length + "px";
		} else {
			this.hide();
		}
	} else if (this.type_ == 2) {
		var fs = partitionsFontsSizes[partitionsFontsSize];
		if (zoom <= 15) {
			this.hide();
		} else if (zoom == 16) {
			this.show();
			newpoint = new google.maps.LatLng(lat + 0.0002, lng
					- (0.000242 * yu));
			div.style.width = fs[0] * this.wenzi_.length + "px";
			div.style.fontSize = fs[0]+"px";
		} else if (zoom == 17) {
			this.show();
			newpoint = new google.maps.LatLng(lat + 0.0001, lng
					- (0.000185 * yu));
			div.style.width = fs[1] * this.wenzi_.length + "px";
			div.style.fontSize = fs[1]+"px";
		} else if (zoom == 18) {
			this.show();
			newpoint = new google.maps.LatLng(lat + 0.00006, lng
					- (0.000139 * yu));
			div.style.width = fs[2] * this.wenzi_.length + "px";
			div.style.fontSize = fs[2]+"px";
		} else if (zoom == 19) {
			this.show();
			newpoint = new google.maps.LatLng(lat + 0.00004, lng
					- (0.000119 * yu));
			div.style.width = fs[3] * this.wenzi_.length + "px";
			div.style.fontSize = fs[3]+"px";
		} else if (zoom > 19) {
			this.show();
			newpoint = new google.maps.LatLng(lat + 0.00003, lng
					- (0.000119 * yu));
			div.style.width = fs[4] * this.wenzi_.length + "px";
			div.style.fontSize = fs[4]+"px";
		}
	} else if (this.type_ == 3) {
		var fs = tunnelFontsSizes[tunnelFontsSize];
		if (zoom < 18) {
			this.hide();
		} else if (zoom == 18) {
			this.show();
			newpoint = new google.maps.LatLng(lat - 0.00004, lng
					- (0.000064 * yu));
			div.style.width = fs[0] * this.wenzi_.length + "px";
			div.style.fontSize = fs[0]+"px";
		} else if (zoom == 19) {
			this.show();
			newpoint = new google.maps.LatLng(lat - 0.00004, lng
					- (0.000029 * yu));
			div.style.width = fs[1] * this.wenzi_.length + "px";
			div.style.fontSize = fs[1]+"px";
		} else if (zoom > 19) {
			this.show();
			newpoint = new google.maps.LatLng(lat - 0.00004, lng
					- (0.000049 * yu));
			div.style.width = fs[2] * this.wenzi_.length + "px";
			div.style.fontSize = fs[2]+"px";
		}
	}else if (this.type_ == 4) {//全景    
		var fs = tunnelFontsSizes[tunnelFontsSize];
		if (zoom < 18) {
			this.hide();
		} else if (zoom == 18) {
			this.show();
			newpoint = new google.maps.LatLng(lat+0.00001, lng
					- (0.000050 * yu));
			div.style.width = fs[0] * this.wenzi_.length + "px";
			div.style.fontSize = fs[0]+"px";
		} else if (zoom == 19) {
			this.show();
			newpoint = new google.maps.LatLng(lat + 0.00001, lng
					- (0.000029 * yu));
			div.style.width = fs[1] * this.wenzi_.length + "px";
			div.style.fontSize = fs[1]+"px";
		} else if (zoom > 19) {
			this.show();
			newpoint = new google.maps.LatLng(lat + 0.00001, lng
					- (0.000029 * yu));
			div.style.width = fs[2] * this.wenzi_.length + "px";
			div.style.fontSize = fs[2]+"px";
		}
	}
	var latLng = overlayProjection.fromLatLngToDivPixel(newpoint);
	div.style.left = latLng.x + 'px';
	div.style.top = latLng.y + 'px';
};
Wenzi.prototype.onRemove = function() {
	this.div_.parentNode.removeChild(this.div_);
};
Wenzi.prototype.hide = function() {
	if (this.div_) {
		this.div_.style.visibility = 'hidden';
	}
};
Wenzi.prototype.show = function() {
	if (this.div_) {
		this.div_.style.visibility = 'visible';
	}
};
Wenzi.prototype.toggle = function() {
	if (this.div_) {
		if (this.div_.style.visibility == 'hidden') {
			this.show();
		} else {
			this.hide();
		}
	}
};
Wenzi.prototype.toggleDOM = function() {
	if (this.getMap()) {
		this.setMap(null);
	} else {
		this.setMap(this.map_);
	}
};

//天气预报
function getWeatherReport() {
	var d1 = "";
	if (arguments.length > 0) {
		d1 = "param=" + arguments[0] + "&";
	}
	var url = workpath + "/WeatherReport";
	_Q.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : url,// 要访问的后台地址
		data : d1 + "area=" + _area,// 要发送的数据
		// complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
		success : function(msg) {// msg为返回的数据，在这里做数据绑定
			if (!msg.isok)
				return;
			if (msg.pictureTypeSn == "d") {
				var tem = msg.pictureType;
				if (tem.length == 1)
					tem = "0" + tem;
				_Q(".image_1").attr("src",
						workpath + "/asset/images/icon/day/" + tem + ".png");
			} else {
				var tem = msg.pictureType;
				if (tem.length == 1)
					tem = "0" + tem;
				_Q(".image_1").attr("src",
						workpath + "/asset/images/icon/night/" + tem + ".png");
			}
			var date = new Date();
			_Q(".airTemp").html(msg.airTemp);
			_Q(".theWeather").attr("tittle",msg.theWeather);
			var thew = msg.theWeather;
			if(typeof(thew)!="undefined"&&thew.length>15){
				thew = thew.substring(0,15)+"...";
			}
			_Q(".theWeather").html(thew);
			if (msg.dayHigh != "" && msg.dayHigh != "null" && msg.dayHigh != null) {
				_Q(".dayHigh").show();
				_Q(".dayHigh").html(msg.dayHigh + "°");
			} else {
				_Q(".dayHigh").hide();
				_Q(".dayHigh").html(msg.dayHigh + "°");
			}
			if (msg.dayLow != "" && msg.dayLow != "null" && msg.dayLow != null) {
				_Q(".dayLow").show();
				_Q(".dayLow").html(msg.dayLow + "°");
			} else {
				_Q(".dayLow").hide();
				_Q(".dayLow").html(msg.dayLow + "°");
			}
			_Q("#area1").html("");
			_Q("#area2").html("");
			if (msg.district_cn == msg.name_cn) {
				_Q("#area1").html(msg.district_cn);
			} else {
				_Q("#area1").html(msg.district_cn);
				_Q("#area2").html(msg.name_cn);
			}

			_Q(".rainfall").html("降水量  " + msg.rainfall);
			_Q(".winds").html(msg.windd + msg.winds + "级");
			date.setDate(date.getDate() + 1)
			_Q(".day2").html(date.format("MM月dd日"));
			date.setDate(date.getDate() + 1)
			_Q(".day3").html(date.format("MM月dd日"));
			_Q(".image_2").attr("src",
					workpath + "/asset/images/icon/day/" + msg.day2 + ".png");
			_Q(".image_3").attr("src",
					workpath + "/asset/images/icon/day/" + msg.day3 + ".png");
			_Q(".day2_date").html(msg.day2High + "° / " + msg.day2Low + "° ");
			_Q(".day3_date").html(msg.day3High + "° / " + msg.day3Low + "° ");
			_Q(".weatherStion_table").css("cursor", "pointer").click(
					function() {
						window.location.href = workpath
								+ "/growth/WeatherForecast.seam?areaCode="
								+ msg.areacode;
					});
			_Q(".weatherStion_wp").show();
		}
	});
}

function closeCm() {
	_Q('#login4').hide();
	_Q(".farmIntroPop").hide();
}

//土地检测 详情
function jumpToPartition() {
	window.open(workpath + "/map/PartitionInfo.seam?tnnelId="
			+ _Q("#group_id").val() + "&partId=" + _Q("#group_parent_id").val()
			+ "&baseId=" + _Q("#group_base_id").val());
}

function resetHightChart() {
	if(!_Q.fn.highcharts){
		setTimeout(function(){resetHightChart();},3000);
		return;
	}
	var x = new Array();
	var y = new Array();
	var ind = 0;
	var total = 0;
	var b,e;
  	if(_Q("#breed_new option:selected").attr("cc")=="2"){
  		b = _Q("#csstart").val();
  		e = _Q("#csend").val();
  		b = b.split("-")[0];
  		e = e.split("-")[0];
  	}else{
  		b = _Q("#plant\\:harvest_timeInputDate").val();
  	  	e = _Q("#plant\\:plant_endInputDate").val();
  	    b = b.split("-")[1];
  		e = e.split("-")[1];
  	}
	b = parseInt(b, 10);
	e = parseInt(e, 10);
	for (var i = b; i <= 12; i++) {
		if (_Q("#month" + i).val() != "") {
			y.push(parseFloat(_Q("#month" + i).val()));
			x.push(i + "月");
			total += parseFloat(_Q("#month" + i).val());
			ind++;
		}
	}
	if (e < b)
		for (var i = 1; i <= e; i++) {
			if (_Q("#month" + i).val() != "") {
				y.push(parseFloat(_Q("#month" + i).val()));
				x.push(i + "月");
				total += parseFloat(_Q("#month" + i).val());
				ind++;
			}
		}
	if (ind > 0) {
		_Q("#highChart").show();
		_Q(".baseZongji").show();
		total = total.toFixed(2);
		_Q(".baseZongji span").html(total + "kg");
	} else {
		_Q("#highChart").hide();
		_Q(".baseZongji").hide();
	}
if(_Q.fn.highcharts)
	_Q('#perMuYield').highcharts({
		title : {
			text : '',
			x : -20
		// center
		},
		subtitle : {
			text : '',
			x : -20
		},
		xAxis : {
			categories : x,
			min : 0
		},
		yAxis : {
			min : 0,
			title : {
				text : ''
			},
			plotLines : [ {
				value : 0,
				width : 1,
				color : '#808080'
			} ]
		},
		tooltip : {
			valueSuffix : 'Kg',
			pointFormat : '{point.key}<br/>产量:{point.y}'
		},
		legend : {
			layout : 'vertical',
			align : 'right',
			verticalAlign : 'middle',
			x : 100,
			y : 100,
			borderWidth : 0
		},
		series : [ {
			name : '产量',
			data : y
		} ]
	});
}

var defaultfarmer = "<option value='0'>暂无负责人员<option>";
var defaultgroup = "<option value='0'>暂未分组<option>";
//下拉框检测.无内容的添加默认选项
function nonecheck(){
    _Q("select").not("#group_farmer,#group_farmer1,#group_farmer2,#group_farmer3,#group_groupId").each(function(){
			if(_Q(this).find("option").length==0){
				_Q(this).append(noneOption);
			}
		});
	_Q("#group_farmer,#group_farmer1,#group_farmer2,#group_farmer3").append(defaultfarmer);
    _Q("#group_groupId").append(defaultgroup);
}

//视频
var g_iWndIndex = 0;
function PTZZoomStop() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(11, true, {
            iWndIndex: g_iWndIndex,
            success: function (xmlDoc) {
                showOPInfo(oWndInfo.szIP + " 调焦停止成功！");
            },
            error: function () {
                showOPInfo(oWndInfo.szIP + "  调焦停止失败！");
            }
        });
    }
}
function PTZZoomout() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(11, false, {
            iWndIndex: g_iWndIndex,
            success: function (xmlDoc) {
                showOPInfo(oWndInfo.szIP + " 调焦-成功！");
            },
            error: function () {
                showOPInfo(oWndInfo.szIP + "  调焦-失败！");
            }
        });
    }
}
function PTZZoomIn() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(10, false, {
            iWndIndex: g_iWndIndex,
            success: function (xmlDoc) {
                showOPInfo(oWndInfo.szIP + " 调焦+成功！");
            },
            error: function () {
                showOPInfo(oWndInfo.szIP + "  调焦+失败！");
            }
        });
    }
}
//方向PTZ停止
function mouseUpPTZControl() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

	if (oWndInfo != null) {
		WebVideoCtrl.I_PTZControl(1, true, {
			success: function (xmlDoc) {
				showOPInfo(oWndInfo.szIP + " 停止云台成功！");
			},
			error: function () {
				showOPInfo(oWndInfo.szIP + " 停止云台失败！");
			}
		});
	}
}
//PTZ控制 9为自动，1,2,3,4,5,6,7,8为方向PTZ
var g_bPTZAuto = false;
function mouseDownPTZControl(iPTZIndex) {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		bZeroChannel = false,
		iPTZSpeed = 2,
		bStop = false;

	if (bZeroChannel) {// 零通道不支持云台
		return;
	}
	
	if (oWndInfo != null) {
		if (9 == iPTZIndex && g_bPTZAuto) {
			iPTZSpeed = 0;// 自动开启后，速度置为0可以关闭自动
			bStop = true;
		} else {
			g_bPTZAuto = false;// 点击其他方向，自动肯定会被关闭
			bStop = false;
		}

		WebVideoCtrl.I_PTZControl(iPTZIndex, bStop, {
			iPTZSpeed: iPTZSpeed,
			success: function (xmlDoc) {
				if (9 == iPTZIndex) {
					g_bPTZAuto = !g_bPTZAuto;
				}
				showOPInfo(oWndInfo.szIP + " 开启云台成功！");
			},
			error: function () {
				showOPInfo(oWndInfo.szIP + " 开启云台失败！");
			}
		});
	}
}
function PTZFoucusStop() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(12, true, {
            iWndIndex: g_iWndIndex,
            success: function (xmlDoc) {
                showOPInfo(oWndInfo.szIP + " 聚焦停止成功！");
            },
            error: function () {
                showOPInfo(oWndInfo.szIP + "  聚焦停止失败！");
            }
        });
    }
}

function PTZFoucusOut() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(13, false, {
            iWndIndex: g_iWndIndex,
            success: function (xmlDoc) {
                showOPInfo(oWndInfo.szIP + " 聚焦-成功！");
            },
            error: function () {
                showOPInfo(oWndInfo.szIP + "  聚焦-失败！");
            }
        });
    }
}
function PTZFocusIn() {
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex);

    if (oWndInfo != null) {
        WebVideoCtrl.I_PTZControl(12, false, {
            iWndIndex: g_iWndIndex,
            success: function (xmlDoc) {
                showOPInfo(oWndInfo.szIP + " 聚焦+成功！");
            },
            error: function () {
                showOPInfo(oWndInfo.szIP + "  聚焦+失败！");
            }
        });
    }
}
function showOPInfo(str){
	try{
		console.log(str);
	}catch(e){
		
	}
}
//新硬盘录像机开始预览方法
function newVideoPreview(szIP, iStreamType, iChannelID, bZeroChannel){
	// 开始预览 
	var iRet = WebVideoCtrl.I_StartRealPlay(szIP, {iStreamType: iStreamType, iChannelID: iChannelID, bZeroChannel: bZeroChannel});
	if (iRet == 0) { 
		showOPInfo("开启阅览成功...");
		_Q("#video_iframe4 .fdimg1").show();
   	 	_Q("#video_iframe4 .fdimg2").hide();
	} else {
		showOPInfo("开启阅览失败...");
		_Q("#video_iframe4 .fdimg1").hide();
   	 	_Q("#video_iframe4 .fdimg2").hide();
	}
	 _Q("#switch3").unbind("click");
     _Q("#switch3").bind("click",function(){
         _Q(this).closest(".vb").attr("class","videobut_ vb");
         clickStopRealPlay();
     });
}
//停止预览
function clickStopRealPlay() {
	var oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex),
		szInfo = "";

	if (oWndInfo != null) {
		var iRet = WebVideoCtrl.I_Stop();
		if (0 == iRet) {
			szInfo = "停止预览成功！";
		} else {
			szInfo = "停止预览失败！";
		}
		showOPInfo(oWndInfo.szIP + " " + szInfo);
	}
	_Q("#switch3").unbind("click");
    _Q("#switch3").bind("click",function(){
        _Q(this).closest(".vb").attr("class","videobut vb");
        newVideoPreview(strIP, 1, ChanNum1, bzChannel);
    });
}

function clickLogout() {
	if (strIP == "") {
		return;
	}
	var iRet = WebVideoCtrl.I_Logout(strIP);
	if (0 == iRet) {
		szInfo = "退出成功！";
	} else {
		szInfo = "退出失败！";
	}
	showOPInfo(strIP + " " + szInfo);
}

function resetFrameSize(){
    if(_Q("#krpano_iframe").is(":visible")){
        //_Q(".notPlant").css("left",_Q('#login4').width()/2-_Q(".notPlant").width()/2);
        //_Q(".notPlant").css("top",_Q("#mPane").height()/2-_Q(".notPlant").height()-16);
        var height = document.body.clientHeight;
        var width = document.body.clientWidth;
        var rightWidth =  _Q('#rightPane').width();
        _Q("#krpano_iframe").css({"width":width,"height":height,left:0,top:0});
        var self_width = width*0.75;
        var self_height = height*0.75;
        var of_top = (height-self_height)/2;
        var of_left = (width-self_width)/2;
        _Q("#krpano_iframe").css({"width":self_width,"height":self_height,"left":of_left,"top":of_top});
        var div_left = width/2+self_width/2;
	    _Q("#krpano_iframe").show();
	    _Q("#krpano_iframe_img").show();
	    _Q("#krpano_iframe_img").css({"position":"fixed","z-index":1000,"left":div_left,"top":of_top});
    }
}

function closeKrpanoFrame(){
    _Q("#krpano_iframe").hide();
    _Q("#krpano_iframe").attr("src","");
    _Q("#krpano_iframe_img").hide();
}


function getRealIp(ip,func){
	if(!ipMap.containsKey(ip)){
		if(re.test(ip)){
			ipMap.put(ip,ip);
			func(ip);
		}else{
			var url = workpath +"/util/cdServlet";
			_Q.ajax({
				type : "get",// 使用get方法访问后台
				url : url,// 要访问的后台地址
				data : "type=getIp&uname=" + ip,// 要发送的数据
				// complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
				success : function(msg) {
					if(msg==""){
						ipMap.put(ip,ip);
						func(ip);
					}else{
						ipMap.put(ip,msg);
						func(msg)
					}
				}
			});
		}
	}else{
		var realIp = ipMap.get(ip);
		func(realIp);
	}
}


function historyList_next(data){
	lastStr = JSON.parse(data);
}

function addGeo(map) {
	return ;
    var container = document.createElement("div");
    container.style.margin = "10px 31px 0px";
    container.style.cursor = "pointer";
    container.className = "geoClass";
    container.index = 1;
    container.id = "geoId";
    var img = document.createElement('img');
    img.src = geo_gray;
	img.style.width = '28px';
	img.style.height = '27px';
	container.appendChild(img);
    this.coordinate = null;
    this.map = map;
    this.div_ = container;
    google.maps.event.addDomListener(this.div_, 'click', function() {mylocation();});
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(this.div_);
}
//新版天气预报 2016-08-18
function getNewWeatherReport() {
	var d1 = "";
	if (arguments.length > 0) {
		d1 = "param=" + arguments[0] + "&";
	}
	var url = workpath + "/WeatherReport";
	_Q.ajax({
		type : "get",// 使用get方法访问后台
		dataType : "json",// 返回json格式的数据
		url : url,// 要访问的后台地址
		data : d1 + "area=" + _area,// 要发送的数据
		// complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
		success : function(msg) {// msg为返回的数据，在这里做数据绑定	
			if(typeof(msg.district_cn)=="undefined"){
				_Q(".envir-pointer-pop").hide();
				return;
			}
			if (!msg.isok){				
				//return;
			}else {				
				if (msg.pictureTypeSn == "d") {
					var tem = msg.pictureType;
					if (tem.length == 1)
						tem = "0" + tem;
					_Q('.weather').html('<img src="/asset/images/icon/day/' + tem + '.png" />');
				} else {
					var tem = msg.pictureType;
					if (tem.length == 1)
						tem = "0" + tem;
					_Q('.weather').html('<img src="/asset/images/icon/night/' + tem + '.png" />');
				}	
			}
			if(msg.waste_enterprise_name == null){
				_Q('.case').show();
				_Q('.case_y').hide();
			}else{
				_Q('.case').hide();
				_Q('.case_y').show();
				_Q('.case_y span').html('有污染(有'+msg.waste_enterprise_name.split("@#$").length+'家)');
			}
			_Q('.city').html('<img src="/asset/images/weather/resource/city.png" alt="">'+msg.district_cn+'<span class="county">•'+msg.name_cn+'</span>');
			
	/*		_Q(".envir-pointer-wap").css("cursor", "pointer").click(
					function() {
						window.location.href = workpath
								+ "/growth/WeatherForecast.seam?areaCode="
								+ msg.areacode;
					});*/
			_Q(".envir-pointer-pop").show();
		}
	});
}


// ]]>

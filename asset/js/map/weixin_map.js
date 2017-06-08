//<![CDATA[

var nowD = new Date();
var nowD_ = new Date(nowD.getFullYear(),nowD.getMonth(),nowD.getDate());
var nowD_2 = new Date(nowD.getFullYear(),nowD.getMonth()+1,nowD.getDate());

function formatFloat(src, pos)
			{
			    return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
			}
	var isIOS = false;
   var map;
   var drawingManager;
	var array = new Array();
	var array_mark= new Array();//第一级描点集合.
	var mark__index = 1;//第一级下标,取数据库
	var second__index = 1;
	var third__index = 1;
	var selectedShape;
	var mark1Array = new Array();//一级域
	var mark2Array = new Array();
	var mark3Array = new Array();
	var deviceArray = new Array();
	var videoArray = new Array();
	var krpanoArray = new Array();//全景
	var dbclick_ = 0;
	var device_index = 1;
	var video_index = 1;
	var krpano_index = 1;
	//无作物大棚图片
	var noneImage = new google.maps.MarkerImage(
		    workpath+"/asset/images/wt.png",
		    new google.maps.Size(20, 20),
		    new google.maps.Point(0, 0),
		    new google.maps.Point(10,10),
		    new google.maps.Size(20, 20));
	var moreImage = new google.maps.MarkerImage(
			workpath+"/asset/images/dt.png",
		    new google.maps.Size(20, 20),
		    new google.maps.Point(0, 0),
		    new google.maps.Point(10,10),
		    new google.maps.Size(20, 20));
	var nonesrc = workpath+"/asset/images/wt.png";
	var moresrc = workpath+"/asset/images/dt.png";
	var addsrc = workpath+"/asset/images/add_y.png";
	var addsrc_ = workpath+"/asset/images/add_y_.png";
	var devicesrc = workpath+"/asset/images/vidicon2.png";
	var weathersrc = workpath+"/asset/images/vidicon4.png";
	var moreanimal = workpath + "/asset/images/more_animal.png";
	var animalsrc = workpath + "/asset/images/animal_3.png";
	var addanimalsrc = workpath + "/asset/images/animal_4.png";
	var videosrc = workpath+"/asset/images/vidicon3.png";
	var krpanosrc = workpath+"/asset/images/krpanoimg2.png";
	var oneimg = workpath + "/asset/images/oneimg.png";
	var twoimg = workpath + "/asset/images/twoimg.png";
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
   //初始化地图参数  
	var lag;
	if(_center!=""){
		_center = _center.replace(/[()]/g, '');
		var yy = _center.split(",");
		lag = new google.maps.LatLng(parseFloat(yy[0]),parseFloat(yy[1]));
	}else{
		lag = new google.maps.LatLng(39.90627970711568, 116.3911771774292);
	}
	
 var mapOptions = {  
   center: lag,  
   zoom: defaultZoom,  
   mapTypeId: google.maps.MapTypeId.SATELLITE,
	streetViewControl: false,// 取消街景
  // disableDoubleClickZoom:true,
   mapTypeControl:false,
	//panControl:true,
	zoomControl:true,
	panControlOptions:{position:google.maps.ControlPosition.LEFT_TOP},
	zoomControlOptions:{position:google.maps.ControlPosition.RIGHT_TOP},
	scaleControl: true
 };  
  //div显示地图  
 map = new google.maps.Map(document.getElementById('map-canvas'),  
   mapOptions);  
  //绘画工具 设置   

////////
	//循环显示 经纬度  
	function showLonLat( arr){  
		for(var i=0; i<arr.length;i++){  
		//alert(arr[i]);  
		};  
	}   
   google.maps.event.addListener(map, 'click', function(){mapclick();});
	google.maps.event.addListener(map, 'dblclick', function(event){
		//alert(bermudaTriangle.Contains(event.latLng));
	 });
	/*var vb = navigator.userAgent.indexOf("MSIE")>0 ? true : false;
	if(vb){
		setTimeout(function(){
		loadfirst();
		loadsecond();
		loadthird();
		},0);
	}else{
		loadfirst();
		loadsecond();
		loadthird();
	}*/
	g_infowindow.set("content","");
	var center = new google.maps.LatLng(120,120);
	g_infowindow.setPosition(center);
	g_infowindow.set("maxWidth",242);
	g_infowindow.setMap(map);
	
	c_infowindow.set("content","<table width='240'>x</table>");
	c_infowindow.setPosition(center);
	c_infowindow.set("maxWidth",300);
	c_infowindow.setMap(map);
	
	weather_infowindow.set("content","<table width='240'>x</table>");
	weather_infowindow.setPosition(center);
	weather_infowindow.set("maxWidth",300);
	weather_infowindow.setMap(map);
	
	setTimeout(function(){xa();g_infowindow.setMap(null);
	c_infowindow.setMap(null);
	weather_infowindow.setMap(null);
	},10);
	setTimeout(function(){hove();},10);
	google.maps.event.addListenerOnce(map, 'idle', function(){
		var ua = navigator.userAgent.toLowerCase();	
		if (/iphone|ipad|ipod/.test(ua)) {
			isIOS = true;
		}
		setControlRight();
		setControlRightTop();
		mapZero();
		mapFirst();
		loadfirst();
		setTimeout(function(){_Q(".gm-style").find("div:eq(0)").find("div:eq(0)").next().hide();},500);
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
		obj.css("margin-right","20px");
		setTimeout(function(){setControlRight();}, 2000);
	}
}

function setControlRightTop(){
	var obj = _Q("#map-canvas").find('img[src="http://maps.gstatic.cn/mapfiles/api-3/images/tmapctrl.png"]').closest(".gmnoprint").parent();
	if(obj.length == 0){
		obj = _Q("#map-canvas").find('div[title="放大"]').closest(".gmnoprint").parent();
	}
	if(obj.length == 0){
		obj = _Q("#map-canvas").find('img[src="http://maps.gstatic.cn/mapfiles/api-3/images/tmapctrl_hdpipng"]').closest(".gmnoprint").parent();
	}
	var right = obj.css("margin-top");
	if(typeof(right) == "undefined" || right == "10px"){
		obj.css("margin-top","65px");
		setTimeout(function(){setControlRightTop();}, 2000);
	}
}

function zero_next(data){
	secondstr = JSON.parse(data)
	loadsecond();
}

function first_next(data){
	//var temp = JSON.parse(data)
	animalStr = thirdthird.animal;
	thirdstr = thirdthird.tunnelinfo;
	loadthird();
	setTimeout(function(){mapSecond();},2);
	initList();
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

mapclick = function(){
	if(_Q("#detail").is(":visible")){
		_Q("#detail").hide();
		if (selectedShape) {
         selectedShape.mianji=_Q("#detail").val();
	      selectedShape.type1=_Q("#type").val();
		}
	}
clearSelection();
};


//根据以知 点绘制图形  
var bermudaTriangle;
//检测点是否在polygon范围内;
google.maps.Polygon.prototype.Contains = function(point) {
       // ray casting alogrithm http://rosettacode.org/wiki/Ray-casting_algorithm
       var crossings = 0,
           path = this.getPath();

       // for each edge
       for (var i=0; i < path.getLength(); i++) {
           var a = path.getAt(i),
               j = i + 1;
           if (j >= path.getLength()) {
               j = 0;
           }
           var b = path.getAt(j);
           if (rayCrossesSegment(point, a, b)) {
               crossings++;
           }
       }

       // odd number of crossings?
       return (crossings % 2 == 1);

       function rayCrossesSegment(point, a, b) {
           var px = point.lng(),
               py = point.lat(),
               ax = a.lng(),
               ay = a.lat(),
               bx = b.lng(),
               by = b.lat();
           if (ay > by) {
               ax = b.lng();
               ay = b.lat();
               bx = a.lng();
               by = a.lat();
           }
           // alter longitude to cater for 180 degree crossings
           if (px < 0) { px += 360; };
           if (ax < 0) { ax += 360; };
           if (bx < 0) { bx += 360; };

           if (py == ay || py == by) py += 0.00000001;
           if ((py > by || py < ay) || (px > Math.max(ax, bx))) return false;
           if (px < Math.min(ax, bx)) return true;

           var red = (ax != bx) ? ((by - ay) / (bx - ax)) : Infinity;
           var blue = (ax != px) ? ((py - ay) / (px - ax)) : Infinity;
           return (blue >= red);

       }

    };
//区域绘画
    google.maps.Polygon.prototype.MyDbClick = function() {
    	alert(1);
    	this.ondblclick();
    };

//描点
 _mark = function(){
	drawingManager.setDrawingMode(google.maps.drawing.OverlayType.MARKER);
	  };
	  
		//加载描点及基地范围
		function loadfirst (){
			var a = 0;
			mark__index = markstr.length;
			for(var i = 0;i<markstr.length;i++){
				if(a==0)
					a=1;
				var array = markstr[i];
				var point = new google.maps.LatLng(array.coordinateX, array.coordinateY);
				 var marker = new google.maps.Marker({
				     position: point,
				     map: map,
				     title:array.name,
					 icon: 'asset/images/zb.png',
					 _name:array.name,
					 _id:array.id,
					 _index:i,
					 _coordinate_X:array.coordinateX,
					 _coordinate_Y:array.coordinateY
				 });
				array_mark.push(marker);
				//attachSecretMessage(marker, array);
				var pointStr = array.coordinateGroup;
				pointStr = pointStr.replace(/[()]/g, '');
				if(pointStr.length==0){
					continue;
				}
				if(a<2)
					a=2;
				var triangleCoords = [];  
				var strr = pointStr.split("_");
				var bounds = new google.maps.LatLngBounds();
				for(var y = 0;y<strr.length;y++){
					var yy = strr[y].split(",");
					var temp = new google.maps.LatLng(parseFloat(yy[0]),parseFloat(yy[1]));
					triangleCoords.push(temp);
					bounds.extend(temp);
				}
	            bermudaTriangle = new google.maps.Polygon({  
	              paths: triangleCoords,  
	              strokeColor: array.color, 
	              strokeOpacity: 0.8,  
	              strokeWeight: 4,  
	              fillColor: array.color,  
	              fillOpacity: 0.1,  
	              editable: false
	            });  
	            bermudaTriangle.isok=1;
	            bermudaTriangle._marker=marker;
	            bermudaTriangle._name=array.name;
	            bermudaTriangle.mianji=array.muNumber;
	            bermudaTriangle._contact=array.contact;
	            bermudaTriangle._phone=array.phone;
	            bermudaTriangle._description=array.description;
	            bermudaTriangle._coordinate_group=array.coordinateGroup;
	            bermudaTriangle._address=array.address;
	            if(!bounds.isEmpty()){
	            	var zoom = getBoundsZoomLevel(bounds);
	            	if(zoom>0){
	            		bermudaTriangle._zoom = zoom;
	            		if(i==0){
	            			map.setZoom(zoom);
	            		}
	            	}
	            }
	            marker._ploygon=bermudaTriangle;
	            mark1Array.push(bermudaTriangle);
	            loadFirstPloygon(bermudaTriangle);
	            new Wenzi(point,array.name,map,1);
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
		
		//加载区域
		function loadsecond(){
			second__index = secondstr.length;
			for(var i = 0;i<secondstr.length;i++){
				var array = secondstr[i];
				var pointStr = array.coordinateGroup;
				pointStr = pointStr.replace(/[()]/g, '');
				if(pointStr.length==0)
					break;
				var triangleCoords = [];  
				var bounds = new google.maps.LatLngBounds();
				var strr = pointStr.split("_");
				for(var y = 0;y<strr.length;y++){
					var yy = strr[y].split(",");
					var temp = new google.maps.LatLng(parseFloat(yy[0]),parseFloat(yy[1]));
					triangleCoords.push(temp);
					bounds.extend(temp);
				}
	            bermudaTriangle = new google.maps.Polygon({  
	              paths: triangleCoords,  
	              strokeColor: array.color,  
	              strokeOpacity: 0.45,  
	              strokeWeight: 3,  
	              fillColor: array.color,  
	              fillOpacity: 0.45,  
	              editable: false
	            });  
	            /*var marker = new google.maps.Marker({
				     position:bounds.getCenter(),
				     map: map,
					 icon: '../asset/images/zb.png'
				 });*/
	            bermudaTriangle._index=i;
	            bermudaTriangle._name=array.name;
	            bermudaTriangle.mianji=array.muNumber;
	            bermudaTriangle._id=array.id;
	            bermudaTriangle._base_id=array.base;
	            bermudaTriangle._description=array.description;
	            bermudaTriangle._group=array.coordinateGroup;
	            mark2Array.push(bermudaTriangle);
	            loadSecondPloygon(bermudaTriangle,bounds);
	            new Wenzi(bounds.getCenter(),array.name,map,2);
	            bermudaTriangle.setMap(map);
			}
		}
		//加载大棚
		function loadthird(){
			third__index = thirdstr.length;
			for(var i = 0;i<thirdstr.length;i++){
				var array = thirdstr[i];
				var pointStr = array.coordinateGroup;
				pointStr = pointStr.replace(/[()]/g, '');
				if(pointStr.length==0)
					continue;
				var triangleCoords = [];  
				var bounds = new google.maps.LatLngBounds();
				var strr = pointStr.split("_");
				for(var y = 0;y<strr.length;y++){
					var yy = strr[y].split(",");
					var temp = new google.maps.LatLng(parseFloat(yy[0]),parseFloat(yy[1]));
					triangleCoords.push(temp);
					bounds.extend(temp);
				}
	            bermudaTriangle = new google.maps.Polygon({  
	              paths: triangleCoords,  
	              strokeColor: array.color,  
	              strokeOpacity: 0.8,  
	              strokeWeight: 2,  
	              fillColor: array.color,  
	              fillOpacity: 0.5,  
	              editable: false,
	              zIndex:google.maps.Marker.MAX_ZINDEX + 1
	            });  
	            
	            if(array.latitude==0 || typeof(array.latitude) == "undefined"){
	            	bermudaTriangle.group_x=bounds.getCenter().lat();
	            	bermudaTriangle.group_y=bounds.getCenter().lng();
	            }  else{
	            	bermudaTriangle.group_x=array.latitude;
	            	bermudaTriangle.group_y=array.longitude;
	            }
	            if(array.tunnelName=="一区15号棚")
	            	console.log("");
	            bermudaTriangle._name=array.tunnelName;
	            bermudaTriangle._id=array.tunnelInfoId;
	            bermudaTriangle._group_parent_id=array.partId;
	            bermudaTriangle._index=i;
	            bermudaTriangle._group=array.coordinateGroup;
	            bermudaTriangle.mianji=array.muNumber;
	            bermudaTriangle._group_type=array.plantEnvTypeId;
	            bermudaTriangle._keeperId=array.keeperId;
	            bermudaTriangle._masterId=array.masterId;
	            bermudaTriangle._long=array.tunnelLong;
	            bermudaTriangle._width=array.tunnelWide;
	            bermudaTriangle._height=array.tunnelHigh;
	            bermudaTriangle._envlist = array.envList;
	            bermudaTriangle._muarea = array.area;
	            bermudaTriangle._device_id = array.diviceId;
	            bermudaTriangle._base_id = array.baseId;
	            bermudaTriangle._bounds = bounds;
	            mark3Array.push(bermudaTriangle);
	            bermudaTriangle.setMap(map);
	            
			}
		}
		
		function loadthird_next(){
			for(var i = 0;i<mark3Array.length;i++){
				var bermudaTriangle = mark3Array[i];
				loadThirdPloygon(bermudaTriangle, bermudaTriangle._bounds);
	            var centerpoint = new google.maps.LatLng(parseFloat(bermudaTriangle.group_x),parseFloat(bermudaTriangle.group_y));
				var wenzi = new Wenzi(centerpoint, bermudaTriangle._name, map, 3);
				bermudaTriangle._wenzi=wenzi;
			}
		}

		
		function clearMap(){
			clearSelection();
			setMapNotNull();
			//drawingManager.setDrawingMode(null);			
		}
		//加载基地第二步
		function loadFirstPloygon(bermudaTriangle){
			var radius = bermudaTriangle.getPath();   
           google.maps.event.addDomListener(bermudaTriangle, 'dblclick', function(event){//alert(1)
        	   return;
            }); 
			
		}
		
		//加载区域第二步
		function loadSecondPloygon(bermudaTriangle,bounds){
			var radius = bermudaTriangle.getPath();   
			google.maps.event.addDomListener(bermudaTriangle, 'dblclick', function(
					event) {// alert(1)
				return;
					}); 
		}
		
		//加载大棚第三步
		function loadThirdPloygon(bermudaTriangle,bounds){
			var radius = bermudaTriangle.getPath();   
			//if(bermudaTriangle._id==810){
			var uss;
			var lat = bermudaTriangle.group_x;
			var lng = bermudaTriangle.group_y;
			var left = new google.maps.LatLng(lat+0.0000422,lng+0.000055);
			var right = new google.maps.LatLng(lat-0.000042,lng-0.000055);
			var bounds2 = new google.maps.LatLngBounds(right,left);
			var isrc = "";
			var tempb = false;
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
					if (nowPlant[0].imground == ""){
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
			usgs = new USGSOverlay(bounds2,isrc,map,bermudaTriangle,tempb);
			bermudaTriangle._usgs = usgs;
			
		}
		
		//加载描点第二部
		function attachSecretMessage(marker,array){
			var contentString = "<div style='width:200px'>"+array.name+"<br/>联系人:"+array.contact+"<br/>电话:"+array.phone+"<br/>地址:"+array.address+"<br/>描述:"+array.description+"</div>"; 
			var infowindow = new google.maps.InfoWindow({
				content: contentString,
				maxWidth: 400,
				disableAutoPan:true
				});
			marker._infowindow=infowindow;
			google.maps.event.addListener(marker, 'click', function() {
			    infowindow.open(marker.get('map'), marker);
			    map.setCenter(marker.getPosition());
			    if(typeof(marker._ploygon) != "undefined"){
			    	map.setZoom(marker._ploygon._zoom);
			    }else{
			    	map.setZoom(16);
			    }
			  });
			google.maps.event.addListener(marker, 'dblclick', function() {
					_Q("#mark_info_name").val(marker._name);
					_Q("#mark_info_index").val(marker._index);	
					_Q("#mark_info_x").val(marker._coordinate_X);
					_Q("#mark_info_y").val(marker._coordinate_Y);
					_Q("#mark_info_id").val(marker._id);
					_Q(".rightNo").hide();
	    			_Q(".rightNo1").show();
	    			_Q("#divtittle").text("编辑基地位置");
	    			_Q("#divFloatToolsView_").animate({width: window.screen.width/4+17},800,function(){});
	    			_Q(".tc_top_03").show();
	    			//_Q("#searchLi").animate({right: window.screen.width/4+10},800,function(){});
	    			_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
	    			_Q(".btnOpen").hide();
			  });
		}	  
		
		//四舍五入
		function CurrencyFormatted(amount) {
		    var i = parseFloat(amount);
		    if(isNaN(i)) { i = 0.00; }
		    var minus = '';
		    if(i < 0) { minus = '-'; }
		    i = Math.abs(i);
		    i = parseInt((i + .005) * 100);
		    i = i / 100;
		    s = new String(i);
		    if(s.indexOf('.') < 0) { s += '.00'; }
		    if(s.indexOf('.') == (s.length - 2)) { s += '0'; }
		    s = minus + s;
		    return s;
		}
		//取消marker和infowindow的显示
		function setMapNull(){
			for(var i = 0 ;i<mark1Array.length;i++){
				var polygon = mark1Array[i];
				var marker = polygon._marker;
				marker.setMap(null);
			}
			for(var i = 0;i<mark2Array.length;i++){
				var ploygon = mark2Array[i];
				var marker = ploygon._marker;
				if(marker)
				marker.setMap(null);
			}
		}
		//marker和infowindow的显示
		function setMapNotNull(){
			for(var i = 0 ;i<mark1Array.length;i++){
				var polygon = mark1Array[i];
				var marker = polygon._marker;
				marker.setMap(map);
			}
			for(var i = 0;i<mark2Array.length;i++){
				var ploygon = mark2Array[i];
				var marker = ploygon._marker;
				if(marker)
				marker.setMap(map);
			}
		}
		//String的endwith方法
		String.prototype.endWith=function(str){
			if(str==null||str==""||this.length==0||str.length>this.length)
			  return false;
			if(this.substring(this.length-str.length)==str)
			  return true;
			else
			  return false;
			return true;
			};

		//String的startwith方法
		String.prototype.startWith=function(str){
			if(str==null||str==""||this.length==0||str.length>this.length)
			  return false;
			if(this.substr(0,str.length)==str)
			  return true;
			else
			  return false;
			return true;
			};
		function USGSOverlay(bounds, image, map,obj,tempb) {
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
			  div.style.index="888";
			  div.style.borderWidth = '0px';
			  div.style.position = 'absolute';
			  var img = document.createElement('img');
			  img.src = this.image_;
			  img.style.width = '100%';
			  img.style.height = '100%';
			  img.style.position = "absolute";
			  var img2 = document.createElement('img');
			  img2.src = workpath+"/asset/images/touming.png";
			  img2.style.position = "absolute";
			  img2.style.width = '100%';
			  img2.style.height = '100%';
			  div.appendChild(img);
			  if(this.tempb_)
				  div.appendChild(img2);
			  this.div_ = div;
			  var panes = this.getPanes();
			  panes.overlayImage.appendChild(this.div_);
			  var _self=this;
			google.maps.event.addDomListener(this.div_, 'click', function(event){
				map.setCenter(_self.bounds_.getCenter());
				map.setZoom(19);showInfos(_self,event);
				setTimeout(function(){setSelection(_self.parents);},500);});
			google.maps.event.addDomListener(this.div_, 'click', function(event){});
			};
			USGSOverlay.prototype.draw = function() {
			  var overlayProjection = this.getProjection();
			  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
			  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
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
			
			
			function showInfos(obj, event) {
				var box_title = "";
				var box_plant = "";
				var box_area = "";
				var box_image = "";
				var box_content = "";
				var b = true;
				var _obj_;
				var temp = [];
				var tlength = 0;
				if(obj.parents._group_type == 8){
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
					}else{
						master = "暂无负责人员";
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
					var master = "";
					if (mast.length > 0) {
						master = mast.html();
					}
					if (nowPlant.length == 0) {
						box_title = obj.parents._name;
						box_plant = "";
						box_area = obj.parents.mianji;
						box_area = parseFloat(box_area).toFixed(2);
						box_image = addsrc;
						box_content = "暂无作物";
						_Q(".zw_bgt2").css("cursor", "pointer");
						b = false;
						_Q(".win_date_1,.win_date_2").hide();
					} else if (nowPlant.length == 1) {
						box_title = obj.parents._name;
						box_plant = nowPlant[0].breed_name;
						box_area = obj.parents.mianji;
						box_image = (nowPlant[0].imground == "" ? nonesrc : nowPlant[0].imground+"@100h_100w|100-1ci.png");
						if(box_image=="")
							box_image = nonesrc;
						box_content = "种植日期："+nowPlant[0].start_time;
						if(nowPlant[0].ent_time!=""){
							content+=" - "+nowPlant[0].end_time;
						}
						_Q(".zw_bgt2").attr("onclick","addPlant()");
						_Q(".zw_bgt2").css("cursor","default");
					} else if (nowPlant.length > 1) {
						box_title = obj.parents._name;
						box_area = obj.parents.mianji;
						box_image = moresrc;
						box_content = "种植： ";
						for(var i = 0;i<nowPlant.length;i++){
							box_content+=nowPlant[i].breed_name+" ";
						}
						_Q(".zw_bgt2").attr("onclick","addPlant()");
						_Q(".zw_bgt2").css("cursor","default");
					}
					_Q(".div_dt2").html(box_title);
					_Q(".div_dt4").html(box_plant);
					_Q(".div_dt3").html(box_area+"亩");
					_Q(".zw_libg_img2").attr("src",box_image);
					_Q(".div_dt55").html(box_content);
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
				}
				
			}
			
			function xa (){
				  if(ie7){
					_Q(".gm-style-iw").css("overflow","visible");
					_Q(".gm-style-iw div").css("overflow","visible");
				  }else{
					_Q(".gm-style-iw").css("overflow","inherit");
					_Q(".gm-style-iw div").css("overflow","inherit");
				  }
				  _Q(".div_012").css({"width":"241px","margin-left":"-10px"});
			}
				
			function hove(){
				 _Q('.div_012').hover(function(){
				 _Q(this).find('.gooleedit').show();
				 },function(){
				 _Q(this).find('.gooleedit').hide();
				 });
			}
			
			var g_infowindow = new google.maps.InfoWindow({
				maxWidth:242
			});
			
			var weather_infowindow = new google.maps.InfoWindow({
				maxWidth:242
			});
			
			var c_infowindow = new google.maps.InfoWindow({
				maxWidth:242
			});
			function nothing(){
			}
			
			var map1 = new JsMap();//区域
			var map2 = new JsMap();//大棚类别
			var map3 = new JsMap();//品种类型
			var map4 = new JsMap();//状态
			var map5 = new JsMap();
			function initList (){
				map1.clear();//区域
				map2.clear();//大棚类别
				map3.clear();//品种类型
				map4.clear();//状态
				map5.clear();
				for(var i = 0;i<allList.length;i++){
					var obj = allList[i];
					var tunnel_info_id = obj.tunnel_info_id;
					//if(tunnel_info_id == 817)
					//	console.log("789");
					if(obj.real_plant_id>0){
						if(map5.containsKey(tunnel_info_id)){
							var tempArray = map5.get(tunnel_info_id);
							tempArray.push(obj);
							map5.put(tunnel_info_id,tempArray);
						}else{
							var tempArray = new Array();
							tempArray.push(obj);
							map5.put(tunnel_info_id,tempArray);
						}
					}
				}
			}
			
			
			
			Array.prototype.del = function(n) {  
				if(n<0)
					return this;
				else
					return this.slice(0,n).concat(this.slice(n+1,this.length));
			} ;
			
		/**
		    a        array    要操作的数组
		    index    int        要插入的位置
		    num        obj        要插入的值
		*/
		function insert(a , index , num){
		    var temp = a.splice(index);
		    return a.concat(num,temp);
		}
		
		
		var CustomOverlay = function(map,imgsrc,latlng,arr)
	    {
	        this.polygons = [];
	        this.map = map;
	        this.div = null;
	        this.setMap(map);
	        this.imgsrc_ = imgsrc;
	        this.latlng_ = latlng;
	        this.arr = arr;
	    };
	    CustomOverlay.prototype = new google.maps.OverlayView();
	    
	    CustomOverlay.prototype.onAdd = function()
	    {
	        var div = document.createElement("DIV");
			div.id="div_id";
	        div.style.border = "none";
	        div.style.borderWidth = "0px";
	        div.style.position = "absolute";
	        //div.style.height="0px";
	        div.style.visibility = "visible";
			div.draggable=true;
	        this.div = div;
	        var tempThis = this;
	        this.addPolygon(this.latlng_);
			this.getPanes().floatShadow.appendChild(div);
			google.maps.event.addDomListener(this.div, 'click', function(event){
				clearMap();
				event.cancelBubble = true;
	            if(event.stopPropagation){
	            	event.stopPropagation();
	            }
	        });
			google.maps.event.addDomListener(this.div, 'mousedown', function(event){
				clearMap();
				event.cancelBubble = true;
	            if(event.stopPropagation){
	            	event.stopPropagation();
	            }
	        });
			google.maps.event.addDomListener(this.div, 'dblclick', function(event){
				clearMap();
				event.cancelBubble = true;
	            if(event.stopPropagation){
	            	event.stopPropagation();
	            }
	        });
	    };
	    CustomOverlay.prototype.draw = function()
	    {
	        var divPixel = this.getProjection().fromLatLngToDivPixel(this.quadrilateral.latLng);
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
				}else {
					db = new google.maps.LatLng(lat + 0.0000424, lng + 0.000055);
					xn = new google.maps.LatLng(lat - 0.000045, lng - 0.000060);
				}
				var bounds2 = new google.maps.LatLngBounds(xn, db);//西南,东北
				
		      var sw = this.getProjection().fromLatLngToDivPixel(bounds2.getSouthWest());
			  var ne = this.getProjection().fromLatLngToDivPixel(bounds2.getNorthEast());
			  this.quadrilateral.shape.style.left = sw.x + "px";
		        this.quadrilateral.shape.style.top = ne.y + "px";
			 this.quadrilateral.shape.style.width=(ne.x - sw.x) + 'px';
			  this.quadrilateral.shape.style.height = (sw.y - ne.y) + 'px';
	    }
	    CustomOverlay.prototype.onRemove = function()
	    {
	        //Not Implemented Here
	    }
	    
	    CustomOverlay.prototype.addPolygon = function(latLng)
	    {
	        var shape = document.createElement("div");
	        shape.className = "customPolygon";
	        shape.style.position = "relative";
			var img = document.createElement('img');
			if(this.arr.device_==1){
				img.src = devicesrc;
			}else if(this.arr.device_==2){
				img.src = weathersrc;
			}else if(this.arr.device_==3){
				img.src = videosrc;
			}else if(this.arr.device_==4){
		        img.src = krpanosrc;
		    }
			  img.style.width = '100%';
			  img.style.height = '100%';
			  shape.appendChild(img);
	        var tempThis = this;
	        this.div.setAttribute("aa",this.arr.device_name);
	        this.div.appendChild(shape);
			//setTimeout(function(){move(tempThis,shape);},500);
			clic(tempThis,shape);
	        this.quadrilateral = {
	            shape:shape,
	            latLng:latLng
	        };
	    };
	    
	    var tempDevice;
		var tempCustom;
	function clic(tempThis,shape){
		_Q(shape).click(function(){
	        if(tempThis.arr.device_==1){
	        	tempDevice = tempThis;
    			_Q.getJSON(workpath+"/environmentaldata?sn="+ tempDevice.arr.device_sn+ "&type=0"
	        	).done(function(data){
	        		map.setCenter(tempDevice.quadrilateral.latLng);  
		        	map.setZoom(19);
	        		var projection = tempDevice.getProjection();
	        		var piexl = projection.fromLatLngToContainerPixel(tempDevice.quadrilateral.latLng);
	        		var topp;
	        		if(piexl.y<(_Q(".maptck").height())){
	        			piexl.y = piexl.y-(_Q(".maptck").height()-piexl.y);
	        			topp = 0;
	        		}else{
	        			topp = _Q("#map-canvas").height()/2-_Q(".maptck").height();
	        		}
	        		_Q('#login4').show();
	        		_Q(".maptck").show();
	        		_Q(".maptck").css("left",_Q('#map-canvas').width()/2-_Q(".maptck").width()/2);
	        		_Q(".maptck").css("top",topp);
	        		var latlng = projection.fromContainerPixelToLatLng(piexl);
	        		map.setCenter(latlng);
	        		map.setZoom(19);
	        		if(tempDevice.arr.device_type_id==101)
						_Q(".maptck #titlefont").html("奥科美二合一传感器");
					else if(tempDevice.arr.device_type_id==102)
						_Q(".maptck #titlefont").html("奥科美四合一传感器");
					else if(tempDevice.arr.device_type_id==103)
						_Q(".maptck #titlefont").html("奥科美六合一传感器");
	        		if(data.airTemp==undefined){
	        			_Q(".maptck .t1_sn").html("编号："+tempDevice.arr.device_sn);
	    				_Q(".maptck .t1_airTemp").html("暂无数据");
	    				_Q(".maptck .t1_airHumidity").html("");
	    				_Q(".maptck .t1_soilTemp").html("");
	    				_Q(".maptck .t1_soilHumidity").html("");
	    				_Q(".maptck .t1_ludian").html("");
	    				_Q(".maptck .t1_illumination").html("");
	    				_Q(".maptck .t1_co2").html("");
	    				_Q(".maptck .ludian").hide();
		    			_Q(".maptck .t1_gentime").html("");
		    			_Q(".maptck .ckxx").hide();
		    			_Q(".maptck .ckxx").unbind("click");
	        		}else{
	        			_Q(".maptck .t1_sn").html("编号："+tempDevice.arr.device_sn);
	        			_Q(".maptck .ludian").show();
		    			if(parseFloat(data.airTemp)>-99)
		    				_Q(".maptck .t1_airTemp").html(parseFloat(data.airTemp).toFixed(1)+" ℃");
		    			else
		    				_Q(".maptck .t1_airTemp").html("");
		    			
		    			if(parseFloat(data.airHumidity)>-99)
		    				_Q(".maptck .t1_airHumidity").html("湿度："+parseFloat(data.airHumidity).toFixed(1)+" %");
		    			else
		    				_Q(".maptck .t1_airHumidity").html("");
		    			
		    			if(parseFloat(data.soilTemp)>-99)
		    				_Q(".maptck .t1_soilTemp").html("温度 "+parseFloat(data.soilTemp).toFixed(1)+" ℃");
		    			else
		    				_Q(".maptck .t1_soilTemp").html("");
		    				
		    			if(_Q(".maptck .t1_soilTemp").html()==""){
		    				if(parseFloat(data.soilHumidity)>-99)
			    				_Q(".maptck .t1_soilTemp").html("湿度 "+parseFloat(data.soilHumidity).toFixed(1)+" ℃");
			    			else
			    				_Q(".maptck .t1_soilTemp").html("");
		    			}else{
		    				if(parseFloat(data.soilHumidity)>-99)
			    				_Q(".maptck .t1_soilHumidity").html("湿度 "+parseFloat(data.soilHumidity).toFixed(1)+" ℃");
			    			else
			    				_Q(".maptck .t1_soilHumidity").html("");
		    			}
		    			if(parseFloat(data.ludian)>-99)
		    				_Q(".maptck .t1_ludian").html("露点："+parseFloat(data.ludian).toFixed(1)+"%");
		    			else
		    				_Q(".maptck .t1_ludian").html("");
		    			
		    			if(parseFloat(data.illumination)>-99)
		    				_Q(".maptck .t1_illumination").html(parseFloat(data.illumination).toFixed(1)+" LUX");
		    			else
		    				_Q(".maptck .t1_illumination").html("");
		    			
		    			if(parseFloat(data.co2)>-99)
		    				_Q(".maptck .t1_co2").html(parseFloat(data.co2).toFixed(1)+" ppm");
		    			else
		    				_Q(".maptck .t1_co2").html("");
		    			
		    			_Q(".maptck .t1_gentime").html("采集时间："+data.genTime);
		    			_Q(".maptck .ckxx").show();
		    			_Q(".maptck .ckxx").unbind("click");
		    			_Q(".maptck .ckxx").bind("click",function(){
		    				if(isIOS){
		    					try{
			    					window.webkit.messageHandlers.sensor.postMessage({body: tempDevice.arr.device_id});
			    				}catch(e){}
		    				}else{
		    					try{
			    					window.mapObject.sensor(tempDevice.arr.device_id);
			    				}catch(e){}
		    				}
	    				});
	        		}
	        	});
	        }else if(tempThis.arr.device_==2){
	        	map.setCenter(tempThis.quadrilateral.latLng);  
	        	map.setZoom(19);
	        	tempCustom = tempThis;
        		_Q(".qixz .t2_sn").html("编号："+tempThis.arr.device_sn);
        		var projection = tempThis.getProjection();
        		var piexl = projection.fromLatLngToContainerPixel(tempThis.quadrilateral.latLng);
        		var topp;
        		if(piexl.y<(_Q(".qixz").height())){
        			piexl.y = piexl.y-(_Q(".qixz").height()-piexl.y);
        			topp = 0;
        		}else{
        			topp = _Q("#map-canvas").height()/2-_Q(".qixz").height();
        		}
        		_Q('#login4').show();
        		_Q(".qixz").show();
        		_Q(".qixz").css("left",_Q('#map-canvas').width()/2-_Q(".qixz").width()/2);
        		_Q(".qixz").css("top",topp);
        		var latlng = projection.fromContainerPixelToLatLng(piexl);
        		map.setCenter(latlng);
        		map.setZoom(19);
        		
        		_Q(".qixz .qckxx2").unbind("click");
    			_Q(".qixz .qckxx2").bind("click",function(){
    				if(isIOS){
    					try{
    						window.webkit.messageHandlers.weather.postMessage({body: tempThis.arr.device_id});
        				}catch(e){}
    				}else{
    					try{
    						window.mapObject.weather(tempThis.arr.device_id);
        				}catch(e){}
    				}
    			});
	        	findWeatherData(tempThis.arr.device_sn,tempThis.arr.device_id);
	        }else if(tempThis.arr.device_==3){
	        	
	        	if(isIOS){
					try{
						window.webkit.messageHandlers.camera.postMessage({body: tempThis.arr.video_id});
    				}catch(e){}
				}else{
					try{
						window.mapObject.camera(tempThis.arr.video_id);
    				}catch(e){}
				}
	        	return;
	        	if(tempThis.arr.video_access_way==null||tempThis.arr.video_access_way==1){
	        		_Q('#login3').show();
		        	_Q("#video_iframe2").show();
		        	strIP = tempThis.arr.video_app_ip;
			        strPort = tempThis.arr.video_app_port;
			        strName1 = tempThis.arr.video_app_username;
			        strPwd1 = tempThis.arr.video_app_password;
			        ChanNum1 = tempThis.arr.video_app_device_video_channel_no;
			        cameraID1 = tempThis.arr.video_app_device_video_channel_no;
		        	setTimeout(function(){StartPlayView();
		        	var OCXobj = document.getElementById("PlayViewOCX");
		        	if(OCXobj.IsWndPreview(0)==-1){
		        		StartPlayView();
		        	}
		        	},1);
	        		
	        	}else{
	        		_Q('#login3').show();
	        		_Q("#video_iframe").show();
		        	szAccount= tempThis.arr.video_sn;
					szRegIP = tempThis.arr.video_ip;
	 				password = tempThis.arr.video_password;
					username = tempThis.arr.video_username;
					channelNo = tempThis.arr.video_channel_no;
		        	openVideo();
	        	}
	        	/**/
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
	
	function closeCgq(){
		_Q(".maptck").hide();
		_Q('#login4').hide();
	}
	
	function closeQxz(){
		_Q(".qixz").hide();
		_Q('#login4').hide();
	}
	
	function closeVideo(){
		try{
		StopPlay();
		}catch(e){
			
		}
		_Q('#login3').hide();
		
		_Q("#video_iframe").hide();
	}
	
	function closeVideo2(){
		try{
			StopPlayView();
		}catch(e){
			
		}
		_Q('#login3').hide();
		_Q("#video_iframe2").hide();
	}
	
	function findWeatherData_next(data){
		if(data == ""){
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
			_Q(".qixz .qckxx2").hide();
			_Q(".qixz .qckxx2").unbind("click");
		}else{
			eval("var tempp = "+data);
			if(parseFloat(tempp.air_temp)>-99)
				_Q(".qixz .t2_air_temp").html(tempp.air_temp+" ℃");
			else
				_Q(".qixz .t2_air_temp").html("");
			
			if(parseFloat(tempp.air_humidity)>-99)
				_Q(".qixz .t2_air_humidity").html("湿度 "+tempp.air_humidity+" %");
			else
				_Q(".qixz .t2_air_humidity").html("");
			
			if(parseFloat(tempp.soil_temp)>-99)
				_Q(".qixz .t2_soil_temp").html("温度 "+tempp.soil_temp+" ℃");
			else
				_Q(".qixz .t2_soil_temp").html("");
			
			if(parseFloat(tempp.soil_humidity)>-99){
				if(_Q(".qixz .t2_soil_temp").html()==""){
					_Q(".qixz .t2_soil_temp").html("湿度 "+tempp.soil_humidity+" %");
					_Q(".qixz .t2_soil_humidity").html("");
				}else{
					_Q(".qixz .t2_soil_humidity").html("湿度 "+tempp.soil_humidity+" %");
				}
			}else
				_Q(".qixz .t2_soil_humidity").html("");
			
			if(parseFloat(tempp.soil_humidity2)>-99){
				if(_Q(".qixz .t2_soil_temp").html()==""){
					_Q(".qixz .t2_soil_temp").html("湿度2 "+tempp.soil_humidity2+" %");
					_Q(".qixz .t2_soil_humidity2").html("");
				}else if(_Q(".qixz .t2_soil_humidity").html()==""){
					_Q(".qixz .t2_soil_humidity").html("湿度2 "+tempp.soil_humidity2+" %");
					_Q(".qixz .t2_soil_humidity2").html("");
				}else{
					_Q(".qixz .t2_soil_humidity2").html("湿度2 "+tempp.soil_humidity2+" %");
				}
			}else
				_Q(".qixz .t2_soil_humidity2").html("");
			
			if(parseFloat(tempp.illumination)>-99)
				_Q(".qixz .t2_illumination").html("光照"+tempp.illumination+"LUX");
			else
				_Q(".qixz .t2_illumination").html("");
				

			if(parseFloat(tempp.solar_radiation)>-99){
				if(_Q(".qixz .t2_illumination").html()==""){
					_Q(".qixz .t2_illumination").html("辐射 "+tempp.solar_radiation+"μm");
					_Q(".qixz .t2_solar_radiation").html("");
				}else
					_Q(".qixz .t2_solar_radiation").html("辐射 "+tempp.solar_radiation+"μm");
			}
			else
				_Q(".qixz .t2_solar_radiation").html("");
			
			_Q(".qixz .t2_wind_velocity").html(tempp.wind_velocity +" "+tempp.wind_direction);
			if(parseFloat(tempp.atmospheric_pressure)>-99)
				_Q(".qixz .t2_atmospheric_pressure").html(tempp.atmospheric_pressure+" hPa");
			else
				_Q(".qixz .t2_atmospheric_pressure").html("");
			
			if(tempp.rainfallS=="null")
				_Q(".qixz .t2_rainfallS").html("");
			else
				_Q(".qixz .t2_rainfallS").html(""+tempp.rainfallS+" mm");
			
			if(parseFloat(tempp.pm25)>-99)
				_Q(".qixz .pm25").html(tempp.pm25);
			else
				_Q(".qixz .pm25").html("");
			
			_Q(".qixz .t2_gen_time").html("采集时间 :"+tempp.gen_time);
			
			var a1 = false;
			_Q(".qixz .shujutd1").each(function(index){
				if(_Q(this).html()!=""&&index!=0){
					a1 = true;
					return false;
				}
			})
			if(!a1)
				_Q(".qixz .shujutd1").hide();
			else
				_Q(".qixz .shujutd1").show();
			
			var a2 = false;
			_Q(".qixz .shujutd2").each(function(index){
				if(_Q(this).html()!=""&&index!=0){
					a2 = true;
					return false;
				}
			})
			if(!a2)
				_Q(".qixz .shujutd2").hide();
			else
				_Q(".qixz .shujutd2").show();
			
			
			var a3 = false;
			_Q(".qixz .shujutd3").each(function(index){
				if(_Q(this).html()!=""&&index!=0){
					a3 = true;
					return false;
				}
			})
			if(!a3)
				_Q(".qixz .shujutd3").hide();
			else
				_Q(".qixz .shujutd3").show();
			
			
			var a4 = false;
			_Q(".qixz .shujutd4").each(function(index){
				if(_Q(this).html()!=""&&index!=0){
					a4 = true;
					return false;
				}
			})
			if(!a4)
				_Q(".qixz .shujutd4").hide();
			else
				_Q(".qixz .shujutd4").show();
			
			if(_Q(".td1_:eq(1)").html()=="")
				_Q(".td1_").hide();
			else
				_Q(".td1_").show();
			
			if(_Q(".td2_:eq(1)").html()=="")
				_Q(".td2_").hide();
			else
				_Q(".td2_").show();
			
			if(_Q(".td3_:eq(1)").html()==" ")
				_Q(".td3_").hide();
			else
				_Q(".td3_").show();
			
			_Q(".qixz .qckxx2").show();
		}
	}
	
	function loadfourth(){
		for(var i = 0;i<deviceStr.length;i++){
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
			var latlng = new google.maps.LatLng(device.coordinateX,device.coordinateY);
			arr._index = i;
			if(arr.device_==1){
				var tunnel = checkPointTunnel(latlng);
				if(tunnel!=null&&tunnel._device_id==device.id){
					arr.device_tunnel_id = tunnel._id;
					var custom = new CustomOverlay(map,"",latlng,arr);
					tunnel.device_ = custom;
					deviceArray.push(custom);
				}else{
					//custom.setMap(null);
					//custom.div.style.display="none";
				}
			}else{
				var custom = new CustomOverlay(map,"",latlng,arr);
				deviceArray.push(custom);
			}
		}
		device_index = deviceStr.length;
	}
	
	function loadfifth(){
		for(var i = 0;i<videoStr.length;i++){
			var temp = videoStr[i];
			var arr = {};
			arr.device_ = 3;
			arr.video_id = temp.videoId;
			arr.video_sn = temp.sn;
			arr.video_name = temp.name;
			arr.video_description=temp.description;
			arr.video_coordinateX = temp.coordinateX;
			arr.video_coordinateY = temp.coordinateY;
			arr.video_status = temp.status;
			var selected = temp.selected?0:1;
			arr.video_selected = selected;
			arr.video_factoryTime = temp.factoryTime;;
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
			arr._index = i;
			var latlng = new google.maps.LatLng(temp.coordinateX,temp.coordinateY);
			var custom = new CustomOverlay(map,"",latlng,arr);
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
			arr.krpano_file_fold = temp.fileFold;
			arr.krpano_fold_name = temp.foldName;
			arr.krpano_file_type = temp.fileType;
			arr._index = i;
			var latlng = new google.maps.LatLng(temp.coordinateX,temp.coordinateY);
			var custom = new CustomOverlay(map,krpanosrc,latlng,arr);
			krpanoArray.push(custom);
		}
		krpano_index = krpanoStr.length;
	}
	
	function checkPointTunnel(latlng){
		for(var i = 0;i<mark3Array.length;i++){
			m = mark3Array[i];
			if(m.Contains(latlng)){
				return m;
				break;
			}else if(i==mark3Array.length-1){
				return null;
			}
		}
	}
	
	
	var Wenzi = function (bounds, wenzi, map,type) {
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
	  div.style.index="777";
	  //div.style.width="100%";
	  div.style.color="white";
	  div.style.borderWidth = '0px';
	  div.style.position = 'absolute';
	  div.innerHTML=this.wenzi_;
	  this.div_ = div;
	  var panes = this.getPanes();
	  panes.overlayImage.appendChild(this.div_);
	  var _self=this;
	};
	Wenzi.prototype.draw = function() {
	  var overlayProjection = this.getProjection();
	  var lat = this.bounds_.lat();
	  var lng = this.bounds_.lng();
	  var newpoint = new google.maps.LatLng(lat,lng);
	  var div = this.div_;
	  var zoom = map.getZoom();
	  var yu = parseInt(this.wenzi_.length/2);
	  if(this.type_==1){
		  if(zoom<15){
			  this.show();
			  newpoint = new google.maps.LatLng(lat,lng);
			  div.style.width=11*this.wenzi_.length+"px";
			  div.style.fontSize="20px";
			  div.style.width=20*this.wenzi_.length+"px";
		  }else if(zoom==15){
			  this.show();
			  newpoint = new google.maps.LatLng(lat,lng-(0.001*yu));
			  div.style.fontSize="20px";
			  div.style.width=20*this.wenzi_.length+"px";
		  }else{
			  this.hide();
		  }
	  }else if(this.type_==2){
		  if(zoom<=15){
			  this.hide();
		  }else if(zoom==16){
			  this.show();
			  newpoint = new google.maps.LatLng(lat+0.0002,lng-(0.000242*yu));
			  div.style.width=11*this.wenzi_.length+"px";
			  div.style.fontSize="11px";
		  }else if(zoom==17){
			  this.show();
			  newpoint = new google.maps.LatLng(lat+0.0001,lng-(0.000185*yu));
			  div.style.width=16*this.wenzi_.length+"px";
			  div.style.fontSize="16px";
		  }else if(zoom==18){
			  this.show();
			  newpoint = new google.maps.LatLng(lat+0.00006,lng-(0.000139*yu));
			  div.style.width=23*this.wenzi_.length+"px";
			  div.style.fontSize="23px";
		  }else if(zoom==19){
			  this.show();
			  newpoint = new google.maps.LatLng(lat+0.00004,lng-(0.000119*yu));
			  div.style.width=(45*this.wenzi_.length+10)+"px";
			  div.style.fontSize="45px";
		  }else if(zoom>19){
			  this.show();
			  newpoint = new google.maps.LatLng(lat+0.00003,lng-(0.000119*yu));
			  div.style.width=(50*this.wenzi_.length+10)+"px";
			  div.style.fontSize="50px";
		  }
	  }else if(this.type_==3){
		  if(zoom<18){
			  this.hide();
		  }else if(zoom==18){
			  this.show();
			  newpoint = new google.maps.LatLng(lat-0.00004,lng-(0.000064*yu));
			  div.style.width=11*this.wenzi_.length+"px";
			  div.style.fontSize="10px";
		  }else if(zoom==19){
			  this.show();
			  newpoint = new google.maps.LatLng(lat-0.00004,lng-(0.000029*yu));
			  div.style.width=13*this.wenzi_.length+"px";
			  div.style.fontSize="12px";
		  }else if(zoom>19){
			  this.show();
			  newpoint = new google.maps.LatLng(lat-0.00004,lng-(0.000049*yu));
			  div.style.width=18*this.wenzi_.length+"px";
			  div.style.fontSize="18px";
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
	
	function previewImage(url){
		_Q("#previewDiv").show();
		var height = document.body.clientHeight;
		var width = document.body.clientWidth;
		_Q("#previewDiv").css({"position":"absolute","z-index":1000,"left":(width-320)/2,"top":(height-480)/2});
		_Q("#previewDiv img:first").attr("src",url);
	}
	
	function closeKrpanoFrame(){
		_Q("#krpano_iframe").hide();
	    _Q("#krpano_iframe").attr("src","");
	    _Q("#krpano_iframe_img").hide();
	}

   //]]>
 
//<![CDATA[

var nowD = new Date();
var nowD_ = new Date(nowD.getFullYear(),nowD.getMonth(),nowD.getDate());
var nowD_2 = new Date(nowD.getFullYear(),nowD.getMonth()+1,nowD.getDate());

var re =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/  
var ipMap = new JsMap();



function formatFloat(src, pos)
			{
			    return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
			}
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
	var dbclick_ = 0;
	var device_index = 1;
	var video_index = 1;
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
	var devicesrc = workpath+"/asset/images/vidicon2.png";
	var weathersrc = workpath+"/asset/images/vidicon4.png";
	var videosrc = workpath+"/asset/images/vidicon3.png";
	var moreanimal = workpath + "/asset/images/more_animal.png";
	var animalsrc = workpath + "/asset/images/animal_3.png";
	var addanimalsrc = workpath + "/asset/images/animal_4.png";
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
   zoom: 14,  
   mapTypeId: google.maps.MapTypeId.SATELLITE,
	streetViewControl: false,// 取消街景
  // disableDoubleClickZoom:true,
   mapTypeControl:false,
	panControl:true,
	zoomControl:true,
	panControlOptions:{position:google.maps.ControlPosition.LEFT_TOP},
	zoomControlOptions:{position:google.maps.ControlPosition.LEFT_TOP},
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
	var vb = navigator.userAgent.indexOf("MSIE")>0 ? true : false;
	
	//initList();
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
		loadfirst();
		loadsecond();
		loadthird();
		loadfourth();
		loadfifth();
		setTimeout(function(){_Q(".gm-style").find("div:eq(0)").find("div:eq(0)").next().hide();},500);
		setTimeout(function(){
		if(_center!=""){
			_center = _center.replace(/[()]/g, '');
			var yy = _center.split(",");
			lag = new google.maps.LatLng(parseFloat(yy[0]),parseFloat(yy[1]));
		}else{
			lag = new google.maps.LatLng(39.90627970711568, 116.3911771774292);
		}
		map.setCenter(lag);
		},100);
		try{
			window.parent.shadeMapDiv(2);
		}catch(e){
			
		}
		
	});
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
//加载地图
_Q(document).ready(function(){
	initList();
	initialize();
});

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
				attachSecretMessage(marker, array);
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
				    height: _Q("#map-canvas").height(),
				    width: _Q("#map-canvas").width()
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
	            mark3Array.push(bermudaTriangle);
	            loadThirdPloygon(bermudaTriangle,bounds);
	            var centerpoint = new google.maps.LatLng(parseFloat(bermudaTriangle.group_x),parseFloat(bermudaTriangle.group_y));
	            new Wenzi(centerpoint,bermudaTriangle._name,map,3);
	            bermudaTriangle.setMap(map);
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
						}
					}
					if(tt>2)
						break;
				}
				if (tt > 1) {
					isrc = moreanimal;
				}
			} else {

				var tempArray = map5.get(bermudaTriangle._id);
				var tlength = 0;
				if (tempArray == null || tempArray.length == 0)
					tlength = 0;
				else
					for (var x_ = 0; x_ < tempArray.length; x_++) {
						var t_ = tempArray[x_];
						var t1 = new Date(t_.starttime.replace("-", "/").replace("-",
								"/"));
						if (t1.getTime() <= nowD_.getTime())
							tlength += 1;
					}

				if (tlength == 0) {
					isrc = nonesrc;
					var tempA = [];
					if (bermudaTriangle._id == 1090) {
						console.log("xxx");
					}

					for (var i = 0; i < realPlantJson.length; i++) {
						var tem = realPlantJson[i];
						if (tem.tunnel_info_id == bermudaTriangle._id) {
							var t1 = new Date(tem.start_time.replace("-", "/").replace(
									"-", "/"));
							if (t1.getTime() > nowD_.getTime())
								tempA.push(tem.imground);
						}
					}
					if (tempA.length == 1) {
						if (tempA[0] == "")
							isrc = nonesrc;
						else
							isrc = tempA[0];
					} else if (tempA.length > 1) {
						isrc = moresrc;
					}
					if (isrc != nonesrc)
						tempb = true;
				} else if (tlength == 1) {
					isrc = tempArray[0].imground;
					if (isrc == "")
						isrc = nonesrc;
				} else {
					isrc = moresrc;
				}
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
			var tempUSGS;
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
			  div.style.index="777";
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
				tempUSGS = _self;
				map.setZoom(19);showInfos2(_self,event);
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
			
			function closeNotPlant(){
				_Q(".notPlant").hide();
				_Q('#login4').hide();
			}
			
			function closeOnePlant(){
				_Q(".onePlant").hide();
				_Q('#login4').hide();
			}
			
			function showInfos2 (obj,event){
				var box_title = "";
				var box_plant = "";
				var box_area = "";
				var box_image = "";
				var box_content = "";
				var tempArray = map5.get(obj.parents._id);
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
					box_area = box_area.toFixed(2);
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
					if (tempArray == null || tempArray.length == 0)
						tlength = 0;
					else
						for (var x_ = 0; x_ < tempArray.length; x_++) {
							var t_ = tempArray[x_];
							var t1 = new Date(t_.starttime.replace("-", "/").replace("-", "/"));
							if (t1.getTime() <= nowD_.getTime()) {
								tlength += 1;
								temp.push(t_);
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
					if (tlength == 0) {
						_Q(".notPlant .introPop-header-title h3").html(obj.parents._name);
						_Q(".notPlant .introPop-header-title em").html("生产负责人 "+master);
						_Q(".notPlant .introPop-header-rt .farmer").html(keeper);
						box_area = obj.parents.mianji;
						box_area = box_area.toFixed(2);
						_Q(".notPlant .introPop-header-rt .farmland").html(box_area+"亩/"+box_area+"亩");
						
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
							_Q(".landHistory_list").empty().append(temStr);
							_Q(".shiy").show();
						} else {
							_Q(".bg_landHistory02").attr("class",
									"bg_landHistory02 landH1");
							temStr = "<li class=''><span>"
									+ (new Date().getFullYear())
									+ "-"
									+ (new Date().getFullYear())
									+ "</span><div><em>暂无数据</em><em class='colorGrn02'></em></div></li>";
							_Q(".landHistory_list").empty().append(temStr);
							_Q(".shiy").show();
						}
						_Q('#login4').show();
		        		_Q(".notPlant").show();
		        		var projection = obj.getProjection();
		        		var piexl = projection.fromLatLngToContainerPixel(obj.bounds_.getCenter());
		        		var topp;
		        		if(piexl.y<(_Q(".notPlant").height())){
		        			piexl.y = piexl.y-(_Q(".notPlant").height()-piexl.y)-18;
		        			topp = 0;
		        		}else{
		        			topp = _Q("#map-canvas").height()/2-_Q(".notPlant").height()-18;
		        		}
		        		var latlng = projection.fromContainerPixelToLatLng(piexl);
		        		map.setCenter(latlng);
		        		_Q(".notPlant").css("left",_Q('#map-canvas').width()/2-_Q(".notPlant").width()/2);
		        		_Q(".notPlant").css("top",topp);
					} else if (tlength == 1) {
						_Q(".onePlant .introPop-header-lt img").attr("src",temp[0].imground);
						_Q(".onePlant .introPop-header-title h3").html(obj.parents._name);
						_Q(".onePlant .introPop-header-title strong").html(temp[0].breed_name);
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
						box_area = box_area.toFixed(2);
						var temp_area = temp[0].crop_area ;
						temp_area = temp_area.toFixed(2);
						_Q(".onePlant .introPop-header-rt .farmland").html(temp_area+"亩/"+box_area+"亩");
						for(var x = 0;x<realPlantJson.length;x++){
							var real = realPlantJson[x];
							if(real.real_plant_id==temp[0].real_plant_id){
								showinfos2_next(real, temp);
								if(real.listStr==""){
									_Q(".onePlant #container-oneChart").hide();
								}
								else{
									_Q(".onePlant #container-oneChart").show();
								}
								break;
							}
						}
						_Q('#login4').show();
		        		_Q(".onePlant").show();
		        		var projection = obj.getProjection();
		        		var piexl = projection.fromLatLngToContainerPixel(obj.bounds_.getCenter());
		        		var topp;
		        		if(piexl.y<(_Q(".onePlant").height())){
		        			piexl.y = piexl.y-(_Q(".onePlant").height()-piexl.y)-18;
		        			topp = 0;
		        		}else{
		        			topp = _Q("#map-canvas").height()/2-_Q(".onePlant").height()-18;
		        		}
		        		var latlng = projection.fromContainerPixelToLatLng(piexl);
		        		map.setCenter(latlng);
		        		_Q(".onePlant").css("left",_Q('#map-canvas').width()/2-_Q(".onePlant").width()/2);
		        		_Q(".onePlant").css("top",topp);
					} else if (tlength > 1) {
						
						_Q(".onePlant .introPop-header-lt img").attr("src",temp[0].imground);
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
						box_area = box_area.toFixed(2);
						var temp_area = temp[0].crop_area ;
						temp_area = temp_area.toFixed(2);
						var options = "";
						for (var i = 0; i < temp.length; i++) {
							options += "<option value='"+temp[i].real_plant_id+"'>"+temp[i].breed_name + "</option>";
						}
						_Q(".onePlant .introPop-header-title select").empty().append(options);
						_Q(".onePlant .introPop-header-title select").selectpicker("refresh");
						_Q(".onePlant .introPop-header-title span").show();
						_Q(".onePlant .introPop-header-rt .farmland").attr("aa",box_area).html(temp_area+"亩/"+box_area+"亩");
						for(var x = 0;x<realPlantJson.length;x++){
							var real = realPlantJson[x];
							if(real.real_plant_id==temp[0].real_plant_id){
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
						_Q('#login4').show();
		        		_Q(".onePlant").show();
		        		var projection = obj.getProjection();
		        		var piexl = projection.fromLatLngToContainerPixel(obj.bounds_.getCenter());
		        		var topp;
		        		if(piexl.y<(_Q(".onePlant").height())){
		        			piexl.y = piexl.y-(_Q(".onePlant").height()-piexl.y)-18;
		        			topp = 0;
		        		}else{
		        			topp = _Q("#map-canvas").height()/2-_Q(".onePlant").height()-18;
		        		}
		        		var latlng = projection.fromContainerPixelToLatLng(piexl);
		        		map.setCenter(latlng);
		        		_Q(".onePlant").css("left",_Q('#map-canvas').width()/2-_Q(".onePlant").width()/2);
		        		_Q(".onePlant").css("top",topp);
					}
				}
				
			}
			
			function resetDate(obj){
				var temp;
				var tempArray = map5.get(_Q(".onePlant .introPop-header-title h3").attr("aa"));
				for (var x_ = 0; x_ < tempArray.length; x_++) {
					var t_ = tempArray[x_];
					if (t_.real_plant_id <= obj.value) {
						temp = t_;
					}
				}
				_Q(".onePlant .introPop-header-lt img").attr("src",temp.imground);
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
				var projection = tempUSGS.getProjection();
        		var piexl = projection.fromLatLngToContainerPixel(tempUSGS.bounds_.getCenter());
        		var topp;
        		if(piexl.y<(_Q(".onePlant").height())){
        			piexl.y = piexl.y-(_Q(".onePlant").height()-piexl.y)-18;
        			topp = 0;
        			var latlng = projection.fromContainerPixelToLatLng(piexl);
            		map.setCenter(latlng);
        		}else{
        			topp = piexl.y-_Q(".onePlant").height()-18;
        		}
				_Q(".onePlant").css("left",_Q('#map-canvas').width()/2-_Q(".onePlant").width()/2);
				_Q(".onePlant").css("top",topp);
			}
			
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
			
			function showInfos (obj,event){
				var box_title = "";
				var box_plant = "";
				var box_area = "";
				var box_image = "";
				var box_content = "";
				var tempArray = map5.get(obj.parents._id);
				var b = true;
				var _obj_ ;
				var temp = [];
				var tlength = 0;
				if(tempArray==null||tempArray.length==0)
					tlength=0;
				else
				for(var x_ = 0 ;x_<tempArray.length;x_++){
					var t_ = tempArray[x_];
					var t1 = new Date(t_.starttime.replace("-","/").replace("-","/"));
					if(t1.getTime() <= nowD_.getTime()){
						tlength+=1;
						temp.push(t_);
					}
				}
                var mast = _Q("#group_farmer1_ option[value='"+obj.parents._masterId+"']");
                var master = "";
                if(mast.length>0){
                    master = mast.html();
                }

				if(tlength==0){
					box_title = obj.parents._name;
					box_plant = "";
					box_area = obj.parents.mianji;
					box_area = box_area.toFixed(2);
					box_image = addsrc;
					box_content = "暂无作物";
					_Q(".zw_bgt2").css("cursor","pointer");
					b = false;
                    _Q(".win_date_1,.win_date_2").hide();
				}else if(tlength==1){
					box_title = obj.parents._name;
					box_plant = temp[0].breed_name;
					box_area = obj.parents.mianji;
					box_area = box_area.toFixed(2);
					box_image = temp[0].imground;
					if(box_image=="")
						box_image = nonesrc;
                    box_content =temp[0].starttime;
					if(temp[0].enttime!=""){
						content+=" - "+temp[0].endtime;
					}
                    _Q(".win_date_2").html(box_content);
                    var temp_area = temp[0].crop_area ;
        			temp_area = temp_area.toFixed(2);
                    box_area = temp_area+"亩 / "+box_area;
                    _Q(".win_date_1,.win_date_2").show();
					_Q(".zw_bgt2").attr("onclick","addPlant()");
					_Q(".zw_bgt2").css("cursor","default");
				}else if(tlength>1){
					box_title = obj.parents._name;
					box_area = obj.parents.mianji;
					box_area = box_area.toFixed(2);
                    box_plant = "多作物";
					box_image = moresrc;
					box_content = "种植： ";
                    var plant_area = 0;
					for(var i = 0;i<temp.length;i++){
						box_content+=temp[i].breed_name+" ";
                        plant_area +=temp[i].crop_area;
					}
					plant_area = plant_area.toFixed(2);
                    _Q(".win_date_2").html(box_content);
                    box_area =plant_area+"亩 / "+box_area;
					_Q(".zw_bgt2").attr("onclick","addPlant()");
					_Q(".zw_bgt2").css("cursor","default");
                    _Q(".win_date_1,.win_date_2").hide();
				}
                _Q(".win_masterId").html("负责人:"+master);
				_Q(".div_dt2").html(box_title);
				_Q(".div_dt4").html(box_plant);
				_Q(".div_dt3").html(box_area+"亩");
				_Q(".zw_libg_img2").attr("src",box_image);
				//_Q(".div_dt55").html(box_content);
				var content = _Q(".div_width").html();
				if(b){
					content = content.replace("addPlant","nothing");
				}else{
					content = content.replace("nothing","addPlant");
				}
				g_infowindow.set("content",content);
				//var lat = obj.bounds_.getCenter().lat();
				//var lng = obj.bounds_.getCenter().lng();
				//var center = new google.maps.LatLng(lat-0.0000422,lng);
				g_infowindow.setPosition(obj.bounds_.getCenter());
				g_infowindow.set("maxWidth",242);
				g_infowindow.setMap(map);
				setTimeout(function(){xa();},10);
				setTimeout(function(){hove();},10);
			}
			
			function xa (){
				  if(ie7){
					_Q(".gm-style-iw").css("overflow","visible");
					_Q(".gm-style-iw div").css("overflow","visible");
				  }else{
					_Q(".gm-style-iw").css("overflow","inherit");
					_Q(".gm-style-iw div").css("overflow","inherit");
				  }
				  _Q(".gm-style-iw").css({"margin-top":"16px","top":"0px"});
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
				var left,right;
				if(this.arr.device_==2){
					left = new google.maps.LatLng(lat+(0.0000424*4),lng+(0.000055*4));
					right = new google.maps.LatLng(lat-(0.000045*4),lng-(0.000060*4));
				}else{
					left = new google.maps.LatLng(lat+0.0000424,lng+0.000055);
					right = new google.maps.LatLng(lat-0.000045,lng-0.000060);
				}
				var bounds2 = new google.maps.LatLngBounds(right,left);
				
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

		var tempCustom;
	function clic(tempThis,shape){
		_Q(shape).click(function(){
	        if(tempThis.arr.device_==1){
	        	//A010003A00015301006
	        	_Q.getJSON(workpath+"/environmentaldata?sn="+tempThis.arr.device_sn+"&type=0"
	        	).done(function(data){
	        		map.setCenter(tempThis.quadrilateral.latLng);  
	        		map.setZoom(19);
	        		_Q('#login4').show();
	        		_Q(".maptck").show();
	        		_Q(".maptck").css("left",_Q('#map-canvas').width()/2-_Q(".maptck").width()/2);
	        		_Q(".maptck").css("top",_Q("#map-canvas").height()/2-_Q(".maptck").height());
	        		try{
	        			if(tempThis.arr.device_type_id==101)
							_Q(".maptck .titlefont").html("奥科美二合一传感器");
						else if(tempThis.arr.device_type_id==102)
							_Q(".maptck .titlefont").html("奥科美四合一传感器");
						else if(tempThis.arr.device_type_id==103)
							_Q(".maptck .titlefont").html("奥科美六合一传感器");
	        		}catch(e){}
	        		if(data.airTemp==undefined){
	        			_Q(".maptck .t1_sn").html("编号："+tempThis.arr.device_sn);
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
	        		}else{
	        			_Q(".maptck .t1_sn").html("编号："+tempThis.arr.device_sn);
	        			_Q(".maptck .ludian").show();
		    			if(parseFloat(data.airTemp)>-99)
		    				_Q(".maptck .t1_airTemp").html(parseFloat(data.airTemp).toFixed(1)+" ℃");
		    			else
		    				_Q(".maptck .t1_airTemp").html("－－℃");
		    			
		    			if(parseFloat(data.airHumidity)>-99)
		    				_Q(".maptck .t1_airHumidity").html("湿度："+parseFloat(data.airHumidity).toFixed(1)+" %");
		    			else
		    				_Q(".maptck .t1_airHumidity").html("湿度：－－%");
		    			
		    			if(parseFloat(data.soilTemp)>-99)
		    				_Q(".maptck .t1_soilTemp").html("温度 "+parseFloat(data.soilTemp).toFixed(1)+" ℃");
		    			else
		    				_Q(".maptck .t1_soilTemp").html("");
		    				
		    			if(_Q(".maptck .t1_soilTemp").html()==""){
		    				if(parseFloat(data.soilHumidity)>-99){
		    					_Q(".maptck .t1_soilTemp").html("湿度 "+parseFloat(data.soilHumidity).toFixed(1)+" %");
		    					_Q(".maptck .t1_soilHumidity").html("")
		    				}else
			    				_Q(".maptck .t1_soilTemp").html("");
		    			}else{
		    				if(parseFloat(data.soilHumidity)>-99)
			    				_Q(".maptck .t1_soilHumidity").html("湿度 "+parseFloat(data.soilHumidity).toFixed(1)+" %");
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
		    			
		    			if(parseFloat(data.illumination)>-99)
		    				_Q(".maptck .t1_illumination").html(parseFloat(data.illumination).toFixed(0)+" LUX");
		    			else
		    				_Q(".maptck .t1_illumination").html("－－ LUX");
		    			
		    			if(parseFloat(data.co2)>-99)
		    				_Q(".maptck .t1_co2").html(parseFloat(data.co2).toFixed(0)+" ppm");
		    			else
		    				_Q(".maptck .t1_co2").html("");
		    			
		    			_Q(".maptck .t1_gentime").html("采集时间："+data.genTime);
		    			_Q(".maptck .ckxx").bind("click",function(){
		    				/*var tempArray =  map5.get(tempThis.arr.device_tunnel_id);
		    				var realPlantId = "0";
		    				if(tempArray!=null&&tempArray.length>0)
		    					realPlantId = tempArray[0].real_plant_id;
		    				var str = workpath+"/growth/CropGrowth.seam?tunnelInfoId="+tempThis.arr.device_tunnel_id
	    					+"&realPlantId="+realPlantId+"&dateType=6&baseId="+tempThis.arr.device_base_id;*/
			    			
		    				window.parent.location.href = (domain!=""?domain:"")+"/farmeasyadmin/partition/TunnelInfoView.seam?nvaid=1&tunnelInfoId="+tempThis.arr.device_tunnel_id;
	    				});
	        		}
	        	});
	        }else if(tempThis.arr.device_==2){
	        	tempCustom = tempThis;
	        	//var a = tempThis.quadrilateral.latLng.lat();
	        	//var b = tempThis.quadrilateral.latLng.lng();
	        	//var newL = new google.maps.LatLng((a-0.004),b);
	        	//map.setCenter(newL);  
	        	_Q('#login4').show();
	        	map.setCenter(tempThis.quadrilateral.latLng);  
	        	map.setZoom(19);
        		_Q(".qixz").show();
        		_Q(".qixz").css("left",_Q('#map-canvas').width()/2-_Q(".qixz").width()/2);
        		_Q(".qixz").css("top",_Q("#map-canvas").height()/2-_Q(".qixz").height());
        		_Q(".qixz .t2_sn").html("编号："+tempThis.arr.device_sn);
	        	findWeatherData(tempThis.arr.device_sn);
	        }else if(tempThis.arr.device_==3){
	        	if(tempThis.arr.video_webcam_url!=""&& ! /msie/.test(navigator.userAgent.toLowerCase())){
					vHLSurl = tempThis.arr.video_webcam_url;
					window.a.init();
					_Q('#login3').show();
					_Q("#video_iframe1").hide();
					_Q("#video_iframe2").hide();
					_Q("#video_iframe3").show();
					_Q("#novideo").hide();
				}else{
		        	if(tempThis.arr.video_access_way==null||tempThis.arr.video_access_way==1 ){
		        		_Q('#login3').show();
		            	_Q("#video_iframe2").show();
                        getRealIp(tempThis.arr.video_app_ip,function(realIp){
                        	strIP = tempThis.arr.video_app_ip;
    				        strPort = tempThis.arr.video_app_port;
    				        strName1 = tempThis.arr.video_app_username;
    				        strPwd1 = tempThis.arr.video_app_password;
    				        ChanNum1 = tempThis.arr.video_app_device_video_channel_no;
    				        cameraID1 = tempThis.arr.video_app_device_video_channel_no;
    				        setTimeout(function(){StartPlayView();StopPlayView();},1);
    						_Q("#switch2").closest(".vb").attr("class","videobut_ vb");
    						_Q("#switch2").unbind("click");
    				        _Q("#switch2").bind("click",function(){
    				            StartPlayView();
    				            _Q(this).closest(".vb").attr("class","videobut vb");
    				        });
                        });
			        	
		        		
		        	} else if (tempThis.arr.video_access_way == 2){
		        		_Q('#login3').show();
						_Q("#video_iframe").show();
                        getRealIp(tempThis.arr.video_ip,function(realIp){
                        	szAccount= tempThis.arr.video_sn;
    						szRegIP = tempThis.arr.video_ip;
    		 				password = tempThis.arr.video_password;
    						username = tempThis.arr.video_username;
    						channelNo = tempThis.arr.video_channel_no;
    						_Q("#switch1").closest(".vb").attr("class","videobut_ vb");
    						_Q("#switch1").unbind("click");
                            _Q("#switch1").bind("click",function(){
                                _Q(this).closest(".vb").attr("class","videobut vb");
                                openVideo();
                            });
                        })
		        	}else if (tempThis.arr.video_access_way == 3){
						if (-1 == WebVideoCtrl.I_CheckPluginInstall()) {
							_Q('#login3').show();
				        	_Q("#novideo").show();
						 }else{
							 _Q(".videoimg__").html("<div id='divPlugin' style='width:100%;height:100%;'></div>");
							 _Q("#switch3").closest(".vb").attr("class","videobut_ vb");
							 _Q('#login3').show();
								_Q("#video_iframe4").show();
							 // 初始化插件参数及插入插件
							getRealIp(tempThis.arr.video_app_ip, function(realIp){
								setTimeout(function(){
									WebVideoCtrl.I_InitPlugin("100%", "100%", {
										iWndowType:1, 
										cbSelWnd: function(){}
									 });
									 WebVideoCtrl.I_InsertOBJECTPlugin("divPlugin"); 
									 var iChannelID = parseInt(tempThis.arr.video_app_device_video_channel_no, 10);//通道列表
									 var appPort = parseInt(tempThis.arr.video_app_web_port, 10);
									 var bZeroChannel = false;
									 
									 strIP = realIp;
										strPort = tempThis.arr.video_app_port;
										strName1 = tempThis.arr.video_app_username;
										strPwd1 = tempThis.arr.video_app_password;
										ChanNum1 = iChannelID;
										webAppPort = appPort;
										bzChannel = bZeroChannel;
										
										_Q("#switch3").unbind("click");
					                    _Q("#switch3").bind("click",function(){
					                        _Q(this).closest(".vb").attr("class","videobut vb");
					                        newVideoPreview(strIP, 1, ChanNum1, bzChannel);
					                    });	
										
									 // 登录
									 var iRet = WebVideoCtrl.I_Login(strIP, 1, appPort, strName1, strPwd1, {
										success: function (xmlDoc) {
											showOPInfo("登录成功...");
										},
										error: function () {
											showOPInfo("登录失败...");
										}
									 });
									 if (-1 == iRet) {
										 showOPInfo("已登录过...");
									 }
								}, 1)
							});
						 }
		        	}
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
	
	function closeVideo3(){
		document.getElementById("hlsdiv").innerHTML="";
		_Q('#login3').hide();
		_Q("#video_iframe3").hide();
	}
	
	function closeVideo4(){
		_Q('#login3').hide();
		_Q("#novideo").hide();
	}
	
	function closeVideo5(){
		try {
			clickStopRealPlay();
			clickLogout();
		} catch (e) {

		}
		_Q('#login3').hide();
		_Q("#video_iframe4").hide();
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
			_Q(".qixz .t2_soil_humidity2").html("");
			_Q(".qixz .t2_rainfallS").html("降水量 ");
			_Q(". .t2_gen_time").html("");
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
				_Q(".qixz .t2_air_humidity").html("湿度 ");
			
			if(parseFloat(tempp.soil_temp)>-99)
				_Q(".qixz .t2_soil_temp").html("温度 "+tempp.soil_temp+" ℃");
			else
				_Q(".qixz .t2_soil_temp").html("");
			
			if(parseFloat(tempp.soil_humidity)>-99)
				_Q(".qixz .t2_soil_humidity").html("湿度 "+tempp.soil_humidity+" %");
			else
				_Q(".qixz .t2_soil_humidity").html("");
			
			if(parseFloat(tempp.illumination)>-99)
				_Q(".qixz .t2_illumination").html(tempp.illumination+" LUX");
			else
				_Q(".qixz .t2_illumination").html("");
			
			_Q(".qixz .t2_wind_velocity").html(tempp.wind_velocity +" "+tempp.wind_direction);
			
			if(parseFloat(tempp.atmospheric_pressure)>-99)
				_Q(".qixz .t2_atmospheric_pressure").html(tempp.atmospheric_pressure+" hPa");
			else
				_Q(".qixz .t2_atmospheric_pressure").html("");
			
			if(parseFloat(tempp.solar_radiation)>-99)
				_Q(".qixz .t2_solar_radiation").html(tempp.solar_radiation+" w/㎡");
			else
				_Q(".qixz .t2_solar_radiation").html("");
			
			if(tempp.rainfallS=="null")
				_Q(".qixz .t2_rainfallS").html("降水量 ");
			else
				_Q(".qixz .t2_rainfallS").html("降水量 "+tempp.rainfallS+" mm");
			
			_Q(".qixz .t2_gen_time").html("采集时间 :"+tempp.gen_time);
			
			_Q(".qixz .qckxx2").bind("click",function(){
				window.location.href=workpath+"/growth/GrowthDevice.seam?deviceId="+tempCustom.arr.device_id+"&dateType=6&baseId="+tempCustom.arr.device_base_id;
			});
		}
		var projection = tempCustom.getProjection();
		var piexl = projection.fromLatLngToContainerPixel(tempCustom.quadrilateral.latLng);
		var topp;
		if(piexl.y<(_Q(".qixz").height())){
			piexl.y = piexl.y-(_Q(".qixz").height()-piexl.y)-18;
			topp = 0;
		}else{
			topp = _Q("#map-canvas").height()/2-_Q(".qixz").height()-18;
		}
		var latlng = projection.fromContainerPixelToLatLng(piexl);
		map.setCenter(latlng);
		_Q(".qixz").css("left",_Q('#map-canvas').width()/2-_Q(".qixz").width()/2);
		_Q(".qixz").css("top",topp);
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
			arr.video_webcam_url = temp.webcamUrl;
			arr.video_app_web_port = temp.appWebPort;
			arr._index = i;
			var latlng = new google.maps.LatLng(temp.coordinateX,temp.coordinateY);
			var custom = new CustomOverlay(map,"",latlng,arr);
			videoArray.push(custom);
		}
		video_index = videoStr.length;
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
			  div.style.width=45*this.wenzi_.length+"px";
			  div.style.fontSize="45px";
		  }else if(zoom>19){
			  this.show();
			  newpoint = new google.maps.LatLng(lat+0.00003,lng-(0.000119*yu));
			  div.style.width=45*this.wenzi_.length+"px";
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
		} else {
			showOPInfo("开启阅览失败...");
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
	
	function getRealIp(ip,func){
	    if(!ipMap.containsKey(ip)){
	        if(re.test(ip)){
	            ipMap.put(ip,ip);
	            func(ip);
	        }else{
	            var url = workpath +"/util/cdServlet";
	            _Q.ajax({
	                type : "get",
	                url : url,
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
   //]]>
 
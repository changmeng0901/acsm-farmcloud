//<![CDATA[
var drawingManager;
var deviceTypeObj;
var devicesrc = workpath+"/asset/images/vidicon2.png";
var weathersrc = workpath+"/asset/images/vidicon4.png";
var skjsrc = workpath+"/asset/images/skj.png";
var devicesrc_no = workpath+"/asset/images/noVidicon2.png";
var weathersrc_no = workpath+"/asset/images/noVidicon4.png";
var skjsrc_no = workpath+"/asset/images/noSkj.png";
var nowD = new Date();
var nowD_ = new Date(nowD.getFullYear(),nowD.getMonth(),nowD.getDate());
var nowD_2 = new Date(nowD.getFullYear(),nowD.getMonth()+1,nowD.getDate());
   var map;
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
	var arr = {};
	var latlngNew;
	var isNoObj = true;
	var isExist = false;
	var tunnelId;
	var parId;
	var cgqObj = null;
	var qxzObj = null;
	var skjObj = null;
	//传感器的坐标值
	var device_coordinateX = 0;
	var device_coordinateY = 0;
	//气象站的坐标值
	var qxz_coordinateX = 0;
	var qxz_coordinateY = 0;
	//刷卡机的坐标值
	var skj_coordinateX = 0;
	var skj_coordinateY = 0;
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
     var lag;    
function initialize() { 
	
   //初始化地图参数  
	if(_center!=""){
		_center = _center.replace(/[()]/g, '');
		var yy = _center.split(",");
		lag = new google.maps.LatLng(parseFloat(yy[0]),parseFloat(yy[1]));
	}else{
		lag = new google.maps.LatLng(39.90627970711568, 116.3911771774292);
	}
	
 var mapOptions = {  
   center: lag,  
   zoom: 15,  
   mapTypeId: google.maps.MapTypeId.SATELLITE,
	streetViewControl: false,// 取消街景
  // disableDoubleClickZoom:true,
   mapTypeControl:false,
	panControl:true,
	zoomControl:true,
	panControlOptions:{position:google.maps.ControlPosition.LEFT_TOP},
	zoomControlOptions:{position:google.maps.ControlPosition.LEFT_TOP}
 };  
  //div显示地图  
 map = new google.maps.Map(document.getElementById('map-canvas'),  
   mapOptions);  
//绘画工具 设置   
 drawingManager = new google.maps.drawing.DrawingManager({  
   drawingMode: null,
   drawingControl: false,  
   drawingControlOptions: {  
     position: google.maps.ControlPosition.TOP_CENTER,  
     drawingModes: [  
       google.maps.drawing.OverlayType.MARKER,  
       google.maps.drawing.OverlayType.POLYGON,  
       google.maps.drawing.OverlayType.POLYLINE,  
       google.maps.drawing.OverlayType.RECTANGLE  
     ]  
   },  
   markerOptions: {  
     icon: '../asset/images/zb.png'  
   },  
   
   infoWindowOptions:{
 	   disableAutoPan:true
   },
   //设置图形显示样式  
   polygonOptions: {  
   strokeColor: "#FF0000",  
   strokeOpacity: 0.8,  
   strokeWeight: 2,  
   fillColor: null,  
   fillOpacity: 0.4,
   editable: true
 	}  
 }); 
 drawingManager.setMap(map);   
////////
	//循环显示 经纬度  
	function showLonLat( arr){  
		for(var i=0; i<arr.length;i++){  
		//alert(arr[i]);  
		};  
	}  
	
   google.maps.event.addListener(map, 'click', function(event){
//	   alert("mapClick22");
	   
		clearSelection();});
	google.maps.event.addListener(map, 'dblclick', function(event){
//		alert("dblclick");
	 });
	var vb = navigator.userAgent.indexOf("MSIE")>0 ? true : false;
	if(vb){
		setTimeout(function(){
		loadfirst();
		loadsecond();
		loadthird();
		loadfourth();
		},0);
	}else{
		loadfirst();
		loadsecond();
		loadthird();
		loadfourth();
	}
	google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {   
		drawingManager.mytype="4";
		arr = {};
		var deviceType = _Q("#user\\:plantingPattern").val();
		arr.device_ = deviceType;
		drawingManager.device_ = deviceType;
		event.overlay.setMap(null);
	    latlngNew = new google.maps.LatLng(event.overlay.getPosition().lat(),event.overlay.getPosition().lng());
	    var base = checkPointBase(latlngNew);
	    if(base == null){
	    	alert("设备需要放在基地内!");
			return ;
			
	    }else{
	    	 var tunnel = checkPointTunnel(latlngNew);
				if(tunnel==null&&drawingManager.device_==100){
//		        	isNoObj = false;
					alert("传感器需要放在区域内!");
					return ;
				}else if(tunnel==null&&drawingManager.device_==500){
//		        	isNoObj = false;
					alert("刷卡机需要放在区域内!");
					return ;
				}else if(tunnel!=null&&tunnel.device_&&drawingManager.device_==100){
//					isNoObj = false;
					alert("此区域已经存在传感器!");
					return ;
				}else if(tunnel!=null&&tunnel.ccmdevice_ &&drawingManager.device_==500){
					alert("此区域已经存在刷卡器!");
					return ;
				}if(tunnel != null){
					tunnelId = tunnel._id;
				}
				  if(deviceType == 100){
					  cgqObj = new CustomOverlay(map,"",latlngNew,arr);
//			 		     cgqObj = customOveray;
			        	 device_coordinateX = event.overlay.getPosition().lat();
					     device_coordinateY = event.overlay.getPosition().lng();
					}else if(deviceType == 500){
						skjObj = new CustomOverlay(map,"",latlngNew,arr);
//						    skjObj = customOveray;
						skj_coordinateX = event.overlay.getPosition().lat();
						skj_coordinateY = event.overlay.getPosition().lng();
					}else if(deviceType == 600){
						qxzObj = new CustomOverlay(map,"",latlngNew,arr);
//						    qxzObj = customOveray;
						 qxz_coordinateX = event.overlay.getPosition().lat();
						 qxz_coordinateY = event.overlay.getPosition().lng();
					}
					 _Q("#myModal3").modal('show');
				        var partition = checkPointPartition(latlngNew);
						if(partition!=null){
//							alert("partition._id:"+partition._id);
							parId = partition._id;
						}
	    }
	   
 });
}  

//根据以知 点绘制图形  
var bermudaTriangle;
//加载地图
_Q(document).ready(function(){
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
    	var calcZoom;
		//加载描点及基地范围
		function loadfirst (){
			var a = 0;
			//mark__index = markstr.length;
			mark__index = 1;
			for(var i = 0;i<markstr.length;i++){
				if(a==0)
					a=1;
				var array = markstr[i];
				var point = new google.maps.LatLng(array.coordinateX, array.coordinateY);
				 var marker = new google.maps.Marker({
				     position: point,
				     map: map,
				     title:array.name,
					 icon: '../asset/images/zb.png',
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
	            	calcZoom = getBoundsZoomLevel(bounds);
	            }
	            marker._ploygon=bermudaTriangle;
	            mark1Array.push(bermudaTriangle);
	            loadFirstPloygon(bermudaTriangle);
//	            new Wenzi(point,array.name,map,1);
	            bermudaTriangle.setMap(map);
			}
		}
		
		function getBoundsZoomLevel(bounds) {
			var mapDim = {
				    height: _Q(".modal-dialog2").height(),
				    width: _Q(".modal-dialog2").width()
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
//			alert("loadsecond");
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
//	            new Wenzi(bounds.getCenter(),array.name,map,2);
	            bermudaTriangle.setMap(map);
			}
		}
		//加载大棚
		function loadthird(){
//			alert("加载大棚");
			
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
	            bermudaTriangle._ccm_device_id = array.ccmDeviceId;
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
		}
		
		//加载区域第二步
		function loadSecondPloygon(bermudaTriangle,bounds){
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
			var tlength = 0;
			if(tlength==0){
				var tempA = [];
				if(bermudaTriangle._id == 1090){
					console.log("xxx");
				}
				for(var i = 0;i<realPlantJson.length;i++){
					var tem = realPlantJson[i];
					if(tem.tunnel_info_id==bermudaTriangle._id){
						var t1 = new Date(tem.start_time.replace("-","/").replace("-","/"));
			    		if(t1.getTime() > nowD_.getTime())
			    			tempA.push(tem.imground);
					}
				}
				
				if(tempA.length==1){
					if(!tempA[0]=="")
						isrc = tempA[0];
				}else if(tempA.length>1){
				}
			}else if(tlength==1){
			}else{
			}
			
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

	//遍历设备
	function loadfourth(){

		for(var i = 0;i<deviceStr.length;i++){
			var device = deviceStr[i];
			var arr = {};
			arr.device_ = device.deviceTypeId;
			arr.device_base_id = device.baseId;
			arr.device_partition_id = device.partitionId;
			arr.device_id = device.id;
//			alert(device.coordinateX);
			if(drugObj != null && drugObj != 0){
				if(drugObj == device.id){
					arr.is_drag = false;
					if(device.coordinateX != null){
						if(device.deviceTypeId == 100){
							device_coordinateX	= device.coordinateX;
							device_coordinateY	= device.coordinateY;
						}else if(device.deviceTypeId == 500){
							skj_coordinateX	= device.coordinateX;
							skj_coordinateY	= device.coordinateY;
						}else if(device.deviceTypeId == 600){
							qxz_coordinateX	= device.coordinateX;
							qxz_coordinateY	= device.coordinateY;
						}
					}
				}else{
					arr.is_drag = true;
				}
			}else{
				arr.is_drag = true;
			}
			
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
//			 attachSecretMessage(marker, array,i);
			arr._index = i;
//			device.setDraggable(false);
			if(arr.device_==100){
				var tunnel = checkPointTunnel(latlng);
				if(tunnel!=null&&tunnel._device_id==device.id){
					var custom = new CustomOverlay(map,"",latlng,arr);
					tunnel.device_ = custom;
					deviceArray.push(custom);
				}else{
					//custom.setMap(null);
					//custom.div.style.display="none";
				}
			}else if(arr.device_==500){
				var tunnel = checkPointTunnel(latlng);
				if(tunnel!=null&&tunnel._ccm_device_id==device.id){
					var custom = new CustomOverlay(map,"",latlng,arr);
					tunnel.ccmdevice_ = custom;
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
	
	//检测设备是否在大棚内已经存在。
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
	//检测设备是否在基地内已经存在。
	function checkPointBase(latlng){
		for(var i = 0;i<mark1Array.length;i++){
			m = mark1Array[i];
			if(m.Contains(latlng)){
				return m;
				break;
			}else if(i==mark1Array.length-1){
				return null;
			}
		}
	}
	//检测设备是否在分区内已经存在。
	function checkPointPartition(latlng){
		for(var i = 0;i<mark2Array.length;i++){
			m = mark2Array[i];
			if(m.Contains(latlng)){
				return m;
				break;
			}else if(i==mark2Array.length-1){
				return null;
			}
		}
	}
	//点击设备定位时判断设备类型
	
	function showMapMe(){
		var deviceType = _Q("#user\\:plantingPattern").val();
//		alert(deviceType);
		arr.device_ = deviceType;
		//deviceType(100:传感器500:刷卡机600:气象站)
		if(deviceType == 100){
			if(skjObj != null){
//				skjObj.setMap(null);
				skjObj.hide();
			}
			if(qxzObj != null){
				qxzObj.hide();
//				qxzObj.setMap(null);
			}
			if(cgqObj != null){
				cgqObj.show();
			}	
			if(device_coordinateX == 0){
				drawingManager.isshow=true;
				drawingManager.mytype="4";
				drawingManager.setDrawingMode(google.maps.drawing.OverlayType.MARKER);	
			}
		}else if(deviceType == 500){
			if(cgqObj != null){
				cgqObj.hide();
//				cgqObj.setMap(null);
			}
			
			if(qxzObj != null){
				qxzObj.hide();
//					qxzObj.setMap(null);
			}
			if(skjObj != null){
				skjObj.show();
			}
			if(skj_coordinateX == 0){
				drawingManager.isshow=true;
				drawingManager.mytype="4";
				drawingManager.setDrawingMode(google.maps.drawing.OverlayType.MARKER);
			}
				 
		}else if(deviceType == 600){
			if(cgqObj != null){
				cgqObj.hide();
//				cgqObj.setMap(null);
			}
			if(skjObj != null){
				skjObj.hide();
//					skjObj.setMap(null);
			}
			if(qxzObj != null){
				qxzObj.show();
			}	
			if(qxz_coordinateX == 0){
				drawingManager.isshow=true;
				drawingManager.mytype="4";
				drawingManager.setDrawingMode(google.maps.drawing.OverlayType.MARKER);
			}
		}
		_Q("#myModal2").modal('show');
		setTimeout(function(){google.maps.event.trigger(map, 'resize');map.setCenter(lag);
	    if(typeof(calcZoom) != "undefined" && calcZoom >0)
	        map.setZoom(calcZoom);
	    else
	        map.setZoom(16);
		},200);
	}
	//保存设备
	function save_ok(){
		isExist = true;
		 if(arr.device_ == 100){
		     _Q("#device_coordinateX").val(device_coordinateX);
			 _Q("#device_coordinateY").val(device_coordinateY);
		}else if(arr.device_ == 500){
			_Q("#device_coordinateX").val(skj_coordinateX);
			_Q("#device_coordinateY").val(skj_coordinateY);
		}else if(arr.device_ == 600){
			 _Q("#device_coordinateX").val(qxz_coordinateX);
			 _Q("#device_coordinateY").val(qxz_coordinateY);
		}
		_Q("#partition_id").val(parId);
		_Q("#tunnel_id").val(tunnelId);
		drawingManager.setDrawingMode(null);
		_Q("#myModal2").modal('hide');
	}
	//保存移动之后的设备
	function save_ok_move(){
		_Q(".sure").trigger("click");
		_Q("#myModal4").modal('hide');
	}
	var targetObj = null;
	//取消设备编辑
	function save_no(){
		isExist = false;
		drawingManager.setDrawingMode(null);
		targetObj.setNewPoint();
	}
	var CustomOverlay = function(map,imgsrc,latlng,arr)
    {
        this.polygons = [];
        if(!arr.is_drag){
        	this.map = map;
        	this.setMap(map);
        }
        this.div = null;
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
    
    CustomOverlay.prototype.setNewPoint = function(){
    	if(this.quadrilateral.oldlatLng==null)
    		return;
    	this.quadrilateral.latLng = this.quadrilateral.oldlatLng;
    	if(this.arr.device_ == 100){
		     _Q("#device_coordinateX").val(this.quadrilateral.oldlatLng.lat());
			 _Q("#device_coordinateY").val(this.quadrilateral.oldlatLng.lng());
		}else if(this.arr.device_ == 500){
			_Q("#device_coordinateX").val(this.quadrilateral.oldlatLng.lat());
			_Q("#device_coordinateY").val(this.quadrilateral.oldlatLng.lng());
		}else if(this.arr.device_ == 600){
			 _Q("#device_coordinateX").val(this.quadrilateral.oldlatLng.lat());
			 _Q("#device_coordinateY").val(this.quadrilateral.oldlatLng.lng());
		}
    	this.draw();
    }
    
    CustomOverlay.prototype.onRemove = function()
    {
//    	alert("onRemove");
        //Not Implemented Here
    }
    
    CustomOverlay.prototype.addPolygon = function(latLng)
    {
        var shape = document.createElement("div");
        shape.className = "customPolygon";
        shape.style.position = "relative";
		var img = document.createElement('img');
		if(this.arr.device_==100){
			if(!this.arr.is_drag){
				img.src = devicesrc;
			}else{
				img.src = devicesrc_no;
			}
		}else if(this.arr.device_==500){
			if(!this.arr.is_drag){
				img.src = skjsrc;
			}else{
				img.src = skjsrc_no;
			}
		}else if(this.arr.device_==600){
			if(!this.arr.is_drag){
				img.src = weathersrc;
			}else{
				img.src = weathersrc_no;
			}
		}
		
		  img.style.width = '100%';
		  img.style.height = '100%';
		  shape.appendChild(img);
        var tempThis = this;
        this.div.setAttribute("aa",this.arr.device_name);
        this.div.appendChild(shape);
		//setTimeout(function(){move(tempThis,shape);},500);
        if(!this.arr.is_drag){
        	move(tempThis,shape);
        }
        this.quadrilateral = {
            shape:shape,
            latLng:latLng
        };
    };

    CustomOverlay.prototype.hide = function(event){
    	this.div.style.display="none";
    }
    CustomOverlay.prototype.show = function(event){
    	this.div.style.display="block";
    }
    function move(tempThis,shape){
    	_Q(shape).draggable({
			start:function(event){
				tempThis.map.set('draggable',false);
				event.cancelBubble = true;
	            if(event.stopPropagation){
	            	event.stopPropagation();
	            }
			},
            stop:function(event,ui){
            	targetObj = tempThis;
                tempThis.polygonMoved(tempThis.getProjection().fromDivPixelToLatLng(new google.maps.Point(ui.position.left,ui.position.top)));
                tempThis.map.set('draggable',true);
            }
        });
    }    
	    CustomOverlay.prototype.polygonMoved = function(latLng)
	    {
//	    	alert("polygonMoved");
		    var lat = latLng.lat();
			var lng = latLng.lng();
			lat = lat-0.0000424;
			lng = lng+0.000055;
			if(this.arr.device_==100){
				device_coordinateX = lat;
				device_coordinateY = lng;
			}else if(this.arr.device_==500){
				skj_coordinateX = lat;
				skj_coordinateY = lng;
			}else if(this.arr.device_==600){
				qxz_coordinateX = lat;
				qxz_coordinateY = lng;
			}
			var newLatLng = new google.maps.LatLng(lat,lng);
			var tunnel = checkPointTunnel(newLatLng);
			if(tunnel != null){
				tunnelId = tunnel._id;
			}else{
				tunnelId = null;
			}
			var partition = checkPointPartition(newLatLng);
			if(partition!=null){
//				alert("partition._id:"+partition._id);
				parId = partition._id;
			}else{
				parId = null;
			}
			if(tunnel==null&&this.arr.device_==100){
				alert("传感器需要放在区域内!");
				this.draw();
				return;
			}else if(tunnel==null&&this.arr.device_==500){
				alert("刷卡机需要放在区域内!");
				this.draw();
				return;
			}else if(tunnel!=null&&tunnel.device_&&this.arr.device_==100){
				if(tunnel.device_.arr._index!=this.arr._index){
					alert("此区域已经存在传感器!");
					this.draw();
					return ;
				}
			}else if(tunnel!=null&&tunnel.ccmdevice_&&this.arr.device_==500){
				if(tunnel.ccmdevice_.arr._index!=this.arr._index){
					alert("此区域已经存在刷卡机!");
					this.draw();
					return ;
				}
			}
			_Q("#myModal3").modal('show');
		this.quadrilateral.oldlatLng = this.quadrilateral.latLng;
        this.quadrilateral.latLng = newLatLng;
//	   }
    };
 
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
//<![CDATA[
var mapdebug = true;
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

(function(_Q) {
	_Q.fn.extend({
		"rightClick" : function(fn,target) {
			_Q(target).bind('contextmenu', function(e) {
				return false;
			});
			_Q(this).mousedown(function(e) {
				if (3 == e.which) {
					fn();
				}
			});
		}
	});

})(_Q); 

var nowD = new Date();
var nowD_ = new Date(nowD.getFullYear(), nowD.getMonth(), nowD.getDate());
var nowD_2 = new Date(nowD.getFullYear(), nowD.getMonth() + 1, nowD.getDate());

   var map;
   var drawingManager;
	var array = new Array();
	var array_mark= new Array();//第一级描点集合.
	var mark__index = 1;//第一级下标,取数据库
	var second__index = 1;
	var third__index = 1;
	var selectedShape;
	var mark1Array = new Array();//基地
	var mark2Array = new Array();//分区
	var mark3Array = new Array();//大棚
	var deviceArray = new Array();//设备
	var videoArray = new Array();//视频
	var krpanoArray = new Array();//全景
	var copyArray = new Array();
	var copyDeletedArray = new Array();
	var dbclick_ = 0;
	var noPaint;
	var backname = "";
	var device_index = 1;
	var video_index = 1;
	var krpano_index = 1;
	var movetype = 0;
	//无作物大棚图片

	var nonesrc = workpath+"/asset/images/wt.png";
	var moresrc = workpath+"/asset/images/dt.png";
	var addsrc = workpath+"/asset/images/add_y.png";
	var devicesrc = workpath+"/asset/images/vidicon2.png";
	var weathersrc = workpath+"/asset/images/vidicon4.png";
	var videosrc = workpath+"/asset/images/vidicon3.png";
	var animalsrc = workpath + "/asset/images/animal_3.png";
	var moreanimal = workpath + "/asset/images/more_animal.png";
	var krpanosrc = workpath+"/asset/images/krpanoimg2.png";
	var oneimg = workpath + "/asset/images/oneimg.png";
	var twoimg = workpath + "/asset/images/twoimg.png";
	var geo_blue = workpath + "/asset/images/geo_blue.png";
	var geo_gray = workpath + "/asset/images/geo_gray.png";
	var krpanoObj = null;
	var isshift = false;
	var iscopy = 0; //0未复制，1复制大棚，2复制分区，3复制基地
	var copytarget = null;
	var menu ;
	var movepolygon = null;
	var ismove = false;
	var copy_tips_time ;
	var markerIndex = google.maps.Marker.MAX_ZINDEX;
	window.onkeydown = function(event) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		 if(e && e.keyCode==16){ // Shift
			 isshift = true;
			 //console.log("keydown");
		 }
	  }
	  window.onkeyup = function(event) {
		  var e = event || window.event || arguments.callee.caller.arguments[0];
			 if(e && e.keyCode==16){ // Shift 
				 isshift = false;
				 //console.log("keyup");
				 if(copyArray.length == 1){
					if(copyArray[0]._copy == 1){
					        	copyIsOk();
					}
				 }else if(copyArray.length > 1){
		        	copyIsOk();
				 }
			 }
	  }
	  window.onblur = function(){
		  
	  }
	//取消选中的区域
function clearSelection() {
       if (selectedShape) {
         selectedShape.setEditable(false);
         selectedShape = null;
       }
     }

//选中区域 允许编辑
     function setSelection(shape) {
       clearSelection();
       selectedShape = shape;
       shape.setEditable(true);
     }
//删除选中区域
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
		defaultZoom = 4;
		lag = new google.maps.LatLng(36.87962060502676, 107.05078125);
	}
	
 var mapOptions = {  
   center: lag,  
   zoom: defaultZoom,  
   mapTypeId: google.maps.MapTypeId.SATELLITE,
	streetViewControl: false,// 取消街景
   //disableDoubleClickZoom:true,
   mapTypeControl:false,
   scaleControl: true
   //mapTypeControlOptions:{position:google.maps.ControlPosition.LEFT_TOP},
 };  


 //div显示地图  
 map = new google.maps.Map(document.getElementById('map-canvas'),  
   mapOptions);  
 
 menu = new MenuControl(map);
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
   strokeColor: "#FF0000",  //描边的颜色
   strokeOpacity: 0.8,  	//描边的透明度
   strokeWeight: 2,  		//描边的线宽
   fillColor: null,  		//填充的颜色
   fillOpacity: 0.4,		//填充的透明度
   editable: true,			//允许编辑
	}  
 });  
 google.maps.event.addListener(map, "rightclick", function(event) {
	 if(iscopy==0){
		 
	 }else if(iscopy==1){
		 if(copytarget!=null && copyArray.length == 0){
			menu.reset();
 			menu.addItem(new MenuItem({
 		        text: "粘贴",
 		        icon: workpath + "/asset/images/map_icon0_05.png",
 		        groupName: "map",
 		        handler: function(coor) {
 		        	copypolygon(coor,2);
 		        }
 		    }));
 			menu.addItem(new MenuItem({
 		        text: "取消复制",
 		        icon: workpath + "/asset/images/map_icon0_05.png",
 		        groupName: "map",
 		        handler: function(coor) {
 		        	copytarget = null;
 		        	iscopy = 0;
 		        	setClickAbled(true);
 		        }
 		    }));
 			if (menu.isEnable) {
 				var clickedPosition = getCanvasXY(event.latLng);
 	            menu.coordinate = {
 	                point: clickedPosition,
 	                latlng: event.latLng
 	            };
 	            menu.container.style.left = clickedPosition.x + "px";
 	            menu.container.style.top = clickedPosition.y + "px";
 	            menu.show();
 	        }
		 }else if(copyArray.length == 1){
			if(copyArray[0]._copy == 1){
				menu.reset();
				menu.addItem(new MenuItem({
			        text: "完成复制",
			        icon: workpath + "/asset/images/map_icon0_05.png",
			        groupName: "map",
			        handler: function(coor) {
			        	copyIsOk();
			        }
			    }));
				if (menu.isEnable) {
					var clickedPosition = getCanvasXY(event.latLng);
		            menu.coordinate = {
		                point: clickedPosition,
		                latlng: event.latLng
		            };
		            menu.container.style.left = clickedPosition.x + "px";
		            menu.container.style.top = clickedPosition.y + "px";
		            menu.show();
		        }
			}
		 }else if(copyArray.length > 1){
			menu.reset();
			menu.addItem(new MenuItem({
		        text: "完成复制",
		        icon: workpath + "/asset/images/map_icon0_05.png",
		        groupName: "map",
		        handler: function(coor) {
		        	copyIsOk();
		        }
		    }));
			if (menu.isEnable) {
				var clickedPosition = getCanvasXY(event.latLng);
	            menu.coordinate = {
	                point: clickedPosition,
	                latlng: event.latLng
	            };
	            menu.container.style.left = clickedPosition.x + "px";
	            menu.container.style.top = clickedPosition.y + "px";
	            menu.show();
	        }
		 }
	 }
 });
 
 if(mapdebug)
 google.maps.event.addListener(map, "click", function(event) {
	 if(isshift && iscopy == 1 && copytarget != null){
		 //checkShiftLaglng = {lat:event.latLng.G,lng:event.latLng.K};
		 checkShiftLaglng =  {
              latlng: event.latLng
          }
		 checkShift();
	 }
 });
 
 if(mapdebug)
 drawingManager.setMap(map);  
 //注册 多边形 绘制完成事件   
 if(mapdebug)
  google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {   
	  //第一步完成检测
	if (event.type == google.maps.drawing.OverlayType.MARKER) {
		if(!drawingManager.isshow){
			event.overlay.setMap(null);
			return;
		}
		if(!drawingManager.device_){ //画基地锚点
				var b0 = false;
			for(var i = 0;i<mark1Array.length;i++){
				var m = mark1Array[i];
				if(m.getMap()!=null){
					if(m.Contains(event.overlay.getPosition())){
						alert("厂区重复");
						event.overlay.setMap(null);
						
						return ;
					}
				}
			}
			if(b0){
				drawingManager.setDrawingMode(null);
				return;
			}
			var m = event.overlay;
					m._coordinate_X=event.overlay.getPosition().lat();
					m._coordinate_Y=event.overlay.getPosition().lng();
				if(!m._index){
					m._index=++mark__index;
					m._name="";
					m._description="";
					m._contact="";
					m._phone="";
					m._address="";
					m.title="";
					m._id="";
				}
				try{closeAutoCom(1);}catch(e){}
				openAutoCom(1);
				_Q("#mark_info_name").val(m._name);
				_Q("#mark_info_index").val(m._index);	
				_Q("#mark_info_x").val(m._coordinate_X);
				_Q("#mark_info_y").val(m._coordinate_Y);
				_Q("#mark_info_id").val(m._id);
				_Q(".rightNo").hide();
				_Q(".rightNo1").show();
				_Q("#divtittle").text("编辑基地位置");
				open_right_panel();
				_Q(".tc_top_03").show();
				_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
				_Q(".btnOpen").hide();
			m.setDraggable(true);
			google.maps.event.addListener(m, 'dragend',function(){//基地锚点拖动之后事件
				m._coordinate_X=m.getPosition().lat();
				m._coordinate_Y=m.getPosition().lng();
				_Q("#mark_info_name").val(m._name);
				_Q("#mark_info_index").val(m._index);	
				_Q("#mark_info_x").val(m._coordinate_X);
				_Q("#mark_info_y").val(m._coordinate_Y);
				_Q("#mark_info_id").val(m._id);
				_Q(".rightNo").hide();
				_Q(".rightNo1").show();
				_Q("#divtittle").text("编辑基地位置");
				open_right_panel();
				_Q(".tc_top_03").show();
				_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
				_Q(".btnOpen").hide();
			});
			array_mark.push(m);
			google.maps.event.addDomListener(m, 'dblclick', function() {//基地锚点双击事件
				_Q("#mark_info_name").val(m._name);
				_Q("#mark_info_index").val(m._index);	
				_Q("#mark_info_x").val(m._coordinate_X);
				_Q("#mark_info_y").val(m._coordinate_Y);
				_Q("#mark_info_id").val(m._id);
				_Q(".rightNo").hide();
				_Q(".rightNo1").show();
				_Q("#divtittle").text("编辑基地位置");
				open_right_panel();
				_Q(".tc_top_03").show();
				_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
				_Q(".btnOpen").hide();
			});
			
			google.maps.event.addDomListener(m, 'click', function() {//基地锚点单击时间
				_Q(".cm_name").html(m._name);
				_Q(".cm_name").attr('title',m._name);
				if(m._ploygon){
					_Q(".fl_concat").html(""+m._ploygon._contact);
					_Q(".fl_concat").attr("title",m._ploygon._contact);
					_Q(".phone").html(""+m._ploygon._phone);
					_Q(".phone").attr("title",m._ploygon._phone);
					_Q(".cm_address").html(""+m._ploygon._address);
					_Q(".cm_address").attr("title",m._ploygon._address);
					_Q(".cm_mark").html("描述："+m._ploygon._description);
					_Q(".cm_mark").attr("title",m._ploygon._description);
					_Q("#baseurl").attr("src",_Q("#baseurl").attr("aa"));
				}else{
					_Q(".fl_concat").html("");
					_Q(".fl_concat").removeAttr("title");
					_Q(".phone").html("");
					_Q(".phone").removeAttr("title");
					_Q(".cm_address").html("");
					_Q(".cm_address").removeAttr("title");
					_Q(".cm_mark").html("描述：");
					_Q(".cm_mark").removeAttr("title");
					_Q("#baseurl").attr("src",_Q("#baseurl").attr("aa"));
				}
				_Q("#dropdown-menu2 li:eq(0)").unbind("click");
				_Q("#dropdown-menu2 li:eq(0)").click(function(){
					if(m._ploygon){
						m._ploygon.ondblclick();
					}else{
						editMark(m._index);
					}
					closeCm();
				});
				_Q("#dropdown-menu2 li:eq(1)").unbind("click");
				_Q("#dropdown-menu2 li:eq(1)").click(function(){
					movemarker(m);
					movetype = 1;
					closeCm();
				});
				_Q("#dropdown-menu2 li:eq(2)").unbind("click");
				_Q("#dropdown-menu2 li:eq(2)").click(function(){
					movemarker(marker);
					movetype = 2;
					closeCm();
				});
				_Q('#login4').show();
				_Q(".farmIntroPop").show();
				_Q("#dropdown-menu2").hide();
				_Q(".farmIntroPop").css("left",_Q('#login4').width()/2-320/2+71);
        		_Q(".farmIntroPop").css("top",_Q("#mPane").height()/2-_Q(".farmIntroPop").height());
				map.setCenter(m.getPosition());
				map.setZoom(16);
	      });
			
			google.maps.event.addListener(m, 'rightclick', function() {
				_Q("#mark_info_index").val(m._index);
    			thirdcopy(event,m._id,m,0);
			  });
			drawingManager.setDrawingMode(null);
		}else{
			var X=event.overlay.getPosition().lat();
			var Y=event.overlay.getPosition().lng();
			var latlng = new google.maps.LatLng(X,Y);
			event.overlay.setMap(null);
			if(drawingManager.device_==1||drawingManager.device_==2){ //传感器和气象站 绘画
				var arr = {device_:drawingManager.device_};
				addDevice(drawingManager.device_);
				var base = checkPointBase(latlng); //锚点所属基地
				if(base!=null){
					_Q("#device_base_id").val(base._marker._id);
					_Q("#device_base_name").val(base._name);
					arr.device_base_id =base._marker._id;
					arr.device_base_name = base._name;
				}else{
					_Q("#device_base_id").val("");
					_Q("#device_base_name").val("");
					arr.device_base_id ="";
					arr.device_base_name = "";
				}
				var partition = checkPointPartition(latlng); //锚点所属分区
				if(partition!=null){
					_Q("#device_partition_id").val(partition._id);
					_Q("#device_partition_name").val(partition._name);
					arr.device_partition_id = partition._id;
					arr.device_partition_name = partition._name;
				}else{
					_Q("#device_partition_id").val("");
					_Q("#device_partition_name").val("");
					arr.device_partition_id = "";
					arr.device_partition_name = "";
				}
				var tunnel = checkPointTunnel(latlng); //锚点所属大棚
				if(tunnel!=null){
					_Q("#device_tunnel_id").val(tunnel._id);
					_Q("#device_tunnel_name").val(tunnel._name);
					arr.device_tunnel_id = tunnel._id;
					arr.device_tunnel_name = tunnel._name;
				}else{
					_Q("#device_tunnel_id").val("");
					_Q("#device_tunnel_name").val("");
					arr.device_tunnel_id = "";
					arr.device_tunnel_name = "";
				}
				
				if(tunnel==null&&drawingManager.device_==1){
					alert("传感器需要放在区域内!");
					return ;
				}else if(tunnel!=null&&tunnel.device_&&drawingManager.device_==1){
					alert("此区域已经存在传感器!");
					return ;
				}
				
				arr.device_id = "";
				arr.device_sn = "";
				arr.device_name = "";
				arr.device_description="";
				arr.device_factory = "";
				arr.device_deviceType = drawingManager.device_;
				arr.device_type_id = "";
				arr.device_coordinateX = X;
				arr.device_coordinateY = Y;
				arr.device_status = 0;
				_Q(".rido1").trigger("click");
				_Q(".aps_radio:eq(0)").trigger("click");
				_Q("#device_coordinateX").val(X);
				_Q("#device_coordinateY").val(Y);
				_Q("#device_deviceType").val(drawingManager.device_);
				_Q("#device_type_id")[0].selectedIndex = 0;
				_Q("#device_type_id").selectpicker('refresh');
				_Q("#device_type_id2")[0].selectedIndex = 0;
				_Q("#device_type_id2").selectpicker('refresh');
				arr._index = ++device_index;
				var customOveray = new CustomOverlay(map,"",latlng,arr);
				_Q(".tc_rw_rw2").scrollTop(0);
				_Q("#device_index").val(arr._index);
				_Q("#divtittle").text("编辑设备");
				_Q(".tc_top_03").show();
				_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
				open_right_panel();
				deviceArray.push(customOveray);
				drawingManager.setDrawingMode(null);
				return;
			}else if(drawingManager.device_==3){//视频 绘画
				var arr = {device_:drawingManager.device_};
				var base = checkPointBase(latlng); //锚点所属基地
				if(base!=null){
					arr.video_base_id =base._marker._id;
					arr.video_base_name = base._name;
				}else{
					arr.video_base_id ="";
					arr.video_base_name = "";
				}
				var partition = checkPointPartition(latlng);//锚点所属分区
				if(partition!=null){
					arr.video_partition_id = partition._id;
					arr.video_partition_name = partition._name;
				}else{
					arr.video_partition_id = "";
					arr.video_partition_name = "";
				}
				var tunnel = checkPointTunnel(latlng);//锚点所属大棚
				if(tunnel!=null){
					arr.video_tunnel_id = tunnel._id;
					arr.video_tunnel_name = tunnel._name;
				}else{
					arr.video_tunnel_id = "";
					arr.video_tunnel_name = "";
				}
				arr.video_id = "";
				arr.video_coordinateX = latlng.lat();
				arr.video_coordinateY = latlng.lng();
				arr._index = ++video_index;
				var customOveray = new CustomOverlay(map,"",latlng,arr);
				_Q(".video_btn_delete").hide();
				_Q("#video_iframe").attr("src",workpath+"/map/MapVideo.seam?video_coordinateX="+latlng.lat()+"&video_coordinateY="+latlng.lng()+"&video_base_id="+arr.video_base_id
						+"&video_base_name="+arr.video_base_name+"&video_partition_id="+arr.video_partition_id+"&video_partition_name="+arr.video_partition_name+
						"&video_tunnel_id="+arr.video_tunnel_id+"&video_tunnel_name="+arr.video_tunnel_name);
				_Q("#video_index").val(arr._index);
				_Q("#divtittle").text("编辑视频设备");
				_Q(".tc_top_03").show();
				_Q(".rightNo").hide();
				_Q(".rightNo11").show();
				_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
				open_right_panel();
				videoArray.push(customOveray);
				drawingManager.setDrawingMode(null);
				return;
			}else if(drawingManager.device_==4){//视频 绘画
				var arr = {device_:drawingManager.device_};
				var base = checkPointBase(latlng); //锚点所属基地
				if(base!=null){
					_Q("#krpano_base_id").val(base._marker._id);
					_Q("#krpano_base_name").val(base._name);
					arr.krpano_base_id =base._marker._id;
					arr.krpano_base_name = base._name;
				}else{
					_Q("#krpano_base_id").val("");
					_Q("#krpano_base_name").val("");
					arr.krpano_base_id ="";
					arr.krpano_base_name = "";
				}
				var partition = checkPointPartition(latlng);//锚点所属分区
				if(partition!=null){
					_Q("#krpano_partition_id").val(partition._id);
					_Q("#krpano_partition_name").val(partition._name);
					arr.krpano_partition_id = partition._id;
					arr.krpano_partition_name = partition._name;
				}else{
					_Q("#krpano_partition_id").val("");
					_Q("#krpano_partition_name").val("");
					arr.krpano_partition_id = "";
					arr.krpano_partition_name = "";
				}
				var tunnel = checkPointTunnel(latlng);//锚点所属大棚
				if(tunnel!=null){
					_Q("#krpano_tunnel_id").val(tunnel._id);
					_Q("#krpano_tunnel_name").val(tunnel._name);
					arr.krpano_tunnel_id = tunnel._id;
					arr.krpano_tunnel_name = tunnel._name;
				}else{
					_Q("#krpano_tunnel_id").val("");
					_Q("#krpano_tunnel_name").val("");
					arr.krpano_tunnel_id = "";
					arr.krpano_tunnel_name = "";
				}
				arr.krpano_id = "";
				arr.krpano_sn = "";
				arr.krpano_name = "";
				arr.krpano_coordinateX = X;
				arr.krpano_coordinateY = Y;
				arr._index = ++krpano_index;
				resetSessionKrpano(arr.krpano_id);
				add_krpano(arr);
				var customOveray = new CustomOverlay(map,krpanosrc,latlng,arr);
				_Q(".tc_rw_rw2").scrollTop(0);
				_Q("#video_index").val(arr._index);
				_Q("#divtittle").text("编辑四季田景");
				_Q(".tc_top_03").show();
				_Q(".rightNo").hide();
				_Q(".rightNo13").show();
				_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
				open_right_panel();
				krpanoArray.push(customOveray);
				drawingManager.setDrawingMode(null);
				return;
			}
		}
	}
	//多边形绘画完成触发
   if (event.type == google.maps.drawing.OverlayType.POLYGON) {   
   var radius = event.overlay.getPath();   
   var mianji = google.maps.geometry.spherical.computeArea(radius)*0.0015;    //1平方米==0.0015亩
   mianji = CurrencyFormatted(mianji);
	var newShape = event.overlay;
	newShape.mianji=mianji;
	
	array.push(newShape);
	setSelection(newShape);

 }   

}
);
////////
  //多边形绘画完成触发
  if(mapdebug)
google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
	if(!drawingManager.isshow){
		polygon.setMap(null);
		return;
	}
	var mtype = drawingManager.mytype;
	var m;
	var b0=false;
	var pointStr ="";
	 if(mtype==1){//基地画范围
		 if(array_mark.length==0){
			 polygon.setMap(null);
			 alert("请先描点");
			 b0=true;
			 return;
		 }
		 for(var i = 0;i<array_mark.length;i++){ 
			m = array_mark[i];
			if(!m._btype&&m.getMap()!=null){
				if(polygon.Contains(m.getPosition())){
					break;
				}else if(i==array_mark.length-1){
					polygon.setMap(null);
					alert("请圈中描点");
					m._btype=undefined;
					b0=true;
					break;
				}
			}else if(i==array_mark.length-1){
				polygon.setMap(null);
				alert("请圈中描点");
				m._btype=undefined;
				b0=true;
				 break;
			}
		 }
			if(b0){
				return;
			 }
		  var bounds = new google.maps.LatLngBounds();
		  var array= polygon.getPath().getArray();
		  for(var i = 0;i<array.length;i++){
				bounds.extend(array[i]);
				pointStr+=array[i]+"_";
		  }
	
	 }
	 if(b0){
		return;
	 }
	 if(mtype==1){
		m._btype=true;
		m._ploygon=polygon;
		polygon.mtype=1;
		polygon._marker=m;
		mark1Array.push(polygon);
		polygon._coordinate_group=pointStr;
		polygon._group_bak = pointStr;
		polygon._name=m._name;
		polygon._contact="";
		polygon._phone="";
		polygon._address="";
		polygon._description="";
		var radius = polygon.getPath();   
		google.maps.event.addListener(radius, 'insert_at',function(index){reset1(polygon,radius,index,this);} );
		google.maps.event.addListener(radius, 'remove_at',function(index){reset1(polygon,radius,index,this);});
		google.maps.event.addListener(radius, 'set_at', function(index){reset1(polygon,radius,index,this);});
		google.maps.event.addDomListener(polygon, 'rightclick', function(event){
			_Q("#mark_id").val(polygon._marker._id);
			thirdcopy(event,polygon._marker._id,polygon,1);
		});
		google.maps.event.addDomListener(polygon, 'dblclick', function() { //基地双击事件  赋值,弹出右侧
			setSelection(polygon);
			_Q(".rightNo").hide();
			_Q(".rightNo2").show();
			_Q("#divtittle").text("编辑基地范围");
			open_right_panel();
			_Q(".tc_top_03").show();
			_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
			_Q(".btnOpen").hide();
			_Q("#mark_id").val(polygon._marker._id);
		    _Q("#mark_name").val(polygon._name);
		    _Q("#mark_area").val(polygon.mianji);
		    _Q("#mark_contact").val(polygon._contact);
		    _Q("#mark_phone").val(polygon._phone);
		    _Q("#mark_address").val(polygon._address);
		    _Q("#mark_description").val(polygon._description);
		    _Q("#mark_coordinate_group").val(polygon._coordinate_group);
		    _Q("input[name='baseFormColor']").val(polygon.get("fillColor"));
   		    _Q("#baseForm\\:color-colorPicker-hex").val(polygon.get("fillColor").replace("#",""));
   		    _Q(".rich-color-picker-icon").css("background-color",polygon.get("fillColor"));
		});
		//画完弹出右侧对话框
		_Q("#mark_id").val(polygon._marker._id);
	    _Q("#mark_name").val(polygon._name);
	    _Q("#mark_area").val(polygon.mianji);
	    _Q("#mark_contact").val(polygon._contact);
	    _Q("#mark_phone").val(polygon._phone);
	    _Q("#mark_address").val(polygon._address);
	    _Q("#mark_description").val(polygon._description);
	    _Q("#mark_coordinate_group").val(polygon._coordinate_group);
	    _Q("input[name='baseFormColor']").val(polygon.get("fillColor"));
	    _Q("#baseForm\\:color-colorPicker-hex").val(polygon.get("fillColor").replace("#",""));
	    _Q(".rich-color-picker-icon").css("background-color",polygon.get("fillColor"));
	    _Q(".rightNo").hide();
		_Q(".rightNo2").show();
		_Q("#divtittle").text("编辑基地范围");
		drawingManager.setDrawingMode(null);
		setSelection(polygon);
		open_right_panel();
		_Q(".tc_top_03").show();
		_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
		_Q(".btnOpen").hide();
		return;
	 }
	var b1=false;
	if(mtype==2){//区域完成,判断是否在基地内
		var bounds ;
		var array= polygon.getPath().getArray();
		for(var i = 0;i<mark1Array.length;i++){
			m = mark1Array[i];
			if(m.Contains(array[0])&&m.getMap()!=null){
				bounds = new google.maps.LatLngBounds();
				bounds.extend(array[0]);
				pointStr+=array[0]+"_";
				for(var j = 1;j<array.length;j++){
					bounds.extend(array[j]);
					pointStr+=array[j]+"_";
					if(!m.Contains(array[j])){
						alert("请画在厂区图内");
						polygon.setMap(null);
						b1=true;
						break;
					}
				}
				break;
			}else if(i==mark1Array.length-1){
				alert("请画在厂区图内");
				polygon.setMap(null);
				b1=true;
				break;
			}
		}
		
	
	if(b1){
		return;
	}else{
		polygon._base_id=m._marker._id;
		polygon._parent=m;
		polygon._name="";
		polygon._id="";
		polygon._group=pointStr;
		polygon._color="";
		polygon._description="";
		polygon._index=++second__index;
		polygon.partition_x=bounds.getCenter().lat();
		polygon.partition_y=bounds.getCenter().lng();
		var radius = polygon.getPath();   
		google.maps.event.addListener(radius, 'insert_at',function(index){reset2(polygon,radius,index,this);} );
		google.maps.event.addListener(radius, 'remove_at',function(index){reset2(polygon,radius,index,this);});
		google.maps.event.addListener(radius, 'set_at', function(index){reset2(polygon,radius,index,this);});
		google.maps.event.addDomListener(polygon, 'click', function(event){
			if(!menu.isHide()){
				menu.hide();
			}
		});
		google.maps.event.addDomListener(polygon, 'rightclick', function(event){
			_Q("#partition_index").val(polygon._index);
			thirdcopy(event,polygon._id,polygon,2);
		});
		google.maps.event.addDomListener(polygon, 'dblclick', function() {//分区双击事件,弹出右侧,赋值
			setSelection(polygon);
			_Q(".rightNo").hide();
			_Q(".rightNo3").show();
			_Q("#divtittle").text("编辑区域分区");
			open_right_panel();
			
			if(polygon._id!=""&&polygon._id!=undefined){
				_Q(".use_field").show();
				var html = "";
				_Q(".soil_table").empty();
				for(var i = 0;i<soilStr.length;i++){
					var tem = soilStr[i];
					if(tem.partitionId==bermudaTriangle._id){
						var s = tem.route_of;
						if(s.length>5)
							s = s.substring(0,5)+"...";
						html+="<tr class='soill"+tem.id+"'><td>"+tem.begin_time+"年"+tem.end_time+"年</td><td title='"+tem.route_of+"'>"+s+"</td><td><a href='#' onclick='editsoil("+tem.id+")'>修改</a>  <a href='#' onclick='delsoil("+tem.id+")'>删除</a></td></tr>";
					}
				}
				if(html!=""){
					html = "<tr><td>时间</td><td>用途</td><td>操作</td></tr>"+html;
					_Q(".soil_table").empty().append(html);
				}
				_Q(".land_test_").show();
				var html2 = "";
				_Q(".land_table").empty();
				for(var i = 0;i<landStr.length;i++){
					var tem = landStr[i];
					if(tem.partitionId==bermudaTriangle._id){
						html2+="<tr class='land"+tem.id+"'><td class='bc_th01'>"+tem.testDate+"</td><td  class='bc_th01' >"+tem.testOrg+"</td><td  class='bc_th01' >"+tem.phVal+"</td><td  class='bc_th01'><a href='#' onclick='editland("+tem.id+")'>修改</a>  <a href='#' onclick='delland("+tem.id+")'>删除</a></td></tr>";
					}
				}
				if(html2!=""){
					html2 = "<tr><td class='bc_th01'>测试日期</td><td class='bc_th01'>测试机构</td><td class='bc_th01'>酸碱度</td><td class='bc_th01' style='width:20%'>操作</td></tr>"+html2;
					_Q(".land_table").empty().append(html2);
				}
			}else{
				_Q(".use_field").hide();
				_Q(".land_test_").hide();
			}
			_Q(".tc_top_03").show();
			_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
			_Q(".btnOpen").hide();
			_Q("#partition_x").val(polygon.partition_x);
			_Q("#partition_y").val(polygon.partition_y);
			_Q("#partition_name").val(polygon._name);
			_Q("#partition_id").val(polygon._id);
		    _Q("#base_id").val(polygon._base_id);
		    _Q("#partition_index").val(polygon._index);
		    _Q("#partition_group").val(polygon._group);
		    _Q("#partition_area").val(polygon.mianji);
		    _Q("#partition_description").val(polygon._description);
		    _Q("input[name='partitionFormColor']").val(polygon.get("fillColor"));
   		    _Q("#partitionForm\\:color-colorPicker-hex").val(polygon.get("fillColor").replace("#",""));
   		    _Q(".rich-color-picker-icon").css("background-color",polygon.get("fillColor"));
   		    setMapNull();
		});
		try{closeAutoCom(2);}catch(e){}
		openAutoCom(2,polygon._base_id);
		//画完弹出右侧,赋值
		_Q(".use_field").hide();
		_Q(".land_test_").hide();
		_Q(".soil_table").empty();
		_Q(".land_table").empty();
		_Q("#partition_x").val(polygon.partition_x);
		_Q("#partition_y").val(polygon.partition_y);
		_Q("#partition_name").val(polygon._name);
		_Q("#partition_id").val(polygon._id);
	    _Q("#base_id").val(polygon._base_id);
	    _Q("#partition_group").val(polygon._group);
	    _Q("#partition_area").val(polygon.mianji);
	    _Q("#partition_index").val(polygon._index);
	    _Q("#partition_description").val(polygon._description);
	    _Q("input[name='partitionFormColor']").val(polygon.get("fillColor"));
	    _Q("#partitionForm\\:color-colorPicker-hex").val(polygon.get("fillColor").replace("#",""));
	    _Q(".rich-color-picker-icon").css("background-color",polygon.get("fillColor"));
	    _Q(".rightNo").hide();
		_Q(".rightNo3").show();
		_Q("#divtittle").text("编辑区域分区");
		open_right_panel();		
		_Q(".tc_top_03").show();
		_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
		_Q(".btnOpen").hide();
		mark2Array.push(polygon);
		drawingManager.setDrawingMode(null);
		setSelection(polygon);
	}
	return;
	}
	var b2 = false;
	var b2_ = false;
	var bounds;
	if(mtype==3){//大棚 检测是否在基地内
		var array= polygon.getPath().getArray();
		var base_id;
		for(var i = 0;i<mark1Array.length;i++){
			m = mark1Array[i];
			if(m.Contains(array[0])&&m.getMap()!=null){
				bounds = new google.maps.LatLngBounds();
				bounds.extend(array[0]);
				pointStr+=array[0]+"_";
				for(var j = 1;j<array.length;j++){
					bounds.extend(array[j]);
					pointStr+=array[j]+"_";
					if(!m.Contains(array[j])){
						alert("请画在厂区图内");
						polygon.setMap(null);
						b2=true;
						break;
					}
				}
				base_id = m._marker._id;
				break;
				
			}else if(i==mark1Array.length-1){
				alert("请画在厂区图内");
				polygon.setMap(null);
				b2=true;
				break;
			}
		}
		if(b2){
			return;
		}
		if(drawingManager.select!=7 && mark2Array.length==0){
			alert("请画在分区内!");
			polygon.setMap(null);
			b2=true;
			return;
		}
		for(var i = 0;i<mark2Array.length;i++){//除了水面都不能画在分区外面
			m = mark2Array[i];
			if(m.Contains(array[0])&&m.getMap()!=null){
				bounds = new google.maps.LatLngBounds();
				bounds.extend(array[0]);
				for(var j = 1;j<array.length;j++){
					bounds.extend(array[j]);
					if(!m.Contains(array[j])){
						if(drawingManager.select!=7){
							alert("请画在分区内!");
							polygon.setMap(null);
							b2=true;
							break;
						}else{
							b2=false;
						}
						b2_=true;
						//break;
					}else if(j==array.length-1){
						b2 = false;
						break;
					}
				}
				break;
			}else if(i==mark2Array.length-1){
				if(drawingManager.select!=7){
					alert("请画在分区内!");
					polygon.setMap(null);
					b2=true;
					break;
				}else{
					b2=false;
					b2_=true;
					break;
				}
			}
		}
	}
	if(b2){
		return;
	}else{
		if(b2_){
			m = new Object();
			m.id = 0;
			m.name = "暂无数据";
		}
		var selected = false;
		if(_Q("#divFloatToolsView_").css("width").replace("px","")>1&&_Q(".rightNo5").is(":visible")&&noPaint!=null&&noPaint._group==''){
			selected = true;
		}
		if(selected){
			noPaint.mianji = polygon.mianji;
			polygon._group_parent_id=m._id;
			polygon._parent=m;
			polygon._name=noPaint._name;
			polygon._id=noPaint._id;
			polygon._group_type=drawingManager.select;
			polygon._group=pointStr;
			polygon._group_bak=pointStr;
			polygon._color="";
			polygon._regulate=noPaint._regulate;
			polygon._collects=noPaint._collects;
			polygon._farmer=noPaint._farmer;
			polygon._muarea=noPaint._muarea;
			polygon._index=noPaint._index;
			polygon._tunnel_group_id = noPain._tunnel_group_id;
			polygon._base_id=base_id;
			polygon._plant_length = 0;
			polygon._plant_Image = "";
			polygon._ftype = "";
			polygon._crop_area = 0;
			polygon._index_num = 0;
		}else{
			polygon._group_parent_id=m._id;
			polygon._parent=m;
			polygon._name="";
			polygon._id="";
			polygon._group_type=drawingManager.select;
			polygon._group=pointStr;
			polygon._group_bak=pointStr;
			polygon._color="";
			polygon._regulate="";
			polygon._collects="";
			polygon._farmer="";
			polygon._muarea="";
			polygon._tunnel_group_id="";
			polygon._index=++third__index;
			polygon._base_id=base_id;
			polygon._plant_length = 0;
			polygon._plant_Image = "";
			polygon._ftype = "";
			polygon._crop_area = 0;
			polygon._index_num = 0;
		}
		polygon.group_x=bounds.getCenter().lat();
		polygon.group_y=bounds.getCenter().lng();
		var radius = polygon.getPath();   
		google.maps.event.addListener(radius, 'insert_at',function(index){reset3(polygon,radius,index,this);} );
		google.maps.event.addListener(radius, 'remove_at',function(index){reset3(polygon,radius,index,this);});
		google.maps.event.addListener(radius, 'set_at', function(index){reset3(polygon,radius,index,this);});
		google.maps.event.addDomListener(polygon, 'click', function(event){
			if(!menu.isHide()){
    			menu.hide();
    		}
		});
		google.maps.event.addDomListener(polygon, 'rightclick', function(event){
			_Q("#group_index").val(polygon._index);
			thirdcopy(event,polygon._id,polygon,3);
		});
		google.maps.event.addDomListener(polygon, 'dblclick', function(event) {//大棚栓剂时间, 弹出右侧,赋值
			_Q(".baseMap_ttl").css('background','url('+workpath+'/asset/images/baseIcojian1.png) no-repeat 10px 12px center').next('.baseMap_con').show();
			if(backname==""){
				_Q("#upname").closest("li").hide();
			}else{
				_Q("#upname").closest("li").show();
				_Q("#upname").html(backname);
			}
			 _Q(".tc_rw_rw2").scrollTop(0);
			if(event) {
				_Q("#groupbutton1").show();
				_Q("#groupbutton2").hide();
				ret = 1;
			}else{
				_Q("#groupbutton1").hide();
				_Q("#groupbutton2").show();
				ret = 2;
			}
			var e_ = parseInt(polygon._group_type, 10);
			_Q(".plantEnvir a:eq("+(e_-1)+")").addClass('active').siblings().removeClass('active');	
			var tempName = "";
			for(var w = 0;w<mark2Array.length;w++){
				if(mark2Array[w]._id==polygon._group_parent_id)
					tempName = mark2Array[w]._name;
			}
			_Q("#group_type").val(polygon._group_type);
			_Q("#group_type_default").val(polygon._group_type);
			_Q("#group_type").selectpicker('refresh');
			
			_Q("#group_parent_id").empty();
			_Q("#group_parent_id").append(noneOption);
			for(var i = 0;i<mark2Array.length;i++){
				var polygon2 = mark2Array[i];
				if(polygon2.getMap()!=null&&polygon2._base_id==polygon._base_id){
					_Q("#group_parent_id").append("<option value='"+polygon2._id+"'>"+polygon2._name+"</option>");
				}
			}
			
			if(polygon._group_type==8){
				_Q(".animal_hide").find(".fenzu").show();
				_Q(".animal_hide").find(".fenzu").find("select").attr("name","group_groupId").attr("id","group_groupId");
				_Q(".plant_hide").find(".fenzu").hide();
				_Q(".plant_hide").find(".fenzu").find("select").attr("name","").attr("id","");
				_Q("#group_groupId").empty().append(_Q("#group_groupId_ [base_id='"+polygon._base_id+"']").clone());
				_Q('#group_farmer2').empty().append(_Q("#group_farmer2_ [base_id='"+polygon._base_id+"']").clone()).append(_Q("#group_farmer2_ [base_id='']").clone());
				_Q('#group_farmer3').empty().append(_Q("#group_farmer3_ [base_id='"+polygon._base_id+"']").clone()).append(_Q("#group_farmer3_ [base_id='']").clone());
			}else{
				_Q(".plant_hide").find(".fenzu").show();
				_Q(".plant_hide").find(".fenzu").find("select").attr("name","group_groupId").attr("id","group_groupId");
				_Q(".animal_hide").find(".fenzu").hide();
				_Q(".animal_hide").find(".fenzu").find("select").attr("name","").attr("id","");
				_Q("#group_groupId").empty().append(_Q("#group_groupId_ [base_id='"+polygon._base_id+"']").clone());
				_Q('#group_farmer').empty().append(_Q("#group_farmer_ [base_id='"+polygon._base_id+"']").clone()).append(_Q("#group_farmer_ [base_id='']").clone());
				_Q('#group_farmer1').empty().append(_Q("#group_farmer1_ [base_id='"+polygon._base_id+"']").clone()).append(_Q("#group_farmer1_ [base_id='']").clone());
			}
			nonecheck();
			if(polygon._group_parent_id>0){
				_Q("#group_parent_id").val(polygon._group_parent_id);
				_Q("#group_parent_id_default").val(polygon._group_parent_id);
				_Q("#group_parent_id").selectpicker('refresh');
			}else{
				_Q("#group_parent_id")[0].selectedIndex = 0;
				_Q("#group_parent_id_default").val(0);
				_Q("#group_parent_id").selectpicker('refresh');
			}
			 var tempArray = map5.get(polygon._id);
			    var html = "";
			    if(tempArray!=null){
				    for(var i = 0;i<tempArray.length;i++){
				    	var obj = tempArray[i];
				    	var tempsrc = obj.imground;
				    	if(tempsrc == "")
				    		tempsrc = nonesrc;
				    	//
				    	html+='<div class="rteic" ><img  style="cursor:pointer" width="53" height="53" src="'+workpath+'/asset/images/image_b3.png" class="rtpic" />'+
		                '<img width="53" height="53" src="'+tempsrc+'" class="rtimg" /><div class="ritex">'+obj.breed_name+'<input type="hidden" value="'+obj.breed_id+'" class="obj_breed_id"></input><input type="hidden" value="'+obj.crop_area+'" class="obj_crop_area"></input></div>'+
		                '<div class="rtehov" style="display: none;">'+
		                '<a href="#3" onclick="editPlant('+obj.real_plant_id+')" style=" position: absolute; bottom:0; right:0; top:-2px; left:-2px; z-index:103; display:block;"><img width="56" height="58" src="'+workpath+'/asset/images/hover.png"></a>'+
		                '<a href="#2" onclick="deletePlantSelf('+obj.real_plant_id+',this,'+polygon._id+')" class="rholli"><img width="18" height="18" src="'+workpath+'/asset/images/clo_03.png"></a>'+
		                '</div></div>';
				    }
			    }
		    html+='<div class="clear"></div>';
		    _Q("#env_type").val(polygon._group_type);
		    if(!polygon._id||polygon._id==null)
		    	_Q("#nowplant").hide();
		    else
		    	_Q("#nowplant").hide();
		    _Q(".tec_c").empty();
		    _Q(".tec_c").append(html);
			setSelection(polygon);
			_Q(".rightNo").hide();
			_Q(".rightNo5").show();
			_Q("#divtittle").text("编辑区域");
			
		    open_right_panel();
		    
		    if(polygon._group_type==8){
				_Q(".animal_hide").show();
				_Q(".plant_hide").hide();
				_Q('#group_groupId').val(polygon._tunnel_group_id);
				_Q('#group_farmer2').val(polygon._keeperId);
				_Q('#group_farmer3').val(polygon._masterId);
				_Q("#group_farmer2").selectpicker('refresh');
				_Q("#group_farmer3").selectpicker('refresh');
				_Q("#group_groupId").selectpicker('refresh');
			}else{
				_Q(".animal_hide").hide();
				_Q(".plant_hide").show();
				_Q('#group_groupId').val(polygon._tunnel_group_id);
				_Q('#group_farmer').val(polygon._keeperId);
				_Q('#group_farmer1').val(polygon._masterId);
				_Q("#group_farmer").selectpicker('refresh');
				_Q("#group_farmer1").selectpicker('refresh');
				_Q("#group_groupId").selectpicker('refresh');
			}
			_Q(".tc_top_03").show();
			_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
			_Q("#group_x").val(polygon.group_x);
			_Q("#group_y").val(polygon.group_y);
			_Q(".btnOpen").hide();
			_Q("#group_name").val(polygon._name);
			_Q("#group_id").val(polygon._id);
		    _Q("#group_parent_id").val(polygon._group_parent_id);
		    _Q("#group_index").val(polygon._index);
		    _Q("#group_group").val(polygon._group);
		    _Q("#group_area").val(polygon.mianji);
		    _Q("#group_area_hidden").text(polygon.mianji+"亩");
		    _Q("#group_type").val(polygon._group_type);
		    _Q("#group_farmer").val(polygon._keeperId);
		    _Q("#group_farmer1").val(polygon._masterId);
		    _Q("#group_base_id").val(polygon._base_id);
		    _Q("#muarea").val(polygon._muarea);
		    _Q(".ui-selectmenu-dropdown").addClass("small322");
		    _Q(".ui-selectmenu-dropdown").removeClass("ui-selectmenu-dropdown");
		    _Q(".ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
		    _Q(".ui-selectmenu-menu").removeClass("ui-selectmenu-menu");
		    if(polygon._group_type<5&&false)
		    	_Q(".firstblock").show();
		    else
		    	_Q(".firstblock").hide();
		    if(ret==1){
				_Q("#groupbutton1").show();
				_Q("#groupbutton2").hide();
			}else{
				_Q("#groupbutton1").hide();
				_Q("#groupbutton2").show();
			}
			ret = 1;
		    _Q("input[name='groupFormColor']").val(polygon.get("fillColor"));
   		    _Q("#groupForm\\:color-colorPicker-hex").val(polygon.get("fillColor").replace("#",""));
   		    _Q(".rich-color-picker-icon").css("background-color",polygon.get("fillColor"));
   		    map.setCenter(bounds.getCenter());
			map.setZoom(19);
   		    setMapNull();
		});
		
		//画完大棚,弹出右侧,赋值
		_Q(".baseMap_ttl").css('background','url('+workpath+'/asset/images/baseIcojian1.png) no-repeat 10px 12px center').next('.baseMap_con').show();
		if(backname==""){
			_Q("#upname").closest("li").hide();
		}else{
			_Q("#upname").closest("li").show();
			_Q("#upname").html(backname);
		}
		
		_Q("#group_type").val(polygon._group_type);
		_Q("#group_type_default").val(polygon._group_type);
		var e_ = parseInt(polygon._group_type, 10);
		_Q(".plantEnvir a:eq("+(e_-1)+")").addClass('active').siblings().removeClass('active');	
		_Q("#group_type").selectpicker('refresh');
		
		_Q("#group_parent_id").empty();
		_Q("#group_parent_id").append(noneOption);
		for(var i = 0;i<mark2Array.length;i++){
			var polygon2 = mark2Array[i];
			if(polygon2.getMap()!=null&&polygon2._base_id==polygon._base_id){
				_Q("#group_parent_id").append("<option value='"+polygon2._id+"'>"+polygon2._name+"</option>");
			}
		}
		
		if(polygon._group_type==8){
			_Q(".animal_hide").find(".fenzu").show();
			_Q(".animal_hide").find(".fenzu").find("select").attr("name","group_groupId").attr("id","group_groupId");
			_Q(".plant_hide").find(".fenzu").hide();
			_Q(".plant_hide").find(".fenzu").find("select").attr("name","").attr("id","");
			_Q("#group_groupId").empty().append(_Q("#group_groupId_ [base_id='"+polygon._base_id+"']").clone());
			_Q('#group_farmer2').empty().append(_Q("#group_farmer2_ [base_id='"+polygon._base_id+"']").clone()).append(_Q("#group_farmer2_ [base_id='']").clone());
			_Q('#group_farmer3').empty().append(_Q("#group_farmer3_ [base_id='"+polygon._base_id+"']").clone()).append(_Q("#group_farmer3_ [base_id='']").clone());
		}else{
			_Q(".plant_hide").find(".fenzu").show();
			_Q(".plant_hide").find(".fenzu").find("select").attr("name","group_groupId").attr("id","group_groupId");
			_Q(".animal_hide").find(".fenzu").hide();
			_Q(".animal_hide").find(".fenzu").find("select").attr("name","").attr("id","");
			_Q("#group_groupId").empty().append(_Q("#group_groupId_ [base_id='"+polygon._base_id+"']").clone());
			_Q('#group_farmer').empty().append(_Q("#group_farmer_ [base_id='"+polygon._base_id+"']").clone()).append(_Q("#group_farmer_ [base_id='']").clone());
			_Q('#group_farmer1').empty().append(_Q("#group_farmer1_ [base_id='"+polygon._base_id+"']").clone()).append(_Q("#group_farmer1_ [base_id='']").clone());
		}
		nonecheck();
		
		
		if(polygon._group_parent_id>0){
			_Q("#group_parent_id").val(polygon._group_parent_id);
			_Q("#group_parent_id_default").val(polygon._group_parent_id);
			_Q("#group_parent_id").selectpicker('refresh');
		}else{
			_Q("#group_parent_id")[0].selectedIndex = 0;
			_Q("#group_parent_id_default").val(0);
			_Q("#group_parent_id").selectpicker('refresh');
		}
		_Q("#group_parent_name").text(m._name);
		
		//_Q("#group_farmer").selectmenu("destroy").val(_Q("#group_farmer option[index='0']").val()).selectmenu({style:'dropdown'});
	    //_Q("#group_farmer1").selectmenu("destroy").val(_Q("#group_farmer1 option[index='0']").val()).selectmenu({style:'dropdown'});
	    _Q("#envType_").html(envTypeList[polygon._group_type]);
		_Q(".rightNo").hide();
		_Q(".rightNo5").show();
		_Q("#divtittle").text("编辑区域");
        try{closeAutoCom(3);}catch(e){}
        openAutoCom(3,polygon._base_id,polygon._group_parent_id,polygon._group_type);
		open_right_panel();
		
		_Q("#nowplant").hide();
		var html='<div class="clear"></div>';
	    _Q(".tec_c").empty();
	    _Q(".tec_c").append(html);
		_Q(".tc_top_03").show();
		_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
		_Q("#group_x").val(polygon.group_x);
		_Q("#group_y").val(polygon.group_y);
		_Q(".btnOpen").hide();
		_Q("#group_name").val(polygon._name);
		_Q("#group_id").val(polygon._id);
	    _Q("#group_parent_id").val(polygon._group_parent_id);
	    _Q("#group_index").val(polygon._index);
	    _Q("#group_group").val(polygon._group);
	    _Q("#group_area").val(polygon.mianji);
	    _Q("#group_area_hidden").text(polygon.mianji+"亩");
	    _Q("#group_type").val(polygon._group_type);
	    //_Q("#group_farmer").val(polygon._keeperId);
	    _Q("#group_base_id").val(polygon._base_id);
	    //_Q("#group_farmer1").val(polygon._masterId);
	    _Q("#muarea").val(polygon.mianji);
	  //clickOptions(_Q("#group_farmer").attr("aindex"),0,"group_farmer");
	 // clickOptions(_Q("#group_farmer1").attr("aindex"),0,"group_farmer1");
	    if(polygon._group_type<5&&false)
	    	_Q(".firstblock").show();
	    else
	    	_Q(".firstblock").hide();
	    _Q("input[name='groupFormColor']").val(polygon.get("fillColor"));
	    _Q("#groupForm\\:color-colorPicker-hex").val(polygon.get("fillColor").replace("#",""));
	    _Q(".rich-color-picker-icon").css("background-color",polygon.get("fillColor"));
	    if(polygon._group_type==8){
			_Q(".animal_hide").show();
			_Q(".plant_hide").hide();
			_Q('#group_farmer2').val(0);
			_Q('#group_farmer3').val(0);
			_Q('#group_groupId').val(0);
			_Q("#group_farmer2").selectpicker('refresh');
			_Q("#group_farmer3").selectpicker('refresh');
			_Q("#group_groupId").selectpicker('refresh');
		}else{
			_Q(".animal_hide").hide();
			_Q(".plant_hide").show();
			_Q('#group_farmer').val(0);
			_Q('#group_farmer1').val(0);
			_Q('#group_groupId').val(0);
			_Q("#group_farmer").selectpicker('refresh');
			_Q("#group_farmer1").selectpicker('refresh');
			_Q("#group_groupId").selectpicker('refresh');
		}
	    setMapNull();
	    drawingManager.setDrawingMode(null);
	    setSelection(polygon);
	    if(!selected){
	    	mark3Array.unshift(polygon);
	    }else{
	    	for(var i = 0;i<mark3Array.length;i++){
	    		if(mark3Array[i]._id == polygon._id){
	    			mark3Array[i] = polygon;
	    		}
	    	}
	    }
	}
});
	google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);
   google.maps.event.addListener(map, 'click', function(){mapclick();});
	google.maps.event.addListener(map, 'dblclick', function(event){
		//alert(bermudaTriangle.Contains(event.latLng));
	 });
	g_infowindow.set("content","");
	//var lat = obj.bounds_.getCenter().lat();
	//var lng = obj.bounds_.getCenter().lng();
	var center = new google.maps.LatLng(120,120);
	g_infowindow.setPosition(center);
	g_infowindow.set("maxWidth",242);
	g_infowindow.setMap(map);
	setTimeout(function(){xa();g_infowindow.setMap(null);},10);
	setTimeout(function(){hove();},10);
	
	google.maps.event.addListenerOnce(map, 'idle', function(){
		//_Q("#map-canvas").find('img[src="http://maps.gstatic.cn/mapfiles/api-3/images/tmapctrl.png"]').closest(".gmnoprint").parent().css("margin-right",31)
		setControlRight();
		addGeo(map);
		mapZero();
		mapFirst();
		loadfirst();
		setTimeout(function(){_Q(".gm-style").find("div:eq(0)").find("div:eq(0)").next().hide();},500);
		setTimeout(function(){ts_check();},10000);
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
	secondstr = JSON.parse(data);
	loadsecond();
	ts_check();
	setTimeout(function(){initList();},2);
}

function first_next(){
	//var temp = JSON.parse(data);
	animalStr = thirdthird.animal;
	thirdstr = thirdthird.tunnelinfo;
	loadthird();
	ts_check();
	setTimeout(function(){mapSecond();},2);
	setTimeout(function(){initList();},2);
}

function first_next_next(){
	loadthird_next();
}

function second_next(data){
	var temp = JSON.parse(data);
	krpanoStr = temp.krpano;
	deviceStr = temp.device;
	videoStr = temp.videoStr;
	loadfourth();
	loadfifth();
	loadsixth();
	ts_check();
}
function goAPS_next(){
	_Q("#goAPS2").trigger("click");
}

function ts_check(){
	//_Q("#map-canvas").find('img[src="http://maps.gstatic.cn/mapfiles/api-3/images/tmapctrl.png"]').closest(".gmnoprint").parent().css("margin-right",31)
	if(loginStep == 12){
		_Q("#goAPS").unbind("click");
		_Q("#goAPS").click(function(){goAPS_();});
	}
	if(!mapHelpEnable)
		return;
	if(loginStep == 12){
		_Q("#goAPS").unbind("click");
		_Q("#goAPS").click(function(){goAPS_();});
	}else if(array_mark.length==0){
		tsStep(0);
	}else if(mark1Array.length==0){
		tsStep(1);
	}else if(mark2Array.length==0){
		tsStep(2);
	}else if(mark3Array.length==0){
		tsStep(3);
	}else if(loginStep<12){
		tsStep(4);
	}
}

function goAPS_(){
	window.location.href=_Q("#goAPS3").attr("href");
}

function tsStep(index){
	if(index == 4){
		_Q("#goAPS").unbind("click");
		_Q("#goAPS").click(function(){goAPS_();});
	}else{
		_Q("#goAPS").unbind("click");
	}
//	if(index == 5){
//		_Q(".tscolse").show();
//	}
	_Q(".ts6bdiv").show();
	_Q(".tsbgco div:first-child>div").hide();
	_Q(".tsbgco div:first-child>div:eq("+index+")").show();
	_Q(".tsbzd a").attr("class","ts_step1");
	_Q(".tsbzd a:eq("+index+")").attr("class","ts_step2");
}

function ts_check_two(){
	var b = true;
	for(var i = 0;i<markstr.length;i++){
		var obj = markstr[i];
		if(obj.coordinateGroup!=""){
			b = false;
		}
	}
	return b;
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

function reset11 (arrr){
	selectedShape.setEditable(false);
	selectedShape.setPath(arrr);
	var radius = selectedShape.getPath();   
	google.maps.event.addListener(radius, 'insert_at',function(index){reset1(selectedShape,radius,index,this);} );
	google.maps.event.addListener(radius, 'remove_at',function(index){reset1(selectedShape,radius,index,this);});
	google.maps.event.addListener(radius, 'set_at', function(index){reset1(selectedShape,radius,index,this);});
	selectedShape.setEditable(true);
}

//基地边线监控
function reset1(newShape,radius,index,obj) {
	var mark_latlng = newShape._marker.getPosition();
	if(!newShape.Contains(mark_latlng)){
		alert("请圈中描点");
		var strs = _Q("#mark_coordinate_group").val();
		strs = strs.replace(/[()]/g, '');
		if(strs.endWith("_"))
			strs = strs.substring(0,strs.length-1);
		var strr = strs.split("_");
		var tempArray = [];
		for(var y = 0;y<strr.length;y++){
			var yy = strr[y].split(",");
			var temp = new google.maps.LatLng(parseFloat(yy[0]),parseFloat(yy[1]));
			tempArray.push(temp);
		}
		reset11(tempArray);
		return ;
	}
	var mianji = google.maps.geometry.spherical.computeArea(radius)*0.0015;
	mianji = CurrencyFormatted(mianji);
	var pointStr ="";
	  var array= newShape.getPath().getArray();
	  for(var i = 0;i<array.length;i++){
			pointStr+=array[i]+"_";
	  }
	newShape.mianji=mianji;
	_Q("#mark_coordinate_group").val(pointStr);
	//_Q("#mark_div").show();
	_Q("#mark_area").val(mianji);
};

//大棚范围监控
function reset3(newShape,radius,index,obj) {
	if(ismove)
		return;
	var array= newShape.getPath().getArray();
	var b2=false;
	var strs = _Q("#group_group").val();
	strs = strs.replace(/[()]/g, '');
	var tempArray = [];
	if(strs.endWith("_"))
		strs = strs.substring(0,strs.length-1);
	var strr = strs.split("_");
	for(var y = 0;y<strr.length;y++){
		var yy = strr[y].split(",");
		var temp = new google.maps.LatLng(parseFloat(yy[0]),parseFloat(yy[1]));
		tempArray.push(temp);
	}
	for(var i = 0;i<mark1Array.length;i++){//判断修改之后是否在基地内
		m = mark1Array[i];
		var bounds = new google.maps.LatLngBounds();
		if(m.Contains(array[0])){
			for(var j = 1;j<array.length;j++){
				bounds.extend(array[j]);
				if(!m.Contains(array[j])){
					alert("请画在厂区图内");
					reset33(tempArray);
					b2=true;
					_Q(".model3").removeClass("on");
					return;
				}
			}
			break;
		}else if(i==mark1Array.length-1){
			alert("请画在厂区图内");
			reset33(tempArray);
			b2=true;
			_Q(".model3").removeClass("on");
			return;
		}
	}
	var b2_ = false;
	var m;
	for(var i = 0;i<mark2Array.length;i++){//非水面不能画到分区外面
		m = mark2Array[i];
		if(m.Contains(array[0])&&m.getMap()!=null){
			bounds = new google.maps.LatLngBounds();
			bounds.extend(array[0]);
			for(var j = 1;j<array.length;j++){
				bounds.extend(array[j]);
				if(!m.Contains(array[j])){
					if(newShape._group_type!=7){
						alert("请画在分区内!");
						reset33(tempArray);
						b2=true;
						_$(".model3").removeClass("on");
						return;
					}else{
						b2=false;
						b2_=true;
					}
				}else if(j==array.length-1){
					b2 = false;
					break;
				}
			}
			break;
		}else if(i==mark2Array.length-1){
			if(newShape._group_type!=7){
				alert("请画在分区内!");
				reset33(tempArray);
				b2=true;
				_$(".model3").removeClass("on");
				return;
			}else{
				b2=false;
				b2_=true;
				break;
			}
		}
	}
	
	if(b2_){
		m = new Object();
		m.id = 0;
		m.name = "暂无数据";
	}
	newShape._group_parent_id=m._id;//大棚赋值新的边框
	newShape._parent=m;
	_Q("#group_parent_id").val(newShape._group_parent_id);
	if(_Q("#group_parent_id").val()==null)
		_Q("#group_parent_id")[0].selectedIndex = 0;
	_Q("#group_parent_id").selectpicker('refresh');
	
	_Q("#group_x").val(bounds.getCenter().lat());
	_Q("#group_y").val(bounds.getCenter().lng());
	var mianji = google.maps.geometry.spherical.computeArea(radius)*0.0015;
	mianji = CurrencyFormatted(mianji);
	var pointStr ="";
	  var array= newShape.getPath().getArray();
	  for(var i = 0;i<array.length;i++){
			pointStr+=array[i]+"_";
	  }
	newShape.mianji=mianji;
	_Q("#group_group").val(pointStr);
	//_Q("#mark_div").show();
	_Q("#group_area").val(mianji);
	_Q("#group_area_hidden").text(mianji+"亩");
};

function reset33 (arrr){
	selectedShape.setEditable(false);
	selectedShape.setPath(arrr);
	var radius = selectedShape.getPath();   
	google.maps.event.addListener(radius, 'insert_at',function(index){reset3(selectedShape,radius,index,this);} );
	google.maps.event.addListener(radius, 'remove_at',function(index){reset3(selectedShape,radius,index,this);});
	google.maps.event.addListener(radius, 'set_at', function(index){reset3(selectedShape,radius,index,this);});
	selectedShape.setEditable(true);
}

//区域范围监控
function reset2(newShape,radius,index,obj) {
	var undoimg = _Q("img[src_Q='http://maps.gstatic.com/mapfiles/undo_poly.png']");
	var m = newShape;
	var array= newShape.getPath().getArray();
	var b1=false;
	var strs = _Q("#partition_group").val();
	strs = strs.replace(/[()]/g, '');
	var tempArray = [];
	if(strs.endWith("_"))
		strs = strs.substring(0,strs.length-1);
	var strr = strs.split("_");
	for(var y = 0;y<strr.length;y++){
		var yy = strr[y].split(",");
		var temp = new google.maps.LatLng(parseFloat(yy[0]),parseFloat(yy[1]));
		tempArray.push(temp);
	}
	var bounds;
	for(var i = 0;i<mark1Array.length;i++){//分区不能画在基地外面
		m = mark1Array[i];
		if(m.Contains(array[0])){
			bounds = new google.maps.LatLngBounds();
			bounds.extend(array[0]);
			for(var j = 1;j<array.length;j++){
				bounds.extend(array[j]);
				if(!m.Contains(array[j])){
					alert("请画在厂区图内");
					reset22(newShape,tempArray);
					b1=true;
					return;
				}
			}
			break;
		}else if(i==mark1Array.length-1){
			alert("请画在厂区图内");
			reset22(newShape,tempArray);
			b1=true;
			return;
		}
	}
	
	var mianji = google.maps.geometry.spherical.computeArea(radius)*0.0015;
	_Q("#partition_x").val(bounds.getCenter().lat());
	_Q("#partition_y").val(bounds.getCenter().lng());
	mianji = CurrencyFormatted(mianji);
	var pointStr ="";
	  var array= newShape.getPath().getArray();
	  for(var i = 0;i<array.length;i++){
			pointStr+=array[i]+"_";
	  }
	newShape.mianji=mianji;
	_Q("#partition_group").val(pointStr);
	//_Q("#mark_div").show();
	_Q("#partition_area").val(mianji);
};

function reset22 (newShape,arrr){
	newShape.setEditable(false);
	newShape.setPath(arrr);
	var radius = newShape.getPath();   
	google.maps.event.addListener(radius, 'insert_at',function(index){reset2(newShape,radius,index,this);} );
	google.maps.event.addListener(radius, 'remove_at',function(index){reset2(newShape,radius,index,this);});
	google.maps.event.addListener(radius, 'set_at', function(index){reset2(newShape,radius,index,this);});
	newShape.setEditable(true);
}

reset = function(newShape,radius,index,obj) {
	
	var mianji = google.maps.geometry.spherical.computeArea(radius)*0.0015;
	mianji = CurrencyFormatted(mianji);
	newShape.mianji=mianji;
	_Q("#detail").show();
	_Q("#area").val(mianji);
	_Q("#type").val(newShape.type1);
};
 
//根据以知 点绘制图形  
var bermudaTriangle;
 
//加载地图

//可以基地绘画
function xx(){
	if(!menu.isHide()){
		menu.hide();
	}
	if(!isEdit){
		return;
	}
	if(!checkissubmit(1)){
		return;
	}
	if(_Q("#divFloatToolsView_").css("width").replace("px","")>1&&_Q("#aFloatTools_Show").is(":hidden")){
		//alert("请先保存或取消之前的操作!");
		//return;
	}
	drawingManager.isshow=false;
	drawingManager.setDrawingMode(null);
	drawingManager.isshow=true;
	drawingManager.polygonOptions.strokeWeight=4;
	drawingManager.polygonOptions.strokeColor="#127dff";
	drawingManager.polygonOptions.fillColor="#127dff";
	drawingManager.polygonOptions.fillOpacity="0.1";
	drawingManager.polygonOptions.strokeOpacity="1";
	drawingManager.polygonOptions.zIndex = markerIndex;
	drawingManager.mytype="1";
	drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
	_Q(".model3").removeClass("on");
	_Q("#model2").parent().attr("class","mapone");
	_Q(".model4").removeClass("on");
	if(_Q("#model1").parent().hasClass("maptwo")){
		_Q("#model1").parent().attr("class","mapone");
		clearMap();
	}else{
		showTips(1);
		_Q("#model1").parent().attr("class","maptwo");
	}
}
//检测坐标是否在polygon范围内;
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
    
    //可以进行分区绘画
function xx1(){
	if(!menu.isHide()){
		menu.hide();
	}
	if(!isEdit){
		return;
	}
	if(!checkissubmit(2)){
		return;
	}
	if(_Q("#divFloatToolsView_").css("width").replace("px","")>1&&_Q("#aFloatTools_Show").is(":hidden")){
		//alert("请先保存或取消之前的操作!");
		//return;
	}
	if(mark1Array.length==0){
		alert("请先画厂区图");
		return ;
	}
	drawingManager.polygonOptions.zIndex = markerIndex+1;
	drawingManager.isshow=false;
	drawingManager.setDrawingMode(null);
	drawingManager.isshow=true;
	drawingManager.polygonOptions.strokeWeight=4;
	drawingManager.polygonOptions.strokeColor="#FFFFFF";
	drawingManager.polygonOptions.fillColor="#FFFFFF";
	drawingManager.polygonOptions.fillOpacity="0.45";
	drawingManager.polygonOptions.strokeOpacity="0.45";
	drawingManager.mytype="2";
	setMapNull();
	drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
	_Q(".model3").removeClass("on");
	_Q("#model1").parent().attr("class","mapone");
	_Q(".model4").removeClass("on");
	if(_Q("#model2").parent().hasClass("maptwo")){
		_Q("#model2").parent().attr("class","mapone");
		clearMap();
	}else{
		showTips(2);
		_Q("#model2").parent().attr("class","maptwo");
	}
}
//大棚绘画
function xx2(index){
	if(!isEdit){
		return;
	}
	if(!checkissubmit(3)){
		return;
	}
	if(_Q("#divFloatToolsView_").css("width").replace("px","")>1&&_Q("#aFloatTools_Show").is(":hidden")){
		//alert("请先保存或取消之前的操作!");
		//return;
	}
	var col = colors["color"+(index+1)];
	if(col==null)
		col = "#f5d503";
	drawingManager.isshow=false;
	drawingManager.setDrawingMode(null);
	drawingManager.isshow=true;
	drawingManager.polygonOptions.strokeColor=col;
	drawingManager.polygonOptions.fillColor=col;
	drawingManager.polygonOptions.fillOpacity=0.4;
	drawingManager.mytype="3";
	drawingManager.polygonOptions.zIndex = markerIndex+2;
	drawingManager.select=index+1;
	setMapNull();
	drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
	_Q("#model1").parent().attr("class","mapone");
	_Q("#model2").parent().attr("class","mapone");
	_Q(".model4").removeClass("on");
	var b = true;
	if(_Q(".model3:eq("+index+")").hasClass("on"))
		b = false;
	_Q(".model3").removeClass("on");
	if(b){
		_Q(".model3:eq("+index+")").addClass("on");
		showTips(3);
	}else{
		clearMap();
	}
}

//可以进行传感器,气象站,视频 绘画
function xx3(type){
	if(!menu.isHide()){
		menu.hide();
	}
	if(!isEdit){
		return;
	}
	if(!checkissubmit(4)){
		return;
	}
	drawingManager.isshow=false;
	drawingManager.setDrawingMode(null);
	drawingManager.isshow=true;
	drawingManager.mytype="4";
	drawingManager.setDrawingMode(google.maps.drawing.OverlayType.MARKER);
	drawingManager.polygonOptions.zIndex = markerIndex+4;
	drawingManager.device_ = type;
	_Q("#model1").parent().attr("class","mapone");
	_Q("#model2").parent().attr("class","mapone");
	_Q(".model3").removeClass("on");
	var index = type-1;
	var b = true;
	if(_Q(".model4:eq("+index+")").hasClass("on"))
		b = false;
	_Q(".model4").removeClass("on");
	if(b){
		_Q(".model4:eq("+index+")").addClass("on");
	}else{
		clearMap();
	}
}

function ok (){
selectedShape.type1=_Q("#type").val();
selectedShape.mian=_Q("#type").val();
clearSelection();
_Q("#detail").hide();
}
function no(){
clearSelection();
_Q("#detail").hide();
}
function deleted(){
	if (selectedShape) {
		selectedShape._marker.setMap(null);
       selectedShape.setMap(null);
   }
	_Q("#detail").hide();
}
//地图搜索
function searchmap(address){  
  //先从输入框中取出要搜的地名  
  if(" "==address){  
       alert("请输入要定位的地名！");  
       return false;  
  }else{  
   geocoder = new google.maps.Geocoder(); //注意:还有一个全局的 var geocoder 对象  
   if(geocoder){  
       geocoder.geocode({'address': address }, function(results, status) {  
           if (status == google.maps.GeocoderStatus.OK) {  
               var GeoCode = ((results[0].geometry.location).toString().replace(/[()]/g, '')).split(",",2);  
               var lat = parseFloat(GeoCode[0]);//纬度  
               var lng = parseFloat(GeoCode[1]);//经度  
               var mylatlng = new google.maps.LatLng(lat, lng);      
               map.setCenter(mylatlng);           
               map.setZoom(15);
               //对搜索到的这个点进行标注  
                 /*          var marker = new google.maps.Marker({  
                   map: map,  
                   position: mylatlng,  
                   title:address  
               });  
           //点击事件,下面的经度和纬度是我要使用的，点击的时候弹出层  
			
                   google.maps.event.addListener(marker, 'click', function(){  
                     showLayer('add_button');  
                     _Q("#weidu_id").val(lat);  
                     _Q("#jingdu_id").val(lng);  
                   });  
                     */
               } else {  
               alert("谷歌地图没有找到的原因是:" + status);  
               }  
           });  
       }  
  }  
}
 //https://maps.googleapis.com/maps/api/staticmap?maptype=hybrid&sensor=false&size=300x300&path=color:0xFFFFFFFF|weight:2|fillcolor:0xFFFFFF75|39.88665649469955,116.6621446609497|39.88458190061328,116.66171550750732|39.88402207875533,116.66463375091553|39.885964970312614,116.66497707366943
//进行描点
function _mark (){
	if(!checkFarmNum())
		return;
	if(!checkissubmit(0)){
		return;
	}
	 _Q(".model3").removeClass("on");
		drawingManager.isshow=false;
		drawingManager.setDrawingMode(null);
		drawingManager.isshow=true;
		drawingManager.zIndex = markerIndex+4;
	drawingManager.setDrawingMode(google.maps.drawing.OverlayType.MARKER);
	drawingManager.device_ =null;
	drawingManager.mytype="0";
	_Q(".model3").removeClass("on");
	_Q("#model2").parent().attr("class","mapone");
	_Q("#model1").parent().attr("class","mapone");
	_Q(".model4").removeClass("on");
	showTips(0);
	  };

	  function showCheckTips(str){
		  _Q("#accountMsgText").html(str);
		  _Q('#login4').show();
		  _Q("#accountMsgModal").css("display","");
	  }
	  function closeMsgModal(){
		  _Q('#login4').hide();
			_Q("#accountMsgModal").css("display","none");
	  }
function checkFarmNum(){
	if(farm_num==-1)
		return true;
	if(farm_size+1>farm_num){
		showCheckTips("抱歉，您可创建基地数量已达上限！如想继续创建，请联系我们！");
		return false;
	}
	return true;
}


function resetBaseGroup(){
	if(!selectedShape){
		return;
	}
	var array= selectedShape.getPath().getArray();
	var ps = "";
    for(var i = 0;i<array.length;i++){
		ps+=array[i]+"_";
	}
    if(ps.endWith("_")){
    	ps = ps.substring(0,ps.length-1);
    }
    if(ps!=selectedShape._group_bak){
    	var pointStr = selectedShape._group_bak;
		pointStr = pointStr.replace(/[()]/g, '');
		if(pointStr.endWith("_")){
			pointStr = pointStr.substring(0,pointStr.length-1);
	    }
		var bounds = new google.maps.LatLngBounds();
		if(pointStr!=""){
			var strr = pointStr.split("_");
			var triangleCoords = [];  
			for(var y = 0;y<strr.length;y++){
				var yy = strr[y].split(",");
				var temp = new google.maps.LatLng(parseFloat(yy[0]),parseFloat(yy[1]));
				triangleCoords.push(temp);
				bounds.extend(temp);
			}
			selectedShape.setPath(triangleCoords);
			reset11(triangleCoords);
		}
    }
}
	  //描点完成
	  function mark_info_ok (data){
		  _Q('#mark_info_id').val(data);
		  if(nullGroupFirstInd){
			  var value = _Q("#mark_info_id").val();
				for (var i = 0;i<nullGroupFirst.length;i++){
					var tob = nullGroupFirst[i];
					if(tob.value == value ){
						nullGroupFirst = nullGroupFirst.del(i);
						break;
					}
				}
				try{closeAutoCom(1);}catch(e){};
				nullGroupFirstInd = false;
			}
			for(var i = 0;i<array_mark.length;i++){
				var m = array_mark[i];
				var name = "";
				if(m._index==_Q("#mark_info_index").val()){
					m._name=_Q("#mark_info_name").val();
					m._id=_Q("#mark_info_id").val();
					m.setTitle(_Q("#mark_info_name").val());
					if(_Q("#selectedName"+m._id).length>0){
						_Q("#selectedName"+m._id).html(m._name);
					}else{
						_Q(".siteSeleBd ul").append("<li id='selected"+m._id+"'><a id='selectedName"+m._id+"' href='#' onclick='changeBases("+m._id+");'>"+m._name+"</a></li>");
					}
					if(m._ploygon){
						m._ploygon._name=m._name;
						m.setDraggable(false);
					}
					var wen = new Wenzi(m.getPosition(), m._name, map, 1);
					m._wenzi = wen;
				}
			}
			farm_size+=1;
			displaymodel1(false);
			close_right_panel();
			ts_check();
		}
	  //取消描点
		function mark_info_no (){
			for(var i = 0;i<array_mark.length;i++){
				var m = array_mark[i];
				var name = "";
				if(m._index==_Q("#mark_info_index").val()){
					if(m._id==""){
						m.setMap(null);
					}
				}
			}
			close_right_panel();
		}
		//删除描点
		function mark_info_delete(){
			for(var i = 0;i<array_mark.length;i++){
				var m = array_mark[i];
				if(m._index==_Q("#mark_info_index").val()){//&&!m._btype
					if(m._id){
						delete_mark_info(m._id);
					}else{
						m.setMap(null);
						if(m._ploygon){
							m._ploygon.setMap(null);
						}
						if(m._wenzi){
							m._wenzi.setMap(null);
						}
						clearSelection();
						close_right_panel();
						setMapNotNull();
					}
				}
			}
		}
		
		//删除锚点 后续操作,地图删删除.数组中删除
		function mark_info_delete_next(data){
			if(data!=""){
				alert(data);
				return ;
			}
			_Q("#selectedName"+_Q("#mark_info_id").val()).remove();
			for(var i = 0;i<array_mark.length;i++){
				var m = array_mark[i];
				if(m._index==_Q("#mark_info_index").val()){//&&!m._btype
					m.setMap(null);
					array_mark = array_mark.del(i);
					if(m._ploygon){
						m._ploygon.setMap(null);
					}
					if(m._wenzi)
						m._wenzi.setMap(null);
				}
			}
			for(var i = 0 ;i<mark1Array.length;i++){
				var polygon = mark1Array[i];
				var marker = polygon._marker;
				if(marker._index==_Q("#mark_info_index").val()){//&&!marker._btype
					mark1Array = mark1Array.del(i);
				}
			}
			farm_size -=1;
			clearSelection();
			close_right_panel();
			setMapNotNull();
		}
		var nullGroupSecond = new Array();
		var nullGroupThird = new Array();
		//加载锚点及基地范围
		function loadfirst (){
			//setTimeout(function(){
			//	_Q("#map-canvas").find('img[src="http://maps.gstatic.cn/mapfiles/api-3/images/tmapctrl.png"]').closest(".gmnoprint").parent().css("margin-right",31)
			//},500);
			var first = 0;
			mark__index = markstr.length;
			for(var i = 0;i<markstr.length;i++){
				if(first==0)
					first=1;
				var array = markstr[i];
				var point = new google.maps.LatLng(array.coordinateX, array.coordinateY);
				 var marker = new google.maps.Marker({
				     position: point,
				     map: map,
				     title:array.name,
					 icon: '../asset/images/zb.png',
					 zIndex:markerIndex+4,
					 _name:array.name,
					 _id:array.id,
					 _index:i,
					 _coordinate_X:array.coordinateX,
					 _coordinate_Y:array.coordinateY,
					 _imgUrl:array.baseImageUrl
				 });
				array_mark.push(marker);//锚点准备完毕放入数组
				attachSecretMessage(marker, array,i);//锚点加入事件
				var pointStr = array.coordinateGroup;
				pointStr = pointStr.replace(/[()]/g, '');
				if(pointStr.length==0){
					movemarker(marker);
					continue;
				}
				if(first<2)
					first=2;
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
	              editable: false,
	              zIndex:markerIndex
	            });  
	            bermudaTriangle.isok=1;
	            bermudaTriangle._marker=marker;
	            bermudaTriangle._name=array.name;
	            bermudaTriangle.mianji=array.muNumber;
	            bermudaTriangle._contact=array.contact;
	            bermudaTriangle._phone=array.phone;
	            bermudaTriangle._description=array.description;
	            bermudaTriangle._coordinate_group=array.coordinateGroup;
	            bermudaTriangle._group_bak=array.coordinateGroup;
	            bermudaTriangle._address=array.address;
	            marker._ploygon=bermudaTriangle;
	            if(!bounds.isEmpty()){
	            	var zoom = getBoundsZoomLevel(bounds);
	            	if(zoom>0){
	            		bermudaTriangle._zoom = zoom;
	            		if(i==0){
	            			map.setZoom(zoom);
	            		}
	            	}
	            }
	            mark1Array.push(bermudaTriangle);
	            if(mapdebug)
	            	loadFirstPloygon(bermudaTriangle);//基地边界准备完成,放入数组
	            new Wenzi(point, array.name, map, 1);
	            bermudaTriangle.setMap(map);//基地边界添加事件
			}
			
			if(first==0){
				displaymodel1(true);
			}else if(first==1){
				displaymodel1(false);
			}else if(first==2){
				displaymodel1(false);
			}else if(first==3){
				displaymodel1(false);
			}
		}
		
		function getBoundsZoomLevel(bounds) {
			var mapDim = {
					height: _Q(window).height()-77,
				    width: _Q(window).width()-60
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
		
		//描点移动
		function movemarker(marker){
			marker.setDraggable(true);
			if(typeof(marker._dragend)=='undefined')
				marker._dragend = google.maps.event.addListener(marker, 'dragend',function(){
					if(marker._ploygon){
						if(movetype==2){
							var xs = marker._coordinate_X-marker.getPosition().lat();
							var ys = marker._coordinate_Y-marker.getPosition().lng();
							marker._coordinate_X = marker.getPosition().lat();
							marker._coordinate_Y = marker.getPosition().lng();
							var newpath = [];
							var newstr = "";
							var strr = marker._ploygon._coordinate_group.replace(/[()]/g, '').split("_");
							for(var i = 0;i<strr.length;i++){
								var str = strr[i].split(",");
								var x = parseFloat(str[0])-xs;
								var y = parseFloat(str[1])-ys;
								var newpoint = new google.maps.LatLng(x,y);
								newpath.push(newpoint);
								newstr+="("+x+","+y+")";
								if(i<strr.length-1)
									newstr+="_";
							}
							marker._ploygon._coordinate_group = newstr;
							marker._ploygon.setPath(newpath);
							setTimeout(function(){
								if(window.confirm("是否保存新的坐标!\n取消后请刷新页面来还原基地位置!")){
									_Q("#change_base_id").val(marker._id);
									_Q("#change_x").val(marker.getPosition().lat());
									_Q("#change_y").val(marker.getPosition().lng());
									_Q(".sbut").trigger("click");
								}
							},100);
							return ;
						}else if(movetype==1){
							if(marker._ploygon.Contains(marker.getPosition())){
							
							}else{
								var np = new google.maps.LatLng(parseFloat(marker._coordinate_X),parseFloat(marker._coordinate_Y));
								marker.setPosition(np);
								return ;
							}
						}
						/**/
					}
					marker._coordinate_X=marker.getPosition().lat();
					marker._coordinate_Y=marker.getPosition().lng();
					_Q("#mark_info_name").val(marker._name);
					_Q("#mark_info_index").val(marker._index);	
					_Q("#mark_info_x").val(marker._coordinate_X);
					_Q("#mark_info_y").val(marker._coordinate_Y);
					_Q("#mark_info_id").val(marker._id);
					_Q(".rightNo").hide();
					_Q(".rightNo1").show();
					_Q("#divtittle").text("编辑基地位置");
					open_right_panel();
					_Q(".tc_top_03").show();
					_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
					_Q(".btnOpen").hide();
				});
		}
		var pidArray;
		//加载分区
		function loadsecond(){
			second__index = secondstr.length;
			pidArray = new Array();
			pidArray.push({"id":0,"indexNum":null});
			map2.clear();//区域;
			for(var i = 0;i<secondstr.length;i++){
				var array = secondstr[i];
				var pointStr = array.coordinateGroup;
				pointStr = pointStr.replace(/[()]/g, '');
				if(pointStr.length==0){
					var tob = {"value":array.id,"label":array.name,"base_id":array.base};
					nullGroupSecond.push(tob);
					continue;
				}
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
	              strokeWeight: 4,  
	              fillColor: array.color,  
	              fillOpacity: 0.45,  
	              editable: false,
	              zIndex:markerIndex+1
	            });  
	            if(array.coordinateX==0){
	            	bermudaTriangle.partition_x = bounds.getCenter().lat();
	            	bermudaTriangle.partition_y = bounds.getCenter().lng();
	            }else{
	            	bermudaTriangle.partition_x = array.coordinateX;
	            	bermudaTriangle.partition_y = array.coordinateY;
	            }
	            
	            if(!map2.containsKey(array.id)){
	            	map2.put(array.id,array.name);
	            }
	            pidArray.push({"id":array.id,"indexNum":array.indexNum});
	            bermudaTriangle.indexNum=array.indexNum;
	            bermudaTriangle._index=i;
	            bermudaTriangle._name=array.name;
	            bermudaTriangle.mianji=array.muNumber;
	            bermudaTriangle._id=array.id;
	            bermudaTriangle._base_id=array.base;
	            bermudaTriangle._description=array.description;
	            bermudaTriangle._group=array.coordinateGroup;
	            mark2Array.push(bermudaTriangle);//分区准备完成,放入数组
	            if(mapdebug)
	            	loadSecondPloygon(bermudaTriangle,bounds);//分区添加事件
	            var wen = new Wenzi(bounds.getCenter(), array.name, map, 2);
	            bermudaTriangle._wenzi = wen;
	            bermudaTriangle.setMap(map);
			}
			if(secondstr.length>0||mark1Array.length>0){
				displaymodel2(false);
				displaymodel3(false);
			}
			else
				displaymodel2(true);
		}
		//加载大棚
		function loadthird(){
			third__index = thirdstr.length;
			for(var i = 0;i<thirdstr.length;i++){
				var array = thirdstr[i];
				var pointStr = array.coordinateGroup;
				pointStr = pointStr.replace(/[()]/g, '');
				if(pointStr.length==0){
					var tob = {"value":array.tunnelInfoId,"label":array.tunnelName,"base_id":array.baseId,"part_id":array.partId,"ent_type":array.plantEnvTypeId};
					nullGroupThird.push(tob);					
					continue;
				}
				bermudaTriangle = new google.maps.Polygon({  
					//draggable: true,
		              strokeColor: array.color,  
		              strokeOpacity: 0.8,  
		              strokeWeight: 2,  
		              fillColor: array.color,  
		              fillOpacity: 0.5,  
		              editable: false,
		              zIndex:markerIndex+2
		            });
				
				var triangleCoords = [];  
				var bounds = new google.maps.LatLngBounds();
				if(pointStr!=""){
					var strr = pointStr.split("_");
					for(var y = 0;y<strr.length;y++){
						var yy = strr[y].split(",");
						var temp = new google.maps.LatLng(parseFloat(yy[0]),parseFloat(yy[1]));
						triangleCoords.push(temp);
						bounds.extend(temp);
					}
					bermudaTriangle.setPath(triangleCoords);
				}
				
	            if(array.latitude==0 || typeof(array.latitude) == "undefined"){
	            	bermudaTriangle.group_x=bounds.getCenter().lat();
	            	bermudaTriangle.group_y=bounds.getCenter().lng();
	            }  else{
	            	bermudaTriangle.group_x=array.latitude;
	            	bermudaTriangle.group_y=array.longitude;
	            }
           
	            bermudaTriangle._name=array.tunnelName;
	            bermudaTriangle._id=array.tunnelInfoId;
	            bermudaTriangle._group_parent_id=array.partId;
	            bermudaTriangle._index=i;
	            bermudaTriangle._group=array.coordinateGroup;
	            bermudaTriangle._group_bak=array.coordinateGroup;
	            bermudaTriangle.mianji=array.muNumber;
	            bermudaTriangle._group_type=array.plantEnvTypeId;
	            bermudaTriangle._keeperId=array.keeperId;
	            bermudaTriangle._masterId=array.masterId;
	            bermudaTriangle._muarea = array.area;
	            bermudaTriangle._index_num = array.indexNum;;
	            bermudaTriangle._device_id = array.diviceId;
	            bermudaTriangle._crop_area = array.crop_area;
	            bermudaTriangle._base_id = array.baseId;
	            bermudaTriangle._plant_length = array.realPlantLength;
	            bermudaTriangle._plant_Image = array.realPlantImage;
	            bermudaTriangle._tunnel_group_id = array.tunnelGroupId;
	            bermudaTriangle._ftype = array.ftype;
	            bermudaTriangle._bounds = bounds;
	            mark3Array.push(bermudaTriangle);		//大棚加载完成放入数组
	            bermudaTriangle.setMap(map);
			}
			if(mark3Array.length>0)
				_Q("#goAPS").click(function(){goAPS_next();});
			if(mark2Array.length>0)
				displaymodel3(false);
			else
				displaymodel3(true);
		}
		
		function loadthird_next(){
			for(var i = 0;i<mark3Array.length;i++){
				var bermudaTriangle = mark3Array[i];
				if(mapdebug)
					loadThirdPloygon(bermudaTriangle, bermudaTriangle._bounds);
				var tempcenter = new google.maps.LatLng(parseFloat(bermudaTriangle.group_x),parseFloat(bermudaTriangle.group_y));
				var wenzi = new Wenzi(tempcenter, bermudaTriangle._name, map, 3);
				bermudaTriangle._wenzi=wenzi;
			}
		}
		
		var checkShiftVar = 0;
		var checkShiftLaglng;
		function checkShift(){
		 setTimeout(function(){
			 if(checkShiftVar>2){
				 checkShiftVar = 0;
				 if("false" == isshift)
					 return ;
				 copypolygon(checkShiftLaglng,1);
				 //console.log("shift ok");
			 }else{
				 //console.log("shift not ok");
				 checkShiftVar += 1;
				 checkShift();
			 }
		 }, 10);
		}
		
		function copyIsOk(){
			var obj = _Q("#copyDiv");
			var str = "";
			var _ind = /(.*[^\d])(\d+)$/.exec(copytarget._name);
			if(_ind == null){
				_ind = new Array();
				_ind.push(0);
				_ind.push(copytarget._name);
				_ind.push(0);
			}
			var __ind =  parseInt(_ind[2],10);
			for(var i = 0; i< copyArray.length;i++){
				var temp = copyArray[i];
				str += "<div class='batchDiv'><span id='copyname"+i+"' class='copyname' style='font-size:14px;display:inline-block;height:36px;line-height:36px;'>" + _ind[1] + (__ind+1) + "</span><br/>";
				str += "<input type=text' class='form-control nw221 batchInput' style=''width:170px;display:initial;float:left;' name='copyname'></div>";
				__ind ++;
			}
			
			obj.html(str);
			copytarget == null;
			setClickAbled(true);
			_Q("#divtittle").text("批量复制区域");
			_Q(".tc_top_03").show();
			_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
			_Q(".rightNo").hide();
			_Q(".rightNo14").show();
			open_right_panel();
//			obj.css({'position': 'absolute','display':'block','z-index':'1000','max-height':_Q("#map-canvas"),'max-width':'200'});
//			var width = _Q("#copyDiv").width();
//			var height = _Q("#copyDiv").height();
//			var offset = _Q("#map-canvas").offset();
//			var mapwidth = _Q("#map-canvas").width();
//			var mapheight = _Q("#map-canvas").height();
//			var left = 77;
//			var top = 60;
			//obj.css({'left':(left+(mapwidth-width)/2),'top':(top+(mapheight-height)/2)});
		
		}
		
		function copyOk(){
			if(_Q(".batchInput").length==0){
				_Q("#copyDiv").hide();
				return ;
			}
			var map_ = new JsMap();
			_Q(".batchInput").each(function(index){
				var tem = _Q(this).val();
				if(tem=="")
					tem = _Q("#copyname"+index).html();
				if(map_.containsKey(tem)){
					alert("区域名称重复！");
					return ;
				}
			})
			
			var json = "[";
			var names = "'names':'";
			for(var i = 0;i<copyArray.length;i++){
				var temp = copyArray[i];
				var str = "{";
				str += "'index':"+(temp._index==''?0:temp._index)+",";
				str += "'group_x':'"+(temp.group_x==''?0:temp.group_x)+"',";
				str += "'group_y':'"+(temp.group_y==''?0:temp.group_y)+"',";
				str += "'group_base_id':"+(temp._base_id==''?0:temp._base_id)+",";
				str += "'group_group':'"+(temp._group==''?0:temp._group)+"',";
				str += "'group_groupId':"+(temp._tunnel_group_id==''?0:temp._tunnel_group_id)+",";
				str += "'group_parent_id':"+(temp._group_parent_id==''?0:temp._group_parent_id)+",";
				str += "'groupFormColor':'"+temp.get("fillColor")+"',";
				str += "'muarea':"+(temp._muarea==''?0:temp._muarea)+",";
				str += "'group_area':"+(temp.mianji==''?0:temp.mianji)+",";
				str += "'keeper_id':"+(temp._keeperId==''?0:temp._keeperId)+",";
				str += "'master_id':"+(temp._masterId==''?0:temp._masterId)+",";
				str += "'group_type':"+(temp._group_type==''?0:temp._group_type)+",";
				var tempName = _Q(".batchInput:eq("+i+")").val();
				if(tempName == '' ){
					tempName = _Q("#copyname"+i).html();
				}
				str += "'name':'"+tempName+"'";
				str += "}";
				
				names += tempName;
				json += str ;
				
				if(i != copyArray.length-1){
					names += ",";
					json += ",";
				}
			}
			names += "'";
			json += "]";
			
			var param = "{" + names + ",'data':" + json + ",'base_id':" +copytarget._base_id+ "}";
			batch_tunnel(param);
		}
		
		function batch_tunnel_next(data){
			eval("var datas = " + data);
			if(datas.status == 'error'){
				alert(datas.str);
				return ;
			}
			var dts = datas.str;
			for(var i = 0;i<dts.length;i++){
				var index = dts[i].index;
				var id = dts[i].id;
				var name = dts[i].name;
				for(var j = 0;j<copyArray.length ;j++){
					var tem = copyArray[j];
					if(tem._index == index){
						tem._name = name;
						tem._id = id;
						mark3Array.unshift(tem);
						var centerpoint = new google.maps.LatLng(parseFloat(tem.group_x),parseFloat(tem.group_y));
						var wenzi = new Wenzi(centerpoint, tem._name, map, 3);
						tem._wenzi = wenzi;
					}
				}
			}
			initList();
			copyArray = new Array();
			copytarget = null;
			isshift = false;
			iscopy = 0;
			_Q(".batchInput").remove();
			_Q("#copy_tips").hide();
			close_right_panel();
		}
		
		function copyNo(){
			for(var i = 0;i<copyArray.length;i++){
				var tem = copyArray[i];
				tem.setMap(null);
				tem._usgs.setMap(null);
				copyDeletedArray.push(tem);
			}
			iscopy = 0;
			copytarget = null;
			isshift = false;
			copyArray = new Array();
			setClickAbled(true);
			_Q("#copy_tips").hide();
			close_right_panel();
		}
		
		function copypolygon(latlng,type){
			var polygon = new google.maps.Polygon({  
				//draggable: true,
	              strokeColor: copytarget.get("strokeColor"),  
	              strokeOpacity: 0.8,  
	              strokeWeight: 2,  
	              fillColor: copytarget.get("strokeColor"),  
	              fillOpacity: 0.5,  
	              editable: false,
	              zIndex:google.maps.Marker.MAX_ZINDEX + 2
	            });
			var paths = copytarget.getPath().getArray();
			var first = paths[0];
			var g = first.lat();
			var k = first.lng();
			var g_ = latlng.latlng.lat();
			var k_ = latlng.latlng.lng();
			var g__ = g_-g;
			var k__ = k_-k;
			
			var triangleCoords = [];   
			var bounds = new google.maps.LatLngBounds();
			for(var i = 0;i<paths.length;i++){
				var second = paths[i];
				var temp = new google.maps.LatLng(parseFloat(second.lat())+parseFloat(g__),parseFloat(second.lng())+parseFloat(k__));
				triangleCoords.push(temp);
				bounds.extend(temp);
			}
			
			polygon.setPath(triangleCoords);
			polygon.group_x=bounds.getCenter().lat();
			polygon.group_y=bounds.getCenter().lng();
			
			var base_id;
			var pointStr;
			var m ;
			var val = checkPolygonPoints(polygon);
			if(typeof(val)=="undefined")
				return;
			base_id = val.base_id;
			pointStr = val.pointStr;
			m = val.m;
			polygon._copy = type;
			polygon._name= "";
			polygon._id= "";
			polygon._group_parent_id =  m._id;
			polygon._index= ++third__index;
			polygon._group=  pointStr;
			polygon._group_bak=pointStr;
			polygon.mianji= copytarget.mianji;
			polygon._group_type=         copytarget._group_type
			polygon._keeperId=         copytarget._keeperId
			polygon._masterId=        copytarget._masterId
			polygon._muarea =         copytarget._muarea
			polygon._device_id =     ""; 
			polygon._base_id =       base_id;
			polygon._tunnel_group_id =        copytarget._tunnel_group_id
			polygon._ftype = "";
			polygon._plant_length = 0;
			polygon._plant_Image = "";
            copyArray.push(polygon);		//大棚加载完成放入数组
            loadThirdPloygon(polygon,bounds);//大棚添加事件
            try{
            	closeAutoCom(3);
            }catch(e){}
            polygon.setMap(map);
            if(type==2){
            	 openAutoCom(3,polygon._group_parent_id,polygon._base_id,polygon._group_type);
            	 polygon.ondblclick();
                 setTimeout(function(){
                 	_Q("#groupbutton2").hide();
         			_Q("#groupbutton1").show();
         			ret = 1;
                 },1);
            }
		}
		
		function checkPolygonPoints(polygon){
			var m;
			var base_id;
			var pointStr = "";
			var array= polygon.getPath().getArray();
			var b2 = false;
			var b2_ = false;
			var tempObj = null;
			if(copytarget!=null)
				tempObj = copytarget;
			else
				tempObj = movepolygon;
			for(var i = 0;i<mark1Array.length;i++){
				m = mark1Array[i];
				if(m.Contains(array[0])&&m.getMap()!=null && m._marker._id == tempObj._base_id){
					bounds = new google.maps.LatLngBounds();
					bounds.extend(array[0]);
					pointStr+=array[0]+"_";
					for(var j = 1;j<array.length;j++){
						bounds.extend(array[j]);
						pointStr+=array[j]+"_";
						if(!m.Contains(array[j])){
							alert("请画在厂区图内");
							polygon.setMap(null);
							b2=true;
							break;
						}
					}
					base_id = m._marker._id;
					break;
				}else if(i==mark1Array.length-1){
					alert("请画在厂区图内");
					polygon.setMap(null);
					b2=true;
					break;
				}
			}
			if(b2){
				return;
			}
			for(var i = 0;i<mark2Array.length;i++){//除了水面都不能画在分区外面
				m = mark2Array[i];
				if(m.Contains(array[0])&&m.getMap()!=null){
					bounds = new google.maps.LatLngBounds();
					bounds.extend(array[0]);
					for(var j = 1;j<array.length;j++){
						bounds.extend(array[j]);
						if(!m.Contains(array[j])){
							if(drawingManager.select!=7){
								alert("请画在分区内!");
								polygon.setMap(null);
								b2=true;
								break;
							}else{
								b2=false;
							}
							b2_=true;
							//break;
						}else if(j==array.length-1){
							b2 = false;
							break;
						}
					}
					break;
				}else if(i==mark2Array.length-1){
					if(drawingManager.select!=7){
						alert("请画在分区内!");
						polygon.setMap(null);
						b2=true;
						break;
					}else{
						b2=false;
						b2_=true;
						break;
					}
				}
			}
			if(b2){
				return;
			}
			if(b2_){
				m = new Object();
				m.id = 0;
				m.name = "暂无数据";
			}
			if(pointStr.endWith("_")){
				pointStr = pointStr.substring(0,pointStr.length-1);
		    }
			var obj = {"m":m,"base_id":base_id,"pointStr":pointStr};
			return obj;
		}
		
		//打开与关闭基地绘图功能
		function displaymodel1(btype){
			var oj = _Q("#model1>img:first-child");
			var ob = _Q("#model1");
			if(btype){
				ob.attr("onclick","").click(function(){});
				ob.css("cursor","default");
				oj.attr("src",oj.attr("src").replace('map_icon0_05.png','map_icon0_055.png'));
				oj.attr("title","");
				/*
				ob.parent().parent().hover(function(){
					  _Q(this).find('.hover_map').show();
				 },function(){
					 _Q(this).find('.hover_map').hide();
				 });
				_Q('#model0').parent().hover(function(){
					  _Q(this).find('.hover_map').show();
					 },function(){
						 _Q(this).find('.hover_map').hide();
					 });
				_Q("#model0>img:first-child").attr("title","");*/
			}else{
				if(ob.attr("aa")=="aa"){
					
				}else {
					ob.attr("aa","aa");
					ob.attr("onclick","").click(function(){xx();});
				}
				ob.css("cursor","pointer");
				oj.attr("src",oj.attr("src").replace('map_icon0_055.png','map_icon0_05.png'));
				if(mark1Array.length>0){
					ob.parent().parent().unbind("mouseenter").unbind("mouseleave").unbind("hover");
					oj.attr("title",oj.attr("aaa"));
				}
				if(array_mark.length>0){
					_Q('#model0').parent().unbind("mouseenter").unbind("mouseleave");
					_Q("#model0>img:first-child").attr("title",_Q("#model0>img:first-child").attr("aaa"));
				}
			}
		}
		//打开与关闭区域绘图功能
		function displaymodel2(btype){
			var oj = _Q("#model2>img:first-child");
			var ob = _Q("#model2");
			if(btype){
				ob.attr("onclick","").click(function(){});
				ob.css("cursor","default");
				oj.attr("src",oj.attr("src").replace('map_icon0_07.png','map_icon0_077.png'));
				oj.attr("title","");
				/*ob.parent().parent().hover(function(){
					  _Q(this).find('.hover_map').show();
				 },function(){
					 _Q(this).find('.hover_map').hide();
				 });*/
			}else{
				if(ob.attr("aa")=="aa"){
					
				}else {
					ob.attr("aa","aa");
					ob.attr("onclick","").click(function(){xx1();});
				}
				ob.css("cursor","pointer");
				oj.attr("src",oj.attr("src").replace('map_icon0_077.png','map_icon0_07.png'));
				if(mark2Array.length>0){
					ob.parent().parent().unbind("mouseenter").unbind("mouseleave");
					oj.attr("title",oj.attr("aaa"));
				}
			}
		}
		//打开与关闭大棚绘图功能
		function displaymodel3(btype){
			if(btype){
				
				/*_Q(".model3").parent().hover(function(){
					  _Q(this).find('.hover_map').show();
				 },function(){
					 _Q(this).find('.hover_map').hide();
				 });*/
			}else{
				if(mark3Array.length>0){
					_Q(".model3").parent().unbind("mouseenter").unbind("mouseleave");
				}
			}
			_Q(".model3").each(function(index){
				var oj = _Q(this).children("img")[0];
				if(btype){
					/*if(typeof _Q(this).click === 'function'){
						
					}else{
						_Q(this).attr("onclick","").click(function(){});
					}*/
					_Q(this).css("cursor","default");
					_Q(oj).attr("src",_Q(oj).attr("src").replace('map_icon0_'+(index*2+9)+'.png','map_icon0_'+(index*2+9)+''+(index*2+9)+'.png'));
					_Q(oj).attr("title","");
				}else{
					if(_Q(this).attr("aa")=="aa"){
						
					}else{
						_Q(this).attr("aa","aa");
						_Q(this).attr("onclick","").click(function(){xx2(index);});
					}
					_Q(this).css("cursor","pointer");
					_Q(oj).attr("src",_Q(oj).attr("src").replace('map_icon0_'+(index*2+9)+''+(index*2+9)+'.png','map_icon0_'+(index*2+9)+'.png'));
					_Q(oj).attr("title",_Q(oj).attr("aaa"));
				}
			});
		}
		
		function clearMap(){
			clearSelection();
			setMapNotNull();
			drawingManager.setDrawingMode(null);			
		}
		//加载基地第二步
		function loadFirstPloygon(bermudaTriangle){
			var radius = bermudaTriangle.getPath();   
    		google.maps.event.addListener(radius, 'insert_at',function(index){reset1(bermudaTriangle,radius,index,this);} );
    		google.maps.event.addListener(radius, 'remove_at',function(index){reset1(bermudaTriangle,radius,index,this);});
    		google.maps.event.addListener(radius, 'set_at', function(index){reset1(bermudaTriangle,radius,index,this);});
    		google.maps.event.addDomListener(bermudaTriangle, 'click', function(event){
    			if(!menu.isHide()){
    				menu.hide();
    			}
    		});
    		google.maps.event.addDomListener(bermudaTriangle, 'rightclick', function(event){
    			_Q("#mark_id").val(bermudaTriangle._marker._id);
    			thirdcopy(event,bermudaTriangle._id,bermudaTriangle,1);
    		});
           google.maps.event.addDomListener(bermudaTriangle, 'dblclick', function(event){//基地双击事件 弹出右侧
        	   if(!isEdit){
        			return;
        		}
        	   try{closeAutoCom(1);}catch(e){}
       			setSelection(bermudaTriangle);
       			_Q(".rightNo").hide();
    			_Q(".rightNo2").show();
    			_Q("#divtittle").text("编辑基地范围");
    			open_right_panel();
    			_Q(".tc_top_03").show();
    			_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
    			_Q(".btnOpen").hide();
       			_Q("#mark_id").val(bermudaTriangle._marker._id);
       		    _Q("#mark_name").val(bermudaTriangle._name);
       		    _Q("#mark_area").val(bermudaTriangle.mianji);
       		    _Q("#mark_contact").val(bermudaTriangle._contact);
       		    _Q("#mark_phone").val(bermudaTriangle._phone);
       		    _Q("#mark_address").val(bermudaTriangle._address);
       		    _Q("#mark_description").val(bermudaTriangle._description);
       		    _Q("#mark_coordinate_group").val(bermudaTriangle._coordinate_group);
       		    _Q("input[name='baseFormColor']").val(bermudaTriangle.get("fillColor"));
       		    _Q("#baseForm\\:color-colorPicker-hex").val(bermudaTriangle.get("fillColor").replace("#",""));
       		    _Q(".rich-color-picker-icon ").css("background-color",bermudaTriangle.get("fillColor"));
	       		setMapNull();
            }); 
			
		}
		
		//加载区域第二步
		function loadSecondPloygon(bermudaTriangle,bounds){
			var radius = bermudaTriangle.getPath();   
    		google.maps.event.addListener(radius, 'insert_at',function(index){reset2(bermudaTriangle,radius,index,this);} );
    		google.maps.event.addListener(radius, 'remove_at',function(index){reset2(bermudaTriangle,radius,index,this);});
    		google.maps.event.addListener(radius, 'set_at', function(index){reset2(bermudaTriangle,radius,index,this);});
    		google.maps.event.addDomListener(bermudaTriangle, 'click', function(event){
    			if(!menu.isHide()){
    				menu.hide();
    			}
    		});
    		google.maps.event.addDomListener(bermudaTriangle, 'rightclick', function(event){
    			_Q("#partition_index").val(bermudaTriangle._index);
    			thirdcopy(event,bermudaTriangle._id,bermudaTriangle,2);
    		});
			google.maps.event.addDomListener(bermudaTriangle, 'dblclick', function(//双击弹出右侧编辑窗口
					event) {// alert(1)
				if(!isEdit){
					return;
				}
				try{closeAutoCom(2);}catch(e){}
						setSelection(bermudaTriangle);
						_Q(".rightNo").hide();
						_Q(".rightNo3").show();
						_Q("#divtittle").text("编辑区域分区");
						_Q(".tc_top_03").show();
						open_right_panel();
						_Q(".use_field").show();
						_Q(".land_test_").show();
						var html = "";
						_Q(".soil_table").empty();
						for(var i = 0;i<soilStr.length;i++){
							var tem = soilStr[i];
							if(tem.partitionId==bermudaTriangle._id){
								var te = _Q("#soil_route_of").find("option[value="+tem.route_of+"]").html();
								if(te==null)
									te="";
								html+="<tr class='soill"+tem.id+"'><td class='bc_th01'>"+tem.begin_time+"年"+tem.end_time+"年</td><td  class='bc_th01' >"+te+"</td><td  class='bc_th01'><a href='#' onclick='editsoil("+tem.id+")'>修改</a>  <a href='#' onclick='delsoil("+tem.id+")'>删除</a></td></tr>";
							}
						}
						if(html!=""){
							html = "<tr><td class='bc_th01'>时间</td><td class='bc_th01'>用途</td><td class='bc_th01' style='width:20%'>操作</td></tr>"+html;
							_Q(".soil_table").empty().append(html);
						}
						
						var html2 = "";
						_Q(".land_table").empty();
						for(var i = 0;i<landStr.length;i++){
							var tem = landStr[i];
							if(tem.partitionId==bermudaTriangle._id){
								html2+="<tr class='land"+tem.id+"'><td class='bc_th01'>"+tem.testDate+"</td><td  class='bc_th01' >"+tem.testOrg+"</td><td  class='bc_th01' >"+tem.phVal+"</td><td  class='bc_th01'><a href='#' onclick='editland("+tem.id+")'>修改</a>  <a href='#' onclick='delland("+tem.id+")'>删除</a></td></tr>";
							}
						}
						if(html2!=""){
							html2 = "<tr><td class='bc_th01'>测试日期</td><td class='bc_th01'>测试机构</td><td class='bc_th01'>酸碱度</td><td class='bc_th01' style='width:20%'>操作</td></tr>"+html2;
							_Q(".land_table").empty().append(html2);
						}
						
						
						if(bounds.getCenter().lat()!=0&&bounds.getCenter().lng()!=-180){
						    map.setCenter(bounds.getCenter());
							map.setZoom(17);
					    }
						_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
						_Q(".btnOpen").hide();
						_Q("#partition_x").val(bermudaTriangle.partition_x);
						_Q("#partition_y").val(bermudaTriangle.partition_y);
						_Q("#partition_name").val(bermudaTriangle._name);
						_Q("#partition_id").val(bermudaTriangle._id);
						_Q("#base_id").val(bermudaTriangle._base_id);
						_Q("#partition_index").val(bermudaTriangle._index);
						_Q("#partition_group").val(bermudaTriangle._group);
						_Q("#partition_area").val(bermudaTriangle.mianji);
						_Q("#partition_description").val(bermudaTriangle._description);
						_Q("input[name='partitionFormColor']").val(bermudaTriangle.get("fillColor"));
						_Q("#partitionForm\\:color-colorPicker-hex").val(bermudaTriangle.get("fillColor").replace("#", ""));
						_Q(".rich-color-picker-icon ").css("background-color",bermudaTriangle.get("fillColor"));
						setMapNull();
					}); 
			
		}
		
		function setClickAbled(arg1){//true or false
			map.set("disableDoubleClickZoom",!arg1)
			for(var i = 0;i<mark1Array.length;i++){
				var temp = mark1Array[i];
				temp.set("clickable",arg1);
			}
			for(var i = 0;i<mark2Array.length;i++){
				var temp = mark2Array[i];
				temp.set("clickable",arg1);
			}
		}
		
		function getCanvasXY(caurrentLatLng){
		       var scale = Math.pow(2, map.getZoom());
		      var nw = new google.maps.LatLng(
		          map.getBounds().getNorthEast().lat(),
		          map.getBounds().getSouthWest().lng()
		      );
		      var worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
		      var worldCoordinate = map.getProjection().fromLatLngToPoint(caurrentLatLng);
		      var caurrentLatLngOffset = new google.maps.Point(
		          Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
		          Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
		      );
		      return caurrentLatLngOffset;
		   }
		
		function thirdcopy(event,id,polygon,type){
			if(type==0){
				menu.reset();
				menu.addItem(new MenuItem({
					text: "编辑基地信息",
					icon: workpath + "/asset/images/map_icon0_05.png",
					groupName: "map",
					handler: function(coor) {
						if(polygon._ploygon){
							polygon._ploygon.ondblclick();
						}else{
							editMark(polygon._index);
						}
					}
				}));
				menu.addItem(new MenuItem({
					text: "移动基地坐标",
					icon: workpath + "/asset/images/map_icon0_05.png",
					groupName: "map",
					handler: function(coor) {
						movetype = 1;
						movemarker(polygon);
					}
				}));
				menu.addItem(new MenuItem({
					text: "整体移动基地",
					icon: workpath + "/asset/images/map_icon0_05.png",
					groupName: "map",
					handler: function(coor) {
						movemarker(polygon);
						movetype = 2;
					}
				}));
				menu.addSeparator("map");
				menu.addItem(new MenuItem({
					text: "删除",
					icon: workpath + "/asset/images/map_icon0_05.png",
					groupName: "map",
					handler: function(coor) {
						mark_info_delete();
					}
				}));
				
				if (menu.isEnable) {
					var clickedPosition = getCanvasXY(polygon.position);
					menu.coordinate = {
							point: clickedPosition,
							latlng: event.latLng
					};
					menu.container.style.left = clickedPosition.x + "px";
					menu.container.style.top = clickedPosition.y + "px";
					menu.show();
				}
			}else if(type==1){
				menu.reset();
				menu.addItem(new MenuItem({
					text: "编辑",
					icon: workpath + "/asset/images/map_icon0_05.png",
					groupName: "map",
					handler: function(coor) {
						polygon.ondblclick();
					}
				}));
				menu.addSeparator("map");
				menu.addItem(new MenuItem({
					text: "删除",
					icon: workpath + "/asset/images/map_icon0_05.png",
					groupName: "map",
					handler: function(coor) {
						ploygon_delete();
					}
				}));
				
				if (menu.isEnable) {
					var clickedPosition = getCanvasXY(event.latLng);
					menu.coordinate = {
							point: clickedPosition,
							latlng: event.latLng
					};
					menu.container.style.left = clickedPosition.x + "px";
					menu.container.style.top = clickedPosition.y + "px";
					menu.show();
				}
			}else if(type==2){
				menu.reset();
				menu.addItem(new MenuItem({
					text: "编辑",
					icon: workpath + "/asset/images/map_icon0_05.png",
					groupName: "map",
					handler: function(coor) {
						polygon.ondblclick();
					}
				}));
				menu.addSeparator("map");
				menu.addItem(new MenuItem({
					text: "删除",
					icon: workpath + "/asset/images/map_icon0_05.png",
					groupName: "map",
					handler: function(coor) {
						part_delete();
					}
				}));
				
				if (menu.isEnable) {
					var clickedPosition = getCanvasXY(event.latLng);
					menu.coordinate = {
							point: clickedPosition,
							latlng: event.latLng
					};
					menu.container.style.left = clickedPosition.x + "px";
					menu.container.style.top = clickedPosition.y + "px";
					menu.show();
				}
			}else if(type==3){
				if(copyArray.length>0)
					return;
				menu.reset();
				menu.addItem(new MenuItem({
					text: "编辑",
					icon: workpath + "/asset/images/map_icon0_05.png",
					groupName: "map",
					handler: function(coor) {
						polygon.ondblclick();
						setTimeout(function(){
							_Q("#groupbutton2").hide();
							_Q("#groupbutton1").show();
							ret = 1;
						},1);
					}
				}));
				menu.addItem(new MenuItem({
					text: "复制",
					icon: workpath + "/asset/images/map_icon0_05.png",
					groupName: "map",
					handler: function(coor) {
						iscopy = 1;
						copyArray = new Array();
						copytarget = polygon;
						setClickAbled(false);
						var width = document.body.clientWidth;
						var height = document.body.clientHeight;
						var left = 77;
						var top = 60;
						var obj = _Q("#copy_tips");
						obj.css({"left":"77","top":(height-90)});
						clearTimeout(copy_tips_time);
						obj.show();
						copy_tips_time = setTimeout(function(){_Q("#copy_tips").hide()},5000);
					}
				}));
				menu.addItem(new MenuItem({
					text: "移动",
					icon: workpath + "/asset/images/map_icon0_05.png",
					groupName: "map",
					handler: function(coor) {
						movepolygon = polygon;
						movepolygon.set("draggable", true);
						selectedShape = polygon;
						google.maps.event.addDomListener(movepolygon, 'dragstart', function(event){
							ismove = true;
						});
						google.maps.event.addDomListener(movepolygon, 'dragend', function(event){
							ismove = false;
							var val = checkPolygonPoints(movepolygon);
							if(typeof(val)=="undefined"){
								//movepolygon.set("draggable", false);
								movepolygon.setMap(map);
								var pointStr = movepolygon._group_bak;
								pointStr = pointStr.replace(/[()]/g, '');
								if(pointStr.endWith("_")){
									pointStr = pointStr.substring(0,pointStr.length-1);
								}
								var bounds = new google.maps.LatLngBounds();
								if(pointStr!=""){
									var strr = pointStr.split("_");
									var triangleCoords = [];  
									for(var y = 0;y<strr.length;y++){
										var yy = strr[y].split(",");
										var temp = new google.maps.LatLng(parseFloat(yy[0]),parseFloat(yy[1]));
										triangleCoords.push(temp);
										bounds.extend(temp);
									}
									movepolygon.setPath(triangleCoords);
								}
//								setTimeout(function(){
//									movepolygon.set("draggable", true);
//								}, 1);
								return;
							}
							var base_id = val.base_id;
							var pointStr = val.pointStr;
							var m = val.m;
							movepolygon._base_id =       base_id;
							movepolygon._group_parent_id =  m._id;
							movepolygon._group=  pointStr;
							
							setTimeout(function(){
								movepolygon.ondblclick();
								setTimeout(function(){
									_Q("#groupbutton2").hide();
									_Q("#groupbutton1").show();
									ret = 1;
								},1);
							}, 10);
						});
					}
				}));
				menu.addSeparator("map");
				menu.addItem(new MenuItem({
					text: "删除",
					icon: workpath + "/asset/images/map_icon0_05.png",
					groupName: "map",
					handler: function(coor) {
						delete_tunnel(id);
					}
				}));
				
				if (menu.isEnable) {
					var clickedPosition = getCanvasXY(event.latLng);
					menu.coordinate = {
							point: clickedPosition,
							latlng: event.latLng
					};
					menu.container.style.left = clickedPosition.x + "px";
					menu.container.style.top = clickedPosition.y + "px";
					menu.show();
				}
			}else if(type>=4 && type <= 7){
				menu.reset();
				menu.addItem(new MenuItem({
					text: "编辑",
					icon: workpath + "/asset/images/map_icon0_05.png",
					groupName: "map",
					handler: function(coor) {
						_Q(polygon.div).find("div").trigger("dblclick");
					}
				}));
				menu.addSeparator("map");
				menu.addItem(new MenuItem({
					text: "删除",
					icon: workpath + "/asset/images/map_icon0_05.png",
					groupName: "map",
					handler: function(coor) {
						if(type==4||type==5)
							device_delete();
						if(type==6){
							_Q("#video_id").val(polygon.arr.video_id);
							video_delete();
						}
						if(type==7)
							krpano_delete();
					}
				}));
				
				if (menu.isEnable) {
					var clickedPosition = getCanvasXY(polygon.quadrilateral.latLng);
					menu.coordinate = {
							point: clickedPosition,
							latlng: event.latLng
					};
					menu.container.style.left = clickedPosition.x + "px";
					menu.container.style.top = clickedPosition.y + "px";
					menu.show();
				}
			}
			
		}
		
		//加载大棚第三步
		function loadThirdPloygon(bermudaTriangle,bounds){
			var radius = bermudaTriangle.getPath();   
    		google.maps.event.addListener(radius, 'insert_at',function(index){reset3(bermudaTriangle,radius,index,this);} );
    		google.maps.event.addListener(radius, 'remove_at',function(index){reset3(bermudaTriangle,radius,index,this);});
    		google.maps.event.addListener(radius, 'set_at', function(index){reset3(bermudaTriangle,radius,index,this);});
    		google.maps.event.addDomListener(bermudaTriangle, 'rightclick', function(event){
    			_Q("#group_index").val(bermudaTriangle._index);
    			thirdcopy(event,bermudaTriangle._id,bermudaTriangle,3);
    		});
    		google.maps.event.addDomListener(bermudaTriangle, 'click', function(event){
    			if(!menu.isHide()){
        			menu.hide();
        		}
    		});
			google.maps.event.addDomListener(bermudaTriangle, 'dblclick', function(//大棚双击弹出右侧窗口
					event) { //alert(1)
				if(movepolygon != null && movepolygon._index != bermudaTriangle._index){
					movepolygon.set("draggable", false);
				}
				
				if(!isEdit)
					return;
				try{closeAutoCom(3);}catch(e){}
				_Q(".baseMap_ttl").css('background','url('+workpath+'/asset/images/baseIcojian1.png) no-repeat 10px 12px center').next('.baseMap_con').show();
				if(backname==""){
					_Q("#upname").closest("tr").hide();
				}else{
					_Q("#upname").closest("tr").show();
					_Q("#upname").html(backname);
				}
				if(event) {
					_Q("#groupbutton1").show();
					_Q("#groupbutton2").hide();
					ret = 1;
				}else{
					_Q("#groupbutton1").hide();
					_Q("#groupbutton2").show();
					ret = 2;
				}
				var e_ = parseInt(bermudaTriangle._group_type, 10);
				_Q(".plantEnvir a:eq("+(e_-1)+")").addClass('active').siblings().removeClass('active');	
				_Q("#envType_").html(envTypeList[bermudaTriangle._group_type]);
				_Q(".tc_rw_rw2").scrollTop(0);
				var tempName = "";
				for(var w = 0;w<mark2Array.length;w++){
					if(mark2Array[w]._id==bermudaTriangle._group_parent_id)
						tempName = mark2Array[w]._name;
				}
				_Q("#group_type").val(bermudaTriangle._group_type);
				_Q("#group_type_default").val(bermudaTriangle._group_type);
				_Q("#group_type").selectpicker('refresh');
				if(bermudaTriangle._group_parent_id>0){
					_Q("#group_parent_id").val(bermudaTriangle._group_parent_id);
					_Q("#group_parent_id_default").val(bermudaTriangle._group_parent_id);
					_Q("#group_parent_id").selectpicker('refresh');
				}else{
					_Q("#group_parent_id")[0].selectedIndex = 0;
					_Q("#group_parent_id_default").val(0);
					_Q("#group_parent_id").selectpicker('refresh');
				}
				
			    //_Q("#group_farmer").selectmenu("destroy").val(bermudaTriangle._keeperId).selectmenu({style:'dropdown'});
			    //_Q("#group_farmer1").selectmenu("destroy").val(bermudaTriangle._masterId).selectmenu({style:'dropdown'});
				setSelection(bermudaTriangle);
				if(!bermudaTriangle._id||bermudaTriangle._id==null||bermudaTriangle._group=="")
			    	_Q("#nowplant").hide();
			    else
			    	_Q("#nowplant").hide();
				_Q(".rightNo").hide();
				_Q(".rightNo5").show();
				_Q("#divtittle").text("编辑区域");
				open_right_panel();
				
				_Q("#group_parent_id").empty();
				_Q("#group_parent_id").append(noneOption);
				for(var i = 0;i<mark2Array.length;i++){
					var polygon2 = mark2Array[i];
					if(polygon2.getMap()!=null&&polygon2._base_id==bermudaTriangle._base_id){
						_Q("#group_parent_id").append("<option value='"+polygon2._id+"'>"+polygon2._name+"</option>");
					}
				}
				nonecheck();
				_Q(".tc_top_03").show();
				_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
				_Q(".btnOpen").hide();
				_Q("#group_base_id").val(bermudaTriangle._base_id);
				_Q("#group_x").val(bermudaTriangle.group_x);
				_Q("#group_y").val(bermudaTriangle.group_y);
				_Q("#group_name").val(bermudaTriangle._name);
				_Q("#group_id").val(bermudaTriangle._id);
			    _Q("#group_parent_id").val(bermudaTriangle._group_parent_id);
			    _Q("#group_parent_id").selectpicker("refresh");
			    _Q("#group_index").val(bermudaTriangle._index);
			    _Q("#group_group").val(bermudaTriangle._group);
			    _Q("#group_area").val(bermudaTriangle.mianji);
			    _Q("#group_area_hidden").text("/"+bermudaTriangle.mianji+"亩");
			    _Q("#group_type").val(bermudaTriangle._group_type);
			    _Q("#group_farmer").val(bermudaTriangle._keeperId);
			    _Q("#group_farmer1").val(bermudaTriangle._masterId);
			    _Q("#muarea").val(bermudaTriangle._muarea);
			    var bounds = new google.maps.LatLngBounds();
				if(bermudaTriangle._group!=""){
					var strr = bermudaTriangle._group.replace(/[()]/g, '');
					if(strr.endWith("_"))
						strr = strr.substring(0,strr.length-1);
					strr = strr.split("_");
					for(var y = 0;y<strr.length;y++){
						var yy = strr[y].split(",");
						var temp = new google.maps.LatLng(parseFloat(yy[0]),parseFloat(yy[1]));
						bounds.extend(temp);
					}
				}
			    if(bounds.getCenter().lat()!=0&&bounds.getCenter().lng()!=-180){
				    map.setCenter(bounds.getCenter());
					map.setZoom(19);
			    }else {
			    	noPaint = bermudaTriangle;
			    }
			    var tempArray = map5.get(bermudaTriangle._id);
			    var html = "";
			    
			    if(bermudaTriangle._group_type==8){
					_Q(".animal_hide").show();
					_Q(".plant_hide").hide();
					_Q(".animal_hide").find(".fenzu").show();
					_Q(".animal_hide").find(".fenzu").find("select").attr("name","group_groupId").attr("id","group_groupId");
					_Q(".plant_hide").find(".fenzu").hide();
					_Q(".plant_hide").find(".fenzu").find("select").attr("name","").attr("id","");
					_Q("#group_groupId").empty().append(_Q("#group_groupId_ [base_id='"+bermudaTriangle._base_id+"']").clone());
					_Q('#group_farmer2').empty().append(_Q("#group_farmer2_ [base_id='"+bermudaTriangle._base_id+"']").clone());
					_Q('#group_farmer3').empty().append(_Q("#group_farmer3_ [base_id='"+bermudaTriangle._base_id+"']").clone());
					nonecheck();
					_Q('#group_farmer2').val(bermudaTriangle._keeperId);
					_Q('#group_farmer3').val(bermudaTriangle._masterId);
					_Q('#group_groupId').val(bermudaTriangle._tunnel_group_id);
					_Q("#group_farmer2").selectpicker('refresh');
					_Q("#group_farmer3").selectpicker('refresh');
					_Q("#group_groupId").selectpicker('refresh');
					var animal_html = '';
					for(var i = 0;i<animalStr.length;i++){
						var obj_ = animalStr[i];
						if(obj_[3]==bermudaTriangle._id){
							animal_html+='<li class="breedList_link"><div class="breedPic"><span class="zhezhaoImg"><img src="'+obj_[2]+'" /></span></div><p class="breedText">'+obj_[1]+'</p></li>'
						}
					}
					if(animal_html!=''){
						_Q(".breedList").empty();
						_Q(".breedList").append(animal_html);
						_Q(".noneani").hide();
					}else{
						_Q(".breedList").empty();
						_Q(".noneani").show();
					}
				}else{
					_Q(".animal_hide").hide();
					_Q(".plant_hide").show();
					_Q(".plant_hide").find(".fenzu").show();
					_Q(".plant_hide").find(".fenzu").find("select").attr("name","group_groupId").attr("id","group_groupId");
					_Q(".animal_hide").find(".fenzu").hide();
					_Q(".animal_hide").find(".fenzu").find("select").attr("name","").attr("id","");
					_Q("#group_groupId").empty().append(_Q("#group_groupId_ [base_id='"+bermudaTriangle._base_id+"']").clone());
					
					_Q('#group_farmer').empty().append(_Q("#group_farmer_ [base_id='"+bermudaTriangle._base_id+"']").clone()).append(_Q("#group_farmer_ [base_id='']").clone());
					_Q('#group_farmer1').empty().append(_Q("#group_farmer1_ [base_id='"+bermudaTriangle._base_id+"']").clone()).append(_Q("#group_farmer1_ [base_id='']").clone());
					nonecheck();
					_Q('#group_groupId').val(bermudaTriangle._tunnel_group_id);
					_Q('#group_farmer').val(bermudaTriangle._keeperId);
					_Q('#group_farmer1').val(bermudaTriangle._masterId);
					_Q("#group_farmer").selectpicker('refresh');
					_Q("#group_farmer1").selectpicker('refresh');
					_Q("#group_groupId").selectpicker('refresh');
				}
			    if(false&&tempArray!=null){
			    	html = "<font style='float:left; font-weight:bold; color:#333;'>当前种植</font><br/>";
				    for(var i = 0;i<tempArray.length;i++){
				    	var obj = tempArray[i];
				    	var tempsrc = obj.imground;
				    	if(tempsrc == "")
				    		tempsrc = nonesrc;
				    	html+='<div class="rteic" ><img  style="cursor:pointer" width="53" height="53" src="'+workpath+'/asset/images/image_b3.png" class="rtpic" />'+
		                '<img width="53" height="53" src="'+tempsrc+'" class="rtimg" /><div class="ritex">'+obj.breed_name+'<input type="hidden" value="'+obj.breed_id+'" class="obj_breed_id"></input><input type="hidden" value="'+obj.crop_area+'" class="obj_crop_area"></input></div>'+
		                '<div class="rtehov" style="display: none;">'+
		                '<a href="#3" onclick="editPlant('+obj.real_plant_id+')" style=" position: absolute; bottom:0; right:0; top:-2px; left:-2px; z-index:103; display:block;"><img width="56" height="58" src="'+workpath+'/asset/images/hover.png"></a>'+
		                '<a href="#2" onclick="deletePlantSelf('+obj.real_plant_id+',this,'+bermudaTriangle._id+')" class="rholli"><img width="18" height="18" src="'+workpath+'/asset/images/clo_03.png"></a>'+
		                '</div></div>';
				    }
			    }
			    if(html==""){
			    	_Q(".tec_c").closest("tr").hide();;
			    }else{
			    	_Q(".tec_c").closest("tr").show();;
			    }
			    html+='<div class="clear"></div>';
			    _Q(".tec_c").empty();
			    _Q(".tec_c").append(html);
			    //clickOptions(_Q("#group_farmer").attr("aindex"),_Q("#group_farmer").find("option[value="+bermudaTriangle._keeperId+"]").index(),"group_farmer");
			    //clickOptions(_Q("#group_farmer1").attr("aindex"),_Q("#group_farmer1").find("option[value="+bermudaTriangle._masterId+"]").index(),"group_farmer1");
			    if(bermudaTriangle._group_type<5&&false)
			    	_Q(".firstblock").show();
			    else
			    	_Q(".firstblock").hide();
			    _Q("input[name='groupFormColor']").val(bermudaTriangle.get("fillColor"));
	   		    _Q("#groupForm\\:color-colorPicker-hex").val(bermudaTriangle.get("fillColor").replace("#",""));
	   		    _Q(".rich-color-picker-icon").css("background-color",bermudaTriangle.get("fillColor"));
	   		    setMapNull();
			}); 
			var ftype = bermudaTriangle._ftype;
			var ftypes = ftype.split(",");
			var oneb = false;
			var twob = false;
			for(var i = 0;i<ftypes.length;i++){
				var rp = ftypes[i];
				if(rp == "1"){
					oneb = true;
				}else{
					twob = true;
				}
			}
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
						}else {
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
				if (bermudaTriangle._plant_length == 0) {
					isrc = nonesrc;
				} else if (bermudaTriangle._plant_length == 1) {
					if(bermudaTriangle._plant_Image == ""){
						isrc = nonesrc;
					}else{
						isrc = bermudaTriangle._plant_Image+"@60h_60w|60-1ci.png";
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
			}

			usgs = new USGSOverlay(bounds2, isrc, map, bermudaTriangle, tempb);
			bermudaTriangle._usgs = usgs;
		}
		
		//加载传感器,气象站
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
		
		//加载视频
		function loadfifth(){
			for(var i = 0;i<videoStr.length;i++){
				var temp = videoStr[i];
				var arr = {};
				arr.device_ = 3;
				arr.video_id = temp.videoId;
				arr.video_coordinateX = temp.coordinateX;
				arr.video_coordinateY = temp.coordinateY;
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
				arr._index = i;
				var latlng = new google.maps.LatLng(temp.coordinateX,temp.coordinateY);				
				var wenzi =new Wenzi(latlng, temp.name, map, 4);			    
				var custom = new CustomOverlay(map,krpanosrc,latlng,arr);
			    custom._wenzi = wenzi;
				krpanoArray.push(custom);			
			}
			krpano_index = krpanoStr.length;
		}
		
		//加载描点第二部
		function attachSecretMessage(marker,array,index){
			/*var contentString = "<div style='width:240px'><table><tr><td width='200'>"+array.name+"<br/>联系人:"+array.contact+"<br/>电话:"+array.phone+"<br/>地址:"+array.address+"<br/>描述:"+array.description+"</td><td valign='top'><span style='cursor:pointer;font-weight:bold;' onclick='editMark("+index+")'>编辑</span></td></tr></table></div>"; 
			var infowindow = new google.maps.InfoWindow({
				content: contentString,
				maxWidth: 400,
				disableAutoPan:true
				});
			marker._infowindow=infowindow;*/
			
			google.maps.event.addListener(marker, 'rightclick', function() {
				_Q("#mark_info_index").val(marker._index);
    			thirdcopy(event,marker._id,marker,0);
			  });
			
			google.maps.event.addListener(marker, 'click', function() {//单击打开弹出框,弹出框加载事件
			    //infowindow.open(marker.get('map'), marker);
				
				_Q(".cm_name").html(array.name);
				_Q(".cm_name").attr('title',array.name);
				if(marker._ploygon){
					_Q(".fl_concat").html(""+marker._ploygon._contact);
					_Q(".fl_concat").attr("title",marker._ploygon._contact);
					_Q(".phone").html(""+marker._ploygon._phone);
					_Q(".phone").attr("title",marker._ploygon._phone);
					_Q(".cm_address").html(""+marker._ploygon._address);
					_Q(".cm_address").attr("title",marker._ploygon._address);
					_Q(".cm_mark").html("描述："+marker._ploygon._description);
					_Q(".cm_mark").attr("title",marker._ploygon._description);
					if(marker._imgUrl&&marker._imgUrl!="")
						_Q("#baseurl").attr("src",marker._imgUrl);
					else
						_Q("#baseurl").attr("src",_Q("#baseurl").attr("aa"));
				}else{
					_Q(".fl_concat").html("");
					_Q(".fl_concat").removeAttr("title");
					_Q(".phone").html("");
					_Q(".phone").removeAttr("title");
					_Q(".cm_address").html("");
					_Q(".cm_address").removeAttr("title");
					_Q(".cm_mark").html("描述：");
					_Q(".cm_mark").removeAttr("title");
					_Q("#baseurl").attr("src",_Q("#baseurl").attr("aa"));
				}
				_Q("#dropdown-menu2 li:eq(0)").unbind("click");
				_Q("#dropdown-menu2 li:eq(0)").click(function(){
					if(marker._ploygon){
						marker._ploygon.ondblclick();
					}else{
						editMark(index);
					}
					closeCm();
				});
				_Q("#dropdown-menu2 li:eq(1)").unbind("click");
				_Q("#dropdown-menu2 li:eq(1)").click(function(){
					movetype = 1;
					movemarker(marker);
					closeCm();
				});
				_Q("#dropdown-menu2 li:eq(2)").unbind("click");
				_Q("#dropdown-menu2 li:eq(2)").click(function(){
					movemarker(marker);
					movetype = 2;
					closeCm();
				});
				
				_Q('#login4').show();
				_Q(".farmIntroPop").show();
				_Q("#dropdown-menu2").hide();
				_Q(".farmIntroPop").css("left",_Q('#login4').width()/2-320/2+71);
        		_Q(".farmIntroPop").css("top",_Q("#mPane").height()/2-_Q(".farmIntroPop").height());
			    map.setCenter(marker.getPosition());
			    if(typeof(marker._ploygon) != "undefined"){
			    	map.setZoom(marker._ploygon._zoom);
			    }else{
			    	map.setZoom(16);
			    }
			  });
			google.maps.event.addDomListener(marker, 'dblclick', function() {//双击编辑基地
					_Q("#mark_info_name").val(marker._name);
					_Q("#mark_info_index").val(marker._index);	
					_Q("#mark_info_x").val(marker._coordinate_X);
					_Q("#mark_info_y").val(marker._coordinate_Y);
					_Q("#mark_info_id").val(marker._id);
					_Q(".rightNo").hide();
	    			_Q(".rightNo1").show();
	    			_Q("#divtittle").text("编辑基地位置");
	    			open_right_panel();
	    			_Q(".tc_top_03").show();
	    			_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
	    			_Q(".btnOpen").hide();
			  });
		}	  
		
		//基地编辑完成
		function mark_ok(data){
			if(data == "no"){
				  showCheckTips("抱歉，您可使用面积已达上限！如想继续创建，请联系我们！");
				  return;
			 }
			var m;
			for(var i = 0;i<mark1Array.length;i++){
				var polygon = mark1Array[i];
				if(polygon._marker._id==_Q("#mark_id").val()){
					m = polygon._marker;
					polygon.isok=1;
					polygon._description=_Q("#mark_description").val();
					polygon._contact=_Q("#mark_contact").val();
					polygon._phone=_Q("#mark_phone").val();
					polygon._address=_Q("#mark_address").val();
					polygon._coordinate_group=_Q("#mark_coordinate_group").val();
					polygon.set("fillColor",_Q("input[name='baseFormColor']").val());
					polygon.set("strokeColor",_Q("input[name='baseFormColor']").val());
				}
			}
			/*if(m){
				var info = m._infowindow;
				var content = "<div style='width:240px'><table><tr><td width='200'>"+m._name+"<br/>联系人:"+_Q("#mark_contact").val()+"<br/>电话:"+_Q("#mark_phone").val()+"<br/>地址:"+_Q("#mark_address").val()+"<br/>描述:"+_Q("#mark_description").val()+"</td><td valign='top'><span style='cursor:pointer;font-weight:bold;' onclick='editMark("+m._index+")'>编辑</span></td></tr></table></div>"; 
				
				info.set("content",content);
			}*/
			m.setDraggable(false);
			clearSelection();
			if(mark1Array.length>=1){
				displaymodel2(false);
			}
			close_right_panel();
			setMapNotNull();
			ts_check();
		}
		//取消基地编辑
		function mark_no(){
			clearSelection();
			for(var i = 0;i<mark1Array.length;i++){
				var polygon = mark1Array[i];
				if(polygon.isok!=1){
					polygon._marker._btype=undefined;
					polygon.setMap(null);
				}
			}
			close_right_panel();
			setMapNotNull();
		}	
		//删除基地
		function ploygon_delete(){
			for(var i = 0;i<mark1Array.length;i++){
				var polygon = mark1Array[i];
				if(polygon._marker._id==_Q("#mark_id").val()){
					mark_delete(_Q("#mark_id").val());
				}
			}
			
		}  
		
		function mark_delete_next(data){
			if(data!=""){
				alert(data);
				return ;
			}
			_Q("#selectedName"+_Q("#mark_id").val()).remove();
			for(var i = 0;i<mark1Array.length;i++){
				var polygon = mark1Array[i];
				if(polygon._marker._id==_Q("#mark_id").val()){
					if(polygon._marker._wenzi){
						polygon._marker._wenzi.setMap(null);
					}
					polygon.setMap(null);
					polygon._marker._btype=undefined;
					polygon._marker.setMap(null);
				}
			}
			clearSelection();
			close_right_panel();
			setMapNotNull();
		}
		
		//区域编辑完成
		function part_ok(){
			var polygon;
			for(var i = 0;i<mark2Array.length;i++){
				polygon = mark2Array[i];
				if(polygon._index==_Q("#partition_index").val()){
					polygon._id=_Q("#partition_id").val();
					polygon._base_id=_Q("#base_id").val();
					polygon._group=_Q("#partition_group").val();
					polygon.mianji=_Q("#partition_area").val();
					polygon._name=_Q("#partition_name").val();
					polygon.partition_x = _Q("#partition_x").val();
					polygon.partition_y = _Q("#partition_y").val();	
					polygon._description=_Q("#partition_description").val();
					polygon.set("fillColor",_Q("input[name='partitionFormColor']").val());
					polygon.set("strokeColor",_Q("input[name='partitionFormColor']").val());
					break;
				}
			}
			if(nullGroupSecondInd){
				var value = _Q("#partition_id").val();
                for (var i = 0;i<nullGroupSecond.length;i++){
                    var tob = nullGroupSecond[i];
                    if(tob.value == value && polygon._base_id == tob.base_id){
                    	nullGroupSecond = nullGroupSecond.del(i);
                        nullGroupSecondInd = false;
                        break;
                    }
                }
                try{closeAutoCom(2);}catch(e){};
                nullGroupSecondInd = false;
            }

			if(!map2.containsKey(polygon._id)){
            	map2.put(polygon._id,polygon._name);
            }
			for(var i = 0;i<pidArray.length;i++){
				var _id = pidArray[i].id;
				if(_id==polygon._id){
					continue;
				}else if(i==pidArray.length-1){
					pidArray.push({"id":polygon._id,"indexNum":0});
				}
			}
			var array = polygon.getPath().getArray();
			var bounds = new google.maps.LatLngBounds();
			for (i = 0; i < array.length; i++) {
				bounds.extend(array[i]);
			}
			if(polygon._wenzi)
				polygon._wenzi.setMap(null);
			var wen = new Wenzi(bounds.getCenter(), polygon._name, map, 2);
			polygon._wenzi = wen;
			/*var contentString = polygon._name;
			var marker;
			var infowindow;
			if (!polygon._marker) {
				infowindow = new google.maps.InfoWindow( {
					content : contentString,
					maxWidth : 200,
					minWidth : 100
				});
		
				marker = new google.maps.Marker( {
					position : bounds.getCenter(),
					map : map,
					title : polygon._name,
					icon : '../asset/images/zb1.png'
				});
			} else {
				marker = polygon._marker;
				infowindow = marker._infowindow;
				marker.set("title", polygon._name);
				marker.set("position", bounds.getCenter());
				infowindow.set("content", contentString);
			}
				
			marker._infowindow=infowindow;
			polygon._marker = marker;
			google.maps.event.addDomListener(marker, 'click', function() {
				infowindow.open(map, marker);
			});
			google.maps.event.addDomListener(marker, 'dblclick', function() {
				map.setCenter(marker.getPosition());
				map.setZoom(16);
			});*/
			
			clearSelection();
			if(polygon._parent){
				if(polygon._parent._list){
					polygon._parent._list.push(polygon);
				}else{
					var ary = new Array();
					ary.push(polygon);
					polygon._parent._list = ary;
				}
			}
			close_right_panel();
			setMapNotNull();
			if(mark2Array.length>0){
				displaymodel3(false);
			}else{
				displaymodel3(true);
			}
			_Q("#group_parent_id").empty();
			_Q("#group_parent_id").append(noneOption);
			for(var i = 0;i<mark2Array.length;i++){
				var polygon2 = mark2Array[i];
				if(polygon2.getMap()!=null){
					_Q("#group_parent_id").append("<option value='"+polygon2._id+"'>"+polygon2._name+"</option>");
				}
			}
			ts_check();
		}
		//取消区域编辑
		function part_no (){
			if(selectedShape){
				if(selectedShape._id==null||selectedShape._id==undefined||selectedShape._id==''){
					selectedShape.setMap(null);
				}
			}
			clearSelection();
			close_right_panel();
			setMapNotNull();
		}	
		//删除区域
		function part_delete(){
			for(var i = 0;i<mark2Array.length;i++){
				var polygon = mark2Array[i];
				if(polygon._index==_Q("#partition_index").val()){
					if(polygon._id)
						partition_delete(polygon._id);
					else{
						polygon.setMap(null);
						clearSelection();
						close_right_panel();
						setMapNotNull();
					}
				}
			}
			
		}
		
		//分区删除之后删除数组
		function partition_delete_next(data){
			if(data!=""){
				alert(data);
				return;
			}
			for(var i = 0;i<mark2Array.length;i++){
				var polygon = mark2Array[i];
				if(polygon._index==_Q("#partition_index").val()){
						polygon.setMap(null);
						if(polygon._wenzi){
							polygon._wenzi.setMap(null);
						}
				}
			}
			clearSelection();
			close_right_panel();
			setMapNotNull();
		}
		
		var nullGroupThirdInd = false;
		//采集设备,调节设备 数据保存方法 
		//已无用
		function che(){
			var name = _Q("#group_name").val();
			if(name==""){
		        alert("请填写区域名称!")
		        return false;
		    }
			if(name.length>45){
				alert("区域名称长度不能超过45个字符!")
				return false;
			}
			var reg = /^\d+(?=\.{0,1}\d+$|$)/
			var val = _Q("#muarea").val();
			if(isNaN(val) || val == '' || !reg.test(val)){
				alert("请填写正确的亩数!");
				return false;
			}
			
			/*var val2 = _Q("#group_area").val();
			if(val2<val){
				alert("种植面积超过地块可种面积，请调整种植面积!");
				return false;
			}*/
			
			
			if(_Q("#group_name").val()==""){
				alert("请填写区域名称!");
				return false;
			}
			var group_parent_id = _Q("#group_parent_id").val();
			var group_base_id = _Q("#group_base_id").val();
			var group_type = _Q("#group_type").val();
			if(nullGroupThird.length>0){
		        for (var i = 0;i<nullGroupThird.length;i++){
		            var tob = nullGroupThird[i];
		            if(group_parent_id == null){
		            	if(tob.label == name && tob.base_id == group_base_id && tob.ent_type == group_type){
			                _Q("#group_id").val(tob.value);
			                nullGroupThirdInd = true;
			                break;
			            }
		            }else{
		            	if(tob.label == name && tob.base_id == group_base_id && tob.part_id == group_parent_id && tob.ent_type == group_type){
			                _Q("#group_id").val(tob.value);
			                nullGroupThirdInd = true;
			                break;
			            }
		            }
		            
		        }
		    }	
			return true;
		}
		
		function resetTunnelGroup(){
			if(!selectedShape){
				return;
			}
			var array= selectedShape.getPath().getArray();
			var ps = "";
		    for(var i = 0;i<array.length;i++){
				ps+=array[i]+"_";
	    	}
		    if(ps.endWith("_")){
		    	ps = ps.substring(0,ps.length-1);
		    }
		    if(ps!=selectedShape._group_bak){
		    	var pointStr = selectedShape._group_bak;
				pointStr = pointStr.replace(/[()]/g, '');
				if(pointStr.endWith("_")){
					pointStr = pointStr.substring(0,pointStr.length-1);
			    }
				var bounds = new google.maps.LatLngBounds();
				if(pointStr!=""){
					var strr = pointStr.split("_");
					var triangleCoords = [];  
					for(var y = 0;y<strr.length;y++){
						var yy = strr[y].split(",");
						var temp = new google.maps.LatLng(parseFloat(yy[0]),parseFloat(yy[1]));
						triangleCoords.push(temp);
						bounds.extend(temp);
					}
					selectedShape.setPath(triangleCoords);
					reset33(triangleCoords);
				}
		    }
		}
		
		//大棚编辑完成
		function group_ok(data){
			var strs_ = data.split("+_+");
			if(strs_[0]=="no"){
				var jso = ["设施","设施","设施","设施","设施","大田","果园","",""];
				var grouptype = _Q("#group_type").val();
				var tpstr = jso[grouptype];
				if(strs_[1]=="-1"){
					showCheckTips("抱歉，您可添加的"+tpstr+"面积已达到上限！");
					resetTunnelGroup();
				}else if(strs_[1]=="-2"){
					alert('区域名称重复!');
					return ;
				}else{
					var td = parseFloat(strs_[1]);
					td = td.toFixed(2);
					showCheckTips("抱歉，您可添加的"+tpstr+"面积已达到上限，请添加小于"+td+"面积的"+tpstr+"！如想继续创建，请联系我们！");
					resetTunnelGroup();
					return ;
				}
			}else{
				_Q('#group_id').val(strs_[1]);
				var groups = strs_[2].split(",");
				_Q('#group_x').val(groups[0]);
				_Q('#group_y').val(groups[1]);
			}
			var polygon;
			var b_b = false;
			for(var i = 0;i<mark3Array.length;i++){//数组内容从新赋值
				polygon = mark3Array[i];
				if(polygon._index==_Q("#group_index").val()){
					b_b = true;
					break;
				}
			}
			
			if(!b_b){
				for(var i = 0;i<copyArray.length;i++){//数组内容从新赋值
					polygon = copyArray[i];
					if(polygon._index==_Q("#group_index").val()){
						mark3Array.unshift(polygon);
						break;
					}
				}
			}
			if(nullGroupThirdInd){
		        var value = _Q("#group_id").val();
		        for (var i = 0;i<nullGroupThird.length;i++){
		            var tob = nullGroupThird[i];
		            if(tob.value == value ){
		            	nullGroupThird = nullGroupThird.del(i);
		                nullGroupThirdInd = false;
		                break;
		            }
		        }
		        try{closeAutoCom(3);}catch(e){};
		    }
			backname = _Q("#group_name").val();
			polygon._name=_Q("#group_name").val();
			polygon._id=_Q("#group_id").val();
			polygon._group_parent_id=_Q("#group_parent_id").val();
			polygon._index=_Q("#group_index").val();
			polygon._group=_Q("#group_group").val();
			polygon._group_bak=_Q("#group_group").val();
			polygon.group_x=_Q("#group_x").val();
			polygon.group_y=_Q("#group_y").val();
			polygon.mianji=_Q("#group_area").val();
			polygon._muarea=_Q("#muarea").val();
			polygon._group_type=_Q("#group_type").val();
			if(_Q("#group_type").val()==8){
				polygon._keeperId=_Q("#group_farmer2").val();
				polygon._masterId=_Q("#group_farmer3").val();
			}else{
				polygon._keeperId=_Q("#group_farmer").val();
				polygon._masterId=_Q("#group_farmer1").val();
			}
			polygon._tunnel_group_id = _Q('#group_groupId').val();
			polygon.set("fillColor",_Q("input[name='groupFormColor']").val());
			polygon.set("strokeColor",_Q("input[name='groupFormColor']").val());
			
			if(movepolygon!=null && movepolygon._id == polygon._id){
				movepolygon.set("draggable", false);
	        	movepolygon.set("editable", false);
			}
			
			var tempArray = map1.get(polygon._group_parent_id);
			var part_name = "";
			var b = false;
			if(tempArray!=null){
				for(var i = 0;i<tempArray.length;i++){
					var tempList = tempArray[i];
					for(var j = 0;j<tempList.length;j++){
						var obj = tempList[j];
						if(obj.tunnel_info_id==polygon._id){
							b = true;
							break;
						}
					}
					if(b)
						break;
				}
			}
			if(!b){
				var tempSt = '{"model_id":0,"plant_id":0,"endtime":"","starttime":"","imground":"","imgsquare":"","breed_id":0,"breed_name":"","crop_area":0,"mu_number":'+polygon.mianji+',"partition_id":'+polygon._group_parent_id+',"partition_name":"'+_Q("#group_parent_id").find("option:selected").text()+'","plant_stauts":0,"real_plant_id":0,"tunnel_info_id":'+polygon._id+',"tunnel_name":"'+polygon._name+'","type_id":'+polygon._group_type+',"type_name":"'+envTypeList[polygon._group_type]+'"}';
				eval('var tempp = '+tempSt);
				tempArray = new Array();
				tempArray.push(tempp);
				allList.push(tempp);
				initList();
			}
			for(var i = 0;i<allList.length;i++){
				var tt = allList[i];
				if(tt.tunnel_info_id==polygon._id){
						tt.type_id = _Q("#group_type").val();
						tt.type_name=envTypeList[polygon._group_type];
						tt.partition_id = _Q("#group_parent_id").val();
						tt.partition_name = _Q("#group_parent_id").find("option:selected").text(); 
						tt.tunnel_name = _Q("#group_name").val();
						tt.mu_number=_Q("#muarea").val();
				}
			}
			
			initList();
			if(polygon._wenzi)
				polygon._wenzi.setMap(null)
			var centerpoint = new google.maps.LatLng(parseFloat(polygon.group_x),parseFloat(polygon.group_y));
			var wenzi = new Wenzi(centerpoint, polygon._name, map, 3);
			polygon._wenzi = wenzi;
			if(parseFloat(polygon.group_x)!=0&&parseFloat(polygon.group_y)!=-180){
				var ftype = polygon._ftype;
				var ftypes = ftype.split(",");
				var oneb = false;
				var twob = false;
				for(var i = 0;i<ftypes.length;i++){
					var rp = ftypes[i];
					if(rp == "1"){
						oneb = true;
					}else{
						twob = true;
					}
				}
				var uss;
				var isrc = "";
				var tempb = false;
				var lat = parseFloat(polygon.group_x);
				var lng = parseFloat(polygon.group_y);
				var left = new google.maps.LatLng(lat + 0.0000422, lng + 0.000055);
				var right = new google.maps.LatLng(lat - 0.000042, lng - 0.000055);
				var bounds2 = new google.maps.LatLngBounds(right, left);
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
					if (polygon._plant_length == 0) {
						isrc = nonesrc;
					} else if (polygon._plant_length == 1) {
						isrc = polygon._plant_Image;
					} else {
						if(twob){
							if(oneb)
								isrc = oneimg;
							else
								isrc = twoimg;
						}else 
							isrc = moresrc;
					}
				}
				var uss = polygon._usgs;
				if(uss)
					uss.setMap(null);
				var usgss = new USGSOverlay(bounds2,isrc,map,polygon);
				polygon._usgs = usgss;
			}
			
			clearSelection();
			if(polygon._parent){
				if(polygon._parent._list){
					polygon._parent._list.push(polygon);
				}else{
					var ary = new Array();
					ary.push(polygon);
					polygon._parent._list = ary;
				}
			}
			for(var i = 0;i<allList.length;i++){
				var temp = allList[i];
				if(temp.tunnel_info_id == _Q('#group_id').val()){
					temp.mu_number = _Q("#muarea").val();
					allList[i] = temp;
				}
			}
			g_infowindow.setMap(null);
			initList();searchs();
			setMapNotNull();
			ts_check();
			//if(mark3Array.length>0)
			//	displaymodel3(false);
			
			iscopy = 0;
			copytarget = null;
			setClickAbled(true);
			copyArray = new Array();
			if(mark3Array.length>0)
				_Q("#goAPS").click(function(){goAPS_next();});
			if(ret==2){
				group_back();
				return;
			}
			close_right_panel();
		}
		//取消大棚编辑
		function group_no (){
			if(selectedShape){
				if(selectedShape._id==undefined||selectedShape._id==''){
					if(selectedShape._wenzi)
						selectedShape._wenzi.setMap(null);
					if(selectedShape._usgs)
						selectedShape._usgs.setMap();
					selectedShape.setMap(null);
				}else{
					if(movepolygon!=null && movepolygon._id == selectedShape._id){
						movepolygon.set("draggable", false);
			        	movepolygon.set("editable", false);
					}
					var array= selectedShape.getPath().getArray();
					var ps = "";
				    for(var i = 0;i<array.length;i++){
						ps+=array[i]+"_";
			    	}
				    if(ps.endWith("_")){
				    	ps = ps.substring(0,ps.length-1);
				    }
				    if(ps!=selectedShape._group_bak){
				    	var pointStr = selectedShape._group_bak;
						pointStr = pointStr.replace(/[()]/g, '');
						if(pointStr.endWith("_")){
							pointStr = pointStr.substring(0,pointStr.length-1);
					    }
						var bounds = new google.maps.LatLngBounds();
						if(pointStr!=""){
							var strr = pointStr.split("_");
							var triangleCoords = [];  
							for(var y = 0;y<strr.length;y++){
								var yy = strr[y].split(",");
								var temp = new google.maps.LatLng(parseFloat(yy[0]),parseFloat(yy[1]));
								triangleCoords.push(temp);
								bounds.extend(temp);
							}
							selectedShape.setPath(triangleCoords);
							reset33(triangleCoords);
						}
				    }
				}
			}
			copyArray = new Array();
			backname = _Q("#group_name").val();
			clearSelection();
			g_infowindow.setMap(null);
			close_right_panel();
			setMapNotNull();
		}	
		//删除大棚
		function group_delete(){
			for(var i = 0;i<mark3Array.length;i++){
				var polygon = mark3Array[i];
				if(polygon._marker._id==_Q("#mark_id").val()){
					polygon.setMap(null);
					polygon._marker._btype=undefined;
					mark_delete(_Q("#mark_id").val());
				}
			}
			backname = _Q("#group_name").val();
			clearSelection();
			close_right_panel();
			setMapNotNull();
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
			drawingManager.setDrawingMode(null);
			for(var i = 0 ;i<mark1Array.length;i++){
				var polygon = mark1Array[i];
				if(polygon.getMap()!=null){
					var marker = polygon._marker;
					marker.setMap(map);
				}
			}
			for(var i = 0;i<mark2Array.length;i++){
				var ploygon = mark2Array[i];
				var marker = ploygon._marker;
				if(marker)
				marker.setMap(map);
			}
			_Q(".maptwo").attr("class","mapone");
			_Q(".model3").removeClass("on");
			
			_Q(".model3").removeClass("on");
			_Q("#model2").parent().attr("class","mapone");
			_Q("#model1").parent().attr("class","mapone");
			_Q(".model4").removeClass("on");
		}
		//采集设备,调节设备 点击事件触发
		function checkbox1 (obj){
			if(_Q(obj).attr("class")=="new_checkbox1"){
				_Q(obj).attr("class","new_checkbox1_2");
			}else if(_Q(obj).attr("class")=="new_checkbox1_2"){
				_Q(obj).attr("class","new_checkbox1");
			}
		}
		function checkbox2 (obj){
			if(_Q(obj).attr("class")=="new_checkbox2"){
				_Q(obj).attr("class","new_checkbox2_2");
			}else if(_Q(obj).attr("class")=="new_checkbox2_2"){
				_Q(obj).attr("class","new_checkbox2");
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
			}

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
		
		function USGSOverlay(bounds, image, map,obj) {
				  this.parents = obj;
				  this.bounds_ = bounds;
				  this.image_ = image;
				  this.map_ = map;
				  this.div_ = null;
				  this.setMap(map);
				}
		USGSOverlay.prototype = new google.maps.OverlayView();
		USGSOverlay.prototype.onAdd = function() {
			  var div = document.createElement('div');
			  div.style.border = 'none';
			  div.style.zIndex="888";
			  div.style.borderWidth = '0px';
			  div.style.position = 'absolute';
			  var img = document.createElement('img');
			  img.src = this.image_;
			  img.style.width = '100%';
			  img.style.height = '100%';
			  div.appendChild(img);
			  this.div_ = div;
			  this.div_.style.cursor = "default";
			  var panes = this.getPanes();
			  panes.overlayImage.appendChild(this.div_);
			  var _self=this;
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
			
			function showInfos (obj,event){
				var box_title = "";
				var box_plant = "";
				var box_area = "";
				var box_image = "";
				var box_content = "";
				var temp = map5.get(obj.parents._id);
				var b = true;
				if(temp==null||temp.length==0){
					box_title = obj.parents._name;
					box_plant = "";
					box_area = obj.parents.mianji;
					box_image = addsrc;
					box_content = "暂无作物";
					_Q(".zw_bgt2").css("cursor","pointer");
					b = false;
				}else if(temp.length==1){
					box_title = obj.parents._name;
					box_plant = temp[0].breed_name;
					box_area = obj.parents.mianji;
					box_image = temp[0].imground;
					if(box_image=="")
						box_image = nonesrc;
					box_content = "种植日期："+temp[0].starttime;
					if(temp[0].enttime!=""){
						content+=" - "+temp[0].endtime;
					}
					_Q(".zw_bgt2").attr("onclick","addPlant()");
					_Q(".zw_bgt2").css("cursor","default");
				}else if(temp.length>1){
					box_title = obj.parents._name;
					box_area = obj.parents.mianji;
					box_image = moresrc;
					box_content = "种植： ";
					for(var i = 0;i<temp.length;i++){
						box_content+=temp[i].breed_name+" ";
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
				gotoMap(obj.parents._id,event);
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
			function nothing(){
			}
			
			//删除大棚
			function delete_tunnel(obj){
				_Q(".model3").removeClass("on");
				var b = confirm("确定要删除吗？");
				if(!b)
					return;
				if(obj==""){
					copyArray = new Array();
					var val = _Q("#group_index").val();
					for(var i = 0;i<mark3Array.length;i++){
						var temp = mark3Array[i];
						if(temp._index==val){
							temp.setMap(null);
							close_right_panel();
						}
					}
				}else{
					deleteTunnel(obj);
				}
			}
			
			//数组删除,地图不显示
			function delete_tunnel_next(str){
				var strs = str.split(":");
				if(strs[0]=="false"){
					alert(strs[1]);
				}else{
					var val = _Q("#group_index").val();
					var bx = false;
					for(var i = 0;i<mark3Array.length;i++){
						var temp = mark3Array[i];
						if(temp._id==strs[1]){
							temp.setMap(null);
							g_infowindow.setMap(null);
							if(temp._usgs)
								temp._usgs.setMap(null);
							if(temp._wenzi)
								temp._wenzi.setMap(null);
							mark3Array = mark3Array.del(i);
							close_right_panel();
						}
					}
					initList();
				}
			}
			
			//数组删除
			Array.prototype.del = function(n) {  
				if(n<0)
					return this;
				else
					return this.slice(0,n).concat(this.slice(n+1,this.length));
			} ;

			function formatFloat(src, pos)
			{
			    return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
			}

			//回车事件监听
			document.onkeydown=function(event){ 
	            e = event ? event :(window.event ? window.event : null); 
	            if(e.keyCode==13){ 
	                if(document.activeElement.id=="tc_top_input"){
	                	searchs();
	                }else if(document.activeElement.id=="ser_input"){
	                	_Q(".search02").trigger("click");
	                }
					e.keyCode=0;
					 if (window.navigator.userAgent.indexOf("MSIE")==-1)
		                {
						 e.preventDefault();
						 return false;
		                }
	            	e.returnValue=false;				
	            } 
	        };
			
			function deletePlantSelf(id,obj,tunnelId){
	        	_Q(obj).closest(".rteic").remove();
	        	deletePlant(id);
	        	deletePlant_next(id,tunnelId);
	        }
			
			function deletePlant_next(id,tunnelId){
				if(id==0)
					return;
				var inde = 0;
				for(var i = 0;i<allList.length;i++){
					var tempobj = allList[i];
					if(tempobj.tunnel_info_id==tunnelId){
						inde+=1;
					}
				}
				for(var i = 0;i<allList.length;i++){
					var tempobj = allList[i];
					if(tempobj.real_plant_id==id){
						obj = tempobj;
						if(inde>1){
							allList = allList.del(i);
						}else{
							tempobj.real_plant_id = 0;
							tempobj.breed_id = 0;
							tempobj.breed_name = "";
							tempobj.crop_area = 0;
							tempobj.endtime = "";
							tempobj.imground = "";
							tempobj.imgsquare = "";
							tempobj.model_id = 0;
							tempobj.plant_id = 0;
							tempobj.plant_standard = 0;
							tempobj.plant_stauts = 0;
							tempobj.real_plant_id = 0;
							tempobj.starttime = "";
							allList[i] = tempobj
						}
						initList();
						break;
					}
				}
				var array = selectedShape.getPath().getArray();
				var bounds = new google.maps.LatLngBounds();
				for (i = 0; i < array.length; i++) {
					bounds.extend(array[i]);
				}
				var tempArray = map5.get(selectedShape._id);
				var uss = selectedShape._usgs;
				var lat = bounds.getCenter().lat();
				var lng = bounds.getCenter().lng();
				var left = new google.maps.LatLng(lat+0.0000424,lng+0.000055);
				var right = new google.maps.LatLng(lat-0.000045,lng-0.000060);
				var bounds2 = new google.maps.LatLngBounds(right,left);
				var tempArray = map5.get(selectedShape._id);
				var isrc = "";
				if(tempArray==null||tempArray.length==0){
					isrc = nonesrc;
				}else if(tempArray.length==1){
					isrc = tempArray[0].imground;
					if(isrc=="")
						isrc = nonesrc;
					}else{
					isrc = moresrc;
				}
				if(uss)
					uss.setMap(null);
				var usgss = new USGSOverlay(bounds2,isrc,map,selectedShape);
				selectedShape._usgs = usgss;
				
			}
			
			/**
		    a        array    要操作的数组
		    index    int        要插入的位置
		    num        obj        要插入的值
		*/
		function insert(a , index , num){
		    var temp = a.splice(index);
		    return a.concat(num,temp);
		}
			
	//土地使用记录编辑 修改数组 弹出框重新赋值
	function soil_ok(data){
		eval("var tt = "+data);
		if(_Q("#soil_id").val()==""){
			soilStr.push(tt);
		}else{
			for(var i = 0;i<soilStr.length;i++){
				var tem = soilStr[i];
				if(tem.id == tt.id){
					soilStr[i] = tt;
				}
			}
		}
		var html = "";
		for(var i = 0;i<soilStr.length;i++){
			var tem = soilStr[i];
			if(tem.partitionId==tt.partitionId){
				var te = _Q("#soil_route_of").find("option[value="+tem.route_of+"]").html();
				if(te==null)
					te="";
				html+="<tr class='soill"+tem.id+"'><td class='bc_th01'>"+tem.begin_time+"年"+tem.end_time+"年</td><td  class='bc_th01' >"+te+"</td><td  class='bc_th01'><a href='#' onclick='editsoil("+tem.id+")'>修改</a>  <a href='#' onclick='delsoil("+tem.id+")'>删除</a></td></tr>";
			}
		}
		if(html!=""){
			html = "<tr><td class='bc_th01'>时间</td><td class='bc_th01'>用途</td><td class='bc_th01' style='width:20%'>操作</td></tr>"+html;
			_Q(".soil_table").empty().append(html);
		}
		_Q(".rightNo9").hide();
		_Q(".rightNo3").show();
	}
	
	//准备添加土地使用记录 清空表单
	function addsoil(){
		_Q("#soil_id").val("");
		_Q("#soil_partitionId").val(_Q("#partition_id").val());
		_Q("#soil_partitionName").val(_Q("#partition_name").val());
		
		_Q("#soil_type1")[0].selectedIndex = 0;
		_Q("#soil_type1").selectpicker('refresh');
		
		
		_Q("#soil_type2")[0].selectedIndex = 0;
		_Q("#soil_type2").selectpicker('refresh');
		
		_Q("#soil_begin").val(yea);
		_Q("#soil_begin").selectpicker('refresh');
		
		_Q("#soil_end").val(yea);
		_Q("#soil_end").selectpicker('refresh');
		
		_Q("#soil_ph").val("7");
		
		_Q("#soil_route_of")[0].selectedIndex = 0;
		_Q("#soil_route_of").selectpicker('refresh');
		
		_Q("#soil_pollution_status")[0].selectedIndex = 0;
		_Q("#soil_pollution_status").selectpicker('refresh');
		
		_Q("#soil_description").val("");
		_Q("#soil_pollution_level").val("");
		_Q("#soil_repair_status").val("");
		_Q(".rightNo9").show();
		_Q(".rightNo3").hide();
	}
	
	//取消土地使用记录的编辑
	function soil_no(){
		_Q(".rightNo9").hide();
		_Q(".rightNo3").show();
	}
	
	//删除土地记录
	function delsoil_next(data){
		eval("var t_t = "+data);
		_Q(".soill"+t_t.id).hide();
		for(var i = 0;i<soilStr.length;i++){
			var tem = soilStr[i];
			if(tem.id == t_t.id){
				soilStr = soilStr.del(i);
				break;
			}
		}
	}
	
	//编辑土地使用记录 表单赋值
	function editsoil(id){
		for(var i = 0;i<soilStr.length;i++){
			var tem = soilStr[i];
			if(tem.id==id){
				_Q("#soil_id").val(tem.id);
				_Q("#soil_partitionId").val(tem.partitionId);
				_Q("#soil_partitionName").val(_Q("#partition_name").val());
				_Q("#soil_type1").val(tem.soil_data_dic_id);
				_Q("#soil_type1").selectpicker('refresh');
				
				_Q("#soil_type2").val(tem.soils_data_dic_id);
				_Q("#soil_type2").selectpicker('refresh');
				
				_Q("#soil_begin").val(tem.begin_time);
				_Q("#soil_begin").selectpicker('refresh');
				
				_Q("#soil_end").val(tem.end_time);
				_Q("#soil_end").selectpicker('refresh');
				
				_Q("#soil_ph").val(tem.ph);
				
				_Q("#soil_route_of").val(tem.route_of);
				_Q("#soil_route_of").selectpicker('refresh');
				
				_Q("#soil_pollution_status").val(tem.pollution_status);
				_Q("#soil_pollution_status").selectpicker('refresh');
				
				_Q("#soil_description").val(tem.description);
				_Q("#soil_pollution_level").val(tem.pollution_level);
				_Q("#soil_repair_status").val(tem.repair_status);
				_Q(".rightNo9").show();
				_Q(".rightNo3").hide();
			}
		}
	}
	
	//地图上放入 设备的图片
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
        div.style.visibility = "visible";
		div.draggable=true;
        this.div = div;
        var tempThis = this;
        this.addPolygon(this.latlng_);
        //this.getPanes().overlayLayer.appendChild(div);
		this.getPanes().floatShadow.appendChild(div);
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
//        var width = _Q(this.div).find("img").width();
//    	var height = _Q(this.div).find("img").height();
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
		/*if (this.arr.device_ == 1) {
		}else if (this.arr.device_ == 2) {
		}else if (this.arr.device_ == 3) {
		}else if (this.arr.device_ == 4) {
			//sw.x -= width/2;
			//sw.y -= height/2;
		}*/
		  this.quadrilateral.shape.style.left = sw.x + "px";
		this.quadrilateral.shape.style.top = ne.y + "px";
		this.quadrilateral.shape.style.width = (ne.x - sw.x) + 'px';
		this.quadrilateral.shape.style.height = (sw.y - ne.y) + 'px';
    }
    CustomOverlay.prototype.onRemove = function()
    {
        //Not Implemented Here
    }
    
    CustomOverlay.prototype.setLatLng = function(latLng)
    {
    	this.quadrilateral.latLng=latLng;
           
    }
    
    CustomOverlay.prototype.addPolygon = function(latLng)
    {
        var shape = document.createElement("div");
        shape.className = "customPolygon";
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
		move(tempThis,shape);
		dbcl(tempThis,shape);
		//rightClic(tempThis,shape);
		_Q(shape).bind("contextmenu",function(event){
    		if(tempThis.arr.device_ < 3){
    			_Q("#device_id").val(tempThis.arr.device_id)
    			_Q("#device_index").val(tempThis.arr._index)
    		}else if(tempThis.arr.device_ == 3){
    			_Q("#video_id").val(tempThis.arr.video_id)
    			_Q("#video_index").val(tempThis.arr._index)
    		}else if(tempThis.arr.device_ == 4){
    			_Q("#krpano_id").val(tempThis.arr.krpano_id)
    			_Q("#krpano_index").val(tempThis.arr._index)
    		}
    		thirdcopy(event,0,tempThis,tempThis.arr.device_+3);
    		if(event.stopPropagation){
            	event.stopPropagation();
            }
			event.returnValue = false;
			if (event.preventDefault) event.preventDefault();
			return false;
		});
        this.quadrilateral = {
            shape:shape,
            latLng:latLng
        };
    };
    
    CustomOverlay.prototype.polygonMoved = function(newLatLng)
    {
        var lat = newLatLng.lat();
        var lng = newLatLng.lng();

		var tunnel = checkPointTunnel(newLatLng);
		if(tunnel==null&&this.arr.device_==1){
			alert("传感器需要放在区域内!");
			this.draw();
			return;
		}else if(tunnel!=null&&tunnel.device_&&this.arr.device_==1){
			if(tunnel.device_.arr._index!=this.arr._index){
				alert("此区域已经存在传感器!");
				this.draw();
				return ;
			}
		}
		this.quadrilateral.oldlatLng = this.quadrilateral.latLng;
        this.quadrilateral.latLng = newLatLng;
        //右侧弹出框赋值
        if(this.arr.device_==1||this.arr.device_==2){
	        var base = checkPointBase(newLatLng);
			if(base!=null){
				_Q("#device_base_id").val(base._marker._id);
				_Q("#device_base_name").val(base._name);
				this.arr.device_base_id =base._marker._id;
				this.arr.device_base_name = base._name;
			}else{
				_Q("#device_base_id").val("");
				_Q("#device_base_name").val("");
				this.arr.device_base_id = "";
				this.arr.device_base_name = "";
			}
			var partition = checkPointPartition(newLatLng);
			if(partition!=null){
				_Q("#device_partition_id").val(partition._id);
				_Q("#device_partition_name").val(partition._name);
				this.arr.device_partition_id = partition._id;
				this.arr.device_partition_name = partition._name;
			}else{
				_Q("#device_partition_id").val("");
				_Q("#device_partition_name").val("");
				this.arr.device_partition_id = "";
				this.arr.device_partition_name = "";
			}
			
			if(tunnel!=null){
				_Q("#device_tunnel_id").val(tunnel._id);
				_Q("#device_tunnel_name").val(tunnel._name);
				this.arr.device_tunnel_id = tunnel._id;
				this.arr.device_tunnel_name = tunnel._name;
			}else{
				_Q("#device_tunnel_id").val("");
				_Q("#device_tunnel_name").val("");
				this.arr.device_tunnel_id = "";
				this.arr.device_tunnel_name = "";
			}
			this.arr.device_coordinateX = lat;
			this.arr.device_coordinateY = lng;
			_Q("#device_coordinateX").val(lat);
			_Q("#device_coordinateY").val(lng);
			var ty = this.arr.device_status;
			ty = parseInt(ty);
			_Q("#device_id").val(this.arr.device_id);
			_Q("#device_sn").val(this.arr.device_sn);
			_Q("#device_name").val(this.arr.device_name);
			_Q(".aps_radio:eq("+ty+")").trigger("click");
			_Q("#deviceForm\\:device_factoryTimeInputDate").val(this.arr.device_factory);
			_Q("#device_description").val(this.arr.device_description);
			_Q("#device_deviceType").val(this.arr.device_deviceType);
			if(this.arr.device_deviceType==1){
				_Q(".device_2").hide();
				_Q("#device_deviceType").val("1");
				_Q(".device_1").show();
				_Q(".device_typee").show();
				_Q(".device_typee2").hide();
				if(this.arr.device_type_id!=""){
					_Q("#device_type_id").val(this.arr.device_type_id);
					_Q("#device_type_id").selectpicker('refresh');
				}
			}else if(this.arr.device_deviceType==2){
				_Q(".device_2").show();
				_Q("#device_deviceType").val("2");
				_Q(".device_1").hide();
				_Q(".device_typee").hide();
				_Q(".device_typee2").show();
				if(this.arr.device_type_id!=""){
					_Q("#device_type_id2").val(this.arr.device_type_id);
					_Q("#device_type_id2").selectpicker('refresh');
				}
			}
			_Q("#device_index").val(this.arr._index);
			_Q(".tc_rw_rw2").scrollTop(0);
			_Q("#divtittle").text("编辑设备");
			_Q(".tc_top_03").show();
			_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
			_Q(".rightNo").hide();
			_Q(".rightNo10").show();
			open_right_panel();
        }else if(this.arr.device_==3){
        	var base = checkPointBase(newLatLng);
        	var arr = this.arr;
        	if(base!=null){
    			arr.video_base_id =base._marker._id;
    			arr.video_base_name = base._name;
    		}else{
    			arr.video_base_id ="";
    			arr.video_base_name = "";
    		}
    		var partition = checkPointPartition(newLatLng);//锚点所属分区
    		if(partition!=null){
    			arr.video_partition_id = partition._id;
    			arr.video_partition_name = partition._name;
    		}else{
    			arr.video_partition_id = "";
    			arr.video_partition_name = "";
    		}
    		var tunnel = checkPointTunnel(newLatLng);//锚点所属大棚
    		if(tunnel!=null){
    			arr.video_tunnel_id = tunnel._id;
    			arr.video_tunnel_name = tunnel._name;
    		}else{
    			arr.video_tunnel_id = "";
    			arr.video_tunnel_name = "";
    		}
    		if(this.arr.video_id == "")
				_Q(".video_btn_delete").hide();
			else
				_Q(".video_btn_delete").show();
    		_Q("#device_index").val(arr._index);
    		_Q("#video_iframe").attr("src",workpath+"/map/MapVideo.seam?video_coordinateX="+newLatLng.lat()+"&video_coordinateY="+newLatLng.lng()+"&video_base_id="+arr.video_base_id
    				+"&video_base_name="+arr.video_base_name+"&video_partition_id="+arr.video_partition_id+"&video_partition_name="+arr.video_partition_name+
    				"&video_tunnel_id="+arr.video_tunnel_id+"&video_tunnel_name="+arr.video_tunnel_name+"&video_id="+arr.video_id);
			_Q("#divtittle").text("编辑视频设备");
			_Q(".tc_top_03").show();
			_Q(".rightNo").hide();
			_Q(".rightNo11").show();
			_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
			open_right_panel();
        }else if(this.arr.device_==4){
        	var base = checkPointBase(newLatLng);
			if(base!=null){
				_Q("#krpano_base_id").val(base._marker._id);
				_Q("#krpano_base_name").val(base._name);
				this.arr.krpano_base_id =base._marker._id;
				this.arr.krpano_base_name = base._name;
			}else{
				_Q("#krpano_base_id").val("");
				_Q("#krpano_base_name").val("");
				this.arr.krpano_base_id = "";
				this.arr.krpano_base_name = "";
			}
			var partition = checkPointPartition(newLatLng);
			if(partition!=null){
				_Q("#krpano_partition_id").val(partition._id);
				_Q("#krpano_partition_name").val(partition._name);
				this.arr.krpano_partition_id = partition._id;
				this.arr.krpano_partition_name = partition._name;
			}else{
				_Q("#krpano_partition_id").val("");
				_Q("#krpano_partition_name").val("");
				this.arr.krpano_partition_id = "";
				this.arr.krpano_partition_name = "";
			}
			var tunnel = checkPointTunnel(newLatLng);
			if(tunnel!=null){
				_Q("#krpano_tunnel_id").val(tunnel._id);
				_Q("#krpano_tunnel_name").val(tunnel._name);
				this.arr.krpano_tunnel_id = tunnel._id;
				this.arr.krpano_tunnel_name = tunnel._name;
			}else{
				_Q("#krpano_tunnel_id").val("");
				_Q("#krpano_tunnel_name").val("");
				this.arr.krpano_tunnel_id = "";
				this.arr.krpano_tunnel_name = "";
			}
			this.arr.krpano_coordinateX = lat;
			this.arr.krpano_coordinateY = lng;
			add_krpano(this.arr);
			if(_Q(".rightNo13").is(":hidden")||_Q("#rightPane").width()<10){
				resetSessionKrpano(this.arr.krpano_id);
				_Q(".tc_rw_rw2").scrollTop(0);
				_Q("#krpano_coordinateX").val(lat);
				_Q("#krpano_coordinateY").val(lng);
				_Q("#divtittle").text("编辑四季田景");
				_Q(".tc_top_03").show();
				_Q(".rightNo").hide();
				_Q(".rightNo13").show();
				_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
				open_right_panel();
			}
        }
    };

    function rightClic(tempThis,shape){
    	_Q(shape).rightClick(function(event){
            if ( event && event.preventDefault )
            	event.preventDefault();
            else
            	   window.event.returnValue = false;

            return false; 
//    		if(tempThis.arr.device_ < 3){
//    			_Q("#device_index").val(tempThis.arr._index)
//    		}else if(tempThis.arr.device_ == 3){
//    			_Q("#krpano_index").val(tempThis.arr._index)
//    		}else if(tempThis.arr.device_ == 4){
//    			_Q("#video_index").val(tempThis.arr._index)
//    		}
//    		thirdcopy(event,0,tempThis,tempThis.arr.device_+3);
//    		
    	})
    }
    
    //设备可以移动
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
            	krpanoObj = tempThis;
            	var width = _Q(tempThis.div).find("img").width();
            	var height = _Q(tempThis.div).find("img").height();
            	var left = ui.position.left;
            	var top = ui.position.top;
            	if(tempThis.arr.device_==1){
            		left += width/2;
            		top += height/2;
            	}else if(tempThis.arr.device_==2){
            		left += width/2;
            		top += height/2;
            	}else if(tempThis.arr.device_==3){
            		left += width/2;
            		top += height/2;
            	}else if(tempThis.arr.device_==4){
            		left += width/2;
            		top += height;
            	}
            	var point = new google.maps.Point(left,top);
                tempThis.polygonMoved(tempThis.getProjection().fromDivPixelToLatLng(point));
                tempThis.map.set('draggable',true);
            }
        });
}
	//设备双击弹出编辑框,并表单赋值
function dbcl(tempThis,shape){
	_Q(shape).dblclick(function(){
		krpanoObj = tempThis;
        if(tempThis.arr.device_==1||tempThis.arr.device_==2){
        	var newLatLng = new google.maps.LatLng(tempThis.arr.device_coordinateX,tempThis.arr.device_coordinateY);
            tempThis.quadrilateral.latLng = newLatLng;	
        var base = checkPointBase(newLatLng);
		if(base!=null){
			_Q("#device_base_id").val(base._marker._id);
			_Q("#device_base_name").val(base._name);
			tempThis.arr.device_base_id =base._marker._id;
			tempThis.arr.device_base_name = base._name;
		}else{
			_Q("#device_base_id").val("");
			_Q("#device_base_name").val("");
			tempThis.arr.device_base_id = "";
			tempThis.arr.device_base_name = "";
		}
		var partition = checkPointPartition(newLatLng);
		if(partition!=null){
			_Q("#device_partition_id").val(partition._id);
			_Q("#device_partition_name").val(partition._name);
			tempThis.arr.device_partition_id = partition._id;
			tempThis.arr.device_partition_name = partition._name;
		}else{
			_Q("#device_partition_id").val("");
			_Q("#device_partition_name").val("");
			tempThis.arr.device_partition_id = "";
			tempThis.arr.device_partition_name = "";
		}
		var tunnel = checkPointTunnel(newLatLng);
		if(tunnel!=null){
			_Q("#device_tunnel_id").val(tunnel._id);
			_Q("#device_tunnel_name").val(tunnel._name);
			tempThis.arr.device_tunnel_id = tunnel._id;
			tempThis.arr.device_tunnel_name = tunnel._name;
		}else{
			_Q("#device_tunnel_id").val("");
			_Q("#device_tunnel_name").val("");
			tempThis.arr.device_tunnel_id = "";
			tempThis.arr.device_tunnel_name = "";
		}
		_Q("#device_coordinateX").val(tempThis.arr.device_coordinateX);
		_Q("#device_coordinateY").val(tempThis.arr.device_coordinateY);
		var ty = tempThis.arr.device_status;
		ty = parseInt(ty);
		_Q("#device_id").val(tempThis.arr.device_id);
		_Q("#device_sn").val(tempThis.arr.device_sn);
		_Q("#device_name").val(tempThis.arr.device_name);
		_Q(".aps_radio:eq("+ty+")").trigger("click");
		_Q("#deviceForm\\:device_factoryTimeInputDate").val(tempThis.arr.device_factory);
		_Q("#device_description").val(tempThis.arr.device_description);
		_Q("#device_deviceType").val(tempThis.arr.device_deviceType);
		if(tempThis.arr.device_deviceType==1){
			_Q(".device_2").hide();
			_Q("#device_deviceType").val("1");
			_Q(".device_1").show();
			_Q(".device_typee").show();
			_Q(".device_typee2").hide();
			if(tempThis.arr.device_type_id!=""){
				_Q("#device_type_id").val(tempThis.arr.device_type_id);
				_Q("#device_type_id").selectpicker('refresh');
			}
		}else if(tempThis.arr.device_deviceType==2){
			_Q(".device_2").show();
			_Q("#device_deviceType").val("2");
			_Q(".device_1").hide();
			_Q(".device_typee").hide();
			_Q(".device_typee2").show();
			if(tempThis.arr.device_type_id!=""){
				_Q("#device_type_id2").val(tempThis.arr.device_type_id);
				_Q("#device_type_id2").selectpicker('refresh');
			}
		}
		_Q(".tc_rw_rw2").scrollTop(0);
		_Q("#device_index").val(tempThis.arr._index);
		_Q("#divtittle").text("编辑设备");
		_Q(".tc_top_03").show();
		_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
		_Q(".rightNo").hide();
		_Q(".rightNo10").show();
		open_right_panel();
		
	}else if(tempThis.arr.device_==3){
		var newLatLng = new google.maps.LatLng(tempThis.arr.video_coordinateX,tempThis.arr.video_coordinateY);
        tempThis.quadrilateral.latLng = newLatLng;
    	var base = checkPointBase(newLatLng);
    	var arr = tempThis.arr;
    	if(base!=null){
			arr.video_base_id =base._marker._id;
			arr.video_base_name = base._name;
		}else{
			arr.video_base_id ="";
			arr.video_base_name = "";
		}
		var partition = checkPointPartition(newLatLng);//锚点所属分区
		if(partition!=null){
			arr.video_partition_id = partition._id;
			arr.video_partition_name = partition._name;
		}else{
			arr.video_partition_id = "";
			arr.video_partition_name = "";
		}
		var tunnel = checkPointTunnel(newLatLng);//锚点所属大棚
		if(tunnel!=null){
			arr.video_tunnel_id = tunnel._id;
			arr.video_tunnel_name = tunnel._name;
		}else{
			arr.video_tunnel_id = "";
			arr.video_tunnel_name = "";
		}
		if(tempThis.arr.video_id == "")
			_Q(".video_btn_delete").hide();
		else
			_Q(".video_btn_delete").show();
		_Q("#video_index").val(arr._index);
		_Q("#video_iframe").attr("src",workpath+"/map/MapVideo.seam?video_coordinateX="+newLatLng.lat()+"&video_coordinateY="+newLatLng.lng()+"&video_base_id="+arr.video_base_id
				+"&video_base_name="+arr.video_base_name+"&video_partition_id="+arr.video_partition_id+"&video_partition_name="+arr.video_partition_name+
				"&video_tunnel_id="+arr.video_tunnel_id+"&video_tunnel_name="+arr.video_tunnel_name+"&video_id="+arr.video_id);
		_Q("#divtittle").text("编辑视频设备");
		_Q(".tc_top_03").show();
		_Q(".rightNo").hide();
		_Q(".rightNo11").show();
		_Q(".tc_rw_rw2").scrollTop(0);
		_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
		open_right_panel();
    }else if(tempThis.arr.device_==4){
		var newLatLng = new google.maps.LatLng(tempThis.arr.krpano_coordinateX,tempThis.arr.krpano_coordinateY);
        tempThis.quadrilateral.latLng = newLatLng;
    	var base = checkPointBase(newLatLng);
		if(base!=null){
			_Q("#krpano_base_id").val(base._marker._id);
			_Q("#krpano_base_name").val(base._name);
			tempThis.arr.krpano_base_id =base._marker._id;
			tempThis.arr.krpano_base_name = base._name;
		}else{
			_Q("#krpano_base_id").val("");
			_Q("#krpano_base_name").val("");
			tempThis.arr.krpano_base_id = "";
			tempThis.arr.krpano_base_name = "";
		}
		var partition = checkPointPartition(newLatLng);
		if(partition!=null){
			_Q("#krpano_partition_id").val(partition._id);
			_Q("#krpano_partition_name").val(partition._name);
			tempThis.arr.krpano_partition_id = partition._id;
			tempThis.arr.krpano_partition_name = partition._name;
		}else{
			_Q("#krpano_partition_id").val("");
			_Q("#krpano_partition_name").val("");
			tempThis.arr.krpano_partition_id = "";
			tempThis.arr.krpano_partition_name = "";
		}
		var tunnel = checkPointTunnel(newLatLng);
		if(tunnel!=null){
			_Q("#krpano_tunnel_id").val(tunnel._id);
			_Q("#krpano_tunnel_name").val(tunnel._name);
			tempThis.arr.krpano_tunnel_id = tunnel._id;
			tempThis.arr.krpano_tunnel_name = tunnel._name;
		}else{
			_Q("#krpano_tunnel_id").val("");
			_Q("#krpano_tunnel_name").val("");
			tempThis.arr.krpano_tunnel_id = "";
			tempThis.arr.krpano_tunnel_name = "";
		}
		//if(_Q("#krpano_index").val()==""||_Q("#krpano_index").val()!=tempThis.arr._index)
			resetSessionKrpano(tempThis.arr.krpano_id);
		add_krpano(tempThis.arr);
		_Q("#krpanoTotal").html(krpanoNum);
		if(_Q(".rightNo13").is(":hidden")||_Q("#rightPane").width()<10){
			
			_Q("#divtittle").text("编辑四季田景");
			_Q(".tc_top_03").show();
			_Q(".rightNo").hide();
			_Q(".rightNo13").show();
			_Q(".tc_rw_rw2").scrollTop(0);
			_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
			open_right_panel();
		}
    }
	});
}

//添加设备,表单内容清空
function addDevice(type){
	_Q(".rightNo").hide();
	_Q(".rightNo10").show();
	_Q("#device_id").val("");
	_Q("#device_base_id").val("");
	_Q("#device_base_name").val("");
	_Q("#device_partition_id").val("");
	_Q("#device_partition_name").val("");
	_Q("#device_sn").val("");
	_Q("#device_name").val("");
	_Q(".aps_radio:eq(0)").trigger("click");
	_Q("#deviceForm\\:device_factoryTimeInputDate").val("");
	_Q("#device_description").val("");
	_Q("#device_tunnel_id").val("");
	_Q("#device_tunnel_name").val("");
	if(type==1){
		_Q(".device_2").hide();
		_Q("#device_deviceType").val("1");
		_Q(".device_1").show();
		_Q(".device_typee").show();
		_Q(".device_typee2").hide();
	}else if(type==2){
		_Q(".device_2").show();
		_Q("#device_deviceType").val("2");
		_Q(".device_1").hide();
		_Q(".device_typee").hide();
		_Q(".device_typee2").show();
	}
}

//检测坐标是否在基地内
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
//检测坐标是否在分区内
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
//检测坐标是否在大棚内
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

//设备编辑完成 后台反馈
function device_ok(data){
	if(data == "no"){
		showCheckTips("抱歉，您可添加硬件数量已达到上限，如想继续创建，请联系我们！");
		return;
	}
	eval("var tempp = "+data);
	if(tempp.OK==false){
		if(tempp.Status==1){
			alert("设备编号重复");
			return;
		}
	}else{
		if(tempp.soru=="save"){
			deviceStr.push(tempp);
		}else{
			for(var i = 0;i<deviceStr.length;i++){
				if(deviceStr[i].id==tempp.id){
					deviceStr[i] = tempp;
				}
			}
		}
	}
	//数组重新赋值
	for(var i = 0;i<deviceArray.length;i++){
		var m = deviceArray[i];
		if(m.getMap()!=null&&m.arr._index==_Q("#device_index").val()){
			if(m.arr.device_==1&&m.quadrilateral.oldlatLng){
				var tunnel = checkPointTunnel(m.quadrilateral.oldlatLng);
				tunnel.device_ = undefined;
			}
			m.arr.device_base_id = _Q("#device_base_id").val();
			m.arr.device_base_name = _Q("#device_base_name").val();
			m.arr.device_partition_id = _Q("#device_partition_id").val();
			m.arr.device_partition_name = _Q("#device_partition_name").val();
			m.arr.device_tunnel_id = _Q("#device_tunnel_id").val();
			m.arr.device_tunnel_name = _Q("#device_tunnel_name").val();
			m.arr.device_id = tempp.id;
			m.arr.device_sn = tempp.sn;
			m.arr.device_name = tempp.name;
			m.arr.device_description = tempp.description;
			m.arr.device_factory = tempp.factoryTime;
			m.arr.device_deviceType = tempp.deviceType;
			m.arr.device_type_id = tempp.deviceTypeId;
			m.arr.device_coordinateX = tempp.coordinateX;
			m.arr.device_coordinateY = tempp.coordinateY;
			m.arr.device_status = tempp.status;
			m.quadrilateral.oldlatLng = undefined;
			if(m.arr.device_==1){
				var newLatLng = new google.maps.LatLng(tempp.coordinateX,tempp.coordinateY);
				var tunnel = checkPointTunnel(newLatLng);
				tunnel.device_ = m;
			}
			_Q("#device_id").val(tempp.id);
		}
	}
	close_right_panel();
	
	_Q('.model4').each(function(){
		_Q(".model4").removeClass("on");
	})
}

//删除设备
function device_delete(){
	if(_Q("#device_id").val()==""){
		for(var i = 0;i<deviceArray.length;i++){
			var m = deviceArray[i];
			if(m.getMap()!=null&&m.arr._index==_Q("#device_index").val()){
				m.setMap(null);
				m.div.style.display="none";
				close_right_panel();
				return ;
			}
		}
	}else{
		device_delete_next(_Q("#device_id").val());
	}
}
//设备删除,后台反馈,删除数组内容
function device_delete_next_next(data){
	eval("var tempp = "+data);
	if(tempp.OK!=true){
		alert("删除失败");
	}else{
		for(var i = 0;i<deviceStr.length;i++){
			if(deviceStr[i].id==tempp.id){
				deviceStr = deviceStr.del(i);
			}
		}
		for(var i = 0;i<deviceArray.length;i++){
			var m = deviceArray[i];
			if(m.getMap()!=null&&m.arr._index==_Q("#device_index").val()){
				deviceArray = deviceArray.del(i);
				m.setMap(null);
				m.div.style.display="none";
				if(m.arr.device_==1){
					var newLatLng = new google.maps.LatLng(m.arr.device_coordinateX,m.arr.device_coordinateY);
					var tunnel = checkPointTunnel(newLatLng);
					tunnel.device_ = undefined;
				}
			}
		}
		close_right_panel();
	}
}

//取消设备编辑
function device_no(){
	var tm;
	for(var i = 0;i<deviceArray.length;i++){
		var m = deviceArray[i];
		if(m.getMap()!=null&&m.arr._index==_Q("#device_index").val()){
			tm = m;
			if(_Q("#device_id").val()==""){
				m.setMap(null);
				m.div.style.display="none";
				if(m.quadrilateral.oldlatLng){
					var tunnel = checkPointTunnel(m.quadrilateral.oldlatLng);
					tunnel.device_ = undefined;
				}
			}
		}
	}
	close_right_panel();
	//this.quadrilateral.oldlatLng = this.quadrilateral.latLng;
	if(tm.quadrilateral.oldlatLng){
		tm.quadrilateral.latLng = tm.quadrilateral.oldlatLng;
		tm.quadrilateral.oldlatLng = undefined;
		tm.draw();
	}
	
	_Q('.model4').each(function(){
		_Q(".model4").removeClass("on");
	})
}

//添加视频,清空表单
function add_video(arr){
	_Q("#video_id").val(arr.video_id);
	_Q("#video_sn").val(arr.video_sn);
	_Q("#video_name").val(arr.video_name);
	_Q("#video_index").val(arr._index);
	_Q("#video_description").val(arr.video_description);
	_Q("#video_coordinateX").val(arr.video_coordinateX);
	_Q("#video_coordinateY").val(arr.video_coordinateY);
	var t1 = arr.video_selected;
	_Q(".selected_radio:eq("+t1+")").trigger("click");
	var t2 = arr.video_status;
	_Q(".status_radio:eq("+t2+")").trigger("click");
	_Q("#video_factoryTimeInputDate").val(arr.video_factoryTime);
	_Q("#video_ip").val(arr.video_ip);
	_Q("#video_channel_no").val(arr.video_channel_no);
	_Q("#video_device_video_channel_no").val(arr.video_device_video_channel_no);
	_Q("#video_username").val(arr.video_username);
	_Q("#video_password").val(arr.video_password);
	_Q("#video_app_ip").val(arr.video_app_ip);
	_Q("#video_app_port").val(arr.video_app_port);
	_Q("#video_app_web_port").val(arr.video_app_web_port);
	_Q("#video_app_device_video_channel_no").val(arr.video_app_device_video_channel_no);
	_Q("#video_app_username").val(arr.video_app_username);
	_Q("#video_app_password").val(arr.video_app_password);
	_Q("#video_type_id").val(arr.video_type_id);
	_Q("#video_type_id").selectpicker('refresh');
    _Q("#video_access_way").val(arr.video_access_way);
	_Q("#video_access_way").selectpicker('refresh');
	_Q("#video_device_host").val(arr.video_device_host);
	_Q("#video_device_port").val(arr.video_device_port);
	_Q("#video_device_username").val(arr.video_device_username);
	_Q("#video_device_password").val(arr.video_device_password);
	_Q("#video_webcam_url").val(arr.video_webcam_url);
	
	_Q("#videocheckbox").prop('checked',false)
	if(_Q("#video_type_id").val()==304){
	    _Q(".ziyuanid").html("资源编码");
	}else{
	    _Q(".ziyuanid").html("视频通道号");
	}

	
	_Q("#video_device_host").val(arr.video_device_host);
	_Q("#video_device_port").val(arr.video_device_port);
	_Q("#video_device_username").val(arr.video_device_username);
	_Q("#video_device_password").val(arr.video_device_password);
	if(arr.video_restart == "true" || arr.video_restart == true)
		_Q("#video_restart").attr("checked","true");
	else 
		_Q("#video_restart").removeAttr("checked")
	_Q("#video_webcam_url").val(arr.video_webcam_url);
	_Q("#video_webcam_url").attr("title",arr.video_webcam_url);
	
	video_div_change(arr.video_access_way);
	
	_Q(".videohide1").hide();
	_Q(".videohide2").hide();
	_Q(".videohide"+arr.video_access_way).show();
}


//视频编辑完成
function video_ok(data){
	if(data == "no1"){
		showCheckTips("抱歉，您可添加硬件数量已达到上限，如想继续创建，请联系我们！");
		return;
	}
	//数组重新赋值
	for(var i = 0;i<videoArray.length;i++){
		var m = videoArray[i];
		if(m.getMap()!=null&&m.arr._index==_Q("#video_index").val()){
			m.quadrilateral.oldlatLng = undefined;
			m.arr.video_id = data;
		}
	}
	close_right_panel();
	
	_Q('.model4').each(function(){
		_Q(".model4").removeClass("on");
	})
}
//取消设备编辑
function video_no(){
	var tm;
	for(var i = 0;i<videoArray.length;i++){
		var m = videoArray[i];
		if(m.getMap()!=null&&m.arr._index==_Q("#video_index").val()){
			tm = m;
			if(m.arr.video_id==""){
				m.setMap(null);
				m.div.style.display="none";
			}
		}
	}
	close_right_panel();
	if(tm.quadrilateral.oldlatLng){
		tm.quadrilateral.latLng = tm.quadrilateral.oldlatLng;
		tm.quadrilateral.oldlatLng = undefined;
		tm.draw();
	}
	
	_Q('.model4').each(function(){
		_Q(".model4").removeClass("on");
	})
}

function iframeDeleteVideo(id){
	for(var i = 0;i<videoStr.length;i++){
		if(videoStr[i].videoId==id){
			videoStr = videoStr.del(i);
		}
	}
	for(var i = 0;i<videoArray.length;i++){
		var m = videoArray[i];
		if(m.getMap()!=null&&m.arr.video_id==id){
			videoArray = videoArray.del(i);
			m.setMap(null);
			m.div.style.display="none";
		}
	}
	close_right_panel();
}

//删除设备
function video_delete(){
	if(_Q("#video_id").val()==""){
		for(var i = 0;i<videoArray.length;i++){
			var m = videoArray[i];
			if(m.getMap()!=null&&m.arr._index==_Q("#video_index").val()){
				m.setMap(null);
				m.div.style.display="none";
				close_right_panel();
				return ;
			}
		}
	}else{
		video_delete_next(_Q("#video_id").val());
	}
}
//删除设备,后台反馈,数组删除
function video_delete_next_next(data){
	eval("var tempp = "+data);
	if(tempp.OK!=true){
		alert("删除失败");
	}else{
		for(var i = 0;i<videoStr.length;i++){
			if(videoStr[i].videoId==tempp.videoId){
				videoStr = videoStr.del(i);
			}
		}
		for(var i = 0;i<videoArray.length;i++){
			var m = videoArray[i];
			if(m.getMap()!=null&&m.arr._index==_Q("#video_index").val()){
				videoArray = videoArray.del(i);
				m.setMap(null);
				m.div.style.display="none";
			}
		}
		close_right_panel();
	}
}

//添加全景,清空表单
function add_krpano(arr){
	_Q("#krpano_id").val(arr.krpano_id);
	_Q("#krpano_sn").val(arr.krpano_sn);
	_Q("#krpano_name").val(arr.krpano_name);
	_Q("#krpano_index").val(arr._index);
	
	var fileX = arr.krpano_coordinateX
	if(fileX != ""){
		document.getElementById("krpano_coordinateX").value = fileX;
		fileX = parseFloat(fileX).toFixed(2);
		//°54'
		var fileXs = fileX.split(".");
		fileX = fileXs[0] + "°" + fileXs[1] + "'";
		document.getElementById("krpano_coordinateX_name").value = fileX;
	}else{
		document.getElementById("krpano_coordinateX").value = "";
		document.getElementById("krpano_coordinateX_name").value = "";
	}

	var fileY = arr.krpano_coordinateY;
	if(fileY != ""){
		document.getElementById("krpano_coordinateY").value = fileY;
		fileY = parseFloat(fileY).toFixed(2);
		//°54'
		var fileYs = fileY.split(".");
		fileY = fileYs[0] + "°" + fileYs[1] + "'";
		document.getElementById("krpano_coordinateY_name").value = fileY;
	}else{
		document.getElementById("krpano_coordinateY").value = "";
		document.getElementById("krpano_coordinateY_name").value = fileY;
	}

//	if(arr.krpano_id && arr.krpano_id != "")
//		_Q("#krpanoFile").hide();
}
//取消全景编辑
function krpano_no_next(){
	var tm;
	for(var i = 0;i<krpanoArray.length;i++){
		var m = krpanoArray[i];
		if(m.getMap()!=null&&m.arr._index==_Q("#krpano_index").val()){
			tm = m;
			if(_Q("#krpano_id").val()==""){
				m.setMap(null);
				m.div.style.display="none";
			}
		}
	}
	krpanoObj = null;
	closeKrpanoFrame();
	close_right_panel();
	if(tm.quadrilateral.oldlatLng){
		tm.quadrilateral.latLng = tm.quadrilateral.oldlatLng;
		tm.quadrilateral.oldlatLng = undefined;
		tm.draw();
	}
}

//视频编辑完成
function krpano_ok(data){
	if(data == "No=1"){
		alert("超过购买的张数上限!");
		return;
	}
	eval("var tempp = "+data);
	if(tempp.status==false){
		alert(tempp.info);
	}else{
		if(tempp.soru=="save"){
			krpanoNum -=1;
			krpanoStr.push(tempp);
		}else{
			for(var i = 0;i<krpanoStr.length;i++){
				if(krpanoStr[i].id==tempp.id){
					krpanoStr[i] = tempp;
				}
			}
		}
	}
	
	//数组重新赋值
	for(var i = 0;i<krpanoArray.length;i++){
		var m = krpanoArray[i];
		if(m.getMap()!=null&&m.arr._index==_Q("#krpano_index").val()){
			m.arr.krpano_base_id = _Q("#krpano_base_id").val();
			m.arr.krpano_base_name = _Q("#krpano_base_name").val();
			m.arr.krpano_partition_id = _Q("#krpano_partition_id").val();
			m.arr.krpano_partition_name = _Q("#krpano_partition_name").val();
			m.arr.krpano_tunnel_id = _Q("#krpano_tunnel_id").val();
			m.arr.krpano_tunnel_name = _Q("#krpano_tunnel_name").val();
			m.arr.krpano_id = tempp.id;
			m.arr.krpano_sn = tempp.sn;
			m.arr.krpano_name = tempp.name;
			m.arr.krpano_coordinateX = tempp.coordinateX;
			m.arr.krpano_coordinateY = tempp.coordinateY;
			m.arr.krpano_front_url = tempp.frontUrl;
			m.arr.krpano_back_url = tempp.backUrl;
			m.arr.krpano_left_url = tempp.leftUrl;
			m.arr.krpano_right_url = tempp.rightUrl;
			m.arr.krpano_up_url = tempp.upUrl;
			m.arr.krpano_down_url = tempp.downUrl;
			m.arr.krpano_file_fold = tempp.fileFold;
			m.arr.krpano_fold_name = tempp.foldName;
			m.quadrilateral.oldlatLng = undefined;
			_Q("#krpano_id").val(tempp.id);

			if(m._wenzi){
				m._wenzi.setMap(null);
			}				
			var point = new google.maps.LatLng(tempp.coordinateX, tempp.coordinateY);
			var wen = new Wenzi(point, tempp.name, map, 4);
			m._wenzi = wen;
		}
	}
	
	krpanoObj = null;
	closeKrpanoFrame();
	close_right_panel();
}

//删除全景
function krpano_delete(){
	if(_Q("#krpano_id").val()==""){
		for(var i = 0;i<krpanoArray.length;i++){
			var m = krpanoArray[i];
			if(m.getMap()!=null&&m.arr._index==_Q("#krpano_index").val()){
				krpanoObj = null;
				m.setMap(null);
				m.div.style.display="none";
				closeKrpanoFrame();
				close_right_panel();
				
				if(m._wenzi){
					m._wenzi.setMap(null);
				}
				return ;
			}
		}
	}else{
		krpano_delete_next(_Q("#krpano_id").val());
	}
}

//全景删除,后台反馈,删除数组内容
function krpano_delete_next_next(data){
	eval("var tempp = "+data);
	if(tempp.status!=true){
		alert("删除失败");
	}else{
		for(var i = 0;i<krpanoStr.length;i++){
			if(krpanoStr[i].id==tempp.id){
				krpanoStr = krpanoStr.del(i);
			}
		}
		krpanoObj = null;
		for(var i = 0;i<krpanoArray.length;i++){
			var m = krpanoArray[i];
			if(m.getMap()!=null&&m.arr._index==_Q("#krpano_index").val()){
				krpanoNum +=1;
				krpanoArray = krpanoArray.del(i);
				m.setMap(null);
				if(m._wenzi){
					m._wenzi.setMap(null);
				}
				m.div.style.display="none";
				if(m.arr.device_==1){
					var newLatLng = new google.maps.LatLng(m.arr.device_coordinateX,m.arr.device_coordinateY);
					var tunnel = checkPointTunnel(newLatLng);
					tunnel.device_ = undefined;
				}
			}
		}
		closeKrpanoFrame();
		close_right_panel();
	}
}

//土地检测记录 编辑完成
function land_ok(data){
	eval("var tt = "+data);
	if(_Q("#land_id").val()==""){
		landStr.push(tt);
	}else{
		for(var i = 0;i<landStr.length;i++){
			var tem = landStr[i];
			if(tem.id == tt.id){
				landStr[i] = tt;
			}
		}
	}
	var html = "";
	for(var i = 0;i<landStr.length;i++){
		var tem = landStr[i];
		if(tem.partitionId==tt.partitionId){
			html+="<tr class='land"+tem.id+"'><td class='bc_th01'>"+tem.testDate+"</td><td  class='bc_th01' >"+tem.testOrg+"</td><td  class='bc_th01' >"+tem.phVal+"</td><td  class='bc_th01'><a href='#' onclick='editland("+tem.id+")'>修改</a>  <a href='#' onclick='delland("+tem.id+")'>删除</a></td></tr>";
		}
	}
	if(html!=""){
		html = "<tr><td class='bc_th01'>测试日期</td><td class='bc_th01'>测试机构</td><td class='bc_th01'>酸碱度</td><td class='bc_th01' style='width:20%'>操作</td></tr>"+html;
		_Q(".land_table").empty().append(html);
	}
	_Q(".rightNo12").hide();
	_Q(".rightNo3").show();
}

//添加土地检测记录,表单清空
function addland(){
	_Q("#land_id").val("");
	_Q("#land_partitionId").val(_Q("#partition_id").val());
	_Q("#land_partitionName").val(_Q("#partition_name").val());
	_Q("#landForm\\:land_testDateInputDate").val("");
	_Q("#land_testOrg").val("");
	_Q("#land_phVal").val("");
	_Q("#land_ecVal").val("");
	_Q("#land_soilBulkDensity").val("");
	_Q("#land_soilComposition").val("");
	_Q("#land_soilWater").val("");
	_Q("#land_nitrogen").val("");
	_Q("#land_phosphorus").val("");
	_Q("#land_potassium").val("");
	_Q("#land_organicVal").val("");
	_Q("#land_cec").val("");
	_Q("#land_redoxPotential").val("");
	_Q("#land_availableNitrogen").val("");
	_Q("#land_availablePhosphorus").val("");
	_Q("#land_availableK").val("");
	_Q("#land_exchangeCa").val("");
	_Q("#land_exchangeMg").val("");
	_Q("#land_totalCa").val("");
	_Q("#land_totalMg").val("");
	_Q("#land_totalSodium").val("");
	_Q("#land_countMercury").val("");
	_Q("#land_countArsenic").val("");
	_Q("#land_countChrome").val("");
	_Q("#land_countLead").val("");
	_Q("#land_countNickel").val("");
	_Q("#land_countCadmium").val("");
	_Q("#land_effectiveBoron").val("");
	_Q("#land_wffectiveMolybdenum").val("");
	_Q("#land_wffectiveZn").val("");
	_Q("#land_effectiveManganese").val("");
	_Q("#land_effectiveIron").val("");
	_Q("#land_effectiveCopper").val("");
	_Q("#land_countSe").val("");
	_Q("#land_effectiveSulfur").val("");
	_Q("#land_effectiveSilicon").val("");
	_Q("#land_chlorideIonContent").val("");
	_Q("#land_herbicideResidues").val("");
	_Q("#land_sulfateIonContent").val("");
	_Q("#land_exchangeTotalBase").val("");
	
	_Q(".rightNo12").show();
	_Q(".rightNo3").hide();
}

//取消编辑土地检测记录
function land_no(){
	_Q(".rightNo12").hide();
	_Q(".rightNo3").show();
}

//删除土地检测记录,后台反馈,修改数组
function delland_next(data){
	eval("var t_t = "+data);
	_Q(".land"+t_t.id).hide();
	for(var i = 0;i<landStr.length;i++){
		var tem = landStr[i];
		if(tem.id == t_t.id){
			landStr = landStr.del(i);
			break;
		}
	}
}

//编辑土地检测记录 表单赋值
function editland(id){
	for(var i = 0;i<landStr.length;i++){
		var tem = landStr[i];
		if(tem.id==id){
			_Q("#land_id").val(tem.id);
			_Q("#land_partitionId").val(tem.partitionId);
			_Q("#land_partitionName").val(_Q("#partition_name").val());
			_Q("#landForm\\:land_testDateInputDate").val(tem.testDate);
			_Q("#land_testOrg").val(tem.testOrg);
			_Q("#land_phVal").val(tem.phVal);
			_Q("#land_ecVal").val(tem.ecVal);
			_Q("#land_soilBulkDensity").val(tem.soilBulkDensity);
			_Q("#land_soilComposition").val(tem.soilComposition);
			_Q("#land_soilWater").val(tem.soilWater);
			_Q("#land_nitrogen").val(tem.nitrogen);
			_Q("#land_phosphorus").val(tem.phosphorus);
			_Q("#land_potassium").val(tem.potassium);
			_Q("#land_organicVal").val(tem.organicVal);
			_Q("#land_cec").val(tem.cec);
			_Q("#land_redoxPotential").val(tem.redoxPotential);
			_Q("#land_availableNitrogen").val(tem.availableNitrogen);
			_Q("#land_availablePhosphorus").val(tem.availablePhosphorus);
			_Q("#land_availableK").val(tem.availableK);
			_Q("#land_exchangeCa").val(tem.exchangeCa);
			_Q("#land_exchangeMg").val(tem.exchangeMg);
			_Q("#land_totalCa").val(tem.totalCa);
			_Q("#land_totalMg").val(tem.totalMg);
			_Q("#land_totalSodium").val(tem.totalSodium);
			_Q("#land_countMercury").val(tem.countMercury);
			_Q("#land_countArsenic").val(tem.countArsenic);
			_Q("#land_countChrome").val(tem.countChrome);
			_Q("#land_countLead").val(tem.countLead);
			_Q("#land_countNickel").val(tem.countNickel);
			_Q("#land_countCadmium").val(tem.countCadmium);
			_Q("#land_effectiveBoron").val(tem.effectiveBoron);
			_Q("#land_wffectiveMolybdenum").val(tem.wffectiveMolybdenum);
			_Q("#land_wffectiveZn").val(tem.wffectiveZn);
			_Q("#land_effectiveManganese").val(tem.effectiveManganese);
			_Q("#land_effectiveIron").val(tem.effectiveIron);
			_Q("#land_effectiveCopper").val(tem.effectiveCopper);
			_Q("#land_countSe").val(tem.countSe);
			_Q("#land_effectiveSulfur").val(tem.effectiveSulfur);
			_Q("#land_effectiveSilicon").val(tem.effectiveSilicon);
			_Q("#land_chlorideIonContent").val(tem.chlorideIonContent);
			_Q("#land_herbicideResidues").val(tem.herbicideResidues);
			_Q("#land_sulfateIonContent").val(tem.sulfateIonContent);
			_Q("#land_exchangeTotalBase").val(tem.exchangeTotalBase);
			_Q(".rightNo12").show();
			_Q(".rightNo3").hide();
		}
	}
}

function editMark(x){
	for(var i = 0;i<array_mark.length;i++){
		var temp = array_mark[i];
		if(temp._index ==x){
			temp.ondblclick();
		}
	}
} 

function closeCm(){
	_Q('#login4').hide();
	_Q(".farmIntroPop").hide();
}

var defaultfarmer = "<option value='0'>暂无负责人员<option>";
var defaultgroup = "<option value='0'>暂未分组<option>";
function nonecheck(){
    _Q("select").not("#group_farmer,#group_farmer1,#group_farmer2,#group_farmer3,#group_groupId").each(function(){
			if(_Q(this).find("option").length==0){
				_Q(this).append(noneOption);
			}
		});
    _Q("#group_farmer,#group_farmer1,#group_farmer2,#group_farmer3").append(defaultfarmer);
    _Q("#group_groupId").append(defaultgroup);
}

function checkfirst(){
	var val = _Q("#mark_area").val();
	if(isNaN(val)){
		alert("请填写正确的亩数!")
		return false;
	}
	return true;
}

var nullGroupSecondInd = false;
function checkSecond(){
    var name = _Q("#partition_name").val();
    if(name==""){
        alert("请填写分区名称!")
        return false;
    }
	if(name.length>45){
		alert("分区名称长度不能超过45个字符!")
		return false;
	}
	
	if(_Q("#partition_description").val().length>500){
		alert("分区描述文字长度不能超过500个字符!")
		return false;
	}
	
	var val = _Q("#partition_area").val();
	if(isNaN(val)){
		alert("请填写正确的亩数!")
		return false;
	}
	var base_id = _Q("#base_id").val();
    if(nullGroupSecond.length>0){
        for (var i = 0;i<nullGroupSecond.length;i++){
            var tob = nullGroupSecond[i];
            if(tob.label == name && tob.base_id == base_id){
                _Q("#partition_id").val(tob.value);
                nullGroupSecondInd = true;
                break;
            }
        }
    }

	return true;
}

var nullGroupFirstInd = false;
function checkBase(){
	var name = _Q("#mark_info_name").val();
	if(name==""){
		alert("请填写基地名称!")
		return false;
	}
	if(_Q("#mark_info_name").val().length>45){
		alert("基地名称长度不能超过45个字符!")
		return false;
	}
	if(nullGroupFirst.length>0){
		for (var i = 0;i<nullGroupFirst.length;i++){
			var tob = nullGroupFirst[i];
			if(tob.label == name ){
				_Q("#mark_info_id").val(tob.value);
				nullGroupFirstInd = true;
				break;
			}
		}
	}
	return true;
}

function refreshKrpanoFrame(data){
	_Q("#krpanoFile").attr("src",_Q("#krpanoFile").attr("src"))
	_Q("#krpanoFile").show();
}

function checkKrpano(){
	if(_Q("#krpano_name").val()==""){
		alert("请填写四季田景名称!");
		return false;
	}
	if(_Q("#krpanoFile").contents().find("#krpanoFileUrl").val()==""){
		alert("请先上传图片！");
		return false;
	}
	if(_Q("#krpano_base_id").val()==""){
		alert("请将四季田景放到基地范围内!");
		return false;
	}
	return true;
}

function checkPreviewKrpano(){
	if(_Q("#krpanoFile").contents().find("#krpanoFileUrl").val()==""){
		alert("请先上传图片！");
		return false;
	}
	return true;
}

function previewImage(url){
	_Q("#previewDiv").show();
	var height = document.body.clientHeight;
	var width = document.body.clientWidth;
	width = (width-1024)/2;
	_Q("#previewDiv").css({"position":"absolute","z-index":1000,"left":width,"top":(height-768)/2});
	_Q("#previewDiv img:first").attr("src",url);
}

function previewKrpano_before(){
	var val = _Q("#krpanoFile").contents().find("input:radio[name='fileType']:checked").val();
	if(val == 1 ){
		previewKrpano();
	}else if(val == 2){
		previewImage(_Q("#krpanoFile").contents().find("#krpanoFileUrl").val());
		//previewImage = _Q("#krpanoFile")[0].contentWindow.fileFold
	}
}

function previewKrpano(id){
	var val = _Q("#krpano_id").val();
	if(val==""){
		_Q("#krpano_iframe").attr("src",workpath+ "/map/Krpano2.seam?type=3&enterid="+enterid);
	}else{
		_Q("#krpano_iframe").attr("src",workpath+ "/map/Krpano2.seam?krpano_id="+val+"&enterid="+enterid+"&type=4");
	}
	
	var height = document.body.clientHeight;
	var width = document.body.clientWidth;
	_Q("#krpano_iframe").css({"position":"absolute","z-index":1000,"left":(width-600)/2,"top":(height-600)/2});
	var rightWidth =  _Q('#rightPane').width();
	_Q("#krpano_iframe").css({"width":(width-77-rightWidth),"height":(height-60),left:77,top:60})
	_Q("#krpano_iframe").show();
}


function showKrpanoExample(){
	_Q("#krpano_iframe").attr("src",workpath+ "/map/Krpano2.seam?type=100");
    var height = document.body.clientHeight;
    var width = document.body.clientWidth;
    _Q("#krpano_iframe").css({"position":"fixed","z-index":10000});
    var rightWidth =  _Q('#rightPane').width();
    _Q("#krpano_iframe").css({"width":width,"height":height,left:0,top:0});
    _Q("#krpano_iframe").show();
}

function resetFrameSize(){
	if(_Q("#krpano_iframe").is(":visible")){
		//_Q(".notPlant").css("left",_Q('#login4').width()/2-_Q(".notPlant").width()/2+77);
		//_Q(".notPlant").css("top",_Q("#mPane").height()/2-_Q(".notPlant").height()-16);
		var height = document.body.clientHeight;
		var width = document.body.clientWidth;
		var rightWidth =  _Q('#rightPane').width();
		_Q("#krpano_iframe").css({"width":(width-77-rightWidth),"height":(height-60),left:77,top:60})
	}
}

function closeKrpanoFrame(){
	_Q("#krpano_iframe").hide();
	_Q("#krpano_iframe").attr("src","");
}

function checkvideo(){
	if(_Q("#video_description").val().length>200){
		alert("备注文字不能超过200！");
		return false;
	}
	return true;
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
		div.style.color=baseFontColor;
		if (zoom < 15) {
			this.show();

			var aPoint = overlayProjection.fromLatLngToContainerPixel(newpoint);
			aPoint.x = aPoint.x - (11 * this.wenzi_.length);
			newpoint = overlayProjection.fromContainerPixelToLatLng(aPoint);
			div.style.width = fs * this.wenzi_.length + "px";
			div.style.fontSize = fs + "px";
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
        div.style.color=partitionsFontsColor;
		if (zoom <= 15) {
			this.hide();
		} else if (zoom == 16) {
			this.show();
			newpoint = new google.maps.LatLng(lat + 0.0002, lng
					- (0.000242 * yu));
			div.style.width = fs[0] * this.wenzi_.length + "px";
            div.style.fontSize = fs[0] + "px";
		} else if (zoom == 17) {
			this.show();
			newpoint = new google.maps.LatLng(lat + 0.0001, lng
					- (0.000185 * yu));
			div.style.width = fs[1] * this.wenzi_.length + "px";
			div.style.fontSize = fs[1] + "px";
		} else if (zoom == 18) {
			this.show();
			newpoint = new google.maps.LatLng(lat + 0.00006, lng
					- (0.000139 * yu));
			div.style.width = fs[2] * this.wenzi_.length + "px";
			div.style.fontSize = fs[2] + "px";
		} else if (zoom == 19) {
			this.show();
			newpoint = new google.maps.LatLng(lat + 0.00004, lng
					- (0.000119 * yu));
			div.style.width = fs[3] * this.wenzi_.length + "px";
			div.style.fontSize = fs[3] + "px";
		} else if (zoom > 19) {
			this.show();
			newpoint = new google.maps.LatLng(lat + 0.00003, lng
					- (0.000119 * yu));
			div.style.width = fs[4] * this.wenzi_.length + "px";
			div.style.fontSize = fs[4] + "px";
		}
	} else if (this.type_ == 3) {
        var fs = tunnelFontsSizes[tunnelFontsSize];
        div.style.color=tunnelFontsColor;
		if (zoom < 18) {
			this.hide();
		} else if (zoom == 18) {
			this.show();
			newpoint = new google.maps.LatLng(lat - 0.00004, lng
					- (0.000064 * yu));
			div.style.width = fs[0] * this.wenzi_.length + "px";
			div.style.fontSize = fs[0] + "px";
		} else if (zoom == 19) {
			this.show();
			newpoint = new google.maps.LatLng(lat - 0.00004, lng
					- (0.000029 * yu));
			div.style.width = fs[1] * this.wenzi_.length + "px";
			div.style.fontSize = fs[1] + "px";
		} else if (zoom > 19) {
			this.show();
			newpoint = new google.maps.LatLng(lat - 0.00004, lng
					- (0.000049 * yu));
			div.style.width = fs[2] * this.wenzi_.length + "px";
			div.style.fontSize = fs[2] + "px";
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

function krpano_first(){
	if(!checkissubmit(4)){
		return;
	}
	if(krpanoService !=1 && krpanoService != 3){
		showCheckTips("<span><span style='font-size:18px'>亲</span>，您还没有使用农场四季田景的权限哦，</span><br/><span>如果您想使用，请拨打<span style='color:#F67B0A'>400-8199-586</span>联系我们！</span><br/><a href='#' onclick='showKrpanoExample()'>什么是四季田景！</a>");
		return;
	}
	_Q("#krpano_index").val(++krpano_index);
	_Q("#krpano_id").val("");
	_Q("#krpano_file_type").val("");
	_Q("#krpano_name").val("");
	_Q("#krpano_base_id").val("");
	_Q("#krpano_base_name").val("");
	
	_Q("#krpano_partition_id").val("");
	_Q("#krpano_partition_name").val("");
	
	_Q("#krpano_tunnel_id").val("");
	_Q("#krpano_tunnel_name").val("");
	
	
	refreshKrpanoFrame();
	_Q(".tc_rw_rw2").scrollTop(0);
	_Q("#divtittle").text("编辑四季田景");
	_Q(".tc_top_03").show();
	_Q(".rightNo").hide();
	_Q(".rightNo13").show();
	_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
	open_right_panel();
}

function krpano_second(){
	var x = _Q("#krpano_coordinateX").val();
	var y = _Q("#krpano_coordinateY").val();
	var latlng ;
	if(x != "" && y != ""){
		latlng = new google.maps.LatLng(parseFloat(x),parseFloat(y));
		map.setCenter(latlng);
	}else{
		latlng = map.getCenter();
		x = latlng.lat();
		y = latlng.lng();
		
		var x1 = x;
		var y1 = y;
		if(x1 != ""){
			document.getElementById("krpano_coordinateX").value = x1;
			x1 = parseFloat(x1).toFixed(2);
			//°54'
			var xs = x1.split(".");
			x1 = xs[0] + "°" + xs[1] + "'";
			document.getElementById("krpano_coordinateX_name").value = x1;
		}else{
			document.getElementById("krpano_coordinateX").value = "";
			document.getElementById("krpano_coordinateX_name").value = "";
		}

		if(y1 != ""){
			document.getElementById("krpano_coordinateY").value = y1;
			y1 = parseFloat(y1).toFixed(2);
			//°54'
			var ys = y1.split(".");
			y1 = ys[0] + "°" + ys[1] + "'";
			document.getElementById("krpano_coordinateY_name").value = y1;
		}else{
			document.getElementById("krpano_coordinateY").value = "";
			document.getElementById("krpano_coordinateY_name").value = y1;
		}
	}
	
	map.setZoom(19);
	
	var arr = {device_:4};
	var base = checkPointBase(latlng); //锚点所属基地
	if(base!=null){
		_Q("#krpano_base_id").val(base._marker._id);
		_Q("#krpano_base_name").val(base._name);
		arr.krpano_base_id =base._marker._id;
		arr.krpano_base_name = base._name;
	}else{
		_Q("#krpano_base_id").val("");
		_Q("#krpano_base_name").val("");
		arr.krpano_base_id ="";
		arr.krpano_base_name = "";
	}
	var partition = checkPointPartition(latlng);//锚点所属分区
	if(partition!=null){
		_Q("#krpano_partition_id").val(partition._id);
		_Q("#krpano_partition_name").val(partition._name);
		arr.krpano_partition_id = partition._id;
		arr.krpano_partition_name = partition._name;
	}else{
		_Q("#krpano_partition_id").val("");
		_Q("#krpano_partition_name").val("");
		arr.krpano_partition_id = "";
		arr.krpano_partition_name = "";
	}
	var tunnel = checkPointTunnel(latlng);//锚点所属大棚
	if(tunnel!=null){
		_Q("#krpano_tunnel_id").val(tunnel._id);
		_Q("#krpano_tunnel_name").val(tunnel._name);
		arr.krpano_tunnel_id = tunnel._id;
		arr.krpano_tunnel_name = tunnel._name;
	}else{
		_Q("#krpano_tunnel_id").val("");
		_Q("#krpano_tunnel_name").val("");
		arr.krpano_tunnel_id = "";
		arr.krpano_tunnel_name = "";
	}
	arr.krpano_id = _Q("#krpano_id").val();
	arr.krpano_sn = "";
	arr.krpano_name = _Q("#krpano_name").val();
	arr.krpano_coordinateX = x;
	arr.krpano_coordinateY = y;
	arr._index = _Q("#krpano_index").val();
	//add_krpano(arr);
	if(krpanoObj == null){
		krpanoObj = new CustomOverlay(map,krpanosrc,latlng,arr);
		krpanoArray.push(krpanoObj);
	}else {
		krpanoObj.setLatLng(latlng);
		krpanoObj.draw();
	}
}

function video_div_change(obj){
	_Q(".video_show").hide();
	if(obj==1){
		_Q(".video_show1").show();
		_Q(".videotitle").html("硬盘录像机设置");
	}else if(obj==3){
		_Q(".video_show1").show();
		_Q(".videotitle").html("新硬盘录像机设置");
	}else if(obj==2){
		_Q(".video_show2").show();
	}else if(obj==4){
		_Q(".video_show4").show();
	}
}

function open_right_panel(){
	if(typeof(Sys.ie) == 'undefined'){
		if(_Q(".splitbuttonV").attr("class")=="splitbuttonV"){
			_Q(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
			var wait=setInterval(function(){
			     if(_Q('#rightPane').width()+50>=368){
			         _Q('#rightPane').css('width',368);
			         _Q('#CenterAndRight').trigger('resize');
			         google.maps.event.trigger(map, 'resize');
			         clearInterval(wait);
			     }else{
			         _Q('#rightPane').css('width',_Q('#rightPane').width()+50);
			         _Q('#CenterAndRight').trigger('resize');
			     }
			     
			}, 10);
		};
	}else{
		_Q('#rightPane').width(368);
		_Q('#CenterAndRight').trigger('resize');
		google.maps.event.trigger(map, 'resize');
	}
}

function close_right_panel(){
	if(typeof(Sys.ie) == 'undefined'){
		if(_Q(".splitbuttonV").attr("class")=="splitbuttonV invert"){
			_Q(".splitbuttonV").removeClass().addClass("splitbuttonV");
			var wait=setInterval(function(){
			     if(_Q('#rightPane').width()-50<=0){
			         _Q('#rightPane').css('width',0);
			         _Q('#CenterAndRight').trigger('resize');
			         google.maps.event.trigger(map, 'resize');
			         clearInterval(wait);
			     }else{
			         _Q('#rightPane').css('width',_Q('#rightPane').width()-50);
			         _Q('#CenterAndRight').trigger('resize');
			     }
			}, 10);
		}
	}else{
		_Q('#rightPane').width(0);
		_Q('#CenterAndRight').trigger('resize');
		google.maps.event.trigger(map, 'resize');
	}
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
 

var map1 = new JsMap();//区域
var map5 = new JsMap();
var map2 = new JsMap();//partId,partName
//大棚数据加载
function initList (){
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
	if(typeof(pidArray)!='undefined' && pidArray.length>0)
		pidArray.sort(function(a,b){return a.indexNum>b.indexNum?1:-1});
	//区域
	var key1 = map1.keys();
	var html = '';
	for(var i = 0;i<pidArray.length;i++){
		var list = map1.get(pidArray[i].id);
		if(list==null)
			continue;
//		list.insertSort(function(a,b){
//			if(a._index_num == 0 && b._index_num ==0)
//				return b._id > a._id;
//			return a._index_num>b._index_num ;});
		var index = 0;
		var flag = true;
		var p_name = list[0].partition_name;
		p_name = p_name==""?"无所属区域":p_name;
		html+='<div class="needdis" style="width:100%; display:block; margin-bottom:10px;"><div class="aqu2"><table width="100%" cellspacing="0" cellpadding="0">'+
    	'<tbody><tr><td align="left"><div class="quyu">'+p_name+'</div></td><td align="right" class="sjj_08">'+
        '<img width="14" height="19" src="'+workpath+'/asset/images/sjj_down.jpg" aa="true" onclick="tog(this)" style="cursor:pointer"/></td></tr></tbody></table></div><ul class="aqu_ul" style="min-width:320px;">';
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

function tog(obj){
	_Q(obj).closest('.needdis').find("ul").toggle();
	if(_Q(obj).attr("aa")=="true"){
		_Q(obj).attr("aa","false");
		_Q(obj).attr("src",workpath+"/asset/images/sjj_left.jpg");
	}else{
		_Q(obj).attr("aa","true");
		_Q(obj).attr("src",workpath+"/asset/images/sjj_down.jpg");
	}
}

var searchName = ["","","",""];
var tagName = ["大棚排序","品种排序","区域排序","状态排序"];
var tab_index = 0;
function searchTunnel(index){
	tab_index = index;
	_Q(".tc_top_input").val(searchName[tab_index]);
	_Q(".tie_00").html(tagName[tab_index]);
	searchs();
}
//右侧弹出框列表搜索
function searchs(){
	var val = _Q(".tc_top_input").val();
	searchName[tab_index]=val;
	if(val==""){
		_Q("._area"+tab_index+" ._tunnel_name").closest(".aqu_li").show();
		_Q("._area"+tab_index+" .needdis").show();
		return;
	}
	_Q("._area"+tab_index+" ._tunnel_name").not(":contains("+val+")").closest(".aqu_li").hide();
	_Q("._area"+tab_index+" ._tunnel_name:contains("+val+")").closest(".aqu_li").show();
	_Q("._area"+tab_index+" .needdis").each(
			function(){
				var x = _Q(this).find("li:visible").length;
				if(x==0)
					_Q(this).hide();
			}
	);
}

function gotoMap(id,event){
	var b = false;
	for(var i = 0;i<mark3Array.length;i++){
		var obj = mark3Array[i];
		if(obj._id==id){
			setSelection(obj);
			obj.ondblclick(event);
			b=true;
			break;
		}
	}
	if(!b){
		if(mark2Array.length==0){
			alert("请先完成地图初始化步骤!");
			return;
		}else{
			
		}
	}
}
function group_back(){
	if(selectedShape){
		if(selectedShape._id==undefined||selectedShape._id==''){
			selectedShape.setMap(null);
		}
	}
	_Q(".model3").removeClass("on");
	if(_Q(".splitbuttonV").attr("class")=="splitbuttonV"){
		_Q(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
		var wait=setInterval(function(){
		     if(_Q('#rightPane').width()+50>=368){
		         _Q('#rightPane').css('width',368);
			 clearInterval(wait);
		     }else{
		         _Q('#rightPane').css('width',_Q('#rightPane').width()+50);
		     }
		     _Q('#CenterAndRight').trigger('resize');
		}, 10);
	}
	_Q(".tc_top_03").hide();
	_Q(".rightNo").hide();
	_Q(".rightNo4").show();
	_Q(".tc_cont").addClass("TTTTT").removeClass("tc_cont");
	_Q(".btnOpen").show();
	clearSelection();
}


//添加农户
function addFarmer(type){
	_Q(".rightNo").hide();
	_Q(".rightNo7").show();
	_Q(".tc_top_03").show();
	_Q(".tc_top_044").hide();
	_Q("#modelInfo").hide();
	if(type==1){
		_Q("#divtittle").text("添加农户");
	}else if(type==2){
		_Q("#divtittle").text("添加种植管理员");
	}else if(type==3){
		_Q("#divtittle").text("添加饲养员");
	}else if(type==4){
		_Q("#divtittle").text("添加养殖负责人");
	}
	_Q("#farmer_base_id").val(_Q("#group_base_id").val());
	_Q("#farmer_type").val(type);
	_Q("#farmer_name").val("");
	_Q("#farmer_age").val("");
	_Q("#farmer_age2").val("");
	_Q("#farmer_phone").val("");
	_Q("#farmer_honor").val("");
}

//农户表单检查
function checkFarmer(){
	var a = /^[1-9]+[0-9]*]*$/; // 正整数
	var farmerName = _Q("#farmer_name").val();
	if (farmerName == "") {
		alert("姓名不能为空!");
		return false;
	}
	if(farmerName.length > 10){
		alert("姓名太长，不能超过10个字符!");
		return false;
	}
	var farmerAge = _Q("#farmer_age").val();
	if (!a.test(farmerAge)) {
		alert("年龄必须是正整数!");
		return false;
	}
	var farmerAgeInt = parseInt(farmerAge,10)
	if(farmerAgeInt>99){
		alert("年龄必须为2位正整数!");
		return false;
	}
	var farmerAge2 = _Q("#farmer_age2").val();
	if (!a.test(farmerAge2)) {
		alert("从业年限必须是正整数!");
		return false;
	}
	var farmerAge2Int = parseInt(farmerAge2,10)
	if(farmerAge2Int>99){
		alert("从业年限必须为2位正整数!")
		return false;
	}
	if(farmerAge2Int > farmerAgeInt){
		alert("从业年限必须为小于年龄!")
		return false;
	}
	var farmerPhone = _Q("#farmer_phone").val();
	if(farmerPhone != "" && farmerPhone.length >15){
		alert("电话必须小于15位!")
		return false;
	}
	var farmerHonor = _Q("#farmer_honor").val();
	if(farmerHonor != "" && farmerHonor.length > 200){
		alert("荣誉必须限定在200字以内!")
		return false;
	}
	return true;
}

//农户编辑完成
function farmer_ok(data,event){
	var strs = data.split("-~^_");
	
	if(strs[0]==1){
		_Q(strs[1]).prependTo("#group_farmer_");
		_Q(strs[1]).prependTo("#group_farmer");
        var val = _Q("#group_farmer option[value!=0]:first").val();
		_Q("#group_farmer").selectpicker("val",val);
		_Q("#group_farmer").selectpicker("refresh");
	}else if(strs[0]==2){
		_Q(strs[1]).prependTo("#group_farmer1_");
		_Q(strs[1]).prependTo("#group_farmer1");
        var val = _Q("#group_farmer1 option[value!=0]:first").val();
		_Q("#group_farmer1").selectpicker("val",val);
		_Q("#group_farmer1").selectpicker("refresh");
	}else if(strs[0]==3){
		_Q(strs[1]).prependTo("#group_farmer2_");
		_Q(strs[1]).prependTo("#group_farmer2");
        var val = _Q("#group_farmer2 option[value!=0]:first").val();
        _Q("#group_farmer2").selectpicker("val",val);
		_Q("#group_farmer2").selectpicker("refresh");
	}else if(strs[0]==4){
		_Q(strs[1]).prependTo("#group_farmer3_");
		_Q(strs[1]).prependTo("#group_farmer3");
        var val = _Q("#group_farmer3 option[value!=0]:first").val();
    	_Q("#group_farmer3").selectpicker("val",val);
		_Q("#group_farmer3").selectpicker("refresh");
	}
	_Q("#divtittle").text("编辑区域");
	if (selectedShape) {
		_Q(".rightNo").hide();
		_Q(".rightNo5").show();
		_Q(".tc_top_03").show();
		_Q(".tc_top_044").hide();
		_Q("#modelInfo").hide();
	}
}

//取消农户编辑
function farmer_no(event){
	if (selectedShape) {
		_Q("#divtittle").text("编辑区域");
		_Q(".rightNo").hide();
		_Q(".rightNo5").show();
		_Q(".tc_top_03").show();
		_Q(".tc_top_044").hide();
		_Q("#modelInfo").hide();
	}
}

function addGeo(map) {
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
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(this.div_);
}

function newAutoCom(selector,data){
	var $elem = _Q(selector).autocomplete({
		source: data,
		select: function( event, ui ) {
	        _Q( selector ).val( ui.item.label );
	        return false;
	      },
	      focus: function (event, ui) {
	          this.value = ui.item.label;
	          event.preventDefault(); // Prevent the default focus behavior.
	   }
	});
	var elemAutocomplete = $elem.data("ui-autocomplete") || $elem.data("autocomplete");
	if (elemAutocomplete) {
	    elemAutocomplete._renderItem = function (ul, item) {
	        var newText = String(item.label).replace(
	                new RegExp(this.term, "gi"),
	                "<span class='ui-state-highlight'>$&</span>");

	        return _Q("<li></li>")
	            .data("item.autocomplete", item)
	            .append("<a>" + newText + "</a>")
	            .appendTo(ul);
	    };
	}
	return $elem;
}
function destroyAutoCom(selector){
	_Q(selector).autocomplete( "destroy" );
}

function openAutoCom(type,base_id,part_id,ent_type){
	if(type == 1){
		if(nullGroupFirst.length>0){
			newAutoCom("#mark_info_name", nullGroupFirst);
		}
	}else if(type == 2){
		var temp = new Array();
		for(var i = 0;i<nullGroupSecond.length;i++){
			var tob = nullGroupSecond[i];
			if(tob.base_id == base_id)
				temp.push(tob);
		}
		if(temp.length>0){
			newAutoCom("#partition_name", temp);
		}
	}else if(type == 3){
		if(nullGroupThird.length>0){
			if(typeof(part_id) != "undefined"){
				var temp = new Array();
				for(var i = 0;i<nullGroupThird.length;i++){
					var tob = nullGroupThird[i];
					if(tob.base_id == base_id && tob.part_id == part_id && tob.ent_type == ent_type)
						temp.push(tob);
				}
				newAutoCom("#group_name", temp);
			}else{
				var temp = new Array();
				for(var i = 0;i<nullGroupThird.length;i++){
					var tob = nullGroupThird[i];
					if(tob.base_id == base_id && tob.part_id == 0 && tob.ent_type == ent_type)
						temp.push(tob);
				}
				newAutoCom("#group_name", temp);
			}
		}
	}
}

function closeAutoCom(type){
	if(type == 1){
		//if(nullGroupFirst.length>0){
			destroyAutoCom("#mark_info_name");
		//}
	}else if(type == 2){
		var temp = new Array()
		//if(nullGroupSecond.length>0){
			destroyAutoCom("#partition_name");
		//}
	}else if(type == 3){
		//if(nullGroupThird.length>0){
			destroyAutoCom("#group_name");
		//}
	}
}

function changeVideoType(obj){
    if(obj.value==304){
        _Q(".ziyuanid").html("资源编码");
    }else{
        _Q(".ziyuanid").html("视频通道号");
    }
}

function checksensor(){
	if(_Q("#device_sn").val()==""){
		alert("请填写设备编码！");
		return false;
	}
	if(_Q("#device_name").val()==""){
		alert("请填写设备名称！");
		return false;
	}
	return true;
}

window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
	try{
		
		console.log("错误信息：" , errorMessage);
		console.log("出错文件：" , scriptURI);
		console.log("出错行号：" , lineNumber);
		console.log("出错列号：" , columnNumber);
		console.log("错误详情：" , errorObj);
	}catch(e){}
 }
   //]]>
 
//<![CDATA[
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
	var noPaint;
	var backname = "";
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
function clearSelection() {
       if (selectedShape) {
         selectedShape.setEditable(false);
         selectedShape = null;
       }
     }

     function setSelection(shape) {
       clearSelection();
       selectedShape = shape;
       shape.setEditable(true);
     }

     function deleteSelectedShape() {
       if (selectedShape) {
         selectedShape.setMap(null);
       }
     }
function initialize() {  
   //初始化地图参数  
	initList();
	var lag;
	var defaultZoom = 15;
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
   //mapTypeControlOptions:{position:google.maps.ControlPosition.LEFT_TOP},
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
 //注册 多边形 绘制完成事件   
 google.maps.event.addDomListener(map, 'dblclick', function(event){//alert(1) //坐标 0.000029
		//alert(event.latLng);
	  });
  google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {   
	  //第一步完成检测
	  alert("google.maps.drawing.OverlayType.MARKER---"+google.maps.drawing.OverlayType.MARKER);
	if (event.type == google.maps.drawing.OverlayType.MARKER) {
		if(!drawingManager.isshow){
			event.overlay.setMap(null);
			return;
		}
		if(!drawingManager.device_){
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
				_$("#mark_info_name").val(m._name);
				_$("#mark_info_index").val(m._index);
				alert("X---"+1);
				_$("#mark_info_x").val(m._coordinate_X);
				_$("#mark_info_y").val(m._coordinate_Y);
				_$("#mark_info_id").val(m._id);
				_$(".rightNo").hide();
				_$(".rightNo1").show();
				_$("#divtittle").text("编辑基地位置");
				if(_$(".splitbuttonV").attr("class")=="splitbuttonV"){
					_$(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
					var wait=setInterval(function(){
					     if(jQuery13('#rightPane').width()+50>=368){
					         jQuery13('#rightPane').css('width',368);
						 clearInterval(wait);
					     }else{
					         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()+50);
					     }
					     jQuery13('#CenterAndRight').trigger('resize');
					}, 10);
				}
				_$(".tc_top_03").show();
				_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
				_$(".btnOpen").hide();
			m.setDraggable(true);
			google.maps.event.addListener(m, 'dragend',function(){
				m._coordinate_X=m.getPosition().lat();
				m._coordinate_Y=m.getPosition().lng();
				_$("#mark_info_name").val(m._name);
				_$("#mark_info_index").val(m._index);	
				alert("X---"+4);
				_$("#mark_info_x").val(m._coordinate_X);
				_$("#mark_info_y").val(m._coordinate_Y);
				_$("#mark_info_id").val(m._id);
				_$(".rightNo").hide();
				_$(".rightNo1").show();
				_$("#divtittle").text("编辑基地位置");
				if(_$(".splitbuttonV").attr("class")=="splitbuttonV"){
					_$(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
					var wait=setInterval(function(){
					     if(jQuery13('#rightPane').width()+50>=368){
					         jQuery13('#rightPane').css('width',368);
						 clearInterval(wait);
					     }else{
					         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()+50);
					     }
					     jQuery13('#CenterAndRight').trigger('resize');
					}, 10);
				}
				_$(".tc_top_03").show();
				_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
				_$(".btnOpen").hide();
			});
			array_mark.push(m);
			google.maps.event.addDomListener(m, 'dblclick', function() {
				_$("#mark_info_name").val(m._name);
				_$("#mark_info_index").val(m._index);	
				alert("X---"+3);
				_$("#mark_info_x").val(m._coordinate_X);
				_$("#mark_info_y").val(m._coordinate_Y);
				_$("#mark_info_id").val(m._id);
				_$(".rightNo").hide();
				_$(".rightNo1").show();
				_$("#divtittle").text("编辑基地位置");
				if(_$(".splitbuttonV").attr("class")=="splitbuttonV"){
					_$(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
					var wait=setInterval(function(){
					     if(jQuery13('#rightPane').width()+50>=368){
					         jQuery13('#rightPane').css('width',368);
						 clearInterval(wait);
					     }else{
					         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()+50);
					     }
					     jQuery13('#CenterAndRight').trigger('resize');
					}, 10);
				}
				_$(".tc_top_03").show();
				_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
				_$(".btnOpen").hide();
			});
			
			var contentString = "<div style='width:240px'><table><tr><td width='200'>"+m._name+"<br/>联系人:"+m._contact+"<br/>电话:"+m._phone+"<br/>地址:"+m._address+"<br/>描述:"+m._description+"</td><td valign='top'><span style='cursor:pointer;font-weight:bold;' onclick='editMark("+m._index+")'>编辑</span></td></tr></table></div>"; 
			
			var infowindow = new google.maps.InfoWindow({
			content: contentString,
			maxWidth: 400
			});
			m._infowindow=infowindow;
			google.maps.event.addDomListener(m, 'click', function() {
				var infowindow = m._infowindow;
				infowindow.open(map,m);
				map.setCenter(m.getPosition());
				map.setZoom(16);
	      });
			drawingManager.setDrawingMode(null);
		}else{
			var X=event.overlay.getPosition().lat();
			var Y=event.overlay.getPosition().lng();
			var latlng = new google.maps.LatLng(X,Y);
			event.overlay.setMap(null);
			if(drawingManager.device_==1||drawingManager.device_==2){
				var arr = {device_:drawingManager.device_};
				addDevice(drawingManager.device_);
				var base = checkPointBase(latlng);
				if(base!=null){
					_$("#device_base_id").val(base._marker._id);
					_$("#device_base_name").val(base._name);
					arr.device_base_id =base._marker._id;
					arr.device_base_name = base._name;
				}else{
					_$("#device_base_id").val("");
					_$("#device_base_name").val("");
					arr.device_base_id ="";
					arr.device_base_name = "";
				}
				var partition = checkPointPartition(latlng);
				if(partition!=null){
					_$("#device_partition_id").val(partition._id);
					_$("#device_partition_name").val(partition._name);
					arr.device_partition_id = partition._id;
					arr.device_partition_name = partition._name;
				}else{
					_$("#device_partition_id").val("");
					_$("#device_partition_name").val("");
					arr.device_partition_id = "";
					arr.device_partition_name = "";
				}
				var tunnel = checkPointTunnel(latlng);
				if(tunnel!=null){
					_$("#device_tunnel_id").val(tunnel._id);
					_$("#device_tunnel_name").val(tunnel._name);
					arr.device_tunnel_id = tunnel._id;
					arr.device_tunnel_name = tunnel._name;
				}else{
					_$("#device_tunnel_id").val("");
					_$("#device_tunnel_name").val("");
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
				_$(".rido1").trigger("click");
				_Q(".aps_radio:eq(0)").trigger("click");
				_$("#device_coordinateX").val(X);
				_$("#device_coordinateY").val(Y);
				_$("#device_deviceType").val(drawingManager.device_);
				_$("#device_type_id")[0].selectedIndex = 0;
				_$("#device_type_id").selectmenu("destroy").selectmenu({style:'dropdown'});
				_$("#device_type_id2")[0].selectedIndex = 0;
				_$("#device_type_id2").selectmenu("destroy").selectmenu({style:'dropdown'});
				_$(".ui-selectmenu-dropdown").addClass("small322");
			    _$(".ui-selectmenu-dropdown").removeClass("ui-selectmenu-dropdown");
			    _$(".ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
			    _$(".ui-selectmenu-menu").removeClass("ui-selectmenu-menu");
				arr._index = ++device_index;
				var customOveray = new CustomOverlay(map,"",latlng,arr);
				_$(".tc_rw_rw2").scrollTop(0);
				_$("#device_index").val(arr._index);
				_$("#divtittle").text("编辑设备");
				_$(".tc_top_03").show();
				_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
				if(_$(".splitbuttonV").attr("class")=="splitbuttonV"){
					_$(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
					var wait=setInterval(function(){
					     if(jQuery13('#rightPane').width()+50>=368){
					         jQuery13('#rightPane').css('width',368);
						 clearInterval(wait);
					     }else{
					         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()+50);
					     }
					     jQuery13('#CenterAndRight').trigger('resize');
					}, 10);
				};
				deviceArray.push(customOveray);
				drawingManager.setDrawingMode(null);
				return;
			}else if(drawingManager.device_==3){
				var arr = {device_:drawingManager.device_};
				var base = checkPointBase(latlng);
				if(base!=null){
					_$("#video_base_id").val(base._marker._id);
					_$("#video_base_name").val(base._name);
					arr.video_base_id =base._marker._id;
					arr.video_base_name = base._name;
				}else{
					_$("#video_base_id").val("");
					_$("#video_base_name").val("");
					arr.video_base_id ="";
					arr.video_base_name = "";
				}
				var partition = checkPointPartition(latlng);
				if(partition!=null){
					_$("#video_partition_id").val(partition._id);
					_$("#video_partition_name").val(partition._name);
					arr.video_partition_id = partition._id;
					arr.video_partition_name = partition._name;
				}else{
					_$("#video_partition_id").val("");
					_$("#video_partition_name").val("");
					arr.video_partition_id = "";
					arr.video_partition_name = "";
				}
				var tunnel = checkPointTunnel(latlng);
				if(tunnel!=null){
					_$("#video_tunnel_id").val(tunnel._id);
					_$("#video_tunnel_name").val(tunnel._name);
					arr.video_tunnel_id = tunnel._id;
					arr.video_tunnel_name = tunnel._name;
				}else{
					_$("#video_tunnel_id").val("");
					_$("#video_tunnel_name").val("");
					arr.video_tunnel_id = "";
					arr.video_tunnel_name = "";
				}
				arr.video_id = "";
				arr.video_sn = "";
				arr.video_name = "";
				arr.video_description="";
				arr.video_factory = "";
				arr.video_coordinateX = X;
				arr.video_coordinateY = Y;
				arr.video_status = 0;
				arr.video_selected = 0;
				arr.video_factoryTime = "";
				arr.video_ip = "";
				arr.video_channel_no = "";
				arr.video_device_video_channel_no = "";
				arr.video_username = "";
				arr.video_password = "";
				arr.video_app_ip = "";
				arr.video_app_port = "";
				arr.video_app_device_video_channel_no = "";
				arr.video_app_username = "";
				arr.video_app_password = "";
				arr.video_type_id = "";
				arr.video_access_way = "1";
				_$("#video_access_way").val(1);
				_$("#video_access_way").selectmenu("destroy").selectmenu({style:'dropdown'});
				_$("#video_access_way-button").removeClass("ui-selectmenu-dropdown").addClass("small322");
				_$("#video_access_way-menu").removeClass("ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
				
				arr._index = ++video_index;
				add_video(arr);
				var customOveray = new CustomOverlay(map,"",latlng,arr);
				_$(".tc_rw_rw2").scrollTop(0);
				_$("#video_index").val(arr._index);
				_$("#divtittle").text("编辑视频设备");
				_$(".tc_top_03").show();
				_$(".rightNo").hide();
				_$(".rightNo11").show();
				_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
				if(_$(".splitbuttonV").attr("class")=="splitbuttonV"){
					_$(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
					var wait=setInterval(function(){
					     if(jQuery13('#rightPane').width()+50>=368){
					         jQuery13('#rightPane').css('width',368);
						 clearInterval(wait);
					     }else{
					         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()+50);
					     }
					     jQuery13('#CenterAndRight').trigger('resize');
					}, 10);
				};
				videoArray.push(customOveray);
				drawingManager.setDrawingMode(null);
				return;
			}
		}
	}
	//多边形绘画完成触发
   if (event.type == google.maps.drawing.OverlayType.POLYGON) {   
   var radius = event.overlay.getPath();   
   var mianji = google.maps.geometry.spherical.computeArea(radius)*0.0015;   
   mianji = CurrencyFormatted(mianji);
	var newShape = event.overlay;
	newShape.mianji=mianji;
	newShape.title="xxxxxxxxxxxxxxx";
	
	array.push(newShape);
	setSelection(newShape);

 }   

}
);
////////
  //多边形绘画完成触发
google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
	if(!drawingManager.isshow){
		polygon.setMap(null);
		return;
	}
	alert(drawingManager.mytype);
	var mtype = drawingManager.mytype;
	var m;
	var b0=false;
	var pointStr ="";
	 if(mtype==1){//基地
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
		 /*for(var i = 0;i<mark1Array.length;i++){//检测厂区之间是否重叠
			var m2=mark1Array[i];
			if(m2.getMap()!=null){
				var path = m2.getPath().getArray();
				var bounds1 = new google.maps.LatLngBounds();
				for(var x = 0;x<path.length;x++){
					bounds1.extend(path[x]);
				}
				if(bounds.intersects(bounds1)){
				polygon.setMap(null);
				alert("厂区图重复");
				b0=true;
				 break;
				}
			}
		 }*/
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
		polygon._name=m._name;
		polygon._contact="";
		polygon._phone="";
		polygon._address="";
		polygon._description="";
		var radius = polygon.getPath();   
		google.maps.event.addListener(radius, 'insert_at',function(index){reset1(polygon,radius,index,this);} );
		google.maps.event.addListener(radius, 'remove_at',function(index){reset1(polygon,radius,index,this);});
		google.maps.event.addListener(radius, 'set_at', function(index){reset1(polygon,radius,index,this);});
		google.maps.event.addListener(polygon, 'dblclick', function() {
			setSelection(polygon);
			_$(".rightNo").hide();
			_$(".rightNo2").show();
			_$("#divtittle").text("编辑基地范围");
			if(_$(".splitbuttonV").attr("class")=="splitbuttonV"){
				_$(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
				var wait=setInterval(function(){
				     if(jQuery13('#rightPane').width()+50>=368){
				         jQuery13('#rightPane').css('width',368);
					 clearInterval(wait);
				     }else{
				         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()+50);
				     }
				     jQuery13('#CenterAndRight').trigger('resize');
				}, 10);
			}
			//此处是否重复
			_$(".tc_top_03").show();
			_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
			_$(".btnOpen").hide();
			_$("#mark_id").val(polygon._marker._id);
		    _$("#mark_name").val(polygon._name);
		    _$("#mark_area").val(polygon.mianji);
		    _$("#mark_contact").val(polygon._contact);
		    _$("#mark_phone").val(polygon._phone);
		    _$("#mark_address").val(polygon._address);
		    _$("#mark_description").val(polygon._description);
		    _$("#mark_coordinate_group").val(polygon._coordinate_group);
		    _$("input[name='baseFormColor']").val(polygon.get("fillColor"));
   		    _$("#baseForm\\:color-colorPicker-hex").val(polygon.get("fillColor").replace("#",""));
   		    _$(".rich-color-picker-icon").css("background-color",polygon.get("fillColor"));
		});
		_$("#mark_id").val(polygon._marker._id);
	    _$("#mark_name").val(polygon._name);
	    _$("#mark_area").val(polygon.mianji);
	    _$("#mark_contact").val(polygon._contact);
	    _$("#mark_phone").val(polygon._phone);
	    _$("#mark_address").val(polygon._address);
	    _$("#mark_description").val(polygon._description);
	    _$("#mark_coordinate_group").val(polygon._coordinate_group);
	    _$("input[name='baseFormColor']").val(polygon.get("fillColor"));
	    _$("#baseForm\\:color-colorPicker-hex").val(polygon.get("fillColor").replace("#",""));
	    _$(".rich-color-picker-icon").css("background-color",polygon.get("fillColor"));
	    _$(".rightNo").hide();
		_$(".rightNo2").show();
		_$("#divtittle").text("编辑基地范围");
		drawingManager.setDrawingMode(null);
		setSelection(polygon);
		if(_$(".splitbuttonV").attr("class")=="splitbuttonV"){
			_$(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
			var wait=setInterval(function(){
			     if(jQuery13('#rightPane').width()+50>=368){
			         jQuery13('#rightPane').css('width',368);
				 clearInterval(wait);
			     }else{
			         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()+50);
			     }
			     jQuery13('#CenterAndRight').trigger('resize');
			}, 10);
		}
		_$(".tc_top_03").show();
		_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
		_$(".btnOpen").hide();
		return;
	 }
	var b1=false;
	if(mtype==2){//区域
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
				/*
				if(!b1){///检测是否与其他区域冲突
					if(m._list){
						for(var t = 0;t<m._list.length;t++){
							var _polygon = m._list[t];
							if(_polygon.getMap()!=null){
								var path = _polygon.getPath().getArray();
								var bounds1 = new google.maps.LatLngBounds();
								for(var x = 0;x<path.length;x++){
									bounds1.extend(path[x]);
								}
								if(bounds.intersects(bounds1)){
									alert("区域图重复");
									polygon.setMap(null);
									b1=true;
									break;
								}
							}else if(t==m._list.length-1){
								m._list.push(polygon);
							}
						}
					}else{
						var newa = new Array();
						newa.push(polygon);
						m._list=newa;
					}
				}*/
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
		google.maps.event.addListener(polygon, 'dblclick', function() {
			setSelection(polygon);
			_$(".rightNo").hide();
			_$(".rightNo3").show();
			_$("#divtittle").text("编辑区域分区");
			if(_$(".splitbuttonV").attr("class")=="splitbuttonV"){
				_$(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
				var wait=setInterval(function(){
				     if(jQuery13('#rightPane').width()+50>=368){
				         jQuery13('#rightPane').css('width',368);
					 clearInterval(wait);
				     }else{
				         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()+50);
				     }
				     jQuery13('#CenterAndRight').trigger('resize');
				}, 10);
			}
			
			if(polygon._id!=""&&polygon._id!=undefined){
				_$(".use_field").show();
				var html = "";
				_$(".soil_table").empty();
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
					_$(".soil_table").empty().append(html);
				}
				_$(".land_test_").show();
				var html2 = "";
				_$(".land_table").empty();
				for(var i = 0;i<landStr.length;i++){
					var tem = landStr[i];
					if(tem.partitionId==bermudaTriangle._id){
						html2+="<tr class='land"+tem.id+"'><td class='bc_th01'>"+tem.testDate+"</td><td  class='bc_th01' >"+tem.testOrg+"</td><td  class='bc_th01' >"+tem.phVal+"</td><td  class='bc_th01'><a href='#' onclick='editland("+tem.id+")'>修改</a>  <a href='#' onclick='delland("+tem.id+")'>删除</a></td></tr>";
					}
				}
				if(html2!=""){
					html2 = "<tr><td class='bc_th01'>测试日期</td><td class='bc_th01'>测试机构</td><td class='bc_th01'>酸碱度</td><td class='bc_th01' style='width:20%'>操作</td></tr>"+html2;
					_$(".land_table").empty().append(html2);
				}
			}else{
				_$(".use_field").hide();
				_$(".land_test_").hide();
			}
			_$(".tc_top_03").show();
			_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
			_$(".btnOpen").hide();
			_$("#partition_x").val(polygon.partition_x);
			_$("#partition_y").val(polygon.partition_y);
			_$("#partition_name").val(polygon._name);
			_$("#partition_id").val(polygon._id);
		    _$("#base_id").val(polygon._base_id);
		    _$("#partition_index").val(polygon._index);
		    _$("#partition_group").val(polygon._group);
		    _$("#partition_area").val(polygon.mianji);
		    _$("#partition_description").val(polygon._description);
		    _$("input[name='partitionFormColor']").val(polygon.get("fillColor"));
   		    _$("#partitionForm\\:color-colorPicker-hex").val(polygon.get("fillColor").replace("#",""));
   		    _$(".rich-color-picker-icon").css("background-color",polygon.get("fillColor"));
   		    setMapNull();
		});
		_$(".use_field").hide();
		_$(".land_test_").hide();
		_$(".soil_table").empty();
		_$(".land_table").empty();
		_$("#partition_x").val(polygon.partition_x);
		_$("#partition_y").val(polygon.partition_y);
		_$("#partition_name").val(polygon._name);
		_$("#partition_id").val(polygon._id);
	    _$("#base_id").val(polygon._base_id);
	    _$("#partition_group").val(polygon._group);
	    _$("#partition_area").val(polygon.mianji);
	    _$("#partition_index").val(polygon._index);
	    _$("#partition_description").val(polygon._description);
	    _$("input[name='partitionFormColor']").val(polygon.get("fillColor"));
	    _$("#partitionForm\\:color-colorPicker-hex").val(polygon.get("fillColor").replace("#",""));
	    _$(".rich-color-picker-icon").css("background-color",polygon.get("fillColor"));
	    _$(".rightNo").hide();
		_$(".rightNo3").show();
		_$("#divtittle").text("编辑区域分区");
		if(_$(".splitbuttonV").attr("class")=="splitbuttonV"){
			_$(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
			var wait=setInterval(function(){
			     if(jQuery13('#rightPane').width()+50>=368){
			         jQuery13('#rightPane').css('width',368);
				 clearInterval(wait);
			     }else{
			         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()+50);
			     }
			     jQuery13('#CenterAndRight').trigger('resize');
			}, 10);
		}		_$(".tc_top_03").show();
		_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
		_$(".btnOpen").hide();
		mark2Array.push(polygon);
		drawingManager.setDrawingMode(null);
		setSelection(polygon);
	}
	return;
	}
	var b2 = false;
	var b2_ = false;
	var bounds;
	if(mtype==3){//大棚
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
						b2=true;
						break;
					}
				}
				break;
				/*
				if(b2)
					break;
				if(!b2){///检测是否与其他大棚冲突
					if(m._list){
						for(var t = 0;t<m._list.length;t++){
							var _polygon = m._list[t];
							if(_polygon.getMap()!=null){
								var path = _polygon.getPath().getArray();
								var bounds1 = new google.maps.LatLngBounds();
								for(var x = 0;x<path.length;x++){
									bounds1.extend(path[x]);
								}
								if(bounds.intersects(bounds1)){
									alert("大棚重复");
									polygon.setMap(null);
									b2=true;
									break;
								}
							}else if(t==m._list.length-1){
								m._list.push(polygon);
							}
						}
					}else{
						var newa = new Array();
						newa.push(polygon);
						m._list=newa;
					}
				}
				*/
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
		for(var i = 0;i<mark2Array.length;i++){
			m = mark2Array[i];
			if(m.Contains(array[0])&&m.getMap()!=null){
				bounds = new google.maps.LatLngBounds();
				bounds.extend(array[0]);
				for(var j = 1;j<array.length;j++){
					bounds.extend(array[j]);
					if(!m.Contains(array[j])){
						//alert("请画在区域内");
						//polygon.setMap(null);
						b2=false;
						b2_=true;
						//break;
					}else if(j==array.length-1){
						b2 = false;
						break;
					}
				}
				break;
			}else if(i==mark2Array.length-1){
				b2=false;
				b2_=true;
				break;
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
		if(_$("#divFloatToolsView_").css("width").replace("px","")>1&&_$(".rightNo5").is(":visible")&&noPaint!=null&&noPaint._group==''){
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
			polygon._color="";
			polygon._long=noPaint._long;
			polygon._width=noPaint._width;
			polygon._height=noPaint._height;
			polygon._regulate=noPaint._regulate;
			polygon._collects=noPaint._collects;
			polygon._farmer=noPaint._farmer;
			polygon._envlist=noPaint._envlist;
			polygon._muarea=noPaint._muarea;
			polygon._index=noPaint._index;
		}else{
			polygon._group_parent_id=m._id;
			polygon._parent=m;
			polygon._name="";
			polygon._id="";
			polygon._group_type=drawingManager.select;
			polygon._group=pointStr;
			polygon._color="";
			polygon._long="";
			polygon._width="";
			polygon._height="";
			polygon._regulate="";
			polygon._collects="";
			polygon._farmer="";
			polygon._envlist="";
			polygon._muarea="";
			polygon._index=++third__index;
		}
		polygon.group_x=bounds.getCenter().lat();
		polygon.group_y=bounds.getCenter().lng();
		var radius = polygon.getPath();   
		google.maps.event.addListener(radius, 'insert_at',function(index){reset3(polygon,radius,index,this);} );
		google.maps.event.addListener(radius, 'remove_at',function(index){reset3(polygon,radius,index,this);});
		google.maps.event.addListener(radius, 'set_at', function(index){reset3(polygon,radius,index,this);});
		google.maps.event.addDomListener(polygon, 'dblclick', function(event) {
			if(backname==""){
				_$("#upname").closest("li").hide();
			}else{
				_$("#upname").closest("li").show();
				_$("#upname").html(backname);
			}
			 _$(".tc_rw_rw2").scrollTop(0);
			if(event) {
				_$("#groupbutton1").show();
				_$("#groupbutton2").hide();
				ret = 1;
			}else{
				_$("#groupbutton1").hide();
				_$("#groupbutton2").show();
				ret = 2;
			}
			var tempName = "";
			for(var w = 0;w<mark2Array.length;w++){
				if(mark2Array[w]._id==polygon._group_parent_id)
					tempName = mark2Array[w]._name;
			}
			_$("#group_type").val(polygon._group_type);
			_$("#group_type_default").val(polygon._group_type);
			_$("#group_type").selectmenu("destroy").selectmenu({style:'dropdown'});
			if(polygon._group_parent_id>0){
				_$("#group_parent_id").val(polygon._group_parent_id);
				_$("#group_parent_id_default").val(polygon._group_parent_id);
				_$("#group_parent_id").selectmenu("destroy").selectmenu({style:'dropdown'});
			}else{
				_$("#group_parent_id")[0].selectedIndex = 0;
				_$("#group_parent_id_default").val(0);
				_$("#group_parent_id").selectmenu("destroy").selectmenu({style:'dropdown'});
			}
		    //_$("#group_farmer").selectmenu("destroy").val(_$("#group_farmer option[index='0']").val()).selectmenu({style:'dropdown'});
		    //_$("#group_farmer1").selectmenu("destroy").val(_$("#group_farmer1 option[index='0']").val()).selectmenu({style:'dropdown'});
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
		    _$("#env_type").val(polygon._group_type);
		    if(!polygon._id||polygon._id==null)
		    	_$("#nowplant").hide();
		    else
		    	_$("#nowplant").hide();
		    _$(".tec_c").empty();
		    _$(".tec_c").append(html);
		    _$('#group_farmer').val(polygon._keeperId);
			_$('#group_farmer1').val(polygon._masterId);
			setSelection(polygon);
			_$(".rightNo").hide();
			_$(".rightNo5").show();
			_$("#divtittle").text("编辑区域");
			_$("#group_farmer").selectmenu("destroy").selectmenu({style:'dropdown'});
			_$("#group_farmer1").selectmenu("destroy").selectmenu({style:'dropdown'});
			_$(".rich-calendar-input").addClass("r_c_text_date");
		    _$(".rich-calendar-input").removeClass("rich-calendar-input");
		    _$(".ui-selectmenu-dropdown").addClass("small322");
		    _$(".ui-selectmenu-dropdown").removeClass("ui-selectmenu-dropdown");
		    _$(".ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
		    _$(".ui-selectmenu-menu").removeClass("ui-selectmenu-menu");
		    if(_$(".splitbuttonV").attr("class")=="splitbuttonV"){
				_$(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
				var wait=setInterval(function(){
				     if(jQuery13('#rightPane').width()+50>=368){
				         jQuery13('#rightPane').css('width',368);
					 clearInterval(wait);
				     }else{
				         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()+50);
				     }
				     jQuery13('#CenterAndRight').trigger('resize');
				}, 10);
			}
			_$(".tc_top_03").show();
			_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
			_$("#group_x").val(polygon.group_x);
			_$("#group_y").val(polygon.group_y);
			_$(".btnOpen").hide();
			_$("#group_name").val(polygon._name);
			_$("#group_id").val(polygon._id);
		    _$("#group_parent_id").val(polygon._group_parent_id);
		    _$("#group_index").val(polygon._index);
		    _$("#group_group").val(polygon._group);
		    _$("#group_area").val(polygon.mianji);
		    _$("#group_area_hidden").text(polygon.mianji+"亩");
		    _$("#group_type").val(polygon._group_type);
		    _$("#group_farmer").val(polygon._keeperId);
		    _$("#group_farmer1").val(polygon._masterId);
		    _$("#group_long").val(polygon._long);
		    _$("#group_width").val(polygon._width);
		    _$("#group_height").val(polygon._height);
		    _$("#muarea").val(polygon._muarea);
		    _$(".ui-selectmenu-dropdown").addClass("small322");
		    _$(".ui-selectmenu-dropdown").removeClass("ui-selectmenu-dropdown");
		    _$(".ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
		    _$(".ui-selectmenu-menu").removeClass("ui-selectmenu-menu");
		    //clickOptions(_$("#group_farmer").attr("aindex"),_$("#group_farmer").find("option[value="+polygon._keeperId+"]").index(),"group_farmer");
		  //clickOptions(_$("#group_farmer1").attr("aindex"),_$("#group_farmer1").find("option[value="+polygon._masterId+"]").index(),"group_farmer1");
		    if(polygon._group_type<5&&false)
		    	_$(".firstblock").show();
		    else
		    	_$(".firstblock").hide();
		    if(ret==1){
				_$("#groupbutton1").show();
				_$("#groupbutton2").hide();
			}else{
				_$("#groupbutton1").hide();
				_$("#groupbutton2").show();
			}
			ret = 1;
		    loaddevic(drawingManager.select,polygon._envlist);
		    _$("input[name='groupFormColor']").val(polygon.get("fillColor"));
   		    _$("#groupForm\\:color-colorPicker-hex").val(polygon.get("fillColor").replace("#",""));
   		    _$(".rich-color-picker-icon").css("background-color",polygon.get("fillColor"));
   		    map.setCenter(bounds.getCenter());
			map.setZoom(19);
   		/*var _height = document.body.clientHeight- 161;
   		if(_$(".rightNo5").find(".jScrollbar_mask").height()>_height){
   			_$(".rightNo5").find(".jScrollbar_draggable").show();
   			_$(".rightNo5").find(".tc_rw_rw2").jScrollbar();
   			_$(".rightNo5").find(".jScrollbar_mask").css("top","0");
   			_$(".rightNo5").find(".ui-draggable").css("top","0");
   		}else{
   			_$(".rightNo5").find(".jScrollbar_draggable").hide();
   			_$(".rightNo5").find(".jScrollbar_mask").css("top","0");
   			_$(".rightNo5").find(".ui-draggable").css("top","0");
   		}*/
   		    setMapNull();
		});
		if(backname==""){
			_$("#upname").closest("li").hide();
		}else{
			_$("#upname").closest("li").show();
			_$("#upname").html(backname);
		}
		_$("#group_type").val(polygon._group_type);
		_$("#group_type_default").val(polygon._group_type);
		_$("#group_type").selectmenu("destroy").selectmenu({style:'dropdown'});
		if(polygon._group_parent_id>0){
			_$("#group_parent_id").val(polygon._group_parent_id);
			_$("#group_parent_id_default").val(polygon._group_parent_id);
			_$("#group_parent_id").selectmenu("destroy").selectmenu({style:'dropdown'});
		}else{
			_$("#group_parent_id")[0].selectedIndex = 0;
			_$("#group_parent_id_default").val(0);
			_$("#group_parent_id").selectmenu("destroy").selectmenu({style:'dropdown'});
		}
		_$("#group_parent_name").text(m._name);
		_$('#group_farmer')[0].selectedIndex = 0;
		_$('#group_farmer1')[0].selectedIndex = 0;
		//_$("#group_farmer").selectmenu("destroy").val(_$("#group_farmer option[index='0']").val()).selectmenu({style:'dropdown'});
	    //_$("#group_farmer1").selectmenu("destroy").val(_$("#group_farmer1 option[index='0']").val()).selectmenu({style:'dropdown'});
	    _$(".rich-calendar-input").addClass("r_c_text_date");
	    _$(".rich-calendar-input").removeClass("rich-calendar-input");
	    _$(".ui-selectmenu-dropdown").addClass("small322");
	    _$(".ui-selectmenu-dropdown").removeClass("ui-selectmenu-dropdown");
	    _$(".ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
	    _$(".ui-selectmenu-menu").removeClass("ui-selectmenu-menu");
	    _$("#envType_").html(envTypeList[polygon._group_type]);
		_$(".rightNo").hide();
		_$(".rightNo5").show();
		_$("#divtittle").text("编辑区域");
		_$("#group_farmer").selectmenu("destroy").selectmenu({style:'dropdown'});
		_$("#group_farmer1").selectmenu("destroy").selectmenu({style:'dropdown'});
		_$(".rich-calendar-input").addClass("r_c_text_date");
	    _$(".rich-calendar-input").removeClass("rich-calendar-input");
	    _$(".ui-selectmenu-dropdown").addClass("small322");
	    _$(".ui-selectmenu-dropdown").removeClass("ui-selectmenu-dropdown");
	    _$(".ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
	    _$(".ui-selectmenu-menu").removeClass("ui-selectmenu-menu");
	    if(_$(".splitbuttonV").attr("class")=="splitbuttonV"){
			_$(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
			var wait=setInterval(function(){
			     if(jQuery13('#rightPane').width()+50>=368){
			         jQuery13('#rightPane').css('width',368);
				 clearInterval(wait);
			     }else{
			         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()+50);
			     }
			     jQuery13('#CenterAndRight').trigger('resize');
			}, 10);
		}
		_$("#nowplant").hide();
		var html='<div class="clear"></div>';
	    _$(".tec_c").empty();
	    _$(".tec_c").append(html);
		_$(".tc_top_03").show();
		_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
		_$("#group_x").val(polygon.group_x);
		_$("#group_y").val(polygon.group_y);
		_$(".btnOpen").hide();
		_$("#group_name").val(polygon._name);
		_$("#group_id").val(polygon._id);
	    _$("#group_parent_id").val(polygon._group_parent_id);
	    _$("#group_index").val(polygon._index);
	    _$("#group_group").val(polygon._group);
	    _$("#group_area").val(polygon.mianji);
	    _$("#group_area_hidden").text(polygon.mianji+"亩");
	    _$("#group_type").val(polygon._group_type);
	    _$("#group_farmer").val(polygon._keeperId);
	    _$("#group_farmer1").val(polygon._masterId);
	    _$("#muarea").val(polygon.mianji);
	  //clickOptions(_$("#group_farmer").attr("aindex"),0,"group_farmer");
	 // clickOptions(_$("#group_farmer1").attr("aindex"),0,"group_farmer1");
	    if(polygon._group_type<5&&false)
	    	_$(".firstblock").show();
	    else
	    	_$(".firstblock").hide();
	    _$("#group_long").val(polygon._long);
	    _$("#group_width").val(polygon._width);
	    _$("#group_height").val(polygon._height);
	    loaddevic(drawingManager.select,polygon._envlist);
	    _$("input[name='groupFormColor']").val(polygon.get("fillColor"));
	    _$("#groupForm\\:color-colorPicker-hex").val(polygon.get("fillColor").replace("#",""));
	    _$(".rich-color-picker-icon").css("background-color",polygon.get("fillColor"));
	    setMapNull();
	    drawingManager.setDrawingMode(null);
	    setSelection(polygon);
	  /*var _height = document.body.clientHeight- 161;
	  if(_$(".rightNo5").find(".jScrollbar_mask").height()>_height){
	  	_$(".rightNo5").find(".jScrollbar_draggable").show();
	  	_$(".rightNo5").find(".tc_rw_rw2").jScrollbar();
	  	_$(".rightNo5").find(".jScrollbar_mask").css("top","0");
	  	_$(".rightNo5").find(".ui-draggable").css("top","0");
	    	}else{
	  	_$(".rightNo5").find(".jScrollbar_draggable").hide();
	   	_$(".rightNo5").find(".jScrollbar_mask").css("top","0");
	   	_$(".rightNo5").find(".ui-draggable").css("top","0");
	   }*/
	    if(!selected){
	    	mark3Array.push(polygon);
	    }else{
	    	for(var i = 0;i<mark3Array.length;i++){
	    		if(mark3Array[i]._id == polygon._id){
	    			mark3Array[i] = polygon;
	    		}
	    	}
	    }
	}
});
	//循环显示 经纬度  
	function showLonLat( arr){  
		alert(">>>>>>>>>>>>>");
		for(var i=0; i<arr.length;i++){  
		//alert(arr[i]);  
		};  
	}   
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
		
		//基地加载
		loadfirst();
		//分区加载
		loadsecond();
		//区域加载
		loadthird();
		loadfourth();
		loadfifth();
		ts_check();
		setTimeout(function(){_$(".gm-style").find("div:eq(0)").find("div:eq(0)").next().hide();},500);
		
	});
}  

function goAPS_next(){
	//_$("#goAPS2").trigger("click");
	window.location.href=workpath+"/map/APS.seam";
}

function ts_check(){
	if(array_mark.length==0){
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

function tsStep(index){
	if(index == 4){
		_$("#goAPS").unbind("click");
		_$("#goAPS").click(function(){goAPS();});
	}else{
		_$("#goAPS").unbind("click");
	}
	if(index == 5){
		_$(".tscolse").show();
	}
	_$(".ts6bdiv").show();
	_$(".tsbgco div:first-child>div").hide();
	_$(".tsbgco div:first-child>div:eq("+index+")").show();
	_$(".tsbzd a").attr("class","ts_step1");
	_$(".tsbzd a:eq("+index+")").attr("class","ts_step2");
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

//大棚的采集设备,调节设备显示
function loaddevic (index,has1){
	var one = collects["m"+index];
	_$(".tc_str_check1").empty();
	for(var i = 0;i<one.length;i++){
		var obj = one[i];
		var a = false;
		if(has1&&has1!=null&&has1.length>0){
			var b = has1.split(",");
			for(var j = 0;j<b.length;j++){
				if(obj[0]==b[j]){
					a = true;
					break;
				}
			}
		}
		var str = "";
		if(a){
			str = '<div class="la_div"><a href="#" class="new_checkbox1" a="'+obj[0]+'" onclick="checkbox1(this)"></a><font class="s_pan">'+obj[1]+'</font></div>';
		}else{
			str = '<div class="la_div"><a href="#" class="new_checkbox1_2" a="'+obj[0]+'" onclick="checkbox1(this)"></a><font class="s_pan">'+obj[1]+'</font></div>';
		}
		_$(".tc_str_check1").append(str);
	}
	var two = regulate["m"+index];
	_$(".tc_str_check2").empty();
	for(var i = 0;i<two.length;i++){
		var obj = two[i];
		var a = false;
		if(has1&&has1!=null&&has1.length>0){
			var b = has1.split(",");
			for(var j = 0;j<b.length;j++){
				if(obj[0]==b[j]){
					a = true;
					break;
				}
			}
		}
		var str = "";
		if(a){
			str = '<div class="la_div"><a href="#" class="new_checkbox2" a="'+obj[0]+'" onclick="checkbox2(this)"></a><font class="s_pan">'+obj[1]+'</font></div>';
		}else{
			str = '<div class="la_div"><a href="#" class="new_checkbox2_2" a="'+obj[0]+'" onclick="checkbox2(this)"></a><font class="s_pan">'+obj[1]+'</font></div>';
		}
		_$(".tc_str_check2").append(str);
	}
}
mapclick = function(){
	if(_$("#detail").is(":visible")){
		_$("#detail").hide();
		if (selectedShape) {
         selectedShape.mianji=_$("#detail").val();
	      selectedShape.type1=_$("#type").val();
		}
	}
clearSelection();
};

//基地边线监控
function reset1(newShape,radius,index,obj) {
	var mianji = google.maps.geometry.spherical.computeArea(radius)*0.0015;
	mianji = CurrencyFormatted(mianji);
	var pointStr ="";
	  var array= newShape.getPath().getArray();
	  for(var i = 0;i<array.length;i++){
			pointStr+=array[i]+"_";
	  }
	newShape.mianji=mianji;
	_$("#mark_coordinate_group").val(pointStr);
	//_$("#mark_div").show();
	_$("#mark_area").val(mianji);
};

//大棚范围监控
function reset3(newShape,radius,index,obj) {
	var array= newShape.getPath().getArray();
	var b2=false;
	var strs = _$("#group_group").val();
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
	for(var i = 0;i<mark1Array.length;i++){
		m = mark1Array[i];
		var bounds = new google.maps.LatLngBounds();
		if(m.Contains(array[0])){
			for(var j = 1;j<array.length;j++){
				bounds.extend(array[j]);
				if(!m.Contains(array[j])){
					alert("请画在厂区图内");
					reset33(tempArray);
					b2=true;
					_$(".model3").removeClass("on");
					return;
				}
			}
			break;
		}else if(i==mark1Array.length-1){
			alert("请画在厂区图内");
			reset33(tempArray);
			b2=true;
			_$(".model3").removeClass("on");
			return;
		}
	}
	var b2_ = false;
	var m;
	for(var i = 0;i<mark2Array.length;i++){
		m = mark2Array[i];
		if(m.Contains(array[0])&&m.getMap()!=null){
			bounds = new google.maps.LatLngBounds();
			bounds.extend(array[0]);
			for(var j = 1;j<array.length;j++){
				bounds.extend(array[j]);
				if(!m.Contains(array[j])){
					b2=false;
					b2_=true;
				}else if(j==array.length-1){
					b2 = false;
					break;
				}
			}
			break;
		}else if(i==mark2Array.length-1){
			b2=false;
			b2_=true;
			break;
		}
	}
	
	if(b2_){
		m = new Object();
		m.id = 0;
		m.name = "暂无数据";
	}
	newShape._group_parent_id=m._id;
	newShape._parent=m;
	_$("#group_parent_id").val(newShape._group_parent_id);
	_$("#group_parent_id").selectmenu("destroy").selectmenu({style:'dropdown'});
    _$(".ui-selectmenu-dropdown").addClass("small322");
    _$(".ui-selectmenu-dropdown").removeClass("ui-selectmenu-dropdown");
    _$(".ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
    _$(".ui-selectmenu-menu").removeClass("ui-selectmenu-menu");
	
	_$("#group_x").val(bounds.getCenter().lat());
	_$("#group_y").val(bounds.getCenter().lng());
	var mianji = google.maps.geometry.spherical.computeArea(radius)*0.0015;
	mianji = CurrencyFormatted(mianji);
	var pointStr ="";
	  var array= newShape.getPath().getArray();
	  for(var i = 0;i<array.length;i++){
			pointStr+=array[i]+"_";
	  }
	newShape.mianji=mianji;
	_$("#group_group").val(pointStr);
	//_$("#mark_div").show();
	_$("#group_area").val(mianji);
	_$("#group_area_hidden").text(mianji+"亩");
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
	var undoimg = _$("img[src_$='http://maps.gstatic.com/mapfiles/undo_poly.png']");
	var m = newShape;
	var array= newShape.getPath().getArray();
	var b1=false;
	var strs = _$("#partition_group").val();
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
	for(var i = 0;i<mark1Array.length;i++){
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
	_$("#partition_x").val(bounds.getCenter().lat());
	_$("#partition_y").val(bounds.getCenter().lng());
	mianji = CurrencyFormatted(mianji);
	var pointStr ="";
	  var array= newShape.getPath().getArray();
	  for(var i = 0;i<array.length;i++){
			pointStr+=array[i]+"_";
	  }
	newShape.mianji=mianji;
	_$("#partition_group").val(pointStr);
	//_$("#mark_div").show();
	_$("#partition_area").val(mianji);
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
	/*
	var undoimg = _$("img[src_$='http://maps.gstatic.com/mapfiles/undo_poly.png']");
	if(newShape.mtype==1&&mark1Array.length>1){
		var m = newShape;
		var bounds = new google.maps.LatLngBounds();
		  var array= m.getPath().getArray();
		  for(var i = 0;i<array.length;i++){
				bounds.extend(array[i]);
		  }
		 for(var i = 0;i<mark1Array.length;i++){//检测厂区之间是否重叠
			var m2=mark1Array[i];
			if(m2.getMap()!=null&&m.	_marker._index!=m2._marker._index){
				var path = m2.getPath().getArray();
				var bounds1 = new google.maps.LatLngBounds();
				for(var x = 0;x<path.length;x++){
					bounds1.extend(path[x]);
				}
				if(bounds.intersects(bounds1)){
					alert("厂区图重复");
				undoimg.trigger("click");
				 return;
				}
			}
		 }
	}else if(newShape.mtype==2){
		
		var array= newShape.getPath().getArray();
		var b1=false;
		for(var i = 0;i<mark1Array.length;i++){
			m = mark1Array[i];
			if(m.Contains(array[0])){
				var bounds = new google.maps.LatLngBounds();
				bounds.extend(array[0]);
				for(var j = 1;j<array.length;j++){
					bounds.extend(array[j]);
					if(!m.Contains(array[j])){
						alert("请画在厂区图内");
						undoimg.trigger("click");
						b1=true;
						return;
					}
				}
				if(b1)
					break;
				if(!b1){///检测是否与其他区域冲突
					if(m._list){
						for(var t = 0;t<m._list.length;t++){
							var _polygon = m._list[t];
							if(_polygon.getMap()!=null){
								var path = _polygon.getPath().getArray();
								var bounds1 = new google.maps.LatLngBounds();
								for(var x = 0;x<path.length;x++){
									bounds1.extend(path[x]);
								}
								if(bounds.intersects(bounds1)){
									alert("区域图重复");
									obj.removeAt(j); 
									b1=true;
									return;
								}
							}
						}
					}
				}
			}else if(i==mark1Array.length-1){
				alert("请画在厂区图内");
				undoimg.trigger("click");
				b1=true;
				return;
			}
		}
	}else if(newShape.mtype==3){
		var array= newShape.getPath().getArray();
		var b2=false;
		for(var i = 0;i<mark2Array.length;i++){
			m = mark2Array[i];
			var bounds = new google.maps.LatLngBounds();
			if(m.Contains(array[0])){
				for(var j = 1;j<array.length;j++){
					bounds.extend(array[j]);
					if(!m.Contains(array[j])){
						alert("请画在区域内");
						undoimg.trigger("click");
						b2=true;
						return;
					}
				}
				if(b2)
					break;
				if(!b2){///检测是否与其他大棚冲突
					if(m._list){
						for(var t = 0;t<m._list.length;t++){
							var _polygon = m._list[t];
							if(_polygon.getMap()!=null){
								var path = _polygon.getPath().getArray();
								var bounds1 = new google.maps.LatLngBounds();
								for(var x = 0;x<path.length;x++){
									bounds1.extend(path[x]);
								}
								if(bounds.intersects(bounds1)){
									alert("大棚重复");
									undoimg.trigger("click");
									b2=true;
									return;
								}
							}
						}
					}
				}
			}else if(i==mark1Array.length-1){
				alert("请画在区域内");
				undoimg.trigger("click");
				b2=true;
				return;
			}
		}

	}*/
	var mianji = google.maps.geometry.spherical.computeArea(radius)*0.0015;
	mianji = CurrencyFormatted(mianji);
	newShape.mianji=mianji;
	_$("#detail").show();
	_$("#area").val(mianji);
	_$("#type").val(newShape.type1);
};
 
//根据以知 点绘制图形  
var bermudaTriangle;
function drawingPolygon(map) {  
 var triangleCoords = [  
   new google.maps.LatLng(39.88665649469955, 116.6621446609497),  
   new google.maps.LatLng(39.88458190061328, 116.66171550750732),  
   new google.maps.LatLng(39.88402207875533, 116.66463375091553),  
   new google.maps.LatLng(39.885964970312614,116.66497707366943),  
	new google.maps.LatLng(39.88665649469955, 116.6621446609497)  
	
 ];  
 bermudaTriangle = new google.maps.Polygon({  
   paths: triangleCoords,  
   strokeColor: "#FF0000",  
   strokeOpacity: 0.8,  
   strokeWeight: 2,  
   fillColor: "#FF0000",  
   fillOpacity: 0.35,  
   editable: true
 });  
 google.maps.event.addDomListener(bermudaTriangle, 'mouseover', function(){//alert(1)
 }); 
google.maps.event.addDomListener(bermudaTriangle, 'click', function(event){//alert(1)
	alert(bermudaTriangle.Contains(event.latLng));
 }); 
 
// bermudaTriangle.setMap(map);  
}  
//加载地图
_$(document).ready(function(){
		initialize();
		_$("#map-canvas").mousedown(function(e){
			if(e.which==3){
				var model = drawingManager.getDrawingMode();
				if(model!=null){
					drawingManager.isshow=false;
					drawingManager.setDrawingMode(null);
					drawingManager.isshow=true;
					drawingManager.setDrawingMode(model);
				}
			}
		});
});
//基地绘画
function xx(){
	if(!checkissubmit(1)){
		return;
	}
	if(_$("#divFloatToolsView_").css("width").replace("px","")>1&&_$("#aFloatTools_Show").is(":hidden")){
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
	drawingManager.mytype="1";
	//添加画图事件
	drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
	_$(".model3").removeClass("on");
	_$("#model2").parent().attr("class","mapone");
	_$(".model4").removeClass("on");
	if(_$("#model1").parent().hasClass("maptwo")){
		_$("#model1").parent().attr("class","mapone");
		clearMap();
	}else{
		_$("#model1").parent().attr("class","maptwo");
	}
}

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
    }
    
function xx1(){
	if(!checkissubmit(2)){
		return;
	}
	if(_$("#divFloatToolsView_").css("width").replace("px","")>1&&_$("#aFloatTools_Show").is(":hidden")){
		//alert("请先保存或取消之前的操作!");
		//return;
	}
	if(mark1Array.length==0){
		alert("请先画厂区图");
		return ;
	}
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
	_$(".model3").removeClass("on");
	_$("#model1").parent().attr("class","mapone");
	_$(".model4").removeClass("on");
	if(_$("#model2").parent().hasClass("maptwo")){
		_$("#model2").parent().attr("class","mapone");
		clearMap();
	}else{
		_$("#model2").parent().attr("class","maptwo");
	}
}
//大棚绘画
function xx2(index){
	if(!checkissubmit(3)){
		return;
	}
	if(_$("#divFloatToolsView_").css("width").replace("px","")>1&&_$("#aFloatTools_Show").is(":hidden")){
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
	drawingManager.select=index+1;
	setMapNull();
	drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
	_$("#model1").parent().attr("class","mapone");
	_$("#model2").parent().attr("class","mapone");
	_$(".model4").removeClass("on");
	var b = true;
	if(_$(".model3:eq("+index+")").hasClass("on"))
		b = false;
	_$(".model3").removeClass("on");
	if(b){
		_$(".model3:eq("+index+")").addClass("on");
	}else{
		clearMap();
	}
}

function xx3(type){
	if(!checkissubmit(4)){
		return;
	}
	drawingManager.isshow=false;
	drawingManager.setDrawingMode(null);
	drawingManager.isshow=true;
	drawingManager.mytype="4";
	drawingManager.setDrawingMode(google.maps.drawing.OverlayType.MARKER);
	drawingManager.device_ = type;
	_$("#model1").parent().attr("class","mapone");
	_$("#model2").parent().attr("class","mapone");
	_$(".model3").removeClass("on");
	var index = type-1;
	var b = true;
	if(_$(".model4:eq("+index+")").hasClass("on"))
		b = false;
	_$(".model4").removeClass("on");
	if(b){
		_$(".model4:eq("+index+")").addClass("on");
	}else{
		clearMap();
	}
}

function ok (){
selectedShape.type1=_$("#type").val();
selectedShape.mian=_$("#type").val();
clearSelection();
_$("#detail").hide();
}
function no(){
clearSelection();
_$("#detail").hide();
}
function deleted(){
	if (selectedShape) {
		selectedShape._marker.setMap(null);
       selectedShape.setMap(null);
   }
	_$("#detail").hide();
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
                     _$("#weidu_id").val(lat);  
                     _$("#jingdu_id").val(lng);  
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
//描点
function _mark (){
	if(!checkissubmit(0)){
		return;
	}
	 _$(".model3").removeClass("on");
		drawingManager.isshow=false;
		drawingManager.setDrawingMode(null);
		drawingManager.isshow=true;
	drawingManager.setDrawingMode(google.maps.drawing.OverlayType.MARKER);
	drawingManager.device_ =null;
	drawingManager.mytype="0";
	_$(".model3").removeClass("on");
	_$("#model2").parent().attr("class","mapone");
	_$("#model1").parent().attr("class","mapone");
	_$(".model4").removeClass("on");
	  };
	  //描点完成
	  function mark_info_ok (){
			for(var i = 0;i<array_mark.length;i++){
				var m = array_mark[i];
				var name = "";
				alert(_$("#mark_info_index").val()+"--------------"+m._index);
				alert(_$("#mark_info_id").val()+"--------------"+m._id);
				if(m._index==_$("#mark_info_index").val()){
					name = m._name;
					m._name=_$("#mark_info_name").val();
					m._id=_$("#mark_info_id").val();
					m.setTitle(_$("#mark_info_name").val());
					var infowindow = m._infowindow;
					var content = infowindow.get("content");
					content = content.replace("<td width='200'>"+name+"<br/>联系人","<td width='200'>"+_$("#mark_info_name").val()+"<br/>联系人");
					infowindow.set("content",content);
//					m.setDraggable(true);
					if(m._ploygon)
						m._ploygon._name=m._name;
				}
			}
			displaymodel1(false);
			if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
				_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
				var wait=setInterval(function(){
				     if(jQuery13('#rightPane').width()-50<=0){
				         jQuery13('#rightPane').css('width',0);
					 clearInterval(wait);
				     }else{
				         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
				     }
				     jQuery13('#CenterAndRight').trigger('resize');
				}, 10);
			}
			ts_check();
		}
	  //取消描点
		function mark_info_no (){
			for(var i = 0;i<array_mark.length;i++){
				var m = array_mark[i];
				var name = "";
				if(m._index==_$("#mark_info_index").val()){
					if(m._id==""){
						m.setMap(null);
					}
				}
			}
			if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
				_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
				var wait=setInterval(function(){
				     if(jQuery13('#rightPane').width()-50<=0){
				         jQuery13('#rightPane').css('width',0);
					 clearInterval(wait);
				     }else{
				         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
				     }
				     jQuery13('#CenterAndRight').trigger('resize');
				}, 10);
			}
		}
		//删除描点
		function mark_info_delete(){
			for(var i = 0;i<array_mark.length;i++){
				var m = array_mark[i];
				if(m._index==_$("#mark_info_index").val()){//&&!m._btype
					if(m._id){
						delete_mark_info(m._id);
					}else{
						m.setMap(null);
						if(m._ploygon){
							m._ploygon.setMap(null);
						}
						clearSelection();
						if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
							_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
							var wait=setInterval(function(){
							     if(jQuery13('#rightPane').width()-50<=0){
							         jQuery13('#rightPane').css('width',0);
								 clearInterval(wait);
							     }else{
							         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
							     }
							     jQuery13('#CenterAndRight').trigger('resize');
							}, 10);
						}
						setMapNotNull();
					}
				}
			}
		}
		
		function mark_info_delete_next(data){
			if(data!=""){
				alert(data);
				return ;
			}
			for(var i = 0;i<array_mark.length;i++){
				var m = array_mark[i];
				if(m._index==_$("#mark_info_index").val()){//&&!m._btype
					m.setMap(null);
					array_mark = array_mark.del(i);
					if(m._ploygon){
						m._ploygon.setMap(null);
					}
				}
			}
			for(var i = 0 ;i<mark1Array.length;i++){
				var polygon = mark1Array[i];
				var marker = polygon._marker;
				if(marker._index==_$("#mark_info_index").val()){//&&!marker._btype
					mark1Array = mark1Array.del(i);
				}
			}
			clearSelection();
			if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
				_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
				var wait=setInterval(function(){
				     if(jQuery13('#rightPane').width()-50<=0){
				         jQuery13('#rightPane').css('width',0);
					 clearInterval(wait);
				     }else{
				         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
				     }
				     jQuery13('#CenterAndRight').trigger('resize');
				}, 10);
			}
			setMapNotNull();
		}
		//加载描点及基地范围
		function loadfirst (){
			var first = 0;
			mark__index = markstr.length;
			for(var i = 0;i<markstr.length;i++){
				if(first==0)
					first=1;
				var array = markstr[i];
				var point = new google.maps.LatLng(array.coordinateX, array.coordinateY);
//				alert(array.name+"-----------"+array.id);
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
				 google.maps.event.addListener(marker, 'rightclick', function(event) {
		    			
		    		});
				array_mark.push(marker);
				//加载基地弹出框显示
				attachSecretMessage(marker, array,i);
				var pointStr = array.coordinateGroup;
				
				pointStr = pointStr.replace(/[()]/g, '');
				//判断基地是否描点，基地的点是否可以移动
				if(pointStr.length==0){
					movemarker(marker);
					continue;
				}
				if(first<2)
					first=2;
				var triangleCoords = [];  
//				alert("pointStr------------"+pointStr);
				var strr = pointStr.split("_");
				for(var y = 0;y<strr.length;y++){
					var yy = strr[y].split(",");
					var temp = new google.maps.LatLng(parseFloat(yy[0]),parseFloat(yy[1]));
					triangleCoords.push(temp);
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
	            marker._ploygon=bermudaTriangle;
	            mark1Array.push(bermudaTriangle);
	            //加载基地范围可编辑
	            loadFirstPloygon(bermudaTriangle);
	            bermudaTriangle.setMap(map);
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
		//描点移动
		function movemarker(marker){
			marker.setDraggable(true);
			google.maps.event.addListener(marker, 'dragend',function(){
//				alert("描点移动触发");
//				alert("X---"+4);
				var xs=marker._coordinate_X-marker.getPosition().lat();
				var ys=marker._coordinate_Y-marker.getPosition().lng();
				marker._coordinate_X=marker.getPosition().lat();
				marker._coordinate_Y=marker.getPosition().lng();
				_$("#mark_info_name").val(marker._name);
				_$("#mark_info_index").val(marker._index);	
				var triangleCoords = []; 
				var strr = marker._ploygon._coordinate_group.replace(/[()]/g, '').split("_");
//				alert(marker._ploygon._coordinate_group);
				for(var y = 0;y<strr.length;y++){
					var yy = strr[y].split(",");
					var temp = new google.maps.LatLng((parseFloat(yy[0])-xs),(parseFloat(yy[1])-ys));
					triangleCoords.push(temp);
				}
				marker._ploygon.setPath(triangleCoords);
				var strGroup="";
				var array= marker._ploygon.getPath().getArray();
				var bounds = new google.maps.LatLngBounds();
				for(var i = 0;i<array.length;i++){
					bounds.extend(array[i]);
					strGroup+=array[i]+"_";
				}
				if(strGroup.indexOf("_") > 0 )
				{
					strGroup=strGroup.substring(0, strGroup.length-1);
				}
				marker._ploygon._coordinate_group=strGroup;
				
				_$("#mark_info_x").val(marker._coordinate_X);
				_$("#mark_info_y").val(marker._coordinate_Y);
				_$("#mark_info_id").val(marker._id);
				_$(".rightNo").hide();
				_$(".rightNo1").show();
				_$("#divtittle").text("编辑基地位置");
				if(_$(".splitbuttonV").attr("class")=="splitbuttonV"){
					_$(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
					var wait=setInterval(function(){
					     if(jQuery13('#rightPane').width()+50>=368){
					         jQuery13('#rightPane').css('width',368);
						 clearInterval(wait);
					     }else{
					         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()+50);
					     }
					     jQuery13('#CenterAndRight').trigger('resize');
					}, 10);
				}
				_$(".tc_top_03").show();
				_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
				_$(".btnOpen").hide();
			});
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
	              strokeWeight: 4,  
	              fillColor: array.color,  
	              fillOpacity: 0.45,  
	              editable: false
	            });  
	            if(array.coordinateX==0){
	            	bermudaTriangle.partition_x = bounds.getCenter().lat();
	            	bermudaTriangle.partition_y = bounds.getCenter().lng();
	            }else{
	            	bermudaTriangle.partition_x = array.coordinateX;
	            	bermudaTriangle.partition_y = array.coordinateY;
	            }
	            bermudaTriangle._index=i;
	            bermudaTriangle._name=array.name;
	            bermudaTriangle.mianji=array.muNumber;
	            bermudaTriangle._id=array.id;
	            bermudaTriangle._base_id=array.base;
	            bermudaTriangle._description=array.description;
	            bermudaTriangle._group=array.coordinateGroup;
	            mark2Array.push(bermudaTriangle);
	            loadSecondPloygon(bermudaTriangle,bounds);
	            bermudaTriangle.setMap(map);
			}
			if(secondstr.length>0||mark1Array.length>0)
				displaymodel2(false);
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
				//if(pointStr.length==0)
				//	continue;
				bermudaTriangle = new google.maps.Polygon({  
		              
		              strokeColor: array.color,  
		              strokeOpacity: 0.8,  
		              strokeWeight: 2,  
		              fillColor: array.color,  
		              fillOpacity: 0.5,  
		              editable: false,
		              zIndex:google.maps.Marker.MAX_ZINDEX + 1
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
				
	            if(array.latitude==0){
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
	            mark3Array.push(bermudaTriangle);
	            loadThirdPloygon(bermudaTriangle,bounds);
	            bermudaTriangle.setMap(map);
			}
			if(mark3Array.length>0)
				_$("#goAPS").click(function(){goAPS_next();});
			if(mark2Array.length>0)
				displaymodel3(false);
			else
				displaymodel3(true);
		}
		
		//打开与关闭基地绘图功能
		function displaymodel1(btype){
			var oj = _$("#model1>img:first-child");
			var ob = _$("#model1");
			if(btype){
				ob.attr("onclick","").click(function(){});
				ob.css("cursor","default");
				oj.attr("src",oj.attr("src").replace('map_icon0_05.png','map_icon0_055.png'));
				oj.attr("title","");
				/*
				ob.parent().parent().hover(function(){
					  _$(this).find('.hover_map').show();
				 },function(){
					 _$(this).find('.hover_map').hide();
				 });
				_$('#model0').parent().hover(function(){
					  _$(this).find('.hover_map').show();
					 },function(){
						 _$(this).find('.hover_map').hide();
					 });
				_$("#model0>img:first-child").attr("title","");*/
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
					_$('#model0').parent().unbind("mouseenter").unbind("mouseleave");
					_$("#model0>img:first-child").attr("title",_$("#model0>img:first-child").attr("aaa"));
				}
			}
		}
		//打开与关闭区域绘图功能
		function displaymodel2(btype){
			var oj = _$("#model2>img:first-child");
			var ob = _$("#model2");
			if(btype){
				ob.attr("onclick","").click(function(){});
				ob.css("cursor","default");
				oj.attr("src",oj.attr("src").replace('map_icon0_07.png','map_icon0_077.png'));
				oj.attr("title","");
				/*ob.parent().parent().hover(function(){
					  _$(this).find('.hover_map').show();
				 },function(){
					 _$(this).find('.hover_map').hide();
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
				
				/*_$(".model3").parent().hover(function(){
					  _$(this).find('.hover_map').show();
				 },function(){
					 _$(this).find('.hover_map').hide();
				 });*/
			}else{
				if(mark3Array.length>0){
					_$(".model3").parent().unbind("mouseenter").unbind("mouseleave");
				}
			}
			_$(".model3").each(function(index){
				var oj = _$(this).children("img")[0];
				if(btype){
					/*if(typeof _$(this).click === 'function'){
						
					}else{
						_$(this).attr("onclick","").click(function(){});
					}*/
					_$(this).css("cursor","default");
					_$(oj).attr("src",_$(oj).attr("src").replace('map_icon0_'+(index*2+9)+'.png','map_icon0_'+(index*2+9)+''+(index*2+9)+'.png'));
					_$(oj).attr("title","");
				}else{
					if(_$(this).attr("aa")=="aa"){
						
					}else{
						_$(this).attr("aa","aa");
						_$(this).attr("onclick","").click(function(){xx2(index);});
					}
					_$(this).css("cursor","pointer");
					_$(oj).attr("src",_$(oj).attr("src").replace('map_icon0_'+(index*2+9)+''+(index*2+9)+'.png','map_icon0_'+(index*2+9)+'.png'));
					_$(oj).attr("title",_$(oj).attr("aaa"));
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
//			alert("loadFirstPloygon");
			var radius = bermudaTriangle.getPath();   
    		google.maps.event.addListener(radius, 'insert_at',function(index){reset1(bermudaTriangle,radius,index,this);} );
    		google.maps.event.addListener(radius, 'remove_at',function(index){reset1(bermudaTriangle,radius,index,this);});
    		google.maps.event.addListener(radius, 'set_at', function(index){reset1(bermudaTriangle,radius,index,this);});
           google.maps.event.addDomListener(bermudaTriangle, 'dblclick', function(event){//alert(1)
       			setSelection(bermudaTriangle);
       			_$(".rightNo").hide();
    			_$(".rightNo2").show();
    			_$("#divtittle").text("编辑基地范围");
    			if(_$(".splitbuttonV").attr("class")=="splitbuttonV"){
    				_$(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
    				var wait=setInterval(function(){
    				     if(jQuery13('#rightPane').width()+50>=368){
    				         jQuery13('#rightPane').css('width',368);
    					 clearInterval(wait);
    				     }else{
    				         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()+50);
    				     }
    				     jQuery13('#CenterAndRight').trigger('resize');
    				}, 10);
    			}
    			_$(".tc_top_03").show();
    			_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
    			_$(".btnOpen").hide();
       			_$("#mark_id").val(bermudaTriangle._marker._id);
       		    _$("#mark_name").val(bermudaTriangle._name);
       		    _$("#mark_area").val(bermudaTriangle.mianji);
       		    _$("#mark_contact").val(bermudaTriangle._contact);
       		    _$("#mark_phone").val(bermudaTriangle._phone);
       		    _$("#mark_address").val(bermudaTriangle._address);
       		    _$("#mark_description").val(bermudaTriangle._description);
       		    _$("#mark_coordinate_group").val(bermudaTriangle._coordinate_group);
       		    _$("input[name='baseFormColor']").val(bermudaTriangle.get("fillColor"));
       		    _$("#baseForm\\:color-colorPicker-hex").val(bermudaTriangle.get("fillColor").replace("#",""));
       		    _$(".rich-color-picker-icon ").css("background-color",bermudaTriangle.get("fillColor"));
	       		setMapNull();
            }); 
			
		}
		
		//加载区域第二步
		function loadSecondPloygon(bermudaTriangle,bounds){
//			alert("loadSecondPloygon");
			var radius = bermudaTriangle.getPath();   
    		google.maps.event.addListener(radius, 'insert_at',function(index){reset2(bermudaTriangle,radius,index,this);} );
    		google.maps.event.addListener(radius, 'remove_at',function(index){reset2(bermudaTriangle,radius,index,this);});
    		google.maps.event.addListener(radius, 'set_at', function(index){reset2(bermudaTriangle,radius,index,this);});
    		/*var contentString = bermudaTriangle._name;
    		var infowindow = new google.maps.InfoWindow( {
				content : contentString,
				maxWidth : 200,
				minWidth : 100
			});
	
			var marker = new google.maps.Marker( {
				position : bounds.getCenter(),
				map : map,
				title : bermudaTriangle._name,
				icon : '../asset/images/zb1.png'
			});
			marker._infowindow = infowindow;
			bermudaTriangle._marker = marker;
			google.maps.event.addDomListener(marker, 'click', function() {
				infowindow.open(map, marker);
			});
			google.maps.event.addDomListener(marker, 'dblclick', function() {
				map.setCenter(marker.getPosition());
				map.setZoom(16);
			});*/
			google.maps.event.addDomListener(bermudaTriangle, 'dblclick', function(
					event) {// alert(1)
						setSelection(bermudaTriangle);
						_$(".rightNo").hide();
						_$(".rightNo3").show();
						_$("#divtittle").text("编辑区域分区");
						_$(".tc_top_03").show();
						if(_$(".splitbuttonV").attr("class")=="splitbuttonV"){
							_$(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
							var wait=setInterval(function(){
							     if(jQuery13('#rightPane').width()+50>=368){
							         jQuery13('#rightPane').css('width',368);
								 clearInterval(wait);
							     }else{
							         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()+50);
							     }
							     jQuery13('#CenterAndRight').trigger('resize');
							}, 10);
						}
						_$(".use_field").show();
						_$(".land_test_").show();
						var html = "";
						_$(".soil_table").empty();
						for(var i = 0;i<soilStr.length;i++){
							var tem = soilStr[i];
							if(tem.partitionId==bermudaTriangle._id){
								var te = _$("#soil_route_of").find("option[value="+tem.route_of+"]").html();
								if(te==null)
									te="";
								html+="<tr class='soill"+tem.id+"'><td class='bc_th01'>"+tem.begin_time+"年"+tem.end_time+"年</td><td  class='bc_th01' >"+te+"</td><td  class='bc_th01'><a href='#' onclick='editsoil("+tem.id+")'>修改</a>  <a href='#' onclick='delsoil("+tem.id+")'>删除</a></td></tr>";
							}
						}
						if(html!=""){
							html = "<tr><td class='bc_th01'>时间</td><td class='bc_th01'>用途</td><td class='bc_th01' style='width:20%'>操作</td></tr>"+html;
							_$(".soil_table").empty().append(html);
						}
						
						var html2 = "";
						_$(".land_table").empty();
						for(var i = 0;i<landStr.length;i++){
							var tem = landStr[i];
							if(tem.partitionId==bermudaTriangle._id){
								html2+="<tr class='land"+tem.id+"'><td class='bc_th01'>"+tem.testDate+"</td><td  class='bc_th01' >"+tem.testOrg+"</td><td  class='bc_th01' >"+tem.phVal+"</td><td  class='bc_th01'><a href='#' onclick='editland("+tem.id+")'>修改</a>  <a href='#' onclick='delland("+tem.id+")'>删除</a></td></tr>";
							}
						}
						if(html2!=""){
							html2 = "<tr><td class='bc_th01'>测试日期</td><td class='bc_th01'>测试机构</td><td class='bc_th01'>酸碱度</td><td class='bc_th01' style='width:20%'>操作</td></tr>"+html2;
							_$(".land_table").empty().append(html2);
						}
						
						
						if(bounds.getCenter().lat()!=0&&bounds.getCenter().lng()!=-180){
						    map.setCenter(bounds.getCenter());
							map.setZoom(17);
					    }
						_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
						_$(".btnOpen").hide();
						_$("#partition_x").val(bermudaTriangle.partition_x);
						_$("#partition_y").val(bermudaTriangle.partition_y);
						_$("#partition_name").val(bermudaTriangle._name);
						_$("#partition_id").val(bermudaTriangle._id);
						_$("#base_id").val(bermudaTriangle._base_id);
						_$("#partition_index").val(bermudaTriangle._index);
						_$("#partition_group").val(bermudaTriangle._group);
						_$("#partition_area").val(bermudaTriangle.mianji);
						_$("#partition_description").val(bermudaTriangle._description);
						_$("input[name='partitionFormColor']").val(bermudaTriangle.get("fillColor"));
						_$("#partitionForm\\:color-colorPicker-hex").val(bermudaTriangle.get("fillColor").replace("#", ""));
						_$(".rich-color-picker-icon ").css("background-color",bermudaTriangle.get("fillColor"));
						setMapNull();
					}); 
			
		}
		
		//加载大棚第三步
		function loadThirdPloygon(bermudaTriangle,bounds){
			var radius = bermudaTriangle.getPath();   
    		google.maps.event.addListener(radius, 'insert_at',function(index){reset3(bermudaTriangle,radius,index,this);} );
    		google.maps.event.addListener(radius, 'remove_at',function(index){reset3(bermudaTriangle,radius,index,this);});
    		google.maps.event.addListener(radius, 'set_at', function(index){reset3(bermudaTriangle,radius,index,this);});
			google.maps.event.addDomListener(bermudaTriangle, 'dblclick', function(
					event) { //alert(1)
				if(backname==""){
					_$("#upname").closest("li").hide();
				}else{
					_$("#upname").closest("li").show();
					_$("#upname").html(backname);
				}
				if(event) {
					_$("#groupbutton1").show();
					_$("#groupbutton2").hide();
					ret = 1;
				}else{
					_$("#groupbutton1").hide();
					_$("#groupbutton2").show();
					ret = 2;
				}
				_$("#envType_").html(envTypeList[bermudaTriangle._group_type]);
				_$(".tc_rw_rw2").scrollTop(0);
				var tempName = "";
				for(var w = 0;w<mark2Array.length;w++){
					if(mark2Array[w]._id==bermudaTriangle._group_parent_id)
						tempName = mark2Array[w]._name;
				}
				_$("#group_type").val(bermudaTriangle._group_type);
				_$("#group_type_default").val(bermudaTriangle._group_type);
				_$("#group_type").selectmenu("destroy").selectmenu({style:'dropdown'});
				if(bermudaTriangle._group_parent_id>0){
					_$("#group_parent_id").val(bermudaTriangle._group_parent_id);
					_$("#group_parent_id_default").val(bermudaTriangle._group_parent_id);
					_$("#group_parent_id").selectmenu("destroy").selectmenu({style:'dropdown'});
				}else{
					_$("#group_parent_id")[0].selectedIndex = 0;
					_$("#group_parent_id_default").val(0);
					_$("#group_parent_id").selectmenu("destroy").selectmenu({style:'dropdown'});
				}
			    _$(".ui-selectmenu-dropdown").addClass("small322");
			    _$(".ui-selectmenu-dropdown").removeClass("ui-selectmenu-dropdown");
			    _$(".ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
			    _$(".ui-selectmenu-menu").removeClass("ui-selectmenu-menu");
				_$('#group_farmer').val(bermudaTriangle._keeperId);
				_$('#group_farmer1').val(bermudaTriangle._masterId);
			    //_$("#group_farmer").selectmenu("destroy").val(bermudaTriangle._keeperId).selectmenu({style:'dropdown'});
			    //_$("#group_farmer1").selectmenu("destroy").val(bermudaTriangle._masterId).selectmenu({style:'dropdown'});
				setSelection(bermudaTriangle);
				if(!bermudaTriangle._id||bermudaTriangle._id==null||bermudaTriangle._group=="")
			    	_$("#nowplant").hide();
			    else
			    	_$("#nowplant").hide();
				_$(".rightNo").hide();
				_$(".rightNo5").show();
				_$("#divtittle").text("编辑区域");
				_$("#group_farmer").selectmenu("destroy").selectmenu({style:'dropdown'});
				_$("#group_farmer1").selectmenu("destroy").selectmenu({style:'dropdown'});
				_$(".rich-calendar-input").addClass("r_c_text_date");
			    _$(".rich-calendar-input").removeClass("rich-calendar-input");
			    _$(".ui-selectmenu-dropdown").addClass("small322");
			    _$(".ui-selectmenu-dropdown").removeClass("ui-selectmenu-dropdown");
			    _$(".ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
			    _$(".ui-selectmenu-menu").removeClass("ui-selectmenu-menu");
				if(_$(".splitbuttonV").attr("class")=="splitbuttonV"){
					_$(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
					var wait=setInterval(function(){
					     if(jQuery13('#rightPane').width()+50>=368){
					         jQuery13('#rightPane').css('width',368);
						 clearInterval(wait);
					     }else{
					         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()+50);
					     }
					     jQuery13('#CenterAndRight').trigger('resize');
					}, 10);
				}
				_$(".tc_top_03").show();
				_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
				_$(".btnOpen").hide();
				
				_$("#group_x").val(bermudaTriangle.group_x);
				_$("#group_y").val(bermudaTriangle.group_y);
				_$("#group_name").val(bermudaTriangle._name);
				_$("#group_id").val(bermudaTriangle._id);
			    _$("#group_parent_id").val(bermudaTriangle._group_parent_id);
			    _$("#group_index").val(bermudaTriangle._index);
			    _$("#group_group").val(bermudaTriangle._group);
			    _$("#group_area").val(bermudaTriangle.mianji);
			    _$("#group_area_hidden").text(bermudaTriangle.mianji+"亩");
			    _$("#group_type").val(bermudaTriangle._group_type);
			    _$("#group_farmer").val(bermudaTriangle._keeperId);
			    _$("#group_farmer1").val(bermudaTriangle._masterId);
			    _$("#group_long").val(bermudaTriangle._long);
			    _$("#group_width").val(bermudaTriangle._width);
			    _$("#group_height").val(bermudaTriangle._height);
			    _$("#muarea").val(bermudaTriangle._muarea);
			    if(bounds.getCenter().lat()!=0&&bounds.getCenter().lng()!=-180){
				    map.setCenter(bounds.getCenter());
					map.setZoom(19);
			    }else {
			    	noPaint = bermudaTriangle;
			    }
			    var tempArray = map5.get(bermudaTriangle._id);
			    var html = "";
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
			    	_$(".tec_c").closest("tr").hide();;
			    }else{
			    	_$(".tec_c").closest("tr").show();;
			    }
			    html+='<div class="clear"></div>';
			    _$(".tec_c").empty();
			    _$(".tec_c").append(html);
			    //clickOptions(_$("#group_farmer").attr("aindex"),_$("#group_farmer").find("option[value="+bermudaTriangle._keeperId+"]").index(),"group_farmer");
			    //clickOptions(_$("#group_farmer1").attr("aindex"),_$("#group_farmer1").find("option[value="+bermudaTriangle._masterId+"]").index(),"group_farmer1");
			    if(bermudaTriangle._group_type<5&&false)
			    	_$(".firstblock").show();
			    else
			    	_$(".firstblock").hide();
			    loaddevic(bermudaTriangle._group_type,bermudaTriangle._envlist);
			    _$("input[name='groupFormColor']").val(bermudaTriangle.get("fillColor"));
	   		    _$("#groupForm\\:color-colorPicker-hex").val(bermudaTriangle.get("fillColor").replace("#",""));
	   		    _$(".rich-color-picker-icon").css("background-color",bermudaTriangle.get("fillColor"));
	   		    setMapNull();
	   		/*var _height = document.body.clientHeight- 161;
	   		if(_$(".rightNo5").find(".jScrollbar_mask").height()>_height){
	   			_$(".rightNo5").find(".jScrollbar_draggable").show();
	   			_$(".rightNo5").find(".tc_rw_rw2").jScrollbar();
	   			_$(".rightNo5").find(".jScrollbar_mask").css("top","0");
	   			_$(".rightNo5").find(".ui-draggable").css("top","0");
	   		}else{
	   			_$(".rightNo5").find(".jScrollbar_draggable").hide();
	   			_$(".rightNo5").find(".jScrollbar_mask").css("top","0");
	   			_$(".rightNo5").find(".ui-draggable").css("top","0");
	   		}*/
			}); 
			//if(bermudaTriangle._id==810){
			
				var uss;
				var lat = bounds.getCenter().lat();
				var lng = bounds.getCenter().lng();
			if(bounds.getCenter().lat()!=0&&bounds.getCenter().lng()!=-180){
				var left = new google.maps.LatLng(lat+0.0000424,lng+0.000055);
				var right = new google.maps.LatLng(lat-0.000045,lng-0.000060);
				var bounds2 = new google.maps.LatLngBounds(right,left);
				var tempArray = map5.get(bermudaTriangle._id);
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
				//usgs = new USGSOverlay(bounds2,isrc,map,bermudaTriangle);
				//bermudaTriangle._usgs = usgs;
			}
			/*var marker  = new google.maps.Marker();
			marker.setTitle("11");
			marker.setPosition(left);
			marker.setMap(map);
			
			var marker2  = new google.maps.Marker(
			);
			marker2.setTitle("22");
			marker2.setPosition(right);
			marker2.setMap(map);
			
			var marker3  = new google.maps.Marker(
			);
			marker3.setTitle("33");
			marker3.setPosition(bounds.getCenter());
			marker3.setMap(map);*/
			//}
			//
			
			
//			var contentString = bermudaTriangle._name;
//			var marker;
//			var infowindow;
//			if (!bermudaTriangle._marker) {
//				infowindow = new google.maps.InfoWindow( {
//					content : contentString
//				});
//		
//				marker = new google.maps.Marker( {
//					position : bounds.getCenter(),
//					map : map,
//					title : bermudaTriangle._name
//				});
//				var tempArray = map5.get(bermudaTriangle._id);
//				if(tempArray==null||tempArray.length==0){
//					marker.set("icon",noneImage);
//				}else if(tempArray.length>1){
//					marker.set("icon",moreImage);
//				}else{
//					var oneImage = new google.maps.MarkerImage(
//							workpath+"/asset/images/853.jpg",
//						    new google.maps.Size(20, 20),
//						    new google.maps.Point(0, 0),
//						    new google.maps.Point(10,10),
//						    new google.maps.Size(20, 20));
//					marker.set("icon",oneImage);
//				}
//			} else {
//				marker = polygon._marker;
//				infowindow = marker._infowindow;
//				var tempArray = map5.get(polygon._id);
//				if(tempArray==null||tempArray.length==0){
//					marker.set("icon",noneImage);
//				}else if(tempArray.length>1){
//					marker.set("icon",moreImage);
//				}else{
//					var oneImage = new google.maps.MarkerImage(
//							workpath+"/asset/images/853.jpg",
//						    new google.maps.Size(20, 20),
//						    new google.maps.Point(0, 0),
//						    new google.maps.Point(10,10),
//						    new google.maps.Size(20, 20));
//					marker.set("icon",oneImage);
//				}
//				marker.set("title", polygon._name);
//				marker.set("position", bounds.getCenter());
//				infowindow.set("content", contentString);
//			}
//				
//			marker._infowindow=infowindow;
//			bermudaTriangle._marker = marker;
//			google.maps.event.addDomListener(marker, 'click', function() {
//				if(infowindow.getMap()==null)
//					infowindow.open(map, marker);
//			});
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
		
		//加载描点第二部
		function attachSecretMessage(marker,array,index){
			var contentString = "<div style='width:240px'><table><tr><td width='200'>"+array.name+"<br/>联系人:"+array.contact+"<br/>电话:"+array.phone+"<br/>地址:"+array.address+"<br/>描述:"+array.description+"</td><td valign='top'><span style='cursor:pointer;font-weight:bold;' onclick='editMark("+index+")'>编辑</span></td></tr></table></div>"; 
			var infowindow = new google.maps.InfoWindow({
				content: contentString,
				maxWidth: 400,
				disableAutoPan:true
				});
			marker._infowindow=infowindow;
			google.maps.event.addListener(marker, 'click', function() {
			    infowindow.open(marker.get('map'), marker);
			    map.setCenter(marker.getPosition());
				map.setZoom(16);
			  });
			google.maps.event.addDomListener(marker, 'dblclick', function() {
					_$("#mark_info_name").val(marker._name);
					_$("#mark_info_index").val(marker._index);	
					alert("X---"+5);
					_$("#mark_info_x").val(marker._coordinate_X);
					_$("#mark_info_y").val(marker._coordinate_Y);
					_$("#mark_info_id").val(marker._id);
					_$(".rightNo").hide();
	    			_$(".rightNo1").show();
	    			_$("#divtittle").text("编辑基地位置");
	    			if(_$(".splitbuttonV").attr("class")=="splitbuttonV"){
	    				_$(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
	    				var wait=setInterval(function(){
	    				     if(jQuery13('#rightPane').width()+50>=368){
	    				         jQuery13('#rightPane').css('width',368);
	    					 clearInterval(wait);
	    				     }else{
	    				         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()+50);
	    				     }
	    				     jQuery13('#CenterAndRight').trigger('resize');
	    				}, 10);
	    			}
	    			_$(".tc_top_03").show();
	    			_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
	    			_$(".btnOpen").hide();
			  });
		}	  
		
		//基地编辑完成
		function mark_ok(){
			var m;
			for(var i = 0;i<mark1Array.length;i++){
				var polygon = mark1Array[i];
				if(polygon._marker._id==_$("#mark_id").val()){
					m = polygon._marker;
					polygon.isok=1;
					polygon._description=_$("#mark_description").val();
					polygon._contact=_$("#mark_contact").val();
					polygon._phone=_$("#mark_phone").val();
					polygon._address=_$("#mark_address").val();
					polygon._coordinate_group=_$("#mark_coordinate_group").val();
					polygon.set("fillColor",_$("input[name='baseFormColor']").val());
					polygon.set("strokeColor",_$("input[name='baseFormColor']").val());
				}
			}
			if(m){
				var info = m._infowindow;
				var content = "<div style='width:240px'><table><tr><td width='200'>"+m._name+"<br/>联系人:"+_$("#mark_contact").val()+"<br/>电话:"+_$("#mark_phone").val()+"<br/>地址:"+_$("#mark_address").val()+"<br/>描述:"+_$("#mark_description").val()+"</td><td valign='top'><span style='cursor:pointer;font-weight:bold;' onclick='editMark("+m._index+")'>编辑</span></td></tr></table></div>"; 
				
				info.set("content",content);
			}
			//控制描点拖拽功能
			m.setDraggable(true);
			movemarker(m);
			clearSelection();
			if(mark1Array.length>=1){
				displaymodel2(false);
			}
			if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
				_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
				var wait=setInterval(function(){
				     if(jQuery13('#rightPane').width()-50<=0){
				         jQuery13('#rightPane').css('width',0);
					 clearInterval(wait);
				     }else{
				         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
				     }
				     jQuery13('#CenterAndRight').trigger('resize');
				}, 10);
			}
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
			if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
				_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
				var wait=setInterval(function(){
				     if(jQuery13('#rightPane').width()-50<=0){
				         jQuery13('#rightPane').css('width',0);
					 clearInterval(wait);
				     }else{
				         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
				     }
				     jQuery13('#CenterAndRight').trigger('resize');
				}, 10);
			}
			setMapNotNull();
		}	
		//删除基地
		function ploygon_delete(){
			for(var i = 0;i<mark1Array.length;i++){
				var polygon = mark1Array[i];
				if(polygon._marker._id==_$("#mark_id").val()){
					mark_delete(_$("#mark_id").val());
				}
			}
			
		}  
		
		function mark_delete_next(data){
			if(data!=""){
				alert(data);
				return ;
			}
			for(var i = 0;i<mark1Array.length;i++){
				var polygon = mark1Array[i];
				if(polygon._marker._id==_$("#mark_id").val()){
					polygon.setMap(null);
					polygon._marker._btype=undefined;
					polygon._marker.setMap(null);
				}
			}
			clearSelection();
			if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
				_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
				var wait=setInterval(function(){
				     if(jQuery13('#rightPane').width()-50<=0){
				         jQuery13('#rightPane').css('width',0);
					 clearInterval(wait);
				     }else{
				         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
				     }
				     jQuery13('#CenterAndRight').trigger('resize');
				}, 10);
			}
			setMapNotNull();
		}
		
		//区域编辑完成
		function part_ok(){
			var polygon;
			for(var i = 0;i<mark2Array.length;i++){
				polygon = mark2Array[i];
				if(polygon._index==_$("#partition_index").val()){
					polygon._id=_$("#partition_id").val();
					polygon._base_id=_$("#base_id").val();
					polygon._group=_$("#partition_group").val();
					polygon.mianji=_$("#partition_area").val();
					polygon._name=_$("#partition_name").val();
					polygon.partition_x = _$("#partition_x").val();
					polygon.partition_y = _$("#partition_y").val();	
					polygon._description=_$("#partition_description").val();
					polygon.set("fillColor",_$("input[name='partitionFormColor']").val());
					polygon.set("strokeColor",_$("input[name='partitionFormColor']").val());
					break;
				}
			}
			var array = polygon.getPath().getArray();
			var bounds = new google.maps.LatLngBounds();
			for (i = 0; i < array.length; i++) {
				bounds.extend(array[i]);
			}
		
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
			if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
				_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
				var wait=setInterval(function(){
				     if(jQuery13('#rightPane').width()-50<=0){
				         jQuery13('#rightPane').css('width',0);
					 clearInterval(wait);
				     }else{
				         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
				     }
				     jQuery13('#CenterAndRight').trigger('resize');
				}, 10);
			}
			setMapNotNull();
			if(mark2Array.length>0){
				displaymodel3(false);
			}else{
				displaymodel3(true);
			}
			_$("#group_parent_id").empty();
			for(var i = 0;i<mark2Array.length;i++){
				var polygon2 = mark2Array[i];
				if(polygon2.getMap()!=null){
					_$("#group_parent_id").append("<option value='"+polygon2._id+"'>"+polygon2._name+"</option>");
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
			if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
				_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
				var wait=setInterval(function(){
				     if(jQuery13('#rightPane').width()-50<=0){
				         jQuery13('#rightPane').css('width',0);
					 clearInterval(wait);
				     }else{
				         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
				     }
				     jQuery13('#CenterAndRight').trigger('resize');
				}, 10);
			}
			setMapNotNull();
		}	
		//删除区域
		function part_delete(){
			for(var i = 0;i<mark2Array.length;i++){
				var polygon = mark2Array[i];
				if(polygon._index==_$("#partition_index").val()){
					if(polygon._id)
						partition_delete(polygon._id);
					else{
						polygon.setMap(null);
						clearSelection();
						if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
							_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
							var wait=setInterval(function(){
							     if(jQuery13('#rightPane').width()-50<=0){
							         jQuery13('#rightPane').css('width',0);
								 clearInterval(wait);
							     }else{
							         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
							     }
							     jQuery13('#CenterAndRight').trigger('resize');
							}, 10);
						}
						setMapNotNull();
					}
				}
			}
			
		}
		
		function partition_delete_next(data){
			if(data!=""){
				alert(data);
				return;
			}
			for(var i = 0;i<mark2Array.length;i++){
				var polygon = mark2Array[i];
				if(polygon._index==_$("#partition_index").val()){
						polygon.setMap(null);
				}
			}
			clearSelection();
			if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
				_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
				var wait=setInterval(function(){
				     if(jQuery13('#rightPane').width()-50<=0){
				         jQuery13('#rightPane').css('width',0);
					 clearInterval(wait);
				     }else{
				         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
				     }
				     jQuery13('#CenterAndRight').trigger('resize');
				}, 10);
			}
			setMapNotNull();
		}
		//采集设备,调节设备 数据保存方法
		function che(){
			_$(".model3").removeClass("on");
			var str = "";
			_$(".new_checkbox1").each(function(){
				str+=_$(this).attr("a")+",";
			});
			if(str.length>0&&str.endWith(","))
				str = str.substring(0, str.length-1);
			var str2 = "";
			_$(".new_checkbox2").each(function(){
				str2+=_$(this).attr("a")+",";
			});
			if(str2.length>0&&str2.endWith(","))
				str2 = str2.substring(0, str2.length-1);
			if(str.length>0){
				if(str2.length>0){
					str+=","+str2;
				}
			}else{
				str = str2;
			}
			_$("#group_envList").val(str);
			if(_$("#group_name").val()==""){
				alert("请填写区域名称!");
				return false;
			}else{
				return true;
			}
		}
		//大棚编辑完成
		function group_ok(){
			var polygon;
			for(var i = 0;i<mark3Array.length;i++){
				polygon = mark3Array[i];
				if(polygon._index==_$("#group_index").val()){
					backname = _$("#group_name").val();
					polygon._name=_$("#group_name").val();
					polygon._id=_$("#group_id").val();
					polygon._group_parent_id=_$("#group_parent_id").val();
					polygon._index=_$("#group_index").val();
					polygon._group=_$("#group_group").val();
					polygon.mianji=_$("#group_area").val();
					polygon._muarea=_$("#muarea").val();
					polygon._group_type=_$("#group_type").val();
					polygon._keeperId=_$("#group_farmer").val();
					polygon._masterId=_$("#group_farmer1").val();
					polygon._long=_$("#group_long").val();
					polygon._width=_$("#group_width").val();
					polygon._height=_$("#group_height").val();
					polygon._envlist=_$("#group_envList").val();
					polygon.set("fillColor",_$("input[name='groupFormColor']").val());
					polygon.set("strokeColor",_$("input[name='groupFormColor']").val());
					break;
				}
			}
			var array = polygon.getPath().getArray();
			var bounds = new google.maps.LatLngBounds();
			for (i = 0; i < array.length; i++) {
				bounds.extend(array[i]);
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
				var tempSt = '{"model_id":0,"plant_id":0,"endtime":"","starttime":"","imground":"","imgsquare":"","breed_id":0,"breed_name":"","crop_area":0,"mu_number":'+polygon.mianji+',"partition_id":'+polygon._group_parent_id+',"partition_name":"'+_$("#group_parent_id").find("option:selected").text()+'","plant_stauts":0,"real_plant_id":0,"tunnel_info_id":'+polygon._id+',"tunnel_name":"'+polygon._name+'","type_id":'+polygon._group_type+',"type_name":"'+envTypeList[polygon._group_type]+'"}';
				eval('var tempp = '+tempSt);
				tempArray = new Array();
				tempArray.push(tempp);
				allList.push(tempp);
				initList();
			}
			for(var i = 0;i<allList.length;i++){
				var tt = allList[i];
				if(tt.tunnel_info_id==polygon._id){
						tt.type_id = _$("#group_type").val();
						tt.type_name=envTypeList[polygon._group_type];
						tt.partition_id = _$("#group_parent_id").val();
						tt.partition_name = _$("#group_parent_id").find("option:selected").text(); 
						tt.tunnel_name = _$("#group_name").val();
						tt.mu_number=_$("#muarea").val();
				}
			}
			
			initList();
			
			if(false&&bounds.getCenter().lat()!=0&&bounds.getCenter().lng()!=-180){
				var uss = polygon._usgs;
				var lat = bounds.getCenter().lat();
				var lng = bounds.getCenter().lng();
				var left = new google.maps.LatLng(lat+0.0000422,lng+0.000055);
				var right = new google.maps.LatLng(lat-0.000042,lng-0.000055);
				var bounds2 = new google.maps.LatLngBounds(right,left);
				var tempArray = map5.get(polygon._id);
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
				if(temp.tunnel_info_id == _$('#group_id').val()){
					temp.mu_number = _$("#muarea").val();
					allList[i] = temp;
				}
			}
			g_infowindow.setMap(null);
			initList();searchs();
			setMapNotNull();
			ts_check();
			//if(mark3Array.length>0)
			//	displaymodel3(false);
			if(mark3Array.length>0)
				_$("#goAPS").click(function(){goAPS_next();});
			if(ret==2){
				group_back();
				return;
			}
			if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
				_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
				var wait=setInterval(function(){
				     if(jQuery13('#rightPane').width()-50<=0){
				         jQuery13('#rightPane').css('width',0);
					 clearInterval(wait);
				     }else{
				         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
				     }
				     jQuery13('#CenterAndRight').trigger('resize');
				}, 10);
			}
		}
		//取消大棚编辑
		function group_no (){
			if(selectedShape){
				if(selectedShape._id==undefined||selectedShape._id==''){
					selectedShape.setMap(null);
				}
			}
			backname = _$("#group_name").val();
			clearSelection();
			g_infowindow.setMap(null);
			if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
				_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
				var wait=setInterval(function(){
				     if(jQuery13('#rightPane').width()-50<=0){
				         jQuery13('#rightPane').css('width',0);
					 clearInterval(wait);
				     }else{
				         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
				     }
				     jQuery13('#CenterAndRight').trigger('resize');
				}, 10);
			}
			setMapNotNull();
		}	
		//删除大棚
		function group_delete(){
			for(var i = 0;i<mark3Array.length;i++){
				var polygon = mark3Array[i];
				if(polygon._marker._id==_$("#mark_id").val()){
					polygon.setMap(null);
					polygon._marker._btype=undefined;
					mark_delete(_$("#mark_id").val());
				}
			}
			backname = _$("#group_name").val();
			clearSelection();
			if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
				_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
				var wait=setInterval(function(){
				     if(jQuery13('#rightPane').width()-50<=0){
				         jQuery13('#rightPane').css('width',0);
					 clearInterval(wait);
				     }else{
				         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
				     }
				     jQuery13('#CenterAndRight').trigger('resize');
				}, 10);
			}
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
			_$(".maptwo").attr("class","mapone");
			_$(".model3").removeClass("on");
			
			_$(".model3").removeClass("on");
			_$("#model2").parent().attr("class","mapone");
			_$("#model1").parent().attr("class","mapone");
			_$(".model4").removeClass("on");
		}
		//采集设备,调节设备 点击事件触发
		function checkbox1 (obj){
			if(_$(obj).attr("class")=="new_checkbox1"){
				_$(obj).attr("class","new_checkbox1_2");
			}else if(_$(obj).attr("class")=="new_checkbox1_2"){
				_$(obj).attr("class","new_checkbox1");
			}
		}
		function checkbox2 (obj){
			if(_$(obj).attr("class")=="new_checkbox2"){
				_$(obj).attr("class","new_checkbox2_2");
			}else if(_$(obj).attr("class")=="new_checkbox2_2"){
				_$(obj).attr("class","new_checkbox2");
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
			  div.style.index="777";
			  div.style.borderWidth = '0px';
			  div.style.position = 'absolute';
			  var img = document.createElement('img');
			  img.src = this.image_;
			  img.style.width = '100%';
			  img.style.height = '100%';
			  div.appendChild(img);
			  this.div_ = div;
			  var panes = this.getPanes();
			  panes.overlayImage.appendChild(this.div_);
			  var _self=this;
			google.maps.event.addDomListener(this.div_, 'click', function(event){map.setZoom(19);showInfos(_self,event);
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
					_$(".zw_bgt2").css("cursor","pointer");
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
					_$(".zw_bgt2").attr("onclick","addPlant()");
					_$(".zw_bgt2").css("cursor","default");
				}else if(temp.length>1){
					box_title = obj.parents._name;
					box_area = obj.parents.mianji;
					box_image = moresrc;
					box_content = "种植： ";
					for(var i = 0;i<temp.length;i++){
						box_content+=temp[i].breed_name+" ";
					}
					_$(".zw_bgt2").attr("onclick","addPlant()");
					_$(".zw_bgt2").css("cursor","default");
				}
				_$(".div_dt2").html(box_title);
				_$(".div_dt4").html(box_plant);
				_$(".div_dt3").html(box_area+"亩");
				_$(".zw_libg_img2").attr("src",box_image);
				_$(".div_dt55").html(box_content);
				var content = _$(".div_width").html();
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
					_$(".gm-style-iw").css("overflow","visible");
					_$(".gm-style-iw div").css("overflow","visible");
				  }else{
					_$(".gm-style-iw").css("overflow","inherit");
					_$(".gm-style-iw div").css("overflow","inherit");
				  }
				  _$(".div_012").css({"width":"241px","margin-left":"-10px"});
			}
				
			function hove(){
				 _$('.div_012').hover(function(){
				 _$(this).find('.gooleedit').show();
				 },function(){
				 _$(this).find('.gooleedit').hide();
				 });
			}
			
			var g_infowindow = new google.maps.InfoWindow({
				maxWidth:242
			});
			function nothing(){
			}
			
			function delete_tunnel(obj){
				_$(".model3").removeClass("on");
				var b = confirm("确定要删除吗？");
				if(!b)
					return;
				if(obj==""){
					var val = _$("#group_index").val();
					for(var i = 0;i<mark3Array.length;i++){
						var temp = mark3Array[i];
						if(temp._index==val){
							temp.setMap(null);
							if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
								_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
								var wait=setInterval(function(){
								     if(jQuery13('#rightPane').width()-50<=0){
								         jQuery13('#rightPane').css('width',0);
									 clearInterval(wait);
								     }else{
								         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
								     }
								     jQuery13('#CenterAndRight').trigger('resize');
								}, 10);
							}
						}
					}
				}else{
					deleteTunnel(obj);
				}
			}
			
			function delete_tunnel_next(str){
				var strs = str.split(":");
				if(strs[0]=="false"){
					alert(strs[1]);
				}else{
					var val = _$("#group_index").val();
					var bx = false;
					for(var i = 0;i<allList.length;i++){
						var ob = allList[i];
						if(ob.tunnel_info_id==strs[1]){
							allList = allList.del(i);
							bx = true;
						}
					}
					if(bx){
						initList();
					}
					for(var i = 0;i<mark3Array.length;i++){
						var temp = mark3Array[i];
						if(temp._index==val){
							temp.setMap(null);
							g_infowindow.setMap(null);
							temp._usgs.setMap(null);
							mark3Array = mark3Array.del(i);
							if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
								_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
								var wait=setInterval(function(){
								     if(jQuery13('#rightPane').width()-50<=0){
								         jQuery13('#rightPane').css('width',0);
									 clearInterval(wait);
								     }else{
								         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
								     }
								     jQuery13('#CenterAndRight').trigger('resize');
								}, 10);
							}
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

			function formatFloat(src, pos)
			{
			    return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);
			}

			document.onkeydown=function(event){ 
	            e = event ? event :(window.event ? window.event : null); 
	            if(e.keyCode==13){ 
	                if(document.activeElement.id=="tc_top_input"){
	                	searchs();
	                }else if(document.activeElement.id=="ser_input"){
	                	_$(".search02").trigger("click");
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
	        	_$(obj).closest(".rteic").remove();
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
			
	function soil_ok(data){
		eval("var tt = "+data);
		if(_$("#soil_id").val()==""){
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
				var te = _$("#soil_route_of").find("option[value="+tem.route_of+"]").html();
				if(te==null)
					te="";
				html+="<tr class='soill"+tem.id+"'><td class='bc_th01'>"+tem.begin_time+"年"+tem.end_time+"年</td><td  class='bc_th01' >"+te+"</td><td  class='bc_th01'><a href='#' onclick='editsoil("+tem.id+")'>修改</a>  <a href='#' onclick='delsoil("+tem.id+")'>删除</a></td></tr>";
			}
		}
		if(html!=""){
			html = "<tr><td class='bc_th01'>时间</td><td class='bc_th01'>用途</td><td class='bc_th01' style='width:20%'>操作</td></tr>"+html;
			_$(".soil_table").empty().append(html);
		}
		_$(".rightNo9").hide();
		_$(".rightNo3").show();
	}
	
	function addsoil(){
		_$("#soil_id").val("");
		_$("#soil_partitionId").val(_$("#partition_id").val());
		_$("#soil_partitionName").val(_$("#partition_name").val());
		
		_$("#soil_type1")[0].selectedIndex = 0;
		_$("#soil_type1").selectmenu("destroy").selectmenu({style:'dropdown'});
		_$("#soil_type1-button").removeClass("ui-selectmenu-dropdown").addClass("small322");
		_$("#soil_type1-menu").removeClass("ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
		
		
		_$("#soil_type2")[0].selectedIndex = 0;
		_$("#soil_type2").selectmenu("destroy").selectmenu({style:'dropdown'});
		_$("#soil_type2-button").removeClass("ui-selectmenu-dropdown").addClass("small322");
		_$("#soil_type2-menu").removeClass("ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
		
		_$("#soil_begin").val(yea);
		_$("#soil_begin").selectmenu("destroy").selectmenu({style:'dropdown'});
		_$("#soil_begin-button").removeClass("ui-selectmenu-dropdown").addClass("small322");
		_$("#soil_begin-menu").removeClass("ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
		
		_$("#soil_end").val(yea);
		_$("#soil_end").selectmenu("destroy").selectmenu({style:'dropdown'});
		_$("#soil_end-button").removeClass("ui-selectmenu-dropdown").addClass("small322");
		_$("#soil_end-menu").removeClass("ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
		
		_$("#soil_ph").val("7");
		
		_$("#soil_route_of")[0].selectedIndex = 0;
		_$("#soil_route_of").selectmenu("destroy").selectmenu({style:'dropdown'});
		_$("#soil_route_of-button").removeClass("ui-selectmenu-dropdown").addClass("small322");
		_$("#soil_route_of-menu").removeClass("ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
		
		_$("#soil_pollution_status")[0].selectedIndex = 0;
		_$("#soil_pollution_status").selectmenu("destroy").selectmenu({style:'dropdown'});
		_$("#soil_pollution_status-button").removeClass("ui-selectmenu-dropdown").addClass("small322");
		_$("#soil_pollution_status-menu").removeClass("ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
		
		_$("#soil_description").val("");
		_$("#soil_pollution_level").val("");
		_$("#soil_repair_status").val("");
		_$(".rightNo9").show();
		_$(".rightNo3").hide();
	}
	
	function soil_no(){
		_$(".rightNo9").hide();
		_$(".rightNo3").show();
	}
	
	function delsoil_next(data){
		eval("var t_t = "+data);
		_$(".soill"+t_t.id).hide();
		for(var i = 0;i<soilStr.length;i++){
			var tem = soilStr[i];
			if(tem.id == t_t.id){
				soilStr = soilStr.del(i);
				break;
			}
		}
	}
	
	function editsoil(id){
		for(var i = 0;i<soilStr.length;i++){
			var tem = soilStr[i];
			if(tem.id==id){
				_$("#soil_id").val(tem.id);
				_$("#soil_partitionId").val(tem.partitionId);
				_$("#soil_partitionName").val(_$("#partition_name").val());
				_$("#soil_type1").val(tem.soil_data_dic_id);
				_$("#soil_type1").selectmenu("destroy").selectmenu({style:'dropdown'});
				_$("#soil_type1-button").removeClass("ui-selectmenu-dropdown").addClass("small322");
				_$("#soil_type1-menu").removeClass("ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
				
				_$("#soil_type2").val(tem.soils_data_dic_id);
				_$("#soil_type2").selectmenu("destroy").selectmenu({style:'dropdown'});
				_$("#soil_type2-button").removeClass("ui-selectmenu-dropdown").addClass("small322");
				_$("#soil_type2-menu").removeClass("ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
				
				_$("#soil_begin").val(tem.begin_time);
				_$("#soil_begin").selectmenu("destroy").selectmenu({style:'dropdown'});
				_$("#soil_begin-button").removeClass("ui-selectmenu-dropdown").addClass("small322");
				_$("#soil_begin-menu").removeClass("ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
				
				_$("#soil_end").val(tem.end_time);
				_$("#soil_end").selectmenu("destroy").selectmenu({style:'dropdown'});
				_$("#soil_end-button").removeClass("ui-selectmenu-dropdown").addClass("small322");
				_$("#soil_end-menu").removeClass("ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
				
				_$("#soil_ph").val(tem.ph);
				
				_$("#soil_route_of").val(tem.route_of);
				_$("#soil_route_of").selectmenu("destroy").selectmenu({style:'dropdown'});
				_$("#soil_route_of-button").removeClass("ui-selectmenu-dropdown").addClass("small322");
				_$("#soil_route_of-menu").removeClass("ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
				
				_$("#soil_pollution_status").val(tem.pollution_status);
				_$("#soil_pollution_status").selectmenu("destroy").selectmenu({style:'dropdown'});
				_$("#soil_pollution_status-button").removeClass("ui-selectmenu-dropdown").addClass("small322");
				_$("#soil_pollution_status-menu").removeClass("ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
				
				_$("#soil_description").val(tem.description);
				_$("#soil_pollution_level").val(tem.pollution_level);
				_$("#soil_repair_status").val(tem.repair_status);
				_$(".rightNo9").show();
				_$(".rightNo3").hide();
			}
		}
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
		move(tempThis,shape);
		dbcl(tempThis,shape);
        this.quadrilateral = {
            shape:shape,
            latLng:latLng
        };
    };
    
    CustomOverlay.prototype.polygonMoved = function(latLng)
    {
		
		var lat = latLng.lat();
		var lng = latLng.lng();
		lat = lat-0.0000424;
		lng = lng+0.000055;
		var newLatLng = new google.maps.LatLng(lat,lng);
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
        if(this.arr.device_==1||this.arr.device_==2){
	        var base = checkPointBase(newLatLng);
			if(base!=null){
				_$("#device_base_id").val(base._marker._id);
				_$("#device_base_name").val(base._name);
				this.arr.device_base_id =base._marker._id;
				this.arr.device_base_name = base._name;
			}else{
				_$("#device_base_id").val("");
				_$("#device_base_name").val("");
				this.arr.device_base_id = "";
				this.arr.device_base_name = "";
			}
			var partition = checkPointPartition(newLatLng);
			if(partition!=null){
				_$("#device_partition_id").val(partition._id);
				_$("#device_partition_name").val(partition._name);
				this.arr.device_partition_id = partition._id;
				this.arr.device_partition_name = partition._name;
			}else{
				_$("#device_partition_id").val("");
				_$("#device_partition_name").val("");
				this.arr.device_partition_id = "";
				this.arr.device_partition_name = "";
			}
			
			if(tunnel!=null){
				_$("#device_tunnel_id").val(tunnel._id);
				_$("#device_tunnel_name").val(tunnel._name);
				this.arr.device_tunnel_id = tunnel._id;
				this.arr.device_tunnel_name = tunnel._name;
			}else{
				_$("#device_tunnel_id").val("");
				_$("#device_tunnel_name").val("");
				this.arr.device_tunnel_id = "";
				this.arr.device_tunnel_name = "";
			}
			this.arr.device_coordinateX = lat;
			this.arr.device_coordinateY = lng;
			_$("#device_coordinateX").val(lat);
			_$("#device_coordinateY").val(lng);
			var ty = this.arr.device_status;
			ty = parseInt(ty);
			_$("#device_id").val(this.arr.device_id);
			_$("#device_sn").val(this.arr.device_sn);
			_$("#device_name").val(this.arr.device_name);
			_Q(".aps_radio:eq("+ty+")").trigger("click");
			_$("#deviceForm\\:device_factoryTimeInputDate").val(this.arr.device_factory);
			_$("#device_description").val(this.arr.device_description);
			_$("#device_deviceType").val(this.arr.device_deviceType);
			if(this.arr.device_deviceType==1){
				_$(".device_2").hide();
				_$("#device_deviceType").val("1");
				_$(".device_1").show();
				_$(".device_typee").show();
				_$(".device_typee2").hide();
				if(this.arr.device_type_id!=""){
					_$("#device_type_id").val(this.arr.device_type_id);
					_$("#device_type_id").selectmenu("destroy").selectmenu({style:'dropdown'});
					_$(".ui-selectmenu-dropdown").addClass("small322");
				    _$(".ui-selectmenu-dropdown").removeClass("ui-selectmenu-dropdown");
				    _$(".ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
				    _$(".ui-selectmenu-menu").removeClass("ui-selectmenu-menu");
				}
			}else if(this.arr.device_deviceType==2){
				_$(".device_2").show();
				_$("#device_deviceType").val("2");
				_$(".device_1").hide();
				_$(".device_typee").hide();
				_$(".device_typee2").show();
				if(this.arr.device_type_id!=""){
					_$("#device_type_id2").val(this.arr.device_type_id);
					_$("#device_type_id2").selectmenu("destroy").selectmenu({style:'dropdown'});
					_$(".ui-selectmenu-dropdown").addClass("small322");
				    _$(".ui-selectmenu-dropdown").removeClass("ui-selectmenu-dropdown");
				    _$(".ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
				    _$(".ui-selectmenu-menu").removeClass("ui-selectmenu-menu");
				}
			}
			_$("#device_index").val(this.arr._index);
			_$(".tc_rw_rw2").scrollTop(0);
			_$("#divtittle").text("编辑设备");
			_$(".tc_top_03").show();
			_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
			_$(".rightNo").hide();
			_$(".rightNo10").show();
			if(_$(".splitbuttonV").attr("class")=="splitbuttonV"){
				_$(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
				var wait=setInterval(function(){
				     if(jQuery13('#rightPane').width()+50>=368){
				         jQuery13('#rightPane').css('width',368);
					 clearInterval(wait);
				     }else{
				         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()+50);
				     }
				     jQuery13('#CenterAndRight').trigger('resize');
				}, 10);
			};
        }else if(this.arr.device_==3){
        	var base = checkPointBase(newLatLng);
			if(base!=null){
				_$("#video_base_id").val(base._marker._id);
				_$("#video_base_name").val(base._name);
				this.arr.video_base_id =base._marker._id;
				this.arr.video_base_name = base._name;
			}else{
				_$("#video_base_id").val("");
				_$("#video_base_name").val("");
				this.arr.video_base_id = "";
				this.arr.video_base_name = "";
			}
			var partition = checkPointPartition(newLatLng);
			if(partition!=null){
				_$("#video_partition_id").val(partition._id);
				_$("#video_partition_name").val(partition._name);
				this.arr.video_partition_id = partition._id;
				this.arr.video_partition_name = partition._name;
			}else{
				_$("#video_partition_id").val("");
				_$("#video_partition_name").val("");
				this.arr.video_partition_id = "";
				this.arr.video_partition_name = "";
			}
			var tunnel = checkPointTunnel(newLatLng);
			if(tunnel!=null){
				_$("#video_tunnel_id").val(tunnel._id);
				_$("#video_tunnel_name").val(tunnel._name);
				this.arr.video_tunnel_id = tunnel._id;
				this.arr.video_tunnel_name = tunnel._name;
			}else{
				_$("#video_tunnel_id").val("");
				_$("#video_tunnel_name").val("");
				this.arr.video_tunnel_id = "";
				this.arr.video_tunnel_name = "";
			}
			add_video(this.arr);
			_$(".tc_rw_rw2").scrollTop(0);
			_$("#video_coordinateX").val(lat);
			_$("#video_coordinateY").val(lng);
			_$("#divtittle").text("编辑视频设备");
			_$(".tc_top_03").show();
			_$(".rightNo").hide();
			_$(".rightNo11").show();
			_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
			if(_$(".splitbuttonV").attr("class")=="splitbuttonV"){
				_$(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
				var wait=setInterval(function(){
				     if(jQuery13('#rightPane').width()+50>=368){
				         jQuery13('#rightPane').css('width',368);
					 clearInterval(wait);
				     }else{
				         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()+50);
				     }
				     jQuery13('#CenterAndRight').trigger('resize');
				}, 10);
			};
        }
    };

function move(tempThis,shape){
_$(shape).draggable({
			start:function(event){
				tempThis.map.set('draggable',false);
				event.cancelBubble = true;
	            if(event.stopPropagation){
	            	event.stopPropagation();
	            }
			},
            stop:function(event,ui){
                tempThis.polygonMoved(tempThis.getProjection().fromDivPixelToLatLng(new google.maps.Point(ui.position.left,ui.position.top)));
                tempThis.map.set('draggable',true);
            }
        });
}
	
function dbcl(tempThis,shape){
	_$(shape).dblclick(function(){
		
        if(tempThis.arr.device_==1||tempThis.arr.device_==2){
        	var newLatLng = new google.maps.LatLng(tempThis.arr.device_coordinateX,tempThis.arr.device_coordinateY);
            tempThis.quadrilateral.latLng = newLatLng;	
        var base = checkPointBase(newLatLng);
		if(base!=null){
			_$("#device_base_id").val(base._marker._id);
			_$("#device_base_name").val(base._name);
			tempThis.arr.device_base_id =base._marker._id;
			tempThis.arr.device_base_name = base._name;
		}else{
			_$("#device_base_id").val("");
			_$("#device_base_name").val("");
			tempThis.arr.device_base_id = "";
			tempThis.arr.device_base_name = "";
		}
		var partition = checkPointPartition(newLatLng);
		if(partition!=null){
			_$("#device_partition_id").val(partition._id);
			_$("#device_partition_name").val(partition._name);
			tempThis.arr.device_partition_id = partition._id;
			tempThis.arr.device_partition_name = partition._name;
		}else{
			_$("#device_partition_id").val("");
			_$("#device_partition_name").val("");
			tempThis.arr.device_partition_id = "";
			tempThis.arr.device_partition_name = "";
		}
		var tunnel = checkPointTunnel(newLatLng);
		if(tunnel!=null){
			_$("#device_tunnel_id").val(tunnel._id);
			_$("#device_tunnel_name").val(tunnel._name);
			tempThis.arr.device_tunnel_id = tunnel._id;
			tempThis.arr.device_tunnel_name = tunnel._name;
		}else{
			_$("#device_tunnel_id").val("");
			_$("#device_tunnel_name").val("");
			tempThis.arr.device_tunnel_id = "";
			tempThis.arr.device_tunnel_name = "";
		}
		_$("#device_coordinateX").val(tempThis.arr.device_coordinateX);
		_$("#device_coordinateY").val(tempThis.arr.device_coordinateY);
		var ty = tempThis.arr.device_status;
		ty = parseInt(ty);
		_$("#device_id").val(tempThis.arr.device_id);
		_$("#device_sn").val(tempThis.arr.device_sn);
		_$("#device_name").val(tempThis.arr.device_name);
		_Q(".aps_radio:eq("+ty+")").trigger("click");
		_$("#deviceForm\\:device_factoryTimeInputDate").val(tempThis.arr.device_factory);
		_$("#device_description").val(tempThis.arr.device_description);
		_$("#device_deviceType").val(tempThis.arr.device_deviceType);
		if(tempThis.arr.device_deviceType==1){
			_$(".device_2").hide();
			_$("#device_deviceType").val("1");
			_$(".device_1").show();
			_$(".device_typee").show();
			_$(".device_typee2").hide();
			if(tempThis.arr.device_type_id!=""){
				_$("#device_type_id").val(tempThis.arr.device_type_id);
				_$("#device_type_id").selectmenu("destroy").selectmenu({style:'dropdown'});
				_$(".ui-selectmenu-dropdown").addClass("small322");
			    _$(".ui-selectmenu-dropdown").removeClass("ui-selectmenu-dropdown");
			    _$(".ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
			    _$(".ui-selectmenu-menu").removeClass("ui-selectmenu-menu");
			}
		}else if(tempThis.arr.device_deviceType==2){
			_$(".device_2").show();
			_$("#device_deviceType").val("2");
			_$(".device_1").hide();
			_$(".device_typee").hide();
			_$(".device_typee2").show();
			if(tempThis.arr.device_type_id!=""){
				_$("#device_type_id2").val(tempThis.arr.device_type_id);
				_$("#device_type_id2").selectmenu("destroy").selectmenu({style:'dropdown'});
				_$(".ui-selectmenu-dropdown").addClass("small322");
			    _$(".ui-selectmenu-dropdown").removeClass("ui-selectmenu-dropdown");
			    _$(".ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
			    _$(".ui-selectmenu-menu").removeClass("ui-selectmenu-menu");
			}
		}
		_$(".tc_rw_rw2").scrollTop(0);
		_$("#device_index").val(tempThis.arr._index);
		_$("#divtittle").text("编辑设备");
		_$(".tc_top_03").show();
		_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
		_$(".rightNo").hide();
		_$(".rightNo10").show();
		if(_$(".splitbuttonV").attr("class")=="splitbuttonV"){
			_$(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
			var wait=setInterval(function(){
			     if(jQuery13('#rightPane').width()+50>=368){
			         jQuery13('#rightPane').css('width',368);
				 clearInterval(wait);
			     }else{
			         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()+50);
			     }
			     jQuery13('#CenterAndRight').trigger('resize');
			}, 10);
		};
		
	}else if(tempThis.arr.device_==3){
		var newLatLng = new google.maps.LatLng(tempThis.arr.video_coordinateX,tempThis.arr.video_coordinateY);
        tempThis.quadrilateral.latLng = newLatLng;
    	var base = checkPointBase(newLatLng);
		if(base!=null){
			_$("#video_base_id").val(base._marker._id);
			_$("#video_base_name").val(base._name);
			tempThis.arr.video_base_id =base._marker._id;
			tempThis.arr.video_base_name = base._name;
		}else{
			_$("#video_base_id").val("");
			_$("#video_base_name").val("");
			tempThis.arr.video_base_id = "";
			tempThis.arr.video_base_name = "";
		}
		var partition = checkPointPartition(newLatLng);
		if(partition!=null){
			_$("#video_partition_id").val(partition._id);
			_$("#video_partition_name").val(partition._name);
			tempThis.arr.video_partition_id = partition._id;
			tempThis.arr.video_partition_name = partition._name;
		}else{
			_$("#video_partition_id").val("");
			_$("#video_partition_name").val("");
			tempThis.arr.video_partition_id = "";
			tempThis.arr.video_partition_name = "";
		}
		var tunnel = checkPointTunnel(newLatLng);
		if(tunnel!=null){
			_$("#video_tunnel_id").val(tunnel._id);
			_$("#video_tunnel_name").val(tunnel._name);
			tempThis.arr.video_tunnel_id = tunnel._id;
			tempThis.arr.video_tunnel_name = tunnel._name;
		}else{
			_$("#video_tunnel_id").val("");
			_$("#video_tunnel_name").val("");
			tempThis.arr.video_tunnel_id = "";
			tempThis.arr.video_tunnel_name = "";
		}
		add_video(tempThis.arr);
		_$("#divtittle").text("编辑视频设备");
		_$(".tc_top_03").show();
		_$(".rightNo").hide();
		_$(".rightNo11").show();
		_$(".tc_rw_rw2").scrollTop(0);
		_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
		if(_$(".splitbuttonV").attr("class")=="splitbuttonV"){
			_$(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
			var wait=setInterval(function(){
			     if(jQuery13('#rightPane').width()+50>=368){
			         jQuery13('#rightPane').css('width',368);
				 clearInterval(wait);
			     }else{
			         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()+50);
			     }
			     jQuery13('#CenterAndRight').trigger('resize');
			}, 10);
		};
    }
	});
}

function addDevice(type){
	_$(".rightNo").hide();
	_$(".rightNo10").show();
	_$("#device_id").val("");
	_$("#device_base_id").val("");
	_$("#device_base_name").val("");
	_$("#device_partition_id").val("");
	_$("#device_partition_name").val("");
	_$("#device_sn").val("");
	_$("#device_name").val("");
	_Q(".aps_radio:eq(0)").trigger("click");
	_$("#deviceForm\\:device_factoryTimeInputDate").val("");
	_$("#device_description").val("");
	_$("#device_tunnel_id").val("");
	_$("#device_tunnel_name").val("");
	if(type==1){
		_$(".device_2").hide();
		_$("#device_deviceType").val("1");
		_$(".device_1").show();
		_$(".device_typee").show();
		_$(".device_typee2").hide();
	}else if(type==2){
		_$(".device_2").show();
		_$("#device_deviceType").val("2");
		_$(".device_1").hide();
		_$(".device_typee").hide();
		_$(".device_typee2").show();
	}
}

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

function device_ok(data){
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
	for(var i = 0;i<deviceArray.length;i++){
		var m = deviceArray[i];
		if(m.getMap()!=null&&m.arr._index==_$("#device_index").val()){
			if(m.arr.device_==1&&m.quadrilateral.oldlatLng){
				var tunnel = checkPointTunnel(m.quadrilateral.oldlatLng);
				tunnel.device_ = undefined;
			}
			m.arr.device_base_id = _$("#device_base_id").val();
			m.arr.device_base_name = _$("#device_base_name").val();
			m.arr.device_partition_id = _$("#device_partition_id").val();
			m.arr.device_partition_name = _$("#device_partition_name").val();
			m.arr.device_tunnel_id = _$("#device_tunnel_id").val();
			m.arr.device_tunnel_name = _$("#device_tunnel_name").val();
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
			_$("#device_id").val(tempp.id);
		}
	}
	if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
		_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
		var wait=setInterval(function(){
		     if(jQuery13('#rightPane').width()-50<=0){
		         jQuery13('#rightPane').css('width',0);
		         clearMap();
			 clearInterval(wait);
		     }else{
		         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
		     }
		     jQuery13('#CenterAndRight').trigger('resize');
		}, 10);
	}
}

function device_delete(){
	if(_$("#device_id").val()==""){
		for(var i = 0;i<deviceArray.length;i++){
			var m = deviceArray[i];
			if(m.getMap()!=null&&m.arr._index==_$("#device_index").val()){
				m.setMap(null);
				m.div.style.display="none";
				if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
					_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
					var wait=setInterval(function(){
					     if(jQuery13('#rightPane').width()-50<=0){
					         jQuery13('#rightPane').css('width',0);
						 clearInterval(wait);
						 clearMap();
					     }else{
					         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
					     }
					     jQuery13('#CenterAndRight').trigger('resize');
					}, 10);
				}
				return ;
			}
		}
	}else{
		device_delete_next(_$("#device_id").val());
	}
}

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
			if(m.getMap()!=null&&m.arr._index==_$("#device_index").val()){
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
		if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
			_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
			var wait=setInterval(function(){
			     if(jQuery13('#rightPane').width()-50<=0){
			         jQuery13('#rightPane').css('width',0);
				 clearInterval(wait);
				 clearMap();
			     }else{
			         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
			     }
			     jQuery13('#CenterAndRight').trigger('resize');
			}, 10);
		}
	}
}

function device_no(){
	var tm;
	for(var i = 0;i<deviceArray.length;i++){
		var m = deviceArray[i];
		if(m.getMap()!=null&&m.arr._index==_$("#device_index").val()){
			tm = m;
			if(_$("#device_id").val()==""){
				m.setMap(null);
				m.div.style.display="none";
				if(m.quadrilateral.oldlatLng){
					var tunnel = checkPointTunnel(m.quadrilateral.oldlatLng);
					tunnel.device_ = undefined;
				}
			}
		}
	}
	if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
		_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
		var wait=setInterval(function(){
		     if(jQuery13('#rightPane').width()-50<=0){
		         jQuery13('#rightPane').css('width',0);
			 clearInterval(wait);
			 clearMap();
		     }else{
		         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
		     }
		     jQuery13('#CenterAndRight').trigger('resize');
		}, 10);
	}
	//this.quadrilateral.oldlatLng = this.quadrilateral.latLng;
	if(tm.quadrilateral.oldlatLng){
		tm.quadrilateral.latLng = tm.quadrilateral.oldlatLng;
		tm.quadrilateral.oldlatLng = undefined;
		tm.draw();
	}
}

function add_video(arr){
	_$("#video_id").val(arr.video_id);
	_$("#video_sn").val(arr.video_sn);
	_$("#video_name").val(arr.video_name);
	_$("#video_index").val(arr._index);
	_$("#video_description").val(arr.video_description);
	_$("#video_coordinateX").val(arr.video_coordinateX);
	_$("#video_coordinateY").val(arr.video_coordinateY);
	var t1 = arr.video_selected;
	_Q(".selected_radio:eq("+t1+")").trigger("click");
	var t2 = arr.video_status;
	_Q(".status_radio:eq("+t2+")").trigger("click");
	_$("#videoForm\\:video_factoryTimeInputDate").val(arr.video_factoryTime);
	_$("#video_ip").val(arr.video_ip);
	_$("#video_channel_no").val(arr.video_channel_no);
	_$("#video_device_video_channel_no").val(arr.video_device_video_channel_no);
	_$("#video_username").val(arr.video_username);
	_$("#video_password").val(arr.video_password);
	_$("#video_app_ip").val(arr.video_app_ip);
	_$("#video_app_port").val(arr.video_app_port);
	_$("#video_app_device_video_channel_no").val(arr.video_app_device_video_channel_no);
	_$("#video_app_username").val(arr.video_app_username);
	_$("#video_app_password").val(arr.video_app_password);
	_$("#video_tpe_id").val(arr.video_type_id);
	_$("#video_tpe_id").selectmenu("destroy").selectmenu({style:'dropdown'});
	_$(".ui-selectmenu-dropdown").addClass("small322");
    _$(".ui-selectmenu-dropdown").removeClass("ui-selectmenu-dropdown");
    _$(".ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
    _$(".ui-selectmenu-menu").removeClass("ui-selectmenu-menu");
    _$("#video_access_way").val(arr.video_access_way);
	_$("#video_access_way").selectmenu("destroy").selectmenu({style:'dropdown'});
	_$("#video_access_way-button").removeClass("ui-selectmenu-dropdown").addClass("small322");
	_$("#video_access_way-menu").removeClass("ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
	_Q(".videohide1").hide();
	_Q(".videohide2").hide();
	_Q(".videohide"+arr.video_access_way).show();
}

function video_ok(data){
	eval("var tempp = "+data);
	if(tempp.OK==false){
		
	}else{
		if(tempp.soru=="save"){
			videoStr.push(tempp);
		}else{
			for(var i = 0;i<videoStr.length;i++){
				if(videoStr[i].id==tempp.id){
					videoStr[i] = tempp;
				}
			}
		}
	}
	for(var i = 0;i<videoArray.length;i++){
		var m = videoArray[i];
		if(m.getMap()!=null&&m.arr._index==_$("#video_index").val()){
			m.arr.device_base_id = _$("#video_base_id").val();
			m.arr.device_base_name = _$("#video_base_name").val();
			m.arr.device_partition_id = _$("#video_partition_id").val();
			m.arr.device_partition_name = _$("#video_partition_name").val();
			m.arr.device_tunnel_id = _$("#video_tunnel_id").val();
			m.arr.device_tunnel_name = _$("#video_tunnel_name").val();
			m.arr.video_id = tempp.videoId;
			m.arr.video_sn = tempp.sn;
			m.arr.video_name = tempp.name;
			m.arr.video_description=tempp.description;
			m.arr.video_coordinateX = tempp.coordinateX;
			m.arr.video_coordinateY = tempp.coordinateY;
			m.arr.video_status = tempp.status;
			var selected = tempp.selected?0:1;
			m.arr.video_selected = selected;
			m.arr.video_factoryTime = tempp.factoryTime;;
			m.arr.video_ip = tempp.ip;
			m.arr.video_channel_no = tempp.channelNo;
			m.arr.video_device_video_channel_no = tempp.deviceVideoChannelNo;
			m.arr.video_username = tempp.username;
			m.arr.video_password = tempp.password;
			m.arr.video_app_ip = tempp.appIp;
			m.arr.video_app_port = tempp.appPort;
			m.arr.video_app_device_video_channel_no = tempp.appDeviceVideoChannelNo;
			m.arr.video_app_username = tempp.appUsername;
			m.arr.video_app_password = tempp.appPassword;
			m.arr.video_type_id = tempp.deviceTypeId;
			m.arr.video_access_way = tempp.accessWay;
			m.quadrilateral.oldlatLng = undefined;
			_$("#video_id").val(tempp.videoId);
		}
	}
	if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
		_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
		var wait=setInterval(function(){
		     if(jQuery13('#rightPane').width()-50<=0){
		         jQuery13('#rightPane').css('width',0);
			 clearInterval(wait);
			 clearMap();
		     }else{
		         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
		     }
		     jQuery13('#CenterAndRight').trigger('resize');
		}, 10);
	}
}

function video_no(){
	var tm;
	for(var i = 0;i<videoArray.length;i++){
		var m = videoArray[i];
		if(m.getMap()!=null&&m.arr._index==_$("#video_index").val()){
			tm = m;
			if(_$("#video_id").val()==""){
				m.setMap(null);
				m.div.style.display="none";
			}
		}
	}
	if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
		_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
		var wait=setInterval(function(){
		     if(jQuery13('#rightPane').width()-50<=0){
		         jQuery13('#rightPane').css('width',0);
			 clearInterval(wait);
			 clearMap();
		     }else{
		         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
		     }
		     jQuery13('#CenterAndRight').trigger('resize');
		}, 10);
	}
	if(tm.quadrilateral.oldlatLng){
		tm.quadrilateral.latLng = tm.quadrilateral.oldlatLng;
		tm.quadrilateral.oldlatLng = undefined;
		tm.draw();
	}
}

function video_delete(){
	if(_$("#video_id").val()==""){
		for(var i = 0;i<videoArray.length;i++){
			var m = videoArray[i];
			if(m.getMap()!=null&&m.arr._index==_$("#video_index").val()){
				m.setMap(null);
				m.div.style.display="none";
				if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
					_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
					var wait=setInterval(function(){
					     if(jQuery13('#rightPane').width()-50<=0){
					         jQuery13('#rightPane').css('width',0);
						 clearInterval(wait);
						 clearMap();
					     }else{
					         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
					     }
					     jQuery13('#CenterAndRight').trigger('resize');
					}, 10);
				}
				return ;
			}
		}
	}else{
		video_delete_next(_$("#video_id").val());
	}
}

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
			if(m.getMap()!=null&&m.arr._index==_$("#video_index").val()){
				videoArray = videoArray.del(i);
				m.setMap(null);
				m.div.style.display="none";
			}
		}
		if(_$(".splitbuttonV").attr("class")=="splitbuttonV invert"){
			_$(".splitbuttonV").removeClass().addClass("splitbuttonV");
			var wait=setInterval(function(){
			     if(jQuery13('#rightPane').width()-50<=0){
			         jQuery13('#rightPane').css('width',0);
				 clearInterval(wait);
				 clearMap();
			     }else{
			         jQuery13('#rightPane').css('width',jQuery13('#rightPane').width()-50);
			     }
			     jQuery13('#CenterAndRight').trigger('resize');
			}, 10);
		}
	}
}


function land_ok(data){
	eval("var tt = "+data);
	if(_$("#land_id").val()==""){
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
		_$(".land_table").empty().append(html);
	}
	_$(".rightNo12").hide();
	_$(".rightNo3").show();
}

function addland(){
	_$("#land_id").val("");
	_$("#land_partitionId").val(_$("#partition_id").val());
	_$("#land_partitionName").val(_$("#partition_name").val());
	_$("#landForm\\:land_testDateInputDate").val("");
	_$("#land_testOrg").val("");
	_$("#land_phVal").val("");
	_$("#land_ecVal").val("");
	_$("#land_soilBulkDensity").val("");
	_$("#land_soilComposition").val("");
	_$("#land_soilWater").val("");
	_$("#land_nitrogen").val("");
	_$("#land_phosphorus").val("");
	_$("#land_potassium").val("");
	_$("#land_organicVal").val("");
	_$("#land_cec").val("");
	_$("#land_redoxPotential").val("");
	_$("#land_availableNitrogen").val("");
	_$("#land_availablePhosphorus").val("");
	_$("#land_availableK").val("");
	_$("#land_exchangeCa").val("");
	_$("#land_exchangeMg").val("");
	_$("#land_totalCa").val("");
	_$("#land_totalMg").val("");
	_$("#land_totalSodium").val("");
	_$("#land_countMercury").val("");
	_$("#land_countArsenic").val("");
	_$("#land_countChrome").val("");
	_$("#land_countLead").val("");
	_$("#land_countNickel").val("");
	_$("#land_countCadmium").val("");
	_$("#land_effectiveBoron").val("");
	_$("#land_wffectiveMolybdenum").val("");
	_$("#land_wffectiveZn").val("");
	_$("#land_effectiveManganese").val("");
	_$("#land_effectiveIron").val("");
	_$("#land_effectiveCopper").val("");
	_$("#land_countSe").val("");
	_$("#land_effectiveSulfur").val("");
	_$("#land_effectiveSilicon").val("");
	_$("#land_chlorideIonContent").val("");
	_$("#land_herbicideResidues").val("");
	_$("#land_sulfateIonContent").val("");
	_$("#land_exchangeTotalBase").val("");
	
	_$(".rightNo12").show();
	_$(".rightNo3").hide();
}

function land_no(){
	_$(".rightNo12").hide();
	_$(".rightNo3").show();
}

function delland_next(data){
	eval("var t_t = "+data);
	_$(".land"+t_t.id).hide();
	for(var i = 0;i<landStr.length;i++){
		var tem = landStr[i];
		if(tem.id == t_t.id){
			landStr = landStr.del(i);
			break;
		}
	}
}

function editland(id){
	for(var i = 0;i<landStr.length;i++){
		var tem = landStr[i];
		if(tem.id==id){
			_$("#land_id").val(tem.id);
			_$("#land_partitionId").val(tem.partitionId);
			_$("#land_partitionName").val(_$("#partition_name").val());
			_$("#landForm\\:land_testDateInputDate").val(tem.testDate);
			_$("#land_testOrg").val(tem.testOrg);
			_$("#land_phVal").val(tem.phVal);
			_$("#land_ecVal").val(tem.ecVal);
			_$("#land_soilBulkDensity").val(tem.soilBulkDensity);
			_$("#land_soilComposition").val(tem.soilComposition);
			_$("#land_soilWater").val(tem.soilWater);
			_$("#land_nitrogen").val(tem.nitrogen);
			_$("#land_phosphorus").val(tem.phosphorus);
			_$("#land_potassium").val(tem.potassium);
			_$("#land_organicVal").val(tem.organicVal);
			_$("#land_cec").val(tem.cec);
			_$("#land_redoxPotential").val(tem.redoxPotential);
			_$("#land_availableNitrogen").val(tem.availableNitrogen);
			_$("#land_availablePhosphorus").val(tem.availablePhosphorus);
			_$("#land_availableK").val(tem.availableK);
			_$("#land_exchangeCa").val(tem.exchangeCa);
			_$("#land_exchangeMg").val(tem.exchangeMg);
			_$("#land_totalCa").val(tem.totalCa);
			_$("#land_totalMg").val(tem.totalMg);
			_$("#land_totalSodium").val(tem.totalSodium);
			_$("#land_countMercury").val(tem.countMercury);
			_$("#land_countArsenic").val(tem.countArsenic);
			_$("#land_countChrome").val(tem.countChrome);
			_$("#land_countLead").val(tem.countLead);
			_$("#land_countNickel").val(tem.countNickel);
			_$("#land_countCadmium").val(tem.countCadmium);
			_$("#land_effectiveBoron").val(tem.effectiveBoron);
			_$("#land_wffectiveMolybdenum").val(tem.wffectiveMolybdenum);
			_$("#land_wffectiveZn").val(tem.wffectiveZn);
			_$("#land_effectiveManganese").val(tem.effectiveManganese);
			_$("#land_effectiveIron").val(tem.effectiveIron);
			_$("#land_effectiveCopper").val(tem.effectiveCopper);
			_$("#land_countSe").val(tem.countSe);
			_$("#land_effectiveSulfur").val(tem.effectiveSulfur);
			_$("#land_effectiveSilicon").val(tem.effectiveSilicon);
			_$("#land_chlorideIonContent").val(tem.chlorideIonContent);
			_$("#land_herbicideResidues").val(tem.herbicideResidues);
			_$("#land_sulfateIonContent").val(tem.sulfateIonContent);
			_$("#land_exchangeTotalBase").val(tem.exchangeTotalBase);
			_$(".rightNo12").show();
			_$(".rightNo3").hide();
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
   //]]>
 
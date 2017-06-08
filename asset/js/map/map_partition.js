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
	var lag;
	if(_center!=""){
		_center = _center.replace(/[()]/g, '');
		var yy = _center.split(",");
		lag = new google.maps.LatLng(parseFloat(yy[0]),parseFloat(yy[1]));
	}else{
		defaultZoom = 4;
		lag = new google.maps.LatLng(36.87962060502676, 107.05078125);
	}
   //初始化地图参数  
 var mapOptions = {  
   center: lag,  
   zoom: 15,  
   mapTypeId: google.maps.MapTypeId.SATELLITE,
	streetViewControl: false,// 取消街景
   //disableDoubleClickZoom:true,
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
   //设置图形显示样式  

   polygonOptions: {  
   strokeColor: "#FF0000",  
   strokeOpacity: 0.8,  
   strokeWeight: 2,  
   fillColor: null,  
   fillOpacity: 0.35,  
   editable: true
	}  
 });  
 drawingManager.setMap(map);  

////////
  //多边形绘画完成触发
	//循环显示 经纬度  
	google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);
   google.maps.event.addListener(map, 'click', function(){});
	google.maps.event.addListener(map, 'dblclick', function(event){
		//alert(bermudaTriangle.Contains(event.latLng));
	 });
	google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {   
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
	
	google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
		if(!drawingManager.isshow){
			polygon.setMap(null);
			return;
		}
		var mtype = drawingManager.mytype;
		var m;
		var pointStr ="";
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
			polygon._group=pointStr;
			polygon._index=++second__index;
			polygon.partition_x=bounds.getCenter().lat();
			polygon.partition_y=bounds.getCenter().lng();
			var radius = polygon.getPath();   
			google.maps.event.addListener(radius, 'insert_at',function(index){reset2(polygon,radius,index,this);} );
			google.maps.event.addListener(radius, 'remove_at',function(index){reset2(polygon,radius,index,this);});
			google.maps.event.addListener(radius, 'set_at', function(index){reset2(polygon,radius,index,this);});
			//画完弹出右侧,赋值
			_Q("#partition_x").val(polygon.partition_x);
			_Q("#partition_y").val(polygon.partition_y);
		    _Q("#base_id").val(polygon._base_id);
		    _Q("#partition_group").val(polygon._group);
		    _Q("#partition_area").val(polygon.mianji);
		    _Q("#partition_index").val(polygon._index);
		    _Q("input[name='partitionFormColor']").val(polygon.get("fillColor"));
		    _Q("#partitionForm\\:color-colorPicker-hex").val(polygon.get("fillColor").replace("#",""));
		    _Q(".rich-color-picker-icon").css("background-color",polygon.get("fillColor"));
			mark2Array.push(polygon);
			drawingManager.setDrawingMode(null);
			setSelection(polygon);
		}
		return;
		}
	});
	loadfirst();
	loadsecond();
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
	
	for(var i = 0;i<mark1Array.length;i++){
		m = mark1Array[i];
		if(m.Contains(array[0])){
			var bounds = new google.maps.LatLngBounds();
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
	_Q("#partition_x").val(bounds.getCenter().lat());
	_Q("#partition_y").val(bounds.getCenter().lng());
	var mianji = google.maps.geometry.spherical.computeArea(radius)*0.0015;
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
  
//加载地图
google.maps.event.addDomListener(window, 'load', initialize);  

//可以进行分区绘画
function xx1(){
	if(mark1Array.length==0){
		alert("请先画厂区图");
		return ;
	}
	drawingManager.polygonOptions.zIndex = 1;
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
					 icon: '../asset/images/zb.png',
					 _name:array.name,
					 _id:array.id,
					 _index:i,
					 _coordinate_X:array.coordinateX,
					 _coordinate_Y:array.coordinateY
				 });
				array_mark.push(marker);
				marker.setMap(null);
				attachSecretMessage(marker, array);
				var pointStr = array.coordinateGroup;
				pointStr = pointStr.replace(/[()]/g, '');
				if(pointStr.length==0){
					//movemarker(marker);
					continue;
				}
				if(a<2)
					a=2;
				var triangleCoords = [];  
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
	            loadFirstPloygon(bermudaTriangle);
	            
	            bermudaTriangle.setMap(map);
			}
		}
		
		//加载区域
		function loadsecond(){
			second__index = secondstr.length;
			for(var i = 0;i<secondstr.length;i++){
				var array = secondstr[i];
				var pointStr = array.coordinateGroup;
				pointStr = pointStr.replace(/[()]/g, '');
				if(pointStr.length==0){
					xx1();
					_Q(".rightNo").hide();
					_Q(".rightNo3").show();
					_Q("#divtittle").text("编辑区域分区");
					_Q("#divFloatToolsView_").animate( {width : 368}, 800, function() {});
					_Q("#searchLi").animate( {right : window.screen.width / 4 + 10}, 800, function() {});
					_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
					_Q(".btnOpen").hide();
					var html = "";
					_Q(".soil_table").empty();
					for(var i = 0;i<soilStr.length;i++){
						var tem = soilStr[i];
						if(tem.partitionId==array.id){
							var te = _Q("#soil_route_of").find("option[value="+tem.route_of+"]").html();
							if(te==null)
								te="";
							html+="<tr class='soill"+tem.id+"'><td class='bc_th01'>"+tem.begin_time+"年"+tem.end_time+"年</td><td  class='bc_th01'>"+te+"</td><td  class='bc_th01'><a href='#' onclick='editsoil("+tem.id+")'>修改</a>  <a href='#' onclick='delsoil("+tem.id+")'>删除</a></td></tr>";
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
						if(tem.partitionId==array.id){
							html2+="<tr class='land"+tem.id+"'><td class='bc_th01'>"+tem.testDate+"</td><td  class='bc_th01' >"+tem.testOrg+"</td><td  class='bc_th01' >"+tem.phVal+"</td><td  class='bc_th01'><a href='#' onclick='editland("+tem.id+")'>修改</a>  <a href='#' onclick='delland("+tem.id+")'>删除</a></td></tr>";
						}
					}
					if(html2!=""){
						html2 = "<tr><td class='bc_th01'>测试日期</td><td class='bc_th01'>测试机构</td><td class='bc_th01'>酸碱度</td><td class='bc_th01' style='width:20%'>操作</td></tr>"+html2;
						_Q(".land_table").empty().append(html2);
					}
					_Q("#partition_x").val(array.coordinateX);
					_Q("#partition_y").val(array.coordinateY);
					_Q("#partition_name").val(array.name);
					_Q("#partition_id").val(array.id);
					_Q("#base_id").val(array.base);
					_Q("#partition_index").val(i);
					_Q("#partition_group").val("");
					_Q("#partition_area").val(array.muNumber);
					_Q("#partition_description").val(array.description);
					_Q("input[name='partitionFormColor']").val(array.color);
					_Q("#partitionForm\\:color-colorPicker-hex").val(array.color.replace("#", ""));
					_Q(".rich-color-picker-icon ").css("background-color",array.color);					
				}else{
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
						strokeOpacity: 0.2,  
						strokeWeight: 2,  
						fillColor: array.color,  
						fillOpacity: 0.2,  
						editable: true
					});  
					if(array.coordinateX==0){
						bermudaTriangle.partition_x = bounds.getCenter().lat();
						bermudaTriangle.partition_y = bounds.getCenter().lng();
					}else{
						bermudaTriangle.partition_x = array.coordinateX;
						bermudaTriangle.partition_y = array.coordinateY;
					}
					map.setCenter(bounds.getCenter());
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
			}
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
		}
		
		//加载区域第二步
		function loadSecondPloygon(bermudaTriangle,bounds){
			var radius = bermudaTriangle.getPath();   
    		google.maps.event.addListener(radius, 'insert_at',function(index){reset2(bermudaTriangle,radius,index,this);} );
    		google.maps.event.addListener(radius, 'remove_at',function(index){reset2(bermudaTriangle,radius,index,this);});
    		google.maps.event.addListener(radius, 'set_at', function(index){reset2(bermudaTriangle,radius,index,this);});
			setSelection(bermudaTriangle);
			_Q(".rightNo").hide();
			_Q(".rightNo3").show();
			_Q("#divtittle").text("编辑区域分区");
			_Q("#divFloatToolsView_").animate( {width : 368}, 800, function() {});
			_Q("#searchLi").animate( {right : window.screen.width / 4 + 10}, 800, function() {});
			_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
			_Q(".btnOpen").hide();
			var html = "";
			_Q(".soil_table").empty();
			for(var i = 0;i<soilStr.length;i++){
				var tem = soilStr[i];
				if(tem.partitionId==bermudaTriangle._id){
					var te = _Q("#soil_route_of").find("option[value="+tem.route_of+"]").html();
					if(te==null)
						te="";
					html+="<tr class='soill"+tem.id+"'><td class='bc_th01'>"+tem.begin_time+"年"+tem.end_time+"年</td><td  class='bc_th01'>"+te+"</td><td  class='bc_th01'><a href='#' onclick='editsoil("+tem.id+")'>修改</a>  <a href='#' onclick='delsoil("+tem.id+")'>删除</a></td></tr>";
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
			google.maps.event.addDomListener(bermudaTriangle, 'dblclick', function(
					event) {// alert(1)
						setSelection(bermudaTriangle);
						if(bounds.getCenter().lat()!=0&&bounds.getCenter().lng()!=-180){
						    map.setCenter(bounds.getCenter());
							map.setZoom(17);
					    }
						
					}); 
		}
		
		//加载描点第二部
		function attachSecretMessage(marker,array){
			var contentString = "<div style='width:200px'>"+array.name+"<br/>联系人:"+array.contact+"<br/>电话:"+array.phone+"<br/>地址:"+array.address+"<br/>描述:"+array.description+"</div>"; 
			var infowindow = new google.maps.InfoWindow({
				content: contentString,
				maxWidth: 400
				});
			marker._infowindow=infowindow;
			google.maps.event.addListener(marker, 'click', function() {
			    infowindow.open(marker.get('map'), marker);
			    map.setCenter(marker.getPosition());
				map.setZoom(16);
			  });
		}	  
		
		//区域编辑完成
		function part_ok(url){
			setTimeout('window.location="'+url+"?_X="+Math.random()+'"',0);
			return;
			var polygon;
			for(var i = 0;i<mark2Array.length;i++){
				polygon = mark2Array[i];
				if(polygon._index==_Q("#partition_index").val()){
					polygon._id=_Q("#partition_id").val();
					polygon._base_id=_Q("#base_id").val();
					polygon._group=_Q("#partition_group").val();
					polygon.mianji=_Q("#partition_area").val();
					polygon._name=_Q("#partition_name").val();
					polygon._description=_Q("#partition_description").val();
					polygon.set("fillColor",_Q("input[name='partitionFormColor']").val());
					polygon.set("strokeColor",_Q("input[name='partitionFormColor']").val());
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
			_Q("#divFloatToolsView_").animate({width: 1},800,function(){_Q("#divFloatToolsView_").css("width","1");});
			_Q("#searchLi").animate({right: 31},800,function(){_Q("#searchLi").css("right","31");});
			_Q(".btnOpen").show();
			setMapNotNull();
		}
		//取消区域编辑
		function part_no (url){
			window.location=url;
			return;
			clearSelection();
			_Q("#divFloatToolsView_").animate({width: 1},800,function(){_Q("#divFloatToolsView_").css("width","1");});
			_Q("#searchLi").animate({right: 31},800,function(){_Q("#searchLi").css("right","31");});
			_Q(".btnOpen").show();
			setMapNotNull();
		}	
		//删除区域
		function part_delete(){
			for(var i = 0;i<mark1Array.length;i++){
				var polygon = mark1Array[i];
				if(polygon._marker._id==_Q("#mark_id").val()){
					polygon.setMap(null);
					polygon._marker._btype=undefined;
					mark_delete(_Q("#mark_id").val());
				}
			}
			clearSelection();
			_Q("#divFloatToolsView_").animate({width: 1},800,function(){_Q("#divFloatToolsView_").css("width","1");});
			_Q("#searchLi").animate({right: 31},800,function(){_Q("#searchLi").css("right","31");});
			_Q(".btnOpen").show();
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

function soil_no(){
	_Q(".rightNo9").hide();
	_Q(".rightNo3").show();
}

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

function land_no(){
	_Q(".rightNo12").hide();
	_Q(".rightNo3").show();
}

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
 
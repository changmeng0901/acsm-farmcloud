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
	var markerIndex = google.maps.Marker.MAX_ZINDEX;
	var noPaint;
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
 
 google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {   
	//多边形绘画完成触发
  if (event.type == google.maps.drawing.OverlayType.POLYGON) {   
	
  var radius = event.overlay.getPath();   

  var mianji = google.maps.geometry.spherical.computeArea(radius)*0.0015;   
  mianji = CurrencyFormatted(mianji);
  drawingManager.setDrawingMode(null);
	var newShape = event.overlay;
	newShape.mianji=mianji;
	newShape.title="xxxxxxxxxxxxxxx";
	
	array.push(newShape);
	setSelection(newShape);

}   

}
);
 
	google.maps.event.addListener(drawingManager, 'drawingmode_changed', clearSelection);
   google.maps.event.addListener(map, 'click', function(){});
	google.maps.event.addListener(map, 'dblclick', function(event){
		//alert(bermudaTriangle.Contains(event.latLng));
	 });

	google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
		var mtype = drawingManager.mytype;
		var m;
		var pointStr ="";
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
			polygon._group_parent_id=m._id;
			polygon._parent=m;
			polygon._name="";
			polygon._id="";
			polygon._group_type=drawingManager.select;
			polygon._group=pointStr;
			polygon._color="";
			polygon._farmer="";
			polygon._envlist="";
			polygon._muarea="";
			polygon._index=++third__index;
			var radius = polygon.getPath();   
			google.maps.event.addListener(radius, 'insert_at',function(index){reset3(polygon,radius,index,this);} );
			google.maps.event.addListener(radius, 'remove_at',function(index){reset3(polygon,radius,index,this);});
			google.maps.event.addListener(radius, 'set_at', function(index){reset3(polygon,radius,index,this);});
			if(polygon._group_parent_id>0){
				_Q("#group_parent_id").val(polygon._group_parent_id);
				_Q("#group_parent_id_default").val(polygon._group_parent_id);
				_Q("#group_parent_id").selectpicker('refresh');
			}else{
				_Q("#group_parent_id").selectpicker('val',0);
			}
			if(document.body.clientWidth<=1024){
				_Q("#searchLi").animate({right: window.screen.width/4+17},800,function(){});
			}else{
				_Q("#searchLi").animate({right: window.screen.width/4+50},800,function(){});
			}
		    _Q("#group_group").val(polygon._group);
		    _Q("#group_area").val(polygon.mianji);
		    _Q("#group_area_hidden").text(polygon.mianji+"亩");
		    _Q("#muarea").val(polygon.mianji);
		    if(polygon._group_type<5&&false)
		    	_Q(".firstblock").show();
		    else
		    	_Q(".firstblock").hide();
		    _Q("input[name='groupFormColor']").val(polygon.get("fillColor"));
		    _Q("#groupForm\\:color-colorPicker-hex").val(polygon.get("fillColor").replace("#",""));
		    _Q(".rich-color-picker-icon").css("background-color",polygon.get("fillColor"));
		    setMapNull();
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
	
	google.maps.event.addListenerOnce(map, 'idle', function(){
		loadfirst();
		loadsecond();
		loadthird();
	});
}  

//大棚的采集设备,调节设备显示
function loaddevic (index,has1){
	var one = collects["m"+index];
	_Q(".tc_str_check1").empty();
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
		_Q(".tc_str_check1").append(str);
	}
	var two = regulate["m"+index];
	_Q(".tc_str_check2").empty();
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
		_Q(".tc_str_check2").append(str);
	}
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


//大棚范围监控
function reset3(newShape,radius,index,obj) {
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
	for(var i = 0;i<mark2Array.length;i++){
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
	newShape._group_parent_id=m._id;
	newShape._parent=m;
	_Q("#group_x").val(bounds.getCenter().lat());
	_Q("#group_y").val(bounds.getCenter().lng());
	_Q("#group_parent_id").val(newShape._group_parent_id);
	if(_Q("#group_parent_id").val()==null)
		_Q("#group_parent_id")[0].selectedIndex = 0;
	_Q("#group_parent_id").selectpicker('refresh');
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
	  
    function loadfirst (){
		var first = 0;
		mark__index = markstr.length;
		for(var i = 0;i<markstr.length;i++){
			if(first==0)
				first=1;
			var array = markstr[i];
			var point = new google.maps.LatLng(array.coordinateX, array.coordinateY);
			 var marker = new google.maps.Marker({
			     position: point,
			     title:array.name,
				 icon: '../asset/images/zb.png',
				 _name:array.name,
				 _id:array.id,
				 _index:i,
				 _coordinate_X:array.coordinateX,
				 _coordinate_Y:array.coordinateY
			 });
			array_mark.push(marker);
			
			var pointStr = array.coordinateGroup;
			pointStr = pointStr.replace(/[()]/g, '');
			if(pointStr.length==0)
				continue;
			if(first<2)
				first=2;
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
            bermudaTriangle.setMap(map);
            
		}
		
	}
    
    function xx2(index){
    	var col = colors["color"+index];
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
    	drawingManager.select=index;
    	setMapNull();
    	drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    }
    
		//加载区域
		function loadsecond(){
			second__index = secondstr.length;
			for(var i = 0;i<secondstr.length;i++){
				var array = secondstr[i];
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
	              fillOpacity: 0.35,  
	              editable: false
	            });  
	            bermudaTriangle._index=i;
	            bermudaTriangle._name=array.name;
	            bermudaTriangle.mianji=array.muNumber;
	            bermudaTriangle._id=array.id;
	            bermudaTriangle._base_id=array.base;
	            bermudaTriangle._description=array.description;
	            bermudaTriangle._group=array.coordinateGroup;
	            mark2Array.push(bermudaTriangle);
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
				if(pointStr.length==0){
					//_Q("#group_type").attr("readonly","readonly")
					loadthird_nogroup(array);
					xx2(array.plantEnvTypeId);
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
						strokeOpacity: 0.8,  
						strokeWeight: 2,  
						fillColor: array.color,  
						fillOpacity: 0.35,  
						editable: false
					});  
					if(array.latitude==0){
						bermudaTriangle.group_x=bounds.getCenter().lat();
						bermudaTriangle.group_y=bounds.getCenter().lng();
					}  else{
						bermudaTriangle.group_x=array.latitude;
						bermudaTriangle.group_y=array.longitude;
					}
					map.setZoom(19);
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
					bermudaTriangle._base_id = array.baseId;
					bermudaTriangle._tunnel_group_id = array.tunnelGroupId;
					mark3Array.push(bermudaTriangle);
					loadThirdPloygon(bermudaTriangle,bounds);
					if(pointStr.length>0){
						bermudaTriangle.setMap(map);
						map.setCenter(bounds.getCenter());
					}else{
						var col = "#f5d503";
						drawingManager.polygonOptions.strokeColor=col;
						drawingManager.polygonOptions.fillColor=col;
						drawingManager.polygonOptions.fillOpacity=0.4;
						drawingManager.mytype="3";
						drawingManager.select=1;
						setMapNull();
						drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);	
						noPaint = bermudaTriangle;
					}
				}
	            //
			}
		}
		
		function loadthird_nogroup(array){
			var tempName = "";
			for(var w = 0;w<mark2Array.length;w++){
				if(mark2Array[w]._id==array.partId)
					tempName = mark2Array[w]._name;
					
			}
			_Q("#group_parent_id").val(array.partId);
			_Q("#group_type").val(array.plantEnvTypeId);
			_Q("#group_type_default").val(array.plantEnvTypeId);
			_Q("#group_type_hidden").html(envTypeList[array.plantEnvTypeId]);
			if(array.partId>0){
				_Q("#group_parent_id").val(array.partId);
				_Q("#group_parent_id_default").val(array.partId);
				_Q("#group_parent_id").selectpicker('refresh');
			}else{
				_Q("#group_parent_id")[0].selectedIndex = 0;
				_Q("#group_parent_id_default").val(0);
				_Q("#group_parent_id").selectpicker('refresh');
			}
			nonecheck();
			 if(array.plantEnvTypeId==8){
				_Q(".animal_hide").show();
				_Q(".plant_hide").hide();
				_Q('#group_farmer2').val(array.keeperId);
				_Q('#group_farmer3').val(array.masterId);
				_Q("#group_farmer2").selectpicker('refresh');
				_Q("#group_farmer3").selectpicker('refresh');
                _Q('#group_groupId').val(array.tunnelGroupId);
                _Q("#group_groupId").selectpicker('refresh');

				var animal_html = '';
				for(var i = 0;i<animalStr.length;i++){
					var obj_ = animalStr[i];
					if(obj_[3]==array.tunnelInfoId){
						animal_html+='<li class="breedList_link"><div class="breedPic"><span class="zhezhaoImg"><img src="'+obj_[2]+'" /></span></div><p class="breedText">'+obj_[1]+'</p></li>'
					}
				}
				if(animal_html!=''){
					_Q(".breedList").empty();
					_Q(".breedList").append(animal_html);
				}else{
					_Q(".breedList").empty();
				}
			}else{
				_Q(".animal_hide").hide();
				_Q(".plant_hide").show();
				_Q('#group_farmer').val(array.keeperId);
				_Q('#group_farmer1').val(array.masterId);
				_Q("#group_farmer").selectpicker('refresh');
				_Q("#group_farmer1").selectpicker('refresh');
				_Q('#group_groupId').val(array.tunnelGroupId);
                _Q("#group_groupId").selectpicker('refresh');
			}
			
			_Q("#group_base_id").val(array.baseId);
			_Q("#group_x").val("");
			_Q("#group_y").val("");
		    _Q("#group_parent_name").text(tempName);
			_Q("#group_name").val(array.tunnelName);
			_Q("#group_id").val(array.tunnelInfoId);
		    _Q("#group_parent_id").val(array.partId);
		    _Q("#group_index").val(1);
		    _Q("#group_group").val("");
		    _Q("#group_area").val(array.muNumber);
		    _Q("#group_area_hidden").text(array.muNumber+"亩");
		    _Q("#muarea").val(array.area);
		    _Q("#group_type").val(array.plantEnvTypeId);
		    if(array.plantEnvTypeId<5)
		    	_Q(".firstblock").show();
		    else
		    	_Q(".firstblock").hide();
		    _Q("input[name='groupFormColor']").val(array.color);
   		    _Q("#groupForm\\:color-colorPicker-hex").val(array.color.replace("#",""));
   		    _Q(".rich-color-picker-icon").css("background-color",array.color);
   		 _Q(".rightNo").hide();
			_Q(".rightNo5").show();
			_Q("#divtittle").text("编辑区域");
			_Q("#divFloatToolsView_").animate({width: 368},800,function(){			});
			_Q(".tc_top_03").show();
			_Q("#searchLi").animate({right: window.screen.width/4+10},800,function(){});
			_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
			_Q(".btnOpen").hide();
   		    setMapNull();
   		var _height = document.body.clientHeight- 161;
   		if(_Q(".rightNo5").find(".jScrollbar_mask").height()>_height){
   			_Q(".rightNo5").find(".jScrollbar_draggable").show();
   			_Q(".rightNo5").find(".tc_rw_rw2").jScrollbar();
   			_Q(".rightNo5").find(".jScrollbar_mask").css("top","0");
   			_Q(".rightNo5").find(".ui-draggable").css("top","0");
   		}else{
   			_Q(".rightNo5").find(".jScrollbar_draggable").hide();
   			_Q(".rightNo5").find(".jScrollbar_mask").css("top","0");
   			_Q(".rightNo5").find(".ui-draggable").css("top","0");
   		}
	}
		
		function clearMap(){
			clearSelection();
			setMapNotNull();
			drawingManager.setDrawingMode(null);			
		}
		
		
		//加载大棚第二步
		function loadThirdPloygon(bermudaTriangle,bounds){
			var radius = bermudaTriangle.getPath();   
    		google.maps.event.addListener(radius, 'insert_at',function(index){reset3(bermudaTriangle,radius,index,this);} );
    		google.maps.event.addListener(radius, 'remove_at',function(index){reset3(bermudaTriangle,radius,index,this);});
    		google.maps.event.addListener(radius, 'set_at', function(index){reset3(bermudaTriangle,radius,index,this);});
				setSelection(bermudaTriangle);
				var tempName = "";
				for(var w = 0;w<mark2Array.length;w++){
					if(mark2Array[w]._id==bermudaTriangle._group_parent_id)
						tempName = mark2Array[w]._name;
						
				}
				_Q("#group_parent_id").val(bermudaTriangle._group_parent_id);
				_Q("#group_type").val(bermudaTriangle._group_type);
				_Q("#group_type_hidden").html(envTypeList[bermudaTriangle._group_type]);
				_Q("#group_type_default").val(bermudaTriangle._group_type);
				if(bermudaTriangle._group_parent_id>0){
					_Q("#group_parent_id").val(bermudaTriangle._group_parent_id);
					_Q("#group_parent_id_default").val(bermudaTriangle._group_parent_id);
					_Q("#group_parent_id").selectpicker('refresh');
				}else{
					_Q("#group_parent_id")[0].selectedIndex = 0;
					_Q("#group_parent_id_default").val(0);
					_Q("#group_parent_id").selectpicker('refresh');
				}
				nonecheck();
				 if(bermudaTriangle._group_type==8){
					_Q(".animal_hide").show();
					_Q(".plant_hide").hide();
					_Q('#group_farmer2').val(bermudaTriangle._keeperId);
					_Q('#group_farmer3').val(bermudaTriangle._masterId);
					_Q("#group_farmer2").selectpicker('refresh');
					_Q("#group_farmer3").selectpicker('refresh');
                    _Q('#group_groupId').val(bermudaTriangle._tunnel_group_id);
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
					}else{
						_Q(".breedList").empty();
					}
				}else{
					_Q(".animal_hide").hide();
					_Q(".plant_hide").show();
					_Q('#group_farmer').val(bermudaTriangle._keeperId);
					_Q('#group_farmer1').val(bermudaTriangle._masterId);
					_Q("#group_farmer").selectpicker('refresh');
					_Q("#group_farmer1").selectpicker('refresh');
					_Q('#group_groupId').val(bermudaTriangle._tunnel_group_id);
                    _Q("#group_groupId").selectpicker('refresh');
				}
				
				_Q("#group_base_id").val(bermudaTriangle._base_id);
				_Q("#group_x").val(bermudaTriangle.group_x);
				_Q("#group_y").val(bermudaTriangle.group_y);
			    _Q("#group_parent_name").text(tempName);
				_Q("#group_name").val(bermudaTriangle._name);
				_Q("#group_id").val(bermudaTriangle._id);
			    _Q("#group_parent_id").val(bermudaTriangle._group_parent_id);
			    _Q("#group_index").val(bermudaTriangle._index);
			    _Q("#group_group").val(bermudaTriangle._group);
			    _Q("#group_area").val(bermudaTriangle.mianji);
			    _Q("#group_area_hidden").text(bermudaTriangle.mianji+"亩");
			    _Q("#muarea").val(bermudaTriangle._muarea);
			    _Q("#group_type").val(bermudaTriangle._group_type);
			    _Q("#group_long").val(bermudaTriangle._long);
			    _Q("#group_width").val(bermudaTriangle._width);
			    _Q("#group_height").val(bermudaTriangle._height);
			    if(bermudaTriangle._group_type<5)
			    	_Q(".firstblock").show();
			    else
			    	_Q(".firstblock").hide();
			    //loaddevic(bermudaTriangle._group_type,bermudaTriangle._envlist);
			    _Q("input[name='groupFormColor']").val(bermudaTriangle.get("fillColor"));
	   		    _Q("#groupForm\\:color-colorPicker-hex").val(bermudaTriangle.get("fillColor").replace("#",""));
	   		    _Q(".rich-color-picker-icon").css("background-color",bermudaTriangle.get("fillColor"));
	   		 _Q(".rightNo").hide();
				_Q(".rightNo5").show();
				_Q("#divtittle").text("编辑区域");
				_Q("#divFloatToolsView_").animate({width: 368},800,function(){			});
				_Q(".tc_top_03").show();
				_Q("#searchLi").animate({right: window.screen.width/4+10},800,function(){});
				_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
				_Q(".btnOpen").hide();
	   		    setMapNull();
	   		var _height = document.body.clientHeight- 161;
	   		if(_Q(".rightNo5").find(".jScrollbar_mask").height()>_height){
	   			_Q(".rightNo5").find(".jScrollbar_draggable").show();
	   			_Q(".rightNo5").find(".tc_rw_rw2").jScrollbar();
	   			_Q(".rightNo5").find(".jScrollbar_mask").css("top","0");
	   			_Q(".rightNo5").find(".ui-draggable").css("top","0");
	   		}else{
	   			_Q(".rightNo5").find(".jScrollbar_draggable").hide();
	   			_Q(".rightNo5").find(".jScrollbar_mask").css("top","0");
	   			_Q(".rightNo5").find(".ui-draggable").css("top","0");
	   		}
	   		google.maps.event.addDomListener(bermudaTriangle, 'dblclick', function(
					event) {// alert(1)
			    if(bounds.getCenter().lat()!=0&&bounds.getCenter().lng()!=-180){
				    map.setCenter(bounds.getCenter());
					map.setZoom(19);
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
	    			_Q("#searchLi").animate({right: window.screen.width/4+10},800,function(){});
	    			_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
	    			_Q(".btnOpen").hide();
			  });
		}	  
		
		//采集设备,调节设备 数据保存方法
		function che(){
			var str = "";
			_Q(".new_checkbox1").each(function(){
				str+=_Q(this).attr("a")+",";
			});
			if(str.length>0&&str.endWith(","))
				str = str.substring(0, str.length-1);
			var str2 = "";
			_Q(".new_checkbox2").each(function(){
				str2+=_Q(this).attr("a")+",";
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
			if(_Q("#muarea").val().length>9){
				alert("请填写正确的亩数,不能超过9位!");
	    		return false;
			}
			_Q("#group_envList").val(str);
			return true;
		}
		//大棚编辑完成
		function group_ok(url){
						window.location=url+'?tnnelId='+_Q('#group_id').val()+'&partId='+_Q("#group_parent_id").val()+"&baseId="+baseId;
			return;
			var polygon;
			for(var i = 0;i<mark3Array.length;i++){
				polygon = mark3Array[i];
				if(polygon._index==_Q("#group_index").val()){
					polygon._name=_Q("#group_name").val();
					polygon._id=_Q("#group_id").val();
					polygon._group_parent_id=_Q("#group_parent_id").val();
					polygon._index=_Q("#group_index").val();
					polygon._group=_Q("#group_group").val();
					polygon.mianji=_Q("#group_area").val();
					polygon._muarea=_Q("#muarea").val();
					polygon._group_type=_Q("#group_type").val();
					polygon._keeperId=_Q("#group_farmer").val();
					polygon._masterId=_Q("#group_farmer1").val();
					polygon._long=_Q("#group_long").val();
					polygon._width=_Q("#group_width").val();
					polygon._height=_Q("#group_height").val();
					polygon._envlist=_Q("#group_envList").val();
					polygon.set("fillColor",_Q("input[name='groupFormColor']").val());
					polygon.set("strokeColor",_Q("input[name='groupFormColor']").val());
					break;
				}
			}
			var array = polygon.getPath().getArray();
			var bounds = new google.maps.LatLngBounds();
			for (i = 0; i < array.length; i++) {
				bounds.extend(array[i]);
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
			_Q("#divFloatToolsView_").animate({width: 1},800,function(){_Q("#divFloatToolsView_").css("width","1");});
			_Q("#searchLi").animate({right: 31},800,function(){_Q("#searchLi").css("right","31");});
			_Q(".btnOpen").show();
			setMapNotNull();
		}
		//取消大棚编辑
		function group_no (typ,url,url2){
			if(typ==""){
				window.location=url+'?tnnelId='+_Q('#group_id').val()+'&partId='+_Q("#group_parent_id").val()+"&baseId="+baseId;
			}else{
				window.location=url2;
			}
			return;
			clearSelection();
			_Q("#divFloatToolsView_").animate({width: 1},800,function(){_Q("#divFloatToolsView_").css("width","1");});
			_Q("#searchLi").animate({right: 31},800,function(){_Q("#searchLi").css("right","31");});
			_Q(".btnOpen").show();
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
		
		
		function addFarmer(type){
			_Q(".rightNo").hide();
			_Q(".rightNo7").show();
			_Q(".tc_top_03").show();
			_Q(".tc_top_044").hide();
			_Q("#modelInfo").hide();
			if(type==1){
				_Q("#divtittle").text("添加农户");
			}else if(type==2){
				_Q("#divtittle").text("添加生产负责人");
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
		
		function checkFarmer(){
			var test = /^[1-9]+[0-9]*]*$/; //正整数
			if(_Q("#farmer_name").val()==""){
				alert("姓名不能为空!");
				return false;
			}
			if(!test.test(_Q("#farmer_age").val())){
				alert("年龄必须是正整数!");
				return false;
			}
			if(!test.test(_Q("#farmer_age2").val())){
				alert("从业年限必须是正整数!");
				return false;
			}
			return true;
		}
		
		function farmer_ok(data,event){
			var strs = data.split("-~^_");
			if(strs[0]==1){
				_Q(strs[1]).prependTo("#group_farmer_");
				_Q(strs[1]).prependTo("#group_farmer");
				var val = _Q("#group_farmer option:eq(0)").val();
				_Q("#group_farmer").selectpicker("val",val);
			}else if(strs[0]==2){
				_Q(strs[1]).prependTo("#group_farmer1_");
				_Q(strs[1]).prependTo("#group_farmer1");
				var val = _Q("#group_farmer1 option:eq(0)").val();
				_Q("#group_farmer1").selectpicker("val",val);
			}else if(strs[0]==3){
				_Q(strs[1]).prependTo("#group_farmer2_");
				_Q(strs[1]).prependTo("#group_farmer2");
				var val = _Q("#group_farmer2 option:eq(0)").val();
				_Q("#group_farmer2").selectpicker("val",val);
			}else if(strs[0]==4){
				_Q(strs[1]).prependTo("#group_farmer3_");
				_Q(strs[1]).prependTo("#group_farmer3");
				var val = _Q("#group_farmer3 option:eq(0)").val();
				_Q("#group_farmer3").selectpicker("val",val);
			}
			if (selectedShape) {
				_Q(".rightNo").hide();
				_Q(".rightNo5").show();
				_Q(".tc_top_03").show();
				_Q(".tc_top_044").hide();
				_Q("#modelInfo").hide();
			}
		}
		
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
 
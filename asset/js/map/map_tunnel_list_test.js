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
				
				var partition_id = obj.partition_id;
				if(map1.containsKey(partition_id)){
					var tempArray = map1.get(partition_id);
					var flag = true;
					for(var j = 0;j<tempArray.length;j++){
						var temp = tempArray[j];
						if(temp[0].tunnel_info_id==obj.tunnel_info_id){
							temp.push(obj);
							flag = false;
						}
					}
					if(flag){
						var array = new Array();
						array.push(obj);
						tempArray.push(array);
					}
					
					map1.put(partition_id,tempArray);
				}else{
					var tempArray = new Array();
					var temp = new Array();
					temp.push(obj);
					tempArray.push(temp);
					map1.put(partition_id,tempArray);
				}
				
				var type_id = obj.type_id;
				if(map2.containsKey(type_id)){
					var tempArray = map2.get(type_id);
					var flag = true;
					for(var j = 0;j<tempArray.length;j++){
						var temp = tempArray[j];
						if(temp[0].tunnel_info_id==obj.tunnel_info_id){
							temp.push(obj);
							flag = false;
						}
					}
					if(flag){
						var array = new Array();
						array.push(obj);
						tempArray.push(array);
					}
					
					map2.put(type_id,tempArray);
				}else{
					var tempArray = new Array();
					var temp = new Array();
					temp.push(obj);
					tempArray.push(temp);
					map2.put(type_id,tempArray);
				}
				
				var plant_id = obj.plant_id;
				if(map3.containsKey(plant_id)){
					var tempArray = map3.get(plant_id);
					var flag = true;
					for(var j = 0;j<tempArray.length;j++){
						var temp = tempArray[j];
						if(temp[0].tunnel_info_id==obj.tunnel_info_id){
							temp.push(obj);
							flag = false;
						}
					}
					if(flag){
						var array = new Array();
						array.push(obj);
						tempArray.push(array);
					}
					
					map3.put(plant_id,tempArray);
				}else{
					var tempArray = new Array();
					var temp = new Array();
					temp.push(obj);
					tempArray.push(temp);
					map3.put(plant_id,tempArray);
				}
				
				var status = obj.plant_stauts;
				status = status==2?0:status;
				if(map4.containsKey(status)){
					var tempArray = map4.get(status);
					var flag = true;
					for(var j = 0;j<tempArray.length;j++){
						var temp = tempArray[j];
						if(temp[0].tunnel_info_id==obj.tunnel_info_id){
							temp.push(obj);
							flag = false;
						}
					}
					if(flag){
						var array = new Array();
						array.push(obj);
						tempArray.push(array);
					}
					map4.put(status,tempArray);
				}else{
					var tempArray = new Array();
					var temp = new Array();
					temp.push(obj);
					tempArray.push(temp);
					map4.put(status,tempArray);
				}
			}
			
			//区域
			var key1 = map1.keys();
			var html = '';
			for(var i = 0;i<key1.length;i++){
				var list = map1.get(key1[i]);
				var index = 0;
				var flag = true;
				var p_name = list[0][0].partition_name;
				p_name = p_name==""?"无所属区域":p_name;
				html+='<div class="needdis" style="width:100%; display:block; margin-bottom:10px;"><div class="aqu2"><table width="100%" cellspacing="0" cellpadding="0">'+
	        	'<tbody><tr><td align="left"><div class="quyu">'+p_name+'</div></td><td align="right" class="sjj_08">'+
	            '<img width="14" height="19" src="'+workpath+'/asset/images/sjj_down.jpg" aa="true" onclick="tog(this)" style="cursor:pointer"/></td></tr></tbody></table></div><ul class="aqu_ul" style="min-width:320px;">';
				for(var j = 0;j<list.length;j++){
					var total = 0;
					var obj = list[j];
						html+='';
						html+='<li class="aqu_li"><table cellpadding="0" cellspacing="0" width="100%"><tr><td align="left" class="_classname_"><a href="#" class="_tunnel_name"  onclick="gotoMap('+obj[0].tunnel_info_id+')">'+obj[0].tunnel_name+'</a></td>'
							+'<td rowspan="2" class="tc_str_hjtj">';
						var temps = "aqu_bg";
					for(var t = 0;t<3&&t<obj.length;t++){
						var real_id = obj[t].real_plant_id;
						if(real_id>0)
							temps = "aqu_bg2";
						else
							continue;
						var tempSrc = workpath+'/asset/images/853.jpg';
						if(obj[t].imgsquare!=null&&obj[t].imgsquare!='')
							tempSrc = obj[t].imgsquare;
						html+='<div class="rtquf"><img class="rtquc" src="'+workpath+'/asset/images/4bg.png'+'" width="42" height="43"  /><img class="rtqug" src="'+tempSrc+'" width="42" height="43" /></div>';
						total+=obj[t].crop_area;
					}
					total = formatFloat(total,2);
						html+='</td></tr> <tr><td class="mus">总'+obj[0].mu_number+'亩/使用'+total+'亩</td></tr></table></li>';
						html=html.replace("_classname_",temps);
				}
				html+='</ul><div class="clear"></div></div>';
			}
			_$("._area2").empty();
			_$("._area2").append(html);
			
			
			//大棚种类
			var key2 = map2.keys();
			var html2 = '';
			for(var i = 0;i<key2.length;i++){
				var list = map2.get(key2[i]);
				var index = 0;
				var flag = true;
				html2+='<div class="needdis" style="width:100%; display:block; margin-bottom:10px;"><div class="aqu2"><table width="100%" cellspacing="0" cellpadding="0">'+
	        	'<tbody><tr><td align="left"><div class="quyu">'+list[0][0].type_name+'</div></td><td align="right" class="sjj_08">'+
	            '<img width="14" height="19" src="'+workpath+'/asset/images/sjj_down.jpg" aa="true" onclick="tog(this)"  style="cursor:pointer"/></td></tr></tbody></table></div><ul class="aqu_ul" style="min-width:320px;">';
				for(var j = 0;j<list.length;j++){
					var total = 0;
					var obj = list[j];
						html2+='';
						html2+='<li class="aqu_li"><table cellpadding="0" cellspacing="0" width="100%"><tr><td align="left" class="_classname_"><a href="#" class="_tunnel_name" onclick="gotoMap('+obj[0].tunnel_info_id+')">'+obj[0].tunnel_name+'</a></td>'
							+'<td rowspan="2" class="tc_str_hjtj">';
						var temps = "aqu_bg";
					for(var t = 0;t<3&&t<obj.length;t++){
						//if(obj[t].tunnel_name=="$#@")
						//	console.log("$#@");
						var real_id = obj[t].real_plant_id;
						if(real_id>0)
							temps = "aqu_bg2";
						else 
							continue;
						var tempSrc = workpath+'/asset/images/853.jpg';
						if(obj[t].imgsquare!=null&&obj[t].imgsquare!='')
							tempSrc = obj[t].imgsquare;
						html2+='<div class="rtquf"><img class="rtquc" src="'+workpath+'/asset/images/4bg.png" width="42" height="43"  /><img class="rtqug" src="'+tempSrc+'" width="42" height="43" /></div>';
						total+=obj[t].crop_area;
					}
					total = formatFloat(total,2);
						html2+='</td></tr> <tr><td class="mus">总'+obj[0].mu_number+'亩/使用'+total+'亩</td></tr></table></li>';
						html2=html2.replace("_classname_",temps);
				}
				html2+='</ul><div class="clear"></div></div>';
			}
			_$("._area0").empty();
			_$("._area0").append(html2);
			
			
			//品种
			var key3 = map3.keys();
			var html3 = '';
			var noplant = '';
			for(var i = 0;i<key3.length;i++){
				var list = map3.get(key3[i]);
				var index = 0;
				var flag = true;
				
				var tname = list[0][0].plant_name;
				tname = tname==""?"未种植":tname;
				var html33 ='<div class="needdis" style="width:100%; display:block; margin-bottom:10px;"><div class="aqu2"><table width="100%" cellspacing="0" cellpadding="0">'+
	        	'<tbody><tr><td align="left"><div class="quyu">'+tname+'</div></td><td align="right" class="sjj_08">'+
	            '<img width="14" height="19" src="'+workpath+'/asset/images/sjj_down.jpg" aa="true" onclick="tog(this)"  style="cursor:pointer"/></td></tr></tbody></table></div><ul class="aqu_ul" style="min-width:320px;">';
				for(var j = 0;j<list.length;j++){
					var total = 0;
					var obj = list[j];
						html33+='';
						html33+='<li class="aqu_li"><table cellpadding="0" cellspacing="0" width="100%"><tr><td align="left" class="'+(tname!="未种植"?'aqu_bg2':'aqu_bg')+'"><a href="#" class="_tunnel_name"  onclick="gotoMap('+obj[0].tunnel_info_id+')">'+obj[0].tunnel_name+'</a></td>'
							+'<td rowspan="2" class="tc_str_hjtj">';
					if(tname!="未种植"){
						for(var t = 0;t<3&&t<obj.length;t++){
							total+=obj[t].crop_area;
							var tempSrc = workpath+'/asset/images/853.jpg';
							if(obj[t].imgsquare!=null&&obj[t].imgsquare!='')
								tempSrc = obj[t].imgsquare;
							html33+='<div class="rtquf"><img class="rtquc" src="'+workpath+'/asset/images/4bg.png" width="42" height="43"  /><img class="rtqug" src="'+tempSrc+'" width="42" height="43" /></div>';
						}
					}
					total = formatFloat(total,2);
						html33+='</td></tr> <tr><td class="mus">总'+obj[0].mu_number+'亩/使用'+total+'亩</td></tr></table></li>';
				}
				if(tname=="未种植"){
					noplant=html33+'</ul><div class="clear"></div></div>';
				}else{
					html3+=html33+'</ul><div class="clear"></div></div>';
				}
				
			}
			_$("._area1").empty();
			_$("._area1").append(html3);
			_$("._area1").append(noplant);
			
			//种植状态
			var key4 = map4.keys();
			var html4 = '';
			for(var i = 0;i<key4.length;i++){
				var list = map4.get(key4[i]);
				var index = 0;
				var flag = true;
				var tname = list[0][0].plant_stauts;
				tname = tname==1?"正在种植":"未种植";
				html4+='<div class="needdis" style="width:100%; display:block; margin-bottom:10px;"><div class="aqu2"><table width="100%" cellspacing="0" cellpadding="0">'+
	        	'<tbody><tr><td align="left"><div class="quyu">'+tname+'</div></td><td align="right" class="sjj_08">'+
	            '<img width="14" height="19" src="'+workpath+'/asset/images/sjj_down.jpg" aa="true" onclick="tog(this)"  style="cursor:pointer"/></td></tr></tbody></table></div><ul class="aqu_ul" style="min-width:320px;">';
				for(var j = 0;j<list.length;j++){
					var total = 0;
					var obj = list[j];
						html4+='';
						html4+='<li class="aqu_li"><table cellpadding="0" cellspacing="0" width="100%"><tr><td align="left" class="_classname_"><a href="#" class="_tunnel_name"  onclick="gotoMap('+obj[0].tunnel_info_id+')">'+obj[0].tunnel_name+'</a></td>'
							+'<td rowspan="2" class="tc_str_hjtj">';
						var temps = "aqu_bg";
					if(list[0][0].plant_stauts==1){
						for(var t = 0;t<3&&t<obj.length;t++){
							var real_id = obj[t].real_plant_id;
							if(real_id>0)
								temps = "aqu_bg2";
							else
								continue;
							var tempSrc = workpath+'/asset/images/853.jpg';
							if(obj[t].imgsquare!=null&&obj[t].imgsquare!='')
								tempSrc = obj[t].imgsquare;
							html4+='<div class="rtquf"><img class="rtquc" src="'+workpath+'/asset/images/4bg.png" width="42" height="43"  /><img class="rtqug" src="'+tempSrc+'" width="42" height="43" /></div>';
							total+=obj[t].crop_area;
						}
					}
					total = formatFloat(total,2);
						html4+='</td></tr> <tr><td class="mus">总'+obj[0].mu_number+'亩/使用'+total+'亩</td></tr></table></li>';
						html4=html4.replace("_classname_",temps);
				}
				html4+='</ul><div class="clear"></div></div>';
			}
			_$("._area3").empty();
			_$("._area3").append(html4);
		}
		
		function tog(obj){
			_$(obj).closest('.needdis').find("ul").toggle();
			if(_$(obj).attr("aa")=="true"){
				_$(obj).attr("aa","false");
				_$(obj).attr("src",workpath+"/asset/images/sjj_left.jpg");
			}else{
				_$(obj).attr("aa","true");
				_$(obj).attr("src",workpath+"/asset/images/sjj_down.jpg");
			}
		}
		
		var searchName = ["","","",""];
		var tagName = ["大棚排序","品种排序","区域排序","状态排序"];
		var tab_index = 0;
		function searchTunnel(index){
			tab_index = index;
			_$(".tc_top_input").val(searchName[tab_index]);
			_$(".tie_00").html(tagName[tab_index]);
			searchs();
		}
		
		function searchs(){
			var val = _$(".tc_top_input").val();
			searchName[tab_index]=val;
			if(val==""){
				_$("._area"+tab_index+" ._tunnel_name").closest(".aqu_li").show();
				_$("._area"+tab_index+" .needdis").show();
				return;
			}
			_$("._area"+tab_index+" ._tunnel_name").not(":contains("+val+")").closest(".aqu_li").hide();
			_$("._area"+tab_index+" ._tunnel_name:contains("+val+")").closest(".aqu_li").show();
			_$("._area"+tab_index+" .needdis").each(
					function(){
						var x = _$(this).find("li:visible").length;
						if(x==0)
							_$(this).hide();
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
					/*
					var tem;
					for(var i = 0;i<thirdstr.length;i++){
						tem = thirdstr[i];
						if(tem.tunnelInfoId==id){
							break;
						}
					}
					_$("#groupbutton1").hide();
					_$("#groupbutton2").show();
					ret = 2;
					_$(".tc_rw_rw2").scrollTop(0);
					var tempName = "";
					for(var w = 0;w<mark2Array.length;w++){
						if(mark2Array[w]._id==bermudaTriangle._group_parent_id)
							tempName = mark2Array[w]._name;
					}
					_$("#group_type").val(tem.plantEnvTypeId);
					_$("#group_type_default").val(tem.plantEnvTypeId);
					_$("#group_type").selectmenu("destroy").selectmenu({style:'dropdown'});
					_$("#group_parent_id")[0].selectedIndex = 0;
					_$("#group_parent_id_default").val(0);
					_$("#group_parent_id").selectmenu("destroy").selectmenu({style:'dropdown'});
				    _$(".ui-selectmenu-dropdown").addClass("small322");
				    _$(".ui-selectmenu-dropdown").removeClass("ui-selectmenu-dropdown");
				    _$(".ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
				    _$(".ui-selectmenu-menu").removeClass("ui-selectmenu-menu");
					_$('#group_farmer').val(tem.keeperId);
					_$('#group_farmer1').val(tem.masterId);
				    //_$("#group_farmer").selectmenu("destroy").val(bermudaTriangle._keeperId).selectmenu({style:'dropdown'});
				    //_$("#group_farmer1").selectmenu("destroy").val(bermudaTriangle._masterId).selectmenu({style:'dropdown'});
					_$(".rightNo").hide();
					_$(".rightNo5").show();
					_$("#divtittle").text("编辑区域");
					_$("#divFloatToolsView_").animate({width: window.screen.width/4+17},800,function(){
						_$("#group_farmer").selectmenu("destroy").selectmenu({style:'dropdown'});
						_$("#group_farmer1").selectmenu("destroy").selectmenu({style:'dropdown'});
						_$(".rich-calendar-input").addClass("r_c_text_date");
					    _$(".rich-calendar-input").removeClass("rich-calendar-input");
					    _$(".ui-selectmenu-dropdown").addClass("small322");
					    _$(".ui-selectmenu-dropdown").removeClass("ui-selectmenu-dropdown");
					    _$(".ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
					    _$(".ui-selectmenu-menu").removeClass("ui-selectmenu-menu");
					});
					_$(".tc_top_03").show();
					_$("#searchLi").animate({right: window.screen.width/4+50},800,function(){});
					_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
					_$(".btnOpen").hide();
					_$("#group_name").val(tem.tunnelName);
					_$("#group_id").val(tem.tunnelInfoId);
				    _$("#group_parent_id").val(tem._group_parent_id);
				    _$("#group_index").val(tem._index);
				    _$("#group_group").val(tem._group);
				    _$("#group_area").val(tem.mianji);
				    _$("#group_area_hidden").text(tem.mianji+"亩");
				    _$("#group_type").val(tem._group_type);
				    _$("#group_farmer").val(tem._keeperId);
				    _$("#group_farmer1").val(tem._masterId);
				    _$("#group_long").val(tem._long);
				    _$("#group_width").val(tem._width);
				    _$("#group_height").val(tem._height);
				    _$("#muarea").val(tem._muarea);
				    map.setCenter(bounds.getCenter());
					map.setZoom(19);
				    var tempArray = map5.get(bermudaTriangle._id);
				    var html = "";
				    if(tempArray!=null){
					    for(var i = 0;i<tempArray.length;i++){
					    	var obj = tempArray[i];
					    	var tempsrc = obj.imgsquare;
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
		   		    */
				}
			}
		}
		
		function addPlant(){
			_$("#edittype").val(1);
			_$("#map_p").val("");
			_$("#map_b").val("");
			_$("#map_m").val("");
			_$("#plant_real_id").val("");
			_$("#prompt").text("");
			_$("#plant_tunnel_id").val(selectedShape._id);
			_$("#tunnel_area").val(selectedShape.mianji);
			var html = _$("#plant\\:plantId").html();
			_$("#plant\\:plantId").empty().append(html);
			_$("#plant\\:plantId")[0].selectedIndex = 0;
			_$("#plant\\:plantId");
			_$("#plant\\:plantId ~ .custom-combobox").filter(":eq(0)").find("input").val(_$("#plant\\:plantId").find("option:selected").text());
			//_$("#plant\\:plantId").selectmenu("destroy").selectmenu({style:'dropdown'});
			_$("#plant\\:plantId ~ .custom-combobox").filter(":eq(0)").find("input").val(_$("#plant\\:plantId").find("option:selected").text());
			_$("#plant\\:plantId").trigger("onchange");
			_$("#plant_standard")[0].selectedIndex = 0;
			_$("#plant_standard").selectmenu("destroy").selectmenu({style:'dropdown'});
		    _$(".rich-calendar-input").addClass("r_c_text_date");
		    _$(".rich-calendar-input").removeClass("rich-calendar-input");
		    _$(".ui-selectmenu-dropdown").addClass("small322");
		    _$(".ui-selectmenu-dropdown").removeClass("ui-selectmenu-dropdown");
		    _$(".ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
		    _$(".ui-selectmenu-menu").removeClass("ui-selectmenu-menu");
			_$("#plant\\:plant_beginInputDate").val("");
			_$("#plant\\:plant_endInputDate").val("");
			_$("#env_type").val(_$("#group_type").val());
			var zhongarea = 0;
			_$(".obj_crop_area").each(function(k,zhongareaval){
		        zhongarea += parseFloat(zhongareaval.value);
			});
			var allarea = parseFloat(selectedShape._muarea)-parseFloat(zhongarea);
			_$("#plant_area").val(selectedShape._muarea);
			_$("#plantarea").text(selectedShape._muarea);
			_$(".rightNo").hide();
			_$(".rightNo6").show();
			_$("#divtittle").text("编辑种植信息");
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
			if (selectedShape) {
				_$("#plant_parent_name").html(selectedShape._name);
				_$("#plant_tunnel_id").val(selectedShape._id);
			}
			_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
			_$(".btnOpen").hide();
		}
		
		function linkage (data){
			var str = data.split("-~_");
			_$("#breedBreedId").empty().append(str[0]);
			if(_$("#map_b").val()!=""){
				_$('#breedBreedId').val(_$("#map_b").val());
			}else{
				_$('#breedBreedId')[0].selectedIndex = 0;
			}
			_$("#map_b").val("");
			_$("#breedBreedId").selectmenu("destroy").selectmenu({style:'dropdown'});
			_$("#breedBreedId").trigger("onchange");
		    _$(".rich-calendar-input").addClass("r_c_text_date");
		    _$(".rich-calendar-input").removeClass("rich-calendar-input");
		    _$(".ui-selectmenu-dropdown").addClass("small322");
		    _$(".ui-selectmenu-dropdown").removeClass("ui-selectmenu-dropdown");
		    _$(".ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
		    _$(".ui-selectmenu-menu").removeClass("ui-selectmenu-menu");
		}
		
		function linkage2 (data){
			_$("#modelId").empty().append(data);
			if(_$("#map_m").val()!=""){
				_$('#modelId').val(_$("#map_m").val());
			}else{
				_$('#modelId')[0].selectedIndex = 0;
			}
			_$("#modelId").selectmenu("destroy").selectmenu({style:'dropdown'});
		    _$(".rich-calendar-input").addClass("r_c_text_date");
		    _$(".rich-calendar-input").removeClass("rich-calendar-input");
		    _$(".ui-selectmenu-dropdown").addClass("small322");
		    _$(".ui-selectmenu-dropdown").removeClass("ui-selectmenu-dropdown");
		    _$(".ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
		    _$(".ui-selectmenu-menu").removeClass("ui-selectmenu-menu");
		}
		
		function plant_ok (data,event){
			if(map5.size()==0){
				//tsStep(5);
			}
			if (selectedShape) {
				var tempArray = map5.get(selectedShape._id);
				if(tempArray==null)
					tempArray=new Array();
				var obj = tempArray[0];
				var tempIndex = 0;
				if(!obj||obj==null){
					for(var i = 0;i<allList.size();i++){
						var tempobj = allList[i];
						if(tempobj.tunnel_info_id==selectedShape._id){
							obj = tempobj;
							break;
						}
					}
				}
				if(data.length>0){
					data+=',"mu_number":'+obj.mu_number+',"partition_id":'+obj.partition_id+',"partition_name":"'+obj.partition_name+'","tunnel_info_id":'+obj.tunnel_info_id+',"tunnel_name":"'+obj.tunnel_name+'","type_id":'+obj.type_id+',"type_name":"'+obj.type_name+'"}';
					eval('var tempp = {'+data);
					for(var i = 0;i<allList.length;i++){
						var tempObj = allList[i];
						if(tempObj.real_plant_id==tempp.real_plant_id){
							allList[i]=tempp;
							break;
						}else if(i==allList.size()-1){
							allList.push(tempp);
						}
					}
					initList();
				}
				var array = selectedShape.getPath().getArray();
				var bounds = new google.maps.LatLngBounds();
				for (i = 0; i < array.length; i++) {
					bounds.extend(array[i]);
				}
				var uss = selectedShape._usgs;
				var lat = bounds.getCenter().lat();
				var lng = bounds.getCenter().lng();
				var left = new google.maps.LatLng(lat+0.0000422,lng+0.000055);
				var right = new google.maps.LatLng(lat-0.000042,lng-0.000055);
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
				
				var box_title = "";
				var box_plant = "";
				var box_area = "";
				var box_image = "";
				var box_content = "";
				var b = true;
				if(tempArray==null||tempArray.length==0){
					box_title = selectedShape._name;
					box_plant = "";
					box_area = selectedShape.mianji;
					box_image = addsrc;
					box_content = "暂无作物";
					_$(".zw_bgt2").css("cursor","pointer");
					b = false;
				}else if(tempArray.length==1){
					box_title = selectedShape._name;
					box_plant = tempArray[0].breed_name;
					box_area = selectedShape.mianji;
					box_image = tempArray[0].imground;
					if(box_image=="")
						box_image = nonesrc;
					box_content = "种植日期："+tempArray[0].starttime;
					if(tempArray[0].enttime!=""){
						content+=" - "+tempArray[0].endtime;
					}
					_$(".zw_bgt2").attr("onclick","addPlant()");
					_$(".zw_bgt2").css("cursor","default");
				}else if(tempArray.length>1){
					box_title = selectedShape._name;
					box_area = selectedShape.mianji;
					box_image = moresrc;
					box_content = "种植： ";
					for(var i = 0;i<tempArray.length;i++){
						box_content+=tempArray[i].breed_name+" ";
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
				setTimeout(function(){xa();},10);
				setTimeout(function(){hove();},10);
				if(_$("#groupbutton1").css("display")!="none"){
					gotoMap(selectedShape._id,event);
				}else{
					gotoMap(selectedShape._id);
				}
				g_infowindow.setMap(null);
			}
			ts_check();
		}
		
		function plant_no(event){
			if (selectedShape) {
				if(_$("#groupbutton1").css("display")!="none"){
					gotoMap(selectedShape._id,event);
				}else{
					gotoMap(selectedShape._id);
				}
			}
			g_infowindow.setMap(null);
		}
		
		function group_back(){
			if(selectedShape){
				if(selectedShape._id==undefined||selectedShape._id==''){
					selectedShape.setMap(null);
				}
			}
			_$(".model3").removeClass("on");
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
			_$(".tc_top_03").hide();
			_$(".rightNo").hide();
			_$(".rightNo4").show();
			_$(".tc_cont").addClass("TTTTT").removeClass("tc_cont");
			_$(".btnOpen").show();
			clearSelection();
		}
		
		function editPlant(id){
			for(var i = 0;i<allList.length;i++){
				var obj = allList[i];
				if(obj.real_plant_id==id){
					_$("#prompt").text("");
					_$("#plant_real_id").val(id);
					_$("#edittype").val(2);
					_$("#map_p").val(obj.plant_id);
					_$("#map_b").val(obj.breed_id);
					_$("#map_m").val(obj.model_id);
					_$("#tunnel_area").val(selectedShape.mianji);
					_$("#plant\\:plantId").val(obj.plant_id);
					//_$("#plant\\:plantId").selectmenu("destroy").selectmenu({style:'dropdown'});
					_$("#plant\\:plantId ~ .custom-combobox").filter(":eq(0)").find("input").val(_$("#plant\\:plantId").find("option:selected").text());
					_$("#plant\\:plantId").trigger("onchange");
					_$("#plant_standard").val(obj.plant_standard);
					_$("#plant_standard").selectmenu("destroy").selectmenu({style:'dropdown'});
					_$(".rich-calendar-input").addClass("r_c_text_date");
					_$(".rich-calendar-input").removeClass("rich-calendar-input");
					_$(".ui-selectmenu-dropdown").addClass("small322");
					_$(".ui-selectmenu-dropdown").removeClass("ui-selectmenu-dropdown");
					_$(".ui-selectmenu-menu").addClass("ui-selectmenu-menusmall");
					_$(".ui-selectmenu-menu").removeClass("ui-selectmenu-menu"); 
					_$("#plant\\:plant_beginInputDate").val(obj.starttime);
					_$("#plant\\:plant_endInputDate").val(obj.endtime);
					_$("#env_type").val(_$("#group_type").val());
					_$("#old_start").val(obj.starttime);
					_$("#old_end").val(obj.endtime);
					_$("#plant_area").val(obj.crop_area);
					var zhongarea = 0;
					_$(".obj_crop_area").each(function(k,zhongareaval){
				        zhongarea += parseFloat(zhongareaval.value);
					});
					var allarea = parseFloat(selectedShape._muarea)-parseFloat(zhongarea);
					allarea += parseFloat(obj.crop_area);
					_$("#myarea").val(obj.crop_area);
					_$("#plantarea").text(allarea.toFixed(2));
					_$(".rightNo").hide();
					_$(".rightNo6").show();
					_$("#divtittle").text("编辑种植信息");
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
					if (selectedShape) {
						_$("#plant_parent_name").html(selectedShape._name);
						_$("#plant_tunnel_id").val(selectedShape._id);
					}
					_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
					_$(".btnOpen").hide();
					break;
				}
			}
		}
		
		function getModelInfoJson_next(json){
			eval("var tempp = "+json);
			_$('#model_valuetime').val(tempp.valuetime);
			_$("#model_valuetime").selectmenu("destroy").selectmenu({style:'dropdown'});
			_$('#model_valueten').val(tempp.valuedays);
			_$("#model_valueten").selectmenu("destroy").selectmenu({style:'dropdown'});
			_$('#model_begintime').val(tempp.begintime);
			_$("#model_begintime").selectmenu("destroy").selectmenu({style:'dropdown'});
			_$('#model_beginten').val(tempp.begindays);
			_$("#model_beginten").selectmenu("destroy").selectmenu({style:'dropdown'});
			_$('#model_endtime').val(tempp.endtime);
			_$("#model_endtime").selectmenu("destroy").selectmenu({style:'dropdown'});
			_$('#model_endten').val(tempp.enddays);
			_$("#model_endten").selectmenu("destroy").selectmenu({style:'dropdown'});
			_$(".semxnene input").each(function(){
				var name = _$(this).attr("name");
				var t = tempp[name];
				if(t==null||t=="null")
					t="";
				_$(this).val(t);
			});
			_$("#model_valuetime-button").removeClass("small322").addClass("small22");
			_$("#model_valuetime-menu").removeClass("ui-selectmenu-menusmall").addClass("ui-selectmenu-menusmall22");
			_$("#model_valueten-button").removeClass("small322").addClass("small22");
			_$("#model_valueten-menu").removeClass("ui-selectmenu-menusmall").addClass("ui-selectmenu-menusmall22");
			_$("#model_begintime-button").removeClass("small322").addClass("small22");
			_$("#model_begintime-menu").removeClass("ui-selectmenu-menusmall").addClass("ui-selectmenu-menusmall22");
			_$("#model_beginten-button").removeClass("small322").addClass("small22");
			_$("#model_beginten-menu").removeClass("ui-selectmenu-menusmall").addClass("ui-selectmenu-menusmall22");
			_$("#model_endtime-button").removeClass("small322").addClass("small22");
			_$("#model_endtime-menu").removeClass("ui-selectmenu-menusmall").addClass("ui-selectmenu-menusmall22");
			_$("#model_endten-button").removeClass("small322").addClass("small22");
			_$("#model_endten-menu").removeClass("ui-selectmenu-menusmall").addClass("ui-selectmenu-menusmall22");
		}
		
		function addModelElse(){
			
			_$("#model_id").val("");
			_$('#model_valuetime')[0].selectedIndex = 0;
			_$("#model_valuetime").selectmenu("destroy").selectmenu({style:'dropdown'});
			_$('#model_valueten')[0].selectedIndex = 0;
			_$("#model_valueten").selectmenu("destroy").selectmenu({style:'dropdown'});
			_$('#model_begintime')[0].selectedIndex = 0;
			_$("#model_begintime").selectmenu("destroy").selectmenu({style:'dropdown'});
			_$('#model_beginten')[0].selectedIndex = 0;
			_$("#model_beginten").selectmenu("destroy").selectmenu({style:'dropdown'});
			_$('#model_endtime')[0].selectedIndex = 0;
			_$("#model_endtime").selectmenu("destroy").selectmenu({style:'dropdown'});
			_$('#model_endten')[0].selectedIndex = 0;
			_$("#model_endten").selectmenu("destroy").selectmenu({style:'dropdown'});
			_$("#model_valuetime-button").removeClass("small322").addClass("small22");
			_$("#model_valuetime-menu").removeClass("ui-selectmenu-menusmall").addClass("ui-selectmenu-menusmall22");
			_$("#model_valueten-button").removeClass("small322").addClass("small22");
			_$("#model_valueten-menu").removeClass("ui-selectmenu-menusmall").addClass("ui-selectmenu-menusmall22");
			_$("#model_begintime-button").removeClass("small322").addClass("small22");
			_$("#model_begintime-menu").removeClass("ui-selectmenu-menusmall").addClass("ui-selectmenu-menusmall22");
			_$("#model_beginten-button").removeClass("small322").addClass("small22");
			_$("#model_beginten-menu").removeClass("ui-selectmenu-menusmall").addClass("ui-selectmenu-menusmall22");
			_$("#model_endtime-button").removeClass("small322").addClass("small22");
			_$("#model_endtime-menu").removeClass("ui-selectmenu-menusmall").addClass("ui-selectmenu-menusmall22");
			_$("#model_endten-button").removeClass("small322").addClass("small22");
			_$("#model_endten-menu").removeClass("ui-selectmenu-menusmall").addClass("ui-selectmenu-menusmall22");
		}
		
		function addModel(){
			_$(".tc_top_03").hide();
			_$(".rightNo").hide();
			_$(".tc_top_044").show();
			_$("#modelInfo").show();
			_$("#model_name").val("");
			var aps_type = _$('.rido1').attr('a');
			_$("#m_type").html(envTypeList[_$("#env_type").val()]);
			_$('#model_type').val(_$("#env_type").val());
			_$('#model_plant').val(_$("#plant\\:plantId").val());
			_$("#m_plant").html(_$("#plant\\:plantId").find("option:selected").text());
			_$('#model_breed').val(_$("#breedBreedId").val());
			_$('#m_breed').html(_$("#breedBreedId").find("option:selected").text());
			_$('#model_standard').val(_$("#plant_standard").val());
			_$('#m_standard').html(_$("#plant_standard").find("option:selected").text());
			_$(".semxnene input").val("");
			if(_$("#modelId").val()!=''&&_$("#modelId").val()>0){
				_$("#model_id").val(_$('#modelId').val());
				getModelInfoJson(_$('#modelId').val());
			}else{
				addModelElse();
				var plant_date = _$("#plant\\:plant_beginInputDate").val();
				if(plant_date!=""){
					var strs = plant_date.split("-");
					_$("#model_valuetime").val(parseInt(strs[1],10));
					_$("#model_valuetime").selectmenu("destroy").selectmenu({style:'dropdown'});
					var s = strs[2];//.replace("0","")
					var tempStr = 1;
					if(s<11){
						tempStr = 1;
					}else if(s<21){
						tempStr = 2;
					}else{
						tempStr = 3;
					}
					_$('#model_valueten').val(tempStr);
					_$('#model_valueten').selectmenu("destroy").selectmenu({style:'dropdown'});
				}
				var endTime = document.getElementById("plant:plant_endInputDate").value;
				if(endTime!=""){
					var arrs = endTime.split("-");
					console.log(parseInt(arrs[1],10));
					_$("#model_endtime").val(parseInt(arrs[1],10));
					_$("#model_endtime").selectmenu("destroy").selectmenu({style:'dropdown'});
					var s = arrs[2];//.replace("0","")
					var tempStr = 1;
					if(s<11){
						tempStr = 1;
					}else if(s<21){
						tempStr = 2;
					}else{
						tempStr = 3;
					}
					_$("#model_endten").val(tempStr);
					_$("#model_endten").selectmenu("destroy").selectmenu({style:'dropdown'});
				}
			}
			_$("#model_valuetime-button").removeClass("small322").addClass("small22");
			_$("#model_valuetime-menu").removeClass("ui-selectmenu-menusmall").addClass("ui-selectmenu-menusmall22");
			_$("#model_valueten-button").removeClass("small322").addClass("small22");
			_$("#model_valueten-menu").removeClass("ui-selectmenu-menusmall").addClass("ui-selectmenu-menusmall22");
			_$("#model_begintime-button").removeClass("small322").addClass("small22");
			_$("#model_begintime-menu").removeClass("ui-selectmenu-menusmall").addClass("ui-selectmenu-menusmall22");
			_$("#model_beginten-button").removeClass("small322").addClass("small22");
			_$("#model_beginten-menu").removeClass("ui-selectmenu-menusmall").addClass("ui-selectmenu-menusmall22");
			_$("#model_endtime-button").removeClass("small322").addClass("small22");
			_$("#model_endtime-menu").removeClass("ui-selectmenu-menusmall").addClass("ui-selectmenu-menusmall22");
			_$("#model_endten-button").removeClass("small322").addClass("small22");
			_$("#model_endten-menu").removeClass("ui-selectmenu-menusmall").addClass("ui-selectmenu-menusmall22");
		}
		function model_no(event){
			_$("#modelInfo").hide();
			_$(".tc_top_044").hide();
			_$(".rightNo").hide();
			_$(".rightNo6").show();
			_$("#divtittle").text("编辑种植信息");
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
			if (selectedShape) {
				_$("#plant_parent_name").html(selectedShape._name);
				_$("#plant_tunnel_id").val(selectedShape._id);
			}
			_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
			_$(".btnOpen").hide();
		}
		function model_ok(data,event){
			getModelByTime(_$('#breedBreedId').val(),_$('#plant_tunnel_id').val(),_$('#plant\\:plant_beginInputDate').val(),_$('#plant_standard').val(),_$('#plant\\:plant_endInputDate').val(),_$('#plant_real_id').val());
			_$("#modelInfo").hide();
			_$(".tc_top_044").hide();
			_$(".rightNo").hide();
			_$(".rightNo6").show();
			_$("#divtittle").text("编辑种植信息");
			
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
			if (selectedShape) {
				_$("#plant_parent_name").html(selectedShape._name);
				_$("#plant_tunnel_id").val(selectedShape._id);
			}
			_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
			_$(".btnOpen").hide();
		}
		//排产作物联动品种
		function linkage6 (data){
			_$("#model_breed").empty().append(data);
			_$("#model_breed").selectmenu("destroy").selectmenu({style:'dropdown'});
		    _$("#model_breed-button").addClass("small322");
		    _$("#model_breed-button").removeClass("ui-selectmenu-dropdown");
		    _$("#model_breed-menu").addClass("ui-selectmenu-menusmall");
		    _$("#model_breed-menu").removeClass("ui-selectmenu-menu");
		}

		function getModelByTime_next(data){
			if(data==""){
				_$(".table_0").empty();
				_$("#modelId").val(0);
				_$("#mu_table").html("(添加)");
				return;
			}
				
			var strs = data.split("-~_");
			_$(".table_0").empty();
			if(_$("#edittype").val()==1){
				_$("#plantarea").html(strs[0]);
				_$("#plant_area").val(strs[0]);
			}else{
				_$("#plantarea").html(strs[0]);
				_$("#plant_area").val(_$("#myarea").val());
			}
			if(strs.length==1){
				_$("#modelId").val(0);
				_$("#mu_table").html("(添加)");
				return;
			}
			
			_$("#modelId").val(strs[1]);
			_$(".table_0").empty();
			_$("#mu_table").html("(编辑)");
			_$(".table_0").append(strs[2]);
		}
		
		function addFarmer(type){
			_$(".rightNo").hide();
			_$(".rightNo7").show();
			_$(".tc_top_03").show();
			_$(".tc_top_044").hide();
			_$("#modelInfo").hide();
			if(type==1){
				_$("#divtittle").text("添加农户");
			}else {
				_$("#divtittle").text("添加生产负责人");
			}
			_$("#farmer_type").val(type);
			_$("#farmer_name").val("");
			_$("#farmer_age").val("");
			_$("#farmer_age2").val("");
			_$("#farmer_phone").val("");
			_$("#farmer_honor").val("");
		}
		
		function checkFarmer(){
			var test = /^[1-9]+[0-9]*]*$/; //正整数
			if(_$("#farmer_name").val()==""){
				alert("姓名不能为空!");
				return false;
			}
			if(!test.test(_$("#farmer_age").val())){
				alert("年龄必须是正整数!");
				return false;
			}
			if(!test.test(_$("#farmer_age2").val())){
				alert("从业年限必须是正整数!");
				return false;
			}
			return true;
		}
		
		function farmer_ok(data,event){
			var strs = data.split("-~^_");
			if(strs[0]==1){
				_$("#group_farmer").empty();
				_$("#group_farmer").append(strs[1]);
				_$("#group_farmer").selectmenu("destroy").selectmenu({style:'dropdown'});
			}else{
				_$("#group_farmer1").empty();
				_$("#group_farmer1").append(strs[1]);
				_$("#group_farmer1").selectmenu("destroy").selectmenu({style:'dropdown'});
				
			}
			_$(".ui-selectmenu-dropdown").not("#yearTime-button,#planttime-button,#plantten-button").addClass("small322");
			_$(".ui-selectmenu-dropdown").not("#yearTime-button,#planttime-button,#plantten-button").removeClass("ui-selectmenu-dropdown");
			_$(".ui-selectmenu-menu").not("#yearTime-menu,#planttime-menu,#plantten-menu").addClass("ui-selectmenu-menusmall");
			_$(".ui-selectmenu-menu").not("#yearTime-menu,#planttime-menu,#plantten-menu").removeClass("ui-selectmenu-menu");
			if (selectedShape) {
				_$(".rightNo").hide();
				_$(".rightNo5").show();
				_$(".tc_top_03").show();
				_$(".tc_top_044").hide();
				_$("#modelInfo").hide();
			}
		}
		
		function farmer_no(event){
			if (selectedShape) {
				_$(".rightNo").hide();
				_$(".rightNo5").show();
				_$(".tc_top_03").show();
				_$(".tc_top_044").hide();
				_$("#modelInfo").hide();
			}
		}
		
		function addBreed(type){
			_$(".rightNo").hide();
			_$(".rightNo8").show();
			_$(".tc_top_03").show();
			_$(".tc_top_044").hide();
			_$("#modelInfo").hide();
			_$("#divtittle").text("添加品种");
			_$("#breed_name").val("例:津优1号");
			_$("#breed_type").val(type);
			if(type==1){
				_$("#breed_plant").val(_$("#plant\\:plantId").val());
			}else{
				_$("#breed_plant").val(_$("#plant\\:plantId").val());
			}
			_$("#breed_plant").selectmenu("destroy").selectmenu({style:'dropdown'});
			_$(".ui-selectmenu-dropdown").not("#yearTime-button,#planttime-button,#plantten-button").addClass("small322");
			_$(".ui-selectmenu-dropdown").not("#yearTime-button,#planttime-button,#plantten-button").removeClass("ui-selectmenu-dropdown");
			_$(".ui-selectmenu-menu").not("#yearTime-menu,#planttime-menu,#plantten-menu").addClass("ui-selectmenu-menusmall");
			_$(".ui-selectmenu-menu").not("#yearTime-menu,#planttime-menu,#plantten-menu").removeClass("ui-selectmenu-menu");
			_$("#suitableCrops").val("");
			_$("#suitableArea").val("");
		}
		
		

		function cls(){
			var bname = _$("#breed_name").val();
			if(bname == "例:津优1号"){
				_$("#breed_name").val("");
			}
		}
		
		function res(){
			var bname = _$("#breed_name").val();
			if(bname == "" ){
				_$("#breed_name").val("例:津优1号");
			}
		}
		
		function checkBreed(){
			if(_$("#breed_name").val() == "例:津优1号"){
				_$("#breed_name").val("");
			}
			if(_$("#breed_name").val()==""){
				alert("名称不能为空!");
				_$("#breed_name").focus();
				return false;
			}
			return true;
		}
		
		
		function breed_ok(data,event){
			if(data==1){
				_$("#plant\\:plantId").trigger("onchange");
			}else{
				_$("#plant\\:plantId").trigger("onchange");
			}
			_$("#modelInfo").hide();
			_$(".tc_top_044").hide();
			_$(".rightNo").hide();
			_$(".rightNo6").show();
			_$("#divtittle").text("编辑种植信息");
			
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
			if (selectedShape) {
				_$("#plant_parent_name").html(selectedShape._name);
				_$("#plant_tunnel_id").val(selectedShape._id);
			}
			_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
			_$(".btnOpen").hide();
		}
		
		function breed_no(){
			_$("#modelInfo").hide();
			_$(".tc_top_044").hide();
			_$(".rightNo").hide();
			_$(".rightNo6").show();
			_$("#divtittle").text("编辑种植信息");
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
			if (selectedShape) {
				_$("#plant_parent_name").html(selectedShape._name);
				_$("#plant_tunnel_id").val(selectedShape._id);
			}
			_$(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
			_$(".btnOpen").hide();
		}

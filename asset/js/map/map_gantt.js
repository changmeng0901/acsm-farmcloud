//<![CDATA[

var backindex = 0;

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
	var dbclick_ = 0;
	var days3 = ["上旬","中旬","下旬"];
	//无作物大棚图片
	var nonesrc = workpath+"/asset/images/wt.png";
	var moresrc = workpath+"/asset/images/dt.png";
	var addsrc = workpath+"/asset/images/add_y.png";

		
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
		function radio1 (obj){
			if(obj.value==0){
				_Q(".typ1").show();
				_Q(".typ2").hide();
				_Q("#prompt2").html("");
			}else if(obj.value==1){
				_Q(".typ1").show();
				_Q(".typ2").hide();
				_Q("#prompt2").html("");
				
			}else if(obj.value==2){
				_Q(".typ2").show();
				_Q(".typ1").hide();
				_Q("#prompt").html("");
			}
			_Q("#prompt").html("");
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
			
			
			function togg1(obj){
				if(_Q(obj).attr("aa")=="true"){
					_Q(obj).closest('.needdis').find("ul").hide();
					_Q(obj).attr("aa","false");
					_Q(obj).attr("src",workpath+"/asset/images/sjj_left.jpg");
				}else{
					_Q(obj).closest('.needdis').find("ul").show();
					_Q(obj).attr("aa","true");
					_Q(obj).attr("src",workpath+"/asset/images/sjj_down.jpg");
				}
			}
			
			var searchName = ["","","",""];
			var tab_index = 0;
			function searchTunnel(index){
				tab_index = index;
				_Q("#second_word").val(searchName[tab_index]);
				searchs();
			}
			
			//右侧弹出框列表 搜索 联动gantt
			var gantVal = "";
			function searchs(){
				var val = _Q("#second_word").val();
				searchName[tab_index]=val;
				gantVal = val;
				innitGantt(val);
				mygantt();
				if(val==""){
					_Q("._area"+tab_index+" ._tunnel_name").closest(".aqu_li").show();
					_Q("._area"+tab_index+" .needdis").show();
					return;
				}
				_Q("._area"+tab_index+" ._tunnel_name").not(":contains("+val+")").closest(".aqu_li").attr("a_","b_").hide();
				_Q("._area"+tab_index+" ._tunnel_name:contains("+val+")").closest(".aqu_li").attr("a_","a_").show();
				jQuery("._area"+tab_index+" .needdis").each(
						function(){
							var x = jQuery(this).find("li[a_='a_']").length;
							if(x==0)
								jQuery(this).hide();
							else if(x>0)
								jQuery(this).show();
						}
				);
			}
			
			var apsName = ["","",""];
			var aps_index = 0;
			function searchAps(index){
				aps_index = index;
				_Q("#tc_top_input").val(apsName[aps_index]);
				searchApsBy();
			}
			
			function searchApsBy(){
				var val = _Q("#tc_top_input").val();
				apsName[aps_index]=val;
				if(val==undefined||val==""){
					if(aps_index==0&&false){
						_Q(".tunnelList_ .plantList_,.tunnelList_ .plantList_ li,.tunnelList_ .plantList_ .pcaqu2").show();
					}else if(aps_index==1&&false){
						_Q(".secondInner,.secondInner, .pcaqu2,.secondInner, .pcic").show();
						_Q(".secondInner a[lj=bj]").attr("lj","lj").trigger("click",_Q(".secondInner a[lj=bj]"));
						if(_Q(".secondInner a[lj=bj]").length==0){
							_Q("#rightPane .hsplitbar").show();
							_Q("#rbPane").show();
							_Q('#rbPane').css("height","0px");
							_Q('#rightPane').trigger('resize');
						}
					}else if(aps_index==2||true){
						_Q(".nowPlant .pcic").show();
						_Q(".nowPlant a[lj=bj]").attr("lj","lj").trigger("click",_Q(".nowPlant a[lj=bj]"));
						if(_Q(".nowPlant a[lj=bj]").length==0){
							_Q("#rightPane .hsplitbar").show();
							_Q("#rbPane").show();
							_Q('#rbPane').css("height","0px");
							_Q('#rightPane').trigger('resize');
						}
					}
					return;
				}
				if(aps_index==2){
					_Q(".plantList_").each(function(){
						if(_Q(this).find(".pca_hg:contains("+val+")").length>0){
							_Q(this).show();
							_Q(this).find("li").show();
						}else{
							_Q(this).find(".pca_font:not(:contains("+val+"))").closest("li").hide();
							if(_Q(this).find(".pca_font:contains("+val+")").length==0)
								_Q(this).hide();
							else{
								_Q(this).show();
								_Q(this).find(".pca_font:contains("+val+")").show();
							}
						}
					});
				}else if(aps_index == 1){
					_Q(".secondInner").each(function(){
						if(_Q(this).find(".pca_hg:contains("+val+")").length>0){
							_Q(this).show();
							_Q(this).find(".pcic").show();
						}else{
							_Q(this).find(".pctext:not(:contains("+val+"))").closest(".pcic").hide();
							if(_Q(this).find(".pctext:contains("+val+")").length==0){
								_Q(this).hide();
							}else{
								_Q(this).show();
								_Q(this).find(".pctext:contains("+val+")").show();
							}
						}
					});
					_Q(".secondInner a[lj=bj]").attr("lj","lj").trigger("click",_Q(".secondInner a[lj=bj]"));
					if(_Q(".secondInner a[lj=bj]").length==0){
						_Q('#rbPane').css("height","0px");
						_Q('#rightPane').trigger('resize');
					}
				}else if(aps_index == 0){
					_Q(".nowPlant .pcic").each(function(){
						if(_Q(this).find(".pctext:contains("+val+")").length>0){
							_Q(this).show();
						}else{
							_Q(this).find(".pctext:not(:contains("+val+"))").closest(".pcic").hide();
							_Q(this).find(".pctext:contains("+val+")").closest(".pcic").show();
						}
					});
					_Q(".nowPlant a[lj=bj]").attr("lj","lj").trigger("click",_Q(".nowPlant a[lj=bj]"));
					if(_Q(".nowPlant a[lj=bj]").length==0){
						_Q('#rbPane').css("height","0px");
						_Q('#rightPane').trigger('resize');
					}
				}
			}
			
			//添加种植 表单赋值
			function addPlant(index){
				if(index==undefined)
					index = 1;
				_Q(".baseMap_ttl").css('background','url('+workpath+'/asset/images/baseIcojian1.png) no-repeat 10px 12px center').next('.baseMap_con').show();
				_Q(".plotsYield_table input").val("");
				plant_select.select2("trigger", "select", {
				    data:{id: "0",plantName:"休耕",plantId:"0",breedName:"无品种",type:"1"}
				});
				plant_select.prop("disabled", false);
				resetHightChart();
				_Q(".aps_typs_name").closest("li").show();
				_Q("#tunnel_none1").show();
				_Q("#tunnel_none2").hide();
				_Q("#prompt").text("");
				_Q("#typeHide").hide();
				_Q("#edittype").val(1);
				_Q(".typ1").show();
				_Q(".typ2").hide();
				_Q("#yield_type").val(2);
			    _Q("#breedBreedId").val(_Q("#breed_new").val());
				_Q("#aps_type")[0].selectedIndex = index;
				_Q("#aps_type").selectpicker('refresh');
				_Q("#sarea").val("");
				_Q("#map_p").val("");
				_Q("#map_b").val("");
				_Q("#map_m").val("");
				_Q("#plant_real_id").val("");
				_Q("#scheduleId").val("");
				_Q("#xplant").val("");
				_Q("#xbreed").val("");
				_Q("#xstandard").val("");
				_Q("#xyear").val("");
				_Q("#xmonth").val("");
				_Q("#xdays").val("");
				_Q("#xmodel").val("");
				_Q("#plant_model_Id").val("-1");
				_Q("#tunnel_area").val(_Q("#muarea").val());
				var html = _Q("#plant_plantId").html();
				_Q("#env_type").val(_Q("#group_type").val());
				_Q(".modehide").hide();
				_Q(".modehidename_1").html("开始时间");
				_Q(".modehidename_2").html("结束时间");
				_Q(".yinian").show();
				_Q(".duonian").hide();
				_Q("#real_plant_name").val("");
				_Q("#plant_plantId").val("");
				_Q("#plant\\:plant_beginInputDate").val("");
				_Q("#plant\\:plant_endInputDate").val("");
				_Q("#plant\\:harvest_timeInputDate").val("");
				_Q('.mapRtArea_btns02 .button_:eq(0)').trigger("click");
				_Q(".nav-tabs > li:eq(0)").addClass("active").siblings().removeClass("active");
				_Q(".table_0").empty();
				_Q(".table_1").empty();
				_Q("#plant_parent_name").html(_Q("#group_name").val());
				_Q("#plant_tunnel_id").val(_Q("#group_id").val());
				_Q("#ymstart").val("");
				_Q("#ymend").val("");
				_Q("#zzend").val("");
				_Q("#xiumian").val("");
				_Q("#csstart").val("");
				_Q("#csend").val("");
				var zhongarea = 0;
				_Q(".obj_crop_area").each(function(k,zhongareaval){
			        zhongarea += parseFloat(zhongareaval.value);
				});
				var allarea = parseFloat(_Q("#muarea").val())-parseFloat(zhongarea);
				_Q("#sarea").val(_Q("#muarea").val());
				_Q("#splantarea").text(_Q("#muarea").val());
				_Q("#plant_area").val(_Q("#muarea").val());
				_Q("#plantarea").text(_Q("#muarea").val());		
				
			    _Q("#sproutSel")[0].selectedIndex = 0;
				_Q("#sproutSel").selectpicker('refresh');
			    _Q("#purchaseSource").val("");
			    _Q("#purchaseSourceDiv").hide();
			    
				_Q(".list1").hide();
				_Q("#realplant").show();
				_Q("#divtittle").text("编辑种植信息");
				_Q("#aps_type").trigger("onchange");
				if(index==0){
					_Q(".divtittle_2").text("编辑历史信息");
					_Q(".aps_typs_name").html("历史种植");
				}else if(index==1){
					_Q(".divtittle_2").text("编辑实际信息");
					_Q(".aps_typs_name").html("实际种植");
				}else if(index==2){
					_Q(".divtittle_2").text("编辑计划信息");
					_Q(".aps_typs_name").html("计划种植");
				}
				_Q("#divFloatToolsView_").animate({width: window.screen.width/4+17},800,function(){			});
				_Q(".tc_top_03").show();
				_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
			}
			
			function linkage (data){
				var str = data.split("-~_");
				_Q("#breedBreedId").empty().append(str[0]);
				if(_Q("#map_b").val()!=""){
					_Q('#breedBreedId').val(_Q("#map_b").val());
				}else{
					_Q('#breedBreedId')[0].selectedIndex = 0;
				}
				//_Q("#map_b").val("");
				if(_Q("#breedBreedId")[0].selectedIndex==-1)
					_Q("#breedBreedId")[0].selectedIndex=0;
				_Q("#breedBreedId").selectpicker('refresh');
				_Q("#breedBreedId").trigger("onchange");
			}
			
			function linkage2 (data){
				_Q("#modelId").empty().append(data);
				if(_Q("#map_m").val()!=""){
					_Q('#modelId').val(_Q("#map_m").val());
				}else{
					_Q('#modelId')[0].selectedIndex = 0;
				}
				if(_Q("#modelId")[0].selectedIndex==-1)
					_Q("#modelId")[0].selectedIndex=0;
				_Q("#modelId").selectpicker('refresh');
			}
			
			//种植完成
			function plant_ok (data,event){
						if(data.indexOf("+_+")>-1){
							var datas = data.split("+_+");
							eval('var tempp = '+datas[1]);
							data = datas[2];
						}
						var tempp;
						if(data.length>0){
							data+='"partition_id":0,"partition_name":"","type_name":""}';
							eval('tempp = {'+data);
						}
						if(realPlantJson.length==0){
							var newObj = {};
							newObj.plant_name = tempp.plant_name;
							newObj.tunnel_name = tempp.tunnel_name;
							newObj.plant_id = tempp.plant_id;
							newObj.tunnel_info_id = tempp.tunnel_info_id;
							newObj.start_time = tempp.starttime;
							newObj.end_time = tempp.endtime;
							newObj.crop_area = tempp.crop_area;
							newObj.breed_id = tempp.breed_id;
							newObj.plant_stauts = tempp.plant_stauts;
							newObj.harvest_time = tempp.harvest_time;
							newObj.breed_name = tempp.breed_name;
							newObj.imground = tempp.imground;
							newObj.imgsquare = tempp.imgsquare;
							newObj.middle = tempp.middle;
							newObj.plant_standard = tempp.plant_standard;
							newObj.resumePlantName = tempp.resumePlantName;
							newObj.listStr = tempp.listStr;
							newObj.sumkg = tempp.sumkg;
							realPlantJson.push(newObj);
							newObj.floristics_type = tempp.floristics_type;
							newObj.dingd = tempp.dingd;
							newObj.dingm = tempp.dingm;
							newObj.kaid = tempp.kaid;
							newObj.kaim = tempp.kaim;
							newObj.jied = tempp.jied;
							newObj.jiem = tempp.jiem;
							newObj.harvest_time = tempp.harvest_time;
							newObj.sprout_source = tempp.sprout_source;
							newObj.purchase_source = tempp.purchase_source;
						}else
						for(var i = 0;i<realPlantJson.length;i++){
							var rp = realPlantJson[i];
							if(rp.real_plant_id==tempp.real_plant_id){
								rp.real_plant_id = tempp.real_plant_id;
								//rp.plant_name = _Q("#plant_plantId").find("option:selected").text();
								rp.plant_name = tempp.plant_name;
								rp.tunnel_name = tempp.tunnel_name;
								rp.plant_id = tempp.plant_id;
								rp.resumePlantName = tempp.resumePlantName;
								rp.tunnel_info_id = tempp.tunnel_info_id;
								rp.start_time = tempp.starttime;
								rp.end_time = tempp.endtime;
								rp.listStr = tempp.listStr;
								rp.plant_stauts = tempp.plant_stauts;
								rp.harvest_time = tempp.harvest_time;
								rp.breed_name = tempp.breed_name;
								rp.crop_area = tempp.crop_area;
								rp.sumkg = tempp.sumkg;
								rp.plant_standard = tempp.plant_standard;
								rp.imground = tempp.imground;
								rp.imgsquare = tempp.imgsquare;
								rp.breed_id = tempp.breed_id;
								rp.middle = tempp.middle;
								rp.floristics_type = tempp.floristics_type;
								rp.dingd = tempp.dingd;
								rp.dingm = tempp.dingm;
								rp.kaid = tempp.kaid;
								rp.kaim = tempp.kaim;
								rp.jied = tempp.jied;
								rp.jiem = tempp.jiem;
								rp.harvest_time = tempp.harvest_time;
								rp.sprout_source = tempp.sprout_source;
								rp.purchase_source = tempp.purchase_source;
								break;
							}else if(i==realPlantJson.length-1){
								var newObj = {};
								newObj.real_plant_id = tempp.real_plant_id;
								//newObj.plant_name = _Q("#plant_plantId").find("option:selected").text();
								newObj.plant_name = tempp.plant_name;
								newObj.tunnel_name = tempp.tunnel_name;
								newObj.plant_id = tempp.plant_id;
								newObj.tunnel_info_id = tempp.tunnel_info_id;
								newObj.start_time = tempp.starttime;
								newObj.end_time = tempp.endtime;
								newObj.crop_area = tempp.crop_area;
								newObj.breed_id = tempp.breed_id;
								newObj.plant_stauts = tempp.plant_stauts;
								newObj.harvest_time = tempp.harvest_time;
								newObj.breed_name = tempp.breed_name;
								newObj.imground = tempp.imground;
								newObj.imgsquare = tempp.imgsquare;
								newObj.middle = tempp.middle;
								newObj.plant_standard = tempp.plant_standard;
								newObj.resumePlantName = tempp.resumePlantName;
								newObj.listStr = tempp.listStr;
								newObj.sumkg = tempp.sumkg;
								realPlantJson.push(newObj);
								newObj.floristics_type = tempp.floristics_type;
								newObj.dingd = tempp.dingd;
								newObj.dingm = tempp.dingm;
								newObj.kaid = tempp.kaid;
								newObj.kaim = tempp.kaim;
								newObj.jied = tempp.jied;
								newObj.jiem = tempp.jiem;
								newObj.harvest_time = tempp.harvest_time;
								newObj.sprout_source = tempp.sprout_source;
								newObj.purchase_source = tempp.purchase_source;
								break;
							}
						}
						
					closeDoor();
					refreshGantt_before();
					return;
			}
			
			//关闭弹出框
			function closeDoor(){
				_Q(".splitbuttonV").removeClass().addClass("splitbuttonV");
				_Q('#rightPane').css('width',0);
				_Q('#CenterAndRight').trigger('resize');
			}
			
			//取消种植编辑
			function plant_no(event){
				backindex = 0;
				closeDoor();
				return;
			}
			
			//返回按钮
			function group_back(){
				if(!_Q("#rightPane").width()){
					_Q(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
					_Q('#rightPane').css("width","350px");
					_Q('#CenterAndRight').trigger('resize');
					_Q(".list1").hide();
					_Q(".tc_top_05").show();
					_Q(".erbox3").show();
				}else{
					_Q(".list1").hide();
					_Q(".tc_top_05").show();
					_Q(".erbox3").show();
					var index = _Q(".erlist4").find(".current").index();
					if(index == 0){
						_Q("#rightPane .hsplitbar").show();
						_Q("#rbPane").show();
						_Q('#rightPane').trigger('resize');
					}else{
						_Q("#rightPane .hsplitbar").hide();
						_Q("#rbPane").hide();
						_Q('#rbPane').css("height","0px");
						_Q('#rightPane').trigger('resize');
					}
				}
				backname = _Q("#group_name").val();
			}
			
			//修改种植和排产
			function editPlant(id){
				if(!isEdit)
					return;
				_Q(".baseMap_ttl").css('background','url('+workpath+'/asset/images/baseIcojian1.png) no-repeat 10px 12px center').next('.baseMap_con').show();
				_Q("#typeHide").hide();
				_Q(".plotsYield_table input").val("");
				_Q(".aps_typs_name").closest("li").show();
				_Q("#plant\\:plant_beginInputDate").val("");
				_Q("#plant\\:harvest_timeInputDate").val("");
				_Q("#plant\\:plant_endInputDate").val("");
				var nowD = new Date();
				var nowD_ = new Date(nowD.getFullYear(),nowD.getMonth()+1,nowD.getDate());
				for(var i = 0;i<realPlantJson.length;i++){
					var obj = realPlantJson[i];
					if(obj.real_plant_id==id){
						var endTime = obj.end_time;
						var arrs = endTime.split("-");
					    var lktime = new Date(arrs[0], arrs[1], arrs[2]);
					    var lktimes = lktime.getTime();
					    
					    var beginTime = obj.start_time;
					    var arr = beginTime.split("-");
					    var bt = new Date(arr[0], arr[1], arr[2]);
					    var bts = bt.getTime();
					    _Q(".saveagain").show();
						_Q("#firsttable").show();
						_Q("#secondtable").hide();
						_Q(".saveagain").hide();
						_Q(".saveagain").unbind("click");
					    if(lktimes<=nowD_.getTime()){
					    	_Q("#aps_type")[0].selectedIndex=0;
					    	_Q(".saveagain").show();
							_Q(".saveagain").bind("click",function(){
								var data = plant_select.find(":selected").data().data;
								if(confirm("是否确认再次种植"+(data.plantName+"-"+data.breedName))){
									renewRealPlant(obj);
								}
							});
					    }else{
					    	if(bts<nowD_.getTime()){
					    		_Q("#aps_type")[0].selectedIndex=1;
					    	}else{
					    		_Q("#aps_type")[0].selectedIndex=2;
					    	}
					    }
						plant_select.select2("trigger", "select", {
						    data:{id: obj.breed_id, breedName:obj.breed_name,plantId:obj.plant_id,plantName:obj.plant_name,type:obj.floristics_type}
						});
						plant_select.prop("disabled", "true");
					    _Q("#aps_type").selectpicker('refresh');
						_Q("#prompt").text("");
						_Q(".typ1").show();
						_Q(".typ2").hide();
						_Q("#prompt2").html("");
						_Q(".aps_radio:eq(0)").trigger("click");
						_Q("#breedBreedId").val(obj.breed_id);
						_Q("#plant_real_id").val(id);
						_Q("#edittype").val(2);
						_Q("#typeHide").hide();
						_Q("#map_p").val(obj.plant_id);
						_Q("#map_b").val(obj.breed_id);
						_Q("#map_m").val(obj.model_id);
						_Q("#plant_parent_name").html(obj.tunnel_name);
						_Q("#plant_tunnel_id").val(obj.tunnel_info_id);
						_Q("#env_type").val(obj.plant_env_type_id);
						_Q("#tunnel_area").val(obj.mu_number);
						_Q("#real_plant_name").val(obj.resumePlantName);
						_Q("#plant_plantId").val(obj.plant_id);
						_Q("#plant\\:but").attr('disabled',"true");
						//getModelByRealId(id);
						if(obj.floristics_type !=null &&obj.floristics_type==2){
							_Q("#ymstart").val(obj.start_time);
							_Q("#ymend").val(obj.harvest_time);
							if(obj.end_time=="2050-12-31"){
								_Q("#zzend").val("");
							}else{
								_Q("#zzend").val(obj.end_time);
							}
							_Q("#xiumian").val((obj.dingm<10?"0"+obj.dingm:obj.dingm)+"-"+(obj.dingd<10?"0"+obj.dingd:obj.dingd));
							_Q("#csstart").val((obj.kaim<10?"0"+obj.kaim:obj.kaim)+"-"+(obj.kaid<10?"0"+obj.kaid:obj.kaid));
							_Q("#csend").val((obj.jiem<10?"0"+obj.jiem:obj.jiem)+"-"+(obj.jied<10?"0"+obj.jied:obj.jied));
						}else{
							_Q("#plant\\:plant_beginInputDate").val(obj.start_time);
							_Q("#plant\\:plant_endInputDate").val(obj.end_time);
							if(obj.harvest_time&&obj.harvest_time.length>4)
								_Q("#plant\\:harvest_timeInputDate").val(obj.harvest_time);
							else
								_Q("#plant\\:harvest_timeInputDate").val("");
						}
						
						_Q("#plant_standard").val(obj.plant_standard);
						if(_Q('.mapRtArea_btns02 .button_[aa='+obj.plant_standard+']').length==0){
							_Q('.mapRtArea_btns02 .button_:eq(0)').trigger("click");
						}else{
							_Q('.mapRtArea_btns02 .button_[aa='+obj.plant_standard+']').trigger("click");
						}
						
						_Q("#plant_area").val(obj.crop_area);
						var zhongarea = 0;
						_Q(".obj_crop_area").each(function(k,zhongareaval){
					        zhongarea += parseFloat(zhongareaval.value);
						});
						var allarea = parseFloat(_Q("#muarea").val())-parseFloat(zhongarea);
						allarea += parseFloat(obj.crop_area);
						_Q("#myarea").val(obj.crop_area);
						_Q("#plantarea").text(obj.mu_number);
						
						_Q("#sproutSel").selectpicker('val',obj.sprout_source);
						_Q("#sproutSel").selectpicker('refresh');
						_Q("#purchaseSource").val(obj.purchase_source);
						//_Q("#purchaseSourceDiv").hide();
						
						_Q(".list1").hide();
						_Q("#realplant").show();
						
						if(lktimes<=nowD_.getTime()){
							_Q(".divtittle_2").text("编辑历史信息");
							_Q(".aps_typs_name").html("历史种植");
						}else{
							if(bts<=nowD_.getTime()){
								_Q(".divtittle_2").text("编辑实际信息");
								_Q(".aps_typs_name").html("实际种植");
					    	}else{
					    		_Q(".divtittle_2").text("编辑计划信息");
								_Q(".aps_typs_name").html("计划种植");
					    	}
						}
						_Q("#tunnel_none1").show();
						_Q("#tunnel_none2").hide();
						_Q("#divFloatToolsView_").animate({width: window.screen.width/4+17},800,function(){			});
						_Q(".tc_top_03").show();
						_Q("#searchLi").animate({right: window.screen.width/4+10},800,function(){});
						_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
						_Q(".btnOpen").hide();
						break;
					}
				}
			}
			
			function renewRealPlant(obj){
				_Q("#edittype").val(1);
				
				_Q("#firsttable").hide();
				_Q("#secondtable").show();
				_Q("#plant_real_id").val("");
				var now = new Date();
				
				var str1 = "#plant\\:plant_beginInputDate";
				var str2 = "#plant\\:harvest_timeInputDate";
				var str3 = "#plant\\:plant_endInputDate";
				
				if(obj.floristics_type==2){
					str1 = "#ymstart"; 
					str2 = "#ymend";
					str3 = "#zzend";   
				}
				
				var nowt = new Date();
				
				var beginTime = _Q(str1).val();
				var harvestTime = _Q(str2).val();
				var endTime = _Q(str3).val();
				
				var arr = beginTime.split("-");
				var bt = new Date(arr[0], parseInt(arr[1],10)-1, arr[2]);
				var bts = bt.getTime();
				_Q(str1).val(nowt.format("yyyy-MM-dd"));
				
				var cha = nowt.getTime() - bts;
				var yuecha;
				if(harvestTime!=""&&obj.floristics_type!=2){
					var har = harvestTime.split("-");
					var hart = new Date(har[0], parseInt(har[1],10)-1, har[2]);
					var hars = hart.getTime();
					hars += cha;
                    yuecha = (new Date(hars)).getMonth()+1-parseInt(har[1],10);
					_Q(str2).val((new Date(hars)).format("yyyy-MM-dd"));
				}else{
					_Q(str2).val("");
				}
				
				if(endTime!=""&&obj.floristics_type!=2){
					var arrs = endTime.split("-");
					var lktime = new Date(arrs[0], parseInt(arrs[1],10)-1, arrs[2]);
					var lktimes = lktime.getTime();
					lktimes += cha;
					_Q(str3).val((new Date(lktimes)).format("yyyy-MM-dd"));
				}else{
					_Q(str3).val("");
				}
				
				if(obj.floristics_type!=2&& yuecha){
					var arr = new Array();
					_Q(".plotsYield_table input").each(function(ind){
						if(_Q(this).val()!=""){
							arr.push((ind+1)+"++"+_Q(this).val());
						}
					});
					_Q(".plotsYield_table input").val("");
					_Q.each(arr,function(index,value){
						var values = value.split("++");
						var ind = parseInt(values[0]);
						ind += yuecha;
						if(ind>12){
							_Q("#month"+(ind-12)).val(values[1]);
						}else{
							_Q("#month"+ind).val(values[1]);
						}
					});
                    begin_end();
				}
				_Q("#secondtable .btn-default").bind("click",function(){_Q("#secondtable .btn-default").unbind("click");editPlant(obj.real_plant_id)});
			}
			
			//品种选择 
			function changeBreed(){
				if(_Q("#breed_new").val()==0){//休耕
					_Q(".modehide").hide();
					_Q(".modehidename_1").html("开始时间");
					_Q(".modehidename_2").html("结束时间");
					_Q(".yinian").show();
					_Q(".duonian").hide();
				}else if(plant_select.find(":selected").data().data.type=="2"){//多年生
					_Q(".modehide").show();
					_Q(".yinian").hide();
					_Q(".duonian").show();
				}else{//其他
					_Q(".modehide").show();
					_Q(".modehidename_1").html("定植时间");
					_Q(".modehidename_2").html("种植结束");
					_Q(".yinian").show();
					_Q(".duonian").hide();
				}
			}
			
			//通过时间筛选  剩余面积和模型
			function getModelByRealId_next(data){
				if(plant_select.find(":selected").data().data.type=="2"){
					begin_end2();
				}else{
					begin_end();
				}
				
				var datas = data.split("-~_");
//				if(_Q("#edittype").val()==1){
//					_Q("#plantarea").html(datas[0]);
//					//_Q("#plant_area").val(datas[0]);
//				}else{
//					_Q("#plantarea").html(datas[0]);
//					//_Q("#plant_area").val(_Q("#myarea").val());
//				}
				
				if(_Q("#plant_area").val()==""||parseFloat(_Q("#plant_area").val())==0){
					_Q(".yugu").hide();
					_Q(".plotsYield_table input").val("");
					changeYield(1);
				}else if(_Q("#breed_new").val()!=0){
					_Q(".yugu").show();
				}else{
					_Q(".yugu").hide();
				}
				
				if(datas.length==1){
					resetHightChart();
					return;
				}
				var start = datas[5];
				var starts = start.split("-");
				var ht = "";
				if(_Q("#plant\\:harvest_timeInputDate").val()==""){
					if(starts[0]=="null"){
						var val = _Q("#plant\\:plant_beginInputDate").val();
						var vals = val.split("-");
						if(parseInt(vals[1],10)<=parseInt(starts[1],10)){
							ht+=vals[0];
						}else{
							ht+=(parseInt(vals[0],10)+1);
						}
						if(starts[1].length==1){
							ht+="-0"+starts[1];
						}else{
							ht+="-"+starts[1];
						}
						if(parseInt(starts[2],10)==1){
							ht+="-01";
						}else if(parseInt(starts[2],10)==2){
							ht+="-11";
						}else if(parseInt(starts[2],10)==3){
							ht+="-21";
						}
						if(ht.length>4)
							_Q("#plant\\:harvest_timeInputDate").val(ht);
					}else{
						ht = starts[0]+"-"+starts[1]+"-";
						if(parseInt(starts[2],10)<10){
							ht+="0"+starts[2];
						}else{
							ht+=starts[2];
						}
						_Q("#plant\\:harvest_timeInputDate").val(ht);
					}
				}
				if(datas[2]==1){
					_Q(".nav-tabs > li:eq(1)").addClass("active").siblings().removeClass("active");
					_Q("#yield_type").val(1);
					eval("var tempData="+datas[3]);
					if(tempData.month1&&parseFloat(tempData.month1)>0){
						_Q("#month1").val(tempData.month1);
					}
					if(tempData.month2&&parseFloat(tempData.month2)>0){
						_Q("#month2").val(tempData.month2);
					}
					if(tempData.month3&&parseFloat(tempData.month3)>0){
						_Q("#month3").val(tempData.month3);
					}
					if(tempData.month4&&parseFloat(tempData.month4)>0){
						_Q("#month4").val(tempData.month4);
					}
					if(tempData.month5&&parseFloat(tempData.month5)>0){
						_Q("#month5").val(tempData.month5);
					}
					if(tempData.month6&&parseFloat(tempData.month6)>0){
						_Q("#month6").val(tempData.month6);
					}
					if(tempData.month7&&parseFloat(tempData.month7)>0){
						_Q("#month7").val(tempData.month7);
					}
					if(tempData.month8&&parseFloat(tempData.month8)>0){
						_Q("#month8").val(tempData.month8);
					}
					if(tempData.month9&&parseFloat(tempData.month9)>0){
						_Q("#month9").val(tempData.month9);
					}
					if(tempData.month10&&parseFloat(tempData.month10)>0){
						_Q("#month10").val(tempData.month10);
					}
					if(tempData.month11&&parseFloat(tempData.month11)>0){
						_Q("#month11").val(tempData.month11);
					}
					if(tempData.month12&&parseFloat(tempData.month12)>0){
						_Q("#month12").val(tempData.month12);
					}
				}else{
					_Q(".nav-tabs > li:eq(0)").addClass("active").siblings().removeClass("active");
					_Q("#yield_type").val(2);
					eval("var tempData="+datas[3]);
					var mianji = _Q("#plant_area").val();
					mianji = parseFloat(mianji);
					if(tempData.month1&&parseFloat(tempData.month1)>0){
						var tempv = parseFloat(tempData.month1)*mianji;
						tempv = tempv.toFixed(2);
						_Q("#month1").val(tempv);
					}
					if(tempData.month2&&parseFloat(tempData.month2)>0){
						var tempv = parseFloat(tempData.month2)*mianji;
						tempv = tempv.toFixed(2);
						_Q("#month2").val(tempv);
					}
					if(tempData.month3&&parseFloat(tempData.month3)>0){
						var tempv = parseFloat(tempData.month3)*mianji;
						tempv = tempv.toFixed(2);
						_Q("#month3").val(tempv);
					}
					if(tempData.month4&&parseFloat(tempData.month4)>0){
						var tempv = parseFloat(tempData.month4)*mianji;
						tempv = tempv.toFixed(2);
						_Q("#month4").val(tempv);
					}
					if(tempData.month5&&parseFloat(tempData.month5)>0){
						var tempv = parseFloat(tempData.month5)*mianji;
						tempv = tempv.toFixed(2);
						_Q("#month5").val(tempv);
					}
					if(tempData.month6&&parseFloat(tempData.month6)>0){
						var tempv = parseFloat(tempData.month6)*mianji;
						tempv = tempv.toFixed(2);
						_Q("#month6").val(tempv);
					}
					if(tempData.month7&&parseFloat(tempData.month7)>0){
						var tempv = parseFloat(tempData.month7)*mianji;
						tempv = tempv.toFixed(2);
						_Q("#month7").val(tempv);
					}
					if(tempData.month8&&parseFloat(tempData.month8)>0){
						var tempv = parseFloat(tempData.month8)*mianji;
						tempv = tempv.toFixed(2);
						_Q("#month8").val(tempv);
					}
					if(tempData.month9&&parseFloat(tempData.month9)>0){
						var tempv = parseFloat(tempData.month9)*mianji;
						tempv = tempv.toFixed(2);
						_Q("#month9").val(tempv);
					}
					if(tempData.month10&&parseFloat(tempData.month10)>0){
						var tempv = parseFloat(tempData.month10)*mianji;
						tempv = tempv.toFixed(2);
						_Q("#month10").val(tempv);
					}
					if(tempData.month11&&parseFloat(tempData.month11)>0){
						var tempv = parseFloat(tempData.month11)*mianji;
						tempv = tempv.toFixed(2);
						_Q("#month11").val(tempv);
					}
					if(tempData.month12&&parseFloat(tempData.month12)>0){
						var tempv = parseFloat(tempData.month12)*mianji;
						tempv = tempv.toFixed(2);
						_Q("#month12").val(tempv);
					}
				}
				if(plant_select.find(":selected").data().data.type=="2"){
					if(datas[6].length>4){
						var ds = datas[6].split(" ");
						if(ds[0]!='2050-12-31'&&_Q("#zzend").val()==''){
							_Q("#zzend").val(ds[0]);
						}
					}
					begin_end2();
				}else{
					begin_end();
				}
				
				resetHightChart();
			}
			
			
			//排产种植日期联动模型
			function linkage4 (data){
				var str = data.split("_+_~");
				//_Q("#smodel").empty().append(str[0]);
				if(_Q("#xmodel").val()!==""){
					_Q("#smodel").val(_Q("#xmodel").val());
				}
				if(str[1]=="0"){
					_Q("#mu_table2").html("(添加)");
				}else{
					_Q("#mu_table2").html("(编辑)");
				}
				if(_Q("#scheduleId").val()==""){
					_Q("#splantarea").html(str[0]);
					_Q("#sarea").val(str[0]);
				}else{
					_Q("#splantarea").html(str[0]);
					_Q("#sarea").val(_Q("#myarea_aps").val());
				}
				
				_Q("#smodel").val(str[1]);
				_Q("#xmodel").val("");
			    _Q(".table_1").empty().append(str[2]);
			}
			
			function getModelByTime_next(data){
				if(data==""){
					_Q(".table_0").empty();
					_Q("#modelId").val(0);
					_Q("#mu_table").html("(添加)");
					return;
				}
					
				var strs = data.split("-~_");
				_Q(".table_0").empty();
//				if(_Q("#edittype").val()==1){
//					_Q("#plantarea").html(strs[0]);
//					//_Q("#plant_area").val(strs[0]);
//				}else{
//					_Q("#plantarea").html(strs[0]);
//					//_Q("#plant_area").val(_Q("#myarea").val());
//				}
				if(strs.length==1){
					_Q("#modelId").val(0);
					_Q("#mu_table").html("(添加)");
					return;
				}
				
				_Q("#modelId").val(strs[1]);
				_Q(".table_0").empty();
				_Q("#mu_table").html("(编辑)");
				_Q(".table_0").append(strs[2]);
				_Q(".table_0").show();
			}
			
			var obj0 = {
					tunnel_info_id:0,
					name: "",
					desc: "",
					values: [{
						from: "/Date(1336611200000)/",
						to: "/Date(1349711200000)/",
						label: "Warranty Period",
						customClass: "ganttOrange"
					}]
				};
			
			var plantStr = new Array();
			function searchBreed(obj){
				plantStr = _Q(obj).val();
				refreshGantt_before()
			}
			
			function checkGanttStr(){
				//if(_Q(".splitbuttonV").attr("class")=="splitbuttonV"){
					
				//	return 1;
				//}else if(_Q(".splitbuttonV").attr("class")=="splitbuttonV invert"){
					var index = _Q(".erlist4").find(".current").index();
					if(index == 0){
						
						return 2;
					}else{
					      
						return 3;
					}
				//}
			}
			
			//多年生作物Gantt 
			function ManayYear(array,r,start,end,tot){
				var tempYear = _Q("#yearlic").html();
				var harvest = r.harvest_time;
				var harvest_bak = harvest;
				harvest =  harvest.replace("-","/").replace("-","/");
				var youMiaoStart = start;
				var youMiaoEnd = harvest;
				var y1 = start.split("/");
				var y2 = end.split("/");
				var y3 = harvest.split("/");
				if(parseInt(y2[0],10)<parseInt(tempYear,10)){
					return array;
				}
				var tb_1 = true;
				if(y1[0]<tempYear&&y3[0]>tempYear){
					start = tempYear+"/01/01";
					harvest = tempYear+"/12/30";
				}
				if(y1[0]<tempYear&&y3[0]==tempYear){
					start = tempYear+"/01/01";
				}
				if(y1[0]==tempYear&&y3[0]>tempYear){
					harvest = tempYear+"/12/31";
				}
				if(y1[0]>tempYear||y3[0]<tempYear){
					tb_1 = false;
				}
				if(tb_1){
					newObj1 = {
							id:-1,
							real_plant_id:r.plant_id,
							from: start,
							to: harvest,
							customClass: ymcolor,
							dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
							desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>幼苗开始:"+youMiaoStart+"<br/>幼苗结束:"+youMiaoEnd+"<br/>",
							label: r.plant_name +" 幼苗期"
					};
					array.push(newObj1);
				}
				var y4 = harvest_bak.split("-");
				var harm = y4[1]+"-"+y4[2];
				var xium = (r.dingm<10?"0"+r.dingm:r.dingm)+"-"+(r.dingd<10?"0"+r.dingm:r.dingd);
				var xium_bak = (r.dingm<10?"0"+r.dingm:r.dingm)+"/"+(r.dingd<10?"0"+r.dingm:r.dingd);
				
				var caik = (r.kaim<10?"0"+r.kaim:r.kaim)+"-"+(r.kaid<10?"0"+r.kaid:r.kaid);
				var caik_bak = (r.kaim<10?"0"+r.kaim:r.kaim)+"/"+(r.kaid<10?"0"+r.kaid:r.kaid);
				
				var caij = (r.jiem<10?"0"+r.jiem:r.jiem)+"-"+(r.jied<10?"0"+r.jied:r.jied);
				var caij_bak = (r.jiem<10?"0"+r.jiem:r.jiem)+"/"+(r.jied<10?"0"+r.jied:r.jied);
				
				if(y4[0]==tempYear){//育苗结束当年
					if(harm>=xium){//育苗结束月份>休眠月份
						if(harm>caik){//育苗结束>采收开始
							//1  y4[1]到12月 休眠
							/*var newObj2 = {
									id:-1,real_plant_id:r.plant_id,customClass: szcolor,
									from: tempYear+"/"+y4[1]+"/"+y4[2],
									to: tempYear+"/"+12+"/"+31,
									dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
									desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>开始时间:"+r.start_time+"<br/>结束时间:"+r.end_time+"<br/>",
									label: r.plant_name +" 成长期"
							};
							array.push(newObj2);*/
						}else if(harm<caik){ //育苗结束<采收开始
							if(caik<caij){
								//1 y4[1]到采收开始 休眠
								var newObj2 = {
										id:-1,real_plant_id:r.plant_id,customClass: szcolor,
										from: tempYear+"/"+y4[1]+"/"+y4[2],
										to: tempYear+"/"+caik_bak,
										dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
										desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>生长开始:"+tempYear+"/"+y4[1]+"/"+y4[2]+"<br/>采收开始:"+tempYear+"/"+caik_bak+"<br/>"+"预估产量:"+tot+" KG</br>"+r.listStr,
										label: r.plant_name +" 成长期"
								};
								array.push(newObj2);								
								//2   采收开始到采收结束 采收
								var newObj3 = {
										id:-1,real_plant_id:r.plant_id,customClass: cscolor,
										from: tempYear+"/"+caik_bak,
										to: tempYear+"/"+caij_bak,
										dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
										desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>采收开始:"+tempYear+"/"+caik_bak+"<br/>采收结束:"+tempYear+"/"+caij_bak+"<br/>"+"预估产量:"+tot+" KG</br>"+r.listStr,
										label: r.plant_name +" 采收期"
								};
								array.push(newObj3)
							}else{
								//1 y4[1]到采收开始 休眠
								var newObj2 = {
										id:-1,real_plant_id:r.plant_id,customClass: szcolor,
										from: tempYear+"/"+y4[1]+"/"+y4[2],
										to: tempYear+"/"+caik_bak,
										dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
										desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>生长开始:"+tempYear+"/"+y4[1]+"/"+y4[2]+"<br/>采收开始:"+tempYear+"/"+caik_bak+"<br/>"+"预估产量:"+tot+" KG</br>"+r.listStr,
										label: r.plant_name +" 成长期"
								};
								array.push(newObj2);	
								//2	采收开始到12月31日  采收
								var newObj3 = {
										id:-1,real_plant_id:r.plant_id,customClass: cscolor,
										from: tempYear+"/"+caik_bak,
										to: tempYear+"/12/31",
										dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
										desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>采收开始:"+tempYear+"/"+caik_bak+"<br/>采收结束"+(parseInt(tempYear,10)+1)+"/"+caij_bak+"<br/>"+"预估产量:"+tot+" KG</br>"+r.listStr,
										label: r.plant_name +" 采收期"
								};
								array.push(newObj3)
							}
						}
					}else if(harm<xium){//
						if(xium>caik){//休眠>采收开始
							//1	xium到12月  休眠
							var newObj2 = {
									id:-1,real_plant_id:r.plant_id,customClass: szcolor,
									from: tempYear+"/"+xium_bak,
									to: tempYear+"/12/31",
									dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
									desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>生长开始:"+tempYear+"/"+xium_bak+"<br/>采收开始:"+(parseInt(tempYear,10)+1)+"/"+caik_bak+"<br/>"+"预估产量:"+tot+" KG</br>"+r.listStr,
									label: r.plant_name +" 成长期"
							};
							array.push(newObj2);
						}else if(xium<caik){ //休眠<采收开始
							if(caik<caij){
								//1	xium到采收开始	休眠
								var newObj2 = {
										id:-1,real_plant_id:r.plant_id,customClass: szcolor,
										from: tempYear+"/"+xium_bak,
										to: tempYear+"/"+caik_bak,
										dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
										desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>生长开始:"+tempYear+"/"+xium_bak+"<br/>采收开始:"+tempYear+"/"+caik_bak+"<br/>"+"预估产量:"+tot+" KG</br>"+r.listStr,
										label: r.plant_name +" 成长期"
								};
								array.push(newObj2);
								//2	采收开始到采收结束 采收
								var newObj3 = {
										id:-1,real_plant_id:r.plant_id,customClass: cscolor,
										from: tempYear+"/"+caik_bak,
										to: tempYear+"/"+caij_bak,
										dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
										desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>采收开始:"+tempYear+"/"+caik_bak+"<br/>采收结束:"+tempYear+"/"+caij_bak+"<br/>"+"预估产量:"+tot+" KG</br>"+r.listStr,
										label: r.plant_name +" 采收期"
								};
								array.push(newObj3)
							}else{
								//1	xium到采收开始 休眠
								var newObj2 = {
										id:-1,real_plant_id:r.plant_id,customClass: szcolor,
										from: tempYear+"/"+xium_bak,
										to: tempYear+"/"+caik_bak,
										dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
										desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>生长开始:"+tempYear+"/"+xium_bak+"<br/>采收开始:"+tempYear+"/"+caik_bak+"<br/>"+"预估产量:"+tot+" KG</br>"+r.listStr,
										label: r.plant_name +" 成长期"
								};
								array.push(newObj2);
								//2	采收开始到12月31日 采收
								var newObj3 = {
										id:-1,real_plant_id:r.plant_id,customClass: cscolor,
										from: tempYear+"/"+caik_bak,
										to: tempYear+"/12/31",
										dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
										desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>采收开始:"+tempYear+"/"+caik_bak+"<br/>采收结束:"+(parseInt(tempYear,10)+1)+"/"+caij_bak+"<br/>"+"预估产量:"+tot+" KG</br>"+r.listStr,
										label: r.plant_name +" 采收期"
								};
								array.push(newObj3)
							}
						}
					}
				}else if(y4[0]<tempYear){//育苗结束第二年
					if(xium>caik){//休眠>采收开始
						//1	xium到12月 休眠
						var newObj2 = {
								id:-1,real_plant_id:r.plant_id,customClass: szcolor,
								from: tempYear+"/"+xium_bak,
								to: tempYear+"/12/31",
								dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
								desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>生长开始:"+tempYear+"/"+xium_bak+"<br/>采收开始:"+(parseInt(tempYear,10)+1)+"/"+caik_bak+"<br/>"+"预估产量:"+tot+" KG</br>"+r.listStr,
								label: r.plant_name +" 成长期"
						};
						array.push(newObj2);
						//2	1月到采收开始 休眠
						var newObj3 = {
								id:-1,real_plant_id:r.plant_id,customClass: szcolor,
								from: tempYear+"/01/01",
								to: tempYear+"/"+caik_bak,
								dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
								desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>生长开始:"+(parseInt(tempYear,10)-1)+"/"+xium_bak+"<br/>采收开始:"+tempYear+"/"+caik_bak+"<br/>"+"预估产量:"+tot+" KG</br>"+r.listStr,
								label: r.plant_name +" 成长期"
						};
						array.push(newObj3);
						//3	采收开始到采收结束 采收
						var newObj4 = {
								id:-1,real_plant_id:r.plant_id,customClass: cscolor,
								from: tempYear+"/"+caik_bak,
								to: tempYear+"/"+caij_bak,
								dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
								desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>采收开始:"+tempYear+"/"+caik_bak+"<br/>采收结束:"+tempYear+"/"+caij_bak+"<br/>"+"预估产量:"+tot+" KG</br>"+r.listStr,
								label: r.plant_name +" 采收期"
						};
						array.push(newObj4);
					}else if(xium<caik){ //休眠<采收开始
						if(caik<caij){
							//1	xium到采收开始  休眠
							var newObj2 = {
									id:-1,real_plant_id:r.plant_id,customClass: szcolor,
									from: tempYear+"/"+xium_bak,
									to: tempYear+"/"+caik_bak,
									dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
									desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>生长开始:"+tempYear+"/"+xium_bak+"<br/>采收开始:"+tempYear+"/"+caik_bak+"<br/>"+"预估产量:"+tot+" KG</br>"+r.listStr,
									label: r.plant_name +" 成长期"
							};
							array.push(newObj2);
							//2	采收开始到采收结束 采收
							var newObj3 = {
									id:-1,real_plant_id:r.plant_id,customClass: cscolor,
									from: tempYear+"/"+caik_bak,
									to: tempYear+"/"+caij_bak,
									dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
									desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>采收开始:"+tempYear+"/"+caik_bak+"<br/>采收结束:"+tempYear+"/"+caij_bak+"<br/>"+"预估产量:"+tot+" KG</br>"+r.listStr,
									label: r.plant_name +" 采收期"
							};
							array.push(newObj3);
						}else{
							//1	xium到采收开始  休眠
							var newObj2 = {
									id:-1,real_plant_id:r.plant_id,customClass: szcolor,
									from: tempYear+"/"+xium_bak,
									to: tempYear+"/"+caik_bak,
									dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
									desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>生长开始:"+tempYear+"/"+xium_bak+"<br/>采收开始:"+tempYear+"/"+caik_bak+"<br/>"+"预估产量:"+tot+" KG</br>"+r.listStr,
									label: r.plant_name +" 成长期"
							};
							array.push(newObj2);
							//2	采收开始到12月31日 采收
							var newObj3 = {
									id:-1,real_plant_id:r.plant_id,customClass: cscolor,
									from: tempYear+"/"+caik_bak,
									to: tempYear+"/12/31",
									dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
									desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>采收开始:"+tempYear+"/"+caik_bak+"<br/>采收结束:"+(parseInt(tempYear,10)+1)+"/"+caij_bak+"<br/>"+"预估产量:"+tot+" KG</br>"+r.listStr,
									label: r.plant_name +" 采收期"
							};
							array.push(newObj3);
							//3	1月到采收结束 采收  采收
							var newObj4 = {
									id:-1,real_plant_id:r.plant_id,customClass: cscolor,
									from: tempYear+"/01/01",
									to: tempYear+"/"+caij_bak,
									dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
									desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>采收开始:"+(parseInt(tempYear,10)-1)+"/"+caik_bak+"<br/>采收结束:"+tempYear+"/"+caij_bak+"<br/>"+"预估产量:"+tot+" KG</br>"+r.listStr,
									label: r.plant_name +" 采收期"
							};
							array.push(newObj4);
						}
					}
				}
				return array;
			}
			
			var ymcolor = "ymcolor",szcolor = "szcolor",cscolor = "cscolor";
			var jsMap = new JsMap();
			var scource = [];
			/**
			 * Gantt 数据结构
			 * [{name,id,desc...,value:[{start,end,desc},{start,end,desc},{start,end,desc}]},{...},{...},{...}]
			 * @param str
			 */
			function innitGantt(str){
				var check = checkGanttStr();
				var tempYear = _Q("#yearlic").html();
				scource = [];
				if(apsStr.length>0){//数组放入所有大棚
					scource.push(obj0);
					for(var i = 0;i<apsStr.length;i++){
						var obj = apsStr[i];
						if(check == 3){
							if(obj.tunnel_name.indexOf(str)==-1)
								continue;
						}else if(check == 2){
							if(obj.plant_name.indexOf(str)==-1)
								continue;
						}
						if(plantStr!=null&&plantStr.length>0){
							for(var xt = 0;xt<plantStr.length;xt++){
								var xobj = plantStr[xt];
								if(xobj==obj.plant_id){
									xtb = true;
									break;
								}
							}
						}else
							xtb = true;
						if(!xtb)
							continue;
						for(var j = 0;j<scource.length;j++){
							var ganObj = scource[j];
							if(obj.tunnel_info_id==ganObj.tunnel_info_id&&obj.plant_id==ganObj.plant_id){
								ganObj.values = getValues(obj,ganObj.values,tempYear);
							}else if(j==scource.length-1){
								var array = new Array();
								var values = getValues(obj,array,tempYear);
								var newObj = {tunnel_info_id:obj.tunnel_info_id,
										id:obj.tunnel_info_id,
										name: obj.tunnel_name,
										desc: obj.area+"亩",
										plant_id:obj.plant_id,
										values: array};
								scource.push(newObj);
								break;
							}
						}
					}
					if(scource[0].tunnel_info_id==0){
						scource.shift();
					}
				}
				if(realPlantJson.length>0){
					var _obj;
					var name;
					var tunnel_id=-1;
					var _inde = 0;
					var now = new Date();
					var now_ = new Date(now.getFullYear(),now.getMonth(),now.getDate());
					for(var i = 0;i<realPlantJson.length;i++){
						//console.log(i)
						var r =  realPlantJson[i];
						var xtb = false;
						if(r.plant_id==380)
							console.log(111)
						if(plantStr!=null&&plantStr.length>0){
							for(var xt = 0;xt<plantStr.length;xt++){
								var xobj = plantStr[xt];
								if(xobj==r.plant_id){
									xtb = true;
									break;
								}
							}
						}else
							xtb = true;
						if(!xtb)
							continue;
						var b = false;
						var tar1 = r.plant_id;
						if(check == 3){
							if(r.tunnel_name.indexOf(str)==-1)
								continue;
						}else if(check == 2){
							if(r.plant_name.indexOf(str)==-1)
								continue;
						}
						if(r.real_plant_id == 7028)
							console.log("xx");
						var color1 = "ganttGreenMore";
						var color2 = "ganttRedMore";
						if(scource.length==0){//作物过滤之后.scource 的length 可能等于0 在此做处理
							if(r.real_plant_id == null){
								var array = new Array();
								var newObj = {tunnel_info_id:r.tunnel_info_id,
										id:r.tunnel_info_id,
										name: r.tunnel_name,
										desc: r.mu_number+"亩",
										plant_id:0,
										values: array};
								scource.push(newObj);
								_inde = j+1;
								continue;
							}
							
							var array = new Array();
							var start = r.start_time;
							start = start.replace("-","/").replace("-","/");
							var end = r.end_time;
							end = end.replace("-","/").replace("-","/");
							var middle = r.middle;
							middle = middle.replace("-","/").replace("-","/");
							var tot = r.sumkg*r.crop_area;
							if(new Date(start).getTime()>now_.getTime()&&r.plant_stauts==2){
								 color1 = "ganttGreen";
								 color2 = "ganttRed";
							}
							tot = tot.toFixed(2);
							var newObj1, newObj2;
							if(r.floristics_type!=null&&r.floristics_type==2){
								///////////////
								array = ManayYear(array,r,start,end);
								var newObj = {tunnel_info_id:r.tunnel_info_id,
										id:r.tunnel_info_id,
										name: r.tunnel_name,
										desc: r.crop_area+"亩",
										plant_id:r.plant_id,
										values: array};
								scource = insert(scource, _inde, newObj);
							}else{
								var y1 = start.split("/");
								var y2 = end.split("/");
								var y3 = middle.split("/");
								if(r.plant_id==0){
									color1 = "ganttyellow";
									if(y1[0]<tempYear&&y2[0]>tempYear){
										start = tempYear+"/"+01+"/"+01;
										end = tempYear+"/"+12+"/"+31;
									}
									if(y1[0]<tempYear&&y2[0]==tempYear){
										start = tempYear+"/"+01+"/"+01;
									}
									if(y1[0]==tempYear&&y2[0]>tempYear){
										end = tempYear+"/"+12+"/"+31;
									}
									if(y1[0]>tempYear||y2[0]<tempYear)
										continue;
									newObj1 = {
											id:-1,
											real_plant_id:r.plant_id,
											from: start,
											to: end,
											customClass: color1,
											dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
											desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>休耕开始:"+r.start_time+"<br/>休耕结束:"+r.end_time+"<br/>",
											label: r.plant_name
										};
									array.unshift(newObj1);
									var newObj = {tunnel_info_id:r.tunnel_info_id,
											id:r.tunnel_info_id,
											name: r.tunnel_name,
											desc: r.crop_area+"亩",
											plant_id:r.plant_id,
											values: array};
									scource = insert(scource, _inde, newObj);
								}else{
									var tb_1 = true;
									var tb_2 = true;
									var middle_bak = middle;
									if(y1[0]<tempYear&&y3[0]>tempYear){
										start = tempYear+"/"+01+"/"+01;
										middle = tempYear+"/"+12+"/"+31;
									}
									if(y1[0]<tempYear&&y3[0]==tempYear){
										start = tempYear+"/"+01+"/"+01;
									}
									if(y1[0]==tempYear&&y3[0]>tempYear){
										middle = tempYear+"/"+12+"/"+31;
									}
									if(y1[0]>tempYear||y3[0]<tempYear)
										tb_1 = false;
									if(tb_1){
										newObj1 = {
												id:-1,
												real_plant_id:r.plant_id,
												from: start,
												to: middle,
												customClass: color1,
												dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
												desc:"大棚:"+r.tunnel_name+"<br/>"+"作物:"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>定植开始:"+r.start_time+"<br/>采收开始:"+r.middle+"<br/>预估产量:"+tot+" KG</br>"+r.listStr,
												label: r.plant_name+"种植"
											};
										array.unshift(newObj1);
									}
									y3 = middle_bak.split("/");
									if(y3[0]<tempYear&&y2[0]>tempYear){
										middle_bak = tempYear+"/"+01+"/"+01;
										end = tempYear+"/"+12+"/"+31;
									}
									if(y3[0]<tempYear&&y2[0]==tempYear){
										middle_bak = tempYear+"/"+01+"/"+01;
									}
									if(y3[0]==tempYear&&y2[0]>tempYear){
										end = tempYear+"/"+12+"/"+31;
									}
									if(y3[0]>tempYear||y2[0]<tempYear)
										tb_2 = false;
									if(tb_2){
										newObj2 = {
												id:-1,
												real_plant_id:r.plant_id,
												from: middle_bak,
												to: end,
												customClass: color2,
												dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
												desc:"大棚:"+r.tunnel_name+"<br/>"+"作物:"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>采收开始:"+r.middle+"<br/>种植结束:"+r.end_time+"<br/>预估产量:"+tot+" KG</br>"+r.listStr,
												label: "预估产量"+tot+" KG"
											};
										array.unshift(newObj2);
									}
									if(tb_1||tb_2){
										var newObj = {tunnel_info_id:r.tunnel_info_id,
												id:r.tunnel_info_id,
												name: r.tunnel_name,
												desc: r.crop_area+"亩",
												plant_id:r.plant_id,
												values: array};
										scource = insert(scource, _inde, newObj);
										_inde = 0;
									}
								}
							}
							continue;
						}
						_inde = _inde;
						for(var j = 0;j<scource.length;j++){
							var g = scource[j];
							if(g.tunnel_info_id==r.tunnel_info_id){//大棚id相等
								var b_b = false;
								if(g.values.length>0){
									if(g.values[0].label=='休耕'){
										b_b = true;
									}
								}
								if((!g.plant_id||g.plant_id==null)&&!b_b){//不等于休耕,plant_id 等于空 //大棚没有种植,新记录插入到value中
									var start = r.start_time;
									start = start.replace("-","/").replace("-","/");
									var end = r.end_time;
									end = end.replace("-","/").replace("-","/");
									var middle = r.middle;
									middle = middle.replace("-","/").replace("-","/");
									var array = new Array();
									var tot = r.sumkg*r.crop_area;
									tot = tot.toFixed(2);
									if(new Date(start).getTime()>now_.getTime()&&r.plant_stauts==2){//判断是否是排产
										 color1 = "ganttGreen";
										 color2 = "ganttRed";
									}
									var newObj1, newObj2;
									if(r.floristics_type!=null&&r.floristics_type==2){//多年生
										array = ManayYear(array,r,start,end,tot);
										if(array.length>0){
											
											g.desc = r.crop_area+"亩";
											g.plant_id = r.plant_id;
											g.values = array;
											_obj = g;
											_inde = j;
										}
										break;
									}else{ 
										var y1 = start.split("/");
										var y2 = end.split("/");
										var y3 = middle.split("/");
										if(r.plant_id==0){//休耕
											color1 = "ganttyellow";
											if(y1[0]<tempYear&&y2[0]>tempYear){//显示时间不能超过当年
												start = tempYear+"/"+01+"/"+01;
												end = tempYear+"/"+12+"/"+31;
											}
											if(y1[0]<tempYear&&y2[0]==tempYear){
												start = tempYear+"/"+01+"/"+01;
											}
											if(y1[0]==tempYear&&y2[0]>tempYear){
												end = tempYear+"/"+12+"/"+31;
											}
											if(y1[0]>tempYear||y2[0]<tempYear)//开始结束都不在当年,跳过
												continue;
											newObj1 = {
													id:-1,
													real_plant_id:r.plant_id,
													from: start,
													to: end,
													customClass: color1,
													dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
													desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>休耕开始:"+r.start_time+"<br/>休耕结束:"+r.end_time+"<br/>",
													label: r.plant_name
												};
											array.unshift(newObj1);
											g.desc = r.crop_area+"亩";
											g.plant_id = r.plant_id;
											g.values = array;
											_obj = g;
											_inde = j;
											break;
										}else{//非休耕
											var tb_1 = true;
											var tb_2 = true;
											var middle_bak = middle;
											if(y1[0]<tempYear&&y3[0]>tempYear){
												start = tempYear+"/"+01+"/"+01;
												middle = tempYear+"/"+12+"/"+31;
											}
											if(y1[0]<tempYear&&y3[0]==tempYear){
												start = tempYear+"/"+01+"/"+01;
											}
											if(y1[0]==tempYear&&y3[0]>tempYear){
												middle = tempYear+"/"+12+"/"+31;
											}
											if(y1[0]>tempYear||y3[0]<tempYear)
												tb_1 = false;
											if(tb_1){
												newObj1 = {
														id:-1,
														real_plant_id:r.plant_id,
														from: start,
														to: middle,
														customClass: color1,
														dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
														desc:"大棚:"+r.tunnel_name+"<br/>"+"作物:"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>定植开始:"+r.start_time+"<br/>采收开始:"+r.middle+"<br/>预估产量:"+tot+" KG</br>"+r.listStr,
														label: r.plant_name+"种植"
													};
												array.unshift(newObj1);
											}
											y3 = middle_bak.split("/");
											if(y3[0]<tempYear&&y2[0]>tempYear){
												middle_bak = tempYear+"/"+01+"/"+01;
												end = tempYear+"/"+12+"/"+31;
											}
											if(y3[0]<tempYear&&y2[0]==tempYear){
												middle_bak = tempYear+"/"+01+"/"+01;
											}
											if(y3[0]==tempYear&&y2[0]>tempYear){
												end = tempYear+"/"+12+"/"+31;
											}
											if(y3[0]>tempYear||y2[0]<tempYear)
												tb_2 = false;
											if(tb_2){
												newObj2 = {
														id:-1,
														real_plant_id:r.plant_id,
														from: middle_bak,
														to: end,
														customClass: color2,
														dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
														desc:"大棚:"+r.tunnel_name+"<br/>"+"作物:"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>采收开始:"+r.middle+"<br/>种植结束:"+r.end_time+"<br/>预估产量:"+tot+" KG</br>"+r.listStr,
														label: "预估产量"+tot+" KG"
													};
												array.unshift(newObj2);
											}
											if(tb_1||tb_2){
												g.desc = r.crop_area+"亩";
												g.plant_id = r.plant_id;
												g.values = array;
												_obj = g;
												_inde = j;
												break;
											}else{
												continue;
											}
											
										}
										
									}
								}else if(g.plant_id==r.plant_id&& false){//种植id 相等  合并一个value 中
									var array = g.values;
									if(array==null)
										array = new Array();
									var start = r.start_time;
									start = start.replace("-","/").replace("-","/");
									var end = r.end_time;
									end = end.replace("-","/").replace("-","/");
									var middle = r.middle;
									middle = middle.replace("-","/").replace("-","/");
									var tot = r.sumkg*r.crop_area;
									tot = tot.toFixed(2);
									if(new Date(start).getTime()>now_.getTime()&&r.plant_stauts==2){
										 color1 = "ganttGreen";
										 color2 = "ganttRed";
									}
									var newObj1, newObj2;
									if(r.floristics_type!=null&&r.floristics_type==2){
										array = ManayYear(array,r,start,end,tot);
										if(array.length>0){
											g.values = array;
											_obj = g;
											_inde = j+1;
											
										}
										break;
									}else{
										var y1 = start.split("/");
										var y2 = end.split("/");
										var y3 = middle.split("/");
										if(r.plant_id==0){
											color1 = "ganttyellow";
											if(y1[0]<tempYear&&y2[0]>tempYear){
												start = tempYear+"/"+01+"/"+01;
												end = tempYear+"/"+12+"/"+31;
											}
											if(y1[0]<tempYear&&y2[0]==tempYear){
												start = tempYear+"/"+01+"/"+01;
											}
											if(y1[0]==tempYear&&y2[0]>tempYear){
												end = tempYear+"/"+12+"/"+31;
											}
											if(y1[0]>tempYear||y2[0]<tempYear)
												continue;
											newObj1 = {
													id:-1,
													real_plant_id:r.plant_id,
													from: start,
													to: end,
													customClass: color1,
													dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
													desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>休耕开始:"+r.start_time+"<br/>休耕结束:"+r.end_time+"<br/>",
													label: r.plant_name
												};
											array.unshift(newObj1);
											g.values = array;
											_obj = g;
											_inde = j+1;
											break;
										}else{
											var tb_1 = true;
											var tb_2 = true;
											var middle_bak = middle;
											if(y1[0]<tempYear&&y3[0]>tempYear){
												start = tempYear+"/"+01+"/"+01;
												middle = tempYear+"/"+12+"/"+31;
											}
											if(y1[0]<tempYear&&y3[0]==tempYear){
												start = tempYear+"/"+01+"/"+01;
											}
											if(y1[0]==tempYear&&y3[0]>tempYear){
												middle = tempYear+"/"+12+"/"+31;
											}
											if(y1[0]>tempYear||y3[0]<tempYear)
												tb_1 = false;
											
											y3 = middle_bak.split("/");
											if(y3[0]<tempYear&&y2[0]>tempYear){
												middle_bak = tempYear+"/"+01+"/"+01;
												end = tempYear+"/"+12+"/"+31;
											}
											if(y3[0]<tempYear&&y2[0]==tempYear){
												middle_bak = tempYear+"/"+01+"/"+01;
											}
											if(y3[0]==tempYear&&y2[0]>tempYear){
												end = tempYear+"/"+12+"/"+31;
											}
											if(y3[0]>tempYear||y2[0]<tempYear)
												tb_2 = false;
											if(tb_2){
												newObj1 = {
														id:-1,
														real_planti_d:r.plant_id,
														from: middle_bak,
														to: end,
														customClass: color2,
														dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
														desc:"大棚:"+r.tunnel_name+"<br/>"+"作物:"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>采收开始:"+r.middle+"<br/>种植结束:"+r.end_time+"<br/>预估产量:"+tot+" KG</br>"+r.listStr,
														label: "预估产量"+tot+" KG"
													};
												array.push(newObj1);
											}
											if(tb_1){
												newObj1 = {
														id:-1,
														real_planti_d:r.plant_id,
														from: start,
														to: middle,
														customClass: color1,
														dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
														desc:"大棚:"+r.tunnel_name+"<br/>"+"作物:"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>定植开始:"+r.start_time+"<br/>采收开始:"+r.middle+"<br/>预估产量:"+tot+" KG</br>"+r.listStr,
														label: r.plant_name+"种植"
													};
												array.push(newObj1);
											}
											if(tb_1||tb_2){
												g.values = array;
												_obj = g;
												_inde = j+1;
												break;
											}else{
												continue;
											}
										}
									}
								}else if(j==scource.length-1){//新建对象,另起一行
									var array = new Array();
									var start = r.start_time;
									start = start.replace("-","/").replace("-","/");
									var end = r.end_time;
									end = end.replace("-","/").replace("-","/");
									var middle = r.middle;
									middle = middle.replace("-","/").replace("-","/");
									var tot = r.sumkg*r.crop_area;
									tot = tot.toFixed(2);
									if(new Date(start).getTime()>now_.getTime()){
										 color1 = "ganttGreen";
										 color2 = "ganttRed";
									}
									var newObj1, newObj2;
									if(r.floristics_type!=null&&r.floristics_type==2){
										array = ManayYear(array,r,start,end,tot);
										if(array.length>0){
											
											var newObj = {tunnel_info_id:r.tunnel_info_id,
													id:r.tunnel_info_id,
													name: r.tunnel_name,
													desc: r.crop_area+"亩",
													plant_id:r.plant_id,
													values: array};
											scource = insert(scource, _inde+1, newObj);//插入到下表位置,紧跟上一个大棚
											_obj = g;
											_inde = j+1;
										}
										break;
									}else{
										var y1 = start.split("/");
										var y2 = end.split("/");
										var y3 = middle.split("/");
										if(r.plant_id==0){
											color1 = "ganttyellow";
											if(y1[0]<tempYear&&y2[0]>tempYear){
												start = tempYear+"/"+01+"/"+01;
												end = tempYear+"/"+12+"/"+31;
											}
											if(y1[0]<tempYear&&y2[0]==tempYear){
												start = tempYear+"/"+01+"/"+01;
											}
											if(y1[0]==tempYear&&y2[0]>tempYear){
												end = tempYear+"/"+12+"/"+31;
											}
											if(y1[0]>tempYear||y2[0]<tempYear)
												continue;
											newObj1 = {
													id:-1,
													real_plant_id:r.plant_id,
													from: start,
													to: end,
													customClass: color1,
													dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
													desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>休耕开始:"+r.start_time+"<br/>休耕结束:"+r.end_time+"<br/>",
													label: r.plant_name
												};
											array.unshift(newObj1);
											var newObj = {tunnel_info_id:r.tunnel_info_id,
													id:r.tunnel_info_id,
													name: r.tunnel_name,
													desc: r.crop_area+"亩",
													plant_id:r.plant_id,
													values: array};
											scource = insert(scource, _inde+1, newObj);
											_obj = g;
											_inde = j+1;
											break;
										}else{
											var tb_1 = true;
											var tb_2 = true;
											var middle_bak = middle;
											if(y1[0]<tempYear&&y3[0]>tempYear){
												start = tempYear+"/"+01+"/"+01;
												middle = tempYear+"/"+12+"/"+31;
											}
											if(y1[0]<tempYear&&y3[0]==tempYear){
												start = tempYear+"/"+01+"/"+01;
											}
											if(y1[0]==tempYear&&y3[0]>tempYear){
												middle = tempYear+"/"+12+"/"+31;
											}
											if(y1[0]>tempYear||y3[0]<tempYear)
												tb_1 = false;
											if(tb_1){
												newObj1 = {
														id:-1,
														real_planti_d:r.plant_id,
														from: start,
														to: middle,
														customClass: color1,
														dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
														desc:"大棚:"+r.tunnel_name+"<br/>"+"作物:"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>定植开始:"+r.start_time+"<br/>采收开始:"+r.middle+"<br/>预估产量:"+tot+" KG</br>"+r.listStr,
														label: r.plant_name+"种植"
													};
												array.unshift(newObj1);
											}
											y3 = middle_bak.split("/");
											if(y3[0]<tempYear&&y2[0]>tempYear){
												middle_bak = tempYear+"/"+01+"/"+01;
												end = tempYear+"/"+12+"/"+31;
											}
											if(y3[0]<tempYear&&y2[0]==tempYear){
												middle_bak = tempYear+"/"+01+"/"+01;
											}
											if(y3[0]==tempYear&&y2[0]>tempYear){
												end = tempYear+"/"+12+"/"+31;
											}
											if(y3[0]>tempYear||y2[0]<tempYear)
												tb_2 = false;
											if(tb_2){
												newObj2 = {
														id:-1,
														real_plant_id:r.plant_id,
														from: middle_bak,
														to: end,
														customClass: color2,
														dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
														desc:"大棚:"+r.tunnel_name+"<br/>"+"作物:"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>采收开始:"+r.middle+"<br/>种植结束:"+r.end_time+"<br/>预估产量:"+tot+" KG</br>"+r.listStr,
														label: "预估产量"+tot+" KG"
													};
												array.unshift(newObj2);
											}
											if(tb_1||tb_2){
												var newObj = {tunnel_info_id:r.tunnel_info_id,
														id:r.tunnel_info_id,
														name: r.tunnel_name,
														desc: r.crop_area+"亩",
														plant_id:r.plant_id,
														values: array};
												scource = insert(scource, _inde+1, newObj);//插入到下表位置,紧跟上一个大棚
												_obj = g;
												_inde = j+1;
												break;
											}else{
												continue;
											}
										}
									}
								}
								_inde = j+1;
								_obj = g;
							}else if(j==scource.length-1){//大棚id 和List中都不相等 
								var array = new Array(); 
								if(r.real_plant_id == null){
									var array = new Array();
									var newObj = {tunnel_info_id:r.tunnel_info_id,
											id:r.tunnel_info_id,
											name: r.tunnel_name,
											desc: r.mu_number+"亩",
											plant_id:0,
											values: array};
									scource.push(newObj);
									_inde = j+1;
									continue;
								}
									
								var start = r.start_time;
								start = start.replace("-","/").replace("-","/");
								var end = r.end_time;
								end = end.replace("-","/").replace("-","/");
								var middle = r.middle;
								middle = middle.replace("-","/").replace("-","/");
								var tot = r.sumkg*r.crop_area;
								tot = tot.toFixed(2);
								if(new Date(start).getTime()>now_.getTime()&&r.plant_stauts==2){
									 color1 = "ganttGreen";
									 color2 = "ganttRed";
								}
								var newObj1, newObj2;
								
								if(r.floristics_type!=null&&r.floristics_type==2){
									array = ManayYear(array,r,start,end,tot);
									if(array.length>0){
										var newObj = {tunnel_info_id:r.tunnel_info_id,
												id:r.tunnel_info_id,
												name: r.tunnel_name,
												desc: r.crop_area+"亩",
												plant_id:r.plant_id,
												values: array};
										scource = insert(scource, _inde+1, newObj);
										_obj = g;
										
									}
									break;
								}else{
									var y1 = start.split("/");
									var y2 = end.split("/");
									var y3 = middle.split("/");
									if(r.plant_id==0){
										color1 = "ganttyellow";
										if(y1[0]<tempYear&&y2[0]>tempYear){
											start = tempYear+"/"+01+"/"+01;
											end = tempYear+"/"+12+"/"+31;
										}
										if(y1[0]<tempYear&&y2[0]==tempYear){
											start = tempYear+"/"+01+"/"+01;
										}
										if(y1[0]==tempYear&&y2[0]>tempYear){
											end = tempYear+"/"+12+"/"+31;
										}
										if(y1[0]>tempYear||y2[0]<tempYear)
											continue;
										newObj1 = {
												id:-1,
												real_plant_id:r.plant_id,
												from: start,
												to: end,
												customClass: color1,
												dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
												desc:"大棚:"+r.tunnel_name+"<br/>"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>休耕开始:"+r.start_time+"<br/>休耕结束:"+r.end_time+"<br/>",
												label: r.plant_name
											};
										array.unshift(newObj1);
										var newObj = {tunnel_info_id:r.tunnel_info_id,
												id:r.tunnel_info_id,
												name: r.tunnel_name,
												desc: r.crop_area+"亩",
												plant_id:r.plant_id,
												values: array};
										scource = insert(scource, _inde+1, newObj);
										_obj = g;
										break;
									}else{
										var tb_1 = true;
										var tb_2 = true;
										var middle_bak = middle;
										if(y1[0]<tempYear&&y3[0]>tempYear){
											start = tempYear+"/"+01+"/"+01;
											middle = tempYear+"/"+12+"/"+31;
										}
										if(y1[0]<tempYear&&y3[0]==tempYear){
											start = tempYear+"/"+01+"/"+01;
										}
										if(y1[0]==tempYear&&y3[0]>tempYear){
											middle = tempYear+"/"+12+"/"+31;
										}
										if(y1[0]>tempYear||y3[0]<tempYear)
											tb_1 = false;
										if(tb_1){
											newObj1 = {
													id:-1,
													real_planti_d:r.plant_id,
													from: start,
													to: middle,
													customClass: color1,
													dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
													desc:"大棚:"+r.tunnel_name+"<br/>"+"作物:"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>定植开始:"+r.start_time+"<br/>采收开始:"+r.middle+"<br/>预估产量:"+tot+" KG</br>"+r.listStr,
													label: r.plant_name+"种植"
												};
											array.unshift(newObj1);
										}
										y3 = middle_bak.split("/");
										if(y3[0]<tempYear&&y2[0]>tempYear){
											middle_bak = tempYear+"/"+01+"/"+01;
											end = tempYear+"/"+12+"/"+31;
										}
										if(y3[0]<tempYear&&y2[0]==tempYear){
											middle_bak = tempYear+"/"+01+"/"+01;
										}
										if(y3[0]==tempYear&&y2[0]>tempYear){
											end = tempYear+"/"+12+"/"+31;
										}
										if(y3[0]>tempYear||y2[0]<tempYear)
											tb_2 = false;
										if(tb_2){
											newObj2 = {
													id:-1,
													real_plant_id:r.plant_id,
													from: middle_bak,
													to: end,
													customClass: color2,
													dataObj:{real_plant_id:r.real_plant_id,tunnel_info_id:r.tunnel_info_id},
													desc:"大棚:"+r.tunnel_name+"<br/>"+"作物:"+r.plant_name+"<br/>面积:"+r.crop_area+"亩<br/>采收开始:"+r.middle+"<br/>种植结束:"+r.end_time+"<br/>预估产量:"+tot+" KG</br>"+r.listStr,
													label: "预估产量"+tot+" KG"
												};
											array.unshift(newObj2);
										}
										if(tb_1||tb_2){
											var newObj = {tunnel_info_id:r.tunnel_info_id,
													id:r.tunnel_info_id,
													name: r.tunnel_name,
													desc: r.crop_area+"亩",
													plant_id:r.plant_id,
													values: array};
											scource = insert(scource, _inde+1, newObj);
											_obj = g;
											_inde = j+1;
											break;
										}else{
											continue;
										}
									}
								}
							}
						}
						if(i==realPlantJson.length-1){//大棚的第二个种植 前面不显示大棚名称
							for(var j = 0;j<scource.length;j++){
								var ganObj = scource[j];
								var temp_tunnel_name = "";
								if(tunnel_id != ganObj.tunnel_info_id){
									tunnel_id = ganObj.tunnel_info_id;
									temp_tunnel_name = ganObj.name;
								}
								ganObj.name=temp_tunnel_name;
							}
							
						}
					}
				}
			}
			
			
			function getValues(obj,array,tempYear){
				if(obj.id==0)
					return array;
				var year = obj.year_time;
				var value_time = obj.value_time-1;
				var value_ten_days = obj.value_ten_days;
				var nursery_time = obj.nursery_time-1;
				var nursery_ten_days = obj.nursery_ten_days;
				var plant_begin_time = obj.plant_begin_time-1;
				var plant_begin_ten_days = obj.plant_begin_ten_days;
				var plant_end_time = obj.plant_end_time-1;
				var plant_end_ten_days = obj.plant_end_ten_days;
				
				//var from1 = year+"/"+value_time+"/"+((value_ten_days-1)*10+1);
				var i1 = nursery_time<value_time;
				var y1 = (i1?year+1:year);
				//var end1 = y1+"/"+(nursery_ten_days==3?nursery_time+1:nursery_time)+"/"+((nursery_ten_days==3?0:(nursery_ten_days-1)*10+1));
				var from1 = new Date((nursery_time>value_time?year-1:year),nursery_time,((nursery_ten_days-1)*10+1));
				var end1 = new Date(year,(value_ten_days==3?value_time+1:value_time),((value_ten_days==3?0:(value_ten_days-1)*10+1)));
				var from2 = new Date(year,value_time,((value_ten_days-1)*10+1));
				//var from2 = y1+"/"+nursery_time+"/"+((nursery_ten_days-1)*10+1);
				var i2 = plant_begin_time<value_time;
				var y2 = i2?year+1:year;
				
				var end2 = new Date(y2,(plant_begin_ten_days==3?plant_begin_time+1:plant_begin_time),(plant_begin_ten_days==3?0:(plant_begin_ten_days-1)*10+1));
				var from3 = new Date(y2,plant_begin_time,((plant_begin_ten_days-1)*10+1));
				
				var i3 = plant_end_time<plant_begin_time;
				var y3 = i3?y2+1:y2;
				
				var end3 = new Date(y3,(plant_end_ten_days==3?plant_end_time+1:plant_end_time),(plant_end_ten_days==3?0:(plant_end_ten_days-1)*10+1));
				var y1 = from2.getFullYear();
				var y2 = end3.getFullYear();
				if(tempYear!=""){
					if(y1!=tempYear&&y2!=tempYear)
						return array;
				}
				//var end1 = new Date(year+"/"+(nursery_ten_days==3?nursery_time+1:nursery_time)+"/"+(nursery_ten_days==3?0:nursery_ten_days-1*10+1))
				/*var newObj1 = {
						id:obj.id,
						from: from1,
						to: end1,
						label: "育苗期",
						customClass: "ganttOrange"
					};*/
				var tot = obj.sumkg*obj.crop_area;
				tot = tot.toFixed(2);
					var newObj2 = {
							id:obj.id,
							from: from2,
							to: end2,
							label: obj.plant_name+"成长期",
							customClass: "ganttGreen",
							dataObj:{id:obj.id,tunnel_info_id:obj.tunnel_info_id},
							desc:"大棚:"+obj.tunnel_name+"<br/>作物:"+obj.plant_name+"<br/>面积:"+obj.crop_area+"<br/>开始时间:"+from2.getFullYear()+"-"+(from2.getMonth()+1)+"-"+from2.getDate()+"<br/>结束时间:"+end2.getFullYear()+"-"+(end2.getMonth()+1)+"-"+end2.getDate()+"<br/>预估产量:"+tot+" KG<br/>"+obj.listStr
						};
					var newObj3 = {
							id:obj.id,
							from: from3,
							to: end3,
							label: "计划产量"+tot+" KG",
							dataObj:{id:obj.id,tunnel_info_id:obj.tunnel_info_id},
							desc:"大棚:"+obj.tunnel_name+"<br/>作物:"+obj.plant_name+"<br/>面积:"+obj.crop_area+"<br/>开始时间:"+from3.getFullYear()+"-"+(from3.getMonth()+1)+"-"+from3.getDate()+"<br/>结束时间:"+end3.getFullYear()+"-"+(end3.getMonth()+1)+"-"+end3.getDate()+"<br/>预估产量:"+tot+" KG<br/>"+obj.listStr,
							customClass: "ganttRed"
						};
				if(array.length>0){
					var tempb1 = false;
					var tempb2 = false;
					for(var i = 0;i<array.length;i++){
						var temO = array[i];
						//if(temO.id==obj.id&&label== "育苗期"){
						//	array[i]==newObj1;
						//}
						if(temO.id==obj.id&&label== "成长期"){
							array[i]==newObj2;
							tempb1=true;
						}
						if(temO.id==obj.id&&label== "采收期"){
							array[i]==newObj3;
							tempb2=true;
						}
					}
					if(!tempb1){
						array.push(newObj2);
					}
					if(!tempb2){
						array.push(newObj3);
					}
				}else{
					//array.push(newObj1,newObj2,newObj3);
					array.push(newObj2,newObj3);
				}
				return array;
			}
			
			//删除大棚
			function delete_tunnel(obj){
				var b = confirm("确定要删除吗？");
				if(!b)
					return;
				if(obj==""){
					var val = _Q("#group_index").val();
					for(var i = 0;i<mark3Array.length;i++){
						var temp = mark3Array[i];
						if(temp._index==val){
							temp.setMap(null);
							if(!_Q("#rightPane").width()){
								_Q(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
								_Q('#rightPane').css("width","350px");
								_Q('#CenterAndRight').trigger('resize');
								_Q(".list1").hide();
								_Q(".tc_top_05").show();
								_Q(".erbox3").show();
							}else{
								_Q(".list1").hide();
								_Q(".tc_top_05").show();
								_Q(".erbox3").show();
							}
						}
					}
				}else{
					deleteTunnel(obj);
				}
			}
			
			//删除大棚,后台反馈.删除页面数据
			function delete_tunnel_next(str){
				var strs = str.split(":");
				if(strs[0]=="false"){
					alert(strs[1]);
				}else{
					var val = _Q("#group_index").val();
					for(var i = 0;i<mark3Array.length;i++){
						var temp = mark3Array[i];
						if(temp._index==val){
							temp.setMap(null);
							temp._usgs.setMap(null);
						}
					}
					var b = false;
					for(var i = 0;i<apsStr.length;i++){
						var temp = apsStr[i];
						if(temp.tunnel_info_id == strs[1]){
							apsStr = apsStr.del(i);
							b = true;
						}
					}
					for(var i = 0;i<allList.length;i++){
						var ob = allList[i];
						if(ob.tunnel_info_id==strs[1]){
							allList = allList.del(i);
							b = true;
						}
					}
					if(b){
						initList();
						innitGantt(gantVal);
						mygantt();
					}
					if(!_Q("#rightPane").width()){
						_Q(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
						_Q('#rightPane').css("width","350px");
						_Q('#CenterAndRight').trigger('resize');
						_Q(".list1").hide();
						_Q(".tc_top_05").show();
						_Q(".erbox3").show();
					}else{
						_Q(".list1").hide();
						_Q(".tc_top_05").show();
						_Q(".erbox3").show();
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
		
		document.onkeydown=function(event){ 
            e = event ? event :(window.event ? window.event : null); 
            if(e.keyCode==13){ 
                if(document.activeElement.id=="second_word"){
                	searchs();
                }else if(document.activeElement.id=="tc_top_input"){
                	searchApsBy();
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
        
        function deleteHisPlantSelf(id,obj,tunnelId){
        	_Q(obj).closest(".rteic").remove();
        	deleteHisPlant(id);
        	deletePlant_next(id,tunnelId);
        }
        
        function deleteHisPlant_next(data){
        	if(data.indexOf("+_+")>-1){
				var datas = data.split("+_+");
				eval('var tempp = '+datas[1]);
				lastStr[datas[0]]=tempp[datas[0]];
				var html0 = "";
		    	var arr_ = tempp[datas[0]];
		    	var tid = datas[0].replace("tunnel","");
		    	var rid = -1;
		    	if(arr_!=null){
				    for(var i = 0;i<arr_.length;i++){
				    	var obj = arr_[i];
				    	var tempsrc = obj.imground;
				    	if(tempsrc == "")
				    		tempsrc = nonesrc;
				    	html0+='<div class="rteic" onclick="editHisPlant('+obj.real_plant_id+')" style="height:80"><img  style="cursor:pointer" width="53" height="53" src="'+workpath+'/asset/images/image_b3.png" class="rtpic" />'+
	                '<img width="53" height="53" src="'+tempsrc+'" class="rtimg" /><div class="ritex">'+obj.breed_name+'<input type="hidden" value="'+obj.breed_id+'" class="obj_breed_id"></input><input type="hidden" value="'+obj.crop_area+'" class="obj_crop_area"></input></div>'+
	                '<div class="rtehov" style="display: none;">'+
	                '<a href="#3" onclick="editHisPlant('+obj.real_plant_id+')" style=" position: absolute; bottom:0; right:0; top:-2px; left:-2px; z-index:103; display:block;"><img width="56" height="58" src="'+workpath+'/asset/images/hover.png"></a>'+
	                '<a href="#2" onclick="deleteHisPlantSelf('+obj.real_plant_id+',this,'+tid+')" class="rholli"><img width="18" height="18" src="'+workpath+'/asset/images/clo_03.png"></a>'+
	                '</div></div>';
				    }
				    rid = obj.real_plant_id
		    	}
		    	html0 += '<div class="rteic" ><div class="imgBox"  style="cursor:pointer" onclick="addPlant(0)"><img src="'+workpath+'/asset/images/plus.png" style="padding-top:1px" /></div></div>';
			    html0+='<div class="clear"></div>';
			    _Q(".hislist").empty();
			    _Q(".hislist").append(html0);
			    
			    deletePlant_next(_Q("#plant_real_id").val(),_Q("#plant_tunnel_id").val());
			}
        	
        }
        
        
        function delete_plant_or(){
			var vid = _Q("#plant_real_id").val();
			if (vid == "") {
				plant_no();
				closeDoor();
			} else {
				var nowD = new Date();
				var nowD_ = new Date(nowD.getFullYear(),nowD.getMonth(),nowD.getDate());
				var t1 = _Q("#plant\\:plant_endInputDate").val();
				t1 = new Date(t1.replace("-","/").replace("-","/"));
				
				var type = 0;
				if(confirm('确定删除吗？')){
					type = 1;
					if(t1.getTime() <= nowD_.getTime()){
						deleteHisPlant(vid,type);
					}else{
						deletePlant(vid,type);
						deletePlant_next(vid,_Q("#plant_tunnel_id").val());
					}
					if(confirm('请确认是否删除相应的的农事管理中农事计划与记录')){
					   type=2;
					   deletePlantCheck_Two(vid);
					}else{
					   
					}
				}
				
				closeDoor();
				refreshGantt_before();
			}
        }
        
        
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
						allList[i] = tempobj;
					}
					initList();
					break;
				}
			}
			for(var i = 0;i<realPlantJson.length;i++){
				var rp = realPlantJson[i];
				if(rp.real_plant_id==id){
					realPlantJson = realPlantJson.del(i);
					innitGantt(searchName[tab_index]);
					mygantt2();
					break;
				}
			}
			
		}
		
		function deleteApsSelf(id,obj){
			_Q(obj).closest(".rteic").remove();
        	deleteAps(id);
        }
		
		function deleteAps_next(id){
			if(id==0)
				return;
			var tunnel_info_id;
			for(var i = 0;i<apsJson.length;i++){
				var tempObj = apsJson[i];
				if(tempObj.estId==id){
					apsJson = apsJson.del(i);
					tunnel_info_id = tempObj.tunnelId;						
					break;
				}
			}
			var count = 0; 
			for(var i =0 ;i<apsStr.length;i++){
				var temO = apsStr[i];
				if(temO.tunnel_info_id==tunnel_info_id){
					count+=1;
				}
			}
			for(var i = 0;i<apsStr.length;i++){
				var temO = apsStr[i];
				if(temO.id == id){
					if(count>1){
						apsStr = apsStr.del(i);
					}else{
						temO.crop_area = 0;
						temO.id = 0;
						temO.nursery_ten_days = 0;
						temO.nursery_time = 0;
						temO.plant_begin_ten_days = 0;
						temO.plant_begin_time = 0;
						temO.plant_end_ten_days = 0;
						temO.plant_end_time = 0;
						temO.plant_id = 0;
						temO.plant_name = "";
						temO.value_ten_days = 0;
						temO.value_time = 0;
						temO.year_time = 0;
						apsStr[i] = temO;
					}
					innitGantt(searchName[tab_index]);
					mygantt2();
					break;
				}
			}
		}
		
		//添加农户,表单清空
		function addFarmer(type){
			_Q(".list1").hide();
			_Q("#add_farmer").show();
			if(type==1){
				_Q(".addFarm").text("添加农户");
			}else if(type==2){
				_Q(".addFarm").text("添加种植管理员");
			}else if(type==3){
				_Q(".addFarm").text("添加饲养员");
			}else if(type==4){
				_Q(".addFarm").text("添加养殖负责人");
			}
			_Q("#farmer_base_id").val(_Q("#group_base_id").val());
			_Q("#farmer_type").val(type);
			_Q("#farmer_name").val("");
			_Q("#farmer_age").val("");
			_Q("#farmer_age2").val("");
			_Q("#farmer_phone").val("");
			_Q("#farmer_honor").val("");
		}
		
		//农户提交检测
		function checkFarmer(){
			var a = /^[1-9]+[0-9]*]*$/; //正整数
			if(_Q("#farmer_name").val()==""){
				alert("姓名不能为空!");
				return false;
			}
			if(!a.test(_Q("#farmer_age").val())){
				alert("年龄必须是正整数!");
				return false;
			}
			if(!a.test(_Q("#farmer_age2").val())){
				alert("从业年限必须是正整数!");
				return false;
			}
			return true;
		}
		
		//农户提交完成,更新页面
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
			_Q(".list1").hide();
			_Q("#divtittle").text("编辑区域");
			_Q("#tunnelInfo").show();
		}
		
		//取消农户编辑
		function farmer_no(event){
			_Q(".list1").hide();
			_Q("#divtittle").text("编辑区域");
			_Q("#tunnelInfo").show();
		}
		
		
		function addBreed(type){
			_Q("#divtittle").text("添加品种");
			_Q("#breed_name").val("");
			_Q("#breed_type").val(type);
			if(type==1){
				_Q("#breed_plant").val(_Q("#plant_plantId").val());
			}else{
				_Q("#breed_plant").val(_Q("#splant").val());
			}
			_Q("#breed_plant").selectpicker('refresh');
			_Q("#suitableCrops").val("");
			_Q("#suitableArea").val("");
			_Q(".list1").hide();
			_Q("#add_breed").show();
		}
		
		function checkBreed(){
			if(_Q("#breed_name").val()==""){
				alert("名称不能为空!");
				return false;
			}
			return true;
		}
		
		function breed_ok(data,event){
			if(data==1){
				_Q("#plant_plantId").trigger("onchange");
			}else{
				_Q("#splant").trigger("onchange");
			}
			_Q(".list1").hide();
			_Q("#realplant").show();
		}
		
		function breed_no(){
			_Q(".list1").hide();
			_Q("#realplant").show();
		}
		
		//多年生产量检测
		function begin_end2(c,a,b){
			if(!c||c==""){
				c = _Q("#xiumian").val();
			}
			if(!a||a==""){
				a = _Q("#csstart").val();
			}
			if(!b||b==""){
				b = _Q("#csend").val();
			}
			c1 = c.split("-");
		    a1 = a.split("-");
		    b1 = b.split("-");
		    
		    c = parseInt(c1[0],10);
			a = parseInt(a1[0],10);
			b = parseInt(b1[0],10);
			
			var arr = [];
			if(b>=a){
				for(var i = a ;i<=b;i++){
					arr.push(i);
				}
			}else if(b<a){
				for(var i = a ;i<=12;i++){
					arr.push(i);
				}
				for(var i = 1 ;i<=b;i++){
					arr.push(i);
				}
			}
			_Q(".plotsYield_table input").each(function(){
				for(var i = 0;i<arr.length;i++){
					if(arr[i]==_Q(this).attr("name").replace("month","")){
						break;
					}else if(i==arr.length-1){
						_Q(this).val("");
					}
				}
			});
		}
		
		//非多年生产量检测
		function begin_end(){
			var a = _Q("#plant\\:harvest_timeInputDate").val();
			if(arguments.length>0){
				a = arguments[0];
			}
		      var b = _Q("#plant\\:plant_endInputDate").val();
		      a = a.split("-")[1];
		      b = b.split("-")[1];
				a = parseInt(a,10);
				b = parseInt(b,10);
			var arr = [];
			if(b>=a){
				for(var i = a ;i<=b;i++){
					arr.push(i);
				}
			}else if(b<a){
				for(var i = a ;i<=12;i++){
					arr.push(i);
				}
				for(var i = 1 ;i<=b;i++){
					arr.push(i);
				}
			}
			_Q(".plotsYield_table input").each(function(){
				for(var i = 0;i<arr.length;i++){
					if(arr[i]==_Q(this).attr("name").replace("month","")){
						break;
					}else if(i==arr.length-1){
						_Q(this).val("");
					}
				}
			});
		}
		
		//Gantt年份切换
		function reset_gantt(ty){
			var year = document.getElementById("yearlic").innerHTML;
			if(ty==1){
				year = parseInt(year,10)-1;
			}else{
				year = parseInt(year,10)+1;
			}
			document.getElementById("yearlic").innerHTML = year;
			refreshGantt_before();
		}
		
		function selectTunnel (obj){
			_Q("#plant_tunnel_id").val(obj.value);
			_Q("#env_type").val(_Q(obj).find("option:selected").attr("aa"));
			_Q("#tunnel_area").val(_Q(obj).find("option:selected").attr("bb"));
			_Q("#plant_area").val(_Q(obj).find("option:selected").attr("bb"));
			_Q("#plantarea").html(_Q(obj).find("option:selected").attr("bb"));
			if(_Q(".rido1").attr("a")==1){
				if(document.getElementById("plant:plant_beginInputDate").value!=''){
					getModelByTime(_Q('#breed_new').val(),_Q('#allTunnel').val(),_Q('#plant\\:plant_beginInputDate').val(),_Q('#plant_standard').val(),_Q('#plant\\:plant_endInputDate').val(),_Q('#plant_real_id').val());
				}
			}else if(_Q(".rido1").attr("a")==2){
				getSchedulingPlant(_Q('#sbreed').val(),_Q('#planttime').val(),_Q('#plantten').val(),_Q('#allTunnel').val(),_Q('#sstandard').val(),_Q('#yearTime').val(),_Q('#scheduleId').val());
			}
		}
		
		//单击空白,弹出种植添加框
		function addGantt(){
			if(!isEdit)
				return;
			backindex = 2;
			_Q(".baseMap_ttl").css('background','url('+workpath+'/asset/images/baseIcojian1.png) no-repeat 10px 12px center').next('.baseMap_con').show();
			if(_Q(".splitbuttonV").attr("class")=="splitbuttonV"){
				_Q(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
				_Q('#rightPane').css('width',368);
				_Q('#CenterAndRight').trigger('resize');
			}
			_Q(".plotsYield_table input").val("");
			_Q(".plotsYield_table input").val("");
			plant_select.select2("trigger", "select", {
			    data:{id: "0",plantName:"休耕",plantId:"0",breedName:"无品种",type:"1"}
			});
			plant_select.prop("disabled", false);
			resetHightChart();
			_Q(".saveagain").hide();
			_Q("#firsttable").show();
			_Q("#secondtable").hide();
			_Q(".saveagain").unbind("click");
			_Q(".secondtable .btn-default").unbind("click");
			_Q(".modehide").hide();
			_Q(".modehidename_1").html("开始时间");
			_Q(".modehidename_2").html("结束时间");
			_Q(".yinian").show();
			_Q(".duonian").hide();
			_Q(".table_0").empty();
			_Q(".table_1").empty();
			_Q("#tunnel_none1").hide();
			_Q("#tunnel_none2").show();
			_Q("#plant\\:plant_beginInputDate").val("");
			_Q("#plant\\:plant_endInputDate").val("");
			_Q("#plant\\:harvest_timeInputDate").val("");
			_Q('.mapRtArea_btns02 .button_:eq(0)').trigger("click");
			_Q(".nav-tabs > li:eq(0)").addClass("active").siblings().removeClass("active");
			_Q("#prompt").text("");
			_Q("#typeHide").show();
			_Q("#edittype").val(1);
			_Q(".aps_typs_name").closest("li").hide();
			_Q("#typeHide").show();
			_Q("#aps_type")[0].selectedIndex = 1;
			_Q("#aps_type").selectpicker('refresh');
			_Q("#aps_type").trigger("onchange");
			_Q("#yield_type").val(2);
			_Q("#sarea").val("");
			_Q("#map_p").val("");
			_Q("#map_b").val("");
			_Q("#map_m").val("");
			_Q("#plant_real_id").val("");
			_Q("#scheduleId").val("");
			_Q("#xplant").val("");
			_Q("#xbreed").val("");
			_Q("#xstandard").val("");
			_Q("#xyear").val("");
			_Q("#xmonth").val("");
			_Q("#xdays").val("");
			_Q("#xmodel").val("");
			_Q("#real_plant_name").val("");
			var html = _Q("#plant_plantId").html();
			_Q("#plant_plantId").empty();
			_Q("#plant_plantId").append(html);
			_Q("#plant_plantId")[0].selectedIndex = 0;
			_Q("#plant_plantId").selectpicker('refresh');
			_Q("#plant_plantId").trigger("onchange");
			_Q('.mapRtArea_btns02 .button_:eq(0)').trigger("click");
		    //getSchedulingPlant(_Q('#sbreed').val(),_Q('#planttime').val(),_Q('#plantten').val(),_Q('#plant_tunnel_id').val(),_Q('#sstandard').val(),_Q("#yearTime").val(),_Q('#scheduleId').val());
		    _Q("#ymstart").val("");
			_Q("#ymend").val("");
			_Q("#zzend").val("");
			_Q("#xiumian").val("");
			_Q("#csstart").val("");
			_Q("#csend").val("");
		    var html = _Q("#allTunnel").html();
			_Q("#allTunnel").empty().append(html);
			_Q("#allTunnel")[0].selectedIndex = 0;
			_Q("#allTunnel").trigger("onchange");
			_Q("#allTunnel").selectpicker('refresh');
			//var allarea = parseFloat(_Q("#tunnel_area").val())-parseFloat(zhongarea);
			//_Q("#sarea").val(_Q("#tunnel_area").val());
			//_Q("#splantarea").text(_Q("#tunnel_area").val());
			//_Q("#plant_area").val(allarea.toFixed(2));
			//_Q("#plantarea").text(allarea.toFixed(2));
			_Q("#sproutSel")[0].selectedIndex = 0;
			_Q("#sproutSel").selectpicker('refresh');
			_Q("#purchaseSource").val("");
			_Q("#purchaseSourceDiv").hide();
			
			_Q("#rightPane .hsplitbar").hide();
			_Q("#rbPane").hide();
			_Q('#rbPane').css("height","0px");
			_Q('#rightPane').trigger('resize');
			_Q(".list1").hide();
			_Q("#realplant").show();
			_Q(".divtittle_2").text("编辑种植信息");
			_Q("#divFloatToolsView_").animate({width: window.screen.width/4+17},800,function(){			});
			_Q(".tc_top_03").show();
			_Q(".table_0").empty();
			_Q(".table_1").empty();
			_Q(".TTTTT").addClass("tc_cont").removeClass("TTTTT");
		}
		
		//修改选中数据
		function editGantt(obj){
			if(!isEdit)
				return;
			backindex = 2;
			_Q("#tunnel_none1").show();
			_Q("#tunnel_none2").hide();
			editPlant(obj.real_plant_id);
			if(_Q(".splitbuttonV").attr("class")=="splitbuttonV"){
				_Q(".splitbuttonV").removeClass().addClass("splitbuttonV invert");
				_Q('#rightPane').css('width',368);
				_Q('#CenterAndRight').trigger('resize');
			}
			_Q("#rightPane .hsplitbar").hide();
			_Q("#rbPane").hide();
			_Q('#rbPane').css("height","0px");
			_Q('#rightPane').trigger('resize');
		}
		
		//产量的图表
		function resetHightChart(){
			var x = new Array();
			var y = new Array();
			var ind =0 ;
			var total = 0;
		  	var b,e;
		  	if(plant_select.find(":selected").data().data.type=="2"){
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
			b = parseInt(b,10);
			e = parseInt(e,10);
			for(var i = b;i<=12;i++){
				if(_Q("#month"+i).val()!=""){
					y.push(parseFloat(_Q("#month"+i).val()));
					x.push(i+"月");
					total += parseFloat(_Q("#month"+i).val());
					ind++;
				}
			}
			if(e<b)
			for(var i = 1;i<=e;i++){
				if(_Q("#month"+i).val()!=""){
					y.push(parseFloat(_Q("#month"+i).val()));
					x.push(i+"月");
					total += parseFloat(_Q("#month"+i).val());
					ind++;
				}
			}
			if(ind>0){
				_Q("#highChart").show();
				_Q(".baseZongji").show();
				total = total.toFixed(2);
				_Q(".baseZongji span").html(total+"kg");
			}else{
				_Q("#highChart").hide();
				_Q(".baseZongji").hide();
			}
			 _Q('#perMuYield').highcharts({
			        title: {
			            text: '',
			            x: -20 //center
			        },
			        subtitle: {
			            text: '',
			            x: -20
			        },
			        xAxis: {
			            categories:x,
			            min:0
			        },
			        yAxis: {
			        	 min:0,
			            title: {
			                text: ''
			            },
			            plotLines: [{
			                value: 0,
			                width: 1,
			                color: '#808080'
			            }]
			        },
			        tooltip: {
			            valueSuffix: 'Kg',
			            pointFormat:'{point.key}<br/>产量:{point.y}'
			        },
			        legend: {
			            layout: 'vertical',
			            align: 'right',
			            verticalAlign: 'middle',
						x: 100,
						y: 100,
			            borderWidth: 0
			        },
			        series: [{
			            name: '产量',
			            data: y
			        }]
			    });
		}
		
		//土地检测记录跳转
		function jumpToPartition() {
			window.open(workpath + "/map/PartitionInfo.seam?tnnelId="
					+ _Q("#group_id").val() + "&partId=" + _Q("#group_parent_id").val()
					+ "&baseId=" + _Q("#group_base_id").val());
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
		
		function refreshGantt_before(){
            var year = _Q("#yearlic").html();
            var plantId = plantStr==null?"":plantStr.toString();
            var nowPlantId = _Q(".pcic a[lj=bj]").attr("aa");
            if(nowPlantId){
            	if(plantId=="")
            		plantId = nowPlantId;
            	else
            		plantId += ","+nowPlantId;
            }
            	
            var tunnelText = _Q("#searchTunnelText").val();
            if(tunnelText == "请输入区域名称")
           	 tunnelText  = "";
            var pageNum = nowpage;
            var max = pageSize;
            refreshGantt(year,plantId,tunnelText,pageNum,max);
        }
        function refreshGantt_next(data){
       	var strs = data.split("+!_+");
       	eval("realPlantJson = "+strs[0]);
       	totalSize = parseInt(strs[1],10);
      	 	innitGantt("");
			mygantt();
        }
        
        function next_page(max){
       	 nowpage = nowpage+1;
       	 if(nowpage>=max){
       		 nowpage = max;
       		 return;
       	 }
       	refreshGantt_before();
       	 
        }
        
        function prev_page(){
       	 nowpage = nowpage-1;
       	 if(nowpage<0){
       		nowpage = 0;
       		return;
       	 }
       		
     	refreshGantt_before();
        }
        
        function  objFocus(obj){
	  		if(obj.value=="请输入区域名称"){
	  				obj.value="";
	  		}
	  		
	   } 
	   function objBlur(obj){
	  	   if(obj.value==""){
	  			obj.value="请输入区域名称";
	  		}
	   }
   //]]>
 
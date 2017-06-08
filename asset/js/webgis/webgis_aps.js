	/**
	 * 数组类 补充删除方法
	 * @param n
	 * @returns
	 */
	Array.prototype.del = function(n) {
		if (n < 0)
			return this;
		else
			return this.slice(0, n).concat(this.slice(n + 1, this.length));
	};
	var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	/**
	 * 输出RGB格式染色(0,0,0)
	 * @returns {String}
	 */
	String.prototype.colorRgb = function(){
		var sColor = this.toLowerCase();
			if(sColor && reg.test(sColor)){
				if(sColor.length === 4){
					var sColorNew = "#";
					for(var i=1; i<4; i+=1){
						sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
					}
					sColor = sColorNew;
				}
				//处理六位的颜色值
				var sColorChange = [];
				for(var i=1; i<7; i+=2){
					sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
				}
				return "" + sColorChange.join(",");
			}else{
				return sColor;
			}
		};
		
	/**
	 * RGB颜色转换为16进制
	 */
	String.prototype.colorHex = function(){
		var that = this;
		if(/^(rgba|rgb|RGB)/.test(that)){
			var aColor = that.replace(/(?:\(|\)|rgba|rgb|RGB)*/g,"").split(",");
			var strHex = "#";
			//for(var i=0; i<aColor.length; i++){
			for(var i=0; i<3; i++){
				var hex = Number(aColor[i]).toString(16);
				if(hex === "0"){
					hex += hex; 
				}
				strHex += hex;
			}
			if(strHex.length !== 7){
				strHex = that;  
			}
			return strHex;
		}else if(reg.test(that)){
			var aNum = that.replace(/#/,"").split("");
			if(aNum.length === 6){
				return that;    
			}else if(aNum.length === 3){
				var numHex = "#";
				for(var i=0; i<aNum.length; i+=1){
					numHex += (aNum[i]+aNum[i]);
				}
				return numHex;
			}
		}else{
			return that;    
		}
	};

	/**
	 * 打开Ajax遮罩提示
	 */
	function showTips(){
		$('#login').show();
	}
		
	/**
	 * 关闭Ajax遮罩提示
	 */
	function hideTips(){
		$('#login').hide();
	}

	/**
	 * 输出日志
	 */
	function log(str){
		if(console){
			console.log(str);
		}
	}
	
	/**
	 * 日期格式化
	 * @param format
	 * @returns string
	 */
	Date.prototype.format = function(format)
	{
		var o = {
		"M+" : this.getMonth()+1, //month
		"d+" : this.getDate(),    //day
		"h+" : this.getHours(),   //hour
	 	"m+" : this.getMinutes(), //minute
		"s+" : this.getSeconds(), //second
	 	"q+" : Math.floor((this.getMonth()+3)/3),  //quarter
	 	"S" : this.getMilliseconds() //millisecond
		}

		if(/(y+)/.test(format)) 
		{
			format=format.replace(RegExp.$1,(this.getFullYear()+"").substr(4 - RegExp.$1.length));
		}
		
	 	for(var k in o)
		{
			if(new RegExp("("+ k +")").test(format))
			{
	 			format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
			}
		}
		return format;
	}

	
	/**
	 * 四舍五入
	 */
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
	
	/**
	 * 定义wgs84 坐标系
	 */
	var wgs84Sphere = new ol.Sphere(6378137);
	
	/**
     * 计算ol.geom.Polygon的面积 (亩)
     * @param {ol.geom.Polygon} polygon The polygon.
     * @return {string} Formatted area.
     */
    var formatArea = function(polygon) {
		var area;
		var sourceProj = omap.getView().getProjection();
		var geom = (polygon.clone().transform(sourceProj, 'EPSG:4326'));
		var coordinates = geom.getLinearRing(0).getCoordinates();
		area = Math.abs(wgs84Sphere.geodesicArea(coordinates));
		var m2 = (Math.round(area * 100) / 100);
		var mu = m2*0.0015;
		mu = CurrencyFormatted(mu);
		return mu;
    };
		
	/**
	 * 通过正则获取url参数
	 * @param name
	 * @returns
	 */
	function GetQueryString(name){
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  unescape(r[2]); return null;
	}
	/**
	 * 通过正则获取url中文参数
	 * @param name
	 * @returns
	 */
	function GetQueryStringCH(name){
	     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	     var r = window.location.search.substr(1).match(reg);
	     if(r!=null)return  decodeURI(r[2]); return null;
	}
	/**
	 * 点击右侧中间按钮打开右侧弹出框
	 */
	function operateDoor(){
		if($("#rightPane").width() == 0){//判断右侧弹框的宽度
	    	$(".rightNo").hide();
	    	$(".rightNo0").show();
	    	$("#divtittle").html("资源列表");
			openDoor();
		}else{
			closeDoor();
		}
	}
	
	var atlasManager = new ol.style.AtlasManager({
		  initialSize: 512
		});
	
	/**
	 * 弹框是否是展开的
	 */
	var isOpened = false;
	
	/**
	 * 获取定位之后显示在地图上的圆点图片
	 */
    var locationSrc = "/asset/images/locationimg.png";
	/**
	 * 定义后续使用的样式
	 */
	var styles = {
			/**
			 * 位置图标
			 */
			location :  new ol.style.Style({
				image: new ol.style.Icon(({
					src: locationSrc
				}))
	        }),
			/**
			 * 基地的图标
			 */
			marker : new ol.style.Style({
				image: new ol.style.Icon( ({
					anchor: [0.5, 46], //数组1 分数0-1范围 左=0,右=1 ,数组2 从上到下上=0,下=1 当前用的像素单位
					anchorXUnits: 'fraction', //分数
					anchorYUnits: 'pixels',//像素
					src: '/asset/images/zb.png'
				})),
			}),
			/**
		     * 传感器的样式
		     */
		    deviceStyle : new ol.style.Style({
		    	image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
		    		anchor: [0.6, 0.5],
		    		anchorXUnits: 'fraction',
		    		anchorYUnits: 'fraction',
		    		src: "/asset/images/vidicon2.png",
		    		rotateWithView : true
		    	})),
		    	zIndex : DEVICE_Z
		    }),
		    /**
		     * 气象站的样式
		     */
		    weatherStationStyle : new ol.style.Style({
		    	image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
		    		anchor: [0.5, 0.5],
		    		anchorXUnits: 'fraction',
		    		anchorYUnits: 'fraction',
		    		src: "/asset/images/vidicon4.png",
		    		rotateWithView : true
		    	})),
		    	zIndex : DEVICE_Z
		    }),
		    /**
		     * 摄像头的样式
		     */
		    videoStyle : new ol.style.Style({
		    	image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
		    		anchor: [0.5, 0.5],
		    		anchorXUnits: 'fraction',
		    		anchorYUnits: 'fraction',
		    		src: "/asset/images/vidicon3.png",
		    		rotateWithView : true
		    	})),
		    	zIndex : VIDEO_Z
		    }),
		    /**
		     * 全景图的样式
		     */
		    krpanoStyle : new ol.style.Style({
		    	image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
		    		anchor: [0.5, 0.5],
		    		anchorXUnits: 'fraction',
		    		anchorYUnits: 'fraction',
		    		src: "/asset/images/krpanoimg2.png",
		    		rotateWithView : true
		    	})),
		    	zIndex : KRPANO_Z
		    })
	}
		   
	/**
	 * 定位当前信息元素
	 */
    var locationMarker = new ol.Feature({
    	id:"locationMarker"
      });;
    /**
     * 定位时图片的,图片的样式切换;
     */
    var geo_blue = "/asset/images/geo_blue.png";
    var geo_gray = "/asset/images/geo_gray.png";
	/**
	 * 基地文字描述的字体大小  区分层级 第0位无用
	 */
	var baseFontSizes = [21,19,20,21,22,23,24];
	/**
	 * 分区文字描述的字体大小  区分层级 第0位无用
	 */
	var partitionsFontsSizes = [[11,16,23,45,50],[10,15,22,44,49],[11,16,23,45,50],[12,17,24,46,51],[13,18,25,47,52],[14,19,26,48,53],[15,20,27,49,54]];
	/**
	 * 地块文字描述的字体大小  区分层级 第0位无用
	 */
	var tunnelFontsSizes = [[10,12,18],[9,11,17],[10,12,18],[11,13,19],[12,14,20],[13,15,21],[14,16,22]];
	/**
	 * 规划地块时,对应的默认颜色
	 */
	var defaultColor = ["","#e36b77","#68b678","#3e87b4","#90b9d9","#738949","#ca954f","#0071db","#80c269"];
	/**
	 * 地块中心图片 
	 * 无种植或者种植的单一品种无图片
	 */
	var nonesrc = "/asset/images/wt.png";
	/**
	 * 地块中心图片
	 * 多个作物
	 */
	var moresrc = "/asset/images/dt.png";
	/**
	 * 地块中心图片
	 * 添加种植的图片
	 */
	var addsrc = "/asset/images/add_y.png";
	/**
	 * 地块中心图片
	 * 多个养殖
	 */
	var moreanimal = "/asset/images/more_animal.png";
	/**
	 * 地块中心图片
	 * 无养殖,或者养殖动物无图片
	 */
	var animalsrc = "/asset/images/animal_3.png";
	/**
	 * 地块中心图片
	 * 添加养殖
	 */
	var addanimalsrc = "/asset/images/animal_4.png";
	/**
	 * 地块中心图片
	 * 多年生和单年生同时种植
	 */
	var oneimg = "http://img3.farmeasy.cn/00000000/map/2017215/oneimg.png@60h_60w|60-1ci.png";
	/**
	 * 地块中心图片
	 * 只种多年生
	 */
	var twoimg = "http://img3.farmeasy.cn/00000000/map/2017215/twoimg.png@60h_60w|60-1ci.png";
	/**
	 * 地块中心图片
	 * 透明阴影图,oss遮罩使用,
	 * 种植计划
	 */
	var touming = "http://img3.farmeasy.cn/00000000/map/2017215/touming.png";
	/**
	 * 初始化人员数组
	 * 规划地块时选择
	 */
	var farmerList = new Array();
	/**
	 * 初始化地块分组数组
	 * 规划地块时选择
	 */
	var groupList = new Array();
	/**
	 * 人员选项缺省配置
	 */
    var defaultfarmer = "<option value='0'>暂无负责人员</option>";
    /**
	 * 分组选项缺省配置
	 */
    var defaultgroup = "<option value='0'>暂未分组</option>";
    /**
	 * 其他选项缺省配置
	 */
    var noneOption = "<option value='0'>暂无数据</option>";
    /**
     * 航拍视频分组
     */
    var aerialGroupId = "";
    /**
     * 获取日期
     */
    var nowD = new Date();
    var nowD_ = new Date(nowD.getFullYear(), nowD.getMonth(), nowD.getDate());
    /**
     * 编辑地块时,头部的跳转链接
     */
    var tunnelTitle = "";
    /**
     * 上次编辑的地块名称
     */
    var backname = "";
    /**
     * 地图初始化时默认层级
     */
	var defaultZoom = 15;
	/**
	 * 右侧弹出框默认宽度
	 */
	var doorWidth = 368;	
	/**
	 * 分区集合 key=id value=地块array
	 */
	var map1 = new Map();
	/**
	 * 分区名称集合 key=id value=name
	 */
	var map2 = new Map();
	/**
	 * 基地和分区是否已经加载完毕 默认false
	 */
	var isFirstOK = 0;
	/**
	 * 分区id 集合
	 */
	var pidArray;
	/**
	 * 地块数据
	 */
	var tunnelJson = {};
	/**
	 * 土地数据
	 */
	var landData = {};
	
	/**
	 * 各组件的起始下标
	 */
	var MARKER__INDEX = 0;	
	var BASE__INDEX = 0;	
	var PARTITIONS__INDEX = 0;	
	var TUNNEL_INDEX = 0;	
	var DEVICE_INDEX = 0;	
	var VIDEO_INDEX = 0;	
	var KRPANO_INDEX = 0;	
	var WEATHER_STATION_INDEX = 0;
	var VIDEO_INDEX = 0;
	var BASE_TEXT_INDEX = 0;
	var PARTITION_TEXT_INDEX = 0;
	var TUNNEL_INFO_TEXT_INDEX = 0;
	var KRPANO_TEXT_INDEX = 0;
	
	/**
	 * 各组件的默认层级  基地<分区<地块<文字<地块中心圆图<设备组件<基地图标
	 */
	var MARKER_Z = 1200;
	var BASE_Z = 500;
	var PARTITIONS_Z = 610;
	var TUNNEL_Z = 720;
	var TUNNEL_CENTER_Z = 750;
	var DEVICE_Z = 1000;
	var WEATHER_STATION_Z = 1000;
	var KRPANO_Z = 1000;
	var VIDEO_Z = 1000;
	var SOURCE_Z = 1200;
	var BASE_TEXT_Z = 730;
	var PARTITION_TEXT_Z = 731;
	var TUNNEL_INFO_TEXT_Z = 732;
	var KRPANO_TEXT_Z = 733;
	
	/**
	 * 区分各组件的类型
	 */
	var MARKER = 1;
	var BASE = 2;
	var PARTITIONS = 3;
	var TUNNELINFO = 4;
	var DEVICE = 5;
	var WEATHER_STATION = 6;
	var VIDEO = 7;
	var KRPANO = 8;
	var BASE_TEXT = 9;
	var PARTITION_TEXT = 10;
	var TUNNEL_INFO_TEXT = 11;
	var KRPANO_TEXT=12;
	var TUNNEL_INFO_CENTER = 13;
	
	/**
	 * 全局使用的参数
	 * 基地id
	 */
	var base_id = GetQueryString("base_id");	
	/**
	 * 全局使用参数
	 * 企业id
	 */
	var enter_id = GetQueryString("enter_id");	//企业id
	/**
	 * 编辑全景图时使用的对象
	 */
	var targetKrpano = null;
	/**
	 * 编辑设备等的对象
	 */
	var moveTarget = null;
	/**
	 * 记录设备等的位置
	 * 取消的编辑,位置还原
	 */
	var backCoordinate = null;
	/**
	 * google 地图
	 */
	var gmap;
	/**
	 * OL 地图
	 */
	var omap;
	/**
	 * 定位图层
	 */
	var locationSource = new ol.source.Vector();
	var locationVector = new ol.layer.Vector({
	      source: locationSource,
    });
	/**
	 * 基地中心点矢量图层
	 */
	var markerSource = new ol.source.Vector();
	var markerVector = new ol.layer.Vector({
	      source: markerSource,
    });
	/**
	 * 基地polygon矢量图层
	 */
	var baseSource = new ol.source.Vector();	
	var baseVector = new ol.layer.Vector({		
	      source: baseSource,
    });
	/**
	 * 分区矢量图层
	 */
	var partitionsSource = new ol.source.Vector();	
	var partitionsVector = new ol.layer.Vector({	
	      source: partitionsSource
    });
	/**
	 * 地块矢量图层
	 */
	var tunnelInfoSource = new ol.source.Vector();
	var tunnelInfoVector = new ol.layer.Vector({	
	      source: tunnelInfoSource
    });
	/**
	 * 地图中心圆图矢量图层
	 */
	var tunnelCenterPointSource = new ol.source.Vector();
	var tunnelCenterPointVector = new ol.layer.Vector({
	      source: tunnelCenterPointSource
    });
	/**
	 * 传感器和气象站矢量图层
	 */
	var deviceSource = new ol.source.Vector();
	var	deviceVector = new ol.layer.Vector({	
	      source: deviceSource
    });
	/**
	 * 摄像头矢量图层
	 */
	var videoSource = new ol.source.Vector();
	var	videoVector = new ol.layer.Vector({
	      source: videoSource
    });
	/**
	 * 四季田景矢量图层
	 */
	var krpanoSource = new ol.source.Vector();
	var	krpanoVector = new ol.layer.Vector({
	      source: krpanoSource
    });
	
	/**
	 * 基地文字矢量图层和样式
	 */
	var baseTextStyleCache = {};//基地文字样式集合
	var baseTextColor = GetQueryString("baseFontColor");
	baseTextColor = baseTextColor == null ? '#fff' : baseTextColor;//获取默认基地文字颜色
	var baseTextSize = GetQueryString("baseFontSize");
	baseTextSize = baseTextSize == null ? "20px 宋体" : baseFontSizes[parseInt(baseTextSize)]+"px 宋体";//获取基地文字大小
	var baseTextSource = new ol.source.Vector();	//分区图层
	var	baseTextVector = new ol.layer.Vector({	//分区集合
	      source: baseTextSource,
	      style: function (feature){
	    	  var name = feature.get("name_");
	    	  name = name == null ? "" : name;
	    	  var style = baseTextStyleCache[name];
	          if (!style) {//查不到已有的样式,new一个新的
	        	  style = new ol.style.Style({
		              text: new ol.style.Text({
		            	  font: baseTextSize,//10px sans-serif' 默认这个字体，格式和css的字体设置一样
		            	  text: name,
		            	  fill: new ol.style.Fill({//颜色
		            		  color: baseTextColor
		            	  }),
		            	  offsetY:5//偏移量
		              })
	        	  });
	        	  baseTextStyleCache[name] = style;//存到样式集合中
	          }
	          return style;
	      }
    });
	
	/**
	 * 分区文字矢量图层和样式
	 */
	var partitionTextStyleCache = {};
	var partitionTextColor = GetQueryString("partitionFontColor");
	partitionTextColor = partitionTextColor == null ? '#fff' : partitionTextColor;
	var partitionTextSize = GetQueryString("partitionFontSize");
	var partFS = partitionTextSize == null ? partitionsFontsSizes[0] : partitionsFontsSizes[parseInt(partitionTextSize)];
	partitionTextSize = partFS[0]+"px 宋体";
	var partitionTextSource = new ol.source.Vector();	
	var	partitionTextVector = new ol.layer.Vector({
	      source: partitionTextSource,
	      style: function (feature){
	    	  var name = feature.get("name_");
	    	  name = name == null ? "" : name;
	    	  var style = partitionTextStyleCache[name];
	          if (!style) {
	        	  style = new ol.style.Style({
		              text: new ol.style.Text({
		            	  font: partitionTextSize,
		            	  text: name,
		            	  fill: new ol.style.Fill({
		            		  color: partitionTextColor
		            	  })
		            	  //,offsetY:5
		              })
	        	  });
	        	  partitionTextStyleCache[name] = style;
	          }
	          return style;
	      }
    });
	
	/**
	 * 地块文字矢量图层和样式
	 */
	var tunnelInfoTextStyleCache = {};
	var tunnelInfoTextColor = GetQueryString("tunnelInfoFontColor");
	tunnelInfoTextColor = tunnelInfoTextColor == null ? '#fff' : tunnelInfoTextColor;
	var tunnelInfoTextSize = GetQueryString("tunnelInfoFontSize");
	var tunnelFS = tunnelInfoTextSize == null ? tunnelFontsSizes[0] : tunnelFontsSizes[parseInt(tunnelInfoTextSize)];
	tunnelInfoTextSize = tunnelFS[0]+"px 宋体";
	var tunnelInfoTextSource = new ol.source.Vector();	
	var	tunnelInfoTextVector = new ol.layer.Vector({	
	      source: tunnelInfoTextSource,
	      style: function (feature){
	    	  var name = feature.get("name_");
	    	  name = name == null ? "" : name;
	    	  var style = tunnelInfoTextStyleCache[name];
	          if (!style) {
	        	  style = new ol.style.Style({
		              text: new ol.style.Text({
		            	  font: tunnelInfoTextSize,
		            	  text: name,
		            	  fill: new ol.style.Fill({
		            		  color: tunnelInfoTextColor
		            	  })
		            	  ,offsetY:15
		              })
	        	  });
	        	  tunnelInfoTextStyleCache[name] = style;
	          }
	          return style;
	      }
    });
	
	/**
	 * 全景文字描述 矢量图层及样式
	 */
	var krpanoTextStyleCache = {};
	var krpanoTextSource = new ol.source.Vector();	
	var	krpanoTextVector = new ol.layer.Vector({	
	      source: krpanoTextSource,
	      style: function (feature){
	    	  var name = feature.get("name_");
	    	  name = name == null ? "" : name;
	    	  var style = krpanoTextStyleCache[name];
	          if (!style) {
	        	  style = new ol.style.Style({
		              text: new ol.style.Text({
		            	  font: "12px 宋体",
		            	  text: name,
		            	  fill: new ol.style.Fill({
		            		  color: "#fff"
		            	  })
		            	  ,offsetY:15
		              })
	        	  });
	        	  krpanoTextStyleCache[name] = style;
	          }
	          return style;
	      }
    });
		
	/**
	 * 初始化双击选中Feature时间
	 */
	var doubleClickSelect = new ol.interaction.Select({
		condition:ol.events.condition.doubleClick,
		filter:function(feature){
			if(feature.get("ftype") == TUNNELINFO)
				return true;
			else
				return false;
		}
	  });
	
	/**
	 * 输出坐标的方法
	 */
	var writer = new ol.format.GeoJSON();
	
	/**
	 * 基地信息展示框
	 */
	var markerPopup;
	/**
	 * 设备信息展示框
	 */
	var devicePopup;
	
	/**
	 * 弹出框
	 */
	var container = document.getElementById('popup');
    var content = document.getElementById('popup-content');
    var closer = document.getElementById('popup-closer');
    var popupOverlay ;
    $(closer).click(function(event) {
        try{
        	event.stopPropagation();
        	event.preventDefault();
        }catch(e){}
        popupOverlay.setPosition(undefined);
        closer.blur();
        omap.dispatchEvent("mouseup");
        try{omap.removeEventListener(ol.events.condition.singleClick);}catch(e){}
        setTimeout(function(event){
        	singleClickEvent = omap.on('singleclick', function(evt){mapClick(evt)});
        },300)
      });
	/**
	 * 打开弹出框
	 */
	function openDoor(){
		isOpened = true;
		//omap.removeInteraction(doubleClickSelect) //OL地图删除双击事件
		var clientWidth = document.body.clientWidth;
		var split = $('#foo').split();
		split.position(clientWidth-doorWidth);//打开弹出框
		setTimeout(function(){omap.updateSize()}, 10);
		google.maps.event.trigger(gmap, "resize");//触发地图resize方法,否则google map 和ol map 有偏移
		var view = omap.getView();
		var center = ol.proj.transform(view.getCenter(), 'EPSG:3857', 'EPSG:4326');
		gmap.setCenter(new google.maps.LatLng(center[1], center[0])); //重新校对地图中心点
	}
	
	/**
	 * 关闭弹出框
	 */
	function closeDoor(){
		isOpened = false;
		var clientWidth = document.body.clientWidth;
		var split = $('#foo').split();
		split.position(clientWidth);//关闭弹出框
		setTimeout(function(){omap.updateSize()}, 10);
		google.maps.event.trigger(gmap, "resize");//触发地图resize方法,否则google map 和ol map 有偏移
		//omap.addInteraction(doubleClickSelect);//OL地图添加双击事件
		moveInteraction = null;
		backCoordinate = null;
		var view = omap.getView();
		var center = ol.proj.transform(view.getCenter(), 'EPSG:3857', 'EPSG:4326');
		gmap.setCenter(new google.maps.LatLng(center[1], center[0]));//重新校对地图中心点
		selectedShape = null;
		singleClickEvent = omap.on('singleclick', function(evt){mapClick(evt)});
		$(closer).trigger("click")
	}
	
	/**
	 * 计算适宜的层级
	 */
	function getBoundsZoomLevel(bounds) {
    	var mapDim = {
    		    height: $(window).height(),
    		    width: $(window).width()
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
	
	/**
	 * 检查Draw是否完毕
	 * @returns {Boolean}
	 */
	function checkDrawState(){
		if($("#rightPane").width()>0){
			alert("请先完成之前的 操作!");
			return false;
		}
		omap.removeInteraction(draw);
		draw = null;
		return true;
	}
	
	/**
	 * 鼠标单机地图事件
	 */
	var singleClickEvent ;
	var plant_select;
	
	/**
	 * 初始化页面
	 */
	$(function() {
		var viewAdmin = GetQueryStringCH("viewAdmin");
		var viewFarmer = GetQueryStringCH("viewFarmer");
		$(".viewAdmin").html(viewAdmin);
		$(".viewFarmer").html(viewFarmer);
		var b = true;
	    $("#satellite-streets").click(function(e){ //卫星和街道切换
		if(b){
		    $("#satellite-btn").hide(); 
		    $("#streets-btn").show();
		    gmap.setMapTypeId(google.maps.MapTypeId.ROADMAP);//街道视图
		    b = false;
		}else{
			$("#satellite-btn").show(); 
		    $("#streets-btn").hide();
		    gmap.setMapTypeId(google.maps.MapTypeId.SATELLITE);//卫星视图
			b = true
		}
		})
		
		$('.baseMap_ttl').click(function(){
			if($(this).next('.baseMap_con').is(':hidden')){
				$(this).css('background','url(/asset/images/baseIcojian1.png) no-repeat 10px center');
				$(this).next('.baseMap_con').slideDown(1000);	
			}else{
				$(this).css('background','url(/asset/images/baseIcojian2.png) no-repeat 13px center');
				$(this).next('.baseMap_con').slideUp(1000);	
			}
		});
		//默认全部选中
		$(".firstList li").find(".piaochecked").addClass("on_check");

	    $(".layer").click(function(){                 
	    	$(".layer").hide();
	    	$('.layerDetail').show();       
	    });
	    $('.layerDetail h4').click(function() {
	    	$(this).parent(".layerDetail").hide();
	    	$('.layer').show(); 
	    });
	    $('.firstList li .controller').click(function() {
	    	var index= $('.controller').index(this);
	    	var icon = $('.firstList li .controller .icon').eq(index)
	    	var node=$('.firstList li .controller').eq(index).parent();
	    	var flag=node.children('dl').is(":visible");
	    	if(flag){
	    		icon.css('background-image','url(/asset/images/map/layer/up.png)');
	    		node.children('dl').slideUp();
	    	}else{
	    		icon.css('background-image', 'url(/asset/images/map/layer/down.png)');
	    		node.children('dl').slideDown();
	    	}
	    });
	    $('dd.soil .controller').click(function() {
	    	var index=$('dd.soil .controller').index(this);
	    	var icon = $('dd.soil .controller .icon').eq(index)
	    	var node = $('dd.soil .controller').eq(index).parent();
	    	var flag=node.siblings('dt').is(":visible");
	    	if(flag){
	    		icon.css('background-image', 'url(/asset/images/map/layer/up.png)');
	    		node.siblings('dt').slideUp();
	    	}else{
	    		icon.css('background-image', 'url(/asset/images/map/layer/down.png)');
	    		node.siblings('dt').slideDown();
	    	}
	    });
	    $('.input').click(function() {
	    	if(!$(this).hasClass("on_check")){
	    		$(this).siblings('dl').find('.piaochecked').addClass("on_check"); 
	    		$(this).parent('.soil').siblings('dt').find('.piaochecked').addClass("on_check"); 
	    	}else{
	    		$(this). siblings('dl').find('.piaochecked').removeClass("on_check");
	    		$(this).parent('.soil').siblings('dt').find('.piaochecked').removeClass("on_check");  
	    	}
	    	var checkFlag=$(this).hasClass("on_check");
	    	var checkValue=$(this).find("input").val();
	    });
	    $(".piaochecked").click(function() {    
	    	$(this).hasClass("on_check")? $(this).removeClass("on_check"):$(this).addClass("on_check");
	    	var checkFlag=$(this).hasClass("on_check");
	    	var checkValue=$(this).find("input").val();
	    	mapLayerOperate(checkValue,checkFlag);
	    })   
		
   	   	$("select").each(function(){
   			if($(this).find("option").length==0){//没有选项的select 添加默认选项
   				$(this).append(noneOption);
   			}
   		});
		$('select').not(".notselect").selectpicker({size:8,dropupAuto:false});//初始化select 控件
		function formatData(result) {
			if (result.loading) return result.text;
				var html = '<div>'+result.plantName+"-"+result.breedName+'</div>';
		    return html;
		}

		function formatDataSelection(data) {
			if(data.id == "")
				return '搜索作物或品种的名称！';
			return data.plantName+"-"+data.breedName;
		}
		var currentQuery;
		plant_select = $('#breed_new').select2({
			language : "zh-CN",
			ajax : {
				url : "/rest/1.0/breedList",
				delay : 450,
				dataType : 'json',
				data : function(params) {
					var param = "";
					var page = "";
					if(typeof(params.term) != "undefined"){
						param = params.term;
						param = param.replace("'","\'");
					}
					if(typeof(params.page) != "undefined"){
						page = params.page;
					}
					return {
						'method' : 'breed_plant_list',
						'field' : "{'enterprise_info_id':"+enter_id+",'search':'"+param+"','page':'"+page+"'}",
					};
				},
				processResults : function(data, params) {
					if(typeof(params.page) == "undefined"){
						params.page = 1
					}
					return {
						results : data.result_data,
						pagination : {
							more : (params.page * 50) < data.total_count
						}
					};
				}
			},
			escapeMarkup : function(markup) {
				return markup;
			}, 
			templateResult : formatData,
			templateSelection : formatDataSelection
		})
		$(".box_back").not("#copy_tips").css({"height":document.body.clientHeight+"px","width":document.body.clientWidth+"px","top":0});
		/**
		 * 弹出控件
		 */
		$("#box").css({width:document.body.clientWidth,height:document.body.clientHeight});
		$("#leftPane").css({"width":document.body.clientWidth-77,"min-width":document.body.clientWidth-77-doorWidth});
		
		var splitter = $('#foo').split({
		    orientation: 'vertical',
		    limit: 0,
		    position: '100%', // if there is no percentage it interpret it as pixels
		    onDragEnd:function(event){
		    	//onsole.log(123)
		    }
		});
		/**
		 * 计算右侧div的高度
		 */
		$(".jScrollbar_mask").css("height",document.body.clientHeight- 101 +"px ");
		//$("#video_iframe").css("height",document.body.clientHeight- 161 +"px ");
		var splitbuttonV ="<div style='cursor: pointer;' class='splitbuttonV'  onclick='operateDoor()'></div>";
		$(".vsplitter").append(splitbuttonV); 	
		//回车事件监听
		document.onkeydown=function(event){ 
            e = event ? event :(window.event ? window.event : null); 
            if(e.keyCode==13){ 
                if(document.activeElement.id=="tc_top_input"){
                	searchs();
                }else if(document.activeElement.id=="ser_input"){
                	$(".search02").trigger("click");
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
        //关闭天气预报
    	$('.wap-close-btn').click(function(){
			$('.envir-pointer-pop').slideUp(800);	
		});	
        $(".beginInput").datetimepicker({
        	useCurrent: false,
        	format: "yyyy-mm-dd",
        	autoclose: true,
        	weekStart: 1,
        	language:  'zh-CN',
        	minView:2,
        	pickerPosition: "bottom-left"
        }).on('changeDate', function(ev){
        	var time = new Date(ev.date);
        	if(time!=null)
        		time = time.format("yyyy-MM-dd");
        	else
        		time = $('#plant_beginInputDate').val();
        	setTimeout(function(){findModel()}, 1);
//			getModelByTime($('#breed_new').val(),$('#plant_tunnel_id').val(),time,$('#plant_standard').val(),$('#plant\\:plant_endInputDate').val(),$('#plant_real_id').val())
        }).on('show', function(ev) {
        	var val = $('#plant_beginInputDate').val();
        	if(val == ""){
        		$(".beginInput").datetimepicker("update", new Date());
        	}else{
        		$(".beginInput").datetimepicker("update", val);
        	}
        });;
    	
        $(".endInput").datetimepicker({
        	format: "yyyy-mm-dd",
        	autoclose: true,
        	weekStart: 1,
        	language:  'zh-CN',
        	minView:2,
        	pickerPosition: "bottom-left"
        }).on('changeDate', function(ev){
        	var time = new Date(ev.date);
        	if(time!=null)
        		time = time.format("yyyy-MM-dd");
        	else
        		time = $('#plant_endInputDate').val();
        	setTimeout(function(){findModel()}, 1);
//      		getModelByTime($('#breed_new').val(),$('#plant_tunnel_id').val(),$('#plant\\:plant_beginInputDate').val(),$('#plant_standard').val(),time,$('#plant_real_id').val())
        }).on('show', function(ev) {
        	var val = $('#plant_endInputDate').val();
        	if(val == ""){
        		$(".endInput").datetimepicker("update", new Date());
        	}else{
        		$(".endInput").datetimepicker("update", val);
        	}
        });
    	
        $(".harvestTime").datetimepicker({
        	format: "yyyy-mm-dd",
        	autoclose: true,
        	weekStart: 1,
        	language:  'zh-CN',
        	minView:2,
        	pickerPosition: "bottom-left"
        }).on('changeDate', function(ev){
        	var time = new Date(ev.date);
        	if(time!=null)
        		time = time.format("yyyy-MM-dd");
        	else
        		time = $('#harvest_timeInputDate').val();
        	begin_end(time);
        }).on('show', function(ev) {
        	var val = $('#harvest_timeInputDate').val();
        	if(val == ""){
        		$(".harvestTime").datetimepicker("update", new Date());
        	}else{
        		$(".harvestTime").datetimepicker("update", val);
        	}
        });
        
        $(".ymstart").datetimepicker({
        	format: "yyyy-mm-dd",autoclose: true,weekStart: 1,language:  'zh-CN',minView:2,pickerPosition: "bottom-left"
        }).on('changeDate', function(ev){
        	var time = new Date(ev.date);
        	if(time!=null)
        		time = time.format("yyyy-MM-dd");
        	else
        		time = $('#ymstart').val()
        		var end =  $("#zzend").val();
        	if(end==""){
        		end = "2050-12-31"
        	}
        }).on('show', function(ev) {
        	var val = $('#ymstart').val();
        	if(val == ""){
        		$(".ymstart").datetimepicker("update", new Date());
        	}else{
        		$(".ymstart").datetimepicker("update", val);
        	}
        });
        
		    
        $(".ymend").datetimepicker({
        	format: "yyyy-mm-dd",autoclose: true,weekStart: 1,language:  'zh-CN',minView:2,pickerPosition: "bottom-left"
        }).on('show', function(ev) {
        	var val = $('#ymend').val();
        	if(val == ""){
        		$(".ymend").datetimepicker("update", new Date());
        	}else{
        		$(".ymend").datetimepicker("update", val);
        	}
        });
		    
        $(".xiumian").datetimepicker({
        	format: "mm-dd",autoclose: true,weekStart: 1,language:  'zh-CN',minView:2,pickerPosition: "bottom-left"
        }).on('changeDate', function(ev){
        	var time = new Date(ev.date);
        	if(time!=null)
        		time = time.format("MM-dd");
        	else
        		time = $('#xiumian').val();
        	begin_end2(time,'','')
        }).on('show', function(ev) {
        	var val = $('#xiumian').val();
        	if(val == ""){
        		$(".xiumian").datetimepicker("update", new Date());
        	}else{
        		$(".xiumian").datetimepicker("update", val);
        	}
        });
		    
        $(".csstart").datetimepicker({
        	format: "mm-dd",autoclose: true,weekStart: 1,language:  'zh-CN',minView:2,pickerPosition: "bottom-left"
        }).on('changeDate', function(ev){
        	var time = new Date(ev.date);
        	if(time!=null)
        		time = time.format("MM-dd");
        	else
        		time = $('#csstart').val();
        	begin_end2('',time,'');
        }).on('show', function(ev) {
        	var val = $('#csstart').val();
        	if(val == ""){
        		$(".csstart").datetimepicker("update", new Date());
        	}else{
        		$(".csstart").datetimepicker("update", val);
        	}
        });

        $(".csend").datetimepicker({
        	format: "mm-dd",autoclose: true,weekStart: 1,language:  'zh-CN',minView:2,pickerPosition: "bottom-left"
        }).on('changeDate', function(ev){
        	var time = new Date(ev.date);
        	if(time!=null)
        		time = time.format("MM-dd");
        	else
        		time = $('#csend').val();
        	begin_end2('','',time);
        }).on('show', function(ev) {
        	var val = $('#csend').val();
        	if(val == ""){
        		$(".csend").datetimepicker("update", new Date());
        	}else{
        		$(".csend").datetimepicker("update", val);
        	}
        });
		    
        $(".zzend").datetimepicker({
        	format: "yyyy-mm-dd",autoclose: true,weekStart: 1,language:  'zh-CN',minView:2,pickerPosition: "bottom-left"
        }).on('changeDate', function(ev){
        	var time = new Date(ev.date);
        	if(time!=null)
        		time = time.format("yyyy-MM-dd");
        	else
        		time = $("#zzend").val()
        		if(time==""){
        			time = "2050-12-31";
        		}
        	if($('#ymstart').val()=="")
        		return ;
        	setTimeout(function(){findModel()}, 1);
        }).on('show', function(ev) {
        	var val = $('#zzend').val();
        	if(val == ""){
        		$(".zzend").datetimepicker("update", new Date());
        	}else{
        		$(".zzend").datetimepicker("update", val);
        	}
        });
        
        //右上角航拍按钮事件
        $('.aerial-btn').click(function(){
        	openAerialVideo();
        });
        
        //右侧折叠菜单列表搜索事件
        $('#plotlist-search').click(function(){
        	searchs();
        });
        
        //土地检测记录详情、土地历史记录详情
        $('#land-detectionrecord').click(function(){
        	jumpToPartition();
        });
        $('#land-historyrecord').click(function(){
        	jumpToPartition();
        });
        
        //rightNo6 --类别
        $("#breed_new").change(function(){
        	changeBreed();
        });
        //rightNo6 --种植面积
        $("#plant_area").keyup(function(){
        	clearNoNum(document.getElementById('plant_area'));
      	});
        //rightNo6 --种苗来源
        $("#sproutSel").change(function(){
        	sproutChange(this.value);
        });
        $(".plotsYield_table input").keyup(function(){
    	 	var obj = $(this)[0];	
    	  obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
    		obj.value = obj.value.replace(/^\./g,"");  //验证第一个字符是数字而不是. 
    		obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.   
    		obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
      });
        
        //（添加农户、种植管理员、饲养员、养殖负责人）
        $('#addbtn-nonghu').click(function(){
        	addFarmer(1);
        });
        $('#addbtn-zhongzgly').click(function(){
        	addFarmer(2);
        });
        $('#addbtn-feeder').click(function(){
        	addFarmer(3);
        });
        $('#addbtn-principal').click(function(){
        	addFarmer(4);
        });
        
        //（保存、取消、删除）分组信息=====
        $('#save-groupinginfo').click(function(){
        	saveTunnelInfos();
        });
        $('#cancel-groupinginfo').click(function(){
        	cancelTunnelInfos();
        });
        $('#delete-groupinginfo').click(function(){
        	deleteTunnelInfos($('#tunnel_info_id').val());
        });
        
        //产量预估板块--地块产量、亩产量
        $('#plot-changeyield').click(function(){
        	changeYield(2);
        });
        $('#mu-changeyield').click(function(){
        	changeYield(1);
        });
        //产量预估板块--（保存、返回、删除）
        $('#save-yeildforecast').click(function(){
        	if(!checkSubmit()) return false;
        });
        $('#return-yeildforecast').click(function(){
        	plant_no();
        });
        $('#delete-yeildforecast').click(function(){
        	delete_plant_or();
        });
        $('#save-secondtable').click(function(){
        	if(!checkSubmit()) return false;
        });
        
        //【隐藏、删除】 previewDiv内容
        $('#previewDiv .big_images').click(function(){
        	$('#previewDiv').hide();
        });
        $('#previewDiv .img_box').click(function(){
        	//document.getElementById('previewDiv').style.display='none';
        	$('#previewDiv').hide();
        });
        
        //点击关闭传感器弹出框
        $('.sensor-block .closed').click(function(){
        	closeCgq();
        });
        //保存农户
        $('#save-farmerinfo').click(function(){
        	saveFarmer();
        });
        //取消农户编辑
        $('#cancel-farmerinfo').click(function(){
        	cancelFarmer();
        });
	})
	
	/**
	 * 初始化地图
	 */
	$(function() {
		/**
		 * 中心点坐标
		 */
		var centerStr = GetQueryString("latlng");
		var center = new Array();
		if (centerStr != "" && centerStr != "null,null") {
			var centerStr_Arr = centerStr.split(",");
			center.push(parseFloat(centerStr_Arr[1]),parseFloat(centerStr_Arr[0]));
		} else {
			center.push(116.3911771774292,39.90627970711568);
		}
		
		var zoom_group = window.parent.zoom_group;
   	 
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
		
		/**
		 * google Option
		 */
		var mapOptions = {
				mapTypeId : google.maps.MapTypeId.SATELLITE,//卫星视图
				streetViewControl : false, //街景图标
			    disableDefaultUI: true,//默认控件
			    keyboardShortcuts: false,//键盘快捷键
			    draggable: false,//拖动
			    disableDoubleClickZoom: true,//双击事件
			    scrollwheel: false,//鼠标滚动
			};
		gmap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);//初始化google map
		
		/**
		 * Farmeasy 版权信息
		 */
		var logoElement = document.createElement('a');
	    logoElement.href = 'http://farmeasy.cn/';
	    logoElement.target = '_blank';
	    var logoImage = document.createElement('img');
	    logoImage.src = '/favicon.ico';
	    logoElement.appendChild(logoImage);
		
		/**
		 * Ol map 联动 google map
		 */
		var view = new ol.View({maxZoom: 19,minZoom:3});
		    view.on('change:center', function() {
		      var center = ol.proj.transform(view.getCenter(), 'EPSG:3857', 'EPSG:4326');
		      gmap.setCenter(new google.maps.LatLng(center[1], center[0]));
		    });
		    view.on('change:resolution', function() {
		    	console.log(view.getZoom()+"==========================");
		      gmap.setZoom(view.getZoom());
		    });

	    var olMapDiv = document.getElementById('olmap');
	    ol.inherits(drawContral, ol.control.Control);
	    ol.inherits(addGeo, ol.control.Control);
	    /**初始化OL map */
	    omap = new ol.Map({
	    	controls: ol.control.defaults({ attributionOptions: ({
	            collapsible: false,
	            label:"义田帮手",
	            tipLabel : "123456",
	            label:"54321"
	            ,className:"farmlog ol-attribution"
	          }) }).extend([new drawContral(),new addGeo()]),
	        logo:logoElement,
	        interactions: ol.interaction.defaults({shiftDragZoom:false,altShiftDragRotate: false,dragPan: false,rotate: true}).extend([new ol.interaction.DragPan({kinetic: null}),new ol.interaction.MouseWheelZoom({constrainResolution:true})]),
	        target: olMapDiv,
	        view: view,
	        layers: [
//	                 new ol.layer.Tile({
//	            source: new ol.source.OSM()
//	          }),
				locationVector,
				markerVector,baseVector,partitionsVector,tunnelInfoVector,tunnelCenterPointVector,vector,deviceVector,videoVector,krpanoVector,baseTextVector,partitionTextVector,tunnelInfoTextVector,krpanoTextVector]
	    });
	    view.setCenter(ol.proj.transform(center, 'EPSG:4326', 'EPSG:3857'));
		view.setZoom(defaultZoom);
		
		olMapDiv.parentNode.removeChild(olMapDiv);
		/**添加Draw图标*/
		gmap.controls[google.maps.ControlPosition.TOP_LEFT].push(olMapDiv);
		singleClickEvent = omap.on('singleclick', function(evt){mapClick(evt)});
		
		
		addDoubleEvent();
		initMapFirst();
		initMapSecond();
		initMapThird();
		initLandData();
//		initBreedList();
		sourceAddFeature();
		mapViewAddListener();
		var basePointElement = document.createElement('div');
		basePointElement.setAttribute("id", "basePointElement");
		basePointElement.classList.add("basePoint");
		basePointElement.classList.add("marker");
		
		popupOverlay = new ol.Overlay(/** @type {olx.OverlayOptions} */ ({
		        element: container,
		        positioning: 'bottom-center',
		        stopEvent : false,
		        offset: [0, -15]
		      }));
		
		markerPopup = new ol.Overlay({
	        element: basePointElement,
	        positioning: 'bottom-center',
	        //stopEvent: false,
	        offset: [0, -55]
	      });
	    omap.addOverlay(markerPopup);
	    
	    var deviceElement = document.createElement('div');
	    deviceElement.setAttribute("id", "deviceElement");
	    deviceElement.classList.add("devicePoint");
	    deviceElement.classList.add("device");
		
		devicePopup = new ol.Overlay({
	        element: deviceElement,
	        positioning: 'bottom-center',
	        //stopEvent: false,
	        offset: [0, -5]
	      });
	    omap.addOverlay(devicePopup);
	    omap.addOverlay(popupOverlay);
	    
	    omap.on('pointermove', function(e) {
//	        if (e.dragging) {
//	          $(".marker").hide();
//	          return;
//	        }
//	        var pixel = omap.getEventPixel(e.originalEvent);
//	        var hit = omap.hasFeatureAtPixel(pixel);
//	        omap.getTarget().style.cursor = hit ? 'pointer' : '';
	      });
	});
	
	/**
	 * 设置基地文字是否显示 zoom>=15隐藏
	 * @param zoom
	 */
	function setBaseTextVisible(zoom){
		if(zoom <= 15){
			baseTextVector.setVisible(true);
		}else{
			baseTextVector.setVisible(false);
		}
	}
	
	/**
	 * 设置分区文字是否展示和字体大小
	 * @param zoom
	 */
	function setPartitionTextVisible(zoom){
		if(zoom <= 15){//小于15隐藏
			partitionTextVector.setVisible(false);
		}else{
			//大于15不同zoom 字体大小不同
			partitionTextVector.setVisible(true);
			if(zoom == 16){
				var temp = partFS[0]+"px 宋体";
				for(var style in partitionTextStyleCache){
					partitionTextStyleCache[style].getText().setFont(temp);
				}
			}else if(zoom == 17){
				var temp = partFS[1]+"px 宋体";
				for(var style in partitionTextStyleCache){
					partitionTextStyleCache[style].getText().setFont(temp);
				}
			}else if(zoom == 18){
				var temp = partFS[2]+"px 宋体";
				for(var style in partitionTextStyleCache){
					partitionTextStyleCache[style].getText().setFont(temp);
				}
			}else if(zoom == 19){
				var temp = partFS[3]+"px 宋体";
				for(var style in partitionTextStyleCache){
					partitionTextStyleCache[style].getText().setFont(temp);
				}
			}else if(zoom > 19){
				var temp = partFS[4]+"px 宋体";
				for(var style in partitionTextStyleCache){
					partitionTextStyleCache[style].getText().setFont(temp);
				}
			}
		}
	}
	
	/**设置地块文字是否显示 和字体大小
	 * 小于18隐藏 
	 * @param zoom
	 */
	function setTunnelTextVisible(zoom){
		if(zoom < 18){
			tunnelInfoTextVector.setVisible(false);
		}else{
			tunnelInfoTextVector.setVisible(true);
			if(zoom == 18){
				var temp = tunnelFS[0]+"px 宋体";
				for(var style in tunnelInfoTextStyleCache){
					var text = tunnelInfoTextStyleCache[style].getText()
					text.setFont(temp);
					text.setOffsetY("15");
				}
			}else if(zoom == 19){
				var temp = tunnelFS[1]+"px 宋体";
				for(var style in tunnelInfoTextStyleCache){
					var text = tunnelInfoTextStyleCache[style].getText()
					text.setFont(temp);
					text.setOffsetY("30");
				}
				setTimeout(function(){
					var temp = tunnelFS[1]+"px 宋体";
					var zoom = omap.getView().getZoom();
					for(var style in tunnelInfoTextStyleCache){
						var text = tunnelInfoTextStyleCache[style].getText()
						text.setFont(temp);
						text.setOffsetY("30");
					}
				}, 100);
			}else if(zoom > 19){
				var temp = tunnelFS[2]+"px 宋体";
				for(var style in tunnelInfoTextStyleCache){
					var text = tunnelInfoTextStyleCache[style].getText()
					text.setFont(temp);
					text.setOffsetY("30");
				}
			}
		}
	}
	
	/**
	 * 设置四季田景文字是否显示和字体大小
	 * @param zoom
	 */
	function setKrpanoTextVisible(zoom){
		if(zoom < 18){
			krpanoTextVector.setVisible(false);
		}else{
			krpanoTextVector.setVisible(true);
			if(zoom == 18){
				for(var style in krpanoTextStyleCache){
					var text = krpanoTextStyleCache[style].getText()
					text.setFont("12px 宋体");
					text.setOffsetY("15");
				}
			}else if(zoom == 19){
				for(var style in krpanoTextStyleCache){
					var text = krpanoTextStyleCache[style].getText()
					text.setFont("18px 宋体");
					text.setOffsetY("30");
				}
				setTimeout(function(){
					var zoom = omap.getView().getZoom();
					for(var style in krpanoTextStyleCache){
						var text = krpanoTextStyleCache[style].getText()
						text.setFont("18px 宋体");
						text.setOffsetY("30");
					}
				}, 100);
			}else {
				
			}
		}
	}
	
	/**
	 * 地图层级变化监听时间
	 */
	function mapViewAddListener(){
		omap.getView().on('change:resolution', function(){
			var zoom = this.getZoom();
			setBaseTextVisible(zoom);
			setPartitionTextVisible(zoom);
			setTunnelTextVisible(zoom);
			setKrpanoTextVisible(zoom);
			var scale = zoomScale(zoom);
			if(scale == -1){
				//隐藏矢量图层
				tunnelCenterPointVector.setVisible(false);
				deviceVector.setVisible(false);
				videoVector.setVisible(false);
				krpanoVector.setVisible(false);
			}else{
				//展示矢量图曾
				tunnelCenterPointVector.setVisible(true);
				deviceVector.setVisible(true);
				videoVector.setVisible(true);
				krpanoVector.setVisible(true);
				tunnelCenterPointVector.setVisible(true);
				tunnelCenterPointSource.forEachFeature(function(feature){
					var style = feature.getStyle();
			  	  	style.getImage().setScale(scale);
				}, scale);
				deviceVector.setVisible(true);
				//设置传感器等的 图标缩放
				styles.deviceStyle.getImage().setScale(scale+0.2);
				styles.weatherStationStyle.getImage().setScale(scale/2);
				styles.videoStyle.getImage().setScale(scale+0.2);
				styles.krpanoStyle.getImage().setScale(scale*1.3);
			}
			if(zoom < 15){
				
			}
		})
	}
	
	/**
	 * 通过层级计算缩放比例,以地块中心为参考
	 * 其他要素通过加减乘除换算比例
	 * @param zoom
	 * @returns {Number}
	 */
	function zoomScale(zoom){
		var scale = -1;
		if(zoom > 13){
			switch(zoom)
				{
				case 14:
					  scale = 0.02;
					  break;
				case 15:
					  scale = 0.03;
					  break;
				case 16:
					  scale = 0.06;
					  break;
				case 17:
					  scale = 0.15;
					  break;
				case 18:
					  scale = 0.33;
					  break;
				case 19:
					  scale = 0.66;
					  break;
				default:
					  scale = 0.8;
					  break;
					}
  		}
		return scale;
	}
	
	/**
	 * 添加OL地图双击选中事件
	 */
	function addDoubleEvent(){
		omap.addInteraction(doubleClickSelect);
		doubleClickSelect.on("select",function(evt){//当选中之后触发的事件
			var features = evt.selected;
			var feature = features[0];
			var ftype = feature.get("ftype");
			if(ftype == TUNNELINFO){
				$("#divtittle").html("编辑地块信息");
				
				var center = tunnelCenterPointSource.getFeatureById(feature.getId());
				if(center != null){
					omap.getView().setZoom(19);
					omap.getView().setCenter(center.getGeometry().getCoordinates());
				}
				openTunnelInfosWindow(feature);
			}
		},this);
	}
	
	
	/**
	 * OL地图点击事件
	 */
	function mapClick(evt) {
        var feature = omap.forEachFeatureAtPixel(evt.pixel,
            function(feature) {
              return feature;
            });
        if(typeof(feature) != "undefined"){
        	$('.envir-pointer-pop').slideUp(800);	
        	if (feature.get("ftype") == MARKER) {
        		var coordinate = feature.getGeometry().getCoordinates();
                markerPopup.setPosition(coordinate);
                $("#basePointElement").popover({
                  'placement': 'top',
                  'html': true,
                  'content': feature.get('name')
                });
                var obj = $("#basePointHtml");
                var contact = "";
                var phone = "";
                var address = "";
                var mark = "";
                var base = baseSource.getFeatureById("base_"+feature.get("base_id_"));
                var imgsrc = "";
                if(base != null){
                	contact = base.get("mark_contact_");
                	phone = base.get("mark_phone_");
                	address = base.get("mark_address_");
                	mark = base.get("mark_description_");
                	imgsrc = base.get("base_image_url_");
                	if(imgsrc == null || imgsrc == "" || typeof(imgsrc) == "undefined")
                		imgsrc = "/asset/images/textPic01.png";
                }
                obj.find("#baseurl").attr("src",imgsrc);
                obj.find(".cm_name").html(feature.get("name_"));
                obj.find(".fl_concat").html(contact);
                obj.find(".phone").html(phone);
                obj.find(".cm_address").html(address);
                obj.find(".cm_mark").html("描述："+mark);
                obj.find(".cm_mark").attr("title",mark);
                $("#basePointElement").popover('show');
                $("#basePointElement").html(obj.html());
                $("#basePointElement").show();
                var view = omap.getView();
                view.setZoom(15);
                view.setCenter(coordinate);
              //基地基础信息弹出框
                $('#olmap .close').unbind("click");
                $('#olmap .close').click(function(){
                	closeBasePointElement();
                });
        	}else if(feature.get("ftype")==DEVICE){
        		openDeviceWindow(feature);
        	}else if(feature.get("ftype")==WEATHER_STATION){
        		openWeatherStationWindow(feature);
	        }else if(feature.get("ftype")==VIDEO){
	        	var realPlantId = "";
	        	var tunnelInfoId = feature.get("tunnel_info_id");
	        	tunnelInfoSource.forEachFeature(function(feature){
	        		if(feature.get("tunnel_info_id_") == tunnelInfoId){
	        			var real_plant = feature.get("real_plant");
	        			if(real_plant.length>0){
	        				realPlantId = real_plant[0].real_plant_id;
	        				return true;
	        			}
	        			return true;
	        		}
	        	})
	        	$("#videoViewShow").attr("src","/archive/videoViewShow.seam?initType=5&videoId="+feature.get("video_id_")+"&realPlantId="+realPlantId+"&from=webgis");
	        	$('#login3').show();
	        	var offsetTop = jQuery("#video_iframe").height()/2;
	        	$("#video_iframe").css("margin-top",-offsetTop);
	        	$("#video_iframe").show();
	        }else if(feature.get("ftype")==KRPANO){
	        	openPanoramaWindow(feature);
	        }else if(feature.get("ftype")==TUNNEL_INFO_CENTER){
	        	openRealPlantWindow(feature);
	        }
        }
	}
	/**
	 * draw按钮
	 */
	function drawContral(opt_options){
		var options = opt_options || {};
		var draw_ul = $("#layerControl")[0];
//		ul.remove();

        var element = document.createElement('div');
        element.className = 'drawControl1 ';
        element.appendChild(draw_ul);

        ol.control.Control.call(this, {
          element: element,
          target: options.target
        });
	}
	
	/**
	 * 检查marker的坐标是否正确.是否超出90 和-90 ,180 和-180 范围;
	 * @param latlng
	 */
	function checkLatLngBounds(latlng){
		if(latlng.coordinates == null || latlng.coordinates[0] == null || latlng.coordinates[1] == null )
			return true;
		if(latlng.coordinates[0] > 90 || latlng.coordinates[0] < -90)
			return true;
		if(latlng.coordinates[1] > 180 || latlng.coordinates[1] < -180)
			return true;
		return false;
	}
	
	/**
	 * 加载基地和分区
	 */
	function initMapFirst(){
		$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':'init_map_first',
				'field':"{'enterprise_info_id':"+enter_id+",'base_id':"+base_id+"}"
			},
			success: function( response ) {
				initMapFirstNext(response);
			},
			error: function(e) {
				
			}
		});
	}
	
	/**
	 * 初始化基地和分区 Feature
	 * @param response
	 */
	function initMapFirstNext( response ){
		if(response.invoke_result == "INVOKE_SUCCESS"){
			pidArray = new Array();
			pidArray.push({"id":0,"indexNum":null});
			var data = response.data;
			var bases = data.bases;
			for(var i = 0,j = bases.length ; i < j ; i++ ){
				//基地中心标记
				var base = bases[i];
				var latlng = base.latlng;
				var tempArr = new Array();
				if(checkLatLngBounds(latlng)){
					continue;
				}
				if(i == 0){
					weatherForecast(base.base_id);
				}
				tempArr.push(parseFloat(latlng.coordinates[1]),parseFloat(latlng.coordinates[0])); 
				var marker = new ol.Feature({
					ftype : MARKER,
					index_ : i,
					base_id_	 : base.base_id,
					name_ : base.name,
			        style: styles.marker,
			        hasBounds_ : (base.latlngBounds.coordinates != null ? true:false),
			        geometry: new ol.geom.Point(ol.proj.transform(tempArr,'EPSG:4326' , 'EPSG:3857'))
			      });
				marker.setId("marker_" + base.base_id);//key存放marker_+baseId;
				marker.setStyle(styles.marker);
				markerSource.addFeature(marker);
				//基地文字
				var wenzi =  new ol.Feature({
					ftype : BASE_TEXT,
					index_ : i,
					base_id_ : base.base_id,
					base_image_url_ : base.base_image_url,
					name_ : base.name,
			        geometry: new ol.geom.Point(ol.proj.transform(tempArr,'EPSG:4326' , 'EPSG:3857'))
			      });
				wenzi.setId("marker_" + base.base_id);
				baseTextSource.addFeature(wenzi);
				
				if(base.latlngBounds.coordinates != null){
					var polygon = loadPolygon(base,BASE);//key存放base_+baseId;
					polygon.set("name_",base.name);
					polygon.set("mark_area_",base.mu_number);
					polygon.set("mark_contact_",base.contact);
					polygon.set("mark_phone_",base.phone);
					polygon.set("mark_address_",base.address);
					polygon.set("mark_description_",base.description);
					polygon.set("mark_color_",base.color);
					polygon.set("base_image_url_",base.base_image_url);
					polygon.set("index_",i);
					baseSource.addFeature(polygon);
				}
			}
			baseTextVector.setZIndex(BASE_TEXT_Z);
			setBaseTextVisible(omap.getView().getZoom());
			markerVector.setZIndex(MARKER_Z);
			baseVector.setZIndex(BASE_Z);
			MARKER__INDEX = bases.length ;
			BASE__INDEX = bases.length ;
			//加载分区数据
			var partitions = data.partitions;
			for(var i = 0,j = partitions.length ; i < j ; i++ ){
				var partition = partitions[i];
				if(partition.latlngBounds.coordinates != null){
					var polygon = loadPolygon(partition,PARTITIONS);//key存放partitions_id_+index;
					polygon.set("base_id_",partition.base_id);
					polygon.set("name_",partition.name);
					polygon.set("partitions_area_",partition.mu_number);
					polygon.set("partitions_description_",partition.description);
					polygon.set("partitions_color_",partition.color);
					polygon.setId("partitions_" + i);
					polygon.set("index_",i);
					partitionsSource.addFeature(polygon);
					if(!map2.has(partition.part_id)){
			        	map2.set(partition.part_id,partition.name);
			        }
					pidArray.push({"id":partition.part_id,"indexNum":partition.index_num});
					var wenzi =  new ol.Feature({
						ftype : PARTITION_TEXT,
						index_ : i,
						partitions_id_ : partition.part_id,
						name_ : partition.name,
				        geometry: new ol.geom.Point(polygon.getGeometry().getInteriorPoint().getCoordinates())
				      });
					//var wenziStyle = createPartitionTextStyle(partition.name);
					wenzi.setId("partitions_" + i);
					//wenzi.setStyle(wenziStyle);
					partitionTextSource.addFeature(wenzi);
				}
			}
			partitionTextVector.setZIndex(PARTITION_TEXT_Z);
			partitionsVector.setZIndex(PARTITIONS_Z);
			PARTITIONS__INDEX = partitions.length;
			setPartitionTextVisible(omap.getView().getZoom());
			isFirstOK = 1;
		}else{
			log(response.invoke_message);
		}
	}
	
	/**
	 * 加载地块
	 */
	function initMapSecond(){
		$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':'init_map_second',
				'field':"{'enterprise_info_id':"+enter_id+",'base_id':"+base_id+"}"
			},
			success: function( response ) {
				initMapSecondNext(response);
			},
			error: function(e) {
				//log(2);
			}
		});	//-----end ajax
	}
	
	/**
	 * 初始化地块Feature
	 * @param response
	 */
	function initMapSecondNext( response ){
		if(response.invoke_result == "INVOKE_SUCCESS"){
			var data = response.data;
			var tunnel_infos = data.tunnel_infos;
			tunnelJson.value = tunnel_infos;
			var scale = zoomScale(omap.getView().getZoom());
			if(scale == -1){
				tunnelInfoVector.setVisible(false);
			}
			for(var i = 0,j = tunnel_infos.length ; i < j ; i++ ){
				var tunnel_info = tunnel_infos[i];
				if(tunnel_info.tunnel_id == 2382){
					console.log(123);
				}
				if(tunnel_info.latlngBounds.coordinates != null){
					var polygon = loadPolygon(tunnel_info,TUNNELINFO);//key存放tunnel_info_id_+index;
					polygon.setId("tunnel_info_" + i);
					polygon.set("tunnel_info_index_",i);
					polygon.set("tunnel_info_partitions_id_",tunnel_info.partitions_id);
					polygon.set("tunnel_info_base_id_",tunnel_info.base_id);
					
					polygon.set("name_",tunnel_info.name);
					polygon.set("tunnel_info_mu_number_",tunnel_info.mu_number);
					polygon.set("tunnel_info_area_",tunnel_info.area);
					polygon.set("tunnel_info_color_",tunnel_info.color);
					polygon.set("tunnel_info_tunnel_group_id_",tunnel_info.tunnel_group_id);
					polygon.set("tunnel_info_keeper_info_",tunnel_info.keeper_info);
					polygon.set("tunnel_info_master_info_",tunnel_info.master_info);
					polygon.set("tunnel_info_type_",tunnel_info.plant_env_type_id);
					polygon.set("tunnel_info_device_id_",tunnel_info.device_id);
					polygon.set("tunnel_info_com_device_id_",tunnel_info.com_device_id);
					polygon.set("real_plant",tunnel_info.real_plant);
					polygon.set("animal",tunnel_info.animal);
					tunnelInfoSource.addFeature(polygon);
					var isrc = "";
					if(tunnel_info.plant_env_type_id == 8){//养殖
						var animalList = tunnel_info.animal;
						if(animalList == null || animalList.length == 0){
							isrc = animalsrc;
						}else if(animalList.length == 1){
							if(animalList[0].img_round_url != ""){
								isrc = animalList[0].img_round_url + "@60h_60w|60-1ci.png";
							}else if(animalList[0].img_square_url != ""){
								isrc = animalList[0].img_square_url + "@60h_60w|60-1ci.png";
							}else{
								isrc = animalsrc ;
							}
						}else{
							isrc = moreanimal;
						}
					}else{//种植
						var realPlantJson = tunnel_info.real_plant;
						if(realPlantJson != null){
							isrc = createCenterImg(realPlantJson);
						}else{
							isrc = nonesrc;
						}
					}
					
					//中心点圆图
					var center = new ol.Feature({
						ftype : TUNNEL_INFO_CENTER,
						index_ : i,
						imgurl : isrc,
						tunnel_info_id_:tunnel_info.tunnel_id,
				        geometry: new ol.geom.Point(polygon.getGeometry().getInteriorPoint().getCoordinates())
				      });
					center.setId("tunnel_info_" + i);
					centerStyle = createCenterStyle(isrc);
					
					centerStyle.getImage().setScale(scale);
					center.setStyle(centerStyle);
					tunnelCenterPointSource.addFeature(center);
					
					//文字
					var wenzi =  new ol.Feature({
						ftype : TUNNEL_INFO_TEXT,
						index_ : i,
						tunnel_info_id_ : tunnel_info.tunnel_id,
						name_ : tunnel_info.name,
				        geometry: new ol.geom.Point(polygon.getGeometry().getInteriorPoint().getCoordinates())
				      });
					wenzi.setId("tunnel_info_" + i);
					tunnelInfoTextSource.addFeature(wenzi);
				}
			}
			tunnelInfoVector.setZIndex(PARTITIONS_Z);
			tunnelCenterPointVector.setZIndex(TUNNEL_CENTER_Z);
			TUNNEL_INDEX = tunnel_infos.length;
			tunnelInfoTextVector.setZIndex(TUNNEL_INFO_TEXT_Z);
			setTunnelTextVisible(omap.getView().getZoom());
			
			initList();
		}else{
			log(response.invoke_message);
		}
	}
	
	/**
	 * 中心点的图片
	 * @param realPlantJson
	 */
	function createCenterImg(realPlantJson){

		/**当前种植 */
		var nowPlant = [];
		/**计划种植 */
		var willPlant = [];
		/**当前种植 年生作物数量>0 */
		var oneb = false;
		/**当前种植 多年生作物数量>0 */
		var twob = false;
		/**计划种植 年生作物数量>0 */
		var willoneb = false;
		/**计划种植 多年生作物数量>0 */
		var willtwob = false;
		for (var x = 0; x < realPlantJson.length; x++) {
			var rp = realPlantJson[x];
			if(rp.plant_begin_time == null || rp.plant_end_time == null){
				continue;
			}
			var t1 = new Date(rp.plant_begin_time.$date || rp.plant_begin_time.time);
			var t2 = new Date(rp.plant_end_time.$date || rp.plant_end_time.time);
			if (t1.getTime() <= nowD_.getTime() && t2.getTime() >= nowD_.getTime()){//当前种植
				if(rp.floristics_type == null || rp.floristics_type == 1)//单年生
					oneb = true;
				else if(rp.floristics_type == 2)//多年生
					twob = true;
				nowPlant.push(rp);
			}else if(t1.getTime()>nowD_.getTime()){//计划种植
				if(rp.floristics_type == null || rp.floristics_type == 1)//单年生
					willoneb = true;
				else if(rp.floristics_type == 2)//多年生
					willtwob = true;
				willPlant.push(rp);
			}
				
		}
		if (nowPlant.length == 0) {//当前种植数量== 0,使用计划种植的图标
			isrc = nonesrc;
			if (willPlant.length == 1) {
				if (willPlant[0].plant_img == "")
					isrc = nonesrc;
				else
					isrc = willPlant[0].plant_img+"@60h_60w|60-1ci.png";
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
		} else if (nowPlant.length == 1) {//使用当前种植的作物的图标
			if(nowPlant[0].plant_img == ""){
				isrc = nonesrc;
			}else{
				isrc = nowPlant[0].plant_img+"@60h_60w|60-1ci.png";
			}
		} else {
			if(twob){//当有多年生时,使用组合之后的图标
				if(oneb)
					isrc = oneimg;
				else
					isrc = twoimg;
			}else 
				isrc = moresrc;
		}
		return isrc;
	}
	
	/**
	 * 加载土地使用记录
	 */
	function initLandData(){
		$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':'land_data',
				'field':"{'enterprise_info_id':"+enter_id+"}"
			},
			success: function( response ) {
				initLandDataNext(response);
			},
			error: function(e) {
				//log(2);
			}
		});	//-----end ajax
	}
	
	/**
	 * 初始化地块Feature
	 * @param response
	 */
	function initLandDataNext( response ){
		if(response.invoke_result == "INVOKE_SUCCESS"){
			var data = response.result_data;
			landData.soil_history = data.soil_history;
			landData.land_test = data.land_test;
			landData.data_dic = data.data_dic;
		}else{
			log(response.invoke_message);
		}
	}
	/**
	 * 地块中心点圆图样式集合
	 */
	var centerStyleCache = {};
	/**
	 * 创建地块中心点样式集合
	 * @param isrc
	 * @returns {ol.style.Style}
	 */
	function createCenterStyle(isrc){
		var style = centerStyleCache[isrc];
        if (!style) {
    		style = new ol.style.Style({
    			image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
		            anchor: [0.5, 33],
		            anchorXUnits: 'fraction',
		            anchorYUnits: 'pixels',
		            src: isrc,
		            rotateWithView : true
		        })),
		        zIndex : TUNNEL_CENTER_Z
    		});
    		centerStyleCache[isrc] = style;
        }
        return style;
	}
	
	
	/**
	 * OL map 加载第三部请求数据
	 */
	function initMapThird(){
		$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':'init_map_third',
				'field':"{'enterprise_info_id':"+enter_id+",'base_id':"+base_id+"}"
			},
			success: function( response ) {
				initMapThirdNext(response);
			},
			error: function(e) {
				log(2);
			}
		});	//-----end ajax
	}
	
	/**
	 * 初始化设备,全景,视频,农户,分组
	 * @param response
	 */
	function initMapThirdNext( response ){
		if(response.invoke_result == "INVOKE_SUCCESS"){
			var data = response.data;
			aerialGroupId = data.aerialGroupId;
			if(aerialGroupId != null && aerialGroupId != 'null'){
				//$(".map_0search:eq(2)").removeClass("hide");
				$("#map-btns .item-div:eq(2)").removeClass("hide");
			}
			groupList = data.group;
			farmerList = data.farmers;
			/**传感器和气象站数据 */
			var sensorList = data.devices;
			/**摄像头数据 */
			var videoList = data.videos;
			/**四季田景数据 */
			var krpanoList = data.krpanos;
			var scale = zoomScale(omap.getView().getZoom());
			if(scale == -1){
				deviceVector.setVisible(false);
				videoVector.setVisible(false);
				krpanoVector.setVisible(false);
			}else{
				//设置组件图标样式
				styles.deviceStyle.getImage().setScale(scale+0.2);
				styles.weatherStationStyle.getImage().setScale(scale/2);
				styles.videoStyle.getImage().setScale(scale+0.2);
				styles.krpanoStyle.getImage().setScale(scale*1.3);
			}
			for(var i = 0;i<sensorList.length ;i++){//循环设备数据
				var device = sensorList[i];
				var latlng = device.latlng;
				if(checkLatLngBounds(latlng))
					continue;
				var tempArr = new Array();
				tempArr.push(parseFloat(latlng.coordinates[1]),parseFloat(latlng.coordinates[0]));
				var marker = new ol.Feature({
					ftype : DEVICE,
					index_ : i,
					device_id_ : device.devices_id,
					name_ : device.name,
					sn_ : device.sn,
					device_type_ : device.device_type,
					device_type_id_ : device.device_type_id,
					description_ : device.description,
					base_id_ : device.base_id,
					partitions_id_ : device.partitions_id,
					factory_time_ : device.factory_time == null ? "" : (new Date(device.factory_time.$date || device.factory_time.time)).format(("yyyy-MM-dd")),
			        geometry: new ol.geom.Point(ol.proj.transform(tempArr,'EPSG:4326' , 'EPSG:3857'))
			      });
				marker.setId("device_" + i);
				marker.setStyle(styles.videoStyle);
				if(device.device_type == 1){//传感器
					marker.set("ftype",DEVICE);
					marker.setStyle(styles.deviceStyle);
				}else{//气象站
					marker.set("ftype",WEATHER_STATION);
					marker.setStyle(styles.weatherStationStyle);
				}
				deviceSource.addFeature(marker); 	
			}
			deviceVector.setZIndex(DEVICE_Z);
			DEVICE_INDEX = sensorList.length;
			
			for(var i = 0;i<videoList.length ;i++){//循环摄像头数据
				var video = videoList[i];
				var latlng = video.latlng;
				var tempArr = new Array();
				if(checkLatLngBounds(latlng))
					continue;
				tempArr.push(parseFloat(latlng.coordinates[1]),parseFloat(latlng.coordinates[0]));
				var marker = new ol.Feature({
					ftype : VIDEO,
					index_ : i,
					video_id_ : video.video_id,
					base_id_ : video.base_id,
					partitions_id_ : video.partitions_id,
					tunnel_info_id : video.tunnel_info_id,
			        style: styles.videoStyle,
			        geometry: new ol.geom.Point(ol.proj.transform(tempArr,'EPSG:4326' , 'EPSG:3857'))
			      });
				marker.setStyle(styles.videoStyle);
				marker.setId("video_" + i);
				videoSource.addFeature(marker);
			}
			videoVector.setZIndex(VIDEO_Z);
			VIDEO_INDEX = videoList.length;
			
			for(var i = 0;i<krpanoList.length ;i++){//循环四季田景数据
				var krpano = krpanoList[i];
				var latlng = krpano.latlng;
				var tempArr = new Array();
				if(checkLatLngBounds(latlng))
					continue;
				tempArr.push(parseFloat(latlng.coordinates[1]),parseFloat(latlng.coordinates[0]));
				var marker = new ol.Feature({
					ftype : KRPANO,
					index_ : i,
					name_ : krpano.name,
					krpanos_id_ : krpano.krpanos_id,
					file_fold_ : krpano.file_fold,
					file_type_ : krpano.file_type,
					file_suffix_ : krpano.file_suffix,
					file_size_ : krpano.file_size,
					file_width_ : krpano.file_width,
					file_height_ : krpano.file_height,
					file_name_ : krpano.file_name,
					krpano_time_ : krpano.krpano_time == null ? "" : (new Date(krpano.krpano_time.$date || krpano.krpano_time.time)).format(("yyyy-MM-dd")),
					base_id_ : krpano.base_id,
					partitions_id_ : krpano.partitions_id,
					tunnel_info_id : krpano.tunnel_info_id,
			        style: styles.krpanoStyle,
			        geometry: new ol.geom.Point(ol.proj.transform(tempArr,'EPSG:4326' , 'EPSG:3857'))
			      });
				marker.setStyle(styles.krpanoStyle);
				marker.setId("krpano_" + i);
				krpanoSource.addFeature(marker);
				
				//四季田景文字
				var wenzi =  new ol.Feature({
					ftype : KRPANO_TEXT,
					index_ : i,
					krpanos_id_ : krpano.krpanos_id,
					name_ : krpano.name,
			        geometry: new ol.geom.Point(ol.proj.transform(tempArr,'EPSG:4326' , 'EPSG:3857'))
			      });
				wenzi.setId("krpano_" + i);
				krpanoTextSource.addFeature(wenzi);
			}
			krpanoVector.setZIndex(KRPANO_Z);
			KRPANO_INDEX = krpanoList.length;
			krpanoTextVector.setZIndex(KRPANO_TEXT_Z);
			setKrpanoTextVisible(omap.getView().getZoom());
			
		}else{
			log(response.invoke_message);
		}
	}
	
	/**
	 * 根据类型创建 基地灬分区灬地块 Feature
	 * @param obj
	 * @param ftype
	 * @returns {ol.Feature}
	 */
	function loadPolygon(obj,ftype){
		var latlngBounds = obj.latlngBounds;
		var latlngArr =  [];
		for(var x = 0;x<latlngBounds.coordinates.length;x++){//封装坐标集
			latlngArr.push(ol.proj.transform([latlngBounds.coordinates[x][1], latlngBounds.coordinates[x][0]], 'EPSG:4326', 'EPSG:3857'));
		}
		var newArr = [latlngArr];
		var polygon = new ol.Feature({
			ftype : ftype,
		    geometry: new ol.geom.Polygon(newArr),
            name: obj.name
        });
		var style ;
		if(ftype == BASE){
			style = new ol.style.Style({
		    	stroke: new ol.style.Stroke({
		            color: obj.color,
		            width: 4
		          }),
		        fill: new ol.style.Fill({
		            color: "rgba("+obj.color.colorRgb()+", 0.1)"
		          }),
		    	zIndex : BASE_Z
		    	,atlasManager: atlasManager
		    });
			polygon.set("base_id_" , obj.base_id);
			polygon.setId("base_" + obj.base_id);
		}else if(ftype == PARTITIONS){
//			style = styles.partitionStyle;
//			style.getStroke().setColor(obj.color);
//			style.getFill().setColor("rgba("+obj.color.colorRgb()+", 0.45)");
			style = new ol.style.Style({
			    	stroke: new ol.style.Stroke({
			            color: obj.color,
			            width: 2
			          }),
			        fill: new ol.style.Fill({
			            color: "rgba("+obj.color.colorRgb()+", 0.45)"
			          }),
			    	zIndex : PARTITIONS_Z
			    	,atlasManager: atlasManager
			    });
			polygon.set("partitions_id_" , obj.part_id);
		}else if(ftype == TUNNELINFO){
			style = new ol.style.Style({
		    	stroke: new ol.style.Stroke({
		            color: obj.color,
		            width: 2
		          }),
		        fill: new ol.style.Fill({
		            color: "rgba("+obj.color.colorRgb()+", 0.5)"
		          }),
		    	zIndex : TUNNEL_Z
		    	,atlasManager: atlasManager
		    });
			polygon.set("tunnel_info_id_" , obj.tunnel_id);
		}
		polygon.setStyle(style);
		return polygon;
	}
	
	/**
	 * 获取所有的品种
	 * 废弃
	 * @deprecated
	 */
    function initBreedList(){
//    	BREED_List
    	$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':'breed_list',
				'field':"{'enterprise_info_id':"+enter_id+"}"
			},
			success: function( response ) {
				initBreedListNext(response);
			},
			error: function(e) {
				
			}
		});
    }
    
    /**
     * 所有品种 赋值下拉框
     * @param response
     */
    function initBreedListNext(response){
    	if(response.invoke_result == "INVOKE_SUCCESS"){
    		var data = response.result_data;
    		$("#breed_new").empty().append(data);
    		$("#breed_new").selectpicker("refresh");
    	}else{
			log(response.invoke_message);
		}
    }
	
	var draw = null;
	var modify = null;
	var modifyFeatures = new ol.Collection();

	/**
	 * 临时图层,在规划的Feature 未保存到数据库之前,临时存放
	 */
	var source = new ol.source.Vector({features: modifyFeatures,wrapX: false});

    var vector = new ol.layer.Vector({
      source: source,
    });
    vector.setZIndex(SOURCE_Z);
    
    /**
     * 基地中心点,传感器,气象站,摄像头 Draw完成时放入到图层,根据类型的不同做不同的验证
     */
    function sourceAddFeature(){
    	 source.on('addfeature', function(evt){
    	    	var feature = evt.feature;
    	    	if(feature.valueOf().get("deleted")){
    	    		source.removeFeature(feature);
    	    	}
    	    });
    }
    
    var sketch;
    var helpTooltipElement;
    var helpTooltip;
    var continuePolygonMsg = '通过单击完成规划!';
    
    /**
     * 关闭中心点的地图弹出框
     */
    function closeBasePointElement(){
    	 $("#basePointElement").html("");
         $("#basePointElement").hide();
    }
    /**
     * 关闭传感器展示框
     */
    function closeCgq(){
    	$("#deviceElement").html("");
        $("#deviceElement").hide();
    }
    
    /**
     * 选中的Feature
     */
    var selectedShape = null;
    /**
     * 打开地块编辑框
     */
    function openTunnelInfosWindow(feature){
    	$(".baseMap_ttl").css('background','url(/asset/images/baseIcojian1.png) no-repeat 10px 12px center').next('.baseMap_con').show();
    	selectedShape = feature;
    	var valueOf = feature.valueOf();
    	$(".rightNo").hide();
    	$(".rightNo4").show();
    	var baseId = valueOf.get("tunnel_info_base_id_");
    	var partition_id = valueOf.get("tunnel_info_partitions_id_");
    	var name_ = valueOf.get("name_");
    	if(name_.length>25){
    		name_ = name_.substring(0,25)+"...";
    	}
    	tunnelTitle = "<a class='jumpToInfo' href='/map/PartitionInfo.seam?tnnelId="+ valueOf.get("tunnel_info_id_")
				+ "&partId="+ partition_id + "&baseId="+ baseId+ "' target='_top' title='"+valueOf.get("name_")+"'>" +name_ + "</a>";
    	$("#divtittle").html(tunnelTitle);

    	$("#tunnel_info_id").val(valueOf.get("tunnel_info_id_"));
    	$("#tunnel_info_index").val(valueOf.get("tunnel_info_index_"));
    	$("#tunnel_info_base_id").val(baseId);
		$("#tunnel_info_partitions_id").val(partition_id);
		$("#tunnel_info_partitions_id").selectpicker("refresh");
		var latlng = feature.getGeometry().getInteriorPoint().getCoordinates();
		latlng = ol.proj.transform(latlng, 'EPSG:3857', 'EPSG:4326');
		$("#tunnel_info_coordinate_X").val(latlng[1]);
		$("#tunnel_info_coordinate_Y").val(latlng[0]);
		$("#tunnel_info_name").val(valueOf.get("name_"));
		$("#area-name").html(valueOf.get("name_"));
		var mu_number = valueOf.get("tunnel_info_mu_number_");
		mu_number = parseFloat(mu_number);
		var area = valueOf.get("tunnel_info_area_");
		area = parseFloat(area);
		$("#tunnel_info_mu_number").val(mu_number.toFixed(2));
		$("#tunnel_info_mu_number_read").html(mu_number.toFixed(2)+"亩");
		$("#plantarea-name").html(area.toFixed(2)+"/");
		$("#tunnel_info_area").val(area.toFixed(2));
		$("#tunnel_info_coordinate_group").val(writer.writeGeometry(feature.getGeometry().clone().transform("EPSG:3857","EPSG:4326")));
		$("#tunnel_info_color").val(valueOf.get("tunnel_info_color_"));
		$('#tunnelinfocolor div').css("background",valueOf.get("tunnel_info_color_"));
		insertPartitionSelectOption(baseId);
		$("#tunnel_info_partitions_id").selectpicker("val",partition_id);
		$("#tunnel_info_partitions_id").selectpicker("refresh");
		var part_selected = $("#tunnel_info_partitions_id").find("option:selected");
		if(part_selected.length>0)
			$("#partition-name").html(part_selected.html());
		else
			$("#partition-name").html("");
		var type = feature.get("tunnel_info_type_");
		var tunnel_group = valueOf.get("tunnel_info_tunnel_group_id_");
		var farmerVal1 = valueOf.get("tunnel_info_keeper_info_");
		var farmerVal2 = valueOf.get("tunnel_info_master_info_");
		var e_ = parseInt(type, 10);
		$(".plantEnvir > div:eq("+(e_-1)+")").addClass('active').siblings().removeClass('active');	
		$("#plant_env_type").val(e_);
		tunnel_group = tunnel_group == null || tunnel_group=="" ?0:tunnel_group;
		farmerVal1 = farmerVal1 == null || farmerVal1=="" ?0:farmerVal1;
		farmerVal2 = farmerVal2 == null || farmerVal2=="" ?0:farmerVal2;
		initTunnelSelect(type,baseId,tunnel_group,farmerVal1,farmerVal2);
		if(backname==""){
			$("#upname").closest("li").hide();
		}else{
			$("#upname").closest("li").show();
			$("#upname").html(backname);
		}
		if(type==8){
			var animalList = feature.get("animal");
			var animal_html = '';
			for (var i = 0;animalList != null && i < animalList.length ; i++) {
				var obj_ = animalList[i];
				animal_html += '<li class="breedList_link"><div class="breedPic"><span class="zhezhaoImg"><img src="'
						+ obj_.img_round_url
						+ '" /></span></div><p class="breedText">'
						+ obj_.animal_name + '</p></li>'
			}
			if (animal_html != '') {
				$(".breedList").empty();
				$(".breedList").append(animal_html);
				$(".noneani").hide();
			} else {
				$(".breedList").empty();
				$(".noneani").show();
			}
			$(".animal_hide").show();
			$(".plant_hide").hide();
		}else{
			$(".animal_hide").hide();
			$(".plant_hide").show();
			tunnelInfoLandData(feature);
			tunnelInfoPlantList(feature);
		}
		openDoor();
    }
    
    /**
     * 地块弹出框 的种植列表
     * @param feature
     */
    function tunnelInfoPlantList(feature){
    	var realPlantJson = feature.get("real_plant");
		var html = "";
		for (var i = 0; i < realPlantJson.length; i++) {
			var obj = realPlantJson[i];
			
			if(obj.plant_begin_time == null || obj.plant_end_time == null){
				continue;
			}
			var t1 = new Date(obj.plant_begin_time.$date || obj.plant_begin_time.time);
			var t2 = new Date(obj.plant_end_time.$date || obj.plant_end_time.time);
			
			if (t1.getTime() > nowD_.getTime())
				continue;
			if (t2.getTime() < nowD_.getTime())
				continue;
				
			var tempsrc = obj.plant_img;
			if (tempsrc == "")
				tempsrc = nonesrc;
			else 
				tempsrc += "@60h_60w|60-1ci.png";
			html += '<div class="rteic"  onclick="editPlant('+ obj.real_plant_id
					+ ')" style="height:80px"><img  style="cursor:pointer" width="53" height="53" src="'
					+ '/asset/images/image_b3.png" class="rtpic" />'
					+ '<img width="53" height="53" src="'+ tempsrc+ '" class="rtimg" /><div class="ritex">'+ obj.breed_name
					+ '<input type="hidden" value="'+ obj.breed_id+ '" class="obj_breed_id"></input><input type="hidden" value="'+ obj.crop_area
					+ '" class="obj_crop_area"></input></div>'+ '<div class="rtehov" style="display: none;">'+ '<a href="#3" onclick="editPlant('+ obj.real_plant_id
					+ ')" style=" position: absolute; bottom:0; right:0; top:-2px; left:-2px; z-index:103; display:block;"><img width="56" height="58" src="'
					+ '/asset/images/hover.png"></a>'+ '<a href="#2" onclick="deletePlantSelf('+ obj.real_plant_id+ ',this,'
					+ feature.get("tunnel_info_id_")+ ')" class="rholli"><img width="18" height="18" src="/asset/images/clo_03.png"></a>'+ '</div></div>';
		}
		html += '<div class="rteic" ><div class="imgBox" style="cursor:pointer" onclick="addPlant(1)"><img src="'
				+ '/asset/images/plus.png" style="padding-top:1px"/></div></div>';
		html += '<div class="clear"></div>';
		$(".realplantlist").empty();
		$(".realplantlist").append(html);

		var html2 = "";
		for (var i = 0; i < realPlantJson.length; i++) {
			var obj = realPlantJson[i];
			if(obj.plant_begin_time == null ){
				continue;
			}
			var t1 = new Date(obj.plant_begin_time.$date || obj.plant_begin_time.time);
			if (t1.getTime() <= nowD_.getTime())
				continue;
			var tempsrc = obj.plant_img;
			if (tempsrc == "" || tempsrc == null)
				tempsrc = nonesrc;
			else
				tempsrc += "@60h_60w|60-1ci.png";
			html2 += '<div class="rteic"  onclick="editPlant('+ obj.real_plant_id+ ')" style="height:80px"><img  style="cursor:pointer" width="53" height="53" src="'
					+ '/asset/images/image_b3.png" class="rtpic" />'+ '<img width="53" height="53" src="'
					+ tempsrc+ '" class="rtimg" /><div class="ritex">'+ obj.breed_name+ '</div>'+ '<div class="rtehov" style="display: none;">'
					+ '<a href="#3" onclick="editPlant('+ obj.real_plant_id
					+ ')" style=" position: absolute; bottom:0; right:0; top:-2px; left:-2px; z-index:103; display:block;"><img width="56" height="58" src="'
					+ '/asset/images/hover.png"></a>'+ '<a href="#2" onclick="deletePlantSelf('
					+ obj.real_plant_id+ ',this,'+ feature.get("tunnel_info_id_")+ ')" class="rholli"><img width="18" height="18" src="/asset/images/clo_03.png"></a>'+ '</div></div>';
		}
		html2 += '<div class="rteic" ><div class="imgBox" style="cursor:pointer" onclick="addPlant(2)"><img src="'
				+ '/asset/images/plus.png" style="padding-top:1px"/></div></div>';
		html2 += '<div class="clear"></div>';
		$(".apslist").empty();
		$(".apslist").append(html2);
		
		$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':'find_history_plant_list',
				'field':"{'enterprise_info_id':"+enter_id+",'tunnel_id':'"+feature.get("tunnel_info_id_")+"'}"
			},
			success: function( response ) {
				var data = response.result_data;
				var html0 = "";
				if (data != null) {
					var real_plant = feature.get("real_plant");
					for (var i = 0;data.length > 0 && i < data.length; i++) {
						var obj = data[i];
						var tempsrc = obj.plant_img;
						if (tempsrc == "")
							tempsrc = nonesrc;
						else
							tempsrc += "@60h_60w|60-1ci.png";
						html0 += '<div class="rteic"  onclick="editPlant('+ obj.real_plant_id+ ')" style="height:80px"><img  style="cursor:pointer" width="53" height="53" src="'
								+ '/asset/images/image_b3.png" class="rtpic" />'+ '<img width="53" height="53" src="'
								+ tempsrc+ '" class="rtimg" /><div class="ritex">'+ obj.breed_name+ '<input type="hidden" value="'
								+ obj.breed_id+ '" class="obj_breed_id"></input><input type="hidden" value="'+ obj.crop_area
								+ '" class="obj_crop_area"></input></div>'+ '<div class="rtehov" style="display: none;">'+ '<a href="#3" onclick="editPlant('
								+ obj.real_plant_id+ ')" style=" position: absolute; bottom:0; right:0; top:-2px; left:-2px; z-index:103; display:block;"><img width="56" height="58" src="'
								+ '/asset/images/hover.png"></a>'
								+ '<a href="#2" onclick="deleteHisPlantSelf('+ obj.real_plant_id+ ',this,'+ feature.get("tunnel_info_id_")
								+ ')" class="rholli"><img width="18" height="18" src="/asset/images/clo_03.png"></a>'+ '</div></div>';
					
						if(real_plant.length == 0){
							real_plant.push(obj);
						}else{
							for(var j = 0,x = real_plant.length;j<x;j++){
								var realPlantObj = real_plant[j];
								if(realPlantObj.real_plant_id == obj.real_plant_id){
									real_plant.del(i)
									j--;
									break;
								}else if(j == x-1){
									real_plant.push(obj);
								}
							}
						}
					}
				}
				html0 += '<div class="rteic" ><div class="imgBox" style="cursor:pointer" onclick="addPlant(0)"><img src="'
						+ '/asset/images/plus.png" style="padding-top:1px"/></div></div>';
				html0 += '<div class="clear"></div>';
				$(".hislist").empty();
				$(".hislist").append(html0);
			},
			error: function(e) {
			}
		});	
    }
    
    /**
     * 地块弹出框 土地检测和使用记录
     * @param feature
     * @returns
     */
    function tunnelInfoLandData(feature){
    	//土地使用记录和历史检测记录
		var temArray = new Array();
		var temStr = "";
		for (var i = 0; i < landData.soil_history.length; i++) {
			var obj = landData.soil_history[i];
			if(obj.tunnel_info_id == feature.get("tunnel_info_id_")){
				if (temArray.length == 3)
					break;
				temArray.push(obj);
				var ty1 = "",ty2="";
				if(obj.soil_data_dic_id != null && landData.data_dic[obj.soil_data_dic_id] != undefined)
					var ty1 = landData.data_dic[obj.soil_data_dic_id].name;
				if(obj.soils_data_dic_id != null && landData.data_dic[obj.soils_data_dic_id] != undefined)
					var ty2 = landData.data_dic[obj.soils_data_dic_id].name;
				temStr += "<li class='"
					+ (i > 0 ? "0" + (i + 1) : "")+(temArray.length==2?" histroyJl_date02":"")+(temArray.length==3?" histroyJl_date03":"")
					+ "'><span>" + obj.begin_time + "-"
					+ obj.end_time + "</span><div style='width:160px;height:28px;overflow:hidden' title='"+ty1+" "+ty2+"'><em>" + ty1 +" "
					+ ty2 + "</em></div></li>";
			}
		}
		if (temArray.length > 0) {
			if (temArray.length == 1) {
				$(".bg_landHistory02").attr("class","bg_landHistory02 landH1");
			} else if (temArray.length == 2) {
				$(".bg_landHistory02").attr("class","bg_landHistory02 landH2");
			} else if (temArray.length == 3) {
				$(".bg_landHistory02").attr("class","bg_landHistory02 landH3");
			}
			$(".landHistory_list").empty().append(temStr);
			$(".shiy").show();
		} else {
			$(".bg_landHistory02").attr("class",
					"bg_landHistory02 landH1");
			temStr = "<li class=''><span>"+ (nowD.getFullYear())+ "-"+ (nowD.getFullYear())
					+ "</span><div><em>暂无数据</em><em class='colorGrn02'></em></div></li>";
			$(".landHistory_list").empty().append(temStr);
			$(".shiy").show();
		}

		if (landData.land_test.length == 0) {
			$(".jiance_mechanism").html("检测机构：暂无数据");
			$(".jiance_date").html("检测日期：暂无数据");
			$(".ph").html("--");
			$(".ph1").show();
			$(".ec").html("--");
			$(".ec1").show();
			$(".pb").html("--");
			$(".pb").show();
			$(".jilu").show();
		} else {
			for (var i = 0; i < landData.land_test.length; i++) {
				var obj = landData.land_test[i];
				if (obj.tunnel_info_id == feature.get("tunnel_info_id_")) {
					$(".jiance_mechanism").html("检测机构：" + obj.test_org);
					$(".jiance_date").html("检测日期：" + obj.test_date);
					if (obj.ph_val != "") {
						$(".ph").html(obj.ph_val);
						$(".ph1").show();
					} else {
						$(".ph").html("--");
						$(".ph1").show();
					}
					if (obj.ec_val != "") {
						$(".ec").html(obj.ec_val);
						$(".ec1").show();
					} else {
						$(".ec").html("--");
						$(".ec1").show();
					}
					if (obj.soil_bulk_density != "") {
						$(".pb").html(obj.soil_bulk_density);
						$(".pb").show();
					} else {
						$(".pb").html("--");
						$(".pb").show();
					}
					$(".jilu").show();
					break;
				} else if (i == landData.land_test.length - 1) {
					$(".jiance_mechanism").html(
							"检测机构：暂无数据");
					$(".jiance_date").html("检测日期：暂无数据");
					$(".ph").html("--");
					$(".ph1").show();
					$(".ec").html("--");
					$(".ec1").show();
					$(".pb").html("--");
					$(".pb").show();
					$(".jilu").show();
				}
			}
		}
    }
    
    /**
     * 地块编辑弹出框初始化 分组,农户等下拉框
     * @param type
     * @param baseId
     * @param tunnel_group
     * @param farmerVal1
     * @param farmerVal2
     */
    function initTunnelSelect(type,baseId,tunnel_group,farmerVal1,farmerVal2){
    	var gorup_str = defaultgroup;
		for(var i = 0;i<groupList.length;i++){
			var item = groupList[i];
			if(baseId == item.base_id){
				gorup_str += "<option value='"+item.group_id+"'>"+item.name+"</option>";
			}
		}
		var farmer1 = defaultfarmer;
		var farmer2 = defaultfarmer;
    	if(type==8){
    		farmer1 = initTunnelFarmer(farmer1,3,baseId);
    		farmer2 = initTunnelFarmer(farmer2,4,baseId);
			$("#group_groupId1").empty().append(gorup_str);
			$('#group_farmer2').empty().append(farmer1);
			$('#group_farmer3').empty().append(farmer2);
			$('#group_farmer2').val(farmerVal1);
			$('#group_farmer3').val(farmerVal2);
			$('#group_farmer2').selectpicker("refresh");
	    	$('#group_farmer3').selectpicker("refresh");
	    	$("#group_groupId1").val(tunnel_group);
	    	$("#group_groupId1").selectpicker("refresh");
		}else{
			farmer1 = initTunnelFarmer(farmer1,1,baseId);
			farmer2 = initTunnelFarmer(farmer2,2,baseId);
			$("#group_groupId").empty().append(gorup_str);
	    	$("#group_groupId").val(tunnel_group);
	    	$("#group_groupId").selectpicker("refresh");
			$('#group_farmer').empty().append(farmer1);
			$('#group_farmer1').empty().append(farmer2);
			$('#group_farmer').val(farmerVal1);
			$('#group_farmer1').val(farmerVal2);
			$('#group_farmer').selectpicker("refresh");
	    	$('#group_farmer1').selectpicker("refresh");
		}
    	
    	
    }
    
    function initTunnelFarmer(optionStr,farmer_type,baseId){
    	for(var i = 0;i<farmerList.length;i++){
			var item = farmerList[i];
			if((baseId == item.base_id || item.base_id == "" || item.base_id == null)&& item.farmer_type == farmer_type){
				optionStr += "<option value='"+item.farmer_id+"'>"+item.name+"</option>";
			}
		}
    	return optionStr;
    }
    
    /**
     * 分区下拉框 赋值
     * @param baseId
     */
    function insertPartitionSelectOption(baseId){//
    	$("#tunnel_info_partitions_id").empty();
    	$("#tunnel_info_partitions_id").append(noneOption);
		var features = partitionsSource.getFeatures();
		for(var i = 0;i<features.length;i++){
			var os = features[i];
			if(os.get("base_id_") == baseId)
				$("#tunnel_info_partitions_id").append("<option value='"+os.get("partitions_id_")+"'>"+os.get("name_")+"</option>");
		}
  		$("#tunnel_info_partitions_id").selectpicker("refresh");
  	}
    
    /**
     * 地块类型选择事件
     */
    $('.plantEnvir > div').click(function(){
//    	var type_id = $("#plant_env_type").val();
		if($(this).index()+1==8){
//			if($(".rteic").length>3 && type_id < 8){
//				alert("已存在种植记录,无法更换类型!");
//				return ;
//			}
			$('.breedList').empty();
			$(".noBreed_records").show();
			$(".animal_hide").show();
			$(".plant_hide").hide();
		}else{
//			if($(".breedPic").length>0 && type_id == 8){
//				alert("已存在养殖记录,无法更换类型!");
//				return ;
//			}
			$(".realplantlist div[onclick^='edit']").remove();
			$(".apslist div[onclick^='edit']").remove();
			$(".hislist div[onclick^='edit']").remove();
			$(".animal_hide").hide();
			$(".plant_hide").show();
		}
		$(this).addClass('active').siblings().removeClass('active');	
		$("#plant_env_type").val($(this).index()+1);
	});
    
    /**
     * 地块提交验证
     * @returns {Boolean}
     */
    function saveTunnelInfos(){
    	var name = $("#tunnel_info_name").val();
		if(name==""){
	        alert("请填写区域名称!")
	        return false;
	    }
		if(name.length>45){
			alert("区域名称长度不能超过45个字符!")
			return false;
		}
		var reg = /^\d+(?=\.{0,1}\d+$|$)/
		var val = $("#tunnel_info_area").val();
		if(isNaN(val) || val == '' || !reg.test(val)){
			alert("请填写正确的亩数!");
			return false;
		}
		var feature = null;
		var id = $("#tunnel_info_id").val();
		if(id == ""){
			feature = source.getFeatureById("tunnel_info_"+$("#tunnel_info_index").val());
		}else{
			feature = tunnelInfoSource.getFeatureById("tunnel_info_"+$("#tunnel_info_index").val());
		}
		
		if(feature == null){
			alert("请取消重试!");
			return ;
		}
    	
    	var coordinates = writer.writeGeometry(feature.getGeometry().clone().transform("EPSG:3857","EPSG:4326"));
    	$("#tunnel_info_coordinate_group").val(coordinates);
    	var latlng = feature.getGeometry().getInteriorPoint().getCoordinates();
		latlng = ol.proj.transform(latlng, 'EPSG:3857', 'EPSG:4326');
		$("#tunnel_info_coordinate_X").val(latlng[1]);
		$("#tunnel_info_coordinate_Y").val(latlng[0]);
		var type = $("#plant_env_type").val();
		if(type == 8){
			$("#tunnel_info_keeper_info").val($("#group_farmer2").val());
			$("#tunnel_info_master_info").val($("#group_farmer3").val());
			$("#tunnel_info_group").val($("#group_groupId1").val());
		}else{
			$("#tunnel_info_keeper_info").val($("#group_farmer").val());
			$("#tunnel_info_master_info").val($("#group_farmer1").val());
			$("#tunnel_info_group").val($("#group_groupId").val());
		}
		
    	var method = $("#tunnel_info_id").val()==""?"tunnel_info_add":"tunnel_info_update";
    	showTips();
    	$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':method,
				'field':"{'enterprise_info_id':"+enter_id+",'form':'"+encodeURIComponent($('#groupForm').serialize())+"'}"
			},
			success: function( response ) {
				hideTips();
				saveTunnelInfosNext(response);
			},
			error: function(e) {
				hideTips();
			}
		});	
    }
    
    /**
     * 将返回的对象属性,保存到Feature 的properties 中
     * @param response
     */
    function saveTunnelInfosNext(response){
    	if(response.invoke_result == "INVOKE_SUCCESS"){
    		var data = response.data;
			var tunnel_info_id = data.tunnel_info_id;
			var feature = source.getFeatureById("tunnel_info_" + $("#tunnel_info_index").val());
			if(feature == null)
				feature = tunnelInfoSource.getFeatureById("tunnel_info_" + $("#tunnel_info_index").val());
	    	feature.set("tunnel_info_base_id_",$("#tunnel_info_base_id").val());
	    	feature.set("tunnel_info_partitions_id",$("#tunnel_info_partitions_id").val());
	    	feature.set("tunnel_info_id",$("#tunnel_info_id_").val());
	    	feature.set("name_",$("#tunnel_info_name").val());
	    	feature.set("tunnel_info_area_",$("#tunnel_info_area").val());
	    	feature.set("tunnel_info_color_",$("#tunnel_info_color").val());
	    	var type = $("#plant_env_type").val();
	    	feature.set("tunnel_info_type_",type);
	    	var imgurl = nonesrc;
			if(type == 8){
				feature.set("tunnel_info_keeper_info_",$("#group_farmer2").val());
				feature.set("tunnel_info_master_info_",$("#group_farmer3").val());
				feature.set("tunnel_info_tunnel_group_id_",$("#group_groupId1").val());
				imgurl = animalsrc;
			}else{
				feature.set("tunnel_info_keeper_info_",$("#group_farmer").val());
				feature.set("tunnel_info_master_info_",$("#group_farmer1").val());
				feature.set("tunnel_info_tunnel_group_id_",$("#group_groupId").val());
			}
			var color = $("#tunnel_info_color").val();
       		var style = feature.getStyle();
       		style.getFill().setColor("rgba("+color.colorRgb()+", 0.45)");
       		style.getStroke().setColor(color);
			style.getStroke().setLineDash(null);
			feature.setStyle(style);
			backname = feature.get("name_");
			var id = $("#tunnel_info_id").val();
			if(id==""){
				feature.set("tunnel_info_id_",tunnel_info_id);
				tunnelInfoSource.addFeature(feature);
			}
			var center = tunnelCenterPointSource.getFeatureById(feature.getId());
			
			source.clear();
			if(doubleClickSelect != null)
	    		doubleClickSelect.getFeatures().clear();
	    	featurelCoordinates = null;
			draw = null;
			closeDoor();
			addDoubleEvent();
		}else{
			log(response.invoke_message)
		}
    }
    
    /**
     * 取消地块编辑
     */
    function cancelTunnelInfos(){
    	var feature = tunnelInfoSource.getFeatureById("tunnel_info_"+$("#tunnel_info_index").val());
    	if(feature != null){
    		var style_ = feature.getStyle();
			style_.getStroke().setLineDash(null);
			feature.setStyle(style_);
    	}
    	
    	draw = null;
    	source.clear();
    	if(doubleClickSelect != null)
    		doubleClickSelect.getFeatures().clear();
    	featurelCoordinates = null;
		closeDoor();
    }
    
    /**
     * 删除地块
     * @param id
     */
    function deleteTunnelInfos(id){
    	if(id==""){
    		cancelPartitions();
    	}
    	if(!window.confirm("确定删除么?")){
    		return;
    	}
    	showTips();
    	$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':'tunnel_info_delete',
				'field':"{'enterprise_info_id':"+enter_id+",'tunnel_info_id':"+id+"}"
			},
			success: function( response ) {
				hideTips();
				if(response.invoke_result == "INVOKE_FAILURE"){
					alert(response.invoke_message);
					return;
				}
				var tunnelIndexStr = "tunnel_info_"+$("#tunnel_info_index").val();
				var tunnelInfo = tunnelInfoSource.getFeatureById(tunnelIndexStr);
				tunnelInfoSource.removeFeature(tunnelInfo);
				var wenzi = tunnelInfoTextSource.getFeatureById(tunnelIndexStr);
				if(wenzi != null)
					tunnelInfoTextSource.removeFeature(wenzi);
				var center = tunnelCenterPointSource.getFeatureById(tunnelIndexStr);
				if(center != null)
					tunnelCenterPointSource.removeFeature(center);
				source.clear();
				if(doubleClickSelect != null)
		    		doubleClickSelect.getFeatures().clear();
				featurelCoordinates = null;
				closeDoor();
			},
			error: function(e) {
				hideTips();
				//log(2);
			}
		});	//-----end
    }
    
    function nonecheck(){
    	 $("select").not("#group_farmer,#group_farmer1,#group_farmer2,#group_farmer3,#group_groupId").each(function(){
    			if($(this).find("option").length==0){
    				$(this).append(noneOption);
    			}
    		});
    	 $("#group_farmer,#group_farmer1,#group_farmer2,#group_farmer3").append(defaultfarmer);
        $("#group_groupId").append(defaultgroup);
    }
    
    /**
     * 初始化地块列表
     */
    function initList() {
    	if(!isFirstOK){
    		setTimeout(function(){initList();}, 500);
    		return;
    	}
    	var mark3Array = tunnelJson.value;
    	map1.clear();//区域
    	for(var i = 0;i<mark3Array.length;i++){
    		var obj = mark3Array[i];
    		if(obj.latlngBounds.coordinates==null)
    			continue;
    		var partition_id = obj.partitions_id;
    		if(map2.has(partition_id)){
    			obj.partition_name = map2.get(partition_id);
    		}else{
    			obj.partition_name = "";
    		}
    		if(map1.has(partition_id)){
    			var tempArray = map1.get(partition_id);
    			tempArray.push(obj);
    			map1.set(partition_id,tempArray);
    		}else{
    			var tempArray = new Array();
    			tempArray.push(obj);
    			map1.set(partition_id,tempArray);
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
    		var p_name = list[0].partition_name;
    		p_name = p_name==""?"无所属区域":p_name;
    		html+='<div class="needdis" style="width:100%; display:block; margin-bottom:10px;" id="rightPart'+list[0].partitions_id+'"><div class="aqu2"><table width="100%" cellspacing="0" cellpadding="0">'+
        	'<tbody><tr><td align="left"><div class="quyu">'+p_name+'</div></td><td align="right" class="sjj_08">'+
            '<img width="14" height="19" src="/asset/images/sjj_down.jpg" aa="true" style="cursor:pointer"/></td></tr></tbody></table></div><ul class="aqu_ul" style="min-width:320px;">';
    		for(var j = 0;j<list.length;j++){
    			var total = 0;
    			var obj = list[j];
    				html+='';
    				html+='<li class="aqu_li" id="rightTunnel'+obj.tunnel_id+'"><table cellpadding="0" cellspacing="0" width="100%"><tr><td align="left" class="_classname_"><a href="javascript:void(0);" class="_tunnel_name"  onclick="gotoMap('+obj.tunnel_id+')">'+obj.name+'</a></td>'
    					+'<td rowspan="2" class="tc_str_hjtj">';
    			if(obj._group_type==8){
    				var timg = "aqu_bg";
    				html+='</td></tr> <tr><td class="mus">可用'+obj.area.toFixed(2)+'亩 &nbsp;&nbsp;&nbsp;&nbsp;  总'+obj.mu_number.toFixed(2)+'亩</td></tr></table></li>';
    				html=html.replace("_classname_",timg);
    			}else{
    				var temps = "aqu_bg";
    				html+='</td></tr> <tr><td class="mus">可种植'+obj.area.toFixed(2)+'亩 &nbsp;&nbsp;&nbsp;&nbsp;  总'+(obj.mu_number!=null ? obj.mu_number.toFixed(2) : "")+'亩</td></tr></table></li>';
    				html=html.replace("_classname_",temps);
    			}
    		}
    		html+='</ul><div class="clear"></div></div>';
    	}
    	$("._area0").empty();
    	$("._area0").append(html);
    	$("._area0 img").click(function(){
    		$(this).closest('.needdis').find("ul").toggle();
        	if($(this).attr("aa")=="true"){
        		$(this).attr("aa","false");
        		$(this).attr("src","/asset/images/sjj_left.jpg");
        	}else{
        		$(this).attr("aa","true");
        		$(this).attr("src","/asset/images/sjj_down.jpg");
        	}
    	});
    	mark3Array = null;
    	tunnelJson.value = null;
    }

    /**
     * 地块列表搜索
     */
    function searchs(){
    	var val = $("#tc_top_input").val();
    	if(val==""){
    		$("._area0 ._tunnel_name").closest(".aqu_li").show();
    		$("._area0 .needdis").show();
    		return;
    	}
    	$("._area0 ._tunnel_name").not(":contains("+val+")").closest(".aqu_li").hide();
    	$("._area0 ._tunnel_name:contains("+val+")").closest(".aqu_li").show();
    	$("._area0 .needdis").each(
    			function(){
    				var x = $(this).find("li:visible").length;
    				if(x==0)
    					$(this).hide();
    			}
    	);
    }
    
    /**
     * 地块列表 中地块和地图polygon 联动
     * @param id
     */
    function gotoMap(id){
    	tunnelInfoSource.forEachFeature(function(feature){
    		if(id == feature.get("tunnel_info_id_")){
    			doubleClickSelect.dispatchEvent({
      			  type: 'select',
      			  selected: [feature],
      			  deselected: []
      			});
    			omap.getView().setCenter(feature.getGeometry().getInteriorPoint().getCoordinates());
    			omap.getView().setZoom(18);
    		}
    	},id);
    }
    
    /**
     * 地图分层操作
     */
    function mapLayerOperate(layerValue,checkFlag){
    	if(checkFlag){//显示
    		if(layerValue=="area"){//区域
    			setBaseNotNull();
    			setMarkerNotNull();
    			setPartitionNotNull();
    			setTunnelNotNull(0);
    		}else if(layerValue=="base"){//基地
    			setBaseNotNull();
    			setMarkerNotNull();
    		}else if(layerValue=="partition"){//分区
    			setPartitionNotNull();
    		}else if(layerValue=="tunnel"){//地块
    			setTunnelNotNull(0);
    		}else if(layerValue.indexOf("env_type_")!=-1){//大棚
    			setTunnelNotNull(layerValue.substring(9));
    		}
    		if(layerValue=="video"  || layerValue=="device_0"){//设备或摄像头
    			setVideoNotNull();
    		}
    		if(layerValue.indexOf("device_")!=-1){//设备、传感器、气象站
    			setDeviceNotNull(layerValue.substring(7));
    		}
    		if(layerValue=="krpano" || layerValue=="image"){//图片、四季田景
    			setKrpanoNotNull();
    		}
    	}else{//隐藏
    		if(layerValue=="area"){//区域
    			setBaseNull();
    			setMarkerNull();
    			setPartitionNull();
    			setTunnelNull(0);
    		}else if(layerValue=="base"){
    			setBaseNull();
    			setMarkerNull();
    		}else if(layerValue=="partition"){
    			setPartitionNull();
    		}else if(layerValue=="tunnel"){
    			setTunnelNull(0);
    		}else if(layerValue.indexOf("env_type_")!=-1){
    			setTunnelNull(layerValue.substring(9));
    		}
    		if(layerValue=="video" || layerValue=="device_0"){
    			setVideoNull();
    		}
    		if(layerValue.indexOf("device_")!=-1){
    			setDeviceNull(layerValue.substring(7));
    		}
    		if(layerValue=="krpano" || layerValue=="image"){
    			setKrpanoNull();
    		}
    	}	
    }
    
    /**
     * 隐藏中心点
     */
    function setMarkerNull() {
    	markerVector.setVisible(false);
    	baseTextVector.setVisible(false);
    }
    /**
     * 显示中心点
     */
    function setMarkerNotNull() {
    	markerVector.setVisible(true);
    	baseTextVector.setVisible(true);
    }
    /**
     * 隐藏基地
     */
    function setBaseNull() {	
    	baseVector.setVisible(false);
    }
    /**
     * 显示基地
     */
    function setBaseNotNull() { 
    	baseVector.setVisible(true);
    }

    /**
     * 隐藏分区
     */
    function setPartitionNull() {	
    	partitionsVector.setVisible(false);
    	partitionTextVector.setVisible(false);
    }
    /**
     * 显示分区
     */
    function setPartitionNotNull() {
    	partitionsVector.setVisible(true);
    	partitionTextVector.setVisible(true);
    }
    
    var emptyStyle = new ol.style.Style({});
    
    /**
     * 隐藏地块
     * @param tunnel_type
     */
    function setTunnelNull(tunnel_type) {	
    	tunnelInfoSource.forEachFeature(function(feature){
			if(tunnel_type == 9 || tunnel_type == 0){
				var center = tunnelCenterPointSource.getFeatureById(feature.getId());
    			var style1 = center.getStyle();
    			center.setStyle(emptyStyle);
    			center.set("back_style",style1);
				var wenzi = tunnelInfoTextSource.getFeatureById(feature.getId());
				var style2 = wenzi.getStyle();
				wenzi.setStyle(emptyStyle);
    			wenzi.set("back_style",style2);
			}
			if(tunnel_type == feature.get("tunnel_info_type_") || tunnel_type==0){
				var style = feature.getStyle();
    			feature.setStyle(emptyStyle);
    			feature.set("back_style",style);
			}
    	},tunnel_type);
    }
    /**
     * 显示地块
     * @param tunnel_type
     */
    function setTunnelNotNull(tunnel_type) {
    	tunnelInfoSource.forEachFeature(function(feature){
			if(tunnel_type == 9 || tunnel_type == 0){
    			var center = tunnelCenterPointSource.getFeatureById(feature.getId());
    			var style1 = center.get("back_style");
    			center.setStyle(style1);
    			center.set("back_style",null);
    			
				var wenzi = tunnelInfoTextSource.getFeatureById(feature.getId());
				var style2 = wenzi.get("back_style");
				wenzi.setStyle(style2);
    			wenzi.set("back_style",null);
			}
			if(tunnel_type == feature.get("tunnel_info_type_") || tunnel_type==0){		
				var style = feature.get("back_style");
    			feature.setStyle(style);
    			feature.set("back_style",null);
			}
    	},tunnel_type);
    }
    /**
     * 隐藏设备
     */
    function setDeviceNull(device_type) {	
    	deviceSource.forEachFeature(function(feature){
    		if(device_type == 0 && feature.getStyle() != emptyStyle){
    			var style = feature.getStyle();
    			feature.setStyle(emptyStyle);
    			feature.set("back_style",style);
    		}else if(device_type == 1 && feature.get("ftype") == DEVICE && feature.getStyle() != emptyStyle){
				var style = feature.getStyle();
    			feature.setStyle(emptyStyle);
    			feature.set("back_style",style);
			}else if(device_type == 2 && feature.get("ftype") == WEATHER_STATION && feature.getStyle() != emptyStyle){
				var style = feature.getStyle();
    			feature.setStyle(emptyStyle);
    			feature.set("back_style",style);
			}
    	},device_type);
    }
    /**
     * 显示设备
     */
    function setDeviceNotNull(device_type) {
    	deviceSource.forEachFeature(function(feature){
    		if(device_type == 0){
    			var style = feature.get("back_style");
    			feature.setStyle(style);
    			feature.set("back_style",null);
    		}else if(device_type == 1 && feature.get("ftype") == DEVICE ){
    			var style = feature.get("back_style");
    			feature.setStyle(style);
    			feature.set("back_style",null);
			}else if(device_type == 2 && feature.get("ftype") == WEATHER_STATION ){
				var style = feature.get("back_style");
    			feature.setStyle(style);
    			feature.set("back_style",null);
			}
    	},device_type);
    }

    /**
     * 隐藏摄像头
     */
    function setVideoNull() {	
    	videoVector.setVisible(false);
    }
    /**
     * 显示摄像头
     */
    function setVideoNotNull() {
    	videoVector.setVisible(true);
    }

    /**
     * 隐藏四季田景 
     */
    function setKrpanoNull() {	
    	krpanoVector.setVisible(false);
    	krpanoTextVector.setVisible(true);
    }
    /**
     * 显示隐藏四季田景
     */
    function setKrpanoNotNull() {
    	krpanoTextVector.setVisible(true);
    	krpanoVector.setVisible(true);
    }
    
    /**
     * 关闭视频弹出框
     */
    function closeVideo() {
    	$('#login3').hide();
    	$("#videoViewShow").attr("src","");
    	$("#video_iframe").hide();
    }
    
    /**
     * 打开传感器展示框
     * @param feature
     */
    function openDeviceWindow(feature){
    	$.getJSON("/environmentaldata?sn="+ feature.get("sn_")+ "&type=0")
		.done(function(data) {
			if(feature.get("device_type_id_")==101)
				$(".maptck .titlefont").html("奥科美二合一传感器");
			else if(feature.get("device_type_id_")==102)
				$(".maptck .titlefont").html("奥科美四合一传感器");
			else if(feature.get("device_type_id_")==103)
				$(".maptck .titlefont").html("奥科美六合一传感器");
			if (data.airTemp == undefined) {
				$(".maptck .t1_sn").html("编号："+ feature.get("sn_"));
				$(".maptck .t1_airTemp").html("暂无数据");
				$(".maptck .t1_airHumidity").html("");
				$(".maptck .t1_soilTemp").html("");
				$(".maptck .t1_soilHumidity").html("");
				$(".maptck .t1_ludian").html("");
				$(".maptck .t1_illumination").html("");
				$(".maptck .t1_co2").html("");
				$(".maptck .ludian").hide();
				$(".maptck .t1_gentime").html("");
				$(".maptck .ckxx").attr("onclick", "");
			} else {
				$(".maptck .t1_sn").html("编号："+ feature.get("sn_"));
				$(".maptck .ludian").show();
				if (parseFloat(data.airTemp) > -99)
					$(".maptck .t1_airTemp").html(parseFloat(data.airTemp).toFixed(1)+ " ℃");
				else
                	$(".maptck .t1_airTemp").html("－－℃");

				if (parseFloat(data.airHumidity) > -99)
					$(".maptck .t1_airHumidity").html("湿度："+ parseFloat(data.airHumidity).toFixed(1)+ " %");
				else
					$(".maptck .t1_airHumidity").html("湿度：－－%");

				if (parseFloat(data.soilTemp) > -99)
					$(".maptck .t1_soilTemp").html("温度 "+ parseFloat(data.soilTemp).toFixed(1)+ " ℃");
				else
					$(".maptck .t1_soilTemp").html("");

				if ($(".maptck .t1_soilTemp").html() == "") {
                    if(parseFloat(data.soilHumidity)>-99){
                        $(".maptck .t1_soilTemp").html("湿度 "+parseFloat(data.soilHumidity).toFixed(1)+" %");
                        $(".maptck .t1_soilHumidity").html("")
                    }else
						$(".maptck .t1_soilTemp").html("");
				} else {
					if (parseFloat(data.soilHumidity) > -99)
						$(".maptck .t1_soilHumidity").html("湿度 "+ parseFloat(data.soilHumidity).toFixed(1)+ " %");
					else
						$(".maptck .t1_soilHumidity").html("");
				}
				
                if(parseFloat(data.airTemp)<-99||parseFloat(data.airHumidity)<-99){
                    $(".maptck .t1_ludian").html("露点：－－ ℃");
                }else{
                    if(parseFloat(data.ludian)>-99)
                        $(".maptck .t1_ludian").html("露点："+parseFloat(data.ludian).toFixed(1)+" ℃");
                    else
                        $(".maptck .t1_ludian").html("");
                }

				if (parseFloat(data.illumination) > -99)
					$(".maptck .t1_illumination").html(parseFloat(data.illumination).toFixed(0)+ " LUX");
				else
					$(".maptck .t1_illumination").html("－－ LUX");


				if (parseFloat(data.co2) > -99)
					$(".maptck .t1_co2").html(parseFloat(data.co2).toFixed(0)+ " ppm");
				else
					$(".maptck .t1_co2").html("");

				$(".maptck .t1_gentime").html("采集时间："+ data.genTime);
				var str = "/growth/TunnelInfoView.seam?tunnelInfoId=" + feature.get("device_id_") + "&actionMethod=webgis%2FWebGisAPS.xhtml%3AsessionTake.setWorkParam%283%29";
				
				$(".maptck .ckxx").attr("onclick", "top.window.location.href = '"+str+"'");
			}
			var coordinate = feature.getGeometry().getCoordinates();
			devicePopup.setPosition(coordinate);
            $(".deviceElement").popover({
              'placement': 'top',
              'html': true,
              'content': feature.get('name')
            });
            var obj = $(".maptck");
            $(".deviceElement").popover('show');
            $("#deviceElement").html(obj.clone()[0]);
            $("#deviceElement").show();
            var view = omap.getView();
            view.setZoom(19);
            view.setCenter(coordinate);
		});
    }
    
    /**
     * 打开气象站弹出框
     * @param feature
     */
    function openWeatherStationWindow(feature){
    	$(".qixz .t2_sn").html("编号："+feature.get("sn_"));
    	$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':'find_weather_station_data',
				'field':"{'enterprise_info_id':"+enter_id+",'sn':'"+feature.get("sn_")+"'}"
			},
			success: function( response ) {
				if ($.isEmptyObject(response.result_data)) {
					$(".qixz .t2_air_temp").html("无数据");
					$(".qixz .t2_air_humidity").html("");
					$(".qixz .t2_soil_temp").html("");
					$(".qixz .t2_soil_humidity").html("");
					$(".qixz .t2_illumination").html("");
					$(".qixz .t2_wind_velocity").html("");
					$(".qixz .t2_atmospheric_pressure").html("");
					$(".qixz .t2_solar_radiation").html("");
					$(".qixz .t2_rainfallS").html("");
					$(".qixz .t2_soil_humidity2").html("");
					$(".qixz .t2_gen_time").html("");
					$(".qixz .qckxx2").attr("onclick","");
				} else {
					var tempp = response.result_data;
					if (parseFloat(tempp.air_temp) > -99)
						$(".qixz .t2_air_temp").html(tempp.air_temp + " ℃");
					else
						$(".qixz .t2_air_temp").html("");

					if (parseFloat(tempp.air_humidity) > -99)
						$(".qixz .t2_air_humidity")
								.html("湿度 " + tempp.air_humidity + " %");
					else
						$(".qixz .t2_air_humidity").html("");

					if (parseFloat(tempp.soil_temp) > -99)
						$(".qixz .t2_soil_temp").html("温度 " + tempp.soil_temp + " ℃");
					else
						$(".qixz .t2_soil_temp").html("");

					if (parseFloat(tempp.soil_humidity) > -99) {
						if ($(".qixz .t2_soil_temp").html() == "") {
							$(".qixz .t2_soil_temp").html(
									"湿度 " + tempp.soil_humidity + " %");
							$(".qixz .t2_soil_humidity").html("");
						} else {
							$(".qixz .t2_soil_humidity").html(
									"湿度 " + tempp.soil_humidity + " %");
						}
					} else
						$(".qixz .t2_soil_humidity").html("");

					if (parseFloat(tempp.soil_humidity2) > -99) {
						if ($(".qixz .t2_soil_temp").html() == "") {
							$(".qixz .t2_soil_temp").html(
									"湿度2 " + tempp.soil_humidity2 + " %");
							$(".qixz .t2_soil_humidity2").html("");
						} else if ($(".qixz .t2_soil_humidity").html() == "") {
							$(".qixz .t2_soil_humidity").html(
									"湿度2 " + tempp.soil_humidity2 + " %");
							$(".qixz .t2_soil_humidity2").html("");
						} else {
							$(".qixz .t2_soil_humidity2").html(
									"湿度2 " + tempp.soil_humidity2 + " %");
						}
					} else
						$(".qixz .t2_soil_humidity2").html("");

					if (parseFloat(tempp.illumination) > -99)
						$(".qixz .t2_illumination").html(
								"光照 " + tempp.illumination + " LUX");
					else
						$(".qixz .t2_illumination").html("");

					if (parseFloat(tempp.solar_radiation) > -99) {
						if ($(".qixz .t2_illumination").html() == "") {
							$(".qixz .t2_illumination").html(
									"辐射 " + tempp.solar_radiation + " w/㎡");
							$(".qixz .t2_solar_radiation").html("");
						} else
							$(".qixz .t2_solar_radiation").html(
									"辐射 " + tempp.solar_radiation + " w/㎡");
					} else
						$(".qixz .t2_solar_radiation").html("");

					$(".qixz .t2_wind_velocity").html(
							tempp.wind_velocity + " " + tempp.wind_direction);
					if (parseFloat(tempp.atmospheric_pressure) > -99)
						$(".qixz .t2_atmospheric_pressure").html(
								tempp.atmospheric_pressure + " hPa");
					else
						$(".qixz .t2_atmospheric_pressure").html("");

					if (tempp.rainfallS == "" )
						$(".qixz .t2_rainfallS").html("");
					else
						$(".qixz .t2_rainfallS").html("降水量 " + tempp.rainfallS + " mm");

					if (parseFloat(tempp.pm25) > -99)
						$(".qixz .pm25").html(tempp.pm25);
					else
						$(".qixz .pm25").html("");

					$(".qixz .t2_gen_time").html("采集时间 :" + tempp.gen_time);

					var a1 = false;
					$(".qixz .shujutd1").each(function(index) {
						if ($(this).html() != "" && index != 0) {
							a1 = true;
							return false;
						}
					})
					if (!a1)
						$(".qixz .shujutd1").hide();
					else
						$(".qixz .shujutd1").show();

					var a2 = false;
					$(".qixz .shujutd2").each(function(index) {
						if ($(this).html() != "" && index != 0) {
							a2 = true;
							return false;
						}
					})
					if (!a2)
						$(".qixz .shujutd2").hide();
					else
						$(".qixz .shujutd2").show();

					var a3 = false;
					$(".qixz .shujutd3").each(function(index) {
						if ($(this).html() != "" && index != 0) {
							a3 = true;
							return false;
						}
					})
					if (!a3)
						$(".qixz .shujutd3").hide();
					else
						$(".qixz .shujutd3").show();

					var a4 = false;
					$(".qixz .shujutd4").each(function(index) {
						if ($(this).html() != "" && index != 0) {
							a4 = true;
							return false;
						}
					})
					if (!a4)
						$(".qixz .shujutd4").hide();
					else
						$(".qixz .shujutd4").show();

					if ($(".td1_:eq(1)").html() == "")
						$(".td1_").hide();
					else
						$(".td1_").show();

					if ($(".td2_:eq(1)").html() == "")
						$(".td2_").hide();
					else
						$(".td2_").show();

					if ($(".td3_:eq(1)").html() == " ")
						$(".td3_").hide();
					else
						$(".td3_").show();

					var str = "/growth/TunnelInfoView.seam?weatherstation=" + feature.get("device_id_") + "&actionMethod=webgis%2FWebGisAPS.xhtml%3AsessionTake.setWorkParam%284%29";
					$(".qixz .qckxx2").attr( "onclick","top.window.location.href ='"+str+"'");
				}
				var coordinate = feature.getGeometry().getCoordinates();
				devicePopup.setPosition(coordinate);
	            $(".deviceElement").popover({
	              'placement': 'top',
	              'html': true,
	              'content': feature.get('name')
	            });
	            var obj = $(".qixz");
	            $(".deviceElement").popover('show');
	            $("#deviceElement").html(obj.clone()[0]);
	            $("#deviceElement").show();
	            var view = omap.getView();
	            view.setZoom(19);
	            view.setCenter(coordinate);
			},
			error: function(e) {
				//log(2);
			}
		});	//-----end
    }
    
    /**
     * 欣赏四季田景
     * @param feature
     */
    function openPanoramaWindow(feature){
    	var bid ;
		if(base_id == "null")
			bid = "";
		else 
			bid = base_id;
		
		if(feature.get("file_type_") == 1){
			 $("#krpano_iframe").attr("src","/map/Krpano.seam?type=3&krpano_id="+feature.get("krpanos_id_")+"&base_id="+bid+"&enterid="+enter_id);
			 var height = document.body.clientHeight;
			 var width = document.body.clientWidth;
			 $("#krpano_iframe").css({"position":"fixed","z-index":1000});
			 var rightWidth =  $('#rightPane').width();
			 var self_width = width*0.75;
			 var self_height = height*0.75;
			 var of_top = (height-self_height)/2;
			 var of_left = (width-self_width)/2;
			 $("#krpano_iframe").css({"width":self_width,"height":self_height,"left":of_left,"top":(of_top-60)});
			 var div_left = width/2+self_width/2;
			 $("#krpano_iframe").show();
			 $("#krpano_iframe_img").show();
			 $("#krpano_iframe_img").css({"position":"fixed","z-index":1000,"left":div_left,"top":of_top-60});
		}else{
			previewImage(feature.get("file_fold_"));
		}
    }
    
    /**
     * 四季图片展示
     * @param url
     */
    function previewImage(url){
    	$("#previewDiv").show();
    	var height = document.body.clientHeight;
    	var width = document.body.clientWidth;
    	var selfWidth = (width-1024)/2;
    	var selfHeight = (height-768)/2;
    	$("#previewDiv").css({"position":"absolute","z-index":1000,"left":selfWidth,"top":selfHeight});
    	$("#previewDiv img:first").attr("src",url);
    }
    /**
     * 关闭气象站展示窗口
     */
    function closeQxz() {
    	$("#deviceElement").html("");
        $("#deviceElement").hide();
    }

    /**
     * 关闭全景展示弹出框
     */
    function closeKrpanoFrame(){
        $("#krpano_iframe").hide();
        $("#krpano_iframe").attr("src","");
        $("#krpano_iframe_img").hide();
    }

    /**
     * 种植信息展示框
     */
    function openRealPlantWindow(feature){
    	gotoMap(feature.get("tunnel_info_id_"));
    	var tunnel_info = tunnelInfoSource.getFeatureById(feature.getId());
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
    	if(tunnel_info.get("tunnel_info_type_") == 8){//畜牧
    		var tt = 0;
    		var isrc = addanimalsrc;
    		var animalList = tunnel_info.get("animal");
    		var master = "";
    		for(var i = 0;i<farmerList.length;i++){
    			var item = farmerList[i];
    			if(tunnel_info.get("tunnel_info_master_info_") == item.farmer_id && item.farmer_type == 4){
    				master = item.name;
    			}
    		}
    		box_area = tunnel_info.get("tunnel_info_area_");
    		if(animalList == null || animalList.length == 0){
				imgUrl = animalsrc;
				box_title = tunnel_info.get("name_");
    			box_plant = "";
    			box_image = addanimalsrc;
    			box_content = "暂无养殖";
    			$(".zw_bgt2").css("cursor", "default");
    			$(".zw_bgt2").attr("onclick", "");
    			b = false;
    			$(".win_date_1,.win_date_2").hide();
			}else if(animalList.length == 1){
				if(animalList[0].img_round_url != ""){
					isrc = animalList[0].img_round_url + "@60h_60w|60-1ci.png";
				}else if(animalList[0].img_square_url != ""){
					isrc = animalList[0].img_square_url + "@60h_60w|60-1ci.png";
				}else{
					isrc = animalsrc + "@60h_60w|60-1ci.png";
				}
				box_title = tunnel_info.get("name_");
    			box_image = isrc;
    			if (box_image == "")
    				box_image = nonesrc;
    			$(".win_date_1,.win_date_2").show();
    			$(".zw_bgt2").css("cursor", "default");
			}else{
				isrc = moreanimal;
				box_title = tunnel_info.get("name_");
    			box_plant = "多牲畜";
    			box_image = isrc;
    			$(".zw_bgt2").css("cursor", "default");
    			$(".win_date_1,.win_date_2").hide();
			}
    		box_area = parseFloat(box_area).toFixed(2);
    		$(".win_masterId").html("负责人:" + master);
    		$(".div_dt2").html(box_title);
    		$(".div_dt4").html(box_plant);
    		$(".div_dt3").html(box_area + "亩");
    		$(".zw_libg_img2").attr("src", box_image);
    		// $(".div_dt55").html(box_content);
    		var inHtml = $(".div_width").html();
    		if (b) {
    			inHtml = inHtml.replace("addPlant", "nothing");
    		} else {
    			inHtml = inHtml.replace("nothing", "addPlant");
    		}
    		var coordinate = feature.getGeometry().getCoordinates();
            content.innerHTML = inHtml;
            popupOverlay.setPosition(coordinate);
            omap.un("singleclick",singleClickEvent.listener)
    	}else{
    		var realPlantJson = tunnel_info.get("real_plant");
    		var nowPlant = [];
    		/**当前种植 */
			var nowPlant = [];
			/**计划种植 */
			var willPlant = [];
			/**当前种植 年生作物数量>0 */
			var oneb = false;
			/**当前种植 多年生作物数量>0 */
			var twob = false;
			/**计划种植 年生作物数量>0 */
			var willoneb = false;
			/**计划种植 多年生作物数量>0 */
			var willtwob = false;
    		if(realPlantJson != null){
				for (var x = 0; x < realPlantJson.length; x++) {
					var rp = realPlantJson[x];
					if(rp.plant_begin_time == null || rp.plant_end_time == null){
						continue;
					}
					var t1 = new Date(rp.plant_begin_time.$date || rp.plant_begin_time.time);
					var t2 = new Date(rp.plant_end_time.$date || rp.plant_end_time.time);
					if (t1.getTime() <= nowD_.getTime() && t2.getTime() >= nowD_.getTime()){//当前种植
						if(rp.floristics_type == null || rp.floristics_type == 1)//单年生
							oneb = true;
						else if(rp.floristics_type == 2)//多年生
							twob = true;
						nowPlant.push(rp);
					}else if(t1.getTime()>nowD_.getTime()){//计划种植
						if(rp.floristics_type == null || rp.floristics_type == 1)//单年生
							willoneb = true;
						else if(rp.floristics_type == 2)//多年生
							willtwob = true;
						willPlant.push(rp);
					}
						
				}
    		}
    		var master = "暂无数据";
    		for(var i = 0;i<farmerList.length;i++){
    			var item = farmerList[i];
    			if(tunnel_info.get("tunnel_info_master_info_") == item.farmer_id && item.farmer_type == 2){
    				master = item.name;
    			}
    		}
    		
    		var keeper = "暂无数据";
    		for(var i = 0;i<farmerList.length;i++){
    			var item = farmerList[i];
    			if(tunnel_info.get("tunnel_info_keeper_info_") == item.farmer_id && item.farmer_type == 1){
    				keeper = item.name;
    			}
    		}
    		box_area = tunnel_info.get("tunnel_info_area_");
			box_area = parseFloat(box_area).toFixed(2);
			muarea =  tunnel_info.get("tunnel_info_mu_number_");
			muarea = parseFloat(muarea).toFixed(2);
			var name = tunnel_info.get("name_");
    		if (nowPlant.length == 0) {//没有种植
    			$(".notPlant .introPop-header-title h3").html(name);
    			$(".notPlant .introPop-header-title em").html("种植管理员 "+master);
    			$(".notPlant .introPop-header-rt .farmer").html(keeper);
    			$(".notPlant .introPop-header-rt .farmland").html(muarea+"亩/"+box_area+"亩");
    			if (landData.land_test.length == 0) {
    				$(".jiance_mechanism").html("检测机构：暂无数据");
    				$(".jiance_date").html("检测日期：暂无数据");
    				$(".ph").html("--");
    				$(".ph1").show();
    				$(".ec").html("--");
    				$(".ec1").show();
    				$(".pb").html("--");
    				$(".pb").show();
    				$(".jilu").show();
    			} else
    				for (var i = 0; i < landData.land_test.length; i++) {
    					var obj_ = landData.land_test[i];
    					if (obj_.tunnel_info_id == tunnel_info.get("tunnel_info_id_")) {
    						$(".jiance_mechanism").html(
    								"检测机构：" + obj_.test_org);
    						$(".jiance_date").html(
    								"检测日期：" + obj_.test_date);
    						if (obj_.ph_val != "") {
    							$(".ph").html(obj_.ph_val);
    						} else {
    							$(".ph").html("--");
    						}
    						if (obj_.ec_val != "") {
    							$(".ec").html(obj_.ec_val);
    						} else {
    							$(".ec").html("--");
    						}
    						if (obj_.soil_bulk_density != "") {
    							$(".pb").html(obj_.soil_bulk_density);
    						} else {
    							$(".pb").html("--");
    						}
    						$(".jilu").show();
    						break;
    					} else if (i == landData.land_test.length - 1) {
    						$(".jiance_mechanism").html(
    								"检测机构：暂无数据");
    						$(".jiance_date").html("检测日期：暂无数据");
    						$(".ph").html("--");
    						$(".ec").html("--");
    						$(".pb").html("--");
    						$(".jilu").show();
    					}
    				}
    			var temArray = new Array();
    			var temStr = "";
    			for (var i = 0; i < landData.soil_history.length; i++) {
    				var obj_ = landData.soil_history[i];
    				if (obj_.tunnel_info_id == tunnel_info.get("tunnel_info_id_")) {
    					if (temArray.length == 3)
    						break;
    					temArray.push(obj_);
    					var ty1 = landData.data_dic[obj_.soil_data_dic_id];
    					if(typeof(ty1) == "undefined" || ty1 == ""){
    						ty1 = "";
    					}else{
    						ty1 = ty1.name;
    					}
    					var ty2 = "";
    					if(obj_.soils_data_dic_id != null && obj_.soils_data_dic_id != "null" && typeof(landData.data_dic[obj_.soils_data_dic_id]) != "undefined" )
    						ty2 = landData.data_dic[obj_.soils_data_dic_id] ;
    					if(typeof(ty2) == "undefined" || ty2 == ""){
    						ty2 = "";
    					}else{
    						ty2 = ty2.name;
    					}
    					temStr += "<li class='"
    							+ (i > 0 ? "0" + (i + 1) : "")+(temArray.length==2?" histroyJl_date02":"")+(temArray.length==3?" histroyJl_date03":"")
    							+ "'><span>" + obj_.begin_time + "-"
    							+ obj_.end_time + "</span><div style='width:116px;height:28px;overflow:hidden' title='"+ty1+" "+ty2+"'><em>" + ty1 +" "
    							+ ty2 + "</em></div></li>";
    				}
    			}
    			if (temArray.length > 0) {
    				if (temArray.length == 1) {
    					$(".bg_landHistory02").attr("class","bg_landHistory02 landH1");
    				} else if (temArray.length == 2) {
    					$(".bg_landHistory02").attr("class","bg_landHistory02 landH2");
    				} else if (temArray.length == 3) {
    					$(".bg_landHistory02").attr("class","bg_landHistory02 landH3");
    				}
    				$(".notPlant .landHistory_list").empty().append(temStr);
    				$(".shiy").show();
    			} else {
    				$(".bg_landHistory02").attr("class","bg_landHistory02 landH1");
    				temStr = "<li class=''><span>"
    						+ (new Date().getFullYear())
    						+ "-"
    						+ (new Date().getFullYear())
    						+ "</span><div><em>暂无数据</em><em class='colorGrn02'></em></div></li>";
    				$(".notPlant .landHistory_list").empty().append(temStr);
    				$(".shiy").show();
    			}
                content.innerHTML = $(".notPlant")[0].outerHTML;
                
    		} else if (nowPlant.length == 1) {//一个种植
    			var tempPlantImg = nonesrc;
    			if(nowPlant[0].plant_img != "")
    				tempPlantImg = nowPlant[0].plant_img+"@100h_100w|100-1ci.png";
    			$(".onePlant .introPop-header-lt img").attr("src",tempPlantImg);
    			$(".onePlant .introPop-header-title h3").html(name);
    			$(".onePlant .introPop-header-title strong").html(nowPlant[0].breed_name);
    			$(".onePlant .introPop-header-title strong").show();
    			$(".onePlant .introPop-header-title span").hide();
    			$(".onePlant .introPop-header-rt .farmer").html(keeper);
    			var temp_area = nowPlant[0].crop_area ;
    			temp_area = parseFloat(temp_area);
    			temp_area = temp_area.toFixed(2);
    			$(".onePlant .introPop-header-rt .farmland").html(temp_area+"亩/"+box_area+"亩");
    			showinfos2_next(nowPlant[0]);
    			if(!checkLineData(nowPlant[0])){
    				$(".onePlant #container-oneChart").hide();
    			}
    			else{
    				$(".onePlant #container-oneChart").show();
    			}
                content.innerHTML = $(".onePlant")[0].outerHTML;
    		} else if (nowPlant.length > 1) {//多个种植
    			var tempPlantImg = nonesrc;
    			if(nowPlant[0].plant_img != "")
    				tempPlantImg = nowPlant[0].plant_img+"@100h_100w|100-1ci.png";
    			$(".onePlant .introPop-header-lt img").attr("src",tempPlantImg);
    			$(".onePlant .introPop-header-title h3").attr("aa",tunnel_info.get("tunnel_info_id_")).html(name);
    			$(".onePlant .introPop-header-title strong").hide();
    			$(".onePlant .introPop-header-rt .farmer").html(keeper);
    			var options = "";
    			for (var i = 0; i < nowPlant.length; i++) {
    				options += "<option value='"+nowPlant[i].real_plant_id+"' data_id='"+tunnel_info.getId()+"'>"+nowPlant[i].breed_name + "</option>";
    			}
    			$(".onePlant .introPop-header-title select").empty().append(options);
    			$(".onePlant .introPop-header-title span").show();
    			var temp_area = nowPlant[0].crop_area ;
    			temp_area = temp_area.toFixed(2);
    			$(".onePlant .introPop-header-rt .farmland").attr("aa",box_area).html(temp_area+"亩/"+box_area+"亩");
    			showinfos2_next(nowPlant[0]);
    			if(!checkLineData(nowPlant[0])){
    				$(".onePlant #container-oneChart").hide();
    			}
    			else{
    				$(".onePlant #container-oneChart").show();
    			}
        		
        		content.innerHTML = "";
                content.innerHTML = $(".onePlant")[0].outerHTML;
                $(content).find("select").removeClass("notselect");
                $(content).find("select").selectpicker();
    		}
    		var coordinate = feature.getGeometry().getCoordinates();
    		popupOverlay.setPosition(coordinate);
    		var divHeight = $(content).height()+56;
    		
    		calcCenterOffset(divHeight,coordinate);
    		omap.un("singleclick",singleClickEvent.listener);
    	}
    }
    
    /**
     * 中心点需要偏移 设置新的中心点坐标
     */
    function calcCenterOffset(divHeight,coordinate){
    	var windowHeight = $(window).height();
		var halfWindowHeight = windowHeight / 2;
		if(halfWindowHeight < divHeight){
			var diffHeight = divHeight - halfWindowHeight;
			var coordinateOffset = omap.getPixelFromCoordinate(coordinate);
			var up = [coordinateOffset[0] , coordinateOffset[1]-diffHeight];
			omap.getView().setCenter(omap.getCoordinateFromPixel(up));
		}
    }
    
    function checkLineData(obj){
    	if(obj.month1 != null && obj.month1 != ""){
    		return true;
    	}
    	if(obj.month2 != null && obj.month2 != ""){
    		return true;
    	}
    	if(obj.month3 != null && obj.month3 != ""){
    		return true;
    	}
    	if(obj.month4 != null && obj.month4 != ""){
    		return true;
    	}
    	if(obj.month5 != null && obj.month5 != ""){
    		return true;
    	}
    	if(obj.month6 != null && obj.month6 != ""){
    		return true;
    	}
    	if(obj.month7 != null && obj.month7 != ""){
    		return true;
    	}
    	if(obj.month8 != null && obj.month8 != ""){
    		return true;
    	}
    	if(obj.month9 != null && obj.month9 != ""){
    		return true;
    	}
    	if(obj.month10 != null && obj.month10 != ""){
    		return true;
    	}
    	if(obj.month11 != null && obj.month11 != ""){
    		return true;
    	}
    	if(obj.month12 != null && obj.month12 != ""){
    		return true;
    	}
    	
    	return false;
    }

    function resetDate(obj){//弹出框多个种植之间切换
    	var temp;
    	
    	var tunnel_info_id = $(obj).find("option:selected").attr("data_id");
    	var tunnel_info = tunnelInfoSource.getFeatureById(tunnel_info_id);
    	var realPlantJson = tunnel_info.get("real_plant");
    	for(var i = 0;i<realPlantJson.length ;i++){
    		var realPlant = realPlantJson[i];
    		if(realPlant.real_plant_id == obj.value){
    			temp = realPlant;
    		}
    	}
    	var tempImg = nonesrc;
    	if(temp.plant_img != "")
    		temp.plant_img+"@100h_100w|100-1ci.png";
    	$(".onePlant .introPop-header-lt img").attr("src",tempImg);
    	$(".onePlant .introPop-header-title strong").hide();
    	var box_area = $(".onePlant .introPop-header-rt .farmland").attr("aa");
    	var temp_area = temp.crop_area ;
    	temp_area = temp_area.toFixed(2);
    	$(".onePlant .introPop-header-title span").show();
    	$(".onePlant .introPop-header-rt .farmland").html(temp_area+"亩/"+box_area+"亩");
		showinfos2_next(temp);
		if(!checkLineData(temp)){
			$(".onePlant #container-oneChart").hide();
		}
		else{
			$(".onePlant #container-oneChart").show();
		}
    }

    //弹出框中间文字显示
    function showinfos2_next(real){
    	
    	var b,e;	
    	var x = new Array();
    	var y = new Array();
    	if(real.floristics_type==2){
    		var dz = (real.begin_month<10?"0"+real.begin_month:real.begin_month)+"-"+(real.begin_day<10?"0"+real.begin_day:real.begin_day);
    		var cs = (real.harvest_month<10?"0"+real.harvest_month:real.harvest_month)+"-"+(real.harvest_day<10?"0"+real.harvest_day:real.harvest_day);
    		var js = (real.end_month<10?"0"+real.end_month:real.end_month)+"-"+(real.end_day<10?"0"+real.end_day:real.end_day);
    		$(".onePlant .time1 li:eq(0) p").html("落叶休眠<br>"+dz);
    		$(".onePlant .time1 li:eq(1) p").html("采收开始<br>"+cs);
    		$(".onePlant .time1 li:eq(2) p").html("采收结束<br>"+js);
    		$(".onePlant .time2").hide();
    		$(".onePlant .time1").show();
    		b = cs;
      		e = js;
      		b = b.split("-")[0];
      		e = e.split("-")[0];
    	}else{
    		if(real.plant_id==0){
    			$(".onePlant .time2 li:eq(0) p").html("休耕开始<br>"+(new Date(real.harvest_time.$date || real.harvest_time.time )).format(("yyyy-MM-dd")));
    			$(".onePlant .time2 li:eq(1) p").html("休耕结束<br>"+(new Date(real.plant_end_time.$date || real.plant_end_time.time)).format(("yyyy-MM-dd")));
    			$(".onePlant .time2").show();
    			$(".onePlant .time1").hide();
    		}else{
    			$(".onePlant .time1 li:eq(0) p").html("定植时间<br>"+(new Date(real.plant_begin_time.$date || real.plant_begin_time.time)).format(("yyyy-MM-dd")));
    			$(".onePlant .time1 li:eq(1) p").html("采收开始<br>"+(new Date(real.harvest_time.$date || real.harvest_time.time)).format(("yyyy-MM-dd")));
    			$(".onePlant .time1 li:eq(2) p").html("种植结束<br>"+(new Date(real.plant_end_time.$date || real.plant_end_time.time)).format(("yyyy-MM-dd")));
    			$(".onePlant .time2").hide();
    			$(".onePlant .time1").show();
    		}
    		
    		b = (new Date(real.harvest_time.$date || real.harvest_time.time)).format(("yyyy-MM-dd"));
      	  	e = (new Date(real.plant_end_time.$date || real.plant_end_time.time)).format(("yyyy-MM-dd"));
      	    b = b.split("-")[1];
      		e = e.split("-")[1];
    	}
    	
    	if(checkLineData(real)){
    		$(".onePlant #container-oneChart").show();
    		setTimeout(function(){
    			var tob = {}; 
    			for(var t = 1;t<13;t++){
    				var temp = t+"月";
    				var val = real["month"+t];
    				if(val != null && val != ""){
    					tob[temp] = (val*real.crop_area).toFixed(2);
    				}
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
    			$('#container-oneChart').highcharts({
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
    		}, 100)
    	}
    }
    
    
    
    $('.mapRtArea_btns02 .button_').click(function(){
		$(this).addClass('active').siblings().removeClass('active');	
		$("#plant_standard").val($(this).attr("aa"));
		$("#plant_standard_name").val($(this).attr("bb"));
//		getModelByTime($('#breed_new').val(),$('#plant_tunnel_id').val(),$('#plant\\:plant_beginInputDate').val(),$('#plant_standard').val(),$('#plant\\:plant_endInputDate').val(),$('#plant_real_id').val())
//		if($("#breed_new option:selected").attr("cc")=="2"){
//			var tim = $('#zzend').val();
//			if(tim=="")
//				tim="2050-12-31";
//			getModelByTime($('#breed_new').val(),$('#plant_tunnel_id').val(),$('#ymstart').val(),$('#plant_standard').val(),tim,$('#plant_real_id').val())
//		}else{
//			getModelByTime($('#breed_new').val(),$('#plant_tunnel_id').val(),$('#plant\\:plant_beginInputDate').val(),$('#plant_standard').val(),$('#plant\\:plant_endInputDate').val(),$('#plant_real_id').val())
//		}
	});	
    
    /**
     * 种植表单中 品种选择时间
     */
    function changeBreed() {
    	if($("#breed_new").val()==0){
    		$(".modehide").hide();
    		$(".modehidename_1").html("开始时间");
    		$(".modehidename_2").html("结束时间");
    		$(".yinian").show();
    		$(".duonian").hide();
    	}else if(plant_select.find(":selected").data().data.type=="2"){
    		$(".modehide").show();
    		$(".yinian").hide();
    		$(".duonian").show();
    	}else{
    		$(".modehide").show();
    		$(".modehidename_1").html("定植时间");
    		$(".modehidename_2").html("种植结束");
    		$(".yinian").show();
    		$(".duonian").hide();
    	}
    }
    
    /**
     * 添加种植
     * @param index
     */
    function addPlant(index) {
    	$(".baseMap_ttl").css('background','url(/asset/images/baseIcojian1.png) no-repeat 10px 12px center').next('.baseMap_con').show();
    	$(".plotsYield_table input").val("");
    	plant_select.select2("trigger", "select", {
    	    data:{id: "0",plantName:"休耕",plantId:"0",breedName:"无品种",type:"1"}
    	});    	
    	resetHightChart();
    	$(".saveagain-plant").hide();
    	$("#firsttable").show();
    	$("#secondtable").hide();
    	$("#saveagain-plant").addClass("hide");
    	$("#saveagain-plant").unbind("click");
    	$(".secondtable button").unbind("click");
    	$("#aps_type").val(index);
    	$("#yield_type").val(2);
    	$("#edittype").val(1);
    	$("#plant_base_id").val(selectedShape.get("tunnel_info_base_id_"));
    	$("#breed_new").prop("disabled",false);
    	$(".typ1").show();
    	$(".typ2").hide();
    	$("#plant_real_id").val("");
    	$("#scheduleId").val("");
    	$("#tunnel_area").val(selectedShape.get("tunnel_info_area_"));
    	
    	var env_type = selectedShape.get("tunnel_info_type_");
    	$("#env_type").val(env_type);
    	env_type = parseInt(env_type,10)
    	$("#env_type_name").val($(".plantEnvir > div:eq("+(env_type+1)+")").attr("title"));
    	$(".modehide").hide();
    	$(".modehidename_1").html("开始时间");
    	$(".modehidename_2").html("结束时间");
    	$(".yinian").show();
    	$(".duonian").hide();
    	$("#ymstart").val("");
    	$("#ymend").val("");
    	$("#zzend").val("");
    	$("#xiumian").val("");
    	$("#csstart").val("");
    	$("#csend").val("");
    	$("#plant_plantId").val("");
    	$("#plant_beginInputDate").val("");
    	$("#plant_endInputDate").val("");
    	$("#harvest_timeInputDate").val("");
    	$('.mapRtArea_btns02 .button_:eq(0)').trigger("click");
    	$(".nav-tabs1 > li:eq(0)").addClass("active").siblings().removeClass("active");
    	if (selectedShape != null) {
    		$("#plant_parent_name").html(selectedShape.get("name_"));
    		$("#plant_tunnel_id").val(selectedShape.get("tunnel_info_id_"));
    	}
    	var area = selectedShape.get("tunnel_info_area_");
    	area = parseFloat(area);
    	area = area.toFixed(2);
    	$("#plant_area").val(area);
    	$("#plantarea").text(area);
    	
    	$("#sproutSel")[0].selectedIndex = 0;
    	$("#sproutSel").selectpicker('refresh');
        $("#purchaseSource").val("");
        $("#purchaseSourceDiv").hide();
    	    
    	$("#divtittle").text("编辑种植信息");
    	if (index == 0) {
    		$(".divtittle").text("编辑历史信息");
    		$(".aps_typs_name").html("历史种植");
    	} else if (index == 1) {
    		$(".divtittle").text("编辑实际信息");
    		$(".aps_typs_name").html("实际种植");
    	} else if (index == 2) {
    		$(".divtittle").text("编辑计划信息");
    		$(".aps_typs_name").html("计划种植");
    	}

    	$(".rightNo").hide();
    	$(".rightNo6").show();
    }
    
    /**
     * 修改种植
     * @param id
     */
    function editPlant(id) {
    	$(".baseMap_ttl").css('background','url(/asset/images/baseIcojian1.png) no-repeat 10px 12px center').next('.baseMap_con').show();
    	$(".plotsYield_table input").val("");
    	$("#plant_beginInputDate").val("");
    	$("#harvest_timeInputDate").val("");
    	$("#plant_endInputDate").val("");
    	var tunnel_index = $("#tunnel_info_index").val();
    	var tunnel_info = tunnelInfoSource.getFeatureById("tunnel_info_"+tunnel_index);
    	var real_plant = tunnel_info.get("real_plant");
    	$("#plant_base_id").val(tunnel_info.get("tunnel_info_base_id_"));
    	for (var i = 0; i < real_plant.length; i++) {
    		var obj = real_plant[i];
    		if (obj.real_plant_id == id) {
    			var t1 = new Date(obj.plant_begin_time.$date || obj.plant_begin_time.time);
				var t2 = new Date(obj.harvest_time.$date || obj.harvest_time.time);
				var t3 = new Date(obj.plant_end_time.$date || obj.plant_end_time.time);
    			var lktimes = t3.getTime();
    			$("#plant_real_id").val(obj.real_plant_id);
    			var bts = t1.getTime();
    			$("#firsttable").show();
    			$("#secondtable").hide();
    			$(".secondtable button").unbind("click");
    			var aps_type = 0
    			if (lktimes <= nowD.getTime()) {
    				$("#saveagain-plant").removeClass("hide");
    				$("#saveagain-plant").unbind("click");
    				$("#saveagain-plant").bind("click",function(){
    					var data = plant_select.find(":selected").data().data;
    					if(confirm("是否确认再次种植"+(data.plantName+"-"+data.breedName))){
    						renewRealPlant(obj);
    					}
    				});
    				aps_type = 0;
    			} else {
    				$("#saveagain-plant").addClass("hide");
    				if (bts < nowD.getTime()) {
    					aps_type = 1;
    				} else {
    					aps_type = 2;
    				}
    			}
    			plant_select.select2("trigger", "select", {
    			    data:{id: obj.breed_id, breedName:obj.breed_name,plantId:obj.plant_id,plantName:obj.plant_name,type:obj.floristics_type}
    			});
    			plant_select.prop("disabled", "true");
//    			$("#prompt").text("");
    			$(".typ1").show();
    			$(".typ2").hide();
//    			$("#prompt2").html("");
    			$("#plant_real_id").val(id);
    			$("#edittype").val(2);
//    			$("#typeHide").hide();
    			var area = selectedShape.get("tunnel_info_area_");
    			area = parseFloat(area);
    	    	area = area.toFixed(2);
    			$("#tunnel_area").val(area);
    			
    			var env_type = tunnel_info.get("tunnel_info_type_");
    			$("#env_type").val(env_type);
    			

    			if(obj.floristics_type !=null &&obj.floristics_type==2){
    				$("#ymstart").val(t1.format("yyyy-MM-dd"));
    				$("#ymend").val(t2.format("yyyy-MM-dd"));
    				if(t3.format("yyyy-MM-dd")=="2050-12-31"){
    					$("#zzend").val("");
    				}else{
    					$("#zzend").val(t3.format("yyyy-MM-dd"));
    				}
    				$("#xiumian").val((obj.begin_month<10?"0"+obj.begin_month:obj.begin_month)+"-"+(obj.begin_day<10?"0"+obj.begin_day:obj.begin_day));
    				$("#csstart").val((obj.harvest_month<10?"0"+obj.harvest_month:obj.harvest_month)+"-"+(obj.harvest_day<10?"0"+obj.harvest_day:obj.harvest_day));
    				$("#csend").val((obj.end_month<10?"0"+obj.end_month:obj.end_month)+"-"+(obj.end_day<10?"0"+obj.end_day:obj.end_day));
    			}else{
    			
    				$("#plant_beginInputDate").val(t1.format("yyyy-MM-dd"));
    				$("#plant_endInputDate").val(t3.format("yyyy-MM-dd"));
    				if(obj.harvest_time != null)
    					$("#harvest_timeInputDate").val(t2.format("yyyy-MM-dd"));
    				else
    					$("#harvest_timeInputDate").val("");
    			}
    			
    			$("#plant_standard").val(obj.plant_standard);
    			if ($('.mapRtArea_btns02 .button_[aa=' + obj.plant_standard + ']').length == 0) {
    				$('.mapRtArea_btns02 .button_:eq(0)').trigger("click");
    			} else {
    				$('.mapRtArea_btns02 .button_[aa=' + obj.plant_standard + ']').trigger("click");
    			}
    			var crop_area = obj.crop_area;
    			crop_area = parseFloat(crop_area);
    			$("#plant_area").val(crop_area.toFixed(2));
    			$("#myarea").val(obj.crop_area);
    			var area = selectedShape.get("tunnel_info_area_");
    	    	area = parseFloat(area);
    	    	area = area.toFixed(2);
    			$("#plantarea").text(area);
    			
    			setMonth(obj);
    			resetHightChart();
    			$("#sproutSel").selectpicker('val',obj.sprout_source);
    			$("#sproutSel").selectpicker('refresh');
    			$("#purchaseSource").val(obj.purchase_source);
    			
    			$(".list1").hide();
    			$("#realplant").show();
    			if (bts <= nowD.getTime()) {
    				$(".divtittle").text("编辑实际信息");
    				$(".aps_typs_name").html("实际种植");
    			} else {
    				$(".divtittle").text("编辑计划信息");
    				$(".aps_typs_name").html("计划种植");
    			}
    			if (selectedShape) {
    				$("#plant_parent_name").html(selectedShape.get("name_"));
    				$("#plant_tunnel_id").val(selectedShape.get("tunnel_info_id_"));
    			}
    			$(".rightNo").hide();
    	    	$(".rightNo6").show();
    			break;
    		}
    	}
    }
    
    function setMonth(tempData){
    	if (tempData.yield_type == "1") {
			$(".nav-tabs1 > li:eq(1)").addClass("active").siblings().removeClass("active");
			$("#yield_type").val(1);
			if (tempData.month1 && parseFloat(tempData.month1) > 0) {
				$("#month1").val(parseFloat(tempData.month1).toFixed(2));
			}
			if (tempData.month2 && parseFloat(tempData.month2) > 0) {
				$("#month2").val(parseFloat(tempData.month2).toFixed(2));
			}
			if (tempData.month3 && parseFloat(tempData.month3) > 0) {
				$("#month3").val(parseFloat(tempData.month3).toFixed(2));
			}
			if (tempData.month4 && parseFloat(tempData.month4) > 0) {
				$("#month4").val(parseFloat(tempData.month4).toFixed(2));
			}
			if (tempData.month5 && parseFloat(tempData.month5) > 0) {
				$("#month5").val(parseFloat(tempData.month5).toFixed(2));
			}
			if (tempData.month6 && parseFloat(tempData.month6) > 0) {
				$("#month6").val(parseFloat(tempData.month6).toFixed(2));
			}
			if (tempData.month7 && parseFloat(tempData.month7) > 0) {
				$("#month7").val(parseFloat(tempData.month7).toFixed(2));
			}
			if (tempData.month8 && parseFloat(tempData.month8) > 0) {
				$("#month8").val(parseFloat(tempData.month8).toFixed(2));
			}
			if (tempData.month9 && parseFloat(tempData.month9) > 0) {
				$("#month9").val(parseFloat(tempData.month9).toFixed(2));
			}
			if (tempData.month10 && parseFloat(tempData.month10) > 0) {
				$("#month10").val(parseFloat(tempData.month10).toFixed(2));
			}
			if (tempData.month11 && parseFloat(tempData.month11) > 0) {
				$("#month11").val(parseFloat(tempData.month11).toFixed(2));
			}
			if (tempData.month12 && parseFloat(tempData.month12) > 0) {
				$("#month12").val(parseFloat(tempData.month12).toFixed(2));
			}
		} else {
			$(".nav-tabs1 > li:eq(0)").addClass("active").siblings().removeClass("active");
			$("#yield_type").val(2);
			var mianji = $("#plant_area").val();
			mianji = parseFloat(mianji);
			if (tempData.month1 && parseFloat(tempData.month1) > 0) {
				var tempv = parseFloat(tempData.month1) * mianji;
				tempv = tempv.toFixed(2);
				$("#month1").val(tempv);
			}
			if (tempData.month2 && parseFloat(tempData.month2) > 0) {
				var tempv = parseFloat(tempData.month2) * mianji;
				tempv = tempv.toFixed(2);
				$("#month2").val(tempv);
			}
			if (tempData.month3 && parseFloat(tempData.month3) > 0) {
				var tempv = parseFloat(tempData.month3) * mianji;
				tempv = tempv.toFixed(2);
				$("#month3").val(tempv);
			}
			if (tempData.month4 && parseFloat(tempData.month4) > 0) {
				var tempv = parseFloat(tempData.month4) * mianji;
				tempv = tempv.toFixed(2);
				$("#month4").val(tempv);
			}
			if (tempData.month5 && parseFloat(tempData.month5) > 0) {
				var tempv = parseFloat(tempData.month5) * mianji;
				tempv = tempv.toFixed(2);
				$("#month5").val(tempv);
			}
			if (tempData.month6 && parseFloat(tempData.month6) > 0) {
				var tempv = parseFloat(tempData.month6) * mianji;
				tempv = tempv.toFixed(2);
				$("#month6").val(tempv);
			}
			if (tempData.month7 && parseFloat(tempData.month7) > 0) {
				var tempv = parseFloat(tempData.month7) * mianji;
				tempv = tempv.toFixed(2);
				$("#month7").val(tempv);
			}
			if (tempData.month8 && parseFloat(tempData.month8) > 0) {
				var tempv = parseFloat(tempData.month8) * mianji;
				tempv = tempv.toFixed(2);
				$("#month8").val(tempv);
			}
			if (tempData.month9 && parseFloat(tempData.month9) > 0) {
				var tempv = parseFloat(tempData.month9) * mianji;
				tempv = tempv.toFixed(2);
				$("#month9").val(tempv);
			}
			if (tempData.month10 && parseFloat(tempData.month10) > 0) {
				var tempv = parseFloat(tempData.month10) * mianji;
				tempv = tempv.toFixed(2);
				$("#month10").val(tempv);
			}
			if (tempData.month11 && parseFloat(tempData.month11) > 0) {
				var tempv = parseFloat(tempData.month11) * mianji;
				tempv = tempv.toFixed(2);
				$("#month11").val(tempv);
			}
			if (tempData.month12 && parseFloat(tempData.month12) > 0) {
				var tempv = parseFloat(tempData.month12) * mianji;
				tempv = tempv.toFixed(2);
				$("#month12").val(tempv);
			}
		}
    }
    
    /**
     * 重置右侧的图标
     */
    function resetHightChart() {
    	if(!$.fn.highcharts){
    		setTimeout(function(){resetHightChart();},3000);
    		return;
    	}
    	var x = new Array();
    	var y = new Array();
    	var ind = 0;
    	var total = 0;
    	var b,e;
      	if(plant_select.find(":selected").data().data.type=="2"){
      		b = $("#csstart").val();
      		e = $("#csend").val();
      		b = b.split("-")[0];
      		e = e.split("-")[0];
      	}else{
      		b = $("#harvest_timeInputDate").val();
      	  	e = $("#plant_endInputDate").val();
      	    b = b.split("-")[1];
      		e = e.split("-")[1];
      	}
    	b = parseInt(b, 10);
    	e = parseInt(e, 10);
    	for (var i = b; i <= 12; i++) {
    		if ($("#month" + i).val() != "") {
    			y.push(parseFloat($("#month" + i).val()));
    			x.push(i + "月");
    			total += parseFloat($("#month" + i).val());
    			ind++;
    		}
    	}
    	if (e < b)
    		for (var i = 1; i <= e; i++) {
    			if ($("#month" + i).val() != "") {
    				y.push(parseFloat($("#month" + i).val()));
    				x.push(i + "月");
    				total += parseFloat($("#month" + i).val());
    				ind++;
    			}
    		}
    	if (ind > 0) {
    		$("#highChart").show();
    		$(".baseZongji").show();
    		total = total.toFixed(2);
    		$(".baseZongji span").html(total + "kg");
    	} else {
    		$("#highChart").hide();
    		$(".baseZongji").hide();
    	}
    if($.fn.highcharts)
    	$('#perMuYield').highcharts({
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
    
    function plant_no() {
//    	gotoMap("tunnel_info_id_"+$("#tunnel_info_index").val());
    	$(".animal_hide").hide();
    	$("#divtittle").html(tunnelTitle);
    	$(".rightNo").hide();
    	$(".rightNo4").show();
    }
    
    function begin_end2(c,a,b){
    	if(!c||c==""){
    		c = $("#xiumian").val();
    	}
    	if(!a||a==""){
    		a = $("#csstart").val();
    	}
    	if(!b||b==""){
    		b = $("#csend").val();
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
    	$(".plotsYield_table input").each(function(){
    		for(var i = 0;i<arr.length;i++){
    			if(arr[i]==$(this).attr("name").replace("month","")){
    				break;
    			}else if(i==arr.length-1){
    				$(this).val("");
    			}
    		}
    	});
    }

    function begin_end() {
    	var a = $("#harvest_timeInputDate").val();
    	if (arguments.length > 0) {
    		a = arguments[0];
    	}
    	var b = $("#plant_endInputDate").val();
    	a = a.split("-")[1];
    	b = b.split("-")[1];
    	a = parseInt(a, 10);
    	b = parseInt(b, 10);
    	var arr = [];
    	if (b >= a) {
    		for (var i = a; i <= b; i++) {
    			arr.push(i);
    		}
    	} else if (b < a) {
    		for (var i = a; i <= 12; i++) {
    			arr.push(i);
    		}
    		for (var i = 1; i <= b; i++) {
    			arr.push(i);
    		}
    	}
    	$(".plotsYield_table input").each(function() {
    		for (var i = 0; i < arr.length; i++) {
    			if (arr[i] == $(this).attr("name").replace("month", "")) {
    				break;
    			} else if (i == arr.length - 1) {
    				$(this).val("");
    			}
    		}
    	});
    }

    function clearNoNum(obj){
    	obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
    	obj.value = obj.value.replace(/^\./g,"");  //验证第一个字符是数字而不是. 
    	obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的.   
    	obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    	if(obj.value==""||parseFloat(obj.value)==0){
    		$(".yugu").hide();
    		$(".plotsYield_table input").val("");
    		changeYield(1);
    		return ;
    	}else if($("#breed_new").val()!=0){
    		$(".yugu").show();
    	}else{
    		$(".yugu").hide();
    	}
    }
    
    $(".plotsYield_table input").focus(function(){
    	var a,b;
  	  	if(plant_select.find(":selected").data().data.type=="2"){
  	  		a = $("#csstart").val();
  	  		b = $("#csend").val();
  	  		a = a.split("-")[0];
  	  		b = b.split("-")[0];
  	  	}else{
  	  		a = $("#harvest_timeInputDate").val();
  	  	  	b = $("#plant_endInputDate").val();
  	  	    a = a.split("-")[1];
  	  		b = b.split("-")[1];
  	  	}
  		a = parseInt(a,10);
  		b = parseInt(b,10);
  		if(!isNaN(a) && !isNaN(b)){
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
  	  		for(var i = 0;i<arr.length;i++){
  	  			if(arr[i]==$(this).attr("name").replace("month","")){
  	  				break;
  	  			}else if(i==arr.length-1){
  	  				alert("该月份不在采收开始和结束时间之内");
  	  				$(this).blur();
  	  			}
  	  		}
  		}else{
  			alert("该月份不在采收开始和结束时间之内");
  			$(this).blur();
  		}
    }).blur(function(){
    	resetHightChart();
    });
    
    function findModel(){
    	var breed_id = $('#breed_new').val();
    	var plant_env_type = $('#plant_env_type').val();
    	var begin_time = $("#plant_beginInputDate").val();
    	var plant_standard = $("#plant_standard").val();
    	var end_time = $("#plant_endInputDate").val();
    	if(breed_id == "" || plant_env_type == "" || begin_time == "" || plant_standard == "" || end_time == "" || breed_id == 0){
    		return ;
    	}
    	$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':'plant_model',
				'field':"{'enterprise_info_id':"+enter_id+",'breed_id':"+breed_id+",'plant_env_type':"+plant_env_type+",'begin_date':"+begin_time+",'plant_standard':"+plant_standard+"}"
			},
			success: function( response ) {
				findModelNext(response);
			},
			error: function(e) {
				//log(2);
			}
		});	//-----end ajax
    }
    
    function findModelNext(response){
    	if(response.invoke_result == "INVOKE_SUCCESS"){
//    		console.log(JSON.stringify(response.result_data));
    		var tempData = response.result_data;
    		if(typeof(tempData.month1) == 'undefined'){
    			return;
    		}
    		setMonth(tempData);
    		if(plant_select.find(":selected").data().data.type=="2"){
    			begin_end2();
    		}else{
    			begin_end();
    		}
    		resetHightChart();
    		
    	}else{
    		log(response.invoke_message);
    	}
    }
    
    function checkSubmit(){
    	showTips();
    	var asp_type = $('#aps_type').val();
    	var nowD = new Date();
    	$("#plant_plantId").val(plant_select.find(":selected").data().data.plantId);
        if($("#breed_new").val()==0){
            document.getElementById("harvest_timeInputDate").value = document.getElementById("plant_beginInputDate").value;
        }
        var sproutSel=$("#sproutSel").val();
        var purchaseSource=$("#purchaseSource").val();   
        $("#sproutSource").val(sproutSel);
        if(sproutSel!=2){
        	$("#purchaseSource").val("");
        }else if(sproutSel==2 && purchaseSource.length>0 && purchaseSource.length>50){
    		alert("购买来源不能大于50字！");
    		hideTips();
    		return false;
        }
        $("#breed_name").val(plant_select.find(":selected").data().data.breedName);
        $("#plant_id").val(plant_select.find(":selected").data().data.plantId);
        $("#plant_name").val(plant_select.find(":selected").data().data.plantName);
        if(plant_select.find(":selected").data().data.type=="2"){
    		var ymstart = $("#ymstart").val();
    		var ymend = $("#ymend").val();
    		var xiumian = $("#xiumian").val();
    		var csstart = $("#csstart").val();
    		var csend = $("#csend").val();
    		var zzend = $("#zzend").val();
    		if(ymstart == ""){
    			alert("请填写幼苗开始时间!");
        		hideTips();
    			return false;
    		}
    		if(ymend == ""){
    			alert("请填写幼苗结束时间!");
        		hideTips();
    			return false;
    		}
    		if(ymstart>ymend){
    			alert("幼苗开始时间不能大于结束时间!");
        		hideTips();
    			return false;
    		}
    		if(zzend!=""){
    			if(ymstart>zzend){
    				alert("幼苗开始时间不能大于种植结束时间!");
    	    		hideTips();
    				return false;
    			}else if(ymend>zzend){
    				alert("幼苗结束时间不能大于种植结束时间!");
    	    		hideTips();
    				return false;
    			}
    		}
    		if(xiumian == ""){
    			alert("请填写落叶休眠期!");
        		hideTips();
    			return false;
    		}
    		if(csstart == ""){
    			alert("请填采收开始时间!");
        		hideTips();
    			return false;
    		}
    		if(csend == ""){
    			alert("请填采收结束时间!");
        		hideTips();
    			return false;
    		}
    		if(ymstart>ymend){
    			alert("幼苗开始时间不能大于结束时间!");
        		hideTips();
    			return false;
    		}
    		if(csstart<=xiumian<=csend){
    			alert("落叶休眠期不能在采收范围内!");
        		hideTips();
    			return false;
    		}
    		var yme = ymend.split("-");
    		var yme_ = yme[1]+"-"+yme[2];
    		if(csstart<yme_){
    			if(yme_<csend){
    				alert("幼苗结束时间不能在采收区间内!");
    	    		hideTips();
    				return false;
    			}
    		}
    		if(csstart>yme_){
    			if(csstart>csend&&yme<csend){
    				alert("幼苗结束时间不能在采收区间内!");
    	    		hideTips();
    				return false;
    			}
    		}
    		var plantarea = document.getElementById("plant_area").value;
    		var allarea =  parseFloat($("#plantarea").text());
    		if(false&& parseFloat(plantarea) > allarea){
    		    alert("种植面积不能大于剩余种植面积！");
        		hideTips();
    		    return false;
    		}
    		var plantarea = document.getElementById("plant_area").value;
    		if(plantarea == 0){
            	alert("种植面积不能为0！");
        		hideTips();
    			return false;
            }
    	    if(plantarea == ""){
    	    	alert("种植面积不能为空！");
        		hideTips();
    			return false;
    	    }
    		$("#perennial").val(true);
    		var arr = xiumian.split("-");
    		var env_type = $("#env_type").val();
    		env_type = parseInt(env_type,10)-1;
    		$('#model_name').val($(".plantEnvir> div:eq("+env_type+")").attr("title")+'-'+$("#plant_standard_name").val()+'-'+arr[0]+'-'+arr[1]);
    		$("#breed_new").removeAttr("disabled");
    	}else{
    		var nowD_ = new Date(nowD.getFullYear(),nowD.getMonth()+1,nowD.getDate());
    		var beginTime = document.getElementById("plant_beginInputDate").value;
    	    var endTime = document.getElementById("plant_endInputDate").value;
    	    var harvestTime = document.getElementById("harvest_timeInputDate").value;
    	    var plantarea = document.getElementById("plant_area").value;
    	    var arr = beginTime.split("-");
    	    var starttime = new Date(arr[0], parseInt(arr[1],10)-1, arr[2]);
    	    var starttimes = starttime.getTime();
    	    var arrs = endTime.split("-");
    	    var lktime = new Date(arrs[0], parseInt(arrs[1],10)-1, arrs[2]);
    	    var lktimes = lktime.getTime();
    	    var allarea =  parseFloat($("#plantarea").text());
    	    if((lktimes-starttimes)/60/60/24/1000>365){
    	    	alert("一年生作物生长周期不超过一年!")
        		hideTips();
    	    	return false;
    	    }
    	    if (starttimes >= lktimes) {
                alert($(".modehidename_1").html()+"不能大于"+$(".modehidename_2").html()+"！");
        		hideTips();
    			return false;
    	    }
    	    if(beginTime == ""){
                alert($(".modehidename_1").html()+"不能为空！");
        		hideTips();
    			return false;
    	    }
    	    if(endTime == ""){
                alert($(".modehidename_2").html()+"不能为空！");
        		hideTips();
    			return false;
    	    }
    	    if(harvestTime == ""){
    	    	alert("采收开始时间不能为空！");
    			return false;
    	    }
    	    var hars = harvestTime.split("-");
    	    var hartime = new Date(hars[0], parseInt(hars[1],10)-1, hars[2]);
    	    var hartimes = hartime.getTime();
    	    if(hartimes>lktimes){
    	    	alert("采收开始时间不能大于结束时间！")
        		hideTips();
    	    	return false;
    	    }
    	    var nowT = nowD_.getTime();
    	    if(starttimes<nowT){
    	    	if(lktimes<nowT){
    	    		$('#aps_type').val(0);
    	    	}else{
    	    		$('#aps_type').val(1);
    	    	}
    	    }else{
    	    	$('#aps_type').val(2);
    	    }
    	    if(asp_type == 1){
    		    if(starttimes>nowT){
    	        	//alert("实际种植开始日期不能大于今天！");
    	        	//return false;
    	        }
    		    if(lktimes<nowT){
    	        	//alert("实际种植结束日期不能小于今天！");
    	        	//return false;
    	        }
    	    }else if(asp_type==0){
            	if(lktimes>nowT){
                	//alert("历史种植结束日期不能大于今天！");
                	//return false;
                    }
                }else if(asp_type==2){
            	if(starttimes<nowT){
    	        	//alert("计划种植开始日期不能小于今天！");
    	        	//return false;
    	        }
                }
    	    if(plantarea == 0){
            	alert("种植面积不能为0！");
        		hideTips();
    			return false;
            }
    	    if(plantarea == ""){
    	    	alert("种植面积不能为空！");
        		hideTips();
    			return false;
    	    }
    	    //if(parseFloat(plantarea) > parseFloat($("#tunnel_area").val())){
    	    //	$("#prompt").text("种植面积不能大于区域面积！");
    		//	return false;
    	    //}
    	    
    	    	if(false&&parseFloat(plantarea) > allarea){
    	            alert("种植面积不能大于剩余种植面积！");
    	    		hideTips();
    				return false;
    	        }
    	    if($("#modelId").val()==""||$("#modelId").val()==0){
    	    	alert("请先预估每月产量！");
        		hideTips();
    			return false;
    	    }
    	    var year = parseInt($("#checkStart").val(),10)<parseInt($("#checkMonth").val())?arr[0]:parseInt(arr[0],10)+1;
    		var date1 = new Date(arrs[0],parseInt(arrs[1],10)-1,arrs[2]);
    		var date2 ;
    		if($("#checkDays").val()==3){
    			date2 = new Date(year,$("#checkMonth").val(),0);
    		}else {
    			date2 = new Date(year,($("#checkMonth").val()-1),$("#checkDays").val()*10);
    		}
    		var month1 = parseInt(arr[0]) * 12 + parseInt(arr[1]);
    		var month2 = parseInt(arrs[0]) * 12 + parseInt(arrs[1]);
    		var cha = Math.abs(month2 - month1);
    		if(cha<12){
    		    if(date1>date2){
    		    	alert("结束时间未在模型区间内！");
    	    		hideTips();
    		    	return false;
    		    }
    		}
    		var env_type = $("#env_type").val();
    		env_type = parseInt(env_type,10)-1;
    		$('#model_name').val($(".plantEnvir > div:eq("+env_type+")").attr("title")+'-'+$("#plant_standard_name").val()+'-'+arr[0]+'-'+arr[1]);
    		$("#breed_new").removeAttr("disabled");
    		$("#perennial").val(false);
    	}
        var flag2=false;
    	if($('#yield_type').val()==1){
    		$('.plotsYield_table :input').each(function(){
    		    if($(this).val()>30000){
    		    	flag2=true;
    			}
    		})
    	}else{
    		$('.plotsYield_table :input').each(function(){
    			if(($(this).val()/$('#plant_area').val())>30000){
    				flag2=true;
    			}
    		})
    	}
    	if(flag2){
    		alert("产量每亩不能大于30000！");
    		hideTips();
    		return false;
    	}
    	if($('#plant_standard').val()==""){
    		alert("请选择种植标准！");
    		hideTips();
    		return false;
    	}
    	var method = "save_real_plant";//
    	if($("#plant_real_id").val()!=""){
    		method = "update_real_plant";
    	}
    	if($('#plant_area').val().length>9){
			alert("请填写正确的亩数,不能超过9位!");
    		hideTips();
    		return ;
		}
    	$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':method,
				'field':"{'enterprise_info_id':"+enter_id+",'form':'"+encodeURIComponent($('#plantForm').serialize())+"'}"
			},
			success: function( response ) {
				hideTips();
				updateRealPlantNext(response);
			},
			error: function(e) {
				hideTips();
				//log(2);
			}
		});	//-----end ajax
    }
    
    /**
     * 计算亩产量
     * @param product
     * @param crop_area
     * @returns
     */
    function calcAvgProduct(product,crop_area,yield_type){
    	if(yield_type == 1)
    		return product;
		if(product == "")
			return product;
		product = parseFloat(product);
		crop_area = parseFloat(crop_area);
		if(isNaN(product)||isNaN(crop_area))
			return "";
		try{
			var temp = product/crop_area;
			return temp.toFixed(2);
		}catch(e){return "";}
	}
    
    /**
     * 编辑种植信息；
     * @param response
     */
    function updateRealPlantNext(response){
    	if(response.invoke_result == "INVOKE_SUCCESS"){
//    		console.log(JSON.stringify(response.result_data));
    		var tempData = response.result_data;
    		var plant_real_id = tempData.plant_real_id;
    		var plant_img = tempData.plant_img;
    		var feature = tunnelInfoSource.getFeatureById("tunnel_info_"+$("#tunnel_info_index").val());
    		var real_plant = feature.get("real_plant");
    		var tempObj = {};
    		var month1 = $("#month1").val();
    		var month2 = $("#month2").val();
    		var month3 = $("#month3").val();
    		var month4 = $("#month4").val();
    		var month5 = $("#month5").val();
    		var month6 = $("#month6").val();
    		var month7 = $("#month7").val();
    		var month8 = $("#month8").val();
    		var month9 = $("#month9").val();
    		var month10 = $("#month10").val();
    		var month11 = $("#month11").val();
    		var month12 = $("#month12").val();
    		var crop_area = $("#plant_area").val();
    		var yield_type = $("#yield_type").val();
    		tempObj.plant_img = plant_img;
    		tempObj.month1 = calcAvgProduct(month1,crop_area,yield_type);
    		tempObj.month2 = calcAvgProduct(month2,crop_area,yield_type);
    		tempObj.month3 = calcAvgProduct(month3,crop_area,yield_type);
    		tempObj.month4 = calcAvgProduct(month4,crop_area,yield_type);
    		tempObj.month5 = calcAvgProduct(month5,crop_area,yield_type);
    		tempObj.month6 = calcAvgProduct(month6,crop_area,yield_type);
    		tempObj.month7 = calcAvgProduct(month7,crop_area,yield_type);
    		tempObj.month8 = calcAvgProduct(month8,crop_area,yield_type);
    		tempObj.month9 = calcAvgProduct(month9,crop_area,yield_type);
    		tempObj.month10 = calcAvgProduct(month10,crop_area,yield_type);
    		tempObj.month11 = calcAvgProduct(month11,crop_area,yield_type);
    		tempObj.month12 = calcAvgProduct(month12,crop_area,yield_type);
    		tempObj.yield_type = yield_type;
    		tempObj.real_plant_id = plant_real_id;
    		tempObj.plant_standard = $("#plant_standard").val();
    		tempObj.breed_id = $('#breed_new').val();
    		tempObj.breed_name = plant_select.find(":selected").data().data.breedName;
    		tempObj.plant_id = plant_select.find(":selected").data().data.plantId;
    		tempObj.plant_name = plant_select.find(":selected").data().data.plantName;
    		tempObj.crop_area = crop_area;
    		
    		tempObj.begin_day = "";
    		tempObj.begin_month = "";
    		tempObj.end_day = "";
    		tempObj.end_month = "";
    		tempObj.harvest_day = "";
    		tempObj.harvest_month = "";
    		tempObj.floristics_type = "";
    		tempObj.harvest_time = "";
    		tempObj.plant_begin_time = "";
    		tempObj.plant_end_time = "";
    			
    		var beginTimeStr = "";
    		var harvestTimeStr = "";
    		var endTimeStr = "";
    		if(plant_select.find(":selected").data().data.type == 2){
    			var xiumian = $("#xiumian").val();
    			var csstart = $("#csstart").val();
    			var csend = $("#csend").val();
    			tempObj.begin_day = xiumian.split("-")[1];
    			tempObj.begin_month = xiumian.split("-")[0];
    			tempObj.end_day = csstart.split("-")[1];
        		tempObj.end_month = csstart.split("-")[0];
        		tempObj.harvest_day = csend.split("-")[1];
        		tempObj.harvest_month = csend.split("-")[0];
        		tempObj.floristics_type = 2;
        		beginTimeStr = $("#ymstart").val();
        		harvestTimeStr = $("#ymend").val();
        		endTimeStr = $("#zzend").val();
    		}else{
    			beginTimeStr = $("#plant_beginInputDate").val();
    			harvestTimeStr = $("#harvest_timeInputDate").val();
    			endTimeStr = $("#plant_endInputDate").val();
    			tempObj.begin_day = beginTimeStr.split("-")[2];
    			tempObj.begin_month = beginTimeStr.split("-")[1];
    			tempObj.end_day = harvestTimeStr.split("-")[2];
        		tempObj.end_month = harvestTimeStr.split("-")[1];
        		tempObj.harvest_day = endTimeStr.split("-")[2];
        		tempObj.harvest_month = endTimeStr.split("-")[1];
        		tempObj.floristics_type = 1;
    		}
    		
    		var arr = beginTimeStr.split("-");
    	    var tempDate = new Date(arr[0], parseInt(arr[1],10)-1, arr[2]);
    	    var temp = {$date:tempDate.getTime()};
    	    tempObj.plant_begin_time = temp;
    	    
    	    
    		arr = harvestTimeStr.split("-");
    		tempDate = new Date(arr[0], parseInt(arr[1],10)-1, arr[2]);
    		temp = {$date:tempDate.getTime()};
    	    tempObj.harvest_time = temp;
    	    
    	    
    	    if(endTimeStr == ""){
    	    	endTimeStr = "2050-12-31";
    	    }
    		arr = endTimeStr.split("-");
    		tempDate = new Date(arr[0], parseInt(arr[1],10)-1, arr[2]);
    		temp = {$date:tempDate.getTime()};
    	    tempObj.plant_end_time = temp;
    		if(typeof(real_plant) == "undefined"){
    			real_plant = new Array();
    		}
    		if(plant_real_id == ""){
    			real_plant.push(tempObj);
    			feature.set("real_plant",real_plant);
    		}else{
    			if(tempDate.getTime()<nowD.getTime()){
    				for(var i = 0;i<real_plant.length;i++){
						var obj = real_plant[i];
						if(obj.real_plant_id == plant_real_id){
							real_plant = real_plant.del(i);
							feature.set("real_plant",real_plant);
							break;
						}
					}
    			}else{
    				if(real_plant.length == 0){
    					real_plant.push(tempObj);
    					feature.set("real_plant",real_plant);
    				}else {
    					for(var i = 0;i<real_plant.length;i++){
    						var obj = real_plant[i];
    						if(obj.real_plant_id == plant_real_id){
    							real_plant.splice(i,1,tempObj);
    							feature.set("real_plant",real_plant);
    						}else if(i == real_plant.length -1){
    							real_plant.push(tempObj);
    							feature.set("real_plant",real_plant);
    							break;
    						}
    					}
    				}
    			}
    		}
    		tunnelInfoPlantList(feature);
    		var isrc = createCenterImg(real_plant);
    		var center = tunnelCenterPointSource.getFeatureById(feature.getId());
			var centerStyle = createCenterStyle(isrc);
			var scale = zoomScale(omap.getView().getZoom());
			centerStyle.getImage().setScale(scale);
			center.setStyle(centerStyle);
			$(".animal_hide").hide();
			$(".plant_hide").show();
			$("#divtittle").html(tunnelTitle);
	    	$(".rightNo").hide();
	    	$(".rightNo4").show();
    	}
    }
    
    /**
     * 种苗来源
     * @param selValue
     */
    function sproutChange(selValue){
		if(selValue==2){
			$("#purchaseSourceDiv").show();
		}else{
			$("#purchaseSourceDiv").hide();
		}
	 }
    
    /**
     * 删除种植
     */
    function delete_plant_or() {
    	var vid = $("#plant_real_id").val();
    	var tunnel_index = $("#tunnel_info_index").val();
    	var tunnel_info = tunnelInfoSource.getFeatureById("tunnel_info_"+tunnel_index);
    	if (vid == "") {
    		plant_no();
    		gotoMap(selectedShape.getId());
    	} else {
    	   if(confirm('确定删除吗？')){
    		   deletePlantFirst(vid,tunnel_info.get("tunnel_info_id_"));
    		   if(confirm('请确认是否删除相应的的农事管理中农事计划与记录')){
    			   deletePlantSecond(vid,tunnel_info.get("tunnel_info_id_"));
    		   }
    	   }
    	}
    }
    
    function deletePlantFirst(plant_real_id,tunnel_info_id){
    	$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':"delete_real_plant",
				'field':"{'enterprise_info_id':"+enter_id+",'tunnel_info_id':"+tunnel_info_id+",'plant_real_id':"+plant_real_id+"}"
			},
			success: function( response ) {
				var tunnel_index = $("#tunnel_info_index").val();
		    	var tunnel_info = tunnelInfoSource.getFeatureById("tunnel_info_"+tunnel_index);
		    	var real_plant = tunnel_info.get("real_plant");
		    	for(var i = 0 ;i<real_plant.length;i++){
		    		var obj = real_plant[i];
		    		if(obj.real_plant_id == response.result_data.plant_real_id){
		    			real_plant = real_plant.del(i);
		    			tunnel_info.set("real_plant",real_plant);
		    			break;
		    		}
		    	}
		    	tunnelInfoPlantList(tunnel_info);
				var isrc = createCenterImg(tunnel_info.get("real_plant"));
	   			var center = tunnelCenterPointSource.getFeatureById(selectedShape.getId());
				var centerStyle = createCenterStyle(isrc);
				var scale = zoomScale(omap.getView().getZoom());
				centerStyle.getImage().setScale(scale);
				center.setStyle(centerStyle);   
				$("#divtittle").html(tunnelTitle);
				$(".rightNo").hide();
		    	$(".rightNo4").show();
			},
			error: function(e) {
				//log(2);
			}
		});	//-----end ajax
    }
    
    function deletePlantSecond(plant_real_id,tunnel_info_id){
    	$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':"delete_real_plant_agricultural",
				'field':"{'enterprise_info_id':"+enter_id+",'tunnel_info_id':"+tunnel_info_id+"}"
			},
			success: function( response ) {
				log("删除成功");
			},
			error: function(e) {
				//log(2);
			}
		});	//-----end ajax
    }
    
    
    function renewRealPlant(obj){
		$("#edittype").val(1);
		
		$("#firsttable").hide();
		$("#secondtable").show();
		$("#plant_real_id").val("");
		var now = new Date();
		
		var str1 = "#plant_beginInputDate";
		var str2 = "#harvest_timeInputDate";
		var str3 = "#plant_endInputDate";
		
		if(obj.floristics_type==2){
			str1 = "#ymstart"; 
			str2 = "#ymend";
			str3 = "#zzend";   
		}
		
		var nowt = new Date();
		
		var beginTime = $(str1).val();
		var harvestTime = $(str2).val();
		var endTime = $(str3).val();
		
		var arr = beginTime.split("-");
		var bt = new Date(arr[0], parseInt(arr[1],10)-1, arr[2]);
		var bts = bt.getTime();
		$(str1).val(nowt.format("yyyy-MM-dd"));
		
		var cha = nowt.getTime() - bts;
        var yuecha; 
		if(harvestTime!=""&&obj.floristics_type!=2){
			var har = harvestTime.split("-");
			var hart = new Date(har[0], parseInt(har[1],10)-1, har[2]);
			var hars = hart.getTime();
			hars += cha;
            yuecha = (new Date(hars)).getMonth()+1-parseInt(har[1],10);
			$(str2).val((new Date(hars)).format("yyyy-MM-dd"));
		}else{
			$(str2).val("");
		}
		
		if(endTime!=""&&obj.floristics_type!=2){
			var arrs = endTime.split("-");
			var lktime = new Date(arrs[0], parseInt(arrs[1],10)-1, arrs[2]);
			var lktimes = lktime.getTime();
			lktimes += cha;
			$(str3).val((new Date(lktimes)).format("yyyy-MM-dd"));
		}else{
			$(str3).val("");
		}
		
		if(obj.floristics_type!=2){
			var yuecha = nowt.getMonth()+1-parseInt(arr[1],10);
			var arr = new Array();
			$(".plotsYield_table input").each(function(ind){
				if($(this).val()!=""){
					arr.push((ind+1)+"++"+$(this).val());
				}
			});
			$(".plotsYield_table input").val("");
			$.each(arr,function(index,value){
				var values = value.split("++");
				var ind = parseInt(values[0]);
				ind += yuecha;
				if(ind>12){
					$("#month"+(ind-12)).val(values[1]);
				}else{
					$("#month"+ind).val(values[1]);
				}
			});
            begin_end();
		}
		$("#save-yeildforecast-again").unbind("click");
		$("#save-yeildforecast-again").bind("click",checkSubmit);
		$("#secondtable .btn-default").bind("click",function(){$("#secondtable .btn-default").unbind("click");editPlant(obj.real_plant_id)});
	}
    
    /**
     * 土地检测 详情 跳转到地块管理页
     */
    function jumpToPartition() {
    	window.open("/map/PartitionInfo.seam?tnnelId="
    			+ $("#tunnel_info_id").val() + "&partId=" + $("#tunnel_info_partitions_id").val()
    			+ "&baseId=" + $("#tunnel_info_base_id").val());
    }
    
    /**
     * 回执降雨量图
     * @param month
     * @param line_railfall
     * @param pillar_railfall
     */
    function rainChart(month,line_railfall,pillar_railfall){
    	month=eval(month);
    	line_railfall=eval(line_railfall);
    	pillar_railfall=eval(pillar_railfall);
    	$('#container').highcharts({
    		chart:{
    			// backgroundColor : "transparent"
    			backgroundColor: 'rgba(0,0,0,0)',
    			style:{
    					color:"#fff",
    					fontSize:'10px'
    				},
    		},
    		title: {
    			text: ''
    		},
    		credits: {
                enabled: false
            },
    		xAxis: {
    			categories:month,
    			labels: {
    				style: {
    					color: '#fff',//颜色
    				}
    			}
    		},
    		
    		yAxis: {
    			title: {
    				text: null
    			},
    			labels: {
    				style: {
    					color: '#fff',//颜色
    				}
    			}
    		},
    		
    		tooltip: {
    			crosshairs: true,
    			shared: true,
    			valueSuffix: 'mm'
    		},
    		
    		legend: {
    			 enabled: false,
    		},
    		
    		series: [{
    			type: 'column',
    			name: '每月降水量',
    			color : "#71e6a2",
    			data: line_railfall,
    			zIndex: 1,
    			marker: {
    				fillColor: '#71e6a2',
    				lineWidth: 0
    			}
    		}, {
    			type: 'spline',
    			name: '累积降水量',
    			color : "#7cb5ec",
    			data: pillar_railfall,
    			marker: {
    				lineWidth: 2,
    				lineColor: Highcharts.getOptions().colors[0],
    				fillColor: 'white'
    			}
    		}]
    	});
    }
    
    /**
     * 天气预报
     * @param base_id
     */
    function weatherForecast (base_id){
    	$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':"weather_forecast",
				'field':"{'enterprise_info_id':"+enter_id+",'base_id':"+base_id+"}"
			},
			success: function( response ) {
				var data = response.result_data;
				var container = $(".weatherStion_wp");
				if(typeof(data.district_cn)=="undefined"){
					$(".envir-pointer-pop").hide();
					return;
				}
				var pictureTypeSn = data.pictureTypeSn;
				var pictureType = data.pictureType;
//				if(typeof(data.pictureType)=="undefined"){
//					$(".envir-pointer-pop").hide();
//					return;
//				}
				var assessValue = data.assessValue;
				var assessStyle = data.assessStyle;
				container.find(".init1").css("width",assessStyle[0]);
				container.find(".unit1").html(assessValue[0]+"℃");
				container.find(".init2").css("width",assessStyle[1]);
				container.find(".unit2").html(assessValue[1]+"天");
				container.find(".init3").css("width",assessStyle[2]);
				container.find(".unit3").html(assessValue[2]+"℃");
				container.find(".init4").css("width",assessStyle[3]);
				container.find(".unit4").html(assessValue[3]+"h");
				container.find(".init5").css("width",assessStyle[4]);
				container.find(".unit5").html(assessValue[4]+"h");
				var month=data.months;
				var line_railfall=data.lineRailfall;
				var pillar_railfall=data.pillarRailfall;
				rainChart(month,line_railfall,pillar_railfall); 
				if (pictureTypeSn == "d") {
					var tem = pictureType;
					if (tem.length == 1)
						tem = "0" + tem;
					$('.weather').html('<img src="/asset/images/icon/day/' + tem + '.png" />');
				} else if (pictureTypeSn == "n") {
					var tem = pictureType;
					if (tem.length == 1)
						tem = "0" + tem;
					$('.weather').html('<img src="/asset/images/icon/night/' + tem + '.png" />');
				}
				var waste_enterprise_name = data.waste_enterprise_name;
				if(waste_enterprise_name == null){
					$('.case').show();
					$('.case_y').hide();
				}else{
					$('.case').hide();
					$('.case_y').show();
					$('.case_y span').html('有污染(有'+waste_enterprise_name.split("@#$").length+'家)');
				}
				$('.city').html('<img src="/asset/images/weather/resource/city.png" alt="">'+data.district_cn+'<span class="county">•'+data.name_cn+'</span>');
				$(".envir-pointer-pop").show();
			},
			error: function(e) {
			}
		});	//-----end ajax
    }
    
    /**
     * 打开航拍窗口
     */
    function openAerialVideo(){
    	$('#aerialIframe', window.parent.document).attr("src","/map/AerialvideoView.html?groupId="+aerialGroupId+"&amp;domainUrl="+window.location.origin+"&amp;operType=2");
    	$('#aerialVideoDiv', window.parent.document).show();
    }
    
    function addGeo() {
        var container = document.createElement("div");
        container.style.cursor = "pointer";
        container.style.border = "1px solid #fff";
        container.style.borderRadius = "4px";
        container.className = "geoClass";
        container.index = 1;
        container.id = "geoId";
        var img = document.createElement('img');
        img.src = geo_gray;
    	img.style.width = '28px';
    	img.style.height = '27px';
    	container.appendChild(img);
        this.coordinate = null;
        this.div_ = container;
        container.style.bottom="135px";
        container.style.right="20px";
        container.style.position="absolute";
        $(container).bind("click",mylocation);
        ol.control.Control.call(this, {
            element: container,
          });
    }
    
    function mylocation(){
    	var src = $("#geoId img").attr("src");
    	if(src == geo_blue)
    		return;
    	if(navigator.geolocation){
    		navigator.geolocation.getCurrentPosition(showPosition,showError);//{timeout:10000}
    		$("#geoId img").attr("src",geo_blue);
    	}else{
    		alert("当前浏览器不支持此操作!");
    	}
    	 
    }
    
    function showPosition(position){
    	$("#geoId img").attr("src",geo_gray);
       var i;
       if(gmap){
    	   var GCJ02loc = new WGS84_to_GCJ02().transform(parseFloat(position.coords.latitude), parseFloat(position.coords.longitude));
    	   try{
    		   console.log(parseFloat(position.coords.latitude)+"|"+parseFloat(position.coords.longitude));
    		   console.log(GCJ02loc[0]+"|"+GCJ02loc[1]);
    	   }catch(e){}
    	   
    	   var np = new google.maps.LatLng(GCJ02loc[0],GCJ02loc[1]);
    	   var tempArr = [parseFloat(GCJ02loc[1]),parseFloat(GCJ02loc[0])];
    	   omap.getView().setCenter(ol.proj.transform(tempArr,'EPSG:4326' , 'EPSG:3857'));
    	   omap.getView().setZoom(16);
    	   locationMarker.setGeometry(new ol.geom.Point(ol.proj.transform(tempArr,'EPSG:4326' , 'EPSG:3857')));
    	   locationMarker.setStyle(styles.location);
    	   locationSource.addFeature(locationMarker);
       }
    }
    function showError(error){
    	$("#geoId img").attr("src",geo_gray);
    	  switch(error.code){
    	   case error.PERMISSION_DENIED:
    	    alert("用户不允许地理定位.");
    	     //positionInfo.innerHTML="用户不允许地理定位."
    	     break;
    	   case error.POSITION_UNAVAILABLE:
    	   	 alert("无法获取当前位置.");
    	     //positionInfo.innerHTML="无法获取当前位置."
    	     break;
    	   case error.TIMEOUT:
    	     alert("操作超时.");
    	     //positionInfo.innerHTML="操作超时."
    	     break;
    	   case error.UNKNOWN_ERROR:
    		   alert("An unknown error occurred.");
    	     //positionInfo.innerHTML="An unknown error occurred."
    	     break;
    	   }
    	}
    
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
    
    
    /**
     * 添加农户
     * @param type
     */
      function addFarmer(type){
      	if(type==1){
      		$("#divtittle").text("添加农户");
      	}else if(type==2){
      		$("#divtittle").text("添加种植管理员");
      	}else if(type==3){
      		$("#divtittle").text("添加饲养员");
      	}else if(type==4){
      		$("#divtittle").text("添加养殖负责人");
      	}
      	$("#farmer_base_id").val($("#tunnel_info_base_id").val());
      	$("#farmer_type").val(type);
      	$("#farmer_name").val("");
      	$("#farmer_age").val("");
      	$("#farmer_age2").val("");
      	$("#farmer_phone").val("");
      	$("#farmer_honor").val("");
      	$(".rightNo").hide();
      	$(".rightNo8").show();
      }
      
    /**
     * 取消农户编辑
     */
      function cancelFarmer(){
  		$("#divtittle").text("编辑区域");
  		$(".rightNo").hide();
      	$(".rightNo4").show();
      }
      
      /**
       * 保存农户信息
       */
      function saveFarmer(){
  		var a = /^[1-9]+[0-9]*]*$/; // 正整数
  		var farmerName = $("#farmer_name").val();
  		if (farmerName == "") {
  			alert("姓名不能为空!");
  			return ;
  		}
  		if(farmerName.length > 10){
  			alert("姓名太长，不能超过10个字符!");
  			return ;
  		}
  		var farmerAge = $("#farmer_age").val();
  		if (!a.test(farmerAge)) {
  			alert("年龄必须是正整数!");
  			return ;
  		}
  		var farmerAgeInt = parseInt(farmerAge,10)
  		if(farmerAgeInt>99){
  			alert("年龄必须为2位正整数!");
  			return ;
  		}
  		var farmerAge2 = $("#farmer_age2").val();
  		if (!a.test(farmerAge2)) {
  			alert("从业年限必须是正整数!");
  			return ;
  		}
  		var farmerAge2Int = parseInt(farmerAge2,10)
  		if(farmerAge2Int>99){
  			alert("从业年限必须为2位正整数!")
  			return ;
  		}
  		if(farmerAge2Int > farmerAgeInt){
  			alert("从业年限必须为小于年龄!")
  			return ;
  		}
  		var farmerPhone = $("#farmer_phone").val();
  		if(farmerPhone != "" && farmerPhone.length >15){
  			alert("电话必须小于15位!")
  			return ;
  		}
  		var farmerHonor = $("#farmer_honor").val();
  		if(farmerHonor != "" && farmerHonor.length > 200){
  			alert("荣誉必须限定在200字以内!")
  			return ;
  		}
  		
  		showTips();
      	$.ajax({
  			type: "GET",
  			url: '/rest/1.0/webgis',
  			dataType: "json",
  			data:{
  				'method':'save_farmer',
  				'field':"{'enterprise_info_id':"+enter_id+",'form':'"+encodeURIComponent($('#farmerForm').serialize())+"'}"
  			},
  			success: function( response ) {
  				hideTips();
  				saveFarmerNext(response);
  			},
  			error: function(e) {
  				hideTips();
  			}
  		});	
      }
      
      /**
       * 基地边界保存返回值处理<br/>
       * Feature 属性填充
       */
      function saveFarmerNext(response){
      	if(response.invoke_result == "INVOKE_SUCCESS"){
      		var data = response.data;
      		var option = "<option value='"+data.farmer_id+"' base_id='"+data.base_id+"'>"+data.name+"</option>";
      		farmerList.push(data);
      		if(data.farmer_type==1){
      			$(option).prependTo("#group_farmer_");
      			$(option).prependTo("#group_farmer");
      	        var val = $("#group_farmer option[value!=0]:first").val();
      			$("#group_farmer").selectpicker("val",val);
      			$("#group_farmer").selectpicker("refresh");
      		}else if(data.farmer_type==2){
      			$(option).prependTo("#group_farmer1_");
      			$(option).prependTo("#group_farmer1");
      	        var val = $("#group_farmer1 option[value!=0]:first").val();
      			$("#group_farmer1").selectpicker("val",val);
      			$("#group_farmer1").selectpicker("refresh");
      		}else if(data.farmer_type==3){
      			$(option).prependTo("#group_farmer2_");
      			$(option).prependTo("#group_farmer2");
      	        var val = $("#group_farmer2 option[value!=0]:first").val();
      	        $("#group_farmer2").selectpicker("val",val);
      			$("#group_farmer2").selectpicker("refresh");
      		}else if(data.farmer_type==4){
      			$(option).prependTo("#group_farmer3_");
      			$(option).prependTo("#group_farmer3");
      	        var val = $("#group_farmer3 option[value!=0]:first").val();
      	    	$("#group_farmer3").selectpicker("val",val);
      			$("#group_farmer3").selectpicker("refresh");
      		}
      		cancelFarmer();
  		}else{
  			log(response.invoke_message);
  		}
      }
      
      function changeYield(obj){
    		var area = $("#plant_area").val();
    		if(obj==1&&obj!=$("#yield_type").val()){
    			$(".nav-tabs1 > li:eq(1)").addClass("active").siblings().removeClass("active");
    			$("#yield_type").val(obj);
    			$(".plotsYield_table input").each(function(){
    				var val = $(this).val()
    				if(val!=""){
    					var tempv = parseFloat(val)/parseFloat(area);
    					tempv = tempv.toFixed(2);
    					$(this).val(tempv);
    				}
    			});
    		}else if(obj==2&&obj!=$("#yield_type").val()){
    			$(".nav-tabs1 > li:eq(0)").addClass("active").siblings().removeClass("active");
    			$("#yield_type").val(obj);
    			$(".plotsYield_table input").each(function(){
    				var val = $(this).val()
    				if(val!=""){
    					var tempv = parseFloat(val)*parseFloat(area);
    					tempv = tempv.toFixed(2);
    					$(this).val(tempv);
    				}
    			});
    		}
    		resetHightChart();
    	}
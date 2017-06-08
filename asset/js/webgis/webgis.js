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
	/**
	 * 弹框是否是展开的
	 */
	var isOpened = false;
	
	var atlasManager = new ol.style.AtlasManager({
		  initialSize: 512
		});
	/**
	 * 获取定位之后显示在地图上的圆点图片
	 */
    var locationSrc = "/asset/images/locationimg.png";
	
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
				image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
					anchor: [0.5, 46], //数组1 分数0-1范围 左=0,右=1 ,数组2 从上到下上=0,下=1 当前用的像素单位
					anchorXUnits: 'fraction', //分数
					anchorYUnits: 'pixels',//像素
					src: '/asset/images/zb.png'
				})),
			}),
		    /**
		     * 基地规划中polygon 样式
		     */
	        drawBaseStyle :new ol.style.Style({
	        	stroke: new ol.style.Stroke({//polygon的边线
	        		color: "#127dff",
	        		lineDash: [10, 10],//虚线
	        		width: 4
	        	}),
	        	fill: new ol.style.Fill({//polygon的填充
	        		color: "rgba(18,125,255, 0.1)"
	        	}),
	        	zIndex : BASE_Z
	        	,atlasManager: atlasManager
	        }),
	        /**
		     * 基地规划完成之后样式
		     */
	        baseStyle :new ol.style.Style({
	        	stroke: new ol.style.Stroke({
	        		color: "#127dff",
	        		width: 4
	        	}),
	        	fill: new ol.style.Fill({
	        		color: "rgba(18,125,255, 0.1)"
	        	}),
	        	zIndex : BASE_Z
	        	,atlasManager: atlasManager
	        }),
	        /**
	         * 分区规划中polygon 样式
	         */
	        drawPartitionStyle : new ol.style.Style({
	        	stroke: new ol.style.Stroke({
	        		color: "#FFFFFF",
	        		lineDash: [10, 10],
	        		width: 2
	        	}),
	        	fill: new ol.style.Fill({
	        		color: "rgba(255,255,255, 0.45)"
	        	}),
	        	zIndex : PARTITIONS_Z
	        	,atlasManager: atlasManager
	        }),
	        /**
	         * 分区规划完成之后样式
	         */
	        partitionStyle : new ol.style.Style({
	        	stroke: new ol.style.Stroke({
	        		color: "#FFFFFF",
	        		width: 4
	        	}),
	        	fill: new ol.style.Fill({
	        		color: "rgba(255,255,255, 0.45)"
	        	}),
	        	zIndex : PARTITIONS_Z
	        	,atlasManager: atlasManager
	        }),
	        /**
	         * 地块规划中polygon 样式
	         */
	        drawTunnelInfoStyle : new ol.style.Style({
	        	stroke: new ol.style.Stroke({
	        		color: "#FFFFFF",
	        		lineDash: [10, 10],
	        		width: 2
	        	}),
	        	fill: new ol.style.Fill({
	        		color: "rgba(255,255,255, 0.45)"
	        	}),
	        	zIndex : TUNNEL_Z
	        	,atlasManager: atlasManager
	        }),
	        /**
	         * 地块规划完成之后样式
	         */
	        tunnelInfoStyle : new ol.style.Style({
	        	stroke: new ol.style.Stroke({
	        		color: "#FFFFFF",
	        		width: 2
	        	}),
	        	fill: new ol.style.Fill({
	        		color: "rgba(255,255,255, 0.45)"
	        	}),
	        	zIndex : TUNNEL_Z
	        	,atlasManager: atlasManager
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
      });
	/**
	 * 获取定位之后显示在地图上的圆点图片
	 */
    var locationSrc = "/asset/images/locationimg.png";
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
    var yea = nowD.getFullYear();
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
	 * 是否初始化土壤数据
	 */
	var isSoilOption = false;
	/**
	 * 土壤类型
	 */
	var landData;
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
	 * 是否使用帮助
	 */
	var mapHelpEnable = GetQueryString("help_tips");
	mapHelpEnable = mapHelpEnable == "false" ? "false" : "true";
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
	 * 基地锚点的坐标备份
	 */
	var backMarkerCoordinate = null;
	
	/**
	 * 基地锚点备份id
	 */
	var backMarkerId = null;
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
	 * 加载基地信息完成
	 */
	var firstOk = false;
	
	/**
	 * 加载分区信息完成
	 */
	var secondOk = false;
	
	/**
	 * 加载地块信息完成
	 */
	var thirdOk = false;
		
	/**
	 * 初始化双击选中Feature时间
	 */
	var doubleClickSelect = new ol.interaction.Select({
		condition:ol.events.condition.doubleClick
	  });
	var isDoubleClickRemoved = false;
	
	/**
	 * 输出坐标的方法
	 */
	var writer = new ol.format.GeoJSON();
	
	var popup;
	
	/**
	 * 基地信息展示框
	 */
	var markerPopup;
	
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
		$(".webgis-navbar .on").removeClass("on");
		var clientWidth = document.body.clientWidth;
		var split = $('#foo').split();
		split.position(clientWidth);//关闭弹出框
		setTimeout(function(){omap.updateSize()}, 10);
		if(clickModifyFeatures != null)
			clickModifyFeatures.clear();
		google.maps.event.trigger(gmap, "resize");//触发地图resize方法,否则google map 和ol map 有偏移
		if(isDoubleClickRemoved);//事件已被移除
			omap.addInteraction(doubleClickSelect);//OL地图添加双击事件
		omap.removeInteraction(modify);//OL地图删除Feature的编辑时间
		omap.removeInteraction(moveInteraction);//OL删除Tips
		moveInteraction = null;
		backCoordinate = null;
		var view = omap.getView();
		var center = ol.proj.transform(view.getCenter(), 'EPSG:3857', 'EPSG:4326');
		gmap.setCenter(new google.maps.LatLng(center[1], center[0]));//重新校对地图中心点
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
	 * 地图搜索地址
	 * @param address
	 * @returns {Boolean}
	 */
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
						var latlng = ol.proj.transform([lng, lat], 'EPSG:4326', 'EPSG:3857');
						omap.getView().setCenter(latlng);
						omap.getView().setZoom(15);
					} else {  
						alert("谷歌地图没有找到的原因是:" + status);  
					}  
				});  
			}  
		}  
	}
	
	/**
	 * 没有坐标的基地 集合
	 */
	var nullGroupFirst = new Array();
	/**
	 * 没有坐标的分区 集合
	 */
	var nullGroupSecond = new Array();
	/**
	 * 没有坐标的地块 集合
	 */
	var nullGroupThird = new Array();
	
	var nullGroupSecondInd = false;
	var nullGroupFirstInd = false;
	var nullGroupThirdInd = false;
	
	/**
	 * 鼠标单机地图事件
	 */
	var singleClickEvent ;
	/**
	 * 初始化页面
	 */
	$(function() {
		var viewAdmin = GetQueryStringCH("viewAdmin");
		var viewFarmer = GetQueryStringCH("viewFarmer");
		$(".viewAdmin").html(viewAdmin);
		$(".viewFarmer").html(viewFarmer);
		$('.baseMap_ttl').click(function(){
			if($(this).next('.baseMap_con').is(':hidden')){
				$(this).css('background','url(/asset/images/baseIcojian1.png) no-repeat 10px center');
				$(this).next('.baseMap_con').slideDown(1000);	
			}else{
				$(this).css('background','url(/asset/images/baseIcojian2.png) no-repeat 13px center');
				$(this).next('.baseMap_con').slideUp(1000);	
			}
		});
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
		$(".factoryTime").datetimepicker({
			format: "yyyy-mm-dd",
			autoclose: true,
			weekStart: 1,
			language:  'zh-CN',
			minView:2,
			pickerPosition: "bottom-left"
		});
	    $(".testTime").datetimepicker({
			format: "yyyy-mm-dd",
			autoclose: true,
			weekStart: 1,
			language:  'zh-CN',
			minView:2,
			pickerPosition: "bottom-left"
		});
		/**初始化基地颜色选择框 */
		$('#basecolor').ColorPicker({
	        color: '#127dff',
	        onBeforeShow: function () {
	        	var val = $("#mark_color").val();
	        	val = val==""?"#FFFFFF":val;
	        	val = val.split("#")[1];
                $(this).ColorPickerSetColor(val);
            },
	        onShow: function (colpkr) {
	            $(colpkr).fadeIn(300);
	            return false;
	        },
	        onHide: function (colpkr) {
	            $(colpkr).fadeOut(300);
	            return false;
	        },
	        onChange: function (hsb, hex, rgb) {
	        	$("#mark_color").val('#' + hex);
	            $('#basecolor div').css('backgroundColor', '#' + hex);//当选中颜色时div同时修改
	        }
	    });
		/**初始化分区颜色选择框 */
		$('#partitionscolor').ColorPicker({
	        color: '#127dff',
	        onBeforeShow: function () {
	        	var val = $("#mark_color").val();
	        	val = val==""?"#FFFFFF":val;
	        	val = val.split("#")[1];
                $(this).ColorPickerSetColor(val);
            },
	        onShow: function (colpkr) {
	            $(colpkr).fadeIn(300);
	            return false;
	        },
	        onHide: function (colpkr) {
	            $(colpkr).fadeOut(300);
	            return false;
	        },
	        onChange: function (hsb, hex, rgb) {
	        	$("#partitions_color").val('#' + hex);
	            $('#partitionscolor div').css('backgroundColor', '#' + hex);
	        }
	    });
		/**初始化地块颜色选择框 */
		$('#tunnelinfocolor').ColorPicker({
	        color: '#127dff',
	        onBeforeShow: function () {
	        	var val = $("#mark_color").val();
	        	val = val==""?"#FFFFFF":val;
	        	val = val.split("#")[1];
                $(this).ColorPickerSetColor(val);
            },
	        onShow: function (colpkr) {
	            $(colpkr).fadeIn(300);
	            return false;
	        },
	        onHide: function (colpkr) {
	            $(colpkr).fadeOut(300);
	            return false;
	        },
	        onChange: function (hsb, hex, rgb) {
	        	$("#tunnel_info_color").val('#' + hex);
	            $('#tunnelinfocolor div').css('backgroundColor', '#' + hex);
	        }
	    });
		$(".search_btn").click(function(){
			var address = $("#ser_input").val();
			if(address!=null&&address!=""&&address!=" "){
				searchmap(address);
			}
		});
   	   	$("select").not(".notCheck").each(function(){
   			if($(this).find("option").length==0){//没有选项的select 添加默认选项
   				$(this).append(noneOption);
   			}
   		});
		$('select').not(".notselect").selectpicker({size:8,dropupAuto:false});//初始化select 控件
		$(".box_back").not("#copy_tips").css({"height":document.body.clientHeight+"px","width":document.body.clientWidth+"px","top":0});
		
		var ttt__ = "";
      	for(var i = 2000;i<2050;i++){
          	if(i==yea)
				ttt__ +="<option selected='selected' value='"+i+"'>"+i+"年</option>";
			else
				ttt__ +="<option value='"+i+"'>"+i+"年</option>";
      	}
      	$("#soil_begin").append( ttt__ );
      	$("#soil_end").append( ttt__ );
		
		//新手指导切换
		$(".tsbzd span").each(function(){
			$(this).bind("click",function(){
				$(".tsbzd span").attr("class","ts_step1");
				$(this).attr("class","ts_step2");		
				var index = $(this).index();
				$(".tsbzdTarget div").hide();
				$(".tsbzdTarget div").eq(index).show();
			});
		})
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
		$("#video_iframe").css("height",document.body.clientHeight- 101-21 +"px ");
		var splitbuttonV ="<div style='cursor: pointer;' class='splitbuttonV'  onclick='operateDoor()'></div>";
		$(".vsplitter").append(splitbuttonV); 	
		//回车事件监听
		document.onkeydown=function(event){ 
            e = event ? event :(window.event ? window.event : null); 
            if(e.keyCode==13){ 
                if(document.activeElement.id=="tc_top_input"){
                	searchs();
                }else if(document.activeElement.id=="ser_input"){
                	$(".search_btn").trigger("click");
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
        
        //定位基地
        $('#add-marker').click(function(){
        	addMarker();
        });
        //圈定基地
        $('#add-base').click(function(){
        	addBase();
        });
        //增加区域
        $('#add-partitions').click(function(){
        	addPartitions();
        });
        
        //加热温室
        $('#add-jiarws').click(function(){
        	addTunnelInfo(1);
        });
        //日光温室
        $('#add-rigws').click(function(){
        	addTunnelInfo(2);
        });
        //连栋温室
        $('#add-liandws').click(function(){
        	addTunnelInfo(3);
        });
        //春秋棚
        $('#add-chunqp').click(function(){
        	addTunnelInfo(4);
        });
        //大田
        $('#add-dat').click(function(){
        	addTunnelInfo(5);
        });
        //果树
        $('#add-guos').click(function(){
        	addTunnelInfo(6);
        });
        //水面
        $('#add-shuim').click(function(){
        	addTunnelInfo(7);
        });
        //养殖
        $('#add-yangz').click(function(){
        	addTunnelInfo(8);
        });
        
        //传感器
        $('#add-device').click(function(){
        	addDevice();
        });
        //气象站
        $('#add-weather').click(function(){
        	addWeatherStation();
        });
        //摄像头
        $('#add-video').click(function(){
        	addVideo();
        });
        //四季田景
        $('#add-panorama').click(function(){
        	addKrpano();
        });
        
        //搜索地址获取焦点及失去焦点事件
        $('#ser_input').focus(function(){
        	if($(this).val()=="请输入搜索地址"){
        		$(this).val("");
    			jQuery("#ser_input").css("color","#000");
    		}
        });
        $('#ser_input').blur(function(){
        	if($(this).val()==""){
        		$(this).val("请输入搜索地址");
    			jQuery("#ser_input").css("color","#555");
    		}
        });
        
        //地块列表搜索
        $('#plotlist-search').click(function(){
        	searchs();
        });
        
        //（保存、取消、删除）基地信息=====
        $('#save-markerinfo').click(function(){
        	saveMarkerInfo();
        });
        $('#cancel-markerinfo').click(function(){
        	cancelMarkInfo();
        });
        $('#delete-markerinfo').click(function(){
        	deleteBase($('#mark_info_id').val());
        });
        
        //（保存、取消、删除）基地边界信息=====
        $('#save-boundaryinfo').click(function(){
        	saveBase();
        });
        $('#cancel-boundaryinfo').click(function(){
        	cancelBase();
        });
        $('#delete-boundaryinfo').click(function(){
        	deleteBase($('#base_id').val());
        });
        
        //（保存、取消、删除）分区信息=====
        $('#save-partitions').click(function(){
        	savePartitions();
        });
        $('#cancel-partitions').click(function(){
        	cancelPartitions();
        });
        $('#delete-partitions').click(function(){
        	deletePartitions($('#partitions_id').val());
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
        
        //（保存、取消、删除）设备信息=====
        $('#save-deviceinfo').click(function(){
        	saveDeviceInfo();
        });
        $('#cancel-deviceinfo').click(function(){
        	cancelDeviceInfo();
        });
        $('#delete-deviceinfo').click(function(){
        	deleteDevice($('#device_id').val());
        });
        
        //（保存、取消、删除）摄像头信息=====
        $('#save-videoinfo').click(function(){
        	$('#video_iframe').contents().find('.video_btn_ok').trigger('click');
        });
        $('#cancel-videoinfo').click(function(){
        	$('#video_iframe').contents().find('.video_btn_cancel').trigger('click');
        });
        $('#delete-videoinfo').click(function(){
        	deleteVideo();
        });
        
        //（预览、保存、取消、删除）全景信息=====
        $('#preview-krpanoinfo').click(function(){
        	if(checkPreviewKrpano())previewKrpano_before();
        });
        $('#save-krpanoinfo').click(function(){
        	saveKrpano();
        });
        $('#cancel-krpanoinfo').click(function(){
        	krpano_no();
        });
        $('#delete-krpanoinfo').click(function(){
        	deleteKrpano($('#krpano_id').val());
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
        
        //【隐藏、删除】 previewDiv内容
        $('#previewDiv .big_images').click(function(){
        	$('#previewDiv').hide();
        });
        $('#previewDiv .img_box').click(function(){
        	//document.getElementById('previewDiv').style.display='none';
        	$('#previewDiv').hide();
        });
        
        //添加土地使用记录、土地检测记录
        $('#add-usefield').click(function(){
        	addSoil();
        });
        $('#add-landtest').click(function(){
        	addland();
        });
        
        //新手帮助弹框
        $('#mapHelp').click(function(){
        	mapHelpOpen();
        });
        //点击关闭新手帮助弹框
        $('.new-guidance-model .tscolse').click(function(){
        	mapHelpCloseCheck();
        });
        //新手帮手的缩放功能
        $('.new-guidance-model .sf_btn').click(function(){
        	HelpZoomFn('help-zoom','zoom-btn');
        });
        //新手帮助确定按钮事件
        $('#mapHelpOk').click(function(){
        	mapHelpOk()();
        });
        //新手帮助返回按钮事件
        $('#mapHelpNo').click(function(){
        	mapHelpNo();
        });
        //右上角航拍按钮事件
        $('.aerial-btn').click(function(){
        	openAerialVideo();
        });
        //保存农户
        $('#save-farmerinfo').click(function(){
        	saveFarmer();
        });
        //取消农户编辑
        $('#cancel-farmerinfo').click(function(){
        	cancelFarmer();
        });
        
        //保存土地检测记录
        $('#save-test').click(function(){
        	saveTest();
        });
        
        //取消检测记录
        $('#cancel-test').click(function(){
        	cancelTest();
        });
        
        //取消土地使用记录
        $("#cancel-soil").click(function(){
        	cancelSoil();
        });
        
        //
        $("#save-soil").click(function(){
        	saveSoil();
        });
	});
	
	/**
	 * 初始化地图
	 */
	$(function() {
		$("#olmap").show();
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
	        interactions: ol.interaction.defaults({shiftDragZoom:false,altShiftDragRotate: false,dragPan: false,rotate: false}).extend([new ol.interaction.DragPan({kinetic: null}),new ol.interaction.MouseWheelZoom({constrainResolution:true})]),
	        target: olMapDiv,
	        view: view,
	        layers: [locationVector,markerVector,baseVector,partitionsVector,tunnelInfoVector,tunnelCenterPointVector,vector,deviceVector,videoVector,krpanoVector,baseTextVector,partitionTextVector,tunnelInfoTextVector,krpanoTextVector]
	    });
    	view.setCenter(ol.proj.transform(center, 'EPSG:4326', 'EPSG:3857'));
		view.setZoom(defaultZoom);
		
		olMapDiv.parentNode.removeChild(olMapDiv);
		/**添加Draw图标*/
		gmap.controls[google.maps.ControlPosition.TOP_LEFT].push(olMapDiv);
		singleClickEvent = omap.on('singleclick', function(evt){mapClick(evt);});
		
		addDoubleEvent();
		initMapFirst();
		initMapSecond();
		initMapThird();
		initSoilOption();
		sourceAddFeature();
		mapViewAddListener();
		setupGuide();
		var basePointElement = document.createElement('div');
		basePointElement.setAttribute("id", "basePointElement");
		basePointElement.classList.add("basePoint");
		basePointElement.classList.add("marker");
		
		markerPopup = new ol.Overlay({
	        element: basePointElement,
	        positioning: 'bottom-center',
	        //stopEvent: false,
	        offset: [0, -55]
	      });
	    omap.addOverlay(markerPopup);
	    
	    omap.on('pointermove', function(e) {
	        if (e.dragging) {
	          $(".marker").hide();
	          return;
	        }
	        //var pixel = omap.getEventPixel(e.originalEvent);
	        //var hit = omap.hasFeatureAtPixel(pixel);
	        //omap.getTarget().style.cursor = hit ? 'pointer' : '';
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
					omap.updateSize();
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
	
	function openMarkerWindow(feature){
		var latlng = feature.getGeometry().getCoordinates();
    	$("#divtittle").html("编辑基地信息");
    	$("#mark_info_id").val(feature.get("base_id_"));
    	$("#mark_info_index").val(feature.get("index_"));
    	$("#marker_name").val(feature.get("name_"));
    	var glatlng = ol.proj.transform(latlng , 'EPSG:3857', 'EPSG:4326');
    	$("#mark_info_x").val(glatlng[1]);
    	$("#mark_info_y").val(glatlng[0]);
    	$(".rightNo").hide();
    	$(".rightNo1").show();
    	try{closeAutoCom(1);}catch(e){}
		openAutoCom(1);
    	openDoor();
	}
	
	/**
	 * 添加OL地图双击选中事件
	 */
	function addDoubleEvent(){
		omap.addInteraction(doubleClickSelect);
		doubleClickSelect.on("select",function(evt){//当选中之后触发的事件
			
			//随意切换,需要清空之前的数组和还原样式等操作
			if(clickModifyFeatures != null && clickModifyFeatures.getArray().length>0){
				var feature = clickModifyFeatures.getArray()[0];
				var ftype = feature.get("ftype");
				if(ftype == BASE || ftype == PARTITIONS || ftype == TUNNELINFO){
					var style_ = feature.getStyle();
					style_.getStroke().setLineDash(null);
					feature.setStyle(style_);
				}
				clickModifyFeatures.clear();
			}
			if(modify != null){
				omap.removeInteraction(modify);
				modify = null;
			};

			//双击选中的feature 弹出右侧弹框
			var features = evt.selected;
			var feature = features[0];
			var ftype = feature.get("ftype");
			if(ftype == MARKER){//打开基地信息弹出框
				openMarkerWindow(feature);
			}else if(ftype == BASE){//打开基地polygon信息弹出框
				$("#divtittle").html("编辑基地信息");
				featurelCoordinates = feature.getGeometry().getCoordinates();
				var style_ = feature.getStyle();
				style_.getStroke().setLineDash([10,10]);//设置边线为虚线
				feature.setStyle(style_);
				clickModifyFeatures = new ol.Collection();
				clickModifyFeatures.push(feature);
				modify = new ol.interaction.Modify({ 
	                features: clickModifyFeatures,
	              });
	            modify.on("modifyend",function(evt){//修改基地边框
					var feature_temp = evt.features.getArray()[0];
					var features = baseSource.getFeatures();
					var thisFeature = evt.features.getArray()[0];//当前 操作的Feature
					for(var i = 0;i<features.length;i++){//判断坐标集中的坐标是否在其他基地范围内
						var temp = features[i];
						if(temp.getGeometry().intersectsCoordinate(evt.mapBrowserEvent.coordinate)){
							if(temp.get("base_id_") && feature_temp.get("base_id_") != temp.get("base_id_")){
								feature_temp.getGeometry().setCoordinates(featurelCoordinates);
								$("#mark_mu_number").val(formatArea(feature_temp.getGeometry()));
								$("#mark_coordinate_group").val(writer.writeGeometry(feature_temp.getGeometry().clone().transform("EPSG:3857","EPSG:4326")));
								return;
							}else{
								
							}
						}
					}
					var markerFeature = markerSource.getFeatures();
					var tempBoolean = false; //判断新的图形是否还包含原来的大头针
					for(var i = 0;i<markerFeature.length;i++){
						var temp = markerFeature[i];
						if(thisFeature.getGeometry().intersectsCoordinate( temp.getGeometry().getCoordinates())){
							if(thisFeature.get("base_id_") != temp.get("base_id_")){
								feature_temp.getGeometry().setCoordinates(featurelCoordinates);
								$("#mark_mu_number").val(formatArea(feature_temp.getGeometry()));
								$("#mark_coordinate_group").val(writer.writeGeometry(feature_temp.getGeometry().clone().transform("EPSG:3857","EPSG:4326")));
								return;
							}else{
								tempBoolean = true;
							}
							
						}
						if(i == markerFeature.length-1 && !tempBoolean){
							feature_temp.getGeometry().setCoordinates(featurelCoordinates);
							$("#mark_mu_number").val(formatArea(feature_temp.getGeometry()));
							$("#mark_coordinate_group").val(writer.writeGeometry(feature_temp.getGeometry().clone().transform("EPSG:3857","EPSG:4326")));
							return;
						}
					}
					$("#mark_mu_number").val(formatArea(feature_temp.getGeometry()));
					$("#mark_coordinate_group").val(writer.writeGeometry(feature_temp.getGeometry().clone().transform("EPSG:3857","EPSG:4326")));
	            });
	            omap.addInteraction(modify);
				openBaseWindow(feature);
			}else if(ftype == PARTITIONS){
				$("#divtittle").html("编辑分区信息");
				featurelCoordinates = feature.getGeometry().getCoordinates();
				var style_ = feature.getStyle();
				style_.getStroke().setLineDash([10,10]);
				feature.setStyle(style_);
				clickModifyFeatures = new ol.Collection();
				clickModifyFeatures.push(feature);
				modify = new ol.interaction.Modify({
	                features: clickModifyFeatures,
	              });
	            modify.on("modifyend",function(evt){//当坐标点移动之后
					var result = baseSource.getFeaturesAtCoordinate(evt.mapBrowserEvent.coordinate);//通过第一个坐标获取所在基地信息
					var feature_temp = evt.features.getArray()[0];
					if(result.length > 1 || result.length == 0){
						feature_temp.getGeometry().setCoordinates(featurelCoordinates);
						return;
					}else if(result.length == 1){
						var result0 = result[0];
						if(result0.get("base_id_") != feature_temp.get("base_id_")){//如果基地信息和自己所属的基地不同,失败
							feature_temp.getGeometry().setCoordinates(featurelCoordinates);
							return;
						}
					}
					var latlng = feature_temp.getGeometry().getInteriorPoint().getCoordinates();
					latlng = ol.proj.transform(latlng, 'EPSG:3857', 'EPSG:4326');
					$("#partitions_coordinate_X").val(latlng[1]);
					$("#partitions_coordinate_Y").val(latlng[0]);
					$("#partitions_mu_number").val(formatArea(feature_temp.getGeometry()));
					$("#partitions_coordinate_group").val(writer.writeGeometry(feature_temp.getGeometry().clone().transform("EPSG:3857","EPSG:4326")));
	            });
	            omap.addInteraction(modify);
	            
	            var latlng = feature.getGeometry().getInteriorPoint().getCoordinates();
	            omap.getView().setZoom(17);
				omap.getView().setCenter(latlng);
				openPartitionsWindow(feature);
			}else if(ftype == TUNNELINFO){
				$("#divtittle").html("编辑地块信息");
				featurelCoordinates = feature.getGeometry().getCoordinates();
				var style_ = feature.getStyle();
				style_.getStroke().setLineDash([10,10]);
				feature.setStyle(style_);
				clickModifyFeatures = new ol.Collection();
				clickModifyFeatures.push(feature); 
				modify = new ol.interaction.Modify({
	                features:clickModifyFeatures,
	              });
	            modify.on("modifyend",function(evt){
	            	var feature_temp = evt.features.getArray()[0];
	            	var base = tunnelInfoInPolygon(feature_temp,baseSource);
	        		if(base == null){
	        			feature_temp.getGeometry().setCoordinates(featurelCoordinates);
	        			return ;
	        		}
	        		var partition = tunnelInfoInPolygon(feature_temp,partitionsSource);
	        		var ind__ = feature_temp.get("tunnel_info_type_");
	        		if(partition == null ){
	        			if(ind__ != 7){
	        				feature_temp.getGeometry().setCoordinates(featurelCoordinates);
	            			return ;
	        			}
	        		}
	        		var area_ = formatArea(feature_temp.getGeometry())
	        		$("#tunnel_info_area").val(area_);
	        		$("#tunnel_info_mu_number_read").html(area_+"亩");
					$("#tunnel_info_mu_number").val(area_);
					//创建地块中心点圆图
					var center = tunnelCenterPointSource.getFeatureById(feature.getId());
					if(center != null){
						center.setGeometry(feature.getGeometry().getInteriorPoint());
					}
					//创建地块文字
					var wenzi = tunnelInfoTextSource.getFeatureById(feature.getId());
					if(wenzi != null){
						wenzi.setGeometry(feature.getGeometry().getInteriorPoint());
					}
	            });
	            omap.addInteraction(modify);
	            var center = tunnelCenterPointSource.getFeatureById(feature.getId());
				if(center != null){
					omap.getView().setZoom(19);
					omap.getView().setCenter(center.getGeometry().getCoordinates());
				}
				openTunnelInfosWindow(feature);
			}else if(ftype == DEVICE || ftype == WEATHER_STATION){
				feature.getGeometry().clone().getCoordinates();
				$("#divtittle").html("编辑设备信息");
				openDeviceWindow(feature);
			}else if(ftype == VIDEO){
				feature.getGeometry().clone().getCoordinates();
				$("#divtittle").html("编辑视频信息");
				openVideoWindow(feature);
			}else if(ftype == KRPANO){
				feature.getGeometry().clone().getCoordinates();
				$("#divtittle").html("编辑四季田景信息");
				targetKrpano = feature;
				openKrpanoWindow(feature);
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
        	if (feature.get("ftype") == MARKER ) {
        		if($("#rightPane").width()>0){
        			return ;
        		}
        		if(backMarkerId == "temp_")
        			return ;
        		if(backMarkerCoordinate != null && backMarkerId != feature.get("base_id_")){
        			return ;
        		}
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
                if(base != null){
                	contact = base.get("mark_contact_");
                	phone = base.get("mark_phone_");
                	address = base.get("mark_address_");
                	mark = base.get("mark_description_");
                	
                }
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
                $('#olmap .editBtn').unbind("click");
                $('#olmap .editBtn').click(function(){
            		if($("#dropdown-menu2").is(":visible")){//如果是显示
        				$("#dropdown-menu2").hide(500);//隐藏它
          			}
          			else{//否则，如果是隐藏
          				$("#dropdown-menu2").show(500);
          			}
          		});
                $('#olmap .close').unbind("click");
                $('#olmap .close').click(function(){
                	closeBasePointElement();
                });
                $("#olmap .toEdit").unbind("click");
                $("#olmap .toEdit").click(function(){
                	toEditMarker(feature);
                });
                $("#olmap .moveXy").unbind("click");
                $("#olmap .moveXy").click(function(){
                	moveLatLng(feature);
                });
                $("#olmap .moveAll").unbind("click");
                $("#olmap .moveAll").click(function(){
                	moveAll(feature);
                });
//                openMarkerWindow(feature);
        	}
        }
	}
	
	function toEditMarker(feature){
		doubleClickSelect.dispatchEvent({
			  type: 'select',
			  selected: [feature],
			  deselected: []
		});
		omap.getView().setCenter(feature.getGeometry().getCoordinates());
		closeBasePointElement();
	}
	
	function moveLatLng (feature){
		backCoordinate = feature.getGeometry().clone().getCoordinates();
		backMarkerCoordinate = feature.getGeometry().clone().getCoordinates();;
		backMarkerId = feature.get("base_id_");
		moveTarget = feature.getId();
		moveInteraction = new app.Drag();
		omap.addInteraction(moveInteraction);
		closeBasePointElement();
	}
	
	function moveAll(feature) {
		
		closeBasePointElement();
	}
	
	/**
	 * 新手指导是否显示
	 */
	function setupGuide(){
		if(firstOk && secondOk && thirdOk){
			console.log(1)
		}else{
			setTimeout(function(){
				console.log(2)
				setupGuide();
			}, 100);
		}
	}
	
	/**
	 * draw按钮
	 */
	function drawContral(opt_options){
		var options = opt_options || {};
		var ul = $(".webgis-navbar");
		var draw_ul = $(".webgis-navbar")[0];
//		ul.remove();

        var element = document.createElement('div');
        element.className = 'drawControl ';
        element.appendChild(draw_ul);

        ol.control.Control.call(this, {
          element: element,
          target: options.target
        });
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
	 * 检查marker的坐标是否正确.是超出90 和-90 ,180 和-180 范围;
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
	 * 初始化基地和分区 Feature
	 * @param response
	 */
	function initMapFirstNext( response ){
		if(response.invoke_result == "INVOKE_SUCCESS"){
			firstOk = true;
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
					var tob = {"value":base.base_id,"label":base.name};
					nullGroupFirst.push(tob);
					continue;
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
			
			secondOk = true;
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
				}else{
					var tob = {"value":partition.part_id,"label":partition.name,"base_id":partition.base_id};
					nullGroupSecond.push(tob);
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
			thirdOk = true;
			var data = response.data;
			var tunnel_infos = data.tunnel_infos;
			tunnelJson.value = tunnel_infos;
			var scale = zoomScale(omap.getView().getZoom());
			if(scale == -1){
				tunnelInfoVector.setVisible(false);
			}
			for(var i = 0,j = tunnel_infos.length ; i < j ; i++ ){
				var tunnel_info = tunnel_infos[i];
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
					polygon.set("animal",tunnel_info.animal);
					tunnelInfoSource.addFeature(polygon);
//					var marker = new ol.Feature({
//						ftype : MARKER,
//						index_ : i,
//				        style: styles.marker,
//				        geometry: new ol.geom.Point(polygon.getGeometry().getInteriorPoint().getCoordinates())
//				      });
//					marker.setStyle(styles.marker);
//					markerSource.addFeature(marker);
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
								isrc = animalsrc;
							}
						}else{
							isrc = moreanimal;
						}
					}else{//种植
						var realPlantJson = tunnel_info.real_plant;
						if(realPlantJson != null){
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
								var t1 = new Date(rp.plant_begin_time.$date);
								var t2 = new Date(rp.plant_end_time.$date);
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
						}else{
							isrc = nonesrc;
						}
					}
					
					//中心点圆图
					var center = new ol.Feature({
						ftype : TUNNEL_INFO_CENTER,
						index_ : i,
						imgurl : isrc,
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
				}else{
					var tob = {"value":tunnel_info.tunnel_id,"label":tunnel_info.name,"base_id":tunnel_info.base_id,"part_id":tunnel_info.partitions_id,"ent_type":tunnel_info.plant_env_type_id};
					nullGroupThird.push(tob);	
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
					factory_time_ : device.factory_time == null || device.factory_time == "" ? "" : (new Date(device.factory_time.$date)).format(("yyyy-MM-dd")),
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
					krpano_time_ : krpano.krpano_time == null ? "" : (new Date(krpano.krpano_time.$date)).format(("yyyy-MM-dd")),
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
	
	var draw = null;
	var modify = null;
	/**
	 * 添加的时候.修改边界的Feature集合
	 */
	var modifyFeatures = new ol.Collection();
	
	/**
	 * 双击之后,修改的边界的Features 集合
	 */
	var clickModifyFeatures ;

	/**
	 * 添加基地中心点标注
	 */
	function addMarker(){
		omap.removeOverlay(helpTooltip);
		if(!checkDrawState()){
			return ;
		}
        draw = new ol.interaction.Draw({
	        source: source,
	        type: "Point",
	        snapTolerance: 12,
	        style:styles.marker
        });
        omap.addInteraction(draw);
        draw.on('drawend',function(evt) {
        	evt.feature.set("ftype",MARKER);
        	omap.removeInteraction(draw);
        }, this);
        omap.removeInteraction(doubleClickSelect);
        isDoubleClickRemoved = true;
        showGuideTips(0);
        $(".webgis-navbar .on").removeClass("on");
        $(".add-marker").addClass("on");
	}
	
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
    	    	if(feature.get("ftype") == MARKER){
    	    		feature.setStyle(styles.marker);
    	        	var geo = feature.getGeometry();
    	        	var latlng = geo.getCoordinates();
    	        	feature.set("index_",MARKER__INDEX); 
//    	        	feature.set("base_id_","");
//    	        	feature.set("name_","");
    	        	feature.setId("temp_");
    	        	$("#mark_info_index").val(MARKER__INDEX);
    	        	
    	        	if(baseSource.getFeaturesAtCoordinate(latlng).length > 0){//验证基地中心点是否在别的基地中
    	        		omap.removeInteraction(draw);
    	        		draw = null;
    	        		source.clear();
    	        		alert("基地重复!请重新规划");
    	        		return false;
    	        	}else{
    	        		backMarkerId = "temp_";
    	        		backCoordinate = feature.getGeometry().clone().getCoordinates();
    	        		moveTarget = "temp_";
    	        		moveInteraction = new app.Drag();
    	        		omap.addInteraction(moveInteraction);
    	            	openMarkerWindow(feature);
    	        	}
    	        	MARKER__INDEX++;
    	    	}else if(feature.get("ftype") == DEVICE){
    	    		feature.setStyle(styles.deviceStyle);
    	        	var geo = feature.getGeometry();
    	        	var latlng = geo.getCoordinates();
    	        	var tunnelInfos = tunnelInfoSource.getFeaturesAtCoordinate(latlng);
    	        	var tunnelInfo = null;
    	        	if(tunnelInfos.length>0){//判断传感器是否在地块中
    	        		tunnelInfo = tunnelInfos[0];
    	        	}
    	        	if(tunnelInfo == null){
    	        		omap.removeInteraction(draw);
    	        		draw = null;
    	        		source.clear();
    	        		alert("传感器须放置到地块中!");
    	        		return false;
    	        	}else if(tunnelInfo.get("tunnel_info_device_id_") != null && tunnelInfo.get("tunnel_info_device_id_") != "" ){//验证地块是否已存在传感器
    	        		omap.removeInteraction(draw);
    	        		draw = null;
    	        		source.clear();
    	        		alert("该地块已存在传感器!");
    	        		return false;
    	        	}else{
    	        		var partitions = partitionsSource.getFeaturesAtCoordinate(latlng);
    	        		var partition = null;
    	        		if(partitions.length>0){//获取气象站所在分区信息
    	        			partition = partitions[0];
    	        			feature.set("partitions_id_",partition.get("partitions_id_"));
        	        	}else{
        	        		feature.set("partitions_id_","");
        	        	}
    	        		
    	        		feature.set("index_",DEVICE_INDEX);
    	        		feature.setId("device_" + DEVICE_INDEX);
        	        	feature.set("device_id_","");
        	        	feature.set("name_","");
        	        	feature.set("device_type_",1);
        	        	feature.set("device_type_id_",101);
        	        	feature.set("description_","");
        	        	feature.set("factory_time_","");
        	        	feature.set("base_id_",tunnelInfo.get("tunnel_info_base_id_"));
        	        	feature.set("tunnel_info_id_",tunnelInfo.get("tunnel_info_id_"));
        	        	DEVICE_INDEX++;
        	        	openDeviceWindow(feature);
    	        	}
    	    	}else if(feature.get("ftype") == WEATHER_STATION){
    	    		feature.setStyle(styles.weatherStationStyle);
    	        	var geo = feature.getGeometry();
    	        	var latlng = geo.getCoordinates();
    	        	var bases = baseSource.getFeaturesAtCoordinate(latlng);
    	        	var base = null;
    	        	if(bases.length>0){
    	        		base = bases[0];
    	        	}
    	        	if(base == null){//验证气象站是否在基地中
    	        		omap.removeInteraction(draw);
    	        		draw = null;
    	        		source.clear();
    	        		alert("气象站须放置到基地中!");
    	        		return false;
    	        	}else{
    	        		var partitions = partitionsSource.getFeaturesAtCoordinate(latlng);
    	        		var partition = null;
    	        		if(partitions.length>0){//获取气象站所在分区信息
    	        			partition = partitions[0];
    	        			feature.set("partitions_id_",partition.get("partitions_id_"));
        	        	}else{
        	        		feature.set("partitions_id_","");
        	        	}
    	        		
    	        		feature.set("index_",DEVICE_INDEX);
    	        		feature.setId("device_" + DEVICE_INDEX);
        	        	feature.set("device_id_","");
        	        	feature.set("name_","");
        	        	feature.set("device_type_",2);
        	        	feature.set("device_type_id_",601);
        	        	feature.set("description_","");
        	        	feature.set("factory_time_","");
        	        	feature.set("base_id_",base.get("base_id_"));
        	        	DEVICE_INDEX++;
        	        	openDeviceWindow(feature);
    	        	}
    	    	}else if(feature.get("ftype") == VIDEO){
    	    		feature.setStyle(styles.videoStyle);
    	        	var geo = feature.getGeometry();
    	        	var latlng = geo.getCoordinates();
    	        	var bases = baseSource.getFeaturesAtCoordinate(latlng);
    	        	var base = null;
    	        	if(bases.length>0){
    	        		base = bases[0];
    	        	}
    	        	if(base == null){//验证摄像头是否在基地中
    	        		omap.removeInteraction(draw);
    	        		draw = null;
    	        		source.clear();
    	        		alert("视频须放置到基地中!");
    	        		return false;
    	        	}else{
    	        		feature.set("index_",VIDEO_INDEX);
    	        		feature.setId("video_" + VIDEO_INDEX);
        	        	feature.set("video_id_","");
        	        	feature.set("base_id_",base.get("base_id_"));
        	        	VIDEO_INDEX++;
        	        	openVideoWindow(feature);
    	        	}
    	    	}
    	    	
    	    });
    }
    
    /**
     * 基地中心点信息<br/>
     * Form表单验证和处理<br/>
     * 提交
     */
    function saveMarkerInfo(){
		var name = $("#marker_name").val();
		if(name==""){
			alert("请填写基地名称!");
			return ;
		}
		if($("#mark_name").val().length>45){
			alert("基地名称长度不能超过45个字符!");
			return ;
		}
		if(nullGroupFirst.length>0){
			for (var i = 0;i<nullGroupFirst.length;i++){
				var tob = nullGroupFirst[i];
				if(tob.label == name ){
					$("#mark_info_id").val(tob.value);
					nullGroupFirstInd = true;
					break;
				}
			}
		}
		var method = $("#mark_info_id").val()==""?"save_base_marker":"base_info_update";
		showTips();
    	$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':method,
				'field':"{'enterprise_info_id':"+enter_id+",'base_id':"+base_id+",'form':'"+encodeURIComponent($('#markerForm').serialize())+"'}"
			},
			success: function( response ) {
				hideTips();
				saveMarkInfoNext(response);
			},
			error: function(e) {
				hideTips();
				//log(2);
			}
		});	//-----end ajax
    }
    
    /**
     * 基地中心点保存返回值处理<br/>
     * Feature 属性填充
     * @param response
     */
    function saveMarkInfoNext(response){
    	if(response.invoke_result == "INVOKE_SUCCESS"){
			var data = response.data;
			var base_id = data.base_id;
			var feature = source.getFeatures()[0];
			var value = $("#mark_info_id").val();
			if(nullGroupFirstInd){
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
			var name = $("#marker_name").val();
			if(typeof(feature) == "undefined" || feature == null){
				feature = markerSource.getFeatureById("marker_"+$("#mark_info_id").val());
			}
			
			if($("#selectedName"+base_id,parent.document).length>0){
				$("#selectedName"+base_id,parent.document).html(name);
			}else{
				$(".siteSeleBd ul",parent.document).append("<li id='selected"+base_id+"'><a id='selectedName"+base_id+"' href='javascript:void(0)' onclick='changeBases("+base_id+");'>"+name+"</a></li>");
			}
			
			if(value == ""){
				var wenzi =  new ol.Feature({
					ftype : BASE_TEXT,
					index_ : BASE__INDEX,
					base_id_ : base_id,
					name_ : name,
			        geometry: feature.getGeometry()
			      });
				wenzi.setId("marker_" + base_id);
				baseTextSource.addFeature(wenzi);
			}else{
				var wenzi = baseTextSource.getFeatureById("marker_" + base_id);
				wenzi.setGeometry(feature.getGeometry());
				wenzi.set("name_",name);
			}
			
			feature.set("base_id_",base_id);
			feature.set("name_",name);
			feature.setId("marker_"+base_id);
			feature.set("hasBounds_",false);
			markerSource.addFeature(feature);
			backMarkerCoordinate = null
	    	backMarkerId = null;
			draw = null;
			BASE__INDEX++;
			source.clear();
			if(doubleClickSelect != null)
	    		doubleClickSelect.getFeatures().clear();
			closeDoor();
    	}else if(response.invoke_result == "OTHER_ERROR"){
    		
    		alert(response.invoke_message);
    		
		}else{
			log(response.invoke_message);
		}
    }
    /**
     * 取消基地中心点的编辑
     */
    function cancelMarkInfo(){
    	var marker_id = $("#mark_info_id").val();
    	if(marker_id != "" && backMarkerId == marker_id){
    		var feature = markerSource.getFeatureById("marker_"+ marker_id);
    		feature.getGeometry().setCoordinates(backMarkerCoordinate);
    	}
    	backMarkerCoordinate = null
    	backMarkerId = null;
    	draw = null;
    	if(doubleClickSelect != null)
    		doubleClickSelect.getFeatures().clear();
    	featurelCoordinates = null;
    	source.clear();
		closeDoor();
    }
    

    var sketch;
    var helpTooltipElement;
    var helpTooltip;
    var continuePolygonMsg = '通过单击完成规划!';
    
    /**
     * 创建规划提示的元素
     */
    var pointerMoveHandler = function(evt) {
    	if (evt.dragging) {
        return;
      }
      var helpMsg = '通过单击完成规划!';

      if (sketch) {
          helpMsg = continuePolygonMsg;
      }

      helpTooltipElement.innerHTML = helpMsg;
      helpTooltip.setPosition(evt.coordinate);

      helpTooltipElement.classList.remove('hidden');
    };

    /**
     * 创建规划提示,当鼠标移动是,Tip跟着移动
     */
    function createHelpTooltip() {
      if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
      }
      helpTooltipElement = document.createElement('div');
      helpTooltipElement.className = 'drawtooltip hidden';
      helpTooltip = new ol.Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
      });
      omap.addOverlay(helpTooltip);
    }

    /**
     * 删除规划提示
     */
    function removeHelpTooltip() {
        helpTooltipElement.classList.add('hidden');
      }
    
    var drawGeoOnChangeListener;
	var mapOnPointMoveListener;
	var mapViewMouseOutListener;
	var featurelCoordinates;
	/**
	 * 开始规划基地范围
	 */
    function addBase(){
    	if(!checkDrawState()){
			return ;
		}
        draw = new ol.interaction.Draw({
	        source: source,
	        ftype : BASE,
	        type: "Polygon",
	        snapTolerance: 12,
	        style:styles.drawBaseStyle

        });
        omap.removeInteraction(doubleClickSelect);
        isDoubleClickRemoved = true;
        omap.addInteraction(draw);
        createHelpTooltip();
        mapOnPointMoveListener = omap.on('pointermove', pointerMoveHandler);
        mapViewMouseOutListener = omap.getViewport().addEventListener('mouseout', function() {
            helpTooltipElement.classList.add('hidden');
        });
        draw.on('drawend',function(evt) {//当图形闭合之后触发
        	var markerFeatures = markerSource.getFeatures();
        	var style_ = new ol.style.Style({//设置样式
		    	stroke: new ol.style.Stroke({
		            color: "#127dff",
		            lineDash: [10, 10],
		            width: 4
		          }),
		        fill: new ol.style.Fill({
		            color: "rgba(18,125,255, 0.1)"
		          }),
		    	zIndex : BASE_Z
		    	,atlasManager: atlasManager
		    });
        	evt.feature.setStyle(style_);
        	evt.feature.set("ftype",BASE);
        	if(markerFeatures.length > 0){//当前地图中心点数量必须大于0
        		var arr = markersInBase(evt.feature);
        		/**
        		 * count(已圈中的中心点并且有边界)
        		 */
        		var hasBoundsArr = arr[0];
        		/**
        		 * count(已圈中的中心点并且没有边界)
        		 */
        		var notHasBoundsArr = arr[1];
        		if(hasBoundsArr.length > 0){
        			alert("请选中一个未规划的中心点");
        			evt.feature.set("deleted",true);
        			source.clear();
        			return ;
        		}else if(notHasBoundsArr.length != 1){
        			alert("请选中一个未规划的中心点");
        			evt.feature.set("deleted",true);
        			source.clear();
        			return ;
        		}else{
        			var centerPoint = notHasBoundsArr[0];
        			var valueOf = centerPoint.valueOf();
        			evt.feature.set("base_id_",valueOf.get("base_id_"));
        			evt.feature.set("name_",valueOf.get("name_"));
        			evt.feature.setId("base_"+valueOf.get("base_id_"));
        			evt.feature.set("index_",BASE__INDEX);
           		    evt.feature.set("mark_area_",formatArea(evt.feature.getGeometry()));
           		    evt.feature.set("mark_contact_","");
	           		evt.feature.set("mark_phone_","");
	           		evt.feature.set("mark_address_","");
	           		evt.feature.set("mark_description_","");
	           		evt.feature.set("mark_color_",evt.feature.getStyle().getFill().getColor().colorHex());
	           		BASE__INDEX++;
	           		openBaseWindow(evt.feature);
        		}
        	}
        	
        	//去掉提示
    		sketch = null;
            ol.Observable.unByKey(drawGeoOnChangeListener);
            omap.removeOverlay(helpTooltip);
            helpTooltipElement.classList.add('hidden');
            omap.removeInteraction(draw);
            
            modify = new ol.interaction.Modify({//给规划完的Polygon 添加编辑功能
                features: modifyFeatures,
              });
//            modify.on("change",function(){
//          	  log("change")
//            })
            modify.on("modifystart",function(evt){
          	  featurelCoordinates = evt.features.getArray()[0].getGeometry().getCoordinates();
            });
            modify.on("modifyend",function(evt){
				var result = baseSource.getFeaturesAtCoordinate(evt.mapBrowserEvent.coordinate);
				var feature_temp = evt.features.getArray()[0];
				if(result.length > 1){//判断最后操作的坐标点是否在其他的基地范围内
					feature_temp.getGeometry().setCoordinates(featurelCoordinates);
					return;
				}
				$("#mark_mu_number").val(formatArea(feature_temp.getGeometry()));
				$("#mark_coordinate_group").val(writer.writeGeometry(feature_temp.getGeometry().clone().transform("EPSG:3857","EPSG:4326")));
				featurelCoordinates = null;
            });
            omap.addInteraction(modify);
            omap.removeInteraction(draw);
            draw = null;
        }, this);
        $(".webgis-navbar .on").removeClass("on");
        $(".add-base").addClass("on");
        showGuideTips(1);
    }
    
    /**
     * 已有的中心点,哪个能被当前polygon圈中
     * @returns [count(已圈中的中心点并且有边界),<br/>count(已圈中的中心点并且没有边界)]
     */
    function markersInBase(feature){
    	var returnArr = [];
    	var hasBoundsArr = new Array();
    	var notHasBoundsArr = new Array();
    	var features = markerSource.getFeatures();
    	for(var i = 0,j = features.length ;i < j; i++){
    		var feature_temp = features[i]
			var latlng = feature_temp.getGeometry().getCoordinates();
			var bb = feature.getGeometry().intersectsCoordinate(latlng);
			if(bb){
				if(feature_temp.get("hasBounds_")){
					hasBoundsArr.push(feature_temp);
				}else{
					notHasBoundsArr.push(feature_temp);
				}
			}
		}
    	returnArr[0] = hasBoundsArr;
    	returnArr[1] = notHasBoundsArr;
    	return returnArr;
    }
    
    /**
     * 关闭中心点的地图弹出框
     */
    function closeBasePointElement(){
    	 $("#basePointElement").html("");
         $("#basePointElement").hide();
    }
    
    /**
     * 添加或编辑基地<br/> 弹出右侧弹出框
     * @param feature
     */
    function openBaseWindow(feature){
    	var valueOf = feature.valueOf();
    	$(".rightNo").hide();
    	$(".rightNo2").show();
    	$("#divtittle").html("编辑基地边界信息");
    	$("#mark_index").val(valueOf.get("index_"));
    	$("#base_id").val(valueOf.get("base_id_"));
		$("#mark_name").val(valueOf.get("name_"));
		var mu_number = valueOf.get("mark_area_");
		mu_number = parseFloat(mu_number);
		$("#mark_mu_number").val(mu_number.toFixed(2));
		$("#mark_contact").val(valueOf.get("mark_contact_"));
		$("#mark_phone").val(valueOf.get("mark_phone_"));
		$("#mark_address").val(valueOf.get("mark_address_"));
		$("#mark_description").val(valueOf.get("mark_description_"));
		$("#mark_coordinate_group").val(writer.writeGeometry(feature.getGeometry().clone().transform("EPSG:3857","EPSG:4326")));
		$("#mark_color").val(valueOf.get("mark_color_"));
		$('#basecolor div').css("background",valueOf.get("mark_color_"));
		
    	openDoor();
    }
    
    /**
     * 基地中心点信息<br/>
     * Form表单验证和处理<br/>
     * 提交
     */
    function saveBase(){
    	var name = $("#marker_name").val();
    	if(name.length > 45){
    		alert("名称过长不能超过45个字符！");
    		return ;
    	}
    	var val = $("#mark_mu_number").val();
    	if(isNaN(val)){
    		alert("请填写正确的亩数!")
    		return ;
    	}
    	if(val.length>9){
    		alert("请填写正确的亩数,不能超过9位!");
    		return ;
    	}
    	var phone = /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/;
    	if(!phone.test($("#mark_phone").val())){
    		alert("请填写正确的联系方式!");
    		return ;
    	}
    	showTips();
    	$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':'base_info_update',
				'field':"{'enterprise_info_id':"+enter_id+",'base_id':"+base_id+",'form':'"+encodeURIComponent($('#baseForm').serialize())+"'}"
			},
			success: function( response ) {
				hideTips();
				saveBaseNext(response);
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
    function saveBaseNext(response){
    	if(response.invoke_result == "INVOKE_SUCCESS"){
			var feature = source.getFeatureById("base_" + $("#base_id").val());
			if(feature == null){
				feature = baseSource.getFeatureById("base_" + $("#base_id").val());
			}
			feature.set("base_id_",$("#base_id").val());
			feature.set("name_",$("#mark_name").val());
			feature.set("mark_area_",$("#mark_mu_number").val());
   		    feature.set("mark_contact_",$("#mark_contact").val());
       		feature.set("mark_phone_",$("#mark_phone").val());
       		feature.set("mark_address_",$("#mark_address").val());
       		feature.set("mark_description_",$("#mark_description").val());
       		var color = $("#mark_color").val();
       		feature.set("mark_color_",color);
       		var style = feature.getStyle();
       		style.getFill().setColor("rgba("+color.colorRgb()+", 0.1)");
       		style.getStroke().setColor(color);
       		style.getStroke().setLineDash(null);
			if(baseSource.getFeatureById("base_" + $("#base_id").val()) == null){
				baseSource.addFeature(feature);
			}
			source.clear();
			if(doubleClickSelect != null)
	    		doubleClickSelect.getFeatures().clear();
	    	featurelCoordinates = null;
			draw = null;
			closeDoor();
    	}else if(response.invoke_result == "OTHER_ERROR"){
    		
    		alert(response.invoke_message);
    		
		}else{
			log(response.invoke_message);
		}
    }
    
    /**
     * 取消基地编辑
     */
    function cancelBase(){
    	var feature = baseSource.getFeatureById("base_"+$("#base_id").val());
    	if(feature != null){//还原样式
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
     * 删除基地
     * @param id
     */
    function deleteBase(id){
    	if(id==""){
    		cancelBase();
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
				'method':'base_info_delete',
				'field':"{'enterprise_info_id':"+enter_id+",'base_id':"+id+"}"
			},
			success: function( response ) {
				hideTips();
				if(response.invoke_result == "INVOKE_FAILURE"){
					alert(response.invoke_message);
					return;
				}
				var marker = markerSource.getFeatureById("marker_"+id);
				var base = baseSource.getFeatureById("base_"+id);
				var wenzi = baseTextSource.getFeatureById("marker_"+id);
				if(marker != null) //从图层中删除中心点
					markerSource.removeFeature(marker);
				if(base != null)//从图层中删除基地边界
					baseSource.removeFeature(base);
				if(wenzi != null)
					baseTextSource.removeFeature(wenzi);
				source.clear();
				if($("#selectedName"+id,parent.document).length>0){
					$("#selectedName"+id,parent.document).remove();
				}
				backMarkerCoordinate = null
		    	backMarkerId = null;
				if(doubleClickSelect != null)
		    		doubleClickSelect.getFeatures().clear();
				featurelCoordinates = null;
				closeDoor();
			},
			error: function(e) {
				hideTips();
			}
		});
    }
    
    /**
     * 开始规划分区
     */
    function addPartitions(){
    	if(!checkDrawState()){
			return ;
		}
        draw = new ol.interaction.Draw({
	        source: source,
	        ftype : PARTITIONS,
	        type: "Polygon",
	        snapTolerance: 12,
	        style:styles.drawPartitionStyle

        });
        omap.removeInteraction(doubleClickSelect);
        isDoubleClickRemoved = true;
        omap.addInteraction(draw);
        createHelpTooltip();
        mapOnPointMoveListener = omap.on('pointermove', pointerMoveHandler);
        mapViewMouseOutListener = omap.getViewport().addEventListener('mouseout', function() {
            helpTooltipElement.classList.add('hidden');
        });
        
        draw.on('drawend',function(evt) {
        	var style_ = new ol.style.Style({
		    	stroke: new ol.style.Stroke({
		            color: "#FFFFFF",
		            lineDash: [10, 10],
		            width: 2
		          }),
		        fill: new ol.style.Fill({
		            color: "rgba(255,255,255, 0.45)"
		          }),
		    	zIndex : PARTITIONS_Z
		    	,atlasManager: atlasManager
		    });
        	evt.feature.setStyle(style_);
        	evt.feature.set("ftype",PARTITIONS);
    		var base = partitionInBase(evt.feature);
    		if(base == null){
    			alert("分区需要规划在基地中!");
    			evt.feature.set("deleted",true);
    			source.clear();
    			return ;
    		}
			evt.feature.set("base_id_",base.get("base_id_"));
			evt.feature.set("partitions_id_","");
			evt.feature.set("name_","");
			evt.feature.setId("partitions_"+PARTITIONS__INDEX);
			evt.feature.set("index_",PARTITIONS__INDEX);
   		    evt.feature.set("partitions_area_",formatArea(evt.feature.getGeometry()));
       		evt.feature.set("partitions_description_","");
       		evt.feature.set("partitions_color_",evt.feature.getStyle().getFill().getColor().colorHex());
       		
       		openPartitionsWindow(evt.feature);
       		PARTITIONS__INDEX++;
    		sketch = null;
            ol.Observable.unByKey(drawGeoOnChangeListener);
            omap.removeOverlay(helpTooltip);
            helpTooltipElement.classList.add('hidden');
            omap.removeInteraction(draw);
            
            modify = new ol.interaction.Modify({
                features: modifyFeatures,
              });
            modify.on("modifystart",function(evt){
          	  featurelCoordinates = evt.features.getArray()[0].getGeometry().getCoordinates();
            });
            modify.on("modifyend",function(evt){
            	var feature_temp = evt.features.getArray()[0];
				var base = baseSource.getFeatureById("base_"+feature_temp.get("base_id_"));
				var isIn = base.getGeometry().intersectsCoordinate(evt.mapBrowserEvent.coordinate);
				if(!isIn){
					feature_temp.getGeometry().setCoordinates(featurelCoordinates);
					return;
				}
				var latlng = feature_temp.getGeometry().getInteriorPoint().getCoordinates();
				latlng = ol.proj.transform(latlng, 'EPSG:3857', 'EPSG:4326');
				$("#partitions_coordinate_X").val(latlng[1]);
				$("#partitions_coordinate_Y").val(latlng[0]);
				$("#partitions_mu_number").val(formatArea(feature_temp.getGeometry()));
				$("#partitions_coordinate_group").val(writer.writeGeometry(feature_temp.getGeometry().clone().transform("EPSG:3857","EPSG:4326")));
				featurelCoordinates = null;
            });
            omap.addInteraction(modify);
            omap.removeInteraction(draw);
            draw = null;
        }, this);
        $(".webgis-navbar .on").removeClass("on");
        $(".add-partitions").addClass("on");
        showGuideTips(2);
    }
    
    /**
     * 判断分区是否完整的在某个基地范围内
     */
    function partitionInBase(feature){
    	var returnFeature;
    	var features = baseSource.getFeatures();
    	var coordinates = feature.getGeometry().getCoordinates();
    	var latlng = coordinates[0][0];
    	for(var x = 0,y = features.length ;x < y; x++){
    		var feature_temp = features[x];
			var isIn = feature_temp.getGeometry().intersectsCoordinate(latlng);
			if(isIn){
				returnFeature = feature_temp;
				break;
			}else if(x == y-1){
				return null;
			}
    	}
    	for(var i = 1,j = coordinates[0].length ; i < j; i++){
    		var latlng = coordinates[0][i];
			var isIn = returnFeature.getGeometry().intersectsCoordinate(latlng);
			if(!isIn){
				return null;
			}
    	}
    	return returnFeature;
    }
    
    /**
     * 打开分区编辑框
     */
    function openPartitionsWindow(feature){
    	var valueOf = feature.valueOf();
    	$(".rightNo").hide();
    	$(".rightNo3").show();
    	$("#divtittle").html("编辑分区边界信息");
    	$("#partitions_index").val(valueOf.get("index_"));
    	$("#partitions_base_id").val(valueOf.get("base_id_"));
		$("#partitions_id").val(valueOf.get("partitions_id_"));
		var latlng = feature.getGeometry().getInteriorPoint().getCoordinates();
		latlng = ol.proj.transform(latlng, 'EPSG:3857', 'EPSG:4326');
		$("#partitions_coordinate_X").val(latlng[1]);
		$("#partitions_coordinate_Y").val(latlng[0]);
		$("#partitions_name").val(valueOf.get("name_"));
		var mu_number = valueOf.get("partitions_area_");
		mu_number = parseFloat(mu_number);
		$("#partitions_mu_number").val(mu_number.toFixed(2));
		$("#partitions_description").val(valueOf.get("partitions_description_"));
		$("#partitions_coordinate_group").val(writer.writeGeometry(feature.getGeometry().clone().transform("EPSG:3857","EPSG:4326")));
		$("#partitions_color").val(valueOf.get("partitions_color_"));
		$('#partitionscolor div').css("background",valueOf.get("partitions_color_"));
		findPartitionLand(valueOf.get("partitions_id_"));
		try{closeAutoCom(2);}catch(e){}
		openAutoCom(2,valueOf.get("base_id_"));
		openDoor();
    }
    
    function findPartitionLand(id){
    	if(id == null || id == "" || typeof(id) == "undefined"){
    		$(".field-land-box").hide();
    		return ;
    	}
    	$(".field-land-box").show();
    		
    	$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':'partition_land',
				'field':"{'enterprise_info_id':"+enter_id+",'partition_id':'"+id+"'}"
			},
			success: function( response ) {
				var data = response.result_data 
				var soil_history = data.soil_history;
				var land_test = data.land_test;
				landData = data.data_dic;
				var html = "";
				for(var i = 0;i<soil_history.length;i++){
					var tem = soil_history[i];
					if(tem.partition_id==id){
						var te = $("#soil_route_of").find("option[value="+tem.route_of+"]").html();
						if(te==null)
							te="";
						html+="<tr class='soill"+tem.id+"'><td class='bc_th01'>"+tem.begin_time+"年"+tem.end_time+"年</td><td  class='bc_th01' >"+te+"</td><td  class='bc_th01'><a href='javascript:void(0)' onclick='editSoil("+tem.id+","+id+")'>修改</a>  <a href='javascript:void(0)' onclick='deleteSoil("+tem.id+","+id+")'>删除</a></td></tr>";
					}
				}
				$("#soilTable").remove();
				if(html!=""){
					html = "<tr><td class='bc_th01'>时间</td><td class='bc_th01'>用途</td><td class='bc_th01' style='width:20%'>操作</td></tr>"+html;
					var soilTable = $("<table id='soilTable' class='soilTable'></table>");
					soilTable.append(html);
					$(".use-field").after(soilTable);
				}
				
				var html2 = "";
				for(var i = 0;i<land_test.length;i++){
					var tem = land_test[i];
					if(tem.partition_id==id){
						html2+="<tr class='land"+tem.id+"'><td class='bc_th01'>"+(tem.test_date	== 'undefined' ? "" :tem.test_date)+"</td><td  class='bc_th01' >"+tem.test_org+"</td><td  class='bc_th01' >"+tem.ph_val+"</td><td  class='bc_th01'><a href='javascript:void(0)' onclick='editLandInfo("+tem.id+","+id+")'>修改</a>  <a href='javascript:void(0)' onclick='deleteLand("+tem.id+","+id+")'>删除</a></td></tr>";
					}
				}
				$(".landTable").remove();
				if(html2!=""){
					html2 = "<tr><td class='bc_th01'>测试日期</td><td class='bc_th01'>测试机构</td><td class='bc_th01'>酸碱度</td><td class='bc_th01' style='width:20%'>操作</td></tr>"+html2;
					var landTable = $("<table  id='landTable' class='landTable'></table>");
					landTable.empty().append(html2);
					$(".land-test").after(landTable);
				}
			},
			error: function(e) {
				hideTips();
			}
		});	
    }
    
    function initSoilOption(){
    	if(isSoilOption)
    		return;
    	$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':'init_soil_option',
				'field':"{'enterprise_info_id':"+enter_id+"}"
			},
			success: function( response ) {
				isSoilOption = true;
				var data = response.result_data;
				for(var i = 0;i < data.length;i++){
					var temp = data[i];
					if(temp.parent_id ==21){
						$("#soil_type1").append("<option value='"+temp.data_dic_id+"'>"+temp.name+"</option>");
					}
					if(temp.parent_id ==20){
						$("#soil_type2").append("<option value='"+temp.data_dic_id+"'>"+temp.name+"</option>");
					}
					if(temp.parent_id ==22){
						$("#soil_route_of").append("<option value='"+temp.data_dic_id+"'>"+temp.name+"</option>");
					}
					if(temp.parent_id ==23){
						$("#soil_pollution_status").append("<option value='"+temp.data_dic_id+"'>"+temp.name+"</option>");
					}
				}
				$("#soil_type1").selectpicker("refresh");
				$("#soil_type2").selectpicker("refresh");
				$("#soil_route_of").selectpicker("refresh");
				$("#soil_pollution_status").selectpicker("refresh");
			},
			error: function(e) {
				hideTips();
			}
		});	
    }
    
    /**
     * 分区信息<br/>
     * Form表单验证和处理<br/>
     * 提交
     */
    function savePartitions(){
        var name = $("#partitions_name").val();
        if(name==""){
            alert("请填写分区名称!")
            return false;
        }
    	if(name.length>45){
    		alert("分区名称长度不能超过45个字符!")
    		return false;
    	}
    	
    	if($("#partitions_description").val().length>500){
    		alert("分区描述文字长度不能超过500个字符!")
    		return false;
    	}
    	
    	var val = $("#partitions_mu_number").val();
    	if(isNaN(val)){
    		alert("请填写正确的亩数!")
    		return false;
    	}
    	if(val.length>9){
    		alert("请填写正确的亩数,不能超过9位!");
    		return ;
    	}
    	var feature = partitionsSource.getFeatureById("partitions_"+$("#partitions_index").val());
    	if(typeof(feature) == "undefined" || feature == null){
    		feature = source.getFeatureById("partitions_"+$("#partitions_index").val());
    	}
    	
    	var base_id = $("#partitions_base_id").val();
        if(nullGroupSecond.length>0){
            for (var i = 0;i<nullGroupSecond.length;i++){
                var tob = nullGroupSecond[i];
                if(tob.label == name && tob.base_id == base_id){
                    $("#partitions_id").val(tob.value);
                    nullGroupSecondInd = true;
                    break;
                }
            }
        }
    	
    	var coordinates = writer.writeGeometry(feature.getGeometry().clone().transform("EPSG:3857","EPSG:4326"));
    	$("#partitions_coordinate_group").val(coordinates);
    	var method = $("#partitions_id").val()==""?"partitions_info_add":"partitions_info_update";
    	showTips();
    	$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':method,
				'field':"{'enterprise_info_id':"+enter_id+",'form':'"+encodeURIComponent($('#partitionForm').serialize())+"'}"
			},
			success: function( response ) {
				hideTips();
				savePartitionsNext(response);
			},
			error: function(e) {
				hideTips();
			}
		});	
    }
    
    /**
     * 分区边界保存返回值处理<br/>
     * Feature 属性填充
     */
    function savePartitionsNext(response){
    	if(response.invoke_result == "INVOKE_SUCCESS"){
    		var data = response.data;
			var partitions_id = data.partitions_id;
			var feature = null;
			var name = $("#partitions_name").val();
			var part_index = $("#partitions_index").val();
			feature = source.getFeatureById("partitions_" + part_index);
			if(feature == null)
				feature = partitionsSource.getFeatureById("partitions_" + part_index);
			var base_id = $("#partitions_base_id").val();
			feature.set("base_id_",base_id);
			feature.set("name_",name);
			feature.set("partitions_area_",$("#partitions_mu_number").val());
       		feature.set("partitions_description_",$("#partitions_description").val());
       		var color = $("#partitions_color").val();
       		feature.set("partitions_color_",color);
       		var style = feature.getStyle();
       		style.getFill().setColor("rgba("+color.colorRgb()+", 0.45)");
       		style.getStroke().setColor(color);
			style.getStroke().setLineDash(null);
			feature.setStyle(style);
			var id = $("#partitions_id").val();
			feature.set("partitions_id_",partitions_id);
			
			if(id=="" || nullGroupSecondInd){ //新增的分区,后续处理
				partitionsSource.addFeature(feature);
				$("#tunnel_info_partitions_id").append("<option value='"+partitions_id+"'>"+name+"</option>");
				$("#tunnel_info_partitions_id").selectpicker("refresh");
				
				var html = '<div class="needdis" style="width:100%; display:block; margin-bottom:10px;" id="rightPart'+partitions_id+'"><div class="aqu2"><table width="100%" cellspacing="0" cellpadding="0">'+
	        	'<tbody><tr><td align="left"><div class="quyu">'+name+'</div></td><td align="right" class="sjj_08">'+
	            '<img width="14" height="19" src="/asset/images/sjj_down.jpg" aa="true" onclick="togg1(this)" style="cursor:pointer"/></td></tr></tbody></table></div><ul class="aqu_ul" style="min-width:320px;">'
	        	+'</ul><div class="clear"></div></div>';
		    	$("._area0").prepend(html);//右侧列表添加分区
		    	
		    	var wenzi =  new ol.Feature({
					ftype : PARTITION_TEXT,
					index_ : part_index,
					partition_id_ : partitions_id,
					name_ : feature.get("name_"),
			        geometry: new ol.geom.Point(feature.getGeometry().getInteriorPoint().getCoordinates())
			      });
				wenzi.setId("partitions_" + part_index);
				partitionTextSource.addFeature(wenzi);//添加文字标注
				
				
				if(nullGroupSecondInd){
	                for (var i = 0;i<nullGroupSecond.length;i++){
	                    var tob = nullGroupSecond[i];
	                    if(tob.value == id && base_id == tob.base_id){
	                    	nullGroupSecond = nullGroupSecond.del(i);
	                        nullGroupSecondInd = false;
	                        break;
	                    }
	                }
	                try{closeAutoCom(2);}catch(e){};
	                nullGroupSecondInd = false;
	            }
			}else{
				$("#tunnel_info_partitions_id option[value="+partitions_id+"]").html(name);
				$("#tunnel_info_partitions_id").selectpicker("refresh");
				$("#rightPart"+partitions_id+" .quyu").html(name);
				
				var wenzi = partitionTextSource.getFeatureById("partitions_" + part_index);
				wenzi.set("name_",feature.get("name_"));
			}
			source.clear();
			
			if(doubleClickSelect != null)
	    		doubleClickSelect.getFeatures().clear();
	    	featurelCoordinates = null;
			draw = null;
			closeDoor();
		}else{
			log(response.invoke_message)
		}
    }
    
    /**
     * 取消分区编辑
     */
    function cancelPartitions(){
    	var feature = partitionsSource.getFeatureById("partitions_"+$("#partitions_index").val());
    	if(feature != null){
    		var style_ = feature.getStyle();
			style_.getStroke().setLineDash(null);
			feature.setStyle(style_);
			if(featurelCoordinates != null)
	    		feature.getGeometry().setCoordinates(featurelCoordinates);
    	}
    	
    	draw = null;
    	source.clear();
    	if(doubleClickSelect != null)
    		doubleClickSelect.getFeatures().clear();
    	featurelCoordinates = null;
		closeDoor();
    }
    
    /**
     * 删除分区
     * @param id
     */
    function deletePartitions(id){
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
				'method':'partitions_info_delete',
				'field':"{'enterprise_info_id':"+enter_id+",'partitions_id':"+id+"}"
			},
			success: function( response ) {
				hideTips();
				if(response.invoke_result == "INVOKE_FAILURE"){
					alert(response.invoke_message);
					return;
				}
				var part_index = $("#partitions_index").val();
				var partition = partitionsSource.getFeatureById("partitions_" + part_index);
				partitionsSource.removeFeature(partition);
				var wenzi = partitionTextSource.getFeatureById("partitions_" + part_index);
				if(wenzi != null){
					partitionTextSource.removeFeature(wenzi);
				}
				if(doubleClickSelect != null)
		    		doubleClickSelect.getFeatures().clear();
				draw = null;
				source.clear();
				featurelCoordinates = null;
				closeDoor();
			},
			error: function(e) {
				hideTips();
				//log(2);
			}
		});	//-----end
    }
    
    /**
     * 添加不同类型的地块
     * @param ind_
     */
    function addTunnelInfo(ind_){
    	if(!checkDrawState()){
			return ;
		}
    	var style_ = styles.drawTunnelInfoStyle;
    	var color_ = defaultColor[ind_];
    	style_.getStroke().setColor(color_);
		style_.getFill().setColor("rgba("+color_.colorRgb()+", 0.45)");
        draw = new ol.interaction.Draw({
	        source: source,
	        ftype : TUNNELINFO,
	        type: "Polygon",
	        snapTolerance: 12,
	        style:style_

        });
        omap.removeInteraction(doubleClickSelect);
        isDoubleClickRemoved = true;
        omap.addInteraction(draw);
        createHelpTooltip();
        mapOnPointMoveListener = omap.on('pointermove', pointerMoveHandler);
        mapViewMouseOutListener = omap.getViewport().addEventListener('mouseout', function() {
            helpTooltipElement.classList.add('hidden');
        });
        
        draw.on('drawend',function(evt) {
        	evt.feature.set("ftype",TUNNELINFO);
        	evt.feature.set("ind_",ind_);
        	var ind__ = evt.feature.get("ind_");
        	var color_ = defaultColor[ind_];
        	var style_ = new ol.style.Style({
		    	stroke: new ol.style.Stroke({
		            color: color_,
		            width: 2,
		            lineDash: [10, 10]
		          }),
		        fill: new ol.style.Fill({
		            color: "rgba("+color_.colorRgb()+", 0.45)"
		          }),
		    	zIndex : TUNNEL_Z
		    	,atlasManager: atlasManager
		    })
        	evt.feature.setStyle(style_);
    		var base = tunnelInfoInPolygon(evt.feature,baseSource);
    		if(base == null){
    			alert("地块需要规划在基地中!");
    			evt.feature.set("deleted",true);
    			source.clear();
    			return ;
    		}
    		var partition = tunnelInfoInPolygon(evt.feature,partitionsSource);
    		if(partition == null ){
    			if(ind__ != 7){
    				alert("地块需要规划在分区中!");
        			evt.feature.set("deleted",true);
        			source.clear();
        			return ;
    			}else{
    				evt.feature.set("partitions_id_",null);
    			}
    		}else{
    			evt.feature.set("tunnel_info_partitions_id_",partition.get("partitions_id_"));
    		}
			evt.feature.set("tunnel_info_base_id_",base.get("base_id_"));
			evt.feature.set("name_","");
			evt.feature.set("tunnel_info_id_","");
			evt.feature.setId("tunnel_info_"+TUNNEL_INDEX);
			evt.feature.set("tunnel_info_index_",TUNNEL_INDEX);
   		    evt.feature.set("tunnel_info_area_",formatArea(evt.feature.getGeometry()));
       		evt.feature.set("tunnel_info_type_",ind__);
       		evt.feature.set("tunnel_info_color_",evt.feature.getStyle().getFill().getColor().colorHex());
       		evt.feature.set("tunnel_info_mu_number_",formatArea(evt.feature.getGeometry()));
       		evt.feature.set("tunnel_info_device_id_","");
       		evt.feature.set("tunnel_info_index_num_","");
       		evt.feature.set("tunnel_info_com_device_id_","");
       		evt.feature.set("tunnel_info_keeper_info_","");
       		evt.feature.set("tunnel_info_tunnel_group_id_","");
       		evt.feature.set("tunnel_info_master_info_","");
       		
       		openTunnelInfosWindow(evt.feature);
       		TUNNEL_INDEX++;
    		sketch = null;
            ol.Observable.unByKey(drawGeoOnChangeListener);
            omap.removeOverlay(helpTooltip);
            helpTooltipElement.classList.add('hidden');
            omap.removeInteraction(draw);
            
            modify = new ol.interaction.Modify({
                features: modifyFeatures,
              });
            modify.on("modifystart",function(evt){
          	  featurelCoordinates = evt.features.getArray()[0].getGeometry().getCoordinates();
            });
            modify.on("modifyend",function(evt){
            	var feature_temp = evt.features.getArray()[0];
            	var base = tunnelInfoInPolygon(feature_temp,baseSource);
        		if(base == null){
        			feature_temp.getGeometry().setCoordinates(featurelCoordinates);
        			return ;
        		}
        		var partition = tunnelInfoInPolygon(feature_temp,partitionsSource);
        		var ind__ = feature_temp.get("ind_");
        		if(partition == null ){
        			if(ind__ != 7){
        				feature_temp.getGeometry().setCoordinates(featurelCoordinates);
            			return ;
        			}
        		}
        		var area_ = formatArea(feature_temp.getGeometry())
        		$("#tunnel_info_area").val(area_);
        		$("#tunnel_info_mu_number_read").html(area_+"亩");
				$("#tunnel_info_mu_number").val(area_);
				featurelCoordinates = null;
            });
            omap.addInteraction(modify);
            omap.removeInteraction(draw);
            draw = null;
        }, this);
        $(".webgis-navbar .on").removeClass("on");
        $(".webgis-navbar .group-icon:eq("+(ind_ - 1)+")").addClass("on");
        showGuideTips(3);
    }

    /**
     * 判断地块是否在(基地或分区)范围内
     */
    function tunnelInfoInPolygon(feature,targetSource){
    	var returnFeature;
    	var features = targetSource.getFeatures();
    	var coordinates = feature.getGeometry().getCoordinates();
    	var latlng = coordinates[0][0];
    	for(var x = 0,y = features.length ;x < y; x++){// 判断第一个点是否在某个对象中
    		var feature_temp = features[x];
			var isIn = feature_temp.getGeometry().intersectsCoordinate(latlng);
			if(isIn){
				returnFeature = feature_temp;
				break;
			}else if(x == y-1){
				return null;
			}
    	}
    	for(var i = 1,j = coordinates[0].length ; i < j; i++){//判断其余的坐标点是否都在同一个polygon
    		var latlng = coordinates[0][i];
			var isIn = returnFeature.getGeometry().intersectsCoordinate(latlng);
			if(!isIn){
				return null;
			}
    	}
    	return returnFeature;
    }
    
    
    /**
     * 打开地块编辑框
     */
    function openTunnelInfosWindow(feature){
    	$(".baseMap_ttl").css('background','url(/asset/images/baseIcojian1.png) no-repeat 10px 12px center').next('.baseMap_con').show();
    	var valueOf = feature.valueOf();
    	$(".rightNo").hide();
    	$(".rightNo4").show();
    	$("#divtittle").html("编辑区域");
    	var baseId = valueOf.get("tunnel_info_base_id_");
    	var partition_id = valueOf.get("tunnel_info_partitions_id_");
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
		var mu_number = valueOf.get("tunnel_info_mu_number_");
		mu_number = parseFloat(mu_number);
		var area = valueOf.get("tunnel_info_area_");
		area = parseFloat(area);
		$("#tunnel_info_mu_number").val(mu_number.toFixed(2));
		$("#tunnel_info_mu_number_read").html(mu_number.toFixed(2)+"亩");
		$("#tunnel_info_area").val(area.toFixed(2));
		$("#tunnel_info_coordinate_group").val(writer.writeGeometry(feature.getGeometry().clone().transform("EPSG:3857","EPSG:4326")));
		$("#tunnel_info_color").val(valueOf.get("tunnel_info_color_"));
		$('#tunnelinfocolor div').css("background",valueOf.get("tunnel_info_color_"));
		insertPartitionSelectOption(baseId);
		$("#tunnel_info_partitions_id").selectpicker("val",partition_id);
		$("#tunnel_info_partitions_id").selectpicker("refresh");
		var type = feature.get("tunnel_info_type_");
		var tunnel_group = valueOf.get("tunnel_info_tunnel_group_id_");
		var farmerVal1 = valueOf.get("tunnel_info_keeper_info_");
		var farmerVal2 = valueOf.get("tunnel_info_master_info_");
		var e_ = parseInt(type, 10);
		$(".plantEnvir div:eq("+(e_-1)+")").addClass('active').siblings().removeClass('active');	
		$("#plant_env_type").val(e_);
		tunnel_group = tunnel_group == null || tunnel_group=="" ?0:tunnel_group;
		farmerVal1 = !farmerVal1 || farmerVal1=="" ?0:farmerVal1;
		farmerVal2 = !farmerVal2 || farmerVal2=="" ?0:farmerVal2;
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
		}
		
		try{closeAutoCom(3);}catch(e){}
        openAutoCom(3,baseId,partition_id,type);
		openDoor();
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
			$("#group_groupId1").val(tunnel_group);
	    	$("#group_groupId1").selectpicker("refresh");
			$('#group_farmer2').empty().append(farmer1);
			$('#group_farmer3').empty().append(farmer2);
			$('#group_farmer2').val(farmerVal1);
			$('#group_farmer3').val(farmerVal2);
			$('#group_farmer2').selectpicker("refresh");
	    	$('#group_farmer3').selectpicker("refresh");
			
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
			if((baseId == item.base_id  || item.base_id == "" || item.base_id == null )&& item.farmer_type == farmer_type){
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
//    	var index = $("#tunnel_info_index").val();
//    	var feature = tunnelInfoSource.get("tunnel_info_"+index);
		if($(this).index()+1==8){
//			var real_plant = feature.get("real_plant");
//			if(real_plant != null && real_plant.length > 0 && type_id < 8){
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
		if(val.length>9){
    		alert("请填写正确的亩数,不能超过9位!");
    		return ;
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
		
		var group_parent_id = $("#tunnel_info_partitions_id").val();
		var group_base_id = $("#tunnel_info_base_id").val();
		var group_type = $("#plant_env_type").val();
		if(nullGroupThird.length>0){
	        for (var i = 0;i<nullGroupThird.length;i++){
	            var tob = nullGroupThird[i];
	            if(group_parent_id == null || group_parent_id == 0){
	            	if(tob.label == name && tob.base_id == group_base_id && tob.ent_type == group_type){
		                $("#tunnel_info_id").val(tob.value);
		                nullGroupThirdInd = true;
		                break;
		            }
	            }else{
	            	if(tob.label == name && tob.base_id == group_base_id && tob.part_id == group_parent_id && tob.ent_type == group_type){
		                $("#tunnel_info_id").val(tob.value);
		                nullGroupThirdInd = true;
		                break;
		            }
	            }
	            
	        }
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
			
			if(nullGroupThirdInd){
		        for (var i = 0;i<nullGroupThird.length;i++){
		            var tob = nullGroupThird[i];
		            if(tob.value == tunnel_info_id ){
		            	nullGroupThird = nullGroupThird.del(i);
		                nullGroupThirdInd = false;
		                feature.set("tunnel_info_id_",tunnel_info_id);
						tunnelInfoSource.addFeature(feature);
		                break;
		            }
		        }
		        try{closeAutoCom(3);}catch(e){};
		    }
			
			if(id==""){
				feature.set("tunnel_info_id_",tunnel_info_id);
				tunnelInfoSource.addFeature(feature);
			}
			var center = tunnelCenterPointSource.getFeatureById(feature.getId());
			if(center == null){
				center = new ol.Feature({
					ftype : TUNNEL_INFO_CENTER,
					index_ : feature.get("tunnel_info_index_"),
					imgurl : imgurl,
			        geometry: new ol.geom.Point(feature.getGeometry().getInteriorPoint().getCoordinates())
			      });
				center.setId("tunnel_info_" + $("#tunnel_info_index").val());
				centerStyle = createCenterStyle(imgurl);
				var scale = zoomScale(omap.getView().getZoom());
				centerStyle.getImage().setScale(scale);
				center.setStyle(centerStyle);
				tunnelCenterPointSource.addFeature(center);
				
				var mu_number = feature.get("tunnel_info_mu_number_");
				var wenzi =  new ol.Feature({
					ftype : TUNNEL_INFO_TEXT,
					index_ : feature.get("tunnel_info_index_"),
					tunnel_info_id_ : tunnel_info_id,
					name_ : feature.get("name_"),
			        geometry: new ol.geom.Point(feature.getGeometry().getInteriorPoint().getCoordinates())
			      });
				wenzi.setId("tunnel_info_" + $("#tunnel_info_index").val());
				tunnelInfoTextSource.addFeature(wenzi);
				feature.changed();
				
				setTimeout(function(){
					if(omap.getView().getZoom() == 19){
						for(var style in tunnelInfoTextStyleCache){
							var text = tunnelInfoTextStyleCache[style].getText()
							text.setFont("18px 宋体");
							text.setOffsetY("30");
						}
					}
					var feature = tunnelInfoTextSource.getFeatureById("tunnel_info_" + $("#tunnel_info_index").val());
					feature.changed();
				}, 100);
//				
				
				
				var pid = 0;
				var pname = "无所属区域";
				if($("#tunnel_info_partitions_id").val() != 0){
					pid = $("#tunnel_info_partitions_id").val();
					pname = $("#tunnel_info_partitions_id").find("option:selected").text();
				}
				var partObj = $('#rightPart'+pid);
				if(partObj.length == 0){
					var html = '<div class="needdis" style="width:100%; display:block; margin-bottom:10px;" id="rightPart'+pid+'"><div class="aqu2"><table width="100%" cellspacing="0" cellpadding="0">'+
		        	'<tbody><tr><td align="left"><div class="quyu">'+pname+'</div></td><td align="right" class="sjj_08">'+
		            '<img width="14" height="19" src="/asset/images/sjj_down.jpg" aa="true" onclick="togg1(this)" style="cursor:pointer"/></td></tr></tbody></table></div><ul class="aqu_ul" style="min-width:320px;">'
		        	+'</ul><div class="clear"></div></div>';
			    	$("._area0").prepend(html);
				}
				var html = '';
				html = '<li class="aqu_li" id="rightTunnel'+tunnel_info_id+'"><table cellpadding="0" cellspacing="0" width="100%"><tr><td align="left" class="_classname_"><a href="javascript:void(0);" class="_tunnel_name"  onclick="gotoMap('+tunnel_info_id+')">'+backname+'</a></td>'
					+'<td rowspan="2" class="tc_str_hjtj">';
				if(type==8){
					var timg = "aqu_bg";
					html+='</td></tr> <tr><td class="mus">可用'+parseFloat(feature.get("tunnel_info_area_")).toFixed(2)+'亩 &nbsp;&nbsp;&nbsp;&nbsp; 总'+parseFloat(mu_number).toFixed(2)+'亩</td></tr></table></li>';
					html=html.replace("_classname_",timg);
				}else{
					var temps = "aqu_bg";
					html+='</td></tr> <tr><td class="mus">可种植'+parseFloat(feature.get("tunnel_info_area_")).toFixed(2)+'亩 &nbsp;&nbsp;&nbsp;&nbsp;  总'+parseFloat(mu_number).toFixed(2)+'亩</td></tr></table></li>';
					html=html.replace("_classname_",temps);
				}
				partObj.find("ul").prepend(html);
			}else{
				var wenzi = tunnelInfoTextSource.getFeatureById("tunnel_info_" + $("#tunnel_info_index").val());
				wenzi.set("name_",feature.get("name_"));
				
				var tunnelHtmlObj = $("#rightTunnel"+tunnel_info_id);
				if(tunnelHtmlObj.length > 0){
					tunnelHtmlObj.find("._tunnel_name").html(backname);
					tunnelHtmlObj.find(".mus").html('可种植'+parseFloat(feature.get("tunnel_info_area_")).toFixed(2)+'亩 &nbsp;&nbsp;&nbsp;&nbsp;  总'+parseFloat(mu_number).toFixed(2)+'亩');
				}
			}
			source.clear();
			if(doubleClickSelect != null)
	    		doubleClickSelect.getFeatures().clear();
	    	featurelCoordinates = null;
			draw = null;
			closeDoor();
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
			if(featurelCoordinates != null){
				feature.getGeometry().setCoordinates(featurelCoordinates);
				var center = tunnelCenterPointSource.getFeatureById(feature.getId());
				if(center != null){
					center.setGeometry(feature.getGeometry().getInteriorPoint());
				}
				var wenzi = tunnelInfoTextSource.getFeatureById(feature.getId());
				if(wenzi != null){
					wenzi.setGeometry(feature.getGeometry().getInteriorPoint());
				}
			}
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
     * 添加设备
     */
    function addDevice(){
    	omap.removeOverlay(helpTooltip);
    	if(!checkDrawState()){
			return ;
		}
        draw = new ol.interaction.Draw({
	        source: source,
	        type: "Point",
	        snapTolerance: 12,
	        style:styles.deviceStyle
        });
        omap.addInteraction(draw);
        draw.on('drawend',function(evt) {
        	evt.feature.set("ftype",DEVICE);
        	omap.removeInteraction(draw);
        }, this);
        omap.removeInteraction(doubleClickSelect);
        isDoubleClickRemoved = true;
        $(".webgis-navbar .on").removeClass("on");
        $("#add-device").addClass("on");
    }
    
    function addWeatherStation(){
    	if(!checkDrawState()){
			return ;
		}
        draw = new ol.interaction.Draw({
	        source: source,
	        type: "Point",
	        snapTolerance: 12,
	        style:styles.weatherStationStyle
        });
        omap.addInteraction(draw);
        draw.on('drawend',function(evt) {
        	evt.feature.set("ftype",WEATHER_STATION);
        	omap.removeInteraction(draw);
        }, this);
        omap.removeInteraction(doubleClickSelect);
        isDoubleClickRemoved = true;
        $(".webgis-navbar .on").removeClass("on");
        $("#add-weather").addClass("on");
    }
    
    function openDeviceWindow(feature){
    	backCoordinate = feature.getGeometry().clone().getCoordinates();
    	moveTarget = feature.getId();
		moveInteraction = new app.Drag();
		omap.addInteraction(moveInteraction);
    	var valueOf = feature.valueOf();
    	var baseId = valueOf.get("base_id_");
    	var partition_id = valueOf.get("partitions_id_");
    	$("#device_base_id").val(baseId);
    	$("#device_partition_id").val(partition_id);
    	$("#device_tunnel_id").val(device_tunnel_id);
    	var baseFeatures = baseSource.getFeatures();
    	for(var i = 0;i<baseFeatures.length;i++){
    		var temp = baseFeatures[i];
    		if(temp.get("base_id_") == baseId){
    			$("#device_base_name").val(temp.get("name_"));
    			break;
    		}
    	}
    	if(partition_id != null && partition_id != ""){
    		var partitionsFeatures = partitionsSource.getFeatures();
        	for(var i = 0;i<partitionsFeatures.length;i++){
        		var temp = partitionsFeatures[i];
        		if(temp.get("partitions_id_") == partition_id){
        			$("#device_partition_name").val(temp.get("name_"));
        			break;
        		}
        	}
    	}
    	
    	$("#device_deviceType").val(valueOf.get("device_deviceType"));
    	$("#device_id").val(valueOf.get("device_id_"));
		$("#device_index").val(valueOf.get("index_"));
		
		$("#device_partition_id").selectpicker("refresh");
		$("#device_partition_name").val();
		$("#device_tunnel_id").val();
		$("#device_tunnel_name").val();
		//
		if(valueOf.get("device_type_") == 1){
			var geo = feature.getGeometry();
        	var latlng = geo.getCoordinates();
        	var tunnelInfos = tunnelInfoSource.getFeaturesAtCoordinate(latlng);
        	var tunnelInfo = null;
        	if(tunnelInfos.length>0){
        		tunnelInfo = tunnelInfos[0];
        		$("#device_tunnel_id").val(tunnelInfo.get("tunnel_info_id_"));
            	$("#device_tunnel_name").val(tunnelInfo.get("name_"));
        	}else{
        		$("#device_tunnel_id").val("");
            	$("#device_tunnel_name").val("");
        	}
        	
			$(".device_2").hide();
			$(".device_1").show();
			$("#divtittle").html("编辑传感器信息");
			$(".device_typee").show();
			$(".device_typee2").hide();
			$("#device_type_id").selectpicker("val",feature.get("device_type_id_"));
			$("#device_deviceType").val(1);
		}else{
			$("#device_tunnel_id").val("");
			$(".device_2").show();
			$(".device_1").hide();
			$("#divtittle").html("编辑气象站信息");
			$(".device_typee").hide();
			$(".device_typee2").show();
			$("#device_type_id2").selectpicker("val",feature.get("device_type_id_"));
			$("#device_deviceType").val(2);
		}
		
		$("#device_sn").val(feature.get("sn_"));
		$("#device_name").val(feature.get("name_"));
		$("#device_factoryTime").val(feature.get("factory_time_"));
		$("#device_description").val(feature.get("description_"));
		
		var latlng = feature.getGeometry().getCoordinates();
		latlng = ol.proj.transform(latlng, 'EPSG:3857', 'EPSG:4326');
		$("#device_coordinateX").val(latlng[1]);
		$("#device_coordinateY").val(latlng[0]);
		
		$(".rightNo").hide();
    	$(".rightNo5").show();
    	
		openDoor();
    }
    
    /**
     * 设备提交验证
     * @returns {Boolean}
     */
    function saveDeviceInfo(){
    	var name = $("#device_sn").val();
    	if(name.length > 45){
    		alert("编号过长不能超过45个字符！");
    		return ;
    	}
    	var name = $("#device_name").val();
    	if(name.length > 45){
    		alert("名称过长不能超过45个字符！");
    		return ;
    	}
    	if($("#device_sn").val()==""){
    		alert("请填写设备编码！");
    		return false;
    	}
    	if($("#device_name").val()==""){
    		alert("请填写设备名称！");
    		return false;
    	}
		var feature = null;
		var id = $("#device_id").val();
		if(id == ""){
			feature = source.getFeatureById("device_"+$("#device_index").val());
		}else{
			feature = deviceSource.getFeatureById("device_"+$("#device_index").val());
		}
		
		if(feature == null){
			alert("请取消重试!");
			return ;
		}
    	
    	var coordinates = feature.getGeometry().clone().transform("EPSG:3857","EPSG:4326");
    	var latlng = coordinates.getCoordinates();
		$("#device_coordinateX").val(latlng[1]);
		$("#device_coordinateY").val(latlng[0]);
		
    	var method = $("#device_id").val()==""?"device_info_add":"device_info_update";
    	showTips();
    	$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':method,
				'field':"{'enterprise_info_id':"+enter_id+",'form':'"+encodeURIComponent($('#deviceForm').serialize())+"'}"
			},
			success: function( response ) {
				hideTips();
				saveDeviceNext(response);
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
    function saveDeviceNext(response){
    	if(response.invoke_result == "INVOKE_SUCCESS"){
    		var data = response.data;
			var device_id = data.device_id;
			var feature = source.getFeatureById("device_" + $("#device_index").val());
			if(feature == null) 
				feature = deviceSource.getFeatureById("device_" + $("#device_index").val());
	    	feature.set("device_id_",device_id);
	    	feature.set("base_id_",$("#device_base_id").val());
	    	feature.set("partitions_id_",$("#device_partition_id").val());
	    	var device_tunnel_id = $("#device_tunnel_id").val();
	    	feature.set("tunnel_info_id_",device_tunnel_id);
	    	var device_deviceType = $("#device_deviceType").val();
	    	feature.set("device_deviceType",device_deviceType);
			
			if(device_deviceType == 1){//传感器,标记地块已经存在传感器
				feature.set("device_type_id_",$("#device_type_id").val());
				if(device_tunnel_id != null && device_tunnel_id != ""){
		    		var tunnelInfoFeatures = tunnelInfoSource.getFeatures();
		        	for(var i = 0;i<tunnelInfoFeatures.length;i++){
		        		var temp = tunnelInfoFeatures[i];
		        		if(temp.get("tunnel_info_id_") == device_tunnel_id){
		        			temp.set("tunnel_info_device_id_",device_id);
		        			break;
		        		}
		        	}
				}
			}else{
				feature.set("device_type_id_",$("#device_type_id2").val());
			}
			
			feature.set("sn_",$("#device_sn").val());
			feature.set("name_",$("#device_name").val());
			feature.set("factory_time_",$("#device_factoryTime").val());
			feature.set("description_",$("#device_description").val());
			
			
			var id = $("#device_id").val();
			if(id==""){
				feature.set("device_id_",device_id);
				deviceSource.addFeature(feature);
			}
			source.clear();
			if(doubleClickSelect != null)
	    		doubleClickSelect.getFeatures().clear();
	    	featurelCoordinates = null;
			draw = null;
			closeDoor();
    	}else if(response.invoke_result == "OTHER_ERROR"){
    		
    		alert(response.invoke_message);
    		
		}else{
			log(response.invoke_message);
		}
    }
    
    /**
     * 取消传感器编辑
     */
    function cancelDeviceInfo(){
    	var feature = deviceSource.getFeatureById("device_"+$("#device_index").val());
//    	if(feature != null){
//	    	feature.getGeometry().setCoordinates(featurelCoordinates);
//    	}
    	
    	draw = null;
    	source.clear();
    	if(doubleClickSelect != null)
    		doubleClickSelect.getFeatures().clear();
    	featurelCoordinates = null;
		closeDoor();
    }
    
    /**
     * 删除设备
     * @param id
     */
    function deleteDevice(id){
    	if(id==""){
    		cancelPartitions();
    	}
    	if(!window.confirm("确定删除么?")){
    		return;
    	}
    	$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':'device_info_delete',
				'field':"{'enterprise_info_id':"+enter_id+",'device_id':"+id+",'device_deviceType':"+$("#device_deviceType").val()+"}"
			},
			success: function( response ) {
				var device = deviceSource.getFeatureById("device_"+$("#device_index").val());
				deviceSource.removeFeature(device);
				var tunnel_info_id = $("#device_tunnel_id").val();
				tunnelInfoSource.forEachFeature(function(feature){
		    		if(tunnel_info_id == feature.get("tunnel_info_id_")){
		    			feature.set("tunnel_info_device_id_","");
		    		}
		    	},tunnel_info_id);
				source.clear();
				if(doubleClickSelect != null)
		    		doubleClickSelect.getFeatures().clear();
				featurelCoordinates = null;
				closeDoor();
			},
			error: function(e) {
				//log(2);
			}
		});	//-----end
    }
    
    /**
     * 添加摄像头
     */
    function addVideo(){
    	omap.removeOverlay(helpTooltip);
    	if(!checkDrawState()){
			return ;
		}
        draw = new ol.interaction.Draw({
	        source: source,
	        type: "Point",
	        snapTolerance: 12,
	        style:styles.videoStyle
        });
        omap.addInteraction(draw);
        draw.on('drawend',function(evt) {
        	evt.feature.set("ftype",VIDEO);
        	omap.removeInteraction(draw);
        }, this);
        omap.removeInteraction(doubleClickSelect);
        isDoubleClickRemoved = true;
        $(".webgis-navbar .on").removeClass("on");
        $("#add-video").addClass("on");
    }
    /**
     * 打开摄像头弹出框
     * @param feature
     */
    function openVideoWindow(feature){
    	backCoordinate = feature.getGeometry().clone().getCoordinates();
    	moveTarget = feature.getId();
		moveInteraction = new app.Drag();
		omap.addInteraction(moveInteraction);
    	var valueOf = feature.valueOf();
    	var geo = feature.getGeometry();
    	var latlng = geo.getCoordinates();
    	var googlelatlng = ol.proj.transform(latlng, 'EPSG:3857', 'EPSG:4326');
    	
    	var video_id = valueOf.get("video_id_");
    	var video_index = valueOf.get("index_");
    	$("#video_id").val(video_id);
    	$("#video_index").val(video_index);
    	var url = "/map/MapVideo.seam?video_coordinateX="+googlelatlng[1]+"&video_coordinateY="+googlelatlng[0];
    	var bases = baseSource.getFeaturesAtCoordinate(latlng);
    	var base = null;
    	if(bases.length>0){//获取所在基地信息
    		base = bases[0];
    		url+="&video_base_id="+base.get("base_id_");
    		url+="&video_base_name="+base.get("name_");
    	}else{
    		url+="&video_base_id=&video_base_name=";
    	}
    	
    	var partitions = partitionsSource.getFeaturesAtCoordinate(latlng);//获取所在分区信息
    	var partition = null;
    	if(partitions.length>0){
    		partition = partitions[0];
    		url+="&video_partition_id="+partition.get("partitions_id_")+"&video_partition_name="+partition.get("name_");
    	}else{
    		url+="&video_partition_id=&video_partition_name=";
    	}
    	
    	
    	var tunnelInfos = tunnelInfoSource.getFeaturesAtCoordinate(latlng);
    	var tunnelInfo = null;
    	if(tunnelInfos.length>0){//获取所在地块信息
    		tunnelInfo = tunnelInfos[0];
    		url+="&video_tunnel_id="+tunnelInfo.get("tunnel_info_id_")+"&video_tunnel_name="+tunnelInfo.get("name_");
    	}else{
    		url+="&video_tunnel_id=&video_tunnel_name=";
    	}
    	url +="&video_id="+video_id;
    	$("#video_iframe").attr("src",url);
    	$("#divtittle").html("编辑摄像头信息");
		$(".rightNo").hide();
    	$(".rightNo6").show();
    	
		openDoor();
    }
    
    /**
     * 保存摄像头属性
     * @param data
     */
    function video_ok(data){
    	if(data == "no"){
    		alert("抱歉，您可添加硬件数量已达到上限，如想继续创建，请联系我们！");
    		return;
    	}
    	var feature = source.getFeatureById("video_" + $("#video_index").val());
		if(feature == null) 
			feature = deviceSource.getFeatureById("video_" + $("#video_index").val());
		
		var id = $("#video_id").val();
		if(id == ""){
			feature.set("video_id_",data);
			videoSource.addFeature(feature);
		}
		source.clear();
		if(doubleClickSelect != null)
    		doubleClickSelect.getFeatures().clear();
    	featurelCoordinates = null;
		draw = null;
		closeDoor();
    }
    
    /**
     * 取消摄像头编辑
     */
    function video_no(){
    	var feature = videoSource.getFeatureById("video_"+$("#video_index").val());
    	draw = null;
    	source.clear();
    	if(doubleClickSelect != null)
    		doubleClickSelect.getFeatures().clear();
    	featurelCoordinates = null;
		closeDoor();
    }
    
    /**
     * 删除摄像头
     * @param id
     */
    function deleteVideo(id){
    	if(id==""){
    		video_no();
    		return;
    	}
    	$('#video_iframe').contents().find('.video_btn_delete').trigger('click')
    }
    
    /**
     * 删除摄像头之后删除Feature
     * @param id
     */
    function iframeDeleteVideo(id){
    	var video = videoSource.getFeatureById("video_"+$("#video_index").val());
		videoSource.removeFeature(video);
		source.clear();
		if(doubleClickSelect != null)
    		doubleClickSelect.getFeatures().clear();
		featurelCoordinates = null;
		closeDoor();
    }
    
    /**
     * 刷新缓存中的四季田景对象
     * @param id
     * @param func
     */
    function refreshKrpanoFrame(id,func){
    	$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':'reset_panorama',
				'field':"{'enterprise_info_id':"+enter_id+",'id':'"+id+"'}"
			},
			success: function( response ) {
				func();
			},
			error: function(e) {
				//log(2);
			}
		});	//-----end
    }

    
    /**
     * 添加四季田景
     */
    function addKrpano(){
//    	if(krpanoService !=1 && krpanoService != 3){
//    		showCheckTips("<span><span style='font-size:18px'>亲</span>，您还没有使用农场四季田景的权限哦，</span><br/><span>如果您想使用，请拨打<span style='color:#F67B0A'>400-8199-586</span>联系我们！</span><br/><a href='#' onclick='showKrpanoExample()'>什么是四季田景！</a>");
//    		return;
//    	}
    	omap.removeOverlay(helpTooltip);
    	if(!checkDrawState()){
			return ;
		}
    	$("#krpano_index").val(KRPANO_INDEX++);
    	$("#krpano_id").val("");
    	$("#krpano_file_type").val("");
    	$("#krpano_name").val("");
    	
    	$("#krpano_file_name").val("");
    	$("#krpano_file_suffix").val("");
    	$("#krpano_file_size").val("");
    	$("#krpano_file_width_height").val("");
    	$("#krpano_file_time").val("");
    	$("#krpano_coordinateX_name").val("");
    	$("#krpano_coordinateY_name").val("");
    	
    	$("#krpano_base_id").val("");
    	$("#krpano_base_name").val("");
    	
    	$("#krpano_partition_id").val("");
    	$("#krpano_partition_name").val("");
    	
    	$("#krpano_tunnel_id").val("");
    	$("#krpano_tunnel_name").val("");
    	
    	refreshKrpanoFrame("",function (){
    		var url = $("#krpanoFile").attr("src_bak")+"?oss_url="+GetQueryString("oss_url");
    		url+="&krpano_id=";
    		url+="&ent_id="+GetQueryString("enter_id");
    		url+="&file_fold=";
    		$("#krpanoFile").attr("src",url);
    		$(".rightNo").hide();
        	$(".rightNo7").show();
    	});
    	$("#divtittle").html("编辑四季田景");
		openDoor();
		$(".webgis-navbar .on").removeClass("on");
        $("#add-panorama").addClass("on");
    }
    
    /**
     * 上传之后,地图增加四季田景Feature
     */
    function krpano_second(){
    	var x = $("#krpano_coordinateX").val();
    	var y = $("#krpano_coordinateY").val();
    	var latlng ;
    	if(x != "" && y != ""){
    		latlng = ol.proj.transform([parseFloat(y), parseFloat(x)], 'EPSG:4326', 'EPSG:3857');
    		omap.getView().setCenter(latlng);
    	}else{
    		latlng = omap.getView().getCenter();
    		var center = ol.proj.transform(latlng, 'EPSG:3857', 'EPSG:4326');
    		x = center[1];
    		y = center[0];
    		
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
    	
    	omap.getView().setZoom(19);
    	if(targetKrpano == null){
    		var marker = new ol.Feature({
    			ftype : KRPANO,
    			index_ : $("#krpano_index").val(),
    			krpanos_id_ : "",
//    			file_fold_ : krpano.file_fold,
//    			file_type_ : krpano.file_type,
//    			file_suffix_ : krpano.file_suffix,
//    			file_size_ : krpano.file_size,
//    			file_width_ : krpano.file_width,
//    			file_height_ : krpano.file_height,
//    			file_name_ : krpano.file_name,
//    			krpano_time_ : krpano.krpano_time == null ? "" : (new Date(krpano.krpano_time.$date)).format(("yyyy-MM-dd")),
//    			base_id_ : krpano.base_id,
//    			partitions_id_ : krpano.partitions_id,
//    			tunnel_info_id : krpano.tunnel_info_id,
    	        style: styles.krpanoStyle,
    	        geometry: new ol.geom.Point(latlng)
    	      });
    		marker.setStyle(styles.krpanoStyle);
    		marker.setId("krpano_" + $("#krpano_index").val());
    		source.addFeature(marker);
    		targetKrpano = marker;
    		moveTarget = "krpano_" + $("#krpano_index").val();
    		moveInteraction = new app.Drag();
    		omap.addInteraction(moveInteraction);
    	}else{
    		targetKrpano.getGeometry().setCoordinates(latlng);
    	}
    	backCoordinate = targetKrpano.getGeometry().clone().getCoordinates();
    	
    	var bases = baseSource.getFeaturesAtCoordinate(latlng);
    	var base = null;
    	if(bases.length>0){
    		base = bases[0];
    		$("#krpano_base_id").val(base.get("base_id_"));
    		$("#krpano_base_name").val(base.get("name_"));
    		targetKrpano.set("krpano_base_id_",base.get("base_id_"));
    		targetKrpano.set("krpano_base_name_",base.get("name_"));
    	}else{
    		$("#krpano_base_id").val("");
    		$("#krpano_base_name").val("");
    		targetKrpano.set("krpano_base_id_","");
    		targetKrpano.set("krpano_base_name_", "");
    	}
    	
    	var partitions = partitionsSource.getFeaturesAtCoordinate(latlng);
    	var partition = null;
    	if(partitions.length>0){
    		partition = partitions[0];
    		$("#krpano_partition_id").val(partition.get("partitions_id_"));
    		$("#krpano_partition_name").val(partition.get("name_"));
    		targetKrpano.set("krpano_partition_id_",partition.get("partitions_id_"));
    		targetKrpano.set("krpano_partition_name_",partition.get("name_"));
    	}else{
    		$("#krpano_partition_id").val("");
    		$("#krpano_partition_name").val("");
    		targetKrpano.set("krpano_partition_id_","");
    		targetKrpano.set("krpano_partition_name_","");
    	}
    	
    	
    	var tunnelInfos = tunnelInfoSource.getFeaturesAtCoordinate(latlng);
    	var tunnelInfo = null;
    	if(tunnelInfos.length>0){
    		tunnelInfo = tunnelInfos[0];
    		$("#krpano_tunnel_id").val(tunnelInfo.get("tunnel_info_id_"));
    		$("#krpano_tunnel_name").val(tunnelInfo.get("tunnel_info_id_"));
    		targetKrpano.set("krpano_tunnel_id",tunnelInfo.get("tunnel_info_id_"));
    		targetKrpano.set("krpano_tunnel_name",tunnelInfo.get("tunnel_info_id_"));
    	}else{
    		$("#krpano_tunnel_id").val("");
    		$("#krpano_tunnel_name").val("");
    		targetKrpano.set("krpano_tunnel_id_","");
    		targetKrpano.set("krpano_tunnel_name_","");
    	}
    	
//    	arr.krpano_id = $("#krpano_id").val();
//    	arr.krpano_sn = "";
//    	arr.krpano_name = $("#krpano_name").val();
//    	arr.krpano_coordinateX = x;
//    	arr.krpano_coordinateY = y;
//    	arr._index = $("#krpano_index").val();
//    	//add_krpano(arr);
//    	if(krpanoObj == null){
//    		krpanoObj = new CustomOverlay(map,krpanosrc,latlng,arr);
//    		krpanoArray.push(krpanoObj);
//    	}else {
//    		krpanoObj.setLatLng(latlng);
//    		krpanoObj.draw();
//    	}
    }
    
    /**
     * 打开四季田景编辑弹出框
     * @param feature
     */
    function openKrpanoWindow(feature){
    	backCoordinate = feature.getGeometry().clone().getCoordinates();
    	targetKrpano = feature;
    	moveTarget = feature.getId();
		moveInteraction = new app.Drag();
		omap.addInteraction(moveInteraction);
    	var valueOf = feature.valueOf();
    	var geo = feature.getGeometry();
    	var latlng = geo.getCoordinates();
    	var googlelatlng = ol.proj.transform(latlng, 'EPSG:3857', 'EPSG:4326');
    	document.getElementById("krpano_name").value = feature.get("name_");
    	document.getElementById("krpano_file_name").value = feature.get("file_name_");
		document.getElementById("krpano_file_suffix").value = feature.get("file_suffix_");
		document.getElementById("krpano_file_size").value = feature.get("file_size_");
		var fileWidth = feature.get("file_width_");
		var fileHeight = feature.get("file_height_");
		if (fileWidth != "" && fileHeight != ""){
			document.getElementById("krpano_file_width_height").value = fileWidth + "x" + fileHeight + " 像素";
			document.getElementById("krpano_file_width").value = fileWidth;
			document.getElementById("krpano_file_height").value = fileHeight;
		}else{
			document.getElementById("krpano_file_width_height").value = "";
			document.getElementById("krpano_file_width").value = "";
			document.getElementById("krpano_file_height").value = "";
		}
		var fileX = googlelatlng[1];
		var fileY = googlelatlng[0];
		if (fileX != "") {
			document.getElementById("krpano_coordinateX").value = fileX;
			fileX = parseFloat(fileX).toFixed(2);
			//°54'
			var fileXs = fileX.split(".");
			fileX = fileXs[0] + "°" + fileXs[1] + "'";
			document.getElementById("krpano_coordinateX_name").value = fileX;
		} else {
			document.getElementById("krpano_coordinateX").value = "";
			document.getElementById("krpano_coordinateX_name").value = "";
		}

		if (fileY != "") {
			document.getElementById("krpano_coordinateY").value = fileY;
			fileY = parseFloat(fileY).toFixed(2);
			//°54'
			var fileYs = fileY.split(".");
			fileY = fileYs[0] + "°" + fileYs[1] + "'";
			document.getElementById("krpano_coordinateY_name").value = fileY;
		} else {
			document.getElementById("krpano_coordinateY").value = "";
			document.getElementById("krpano_coordinateY_name").value = fileY;
		}
		document.getElementById("krpano_file_type").value = feature.get("file_type_");
		document.getElementById("krpano_file_time").value = feature.get("krpano_time_");
		
		document.getElementById("krpano_id").value = feature.get("krpanos_id_");
		document.getElementById("krpano_index").value = feature.get("index_");
    	
		var bases = baseSource.getFeaturesAtCoordinate(latlng);
    	var base = null;
    	if(bases.length>0){
    		base = bases[0];
    		$("#krpano_base_id").val(base.get("base_id_"));
    		$("#krpano_base_name").val(base.get("name_"));
    		targetKrpano.set("krpano_base_id_",base.get("base_id_"));
    		targetKrpano.set("krpano_base_name_",base.get("name_"));
    	}else{
    		$("#krpano_base_id").val("");
    		$("#krpano_base_name").val("");
    		targetKrpano.set("krpano_base_id_","");
    		targetKrpano.set("krpano_base_name_", "");
    	}
    	
    	var partitions = partitionsSource.getFeaturesAtCoordinate(latlng);
    	var partition = null;
    	if(partitions.length>0){
    		partition = partitions[0];
    		$("#krpano_partition_id").val(partition.get("partitions_id_"));
    		$("#krpano_partition_name").val(partition.get("name_"));
    		targetKrpano.set("krpano_partition_id_",partition.get("partitions_id_"));
    		targetKrpano.set("krpano_partition_name_",partition.get("name_"));
    	}else{
    		$("#krpano_partition_id").val("");
    		$("#krpano_partition_name").val("");
    		targetKrpano.set("krpano_partition_id_","");
    		targetKrpano.set("krpano_partition_name_","");
    	}
    	
    	
    	var tunnelInfos = tunnelInfoSource.getFeaturesAtCoordinate(latlng);
    	var tunnelInfo = null;
    	if(tunnelInfos.length>0){
    		tunnelInfo = tunnelInfos[0];
    		$("#krpano_tunnel_id").val(tunnelInfo.get("tunnel_info_id_"));
    		$("#krpano_tunnel_name").val(tunnelInfo.get("tunnel_info_id_"));
    		targetKrpano.set("krpano_tunnel_id",tunnelInfo.get("tunnel_info_id_"));
    		targetKrpano.set("krpano_tunnel_name",tunnelInfo.get("tunnel_info_id_"));
    	}else{
    		$("#krpano_tunnel_id").val("");
    		$("#krpano_tunnel_name").val("");
    		targetKrpano.set("krpano_tunnel_id_","");
    		targetKrpano.set("krpano_tunnel_name_","");
    	}
    	
    	refreshKrpanoFrame(targetKrpano.get("krpanos_id_"),function (){
    		var url = $("#krpanoFile").attr("src_bak")+"?oss_url="+GetQueryString("oss_url");
    		url+="&krpano_id="+targetKrpano.get("krpanos_id_");
    		url+="&ent_id="+GetQueryString("enter_id");
    		url+="&file_fold="+targetKrpano.get("file_fold_");
    		url+="&file_type="+targetKrpano.get("file_type_");
    		$("#krpanoFile").attr("src",url);
    		$(".rightNo").hide();
        	$(".rightNo7").show();
    	});
    	$("#divtittle").html("编辑四季田景");
		openDoor();
    }
    
    /**
     * 提交四季田景表单
     * @param data
     * @returns {Boolean}
     */
    function saveKrpano(data){
    	if($("#krpano_name").val()==""){
    		alert("请填写四季田景名称!");
    		return false;
    	}
    	if($("#krpanoFile").contents().find("#krpanoFileUrl").val()==""){
    		alert("请先上传图片！");
    		return false;
    	}
    	if($("#krpano_base_id").val()==""){
    		alert("请将四季田景放到基地范围内!");
    		return false;
    	}
    	var feature = null;
		var id = $("#krpano_id").val();
		if(id == ""){
			feature = source.getFeatureById("krpano_"+$("#krpano_index").val());
		}else{
			feature = krpanoSource.getFeatureById("krpano_"+$("#krpano_index").val());
		}
		
		if(feature == null){
			alert("请取消重试!");
			return ;
		}
		var coordinates = feature.getGeometry().clone().transform("EPSG:3857","EPSG:4326");
    	var latlng = coordinates.getCoordinates();
		$("#krpano_coordinateX").val(latlng[1]);
		$("#krpano_coordinateY").val(latlng[0]);
    	var method = $("#krpano_id").val()==""?"krpano_info_add":"krpano_info_update";
    	$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':method,
				'field':"{'enterprise_info_id':"+enter_id+",'form':'"+encodeURIComponent($('#krpanoForm').serialize())+"'}"
			},
			success: function( response ) {
				saveKrpanoNext(response);
			},
			error: function(e) {
			}
		});	
    }
    
    /**
     * update 四季田景属性
     * @param response
     */
    function saveKrpanoNext(response){
    	if(response.invoke_result == "INVOKE_SUCCESS"){
    		var data = response.data;
			var tunnel_info_id = data.krpano_id;
			var feature = source.getFeatureById("krpano_" + $("#krpano_index").val());
			if(feature == null)
				feature = krpanoSource.getFeatureById("krpano_" + $("#krpano_index").val());
			
	    	feature.set("base_id_",$("#tunnel_info_base_id").val());
	    	feature.set("partitions_id_",$("#tunnel_info_partitions_id").val());
	    	feature.set("tunnel_info_id",$("#tunnel_info_id_").val());
	    	feature.set("file_fold_","selected");
	    	feature.set("file_type_",$("#krpano_file_type").val());
	    	feature.set("file_suffix_",$("#krpano_file_suffix").val());
	    	feature.set("file_size_",$("#krpano_file_size").val());
	    	feature.set("file_width_",$("#krpano_file_width").val());
	    	feature.set("file_height_",$("#krpano_file_height").val());
	    	feature.set("file_name_",$("#krpano_file_name").val());
	    	feature.set("krpano_time_",$("#krpano_file_time").val());
	    	feature.set("name_",$("#krpano_name").val());
			var id = $("#krpano_id").val();
			if(id==""){
				feature.set("krpanos_id_",tunnel_info_id);
				krpanoSource.addFeature(feature);
			}
			source.clear();
			if(doubleClickSelect != null)
	    		doubleClickSelect.getFeatures().clear();
	    	featurelCoordinates = null;
			draw = null;
			closeKrpanoFrame();
			closeDoor();
    	}else if(response.invoke_result == "OTHER_ERROR"){
    		alert(response.invoke_message);
		}else{
			log(response.invoke_message)
		}
    }
    
    /**
     * 取消四季田景编辑
     */
    function krpano_no(){
//    	var feature = krpanoSource.getFeatureById("krpano_"+$("#video_index").val());
    	draw = null;
    	source.clear();
    	if(doubleClickSelect != null)
    		doubleClickSelect.getFeatures().clear();
    	featurelCoordinates = null;
    	closeKrpanoFrame();
		closeDoor();
    }
    
    /**
     * 删除四季田景
     * @param id
     */
    function deleteKrpano(id){
    	if(id==""){
    		krpano_no();
    		return;
    	}
    	if(!window.confirm("确定删除么?")){
    		return;
    	}
    	$.ajax({
			type: "GET",
			url: '/rest/1.0/webgis',
			dataType: "json",
			data:{
				'method':'krpano_info_delete',
				'field':"{'enterprise_info_id':"+enter_id+",'krpano_id':"+id+"}"
			},
			success: function( response ) {
				var krpano = krpanoSource.getFeatureById("krpano_"+$("#krpano_index").val());
				krpanoSource.removeFeature(krpano);
				source.clear();
				if(doubleClickSelect != null)
		    		doubleClickSelect.getFeatures().clear();
				featurelCoordinates = null;
				closeKrpanoFrame();
				closeDoor();
			},
			error: function(e) {
				//log(2);
			}
		});	//-----end
    }
    
    /**
     * 四季田景表单检测
     * @returns {Boolean}
     */
    function checkPreviewKrpano(){
    	if($("#krpanoFile").contents().find("#krpanoFileUrl").val()==""){
    		alert("请先上传图片！");
    		return false;
    	}
    	return true;
    }
    
    /**
     * 预览四季田景中上传的单独图片
     * @param url
     */
    function previewImage(url){
    	$("#previewDiv").show();
    	var height = document.body.clientHeight;
    	var width = document.body.clientWidth;
    	width = (width-1024)/2;
    	$("#previewDiv").css({"position":"absolute","z-index":1000,"left":width,"top":(height-768)/2});
    	$("#previewDiv img:first").attr("src",url);
    }

    /**
     * 预览四季田景
     */
    function previewKrpano_before(){
    	var val = $("#krpanoFile").contents().find("input:radio[name='fileType']:checked").val();
    	if(val == 1 ){
    		previewKrpano();
    	}else if(val == 2){
    		previewImage($("#krpanoFile").contents().find("#krpanoFileUrl").val());
    	}
    }
    
    /**
     * 打开四季田景预览框
     * @param id
     */
    function previewKrpano(id){
    	var val = $("#krpano_id").val();
    	if(val==""){
    		$("#krpano_iframe").attr("src","/map/Krpano2.seam?type=3&enterid="+enter_id);
    	}else{
    		$("#krpano_iframe").attr("src","/map/Krpano2.seam?krpano_id="+val+"&enterid="+enter_id+"&type=4");
    	}
    	
    	var height = document.body.clientHeight;
    	var width = document.body.clientWidth;
    	$("#krpano_iframe").css({"position":"absolute","z-index":1000,"left":(width-600)/2,"top":(height-600)/2});
    	var rightWidth =  $('#rightPane').width();
    	$("#krpano_iframe").css({"width":(width-rightWidth),"height":(height),left:0,top:0})
    	$("#krpano_iframe").show();
    }

    var moveInteraction = null;
    /**
     * 创建移动类
     */
    var app = {};


    /**
     * @constructor
     * @extends {ol.interaction.Pointer}
     */
    app.Drag = function() {

      ol.interaction.Pointer.call(this, {
        handleDownEvent: app.Drag.prototype.handleDownEvent,
        handleDragEvent: app.Drag.prototype.handleDragEvent,
        handleMoveEvent: app.Drag.prototype.handleMoveEvent,
        handleUpEvent: app.Drag.prototype.handleUpEvent
      });

      /**
       * @type {ol.Pixel}
       * @private
       */
      this.coordinate_ = null;
      /**
       * @type {string|undefined}
       * @private
       */
      this.cursor_ = 'pointer';

      /**
       * @type {ol.Feature}
       * @private
       */
      this.feature_ = null;

      /**
       * @type {string|undefined}
       * @private
       */
      this.previousCursor_ = undefined;

    };
    ol.inherits(app.Drag, ol.interaction.Pointer);
    /**
     * mousedown 事件
     * @param {ol.MapBrowserEvent} evt Map browser event.
     * @return {boolean} `true` to start the drag sequence.
     */
    app.Drag.prototype.handleDownEvent = function(evt) {
      var map = evt.map;

      var feature = map.forEachFeatureAtPixel(evt.pixel,
          function(feature) {
            return feature;
          });
      if(feature && feature.getId() != moveTarget){
    	  return false;
      }else if(feature){
    	  this.coordinate_ = evt.coordinate;
//    	  backCoordinate = feature.getGeometry().clone().getCoordinates();
          this.feature_ = feature;
      }

      return !!feature;
    };
    /**
     * mouse drag 事件
     * @param {ol.MapBrowserEvent} evt Map browser event.
     */
    app.Drag.prototype.handleDragEvent = function(evt) {
      var deltaX = evt.coordinate[0] - this.coordinate_[0];
      var deltaY = evt.coordinate[1] - this.coordinate_[1];

      var geometry = /** @type {ol.geom.SimpleGeometry} */
          (this.feature_.getGeometry());
      geometry.translate(deltaX, deltaY);

      this.coordinate_[0] = evt.coordinate[0];
      this.coordinate_[1] = evt.coordinate[1];
    };
    /**
     * mouse move 事件
     * @param {ol.MapBrowserEvent} evt Event.
     */
    app.Drag.prototype.handleMoveEvent = function(evt) {
      if (this.cursor_) {
        var map = evt.map;
        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function(feature) {
              return feature;
            });
        var element = evt.map.getTargetElement();
        if (feature) {
          if (element.style.cursor != this.cursor_) {
            this.previousCursor_ = element.style.cursor;
            element.style.cursor = this.cursor_;
          }
        } else if (this.previousCursor_ !== undefined) {
          element.style.cursor = this.previousCursor_;
          this.previousCursor_ = undefined;
        }
      }
    };
    /**
     * mouse up 事件
     * @return {boolean} `false` to stop the drag sequence.
     */
    app.Drag.prototype.handleUpEvent = function() {
    	log("up")
    	var feature = this.feature_;
    	if(this.feature_.get("ftype") == MARKER){//基地锚点
    		if(feature.getId() == "temp_"){
	        	if(baseSource.getFeaturesAtCoordinate(feature.getGeometry().getCoordinates()).length > 0){//验证基地中心点是否在别的基地中
	        		feature.getGeometry().setCoordinates(backCoordinate);
	        		this.coordiante_ = backCoordinate ;
	        		alert("基地重复!请重新规划");
	        		this.coordinate_ = null;
	        	    this.feature_ = null;
	        		return false;
	        	}
    		}else{
    			var baseInfo = baseSource.getFeatureById("base_"+feature.get("base_id_"));
    			if(baseInfo == null){
    				if(baseSource.getFeaturesAtCoordinate(feature.getGeometry().getCoordinates()).length > 0){//验证基地中心点是否在别的基地中
    	        		feature.getGeometry().setCoordinates(backCoordinate);
    	        		this.coordiante_ = backCoordinate ;
    	        		alert("基地重复!请重新规划");
    	        		this.coordinate_ = null;
    	        	    this.feature_ = null;
    	        		return false;
    	        	}else{
    	        		openMarkerWindow(feature);
    	        	}
    			}else{
    				var geo = feature.getGeometry();
    	        	var latlng = geo.getCoordinates();
    	    		var bases = baseSource.getFeaturesAtCoordinate(latlng);
    	        	var base = null;
    	        	if(bases.length>0){
    	        		base = bases[0];
    	        	}
    	        	var markerId = feature.get("base_id_");
    	        	var baseInfo = baseSource.getFeatureById("base_"+markerId);
    	        	if(base == null || base.get("base_id_") != markerId){
    	        		feature.getGeometry().setCoordinates(backCoordinate);
    	        		this.coordiante_ = backCoordinate ;
    	        		alert("须放置到基地中!");
    	        		this.coordinate_ = null;
    	        	    this.feature_ = null;
    	        		return false;
    	        	}else{
    	        		openMarkerWindow(feature);
    	        	}
    			}
    		}
//    		var geo = feature.getGeometry();
//        	var latlng = geo.getCoordinates();
//    		var bases = baseSource.getFeaturesAtCoordinate(latlng);
//        	var base = null;
//        	if(bases.length>0){
//        		base = bases[0];
//        	}
//        	var markerId = feature.get("base_id_");
//        	var baseInfo = baseSource.getFeatureById("base_"+markerId);
//        	if(base == null || base.get("base_id_") != markerId){
//        		feature.getGeometry().setCoordinates(backCoordinate);
//        		this.coordiante_ = backCoordinate ;
//        		alert("须放置到基地中!");
//        		this.coordinate_ = null;
//        	    this.feature_ = null;
//        		return false;
//        	}else{
//        		openMarkerWindow(feature);
//        	}
    	}else if(this.feature_.get("ftype") == DEVICE){
        	var geo = feature.getGeometry();
        	var latlng = geo.getCoordinates();
        	var tunnelInfos = tunnelInfoSource.getFeaturesAtCoordinate(latlng);
        	var tunnelInfo = null;
        	if(tunnelInfos.length>0){
        		tunnelInfo = tunnelInfos[0];
        	}
        	if(tunnelInfo == null){
        		alert("传感器须放置到地块中!");
        		this.coordiante_ = backCoordinate ;
        		feature.getGeometry().setCoordinates(backCoordinate);
        		this.coordinate_ = null;
        	      this.feature_ = null;
        		return false;
        	}else if(tunnelInfo.get("tunnel_info_device_id_") != null && tunnelInfo.get("tunnel_info_device_id_") != "" ){
        		alert("该地块已存在传感器!");
        		this.coordiante_ = backCoordinate ;
        		feature.getGeometry().setCoordinates(backCoordinate);
        		this.coordinate_ = null;
        	      this.feature_ = null;
        		return false;
        	}else{
        		var partitions = partitionsSource.getFeaturesAtCoordinate(latlng);
        		var partition = null;
        		if(partitions.length>0){
        			partition = partitions[0];
        			feature.set("partitions_id_",partition.get("partitions_id_"));
        			$("#device_partition_id").val(partition.get("partitions_id_"));
        	    	$("#device_partition_name").val(partition.get("name_"));
	        	}else{
	        		feature.set("partitions_id_","");
	        		$("#device_partition_id").val("");
	        		$("#device_partition_name").val("");
	        	}
        		$("#device_tunnel_id").val(tunnelInfo.get("tunnel_info_id_"));
            	$("#device_tunnel_name").val(tunnelInfo.get("name_"));
            	
            	var bases = baseSource.getFeaturesAtCoordinate(latlng);
            	var base = null;
            	if(bases.length>0){
            		base = bases[0];
            		feature.set("base_id_",base.get("base_id_"));
            		$("#device_base_name").val(base.get("name_"));
            		$("#device_base_id").val(base.get("base_id_"));
            	}else{
            		feature.set("base_id_","");
            		$("#device_base_name").val("");
            		$("#device_base_id").val("");
            	}
        	}
        	
    	}else if(this.feature_.get("ftype") == WEATHER_STATION){//气象站
    		var geo = feature.getGeometry();
        	var latlng = geo.getCoordinates();
    		var bases = baseSource.getFeaturesAtCoordinate(latlng);
        	var base = null;
        	if(bases.length>0){
        		base = bases[0];
        	}
        	if(base == null){
        		feature.getGeometry().setCoordinates(backCoordinate);
        		this.coordiante_ = backCoordinate ;
        		alert("气象站须放置到基地中!");
        		this.coordinate_ = null;
        	      this.feature_ = null;
        		return false;
        	}else{
        		$("#device_base_name").val(base.get("name_"));
        		$("#device_base_id").val(base.get("base_id_"));
        		var partitions = partitionsSource.getFeaturesAtCoordinate(latlng);
        		var partition = null;
        		if(partitions.length>0){
        			partition = partitions[0];
        			feature.set("partitions_id_",partition.get("partitions_id_"));
        			$("#device_partition_id").val(partition.get("partitions_id_"));
        	    	$("#device_partition_name").val(partition.get("name_"));
	        	}else{
	        		feature.set("partitions_id_","");
	        		$("#device_partition_id").val("");
	        		$("#device_partition_name").val("");
	        	}
        	}
    	}else if(this.feature_.get("ftype") == VIDEO){//摄像头
    		feature.setStyle(styles.videoStyle);
        	var geo = feature.getGeometry();
        	var latlng = geo.getCoordinates();
        	var bases = baseSource.getFeaturesAtCoordinate(latlng);
        	var base = null;
        	if(bases.length>0){
        		base = bases[0];
        	}
        	if(base == null){
        		alert("视频须放置到基地中!");
        		this.coordiante_ = backCoordinate ;
        		feature.getGeometry().setCoordinates(backCoordinate);
        		this.coordinate_ = null;
        	    this.feature_ = null;
        		return false;
        	}
        	$('#video_iframe').contents().find('#video_base_id').val(base.get("base_id_"));
        	$('#video_iframe').contents().find('#video_base_name').val(base.get("name_"));
        	
        	var partitions = partitionsSource.getFeaturesAtCoordinate(latlng);
        	var partition = null;
        	if(partitions.length>0){
        		partition = partitions[0];
        		$('#video_iframe').contents().find('#video_partition_id').val(partition.get("partitions_id_"));
            	$('#video_iframe').contents().find('#video_partition_name').val(partition.get("name_"));
        	}else{
        		$('#video_iframe').contents().find('#video_partition_id').val("");
            	$('#video_iframe').contents().find('#video_partition_name').val("");
        	}
        	
        	var tunnelInfos = tunnelInfoSource.getFeaturesAtCoordinate(latlng);
        	var tunnelInfo = null;
        	if(tunnelInfos.length>0){
        		tunnelInfo = tunnelInfos[0];
        		$('#video_iframe').contents().find('#video_tunnel_id').val(tunnelInfo.get("tunnel_info_id_"));
            	$('#video_iframe').contents().find('#video_tunnel_name').val(tunnelInfo.get("name_"));
        	}else{
        		$('#video_iframe').contents().find('#video_tunnel_id').val("");
            	$('#video_iframe').contents().find('#video_tunnel_name').val("");
        	}
    	}else if(this.feature_.get("ftype") == KRPANO){//四季田景
        	var geo = feature.getGeometry();
        	var latlng = geo.getCoordinates();
        	var bases = baseSource.getFeaturesAtCoordinate(latlng);
        	var base = null;
        	if(bases.length>0){
        		base = bases[0];
        		$("#krpano_base_id").val(base.get("base_id_"));
        		$("#krpano_base_name").val(base.get("name_"));
        		targetKrpano.set("krpano_base_id_",base.get("base_id_"));
        		targetKrpano.set("krpano_base_name_",base.get("name_"));
        	}else{
        		alert("全景须放置到基地中!");
        		this.coordiante_ = backCoordinate ;
        		feature.getGeometry().setCoordinates(backCoordinate);
        		this.coordinate_ = null;
        	    this.feature_ = null;
        		return false;
        	}
        	var googlelatlng = ol.proj.transform(latlng, 'EPSG:3857', 'EPSG:4326');
        	var x1 = googlelatlng[1];
        	var y1 = googlelatlng[0];
        	$("#krpano_coordinateX").val(x1);
        	$("#krpano_coordinateY").val(y1);
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
        	
        	var partitions = partitionsSource.getFeaturesAtCoordinate(latlng);
        	var partition = null;
        	if(partitions.length>0){
        		partition = partitions[0];
        		$("#krpano_partition_id").val(partition.get("partitions_id_"));
        		$("#krpano_partition_name").val(partition.get("name_"));
        		targetKrpano.set("krpano_partition_id_",partition.get("partitions_id_"));
        		targetKrpano.set("krpano_partition_name_",partition.get("name_"));
        	}else{
        		$("#krpano_partition_id").val("");
        		$("#krpano_partition_name").val("");
        		targetKrpano.set("krpano_partition_id_","");
        		targetKrpano.set("krpano_partition_name_","");
        	}
        	
        	var tunnelInfos = tunnelInfoSource.getFeaturesAtCoordinate(latlng);
        	var tunnelInfo = null;
        	if(tunnelInfos.length>0){
        		tunnelInfo = tunnelInfos[0];
        		$("#krpano_tunnel_id").val(tunnelInfo.get("tunnel_info_id_"));
        		$("#krpano_tunnel_name").val(tunnelInfo.get("tunnel_info_id_"));
        		targetKrpano.set("krpano_tunnel_id",tunnelInfo.get("tunnel_info_id_"));
        		targetKrpano.set("krpano_tunnel_name",tunnelInfo.get("tunnel_info_id_"));
        	}else{
        		$("#krpano_tunnel_id").val("");
        		$("#krpano_tunnel_name").val("");
        		targetKrpano.set("krpano_tunnel_id_","");
        		targetKrpano.set("krpano_tunnel_name_","");
        	}
    	}
      this.coordinate_ = null;
      this.feature_ = null;
      return false;
    };
    
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
    
    function closeKrpanoFrame(){
    	$("#krpano_iframe").hide();
    	$("#krpano_iframe").attr("src","");
    }
    
   //新手帮助
   function mapHelpOpen(){
		$(".tscolse").show();
		$(".ts6bdiv").show();
		$(".tsbzd span").attr("class","ts_step1");
		$(".tsbzd span:eq(0)").attr("class","ts_step2");
		$(".tsbzdTarget div").hide();
		$(".tsbzdTarget div:eq(0)").show();
	}
   $(".tsbzdTarget div:eq(0)").show();
   
   function HelpZoomFn(targetid,objN)
   {
	   var target=document.getElementById(targetid);
	   var zoomBtn=document.getElementById(objN)
	   if (target.style.display=="block")
	   {
		   target.style.display="none";
		   zoomBtn.style.background="url(/asset/images/suox.png)"
	   }
	   else
	   {
		   target.style.display="block";
		   zoomBtn.style.background="url(/asset/images/zuid.png)"
	   }
   } 
   function mapHelpCloseCheck(){
	   if(mapHelpEnable == "true"){
		   var height = $(document).height(); 
		   var top = (height-200)/2;
		   $("#mapHelpTips").css("top",top);
		   $("#mapHelpTips").modal("show")
	   }else{
		   $(".ts6bdiv").hide();
	   }
   }
   
   function mapHelpOk(){
	   $("#mapHelpTips").modal("hide")
	   if($("#mapHelpCheckbox")[0].checked){
		   mapHelpEnable = "false";
		   $("#mapHelp").show();
		   $.ajax({
				type: "GET",
				url: '/rest/1.0/webgis',
				dataType: "json",
				data:{
					'method':"update_help_status",
					'field':"{'enterprise_info_id':"+enter_id+"}"
				},
				success: function( response ) {
					log("修改成功");
				},
				error: function(e) {
					//log(2);
				}
			});	//-----end ajax
	   }
	   $(".ts6bdiv").hide();
   }
   function mapHelpNo(){
	   $("#mapHelpTips").modal("hide")
   }
   
   function showGuideTips(index){
	   if(mapHelpEnable == "true")
		   tsStep(index);
   }
   
   function tsStep(index){
		$(".ts6bdiv").show();
		$(".tsbgco div:first-child>div").hide();
		$(".tsbgco div:first-child>div:eq("+index+")").show();
		$(".tsbzd span").attr("class","ts_step1");
		$(".tsbzd span:eq("+index+")").attr("class","ts_step2");
	}
   
   
   function newAutoCom(selector,data){
		var $elem = $(selector).autocomplete({
			source: data,
			select: function( event, ui ) {
		        $( selector ).val( ui.item.label );
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

		        return $("<li></li>")
		            .data("item.autocomplete", item)
		            .append("<a>" + newText + "</a>")
		            .appendTo(ul);
		    };
		}
		return $elem;
	}
	function destroyAutoCom(selector){
		$(selector).autocomplete( "destroy" );
	}

	function openAutoCom(type,base_id,part_id,ent_type){
		if(type == 1){
			if(nullGroupFirst.length>0){
				newAutoCom("#marker_name", nullGroupFirst);
			}
		}else if(type == 2){
			var temp = new Array();
			for(var i = 0;i<nullGroupSecond.length;i++){
				var tob = nullGroupSecond[i];
				if(tob.base_id == base_id)
					temp.push(tob);
			}
			if(temp.length>0){
				newAutoCom("#partitions_name", temp);
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
					newAutoCom("#tunnel_info_name", temp);
				}else{
					var temp = new Array();
					for(var i = 0;i<nullGroupThird.length;i++){
						var tob = nullGroupThird[i];
						if(tob.base_id == base_id && tob.part_id == null && tob.ent_type == ent_type)
							temp.push(tob);
					}
					newAutoCom("#tunnel_info_name", temp);
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
      
      	function saveTest(){
	  		var obj = document.getElementById("land_phVal");
	  		var test = /^[+]?(([1-9]\d*[.]?)|(0.))(\d{0,2})?$/;
	  		var a = parseFloat(obj.value);
	  		if(!test.test(obj.value)||a<=0||a>=14){
	  			alert("酸碱度请填写0--14之间的数字!");
	  			return false;
	  		}
	  		var testDate = $("#land_testDate").val();
	  		if(testDate == ""){
	  			alert("请填写检测时间!");
	  			return false;
	  		}
	    	showTips();
	    	$.ajax({
				type: "GET",
				url: '/rest/1.0/webgis',
				dataType: "json",
				data:{
					'method':'edit_land_test',
					'field':"{'enterprise_info_id':"+enter_id+",'form':'"+encodeURIComponent($('#partitionTestForm').serialize())+"'}"
				},
				success: function( response ) {
					hideTips();
					saveTestNext(response);
				},
				error: function(e) {
					hideTips();
				}
			});	
	    }
	    
	    /**
	     * 接收返回的对象属性
	     * @param response
	     */
	    function saveTestNext(response){
	    	if(response.invoke_result == "INVOKE_SUCCESS"){
	    		var data = response.data;
	    		findPartitionLand($("#partitions_id").val());
				$("#divtittle").text("编辑分区边界信息");
		  		$(".rightNo").hide();
		      	$(".rightNo3").show();
			}else{
				log(response.invoke_message)
			}
	    }
	    
	    function addland(){
	    	$("#divtittle").text("编辑土地检测记录");
	    	$("#partitionTestForm input[type!='button']").val("");
	    	$(".test_partition_name").html($("#partitions_name").val());
	    	$("#land_partition_id").val($("#partitions_id").val());
	    	$(".rightNo").hide();
			$(".rightNo9").show();
	    }
	    
	    function deleteLand(land_id,partition_id){
	    	$.ajax({
				type: "GET",
				url: '/rest/1.0/webgis',
				dataType: "json",
				data:{
					'method':'delete_land_test',
					'field':"{'enterprise_info_id':"+enter_id+",'partition_id':'"+partition_id+"','land_id':'"+land_id+"'}"
				},
				success: function( response ) {
					var data = response.result_data ;
					var id = data.land_id;
					$(".land"+id).remove();
				},
				error: function(e) {
					hideTips();
				}
			});	
	    }
	    
	    function editLandInfo(land_id,partition_id){
	    	$.ajax({
				type: "GET",
				url: '/rest/1.0/webgis',
				dataType: "json",
				data:{
					'method':'get_land_info',
					'field':"{'enterprise_info_id':"+enter_id+",'partition_id':'"+partition_id+"','land_id':'"+land_id+"'}"
				},
				success: function( response ) {
					var data = response.result_data ;
					$("#partitionTestForm input[type!='button']").val("");
			    	$(".test_partition_name").html($("#partitions_name").val());
			    	$("#land_partition_id").val($("#partitions_id").val());
					if(data.length>0){
						var obj = data[0];
						$("#land_id").val(obj.id);
						$("#land_availableK").val(obj.available_k);
						$("#land_availableNitrogen").val(obj.available_nitrogen);
						$("#land_availablePhosphorus").val(obj.available_phosphorus);
						$("#land_cec").val(obj.cec);
						$("#land_chlorideIonContent").val(obj.chloride_ion_content);
						$("#land_countArsenic").val(obj.count_arsenic);
						$("#land_countCadmium").val(obj.count_cadmium);
						$("#land_countChrome").val(obj.count_chrome);
						$("#land_countLead").val(obj.count_lead);
						$("#land_countMercury").val(obj.count_mercury);
						$("#land_countNickel").val(obj.count_nickel);
						$("#land_countSe").val(obj.count_se);
						$("#land_ecVal").val(obj.ec_val);
						$("#land_effectiveBoron").val(obj.effective_boron);
						$("#land_effectiveCopper").val(obj.effective_copper);
						$("#land_effectiveIron").val(obj.effective_iron);
						$("#land_effectiveManganese").val(obj.effective_manganese);
						$("#land_effectiveSilicon").val(obj.effective_silicon);
						$("#land_effectiveSulfur").val(obj.effective_sulfur);
						$("#land_exchangeCa").val(obj.exchange_ca);
						$("#land_exchangeMg").val(obj.exchange_mg);
						$("#land_exchangeTotalBase").val(obj.exchange_total_base);
						$("#land_herbicideResidues").val(obj.herbicide_residues);
						$("#land_nitrogen").val(obj.nitrogen);
						$("#land_organicVal").val(obj.organic_val);
						$("#land_phVal").val(obj.ph_val);
						$("#land_phosphorus").val(obj.phosphorus);
						$("#land_potassium").val(obj.potassium);
						$("#land_redoxPotential").val(obj.redox_potential);
						$("#land_soilBulkDensity").val(obj.soil_bulk_density);
						$("#land_soilComposition").val(obj.soil_composition);
						$("#land_soilWater").val(obj.soil_water);
						$("#land_sulfateIonContent").val(obj.sulfate_ion_content);
						var testData = obj.test_date;
						if(typeof(testData) == "undefined"){
							$("#land_testDate").val("");
						}else{
							$("#land_testDate").val(new Date(obj.test_date.time).format("yyyy-MM-dd"));
						}
						$("#land_testOrg").val(obj.test_org);
						$("#land_totalCa").val(obj.total_ca);
						$("#land_totalMg").val(obj.total_mg);
						$("#land_totalSodium").val(obj.total_sodium);
						$("#land_wffectiveMolybdenum").val(obj.wffective_molybdenum);
						$("#land_wffectiveZn").val(obj.wffective_zn);
						$(".rightNo").hide();
						$(".rightNo9").show();
					}
				},
				error: function(e) {
					hideTips();
				}
			});	
	    }
	    
      	function cancelTest(){
      		$("#divtittle").text("编辑分区边界信息");
	  		$(".rightNo").hide();
	      	$(".rightNo3").show();
      	}
      
      	function addSoil(){
	    	$("#soil_id").val("");
			$("#soil_partition_id").val($("#partitions_id").val());
			$("#soil_partition_name").html($("#partitions_name").val());
			
			$("#soil_type1")[0].selectedIndex = 0;
			$("#soil_type1").selectpicker('refresh');
			
			$("#soil_type2")[0].selectedIndex = 0;
			$("#soil_type2").selectpicker('refresh');
			
			$("#soil_begin").val(yea);
			$("#soil_begin").selectpicker('refresh');
			
			$("#soil_end").val(yea);
			$("#soil_end").selectpicker('refresh');
			
			$("#soil_ph").val("7");
			
			$("#soil_route_of")[0].selectedIndex = 0;
			$("#soil_route_of").selectpicker('refresh');
			
			$("#soil_pollution_status")[0].selectedIndex = 0;
			$("#soil_pollution_status").selectpicker('refresh');
			
			$("#soil_description").val("");
			$("#soil_pollution_level").val("");
			$("#soil_repair_status").val("");
			$(".rightNo").hide();
			$(".rightNo10").show();
	    }
      	
      	function cancelSoil(){
      		$("#divtittle").text("编辑分区边界信息");
	  		$(".rightNo").hide();
	      	$(".rightNo3").show();
      	}

      	function saveSoil(){
      		var obj = document.getElementById("soil_ph");
    		var test = /^[+]?(([1-9]\d*[.]?)|(0.))(\d{0,2})?$/;
    		var a = parseFloat(obj.value);
    		if(!test.test(obj.value)||a<=0||a>=14){
    			alert("请填写0--14之间的数字!");
    			return ;
    		}
    		$.ajax({
				type: "GET",
				url: '/rest/1.0/webgis',
				dataType: "json",
				data:{
					'method':'eidt_soil',
					'field':"{'enterprise_info_id':"+enter_id+",'form':'"+encodeURIComponent($('#partitionSoilorm').serialize())+"'}"
				},
				success: function( response ) {
					hideTips();
					saveSoilNext(response);
				},
				error: function(e) {
					hideTips();
				}
			});	
	    }
	    
	    /**
	     * 接收返回的对象属性
	     * @param response
	     */
	    function saveSoilNext(response){
	    	if(response.invoke_result == "INVOKE_SUCCESS"){
	    		var data = response.data;
	    		findPartitionLand($("#partitions_id").val());
				$("#divtittle").text("编辑分区边界信息");
		  		$(".rightNo").hide();
		      	$(".rightNo3").show();
			}else{
				log(response.invoke_message)
			}
	    }
	    
	    function deleteSoil(land_id,partition_id){
	    	$.ajax({
				type: "GET",
				url: '/rest/1.0/webgis',
				dataType: "json",
				data:{
					'method':'delete_soil',
					'field':"{'enterprise_info_id':"+enter_id+",'partition_id':'"+partition_id+"','soil_id':'"+land_id+"'}"
				},
				success: function( response ) {
					var data = response.result_data ;
					var id = data.soil_id;
					$(".soill"+id).remove();
				},
				error: function(e) {
					hideTips();
				}
			});	
	    }
	    
	    function editSoil(soil_id,partition_id){
	    	$.ajax({
				type: "GET",
				url: '/rest/1.0/webgis',
				dataType: "json",
				data:{
					'method':'get_soil_info',
					'field':"{'enterprise_info_id':"+enter_id+",'partition_id':'"+partition_id+"','soil_id':'"+soil_id+"'}"
				},
				success: function( response ) {
					var data = response.result_data ;
					$("#partitionSoilorm input[type!='button']").val("");
					$("#soil_partition_id").val($("#partitions_id").val());
					$("#soil_partition_name").html($("#partitions_name").val());
					if(data.length>0){
						var obj = data[0];
						$("#soil_id").val(obj.id);
						$("#soil_type1").selectpicker("val",obj.soil_data_dic_id);
						
						$("#soil_type2").selectpicker("val",obj.soils_data_dic_id);
						
						$("#soil_begin").selectpicker("val",obj.begin_time);
						
						$("#soil_end").selectpicker("val",obj.end_time);
						
						$("#soil_ph").val(obj.ph);
						
						$("#soil_route_of").selectpicker("val",obj.route_of);
						
						$("#soil_pollution_status").selectpicker("val",obj.pollution_status);
						
						$("#soil_description").val(obj.description);
						$("#soil_pollution_level").val(obj.pollution_level);
						$("#soil_repair_status").val(obj.repair_status);
						$(".rightNo").hide();
						$(".rightNo10").show();
					}
				},
				error: function(e) {
					hideTips();
				}
			});	
	    }
	    


var FontTimer,
    makeParameterMethod,
    makeParameterField,
    makeParameterFieldType,
    makeParameterVerify,
    pageUrl,
    pageUrlType; 
//FontSize();

var windowWidth = document.documentElement.clientWidth;
var windowHeight= document.documentElement.clientHeight;

//图片懒加载
$("img").lazyload({
	effect: "fadeIn"
});

// 进度条计算
var progress_block = $('.progress_block').width();
$('.progress_percent').css('width',progress_block);

// ajax加载数据
var iframeSearch = location.search.split('&');
var getEnterpriseInfoId = iframeSearch[0].split("=")[1];
var getRealPlantId = iframeSearch[1].split('=')[1];
var getDataType = iframeSearch[2].split('=')[1];
var getTimeType = iframeSearch[3].split('=')[1];
var getVerify = iframeSearch[4].split('=')[1];
var getTestUrl = iframeSearch[5].split("=")[1];
var getPhone = iframeSearch[6].split("=")[1];

var windowWidth = document.documentElement.clientWidth;
var windowHeight= document.documentElement.clientHeight;
makeParameterMethod = function(string){
    var Method = '&method=' + string;
    return Method;
}
makeParameterField = function(PhoneNumber,Number, EnterpriseInfoId,ID, RealPlantId,plantId){
    return encodeURI('&field={"'+PhoneNumber+'":"'+Number+'","'+EnterpriseInfoId+'":"'+ID+'","'+RealPlantId+'":"'+plantId+'"}');
}
makeParameterFieldType = function(PhoneNumber,Number, EnterpriseInfoId,ID, RealPlantId,plantId, DataType,Type1, TimeType,Type2){
    return encodeURI('&field={"'+PhoneNumber+'":"'+Number+'","'+EnterpriseInfoId+'":"'+ID+'","'+RealPlantId+'":"'+plantId+'","'+DataType+'":"'+Type1+'","'+TimeType+'":"'+Type2+'"}');
}
makeParameterVerify = function(string){
    var Verify = '&verify=' + string;
    return Verify;
}
ParameterMethod = makeParameterMethod('phone.view.plant');
ParameterField = makeParameterField('phone',getPhone,'enterpriseInfoId',getEnterpriseInfoId,'realPlantId',getRealPlantId);
ParameterVerify = makeParameterVerify(getVerify);
pageUrl = getTestUrl + "/rest/1.0/phoneView?v=1.0&format=json" + ParameterMethod + ParameterField + ParameterVerify;
$.ajax({
    type: "GET",
    url: pageUrl,
    dataType: "jsonp",
    jsonp: 'callback',
    success: function(response) {
        // 作物信息数据
        InitCropInfoData(response.data_result);

    },
    error: function(e) {
        try {
            console.log('请求失败了吧！！')
        } catch (e) {}
    }
});

// 跳转到监控页面
$('#view_monitor').click(function(){
    window.location.href= getTestUrl + "/phone/Monitor.html?realPlantId="+getRealPlantId+"&enterpriseInfoId="+ getEnterpriseInfoId +"&verify="+getVerify+"&domain="+getTestUrl+"&phone="+getPhone;
});
// 跳转到指数页面
$('#view_exponent').click(function(){
    window.location.href= getTestUrl + "/phone/Exponent.html?enterpriseInfoId="+getEnterpriseInfoId+"&realPlantId="+getRealPlantId+"&verify="+getVerify+"&domain="+getTestUrl+"&phone="+getPhone;
});

// 物联网设备-传感器数据ajax加载数据
$('#sensor_container .swiper_slide').eq(getDataType-1).addClass('slide_active').siblings().removeClass('slide_active');
$('#dayweekmonth span').eq(getTimeType-1).addClass('sCur').siblings().removeClass('sCur');
ParameterMethodType = makeParameterMethod('phone.view.plant.device.data');
ParameterFieldType = makeParameterFieldType('phone',getPhone,'enterpriseInfoId',getEnterpriseInfoId,'realPlantId',getRealPlantId,'dataType',getDataType,'timeType',getTimeType);
ParameterVerifyType = makeParameterVerify(getVerify);
pageUrlType = getTestUrl + "/rest/1.0/phoneView?v=1.0&format=json" + ParameterMethodType + ParameterFieldType + ParameterVerifyType;
var hasChartData, //是否有折线图数据
    ChartData,  //折线图数据集合
    ChartTime;  //折线图数据时间
$.ajax({
    type: "GET",
    url: pageUrlType,
    dataType: "jsonp",
    jsonp: 'callback',
    success: function(response) {
    	// 传感器7个数据
        if( response.invoke_result == 'INVOKE_SUCCESS' ){
	        if( response.data_result != '' || response.data_result != undefined ){
	        	InitDeviceData(response.data_result);
	        }
	        // 是否有折线图数据
	        hasChartData = response.data_result.hasChartData;
	        ChartData = response.data_result.ChartData;
	        ChartTime = response.data_result.ChartTime;
	        if(hasChartData == true){
	            $('#sensor_chart').show();
	            $('#sensor_nochart').hide();
	            SensorChart(ChartData,ChartTime);
	        }else{
	            $('#sensor_chart').hide();
	            $('#sensor_nochart').show();
	        }
	        
	        // 传感器数据--列表平均分配宽度
	        var swiperWidth = windowWidth/4;
	        var swiperLen = $('.swiper_sensor .swiper_slide').length;
	        $('.swiper_sensor .swiper_slide').css({
	            'width' : swiperWidth
	        }); 
	        $('.swiper_sensor').css({
	            'width' : swiperWidth*swiperLen
	        });
        }else{
        	$('.sensor_data_wap').hide();
        }
    },
    error: function(e) {
        try {
            console.log('传感器数据,请求失败了吧！！')
        } catch (e) {}
    }
});


// 传感器数据--点击事件及切换图表内容
$('.swiper_sensor .swiper_slide').each(function(index,elem){
    $(elem).click(function(){

        $(elem).addClass('slide_active').siblings().removeClass('slide_active');
//        $('#dayweekmonth span').eq(getTimeType-1).addClass('sCur').siblings().removeClass('sCur');
        var index = $(elem).index()+1;

        // URL
        ParameterFieldType = makeParameterFieldType('phone',getPhone,'enterpriseInfoId',getEnterpriseInfoId,'realPlantId',getRealPlantId,'dataType',index,'timeType',$("#dayweekmonth .sCur").attr('timeType'));
        pageUrlType = getTestUrl + "/rest/1.0/phoneView?v=1.0&format=json" + ParameterMethodType + ParameterFieldType + ParameterVerifyType;
        // alert(index+'点击时类型'+getTimeType)
        // console.log(pageUrlType);
        // AJAX
        $.ajax({
            type: "GET",
            url: pageUrlType,
            dataType: "jsonp",
            jsonp: 'callback',
            success: function(response) {

                // 是否有折线图数据
                hasChartData = response.data_result.hasChartData;
                ChartData = response.data_result.ChartData;
                ChartTime = response.data_result.ChartTime;
                if(hasChartData == true){
                    $('#sensor_chart').show();
                    $('#sensor_nochart').hide();
                    SensorChart(ChartData,ChartTime);
                }else{
                    $('#sensor_chart').hide();
                    $('#sensor_nochart').show();
                }

            },
            error: function(e) {
                try {
                    console.log('传感器数据,请求失败了吧！！')
                } catch (e) {}
            }
        });

    });
});
// 天周月
$('#dayweekmonth span').click(function(){
    $(this).addClass('sCur').siblings().removeClass('sCur');
    var indexData = $('#sensor_container .slide_active').attr('datatype');

    // URL
    ParameterFieldType = makeParameterFieldType('phone',getPhone,'enterpriseInfoId',getEnterpriseInfoId,'realPlantId',getRealPlantId,'dataType',indexData,'timeType',$(this).attr('timeType'));        
    pageUrlType = getTestUrl + "/rest/1.0/phoneView?v=1.0&format=json" + ParameterMethodType + ParameterFieldType + ParameterVerifyType;
    // alert(indexData+'月日类型'+$(this).attr('timeType'))
    console.log(pageUrlType)
    // AJAX
    $.ajax({
        type: "GET",
        url: pageUrlType,
        dataType: "jsonp",
        jsonp: 'callback',
        success: function(response) {

            // 是否有折线图数据
            hasChartData = response.data_result.hasChartData;
            ChartData = response.data_result.ChartData;
            ChartTime = response.data_result.ChartTime;
            // 有折线图数据时，日周月数据变换如下
            
            if(hasChartData == true){
                $('#sensor_chart').show();
                $('#sensor_nochart').hide();
                SensorChart(ChartData,ChartTime);
            }else{
                $('#sensor_chart').hide();
                $('#sensor_nochart').show();
            }

        },
        error: function(e) {
            try {
                console.log('传感器数据,请求失败了吧！！')
            } catch (e) {}
        }
    });
});
// 传感器数据图表，有无数据高度
//$('#sensor_chart').css('height',$('#sensor_chart').width()*0.6);
//$('#sensor_chart').css('width',$(window).width());
//$('#sensor_nochart').css('height',$('#sensor_chart').width()*0.6);
//$('#sensor_container').width($(window).width());


// ---------------------------------------------------------------------------
// 浏览器变化时执行
$(window).resize(function(){

//	clearTimeout( FontTimer );
//	FontTimer = setTimeout( FontSize , 500 );

    // 进度条计算
    var progress_block = $('.progress_block').width();
    $('.progress_percent').css('width',progress_block);
    // 传感器数据图表，有无数据高度
//    $('#sensor_chart').css('height',$('#sensor_chart').width()*0.6);
//    $('#sensor_chart').css('width',$(window).width());
//    $('#sensor_nochart').css('height',$('#sensor_chart').width()*0.6);
    // 传感器数据--图表
    //SensorChart(response.ChartData,response.ChartTime);

});


// ---------------------------------------------------------------------------
// 计算不同分辨率下的文字大小
//function FontSize(){
//	document.documentElement.style.fontSize = parseInt((document.documentElement.clientWidth>414?414:document.documentElement.clientWidth)/12)+'px';
//}

// 初始化作物信息
function InitCropInfoData(_data){
	
	//如果没有监控，则不显示监控按钮
	if( _data.hasVideo == false ){
		$('#view_monitor').hide();
	}

	
	
    // 作物信息
	if(_data.plantImg==undefined || _data.plantImg==''){
    	$('#plantImg').attr('src',"/asset/images/wt.png");
    }else{
    	$('#plantImg').attr('src',_data.plantImg);
    }
    $('#plantName').html(_data.plantName);
    $('#breedName').html(_data.breedName);
    $('#plantTime').html(_data.plantBeginTime+'-'+_data.plantEndTime);
    
  //如果没有生命周期，则：
	if( _data.hasPeriod == false ){
		$('.cropinfo_bd').hide();
	}else{
		$('.cropinfo_bd').show();	
		// 生命周期及天数
	    $('#periodName').html(_data.periodName);
	    $('#alreayPlantDays').html('（第'+_data.alreayPlantDays+'天）');
	    //$('#text_cyle').html(_data.periodName);
	    //$('#remain').html(_data.remain);
	    $('#progress_bar').css('width',_data.grownProp+'%');
	}

    // 种植信息
    var farmingsList = '';
    var farmings = _data.farmings;
    var $farm_information = $('#farm_information');
    if(farmings!=undefined  && farmings.length>0){
        // 有数据
        for( var i=0;i<farmings.length;i++){
            var imagesArr = '';
            var swiper_wrapper = '';
            var swiper_farmpic = '';
             var indexIn = i;
            for( var j=0;j<farmings[i].images.split(',').length;j++){
               if(farmings[i].images.split(',')[j] != ''){
            	   imagesArr += '<img img_index="'+j+'" onclick="$(\'.swiper_sensor\').hide();SwiperFn('+indexIn+','+j+')" src="'+farmings[i].images.split(',')[j]+'" />';
                   swiper_wrapper += 
                       '<div class="swiper-slide">'+
                           '<i class="text_empty"></i>'+
                           '<img class="pic" src="'+farmings[i].images.split(',')[j]+'">'+
                       '</div>';
               }
            }
            // 获取swiper图片，追加到body最后
            swiper_farmpic += 
            '<div class="swiper-container swiper_farmpic" id="swiper_farmpic'+i+'">'+
                '<div class="swiper-wrapper">'+ swiper_wrapper +'</div>'+
                '<div class="page_bclok" id="page_bclok">'+
                    '<span class="opacity_c3"></span>'+
                    '<p class="text_num"><span class="n_cur"></span>/<span class="n_total"></span></p>'+
                '</div>'+
            '</div>';
            $('body').append( swiper_farmpic )

            // 获取农事信息列表，追加到农事信息内容部分
            farmingsList += 
            '<dl class="dl_dl" agriculturalId="'+farmings[i].agriculturalId+'">'+
                '<dt class="dl_dt">'+
                    '<p class="text_time">'+farmings[i].operatingTime.split(' ')[1].split(':')[0]+':'+farmings[i].operatingTime.split(' ')[1].split(':')[1]+'</p>'+
                    '<p class="text_date">'+farmings[i].operatingTime.split(' ')[0].split('-')[1]+'/'+farmings[i].operatingTime.split(' ')[0].split('-')[2]+'</p>'+
                    '<i class="cPoint"></i>'+
                '</dt>'+
                '<dd class="dl_dd">'+
                    '<p class="text_con white_nowrap">'+farmings[i].name+'</p>'+
                    '<p class="text_dec">'+farmings[i].description+'</p>'+
                    '<div class="farm_piclist clear" id="farm_piclist'+i+'">'+imagesArr+'</div>'+
                    // '<div class="farm_piclist clear" id="farm_piclist'+i+'">'+farmings[i].images.split(',').join('')+'</div>'+
                '</dd>'+
            '</dl>';
        }
        $farm_information.append( farmingsList );

        
    }else{
        // 无数据
        farmingsList = 
        '<div class="no_information">'+
            '<img src="/asset/images/phone/PlantDetail_icon4.png" class="no_icon">'+
            '<p class="no_tip">暂无农事信息</p>'+
        '</div>';
        $farm_information.append( farmingsList );
    }

    // 采收信息
    var harvestsList = '';
    var harvests = _data.harvests;
    var $harvests_information = $('#harvests_information');
    if(harvests.length>0){
        // 有数据
        for( var i=0;i<harvests.length;i++ ){
            harvestsList += 
            '<li>'+
                '<div class="crop_pic">'+
                    '<img src="/asset/images/phone/PlantDetail_harvest.png" >'+
                '</div>'+
                '<div class="harvest_det">'+
                    '<p class="text_name">'+harvests[i].name+'</p>'+
                    '<p class="text_date">'+harvests[i].time+'</p>'+
                '</div>'+
                '<p class="harvest_weight"><em class="num">'+harvests[i].weight+'</em>kg</p>'+
            '</li>';
        }
        $harvests_information.append( harvestsList );
        $('#harvest_noinfor').hide();
    }else{
        // 无数据
        $('#harvest_noinfor').show();
    }

}

// 初始化传感器数据函数
function InitDeviceData(_data){
    // 空气温度
    var airTemp = _data.airTemp+'';
    airTemp == 'undefined' || airTemp =='' ? $('#airTemp').html('--℃') : $('#airTemp').html(airTemp+'℃');
    // 空气湿度
    var airHumidity = _data.airHumidity+'';
    airHumidity == 'undefined' || airHumidity =='' ? $('#airHumidity').html('--℃') : $('#airHumidity').html(airHumidity+'℃');
    // 土壤湿度
    var soilHumidity = _data.soilHumidity+'';
    soilHumidity == 'undefined' || soilHumidity =='' ? $('#soilHumidity').html('--%') : $('#soilHumidity').html(soilHumidity+'%');
    // 光照强度
    var illumination = _data.illumination+'';
    illumination == 'undefined' || illumination ==''  ? $('#illumination').html('--lux'): $('#illumination').html(illumination+'lux') ;
    // 二氧化塘
    var co2 = _data.co2+'';
    co2 == 'undefined' || co2 =='' ? $('#co2').html('--℃') : $('#co2').html(co2+'℃');
    // 土壤温度
    var soilTemp = _data.soilTemp+'';
    soilTemp == 'undefined' || soilTemp =='' ? $('#soilTemp').html('--℃') : $('#soilTemp').html(soilTemp+'℃');
    // 空气露点
    var dewPoint = _data.dewPoint+'';
    dewPoint == 'undefined' || dewPoint =='' ? $('#dewPoint').html('--℃') : $('#dewPoint').html(dewPoint+'℃');
}


// swiper农事图片
function SwiperFn(swiperId,imgIndex){
    $('body').attr('style','overflow:hidden');
    var farmpicLen = $('#farm_piclist'+swiperId+' img').length;
    $('#swiper_farmpic'+swiperId).width( $('body').width() );
    $('#swiper_farmpic'+swiperId).height( $('body').height() );
    $('#swiper_farmpic'+swiperId).show();
    
    var FarmSwiper = new Swiper('#swiper_farmpic'+swiperId,{
        loop : false,
        initialSlide : imgIndex,
        onFirstInit: function( FarmSwiper ){ //Swiper2.x的回调函数，首次初始化后执行,初始化是onFirstInit
            $('#page_bclok .n_cur').html( imgIndex+1 ); 
            $('#page_bclok .n_total').html( farmpicLen );    
        }, 
        onSlideChangeEnd: function(swiper){ 
            $('#swiper_farmpic'+swiperId+' .n_cur').html( FarmSwiper.activeIndex+1 ); 
            $('#swiper_farmpic'+swiperId+' .n_total').html( farmpicLen );  
        }
      });
    $('#swiper_farmpic'+swiperId).click(function(){
        $('body').removeClass('overflowH');
        $('#swiper_farmpic'+swiperId).hide();
        $(".swiper_sensor").show();
    });
}


// 传感器数据--图表
function SensorChart(chartData,chartTime){
    $('#sensor_chart').highcharts({
        credits: {
            enabled:false  // 去掉版权信息
        },
        chart: {
            type: 'line'
        },
        title: {
            text: ''
        },
        legend: {
            layout: 'vertical',
            floating: true,
            align: 'left',
            verticalAlign: 'top',
            x: 9000,
            y: 45
        },
        xAxis: {
            categories: chartTime,
            labels:{
                style: {                         // 标签全局样式
                    color: "#414141",
                    fontSize: '12px',
                    fontWeight: 'normal',
                    fontFamily: ''        
                }
            }
        },
        yAxis: {
            title: {
                text: ''
            },
            labels:{
                style: {                         // 标签全局样式
                    color: "#6fac24",
                    fontSize: '12px',
                    fontWeight: 'normal'       
                }
            }
        },
        plotOptions: {//点上边的数值
            line: {
                connectNulls:true,//该设置会连接空值点
                dataLabels: {
                    enabled: false
                },
                enableMouseTracking: false
            }
        },
        series: [{
            name: '',
            data: chartData,
            color : "#6fac24"
        }]
    });
}
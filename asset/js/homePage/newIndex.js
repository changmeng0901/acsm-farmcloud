// 进度条
jQuery(document).ready(function() {	
	//右侧底部固定定位的天气事件
	jQuery('#fixed_weather').mouseover(function(){
		jQuery('#topContentRight').show();
		jQuery('#fixed_weather').hide();
		jQuery('#topContentRight').slideDown();	
	});
	jQuery('#topContentRight').mouseout(function(){
		//jQuery('#topContentRight').slideUp();	
		jQuery('#topContentRight').hide();
		jQuery('#fixed_weather').show();
	});
	growthStyle();
	// 点击签到
	jQuery('.topContentLeft .sign').click(function() {
		if(signFlag=="false"){
			jQuery('.topContentLeft .sign .points').css('display','block');
			userSign();			
		}	
	});
	// 运营情况
	operateInit();
	getSlider();
	newSlider();
	// 新闻资讯
	jQuery('.news .item li').click(function() {
		var index = jQuery(this).index();
		jQuery(this).addClass('cur').siblings().removeClass('cur');
		jQuery('.news .box').eq(index).addClass('current').siblings().removeClass('current');
	});
	jQuery(".present li").click(function() {
		var index = jQuery(this).index();
		jQuery(this).addClass('cur').siblings().removeClass('cur');
		jQuery(".dashboard").css("display","none");
		jQuery(".current"+index).css("display","");
	});
	 
});
function operateInit(){
	// 运营情况 本周
	var dial1 = echarts.init(document.getElementById('dial1'));
	var dial2 = echarts.init(document.getElementById('dial2'));
	var dial3 = echarts.init(document.getElementById('dial3'));
	var dial4 = echarts.init(document.getElementById('dial4'));
	var dial5 = echarts.init(document.getElementById('dial5'));
	var dial6 = echarts.init(document.getElementById('dial6'));
	var dial7 = echarts.init(document.getElementById('dial7'));

	var option1 = getOption(thisOperatePercent[0],'#fa8564');
	var option2 = getOption(thisOperatePercent[1],'#9cc8ec');
	var option3 = getOption(thisOperatePercent[2],'#ed8dc0');
	var option4 = getOption(thisOperatePercent[3],'#b0e8ac');
	var option5 = getOption(thisOperatePercent[4],'#8eeaf3');
	var option6 = getOption(thisOperatePercent[5],'#96eab9');
	var option7 = getOption(thisOperatePercent[6],'#63a8eb');
	dial1.setOption(option1); 
	dial2.setOption(option2);
	dial3.setOption(option3);
	dial4.setOption(option4); 
	dial5.setOption(option5);
	dial6.setOption(option6);
	dial7.setOption(option7);  
	// 运营情况 上周
	var lastDial1 = echarts.init(document.getElementById('lastDial1'));
	var lastDial2 = echarts.init(document.getElementById('lastDial2'));
	var lastDial3 = echarts.init(document.getElementById('lastDial3'));
	var lastDial4 = echarts.init(document.getElementById('lastDial4'));
	var lastDial5 = echarts.init(document.getElementById('lastDial5'));
	var lastDial6 = echarts.init(document.getElementById('lastDial6'));
	var lastDial7 = echarts.init(document.getElementById('lastDial7'));
	var lastOption1 = getOption(lastOperatePercent[0],'#fa8564');
	var lastOption2 = getOption(lastOperatePercent[1],'#9cc8ec');
	var lastOption3 = getOption(lastOperatePercent[2],'#ed8dc0');
	var lastOption4 = getOption(lastOperatePercent[3],'#b0e8ac');
	var lastOption5 = getOption(lastOperatePercent[4],'#8eeaf3');
	var lastOption6 = getOption(lastOperatePercent[5],'#96eab9');
	var lastOption7 = getOption(lastOperatePercent[6],'#63a8eb');
	lastDial1.setOption(lastOption1); 
	lastDial2.setOption(lastOption2);
	lastDial3.setOption(lastOption3);
	lastDial4.setOption(lastOption4); 
	lastDial5.setOption(lastOption5);
	lastDial6.setOption(lastOption6);
	lastDial7.setOption(lastOption7);    
}
//签到回调
function userSignComplete(data){
	signFlag=data;
	jQuery('.topContentLeft .sign').addClass('cur');	
	setTimeout("jQuery('.topContentLeft .sign .points').css('display','none')",3000);
	growthStyle();
}
function getSlider(){//服务中心页面--增值服务焦点图切换
	var num = 0;
	var itemW = jQuery('.web_slider_wap .sl_item').width()*3;
	var len = jQuery('.web_slider_wap .sl_item').length;
		
	jQuery('.web_slider_wap .sl_item').each(function(index, elem) {
		//如果索引值是第二个的倍数，则去掉竖线
        if( jQuery(elem).index()%3 == 2 ){
			jQuery(elem).find('.pos_line').hide();	
		}
    });
	jQuery('.slider_list').css( 'width' , jQuery('.web_slider_wap .sl_item').width()*len );
	//上一个
	jQuery('.web_slider_wap .btn_prev') .click(function(){
		if( num <=0 ){
			num =0;	
		}else{
			num--;	
		}
		jQuery('.slider_list').css( 'left' , -(itemW*num) );
	});	
	//下一个
	jQuery('.web_slider_wap .btn_next') .click(function(){
		if(len<=3){
			num=0;
		}else if( num >= (Math.ceil(len/3)-1)){
			num = Math.ceil(len/3)-1;	
		}else{
			num++;
		}
		jQuery('.slider_list').css( 'left' , -(itemW*num) );
	});	
}
function newSlider(){//新闻资讯--成功案例
	var num = 0;
	var itemW = jQuery('.newsBox .case:eq(0) li').outerWidth(true)*3;
	var len = jQuery('.newsBox .case:eq(0) li').length;
	jQuery('.newsBox .case:eq(0)').css( 'width' , jQuery('.newsBox .case:eq(0) li').outerWidth(true)*len );
	if(len<=3){
		jQuery('.btns').hide();
	}else{
		jQuery('.btns').show();
	}
	var nub = Math.ceil(len/3);
	var html = " ";
	for(var i = 0; i<nub; i++){
		html+="<li></li>";
	}
	jQuery('.circleBtn').html(html);
	jQuery('.circleBtn li:first').addClass('cur');
	//上一个
	jQuery('.btns .leftBtn') .click(function(){
		if( num <=0 ){
			num =0;	
		}else{
			num--;	
		}
		jQuery('.newsBox .case:eq(0)').css( 'left' , -(itemW*num));
		jQuery('.circleBtn li').eq(num).addClass('cur').siblings().removeClass('cur');
	});	
	//下一个
	jQuery('.btns .rightBtn') .click(function(){
		if( num >= Math.floor(len/3)){
			num = Math.floor(len/3);	
		}else{
			num++;
		}
		jQuery('.newsBox .case:eq(0)').css( 'left' , -(itemW*num) );
		jQuery('.circleBtn li').eq(num).addClass('cur').siblings().removeClass('cur');
	});
	jQuery('.circleBtn li').click(function() {
		var num = jQuery(this).index();
		jQuery(this).addClass('cur').siblings().removeClass('cur');
		jQuery('.newsBox .case:eq(0)').css( 'left' , -(itemW*num) );
	});	
}

function getOption(v,_color) {
	option = {
	    tooltip : {
	      show:false,
	        formatter: "{a} <br/>{b} : {c}%"
	    },
	    toolbox: {
	        show : false,
	        feature : {
	            mark : {show: true},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    series : [
	        {
	            name:'业务指标',
	            type:'gauge',
	            startAngle: 180,
	            endAngle: 0,
	            center : ['50%', '90%'],    // 默认全局居中
	            radius : ['12','40'],
	            axisLine: {            // 坐标轴线
	                lineStyle: {       // 属性lineStyle控制线条样式
	                    width: 20,
	                    color: [
								[v/100, _color],
								[1, '#f1f1f1']
							]

	                }
	            },
				splitNumber:0,

	            axisTick: {            // 坐标轴小标记
	                splitNumber: 2,   // 每份split细分多少段
	                length :5,        // 属性length控制线长
	            },
	            axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
	                formatter: function(v){
	                    switch (v+''){
	                        case '10': return '低';
	                        case '50': return '中';
	                        default: return '';
	                    }
	                },
	                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: '#fff',
	                    fontSize: 15,
	                    fontWeight: 'bolder'
	                }
	            },
	            pointer: {
	                width:5,
	                length: '90%',
	                color: 'rgba(59, 59, 67, 0.8)'
	            },
	            title : {
	                show : false,
	                offsetCenter: [0, '-60%'],       // x, y，单位px
	                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    color: '#fff',
	                    fontSize: 14
	                }
	            },
	            detail : {
	                show : false,
	                backgroundColor: 'rgba(0,0,0,0)',
	                borderWidth: 0,
	                borderColor: '#ccc',
	                width: 20,
	                height: 10,
	                offsetCenter: [0, -40],       // x, y，单位px
	                formatter:'{value}%',
	                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
	                    fontSize : 14
	                }
	            },
	            data:[{value: v, name: ''}]
	        }
	    ]
	};
	return option;
}
function growthStyle(){
	if((jQuery('.blue').width()/jQuery('.growth').width()*100)>80){
	 	jQuery('.manage').addClass('newRight');
	};
}
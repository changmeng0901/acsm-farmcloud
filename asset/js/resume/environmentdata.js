// JavaScript Document

$(function() {
	var growthEnvironment=eval(allJson);
	if(growthEnvironment==null ||  growthEnvironment.floristicsType==1){
		$(".jsl").remove();
		$('.page2-flash2-flag').eq(0).append('<img src="../asset/images/resume2/page7-13.png" /> 气象光照');
		$('.page2-flash2-flag').eq(1).append('<img src="../asset/images/resume2/page7-13.png" /> 气象湿度');
		$('.page2-flash2-flag').eq(2).append('<img src="../asset/images/resume2/page7-13.png" /> 气象温度');
		//$('.page2-flash2-flag').eq(2).append('<img src="../asset/images/resume/weather_img.png" /> 气象温度');
	}else{
		$(".sd").remove();
	}
	
  Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
	//环境指纹
		//环境数据
		$('#shuju-pic').carousel({
			interval: false
		});
		//
		if(growthEnvironment.suitableHumidity==undefined && growthEnvironment.actualHumidity==undefined){
			$(".sd").remove();
		}
		if(growthEnvironment.suitableTemperature==undefined && growthEnvironment.actualTemperature==undefined){
			$(".wd").remove();
		}

		//总积温
		$("#sumOfHeat").attr("data-to", growthEnvironment.accumulatedTemperature);
		$("#sumOfHeat").text(growthEnvironment.accumulatedTemperature);
		$("#sumOfHeat").each(count);
		//日夜温差
		$("#temperatureDifference").attr("data-to", growthEnvironment.temperatureDifference);
		$("#temperatureDifference").text(growthEnvironment.temperatureDifference);
		$("#temperatureDifference").each(count);

		//无霜期
		$("#frostFreePeriod").attr("data-to", growthEnvironment.frostFreePeriod);
		$("#frostFreePeriod").text(growthEnvironment.frostFreePeriod);
		$("#frostFreePeriod").each(count);
		//累计降水量
		setTimeout(function() {
			$("#cumulativeRainfall").attr("data-to", growthEnvironment.precipitation);
			$("#cumulativeRainfall").text(growthEnvironment.precipitation);
			$("#cumulativeRainfall").each(count);
		}, 1000);
		//蓄冷量
		setTimeout(function() {
			$("#coolStorageCapacity").attr("data-to", growthEnvironment.coolStorageCapacity);
			$("#coolStorageCapacity").text(growthEnvironment.coolStorageCapacity);
			$("#coolStorageCapacity").each(count);
		}, 1000);
		//光照
		setTimeout(function() {
			$("#Illumination").attr("data-to", growthEnvironment.illumination);
			$("#Illumination").text(growthEnvironment.illumination);
			$("#Illumination").each(count);
		}, 1000);
		//土层厚度
		if(growthEnvironment.SoilThickness != null) {
			$("#SoilThickness").text(growthEnvironment.SoilThickness);
		} else {
			$(".page2-flash1-img1,.page2-flash1-img2").remove();
		}
		//土质类型
		if(growthEnvironment.soilType != null) {
			$("#soilType").text(growthEnvironment.soilType);
		} else {
			$(".page2-flash1-img3,.page2-flash1-img4").remove();
		}
		//有机质含量
		if(growthEnvironment.organicContent != null) {
			$("#organicContent").text(growthEnvironment.organicContent);
		} else {
			$(".page2-flash1-img5,.page2-flash1-img6").remove();
		}
		//PH
		if(growthEnvironment.valueOfPh != null) {
			$("#valueOfPh").text(growthEnvironment.valueOfPh);
		} else {
			$(".page2-flash1-img7,.page2-flash1-img8").remove();
		}
		//都没有不显示
		if(growthEnvironment.SoilThickness == null && growthEnvironment.soilType == null && growthEnvironment.organicContent == null && growthEnvironment.valueOfPh == null){
			$(".tzsj").remove();
			$("#shuju-pic .carousel-inner .item:eq(0)").addClass("active");
			if($(".carousel-inner .gz").hasClass("active")) {
				Tongji1();
			}
			if($(".carousel-inner .jsl").hasClass("active")) {
				Tongji2();
			}
			if($(".carousel-inner .sd").hasClass("active")) {
				Tongji3();
			}
			if($(".carousel-inner .wd").hasClass("active")) {
				Tongji4();
			}
		}
		
		
		
	if($(".carousel-inner .item").hasClass("active")) {
		$(".page2-flash1-img1").delay(1000).fadeIn(0, function() {
			//画线特效1
			var svg5 = new Walkway({
				selector: '#page2-line1',
				duration: 500,
				easing: 'linear'
			}).draw(function() {});
			$(this).find(".dian").find(" img").delay(600).fadeIn(500);
			$(".page2-flash1-img2").delay(1100).fadeIn(500);
		});
		$(".page2-flash1-img3").delay(2600).fadeIn(0, function() {
			//画线特效2
			var svg6 = new Walkway({
				selector: '#page2-line2',
				duration: 500,
				easing: 'linear'
			}).draw(function() {});
			$(this).find(".dian").find(" img").delay(600).fadeIn(500);
			$(".page2-flash1-img4").delay(1100).fadeIn(500);
		});
		$(".page2-flash1-img5").delay(4200).fadeIn(0, function() {
			//画线特效3
			var svg7 = new Walkway({
				selector: '#page2-line3',
				duration: 500,
				easing: 'linear'
			}).draw(function() {});
			$(this).find(".dian").find(" img").delay(600).fadeIn(500);
			$(".page2-flash1-img6").delay(1100).fadeIn(500);
		});
		$(".page2-flash1-img7").delay(5800).fadeIn(0, function() {
			//画线特效3
			var svg8 = new Walkway({
				selector: '#page2-line4',
				duration: 500,
				easing: 'linear'
			}).draw(function() {});
			$(this).find(".dian").find(" img").delay(600).fadeIn(500);
			$(".page2-flash1-img8").delay(1100).fadeIn(500);
		});

	}

	var xTimes = growthEnvironment.xTimes;
	//统计图1(生长光照)
	function Tongji1() {
		var suitable = growthEnvironment.suitablellumination;
		var actual = growthEnvironment.actualIllumination;
		if(growthEnvironment==null || growthEnvironment.floristicsType==1){
			var weather = growthEnvironment.weatherIllumination;
			$('#tj1').highcharts({
				chart: {
					marginTop: 20,
					backgroundColor: 'none'
				},
				title: {
					text: ' ',
					x: -20 //center
				},
				subtitle: {
					text: '',
					x: -20
				},
				plotOptions: {
		            series: {
		                marker: {
		                    radius: 3
		                }
		            }
		        },
				xAxis: {
					type: 'datetime',
					dateTimeLabelFormats: {
						month: '%m',
					},
					labels: {
						style: {
							fontSize: '12px',
						}
					},
					
				},
				yAxis: {
					title: {
						text: ''
					},
					plotLines: [{
						value: 0,
						width: 1,
						color: '#808080'
					}],
					labels: {
						style: {
							fontSize: '12px',
						}
					},
					minTickInterval: 50
				},
				tooltip: {
					xDateFormat: '%m',
					valueSuffix: 'lux'
				},
				series: [{
					name: '实际光照',
					data: weather,
					zIndex: 1,
					color: '#3998e5',
					marker: {
						fillColor: 'white',
						lineWidth: 2,
						lineColor: '#3998e5'
					},
					showInLegend: false,
				}, {
					name: '适宜光照',
					data: suitable,
					zIndex: 1,
					color: Highcharts.getOptions().colors[0],
					marker: {
						fillColor: 'white',
						lineWidth: 2,
						lineColor:Highcharts.getOptions().colors[0]
					},
					showInLegend: false,
				}, {
					name: '气象光照',
					data: actual,
					zIndex: 1,
					color:'#68a43e',
					marker: {
						fillColor: 'white',
						lineWidth: 2,
						lineColor: '#68a43e'
					},
					showInLegend: false,
				}]
				
			});
		}else{
			$('#tj1').highcharts({
				chart: {
					marginTop: 20,
					backgroundColor: 'none',
				},
				title: {
					text: ' ',
					x: -20 //center
				},
				subtitle: {
					text: '',
					x: -20
				},
				plotOptions: {
		            series: {
		                marker: {
		                    radius: 3
		                }
		            }
		        },
				xAxis: {
					type: 'datetime',
					dateTimeLabelFormats: {
						month: '%m',
					},
					labels: {
						style: {
							fontSize: '12px',
						}
					},
					
				},
				yAxis: {
					title: {
						text: ''
					},
					plotLines: [{
						value: 0,
						width: 1,
						color: '#808080'
					}],
					labels: {
						style: {
							fontSize: '12px',
						}
					},
					minTickInterval: 50
				},
				tooltip: {
					xDateFormat: '%m',
					valueSuffix: 'lux'
				},
				series: [{
					name: '实际光照',
					data: actual,
					zIndex: 1,
					color:'#3998e5',
					marker: {
						fillColor: 'white',
						lineWidth: 2,
						lineColor: '#3998e5'
					},
					showInLegend: false,
				}, {
					name: '适宜光照',
					data: suitable,
					zIndex: 1,
					color:Highcharts.getOptions().colors[0],
					marker: {
						fillColor: 'white',
						lineWidth: 2,
						lineColor: Highcharts.getOptions().colors[0]
					},
					showInLegend: false,
				}]
			});
		}
	}
	/*end*/
	//统计图2(生长降水量)
	function Tongji2() {
		var suitable = growthEnvironment.suitableRainfall;
		var actual = growthEnvironment.actualRainfall;

		$('#tj2').highcharts({
			chart: {
				marginTop: 20,
				backgroundColor: 'none',
				type: 'areaspline'
			},
			title: {
				text: ' ',
				x: -20 //center
			},
			subtitle: {
				text: '',
				x: -20
			},
			plotOptions: {
	            series: {
	                marker: {
	                    radius: 3
	                }
	            }
	        },
			xAxis: {
				type: 'datetime',
				dateTimeLabelFormats: {
					month: '%m',
				},
				labels: {
					style: {
						fontSize: '12px',
					}
				},
				minTickInterval: 2
			},
			yAxis: {
				title: {
					text: ''
				},
				plotLines: [{
					value: 0,
					width: 1,
					color: '#808080'
				}],
				labels: {
					style: {
						fontSize: '12px',
					}
				},
				minTickInterval: 50
			},
			tooltip: {
				xDateFormat: '%m',
				valueSuffix: 'mm'
			},
			series: [{
				name: '实际降水量',
				data: actual,
				zIndex: 1,
				color:'#3998e5',
				marker: {
					fillColor: 'white',
					lineWidth: 2,
					lineColor:'#3998e5' 
				},
				showInLegend: false,
			}, {
				name: '适宜降水量',
				data: suitable,
				zIndex: 1,
				color:Highcharts.getOptions().colors[0],
				marker: {
					fillColor: 'white',
					lineWidth: 2,
					lineColor: Highcharts.getOptions().colors[0]
				},
				showInLegend: false,
			}]

		});
	}
	/*end*/
	//统计图3(生长湿度)
	function Tongji3() {
		var suitable = growthEnvironment.suitableHumidity;
		var actual = growthEnvironment.actualHumidity;
		if(growthEnvironment==null ||  growthEnvironment.floristicsType==1){
			var weather = growthEnvironment.weatherRain;
			$('#tj3').highcharts({
				chart: {
					marginTop: 20,
					backgroundColor: 'none',
				},
				title: {
					text: ' ',
					x: -20 //center
				},
				subtitle: {
					text: '',
					x: -20
				},
				plotOptions: {
		            series: {
		                marker: {
		                    radius: 3
		                }
		            }
		        },
				xAxis: {
					type: 'datetime',
					dateTimeLabelFormats: {
						month: '%m',
					},
					labels: {
						style: {
							fontSize: '12px',
						}
					},
					minTickInterval: 2
				},
				yAxis: {
					title: {
						text: ''
					},
					plotLines: [{
						value: 0,
						width: 1,
						color: '#808080'
					}],
					labels: {
						style: {
							fontSize: '12px',
						}
					},
					minTickInterval: 50
				},
				tooltip: {
					xDateFormat: '%m',
					valueSuffix: '%'
				},
				
				series: [{
					name: '实际湿度',
					data: weather,
					zIndex: 1,
					color: '#3998e5',
					marker: {
						fillColor: 'white',
						lineWidth: 2,
						lineColor:'#3998e5' 
					},
					showInLegend: false,
				}, {
					name: '适宜湿度',
					data: suitable,
					zIndex: 1,
					color:Highcharts.getOptions().colors[0],
					marker: {
						fillColor: 'white',
						lineWidth: 2,
						lineColor:Highcharts.getOptions().colors[0]
					},
					showInLegend: false,
				}, {
					name: '气象湿度',
					data: actual,
					zIndex: 1,
					color:'#68a43e',
					marker: {
						fillColor: 'white',
						lineWidth: 2,
						lineColor: '#68a43e'
					},
					showInLegend: false,
				}]

			});
		}
	}
	/*end*/ //统计图4(生长温度)
	function Tongji4() {
		var suitable = growthEnvironment.suitableTemperature;
		var actual = growthEnvironment.actualTemperature;
		if(growthEnvironment==null || growthEnvironment.floristicsType==1){
			var weather = growthEnvironment.weatherTemp;
			$('#tj4').highcharts({
				chart: {
					marginTop: 20,
					backgroundColor: 'none',
				},
				title: {
					text: ''
				},
				plotOptions: {
		            series: {
		                marker: {
		                    radius: 3
		                }
		            }
		        },
				xAxis: {
					type: 'datetime',
					//tickPositions: xTimes,
					//tickInterval: 60 * 24 * 3600 * 1000,
					dateTimeLabelFormats: {
						month: '%m',
					},
					labels: {
						style: {
							fontSize: '12px',
						}
					},
					
				},
				
				yAxis: {
					title: {
						text: null
					},
					labels: {
						style: {
							fontSize: '12px',
						}
					},
					minTickInterval: 10
				},
				
				tooltip: {
					crosshairs: true,
					shared: true,
					xDateFormat: '%m',
					valueSuffix: '°C',
				},
				
				legend: {},
				
				series: [{
					name: '实际温度',
					data: weather,
					zIndex: 1,
					color:'#3998e5',
					marker: {
						fillColor: 'white',
						lineWidth: 2,
						lineColor:'#3998e5'
					},
					showInLegend: false,
				}, {
					name: '适宜温度',
					data: suitable,
					type: 'arearange',
					lineWidth: 0,
					linkedTo: ':previous',
					color: Highcharts.getOptions().colors[0],
					fillOpacity: 0.3,
					zIndex: 0,
					showInLegend: false,
				}, {
					name: '气象温度',
					data: actual,
					zIndex: 1,
					color:'#68a43e',
					marker: {
						fillColor: 'white',
						lineWidth: 2,
						lineColor: '#68a43e'
					},
					showInLegend: false,
				}]
				
			});
		}else{
			$('#tj4').highcharts({
				chart: {
					marginTop: 20,
					backgroundColor: 'none',
				},
				title: {
					text: ''
				},
				plotOptions: {
		            series: {
		                marker: {
		                    radius: 3
		                }
		            }
		        },
				xAxis: {
					type: 'datetime',
					//tickPositions: xTimes,
					//tickInterval: 60 * 24 * 3600 * 1000,
					dateTimeLabelFormats: {
						month: '%m',
					},
					labels: {
						style: {
							fontSize: '12px',
						}
					},
					
				},
				
				yAxis: {
					title: {
						text: null
					},
					labels: {
						style: {
							fontSize: '12px',
						}
					},
					minTickInterval: 10
				},
				
				tooltip: {
					crosshairs: true,
					shared: true,
					xDateFormat: '%m',
					valueSuffix: '°C',
				},
				
				legend: {},
				
				series: [{
					name: '实际温度',
					data: actual,
					zIndex: 1,
					color:'#3998e5',
					marker: {
						fillColor: 'white',
						lineWidth: 2,
						lineColor: '#3998e5'
					},
					showInLegend: false,
				}, {
					name: '适宜温度',
					data: suitable,
					type: 'arearange',
					lineWidth: 0,
					linkedTo: ':previous',
					color: Highcharts.getOptions().colors[0],
					fillOpacity: 0.3,
					zIndex: 0,
					showInLegend: false,
				}]
				
			});
		}
	}
	
	
	//调用统计图
	$(".rightArray").click(function() {
		$("#tj1,#tj2,#tj3,#tj4").empty();
		setTimeout(function() {
			if($(".carousel-inner .gz").hasClass("active")) {
				Tongji1();
			}
			if($(".carousel-inner .jsl").hasClass("active")) {
				Tongji2();
			}
			if($(".carousel-inner .sd").hasClass("active")) {
				Tongji3();
			}
			if($(".carousel-inner .wd").hasClass("active")) {
				Tongji4();
			}
		}, 700);
	});
	$(".leftArray").click(function() {
		$("#tj1,#tj2,#tj3,#tj4").empty();
		setTimeout(function() {
			if($(".carousel-inner .gz").hasClass("active")) {
				Tongji1();
			}
			if($(".carousel-inner .jsl").hasClass("active")) {
				Tongji2();
			}
			if($(".carousel-inner .sd").hasClass("active")) {
				Tongji3();
			}
			if($(".carousel-inner .wd").hasClass("active")) {
				Tongji4();
			}
		}, 700);
	});
});
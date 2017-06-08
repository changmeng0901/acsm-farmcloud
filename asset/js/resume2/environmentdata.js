// JavaScript Document

$(function() {
	$(".huanjingbody").height($("iframe").height());
	var data = JSON.parse(localStorage.source);
	//console.log(data);
	
	
	/*$.ajax({
		type: "POST",
		url: pathurl+'?method=resume.whole.data',
		data: {field: JSON.stringify(getName) },
		dataType: "jsonp",
		success: function(data) {*/
			if(data.invoke_result == "INVOKE_SUCCESS") {
				Highcharts.setOptions({
			        global: {
			            useUTC: false
			        }
			    });
				//console.log(data.data.growthEnvironment.fingerprintShow+'---');
				//判断单年生
				
				if(data.data.welcome.floristicsType==2){
					$(".qixiang").remove();
				}
				//环境指纹
				if(data.data.growthEnvironment.fingerprintShow == "1") {
					//环境数据
					$('#shuju-pic').carousel({
						interval: false
					});
					//专家解读
					if(data.data.fingerprint.interpretationShow == "1") {
						$("#page_music").attr("src", data.data.fingerprint.voiceUrl);
					} else {
						$(".page2-talk,#page_music").remove();
					}
					//
					if(data.data.fingerprint.suitableHumidity==undefined && data.data.fingerprint.actualHumidity==undefined){
						$(".sd").remove();
					}
					if(data.data.fingerprint.actualRainfall==undefined && data.data.fingerprint.suitableRainfall==undefined){
						$(".jsl").remove();
					}
					//都没有数据
					if(data.data.fingerprint.actualTemperature==undefined && data.data.fingerprint.suitableTemperature==undefined && data.data.fingerprint.actualRainfall==undefined && data.data.fingerprint.suitableRainfall==undefined && data.data.fingerprint.actualIllumination==undefined && data.data.fingerprint.suitablellumination==undefined && data.data.fingerprint.SoilThickness == null && data.data.fingerprint.soilType == null && data.data.fingerprint.organicContent == null && data.data.fingerprint.valueOfPh == null){
						$("#shuju-pic").empty();
						$("#shuju-pic").css("background","url(/asset/images/resume2/hjnopic.png) no-repeat center");
					}
					
					//总积温
					$("#sumOfHeat").attr("data-to", data.data.fingerprint.accumulatedTemperature);
					$("#sumOfHeat").text(data.data.fingerprint.accumulatedTemperature);
					$("#sumOfHeat").each(count);
					//日夜温差
					$("#temperatureDifference").attr("data-to", data.data.fingerprint.temperatureDifference);
					$("#temperatureDifference").text(data.data.fingerprint.temperatureDifference);
					$("#temperatureDifference").each(count);

					//无霜期
					$("#frostFreePeriod").attr("data-to", data.data.fingerprint.frostFreePeriod);
					$("#frostFreePeriod").text(data.data.fingerprint.frostFreePeriod);
					$("#frostFreePeriod").each(count);
					//累计降水量
					setTimeout(function() {
						$("#cumulativeRainfall").attr("data-to", data.data.fingerprint.precipitation);
						$("#cumulativeRainfall").text(data.data.fingerprint.precipitation);
						$("#cumulativeRainfall").each(count);
					}, 1000);
					//蓄冷量
					setTimeout(function() {
						$("#coolStorageCapacity").attr("data-to", data.data.fingerprint.coolStorageCapacity);
						$("#coolStorageCapacity").text(data.data.fingerprint.coolStorageCapacity);
						$("#coolStorageCapacity").each(count);
					}, 1000);
					//光照
					setTimeout(function() {
						$("#Illumination").attr("data-to", data.data.fingerprint.illumination);
						$("#Illumination").text(data.data.fingerprint.illumination);
						$("#Illumination").each(count);
					}, 1000);
					//土层厚度
					if(data.data.fingerprint.SoilThickness != null) {
						$("#SoilThickness").text(data.data.fingerprint.SoilThickness);
					} else {
						$(".page2-flash1-img1,.page2-flash1-img2").remove();
					}
					//土质类型
					if(data.data.fingerprint.soilType != null) {
						$("#soilType").text(data.data.fingerprint.soilType);
					} else {
						$(".page2-flash1-img3,.page2-flash1-img4").remove();
					}
					//有机质含量
					if(data.data.fingerprint.organicContent != null) {
						$("#organicContent").text(data.data.fingerprint.organicContent);
					} else {
						$(".page2-flash1-img5,.page2-flash1-img6").remove();
					}
					//PH
					if(data.data.fingerprint.valueOfPh != null) {
						$("#valueOfPh").text(data.data.fingerprint.valueOfPh);
					} else {
						$(".page2-flash1-img7,.page2-flash1-img8").remove();
					}
					//都没有不显示
					if(data.data.fingerprint.SoilThickness == null && data.data.fingerprint.soilType == null && data.data.fingerprint.organicContent == null && data.data.fingerprint.valueOfPh == null){
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
				} else {
					$(".page2-more,.page2-second").remove();
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
				
//				Highcharts.setOptions({
//			        global: {
//			            useUTC: false
//			        }
//				});

				var xTimes = data.data.fingerprint.xTimes;
				//统计图1(生长光照)
				function Tongji1() {
					var suitable = data.data.fingerprint.suitablellumination;
					var actual = data.data.fingerprint.actualIllumination;
					
					if(data.data.welcome.floristicsType==1){
						var weather = data.data.fingerprint.weatherllumination;
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
										fontSize: '20px',
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
										fontSize: '20px',
									}
								},
								tickAmount: 4
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
										fontSize: '20px',
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
										fontSize: '20px',
									}
								},
								tickAmount: 4
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
					var suitable = data.data.fingerprint.suitableRainfall;
					var actual = data.data.fingerprint.actualRainfall;

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

						xAxis: {
							type: 'datetime',
							dateTimeLabelFormats: {
								month: '%m',
							},
							labels: {
								style: {
									fontSize: '20px',
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
									fontSize: '20px',
								}
							},
							minTickInterval: 50
						},
						tooltip: {
							valueSuffix: '°C'
						},
						series: [{
							name: '适宜降水量',
							data: suitable,
							showInLegend: false,
							fillColor: {
								linearGradient: [0, 0, 0, 350],
								stops: [
									[0, 'rgba(124, 190, 79,0.7)'],
									[1, 'rgba(255, 255, 255,0.7)']
								]
							}
						}, {
							name: '实际降水量',
							data: actual,
							showInLegend: false,
							fillColor: {
								linearGradient: [0, 0, 0, 350],
								stops: [
									[0, 'rgba(37, 181, 246,0.7)'],
									[1, 'rgba(255, 255, 255,0.7)']
								]
							}
						}],
						colors: "#7cbe4f,#2bb0ed".split(","),

					});
				}
				/*end*/
				//统计图3(生长湿度)
				function Tongji3() {
					var suitable = data.data.fingerprint.suitableHumidity;
					var actual = data.data.fingerprint.actualHumidity;
					
					if(data.data.welcome.floristicsType==1){
						var weather = data.data.fingerprint.weatherRain;
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
										fontSize: '20px',
									}
								}
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
										fontSize: '20px',
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
					var suitable = data.data.fingerprint.suitableTemperature;
					var actual = data.data.fingerprint.actualTemperature;

					if(data.data.welcome.floristicsType==1){
						var weather = data.data.fingerprint.weatherTemp;
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
										fontSize: '20px',
									}
								},
								
							},
							
							yAxis: {
								title: {
									text: null
								},
								labels: {
									style: {
										fontSize: '20px',
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
										fontSize: '20px',
									}
								},
								
							},
							
							yAxis: {
								title: {
									text: null
								},
								labels: {
									style: {
										fontSize: '20px',
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
			}
		/*},
		error: function(err) {
			alert("请求失败！");
		}
	});*/

});
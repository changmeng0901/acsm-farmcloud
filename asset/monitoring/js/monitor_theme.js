//折线图

Highcharts.theme = {
	/*colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],*/
	chart: {
		/*backgroundColor: {
			linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
			stops: [
				[0, 'rgb(255, 255, 255)'],
				[1, 'rgb(255, 255, 255)']
			]
		},*/
		//borderWidth: 2,
		backgroundColor: 'rgba(255, 255, 255, 0)',
        plotShadow: false
		//plotBorderWidth: 1
	},
	 tooltip: {
         style: {
             fontWeight: 'bold',
             fontSize:'11px',
             fontFamily: 'Trebuchet MS, Verdana, sans-serif'
         }
     }, 
	/*title: {
		style: {
			color: '#000',
			font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
		}
	},
	subtitle: {
		style: {
			color: '#666666',
			font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
		}
	},*/
	xAxis: {
		lineColor: '#FFFFFF',
		labels: {
			style: {
				color: '#FFFFFF',
				font: '11px Trebuchet MS, Verdana, sans-serif'
			}
		}, 
		title: {
			style: {
				color: '#FFFFFF',
				fontWeight: 'bold',
				fontSize: '11px',
				fontFamily: 'Trebuchet MS, Verdana, sans-serif'

			}
		}
	},
	yAxis: {
		//minorTickInterval: 'auto',
		labels: {
			style: {
				color: '#FFFFFF',
				font: '11px Trebuchet MS, Verdana, sans-serif'
			}
		},
		title: {
			style: {
				color: '#FFFFFF',
				fontWeight: 'bold',
				fontSize: '11px',
				fontFamily: 'Trebuchet MS, Verdana, sans-serif'
			}
		}
	},
	legend: {
		itemStyle: {
			font: '9pt Trebuchet MS, Verdana, sans-serif',
			color: '#FFFFFF'

		},
		itemHoverStyle: {
			color: '#FFFFFF'
		},
		itemHiddenStyle: {
			color: '#FFFFFF'
		}
	},
	/*labels: {
		style: {
			color: '#99b'
		}
	},
	navigation: {
		buttonOptions: {
			theme: {
				stroke: '#CCCCCC'
			}
		}
	}*/
};
var highchartsOptions = Highcharts.setOptions(Highcharts.theme);

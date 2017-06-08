// JavaScript Document
var jsonstr = {
	"invoke_result": "invoke_success",
	"bottom": {
		"commentShow": 1,
		"commentNumber": "36",
		"thumbsUpShow": 1,
		"thumbsUpNumber": 77,
		"purchaseShow": "0",
		"purchaseSelected": "null",
		"purchaseContent": "null"
	},
	"welcome": {
		"logoImg": "http://192.168.21.157:8020/lvli2/images/logo.png",
		"basePositionShow": "1",
		"basePosition": "北京-北京-北京",
		"plantStandardShow": 1,
		"plantStandard": "有机",
		"plantTimeShow": "1",
		//"plantTime": "12月10日",
		"plantTimeMonth": "12",
		"plantTimeDay": "12",
		"recoveryTimeShow": "1",
		//"recoveryTime": "10月10日",
		"recoveryTimeMonth": "11",
		"recoveryTimeDay": "11",
		"maturityShow": "1",
		"maturity": "80%",
		"cropName": "苹果",
		"baseName": "北菜园",
		"tunnelName": "A区——1112棚",
		"plantImg": "http://192.168.21.157:8020/lvli2/images/page1-4.png",
		"productIntroductionShow": "1",
		"productIntroduction": "番茄(tomato)别名西红柿、洋柿子，古名六月柿、喜报三元。果实营养丰富，具特殊风味。可以生食、煮食、加工制成番茄酱、汁或整果罐藏。番茄是全世界栽培最为普遍的果菜之一。 西红柿酸甜可口、营养丰富。维生素C含量极高，同时还含有蛋白质、脂肪、碳水化合物、粗纤维、钾、钠、钙、镁、磷、铁、胡萝卜素等营养成分。并且还含有特殊的番茄红素。"
	},
	"growthEnvironment": {
		"resourcePlanningShow": "1",
		"resourcePlanningImg": "http://192.168.21.157:8020/lvli2/images/page3-1.png",
		"krpanosShow": "1",
		"krpanosId": "218",
		"krpanosImg": "http://192.168.21.157:8020/lvli2/images/page3-2.png,http://192.168.21.157:8020/lvli2/images/page3-1.png,http://192.168.21.157:8020/lvli2/images/page3-2.png",
		"farmRealShow": "1",
		"farmRealImg": "http://192.168.21.157:8020/lvli2/images/page3-1.png",
		"meteorologicalShow": "1",
		"Illumination": "14",
		"temperatureDifference": "11",
		"precipitation": "801",
		"accumulatedTemperature": "0-11",
		"environmentalFeature": "这里光照充足，土地肥沃，为每一颗菜苗的茁壮成长提供了得天独厚的自然条件1。",
		"fingerprintShow": "1",
		"baseCoordinate": "1.123,2.234"
	},
	"growthProcess": {
		"farmingShow": "1",
		/*"farmingCycle": [{
				"cycleName": "幼苗期",
				"cycleBeginTime": "2016-01-01",
				"cycleEndTime": "2016-02-01"
			},
			{
				"cycleName": "生长期",
				"cycleBeginTime": "2016-02-02",
				"cycleEndTime": "2016-03-01"
			}
		],*/
		"farmingInformation": [{
				"outerOperationTime": "2016年 4月5日",
				"operatingtime": "2016-4-5 12:12",
				"farmingImgs": ["http://192.168.21.157:8020/lvli2/images/page4-1.png", "http://192.168.21.157:8020/lvli2/images/page4-1.png", "http://192.168.21.157:8020/lvli2/images/page4-1.png", "http://192.168.21.157:8020/lvli2/images/page4-2.png"],
				"farmingContent": "施肥",
				"farmingOperator": "张三",
				"farmingWorkingHours": "2",
				"farmingCost": "500",
				"farmingTemperature": "20",
				"farmingHumidity": "20",
				"farmingRemarks": "这是备注11111",
				"cycleName": "幼苗期",
				"InputsInfo": [{
						"inputsType": "农药1",
						"inputsName": "药名1",
						"inputsUsage": "10"
					},
					{
						"inputsType": "农药2",
						"inputsName": "药名2",
						"inputsUsage": "10"
					}
				]
			},
			{
				"outerOperationTime": "2016年 5月5日",
				"operatingtime": "2016-4-5 12:12",
				"farmingImgs": ["http://192.168.21.157:8020/lvli2/images/page4-2.png", "http://192.168.21.157:8020/lvli2/images/page4-2.png", "http://192.168.21.157:8020/lvli2/images/page4-2.png"],
				"farmingContent": "浇水",
				"farmingOperator": "李四",
				"farmingWorkingHours": "2",
				"farmingCost": "500",
				"farmingTemperature": "20",
				"farmingHumidity": "20",
				"farmingRemarks": "这是备注222222",
				"cycleName": "生长期",
				"InputsInfo": [{
						"inputsType": "农药1",
						"inputsName": "药名1",
						"inputsUsage": "10"
					},
					{
						"inputsType": "农药2",
						"inputsName": "药名2",
						"inputsUsage": "10"
					}
				]
			},
			{
				"outerOperationTime": "2016年 5月29日",
				"operatingtime": "2016-4-5 12:12",
				"farmingImgs": ["http://192.168.21.157:8020/lvli2/images/page4-2.png", "http://192.168.21.157:8020/lvli2/images/page4-2.png", "http://192.168.21.157:8020/lvli2/images/page4-2.png"],
				"farmingContent": "除虫",
				"farmingOperator": "王五",
				"farmingWorkingHours": "2",
				"farmingCost": "500",
				"farmingTemperature": "20",
				"farmingHumidity": "20",
				"farmingRemarks": "这是备注3333",
				"cycleName": "花果期",
				"InputsInfo": [{
						"inputsType": "农药3",
						"inputsName": "药名3",
						"inputsUsage": "10"
					},
					{
						"inputsType": "农药3",
						"inputsName": "药名3",
						"inputsUsage": "10"
					}
				]
			},
			{
				"outerOperationTime": "2016年 6月15日",
				"operatingtime": "2016-4-5 12:12",
				"farmingImgs": ["http://192.168.21.157:8020/lvli2/images/page4-2.png", "http://192.168.21.157:8020/lvli2/images/page4-2.png", "http://192.168.21.157:8020/lvli2/images/page4-2.png"],
				"farmingContent": "清除病残叶",
				"farmingOperator": "王五",
				"farmingWorkingHours": "2",
				"farmingCost": "500",
				"farmingTemperature": "20",
				"farmingHumidity": "20",
				"farmingRemarks": "这是备注4444",
				"cycleName": "成熟期",
				"InputsInfo": [{
						"inputsType": "农药3",
						"inputsName": "药名3",
						"inputsUsage": "10"
					},
					{
						"inputsType": "农药3",
						"inputsName": "药名3",
						"inputsUsage": "10"
					}
				]
			}
		],
		"growthPeriodShow": "1",
		"growthPeriod": "null",
		"realTimeVideoShow": "1",
		"realTimeVideo": {
			"videoUrl": "http://cs4.nongchangyun.cn:81/video/2359/1195/playlist.m3u8",
			"tunnelInfoName": "1号棚",
			"plantName": "西红柿"
		},
		"realityShow": "1",
		"realityVideo": {
			"videoUrl": [{
					"url": "http://192.168.21.157:8020/lvli2/images/1.jpg",
					"shotTime": "2012-01-01 12:12"
				},
				{
					"url": "http://192.168.21.157:8020/lvli2/images/2.jpg",
					"shotTime": "2012-01-01 12:13"
				},
				{
					"url": "http://192.168.21.157:8020/lvli2/images/3.jpg",
					"shotTime": "2012-01-01 12:14"
				},
				{
					"url": "http://192.168.21.157:8020/lvli2/images/4.jpg",
					"shotTime": "2012-01-01 12:15"
				},
				{
					"url": "http://192.168.21.157:8020/lvli2/images/1.jpg",
					"shotTime": "2012-01-01 12:12"
				},
				{
					"url": "http://192.168.21.157:8020/lvli2/images/2.jpg",
					"shotTime": "2012-01-01 12:13"
				},
				{
					"url": "http://192.168.21.157:8020/lvli2/images/3.jpg",
					"shotTime": "2012-01-01 12:14"
				},
				{
					"url": "http://192.168.21.157:8020/lvli2/images/4.jpg",
					"shotTime": "2012-01-01 12:15"
				},
				{
					"url": "http://192.168.21.157:8020/lvli2/images/1.jpg",
					"shotTime": "2012-01-01 12:12"
				},
				{
					"url": "http://192.168.21.157:8020/lvli2/images/2.jpg",
					"shotTime": "2012-01-01 12:13"
				},
				{
					"url": "http://192.168.21.157:8020/lvli2/images/3.jpg",
					"shotTime": "2012-01-01 12:14"
				},
				{
					"url": "http://192.168.21.157:8020/lvli2/images/4.jpg",
					"shotTime": "2012-01-01 12:15"
				},
				{
					"url": "http://192.168.21.157:8020/lvli2/images/1.jpg",
					"shotTime": "2012-01-01 12:12"
				},
				{
					"url": "http://192.168.21.157:8020/lvli2/images/2.jpg",
					"shotTime": "2012-01-01 12:13"
				},
				{
					"url": "http://192.168.21.157:8020/lvli2/images/3.jpg",
					"shotTime": "2012-01-01 12:14"
				},
				{
					"url": "http://192.168.21.157:8020/lvli2/images/4.jpg",
					"shotTime": "2012-01-01 12:15"
				},
				{
					"url": "http://192.168.21.157:8020/lvli2/images/1.jpg",
					"shotTime": "2012-01-01 12:12"
				},
				{
					"url": "http://192.168.21.157:8020/lvli2/images/2.jpg",
					"shotTime": "2012-01-01 12:13"
				},
				{
					"url": "http://192.168.21.157:8020/lvli2/images/3.jpg",
					"shotTime": "2012-01-01 12:14"
				},
				{
					"url": "http://192.168.21.157:8020/lvli2/images/4.jpg",
					"shotTime": "2012-01-01 12:15"
				}
			],
			/*"videoUrl": "http：//xxxx",
			"shotTime":"2016-03-12 20:23",
			"imgNumbers":"11",*/
			"tunnelInfoName": "1号棚",
			"plantName": "西红柿"
		},
		"videoTracingShow": "1",
		"videoTracing": {
			"videoUrl": "http://cs4.nongchangyun.cn:81/video/plant/1744/25175/34015/playlist.m3u8",
			"tunnelInfoName": "1号棚",
			"playNumbers": "16",
			"shootLength": "2.564",
			"plantName": "西红柿"
		},
		"environmentalFeature": "环境好"
	},
	"introduction": {
		"farmIntroduction": "京合农品为富强农业种植开发有限公司旗下农场。公司在长期的生产经营中，为追求优秀的产品质量，生产销售全流程检测追踪，让消费者放心11。",
		"farmVideosShow": "1",
		"farmVideo": "http://cs4.nongchangyun.cn:81/video/plant/1744/25175/34015/playlist.m3u8",
		"digitalCardShow": 1,
		"digitalCardId": "1",
		"certificateShow": "1",
		"certificate": ["http://192.168.21.157:8020/lvli2/images/6.jpg", "http://192.168.21.157:8020/lvli2/images/6.jpg", "http://192.168.21.157:8020/lvli2/images/6.jpg"],
		"farmingMasterShow": "1",
		"farmingMaster": {
			"name": "农场主",
			"imgUrl": "http://192.168.21.157:8020/lvli2/images/4.jpg",
		},
		"farmingGrowerShow": "1",
		"farmingGrower": {
			"name": "种植者",
			"imgUrl": "http://192.168.21.157:8020/lvli2/images/5.jpg",
		},
		"redPackShow": "1",
		"redPackId": "null",
	},
	"fingerprint": {
		"interpretationShow": "1",
		"voiceUrl": "http://192.168.21.157:8020/lvli2/images/bg.mp3",
		"sumOfHeat": "4200",
		"temperatureDifference": "20",
		"frostFreePeriod": "180",
		"cumulativeRainfall": 680,
		"coolStorageCapacity": "3260",
		"Illumination": "200",
		"soilType": "沙壤土1",
		"SoilThickness": "20",
		"organicContent": "20",
		"valueOfPh": "20",
		"xTimes": [1477929600000, 1480521600000, 1483200000000, 1485878400000],
		"actualTemperature": [
			[12464064000, 21.5],
			[12464928000, 22.1],
			[12465792000, 23],
			[12466656000, 23.8],
			[12467520000, 21.4]
		],
		"suitableTemperature": [
			[12464064000, 14.3, 27.7],
			[12464928000, 14.5, 27.8],
			[12465792000, 15.5, 29.6],
			[12466656000, 16.7, 30.7],
			[12467520000, 16.5, 25.0]
		],
		"actualHumidity": [
			[124640640000, 70],
			[124666560000, 10]
		],
		"suitableHumidity": [
			[124640640000, 40],
			[124666560000, 25]
		],
		"actualRainfall": [
			[124640640000, 50],
			[124666560000, 30]
		],
		"suitableRainfall": [
			[124640640000, 70],
			[124666560000, 5]
		],
		"actualIllumination": [
			[124640640000, 50],
			[124666560000, 15]
		],
		"suitablellumination": [
			[124640640000, 70],
			[124666560000, 8]
		]
	},
	"allComment": {
		"page": "2",
		"allList": [{
				"commentContent": "1asdas",
				"commentTime": "12-12 12:12",
				"levelStar": "1"
			},
			{
				"commentContent": "这家西红柿真的很好吃、很好吃，买了点种 子，希望能种出来",
				"commentTime": "12-12 12:13",
				"levelStar": "2"
			},
			{
				"commentContent": "11234",
				"commentTime": "12-12 12:14",
				"levelStar": "3"
			},
			{
				"commentContent": "11235",
				"commentTime": "12-12 12:15",
				"levelStar": "3"
			},
			{
				"commentContent": "11236",
				"commentTime": "12-12 12:16",
				"levelStar": "5"
			},
			{
				"commentContent": "1asdas",
				"commentTime": "12-12 12:12",
				"levelStar": "1"
			},
			{
				"commentContent": "这家西红柿真的很好吃、很好吃，买了点种 子，希望能种出来",
				"commentTime": "12-12 12:13",
				"levelStar": "2"
			},
			{
				"commentContent": "11234",
				"commentTime": "12-12 12:14",
				"levelStar": "3"
			},
			{
				"commentContent": "11235",
				"commentTime": "12-12 12:15",
				"levelStar": "3"
			},
			{
				"commentContent": "11236最后了",
				"commentTime": "12-12 12:16",
				"levelStar": "5"
			},
		]
	}

}
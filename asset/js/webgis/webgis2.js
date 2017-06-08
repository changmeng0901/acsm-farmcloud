$(function() {
	$('div.split-pane').css("width",document.body.clientWidth-77);
	$("#left-component").css({"width":document.body.clientWidth-77,"min-width":document.body.clientWidth-77-368});
	$('div.split-pane').splitPane();
	$('button:first').on('click', function() {
		$('div.split-pane').splitPane('lastComponentSize', 150);
	});
	$('button:last').on('click', function() {
		$('div.split-pane').splitPane('firstComponentSize', 368);
	});
	
	var splitbuttonV ="<div style='cursor: pointer;' class='splitbuttonV' unselectable='on' onclick='changeRPane(this)'></div>";
	$("#my-divider").append(splitbuttonV); 	
	
	var mapOptions = {
		center : new google.maps.LatLng(39.883779, 116.66844300000002),
		zoom : 15,
		mapTypeId : google.maps.MapTypeId.SATELLITE,
		streetViewControl : false,
		disableDoubleClickZoom : true,
		panControl : true,
		zoomControl : true,
		panControlOptions : {
			position : google.maps.ControlPosition.LEFT_CENTER
		},
		zoomControlOptions : {
			position : google.maps.ControlPosition.LEFT_CENTER
		},
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	var mapOptions = {
		center : new google.maps.LatLng(39.883779, 116.66844300000002),
		zoom : 15,
		mapTypeId : google.maps.MapTypeId.SATELLITE,
		streetViewControl : false,
		disableDoubleClickZoom : true,
		panControl : true,
		zoomControl : true,
		panControlOptions : {
			position : google.maps.ControlPosition.LEFT_CENTER
		},
		zoomControlOptions : {
			position : google.maps.ControlPosition.LEFT_CENTER
		},
	};
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

});
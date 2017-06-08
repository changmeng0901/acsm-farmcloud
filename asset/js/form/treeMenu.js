$(document).ready(function(){



$(".l2l2").toggle(function(){
	$(".sslist").animate({height: 'toggle', opacity: 'hide'}, "slow");
	$(this).next(".sslist").animate({height: 'toggle', opacity: 'toggle'}, "slow");
},function(){
	$(".sslist").animate({height: 'toggle', opacity: 'hide'}, "slow");
	if($(this).hasClass("ons")){
$(this).next(".sslist").animate({height: 'toggle', opacity: 'toggle'}, "slow");
	}
});
//==============================
$(".l2l2").click(function(){
	if($(this).hasClass("ons")){
		$(".l2l2").attr("class","l2l2 ons");
		$(this).removeClass("ons");
	}else{
		$(".l2l2").attr("class","l2l2 ons");
	}

});
//==============================
$(".l3").click(function(){
$(".l3").removeClass("currentl3");
$(this).addClass("currentl3");
});
$(".close").toggle(function(){
$(".slist").animate({height: 'toggle', opacity: 'hide'}, "fast");
$(".sslist").animate({height: 'toggle', opacity: 'hide'}, "fast");
},function(){
$(".slist").animate({height: 'toggle', opacity: 'show'}, "fast");
$(".sslist").animate({height: 'toggle', opacity: 'show'}, "fast");
});
});

function treeChange(numParam){
	if(numParam == "1"){
		window.location.href = "/help/help.seam";
	}else if(numParam == "2"){
		window.location.href = "/help/helpFunction.seam";
	}
	else if(numParam == "3"){
		window.location.href = "/help/workHelp.seam";
	}
	else if(numParam == "4"){
		window.location.href = "/help/orderHelp.seam";
	}
	else if(numParam == "5"){
		window.location.href = "/help/plantHelp.seam";
	}
	else if(numParam == "7"){
		window.location.href = "/help/packingHelp.seam";
	}
	else if(numParam == "8"){
		window.location.href = "/help/stockHelp.seam";
	}else if(numParam == "9"){
		window.location.href = "/help/loadingHelp.seam";
	}
}


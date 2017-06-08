// by zhz
function gritterShow(num,ctx){
		
		console.log(jQuery.fn.jquery)
			$ = jQuery.noConflict();
			$(function() {
				$.gritter.add({
					title:	'收到新的消息',
					text:	"您有" + num + "条未读消息。" + '<a style="color:#333; margin-left:10px; font-weight:bold;" href = "message/ReceiptList.seam">点击进入</a>',
					image: 	ctx + '/asset/images/envelope.png',
					sticky: false,
					time: 4000
				});
			});
	}



function realPlantShow(num,ctx){
		jquery(function() {
			jquery.gritter.add({
				image: 	ctx + '/asset/images/lb.png',
				text:	"您有" + num + "项计划种植需要审核。" + '<a style="color:#333; margin-left:10px; font-weight:bold;" href = "/archive/PlantInfoList.seam">查看</a>',
				sticky: false,
				class_name:'coding123',
				time: 4000
			});
		});
}
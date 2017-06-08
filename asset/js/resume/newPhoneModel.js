var oldRealPlantId="";//选择的作物
var oldLogoImg="";//上一张Logo图片
var oldPlantImg="";//上一张作物图片
var oldproductIntroduction="";//上一次的菜谱
var oldFarmingIdStr="";//选中显示的农事记录
var oldFarmingPushStr="";//农事推送勾选
var oldFarmingBeginTime="";//选中显示的农事周期开始时间
var oldFarmingEndTime="";//选中显示的农事周期结束时间
var oldMyBuySelect=1;//我要购买 1一键购买 2地址
var oldMyBuyValue="";//我要购买
var oldmapImg="";//资源规划
var oldKrpanosId="";//四季田景Id
var oldEnvironmental="";//环境特色
var oldPhoneModelVoiceId="";//专家解读
var oldGrowthPeriod;//生育期
var oldFarmIntroduction="";//农场介绍
var oldDigitalCardId="";//数字名片
var oldRedPackId="";//分享红包
var oldRedPackName="";//分享名字
var oldRedPackContent="";//分享内容
var oldFarmVideoSelected="";//农场视频 1基地视频 2企业视频
var oldFarmVideoEnterprise="";//企业视频
var oldFarmVideoBase="";//基地视频
var oldCertificateStr="";//资质证书
var plantnums=0;//选过几次作物


jQuery(function(){
	jQuery('#cp').load('/resume2/productinfo.html .page1-three-wrap-des');
	/* 搜索 */
	if(jQuery('#search\\:searchParam').val()!=""){
		jQuery('#searchName').val(jQuery('#search\\:searchParam').val());
	}
	jQuery('#searchName').bind('keypress',function(event){  
		if(event.keyCode == "13"){  
			if(jQuery('#searchName').val()!="请输入作物名称搜索"){
				leftPlant(jQuery('#searchName').val());
				/* jQuery('#search\\:searchParam').val(jQuery('#searchName').val());
				window.location.href="/resume/NewPhoneModelInfoList.seam?searchParam="+jQuery('#searchName').val(); */
				//jQuery('.searchData').click();
			}
        }  
    });
	

	jQuery('.siteSeleBd li').each(function(){
		jQuery(this).find('a').attr('href',jQuery(this).find('a').attr('href').replace('npmiId','npmiids'));
		jQuery(this).find('a').attr('href',jQuery(this).find('a').attr('href').replace('addResume','addResumes'));
	})
	if(npId==null || npId==""){
		/* 删除是否显示 */
		jQuery('.delVerification').css('display','none');
	}else{
		/* 左侧被选中履历 */
		jQuery('.pano_second li').removeClass('sed_cur');
		jQuery('.num'+npId).addClass('sed_cur');

		/* 分享链接 */
		jQuery(".codeImage img").attr("src","/GenerateCodeImage?productId="+jQuery('.num'+npId).attr("prid")+"&type=8");
		var domainUrl=domainNameUrl;
		jQuery(".fxUrl").val(domainUrl+"/resume2/index.html?productId="+jQuery('.num'+npId).attr("prid"));
		jQuery('.collapse_btn').click();
	}

	
	/* 初始勾选的选项 */
	jQuery("input[itembb]").each(function(){
		if(jQuery(this).attr('itembb')=="checked"){
			jQuery(this).parent().iCheck("check");
		}
	});

	/* 作物名称 */
	if(jQuery('#save\\:cropName').val()!=null && jQuery('#save\\:cropName').val()!=""){
		jQuery('.lvli-info .form-control').eq(0).val(jQuery('#save\\:cropName').val());
	}

	/* 默认选择的作物 */
	oldRealPlantId=jQuery('#save\\:realPlantId').val();
	if(oldRealPlantId==null || oldRealPlantId==""){
		oldRealPlantId=jQuery('.plantChange option').eq(1).val();
	}
	jQuery('.plantChange').selectpicker('val',oldRealPlantId);
	if(jQuery('[value='+jQuery('.plantChange').val()+']').attr('f_type')==2){
		if(jQuery('#save\\:cycleBeginTime').val()==null || jQuery('#save\\:cycleBeginTime').val()==""){
			jQuery('.plantClass .selectpicker ').selectpicker('val',jQuery('.plantClass .selectpicker option').eq(0).val());
		}else{
			jQuery('.plantClass .selectpicker ').selectpicker('val',jQuery('#save\\:cycleBeginTime').val()+"--"+jQuery('#save\\:cycleEndTime').val());
		}
	}
	/* 默认选择的作物图片 */
	if(jQuery('[value='+jQuery('.plantChange').val()+']').attr('plantimg')!=null && jQuery('[value='+jQuery('.plantChange').val()+']').attr('plantimg')!=""){
		oldPlantImg=jQuery('[value='+jQuery('.plantChange').val()+']').attr('plantimg')+"@137w_137h%7C137-1ci.png";
	}else{
		oldPlantImg="../asset/images/851.jpg";
	}
	jQuery('.selectPlantName').val(jQuery('[value='+jQuery('.plantChange').val()+']').text());
	jQuery('.selectPlant').click();
	if(jQuery('#save\\:realPlantImg').val()!=null && jQuery('#save\\:realPlantImg').val()!=""){
		oldPlantImg=jQuery('#save\\:realPlantImg').val();
	}
	
	jQuery('.right-con1-left img').attr('src',oldPlantImg);
	jQuery('.panal-wrap .mr-bo').eq(2).find('.share-wrap img').attr('src',oldPlantImg);
	
	/* 企业默认LOGO图 */
	if(jQuery('#save\\:logoImgId').val()!=null && jQuery('#save\\:logoImgId').val() !=""){
		oldLogoImg=jQuery('#save\\:logoImgId').val()+"@150w_150h_2e_1o";
	}else{
		oldLogoImg="/asset/images/dpadd.jpg";
	}


	/* 我要购买 */
	if(jQuery('#save\\:purchaseSelectedId').val()!=null && jQuery('#save\\:purchaseSelectedId').val()!=""){
		oldMyBuySelect=jQuery('#save\\:purchaseSelectedId').val();
		jQuery('#wygmModal .iCheck').eq(oldMyBuySelect-1).iCheck("check");
		if(oldMyBuySelect==1){
			jQuery('#wygmModal .myval').eq(0).selectpicker('val',oldMyBuyValue);
			jQuery('#wygmModal .redbag-width').val("");
			jQuery('#wygmModal .overin div .mr10').text("选择商品");
		}else{
			jQuery('#wygmModal .myval').eq(0).selectpicker('val',jQuery('#wygmModal option').eq(0).val());
			jQuery('#wygmModal .redbag-width').val(oldMyBuyValue);
			jQuery('#wygmModal .overin div .mr10').text("输入网址");
		}
	}
	if(jQuery('#save\\:purchaseContentId').val()=="" || jQuery('#save\\:purchaseContentId').val()==null){
		if(jQuery('#wygmModal .myval option').length>0){
			oldMyBuyValue=jQuery('#wygmModal .myval option').eq(0).val();
		}
	}else{
		oldMyBuyValue=jQuery('#save\\:purchaseContentId').val();
	}
	
	/* 资源规划图 */
	if(jQuery('#save\\:resourcePlanningImgId').val()!=null && jQuery('#save\\:resourcePlanningImgId').val() !=""){
		oldmapImg=jQuery('#save\\:resourcePlanningImgId').val()+"@150w_150h_2e_1o";
	}else{
		oldmapImg="/asset/images/dpadd.jpg";
	}
	
	/* 四家田景Id */
	
	if(jQuery('#save\\:krpanosId').val()=="" || jQuery('#save\\:krpanosId').val()==null){
		if(jQuery('#sjtjModal  .myval option').length>0){
			oldKrpanosId=jQuery('#sjtjModal  .myval option').eq(0).val();
		}
	}else{
		oldKrpanosId=jQuery('#save\\:krpanosId').val();
	}
	
	/* 环境特色 */
	oldEnvironmental=jQuery('#save\\:environmentalId').val();

	/* 专家解读 */
	oldPhoneModelVoiceId=jQuery('#save\\:phoneModelVoiceId').val();
	jQuery('#zjjdModal li').removeAttr('class');
	if(oldPhoneModelVoiceId!=null && oldPhoneModelVoiceId!=""){
		jQuery('#zjjdModal #'+oldPhoneModelVoiceId).parent().attr('class','cur');
		jQuery('#zjjdModal .fr').eq(0).text(jQuery('#zjjdModal #'+oldPhoneModelVoiceId).text());
	}else{
		if(jQuery('#zjjdModal li').length>0){
			jQuery('#zjjdModal li').eq(0).attr('class','cur');
			jQuery('#zjjdModal .fr').eq(0).text(jQuery('#zjjdModal .cur span').eq(0).text());
			oldPhoneModelVoiceId=jQuery('#zjjdModal li').eq(0).find('span').eq(0).attr('id');
		}
	}
	
	
	//音乐播放

	/* 农事展示 */
	if(jQuery("#save\\:farmingBeginTime").val()!=null && jQuery("#save\\:farmingBeginTime").val()!=""){
		//oldFarmingBeginTime=jQuery("#save\\:farmingBeginTime").val();//选中显示的农事周期开始时间
		var oldFarmingBeginTimes=jQuery("#save\\:farmingBeginTime").val().split('-');
		oldFarmingBeginTime=oldFarmingBeginTimes[0]+"-"+(oldFarmingBeginTimes[1]>9?'':'0')+oldFarmingBeginTimes[1]+"-"+(oldFarmingBeginTimes[2]>9?'':'0')+oldFarmingBeginTimes[2];
		//oldFarmingEndTime=jQuery("#save\\:farmingEndTime").val();//选中显示的农事周期结束时间
		var oldFarmingEndTimes=jQuery("#save\\:farmingEndTime").val().split('-');
		oldFarmingEndTime=oldFarmingEndTimes[0]+"-"+(oldFarmingEndTimes[1]>9?'':'0')+oldFarmingEndTimes[1]+"-"+(oldFarmingEndTimes[2]>9?'':'0')+oldFarmingEndTimes[2];
		jQuery('#nszsModal .form_datetime').eq(0).find('input').val(oldFarmingBeginTime);
		jQuery('#nszsModal .form_datetime').eq(1).find('input').val(oldFarmingEndTime);
		farmingrecord(jQuery('.plantChange').val(),oldFarmingBeginTime,oldFarmingEndTime,npId);
	}
	if(oldFarmingPushStr==null || oldFarmingPushStr==""){
		oldFarmingPushStr=2;
	}else{
		if(jQuery('#save\\:farmingPushShow').val()){
			oldFarmingPushStr=1;
		}else{
			oldFarmingPushStr=2;
		}
	}

	
	/* 保存生育期 */
	oldGrowthPeriod=jQuery('#save\\:growthPeriodId').val();
	if(oldGrowthPeriod==null || oldGrowthPeriod==""){
		oldGrowthPeriod=1;
	}
	jQuery('#newPhone').contents().find('.slide-tree').attr('id','growth'+oldGrowthPeriod)
	jQuery('#newPhone').contents().find('.slide-tree li').each(function(){
		var newImg='../asset/images/resume2/czs'+oldGrowthPeriod+jQuery(this).find('img').attr('src').substr(jQuery(this).find('img').attr('src').lastIndexOf('/'));
		jQuery(this).find('img').attr('src',newImg)
	})

	/* 农场介绍 */
	oldFarmIntroduction=jQuery('#save\\:farmIntroductionId').val();
	
	/* 农场视频 */
	oldFarmVideoSelected=jQuery('#save\\:farmVideoSelected').val();//农场视频 1基地视频 2企业视频
	oldFarmVideoEnterprise=jQuery('#save\\:farmVideoEnterprise').val();//企业视频
	oldFarmVideoBase=jQuery('#save\\:farmVideoBase').val();//基地视频
	jQuery('#enterpriseInfoVideoHidden').val(oldFarmVideoEnterprise);//企业视频
	jQuery('#baseVideoHidden').val(oldFarmVideoBase);//基地视频

	/* 数字名片Id*/
	if(jQuery('#save\\:digitalCardId').val()=="" || jQuery('#save\\:digitalCardId').val()==null){
		if(jQuery('#szmpModal .myval option').length>0){
			oldDigitalCardId=jQuery('#szmpModal  .myval option').eq(0).val();
		}
	}else{
		oldDigitalCardId=jQuery('#save\\:digitalCardId').val();
	}
	
	/* 资质证书 */
	
	oldCertificateStr=jQuery('#save\\:certificateStr').val();
	
	/* 分享红包 */
	oldRedPackId=jQuery('#save\\:redPackId').val();//红包
	if(jQuery('#save\\:redPackId').val()=="" || jQuery('#save\\:redPackId').val()==null){
		if(jQuery('#fxhbModal .myval option').length>0){
			oldRedPackId=jQuery('#fxhbModal .myval option').eq(0).val();
		}
	}else{
		oldRedPackId=jQuery('#save\\:redPackId').val();
	}
	oldRedPackName=jQuery('#save\\:redPackName').val();//名字
	if(jQuery('#save\\:redPackContent').val()!=null && jQuery('#save\\:redPackContent').val()!=""){
		oldRedPackContent=jQuery('#save\\:redPackContent').val();//内容
	}else{
		oldRedPackContent=jQuery('#save\\:redPackContent').val();//内容
	}

	/* 分享履历*/
	if(jQuery('#save\\:resumeName').val()!=null && jQuery('#save\\:resumeName').val()!=""){
		jQuery('.panal-wrap input').eq(0).val(jQuery('#save\\:resumeName').val());
		jQuery('.panal-wrap .mr-bo').eq(2).find('.share-wrap .share-title').text(jQuery('#save\\:resumeName').val());
	}
	/* else{
		jQuery('.panal-wrap input').eq(0).val(jQuery('[value='+jQuery('.plantChange').val()+']').text().split('--')[1]+"履历");
		jQuery('.panal-wrap .mr-bo').eq(2).find('.share-wrap .share-title').text(jQuery('[value='+jQuery('.plantChange').val()+']').text().split('--')[1]+"履历");
	} */
	if(jQuery('#save\\:resumeContent').val()!=null && jQuery('#save\\:resumeContent').val()!=""){
		jQuery('.panal-wrap textarea').val(jQuery('#save\\:resumeContent').val().replace(/<\/br\>/g,"\n"));
		jQuery('.panal-wrap .mr-bo').eq(2).find('.share-wrap .share-txt span').html(jQuery('#save\\:resumeContent').val().replace(/\n/g,"<\/br\>"));
	}
	/* else{
		jQuery('.panal-wrap textarea').val((jQuery('#save\\:baseName').val()+"</br>--义田全程追溯--").replace(/<\/br\>/g,"\n"));
	} */
	if(jQuery('#save\\:resumeUrl').val()!=null && jQuery('#save\\:resumeUrl').val()!=""){
		jQuery('.panal-wrap input').eq(1).val(jQuery('#save\\:resumeUrl').val());
	}
	if(jQuery('#save\\:resumeImg').val()!=null && jQuery('#save\\:resumeImg').val()!=""){
		jQuery('.panal-wrap .mr-bo').eq(2).find('.share-qr img').attr('src',jQuery('#save\\:resumeImg').val())
	}
	


	/* 作物名称失去焦点刷新手机 */
	jQuery('.zwmc').blur(function(){
		jQuery('#newPhone').contents().find('.line1-txt-wrap p').eq(0).find('.font-orige').text(jQuery('.zwmc').val());
	});

	showOrHide();
	jQuery('#newPhone').contents().find('#showpic').carousel({
		interval: false
	});
})
/* 搜索 */
jQuery('.octicon-search02').click(function(){
	if(jQuery('#searchName').val()!="" && jQuery('#searchName').val()!="请输入作物名称搜索"){
		leftPlant(jQuery('#searchName').val());
		//jQuery('.searchData').click();
	}
})

/* 需要复制的Id */
var copyId="";
/* 复制履历弹出框 */
jQuery(".fzResume").click(function(){
	copyId=jQuery(this).attr('npmid');
	if(confirm('如有修改请先保存当前履历，是否继续当前操作？')){
		jQuery(".fzPlant  .fzOnePlant").remove();
		jQuery('.fzPlant  .fzMorePlant').remove();
		jQuery('#copyModal .fzPlantChange').selectpicker();
		jquery('#copyModal .fzPlantChange').selectpicker({noneSelectedText:"请选择"});
		jquery('#copyModal .fzPlantChange').selectpicker('deselectAll');
		jQuery('#copyModal').modal('show');
	}
})


/* 复制履历 */
jQuery(".fzPlantChange").change(function(){
	var onePlant="";//单年生
	var morePlant="";//多年生
	if(jQuery(this).val()!=null){
		var plantval=jQuery(this).val();
		for (var i = 0; i < plantval.length; i++) {
			if(jQuery('[value='+plantval[i]+']').attr('f_type')==1){
				onePlant+=plantval[i]+',';
			}else{
				morePlant+=plantval[i]+',';
			}
		}
		if(onePlant!=""){
			onePlant=onePlant.substr(0,onePlant.length-1);
		}
		if(morePlant!=""){
			morePlant=morePlant.substr(0,morePlant.length-1);
		}
	}

	if(onePlant!=""){
		var onePlantArr=onePlant.split(',');
		jQuery('.fzOnePlant').each(function(){
			var pid=jQuery(this).attr('rpId');
		    var flag=true;
		    for (var i = 0; i < onePlantArr.length-1; i++) {
			    if(pid==onePlantArr[i]){
			    	flag=false;
				}
			}
			if(flag){
				jQuery(this).remove();
			}
		})
				
		for (var i = 0; i < onePlantArr.length; i++) {
			var pid=onePlantArr[i];
			var flag=true;
			jQuery('.fzOnePlant').each(function(){
				if(pid==jQuery(this).attr('rpId')){
					flag=false;
				}
			})

			if(flag){
				var str="<li class='copy-normal fzOnePlant' rpId='"+pid+"'>"
				str+="<div class='copyleft fl'>"+jQuery('[value='+pid+']').eq(0).text()+"</div>";
				str+="<div class='copy-right fl'>"+jQuery('[value='+pid+']').attr('pdata')+"</div>";
				str+="<div class='copy-caozuo fr'></div>";
				str+="<div class='clearfix'></div>";
				str+="</li>";
				jQuery(str).insertBefore(jQuery('.fzPlant .copy-subtitle').eq(1));
			}
		}
	}else{
		jQuery('.fzOnePlant').remove();
	}

	//多年生作物
	if(morePlant!=""){
		var morePlantArr=morePlant.split(',');
		//添加还是删除作物
		jQuery('.fzMorePlant').each(function(){
		    var pid=jQuery(this).attr('rpId');
		    var flag=true;
			for (var i = 0; i < morePlantArr.length-1; i++) {
				if(pid==morePlantArr[i]){
					flag=false;
				}
			}
			if(flag){
				jQuery(this).remove();
			}
		})
		
		for (var i = 0; i < morePlantArr.length; i++) {
			var pid=morePlantArr[i];
			var flag=true;
			jQuery('.fzMorePlant').each(function(){
				if(pid==jQuery(this).attr('rpId')){
					flag=false;
				}
			})

			if(flag){
				var str="<li class='copy-normal fzMorePlant' rpId='"+pid+"'>"
				str+="<div class='copyleft fl'>"+jQuery('[value='+pid+']').eq(0).text()+"</div>";
				str+="<div class='copy-right fl'><p><select class='selectpicker se-width'>";
				str+=morePlants(jQuery('[value='+pid+']').attr('pdata'));
				str+="</select></p></div>";
				str+="<div class='copy-caozuo fr'>";
				str+="<p><button class='btn btn-success fzAddMorePlant'>添加</button></p>";
				str+="</div>";
				str+="<div class='clearfix'></div>";
				str+="</li>";
				jQuery('.fzPlant').append(str)
			}
		}
		jQuery('.fzMorePlant .selectpicker').selectpicker();  
	}else{
		jQuery('.fzMorePlant').remove();
	}
}) 



/* 履历多年生添加 */
jQuery("#copyModal").on('click','.fzAddMorePlant',function(){
	var option="";
	jQuery(this).parents('.fzMorePlant').find('.selectpicker').eq(0).find('option').each(function(){
		option+="<option>"+jQuery(this).text()+"</option>"
	})
	var str="<div class='copy-caozuo fr'><p>";
	str+="<button class='btn btn-default fzDelMorePlant'>删除</button>";
	str+="</p></div><div class='copy-right fr mr40'><p>";
	str+="<select class='selectpicker se-width'>";
	str+=option;
	str+="</select>";
	str+="</p></div><div class='clearfix'></div>";
	jQuery(this).parents('.copy-normal').append(str);
	jQuery('.fzMorePlant .selectpicker').selectpicker();  
})
/* 履历多年生删除*/
jQuery("#copyModal").on('click','.fzDelMorePlant',function(){
	jQuery(this).parents('.copy-caozuo').next().remove();
	jQuery(this).parents('.copy-caozuo').remove();
})
/* 复制履历保存 */
jQuery(".saveMorePhoneModel").click(function(){
	var jsonStr={};
	jsonStr.copyId=copyId;
	var obj=[];
	jQuery('.fzOnePlant').each(function(){
		 var oneplant = {};
		 oneplant.id = jQuery(this).attr('rpid');
		 oneplant.cDate = jQuery(this).find('.copy-right').text();
		 obj.push(oneplant);
	})
	jQuery('.fzMorePlant').each(function(){
			 var moreId = jQuery(this).attr('rpid');
			jQuery(this).find('.copy-right').each(function(){
			 var moreplant = {};
			 moreplant.id = moreId;
			 moreplant.cDate = jQuery(this).find('.selectpicker').val();
			 obj.push(moreplant);
		})
	})
	jsonStr.plants=obj;
	savephonemodeljson(JSON.stringify(jsonStr));
})
/* 复制回调 */
function returnsavephoneModelJson(obj){
	window.location.href=jQuery('.pano_second .sed_cur a').attr('href');
}

/* 选择作物 */ 
jQuery('.plantChange').change(function(){
	/* 移除ul下除标题所有元素 */
	//jQuery('.plantClass .copy-normal').each(function(index){
		jQuery('.plantClass .copy-subtitle').css('display','none');
		jQuery('.plantClass .copy-normal').css('display','none');
	//})
	/* f_type=1 单年生 */
	if(jQuery('[value='+jQuery(this).val()+']').attr('f_type')==1){
		jQuery('.plantClass .copy-subtitle').eq(0).css('display','block');

		jQuery('.plantClass .copy-normal').eq(0).find('.copyleft').text(jQuery('.plantChange [value='+jQuery(this).val()+']').text());
		jQuery('.plantClass .copy-normal').eq(0).find('.copy-right').text(jQuery('.plantChange [value='+jQuery(this).val()+']').attr('pdata'));
		jQuery('.plantClass .copy-normal').eq(0).css('display','block');
	}else{
		/* 多年生标题 */
		jQuery('.plantClass .copy-subtitle').eq(1).css('display','block');
		
		/* 计算多年生周期 */
		var option=morePlants(jQuery('[value='+jQuery(this).val()+']').attr('pdata'));
		
		jQuery('.plantClass .copy-normal').eq(1).find('.copyleft').text(jQuery('.plantChange [value='+jQuery(this).val()+']').text());
		jQuery('.plantClass .copy-normal').eq(1).find('.copy-right p').children().remove();
		var str="<select class='selectpicker se-width'>"+option+"</select>";
		jQuery('.plantClass .copy-normal').eq(1).find('.copy-right p').append(str);
		jQuery('.plantClass .copy-normal').eq(1).css('display','block');
		jQuery('.plantClass .selectpicker').selectpicker();
	}
}) 
/* 多年生周期 */
function morePlants(pTime){
	var option="";
	var selectTimes=pTime.split('_');
	var beginselectTimes=selectTimes[0].split('--');
	if(beginselectTimes!=""){
		var begin_yMd=beginselectTimes[0].split('/');
		var beginE_yMd=beginselectTimes[1].split('/');
	  	var year_begin_yMd=parseInt(begin_yMd[0]);
	  	var year_beginE_yMd=parseInt(beginE_yMd[0]);
	 	var month_begin_yMd=parseInt(begin_yMd[1]);
	 	var month_beginE_yMd=parseInt(beginE_yMd[1]);
	  	var day_begin_yMd=parseInt(begin_yMd[2]);
	  	var day_beginE_yMd=parseInt(beginE_yMd[2]);
	  	if(month_beginE_yMd>month_begin_yMd){
	    	for (var j = 0; j <year_beginE_yMd-year_begin_yMd+1; j++) {
	     		option+="<option>"+(year_begin_yMd+j)+"/"+(month_begin_yMd>9?'':"0")+month_begin_yMd+"/"+(day_begin_yMd>9?'':"0")+day_begin_yMd
	        	+"--"+
	        	(year_begin_yMd+j)+"/"+(month_beginE_yMd>9?'':"0")+month_beginE_yMd+"/"+(day_beginE_yMd>9?'':"0")+day_beginE_yMd+"</option>";
	    	}

	  	}else if(month_beginE_yMd==month_begin_yMd){
			if(day_beginE_yMd>=day_begin_yMd){
	      		for (var j = 0; j <year_beginE_yMd-year_begin_yMd+1; j++) {
	        		option+="<option>"+(year_begin_yMd+j)+"/"+(month_begin_yMd>9?'':"0")+month_begin_yMd+"/"+(day_begin_yMd>9?'':"0")+day_begin_yMd
	        		+"--"+
	        		(year_begin_yMd+j)+"/"+(month_beginE_yMd>9?'':"0")+month_beginE_yMd+"/"+(day_beginE_yMd>9?'':"0")+day_beginE_yMd+"</option>";
	      		}
			}else{
				for (var j = 0; j <year_beginE_yMd-year_begin_yMd; j++) {
			    	option+="<option>"+(year_begin_yMd+j)+"/"+(month_begin_yMd>9?'':"0")+month_begin_yMd+"/"+(day_begin_yMd>9?'':"0")+day_begin_yMd
			        	+"--"+
			        	(year_begin_yMd+j+1)+"/"+(month_beginE_yMd>9?'':"0")+month_beginE_yMd+"/"+(day_beginE_yMd>9?'':"0")+day_beginE_yMd+"</option>";
			    }
			}
		}else{
	    	for (var j = 0; j <year_beginE_yMd-year_begin_yMd; j++) {
	        	option+="<option>"+(year_begin_yMd+j)+"/"+(month_begin_yMd>9?'':"0")+month_begin_yMd+"/"+(day_begin_yMd>9?'':"0")+day_begin_yMd
	          	+"--"+
	         	(year_begin_yMd+j+1)+"/"+(month_beginE_yMd>9?'':"0")+month_beginE_yMd+"/"+(day_beginE_yMd>9?'':"0")+day_beginE_yMd+"</option>";
	      	}
		}
	}
	//最后周期 落叶开始到种植结束
	if(selectTimes[1]!="--"){
		option+="<option>"+selectTimes[1]+"</option>";
	}
	return option;
}


/* 保存选择作物 */
jQuery('.selectPlant').click(function(){
	jQuery('.selectPlantName').val(jQuery('.plantChange [value='+jQuery('.plantChange').val()+']').text());
	if(jQuery('[value='+jQuery('.plantChange').val()+']').attr('plantimg')!=null && jQuery('.plantChange [value='+jQuery('.plantChange').val()+']').attr('plantimg')!=""){
		oldPlantImg=jQuery('[value='+jQuery('.plantChange').val()+']').attr('plantimg')+"@137w_137h%7C137-1ci.png";
	}else{
		oldPlantImg="../asset/images/851.jpg";
	}
	jQuery('.right-con1-left img').attr('src',oldPlantImg);
	oldRealPlantId=jQuery('.plantChange').val();
	jQuery('#zwModal').modal('hide');
	/* 菜谱 */
	if(jQuery('.plantChange').val()!=null && jQuery('.plantChange').val()!=""){
//		plantmenuinfo(jQuery('[value='+jQuery('.plantChange').val()+']').attr('plantId'));
		if(plantnums==0 && npId!=null && npId!=""){
			oldproductIntroduction=jQuery('#save\\:productIntroductionContent').val();
		}else{
			oldproductIntroduction=jQuery('#cp').html();
		}
	}
	/* 农事展示  */
	if(jQuery('.plantChange').val()!=null){
		var pdata=jQuery('[value='+jQuery('.plantChange').val()+']').attr('pdata').split('--');
		if(jQuery('[value='+jQuery('.plantChange').val()+']').attr('f_type')==2){
			pdata=jQuery('.plantClass .copy-normal .selectpicker').val().split('--');;
		}
		oldFarmingBeginTime=pdata[0].replace('/','-').replace('/','-');//选中显示的农事周期开始时间
		oldFarmingEndTime=pdata[1].replace('/','-').replace('/','-');//选中显示的农事周期结束时间
		jQuery('#nszsModal .form_datetime').eq(0).find('input').val(oldFarmingBeginTime);
		jQuery('#nszsModal .form_datetime').eq(1).find('input').val(oldFarmingEndTime);
		farmingrecord(jQuery('.plantChange').val(),pdata[0].replace('/','-').replace('/','-'),pdata[1].replace('/','-').replace('/','-'),npId);
		plantnums++;
	}
	/* 履历 分享 */
	jQuery('.panal-wrap input').eq(0).val(jQuery('[value='+jQuery('.plantChange').val()+']').text().split('--')[1]+"履历");
	jQuery('.panal-wrap .mr-bo').eq(2).find('.share-wrap .share-title').text(jQuery('[value='+jQuery('.plantChange').val()+']').text().split('--')[1]+"履历")
	jQuery('.panal-wrap textarea').val((jQuery('#save\\:baseName').val()+"</br>--义田全程追溯--").replace(/<\/br\>/g,"\n"));
	jQuery('.panal-wrap .mr-bo').eq(2).find('.share-wrap .share-txt span').html((jQuery('#save\\:baseName').val()+"</br>--义田全程追溯--").replace(/<\/br\>/g,"\n"));
	jQuery('.panal-wrap .mr-bo').eq(2).find('.share-wrap img').attr('src',oldPlantImg);
	rightPhone();
	/* 种植者 */
	jQuery('#newPhone').contents().find('.zzz .name').text(jQuery('[value='+jQuery('.plantChange').val()+']').attr("zzzName"));
	if(jQuery('[value='+jQuery('.plantChange').val()+']').attr("zzzUrl")!=null && jQuery('[value='+jQuery('.plantChange').val()+']').attr("zzzUrl")!=""){
		jQuery('#newPhone').contents().find('.zzz .pic-img img').attr('src',jQuery('[value='+jQuery('.plantChange').val()+']').attr("zzzUrl"));
	}	
	rightOneShow();
});
/* 取消选择作物  还原上一次操作 */
jQuery('.closePlant').click(function(){
	if(jQuery('.plantChange [value='+oldRealPlantId+']').attr('plantimg')!=null && jQuery('[value='+oldRealPlantId+']').attr('plantimg')!=""){
		oldPlantImg=jQuery('[value='+oldRealPlantId+']').attr('plantimg')+"@137w_137h%7C137-1ci.png";
	}else{
		oldPlantImg="../asset/images/851.jpg";
	}
	jQuery('.right-con1-left img').attr('src',oldPlantImg);
	jQuery('.selectPlantName').val(jQuery('.plantChange [value='+oldRealPlantId+']').text());
});


/* 上传图片回调 */
function updateFatherPic(id,url){
	if(id=="logoImg" || id=="mapImg"){
		jQuery('#'+id).contents().find('.file_images').attr('src',url+'@150w_150h_2e_1o');
	}
	if(id=="plantImg"){
		jQuery('#'+id).contents().find('.file_images').attr('src',url+"@137w_137h%7C137-1ci.png");
	}

	if(id="certificateImg"){
		jQuery("<li><img src='"+url+"' /><img src='/asset/images/del03.jpg' width='27' height='23' class='del-img' /></li>").prependTo(jQuery('#zzzsModal .zs-list'));
		//删除提示
		jquery(".zs-list li").hover(function() {
			jquery(this).find(".del-img").show();
		}, function() {
			jquery(this).find(".del-img").hide();
		});
	}
}

/* 点击上传作物图 */
jQuery("[data-target='#plantImgModal']").click(function(){
	jQuery('#plantImg').contents().find('.file_images').attr('src',oldPlantImg);
})
/* 保存上传作物图  如果取消 则显示上一张 或 默认图 */
jQuery('.saveplantImg').click(function(){
	oldPlantImg=jQuery('#plantImg').contents().find('.file_images').attr('src');
	jQuery('.right-con1-left img').attr('src',oldPlantImg);
	jQuery('#plantImgModal').modal('hide');
	if(oldPlantImg!=null && oldPlantImg!=""){
		jQuery('#newPhone').contents().find('.page1-img7 img').attr('src',oldPlantImg.split('@')[0]+"@73w_73h%7C137-1ci.png")
	}
})



/* 点击上传logo图 */
jQuery("[data-target='#logoModal']").click(function(){
	jQuery('#logoImg').contents().find('.file_images').attr('src',oldLogoImg);
})
/* 保存上传logo图   如果取消 则显示上一张 或 默认图*/
jQuery('.savelogo').click(function(){
	oldLogoImg=jQuery('#logoImg').contents().find('.file_images').attr('src');
	jQuery('#logoModal').modal('hide');
	if(oldLogoImg!=null && oldLogoImg!=""){
		jQuery('#newPhone').contents().find('.logo img').eq(0).css('display','');
		jQuery('#newPhone').contents().find('.logoimg').attr('src',oldLogoImg.split('@')[0]);
		var imgHeight=jQuery('#newPhone').contents().find('.logoimg').height()-22;
		var imgWidth=jQuery('#newPhone').contents().find('.logoimg').width()-84;
		if(imgHeight>=0 && imgWidth>=0){
			if(imgWidth>=imgHeight){
				jQuery('#newPhone').contents().find('.logo img').attr('src',oldLogoImg.split('@')[0]+"?x-oss-process=image/resize,w_84");
			}else{
				jQuery('#newPhone').contents().find('.logo img').attr('src',oldLogoImg.split('@')[0]+"?x-oss-process=image/resize,h_22");
			}
		}else if(imgHeight>=0){
			jQuery('#newPhone').contents().find('.logo img').attr('src',oldLogoImg.split('@')[0]+"?x-oss-process=image/resize,h_22");
		}else if(imgWidth>=0){
			jQuery('#newPhone').contents().find('.logo img').attr('src',oldLogoImg.split('@')[0]+"?x-oss-process=image/resize,w_84");
		}else{
			jQuery('#newPhone').contents().find('.logo img').attr('src',oldLogoImg.split('@')[0]);
		}
	}else{
		jQuery('#newPhone').contents().find('.logo img').eq(0).css('display','none');
	}
})



/* 产品介绍 */
function preview(){
	jQuery(".phon_div").empty().append(editor.html());
}
var editor;
var param = "?param=param";//非此页面不需要
KindEditor.ready(
	function(K) {
		editor = K.create('textarea[name="content"]', {
		resizeType : 1,
		filterMode : false,
		allowPreviewEmoticons : false,
		uploadJson : '/asset/js/kindeditor/upload_json.jsp?directoryType=34&businessType=3&enterpriseId=' +enterprise ,
		allowImageUpload : true,
		items:[
		       'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
		        'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
		        'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
		        'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen',
		        'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
		        'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
		        'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
		        'anchor', 'link', 'unlink'
		],
		afterChange : function() {
			jQuery(".phon_div").empty().append(this.html());
          	}
	});
	jQuery(".ke-edit-iframe ").contents().find(".ke-content").css("height","328")
}); 
/* 保存选中作物 ajax回调刷新菜谱 */
/*function returnPlantmenuinfo(obj){
	if(plantnums==1 && npId!=null && npId!=""){
		oldproductIntroduction=jQuery('#save\\:productIntroductionContent').val();
	}else{
		oldproductIntroduction=obj;
	}
}*/
/* 点击产品介绍 */
jQuery("[data-target='#cpjsModal']").click(function(){
	jQuery(jQuery('.ke-edit-iframe').contents()).contents().find('body').html(oldproductIntroduction);
})
/* 保存产品介绍  */
jQuery('.saveProductIntroduction').click(function(){
	oldproductIntroduction=jQuery(jQuery('.ke-edit-iframe').contents()).contents().find('body').html();
	jQuery('#cpjsModal').modal('hide');
	jQuery('#newPhone').contents().find('.page1-three').children().remove();
	jQuery('#newPhone').contents().find('.page1-three').append(oldproductIntroduction);
	jQuery('#newPhone').contents().find('.page1-three').append("<div class='back pfixed'><img src='../asset/images/resume/phone/back.png' class='hMove'/></div>");
})


/* 点击我要购买 */
jQuery("[data-target='#wygmModal']").click(function(){
	jQuery('#wygmModal .iCheck').eq(oldMyBuySelect-1).iCheck("check");
	if(oldMyBuySelect==1){
		jQuery('#wygmModal .myval').eq(0).selectpicker('val',oldMyBuyValue);
		jQuery('#wygmModal .redbag-width').val("");
		jQuery('#wygmModal .overin div .mr10').text("选择商品");
	}else{
		jQuery('#wygmModal .myval').eq(0).selectpicker('val',jQuery('#wygmModal option').eq(0).val());
		jQuery('#wygmModal .redbag-width').val(oldMyBuyValue);
		jQuery('#wygmModal .overin div .mr10').text("输入网址");
	}
})
/* 我要购买保存 */
jQuery('.savebuy').click(function(){
	oldMyBuySelect=jQuery('#wygmModal .checked').parent().index()+1;
	if(oldMyBuySelect==1){
		oldMyBuyValue=jQuery('#wygmModal .myval').eq(0).val();
	}else{
		oldMyBuyValue=jQuery('#wygmModal .redbag-width').val();
	}
	jQuery('#wygmModal').modal('hide');
})


/* 打开资源规划 */
jQuery("[data-target='#zyghModal']").click(function(){
	jQuery('#mapImg').contents().find('.file_images').attr('src',oldmapImg);
})
/* 保存资源规划 */
jQuery(".saveMap").click(function(){
	oldmapImg=jQuery('#mapImg').contents().find('.file_images').attr('src');
	jQuery('#zyghModal').modal('hide');
	/* 资源规划 */
	jQuery('#newPhone').contents().find('.hjts').text(oldEnvironmental);
	jQuery('#newPhone').contents().find('.zzgh').children().remove();
	twoVideo();
})


/* 打开四季田景 */
jQuery("[data-target='#sjtjModal']").click(function(){
	jQuery('#sjtjModal .myval').selectpicker('val',oldKrpanosId);
})
/* 保存四季田景 */
jQuery(".savekrpanos").click(function(){
	oldKrpanosId=jQuery('#sjtjModal .myval').val();
	jQuery('#sjtjModal').modal('hide');
	/* 四季田景 */
	twoVideo();
	
})


/* 打开环境特色 */
jQuery("[data-target='#hjtsModal']").click(function(){
	jQuery('#hjtsModal .hj-te').val(oldEnvironmental);
})
/* 保存环境特色 */
jQuery(".saveEnvironmental").click(function(){
	oldEnvironmental=jQuery('#hjtsModal .hj-te').val();
	jQuery('#hjtsModal').modal('hide');
	jQuery('#newPhone').contents().find('.hjts').text(oldEnvironmental);
})


jQuery(".music").on('click','.openMusic',function(){
	if(jQuery(this).find('.musicFl').attr('fl')==1){
		jQuery('.music .openMusic').each(function(){
			jQuery(this).find('.musicFl').attr('fl','1');
			jQuery(this).find('img').attr("src","../asset/images/resume/icon77.png");
			jQuery(this).find('.musicFl')[0].pause();
		})
		jQuery(this).find('.musicFl').attr("src",jQuery(this).find('.musicFl').attr("sr"));
		jQuery(this).find('img').attr("src","../asset/images/map/off.png");
		jQuery(this).find('.musicFl')[0].play();
		jQuery(this).find('.musicFl').attr('fl','0');
		
	}else{
		jQuery(this).find('.musicFl').attr("src","");
		jQuery(this).find('.musicFl')[0].pause();
		jQuery(this).find('img').attr("src","../asset/images/resume/icon77.png");
		jQuery(this).find('.musicFl').attr('fl','1');
	}
});

/* 选择解读*/
jQuery(".music").on('click','li',function(){
	jQuery('.music li').removeClass('cur');
	jQuery(this).addClass('cur');
})
/* 上传专家介绍回调  */
function dosome(text){
	var str="<li><img src='../asset/images/resume/icon78.png' class='img-icon' /><span>";
	str+=jQuery("#myframPic3").contents().find('#urlId').attr('name');
	str+="</span><span class='fr ml10'><img src='../asset/images/map/close.png' width='15'/></span><span class='fr openMusic'><img src='../asset/images/resume/icon77.png'/>";
	str+="<audio class='musicFl' fl='1' sr='"+text+"' controls='controls' loop='false' hidden='false'/></span></li>";
	jQuery('#zjjdModal .music').append(str);
}
/*  保存  */
jQuery('.saveMusic').click(function(){
	jQuery('#zjjdModal .fr').eq(0).text(jQuery('#zjjdModal .cur span').eq(0).text());
	oldPhoneModelVoiceId=jQuery('#zjjdModal .cur').index();
	closemusic();
});

jQuery(".music").on('click','.ml10',function(){
	if(confirm('确定删除专家解读？')){
		jQuery(this).parent().remove();
		setTimeout(function () {
			jQuery('.music li').eq(0).click();
		},100);
	}
});

/*  取消音乐   */
jQuery('.closeMusic').click(function(){
	closemusic();
});

/* 关闭播放 */
function closemusic(){
	jQuery('.musicFl').each(function(){
		jQuery(this)[0].pause();
		jQuery(this).attr('fl','1');
		jQuery(this).parent().find('img').attr("src","../asset/images/resume/icon77.png");
	})
	jQuery('#zjjdModal').modal('hide');
	jQuery('.zj-btn').find('span').text("点击文件上传选择文件，请上传小于3M的mp3文件，最多可以上传五个文件");
}


/* 点击农事展示 */
jQuery("[data-target='#nszsModal']").click(function(){
	/* if(oldFarmingPushStr==""){
		if(oldFarmingPushStr==1){
			jQuery('.jilu-ch .iCheck').iCheck("check");
		}else{
			jQuery('.jilu-ch .iCheck').iCheck("uncheck");
		}
		
	} */
	jQuery('.jilu-ch .iCheck').on("ifClicked", function(event){
		if(this.checked){
			jQuery(this).iCheck("uncheck");
			jQuery('.pickList_addAll').click();
			jQuery('#nonnumeric [class!=aaa]').each(function(){
				jQuery('.pickList_targetList').find('[data-value='+jQuery(this).val()+']').attr("class","pickList_listItem ui-selected ui-state-highlight pickList_selectedListItem");
				jQuery('.pickList_remove').removeAttr('disabled');
				jQuery(".pickList_remove").click();
			});
		}else{
			jQuery(this).iCheck("check");
			jQuery('.pickList_removeAll').click();
			jQuery('#nonnumeric [ly!=""]').each(function(){
				jQuery('.pickList_sourceList').find('[data-value='+jQuery(this).val()+']').attr("class","pickList_listItem ui-selected ui-state-highlight pickList_selectedListItem");
				jQuery('.pickList_add').removeAttr('disabled');
				jQuery(".pickList_add").click();
			});
		}

	});
	jQuery('#nszsModal .form_datetime').eq(0).find('input').val(oldFarmingBeginTime);
	jQuery('#nszsModal .form_datetime').eq(1).find('input').val(oldFarmingEndTime);
	
})

/* 选择农事时间 */
jQuery('#nszsModal input').eq(0).change(function(){
	var bumDays=tab(jQuery('#nszsModal .form_datetime').eq(1).find('input').val(),jQuery('#nszsModal .form_datetime').eq(0).find('input').val());
	if(bumDays>0 && bumDays<=730){
		farmingrecord(jQuery('.plantChange').val(),jQuery('#nszsModal input').eq(0).val(),jQuery('#nszsModal input').eq(1).val(),npId);
	}else{
		alert("农事时间间隔不能大于2年")
	}
})
jQuery('#nszsModal input').eq(1).change(function(){
	var bumDays=tab(jQuery('#nszsModal .form_datetime').eq(1).find('input').val(),jQuery('#nszsModal .form_datetime').eq(0).find('input').val());
	if(bumDays>0 && bumDays<=730){
		farmingrecord(jQuery('.plantChange').val(),jQuery('#nszsModal input').eq(0).val(),jQuery('#nszsModal input').eq(1).val(),npId);
	}else{
		alert("农事时间间隔不能大于2年")
	}
})
function tab(date1,date2){
    var oDate1 = new Date(date1);
    var oDate2 = new Date(date2);
    return (oDate1.getTime() -oDate2.getTime())/(1000*60*60*24);
}


/* 农事回调 */
function returnFarmingrecord(){
	jQuery("#nonnumeric").pickList();
	oldFarmingPushStr=2;
	farmingData();
	
}
/* 缓存农事数据 */
function farmingData(){
	if(jQuery('.jilu-ch div').attr('class').indexOf('checked')!=-1){
		oldFarmingPushStr=1;
	}else{
		oldFarmingPushStr=2;
	}
	oldFarmingIdStr="";
	jQuery('.pickList_targetList li').each(function(){
		oldFarmingIdStr+=jQuery(this).attr('data-value')+","
	})
	if(oldFarmingIdStr!=""){
		oldFarmingIdStr=oldFarmingIdStr.substr(0,oldFarmingIdStr.length-1);
	}
	/* if(oldFarmingBeginTime==""){
		var pdata=jQuery('[value='+jQuery('.plantChange').val()+']').attr('pdata').split('--');
		oldFarmingBeginTime=pdata[0].replace('/','-').replace('/','-');//选中显示的农事周期开始时间
		oldFarmingEndTime=pdata[1].replace('/','-').replace('/','-');//选中显示的农事周期结束时间
	}else{ */
		oldFarmingBeginTime=jQuery('#nszsModal .form_datetime').eq(0).find('input').val();//选中显示的农事周期开始时间
		oldFarmingEndTime=jQuery('#nszsModal .form_datetime').eq(1).find('input').val();//选中显示的农事周期结束时间
		/* } */

	if(oldFarmingIdStr!=""){
		rightphonefarming(oldFarmingIdStr,oldRealPlantId);
	}else{
		jQuery('#newPhone').contents().find('.page3-first .page3-left-btn').css('display','none');
		jQuery('#newPhone').contents().find('.page3-first .page3-right-btn').css('display','none');
		jQuery('#newPhone').contents().find('.page3-first .page3-time').text("");
		jQuery('#newPhone').contents().find('.page3-first .page3-timelist #before-time').text("");
		jQuery('#newPhone').contents().find('.page3-first .page3-timelist #after-time').text("");
		jQuery('#newPhone').contents().find('.syq .li').css('display','');
		jQuery('#newPhone').contents().find('.syq li').removeClass('cur');
		jQuery('#newPhone').contents().find('.syq li').eq(0).addClass('cur');
		jQuery("#newPhone")[0].contentWindow.phoneFarming(null);
	}
	jQuery('#newPhone').contents().find('#myCarousel').carousel({
		interval: false
	});
}

/* 保存农事展示 */
jQuery('.saveFarming').click(function(){
	jQuery('#nszsModal').modal('hide');
	farmingData();
	//rightphonefarming(oldFarmingIdStr,oldRealPlantId);
})
/* 取消农事展示 */
jQuery('.closeFarming').click(function(){
	if(oldFarmingPushStr==1){
		jQuery('.jilu-ch .iCheck').iCheck("check");
	}else{
		jQuery('.jilu-ch .iCheck').iCheck("uncheck");
	}
	jQuery('.pickList_removeAll').click();
	if(oldFarmingIdStr!=""){
		var oldFarmingIdStrs=oldFarmingIdStr.split(",");
		jQuery('.pickList_sourceList li').each(function(){
			for (var i = 0; i < oldFarmingIdStrs.length; i++) {
				if(jQuery(this).attr('data-value')==oldFarmingIdStrs[i]){
					jQuery('.pickList_sourceList').find('[data-value='+oldFarmingIdStrs[i]+']').attr("class","pickList_listItem ui-selected ui-state-highlight pickList_selectedListItem");
					jQuery('.pickList_add').removeAttr('disabled');
					jQuery(".pickList_add").click();
				}
			}
		})
	}
})


/* 打开生育期*/
jQuery("[data-target='#syqModal']").click(function(){
	jQuery('#syqModal li').removeAttr('class');
	jQuery('#syqModal li').eq(oldGrowthPeriod-1).attr('class','cur');
})
/* 保存生育期 */
jQuery(".saveGrowthPeriod").click(function(){
	oldGrowthPeriod=jQuery('#syqModal .cur').index()+1;
	jQuery('#newPhone').contents().find('.slide-tree').attr('id','growth'+oldGrowthPeriod);
	jQuery('#newPhone').contents().find('.slide-tree li').each(function(){
		var newImg='../asset/images/resume2/czs'+oldGrowthPeriod+jQuery(this).find('img').attr('src').substr(jQuery(this).find('img').attr('src').lastIndexOf('/'));
		jQuery(this).find('img').attr('src',newImg);
	})
	jQuery('#syqModal').modal('hide');
})


/* 打开农场介绍*/
jQuery("[data-target='#ncjsModal']").click(function(){
	jQuery('#ncjsModal .hj-te').val(oldFarmIntroduction);
})
/* 保存农场介绍*/
jQuery(".saveFarmIntroduction").click(function(){
	oldFarmIntroduction=jQuery('#ncjsModal .hj-te').val();
	jQuery('#ncjsModal').modal('hide');
	jQuery('#newPhone').contents().find('.ncjs').text(oldFarmIntroduction);
})


/* 上传视频回调 */
function updateFatherVideo(id,url){
	jQuery('#'+id).val(url);
	jQuery('#'+id).contents().find('#selectfiles img').attr('src',"../asset/images/map/shipinmoren-pic.png");
	jQuery('#'+id+"Hidden").val(url);
}

/* 点击上传视频*/
jQuery("[data-target='#ncspModal']").click(function(){
	if(oldFarmVideoSelected==1){
		jQuery('#ncspModal .iCheck').eq(0).iCheck("check")
		jQuery('#ncspModal #baseVideo').css('display','block');
		jQuery('#ncspModal #enterpriseInfoVideo').css('display','none');
	}else{
		jQuery('#ncspModal .iCheck').eq(1).iCheck("check")
		jQuery('#ncspModal #baseVideo').css('display','none');
		jQuery('#ncspModal #enterpriseInfoVideo').css('display','block');
	}
	if(oldFarmVideoBase!=null && oldFarmVideoBase!=""){
		jQuery('#baseVideo').contents().find('#selectfiles img').attr('src',"/asset/images/map/shipinmoren-pic.png")
	}
	if(oldFarmVideoEnterprise!=null && oldFarmVideoEnterprise!=""){
		jQuery('#enterpriseInfoVideo').contents().find('#selectfiles img').attr('src',"/asset/images/map/shipinmoren-pic.png")
	}
	/* 选择视频*/
	jQuery('#ncspModal label').click(function(){
		if(jQuery(this).index()==0){
			jQuery('#ncspModal #baseVideo').css('display','block');
			jQuery('#ncspModal #enterpriseInfoVideo').css('display','none');
		}else{
			jQuery('#ncspModal #baseVideo').css('display','none');
			jQuery('#ncspModal #enterpriseInfoVideo').css('display','block');
		}
	})
	jQuery('#ncspModal .iCheck-helper').click(function(){
		if(jQuery(this).parent().parent().index()==0){
			jQuery('#ncspModal #baseVideo').css('display','block');
			jQuery('#ncspModal #enterpriseInfoVideo').css('display','none');
		}else{
			jQuery('#ncspModal #baseVideo').css('display','none');
			jQuery('#ncspModal #enterpriseInfoVideo').css('display','block');
		}
	})
})
/* 保存上传视频*/
jQuery(".saveVideo").click(function(){
	oldFarmVideoSelected=jQuery('#farmVideoSelected').val();//农场视频 1基地视频 2企业视频
	oldFarmVideoEnterprise=jQuery('#enterpriseInfoVideoHidden').val();//企业视频
	oldFarmVideoBase=jQuery('#baseVideoHidden').val();//基地视频
	jQuery('#ncspModal').modal('hide');
})


/* 打开数字名片 */
jQuery("[data-target='#szmpModal']").click(function(){
	jQuery('#szmpModal .myval').selectpicker('val',oldDigitalCardId);
})
/* 保存数字名片 */
jQuery(".saveBaseCard").click(function(){
	oldDigitalCardId=jQuery('#szmpModal .myval').val();
	jQuery('#szmpModal').modal('hide');
})


/* 打开资格证书*/
jQuery("[data-target='#zzzsModal']").click(function(){
	jQuery('#zzzsModal .zs-list li').remove();
	if(oldCertificateStr!=""){
		var oldCertificateStrs=oldCertificateStr.split(',');
		for(var i=0;i<oldCertificateStrs.length;i++){
			jQuery("<li><img src='"+oldCertificateStrs[i]+"' /><img src='/asset/images/del03.jpg' width='27' height='23' class='del-img' /></li>").prependTo(jQuery('#zzzsModal .zs-list '));  
		}
		if(oldCertificateStr.length==100){
			jQuery('#zzzsModal .change-img-div').css('display','none');
		}else{
			jQuery('#zzzsModal .change-img-div').css('display','block');
		}
	}
	jQuery(".zs-list .del-img").click(function(){
		jQuery(this).parent().remove();
	})

	//删除提示
	jquery(".zs-list li").hover(function() {
		jquery(this).find(".del-img").show();
	}, function() {
		jquery(this).find(".del-img").hide();
	});
})
/* 保存资格证书 */
jQuery(".saveCertificate").click(function(){
	oldCertificateStr="";
	jQuery('#zzzsModal .zs-list li').each(function(){
		oldCertificateStr+=jQuery(this).find('img').eq(0).attr('src')+",";
	})
	if(oldCertificateStr.length>0){
		oldCertificateStr=oldCertificateStr.substr(0,oldCertificateStr.length-1);
	}
	jQuery('#zzzsModal').modal('hide');
	fourCertificate();
})

/* 打开红包*/
jQuery("[data-target='#fxhbModal']").click(function(){
	jQuery('#fxhbModal .myval').selectpicker('val',oldRedPackId);
	jQuery('#fxhbModal .form-control').eq(1).val(oldRedPackName);
	jQuery('#fxhbModal .form-control').eq(2).val(oldRedPackContent);
})
/* 保存红包 */
jQuery(".saveRedpack").click(function(){
	oldRedPackId=jQuery('#fxhbModal .myval').val();
	oldRedPackName=jQuery('#fxhbModal .form-control').eq(1).val();
	oldRedPackContent=jQuery('#fxhbModal .form-control').eq(2).val();
	jQuery('#fxhbModal').modal('hide');
})

/* 分享履历 */
jQuery('.fxnr').blur(function(){
	jQuery('.panal-wrap .mr-bo').eq(2).find('.share-wrap .share-txt span').html(jQuery('.fxnr').val().replace(/\n/g,"<\/br\>"));
 })
  
jQuery('.fxbt').blur(function(){
	jQuery('.panal-wrap .mr-bo').eq(2).find('.share-wrap .share-title').text(jQuery('.fxbt').val());
})

//复制链接
jQuery('.fzUrl').click(function(){
	jQuery('.fxUrl').select();
	var supportFlag=document.execCommand("Copy");
	if(supportFlag){
		alert('已复制该内容');
	}else{
		alert('此浏览器不支持复制功能，请手动复制一下吧！');
	}
	
})

/* 保存 */
jQuery('.saveVerification').click(function(){
	var regex = /^[a-z0-9A-Z\u4e00-\u9fa5\\-\\—\\_////\\\\\\|]+$/;
	var flag=true;

	var resumeName=jQuery('.lvli-info .form-control').eq(0).val();
	if(flag && (resumeName=="" || resumeName.length>20)){
		alert("请正确输入不大于20字的作物名称！");
		flag=false;
	}
	jQuery('#save\\:cropName').val(resumeName);

	if(flag && (oldRealPlantId==null || oldRealPlantId=="")){
		alert("请选择作物！");
		flag=false;
	}else{
		jQuery('#save\\:plantBreedName').val(jQuery('.right-con1-right input').eq(1).val().trim());
	}
	jQuery('#save\\:realPlantId').val(oldRealPlantId);
	if(oldPlantImg!="" && oldPlantImg!=null){
		jQuery('#save\\:realPlantImg').val(oldPlantImg.split('@')[0]);
	}
	if(oldLogoImg!="" && oldLogoImg!=null && oldLogoImg!="/asset/images/dpadd.jpg"){
		jQuery('#save\\:logoImgId').val(oldLogoImg.split('@')[0]);
	}
	
	jQuery('#save\\:areaShow').val(jQuery('#jdwz').is(':checked'));
	jQuery('#save\\:plantStandardShow').val(jQuery('#zzbz').is(':checked'));
	jQuery('#save\\:plantTimeShow').val(jQuery('#zzsj').is(':checked'));
	jQuery('#save\\:recoveryTimeShow').val(jQuery('#cssj').is(':checked'));
	jQuery('#save\\:maturityShow').val(jQuery('#csd').is(':checked'));
	jQuery('#save\\:productIntroductionShow').val(jQuery('#cpjs').is(':checked'));
	jQuery('#save\\:productIntroductionContent').val(oldproductIntroduction);
	if(jQuery('#cpjs').is(':checked')){
		if(flag && oldproductIntroduction==""){
			alert("请正确输入产品介绍！");
			flag=false;
		}
	}
	jQuery('#save\\:commentShow').val(jQuery('#pl').is(':checked'));
	jQuery('#save\\:thumbsUpShow').val(jQuery('#dz').is(':checked'));
	jQuery('#save\\:purchaseShow').val(jQuery('#wygm').is(':checked'));
	jQuery('#save\\:purchaseContentId').val(oldMyBuyValue);
	jQuery('#save\\:purchaseSelectedId').val(oldMyBuySelect);
	if(jQuery('#wygm').is(':checked')){
		/* 一键购买权限 */
		if(flag && jQuery('#save\\:keyBuyRights').val()=="2"){
			flag=false;
			alert("请先购买一键购买服务!");
		}
		if(oldMyBuySelect==1){
			if(flag && (oldMyBuyValue==null || oldMyBuyValue=="")){
				alert("我要购买不能为空！");
				flag=false;
			}
		}else{
			if(flag && (oldMyBuyValue==null || oldMyBuyValue=="" || oldMyBuyValue.length>40)){
				alert("我要购买网址不能为空且不能大于100字！");
				flag=false;
			}
		}
	}
	jQuery('#save\\:resourcePlanningShow').val(jQuery('#zzgh').is(':checked'));
	if(oldmapImg!="" && oldmapImg!="/asset/images/dpadd.jpg"){
		jQuery('#save\\:resourcePlanningImgId').val(oldmapImg.split('@')[0]);
	}
	
	/* 四季田景权限 */
	jQuery('#save\\:krpanosShow').val(jQuery('#sjtj').is(':checked'));
	if(jQuery('#sjtj').is(':checked')){
		if(flag && jQuery('#save\\:krpanosRights').val()=="2"){
			flag=false;
			alert("请先购买四季田景服务!");
		}
		if(flag && (oldKrpanosId==null || oldKrpanosId=="")){
			alert("请正确选择四季田景！");
			flag=false;
		}else{
			jQuery('#save\\:krpanosId').val(oldKrpanosId);
		}
	}
	jQuery('#save\\:farmRealShow').val(jQuery('#ncsj').is(':checked'));
	jQuery('#save\\:meteorologicalShow').val(jQuery('#qxsj').is(':checked'));
	jQuery('#save\\:environmentalShow').val(jQuery('#hjts').is(':checked'));
	if(jQuery('#hjts').is(':checked')){
		if(flag && (oldEnvironmental==null || oldEnvironmental=="" || oldEnvironmental.length>40)){
			alert("请正确输入不能大于40字环境特色！");
			flag=false;
		}else{
			jQuery('#save\\:environmentalId').val(oldEnvironmental)
		}
	} 
	jQuery('#save\\:fingerprintShow').val(jQuery('#hjzw').is(':checked'));
	jQuery('#save\\:interpretationShow').val(jQuery('#zzjd').is(':checked'));
	jQuery('#save\\:phoneModelVoiceId').val(oldPhoneModelVoiceId);
	jQuery('#save\\:voiceUrl').val(jQuery('#zjjdModal .cur .musicFl').attr('sr'));
	
	jQuery('#save\\:farmingShow').val(jQuery('#nszs').is(':checked'));
	if(jQuery('#nszs').is(':checked')){
		if(oldFarmingPushStr==1){
			jQuery('#save\\:farmingPushShow').val(true);
		}else{
			jQuery('#save\\:farmingPushShow').val(false);
		}
		jQuery('#save\\:farmingBeginTime').val(oldFarmingBeginTime);
		jQuery('#save\\:farmingEndTime').val(oldFarmingEndTime);
		jQuery('#save\\:farmingIdStr').val(oldFarmingIdStr);
	}
	jQuery('#save\\:realTimeVideoShow').val(jQuery('#sssp').is(':checked'));
	jQuery('#save\\:videoTracingShow').val(jQuery('#spzs').is(':checked'));
	jQuery('#save\\:realityShow').val(jQuery('#hjsk').is(':checked'));
	/* 地块摄像头 */
	if(flag && (jQuery('#sssp').is(':checked') || jQuery('#spzs').is(':checked') || jQuery('#hjsk').is(':checked')) && jQuery('[value='+jQuery('.plantChange').val()+']').attr('cameraRights')==""){
			alert("请先添加摄像头!");
			flag=false;
	}
	
	jQuery('#save\\:growthPeriodShow').val(jQuery('#syq').is(':checked'));
	if(jQuery('#syq').is(':checked')){
		jQuery('#save\\:growthPeriodId').val(oldGrowthPeriod);
	}
	jQuery('#save\\:farmIntroductionShow').val(jQuery('#ncjs').is(':checked'));
	
	jQuery('#save\\:farmIntroductionId').val(oldFarmIntroduction);
	if(flag && oldFarmIntroduction.length>80){
		alert("农场介绍不能大于80字！");
		flag=false;
	}

	jQuery('#save\\:farmVideosShow').val(jQuery('#ncsp').is(':checked'));
	if(jQuery('#ncsp').is(':checked')){
		jQuery('#save\\:farmVideoSelected').val(oldFarmVideoSelected);
		jQuery('#save\\:farmVideoBase').val(jQuery('#baseVideoHidden').val());
		jQuery('#save\\:farmVideoEnterprise').val(jQuery('#enterpriseInfoVideoHidden').val());
	}
	jQuery('#save\\:digitalCardShow').val(jQuery('#szmp').is(':checked'));
	if(jQuery('#szmp').is(':checked')){
		jQuery('#save\\:digitalCardId').val(oldDigitalCardId);
	}
	jQuery('#save\\:certificateShow').val(jQuery('#zzzs').is(':checked'));
	if(jQuery('#zzzs').is(':checked')){
		if(flag && oldCertificateStr==""){
			alert("请添加资格证书！");
			flag=false;
		}
	}
	jQuery('#save\\:certificateStr').val(oldCertificateStr);

	jQuery('#save\\:farmingMasterShow').val(jQuery('#ncz').is(':checked'));
	jQuery('#save\\:farmingGrowerShow').val(jQuery('#zzz').is(':checked'));
	jQuery('#save\\:redPackShow').val(jQuery('#fxhb').is(':checked'));
	if(jQuery('#fxhb').is(':checked')){
		if(flag && oldRedPackId==""){
			alert("请选择分享红包！");
			flag=false;
		}else if(flag && oldRedPackId==""){
			alert("请正确输入不大于20字红包分享标题！");
			flag=false;
		}else if(flag && oldRedPackId==""){
			alert("请正确输入不大于100字红包分享描述！");
			flag=false;
		}else{
			jQuery('#save\\:redPackId').val(oldRedPackId);
			jQuery('#save\\:redPackName').val(oldRedPackName);
			jQuery('#save\\:redPackContent').val(oldRedPackContent);
		}
	}

	if(flag && jQuery('#fenxiang textarea').val().length>40){
		alert("分享描述不能大于40字！");
		flag=false;
	}

	
	var autoStr="";
	jQuery('.music li').each(function(index){
		if(index!=0){
			autoStr+=jQuery(this).find('span').text()+"_=";
			autoStr+=jQuery(this).find('audio').attr('sr')+",";
		}
	})
	if(autoStr!=""){
		autoStr=autoStr.substr(0,autoStr.length-1);
		jQuery('#save\\:pmvStr').val(autoStr);
	}
	jQuery('#save\\:resumeName').val(jQuery('.panal-wrap input').eq(0).val());
	jQuery('#save\\:resumeContent').val(jQuery('.panal-wrap textarea').val());
	if(jQuery('#save\\:resumeName').val()!=null && jQuery('#save\\:resumeName').val()!=""){
		jQuery('.panal-wrap input').eq(0).val(jQuery('#save\\:resumeName').val());
	}
	if(jQuery('#save\\:resumeContent').val()!=null && jQuery('#save\\:resumeContent').val()!=""){
		jQuery('.panal-wrap textarea').val(jQuery('#save\\:resumeContent').val().replace(/[\n]/g,"</br>"));
	}
	jQuery('.copy-normal').each(function(index){
		if(jQuery(this).css('display')=='block' && index==0){
			jQuery('#save\\:cycleBeginTime').val(jQuery(this).find('.copy-right').text().split('--')[0]);
			jQuery('#save\\:cycleEndTime').val(jQuery(this).find('.copy-right').text().split('--')[1]);
		}else if(jQuery(this).css('display')=='block' && index==1){
			jQuery('#save\\:cycleBeginTime').val(jQuery(this).find('.selectpicker ').val().split('--')[0]);
			jQuery('#save\\:cycleEndTime').val(jQuery(this).find('.selectpicker ').val().split('--')[1]);
		}
	})
	
	if(flag){
		jQuery('.saveAllData').click();
	}
	
})

/* 删除 */
jQuery('.delVerification').click(function(){
	if(confirm('确定删除履历？')){
		delresume(npId);
	}
})
/* 删除回调 */
function returnDelResume(){
	window.location.href="/resume/NewPhoneModelInfoList.seam";
}

/* 取消 */
jQuery('.cancelVerification').click(function(){
	location.reload();
})

/* 评论管理 */
jQuery(".openComment").click(function(){
	if(npId!=null && npId!=""){
		commentlist(npId,'');
	}
})
/* 评论管理回调 */
function returnCommentlist(){
	document.onkeydown = function(e){
	    var ev = document.all ? window.event : e;
	    if(ev.keyCode==13 && jQuery('#pinglunModal').css('display')=='block') {
	    	commentlist(npId,jQuery('.search-pl-txt').val());
	     }
	}

	jQuery('input[class="iCheck"]').iCheck({
		checkboxClass: 'icheckbox_minimal-blue',
		radioClass: 'iradio_minimal-blue'
	});
	//评论全选
	jQuery('.pinglun-window input[allaa]').on('ifClicked', function(e) { //评论管理全选
		e.stopPropagation();
		if(this.checked) {
			jQuery(this).attr("allaa", "unchecked");
			jQuery(this).parents('.modal-body').find('input[itembb]').iCheck('uncheck');
			jQuery(this).parents('.modal-body').find('input[itembb]').attr("itembb", "unchecked");
		} else {
			jQuery(this).attr("allaa", "checked");
			jQuery(this).parents('.modal-body').find('input[itembb]').iCheck('check');
			jQuery(this).parents('.modal-body').find('input[itembb]').attr("itembb", "checked");
		}
	});

	/* 删除评论 */
	jQuery('.delOneComment').click(function(){
		if(confirm('确定删除评论？')){
			commentdel(jQuery(this).parents('.pinglun-title').attr('id'));
		}
	})

	/* 批量删除评论 */
	jQuery('.delMoreComment').click(function(){
		if(confirm('确定删除评论？')){
			var str="";
			jQuery('#commentlistId .pinglun-title').each(function(){
				if(jQuery(this).find('.iCheck').is(':checked')){
					str+=jQuery(this).attr('id')+",";
				}
			})
			if(str!=""){
				commentdel(str.substr(0,str.length-1));
			}else{
				alert("请选择要删除的评论");
			}
		}
	})

	
	jQuery('#pinglunModal').modal('show');
}

/* 删除评论回调 */
function returnCommentDel(){
	if(npId!=null && npId!=""){
		commentlist(npId,'');
	}
}

/*         右侧手机                    */
function rightPhone(){
	jQuery('#newPhone').load(function(){
		rightOneShow();
		setTimeout(function () {
			rightTwoShow();
			rightThreeShow();
			rightFourShow();
		 },2000);
//		setTimeout(function () {
//			if(jQuery('#newPhone').contents().find('#szhj .carousel-inner iframe').length>0){
//				jQuery('#newPhone').contents().find('#szhj .carousel-inner iframe').attr('src',jQuery('#newPhone').contents().find('#szhj .carousel-inner iframe').attr('src'));
//			}
//		},3000);
	}); 
	/* jQuery('#newPhone').ready(function(){
		rightOneShow();
		rightTwoShow();
		rightThreeShow();
		rightFourShow();
	}); */
	
}

/* 初始默认是否显示 */
function showOrHide(){
	jQuery('#newPhone').load(function(){
		jQuery('#newPhone').contents().find('#szhj .active').removeClass('active');
		jQuery(".tab-content .iCheck").each(function() {
			if(jQuery(this).is(":checked")){
				if(jQuery(this).attr('id')=='dz' || jQuery(this).attr('id')=='pl' || jQuery(this).attr('id')=='wygm'){
					jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).addClass('on');
				}else if(jQuery(this).attr('id')=='zzgh' || jQuery(this).attr('id')=='sjtj' || jQuery(this).attr('id')=='ncsj'){
					/* jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).addClass('item');
					jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).css('display',''); */
				}else if(jQuery(this).attr('id')=='fxhb'){
					jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).css('display','none');
					jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).eq(0).css('display','block');
				}else if(jQuery(this).attr('id')=='sssp' || jQuery(this).attr('id')=='spzs' || jQuery(this).attr('id')=='hjsk'){
					jQuery('#newPhone').contents().find('.szsp').css('display','');
				}else{
					jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).css('display','block');
				}
			}else{
				if(jQuery(this).attr('id')=='dz' || jQuery(this).attr('id')=='pl' || jQuery(this).attr('id')=='wygm'){
					jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).removeClass('on')
				}else if(jQuery(this).attr('id')=='zzgh' || jQuery(this).attr('id')=='sjtj' || jQuery(this).attr('id')=='ncsj'){
					/* jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).removeClass('item');
					jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).css('display','none'); */
					jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).remove();
				}else if(jQuery(this).attr('id')=='sssp' || jQuery(this).attr('id')=='spzs' || jQuery(this).attr('id')=='hjsk'){
					if(!jQuery("#sssp").is(":checked") || !jQuery("#spzs").is(":checked") || !jQuery("#hjsk").is(":checked")){
						jQuery('#newPhone').contents().find('.szsp').css('display','none');
					}
				}else{
					jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).css('display','none');
				}
			}
		});
/* 		jQuery('#newPhone').contents().find('#szhj .item').eq(0).addClass('active');
 */	}) 

	jQuery('#newPhone').ready(function(){
		jQuery('#newPhone').contents().find('#szhj .active').removeClass('active');
		jQuery(".tab-content .iCheck").each(function() {
			if(jQuery(this).is(":checked")){
				if(jQuery(this).attr('id')=='dz' || jQuery(this).attr('id')=='pl' || jQuery(this).attr('id')=='wygm'){
					jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).addClass('on');
				}else if(jQuery(this).attr('id')=='zzgh' || jQuery(this).attr('id')=='sjtj' || jQuery(this).attr('id')=='ncsj'){
					/* jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).addClass('item');
					jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).css('display',''); */
				}else if(jQuery(this).attr('id')=='fxhb'){
					jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).css('display','none');
					jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).eq(0).css('display','block');
				}else if(jQuery(this).attr('id')=='sssp' || jQuery(this).attr('id')=='spzs' || jQuery(this).attr('id')=='hjsk'){
					jQuery('#newPhone').contents().find('.szsp').css('display','');
				}else{
					jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).css('display','block');
				}
			}else{
				if(jQuery(this).attr('id')=='dz' || jQuery(this).attr('id')=='pl' || jQuery(this).attr('id')=='wygm'){
					jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).removeClass('on')
				}else if(jQuery(this).attr('id')=='zzgh' || jQuery(this).attr('id')=='sjtj' || jQuery(this).attr('id')=='ncsj'){
					/* jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).removeClass('item');
					jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).css('display','none'); */
					jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).remove();
				}else if(jQuery(this).attr('id')=='sssp' || jQuery(this).attr('id')=='spzs' || jQuery(this).attr('id')=='hjsk'){
					if(!jQuery("#sssp").is(":checked") || !jQuery("#spzs").is(":checked") || !jQuery("#hjsk").is(":checked")){
						jQuery('#newPhone').contents().find('.szsp').css('display','none');
					}
				}else{
					jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).css('display','none');
				}
			}
		});
/* 		jQuery('#newPhone').contents().find('#szhj .item').eq(0).addClass('active');
 */	}); 
	allcheck();
}

/* checkbox 勾选是否显示 */
function allcheck(){
	jQuery(".tab-content .iCheck").on('ifClicked', function() {
		if(jQuery(this).is(":checked")){
			if(jQuery(this).attr('id')=='dz' || jQuery(this).attr('id')=='pl' || jQuery(this).attr('id')=='wygm'){
				jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).removeClass('on')
			}else if(jQuery(this).attr('id')=='zzgh' || jQuery(this).attr('id')=='sjtj' || jQuery(this).attr('id')=='ncsj'){
				/* jQuery('#newPhone').contents().find('#szhj .active').removeClass('active');
				jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).removeClass('item');
				jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).css('display','none');
				jQuery('#newPhone').contents().find('#szhj .item').eq(0).addClass('active'); */
				jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).remove();
			}else if(jQuery(this).attr('id')=='sssp' || jQuery(this).attr('id')=='spzs' || jQuery(this).attr('id')=='hjsk'){
				var nums=0;
				if(jQuery("#sssp").is(":checked")){
					nums++;
				}
				if(jQuery("#spzs").is(":checked")){
					nums++;
				}
				if(jQuery("#hjsk").is(":checked")){
					nums++;
				}
				if(nums==1){
					jQuery('#newPhone').contents().find('.szsp').css('display','none');
				}
			}else if(jQuery(this).attr('id')=='qxsj'){
				jQuery("#newPhone")[0].contentWindow.removeflash();
				jQuery("#newPhone")[0].contentWindow.removeflashrepeat();
				jQuery('#newPhone').contents().find('.qxsj').css('display','none');
				jQuery('#newPhone').contents().find('.qxsj li').css('display','none');
			}else if(jQuery(this).attr('id')=='nszs'){
				jQuery('#syq').iCheck("uncheck");
				jQuery('#syq').attr('itembb','unchecked');
				jQuery('#syq').attr('disabled','disabled');
				jQuery('#newPhone').contents().find('.syq').css('display','none');
				jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).css('display','none');
			}else{
				jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).css('display','none');
			}
		}else{
			if(jQuery(this).attr('id')=='dz' || jQuery(this).attr('id')=='pl' || jQuery(this).attr('id')=='wygm'){
				jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).addClass('on');
			}else if(jQuery(this).attr('id')=='zzgh' || jQuery(this).attr('id')=='sjtj' || jQuery(this).attr('id')=='ncsj'){
				/* jQuery('#newPhone').contents().find('#szhj .active').removeClass('active');
				jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).addClass('item');
				jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).css('display','');
				jQuery('#newPhone').contents().find('#szhj .item').eq(0).addClass('active'); */

				/*twoVideo();  */
				
			}else if(jQuery(this).attr('id')=='fxhb'){
				jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).eq(0).css('display','block');
			}else if(jQuery(this).attr('id')=='sssp' || jQuery(this).attr('id')=='spzs' || jQuery(this).attr('id')=='hjsk'){
				jQuery('#newPhone').contents().find('.szsp').css('display','');
			}else if(jQuery(this).attr('id')=='qxsj'){
				jQuery("#newPhone")[0].contentWindow.secondflash();
				jQuery('#newPhone').contents().find('.qxsj').css('display','block');
				jQuery('#newPhone').contents().find('.qxsj li').eq(0).css('display','block');
			}else if(jQuery(this).attr('id')=='nszs'){
				jQuery('#syq').removeAttr("disabled");
				jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).css('display','block');
			}else{
				jQuery('#newPhone').contents().find('.'+jQuery(this).attr('id')).css('display','block');
			}
		}
	});

	/* 四季田景权限 */
	jQuery('#sjtj').next().click(function(){
		var krpanosRights=jQuery('#save\\:krpanosRights').val();
		if(jQuery('#sjtj').is(':checked') && krpanosRights=="2"){
			jQuery('#sjtj').iCheck("uncheck");
			jQuery('#sjtj').attr('itembb','unchecked');
			alert("请先购买四季田景服务!");
		}
		twoVideo();
	})
	jQuery('#sjtj').parents('label').click(function(){
		var krpanosRights=jQuery('#save\\:krpanosRights').val();
		if(jQuery('#sjtj').is(':checked') && krpanosRights=="2"){
			jQuery('#sjtj').iCheck("uncheck");
			jQuery('#sjtj').attr('itembb','unchecked');
			alert("请先购买四季田景服务!");
		}
		twoVideo();
	})
	
	jQuery('#zzgh').next().click(function(){
		twoVideo();
	}) 
	jQuery('#zzgh').parents('label').click(function(){
		twoVideo();
	}) 
	jQuery('#ncsj').next().click(function(){
		twoVideo();
	})
	jQuery('#ncsj').parents('label').click(function(){
		twoVideo();
	})

	/* 一键购买权限 */
	jQuery('#wygmModal input ').eq(0).next().click(function(){
		var keyBuyRights=jQuery('#save\\:keyBuyRights').val();
		if(keyBuyRights=="2"){
			jQuery('#wygmModal .iCheck').eq(1).iCheck("check");
			alert("请先购买一键购买服务!");
		}
	})
	jQuery('#wygmModal input ').eq(0).parents('label').click(function(){
		var keyBuyRights=jQuery('#save\\:keyBuyRights').val();
		if(keyBuyRights=="2"){
			jQuery('#wygmModal .iCheck').eq(1).iCheck("check");
			alert("请先购买一键购买服务!");
		}
	})

	/* 地块摄像头 */
	jQuery('#sssp').next().click(function(){
		if(jQuery('#sssp').is(':checked') && jQuery('[value='+jQuery('.plantChange').val()+']').attr('cameraRights')==""){
			jQuery('#sssp').iCheck("uncheck");
			jQuery('#sssp').attr('itembb','unchecked');
			jQuery('#newPhone').contents().find('.szsp').css('display','none');
			alert("请先添加摄像头!");
		}
		
	})
	jQuery('#sssp').parents('label').click(function(){
		if(jQuery('#sssp').is(':checked') && jQuery('[value='+jQuery('.plantChange').val()+']').attr('cameraRights')==""){
			jQuery('#sssp').iCheck("uncheck");
			jQuery('#sssp').attr('itembb','unchecked');
			jQuery('#newPhone').contents().find('.szsp').css('display','none');
			alert("请先添加摄像头!");
		}
		
	})
	jQuery('#spzs').next().click(function(){
		if(jQuery('#spzs').is(':checked') && jQuery('[value='+jQuery('.plantChange').val()+']').attr('cameraRights')==""){
			jQuery('#spzs').iCheck("uncheck");
			jQuery('#spzs').attr('itembb','unchecked');
			jQuery('#newPhone').contents().find('.szsp').css('display','none');
			alert("请先添加摄像头!");
		}
	})
	jQuery('#spzs').parents('label').click(function(){
		if(jQuery('#spzs').is(':checked') && jQuery('[value='+jQuery('.plantChange').val()+']').attr('cameraRights')==""){
			jQuery('#spzs').iCheck("uncheck");
			jQuery('#spzs').attr('itembb','unchecked');
			jQuery('#newPhone').contents().find('.szsp').css('display','none');
			alert("请先添加摄像头!");
		}
	})
	jQuery('#hjsk').next().click(function(){
		if(jQuery('#hjsk').is(':checked') && jQuery('[value='+jQuery('.plantChange').val()+']').attr('cameraRights')==""){
			jQuery('#hjsk').iCheck("uncheck");
			jQuery('#hjsk').attr('itembb','unchecked');
			jQuery('#newPhone').contents().find('.szsp').css('display','none');
			alert("请先添加摄像头!");
		}
	})
	jQuery('#hjsk').parents('label').click(function(){
		if(jQuery('#hjsk').is(':checked') && jQuery('[value='+jQuery('.plantChange').val()+']').attr('cameraRights')==""){
			jQuery('#hjsk').iCheck("uncheck");
			jQuery('#hjsk').attr('itembb','unchecked');
			jQuery('#newPhone').contents().find('.szsp').css('display','none');
			alert("请先添加摄像头!");
		}
	})
}



/* 右侧第一页 */
function rightOneShow(){
	/* logo */
	if(oldLogoImg!=null && oldLogoImg!="" && oldLogoImg!="/asset/images/dpadd.jpg"){
		jQuery('#newPhone').contents().find('.logo img').eq(0).css('display','');
		jQuery('#newPhone').contents().find('.logoimg').attr('src',oldLogoImg.split('@')[0]);
		var imgHeight=jQuery('#newPhone').contents().find('.logoimg').height()-22;
		var imgWidth=jQuery('#newPhone').contents().find('.logoimg').width()-84;
		if(imgHeight>=0 && imgWidth>=0){
			if(imgWidth>=imgHeight){
				jQuery('#newPhone').contents().find('.logo img').attr('src',oldLogoImg.split('@')[0]+"?x-oss-process=image/resize,w_84");
			}else{
				jQuery('#newPhone').contents().find('.logo img').attr('src',oldLogoImg.split('@')[0]+"?x-oss-process=image/resize,h_22");
			}
		}else if(imgHeight>=0){
			jQuery('#newPhone').contents().find('.logo img').attr('src',oldLogoImg.split('@')[0]+"?x-oss-process=image/resize,h_22");
		}else if(imgWidth>=0){
			jQuery('#newPhone').contents().find('.logo img').attr('src',oldLogoImg.split('@')[0]+"?x-oss-process=image/resize,w_84");
		}else{
			jQuery('#newPhone').contents().find('.logo img').attr('src',oldLogoImg.split('@')[0]);
		}
	}else{
		jQuery('#newPhone').contents().find('.logo img').eq(0).css('display','none');
	}   
	/* 作物图 */
	if(oldPlantImg!=null && oldPlantImg!="" && oldPlantImg!="../asset/images/851.jpg"){
		jQuery('#newPhone').contents().find('.page1-img7 img').attr('src',oldPlantImg.split('@')[0]+"@73w_73h%7C137-1ci.png");
	}
	/* 产品名 */
	jQuery('#newPhone').contents().find('.line1-txt-wrap p').eq(0).find('.font-orige').text(jQuery('.zwmc').val());
	/* 所在接地 */
	var plantName=jQuery('[value='+jQuery('.plantChange').val()+']').eq(1).text().split('--')[0];
	jQuery('#newPhone').contents().find('.line1-txt-wrap p').eq(1).find('.font-orige').text(plantName);
	/* 种植标准 */
	var planttype=jQuery('[value='+jQuery('.plantChange').val()+']').attr("planttype");
	jQuery('#newPhone').contents().find('.zzbz').text(planttype);
	/* 种植，采收时间 */
	if(jQuery('.plantChange').val()!=null){
		var plantbegintime=jQuery('[value='+jQuery('.plantChange').val()+']').attr("plantbegintime");
		var planthavesttime=jQuery('[value='+jQuery('.plantChange').val()+']').attr("planthavesttime");
		if(jQuery('[value='+jQuery('.plantChange').val()+']').attr("f_type")==1){
			var pdata=jQuery('[value='+jQuery('.plantChange').val()+']').attr("pdata");
			var pdatas=pdata.split('--')[0];
			var pdatasYear=parseInt(pdatas.split("/")[0]);
			var pdatasMonth=parseInt(pdatas.split("/")[1]);
			var pdatasDay=parseInt(pdatas.split("/")[2]);
			jQuery('#zzsj').removeAttr('disabled','disabled');
			jQuery('#newPhone').contents().find('.zzsj').find('.font-orige').eq(0).text((pdatasYear));
			jQuery('#newPhone').contents().find('.zzsj').find('.font-orige').eq(1).text(plantbegintime.split('-')[0]);
			jQuery('#newPhone').contents().find('.zzsj').find('.font-orige').eq(2).text(plantbegintime.split('-')[1]);
			if(parseInt(planthavesttime.split('-')[0])>pdatasMonth){
				jQuery('#newPhone').contents().find('.cssj').find('.font-orige').eq(0).text(pdatasYear);
				jQuery('#newPhone').contents().find('.cssj').find('.font-orige').eq(1).text(planthavesttime.split('-')[0]);
			}else if(pdatasMonth==parseInt(planthavesttime.split('-')[0])){
				if(parseInt(planthavesttime.split('-')[1])>=pdatasDay){
					jQuery('#newPhone').contents().find('.cssj').find('.font-orige').eq(0).text(pdatasYear);
					jQuery('#newPhone').contents().find('.cssj').find('.font-orige').eq(1).text(planthavesttime.split('-')[0]);
				}else{
					jQuery('#newPhone').contents().find('.cssj').find('.font-orige').eq(0).text((pdatasYear+1));
					jQuery('#newPhone').contents().find('.cssj').find('.font-orige').eq(1).text(planthavesttime.split('-')[0]);
				}
			}else{
				jQuery('#newPhone').contents().find('.cssj').find('.font-orige').eq(0).text((pdatasYear+1));
				jQuery('#newPhone').contents().find('.cssj').find('.font-orige').eq(1).text(planthavesttime.split('-')[0]);
			}
//			jQuery('#newPhone').contents().find('.cssj').find('.font-orige').eq(0).text(planthavesttime.split('-')[0]);
			jQuery('#newPhone').contents().find('.cssj').find('.font-orige').eq(2).text(planthavesttime.split('-')[1]);
		}else{
			
			var pdata=jQuery('#zwModal .se-width').eq(2).val();
			var pdatas=pdata.split('--')[0];
			var pdatasYear=parseInt(pdatas.split("/")[0]);
			var pdatasMonth=parseInt(pdatas.split("/")[1]);
			var pdatasDay=parseInt(pdatas.split("/")[2]);
			/*jQuery('#newPhone').contents().find('.zzsj').find('.font-orige').eq(0).text(plantbegintime.split('-')[0]);
			jQuery('#newPhone').contents().find('.zzsj').find('.font-orige').eq(1).text(plantbegintime.split('-')[1]);*/
			jQuery('#newPhone').contents().find('.zzsj').css('display','none');
			jQuery('#zzsj').attr('disabled','disabled');
			jQuery('#zzsj').iCheck("uncheck");
			if(parseInt(planthavesttime.split('-')[0])>pdatasMonth){
				jQuery('#newPhone').contents().find('.cssj').find('.font-orige').eq(0).text(pdatasYear);
				jQuery('#newPhone').contents().find('.cssj').find('.font-orige').eq(1).text(planthavesttime.split('-')[0]);
			}else if(pdatasMonth==parseInt(planthavesttime.split('-')[0])){
				if(parseInt(planthavesttime.split('-')[1])>=pdatasDay){
					jQuery('#newPhone').contents().find('.cssj').find('.font-orige').eq(0).text(pdatasYear);
					jQuery('#newPhone').contents().find('.cssj').find('.font-orige').eq(1).text(planthavesttime.split('-')[0]);
				}else{
					jQuery('#newPhone').contents().find('.cssj').find('.font-orige').eq(0).text((pdatasYear+1));
					jQuery('#newPhone').contents().find('.cssj').find('.font-orige').eq(1).text(planthavesttime.split('-')[0]);
				}
			}else{
				jQuery('#newPhone').contents().find('.cssj').find('.font-orige').eq(0).text((pdatasYear+1));
				jQuery('#newPhone').contents().find('.cssj').find('.font-orige').eq(1).text(planthavesttime.split('-')[0]);
			}
			/*jQuery('#newPhone').contents().find('.cssj').find('.font-orige').eq(0).text(planthavesttime.split('-')[0]);*/
			jQuery('#newPhone').contents().find('.cssj').find('.font-orige').eq(2).text(planthavesttime.split('-')[1]);
		}
		/* 产品介绍*/
		jQuery('#newPhone').contents().find('.page1-three').children().remove();
		jQuery('#newPhone').contents().find('.page1-three').append(oldproductIntroduction);
		jQuery('#newPhone').contents().find('.page1-three').append("<div class='back pfixed'><img src='../asset/images/resume/phone/back.png' class='hMove'/></div>");
		realplantmaturity(jQuery('.plantChange').val());
	}
}
/* 成熟度 */
function returnRealplantmaturity(obj){
	jQuery('#newPhone').contents().find('.csd1').text(obj);
}



/* 右侧第二页 */
function rightTwoShow(){
	/* 资源规划 */
	jQuery('#newPhone').contents().find('.hjts').text(oldEnvironmental);
	
	twoVideo();
	if(jQuery('.plantChange').val()!=null){
		var pdata=jQuery('[value='+jQuery('.plantChange').val()+']').attr('pdata').split('--');
		if(jQuery('[value='+jQuery('.plantChange').val()+']').attr('f_type')==2){
			pdata=jQuery('.plantClass .copy-normal .selectpicker').val().split('--');;
		}
		var beginTime=pdata[0].replace('/','-').replace('/','-');//选中显示的农事周期开始时间
		var endTime=pdata[1].replace('/','-').replace('/','-');//选中显示的农事周期结束时间
		//jQuery('#newPhone').contents().find('.tzhjzw').attr('href','/resume/phoneEnviroment.seam?realPlantId='+oldRealPlantId+'&beginTime='+beginTime+'&endTime='+endTime);
		jQuery('#newPhone').contents().find(".page2-second-bg iframe").attr('src','/resume/phoneEnviroment.seam?realPlantId='+oldRealPlantId+'&beginTime='+beginTime+'&endTime='+endTime);
	}
}

/* 第二页视频 */
function twoVideo(){
	jQuery('#newPhone').contents().find('#szhj .item').remove();
	jQuery('#newPhone').contents().find('#myCarousel2 .carousel-inner div').remove();
	/* 资源规划 */
	if(jQuery("#zzgh").is(":checked")){
		if(oldmapImg=="" || oldmapImg=="/asset/images/dpadd.jpg"){
			var mapStr="<div class='item c-zygh active zzgh'><iframe src='http://app.farmeasy.cn/DigitalCardMap.seam?enterprise_Id="+jQuery('#save\\:enterpriseInfoId').val()
			+"&base_Id="+jQuery('#save\\:baseId').val()+"' width='100%' height='100%' frameborder='no'></iframe></div>";
			jQuery('#newPhone').contents().find('#szhj .carousel-inner').append(mapStr);
		}else{
			if(oldmapImg.indexOf('@')!=-1){
				jQuery('#newPhone').contents().find('#szhj .carousel-inner').append("<div class='item c-zygh active zzgh'><img src='"+oldmapImg.split('@')[0]+"@409w_338h_1e_1c_1o.src'/></div>");
			}else{
				jQuery('#newPhone').contents().find('#szhj .carousel-inner').append("<div class='item c-zygh active zzgh'><img src='"+oldmapImg+"'/></div>");
			}
		} 
	}
	
	/* 四季田景 */
	if(jQuery("#sjtj").is(":checked") && oldKrpanosId!=""){
		var sjtjStr="<div class='item c-sjtj sjtj'><img src='"+jQuery('#sjtjModal [value='+oldKrpanosId+']').attr("imgUrl")+"/mobile_f.jpg@409w_338h_1e_1c_1o.src' />";
		sjtjStr+="<div class='season'><img src='../asset/images/resume/phone/page3-icon9.png' width='20' /></div></div>";
		jQuery('#newPhone').contents().find('#szhj .carousel-inner').append(sjtjStr);
	}
	/* 基地实景 */
	if(jQuery("#ncsj").is(":checked") && jQuery('#save\\:farmRealImgs').val()!=null && jQuery('#save\\:farmRealImgs').val()!=""){
		var allFriImgs=jQuery('#save\\:farmRealImgs').val().split(',');
		var sjtjStr="<div class='item c-ncsj ncsj'><img src='"+allFriImgs[0]+"@409w_338h_1e_1c_1o.src' /></div>";
		jQuery('#newPhone').contents().find('#szhj .carousel-inner').append(sjtjStr);
		var allFriImgsStr="";
		var imgNums=0;
		for(var i=0;i<allFriImgs.length;i++){
			if(allFriImgs[i]!=null && allFriImgs[i]!=""){
				imgNums++;
				if(i==0){
					allFriImgsStr+="<div class='active item'><img src='"+allFriImgs[i]+"@409w_338h_1e_1c_1o.src'/></div>";
				}else{
					allFriImgsStr+="<div class='item'><img src='"+allFriImgs[i]+"@409w_338h_1e_1c_1o.src'/></div>";
				}
			}
		}
		jQuery('#newPhone').contents().find('.page2-three-slide #page2-all-num').text(imgNums);
		jQuery('#newPhone').contents().find('#myCarousel2 .carousel-inner').append(allFriImgsStr);
	}
}


/* 右侧第三页 */
function rightThreeShow(){
	if(oldFarmingIdStr!=""){
		rightphonefarming(oldFarmingIdStr,oldRealPlantId);
	}
	if(jQuery('.plantChange').val()!=null){
		var pdata=jQuery('[value='+jQuery('.plantChange').val()+']').attr('pdata').split('--');
		if(jQuery('[value='+jQuery('.plantChange').val()+']').attr('f_type')==2){
			pdata=jQuery('.plantClass .copy-normal .selectpicker').val().split('--');;
		}
		var beginTime=pdata[0].replace('/','-').replace('/','-');//选中显示的农事周期开始时间
		var endTime=pdata[1].replace('/','-').replace('/','-');//选中显示的农事周期结束时间
		jQuery('#newPhone').contents().find('.szsp a').attr('href','/resume/phoneVideo.seam?realPlantId='+oldRealPlantId+'&beginTime='+beginTime+'&endTime='+endTime);
	}
	jQuery('#newPhone').contents().find('.slide-tree').attr('id','growth'+oldGrowthPeriod);
	jQuery('#newPhone').contents().find('.slide-tree li').each(function(){
		var newImg='../asset/images/resume2/czs'+oldGrowthPeriod+jQuery(this).find('img').attr('src').substr(jQuery(this).find('img').attr('src').lastIndexOf('/'));
		jQuery(this).find('img').attr('src',newImg);
	})
}


/* 农事回调刷新右侧手机 */
function returnRightphonefarming(obj){
	jQuery("#newPhone")[0].contentWindow.phoneFarming(obj);
	jQuery('#newPhone').contents().find('.page3-first .page3-left-btn').css('display','block');
	jQuery('#newPhone').contents().find('.page3-first .page3-right-btn').css('display','block');
}

/* 右侧第四页 */
function rightFourShow(){
	/* 农场介绍 */
	jQuery('#newPhone').contents().find('.ncjs').text(oldFarmIntroduction);
	
	jQuery('#newPhone').contents().find('.zzz .name').text(jQuery('[value='+jQuery('.plantChange').val()+']').attr("zzzName"));
	if(jQuery('[value='+jQuery('.plantChange').val()+']').attr("zzzUrl")!=null && jQuery('[value='+jQuery('.plantChange').val()+']').attr("zzzUrl")!=""){
		jQuery('#newPhone').contents().find('.zzz .pic-img img').attr('src',jQuery('[value='+jQuery('.plantChange').val()+']').attr("zzzUrl"));
	}
	/* 资质证书 */
	fourCertificate();
}
/* 资质证书 */
/*function fourCertificate(){
	jQuery('#newPhone').contents().find('.page4-first-zs').children().remove();
	jQuery('#newPhone').contents().find('.page4-showpic .carousel-inner').children().remove();
	if(oldCertificateStr!=""){
		var oldCertificateStrs=oldCertificateStr.split(',');
		var childrenStr="";
		var str="<div class='pictureSlider poster-main zzzs' data-setting='{\"width\":275,\"height\":180,\"posterWidth\":105,\"posterHeight\":155,\"scale\":0.9,\"autoPlay\":true,\"delay\":3000,\"speed\":300}'>";
		var str="<div class='poster-main lunbo zzzs'>" 
		str+="<div class='poster-btn poster-prev-btn'></div><ul class='poster-list'>";
		for ( var i=0;i<oldCertificateStrs.length;i++) {
			str+="<li class='poster-item'><a href='#'><img src='"+oldCertificateStrs[i]+"@59w_87h_1e_1c_1o.src' width='100%'/></a></li>";
			if(i==0){
				childrenStr+="<div class='item active'><img src='"+oldCertificateStrs[i]+"' /></div>";
			}else{
				childrenStr+="<div class='item'><img src='"+oldCertificateStrs[i]+"' /></div>";
			}
		}
		str+="</ul><div class='poster-btn poster-next-btn'></div></div>";
		jQuery('#newPhone').contents().find('.page4-first-zs').append(str);
		jQuery('#newPhone').contents().find('.page4-showpic .carousel-inner').append(childrenStr);
		showOrHide(); 
		jQuery("#newPhone")[0].contentWindow.zzpicCarousel();
	}
}*/
function fourCertificate(){
	if(oldCertificateStr!=""){
		var oldCertificateStrs=oldCertificateStr.split(',');
		showOrHide(); 
		jQuery("#newPhone")[0].contentWindow.certificate(oldCertificateStrs);
	}
}
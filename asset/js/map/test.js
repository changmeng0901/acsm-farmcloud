function findInArr(arr,item){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==item){
			return true;
		}
	}
	return false;
}
function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName){
		return oParent.getElementsByClassName(sClass);
	}else{
		var aEle = oParent.getElementsByTagName('*');
		var aResult = [];
		for(var i = 0;i<aEle.length;i++){
			var aClass = aEle[i].className.split(' ');
			if(findInArr(aClass,sClass)){
				aResult.push(aEle[i]);
			}
		};
		return aResult;
	}
};

window.onload = window.onresize = function(){
	var oLook = document.body.children[0];
	var oHeader = oLook.children[0];
	var oUd = document.body.children[1];
	var oMain = getByClass(oLook,'main')[0];
	var oContent = getByClass(oMain,'content')[0];
	var oShow = getByClass(oContent,'show')[0];
	var oList = getByClass(oShow,'list')[0];
	var oIframe = oList.getElementsByTagName('iframe')[0];
	
	var oMsg = getByClass(oMain,'msg')[0];
	var oShare = getByClass(oMsg,'share')[0];
	var oTxt = getByClass(oShare,'txt')[0];
	var oBtn = getByClass(oShare,'btn')[0];
	
	oMain.style.height = document.documentElement.clientHeight-oHeader.offsetHeight+'px';
	oMain.style.height = document.body.clientHeight-oHeader.offsetHeight+'px';
	oMain.style.height = document.body.offsetHeight-oHeader.offsetHeight+'px';
	
	//if(window.navigator.userAgent.indexOf('MSIE 9.0')==25||window.navigator.userAgent.indexOf('MSIE 8.0')==25){
	//	oList.removeChild(oIframe);
	//	oImg.style.display = 'block';
//		oHead.style.display = 'none';
//	}else{
//	}
	
	oBtn.onclick = function(){
		oTxt.select();
		document.execCommand("Copy");
		alert('已复制该内容');
	};
	
	var oW = document.documentElement.clientWidth||document.body.clientWidth||document.body.offsetWidth;
	var oH = document.documentElement.clientHeight||document.body.clientHeight-oHeader.offsetHeight||document.body.offsetHeight-oHeader.offsetHeight;
	
	if(oH<640){
		oContent.style.top = oHeader.offsetHeight+10+'px';
		oContent.style.marginTop = -120+'px';
	}else{
		oContent.style.top = '50%';
		oContent.style.marginTop = -355+'px';
	}
	
	jQuery('.ifr').attr('src',jQuery('.ifr').attr('sr'));

};







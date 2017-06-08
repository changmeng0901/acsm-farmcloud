// JavaScript Document


<!--
//<![DATA[
jquery(".ui-selectmenu").remove();
jquery(".rich-calendar-input").addClass("gjss1");
jquery(".rich-calendar-input").removeClass("rich-calendar-input");
jquery(".ui-selectmenu").addClass("small2");
jquery(".ui-selectmenu-menu").css("width","98px");


/* 单选按钮 开始 */
window.onload = function() {
	//多选
	var labels = document.getElementById('male').getElementsByTagName('label');
	var radios = document.getElementById('male').getElementsByTagName('input');
	for(i=0,j=labels.length ; i<j ; i++){
		labels[i].onclick=function() {
			if(this.className == '') {
				this.className='checked';
				try{
					document.getElementById(this.getAttribute("name")).checked = true;
				} catch (e) {}
			}else{
				this.className='';
				try{
					document.getElementById(this.name).checked = false;
				} catch (e) {}
			}
		}
	}
	//单选
	var labels2 = document.getElementById('male2').getElementsByTagName('label');
	var radios2 = document.getElementById('male2').getElementsByTagName('input');
	for(i=0,j=labels2.length ; i<j ; i++){
		labels2[i].onclick=function() {
			if(this.className == '') {
				for(k=0,l=labels2.length ; k<l ; k++){
					labels2[k].className='';
					radios2[k].checked = false;
				}
				this.className='checked';
				try{
					document.getElementById(this.name).checked = true;
				} catch (e) {}
			}else{
				this.className='';
				try{
					document.getElementById(this.name).checked = false;
				} catch (e) {}
			}
		}
	}
}
//全选
cheAll = function(){
	obj = jquery("#cheAll").attr("class"); 
	if(obj == "b"){
		jquery("#cheAll").removeClass("b");
		jquery("#cheAll").addClass("a");
		document.getElementById("ee").checked = true;
		labels = document.getElementById('male').getElementsByTagName('label');
		radios = document.getElementById('male').getElementsByTagName('input');
		for(i=0,j=labels.length; i<j ; i++){
			labels[i].className='checked';
			try{
				document.getElementById(labels[i].getAttribute("name")).checked = true;
			} catch (e) {}
		}
	}else{
		jquery("#cheAll").removeClass("a");
		jquery("#cheAll").addClass("b");
		document.getElementById("ee").checked = false;
		labels = document.getElementById('male').getElementsByTagName('label');
		radios = document.getElementById('male').getElementsByTagName('input');
		for(i=0,j=labels.length ; i<j ; i++){
			labels[i].className='';
		   try{
			  document.getElementById(labels[i].name).checked = false;
		   } catch (e) {}
		}
	}
}
//]]>
-->

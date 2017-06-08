// JavaScript Document

/* 把$换成jquery */

      jquery = jQuery.noConflict();
      jquery(window).load(function() {
 		 jquery(".div_back").css("width", window.screen.width-77);
    	 jquery(".div_back").css("height", document.body.clientHeight-60);
     	 jquery(".tad_div2").css("margin-top",(document.body.clientHeight- 352)/2 +"px ");
     	 jquery(".tad_div2").css("margin-left",(document.body.clientWidth- 579)/2 +"px ");
	  });
      
      jquery(document).ready(function(){  //这个就是传说的ready
          jquery(".ze_table tr,.tr_tab_b tr").not(".nottt").mouseover(function(){  
                  //如果鼠标移到class为stripe的表格的tr上时，执行函数
          jquery(this).addClass("over");})
              jquery(".ze_table tr,.tr_tab_b tr").not(".nottt").mouseout(function(){                       //给这行添加class值为over，并且当鼠标一出该行时执行函数
          jquery(this).removeClass("over");})  //移除该行的class
          jquery(".ze_table tr:even,.tr_tab_b tr:even").not(".nottt").addClass("alt");


                  //给class为stripe的表格的偶数行添加class值为alt
  	  });
      jquery(window).resize(function(){
  	  	 var onLoadWidth = document.body.clientWidth;
  	  	 	jquery(".div_back").animate({width: window.screen.width-77});
  	  		jquery(".div_back").animate({height:document.body.clientHeight-60});
  	  		jquery(".tad_div2").css("margin-top",(document.body.clientHeight- 352)/2 +"px ");
  	  		jquery(".tad_div2").css("margin-left",(document.body.clientWidth- 579)/2 +"px ");
  	  })
      jquery(document).ready(function(){
          	jquery(".r_ulli2").hover(
					function(){
						jquery("#lll").show();
					},function(){
						jquery("#lll").hide();
					}
                  	);
          	jquery(".r_ulli1").hover(
					function(){
						jquery("#ll").show();
					},function(){
						jquery("#ll").hide();
					}
                  	);
			jquery(".tab_t2 ul,tab_t").hover(
					function(){
						jquery(this).find("div").show();
					},
					function(){
						jquery(this).find("div").hide();
					});
      });
          document.onkeydown=function(event){ 
              e = event ? event :(window.event ? window.event : null); 
              if(e.keyCode==27){ 
                  try{
               	  jquery(".tck_ti").find("a:eq(1)").trigger("click");
               	  jquery(".tck_ti").find("img").trigger("click");
                  }catch(e){

                  }
             } 
              if(e.keyCode==13){ 
                  try{
               	  jquery(".tck_ti").find("a:eq(1)").trigger("click");
               	  jquery(".tck_ti").find("img").trigger("click");
               	  return false;
                  }catch(e){

                  }
             } 
    	　}

/*  日历的代码 */
jquery(".rich-calendar-input").addClass("gjss1");
jquery(".rich-calendar-input").removeClass("rich-calendar-input");
op = function(ind){
	if(ind.getAttribute("aa")=="1"){
		jquery(".gjs").slideDown(800);
		jquery(".gjss_a").attr("aa",2).removeClass("gjtop").addClass("gjbottom");
		
		document.getElementById("goodsInfoSearch:flag").value="2";
	}else{
		jquery(".gjs").slideUp(800);
		jquery(".gjss_a").attr("aa",1).removeClass("gjbottom").addClass("gjtop");
		document.getElementById("goodsInfoSearch:wname").value="";
		document.getElementById("goodsInfoSearch:cstart").value="";
		document.getElementById("goodsInfoSearch:cend").value="";
		document.getElementById("goodsInfoSearch:startInputDate").value="";
		document.getElementById("goodsInfoSearch:endInputDate").value="";
		document.getElementById("goodsInfoSearch:flag").value="1";
	}
}

/* 封装的user */
function usr()
{
if(scroll1.style.display=='none')
{scroll1.style.display='block'; 
reido1.style.backgroundImage='url(images/radio1.gif)';
}
else
{scroll1.style.display='none';
reido1.style.backgroundImage='url(images/radio2.gif)';
 }
};

function usrnew()
{
if(ftitle.style.display=='none')
{ftitle.style.display='block'; 
gjtop1.style.backgroundImage='url(images/gjtop.jpg)';
}
else
{ftitle.style.display='none';
gjtop1.style.backgroundImage='url(images/gjbottom.jpg)';
 }
};

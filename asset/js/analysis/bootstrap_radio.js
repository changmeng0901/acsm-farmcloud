// JavaScript Document

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

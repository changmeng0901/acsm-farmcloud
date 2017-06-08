;(function($){
	jQ_Q.fn.extend({
		"jTab":function(o){
			o = $.extend({
				menutag:	"",         //选项卡按钮标签
				boxtag:		"",         //选项卡内容标签
				cur:		0,          //默认显示索引
				act:		"click",    //切换动作click mousemove
				fade:		0,          //淡入时间（毫秒），
				auto:		false,      //自动播放
				autotime:	2000,        //自动播放间隔时间（毫秒）
				callback: ""
			},o);
			jQ_Q(o.menutag).eq(o.cur).addClass("current");
			jQ_Q(o.boxtag).eq(o.cur).siblings().hide();
		
			var index = o.cur;
			var $this = this;
			jQ_Q(o.menutag).bind(o.act,function(){
				jQ_Q(this).addClass("current").siblings().removeClass("current");
				index = jQ_Q(o.menutag).index(this);
				var obj = jQ_Q(o.boxtag+":eq("+index+")");
				obj.show();
				obj.fadeIn(o.fade).siblings().hide();
				if(o.callback!=""){
					eval(o.callback);	
				}
			}).hover(function(){
				jQ_Q(this).addClass("hover");
			},function(){
				jQ_Q(this).removeClass("hover");
			})
			if(o.auto){
				var len = jQ_Q(o.menutag).length;
				var drive = function(){
					jQ_Q(o.menutag).eq(index).addClass("current").siblings().removeClass("current");
					jQ_Q(o.boxtag).eq(index).fadeIn(o.fade).siblings().hide();
					index++;
					if(index==len) index = 0;
				}
				$this[0].t = null;
				$this.hover(function(){
					clearInterval($this[0].t);
				},function(){
					$this[0].t = setInterval(drive,o.autotime);
				}).trigger("mouseleave");
			}
			
		}
	});
})(jQ_Q);
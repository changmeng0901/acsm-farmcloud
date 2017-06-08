;(function(_QQ){
	_QQ.fn.extend({
		"jTab":function(o){
			o = _QQ.extend({
				menutag:	"",         //选项卡按钮标签
				boxtag:		"",         //选项卡内容标签
				cur:		0,          //默认显示索引
				act:		"click",    //切换动作click mousemove
				fade:		0,          //淡入时间（毫秒），
				auto:		false,      //自动播放
				autotime:	2000,        //自动播放间隔时间（毫秒）
				callback: ""
			},o);
			_QQ(o.menutag).eq(o.cur).addClass("current");
			_QQ(o.boxtag).eq(o.cur).siblings().hide();
		
			var index = o.cur;
			var $this = this;
			_QQ(o.menutag).bind(o.act,function(){
				_QQ(this).addClass("current").siblings().removeClass("current");
				index = _QQ(o.menutag).index(this);
				_QQ(o.boxtag).eq(index).fadeIn(o.fade).siblings().hide();
				if(o.callback!=""){
					eval(o.callback);	
				}
			}).hover(function(){
				_QQ(this).addClass("hover");
			},function(){
				_QQ(this).removeClass("hover");
			})
			if(o.auto){
				var len = _QQ(o.menutag).length;
				var drive = function(){
					_QQ(o.menutag).eq(index).addClass("current").siblings().removeClass("current");
					_QQ(o.boxtag).eq(index).fadeIn(o.fade).siblings().hide();
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
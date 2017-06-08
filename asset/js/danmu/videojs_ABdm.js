videojs.plugin('ABP', ABPinit2);
function ABPinit2(){
	function Danmu(ele){
		///////////////////////////////////////////
		///Prepare the html element for the plugin.
		///////////////////////////////////////////
		_this=this;
		this.danmuDiv = document.createElement('div');
		this.danmuDiv.className = 'vjs-danmu';
		ele.el().insertBefore(this.danmuDiv,ele.el().getElementsByClassName('vjs-poster')[0]);

		//$('.barrage_block').append('<div class="danmu_switch fl" id="danmu_switch"><div class="tanmu_bar"></div><span></span></div>');
		this.danmuShowControl = document.getElementById('danmu_switch');

		//判断是开启默认是开启或关闭弹幕
		if($('.playlist_list').attr('danmuShow') == 'true'){
			this.danmuShowControl.className = 'danmu_switch fl';
			$('.tanmu_send_block').show();
		}else{
			this.danmuShowControl.className = 'danmu_switch fl onoff';
			$('.tanmu_send_block').hide();
		}
		
		
		this.danmuSend = document.getElementById('Send_Danmu');

		///////////////////////////////////////////
		//Bind CommentManager.
		///////////////////////////////////////////
		if(typeof CommentManager !== "undefined"){
			this.cmManager = new CommentManager(this.danmuDiv);

			//判断是开启默认是开启或关闭弹幕
			if($('.playlist_list').attr('danmuShow') == 'true'){
				this.cmManager.display = true;
			}else{
				this.cmManager.display = false;
			}
			
			this.cmManager.init();
			this.cmManager.clear();

			//Bind control to video.
			var video=ele.el().children[0];
			var lastPosition = 0;
			video.addEventListener("progress", function(){
				if(lastPosition == video.currentTime){
					video.hasStalled = true;
					_this.cmManager.stopTimer();
				}else
				lastPosition = video.currentTime;
			});

			//var timerDanmu;
			//clearInterval(timerDanmu);
			//timerDanmu = setInterval(function(){
			video.addEventListener("timeupdate", function(){
				if(_this.cmManager.display === false) return;
				if(video.hasStalled){
					_this.cmManager.startTimer();
					video.hasStalled = false;
				}
				_this.cmManager.time(Math.floor(video.currentTime * 1000));
			});
			//},1);

			video.addEventListener("play", function(){
				_this.cmManager.startTimer();
			});

			video.addEventListener("pause", function(){
				_this.cmManager.stopTimer();
			});

			video.addEventListener("waiting", function(){
				_this.cmManager.stopTimer();
			});

			video.addEventListener("ended", function(){
				_this.cmManager.seek(0);
			});
			
			video.addEventListener("playing",function(){
				_this.cmManager.startTimer();
			});

			video.addEventListener("seeked",function(){
				_this.cmManager.clear();
			});
			//fix IE
			video.onresize=function(){
				_this.cmManager.setBounds();
			};

			if(window){
				window.addEventListener("resize", function(){
					_this.cmManager.setBounds();
				});
			}

			//弹幕开关控制Bind Control to button   this.danmuShowControl.addEventListener("click", function(){}
			$('#danmu_switch').unbind('click');
			$('#danmu_switch').bind('click',function(){
				if(_this.cmManager.display==true){
					_this.cmManager.display=false;
					_this.cmManager.clear();
					_this.danmuShowControl.setAttribute("class","danmu_switch fl onoff");
					$('.tanmu_send_block').hide();
				}else{
					_this.cmManager.display=true;
					_this.cmManager.startTimer();
					_this.danmuShowControl.setAttribute("class","danmu_switch fl");
					$('.tanmu_send_block').show();
				}
			});
			
			//----------------------------@@start---------------------------------
			//0.stime表示弹幕相对于视频位置的开始时间（ms），0即在视频开始立即出现
			//1. mode 表示弹幕的类型，参考 弹幕类型 (Comment Types)
			//2.Font Size: 弹幕的文字大小，请参考 弹幕大小 Comment Sizes。更改会更新视图。
			//3.Text Color: 文字颜色，为数字表示，RGB依次由高位到低位：0xRRGGBB。更改会更新视图。
			//4.
			//5.pool[应该弹幕所在的弹幕池]
			//6.dbid[应该是数据库标识符]
			
			
			//发送弹幕时间
			var danmu_value = '',
				danmu_site = '';
			var pageUrl,
			    ParameterMethod,
				ParameterField;
			var iframeSearch = location.search.split("&");
			var getGroupId = iframeSearch[0].split("=")[1];
			var getTestUrl = iframeSearch[1].split("=")[1];
			var operTypeUrl = iframeSearch[2].split("=")[1];
			function FnMethod(string) {
				var Method = '&method=' + string;
				return Method;
			}
			function FnField( Id,Val1 ,Stime,Val2 ,Mode,Val3 ,Size,Val4 ,Color,Val5  ,Daten,Val6  ,Pool,Val7  ,Hash,Val8  ,Content,Val9 ) { //base_id
				return encodeURI('&field={"data":{"' + 
					Id + '":"' + Val1 + '","' + Stime + '":"' + Val2 + '","' + Mode + '":"' + Val3 
					+ '","' + Size + '":"' + Val4 + '","' + Color + '":"' + Val5 + '","' + Daten + '":"' + Val6 
					+ '","' + Pool + '":"' + Val7 + '","' + Hash + '":"' + Val8 + '","' + Content + '":"' + Val9 +'"}}');
			}
			

			$("#Send_Danmu").unbind("click");
			//发送弹幕
			var videoTime;
			function SendDanmuFn(){
				
				danmu_value = $('#text_tanmu').val();
				if(danmu_value.length>20){
					confirm('发送内容不能超过20字！');
					return;
				}
				$('#text_tanmu').val('');
				danmu_site = parseInt($('#Site_Set .dq_bg').attr('data-barrage-site'));
				//videoTime = video.currentTime;
				if( video.currentTime <1){
					videoTime =  video.currentTime+1;
				}else{
					videoTime = video.currentTime;
				}
				
				if(danmu_value!='发送弹幕一起high!' && danmu_value!=''){
					//alert('位置'+$('#Site_Set .dq_bg').attr('data-barrage-site'));
					$('#text_tanmu').focus();
					someDanmakuAObj = {
						"mode" : 1,// 弹幕类型，滚动danmu_site
						"text" : danmu_value,//"3333这里是弹幕的内容"
						"stime": videoTime,//视频开始时间（用于计算弹幕的碰撞位置）_this.cmManager.startTimer()
						"size" : $('#font_set .f_cur').attr('data-barrage-size'),//25普通大小
						"color": $.fn.getHexBackgroundColor("#Color_XsSet","color"), //0xffffff
						"pool" : '0',
						"border": true  // 显示边框
					};
					_this.cmManager.sendComment(someDanmakuAObj);
					//-----------------------------
					ParameterMethod = FnMethod('aerial.barrage.set');
					ParameterField = FnField(
											"aerial_video_id",$('.playlist_list .item.icur').attr('data-id'),
											"stime" ,videoTime,
											"mode" , 1,//"1"$('#Site_Set .dq_bg').attr('data-barrage-site')
											"size" ,  $('#font_set .f_cur').attr('data-barrage-size'),//"25"
											"color" , parseInt($.fn.getHexBackgroundColor("#Color_XsSet","color"),16),  //"16777215"
											"date" ,  "1307940958",
											"pool" ,  "0",
											"hash" ,  "D263bd64",
											"content", danmu_value//danmu_value
											);
											//console.log(ParameterField)
					pageUrl = getTestUrl +"/rest/1.0/aerialVideo?v=1.0&format=json"+ ParameterMethod + ParameterField;
					$.ajax({
						type: "GET",
						timeout: 1000,
						url: pageUrl,
						dataType: "jsonp", 
						jsonp: 'callback'
					 });
					
					//-----------------------------

				}else{
					$('#text_tanmu').focus();
					$('#text_tanmu').val('');
					confirm('发送内容不能为空')
				}
				
				
				
				
				
				
			}

			$("#Send_Danmu").bind("click",SendDanmuFn);

			$.fn.getHexBackgroundColor=function(id,property)
			{ 
			  var rgb=$(id).css(property); 
			  //if($.browser.msie&&$.browser.version>8||$.browser.mozilla||$.browser.webkit)
			  //{ 
			    rgb=rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/); 
			    function hex(x) 
			    { 
			      return ("0"+parseInt(x).toString(16)).slice(-2); 
			    } 
			    rgb=hex(rgb[1])+hex(rgb[2])+hex(rgb[3]); //"#"+hex(rgb[1])+hex(rgb[2])+hex(rgb[3]);
			 // } 
			  return rgb; 
			} 
			//------------------------------@@end----------------------------------------

			//Create Load function
			this.load = function( xmlString , callback ){
					if(callback == null)
					    callback = function(){return;};
	
					var cm = this.cmManager;
					var cmvideo = video;
					var DocXml ;
				
					if(navigator.appName == 'Microsoft Internet Explorer'){
						alert(xmlString)
						var DocXml = new ActiveXObject("Microsoft.XMLDOM");
						DocXml.async = false; 
						DocXml = DocXml.loadXML( xmlString );
						cm.load(BilibiliParser(DocXml));
						cm.seek(cmvideo.currentTime*1000);						
						callback(true);
					}else{
						cm.seek(cmvideo.currentTime*1000);
						var DocXml = new DOMParser().parseFromString( xmlString , "text/xml")
						cm.load(BilibiliParser(DocXml));						
						callback(true);
					}
				
			}

		}
		return this;
	}
	this.danmu = new Danmu(this);
}
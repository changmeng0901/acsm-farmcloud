//<![CDATA[
		Array.prototype.del = function(n) {  
			if(n<0)
				return this;
			else
				return this.slice(0,n).concat(this.slice(n+1,this.length));
		} ;
		
		var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";  
		var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);  
		/** 
		 * base64编码 
		 * @param {Object} str 
		 */  
		function base64encode(str){  
		    var out, i, len;  
		    var c1, c2, c3;  
		    len = str.length;  
		    i = 0;  
		    out = "";  
		    while (i < len) {  
		        c1 = str.charCodeAt(i++) & 0xff;  
		        if (i == len) {  
		            out += base64EncodeChars.charAt(c1 >> 2);  
		            out += base64EncodeChars.charAt((c1 & 0x3) << 4);  
		            out += "==";  
		            break;  
		        }  
		        c2 = str.charCodeAt(i++);  
		        if (i == len) {  
		            out += base64EncodeChars.charAt(c1 >> 2);  
		            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));  
		            out += base64EncodeChars.charAt((c2 & 0xF) << 2);  
		            out += "=";  
		            break;  
		        }  
		        c3 = str.charCodeAt(i++);  
		        out += base64EncodeChars.charAt(c1 >> 2);  
		        out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));  
		        out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));  
		        out += base64EncodeChars.charAt(c3 & 0x3F);  
		    }  
		    return out;  
		}
		/** 
		 * base64解码 
		 * @param {Object} str 
		 */  
		function base64decode(str){  
		    var c1, c2, c3, c4;  
		    var i, len, out;  
		    len = str.length;  
		    i = 0;  
		    out = "";  
		    while (i < len) {  
		        /* c1 */  
		        do {  
		            c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];  
		        }  
		        while (i < len && c1 == -1);  
		        if (c1 == -1)   
		            break;  
		        /* c2 */  
		        do {  
		            c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];  
		        }  
		        while (i < len && c2 == -1);  
		        if (c2 == -1)   
		            break;  
		        out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));  
		        /* c3 */  
		        do {  
		            c3 = str.charCodeAt(i++) & 0xff;  
		            if (c3 == 61)   
		                return out;  
		            c3 = base64DecodeChars[c3];  
		        }  
		        while (i < len && c3 == -1);  
		        if (c3 == -1)   
		            break;  
		        out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));  
		        /* c4 */  
		        do {  
		            c4 = str.charCodeAt(i++) & 0xff;  
		            if (c4 == 61)   
		                return out;  
		            c4 = base64DecodeChars[c4];  
		        }  
		        while (i < len && c4 == -1);  
		        if (c4 == -1)   
		            break;  
		        out += String.fromCharCode(((c3 & 0x03) << 6) | c4);  
		    }  
		    return out;  
		}  
		/** 
		 * utf16转utf8 
		 * @param {Object} str 
		 */  
		function utf16to8(str){  
		    var out, i, len, c;  
		    out = "";  
		    len = str.length;  
		    for (i = 0; i < len; i++) {  
		        c = str.charCodeAt(i);  
		        if ((c >= 0x0001) && (c <= 0x007F)) {  
		            out += str.charAt(i);  
		        }  
		        else   
		            if (c > 0x07FF) {  
		                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));  
		                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));  
		                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));  
		            }  
		            else {  
		                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));  
		                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));  
		            }  
		    }  
		    return out;  
		}  
		/** 
		 * utf8转utf16 
		 * @param {Object} str 
		 */  
		function utf8to16(str){  
		    var out, i, len, c;  
		    var char2, char3;  
		    out = "";  
		    len = str.length;  
		    i = 0;  
		    while (i < len) {  
		        c = str.charCodeAt(i++);  
		        switch (c >> 4) {  
		            case 0:  
		            case 1:  
		            case 2:  
		            case 3:  
		            case 4:  
		            case 5:  
		            case 6:  
		            case 7:  
		                // 0xxxxxxx  
		                out += str.charAt(i - 1);  
		                break;  
		            case 12:  
		            case 13:  
		                // 110x xxxx 10xx xxxx  
		                char2 = str.charCodeAt(i++);  
		                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));  
		                break;  
		            case 14:  
		                // 1110 xxxx10xx xxxx10xx xxxx  
		                char2 = str.charCodeAt(i++);  
		                char3 = str.charCodeAt(i++);  
		                out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));  
		                break;  
		        }  
		    }  
		    return out;  
		} 
	for(var i = 0;i<jsa.length;i++){
    	var obj = jsa[i];
    	var kname = "s"+obj[7]+obj[6];
    	var kname2 = "s"+obj[5]+obj[4];
    	kname = kname.toLowerCase();
    	if(hmap.containsKey(kname)){
			var arr = hmap.get(kname);
			var tempobj = arr[arr.length-1];
			tempname = kname+"_h_"+(tempobj.index+1);
			newobj = {id:obj[0],name:tempname,ath:obj[2],atv:obj[3],linkedscene:kname2,linkedname:obj[5],linkedid:obj[4],index:(tempobj.index+1),scene_id:obj[6]};
			arr = arr.push(newobj);
		}else{
			tempname = kname+"_h_"+0;
			newobj = {id:obj[0],name:tempname,ath:obj[2],atv:obj[3],linkedscene:kname2,linkedname:obj[5],linkedid:obj[4],index:0,scene_id:obj[6]};
			var tempArr = new Array();
			tempArr.push(newobj);
			hmap.put(kname,tempArr);
		}
    }
		
		
		var log = true;
		function showLog(){
			if(log)
				log=false,obj.call("showlog()");
			else
				log=true,obj.call("showlog(false)");
		}

		function setCloseLog(){
			obj.call("set(layer[closelogo].visible,"+closelog+")");
			if(closelog){
				obj.call("set(layer[viewcounttext].y,60)");
				obj.call("set(layer[viewcounttext].x,0)");
			}
		}
		function loadhotspots(name){
			name = name.toLowerCase();
			if(hmap.containsKey(name)){
				var arr = hmap.get(name);
				for(var i = 0;i<arr.length;i++){
					var tempobj = arr[i];
					obj.call("addpots2("+i+","+tempobj.ath+","+tempobj.atv+",'"+tempobj.linkedscene+"',"+tempobj.id+",'"+tempobj.linkedname+"')");
				}
			}
		}
		var newobj = {};
		function savepots(h,v,target_name,target_id,myname,myid,target_real_name){
			newobj = {};
			//alert(h+"::"+v+"::"+target_name+"::"+target_id+"::"+myname+"::"+myid+"::"+target_real_name);
			myname = myname.toLowerCase();
			tempname = "";
			if(hmap.containsKey(myname)){
				var arr = hmap.get(myname);
				var tempobj = arr[arr.length-1];
				tempname = myname+"_h_"+(tempobj.index+1);
				newobj = {id:0,name:tempname,ath:h,atv:v,linkedscene:target_name,linkedid:target_id,index:(tempobj.index+1),scene_id:myid,linkedname:target_real_name};
				arr.push(newobj);
				hmap.put(myname,arr);
			}else{
				tempname = myname+"_h_"+0;
				newobj = {id:0,name:tempname,ath:h,atv:v,linkedscene:target_name,linkedid:target_id,index:0,scene_id:myid,linkedname:target_real_name};
				var tempArr = new Array();
				tempArr.push(newobj);
				hmap.put(myname,tempArr);
			}
			hotspots_edit(0,tempname,h,v,target_id,myid);
		}
		
		function hotspots_edit_next(data){
			if(newobj.id==0){
				newobj.id = data;
				obj.call("set(layer[scene_list].visible,false);");
				obj.call("set(hotspot['temphotspots'].style,'hotspot_ani_white|tooltip');");
				obj.call("set(hotspot['temphotspots'].tooltip,'"+newobj.linkedname+"');");
				obj.call("set(hotspot['temphotspots'].onup,'');");
				obj.call("set(hotspot['temphotspots'].ondown,'');");
				obj.call("set(hotspot['temphotspots'].hots_id,"+data+");");
				obj.call("set(hotspot[get(jsnewspot)].linked_name,'"+newobj.linkedscene+"');");
				obj.call("set(hotspot['temphotspots'].onclick,if(isdelete,js(deleteHotspots("+data+")) ,skin_buttonglow(null);set(layer[tooltip].visible,false);tween(scale,0.25,0.5); tween(oy,-20,0.5); tween(alpha,0,0.5); looktohotspot();loadscene('"+newobj.linkedscene+"',null,get(skin_settings.loadscene_flags),get(skin_settings.loadscene_blend)); ));");
				obj.call("hotspot['temphotspots'].loadstyle();");
				obj.call("set(hotspot['temphotspots'].name,"+newobj.name+")");
				obj.call("skin_buttonglow(get(name),0.3)");
			}else{
				
			}			
		}
		
		function deleteHotspots_next(data){
			if(data == "")
				return;
			var strs = data.split("_!_");
			if(hmap.containsKey(strs[1])){
				var arr = hmap.get(strs[1]);
				if(arr!=null&&arr.length>0){
					for(var i = 0;i<arr.length;i++){
						var tempobj = arr[i];
						if(tempobj.id==parseInt(strs[0])){
							obj.call("set(layer[tooltip].visible,false)");
							obj.call("removehotspot("+tempobj.name+")");
							obj.call("set(isdelete,false)");
							obj.call("skin_buttonglow(get(name),0.3)");
							arr = arr.del(i);
							hmap.put(strs[1],arr);
							break;
						}
					}
				}
			}
		}
		
		var goodArray = new Array();
		var notGoodArray = new Array();
		function addGood_before(id){
			if(notGoodArray.length>0){
				for(var i = 0;i<notGoodArray.length;i++){
					if(notGoodArray[i]==id){
						return;
					}
				}
			}
			var cookieinfo = getCookie("weixin_info");
			var openid = "";
			if(cookieinfo == null){
				
			}else{
				cookieinfo = base64decode(cookieinfo);
				cookieinfo = utf8to16(cookieinfo);
				weixin_info = JSON.parse(cookieinfo);
				openid = weixin_info.openid;
			}
			if(goodArray.length==0){
				addGood(id,openid);
			}else{
				for(var i = 0;i<goodArray.length;i++){
					if(goodArray[i]==id){
						obj.call("showGood()");
						break;
					}else if(i==goodArray.length-1){
						addGood(id,openid);
					}
				}
			}
		}
		
		function addGood_next(data){
			var datas = data.split("_+_");
			if(datas[0]=="yes"){
				goodArray.push(datas[1]);
				obj.call("showGood_next("+datas[2]+")");
			}else{
				notGoodArray.push(datas[1]);
			}
				
		}
		
		function showGood_before(count,id){
			if(goodArray.length==0){
				obj.call("showGood_next("+count+")");
			}else{
				for(var i = 0;i<goodArray.length;i++){
					if(goodArray[i]==id){
						count = parseInt(count, 10);
						count += 1;
						obj.call("showGood_next("+count+")");
					}else if(i == goodArray.length-1){
						obj.call("showGood_next("+count+")");
					}
				}
			}
		}
		
		var viewArray = new Array();
		function addView_before(id){
			if(id == null || id == "null")
				return;
			if(viewArray.length==0){
				viewArray.push(id);
				addView(id);
			}else{
				for(var i = 0;i<viewArray.length;i++){
					if(viewArray[i]==id){
						break;
					}else if(i==viewArray.length-1){
						addView(id);
						viewArray.push(id);
					}
				}
			}
		}
		
		function IsPC() {
		    var userAgentInfo = navigator.userAgent;
		    var Agents = ["Android", "iPhone",
		                "SymbianOS", "Windows Phone",
		                "iPad", "iPod"];
		    var flag = true;
		    for (var v = 0; v < Agents.length; v++) {
		        if (userAgentInfo.indexOf(Agents[v]) > 0) {
		            flag = false;
		            break;
		        }
		    }
		    return flag;
		}
		
		function isWeiXin(){
		    var ua = window.navigator.userAgent.toLowerCase();
		    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		        return true;
		    }else{
		        return false;
		    }
		}
		
		function cancelComment(type){
			if(type==1){
				jQuery('.streetscape_say').hide();jQuery('.input_text').val('随便说点儿吧！（最多20个字）');
			}else if(type==2){
				jQuery('.streetscape_modal').hide();jQuery('.textarea').val('随便说点儿吧！（最多20个字）');
			}else{
				jQuery('.streetscape_say').hide();jQuery('.input_text').val('随便说点儿吧！（最多20个字）');
				jQuery('.streetscape_modal').hide();jQuery('.textarea').val('随便说点儿吧！（最多20个字）');
			}
			obj.call("cancelComment()");
			obj.set("auto_status",1);
			obj.call("startAutoRatote();");
		}
		
		function getCookie(name) {
			var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
			if(arr=document.cookie.match(reg))
				return unescape(arr[2]);
			else
				return null;
		}
		
		var weixin_info = null; 
		function showComment(){
			jQuery(".btn_primary").each(function(){
				jQuery(this).prop("disabled",false);
			});
			if(IsPC()){
				if(!jQuery(".streetscape_modal").is("visible")){
					jQuery(".input_text").val("随便说点儿吧！（最多20个字）");
					jQuery(".streetscape_modal").show();
				}
			}else{
				var cookieinfo = getCookie("weixin_info");
				if(cookieinfo == null){
					if(isWeiXin()){
						jQuery(".input_text").val("微信授权义田帮手应用后便可发表说一说！");
						jQuery(".input_text").attr("readonly","readonly");;
						jQuery(".streetscape_say").show();
						jQuery(".authorizebutton").html("授权");
						jQuery(".authorizebutton").attr("onclick","authorize()");
					}else{
						if(!jQuery(".streetscape_say").is("visible")){
							jQuery(".textarea").val("随便说点儿吧！（最多20个字）");
							jQuery(".streetscape_say").show();
						}
					}
				}else{
					cookieinfo = base64decode(cookieinfo);
					cookieinfo = utf8to16(cookieinfo);
					weixin_info = JSON.parse(cookieinfo);
					if(!jQuery(".streetscape_say").is("visible")){
						jQuery(".textarea").val("随便说点儿吧！（最多20个字）");
						jQuery(".streetscape_say").show();
						obj.call("setTempUrl("+weixin_info.headimgurl+")");
					}
				}
			}
			obj.call("stopRatote();");
		}
		
		function authorize(){
			if(top.location !== self.location){
				top.authorize();
			}
			var auth_now_url = window.location.href;
			auth_now_url = encodeURIComponent(auth_now_url);
			var redirect_url = domain+"/weixinservice/farmeasy/adopter?method=user_info&url="+auth_now_url;
			redirect_url = encodeURIComponent(redirect_url);
			var auth_url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid="+appId+"&redirect_uri="+redirect_url+"&response_type=code&scope=snsapi_userinfo&state=nonthing#wechat_redirect";
			window.location.href = auth_url;
		}
		
		function commentOk(type){
			if(type==1){
				var val = jQuery(".input_text").val();
				if(val=="随便说点儿吧！（最多20个字）"){
					return;
				}else if(val.length>20){
					//val = val.substring(0,20);  
					//jQuery(".input_text").val(val);
				}
			}else{
				var val = jQuery(".textarea").val();
				if(val=="随便说点儿吧！（最多20个字）"){
					return;
				}else if(val.length>20){
					//val = val.substring(0,20);  
					//jQuery(".textarea").val(val);
				}
			}
			jQuery(".btn_primary").each(function(){
				jQuery(this).prop("disabled",true);
			});
			jQuery(".input_text").blur();
			jQuery(".textarea").blur();
			obj.call("commentOk("+type+")");
		}
		
		function commentOk_before(){
			var type = arguments[0];
			var ath = arguments[1];
			var atv = arguments[2];
			var id = arguments[3];
			var html = "";
			if(type=="1"){
				html = jQuery(".input_text").val();
			}if(type == "2"){
				html = jQuery(".textarea").val();
			}
			var name = "";
			var head = "";
			var openid = ""; 
			if(weixin_info != null){
				openid = weixin_info.openid;
				name = weixin_info.nickname;
				head = weixin_info.headimgurl;
			}
			addComment(id,ath,atv,html,openid,name,head);
		}
		
		function addComment_next(data){
			if(data==""){
				cancelComment();
			}else{
				cancelComment();
				eval("var temparry = "+data+";");
				obj.call("initComment("+temparry.toString()+")");
				comment.push(temparry);
			}
		}
		
		function initComment(){
			if(comment.length>0){
				for(var i = 0;i<comment.length;i++){
					var tempobj = comment[i];
					if(tempobj[7] == arguments[0]){
						if(tempobj[4]==""){
							tempobj[4] = "noname";
						}
						if(tempobj[5]==""){
							tempobj[5] = "nouid";
						}
						if(tempobj[6]==""){
							tempobj[6] = "nohead";
						}
						obj.call("initComment("+tempobj.toString()+")");
					}
						
				}
			}
		}
		
		
		
		//开关按钮
		function OnoffFn( obj ){		
			 jQuery( obj ).hasClass('onoff') ? jQuery(obj).removeClass('onoff')	: jQuery(obj).addClass('onoff')	
		}
		
		//开启模态框
		function OpenModal( modalBlock ){
			jQuery( modalBlock ).show();
			jQuery('.bg_mark').show();	
		}
		//关闭模态框
		function CloseModal( modalBlock ){
			jQuery( modalBlock ).hide();
			jQuery('.bg_mark').hide();	
		}
		
		var re= /^(13[0-9]|15[012356789]|17[01236789]|18[0-9]|14[57])[0-9]{8}$/;
		function checkPhone(phone){
			if(""==phone || "请输入手机号"==phone){
				return false;
			}else if(!re.test(phone) || phone.length != 11){
				return false;
			}		
			return true;
		}
		
		var joinb = true;
		var contact_type;
		//只提交
		function checkJoin(){
			var val = jQuery("#join_phone").val();
			if(checkPhone(val)){
				if(joinb){
					addContact(krgid,val,1,obj.get("scene[get(xml.scene)].scene_id"));
					contact_type = 1;
				}else{
					jQuery(".modal_redpacket").hide();
				}
			}else{
				jQuery("#join_phone").css("border-color","#f00");
				return;
			}
		}
		
		//提交并且跳转红包页面
		function checkJoin2(){
			var val = jQuery("#join_phone").val();
			if(checkPhone(val)){
				if(joinb){
					addContact2(krgid,val,1,obj.get("scene[get(xml.scene)].scene_id"));
					contact_type = 1;
				}else{
					jQuery(".modal_redpacket").hide();
				}
			}else{
				jQuery("#join_phone").css("border-color","#f00");
				return;
			}
		}
		
		function openMark(){
			jQuery("#mark_phone").css("border-color","none");
			jQuery(".modal_mark").show();
		}
		
		function openJoinFarm(){
			jQuery("#join_phone").css("border-color","none");
			jQuery("#join_phone").val("请输入手机号");
			jQuery(".modal_redpacket").show();
		}
		
		var markb = true;
		function checkMark(){
			var val = jQuery("#mark_phone").val();
			if(checkPhone(val)){
				if(markb){
					addContact(krgid,val,0,obj.get("scene[get(xml.scene)].scene_id"));
					contact_type = 0;
				}else{
					jQuery(".modal_mark").hide();
				}
			}else{
				jQuery("#mark_phone").css("border-color","#f00");
				return;
			}
		}
		
		function addContact_next(){
			if(contact_type == 0){
				jQuery(".modal_mark").hide();
				markb = false;
			}else if(contact_type == 1){
				jQuery(".modal_redpacket").hide();
				//joinb = false;
			}
		}
		
		function addContact_next2(){
			if(contact_type == 0){
				jQuery(".modal_mark").hide();
				markb = false;
			}else if(contact_type == 1){
				jQuery(".modal_redpacket").hide();
				customer(jQuery("#join_phone").val(),hb,pr,3);
				//joinb = false;
			}
		}
		
		function hideComment(){
			obj.call("displayAll(false)");
		}
		
		function showSceneInfo_next(){
			//jQuery("#SceneModal .modal-dialog").css({"margin-left":"-280px","margin-top":"-186px","left":"50%","top":"50%","position":"fixed","width":"560px"});
			jQuery("#SceneModal").show();
			//jQuery("#SceneModal .modal_body").niceScroll();
		}
		
		function showShare(){
			//jQuery("#ShareModal .modal-dialog").css({"margin-left":"-280px","margin-top":"-186px","left":"50%","top":"50%","position":"fixed","width":"560px"});
			jQuery("#ShareModal").show();
		}
		
		function showCard(){
			jQuery("#CardModal").show();
			jQuery('#MoreSetModal').hide();;
		}
		
		jQuery(document).ready(function(){
			var tempUrl = location.search;
			tempUrl = tempUrl.replace(new RegExp(/(\?)/g),"%3f");
			tempUrl = tempUrl.replace(new RegExp(/(&)/g),"%26");
			var code_url = mydomain+workpath+"/GenerateCodeImage?type=4&param="+tempUrl;
			jQuery(".code_pic").attr("src",code_url);
			jQuery(".ipt_link").val(location.href);
			jQuery(".btn_copy").click(function(){
				jQuery(".share_dialog .ipt_link").select();
				document.execCommand("Copy");
			});
			var wheight = document.body.clientHeight;
			var wwidth = document.body.clientWidth;
			if(false){
				//
				jQuery("#CardModal .modal-dialog").css({"margin-left":"-280px","margin-top":"-186px","left":"50%","top":"50%","position":"fixed","width":"560px"});
				jQuery("#SceneModal .modal-dialog").css({"margin-left":"-280px","margin-top":"-186px","left":"50%","top":"50%","position":"fixed","width":"560px"});
				jQuery("#MapModal .modal-dialog").css({"margin-left":"-280px","margin-top":"-280px","left":"50%","top":"50%","position":"fixed","width":"560px","height":"560px"});
			}else{
				var selfw = wwidth*0.9;
				var selfh = wheight*0.8;
				var selfl = wwidth*0.05;
				var selft = wheight*0.1;
				var content_height = selfh-51;
				jQuery("#CardModal .modal-body").css({height:content_height+"px"});
				jQuery("#CardModal").css({"left":selfl+"px","top":selft+"px","position":"absolute","max-width":(selfw+"px"),"width":(selfw+"px"),"height":(selfh+"px")});
				//jQuery("#SceneModal .modal-body").css({height:(content_height)+"px"});
				jQuery("#SceneModal").css({"left":selfl+"px","top":selft+"px","position":"absolute","max-width":(selfw+"px"),"width":(selfw+"px"),"height":(selfh+"px")});
				
				
				jQuery("#MapModal").css({"left":selfl+"px","top":selft+"px","position":"absolute","width":(selfw+"px"),"height":(selfh+"px")});
			}
			//jQuery('#CardModal').on('shown.bs.modal', function () {
				//jQuery("#CardModal .modal_body").niceScroll({horizrailenabled:false,cursorcolor:"#919191",cursorwidth:6,cursoropacitymin:0.5,cursoropacitymax:0.7,touchbehavior:false,autohidemode:false,touchbehavior: true,cursordragontouch: true});
			//});
			//jQuery('#SceneModal').on('shown.bs.modal', function () {
			//	jQuery("#SceneModal .modal_body").niceScroll({horizrailenabled:false,cursorcolor:"#919191",cursorwidth:6,cursoropacitymin:0.5,cursoropacitymax:0.7,touchbehavior:false,autohidemode:false,touchbehavior: true,cursordragontouch: true});
			//});
		});
		
		function closeCardModal(){
			if(jQuery( ".setRotateShow div" ).hasClass('onoff')){
				obj.set("auto_status",1);
			}
			obj.call("startAutoRatote()");
			if(jQuery("#MoreSetModal").attr("isVisible") == "true"){
				jQuery("#MoreSetModal").show();
			}
			jQuery("#CardModal").hide();
		}
		
		function closeSceneModal(){
			if(jQuery( ".setRotateShow div" ).hasClass('onoff')){
				obj.set("auto_status",1);
			}
			obj.call("startAutoRatote()");
			jQuery("#SceneModal").hide();
		}
		
		function closeMoreSet(){
			if(jQuery( ".setRotateShow div" ).hasClass('onoff')){
				obj.set("auto_status",1);
			}
			obj.call("startAutoRatote()");
			jQuery("#MoreSetModal").hide();
		}
		
		
		function openMap(baseId,lat,lng){
			jQuery("#MapModal").show();
			jQuery("#mapIframe").show();
			jQuery("#mapIframe").attr("src",domain+workpath+"/panorama/index.html?baseId="+baseId+"&coordinateX="+lat+"&coordinateY="+lng+"&domainUrl="+domain+(assetShow=="true"?"&assetShow=1":""));
		}
		
		function closeKrpanoIframe(){
			jQuery("#mapIframe").attr("src","");
			jQuery("#MapModal").hide();;
		}
		
		function navigation(latlng,title,address){
			navigation_url = navigation_url.replace(new RegExp(/(#latlng#)/g),latlng);
			navigation_url = navigation_url.replace(new RegExp(/(#title#)/g),title);
			navigation_url = navigation_url.replace(new RegExp(/(#address#)/g),address);
			window.location.href=navigation_url;
		}
		
		function setCardShow(){
			jQuery(".setCardShow").show();
			jQuery("#MoreSetModal").attr("isVisible",true);
		}
		
		function setRotateShow(){
			jQuery(".setRotateShow").show();
			jQuery("#MoreSetModal").attr("isVisible",true);
		}
		
		function setRotateShow_next(obj1){
			if(jQuery( obj1 ).hasClass('onoff')){
				jQuery(obj1).removeClass('onoff');
				obj.call("stopRatote()");
			}else{
				jQuery(obj1).addClass('onoff');
				obj.call("startAutoRatote()");
			}
		}
		function setRotateShow_Postion(obj){
			if(obj == 1){
				jQuery(".setRotateShow").find("div").addClass('onoff');
			}else{
				jQuery(".setRotateShow").find("div").removeClass('onoff');
			}
		}
		
		function setGyroShow(){
			jQuery(".setGyroShow").show();
			jQuery("#MoreSetModal").attr("isVisible",true);
		}
		
		function setGyroShow_next(obj1){
			if(jQuery( obj1 ).hasClass('onoff')){
				jQuery(obj1).removeClass('onoff');
				obj.call("enableGyro(false)");
			}else{
				jQuery(obj1).addClass('onoff');
				obj.call("enableGyro(true)");
			}
		}
		function setGyroShow_Postion(obj){
			if(obj == 1){
				jQuery(".setGyroShow").find("div").addClass('onoff');
			}else{
				jQuery(".setGyroShow").find("div").removeClass('onoff');
			}
		}
		
		function moreSetShow(){
			jQuery('#MoreSetModal').show();
		}
		function showWxTips(){
			jQuery("#WxTipsModal").show();
		}
//]]>


accessid = '';
accesskey = '';
host = '';
policyBase64 = '';
signature = '';
callbackbody = '';
filename = '';
key = '';
expire = 0;
g_object_name = '';
g_object_name_type = '';
now = timestamp = Date.parse(new Date()) / 1000; 
type=0;
id=0;
function send_request(obj,entId)
{
    var xmlhttp = null;
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
  
    if (xmlhttp!=null)
    {
        serverUrl = '/testUpload?type='+obj+'&id='+entId;
        xmlhttp.open( "GET", serverUrl, false );
        xmlhttp.send( null );
        return xmlhttp.responseText;
    }
    else
    {
        alert("Your browser does not support XMLHTTP.");
    }
};

function check_object_radio() {
	g_object_name_type = 'random_name';

}

function get_signature(obj,entId)
{
    //可以判断当前expire是否超过了当前时间,如果超过了当前时间,就重新取一下.3s 做为缓冲
    now = timestamp = Date.parse(new Date()) / 1000; 
    if (expire < now + 3)
    {
        body = send_request(obj,entId);
        var obj = eval ("(" + body + ")");
        host = obj['host'];
        policyBase64 = obj['policy'];
        accessid = obj['accessid'];
        signature = obj['signature'];
        expire = parseInt(obj['expire']);
        callbackbody = obj['callback'] ;
        key = obj['dir'];
        return true;
    }
    return false;
};

function random_string(len) {
len = len || 32;
var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';   
var maxPos = chars.length;
var pwd = '';
for (i = 0; i < len; i++) {
pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

function get_suffix(filename) {
    pos = filename.lastIndexOf('.');
    suffix = '';
    if (pos != -1) {
        suffix = filename.substring(pos);
    }
    return suffix;
}

function calculate_object_name(filename)
{
    if (g_object_name_type == 'local_name')
    {
        g_object_name += "${filename}";
    }
    else if (g_object_name_type == 'random_name')
    {
        suffix = get_suffix(filename);
        g_object_name = key + random_string(5) + suffix;
    }
    return '';
}

function get_uploaded_object_name(filename)
{
    if (g_object_name_type == 'local_name')
    {
        tmp_name = g_object_name;
        tmp_name = tmp_name.replace("${filename}", filename);
        return tmp_name;
    }
    else if(g_object_name_type == 'random_name')
    {
        return g_object_name;
    }
}

function set_upload_param(up, filename, ret,obj,entId)
{
	type=obj;
	id=entId;
	if (ret == false)
    {
        ret = get_signature(obj,entId);
    }
    g_object_name = key;
    if (filename != '') {
        suffix = get_suffix(filename);
        calculate_object_name(filename);
    }
    new_multipart_params = {
        'key' : g_object_name,
        'policy': policyBase64,
        'OSSAccessKeyId': accessid, 
        'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
        'callback' : callbackbody,
        'signature': signature,
    };

    up.setOption({
        'url': host,
        'multipart_params': new_multipart_params
    });
    up.start();
}

//创建实例的构造方法
var uploader1 = new plupload.Uploader({
	//上传插件初始化选用哪种优先级顺序，如果第一个初始化失败就走第二个
	runtimes : 'html5,flash,silverlight,html4',
	//触发浏览文件按钮标签的唯一id
	browse_button : 'selectfiles1', 
	//多选对话框
	multi_selection: false,
	//展示上传文件列表的容器
	container: document.getElementById('container1'),
	//flash文件地址
	flash_swf_url : '/asset/lib/plupload-2.1.2/js/Moxie.swf',
	//silverlight文件地址
	silverlight_xap_url : '/asset/lib/plupload-2.1.2/js/Moxie.xap',
	//上传服务器地址
    url : 'http://oss.aliyuncs.com',
    //选择文件扩展名的过滤器，每个过滤规则只有title和ext两项[{title:}]
    filters: {
        mime_types : [ //允许上传图片和zip,rar文件以及视频文件
        { title : "Image files", extensions : "jpg,gif,png,bmp,jpeg,3gp" }, 
        ],
        max_file_size : '10mb', //最大只能上传10mb的文件
        prevent_duplicates : false //不允许选取重复文件
    },
    //初始化plupload实例，添加监听对象
	init: {
		//init执行完之后要执行的事件触发
		PostInit: function() {
		},
		//用户选择文件时触发
		FilesAdded: function(up, files) {
			plupload.each(files, function(file) {
				document.getElementById('ossfile1').innerHTML += '<div style="display:none"  id="' + file.id + '"><span id="honorFile">' + file.name + ' (' + plupload.formatSize(file.size) + ')</span><b1></b1>'
				+'<div class="progress"><div class="progress-bar" style="width: 0%"></div></div>'
				+'</div>';
			});
			document.getElementById('postfiles1').click(); 
		},
		//文件上传完之前触发的事件
		BeforeUpload: function(up, file) {
            check_object_radio();
            set_upload_param(up, file.name, true,type,id);
        },
        //文件正在被上传中触发
		UploadProgress: function(up, file) {
			var d = document.getElementById(file.id);
			d.getElementsByTagName('b1')[0].innerHTML = '<span>' + file.percent + "%</span>";
            var prog = d.getElementsByTagName('div')[0];
			var progBar = prog.getElementsByTagName('div')[0];
			progBar.style.width= 2*file.percent+'px';
			progBar.setAttribute('aria-valuenow', file.percent);
		},
		//文件上传成功时触发
		FileUploaded: function(up, file, info) {
            if (info.status == 200)
            {
                document.getElementById(file.id).getElementsByTagName('b1')[0].innerHTML = oss_url +"/"+ get_uploaded_object_name(file.name);
                document.getElementById('callback1').click(); 
            }
            else
            {
                document.getElementById(file.id).getElementsByTagName('b1')[0].innerHTML = info.response;
            } 
		},
		
		Error: function(up, err) {
            if (err.code == -600) {
            	parent.document.getElementById("productMsg").innerHTML = "上传图片大于10M！";
				$("#myModal").modal('show');
            }
            else if (err.code == -601) {
            	parent.document.getElementById("productMsg").innerHTML = "图片格式不正确，请上传jpg,gif,png,bmp,jpeg,3gp格式的图片";
				$("#myModal").modal('show');
            }
            else if (err.code == -602) {
            	parent.document.getElementById("productMsg").innerHTML = "该图片已经上传过了！";
				$("#myModal").modal('show');
            }
            else 
            {
            	parent.document.getElementById("productMsg").innerHTML = "暂时不支持当前浏览器，请更换火狐、谷歌浏览器或者将360浏览器切换为极速模式" ;
				$("#myModal").modal('show');
            }
		}
	}
});

uploader1.init();


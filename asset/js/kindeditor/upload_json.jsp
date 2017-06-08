<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.*,java.io.*" %>
<%@ page import="java.text.SimpleDateFormat" %>
<%@ page import="org.apache.commons.fileupload.*" %>
<%@ page import="org.apache.commons.fileupload.disk.*" %>
<%@ page import="org.apache.commons.fileupload.servlet.*" %>
<%@ page import="cn.acsm.newbackward.util.ImageManager" %>
<%@ page import="cn.acsm.newbackward.util.FileUtil" %>
<%@ page import="cn.acsm.newbackward.util.HttpVideoUtil" %>
<%@ page import="org.apache.commons.codec.binary.Base64" %>
<%@ page import="net.sf.json.JSONObject" %>
<%@ page import="java.util.List" %>
<%@ page import="org.json.simple.*" %>
<%
//文件保存目录路径
String savePath = ImageManager.SAVE_TO_PATH + "/bw/images/";
//SAVE_TO_PATH+File.separator+PROJECT_NAME+File.separator+IMG_PATH

//文件保存目录URL
String saveUrl  = "/newbw/bw/images/";

//定义允许上传的文件扩展名
HashMap<String, String> extMap = new HashMap<String, String>();
extMap.put("image", "gif,jpg,jpeg,png,bmp");
//extMap.put("flash", "swf,flv");
//extMap.put("media", "swf,flv,mp3,wav,wma,wmv,mid,avi,mpg,asf,rm,rmvb");
//extMap.put("file", "doc,docx,xls,xlsx,ppt,htm,html,txt,zip,rar,gz,bz2");

//最大文件大小
long maxSize = 1024000;

response.setContentType("text/html; charset=UTF-8");

if(!ServletFileUpload.isMultipartContent(request)){
	out.println(getError("请选择文件。"));
	return;
}
//检查目录
File uploadDir = new File(savePath);
if(!uploadDir.isDirectory()){
	uploadDir.mkdirs();
}


String dirName = request.getParameter("dir");
if (dirName == null) {
	dirName = "image";
}

//创建文件夹

File saveDirFile = new File(savePath);
if (!saveDirFile.exists()) {
	saveDirFile.mkdirs();
}
SimpleDateFormat sdf = new SimpleDateFormat("yyyyMM");
String ymd = sdf.format(new Date());
savePath += ymd + "/";
saveUrl += ymd + "/";
File dirFile = new File(savePath);
if (!dirFile.exists()) {
	dirFile.mkdirs();
}

FileItemFactory factory = new DiskFileItemFactory();
ServletFileUpload upload = new ServletFileUpload(factory);
upload.setHeaderEncoding("UTF-8");
List items = upload.parseRequest(request);
Iterator itr = items.iterator();
String enterpriseId = request.getParameter("enterpriseId");
String directoryType = request.getParameter("directoryType");
String businessType = request.getParameter("businessType");
while (itr.hasNext()) {
	FileItem item = (FileItem) itr.next();
	String fileName = item.getName();
	long fileSize = item.getSize();
	if (!item.isFormField()) {
// 		//检查文件大小
// 		if(item.getSize() > maxSize){
// 			out.println(getError("上传文件大小超过限制。"));
// 			return;
// 		}
// 		//检查扩展名
// 		String fileExt = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();
// 		if(!Arrays.<String>asList(extMap.get(dirName).split(",")).contains(fileExt)){
// 			out.println(getError("上传文件扩展名是不允许的扩展名。\n只允许" + extMap.get(dirName) + "格式。"));
// 			return;
// 		}

// 		SimpleDateFormat df = new SimpleDateFormat("yyyyMMddHHmmss");
// 		String newFileName = df.format(new Date()) + "_" + new Random().nextInt(1000) + "." + fileExt;
// 		try{
// 			File uploadedFile = new File(savePath, newFileName);
// 			item.write(uploadedFile);
// 		}catch(Exception e){
// 			out.println(getError("上传文件失败。"));
// 			return;
// 		}
// 		String baTemp=Base64.encodeBase64URLSafeString(item.get());
		JSONObject json = ImageManager.insertImage(item.get(),fileName, Integer.parseInt(directoryType), "other",Integer.parseInt(enterpriseId));
		if(json.get("videoResult").equals("yes")){
			if("ok".equals(json.getString("result"))){
				JSONObject json2 = json.getJSONObject("url");
				String imgurl = json2.getString("fileUrl");
				JSONObject obj = new JSONObject();
				obj.put("error", 0);
				obj.put("url", imgurl);
				out.println(obj.toString());
			}
		}
// 		StringBuffer url = new StringBuffer();
// 		JSONObject result = new JSONObject();
// 		JSONObject result1 = new JSONObject();
// 		List<JSONObject> jsonObjList = new ArrayList<JSONObject>();
// 		String methodName="other";
// 		result.element("method_name",methodName);
// 		result1.element("wide", "300");
// 		result1.element("high", "300");
// 		result.element("parameter", result1);
// 		jsonObjList.add(result);
		
// 		url.append("http://localhost:8080/UploadFileInterface/imageupload?");
// //		url.append(ImageManager.IMG_URL+"/UploadFileInterface/imageupload?");
// 		if(directoryType==31){
// 			url.append("businessType=4&");
// 		}else{
// 			url.append("businessType=3&");
// 		}
// 		url.append("catalogType="+businessType+"&");
// 		url.append("suffix="+FileUtil.getFileExt(fileName)+"&");
// 		url.append("md5="+MD5.getMD5(item.get())+"&");
// 		url.append("imageFormatJson="+jsonObjList+"&");
// 		url.append("entId="+enterpriseId);
// 		try {
// 			String data=HttpVideoUtil.getInvokePOSTMethod(url.toString(), "fileData="+baTemp);
// 			json=JSONObject.fromObject(data);
// 			json.put("videoResult", "yes");
// 			json.put("saveMessage", saveMessage);
// 			if(json.get("videoResult").equals("yes")){
// 				if("ok".equals(json.getString("result"))){
// 					JSONObject json2 = json.getJSONObject("url");
// 					imgurl = json2.getString("fileUrl");
					
// 					JSONObject obj = new JSONObject();
// 					obj.put("error", 0);
// 					obj.put("url", imgurl);
// 					out.println(obj.toJSONString());
// 				}
// 			}
// 		} catch (Exception e) {
// 			json.put("videoResult", "no");
// 			json.put("saveMessage", "上传超时请从新上传");
// 		}
		
		
		
	}
}
%>
<%!
private String getError(String message) {
	JSONObject obj = new JSONObject();
	obj.put("error", 1);
	obj.put("message", message);
	return  obj.toString();
}
%>
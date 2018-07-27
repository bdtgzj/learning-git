<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>文件上传</title>
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="this is my page">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">

	<!--装载文件-->
	<link  href="<%=basePath %>admin/uploadify/uploadify.css"  rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="<%=basePath %>admin/jquery-easyui/jquery-1.7.2.min.js"></script>
	<script type="text/javascript" src="<%=basePath %>admin/uploadify/swfobject.js"></script>
    <script type="text/javascript" src="<%=basePath %>admin/uploadify/jquery.uploadify.v2.1.4.min.js"></script>
<!--ready事件-->
<script type="text/javascript">
	<!--
		$(document).ready(function(){
		   
		$("#uploadify").uploadify({
		     'uploader'       : '<%=basePath %>admin/uploadify/uploadify.swf',
		     'script'         : '<%=basePath %>test/uploadtest.htm',
		     'method'         : 'post',
		     'cancelImg'      : '<%=basePath %>admin/uploadify/cancel.png',
		     'folder'         : 'uploads',//上传文件的目录
             'fileDataName'   : 'uploadify',//和input的name属性值保持一致就好，Struts2就能处理了
             'queueID'        : 'fileQueue',
             'auto'           : false,//是否选取文件后自动上传
             'multi'          : true,//是否支持多文件上传
             'simUploadLimit' : 2,//每次最大上传文件数
             'buttonText'     : 'BROWSE',//按钮上的文字
             'displayData'    : 'speed',//有speed和percentage两种，一个显示速度，一个显示完成百分比 
             'fileDesc'       : '支持格式:jpg/gif/jpeg/png/bmp.', //如果配置了以下的'fileExt'属性，那么这个属性是必须的 
             'fileExt'        : '*.jpg;*.gif;*.jpeg;*.png;*.bmp',//允许的格式
             'onComplete'     : function (event, queueID, fileObj, response, data){
                $("#result").html(response);//显示上传成功结果
               setInterval("showResult()",2000);//两秒后删除显示的上传成功结果
             }
         });
     });
     
     function showResult(){//删除显示的上传成功结果
       $("#result").html("");
     }
     function uploadFile(){//上传文件
      jQuery('#uploadify').uploadifyUpload();
     }
     function clearFile(){//清空所有上传队列
         jQuery('#uploadify').uploadifyClearQueue();
     }
		// -->
</script>
  </head>

  <body>
  	<div id="fileQueue"></div>
        <input type="file" name="uploadify" id="uploadify" />
        <p>
        <a href="javascript:uploadFile()">开始上传</a>&nbsp;
        <a href="javascript:clearFile()">取消所有上传</a>
        </p>
        <div id="result"></div><!--显示结果-->
  </body>
</html>

function WebChatLogin(argument) {
	this.uid =false;
	this.timer;
	this.tip =0;
	this.loginUserInfo =new Object();
	window.QRLogin = new Object();
}
WebChatLogin.prototype.getQrcodeImageUrl = function()
{
	this.getUid();
	if(this.uid)
	{
		return WebChatLogin.QRCODEIMAGE_URL+this.uid;
	}else
	{
		return false;
	}
};

WebChatLogin.CROSSURL="crossrequest/crossdomain.php";
WebChatLogin.QRCODEIMAGE_URL="https://login.weixin.qq.com/qrcode/";
WebChatLogin.prototype.getUid = function()
{
	var self =this;
	var param = new Object();
	param.appid="wx782c26e4c19acffb";
	param.redirect_uri="https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxnewloginpage";
	param.fun="new";
	param.lang="zh_CN";
	param._=Date.parse(new Date());
	var url ="https://login.wx.qq.com/jslogin?appid=wx782c26e4c19acffb&redirect_uri=https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxnewloginpage&fun=new&lang=zh_CN&_="+Date.parse(new Date());
		$.ajax(
	{
		url:WebChatLogin.CROSSURL,
		cache:false, 
       	async:false, 
		type:"GET",
		data:{"param":param, "type":"GET", "url":url},
		success:function(response)
		{
			eval(response);
			self.uid = window.QRLogin.uuid;
			
		}
	})
};
WebChatLogin.prototype.getUserInfo =function()
{
	var self = this;
	var unixtimespan = ~Date.parse(new Date());
	var url = "https://wx2.qq.com/cgi-bin/mmwebwx-bin/webwxinit?r="+unixtimespan;
	var DeviceId="e" + ("" + Math.random().toFixed(15)).substring(2, 17);
	var param = new Object();
	param.BaseRequest = new Object();
	param.BaseRequest.DeviceID = DeviceId;
	param.BaseRequest.Sid = self.loginUserInfo.wxsid;
	param.BaseRequest.Skey = self.loginUserInfo.skey;
	param.BaseRequest.Uin = self.loginUserInfo.wxuin;

	$.ajax({
			url:WebChatLogin.CROSSURL, 
			data:{url:url, param:param, type:"POST"},
			dataType:"json",
			success:function(data)
			{
				console.log(data);
			}
		});
}
WebChatLogin.prototype.getLoginUserInfo = function(wxurl)
{
	var self = this;
	var url = WebChatLogin.CROSSURL;
	var type="GET";
	var param = new Object();
	param.url = wxurl + "&fun=new&version=v2";
	param.type="GET";
	
	$.ajax({
		url: url,
		type: type,
		cache:false, 
		async:false,
		dataType: 'xml',
		data: param,
		success:function(xml)
		{
			var jqXml = $(xml);
			self.loginUserInfo.skey =jqXml.find("skey").text();
			self.loginUserInfo.wxsid = jqXml.find("wxsid").text();
			self.loginUserInfo.wxuin = jqXml.find("wxuin").text();
			self.loginUserInfo.pass_ticket = jqXml.find("pass_ticket").text();
			console.log(self.loginUserInfo);
		}
	})
	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
};
WebChatLogin.prototype.queryScanQrcodResult = function()
{
	var self = this;
	var unixtimespan = ~Date.parse(new Date());
	var param = new Object();
	param.loginicon=true;
	param.uuid=this.uid;
	param.tip=this.tip;
	param.r=unixtimespan;
	var url = "https://login.weixin.qq.com/cgi-bin/mmwebwx-bin/login?loginicon=true&uuid="+this.uid+"&tip="+this.tip+"&r="+unixtimespan;
	var callback = function()	{$.ajax(
												{
													url:WebChatLogin.CROSSURL,
													type:"GET",
													cache:false, 
       												async:false, 
													data:{url:url, "param":param, type:"GET"},
													success:function(code)
													{
														eval(code);
														if(window.code==408)
														{
															console.log("登录超时！");
														}else if(window.code==201)
														{
															self.tip = 1;
															console.log("scan success!");
														}else if(window.code == 200)
														{
															console.log("success!");
															self.getLoginUserInfo(window.redirect_uri);
															self.getUserInfo();
															self.timer.stop();
														}
													}
												}
											);
									};
								
	this.timer = new Timer({
									timespan:27000, 
									callBack:callback
								}
							);
	this.timer.start();
};


$(document).ready(function()
{
	var login = new WebChatLogin();
	var imageUrl = login.getQrcodeImageUrl();
	$("#loginimage").attr("src", imageUrl);
	if(imageUrl)
		login.queryScanQrcodResult();
});
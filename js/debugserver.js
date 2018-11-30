$(document).ready(function()
{

	$("#queryScanStatus").on("click", function()
	{
		var uid = $(this).data("uid");
		var loginfo = new Object();
		var getUserInfo = function()
		{
			$.ajax({
				url: 'tests/queryscanstatus.php',
				type: 'GET',
				dataType: 'json',
				data: {info: loginfo,method:"userinfo", uid:uid},
				success:function(userinfo)
				{
					console.log(userinfo);
				}
			});
			
			
		};
		var getLoginInfo = function()
		{
			$.ajax(
			{
				url:"tests/queryscanstatus.php",
				data:{uid:uid, url:window.redirect_uri, "method":"logininfo"},
				type:"GET",
				dataType:"xml",
				success:function(info)
				{
					var infoObj =$(info);
					loginfo.skey = infoObj.find("skey").text();
					loginfo.wxsid = infoObj.find("wxsid").text();
					loginfo.wxuin = infoObj.find("wxuin").text();
					loginfo.pass_ticket = infoObj.find("pass_ticket").text();
					loginfo.deviceid = "e" + ("" + Math.random().toFixed(15)).substring(2, 17);
					getUserInfo();

				}
			});

		};
		$.ajax(
		{
			url:"tests/queryscanstatus.php",
			data:{uid:uid,"method":"scan"},
			type:"GET",
			dataType:"text",
			success:function(data)
			{
				eval(data);
				var code = window.code;
				switch(code)
				{
					case 408:
						console.log("未扫码");
					break;
					case 201:
						console.log("已扫码，未确认登录！");
					break;
					case 200:
						console.log("登录成功！");
						getLoginInfo();
					break;
				}
			}
		});
	});
})
<?php 
	require "../vendor/autoload.php";
		use webchat\WebchatLogin;
		$uid = $_GET["uid"];
		$login = new WebchatLogin();
		$login -> uid = $uid;
		if($_GET["method"] == "scan")
		{
			$result = $login ->queryScanQrcodResult();
			echo $result;
		}else if($_GET["method"] =="logininfo")
		{
			$url = $_GET["url"];
			$result = $login ->getLoginUserInfo($url);
			echo $result;
		}else if($_GET["method"]=="userinfo")
		{
			$info = $_GET["info"];
			$result = $login ->getUserInfo($info);
			echo $result;

		}
		
		
 ?>
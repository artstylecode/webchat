<?php 
		require "vendor/autoload.php";
		use webchat\WebchatLogin;
		$login = new WebchatLogin();
		
		
		$imageUrl = $login ->getQrcodeImageUrl();
		echo "<img src='$imageUrl' />";
		//检测扫描状态
		$login ->queryScanQrcodResult();


 ?>
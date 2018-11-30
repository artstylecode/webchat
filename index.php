<?php 
	require "vendor/autoload.php";
	require "vendor/autoload.php";
		use webchat\WebchatLogin;
		$login = new WebchatLogin();
		
		
		$imageUrl = $login ->getQrcodeImageUrl();
		
 ?>
 <!DOCTYPE html>
 <html>
 <head>
 	<title>webchat login</title>
 	<link rel="stylesheet" href="vendor/twbs/bootstrap/dist/css/bootstrap.min.css">
 	<script type="text/javascript" src="vendor/components/jquery/jquery.min.js"></script>
 	<link rel="stylesheet" href="vendor/twbs/bootstrap/dist/js/bootstrap.min.js">
 	<script type="text/javascript" src="js/timer.js"></script>
 	<script type="text/javascript" src="js/debugserver.js"></script>
 </head>
 <body>
 	<div class="container center-block">
 		
	<div class="row">
		  <div >
		    <a href="javascript:;" class="thumbnail">
		      <img id="loginimage" src="<?=$imageUrl?>" />
		    </a>
		  </div>	
	</div>
	<button data-uid="<?=$login -> uid?>"  class="btn btn-info" id="queryScanStatus">查询</button>

 	
 	</div>
 	
 </body>
 </html>
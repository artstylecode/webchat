<?php 
	require "../vendor/autoload.php";
	use GuzzleHttp\Client;
	use GuzzleHttp\Psr7\Request;
	$url = $_GET["url"];
	$type=$_GET["type"];
	$param = isset($_GET["param"])?$_GET["param"]:array();
	$client = new Client();
	$requestParam = array();
	if($type=="POST")
	{
		$requestParam = 
		[
			"form_params" => $param
		];
	}else if($type=="GET")
	{
		$requestParam = 
		[
			"query" => $param
		];
	}
	$request = new Request($type, $url, $requestParam);
	$response = $client ->send($request, $param);
	if($response ->getStatusCode()==200)
	{
		echo $response ->getBody();
	}else
	{
		echo false;
	}
 ?>
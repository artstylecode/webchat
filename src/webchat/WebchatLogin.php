<?php
	namespace webchat;
	use GuzzleHttp\Client;
	use GuzzleHttp\Psr7\Request;
	/**
	 * webchat login
	 */
	class WebchatLogin
	{
		const GETUID_URL="https://login.wx2.qq.com/jslogin";
		const UID_KEY="window.QRLogin.uuid";
		const QRCODE_URL="https://login.weixin.qq.com/qrcode/";
		const CHECKESCAN_URL="https://login.weixin.qq.com/cgi-bin/mmwebwx-bin/login";
		const GETUSERINFO_URL = "https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxinit";
		const LOGINUSERINFO_PARAM="&fun=new&version=v2";
		public $uid;
		private $client;
		public function __construct()
		{
			$this -> client = new Client();
		}
		public function getUid()
		{
        	
			$param = 
			[
				"appid"=> "wx782c26e4c19acffb",
				"redirect_uri"=>urlencode("https://wx.qq.com/cgi-bin/mmwebwx-bin/webwxnewloginpage"),
				"fun"=>"new",
				"lang"=>"en_US",
				"_"=> microtime()

			];
			$reqParam = 
			[
				"query" => $param
			];

			$response = $this -> client ->request("GET", self::GETUID_URL, $reqParam);
			if($response->getStatusCode()==200)
			{
				$body = $response ->getBody();
				$uid = "";
				$jsArray = explode(";", $body);
				foreach ($jsArray as $js) {
					$infoArray = explode("\"", $js);
					
					if(strpos($infoArray[0], self::UID_KEY))
					{
						$this -> uid = $infoArray[1];
						str_replace("\"","", $uid);
					}
				}
				
				return $this -> uid;
			}
			return false;
		}

		public function getQrcodeImageUrl()
		{
			$uid = $this->getUid();
			if(!$uid)
				return "";
			
			return self::QRCODE_URL.$uid;
		}
		public function getUserInfo($logininfo)
		{
			$timespan = ~microtime();
			$DeviceID;
			$url = self::GETUSERINFO_URL."r=$timespan&pass_ticket=".$logininfo["pass_ticket"];
			$params = array();
			$params["BaseRequest"] = 
			[
				"DeviceID" => $logininfo["deviceid"],
				"Sid" => $logininfo["wxsid"],
				"Skey" => $logininfo["skey"],
				"Uin" => $logininfo["wxuin"]
			];
			$response = $this ->client ->request("POST", $url, [
				"form_params" => $params
			]);
			$body = $response ->getBody();

			return $body;
		}
		public function getLoginUserInfo($url)
		{
			$response = $this->client ->request("GET", $url.self::LOGINUSERINFO_PARAM);
			$body = $response ->getBody();
			var_dump($response ->getHeaders());
			return $body;
		}
		public function queryScanQrcodResult()
		{
			$currenttime = microtime();
			$param = 
			[
				"loginicon" => true,
				"uuid" => $this -> uid,
				"tip" => 0,
				"r" => ~$currenttime,
				"_" => $currenttime
			];
			$reqParam = 
			[
				"query" => $param
			];
			$response = $this -> client ->request("GET", self::CHECKESCAN_URL, $reqParam);
			$body = $response -> getBody();
			return $body;
			
		}
	}
 ?>
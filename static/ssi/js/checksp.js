;(function($){
	$.fn.checkSP = function(){
		var deviceWidth = document.documentElement.clientWidth;
		function ua(tgt) {
			var nut = navigator.userAgent.toLowerCase();
			var uaChk = {
				"iphone"	:nut.indexOf("iphone") != -1, //iPhone
				"ipad"		:nut.indexOf("ipad") != -1,	 //iPad
				"android" :nut.indexOf("android") != -1,	//Android 
				"mobile"	:nut.indexOf("mobile") != -1, //Android 'android' かつ 'mobile' の場合、androidスマートフォンと判定
				"ie"	:nut.indexOf("ie") != -1
			};
			return uaChk[tgt];
		}
		if(sessionStorage['view'] == 'pc'){
			return false;
		}else if(ua('iphone') || (ua('android') && ua('mobile')) || deviceWidth <= 480){
			return true;
		}else{
			return false;
		}
	}
})(jQuery);
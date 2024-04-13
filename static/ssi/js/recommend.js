$(function() {
	$(window).on("message", function(e) {
		if(typeof(e.originalEvent.data) == "string" && e.originalEvent.data.match(/rcmtag/)) {
			var obj = $.parseJSON(e.originalEvent.data);
			if(obj.rcmtag != "") {
				document.getElementById("recommend_tag").innerHTML =
				document.getElementById("recommend_tag").innerHTML.replace("<!-- [[recommend_tag]] -->", decodeURIComponent(obj.rcmtag));
				document.getElementById("recommend_tag").style.display="block";
			} else {
				if(document.getElementById("recommend_tag")) {
					var recommend_obj = document.getElementById("recommend_tag");
					var recommend_obj_parent = recommend_obj.parentNode;
					recommend_obj_parent.removeChild(recommend_obj);
				}
			}
		}
	});

	var ua = navigator.userAgent;
	if (ua.match("MSIE") || ua.match("Trident") || ua.match("Edge")) {
		recommend_postMessage();
	} else {
		$(window).load(function() {
			recommend_postMessage();
		});
	}

	function recommend_postMessage() {
		var recommend_user = "iritokyo";
		var self_url = location.href;
		var rcvtag = 0;
		if(document.getElementById("recommend_tag")) rcvtag = 1;
		var data = '{"url":"https://www.netcrew-analysis.jp/recommend/recommend.php", "params":{"data1":"' + self_url + '","data2":"' + recommend_user + '","data3":"' + rcvtag + '"}}';
		try {
			oProxy.postMessage(data, '*'); 
		} catch(e) {
			try {
				oProxy.contentWindow.postMessage(data, '*')
			} catch(e) {
				//alert("Error");
			}
		}
	}
});
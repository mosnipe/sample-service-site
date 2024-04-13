//――――――――――――――――――――――――――――――――――――――
// 作成者:るび&#12316;  ACCESS R  http://www5e.biglobe.ne.jp/~access_r/
//
//　　2009.2.14　
//　　変更：ネットクルー　セレクトメニュー仕様をボタン操作仕様に
//――――――――――――――――――――――――――――――――――――――

//――――――――――――――――――――――――――――――――――――――
// ユーザが設定する部分はここから！！
//――――――――――――――――――――――――――――――――――――――

var cssfile = new Array();
cssfile[0] = "ssi/css/color-white.css";	//デフォルトのスタイルシートファイル
cssfile[1] = "ssi/css/color-black.css";	//黒色のスタイルシートファイル
cssfile[2] = "ssi/css/color-blue.css";	//青色のスタイルシートファイル

//――――――――――――――――――――――――――――――――――――――
// ユーザが設定する部分はここまで！！
//――――――――――――――――――――――――――――――――――――――


var css = GetCookie("CSS");
if(css == ""){css = cssfile[0];}
document.write('<LINK REL="stylesheet" HREF="/' + css + '" TYPE="text/css">');
/*
function SetCss(sel){
	if(sel.options[sel.selectedIndex].value){
		SetCookie("CSS", cssfile[sel.options[sel.selectedIndex].value - 1]);
		window.location.reload();
//document.movie.SetVariable("_level0.hyouji", sel.options[sel.selectedIndex].value);
	}
}
*/

function SetCss(val){
	SetCookie("CSS", cssfile[val - 1]);
	window.location.reload();
}



function GetCookie(key){
	var tmp = document.cookie + ";";
	var index1 = tmp.indexOf(key, 0);
	if(index1 != -1){
		tmp = tmp.substring(index1, tmp.length);
		var index2 = tmp.indexOf("=", 0) + 1;
		var index3 = tmp.indexOf(";", index2);
		return(unescape(tmp.substring(index2,index3)));
	}

	return("");
}



function SetCookie(key, val){
	document.cookie = key + "=" + escape(val) + ";expires=Fri, 31-Dec-2030 23:59:59;";
}
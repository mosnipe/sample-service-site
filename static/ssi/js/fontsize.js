/*
===========================================================
フォントサイズ変更スクリプト（タイプC）
Last Updated:09/21/2001

insomnia!Web Labo.
http://www3.airnet.ne.jp/insomnia/
http://www3.airnet.ne.jp/insomnia/labo/fsc/fscC.html
===========================================================
*/

/*
========== ::: 初期設定 ::: ==========
*/

// 値の単位を設定（必ずダブルクオートかクオートで括る）
var fontSizeUnit = "%";

// 一回の操作で変化させる値を設定（ダブルクオートやクオートで括らない）
var perOrder = 20;

// 初期状態の値を設定（ダブルクオートやクオートで括らない）
var defaultSize = 90;

// クッキーの名前（必ずダブルクオートかクオートで括る）
var ckName = "ckfontsize";

// クッキーの有効期限（日）（ダブルクオートやクオートで括らない）
var ckDays = 2;

// クッキーのパス（必ずダブルクオートかクオートで括る。指定が不要の場合は"/"にする）
var ckPath = "/";

/*
========== ::: ページ読み込み時の値を設定 ::: ==========
*/

// クッキー読み出し
var fsCK = GetCookie( ckName );

if ( fsCK == null ){
  var currentSize = defaultSize;          //クッキーが無ければ現在の値を初期状態の値に設定
}
else{
  var currentSize = eval( fsCK );          //クッキーがあれば現在の値をクッキーの値に設定
  if(isNaN(currentSize)){
	currentSize = defaultSize;
  }
}

/*
========== ::: head内にstyle要素を出力 ::: ==========
*/

currentSize_h1 = currentSize + 50;
currentSize_h2 = currentSize + 30;
currentSize_h3 = currentSize + 20;
currentSize_h4 = currentSize + 10;
currentSize_h5 = currentSize;
currentSize_t_h2 = currentSize + 20;
currentSize_t_h3 = currentSize + 10;
document.writeln( '<style type="text/css" media="screen,print,tv">' );
document.write( 'body,th,td{font-size:' + currentSize + fontSizeUnit+ '}' );
document.write( 'h1{font-size:' + currentSize_h1 + fontSizeUnit+ '}' );
document.write( 'h2{font-size:' + currentSize_h2 + fontSizeUnit+ '}' );
document.write( 'h3{font-size:' + currentSize_h3 + fontSizeUnit+ '}' );
document.write( 'h4{font-size:' + currentSize_h4 + fontSizeUnit+ '}' );
document.write( 'h5,h6{font-size:' + currentSize_h5 + fontSizeUnit+ '}' );
document.write( '#mainmenu h2{font-size:' + currentSize_t_h2 + fontSizeUnit+ '}' );
document.write( '#mainmenu h3,#contentmenu h2,#contentmenu h3{font-size:' + currentSize_t_h3 + fontSizeUnit+ '}' );
document.writeln( '</style>' );

/*===================================
  [関数 fsc]
  引数CMDに渡される値に応じて
  変更後の値を算出しクッキーに書き込む。
====================================*/

function fsc( CMD ){
  // 拡大：現時点の値に一回の操作で変化させる値を加えて操作後の値"newSize"に代入
  if ( CMD == "larger" ){
	var newSize = Number( currentSize + perOrder );
	SetCookie( ckName , newSize );          //クッキー書き込み
  }

  // 縮小：現時点の値から一回の操作で変化させる値を引き操作後の値に代入
  // 現時点のサイズの値が一回の操作で変化させる値と同じならそのまま操作後の値に代入
  if ( CMD == "smaller" ){
	if ( currentSize != perOrder ){
	  var newSize = Number( currentSize - perOrder );
	  SetCookie( ckName , newSize );          //クッキー書き込み
	}
	else{
	  var newSize = Number( currentSize );
	}
  }

  // 元に戻す：操作後の値を初期値にする
  if ( CMD == "default" ){
	DeleteCookie( ckName );          //クッキー削除
  }

  // ページの再読み込み
  // 再読み込みをすることで変更後の値を反映したstyle要素が出力される
  location.reload();
}

// _______________________________________ end of function fsc() ___ 

/*===================================
  [関数 SetCookie]
  クッキーに値を書き込む
====================================*/
function SetCookie( name , value ){
  var dobj = new Date();
  dobj.setTime(dobj.getTime() + 24 * 60 * 60 * ckDays * 1000);
  var expiryDate = dobj.toGMTString();
  document.cookie = name + '=' + escape(value) + ';expires=' + expiryDate + ';path=' + ckPath;

}

/*===================================
  [関数 GetCookie]
  クッキーを取得する
====================================*/
function GetCookie (name){
  var arg  = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;
  while (i < clen){
	var j = i + alen;
	if (document.cookie.substring(i, j) == arg)
	return getCookieVal (j);
	i = document.cookie.indexOf(" ", i) + 1;
	if (i == 0) break;
  }
  return null;
}

/*===================================
  [関数 getCookieVal]
  クッキーの値を抽出する
====================================*/
function getCookieVal (offset){
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1)
  endstr = document.cookie.length;
  return unescape(document.cookie.substring(offset,endstr));
}

/*===================================
  [関数 DeleteCookie]
  クッキーを削除する
====================================*/
function DeleteCookie(name){
  if (GetCookie(name)){
	document.cookie = name + '=' +
	'; expires=Thu, 01-Jan-70 00:00:01 GMT;path='+ckPath;
  }
}

/* FONTタグのサイズなどをスタイル指定に変換する関数（convert_some_tag_to_style）の定義
 * 2009.07.23 Netcrew N.I追記
*/
function convert_some_tag_to_style(){
	var font_tags = document.getElementsByTagName('font');

	for(i=0,L=font_tags.length;i<L;i++){
		switch(font_tags[i].getAttribute("size")){
			case "+3":
				font_tags[i].style.fontSize=currentSize_h1+fontSizeUnit;
				break;
			case "+2":
				font_tags[i].style.fontSize=currentSize_h2+fontSizeUnit;
				break;
			case "+1":
				font_tags[i].style.fontSize=currentSize_h3+fontSizeUnit;
				break;
			case "+0":
			default:
				break;
			case "-1":
				font_tags[i].style.fontSize=currentSize_h4+fontSizeUnit;
				break;
			case "-2":
				font_tags[i].style.fontSize=currentSize_h5+fontSizeUnit;
				break;
			case "-3":
				font_tags[i].style.fontSize=currentSize_h5+fontSizeUnit;
				break;
		}
			font_tags[i].removeAttribute("size");
	}
}

function change_image_init(){
	try {
		var img_array = document.getElementsByTagName("img");
		var img_num = img_array.length;
		for(var i=0; i < img_num; i++){
			if(img_array[i].getAttribute("src").match("_off.")){
				img_array[i].onmouseover = function (){
					this.setAttribute("src", this.getAttribute("src").replace("off", "hover"));
				}
				img_array[i].onmouseout = function() {
					this.setAttribute("src", this.getAttribute("src").replace("hover", "off"));
				}
			}
		}
	} catch(e){
//		alert("test");
	}
}


window.onload = convert_some_tag_to_style;

//EOF
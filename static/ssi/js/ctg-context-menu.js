/* ファイル名：ctg-context-menu.js
 * 概要　　　：分類の動的コンテキストメニュー制御
 * 作成者　　：T.Yoshi
 * 新規作成日：2013年7月16日
 * 更新履歴　：
 * 　　　　　：
 * Copyright (C) 1999-2013 NetCrew CMS All Rights Reserved.
*/
var ctg_info = new Array();
var ctg02_sort = new Array();
var ctg01_sort = new Array();
var ctg03_disp = 0;
var ctg02_disp = 0;
var elm_lt_x = 0;
var elm_lt_y = 0;
var elm_rb_x = 0;
var elm_rb_y = 0;

// 中分類のコンテキストメニュー表示
function disp_ctg02_context_menu(ctg03_id, ctg03_no) {
	var disp_ctg02_elment = document.getElementById("context_category02");
	var ctg02_innerHTML = "";

	// 引数の数値チェック
	if(!(isFinite(ctg03_id))) return;
	if(!(isFinite(ctg03_no))) return;

	if(ctg02_sort[ctg03_id]) {
		ctg02_innerHTML = "<ul>"
		for( keys in ctg02_sort[ctg03_id] ) {
			// 中分類のID取得
			keys = ctg02_sort[ctg03_id][keys];

			// 中分類ページアンカーリンク作成
			ctg02_innerHTML += "<li ";
			ctg02_innerHTML += "id=\"context_category02_link" + keys + "\" ";
			ctg02_innerHTML += "name=\"context_category02_link" + keys + "\" ";
			ctg02_innerHTML += "onMouseOver=\"disp_ctg01_context_menu(" + ctg03_id + "," + ctg_info[ctg03_id][keys]["id"] + "," + ctg03_no + ");\"";
			ctg02_innerHTML += ">";

			ctg02_innerHTML += "<a ";
			ctg02_innerHTML += "href=\"" + ctg_info[ctg03_id][keys]["url"] + "\"";
			ctg02_innerHTML += ">";

			ctg02_innerHTML += ctg_info[ctg03_id][keys]["name"];

			ctg02_innerHTML += "</a></li>\n";
		}
		ctg02_innerHTML += "</ul>"

		// 表示位置計算
		var ctg03_id_name = "gnav" + ctg03_no;
		var disp_ctg03_elment = document.getElementById(ctg03_id_name);

		// 中分類を表示
		get_element_pos(disp_ctg03_elment);
		disp_ctg02_elment.innerHTML = ctg02_innerHTML;
		disp_ctg02_elment.style.top = elm_rb_y + "px";
		disp_ctg02_elment.style.left = elm_lt_x + "px";
		disp_ctg02_elment.style.visibility = "visible";

		// 中分類を表示している大分類ID
		ctg03_disp = ctg03_id;
	} else {
		disp_ctg02_elment.style.visibility = "hidden";
	}
}

// 小分類のコンテキストメニュー表示
function disp_ctg01_context_menu(ctg03_id, ctg02_id, ctg03_no) {
	var disp_ctg01_elment = document.getElementById("context_category01");
	var ctg01_innerHTML = "";

	// 引数の数値チェック
	if(!(isFinite(ctg03_id))) return;
	if(!(isFinite(ctg02_id))) return;
	if(!(isFinite(ctg03_no))) return;

	if(ctg01_sort[ctg02_id]) {
		ctg01_innerHTML = "<ul>"
		for( keys in ctg01_sort[ctg02_id]) {
			// 小分類IDの取得
			var ctg01_id = ctg01_sort[ctg02_id][keys];

			// 小分類ページアンカーリンク作成
			ctg01_innerHTML += "<li>";
			ctg01_innerHTML += "<a ";
			ctg01_innerHTML += "href=\"" + ctg_info[ctg03_id][ctg02_id][ctg01_id]["url"] + "\"";
			ctg01_innerHTML += ">";

			ctg01_innerHTML += ctg_info[ctg03_id][ctg02_id][ctg01_id]["name"];

			ctg01_innerHTML += "</a></li>\n";
		}
		ctg01_innerHTML += "</ul>"

		// 中分類新着情報
		if(ctg_info[ctg03_id][ctg02_id]["news_count"] > 0) {
			ctg01_innerHTML += "<div id=\"context_category02_news\">";
			ctg01_innerHTML += "<p>新着情報</p>";
			ctg01_innerHTML += "<ul>";
			for(var i = 1; i <= ctg_info[ctg03_id][ctg02_id]["news_count"]; i++) {
				// 新着情報ページアンカーリンク作成
				ctg01_innerHTML += "<li>";
				ctg01_innerHTML += "<a ";
				ctg01_innerHTML += "href=\"" + ctg_info[ctg03_id][ctg02_id]["news"+i]["url"] + "\"";
				ctg01_innerHTML += ">";

				ctg01_innerHTML += ctg_info[ctg03_id][ctg02_id]["news"+i]["name"];

				ctg01_innerHTML += "</a></li>\n";
			}
			ctg01_innerHTML += "</ul>";
			ctg01_innerHTML += "</div>";
		}

		// 表示位置計算
		var disp_ctg02_elment;

		// 小分類を表示
		disp_ctg01_elment.innerHTML = ctg01_innerHTML;


		// ブラウザの横縦幅を取得
		var browser_w = 0;
		var browser_h = 0;
		if ((!document.all || window.opera) && document.getElementById) {
			// IE以外。
			browser_w = window.innerWidth;
			browser_h = window.innerHeight;
		} else if (document.getElementById && (document.compatMode=='CSS1Compat')) {
			// ウィンドウズIE 6・標準モード。
			browser_w = document.documentElement.clientWidth;
			browser_h = document.documentElement.clientHeight;
		} else if (document.all) {
			// その他のIE。
			browser_w = document.body.clientWidth;
			browser_h = document.body.clientHeight;
		}

		// スクロール縦位置を取得
		var scrollTop = (document.documentElement.scrollTop || document.body.scrollTop);

		// スタイル幅属性を削除しておく
		if (disp_ctg01_elment.style.removeProperty) {
			disp_ctg01_elment.style.removeProperty('width');
		}
		if (disp_ctg01_elment.style.removeAttribute) {
			disp_ctg01_elment.style.removeAttribute('width');
		}

		// 小分類の表示幅を取得
		var ctg_01_w = disp_ctg01_elment.offsetWidth;
		var ctg_01_h = disp_ctg01_elment.offsetHeight

		// 中分類オブジェクト
		disp_ctg02_elment = document.getElementById("context_category02_link" + ctg02_id);

		// 小分類コンテキストメニューの左上座標
		get_element_pos(disp_ctg02_elment);
		var ctg_01_y = elm_lt_y;
		var ctg_01_x = elm_rb_x - 10;

		if((ctg_01_x + ctg_01_w) > browser_w) {
			// 左側へ表示させるためX軸調整
			ctg_01_x = elm_lt_x - ctg_01_w;
			if(ctg_01_x < 0) {
				ctg_01_x = 0;
				disp_ctg01_elment.style.width = elm_lt_x + "px";
			}
		}

		// 小分類メニューのY軸調整
		ctg_01_y -= (ctg_01_h / 5);
		if(browser_h < (ctg_01_y + ctg_01_h) - scrollTop) ctg_01_y = (browser_h - ctg_01_h) + scrollTop;
		if(ctg_01_y < 0) ctg_01_y = 0;

		disp_ctg01_elment.style.top = ctg_01_y + "px";
		disp_ctg01_elment.style.left = ctg_01_x + "px";
		if(disp_ctg01_elment.innerHTML == "<ul></ul>") {
			disp_ctg01_elment.style.visibility = "hidden";
		} else {
			disp_ctg01_elment.style.visibility = "visible";
		}

		// 小分類を表示している中分類ID
		ctg02_disp = ctg02_id;

		// 選択中状態を残すため中分類「li」タグにクラス指定
		var ctg02_div_elment = document.getElementById("context_category02");
		var li_elements = ctg02_div_elment.getElementsByTagName("li"); 
		for(var i = 0; i < li_elements.length; i++) {
			li_elements[i].className = "";
		}
		disp_ctg02_elment.className = "sel_ctg02";
	} else {
		disp_ctg01_elment.style.visibility = "hidden";
	}
}

// 中小分類のコンテキストメニュー非表示
function hide_ctg_context_menu(evt) {
	var hx = 0;
	var hy = 0;
	var mouse_in_ctg03 = false;
	var mouse_in_ctg02 = false;
	var mouse_in_ctg01 = false;

	//-----------------------------------------------
	// ページ上のマウス座標を取得
	//-----------------------------------------------
	if(document.all){
		// For IE
		if (typeof document.body.style.maxHeight != "undefined") {
			// IE 7, mozilla, safari, opera 9
			hx = document.documentElement.scrollLeft + event.clientX;
			hy = document.documentElement.scrollTop  + event.clientY;
		} else {
			// IE6, older browsers
			hx = document.body.scrollLeft + event.clientX;
			hy = document.body.scrollTop  + event.clientY;
		}
	} else {
		hx = evt.pageX;
		hy = evt.pageY;
	}

	//-----------------------------------------------
	// 大分類メニュー
	//-----------------------------------------------
	for(var i = 1; i < 99; i++) {
		var ctg03_id_name = "gnav" + i;
		elm_lt_x = 0;
		elm_lt_y = 0;
		elm_rb_x = 0;
		elm_rb_y = 0;
		disp_ctg03_elment = document.getElementById(ctg03_id_name);
		if(disp_ctg03_elment) {

			// ページ上の大分類メニュー座標取得
			get_element_pos(disp_ctg03_elment);

			// マウス座標が大分類メニュー内かチェック
			if(hx >= elm_lt_x && hx <= elm_rb_x && hy >= elm_lt_y && hy <= elm_rb_y) {
				mouse_in_ctg03 = true;
				break;
			}
		} else {
			break;
		}
	}

	//-----------------------------------------------
	// 中分類コンテキトメニュー
	//-----------------------------------------------
	var disp_ctg02_elment = document.getElementById("context_category02");

	if(disp_ctg02_elment.style.visibility == "visible") {

		// ページ上の中分類コンテキストメニュー座標取得
		get_element_pos(disp_ctg02_elment);

		// マウス座標が中分類コンテキストメニュー内かチェック
		if(hx >= elm_lt_x && hx <= elm_rb_x && hy >= elm_lt_y && hy <= elm_rb_y) {
			mouse_in_ctg02 = true;
		}
	}

	//-----------------------------------------------
	// 小分類コンテキトメニュー
	//-----------------------------------------------
	var disp_ctg01_elment = document.getElementById("context_category01");

	if(disp_ctg01_elment.style.visibility == "visible") {

		// ページ上の小分類コンテキストメニュー座標取得
		get_element_pos(disp_ctg01_elment);

		// マウス座標が小分類コンテキストメニュー内かチェック
		if(hx >= elm_lt_x && hx <= elm_rb_x && hy >= elm_lt_y && hy <= elm_rb_y) {
			mouse_in_ctg01 = true;
		}
	}

	//----------------------------------------------------------
	// マウスの位置によって中小分類コンテキトメニュー表示制御
	//----------------------------------------------------------
	if(mouse_in_ctg03 == false && mouse_in_ctg02 == false && mouse_in_ctg01 == false) {
		disp_ctg02_elment.style.visibility = "hidden";
		ctg03_disp = 0;
	}

	if(mouse_in_ctg02 == false && mouse_in_ctg01 == false) {
		disp_ctg01_elment.style.visibility = "hidden";
		ctg02_disp = 0;
	}
}

// エレメントの表示座標を取得する
function get_element_pos(elm) {
	elm_lt_x = 0;
	elm_lt_y = 0;
	elm_rb_x = 0;
	elm_rb_y = 0;

	if(elm) {
		// エレメント左上座標
		if(document.all){
			// for IE
			var oj = elm;
			while(oj){
				elm_lt_y += oj.offsetTop;
				oj = oj.offsetParent;
		    }

			var oj = elm;
			while(oj){
				elm_lt_x += oj.offsetLeft;
				oj = oj.offsetParent;
		    }
		}else{
			var elmTmp = elm;
			do {
				elm_lt_y += elmTmp.offsetTop;
				elm_lt_x += elmTmp.offsetLeft;
			} while (elmTmp = elmTmp.offsetParent);
		}

		// エレメント右下座標
		elm_rb_y = elm_lt_y  + elm.offsetHeight;
		elm_rb_x = elm_lt_x  + elm.offsetWidth;
	}
}

// 分類のコンテキストメニュー表示の初期化
function disp_ctg_context_menu_init() {
	// マウス移動イベント発生時の処理割り当て
	window.document.onmousemove = hide_ctg_context_menu;

	//XMLHttpRequestオブジェクトを生成
	if (window.XMLHttpRequest) {
		//Firefox, Opera, IE7, and other browsers will use the native object
		var HttpObject = new window.XMLHttpRequest();
	} else {
		//IE 5 and 6 will use the ActiveX control
		var HttpObject = new ActiveXObject("Microsoft.XMLHTTP");
	}

	//openメソッドでXMLファイルを開く
	HttpObject.open("GET", "/ctg_context_menu.xml", true);
	// HTTP/1.0 における汎用のヘッダフィールド
	HttpObject.setRequestHeader('Pragma', 'no-cache');
	// HTTP/1.1 におけるキャッシュ制御のヘッダフィールド
	HttpObject.setRequestHeader('Cache-Control', 'no-cache');
	// 指定日時以降に更新があれば内容を返し、更新がなければ304ステータスを返すヘッダフィールド。古い日時を指定すれば、必ず内容を返す。
	HttpObject.setRequestHeader('If-Modified-Since', 'Thu, 01 Jun 1970 00:00:00 GMT'); 
	
	//無名functionによるイベント処理
	HttpObject.onreadystatechange = function() {
		if (HttpObject.readyState == 4) {
			//コールバック
			make_ctg_context_menu_info(HttpObject);
		}
	}
	
	//データの送信
	HttpObject.send('');

}

// 指定ノードのコンテキストを取得
function getNodeText(node, nodeName) {
	var childNode = node.firstChild;
	while(childNode) {
		if(childNode.nodeName == nodeName) {
			if(childNode.text) {
				// for IE
				return(childNode.text);
			} else if(childNode.textContent) {
				// FireFox Chrome
				return(childNode.textContent);
			}
		}
		childNode = childNode.nextSibling
	}
	return("");
}

// 指定ノードを取得
function getNode(node, nodeName) {
	var childNode = node.firstChild;
	while(childNode) {
		if(childNode.nodeName == nodeName) {
			return(childNode);
		}
		childNode = childNode.nextSibling
	}
	return(null);
}

//-------------------------------------------------------
// XMLファイルからコンテキスト表示用情報を作成する
//-------------------------------------------------------
// ctg02_sort[ctg03_id][1～] : 中分類ID ２次元目の配列キーは中分類並び順に従い１番～
// ctg01_sort[ctg02_id][1～] : 小分類ID ２次元目の配列キーは小分類並び順に従い１番～
//
// ctg_info[ctg03_id][ctg02_id]["id"]  :中分類ID
// ctg_info[ctg03_id][ctg02_id]["name"]:中分類名
// ctg_info[ctg03_id][ctg02_id]["url"] :中分類ページURL
//
// ctg_info[ctg03_id][ctg02_id]["news_count"]       :新着情報数
// ctg_info[ctg03_id][ctg02_id]["news1-n"]["name"]  :新着タイトル
// ctg_info[ctg03_id][ctg02_id]["news1-n"]["url"]   :新着ページURL
//
// ctg_info[ctg03_id][ctg02_id][ctg01_id]["id"]  :小分類ID
// ctg_info[ctg03_id][ctg02_id][ctg01_id]["name"]:小分類名
// ctg_info[ctg03_id][ctg02_id][ctg01_id]["url"] :小分類ページURL
//-------------------------------------------------------
function make_ctg_context_menu_info(HttpObj) {
	var topWin = window.parent;
	var framesets = topWin.document.getElementsByTagName("frameset");
	if(framesets.length > 0) return;

	// cheker系は無効
	if(document.URL.indexOf('/control/checker/') != -1) return;

	if(HttpObj == null) return;
	if(HttpObj.responseXML == null) return;

	var resHTTP = HttpObj.responseXML.documentElement;
	if(resHTTP == null) return;
	if(location.href.lastIndexOf('?sp') != -1){
		return;
	}
	if($.fn.checkSP == true) { // checksp.js
		return;
	}
	ctg03_list = resHTTP.getElementsByTagName('ctg03_list');
	
	// 大分類
	for(var i = 0; i < ctg03_list.length; i++) {
		// 大分類ID取得
		ctg03_id = getNodeText(ctg03_list[i], "id");

		ctg02_list = getNode(ctg03_list[i], "ctg02_list");

		// 配列確保
		ctg_info[ctg03_id] = new Array();
		ctg02_sort[ctg03_id] = new Array();

		// 中分類
		if(ctg02_list == null) continue;
		var ctg02_info = ctg02_list.firstChild;
		var ctg02_sort_no = 1;
		while(ctg02_info) {
			if(ctg02_info.nodeName == "ctg02_info") {
				// 中分類ID
				ctg02_id = getNodeText(ctg02_info, "id");

				// 配列確保
				ctg_info[ctg03_id][ctg02_id] = new Array();
				ctg01_sort[ctg02_id] = new Array();

				// 中分類ID取得
				ctg_info[ctg03_id][ctg02_id]["id"] = ctg02_id;

				// 中分類名取得
				ctg_info[ctg03_id][ctg02_id]["name"] = getNodeText(ctg02_info, "name");

				// 中分類ページURL取得
				ctg_info[ctg03_id][ctg02_id]["url"]  = getNodeText(ctg02_info, "url");

				// 中分類の並び順
				ctg02_sort[ctg03_id][ctg02_sort_no] = ctg02_id;

				// 新着情報数
				ctg02_news_count = getNodeText(ctg02_info, "news_count");
				ctg_info[ctg03_id][ctg02_id]["news_count"]  = ctg02_news_count;

				for(var j = 1; j <= ctg02_news_count; j++) {
					var ctg02_news = getNode(ctg02_info, "news"+j);

					// 配列確保
					ctg_info[ctg03_id][ctg02_id]["news"+j] = new Array();

					// 公開開始日取得
					ctg_info[ctg03_id][ctg02_id]["news"+j]["sdate"] = getNodeText(ctg02_news, "sdate");

					// 新着タイトル取得
					ctg_info[ctg03_id][ctg02_id]["news"+j]["name"] = getNodeText(ctg02_news, "name");

					// 新着ページURL取得
					ctg_info[ctg03_id][ctg02_id]["news"+j]["url"] = getNodeText(ctg02_news, "url");
				}

				var ctg01_list = getNode(ctg02_info, "ctg01_list");
				if(ctg01_list == null) {
					ctg02_info = ctg02_info.nextSibling
					ctg02_sort_no += 1;
					continue;
				}
				var ctg01_info = ctg01_list.firstChild;
				var ctg01_sort_no = 1;
				while(ctg01_info) {
					if(ctg01_info.nodeName == "ctg01_info") {

						// 小分類ID
						ctg01_id = getNodeText(ctg01_info, "id");

						// 配列確保
						ctg_info[ctg03_id][ctg02_id][ctg01_id] = new Array();

						// 小分類ID取得
						ctg_info[ctg03_id][ctg02_id][ctg01_id]["id"] = ctg01_id;

						// 小分類名取得
						ctg_info[ctg03_id][ctg02_id][ctg01_id]["name"] = getNodeText(ctg01_info, "name");

						// 小分類ページURL取得
						ctg_info[ctg03_id][ctg02_id][ctg01_id]["url"]  = getNodeText(ctg01_info, "url");

						// 小分類の並び順
						ctg01_sort[ctg02_id][ctg01_sort_no] = ctg01_id;
						ctg01_sort_no += 1;
					}
					ctg01_info = ctg01_info.nextSibling
				}

				ctg02_sort_no += 1;
			}

			ctg02_info = ctg02_info.nextSibling
		}
	}
}
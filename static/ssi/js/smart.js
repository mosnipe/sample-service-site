// スマートフォン用Javascript

jQuery(document).ready(function($){
	//テスト用 ?SP
	function test(){
		if(location.href.lastIndexOf('?sp') != -1){
			return true;
		}
	}
	
	var path = location.href;
	var dPath = '/';
	var slideSpeed = 100; //アコーディオンメニューの展開速度（ms）
	var deviceWidth = document.documentElement.clientWidth;
	var timer = false;
	// var commonTapEvent = ('ontouchstart' in document) ? 'touchstart' : 'click';
	var commonTapEvent = 'click';

	/*userAgent*/
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

	function deviceCheck(){
		if(ua('iphone') || (ua('android') && ua('mobile'))){
			return true;
		}else{
			return false;
		}
	}

	function sp(){
		if(deviceCheck() || deviceWidth <= 480 ||test()){
			return true;
		}else{
			return false;/////false
		}
	}
	
	function navChange(){
		//グローバルナビ画像差し替え
	}
	function lifeStageChange(){
		//ライフステージ画像差し替え
	}
	//配列重複
	function uniqueArry(array) {
		var tempstorage = {};
		var uniqueArray = [];
		var i,value;
		for ( i=0; i<array.length; i++) {
			value = array[i];
			if (!(value in tempstorage)) {
				tempstorage[value] = true;
				uniqueArray.push(value);
			}
		}
		return uniqueArray;
	}

	//アンカーリンクアニメーション
	function smoothAnchorLink(){
		$('a[href^=#]').on(commonTapEvent,function(){
			var speed = 'slow';
			var href= $(this).attr("href");
			var target = $(href == "#" || href == "" ? 'html' : href);
			var position = target.offset();
			$("html, body").animate({scrollTop:position.top}, speed, "swing");
			return false;
		});
	}

	function addWebClipIcon(){
		var header = document.getElementsByTagName("head").item(0);
		var wci = document.createElement("link");
			wci.rel = "apple-touch-icon";
			wci.href = "/img/sp/apple-touch-icon-precomposed.png";
		header.appendChild(wci);
	}

	if(sp()){

		addWebClipIcon();
		//スマートフォン・PC表示 全ページ共通変更個所

		//viewport setting
		var header = document.getElementsByTagName("head").item(0);
		var vp = document.createElement("meta");
		vp.name = "viewport";
		vp.content = "width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=4.0, user-scalable=yes";
		header.appendChild(vp);

		//iPhoneでlabel属性が機能しない件について対応
		$('label').each(function(){
			$(this).attr("onclick","");
		})
		/*viewParam*/
		if (!sessionStorage['view']) {
			sessionStorage['view'] = 'sp';
		}
		var crView = sessionStorage['view'];
		
		/*pcStyle*/
		function tgtCss(){
			var tgtStyle = $('head style').html();
				var csstmparry = tgtStyle;
				csstmparry = csstmparry.replace( /\r\n/g , "\n" );
				csstmparry = csstmparry.replace( /^(\n+)|(\n+)$/g , "" );
				var cssarry = csstmparry.split( /\n/g );
			var m = new Array();
			var pcStyle = new Array();
			for(var i=0;i<cssarry.length;i++){
				m[i] = /(css\/)(.+)(\.css)/.exec(cssarry[i]);
				pcStyle[i] = RegExp.$2;
			}
			return pcStyle;
		}
		/* current page info */
		var currentCSSArry = uniqueArry(tgtCss());	//	@importで指定しているCSS全て
		var currentCSSNum = currentCSSArry.length;	//	@importの数
		var currentCSS = currentCSSArry[0]; //	最初にインポートにしているCSSファイル名
		var currentURL = location.pathname.split('/');

		/*language*/
		function chkLang(){
			var langChk = path;
			var m = /(site\/)(.+)(\/)/.exec(langChk);
			var lang = RegExp.$2; // サブサイト /site/aaa/ のアドレス中の aaa が lang へ代入され、返り値となる。
			return lang;
		}
		/*loader*/
		var loadAnim;
		//ロードアニメーション
		//アニメーション開始
		function strLoader(){
			var haH = $(window).height();
			var orghaH = haH;
			haH = haH+200;
			var haW = $(window).width();
			haW = haW+100;
			$('body').css({'background-image':'none','background-color':'#ffffff'});
			$('#container').css({"display":"none"});
			$('body').append('<img id="loadingImage" style="background-color:#ffffff; position:absolute; z-index:100;top:0px; width:35px; left:50%; top:50%; margin-left:-15px; margin-top:-15px; " src="'+dPath+'img/sp/sp-loader.png" width="35" height="35" alt="" />');
			var rDeg = 0;
			loadAnim = setInterval(function() {
				rDeg =	rDeg+10;
				$('#loadingImage').css('-webkit-transform','rotate('+rDeg+'deg)');
			}, 20);
		}
		//アニメーション終了
		function stopLoader(){
			function stopTimming() {
					return true;
			}
			
			var stopAnim = setTimeout(function() {
				if(stopTimming()){
					$('#container').css({"display":"block","visibility":"visible","height":"auto"});
					$('#loadingImage').hide();
					clearInterval(loadAnim);
					clearInterval(stopAnim);
				}
			}, 100);
		}

		/*head write*/
		//sp
		function hdWrite(){
			for(var i=0;i<currentCSSNum;i++){
				$('head').append('<link href="'+dPath+'ssi/css/sp-'+currentCSSArry[i]+'.css" rel="stylesheet" type="text/css" />');
			}
		}
		//pc
		function hdWritePC(){
			$('head').append('<link href="'+dPath+'ssi/css/sp-pc.css" rel="stylesheet" type="text/css" />');
		}
		
		/*dom*/
		//common
		function viewSwitchSet(langTgt){
			$('#footer').prepend('<div id="viewSwitch"><ul><li id="vsPC">PC表示</li><li id="vsTop">ページトップへ</li></ul></div>');
			$('#vsPC').on(commonTapEvent,function(){
				pcChange();
			});
			$('#vsTop').on(commonTapEvent,function(){
				$('html,body').animate({scrollTop:0},slideSpeed);
				// return false;
			});
		}

		function replaceReturnCode(_targetObj){
			var str = $(_targetObj).html();
			str = str.replace(/\r?\n/g,"");
			$(_targetObj).html(str);
		}
		
		//sp
		function domSet(){
			// $('#author_info br').remove();
			$('#he_right_a div.header_nav').remove();
			$('#author_img').remove();	//フッタ部画像
			$('#he_left .skip_link').remove();//「本文スキップ」削除
			$('#top_search_b li[id*="page"]').removeAttr('id');

			setAccordion('.list_type_a_list','.list_type_a_title','.list_ccc');

			$('#main #main_a #main_body div[class^="detail"] img').on(commonTapEvent,function(){
				$(this).toggleClass('image_default_size');
			});

			//不要タグ削除
			$('br[style="clear:both;"]').remove();
			$('br.floatend').remove();
			$('hr[class="hide"]').remove();
			$('label').attr('onclick',"");
			$('.hide_text').removeClass();
			$('.heightLineParent > div').removeAttr('style');

			$('.link_box span a').addClass('sp_button');

			//footer
			$('#author_box > p > strong:nth-child(1)').attr('id','footer_author_name');
			ftSet();

			detailFreeTable();
			clickablemapToLinklist();
			detailFreeMovie();	//youtube埋め込み対応。不要なら削除
			
			smoothAnchorLink();

			//クリッカブルマップをリンク一覧に
			function clickablemapToLinklist(){
				$('map').each(function(){
					//$('img[usemap="#' + $(this).attr('name') + '"]').removeAttr('usemap');
					$(this).after('<div class="sp-clickablemap" id="' + $(this).attr('name') + '"></div>');
					$(this).children('area').each(function(){
						$(this).html('<a href="' + $(this).attr('href') + '">' + $(this).attr('alt') + '</a>');
						$('div#'+$(this).parent('map').attr('name')).append($(this).children('a'));
					});
				}).remove();
			}

			//img --> text
			function imgToText(tgt){
				$(tgt).each(function(){
					 $(this).append($(this).children('img').attr('alt'));
					 $(this).children('img').remove();
				});
			}
			//a href change
			function aHrefChange(tgt,prm){
				$(tgt).each(function(i){
					$(this).attr('href',prm[i]);
				});
			}
			//img H checker
			function imgChk(tgtImg){
				var imgRH;
				var timer = setInterval(chkImg,50);
				chkImg();
				function chkImg(){
					var imgRH = tgtImg.height();
					if(imgRH != 0){
						clearInterval(timer);timer=null;
						return imgRH;
					}
				}
				return chkImg();
			}

			
			//common----------------------------------------------------------------
			function hdBtnSet(){
				$('#header').after($('#top_search'));
				$('#top_search_navi li span.hide').removeClass('hide');
				$('#header2').prepend('<ul id="spMenu"><li id="spm_menu">メニュー</li><li id="spm_pc">PC版</li></ul>')
				$('#top_search_navi').after('<ul id="top_search_cat"><li><a class="sp_button" href="/soshiki/">組織で探す</a></li><li><a class="sp_button" href="/calendar/">カレンダーで探す</a></li></ul>');
				$('#spm_menu').on(commonTapEvent,function(){
					$('#top_search').slideToggle(slideSpeed);
				})
				$('#spm_pc').on(commonTapEvent,function(){
					pcChange();
				});

			}
			hdBtnSet();
			function ftSet(){
				viewSwitchSet(chkLang());
				$('#footer_nav_list span.footer_cat_title').on(commonTapEvent,function(){
					$(this).toggleClass('acc_open');
					$(this).next('ul').slideToggle(slideSpeed);
				});
			}
			
			function langIDSet(){
			}
			//flag
			function top_searchHide(){
				$('#top_search_b').hide();
			}
			//
			top_searchHide();
			
			//コンテンツ内の画像の大きさを設定
			function detailFreeImgW(){
				var screenW = $(window).width();
				$('#main_body img').each(function () {
					if (screenW < $(this).width()) {
						$(this).css('width','100%');
						$(this).css('height','auto');
					}
				})
				//detail_free
				$('.detail_free img').each(function(){
					if (screenW*0.6 < $(this).width()) {
						$(this).css('width', (screenW-40)+'px');
						$(this).css('height','auto');
						//$(this).wrap('<div>');
					}
				});
			}
			if(currentCSS != 'life3'){
				// detailFreeImgW();
			}
			//テーブル伸縮
			function detailFreeTable(){
				$('#main_body .detail_free > table').each(function(){
					$(this).wrap('<div class="sp_table_wrap2"><div class="sp_table_wrap"><div></div></div></div>div>');
					$(this).parent().parent().before('<a class="sw_large_table sp_button">表のサイズを切り替える</a>');
				});
				$('#main_body a.sp_button').on(commonTapEvent,function(){
					$(this).next().children('div').toggleClass('sp_large_table');
				});
			}


			function detailFreeMovie(){
				$('#main_body div[class*="detail_movie"] iframe').each(function(){
					var devWidth = document.documentElement.clientWidth - 24;
					var objWidth =$(this).width();
					var rescalenum = devWidth / objWidth;
					$(this).css({'transform':'scale('+rescalenum+')','transform-origin':'0 0'});
					$(this).parent().css({'height':$(this).height()*rescalenum+60+'px','width': devWidth+'px','overflow':'hidden'});
					//$(this).before('<a class="movie_new_link sp_button" target="_blank" href="' + $(this).attr('src') + '">動画を新しいウィンドウで表示する</a>');
				});
			}
			//topPage----------------------------------------------------------------
			function newsBtnLink(){
			}
			//prPhoto
			function photoLoad(reqUrl,makeDiv, xmlType) {
				//	reqUrl	: xmlパス
				//	makeDiv : 作成するdivのID
				//	xmlType : 読み込むxmlの種類 Gallery / IMAGES <Gallery>～</Gallery>か、<IMAGES>～</IMAGES>
				//var reqUrl = 'img/photo/images.xml';
				var imgsSize;		 //画像枚数
				var urlArray = [];		//画像パス
				var linkArray = [];	 //リンク先パス
				var winArray = [];
				var bgArray = [];
				var ttArray = [];	 //タイトル
				var imgSpeed = 5000;	//スライドショー速度
				var crNum = 0;			//スライドショー開始番号
				
				//prSetting
				$('#mymainback').before('<div id="' + makeDiv + '"></div>');
				
				ajaxStart();
				function ajaxStart(){
					$.ajax({
						type: 'GET',
						url: reqUrl,
						dataType: 'xml',
						timeout: 1000,
						error: function(){
							return false;
						},
						success: function(xml){
							if(xmlType == 'Gallery'){
								imgsSize = ($(xml).find('Image').size());	//<Image>というタグの数を取得＝画像の枚数
								$(xml).find('Image').each(function(){	//<Image>から</Image>の囲みの中から...
									urlArray.push($(this).find('Path').text());		//<Path>タグを探して、テキスト部分を取得＝画像アドレス
									linkArray.push($(this).find('img_link').text()); //<img link>タグを探して、テキストを取得＝リンク先アドレス
									ttArray.push($(this).find('Title').text());		//<Title>タグを探して、テキストを取得＝画像タイトル
								});
							}else if(xmlType == 'IMAGES'){
								imgsSize = ($(xml).find('imageNode').size()); //<imageNode>タグをさがして、画像枚数を取得。
								$(xml).find('imageNode').each(function(){ //<imageNode></imageNode>の囲みの中から...
									urlArray.push($(this).text());			//<imageNode>自身のテキストを取得 ＝ 画像のアドレス
									linkArray.push($(this).attr('URL'));	//<imageNode>自身にあるURLという属性(attr)を取得 ＝ リンク先アドレス
									ttArray.push($(this).attr('TIT'));		//<imageNode>自身にあるTITという属性を取得 ＝ タイトル
								});
							}
							photosSet();
						}
					});
				}
				function photosSet() {
					var chkNum = 0;
					
					for (var i = 0; i < imgsSize; i++) {
						var imgNum = i+1;
						$('#' + makeDiv).append('<a class="pr'+i+'" href="'+linkArray[i]+'"><img src="'+urlArray[i]+'" /></a>');
						loadChk($('#'+makeDiv + ' a.pr'+i), $('#' + makeDiv + ' a.pr'+i+' img'));
					}
					function loadChk(hideTgt, chkTgt){
						var timer = setInterval(chkImgHeight,50);
						chkImgHeight();
						function chkImgHeight(){
							var realHeight = chkTgt.height();
							if(realHeight != 0){
								chkNum++;
								clearInterval(timer);timer=null;
								hideTgt.hide();
							}
							if(chkNum == imgsSize){
								timelineScrroll(makeDiv);
							}
						}
					}
				}
				var tlsTimer;
				function timelineScrroll(){
					tlsTimer = setInterval(nextPhoto,imgSpeed);
					nextPhoto();
					function nextPhoto(){
						$('#' + makeDiv + ' a').hide();
						$('#' + makeDiv + ' a.pr'+crNum).fadeIn();
						
						if(crNum < imgsSize-1){
							crNum ++;
						}else{
							crNum = 0;
						}
					}
				}
			}
			
			//カレンダータイプ別CSS追加読み込み
			function setCalTypeCss(){
				var calTypeArry = location.pathname.split('/');
				if(calTypeArry[1] == 'calendar'){
					if(calTypeArry[2] == '' || calTypeArry[2] == 'index.php'){
						$('head').append('<link href="'+dPath+'ssi/css/sp-parts-calendar-normal.css" rel="stylesheet" type="text/css" />');
					}else if(calTypeArry[2] == 'm_index.php'){
						$('head').append('<link href="'+dPath+'ssi/css/sp-parts-calendar-m.css" rel="stylesheet" type="text/css" />');
					}else if(calTypeArry[2] == 'g_index.php'){
						$('head').append('<link href="'+dPath+'ssi/css/sp-parts-calendar-gantt.css" rel="stylesheet" type="text/css" />');
					}else{
						return false;
					}
				}else{
					return false;
				}
			}
			
			//アコーディオン状態表示用要素追加
			function addAccIcon(targetObj, _accClass){
				$(targetObj).append('<div class="' + _accClass + '"></div>');
			}

			// アコーディオン設定
			/*	parentDiv : 親要素
				listDIv : リスト
				titleDiv : タイトル
				_iconType : アイコンタイプクラス（必要に応じて作成したクラス。デフォルトは'acc_icon'）
					*/
			function setAccordion(parentDiv, titleDiv, listDiv,_iconType){
				var iconType = '';
				switch(_iconType){
					case 1 : iconType = 'acc_icon acc_icon_white';break;
					default: iconType = 'acc_icon';break;
				}
				// $(parentDiv + ' > ' + listDiv).hide();
				$(parentDiv + ' > ' + titleDiv).each(function(){
					addAccIcon(this,iconType);
				});
				$(parentDiv + ' > ' + titleDiv).addClass('acc_title');
				$(parentDiv + ' > ' + listDiv).css('display','block').addClass('acc_list').hide();
				// $(parentDiv + ' > ' + listDiv).addClass('acc_list');
				$(parentDiv + ' .acc_title').on(commonTapEvent,function(){
					$(this).parent().toggleClass('acc_open');
					$(this).next().slideToggle(slideSpeed);
					// return false;
				});
				$(parentDiv + ' .acc_title a').on(commonTapEvent,function(e){
					e.stopPropagation();
				});
				
			}
			// css background-image をimgタグへ
			function backgroundimageToImg(_targetObj){
				if (!$(_targetObj)[0]) {
					return false;
				}
				// var elemBgUrl = $(_targetObj).css('background-image').replace(/url\("/g,'').replace(/"\)/g,'');
				var elemBgUrl = $(_targetObj).css('background-image').replace(/url\(/g,'').replace(/\)/g,'');
				elemBgUrl = elemBgUrl.replace(/"/g,'');
				var elmLink = '';
				if ($(_targetObj).find('a')) {
					elmLink = $(_targetObj).find('a').attr('href');
				}
				$(_targetObj).empty().append('<img src="' + elemBgUrl + '" />').css('background-image','');
				// console.log(elmLink);
				if (typeof elmLink != 'undefined') {
					$(_targetObj).children('img').wrap('<a href="' + elmLink + '" />');
				}
				return false;
			}
			function addIndextoDetail(){
				// 見出しをページ内リンクとして目次化する
				if ($('#container.page_index')[0]) {
					var htag = '';
					$('#main_header').after('<div id="sp_page_index_link_wrap"><ul id="sp_page_index_link"></ul></div>');
					$('#sp_page_index_link_wrap').prepend('<button id="sp_page_index_link_toggle">ページ内目次</button>');
					$('#main_body h2, #main_body h3,#main_body div[class^="detail_"] h2,#main_body div[class^="detail_"] h3,#main_body div[class^="detail_"] h4,#main_body div[class^="detail_"] h5,#main_body div[class^="detail_"] h6').each(function(i){
						htag = $(this).get(0).tagName.toLowerCase();
						$(this).attr('id','sp_headline_'+i);
						$('#sp_page_index_link').append('<li><a href="#sp_headline_'+i+'" class="sp_headtype_'+htag+'">'+ $(this).text() +'</a></li>');
					});
					$('#sp_page_index_link').hide();
					$('#sp_page_index_link_toggle').on(commonTapEvent,function(){
						$('#sp_page_index_link').slideToggle(slideSpeed);
					});
					$('#sp_page_index_link a').on(commonTapEvent,function(){
						$('#sp_page_index_link').toggle();
					});
				}
			}
			//テンプレートごとの処理
			//トップページ処理
			if(currentCSSNum == 1 && currentCSS == 'top'){
				$('#top_tab_detail h2').removeClass('hide');
				// $('#top_tab_detail > div').show();
				$('#main').after($('#sidebar1'));
				$('#top_info_link h2 img').removeClass('hide');
				setAccordion('#top_shimin_info','div','ul');
				setAccordion('#top_info_link_koe','div','ul');
				setAccordion('#top_info_link_yakuba','div','ul');
				setAccordion('#top_info_link_town','div','ul');
				$('#top_tab_wrap').before($('#top_banner_emer,#top_banner_right'));

			}else if(currentCSSArry.indexOf('top-emer') || currentCSS == 'top-emer'){
			//緊急災害
				$('#main').after($('#sidebar1'));
				$('#main_a').prepend($('#sidebar1_banner'));
			}
			
			//組織でさがす
			if(currentCSS == 'soshiki' || currentCSS == 'soshiki-50' || currentCSS == 'soshiki-kakubu' || currentCSS == 'soshiki-kakubu2'){
				imgToText('.soshiki_back h2');
				imgToText('#sidebar1 .kanren_back');
				imgToText('.kikan h3');
				$('#mymainback').prepend($('#main_header'));
				// $('#main').after($('#sidebar1'));
			}
			//各部
			if(currentCSS == 'soshiki-kakubu'){
				//部局一覧の子要素にulを持つliの幅を97％にする。課が一つ程度だと他の部局が回りこんで表示されてしまう件の対応。
				$('.menu_list_b li').find('ul').parent().css('width','97%');
			}
			
			//各課
			if(currentCSS == 'soshiki-kakuka'){
				imgToText('#sidebar2 .kanren_back h2');
				setAccordion('#kanren_info .menu_list_c','h3','ul');
				backgroundimageToImg('#soshiki_pr_image');
			}
			//分類
			if(currentCSS == 'life' || currentCSS == 'life2' || currentCSS == 'life3'){
				$('h1 span').removeClass('hide');
				imgToText('#sidebar2 .kanren_back h2');
				$('#main_body > .navigation + br').remove();
				$('#mymainback').prepend($('#main_header_img'));
				setAccordion('.clm3box','h3', '.navigation');
				setAccordion('#kanren_info .kanren_box','h3','.list_ccc');
			}

			if(currentCSS.indexOf('life2-') != -1){
				$('#life2boxwrap .life2box h2').append('<div class="acc_icon"></div>').addClass('acc_title');
				$('#life2boxwrap .life2box ul, #life2boxwrap .life2box div.text_d2').hide();
				$('#life2boxwrap .life2box h2.acc_title').on(commonTapEvent,function(){
					$(this).toggleClass('acc_open');
					$(this).nextAll('ul,div.text_d2').slideToggle(slideSpeed);
				});
			}
			if (currentCSS == 'life') {
			}

			//サブサイト
			if(currentCSS == 'site' || currentCSS.indexOf('site-') != -1){
				var subsiteName = $('#site_name a').text();
				$('#main').after($('#sidebar1')); 
				$('#mymainback').append($('#site_footer'));
				$('#mymainback').prepend($('#mainimg'));
				setAccordion('.subsite_menu','.sidebar1_b','.sidebar_border');
				backgroundimageToImg('#mainimg_img');
				$('#mainimg_img a').prepend('<span>'+subsiteName+'</span>');
			}
			if(currentCSS == 'site-ijyuu'){
				// 移住
				addIndextoDetail();
				if ($('#container.site_top')[0]) {
					$('#top_banner_box').before($('#site_footer'));
				}
			}

			//イベント関連サブサイト
			if(currentCSS == 'site-event'){
				$('#spm_menu').off().on('click',function(){
					$('#header3wrap').slideToggle(100);
				});
			}

			// FAQページ
			if(currentCSS == 'faq-top' || currentCSS == 'faq-2p'){
				imgToText('#h1_title');
				$('#main_body .navigation ul + br').remove();
			}
			//地図でさがす
			if(currentCSS == 'shisetsu-top'){
				imgToText('#h1_title');//地図でさがすトップ・リストページ
				imgToText('#shisetsu_back');//地図でさがす目的ページ
				$('#box_list').before($('.box_map'));
			}
			//360 PC表示
			if(currentCSS == 'view360'){
				//
			}
			//カレンダー
			if(currentCSS == 'calendar'){
				//setCalTypeCss();
				$('#main_body table th').removeAttr('style');
			}
			if(currentCSS == 'news'){
				$('.span_e').addClass('article_date');
				$('.span_b').addClass('article_title');
			}
			//ウェブブック
			if(currentCSS == 'book'){
				$('#main_body .book_box h3').each(function(){
					$(this).prependTo($(this).parent());
				});
			}
		}
		//スマートフォンのPC表示
		function domSetPC(){
			// viewSwitchSet(chkLang());
			$('#container').prepend('<div id="vsSP">スマートフォン表示に戻す場合には<br />ここをタップして下さい。</div>');
			$('#vsSP').on(commonTapEvent,function(){
				spChange();
			});
		}
		
		///user action----------------------------------------------------------------
		//common
		
		function spChange(){
			sessionStorage['view'] = 'sp';
			location.reload();
		}
		function pcChange(){
			sessionStorage['view'] = 'pc';
			location.reload();
		}
		
		//top---------------------------------
		//タブを実装する際はここに記入
		//重要なお知らせ表示

		////START------------------------------------------------------------------
		//viewSwitch
		if(crView == 'sp'){
			//PC端末上でのスマホ表示からの復帰
			if(!deviceCheck()){
				$(window).on('resize',function(){
					if(document.documentElement.clientWidth > 480 ){
						//リサイズ終了時にリロード
						if (timer !== false) {
							clearTimeout(timer);
						}
						timer = setTimeout(function() {
							location.reload();
						}, 200);
					}
				});
			}
			// ロードアニメーション
			strLoader();

			$(window).load(function() {
				hdWrite();
				domSet();
				stopLoader();
				if (!location.hash) {
					setTimeout(scrollTo, 100, 0, 1);
				}
			});
			if (!ua('ie')) {
				window.onpageshow = function() {
					stopLoader();
				};
			}else {
				stopLoader();
			}
			window.onorientationchange = function() {
			};
		}else if (crView == 'pc') {
			hdWritePC();
			domSetPC();
		}
	}else{
		$(window).on('resize',function(){
			if(document.documentElement.clientWidth <= 480 ){
				//リサイズ終了時にリロード
				if (timer !== false) {
					clearTimeout(timer);
				}
				timer = setTimeout(function() {
					location.reload();
				}, 200);
			}
		});
		//PC時の処理
		viewPCMode();
	}
	function viewPCMode(){
		$(window).on('load',function(e){
			$('.box_height_parent > *').matchHeight();
			$('.box_height').matchHeight();
		});
	}

});
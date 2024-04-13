jQuery(document).ready(function($){

	// var makeDivParent = '#mainphoto_wrap';
	// var makeDiv = '#mainphoto';
	var imgsSize;		 //画像枚数
	var urlArray = [];	 //画像パス
	var linkArray = [];	 //リンク先パス
	var winArray = [];	 //リンクターゲット
	var ttArray = [];	 //タイトル
	var imagePath = '/img/photo/';
	var minImgSize = 4;	//必要最低画像枚数

	ajaxStart();
	function ajaxStart(){
		$.ajax({
			type: 'GET',
			url: '/img/photo/images.xml',
			dataType: 'xml',
			timeout: 1000,
			error: function(){
				return false;
			},
			success: function(xml){
				imgsSize = ($(xml).find('Image').size());	//<Image>というタグの数を取得＝画像の枚数
				$(xml).find('Image').each(function(){	//<Image>から</Image>の囲みの中から...
					urlArray.push($(this).find('Path').text());		//<Path>タグを探して、テキスト部分を取得＝画像アドレス
					linkArray.push($(this).find('img_link').text()); //<img link>タグを探して、テキストを取得＝リンク先アドレス
					ttArray.push($(this).find('Title').text());		//<Title>タグを探して、テキストを取得＝画像タイトル
					winArray.push($(this).find('Target').text());	//リンクターゲット
				});
			},
			complete: function(){
				// mainphoto_slider();
				if ($.fn.checkSP()) {
					$(window).on('load',function(){
						setTimeout(function(){
							mainphoto_slider_sp();
						},500);
					});
				}else{
					mainphoto_slider();
				}
				
			}
		});
	} //function ajaxset()

	function photosSet(makeDiv) {
		var imgNum = 0;	//画像番号（自然数）
		var flg_caption = false;	// キャプションの有無
		var flg_link = true;	// リンクの有無
		var imgLinkTarget = '';
		for (var i = 0; i < imgsSize; i++) {
			imgNum = i+1;
			$(makeDiv).append('<div class="pr'+imgNum+'"><img src="'+imagePath+urlArray[i]+'" /></div>');
			if (flg_caption === true && ttArray[i] !== '') {
				$(makeDiv + ' .pr' + imgNum).append('<span class="photo_caption">' + ttArray[i] + '</span>');
			}
			if (flg_link === true && linkArray[i] !== '') {
				imgLinkTarget = (winArray[i] !== '') ? winArray[i] : '_self';
				$(makeDiv + ' .pr' + imgNum + ' img').wrap('<a href="' + linkArray[i] + '" target="' + imgLinkTarget + '"></a>');
			}
		}
		chkImgSize(makeDiv,$(makeDiv + ' > div[class^="pr"]').size());
	} // function photoSet
	
	function chkImgSize(makeDiv,currentImgSize){
		//画像枚数がスライドショー最低必要枚数に足りない場合、最低必要枚数を超えるまでクローンを作成。
		if (currentImgSize >= minImgSize) {
			return true;
		}else{
			$(makeDiv + ' div[class^="pr"]').each(function(){
				$(this).clone(true).appendTo($(makeDiv));
			});
			chkImgSize(makeDiv,$(makeDiv + ' > div[class^="pr"]').size());
		}
	}

	function mainphoto_slider_sp(){
		$('#mainphoto_wrap').append('<div id="mainphoto1" />');
		photosSet('#mainphoto1');
		$('#mainphoto1').slick({
			// initialSlide: 0,
			autoplay: true,
			autoplaySpeed: 5000,
			speed: 750,
			infinite: true,
			fade: true,
			// easing: 'swing',
			dots: false
		});
	}
	function mainphoto_slider(){
		var pauseFlg = false;
		$('#mainphoto_wrap').append('<div id="mainphoto"></div><div id="mainphoto_nav"></div>');
		$('#mainphoto_wrap').append('<a tabindex="0" id="mp_control_prev" /><a tabindex="0" id="mp_control_next" /><a tabindex="0" id="mp_control_pause" /><a tabindex="0" id="mp_control_play" />');
		photosSet('#mainphoto');
		photosSet('#mainphoto_nav');
		$('#mainphoto').slick({
			autoplay: false,
			autoplaySpeed: 5000,
			speed: 750,
			initialSlide: 0,
			//slidesToShow: 3,
			//slidesToScroll: 1,
			centerMode: true,
			centerPadding: 0,
			infinite: true,
			arrows: false,
			easing: 'swing',
			dots: false,
			asNavFor: '#mainphoto_nav'
		});
		$('#mainphoto_nav').slick({
			autoplay: true,
			autoplaySpeed: 5000,
			speed: 750,
			initialSlide: 0,
			slidesToShow: 3,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: 0,
			infinite: true,
			arrows: true,
			prevArrow: '#mp_control_prev',
			nextArrow: '#mp_control_next',
			easing: 'swing',
			vertical: true,
			dots: false,
			asNavFor: '#mainphoto',
			focusOnSelect: true
		});

		$('#mp_control_prev').on('click keypress',function(){
			$('#mainphoto_nav').slick('slickPrev');
		});
		$('#mp_control_next').on('click keypress',function(){
			$('#mainphoto_nav').slick('slickNext');
		});

		$('#mp_control_pause').on('click keypress',function(){
			$('#mp_control_pause').hide();
			$('#mp_control_play').show();
			$('#mainphoto_nav').slick('slickPause');
		});
		$('#mp_control_play').on('click keypress',function(){
			$('#mp_control_play').hide();
			$('#mp_control_pause').show();
			$('#mainphoto_nav').slick('slickPlay');
		});


		$('#mainphoto_nav .slick-slide').children().contents().unwrap();
	}
});
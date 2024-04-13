jQuery(document).ready(function($){

// 事業PR
	// slick.js でのスライドショー設定
	if ($('#jigyou_pr_banner_list > li').length > 3) {
		$('#top_jigyo_slide_btn').prepend('<div id="pr_control"><button type="button" id="pr_control_prev"><img src="/img/jpr_prev.png" width="20" height="80" alt="前のスライド" /></button><button type="button" id="pr_control_pause"><img src="/img/jpr_pause.png" width="20" height="20" alt="停止" /></button><button type="button" id="pr_control_play"><img src="/img/jpr_play.png" width="20" height="20" alt="再生" /></button><button type="button" id="pr_control_next"><img src="/img/jpr_next.png" width="20" height="80" alt="次のスライド" /></button></div>');
		$('#jigyou_pr_banner_list').slick({
			autoplay: false,
			autoplaySpeed: 5000,
			speed: 750,
			initialSlide: 0,
			slidesToShow: 2,
			slidesToScroll: 1,
			centerMode: true,
			centerPadding: 0,
			infinite: true,
			// fade: true,
			prevArrow: '#pr_control_prev',
			nextArrow: '#pr_control_next',
			easing: 'swing',
			touchMove: true,
			// pauseOnHover: false,
			touchThreshold: 15,
			appendDots: $('#top_jigyo_slide_btn'),
			dots: true,
			responsive: [{
				breakpoint: 670,
				settings: 'unslick'
				}
			]
		});

		$('#jigyou_pr_banner_list').slick('slickPlay');
		$('#pr_control_prev').on('click keypress',function(){
			$('#jigyou_pr_banner_list').slick('slickPrev');
		});
		$('#pr_control_next').on('click keypress',function(){
			$('#jigyou_pr_banner_list').slick('slickNext');
		});
		$('#pr_control_pause').on('click keypress',function(){
			$('#pr_control_pause').hide();
			$('#pr_control_play').show();
			$('#jigyou_pr_banner_list').slick('slickPause');
		});
		$('#pr_control_play').on('click keypress',function(){
			$('#pr_control_play').hide();
			$('#pr_control_pause').show();
			$('#jigyou_pr_banner_list').slick('slickPlay');
		});
	}

});
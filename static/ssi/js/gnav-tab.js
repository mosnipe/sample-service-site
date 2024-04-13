jQuery(document).ready(function($){
	function gnavMenu(){
		$('[id^="gnav"]').attr('tabindex','0');
		$('[id^="gnav"]').on('focus',function(e){
			$('[id^="gnav"] > ul').removeClass('open');
			$(this).children('ul').addClass('open');
			e.stopPropagation;
		});
		$('li.list-tab').attr('tabindex','0');
		$('li.list-tab').on('focus',function(event){
			$('li.list-tab > ul').removeClass('open');
			$(this).children('ul').addClass('open');
			event.stopPropagation;
		});
		$('li.list-last').on('focusout',function(){
			$('[id^="gnav"] > ul').removeClass('open');
			$('li.list-tab > ul').removeClass('open');
		});
		$(document).on('focus click keypress',function(){
			$('[id^="gnav"] > ul').removeClass('open');
			$('li.list-tab > ul').removeClass('open');
		});
	}
	gnavMenu();
});
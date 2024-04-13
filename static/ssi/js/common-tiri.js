jQuery(document).ready(function($){

	// 選択中メニュー
	var url = window.location.pathname;
	$('#top_search li a[href="'+url+'"]').addClass('current');
	var plCtg = $('.pankuzu a:nth-of-type(3)').text();
	$('#top_search_a ul li a').each(function(){
		if($(this).text() === plCtg){
			$(this).addClass('current');
		}
	});

	// 新着サムネイルリンク
	function thumbnailLink(){
		$('.list_pack').each(function(){
			$(this).find($('.span_d')).wrap('<a href="'+$(this).find($('.span_e a')).attr('href')+'"></a>');
		});
	}
//	if($('.list_type_a_list')[0]){
		thumbnailLink();
//	}

});
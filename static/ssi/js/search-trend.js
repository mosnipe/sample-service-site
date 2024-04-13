jQuery(document).ready(function($){
	var trendAlltext = $('#search_trend_word > p').text();
	var trendArrytmp = new Array();
	var trendArry = new Array();
	trendArrytmp = trendAlltext.split(/\r\n|\r|\n/);
	//trendArry = $.grep(trendArrytmp, function(e){return e !== "";});	空配列のみ削除。0 undefined false は削除しない 
	trendArry = $.grep(trendArrytmp, function(e){return e;});	//0 undefined falseなども削除。

	$('#search_trend_word > p').empty();
	for (var i = 0; i < trendArry.length; i++) {
		$('#search_trend_word > p').append('<a tabindex="0">' + trendArry[i] + '</a>');
	}

	$('#search_trend_word > p > a').on('click keypress',function(){
		$('#tmp_query').css('background-image','none').val($(this).text());
		$('#submit').trigger('click');
	});
});
jQuery(document).ready(function($){
	// 戻るボタンで戻ったときに、キーワード欄を空にする
	$('#tmp_query').val('');
	var searchType = '';
	// 検索ボタンが押された時、検索オプション用の文字列を検索キーワードに追加する。
	$('form#cse-search-box').submit(function(){
		searchType = $('#tmp_query').val();
		if($('#filetype_html').prop('checked')){
			searchType = searchType + ' filetype:html';
		}else if($('#filetype_pdf').prop('checked')){
			searchType = searchType + ' filetype:pdf';
		}
		$('#tmp_query').val(searchType);
	});
});
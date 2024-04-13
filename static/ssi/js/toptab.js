//タブ切り替え
jQuery(document).ready(function($){

	var openTabNum = 0;
	var openTabStatusStorage = sessionStorage;
	deviceCheck = ($.fn.checkSP())? true : false;	//true:Smartphope , false:other

	function setTabStatus(){
		if(openTabNum != null){
			openTabStatusStorage.setItem('toppageTabStatus',openTabNum);
		}
	}
	function getTabStatus(){
		openTabNum = openTabStatusStorage.getItem('toppageTabStatus');
		if(openTabNum == null){
			openTabNum = 0;
		}
	}

	function changeTabView(){
			$('#top_tab_title li').removeClass('tab_on').eq(openTabNum).addClass('tab_on');
			$('#top_tab_detail > div').removeClass('detail_on').hide().eq(openTabNum).addClass('detail_on').show();
	}

	if (!deviceCheck) {
		$('#top_tab_detail > div').hide();	//タブ詳細を隠す
		if (typeof sessionStorage !== 'undefined') {
			// web strageが使える時
			getTabStatus();
			$('#top_tab_title li').removeClass('tab_on').eq(openTabNum).addClass('tab_on');
			$('#top_tab_detail > div').removeClass('detail_on').hide().eq(openTabNum).addClass('detail_on').show();
			$('#top_tab_title li').click(function(){
				openTabNum = $('#top_tab_title li').index(this);
				changeTabView();
				setTabStatus();
			});
		}else{
			// web strageが使えない時
			openTabNum = 0;
			$('#top_tab_title li:first-child').addClass('tab_on');
			$('#top_tab_detail > div:first-child').addClass('detail_on').show();
			$('#top_tab_title li').click(function(){
				openTabNum = $('#top_tab_title li').index(this);
				changeTabView();
			});
		}
	}


});
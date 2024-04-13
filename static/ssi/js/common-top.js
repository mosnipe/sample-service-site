jQuery(document).ready(function($){
	var deviceCheck=new Boolean;
	deviceCheck = ($.fn.checkSP())? true : false;	//true:Smartphope , false:other
	if (!deviceCheck) {
		$('#top_info_link > div').matchHeight();
		$('#lettering .lettering_box').each(function(){
			if ( !($(this).children('.lettering2')[0]) ) {
				$(this).prepend('<div class="lettering_noimage" />');
			}
		});
	}
	
	$('.external_link_text').remove();
});
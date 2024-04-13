jQuery(document).ready(function($){
	$('#goto_main a').focus(function(){
		$(this).parent().css('height','2em');
	}).blur(function(){
		$(this).parent().css('height','0em');
	});
});
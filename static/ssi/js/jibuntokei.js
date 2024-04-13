(function(jQuery) {
jQuery.fn.jibunTokei = function(options) {
	var options = jQuery.extend({}, jQuery.fn.jibunTokei.defaults, options);

	function getImage(date) {
		var minute = date.getMinutes();
		if (minute < 10) {
			minute = '0' + minute;
		}
	return options.dir + minute + '.' + options.ext;
	}

	function updateClock(obj) {
		var date = new Date();
		var image = getImage(date);

		date.setTime(date.getTime() + 60 * 1000);
		var nextImage = getImage(date);

		obj.fadeOut(1000, function(){
obj.html('<span class="cover" style="background-image: url(' + image + ')"></span><span class="cover" style="background-image: url(' + nextImage + ' ); display:none;"></span>').fadeIn(1000);

		});

		setTimeout(function(){updateClock(obj);},(60 - date.getSeconds()) * 1000);
	}

	return this.each(function(){
		updateClock(jQuery(this));
	});
};

jQuery.fn.jibunTokei.defaults = {
	'dir' : '', // 画像ディレクトリのパス
	'ext': 'jpg' // 画像の拡張子

};

})(jQuery);
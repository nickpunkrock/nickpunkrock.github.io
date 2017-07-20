(function ($) {
	"use strict";
  	
	$(document).on('click', '[ui-fullscreen], [data-ui-fullscreen], .fullscreen', function (e) {
		e.preventDefault();
		if (screenfull.enabled) {
		  screenfull.toggle();
		}
	});
})(jQuery);

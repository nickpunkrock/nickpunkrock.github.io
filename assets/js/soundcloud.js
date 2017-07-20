(function($) {
	'use strict';
	
    $( document ).on( 'blur', 'input._post_meta_stream, input.track_stream', function() {
    	if($(this).val().indexOf('soundcloud.com') > -1 ){
    		get_soundcloud($(this));
    	}
    });

    // soundcloud
	function get_soundcloud(el){
    	var api = 'https://api.soundcloud.com/resolve.json?url=',
	        clientid = '&client_id='+ajax.soundcloud_clientID,
	        url = el.val(),
		    _url = api+url+clientid,
		    that = el.next('button'),
		    item = el.parent().parent().parent().parent();
		if(that.hasClass('disabled')) return;
		that.addClass('disabled');
		if(url == '') return;
		$.ajax({
		  url: _url,
		  method: "GET"
		}).done(function( obj ) {
		  item.find('._post_meta_stream_alt, .track_stream_alt').val(obj.stream_url);
		  item.find('._post_meta_release, .track_release').val(obj.release_year);
		  item.find('._post_meta_duration, .track_duration').val(obj.duration);
		  if( $('#title').val() == ''){
		  	 $('#title').val(obj.title);
		  	 $('#title-prompt-text').addClass('screen-reader-text');
		  }
		  if( item.find('.track_title').val() == ''){
		  	 item.find('.track_title').val(obj.title);
		  }
		  if( item.find('._post_post_title').val() == ''){
		  	 item.find('._post_post_title').val(obj.title);
		  }
		  //obj.description obj.genre obj.artwork_url
		  that.removeClass('disabled');
		}).fail(function( jqXHR, textStatus ) {
		  that.removeClass('disabled');
		  alert( "Request failed: " + textStatus );
		});
	}
})(jQuery);

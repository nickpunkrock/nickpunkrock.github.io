(function($) {
	'use strict';
	
	// remove track
    $( document ).on( 'click', '.item .btn-delete', function() {
    	var $id = $(this).closest('.item').attr('data-id');
    	$('#delete-modal .btn-delete').attr('data-rid', $id);
    });

    $( document ).on( 'click', '#delete-modal .btn-delete', function() {
    	var $id = $(this).attr('data-rid');
    	$.ajax({
	         type : "post",
	         dataType : "json",
	         url : ajax.ajax_url,
	         data : {action: "ajax_remove_track", post_id : $id, nonce: ajax.nonce},
	         success: function(obj) {
	         	if(obj.status == 'success'){
		            $('.item[data-id="'+$id+'"]').remove();
		            $('#delete-modal').modal('hide');
	         	}
	         }
	    });
    });
})(jQuery);

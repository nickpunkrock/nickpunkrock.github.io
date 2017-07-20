(function($) {
	'use strict';
	// File inputs.
	$( '#music_tracks' ).on( 'click','a.insert', function() {
		var $row = $( this ).data( 'row' );
		// Retrieve the highest current key
		var key = 1,
		    highest = 1;
		$( '#music_tracks' ).find( '.box' ).each(function() {
			var current = $(this).data( 'key' );
			if( parseInt( current ) > highest ) {
				highest = current;
			}
		});
		key = highest += 1;
		var $item = $( $row.replace(/\[0\]/g, '['+key+']') );
		$item.removeClass('closed').attr('data-key',key);

		$( this ).parent().parent().find( '.music_tracks' ).append( $item );
		$( document.body ).trigger( 'enhanced-select-init' );
		return false;
	});
	$( '#music_tracks' ).on( 'click','.music_tracks a.delete',function() {
		if ( window.confirm( 'Are you sure' ) ) {
			$( this ).closest( '.box' ).remove();
		}
		return false;
	});

	$( '.music_tracks' ).sortable({
		items: '.box',
		cursor: 'move',
		axis: 'y',
		handle: '.draghandle',
		scrollSensitivity: 40,
		forcePlaceholderSize: true,
		helper: 'clone',
		opacity: 0.65
	});

	$( '.box-wrapper' ).on( 'click', '.box h3', function( event ) {
		// If the user clicks on some form input inside the h3, like a select list (for variations), the box should not be toggled
		if ( $( event.target ).filter( ':input, option, .sort' ).length ) {
			return;
		}
		$( this ).closest( '.box' ).toggleClass('closed');
		$( this ).next( '.box-inside' ).stop().slideToggle(100);
	})
	.on( 'click', '.expand_all', function() {
		$( this ).closest( '.box-wrapper' ).find( '.box > .box-inside' ).show();
		return false;
	})
	.on( 'click', '.close_all', function() {
		$( this ).closest( '.box-wrapper' ).find( '.box > .box-inside' ).hide();
		return false;
	});

	$( '.box.closed' ).each( function() {
		$( this ).find( '.box-inside' ).hide();
	});

	$( '.music_tracks' ).on( 'blur', 'input.track_title', function() {
		$( this ).closest( '.box' ).find( 'h3 span' ).text( $( this ).val() );
	});

})(jQuery);

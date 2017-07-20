(function($) {
	'use strict';

	function getEnhancedSelectFormatString() {
		return {
			'language': {
				errorLoading: function() {
					// Workaround for https://github.com/select2/select2/issues/4355 instead of i18n_ajax_error.
					return enhanced_select_params.i18n_searching;
				},
				inputTooLong: function( args ) {
					var overChars = args.input.length - args.maximum;

					if ( 1 === overChars ) {
						return enhanced_select_params.i18n_input_too_long_1;
					}

					return enhanced_select_params.i18n_input_too_long_n.replace( '%qty%', overChars );
				},
				inputTooShort: function( args ) {
					var remainingChars = args.minimum - args.input.length;

					if ( 1 === remainingChars ) {
						return enhanced_select_params.i18n_input_too_short_1;
					}

					return enhanced_select_params.i18n_input_too_short_n.replace( '%qty%', remainingChars );
				},
				loadingMore: function() {
					return enhanced_select_params.i18n_load_more;
				},
				maximumSelected: function( args ) {
					if ( args.maximum === 1 ) {
						return enhanced_select_params.i18n_selection_too_long_1;
					}

					return enhanced_select_params.i18n_selection_too_long_n.replace( '%qty%', args.maximum );
				},
				noResults: function() {
					return enhanced_select_params.i18n_no_matches;
				},
				searching: function() {
					return enhanced_select_params.i18n_searching;
				}
			}
		};
	}

	$( document.body )

		.on( 'enhanced-select-init', function() {
			// Ajax product search box
			$( '.ajax-select-search' ).filter( ':not(.enhanced)' ).each( function() {
				var select2_args = {
					allowClear:  $( this ).data( 'allow_clear' ) ? true : false,
					placeholder: $( this ).data( 'placeholder' ),
					minimumInputLength: $( this ).data( 'minimum_input_length' ) ? $( this ).data( 'minimum_input_length' ) : '3',
					escapeMarkup: function( m ) {
						return m;
					},
					ajax: {
						url:         enhanced_select_params.ajax_url,
						dataType:    'json',
						delay:       250,
						data: function( params ) {
							return {
								term:     params.term,
								action:   $( this ).data( 'action' ) || '',
								exclude:  $( this ).data( 'exclude' ),
								include:  $( this ).data( 'include' ),
								arg: $( this ).data( 'arg' ),
								limit:    $( this ).data( 'limit' )
							};
						},
						processResults: function( data ) {
							var terms = [];
							if ( data ) {
								$.each( data, function( id, text ) {
									terms.push( { id: id, text: text } );
								});
							}
							return {
								results: terms
							};
						},
						cache: true
					}
				};

				select2_args = $.extend( select2_args, getEnhancedSelectFormatString() );

				$( this ).select2( select2_args ).addClass( 'enhanced' );

				if ( $( this ).data( 'sortable' ) ) {
					var $select = $(this);
					var $list   = $( this ).next( '.select2-container' ).find( 'ul.select2-selection__rendered' );

					$list.sortable({
						placeholder : 'ui-state-highlight select2-selection__choice',
						forcePlaceholderSize: true,
						items       : 'li:not(.select2-search__field)',
						tolerance   : 'pointer',
						stop: function() {
							$( $list.find( '.select2-selection__choice' ).get().reverse() ).each( function() {
								var id     = $( this ).data( 'data' ).id;
								var option = $select.find( 'option[value="' + id + '"]' )[0];
								$select.prepend( option );
							} );
						}
					});
				}
				
			});
		})

		.trigger( 'enhanced-select-init' );

	$(document).on('widget-updated', function(e, widget){
	    $( document.body ).trigger( 'enhanced-select-init' );
	});

})(jQuery);

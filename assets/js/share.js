(function($) {
  'use strict';
  
  $(document).on('click.more', '.btn-more', function(e) {
    var $dp = $(this).next('.dropdown-menu');
    if( $dp.html() == "" ){
      $dp.append($('#item-dropdown-tpl').html());
    }

    if( (e.pageY + $dp.height() + 60) > $('body').height() ){
      $dp.parent().addClass('dropup');
    }

    if( e.pageX < $dp.width() ){
      $dp.removeClass('pull-right');
    }

  });

  $(document).on('click.share', '.btn-share', function(e) {
    var link = $(this).closest('.item').find('.item-title a').attr('href');
    if(!link){
      link = location.href;
    }
    
    $('#share-modal').modal('show');
    $('#share-list a').each( function(index) {
      $(this).attr( 'href', $(this).attr('data-url') + encodeURIComponent( link ) );
    });
    $('#share-url').val( link );
  });
	
})(jQuery);

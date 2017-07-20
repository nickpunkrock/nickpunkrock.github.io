(function($) {
  'use strict';
  
  $(document).on('click.like', '.btn-like', function(e) {
    var $this = $(this),
        post_id = $this.attr('data-post-id'),
        site_id = $this.attr('data-site-id'),
        count = parseInt($this.attr('data-count')),
        status = 'inactive',
        nonce = ajax.nonce;
    $this = $('[data-post-id="'+post_id+'"]');
    if( $('.user-account').length == 0 ){
      location.href = ajax.login_url;
      return;
    }
    $this.attr('disabled', 'disabled');
    $this.find('.btn').addClass('disabled');

    if ( $this.hasClass('active') ) {
      $this.removeClass('active');
      if ( count - 1 < 0 ) count = 1;
      $this.attr('data-count', count - 1);
      $this.find('.like-count').html(count - 1);
    } else {
      status = 'active';
      $this.addClass('active');
      $this.attr('data-count', count + 1);
      $this.find('.like-count').html(count + 1);
    }

    $.ajax({
      url: ajax.ajax_url,
      type: 'post',
      datatype: 'json',
      data: {
        action : 'ajax_post_likes',
        nonce : nonce,
        post_id : post_id,
        site_id : site_id,
        status : status
      },
      success: function(data){
        $this.removeClass('loading');
        $this.attr('disabled', false);
        $this.find('.btn').removeClass('disabled');
      }
    });

  });
	
})(jQuery);

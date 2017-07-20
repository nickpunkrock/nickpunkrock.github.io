(function($) {
  'use strict';
  
  $(document).on('click.follow', '.btn-follow', function(e) {
    var $this = $(this),
        user_id = $this.attr('data-user-id'),
        site_id = $this.attr('data-site-id'),
        count = parseInt($this.attr('data-count')),
        status = 'inactive',
        nonce = ajax.nonce;
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
      $this.find('.follow-count').html(count - 1);
    } else {
      status = 'active';
      $this.addClass('active');
      $this.attr('data-count', count + 1);
      $this.find('.follow-count').html(count + 1);
    }

    $.ajax({
      url: ajax.ajax_url,
      type: 'post',
      datatype: 'json',
      data: {
        action : 'ajax_follow',
        nonce : nonce,
        user_id : user_id,
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

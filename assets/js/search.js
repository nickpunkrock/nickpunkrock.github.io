(function ($) {
  'use strict';
  
  $(document).on('click.search', '.search-modal', function(e) {
    e.preventDefault();
    $('#search-modal').modal('show');
  });

  $(document).on('click', '#search-result a', function(e) {
    $('#search-modal').modal('hide');
  });

  var timeoutID = null;
  function ajax_search(query) {
    var $wrap = $('#search-result')
    $.ajax({
        type : 'post',
        url : ajax.ajax_url,
        data : {
            action : 'ajax_search_results',
            query : query,
            nonce: ajax.nonce
        },
        beforeSend: function() {
            $('#search-loading').removeClass('hide');
            $wrap.html('');
        },
        success : function( response ) {
            $('#search-loading').addClass('hide');
            $wrap.html( response );
        }
    });
  }

  $(document).on('keyup', '#searchform input', function(e){
    var $target = $(this);
    if(!$target.val()){
      return;
    }
    clearTimeout(timeoutID);
    timeoutID = setTimeout(function() { ajax_search($target.val()); }, 500); 
  });

  $(document).on('submit', '#searchform', function(e){
      e.preventDefault();
      $.pjax.submit(e, $('#view'), {fragment: '#view', timeout: 6000});
      $('#search-modal').modal('hide');
  });

})(jQuery);

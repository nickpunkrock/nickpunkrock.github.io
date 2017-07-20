(function ($) {
  'use strict';
  
  $(document).on('click', '#commentform #submit', function(e){
      //e.preventDefault();
      var form = $('#commentform'),
          status = $('#comment-status');

      form.submit(function(){
          var data = form.serialize();
          var url = form.attr('action');

          status.html( status.attr('data-text') ).removeClass('text-danger');

          $.ajax({
              type: 'post',
              url: url,
              data: data,
              error: function(XMLHttpRequest, textStatus, errorThrown){
                 var res = XMLHttpRequest.responseText;
                 var err = res.match(/<body[^>]*>([\s\S.]*)<\/body>/i);
                 
                 status.html($(err[1])).addClass('text-danger');
              },
              success: function(data, textStatus){
                 $.pjax({url: window.location.href, container: $('#view'), timeout: 6000, fragment: '#view'})
              }
          });
          return false;
      });
  });

})(jQuery);

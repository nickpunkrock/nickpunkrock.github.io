(function ($) {
	  'use strict';

    $('[ui-jp], [data-ui-jp]').uiJp();

    init();
    function init(){
      // parallax
      if($.stellar){
        $.stellar("destroy");
        $.stellar({
          horizontalScrolling: false,
          verticalOffset: 56
        });
      }

    }

    $(document).on('pjaxStart', function() {
        $('#aside').modal('hide');
        $('body').removeClass('modal-open').find('.modal-backdrop').remove();
        $('.navbar-toggleable-md').collapse('hide');
    });
    
    if ($.support.pjax) {
      $.pjax.defaults.maxCacheLength = 0;
      var container = $('#view');
      $(document).on('click', 'a[data-pjax], [data-pjax] a, #aside .nav a, .item a, .playlist a, .nav-links a, .ajax, .entry-title a, .entry-footer a', function(event) {
        if($("#view").length == 0 || $(this).hasClass('no-ajax') || $(this).parent().hasClass('no-ajax')){
          return;
        }
        $.pjax.click(event, {
          container: '#view', 
          timeout: 6000, 
          fragment: '#view',
          srctojs: ['post-carousel/js/carousel.min.js', 'post-carousel/js/carousel.js', 'sow.jquery.fittext.js', 'sow.jquery.fittext.min.js']
        });
      });

      $(document).on('pjax:success', function(event, data) {
        var $bodyClass = data.match(/<body class\=\"(.*)\"/);
        if($bodyClass){
          document.body.className = $bodyClass[1];
        }
      });

      $(document).on('pjax:start', function() {
        NProgress.start();
        $( document ).trigger( "pjaxStart" );
      });
      
      $(document).on('pjax:beforeReplace', function() {
        container.find('audio,video').stop();
        // fix slider widget
        if($.fn.cycle){
          $('.sow-slider-images').cycle('destroy');
        }
      });
      
      // fix js
      $(document).on('pjax:end', function(event) {
        NProgress.done();

        $(event.target).find('[ui-jp], [data-ui-jp]').uiJp();

        $( document ).trigger( "pjaxEnd" );

        container.find('audio,video').mediaelementplayer();
        
        init();

        // setup page build widget
        var sowb = window.sowb || {};
        $( sowb ).trigger( 'setup_widgets' );

      });
    }

    $.ajaxPrefilter(function( options, original_Options, jqXHR ) {
      options.async = true;
    });

})(jQuery);

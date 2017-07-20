(function($) {
    'use strict';
    
  	// uploader
    $('.input-upload-file').each(function(){
        var $uploader = $(this);
        var $i = 'dashicons-admin-media';
        if( $uploader.hasClass('upload-image') ){
            $i = 'dashicons-camera';
        }
        if( $uploader.hasClass('upload-audio') ){
            $i = 'dashicons-format-audio';
        }
        $uploader.parent().append('<a class="button button-small upload-btn btn white lt"><i class="text-muted dashicons '+$i+'"></i></a>');
    });
  	
	$(document).on('click', '.upload-btn', function(e){
        e.preventDefault();
        var that = $(this);
        var c = that.closest('.piklist-field-container, .piklist-theme-field-container').parent();
        var image = wp.media({
            title: '',
            multiple: false
        }).open()
        .on('select', function(e){

            var uploaded_image = image.state().get('selection').first();
            var obj = uploaded_image.toJSON();

            if(obj.fileLength){
                var d = time_to_ms(obj.fileLength);
                c.find('._post_meta_duration').val(d);
            }

            if(obj.meta && obj.meta.artist){
                c.find('._post_meta_artist').val(obj.meta.artist);
            }

            that.find('input').val(obj.id);
            that.parent().parent().next().find('.input-upload-file-id').val(obj.id);
            that.prev().val(obj.url);
        });
    });

    function time_to_ms(t){
        if(t == '' || t == 0){
            return;
        }
        var t = t.split(':'),
            d = 0;
        if(t.length == 1){
            d = parseInt( t[0] );
        }else if(t.length == 2){
            d = parseInt( t[0] )*60 + parseInt( t[1] );
        }else if(t.length == 3){
            d = parseInt( t[0] )*60*60 + parseInt( t[1] )*60 + parseInt( t[3] );
        }
        return d*1000;
    }
})(jQuery);

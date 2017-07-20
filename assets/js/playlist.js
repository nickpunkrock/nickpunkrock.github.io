(function ($) {
    'use strict';
    
    var id, playlist=[];

    $(document).on('click', '.btn-playlist', function(e){
      // see if user login
      if( $('.user-account').length == 0 ){
        location.href = ajax.login_url;
        return;
      }
      // show modal and the playlist
      $('#playlists').modal('show');
      $('#playlist-new').show();
      id = $(this).closest('.item').attr("data-id");
      $.ajax({
         type : "POST",
         dataType : "json",
         url : ajax.ajax_url,
         data : {action: "ajax_playlist", nonce: ajax.nonce, post_id: id, type: 'r'},
         success: function(res) {
            if(res.status == 'success'){
              playlist = res.data;
              renderPlaylist();
            }
         }
      });
    });

    // add new
    $(document).on('click', '#playlist-new-save', function(e){
      var that = $(this),
          title = $("#playlist-new-title").val();

      if($.trim(title) == ''){
        return;
      }
      
      that.prop('disabled', 'disabled');

      $.ajax({
         type : "POST",
         dataType : "json",
         url : ajax.ajax_url,
         data : {action: "ajax_playlist", nonce: ajax.nonce, post_id: id, title: title, type: 'c'}
      }).done(function( res ) {
        playlist.unshift(res.data);
        $('#playlist-new').hide();
        that.prop('disabled', false);
        $("#playlist-new-title").val('');
        renderPlaylist();
      });
    });

    // remove 
    $(document).on('click', '#playlist-remove', function(e){
      var that = $(this),
          $el  = $(this).closest('.playlist-list-item'),
          $id  = $el.attr('data-post-id');

      that.parent().find('button').prop('disabled', 'disabled');
      
      $.ajax({
         type : "POST",
         dataType : "json",
         url : ajax.ajax_url,
         data : {action: "ajax_playlist", nonce: ajax.nonce, post_id: $id, type: 'd'}
      }).done(function( res ) {
        if(res.status == 'success'){
          $.each(playlist, function( index, value ) {
            if($id == playlist[index]['id']){
              playlist.splice( index, 1);
              return false;
            }
          });
          renderPlaylist();
        }
      });
    });

    // update
    $(document).on('click', '#playlist-add, #playlist-del', function(e){
      var that = $(this),
          $id  = that.closest('.playlist-list-item').attr('data-post-id'),
          $obj = getObj($id, playlist);

      that.parent().find('button').prop('disabled', 'disabled');

      if(that.is('#playlist-add')){
        $obj['track'].push(id);
      }else{
        $obj['track'].splice( $.inArray(id, $obj['track']), 1);
      }
      
      $.ajax({
         type : "POST",
         dataType : "json",
         url : ajax.ajax_url,
         data : {action: "ajax_playlist", nonce: ajax.nonce, post_id: $id, track: $obj['track'], type: 'u'}
      }).done(function( res ) {
        if(res.status == 'success'){
          that.parent().find('button').prop('disabled', false);
          renderPlaylist();
        }
      });
    });

    $(document).on('click', '#playlist-thumb, #playlist-title', function(e){
      $('#playlists').modal('hide');
    });

    function renderPlaylist(){
      // render list
      $('#playlist-list').empty();

      $.each(playlist, function(index, value){
        var $el = $( "#playlist-list-item > div" ).clone();
        $el.attr('data-post-id', value['id']);
        $el.find('#playlist-thumb img').attr('src', value['thumb'] );
        $el.find('#playlist-title').html( value['title'] );
        $el.find('#playlist-count').html( value['track'].length );
        $el.find('#playlist-thumb').attr('href', value['url']);
        $el.find('#playlist-title').attr('href', value['url']);
        if( $.inArray( id, value['track'] ) !== -1 ){
          $el.find('#playlist-del').show();
          $el.find('#playlist-add').hide();
        }else{
          $el.find('#playlist-del').hide();
          $el.find('#playlist-add').show();
        }

        $('#playlist-list').append($el);
      })
    }

    function getObj(key, objs){
      var $obj = false;
      $.each(objs, function( index, value ) {
        if(key == objs[index]['id']){
          $obj = objs[index];
          return;
        }
      });
      return $obj;
    }

})(jQuery);

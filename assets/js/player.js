(function ($) {
  "use strict";
  
  if($('.playlist').length == 0) return;

  var player;

  if( mep.mepPlaylistTracks.length > 0 ){
    initPlayer();
  }

  // init player
  function initPlayer(){
    $('.app-player').removeClass('hide');
    $('#app').removeClass('hide-player');

    var playlist = $( '.playlist' ).mepPlaylist({
      audioHeight: '40',
      audioWidth: '100%',
      videoHeight: '40',
      videoWidth: '100%',
      audioVolume: 'vertical',
      mepPlaylistLoop: true,
      alwaysShowControls: true,
      mepSkin: 'mejs-audio',
      mepResponsiveProgress: true,
      mepAutoPlay: false,
      mepSelectors: {
        playlist: '.playlist',
        track: '.track',
        tracklist: '.tracks'
      },
      features: [
        //'meplike',
        'mepartwork',
        'mepcurrentdetails',
        'mepplaylist',
        'mephistory',
        'mepprevioustrack',
        'playpause',
        'mepnexttrack',
        'progress',
        'current',
        'duration',
        'volume',
        'mepicons',
        'meprepeat',
        'mepshuffle',
        'mepsource',
        'mepbuffering',
        'meptracklist',
        'mepplaylisttoggle',
        'youtube'
      ],
      mepPlaylistTracks: mep.mepPlaylistTracks
    });

    // get player, then you can use the player.mepAdd(), player.mepRemove(), player.mepSelect()
    player = playlist.find('audio, video')[0].player;

    // event on like btn
    player.$node.on('like.mep', function(e, trackid){
      $('[track-id='+trackid+']').toggleClass('is-like');
    });

    // event on set track
    var timeoutID = null;
    player.$node.on( 'setTrack.mep', function( e, track, player ) {
      playlist.find('audio, video').attr('title', track.title);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(function() { countPlay(); }, 10000); 
    });

    // event on play
    player.$node.on('play', function(e){
      updateDisplay();
    });

    // event on pause
    player.$node.on('pause', function(e){
      updateDisplay();
    });

    player.$node.on('ended', function(e){
      
    });

    // update when pjax end
    $(document).on('pjaxEnd', function() {
      updateDisplay();
    });
  }

  // simulate the play btn
  $(document).on('click.btn', '.btn-playpause, .btn-queque', function(e){
      e.stopPropagation();
      var self = $(this),
          item = $(this).closest('.item'),
          id = item.attr('data-id'),
          type = item.data('user-id') ? 'user' : 'post',
          play = true;

      if(!player){
        getItem(id, type).done(function(obj){
          if(obj.status == 'success'){
            mep.mepPlaylistTracks = obj.tracks;
            initPlayer();
            player && player.mepSelect(0, true);
          }
        });
        return;
      }

      if(self.is('.btn-queque')){
        play = false;
        self.parent().dropdown('toggle');
      }
      if( self.hasClass('is-playing') ){
        self.removeClass('is-playing');
        player.pause();
      }else{
        var index = player.find(id);
        if( index !== -1){
          var track = player.mepGetCurrentTrack();
          if(track && track.id == id && !play) return;
          player.mepSelect(index, true);
        }else{
          getItem(id, type).done(function(obj){
            if(obj.status == 'success'){
              addToPlay(obj.tracks, play);
            }
          });
        }
      }
  });

  function countPlay(){
    var track = player.mepGetCurrentTrack();
    $.ajax({
       type : "post",
       dataType : "json",
       url : ajax.ajax_url,
       data : {action: "ajax_post_views", post_id : track.id, nonce: ajax.nonce},
       success: function(obj) {
          if(obj.status == 'success'){
            var id = '[data-id="'+track.id+'"]';
            $(id).find('.views-count').html(obj.count);
          }
       }
    });
  }

  function getItem(id, type){
    return $.ajax({
       type : "post",
       dataType : "json",
       url : ajax.ajax_url,
       data : {action: "ajax_music", id : id, type: type, nonce: ajax.nonce}
    });
  }

  function addToPlay(obj, play){
    if(obj.length == 1){
      player.mepAdd( obj[0], play );
    }else if(obj.length > 1){
      if(play){
        player.options.mepPlaylistTracks = obj;
        player.updatemepList();
        player.mepSelect(0, true);
      }else{
        for(var i=0; i<obj.length; i++){
          player.mepAdd( obj[i] );
        }
      }
    }
  }

  function updateDisplay(){
    $('[data-id]').removeClass('active').find('.btn-playpause').removeClass('is-playing').parent().removeClass('active');
    var track = player.mepGetCurrentTrack();
    if(!track || !track.id) return;
    var id = '[data-id="'+track.id+'"]';
    if(track.parent){
      id += ', [data-id="'+track.parent+'"]';
    }
    var item = $(id);
    if( player.media.paused ){
      item.removeClass('active').find('.btn-playpause').removeClass('is-playing').parent().removeClass('active');
    }else{
      item.addClass('active').find('.btn-playpause').addClass('is-playing').parent().addClass('active');
    }
  }

})(jQuery);

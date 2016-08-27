soundManager.url = 'swf/';
soundManager.debugMode = false;
soundManager.consoleOnly = false;

var file,id,oldId,oldFile,player=false;

$(function(){
	$('.track-play').click(function(){
		id = $(this).attr('id');
		file = $(this).attr('file');		
		
		if(player == true && id != oldId){
			stop(oldFile);
			$('#'+oldId).next().fadeOut(10);
			$('#'+oldId).delay(10).fadeIn(10);
		}
		player = true;
		oldId = id;		
		oldFile = file;		
		play(file,id);
		$(this).fadeOut(200);
		$(this).next().delay(200).fadeIn(300);
	});
});
$(function(){
	$('.track-pause').click(function(){
		file = $(this).prev().attr('file');
		pause(file);
		$(this).fadeOut(200);
		$(this).prev().delay(200).fadeIn(300);
	});
});



function play(file,id){
soundManager.createSound(file,file);
soundManager.setVolume(file, 100);
soundManager.play(file,{onfinish: function() {
	id = parseFloat(id);
	newId = id + 1;
	newFile = $('#'+newId).attr('file');
	if(newFile != undefined){
		play(newFile,newId);
		$('#'+id).next().fadeOut(10);
		$('#'+id).delay(10).fadeIn(10);
		$('#'+newId).fadeOut(10);
		$('#'+newId).next().delay(10).fadeIn(10);
	}else{
		$('#'+id).next().fadeOut(10);
		$('#'+id).delay(10).fadeIn(10);
	}
	
}
});

}
function pause(file){
soundManager.pause(file);
}
function stop(oldId){
soundManager.stop(oldId);
}
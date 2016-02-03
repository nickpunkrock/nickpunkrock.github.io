soundManager.url = 'http://rockulica/wp-content/themes/rockulica/scripts/swf/';
soundManager.debugMode = false;
soundManager.consoleOnly = false;

var file,id,oldId,oldFile,player=false;

$(function(){
	$('.play').click(function(){
		id = $(this).attr('id');
		file = $(this).attr('data-file');		
		
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
	$('.pause').click(function(){
		file = $(this).prev().attr('data-file');
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
	newFile = $('#'+newId).attr('data-file');
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
$(function(){
	var obj = {width:"100%", height:"auto", defaultText:'Digite e aperter enter!', removeWithBackspace : false}
	$('#cadTranslation').tagsInput(obj);
	$('#cadPartOfSpeach').tagsInput(obj);
	$('#cadSetence').tagsInput(obj);

	var edit=false;
	var oldWord='';

	function updateList(){
		$('#wordList').html('');
		for (var i in localStorage) {
			$('#wordList').append('<li><a href="#pageView">'+i+'</a></li>');
		}
			$('#wordList').listview('refresh');
	}
	updateList();

	$('#btCad').click(function(){
		$('#word').val('');
		$('#cadTranslation').val('');
		$('#cadPartOfSpeach').val('');
		$('#cadSetence').val('');

	});
	$('#btSave').click(function(){
		if(edit=true && oldWord!=$('#word').val()){
			localStorage.removeItem(oldWord);
			edit=false;
			oldWord='';
		}
		var registro = {
			cadTranslation: $('#cadTranslation').val(),
			cadPartOfSpeach: $('#cadPartOfSpeach').val(),
			cadSetence: $('#cadSetence').val(),
			};
		$('#recWord').html($('#word').val());
		$('#recTranslation').html(registro.cadTranslation);
		$('#recPartOfSpeach').html(registro.cadPartOfSpeach);
		$('#recSetence').html(registro.cadSetence);
		registro=JSON.stringify(registro);
		localStorage.setItem($('#word').val(), registro);
		
		$.mobile.changePage('#saveOk', 'pop');
		updateList();
	});
	$('#wordList').on("click","li", function(){
		var word = $(this).first().text();
		var registro = JSON.parse(localStorage.getItem(word))
		$('#recWord').html(word);
		$('#recTranslation').html(registro.cadTranslation);
		$('#recPartOfSpeach').html(registro.cadPartOfSpeach);
		$('#recSetence').html(registro.cadSetence);
	});
	$('#btEdit').click(function(){
		
		var word= $('#recWord').html();
		var registro = JSON.parse(localStorage.getItem(word))
		edit=true;
		oldWord=word;
		$('#word').val(word);
		$('#cadTranslation').importTags(registro.cadTranslation);
		$('#cadPartOfSpeach').importTags(registro.cadPartOfSpeach);
		$('#cadSetence').importTags(registro.cadSetence);

		$.mobile.changePage('#pageCad');

	})

})
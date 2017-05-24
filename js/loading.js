let everythingLoaded = setInterval(function() {
	if (/loaded|complete/.test(document.readyState)) {
		clearInterval(everythingLoaded);
		init();
	}
}, 10);

function init() {	
	$.when(
		setTimeout(function() {
			$('#loading-overlay').animate({'opacity': '0'}, 1000)
		}, 500)).then(function() {
			setTimeout(function() {
				$('#loading-overlay').css('display', 'none');
				$('#container, #footer').css('display', 'block').animate({'opacity': '1'}, 1000);
			}, 600);
	});
}
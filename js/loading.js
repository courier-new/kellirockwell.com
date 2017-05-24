let everythingLoaded = setInterval(function() {
	if (/loaded|complete/.test(document.readyState)) {
		clearInterval(everythingLoaded);
		setTimeout(function() {
			$('#loading-overlay').addClass('loaded');
		}, 500);
	}
}, 10);
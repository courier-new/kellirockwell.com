$(window).on("load", function() {
	let everythingLoaded = setInterval(function() {
		if (/loaded|complete/.test(document.readyState)) {
			clearInterval(everythingLoaded);
			setTimeout(function() {
				$('body').addClass('loaded');
			}, 500);
		}
	}, 10);
});
$(window).on("load", function() {
	$.when(preload(projScreensArr)).then(function() {
		let everythingLoaded = setInterval(function() {
			if (/loaded|complete/.test(document.readyState)) {
				clearInterval(everythingLoaded);
				setTimeout(function() {
					$('body').addClass('loaded');
				}, 500);
			}
		}, 10);
	});
});

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}
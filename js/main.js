$(document).ready(function() {
	
	var sections = [];
	addNavs();

	function checkWidths() {
		var $windowWidth = $(window).width();
		$('#logo-holder img').attr('style', '');
		var $rightWidth = $windowWidth - $('.left-side').width();
		// if ($rightWidth < 600 || $windowWidth < 1025) {
		// 	$('.right-side').addClass('mob');
		// 	$('.right-side').removeClass('full');
		// } else {
		// 	$('.right-side').removeClass('mob');
		// 	$('.right-side').addClass('full');
		// }
		// if ($windowWidth < 1025) {
		// 	$('#main-block').addClass('mob');
		// 	$('#main-block').removeClass('full');
		// } else {		
		// 	$('#main-block').removeClass('mob');			
		// 	$('#main-block').addClass('full');
		// }
		
	}
	$(window).resize(function(){
		checkWidths();
	});
	checkWidths();

	$('.github').hover(function() {
		$('.github').addClass('hover');
	}, function() {
		$('.github').removeClass('hover');
	});
	$('.email').hover(function() {
		$('.email').addClass('hover');
	}, function() {
		$('.email').removeClass('hover');
	});
	$('.linkedin').hover(function() {
		$('.linkedin').addClass('hover');
	}, function() {
		$('.linkedin').removeClass('hover');
	});
	$('.facebook').hover(function() {
		$('.facebook').addClass('hover');
	}, function() {
		$('.facebook').removeClass('hover');
	});
	$('.codepen').hover(function() {
		$('.codepen').addClass('hover');
	}, function() {
		$('.codepen').removeClass('hover');
	});
	$('.resume').hover(function() {
		$('.resume').addClass('hover');
	}, function() {
		$('.resume').removeClass('hover');
	});

	$('#logo-holder img').hover(function() {
		var transform = "";
		if (!$(this).closest('.right-side').is('.mob')) {
			transform += "translate(-50%, -50%)";
		}
		if ($(this).is('.hovering')) {
			transform += " rotateY(360deg)";				
			$(this).removeClass('hovering');
		} else {
			transform += " rotateY(180deg)";			
			$(this).addClass('hovering');
		}
		$(this).css('transform', transform);
	});

	function showSection(sectionName, dir) {
		// get window height
		var offScreen = $(document).height();
		$('.inner-col').not('.hidden').each(function() {
			// get column height
			var colHeight = $(this).outerHeight();
			// remember column should be hidden
			$(this).addClass('hidden');
			// move column to just off screen
			var move = (dir === "up") ? {top: (offScreen + colHeight/1.5) + "px"} : {top: "-" + colHeight/1.5  + "px"};
			$(this).animate(move, '3s');
		});
		$('.inner-col.' + sectionName).removeClass('hidden');
		setTimeout(function() {
			$('.inner-col.hidden').each(function() {
				$(this).css('display', 'none');
			 });
		}, 500);
		$('.inner-col').not('.hidden').each(function() {
			// get column height
			var colHeight = $(this).outerHeight();
			// move column to just off screen
			var move = (dir === "up") ? "-" + colHeight/1.5 : offScreen + colHeight/1.5;
			$(this).css('top', move + "px");
			// make column visible
		  	$(this).css('display', 'block');
		  	$(this).animate({top: 50 + "%"}, '3s');
		});
	}

	$('#intro h3').click(function() {
		showSection("about", "down");
	});

	$('.nav-item').not('.active').click(function() {
		var selSection = $(this).attr('class').split(" ")[1];
		var currSection = "";
		$(this).siblings().each(function() {
			currSection += ($(this).is('.active')) ? $(this).attr('class').split(" ")[1] : "";
		});
		// check whether moving to section before (up) or after (down) current section
		var dir = (sections.indexOf(currSection) > sections.indexOf(selSection)) ? "up" : "down";
		showSection(selSection, dir);
	});


	function addNavs() {
		var nav = "";
		var count = 1;
		$('.inner-col').each(function() {
			var className = $(this).attr('class').split(" ")[1];
			// remember all the sections for directional navigation
			sections.push(className);
			nav += "<div class='nav-item " + className + "'>\n";
			nav += className;
			nav += "\n</div>\n";
			if (count !== $('.inner-col').length) { // for all but the last nav item
				nav += "<span> ♦ </span>\n";
			}
			count++;
		});

		$('.nav').each(function() {
			$(this).html(nav);
			var className = $(this).closest('.inner-col').attr('class').split(" ")[1];
			$(this).find('.nav-item.' + className).each(function() {$(this).addClass('active');});
		});
	}

	function switchMeters(boxToShow) {
		$('.about .box').each(function() {
			if ($(this).is('.' + boxToShow)) {
				$(this).removeClass('hidden').css('display', 'block');
			} else {
				$(this).addClass('hidden').css('display', 'none');
			}
		});
	}

	$('#meters span').click(function() {
		if ($(this).is('.inactive')) {
			var choice = $(this).text().toLowerCase();
			$('#meters span').each(function() {
				$(this).removeClass('active');
				$(this).addClass('inactive');
			});
			$(this).removeClass('inactive');
			$(this).addClass('active');
			switchMeters(choice);
		}
	});	
});
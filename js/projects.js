let scrollPosition = [0, 0];

let projData;
let projScreensArr = [];
$.when(getProjects()).then(function() {
	addProjects();
});

let lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio voluptatibus enim esse quis quaerat quam suscipit necessitatibus provident, nostrum perspiciatis voluptatem perferendis dolor, hic officia ipsam laboriosam possimus doloremque tenetur atque aspernatur.";
let lorem2 = " Nesciunt ad ratione quis consequuntur doloribus animi in architecto itaque delectus esse consectetur iste nobis voluptatum, quibusdam alias eveniet enim rerum eos debitis odit. Saepe quisquam nobis, magni voluptate asperiores molestiae recusandae excepturi officia porro, nam maxime architecto corporis id nulla.";

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getProjects() {
	$.getJSON('./js/projects.json', function(data) {
		projData = data;		
 	});
}

function addProjects() {
	let currProjList = "";
	let oldProjList  = "";
	$(projData.projects).each(function() {
		let curr   = $(this)[0];
		projScreensArr.push(curr.screen);
		let output = "<li class='project-card'>\n";
		output += "<div>\n<div class='project-img' style='background-image:url(\"";
		output += curr.logo;
		output += "\");'></div>\n";
		output += "<div class='project-info'>\n";
		output += "<h1>" + curr.name + "</h1>\n";
		output += "<span class='desc'>" + curr.short + "</span>\n";
		output += "<span class='cats'>\n";
		output += "<div>\n";
		output += "<i class='fa fa-male' aria-hidden='true'></i>\n";
		output += "<span>" + curr.team + "</span>\n";
		output += "</div>\n<div>\n";
		// split timescale into ["start", "end"]
		let arr = curr.timescale.split(" - ");
		// split timescale into ["s mm", "s yyyy", "e mm", "e yyyy"]
		arr = jQuery.map(arr, function(n, i) {
			return (n.split("/"));
		});
		// if project is a past project
		if (curr.type === "past") {
			// if timescale years are the same
			if (arr[1] == arr[3]) {
				// just show one
				output += arr[1];
			} else {
				// otherwise show year range
				output += arr[1] + " - " + arr[3];
			}
		// if project is current project
		} else {
			output += "since " + arr[1];
		}
		output += "</div>\n";
		output += "</span>\n";
		output += "</div>\n</div>\n</li>\n";
		if (curr.type === "current") {
			currProjList += output;
		} else {
			oldProjList  += output;
		}
	});
	$('.projects-list.current').html(currProjList);
	$('.projects-list.old').html(oldProjList);
}

function toggleInfo(dir, proj) {
	let card;
	// Find matching project card
	$('.project-card h1').each(function() {
		if ($(this).text() == proj) {
			card = $(this).closest('.project-card');
		}
	});
	// Find data in projData from json
	let projObj;
	for (let i = 0; i < projData.projects.length; i++) {
		if (projData.projects[i].name === proj) {
			projObj = projData.projects[i];
		}
	}
	let cardPos = card.position();
	let middle = [];
	middle.top = cardPos.top + card.height()/2;
	middle.left = cardPos.left + card.width()/2;

	// Find appropriate position to originate infoview from
	let $scrollTop = (mobile) ? window.pageYOffset || document.documentElement.scrollTop : $('.inner-col.projects').scrollTop();
	let $origin = (mobile) ? middle.top : (middle.top + $scrollTop);

	if (dir == "out") {
		// Form content of infoview
		let content = "<span class='exit'>✖</span>\n";
		content += "<div>\n";
		content += "<div class='non-desc'>"
		content += "<h1><strong>" + proj;
		if (projObj.link !== "") {
			content += "<a href='" + projObj.link + "' target='_blank'>";
			content += "<i class='fa fa-external-link' aria-hidden='true'></i>";
			content += "</a>";
		}
		content += "</strong>" + projObj.subtitle + "</h1>\n";
		content += "<div class='stats'>\n";			
		content += "<div class='timescale title'><div class= 'mini-head'><h2>Timescale</h2></div></div>";
		content += "<div class='team title'><div class= 'mini-head'><h2>Team</h2></div></div>";
		content += "<div class='tags title'><div class= 'mini-head'><h2>Tags</h2></div></div>";
		content += "<div class='timescale'><span>";
		let tsFormatted = projObj.timescale.split(" - ");
		content += tsFormatted[0] + " - ";
		content += tsFormatted[1] + "</span></div>\n";
		content += "<div class='team'><span>";
		content += projObj.team + "</span></div>\n";
		content += "<div class='tags'><span>";
		content += projObj.tags + "</span></div>\n";
		content += "</div>\n</div>";
		content += "<div class='desc'>\n";
		content += "<img src='" + projObj.screen + "' style='display: none' >\n";
		content += "<p>" + projObj.short + "</p>\n";
		let descArr = projObj.desc.split("\n");
		for (let j = 0; j < descArr.length; j++) {
			content += "<p>" + descArr[j] + "</p>\n";
			if (descArr.length === 1) {
				content += "<p>" + lorem + "</p>\n";
				content += "<p>" + lorem2 + "</p>\n";
			}
		}			
		content += "</div>\n</div>";

		// Find appropriate position from top to place infoview at
		let $top = findTop();			

		// Set initial position of infoview as originating from the middle of the card
		$('.extra-info').html(content).css({
			'top': $origin,
			'left': middle.left
		// Grow infoview out of card to fill screen
		}).animate({
			'top': $top,
			'left': '-=' + middle.left,
			'width': 'toggle',
			'height': 'toggle',
			'padding': '3% 3%'
		}).toggleClass('hidden');

		// After infoview finishes growing and reaches top position
		$.when($('.extra-info').position().top === $top).then(function() {
			// Fade in infoview content after 200ms
			setTimeout(function() {
				$('.extra-info *').animate({
					'opacity': 1
				});
			}, 200);
		});

		// Remember that infoview is open
		infoOpen = true;
		// Temporarily disable scroll on mobile
		if (mobile) {
			disableScroll();
		}
	} else {
		// Fade out infoview content
		$('.extra-info *, .exit').animate({
			'opacity': 0
		});

		// After infoview content finishes fading
		$.when($('.extra-info *').css('opacity') === 0).then(function() {
			// Shrink infoview back into card after 200ms
			setTimeout(function() {
				$('.extra-info').animate({
					'top': $origin,
					'left': middle.left,
					'width': 'toggle',
					'height': 'toggle',
					'padding': '0'
				}).toggleClass('hidden');
				$('.left-side .overlay-container').animate({
					'opacity': '0'
				});
			}, 200);
		});

		// Remember that infoview is no longer open
		infoOpen = false;
		// Re-enable scroll on mobile
		if (mobile) {
			enableScroll();
		}
	}
}

function findTop() {
	let $scrollTop = (mobile) ? window.pageYOffset || document.documentElement.scrollTop : $('.inner-col.projects').scrollTop();
	let $buffer = window.innerHeight/50;
	let $headerHeight = (mobile) ? $('.left-side').outerHeight() : 0;
	return ($scrollTop + $buffer - $headerHeight);
}

// For mobile, move infoview with document scroll
$(window).bind('scroll', function() {
	if (infoOpen) {
		let top = findTop();
		$('.extra-info').css('top', top);
	}
});

// For non-mobile, move infoview with right side column scroll
$('.inner-col.projects').bind('scroll', function() {
	if (infoOpen) {
		let top = findTop();
		$('.extra-info').css('top', top);
	}
});

$('.nav-item').not('.active').click(function() {
	// Make sure project infoview is not open when trying to switch section
	if (!$('.extra-info').is('.hidden')) {
		// If it is, toggle it
		let proj = $('.extra-info').find('h1 strong').text();
		toggleInfo("in", proj);
	}
});

// Open infoview
$('body').on('click', '.project-card', function() {
	let proj = $(this).find('h1').text();
	// Only open infoview if another is not already open
	if (!infoOpen) {
		toggleInfo("out", proj);
	}
});

// Close infoview
$('body').on('click', '.extra-info .exit', function() {
	let proj = $(this).parent().find('h1 strong').text();
	toggleInfo("in", proj);
});

// Animate screenshot of project over left side of page
$('body').on('mouseenter', '.project-card', function() {
	// only for non-mobile
	if (!mobile) {
		// Get overlay container
		let dest = $('.left-side .overlay-container');
		// Get name of hovered project
		let head = $(this).find('h1').text();
		// Only allow changing background if info view is hidden
		if ($('.extra-info').not('.hidden').length === 0) {
			// Cut any ongoing animations short
			dest.stop(true);
			// Search for hovered project's data
			$(projData.projects).each(function() {
				let curr = $(this)[0];
				// When project is found
				if (head === curr.name) {
					// Set overlay's background image to url stored in data
					dest.css('background-image', 'url("' + curr.screen + '")');
					dest.find('.overlay-caption').html(curr.caption).animate({
					});
				}
			});
			// Bring overlay to full opaqueness
			dest.animate({
				'opacity': '1'
			});
		}
	}
});

$('body').on('mouseleave', '.project-card', function() {
	// only for non-mobile
	if (!mobile) {
		// Get overlay container
		let dest = $('.left-side .overlay-container');
		// Only allow changing background if info view is hidden
		if ($('.extra-info').not('.hidden').length === 0) {
			// Reduce overlay to full transparency
			dest.animate({
				'opacity': '0'
			});
		}
	}
});

// Lock scroll position for outer window, but retain current scroll position (for mobile)
function disableScroll() {
	// Remember current scroll position
	scrollPosition = [
		self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft,
		self.pageYOffset || document.documentElement.scrollTop  || document.body.scrollTop
	];
	// Make outer window (html) unscrollable
	$('html').css('overflow', 'hidden');
	// Jump back to last scroll position
	window.scrollTo(scrollPosition[0], scrollPosition[1]);
}

// Unlock scroll position
function enableScroll() {
	// Make outer window (html) scrollable again
	$('html').css('overflow', 'initial');
	// Jump back to last scroll position
	window.scrollTo(scrollPosition[0], scrollPosition[1])
}
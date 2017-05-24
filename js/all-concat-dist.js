'use strict';

/**
 * all-concat.js
 *
 * Concatenates all compiled js files together
 *
 * jQuery 3.2.0+
 *
 * @author    Kelli Rockwell <kellirockwell@mail.com>
 */

// @prepros-append begin.js
// @prepros-append loading.js
// @prepros-append main.js
// @prepros-append projects.js
// @prepros-append end.js

// Outer wrapper
(function () {
	var everythingLoaded = setInterval(function () {
		if (/loaded|complete/.test(document.readyState)) {
			clearInterval(everythingLoaded);
			setTimeout(function () {
				$('#loading-overlay').addClass('loaded');
			}, 500);
		}
	}, 10);
	// size of window corresponding to minimum size considered "desktop"
	var MOBILE_SIZE = 800;

	// empty array to hold list of page sections
	var sections = [];

	// immediately add navs after page finishes loading
	// needs to happen before jquery nav item event listeners
	addNavs();

	/**
  * function checkWidths
  *
  * checks current width of window and decides whether or not to toggle mobile view
  * 
  * @return null
  */
	function checkWidths() {
		// remember window width
		var $windowWidth = $(window).width();
		// if window is mobile size but mobile view is not yet enabled
		if ($windowWidth <= MOBILE_SIZE && !mobile) {
			// remember that mobile view is active
			mobile = true;
			// show each section
			$('.inner-col').each(function () {
				// make section visible and add "mobile" class to make each display in a line at static positions
				$(this).removeClass('hidden').addClass('mobile').css('display', 'block');
			});
			if (infoOpen) {
				var proj = $('.extra-info .exit').parent().find('h1 strong').text();
				toggleInfo("in", proj);
			}
			// if window is full size and mobile view is currently enabled
		} else if ($windowWidth > MOBILE_SIZE && mobile) {
			// remember that mobile view is no longer active
			mobile = false;
			// hide each section except the home section
			$('.inner-col').not('.home').each(function () {
				// make section hidden and remove "mobile" class
				$(this).removeClass('mobile').addClass('hidden').css('display', 'none');
			});
			// reset home section to top middle position and remove "mobile" class
			$('.inner-col.home').removeClass('mobile').css('top', '50%');
			if (infoOpen) {
				var _proj = $('.extra-info .exit').parent().find('h1 strong').text();
				toggleInfo("in", _proj);
			}
		}
	}

	// check window width on any screen resize
	$(window).resize(function () {
		checkWidths();
	});

	// also check window width immediately after page loads
	checkWidths();

	// rotate logo on hover if in non-mobile view
	$('#logo-holder img').hover(function () {
		// only for non-mobile
		if (!mobile) {
			rotateLogo($('#logo-holder img'));
		}
	});

	// rotate logo on tap if in mobile view
	$('#logo-holder img').click(function () {
		// only for mobile
		if (mobile) {
			rotateLogo($('#logo-holder img'));
		}
	});

	/**
  * function rotateLogo
  * 
  * handles rotating the logo
  * 
  * @return null
  */
	function rotateLogo($logo) {

		// begin by maintaining the logo's centered position
		var transform = "translate(-50%, -50%)";
		// if the logo is already rotated
		if ($logo.is('.rotated')) {
			// rotate it all the way back
			transform += " rotateY(360deg)";
			// remember that it is no longer rotated				
			$logo.removeClass('rotated');
			// if the logo is not already rotated
		} else {
			// rotate it around halfway
			transform += " rotateY(180deg)";
			// remember that it is now rotated		
			$logo.addClass('rotated');
		}
		// perform full transformation
		$logo.css('transform', transform);
	}

	/**
  * function showSection
  * 
  * reveals the input section of the page and hides current section
  *
  * @param {string} sectionName | single word identifier of section to reveal
  * @param {string} dir         | "up" or "down," direction of new section relative to old one
  * @return null
  */
	function showSection(sectionName, dir) {

		// only for non-mobile
		if (!mobile) {
			// get window height
			var offScreen = $(document).height();
			// slide old section (only .inner-col not .hidden) off screen
			$('.inner-col').not('.hidden').each(function () {
				// get column height
				var colHeight = $(this).outerHeight();
				// remember column should be hidden
				$(this).addClass('hidden');
				// animate moving column to just off screen
				var move = dir === "up" ? { top: offScreen + colHeight / 1.5 + "px" } : { top: "-" + colHeight / 1.5 + "px" };
				$(this).animate(move, '3s');
			});
			// mark new section to be revealed
			$('.inner-col.' + sectionName).removeClass('hidden');
			// slide new section (only .inner-col not .hidden) on screen
			$('.inner-col').not('.hidden').each(function () {
				// get column height
				var colHeight = $(this).outerHeight();
				// move column to just off screen
				var move = dir === "up" ? "-" + colHeight / 1.5 : offScreen + colHeight / 1.5;
				$(this).css('top', move + "px");
				// animate making column visible
				$(this).css('display', 'block');
				$(this).animate({ top: 50 + "%" }, '3s');
			});
			// now every section except the new one is .hidden; make sure none are actually displayed on screen
			setTimeout(function () {
				$('.inner-col.hidden').each(function () {
					$(this).css('display', 'none');
				});
			}, 500);
		}
	}

	// for navigating to next section from home section, which has no nav
	$('#intro h3').click(function () {
		showSection("about", "down");
	});

	// change section on click of an inactive nav menu item
	$('.nav-item').not('.active').click(function () {
		// get the name of the section to navigate to
		var selSection = $(this).attr('class').split(" ")[1];
		// get the name of the currently visible section by iterating through nav menu items to find the active one
		var currSection = "";
		$(this).siblings().each(function () {
			currSection += $(this).is('.active') ? $(this).attr('class').split(" ")[1] : "";
		});
		// check whether moving to section before (up) or after (down) current section
		var dir = sections.indexOf(currSection) > sections.indexOf(selSection) ? "up" : "down";
		// reveal new section
		showSection(selSection, dir);
	});

	/**
  * function addNavs
  * 
  * adds navigation menus to each page section
  *
  * @return null
  */
	function addNavs() {

		// string to hold HTML block for nav menu
		var nav = "";
		// counter to check for last section
		var count = 1;
		// for each page section
		$('.inner-col').each(function () {
			// remember name of section
			var className = $(this).attr('class').split(" ")[1];
			// add sections to array to use for directional navigation
			sections.push(className);
			// add nav item for section
			nav += "<div class='nav-item " + className + "'>\n";
			nav += className;
			nav += "\n</div>\n";
			// if section is not the last
			if (count !== $('.inner-col').length) {
				// add a divider to the nav menu
				nav += "<span> ♦ </span>\n";
			}
			// increment counter
			count++;
		});

		// for each empty HTML .nav element
		$('.nav').each(function () {
			// fill with the nav HTML block
			$(this).html(nav);
			// remember name of the section the nav block is added to
			var className = $(this).closest('.inner-col').attr('class').split(" ")[1];
			// mark that section name as the active item on the nav menu
			$(this).find('.nav-item.' + className).each(function () {
				$(this).addClass('active');
			});
		});
	}

	/**
  * function switchMeters
  * 
  * performs a switch of meters displayed
  *
  * @param {string} boxToShow | the name of the meters box to change to
  */
	function switchMeters(boxToShow) {

		// set all boxes to hidden except boxToShow's
		$('.about .box').each(function () {
			if ($(this).is('.' + boxToShow)) {
				$(this).removeClass('hidden').css('display', 'block');
			} else {
				$(this).addClass('hidden').css('display', 'none');
			}
		});
		// set all meter headers to inactive except boxToShow's
		$('#meters span').each(function () {
			if ($(this).is('.' + boxToShow)) {
				$(this).removeClass('inactive').addClass('active');
			} else {
				$(this).removeClass('active').addClass('inactive');
			}
		});
	}

	// change meters on click of an inactive meters header
	$('#meters span').click(function () {
		if ($(this).is('.inactive')) {
			// identify choice of next meters
			var choice = $(this).attr('class').split(" ")[0];
			// switch to choice of meters
			switchMeters(choice);
		}
	});

	// change meters on click of the meters box
	$('.box').click(function () {
		var curr = $(this).attr('class').split(" ")[0];
		var next = '';
		// rotate to next meters
		if (curr === 'skills') {
			next = 'qualities';
		} else if (curr === 'qualities') {
			next = 'interests';
		} else {
			next = 'skills';
		}
		// switch to next meters
		switchMeters(next);
	});

	var scrollPosition = [0, 0];

	var projData = void 0;
	getProjects();
	setTimeout(function () {
		addProjects();
	}, 200);

	var lorem = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odio voluptatibus enim esse quis quaerat quam suscipit necessitatibus provident, nostrum perspiciatis voluptatem perferendis dolor, hic officia ipsam laboriosam possimus doloremque tenetur atque aspernatur.";
	var lorem2 = " Nesciunt ad ratione quis consequuntur doloribus animi in architecto itaque delectus esse consectetur iste nobis voluptatum, quibusdam alias eveniet enim rerum eos debitis odit. Saepe quisquam nobis, magni voluptate asperiores molestiae recusandae excepturi officia porro, nam maxime architecto corporis id nulla.";

	function getRandomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	function getProjects() {
		$.getJSON('./js/projects.json', function (data) {
			projData = data;
		});
	}

	function addProjects() {
		var currProjList = "";
		var oldProjList = "";
		$(projData.projects).each(function () {
			var curr = $(this)[0];
			var output = "<li class='project-card'>\n";
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
			var arr = curr.timescale.split(" - ");
			// split timescale into ["s mm", "s yyyy", "e mm", "e yyyy"]
			arr = jQuery.map(arr, function (n, i) {
				return n.split("/");
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
				oldProjList += output;
			}
		});
		$('.projects-list.current').html(currProjList);
		$('.projects-list.old').html(oldProjList);
	}

	function toggleInfo(dir, proj) {
		var card = void 0;
		// Find matching project card
		$('.project-card h1').each(function () {
			if ($(this).text() == proj) {
				card = $(this).closest('.project-card');
			}
		});
		// Find data in projData from json
		var projObj = void 0;
		for (var i = 0; i < projData.projects.length; i++) {
			if (projData.projects[i].name === proj) {
				projObj = projData.projects[i];
			}
		}
		var cardPos = card.position();
		var middle = [];
		middle.top = cardPos.top + card.height() / 2;
		middle.left = cardPos.left + card.width() / 2;

		// Find appropriate position to originate infoview from
		var $scrollTop = mobile ? window.pageYOffset || document.documentElement.scrollTop : $('.inner-col.projects').scrollTop();
		var $origin = mobile ? middle.top : middle.top + $scrollTop;

		if (dir == "out") {
			// Form content of infoview
			var content = "<span class='exit'>✖</span>\n";
			content += "<div>\n";
			content += "<div class='non-desc'>";
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
			var tsFormatted = projObj.timescale.split(" - ");
			content += tsFormatted[0] + " - ";
			content += tsFormatted[1] + "</span></div>\n";
			content += "<div class='team'><span>";
			content += projObj.team + "</span></div>\n";
			content += "<div class='tags'><span>";
			content += projObj.tags + "</span></div>\n";
			content += "</div>\n</div>";
			content += "<div class='desc'>";
			content += "<p>" + projObj.short + "</p>\n";
			var descArr = projObj.desc.split("\n");
			for (var j = 0; j < descArr.length; j++) {
				content += "<p>" + descArr[j] + "</p>\n";
				if (descArr.length === 1) {
					content += "<p>" + lorem + "</p>\n";
					content += "<p>" + lorem2 + "</p>\n";
				}
			}
			content += "</div>\n</div>";

			// Find appropriate position from top to place infoview at
			var $top = findTop();

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
			$.when($('.extra-info').position().top === $top).then(function () {
				// Fade in infoview content after 200ms
				setTimeout(function () {
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
			$.when($('.extra-info *').css('opacity') === 0).then(function () {
				// Shrink infoview back into card after 200ms
				setTimeout(function () {
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
		var $scrollTop = mobile ? window.pageYOffset || document.documentElement.scrollTop : $('.inner-col.projects').scrollTop();
		var $buffer = window.innerHeight / 50;
		var $headerHeight = mobile ? $('.left-side').outerHeight() : 0;
		return $scrollTop + $buffer - $headerHeight;
	}

	// For mobile, move infoview with document scroll
	$(window).bind('scroll', function () {
		if (infoOpen) {
			var top = findTop();
			$('.extra-info').css('top', top);
		}
	});

	// For non-mobile, move infoview with right side column scroll
	$('.inner-col.projects').bind('scroll', function () {
		if (infoOpen) {
			var top = findTop();
			$('.extra-info').css('top', top);
		}
	});

	$('.nav-item').not('.active').click(function () {
		// Make sure project infoview is not open when trying to switch section
		if (!$('.extra-info').is('.hidden')) {
			// If it is, toggle it
			var proj = $('.extra-info').find('h1 strong').text();
			toggleInfo("in", proj);
		}
	});

	// Open infoview
	$('body').on('click', '.project-card', function () {
		var proj = $(this).find('h1').text();
		// Only open infoview if another is not already open
		if (!infoOpen) {
			toggleInfo("out", proj);
		}
	});

	// Close infoview
	$('body').on('click', '.extra-info .exit', function () {
		var proj = $(this).parent().find('h1 strong').text();
		toggleInfo("in", proj);
	});

	// Animate screenshot of project over left side of page
	$('body').on('mouseenter', '.project-card', function () {
		// only for non-mobile
		if (!mobile) {
			// Get overlay container
			var dest = $('.left-side .overlay-container');
			// Get name of hovered project
			var head = $(this).find('h1').text();
			// Only allow changing background if info view is hidden
			if ($('.extra-info').not('.hidden').length === 0) {
				// Cut any ongoing animations short
				dest.stop(true);
				// Search for hovered project's data
				$(projData.projects).each(function () {
					var curr = $(this)[0];
					// When project is found
					if (head === curr.name) {
						// Set overlay's background image to url stored in data
						dest.css('background-image', 'url("' + curr.screen + '")');
						dest.find('.overlay-caption').html(curr.caption).animate({});
					}
				});
				// Bring overlay to full opaqueness
				dest.animate({
					'opacity': '1'
				});
			}
		}
	});

	$('body').on('mouseleave', '.project-card', function () {
		// only for non-mobile
		if (!mobile) {
			// Get overlay container
			var dest = $('.left-side .overlay-container');
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
		scrollPosition = [self.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, self.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop];
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
		window.scrollTo(scrollPosition[0], scrollPosition[1]);
	}
})();
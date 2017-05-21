$(document).ready(function() {
	
	// size of window corresponding to minimum size considered "desktop"
	const MOBILE_SIZE = 800

	// empty array to hold list of page sections
	let sections = [];

	// boolean to remember if mobile view is active
	let mobile = false;

	/**
	 * function checkWidths
	 *
	 * checks current width of window and decides whether or not to toggle mobile view
	 * 
	 * @return null
	 */
	function checkWidths() {
		// remember window width
		let $windowWidth = $(window).width();
		// if window is mobile size but mobile view is not yet enabled
		if ($windowWidth <= MOBILE_SIZE && !mobile) {
			// remember that mobile view is active
			mobile = true;
			// show each section
			$('.inner-col').each(function() {
				// make section visible and add "mobile" class to make each display in a line at static positions
				$(this).removeClass('hidden').addClass('mobile').css('display', 'block');
			});
		// if window is full size and mobile view is currently enabled
		} else if ($windowWidth > MOBILE_SIZE && mobile) { 
			// remember that mobile view is no longer active
			mobile = false;
			// hide each section except the home section
			$('.inner-col').not('.home').each(function() {
				// make section hidden and remove "mobile" class
				$(this).removeClass('mobile').addClass('hidden').css('display', 'none');
			});
			// reset home section to top middle position and remove "mobile" class
			$('.inner-col.home').removeClass('mobile').css('top', '50%');
		}	
	}

	// check window width on any screen resize
	$(window).resize(function(){
		checkWidths();
	});

	// also check window width immediately after page loads
	checkWidths();

	// rotate logo on hover if in non-mobile view
	$('#logo-holder img').hover(function() {
		if (!mobile) {
			rotateLogo();
		}
	});

	// rotate logo on tap if in mobile view
	$('#logo-holder img').click(function() {
		if (mobile) {
			rotateLogo();
		}
	});

	/**
	 * function rotateLogo
	 * 
	 * handles rotating the logo
	 * 
	 * @return null
	 */
	function rotateLogo() {

		// identify the logo
		let $logo = $('#logo-holder img');
		// begin by maintaining the logo's centered position
		let transform = "translate(-50%, -50%)";
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
			let offScreen = $(document).height();
			// slide old section (only .inner-col not .hidden) off screen
			$('.inner-col').not('.hidden').each(function() {
				// get column height
				let colHeight = $(this).outerHeight();
				// remember column should be hidden
				$(this).addClass('hidden');
				// animate moving column to just off screen
				let move = (dir === "up") ? {top: (offScreen + colHeight/1.5) + "px"} : {top: "-" + colHeight/1.5  + "px"};
				$(this).animate(move, '3s');
			});
			// mark new section to be revealed
			$('.inner-col.' + sectionName).removeClass('hidden');
			// slide new section (only .inner-col not .hidden) on screen
			$('.inner-col').not('.hidden').each(function() {
				// get column height
				let colHeight = $(this).outerHeight();
				// move column to just off screen
				let move = (dir === "up") ? "-" + colHeight/1.5 : offScreen + colHeight/1.5;
				$(this).css('top', move + "px");
				// animate making column visible
			  	$(this).css('display', 'block');
			  	$(this).animate({top: 50 + "%"}, '3s');
			});			
			// now every section except the new one is .hidden; make sure none are actually displayed on screen
			setTimeout(function() {
				$('.inner-col.hidden').each(function() {
					$(this).css('display', 'none');
				 });
			}, 500);
		}

	}

	// for navigating to next section from home section, which has no nav
	$('#intro h3').click(function() {
		showSection("about", "down");
	});

	// change section on click of an inactive nav menu item
	$('.nav-item').not('.active').click(function() {
		// get the name of the section to navigate to
		let selSection = $(this).attr('class').split(" ")[1];
		// get the name of the currently visible section by iterating through nav menu items to find the active one
		let currSection = "";
		$(this).siblings().each(function() {
			currSection += ($(this).is('.active')) ? $(this).attr('class').split(" ")[1] : "";
		});
		// check whether moving to section before (up) or after (down) current section
		let dir = (sections.indexOf(currSection) > sections.indexOf(selSection)) ? "up" : "down";
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
		let nav = "";
		// counter to check for last section
		let count = 1;
		// for each page section
		$('.inner-col').each(function() {
			// remember name of section
			let className = $(this).attr('class').split(" ")[1];
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
		$('.nav').each(function() {
			// fill with the nav HTML block
			$(this).html(nav);
			// remember name of the section the nav block is added to
			let className = $(this).closest('.inner-col').attr('class').split(" ")[1];
			// mark that section name as the active item on the nav menu
			$(this).find('.nav-item.' + className).each(function() {$(this).addClass('active');});
		});

	}

	// immediately add navs after page finishes loading
	addNavs();

	/**
	 * function switchMeters
	 * 
	 * performs a switch of meters displayed
	 *
	 * @param {string} boxToShow | the name of the meters box to change to
	 */
	function switchMeters(boxToShow) {

		// set all boxes to hidden except boxToShow's
		$('.about .box').each(function() {
			if ($(this).is('.' + boxToShow)) {
				$(this).removeClass('hidden').css('display', 'block');
			} else {
				$(this).addClass('hidden').css('display', 'none');
			}
		});
		// set all meter headers to inactive except boxToShow's
		$('#meters span').each(function() {
			if ($(this).is('.' + boxToShow)) {
				$(this).removeClass('inactive').addClass('active');
			} else {
				$(this).removeClass('active').addClass('inactive');
			}
		});

	}

	// change meters on click of an inactive meters header
	$('#meters span').click(function() {
		if ($(this).is('.inactive')) {
			// identify choice of next meters
			let choice = $(this).attr('class').split(" ")[0];
			// switch to choice of meters
			switchMeters(choice);
		}
	});

	// change meters on click of the meters box
	$('.box').click(function() {
		let curr = $(this).attr('class').split(" ")[0]
		let next = '';
		// rotate to next meters
		if (curr === 'skills') {
			next = 'qualities';
		} else if (curr === 'qualities') {
			next = 'interests';
		} else {
			next = 'skills'
		}
		// switch to next meters
		switchMeters(next);
	})

});
function hideCards() {
  $(".card.hidden").css("display", "none");
  $(".card").not(".hidden").each(function() {
    $(this).css("display", "block");
  });
  if (!($(".card.c1").is(".hidden"))) { // if first card is open
    $("#prev").css("display", "none");
  } else if (!$(".card.c7").is(".hidden")) { // if last card is open
    $("#next").css("display", "none");
  } else { // if middle card is open
    $("#prev").css("display", "block");
    $("#next").css("display", "block");
  }
}

function controlInstructions() {

  hideCards();

  document.getElementById("instructions-link").addEventListener('click', function() {

    handlePause();

    instr = $("#instructions");

    // only open instructions if they are not already open
    if (!$(instr).is(".open")) {
      next = $("#next");
      prev = $("#prev");

      // set instructions box to same width and height as main container
      var contWidth = $("#container").outerWidth();
      var contHeight = $("#container").outerHeight();
      $(instr).css({
        'width': contWidth,
        'height': contHeight
    });

      // get outer height of instructions box
      var instrHeight = $(instr).outerHeight();
      // get height of next and prev links
      var nextHeight = $(next).outerHeight();      
      var prevHeight = $(prev).outerHeight();
      // get vertical middle of instructions box
      var middle = instrHeight / 2;
      // move next and prev buttons to middle
      $(next).css("top", (middle - nextHeight / 2) + "px");      
      $(prev).css("top", (middle - prevHeight / 2) + "px");  
      
      // get outer width of instructions box
      var instrWidth = $(instr).outerWidth();
      // get middle of screen
      middle = $(document).width() / 2;
      // move instructions box to just off-screen
      $(instr).css("left",-instrWidth);
      // smoothly move it into view
      $(instr).animate({left: (middle - instrWidth / 2) + "px"}, "2s");

      // remember that instructions are open
      $(instr).addClass("open");
    }

  });

  document.getElementById("next").addEventListener('click', function() {
    openCard = $(".card").not(".hidden");
    $(".card").each(function() {
      $(this).addClass("hidden");
    });
    openCard.next().removeClass("hidden");
    hideCards();
  });

  document.getElementById("prev").addEventListener('click', function() {
    openCard = $(".card").not(".hidden");
    $(".card").each(function() {
      $(this).addClass("hidden");
    });
    openCard.prev().removeClass("hidden");
    hideCards();
  });

  document.getElementById("exit").addEventListener('click', function() {

    handlePause();

    instr = $("#instructions");

    // only close instructions if they are open
    if ($(instr).is(".open")) {
      // get outer width of instructions box
      var instrWidth = $(instr).outerWidth();
      // smoothly move it out of view
      $(instr).animate({left: -instrWidth + "px"}, "2s");
      $(instr).removeClass("open");
    }

  });


}
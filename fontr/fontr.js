
var fontsArr;
var fontsRemainingArr;
var bestRecord = 0;
var currRecord = 0;
var totalRecord = 0;
var fontsRemaining = 0;
var correctFont;
var mode;
var counter = null;
var easyInc = 0.06;
var hardInc = 0.12;

function getData() {

	var data;
	
	$.getJSON('fontsData.json', function(data) {
	//$.getJSON('miniFontsData.json', function(data) { // for testing end game results only		
 	});
	fontsRemainingArr = fontsArr = data.;

}

function displayLegend(data) {

	var output="<h2>Legend</h2>\n" +
		"<p>(This will not be visible while you play!)</p>\n" +
		"<table id='legend'>\n";
	for (var i in data.fonts) {
		var currFont = data.fonts[i].fontName;
		var fontAsClass = currFont.toLowerCase().replace(/ /g, "-");
		var currFile = "fonts/" + data.fonts[i].fontFile;
	    output += "<style>\n" +
	    	"@font-face {\n" +
	    		"font-family: " + currFont + ";\n" +
	    		"src: url(" + currFile + ");\n" +
	    		"}\n" +
	    	"." + fontAsClass + " {\n" +
	    		"font-family: " + currFont + ";\n" +
	    		"}\n" +
	    	"</style>\n" +
	    	"<td>" + "<span class='" + fontAsClass + "'>" + getRandomWord("easy") + "</span></td>\n" + 
	        "<td>" + currFont + "</td>\n" + 
	        "</tr>\n" ;
	}

	output += "</table>";
	$("#legend-box").html(output);

}

function getRandomWord(mode) {

	var easyWords = ["bitter", "border", "impact", "pigeon", "camera", "mutual", "burial", "cherry", "marine", "annual", "unfair", "offset", "prayer", "carbon", "helmet", "gossip", "credit", "flavor", "mutter", "insist", "thread", "carrot", "dilute", "unrest", "narrow", "injury", "please", "bother", "follow", "relief", "hotdog", "planet", "module", "method", "cheese", "orange", "useful", "patent", "spider", "vision", "legend", "silver", "ribbon", "family", "threat", "refuse", "dinner", "trance", "slogan", "parade", "racism", "flawed", "shorts", "future", "gallon", "valley", "preach", "likely", "design", "immune", "wander", "glance", "double", "viable", "inject", "timber", "rabbit", "excuse", "kidney", "crouch", "forget", "galaxy", "moment", "jockey", "change", "peanut", "embryo", "banish", "reduce", "settle", "harass", "office", "copper", "appear", "moving", "smooth", "desert", "object", "lesson", "jungle", "closed", "acquit", "apathy", "vacuum", "depart", "outfit", "policy", "wonder", "garlic", "muscle", "defeat", "summit", "latest", "refund", "avenue", "linear", "extent", "father", "attack", "cereal", "gutter", "murder", "rotten", "agency", "pastel", "school", "access", "circle", "mosque", "stroll", "packet", "virtue", "bullet", "corpse", "matter", "friend", "scream", "porter", "margin", "indoor", "effort", "prison", "bottom", "winner", "second", "screen", "locate", "mother", "adjust", "accent", "expose", "spring", "absorb", "decade", "depend", "appeal", "denial", "sample", "switch", "resist", "mosaic", "volume", "writer", "affair", "hiccup", "canvas", "drawer", "assume", "letter", "sleeve", "unique", "listen", "update", "dollar", "basket", "bucket", "corner", "figure", "offend", "spirit", "random", "favour", "coffin", "window", "subway", "virgin", "worker", "pledge", "foster", "repeat", "finish", "exempt", "chance", "carpet", "coffee", "ballet", "system", "candle", "velvet", "social", "thanks", "colony", "earwax", "resign", "expect", "battle", "infect", "stress", "kidnap", "finger", "nuance", "clinic", "bloody", "harbor", "insure", "expand", "broken", "suntan", "cheque", "public", "choice", "relate", "medium", "tactic", "patrol", "redeem", "reader", "winter", "junior", "sketch", "waiter", "native", "cancer", "stroke", "secure", "matrix", "define", "trench", "bounce", "choose", "resort", "meadow", "shadow", "bridge", "branch", "aspect", "behave", "outlet", "common", "nature", "energy", "driver", "revise", "regret", "demand", "rocket", "cattle", "remark", "pepper", "banana", "survey", "notion", "bubble", "degree", "cancel", "manner", "freeze", "column", "height", "ballot", "wealth", "stable", "cousin", "ensure", "belief", "revoke", "hunter", "employ", "leader", "afford", "tycoon", "charge", "endure", "answer", "animal", "ritual", "accept", "center", "excess", "thesis", "Europe", "palace", "topple", "effect", "sector", "prefer", "extort", "church", "runner", "linger", "praise", "efflux", "cinema", "tenant", "option", "mirror", "deadly", "squash", "museum", "tumour", "admire", "arrest", "tiptoe", "killer", "turkey", "polite", "danger", "weight", "budget", "chorus", "belong", "number", "lawyer", "sermon", "insert", "sticky", "fossil", "happen", "revive", "clique", "strict", "extend", "season", "damage", "grudge", "weapon", "prosper", "seminar", "falsify", "control", "approve", "arrange", "costume", "gallery", "eternal", "splurge", "custody", "meaning", "welcome", "eyebrow", "pasture", "welfare", "wording", "wrestle", "retreat", "tension", "whisper", "recruit", "charity", "collect", "premium", "suggest", "opposed", "compose", "looting", "jealous", "harvest", "storage", "receipt", "version", "harmony", "highway", "thinker", "improve", "trouser", "obscure", "exploit", "pension", "garbage", "deprive", "develop", "glasses", "habitat", "rainbow", "tourist", "battery", "achieve", "stadium", "complex", "provide", "kitchen", "confuse", "compete", "company", "extract", "absence", "soldier", "feather", "auction", "minimum", "apology", "insight", "replace", "payment", "village", "sustain", "climate", "liberal", "wedding", "process", "dictate", "symptom", "sweater", "impress", "drawing", "release", "reverse", "finance", "adviser", "comment", "cutting", "feature", "concept", "ecstasy", "purpose", "monster", "explode", "auditor", "reality", "banquet", "officer", "concert", "dignity", "abridge", "wriggle", "terrify", "partner", "emotion", "reserve", "undress", "husband", "soprano", "old age", "current", "trolley", "breathe", "support", "contain", "profile", "context", "scatter", "serious", "cluster", "compact", "suspect", "maximum", "dynamic", "distant", "fitness", "fortune", "reflect", "promote", "nervous", "justice", "descent", "deposit", "program", "explain", "glacier", "trivial", "outline", "balance", "element", "variety", "counter", "visible", "gesture", "network", "enlarge", "protest", "inflate", "referee", "secular", "freckle", "outlook", "teacher", "imagine", "crystal", "shelter", "royalty", "funeral", "council", "despise", "quality", "relieve", "speaker", "alcohol", "outside", "pottery", "texture", "command", "convert", "impulse", "century", "failure", "painter", "stretch", "warning", "uniform", "housing", "channel", "recover", "tribute", "kinship", "history", "verdict", "scratch", "confine", "laborer", "posture", "produce", "scholar", "testify", "applied", "reactor", "diagram", "exclude", "snuggle", "warrant", "lineage", "abandon", "clarify", "biology", "hallway", "recycle", "project", "portion", "torture", "steward", "fantasy", "ceiling", "society", "endorse", "vehicle", "gradual", "hunting", "formula", "reptile", "privacy", "victory", "pumpkin", "precede", "retiree", "passive", "account", "courage", "indulge", "student", "pursuit", "laundry", "similar", "shallow", "primary", "country", "dilemma", "inspire", "curtain", "unaware", "dismiss", "contact", "picture", "licence", "anxiety", "witness", "variant", "present", "tragedy", "penalty", "theater", "culture", "neutral", "comfort", "musical", "grimace", "perfume", "convict", "meeting", "plastic", "sunrise", "request", "dialect", "physics", "mislead", "monarch", "passage", "abolish", "morning", "parking", "rubbish", "chapter", "concede", "protect", "message", "chicken", "subject", "mention", "initial", "journal", "passion", "respect", "measure", "prevent", "silence", "enhance", "despair", "healthy", "shatter", "attract", "average", "sulphur", "diamond", "dentist", "display", "pattern", "icicle", "record", "scrape", "square", "elapse", "global", "throat", "decide", "agenda", "launch", "notice", "minute", "strong", "heaven", "scheme", "format", "memory", "deputy", "rhythm", "morsel", "artist", "cotton", "island", "exotic", "breeze", "factor", "theory", "bottle", "script", "garage", "ethics", "normal", "return", "origin", "advice", "bishop", "output", "course", "occupy", "voyage", "critic", "facade", "borrow", "shiver", "reject", "export", "behead", "banner", "modest", "lonely", "player", "kettle", "sacred", "hammer", "barrel", "ignore", "formal", "ground", "mobile", "ladder", "length", "tumble", "honest", "spread", "twitch", "tender", "cellar", "source", "reason", "ethnic", "shrink", "crutch", "sailor", "collar", "Sunday", "punish", "dragon", "reward", "salmon", "powder", "castle", "remedy", "suburb", "tongue", "active", "affect", "series", "dealer", "safety", "singer", "tissue", "strike", "absent", "snatch", "mature", "labour", "supply", "button", "treaty", "shower", "detail", "census", "market", "throne", "middle", "empire", "flight", "visual", "review", "period", "morale", "forest", "divide", "doctor", "guitar", "install", "ticket", "sodium", "oppose", "retain", "blonde", "direct", "profit", "string", "embark", "defend", "member", "estate", "pocket", "tablet", "invite", "couple", "safari", "manage", "studio", "temple", "pillow", "growth", "differ", "bronze", "rescue", "master", "lounge", "escape", "manual", "proper", "pierce", "seller", "unlike", "result", "sister", "buffet", "rotate", "crisis", "exceed", "poetry", "filter", "reform", "speech", "needle", "desire", "makeup", "gravel", "remind"];
	var hardWords = ["pan", "bus", "way", "fix", "arm", "lay", "joy", "bin", "buy", "pop", "end", "hot", "put", "lid", "rob", "era", "see", "nun", "bed", "jet", "ice", "kit", "day", "due", "dry", "fox", "lot", "use", "add", "aid", "row", "key", "fun", "tin", "ash", "set", "tie", "eye", "ask", "can", "sit", "sum", "pie", "act", "fax", "jaw", "rub", "far", "fit", "law", "dip", "nap", "shy", "eat", "lie", "pot", "nut", "age", "say", "kid", "sun", "tap", "bag", "pat", "top", "cap", "war", "hut", "leg", "sea", "hip", "art", "air", "red", "cry", "die", "low", "oak", "tip", "fly", "pen", "man", "pin", "tax", "win", "fog", "map", "inn", "net", "old", "mug", "ton", "bat", "fee", "bar", "hit", "run", "rib", "bee", "ear", "pit", "bad", "van", "job", "raw", "new", "sow", "bet", "jam", "pay", "bay", "cut", "ant", "hay", "few", "sip", "boy", "cup", "hen", "owl", "oil"];

	var wordsList = [];
	if(mode == "easy") {
		wordsList = easyWords;
	} else {
		wordsList = hardWords;
	}

	var random = Math.floor(Math.random()*wordsList.length);
	return wordsList[random];
}

function play() {

	mode = $("#play-btn").attr("class").replace("btn", "").replace("ingame", "").replace(/ /g, "");
	currRecord = 0;
	totalRecord = 0;
	fontsRemainingArr = fontsArr;
	fontsRemaining = fontsRemainingArr.fonts.length;

	$("#game-box").css("display", "block");

	$("#play-btn").addClass("ingame");

	// hide fonts study legend and finish box
	$("#legend-box").css("display", "none");
	$("#finish-box").css("display", "none");

	updateScore();

	getNextFont("");
	
}

function removeSpaces(font, index) {
	return font.replace(/ /g,"");
}

function addChoice(font, fontDisp) {
	var html = "<td class='choice'><div>\n";
	html += "<input type='radio' id='" + font + "' name='selection' value='" + fontDisp + "' />\n";
	html += "<label for='" + font + "'>" + fontDisp + "</label>\n";
	html += "<div class='check'></div>\n";
	html += "</div></td>\n";
	return html;
}

function getNextFont(currMessage) {

	if(fontsRemaining === 0) {
		finish();
	} else {
		currMessage = currMessage;

		// choose random font
		var randIndex = Math.floor(Math.random()*fontsRemainingArr.fonts.length);
		var randFont = fontsRemainingArr.fonts[randIndex];
		correctFont = randFont.fontName;
		var fontAsClass = correctFont.toLowerCase().replace(/ /g, "-");

		// remove random font from list of remaining fonts
		var tempArr = {fonts: []};	
		for(var i = 0; i < fontsRemainingArr.fonts.length; i++) {
			if(i != randIndex) {
				// add all other fonts
				tempArr.fonts.push(fontsRemainingArr.fonts[i]);
			} else {
				// don't add randomly chosen font
			}
		}
		fontsRemainingArr = tempArr;
		fontsRemaining = fontsRemainingArr.fonts.length;

		// array to hold all other remaining fonts that are candidates for wrong options
		var otherFontsArr = {fonts: []};
		if (mode == "hard") {
			// reduce the pool to just the chosen's font's category
			for(var j in fontsRemainingArr.fonts) {
				if(fontsRemainingArr.fonts[j].category == randFont.category) {
					otherFontsArr.fonts.push(fontsRemainingArr.fonts[j]);
				}
			}
		} else {
			// on easy mode, any font can show up as a choice
			otherFontsArr = fontsArr;
		}

		// choose three other different, unique fonts
		var randFont1;
		var randFont2;
		var randFont3;
		do {
			randFont1 = otherFontsArr.fonts[Math.floor(Math.random()*otherFontsArr.fonts.length)];
		}
		while (randFont1 == randFont);
		do {
			randFont2 = otherFontsArr.fonts[Math.floor(Math.random()*otherFontsArr.fonts.length)];
		}
		while (randFont2 == randFont || randFont2 == randFont1);
		do {
			randFont3 = otherFontsArr.fonts[Math.floor(Math.random()*otherFontsArr.fonts.length)];
		}
		while (randFont3 == randFont || randFont3 == randFont1 || randFont3 == randFont2);

		// shuffle all four choices
		var fontChoices = [correctFont, randFont1.fontName, randFont2.fontName, randFont3.fontName];
		fontChoices = shuffle(fontChoices);

		var fontStrings = fontChoices.map(removeSpaces);
		
		// construct choices table
		var output = "<table id='game-card'>\n" +
			"<tr>\n" +
			"<td class='filler' rowspan='2'> </td>\n" +
			"<td class='filler' rowspan='2'> </td>\n" +
			"<td id='font-sample' rowspan='2'>\n" +
			"<span class='" + fontAsClass + "'>" + getRandomWord(mode) + "</span>\n" +
			"</td>\n" + 
			"<td class='filler' rowspan='2'> </td>\n";
	    output += addChoice(fontStrings[0], fontChoices[0]);
	    output += addChoice(fontStrings[1], fontChoices[1]);
	    output += "</tr>\n<tr>\n";
	    output += addChoice(fontStrings[2], fontChoices[2]);
	    output += addChoice(fontStrings[3], fontChoices[3]);
	    output += "</tr>\n";
	    output += "</table>\n";
	    // area for notification message, submit button, and countdown bar
	    output += "<table id='log-card'>\n";
	    output += "<tr>\n" +
	    	"<td id='notification-cell'>\n" +
	    	"<h3>" + currMessage + "</h3>" +
	    	"</td>\n" +
	    	"<td id='submit-cell'>\n" +
	    	"<div><a id='submit-btn' class='btn' role='button'>Submit</a></div>\n" +
	    	"</td>\n" +
	    	"</tr>\n" +
	    	"<tr>\n" +
	    	"<td id='countdown-cell'>\n" +
	    	"<div id='countdown' class='green'></div>\n" +
	    	"</td>\n" +
	    	"</tr>\n" +
	    	"</table>\n";

	    // print constructed table       
	    $("#game-box").html(output);

	    // create event listener to watch for clicks to the submit button
	    document.getElementById("submit-btn").addEventListener('click', function() {
	    	checkChoiceHandler();
	    }, false);

	    // create event listeners for each cell encompassing a choice to propagate clicks from the cell to checks in the radio input
	    var choices = document.getElementsByClassName("choice");
	    for (var k = 0; k < choices.length; k++) { // for each choice cell
	    	choices[k].addEventListener('click', function() { // add listener on click
	    		// check the corresponding radio input
	    		$(this).find("div input[type=radio]").prop("checked", true); 
	    	}, false);
	    }

	    // start countdown for this round
	    startCountdown({});
	}

}

function startCountdown(options) {
	var width = options.startingWidth || 0;
	var increment = options.increment || 1;
	var countdown = document.getElementById('countdown');
    clearInterval(counter);

    if(mode == "easy") {
    	increment = increment * easyInc;
    } else {
    	increment = increment * hardInc;
    }

    counter = window.setInterval(function() {
    	if (width >= 100) {
    		if (!options.postround) {
				var timeoutMessage = "<strong class='incorrect'>Time's up!</strong> " + correctFont + " was the correct choice.";
				handleCase("timeout", timeoutMessage);
			} else {
				getNextFont("");
			}
    	}
		$("#countdown").css("width",width + "%");
		width += increment;    	
    }, 5);	        
}

function stopCountdown() {
	clearInterval(counter);
	counter = null;
}

function checkChoiceHandler() {

	if($("input[name='selection']").is(":checked")) { // if radio box is checked

		stopCountdown();

		var selectedFont = $("input[name='selection']:checked").val();
			var correctMessage = selectedFont + " is <strong class='correct'>correct</strong>!";
			handleCase("good", correctMessage);
		if(selectedFont == correctFont) { // if correct radio box is checked
			
		} else { // if incorrect radio box is checked
			var incorrectMessage = "<strong class='incorrect'>Incorrect</strong>... " + correctFont + " was the correct choice.";
			handleCase("bad", incorrectMessage);
		}
	} else { // if no radio box is checked
		$("#notification-cell").html("<h3><strong class='incorrect'>You must select a choice first.</strong></h3>");
	}

}

function handleCase(type, message) {
	stopCountdown();

	var incremType;
	if(mode == "easy") {
		incremType = 0.3 / easyInc;
	} else {
		incremType = 0.3 / hardInc;
	}

	startCountdown({increment: incremType, postround: true});

	if (type == "good") {
		currRecord++;
	} else {
		currRecord = 0;
	}

	updateScore();
	$("#notification-cell").html("<h3>" + message + "</h3>");
}

function updateScore() {

	if(currRecord >= bestRecord && currRecord !== 0) {
		bestRecord = currRecord;
		$("#best-record").html(bestRecord).css({"background-color":"#e0e0e0","color":"#000"});
    	window.setTimeout(function() {$("#best-record").css({"background":"none","color":"#BDBDBD"});}, 500);
	}

	$("#curr-record").html(currRecord).css({"background-color":"#e0e0e0","color":"#000"});
    window.setTimeout(function() {$("#curr-record").css({"background":"none","color":"#BDBDBD"});}, 500);

    $("#total-record").html(totalRecord).css({"background-color":"#e0e0e0","color":"#000"});
    window.setTimeout(function() {$("#total-record").css({"background":"none","color":"#BDBDBD"});}, 500);

    $("#fonts-remaining").html(fontsRemaining).css({"background-color":"#e0e0e0","color":"#000"});
    window.setTimeout(function() {$("#fonts-remaining").css({"background":"none","color":"#BDBDBD"});}, 500);

}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // while there remain elements to shuffle
  while (0 !== currentIndex) {

    // pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // swap it with the current element
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function quit() {
	stopCountdown();

	$("#game-box").css("display", "none");

	$("#play-btn").removeClass("ingame");

	$("#legend-box").css("display", "block");
}

function finish() {
	stopCountdown();
	
	$("#game-box").css("display", "none");

	var finishText = "<table id='finish-message'>\n" +
		"<tr><td>You got</td>\n" +
		"<td><h2>" + totalRecord + " / " + fontsArr.fonts.length + "</h2></td>\n" +
		"<td>fonts.</td>\n" +
		"</tr></table><br />\n";

	var percentage = totalRecord/fontsArr.fonts.length;

	if(percentage <= 0.2) {
		finishText += "You did worse than if you had blindly selected a random option each time. Honestly I'm surprised you can even work a computer. You really don't know anything about fonts, do you? ... Unless you're a professional typographist deliberately choosing the wrong font every time?! Well which is it?!";
	} else if(percentage > 0.2 && percentage <= 0.4) {
		finishText += "You usually can distinguish Papyrus from Times New Roman but other than that they're all just letters to you. You probably used Jokerman in your last PowerPoint presentation but don't remember it. But now that I mention it, you do remember that one person stifling laughter throughout your presentation that you assumed had to do with the selfies they were taking. At least, you thought they were selfies...";
	} else if(percentage > 0.4 && percentage <= 0.6) {
		finishText += "You have basic familiarity with font types and can recognize many major fonts, but you still think all serif fonts look the same. You have potential but are strongly apathetic. You probably only finished the game because your aesthetically-inclined friend was eagerly looking over your shoulder the whole time pressuring you not to close the tab and get on with your life.";
	} else if(percentage > 0.6 && percentage <= 0.75) {
		finishText += "You've played with fonts in Word or Paint, and you tried to impress the font snobs that one time by loudly making fun of Comic Sans. You like fonts and don't just want to keep using the default Microsoft Word ones forever, but you don't like them enough to actually do anything about it. You know what good design is but likely begin to sweat uncontrollably if asked to make it yourself.";
	} else if(percentage > 0.75 && percentage <= 0.9) {
		finishText += "So you know a few things about fonts after all! You probably know Google Fonts are all the rage, and you definitely know Georgia and Cambria fill more pages than Times New Roman for the same number of words. Sometimes you recognize fonts ~in the wild~ in menus, magazines, presentations, and the like, and you generally find yourself more observant of fonts than your friends.";
	} else if(percentage > 0.9 && percentage <= 0.98) {
		finishText += "You are a proper font connoisseur. You probably have your own personal font collection that you take enormous pride in, and you definitely were more obvious than you meant to be when you were taking pictures of your coworker's horrendous font choices on their PowerPoint the other day. If people aren't already flocking to you for font advice, you think they should be. ";
	} else {
		finishText += "You are a typographical god. You probably eat, sleep, and breathe fonts, especially ones you had to pay large sums of money for. You're one of the rare few who still enforces the difference between the terms 'typeface' and 'font', and you constantly refer to some vague collection of fonts as 'the classics' even though nobody but you ever knows which fonts you're talking about. I don't know how you ended up playing this game when you've clearly already transcended it.";
	}
 
	$("#finish-box").html(finishText);
	$("#finish-box").css("display", "block");

	//$("#play-btn").removeClass("ingame");

}

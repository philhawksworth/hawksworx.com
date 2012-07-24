var hx = {};
hx.posts = null;		// the site search data.


// load the search json object for javascript searching.
hx.loadSearchData = function() {

	// quietly go and get the search data
	$.getJSON('/search.json', function(data) {
		hx.posts =  data.posts;

		// build a single reference variable for each post
		for (var i = hx.posts.length - 1; i >= 0; i--) {
			hx.posts[i].ref = hx.posts[i].title.toLowerCase() + " " + hx.posts[i].words.toLowerCase();
		}
	});

};


// search for blog entries in the blog json object.
hx.search = function(str) {

	var reference, i, j;
	var hits = [];

	// no results for an empty saerch string.
	if(!str.length) {
		$("div.search .results").empty();
		$('div.search label').css({'text-indent': 0});
		return;
	}

	// find our search hits by searching for any of the entered words
	for (i = hx.posts.length - 1; i >= 0; i--) {
		if(hx.posts[i].ref.indexOf(str) != -1) {
			hits.push(hx.posts[i]);
		}
	}

	// build the results output
	$("div.search .results").empty();
	for (i = hits.length - 1; i >= 0; i--) {
		$("div.search .results").append("<li><a href='"+ hits[i].url+ "'>"+ hits[i].title +"</a><time>"+ hits[i].date+"</time></li>");
	}
};


// Bind the event listeners
hx.addEventHandlers = function() {

	// blog search
	$('input.searchstr').keypress(function(k){
		$('div.search label').css({'text-indent': "-9999px"});
		if(k.which == 27) {
			$('div.search').slideToggle(150);
		}
		str = $(this).val().trim();
		hx.search(str);
	});

	$('.nav a.search').click(function(e){
		e.preventDefault();
		$("div.search .results").empty();
		$('input.searchstr').val("");
		$('div.search label').css({'text-indent': 0});
		$('div.search').slideToggle(150);
		$('input.searchstr').focus();
		return false;
	});
};


// giddy up!
hx.init = function() {
	hx.addEventHandlers();
	hx.loadSearchData();
};


// Ready to go.
$(function() {
	hx.init();
});

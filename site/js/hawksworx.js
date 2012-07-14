var hx = {};
hx.posts = null;		// the site search data.


// load the search json object for javascript searching.
hx.loadSearchData = function() {

	// quietly gp and get the search data
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

	var reference, i;
	var hits = [];
	
	// no results for an empty saerch string.
	if(!str.length) {
		$("div.search div.results").empty();
		return;
	}

	// find our search hits
	str = str.toLowerCase();
	for (i = hx.posts.length - 1; i >= 0; i--) {
		if(hx.posts[i].ref.indexOf(str) != -1) {
			hits.push(hx.posts[i]);
		}
	}

	// build the results output
	$("div.search div.results").empty();
	for (i = hits.length - 1; i >= 0; i--) {
		$("div.search div.results").append("<h2><a href='"+ hits[i].url+ "'>"+ hits[i].title +"</a></h2>");
	}
};


// Bind the event listeners
hx.addEventHandlers = function() {

	// blog search
	$('input.searchstr').keyup(function(k){
		// TODO: cancel search if escape
		str = $(this).val().trim();
		hx.search(str);
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


var hx = {};
hx.posts = null;    // the site search data.

// quietly go and get the search data and
// build a single reference variable for each post
hx.loadSearchData = function() {
  $.getJSON('/search.json', function(data) {
    hx.posts =  data.posts;
    for (var i = hx.posts.length - 1; i >= 0; i--) {
      hx.posts[i].ref = hx.posts[i].title.toLowerCase() + " " + hx.posts[i].words.toLowerCase();
    }
  });
};


// search for blog entries in the blog json object.
hx.search = function(str) {

  var reference, i, j;
  var hits = [];

  // clear down ready for the new results
  hx.clearResults();

  // no results for an empty saerch string.
  if(!str.length) {
    return;
  }

  // find our search hits by searching for any of the entered words
  for (i = hx.posts.length - 1; i >= 0; i--) {
    if(hx.posts[i].ref.indexOf(str) !== -1) {
      hits.push(hx.posts[i]);
    }
  }

  // build the results output
  $(".search-results").show();
  for (i = hits.length - 1; i >= 0; i--) {
    $(".search-results ul").append("<li><time>"+ hits[i].date+"</time><a href='"+ hits[i].url+ "'>"+ hits[i].title +"</a></li>");
  }
};


hx.hideSearch = function() {
  hx.clearResults();
  $('#searchform').hide();
  $('li.search a').show();
};

hx.clearResults = function() {
  $(".search-results ul").empty();
  $(".search-results").hide();
};

// Bind the event listeners
hx.addEventHandlers = function() {

  // blog search
  $('#searchstr').keyup(function(k){
    // handle escape key to dismiss the search
    if(k.which === 27) {
      hx.hideSearch();
    } else {
      var str = $(this).val().trim();
      hx.search(str);
    }
  });



  // get the data ready to query,
  // prepare the form and toggle visibility
  $('li.search a').click(function(e) {
    e.preventDefault();
    hx.loadSearchData();
    hx.clearResults();
    $('#searchform').css({'display': 'inline-block'});
    $('li.search a').hide();
    $('#searchstr').val("");
    $('#searchstr').focus();
    return false;
  });
};

// Ready to go.
$(function() {
  hx.addEventHandlers();
});

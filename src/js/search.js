(function(){

  var searchIndex = null;
  var searchUI = document.querySelector('.search-ui');
  var resultsUI = document.querySelector('.search-results');
  var searchInput = document.querySelector('#search-str');

  // clear the current results
  var clearResults = function(){
    while (resultsUI.firstChild) {
      resultsUI.removeChild(resultsUI.firstChild);
    }
  }

  // search and display
  var find = function(str) {

    str = str.toLowerCase();

    // look for matches in the JSON
    var results = [];
    for(var item in searchIndex ) {
      var found = searchIndex[item].text.indexOf(str);
      if(found != -1 ) {
        results.push(searchIndex[item])
      }
    }

    // build and insert the new result entries
    clearResults();
    for(var item in results) {
      var listItem = document.createElement('li');
      var link = document.createElement('a');
      link.textContent = results[item].title;
      link.setAttribute('href', results[item].url);
      listItem.appendChild(link);
      resultsUI.appendChild(listItem);
    }
  }

  // add an event listenrer for a click on the search link
  btnHandler('#search-link', function(){
    // get the data
    fetch('/search.json').then(function(response) {
      return response.json();
    }).then(function(response) {
      searchIndex = response.search;
    });

    searchUI.classList.toggle('invisible');
    searchInput.focus();

    // listen for input changes
    searchInput.addEventListener('keyup', function(event) {
      var str = searchInput.value
      if(str.length > 2) {
        find(str);
      } else {
        clearResults();
      }
    });

  });

})();

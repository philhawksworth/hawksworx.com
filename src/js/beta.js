// simple button click event handler
function btnHandler(selector, callback) {
  var btn = document.querySelector(selector);
  if(!btn) { return; }
  btn.addEventListener('click', function(event) {
    event.preventDefault();
    callback();
  }, false);
}

// Set a cookie to opt in to the beta
btnHandler('#btn-opt-in', function(){
  document.cookie = "nf_ab=oh-so-orange; expires=Thu, 01 Jan 2019 00:00:00 GMT";
  window.location.reload(true);
})

// Set a cookie to opt out of the beta
btnHandler('#btn-opt-out', function(){
  document.cookie = "nf_ab=master; expires=Thu, 01 Jan 2019 00:00:00 GMT";
  window.location.reload(true);
})

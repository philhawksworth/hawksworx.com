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
  var now = new Date();
  var expires = now.getTime() + 1000 * 3600 * 24 * 365;
  now.setTime(expires);
  document.cookie = `nf_ab=oh-so-orange; expires=${ now.toUTCString() }`;
  window.location.reload(true);
})

// Set a cookie to opt out of the beta
btnHandler('#btn-opt-out', function(){
  document.cookie = "nf_ab=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  window.location.reload(true);
})

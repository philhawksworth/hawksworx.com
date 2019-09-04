// Set a cookie to opt in to the beta
btnHandler('#btn-opt-in', function(){
  document.cookie = "nf_ab=oh-so-orange; expires=Thu, 01 Jan 2021 00:00:00 GMT";
  window.location.reload(true);
});

// Set a cookie to opt out of the beta
btnHandler('#btn-opt-out', function(){
  document.cookie = "nf_ab=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  window.location.reload(true);
});

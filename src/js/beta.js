
var btn = document.querySelector('#btn-opt-in');
btn.addEventListener('click', function (event) {
  event.preventDefault();
  console.log("cookie time");
  document.cookie = "nf_ab=0.9; expires=Thu, 01 Jan 2070 00:00:00 GMT";
  window.location.reload(true);
}, false);


var btn = document.querySelector('#btn-opt-out');
btn.addEventListener('click', function (event) {
  event.preventDefault();
  console.log("cookie time");
  document.cookie = "nf_ab=0.1; expires=Thu, 01 Jan 2070 00:00:00 GMT";
  window.location.reload(true);
}, false);

document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  var countdown = document.getElementById('countdown');
  if (countdown) {
    var deadline = new Date('2027-05-13T00:00:00+05:30').getTime();
    var render = function () {
      var now = new Date().getTime();
      var diff = deadline - now;
      if (diff <= 0) {
        countdown.innerHTML = '<p>The DPDP compliance deadline has passed.</p>';
        return;
      }
      var d = Math.floor(diff / (1000 * 60 * 60 * 24));
      var h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      var m = Math.floor((diff / (1000 * 60)) % 60);
      var s = Math.floor((diff / 1000) % 60);
      countdown.innerHTML =
        '<div class="unit"><span class="val">' + d + '</span><span class="lbl">Days</span></div>' +
        '<div class="unit"><span class="val">' + h + '</span><span class="lbl">Hours</span></div>' +
        '<div class="unit"><span class="val">' + m + '</span><span class="lbl">Minutes</span></div>' +
        '<div class="unit"><span class="val">' + s + '</span><span class="lbl">Seconds</span></div>';
    };
    render();
    setInterval(render, 1000);
  }
});

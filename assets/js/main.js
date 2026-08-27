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

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var items = document.querySelectorAll(
      '.card, .pillar, .timeline .step, .phase-card, .stat-strip .stat'
    );
    items.forEach(function (el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (Math.min(i % 6, 5) * 70) + 'ms';
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(function (el) { observer.observe(el); });
  }

  var tabBtns = document.querySelectorAll('.tab-btn');
  if (tabBtns.length) {
    var tabPanels = document.querySelectorAll('.tab-panel');
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var target = btn.getAttribute('data-tab');
        tabBtns.forEach(function (b) {
          b.classList.toggle('active', b === btn);
          b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
        });
        tabPanels.forEach(function (panel) {
          panel.classList.toggle('active', panel.getAttribute('data-panel') === target);
        });
      });
    });
  }

  var dropdown = document.querySelector('.nav-item-dropdown');
  var dropdownToggle = document.querySelector('.dropdown-toggle');
  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener('click', function (e) {
      e.preventDefault();
      var isOpen = dropdown.classList.toggle('open');
      dropdownToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    var CONTACT_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzmujmmHR__Lxsiu6-Ocd6A5tvOX2T5iP9FXkzYz3ksH-zVPePgASDJL987BKUNlen4jg/exec';
    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    var setStatus = function (status, text, type) {
      status.textContent = text;
      status.className = 'form-status' + (type ? ' ' + type : '');
    };
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = document.getElementById('cf-name').value.trim();
      var email = document.getElementById('cf-email').value.trim();
      var message = document.getElementById('cf-message').value.trim();
      var status = document.getElementById('cf-status');
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      if (!name || !email || !message) {
        setStatus(status, 'Please fill in all fields.', 'error');
        return;
      }
      if (!emailPattern.test(email)) {
        setStatus(status, 'Please enter a valid email address.', 'error');
        return;
      }
      setStatus(status, 'Sending...', null);
      submitBtn.disabled = true;
      fetch(CONTACT_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ name: name, email: email, message: message }),
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }
      })
        .then(function (res) { return res.json(); })
        .then(function () {
          setStatus(status, 'Thank you. Your enquiry has been sent.', 'success');
          contactForm.reset();
        })
        .catch(function () {
          setStatus(status, 'Something went wrong. Please try again or email us directly.', 'error');
        })
        .finally(function () {
          submitBtn.disabled = false;
        });
    });
  }
});

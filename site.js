// inmo24x7 landing: mobile menu, header shadow, and the hero chat animation.
// Everything here is progressive enhancement: the pages work without JavaScript.
(function () {
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');
  var links = document.getElementById('nav-links');

  if (nav && toggle && links) {
    var setMenu = function (open) {
      links.classList.toggle('open', open);
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    };
    toggle.addEventListener('click', function () {
      setMenu(!links.classList.contains('open'));
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setMenu(false);
    });

    var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Hero chat (home page only): reveal messages one by one, then show the toast.
  var chat = document.getElementById('chat');
  var toast = document.getElementById('toast');
  if (!chat || !toast) return;

  var steps = chat.querySelectorAll('[data-step]');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    toast.classList.add('show');
    return;
  }

  chat.classList.add('play');
  function play() {
    var i = 0;
    (function next() {
      if (i >= steps.length) {
        setTimeout(function () { toast.classList.add('show'); }, 400);
        return;
      }
      var el = steps[i++];
      var outgoing = el.classList.contains('out');
      if (outgoing) chat.classList.add('is-typing');
      setTimeout(function () {
        chat.classList.remove('is-typing');
        el.classList.add('show');
        next();
      }, outgoing ? 1100 : 900);
    })();
  }
  var io = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) { io.disconnect(); setTimeout(play, 400); }
  }, { threshold: 0.4 });
  io.observe(chat);
})();

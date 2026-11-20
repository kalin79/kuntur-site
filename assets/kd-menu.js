/* Menú inferior Kuntur Data (19 nov 2026)
   1) Abre y cierra el panel (botón de la barra, Esc, clic fuera, clic en un enlace).
   2) Mide apertura y cierre (menu_toggle).
   3) Muestra en la barra el nombre de la sección visible, con un giro vertical al cambiar.
   Se carga antes de kd.js para leer las etiquetas antes de su animación de texto. */
(function () {
  var d = document, nv = d.querySelector('.nv');
  if (!nv) return;
  var bar = nv.querySelector('.nv-bar'), panel = nv.querySelector('.nv-panel'),
      dim = nv.querySelector('.nv-dim'), roll = nv.querySelector('.nv-roll');
  var pageLabel = nv.getAttribute('data-page') || roll.textContent;
  var last = null;

  // Medición: apertura y cierre del menú (menu_toggle), con lo que lo provocó.
  function track(o, via) {
    window.dataLayer = window.dataLayer || [];
    var cg = 'sin_definir';
    for (var i = window.dataLayer.length - 1; i >= 0; i--) {
      if (window.dataLayer[i] && window.dataLayer[i].content_group) { cg = window.dataLayer[i].content_group; break; }
    }
    window.dataLayer.push({ event: 'menu_toggle', menu_action: o ? 'abrir' : 'cerrar', menu_trigger: via, content_group: cg });
  }
  function setOpen(o, focusBack, via) {
    if (o !== nv.classList.contains('is-open')) track(o, via);
    nv.classList.toggle('is-open', o);
    bar.setAttribute('aria-expanded', o ? 'true' : 'false');
    bar.setAttribute('aria-label', o ? 'Cerrar menú' : 'Abrir menú');
    if (o) { panel.removeAttribute('inert'); panel.removeAttribute('aria-hidden'); }
    else { panel.setAttribute('inert', ''); panel.setAttribute('aria-hidden', 'true'); }
    if (o) {
      var first = panel.querySelector('.nv-link');
      setTimeout(function () { if (nv.classList.contains('is-open') && first) first.focus({ preventScroll: true }); }, 450);
    } else if (focusBack) { bar.focus({ preventScroll: true }); }
  }
  panel.setAttribute('inert', '');
  bar.addEventListener('click', function () { setOpen(!nv.classList.contains('is-open'), true, 'boton'); });
  dim.addEventListener('click', function () { setOpen(false, false, 'fuera'); });
  d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nv.classList.contains('is-open')) setOpen(false, true, 'esc'); });
  panel.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setOpen(false, false, 'enlace'); }); });

  // Título de la sección visible
  function show(t) {
    if (!t || t === last) return;
    last = t;
    roll.textContent = t;
    roll.classList.remove('is-in'); void roll.offsetWidth; roll.classList.add('is-in');
  }
  var main = d.querySelector('main');
  if (!main || !('IntersectionObserver' in window)) return;
  var heads = main.querySelectorAll('h1, h2'), items = [];
  heads.forEach(function (h, i) {
    var sec = h.closest('section') || h.parentElement;
    if (!sec || items.some(function (x) { return x.sec === sec; })) return;
    var prev = h.previousElementSibling, t;
    if (i === 0 || sec === main.querySelector('section')) t = pageLabel;
    else if (prev && prev.classList.contains('eti') && !prev.children.length) t = prev.textContent.trim();
    else t = h.textContent.trim();
    items.push({ sec: sec, t: t.replace(/\s+/g, ' ') });
  });
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      var it = items.find(function (x) { return x.sec === e.target; });
      if (it) show(it.t);
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  items.forEach(function (x) { io.observe(x.sec); });
  show(pageLabel);
})();

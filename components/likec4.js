// Диаграммы LikeC4 в колоде. Исходник схем — <deck>/likec4/*.c4, сборка — node tools/build_likec4.mjs <deck>.
//
// Разметка слайда:
//   <figure class="c4" data-c4-view="s07" data-c4-src="likec4/views.js">
//     <a href="img/c4-s07.webp"><img src="img/c4-s07.webp" loading="lazy" alt="…"></a>
//   </figure>
//
// Телефон: остаётся снимок (лёгкий, открывается тапом для зума).
// Десктоп: когда слайд с диаграммой стал видимым, компонент (~3 МБ) грузится один раз и снимок меняется на
// интерактивную схему <likec4-view>: клик открывает её на весь экран (масштаб, связи элементов). Первая загрузка
// колоды компонент не включает — титульный слайд диаграмм не содержит.
(function () {
  var narrow = window.matchMedia('(max-width: 700px), (orientation: portrait) and (max-width: 900px)');
  var started = {};
  function load(src) {
    if (started[src]) return;
    started[src] = true;
    var s = document.createElement('script');
    s.type = 'module';
    s.src = src;
    document.head.appendChild(s);
  }
  function upgrade(fig) {
    if (fig.getAttribute('data-c4-live')) return;
    fig.setAttribute('data-c4-live', '1');
    load(fig.getAttribute('data-c4-src'));
    var v = document.createElement('likec4-view');
    v.setAttribute('view-id', fig.getAttribute('data-c4-view'));
    v.setAttribute('browser', 'true');
    v.setAttribute('color-scheme', 'light');
    fig.appendChild(v);
    customElements.whenDefined('likec4-view').then(function () {
      setTimeout(function () { fig.classList.add('live'); }, 600);   // подгонка схемы под рамку
    });
  }
  function init() {
    if (narrow.matches || !('IntersectionObserver' in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { upgrade(e.target); io.unobserve(e.target); }
      });
    });
    [].forEach.call(document.querySelectorAll('figure.c4[data-c4-view]'), function (f) { io.observe(f); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

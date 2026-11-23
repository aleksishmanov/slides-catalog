/* «Связанные» — перекрёстные ссылки между колодами каталога.

   Связи — поле related в /catalog.js (список id). Обратная ссылка обязательна:
   если A ссылается на B, то и B на A — это проверяет tools/check_decks.py.

   Подключение (в конце <body>, после разметки колоды):
     <script src="/catalog.js" defer></script>
     <script src="/components/related.js" defer></script>

   Десктоп: кнопка «Связанные · N» в правом верхнем углу окна, на последнем слайде она
   синяя, а стрелка «вперёд» с последнего слайда открывает список. Телефон (режим ленты):
   блок «Связанные» в конце ленты, после последнего слайда. Стили — только здесь. */
(function () {
  if (typeof presentations === 'undefined') return;
  var id = location.pathname.split('/').filter(Boolean)[0];
  var byId = {};
  presentations.forEach(function (p) { byId[p.id] = p; });
  var me = byId[id];
  if (!me || !me.related || !me.related.length) return;
  var items = me.related.map(function (r) { return byId[r]; }).filter(Boolean);
  if (!items.length) return;

  var MQ = '(max-width: 700px), (orientation: portrait) and (max-width: 900px)';
  var css =
    '#rel-btn{position:fixed;top:12px;right:18px;z-index:42;font:inherit;font-family:"JetBrains Mono",ui-monospace,Menlo,monospace;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--ink,#080808);background:rgba(239,238,232,.95);border:1px solid var(--ink,#080808);padding:7px 11px;cursor:pointer}' +
    '#rel-btn.last{background:var(--blue,#2437ed);border-color:var(--blue,#2437ed);color:#fff;box-shadow:4px 4px 0 var(--ink,#080808)}' +
    '#rel-dlg{position:fixed;inset:0;z-index:100;display:none;align-items:center;justify-content:center;padding:16px;background:rgba(8,8,8,.45)}' +
    '#rel-dlg.on{display:flex}' +
    '#rel-dlg .box{position:relative;width:100%;max-width:880px;max-height:calc(100vh - 32px);overflow:auto;background:var(--bg,#efeee8);color:var(--ink,#080808);border:1px solid var(--ink,#080808);box-shadow:8px 8px 0 var(--blue,#2437ed);padding:26px 26px 22px;text-align:left}' +
    '#rel-dlg .x{position:absolute;right:10px;top:8px;font:inherit;font-size:22px;line-height:1;background:none;border:none;color:inherit;cursor:pointer;padding:6px}' +
    '.rel-lab{font-family:"JetBrains Mono",ui-monospace,Menlo,monospace;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--blue,#2437ed);margin:0 0 8px}' +
    '.rel-h{font-size:28px;line-height:1.1;letter-spacing:-.03em;font-weight:800;margin:0 0 18px}' +
    '.rel-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}' +
    '.rel-card{display:grid;grid-template-columns:128px minmax(0,1fr);gap:14px;align-items:start;text-decoration:none;color:var(--ink,#080808);background:#fff;border:1px solid var(--ink,#080808);box-shadow:4px 4px 0 var(--ink,#080808);padding:10px}' +
    '.rel-card:hover{border-color:var(--blue,#2437ed);box-shadow:4px 4px 0 var(--blue,#2437ed)}' +
    '.rel-card img{display:block;width:128px;height:72px;object-fit:cover;border:1px solid var(--line,#c9c8c2);background:var(--bg,#efeee8)}' +
    '.rel-card b{display:block;font-size:16px;line-height:1.25;letter-spacing:-.01em}' +
    '.rel-card span{display:block;font-family:"JetBrains Mono",ui-monospace,Menlo,monospace;font-size:11px;color:var(--muted,#51514b);margin-top:5px;word-break:break-all}' +
    '#rel-feed{display:none}' +
    '@media ' + MQ + '{' +
      '#rel-btn,#rel-dlg{display:none!important}' +
      '#rel-feed{display:block;background:var(--bg,#efeee8);color:var(--ink,#080808);padding:36px 18px 48px;border-top:1px solid var(--line,#c9c8c2)}' +
      '.rel-h{font-size:26px}' +
      '.rel-grid{grid-template-columns:1fr;gap:12px}' +
      '.rel-card{grid-template-columns:96px minmax(0,1fr);gap:12px}' +
      '.rel-card img{width:96px;height:54px}' +
    '}';

  function list() {
    return '<p class="rel-lab">Связанные колоды · ' + items.length + '</p>' +
      '<h2 class="rel-h">Читать дальше</h2>' +
      '<div class="rel-grid">' + items.map(function (p) {
        return '<a class="rel-card" href="/' + p.id + '/"><img src="/' + p.cover + '" alt="" width="1280" height="720" loading="lazy" decoding="async">' +
          '<div><b>' + p.title + '</b><span>/' + p.id + '</span></div></a>';
      }).join('') + '</div>';
  }

  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // Телефон: блок в конце ленты, сразу после слайдов.
  var feed = document.createElement('nav');
  feed.id = 'rel-feed'; feed.setAttribute('aria-label', 'Связанные колоды');
  feed.innerHTML = list();
  var stage = document.getElementById('stage');
  if (stage && stage.parentNode === document.body) stage.parentNode.insertBefore(feed, stage.nextSibling);
  else document.body.appendChild(feed);

  // Десктоп: кнопка и список поверх слайда.
  var btn = document.createElement('button');
  btn.id = 'rel-btn'; btn.type = 'button';
  btn.textContent = 'Связанные · ' + items.length;
  var dlg = document.createElement('div');
  dlg.id = 'rel-dlg';
  dlg.setAttribute('role', 'dialog'); dlg.setAttribute('aria-modal', 'true'); dlg.setAttribute('aria-label', 'Связанные колоды');
  dlg.innerHTML = '<div class="box"><button class="x" type="button" aria-label="Закрыть">✕</button>' + list() + '</div>';
  document.body.appendChild(btn); document.body.appendChild(dlg);

  var narrow = window.matchMedia(MQ);
  function open() { dlg.classList.add('on'); dlg.querySelector('.x').focus(); }
  function close() { dlg.classList.remove('on'); btn.focus(); }
  btn.onclick = open;
  dlg.onclick = function (e) { if (e.target === dlg || e.target.classList.contains('x')) close(); };

  // Последний слайд — среди соседей первого: копии слайдов в других местах страницы не в счёт.
  var first = document.querySelector('.slide');
  var slides = first ? [].filter.call(first.parentNode.children, function (e) { return e.classList.contains('slide'); }) : [];
  var lastSlide = slides[slides.length - 1];
  function onLast() { return !!lastSlide && (lastSlide.classList.contains('on') || lastSlide.classList.contains('active')); }
  function mark() { btn.classList.toggle('last', onLast()); }
  if (lastSlide && window.MutationObserver) new MutationObserver(mark).observe(lastSlide, { attributes: true, attributeFilter: ['class'] });
  mark();

  // Пока список открыт, стрелки не листают; «вперёд» с последнего слайда открывает список.
  window.addEventListener('keydown', function (e) {
    if (narrow.matches) return;
    if (dlg.classList.contains('on')) {
      if (e.key === 'Escape') close();
      if (e.key !== 'Tab') { e.stopImmediatePropagation(); if (e.key !== 'Enter' && e.key !== ' ') e.preventDefault(); }
      return;
    }
    if (onLast() && (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ')) { e.preventDefault(); e.stopImmediatePropagation(); open(); }
  }, true);
})();

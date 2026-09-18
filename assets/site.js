/* ============================================================
   MUSTERAUSBAU – wspólna logika stron: DE/PL/EN, menu, cookie,
   lightbox, animacje wejścia. Bez frameworków, bez budowania.

   Każda strona definiuje PRZED tym plikiem (inline <script>):
     var PL = { "klucz.i18n": "tekst PL", ... };
     var EN = { "klucz.i18n": "tekst EN", ... };
   Niemiecki (DE) jest językiem domyślnym w HTML i jest zbierany
   automatycznie z atrybutów data-i18n / data-i18n-html / data-i18n-ph.
   ============================================================ */
(function(){
  var DE = {};
  document.documentElement.setAttribute('data-theme','dark');

  function collect(){
    document.querySelectorAll('[data-i18n],[data-i18n-html]').forEach(function(el){
      var k = el.getAttribute('data-i18n') || el.getAttribute('data-i18n-html');
      if(!(k in DE)) DE[k] = el.innerHTML;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function(el){
      var k = el.getAttribute('data-i18n-ph');
      if(!(k in DE)) DE[k] = el.getAttribute('placeholder') || '';
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function(el){
      var pair = el.getAttribute('data-i18n-attr').split(':');
      var k = pair[1];
      if(!(k in DE)) DE[k] = el.getAttribute(pair[0]) || '';
    });
  }

  function dictFor(l){
    var PL = window.PL || {}, EN = window.EN || {};
    if(l === 'pl') return PL;
    if(l === 'en') return EN;
    return DE;
  }

  function setLang(l){
    var d = dictFor(l);
    document.documentElement.lang = l;
    document.querySelectorAll('[data-i18n],[data-i18n-html]').forEach(function(el){
      var k = el.getAttribute('data-i18n') || el.getAttribute('data-i18n-html');
      if(d[k] !== undefined) el.innerHTML = d[k];
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(function(el){
      var k = el.getAttribute('data-i18n-ph');
      if(d[k] !== undefined) el.setAttribute('placeholder', d[k]);
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function(el){
      var pair = el.getAttribute('data-i18n-attr').split(':');
      var attr = pair[0], k = pair[1];
      if(d[k] !== undefined) el.setAttribute(attr, d[k]);
    });
    if(d['doc.title'] !== undefined) document.title = d['doc.title'];
    document.querySelectorAll('[data-lang-btn]').forEach(function(b){
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang-btn') === l));
    });
    store('lang', l);
  }

  function store(k, v){ try{ localStorage.setItem('musterausbau.' + k, v); }catch(e){} }
  function read(k){ try{ return localStorage.getItem('musterausbau.' + k); }catch(e){ return null; } }

  document.addEventListener('DOMContentLoaded', function(){
    collect();
    setLang(read('lang') || 'de');

    document.querySelectorAll('[data-lang-btn]').forEach(function(b){
      b.addEventListener('click', function(){ setLang(b.getAttribute('data-lang-btn')); });
    });

    /* wysokość paska prototypu -> odsunięcie nagłówka */
    var bar = document.getElementById('protobar');
    if(bar){
      var syncBar = function(){ document.documentElement.style.setProperty('--bar', bar.offsetHeight + 'px'); };
      syncBar();
      window.addEventListener('resize', syncBar, {passive:true});
      if('ResizeObserver' in window) new ResizeObserver(syncBar).observe(bar);
    }

    /* menu mobilne */
    var menu = document.getElementById('menu'), burger = document.getElementById('burger');
    if(menu && burger){
      burger.addEventListener('click', function(){ menu.classList.toggle('open'); });
      menu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ menu.classList.remove('open'); }); });
    }

    /* cień nagłówka */
    var hdr = document.getElementById('hdr');
    if(hdr){
      var onScroll = function(){ hdr.classList.toggle('stuck', window.scrollY > 12); };
      window.addEventListener('scroll', onScroll, {passive:true}); onScroll();
    }

    /* lightbox galerii */
    var lb = document.getElementById('lb');
    if(lb){
      var lbBox = lb.querySelector('.ph'), lbCap = document.getElementById('lbcap');
      document.querySelectorAll('.gal .ph').forEach(function(t){
        t.addEventListener('click', function(){
          lbBox.className = 'ph ' + (t.className.match(/c\d/) || ['c1'])[0];
          lbCap.innerHTML = t.querySelector('em').innerHTML;
          lb.classList.add('on');
        });
      });
      lb.addEventListener('click', function(){ lb.classList.remove('on'); });
      document.addEventListener('keydown', function(e){ if(e.key === 'Escape') lb.classList.remove('on'); });
    }

    /* formularz – w prototypie tylko komunikat, nic nie wysyła */
    var cform = document.getElementById('cform');
    if(cform){
      cform.addEventListener('submit', function(e){
        e.preventDefault();
        document.getElementById('fnote').classList.add('on');
      });
    }

    /* baner cookie */
    var ck = document.getElementById('cookie');
    if(ck){
      if(!read('ck')) setTimeout(function(){ ck.classList.add('on'); }, 900);
      ck.querySelectorAll('[data-ck]').forEach(function(b){
        b.addEventListener('click', function(){ store('ck', b.getAttribute('data-ck')); ck.classList.remove('on'); });
      });
    }

    /* delikatne pojawianie się sekcji */
    var els = document.querySelectorAll('.card, .pillar, .step, .gal .ph, .sechead, .split > *');
    els.forEach(function(el){ el.classList.add('fade'); });
    if('IntersectionObserver' in window){
      var io = new IntersectionObserver(function(en){
        en.forEach(function(x){ if(x.isIntersecting){ x.target.classList.add('in'); io.unobserve(x.target); } });
      }, {rootMargin:'0px 0px -60px 0px'});
      els.forEach(function(el){ io.observe(el); });
    }else{
      els.forEach(function(el){ el.classList.add('in'); });
    }
  });
})();

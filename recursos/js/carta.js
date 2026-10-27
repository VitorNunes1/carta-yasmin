/* ==========================================================================
   CARTA A YASMIN — comportamento da página
   --------------------------------------------------------------------------
   Não é preciso editar este arquivo. Tudo o que é personalizável fica em
   personalizar.js (imagens, legendas, música) e em index.html (palavras).
   ========================================================================== */

(function () {
  'use strict';

  var raiz = document.documentElement;
  raiz.classList.add('js');

  var config = window.PERSONALIZAR || {};
  var opcoes = config.opcoes || {};
  var mostrarVazios = opcoes.mostrarEspacosVazios !== false;
  var reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NS = 'http://www.w3.org/2000/svg';
  var ROMANOS = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X',
                 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];

  if (!window.PERSONALIZAR) {
    console.warn('[Carta] personalizar.js não foi carregado. Confira se o arquivo existe e se não há erro de digitação nele.');
  }
  if (opcoes.tomEnvelhecido === false) raiz.classList.add('sem-tom');


  /* — utilidades — */

  function criar(tag, classe, texto) {
    var el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto) el.textContent = texto;
    return el;
  }

  function ornamento(simbolo, classe, viewBox) {
    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', viewBox);
    svg.setAttribute('class', classe);
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    var uso = document.createElementNS(NS, 'use');
    uso.setAttribute('href', '#' + simbolo);
    svg.appendChild(uso);
    return svg;
  }

  function numeroDe(id) {
    var n = parseInt(String(id).replace(/\D+/g, ''), 10);
    return isNaN(n) ? 0 : n;
  }

  function rotulo(classe, palavra, numero) {
    var r = criar('span', classe);
    r.appendChild(document.createTextNode(palavra));
    r.appendChild(criar('b', null, numero));
    return r;
  }


  /* — espaços vazios: desenhados como parte da página — */

  function vazioDeFoto(n) {
    var v = criar('span', 'vazio');
    v.appendChild(rotulo('vazio__rotulo', 'Fotografia', 'n.º ' + n));
    return v;
  }

  function vazioDeEstampa(n) {
    var v = criar('span', 'nicho');
    v.appendChild(ornamento('aureola', 'nicho__aureola', '0 0 100 100'));
    v.appendChild(rotulo('nicho__rotulo', 'Estampa', ROMANOS[n] || String(n)));
    return v;
  }

  function legenda(principal, secundario, comVinheta) {
    if (!principal && !secundario) {
      if (!comVinheta) return null;
      var enfeite = criar('div', 'legenda');
      enfeite.setAttribute('aria-hidden', 'true');
      enfeite.appendChild(ornamento('vinheta', 'legenda__vinheta', '0 0 90 14'));
      return enfeite;
    }
    var cap = criar('figcaption', 'legenda');
    if (principal) cap.appendChild(criar('span', 'legenda__texto', principal));
    if (secundario) cap.appendChild(criar('span', 'legenda__data', secundario));
    return cap;
  }


  /* — montagem de cada fotografia ou estampa — */

  function montar(figura, tipo) {
    var ehFoto = tipo === 'foto';
    var id = figura.getAttribute(ehFoto ? 'data-foto' : 'data-estampa');
    var colecao = (ehFoto ? config.fotografias : config.estampas) || {};
    var dados = colecao[id] || {};
    var n = numeroDe(id);
    var desenharVazio = ehFoto ? vazioDeFoto : vazioDeEstampa;

    if (!dados.arquivo && !mostrarVazios) {
      figura.hidden = true;
      return;
    }

    var suporte = criar('div', tipo + '__suporte');
    var janela = criar('div', tipo + '__janela');
    suporte.appendChild(janela);
    figura.appendChild(suporte);

    if (dados.proporcao) figura.style.setProperty('--proporcao', dados.proporcao);

    function marcarVazia() {
      figura.classList.remove('is-preenchida');
      figura.classList.add('is-vazia');
      figura.setAttribute('aria-hidden', 'true');
      janela.appendChild(desenharVazio(n));
    }

    if (dados.arquivo) {
      var img = criar('img');
      img.alt = dados.descricao || '';
      img.decoding = 'async';
      if (!figura.hasAttribute('data-imediata')) img.loading = 'lazy';
      if (dados.foco) img.style.objectPosition = dados.foco;
      img.addEventListener('error', function () {
        console.warn('[Carta] Não encontrei a imagem "' + dados.arquivo + '" (' + id +
                     '). Confira o nome do arquivo em personalizar.js.');
        img.remove();
        if (mostrarVazios) {
          marcarVazia();
        } else {
          figura.hidden = true;
          ajustarGrupos();
        }
      });
      img.src = dados.arquivo;
      janela.appendChild(img);
      figura.classList.add('is-preenchida');
    } else {
      marcarVazia();
    }

    var cap = ehFoto
      ? legenda(dados.legenda, dados.data, figura.classList.contains('foto--retrato'))
      : legenda(dados.titulo, dados.citacao, false);
    if (cap) figura.appendChild(cap);
  }

  /* Díptico, tríptico e colagem se recompõem quando algum espaço é ocultado. */
  function ajustarGrupos() {
    document.querySelectorAll('.diptico, .triptico, .colagem').forEach(function (grupo) {
      var visiveis = grupo.querySelectorAll(':scope > figure:not([hidden])').length;
      grupo.setAttribute('data-visiveis', visiveis);
      grupo.hidden = visiveis === 0;
    });
    document.querySelectorAll('.par').forEach(function (par) {
      var figura = par.querySelector(':scope > figure');
      par.classList.toggle('par--sozinho', !figura || figura.hidden);
    });
  }


  /* — abrir a carta: rompe o selo e mostra as folhas — */

  if (opcoes.cartaSelada !== false) raiz.classList.add('selada');

  function abrirCarta() {
    raiz.classList.remove('selada');
    var alvo = document.querySelector('.folha:not(.folha--rosto):not([hidden])');
    if (!alvo) return;
    alvo.setAttribute('tabindex', '-1');
    requestAnimationFrame(function () {
      alvo.scrollIntoView({ behavior: reduzirMovimento ? 'auto' : 'smooth', block: 'start' });
      alvo.focus({ preventScroll: true });
    });
  }


  /* — música: começa o quanto antes e não tem pausa —
     Os navegadores só liberam som depois de um toque, clique ou tecla.
     Por isso a música tenta tocar ao abrir a página e, se for barrada,
     começa no primeiro gesto da visitante (como romper o selo). */

  function prepararMusica() {
    var m = config.musica || {};
    var credito = document.querySelector('[data-credito-musica]');
    if (!m.arquivo) return;

    var audio = new Audio();
    audio.preload = 'auto';
    var repetir = m.repetir !== false;
    var volumeFinal = typeof m.volume === 'number' ? Math.min(Math.max(m.volume, 0), 1) : 0.7;
    var gestos = ['pointerdown', 'touchend', 'click', 'keydown'];
    var tocando = false;
    var saindo = false;
    var transicao = null;

    function esperarGesto(sim) {
      gestos.forEach(function (gesto) {
        if (sim) document.addEventListener(gesto, tocar, true);
        else document.removeEventListener(gesto, tocar, true);
      });
    }

    /* Alguns celulares não permitem mudar o volume; por isso a transição
       tem um número fixo de passos e sempre termina. */
    function levarVolumeA(alvo, depois) {
      clearInterval(transicao);
      var inicio = audio.volume;
      var passos = 18;
      var i = 0;
      transicao = setInterval(function () {
        i++;
        try { audio.volume = inicio + (alvo - inicio) * (i / passos); } catch (e) { /* volume fixo */ }
        if (i >= passos) {
          clearInterval(transicao);
          transicao = null;
          if (depois) depois();
        }
      }, 55);
    }

    function tocar() {
      if (tocando) return;
      tocando = true;
      saindo = false;
      try { audio.volume = 0; } catch (e) { /* volume fixo */ }
      var promessa = audio.play();
      if (promessa && promessa.then) {
        /* barrada pelo navegador: tenta de novo no próximo gesto */
        promessa.then(function () { esperarGesto(false); }, function () { tocando = false; });
      } else {
        esperarGesto(false);
      }
      levarVolumeA(volumeFinal);
    }

    audio.addEventListener('error', function () {
      console.warn('[Carta] Não encontrei a música "' + m.arquivo +
                   '". Coloque o arquivo na pasta musica/ ou ajuste o nome em personalizar.js.');
      clearInterval(transicao);
      esperarGesto(false);
      if (credito) credito.hidden = true;
    });
    /* Ao repetir, o volume desce no fim e volta a subir no recomeço,
       para que um trecho curto não recomece de forma brusca. */
    audio.addEventListener('timeupdate', function () {
      if (!repetir || !tocando || saindo || !isFinite(audio.duration)) return;
      if (audio.duration - audio.currentTime < 1.4) {
        saindo = true;
        levarVolumeA(0);
      }
    });
    audio.addEventListener('ended', function () {
      if (!repetir) return;
      audio.currentTime = 0;
      tocando = false;
      tocar();
    });

    if (credito && m.credito) {
      credito.textContent = m.credito;
      credito.hidden = false;
    }

    audio.src = m.arquivo;
    esperarGesto(true);
    tocar();
  }


  /* — revelação suave do conteúdo durante a leitura — */

  function prepararRevelacao() {
    if (reduzirMovimento || !('IntersectionObserver' in window)) return;

    var alvos = document.querySelectorAll(
      '.folha--texto > .bandeau, .folha--texto .texto > *, .folha--dedicatoria > *'
    );
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel');
          observador.unobserve(entrada.target);
        }
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.12 });

    alvos.forEach(function (alvo) {
      alvo.classList.add('revelar');
      observador.observe(alvo);
    });

    window.addEventListener('beforeprint', function () {
      alvos.forEach(function (alvo) { alvo.classList.add('visivel'); });
    });
  }


  /* — início — */

  document.querySelectorAll('[data-foto]').forEach(function (f) { montar(f, 'foto'); });
  document.querySelectorAll('[data-estampa]').forEach(function (f) { montar(f, 'estampa'); });
  ajustarGrupos();

  document.querySelectorAll('[data-abrir]').forEach(function (b) {
    b.addEventListener('click', abrirCarta);
  });

  prepararMusica();
  prepararRevelacao();
})();

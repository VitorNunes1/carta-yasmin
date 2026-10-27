/* ==========================================================================
   PERSONALIZAR — fotografias, estampas sacras, legendas e música
   --------------------------------------------------------------------------
   Este é o único arquivo que você precisa editar para trocar imagens.
   (As palavras da carta ficam em index.html, nas marcas ✎.)

   Para cada espaço:
     arquivo    caminho da imagem. Deixe '' para mostrar o espaço vazio.
     descricao  descrição da imagem, lida por leitores de tela.
     legenda    texto curto abaixo da fotografia (opcional).
     data       data ou lugar, em versalete vermelho (opcional).
     foco       qual parte da imagem fica visível quando ela é recortada:
                'center', 'center top', '30% center', 'center 20%'...
     proporcao  (opcional) muda o formato da moldura: '4 / 5', '1 / 1', '3 / 2'.

   Nas estampas, use  titulo  (ex.: nome do santo) e  citacao  no lugar de
   legenda e data.

   Cuidados: mantenha as aspas simples '...' e a vírgula no fim de cada
   linha. Se um texto tiver apóstrofo, escreva-o entre aspas duplas: "...".
   ========================================================================== */

window.PERSONALIZAR = {

  opcoes: {
    // false = os espaços sem imagem somem e a composição se ajusta sozinha
    // true  = os espaços sem imagem aparecem como molduras numeradas (n.º 3, Estampa V…)
    mostrarEspacosVazios: false,

    // true  = a carta abre fechada: só a folha de rosto aparece até ela
    //         tocar no selo, e a música começa nesse toque
    // false = todas as folhas ficam visíveis desde o início
    cartaSelada: true,

    // Tom suave de fotografia impressa antiga sobre as fotos (true / false)
    tomEnvelhecido: true,
  },


  /* ── FOTOGRAFIAS ──────────────────────────────────────────────────────── */

  fotografias: {

    // n.º 1 · Folha 1 · díptico, à esquerda — "o homem que me tornei"
    'foto-1': {
      arquivo: 'imagens/fotos/vitor-catedral.jpg',
      descricao: 'Vitor diante de uma catedral iluminada, à noite',
      legenda: '',
      data: '',
      foco: '45% center',
    },

    // n.º 2 · Folha 1 · díptico, à direita — "à mulher que Deus... conduziu até o meu caminho"
    'foto-2': {
      arquivo: 'imagens/fotos/yasmin-espelho.jpg',
      descricao: 'Yasmin, de vestido claro, numa fotografia no espelho',
      legenda: '',
      data: '',
      foco: '42% center',
    },

    // n.º 3 · Folha 2 · grande, presa ao álbum — "o tempo, o lugar"
    // Sugestão: uma fotografia de vocês dois, de preferência horizontal.
    'foto-3': {
      arquivo: '',
      descricao: '',
      legenda: '',
      data: '',
      foco: 'center',
    },

    // n.º 4 · Folha 2 · ao lado do texto — "ser reconhecido aos teus olhos"
    'foto-4': {
      arquivo: 'imagens/fotos/yasmin-oculos.jpg',
      descricao: 'Retrato de Yasmin, de óculos, com uma medalha ao pescoço',
      legenda: '',
      data: '',
      foco: 'center',
    },

    // n.º 5 · Folha 3 · centro da colagem — "o que trago no coração"
    'foto-5': {
      arquivo: 'imagens/fotos/vitor-escapulario.jpg',
      descricao: 'Vitor de terno, com o escapulário sobre a camisa e uma rosa vermelha no bolso',
      legenda: '',
      data: '',
      foco: '85% center',
    },

    // n.º 6 · Folha 3 · recordação colada, à esquerda (formato quadrado)
    'foto-6': {
      arquivo: '',
      descricao: '',
      legenda: '',
      data: '',
      foco: 'center',
    },

    // n.º 7 · Folha 3 · recordação colada, à direita (formato quadrado)
    'foto-7': {
      arquivo: '',
      descricao: '',
      legenda: '',
      data: '',
      foco: 'center',
    },
  },


  /* ── ESTAMPAS SACRAS ──────────────────────────────────────────────────── */

  estampas: {

    // I · Folha de rosto · oval central
    'estampa-1': {
      arquivo: 'imagens/santos/nossa-senhora-dos-lirios.jpg',
      descricao: 'Nossa Senhora com lírios',
      titulo: '',
      citacao: '',
      foco: 'center 15%',
    },

    // II · Folha 1 · santinho guardado entre as folhas, junto a "Nossa Senhora"
    // (aparece inteiro, sem recorte)
    'estampa-2': {
      arquivo: 'imagens/santos/santinho-imaculado-coracao.jpg',
      descricao: 'Santinho antigo do Imaculado Coração de Maria, entre rosas',
      titulo: '',
      citacao: '',
    },

    // III · Folha 2 · medalhão pequeno, junto a "a vontade de Deus"
    'estampa-3': {
      arquivo: '',
      descricao: '',
      titulo: '',
      citacao: '',
      foco: 'center top',
    },

    // IV · Folha 4 · centro do tríptico, sobre "Que a Santíssima Virgem te guarde"
    'estampa-4': {
      arquivo: 'imagens/santos/vitral-virgem-e-menino.jpg',
      descricao: 'Vitral da Virgem Maria com o Menino Jesus',
      titulo: '',
      citacao: '',
      foco: 'center',
    },

    // V · Folha 4 · ala esquerda do tríptico — um santo de especial significado
    'estampa-5': {
      arquivo: '',
      descricao: '',
      titulo: '',
      citacao: '',
      foco: 'center top',
    },

    // VI · Folha 4 · ala direita do tríptico — um santo de especial significado
    'estampa-6': {
      arquivo: '',
      descricao: '',
      titulo: '',
      citacao: '',
      foco: 'center top',
    },
  },


  /* ── MÚSICA ───────────────────────────────────────────────────────────── */
  // Toca sem botão de pausa. Tenta começar assim que a página abre; como os
  // navegadores só liberam som depois de um toque, normalmente começa no
  // primeiro toque/clique da visitante (ao romper o selo).
  // Coloque o arquivo .mp3 na pasta musica/ com exatamente este nome.
  // Para não ter música, deixe  arquivo: ''.

  musica: {
    arquivo: 'musica/ultraviolence.mp3',
    titulo: 'Ultraviolence',
    autor: 'Lana Del Rey',
    volume: 0.7,       // de 0 a 1
    repetir: true,     // recomeça ao terminar
    credito: '',       // linha opcional no fim da página, ex.: 'Ao fundo: Ultraviolence, de Lana Del Rey.'
  },
};

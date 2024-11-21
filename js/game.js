const grid = document.querySelector(".grid");
const spanPlayer = document.querySelector(".player");
const timer = document.querySelector(".timer");

const pecas = [
  "disco",
  "bloco",
  "pistao",
  "correia",
  "catalisador",
  "virabrequim",
  "radiador",
  "amortecedor",
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
};
// variaveis para receber carta e verificar depois se são iguais ou n
let firstCard = "";
let secondCard = "";

// funcao verificar se o jogo acabou
const checkEndGame = () => {
  const disableCards = document.querySelectorAll(".disable-card");

  // verifica a quantidade de classes de disable que em, se for igual ao total de cards ele ganhou
  setTimeout(() => {
    if (disableCards.length === 16) {
      clearInterval(this.loop);
      window.location.href = "parabens.html";
    }
  }, 300);
};

// verifica se a pessoa acertou a carta
const checkCards = () => {
  // pegando os atributos de cada carta
  const firtCharacter = firstCard.getAttribute("data-character");
  const secondCharacter = secondCard.getAttribute("data-character");

  // verifica se são iguais
  if (firtCharacter === secondCharacter) {
    // firstchild para atribuir a face do filho e n da carta
    firstCard.firstChild.classList.add("disable-card");
    secondCard.firstChild.classList.add("disable-card");

    // resetar as variaveis para continuar jogando
    firstCard = "";
    secondCard = "";

    // verificar se ela acertou o jogo todo
    checkEndGame();
  } else {
    // dellay pq acontece rapido demais, n dando tempo nem da carta virar
    setTimeout(() => {
      firstCard.classList.remove("reveal-card");
      secondCard.classList.remove("reveal-card");

      // resetar as variaveis para continuar jogando
      firstCard = "";
      secondCard = "";
    }, 500);
  }
};

// funcao de clicada na imagem para se vevelar
const revealCard = ({ target }) => {
  if (target.parentNode.className.includes("reveal-card")) {
    return;
  }

  if (firstCard === "") {
    target.parentNode.classList.add("reveal-card");
    firstCard = target.parentNode;
  } else if (secondCard === "") {
    target.parentNode.classList.add("reveal-card");
    secondCard = target.parentNode;

    checkCards();
  }
};

// criar os cardes autimaticamente sem criar no html
const createCard = (peca) => {
  // o atributo create element cria qualquer elemento
  const card = createElement("div", "card");
  const front = createElement("div", "face front");
  const back = createElement("div", "face back");

  // coloca uma imagem para o front autmaticamente
  front.style.backgroundImage = `url('../img/pecas/${peca}.png')`;

  // montando a div completa, o atributo append cria um filho, exemplo card q recebe o front como filho
  card.appendChild(front);
  card.appendChild(back);

  // chama funcao de clicada da imagem
  card.addEventListener("click", revealCard);
  // Atribuindo o atributo para comparacao
  card.setAttribute("data-character", peca);
  return card;
};

// Funcao para caregar o jogo
const loadGame = () => {
  // o array duplicate recebe os elementor do array de pecas e espalha com (...) fazendo duas vezes ele duplica
  const duplicateCharacters = [...pecas, ...pecas];

  // embaralha o array
  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  // foreach percorre cada elemento do array de pecas
  shuffledArray.forEach((peca) => {
    const card = createCard(peca);
    grid.appendChild(card);
  });
};

const startTimer = () => {
  this.loop = setInterval(() => {
    const currentTime = +timer.innerHTML; // Tempo atual do timer
    timer.innerHTML = currentTime + 1;

    // Verifica se o tempo atingiu 60 segundos
    if (currentTime + 1 === 40) {
      clearInterval(this.loop); // Pausa o timer
      window.location.href = "gameover.html"; // Redireciona para a página de Game Over
    }
  }, 1000);
};

// carrega o game apos todo windows carregar
window.onload = () => {
  spanPlayer.innerHTML = localStorage.getItem("Player");
  startTimer();
  loadGame();
};

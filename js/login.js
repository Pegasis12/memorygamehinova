const input = document.querySelector('.login-input');
const button = document.querySelector('.login-button');
const form = document.querySelector('.login-form');

// // forma basica
// const validateInput = (event) => {
//   // evento tem a propiedade target q captura o elemento e o value o valor atribuido aquele elemento
//   console.log(event.target.value);
// }

// // ja tira o target diretamente sem digitar igual o de cima
// const validateInput = ({ target }) => {
//   // logica usando o target .value e length para pegar tamanho digitado se for maior q dois tira o disable do botão
//   if(target.value.length > 2){
//     button.removeAttribute('disabled');
//   } else{
//     // o set coloca recebe dois parametros o atributo e o valor delete, como n temos valores podemos colocar string vazia
//     button.setAttribute('disabled', '');
//   }
// }

// Forma para n precisar do else
const validateInput = ({ target }) => {
  // logica usando o target .value e length para pegar tamanho digitado se for maior q dois tira o disable do botão
  if(target.value.length > 2){
    button.removeAttribute('disabled');
    // se aparece um return ele pula para o final da funcao, q no caso é o set para setar o atributo disable novamente
    return;
  }

  button.setAttribute('disabled', '');
}

const handleSubmit = (event) => {
  // serve para previnir o comportamento padrão do sumit de recarregar, assim o console aparece
  event.preventDefault();
  // console.log('logando');
  // vai no localstorage do navegador e seta uma chave chamada player com nome digitado no formulario, isso faz com que fique no navegador da PermissionStatus, n avendo perca de dados se ela fechar o navegador
  localStorage.setItem('Player', input.value);
  window.location = 'pages/game.html';
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
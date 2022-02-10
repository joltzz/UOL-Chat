    // Declarando variaveis
let usuario={name:"guilherme"}
let contato ="Todos";
//tipos das mensagens
let type = "message";
let mensagensNaTela = document.querySelector(".mensagens ul");
let participantesNaTela = document.querySelector(".participantes")


    // Função de entrar
function entrar () {
    usuario.name = document.querySelector(".nome").value
    if (usuario.name){
        const promise = axios.post("https://mock-api.driven.com.br/api/v4/uol/participants",usuario )
        promise.then(validarUsername).catch(erroLogin);
        }
    }
function validarUsername(resposta){
    const telaLogin=document.querySelector(".loginScreen")
    telaLogin.classList.add("hide")
    carregarMensagens();
    carregaParticipantes();
    setInterval(recarregarPagina,3000);
}
function erroLogin(){
    let nome=document.querySelector(".nome");
    nome.value="";
    document.querySelector(".loginScreen .mensagem p").innerHTML="Nome de usuário já está sendo utilizado!"
}

    //Função para abrir o menu/barra lateral
function abrirMenu(){
    const menu=document.querySelector(".menu")
    document.querySelector(".escurecido").classList.remove("hide");
    menu.style.width="259px";
}

    //Função para fechar o Menu ao clicar fora
function fecharMenu(){
    const menu=document.querySelector(".menu")
    document.querySelector(".escurecido").classList.add("hide")
    menu.style.width="0px"
}

